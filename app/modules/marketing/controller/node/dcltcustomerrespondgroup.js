angular.module("campaign.controllers").controller('dclcustomerrespondgroupCtrl', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法

    $scope.responseScopeObj = {
      "nodeId": graph.nodeId,
      "jobId": graph.campJobid,
      "subjobId": null,
      "viewResponseData": false,
      "showResponseData": false,
      "name": "",
      "isWhiteZone": false,
      "fillData": function() {
        var _this = this;
        getListService.dclOpenResponseGroupNode(function(response) {
          _this.name = response.name || "响应组";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
          _this.isWhiteZone = response.control === 1 || response.control === null;
        });
        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tcustomerdrespondgroup");
      },
      "showResponseDataPop": function() { // 查看数据
        $(".responseDataListView").addInteractivePop({
          magTitle: "客户数据查看",
          width: 900,
          mark: false,
          position: "fixed",
          childElePop: true
        });
        getListService.dclGetResponseDataResult($scope.responseScopeObj.subjobId, function(response) {
          $scope.respoonseDataListsTitle = response.result[0] ? response.result[0] : [];
          $scope.respoonseDataListsVal = (response.result && response.result.length > 1) ? response.result.slice(1) : [[], []];
          $scope.autoWidth = ($scope.respoonseDataListsTitle != 0 ? 100 / $scope.respoonseDataListsTitle.length + "%": "100%");
        });
      },
      "getEditorData": function() {
        var _this = this;
        var responseGroupData = {
          "control": _this.isWhiteZone ? 1 : 0,
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || ""
        };
        return responseGroupData;
      },
      "postDiscountEcData": function(ent) {
        if ($scope.responseScopeObj.name == "") {
          return false;
        };

        var element = angular.element(ent.target);
        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.dclPostResponseGroupNodeData(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
          }, $scope.responseScopeObj.getEditorData(), element);
        }, element);
      }
    };
    getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
      if (response.subjobStatus > 20) {
        $scope.responseScopeObj.viewResponseData = true;
        $scope.responseScopeObj.subjobId = response.subjobId;
      }
      if (response.isShow === "true") {
        $scope.responseScopeObj.showResponseData = true;
      }
    }, graph.nodeId, graph.campJobid);
    $scope.responseScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    $scope.disponseResponsetResultData = function(v) {
      return (v == "null" ? "": v)
    }
  }
]);
