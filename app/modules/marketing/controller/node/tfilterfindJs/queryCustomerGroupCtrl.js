//查询节点客户分组Ctrl
angular.module("campaign.controllers").controller('QueryCustomerGroupCtrl', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    //查询节点客服分组ztree初始化
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
          name: "categoryName"
        }
      }
    };
    //标志树的根节点外外部
    $scope.hasOutRoot = true;
    $scope.FIXNODENAME = "未分类";

    $scope.getAllNodes = function() {
      $http.get(GLOBAL_STATIC.nodeRoot + "node/group/category" + "/?_=" + new Date().getTime()).success(succcb).error(errcb);
      function succcb(res) {
        $scope.treeNodes = res;

      }
      function errcb() {
        $scope.treeNodes = [];
      }
    };
    $scope.getAllNodes();

    //搜索框
    $scope.searchTreeNodes = function(searchValue) {
      $scope.tree.searchNode(searchValue);
    };
    //查询节点客服分组ztree初始化 end
    $scope.queryCustomerGroupObj = {
      "curSelectedGroupName": $scope.responseGroupName || "",
      "curSelectedGroupId": $scope.responseGroupId || "",
      "curSelectedGroupSubjectId": $scope.tfilterFindObj.defaultSubjectId || "",
      "updateGroupById": function(id) { // 点击右侧数更新分组
        var categoryCroupId = id,
            _this = this;;
        getListService.getCurAllCustomerGroupData(function(response) {
          _this.customerGroupLists = response || [];
          _this.initDefaultCustomerGroupLists = _this.customerGroupLists.slice();
        }, categoryCroupId)
      },
      "changeCurGroupTitleView": function(b, id, subId) { // 当前选择的分组
        this.curSelectedGroupName = b;
        this.curSelectedGroupId = id;
        this.curSelectedGroupSubjectId = subId;
      },
      "delTitle": function() { // 删除title
        angular.element(".queryCustomerGroupClass input[name='customerGroupList']").attr("checked", false);
        this.curSelectedGroupName = "";
        this.curSelectedGroupId = "";
        this.curSelectedGroupSubjectId = "";
      },
      "disponseTime": function(timeVal) {
        return setISO(timeVal, "all");
      }
    };
    $scope.queryCustomerGroupObj.updateGroupById(1); // 默认所有分组
    //监听搜索
    $scope.$watch("queryCustomerGroupObj.selectTable", function(newVal) {
      var searchResultAry = [];
      if (newVal == "") {
        $scope.queryCustomerGroupObj.customerGroupLists = $scope.queryCustomerGroupObj.initDefaultCustomerGroupLists;
        return
      }
      angular.forEach($scope.queryCustomerGroupObj.initDefaultCustomerGroupLists, function(val, key) {
        var flagIndex = (val.groupName).indexOf(newVal);
        if (flagIndex != -1) {
          searchResultAry.push(val);
        };
      });
      $scope.queryCustomerGroupObj.customerGroupLists = searchResultAry.slice();
    });
  }
]);
