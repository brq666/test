;angular.module('campaign.controllers').controller('tfilterOrderQueryCtrl', ['$rootScope', '$sce', '$scope', '$timeout', '$location', '$http', '$q', 'saveService', 'getListService', 'selectorShops', function ($rootScope, $sce, $scope, $timeout, $location, $http, $q, saveService, getListService, selectorShops) {
  $scope.isGroupApp = ($location.$$path && $location.$$path === '/campaign/customerSegmentation'); // 适配客户分组
  $scope.setGroupValidate = function () {
    // $scope.creatGroupObj客户分组object
    $scope.creatGroupObj && ($scope.creatGroupObj.isnotCondition = $scope.tfilterFindObj.isnotCondition);
  };

  if (!$scope.isGroupApp) {
    $scope.openNodePop(); // 调用弹框
  }
  ;
  // 安全插入html
  $scope.deliberatelyTrustDangerousSnippet = function (snippet) {
    if (!~snippet.indexOf('<img')) {
      snippet = snippet.replace(/</g, '&lt;');
    }
    return $sce.trustAsHtml(snippet);
  };
  // 活动查询
  $scope.tfilterFindObj = {
    "isEditorFlag": !$scope.isGroupApp && ((!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8)), //节点是否可编辑，确定按钮是否显示,
    "getNumber": function (callback, errorCallback) { // 底部统计人数服务
      var _this = $scope.tfilterFindObj;
      if (!_this.checkCondition()) {
        return false;
      }
      ;
      var curPostData = _this.getPostData();
      getListService.gettfilterOrderQueryCount(callback, errorCallback, curPostData);
      return true;
    },
    "stopNumber": function (callback, errorCallback) { // 停止底部统计人数
      var _this = $scope.tfilterFindObj;
      var curPostData = _this.getPostData();
      getListService.stoptfilterOrderQueryCount(callback, errorCallback, curPostData);
    },
    "isnotCondition": false, // 没配置条件提示
    "defaultShopValueAry": [],
    "defaultShopIdAry": [],
    "postSaveShopsData": [],
    "ShopUnusedAry": [],
    "conditions": [],
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
    "removePop": function () {
      angular.element("#nodeContent").hide();
      angular.element(".yunat_maskLayer:last").remove();
    },
    "checkAllShops": function () {
      var _this = this;
      // if (_this.isUnShops) {
      //   _this.isUnShops = false;
      //   _this.selectShopsVal = "";
      // }
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
    "checkCondition": function () {
      var _this = $scope.tfilterFindObj;
      _this.queryCreatGroupData = "";
      var curPostData = _this.getPostData();
      if (_this.isEditorFlag) {
        return false;
      }
      ;
      if (!_this.nodeName) {
        return false;
      }
      ;
      console.log(curPostData);
      if (curPostData.type == "custom") {
        //店铺必选验证
        // if (curPostData.shops.length == 0) {
        //   _this.isUnShops = true;
        //   _this.selectShopsVal = "请选择店铺";
        //   return false;
        // } else {
        //   _this.isUnShops = false;
        // }
        //提交上传
        /*验证start*/
        if (curPostData.conditions.length == 0) {
          _this.isnotCondition = true;
          $scope.setGroupValidate();
          return false;
        } else {
          _this.isnotCondition = false;
          $scope.setGroupValidate();
        }
        ;

        var checkPass = true;

        return checkPass;
      }
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
    "getShops": function () {
      // 店铺选择
      var self = this;
      if (self.isEditorFlag) {
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
         shopIds:  $scope.tfilterFindObj.shops.shopIds,
         shopsList: $scope.tfilterFindObj.shops
       };
       var type = 'shop';
       selectorShops({
       type: 'shop',
       disable: false ,// this.navName !== 'create' && this.navName !== 'edit',
       title: '店铺选择器',
       bindings: Object.assign({}, self.bindings[a.code], {cid: a.chooseId}, {shopIds: a.shopIds}, {shopsList: a.shopsList}),
       onDone: function(bindings, changed) {
       console.log(bindings)
       //self.bindings[a.code] = bindings;
       //a.chooseId = bindings.cid;
       //a.length = bindings.items.length;
       self.sureAddShop(bindings.shopsList);
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
    "showCustomerPop": function () {
      if (!$scope.isGroupApp) {
        $(".commCustomConfigBox").addInteractivePop({
          magTitle: window.ccmsQueryCustomTitle,
          width: 1250,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      } else {
        $(".commCustomConfigBox").addInteractivePop({
          magTitle: window.ccmsQueryCustomTitle,
          width: 1250,
          mark: true,
          position: "fixed",
          childElePop: false
        });
      }
    },
    "queryConditionClose": function (index) { // 删除配置
      var _this = this;
      _this.conditions.splice(index, 1);
    },
    "openEditOrderQuery": function (id, index, isNew) { //打开编辑订单查询
      var _this = this;
      window.ccmsQueryCustomTitle = '订单查询'; // 自定义行为弹框的title名称
      _this.commCustomTemplate = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/customCondition/customOrderQueryTemplate.html?_=" + new Date().getTime();
      $scope.customerTemplateLoadingFlag = true;
      $scope.customDragCurId = Number(id); //标记当前拖拽自定义Id
      $scope.curEditorCustomIndex = index; //当前编辑的index
      $scope.customDragCurName = window.ccmsQueryCustomTitle;
      if (!isNew) {
        $scope.editorCustomFalg = true;
      } else {
        $scope.editorCustomFalg = false;
      }
    },
    "addNewCondition": function () { //新增条件
      var _this = this;
      //打开订单选择
      _this.openEditOrderQuery($scope.tfilterFindObj.defaultQueryItem, _this.conditions.length, true);
    },
    "initData": function () { //打开
      var _this = this;
      var useabledShops = [];
      // 加载内容页面
      $scope.tfilterFindObj.radioSrc = CAMPAIGN_STATIC.tplBasePath + 'view/node/splitFindNode/orderQueryContent.html?_=' + new Date().getTime();

      getListService.opentfilterOrderQueryNode(function (response) {
        $scope.tfilterFindObj.nodeName = response.name ? response.name : "订单查询节点";
        $scope.tfilterFindObj.id = response.id ? response.id : "";
        $scope.tfilterFindObj.tip = response.tip ? response.tip : "";
        $scope.nodecomment = response.remark ? response.remark : "";
        $scope.tfilterFindObj.queryType = response.type ? response.type : "custom";
        $scope.tfilterFindObj.subjectList = response.subjects || [];
        $scope.tfilterFindObj.defaultSubjectId = response.defaultSubject || 1;
        $scope.tfilterFindObj.defaultSubjectIdStore = response.defaultSubject || 1; // 存储上次的平台id
        $scope.tfilterFindObj.relation = response.relation ? response.relation.toUpperCase() : 'AND';

        var ids = [];
        $scope.tfilterFindObj.shops = response.shops && response.shops.length > 0 ? (function () {
          var shops = [];
          for (var key in response.shops[0].values) {
            shops.push({
              shopId: key,
              shopName: response.shops[0].values[key]
            })

            ids.push(key);
          }
          return shops;
        })() : [];
        $scope.tfilterFindObj.shops.id = response.shops && response.shops.length > 0 ? (response.shops[0].id ? response.shops[0].id : '') : '';
        $scope.tfilterFindObj.shops.storeId = response.shops && response.shops.length > 0 ? (response.shops[0].chooseId ? response.shops[0].chooseId : '') : '';
        $scope.tfilterFindObj.shops.shopIds = ids;
        /* 订单查询 start */
        $scope.tfilterFindObj.conditions = [];
        var conditions = response.conditions || [];
        conditions.forEach(function (condition) {
          $scope.tfilterFindObj.conditions.push({
            id: condition.id || "",
            type: condition.type ? condition.type : '行为自定义',
            queryCustomAttrLists: condition.values.conditions ? condition.values.conditions : [],
            queryCustomIndicatorLists: condition.values.indexConfig ? condition.values.indexConfig : [],
            queryCustomIndicatorRelation: condition.values.relationship == "AND" ? "并且" : "或者"
          });
        });
        /* 订单查询 end */
        //获取平台id
        angular.forEach($scope.tfilterFindObj.subjectList, function (val, key) {
          if (val.id == $scope.tfilterFindObj.defaultSubjectId) {
            $rootScope.segmentationId = $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
            $scope.tfilterFindObj.subjectCode = val.platCode
            $scope.tfilterFindObj.defaultQueryItem = val.queryitem;
          }
        });
        if ($scope.isGroupApp) {
          $scope.$emit('subjectId', $scope.tfilterFindObj.defaultSubjectId);
          $scope.$emit('childRelation', $scope.tfilterFindObj.relation);
        }
        //打开节点慢,延迟第二个请求
        $timeout(function () {
          //处理权限过期店铺
          _this.getShopsLists().promise.then(function () {
            useabledShops = _this.disponseShops($scope.tfilterFindObj.shops);
            angular.forEach(useabledShops, function (val, key) {
              _this.defaultShopValueAry.push(val.shopName);
              _this.defaultShopIdAry.push(val.shopId);
            });
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
          });
        }, 0);
      }, graph.nodeId);

      getListService.getNodeTipsByType(function (responseTips) { // 获取tips
        $scope.tfilterFindObj.tips = responseTips.tips || "";
      }, "tfilterOrderQuery");
    },
    "changeSubject": function () { // 切换主题平台
      var _this = this;

      function disposeSubject() {
        _this.selectShopsVal = "";
        _this.selectShopsId = "";
        _this.ShopIdsAry = [];
        _this.ShopUnusedAry = [];
        _this.postSaveShopsData = [];
        _this.shops.shopIds = [];
        angular.forEach(_this.subjectAry, function (val, key) {
          if (_this.defaultSubjectId == val.id) {
            $rootScope.segmentationId =  _this.segmentationId = val.segmentationId;
            $scope.tfilterFindObj.subjectCode = val.platCode
            return false;
          }
        });
        //清空条件
        _this.relation = 'AND';
        _this.conditions.length = 0;
        $scope.$$childHead.count && $scope.$$childHead.count.number && ($scope.$$childHead.count.number = '');  //清空统计人数
        //更改上次存储平台id
        _this.defaultSubjectIdStore = _this.defaultSubjectId;
        //获取平台id
        angular.forEach($scope.tfilterFindObj.subjectList, function (val, key) {
          if (val.id == $scope.tfilterFindObj.defaultSubjectId) {
            $rootScope.segmentationId = $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
            $scope.tfilterFindObj.subjectCode = val.platCode
            $scope.tfilterFindObj.defaultQueryItem = val.queryitem;
          }
        });
        //店铺处理
        // _this.getShopsLists().promise.then(function () {
        //   _this.disponseShops();
        // });
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
      if (_this.conditions.length > 0) {
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
          // 恢复上次选择的平台id
          _this.defaultSubjectId = _this.defaultSubjectIdStore;
          $scope.$apply();
        });
      } else {
        disposeSubject();
      }
    },
    "sureAddShop": function (lists) {
      var _this = this;
      _this.ShopValsViewAry = [];
      _this.ShopIdsAry = [];
      _this.postSaveShopsData = [];
      lists.forEach(function(val, key) {
         _this.ShopIdsAry.push(val.shopId);
         _this.ShopValsViewAry.push(val.shopName);
         _this.postSaveShopsData.push(val);
      });
      _this.selectShopsVal = _this.ShopValsViewAry.join(",");
      _this.selectShopsId = _this.ShopIdsAry.join(",");
      // if (_this.ShopIdsAry.length > 0) {
      //   _this.isUnShops = false;
      // }
    },
    "sureCancelShop": function () {
      var _this = this;
      _this.checkAllShops();
    },
    "getPostData": function () {
      var _this = this;

      var postData = {
        "id": _this.id,
        "name": _this.nodeName,
        "remark": $scope.nodecomment,
        "tip": _this.tip,
        "type": _this.queryType,
        "shops": _this.postSaveShopsData && _this.postSaveShopsData.length > 0 ? (function () {
          var shops = [{id: $scope.tfilterFindObj.shops.id, values: {}}]
          _this.postSaveShopsData.forEach(function (shop) {
            shops[0].values[shop.shopId] = shop.shopName;
          });
          return shops;
        })() : [],
        "subjectId": _this.defaultSubjectId
      };

      if ("custom" == _this.queryType) { //自定义查询
        if (!$scope.isGroupApp) {
          postData.relation = _this.relation;
        } else {
          if (!$scope.customerGroupStatus) { //新建
            postData.relation = $scope.creatGroupObj.relationCreate;
          } else {
            postData.relation = $scope.creatGroupObj.relationEdit;
          }
        }
        postData.conditions = _this.conditions.map(function (condition) {
          return {
            id: condition.id,
            type: condition.type,
            values: {
              conditions: condition.queryCustomAttrLists,
              indexConfig: condition.queryCustomIndicatorLists,
              relationship: condition.queryCustomIndicatorRelation
            }
          }
        });
      } else if ("existingGroup" == _this.queryType) { // 选择已有客户分组
        postData.groupName = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName : "";
        postData.groupId = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId : "";
        postData.groupCategoryId = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId : "";
      }
      return postData;
    },
    "postQueryDataMethod": function (data) {
      var ajaxPromise = $q.defer();
      var _this = this,
        element = angular.element(".queryNodeGlobalButton");

      disposeCommMethod.shuyunAjaxButtonClickMethod(function () {
        getListService.postOrderQueryConditions(function (response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          if (!$scope.isGroupApp) {
            _this.removePop();
            $scope.editNodeName(_this.id, _this.nodeName, $scope.nodecomment);
            $(this).yAlert({"text": "保存成功"});
            removeAlert();
          }
          ajaxPromise.resolve();
        }, data, element);
      }, element);
      return ajaxPromise.promise;
    },
    "postQueryData": function (cgd) { //保存节点 cgd="group"创建客户分组验证
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
          magTitle: "保存为客户分组-订单查询",
          width: 734,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      } else {
        $(".groupSaveByQuery").addInteractivePop({
          magTitle: "保存为客户分组-订单查询",
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
        //data.pop();
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
        getListService.putOrderQueryCreateGroupByQuery(function (response) {
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
