//filter
(function(window, angular, undefined) {

  var app = angular.module('campaign.controllers');
  //活动类型管理
  //type 0：启用；1,禁用;2: 全部
  app.filter("actypeselect", function() {
    return function(value, type) {
      if(!value) {
        return ;
      }
      var val = [];
        switch(type) {
          case 0: filterData(type, value);break;
          case 1: filterData(type, value); break;
          case 2:
          default: val = value;
        }
        function filterData(type, value) {
          for (var i = 0; i < value.length; i++) {
            //启用
            if(!value[i].disabled && type == 0 ) {
              val.push(value[i]);
            //禁用
            } else if(value[i].disabled && type == 1) {
              val.push(value[i]);
            }
          }
        }
        return val;
      }
  });
   //活动类型管理状态过滤器
  app.filter("actypestatus", function() {
    return function (value) {
      return value ? "启用" : "禁用";
    }
  })
})(window, angular, undefined);
