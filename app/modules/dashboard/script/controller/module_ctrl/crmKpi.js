/**
 * Created by dupenghui on 2014/11/20.
 */

angular.module("dashboard.controllers").controller('crmKpiCtrl', ["$scope", "$http", "dashboardService",
  function($scope, $http, dashboardService) {
    $scope.index = 0;
    $scope.interval = 30
    $scope.chartDisType = [{
      type: "rebuyRate",
      name: "复购率指标"
    }, {
      type: "saleNum",
      name: "回头客指标"
    }];
    $scope.ajaxDone = true;
    $scope.defaultChartType = $scope.chartDisType[0];
    $scope.defaultCategorie = {};
    $scope.categories = [];
    $scope.changeCategorie = function(index) {
      $scope.defaultCategorie = $scope.categories[index];
      getChartData();
    }

    $scope.changeChartDis = function(index, item) {
      $scope.index = index;
      $scope.defaultChartType = $scope.chartDisType[index];
      getChartData();
    }

    $scope.changeShopId = function(index) {
      var _this = this;
      if (!_this.loaded) {
        return false
      }
      $scope.defaultShopName = $scope.shops[index]["shopName"];
      $scope.defaultPltType = $scope.shops[index]["pltType"];
      $scope.defaultShopId = $scope.shops[index]["shopId"];
      getCategories().then(function() {
        getChartData();
      });
    }

    dashboardService.getShopInfo({}, getShopList);

    function getChartData() {
      var _this = $scope;
      var param = {
        'shopId': _this.defaultShopId,
        'category': _this.defaultCategorie
      };
      if (_this.defaultChartType.type === "rebuyRate") {
        url = GLOBAL_STATIC.dashboardRoot + "dashboard/crm/kpi/buyback_rate/?_=" + new Date().getTime()
      } else {
        url = GLOBAL_STATIC.dashboardRoot + "dashboard/crm/kpi/sales_amount/?_=" + new Date().getTime()
      }
      return $http({
        method: 'post',
        data: param,
        url: url
      })
        .success(function(data, status, headers, config) {
          renderChart(data);
        })
        .error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        })
    }

    function renderChart(data) {
      var _this = $scope;
      var option = angular.copy($scope.option);
      $scope.statisTime = data.statisTime;
      option.xAxis[0].categories = data.month;
      if (_this.defaultChartType.type === "saleNum") {
        option.plotOptions.column = {
          stacking: 'normal'
        };
        option.series[2].xAxis = 'store-axis';
        option.series[3].xAxis = 'store-axis';
        option.yAxis[0].stackLabels = {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        };
      }
      data.figure.forEach(function(item) {
        switch (item.type) {
          case 'salesAmoutBackShop':
          case 'buybackShopGuestsNum':
            option.series[0].name = item.name;
            option.series[0].data = item.data;
            break;
          case 'salesAmoutFirstShop':
          case 'buybackIndustryGuestsNum':
            option.series[1].name = item.name;
            option.series[1].data = item.data;
            break;
          case 'buybackShopRate':
          case 'salesRateShop':
            $scope.shopRateName = item.name;
            option.series[2].name = item.name;
            option.series[2].data = resoleData(item.data, 65);
            break;
          case 'salesBackRateIndustry':
          case 'buybackIndustryRate':
            $scope.industryRateName = item.name;
            option.series[3].name = item.name;
            option.series[3].data = resoleData(item.data, 125);
            break;
        }
      });
      $('#crmKpiChart').highcharts(option);
    }

    function resoleData(arr, base) {
      if($scope.defaultChartType.type === 'saleNum') {
        return arr;
      }
      else {
        var result = arr.map(function(item, index) {
          var tem = [base/100, item];
          base += 185;
          return tem;
        });
        return result;
      }
    }

    Highcharts.setOptions({
      lang: {
        numericSymbols:null
      }
    });

    $scope.option = {
      title: {
        text: ''
      },
      plotOptions: {
        line: {
          marker:{
            fillColor: '#FFFFFF',
            lineWidth: 2,
            symbol:'circle',
            lineColor: null
          }
        }
      },
      subtitle: {
        text: ''
      },
      credits: {
        text: '',
        href: ''
      },
      legend: {
        align: 'right',
        x: -10,
        y: 50
      },
      chart: {
        alignTicks: true
      },
      tooltip: {
        formatter: function() {
          if(this.series.type ==='column') {
            return this.series.name + ':' + '<br/><b>' + this.y + '</b>';
          }
          else {
            return this.series.name + ':' + '<br/><b>' + this.y  + '%' + '</b>';
          }
        },
        followPointer: true,
        hideDelay:0,
      },
      xAxis: [{
        categories: [],
        id: 'store-axis'
      }, {
        id: 'rate-axis',
        min: 0,
        max: 24,
        lineWidth: 0,
        labels: {
          enabled: false
        },
        tickLength: 0,
        tickAmount: 13
      }],
      yAxis: [{
        title: {
          text: ''
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        },
        gridLineWidth: 0,
        lineWidth: 1,
        tickAmount: 5,
        id: 'numb-axis'
      }, {
        tickAmount: 5,
        gridLineWidth: 0,
        max: 100,
        min:0,
        labels: {
          format: '{value}%'
        },
        id: 'pecent-axis',
        title: {
          text: ''
        },
        opposite: true
      }],
      series: [{
        color: '#fecb6b',
        type: 'column',
        data: [],
        name: '',
        yAxis: 'numb-axis',
        xAxis: 'store-axis'
      }, {
        color: '#77d3c5',
        type: 'column',
        data: [],
        name: '',
        yAxis: 'numb-axis',
        xAxis: 'store-axis'
      }, {
        color: '#f07e80',
        type: 'line',
        data: [],
        name: '',
        yAxis: 'pecent-axis',
        xAxis: 'rate-axis'
      }, {
        color: '#39bbc4',
        type: 'line',
        data: [],
        name: '',
        yAxis: 'pecent-axis',
        xAxis: 'rate-axis'
      }]
    };


    function getCategories() {
      var _this = $scope;
      var shopId = $scope.defaultShopId;
      return $http({
        method: 'get',
        url: GLOBAL_STATIC.dashboardRoot + "dashboard/crm/kpi/category/" + shopId + "/?_=" + new Date().getTime()
      })
        .success(function(data, status, headers, config) {
          var count = 1;
          _this.defaultCategorie = data.register;
          _this.categories = data.deriveList;
          _this.categories.push(data.register);
        })
        .error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
    }

    function getShopList(data) {
      var _this = $scope;
      var shops = [];
      data.shop.forEach(function(sh, index) {
        // 去除非淘宝店铺
        if(sh["pltType"] == "plt_taobao_shop") {
          shops.push(sh);
        }
      });
      _this.defaultShopId = shops[0]["shopId"];
      _this.loaded = true;
      $scope.defaultShopName = shops[0]["shopName"];
      $scope.defaultPltType = shops[0]["pltType"];
      $scope.shops = shops;
      // 发送ajax
      getCategories().then(function() {
        getChartData();
      })

    };
  }
]);
