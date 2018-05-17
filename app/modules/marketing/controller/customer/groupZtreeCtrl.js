
//客户分组列表Ztree
angular.module("campaign.controllers").controller('groupZtreeCtrl', ['$scope', '$http', '$rootScope', function($scope, $http,$rootScope){
  $rootScope.curCategoryId=""; // 初始化分组id为空
  $scope.treeSettings = {
    view: {
      selectedMulti: false
    },
    data: {
      simpleData: {
        enable: true,
        idKey: "id",
        pIdKey: "parentId"
      },
      key: {
        name:"categoryName"
      }
    }
  };
  //标志树的根节点外外部
  $scope.hasOutRoot =  true;
  $scope.rootExpanded = true;
  $scope.FIXNODENAME = "未分类";

  $scope.getAllNodes = function() {
    $http.get(GLOBAL_STATIC.nodeRoot + "node/group/category/" + CAMPAIGN_STATIC.tenantId + "/?_="+new Date().getTime()).success(succcb).error(errcb);
    function succcb(res) {
      angular.forEach(res, function(val, key) {
        val.open = false;
      });

      $scope.treeNodes = res;

    }
    function errcb() {
       $scope.treeNodes =  [];
    }
  };
  $scope.getAllNodes();
  //搜索框
  $scope.searchTreeNodes = function(searchValue) {
    $scope.tree.searchNode(searchValue);
  };
  //$scope.treeNodes =[];
  //菜单的增删改
  //增加节点
  $scope.addNode = function addNode(rootFlag) {
    $scope.tree.addNode(addToServer,rootFlag);
    //服务器增加回调
    function addToServer(data,succcb, errcb) {
      data.tenantId = CAMPAIGN_STATIC.tenantId;
      $http.post(GLOBAL_STATIC.nodeRoot + "node/group/category", data).success(succcb).error(errcb);
    }
  };
  //删除节点
  $scope.removeNode = function removeNode() {
    $scope.tree.deleteNode(removeFromServer);
    //服务器删除回调
    function removeFromServer(id,name,succcb, errcb) {
      $(this).Confirm({ "title": "确认删除", "str": "确定要删除分组分类" + name + "吗？", "mark": true }, function () {
        $http({ method: 'DELETE', url: GLOBAL_STATIC.nodeRoot + "node/group/category/" + id + "/" + CAMPAIGN_STATIC.tenantId}).success(succcb).error(errcb);
      })
    }
  };
  //重命名节点
  $scope.renameNode = function renameNode() {
    $scope.tree.renameNode(renameToServer);
    //服务器重新命名回调
    function renameToServer(data, succcb, errcb) {
      data.tenantId = CAMPAIGN_STATIC.tenantId;
      $http.put(GLOBAL_STATIC.nodeRoot + "node/group/category", data).success(succcb).error(errcb);
    }
  };
}]);
