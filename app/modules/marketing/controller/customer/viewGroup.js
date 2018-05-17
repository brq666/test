angular.module("campaign.controllers").controller('ViewGroupCtrl', ['$scope', '$http', '$q', 'getListService',
  function($scope, $http, $q, getListService) {
    var groupDelay = $q.defer();

    /*发送给查询节点的相关Id
     * sendQuerySubjectId-主题Id，sendQueryNodeId-默认节点ID
     */
    window.graph = null; //清除graph变量
    $scope.sendQuerySubjectId = "";
    $scope.sendQueryNodeId = "";
    /*end*/

    $scope.viewGroupObj = {
      "curDefaultGroupId": "",
      "categoriesList": [],
      "getModelNodeData": function() {
        var _this = this;
        getListService.editorCustomerGroup(function(response) {
          _this.groupType = response.groupType || "";
          _this.curDefaultGroupId = response.id || "";
          $scope.sendQueryNodeId = response.result || "";
          _this.categoriesList = response.list;
          _this.categoryName = response.categoryId || "";
          groupDelay.resolve($scope.sendQueryNodeId);
        }, $scope.curCustomerGroupId);

        groupDelay.promise.then(function(nodeId) {
          getListService.opentfilterNode(function(response) { // 请求打开节点，获取平台,获取subjectsId，然后在查询节点嵌入获取
            _this.subjectLabel = response.subjectLabel || "";
            _this.subjectList = response.subjects || [];
            $scope.sendQuerySubjectId = _this.defaultSubjectId = response.defaultSubject || response.subjects[0].id;
            _this.iframeQuerySrc = CAMPAIGN_STATIC.tplBasePath + 'view/node/tfilterfindView/tfilterfindRadioContent.html?_=' + new Date().getTime(); // 嵌入查询节点
          }, nodeId);
        })

      }
    }
    $scope.viewGroupObj.getModelNodeData();
  }
]);
