function getOrderConfigList(id) {
  var campListParams = [{
    "name": "categoryId",
    "value": id
  }];
  $('.orderConfigList').flexigrid({
    url: rootStatic + 'meta/order/',
    method: 'GET',
    dataType: 'json',
    colModel: [{
      display: '显示名称',
      name: 'attributeName',
      width: 2,
      sortable: true,
      align: 'center',
      dataindex: 'attributeName'
    },
    {
      display: '已配置属性数量',
      name: 'attributeCount',
      width: 2,
      sortable: true,
      align: 'left',
      dataindex: 'attributeCount'
    },
    {
      display: '已配置指标数量',
      name: 'indexCount',
      width: 2,
      sortable: true,
      align: 'left',
      dataindex: 'indexCount'
    },
    {
      display: '已定位属性数量',
      name: 'positionCount',
      width: 2,
      sortable: true,
      align: 'left',
      dataindex: 'positionCount'
    },
    {
      display: '配置人',
      name: 'userName',
      width: 2,
      sortable: true,
      align: 'left',
      dataindex: 'userName',
      renderer: function(v) {
        if (v == null || v == "null") {
          return "";
        } else {
          return v;
        }
      }
    },
    {
      display: '配置时间',
      name: 'modified',
      width: 2,
      sortable: true,
      align: 'left',
      dataindex: 'modified',
      renderer: function(v) {
        return "<span class='ac_status_grid ac_status ac_status_" + v + "'>" + setISO(v, "all") + "</span>";

      }
    },
    {
      display: '操作',
      name: 'operation',
      width: 2,
      align: 'center',
      dataindex: 'campId',
      mapping: ['categoryId', 'id'],
      convert: function(v, mappVal) {
        return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="orderConfig.modifyContion(' + mappVal[0] + ',\'' + mappVal[1] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-delete-configquery></a>'
      }
    }],
    params: campListParams,
    updateDefaultParam: true,
    sortname: "id",
    sortorder: "desc",
    rp: 20,
    usepager: true,
    useRp: true,
    showTableToggleBtn: true,
    colAutoWidth: true,
    rowDblClick: function() {
      $(".orderConfigContent").show();
    },
    onSuccess: function() {
      var scope = angular.element(document.querySelector('.orderConfigList')).scope();
      scope.orderConfig.compileTpl(scope);
    },
    onError: function(response) {
      if (response.status == 401) {
        location.pathname = root + 'login.html';
        return;
      }
    }
  });

}

angular.module('ccmsApp').controller('orderConfigCtrl', ['$scope', '$http', '$compile',
  function($scope, $http, $compile) {
    //加载订单配置列表
    //var orderConfigId=$scope.orderConfigId
    getOrderConfigList($scope.orderConfigId);
    $scope.init = function() {

    }
    //属性配置和指标配置
    $scope.tab = {
      "type": "attribute",
      "click": function(type, ele) {
        this.type = type;
        var target = ele.target;
        $(target).addClass("hover").siblings().removeClass("hover");
        if (type == "attribute") {
          $scope.attributeConfig.init();
          $(".attributeContent").show().siblings().hide();
        } else if (type == "index") {
          $scope.indexConfig.init();
          $(".indexContent").show().siblings().hide();
        }
      },
      "return": function() {
        $(".orderConfigContent").hide();
      }
    };

    $scope.attributeConfig = {
      "categoryName": "",
      "queryTypeId": 1,
      "operator": "无",
      //操作符
      "tableName": "",
      //对应表
      "correspondingData": "filed",
      //对应数据项
      "tips": "",
      //提示
      "globalParame": false,
      //全局参数
      "dependence": 0,
      //是否依赖
      "init": function() {

      },
      "add": function() {
        $(".addAttributePop").addInteractivePop({
          magTitle: "新增属性",
          width: 680,
          mark: true,
          drag: true,
          position: "fixed"
        });
      },
      "save": function() {
        var parame = {};
        parame.categoryName = this.categoryName;
        parame.queryTypeId = this.queryTypeId;
        parame.operator = this.operator;
        parame.correspondingData = this.correspoingData;
        if (this.correspondingData == "filed") {
          parame.correspondingDataValue = $scope.attributeConfig.filedName;
        } else if (this.correspondingData == "expression") {
          parame.correspondingDataValue = $scope.attributeConfig.expressionName;
        }

        if (this.queryTypeId == 6) {

        } else {

        }
        parame.tips = this.tips;
        parame.tableName = this.tableName;
        parame.globalParame = this.globalParame;
        parame.dependence = this.dependence;
        this.list();
      },
      "position": function() {
        $(".orderPositionPop").addInteractivePop({
          magTitle: "订单布局",
          width: 680,
          mark: true,
          drag: true,
          position: "fixed"
        });
        $scope.orderPositionValue = {
          "categoryId": 23,
          "left": [{
            "id": 5,
            "name": "下单时间",
            "typeId": 3,
            "position": 1
          },
            {
              "id": 7,
              "name": "付款时间",
              "typeId": 3,
              "position": 3
            }],
          "center": [],
          "right": []
        };
      },
      "list": function() {
        $('.attributeList').flexigrid({
          url: rootStatic + 'meta/order/',
          method: 'GET',
          dataType: 'json',
          colModel: [{
            display: '显示名称',
            name: 'attributeName',
            width: 2,
            sortable: true,
            align: 'center',
            dataindex: 'attributeName'
          },
          {
            display: '已配置属性数量',
            name: 'attributeCount',
            width: 2,
            sortable: true,
            align: 'left',
            dataindex: 'attributeCount'
          },
          {
            display: '已配置指标数量',
            name: 'indexCount',
            width: 2,
            sortable: true,
            align: 'left',
            dataindex: 'indexCount'
          },
          {
            display: '已定位属性数量',
            name: 'positionCount',
            width: 2,
            sortable: true,
            align: 'left',
            dataindex: 'positionCount'
          },
          {
            display: '配置人',
            name: 'userName',
            width: 2,
            sortable: true,
            align: 'left',
            dataindex: 'userName',
            renderer: function(v) {
              if (v == null || v == "null") {
                return "";
              } else {
                return v;
              }
            }
          },
          {
            display: '配置时间',
            name: 'modified',
            width: 2,
            sortable: true,
            align: 'left',
            dataindex: 'modified',
            renderer: function(v) {
              return "<span class='ac_status_grid ac_status ac_status_" + v + "'>" + setISO(v, "all") + "</span>";

            }
          },
          {
            display: '操作',
            name: 'operation',
            width: 2,
            align: 'center',
            dataindex: 'campId',
            mapping: ['categoryId', 'id'],
            convert: function(v, mappVal) {
              return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="orderConfig.modifyContion(' + mappVal[0] + ',\'' + mappVal[1] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-delete-configquery></a>'
            }
          }],
          params: campListParams,
          updateDefaultParam: true,
          sortname: "id",
          sortorder: "desc",
          rp: 20,
          usepager: true,
          useRp: true,
          showTableToggleBtn: true,
          colAutoWidth: true,
          rowDblClick: function() {
            $(".orderConfigContent").show();
          },
          onSuccess: function() {
            var scope = angular.element(document.querySelector('.orderConfigList')).scope();
            scope.orderConfig.compileTpl(scope);
          }
        });

      }
    }
    $scope.indexConfig = {
      "init": function() {

      }
    }
    //定义三个数组，用于循环布局定位中的45个位置
    $scope.orderPosition_left = [];
    $scope.orderPosition_left.length = 15;
    $scope.orderPosition_center = [];
    $scope.orderPosition_center.length = 15;
    $scope.orderPosition_right = [];
    $scope.orderPosition_right.length = 15;
    //布局配置
    $scope.positionConfig = {
      "add": function() {
      },
      "del": function() {
      }
    }
  }
])
