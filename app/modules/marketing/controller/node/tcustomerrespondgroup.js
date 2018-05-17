angular.module("campaign.controllers").controller('customerrespondgroupCtrl', ['$scope', '$http', '$interval', 'getListService',
  function($scope, $http, $interval, getListService) {
    $scope.openNodePop(); //调用弹框方法
    getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
      if (response.subjobStatus > 20) {
        $scope.responseScopeObj.viewResponseData = true;
        $scope.responseScopeObj.subjobId = response.subjobId;
      }
      if (response.isShow === "true") {
        $scope.responseScopeObj.showResponseData = true;
      }
    }, graph.nodeId, graph.campJobid);

    $scope.responseScopeObj = {
      "nodeId": graph.nodeId,
      "jobId": graph.campJobid,
      "subjobId": null,
      "viewResponseData": false,
      "name": "响应组",
      "personNumFlag": false,
      "percentNumFlag": false,
      "fillData": function() {
        var _this = this;
        getListService.openResponseGroupNode(function(response) {
          _this.name = response.name || "响应组";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
          _this.exportValue = response.controlType ?  (response.controlType + '') : '1';
          if (_this.exportValue == 1) {
            _this.percentNum = disposeCommMethod.handleBooleNumber(response.percent, 100) || "";
          } else {
            _this.personNum = response.peopleCount || "";
          }
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tcustomerrespondgroup");
      },
      "showResponseDataPop": function() { // 查看数据
        $scope.existFile = "false";
        $scope.checkFile$ || ($scope.checkFile$ = $interval(function() {
          $scope.existFile === "true" || getListService.checkFileResponseResult($scope.responseScopeObj.subjobId, function(data) {
            $scope.existFile = data.existFile;
          });
          if ($scope.existFile === "true") {
            $interval.cancel($scope.checkFile$);
            $scope.checkFile$ = undefined;
          }
        }, 3000));
        $(".responseDataListView").addInteractivePop({
          magTitle: "客户数据查看",
          width: 900,
          mark: false,
          position: "fixed",
          childElePop: true,
          closeFn: function() {
            $interval.cancel($scope.checkFile$);
            $scope.checkFile$ = undefined;
          }
        });
        getListService.getResponseDataResult($scope.responseScopeObj.subjobId, function(response) {
          $scope.responseScopeObj.responseReportDownLoadFlag = response.authority;
          $scope.respoonseDataListsTitle = response.result[0] ? response.result[0] : [];
          $scope.respoonseDataListsVal = (response.result && response.result.length > 1) ? response.result.slice(1) : [[], []];
          $scope.autoWidth = ($scope.respoonseDataListsTitle != 0 ? 100 / $scope.respoonseDataListsTitle.length + "%": "100%");
        });
      },
      "getEditorData": function() {
        var _this = this;
        var responseGroupData = {
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || "",
          "controlType": (_this.exportValue * 1),
          "percent": ((_this.percentNum * 1) / 100) || null,
          "peopleCount": (_this.personNum * 1) || 0
        };
        return responseGroupData;
      },
      "postDiscountEcData": function(ent) {
        if ($scope.responseScopeObj.name == "") {
          return false;
        };
        if (this.exportValue == 1 && (this.percentNum == "0")) {
          this.percentNumFlag = true;
          this.percentErrorMessage = "百分比不能为0";
          return false;
        } else if (this.exportValue == 1 && (this.percentNum && !(/[1-9]/g.test(this.percentNum)))) {
          this.percentNumFlag = true;
          this.percentErrorMessage = "请填写正确的百分比";
          return false;
        } else {
          this.personNumFlag = false;
          this.percentNumFlag = false;
        };

        var element = angular.element(ent.target);
        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.postResponseGroupNodeData(function(response) {
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
    $scope.responseScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    $scope.disponseResponsetResultData = function(v) {
      return (v == "null" ? "": v)
    }
    //清空
    $scope.$watch("responseScopeObj.exportValue", function(newId, oldId) {
      if (oldId == undefined) {
        return false;
      }
      $scope.responseScopeObj.personNum = null;
      $scope.responseScopeObj.percentNum = null;
      $scope.responseScopeObj.personNumFlag = false;
      $scope.responseScopeObj.percentNumFlag = false;
    });
  }
]);
