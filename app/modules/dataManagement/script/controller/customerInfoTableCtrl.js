
angular.module("dataManage.controllers").controller('CustomerInfoCtrl', ["$scope", '$stateParams', "ngCustomInfoService",'$compile','$timeout',
  function($scope,$stateParams,ngCustomInfoService,$compile,$timeout) {
    // 获取的id
    console.log(this);
    $scope.userId = (DATA_STATIC.tenantId === 'edecathlon' ? this._ID : this.id) || '';
    $scope.hdValue = "";
    $scope.customerInfo = {
        "contact_id": "",
        "firstname": "",
        "lastname": "",
        "gender": "",
        "civility": "",
        "birthdate": "",
        "city": "",
        "province": "",
        "home_country": "",
        "address": "",
        "email": "",
        "mobile": "",
        "wechat_id": "",
        "usual_store_id": "",
        "usual_store_number": "",
        "usual_store_country": "",
        "usual_store_name": "",
        "in_seed_list": "",
        "optin": "",
        "in_white_zone": "",
        "loyalty_status": "",
        "loyalty_status_update_date": "",
        "loyalty_card_number": "",
        "loyalty_card_type": "",
        "point_balance": "",
        "subscription_method": ""
    };
    $scope.totalActivity = {
    	"smscount": 0,
    	"wxcount": 0,
    	"edmcount": 0,
    	"totalcount": 0,
    	"totalsuccesscount": 0,
    	"smssuccessmcount": 0,
    	"wxsuccessmcount": 0,
    	"edsuccessmcount": 0
    };
    $scope.getCustomerInfo = function() { //初始化请求
    	ngCustomInfoService.getCustomerInfo(function(response) {
    		$scope.customerInfo = response.content;
     },$scope.userId);
    };
    $scope.getTotalActivity = function() { //初始化请求
    	ngCustomInfoService.getTotalActivity(function(response) {
        var data=response.content;
    		$scope.totalActivity.smscount = data.smscount;
    		$scope.totalActivity.wxcount = data.wxcount;
    		$scope.totalActivity.edmcount = data.edmcount;
    		$scope.totalActivity.totalcount = data.totalcount;
    		$scope.totalActivity.totalsuccesscount = data.totalsuccesscount;
    		$scope.totalActivity.smssuccessmcount = data.smssuccessmcount;
    		$scope.totalActivity.wxsuccessmcount = data.wxsuccessmcount;
    		$scope.totalActivity.edsuccessmcount = data.edsuccessmcount;
     },$scope.userId);
    };    

    $scope.getListData = function(){
      $('#attrListsGrid').flexigrid({ //属性列表grid
        url: GLOBAL_STATIC.decathlonRoot + 'decathlon/custv/getActivities',
        method: 'GET',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        colModel: [{
          display: 'Time',
          name: 'time',
          width: 2,
          sortable: false,
          dataindex: 'time'
        },{
          display: 'Channel',
          name: 'channel',
          width: 1,
          sortable: false,
          dataindex: 'channel'
        },{
          display: 'Status',
          name: 'status',
          width: 1,
          sortable: false,
          dataindex: 'status'
        },{
          display: 'Campaign ID',
          name: 'campaign_id',
          width: 1,
          sortable: false,
          dataindex: 'campaign_id'
        },{
          display: 'Campaign Name',
          name: 'campaign_name',
          width: 1,
          sortable: false,
          dataindex: 'campaign_name'
        },{
          display: 'Node ID',
          name: 'node_id',
          width: 1,
          sortable: false,
          dataindex: 'node_id'
        },{
          display: 'Node Name',
          name: 'node_name',
          width: 1,
          sortable: false,
          dataindex: 'node_name'
        }],
        buttons: [],
        usepager: true,
        useRp: true,
        rp: 10,
        query:$scope.hdValue,
        params: [{
          "name": "user",
          "value": $scope.userId
        },{
          "name": "channelType",
          "value": ""
        }],
        hideOnSubmit: true,
        showTableToggleBtn: true,
        colAutoWidth: true,
        onSuccess: function(data,res) {
          // var scope = angular.element(document.querySelector('#attrListsGrid')).scope();
          // $compile(angular.element(".registerTable_flexgrid"))($scope || scope);
          // $scope.$apply();
        },
        onError: function(response) {
          var responseText = response.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });      
    }
    $scope.searchList = function(channelType,statusType){
      var curGridElement = angular.element("#attrListsGrid")[0];
      if(channelType) $scope.hdValue='';
      if(channelType=='all') channelType='';
      curGridElement.p.query = $scope.hdValue || '';
      curGridElement.p.params=[{
        "name": "user",
        "value": $scope.userId
      },{
        "name": "channelType",
        "value": channelType||'' 
      }];
      if(statusType){
        curGridElement.p.params.push({
          "name": "status",
          "value": statusType
        });
      };
      curGridElement.p.newp = 1;
      curGridElement.grid.populate();
    }
    //回车搜索
    $scope.enterSearch = function(e){
      var keycode = window.event ? e.keyCode : e.which;
      if(keycode==13){
        this.searchList();
      }
    }

    $scope.initPage = function(){
      $scope.getCustomerInfo();
      $scope.getTotalActivity();
    }

    $timeout(function(){
      $scope.getListData();
    },500);
}
]);