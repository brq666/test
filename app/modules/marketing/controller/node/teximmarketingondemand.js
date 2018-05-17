angular.module("campaign.controllers").controller('eximmarketingondemandCtrl', ['$scope', '$location', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法
    $scope.immediatelyScopeObj = {
      "name": "立即营销",
      "fillData": function() {
        var _this = this;
        getListService.openImmediately(function(response) {
          _this.name = response.name || "立即营销";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
          _this.shopName = response.shopName || "";
          _this.generatorTime = response.generatorTime || "";
          _this.dataSynchronizedStatus = response.dataSynchronizedStatus || "";
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "teximmarketingondemand");
      },
      "getEditorData": function() {
        var _this = this;
        var immediatelyData = {
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || ""
        };
        return immediatelyData;
      },
      "postImmediatelyData": function(ent) {
        if ($scope.immediatelyScopeObj.name == "") {
          return false;
        };
        var element = angular.element(ent.target);
        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.postImmediatelyData(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
          }, $scope.immediatelyScopeObj.getEditorData(), element);
        }, element);
      }
    }
    $scope.immediatelyScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }
]);
