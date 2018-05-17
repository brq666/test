(function(window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  app.controller('tchannelresponseECCtrl', ["$scope", "$http", "$compile", "saveService", "getListService", "$filter",
    function($scope, $http, $compile, saveService, getListService, $filter) {
      $scope.responseEC = {};
      $scope.responseEC.id = graph.nodeId;
      $scope.responseEC.name = "优惠券响应";
      $scope.responseEC.outputType = "0";

      $scope.getResponseEC = function() {
        var callback = function(data) {
          $scope.responseEC = data;
          $scope.responseEC.name = data.name || "优惠券响应";
          $scope.responseEC.outputType = data.outputType || "0";
          $scope.nodecomment = data.remark;
        }
        getListService.getResponseEC(callback, $scope.getResponseEC);

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          $scope.responseEC.tips = responseTips.tips || "";
        }, "tchannelresponseEC");
      }
      $scope.getResponseEC();

      $scope.saveResponseEC = function() {
        var subInfo = {
          name: $scope.responseEC.name,
          id: $scope.responseEC.id,
          outputType: $scope.responseEC.outputType,
          remark: $scope.nodecomment
        }
        if (!subInfo.name) {
          return
        }
        saveService.saveResponseEC(function() {
          $("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName($scope.responseEC.id, $scope.responseEC.name, $scope.nodecomment);
          //刷新画布
          $scope.refreshGraph();
          // $scope.editNodeName($scope.responseEC.id, $scope.responseEC.name)
        }, subInfo);

      }
      $scope.openNodePop();
    }
  ]);
})(window, angular, undefined);
