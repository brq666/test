(function (){
  var directives = angular.module('dmCommondirectives', []);
//ztree的右键菜单
directives.directive('dmZtreemenu', function() {
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
//tree的搜索框
directives.directive('dmTreeNodeSearchInput', ['$parse', function($parse) {
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
        elem.siblings("label").text(elem.attr("dm-placeholder"));
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
directives.directive('dmPlaceholder', function() {
  return {
    restrict: 'EA',
    //replace: true,
    transclude: true,
    link: function(scope, element, attrs, $compile, $parse) {
      //var top = element.position().top;
      //var left = element.position().left;
      //修改EDM测试邮箱ng-placeholder的位置
      if(attrs.dmPlaceholder=="多个email用','隔开。"){
        var $label = $("<label for=\"male\" class=\"ngplaceholder edmlabel\"></label>");
      }else{
        var $label = $("<label for=\"male\" class=\"ngplaceholder\"></label>");
      }

      var upHtml = '<span class=\"spanClass\" ng-click="holderClick()"  class=\"ngplaceholder_wrapper\">';
      var $ele = $(element[0]);
      element.wrap(upHtml);
      element.after($label);

      $label.text(attrs.dmPlaceholder);



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

//查询节点配置 ztree
directives.directive('dmQueryZtree', ['$window', function($window) {
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
    if (attrs.dmQueryZtree != "rightFalse") { //判断是否促发右击事件
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
      if (attrs.dmQueryZtree != "rightFalse") {
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

//数据管理共用的dmtitle
directives.directive({
  "dmTitle": function() {
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
        _toolTip.html(attr.dmTitle).css({
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
  "dmTitleAddress": function() {
    return function(scope, element, attr) {
      var x = 14,
          _toolTip; // x,y 默认偏移量
      element.mouseover(function(e) {
        var maxWidth = parseInt(element.attr('ng-title-max')) || 180;
        var fillDataAry = scope.$eval(attr.dmTitleAddress) || {
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

//名称验证只能是数字、英文、汉字
directives.directive('dmInputActivityName', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    var isMarket = attrs.dmInputActivityName;
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
      if (attrs.dmInputActivityName != 'true' && val.length > 20) {
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
directives.directive('dmInputNormalName', ['$parse', function($parse) {
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

//分页输入框 页数的指令
directives.directive('dmSearchNumber', ['$compile', '$parse', function($compile, $parse) {
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
      var fn = $parse(attrs['dmSearchNumber']);

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
        var modelLength = attrs.dmSearchNumber;
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
directives.directive("dmCloseWindow", function() {
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

/** added by Anmi 2014 3 19 黑红名单*/
directives.directive('dmAddGroupInput', function() {
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

// 字符串处理
directives.filter("dmomit", function() {
  return function(value, number) {
    if(!value) return ''
    var omit = (value.indexOf('.') != -1) ? value.substring(number, value.indexOf('.')+1): value.substring();
    value = (number > value.indexOf('.')) ? value : value.replace(omit, '....');
    return value;
  }
});

directives.directive("inputMultiple", function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      iDisabled: "<",
      selectValues: "<",
      checkValue: "&"
    },
    template: '<div class="input-multiple" ng-mousedown="getFocus()" ng-class="{\'div-disabled\': iDisabled}">\
                <div class="selection__rendered">\
                  <div class="selection__placeholder" ng-show="isShowPlaceholder">\
                  </div>\
                  <ul>\
                    <li ng-repeat="selectValue in selectValues" class="selection__choice" title="{{selectValue}}">\
                      <div class="selection__choice__content">{{selectValue}}</div>\
                      <i class="selection__choice__remove iconfont icon-close" ng-click="$event.stopPropagation(); selectValues.splice($index, 1)"></i>\
                    </li>\
                    <li class="search--inline">\
                      <div class="search__field__wrap">\
                        <input autocomplete="off" value="" class="search__field" ng-keyup="changeInputComplete($event)" ng-keydown="changeInput($event)">\
                        <span class="search__field__mirror">&nbsp;</span>\
                      </div>\
                    </li>\
                  </ul>\
                </div>\
              </div>',
    link: function(scope, element, attr) {

      Object.defineProperty(scope, "isShowPlaceholder", {
        get : function(){
          return $(".search__field")[0].value || scope.selectValues.length > 0 ? false : true;
        }
      });

      scope.getFocus = function() {
        setTimeout(function() {
          $(".search__field").focus();
        })
      };

      scope.changeInput = function(event) {
        if (event.keyCode === 8) {
          scope.selectValues.length > 0 && !event.target.value && scope.selectValues.splice(-1);
          scope.checkValue({curEditorValue: event.target.value, selectValuesList: scope.selectValues});
        }
      };

      scope.changeInputComplete = function(event) {
        var target = event.target;
        if (event.keyCode === 13 || event.keyCode === 32) {
          var val = target.value.trim();
          if (!val) {
            target.value = "";
            return;
          }
          var flag = scope.checkValue({curEditorValue: val, selectValuesList: scope.selectValues});
          flag && scope.selectValues.push(val);
          // val && !~scope.selectValues.findIndex(function(selectValue) {
          //   return selectValue === val;
          // }) && scope.selectValues.push(val);
          flag && (target.value = "");
        }
        $(target).css("width", target.value.length * 13 + "px");
      };

    }
  };
});
})();
