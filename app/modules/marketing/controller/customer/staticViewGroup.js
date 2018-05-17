angular.module("campaign.controllers").controller('StaticViewGroupCtrl', ['$scope', '$http', '$q', '$compile', 'getListService',
  function($scope, $http, $q, $compile, getListService) {
    /*发送给查询节点的相关Id
     * sendQuerySubjectId-主题Id，sendQueryNodeId-默认节点ID
     */
    window.graph = null; //清除graph变量
    $scope.sendQuerySubjectId = "";
    $scope.sendQueryNodeId = "";
    /*end*/
    getListService.editorStaticCustomerGroup(function(response) {
      var colModelAry = [];
      angular.forEach(response.headers, function(val, key) {
        var colModel = {
          display: val.displayName,
          name: val.name,
          width: 2,
          sortable: false,
          dataindex: val.indexId
        };
        if (val.indexId == "性别") {
          colModel = {
            display: val.displayName,
            name: val.name,
            width: 2,
            sortable: false,
            dataindex: val.indexId,
            renderer: function(v) {
              if (v == "m") {
                return "男";
              }
              if (v == "f") {
                return "女";
              } else {
                return "";
              }
            }
          };
        }
        colModelAry.push(colModel);
      });
      $('#staticCustomerDataGrid').flexigrid({ //属性列表grid
        url: GLOBAL_STATIC.nodeRoot + 'node/group/result/?_=' + new Date().getTime(),
        method: 'GET',
        dataType: 'json',
        colModel: colModelAry,
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
          $scope.staticViewGroupObj.sumNumber = data.count || "";
          $scope.staticViewGroupObj.updateTime = setISO(data.modified, "all") || "";
          var scope = angular.element(document.querySelector('#staticCustomerDataGrid')).scope();
          scope.staticViewGroupObj.compileTpl(scope);
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
        }, $scope.curCustomerGroupId);

    $scope.staticViewGroupObj = {
      "curDefaultGroupId": "",
      "categoriesList": [],
      "getModelNodeData": function() {
        var _this = this;
        getListService.editorCustomerGroup(function(response) {
          _this.groupType = response.groupType || "";
          _this.curDefaultGroupId = response.id || "";
          _this.categoriesList = response.list;
          _this.categoryName = response.categoryId || "";
        }, $scope.curCustomerGroupId);
      },
      "modelSrc": "",
      // 客户订单查询 修改属性模板入口
      "compileTpl": function(b) {
        $compile(angular.element("#staticCustomerDataGrid"))($scope || b); //编译类为marketingList元素及子元素
        $scope.$apply(); //js改变angular属性值后必须apply下
      },
      "orderInformationView": function() { // 查看客户订单信息
        this.modelSrc = CAMPAIGN_STATIC.tplBasePath + "view/customer/customerOrderInfo.html?_=" + new Date().getTime();
      },
      "editorInfo": function() {
        this.modelSrc = CAMPAIGN_STATIC.tplBasePath + "view/customer/editorCustomerInfo.html?_=" + new Date().getTime();
      },
      "girdElement": angular.element("#staticCustomerDataGrid")[0],
      "searchButtonClick": function(hdVal) {
        this.girdElement.p.newp = 1;
        this.girdElement.p.qtype = "keywords";
        this.girdElement.p.query = hdVal || "";
        this.girdElement.grid.populate();
      }
    }
    $scope.staticViewGroupObj.getModelNodeData();
  }
]);
