(function (){
  var directives = angular.module('commondirectives', []);
//角色管理左边的tree
directives.directive('roleTree', ['$http', function($http) {
  return {
    link: linkFn,
    priority: 300
  };

  function linkFn(scope, elem, attrs) {
    var tree = scope.tree;
    settings = scope.treeSettings;
    //角色管理的右键点击处理函数
    settings.edit.enable = false;
    scope.treeType = 'roleTree';
    scope.initTree = function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].iconSkin = "roleIcon";
      }
      var fixedNode = data.splice(0, 1);
      data.push(fixedNode[0]);
      $.fn.zTree.init(elem, scope.treeSettings, data);
      //管理员置顶 issue：CCMSQY-1216
      var topNode = tree.getNodeByParam("name", "系统管理员");
      tree.moveNode(tree.getNodes()[0], topNode, 'prev');
      scope.lastFixedNode = tree.getNodes()[tree.getNodes().length - 1];
    }
    //  scope.$watch('treeNodes', function(data){
    //     if(data) {
    //     }
    // });
    scope.nodeClick = function(event, treeId, treeNode) {

      scope.getRoles.getRolesById(treeNode.id, treeNode);
    };

    scope.reCreateDom = function(treeId, treeNode) {
      var spaceWidth = 10;
      var switchObj = $("#" + treeNode.tId + "_switch"),
          icoObj = $("#" + treeNode.tId + "_ico");
      icoObj.before(switchObj);
      switchObj.remove();
      // var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * (scope.hasOutRoot ? treeNode.level - 1 : treeNode.level)) + "px'></span>";
      // switchObj.before(spaceStr);
    }

  }
}]);

//部门管理左边的tree
directives.directive("departmentTree", function() {
  return {
    link: linkFn,
    priority: 100
  };

  function linkFn(scope, elem, attrs) {
    var tree = scope.tree;
    var settings = scope.treeSettings;
    scope.treeType = 'departmentTree';
    scope.FIXNODENAME = "默认部门";
    scope.rootExpanded = true;
    //右键菜单显示
    settings = {
      view: {
        // addDiyDom: _reCreateDom,
        dblClickExpand: false,
        showIcon: false
      },
      edit: {
        enable: false
        // showRenameBtn: false,
        // showRemoveBtn: false
      }
    };
    scope.initTree = function(data) {
      data.children[0]["name"] = "旺旺账号登录"; //临时更改数据，正式上线请删除
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };
    scope.inner = function(treeId, nodes, targetNode) {
      if (!targetNode || targetNode.level == "1" && targetNode.isLastNode) {
        return false;
      }
      return true;
    };
    scope.nodeClick = function(event, treeId, treeNode) {
      scope.getShops.getShopsById(treeNode.id, treeNode);
    };
    scope.isCanDrap = function(treeId, treeNodes) {

    };

    scope.reCreateDom = function(treeId, treeNode) {
      var spaceWidth = 10;
      var switchObj = $("#" + treeNode.tId + "_switch"),
          icoObj = $("#" + treeNode.tId + "_ico");
      switchObj.remove();
      icoObj.before(switchObj);
      var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * (scope.hasOutRoot ? treeNode.level - 1 : treeNode.level)) + "px'></span>";
      switchObj.before(spaceStr);

    }
  }
});

directives.directive("outRootTree", function() {
  return {
    link: linkFn,
    priority: 100
  };

  function linkFn(scope, elem, attrs) {
    var tree = scope.tree;
    scope.menuType =attrs.isname=="partition"?"目录":"分类";
    scope.treeType = 'rootTree';
    scope.initTree = function(data) {
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };
    scope.inner = function(treeId, nodes, targetNode) {
      if (!targetNode || targetNode.level == "1" && targetNode.isLastNode) {
        return false;
      }
      return true;
    };
    scope.nodeClick = function(event, treeId, treeNode, flag) { // flag 判断是哪个ztree
      var grid = angular.element(".flexigrid");
      //scope.$broadcast("updateGridEvent", treeNode.id);
      if (flag == "activity") { //活动选择器
        angular.element(".commActivityPlug").scope().activityScopeObj.updateActivityById(treeNode.id);
      } else if (flag == "activityNode") { // 客户分组节点
        if (angular.element(".customerGroupNodePage").length > 0) {
          angular.element(".customerGroupNodePage").scope().customgroupScopeObj.updateGroupById(treeNode.id);
        } else {
          // 查询节点客服分组
          angular.element(".queryCustomerGroupClass").scope().queryCustomerGroupObj.updateGroupById(treeNode.id);
        }
      }else if(flag=="customerNode"){
        angular.element(".queryCustomerGroupClass").scope().queryCustomerGroupObj.updateGroupById(treeNode.id,1);
      } else {
        if (grid.length > 0) {
          grid.scope().searchObj.updateFromTreeClick(treeNode.id);
        }
      };
    };
    scope.isCanDrap = function(treeId, treeNodes) {

    };
    scope.reCreateDom = function(treeId, treeNode) {
      var spaceWidth = 10;
      var switchObj = $("#" + treeNode.tId + "_switch"),
          icoObj = $("#" + treeNode.tId + "_ico");
      switchObj.remove();
      icoObj.before(switchObj);
      var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * (scope.hasOutRoot ? treeNode.level - 1 : treeNode.level)) + "px'></span>";
      switchObj.before(spaceStr);
    }
  }
});
directives.directive("checkTipTree", function() {
  return {
    link: linkFn,
    priority: 300
  };

  function linkFn(scope, elem, attrs) {
    var settings = {};
    settings = {
      check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: {
          "Y": "ps",
          "N": "ps"
        },
        chkDisabledInherit: true,
        nocheckInherit: true
      },
      data: {
        key: {
          title: "remark"
        }
      },
      view: {
        addDiyDom: _reCreateDom,
        dblClickExpand: false,
        showIcon: false
      },
      callback: {
        onCheck: onCheck
      },
      edit: {
        enable: false

      }
    };
    var tree = scope.tree;
    scope.treeType = "checkTree";

    function onCheck(event, treeId, treeNode) {

    };
    scope.initTree = function(data) {
      //open=true
      for (i = 0; i < data.length; i++) {
        data[i].open = true;
      }
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };
    scope.getCheckByName = function(names) {
      tree.checkAllNodes(false);
      for (var i = 0; i < names.length; i++) {
        var node = tree.getNodesByParam("id", names[i].id)[0];
        if (node) {
          tree.checkNode(node, true, false);
        }
      }
    };
    scope.setCheckDisabled = function(disabled, inheritParent, inheritChildren) {
      var nodes = tree.getNodes();
      for (var i in nodes) {
        tree.setChkDisabled(nodes[i], disabled, inheritParent, inheritChildren);
      }
    }
    //获取选中的节点
    scope.getCheckedNodes = function() {
      return tree.getCheckedNodes(true);
    };

    function _reCreateDom(treeId, treeNode) {
      var spaceWidth = 50;
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
      //  $('#aaa_1_a').children().removeClass();
    }

    scope.treeSettings = angular.extend(scope.treeSettings, settings);
  }
});
directives.directive("checkTree", function() {
  return {
    link: linkFn,
    priority: 300
  };

  function linkFn(scope, elem, attrs) {
    var settings = {};
    settings = {
      check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: {
          "Y": "ps",
          "N": "ps"
        },
        chkDisabledInherit: true,
        nocheckInherit: true
      },
      view: {
        addDiyDom: _reCreateDom,
        dblClickExpand: false,
        showIcon: false
      },
      callback: {
        onCheck: onCheck
      },
      edit: {
        enable: false

      }
    };
    var tree = scope.tree;
    scope.treeType = "checkTree";

    function onCheck(event, treeId, treeNode) {

    };
    scope.initTree = function(data) {
      //open=true
      for (i = 0; i < data.length; i++) {
        data[i].open = true;
      }
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };
    scope.getCheckByName = function(names) {
      tree.checkAllNodes(false);
      for (var i = 0; i < names.length; i++) {
        var node = tree.getNodesByParam("name", names[i].name)[0];
        if (node) {
          tree.checkNode(node, true, false);
        }
      }
    };
    scope.setCheckDisabled = function(disabled, inheritParent, inheritChildren) {
      var nodes = tree.getNodes();
      for (var i in nodes) {
        tree.setChkDisabled(nodes[i], disabled, inheritParent, inheritChildren);
      }
    }
    //获取选中的节点
    scope.getCheckedNodes = function() {
      return tree.getCheckedNodes(true);
    };

    function _reCreateDom(treeId, treeNode) {
      var spaceWidth = 50;
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
      //  $('#aaa_1_a').children().removeClass();
    }

    scope.treeSettings = angular.extend(scope.treeSettings, settings);
  }
});

//ztree的右键菜单
directives.directive('ztreemenu', function() {
  return {
    template: '<div class="market_tree_menu grey_border" id="tree_menu"> <div  id="tree_node_add" class="market_tree_menu_item" ng-click="addNode()">增加{{menuType}}</div> <!-- <div  id="tree_node_remove" class="market_tree_menu_item tree_menu move_item" ng-click="removeNode()">移动{{menuType}}</div> --> <div  id="tree_node_remove" class="market_tree_menu_item" ng-click="removeNode()">删除{{menuType}}</div> <div  id="tree_node_rename" class="market_tree_menu_item" ng-click="renameNode()">重命名</div> </div>',
    link: linkFn,
    replace: true
  };

  function linkFn(scope, elem, attrs) {
    //将菜单存入scope,好在ztree的directive里可以调用
    scope.menu = new Menu();

    function Menu() {
      var el = elem;
      //增删改button
      var addBtn = el.find('#tree_node_add');
      var removeBtn = el.find('#tree_node_remove');
      var renameBtn = el.find('#tree_node_rename');
      this.show = function(type, x, y, e) {
        el.show();
        addBtn.show();
        removeBtn.show();
        renameBtn.show();
        //非节点
        if (type == "root") {
          removeBtn.hide();
          renameBtn.hide();
          //节点
        } else if (type.typeId && type.typeId == 2) { //分组查询右键配置
          if (type.pId == null) {
            addBtn.hide();
          } else {
            el.hide();
          }
        } else {
          removeBtn.show();
          renameBtn.show();
        }
        var ztreeMenuScrollTop = el.siblings(".market_tree_wrapper").scrollTop() || 0,
            ztreeMenuScrollLeft = el.siblings(".market_tree_wrapper").scrollLeft() || 0,
            maxMenuHeight = e.clientY + 80;
          el.css({
            "top": maxMenuHeight > $(window).height() ? (y - ztreeMenuScrollTop - 60) + "px": (y - ztreeMenuScrollTop) + "px",
            "left": (x - ztreeMenuScrollLeft) + "px",
            "dispaly": "block"
          });

        $("body").bind("mousedown", onBodyMouseDown);
      };

      this.hide = function() {
        //return;
        el.hide();
        $("body").unbind("mousedown", onBodyMouseDown);
      };

      function onBodyMouseDown(event) {
        if (! (event.target.id == "tree_menu" || $(event.target).parents("#tree_menu").length > 0) || event.target.className == "") {
          //el.css({"visibility" : "hidden"});
          el.hide();
        }
      }
    }
  }
});
//客户分群右键菜单
directives.directive('partitionZtreeMenu', [function() {
  return {
    template: '<div class="market_tree_menu grey_border" id="tree_menu">\
                   <div  id="tree_node_add" class="market_tree_menu_item" ng-click="addNode()">增加{{menuType}}</div>\
                   <div  id="tree_node_remove" class="market_tree_menu_item" ng-click="removeNode()">删除{{menuType}}</div>\
                   <div  id="tree_node_rename" class="market_tree_menu_item" ng-click="renameNode()">重命名</div> </div>',
    link: linkFn,
    replace: true
  };

  function linkFn(scope, elem, attrs) {
    //将菜单存入scope,好在ztree的directive里可以调用
    scope.menu = new Menu();
    function Menu() {
      var el = elem;
      //增删改button
      var addBtn = el.find('#tree_node_add');
      var removeBtn = el.find('#tree_node_remove');
      var renameBtn = el.find('#tree_node_rename');
      this.show = function(type, x, y, e, node) {
        el.show();
        addBtn.show();
        removeBtn.show();
        renameBtn.show();
        console.log(node)
        //非节点
        if (type == "root") {
          addBtn.show();
          removeBtn.hide();
          renameBtn.hide();
          //节点
        } else if (type.typeId && type.typeId == 2) { //分组查询右键配置
          if (type.pId == null) {
            addBtn.hide();
          } else {
            el.hide();
          }
        }else {
          removeBtn.show();
          renameBtn.show();
        }
        if (node && node !== null) {
        //系统内置目录和默认目录不可删除或重命名
          if (node.level==1 && node.categoryType ==1) {
            removeBtn.hide();
            renameBtn.hide();
          }
          //内置目录下系统自带子目录不可增删改
          if(node.level==2&&node.categoryType==1){
            el.hide();
          }
          //内置目录下自定义目录不可add
          if(node.level==2&&node.categoryType ==0){
            addBtn.hide();
          }

        }
        var ztreeMenuScrollTop = el.siblings(".market_tree_wrapper").scrollTop() || 0,
          ztreeMenuScrollLeft = el.siblings(".market_tree_wrapper").scrollLeft() || 0,
          maxMenuHeight = e.clientY + 80;
        if(attrs.pos=="changeTop"){
          el.css({
            "top": maxMenuHeight > $(window).height() ? (y - ztreeMenuScrollTop - 60)-5 + "px": (y - ztreeMenuScrollTop)-5 + "px",
            "left": (x - ztreeMenuScrollLeft) + "px",
            "dispaly": "block"
          });
        }else{
          el.css({
            "top": maxMenuHeight > $(window).height() ? (y - ztreeMenuScrollTop - 60) + "px": (y - ztreeMenuScrollTop) + "px",
            "left": (x - ztreeMenuScrollLeft) + "px",
            "dispaly": "block"
          });
        }
        $("body").bind("mousedown", onBodyMouseDown);
      };

      this.hide = function() {
        //return;
        el.hide();
        $("body").unbind("mousedown", onBodyMouseDown);
      };

      function onBodyMouseDown(event) {
        if (! (event.target.id == "tree_menu" || $(event.target).parents("#tree_menu").length > 0) || event.target.className == "") {
          //el.css({"visibility" : "hidden"});
          el.hide();
        }
      }
    }
  }
}]);
//活动节点的tree
directives.directive('ztree', function() {
  //暂存对象
  var timeFlag, menu;

  //暂存查找到的对象
  var storeNodes = [];
  return {
    link: linkFn,
    priority: 200
  };

  function linkFn(scope, elem, attrs) {
    //var offsetPos = elem.offset();
    //右键事件
    var tree;
    var settings = {};
    //暂存拖拽过程中的节点信息保存
    //newP, id, pLevel,
    var dragInfo = {},
        isExisted = false,
    //暂存影藏的节点
        hideNodes = [],
        rootId = 0,
        fixedNode;

    settings.callback = {
      // beforeClick: beforeClick,
      onDblClick: onDblClick,
      onClick: onClick,
      onRightClick: onRightClick,
      beforeRename: beforeRename,
      onRename: onRename,
      beforeRemove: beforeRemove,
      onRemove: onRemove,
      beforeDrag: beforeDrag,
      beforeDragOpen: function() {
        return false;
      },
      // beforeDrop: beforeDrop,
      onDrop: onDrop
    };
    settings.view = {
      dblClickExpand: false,
      addDiyDom: _reCreateDom,
      cutomDeleteElement: true // 自定义增加、重命名 删除按钮
    };
    settings.edit = {
      enable: true,
      drag: {
        autoExpandTrigger: false,
        isCopy: true,
        isMove: true,
        //设置插入状态
        prev: function(treeId, nodes, targetNode) {
          return scope.prev(treeId, nodes, targetNode);

        },
        next: function(treeId, nodes, targetNode) {
          return scope.prev(treeId, nodes, targetNode);
        },
        inner: function(treeId, nodes, targetNode) {
          return scope.inner(treeId, nodes, targetNode);
        }
      },
      showRenameBtn: false,
      showRemoveBtn: false
    };

    if (attrs.ztree == "dragFalse") { // 设置是否可拖拽
      settings.edit.enable = false;
    }
    //基类覆盖方法
    scope.prev = function(treeId, nodes, targetNode) {
      return false;
    };
    scope.next = function(treeId, nodes, targetNode) {
      return false;
    };
    scope.inner = function(treeId, nodes, targetNode) {
      return false;
    };
    scope.isCanDrap = function(treeId, treeNodes) {

    };
    scope.treeSettings = angular.extend(scope.treeSettings, settings);
    //服务器获取数据，更新数
    scope.$watch("treeNodes", function(data) {
      if (!data) {
        return;
      }
      // rootId = data[0].id;
      //初始化树
      if (data) {
        scope.initTree(data);
      }
      if (scope.FIXNODENAME) {
        fixedNode = tree.getNodesByParam("name", scope.FIXNODENAME, null)[0];
        resetFixedNode();
      }
      if (scope.hasOutRoot) {
        //把root节点移动到外面
        resetRootNode();
      }
      if (scope.treeType == "roleTree" || scope.treeType == "departmentTree") {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.selectNode(root);
        if (scope.treeType == "roleTree") {
          scope.getRoles.getRolesById(root.id, root);
        }
        if (scope.treeType == "departmentTree") {
          scope.getShops.getShopsById(root.id, root);
        }

      }
      if (scope.rootExpanded) {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.expandNode(root, true);
      }
      if (scope.treeType == "checkTree") {
        //  scope.tree.expandAll(true);
      }
    });
    scope.initTree = function(data) {
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };

    function resetFixedNode() {
      var nodes = tree.getNodesByParam('level', 1);
      var lastNode = nodes[nodes.length - 1];
      tree.moveNode(lastNode, fixedNode, 'next');
    }

    function resetRootNode() {
      $('#aaa_1_a').addClass('root_node').after("<div class='root_node_line'></div>");
      $('#aaa_1_a').children().removeClass();
    }

    //树中的rename文本框格式限制
    elem.find('input').live(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', checkInput);
    elem.find('input').live('keyup',
        function(event) {
          checkInput(event);
        });
    tree = $.fn.zTree.init(elem, scope.treeSettings);
    scope.tree = tree;
    //树中的rename文本框
    var reg = /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)+$/g;
    var nReg = /[^\u4e00-\u9fa5a-zA-Z0-9ü\s]/g;

    function checkInput(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      if (nReg)
      //如果从复制过来的不合规范的内容
        if (nReg.test(val) || val.length > 20) {
          val = val.replace(nReg, "");
          event.target.value = val;
        }
      if (val.length > 20) {
        val = val.slice(0, 20);
        event.target.value = val;
      }
    }

    function onClick(event, treeId, treeNode) {
      scope.nodeClick(event, treeId, treeNode);
    }

    //判断是根节点和"未分类"节
    function isFixedNode(node) {
      if (node.level == "1" && node.isLastNode) {
        return true;
      } else {
        return false;
      }
    }

    //双击节点展开/闭合
    function onDblClick(event, treeId, treeNode) {
      if (scope.hasOutRoot && !treeNode.level) {
        return;
      }
      if (event.target.id.match('switch') || event.target.id.match('check')) {
        return false;
      }
      tree.expandNode(treeNode, treeNode.open ? false: true);
    }

    //根节点和"未分类"节点拖动
    function beforeDrag(treeId, treeNodes) {
      if (!treeNodes[0].parentChangeable && scope.treeType == 'departmentTree') {
        return false;
      } else {
        if (!treeNodes[0].parentTId || treeNodes[0] == fixedNode) {
          return false;
        }
        return scope.isCanDrap(treeId, treeNodes);
      }
    }

    function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
      if (!targetNode) {
        return;
      }

      var toOut = false,
          toPid, level;
      //树的层级遍历
      //暂存树节点，暂存每层节点数
      var storeNodes = treeNodes,
          tempStoreNodes = treeNodes;
      //dragInfo.pos表示插入方式，前后中
      var level = scope.hasOutRoot ? targetNode.level: targetNode.level + 1;
      // preParent = treeNodes[0].getParentNode();
      scope.moveNode(treeNodes[0].id, targetNode.id, successSer,
          function(res) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": res.message || "移动错误",
              "mark": true
            });
            // tree.moveNode(preParent, treeNodes[0],'inner');
          });

      function successSer() {
        if (targetNode.level == 0 && fixedNode) {
          tree.moveNode(fixedNode, treeNodes[0], 'prev');
        }
        //树的广度优先遍历算法
        while (storeNodes.length) {
          //暂存每层的节点
          var tempStore = [];
          for (var i = 0; i < storeNodes.length; i++) {
            resetPos(storeNodes[i].tId);
            if (storeNodes[i].children && storeNodes[i].children.length > 0) {
              tempStore = tempStore.concat(storeNodes[i].children);
            }
          }
          level++;
          //进行遍历下一层
          storeNodes = tempStore;
        }
      }

      //重新设置位置
      function resetPos(id, treeNodes) {
        $("#" + id + "_a")[0].childNodes[0].style.width = level * 10 + "px";
      }
    }

    //删除前
    function beforeRemove(treeId, treeNode) {
      if (treeNode) {

      }
    }

    function onRemove(e, treeId, treeNode) {}

    //改名后
    //检查名字重复
    function _checkNameExist(name) {
      var reg = new RegExp("^" + name + "$");
      var treeNodes = scope.treeNodes;
      for (var i = 0; i < treeNodes.length; i++) {
        if (reg.test(treeNodes[i].name)) {
          return true;
        }
      }
      return false;
    }

    function onRename(e, treeId, treeNode, isCancel) {
      $(this).yAlert({"text": "加载数据，请稍等..."});
      //新增加的节点
      if (!treeNode.id) {
        //上传父节点的id
        var nId = treeNode.getParentNode() ? treeNode.getParentNode().id: 0;
        tree._nodeService({
          newParentId: nId,
          name: treeNode.name
        }, function(res) {
          if(removeSetVar){
            clearTimeout(removeSetVar);
          }
          var removeSetVar=setTimeout(function() {
            $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
            $(".yunat_maskLayer").first().remove();
          }, 0);
          if(scope.lastFixedNode) {
            scope.lastFixedNode = treeNode;
          }
          if (scope.treeType == 'departmentTree' && res) {
            if (res.id) {
              treeNode.id = res.id;
            }
            return treeNode.parentable = res.parentable;
          } else {
            if (res.id) {
              treeNode.id = res.id;
            }
          }

        }, function(res) {
          if(removeSetVar){
            clearTimeout(removeSetVar);
          }
          var removeSetVar=setTimeout(function() {
            $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
            $(".yunat_maskLayer").first().remove();
          }, 0);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": res.message || "错误",
            "mark": true
          }, edit, edit);

          function edit() {
            tree.editName(treeNode);
          }

          return;
        });
      } else {
        //否则重新命名
        tree._nodeService(treeNode.id, {
          name: treeNode.name
        }, function(res) {
          if(removeSetVar){
            clearTimeout(removeSetVar);
          }
          var removeSetVar=setTimeout(function() {
            $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
            $(".yunat_maskLayer").first().remove();
          }, 0);
          if (res.id) {
            treeNode.id = res.id;
          }
        }, function(res) {
          if(removeSetVar){
            clearTimeout(removeSetVar);
          }
          var removeSetVar=setTimeout(function() {
            $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
            $(".yunat_maskLayer").first().remove();
          }, 0);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": res.message || "错误",
            "mark": true
          }, edit, edit);

          function edit() {
            tree.editName(treeNode);
          }

          return;
        });
      }
    }

    //防止改名字为空
    var checkBlankFlag = false;

    function beforeRename(treeId, treeNode, newName, isCancel) {
      if (/\s/g.test(newName) && $(".yunat_maskLayer").length == 0) {
        checkBlankFlag = true;
        $(this).Alert({
          "title": "错误提示",
          "str": "名称中不能包含空格",
          "mark": true
        }, function() {
          tree.editName(treeNode);
          checkBlankFlag = false;
        });
      };

      if ($.trim(newName).length == 0 || checkBlankFlag) {
        return false;
      }
      return true;
    }

    //重新构建数节点
    function _reCreateDom(treeId, treeNode) {
      scope.reCreateDom(treeId, treeNode);

    }

    //右键事件触发，判断是否显示菜单
    function onRightClick(event, treeId, treeNode) {
      if (!scope.canShowMenu || treeNode == fixedNode) {
        return;
      }
      var offsetPos = elem.offset();
      menu = scope.menu;
      if (treeNode && scope.treeType == "roleTree") {
        if (treeNode.name == "管理员" || treeNode.name == "系统管理员") { // 管理员不给操作
          tree.selectNode(treeNode);
        } else {
          tree.selectNode(treeNode);
          //menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event);
          menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event, treeNode);
        }
        return null;
      }
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0 || tree.isRootNode(treeNode)) {
        tree.cancelSelectedNode();
        //位置可以微调
        menu.show("root", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event);
      } else if (treeNode.level == "0" && treeNode.isLastNode) {
        //"未分类"节点
        tree.selectNode(treeNode);
      } else if (treeNode) {
        tree.selectNode(treeNode);
        menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event, treeNode);
      }
    }

    tree.isRootNode = function(treeNode) {
      if (!treeNode.parentTId) {
        return true;
      } else {
        return false;
      }
    };
    //查找节点并展开
    tree.searchNode = function(searchValue) {
      var pNode, allNodes, searchNodes;

      allNodes = this.getNodesByParamFuzzy('name', '');

      resetNode();
      //清空选中的节点
      this.cancelSelectedNode();
      searchNodes = this.getNodesByParamFuzzy('name', searchValue);

      checkPassNode();
      hideAndExpandNode();
      //重置节点的状态
      //从2开始去除根节点和未分类节点
      function resetNode() {
        //删除路径查找标记
        for (var i = 0; i < allNodes.length; i++) {
          delete allNodes[i].isPass;
        }
        for (var i = 0; i < hideNodes.length; i++) {
          scope.tree.showNode(hideNodes[i]);
        }
        $(".defaultWrapztree > li > a").find(".button").remove();
      }

      //检查路径上的节点
      function checkPassNode() {
        //查找路径上的node，并标记
        for (var i = 0; i < searchNodes.length; i++) {
          pNode = searchNodes[i];
          if (pNode.isPass === undefined) {
            //暂存为最底层的节点
            pNode.isPass = -1;
          }
          while (pNode = pNode.getParentNode()) {
            //已经在路径上
            if (pNode.isPass === 1) {
              break;
            } else {
              //标记在路径上
              pNode.isPass = 1;
            }
          }
        }
      }

      //隐藏同时展开节点
      function hideAndExpandNode() {
        var node;
        for (var i = 0; i < allNodes.length; i++) {
          if (allNodes[i].isPass === undefined) {
            scope.tree.hideNode(allNodes[i]);
            //暂存隐藏的节点
            hideNodes.push(allNodes[i]);
          }
          if (allNodes[i].isPass === -1) {
            node = allNodes[i].isParentNode ? allNodes[i] : allNodes[i].getParentNode();
            scope.tree.expandNode(node, true);
          }
        }
      }
    };
    //插入节点
    tree.addNode = function(server, flag) { //flag判断添加根目录
      var isCurrentEditor = tree.getNodeByParam('editNameFlag', true);
      if(isCurrentEditor) {
        // 正在编辑
        console.log('不可编辑多个');
        return '不可编辑多个';
      };
      tree._nodeService = server;
      var node, parentNode, addedNode;
      timeFlag = new Date().getTime();
      if (!flag) {
        menu.hide();
        parentNode = tree.getSelectedNodes()[0] || tree.getNodes()[0];
      } else {
        parentNode = tree.getNodes()[0];
      };
      //插入的节点,t为时间标记，用于查找节点
      node = {
        t: timeFlag,
        name: ""
        //sParent: true
      };
      if (scope.treeType == 'departmentTree' && !flag) {
        if (!parentNode.parentable) {
          $(this).Alert({
            "title": "不允许增加",
            "str": "预置部门中不允许添加子部门",
            "mark": true
          });
        } else {
          tree.addNodes(parentNode, node);
        }
      } else {
        tree.addNodes(parentNode, node);
      }
      //获取昂才插入的节点
      var addedNode = tree.getNodesByParam('t', timeFlag)[0];
      if (addedNode.level == 1 && fixedNode) {
        tree.moveNode(fixedNode, addedNode, 'prev');
      } else if(scope.lastFixedNode) {
        tree.moveNode(scope.lastFixedNode, addedNode, 'next');
      }
      // //如果为展开
      // if(!addedNode.open)
      //延时300mm显示编辑框
      setTimeout(function() {
            tree.editName(addedNode);
          },
          100);
    };
    //删除节点
    tree.deleteNode = function(server) {
      menu.hide();
      var nodes = tree.getSelectedNodes();
      var tipstr = '';
        if (nodes && nodes.length > 0) {
            server(nodes[0].id, nodes[0].name,
                function() {
                  tree.removeNode(nodes[0]);
                  $(this).Alert({
                    "title": "删除成功",
                    "str": "删除成功",
                    "mark": true
                  });
                },
                function(res) {
                  if (scope.treeType == 'roleTree') {
                    $(this).Alert({
                      "title": "不允许删除",
                      "str": "有账号正在使用该角色，不允许删除",
                      "mark": true
                    });
                  } else if (scope.treeType == 'departmentTree') {
                    $(this).Alert({
                      "title": "不允许删除",
                      "str": res.message,
                      "mark": true
                    });
                  } else {
                    $(this).Alert({
                      "title": httpTitle || "提示",
                      "str": res.message || '当前分类下存在子分类和活动，无法删除',
                      "mark": true
                    });
                  }
                  return;
                }, nodes[0].count, nodes[0].children);
        }
    };
    //改节点名字
    tree.renameNode = function(server) {
      menu.hide();
      //暂存服务器交互，实际的调用在onrename
      tree._nodeService = server;
      var node = tree.getSelectedNodes()[0];
      node.oldName = node.name;
      tree.editName(node);
    };
    //展开节点
    tree.expand = function(node) {
      //nodes = tree.getSelectedNodes();
      tree.expandNode(node, true)
    };
    //关闭展开节点
    tree.collapse = function(node) {
      tree.expandNode(node, false);
    };
  }
});
//分群右侧tree
directives.directive('partitionZtree', function() {
  //暂存对象
  var timeFlag, menu;

  //暂存查找到的对象
  var storeNodes = [];
  return {
    link: linkFn,
    priority: 200
  };

  function linkFn(scope, elem, attrs) {
    //var offsetPos = elem.offset();
    //右键事件
    var tree;
    var settings = {};
    //暂存拖拽过程中的节点信息保存
    //newP, id, pLevel,
    var dragInfo = {},
      isExisted = false,
    //暂存影藏的节点
      hideNodes = [],
      rootId = 0,
      fixedNode;
      scope.FIXNODENAME="默认"

    settings.callback = {
      // beforeClick: beforeClick,
      onDblClick: onDblClick,
      onClick: onClick,
      onRightClick: onRightClick,
      beforeEditName: beforeEditName,//编辑节点前
      beforeRename: beforeRename,
      onRename: onRename,
      beforeRemove: beforeRemove,
      onRemove: onRemove,
      beforeDrag: beforeDrag,
      beforeDragOpen: function() {
        return false;
      },
      // beforeDrop: beforeDrop,
      onDrop: onDrop
    };
    settings.view = {
      dblClickExpand: false,
      addDiyDom: _reCreateDom,
      cutomDeleteElement: true // 自定义增加、重命名 删除按钮
    };
    settings.edit = {
      enable: true,
      drag: {
        autoExpandTrigger: false,
        isCopy: true,
        isMove: true,
        //设置插入状态
        prev: function(treeId, nodes, targetNode) {
          return scope.prev(treeId, nodes, targetNode);

        },
        next: function(treeId, nodes, targetNode) {
          return scope.prev(treeId, nodes, targetNode);
        },
        inner: function(treeId, nodes, targetNode) {
          return scope.inner(treeId, nodes, targetNode);
        }
      },
      showRenameBtn: false,
      showRemoveBtn: false
    };

    if (attrs.ztree == "dragFalse") { // 设置是否可拖拽
      settings.edit.enable = false;
    }
    //基类覆盖方法
    scope.prev = function(treeId, nodes, targetNode) {
      return false;
    };
    scope.next = function(treeId, nodes, targetNode) {
      return false;
    };
    scope.inner = function(treeId, nodes, targetNode) {
      return false;
    };
    scope.nodeClick = function(event, treeId, treeNode) {
      scope.options.categoryId=treeNode.id;
      scope.options.page=1;
      if(scope.partitionListObj.isCardShow){
        scope.partitionListObj.getCardDataList(scope.options);
      }else{
         var grid = angular.element(".flexigrid");
         grid.scope().searchParObj.updateFromTreeClick(treeNode.id);

      }

    };
    scope.isCanDrap = function(treeId, treeNodes) {

    };
    scope.treeSettings = angular.extend(scope.treeSettings, settings);
    //服务器获取数据，更新数
    scope.$watch("treeNodes", function(data) {
      if (!data) {
        return;
      }
      // rootId = data[0].id;
      //初始化树
      if (data) {
        scope.initTree(data);
      }
      if (scope.FIXNODENAME) {
        fixedNode = tree.getNodesByParam("o_name", scope.FIXNODENAME, null)[0];
        resetFixedNode();
      }
      if (scope.hasOutRoot) {
        //把root节点移动到外面
        resetRootNode();
      }
      //返回时选中原来选择的目录
      if(scope.options.categoryId){
        selNode=tree.getNodeByParam("id",scope.options.categoryId,null);
        tree.selectNode(selNode)
      }
      if (scope.rootExpanded) {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.expandNode(root, true);
      }
    });
    scope.initTree = function(data) {
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };

    function resetFixedNode() {
      var nodes = tree.getNodesByParam('level', 1);
      var lastNode = nodes[nodes.length - 1];
      tree.moveNode(lastNode, fixedNode, 'next');
    }

    function resetRootNode() {
      //$('#aaa_1_a').addClass('root_node').after("<div class='root_node_line'></div>");
      $('#aaa_1_a').children().removeClass();
    }

    //树中的rename文本框格式限制
    elem.find('input').live(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', checkInput);
    elem.find('input').live('keyup',
      function(event) {
        checkInput(event);
      });
    tree = $.fn.zTree.init(elem, scope.treeSettings);
    scope.tree = tree;
    //树中的rename文本框
    //var reg = /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)+$/g;
    var reg = /^[a-zA-Z0-9_u4e00-u9fa5-]+$/g;//字母、汉字、数字、横线和下划线
    // var nReg = /[^\u4e00-\u9fa5\w\-]/g;
    // var nReg = /[^\u4e00-\u9fa5a-zA-Z0-9ü_]/g;
    var nReg = /[^\u4e00-\u9fa5a-zA-Z0-9ü_\-\s]/g;

    function checkInput(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      //如果从复制过来的不合规范的内容
        if (nReg.test(val) || val.length > 15) {
          val = val.replace(nReg, "");
          event.target.value = val;
        }
      if (val.length > 15) {
        val = val.slice(0, 15);
        event.target.value = val;
      }
    }

    function onClick(event, treeId, treeNode) {
      scope.nodeClick(event, treeId, treeNode);
    }

    //判断是根节点和"未分类"节
    function isFixedNode(node) {
      if (node.level == "1" && node.isLastNode) {
        return true;
      } else {
        return false;
      }
    }

    //双击节点展开/闭合
    function onDblClick(event, treeId, treeNode) {
      if (scope.hasOutRoot && !treeNode.level) {
        return;
      }
      if (event.target.id.match('switch') || event.target.id.match('check')) {
        return false;
      }
      tree.expandNode(treeNode, treeNode.open ? false: true);
    }

    //根节点和"未分类"节点拖动
    function beforeDrag(treeId, treeNodes) {
      if (!treeNodes[0].parentChangeable && scope.treeType == 'departmentTree') {
        return false;
      } else {
        if (!treeNodes[0].parentTId || treeNodes[0] == fixedNode) {
          return false;
        }
        return scope.isCanDrap(treeId, treeNodes);
      }
    }

    function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
      if (!targetNode) {
        return;
      }

      var toOut = false,
        toPid, level;
      //树的层级遍历
      //暂存树节点，暂存每层节点数
      var storeNodes = treeNodes,
        tempStoreNodes = treeNodes;
      //dragInfo.pos表示插入方式，前后中
      var level = scope.hasOutRoot ? targetNode.level: targetNode.level + 1;
      // preParent = treeNodes[0].getParentNode();
      scope.moveNode(treeNodes[0].id, targetNode.id, successSer,
        function(res) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": res.message || "移动错误",
            "mark": true
          });
          // tree.moveNode(preParent, treeNodes[0],'inner');
        });

      function successSer() {
        if (targetNode.level == 0 && fixedNode) {
          tree.moveNode(fixedNode, treeNodes[0], 'prev');
        }
        //树的广度优先遍历算法
        while (storeNodes.length) {
          //暂存每层的节点
          var tempStore = [];
          for (var i = 0; i < storeNodes.length; i++) {
            resetPos(storeNodes[i].tId);
            if (storeNodes[i].children && storeNodes[i].children.length > 0) {
              tempStore = tempStore.concat(storeNodes[i].children);
            }
          }
          level++;
          //进行遍历下一层
          storeNodes = tempStore;
        }
      }

      //重新设置位置
      function resetPos(id, treeNodes) {
        $("#" + id + "_a")[0].childNodes[0].style.width = level * 10 + "px";
      }
    }

    //删除前
    function beforeRemove(treeId, treeNode) {
      if (treeNode) {
      //console.log("删除前")
      }
    }

    function onRemove(e, treeId, treeNode) {}

    //改名后
    //检查名字重复
    function _checkNameExist(name,treeNode) {
      var reg = new RegExp("^" + name + "$");
      var treeNodes = scope.treeNodes;
      for (var i = 0; i < treeNodes.length; i++) {
        if (reg.test(treeNodes[i].o_name)) {
           checkBlankFlag = true;
          $(this).Alert({
            "title": "错误提示",
            "str": "名称已存在",
            "mark": true
          }, function() {
            treeNode.categoryName=name;
            tree.editName(treeNode);
            checkBlankFlag = false;
          });
        }
      }
    }

    function onRename(e, treeId, treeNode, isCancel) {
        //新增加的节点
        if (!treeNode.id) {
          //上传父节点的id
          treeNode.groupCnt=0;
          treeNode.categoryType=0;
          if (/\s/g.test(treeNode.categoryName)){
            treeNode.categoryName=treeNode.categoryName.replace(/\s+/g,"")
          }
            treeNode.categoryNameFull=treeNode.categoryName+"("+treeNode.groupCnt+")";
          if(treeNode.categoryName.length>10){
            treeNode.categoryName=treeNode.categoryName.substring(0,10)+"...("+treeNode.groupCnt+")";
          }else{
            treeNode.categoryName=treeNode.categoryName+"("+treeNode.groupCnt+")";
          }
          var nId = treeNode.getParentNode() ? treeNode.getParentNode().id: 0;
          tree._nodeService({
            id:null,
            parentId: nId,
            categoryName: treeNode.o_name,
            categoryType:0,
            groupCnt: null,
            open: true
          }, function(res) {
            if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();

            }, 0);
            if(scope.lastFixedNode) {
              scope.lastFixedNode = treeNode;
            }
            if (scope.treeType == 'departmentTree' && res) {
              if (res.id) {
                treeNode.id = res.id;
              }
              return treeNode.parentable = res.parentable;
            } else {
              if (res.id) {
                treeNode.id = res.id;
              }
            }
          }, function(res) {
            treeNode.categoryName=treeNode.o_name;
            treeNode.categoryNameFull=treeNode.o_name;
          /* if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);*/
            $(this).AlertNew({
              "title": httpTitle || "提示",
              "str": res.message || "错误",
              "mark": true
            }, edit, edit);

            function edit() {
              tree.editName(treeNode);
            }

            return;
          });
        } else {
          //否则重新命名
          if (/\s/g.test(treeNode.categoryName)){
            treeNode.categoryName=treeNode.categoryName.replace(/\s+/g,"")
          }
          treeNode.categoryNameFull=treeNode.categoryName+"("+treeNode.groupCnt+")";
          if(treeNode.categoryName==treeNode.o_name_full){//未作修改时不发送请求
            if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);
            if(treeNode.categoryName.length>10){
              treeNode.categoryName=treeNode.categoryName.substring(0,10)+"...("+treeNode.groupCnt+")";
            }else{
              treeNode.categoryName=treeNode.categoryName+"("+treeNode.groupCnt+")";
            }
            return
          }
          if(treeNode.categoryName.length>10){
            treeNode.categoryName=treeNode.categoryName.substring(0,10)+"...("+treeNode.groupCnt+")";
          }else{
            treeNode.categoryName=treeNode.categoryName+"("+treeNode.groupCnt+")";
          }
          tree._nodeService(treeNode.id, {
            id:treeNode.id,
            categoryName: treeNode.o_name,
            parentId:treeNode.parentId,
            categoryType:0,
            groupCnt: treeNode.groupCnt,
            open: true
          }, function(res) {
            if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);
            if (res.id) {
              treeNode.id = res.id;
            }

          }, function(res) {
            treeNode.categoryName=treeNode.o_name;
            treeNode.categoryNameFull=treeNode.o_name;
            /*if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);*/
            $(this).AlertNew({
              "title": httpTitle || "提示",
              "str": res.message || "错误",
              "mark": true
            }, edit, edit);

            function edit() {
              tree.editName(treeNode);
            }

            return;
          });
        }
    }

    //防止改名字为空
    var checkBlankFlag = false;

    function beforeRename(treeId, treeNode, newName, isCancel) {
      treeNode.o_name=newName.replace(/\s+/g,"");
      if (/\s/g.test(newName) && $(".yunat_maskLayer").length == 0) {
       // checkBlankFlag = true;
       //  $(this).Alert({
       //    "title": "错误提示",
       //    "str": "名称中不能包含空格",
       //    "mark": true
       //  }, function() {
       //    tree.editName(treeNode);
       //    checkBlankFlag = false;
       //  });
      };
     //_checkNameExist(treeNode.o_name,treeNode)
      if ($.trim(newName).length == 0 || checkBlankFlag) {
        return false;
      }


      return true;
    }

    //在编辑节点前动态更新掉节点的名称为尚未追加总数的名称
    function beforeEditName(treeId, treeNode) {
      treeNode.categoryName=treeNode.o_name;
      treeNode.o_name_full=treeNode.o_name;
      $.fn.zTree.getZTreeObj(elem.attr("id")).updateNode(treeNode);
      return true;
    }
    //重新构建数节点
    function _reCreateDom(treeId, treeNode) {
      scope.reCreateDom(treeId, treeNode);
    }

    scope.reCreateDom = function (treeId, treeNode) {
      var spaceWidth = 10;
      var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico");
      switchObj.remove();
      icoObj.before(switchObj);
      var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * (scope.hasOutRoot ? treeNode.level - 1 : treeNode.level)) + "px'></span>";
      switchObj.before(spaceStr);
      var spantxt=$("#" + treeNode.tId + "_span").html();
      var leftBracket=spantxt.indexOf("(");
      var getName=spantxt.slice(0,leftBracket);
      if(getName.length>10){
        spantxt=getName.substring(0,10)+"...("+treeNode.groupCnt+")";
        $("#" + treeNode.tId + "_span").html(spantxt);
      }
    }
    //右键事件触发，判断是否显示菜单
    function onRightClick(event, treeId, treeNode) {
      if (!scope.canShowMenu || treeNode == fixedNode) {
        return;
      }
      var offsetPos = elem.offset();
      menu = scope.menu;
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0 || tree.isRootNode(treeNode)) {
        tree.cancelSelectedNode();
        //位置可以微调
        menu.show("root", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event);
      } else if (treeNode.level == "0" && treeNode.isLastNode) {
        //"未分类"节点
        tree.selectNode(treeNode);
      } else if (treeNode) {
        tree.selectNode(treeNode);
        menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event, treeNode);
      }
    }

    tree.isRootNode = function(treeNode) {
      if (!treeNode.parentTId) {
        return true;
      } else {
        return false;
      }
    };
    //查找节点并展开
    tree.searchNode = function(searchValue) {
      var pNode, allNodes, searchNodes;

      allNodes = this.getNodesByParamFuzzy('categoryName', '');

      resetNode();
      //清空选中的节点
      this.cancelSelectedNode();
      searchNodes = this.getNodesByParamFuzzy('categoryName', searchValue);

      checkPassNode();
      hideAndExpandNode();
      //重置节点的状态
      //从2开始去除根节点和未分类节点
      function resetNode() {
        //删除路径查找标记
        for (var i = 0; i < allNodes.length; i++) {
          delete allNodes[i].isPass;
        }
        for (var i = 0; i < hideNodes.length; i++) {
          scope.tree.showNode(hideNodes[i]);
        }
        $(".defaultWrapztree > li > a").find(".button").remove();
      }

      //检查路径上的节点
      function checkPassNode() {
        //查找路径上的node，并标记
        for (var i = 0; i < searchNodes.length; i++) {
          pNode = searchNodes[i];
          if (pNode.isPass === undefined) {
            //暂存为最底层的节点
            pNode.isPass = -1;
          }
          while (pNode = pNode.getParentNode()) {
            //已经在路径上
            if (pNode.isPass === 1) {
              break;
            } else {
              //标记在路径上
              pNode.isPass = 1;
            }
          }
        }
      }

      //隐藏同时展开节点
      function hideAndExpandNode() {
        var node;
        for (var i = 0; i < allNodes.length; i++) {
          if (allNodes[i].isPass === undefined) {
            scope.tree.hideNode(allNodes[i]);
            //暂存隐藏的节点
            hideNodes.push(allNodes[i]);
          }
          if (allNodes[i].isPass === -1) {
            node = allNodes[i].isParentNode ? allNodes[i] : allNodes[i].getParentNode();
            scope.tree.expandNode(node, true);
          }
        }
      }
    };
    //插入节点
    tree.addNode = function(server, flag) { //flag判断添加根目录
      var isCurrentEditor = tree.getNodeByParam('editNameFlag', true);
      if(isCurrentEditor) {
        // 正在编辑
        console.log('不可编辑多个');
        return '不可编辑多个';
      };
      tree._nodeService = server;
      var node, parentNode, addedNode;
      timeFlag = new Date().getTime();
      if (!flag) {
        menu.hide();
        parentNode = tree.getSelectedNodes()[0] || tree.getNodes()[0];
      } else {
        parentNode = tree.getNodes()[0];
      };

      //插入的节点,t为时间标记，用于查找节点
      node = {
        t: timeFlag,
        categoryName: ""
        //sParent: true
      };
      if (scope.treeType == 'departmentTree' && !flag) {
        if (!parentNode.parentable) {
          $(this).Alert({
            "title": "不允许增加",
            "str": "预置部门中不允许添加子部门",
            "mark": true
          });
        } else {
          tree.addNodes(parentNode, node);
        }
      } else {
        tree.addNodes(parentNode, node);
      }
      //获取昂才插入的节点
      var addedNode = tree.getNodesByParam('t', timeFlag)[0];
      if (addedNode.level == 1 && fixedNode) {
        tree.moveNode(fixedNode, addedNode, 'prev');
      } else if(scope.lastFixedNode) {
        tree.moveNode(scope.lastFixedNode, addedNode, 'next');
      }
      // //如果为展开
      // if(!addedNode.open)
      //延时300mm显示编辑框
      setTimeout(function() {
          tree.editName(addedNode);
        },
        100);
    };
    //删除节点
    tree.deleteNode = function(server) {
      menu.hide();
      var nodes = tree.getSelectedNodes();
      var tipstr = '';
        if (nodes && nodes.length > 0) {
        if(nodes[0].groupCnt!=0){
          if(nodes[0].getParentNode().children&&nodes[0].getParentNode().children.length>0){
              scope.partitionListObj.delSelectCategory(nodes[0].id,nodes[0].level,nodes[0].getParentNode().children.length);
          }else{
              scope.partitionListObj.delSelectCategory(nodes[0].id,nodes[0].level);
          }

        }else{
         server(nodes[0].id, nodes[0].o_name,
            function() {
               tree.removeNode(nodes[0]);
               $(this).yAlert({"text": "删除成功",});
              removeAlert();
              scope.partitionListObj.isCardShow? scope.partitionListObj.initial():scope.partitionListObj.getTableDataList()
              scope.getAllNodes();
            },
            function(res) {
                $(this).AlertNew({
                "title": httpTitle || "提示",
                "str": res.message || '当前分类下存在子分类和活动，无法删除',
                "mark": true
                });
             return;
            }, nodes[0].groupCnt, nodes[0].children);
        }

        }

    };
    //改节点名字
    tree.renameNode = function(server) {
      menu.hide();
      //暂存服务器交互，实际的调用在onrename
      tree._nodeService = server;
      var node = tree.getSelectedNodes()[0];
      node.oldName = node.categoryName;
      beforeEditName(elem.attr("id"), node);
      tree.editName(node);
    };
    //展开节点
    tree.expand = function(node) {
      //nodes = tree.getSelectedNodes();
      tree.expandNode(node, true)
    };
    //关闭展开节点
    tree.collapse = function(node) {
      tree.expandNode(node, false);
    };
  }
});
/*客户分组ztree start*/
directives.directive('customerZtree', function() {
  //暂存对象
  var timeFlag, menu;

  //暂存查找到的对象
  var storeNodes = [];
  return {
    link: linkFn,
    priority: 200
  };

  function linkFn(scope, elem, attrs) {
    //var offsetPos = elem.offset();
    //右键事件
    var tree;
    var settings = {};
    //暂存拖拽过程中的节点信息保存
    //newP, id, pLevel,
    var dragInfo = {},
        isExisted = false,
    //暂存影藏的节点
        hideNodes = [],
        rootId = 0,
        fixedNode;

    settings.callback = {
      onDblClick: onDblClick,
      onClick: onClick,
      onRightClick: onRightClick,
      beforeRename: beforeRename,
      onRename: onRename
    };
    settings.view = {
      dblClickExpand: false,
      addDiyDom: _reCreateDom,
      cutomDeleteElement: true // 自定义增加、重命名 删除按钮
    };
    settings.edit = {
      showRenameBtn: false,
      showRemoveBtn: false
    };

    scope.treeSettings = angular.extend(scope.treeSettings, settings);
    //服务器获取数据，更新数
    scope.$watch("treeNodes", function(data) {
      if (!data) {
        return;
      }
      // rootId = data[0].id;
      //初始化树
      if (data) {
        scope.initTree(data);
      }
      if (scope.FIXNODENAME) {
        fixedNode = tree.getNodesByParam("categoryName", scope.FIXNODENAME, null)[0];
        resetFixedNode();
      }
      if (scope.hasOutRoot) {
        //把root节点移动到外面
        resetRootNode();
      }
      if (scope.rootExpanded) {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.expandNode(root, true);
      }
      if (scope.treeType == "checkTree") {
        //  scope.tree.expandAll(true);
      }
    });
    scope.initTree = function(data) {
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };

    function resetFixedNode() {
      var nodes = tree.getNodesByParam('level', 1);
      var lastNode = nodes[nodes.length - 1];
      tree.moveNode(lastNode, fixedNode, 'next');
    }

    function resetRootNode() {
      $('#aaa_1_a').addClass('root_node').after("<div class='root_node_line'></div>");
      $('#aaa_1_a').children().removeClass();
    }

    //树中的rename文本框格式限制
    elem.find('input').live(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', checkInput);
    elem.find('input').live('keyup',
        function(event) {
          checkInput(event);
        });
    tree = $.fn.zTree.init(elem, scope.treeSettings);
    scope.tree = tree;
    //树中的rename文本框
    var reg = /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)+$/g;
    var nReg = /[^\u4e00-\u9fa5a-zA-Z0-9ü\s]/g;

    function checkInput(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      if (nReg)
      //如果从复制过来的不合规范的内容
        if (nReg.test(val) || val.length > 20) {
          val = val.replace(nReg, "");
          event.target.value = val;
        }
      if (val.length > 20) {
        val = val.slice(0, 20);
        event.target.value = val;
      }
    }

    function onClick(event, treeId, treeNode) {
      scope.nodeClick(event, treeId, treeNode);
    }

    //判断是根节点和"未分类"节
    function isFixedNode(node) {
      if (node.level == "1" && node.isLastNode) {
        return true;
      } else {
        return false;
      }
    }

    //双击节点展开/闭合
    function onDblClick(event, treeId, treeNode) {
      if (scope.hasOutRoot && !treeNode.level) {
        return;
      }
      if (event.target.id.match('switch') || event.target.id.match('check')) {
        return false;
      }
      tree.expandNode(treeNode, treeNode.open ? false: true);
    }

    //根节点和"未分类"节点拖动
    function beforeDrag(treeId, treeNodes) {
      if (!treeNodes[0].parentChangeable && scope.treeType == 'departmentTree') {
        return false;
      } else {
        if (!treeNodes[0].parentTId || treeNodes[0] == fixedNode) {
          return false;
        }
        return scope.isCanDrap(treeId, treeNodes);
      }
    }

    //检查名字重复
    function _checkNameExist(name) {
      var reg = new RegExp("^" + name + "$");
      var treeNodes = scope.treeNodes;
      for (var i = 0; i < treeNodes.length; i++) {
        if (reg.test(treeNodes[i].categoryName)) {
          return true;
        }
      }
      return false;
    }

    function onRename(e, treeId, treeNode, isCancel) {

        $(this).yAlert({"text": "加载数据，请稍等..."});
      //新增加的节点
      if (!treeNode.id) {
        //上传父节点的id
        var nId = treeNode.getParentNode() ? treeNode.getParentNode().id: 0;
        tree._nodeService({
              parentId: nId,
              categoryName: treeNode.categoryName,
              categoryType: 0
            },
            function(res) {
              if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);
            if(scope.lastFixedNode) {
              scope.lastFixedNode = treeNode;
            }
              if (res.id) {
                treeNode.id = res.id;
              }
            },
            function(res) {
              if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": res.message || "错误",
                "mark": true
              }, edit, edit);

              function edit() {
                tree.editName(treeNode);
              }

              return;
            });
      } else {
        //否则重新命名
        tree._nodeService({
              categoryName: treeNode.categoryName,
              id: treeNode.id,
              parentId: treeNode.parentId,
              categoryType: treeNode.categoryType
            },
            function(res) {
              if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);
              if (res.id) {
                treeNode.id = res.id;
              }
            },
            function(res) {
            if(removeSetVar){
              clearTimeout(removeSetVar);
            }
            var removeSetVar=setTimeout(function() {
              $(".yAlert").parents(".ccmsPublicPopBg").first().remove();
              $(".yunat_maskLayer").first().remove();
            }, 0);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": res.message || "错误",
              "mark": true
            }, edit, edit);

            function edit() {
              tree.editName(treeNode);
            }

            return;
          });
      }
    }

    //防止改名字为空
    var checkBlankFlag = false;

    function beforeRename(treeId, treeNode, newName, isCancel) {
      if (/\s/g.test(newName) && $(".yunat_maskLayer").length == 0) {
        checkBlankFlag = true;
        $(this).Alert({
          "title": "错误提示",
          "str": "名称中不能包含空格",
          "mark": true
        }, function() {
          tree.editName(treeNode);
          checkBlankFlag = false;
        });
      };

      if ($.trim(newName).length == 0 || checkBlankFlag) {
        return false;
      }
      return true;
    }

    //重新构建数节点
    function _reCreateDom(treeId, treeNode) {
      scope.reCreateDom(treeId, treeNode);

    }

    //右键事件触发，判断是否显示菜单
    function onRightClick(event, treeId, treeNode) {
      if (!scope.canShowMenu || treeNode == fixedNode) {
        return;
      }
      var offsetPos = elem.offset();
      menu = scope.menu;
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0 || tree.isRootNode(treeNode)) {
        tree.cancelSelectedNode();
        //位置可以微调
        menu.show("root", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event);
      } else if (treeNode.level == "0" && treeNode.isLastNode) {
        //"未分类"节点
        tree.selectNode(treeNode);
      } else if (treeNode) {
        tree.selectNode(treeNode);
        menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43, event);
      }
    }

    tree.isRootNode = function(treeNode) {
      if (!treeNode.parentTId) {
        return true;
      } else {
        return false;
      }
    };
    //查找节点并展开
    tree.searchNode = function(searchValue) {
      var pNode, allNodes, searchNodes;

      allNodes = this.getNodesByParamFuzzy('categoryName', '');

      resetNode();
      //清空选中的节点
      this.cancelSelectedNode();
      searchNodes = this.getNodesByParamFuzzy('categoryName', searchValue);

      checkPassNode();
      hideAndExpandNode();
      //重置节点的状态
      //从2开始去除根节点和未分类节点
      function resetNode() {
        //删除路径查找标记
        for (var i = 0; i < allNodes.length; i++) {
          delete allNodes[i].isPass;
        }
        for (var i = 0; i < hideNodes.length; i++) {
          scope.tree.showNode(hideNodes[i]);
        }
        $(".defaultWrapztree > li > a").find(".button").remove();
      }

      //检查路径上的节点
      function checkPassNode() {
        //查找路径上的node，并标记
        for (var i = 0; i < searchNodes.length; i++) {
          pNode = searchNodes[i];
          if (pNode.isPass === undefined) {
            //暂存为最底层的节点
            pNode.isPass = -1;
          }
          while (pNode = pNode.getParentNode()) {
            //已经在路径上
            if (pNode.isPass === 1) {
              break;
            } else {
              //标记在路径上
              pNode.isPass = 1;
            }
          }
        }
      }

      //隐藏同时展开节点
      function hideAndExpandNode() {
        var node;
        for (var i = 0; i < allNodes.length; i++) {
          if (allNodes[i].isPass === undefined) {
            scope.tree.hideNode(allNodes[i]);
            //暂存隐藏的节点
            hideNodes.push(allNodes[i]);
          }
          if (allNodes[i].isPass === -1) {
            node = allNodes[i].isParentNode ? allNodes[i] : allNodes[i].getParentNode();
            scope.tree.expandNode(node, true);
          }
        }
      }
    };
    //插入节点
    tree.addNode = function(server, flag) { //flag判断添加根目录
      var isCurrentEditor = tree.getNodeByParam('editNameFlag', true);
      if(isCurrentEditor) {
        // 正在编辑
        console.log('不可编辑多个');
        return '不可编辑多个';
      };
      tree._nodeService = server;
      var node, parentNode, addedNode;
      timeFlag = new Date().getTime();
      if (!flag) {
        menu.hide();
        parentNode = tree.getSelectedNodes()[0] || tree.getNodes()[0];
      } else {
        parentNode = tree.getNodes()[0];
      };
      //插入的节点,t为时间标记，用于查找节点
      node = {
        t: timeFlag
        //sParent: true
      };

      tree.addNodes(parentNode, node);
      //获取昂才插入的节点
      var addedNode = tree.getNodesByParam('t', timeFlag)[0];
      if (addedNode.level == 1 && fixedNode) {
        tree.moveNode(fixedNode, addedNode, 'prev');
      } else if (scope.lastFixedNode) {
        tree.moveNode(scope.lastFixedNode, addedNode, 'next');
      }
      // //如果为展开
      // if(!addedNode.open)
      //延时300mm显示编辑框
      setTimeout(function() {
            tree.editName(addedNode);
          },
          100);
    };
    //删除节点
    tree.deleteNode = function(server) {
      menu.hide();
      var nodes = tree.getSelectedNodes();
      if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
          $(this).Alert({
            "title": "不允许删除",
            "str": "无法删除活动所属分类，其包含子分类",
            "mark": true
          });
          return;
        } else {
          server(nodes[0].id, nodes[0].categoryName,
              function() {
                tree.removeNode(nodes[0]);
                $(this).Alert({
                  "title": "删除成功",
                  "str": "删除成功",
                  "mark": true
                });

              },
              function(res) {
                $(this).Alert({
                  "title": httpTitle || "提示",
                  "str": res.message || '当前分类下存在子分类和活动，无法删除',
                  "mark": true
                });
                return;
              }, nodes[0].count, nodes[0].children);
        }
      }
    };
    //改节点名字
    tree.renameNode = function(server) {
      menu.hide();
      //暂存服务器交互，实际的调用在onrename
      tree._nodeService = server;
      var node = tree.getSelectedNodes()[0];
      node.oldCategoryName = node.categoryName;
      tree.editName(node);
    };
    //展开节点
    tree.expand = function(node) {
      tree.expandNode(node, true)
    };
    //关闭展开节点
    tree.collapse = function(node) {
      tree.expandNode(node, false);
    };
  }
});
/*客户分组ztree end*/

/*客户分群节点ztree start*/
directives.directive('customerNodeZtree', function() {
  //暂存对象
  var timeFlag, menu;

  //暂存查找到的对象
  var storeNodes = [];
  return {
    link: linkFn,
    priority: 200
  };

  function linkFn(scope, elem, attrs) {
    //var offsetPos = elem.offset();
    //右键事件
    var tree;
    var settings = {};
    //暂存拖拽过程中的节点信息保存
    //newP, id, pLevel,
    var dragInfo = {},
        isExisted = false,
    //暂存影藏的节点
        hideNodes = [],
        rootId = 0,
        fixedNode;

    settings.callback = {
      onClick: onClick,
      onDblClick: onDblClick
    };
    settings.view = {
      dblClickExpand: false,
      addDiyDom: _reCreateDom
    };
    settings.edit = {
      enable: true,
      showRenameBtn: false,
      showRemoveBtn: false
    };

    settings.edit.enable = false;

    scope.treeSettings = angular.extend(scope.treeSettings, settings);
    //服务器获取数据，更新数
    scope.$watch("treeNodes", function(data) {
      if (!data) {
        return;
      }
      // rootId = data[0].id;
      //初始化树
      if (data) {
        scope.initTree(data);
      }
      if (scope.FIXNODENAME) {
        fixedNode = tree.getNodesByParam("categoryName", scope.FIXNODENAME, null)[0];
        resetFixedNode();
      }
      if (scope.hasOutRoot) {
        //把root节点移动到外面
        resetRootNode();
      }
      if (scope.treeType == "roleTree" || scope.treeType == "departmentTree") {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.selectNode(root);
        if (scope.treeType == "roleTree") {
          scope.getRoles.getRolesById(root.id, root);
        }
        if (scope.treeType == "departmentTree") {
          scope.getShops.getShopsById(root.id, root);
        }

      }
      if (scope.rootExpanded) {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.expandNode(root, true);
      }
      if (scope.treeType == "checkTree") {
        //  scope.tree.expandAll(true);
      }
    });
    scope.initTree = function(data) {
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };

    function resetFixedNode() {
      var nodes = tree.getNodesByParam('level', 1);
      var lastNode = nodes[nodes.length - 1];
      tree.moveNode(lastNode, fixedNode, 'next');
    }

    function resetRootNode() {
      $('#aaa_1_a').addClass('root_node').after("<div class='root_node_line'></div>");
      $('#aaa_1_a').children().removeClass();
    }

    tree = $.fn.zTree.init(elem, scope.treeSettings);
    scope.tree = tree;

    function onClick(event, treeId, treeNode) {
      scope.nodeClick(event, treeId, treeNode, "customerNode");
    }

    //判断是根节点和"未分类"节
    function isFixedNode(node) {
      if (node.level == "1" && node.isLastNode) {
        return true;
      } else {
        return false;
      }
    }

    //双击节点展开/闭合
    function onDblClick(event, treeId, treeNode) {
      if (scope.hasOutRoot && !treeNode.level) {
        return;
      }
      if (event.target.id.match('switch') || event.target.id.match('check')) {
        return false;
      }
      tree.expandNode(treeNode, treeNode.open ? false: true);
    }

    //重新构建数节点
    function _reCreateDom(treeId, treeNode) {
      scope.reCreateDom(treeId, treeNode);

    }

    //查找节点并展开
    tree.searchNode = function(searchValue) {
      var pNode, allNodes, searchNodes;

      allNodes = this.getNodesByParamFuzzy('categoryName', '');
      resetNode();
      //清空选中的节点
      this.cancelSelectedNode();
      searchNodes = this.getNodesByParamFuzzy('categoryName', searchValue);

      checkPassNode();
      hideAndExpandNode();
      //重置节点的状态
      //从2开始去除根节点和未分类节点
      function resetNode() {
        //删除路径查找标记
        for (var i = 0; i < allNodes.length; i++) {
          delete allNodes[i].isPass;
        }
        for (var i = 0; i < hideNodes.length; i++) {
          scope.tree.showNode(hideNodes[i]);
        }
        $(".defaultWrapztree > li > a").find(".button").remove();
      }

      //检查路径上的节点
      function checkPassNode() {
        //查找路径上的node，并标记
        for (var i = 0; i < searchNodes.length; i++) {
          pNode = searchNodes[i];
          if (pNode.isPass === undefined) {
            //暂存为最底层的节点
            pNode.isPass = -1;
          }
          while (pNode = pNode.getParentNode()) {
            //已经在路径上
            if (pNode.isPass === 1) {
              break;
            } else {
              //标记在路径上
              pNode.isPass = 1;
            }
          }
        }
      }

      //隐藏同时展开节点
      function hideAndExpandNode() {
        var node;
        for (var i = 0; i < allNodes.length; i++) {
          if (allNodes[i].isPass === undefined) {
            scope.tree.hideNode(allNodes[i]);
            //暂存隐藏的节点
            hideNodes.push(allNodes[i]);
          }
          if (allNodes[i].isPass === -1) {
            node = allNodes[i].isParentNode ? allNodes[i] : allNodes[i].getParentNode();
            scope.tree.expandNode(node, true);
          }
        }
      }
    };
    //展开节点
    tree.expand = function(node) {
      //nodes = tree.getSelectedNodes();
      tree.expandNode(node, true)
    };
    //关闭展开节点
    tree.collapse = function(node) {
      tree.expandNode(node, false);
    };
  }
});
/*客户分组节点ztree end*/

/*活动选择器ztree start*/
directives.directive('activityZtree', function() {
  //暂存对象
  var timeFlag, menu;

  //暂存查找到的对象
  var storeNodes = [];
  return {
    link: linkFn,
    priority: 200
  };

  function linkFn(scope, elem, attrs) {
    //var offsetPos = elem.offset();
    //右键事件
    var tree;
    var settings = {};
    //暂存拖拽过程中的节点信息保存
    //newP, id, pLevel,
    var dragInfo = {},
        isExisted = false,
    //暂存影藏的节点
        hideNodes = [],
        rootId = 0,
        fixedNode;

    settings.callback = {
      onClick: onClick,
      onDblClick: onDblClick
    };
    settings.view = {
      dblClickExpand: false,
      addDiyDom: _reCreateDom
    };
    settings.edit = {
      enable: true,
      showRenameBtn: false,
      showRemoveBtn: false
    };

    settings.edit.enable = false;

    scope.treeSettings = angular.extend(scope.treeSettings, settings);
    //服务器获取数据，更新数
    scope.$watch("treeNodes", function(data) {
      if (!data) {
        return;
      }
      // rootId = data[0].id;
      //初始化树
      if (data) {
        scope.initTree(data);
      }
      if (scope.FIXNODENAME) {
        fixedNode = tree.getNodesByParam("name", scope.FIXNODENAME, null)[0];
        resetFixedNode();
      }
      if (scope.hasOutRoot) {
        //把root节点移动到外面
        resetRootNode();
      }
      if (scope.treeType == "roleTree" || scope.treeType == "departmentTree") {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.selectNode(root);
        if (scope.treeType == "roleTree") {
          scope.getRoles.getRolesById(root.id, root);
        }
        if (scope.treeType == "departmentTree") {
          scope.getShops.getShopsById(root.id, root);
        }

      }
      if (scope.rootExpanded) {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.expandNode(root, true);
      }
      if (scope.treeType == "checkTree") {
        //  scope.tree.expandAll(true);
      }
    });
    scope.initTree = function(data) {
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };

    function resetFixedNode() {
      var nodes = tree.getNodesByParam('level', 1);
      var lastNode = nodes[nodes.length - 1];
      tree.moveNode(lastNode, fixedNode, 'next');
    }

    function resetRootNode() {
      $('#aaa_1_a').addClass('root_node').after("<div class='root_node_line'></div>");
      $('#aaa_1_a').children().removeClass();
    }

    tree = $.fn.zTree.init(elem, scope.treeSettings);
    scope.tree = tree;

    function onClick(event, treeId, treeNode) {
      scope.nodeClick(event, treeId, treeNode, "activity");
    }

    //判断是根节点和"未分类"节
    function isFixedNode(node) {
      if (node.level == "1" && node.isLastNode) {
        return true;
      } else {
        return false;
      }
    }

    //双击节点展开/闭合
    function onDblClick(event, treeId, treeNode) {
      if (scope.hasOutRoot && !treeNode.level) {
        return;
      }
      if (event.target.id.match('switch') || event.target.id.match('check')) {
        return false;
      }
      tree.expandNode(treeNode, treeNode.open ? false: true);
    }

    //重新构建数节点
    function _reCreateDom(treeId, treeNode) {
      scope.reCreateDom(treeId, treeNode);

    }

    //查找节点并展开
    tree.searchNode = function(searchValue) {
      var pNode, allNodes, searchNodes;

      allNodes = this.getNodesByParamFuzzy('name', '');

      resetNode();
      //清空选中的节点
      this.cancelSelectedNode();
      searchNodes = this.getNodesByParamFuzzy('name', searchValue);

      checkPassNode();
      hideAndExpandNode();
      //重置节点的状态
      //从2开始去除根节点和未分类节点
      function resetNode() {
        //删除路径查找标记
        for (var i = 0; i < allNodes.length; i++) {
          delete allNodes[i].isPass;
        }
        for (var i = 0; i < hideNodes.length; i++) {
          scope.tree.showNode(hideNodes[i]);
        }
        $(".defaultWrapztree > li > a").find(".button").remove();
      }

      //检查路径上的节点
      function checkPassNode() {
        //查找路径上的node，并标记
        for (var i = 0; i < searchNodes.length; i++) {
          pNode = searchNodes[i];
          if (pNode.isPass === undefined) {
            //暂存为最底层的节点
            pNode.isPass = -1;
          }
          while (pNode = pNode.getParentNode()) {
            //已经在路径上
            if (pNode.isPass === 1) {
              break;
            } else {
              //标记在路径上
              pNode.isPass = 1;
            }
          }
        }
      }

      //隐藏同时展开节点
      function hideAndExpandNode() {
        var node;
        for (var i = 0; i < allNodes.length; i++) {
          if (allNodes[i].isPass === undefined) {
            scope.tree.hideNode(allNodes[i]);
            //暂存隐藏的节点
            hideNodes.push(allNodes[i]);
          }
          if (allNodes[i].isPass === -1) {
            node = allNodes[i].isParentNode ? allNodes[i] : allNodes[i].getParentNode();
            scope.tree.expandNode(node, true);
          }
        }
      }
    };
    //展开节点
    tree.expand = function(node) {
      //nodes = tree.getSelectedNodes();
      tree.expandNode(node, true)
    };
    //关闭展开节点
    tree.collapse = function(node) {
      tree.expandNode(node, false);
    };
  }
});
/*活动选择器ztree end*/
//tree的搜索框
directives.directive('treeNodeSearchInput', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
      var reg = /^([\u4e00-\u9fa5]|[a-zA-Z0-9]|\s)+$/;
    //右键菜单，搜索过程影藏
    scope.canShowMenu = true;
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      //搜索过程中禁用右键菜单
      scope.canShowMenu = false;
      if (!reg.test(val)) {
        val = event.target.value = val.slice(0, val.length - 1);
        if (!val) {
          return;
        }
      }
      scope.searchTreeNodes && scope.searchTreeNodes(event.target.value);
      setTimeout(function() {
            elem.focus();
          },
          1000);
    });
    //回车键
    elem.on("focus", function(event) {
      elem.siblings("label").text("");
    });
    elem.on("blur", function(event) {
      if (elem.val() == "" || elem.val() == "undefined") {
        elem.siblings("label").text(elem.attr("ng-placeholder"));
      }
    });
    elem.on('keyup', function(event) {
      if (event.keyCode == 8) {
        scope.searchTreeNodes && scope.searchTreeNodes(event.target.value);
        setTimeout(function() {
              elem.focus();
            },
            1000);
        elem.siblings("label").text("");
        if (!event.target.value.length) {
          //搜索过程中启用右键菜单
          scope.canShowMenu = true;
        }
      }
    });
  }
}]);
directives.directive('parTreeNodeSearchInput', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
      var reg = /[^\u4e00-\u9fa5a-zA-Z0-9ü_\-\s]/g;//字母、汉字、数字、横线和下划线

    //右键菜单，搜索过程影藏
    scope.canShowMenu = true;
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      //搜索过程中禁用右键菜单
      scope.canShowMenu = false;
     /* if (!reg.test(val)) {
        val = event.target.value = val.slice(0, val.length - 1);
        if (!val) {
          return;
        }
      }*/
      if (reg.test(val)) {
        val = val.replace(reg, "");
        event.target.value = val;
      }
      scope.searchTreeNodes && scope.searchTreeNodes(event.target.value);
      setTimeout(function() {
          elem.focus();
        },
        1000);
    });
    //回车键
    elem.on("focus", function(event) {
      elem.siblings("label").text("");
    });
    elem.on("blur", function(event) {
      if (elem.val() == "" || elem.val() == "undefined") {
        elem.siblings("label").text(elem.attr("ng-placeholder"));
      }
    });
    elem.on('keyup', function(event) {
      if (event.keyCode == 8) {
        scope.searchTreeNodes && scope.searchTreeNodes(event.target.value);
        setTimeout(function() {
            elem.focus();
          },
          1000);
        elem.siblings("label").text("");
        if (!event.target.value.length) {
          //搜索过程中启用右键菜单
          scope.canShowMenu = true;
        }
      }
    });
  }
}]);
//模拟 placeholder
directives.directive('ngPlaceholder', function() {
  return {
    restrict: 'EA',
    //replace: true,
    transclude: true,
    link: function(scope, element, attrs, $compile, $parse) {
      //var top = element.position().top;
      //var left = element.position().left;
      //修改EDM测试邮箱ng-placeholder的位置
      if(attrs.ngPlaceholder=="多个email用','隔开。"){
        var $label = $("<label for=\"male\" class=\"ngplaceholder edmlabel\"></label>");
      }else{
        var $label = $("<label for=\"male\" class=\"ngplaceholder\"></label>");
      }

      var upHtml = '<span class=\"spanClass\" ng-click="holderClick()"  class=\"ngplaceholder_wrapper\">';
      var $ele = $(element[0]);
      element.wrap(upHtml);
      element.after($label);

      $label.text(attrs.ngPlaceholder);



      $label.click(function() {
        $ele[0].focus();
        $label.text("");
      });
      scope.$watch(attrs.ngModel, function(value) {
        if (scope.$eval(attrs.ngModel)) {
          if (scope.$eval(attrs.ngModel) != "") {
            $label.text("");
          }
        }
      });
    }
  }
});
//短信弹出层 placeholder
directives.directive('ngPSms', function() {
  return {
    restrict: 'EA',
    //replace: true,
    link: function(scope, element, attrs, $compile, $parse) {
      var $ele = $(element[0]);
      $ele.next().addClass("sms_Placeholde");

    }
  }
});
//查询节点配置 ztree
directives.directive('queryZtree', ['$window', function($window) {
  //暂存对象
  var timeFlag, menu;

  //暂存查找到的对象
  var storeNodes = [];
  return {
    link: linkFn,
    priority: 200
  };

  function linkFn(scope, elem, attrs) {
    //var offsetPos = elem.offset();
    //右键事件
    var tree;
    var settings = {};
    //暂存拖拽过程中的节点信息保存
    //newP, id, pLevel,
    var dragInfo = {},
        isExisted = false,
    //暂存影藏的节点
        hideNodes = [],
        rootId = 0,
        fixedNode;

    settings.callback = {
      // beforeClick: beforeClick,
      onDblClick: onDblClick,
      onClick: onClick,
      //onRightClick: onRightClick,
      beforeRename: beforeRename,
      onRename: onRename,
      beforeRemove: beforeRemove,
      onRemove: onRemove,
      beforeDrag: beforeDrag,
      beforeDragOpen: function() {
        return false;
      },
      // beforeDrop: beforeDrop,
      onDrop: onDrop
    };
    if (attrs.queryZtree != "rightFalse") { //判断是否促发右击事件
      settings.callback.onRightClick = onRightClick;
    }
    settings.view = {
      dblClickExpand: false,
      addDiyDom: _reCreateDom
    };
    settings.edit = {
      enable: true,
      drag: false,
      showRenameBtn: false,
      showRemoveBtn: false
    };
    scope.menuType = "部门";
    scope.treeSettings = angular.extend(scope.treeSettings, settings);
    //服务器获取数据，更新数
    scope.$watch("treeNodes", function(data) {
      if (!data) {
        return;
      }
      // rootId = data[0].id;
      //初始化树
      if (data) {
        scope.initTree(data);
      }
      if (scope.FIXNODENAME) {
        fixedNode = tree.getNodesByParam("name", scope.FIXNODENAME, null)[0];
        resetFixedNode();
      }
      if (scope.hasOutRoot) {
        //把root节点移动到外面
        resetRootNode();
      }
      if (scope.treeType == "roleTree" || scope.treeType == "departmentTree") {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.selectNode(root);
        if (scope.treeType == "roleTree") {
          scope.getRoles.getRolesById(root.id, root);
        }
        if (scope.treeType == "departmentTree") {
          scope.getShops.getShopsById(root.id, root);
        }

      }
      if (scope.rootExpanded) {
        var root = tree.getNodesByParam("level", 0, null)[0];
        tree.expandNode(root, true);
      }
      if (scope.treeType == "checkTree") {
        //  scope.tree.expandAll(true);
      }
    });
    scope.initTree = function(data) {
      $.fn.zTree.init(elem, scope.treeSettings, data);
    };
    scope.nodeClick = function(event, treeId, treeNode) {
      if (attrs.queryZtree != "rightFalse") {
        //typeId为3时为自定义配置，为2的时候为拆分组，右边结构需求变换
        var wrapScope = angular.element(".configQueryClass").scope();
        if (treeNode.typeId == 3) {
          $(".orderConfig").show();
          var scope = angular.element(document.querySelector('.orderConfig')).scope();
          scope.orderConfigId = treeNode.id;
          scope.orderConfig.init();
          wrapScope.$apply(function() {
            wrapScope.configuration.splitGroupButtonFlag = false;
          });
        } else if (treeNode.typeId == 2) {
          $(".orderConfig").hide();
          wrapScope.$apply(function() {
            wrapScope.configuration.splitGroupButtonFlag = true;
            wrapScope.searchObj.updateFromTreeClick(treeNode.id, treeNode.typeId);
          });
        } else {
          $(".orderConfig").hide();
          var grid = angular.element(".flexigrid");
          if (grid.length > 0) {
            grid.scope().searchObj.updateFromTreeClick(treeNode.id);
            wrapScope.$apply(function() {
              wrapScope.configuration.splitGroupButtonFlag = false;
            });
          }
        }

      } else {
        var grid = angular.element("#RFMResults");
        grid.scope().searchObj.updateFromTreeClick(treeNode.shopId, treeNode.categoryCode, treeNode.isPreset);
      }
    };

    function resetFixedNode() {
      var nodes = tree.getNodesByParam('level', 1);
      var lastNode = nodes[nodes.length - 1];
      tree.moveNode(lastNode, fixedNode, 'next');
    }

    function resetRootNode() {
      $('#aaa_1_a').addClass('root_node').after("<div class='root_node_line'></div>");
      $('#aaa_1_a').children().removeClass();
    }

    //树中的rename文本框格式限制
    elem.find('input').live(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', checkInput);
    elem.find('input').live('keyup',
        function(event) {
          checkInput(event);
        });
    tree = $.fn.zTree.init(elem, scope.treeSettings);
    scope.tree = tree;
    //树中的rename文本框
    var reg = /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)+$/g;
    var nReg = /[^\u4e00-\u9fa5a-zA-Z0-9ü]\s/g;

    function checkInput(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      if (nReg)
      //如果从复制过来的不合规范的内容
        if (nReg.test(val) || val.length > 20) {
          val = val.replace(nReg, "");
          event.target.value = val;
        }
      if (val.length > 20) {
        val = val.slice(0, 20);
        event.target.value = val;
      }
    }

    function onClick(event, treeId, treeNode) {
      scope.nodeClick(event, treeId, treeNode);
    }

    //判断是根节点和"未分类"节
    function isFixedNode(node) {
      if (node.level == "1" && node.isLastNode) {
        return true;
      } else {
        return false;
      }
    }

    //双击节点展开/闭合
    function onDblClick(event, treeId, treeNode) {
      if (scope.hasOutRoot && !treeNode.level) {
        return;
      }
      if (event.target.id.match('switch') || event.target.id.match('check')) {
        return false;
      }
      tree.expandNode(treeNode, treeNode.open ? false: true);
    }

    //根节点和"未分类"节点拖动
    function beforeDrag(treeId, treeNodes) {
      if (!treeNodes[0].parentChangeable && scope.treeType == 'departmentTree') {
        return false;
      } else {
        if (!treeNodes[0].parentTId || treeNodes[0] == fixedNode) {
          return false;
        }
        return scope.isCanDrap(treeId, treeNodes);
      }
    }

    function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
      if (!targetNode) {
        return;
      }

      var toOut = false,
          toPid, level;
      //树的层级遍历
      //暂存树节点，暂存每层节点数
      var storeNodes = treeNodes,
          tempStoreNodes = treeNodes;
      //dragInfo.pos表示插入方式，前后中
      var level = scope.hasOutRoot ? targetNode.level: targetNode.level + 1;
      // preParent = treeNodes[0].getParentNode();
      scope.moveNode(treeNodes[0].id, targetNode.id, successSer,
          function(res) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": res.message || "移动错误",
              "mark": true
            });
            // tree.moveNode(preParent, treeNodes[0],'inner');
          });

      function successSer() {
        if (targetNode.level == 0 && fixedNode) {
          tree.moveNode(fixedNode, treeNodes[0], 'prev');
        }
        //树的广度优先遍历算法
        while (storeNodes.length) {
          //暂存每层的节点
          var tempStore = [];
          for (var i = 0; i < storeNodes.length; i++) {
            resetPos(storeNodes[i].tId);
            if (storeNodes[i].children && storeNodes[i].children.length > 0) {
              tempStore = tempStore.concat(storeNodes[i].children);
            }
          }
          level++;
          //进行遍历下一层
          storeNodes = tempStore;
        }
      }

      //重新设置位置
      function resetPos(id, treeNodes) {
        $("#" + id + "_a")[0].childNodes[0].style.width = level * 10 + "px";
      }
    }

    //删除前
    function beforeRemove(treeId, treeNode) {
      if (treeNode) {

      }
    }

    function onRemove(e, treeId, treeNode) {}

    //改名后
    //检查名字重复
    function _checkNameExist(name) {
      var reg = new RegExp("^" + name + "$");
      var treeNodes = scope.treeNodes;
      for (var i = 0; i < treeNodes.length; i++) {
        if (reg.test(treeNodes[i].name)) {
          return true;
        }
      }
      return false;
    }

    function onRename(e, treeId, treeNode, isCancel) {
      //新增加的节点
      if (!treeNode.id) {
        //上传父节点的id
        var nId = treeNode.getParentNode() ? treeNode.getParentNode().id: 0;
        tree._nodeService({
              newParentId: nId,
              name: treeNode.name
            },
            function(res) {

              if (scope.treeType == 'departmentTree' && res) {
                if (res.id) {
                  treeNode.id = res.id;
                }
                return treeNode.parentable = res.parentable;
              } else {
                if (res.id) {
                  treeNode.id = res.id;
                }
              }

            },
            function(res) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": res.message || "错误",
                "mark": true
              }, edit, edit);

              function edit() {
                tree.editName(treeNode);
              }

              return;
            });
      } else {
        //否则重新命名
        tree._nodeService(treeNode.id, {
              name: treeNode.name
            },
            function(res) {
              if (res.id) {
                treeNode.id = res.id;
              }
            },
            function(res) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": res.message || "错误",
                "mark": true
              }, edit, edit);

              function edit() {
                tree.editName(treeNode);
              }

              return;
            });
      }
    }

    //防止改名字为空
    var checkBlankFlag = false;

    function beforeRename(treeId, treeNode, newName, isCancel) {
      if (/\s/g.test(newName) && $(".yunat_maskLayer").length == 0) {
        checkBlankFlag = true;
        $(this).Alert({
          "title": "错误提示",
          "str": "名称中不能包含空格",
          "mark": true
        }, function() {
          tree.editName(treeNode);
          checkBlankFlag = false;
        });
      };

      if ($.trim(newName).length == 0 || checkBlankFlag) {
        return false;
      }
      return true;
    }

    //重新构建数节点
    function _reCreateDom(treeId, treeNode) {
      scope.reCreateDom(treeId, treeNode);

    }

    scope.reCreateDom = function(treeId, treeNode) {
      var spaceWidth = 10;
      var switchObj = $("#" + treeNode.tId + "_switch"),
          icoObj = $("#" + treeNode.tId + "_ico");
      switchObj.remove();
      icoObj.before(switchObj);
      var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * (scope.hasOutRoot ? treeNode.level - 1 : treeNode.level)) + "px'></span>";
      switchObj.before(spaceStr);
    }

    //右键事件触发，判断是否显示菜单
    function onRightClick(event, treeId, treeNode) {
      if (!scope.canShowMenu || treeNode == fixedNode) {
        return;
      }
      var offsetPos = elem.offset();
      menu = scope.menu;
      if (treeNode && scope.treeType == "roleTree") {
        tree.selectNode(treeNode);
        menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43);
        return;
      }
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0 || tree.isRootNode(treeNode)) {
        // tree.cancelSelectedNode();
        //位置可以微调
        tree.selectNode(treeNode);
        if (treeNode.typeId == 2) { //分组查询右键触发事件
          menu.show(treeNode, event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43);
        } else {
          menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43);
        }
      } else if (treeNode.level == "0" && treeNode.isLastNode) {
        //"未分类"节点
        tree.selectNode(treeNode);
      } else if (treeNode) {
        tree.selectNode(treeNode);
        if (treeNode.typeId == 2) { //分组查询右键触发事件
          menu.show(treeNode, event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43);
        } else {
          menu.show("node", event.clientX - offsetPos.left + 10, event.clientY - offsetPos.top + 43);
        }
      }
    }

    tree.isRootNode = function(treeNode) {
      if (!treeNode.parentTId) {
        return true;
      } else {
        return false;
      }
    };
    //查找节点并展开
    tree.searchNode = function(searchValue) {
      var pNode, allNodes, searchNodes;

      allNodes = this.getNodesByParamFuzzy('name', '');

      resetNode();
      //清空选中的节点
      this.cancelSelectedNode();
      searchNodes = this.getNodesByParamFuzzy('name', searchValue);

      checkPassNode();
      hideAndExpandNode();
      //重置节点的状态
      //从2开始去除根节点和未分类节点
      function resetNode() {
        //删除路径查找标记
        for (var i = 0; i < allNodes.length; i++) {
          delete allNodes[i].isPass;
        }
        for (var i = 0; i < hideNodes.length; i++) {
          scope.tree.showNode(hideNodes[i]);
        }
        $(".defaultWrapztree > li > a").find(".button").remove();
      }

      //检查路径上的节点
      function checkPassNode() {
        //查找路径上的node，并标记
        for (var i = 0; i < searchNodes.length; i++) {
          pNode = searchNodes[i];
          if (pNode.isPass === undefined) {
            //暂存为最底层的节点
            pNode.isPass = -1;
          }
          while (pNode = pNode.getParentNode()) {
            //已经在路径上
            if (pNode.isPass === 1) {
              break;
            } else {
              //标记在路径上
              pNode.isPass = 1;
            }
          }
        }
      }

      //隐藏同时展开节点
      function hideAndExpandNode() {
        var node;
        for (var i = 0; i < allNodes.length; i++) {
          if (allNodes[i].isPass === undefined) {
            scope.tree.hideNode(allNodes[i]);
            //暂存隐藏的节点
            hideNodes.push(allNodes[i]);
          }
          if (allNodes[i].isPass === -1) {
            node = allNodes[i].isParentNode ? allNodes[i] : allNodes[i].getParentNode();
            scope.tree.expandNode(node, true);
          }
        }
      }
    };
    //插入节点
    tree.addNode = function(server, flag) { //flag判断添加根目录
      tree._nodeService = server;
      var node, parentNode, addedNode;
      timeFlag = new Date().getTime();
      if (!flag) {
        menu.hide();
        parentNode = tree.getSelectedNodes()[0] || tree.getNodes()[0];
      } else {
        parentNode = tree.getNodes()[0];
      };
      //插入的节点,t为时间标记，用于查找节点
      node = {
        t: timeFlag
        //sParent: true
      };
      if (scope.treeType == 'departmentTree' && !flag) {
        if (!parentNode.parentable) {
          $(this).Alert({
            "title": "不允许增加",
            "str": "不允许增加部门",
            "mark": true
          });
        } else {
          tree.addNodes(parentNode, node);
        }
      } else {
        tree.addNodes(parentNode, node);
      }
      //获取昂才插入的节点
      var addedNode = tree.getNodesByParam('t', timeFlag)[0];
      if (addedNode.level == 1 && fixedNode) {
        tree.moveNode(fixedNode, addedNode, 'prev');
      } else if (scope.lastFixedNode) {
        tree.moveNode(scope.lastFixedNode, addedNode, 'next');
      }
      // //如果为展开
      // if(!addedNode.open)
      //延时300mm显示编辑框
      setTimeout(function() {
            tree.editName(addedNode);
          },
          100);
    };
    //删除节点
    tree.deleteNode = function(server) {
      menu.hide();
      var nodes = tree.getSelectedNodes();
      if (nodes[0].deleteable == false && (scope.treeType == 'departmentTree' || scope.treeType == 'roleTree')) {
        $(this).Alert({
          "title": "不允许删除",
          "str": "不允许删除",
          "mark": true
        });
      } else {
        if (nodes && nodes.length > 0) {
          if (nodes[0].children && nodes[0].children.length > 0 && (nodes[0].typeId) != 2) { //typeId!=2——分组查询可以删除
            if (scope.treeType == 'roleTree') {
              $(this).Alert({
                "title": "不允许删除",
                "str": "无法删除角色",
                "mark": true
              });

            } else if (scope.treeType == 'departmentTree') {
              $(this).Alert({
                "title": "不允许删除",
                "str": "当前部门下有子部门存在，不允许删除!",
                "mark": true
              });
            } else {
              $(this).Alert({
                "title": "不允许删除",
                "str": "无法删除活动所属分类，其包含子分类",
                "mark": true
              });
            }
            return;
          } else {
            server(nodes[0].id, nodes[0].name,
                function() {
                  tree.removeNode(nodes[0]);
                  $(this).Alert({
                    "title": "删除成功",
                    "str": "删除成功",
                    "mark": true
                  });

                },
                function(res) {

                  if (scope.treeType == 'roleTree') {
                    $(this).Alert({
                      "title": "不允许删除",
                      "str": "无法删除角色，其包含子角色",
                      "mark": true
                    });

                  } else if (scope.treeType == 'departmentTree') {
                    $(this).Alert({
                      "title": "不允许删除",
                      "str": "无法删除部门，其包含子部门",
                      "mark": true
                    });
                  } else {

                    $(this).Alert({
                      "title": httpTitle || "提示",
                      "str": res.message || '当前分类下存在子分类和活动，无法删除',
                      "mark": true
                    });
                  }
                  return;
                }, nodes[0].count, nodes[0].children);
          }
        }
      }
    };
    //改节点名字
    tree.renameNode = function(server) {
      menu.hide();
      //暂存服务器交互，实际的调用在onrename
      tree._nodeService = server;
      var node = tree.getSelectedNodes()[0];
      tree.editName(node);
    };
    //展开节点
    tree.expand = function(node) {
      //nodes = tree.getSelectedNodes();
      tree.expandNode(node, true)
    };
    //关闭展开节点
    tree.collapse = function(node) {
      tree.expandNode(node, false);
    };
  }
}]);
//查询节点左边的 查询条件ztree
directives.directive('queryTree', function() {
  //暂存对象
  var timeFlag, menu;

  //暂存查找到的对象
  var storeNodes = [];
  return {
    link: linkFn,
    priority: 200
  };

  function linkFn(scope, elem, attrs) {
    var tree;
    var settings = {};
    var dragInfo = {},
        isExisted = false,
    //暂存影藏的节点
        hideNodes = [],
        rootId = 0,
        fixedNode;
    /*添加分步加载*/
    var ztreeQueryDefaultSubjectId = scope.tfilterFindObj ? scope.tfilterFindObj.defaultSubjectId: scope.sendQuerySubjectId;
    settings.async = {
      enable: true,
      url: GLOBAL_STATIC.nodeRoot + 'metas/picker/queryItem/subcategory/?_=' + new Date().getTime(),
      type: "POST",
      autoParam: ["cutCategoryId=categoryId", "paramOrderId=orderId", "name", "parentConditions=conditions"]
    }

    function ajaxGetNodes(treeNode, reloadType) {
      var zTree = $.fn.zTree.getZTreeObj(elem.attr("id"));
      if (reloadType == "refresh") {
        treeNode.icon = "../../../css/zTreeStyle/img/loading.gif";
        zTree.updateNode(treeNode);
      }
      zTree.reAsyncChildNodes(treeNode, reloadType, true);
    }

    function beforeExpand(treeId, treeNode) {
      if (!treeNode.isAjaxing) {
        startTime = new Date();
        treeNode.times = 1;
        ajaxGetNodes(treeNode, "refresh");
        return true;
      } else {
        $(this).yAlert({
          "text": "加载数据，请稍等..."
        });
        removeAlert();
        return false;
      }
    }

    function onAsyncSuccess(event, treeId, treeNode, msg) {
      if (!msg || msg.length == 0) {
        return;
      }
      var zTree = $.fn.zTree.getZTreeObj(elem.attr("id")),
          totalCount = treeNode.count;
      if (treeNode.children.length < totalCount) {
        setTimeout(function() {
              ajaxGetNodes(treeNode);
            },
            perTime);
      } else {
        treeNode.icon = "";
        zTree.updateNode(treeNode);
        zTree.selectNode(treeNode.children[0]);
        //endTime = new Date();
        //var usedTime = (endTime.getTime() - startTime.getTime())/1000;
        //className = (className === "dark" ? "":"dark");
        //showLog("[ "+getTime()+" ]&nbsp;&nbsp;treeNode:" + treeNode.name );
        //showLog("Child node has finished loading, a total of "+ (treeNode.times-1) +" times the asynchronous load, elapsed time: "+ usedTime + " seconds ");
      }
    }

    function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
      var zTree = $.fn.zTree.getZTreeObj(elem.attr("id"));
      $(this).yAlert({
        "text": "加载错误，请重新加载..."
      });
      removeAlert();
      treeNode.icon = "";
      zTree.updateNode(treeNode);
    }

    function beforeAsync(treeId, treeNode) {
      treeNode.cutCategoryId = treeNode.valueId;
      treeNode.paramOrderId = treeNode.orderId + 1;
      treeNode.parentConditions = JSON.stringify(treeNode.conditions);
    }
    /*end*/

    settings.callback = {
      onClick: onClick,
      beforeDrag: beforeDrag,
      beforeExpand: beforeExpand,
      onDrop: onDrop,
      onDrag: onDrag,
      beforeExpand: beforeExpand,
      beforeAsync: beforeAsync,
      onAsyncSuccess: onAsyncSuccess,
      onAsyncError: onAsyncError
    };
    settings.view = {
      dblClickExpand: true,
      addDiyDom: _reCreateDom,
      expandSpeed: ""
    };
    settings.data = {
      simpleData: {
        enable: true
      }
    };
    settings.edit = {
      enable: true,
      drag: {
        isCopy: true,
        isMove: true,
        prev: function(treeId, nodes, targetNode) {
          return false;

        },
        next: function(treeId, nodes, targetNode) {
          return false;
        },
        inner: function(treeId, nodes, targetNode) {
          return false;
        }

      },
      showRenameBtn: false,
      showRemoveBtn: false,
      autoExpandTrigger: false
    };
    scope.treeSettings = angular.extend({},
        settings);
    //服务器获取数据，更新数
    scope.$watch("treeNodes", function(data) {
      if (!data) {
        return;
      }

      tree = $.fn.zTree.init(elem, scope.treeSettings, data);
      scope.tree = tree;
    });

    //单击节点新建
    function onClick(event, treeId, treeNode) {
      if (treeNode.isParent) {
        return false;
      }
      var gragTypeId = "";
      gragTypeId = treeNode.valueId || "";
      var conditionViewName = disponseQueryName(treeNode.conditions, treeNode.name);
      angular.element('.targetDivBox').scope().addCondition(gragTypeId, treeNode.type, treeNode.conditions, conditionViewName); // treeNode.conditions分组所需要的数据，保存时候传给后台，再此无功能应用
      scope.dragReminderFlag = false;
    }

    function beforeExpand(treeId, treeNode) {
      if (treeNode.hasChildren === false) {
        return false;
      }
    }
    //处理查询节点 有分组的的名称展示
    function disponseQueryName(queryConditions, innerName) {
      var storeConditionsNameAry = [],
          defalultReturnName = innerName;
      if (queryConditions) {
        for (var i = 1; i <= queryConditions.length; i++) {
          angular.forEach(queryConditions,
              function(val, key) {
                if (val.orderId == i && val.valueShow) {
                  storeConditionsNameAry.push(val.valueShow);
                }
              });
        };
        storeConditionsNameAry.push(innerName);
        defalultReturnName = storeConditionsNameAry.join("-");
      }
      return defalultReturnName
    }

    //根节点和"未分类"节点拖动
    function beforeDrag(treeId, treeNodes) {
      if (treeNodes[0].isParent) {
        return false;
      }
    }

    function onDrag(event, treeId, treeNodes) {
      // if(event.target.className == 'targetDivBox') {}
      $('.targetDivBox').css('border-color', "#A5C6DA");
    }

    function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
      if ($(event.target).closest('.targetDivBox').length) {
        var gragTypeId = "";
        gragTypeId = treeNodes[0].valueId || "";
        var conditionViewName = disponseQueryName(treeNodes[0].conditions, treeNodes[0].name);
        angular.element('.targetDivBox').scope().addCondition(gragTypeId, treeNodes[0].type, treeNodes[0].conditions, conditionViewName);
      }
      $('.targetDivBox').css('border-color', "#F8F8F8");
      scope.dragReminderFlag = false;
      return false;
    }

    //重新构建数节点
    function _reCreateDom(treeId, treeNode) {
      var spaceWidth = 10;
      var switchObj = $("#" + treeNode.tId + "_switch"),
          icoObj = $("#" + treeNode.tId + "_ico"),
          spanObj = $("#" + treeNode.tId + "_span");
      var tips = '<em class="ico_tips queryConditionsTips" title="系统只保留最近3个月的营销活动数据" style="vertical-align: -1px;margin-left:4px;"></em>';
      switchObj.remove();
      icoObj.before(switchObj);
      if (treeNode.hasChildren === false) { //无子集
        switchObj.addClass("switch_hide");
      }
      if (treeNode.name == "营销历史") {
        spanObj.after(tips);
      }
      var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * (scope.hasOutRoot ? treeNode.level - 1 : treeNode.level)) + "px'></span>";
      switchObj.before(spaceStr);
    }
  }
});
//共用的ngtitle
directives.directive({
  "ngTitle": function() {
    return function(scope, element, attr) {
      var x = 14,
          _toolTip; // x,y 默认偏移量
      element.mouseover(function(e) {
        var maxWidth = parseInt(element.attr('ng-title-max')) || 180;
        if (element.hasClass("error")) {
          _toolTip = $("<div id='tooltip' class='viewMarkInfoBox viewMarkInfoBox infoBoxError' style='width:auto;'></div>"); // 订单查询扩展的样式
        } else {
          _toolTip = $("<div id='tooltip' class='viewMarkInfoBox' style='width:auto;'></div>");
        }
        _toolTip.appendTo($('body'));
        _toolTip.html(attr.ngTitle).css({
          'visibility': 'hidden',
          'max-width': maxWidth
        });
        var L = e.pageX,
            Y = e.pageY,
            W = $(window).width(),
            H = $(window).height(),
            OW = _toolTip.outerWidth(true),
            OH = _toolTip.outerHeight(true);
        if (OW > maxWidth) {
          _toolTip.css({
            'width': maxWidth
          });
        } else {
          _toolTip.css({
            'width': 'auto'
          });
          OW = _toolTip.outerWidth(true);
        }
        _toolTip.css({
          'left': L + x + OW > W ? L - OW - x: L + x,
          'top': Y + OH > H ? H - OH: Y,
          'visibility': '',
          'display': 'block'
        });
      }).mouseout(function() {
        _toolTip.remove();
      });
    }
  }
});

//共用的收货人详细信息
directives.directive({
  "ngTitleAddress": function() {
    return function(scope, element, attr) {
      var x = 14,
          _toolTip; // x,y 默认偏移量
      element.mouseover(function(e) {
        var maxWidth = parseInt(element.attr('ng-title-max')) || 180;
        var fillDataAry = scope.$eval(attr.ngTitleAddress) || {
          "receiverName": "",
          "receiverPhone": "",
          "receiverState": "",
          "receiverCity": "",
          "receiverDistrict": "",
          "receiverAddress": "",
          "receiverZip": ""
        }; // 获取信息
        _toolTip = $("<div id='tooltip' class='viewMarkInfoBox' style='width:auto;'><ul>" + "<li><span>姓名：</span>" + fillDataAry.receiverName + "</li>" + "<li><span>手机：</span>" + fillDataAry.receiverPhone + "</li>" + "<li><span>省份：</span>" + fillDataAry.receiverState + "</li>" + "<li><span>城市：</span>" + fillDataAry.receiverCity + "</li>" + "<li><span>区(县)：</span>" + fillDataAry.receiverDistrict + "</li>" + "<li><span>地址：</span>" + fillDataAry.receiverAddress + "</li>" + "<li><span>邮编：</span>" + fillDataAry.receiverZip + "</li>" + "</ul></div>");
        _toolTip.appendTo($('body'));
        var L = e.pageX,
            Y = e.pageY,
            W = $(window).width(),
            H = $(window).height(),
            OW = _toolTip.outerWidth(true),
            OH = _toolTip.outerHeight(true);
        if (OW > maxWidth) {
          _toolTip.css({
            'width': maxWidth
          });
        } else {
          _toolTip.css({
            'width': 'auto'
          });
          OW = _toolTip.outerWidth(true);
        }
        _toolTip.css({
          'left': L + x + OW > W ? L - OW - x: L + x,
          'top': Y + OH > H ? H - OH: Y,
          'visibility': '',
          'display': 'block'
        });
      }).mouseout(function() {
        _toolTip.remove();
      });
    }
  }
});
//获取店铺一，适用于非系统管理业务
directives.directive({
  "ngShops": ['$http', function($http) {
    return function(scope, element, attr) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.componentRoot + 'shop/selector/' + CAMPAIGN_STATIC.tenantId
      }).success(function(data, status, headers, config) {
        for (var i = 0; i < data.length; i++) {
          var html = $("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
          element.append(html);
        }

      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
  }]
});
//获取店铺一，适用于系统管理业务
directives.directive({
  "ngSystmShops": function() {
    return function(scope, element, attr) {

    }
  }
});

//名称验证只能是数字、英文、汉字
directives.directive('inputActivityName', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    var isMarket = attrs.inputActivityName;
    var nReg = (isMarket == "market" ? /[^\u4e00-\u9fa5a-zA-Z0-9ü\s_]/g: /[^\u4e00-\u9fa5a-zA-Z0-9ü\s]/g);
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      checkName(event);

    });
    //防止黏贴过来的错误问题吧
    elem.on('blur', function(event) {
      checkName(event);
    });

    function checkName(event) {
      var val = event.target.value;
      //如果从复制过来的不合规范的内容
      if (nReg.test(val) || val.length > 20) {
        val = val.replace(nReg, "");
        event.target.value = val;
      }
      if (attrs.inputActivityName != 'true' && val.length > 20) {
        val = val.slice(0, 20);
        event.target.value = val;
      }

      var names = attrs.ngModel.split('.');
      var temp = scope[names[0]];
      if (names[0] != "customObj") { //自定义属性，打开值不能初始化判
        $parse(attrs.ngModel).assign(scope, $.trim(val));
      }
    }
  }
}]);
//名称验证只能是数字、英文、汉字
directives.directive('inputNormalName', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    var nReg = /[^\u4e00-\u9fa5a-zA-Z0-9ü\s]/g; ///^([\u4e00-\u9fa5]|[a-zA-Z])+$/;
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      var val = event.target.value;
      if (!val) {
        return;
      } else {
        checkName(event);
      }
    });
    //防止黏贴过来的错误问题吧
    elem.on('blur', function(event) {
      checkName(event);
    });

    function checkName(event) {
      var val = event.target.value;
      //如果从复制过来的不合规范的内容
      if (nReg.test(val) || val.length > 20) {
        val = val.replace(nReg, "");
        event.target.value = val;
      }
      $parse(attrs.ngModel).assign(scope, $.trim(val));

    }
  }
}]);
//名称验证只能是数字、英文、汉字、横线、下划线
directives.directive('inputPartitionName', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    var nReg =  /[^\u4e00-\u9fa5a-zA-Z0-9ü_\-\s]/g;
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }else {
          scope.creatGroupObj.errorFalg = false;
          scope.creatGroupObj.errorMark = "";
      }
      checkName(event);

    });
    //防止黏贴过来的错误问题吧
    elem.on('blur', function(event) {
      checkName(event);
    });

    function checkName(event) {
      var val = event.target.value;
      //如果从复制过来的不合规范的内容
      if (nReg.test(val) || val.length > 45) {
        val = val.replace(nReg, "");
        event.target.value = val;
      }
      if (attrs.inputActivityName != 'true' && val.length > 45) {
        val = val.slice(0, 45);
        event.target.value = val;
      }

      var names = attrs.ngModel.split('.');
      var temp = scope[names[0]];
      if (names[0] != "customObj") { //自定义属性，打开值不能初始化判
        $parse(attrs.ngModel).assign(scope, $.trim(val));
      }
    }
  }
}]);
//优惠管理备注验证只能是数字、英文、汉字
directives.directive('inputRemark', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    var nReg = /[^\u4e00-\u9fa5a-zA-Z0-9ü\s]/g; ///^([\u4e00-\u9fa5]|[a-zA-Z])+$/;
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      var val = event.target.value;
      if (!val) {
        return;
      }
      checkName(event);

    });
    //防止黏贴过来的错误问题吧
    elem.on('blur', function(event) {
      checkName(event);
    });

    function checkName(event) {
      var val = event.target.value;
      //如果从复制过来的不合规范的内容
      if (nReg.test(val) || val.length > 200) {
        val = val.replace(nReg, "");
        event.target.value = val;
      }
      if (attrs.inputActivityName != 'true' && val.length > 200) {
        val = val.slice(0, 200);
        event.target.value = val;
      }
      $parse(attrs.ngModel).assign(scope, $.trim(val));
    }
  }
}]);

//输入小数点数字 ngNumberPoint的值说明保留几位小时
directives.directive("ngNumberPoint", ['$parse', function($parse) {
  return function(scope, element, attrs) {
    var maxValue = attrs.max || 100,
        minValue = attrs.min || 0,
        pointNumber = attrs.ngNumberPoint * 1;

    scope.$watch(attrs.ngModel, function() {
      if (parseInt(scope.$eval(attrs.ngModel)) < minValue) {
        parseInt(scope.$eval(attrs.ngModel)) = minValue
      }
    });

    element.on("input", function(event) {
      var inputEditorVal = event.target.value.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(/(^\d+\.\d+)\./g, "$1");
      event.target.value = inputEditorVal; //先把非数字的都替换掉，除了数字和.
      if (/^0\d$/.test(inputEditorVal)) {
        inputEditorVal = "0";
      };
      if (inputEditorVal.indexOf(".") != -1) {
        if (pointNumber == 0) {
          event.target.value = inputEditorVal.substring(0, inputEditorVal.indexOf("."));
        } else {
          event.target.value = inputEditorVal.substring(0, inputEditorVal.indexOf(".") + (pointNumber + 1));
        }
      } else {
        event.target.value = inputEditorVal //先把非数字的都替换掉，除了数字和.
      }
      if (maxValue && inputEditorVal * 1 > maxValue * 1) {
        event.target.value = maxValue;
        $parse(attrs.ngModel).assign(scope, maxValue);
      }
      $parse(attrs.ngModel).assign(scope, event.target.value);
    });
  }
}])
//分页输入框 页数的指令
directives.directive('ngSearchNumber', ['$compile', '$parse', function($compile, $parse) {
  return {
    restrict: 'EA',
    transclude: true,
    link: function(scope, element, attrs) {
      var $upHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_up\" ng-click=\'up()\' ></span>');
      var $downHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_down\" ng-click=\'down()\'></span>');
      var upHtml = '<span class=\"spanClass\" style=\"position: relative;\">';
      var min = attrs.min || 0;
      var max = (attrs.max != 'undefined') ? attrs.max : 9999;
      var storeValue = scope.$eval(attrs.ngModel);
      var fn = $parse(attrs['ngSearchNumber']);

      scope.$watch(attrs.ngModel, function(nVal, oldVal) { // 赋值最小值 暂时删除
        if (oldVal == undefined) {
          return false;
        }
        if (nVal < attrs.min && nVal != "") {
          $parse(attrs.ngModel).assign(scope, attrs.min);
        };
        if (attrs.max != 0 && nVal * 1 > attrs.max * 1) {
          $parse(attrs.ngModel).assign(scope, attrs.max);
        }
      });

      //只对输入时添加数字验证，删除数字不验证
      element.on("input", function(evt) {
        max = attrs.max || 9999;
        var reg = /[^\d]/;
        var regD = /\d+/;
        var regZero = /^0(\d)$/;
        var viewValue = $.trim(evt.target.value);
        var ary = attrs.ngModel.split('.');
        var modelLength = attrs.ngSearchNumber;
        scope.$apply(function() {
          if (regZero.test(viewValue)) {
            if (modelLength == "2") {
              scope[ary[0]][ary[1]] = regZero.exec(viewValue)[1];
            } else {
              scope[ary[0]][ary[1]][ary[2]] = regZero.exec(viewValue)[1];
            }
          }
          //如果输入的时候输入了非数字的格式，则截取前面为数字的部分,
          if (reg.test(viewValue)) {
            if (modelLength == "2") {
              scope[ary[0]][ary[1]] = (regD.exec(viewValue) || [])[0] - 0;
            } else {
              scope[ary[0]][ary[1]][ary[2]] = (regD.exec(viewValue) || [])[0] - 0;
            }

          } else if (viewValue - 0 > max) {
            if (modelLength == "2") {
              scope[ary[0]][ary[1]] = viewValue.slice(0, viewValue.length - 1) - 0;
            } else {
              scope[ary[0]][ary[1]][ary[2]] = viewValue.slice(0, viewValue.length - 1) - 0;
            }

          }
        });
      });
    }
  }
}]);

//弹框取消事件
directives.directive("ngCloseWindow", function() {
  return function(scope, element) {
    element.bind("click", function() {
      var pop = element.closest(".ccmsPublicPop")
      pop.addClass("ccmsPublicPopAnimated ccmsPublicPopFadeOutUp");
      pop.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
        pop.removeClass("ccmsPublicPopAnimated ccmsPublicPopFadeOutUp").hide();
      });
      $(".yunat_maskLayer:last").remove();
      if (disposeCommMethod.shuyunAjaxButtonGlobaValue == false) { // ajax请求未返回关闭窗口赋值 可点击状态
        disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
      }
    });
  };
});

//节点子弹框取消事件
directives.directive("ngCloseChildWindow", function() {
  return {
    scope: {
      data: '=',
      maxLength: "@"
    },
    link: function (scope, element, attrs) {
      element.bind("click", function () {
        if (scope.data && scope.data.length > scope.maxLength) {
          return '保存失效'
        }
        element.closest(".ccmsPublicPop").hide();
        if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
          if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
            if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
              element.closest(".commCustomConfigBox").find(".childElementMark").remove(); //class commCustomConfigBox 自定义属性 专属class
            }
          } else {
            angular.element(".ccmsPublicPop").find(".childElementMark").remove();
          }
        } else {
          angular.element(".yunat_maskLayer:last").remove();
        }
      });
    }
  }
});
//共用模拟select框
//模拟select框
directives.directive('commSelectConfig', function() {
  return function(scope, element, attrs) {
    var $a = $("<a>").css({
      "width": 15,
      "height": 19,
      "display": "inline-block",
      "position": "absolute",
      "background": "url(/ccms/images/arrows_w10.png) no-repeat 0 0"
    });
    element.after($a);
    var left = element.position().left;
    var top = element.position().top;
    if(element.hasClass("wucha")){top-=11;}//定向优惠节点和微信节点箭头位置误差修复
    var eleWidth = element.outerWidth();
    var eleHeihgt = element.outerHeight();
    if (attrs["class"].indexOf("ml5") == -1) { // 定位下拉箭头位子
      var arrowsWidth = left + eleWidth - 8;
    } else {
      var arrowsWidth = left + eleWidth - 14;
    };
    if (attrs["class"].indexOf("style-mark") != -1) { // 定位下拉箭头位子
      arrowsWidth -=  3;
    }
    var arrowsHeight = top + (eleHeihgt - 19) / 2;
    $a.css({
      "left": arrowsWidth,
      "top": arrowsHeight
    });
    var $div = $("<div>", {
      "class": "selectContent"
    }).css({
          "display": "none",
          "position": "absolute",
          "border": "1px solid #CCC",
          "background": "#fff",
          "overflow-x": "hidden",
          "zIndex": 2
        });
    element.after($div);
    var divWidth = element.innerWidth();
    var divLeft = left + parseInt(element.css("marginLeft"));
    var divTop = top + eleHeihgt;
    $div.css({
      "width": divWidth,
      "max-height": 200,
      "left": divLeft - 1,
      "top": divTop,
      "overflow-y": "auto",
      "cverflow-x": "hidden"
    });
    element.click(function() {
      scope.$apply(function() {
        scope.$eval(attrs.commSelectConfig);
      });
      $div.slideToggle(200);
    });
    $a.click(function() {
      var selectButtonStatus = scope.$eval(attrs.ngDisabled);
      if (!selectButtonStatus) {
        scope.$apply(function() {
          scope.$eval(attrs.commSelectConfig);
        });
        $div.slideToggle(200);
      }
    });
    $div.on("mouseleave", function() {
      $(this).slideUp(200);
      element.on("blur",
          function() {
            $div.slideUp(200);
          })
    });
    $div.on("mouseenter", function() {
        element.off('blur');
      });
    element.on("blur", function() {
      $div.slideUp(200);
    })
  }
});
//ng-visibility模拟
directives.directive("ngVisibility", function() {
  return function(scope, element, attr) {
    scope.$watch(attr.ngVisibility, function(n) {
      if (n) {
        element.css("visibility", "hidden");
      } else {
        element.css("visibility", "inherit");
      }
    })
  };
});
/** added by Anmi 2014 3 19 黑红名单*/
directives.directive('addGroupInput', function() {
  return function(scope, elem, attrs) {
    var reg = /[^\u4e00-\u9fa5a-zA-Z0-9ü\s]/; ///^([\u4e00-\u9fa5]|[a-zA-Z])+$/;
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      if (event.target.value.match(reg)) {
        scope.itemName = "";
        scope.$digest();
      }
    });
    elem.on('blur', function(event) {
      if (event.target.value.match(reg)) {
        scope.itemName = "";
        scope.$digest();
      }
    })
  }
});

directives.directive('addActivityInput', function() {
  return function(scope, elem, attrs) {
    var reg = /[^\u4e00-\u9fa5a-zA-Z0-9ü\s]/g; ///^([\u4e00-\u9fa5]|[a-zA-Z])+$/;
    elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
      var val = event.target.value;
      if (!val || !$.trim(val)) {
        return;
      }
      //空值验证，红色border
      if (scope.isInputEmpty || scope.isExisted) {
        //影藏之前的验证
        scope.isInputEmpty = false;
        scope.isExisted = false;
        scope.$digest();
      }
      if (val.match(reg)) {
        scope.itemName = val.replace(val.match(reg)[0], '');
        event.target.value = scope.itemname;
        scope.$digest();
      }
    });
    elem.on('blur', function(event) {
      if ($('.ccmsPublicPopBg').length) {
        return
      }
      if (event.target.value.match(reg)) {
        $(this).Alert({
          "title": "提示",
          "str": "格式错误",
          "mark": true
        });
        scope.isInputEmpty = true;
        scope.$digest();
      }
    })
  }
});
/*
 *公用指令
 *使用范围：整个ccms系统
 *作用：处理angularjs中select框option repeat后，传值val不能被选中问题
 *接受参数：1.选中的val值 2.当前repeat的option val值
 */
directives.directive('selectedOption', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    var str1 = attrs.selectedOption.split(",")[0],
        str2 = attrs.selectedOption.split(",")[1],
        val1 = getVal(scope, str1),
        val2 = getVal(scope, str2);
    if (val1 == val2) {
      //为选中元素
      elem.attr("selected", "selected");
    }
  }
  //查询一个对象下的属性值
  function getVal(data, name) {
    if (name.indexOf(".") === -1) {
      return data[name];
    } else {
      var names = name.split("."),
          i = 1,
          current = data[names[0]];
      for (; i < names.length; i++) {
        //不存在，退出
        if (!current) break;
        current = current[names[i]];
      }
      return current ? current: null;
    }
  };
}]);
/*
 *公用指令
 *使用范围：整个ccms系统
 *作用：tab标签切换
 *接受参数：字符串（切换实体的类）
 */
directives.directive('ccmsTabs', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    elem.children().click(function(element) {
      //获取点击元素
      var targetEle = element.target;
      $(targetEle).addClass("hover").siblings().removeClass("hover");
      //获取点击元素的索引
      var index = $(elem).children().index(targetEle);
      //获取切换实体元素
      var penelEle = null;
      penelEle = $("." + attrs.ccmsTabs);
      if (!penelEle) {
        penelEle = $("#" + attrs.ccmsTabs);
      }
      penelEle.children().hide();
      penelEle.children().eq(index).show();
    });
  }
}]);
/*
 *公用指令
 *使用范围：整个ccms系统
 *作用：在父级作用域中定义一个变量，子作用域中去改变他的值（这里指通过页面中的ng-model改变），此时父级中的作用域中的变量不会改变，为保证数据的同步，需要刷新父级作用域下的变量
 *注：该指令只做了跨一个作用域的情况
 */
directives.directive('refreshOptionsModel', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    var model = attrs.ngModel;
    scope.$watch(model, function(nVal, oVal) {
      scope.$parent[model] = nVal;
    },
    true);
  }
}]);

/*
 *公用指令
 *使用范围：节点头部banner提示效果
 *作用：toggle切换
 */
directives.directive('toggleBanner', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    elem.click(function() {
      var curClass = elem.attr("class");
      if (curClass.indexOf("downSanjiao") != -1) {
        elem.removeClass("downSanjiao").addClass("upSanjiao");
        elem.closest("div").addClass("areaHeightAuto");
        elem.attr("title", "收起");
      } else {
        elem.addClass("downSanjiao").removeClass("upSanjiao");
        elem.closest("div").removeClass("areaHeightAuto");
        elem.attr("title", "展开");
      }
    });
  }
}]);

/* 非公用指令
 * 活动选择器 活动状态选择指令
 */
directives.directive('activitySelectedSelector', ['$rootScope', function($rootScope) {
  var statusMap = {
    "所有状态活动": "A0",
    "设计中": "A1",
    "待审批": "A2",
    "待执行": "A3",
    "终止": "A4",
    "执行完成": "A5",
    "异常": "A6",
    "设计时预执行": "B1",
    "待审批时预执行": "B2",
    "执行中": "B3"
  };
  return {
    template: '<div class="type_selector"><div class="ac_status_selector ac_status ac_status_A0">{{statusValue}}<a></a></div><div class="ac_status_selector ac_status_selector2 ac_status ac_icon_A0">{{statusValue}}<a></a></div> <div class="select_wrap"><div class="select_item ac_item_A0 ac_status" ng-click="activityScopeObj.hdCurStatus()">所有状态活动</div>' + '<div class="select_item  ac_status ac_item_A1" ng-click="activityScopeObj.hdCurStatus(\'A1\')">设计中</div> ' + '<div class="select_item  ac_status ac_item_B1" ng-click="activityScopeObj.hdCurStatus(\'B1\')">设计时预执行</div>' + '<div class="select_item  ac_status ac_item_A2" ng-click="activityScopeObj.hdCurStatus(\'A2\')">待审批</div>' + '<div class="select_item  ac_status ac_item_B2" ng-click="activityScopeObj.hdCurStatus(\'B2\')">待审批时预执行</div> ' + '<div class="select_item  ac_status ac_item_A3" ng-click="activityScopeObj.hdCurStatus(\'A3\')">待执行</div> ' + '<div class="select_item  ac_status ac_item_B3" ng-click="activityScopeObj.hdCurStatus(\'B3\')">执行中</div> ' + '<div class="select_item  ac_status ac_item_A4" ng-click="activityScopeObj.hdCurStatus(\'A4\')">终止</div>' + '<div class="select_item  ac_status ac_item_A5" ng-click="activityScopeObj.hdCurStatus(\'A5\')">执行完成</div> ' + '<div class="select_item  ac_status ac_item_A6" ng-click="activityScopeObj.hdCurStatus(\'A6\')">异常</div> </div> </div>',
    link: function(scope, elem, attrs) {
      var isShow, defalutStatusValue = "";
      var list = elem.find(".select_wrap");
      list.hide();
      //var input = elem.find("input");
      var inputs = elem.find(".ac_status_selector");

      elem.on('mouseenter', function() {
        list.show();
        inputs.addClass('ac_status_selector_hover');

      }).on('mouseleave', function() {
        list.hide();
        inputs.removeClass('ac_status_selector_hover');
      });

      if ($rootScope.defaultAcType) { // 获取默认状态代码的名称
        for (var s in statusMap) {
          if (statusMap[s] == $rootScope.defaultAcType) {
            defalutStatusValue = s;
          }
        }
      };
      scope.statusValue = defalutStatusValue || "所有状态活动"; //是否是首页切换来的，是则有默认的值
      scope.acType = $rootScope.defaultAcType || "A0";
      scope.$watch("acType", function(type) {
        if (type) {
          inputs[1].className = inputs[1].className.replace(/[AB]\d/, type);
        }
      });

      list.find('div').on("click", function(event) {
        var value = event.target.textContent || event.target.innerHTML;
        if (value) {
          scope.statusValue = value;
          scope.acType = statusMap[value];
          scope.$digest();
        }
        list.hide();
      });
    }
  };
}]);

//选择器单选、多选样式 状态
directives.directive("ngChoseStyle", function() {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      if (attrs.ngChoseUnit == "Radio") { // 单选
        element.siblings("li").removeClass("cur");
      }
      element.toggleClass("cur");
    });
  }
});

// 字符串处理
directives.filter("omit", function() {
  return function(value, number) {
    if(!value) return ''
    var omit = (value.indexOf('.') != -1) ? value.substring(number, value.indexOf('.')+1): value.substring();
    value = (number > value.indexOf('.')) ? value : value.replace(omit, '....');
    return value;
  }
});

// 字符串转译
directives.filter("translate", function() {
  return function(value, number) {
    if(!value) return '';
    number = number || '';
    var exg = new RegExp('<(?!' + number +')')
    value = value.replace(exg, '&lt;')
    return value;
  }
});
})();
