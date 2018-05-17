angular.module("campaign.controllers").controller('tfilterFindCtrl', ['$scope', '$location', '$http', 'saveService', 'getListService', '$q',
  function($scope, $location, $http, saveService, getListService, $q) {
    $scope.openNodePop(); //调用弹框方
    $scope.tfilterFindObj = {
      "isEditorFlag": (!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8),
      //节点是否可编辑，确定按钮是否显示,
      "ischangeSubject": false,
      // 是否切换平台，清空数据
      "isnotCondition": false,
      // 没配置条件提示
      "removePop": function() {
        angular.element("#nodeContent").hide();
        angular.element(".yunat_maskLayer:last").remove();
      },
      "initData": function() { //打开
        var delay = getListService.getPlatList(function(response) {
          $scope.tfilterFindObj.subjectList = response || [];
        });
        $q.when(delay).then(function() {
          getListService.opentfilterNode(function(response) {
            $scope.tfilterFindObj.name = response.name ? response.name: "查询节点";
            $scope.tfilterFindObj.id = response.id ? response.id: "";
            $scope.nodecomment = response.remark ? response.remark: "";
            $scope.tfilterFindObj.queryType = response.type ? response.type: "custom";
            $scope.tfilterFindObj.subjectLabel = response.subjectLabel || "";
            $scope.tfilterFindObj.defaultSubjectId = response.defaultSubject ||  ($scope.tfilterFindObj.subjectList[0] && $scope.tfilterFindObj.subjectList[0].subjectId);
            //获取平台id
            var platIsValit = false;
            angular.forEach($scope.tfilterFindObj.subjectList, function(val, key) {
              if (val.subjectId == response.defaultSubject) {
                platIsValit = true;
                $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
              }
            });
            if (platIsValit) {
              $scope.tfilterFindObj.defaultSubjectId =  response.defaultSubject ;
            } else {
              $scope.tfilterFindObj.segmentationId = $scope.tfilterFindObj.subjectList[0] && $scope.tfilterFindObj.subjectList[0].segmentationId;
              $scope.tfilterFindObj.defaultSubjectId = $scope.tfilterFindObj.subjectList[0] && $scope.tfilterFindObj.subjectList[0].subjectId;
            }

            //请求后监听
            $scope.$watch("tfilterFindObj.queryType", function(val) {
              if (val == "custom") { //自定义
                $scope.tfilterFindObj.radioSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/tfilterfindRadioContent.html?_=" + new Date().getTime();
              } else { //已有客户分组
                $scope.tfilterFindObj.radioSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/tfilterfindDefaultCustomer.html?_=" + new Date().getTime();
                $scope.responseGroupName = response.groupName || "";
                $scope.responseGroupId = response.groupId || "";
              }
              $scope.tfilterFindObj.isnotCondition = false;
            });
          }, graph.nodeId)
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          $scope.tfilterFindObj.tips = responseTips.tips || "";
        }, "tfilterfind");
      },
      "changeSubject": function() { // 切换主题平台
        //获取平台id
        angular.forEach($scope.tfilterFindObj.subjectList, function(val, key) {
          if (val.subjectId == $scope.tfilterFindObj.defaultSubjectId) {
            $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
          }
        });
        $scope.tfilterFindObj.radioSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/tfilterfindRadioContent.html?_=" + new Date().getTime();
        $scope.tfilterFindObj.ischangeSubject = true;
        $scope.dragReminderFlag = true;
        $scope.tfilterFindObj.isnotCondition = false;
      },
      "getPostData": function() {
        var _this = this;
        var postData = {
          "id": _this.id,
          "name": _this.name,
          "remark": $scope.nodecomment,
          "tip": "这个tip就是打开节点之后顶头那个提示",
          "type": _this.queryType,
          "subjectId": _this.defaultSubjectId
        };
        if ("custom" == postData.type) { //自定义查询
          var customScope = $scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead: $scope.$$childTail.$$childTail; //获取自定义查询条件域,切换主题时于的获取方法会改变，暂未找到原因
          postData.relation = customScope.globalConditions.curRelation;
          postData.isExcept = customScope.globalConditions.exceptFlag == "true" ? true: false;
          postData.configs = [];
          postData.conditions = [];
          if (customScope.globalConditions.queryGloballists) { //获取config
            angular.forEach(customScope.globalConditions.queryGloballists, function(val, key) {
              var curConfigData = {};
              curConfigData.id = val.cId ? val.cId: "";
              curConfigData.queryItemId = val.id ? val.id: "";
              curConfigData.type = val.type ? val.type: "";
              curConfigData.values = {};
              if (curConfigData.type == "字典多选") { //暂时获取店铺值，或其可能需要扩展
                angular.forEach(customScope.globalConditions.ShopValsViewAry, function(shopV, shopK) {
                  curConfigData.values[customScope.globalConditions.ShopIdsAry[shopK]] = shopV;
                });
              }
              postData.configs.push(curConfigData);
            });
          };
        } else if ("existingGroup" == postData.type) { // 选择已有客户分组
          postData.groupName = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName: "";
          postData.groupId = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId: "";
          postData.subjectId = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId: "";
        }
        return postData;
      },
      "postQueryDataMethod": function(data) {
        var _this = this,
            element = angular.element(".queryNodeGlobalButton");

        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.postConfigConditions(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            _this.removePop();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
          }, data, element);
        }, element);
      },
      "postQueryData": function(cgd) { //保存节点 cgd="group"创建客户分组验证
        if (this.isEditorFlag) {
          return "节点数据不可编辑";
        };
        if (!this.name) {
          return "请输入节点名称";
        };
        var _this = this;
        _this.queryCreatGroupData = "";
        var curPostData = _this.getPostData();
        console.log(curPostData)
        /* 动态加入form id ，否者submitHandler的数据会被插件缓存。
         * 如：保存为客户分组操作，不动态添加form，cgd的值不会改变
         */
        angular.element(".queryConditionormWrap").unwrap().wrap("<form id='queryConditionorm'></form>");
        angular.element("[name='relationship']").val(curPostData.relation); // unwrap莫名的bug，暂定这样解决
        if (curPostData.type == "custom") { // 自定义查询保存
          //店铺必选验证
          var shopObjFlag = function() {
            for (var n in curPostData.configs[0].values) {
              return false;
            }
            return true;
          }
          if (shopObjFlag()) {
            var customScope = $scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead: $scope.$$childTail.$$childTail; //获取自定义查询条件域,切换主题时于的获取方法会改变，暂未找到原因
            customScope.globalConditions.isUnShops = true;
            customScope.globalConditions.ShopValsView = "请选择店铺";
            return false;
          };
          /*插件验证start*/
          angular.element("#queryConditionorm").validate({
            debug: true,
            rules: {
              categoryName: "required"
            },
            messages: {
              categoryName: "请输入属性名称"
            },
            errorPlacement: function(error, element) {
              if (element.is(":text")) {
                element.after(error);
                var top = element.position().top;
                var left = element.position().left;
                error.css({
                  "position": "absolute",
                  "left": left + 10,
                  "top": top + 28,
                  "z-index": 10
                });
                var color = element.css("borderColor");
                element.css({
                  "borderColor": "red"
                });
                error.click(function() {
                  error.remove();
                  element.css({
                    "borderColor": color
                  });
                  element.focus();
                });
                element.click(function() {
                  error.remove();
                  element.css({
                    "borderColor": color
                  });
                });
              } else if (element.is(":checkbox")) {
                //error.appendTo ( element.next() );
              } else {
                //error.appendTo( element.parent().next() );
              }
            },
            submitHandler: function() {
              //获取conditions数据
              var conditionsData = $scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead.getAllConditions() : $scope.$$childTail.$$childTail.getAllConditions();
              console.log(conditionsData);
              curPostData.conditions = conditionsData.slice();
              if (curPostData.conditions.length == 0) {
                _this.isnotCondition = true;
                return false;
              };

              var nodeConditionsPostFlag = true;
              angular.forEach(curPostData.conditions, function(val, key) { //必填验证
                if (val.values.value == "") {
                  nodeConditionsPostFlag = false;
                  return false;
                }
              });
              if (!nodeConditionsPostFlag) {
                $(this).Alert({
                  "title": "提示",
                  "str": "请填写配置条件内容",
                  "mark": true,
                  "width": "200px",
                  "eleZindex": 1010,
                  "markZindex": 1005
                });
                return false;
              };
              if (cgd == "group") { // 是否为创建客户分组
                _this.queryCreatGroupData = {
                  "data": curPostData,
                  "groupFlag": true
                };
              } else {
                _this.postQueryDataMethod(curPostData);
              }
            }
          });
          angular.element("#queryConditionorm").submit();
          //插件验证end
        } else { //客服分组保存
          if (!curPostData.groupName) {
            $(this).Alert({
              "title": "提示",
              "str": "请选择分组",
              "mark": true,
              "width": "200px",
              "eleZindex": 1010,
              "markZindex": 1005
            });
            return false;
          };
          _this.postQueryDataMethod(curPostData);
        }

      },
      //保存客户分组start
      "queryCreatGroupName": "",
      "queryCreatIncludeGroupName": "请选择",
      "queryCreatIncludeGroupId": "",
      "queryCreatGroupData": "",
      "postCreateQueryGroupdata": "",
      //保存客户分组的数据
      "choiceWhichGoupSave": function() { //保存为客户分组 先保存查询节点配置的相关条件，
        var _this = this;
        getListService.isPostAdd(function (res) {
          if($.isEmptyObject(res)) {
            _this.postQueryData("group");
            var isIncludeGroup = false,
                postCreateQueryGroupdata = "";
            if (_this.queryCreatGroupData.groupFlag) {
              isIncludeGroup = _this.queryCreatGroupData.groupFlag;
              _this.postCreateQueryGroupdata = _this.queryCreatGroupData.data;
            };
            if (isIncludeGroup) {
              $scope.createGroupNameByQueryFlag = false;
              $scope.createGroupCludeGroupFlag = false;
              _this.queryCreatGroupName = "";
              _this.queryCreatIncludeGroupName = "请选择";
              _this.queryCreatIncludeGroupId = "";
              _this.includeSelectedGroupSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/saveByGroup.html?_=" + new Date().getTime();
            }
          }
        });
      },
      "choiceWhichGoupPop": function() {
        $(".groupSaveByQuery").addInteractivePop({
          magTitle: "保存为客户分群",
          width: 734,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      },
      "getDefaultGroup": function() {
        var _this = this;
        getListService.getDefaultGroup(function(data) {
          data.pop();
          _this.commonTree(data, $('[name="createGroupCludeGroup"]'));
        });
      },
      "commonTree": function(data, ele) { //模拟select框中为树形结构
        var $selContent = ele.siblings(".selectContent");
        $selContent.children().remove();
        $selContent.css('maxHeight', '100px')
        var $ul = $("<ul>", {
          "class": "ztree"
        });
        $selContent.append($ul);
        if (data) {
          function onClick(event, treeId, treeNode) {
            ele.val(treeNode.categoryName);
            ele.attr("valueId", treeNode.id);
            $selContent.slideUp(200);
            $scope.tfilterFindObj.queryCreatIncludeGroupName = treeNode.categoryName;
            $scope.tfilterFindObj.queryCreatIncludeGroupId = treeNode.id;
          }
          var setting = {
            data: {
              key: {
                title: "name",
                name: "categoryName"
              },
              simpleData: {
                enable: true,
                pIdKey: "parentId"
              }
            },
            view: { //设置多级样式
              //dblClickExpand: false,父级双击不可点击
              addDiyDom: function(treeId, treeNode) {
                var spaceWidth = 10;
                var switchObj = $("#" + treeNode.tId + "_switch"),
                    icoObj = $("#" + treeNode.tId + "_ico");
                switchObj.remove();
                icoObj.before(switchObj);
                var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
                switchObj.before(spaceStr);
              }
            },
            callback: {
              onClick: onClick
            }
          };
          $.fn.zTree.init($ul, setting, data);
        }

      },
      "saveCreateGroupByQuery": function() { // 保存为当前分组
        var _this = this;
        var putGroupData = angular.copy(_this.postCreateQueryGroupdata);
        putGroupData.groupName = _this.queryCreatGroupName;
        putGroupData.groupCategoryId = _this.queryCreatIncludeGroupId;
        if (!putGroupData.groupName) {
          $scope.createGroupNameByQueryFlag = true;
          return false;
        } else {
          $scope.createGroupNameByQueryFlag = false;
        }

        if (!putGroupData.groupCategoryId) {
          $scope.createGroupCludeGroupFlag = true;
          return false;
        } else {
          $scope.createGroupCludeGroupFlag = false;
        }
        getListService.putCreateGroupByQuery(function(response) {
          angular.element(".groupSaveByQuery").remove();
          angular.element(".childElementMark:last").remove();
        }, putGroupData);
      }
    };
    $scope.tfilterFindObj.initData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }
]);
