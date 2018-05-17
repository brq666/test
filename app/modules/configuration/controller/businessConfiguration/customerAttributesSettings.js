var app = angular.module('ccmsApp');
app.controller("customerAttributesSettings", ["$scope", "$http", "getListService", "deleteService", "saveService",
  function($scope, $http, getListService, deleteService, saveService) {
    $scope.getSubject = function() {
      var callback = function(data) {
        $scope.subjects = data;
        $scope.getCustomerAttributesSettings();
      }
      getListService.getSubject(callback, $scope.subjects);

    };
    $scope.getSubject();
    $scope.getCustomerAttributesSettings = function() {
      var callback = function(data) {
        $scope.customerAttributesSettings = data;
        for (var i = $scope.customerAttributesSettings.length - 1; i >= 0; i--) {
          angular.forEach($scope.subjects, function(val, key) {
            if (val.subjectId == $scope.customerAttributesSettings[i]) {
              val.check = true;
              console.log(val.subjectId);
            }
          })
          // if($scope.subjects[i].subjectId==$scope.customerAttributesSettings[i]){
          //    				$scope.subjects[i].check = true;
          //   			};
        }
        // for (var i = $scope.customerAttributesSettings.length - 1; i >= 0; i--) {
        //    			if($scope.subjects[i].subjectId==$scope.customerAttributesSettings[i]){
        //    				$scope.subjects[i].check = true;
        //    			};
        // };
      }
      getListService.getCustomerAttributesSettings(callback, $scope.customerAttributesSettings);
    }
    $scope.saveCustomerAttributesSettings = function() {
      var saveCustomerAttributesSettings = [];
      for (var i = $scope.subjects.length - 1; i >= 0; i--) {
        if ($scope.subjects[i].check == true) {
          saveCustomerAttributesSettings.push($scope.subjects[i].subjectId);
        }
      };
      var callback = function(data) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
      }
      saveService.saveCustomerAttributesSettings(callback, saveCustomerAttributesSettings)
    }
  }
]);