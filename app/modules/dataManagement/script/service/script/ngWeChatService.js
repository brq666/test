/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("ngWeChatService", ["$http", "$q",
  function($http, $q) {
    return {
      //根据customerNo获取单个信息
      "getCustomerByCustomerNo": function(callback, param) {
        $http({
          method: "get",
          async: false,
          url: GLOBAL_STATIC.systemRoot + "plat"
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      //修改客户基本信息
      "updateCustomerByCustomer": function(callback, param) {
        $http({
          method: "put",
          async: false,
          url: GLOBAL_STATIC.datamanageRoot + "wechat/customer/update/",
          data: param
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      //客户订单
      "getOrderList": function(callback, customerno, shopid) {
        $http({
          method: "get",
          async: false,
          url: GLOBAL_STATIC.datamanageRoot + "wechat/order?customerno=" + customerno + "&shopId=" + shopid
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      //客户基本信息-通用化客户信息 平台接口 added by 前：茅丹丹  后：何少辉  2014-6-5
      "getPublicNumberSubjects": function(callback) {
        $http({
          "method": "get",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/bind/offaccts" ///datamanage/wechat/bind/offaccts
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      //客户基本信息-通用化客户信息显示字段接口 added by 前：茅丹丹  后：何少辉  2014-6-5
      "getCustomerCellsBySubjectId": function(callback) {
        $http({
          "method": "get",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/metas/columns"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
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
        }).
        error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      //客户基本信息-通用化客户信息 查询条件接口 added by 前：茅丹丹  后：何少辉  2014-6-5
      "getQueryitmesBySubjectId": function(callback) {
        $http({
          "method": "get",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/metas/queryitmes/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      //客户基本信息-通用化客户信息 传递查询参数接口 前：茅丹丹  后：何少辉 2014-6-17
      "postConditions": function(callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/metas/conditions?_=" + new Date().getTime(),
          data: data
        }).success(function(data, status, headers, config) {
          callback(data);
        }).
        error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      "getPublicNumber": function(callback, platformId) { //获取shops
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/publicNumber/?_=" + new Date().getTime()
        }).success(function(data, status, headers, config) {
          callback(data);
        }).
        error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      "bindingPlat": function(callback, param) { //绑定平台
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/cust/bind?_=" + new Date().getTime(),  //datamanage/wechat/cust/bind
          data: param
        }).success(function(data, status, headers, config) {
          callback(data);
        }).
        error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      "deleteBilding": function(callback, params) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/cust/unbind?_=" + new Date().getTime(),
          data: params
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      "getWeChatDomain": function(callback,param) {
        // 微信公众号授权
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/offacct/auth/domain?_=" + new Date().getTime()
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      "bindAuth": function(callback, params) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/shop/bind?_=" + new Date().getTime(),
          data: params
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      "unbindAuth": function(callback, params) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/shop/unbind?_=" + new Date().getTime(),
          data: params
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      },
      "portMatchLoadWeChat" : function (callback, data) { // 上传文件 名单获取匹配
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/cust/data/upload?_=" + new Date().getTime(),
          data: data
        }).success(function (data, status, headers, config) {
            callback(data);
        }).error(function (data, status, headers, config) {
            $(this).Alert({"title": data.message, "str": data.description, "mark": true});
        })
      },
      "viewSplitDataWeChat" : function (callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/cust/data/upload/preview?_=" + new Date().getTime(),
          data: data
        }).success(function (data, status, headers, config) {
            callback(data);
        }).error(function (data, status, headers, config) {
            $(this).Alert({"title": data.message, "str": data.description, "mark": true});
        })
      },
      "startMatchWechat" : function (callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/cust/data/match?_=" + new Date().getTime(),
          data:data
        }).success(function (data, status, headers, config) {
            callback(data);
        }).error(function (data, status, headers, config) {
            $(this).Alert({"title": data.message, "str": data.description, "mark": true});
        })
      },
      "getPortDataResultWechat" : function (data,callback) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/cust/data/result/"+data+"/?_=" + new Date().getTime() //datamanage/wechat/cust/data/result/{batchId}
        }).success(function (data, status, headers, config) {
            callback(data);
        }).error(function (data, status, headers, config) {
            $(this).Alert({"title": data.message, "str": data.description, "mark": true});
        })
      },
      "postMatchNodeDataWechat" : function (callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/cust/batch/bind?_=" + new Date().getTime(),  //datamanage/wechat/cust/batch/bind
          data: data
        }).success(function (data, status, headers, config) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({"title": data.message, "str": data.description, "mark": true});
          /*if(curElement){ // 保存出错，按钮回复原来状态
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
          }*/
        })
      },
      "getWechatList": function(callback, params) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.datamanageRoot + "wechat/offaccts?_=" + new Date().getTime(),
          data: params
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        });
      }
    }
  }
]);
