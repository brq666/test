;angular.module('campaign.controllers').controller('tfilterAttrQueryCtrl', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$q', 'saveService', 'getListService', 'selectorShops', function ($rootScope, $scope, $timeout, $location, $http, $q, saveService, getListService, selectorShops) {
  $scope.isGroupApp = ($location.$$path && $location.$$path === '/campaign/customerSegmentation'); // 适配客户分组
  $scope.setGroupValidate = function () {
    // $scope.creatGroupObj客户分组object
    $scope.creatGroupObj && ($scope.creatGroupObj.isnotCondition = $scope.tfilterFindObj.isnotCondition);
  };

  if (!$scope.isGroupApp) {
    $scope.openNodePop(); // 调用弹框
  }
  ;

  // 活动查询
  $scope.tfilterFindObj = {
    "isEditorFlag": !$scope.isGroupApp && ((!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8)), //节点是否可编辑，确定按钮是否显示,
    "getNumber": function (callback, errorCallback) { //底部统计人数服务
      var _this = $scope.tfilterFindObj;
      if (!_this.checkCondition()) {
        return false;
      }
      ;
      var curPostData = _this.getPostData();
      getListService.gettfilterAttrQueryCount(callback, errorCallback, curPostData);
      return true;
    },
    "stopNumber": function (callback, errorCallback) { //停止底部统计人数
      var _this = $scope.tfilterFindObj;
      var curPostData = _this.getPostData();
      getListService.stoptfilterAttrQueryCount(callback, errorCallback, curPostData);
    },
    "conditions": [],
    "isnotCondition": false, //没配置条件提示
    "defaultShopValueAry": [],
    "defaultShopIdAry": [],
    "postSaveShopsData": [],
    "ShopUnusedAry": [],
    "DefaultSelected": "",
    "DefaultSelectedId": "",
    "showCustom": true, //默认显示自定义
    "isCurSubjectShopsStore": { // 储存已保存的平台店铺
      "subjectId": "",
      "selectShopsSend": [],
      "curSubjectSelectShopsVal": "",
      "curSubjectSelectShopsId": "",
      "unusedShops": []
    },
    "removePop": function () { //移除弹框
      angular.element("#nodeContent").hide();
      angular.element(".yunat_maskLayer:last").remove();
    }, // 店铺start
    "checkAllShops": function () { //检测所有店铺
      var _this = this;
      if (_this.isUnShops) {
        _this.isUnShops = false;
        _this.selectShopsVal = "";
      }
      _this.toggleStatusShop = false; //全选按钮显示
      if (_this.shopLists.length == 1) {
        angular.forEach(_this.shopLists, function (val, key) {
          val.classVal = "cur";
          angular.element(".queryShopsPop .editorShops li:eq(" + key + ")").addClass("cur");
        });
      }
      else {
        angular.forEach(_this.shopLists, function (val, key) {
          var flag = false;
          angular.forEach(_this.ShopIdsAry, function (v, k) {
            if (val.idInPlat == v) {
              flag = true;
            }
          });
          if (flag) {
            val.classVal = "cur";
            angular.element('.shopUsed .editorShops li').eq(key).addClass('cur');
          } else {
            val.classVal = "";
            angular.element('.shopUsed .editorShops li').eq(key).removeClass('cur');
          }
        });
      }
      $scope.toggleStatuVal = _this.shopLists.every(function (val) {
        return val.classVal === 'cur'
      });
    },
    "disponseShops": function (datas) { //处理店铺 过期信息
      var disponseResult = [],
        _this = this;
      angular.extend(disponseResult, datas);
      return disponseResult;
    },
    "getCheckState": function () {
      var lilength = $('.editorShops li').size();
      $timeout(function () {
        if (lilength == $('.shopsChecked .editorShops .cur').size()) {
          $('.shopMenu input').prop('checked', true)
          $scope.toggleStatuVal = true;
        } else {
          $('.shopMenu input').prop('checked', false)
          $scope.toggleStatuVal = false;
        }
      }, 50);
    },
    "getShopsLists": function () { //获取店铺
      var _this = this,
        delay = $q.defer();
      _this.shopLists = [];
      delay.resolve();
      return delay;
    },
    "getShops": function (done) {
      // 店铺选择
      var self = this;
      if (!$scope.isGroupApp && self.isEditorFlag) {
        return '当前节点不可编辑';
      }
      this.bindings = {};
      var a = {
        bject$$hashKey: "object:1357",
        chooseId: this.shops.storeId,
        code: "SellerCode",
        enableMultiple: false,
        length: 0,
        range: 2,
        resourceName: "sellerCode",
        shopIds: $scope.tfilterFindObj.shops.shopIds,
        shopsList: $scope.tfilterFindObj.shops
      };
      var type = 'shop';
      selectorShops({
        type: 'shop',
        disable: false,// this.navName !== 'create' && this.navName !== 'edit',
        title: '店铺选择器',
        bindings: Object.assign({}, self.bindings[a.code], {cid: a.chooseId}, {shopIds: a.shopIds}, {shopsList: a.shopsList}),
        onDone: function (bindings, changed) {
          console.log(bindings);
          self.sureAddShop(bindings.shopsList);
          done && done(bindings.shopsList);
        }
      });
    },
    "toggleAllShops": function (s) {
      if (s) {
        angular.element(".shopsChecked .editorShops li").addClass("cur");
      } else {
        angular.element(".shopsChecked .editorShops li").removeClass("cur");
      }
    },
    "sureAddShop": function (lists) {
      var _this = this;
      _this.ShopValsViewAry = [];
      _this.ShopIdsAry = [];
      _this.postSaveShopsData = [];
      lists.forEach(function (val, key) {
        _this.ShopIdsAry.push(val.shopId);
        _this.ShopValsViewAry.push(val.shopName);
        _this.postSaveShopsData.push(val);
      });

      _this.selectShopsVal = _this.ShopValsViewAry.join(",");
      _this.selectShopsId = _this.ShopIdsAry.join(",");
      if (_this.ShopIdsAry.length > 0) {
        _this.isUnShops = false;
      }
    },
    "sureCancelShop": function () {
      var _this = this;
      _this.checkAllShops();
    }, // 店铺end
    "checkCondition": function () { //检查保存条件
      var _this = $scope.tfilterFindObj;
      if (_this.isEditorFlag) {
        return false;
      }
      ;
      if (!_this.name) {
        return false;
      }
      ;
      _this.queryCreatGroupData = "";
      var curPostData = _this.getPostData();

      if (curPostData.type == "custom") {
        //店铺必选验证
        // if (curPostData.shops.length == 0) {
        //   _this.isUnShops = true;
        //   _this.selectShopsVal = "请选择店铺";
        //   return false;
        // } else {
        //   _this.isUnShops = false;
        // }
        var checkPass = false; //插件验证状态
        /*插件验证start*/
        /* 动态加入form id ，否者submitHandler的数据会被插件缓存。
         * 如：保存为客户分组操作，不动态添加form，cgd的值不会改变
         */
        angular.element(".queryConditionormWrap").unwrap().wrap("<form id='queryConditionorm'></form>");
        angular.element("#queryConditionorm").validate({
          debug: false,
          rules: {
            categoryName: "required"
          },
          messages: {
            categoryName: "请输入属性名称"
          },
          errorPlacement: function (error, element) {
            if (element.is(":text")) {
              element.after(error);
              var top = element.position().top;
              var left = element.position().left;
              error.css({"position": "absolute", "left": left + 10, "top": top + 28, "z-index": 10});
              var color = element.css("borderColor");
              element.css({"borderColor": "red"});
              error.click(function () {
                error.remove();
                element.css({"borderColor": color});
                element.focus();
              });
              element.click(function () {
                error.remove();
                if (!$(element[0]).val()) {
                  element.css({"borderColor": color});
                }
              });
              if ($(element[0]).attr("name").indexOf("stringValited") != -1) {//字符输入
                element.focus(function () {
                  setInterval(function () {
                    if (element.val() == "") {
                      $(element).removeAttr("style")
                    }
                  }, 30);
                })
              }
            }
          },
          submitHandler: function () {
            //条件选择
            var conditionsFlag = true;
            if (curPostData.conditions.length == 0) {
              _this.isnotCondition = true;
              conditionsFlag = false;
            } else {
              _this.isnotCondition = false;
            }
            ;
            var nodeConditionsPostFlag = true;
            angular.forEach(curPostData.conditions, function (val, key) {//必填验证
              if (val.values.value == "") {
                nodeConditionsPostFlag = false;
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
            }
            checkPass = (conditionsFlag && nodeConditionsPostFlag);
            $scope.setGroupValidate();
          }
        });
        /* 插件验证end */
        angular.element("#queryConditionorm").submit();
        return checkPass;
      }
    },
    "initData": function () { //打开属性节点
      var _this = this;
      // 加载属性查询内容页面
      $scope.tfilterFindObj.radioSrc = CAMPAIGN_STATIC.tplBasePath + 'view/node/splitFindNode/attrQueryContent.html?_=' + new Date().getTime();
      // 打开节点属性查询节点请求
      //平台：淘宝客户
      var delay = getListService.getPlatList(function (response) {
        $scope.tfilterFindObj.subjectList = response || [];
      });
      $scope.tfilterFindObj.openPromise = $q.defer();
      $q.when(delay).then(function () {
        getListService.opentfilterAttrQueryNode(function (response) {
          $scope.tfilterFindObj.id = response.id || "";
          $scope.tfilterFindObj.name = response.name || "查询节点";
          $scope.nodecomment = response.remark || "";
          $scope.tfilterFindObj.type = response.type || "custom";
          $scope.tfilterFindObj.defaultSubjectId = response.defaultSubject || '';
          $scope.tfilterFindObj.defaultSubjectIdStore = response.defaultSubject || ''; // 存储上次选择的平台
          //获取平台id
          angular.forEach($scope.tfilterFindObj.subjectList, function (val, key) {
            if (val.subjectId == $scope.tfilterFindObj.defaultSubjectId) {
              $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
              $scope.tfilterFindObj.subjectCode = val.platCode
            }
          });
          if ($scope.isGroupApp) {
            $scope.$emit('subjectId', $scope.tfilterFindObj.defaultSubjectId);
          }
          //获取店铺
          var ids = [];
          $scope.tfilterFindObj.shops = response.shops && response.shops.length > 0 ? (function () {
            var shops = [];
            for (var key in response.shops[0].values) {
              shops.push({
                shopId: key,
                shopName: response.shops[0].values[key]
              });
              ids.push(key);
            }

            return shops;
          })() : [];
          $scope.tfilterFindObj.shops.id = response.shops && response.shops.length > 0 ? (response.shops[0].id ? response.shops[0].id : '') : '';
          $scope.tfilterFindObj.shops.queryItemId = response.shops && response.shops.length > 0 ? (response.shops[0].queryItemId ? response.shops[0].queryItemId : 1) : 1;
          $scope.tfilterFindObj.shops.storeId = response.shops && response.shops.length > 0 ? (response.shops[0].chooseId ? response.shops[0].chooseId : '') : '';
          $scope.tfilterFindObj.shops.shopIds = ids;
          //请求完成
          $scope.tfilterFindObj.openPromise.resolve(); //延迟成功的方法
          $scope.tfilterFindObj.openPromise.reject(); //失败的方法.

          //打开节点慢,延迟第二个请求
          $timeout(function () {
            //处理权限过期店铺
            _this.getShopsLists().promise.then(function () {
              useabledShops = _this.disponseShops($scope.tfilterFindObj.shops);
              angular.forEach(useabledShops, function (val, key) {
                _this.defaultShopValueAry.push(val.shopName);
                _this.defaultShopIdAry.push(val.shopId);
              });
              //console.log("defaultShopValueAry1:"+ _this.defaultShopValueAry)
              if (useabledShops.length != 0) {
                _this.postSaveShopsData = angular.copy(useabledShops);
              }
              _this.selectShopsVal = _this.defaultShopValueAry.join(",") || $scope.tfilterFindObj.DefaultSelected || "";
              if ($scope.isGroupApp) {
                $scope.$emit('staticShop', _this.selectShopsVal);
              }
              _this.ShopIdsAry = _this.defaultShopIdAry.slice();
              _this.selectShopsId = _this.ShopIdsAry.join(",") || $scope.tfilterFindObj.DefaultSelectedId;
              _this.isCurSubjectShopsStore = {
                "subjectId": _this.defaultSubjectId,
                "curSubjectShopsSend": _this.postSaveShopsData.slice(),
                "curSubjectShopIdsAry": _this.ShopIdsAry.slice(),
                "curSubjectSelectShopsVal": _this.selectShopsVal,
                "curSubjectSelectShopsId": _this.selectShopsId,
                "unusedShops": _this.ShopUnusedAry.slice()
              }
              // _this.checkAllShops();
            });
          }, 0);
        }, graph.nodeId);
      });

      // 得到tips
      getListService.getNodeTipsByType(function (responseTips) {
        $scope.tfilterFindObj.tips = responseTips.tips || "";
      }, "tfilterAttrQuery");
    },
    "changeSubject": function () { // 切换主题平台
      var _this = this;

      console.log($scope)
      function disposeSubject() {
        _this.selectShopsVal = "";
        _this.selectShopsId = "";
        _this.ShopIdsAry = [];
        _this.ShopUnusedAry = [];
        _this.postSaveShopsData = [];
        _this.shops.shopIds = [];
        angular.forEach(_this.subjectAry, function (val, key) {
          if (_this.defaultSubjectId == val.subjectId) {
            _this.segmentationId = val.segmentationId;
            _this.subjectCode = val.platCode;
            return false;
          }
        });
        //清空条件
        var customScope = $('.queryConditionormWrap').scope();
        customScope.globalConditions.relation = 'AND';
        customScope.globalConditions.initLeftTree();
        customScope.removeAllConditions();
        $scope.$$childHead.count && $scope.$$childHead.count.number && ($scope.$$childHead.count.number = '');  //清空统计人数
        $('.search-attr input').val(''); //清空搜索输入框
        //更新存储的id
        _this.defaultSubjectIdStore = _this.defaultSubjectId;
        //获取平台id
        angular.forEach($scope.tfilterFindObj.subjectList, function (val, key) {
          if (val.subjectId == $scope.tfilterFindObj.defaultSubjectId) {
            $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
            $scope.tfilterFindObj.subjectCode = val.platCode;
            $scope.tfilterFindObj.defaultQueryItem = val.queryitem;
          }
        });
        //店铺处理
        _this.getShopsLists().promise.then(function () {
          _this.disponseShops();
          // _this.checkAllShops();
        });
        if (_this.defaultSubjectId == _this.isCurSubjectShopsStore.subjectId) {
          _this.selectShopsVal = _this.isCurSubjectShopsStore.curSubjectSelectShopsVal;
          _this.selectShopsId = _this.isCurSubjectShopsStore.curSubjectSelectShopsId;
          _this.ShopIdsAry = _this.isCurSubjectShopsStore.curSubjectShopIdsAry.slice();
          _this.postSaveShopsData = _this.isCurSubjectShopsStore.curSubjectShopsSend.slice();
          _this.ShopUnusedAry = _this.isCurSubjectShopsStore.unusedShops.slice();
        }
        $scope.tfilterFindObj.isnotCondition = false;
        $scope.setGroupValidate();
      }

      // 如果有选择条件,弹出确认框
      if ($('.queryConditionormWrap').scope().getConditionCount() > 0) {
        $(this).Confirm({
          "title": "提示",
          "str": "切换平台将会重置查询条件，是否继续？",
          "mark": true,
          "eleZindex": 1010,
          "markZindex": 1005
        }, function () {
          disposeSubject();
          $scope.$apply();
        }, function () {
          // 恢复上次平台
          _this.defaultSubjectId = _this.defaultSubjectIdStore;
          $scope.$apply();
        });
      } else {
        disposeSubject();
      }
    },
    "getPostData": function () {
      var _this = this;
      var postData = {
        "id": _this.id,
        "name": _this.name,
        "remark": $scope.nodecomment,
        "type": _this.type,
        "shops": _this.postSaveShopsData && _this.postSaveShopsData.length > 0 ? (function () {
          var shops = [{
            id: $scope.tfilterFindObj.shops.id,
            queryItemId: $scope.tfilterFindObj.shops.queryItemId,
            type: '字典多选',
            values: {}
          }];
          _this.postSaveShopsData.forEach(function (shop) {
            shops[0].values[shop.shopId] = shop.shopName;
          });
          return shops;
        })() : [],
        "subjectId": _this.defaultSubjectId
      };
      if (!$scope.isGroupApp) {
        if (postData.type == "custom") { //自定义查询
          //获取conditions数据
          var customScope = $('.queryConditionormWrap').scope();
          postData.relation = customScope.globalConditions.relation;
          postData.conditions = customScope.getAllConditions();
        }
      } else {
        /*   _this.postSaveShopsData=[{
         "shopName":_this.shopLists[0].name,
         "shopId":_this.shopLists[0].idInPlat,
         }]
         var postData = {
         "id": _this.id,
         "name": _this.name,
         "remark": $scope.nodecomment,
         "type": _this.type,
         "shops": _this.postSaveShopsData && _this.postSaveShopsData.length > 0 ? (function() {
         var shops = [{
         id: $scope.tfilterFindObj.shops.id,
         queryItemId: $scope.tfilterFindObj.shops.queryItemId,
         type: '字典多选',
         values: {}
         }];
         _this.postSaveShopsData.forEach(function(shop) {
         shops[0].values[shop.shopId] = shop.shopName;
         });
         return shops;
         })() : [],
         "subjectId": _this.defaultSubjectId
         };*/
        if (postData.type == "custom") { //自定义查询
          //获取conditions数据
          var customScope = $('.queryConditionormWrap').scope();
          if (!$scope.isGroupApp) {//客户分群
            postData.relation = customScope.globalConditions.relation;
          } else {
            if (!$scope.customerGroupStatus) {//新建
              postData.relation = $scope.creatGroupObj.relationCreate;
            } else {
              postData.relation = $scope.creatGroupObj.relationEdit;
            }
          }
          postData.conditions = customScope.getAllConditions();
        }
      }

      return postData;
    },
    "postQueryDataMethod": function (data) {
      var ajaxPromise = $q.defer();
      var _this = this,
        element = angular.element(".queryNodeGlobalButton");

      disposeCommMethod.shuyunAjaxButtonClickMethod(function () {
        getListService.postAttrQueryConditions(function () {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          if (!$scope.isGroupApp) {
            _this.removePop();
            $scope.editNodeName(_this.id, _this.name, $scope.nodecomment);
            $(this).yAlert({"text": "保存成功"});
            removeAlert();
          }
          ajaxPromise.resolve();
        }, data, element);
      }, element);
      return ajaxPromise.promise;
    },
    "postQueryData": function (cgd) { //保存节点 cgd="group"创建客户分组验证
      /* 动态加入form id ，否者submitHandler的数据会被插件缓存。
       * 如：保存为客户分组操作，不动态添加form，cgd的值不会改变
       */
      var _this = this;
      var curPostData = _this.getPostData();
      //必填验证
      if (!_this.checkCondition()) {
        return false;
      }

      if (curPostData.type == "custom") { // 自定义查询保存
        if (cgd == "group") { // 是否为创建客户分组
          _this.queryCreatGroupData = {"data": curPostData, "groupFlag": true};
        } else {
          return _this.postQueryDataMethod(curPostData);
        }
      }
    },
    //保存客户分组start
    "queryCreatGroupName": "",
    "queryCreatIncludeGroupName": "请选择",
    "queryCreatIncludeGroupId": "",
    "queryCreatGroupData": "",
    "postCreateQueryGroupdata": "", //保存客户分组的数据
    "choiceWhichGoupSave": function () { //保存为客户分组 先保存查询节点配置的相关条件，
      var _this = this;
      getListService.isPostAdd(function (res) {
        if ($.isEmptyObject(res)) {
          _this.postQueryData("group");
          var isIncludeGroup = false,
            postCreateQueryGroupdata = "";
          if (_this.queryCreatGroupData.groupFlag) {
            isIncludeGroup = _this.queryCreatGroupData.groupFlag;
            _this.postCreateQueryGroupdata = _this.queryCreatGroupData.data;
          }
          ;
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
    "choiceWhichGoupPop": function () {
      if (!$scope.isGroupApp) {
        $(".groupSaveByQuery").addInteractivePop({
          magTitle: "保存为客户分组-属性查询",
          width: 734,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      } else {
        $(".groupSaveByQuery").addInteractivePop({
          magTitle: "保存为客户分组-属性查询",
          width: 734,
          mark: true,
          position: "fixed",
          childElePop: false
        });
      }
    },
    "getDefaultGroup": function () {
      var _this = this;
      getListService.getDefaultGroup(function (data) {
        // data.pop();
        var saveFix = {};
        var parentId = data[0].id;
        angular.forEach(data, function (value, key) {
          if (value.categoryName == "默认" && value.parentId == parentId) {
            saveFix = value;
            data.splice(key, 1);
            data.push(saveFix)
          }
        })
        _this.commonTree(data.slice(1), $('[name="createGroupCludeGroup"]'));
      });
    },
    "commonTree": function (data, ele) { //模拟select框中为树形结构
      var $selContent = ele.siblings(".selectContent");
      $selContent.children().remove();
      $selContent.css('maxHeight', '100px')
      var $ul = $("<ul>", {"class": "ztree"});
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
            addDiyDom: function (treeId, treeNode) {
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
    "saveCreateGroupByQuery": function () { // 保存为当前分组
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
      var element = angular.element(".groupBtn");
      disposeCommMethod.shuyunAjaxButtonClickMethod(function () {
        getListService.putAttrQueryCreateGroupByQuery(function (response) {
          angular.element(".groupSaveByQuery").remove();
          angular.element(".childElementMark:last").remove();
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
        }, putGroupData, element);
      }, element);
    }
  };
  $scope.tfilterFindObj.initData();
  disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

}]);
