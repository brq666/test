/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("dmSaveService", ["$http", "$rootScope", "$window",
  function($http, $rootScope, $window) {
    var saveService = {};
    saveService.saveredListSave = function(callback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.datamanageRoot + 'redlist/',
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
    saveService.editRedBulk = function(callback, o) {
      $http({
        method: 'put',
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
    saveService.redListEidt = function(callback, o) {
      $http({
        method: 'put',
        url: GLOBAL_STATIC.datamanageRoot + 'redlist/',
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
    return saveService;

  }
]);
