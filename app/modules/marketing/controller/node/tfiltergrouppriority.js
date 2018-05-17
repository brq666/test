angular.module("campaign.controllers").controller('priorityCtrl', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法
    $scope.priorityScopeObj = {
      "hasOutName": true,
      "name": "",
      "fillData": function() {
        var _this = this;
        getListService.openPriorityNode(function(response) {
          _this.name = response.name || "排重节点";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
          _this.priorityNodes = response.inputAndOutputAttrs || [];
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tfiltergrouppriority");
      },
      "addPriority": function(i) {
        var moveItem = this.priorityNodes.splice(i, 1);
        this.priorityNodes.splice(i - 1, 0, moveItem[0]);
      },
      "lessPriority": function(i) {
        var moveItem = this.priorityNodes.splice(i, 1);
        this.priorityNodes.splice(i + 1, 0, moveItem[0]);
      },
      "getEditorData": function() {
        var _this = this,
            outputNodeNameAry = []; //验证输出名是否重名的数组
        $scope.priorityScopeObj.hasOutName = true;
        var discountEcData = {
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || "",
          "fromId": _this.beforeNodeId,
          "toId": _this.afterNodeId,
          "inputAndOutputAttrs": []
        };
        angular.forEach($scope.priorityScopeObj.priorityNodes, function(val, key) {
          discountEcData.inputAndOutputAttrs.push({
            "inputNodeId": val.inputNodeId,
            "priority": (key + 1),
            "outputNodeName": val.outputNodeName,
            "inputNodeType": val.inputNodeType,
            "inputNodeName": val.inputNodeName,
            "outputNodeId": val.outputNodeId
          });
          outputNodeNameAry.push(val.outputNodeName);
          if (!val.outputNodeName) {
            $scope.priorityScopeObj.hasOutName = false;
          }
        });
        //验证输出是否重名
        function clearArray(ary) { //判断数组重复
          var aryFlag = true;
          var newAry = ary.sort();
          for (var i = 0; i < ary.length; i++) {
            if (newAry[i] == newAry[i + 1]) {
              aryFlag = false;
            }
          };
          return aryFlag;
        };
        $scope.priorityScopeObj.outNameRedoFlag = clearArray(outputNodeNameAry);

        return discountEcData;
      },
      "postDiscountEcData": function(ent) {
        var postServiceData = $scope.priorityScopeObj.getEditorData();
        if ($scope.priorityScopeObj.name == "") {
          return false;
        };

        if (!$scope.priorityScopeObj.hasOutName) {
          $(this).Alert({
            "title": "提示",
            "str": "请填写输出名称",
            "mark": true,
            "eleZindex": 1010,
            "markZindex": 1005
          });
          return false;
        };

        if (!$scope.priorityScopeObj.outNameRedoFlag) {
          $(this).Alert({
            "title": "提示",
            "str": "保存失败，输出显示名称不能重复",
            "mark": true,
            "eleZindex": 1010,
            "markZindex": 1005
          });
          return false;
        };

        var element = angular.element(ent.target);
        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          getListService.postPriorityNodeData(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
            $scope.refreshGraph();
          }, postServiceData, element);
        }, element);
      }
    };
    $scope.priorityScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }
]);
