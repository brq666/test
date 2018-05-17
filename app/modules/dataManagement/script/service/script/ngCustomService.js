/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("ngCustomService", ["$http",
  function($http) {
    return {
      "deleteAttr": function(param, callback) {
        $http({
          "method": "DELETE",
          "url": GLOBAL_STATIC.datamanageRoot + "customproperty/" + param + '/'
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
      "changeStatus": function(param, callback, data) {
        $http({
          "method": "PUT",
          "url": GLOBAL_STATIC.datamanageRoot + "customproperty/updatestatus/" + param + "?status=" + !data
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
      "getQueryTypes": function(callback) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.datamanageRoot + 'customproperty/querytypes/?_=' + new Date().getTime()
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
      "editorAttrConfig": function(data, callback) {
        $http({
          "method": "get",
          "url": GLOBAL_STATIC.datamanageRoot + 'customproperty/' + data + '/'
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
      "gridAttrValues": function(callback, data) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.campaignRoot + 'campaign/'+ DATA_STATIC.tenantId + '/page/?_=' + new Date().getTime()
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
      "postAttrConfig": function(callback, data, errorCallBack) {
        $http({
          method: 'post',
          url: GLOBAL_STATIC.datamanageRoot + 'customproperty',
          data: data
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          if (errorCallBack && typeof errorCallBack === 'function') {
            errorCallBack(data, status);
          }
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "updateAttrConfig": function(callback, data, id, errorCallBack) {
        $http({
          method: 'put',
          url: GLOBAL_STATIC.datamanageRoot + 'customproperty/' + id + '/',
          data: data
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          if (errorCallBack && typeof errorCallBack === 'function') {
            errorCallBack(data, status);
          }
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getShops": function(callback, data) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.componentRoot + 'shop/selector/' + DATA_STATIC.tenantId + '?_=' + new Date().getTime()
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
      "deleteSelectedValues": function(callback, data) {
        $http({
          "method": "DELETE",
          "url": GLOBAL_STATIC.datamanageRoot + 'customproperty/' + data.id + '/value?property=' + data.value
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
      "getShopsByPlatformId": function(callback, platformId) { //获取shops
        $http({
          method: "get",
          url: GLOBAL_STATIC.componentRoot + "shop/selector/" + DATA_STATIC.tenantId + "?segmentationId=" + platformId + "&_=" + new Date().getTime()
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
      "getPropertiesValueById": function(callback, id) { //获取shops
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + "customproperty/properties/values/" + id + "?_=" + new Date().getTime()
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
      "getCatalogTree": function(callback) { //获取标签目录
        return $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + "customproperty/catalog/tree" + "?_=" + new Date().getTime()
        }).then(function(data) {
          return callback(data);
        }, function(data) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
          return false;
        });
      },
      "postCatalog": function(callback, data, errorCallBack) {
        return $http({
          method: 'post',
          url: GLOBAL_STATIC.datamanageRoot + 'customproperty/catalog',
          data: data
        }).then(function(data) {
          return callback(data);
        }, function(data) {
          if (errorCallBack && typeof errorCallBack === 'function') {
            errorCallBack(data, status);
          }
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
          return false;
        });
      },
      "updateCatalog": function(callback, data, id) {
        return $http({
          method: 'put',
          url: GLOBAL_STATIC.datamanageRoot + 'customproperty/catalog',
          data: data
        }).then(function(data) {
          return callback(data);
        }, function(data) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
          return false;
        });
      },
      "deleteCatalog": function(callback, catalogId) {
        return $http({
          "method": "DELETE",
          "url": GLOBAL_STATIC.datamanageRoot + 'customproperty/catalog/' + catalogId
        }).then(function(response) {
          return callback(response);
        }, function(data) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
          return false;
        });
      }
    }
  }
]);
