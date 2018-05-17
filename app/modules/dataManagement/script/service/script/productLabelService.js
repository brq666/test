/**
 * Created by dupenghui on 2014/8/29.
 */
angular.module('dataManage.dataServices').factory("productLabelService", ["$http",
  function($http) {
    //商品标签
    return {
      "postLabelConfig": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/',
          data: data
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
      "updateLabelConfig": function(callback, data) {
        $http({
          method: 'PUT',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/',
          data: data
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
      "deleteLabel": function(callback, data) {
        $http({
          method: 'DELETE',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/' + data + "/"
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
      "getStandardCategoryByShopId": function(callback, param) {
        $http({
          "method": "GET",
          async: false,
          "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + DATA_STATIC.tenantId + "/shop/" + param + "/standardcategory/?_=" + ( + new Date())
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
      "getCustomcategory": function(callback, param) {
        $http({
          "method": "GET",
          async: false,
          "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + DATA_STATIC.tenantId + "/shop/" + param + "/customcategory/?_=" + ( + new Date())
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
      "getPropertysByCid": function(callback, param) {
        $http({
          "method": "GET",
          async: false,
          "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + DATA_STATIC.tenantId + "/standardcategory/" + param + "/property/?_=" + ( + new Date())
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
      "getPropertysByCidAndPid": function(callback, param1, param2) {
        $http({
          "method": "GET",
          async: false,
          "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + DATA_STATIC.tenantId + "/standardcategory/" + param1 + "/property/" + param2 + "/value/?_=" + ( + new Date())
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
      //商品列表
      "GetProductList": function(callback, data) {
        $http({
          "method": "post",
          "url": GLOBAL_STATIC.componentRoot + "product/selector/search/page/?_=" + new Date().getTime(),
          data: data
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
      //商品标签
      "getProductLabel": function(callback, data) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.datamanageRoot + "producttag/?_=" + new Date().getTime()
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
      "deleteSingleLabel": function(callback, data) {
        $http({
          method: 'DELETE',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/product/' + data.proId + '/tag/' + data.tagId + '/relation/?shopId=' + data.shopId
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
      "putSingleLabel": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/product/tag/relation/',
          data: data
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
      "deleteBatchLabel": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/product/tag/relation/batch/del-handler/',
          data: data
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
      "putBatchLabel": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/product/tag/relation/batch/',
          data: data
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
      "getProductLabelUsed": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.datamanageRoot + 'producttag/used/?_=' + new Date().getTime(),
          data: data
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
]);
