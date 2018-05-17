var campListParams = [];
$('.campaignListCon').flexigrid({
  url: rootStatic + 'queryitem/',
  method: 'GET',
  dataType: 'json',
  nomsg: 'test',
  colModel: [{
    display: '显示名称',
    name: 'attributeName',
    width: 2,
    sortable: true,
    align: 'center',
    dataindex: 'attributeName'
  },
  {
    display: '对应表',
    name: 'tableName',
    width: 2.5,
    sortable: true,
    align: 'left',
    dataindex: 'tableName',
    renderer: function(v) {
      return '<span style="color:#155a77;cursor:pointer">' + v + '</span>'
    }
  },
  {
    display: '对应字段',
    name: 'columnName',
    width: 3.5,
    sortable: true,
    align: 'center',
    dataindex: 'columnName'
  },
  {
    display: '字段类型',
    name: 'columnType',
    width: 2,
    sortable: true,
    align: 'left',
    dataindex: 'columnType',
    renderer: function(v) {
      if (v == null || v == "null") {
        return "";
      } else {
        return v;
      }
    }
  },
  {
    display: '查询类型',
    name: 'queryTypeName',
    width: 2,
    sortable: true,
    align: 'left',
    dataindex: 'queryTypeName'
  },
  {
    display: '配置人',
    name: 'userName',
    width: 2,
    sortable: true,
    align: 'left',
    dataindex: 'userName',
    renderer: function(v) {
      if (v == null || v == "null") {
        return "";
      } else {
        return v;
      }
    }
  },
  {
    display: '配置时间',
    name: 'modified',
    width: 2,
    sortable: true,
    align: 'left',
    dataindex: 'modified',
    renderer: function(v) {
      return "<span class='ac_status_grid ac_status ac_status_" + v + "'>" + setISO(v, "all") + "</span>";

    }
  },
  {
    display: '操作',
    name: 'operation',
    width: 2,
    align: 'center',
    dataindex: 'campId',
    mapping: ['categoryId', 'id'],
    convert: function(v, mappVal) {
      return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="configuration.modification(' + mappVal[0] + ',\'' + mappVal[1] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-delete-configquery></a>'
      if (mappVal[0].indexOf("W") > 0 && mappVal[0].indexOf("D") > 0) {
        return '<a href="javascript:void(0);" class="show_modify_btn" title="修改" ng-click="configuration.modification(' + mappVal[0] + ',\'' + mappVal[1] + '\')"></a><a href="javascript:void(0);" class="show_del_btn" title="删除" ng-delete-configquery></a>'
      } else if (mappVal[0].indexOf("W") > 0) {
        return '<a href="javascript:void(0);" class="show_modify_btn" title="修改" ng-click="configuration.modification(' + mappVal[0] + ',\'' + mappVal[1] + '\')"></a>'
      } else if (mappVal[0].indexOf("D") > 0) {
        return '<a href="javascript:void(0);" class="show_del_btn" title="删除"  ng-delete-configquery></a>'
      } else {
        return '';
      }

    }
  }],
  params: campListParams,
  updateDefaultParam: true,
  sortname: "id",
  sortorder: "desc",
  rp: 20,
  usepager: true,
  useRp: true,
  showTableToggleBtn: true,
  colAutoWidth: true,
  rowDblClick: function() {},
  onSuccess: function() {
    var scope = angular.element(document.querySelector('.campaignListCon')).scope();
    scope.gridObj.compileTpl(scope);
  },
  onError: function(response) {
    if (response.status == 401) {
      location.pathname = root + 'login.html';
      return;
    }
  }
});

/*查询节点配置控制器 start*/
angular.module('ccmsApp').controller('ConfigQueryCtrl', ['$scope', '$http', '$compile', 'accountService', 'queryConfigService',
  function($scope, $http, $compile, accountService, queryConfigService) {
    $scope.categoryTypeObj = { //获取分类类型
      "errorMark": false,
      "curCategoryName": "",
      "curCategoryType": "",
      "categoryFlag": true,
      //新增 || 修改分类
      "addRootFlag": false,
      //是否添加到根目录
      "getCategoryType": function() {
        var _this = this;
        queryConfigService.categoryType(function(response) {
          $scope.categoryTypeList = response ? response: [];
          var cueParentNode = $scope.tree.getSelectedNodes()[0] || $scope.tree.getNodes()[0];
          if ($scope.categoryTypeObj.categoryFlag) {
            if ((cueParentNode.typeId || cueParentNode.typeId == 0) && !_this.addRootFlag) { //分类类型是否可选
              $scope.categoryTypeObj.categoryDisabled = true;
              angular.forEach(response, function(val, key) { //增加子集默认父级的类型
                if (val.typeId == cueParentNode.typeId) {
                  _this.curCategoryType = val;
                  return false;
                }
              })
            } else {
              $scope.categoryTypeObj.categoryDisabled = false;
              _this.curCategoryType = response[0];
            }
            _this.curCategoryName = "";

            $scope.categoryTypeObj.errorMark = false;
          } else {
            _this.curCategoryName = cueParentNode.name;
            $scope.categoryTypeObj.categoryDisabled = true;
            angular.forEach(response, function(val, key) {
              if (val.typeId == cueParentNode.typeId) {
                _this.curCategoryType = val;
                return false;
              }
            })
          };
        });
      },
      "saveCategory": function() {
        var _this = this;
        // var cueParentNode=$scope.categoryTypeObj.addRootFlag?$scope.tree.getNodes()[0]:$scope.tree.getSelectedNodes()[0] || $scope.tree.getNodes()[0];
        var cueParentNode = $scope.categoryTypeObj.addRootFlag ? null: $scope.tree.getSelectedNodes()[0] || $scope.tree.getNodes()[0];
        var reqData = {
          "id": _this.categoryFlag ? "": cueParentNode.id,
          "name": _this.curCategoryName,
          "typeId": $scope.categoryTypeObj.curCategoryType.typeId
        };
        if (!reqData.name) {
          _this.errorMark = true;
          return false;
        }
        if (_this.categoryFlag) { //新增
          if (cueParentNode) {
            reqData.newParentId = cueParentNode.id;
          }
          queryConfigService.postCategory(function(response) {
            $scope.tree.addNodes(cueParentNode, response);
            _this.hideConfigPop();
          }, reqData)
        } else { //修改
          reqData.newParentId = cueParentNode.pId;
          queryConfigService.postCategory(function(response) {
            cueParentNode.name = response.name;
            cueParentNode.id = response.id;
            cueParentNode.typeId = response.typeId;
            $scope.tree.updateNode(cueParentNode);
            _this.hideConfigPop();
          }, reqData)
        };
      },
      "hideConfigPop": function() {
        angular.element(".ccmsPublicPop").hide();
        angular.element(".yunat_maskLayer").remove();
      }
    };

    /*订单配置开始*/
    $scope.orderConfig = {
      "src": "",
      "init": function() {
        this.src = "view/metaConfiguration/orderConfig.html?_=" + new Date().getTime();
        $compile(angular.element(".orderConfig"))($scope);
        $scope.$apply();
      },
      "addCondition": function() {
        $(".addConditionPop").addInteractivePop({
          magTitle: "新增条件",
          mark: true,
          width: 280,
          drag: true,
          position: "fixed"
        });
      },
      "modifyContion": function(categoryId, id) {

      },
      "saveCondition": function() {
        var parame = {
          name: $scope.conditionName
        }
        var parames = JSON.stringify(parame);
        $.ajax({
          url: rootStatic + "orderConfig",
          type: "PUT",
          async: false,
          dataType: "json",
          data: parames,
          contentType: "application/json",
          success: function() {

          }
        });
      },
      "compileTpl": function(b) {
        $compile(angular.element(".orderConfigList"))($scope || b);
        $scope.$apply();
      }
    }
    /*订单配置结束*/
    /*分组配置 start*/
    $scope.splitGroupObj = {
      "splitGroupSrc": "",
      "addConfigGroup": function() {
        this.splitGroupSrc = "view/metaConfiguration/queryGroupBy.html?_=" + new Date().getTime();
      }
    }
    /*分组配置 end*/

    var settingZtreeObj = { //初始化ztree
      /*
       * 依赖指令ztree && out-root-tree && tree-node-search-input
       */
      "init": function() {
        //标志树的根节点外外部
        // $scope.hasOutRoot =  true;
        $scope.FIXNODENAME = "未分类";
        var succcb = function(res) {
              $scope.treeNodes = res
            },
            errcb = function() {
              $scope.treeNodes = []
            };
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
        $scope.getAllNodes = function() { //初始化请求
          queryConfigService.getCategory(function(response) {
            $scope.treeNodes = response;
          })
        };
        $scope.getAllNodes();
        $scope.searchTreeNodes = function(searchValue) { //搜索框
          $scope.tree.searchNode(searchValue);
        };
        $scope.addNode = function addNode(rootFlag) { //增加节点 rootFlag判断是否为增加根节点
          $scope.categoryTypeObj.addRootFlag = rootFlag ? true: false;
          $scope.categoryTypeObj.categoryFlag = true;
          $scope.categoryTypeObj.getCategoryType();
          $(".maincontainerOth .addCategoryPop").addInteractivePop({
            magTitle: "新增部门",
            mark: true,
            width: 640,
            drag: true,
            position: "fixed"
          });
        };
        $scope.removeNode = function removeNode() { //删除节点
          $scope.tree.deleteNode(removeFromServer);
          function removeFromServer(id, name, succcb, errcb) {
            $(this).Confirm({
              "title": "确认删除",
              "str": "确定要删除部门" + name + "吗？",
              "mark": true
            },
            function() {
              queryConfigService.deleteCategory(succcb, id)
            })
          }
        };
        $scope.renameNode = function renameNode() { //重命名节点
          $scope.categoryTypeObj.categoryFlag = false;
          $scope.categoryTypeObj.getCategoryType();
          $(".maincontainerOth .addCategoryPop").addInteractivePop({
            magTitle: "修改部门",
            mark: true,
            width: 640,
            drag: true,
            position: "fixed"
          });
        };
      }
    };
    settingZtreeObj.init();
    //初始化ztree end
    /*活动列表自定义搜索start*/
    $scope.defaultFlag = true;
    $scope.searchObj = {
      "girdElement": angular.element(".campaignListCon")[0],
      "searchHdButton": function(hdVal) { //搜索
        this.girdElement.p.newp = 1;
        this.girdElement.p.qtype = "keywords";
        this.girdElement.p.query = hdVal || "";
        this.girdElement.grid.populate();
      },
      //点击树更新
      "updateFromTreeClick": function(id, typeId) {
        $scope.configuration.curClassificationId = id;
        this.girdElement.grid.addParams("categoryId", id);
        this.girdElement.p.query = $scope.hdValue ? $scope.hdValue: "";
        //this.girdElement.grid.populate();
        if (typeId) {
          this.girdElement.grid.addParams("categoryTypeId", typeId);
        }
        angular.element(".campaignListCon").flexReload();
      }
    };
    $scope.gridObj = {
      "compileTpl": function(b) {
        $compile(angular.element(".campaignListCon"))($scope || b); //编译类为marketingList元素及子元素
        $scope.$apply(); //js改变angular属性值后必须apply下
      },
      "deleteCampaign": function() {}
    };
    /*活动列表自定义搜索end*/
    $scope.isAddConfiguration = true; //true表示新增，false表示修改
    $scope.configuration = {
      "simpleConfigFlag": true,
      "globalView": "",
      "curClassificationId": "",
      //当前分类id
      "addConfig": function() {
        //console.log($scope.tree.getSelectedNodes());
        if ($scope.tree.getSelectedNodes().length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "请先选择分类",
            "mark": true
          });
        } else {
          this.switchILoadSrc();
        }
        $scope.isAddConfiguration = true;
      },
      "switchILoadSrc": function() { //配置弹框include src
        this.pop_src = "view/metaConfiguration/configurationPop.html?_=" + new Date().getTime();
      },
      "modification": function(categoryId, queryIteamId) { //修改
        this.switchILoadSrc();
        $scope.categoryId = parseInt(categoryId);
        $scope.queryIteamId = parseInt(queryIteamId);
        $scope.isAddConfiguration = false;
      },
      "showPopWindow": function() {
        $(".configurationPop").addInteractivePop({
          magTitle: "属性配置",
          mark: true,
          drag: true,
          position: "fixed",
          width: 640,
          height: 485
        })
      },
      "addGlobal": function() { //设置全局参数
        this.globalView = "view/metaConfiguration/globalConfig.html?_=" + new Date().getTime();

      }
    };
  }
])
/*查询节点配置控制器 end*/
