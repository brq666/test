/**
 * Created by dupenghui on 2014/8/13.
 */

angular.module('dataManage.dataServices').factory("accountService", ["$http",
  function($http) { //新建系统账号
    return {
      "getRolesList": function(callback, data) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.systemRoot + "roles/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getSectionList": function(callback, data) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.systemRoot  + "sys/department/root/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getCurUser": function(callback, curId) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.systemRoot  + "sys/user/" + curId + '/'
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "postSaveUser": function(callback, data) {
        $http({
          "method": "POST",
          "url": GLOBAL_STATIC.systemRoot  + "sys/user/",
          "data": data
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "putSaveUser": function(callback, data) {
        $http({
          "method": "PUT",
          "url": GLOBAL_STATIC.systemRoot + "sys/user/" + data.id + '/',
          "data": data
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getStatus": function(id, v, callback) {
        $http({
          "method": "PUT",
          url: GLOBAL_STATIC.systemRoot + 'sys/user/' + id + '/status/',
          data: '{ "id":' + id + ',"enabled":' + !v + '}'
        }).success(function(response) {
          callback(response);
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
]);
