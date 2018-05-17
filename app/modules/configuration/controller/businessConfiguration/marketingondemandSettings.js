angular.module('ccmsApp').controller('marketingondemandCtrl', ['$scope', '$http', 'getListService', 'deleteService', 'saveService',
  function($scope, $http, getListService, deleteService, saveService) {
    $scope.getMarketSubject = function() {
      var callback = function(data) {
        $scope.subjects = data;
        var locationSubjectVal = (data[0] && data[0].id) || "";
        angular.forEach(data, function(val, key) {
          if (val.selected) {
            locationSubjectVal = val.id;
          }
        });
        $scope.marketDefaultSubject = locationSubjectVal;
      }
      getListService.getMarketingondemandSubjectsList(callback, $scope.subjects);

    };
    $scope.getMarketSubject();
    $scope.saveMarketSettings = function() {
      var saveCustomerAttributesSettings = [];
      var selectSubjectId = (angular.element("[name='marketRadioSubject']:checked").val()) * 1;
      saveCustomerAttributesSettings.push(selectSubjectId);
      var callback = function(data) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
      }
      saveService.postMarketingondemandSubjectsList(callback, saveCustomerAttributesSettings)

    }
  }
]);