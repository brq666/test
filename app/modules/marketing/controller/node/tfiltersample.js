angular.module("campaign.controllers").controller('filterSampleCtrl', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法
    $scope.sampleScopeObj = {
      "name": "",
      "personNumFlag": false,
      "percentNumFlag": false,
      "fillData": function() {
        var _this = this;
        getListService.openSampleNode(function(response) {
          _this.name = response.name || "抽样节点";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
          _this.exportValue = response.type || 1;
          if (_this.exportValue == 1) {
            _this.personNum = response.value || "";
          } else {
            _this.percentNum = response.value || "";
          }
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tfiltersample");
      },
      "getEditorData": function() {
        var _this = this;
        var discountEcData = {
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || "",
          "type": _this.exportValue,
          "value": _this.exportValue == 1 ? _this.personNum: _this.percentNum
        };
        return discountEcData;
      },
      "postDiscountEcData": function(ent) {
        if ($scope.sampleScopeObj.name == "") {
          return false;
        };
        if (this.exportValue == 1 && (!this.personNum || this.personNum == "0")) {
          //debugger
          this.personNumFlag = true;
          this.personErrorMessage = this.personNum != "0" ? "请填写人数": "人数不能为0";
          return false;
        } else if (this.exportValue == 2 && (!this.percentNum || this.percentNum == "0")) {
          this.percentNumFlag = true;
          this.percentErrorMessage = this.percentNum != "0" ? "请填写百分比": "百分比不能为0";
          return false;
        } else if (this.exportValue == 2 && (!(/[1-9]/g.test(this.percentNum)))) {
          this.percentNumFlag = true;
          this.percentErrorMessage = "请填写正确的百分比";
          return false;
        } else {
          this.personNumFlag = false;
          this.percentNumFlag = false;
        };

        var element = angular.element(ent.target);

        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.postSampleNodeData(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
          }, $scope.sampleScopeObj.getEditorData(), element);
        }, element);
      }
    };
    $scope.sampleScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    //清空
    $scope.$watch("sampleScopeObj.exportValue", function(newId, oldId) {
      if (oldId == undefined) {
        return false;
      }
      $scope.sampleScopeObj.personNum = null;
      $scope.sampleScopeObj.percentNum = null;
      $scope.sampleScopeObj.personNumFlag = false;
      $scope.sampleScopeObj.percentNumFlag = false;
    });
  }
]);
