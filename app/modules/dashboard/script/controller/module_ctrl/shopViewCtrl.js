// JavaScript Document
angular.module("dashboard.controllers").controller('shopViewCtrl', ["$scope", "$filter", "$http", "$window", "$location", "$element", "dashboardService",
  function($scope, $filter, $http, $window, $location, $element, dashboardService) {
    var showShuzai = function() {
      $element.find(".shuzai").animate({
        top: "-50px"
      })
    }
    $scope.hideShuzai = function(e) {
      var target = e.target;
      $(target).animate({
        top: "0px"
      })
    }

    dashboardService.getShopInfo({}, function(response) {
      if (response) {
        $scope.shopsInfo = response;
        var shopsInfoLength = response.shop.length;
        $scope.payAttenetion = "";
        for (var i = 0; i < shopsInfoLength; i++) {
          var stopLoopKey1 = $scope.shopsInfo.shop[i].shopExpiration;
          var stopLoopKey2 = $scope.shopsInfo.shop[i].sessionKeyExpiration;
          if (i == shopsInfoLength - 1) {
            if (stopLoopKey1 == "0") {
              showShuzai();
              $scope.payAttenetion = 1;
            } else if (stopLoopKey2 == "0") {
              showShuzai();
              $scope.payAttenetion = 2;
            }
            break;
          } else {
            if (stopLoopKey1 == "0") {
              showShuzai();
              $scope.payAttenetion = 1;
              break;
            } else if (stopLoopKey2 == "0") {
              showShuzai();
              $scope.payAttenetion = 2;
              continue;
            } else {
              continue;
            }
          }
        }
        $scope.shopsInfo.curShopName = response.shop[0].shopName;
        $scope.shopsInfo.curLastUpdateTime = response.shop[0].lastUpdateTime;
      }
    });
    $scope.changeShopView = function(shopInfo) {
      $scope.shopsInfo.curShopName = shopInfo.shopName;
      $scope.shopsInfo.curLastUpdateTime = shopInfo.lastUpdateTime;
    };
    //清楚setTime
    $scope.$watch(function() {
      return $location.path();
    }, function(flagPath) {
      if (! (/^\/dashboard/.exec(flagPath))) {
        clearTimeout(window.imgAnimateTime);
      }
    });
  }
]);
