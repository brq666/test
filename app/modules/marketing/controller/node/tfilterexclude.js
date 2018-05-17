angular.module("campaign.controllers").controller('excludeCtrl', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法
    $scope.formIdToIdFlag = false;
    $scope.excludeScopeObj = {
      "name": "",
      "errorValues": "不能选择相同的节点",
      "fillData": function() {
        var _this = this;
        getListService.openExcludeNode(function(response) {
          _this.name = response.name || "排除节点";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
          _this.connectNodes = response.preNodes || [];
          var valiedFromId = false;
          var valiedToId = false;
          angular.forEach(response.preNodes, function(val, key) {
            if(val.id ==  response.fromId) {
              valiedFromId = true;
            }
            if(val.id ==  response.toId) {
              valiedToId = true;
            }
          })

          _this.beforeNodeId =valiedFromId ? response.fromId : null;
          _this.afterNodeId = valiedToId ? response.toId : null;
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tfilterexclude");
      },
      "getEditorData": function() {
        var _this = this;
        var discountEcData = {
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || "",
          "fromId": _this.beforeNodeId,
          "toId": _this.afterNodeId
        };
        return discountEcData;
      },
      "postDiscountEcData": function(ent) {
        var putExcludeData = $scope.excludeScopeObj.getEditorData(),
            _this = this;
        if ($scope.excludeScopeObj.name == "") {
          return false;
        };
        if ((putExcludeData.fromId != 0 && putExcludeData.toId != 0) && (!putExcludeData.fromId || !putExcludeData.toId)) {
          $scope.formIdToIdFlag = true;
          _this.errorValues = "请选择内容";
          return false;
        } else {
          $scope.formIdToIdFlag = false;
        };
        if (putExcludeData.fromId == putExcludeData.toId) {
          $scope.formIdToIdFlag = true;
          _this.errorValues = "不能选择相同的节点";
          return false;
        } else {
          $scope.formIdToIdFlag = false;
        }
        var element = angular.element(ent.target);
        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.postExcludeNodeData(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
          }, $scope.excludeScopeObj.getEditorData(), element);
        }, element);
      }
    };
    $scope.excludeScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    //联动
    $scope.$watch("excludeScopeObj.beforeNodeId", function(newId, oldId) {
      if (oldId == undefined) {
        return false;
      }
      $scope.excludeScopeObj.afterNodeId = oldId;
    });
    $scope.$watch("excludeScopeObj.afterNodeId", function(newId, oldId) {
      if (oldId == undefined) {
        return false;
      }
      $scope.excludeScopeObj.beforeNodeId = oldId;
    });
  }
]);
