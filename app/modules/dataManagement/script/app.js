/**
 *@project:ccms6.x
 *@author: duph
 * Created by on 14-8-21.
 */
window.root = '';

window.baseUrl = '/ccms/modules/dataManagement/view/';

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
      success: function() {
        obj.remove();
      }
    });
  }
}
window.DATA_STATIC = {
  tenantId: window.sessionStorage.getItem('tenantId')
};

var webApp = angular.module("dataManage.App", ["dataManage.controllers", "dataManage.directives", "dataManage.querydirectives", "dataManage.dataServices", "dmCommondirectives", "ui.shuyun", "angularFileUpload"])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    // abstract: true,

    $stateProvider.state('dataManagement.customerList', {
      url: "/customerList",
      templateUrl: baseUrl + "customerList.html"
    }).state('dataManagement.orderInfo', {
      url: "/orderInfo"
    }).state('dataManagement.orderInfo.history', {
      url: "/history",
      views: {
        "@dataManagement": {
          templateUrl: baseUrl + "history.html"
        }
      }
    }).state('dataManagement.customerServiceWorkbench', {
      url: "/customerServiceWorkbench",
      templateUrl: baseUrl + "customerServiceWorkbench.html"
    }).state('dataManagement.productLabel', {
      url: "/productLabel",
      templateUrl: baseUrl + "label/productLabel.html"
    }).state('dataManagement.wechat', {
      url: "/wechat",
      templateUrl: baseUrl + "wechat.html"
    }).state('dataManagement.wechatManagement', {
      url: "/wechatManagement",
      templateUrl: baseUrl + "wechatManagement.html"
    }).state('dataManagement.rfmTarget', {
      url: "/rfmTarget",
      templateUrl: baseUrl + "rfmTarget.html"
    }).state('dataManagement.customAttribute', {
      url: "/customAttribute",
      templateUrl: baseUrl + "customAttribute.html"
    }).state('dataManagement.customDataImport', {
      url: "/customDataImport",
      templateUrl: baseUrl + "customDataImport.html"
    }).state('dataManagement.redList', {
      url: "/redList",
      templateUrl: baseUrl + "redList.html"
    }).state('dataManagement.blacklist', {
      url: "/blacklist"
    }).state('dataManagement.blacklist.customBlackList', {
      url: "/customBlackList",
      views: {
        "@dataManagement": {
          templateUrl: baseUrl + "customBlackList.html"
        }
      }
    }).state('dataManagement.blacklist.phoneBlackList', {
      url: "/phoneBlackList",
      views: {
        "@dataManagement": {
          templateUrl: baseUrl + "phoneBlackList.html"
        }
      }
    }).state('dataManagement.blacklist.mailBlackList', {
      url: "/mailBlackList",
      views: {
        "@dataManagement": {
          templateUrl: baseUrl + "mailBlackList.html"
        }
      }
    }).state('dataManagement.iframe', {
      url: "/view/iframe/{moduleUrl}",
      templateUrl: baseUrl + "iframe.html"
    }).state('dataManagement.customerInfoTable', {
      url: "/customerInfoTable/{userId}",
      templateUrl: baseUrl + "customerInfoTable.html"
    })
  }]);

webApp.controller("dataManagementMainCtrl", ["$state", "$scope", "$http", "$location", "$rootScope", "$injector", "getGlobalPlatIdServer", "$resource",
  function($state, $scope, $http, $location, $rootScope, $injector, getGlobalPlatIdServer, $resource) {

    $scope.menusOptions = {
      unfold: true,
      shops: false,
      menusResource: $resource(GLOBAL_STATIC.portalRoot + 'module/' + DATA_STATIC.tenantId + '/dataManagement')
    };

    /*end*/

    /*
     * 共用调取淘宝平台id方法
     */
    //getGlobalPlatIdServer.getTaobaoPlatId(function(response) {
    //  $rootScope.taobaoSegmentationId = response.segmentationId || "";
    //});

    // 定义变量，页面跳转使用
    $scope.appOrigin = location.protocol + "//" + location.host; // 获取绝对路径http

    $scope.afterLoadCont = function() {
      $scope.tmlLoaded = true;
    };

    /*是否加载侧栏 start*/
    $scope.hasSideMenu = function() {
      var regUrl = /modules\/([a-z_0-9]*)\/index.html/ig;
      $rootScope.subNavAry = [];
      var path = regUrl.exec(location.pathname)[1]; //xxx
      $http.get(GLOBAL_STATIC.portalRoot + "module/" + path).success(function(data) {
        angular.forEach(data.children, function(n) {
          //if(/R/.test(n.supportOps)){//R为可读
          $rootScope.subNavAry.push(n);
          //}
        });
        if ($rootScope.subNavAry.length > 0) {
          $scope.navUrl = GLOBAL_STATIC.rootModule + "/modules/leftmenu/nav.html";
        } else {
          $scope.navUrl = "";
        }
        ;
        $scope.delaySidebarLoad()
      });
    };
    // $scope.hasSideMenu();
    /*是否加载侧栏 end*/

    //监听location改变pageUrl
    $scope.delaySidebarLoad = function() {
      $scope.$watch(function() {
        return $location.path()
      }, function(path) {
        if (path) {
          var curPagrUrl = path.substring(1);
          curPagrUrl = curPagrUrl.replace(/\/modify.*/, '/addAccount');
          if (path.indexOf("iframe") == -1) { // 正常模板
            $scope.pageUrl = curPagrUrl + ".html?_=" + new Date().getTime();
          } else { //嵌入模板
            $scope.pageUrl = "view/iframe.html?_=" + new Date().getTime();
            var matchUrl = "";
            eachBreakstatus:
              for (var i = 0; i < $rootScope.subNavAry.length; i++) {
                if ($rootScope.subNavAry[i].url && ($rootScope.subNavAry[i].url).indexOf(path) != -1) {
                  matchUrl = $rootScope.subNavAry[i].dataUrl;
                  break;
                } else {
                  for (var j = 0; j < $rootScope.subNavAry[i].children.length; j++) {
                    if (($rootScope.subNavAry[i].children[j].url).indexOf(path) != -1) {
                      matchUrl = $rootScope.subNavAry[i].children[j].dataUrl;
                      break eachBreakstatus;
                    }
                  }
                }
              }
            ;
            $rootScope.iframeSrc = matchUrl;
          }
        }
      });
    }
    if ($state.current.name === "dataManagement") {
      $state.go("dataManagement.customerList");  // 跳转到客户信息页面
    }
  }
]);

webApp.directive({
  ngAddsubcurrent: function() {
    return function(scope, element, attr) { //首次加载添加二级导航样式
      scope.$watch(function() {
        return element.attr('href')
      }, function(href) {
        if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
          element.addClass('sbCurrent');
        }
      });
    }
  },
  ngAddsubcur: function() {
    return function(scope, element, attr) {
      scope.$watch(function() {
        return element.attr('href')
      }, function(href) {
        if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
          var _parent = element.parents('li');
          _parent.find('>a').addClass('sbCurrent');
          _parent.find('dl').show();
          element.addClass('sbSmallCur');
        }
      });
    }
  },
  getRoot: function() {
    return function(scope, element) {
      loadScrip(element);
    }
  }
});
