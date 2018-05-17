/**
 *@project:ccms6.x
 *@author: Peach.Tao
 * Created by on 14-9-2.
 */
var root = '';
window.DASHBOARD_STATIC = {
  tenantId: window.sessionStorage.getItem('tenantId'),
  campUserName: GLOBAL_STATIC.cookies.name
}
// JavaScript Document
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
};

var webApp = angular.module("dashboard.App", ['dashboard.controllers', 'dashboard.directives', 'dashboard.filters', 'dashboard.services']);

webApp.config(["$locationProvider", "$httpProvider", "$controllerProvider",
  function($locationProvider, $httpProvider, $controllerProvider) {

  }]);

webApp.controller("dashboardMainCtrl", ["$scope", "$http", "$location", "$rootScope",
  function($scope, $http, $location, $rootScope) {

    // 定义变量，页面跳转使用
    $scope.appOrigin = location.protocol + "//" + location.host; // 获取绝对路径http
    $scope.appRoot = GLOBAL_STATIC.rootModule + "/";

    $scope.afterLoadCont = function() {
      $scope.tmlLoaded = true;
    };
    $scope.pageUrl = GLOBAL_STATIC.rootModule +  "/modules/dashboard/view/dashboard.html";
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
  },
  "ngTitle": function() {
    return function(scope, element, attr) {
      var x = 14,
          _toolTip; // x,y 默认偏移量
      element.mouseover(function(e) {
        var maxWidth = parseInt(element.attr('ng-title-max')) || 180;
        if (element.hasClass("error")) {
          _toolTip = $("<div id='tooltip' class='viewMarkInfoBox viewMarkInfoBox infoBoxError' style='width:auto;'></div>"); // 订单查询扩展的样式
        } else {
          _toolTip = $("<div id='tooltip' class='viewMarkInfoBox' style='width:auto;'></div>");
        }
        _toolTip.appendTo($('body'));
        _toolTip.html(attr.ngTitle).css({
          'visibility': 'hidden',
          'max-width': maxWidth
        });
        var L = e.pageX,
            Y = e.pageY,
            W = $(window).width(),
            H = $(window).height(),
            OW = _toolTip.outerWidth(true),
            OH = _toolTip.outerHeight(true);
        if (OW > maxWidth) {
          _toolTip.css({
            'width': maxWidth
          });
        } else {
          _toolTip.css({
            'width': 'auto'
          });
          OW = _toolTip.outerWidth(true);
        }
        _toolTip.css({
          'left': L + x + OW > W ? L - OW - x: L + x,
          'top': Y + OH > H ? H - OH: Y,
          'visibility': '',
          'display': 'block'
        });
      }).mouseout(function() {
        _toolTip.remove();
      });
    }
  }
});
