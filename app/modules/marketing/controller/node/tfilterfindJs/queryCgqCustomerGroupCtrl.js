;angular.module('campaign.controllers').controller('QueryCgqCustomerGroupCtrl', ['$scope', '$http', '$compile', '$rootScope','getListService', function($scope, $http,$compile,$rootScope, getListService) {
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
  $scope.FIXNODENAME = "默认";
  $rootScope.categoryCroupId = ""

  $scope.getAllNodes = function () {
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
  $scope.searchTreeNodes = function (searchValue) {
    $scope.tree.searchNode(searchValue);
  };
  $scope.hdValuePar="";
    //查询节点客服分组ztree初始化 end
    $scope.queryCustomerGroupObj = {
      "curSelectedGroupName": $scope.responseGroupName || "",
      "curSelectedGroupId": $scope.responseGroupId || "",
      "curSelectedGroupSubjectId": $scope.tfilterFindObj.defaultSubjectId || "",
      "changeCurGroupTitleView": function (b, id, subId) { // 当前选择的分组
        this.curSelectedGroupName = b;
        this.curSelectedGroupId = id
        this.curSelectedGroupSubjectId = subId;
      },
      "delTitle": function () { // 删除title
        angular.element(".queryCustomerGroupClass input[name='customerGroupList']").attr("checked", false);
        this.curSelectedGroupName = "";
        this.curSelectedGroupId = "";
        this.curSelectedGroupSubjectId = "";
      },
      "setPage": function(page) {
        if(!this.searching) {
          return false;
        }
        var currentPage = +$scope.queryCustomerGroupObj.pager.currentPage;
        if (angular.isString(page)) {
          switch (page) {
            case 'first':
              currentPage = 1;
              break;
            case 'last':
              currentPage = +$scope.queryCustomerGroupObj.pager.totalPages;
              break;
            case 'prev':
              if(currentPage>=1){
                currentPage--;
              }else{
                currentPage=1;
              }
              break;
            case 'next':
              currentPage++;
              break;
          }
        } else if (angular.isNumber(page)) {
          currentPage = page;
        }
        $scope.queryCustomerGroupObj.pager.currentPage1= $scope.queryCustomerGroupObj.pager.currentPage = currentPage;
        $scope.queryCustomerGroupObj.updateGroupById($rootScope.categoryCroupId);
      },
      "noPrevious": function() {
        return this.pager.currentPage == 1;
      },
      "sizeList": [10, 15, 20, 30, 50],
      "pager": {
        currentPage: 1,
        currentPage1: 1,
        pagesize: 20,
        totalPages: '',
        categoryId: $rootScope.categoryCroupId||"",
        query: encodeURIComponent($scope.hdValuePar) || "",
      },
      "noNext": function() {
        return this.pager.currentPage === this.pager.totalPages;
      },
      "format":function (v) {
        if (typeof(v)!="object") {
          return  (v + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        } else {
          return  "等待更新中…"
        }
      },
      "clickGroupById":function () {
        this.pager.currentPage1=1
        this.updateGroupById($rootScope.categoryCroupId)
      },
      "updateGroupById": function(id,updatePage) {
        var that = this;
        $rootScope.categoryCroupId =id;
        if(updatePage){
          that.pager.currentPage1=1;
        }
        that.searching = false;
        that.isExternal = true;
        var params = {
          page:that.pager.currentPage1,
          pagesize: that.pager.pagesize,
          sortorder:'desc',
          sortname:'id',
          categoryId:$rootScope.categoryCroupId,
          query: encodeURIComponent($scope.hdValuePar) || "",
        };
        var successCallback = function(response) {
          if(response.data) {
            //console.log($scope.responseGroupId)
            //console.log($scope.queryCustomerGroupObj.curSelectedGroupId)
            angular.forEach(response.data,function(data,key) {
              data.customerCount = that.format(data.customerCount)
            })
            that.customerGroupLists = response.data;
            that.initDefaultCustomerGroupLists = that.customerGroupLists.slice();
            if(typeof ($scope.queryCustomerGroupObj.curSelectedGroupId)=='number'){
              angular.forEach(that.customerGroupLists,function(val,key){
                if(val.id==$scope.queryCustomerGroupObj.curSelectedGroupId){
                  that.defaultRadioSelect=val.id;
                }
              });
            }else{
              that.defaultRadioSelect=''
            }
            that.pager.totalPages = Math.ceil(response.total / that.pager.pagesize)==0 ? 1 : Math.ceil(response.total / that.pager.pagesize);
          };
          that.isExternal = false;
          that.loading = false;
          that.searching = true;
        }
        that.loading = true;
        getListService.getCardGroupData(successCallback, params);
      },
      "enterPage":function(ev) {
        if (ev.keyCode == 13) {
          if (!$scope.queryCustomerGroupObj.pager.currentPage || $scope.queryCustomerGroupObj.isExternal ) {
            $scope.queryCustomerGroupObj.pager.currentPage1=$scope.queryCustomerGroupObj.pager.currentPage=1;
            $scope.queryCustomerGroupObj.updateGroupById($rootScope.categoryCroupId);
            return;
          }
          $scope.queryCustomerGroupObj.pager.currentPage = +$scope.queryCustomerGroupObj.pager.currentPage;
          if (!isNaN($scope.queryCustomerGroupObj.pager.currentPage) && angular.isNumber($scope.queryCustomerGroupObj.pager.currentPage)) {
            if ($scope.queryCustomerGroupObj.pager.currentPage > $scope.queryCustomerGroupObj.pager.totalPages) {
              $scope.queryCustomerGroupObj.pager.currentPage1=$scope.queryCustomerGroupObj.pager.currentPage = $scope.queryCustomerGroupObj.pager.totalPages;
              $scope.queryCustomerGroupObj.updateGroupById($rootScope.categoryCroupId);
              return;
            } else if ($scope.queryCustomerGroupObj.pager.currentPage < 1) {
              $scope.queryCustomerGroupObj.pager.currentPage = 1;
              $scope.queryCustomerGroupObj.updateGroupById($rootScope.categoryCroupId);
              return;
            }
            $scope.queryCustomerGroupObj.pager.currentPage1=$scope.queryCustomerGroupObj.pager.currentPage;
            $scope.queryCustomerGroupObj.updateGroupById($rootScope.categoryCroupId);
          } else {
            $scope.queryCustomerGroupObj.pager.currentPage1=$scope.queryCustomerGroupObj.pager.currentPage = 1;
            $scope.queryCustomerGroupObj.updateGroupById($rootScope.categoryCroupId);
          }
        }
      },
    };
  $scope.queryCustomerGroupObj.updateGroupById("") // 默认所有分组

    //监听搜索
  $scope.$watch("hdValuePar", function (newValue) {
    $scope.hdValuePar = newValue || "";
  })
  $scope.$watch('queryCustomerGroupObj.pager.pagesize', function (newValue, oldValue) {
    if (!newValue || newValue == oldValue) {
      return;
    }
    // pageSize改变默认回到第一页
    $scope.queryCustomerGroupObj.pager.currentPage = 1;
    $scope.queryCustomerGroupObj.pager.currentPage1 =$scope.queryCustomerGroupObj.pager.currentPage;
    $scope.queryCustomerGroupObj.updateGroupById($rootScope.categoryCroupId);
  });
  $scope.$watch("queryCustomerGroupObj.selectTable", function (newVal) {
    var searchResultAry = [];
    if (newVal == "") {
      $scope.queryCustomerGroupObj.customerGroupLists = $scope.queryCustomerGroupObj.initDefaultCustomerGroupLists;
      return
    }
    angular.forEach($scope.queryCustomerGroupObj.initDefaultCustomerGroupLists, function (val, key) {
      var flagIndex = (val.groupName).indexOf(newVal);
      if (flagIndex != -1) {
        searchResultAry.push(val);
      }
      ;
    });
    $scope.queryCustomerGroupObj.customerGroupLists = searchResultAry.slice();
  });


}]);
