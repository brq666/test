angular.module("campaign.controllers").controller('CustomerGroupNode', ['$scope', '$http', 'getListService',
  function($scope, $http, getListService) {
    $scope.openNodePop(); //调用弹框方法
    //客服分组节点ztree初始化
    $scope.treeSettings = {
      view: {
        selectedMulti: false
      },
      data: {
        simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentId"
        },
        key: {
          name: "categoryName"
        }
      }
    };
    //标志树的根节点外外部
    $scope.hasOutRoot = true;
    $scope.FIXNODENAME = "未分类";

    $scope.getAllNodes = function() {
      $http.get(GLOBAL_STATIC.nodeRoot + "node/group/category/" + CAMPAIGN_STATIC.tenantId + "/?_=" + new Date().getTime()).success(succcb).error(errcb);

      function succcb(res) {
        $scope.treeNodes = res;
      }

      function errcb() {
        $scope.treeNodes = [];
      }
    };

    $scope.getAllNodes();

    //客服分组节点ztree初始化 end
    //搜索框
    $scope.searchTreeNodes = function(searchValue) {
      $scope.tree.searchNode(searchValue);
    };
    $scope.customgroupScopeObj = {
        "name": "客户分组",
        "initDefaultCustomerGroupLists": [],
        // 用于搜索空值赋值
        "customerGroupLists": [],
        "categoriesList": [],
        "fillData": function() {
          var _this = this;
          getListService.openCustomerGroup(function(response) {
            _this.name = response.name || "客户分组";
            _this.id = response.id || "";
            $scope.nodecomment = response.remark || "";
            _this.type = response.type || "NEW";
            _this.customerGroupLists = response.groupList || [];
            if (response.categoryList) {
              $scope.allcategory = response.categoryList.pop();
            } // 除去所有
            _this.categoriesList = response.categoryList || [];
            _this.initDefaultCustomerGroupLists = _this.customerGroupLists.slice();

            if (_this.type == "NEW") {
              _this.newValue = response.groupName || "";
              _this.newValueId = response.groupId || "";
              _this.categoryId = response.categoryId || "";
              angular.forEach(_this.categoriesList, function(val, key) {
                if (val.id == _this.categoryId) {
                  _this.categoryName = val.categoryName;
                }
              });
            } else if (_this.type == "MERGE") {
              _this.mergeValue = response.groupName || "";
              _this.mergeValueId = response.groupId || "";
              _this.curSelectedGroupName = _this.mergeValue;
            } else if (_this.type == "EXCLUDE") {
              _this.excludeValue = response.groupName || "";
              _this.excludeValueId = response.groupId || "";
              _this.curSelectedGroupName = _this.excludeValue;
            }
          });

          getListService.getNodeTipsByType(function(responseTips) { // 获取tips
            _this.tips = responseTips.tips || "";
          }, "tdatacustomgroup");
        },
        "changeCustomerGroupRadio": function() {
          this.newValue = "";
          this.newValueId = "";
          this.mergeValue = "";
          this.mergeValueId = "";
          this.excludeValue = "";
          this.excludeValueId = "";
          this.defaultRadioSelect = "";
          this.curSelectedGroupName = "";
          angular.element("[name='categoryNodeInput']").attr({
            "valueid": "",
            "value": ""
          });
          this.newGroupFlag = false;
          this.excludeValueInputFlag = false;
          this.mergeValueInputFlag = false;
          angular.element("#customerGroupNodeForm").find("input").removeClass("error");
          this.newGroupFlag = false;
          this.mergeValueInputFlag = false;
          this.excludeValueInputFlag = false;
        },
        "selectCustomerGroupList": function(type) {
          this.mergeValueInputFlag = false;
          this.excludeValueInputFlag = false;
          var _this = this;
          if (type == "exclude") {
            if (_this.type != "EXCLUDE") {
              return false;
            }
          } else if (type = "megre") {
            if (_this.type != "MERGE") {
              return false;
            }
          } else {
            return false;
          }
          this.updateGroupById($scope.allcategory.id);
          $(".commDataTableStyle").addInteractivePop({
            magTitle: "请选择客户分组",
            width: 950,
            height: 530,
            mark: false,
            position: "fixed",
            childElePop: true
          });
        },
        "selectCategory": function() { // 选择活动分类
          var _this = this;
          if (_this.type == 'NEW') {
            $scope.customgroupScopeObj.commonTree(_this.categoriesList, $('[name="categoryNodeInput"]'));
          }
        },
        "updateGroupById": function(id) { // 点击右侧数更新分组
          var categoryCroupId = id,
            _this = this;
          getListService.getCurCustomerGroupData(function(response) {
            _this.customerGroupLists = response || [];
            _this.initDefaultCustomerGroupLists = _this.customerGroupLists.slice();
          }, categoryCroupId)
        },
        "creatNewGroupInput": function() { // 新建分组focus
          $scope.newGroupNameMarkFlag = false;
          angular.element("[name='newValueInput']").focus();
        },
        "changeCurGroupTitleView": function(b) { // 当前选择的分组
          this.curSelectedGroupName = b;
        },
        "delTitle": function() { // 删除title
          angular.element(".customerGroupNodePage .customerGroupSelected input[name='customerGroupList']").attr("checked", false);
          this.curSelectedGroupName = "";
          this.mergeValue = "";
          this.mergeValueId = "";
          this.excludeValue = "";
          this.excludeValueId = "";
        },
        "commonTree": function(data, ele) { //模拟select框中为树形结构
          var $selContent = ele.siblings(".selectContent");
          $selContent.children().remove();
          var $ul = $("<ul>", {
            "class": "ztree"
          });
          $selContent.append($ul);
          if (data) {
            function onClick(event, treeId, treeNode) {
              ele.val(treeNode.categoryName);
              ele.attr("valueId", treeNode.id);
              $selContent.slideUp(200);
            }
            var setting = {
              data: {
                key: {
                  title: "name",
                  name: "categoryName"
                },
                simpleData: {
                  enable: true,
                  pIdKey: "parentId"
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
            $.fn.zTree.init($ul, setting, data);
          }

        },
        "fillSelectedData": function() { // 确认选择分组
          var _this = this;
          var curSelectedName = angular.element(".customerGroupSelected input[name='customerGroupList']:checked").attr("groupname"),
            curSelectedId = angular.element(".customerGroupSelected input[name='customerGroupList']:checked").attr("value");
          if (_this.type == "EXCLUDE") {
            _this.excludeValue = curSelectedName;
            _this.excludeValueId = curSelectedId;
          } else if (_this.type == "MERGE") {
            _this.mergeValue = curSelectedName;
            _this.mergeValueId = curSelectedId;
          };
          angular.element(".customerGroupSelected").hide();
          angular.element(".childElementMark").remove();
          angular.element("#customerGroupNodeForm").find("input").removeClass("error");
          this.newGroupFlag = false;
          this.mergeValueInputFlag = false;
          this.excludeValueInputFlag = false;
        },
        "getEditorData": function() {
          var _this = this;
          var immediatelyData = {
            "id": graph.nodeId,
            "name": _this.name || "",
            "remark": $scope.nodecomment || "",
            "type": _this.type,
            "categoryId": ""
          };
          if (immediatelyData.type == "NEW") {
            immediatelyData.groupName = _this.newValue;
            immediatelyData.groupId = _this.newValueId * 1 || "";
            immediatelyData.categoryId = angular.element("[name='categoryNodeInput']").attr("valueid") * 1;
          } else if (immediatelyData.type == "EXCLUDE") {
            immediatelyData.groupName = _this.excludeValue || "";
            immediatelyData.groupId = _this.excludeValueId * 1;
          } else if (immediatelyData.type == "MERGE") {
            immediatelyData.groupName = _this.mergeValue || "";
            immediatelyData.groupId = _this.mergeValueId * 1;
          };

          return immediatelyData;
        },
        "postCustomerGroupDataMethod": function(ent) {
          var servicePostData = $scope.customgroupScopeObj.getEditorData(),
            _this = this;
          if ($scope.customgroupScopeObj.name == "") {
            return false;
          };
          if (servicePostData.type == "NEW") {
            if (servicePostData.groupName == "") {
              _this.newGroupFlag = true;
              _this.newGroupErrorMark = "请填写新分组名称";
              return false;
            } else if (servicePostData.categoryId == "") {
              _this.newGroupFlag = true;
              _this.newGroupErrorMark = "请选择活动所属分类";
              return false;
            } else {
              _this.newGroupFlag = false;
            }
          } else if (servicePostData.type == "MERGE") {
            if (servicePostData.groupName == "") {
              _this.mergeValueInputFlag = true;
              return false;
            } else {
              _this.mergeValueInputFlag = false;
            }
          } else if (servicePostData.type == "EXCLUDE") {
            if (servicePostData.groupName == "") {
              _this.excludeValueInputFlag = true;
              return false;
            } else {
              _this.excludeValueInputFlag = false;
            }
          }

          var element = angular.element(ent.target);
          disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
            getListService.postCustomerGroupData(function(response) {
              disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
              element.closest("#nodeContent").hide();
              $(".yunat_maskLayer").remove();
              $(this).yAlert({
                "text": "保存成功"
              });
              removeAlert();
              $scope.editNodeName(response.id, response.name, $scope.nodecomment);
            }, servicePostData, element);
          }, element);
        }
      }
      //监听新建客户组
    $scope.$watch("customgroupScopeObj.newValue", function(newV, oldV) {
      if (newV == "" || newV == undefined) {
        $scope.newGroupNameMarkFlag = true;
      } else {
        $scope.newGroupNameMarkFlag = false;
      }
    });
    angular.element("[name='newValueInput']").blur(function() {
      $scope.$apply(function() {
        if ($scope.customgroupScopeObj.newValue == "" || $scope.customgroupScopeObj.newValue == undefined) {
          $scope.newGroupNameMarkFlag = true;
        }
      });
    });

    //监听搜索
    $scope.$watch("customgroupScopeObj.selectTable", function(newVal) {
      var searchResultAry = [];
      if (newVal == "") {
        $scope.customgroupScopeObj.customerGroupLists = $scope.customgroupScopeObj.initDefaultCustomerGroupLists;
        return
      }
      angular.forEach($scope.customgroupScopeObj.customerGroupLists, function(val, key) {
        var flagIndex = (val.groupName).indexOf(newVal);
        if (flagIndex != -1) {
          searchResultAry.push(val);
        };
      });
      $scope.customgroupScopeObj.customerGroupLists = searchResultAry.slice();
    });
    $scope.customgroupScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }
]);
