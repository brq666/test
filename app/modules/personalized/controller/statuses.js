/**
 * Created by shuyun on 2015/3/26.
 */
angular.module("jiankong", ['ui.router']).controller("jiankongCtrl", ["$scope", "$http", "$state", "$interval", "$filter",
  function($scope, $http, $state, $interval, $filter) {
    $scope.$parent.menuIndex = 2; //左侧导航栏索引
    var promise = null;
      $scope.$on('getShopListReady', function (event, data) {
        $scope.getPlansInit(data);
      });
    $scope.$on('$destroy', function() {
      $interval.cancel(promise);
    })

    //根据店铺ID获取方案组
    $scope.getPlansInit = function(currentShopId) {
      $scope.plans = [];

      $http.get("/pm/v1/plan_groups?platCode=taobao&shopId=" + currentShopId).success(function(data) {
        if (data.plans && data.plans.length > 0) {
          $scope.plans = data.plans;
          $scope.currentPlan = $scope.plans[0];
          angular.forEach($scope.plans, function(value, key) {
            if (value.active) {
              $scope.getPlanStatus(value, new Date().Format("yyyyMMdd"));
            }
          });
          promise = $interval(function() {
            $scope.planTimer();
          }, 1000);
        } else {
          $http.post("/pm/v1/plan_groups", angular.toJson({
            "shopId": currentShopId,
            "platCode": "taobao"
          })).success(function(data) {
            $scope.plans = data.plans;
            $scope.currentPlan = $scope.plans[0];
            angular.forEach($scope.plans, function(value, key) {
              $scope.getPlanStatus(value, new Date().Format("yyyyMMdd"));
            });
            promise = $interval(function() {
              $scope.planTimer();
            }, 1000);
          });
        }
      });
    };

    //获取方案运行状况
    $scope.getPlanStatus = function(Plan, dateSlot) {
      $http.get("/pm/v1/reports/" + dateSlot + "?planId=" + Plan.id).success(function(data) {
        Plan.statuses = data;
      });
    };
    $scope.getPlansInit($scope.$parent.currentShopId);

    $scope.planTimer = function() {
      for (var i = 0; i < $scope.plans.length; i++) {
        if ($scope.plans[i].active) {
          $scope.plans[i].formatDiffString = $filter("Countdown")(new Date($scope.plans[i].startTime).Format("yyyy/MM/dd hh:mm:ss"));
        } else {
          $scope.plans[i].formatDiffString = "未执行";
        }
      }
    }

    $scope.setActive = function(plan, i) {
      switch (i) {
        case 0:
          $scope.className = "";
          break;
        case 1:
          $scope.className = "leftValOne";
          break;
        case 2:
          $scope.className = "leftValTwo";
          break;
      }
      $scope.currentPlan = plan;
    };

    $scope.getRuleData = function(rule) {
      if (!$scope.currentPlan.statuses) {
        return {
          rate: '0%'
        };
      }
      var ruleData = $scope.currentPlan.statuses.ruleData;
      for (var i = ruleData.length - 1; i >= 0; i--) {
        if (ruleData[i].id == rule.id) {
          return ruleData[i];
        }
      }
      return {
        rate: '0%'
      };
    };

    $scope.$emit("childCtrlInitComplete", "");
  }
]);