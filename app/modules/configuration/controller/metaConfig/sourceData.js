/**
 * @author:tim.yin
 * @param $scope
 * @param dataSourceService
 */

angular.module('ccmsApp').controller('sourceDataCtrl', ['$scope', 'dataSourceService',
  function($scope, dataSourceService) {
    //初始化数据
    $scope.dataList = [];
    $scope.templateList = [];
    //打开获取list数据
    (function() {
      var callback = function(resultSet) {
        $scope.dataList = resultSet;
      };
      dataSourceService.getDataSouece(callback);
    })();
    //新增与修改
    $scope.tpl = {
      "src": "",
      "add": function() {
        this.src = "view/metaConfig/sourceAddTpl.html?_=" + new Date().getTime();

        var callback = function(resultSet) {
          $scope.templateList = resultSet;

          //notice: 绑定ng-model 默认填充第一行数据  帮数组第一个"对象" 赋给ng-model绑定的scope变量
          $scope.defaultTemplateName = $scope.templateList[0];
          $scope.tpl.templateUrl = $scope.templateList[0].templateUrl;
        };
        dataSourceService.getTemplate(callback);
      },

      "delete": function(id) {
        var callback = function(resultSet) {
          var callback = function(resultSet) {
            $scope.dataList = resultSet;
          };
          dataSourceService.getDataSouece(callback);
        };
        dataSourceService.deleteDataSource(callback, id);

      },

      "changeTemplateType": function(templateObject) {
        $scope.tpl.templateUrl = templateObject.templateUrl;
        $scope.tpl.templateType = templateObject.templateName;
      },

      "submit": function() {
        var dataSourceConfigData = {};
        dataSourceConfigData.dataSourceName = $scope.tpl.dataSourceName;
        dataSourceConfigData.templateUrl = $scope.tpl.templateUrl;
        dataSourceConfigData.templateType = $scope.tpl.templateType;

        //TODO
        dataSourceConfigData.metaDataSourceConnection = $scope.templateList[1];

        var callback = function(resultSet) {
          $scope.saveResult = resultSet;
        };
        dataSourceService.saveDataSource(callback, dataSourceConfigData);
      }
    };
  }
]);