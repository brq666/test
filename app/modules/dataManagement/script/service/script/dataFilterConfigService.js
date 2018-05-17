/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("dataFilterConfigService", ["$http",
  function($http) { //查询条件配置
    return {
      "deleteFilter": function(data, callback) {
        $http({
          "method": "DELETE",
          "url": GLOBAL_STATIC.ualRoot + "queryitem/" + data + '/'
        }).success(function(response) {
          if (response.isBoolean) {
            callback();
          } else {
            $(this).Alert({
              "title": "提示",
              "str": data.message,
              "mark": true
            });
          }
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getFilterConfigLists": function(data, callback) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.ualRoot + "getFilterConfigLists/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "postFilterConfigLists": function(data, callback) {
        $http({
          "method": "POST",
          "data": data,
          "url": GLOBAL_STATIC.ualRoot + "postFilterConfigLists/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      }
    }
  }
]);