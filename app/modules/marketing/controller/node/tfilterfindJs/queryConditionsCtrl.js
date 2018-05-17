//查询节点自定义控制器
angular.module("campaign.controllers").controller('queryConditionsCtrl', ['$scope', '$http', 'getListService', '$rootScope', '$q',
  function($scope, $http, getListService, $rootScope, $q) {
    /*客户分组是涉及到嵌入查询节点，id会变化*/
    var queryDefaultSubjectId = $scope.tfilterFindObj ? $scope.tfilterFindObj.defaultSubjectId: $scope.sendQuerySubjectId; //主题id
    var defaultSegmentationId = $scope.tfilterFindObj ? $scope.tfilterFindObj.defaultSegmentationId: $scope.sendQuerySegmentationId; //平台id
    var queryDefaultNodeId = window.graph ? graph.nodeId: $scope.sendQueryNodeId;
    window.ISPEACHCUSTOMPOP = $scope.tfilterFindObj ? true: false; // 自定义的行为自定义弹框方式参数，见customConditions.js
    $scope.showCustomerPop = function() {
      if (window.ISPEACHCUSTOMPOP) { // 查询节点调取弹框 应用$scope.tfilterFindObj判断，当做controller里面angular会报错
        $(".commCustomConfigBox").addInteractivePop({
          magTitle: window.ccmsQueryCustomTitle,
          width: 1250,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      } else { // 客户分组调取弹框
        $(".commCustomConfigBox").addInteractivePop({
          magTitle: window.ccmsQueryCustomTitle,
          width: 1250,
          mark: true,
          position: "fixed"
        });
      };
    }
    /*end*/
    $scope.queryZtreeLoadingFlag = true;

    $http.get(GLOBAL_STATIC.nodeRoot + 'metas/picker/queryItem/subject/' + queryDefaultSubjectId + '?_=' + new Date().getTime()).success(function(res) { // id——主题平台id
      angular.forEach(res, function(value, key) {
        if (value.hasOwnProperty('parent')) {
          value.isParent = value['parent'];
        }
      });
      $scope.treeNodes = res;
      $scope.queryZtreeLoadingFlag = false;
    }).error(function(data, status, headers, config) {
      $(this).Alert({
        "title": httpTitle || "提示",
        "str": data.message,
        "mark": true
      });
    });
    //获取初始化数据
    $scope.globalConditions = {
      "disposeInitData": function(conditions, details) { //处理初始化条件配置的数据
        angular.forEach(conditions, function(val, key) {
          if (details[val.queryItemId]) { // 行为自定义无details
            val.conditionOps = $.extend(true, {}, (val.queryItemId && details[val.queryItemId] ? details[val.queryItemId] : {}));
          } else {
            val.conditionOps = {
              "type": val.type,
              "queryItemId": val.queryItemId,
              "name": val.name,
              "configs": {},
              "groupConditions": []
            }
          };
          val.conditionOps.id = val.id ? val.id: ""; //重新赋值条件list的id
          val.conditionOps.queryItemId = val.queryItemId ? val.queryItemId: "";
          val.conditionOps.groupConditions = val.groupConditions || [];
          //val.conditionOps.values=$.extend(true,{},(val.values?val.values:{}));
          val.conditionOps.values = val.values;
        });
        return conditions;
      },
      "disposeInitGlobal": function(filter, config) { //处理全局变量的数据-店铺字典多选与已经被选中的值关联
        angular.forEach(filter, function(val, key) {
          angular.forEach(config, function(v, k) {
            if (val.id == v.queryItemId) {
              val.values = v.values;
              val.cId = v.id;
            };
          });
        });
        return filter;
      },
      "queryGloballists": [],
      "ShopValsView": "",
      "ShopValsViewAry": [],
      "ShopUnusedAry": [],
      "ShopIds": "",
      "ShopIdsAry": [],
      "curRelation": "AND",
      "DefaultSelected" : "",
      "DefaultSelectedId" : "",
      "getShops": function() {
        var _this = this;
        if (_this.isUnShops) {
          _this.isUnShops = false;
          _this.ShopValsView = ""
        }

        if ($scope.tfilterFindObj) { // 查询节点调取弹框
          $(".queryShopsPop").addInteractivePop({
            magTitle: "请选择店铺",
            width: 734,
            height: 353,
            mark: false,
            position: "fixed",
            childElePop: true
          });
        } else { // 客户分组调取弹框
          $(".queryShopsPop").addInteractivePop({
            magTitle: "请选择店铺",
            width: 760,
            height: 353,
            mark: true,
            position: "fixed"
          });
        };
        this.toggleStatusShop = false;
        if(_this.shopLists.length == 1){
          angular.forEach(_this.shopLists, function(val, key) {
              val.classVal = "cur";
              angular.element(".queryShopsPop .editorShops li:eq(" + key + ")").addClass("cur");
          });
        }
        else{
          angular.forEach(_this.shopLists, function(val, key) {
            var flag = false;
            angular.forEach(_this.ShopIdsAry, function(v, k) {
              if (val.idInPlat == v) {
                flag = true;
              }
            });
            if (flag) {
              val.classVal = "cur";
              angular.element(".queryShopsPop .editorShops li:eq(" + key + ")").addClass("cur");
            } else {
              angular.element(".queryShopsPop .editorShops li:eq(" + key + ")").removeClass("cur");
            }
          });
        }
        $scope.toggleStatuVal = angular.element(".queryShopsPop .editorShops li.cur").length == _this.shopLists.length ? true: false;
        angular.element(".queryShopsPop .shopMenu input").attr('checked', $scope.toggleStatuVal);

      },
      "toggleAllShops": function() {
        s = angular.element(".queryShopsPop .shopMenu input").attr('checked');
        if (s) {
          angular.element(".shopsChecked .editorShops li").addClass("cur");
        } else {
          angular.element(".shopsChecked .editorShops li").removeClass("cur");
        }
      },
      "sureAddShop": function() {
        var _this = this;
        _this.ShopValsViewAry = [];
        _this.ShopIdsAry = [];
        var curElement = angular.element(".shopsChecked .cur a");
        curElement.each(function() {
          _this.ShopIdsAry.push(angular.element(this).attr("id"));
          _this.ShopValsViewAry.push(angular.element(this).text());
        });
        _this.ShopValsView = _this.ShopValsViewAry.join(",");
        _this.ShopIds = _this.ShopIdsAry.join(",");
      },
      "disposeShops": function(shopsData) { //暂时处理店铺的填充值
        var _this = this,
            useabledShopAry = {}
        angular.forEach(shopsData, function(val, key) {
          var isused = false;
          angular.forEach(_this.shopLists, function(v, k) {
            if (key == v.idInPlat) {
              isused = true;
            }
          });
          if (isused) {
            useabledShopAry[key] = val;
          } else {
            _this.ShopUnusedAry.push({
              name: val
            })
          }
        });
        angular.forEach(useabledShopAry, function(val, key) {
          $scope.globalConditions.ShopValsViewAry.push(val);
          $scope.globalConditions.ShopIdsAry.push(key);
        });
        $scope.globalConditions.ShopValsView = $scope.globalConditions.ShopValsViewAry.join("，") || $scope.globalConditions.DefaultSelected;
        $scope.globalConditions.ShopIds = $scope.globalConditions.ShopIdsAry.join(",") || $scope.globalConditions.DefaultSelectedId;
      }
    };

    /*获取全局头部*/
    getListService.getGlobalHead(function(responseGlobal) {
      var shopDelay = $q.defer();
      if (responseGlobal && responseGlobal.length > 0) {
        $scope.globalConditions.queryGloballists = responseGlobal;
      };
      getListService.getShopsByPlatformId(function(responseShop) { //获取对应平台店铺
        $scope.globalConditions.shopLists = responseShop || [];
        if(responseShop.length == 1){
          $scope.globalConditions.DefaultSelected = responseShop[0].name;
          $scope.globalConditions.DefaultSelectedId = responseShop[0].idInPlat;
          //切换平台时用
          if($scope.tfilterFindObj.ischangeSubject){
            $scope.globalConditions.ShopValsView = responseShop[0].name;
            $scope.globalConditions.ShopIds = responseShop[0].idInPlat;
          }
        }
        $rootScope.subjectMarkToGoodsPlug = { // 备注给商品选择器的店铺筛选
          "querySubjectShops": $.extend(true, {}, $scope.globalConditions.shopLists)
        };
        shopDelay.resolve(); //延迟成功的方法
        shopDelay.reject(); //失败的方法.
      }, defaultSegmentationId);
      // then 请求conditions
      shopDelay.promise.then(function() {
        if ($scope.tfilterFindObj ? !$scope.tfilterFindObj.ischangeSubject: ($scope.creatGroupObj ? !$scope.creatGroupObj.ischangeSubject: true)) { // 切换平台清空  客户分组 也用到 暂定
          getListService.getConfigConditions(function(response) {
            $scope.globalConditions.curRelation = response.relation ? response.relation: "AND";
            $scope.globalConditions.exceptFlag = response.isExcept ? response.isExcept: "false"; // 是否满足条件
            //初始化全局数据
            var filters = $scope.globalConditions.disposeInitGlobal(responseGlobal, response.configs);
            angular.forEach(filters, function(val, key) {
              if (val.type == "字典多选") {
                $scope.globalConditions.disposeShops(val.values);
              }
            });

            //默认初始化conditions
            if (response.conditions && response.conditions.length > 0) {
              var disposeData = $scope.globalConditions.disposeInitData(response.conditions, response.details); //处理后返回的数据
              $scope.addAllConditions(disposeData);
              $scope.dragReminderFlag = false;
            } else {
              $scope.dragReminderFlag = true; // 拖拽区提示
            }
          }, queryDefaultNodeId)
        } else {
          $scope.addAllConditions([]);
        }
      })
    }, queryDefaultSubjectId); //客户分组 也用到 暂定
  }
]);
