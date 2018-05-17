/**
 * Created by dupenghui on 2014/11/25.
 */

/*    var keepMessage=require("service/module_ctrl/keepMesage")*/
var dashboardServices = angular.module('dashboard.services', []);
dashboardServices.factory("keepMessage", [function() {
  return {
    setInterval: function(parm) {
      this.interVal = parm
    },
    interVal: 30
  }
}]).service('dashboardService', ['$rootScope', '$http',  '$q', function headerService($rootScope, $http, $q) {
  $rootScope.shopInfoDefer = $q.defer();
  this.getShopInfo = function(param, cb, eb) {
    // 注入4个回调函数,触发ajax请求
    $rootScope.ShopData =  $rootScope.ShopData || null;
    var url = GLOBAL_STATIC.dashboardRoot + "dashboard/assemble/shopinfo/?_=" + new Date().getTime();
    if($rootScope.ShopData) {
      cb($rootScope.ShopData);
      return false;
    };
    $rootScope.ShopInfoList = $rootScope.ShopInfoList || [];
    $rootScope.ShopInfoList.push(cb);
    if($rootScope.ShopInfoList.length === 1) {
      $http.get(url).success(function(data, status, headers, config) {
        $rootScope.shopInfoDefer.resolve();
        $rootScope.ccmsVersion = data.version_code;
        $rootScope.ShopData = data;
        angular.forEach($rootScope.ShopInfoList, function(fn, index) {
          fn(data);
        });

      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": data.message || '出错',
          "str": data.description || '',
          "mark": true
        });
      });
    }
  };

  this.getNoticesList = function(param, cb, eb) {
    var userName = param.userName;
    var ccmsVersion = param.ccmsVersion;
    var pageNo = param.pageNo;
    var timestamp = new Date().getTime();
    var pageSize = param.pageSize || 10;
    var url = GLOBAL_STATIC.portalRoot + 'notification/notice?timestamp=' + timestamp + '&pageSize=' + pageSize + '&pageNo=' + pageNo + '&setId=' + ccmsVersion + '&userName=' + userName;
    $http.get(url).success(cb).error(eb);
  };

  this.getStatus = function(param, cb, eb) {
    var _this = this;
    var userName = param.userName;
    var ccmsVersion = param.ccmsVersion;
    var timestamp = new Date().getTime();
    var url = GLOBAL_STATIC.portalRoot + 'notifications/' + userName + '/' + ccmsVersion + '/notices/status';
    $http.get(url).success(cb).error(eb);
  };

  this.postNotice = function(param, cb, eb) {
    var _this = this;
    var userName = param.userName;
    var ccmsVersion = param.ccmsVersion;
    var id = param.id;
    var timestamp = new Date().getTime();
    var data = {
      'noticeId': id,
      'optName': DASHBOARD_STATIC.campUserName
    };
    var url = GLOBAL_STATIC.portalRoot + 'notifications/' + userName + '/' + ccmsVersion + '/notices/' + id;
    $http.post(url, {
      'data': data,
      'headers': {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  };
}]);
