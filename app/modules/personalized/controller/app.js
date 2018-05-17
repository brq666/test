/**
 * Created by shuyun on 2015/3/26.
 */
function loadScrip(obj) {
  if (obj.attr('_href')) {
    obj.attr('href', root + obj.attr('_href'));
  }
  if (obj.attr('_src')) {
    $.ajax({
      url: root + obj.attr('_src'),
      dataType: 'script',
      async: false,
      cache: obj.attr('cache') ? true : false,
      success: function () {
        obj.remove();
      }
    });
  }
}
$.fn.extend({
  live: function (types, data, fn) {
    jQuery(this.context).on(types, this.selector, data, fn);
    return this;
  },
  die: function (types, fn) {
    jQuery(this.context).off(types, this.selector || "**", fn);
    return this;
  }
});
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,
    //月份
    "d+": this.getDate(),
    //日
    "h+": this.getHours(),
    //小时
    "m+": this.getMinutes(),
    //分
    "s+": this.getSeconds(),
    //秒
    "q+": Math.floor((this.getMonth() + 3) / 3),
    //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

var webApp = angular.module('personalizedPackage', ['ui.router', 'ngSanitize', 'dx', 'http-auth-interceptor', 'bushu', 'peizhi', 'jiankong']);
webApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    var interceptor = ['$rootScope', '$q',
      function (scope, $q) {

        function success(response) {
          return response;
        }

        function error(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(); //解决保存按钮可点击
          var status = response.status;
          if (status == 401) {
            location.pathname = rootModule + "/modules/login/index.html";
            return;
          }
          if (status == 404) {
            $(this).Confirm({
              "title": "错误提示",
              "str": "当前页面出现错误，请刷新页面",
              "mark": true,
              "eleZindex": 1010,
              "markZindex": 1005
            }, function () {
              window.location.reload();
            });
            return;
          }
          // otherwise
          return $q.reject(response);

        }

        return function (promise) {
          return promise.then(success, error);
        }

      }];
    $httpProvider.responseInterceptors.push(interceptor);

    //    $httpProvider.defaults.transformRequest = function (data) {
    //        if (data === undefined) {
    //            return data;
    //        }
    //        return $.param(data);
    //    }
    $urlRouterProvider.when('', '/bushu');

    $stateProvider.state('bushu', {
      url: "/bushu",
      views: {
        "content": {
          templateUrl: "view/subIndex.html",
          controller: "bushuCtrl"
        }
      }
    }).state('peizhi', {
      url: "/peizhi/:planIndex",
      views: {
        "content": {
          templateUrl: "view/deploy.html",
          controller: "peizhiCtrl"
        }
      }
    }).state('jiankong', {
      url: "/jiankong",
      views: {
        "content": {
          templateUrl: "view/statuses.html",
          controller: "jiankongCtrl"
        }
      }
    })
  }
]);
webApp.controller('mainCtrl', ['$scope', '$http', '$rootScope', '$timeout',
  function ($scope, $http, $rootScope) {

    $scope.headerUrl = root + "/app/modules/header/menu.html";

    /*是否加载侧栏 start*/
    $scope.hasSideMenu = function () {
      var regUrl = /modules\/([a-z_0-9]*)\/index.html/ig;
      $rootScope.subNavAry = [];
      var path = regUrl.exec(location.pathname)[1]; //xxx
      $http.get(rootStatic + "module/" + path).success(function (data) {
        angular.forEach(data.children,
          function (n) {
            //if(/R/.test(n.supportOps)){//R为可读
            $rootScope.subNavAry.push(n);
            //}
          });
        if ($rootScope.subNavAry.length > 0) {
          $scope.navUrl = root + "/app/modules/leftmenu/nav.html";
        } else {
          $scope.navUrl = "";
        }
      });
    };
    $scope.hasSideMenu();

    $scope.menuIndex = 0;
    $scope.shops = [];
    $scope.currentShopId = 0;//当前店铺ID
    $scope.currentPlanGroupId = 0;//当前方案组ID

    $scope.$on('childCtrlInitComplete', function () {
      //根据租户ID获取店铺List
      $http.get(rootStatic + "web-component/shop/selector/" + CAMPAIGN_STATIC.tenantId + "?segmentationId=1&_=" + new Date().getTime()).success(function (data) {
        if (data.length > 0) {
          $scope.shops = data;
          $scope.shops.push({name:"数云小产品",idInPlat:"101854160"});
          if($scope.currentShopId == 0){
            $scope.currentShopId = $scope.shops[0].idInPlat;
          }
          $rootScope.$broadcast("getShopListReady", $scope.currentShopId);
        }
      });
    });
  }
]);
