//活动选择器 Ctrl
(function(window, angular, undefined, webApp) {
  webApp.controller('ActivityCtrl', ['$scope', '$http',
    function($scope, $http) {
      //$scope.openActivityPop();// 打开选择框， 父级的scope要定义 在此js调用会出错， 暂未知晓原因，   实现方法见元素onload事件
      //初始化zTree
      $scope.treeSettings = {
        view: {
          selectedMulti: false
        },
        data: {
          simpleData: {
            enable: true
          }
        }
      };
      //标志树的根节点外外部
      $scope.hasOutRoot = true;
      $scope.FIXNODENAME = "未分类";

      $scope.searchTreeNodes = function(searchValue) {
        $scope.tree.searchNode(searchValue);
      };
      //ztree end
      $scope.activityListLoadingFlag = true;
      $scope.activityScopeObj = {
        "showMyActivity": false,
        "currentPageInput": 1,
        "currentPage": 1,
        "rp": '20',
        "setActivityListsParams": { // 请求活动的参数
          "page": 1,
          "pagesize": 20,
          "qtype": "keywords",
          "query": "",
          "sortname": "id",
          "sortorder": "desc",
          "classificationId": null,
          "campState": "A1,A2,A3,A4,A5,A6,B1,B2,B3"
        },
        "initZtree": function() {
          var that = this;
          $http.get(GLOBAL_STATIC.campaignRoot + 'campaign/' + CAMPAIGN_STATIC.tenantId + '/classification/?_=' + new Date().getTime()).success(function(res) { // id——主题平台id
            $scope.treeNodes = res;
            that.setActivityListsParams.classificationId = res[0].id;
            that.getActivityLists(true);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        "getIsStoreActivity": function(callback, storeId) { // 获取默认已选重的活动  展示出来
          $http.get(GLOBAL_STATIC.nodeRoot + 'campaign/selector/' + storeId + '/?_=' + new Date().getTime()).success(function(res) { // id——主题平台id
            callback(res);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        "initActivityListCheck": function(data) { //初始化活动列表展开的选择状况——不选中状态
          angular.forEach(data, function(val, key) {
            val.activityCheckedNone = true;
            val.activityCheckedPart = false;
            val.activityCheckedFull = false;
          });
          return data;
        },
        "checkActivityListCheck": function(select, activityLists) { // 根据选择的列表勾选活动状态
          this.initActivityListCheck(activityLists);
          angular.forEach(activityLists, function(activity, key) {
            angular.forEach(select, function(list, key) {
              if(activity.campId === list.campaignId) {
                // 选择的活动在活动列表中
                activity.activityCheckedNone = true;
                if(list.nodeId) {
                  // 半选
                  activity.activityCheckedPart = true;
                  activity.activityCheckedFull = false;
                } else {
                  activity.activityCheckedPart = false;
                  activity.activityCheckedFull = true;
                }
              }
            });
          });
          this.connectAllActivityAStatus();
        },
        "checkNodeList": function(select, nodes, list) { // 根据选择的活动展示节点
          var _this = this;
          nodes = nodes || [];
          list = list || {};
          if(list.activityCheckedFull) {
            $scope.allNodeCheckedPart = false;
            $scope.allNodeCheckedFull = true;
            angular.forEach(nodes, function(node, key) {
              node.nodeCheckedNone = true;
              node.nodeCheckedFull = true;
            });
          } else if (list.activityCheckedPart) {

            $scope.allNodeCheckedPart = true;
            $scope.allNodeCheckedFull = false;
            angular.forEach(nodes, function(node, key) {
              angular.forEach(select, function(s, key) {
                if(s.campaignId === node.campaignId && s.nodeId === node.id) {
                  // 有选择的节点在当然节点
                  node.nodeCheckedNone = true;
                  node.nodeCheckedFull = true;
                } else {
                  node.nodeCheckedNone = true;
                  node.nodeCheckedFull = false;
                }
              })
            });
          } else {
            $scope.allNodeCheckedPart = false;
            $scope.allNodeCheckedFull = false;
            angular.forEach(nodes, function(node, key) {
              node.nodeCheckedNone = true;
              node.nodeCheckedFull = false;
            });
          }
        },
        "getMySelectedActivityBtn":function(){
            var _this = this;
            if(!$scope.allMyActivityCheckedFull){
                $scope.allMyActivityCheckedFull = true;
                _this.showMyActivity = true;
                this.setActivityListsParams.page = this.currentPage = 1;
                _this.getActivityLists();
            }else{
                $scope.allMyActivityCheckedFull = false;
                _this.showMyActivity = false;
                this.setActivityListsParams.page = this.currentPage = 1;
                _this.getActivityLists();
            }
        },
        "getActivityLists": function(isfirst) { // isfirst 是否第一次加载，请求已有选择
          var _this = this,
              setListsParams = _this.setActivityListsParams;
          if(_this.showMyActivity){
              setListsParams.myActivity = true;
          }
          else{
              setListsParams.myActivity = false;
          }
          $scope.activityListLoadingFlag = true;
          _this.activityLists = [];
          console.log(setListsParams)
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.campaignRoot + 'campaign/'+ CAMPAIGN_STATIC.tenantId + '/page/?_=' + new Date().getTime(),
            "params": setListsParams
          }).success(function(response) {
            _this.totalPage = Math.ceil((response.total) / (response.pageSize)) || 1;
            _this.currentPage = response.page || 1;
            _this.currentPageInput = response.page || 1;
            if(response.pageSize){
              _this.setActivityListsParams.pagesize = response.pageSize;
              _this.rp = '' + response.pageSize;
            }
            else {
              _this.setActivityListsParams.pagesize = 20;
              _this.rp = '20';
            }
            _this.activityLists = _this.initActivityListCheck(response.data) || []; // 活动列表
            _this.initAllSelectedActivityStatus();
            //编辑打开已选的活动头
            //console.log($scope.activityId)
            if ($scope.activityId != "" && isfirst) { // 已存在id则请求 activityId外部的scope要有定义
              _this.getIsStoreActivity(function(response) {
                    _this.selectedNodeTitleObj = response ? response.items.slice() : [];
                    _this.checkActivityListCheck(_this.selectedNodeTitleObj, _this.activityLists);
                  },
                  $scope.activityId);
            } else {
              _this.checkActivityListCheck(_this.selectedNodeTitleObj, _this.activityLists);
            };
            $scope.activityListLoadingFlag = false;
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        "updateActivityById": function(id) { // 点击树更新
          this.setActivityListsParams.classificationId = id;
          this.setActivityListsParams.page = 1;
          this.setActivityListsParams.pagesize = 20;
          this.setActivityListsParams.query = "";
          // this.setActivityListsParams.campState = "";
          this.activityKerword = "";
          this.getActivityLists();
        },
        "hdCurStatus": function(s) { // 活动当前状态切换
          this.setActivityListsParams.page = 1;
          this.setActivityListsParams.campState = s;
          this.getActivityLists();
        },
        "firstPage": function() { // 回到第一页
          if (this.currentPage != 1) {
            this.setActivityListsParams.page = this.currentPage = 1;
            this.getActivityLists();
          }
        },
        "prevPage": function() { // 向前一页
          if (this.currentPage != 1) {
            this.currentPage--;
            this.setActivityListsParams.page = this.currentPage;
            this.getActivityLists();
          }
        },
        "lastPage": function() { // 回到最后一页
          if (this.currentPage != this.totalPage) {
            this.setActivityListsParams.page = this.currentPage = this.totalPage;
            this.getActivityLists();
          }
        },
        "nextPage": function() { // 向后一页
          if (this.currentPage != this.totalPage) {
            this.currentPage++;
            this.setActivityListsParams.page = this.currentPage;
            this.getActivityLists();
          }
        },
        "changeRp": function() { // 换页容量
          this.setActivityListsParams.page = 1;
          this.setActivityListsParams.pagesize = this.rp * 1;
          this.getActivityLists();
        },
        "searchActivityByKaeword": function(v) { // 活动搜索
          this.setActivityListsParams.page = 1;
          this.setActivityListsParams.query = v || "";
          this.getActivityLists();
        },
        //获取节点等相关操作
        "selectedNodeTitleObj": [],
        //当前已选中的节点
        "selectedActivityIds": [],
        "clickCurActivityStyle": function(element) {
          element.closest(".activitySelectList").find(".items").removeClass("curAvtivityClass");
          element.closest(".items").addClass("curAvtivityClass");
        },
        "getSelectedActivityIds": function(a, isDefaultNodeStatus, e) { //获取选择的活动信 isDefaultNodeStatus——初始化状态
          var _this = this;
          _this.selectList = a;
          if (!isDefaultNodeStatus) { // 点击选择框
            if (a.activityCheckedFull) { //取消
              a.activityCheckedFull = false;
              _this.campaignIsNotChecked(a.campId, a.campName);
              _this.selectedActivityIds = "";
            } else { // 选择
              a.activityCheckedFull = true;
              _this.campaignIsChecked(a.campId, a.campName);
              _this.selectedActivityIds = a.workflowId || "";
            }
            _this.connectAllActivityAStatus();
            _this.getSelectedActivityNode();
          } else { //点击内容展示
            _this.selectedActivityIds = a.workflowId || "";
            _this.getSelectedActivityNode(true, a);
          };
          _this.clickCurActivityStyle(angular.element(e.target));
        },
        "connectAllActivityAStatus": function() {
          var i = 0,
              _this = this;
          angular.forEach(_this.activityLists, function(val, key) {
            if (val.activityCheckedFull) {
              i++;
            }
          });
          if (i == 0) {
            $scope.allActivityCheckedPart = false;
            $scope.allActivityCheckedFull = false;
          } else if (i == _this.activityLists.length) {
            $scope.allActivityCheckedPart = false;
            $scope.allActivityCheckedFull = true;
          } else {
            $scope.allActivityCheckedPart = true;
            $scope.allActivityCheckedFull = false;
          }

        },
        "initAllSelectedActivityStatus": function() { // 初始化活动全选框状态
          $scope.allActivityCheckedNone = true;
          $scope.allActivityCheckedPart = false;
          $scope.allActivityCheckedFull = false;
        },
        "getAllSelectedActivityBtn": function() { // 全选checkbox操作
          var _this = this;
          if ($scope.allActivityCheckedFull) {
            $scope.allActivityCheckedFull = false;
            $scope.allActivityCheckedPart = false;
            _this.selectedNodeTitleObj = [];
            _this.initActivityListCheck(_this.activityLists);
          } else {
            $scope.allActivityCheckedPart = false;
            $scope.allActivityCheckedFull = true;
            angular.forEach(_this.activityLists, function(val, key) {
              _this.campaignIsChecked(val.campId, val.campName);
              val.activityCheckedFull = true;
            });
          }
        },
        "initAllSelectedNodeStatus": function(t) { // 初始化节点全选框状态
          $scope.allNodeCheckedNone = true;
          $scope.allNodeCheckedPart = false;
          if (t) {
            $scope.allNodeCheckedFull = true;
          } else {
            $scope.allNodeCheckedFull = false;
          }
        },
        "getSelectedActivityNode": function(f, list) { // f——初始化节点是否全部选中
          var _this = this;
          var setNodelistData = {
            "workflowid": _this.selectedActivityIds
          };
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.nodeRoot + 'campaign/selector/node/?_=' + new Date().getTime(),
            "params": setNodelistData
          }).success(function(response) {
            _this.searchNodeLists = response || []; // 节点列表
            if (f) {
              _this.checkNodeList(_this.selectedNodeTitleObj, _this.searchNodeLists, list);
            } else {
              angular.forEach(_this.searchNodeLists, function(val, key) {
                val.nodeCheckedNone = true;
                val.nodeCheckedFull = true;
                _this.initAllSelectedNodeStatus(true);
              })
            }
            _this.initDefaultsearchNodeLists = _this.searchNodeLists.slice(); // 默认搜索数据
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        "campaignIsChecked": function(campaignId, campaignName) { //活动选择添加  增加头部
          var _this = this,
              curSelectedNodeTitleObjLen = _this.selectedNodeTitleObj.length;
          var checkedCampaignData = {
            "campaignId": campaignId,
            "campaignName": campaignName
          };
          for (var i = 0; i < curSelectedNodeTitleObjLen; i++) {
            angular.forEach(_this.selectedNodeTitleObj, function(val, key) {
              if (val.campaignId == campaignId) {
                _this.selectedNodeTitleObj.splice(key, 1);
              }
            });
          };
          _this.selectedNodeTitleObj.unshift(checkedCampaignData);
        },
        "campaignIsNotChecked": function(campaignId, campaignName) { //活动选择取消  删除头部
          var _this = this,
              curSelectedNodeTitleObjLen = _this.selectedNodeTitleObj.length;
          for (var i = 0; i < curSelectedNodeTitleObjLen; i++) {
            angular.forEach(_this.selectedNodeTitleObj, function(val, key) {
              if (val.campaignId == campaignId) {
                _this.selectedNodeTitleObj.splice(key, 1);
              }
            });
          };
        },
        "selecterNodeMethod": function(data) { // 选择节点
          var _this = this;
          if (data.nodeCheckedFull) { //取消
            data.nodeCheckedFull = false;
            _this.removeCurSelectedNode(data);
          } else { // 选中
            data.nodeCheckedFull = true;
            _this.addCurSelectedNode(data);
          }
          _this.connectAllANodeStatus();
        },
        "connectAllANodeStatus": function() {
          var j = 0,
              _this = this;
          angular.forEach(_this.searchNodeLists, function(val, key) {
            if (val.nodeCheckedFull) {
              j++;
            }
          });
          if (j == 0) {
            $scope.allNodeCheckedPart = false;
            $scope.allNodeCheckedFull = false;
            _this.nodeConnectActivity(0);
          } else if (j == _this.searchNodeLists.length) {
            $scope.allNodeCheckedPart = false;
            $scope.allNodeCheckedFull = true;
            _this.nodeConnectActivity(2);
          } else {
            $scope.allNodeCheckedPart = true;
            $scope.allNodeCheckedFull = false;
            _this.nodeConnectActivity(1);
          }
        },
        "nodeConnectActivity": function(number) { //点击节点联动活动
          var curCheckedActivity = "",
              _this = this;
          angular.forEach(_this.activityLists, function(val, key) {
            if (val.workflowId == _this.selectedActivityIds) {
              curCheckedActivity = val;
            }
          });
          if (number == 0) { // 不选中活动
            curCheckedActivity.activityCheckedPart = false;
            curCheckedActivity.activityCheckedFull = false;
          } else if (number == 1) { // 半选中状态
            curCheckedActivity.activityCheckedPart = true;
            curCheckedActivity.activityCheckedFull = false;
          } else { // 全选状态
            curCheckedActivity.activityCheckedPart = false;
            curCheckedActivity.activityCheckedFull = true;
          };
          _this.connectAllActivityAStatus();
        },
        "addCurSelectedNode": function(data) { // 单个增加操作
          var _this = this,
              matchFlag = false; //判断是否重复
          angular.forEach(_this.selectedNodeTitleObj, function(val, key) {
            if (val.nodeId == data.id && val.campaignId == data.campaignId) {
              matchFlag = true;
            }
          });

          angular.forEach(_this.selectedNodeTitleObj, function(val, key) {
            if (val.campaignId == data.campaignId && !val.nodeName) {
              _this.selectedNodeTitleObj.splice(key, 1);
            }
          });
          if (!matchFlag) {
            var disponseData = {
              "campaignId": data.campaignId,
              "campaignName": data.campaignName,
              "nodeId": data.id,
              "nodeName": data.name
            }
            _this.selectedNodeTitleObj.unshift(disponseData);
          }

          //是否由没全选——全选
          var o = 0;
          angular.forEach(_this.searchNodeLists, function(val, key) {
            if (val.nodeCheckedFull) {
              o++;
            }
          });
          var isCheckedAllNode = (o == _this.searchNodeLists.length);
          if (isCheckedAllNode) {
            _this.curNodeCheckedAll(!isCheckedAllNode);
          }
        },
        "removeCurSelectedNode": function(data) { // 单个删除操作
          var _this = this;

          //是否由全选 变成取消
          var o = 0;
          angular.forEach(_this.searchNodeLists, function(val, key) {
            if (val.nodeCheckedFull) {
              o++;
            }
          });
          var isCutOneNode = (o == (_this.searchNodeLists.length - 1));
          if (isCutOneNode) {
            angular.forEach(_this.selectedNodeTitleObj, function(val, key) {
              if (val.campaignId == data.campaignId) {
                _this.selectedNodeTitleObj.splice(key, 1)
              }
            });
            angular.forEach(_this.searchNodeLists, function(val, key) { // 重新添加
              var disponseData = {
                "campaignId": val.campaignId,
                "campaignName": val.campaignName,
                "nodeId": val.id,
                "nodeName": val.name
              }
              _this.selectedNodeTitleObj.unshift(disponseData);
            });
          }
          angular.forEach(_this.selectedNodeTitleObj, function(val, key) {
            if (val.nodeId == data.id && val.campaignId == data.campaignId) {
              _this.selectedNodeTitleObj.splice(key, 1);
            }
          });
        },
        "curNodeCheckedAll": function(status) { // 节点全选 操作框
          var _this = this;
          if (_this.searchNodeLists.length < 1) {
            return "当前无节点可选"
          };
          var curNodeListsCampaignId = _this.searchNodeLists[0].campaignId,
              curNodeListsCampaignName = _this.searchNodeLists[0].campaignName;

          var defaultNOdetitleLength = _this.selectedNodeTitleObj.length; // 批量删除算法
          for (var i = 0; i < defaultNOdetitleLength; i++) {
            angular.forEach(_this.selectedNodeTitleObj, function(val, key) { // 删除头部，选中当前活动的节点
              if (val.campaignId == curNodeListsCampaignId) {
                _this.selectedNodeTitleObj.splice(key, 1);
              }
            })
          };

          if (!status) { // 全选添加活动
            var curActivityObj = {
              "campaignId": curNodeListsCampaignId,
              "campaignName": curNodeListsCampaignName
            }
            _this.selectedNodeTitleObj.unshift(curActivityObj);
            $scope.allNodeCheckedFull = true;
            _this.nodeConnectActivity(2);
          } else {
            $scope.allNodeCheckedFull = false;
            _this.nodeConnectActivity(0);
          }
          angular.forEach(_this.searchNodeLists, function(val, key) {
            val.nodeCheckedFull = $scope.allNodeCheckedFull;
          })
        },
        "disposeNodeTitleView": function(d) { // 处理选择头部的展示
          if (d.nodeName && d.campaignName) {
            return d.campaignName + ">" + d.nodeName
          } else {
            return d.campaignName
          }
        },
        "delTitle": function(i) { // 删除头部的现有选择
          this.selectedNodeTitleObj.splice(i, 1);
          this.checkActivityListCheck(this.selectedNodeTitleObj, this.activityLists);
          this.checkNodeList(this.selectedNodeTitleObj, this.searchNodeLists, this.selectList);
        },
        "sureAddActivity": function() { // 确定
          //console.log(this.selectedNodeTitleObj)
          var activityDefaultSelectedData = {
                "items": this.selectedNodeTitleObj
              },
              plugReturnId = "",
              element = angular.element('#activityScopeObjSureAddActivity');
          if(this.selectedNodeTitleObj.length === 0) {
            $(this).Alert({
              "title": "提示",
              "str": "请选择活动",
              "mark": true,
              "eleZindex": 1005,
              "markZindex": 1003
            });
            return false;
          }
          // 隐藏弹窗
          element.closest(".ccmsPublicPop").hide();
          if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
            if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
              if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
                element.closest(".commCustomConfigBox").find(".childElementMark").remove(); //class commCustomConfigBox 自定义属性 专属class
              }
            } else {
              angular.element(".ccmsPublicPop").find(".childElementMark").remove();
            }
          } else {
            angular.element(".yunat_maskLayer:last").remove();
          }

          if ($scope.activityId != "") { // 修改
            $http.put(GLOBAL_STATIC.nodeRoot + "campaign/selector/" + $scope.activityId + "/", activityDefaultSelectedData).success(function(response) {
              plugReturnId = response.id;
              $scope.getSelectedActivity(activityDefaultSelectedData, plugReturnId); //把数据传回给选择器接口 getSelectedActivity方法，外层的scope要有定义
            }).error(function(data, status, headers, config) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            })
          } else { //新建
            $http.post(GLOBAL_STATIC.nodeRoot + "campaign/selector/", activityDefaultSelectedData).success(function(response) {
              plugReturnId = response.id;
              $scope.getSelectedActivity(activityDefaultSelectedData, plugReturnId); //把数据传回给选择器接口 getSelectedActivity方法，外层的scope要有定义
            }).error(function(data, status, headers, config) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            })
          }
        }
      };

      angular.element(".activityBox .activityInputPage").bind("keyup", function(e) { // 页码框 输入enter键请求
        if (e.keyCode == 13) {
          $scope.activityScopeObj.currentPage = $scope.activityScopeObj.currentPageInput;
          $scope.activityScopeObj.setActivityListsParams.page = $scope.activityScopeObj.currentPage;
          $scope.activityScopeObj.getActivityLists();
        }
      });

      //节点名称筛选监听搜索
      $scope.$watch("activityScopeObj.searchActivityNodeName", function(newVal) {
        var searchResultAry = [];
        if (newVal == "") {
          $scope.activityScopeObj.searchNodeLists = $scope.activityScopeObj.initDefaultsearchNodeLists;
          return
        }
        angular.forEach($scope.activityScopeObj.searchNodeLists,
            function(val, key) {
              var flagIndex = (val.name).indexOf(newVal);
              if (flagIndex != -1) {
                searchResultAry.push(val);
              };
            });
        $scope.activityScopeObj.searchNodeLists = searchResultAry.slice();
      });

      // $scope.activityScopeObj.getActivityLists(true);
      $scope.activityScopeObj.initZtree();
      $scope.activityScopeObj.initAllSelectedNodeStatus();

    }]);
})(window, angular, undefined, webApp);
