angular.module("campaign.controllers").controller('labelCtrl', ['$scope', 'getListService',
  function($scope, getListService) {
    var labelUseedTo = $scope.$parent.$parent.labelTemplateMark,
        useedDefaultEditorDate; // 指定模板功能
    $scope.openPlugPop();
    $scope.labelObj = {
      "setLabelDefaultStatus": function(selectedDate) {
        angular.forEach(selectedDate, function(val, key) {
          var curLabelId = val.id;
          angular.forEach($scope.labelObj.valuesLists, function(sv, sk) {
            if (sv.id == curLabelId) {
              sv.classVal = "cur";
              return "stop each"
            }
          })
        })
      },
      "getCurrentLabelData": function(e) {
        var dataArrary = [],
            curElement = $(e.target).closest(".labelPlug").find(".cur a");
        curElement.each(function() {
          if (labelUseedTo == "baseQueryLabel") {
            dataArrary.push({
              "id": angular.element(this).attr("id"),
              "name": angular.element(this).text()
            })
          } else {
            dataArrary.push({
              "id": Number(angular.element(this).attr("id")),
              "value": angular.element(this).text()
            })
          }

        });
        return dataArrary;
      }
    };

    if (labelUseedTo == "baseQueryLabel") { // 查询节点基础属性 标签类型
      useedDefaultEditorDate = $scope.$parent.$parent.queryLabelLists ? $scope.$parent.$parent.queryLabelLists.slice() : [];
      angular.forEach($scope.$parent.$parent.totleQueryLabelDatas, function(val, index) {
        val.classVal = '';
      });
      $scope.labelObj.valuesLists = $scope.$parent.$parent.totleQueryLabelDatas ? $scope.$parent.$parent.totleQueryLabelDatas.slice() : [];
      $scope.labelObj.setLabelDefaultStatus(useedDefaultEditorDate);

      $scope.labelObj.sureAddLabel = function(e) {
        $scope.$parent.$parent.queryLabelLists = $scope.labelObj.getCurrentLabelData(e);
      };
    } else { // 查询节点订单查询 标签类型
      useedDefaultEditorDate = $scope.$parent.$parent.customerLabelLists ? $scope.$parent.$parent.customerLabelLists.slice() : [];
      getListService.getShops(function(response) {
        $scope.labelObj.valuesLists = response;
        $scope.labelObj.setLabelDefaultStatus(useedDefaultEditorDate);
      });
      $scope.labelObj.sureAddLabel = function(e) {
        var labelSelectIds = [],
            labelSelectNames = [];
        var selectedData = $scope.labelObj.getCurrentLabelData(e);
        angular.forEach(selectedData, function(val, key) {
          labelSelectIds.push(val.id);
          labelSelectNames.push(val.value);
        });
        $scope.$parent.$parent.labelLists = labelSelectNames.slice();
        $scope.$parent.$parent.viewlabelIds = labelSelectIds.join(",");
      };
    }
  }
]);
