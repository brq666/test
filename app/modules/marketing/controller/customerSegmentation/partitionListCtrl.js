angular.module("campaign.controllers").controller('partitionListCtrl', ['$scope', "$http", "$location", '$compile', '$rootScope', 'getListService', 'deleteService', function($scope, $http, $location, $compile, $rootScope, getListService, deleteService) {
  $scope.options = {
    page: 1,
    pagesize: 12,
    categoryId: "",
    card: 1,
    query: $scope.hdValueParName || "",
  };
  $scope.searchParObj = {
    "getGirdElement": function() {
      return angular.element(".campaignListConPar")[0];
    },
    "changeActivity": function(atr) {
      this.getGirdElement().grid.addParams("myActivity", atr);
      this.getGirdElement().grid.populate();
    },
    "hdCurStatus": function(val) {
      this.getGirdElement().grid.addParams("campState", val || "");
      this.getGirdElement().grid.populate();
    },
    "searchHdButton": function(hdVal) {
      if ($scope.partitionListObj.isCardShow) {
        var param = {
          page: 1,
          pagesize: 12,
          categoryId: "",
          query: hdVal || ""
        };
        $scope.partitionListObj.getCardDataList(param)
      } else {
        this.getGirdElement().p.newp = 1;
        // this.getGirdElement().p.qtype = "keywords";
        this.getGirdElement().p.query = hdVal || "";
        this.getGirdElement().grid.populate();
      }

    },
    //点击树更新
    "updateFromTreeClick": function(id) {
      $scope.options.categoryId = $rootScope.curCategoryId = id;
      this.getGirdElement().grid.addParams("categoryId", id);
      this.getGirdElement().grid.populate();
    }
  };
  $scope.gridObj = {
    "compileTpl": function(b) {
      $compile(angular.element(".campaignListConPar"))($scope || b); //编译类为marketingList元素及子元素
    },
    "deleteCampaign": function() {
    }
  };
  $scope.partitionListObj = {
    "newCategory": "",
    "temOriginTreeId": "",//删除时移动目录点击当前目录的id
    "categoryId": "",//删除时移动新目录的id
    "isCardShow": false,
    "saveParMoveFlag": false,
    "delSaveNewCtgFlag": false,
    "parCategoryName": "",//单个分群移动时所选目录名字input
    "parMoveCategory": "",
    "parMoveCategoryId": "",
    "categoriesList": [],//tree操作
    "categoryName": "",//tree操作
    "enter": function(ev) {//search
      if (ev.keyCode == 13) {
        if (this.isCardShow) {
          $scope.options.page = 1;
          this.getCardDataList($scope.options)
        } else {
          $scope.searchParObj.searchHdButton($scope.options.query)
        }
      }
    },
    "clearInput": function() {//清空搜索框
      $scope.hdValueParName = "";
    },
    "getCardDataList": function(opts, evts) {//获取页面列表
      opts = opts || {};
      $scope.options = angular.extend($scope.options, opts);
      //console.log($scope.options)

      $rootScope.curCategoryId = $scope.options.categoryId;
      $scope.optionsCopy = angular.copy($scope.options)
      if ($scope.optionsCopy.query) {
        $scope.optionsCopy.query = encodeURIComponent($scope.optionsCopy.query)
      }
      getListService.getCardGroupData(function(response) {
        if (response.data.length) {
          angular.forEach(response.data, function(val, key) {
            if (typeof (val.customerCount) == "number") {
              val.customerCount = $scope.partitionLayer.format(val.customerCount)
            }
          })
        }
        $scope.groupData = response.data;
        $scope.options.total = Math.ceil(response.total / 12);
        var params = angular.copy($scope.options);
        delete params.total;
        $rootScope.cmBack = params;
        //console.log($scope.options)
      }, $scope.optionsCopy)
    },
    "getPagerList": function(offset) {// 点击分页
      this.getCardDataList({page: offset})
    },
    "getTableDataList": function() {
      $('.campaignListConPar').flexigrid({
        url: GLOBAL_STATIC.nodeRoot + 'node/group/list',
        method: 'GET',
        dataType: 'json',
        params: [
          {"name": "categoryId", "value": $scope.options.categoryId},
          {"name": "tenantId", "value": CAMPAIGN_STATIC.tenantId}
        ],
        colModel: [
          {
            display: '分组ID',
            name: 'id',
            width: 2,
            sortable: false,
            align: 'left',
            dataindex: 'id'
          }, {
            display: '分组名称',
            name: 'groupName',
            width: 3.7,
            sortable: false,
            align: 'left',
            dataindex: 'groupName',
            mapping: ['id', 'groupType'],
            convert: function(v, mappVal) {
              return '<span style="color:#155a77;cursor:pointer" ' + 'title=' + v + ' ng-click="partitionLayer.add(\'' + mappVal[0] + '\',\'' + mappVal[1] + '\',null,true)">' + v + '</span>'
            }
          // }, {
          //   display: '人数',
          //   name: 'customerCount',
          //   width: 2,
          //   sortable: false,
          //   align: 'right',
          //   dataindex: 'customerCount',
          //   mapping: ['customerCount'],
          //   convert: function(v, mapping) {
          //     if (typeof(v) != "object") {
          //       v = (mapping[0] + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
          //     } else {
          //       v = "等待更新中…"
          //     }
          //     return '<span>' + v + '</span>'
          //   }
          }, {
            display: '类型',
            name: 'groupType',
            width: 1.8,
            sortable: false,
            align: 'left',
            dataindex: 'groupType'
          }, {
            display: '操作',
            name: 'operation',
            width: 3.2,
            align: 'left',
            dataindex: 'campId',
            mapping: ['id', 'groupName', 'groupType', 'categoryId', "categoryName", "subjectId", "customerCount"],
            convert: function(v, mappVal) {
              !mappVal[6] && (mappVal[6] = null);
              return '<p class="wrapParOption">' +
                '<a href="javascript:void(0);" class="parOption parOptionBig" title="创建营销活动" ng-click="partitionLayer.createCamp(\'' + mappVal[0] + '\',\'' + mappVal[1] + '\',' + mappVal[6] + ',\'' + mappVal[5] + '\')">创建营销活动</a>' +
                '<a href="javascript:void(0);" class="iconfont button-light-blue parOption" title="移动目录" ng-click="partitionListObj.parMove(\'' + mappVal + '\',1)"><i class="iconfont icon-file"></i></a>' +
                '<a href="javascript:void(0);" class="iconfont button-light-blue parOption parOptionLast" title="删除" ng-delete-partition><i class="iconfont icon-trash"></i></a>' +
                '</p>'
            }
          }
        ],
        sortname: "id",
        sortorder: "desc",
        // newp: groupListParams.newp,
        newp: $rootScope.cmBack.page > groupListParams.pages ? groupListParams.pages : $rootScope.cmBack.page,
        rp: groupListParams.rp,
        pagesize: groupListParams.rp,
        query: $scope.options.query,
        usepager: true,
        useRp: true,
        showTableToggleBtn: true,
        colAutoWidth: true,
        colMoveAble: false,
        nomsg: "没有结果",
        updateDefaultParam: 'notcustom',
        rowDblClick: function() {
          // var rec=$(this).data('rec');
        },
        onSuccess: function() {
          var scope = angular.element(document.querySelector('.campaignListConPar')).scope();
          scope.gridObj.compileTpl(scope);

          var girdElement = angular.element(".campaignListConPar")[0];
          groupListParams.searchText = $scope.options.query;
          groupListParams.newp = girdElement.p.page;//page1 newp
          groupListParams.pages = girdElement.p.pages;
          groupListParams.rp = girdElement.p.rp;
          //console.log(girdElement.p);
          $rootScope.cmBack = {
            page: girdElement.p.newp,
            pagesize: girdElement.p.rp,
            card: 0,
            categoryId: $scope.options.categoryId,
            query: $scope.options.query || ""
          }
          $rootScope.cmBack.page > groupListParams.pages ? groupListParams.pages : $rootScope.cmBack.page;

          var parent = $(".flexigrid div.bDiv.hidden_x");
          parent[0].style.lineHeight = parent[0].style.height;
          $('.listFlag').remove()
          if (!girdElement.p.total) {
            $('<p class="emptyMsg listFlag"><i class="iconfont icon-caution"></i><span class="tips">没有符合搜索条件的分组</span></p>').appendTo(parent)
          }
        },
        onError: function(response) {
          var responseText = response.responseText;
          var data = $.parseJSON(responseText);
          $(this).AlertNew({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    },
    "commonTree": function(data, ele) { //模拟select框中为树形结构
      var $selContent = ele.siblings(".selectContent");
      $selContent.children().remove();
      var eleName = ele.attr("name");
      var $ul = $("<ul>", {
        "class": "ztree"
      });
      $selContent.append($ul);
      if (data) {
        function onClick(event, treeId, treeNode) {
          if (eleName == "categoryInput") {
            ele.val(treeNode.categoryName);
            ele.attr("valueId", treeNode.id);
            $scope.partitionListObj.categoryName = treeNode.categoryName;
            $scope.partitionListObj.categoryId = treeNode.id;
            $scope.$apply(function() {
              $scope.partitionListObj.delSaveNewCtgFlag = false
            })
          } else if (eleName == "parMoveCategory") {//移动目录
            ele.val(treeNode.categoryName);
            ele.attr("valueId", treeNode.id);
            $scope.partitionListObj.parMoveCategory = treeNode.categoryName;
            $scope.partitionListObj.parMoveCategoryId = treeNode.id;
            $scope.$apply(function() {
              $scope.partitionListObj.saveParMoveFlag = false
            })
          }
          $selContent.slideUp(200);

        }

        var setting = {
          data: {
            key: {
              title: "categoryName",
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
      }

      $.fn.zTree.init($ul, setting, data);


    },
    "initial": function(clearQuery) {
      if ($scope.partitionLayer.isHavePage) {//跳转回来
        // if ($rootScope.cmBack.card) {
        //   $scope.hdValueParName = $rootScope.cmBack.query;
        //   $scope.options.query = $rootScope.cmBack.query;
        //   this.isCardShow = true;
        //   this.getCardDataList($rootScope.cmBack);
        // } else {
        //   $scope.hdValueParName = $rootScope.cmBack.query;
        //   $scope.options.query = $rootScope.cmBack.query;
        //   $scope.options.categoryId = $rootScope.cmBack.categoryId;
        //   this.isCardShow = false;
        //   angular.element(".customer-partition-container").removeClass("card-rela").addClass("page-container");
        //   angular.element(".wrapPartitionListCon").addClass("table-height");
        //   angular.element(".market_types_tree_par").removeClass("par-tree-bottom");
        //   angular.element(".wrapCampaignListCon").show();
        //   this.getTableDataList();
        // }
        $scope.hdValueParName = $rootScope.cmBack.query;
          $scope.options.query = $rootScope.cmBack.query;
          $scope.options.categoryId = $rootScope.cmBack.categoryId;
          this.isCardShow = false;
        $scope.partitionLayer.isHavePage = false;
      } else {//初始
        if (clearQuery) {
          $scope.hdValueParName = "";
          groupListParams.searchText = "";
        }
        // this.isCardShow = true;
        $scope.partitionLayer.isHavePage = false;
        // this.getCardDataList({page: 1});
      }
      angular.element(".customer-partition-container").removeClass("card-rela").addClass("page-container");
      angular.element(".wrapPartitionListCon").addClass("table-height");
      angular.element(".market_types_tree_par").removeClass("par-tree-bottom");
      angular.element(".wrapCampaignListCon").show();
      this.getTableDataList();
    },
    "changeView": function(value) {//切换显示视图方式:卡片or列表
      $scope.partitionLayer.isHavePage = false;
      if (value == "card") {
        this.isCardShow = true;
        angular.element(".customer-partition-container").removeClass("page-container").addClass("card-rela");
        angular.element(".wrapPartitionListCon").removeClass("table-height");
        angular.element(".market_types_tree_par").addClass("par-tree-bottom");

        angular.element(".wrapCampaignListCon").hide();
        angular.element(".flexigrid").remove();
        angular.element(".wrapCampaignListCon").html("<div class='campaignListConPar'></div>");
        this.initial();
      } else if (value == "list") {
        $rootScope.cmBack.page = 1;
        this.isCardShow = false;
        angular.element(".customer-partition-container").removeClass("card-rela").addClass("page-container");
        angular.element(".wrapPartitionListCon").addClass("table-height");
        angular.element(".market_types_tree_par").removeClass("par-tree-bottom");
        angular.element(".wrapCampaignListCon").show();
        this.getTableDataList();
      }
    },
    "delSelectCategory": function(id, level, childNum) {
      var _this = this;
      _this.categoryName = "";
      _this.categoryId = "";
      $('[name="categoryInput"]').attr("valueId", "");
      $('[name="categoryInput"]').val("");
      _this.temOriginTreeId = id;
      _this.temOriginTreeLevel = level;
      _this.temOriginTreeChildNum = childNum ? childNum : 0;
      _this.delSaveNewCtgFlag = false;
      $(".moveToNewCategory").addInteractivePop({
        magTitle: "删除目录",
        width: 500,
        mark: true,
        position: "fixed"
      });
    },

    "selectCategory": function() {  //删除时提示选择新目录
      var _this = this;
      _this.categoryId = "";
      getListService.getNewCategoryTree(this.analysisToSelectCategory, _this.temOriginTreeId, CAMPAIGN_STATIC.tenantId)
    },
    "analysisToSelectCategory": function(data) {
      var saveFixNode = {};
      angular.forEach(data, function(value, key) {
        if (value.categoryName == "默认") {
          saveFixNode = value;
          data.splice(key, 1);
          data.push(saveFixNode)
        }
      })
      $scope.partitionListObj.commonTree(data, $('[name="categoryInput"]'));
    },
    "delSaveNewCtg": function() {//删除时移动新目录保存
      var _this = this;
      var data = {"oldId": _this.temOriginTreeId, "newId": _this.categoryId};
      if (data.newId) {
        getListService.putDelNewCtg(function(res) {
          angular.element(".moveToNewCategory").hide();
          angular.element(".yunat_maskLayer").remove();
          // _this.isCardShow ? $scope.partitionListObj.initial() : $scope.partitionListObj.getTableDataList();
          $scope.partitionListObj.getTableDataList();
          $scope.getAllNodes()
        }, data);
      } else {
        _this.delSaveNewCtgFlag = true;
      }

    },
    "parMove": function(data, flag) {//分群移动目录弹窗
      if (flag) {
        var arr = [];
        arr = data.split(",")
        this.cId = arr[0];
        this.cSubjectId = arr[5];
        this.cCategoryId = arr[3];
        this.cCategoryName = arr[4];
        this.cGroupType = arr[2];
        this.cGroupName = arr[1];
        this.cCustomerCount = arr[6];
      } else {
        this.cId = data.id;
        this.cSubjectId = data.subjectId;
        this.cCategoryId = data.categoryId;
        this.cCategoryName = data.categoryName;
        this.cGroupType = data.groupType;
        this.cGroupName = data.groupName;
        this.cCustomerCount = data.customerCount
      }
      this.parMoveCategory = "";
      this.parMoveCategoryId = "";
      $('[name="parMoveCategory"]').attr("valueId", "");
      $('[name="parMoveCategory"]').val("");
      this.saveParMoveFlag = false;
      $(".parMoveCategory").addInteractivePop({
        magTitle: "移动目录",
        width: 510,
        mark: true,
        position: "fixed"
      });
    },
    "parMoveInput": function() {//获取所有目录
      var _this = this;
      getListService.getParMoveInputOutAll(this.analysisToParMoveInput)
    },
    "reloadTable": function() {
      angular.element(".flexigrid").remove();
      angular.element(".wrapCampaignListCon").html("<div class='campaignListConPar'></div>");
      angular.element(".wrapCampaignListCon").show();
    },
    "analysisToParMoveInput": function(data) {
      var saveFix = {};
      var parentId = data[0].id;
      angular.forEach(data, function(value, key) {
        if (value.categoryName == "默认" && value.parentId == parentId) {
          saveFix = value;
          data.splice(key, 1);
          data.push(saveFix)
        }
      })
      $scope.partitionListObj.commonTree(data.slice(1), $('[name="parMoveCategory"]'));
    },
    "saveParMove": function() {//保存分群选择移动的新目录
      var _this = this;
      var data = {
        "id": _this.cId,//移动的分群id
        "subjectId": _this.cSubjectId,
        "categoryId": _this.parMoveCategoryId,
        "customerCount": _this.cCustomerCount,
        "groupName": _this.cGroupName,
        "groupType": _this.cGroupType,
        "tenantId": CAMPAIGN_STATIC.tenantId
      }
      if (_this.parMoveCategoryId) {
        _this.saveParMoveFlag = false;
        getListService.saveParMove(function(res) {
          angular.element(".parMoveCategory").hide();
          angular.element(".yunat_maskLayer").remove();
          if (_this.isCardShow) {
            angular.element(".wrapCampaignListCon").hide();
            angular.element(".flexigrid").remove();
            angular.element(".wrapCampaignListCon").html("<div class='campaignListConPar'></div>");
            var curLength = $(".content-grouping-lists li.item").length;
            if (_this.cCategoryId == _this.parMoveCategoryId) {
              _this.getCardDataList({page: $rootScope.cmBack.page})
            } else {
              if (curLength == 1) {
                if ($rootScope.cmBack.page == 1) {
                  _this.getCardDataList({page: $rootScope.cmBack.page})
                } else {
                  $rootScope.cmBack.page = $rootScope.cmBack.page - 1;
                  _this.getCardDataList({page: $rootScope.cmBack.page})
                }
              } else {
                _this.getCardDataList({page: $rootScope.cmBack.page})
              }
            }

          } else {
            var tableLength = $(".campaignListConPar tbody tr").length;
            _this.reloadTable();
            if (_this.cCategoryId == _this.parMoveCategoryId) {
              _this.getTableDataList();
            } else {
              if (tableLength == 1) {
                if ($rootScope.cmBack.page == 1) {
                  _this.getTableDataList();
                } else {
                  $rootScope.cmBack.page = $rootScope.cmBack.page - 1;
                  _this.getTableDataList();
                }
              } else {
                _this.getTableDataList();
              }
            }
          }
          $scope.getAllNodes();
        }, data)
      } else {
        _this.saveParMoveFlag = true;
      }
    },


  },
    $scope.partitionListObj.initial(1);

  $scope.$watch("hdValueParName", function(newVal, oldVal) {
    $scope.options.query = newVal || "";
    var blurGridElement = angular.element(".campaignListConPar")[0] || null;
    if (blurGridElement.p) {
      blurGridElement.p.query = newVal || "";
    }
  })

  /*共用的显示、隐藏元素的方法 start*/
  var toggleMethodObj = {
    toggleViewElement: function(obj, flag) { //flag=true || false
      if (obj) {
        if (flag) {
          obj.show();
        } else {
          obj.hide();
        }
        ;
      }
      ;
    }
  };
  /*共用的显示、隐藏元素的方法 end*/
  //$scope.hdValueParName = groupListParams.searchText;
  groupListParams.searchText = $scope.hdValueParName;

  //右侧目录树

  $scope.treeSettings = {
    view: {
      selectedMulti: false,
      nameIsHTML: true//名称支持html格式
    },
    data: {
      simpleData: {
        enable: true,
        idKey: "id",
        pIdKey: "parentId"
      },
      key: {
        title: "categoryNameFull",
        name: "categoryName"
      }
    }
  };
  //标志树的根节点外外部是
  $scope.hasOutRoot = true;
  $scope.rootExpanded = true;
  $scope.FIXNODENAME = "默认"
  $scope.getAllNodes = function() {
    $http.get(GLOBAL_STATIC.nodeRoot + "node/group/category/?_=" + new Date().getTime()).success(succcb).error(errcb);
    function succcb(res) {
      var nodeArr = [];
      var node = {};
      angular.forEach(res, function(val, key) {
        val.open = false;
        node = val;
        node.o_name = val.categoryName;
        node.categoryName = node.o_name + "(" + val.groupCnt + ")";
        node.categoryNameFull = node.o_name + "(" + val.groupCnt + ")";
        nodeArr.push(node);
      });
      //$scope.treeNodes = res;
      $scope.treeNodes = nodeArr;
    }

    function errcb() {
      $scope.treeNodes = [];
    }
  };
  $scope.getAllNodes();


  //$scope.treeNodes =[];
  //菜单的增删改
  //增加节点
  $scope.addNode = function addNode(rootFlag) {
    $scope.tree.addNode(addToServer, rootFlag);
    function addToServer(data, succcb, errcb) {
      data.tenantId = CAMPAIGN_STATIC.tenantId;
      $http.post(GLOBAL_STATIC.nodeRoot + "node/group/category", data).success(succcb).error(errcb);
    }
  };
  //删除节点
  $scope.removeNode = function removeNode() {
    $scope.tree.deleteNode(removeFromServer);
    //服务器删除回调
    function removeFromServer(id, o_name, succcb, errcb, groupCnt, children) {
      $(this).ConfirmNew({"title": "确认删除", "str": "确定要删除此目录吗？", "mark": true}, function() {
        $http({
          method: 'DELETE',
          url: GLOBAL_STATIC.nodeRoot + "node/group/category/" + id + "/" + CAMPAIGN_STATIC.tenantId
        }).success(succcb).error(errcb);
      })
    }
  };
  //重命名节点
  $scope.renameNode = function renameNode() {
    $scope.tree.renameNode(renameToServer);
    //服务器重新命名回调
    function renameToServer(id, data, succcb, errcb) {
      data.tenantId = CAMPAIGN_STATIC.tenantId;
      $http.put(GLOBAL_STATIC.nodeRoot + "node/group/category", data).success(succcb).error(errcb);
    }
  };

}]);

