angular.module('ccmsApp').controller('fieldCtrl', ['$scope', 'registerColumnService',
  function($scope, registerColumnService) {
    //初始化数据
    $scope.tablesData = [];
    $scope.FieldData = [];
    $scope.cloumnData = [];
    $scope.currentField;
    $scope.isAddField = false;
    //打开立即执行方法
    (function() {
      //获取表数据
      var callback = function(data) {
        $scope.tablesData = data;
        $scope.currentField = data[0];
        $scope.getTablesField($scope.currentField);
      }
      registerColumnService.getAllTables(callback);
    })();
    $scope.changeTables = function(obj) {
      $scope.currentField = obj;
      $scope.getTablesField();
    }
    //加载表字段
    $scope.getTablesField = function() {
      var callback = function(data) {
        $scope.FieldData = data;
      }
      registerColumnService.getField(callback, $scope.currentField.registerTableId);
    }

    //新增字段
    $scope.field_tpl = {
      "add": function() {
        $scope.isAddField = true;
        if (!$scope.currentField) {
          return false;
        }
        this.init();
      },
      "init": function() {
        console.log($scope.currentField);
        var currentField = $scope.currentField,
            id = currentField.metaDataSource.dataSourceId,
            name = currentField.registerTableName;

        var callback = function(data) {
          $scope.cloumnData = data;
        };
        registerColumnService.getCloumn(callback, id, name);
      },
      "close": function() {
        $scope.isAddField = false;
      },
      "save": function() {
        var parame = [];
        registerTableId = $scope.currentField.registerTableId;
        angular.element(".dataConfigure_table_list_style").each(function(index) {
          var scope = $(this).scope();
          var checked = $(this).find("input").attr("checked");
          if (checked == "checked") {
            scope.cloumn.registerTableId = registerTableId;
            parame.push(scope.cloumn);
          }
        });
        var callback = function() {
          $scope.field_tpl.close();
          $scope.getTablesField();
        }
        registerColumnService.save(callback, parame);
      },
      "cancel": function() {
        this.close();
      }
    }

    //删除字段
    $scope.delField = {
      "del": function(id) {
        $.ajax({
          url: rootStatic + "metas/physical/register/table/column/" + id,
          async: false,
          type: "DELETE",
          cache: false,
          dataType: "json",
          contentType: 'application/json',
          success: function(res) {
            if (res.code == 200) {
              $(this).yAlert({
                "text": res.message
              });
              removeAlert();
              $scope.getTablesField();

            } else {
              $(this).Alert({
                "title": "错误",
                "str": res.msg,
                "mark": true
              });
            }
          }
        })
      }
    }

    //获取表数据
    $scope.getList = function(id) {
      var callback = function() {

      }
    }

    //监听搜索
    $scope.$watch("selectTable", function(newVal) {
      $scope.unselectedTables = $scope.unselectedTables || [];
      var searchResultAry = [];
      if (newVal == "") {
        $scope.unselectedTables = $scope.defaultDatas ? $scope.defaultDatas.slice() : [];
        return
      }
      angular.forEach($scope.unselectedTables, function(val, key) {
        var flagIndex = (val.tableName).indexOf(newVal);
        if (flagIndex != -1) {
          searchResultAry.push(val);
        };
      });
      $scope.unselectedTables = searchResultAry.slice();
    });
  }
]);