//节点类型管理
(function(window, angular, undefined) {

  var app = angular.module('campaign.controllers');
  app.controller('acTypeManeCtrl', ["$scope", "$http",
    function($scope, $http) {
      //右上角select选择框
      //0启用，1经用，2全部
      $scope.selectedType = "0";
      //$scope.items = ["a", "b", "c"];
      //启用禁用添加删除服务成功
      function serverSucc(res) {
        if (res.hasOwnProperty("message") && res.hasOwnProperty("description")) {
          $scope.isExisted = true;
          $(this).Alert({
            "title": res.message || "提示",
            "str": res.description || "错误",
            "mark": true
          });
        } else {
          //清空input
          $scope.itemName = "";
          $scope.getAllItem();
          $(this).yAlert({
            "text": "添加成功"
          });
          removeAlert();
        }
      }

      //启用禁用添加删除服务失败
      function serverErr(res) {
        $(this).Alert({
          "title": res.description || "提示",
          "str": res.message || "错误",
          "mark": true
        });
      }
      //增加item
      $scope.addItem = function() {
        //如果值为空
        if (!$scope.itemName) {
          $scope.isInputEmpty = true;
          return;
        }
        $http.post(GLOBAL_STATIC.campaignRoot + "campaign/category", {
          name: $scope.itemName,
          tenantId: CAMPAIGN_STATIC.tenantId
        }).success(serverSucc).error(serverErr);
      };
      //删除item
      $scope.deleteItem = function(item) {
        $(this).Confirm({
          "title": "确认",
          "str": "确定要删除活动类型" + item.categoryValue + "吗？",
          "mark": true
        }, function() {
          $http({
            method: 'DELETE',
            url: GLOBAL_STATIC.campaignRoot + "campaign/category/" + item.categoryId
          }).success(serverDeleteSucc).error(serverErr);
        });

        function serverDeleteSucc() {
          $scope.itemName = "";
          $(this).yAlert({
            "text": "删除成功"
          });
          removeAlert();
          $scope.getAllItem();
        }
      };
      $scope.changeType = function(item) {
        $http.put(GLOBAL_STATIC.campaignRoot + "campaign/category/" + item.categoryId).success(serverSuccEnableOrDisable).error(serverErr);

        function serverSuccEnableOrDisable(res) {
          $(this).yAlert({
            "text": "活动类型\"" + item.categoryValue + "\"" + (item.disabled ? "启用": "禁用") + "成功"
          });
          removeAlert();

          $scope.itemName = "";
          $scope.getAllItem();
        }
      };
      //请求所有数据
      $scope.getAllItem = function() {
        $http.get(GLOBAL_STATIC.campaignRoot + "campaign/category/" + CAMPAIGN_STATIC.tenantId + "/?_=" + new Date().getTime()).success(getDataSucc).error(getDataErr);
        //成功获取节点信息
        function getDataSucc(data) {
          $scope.items = data || [];
        }
        //获取活动失败
        function getDataErr(res) {
          $(this).Alert({
            "title": res.message || "提示",
            "str": res.description || "错误",
            "mark": true
          });
        };
      };
      //返回按钮
      $scope.viewBack = function() {
        $scope.$parent.$parent.marketLayer.viewBack();
      }
      $scope.getAllItem();
    }
  ]);
})(window, angular, undefined);
