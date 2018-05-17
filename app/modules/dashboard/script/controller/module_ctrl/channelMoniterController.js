// JavaScript Document
angular.module("dashboard.controllers").controller('channelMoniterController', ["$scope", "$http",
  function($scope, $http) {
    //chart category
    var category = [];
    var shortMes = [];
    var emailMes = [];

    //请求快捷入口的各个活动
    $http.get(GLOBAL_STATIC.dashboardRoot + 'dashboard/channel/sendStatic?interval=7').success(getChartData).error(serverFail);

    $scope.data = null;
    //获取7天的数据
    $scope.renderChartWeek = function() {
      $http.get(GLOBAL_STATIC.dashboardRoot + 'dashboard/channel/sendStatic?interval=7').success(getChartData).error(serverFail);
    }
    //获取30天的数据
    $scope.renderChartMonth = function() {
      $http.get(GLOBAL_STATIC.dashboardRoot + 'dashboard/channel/sendStatic?interval=30').success(getChartData).error(serverFail);
    }
    //渲染图表
    $scope.renderChart = renderChart;
    //获取chart数据
    function getChartData(data) {
      var date;
      //清空数组
      resetData();

      for (var i in data) {
        var dates = data[i].sendDate.split('-');
        category.push(parseInt(dates[1]) + '月' + parseInt(dates[2]) + '日');
        emailMes.push(parseInt(data[i].tcommunicateEDM));
        shortMes.push(parseInt(data[i].tcommunicateSMS));
      }
      //渲染图表
      if ($scope.chart) {
        renderChart();
      }
    }

    function serverFail(data) {
      $scope.counts = [];
    }

    //renderchart
    function renderChart() {
      var chart = $scope.chart;
      var series = chart.series;
      //设置间距
      if (emailMes.length === 7) {
        chart.xAxis[0].update({
          tickInterval: 1
        });
      } else {
        chart.xAxis[0].update({
          tickInterval: 4
        });
      }
      chart.xAxis[0].setCategories(category);
      series[0].setData(shortMes);
      series[1].setData(emailMes);
      chart.redraw();
    }
    function resetData() {
      category = [];
      shortMes = [];
      emailMes = [];
    };
  }
]);
