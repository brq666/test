/*活动列表自定义搜索start*/
angular.module("campaign.controllers").controller('gridGroupController', ['$scope', '$compile', '$rootScope', function($scope, $compile, $rootScope) {
  $scope.defaultFlag = true;
  $scope.searchObj = {
    "girdElement": angular.element(".campaignListCon")[0],
    "changeActivity": function(atr) {
      this.girdElement.grid.addParams("myActivity", atr);
      this.girdElement.grid.populate();
    },
    "hdCurStatus": function(val) {
      this.girdElement.grid.addParams("campState", val || "");
      this.girdElement.grid.populate();
    },
    "searchHdButton": function(hdVal) {
      this.girdElement.p.newp = 1;
      this.girdElement.p.qtype = "keywords";
      this.girdElement.p.query = hdVal || "";
      this.girdElement.grid.populate();
    },
    //点击树更新
    "updateFromTreeClick": function(id) {
      $rootScope.curCategoryId = id;
      this.girdElement.grid.addParams("categoryId", id);
      this.girdElement.grid.populate();
    }
  };
  $scope.gridObj = {
    "compileTpl": function(b) {
      $compile(angular.element(".campaignListCon"))($scope || b); //编译类为marketingList元素及子元素
    },
    "deleteCampaign": function() {}
  };
  $('.campaignListCon').flexigrid({
    url: GLOBAL_STATIC.nodeRoot + 'node/group/list/',
    method: 'GET',
    dataType: 'json',
    params: [{
      "name": "tenantId",
      "value": CAMPAIGN_STATIC.tenantId
    }, {
      "name": "categoryId",
      "value": ''
    }],
    colModel: [{
        display: '分组ID',
        name: 'id',
        width: 2,
        sortable: true,
        align: 'center',
        dataindex: 'id'
      }, {
        display: '主题名称',
        name: 'subjectName',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'subjectName',
        renderer: function(v) {
          return "<span title='" + v + "'>" + v + "</span>";
        }
      }, {
        display: '分组名称',
        name: 'groupName',
        width: 2.5,
        sortable: true,
        align: 'left',
        dataindex: 'groupName',
        mapping: ['id', 'groupType'],
        convert: function(v, mappVal) {
          return '<span style="color:#155a77;cursor:pointer" ' + 'title=' + v + ' ng-click="groupObj.add(\'' + mappVal[0] + '\',\'' + mappVal[1] + '\')">' + v + '</span>'
        }
      }, {
        display: '所属分类',
        name: 'categoryId',
        width: 2,
        sortable: true,
        align: 'center',
        dataindex: 'categoryId'
      }, {
        display: '创建人',
        name: 'creator',
        width: 2,
        sortable: true,
        align: 'left',
        dataindex: 'creator',
        renderer: function(v) {
          if (v == null || v == "null") {
            return "";
          } else {
            return v;
          }
        }
      }, {
        display: '创建时间',
        name: 'created',
        width: 3.5,
        sortable: true,
        align: 'left',
        dataindex: 'created',
        renderer: function(v) {
          return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
        }
      }, {
        display: '分组类型',
        name: 'groupType',
        width: 2,
        sortable: true,
        align: 'left',
        dataindex: 'groupType'
      }, {
        display: '分组人数',
        name: 'customerCount',
        width: 2,
        sortable: true,
        align: 'left',
        dataindex: 'customerCount'
      }, {
        display: '操作',
        name: 'operation',
        width: 2,
        align: 'center',
        dataindex: 'campId',
        mapping: ['id', 'groupType'],
        convert: function(v, mappVal) {
          return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="groupObj.add(\'' + mappVal[0] + '\',\'' + mappVal[1] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-delete-group></a>'
        }
      }

    ],
    updateDefaultParam: true,
    sortname: "id",
    sortorder: "desc",
    newp: groupListParams.newp,
    rp: groupListParams.rp,
    query: groupListParams.searchText,
    usepager: true,
    useRp: true,
    showTableToggleBtn: true,
    colAutoWidth: true,
    rowDblClick: function() {
      /* var rec = $(this).data('rec'); // 先去双击功能
       var scope=angular.element(document.querySelector('.tabContentArea')).scope();
       scope.marketList.dbClick(rec);*/
    },
    onSuccess: function() {
      var scope = angular.element(document.querySelector('.campaignListCon')).scope();
      scope.gridObj.compileTpl(scope);

      var girdElement = angular.element(".campaignListCon")[0];
      groupListParams.searchText = girdElement.p.query;
      groupListParams.newp = girdElement.p.page;
      groupListParams.rp = girdElement.p.rp;
    },
    onError: function(response) {
      var responseText = response.responseText;
      var data = $.parseJSON(responseText);
      $(this).Alert({
        "title": httpTitle || "提示",
        "str": data.message,
        "mark": true
      });
    }
  });


  var groupScope = angular.element(".maincontainerB").scope();
  groupScope.hdZtreeType = CAMPAIGN_STATIC.tplBasePath + 'view/customer/groupZtree.html';

  /*共用的显示、隐藏元素的方法 start*/
  var toggleMethodObj = {
    toggleViewElement: function(obj, flag) { //flag=true || false
      if (obj) {
        if (flag) {
          obj.show();
        } else {
          obj.hide();
        };
      };
    }
  };
  /*共用的显示、隐藏元素的方法 end*/
  $scope.hdValue = groupListParams.searchText;

}]);
/*活动列表自定义搜索end*/
