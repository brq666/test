/**
 * Created by marchen on 2015/12/28.
 */
angular.module('dataManage.dataServices').factory("ngHistoryService", ["$http",
  function($http) {
    return {
      //店铺
      "getShops": function(callback, param) { //获取shops
        $http({
          method: "get",
          async: false,
          url: GLOBAL_STATIC.componentRoot + "shop/selector/" + DATA_STATIC.tenantId + "?_=" + new Date().getTime()
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "checkImportStatus": function(callback, pkids) { //获取shops
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + 'orderimport/checkImportStatus?pkIds=' + pkids.slice(0, -1) + '&tenantId=' + DATA_STATIC.tenantId + '&_=' + new Date().getTime()
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getViewResult": function(callback, pkId) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + 'orderimport/viewResult?pkId=' + pkId + '&tenantId=' + DATA_STATIC.tenantId + '&_=' + new Date().getTime()
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "deleteFile": function(callback, param) { //获取shops
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + 'orderimport/delete?' + param + '&_=' + new Date().getTime(),
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getList": function(callback, shopId) { //获取shops
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + 'orderimport/list?dpId='+ shopId + '&tenantId=' + DATA_STATIC.tenantId + '&_=' + new Date().getTime()
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      }
    }
  }
])
