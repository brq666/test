// JavaScript Document
angular.module("dashboard.controllers").controller('fastEnterController', ["$scope", "$filter", "$http", "$window", "$location", "$element",
  function($scope, $filter, $http, $window, $location, $element) {
    //TODO
    // A4 中止
    // B1 设计时预执行
    // B2 待审批时预执行
    //图标信息map
    //"WAIT_ME_DESIGN":10,//等待我设计的
    //"WAIT_ME_APPROVE":1,//等待我审批的
    //"VISABLE_EXECUTING":10,//我可见的执行中的活动数量
    //"VISABLE_WAIT_EXECUTE":0,//我可见的等待执行的活动数量
    //"VISABLE_ERROR":0//我可见的出错的活动数量
    // var enterMap = {
    // 	A1: {title:'我设计中的活动', src:'', count:0,title:"您有设计中的活动XXX个，点击查看"},
    // 	B3:{title:'正在执行的活动', src:'' ,count:0,title:"系统有正在执行的活动XXX个，点击查看"},
    // 	A5:{title:'执行完成的活动', src:'', count:0,title:"系统有执行完成的活动XXX个，点击查看"},
    // 	A6:{title:'执行出错的活动', src:'', count:0,title:"近3天系统有执行出错的活动XXX个，点击查看"},
    // 	A2:{title:'待我审批的活动', src:'', count:0},
    // 	A3:{title:'待执行的活动', src:'', count:0}
    // };
    //请求快捷入口的各个活动
    $http.get(GLOBAL_STATIC.campaignRoot + 'campaign/status/statistics').success(getActivityCount).error(serverFail);

    $scope.counts = null;
    $scope.permis=false;

    //获取各个活动信息
    function getActivityCount(data) {
      $scope.counts = data;
    }

    function serverFail(data) {
      $scope.counts = [];
    };

    $scope.goMarketing = function(querys) {
    var menuData=JSON.parse(sessionStorage.getItem("shuyunSessionMenu"));
    angular.forEach(menuData.menuData,function(value,key){
      if(value.id=="nav/link_marketing"){
         $scope.permis=true;
      }
    })
    	if($scope.permis) {
    		location.replace($scope.appOrigin + '/portal/index.html#/campagin/marketActivity?' + querys);
    	}
    }
  }
]);
