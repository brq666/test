/*
 * create method addTag为生成css和js增加root变量,root变量目的是解决后端与前端文件夹结构不一样
 */
var root = '';

function loadScrip(obj) {
    if (obj.attr('_href')) {
        obj.attr('href', root + obj.attr('_href'));
    }
    if (obj.attr('_src')) {
        $.ajax({
            url: root + obj.attr('_src'),
            dataType: 'script',
            async: false,
            cache: obj.attr('cache') ? true : false,
            success: function() {
                obj.remove();
            }
        });
    }
};

window.SYS_STATIC = {
  tenantId: window.sessionStorage.getItem('tenantId')
};

angular.module('systemManage.controllers', []);

var webApp = angular.module("systemManage.App", ["systemManage.controllers", "systemManage.directives", "systemManage.dataServices", "commondirectives"])
   .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    var baseUrl = '/ccms/modules/systemManage/view/';

    $stateProvider.state('systemManage.systemAccount', {
        url: "/view/systemAccount",
        abstract: true,
        templateUrl: baseUrl + "systemAccount.html"
    }).state('systemManage.systemAccount.list', {
        url: "",
        templateUrl: baseUrl + "accountList.html"
    }).state('systemManage.systemAccount.add', {
        url: "",
        templateUrl: baseUrl + "addAccount.html"
    }).state('systemManage.subAccount', {
        url: "/view/subAccount",
        abstract: true,
        templateUrl: baseUrl + "subAccount.html"
    }).state('systemManage.subAccount.list', {
        url: "",
        templateUrl: baseUrl + "subAccountList.html"
    }).state('systemManage.subAccount.edit', {
        url: "",
        templateUrl: baseUrl + "subEditorAccount.html"
    }).state('systemManage.departmentManagement', {
        url: "/view/departmentManagement",
        templateUrl: baseUrl + "departmentManagement.html"
    }).state('systemManage.roleManagement', {
        url: "/view/roleManagement",
        templateUrl: baseUrl + "roleManagement.html"
    }).state('systemManage.iframe', {
        url: "/view/iframe/{moduleUrl}",
        templateUrl: baseUrl + "iframe.html"
    })

}]);

webApp.controller("systemManageMainCtrl", ['$state', '$scope', '$http', '$location', '$rootScope', '$resource', function($state, $scope, $http, $location, $rootScope, $resource) {
    //angualr http权限验证
    //发送http若为401，则说明验证不通过，跳回登入页
    $scope.$on('event:auth-loginRequired', function(s, datas) { // 权限失败
        location.replace(GLOBAL_STATIC.rootModule + "/modules/login/index.html");
    });

    $scope.$on('event:auth-loginConfirmed', function() { //权限成功
        //doing
    });

    $scope.menusOptions = {
      unfold: true,
      shops: false,
      menusResource: $resource(GLOBAL_STATIC.portalRoot + 'module/' + SYS_STATIC.tenantId + '/sys')
    };

    if($state.current.name === "systemManage") {
      $state.go('systemManage.systemAccount.list');  // 跳转到客户信息页面
    }

}]);

webApp.directive({
    ngAddsubcurrent: function() {
        return function(scope, element, attr) { //首次加载添加二级导航样式
            scope.$watch(function() {
                    return element.attr('href')
                },
                function(href) {
                    if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
                        element.addClass('sbCurrent');
                    }
                });
        }
    },
    ngAddsubcur: function() {
        return function(scope, element, attr) {
            scope.$watch(function() {
                    return element.attr('href')
                },
                function(href) {
                    if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
                        var _parent = element.parents('li');
                        _parent.find('>a').addClass('sbCurrent');
                        _parent.find('dl').show();
                        element.addClass('sbSmallCur');
                    }
                });
        }
    },
    getRoot: function() {
        return function(scope, element) {
            loadScrip(element);
        }
    }
});

webApp.factory("$select", function() {
    var $select = {};
    $select.get = function(data, str1, str2) {
            var newData = [];
            newData = angular.copy(data);
            var len = newData.length,
                i = 0;
            for (; i < len; i++) {
                if (newData[i][str1]) {
                    var val = newData[i][str1][str2];
                    delete newData[i][str1]
                    if (val) {
                        newData[i][str2] = val;
                    }
                }
            }
            return newData;
        }
        //从数据中获取对应值的索引
    $select.getIndex = function(key, str, data) {
        var i = 0,
            len = data.length,
            index;
        for (; i < len; i++) {
            if (data[i][str] == key) {
                index = i;
                break;
            }
        }
        if (index || typeof(index) == "number") {
            return index;
        }
    }
    return $select;
});
