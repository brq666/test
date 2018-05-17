// JavaScript Document
angular.module("dashboard.controllers").controller('adsImagesCtrl', ["$scope", "$filter", "$http", "$window", "$location", "$element",
  function($scope, $filter, $http, $window, $location, $element) {
    $http.get(GLOBAL_STATIC.dashboardRoot + "dashboard/system/advert").success(function(response) {
      if (response) {
        response[0].className = "cur";
        $scope.adverts = response;
        animateObj.scrollMethod(response.length);
      };
    });
  }
]);
