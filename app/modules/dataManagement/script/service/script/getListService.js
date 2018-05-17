/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("getListService", ["$http", "$rootScope",
  function($http, $rootScope) {
    var getListService = {};
    getListService.getPlat = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.ualRoot + 'plat/?_=' + new Date().getTime()
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
    // 获取单个红名单
    getListService.getRedListById = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.datamanageRoot + 'redlist/' + o + '/?_=' + new Date().getTime()
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
    getListService.getAllShops = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.componentRoot + 'shop/selector/' + DATA_STATIC.tenantId + '?_=' + new Date().getTime(),
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
    //获取某一个部门下的店铺
    getListService.getShopsById = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.systemRoot + 'sys/department/' + o.id + '/shops/',
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
    getListService.getRolesById = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.systemRoot + 'sys/role/' + o.id + '/permissions/',
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
    return getListService;
  }
]);
