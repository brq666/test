angular.module("campaign.controllers").controller('andCtrl', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法
    $scope.andScopeObj = {
      "name": "",
      "fillData": function() {
        var _this = this;
        getListService.openAndNode(function(response) {
          _this.name = response.name || "交集节点";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tfilterand");
      },
      "getEditorData": function() {
        var _this = this;
        var discountAndData = {
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || ""
        };
        return discountAndData;
      },
      "postDiscountEcData": function(ent) {
        if ($scope.andScopeObj.name == "") {
          return false;
        };
        var element = angular.element(ent.target);
        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.postAndNodeData(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
          }, $scope.andScopeObj.getEditorData(), element);
        }, element);
      }
    };
    $scope.andScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }
]);
