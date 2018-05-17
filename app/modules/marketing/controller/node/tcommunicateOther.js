(function  (window,angular,undefined) {
  var app = angular.module('campaign.controllers');
  app.controller('tcommunicateOtherCtrl', ['$scope', '$http', 'saveService', 'getListService', function($scope, $http, saveService, getListService){
    $scope.tcommunicateOther={};
    $scope.tcommunicateOther={
      "id":graph.nodeId,
      "name":"线下活动"
    }
    $scope.getTcommunicateOther = function(){
      var callback = function (data){
        $scope.tcommunicateOther.name = data.name || "线下活动";
        $scope.nodecomment = data.remark;
      }
      getListService.getTcommunicateOther(callback, $scope.tcommunicateOther);
      getListService.getNodeTipsByType(function(responseTips){ // 获取tips
        $scope.tcommunicateOther.tips=responseTips.tips || "";
      },"tcommunicateOther");
    }
    $scope.getTcommunicateOther();
    $scope.saveTcommunicateOther = function(){
      var subInfo = {
        id:$scope.tcommunicateOther.id,
        name:$scope.tcommunicateOther.name,
        remark:$scope.nodecomment
      }
      saveService.saveTcommunicateOther(function(){
        $(this).yAlert({"text": "保存成功"});
          $("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          removeAlert();
          $scope.editNodeName($scope.tcommunicateOther.id, $scope.tcommunicateOther.name,$scope.nodecomment)
      }, subInfo)
    }
    $scope.checkTcommunicateOther = function(){
      if ($scope.tcommunicateOther.name){
        $scope.saveTcommunicateOther();
      }else{return}
    }
    $scope.openNodePop();

  }])
})(window, angular, undefined);
