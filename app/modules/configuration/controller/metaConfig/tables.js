/**
 * @author:tim.yin
 * @param $scope
 * @param tablesService
 */

var app = angular.module('ccmsApp');
app.controller("tablesCtrl", ["$scope", "dataSourceService", "$http", "$compile",
  function($scope, dataSourceService, $http, $compile) {

    $scope.dataSourceList = []; (function() {
      var callback = function(resultSet) {
        $scope.dataSourceList = resultSet;
        $scope.dataSourceNameModel = $scope.dataSourceList[0];

        //注册表列表
        $('.registerTable_flexgrid').flexigrid({
          url: rootStatic + 'metas/physical/register/table/page/',
          method: 'GET',
          dataType: 'json',
          colModel: [{
            display: '表ID',
            name: 'registerTableId',
            width: 2,
            sortable: false,
            align: 'left',
            dataindex: 'registerTableId'
          },
          {
            display: '表名称',
            name: 'registerTableName',
            width: 2,
            sortable: false,
            align: 'left',
            dataindex: 'registerTableName'
          },
          {
            display: '表备注',
            name: 'registerTableComment',
            width: 2,
            sortable: true,
            align: 'left',
            dataindex: 'registerTableComment'
          },
          {
            display: '表类型',
            name: 'registerTableType',
            width: 2,
            sortable: true,
            align: 'left',
            dataindex: 'registerTableType'
          },
          {
            display: '操作',
            name: 'operation',
            width: 2,
            sortable: false,
            align: 'center',
            mapping: ["registerTableId"],
            convert: function(v, mappval) {
              return '<a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-click="delTable.del(' + mappval[0] + ')"></a>';

            }
          }],
          updateDefaultParam: true,
          sortname: "registerTableId",
          sortorder: "desc",
          rp: 20,
          params: [{
            "name": "dataSourceId",
            "value": $scope.dataSourceNameModel.dataSourceId
          }],
          usepager: true,
          useRp: true,
          showTableToggleBtn: true,
          colAutoWidth: true,
          onSuccess: function() {
            var scope = angular.element(document.querySelector('.registerTable_flexgrid')).scope();
            scope.compileTpl(scope);
          },
          onError: function(response) {
            if (response.status == 401) {
              location.pathname = root + 'login.html';
              return;
            }
          }
        });

      };
      dataSourceService.getDataSouece(callback);
    })();

    //搜索table表
    var grid = angular.element(".registerTable_flexgrid")[0];
    $scope.searchTableButtonClick = function(searchVal) {
      grid.p.qtype = "keywords";
      grid.p.query = searchVal || "";
      grid.grid.populate();
    };

    //删除表
    $scope.delTable = {
      "del": function(id) {
        $(this).Confirm({
          "title": "确认删除",
          "str": "属性注册表后该注册表下的注册列也会删除，确定要删除注册表？",
          "mark": true
        },
        function() {
          $.ajax({
            url: rootStatic + "metas/physical/register/table/" + id,
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
                $('.registerTable_flexgrid').flexReload();
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

    //新增表
    $scope.addTable = {
      "add": function() {
        $scope.isShowMetaTable = true;
        this.init();
      },
      "init": function() {
        var id = $scope.dataSourceNameModel.dataSourceId;
        var callback = function(data) {
          $scope.unselectedTables = data;
          $scope.defaultDatas = data;
        };
        dataSourceService.getUnselectedTables(callback, id);
      },
      "save": function() {
        var selectTableResult = [];
        var id = $scope.dataSourceNameModel.dataSourceId;
        angular.element(".dataConfigure_table_list input:checked").each(function() {
          selectTableResult.push({
            "registerTableName": $(this).attr("name"),
            "registerTableComment": $(this).attr("comment")
          });
        });
        var callback = function(data) {
          $scope.isShowAddTable = false;
          $(this).yAlert({
            "text": data.message
          });
          removeAlert();
          $('.registerTable_flexgrid').flexReload();
          $scope.isShowMetaTable = false;
        };
        dataSourceService.saveSourceService(callback, id, selectTableResult);
      }
    }

    //监听新增表搜索
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

    $scope.getAllUnselectedTable = function() {
      $scope.unselectedTables = [];
      $http.get(rootStatic + 'metas/physical/datasource/' + $scope.dataSourceNameModel.dataSourceId + '/table/?_=' + new Date().getTime()).then(function(res) {
        $scope.defaultDatas = res.data;
        $scope.unselectedTables = res.data;
        $scope.selectAll = false;
      },
      function() {
        $(this).Alert({
          "title": res.code || "提示",
          "str": res.description || "错误",
          "mark": true
        });
      });
    };
    $scope.submitSelectTable = function() {
      $scope.hideAddTableEl();
    };
    $scope.cancelSelectTable = function() {
      $scope.isShowMetaTable = false;
    };
    $scope.compileTpl = function(b) {
      $compile(angular.element(".registerTable_flexgrid"))($scope || b);
      $scope.$apply();
    };
  }
]);
