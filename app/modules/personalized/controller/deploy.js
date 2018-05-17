/**
 * Created by shuyun on 2015/3/26.
 */
angular.module("peizhi", ['ui.router']).controller("peizhiCtrl", ["$scope", "$http", "$state", "$stateParams",
  function($scope, $http, $state, $stateParams) {
    $scope.$parent.menuIndex = 1; //左侧导航栏索引
    $scope.planIndex = 0; //当前方案索引
    $scope.showEditorPop = false; //控制规则条件pop显示、隐藏
    $scope.showProductPop = false; //控制商品选择pop显示、隐藏
    $scope.currentRuleIndex = 0; //当前规则索引
    $scope.currentConditionIndex = 0; //当前条件索引
    $scope.popMode = ""; //规则条件弹出框模式 Insert 插入  Edit 编辑
    $scope.searchKeyName = ""; //商品选择器 关键字查询
    $scope.selectedConditionList = []; //选中条件对象List,用于设置默认条件名
    $scope.condition = {}; //条件变量
    $scope.condition.indicatorId = 0; //指标选择
    $scope.condition.conditionOpName = "";
    $scope.condition.cityValue = "";
    $scope.typeList = [];
    $scope.propertyList = [];
    $scope.supportOps = [];
    $scope.providedValues = [];
    $scope.selectedProductList = []; //商品选择器左侧选中的商品List
    $scope.selectedItems = []; //商品选择器右侧选中的商品List
    if ($stateParams.planIndex) {
      $scope.planIndex = $stateParams.planIndex;
    }
    $scope.$on('getShopListReady',
        function(event,data) {
            $scope.getPlansInit(data);
        });

    //根据店铺ID获取方案组
    $scope.getPlansInit = function(currentShopId) {
      $scope.plans = [];
      $scope.currentPlan =[];
      $http.get("/pm/v1/plan_groups?platCode=taobao&shopId=" + currentShopId).success(function(data) {
        if (data.plans && data.plans.length > 0) {
          $scope.plans = data.plans;
          angular.forEach($scope.plans, function(value, key) {
            $scope.plans[key].editPlanName = false;
          });
          $scope.currentPlan = $scope.plans[$scope.planIndex];
        } else {
          $http.post("/pm/v1/plan_groups", angular.toJson({
            "shopId": currentShopId.toString(),
            "platCode": "taobao"
          })).success(function(data) {
            $scope.plans = data.plans;
            angular.forEach($scope.plans,
                function(value, key) {
                  $scope.plans[key].editPlanName = false;
                });
            $scope.currentPlan = $scope.plans[$scope.planIndex];
          });
        }
      });
    }

    //获取条件弹出框指标类型List
    $scope.getTypeList = function(condition) {
      $http.get("/pm/v1/indicator_groups").success(function(data) {
        $scope.typeList = data;
        if (!condition || !condition.indicatorGroupId) {
          $scope.condition.indicatorGroupId = $scope.typeList[0].id;
        }
        $scope.getPropertyList($scope.condition);
      });
    }
    //获取条件弹出框指标选择List
    $scope.getPropertyList = function(condition) {
      $http.get("/pm/v1/indicator_groups/" + condition.indicatorGroupId).success(function(data) {
        $scope.propertyList = data.indicators;
        if (!condition || !condition.indicatorId) {
          $scope.condition.indicatorId = $scope.propertyList[0].id;
        } else {
          var tmp = [];
          for (var i in $scope.propertyList) {
            tmp.push($scope.propertyList[i].id);
          }
          if (tmp.indexOf(condition.indicatorId) == -1) {
            $scope.condition.indicatorId = $scope.propertyList[0].id;
          }
        }
        $scope.getSupportOpListAndProvidedValues(condition);
      });
    }

    //获取满足条件List、providedValues...
    $scope.getSupportOpListAndProvidedValues = function(condition,isInit) {
      $http.get("/pm/v1/indicators/" + condition.indicatorId).success(function(data) {
        $scope.supportOps = data.supportOps;
        $scope.providedValues = data.providedValues;
        if ($scope.condition.indicatorId == '605') {
          if (!condition || !condition.SelectTwoVal) {
            $scope.condition.SelectTwoVal = $scope.providedValues[0].name;
          } else {
            var tmp = [];
            for (var i in $scope.providedValues) {
              tmp.push($scope.providedValues[i].name);
            }
            if (tmp.indexOf(condition.SelectTwoVal) == -1) {
              $scope.condition.SelectTwoVal = $scope.providedValues[0].name;
            }
          }
          if (!condition || !condition.conditionOpName) {
            $scope.condition.conditionOpName = $scope.supportOps[0].name;
          } else {
            var tmp = [];
            for (var i in $scope.supportOps) {
              tmp.push($scope.supportOps[i].name);
            }
            if (tmp.indexOf(condition.conditionOpName) == -1) {
              $scope.condition.conditionOpName = $scope.supportOps[0].name;
            }
          }
          if ($scope.providedValues.length > 0) {
            $scope.condition.hasProvidedValues = true;
          } else {
            $scope.condition.hasProvidedValues = false;
          }
          $scope.condition.productViewName = "";
          $scope.getCityList($scope.condition);
        } else if ($scope.condition.indicatorId == '608') {
          if (!condition || !condition.conditionOpName) {
            $scope.condition.conditionOpName = $scope.supportOps[0].name;
          } else {
            var tmp = [];
            for (var i in $scope.supportOps) {
              tmp.push($scope.supportOps[i].name);
            }
            if (tmp.indexOf(condition.conditionOpName) == -1) {
              $scope.condition.conditionOpName = $scope.supportOps[0].name;
            }
          }
          if ($scope.providedValues.length > 0) {
            $scope.condition.hasProvidedValues = true;
          } else {
            $scope.condition.hasProvidedValues = false;
          }
            if(angular.isDefined(isInit) && !isInit){
                $scope.condition.productViewName = "";
            }
            else{
                $scope.condition.productViewName = "您已选中"+condition.referenceValue.split(",").length +"件商品";
            }
//          $scope.condition.productViewName = "";
        } else {
          if (!condition || !condition.conditionOpName) {
            $scope.condition.conditionOpName = $scope.supportOps[0].name;
          } else {
            var tmp = [];
            for (var i in $scope.supportOps) {
              tmp.push($scope.supportOps[i].name);
            }
            if (tmp.indexOf(condition.conditionOpName) == -1) {
              $scope.condition.conditionOpName = $scope.supportOps[0].name;
            }
          }
          if ($scope.providedValues.length > 0) {
            $scope.condition.hasProvidedValues = true;
            var tmp = [];
            for (var i in $scope.providedValues) {
              tmp.push($scope.providedValues[i].name);
            }
            if (tmp.indexOf(condition.SelectTwoVal) == -1) {
              $scope.condition.SelectTwoVal = $scope.providedValues[0].name;
            }
          } else {
            $scope.condition.hasProvidedValues = false;
          }
            if(angular.isDefined(isInit) && !isInit){
                $scope.condition.productViewName = "";
            }
            else{
                $scope.condition.productViewName = condition.referenceValue;
            }
        }
      });
    }

    //获取城市List
      $scope.getCityList = function (condition) {
        if (condition.indicatorId == '605') {
          var regionId = 0;
          if (isNaN(Number(condition.SelectTwoVal))) {
            for (var i = 0; i < $scope.providedValues.length; i++) {
              if ($scope.providedValues[i].name == $scope.condition.SelectTwoVal) {
                regionId = $scope.providedValues[i].id;
              }
            }
          }
          $http.get("/pm/v1/dictionary/region/" + regionId).success(function (data) {
            $scope.cityList = data;
            if (!condition || !condition.cityValue) {
              $scope.condition.cityValue = "";
            }
            else{
              var tmp = [];
              for(var i in $scope.cityList){
                tmp.push($scope.cityList[i].value);
              }
              if(tmp.indexOf(condition.cityValue) == -1){
                $scope.condition.cityValue = "";
              }
            }
          });
        }
      };

    //设置默认条件名
    $scope.setDefaultConditionName = function() {
      if ($scope.condition && $scope.condition.useDefaultName) {
        $scope.condition.name = "";
        for (var i = 0; i < $scope.propertyList.length; i++) {
          if ($scope.propertyList[i].id == $scope.condition.indicatorId) {
            $scope.condition.name += $scope.propertyList[i].name;
            break;
          }
        }
        for (var i = 0; i < $scope.supportOps.length; i++) {
          if ($scope.supportOps[i].name == $scope.condition.conditionOpName) {
            $scope.condition.name += $scope.supportOps[i].label;
            break;
          }
        }
        if ($scope.condition.hasProvidedValues) {
          for (var i = 0; i < $scope.providedValues.length; i++) {
            if ($scope.providedValues[i].name == $scope.condition.SelectTwoVal) {
              $scope.condition.name += $scope.providedValues[i].name;
              break;
            }
          }
        } else {
          if ($scope.condition.indicatorId != "608" && $scope.condition.productViewName) { //商品选择 不显示
              $scope.condition.name += $scope.condition.productViewName;
          }
        }
        if ($scope.condition.indicatorId == "605" && $scope.cityList) { //
          for (var i = 0; i < $scope.cityList.length; i++) {
            if ($scope.cityList[i].value == $scope.condition.cityValue) {
              $scope.condition.name += $scope.cityList[i].name;
              break;
            }
          }
        }
      }
    };

    $scope.getTypeList();

    //更改选中方案CSS
    $scope.getPlanCss = function(index) {
      var style = "";
      if ($scope.planIndex >= 0) {
        if (index == $scope.planIndex) {
          style = "cur";
        }
      }
      return style;
    }

    //编辑方案名称
    $scope.editPlanName = function() {
      if (!$scope.currentPlan.active) {
        $scope.currentPlan.editPlanName = true;
      }
    }

    //校验方案名称
    $scope.checkPlanName = function(event) {
      if ($scope.currentPlan.name.length > 20 || $scope.currentPlan.name.length == 0) {
        event.stopPropagation();
        $(".sidebarFt").Alert({
          "title": "提示",
          "str": "默认方案名称不能为空，最大长度为20！",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, function() {
          $(event.target).select();
        });
        return;
      } else {
        $scope.currentPlan.editPlanName = false;
      }
    }

    //编辑规则名称
    $scope.editRuleName = function(rule) {
      rule.allowdEditRuleName = true;
    }

    //校验规则名称
    $scope.checkRuleName = function(event, rule) {
//      if (rule.name.length > 20 || rule.name.length == 0) {
//        event.stopPropagation();
//        $(".sidebarFt").Alert({
//          "title": "提示",
//          "str": "请填写规则名称，最大长度为20！",
//          "mark": true,
//          "eleZindex": 1001,
//          "markZindex": 1000
//        }, function() {
//          $(event.target).select();
//        });
//        return;
//      } else {
//        rule.allowdEditRuleName = false;
//      }
        rule.allowdEditRuleName = false;
    }

    //显示当前方案的规则
    $scope.showRules = function(index) {
      $scope.planIndex = index;
      angular.forEach($scope.plans, function(value, key) {
        if (key != index) {
          $scope.plans[key].editPlanName = false;
        }
      });
      $scope.currentPlan = $scope.plans[index];
    }

    //更改规则优先级
    $scope.changePosition = function(index, type) {
      if (type == "del") {
        $(".sidebar").Confirm({
          "title": "提示",
          "str": "确认删除该条规则？",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, function() {
          $scope.currentPlan.rules.splice(index, 1);
          angular.forEach($scope.currentPlan.rules, function(value, key) {
            value.position = key + 1;
          });
          $scope.$apply();
        });
      } else if (type == "max") {
        $scope.currentPlan.rules.unshift($scope.currentPlan.rules.splice(index, 1)[0]);
      } else if (type == "++") {
        $scope.currentPlan.rules.splice(index - 1, 0, $scope.currentPlan.rules.splice(index, 1)[0]);
      } else if (type == "--") {
        $scope.currentPlan.rules.splice(index + 1, 0, $scope.currentPlan.rules.splice(index, 1)[0]);
      } else if (type == "min") {
        $scope.currentPlan.rules.push($scope.currentPlan.rules.splice(index, 1)[0]);
      }
      angular.forEach($scope.currentPlan.rules, function(value, key) {
        value.position = key + 1;
      });
    }

    //添加规则
      $scope.addRule = function () {
        if ($scope.currentPlan.rules.length < 10) {
          var rule = {};
          rule.name = "规则名称：" + new Date().Format("MM-dd hh:mm:ss");
          rule.position = $scope.currentPlan.rules.length + 1;
          rule.conditions = [];
          rule.actionType = "SELLER_MEMO";
          rule.actionDetail = "";
          $scope.currentPlan.rules[$scope.currentPlan.rules.length] = rule;
        } else {
          $(".sidebar").Alert({
            "title": "提示",
            "str": "每份方案的规则上限为10！",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          }, null);
        }
      }

    $scope.savePlan = function() {
      for (var i in $scope.currentPlan.rules) {
        if ($scope.currentPlan.rules[i].actionDetail.length == 0) {
          $(".sidebar").Alert({
            "title": "提示",
            "str": "规则备注不能为空！",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          }, null);
          return;
        }
        else if ($scope.currentPlan.rules[i].actionDetail.length > 100) {
          $(".sidebar").Alert({
            "title": "提示",
            "str": "请正确填写订单备注,长度最大为100！",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          }, null);
          return;
        }

        if ($scope.currentPlan.rules[i].conditions.length == 0) {
          $(".sidebar").Alert({
            "title": "提示",
            "str": "请配置方案的条件！",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          }, null);
          return;
        }

        if ($scope.currentPlan.rules[i].name.length == 0) {
          var index = Number(i) + 1;
          $(".sidebar").Alert({
            "title": "提示",
            "str": "请填写规则" + index + "名称，最大长度为20！",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          }, null);
          return;
        }

        for(var ii in $scope.currentPlan.rules[i].conditions){
          if(ii >  1 && $scope.currentPlan.rules[i].conditions[ii-1].relation != $scope.currentPlan.rules[i].conditions[ii].relation){
            $(".sidebar").Alert({
              "title": "提示",
              "str": "规则不能同时含有[或者]和[并且]！",
              "mark": true,
              "eleZindex": 1001,
              "markZindex": 1000
            }, null);
            return;
          }
        }
      }
      $http.put("/pm/v1/plans/" + $scope.currentPlan.id, angular.toJson($scope.currentPlan)).success(function(d) {
        $(".sidebar").Alert({
          "title": "提示",
          "str": "保存成功！",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, null);
      });
    }

    $scope.productGridColumns = [{
      width: 45,
      caption: "",
      cellTemplate: function(container, options) {
        $(container).html("<img width='45' height='45' src='" + options.data.picUrl + "'>" + " <img/>");
      }
    },
    {
      dataField: "numIid",
      dataType: 'string',
      alignment: 'left',
      width: 300,
      caption: "商品详情",
      cellTemplate: function(container, options) {
        $(container).html("<div class='info'><p class='goodsName'>" + options.data.title + "</p><p><span class='goodsId'>商品ID：<span>" + options.data.numIid + "</span></span><span class='goodsPrice'>¥" + options.data.price + "</span></p></div>");
      }
    }];

    //规则条件弹框配置
    $scope.editorPopOption = {
      title: '"规则条件"',
      closeOnOutsideClick: 'false',
      visible: 'showEditorPop',
      width: '"500"',
      height: '"350"'
    };

    //商品选择弹框配置
    $scope.productPopOption = {
      title: '"商品选择"',
      closeOnOutsideClick: 'false',
      visible: 'showProductPop',
      width: '"900"',
      height: '"700"'
    };

    $scope.productGridConfig = {
      bindingOptions: {
        dataSource: "productSource",
        selectedRowKeys: "selectedProductList"
      },
      columns: $scope.productGridColumns,
      hoverStateEnabled: 'true',
      scrolling: {
        mode: "standard"
      },
      sorting: {
        mode: "single"
      },
      allowColumnReordering: false,
      wordWrapEnabled: false,
      height: "500",
      paging: {
        pageSize: 10
      },
      showColumnLines: false,
      showRowLines: true,
      showBorders: true,
      selection: {
        mode: "multiple"
      },
      onSelectionChanged: function(e) {
        var selectedItems = e.currentSelectedRowKeys;
        var unselectedItems = e.currentDeselectedRowKeys;
        if ($scope.showProductPop == false) {
          return;
        }
        if (!$scope.selectedItems || $scope.selectedItems.length == 0) {
          angular.copy(selectedItems, $scope.selectedItems);
        } else {
          for (var i = 0; i < unselectedItems.length; i++) {
            for (var j = 0; j < $scope.selectedItems.length; j++) {
              if (unselectedItems[i].numIid == $scope.selectedItems[j].numIid) {
                $scope.selectedItems.splice(j, 1);
                break;
              }
            }
          }

          var tmp = [];
          for (var i = 0; i < selectedItems.length; i++) {
            for (var j = 0; j < $scope.selectedItems.length; j++) {
              if (selectedItems[i].numIid == $scope.selectedItems[j].numIid) {
                break;
              } else {
                if (j == $scope.selectedItems.length - 1) {
                  tmp[tmp.length] = selectedItems[i];
                }
              }
            }
          }
          $scope.selectedItems = $scope.selectedItems.concat(tmp);
        }
      }
    };

    $scope.selectedProductListConfig = {
      bindingOptions: {
        dataSource: "selectedItems"
      },
      editConfig: {
        deleteEnabled: true,
        deleteType: "static"
      },
      editEnabled: true,
      noDataText: "请选择商品",
      height: 500,
      onItemDeleted: function(e) {
        for (var i = 0; i < $scope.selectedProductList.length; i++) {
          if ($scope.selectedProductList[i].numIid == e.itemData.numIid) {
            $scope.selectedProductList.splice(i, 1);
            break;
          }
        }
      }
    };

    //弹出商品选择框
    $scope.proSel = function() {
      if ($scope.condition.productViewName.length > 0) {
//      $scope.getSelectedProductItemsByID();
        $http.get("/pm/v1/products/" + $scope.condition.referenceValue + "?shopId=" + $scope.$parent.currentShopId).success(function(data) {
          $scope.selectedItems = data;
        });
      }
      $http.get("/pm/v1/products?q=" + $scope.searchKeyName + "&shopId=" + $scope.$parent.currentShopId).success(function(data) {
        $scope.productSource = data;
        $scope.showProductPop = true;
      });
    };

    //添加规则条件
    $scope.addRuleCondition = function(currentRuleIndex) {
      $scope.condition = {};
      if (angular.isDefined($scope.currentPlan.rules[currentRuleIndex].id)) {
        $scope.condition.ruleId = $scope.currentPlan.rules[currentRuleIndex].id;
      }
      $scope.condition.position = $scope.currentPlan.rules[currentRuleIndex].conditions.length;
      $scope.condition.relation = "AND";
      $scope.condition.useDefaultName = true;
      $scope.showEditorPop = true;

      $scope.currentRuleIndex = currentRuleIndex;
      $scope.popMode = "Insert";
      $scope.getTypeList($scope.condition);
    }

    //编辑规则条件
    $scope.editRuleCondition = function(currentRuleIndex, currentConditionIndex) {
      $scope.condition = {};
      angular.copy($scope.currentPlan.rules[currentRuleIndex].conditions[currentConditionIndex], $scope.condition);
      if ($scope.condition.indicatorId == "608") { //商品选择
        $scope.condition.productIdList = $scope.condition.referenceValue.split(',');
        $scope.condition.productViewName = "您已选中" + $scope.condition.productIdList.length + "件商品";
      } else if ($scope.condition.indicatorId == "605") { //省市
        if ($scope.condition.referenceValue.split(',').length > 0) {
          $scope.condition.SelectTwoVal = $scope.condition.referenceValue.split(',')[0];
        }
        if ($scope.condition.referenceValue.split(',').length > 1) {
          $scope.condition.cityValue = $scope.condition.referenceValue.split(',')[1];
        }
      }
      $scope.showEditorPop = true;
      $scope.popMode = "Edit";
      $scope.getTypeList($scope.condition);

      $scope.currentRuleIndex = currentRuleIndex;
      $scope.currentConditionIndex = currentConditionIndex;
    }

    //删除规则条件
    $scope.delRuleCondition = function(currentRuleIndex, currentConditionIndex) {
      $(".sidebar").Confirm({
        "title": "提示",
        "str": "确认删除该条件？",
        "mark": true,
        "eleZindex": 1001,
        "markZindex": 1000
      }, function() {
        $scope.currentPlan.rules[currentRuleIndex].conditions.splice(currentConditionIndex, 1);
        $scope.$apply();
      });
    }

    //规则条件弹框确认按钮事件
    $scope.editorPopConfirm = function() {
      if (!$scope.condition.name || $scope.condition.name.length == 0 || $scope.condition.name.length > 30) {
        $(".sidebarFt").Alert({
          "title": "提示",
          "str": "请填写条件名称，最大长度为30！",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        });
        return;
      }
      if ($scope.condition.indicatorId == '605') { //省市
        $scope.condition.referenceValue = $scope.condition.SelectTwoVal;
        if ($scope.condition.cityValue.length > 0) {
          $scope.condition.referenceValue += "," + $scope.condition.cityValue;
        }
      } else if ($scope.condition.indicatorId == '608') { //商品
        if (!$scope.condition.referenceValue || $scope.condition.referenceValue.length == 0) {
          $(".sidebarFt").Alert({
            "title": "提示",
            "str": "请选择商品！",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          });
          return;
        }
      } else { //其他
        if ($scope.condition.hasProvidedValues) {
          for (var i in $scope.providedValues) {
            if ($scope.providedValues[i].name == $scope.condition.SelectTwoVal) {
              $scope.condition.referenceValue = $scope.providedValues[i].id;
            }
          }
        } else {
          if (!$scope.condition.productViewName || $scope.condition.productViewName.length == 0 || isNaN(Number($scope.condition.productViewName))) {
            $(".sidebarFt").Alert({
              "title": "提示",
              "str": "请正确填写条件，填写整数字,最大长度为9！",
              "mark": true,
              "eleZindex": 1001,
              "markZindex": 1000
            });
            return;
          }
            else{
              $scope.condition.referenceValue = $scope.condition.productViewName;
          }
        }
      }
      if ($scope.popMode == "Edit") {
        $scope.currentPlan.rules[$scope.currentRuleIndex].conditions[$scope.currentConditionIndex] = $scope.condition;
      } else {
        $scope.currentPlan.rules[$scope.currentRuleIndex].conditions.push($scope.condition);
      }
      $scope.condition = null;
      $scope.showEditorPop = false;
    }

    //规则条件弹框取消按钮事件
    $scope.editorPopCancel = function() {
      $scope.condition = null;
      $scope.showEditorPop = false;
    }

    //搜索商品(根据关键字检索商品)
    $scope.searchProductByKey = function() {
      $http.get("/pm/v1/products?q=" + $scope.searchKeyName + "&shopId=" + $scope.$parent.currentShopId).success(function(data) {
        $scope.productSource = data;
        $scope.showProductPop = true;
      });
    }

//    //通过商品ID获取商品信息
//    $scope.getSelectedProductItemsByID = function() {
//      if ($scope.currentPlan.rules[$scope.currentRuleIndex].conditions[$scope.currentConditionIndex].propertyId == "608") {
//        $http.get("/pm/v1/products/" + $scope.condition.referenceValue + "?shopId=" + $scope.$parent.currentShopId).success(function(data) {
//          $scope.selectedItems = data;
//        });
//      }
//    }

    //商品选择弹框确认按钮事件
    $scope.productPop_Confirm = function() {
      $scope.condition.productIdList = [];
      angular.forEach($scope.selectedItems, function(value, key) {
        $scope.condition.productIdList.push(value.numIid);
      });
      $scope.condition.referenceValue = $scope.condition.productIdList.join(',');
      $scope.condition.productViewName = "您已选中" + $scope.condition.productIdList.length + "件商品";
      $scope.showProductPop = false;
      $scope.selectedProductList = [];
    }

    //商品选择弹框取消按钮事件
    $scope.productPop_Cancel = function() {
      $scope.showProductPop = false;
      $scope.selectedProductList = [];
    }

    $scope.$emit("childCtrlInitComplete", "");
    $("a[href='#/peizhi/']").click();
  }
]);