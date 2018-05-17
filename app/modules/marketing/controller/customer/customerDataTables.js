angular.module("campaign.controllers").controller('customerDataTablesCtrl', ['$scope', '$compile',
  function($scope, $compile) {
    $('#customerDataGrid').flexigrid({ //属性列表grid
      url: GLOBAL_STATIC.nodeRoot + 'node/group/result/?_=' + new Date().getTime(),
      method: 'GET',
      dataType: 'json',
      colModel: [{
        display: '平台',
        name: 'platform',
        width: 2,
        sortable: false,
        dataindex: 'platform'
      },
      {
        display: '客户ID',
        name: 'customerNo',
        width: 2,
        sortable: false,
        dataindex: 'customerNo'
      },
      {
        display: '姓名',
        name: 'customerName',
        width: 2,
        sortable: false,
        dataindex: 'customerName'
      },
      {
        display: '性别',
        name: 'gender',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'gender'
      },
      {
        display: '生日',
        name: 'birthDay',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'birthDay',
        renderer: function(v) {
          return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
        }
      },
      {
        display: '手机号',
        name: 'mobile',
        width: 2.5,
        sortable: false,
        align: 'center',
        dataindex: 'mobile'
      },
      {
        display: 'email',
        name: 'email',
        width: 3,
        sortable: false,
        align: 'center',
        dataindex: 'email'
      },
      {
        display: '省份',
        name: 'province',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'province'
      },
      {
        display: '城市',
        name: 'city',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'city'
      },
      {
        display: '区域',
        name: 'area',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'area'
      },
      {
        display: '地址',
        name: 'address',
        width: 4,
        sortable: false,
        align: 'center',
        dataindex: 'address'
      },
      {
        display: '邮编',
        name: 'amountLeastRecent',
        width: 3,
        sortable: false,
        align: 'center',
        dataindex: 'amountLeastRecent'
      },
      {
        display: '操作',
        name: 'operation',
        width: 2.5,
        align: 'center',
        dataindex: 'campId',
        mapping: ['propertyId'],
        convert: function(v, mappVal) {
          return '<a href="javascript:void(0);" class="edit_delete edit_info" title="查看订单信息" ng-click="customerDataTablesObj.orderInformationView()"></a><a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="customerDataTablesObj.editorInfo(\'' + mappVal[0] + '\')"></a>'
        }
      }],
      params: [{
        "name": "id",
        "value": ($scope.curCustomerGroupId)
      }],
      updateDefaultParam: true,
      sortname: '',
      sortorder: "desc",
      buttons: [],
      usepager: true,
      useRp: true,
      rp: 20,
      showTableToggleBtn: true,
      colAutoWidth: true,
      onSuccess: function(t, data) {
        $scope.customerDataTablesObj.sumNumber = data.count || "";
        $scope.customerDataTablesObj.updateTime = setISO(data.modified, "all") || "";
        var scope = angular.element(document.querySelector('#customerDataGrid')).scope();
        scope.customerDataTablesObj.compileTpl(scope);
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

    $scope.customerDataTablesObj = {
      "modelSrc": "",
      // 客户订单查询 修改属性模板入口
      "compileTpl": function(b) {
        $compile(angular.element("#customerDataGrid"))($scope || b); //编译类为marketingList元素及子元素
        $scope.$apply(); //js改变angular属性值后必须apply下
      },
      "orderInformationView": function() { // 查看客户订单信息
        this.modelSrc = CAMPAIGN_STATIC.tplBasePath + "view/customer/customerOrderInfo.html?_=" + new Date().getTime();
      },
      "editorInfo": function() {
        this.modelSrc = CAMPAIGN_STATIC.tplBasePath + "view/customer/editorCustomerInfo.html?_=" + new Date().getTime();
      },
      "girdElement": angular.element("#customerDataGrid")[0],
      "searchButtonClick": function(hdVal) {
        this.girdElement.p.newp = 1;
        this.girdElement.p.qtype = "keywords";
        this.girdElement.p.query = hdVal || "";
        this.girdElement.grid.populate();
      }
    };
  }
]);
