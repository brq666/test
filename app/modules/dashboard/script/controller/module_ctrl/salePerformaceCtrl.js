/**
 * Created by dupenghui on 2014/10/20.
 */
angular.module("dashboard.controllers").controller('salePerformaceCtrl', ["$scope", "$http", "dashboardService",
  function($scope, $http, dashboardService) {
    $scope.viewModel = {}
    $scope.interval = 30

    var Grid = {
      parms: {
        interval: $scope.interval,
        shopId: $scope.viewModel.shopId
      },
      init: function() {
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
        }
        ];

        $scope.viewModel.temp.index = 3;
        dashboardService.getShopInfo({}, this.getShopList);
        this.event()
      },
      event: function() {
        $scope.setInterval = function(index) {
          if (this.loading) {
            return false
          }
          $scope.sucessDone = false
          var temp = {
            totalFee: "",
            crmFee: "",
            roi: "_"
          }
          $scope.viewModel.salesKpi = _.extend($scope.viewModel.salesKpi, temp);
          $scope.viewModel.temp.index = index;
          this.parms.interval = $scope.viewModel.temp[index]["value"];
          this.ajax()

        }.bind(this);

        $scope.changeShopId = function($index) {
          if (this.loading) {
            return false
          }
          $scope.sucessDone = false
          var temp = {
            totalFee: "",
            crmFee: "",
            roi: "_"
          }
          $scope.viewModel.salesKpi = _.extend($scope.viewModel.salesKpi, temp);
          $scope.hideSelect = true;
          $scope.viewModel.shopName = $scope.viewModel.shops[$index]["shopName"];
          $scope.viewModel.pltType = $scope.viewModel.shops[$index]["pltType"];
          this.parms.shopId = $scope.viewModel.shops[$index]["shopId"];
          this.ajax()
        }.bind(this)
      },
      getShopList: function(data) {
          Grid.parms.shopId = $scope.viewModel.shopId = data.shop[0]["shopId"];
          $scope.viewModel.shopName = data.shop[0]["shopName"];
          $scope.viewModel.pltType = data.shop[0]["pltType"];
          $scope.viewModel.shops = data.shop;
          Grid.ajax();
      },
      ajax: function() {
        this.loading = true;
        $http({
          method: 'get',
          url: GLOBAL_STATIC.dashboardRoot + 'dashboard/crm/kpi',
          timeout: 3000,
          params: this.parms
        }).success(function(data, status, headers, config) {
          this.loading = false
          if (data.created) {
            var created = data.created
            var create = new Date(created).toLocaleDateString().split("/").join("-");
            data.created = create
          } else {
            data.created = "__"
          }

          $scope.sucessDone = true;
          $scope.viewModel.salesKpi = data

          if (!data.totalFee || 0) {
            $scope.viewModel.Roi = "0.00%"
          }
          if (!Math.round(data.totalFee * 1)) {
            $scope.viewModel.Roi = "0.00%"
          } else {
            var Roi = Math.round(data.crmFee * 1 || 0) / Math.round(data.totalFee * 1);
            Roi = Roi * 100;
            Roi = Roi.toFixed(2) + "%"

            $scope.viewModel.Roi = Roi
          }

        }.bind(this)).error(function(data, status, headers, config) {
          this.loading = false;
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }.bind(this));
      }
    }

    Grid.init()
  }
]);
