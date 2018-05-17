//营销活动类型左边的tree的controller
(function(angular, window, undefined) {
  var app = angular.module('systemManage.controllers');
  app.controller("roleManagementCtrl", ["$scope", "$http", "$location", "getListService", "saveService", function($scope, $http, $location, getListService, saveService) {
    $scope.my = {};
    $scope.treeSettings = {
      view: {
        selectedMulti: false
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };
    $scope.test = function() {
      $location.absUrl("http://www.baidu.com/")
    }
    $scope.getAllNodes = function() {
      $http.get(GLOBAL_STATIC.systemRoot + "sys/role/").success(succcb).error(errcb);
      //  $http.get("http://10.200.187.93:8085/roles").success(succcb).error(errcb);

      // $http.get("http://10.200.187.93:8085/department/root").success(succcb).error(errcb);
      function succcb(res) {
        $scope.treeNodes = res;
      }

      function errcb() {

      }
    };
    $scope.getAllNodes();
    //搜索框
    $scope.searchTreeNodes = function(searchValue) {
      $scope.tree.searchNode(searchValue);
    };
    //$scope.treeNodes =[];
    //菜单的增删改
    //增加节点
    $scope.addNode = function addNode(rootFlag) {
      if (angular.element("#aaa input.rename").length > 0) {
        return false;
      }
      $scope.tree.addNode(addToServer, rootFlag);
      //服务器增加回调
      function addToServer(data, succcb, errcb) {
        delete data.newParentId;
        data.remark = "";
        $http.post(GLOBAL_STATIC.systemRoot + "sys/role/", data).success(succcb).error(errcb);
      }
    };
    //删除节点
    $scope.removeNode = function removeNode() {
      $scope.tree.deleteNode(removeFromServer);
      //服务器删除回调
      function removeFromServer(id, name, succcb, errcb) {
        // $http.delete(root + "campaign/classification/" + id).success(succcb).error(errcb);
        // ie8 不能用delete
        // $http({ method: 'DELETE', url: "http://10.200.187.93:8085/sys/role/" + id }).success(succcb).error(errcb);
        $(this).Confirm({
          "title": "确认删除",
          "str": "确定要删除角色" + name + "吗？",
          "mark": true
        },
        function() {
          $http({
            method: 'DELETE',
            url: GLOBAL_STATIC.systemRoot + "sys/role/" + id
          }).success(succcb).error(errcb);
        })
      }
    };
    //重命名节点
    $scope.renameNode = function renameNode() {
      $scope.tree.renameNode(renameToServer);
      //服务器重新命名回调
      function renameToServer(id, data, succcb, errcb) {
        //updated by 茅丹丹 2014-4-21
        //$http.put(GLOBAL_STATIC.systemRoot + "sys/role/" + id+"/permissions", data).success(succcb).error(errcb);
        //updated by 茅丹丹 2014-5-6
        $http.put(GLOBAL_STATIC.systemRoot + "sys/role/" + id, data).success(succcb).error(errcb);

        //$http.post("http://10.200.187.93:8085/sys/role/" + id, data).success(succcb).error(errcb);
      }
    };
    //获取所有店铺
    $scope.getAllShops = {
      "callback": function(d) {
        $scope.shops = d;
        for (var i = 0; i < $scope.shops.length; i++) {
          if ($scope.shops[i].img == null) {
            $scope.shops[i].img = "http://bbs.fenxibao.com/data/attachment/forum/201308/16/170811hgnn8sh5tzudgpjg.jpg";
          }
        }
      },
      "getAllShops": function() {
        getListService.getAllShops($scope.getAllShops.callback, //callback
            $scope.shops //表单数据
        )
      }
    };
    $scope.getAllShops.getAllShops();
    //获取某一个部门下的所有店铺
    $scope.getRoles = {
      "callback": function(d) {
        var currentData = $scope.currentData;
        var button1 = $('#Button1');

        $scope.$$childHead.setCheckDisabled(false, false, true);
        $scope.$$childHead.getCheckByName(d);
        if (currentData.hasOwnProperty('permissionsResetable') && currentData.permissionsResetable === false) {
          $scope.$$childHead.setCheckDisabled(true, false, true);
          button1.removeClass('btnBlue');
        } else {
          button1.addClass('btnBlue');
        }
      },
      "getRolesById": function(id, node) {
        $scope.currentData = node;
        $scope.department = {};
        $scope.department.id = id;
        getListService.getRolesById($scope.getRoles.callback, //callback
          $scope.department //表单数据
        )
      }
    }
      //   $scope.getAllShops.getShopsById(id);
    $scope.saveShops = {
      "callback": function(d) {
        $scope.shops = d;
        for (var i = 0; i < $scope.shops.length; i++) {
          $scope.my[$scope.shops[i].id] = true;
          if ($scope.shops[i].img == null) {
            $scope.shops[i].img = "http://bbs.fenxibao.com/data/attachment/forum/201308/16/170811hgnn8sh5tzudgpjg.jpg";
          }
        }
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
      },
      "saveShops": function() {
        // $scope.department.id
        // $scope.my
        $scope.data = {};
        $scope.arr = [];
        $scope.permissions = $scope.$$childHead.getCheckedNodes();

        for (var i = 0; i < $scope.permissions.length; i++) {
          $scope.arr.push($scope.permissions[i].id);
        }
        $scope.data.id = $scope.currentData.id;
        $scope.data.name = $scope.currentData.name;
        $scope.data.remark = $scope.currentData.remark;
        $scope.data.permissions = $scope.arr;
        if ($scope.currentData.hasOwnProperty('permissionsResetable') && $scope.currentData.permissionsResetable === false) {
          return;
        }
        $(this).Confirm({
          "title": "确认保存",
          "str": "确定要保存吗？",
          "mark": true
        },
        function() {
          saveService.saveRoles($scope.saveShops.callback, //callback
              $scope.data //表单数据
          )
        });
      }
    }

    $scope.$watch('all', function() {
      if ($scope.all) {
        for (var i = 0; i < $scope.shops.length; i++) {
          $scope.my[$scope.shops[i].id] = true;
        }

      } else {

      }
    });
  }]);

  app.controller("roleManagementCtrl2", ['$scope', '$http', function($scope, $http) {
    $scope.treeSettings = {
      view: {
        selectedMulti: false
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: {
          "Y": "",
          "N": ""
        },
        nocheckInherit: true
      }
    };
    //  $http.get("http://10.200.187.93:8085/permissions").success(succcb).error(errcb);
    $http.get(GLOBAL_STATIC.systemRoot + "sys/permission" + "/?_=" + new Date().getTime()).success(succcb).error(errcb);

    function succcb(res) {
      $scope.treeNodes = res; //[
      //{id:1, pId:0, name: "父节点a"},
      //{id:11, pId:1, name: "子节点b"},
      //{id:12, pId:1, name: "子节点c"},
      //{id:123, pId:11, name: "父节点aa"},
      //{id:111, pId:11, name: "子节点ab"},
      //{id:123, pId:11, name: "子节点adc"}
      //];
    }

    function errcb() {
      $scope.checkTreeNodes = [{
        "id": 1,
        "name": "所有",
        "open": true,
        "pId": 0
      },
      {
        "id": 2,
        "name": "测试a",
        "open": false,
        "pId": 1
      },
      {
        "id": 4,
        "name": "测试",
        "open": false,
        "pId": 2
      },
      {
        "id": 5,
        "name": "aaa",
        "open": false,
        "pId": 1
      },
      {
        "id": 6,
        "name": "bbbb",
        "open": true,
        "pId": 0
      },
      {
        "id": 7,
        "name": "ddddd",
        "open": true,
        "pId": 0
      },
      {
        "id": 8,
        "name": "yyyyyyyy",
        "open": true,
        "pId": 0
      },
      {
        "id": 9,
        "name": "gggggg",
        "open": true,
        "pId": 0
      },
      {
        "id": 10,
        "name": "未分类",
        "open": true,
        "pId": 0
      },
      {
        "id": 11,
        "name": "bbbbb",
        "open": true,
        "pId": 0
      },
      {
        "id": 12,
        "name": "fgggg",
        "open": false,
        "pId": 4
      }];
    }
  }]);
})(angular, window, undefined);
