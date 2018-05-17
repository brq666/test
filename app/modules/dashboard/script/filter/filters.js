// JavaScript Document
var dashboardFilters = angular.module("dashboard.filters", []);

//新手帮助日期格式化
dashboardFilters.filter('helpDate', function() {
  return function(value) {
    var parts = value.match(/-(\d*)-(\d*)/);
    return parts[1] + '-' + parts[2];
  };
});

//主页系统消息右边日期格式化
dashboardFilters.filter('indexMessDate', function() {
  return function(value) {
    return value ? value.match(/(.*)\s/)[0].replace(/-/g, '/') : '';
  };
});
//主页系统消息弹出框的日期格式化
dashboardFilters.filter('popMessDate', function() {
  return function(value) {
    return value.substring(0, 16);
  }
});

dashboardFilters.filter('channelmoney', function() {
  return function(value) {
    return '￥' + value;
  }
});

dashboardFilters.filter('formantNumber', function() {
  return function(value) {
    switch (value) {
      case 0:
        var s = "_"
        break;
      case "_":
        var s = "_"
        break;
      default:
        if (!value) {
          value = "_"
          return value
        }
        value = parseFloat(value).toLocaleString();
        var s = value + "人次"
    }
    return s;
  }
});

dashboardFilters.filter('formantNumber0', function() {
  return function(value) {
    switch (value) {
      case 0:
        var s = "_"
        break;
      case "_":
        var s = "_"
        break;
      default:
        if (!value) {
          value = "_"
          return value
        }
        value = Math.round(parseFloat(value)).toLocaleString();
        var s = value
    }
    return s;
  }
});
