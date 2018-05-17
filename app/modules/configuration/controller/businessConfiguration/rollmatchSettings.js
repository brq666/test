angular.module('ccmsApp').controller('RollmatchCtrl', ['$scope', '$http', 'getListService', 'deleteService', 'saveService',
  function($scope, $http, getListService, deleteService, saveService) {
    $scope.getSubject = function() {
      var callback = function(data) {
        $scope.subjects = data;
      }
      getListService.getRollMatchSubjectsList(callback, $scope.subjects);

    };
    $scope.getSubject();
    $scope.saveCustomerAttributesSettings = function() {
      var saveCustomerAttributesSettings = [];
      for (var i = $scope.subjects.length - 1; i >= 0; i--) {
        if ($scope.subjects[i].selected == true) {
          saveCustomerAttributesSettings.push($scope.subjects[i].id);
        }
      }
      var callback = function(data) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
      }
      saveService.postRollMatchSubjectsList(callback, saveCustomerAttributesSettings)
    }
  }
])