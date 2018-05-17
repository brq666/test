/**
 * Created by shuyun on 2015/3/26.
 */
angular.module("bushu", ['ui.router']).controller("bushuCtrl", ["$scope", "$http", "$state", "$interval", "$filter",
  function($scope, $http, $state, $interval, $filter) {

    $scope.firstSign = ""; //当前方案签名
    $scope.showPreviewFirstSign = false;
    $scope.banModify = true; //是否允许修改默认备注签名
    $scope.signContent = ""; //默认备注签名预览内容
    var promise = null;
    $scope.$on('$destroy', function() {
      $interval.cancel(promise);
    });
      $scope.$on('getShopListReady', function(event,data) {
        $scope.getPlansInit(data);
      });

    //根据店铺ID获取方案组
    $scope.getPlansInit = function(currentShopId) {
      $scope.plans = [];
      $scope.firstSign = "";
      $http.get("/pm/v1/plan_groups?platCode=taobao&shopId=" + currentShopId).success(function(data) {
        if (data.plans && data.plans.length > 0) {
          $scope.plans = data.plans;
          $scope.$parent.currentPlanGroupId = data.id;
          $scope.firstSign = data.sign;
          promise = $interval(function() {
            $scope.planTimer();
          }, 1000);
        } else {
          $http.post("/pm/v1/plan_groups", angular.toJson({
            "shopId": currentShopId,
            "platCode": "taobao"
          })).success(function(data) {
            $scope.plans = data.plans;
            $scope.$parent.currentPlanGroupId = data.id;
            $scope.firstSign = data.sign;
            promise = $interval(function() {
              $scope.planTimer();
            }, 1000);
          });
        }
      });
    };

    $scope.planTimer = function() {
      for (var i = 0; i < $scope.plans.length; i++) {
        if ($scope.plans[i].active) {
          $scope.plans[i].formatDiffString = $filter("Countdown")(new Date($scope.plans[i].startTime).Format("yyyy/MM/dd hh:mm:ss"));
        } else {
          $scope.plans[i].formatDiffString = "未执行";
        }
      }
    }

    //预览默认签名
    $scope.previewFirstSign = function() {
      if ($scope.showPreviewFirstSign == true) {
        $scope.showPreviewFirstSign = false;
        return;
      }
      $scope.showPreviewFirstSign = !$scope.showPreviewFirstSign;
      $scope.signContent = $scope.firstSign;
    }

    //修改默认签名
    $scope.checkFirstSign = function(event) {
      if (!$scope.firstSign || $scope.firstSign.length > 20) {
        $(".sidebar").Alert({
          "title": "提示",
          "str": "默认备注签名不能为空，最大长度为20！",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, function() {
          $(event.target).select();
        });
        return;
      }
      if (!/^[a-z0-9\u4e00-\u9fa5\s]+$/gi.test($scope.firstSign)) {
        $(".sidebar").Alert({
          "title": "提示",
          "str": "默认备注签不能包含特殊符号！",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, function() {
          $(event.target).select();
        });
        return;
      }
      $http.put("/pm/v1/plan_groups/" + $scope.$parent.currentPlanGroupId + "/sign", angular.toJson($scope.firstSign)).success(function(d) {
        $(".sidebar").Alert({
          "title": "提示",
          "str": "默认签名修改成功！",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, null);
        $scope.banModify = true;
      }).error(function(data, status, headers, config) {
        $(".sidebar").Alert({
          "title": "提示",
          "str": "更新签名失败！",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, function() {
          $(event.target).select();
        });
      });
    }

    //开启/关闭方案
    $scope.updatePlanStatus = function(plan, event) {
      event.stopPropagation();
      if (plan.active) {
        $(".sidebar").Confirm({
          "title": "关闭提示",
          "str": "确认关闭该方案？",
          "mark": true,
          "eleZindex": 1001,
          "markZindex": 1000
        }, function() {
          $http.put("/pm/v1/plans/" + plan.id + "/active", angular.toJson(false)).success(function(d) {
              plan.active = !plan.active;
          }).error(function() {

          });
        });
      } else {
        if (plan.rules.length == 0) {
          $(".sidebar").Alert({
            "title": "提示",
            "str": "当前方案没有配置规则，请先配置规则！",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          }, null);
        } else {
          $(".sidebar").Confirm({
            "title": "开启提示",
            "str": "启用后方案将立即生效，确认启用？",
            "mark": true,
            "eleZindex": 1001,
            "markZindex": 1000
          }, function() {
            $http.put("/pm/v1/plans/" + plan.id + "/active", angular.toJson(true)).success(function(d) {
//                plan.active = !plan.active;
                $scope.getPlansInit($scope.$parent.currentShopId);
            }).error(function() {

            });
          });
        }
      }
    };
    $scope.$emit("childCtrlInitComplete", "");
  }
]);