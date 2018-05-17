/**
 * Created by dupenghui on 2014/8/29.
 */
angular.module('dataManage.dataServices').factory("ngDataImportService", ["$http",
  function($http) {

    var services = {};

    services.updateState = function(callback, params, errorback) {
      params.id = params.id || 0;
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/state/';
      $http({
        method: 'PUT',
        url: reqUrl,
        data: params
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.getImportDetail = function(callback, params, errorback) {
      params.id = params.id || 0;
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/detail/?id=' + params.id + '&page=' + params.page + '&pagesize=' + params.pagesize;
      $http({
        method: 'GET',
        url: reqUrl
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.getImportList = function(callback, params, errorback) {
      params.id = params.id || 0;
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/list/?page=' + params.page + '&pagesize=' + params.pagesize;
      $http({
        method: 'GET',
        url: reqUrl
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.startImport = function(callback, params, errorback) {
      params.id = params.id || 0;
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/startImport/';
      $http({
        method: 'PUT',
        url: reqUrl,
        data: params
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.checkName = function(callback, params, errorback) {
      params.id = params.id || 0;
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/checkName/?id=' + params.id + "&name=" + params.name;
      $http({
        method: 'GET',
        url: reqUrl
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.getProgress = function(callback, params, errorback) {
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/getProgress/?id=' + params.id;
      $http({
        method: 'GET',
        url: reqUrl
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.stopVerify = function(callback, params, errorback) {
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/stopVerify/';
      $http({
        method: 'PUT',
        url: reqUrl,
        data: params
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.startVerify = function(callback, params, errorback) {
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/startVerify/';
      $http({
        method: 'PUT',
        url: reqUrl,
        data: params
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.saveColumn = function(callback, params, errorback) {
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/saveColumn/';
      $http({
        method: 'PUT',
        url: reqUrl,
        data: params
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.saveFile = function(callback, params, errorback) {
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/saveFile/';
      $http({
        method: 'PUT',
        url: reqUrl,
        data: params
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    services.getInitStatus = function(callback, errorback) {
      var template = GLOBAL_STATIC.datamanageRoot + 'extImport/';
      $http({
        method: 'GET',
        url: template
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }
    services.getPreviewData = function(callback, params, errorback) {
      var reqUrl = GLOBAL_STATIC.datamanageRoot + 'extImport/preview/?fileId=' + params.fileId + '&delimiter=' + params.delimiter + '&hasColumn=' + params.hasColumn;
      $http({
        method: 'GET',
        url: reqUrl
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        if (errorback && typeof errorback === 'function') {
          errorback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }
    return services;
  }
]);
