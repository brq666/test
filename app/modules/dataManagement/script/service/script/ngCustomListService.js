/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("ngCustomListService", ["$http",
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
      //根据customerNo获取单个信息
      "getCustomerByCustomerNo": function(callback, param) {
        $http({
          method: "get",
          async: false,
          url: GLOBAL_STATIC.datamanageRoot + "customerinfo/customer?customerno=" + param
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
      //修改客户基本信息
      "updateCustomerByCustomer": function(callback, param) {
        $http({
          method: "put",
          async: false,
          url: GLOBAL_STATIC.datamanageRoot + "customerinfo/customer/update/",
          data: param
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
      //客户订单
      "getOrderList": function(callback, customerno, shopid) {
        $http({
          method: "get",
          async: false,
          url: GLOBAL_STATIC.datamanageRoot + "customerinfo/order?customerno=" + customerno + "&shopId=" + shopid
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
      //客户基本信息-通用化客户信息 平台接口 added by 前：茅丹丹  后：何少辉  2014-6-5
      "getMetasSubjects": function(callback) {
        $http({
          "method": "get",
          url: GLOBAL_STATIC.datamanageRoot + "customerinfo/metas/subjects"
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
      //客户基本信息-通用化客户信息显示字段接口 added by 前：茅丹丹  后：何少辉  2014-6-5
      "getCustomerCellsBySubjectId": function(callback, subjectId) {
        $http({
          "method": "get",
          url: GLOBAL_STATIC.datamanageRoot + "customerinfo/metas/columns/" + subjectId
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
      //客户基本信息-通用化客户信息 店铺 added by 前：茅丹丹    2014-6-9
      "getGlobalHead": function(callback, data) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.nodeRoot + "node/query/filter/" + data + "/?_=" + new Date().getTime()
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
      //客户基本信息-通用化客户信息 查询条件接口 added by 前：茅丹丹  后：何少辉  2014-6-5
      "getQueryitmesBySubjectId": function(callback, subjectId) {
        $http({
          "method": "get",
          url: GLOBAL_STATIC.datamanageRoot + "customerinfo/metas/queryitmes/" + subjectId
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
      //客户基本信息-通用化客户信息 传递查询参数接口 前：茅丹丹  后：何少辉 2014-6-17
      "postConditions": function(callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "customerinfo/metas/conditions?_=" + new Date().getTime(),
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
      "getShopsByPlatformId": function(callback, platformId) { //获取shops
        $http({
          method: "get",
          url: GLOBAL_STATIC.componentRoot + "shop/selector/" + DATA_STATIC.tenantId +"?segmentationId=" + platformId + "&_=" + new Date().getTime()
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
