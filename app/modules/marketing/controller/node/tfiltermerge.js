angular.module("campaign.controllers").controller('mergeCtrl', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法
    $scope.mergeScopeObj = {
      "name": "",
      "fillData": function() {
        $http.get(GLOBAL_STATIC.nodeRoot + "node/merge/" + graph.nodeId + "/?_=" + new Date().getTime()).success(function(response) {
          $scope.mergeScopeObj.name = response.name ? response.name: "合并节点";
          $scope.mergeScopeObj.id = response.id ? response.id: "";
          $scope.nodecomment = response.remark ? response.remark: "";
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          $scope.mergeScopeObj.tips = responseTips.tips || "";
        }, "tfiltermerge");
      },
      "getEditorData": function() {
        var mergeData = {
          "id": graph.nodeId,
          "name": $scope.mergeScopeObj.name,
          "remark": $scope.nodecomment
        };
        return mergeData;
      },
      "postMergeData": function(ent) {
        if ($scope.mergeScopeObj.name == "") {
          return false;
        }
        var element = angular.element(ent.target);

        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          $http.put(GLOBAL_STATIC.nodeRoot + "node/merge/", $scope.mergeScopeObj.getEditorData()).success(function(response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          });
        }, element);
      }
    };
    $scope.mergeScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }
]);
