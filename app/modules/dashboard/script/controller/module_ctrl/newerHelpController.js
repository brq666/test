// JavaScript Document
angular.module("dashboard.controllers").controller('newerHelpController', ["$scope", "$filter", "$http", "$window", "$location", "$element",
  function($scope, $filter, $http, $window, $location, $element) {
    //获取帮助更多链接这里与menu重复，要想办法合并
    $scope.getHelpLink = function() {
      $http.get(GLOBAL_STATIC.dashboardRoot + "dashboard/assemble/helplink/", {
        headers: {
          'Accept': 'application/json'
        }
      }).success(function(response) {
        $scope.helplink = response.url;
        window.open($scope.helplink)
      }).error(function(data, status, headers, config) {
        if (data.message) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": false,
            "eleZindex": 20002,
            "markZindex": 20001
          });
        }
      })
    };

    //$scope.getHelpLink();
    //请求获取新手帮助的item的信息
    $http.get(GLOBAL_STATIC.dashboardRoot + 'dashboard/assemble/helpinfo').success(getHelpInfos).error(serverFail);

    $scope.infos = [];

    //获取新手活动信息
    function getHelpInfos(data) {
      $scope.infos = data;
    }

    function serverFail(data) {
      $scope.infos = [];
    };
  }
]);
