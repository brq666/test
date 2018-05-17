angular.module('ccmsApp').controller('attributeCollectionCtrl', ['$scope', '$compile', 'registerColumnService', 'dataSourceService', 'attributeCollection', '$select',
  function($scope, $compile, registerColumnService, dataSourceService, attributeCollection, $select) {
    //初始化数据
    $scope.dataSouece = [];
    $scope.isAdd = true;
    $scope.tablesData = [];
    $scope.fieldData = [];
    $scope.attributeList = [];
    //获取数据源
    function getDataSource() {
      var callback = function(data) {
        $scope.dataSouece = data;
        $scope.sourceModel = data[0];
      }
      dataSourceService.getDataSouece(callback);
    }

    getDataSource();

    //模板增删改
    $scope.tpl = {
      "src": "",
      "publicMeyhod": function() {
        this.src = "view/metaConfig/attributeCollectionAddTpl.html?=" + new Date().getTime();
        $scope.getTables();
      },
      "add": function() {
        $scope.isAdd = true;
        $scope.tpl.attributeCollectionName = "";
        this.publicMeyhod();
        $scope.attributeList = [];
      },
      "modify": function() {
        $scope.isAdd = false;
        this.publicMeyhod();
      },
      "save": function() {
        var _this = this;
        var parame = {};
        parame.attributeCollectionName = $scope.tpl.attributeCollectionName;
        parame.registerTableId = $scope.tablesModel.registerTableId;
        parame.attributeConfigs = $select.get($scope.attributeList, "item", "registerColumnId");
        var callback = function() {
          _this.close();
          $('.flexgridList').flexReload();
        }
        attributeCollection.post(callback, parame);
      },
      "cancel": function() {
        this.close();
      },
      "close": function() {
        this.src = "";
        $(".yunat_maskLayer").remove();
        $(".attributeCollection_AddTpl").hide();
      },
      "del": function(id) {
        $(this).Confirm({
          "title": "确认删除",
          "str": "属性集删除后会删除属性，确定要删除属性集？",
          "mark": true
        },
        function() {
          $.ajax({
            url: rootStatic + "metas/attribute-collection/" + id,
            async: false,
            type: "DELETE",
            cache: false,
            //data:parames,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              if (res.code == 200) {
                $(this).yAlert({
                  "text": "删除成功"
                });
                removeAlert();
                $('.flexgridList').flexReload();
              } else {
                $(this).Alert({
                  "title": "错误",
                  "str": res.msg,
                  "mark": true
                });
              }
            }
          })
        })
      }
    }
    //编辑弹出框
    $scope.edit = {
      "open": function() {
        $(".selectField").addInteractivePop({
          magTitle: "配置普通属性",
          width: 560,
          mark: true,
          position: "fixed",
          childElePop: true
        });

        if ($scope.attributeList.length == 0) { //如果没有选择基础属性，打开编辑框默认显示一个
          $scope.editList = [{
            "name": "",
            "item": {},
            "isMaster": false
          }];
        } else {
          $scope.editList = angular.copy($scope.attributeList);
        }

        //console.log($scope.editList[0].item)
        //console.log($scope.fieldData[0])
      },
      "add": function(index) {
        $scope.editList.push({
          "name": "",
          "item": {},
          "isMaster": false
        });
      },
      "del": function(index) {
        if (index == 0) {
          return false;
        }
        $scope.editList.splice(index, 1);
      },
      "sure": function() {
        //var parame=$select.get($scope.editList,"item","registerColumnId");
        $scope.attributeList = angular.copy($scope.editList);
        this.close();
      },
      "cancel": function() {
        this.close();
      },
      "close": function() {
        $(".selectField").hide();
        $(".childElementMark").remove();
        $(".yunat_maskLayer").last().remove();
      }
    }
    //获取表数据
    $scope.getTables = function() {
      var callback_tables = function(data) {
        $scope.tablesData = data;
        $scope.tablesModel = $scope.tablesData[0];
        $scope.getField($scope.tablesModel.registerTableId);

      }
      attributeCollection.getAllTables(callback_tables, $scope.sourceModel.dataSourceId);
    }
    //获取表字段
    $scope.getField = function(id) {
      var callback_field = function(data) {
        $scope.fieldData = data;

        $scope.fieldNameData = [];
        $scope.fieldData.forEach(function(value) {
          $scope.fieldNameData.push(value.registerColumnName);
        })
      }
      registerColumnService.getField(callback_field, id);
    }
    //切换表
    $scope.changeTables = function(obj) {
      $scope.tablesModel = obj;
      $scope.getField($scope.tablesModel.registerTableId);
    }
    //切换字段
    $scope.changeField = function(model, index, obj) {

    }
    //切换源
    $scope.changeSource = function(model) {
      $scope.sourceModel = model;
    }
    //选择主属性
    $scope.selectedAttribute = function(model) {
      var i = 0,
          len = $scope.attributeList.length;
      for (; i < len; i++) {
        $scope.attributeList[i].isMaster = false;
        if ($scope.attributeList[i].item.registerColumnId == model.item.registerColumnId) {
          $scope.attributeList[i].isMaster = true;
        }
      }
      // console.log($scope.attributeList[model])
    }
    $scope.showAddTpl = function() {
      var title = "新增";
      if (!$scope.isAdd) {
        title = "修改";
      }
      $(".attributeCollection_AddTpl").addInteractivePop({
        magTitle: title + "属性集配置",
        width: 480,
        mark: true,
        position: "fixed"
      });
    }

    $scope.compileTpl = function(b) {
      $compile(angular.element(".flexgridList"))($scope || b);
      $scope.$apply();
    }

    //获取列表
    $scope.flexgridFn = function(id) {
      $('.flexgridList').flexigrid({
        url: rootStatic + 'metas/attribute-collection/page/',
        method: 'GET',
        dataType: 'json',
        colModel: [{
          display: '属性集ID',
          name: 'attributeCollectionId',
          width: 2,
          sortable: false,
          align: 'left',
          dataindex: 'attributeCollectionId'
        },
        {
          display: '属性集名称',
          name: 'attributeCollectionName',
          width: 2,
          sortable: false,
          align: 'left',
          dataindex: 'attributeCollectionName'
        },
        {
          display: '对应表',
          name: 'registerTableName',
          width: 2,
          sortable: false,
          align: 'left',
          dataindex: 'metasRegisterTable.registerTableName'
        },
        {
          display: '主属性',
          name: 'registerTableName',
          width: 2,
          sortable: false,
          align: 'left',
          dataindex: 'metaAttributes',
          renderer: function(v) {
            var len = v.length,
                i = 0,
                data;
            for (; i < len; i++) {
              if (v[i].isMaster) {
                data = v[i].attributeName;
                break;
              }
            }
            return data;
          }
        },

        {
          display: '操作',
          name: 'operation',
          width: 2,
          sortable: false,
          align: 'center',
          mapping: ["attributeCollectionId"],
          convert: function(v, mappval) {
            return '<a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-click="tpl.del(' + mappval[0] + ')"></a>';

          }
        }],
        updateDefaultParam: true,
        sortname: "attributeCollectionId",
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
    $scope.flexgridFn();
  }
]);