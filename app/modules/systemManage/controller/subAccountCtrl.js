angular.module('systemManage.controllers').controller('SubAccountCtrl', ["$scope", "$http", "$compile", "accountService", "$rootScope", '$state', function($scope, $http, $compile, accountService, $rootScope, $state) {
  /*accountService.getSysMgrContent(function(response) {
    if (response.children && response.children.length > 0) {
      angular.forEach(response.children,
        function(val, key) {
          if (val.key.indexOf("departmentId") != -1) {
            $scope.departmentItemIsShow = true;
          } else if (val.key.indexOf("dataPermissionType") != -1) {
            $scope.dataPermissionItemIsShow = true;
          }
        });
    }
  });*/
  $scope.dataPermissionItemIsShow = $scope.departmentItemIsShow = true;
  accountService.getUserMode(function(res) {
    $scope.userModeFlag = res.pageLoginEnabled;
  });
  $scope.selectAll = false;

  $scope.makeRegExp = function(query) {
    return new RegExp(query.trim().split(/\s+/).join('|'), 'i');
  }

  $scope.makeMatcher = function(query) {
    var regexp = $scope.makeRegExp(query);
    return function(element) {
      var keys = $scope.fields;
      for (var i = 0, l = keys.length; i < l; i++) {
        if (regexp.test(element[keys[i]] + '')) return true;
      }
      return false;
    }
  }

  $scope.search = function(srcArr, query) {
    var matcher = $scope.makeMatcher(query);
    return srcArr.filter(matcher);
  }

  $scope.searchActiAccount = function() {
    $scope.fields = ['nick'];
    $scope.subAccountList = $scope.search($scope.forSearchActiAccount, $scope.activityQuery);
  }

  $scope.searchSeleAccount = function() {
    $scope.fields = ['nick'];
    $scope.selectAccounts = $scope.search($scope.forSearchSeleAccount, $scope.selectQuery);
  }

  $scope.selectSubAccount = function() {
    var selectAccount = $scope.subAccountList.filter(function(element) {
      return element.checkState == true;
    });
    $scope.subAccountList = $scope.subAccountList.filter(function(element) {
      return element.checkState == false;
    });
    selectAccount.forEach(function(ele) {
      ele.checkState = false;
    });
    $scope.selectAccounts = $scope.selectAccounts.concat(selectAccount);
    $scope.forSearchSeleAccount = angular.copy($scope.selectAccounts);
    $scope.forSearchActiAccount = angular.copy($scope.subAccountList);
    $scope.checkAllStatus();
  }

  $scope.resetAllStatus = function() {
    $scope.subAccountList.forEach(function(element) {
      element.checkState = $scope.selectAll;
    });
  }

  $scope.clearAll = function() {
    $scope.subAccountList = $scope.forSearchActiAccount.concat($scope.forSearchSeleAccount);
    $scope.forSearchActiAccount = angular.copy($scope.subAccountList);
    $scope.activityQuery = '';
    $scope.selectQuery = '';
    $scope.selectAccounts = [];
    $scope.forSearchSeleAccount = [];
  }

  $scope.removeOne = function(subAccount, index) {
    var singleArr = $scope.selectAccounts.splice(index, 1);
    $scope.subAccountList = $scope.subAccountList.concat(singleArr);
    $scope.forSearchActiAccount = angular.copy($scope.subAccountList);
    $scope.forSearchSeleAccount = angular.copy($scope.selectAccounts);
  }

  $scope.checkAllStatus = function() {
    var sum = 0;
    $scope.subAccountList.forEach(function(element) {
      if (element.checkState === true) {
        sum++;
      }
    });
    if (sum === 0) {
      $scope.selectAll = false;
    } else if (sum === $scope.subAccountList.length) {
      $scope.selectAll = true;
    } else {
      $scope.selectAll = false;
    }
  }

  $scope.sureAddSubAccounts = function() {
    if ($scope.selectAccounts.length === 0) {
      $(this).Alert({
        'title': '',
        'str': '请至少选择一个旺旺帐号',
        'mark': true
      });
      $('.ccmsPublicPopBg').css({
        'z-index':1002
      })
      $('.yunat_maskLayer').eq(1).css({
        'z-index':1001
      })
    } else {
      angular.element(this).Confirm({
        "title": "确认",
        "str": "是否确定将选择的旺旺号添加至CCMS系统，添加后不可删除。",
        "mark": false,
        "eleZindex": 1010,
        "markZindex": 1005
      },
      function() {
        var params = $scope.selectAccounts.map(function(ele) {
          var temp = {
            'id': ele.subid,
            'name': ele.nick
          }
          return temp;
        });
        $("#subAccountSelector").hide();
        $scope.selectAccounts = [];
        angular.element(".yunat_maskLayer:last").remove();
        accountService.sureAddSubAccounts(function(res) {
          $scope.subAccountObj.viewUrl = "view/subAccountList.html?_=" + new Date().getTime();
          $(this).yAlert({
            "text": '修改成功'
          });
          removeAlert();
          $state.reload('systemManage.subAccount.list');
        }, params);
      });
    }
  }

  $scope.getSubAccountList = function() {
    accountService.getSubAccountList(function(data) {
      $scope.subAccountList = data.map(function(element) {
        element.checkState = false;
        return element;
      });
      $scope.subAccountLoadFlag = false;
      $scope.selectAccounts = [];
      $scope.forSearchSeleAccount = [];
      $scope.forSearchActiAccount = angular.copy($scope.subAccountList);
    });
  }

  $scope.addSubAccount = function() {
    $("#subAccountSelector").addInteractivePop({
      magTitle: "选择旺旺账号",
      height: 534,
      mark: true,
      drag: true,
      position: "fixed"
    });

    $scope.selectAll = false;
    $scope.subAccountLoadFlag = true;
    $scope.getSubAccountList();
  }

  $scope.subAccountObj = {
    "disabledFalg": true,
    "viewUrl": "view/subAccountList.html",
    "accountTitle": "",
    "isShow": false,
    "isAdmin": false,
    "upCompile": function(curScope) {
      $compile(angular.element(".listContainer"))($scope || curScope);
      $scope.$apply();
    },
    "changeBindAccount": function() {
      if ($scope.subAccountObj.bindId) {
        var accountInfo = $scope.subAccountObj.sysAccountList.filter(function(ele) {
          return ele.id == $scope.subAccountObj.bindId;
        })[0];
        $scope.subAccountObj.setAccountInfo(accountInfo);
      }
    },
    "setAccountInfo": function(response) {
      var _this = $scope.subAccountObj;
      _this.RoleIds = [];
      _this.RoleVals = [];
      _this.checkedZtreeview = [];
      _this.defaultCheckedId = [];
      _this.configDataRightIds = [];
      if (response.roles) {
        angular.forEach(response.roles, function(val, key) {
          _this.RoleIds.push(val.id);
          _this.RoleVals.push(val.name);
        });
      };
      _this.curUserId = response.id;
      _this.loginName = response.loginName;
      _this.realName = response.realName;
      _this.RoleValsView = _this.RoleVals.join(" ");
      if (response.departmentId) {
        _this.departmentId = response.departmentId;
        accountService.getDepartmentInof(function(res) {
          _this.departmentName = res.name;
        },_this.departmentId);
      } else if (response.department) {
        _this.departmentId = response.department.id;
        _this.departmentName = response.department.name;
      }
      _this.contactPhone = response.mobile ? response.mobile: "";
      _this.loginPassword = response.password ? response.password: "";
      _this.confirmPassword = response.password2 ? response.password2: "";
      _this.remark = response.remark ? response.remark: "";
      _this.dataRight = response.dataPermissionType.id;

      if (response.dataPermissionType.id == 3) { //自定义开关
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
      _this.configDataRight = '已选择' + _this.checkedZtreeview.length + '个部门';
      if (_this.loginName == 'tb_' + _this.nameInPlat) {
        _this.sameAccountFlag = false;
      } else {
        _this.sameAccountFlag = true;
      }
    },
    "setDefault": function() {
      var _this = $scope.subAccountObj;
      _this.RoleIds = [];
      _this.RoleVals = [];
      _this.checkedZtreeview = [];
      _this.defaultCheckedId = [];
      _this.configDataRightIds = [];
      _this.curUserId = null;
      _this.loginName = '';
      _this.realName = '';
      _this.RoleValsView = _this.RoleVals.join(" ");
      _this.departmentName = "";
      _this.contactPhone = "";
      _this.contactEmail = "";
      _this.loginPassword = "";
      _this.confirmPassword = "";
      _this.remark = "";
      _this.dataRight = null;
      _this.sameAccountFlag = true;
      _this.disabledFalg = true;
      _this.configDataRight = '已选择' + _this.checkedZtreeview.length + '个部门';
    },
    "accountMethod": function(f, mappVal) {
      mappVal = mappVal.split(',');
      var _this = this,
        curId = mappVal[0],
        nameInPlat = mappVal[1],
        idInPlat = mappVal[2],
        bound = mappVal[3];
      _this.accountRoleLists = [];
      $rootScope.subNavAry && $rootScope.subNavAry.forEach(function(item, index) {
        if (item.name == "部门管理") {
          _this.isShow = true;
        }
      });
      _this.isAdmin = _this.loginName == "admin" ? true: false; //admin不可更改选项
      _this.accountTitle = "修改旺旺账号";
      _this.nameInPlat = nameInPlat;
      _this.idInPlat = idInPlat;
      if (bound == 'true') {
        _this.curUserId = curId;
        accountService.getCurUser(_this.setAccountInfo, curId);
      } else {
        _this.setDefault();
      }
      $state.go('systemManage.subAccount.edit');
    },
    "getSection": function() { //所属部门
      accountService.getSectionList(this.initSelecion);
    },
    "initSelecion": function(response) {
      $scope.customSelect.commonTree(response, $('[name="accountSection"]'));
    },
    "cancelBtnMethod": function() {
      $state.go('systemManage.subAccount.list');
    },
    "getSysAccountList": function() {
      this.bindId = '';
      $('#sysAccountList').addInteractivePop({
        magTitle: "绑定账号选择",
        width: 1100,
        height: 410,
        mark: true,
        drag: true,
        position: "fixed"
      });
      $('#sysAccountList').find('#sysFlexlist').flexigrid({
        url: GLOBAL_STATIC.systemRoot + 'sys/user/bindable/?',
        method: 'GET',
        dataType: 'json',
        height: 250,
        resizable: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: [{
          display: '',
          name: 'id',
          width: 20,
          sortable: false,
          dataindex: 'id',
          renderer: function(v) {
            return '<input class="mt5 cursorPointer" type="radio" name="sysAccountId" ng-model="subAccountObj.bindId" value="' + v + '"/>';
          }
        },
        {
          display: '账号',
          name: 'loginName',
          width: 183,
          sortable: true,
          dataindex: 'loginName'
        },
        {
          display: '姓名',
          name: 'realName',
          width: 183,
          sortable: true,
          dataindex: 'realName'
        },
        {
          display: '账号角色',
          name: 'role',
          width: 183,
          sortable: false,
          dataindex: 'roles',
          renderer: function(v) {
            var role = [];
            for (i = 0; i < v.length; i++) {
              role.push(v[i].name);
            }
            return '<span title="' + role + '">' + role + '</span>';
          }
        },
        {
          display: '备注',
          name: 'remark',
          width: 183,
          sortable: false,
          align: 'center',
          dataindex: 'remark',
          renderer: function(v) {
            return v == '' ? '': '<a href="javascript:void(0)" class="couponMark" title="' + v + '" onmouseover="viewMark(this,event)" onmouseout="hideMark()"></a>';
          }
        },
        {
          display: '状态',
          name: 'enable',
          width: 183,
          align: 'center',
          dataindex: 'enabled',
          mapping: ['id'],
          convert: function(v, mappVal) {
            return '<a href="javascript:void(0)" style="cursor:default" class="' + (v ? "avaliableTrue": "avaliableFalse") + '"></a>'
          }
        }],
        sortname: '',
        sortorder: "desc",
        buttons: [],
        params: [{
          name: "bindable",
          value: true
        }],
        updateDefaultParam: true,
        searchitems: {
          display: '搜索帐号',
          name: ""
        },
        usepager: true,
        showTableToggleBtn: true,
        colAutoWidth: false,
        useRp: false,
        //use the results per page select box
        onSuccess: function(ele, res) {
          $scope.subAccountObj.sysAccountList = res.data || [];
          var curScope = angular.element("#sysFlexlist").scope();
          $compile(angular.element("#sysAccountList"))($scope || curScope);
          $scope.$apply();
        },
        onError: function(response) {
          var responseText = response.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
//      $("#sysAccountList").find(".pDiv").hide();
//      $("#sysAccountList").find(".search_wrap").css('margin-top', 5);
//      $("#sysAccountList").find(".search_wrap").css('margin-bottom', 4);
    },
    "getRoles": function() { //获取角色列表
      $scope.subAccountObj.accountRoleLists = []; //清空列表，删除之前已选的样式
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
      angular.forEach($scope.subAccountObj.RoleIds, function(val, key) {
        var curVal = val;
        angular.forEach(response,
            function(responseVal, responseKey) {
              if (curVal == responseVal.id) {
                response[responseKey].classVal = "cur";
              }
            });
      });
      $scope.subAccountObj.accountRoleLists = response;
    },
    "sureAddRole": function() {
      $scope.subAccountObj.RoleIds = [];
      $scope.subAccountObj.RoleVals = [];
      var curElement = angular.element(".unitLists .cur a");
      curElement.each(function() {
        $scope.subAccountObj.RoleIds.push(Number(angular.element(this).attr("id")));
        $scope.subAccountObj.RoleVals.push(angular.element(this).text());
      });
      $scope.subAccountObj.RoleValsView = $scope.subAccountObj.RoleVals.join(" ");
      this.removePop();
    },
    "getConfigData": function() {
      var CurAccountData = {
        id: this.curUserId,
        loginName: this.loginName,
        departmentId: this.departmentId || null,
        email: this.contactEmail ? this.contactEmail: "",
        mobile: this.contactPhone ? this.contactPhone: "",
        realName: this.realName,
        roleIds: this.RoleIds ? this.RoleIds: [],
        password: this.loginPassword,
        password2: this.confirmPassword,
        remark: this.remark,
        dataPermissionType: Number(this.dataRight),
        nameInPlat: this.nameInPlat,
        idInPlat: this.idInPlat,
        //dataPermissionType: 1,
        permissionedDepartments: this.configDataRightIds ? this.configDataRightIds: []
      }
      return CurAccountData;
    },
    "sure_btn": function() { //确认新建账号
      var curSaveData = this.getConfigData();
      if (angular.element("#accountForm label.initError").css("display") == "inline") {
        return false
      }
      //修改旺旺子账号保存
      angular.element(this).Confirm({
        "title": "确认",
        "str": "确定保存修改后的账号信息吗？",
        "mark": true,
        "eleZindex": 1010,
        "markZindex": 1005
      }, function() {
        $scope.$apply(function() {
          accountService.putSaveUser(function() {
                $scope.subAccountObj.viewUrl = "view/subAccountList.html?_=" + new Date().getTime();
                $(this).yAlert({
                  "text": '修改成功'
                });
                removeAlert();
                $state.go('systemManage.subAccount.list');
              },
              curSaveData);
        });
      });
    },
    "removePop": function() {
      angular.element(".ccmsPublicPop").hide();
      angular.element(".yunat_maskLayer").remove();
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
      $scope.subAccountObj.checkedZtree = $.fn.zTree.init($(".zTreeBoxStyle"), setting, response);
      $scope.subAccountObj.setDefaultTreeNode($scope.subAccountObj.checkedZtree, $scope.subAccountObj.defaultCheckedId);
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
    "sureconfigDataRight": function() { //自定义数据权限确定
      var _this = this;
      _this.configDataRightIds = [];
      _this.checkedZtreeview = [];
      _this.defaultCheckedId = [];
      var checkedZtreeData = _this.checkedZtree.getCheckedNodes(true); //获取已选择数据 directive(ztree)定义的
      if (checkedZtreeData) {
        angular.forEach(checkedZtreeData,
            function(val, key) {
              if (val.check_Child_State !== 1) {
                _this.configDataRightIds.push(val.id);
                _this.defaultCheckedId.push({
                  "id": val.id
                });
              }
            })
      };
      _this.configDataRight = '已选择' + _this.configDataRightIds.length + '个部门';
      _this.removePop();
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
    }
  };

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
          $scope.subAccountObj.departmentId = treeNode.id;
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
