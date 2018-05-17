(function(angular, window, undefined, webApp) {
  'use strict';

  webApp
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-with'];
    }])
    .service('headerService', ['$rootScope', '$http',  '$q', function headerService($rootScope, $http, $q) {

    this.checkVisit = function(param, cb, eb) {
      var url = rootStatic + "web-portal/visits"
      $http.post(url, param).success(cb).error(eb);
    }

    this.checkLogin = function(param, cb, eb) {
      var s = location.toString();
      var i = s.lastIndexOf('?');
      var url = rootStatic + 'web-portal/credentials';
      $http.get(url).success(cb).error(eb);
    };

    this.logOut = function(param, cb, eb) {
      var url = rootStatic + "web-portal/loginOut";
      $http.delete(url).success(cb).error(eb);
    };

    this.getShopInfo = function(param, cb, eb) {
      // 注入4个回调函数,触发ajax请求
      $rootScope.ShopInfoList = $rootScope.ShopInfoList || [];
      $rootScope.ShopInfoList.push(cb);
      var url = GLOBAL_STATIC.dashboardRoot + "web-dashboard/dashboard/assemble/shopinfo/?_=" + new Date().getTime();
      $rootScope.ShopInfoList.isAjax = $rootScope.ShopInfoList.isAjax || !~window.location.pathname.indexOf('modules/dashboard'); //首页立即触发ajax

      if($rootScope.ShopInfoList.isAjax || $rootScope.ShopInfoList.length === 4) {
        $rootScope.ShopInfoList.isAjax = false;
        $http.get(url).success(function(data, status, headers, config) {

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
    this.getNumber = function(param, cb, eb) {
      var url = rootStatic + "web-common-component/node/edm/cb-service/messages/count/?_=" + new Date().getTime();
      $http.get(url).success(cb).error(eb);
    };

    this.getNoticesList = function(param, cb, eb) {
      var userName = param.userName;
      var ccmsVersion = param.ccmsVersion;
      var pageNo = param.pageNo;
      var timestamp = new Date().getTime();
      var pageSize = param.pageSize || 10;
      var url = rootStatic + 'web-portal/notifications/' + userName + '/' + ccmsVersion + '/notices' + '?timestamp=' + timestamp + '&pageSize=' + pageSize + '&pageNo=' + pageNo;
      $http.get(url).success(cb).error(eb);
    };

    this.getStatus = function(param, cb, eb) {
      var _this = this;
      var userName = param.userName;
      var ccmsVersion = param.ccmsVersion;
      var timestamp = new Date().getTime();
      var url = rootStatic + 'web-portal/notifications/' + userName + '/' + ccmsVersion + '/notices/status';
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
        'optName': campUserName
      };
      var url = rootStatic + 'web-portal/notifications/' + userName + '/' + ccmsVersion + '/notices/' + id;
      $http.post(url, {
        'data': data,
        'headers': {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    };

    this.deleteNotices = function(param, cb, eb) {
      var _this = this;
      var userName = param.userName;
      var ccmsVersion = param.setId;
      var ids = param.ids;
      var timestamp = new Date().getTime();
      var url = rootStatic + 'web-portal/notifications/' + userName + '/' + ccmsVersion + '/notices/delete';
      var data = {
        'noticeId': ids,
        'setId': ccmsVersion,
        'userName': CAMPAIGN_STATIC.tenantId,
        'optName': campUserName
      };
      $http.post(url, {
        'data': data,
        'headers': {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).success(cb).error(eb);
    };
  }]);
})(angular, window, undefined, webApp);
