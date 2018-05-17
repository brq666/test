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
var webApp = angular.module("ccmsApp", ["ngRoute", "ngSanitize", "http-auth-interceptor", "directives", "dataServices", "commondirectives", "metaDataServices", "mateConfigDirectives"], ['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    var interceptor = ['$rootScope', '$q',
      function(scope, $q) {

        function success(response) {
          return response;
        }

        function error(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(); //解决保存按钮可点击
          var status = response.status;
          if (status == 401) {
            location.pathname = GLOBAL_STATIC.rootModule + "/modules/login/index.html";
            return;
          }
          // otherwise
          return $q.reject(response);

        }

        return function(promise) {
          return promise.then(success, error);
        }

      }];
    $httpProvider.responseInterceptors.push(interceptor);
  }
]);
webApp.controller("mainCtrl", ['$scope', '$http', '$location', '$rootScope',
  function($scope, $http, $location, $rootScope) {

  /*angualr http权限验证
   *发送http若为401，则说明验证不通过，跳回登入页
   */
  $scope.$on('event:auth-loginRequired', function(s, datas) { // 权限失败
    location.replace(datas.data.nextSteps.loginURL || "");
  });

  $scope.$on('event:auth-loginConfirmed', function() { //权限成功
    //doing
  });

  /*end*/

  $scope.afterLoadCont = function() {
    $scope.tmlLoaded = true;
  };

  $scope.headerUrl = root + "/app/modules/header/menu.html";

  /*是否加载侧栏 start*/
  $scope.hasSideMenu = function() {
    var regUrl = /modules\/([a-z_0-9]*)\/index.html/ig;
    $rootScope.subNavAry = [];
    var path = regUrl.exec(location.pathname)[1]; //xxx
    $http.get(rootStatic + "module/" + path).success(function(data) {
      angular.forEach(data.children, function(n) {
        //if(/R/.test(n.supportOps)){//R为可读
        $rootScope.subNavAry.push(n);
        //}
      });
      if ($rootScope.subNavAry.length > 0) {
        $scope.navUrl = root + "/app/modules/leftmenu/nav.html";
      } else {
        $scope.navUrl = "";
      };
      $scope.delaySidebarLoad();
    });
  };
  $scope.hasSideMenu();
  /*是否加载侧栏 end*/

    //监听location改变pageUrl
  $scope.delaySidebarLoad = function() {
    $scope.$watch(function() {
        return $location.path()
      }, function(path) {
        if (path) {
          var curPagrUrl = path.substring(1);
          curPagrUrl = curPagrUrl.replace(/\/modify.*/, '/SMScampaign');
          if (path.indexOf("iframe") == -1) { // 正常模板
            $scope.pageUrl = curPagrUrl + ".html?_=" + new Date().getTime();
          } else { //嵌入模板
            $scope.pageUrl = "view/iframe.html?_=" + new Date().getTime();
            var matchUrl = "";
            eachBreakstatus: for (var i = 0; i < $rootScope.subNavAry.length; i++) {
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
            };
            $rootScope.iframeSrc = matchUrl;
          }
        }
      });
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

webApp.factory("$select",
  function() {
    var $select = {};
    $select.get = function(data, str1, str2) {
      var newData = [];
      newData = angular.copy(data);
      var len = newData.length,
          i = 0;
      for (; i < len; i++) {
        if (newData[i][str1]) {
          var val = newData[i][str1][str2];
          delete newData[i][str1]
          if (val) {
            newData[i][str2] = val;
          }
        }
      }
      return newData;
    }
    //从数据中获取对应值的索引
    $select.getIndex = function(key, str, data) {
      var i = 0,
          len = data.length,
          index;
      for (; i < len; i++) {
        if (data[i][str] == key) {
          index = i;
          break;
        }
      }
      if (index || typeof(index) == "number") {
        return index;
      }
    }
    return $select;
  }
);
