;angular.module('campaign.controllers').controller('tfilterCampQueryCtrl', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$q', 'saveService', 'getListService', 'selectorShops', function ($rootScope, $scope, $timeout, $location, $http, $q, saveService, getListService, selectorShops) {
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
    "addNewactivity": true,
    "addNewlast": true,
    "addNewsuccess": true,
    "DefaultSelected": "",
    "DefaultSelectedId": "",
    "isEditorFlag": !$scope.isGroupApp && ((!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8)), //节点是否可编辑，确定按钮是否显示,
    "getNumber": function (callback, errorCallback) { // 底部统计人数服务
      var _this = $scope.tfilterFindObj;
      if (!_this.checkCondition()) {
        return false;
      }
      ;
      var curPostData = _this.getPostData();
      getListService.gettfilterCampQueryCount(callback, errorCallback, curPostData);
      return true;
    },
    "stopNumber": function (callback, errorCallback) { // 停止底部统计人数
      var _this = $scope.tfilterFindObj;
      var curPostData = _this.getPostData();
      getListService.stoptfilterCampQueryCount(callback, errorCallback, curPostData);
    },
    "addNewActivityNum": function () {
      if (this.addNewactivity) {
        var json = {
          "type": "参加次数",
          "valueChannel": "",
          "values": {
            "type": '天',
            "value": 1
          }
        }
        this.conditions.push(json);
        this.isnotCondition = false;
        $scope.setGroupValidate();
        this.addNewactivity = false;
      }
      else {
        $(this).Alert({"title": '提示', "str": '活动查询节点中最多添加1条“参加营销活动次数”条件！', "mark": true});
        $('.ccmsPublicPopBg').css({'z-index': '1003'})
        $('.yunat_maskLayer').eq(1).css({'z-index': '1002'})
      }
    },
    "addNewLastTime": function () {
      if (this.addNewlast) {
        var json = {
          "type": "最后参加时间",
          "valueChannel": "",
          "values": {
            "type": "absolutely",
          }
        }
        this.conditions.push(json);
        this.isnotCondition = false;
        $scope.setGroupValidate();
        this.addNewlast = false;
      }
      else {
        $(this).Alert({"title": '提示', "str": '活动查询节点中最多添加1条“最后一次参加营销活动的时间”条件！', "mark": true});
        $('.ccmsPublicPopBg').css({'z-index': '1003'})
        $('.yunat_maskLayer').eq(1).css({'z-index': '1002'})
      }
    },
    "addNewSuccessNum": function () {
      if (this.addNewsuccess) {
        var json = {
          "type": "活动成功",
          "valueChannel": "",
          "values": {
            "storeActivityId": "",
            "fillActivityValue": ""
          }
        }
        this.conditions.push(json);
        this.isnotCondition = false;
        $scope.setGroupValidate();
        this.addNewsuccess = false;
      }
      else {
        $(this).Alert({"title": '提示', "str": '活动查询节点中最多添加1条“参加营销活动”条件！', "mark": true});
        $('.ccmsPublicPopBg').css({'z-index': '1003'})
        $('.yunat_maskLayer').eq(1).css({'z-index': '1002'})
      }
    },
    "queryConditionClose": function (index, str) {
      this.conditions.splice(index, 1);
      if (str == 'activity') {
        this.addNewactivity = true;
      }
      if (str == 'last') {
        this.addNewlast = true;
      }
      if (str == 'success') {
        this.addNewsuccess = true;
      }
    },
    "isnotCondition": false, // 没配置条件提示
    "defaultShopValueAry": [],
    "defaultShopIdAry": [],
    "postSaveShopsData": [],
    "ShopUnusedAry": [],
    "showCustom": true, //默认显示自定义
    "conditions": [], // 配置条件
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
    "checkCondition": function () {
      var _this = $scope.tfilterFindObj;
      _this.queryCreatGroupData = "";
      var curPostData = _this.getPostData();
      console.log(curPostData)
      if (_this.isEditorFlag) {
        return false;
      }
      ;
      if (!_this.nodeName) {
        return false;
      }
      ;
      if (curPostData.type == "custom") {
        //店铺必选验证
        //if ($.isEmptyObject(curPostData.configs[0].values)) {
        //  _this.isUnShops = true;
        //  _this.selectShopsVal = "请选择店铺";
        //  return false;
        //} else {
        _this.isUnShops = false;
        //}
        //提交上传
        /*验证start*/

        if (curPostData.conditions.length == 0) {
          // $scope.creatGroupObj客户分组object
          _this.isnotCondition = true;
          $scope.setGroupValidate();
          return false;
        } else {
          _this.isnotCondition = false;
          $scope.setGroupValidate();
        }
        ;
        var checkPass = true;
        var checkdomList = $('.verifyonoff:visible');
        var checkabList = $('.datetimepicker:visible');
        var checkreList = $('.campmain_join_three_input:visible')
        var checkactivity = $('.joinActivities:visible')
        console.log(curPostData.conditions)
        angular.forEach(curPostData.conditions, function (val, ind) {
          if (val.type == '参加次数') {
            /*if (!val.values.activityValue) {
             checkPass = false;
             }*/
            checkdomList.each(function (ind) {
              if (!$(this).val()) {
                checkPass = false;
                $(this).addClass('active');
                if (ind == 0) {
                  $(this).siblings('div').eq(0).show();
                }
                else {
                  $(this).closest('span').siblings('div').eq(1).show();
                }
              } else {
                $(this).removeClass('active')
              }
            })
            //var reg = /^\+?[1-9]\d*$/;
          }
          if (val.type == '最后参加时间') {
            if (val.values.type == 'absolutely') {
              checkabList.each(function (ind) {
                if (!$(this).val()) {
                  checkPass = false;
                  $(this).addClass('active');
                  if (ind == 0) {
                    $(this).siblings('div').eq(0).show();
                  }
                  else {
                    $(this).closest('span').siblings('div').eq(1).show();
                  }
                } else {
                  $(this).removeClass('active')
                }
              })
            } else {
              checkreList.each(function () {
                if (!$(this).val()) {
                  checkPass = false;
                  $(this).addClass('active')
                  $(this).siblings('div').show();
                } else {
                  $(this).removeClass('active')
                }
              })
            }
          }
          if (val.type == '活动成功') {
            if (!val.values.fillActivityValue) {
              checkPass = false;
              checkactivity.each(function (ind) {
                $(this).addClass('active');
                $(this).after('<div class="warning_text" style="position: absolute;top: 33px;left:98px;display:block">请填写该字段</div>');
              })
            }
          }
        })
        for (var i = 0; i < curPostData.conditions.length; i++) {
          if (curPostData.conditions[i].type == '参加次数') {
            if (!curPostData.conditions[i].valueChannel) {
              checkPass = false
              $(this).Alert({"title": '提示', "str": '请选择参加营销活动次数－沟通方式', "mark": true});
              $('.ccmsPublicPopBg').css({'z-index': '1003'})
              $('.yunat_maskLayer').eq(1).css({'z-index': '1002'});
              break;
            }
          }
          if (curPostData.conditions[i].type == '最后参加时间') {
            if (!curPostData.conditions[i].valueChannel) {
              checkPass = false
              $(this).Alert({"title": '提示', "str": '请选择最后一次参加营销活动的时间－沟通方式', "mark": true});
              $('.ccmsPublicPopBg').css({'z-index': '1003'})
              $('.yunat_maskLayer').eq(1).css({'z-index': '1002'});
              break;
            }
          }
          if (curPostData.conditions[i].type == '活动成功') {
            if (!curPostData.conditions[i].valueChannel) {
              checkPass = false
              $(this).Alert({"title": '提示', "str": '请选择参加营销活动－沟通方式', "mark": true});
              $('.ccmsPublicPopBg').css({'z-index': '1003'})
              $('.yunat_maskLayer').eq(1).css({'z-index': '1002'});
              break;
            }
          }
        }
        /*if( $('.verifyonoff:visible').length == 1 ){
         if($('.verifyonoff:visible').val()==''){
         $('.verifyonoff:visible').addClass('active')
         checkPass = false
         }
         }
         if($('.verifyonoff:visible').length == 2){
         var num1 = 0;
         $('.verifyonoff:visible').each(function(){
         if($(this).val()==''){
         num1++;
         }
         })
         if(num1 == 2){
         $('.verifyonoff').addClass('active')
         checkPass = false
         }
         }*/

        /*if($('.datetimepicker:visible').length == 1){
         if($('.datetimepicker:visible').val()==''){
         $('.datetimepicker:visible').addClass('active')
         checkPass = false
         }
         }
         if($('.datetimepicker:visible').length == 2){
         var num2 = 0;
         $('.datetimepicker:visible').each(function(){
         if($(this).val()==''){
         num2++;
         }
         })
         if(num2 == 2){
         $('.datetimepicker').addClass('active')
         checkPass = false
         }
         }

         if($('.campmain_join_three_input:visible').length == 1){
         if($('.campmain_join_three_input:visible').val()==''){
         $('.campmain_join_three_input:visible').addClass('active')
         checkPass = false
         }
         }
         if($('.campmain_join_three_input:visible').length == 2){
         var num3 = 0;
         $('.campmain_join_three_input:visible').each(function(){
         if($(this).val()==''){
         num3++;
         }
         })
         if(num3 == 2){
         $('.campmain_join_three_input').addClass('active')
         checkPass = false
         }
         }*/

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
      }, 50)
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
        shopIds: $scope.tfilterFindObj.shops.shopIds,
        shopsList: $scope.tfilterFindObj.shops
      };
      var type = 'shop';
      console.log(a.shopIds)
      console.log(a.shopsList)
      selectorShops({
        type: 'shop',
        disable: false,// this.navName !== 'create' && this.navName !== 'edit',
        title: '店铺选择器',
        queryParams: {
          tenantId: CAMPAIGN_STATIC.tenantId,
          platCode: $scope.tfilterFindObj.subjectCode
        },
        bindings: Object.assign({}, self.bindings[a.code], {cid: a.chooseId}, {shopIds: a.shopIds}, {shopsList: a.shopsList}),
        onDone: function (bindings, changed) {
          console.log(bindings);
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
    "initData": function () { //打开
      var _this = this;
      // 加载活动查询内容
      $scope.tfilterFindObj.radioSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/splitFindNode/campQueryContent.html?_=" + new Date().getTime();
      var useabledShops = [];
      var delay = getListService.getPlatList(function (response) {
        $scope.tfilterFindObj.subjectList = response || [];
      });
      var channelType = getListService.tfilterCampQueryNodeChannelType(function (response) {
        $scope.tfilterFindObj.channelTypeData = response || [];
      });

      $q.all([delay, channelType]).then(function () {
        getListService.opentfilterCampQueryNode(function (response) {
          $scope.tfilterFindObj.nodeName = response.name ? response.name : "活动查询节点";
          $scope.tfilterFindObj.id = response.id ? response.id : "";
          $scope.nodecomment = response.remark ? response.remark : "";
          $scope.tfilterFindObj.queryType = response.type ? response.type : "custom";
          $scope.tfilterFindObj.defaultSubjectId = response.defaultSubject || 1;
          $scope.tfilterFindObj.defaultSubjectIdStore = response.defaultSubject || 1; // 存储上次选择的平台
          $scope.tfilterFindObj.relation = response.relation ? response.relation.toUpperCase() : 'AND';
          $scope.$emit('childRelation', $scope.tfilterFindObj.relation);
          var arr = [];
          var ids = [];
          if (response.configs != null) {
            if (response.configs.length != 0) {
              var json = response.configs[0].values;
              $.each(json, function (key, obj) {
                arr.push(
                  {'shopId': key, 'shopName': obj}
                );
                ids.push(key);
              })
            }
          }
          $scope.tfilterFindObj.shops = arr || [];
          $scope.tfilterFindObj.shops.storeId = response.shops && response.shops.length > 0 ? (response.shops[0].chooseId ? response.shops[0].chooseId : '') : '';
          $scope.tfilterFindObj.shops.shopIds = ids;
          /* 活动查询内容 start */
          $scope.tfilterFindObj.conditions = response.conditions || [];
          angular.forEach($scope.tfilterFindObj.conditions, function (val, ind) {
            if (val.type == '参加次数') {
              _this.addNewactivity = false;
            }
            if (val.type == '最后参加时间') {
              _this.addNewlast = false;
            }
            if (val.type == '活动成功') {
              _this.addNewsuccess = false;
            }
          })
          /* 活动查询内容 end */
          //获取平台id
          angular.forEach($scope.tfilterFindObj.subjectList, function (val, key) {
            if (val.subjectId == $scope.tfilterFindObj.defaultSubjectId) {
              $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
              $scope.tfilterFindObj.subjectCode = val.platCode;
            }
          });
          if ($scope.isGroupApp) {
            $scope.$emit('subjectId', $scope.tfilterFindObj.defaultSubjectId);
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
              // _this.checkAllShops();
            });
            _this.getFilterId();
          }, 0);
        }, graph.nodeId);
      });

      getListService.getNodeTipsByType(function (responseTips) { // 获取tips
        $scope.tfilterFindObj.tips = responseTips.tips || "";
      }, "tfilterCampQuery");
    },
    "getFilterId": function () {
      var _this = this;
      /*getListService.getCampFilterId(function(data) {
       _this.filterId = data[0] ? data[0].filterId : '';
       }, _this.defaultSubjectId);*/
    },
    "changeSubject": function () { // 切换主题平台
      var _this = this;

      function disposeSubject() {
        _this.selectShopsVal = "";
        _this.selectShopsId = "";
        _this.ShopIdsAry = [];
        _this.ShopUnusedAry = [];
        _this.postSaveShopsData = [];
        _this.shops= [];
        _this.shops.shopIds = [];
        angular.forEach(_this.subjectAry, function (val, key) {
          if (_this.defaultSubjectId == val.subjectId) {
            _this.segmentationId = val.segmentationId;
            _this.subjectCode = val.platCode;
            return false;
          }
        });
        //清空条件
        _this.relation = 'AND';
        _this.conditions.length = 0;
        _this.addNewactivity = true;
        _this.addNewlast = true;
        _this.addNewsuccess = true;
        $scope.$$childHead.count && $scope.$$childHead.count.number && ($scope.$$childHead.count.number = '');  //清空统计人数
        //更改上次存储平台id
        _this.defaultSubjectIdStore = _this.defaultSubjectId;
        //获取平台id
        angular.forEach($scope.tfilterFindObj.subjectList, function (val, key) {
          if (val.subjectId == $scope.tfilterFindObj.defaultSubjectId) {
            $scope.tfilterFindObj.defaultSegmentationId = val.segmentationId;
            _this.subjectCode = val.platCode;
          }
        });
        //店铺处理
        _this.getShopsLists().promise.then(function () {
          _this.disponseShops();
          // _this.checkAllShops();
        });
        _this.getFilterId();
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
        $(this).Confirm({"title": "提示", "str": "切换平台将会重置查询条件，是否继续？", "mark": true}, function () {
          disposeSubject();
          $scope.$apply();
        }, function () {
          // 恢复上次选择的平台id
          _this.defaultSubjectId = _this.defaultSubjectIdStore;
          $scope.$apply();
        });
        $('.ccmsPublicPopBg').css({'z-index': '1003'})
        $('.yunat_maskLayer').eq(1).css({'z-index': '1002'})
      } else {
        disposeSubject();
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
      // _this.checkAllShops();
    },
    "getPostData": function () {
      var _this = this;
      var shopvalues = {};
      var newarr = [];

      angular.forEach(_this.postSaveShopsData, function (val, ind) {
        var dataid = val.shopId;
        var dataname = val.shopName;
        shopvalues[dataid] = dataname
      })

      newarr.push({'type': '字典多选', 'values': shopvalues})
      var postData = {
        "id": _this.id,
        "name": _this.nodeName,
        "remark": $scope.nodecomment,
        "tip": "这个tip就是打开节点之后顶头那个提示",
        "type": _this.queryType,
        //"filterId": _this.filterId,
        "configs": newarr || [],
        //"subjects": _this.subjectList,
        "subjectId": _this.defaultSubjectId
      };
      if ("custom" == postData.type) { //自定义查询
        if (!$scope.isGroupApp) {
          postData.relation = _this.relation;
        } else {
          if (!$scope.customerGroupStatus) {//新建
            postData.relation = $scope.creatGroupObj.relationCreate;
          } else {
            postData.relation = $scope.creatGroupObj.relationEdit;
          }
        }
        postData.conditions = angular.copy(_this.conditions);
        postData.conditions.forEach(function (val, index) {
          if (val.type == '参加次数') {
            if (val.getExcludedselecttime) {
              val.values = val.getExcludedselecttime();
            }
            if (val.getExcludedselectcheckbox) {
              val.valueChannel = val.getExcludedselectcheckbox();
            }
            if (val.getExcludedselectnum) {
              angular.extend(val.values, val.getExcludedselectnum());
            }
          }
          if (val.type == '最后参加时间') {
            if (val.getExcludedselectlasttime) {
              val.valueChannel = val.getExcludedselectlasttime();
            }
            if (val.values.type == 'absolutely') {
              if (val.getExcludedabsolutely) {
                val.values = val.getExcludedabsolutely();
                val.values.type = 'absolutely'
                delete val.values.interval;
                delete val.values.dimension;
              }
            } else {
              if (val.getExcludedrelatively) {
                val.values = val.getExcludedrelatively();
                val.values.type = 'relatively'
                delete val.values.value;
              }
            }
          }
          if (val.type == '活动成功') {
            if (val.getExcludedselectsuccess) {
              val.valueChannel = val.getExcludedselectsuccess();
            }
            if (val.getExcludedActivitiesValues) {
              val.values = val.getExcludedActivitiesValues();
            }
          }
          /*val.campaignTime = val.getActivityTimeValues();
           val.choice = val.getPreferentialPoliciesValues();
           val.excludedActivities = val.getExcludedActivitiesValues();
           angular.extend(val, val.getScreenConditionsValues());
           delete val.getActivityTimeValues;
           delete val.getPreferentialPoliciesValues;
           delete val.getExcludedActivitiesValues;
           delete val.getScreenConditionsValues;*/
          delete val.getExcludedselecttime;
          delete val.getExcludedselectcheckbox;
          delete val.getExcludedselectnum;
          delete val.getExcludedselectlasttime;
          delete val.getExcludedabsolutely;
          delete val.getExcludedrelatively;
          delete val.getExcludedselectsuccess;
          delete val.getExcludedActivitiesValues;
        });
      } else if ("existingGroup" == postData.type) { // 选择已有客户分组
        postData.groupName = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName : "";
        postData.groupId = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId : "";
        postData.subjectId = ($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId != "undefined") ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId : "";
      }
      return postData;
    },
    "postQueryDataMethod": function (data) {
      var ajaxPromise = $q.defer();
      var _this = this,
        element = angular.element(".queryNodeGlobalButton");
      disposeCommMethod.shuyunAjaxButtonClickMethod(function () {
        getListService.postCampQueryConditions(function (response) {
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
          magTitle: "保存为客户分组-活动查询",
          width: 734,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      } else {
        $(".groupSaveByQuery").addInteractivePop({
          magTitle: "保存为客户分组-活动查询",
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
        getListService.putCampQueryCreateGroupByQuery(function (response) {
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
