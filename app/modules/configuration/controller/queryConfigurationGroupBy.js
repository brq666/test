angular.module('ccmsApp').controller('categoryGroupBy', ['$scope', '$http', 'queryConfigService',
  function($scope, $http, queryConfigService) {
    $(".splitGroupPop").addInteractivePop({
      magTitle: "分组配置",
      mark: true,
      drag: true,
      position: "fixed",
      width: 640
    }); //弹框调用
    $scope.configData = {
      "getTables_calback": function(data) {
        var _this = $scope.configData;
        _this.tables = data;
        _this.tableName = data[0].registerTableName;
        _this.schemaName = data[0].schemaName;
        _this.getTableColumn(_this.tableName, _this.schemaName);
      },
      "getTableColumn_calback": function(data) {
        var _this = $scope.configData;
        _this.tableColumns = data;
        if (!$scope.isAddConfiguration) { //修改活动
          _this.columnName = $scope.modificationData[0].columnName;
        } else {
          _this.columnName = data[0].columnName;
        }
      },
      "getTableColumn": function(tableName, schemaName) {
        queryConfigService.getTableColumn($scope.configData.getTableColumn_calback, tableName, schemaName);
      },
      "init": function() {
        queryConfigService.getTables($scope.configData.getTables_calback);
      },
      "getMetaDicCallBack": function(data) {
        var _this = $scope.configData;
        _this.metaDics = data;
      },
      "metaDics": function() {
        queryConfigService.queryMetaDicSimplify($scope.configData.getMetaDicCallBack);
      },
      "getGroupByCallBack": function(data) {
        var _this = $scope.configData;
        $scope.categoryGroupData = data;
        // 根据字典dic_key获取字典维度名称
        var tmpGroupByColumns = [];
        for (var i = 0; i < $scope.categoryGroupData.groupByColumns.length; i++) {
          var groupByColumn = $scope.categoryGroupData.groupByColumns[i];

          var metaDics = $scope.configData.metaDics;
          for (var j = 0; j < metaDics.length; j++) {
            if (metaDics[j].dicKey == groupByColumn.dicKey) {
              groupByColumn.dicKey = metaDics[j].dicName;
            }
          }
          tmpGroupByColumns.push(groupByColumn);
        }
        $scope.categoryGroupData.groupByColumns = tmpGroupByColumns;

        $scope.configData.getTableColumn($scope.categoryGroupData.tableName, $scope.configData.tables[0].schemaName);

        if ($scope.categoryGroupData.groupByColumns.length == 0) {
          var groupByColumn = {
            "columnName": "",
            "columnType": "",
            "dicKey": "",
            "orderId": "1"
          };
          $scope.categoryGroupData.groupByColumns.push(groupByColumn);
        }
      },
      "initGroupBy": function() {
        queryConfigService.queryCategoryGroupBy($scope.configData.getGroupByCallBack, $scope.tree.getSelectedNodes()[0].id);
      },
      "saveCategoryGroupByCallBack": function(data) {
        angular.element(".splitGroupPop").hide();
        angular.element(".yunat_maskLayer").remove();
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
      }
    };

    $scope.configuration = {
      "addGroupByColumn": function() {
        var groupByColumn = {
          "columnName": "",
          "columnType": "",
          "dicKey": "",
          "orderId": ""
        };
        $scope.categoryGroupData.groupByColumns.push(groupByColumn);
      },
      "deleteGroupByColumn": function(i) {
        $scope.categoryGroupData.groupByColumns.splice(i, 1);
      },
      "saveCategoryGroupBy": function() {
        var categoryGroupByVo = {};
        categoryGroupByVo.categoryId = $scope.tree.getSelectedNodes()[0].id;
        categoryGroupByVo.groupByColumns = [];
        for (var i = 0; i < $scope.categoryGroupData.groupByColumns.length; i++) {
          var groupByColumn = $scope.categoryGroupData.groupByColumns[i];
          var groupByColumnBean = {};
          groupByColumnBean.columnName = groupByColumn.columnName;
          // 根据字典维度名称获取字典维度dic_key
          var metaDics = $scope.configData.metaDics;
          for (var j = 0; j < metaDics.length; j++) {
            if (metaDics[j].dicName == groupByColumn.dicKey) {
              groupByColumnBean.dicKey = metaDics[j].dicKey;
            }
          }
          groupByColumnBean.columnType = groupByColumn.columnType;

          categoryGroupByVo.groupByColumns.push(groupByColumnBean);
        }
        categoryGroupByVo.subjectId = "1";
        categoryGroupByVo.tableName = $scope.categoryGroupData.tableName;

        queryConfigService.saveCategoryGroupBy($scope.configData.saveCategoryGroupByCallBack, categoryGroupByVo);

      }

    }

    $scope.configData.init();
    $scope.configData.metaDics();
    $scope.configData.initGroupBy();
  }
]);