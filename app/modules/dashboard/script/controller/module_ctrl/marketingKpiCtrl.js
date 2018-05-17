/**
 * Created by dupenghui on 2014/10/21.
 */

angular.module("dashboard.controllers").controller('marketingKpiCtrl', ["$scope", "$http", "keepMessage",
  function($scope, $http, keepMessage) {
    $scope.viewModel = {}

    $scope.viewModel.temp = [{
      name: "昨天",
      value: 1
    },
    {
      name: "最近7天",
      value: 7
    },
    {
      name: "最近15天",
      value: 15
    },
    {
      name: "最近30天",
      value: 30
    }];

    $scope.viewModel.temp.index = 3

    var grid = {
      parms: {
        interval: 30
      },
      event: function() {
        $scope.setInterval = function(index) {
          $scope.viewModel.temp.index = index;
          this.parms.interval = $scope.viewModel.temp[index]["value"];
          keepMessage.setInterval($scope.viewModel.temp[index]["value"]);
          this.ajax()
        }.bind(this)
      },
      ajax: function() {
        $http({
          method: 'get',
          url: GLOBAL_STATIC.dashboardRoot + 'dashboard/campaignkpi/summary',
          params: this.parms
        }).success(function(data) {
          if (!data.returnTotalCash) {
            data.returnTotalCash = 0
          };
          if (!data.investmentTotalCash) {
            data.investmentTotalCash = 0
          };
          data.investmentTotalCash = data.investmentTotalCash * 1;
          data.returnTotalCash = data.returnTotalCash * 1

          data.marketCustomersNone = data.investmentCustomerNum - data.returnCustomerNum
          var create = data.created
          if (create) {
            create = new Date(create).toLocaleDateString().split("/").join("-")
          } else {
            create = "__"
          }
          $scope.viewModel.pie1Data = _.pick(data, "investmentCustomerNum", "returnCustomerNum", "roi");
          $scope.viewModel.pie1Data.created = create

          var pie1Data = _.pick(data, "marketCustomersNone", "returnCustomerNum");

          pie1Data = _.pairs(pie1Data);
          initPie1(pie1Data);
          var percent = (data.returnCustomerNum / data.investmentCustomerNum) * 100

          $scope.percent = Math.round(percent) + "%"
          if (!data.investmentTotalCash) {
            if (data.returnTotalCash != 0) {
              $scope.viewModel.columnRoi = "1 : _"
            } else {
              $scope.viewModel.columnRoi = "0 : 0.00"
            }
          } else {
            var columnRoi = data.returnTotalCash / data.investmentTotalCash;

            columnRoi = columnRoi.toFixed(2);
            $scope.viewModel.columnRoi = "1 : " + columnRoi
          }

          var column2Data = _.pick(data, "investmentTotalCash", "returnTotalCash");

          column2Data = _.pairs(column2Data);
          initColumn2(column2Data)

        }.bind(this))

        $http({
          method: 'get',
          url: GLOBAL_STATIC.dashboardRoot + 'dashboard/channel/send',
          params: this.parms
        }).success(function(data) {
          if (data.length == 0) {
            var pie3Data = null;
            $scope.viewModel.pileeLabels = {
              "短信": "_",
              "邮件": "_",
              "优惠券": "_",
              "定向优惠券": "_"
            }
          } else {
            var keys = _.pluck(data, 'type');
            var values = _.pluck(data, 'total');
            values = _.map(values, function(num) {
              return num * 1;
            });
            var pie3Data = _.object(keys, values);

            pie3Data = _.pick(pie3Data, "短信", "EDM", "优惠券", "定向优惠");
            var temp = {}
            for (var i in pie3Data) {
              if (i == "EDM") {
                var key = "邮件"
              } else {
                key = i
              }
              temp[key] = pie3Data[i]
            }
            pie3Data = temp;
            $scope.viewModel.pileeLabels = pie3Data

            var sum = 0
            for (var i in pie3Data) {
              sum = sum + pie3Data[i]
            }
            pie3Data = _.pairs(pie3Data);
            if (sum == 0) {
              pie3Data = null
            }
          }

          initPie3(pie3Data)
        }.bind(this))
      }
    }
    grid.event();
    grid.ajax();

    function initPie1(data) {
      if (!data) {
        data = [['none', 1]]
        var colors = ["#BCBCBC"]
      } else {
        var colors = ['#fff5e0', '#ffcc63']
      }
      var perSon = parseFloat(data[1][1]).toLocaleString() + "人次"
      if ($scope.viewModel.pie1Data.investmentCustomerNum == 0) {
        var percent = 0 + "%";
        data = [['none', 1]]
        var colors = ["#BCBCBC"]
      } else {
        var percent = ($scope.viewModel.pie1Data.returnCustomerNum / $scope.viewModel.pie1Data.investmentCustomerNum) * 100;
        percent = percent.toFixed(2) + "%";
      }

      $('#pie1').highcharts({
        colors: colors,
        credits: {
          text: '',
          href: ''
        },
        chart: {
          type: 'pie',
          margin: 0
        },
        title: {
          zIndex: -100,
          text: '<div style="color: #979797;font-size:12px">成功营销</div> ' + '<div style="font-size: 15px;color:#ff8600;margin: 5px 0px">' + perSon + '</div>' + '  <div style="font-size: 14px;color: #606060">' + percent + '</div> ',
          floating: true,
          useHTML: true,
          y: 58
        },
        subtitle: {
          /*     floating:true,*/

          text: ''

        },
        tooltip: {
          hideDelay: 100,
          zIndex: 1000,
          /*enabled:false,*/
          width: 100,
          /*        borderWidth:0,*/
          style: {

            padding: " 1px"
          },
          useHTML: true,
          formatter: function() {
            switch (this.key) {
              /*   case "marketCustomersNone":
               var s= false
               break;*/
              default:
                var s = '<div style="width: 200px;height:auto;white-space: normal;overflow: auto;padding: 5px 4px">营销后7天内（包括营销当天）有成功下单并付款的客户数量，如果客户一天内多次下单，记为成功营销1人。</div>'
            }
            return s;
          }
        },
        plotOptions: {
          pie: {
            animation: true,
            allowPointSelect: true,
            innerSize: "75%",
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: false
          }
        },
        series: [{
          data: data
        }]
      })

    };

    function initColumn2(data) {
      if (!data) {
        data = [['none', 1]]
        var colors = ["#BCBCBC"]
      } else {
        var colors = ['#3BA2BA', '#FFCC63']
      }
      $('#column2').highcharts({
        colors: ['#3BA2BA', '#FFCC63'],
        credits: {
          text: '',
          href: ''
        },
        title: {
          text: ' ',

          /*        useHTML: true,*/
          y: 25,
          style: {
            fontSize: 14
          }
        },
        subtitle: {
          text: ''
        },

        chart: {
          /* height: 190,*/
          type: 'column'
        },
        yAxis: {
          min: 0,
          gridLineWidth: 0,
          labels: {
            /*   align: 'left',
             x: 5,
             y: -2,*/
            enabled: false
          },
          allowDecimals: false,
          title: {
            text: ''
          }
        },
        xAxis: {
          labels: {
            style: {
              color: '#B1B1B1'
            }
          },
          categories: ["营销成本(元)", "营销收益(元)"]
        },
        tooltip: {
          hideDelay: 100,
          useHTML: true,
          formatter: function() {
            if (this.x == "营销成本(元)") {
              var s = "<div style='width: 200px;height:auto;white-space: normal;overflow: auto'>统计选定时间范围内使用主动营销功能产生的营销成本，每条短信按5分计费，每条EDM按1分计费。</div>"
            }
            if (this.x == "营销收益(元)") {
              var s = "<div style='width: 200px;height:auto;white-space: normal;overflow: auto'>统计选定时间范围内通过主动营销功能发送过短信、EDM、优惠券、定向优惠并在发送后7天（包括发送当天）内成功下单并付款的订单汇总金额。</div>"
            }
            /*       s = this.x +':<b>'+ this.y +'</b><br>';*/
            return s;
          }
        },
        plotOptions: {
          column: {
            pointWidth: 30,
            dataLabels: {
              formatter: function() {
                return parseFloat(this.y).toLocaleString()
              },
              enabled: true //是否显示数据标签
            }
          },
          series: {
            colorByPoint: true
          },

          showInLegend: false

        },
        series: [{
          data: data,
          showInLegend: false
        }]
      });

    }
    function initPie3(data) {
      if (!data) {
        data = [['none', 1]]
        var colors = ["#BCBCBC"]
      } else {
        var colors = ['#3BA2BA', '#73D4C5', '#F18202', '#FFCC63']
      }
      $('#pie3').highcharts({
        colors: colors,
        credits: {
          text: '',
          href: ''
        },
        chart: {
          /*     width:190,
           height: 190,*/
          type: 'pie',
          margin: [0, 0, 0, 0]
        },
        tooltip: {
          formatter: function() {
            if (this.key == "none") {
              return false
            } else {
              var temp = {
                "messagNum": "短信发送",
                "emailNum": "邮件发送",
                "couponNum": "优惠劵发送",
                "directionalCoupon": "定向优惠劵发送"
              }
              var s = '<span>' + this.key + '</span>:' + this.y;
            }

            return s;
          },
          shared: true
        },

        title: {
          text: '  '
        },
        subtitle: {
          text: ''
        },

        plotOptions: {
          pie: {
            allowPointSelect: true,
            innerSize: "85%",
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },

            /*     showInLegend: true,*/
            point: {

            }
          }
        },
        series: [{
          type: 'pie',

          data: data
        }]
      });
    }
  }
]);
