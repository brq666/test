/**
 * Created by shuyun on 2015/5/25.
 */
webApp.directive({
  ngAddsubcurrent: function () {
    return function (scope, element, attr) {//首次加载添加二级导航样式
      scope.$watch(function () {
        return element.attr('href')
      }, function (href) {
        if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
          element.addClass('sbCurrent');
        }
      });
    }
  },
  ngAddsubcur: function () {
    return function (scope, element, attr) {
      scope.$watch(function () {
        return element.attr('href')
      }, function (href) {
        if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
          var _parent = element.parents('li');
          _parent.find('>a').addClass('sbCurrent')
          _parent.find('dl').show();
          element.addClass('sbSmallCur');
        }
      });
    }
  },
  getRoot: function () {
    return function (scope, element) {
      loadScrip(element);
    }
  }
});
