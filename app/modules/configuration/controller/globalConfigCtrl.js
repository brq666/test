//全局参数配置
angular.module('ccmsApp').controller('GlobalParamCtrl', ['$scope', 'dataFilterConfigService', '$compile',
  function($scope, dataFilterConfigService, $compile) {
    $scope.globalParamObj = {
      "subjectNameLists": [],
      "globalLists": [],
      "backList": function() {
        $scope.configuration.globalView = "";
        angular.element(".campaignListCon").flexReload();
      },
      "toggleKey": function(i, flag) {
        var _this = this;
        return flag ? (i == (_this.globalLists.length - 1) ? "hidden": "inherit") : (i == 0 ? "hidden": "inherit")
      },
      "addRank": function(i) {
        var moveItem = $scope.globalParamObj.globalLists.splice(i, 1);
        $scope.globalParamObj.globalLists.splice(i - 1, 0, moveItem[0]);
      },
      "lessRank": function(i) {
        var moveItem = $scope.globalParamObj.globalLists.splice(i, 1);
        $scope.globalParamObj.globalLists.splice(i + 1, 0, moveItem[0]);
      },
      "changeSubject": function() {
        if (this.curSubject) {
          dataFilterConfigService.getCurFilter(this.curSubject, function(response) {
            $scope.globalParamObj.globalLists = response;
          });
        }
      },
      "submitGlobal": function() {
        var _this = this;
        var submitValues = {
          "subjectId": _this.curSubject ? _this.curSubject.subjectId: "",
          "filterId": []
        };
        angular.forEach($scope.globalParamObj.globalLists, function(val, key) {
          if (val.checked) {
            submitValues.filterId.push(val.id);
          }
        });
        dataFilterConfigService.submitGlobalData(submitValues, function(data) {
          $scope.configuration.globalView = "";
          $(this).yAlert({
            "text": data.message
          });
          removeAlert();
          angular.element(".campaignListCon").flexReload();
        });
      }
    };
    dataFilterConfigService.getSubjects(function(data) {
      $scope.globalParamObj.subjectNameLists = data;
    });
  }
]);