(function(window, angular) {
  angular.module('campaign.controllers').service('ActiveTemplateService', ['$http',
    function($http) {
      return {
        //模板列表
        "getTemplateList": function(callback) {
          $http({
            method: 'get',
            url: GLOBAL_STATIC.campaignRoot + 'campaign/template/'
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
        //添加模版
        "addTemplate": function(callback, o, errorCallBack) {
          o.tenantId = CAMPAIGN_STATIC.tenantId;
          $http({
            method: 'post',
            url: GLOBAL_STATIC.campaignRoot + 'campaign/template/',
            data: o
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
        //修改模版
        "updateTemplate": function(callback, id, o) {
          o.tenantId = CAMPAIGN_STATIC.tenantId;
          $http({
            method: 'put',
            url: GLOBAL_STATIC.campaignRoot + 'campaign/template/' + id + '/',
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

        },
        //删除模板
        "deleteTemplate": function(callback, id) {
          $http({
            method: 'delete',
            url: GLOBAL_STATIC.campaignRoot + 'campaign/template/' + id + '/'
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
        //单个模板
        "getTemplate": function(callback, id) {
          $http({
            method: 'get',
            url: GLOBAL_STATIC.campaignRoot + 'campaign/template/' + id + '/'
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
        //获取可用的模板
        "getAvailableTemplates": function(callback) {
          $http({
            method: 'get',
            url: GLOBAL_STATIC.campaignRoot + 'campaign/template/avaliable/' + CAMPAIGN_STATIC.tenantId
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
})(window, angular);
