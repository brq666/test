angular.module('ccmsApp').controller('functionCtrl', ['$scope', 'functionAttribute', 'dataSourceService', '$compile', '$select',
  function($scope, functionAttribute, dataSourceService, $compile, $select) {
    //初始化数据
    $scope.dataSource = [];
    $scope.dataType = [];
    $scope.typeList = []
    //获取数据源
    $scope.getDataSource = function() {
      var callback = function(data) {
        $scope.dataSource = data;
      };
      dataSourceService.getDataSouece(callback);
    }
    $scope.getDataSource();
    //获取返回值类型
    $scope.getDataType = function() {
      var callback = function(data) {
        $scope.dataType = data;
      }
      functionAttribute.getDataType(callback);
    }
    $scope.getDataType();
    //
    $scope.tpl = {
      "isAdd": true,
      "functionBody": "",
      "id": null,
      "src": "",
      "showAddTpl": function() {
        var _this = this;
        $(".function_AddTpl").addInteractivePop({
          magTitle: "函数配置",
          width: 540,
          mark: true,
          position: "fixed"
        });
      },
      "public": function() {
        var _this = this;
        if ($scope.typeList.length == 0) {
          $scope.typeList.push({
            name: "",
            parame: {}
          })
        }
      },
      "add": function() {
        this.isAdd = true;
        this.public();
        this.src = "view/metaConfig/functionAppTpl.html?" + new Date().getTime();
        $scope.sourseModel = $scope.dataSource[0];
        $scope.dataTypeModel = $scope.dataType[0];
      },
      "modify": function(id) {
        var _this = this;
        _this.isAdd = false;
        _this.public();
        _this.src = "view/metaConfig/functionAppTpl.html?" + new Date().getTime();
        var callback = function(data) {
          _this.id = data.id;
          _this.name = data.functionName;
          _this.functionBody = data.functionBody;
          var sourseModelIndex = $select.getIndex(data.dataSourceId, "dataSourceId", $scope.dataSource);
          $scope.sourseModel = $scope.dataSource[sourseModelIndex];
          var dataTypeModelIndex = $select.getIndex(data.returnDataType, "dataType", $scope.dataType);
          $scope.dataTypeModel = $scope.dataType[dataTypeModelIndex];

        }
        functionAttribute.modify(callback, id);

      },
      "del": function(id) {
        var callback = function() {
          $scope.getGrid
        }
        $(this).Confirm({
          "title": "确认删除",
          "str": "条件删除后将无法恢复，确定要删除吗？",
          "mark": true
        },
        function() {
          functionAttribute["delete"](callback, id);
        })
      },
      "save": function() {
        var _this = this,
            parame = {},
            i = 0,
            len = $scope.typeList.length;
        _this.close();
        if (_this.isAdd) {
          parame.id = null;
        } else {
          parame.id = _this.id;
        }
        parame.dataSourceId = $scope.sourseModel.dataSourceId;
        parame.functionName = _this.name;
        parame.functionBody = _this.functionBody;
        parame.returnDataType = $scope.dataTypeModel.dataType;
        parame.params = [];

        for (; i < len; i++) {
          var o = {};
          o.paramName = $scope.typeList[i].name;
          o.paramDataType = $scope.typeList[i].parame.dataType;
          parame.params.push(o);
        }

        var callback = function() {
          $scope.getGrid()
        }
        functionAttribute.post(callback, parame);
      },
      "close": function() {
        this.src = "";
        $(".function_AddTpl").hide();
        $(".yunat_maskLayer").remove();
      }
    }
    //入参配置操作
    $scope.parameList = {
      "add": function() {
        $scope.typeList.push({
          name: "",
          parame: {}
        })
      },
      "del": function(index) {
        if ($scope.typeList.length == 1) {
          return false;
        }
        $scope.typeList.splice(index, 1);
      }
    }
    //flexgrid列表
    $scope.getGrid = function() {
      var $gridElement = angular.element(".functionGridWrap");
      $gridElement.html("").append("<div class='flexgridList'></div>");
      $('.flexgridList').flexigrid({
        url: rootStatic + 'metas/function/page/',
        method: 'GET',
        dataType: 'json',
        colModel: [{
          display: 'ID',
          name: 'id',
          width: 2,
          sortable: true,
          align: 'left',
          dataindex: 'id'
        },
        {
          display: '函数名称',
          name: 'functionName',
          width: 2,
          sortable: false,
          align: 'left',
          dataindex: 'functionName'
        },
        {
          display: '返回值类型',
          name: 'returnDataTyp',
          width: 2,
          sortable: false,
          align: 'left',
          dataindex: 'returnDataTyp'
        },
        {
          display: '状态',
          name: 'status',
          width: 2,
          sortable: false,
          align: 'center',
          mapping: ["id"],
          convert: function(v, mappval) {
            return '<a ng-click="tpl.modify(' + mappval[0] + ')" href="javascript:void(0);" class="edit_delete edit_icon" title="修改"></a><a ng-click="tpl.del(' + mappval[0] + ')" href="javascript:void(0);" class="edit_delete delete_icon" title="删除"></a>';
          }
        }],
        updateDefaultParam: true,
        sortname: "id",
        sortorder: "desc",
        rp: 20,
        usepager: true,
        useRp: true,
        showTableToggleBtn: true,
        searchitems: {
          display: '优惠名称',
          name: 'name'
        },
        colAutoWidth: true,
        onSuccess: function() {
          var scope = angular.element(document.querySelector('.flexgridList')).scope();
          scope.compileTpl(scope);
        }
      });
    }
    $scope.getGrid();

    $scope.compileTpl = function(b) {
      $compile(angular.element(".flexgridList"))($scope || b);
      $scope.$apply();
    }
  }
]);