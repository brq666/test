/**
 * Created by dupenghui on 2014/8/13.
 */
angular.module('dataManage.dataServices').factory("ngRedAndBlackCustomService", ["$http", "$q",
  function($http, $q) {
    return {
      "checkDownLoad": function (type, success, error) {
        $http({
          method: 'GET',
          url: GLOBAL_STATIC.componentRoot + 'checklist/downloadauth/'+DATA_STATIC.tenantId+'/'+ type,
          headers:{
            'Content-Type': 'application/json',
            'X-TOKEN': GLOBAL_STATIC.Credentials.access_token,
            'Authorization': 'Bearer ' + GLOBAL_STATIC.Credentials.access_token
          }
        }).success(function(data, status, headers, config) {
          data.auth ? success(data.auth) : error(data.auth);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      // 批量下载
      "downLoad": function(param, cb, eb) {
        var url = GLOBAL_STATIC.datamanageDomain + 'checklist/download/'+DATA_STATIC.tenantId+'/'+ param;
        window.open(url, '_blank', '');
      },
      "downLoadUrl": function(param, cb, eb) {
        return GLOBAL_STATIC.datamanageDomain + 'checklist/download/'+DATA_STATIC.tenantId+'/'+ param;
      },
      //客户名单分组--新增分组
      "postGroup": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.componentRoot + 'checklist/group/',
          headers: {
            'Content-Type': 'application/json'
          },
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
      //客户名单分组--分组获取
      "getGroup": function(callback, param) {
        var url = GLOBAL_STATIC.componentRoot + "checklist/group/tenantId/" + DATA_STATIC.tenantId;
        if(param) {
          url += '/type/' + param;
        }
        $http({
          "method": "GET",
          "url": url
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
      //客户名单分组--删除名单分组
      "deleteGroup": function(callback, param) {
        $http({
          "method": "DELETE",
          "url": GLOBAL_STATIC.componentRoot + "checklist/group/" + param,
          headers: {
            'Content-Type': 'application/json'
          }
        }).success(function(response, status) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message || '',
            "mark": true
          });
        });
      },
      //客户名单（按类型区分 红名单 和 黑红名单 手机，EMAIL）
      "getRedAndBlackList": function(callback, data) {
        $http({
          method: 'GET',
          url: GLOBAL_STATIC.datamanageRoot + 'checklist?tenantId=' + DATA_STATIC.tenantId
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
      //客户名单添加
      "postRedAndBlackCustom": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.componentRoot + 'checklist/',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          // 重写报错方法
          if(status == 503) {
            data.message = '网络超时,可能是文件过大造成,请分批上传'
          }
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true,
            "eleZindex": 1003,
            "markZindex": 1002
          });
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
        });
      },
      //客户黑红名单修改
      "editRedAndBlackCustom": function(callback, data) {
        $http({
          method: 'PUT',
          url: GLOBAL_STATIC.componentRoot + 'checklist/',
          headers: {
            'Content-Type': 'application/json'
          },
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
      //获取单个客户名单
      "getRedAndBlackCustomById": function(callback, param) {
        $http({
          method: 'GET',
          url: GLOBAL_STATIC.componentRoot + 'checklist/' + param

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
      //删除单个客户名单
      "deleteRedAndBlackCustomById": function(callback, param) {
        $http({
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          url: GLOBAL_STATIC.componentRoot + 'checklist/' + param
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
      //客户名单批量导入
      "postBulkList": function(callback, data) {
        data.tenantId = DATA_STATIC.tenantId;
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.componentRoot + 'checklist/bulk/',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        }).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          // 重写报错方法
          if(status == 503) {
            data.message = '网络超时,可能是文件过大造成,请分批上传'
          }
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true,
            "eleZindex": 1003,
            "markZindex": 1002
          });
        });
      },
      //名单批量更新
      "putBulkList": function(callback, data) {
        data.tenantId = DATA_STATIC.tenantId;
        $http({
          method: 'PUT',
          url: GLOBAL_STATIC.componentRoot + 'checklist/bulk/',
          headers: {
            'Content-Type': 'application/json'
          },
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
      //获取文件上传进度
      "getBulkList": function(callback, data) {
        $http({
          method: 'GET',
          url: GLOBAL_STATIC.componentRoot + 'checklist/bulk/state/'+data
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
      //名单批量删除
      "deleteBulkList": function(callback, data) {
        data.tenantId = DATA_STATIC.tenantId;
        $http({
          method: 'DELETE',
          url: GLOBAL_STATIC.componentRoot + 'checklist/bulk/',
          headers: {
            'Content-Type': 'application/json'
          },
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
      //系统内平台
      "getPlat": function(callback, o) {
        $http({
          method: 'GET',
          url: GLOBAL_STATIC.systemRoot + 'plat/?_=' + new Date().getTime()
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
      //获取所有主题
      "getSubject": function(callback) {
        $http({
          method: 'GET',
          url: GLOBAL_STATIC.componentRoot + 'checklist/subject/'
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
      //上传文件
      "postBulkFile": function(callback, data) {
        $http({
          method: 'POST',
          url: GLOBAL_STATIC.componentRoot + 'upload/?dir=' + data,
          headers: {
            'Content-Type': 'application/json'
          }
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
      //获取所有主题
      "getPlatList": function(callback) {
        var temp = $q.defer();
        $http({
          method: "get",
          url: GLOBAL_STATIC.componentRoot + "plat/selector/subject?_=" + new Date().getTime()
        }).success(function(data, status, headers, config) {
          callback(data);
          temp.resolve();
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
          temp.reject();
        });
        return temp.promise;
      }
    }
  }
]);
