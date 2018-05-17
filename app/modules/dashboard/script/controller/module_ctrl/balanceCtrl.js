/**
 * Created by dupenghui on 2014/10/20.
 */
angular.module("dashboard.controllers").controller('balanceCtrl', ["$scope", "$filter", "$http", "$window", "$location", "$element",
  function($scope, $filter, $http, $window, $location, $element) {
    $scope.more = false;
    $scope.showButton = true;
    $scope.setMore = function() {
      if ($scope.more) {
        $scope.more = false
      } else {
        $scope.more = true
      }
    };
    var getRecharge = function(data) {
      if (data.length > 3) {
        $scope.showButton = false
      }
      $scope.channels = data;
      $scope.count = data.length;
    };
    var serverRechargeFail = function(data) {
      $scope.channel = [];
    };
    $http.get(GLOBAL_STATIC.dashboardRoot + 'dashboard/channel/balance').success(getRecharge).error(serverRechargeFail);
  }
]);
