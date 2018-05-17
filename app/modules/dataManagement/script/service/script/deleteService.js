/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("deleteService", ["$http",
  function($http) {
    var deleteServiceObj = {};
    deleteServiceObj.deleteRedList = function(callback, o) {
      $http({
        method: 'delete',
        url: GLOBAL_STATIC.datamanageRoot + 'redlist/group/' + o.id + '/',
        data: o
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
    //红名单批量删除
    deleteServiceObj.deleteRedBulk = function(callback, o) {
      $http({
        method: 'delete',
        url: GLOBAL_STATIC.datamanageRoot + 'redlist/bulk/',
        data: o
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
    //红名单删除
    deleteServiceObj.redListDeleteById = function(callback, id) {
      $http({
        method: 'delete',
        url: GLOBAL_STATIC.datamanageRoot + 'redlist/group/' + id + '/',
        data: o
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

    return deleteServiceObj;
  }
]);
