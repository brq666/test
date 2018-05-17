/**
 * Created by dupenghui on 2014/8/13.
 */

angular.module('dataManage.dataServices').factory("queryConfigService", ["$http",function ($http) {//查询条件配置

  return{
  "deleteConfig": function (data, callback) {
    $http({
      "method": "DELETE",
      "url": GLOBAL_STATIC.ualRoot + "queryitem/" + data + "/"

    }).success(function (response) {
      if (response.isBoolean) {
        callback();
      } else {
        $(this).Alert({ "title": "提示", "str": data.message, "mark": true });
      }
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    })
  },
  "queryType": function (callback) {    //获取查询类型
    $http({
      "method": "get",
      "url": GLOBAL_STATIC.ualRoot + "subject/attribute/queryitem/querytype/"
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    })
  },
  "getTables": function (callback) {
    $http({
      "method": "get",
      "url": GLOBAL_STATIC.ualRoot + "meta/database/register/tables/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    })
  },
  "getTableColumn": function (callback, tableName, schemaName) {
    $http({
      "method": "get",
      "url": GLOBAL_STATIC.ualRoot + "meta/database/" + schemaName + "/tables/" + tableName + "/columns/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    })
  },
  "queryDictionary": function (callback, dictionaryTypeId, ele, frontendComponentType, configParamValue, id) {
    $http({
      "method": "get",
      "url": GLOBAL_STATIC.ualRoot + "subject/attribute/queryitem/dictionary/type/" + dictionaryTypeId + "/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response, ele, frontendComponentType, configParamValue, id);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    })
  },
  "queryMetaDic": function (callback, ele, frontendComponentType, configParamValue, id) {
    $http({
      "method": "get",
      "url": GLOBAL_STATIC.ualRoot + "meta/dic/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response, ele, frontendComponentType, configParamValue, id);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    })
  },
  "queryMetaDicSimplify": function (callback) {
    $http({
      "method": "get",
      "url": GLOBAL_STATIC.ualRoot + "meta/dic/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    })
  },
  "categoryType": function (callback) {
    $http({
      "method": "GET",
      url: GLOBAL_STATIC.ualRoot + "category/type/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    });
  },
  "getCategory": function (callback) {
    $http({
      "method": "GET",
      url: GLOBAL_STATIC.ualRoot + "category/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    });
  },
  "modificationCategory": function (callback, id) {
    $http({
      "method": "GET",
      url: GLOBAL_STATIC.ualRoot + "queryitem/" + id + "/?_=" + new Date().getTime()
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    });
  },
  "postCategory": function (callback, data) {
    $http({
      "method": "POST",
      url: GLOBAL_STATIC.ualRoot + "category/",
      "data": data
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    });
  },
  "deleteCategory": function (callback, data) {
    $http({
      "method": "DELETE",
      url: GLOBAL_STATIC.ualRoot + "category/" + data + '/'
    }).success(function (response) {
      callback(response);
    }).error(function (data, status, headers, config) {
      $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
    });
  }
}
}]);