/**
 * Created by dupenghui on 2014/11/20.
 */

angular.module("dashboard.controllers").controller('topCtrl', ["$scope", "$http", "keepMessage", "$location",
  function($scope, $http, keepMessage, $location) {
    $scope.mm = 1;
    $scope.perFlag=true;
    $scope.data = [
      {
        id: 1,
        text: "按营销客人数排序"
      },
      {
        id: 2,
        text: "按营销成功人数排序"
      },
      {
        id: 3,
        text: "按成功率排序"
      },
      {
        id: 4,
        text: "按营销成本排序"
      },
      {
        id: 5,
        text: "按营销收益排序"
      },
      {
        id: 6,
        text: "按ROI排序"
      }
    ];
    $scope.keepMessage = keepMessage;
    $scope.$watch("keepMessage.interVal", function(a, b) {
      top.parm.interval = a;
      top.ajax()
    })
    var top = {
      parm: {
        type: $scope.mm
      },
      event: function() {
        $scope.changeSelect = function(type) {
          this.parm.type = type;
          this.ajax()
        }.bind(this);
        $scope.toMarketing = function(campaignName, workflowId, campaignId) {
         var menuData=JSON.parse(sessionStorage.getItem("shuyunSessionMenu"));
         angular.forEach(menuData.menuData,function(value,key){
            if(value.id=="nav/link_marketing"){
               $scope.perFlag=true;
            }
         })
        if($scope.perFlag){
        var parm = {
            campaignName: campaignName,
            workflowId: workflowId,
            campaignId: campaignId
         }
         parm = JSON.stringify(parm);
         window.sessionStorage.setItem("marketParm", parm);
         location.replace($scope.appOrigin + '/portal/index.html#/campagin/marketActivity');
        }

        }
      },
      ajax: function() {
        $scope.ajaxDone = false;
        $http({
          method: 'get',
          url: GLOBAL_STATIC.dashboardRoot + "dashboard/top/rank?_=" + new Date().getTime(),
          params: this.parm
        }).success(function(data) {
          $scope.ajaxDone = true;
          $scope.viewModel.topList = data
        }.bind(this))
      },
      init: function() {
        $scope.viewModel = {}
        $scope.viewModel.topList = [];
        this.event()
        /*    this.ajax()*/
      }
    }
    top.init()
  }
])
