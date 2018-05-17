//营销活动类型左边的tree的controller
(function(angular, window, undefined) {
  var app = angular.module('systemManage.controllers');
  app.controller("departmentManagementCtrl", ["$scope", "$http", "$location", "getListService", "saveService", "$q","$timeout", function($scope, $http, $location, getListService, saveService, $q,$timeout) {
    $(".ccms_normal_tips").Tips();
    $scope.menuType = "部门";
    $scope.my = [];

    $scope.allShopDef = $q.defer();
    $scope.treeSettings = {
      view: {
        selectedMulti: false
      }
    };
    $scope.test = function() {
      $location.absUrl("http://www.baidu.com/")
    }
    $scope.getAllNodes = function() {
      $http.get(GLOBAL_STATIC.systemRoot + "sys/department/root" + "/?_=" + new Date().getTime()).success(succcb).error(errcb);
      function succcb(res) {
        $scope.treeNodes = res;
      }

      function errcb() {
        $scope.treeNodes = [];
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
      $scope.tree.addNode(addToServer, rootFlag);
      //服务器增加回调
      function addToServer(data, succcb, errcb) {
        var sentData = {};
        sentData.name = data.name;
        sentData.parentId = data.newParentId;
        $http.post(GLOBAL_STATIC.systemRoot + "sys/department/", sentData).success(succcb).error(errcb);
      }
    };
    //删除节点
    $scope.removeNode = function removeNode() {
      $scope.tree.deleteNode(removeFromServer);
      //服务器删除回调
      function removeFromServer(id, name, succcb, errcb) {
        // ie8 不能用delete
        $(this).Confirm({
          "title": "确认删除",
          "str": "确定要删除部门" + name + "吗？",
          "mark": true
        },
        function() {
          $http({
            method: 'DELETE',
            url: GLOBAL_STATIC.systemRoot + "sys/department/" + id
          }).success(succcb).error(errcb);
        })
      }
    };
    //重命名节点
    $scope.renameNode = function renameNode() {
      $scope.tree.renameNode(renameToServer);
      //服务器重新命名回调
      function renameToServer(id, data, succcb, errcb) {
        $http.put(GLOBAL_STATIC.systemRoot + "sys/department/" + id, data).success(succcb).error(errcb);
      }
    };
    //移动节点
    $scope.moveNode = function(id, newParentId, succcb, errcb) {
      //$http.post(root + "sys/department/" + id + "/move/" + newParentId).success(succcb, errcb);
      $http({
        method: "put",
        url: GLOBAL_STATIC.systemRoot + "sys/department/" + id + "/assign",
        data: {
          parent: newParentId
        }
      }).success(succcb).error(errcb);
    }
    //获取所有店铺
    /*$scope.getAllShops = {
      "callback": function(d) {
        $scope.shops = d;
        for (i = 0; i < $scope.shops.length; i++) {
          if ($scope.shops[i].img == null) {
            $scope.shops[i].img = "http://bbs.fenxibao.com/data/attachment/forum/201308/16/170811hgnn8sh5tzudgpjg.jpg";
          }
        }
        $scope.allShopDef.resolve('success');
      },
      "getAllShops": function() {
        getListService.getAllShops($scope.getAllShops.callback, //callback
          $scope.shops //表单数据
        )
      }
    }*/
    $scope.getAllShops = function(){
      console.log(123)
      var callback = function(data){
        console.log(data)
        $scope.shops = data;
        for (i = 0; i < $scope.shops.length; i++) {
          if ($scope.shops[i].img == null) {
            $scope.shops[i].img = "http://bbs.fenxibao.com/data/attachment/forum/201308/16/170811hgnn8sh5tzudgpjg.jpg";
          }
        }
        $scope.allShopDef.resolve('success');
      }
      getListService.getAllShops(callback,$scope.shops)
    }
    $scope.getAllShops();
    $scope.$watch('department.id', function() {
      var button1 = $('#Button1');
      if ($scope.department) {
        if ($scope.department.level === 0) {
          $scope.dis = true;
          button1.removeClass('btnBlue');
        } else {
          $scope.dis = false;
          button1.addClass('btnBlue');
        }
      }
    });

    //获取某一个部门下的所有店铺
    $scope.getShops = {
      "callback": function(resData) {
        $timeout(function(){
          var selectAllCk = $('#selectAllCk');

          //强制所有店铺为非选中态
          console.log($scope.shops)
          for (i = 0; i < $scope.shops.length; i++) {
            var shopItem = $scope.shops[i];
            $scope.my[shopItem.shopId] = false;
          }
          $scope.shopsmy = resData;
          if ($scope.shops.length == $scope.shopsmy.length) {
            $scope.all = true;
            selectAllCk.prop('indeterminate', false);
          } else if ($scope.shopsmy.length > 0) {
            $scope.all = false;
            selectAllCk.prop('indeterminate', true);
          } else {
            $scope.all = false;
            selectAllCk.prop('indeterminate', false);
          }
          //把获取的店铺置为选中态
          for (i = 0; i < $scope.shopsmy.length; i++) {
            $scope.my[$scope.shopsmy[i].shopId] = true;
          }
        },100)
      },
      "getShopsById": function(id, node) {
        $scope.department = {};
        $scope.department.id = id;
        $scope.department.level = node.level;
        $q.all($scope.allShopDef.promise).then(function(data) {
          getListService.getShopsById($scope.getShops.callback, //callback
            $scope.department //表单数据
          );
        });
      }
    }
      //   $scope.getAllShops.getShopsById(id);
    $scope.saveShops = {
      "callback": function(d) {
        //$scope.shops = d;
        //for (i = 0; i < $scope.shops.length; i++) {
        //    $scope.my[$scope.shops[i].id] = true;
        //    if ($scope.shops[i].img == null) {
        //        $scope.shops[i].img = "http://bbs.fenxibao.com/data/attachment/forum/201308/16/170811hgnn8sh5tzudgpjg.jpg";
        //    }
        //}
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
      },
      "saveShops": function() {
        // $scope.department.id
        // $scope.my
        $scope.data = {}
        $scope.data.data = {};
        $scope.arr = [];
        //不要以my数组的下标作为遍历字段，非连续字段
        for (i = 0; i < $scope.shops.length; i++) {
          if ($scope.my[$scope.shops[i].shopId] === true) {
            $scope.arr.push($scope.shops[i].shopId);
          }
        }

        $scope.data.id = $scope.department.id;
        $scope.data.data.shopIds = $scope.arr;
        if ($scope.data.data.shopIds.length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "保存失败，至少给部门配置一个店铺",
            "mark": true,
            "width": "230px",
            "eleZindex": 1010,
            "markZindex": 1005
          });
          return false;
        };
        $(this).Confirm({
          "title": "确认保存",
          "str": "保存后部门内帐号将拥有对应店铺的操作权限，确定要保存吗？",
          "mark": true
        },
        function() {
          saveService.saveShops($scope.saveShops.callback, //callback
              $scope.data //表单数据
          )
        })
      }
    }
    $scope.checkedOne = function(e) {
      var currentTarget = e.currentTarget,
        selectAllCk = $('#selectAllCk'),
        singleNum = 0,
        dataId = currentTarget.getAttribute('data-id');

      if (currentTarget.checked) {
        $scope.my[dataId] = true;
      } else {
        $scope.my[dataId] = false;
      }

      for (i = 0; i < $scope.shops.length; i++) {
        if ($scope.my[$scope.shops[i].shopId] === true) {
          singleNum++;
        }
      }

      if (singleNum === $scope.shops.length) {
        $scope.all = true;
        selectAllCk.prop('indeterminate', false);
      } else if (singleNum > 0) {
        $scope.all = false;
        selectAllCk.prop('indeterminate', true);
      } else {
        $scope.all = false;
        selectAllCk.prop('indeterminate', false);
      }
    }
    $scope.getAll = function(e) {
      if ($scope.department.id != '1') {
        if (e.currentTarget.checked) {
          $scope.singleNum = $scope.shops.length;
          for (i = 0; i < $scope.shops.length; i++) {
            $scope.my[$scope.shops[i].shopId] = true;
          }
        } else {
          $scope.singleNum = 1;
          for (i = 0; i < $scope.shops.length; i++) {
            $scope.my[$scope.shops[i].shopId] = false;
          }
        }
      }
    }
  }]);
})(angular, window, undefined);
