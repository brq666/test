/**
 * Created by dupenghui on 2014/8/13.
 */



angular.module('dataManage.dataServices').factory("RFMTreeService", ["$http",function ($http) {
  return{
    "getRFMTree": function (callback, data) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.datamanageRoot + "rfm/category/?_=" + new Date().getTime()
      }).success(function (response) {
        callback(response);
      })
    }
  }
}]);
