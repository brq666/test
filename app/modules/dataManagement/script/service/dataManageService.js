var dataManageService=angular.module('dataManage.dataServices', []);

dataManageService.factory("getGlobalPlatIdServer", ["$http",function($http){ //全局获取平台的info
  return {
    "getTaobaoPlatId":function(callback,getDateError,parame){
      $http({
        method: "get",
        url: GLOBAL_STATIC.dashboardRoot + "metas/ucenter/plat/taobao/?_="+new Date().getTime()
      }).success(function (data, status, headers, config){
        callback(data);
      }).error(function (data, status, headers, config){
        $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
      })
    }
  }
}])
