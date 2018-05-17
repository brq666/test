// JavaScript Document
angular.module("dashboard.controllers").controller('mainController', ["$scope", "$filter", "$http", "$window", "$location", "$element",
  function($scope, $filter, $http, $window, $location, $element) {
    $http.get(GLOBAL_STATIC.portalRoot + 'defaultModules/?_=' + new Date().getTime()).success(getModules).error(serverFail);

    //左边的模版
    $scope.lModules = [];
    //右边的模版
    $scope.rModules = [];

    function getModules(data) {
      $scope.lModules = data.left;
      $scope.rModules = data.right;
    }

    //服务器返回失败
    function serverFail(data) {
      $scope.lModules = [];
      $scope.rModules = [];
    };
  }
]);
