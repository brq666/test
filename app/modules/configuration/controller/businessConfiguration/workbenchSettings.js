angular.module('ccmsApp').controller('workbenchCtrl', ['$scope', '$http', 'getListService', 'deleteService', 'saveService',
  function($scope, $http, getListService, deleteService, saveService) {
    $scope.getWorkbenchSubject = function() {
      var callback = function(data) {
        $scope.subjects = data;
        var locationSubjectVal = (data[0] && data[0].id) || "";
        angular.forEach(data, function(val, key) {
          if (val.selected) {
            locationSubjectVal = val.id;
          }
        });
        $scope.workbenchDefaultSubject = locationSubjectVal;
      }
      getListService.getWorkbenchSubjectsList(callback, $scope.subjects);

    };
    $scope.getWorkbenchSubject();
    $scope.saveWorkbenchSettings = function() {
      var saveWorkbenchSettings = [];
      var selectSubjectId = (angular.element("[name='workbenchRadioSubject']:checked").val()) * 1;
      saveWorkbenchSettings.push(selectSubjectId);
      var callback = function(data) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
      }
      saveService.postWorkbenchSubjectsList(callback, saveWorkbenchSettings)

    }
  }
]);