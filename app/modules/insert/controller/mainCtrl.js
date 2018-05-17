function loadScrip(obj) {
  if (obj.attr('_href')) {
    obj.attr('href', root + obj.attr('_href'));
  }
  if (obj.attr('_src')) {
    $.ajax({
      url: root + obj.attr('_src'),
      dataType: 'script',
      async: false,
      cache: obj.attr('cache') ? true: false,
      success: function() {
        obj.remove();
      }
    });
  }
}
var webApp = angular.module("ccmsApp", ["ngRoute", "http-auth-interceptor"], ['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    var interceptor = ['$rootScope', '$q',
      function(scope, $q) {

        function success(response) {
          return response;
        }

        function error(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(); //解决保存按钮可点击
          var status = response.status;
          if (status == 404) {
            $(this).Confirm({
              "title": "错误提示",
              "str": "当前页面出现错误，请刷新页面",
              "mark": true,
              "eleZindex": 1010,
              "markZindex": 1005
            }, function() {
              window.location.reload();
            });
            return $q.reject(response);
          }

          // 权限错误
          if (status == 403) {
            $(this).Alert({
              "title": "提示",
              "str": "您没有操作当前功能的权限，请联系系统管理员",
              "mark": true
            });
            return {};
          }

          // 错误提示title
          switch(status) {
            case 500:
              window.httpTitle = '未知错误';
              break;
            case 405:
              window.httpTitle = '操作失败';
              break;
            case 400:
              window.httpTitle = '提示';
              break;
          }
          // otherwise
          return $q.reject(response);
        }

        return function(promise) {
          return promise.then(success, error);
        }
      }];
    $httpProvider.responseInterceptors.push(interceptor);
  }]);
webApp.controller("mainCtrl", ['$scope', '$http', '$location', '$rootScope',
  function($scope, $http, $location, $rootScope) {

    /*angualr http权限验证
     *发送http若为401，则说明验证不通过，跳回登入页
     */
    $scope.$on('event:auth-loginRequired', function(s, datas) { // 权限失败
      location.replace(rootModule + "/modules/login/index.html");
    });

    $scope.$on('event:auth-loginConfirmed', function() { //权限成功
      //doing
    });

    /*end*/
    $scope.afterLoadCont = function() {
      $scope.tmlLoaded = true;
    };

    $scope.headerUrl = rootModule + "/modules/header/menu.html";

    /*首次加载头部保存数据 做iframe映射判断 start*/
    $http({
      method: 'POST',
      url: rootStatic + "web-portal/visits/?_=" + new Date().getTime(),
      data: {tenantId: CAMPAIGN_STATIC.tenantId}
    }).success(function(data) {
      $rootScope.defaultMuneData = data.children;
      $scope.hasSideMenu();
    })
    /*首次加载头部保存数据 做iframe映射判断 end*/

    /*是否加载侧栏 start*/
    $scope.hasSideMenu = function() {
      var pathHash = $location.path().substring(1); //xxx
      $rootScope.subNavAry = [];
      var navSign = (pathHash.indexOf("/") == -1) ? pathHash: pathHash.substring(pathHash, pathHash.indexOf("/"));
      $http.get(rootStatic + "web-portal/module/" + navSign).success(function(data) {
        angular.forEach(data.children, function(n) {
          //if(/R/.test(n.supportOps)){//R为可读
          $rootScope.subNavAry.push(n);
          //}
        });
        if ($rootScope.subNavAry.length > 0) {
          $scope.navUrl = rootModule + "/modules/leftmenu/nav.html";
          $scope.iFrameLayoutClass = true;
        } else {
          $scope.navUrl = "";
          $scope.iFrameLayoutClass = false;
        }
        $scope.delayWatch();
      });
    };
    /*是否加载侧栏 end*/

    //监听location改变pageUrl
    $scope.delayWatch = function() {
      $scope.$watch(function() {
        return $location.path()
      }, function(path) {
        if (path) {
          /*
           * 1、数据中有dataUrl,走iframe嵌入模板
           * 2、数据中无dataUrl，走正常的本地模板加载
           */
          $rootScope.iframeSrc = $scope.getIframeSrc(path, $rootScope.subNavAry, $rootScope.defaultMuneData) || "";
          if ($rootScope.iframeSrc || !resertTemplateClickFlag) { // resertTemplateClickFlag 是否嵌入模板之间相互切换
            $scope.pageUrl = rootModule + "/modules/insert/view/iframe.html";
          } else {
            var curPagrUrl = path.substring(1);
            curPagrUrl = curPagrUrl.replace(/\/modify.*/, '/addAccount');
            $scope.pageUrl = curPagrUrl + ".html?_=" + new Date().getTime();
          }
        }
      });
    };

    //处理获取iframe的src
    $scope.getIframeSrc = function(locationPath, matchDataOne, matchDataTwo) {
      var matchUrl = "";
      if (matchDataOne.length > 0) {
        eachBreakstatus: for (var i = 0; i < matchDataOne.length; i++) {
          if (matchDataOne[i].url && (matchDataOne[i].url).indexOf(locationPath) != -1) {
            matchUrl = matchDataOne[i].dataUrl;
            break;
          } else {
            for (var j = 0; j < matchDataOne[i].children.length; j++) {
              if ((matchDataOne[i].children[j].url).indexOf(locationPath) != -1) {
                matchUrl = matchDataOne[i].children[j].dataUrl;
                break eachBreakstatus;
              }
            }
          }
        }
      } else {
        for (var k = 0; k < matchDataTwo.length; k++) {
          if (matchDataTwo[k].url && (matchDataTwo[k].url).indexOf(locationPath) != -1) {
            matchUrl = matchDataTwo[k].dataUrl;
            break;
          }
        }
      }
      //console.log(matchUrl);
      return matchUrl;
    };
  }]);

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
