angular.module('systemManage.controllers').controller('AccountCtrl', ["$scope", "$http", "$compile", "accountService", "$rootScope", '$state', '$log', function AccountCtrl($scope, $http, $compile, accountService, $rootScope, $state, $log) {
    //初始化权限控制所属部门、查看权限
  /*accountService.getSysMgrContent(function(response) {
    if (response.children && response.children.length > 0) {
      angular.forEach(response.children, function(val, key) {
        if (val.key.indexOf("departmentId") != -1) {
          $scope.departmentItemIsShow = true;
        } else if (val.key.indexOf("dataPermissionType") != -1) {
          $scope.dataPermissionItemIsShow = true;
        }
      });
    }
  });*/




  $scope.departmentItemIsShow = $scope.dataPermissionItemIsShow = true;
  $scope.accountObj = {
    "disabledFalg": true,
    "viewUrl": "view/accountList.html",
    "accountTitle": "",
    "upCompile": function(curScope) {
      $compile(angular.element(".listContainer"))($scope || curScope);
      $scope.$apply();
    },
    "htmlEntities":function(s, newline){
      s = s || '';
      
      s = s.replace(/&/g, '&amp;'); // 38 26
      s = s.replace(/"/g, '&quot;'); // 34 22
      s = s.replace(/\'/g, '&#39;'); // 39 27
      s = s.replace(/</g, '&lt;'); // 60 3C
      s = s.replace(/>/g, '&gt;'); // 62 3E

      if (newline) {
          s = s.replace(/\n/g, '<br />');
      }

      return s;
    },
    "fixEvt":function(evt){
      evt = evt || window.event;
      if (!evt.target) { //IE
          evt.target = evt.srcElement;
          evt.layerX = evt.offsetX;
          evt.layerY = evt.offsetY;
          evt.stopPropagation = function() {
              this.cancelBubble = true;
          }
          evt.preventDefault = function() { //evt.preventDefault()放在方法最前，可阻止冒泡。
              event.returnValue = false;
          }
          evt.pageX = evt.clientX + document.documentElement.scrollLeft;
          evt.pageY = evt.clientY + document.documentElement.scrollTop;
      }
      return evt;
    },
    "viewMark":function(e,t){
      var _this = this;
      var boxVal = t;
      $("#couponTip").html(_this.htmlEntities(boxVal, true));
      e = _this.fixEvt(e);
      var posX = e.pageX + 15,
          posY = e.pageY + 15,
          ww = $(window).width(),
          wh = $(window).height(),
          ow = $("#couponTip").outerWidth(true),
          oh = $("#couponTip").outerHeight(true);
      if (posX + ow > ww) {
          posX = posX - ow;
      }
      if (posX < 0) {
          posX = 0;
      }
      if (posY + oh > wh) {
          posY = posY - oh;
      }
      if (posY < 0) {
          posY = 56; // header's height
      }
      $("#couponTip").css({
          "left": posX,
          "top": posY
      }).show();
    },
    "hideMark" :function(){
      $("#couponTip").hide();
    },
    "addSysAccount": function() {
      var _this = this;
      _this.accountRoleLists = [];
      _this.nameFlag = false;
      _this.passwordStatus = true; //判断密码是否必填
      _this.disabledFalg = true;
      _this.accountTitle = "新建系统账号";
      _this.curUserId = "";
      _this.loginName = "";
      _this.realName = "";
      _this.RoleIds = [];
      _this.RoleValsView = "";
      _this.departmentId = "";
      _this.departmentName = "";
      _this.contactPhone = "";
      _this.contactEmail = "";
      _this.loginPassword = "";
      _this.confirmPassword = "";
      _this.remark = "";
      _this.enabledVal = "0";
      _this.dataRight = "1";
      _this.configDataRight = "";
      _this.defaultCheckedId = []; //自定义默认选项
      _this.isAdmin = false;
      accountService.getSectionList(_this.setDefaultSelecion);
      //this.viewUrl = "view/addAccount.html?_=" + new Date().getTime();
      $state.go('systemManage.systemAccount.add');
    },
    "accountMethod": function(f, curId) {
      var _this = this;
      _this.accountRoleLists = [];
      _this.nameFlag = true;
      _this.passwordStatus = false; //判断密码是否必填
      _this.accountTitle = "修改系统账号";
      _this.curUserId = curId;
      accountService.getCurUser(function(response) {
        _this.RoleIds = [];
        _this.RoleVals = [];
        _this.configDataRightIds = [];
        _this.checkedZtreeview = [];
        _this.defaultCheckedId = [];
        if (response.roles) {
          angular.forEach(response.roles, function(val, key) {
            _this.RoleIds.push(val.id);
            _this.RoleVals.push(val.name);
          });
        };
        _this.loginName = response.loginName;
        _this.isAdmin = _this.loginName == "admin" ? true: false; //admin不可更改选项
        _this.realName = response.realName;
        _this.RoleValsView = _this.RoleVals.join(" ");
        _this.departmentId = response.department.id;
        _this.departmentName = response.department.name;
        _this.contactPhone = response.mobile ? response.mobile: "";
        _this.contactEmail = response.email ? response.email: "";
        _this.loginPassword = response.password;
        _this.confirmPassword = response.password2;
        _this.remark = response.remark ? response.remark: "";
        _this.idInPlat = response.idInPlat || "";
        _this.nameInPlat = response.nameInPlat || "";
        if (response.enabled) { //启用
          _this.enabledVal = "0";
        } else {
          _this.enabledVal = "1";
        };
        _this.dataRight = response.dataPermissionType.id;
        if (response.dataPermissionType.id == 3) { //自定义
          if (response.permissionedDepartments) {
            angular.forEach(response.permissionedDepartments, function(val, key) {
              _this.configDataRightIds.push(val.id);
              _this.checkedZtreeview.push(val.name);
              _this.defaultCheckedId.push({
                "id": val.id
              });
            });
          };
          _this.disabledFalg = false;
        } else {
          _this.disabledFalg = true;
        };
        //_this.configDataRight = _this.checkedZtreeview.join(" ");
        _this.configDataRight = '已选择' + _this.checkedZtreeview.length + '个部门';
      },
      _this.curUserId);
      //this.viewUrl = "view/addAccount.html?_=" + new Date().getTime();
      $state.go('systemManage.systemAccount.add');
    },
    'setDefaultSelecion': function(res) {
      $scope.accountObj.departmentId = res.id;
      $scope.accountObj.departmentName = res.name;
    },
    "cancelBtnMethod": function() {
      this.viewUrl = "view/accountList.html?_=" + new Date().getTime();
      $state.go('systemManage.systemAccount.list');
    },
    "getRoles": function() { //获取角色列表
      $scope.accountObj.accountRoleLists = []; //清空列表，删除之前已选的样式
      if (this.isAdmin) {
        return "不可编辑"
      };
      $(".accountRolePop").addInteractivePop({
        magTitle: "请选择账号角色",
        width: 734,
        height: 300,
        mark: true,
        drag: false,
        position: "fixed"
      });
      accountService.getRolesList(this.initRoles);
    },
    "initRoles": function(response) {
      angular.forEach($scope.accountObj.RoleIds, function(val, key) {
        var curVal = val;
        angular.forEach(response, function(responseVal, responseKey) {
          if (curVal == responseVal.id) {
            response[responseKey].classVal = "cur";
          }
        });
      });
      $scope.accountObj.accountRoleLists = response;
    },
    "sureAddRole": function() {
      $scope.accountObj.RoleIds = [];
      $scope.accountObj.RoleVals = [];
      var curElement = angular.element(".unitLists .cur a");
      curElement.each(function() {
        $scope.accountObj.RoleIds.push(Number(angular.element(this).attr("id")));
        $scope.accountObj.RoleVals.push(angular.element(this).text());
      });
      $scope.accountObj.RoleValsView = $scope.accountObj.RoleVals.join(" ");
      this.removePop();
    },
    "getSection": function() { //所属部门
      accountService.getSectionList(this.initSelecion);
    },
    "initSelecion": function(response) {
      $scope.customSelect.commonTree(response, $('[name="accountSection"]'));
    },
    "settingCheckZtree": function(response) { //配置check ztree插件
      var _this = this;
      var setting = {
        check: {
          enable: true,
          chkStyle: "checkbox",
          chkboxType: {
            "Y": "s",
            "N": "s"
          },
          nocheckInherit: true
        },
        view: {
          addDiyDom: function(treeId, treeNode) {
            var spaceWidth = 15;
            var switchObj = $("#" + treeNode.tId + "_switch"),
              icoObj = $("#" + treeNode.tId + "_ico"),
              checkObj = $("#" + treeNode.tId + "_check");
            switchObj.remove();
            icoObj.before(switchObj);

            switchObj.after(checkObj);
            var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
            switchObj.before(spaceStr);
            if (treeNode.level == 0 && !treeNode.isLastNode) {
              $('#' + treeNode.tId + '_a').after("<div class='root_level0_line'></div>");
            }
          },
          dblClickExpand: false,
          showIcon: false
        },
        callback: {
          onCheck: function onCheck(event, treeId, treeNode) {}
        },
        edit: {
          enable: false
        }
      };
      response.open = true;
      $scope.accountObj.checkedZtree = $.fn.zTree.init($(".zTreeBoxStyle"), setting, response);
      $scope.accountObj.setDefaultTreeNode($scope.accountObj.checkedZtree, $scope.accountObj.defaultCheckedId);
    },
    "setDefaultTreeNode": function(treeEle, defalutObj) { //设置默认的tree node
      treeEle.checkAllNodes(false);
      for (var i = 0; i < defalutObj.length; i++) {
        var node = treeEle.getNodesByParam("id", defalutObj[i].id)[0];
        if (node) {
          treeEle.checkNode(node, true, false);
          treeEle.expandNode(node.getParentNode(), true);
        }
      }
    },
    "getConfigDataRight": function() { //自定义数据权限
      if (this.isAdmin || this.disabledFalg) {
        return "不可编辑"
      };
      $(".configDataRight").addInteractivePop({
        magTitle: "请选择自定义部门",
        width: 250,
        height: 250,
        drag: false,
        title: false,
        left: 457.5,
        top: 255,
        mark: true
      });
      accountService.getSectionList(this.settingCheckZtree);
    },
    "getConfigData": function() {
      var CurAccountData = {
        id: this.curUserId,
        loginName: this.loginName,
        departmentId: this.departmentId || null,
        email: this.contactEmail ? this.contactEmail: "",
        mobile: this.contactPhone ? this.contactPhone: "",
        realName: this.realName,
        password: this.loginPassword,
        password2: this.confirmPassword,
        enabled: angular.element("input[name='enabledRadio']:checked").val() == 0 ? true: false,
        roleIds: this.RoleIds ? this.RoleIds: [],
        remark: this.remark,
        dataPermissionType: Number(this.dataRight),
        //dataPermissionType: 1,
        permissionedDepartments: this.configDataRightIds ? this.configDataRightIds: []
      };
      if (this.curUserId !== "") {
        //编辑添加参数
        CurAccountData.idInPlat = this.idInPlat;
        CurAccountData.nameInPlat = this.nameInPlat;
      };
      return CurAccountData;
    },
    "sure_btn": function() { //确认新建账号
      var curSaveData = this.getConfigData();
      if (angular.element("#accountForm label.initError").css("display") == "inline") {
        return false
      }
      if (this.curUserId == "") { //新建
        angular.element(this).Confirm({
          "title": "确认",
          "str": "确定保存账号信息吗？",
          "mark": true,
          "eleZindex": 1010,
          "markZindex": 1005
        }, function() {
          $scope.$apply(function() {
            accountService.postSaveUser(function() {
              $scope.accountObj.viewUrl = "view/accountList.html?_=" + new Date().getTime();
              $(this).yAlert({
                "text": '新建成功'
              });
              removeAlert();
              $state.go('systemManage.systemAccount.list');
            }, curSaveData);
          });
        });
      } else { //修改
        angular.element(this).Confirm({
          "title": "确认",
          "str": "确定保存修改后的账号信息吗？",
          "mark": true,
          "eleZindex": 1010,
          "markZindex": 1005
        }, function() {
          $scope.$apply(function() {
            accountService.putSaveUser(function() {
              $scope.accountObj.viewUrl = "view/accountList.html?_=" + new Date().getTime();
              $(this).yAlert({
                "text": '修改成功'
              });
              removeAlert();
              $state.go('systemManage.systemAccount.list');
            }, curSaveData);
          });
        });
      }
    },
    "changeAvaliable": function(id, v) {
      var callback = function(d) {
        $(this).yAlert({
          "text": (v ? '禁用': '启用') + '成功'
        });
        removeAlert();
        $('#couponListsGrid').flexReload();
      }
      accountService.getStatus(id, v, callback);
    },
    "removePop": function() {
      angular.element(".ccmsPublicPop").hide();
      angular.element(".yunat_maskLayer").remove();
    },
    "sureconfigDataRight": function() { //自定义数据权限确定
      var _this = this;
      _this.configDataRightIds = [];
      _this.checkedZtreeview = [];
      _this.defaultCheckedId = [];
      var checkedZtreeData = _this.checkedZtree.getCheckedNodes(true); //获取已选择数据 directive(ztree)定义的
      if (checkedZtreeData) {
        angular.forEach(checkedZtreeData, function(val, key) {
          //var ppCheck = 3;
          //ppCheck = val.parentId && val.getParentNode().check_Child_State;
          if (val.check_Child_State !== 1) {
            _this.configDataRightIds.push(val.id);
            //if(ppCheck !== 2) {
            //    _this.checkedZtreeview.push(val.name);
            //}
            _this.defaultCheckedId.push({
              "id": val.id
            });
          }
        })
      };
      //_this.configDataRight = _this.checkedZtreeview.join(" ");
      _this.configDataRight = '已选择' + _this.configDataRightIds.length + '个部门';
      _this.removePop();
    },
    "canAddAccountMethod": function() {
      accountService.getUserMode(function(response) {
        $scope.accountObj.canAddAccount = response.pageLoginEnabled;
      });
    },
    "unbindAccount": function(id, e) {
      accountService.unbindMethod(function(response) {
        $(this).yAlert({
          "text": "解除绑定成功"
        });
        removeAlert();
        angular.element(e.target).css("visibility", "hidden");
        $('#couponListsGrid').flexReload();
      }, id);
    }
  };

  $scope.accountObj.canAddAccountMethod();

    /*自定义select框*/
  $scope.customSelect = {
    "common": function(data, ele) { //模拟普通的select框
      var $selContent = ele.siblings(".selectContent");
      $selContent.children().remove();
      var eleName = ele.attr("name");
      var $ul = $("<ul>");
      if (data) {
        $selContent.append($ul);
        var len = data.length;
        for (var i = 0; i < len; i++) {
          if (eleName == "campType") {
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].progId + '>' + data[i].progName + '</a></li>')
          } else if (eleName == "investigator") {
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].id + '>' + data[i].name + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            })
          }

        }
        $ul.find("a").bind({
          "click": function() {
            ele.val($(this).text());
            ele.attr("valueId", $(this).attr("id"));
            //$scope.marketLayer.investigatorNameId =
            $selContent.slideUp(200);
          },
          "mouseenter": function() {
            $(this).css({
              "color": "#0083BA",
              "background": "#F2F2F2",
              "text-decoration": "none"
            });
          },
          "mouseleave": function() {
            $(this).css({
              "color": "#3D3D3D",
              "background": "#FFFFFF"
            });
          }
        })
      }
    },
    "commonTree": function(data, ele) { //模拟select框中为树形结构
      var $selContent = ele.siblings(".selectContent");
      $selContent.children().remove();
      var $ul = $("<ul>", {
        "class": "ztree",
        "id": "treeId"
      });
      $selContent.append($ul);
      if (data) {
        function onClick(event, treeId, treeNode) {
          ele.val(treeNode.name);
          ele.attr("valueId", treeNode.id);
          $scope.accountObj.departmentId = treeNode.id;
          $selContent.slideUp(200);
        }
        var setting = {
          data: {
            key: {
              title: "name"
            },
            simpleData: {
              enable: true
            }
          },
          view: { //设置多级样式
            //dblClickExpand: false,父级双击不可点击
            addDiyDom: function(treeId, treeNode) {
              var spaceWidth = 10;
              var switchObj = $("#" + treeNode.tId + "_switch"),
                  icoObj = $("#" + treeNode.tId + "_ico");
              switchObj.remove();
              icoObj.before(switchObj);
              var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
              switchObj.before(spaceStr);
            }
          },
          callback: {
            onClick: onClick
          }
        };
        data.open = true;
        $.fn.zTree.init($ul, setting, data);
      }

    },
    "asynTree": function(data, ele) { //模拟select框中为树形结构，并且数据要做异步处理
    },
    "adapter": function(data) { //适配普通树形结构数据
      var len = data.length;
      var zNodes = [];
      for (var i = 0; i < len; i++) {
        var o = {};
        o.id = data[i].id;
        o.pId = data[i].parentId;
        o.name = data[i].name;
        zNodes.push(o);
        if (data[i].children && data[i].children.length > 0) {
          childNode(data[i].children);
        }
      }

      function childNode(d) {
        for (var i = 0; i < d.length; i++) {
          var o = {};
          o.id = d[i].id;
          o.pId = d[i].parentId;
          o.name = d[i].name;
          zNodes.push(o);
          if (d[i].children && d[i].children.length > 0) {
            childNode(d[i].children);
          }
        }
      }
      return zNodes;
    }
  };
}]);
