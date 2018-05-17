//等待节点controller
(function(window, angular, undefined) {

  var app = angular.module('campaign.controllers');
  app.controller('waitNodeCtrl', ["$scope", "waitNodeDate", "getListService",
    function($scope, waitNodeDate, getListService) {
      /*//各种时间类型的映射
       var typeMap = {"0":{waitType:0,waitDateTime:$scope.waitDateTime},
       "1":{waitType:1,waitDay:$scope.waitDay,waitTime:$scope.waitTime},
       "2":{waitType:2,waitHour:$scope.waitHour,waitMinute:$scope.waitMinute}
       };
       */
      //$scope.id = "123";
      $scope.waitnode = {};
      $scope.waitnode.name = "等待节点";
      $scope.waitnode.code = "123456";
      $scope.waitnode = {
        "savewaitnode": savewaitnode,
        "id": graph.nodeId,
        "name": "等待节点"
      }
      //成功获取节点信息
      function getDateSucc(data) {
        var date = new Date();
        var defaultTime = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        $scope.waitnode.name = data.name || "等待节点";
        $scope.waitnode.id = data.id;
        $scope.waitnode.waitType = data.waitType || 0;
        $scope.waitnode.waitDateTime = data.waitDateTime || defaultTime;
        $scope.waitnode.waitDay = data.waitDay || "0";
        $scope.waitnode.waitTime = data.waitTime || "23:59";
        $scope.waitnode.waitHour = data.waitHour || "0";
        $scope.waitnode.waitMinute = data.waitMinute || "0";
        $scope.nodecomment = data.remark;
      }
      //获取失败
      function getDateError() {
        $(this).Alert({
          "title": "提示",
          "str": data.message,
          "mark": true
        });
      }
      //请求数据
      waitNodeDate.get($scope.waitnode.id, getDateSucc, getDateError);

      getListService.getNodeTipsByType(function(responseTips) { // 获取tips
        $scope.waitnode.tips = responseTips.tips || "";
      }, "tflowwait");
      //点击确认按钮调用的提交事件
      $scope._submitNodeInfo = function() {
        var date = typeMap[$scope.waitnode.waitType];
        var subInfo = {
          id: $scope.waitnode.id,
          name: $scope.waitnode.name
        };
        waitNodeDate.post()
      };
      function saveDateSucc(data) {
        $("#nodeContent").hide();
        $(".yunat_maskLayer").hide();
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        $scope.editNodeName($scope.waitnode.id, $scope.waitnode.name, $scope.nodecomment);
      }
      function saveDateError(data) {
        $(this).Alert({
          "title": "提示",
          "str": data.message,
          "mark": true
        });
      }
      //保存节点
      function savewaitnode() {
        //各种时间类型的映射
        var typeMap = {
          "0": {
            waitType: 0,
            waitDateTime: $scope.waitnode.waitDateTime
          },
          "1": {
            waitType: 1,
            waitDay: $scope.waitnode.waitDay,
            waitTime: $scope.waitnode.waitTime
          },
          "2": {
            waitType: 2,
            waitHour: $scope.waitnode.waitHour,
            waitMinute: $scope.waitnode.waitMinute
          }
        };

        var date = typeMap[$scope.waitnode.waitType];
        var subInfo = {
          id: $scope.waitnode.id,
          name: $scope.waitnode.name,
          remark: $scope.nodecomment || ""
        };
        var saveObject = angular.extend({},
            date, subInfo);
        if (!saveObject.name) {
          return;
        }
        waitNodeDate.post(saveObject, saveDateSucc, saveDateError);
      };
      //$scope.$broadcast("showWaitNode",id)
      // $scope.$on("showWaitNodeEvent",function(eee){
      // 	$scope.$broadcast("showNode");
      // 	$scope.id = eee;
      // });
      $scope.openNodePop(); //显示节点弹出框
    }
  ]);

})(window, angular, undefined);
