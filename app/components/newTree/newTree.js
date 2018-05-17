; (function (angular) {
  var m = null;
  try {
    m = angular.module('commondirectives.newTree');
  } catch (e) {
    m = angular.module('commondirectives.newTree', []);
    registered(m);
  }

  function registered(_m) {
    _m.directive("newTreeApi", function () {
      return {
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
          searchPlaceholder: "@",
          noRecordText: "@",
          isType: "@",
          apiId: "@",
          isBoldPlaceholder: "<",
          isSearch: "<",
          mapping: "<",
          readOnly: "<",
          model: "="
        },
        template: '<div>\
                    <div class="serch-box" ng-show="isSearch">\
                      <input type="text" class="textContent" ng-model="textContent" ng-readonly="readOnly" placeholder="{{searchPlaceholder}}" value="{{isBoldPlaceholder ? searchPlaceholder : \'\'}}" ng-change="onSearch(\'change\')" ng-keyup="onSearch($event)">\
                      <i class="iconfont icon-search" ng-click="onSearch(\'search\')" ng-show="isType === \'tree\'"></i>\
                      <i class="iconfont icon-arrow customer-dropdown-select-down" ng-show="isType === \'select\'"></i>\
                    </div>\
                    <div class="tree-box">\
                      <ng-transclude></ng-transclude>\
                      <div class="no-record" ng-show="noRecord" ng-init="noRecord = false">\
                        {{noRecordText}}\
                      </div>\
                    </div>\
                  </div>',
        controller: ["$scope", function ($scope) {
          var that = this;
          var $div;
          var $arrow;
          var $input;
          $scope.zTreeObj;

          if ($scope.isType === "select") {
            $div = $("#" + $scope.apiId + " .tree-box");
            $arrow = $("#" + $scope.apiId + " .icon-arrow");
            $input = $("#" + $scope.apiId + " .textContent");
            $div.css("display", "none");
            $input.on("click", function () {
              $div.slideToggle(200);
            });
            $arrow.on("click", function () {
              $div.slideToggle(200);
            });
            $div.on("mouseleave", function () {
              $div.slideUp(200);
              $input.on("blur", function () {
                $div.slideUp(200);
              })
            });
            $div.on("mouseenter", function () {
              $input.off('blur');
            });
            $input.on("blur", function () {
              $div.slideUp(200);
            });
            $scope.$on("$destroy", function () {
              $div.off();
              $input.off();
              $arrow.off();
            });
            this.slideUp = function () {
              $div.slideUp(200);
            }
            this.selectTreeNode = function (model) {
              $scope.model = model[$scope.mapping.valueField];
              $scope.textContent = model[$scope.mapping.displayField];
              $scope.$apply();
            }
            this.defaultSelectTreeNode = function () {
              var treeArray = $scope.zTreeObj.transformToArray($scope.zTreeObj.getNodes());
              var treeNode = treeArray.filter(function (nodeItem) {
                return nodeItem[$scope.mapping.valueField] === $scope.model;
              })[0];
              $scope.textContent = treeNode && treeNode[$scope.mapping.displayField];
            }
          } else if ($scope.isType === "tree"){
            this.autoCloseFn = function(event) {
              var _con = $("[id^='diyDialog']");
              if(!_con.is(event.target) && _con.has(event.target).length === 0){
                _con.off().remove();
              }
            }
            document.addEventListener('click', this.autoCloseFn, true);
            $scope.$on("$destroy", function () {
              document.removeEventListener('click', this.autoCloseFn, true);
            });
          }

          this.getzTreeObj = function (zTreeObj) {
            return zTreeObj ? ($scope.zTreeObj = zTreeObj) : $scope.zTreeObj;
          }

          this.addNodes = function (parentNode, newNodes) {
            $scope.zTreeObj.addNodes(parentNode, newNodes);
          }

          this.updateNode = function (treeNode) {
            $scope.zTreeObj.updateNode(treeNode);
          }

          this.removeNode = function (treeNode) {
            $scope.zTreeObj.removeNode(treeNode);
          }

          this.removeChildNodes = function (parentNode) {
            return $scope.zTreeObj.removeChildNodes(parentNode);
          }

          this.refresh = function () {
            $scope.zTreeObj.refresh();
          }

          this.expandAll = function (expandFlag) {
            $scope.zTreeObj.expandAll(expandFlag);
          }

          function treeNodesIterator(nodes, text) {
            nodes.forEach(function (node) {
              if (~node.name.toLowerCase().indexOf(text) || ~node.name.toUpperCase().indexOf(text)) {
                hasChildren(node, false, text);
                node.isHidden = false;
              } else {
                hasChildren(node, true, text);
              }
            });
            return !nodes.some(function (node) {
              return node.isHidden === false;
            });
          }

          function hasChildren(node, isHidden, text) {
            if (node.childrenCatalogs.length > 0) {
              node.isHidden = treeNodesIterator(node.childrenCatalogs, text);
            } else {
              node.isHidden = isHidden;
            }
          }

          $scope.onSearch = function (e) {
            if (e === 'change' && $scope.isType === "tree") {
              return;
            }
            if (e === 'change' || e === 'search' || e.keyCode === 13) {
              if ($scope.textContent) {
                $scope.noRecord = treeNodesIterator($scope.zTreeObj.getNodes(), $scope.textContent);
              } else {
                $scope.noRecord = false;
                $scope.zTreeObj.showNodes($scope.zTreeObj.transformToArray($scope.zTreeObj.getNodes()));
              }
              $scope.isType === "select" && ($scope.model = "");
              that.refresh();
              that.expandAll(true);
            }
          }
        }]
      }
    })
      .directive("newTree", function () {
        return {
          require: "^^newTreeApi",
          scope: {
            operationMenu: "<",
            isOperate: "<",
            isExpand: "<",
            loadTreeData: "&",
            operationCallBack: "&",
            childrenKey: "@"
          },
          link: function (scope, element, attr, ztreeCtrl) {

            var setting = {};
            var currentTreeNode;
            var defaultSelectTreeNode;

            setting.view = {
              nameIsHTML: true,
              selectedMulti: false,
              showIcon: false,
              dblClickExpand: false,
              addDiyDom: addDiyDom,
              addHoverDom: scope.isOperate ? addHoverDom : null,
              removeHoverDom: scope.isOperate ? removeHoverDom : null
            };
            setting.data = {
              key: {
                children: scope.childrenKey,
                isParent: "id"
              }
            };
            setting.callback = {
              onClick: zTreeOnClick
            };

            function zTreeOnClick(event, treeId, treeNode) {
              defaultSelectTreeNode !== treeNode && defaultSelectTreeNode && $("#" + defaultSelectTreeNode.tId + "_a").removeClass("curSelectedNode");
              currentTreeNode !== treeNode && currentTreeNode && $("#" + currentTreeNode.tId + "_a").removeClass("curSelectedNode");
              currentTreeNode = treeNode;
              $("#diyBtn_" + treeNode.id).unbind().remove();
              $("[id^='diyMenu']") && $("[id^='diyMenu']").off().remove();
              scope.operationCallBack && scope.operationCallBack({ treeId: treeId, treeNode: treeNode, type: "click" });
              ztreeCtrl.selectTreeNode && ztreeCtrl.selectTreeNode(treeNode);
              ztreeCtrl.slideUp && ztreeCtrl.slideUp();
            }

            function addDiyDom(treeId, treeNode) {
              if (treeNode.canUse && !treeNode.canEdit) {
                defaultSelectTreeNode = treeNode;
                currentTreeNode = treeNode;
                $("#" + currentTreeNode.tId + "_a").addClass("curSelectedNode");
                // aObj.css("margin-left", "-10px");
              }
              var switchObj = $("#" + treeNode.tId + "_switch"),
              icoObj = $("#" + treeNode.tId + "_ico"),
              spaceWidth = 17;
              switchObj.remove();
              icoObj.before(switchObj);
              var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
              switchObj.before(spaceStr);
              if (treeNode.name.length > 8) {
                $("#" + treeNode.tId + "_a span:nth-child(4)").text(treeNode.name.slice(0, 8) + "...");
              }
              // else if (!treeNode.canUse && !treeNode.canEdit) {
              //   aObj.css("margin-left", "-10px");
              // } else {

              // }
            }

            function addHoverDom(treeId, treeNode) {
              if ($("#diyMenu_" + currentTreeNode.id).length > 0 || $("#diyDialog_" + currentTreeNode.id).length > 0) {

              } else {
                treeNode !== currentTreeNode && $("#diyBtn_" + currentTreeNode.id).unbind().remove();
              }
              var editStr;
              var operationType;
              var operationLabel;
              var aObj = $("#" + treeNode.tId + "_a");
              if ($("#diyBtn_" + treeNode.id).length > 0) return;
              if (treeNode.canUse && !treeNode.canEdit) {
                editStr = "<i class='iconfont icon-add' id='diyBtn_" + treeNode.id
                  + "'></i>";
                operationType = "addNode";
                operationLabel = "新建目录";
              } else if (!treeNode.canUse && !treeNode.canEdit) {
                editStr = "";
              }
              else {
                editStr = "<i class='iconfont icon-ep-tree-more' id='diyBtn_" + treeNode.id
                  + "'></i>";
                operationType = "list";
                operationLabel = "菜单";
              }
              aObj.append(editStr);
              var btn = $("#diyBtn_" + treeNode.id);
              if (btn) btn.bind("click", function (event) { event.stopPropagation(); operationList(treeId, treeNode, operationType, operationLabel) });
            }

            function removeHoverDom(treeId, treeNode) {
              if ($("#diyMenu_" + treeNode.id).length > 0 || $("#diyDialog_" + treeNode.id).length > 0) {

              } else {
                $("#diyBtn_" + treeNode.id).unbind().remove();
              }
            }

            function hideCurrentOperationList(treeNode) {
              if (currentTreeNode) {
                if (treeNode !== currentTreeNode) {
                  $("#diyBtn_" + currentTreeNode.id).unbind().remove();
                }
                $("#diyMenu_" + currentTreeNode.id).off().remove();
                // $("#diyDialog_" + currentTreeNode.id).off().remove();
              }
            }

            function operationList(treeId, treeNode, operationType, operationLabel) {
              var type;
              var label;
              if (operationType && operationType.target) {
                type = operationType.target.type;
                label = operationType.target.innerText;
              } else {
                type = operationType;
                label = operationLabel;
              }
              hideCurrentOperationList(treeNode);
              currentTreeNode = treeNode;
              if (type.match(/add|update/)) {
                var aObj = $("#" + treeNode.tId);
                var nodeName;
                var btnLables;
                if ($("#diyDialog_" + treeNode.id).length > 0) return;
                if (type.match(/add/)) {
                  nodeName = "";
                  btnLables = ["确定", "取消"];
                } else {
                  nodeName = treeNode.name;
                  btnLables = ["保存", "取消"];
                }
                var dialogStr = "<div class='diyDialog' id='diyDialog_" + treeNode.id + "'>\
                                <div class='dheader'>\
                                  <span>" + label + "</span>\
                                </div>\
                                <div class='dbody'>\
                                  <input id='treeNodeName' maxlength='20'/>\
                                </div>\
                                <div class='dfooter'>\
                                  <button class='btn-ok'>" + btnLables[0] + "</button><button class='btn-cancel'>" + btnLables[1] + "</button>\
                                </div>\
                              </div>"
                aObj.append(dialogStr);
                $("#treeNodeName").focus();
                $("#treeNodeName").val(nodeName);
                var diyDialog = $("#diyDialog_" + treeNode.id);
                if (diyDialog) {
                  diyDialog.on("click", "button", function (event) {
                    event.stopPropagation();
                    if (event.target.className === "btn-cancel") {
                      $("#diyDialog_" + treeNode.id).off().remove();
                    } else {
                      updateNodeName(treeId, treeNode, event, type);
                    }
                  }).on("mousedown", function (event) {
                    // event.stopImmediatePropagation();
                    // $("#diyDialog_" + treeNode.id).off().remove();
                  }).on("keyup", "input", function (event) {
                    if (event.which === 13) {
                      updateNodeName(treeId, treeNode, event, type);
                    }
                  });
                }
              } else if (type === "list") {
                showOperationList(treeId, treeNode);
              } else {
                operation(treeId, treeNode, operationType, type);
              }
            }

            function updateNodeName(treeId, treeNode, event, type) {
              var val = $("#treeNodeName")[0].value;
              if (val.trim() === "") {
                $("#nodeTooltip").length === 0 && $("#diyDialog_" + treeNode.id + " .dbody").append("<p id='nodeTooltip' style='color: #ff867c;margin-left: 12px;'>目录名不能为空</p>");
              } else {
                var childrenNodes = treeNode[scope.childrenKey];
                if (type.match(/update/) || (treeNode.canUse && !treeNode.canEdit)) {
                  var parentNode = treeNode.getParentNode();
                  childrenNodes = parentNode ? parentNode[scope.childrenKey] : ztreeCtrl.getzTreeObj().getNodes();
                  val.trim() === treeNode.name && (childrenNodes = []);
                }
                var flag = childrenNodes.some(function (ele) {
                  return ele.name === val.trim();
                })
                if (flag) {
                  $("#nodeTooltip").length === 0 ? $("#diyDialog_" + treeNode.id + " .dbody").append("<p id='nodeTooltip' style='color: #ff867c;margin-left: 12px;'>同级目录名称已存在</p>") : $("#nodeTooltip").text("同级目录名称已存在");
                } else {
                  $("#nodeTooltip").length > 0 && $("#nodeTooltip").remove();
                  operation(treeId, treeNode, event, type);
                }
              }
            }

            function operation(treeId, treeNode, event, type) {
              type !== "list" && scope.operationCallBack && scope.operationCallBack({ treeId: treeId, treeNode: treeNode, type: type, name: $("#treeNodeName") && $("#treeNodeName")[0] && $("#treeNodeName")[0].value }).then(function (data) {
                if (!data) {
                } else {
                  if (data.dynamicRefresh) {
                    scope.loadData().then(function() {
                      ztreeCtrl.expandAll(true);
                    });
                  } else {
                    if (~type.indexOf("add")) {
                      var newNode = {
                        name: $("#treeNodeName")[0].value,
                        canEdit: true,
                        canUse: treeNode.level === 1 ? false : true,
                        childrenCatalogs: []
                      };
                      newNode.id = data.id;
                      if (treeNode.name === "全部") {
                        var index = ztreeCtrl.getzTreeObj().getNodeIndex(ztreeCtrl.getzTreeObj().getNodeByParam("id", -1, null));
                        ztreeCtrl.getzTreeObj().getNodes().splice(index, 0, newNode);
                      } else if (treeNode.name === "未分类") {
                        ztreeCtrl.addNodes(null, newNode);
                      } else {
                        ztreeCtrl.addNodes(treeNode, newNode);
                      }
                      ztreeCtrl.refresh();
                      currentTreeNode && $("#" + currentTreeNode.tId + "_a").removeClass("curSelectedNode");
                      currentTreeNode = ztreeCtrl.getzTreeObj().getNodeByParam("id", data.id);
                      $("#" + currentTreeNode.tId + "_a").addClass("curSelectedNode");
                    } else if (~type.indexOf("update")) {
                      treeNode.name = $("#treeNodeName")[0].value;
                      ztreeCtrl.updateNode(treeNode);
                      ztreeCtrl.refresh();
                      currentTreeNode && $("#" + currentTreeNode.tId + "_a").removeClass("curSelectedNode");
                      currentTreeNode = treeNode;
                      $("#" + treeNode.tId + "_a").addClass("curSelectedNode");
                    } else if (~type.indexOf("remove")) {
                      if ($("#" + treeNode.tId + "_a").hasClass("curSelectedNode")) {
                        currentTreeNode = ztreeCtrl.getzTreeObj().getNodeByParam("id", 0, null);
                        $("#" + currentTreeNode.tId + "_a").addClass("curSelectedNode");
                      }
                      ztreeCtrl.removeNode(treeNode);
                    } else {
                      console.log("无响应");
                    }
                  }
                }
                hideCurrentOperationList();
              });
            }

            function showOperationList(treeId, treeNode) {
              var aObj = $("#" + treeNode.tId);
              if ($("#diyMenu_" + treeNode.id).length > 0) return;
              var OperationStr = "<ul class='diyMenu' id='diyMenu_" + treeNode.id + "'>";
              scope.operationMenu.forEach(function (menu) {
                menu.show && treeNode[menu.show] && (OperationStr += "<li type='" + menu.type + "'>" + menu.label + "<li>");
              })
              OperationStr += "</ul>";
              aObj.append(OperationStr);
              var menuNode = $("#diyMenu_" + treeNode.id);
              if (menuNode) {
                menuNode.on("click", "li", function (event) {
                  event.stopPropagation();
                  operationList(treeId, treeNode, event)
                }).on("mouseleave", function () {
                  $("#diyMenu_" + treeNode.id).off().remove();
                }).on("mouseenter", function () {
                });
              }
            }

            scope.loadData = function () {
              return scope.loadTreeData().then(function (treeData) {
                ztreeCtrl.getzTreeObj($.fn.zTree.init(element, setting, treeData));
                ztreeCtrl.defaultSelectTreeNode && ztreeCtrl.defaultSelectTreeNode();
                scope.isExpand && ztreeCtrl.expandAll(true);
              });
            }
            scope.loadData();
          }
        }
      });
  }
})(angular);