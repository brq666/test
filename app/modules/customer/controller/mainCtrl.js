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
var webApp = angular.module("ccmsApp", [],
    function($routeProvider, $locationProvider, $httpProvider) {
      var interceptor = ['$rootScope', '$q',
        function(scope, $q) {

          function success(response) {
            return response;
          }

          function error(response) {
            var status = response.status;
            if (status == 401) {
              location.pathname = root + 'login.html';
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
    });
webApp.controller("mainCtrl",
  function($scope, $http, $location, $rootScope) {
    $scope.afterLoadCont = function() {
      $scope.tmlLoaded = true;
    };

    $scope.headerUrl = root + "modules/header/menu.html";

    /*是否加载侧栏 start*/
    $scope.hasSideMenu = function() {
      var regUrl = /app\/([a-z_0-9]*)\/index.html/ig;
      $rootScope.subNavAry = [];
      var path = regUrl.exec(location.pathname)[1]; //xxx
      $http.get(rootStatic + "module/" + path).success(function(data) {
        angular.forEach(data.children, function(n) {
          //if(/R/.test(n.supportOps)){//R为可读
          $rootScope.subNavAry.push(n);
          //}
        });
        if ($rootScope.subNavAry.length > 0) {
          $scope.navUrl = root + "modules/leftmenu/nav.html";
        } else {
          $scope.navUrl = "";
        }
      });
    };
    $scope.hasSideMenu();
    /*是否加载侧栏 end*/

    //监听location改变pageUrl
    $scope.$watch(function() {
      return $location.path()
    }, function(path) {
      if (path) {
        var curPagrUrl = path.substring(1);
        curPagrUrl = curPagrUrl.replace(/\/modify.*/, '/add');
        $scope.pageUrl = curPagrUrl + ".html";
      }
    });
  }
);

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
