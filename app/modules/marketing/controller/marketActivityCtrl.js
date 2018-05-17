angular.module('campaign.controllers')
  .controller('marketActivityCtrl', [
    '$scope',
    '$http',
    '$state',
    '$stateParams',
    '$ccGrid',
    '$resource',
    '$ccModal',
    '$ccTips',
    'deleteService',
    'getListService',
    '$location',
    '$timeout',
    function($scope, $http, $state, $stateParams, $ccGrid, $resource, $ccModal, $ccTips, deleteService, getListService, $location, $timeout) {
      var self = this;
      // 页面上次查询参数标记
      var preQueryMark;

      // tab 滚动控制默认不显示
      self.isScrollCtrl = false;

      // 是否刷新grid组件
      self.isRefeshGrid = true;

      // 查询参数
      self.queryParams = {
        page: 1,
        pagesize: 30,
        sortname: 'id',
        sortorder: 'desc',
        query: '',
        qtype: 'keywords',
        myActivity: false,
        classificationId: 1,
        campState: '',
        myApproval: false,
        isCycle: false
      };

      // 活动状态列表
      self.statusMap = {
        A1: {
          showMark: '设计中',
          name: '设计中',
          className: 'a1',
          isDesign: false,
          isEdit: true,
          isDel: true,
          isView: false,
          isChecked: true
        },
        B1: {
          showMark: '预执行',
          name: '设计时预执行',
          className: 'b1',
          isDesign: false,
          isEdit: false,
          isDel: false,
          isView: true,
          isChecked: true
        },
        A2: {
          showMark: '待审批',
          name: '待审批',
          className: 'a2',
          isDesign: false,
          isEdit: false,
          isDel: true,
          isView: true,
          isChecked: true
        },
        B2: {
          showMark: '预执行',
          name: '待审批时预执行',
          className: 'b2',
          isDesign: false,
          isEdit: false,
          isDel: false,
          isView: true,
          isChecked: true
        },
        A3: {
          showMark: '待执行',
          name: '待执行',
          className: 'a3',
          isDesign: false,
          isEdit: false,
          isDel: true,
          isView: true,
          isChecked: true
        },
        B3: {
          showMark: '执行中',
          name: '执行中',
          className: 'b3',
          isDesign: false,
          isEdit: false,
          isDel: false,
          isView: true,
          isChecked: true
        },
        A5: {
          showMark: '完成',
          name: '完成',
          className: 'a5',
          isDesign: false,
          isEdit: false,
          isDel: true,
          isView: true,
          isChecked: true
        },
        A4: {
          showMark: '终止',
          name: '终止',
          className: 'a4',
          isDesign: false,
          isEdit: false,
          isDel: true,
          isView: true,
          isChecked: true
        },
        A6: {
          showMark: '异常',
          name: '异常',
          className: 'a6',
          isDesign: false,
          isEdit: false,
          isDel: true,
          isView: true,
          isChecked: true
        }
      };

      // 非视图模式下，tab列表
      self.tabTitles = [];

      // 表列
      var columnsDef = [
        {
          cellTemplate: '<span ng-bind="entity.campId" title="{{entity.campId}}"></span>',
          displayName: '活动ID',
          align: 'left',
          sortProp: 'id'
        },
        {
          cellTemplate: '<i ng-if="entity.isCycle" class="iconfont icon-shijian camp-cycle"></i>',
          displayName: ' ',
          width: '6px',
          align: 'center'
        },
        {
          cellTemplate: '<span class="camp-name ellipsis" title="{{entity.campName}}" ui-sref="^.details({id:{{entity.campId}}, workflowId:{{entity.workflowId}}})" ng-bind="entity.campName"></span><i class="iconfont icon-beizhu camp-remark" tooltip-placement="top" tooltip-append-to-body="true" cc-tooltip="entity.remark" ng-if="entity.remark"></i>',
          displayName: '活动名称',
          align: 'left',
          sortProp: 'name'
        },
        {
          cellTemplate: '<span ng-bind="entity.createdTime"></span>',
          displayName: '创建时间',
          width: '140px',
          align: 'left',
          sortProp: 'created_at'
        },
        {
          cellTemplate: '<span ng-bind="entity.creater"></span>',
          displayName: '创建人',
          align: 'left'
        },
        {
          cellTemplate: '<span ng-bind="entity.approver"></span>',
          displayName: '审批人',
          align: 'left'
        },
        {
          cellTemplate: '<span class="mark-box" ng-class="$ctrl.statusMap[entity.status].className" ng-bind="$ctrl.statusMap[entity.status].showMark"></span>',
          displayName: '活动状态',
          align: 'center',
          sortProp: 'status'
        },
        {
          cellTemplate: '<a class="operation-btn" ui-sref="^.details({id:{{entity.campId}}, workflowId:{{entity.workflowId}}})"  href="javascript:void(0);" ng-if="$ctrl.statusMap[entity.status].isDesign">设计</a>\
                         <a class="operation-btn" ng-click="$ctrl.activityEvent(entity, \'view\')" href="javascript:void(0);" ng-if="$ctrl.statusMap[entity.status].isView">查看</a>\
                         <a class="operation-btn" href="javascript:void(0);" ng-if="$ctrl.statusMap[entity.status].isEdit" ng-click="$ctrl.activityEvent(entity)">编辑</a>\
                         <a class="operation-btn" href="javascript:void(0);" ng-if="$ctrl.statusMap[entity.status].isDel" ng-click="$ctrl.deleteActivity(entity)">删除</a>',
          displayName: '操作',
          align: 'left',
          width: '115px'
        }
      ];

      // 营销活动列表配置
      self.gridMarketOptions = {
        externalData: [],
        queryParams: {},
        showPagination: false,
        pager: {
          totals: 0,  		// 总条数
          totalPages: 1,  	// 总页数
          pageNum: 1,  		// 当前页码
          pageSize: 30, 		// 每页大小
          pageSizeList: [10, 20, 30, 50, 100],
          pageSizeListDisabled: false
        },
        headerTpl: CAMPAIGN_STATIC.tplBasePath + 'view/activies-header.html',
        rowTpl: CAMPAIGN_STATIC.tplBasePath + 'view/activies-row.html',
        columnsDef: columnsDef,
        emptyTipTpl: '<div class="init-msg"><span class="msg">暂无数据</span> </div>'
      };

      // 目录结构树形配置
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

      //标志树的根节点外外部
      $scope.hasOutRoot = true;
      $scope.FIXNODENAME = '未分类';

      // 获取所有节点
      $scope.getAllNodes = function() {
        $http.get(GLOBAL_STATIC.campaignRoot + 'campaign/' + CAMPAIGN_STATIC.tenantId + '/classification/?_=' + new Date().getTime())
          .success(succcb)
          .error(errcb);
        function succcb(res) {
          $scope.treeNodes = res;
        }

        function errcb() {
          $scope.treeNodes = [];
        }
      };
      $scope.getAllNodes();

      // 搜索节点
      $scope.searchTreeNodes = function(searchValue) {
        var treeScope = angular.element('#aaa').scope();
        treeScope.tree.searchNode(searchValue);
      };
      // 添加节点
      $scope.addNode = function addNode(rootFlag) {
        if (angular.element('#aaa input.rename').length > 0) {
          return false;
        }
        var treeScope = angular.element('#aaa').scope();
        //server.post(url, function(){
        treeScope.tree.addNode(addToServer, rootFlag);
        //服务器增加回调
        function addToServer(data, succcb, errcb) {
          var data = data;
          data.tenantId = CAMPAIGN_STATIC.tenantId;

          $http.post(GLOBAL_STATIC.campaignRoot + 'campaign/classification', data)
            .success(succcb)
            .error(errcb);
        }
      };

      //删除节点
      $scope.removeNode = function removeNode() {
        var treeScope = angular.element('#aaa').scope();
        treeScope.tree.deleteNode(removeFromServer);
        //服务器删除回调
        function removeFromServer(id, name, succcb, errcb) {
          // $http.delete(root + 'campaign/classification/' + id).success(succcb).error(errcb);
          // ie8 不能用delete
          $(this).Confirm({
            'title': '确认删除',
            'str': '确定要删除目录' + name + '吗？',
            'mark': true
          }, function() {
            $http({
              method: 'DELETE',
              url: GLOBAL_STATIC.campaignRoot + 'campaign/classification/' + id
            })
              .success(succcb)
              .error(errcb);
          })

        }
      };

      //重命名节点
      $scope.renameNode = function renameNode() {
        var treeScope = angular.element('#aaa').scope();
        treeScope.tree.renameNode(renameToServer);
        //服务器重新命名回调
        function renameToServer(id, data, succcb, errcb) {
          $http.put(GLOBAL_STATIC.campaignRoot + 'campaign/classification/' + id, data)
            .success(succcb)
            .error(errcb);
        }
      };

      //移动节点
      $scope.moveNode = function(id, newParentId, succcb, errcb) {
        //$http.post(root +"campaign/classification/"+id+"/assign"+newParentId,).
        $http({
          method: "put",
          url: GLOBAL_STATIC.campaignRoot + "campaign/classification/" + id + "/assign",
          data: {
            newParentId: newParentId
          }
        }).success(succcb).error(errcb);
      }

      // 选中或者是取消某个tree项
      $scope.onTreeChange = function(treeNode) {
        self.queryParams.classificationId = treeNode.id;
        self.onChangeSearch();
      };

      /**
       * 关闭tab标签
       * @param {object} tab tab实体
       * @param {event} event 事件
       */
      self.onCloseTab = function(tab, event) {
        campRefreshTimer && clearTimeout(campRefreshTimer);
        jobRefreshTimer && clearTimeout(jobRefreshTimer);
        // tab 列表长度
        var tabLength = self.tabTitles.length,
          // 关闭标签是否为tabTitles的尾部
          isEnd,
          // 关闭tab dom
          closeTabDom = $(event.target).parent().parent(),
          // tab dom 宽度
          closeTabWidth = closeTabDom[0].clientWidth,

          // 关闭标签位于tabTitles位置
          tabIndex = self.tabTitles.findIndex(function(title) {
            return title.campId === tab.campId;
          });

        isEnd = tabIndex + 1 === tabLength;
        // 从tabTitles列表中移除关闭标签
        self.tabTitles.splice(tabIndex, 1);

        // 获取下一个跳转的页面
        var page = getNextView(self.tabTitles, tabIndex, isEnd);
        $state.go(page.state, page.params);
        if (self.tabTitles.length === 0) {
          self.$onInit()
        }

        // 修改活动状态的tab id
        self.currentTab = page.params.id;

        $timeout(function() {
          self.isScrollCtrl = getIsScrollCtrl();
          var tabData = getTabScrollData();
          // 列表内容不超出容器时则执行
          if (tabData.scrollWidth <= tabData.showWidth) {
            $(tabData.boxDom).animate({ left: 0 });
          } else {
            if (closeTabWidth + tabData.overflowRight === 0) {
              $(tabData.boxDom).animate({ left: tabData.offsetLeft + closeTabWidth + 'px' });
            }
          }
        }, 500);
      };

      /**
       * 切换tab标签
       * @param {object} tab tab实体
       */
      self.onSwitchTab = function(tab) {
        if (tab.campId === Number(self.currentTab)) return false;
        $state.go('^.details', { id: tab.campId, workflowId: tab.workflowId });
      };

      /**
       *  add tab标签
       */
      self.addTab = function(entity, isRefresh) {
        if (!entity) return false;
        var itemIndex = self.tabTitles.findIndex(function(item) {
          return item.campId === entity.campId;
        });

        if (itemIndex === -1) {
          self.tabTitles.push(entity);
        }

        // 如果是刷新页面则执行
        if (!isRefresh) {
          $timeout(function() {
            self.isScrollCtrl = getIsScrollCtrl();
          }, 500);
        }
      }

      /**
       * 非视图模式，获取下一个视图
       * @param {array} tabs tabs数组
       * @param {number} currentIndex 当前标签在数组中的位置
       * @param {boolean} isEnd 是为最后一个
       */
      function getNextView(tabs, currentIndex, isEnd) {
        var length = tabs.length;
        var page;
        // tabs 数组长度大于0
        if (length > 0) {
          // 若当前关闭标签位于数组的末尾，则取上一个标签显示，否则取后一个
          var tab = tabs[isEnd ? length - 1 : currentIndex];
          page = {
            state: '^.details',
            params: {
              id: tab.campId,
              workflowId: tab.workflowId
            }
          }
        } else {
          // 如果长度为0 则跳转列表视图
          page = {
            state: '^.list',
            params: {}
          };
        }
        return page;
      }

      /**
       * 获取营销列表
       */
      self.onSearch = function() {
        getQueryParams();
        self.isRefeshGrid = false;
        return $resource(GLOBAL_STATIC.campaignRoot + 'campaign/' + CAMPAIGN_STATIC.tenantId + '/page/')
          .get(self.queryParams, function(res) {
            // 判断是否为同一请求
            if (preQueryMark === self.queryParams._) {
              // 若存在自定义字段则追加
              if (res.autoConfig) {
                var autoConfigList = [];
                self
                  .gridMarketOptions
                  .columnsDef
                  .forEach(function(col, index) {
                    if (col.isAutoConfig) {
                      autoConfigList.push(col);
                    }
                  });

                // 移除之前的自定义配置
                autoConfigList.forEach(function() {
                  var delIndex = self.gridMarketOptions.columnsDef.findIndex(function(col) { return col.isAutoConfig; });
                  self.gridMarketOptions.columnsDef.splice(delIndex, 1);
                });

                // 重置列表配置
                self.gridMarketOptions.columnsDef = angular.copy(self.gridMarketOptions.columnsDef);

                //  追加自定义属性
                res.autoConfig
                  .sort(function(pre, next) {
                    return pre.seq - next.seq;
                  })
                  .forEach(function(item, index) {
                    self.gridMarketOptions.columnsDef.splice(3 + index, 0, {
                      cellTemplate: '<span ng-if="entity.extInfo" ng-bind="entity.extInfo[' + item.id + ']"></span>',
                      displayName: item.fieldName,
                      align: 'center',
                      isAutoConfig: true
                    });
                  });
              }

              self.gridMarketOptions.externalData = res.data || [];
              self.gridMarketOptions.pager.totals = +res.total;
              self.gridMarketOptions.pager.totalPages = Math.ceil(+res.total / +res.pageSize);
              self.gridMarketOptions.pager.pageNum = +res.page;
              self.gridMarketOptions.pager.pageSize = +res.pageSize;
              //  更新grid
              $ccGrid.refresh(self.gridMarketOptions);
              return res;
            }
          }).$promise;
      };

      /**
       * 刷新营销列表
       */
      self.$onInit = function() {
        self.onSearch().then(function() {
          self.isRefeshGrid = true;
        });
      };

      /**
       * 页面重加载
       */
      self.onGridReload = function() {
        self.onSearch().then(function() {
          self.isRefeshGrid = true;
        });
      };
      /**
       * 翻页
       * @param {number} pageNum 页码
       * @param {number} pageSize 条数/页
       */
      self.onPageChange = function(pageNum, pageSize) {
        self.gridMarketOptions.pager.pageNum = pageNum;
        self.gridMarketOptions.pager.pageSize = pageSize;
        self.onSearch().then(function() {
          self.isRefeshGrid = true;
        });
      }

      /**
       * 排序
       * @param {object} column 列配置
       * @param {array} columnsDefs 列配置列表
       */
      self.toggleSort = function(column, columnsDefs) {
        if (column.sortProp === undefined) {
          return;
        }
        if (column.sortProp) {
          switch (column.sortOrder) {
            case 'asc':

              column.sortOrder = 'desc';
              break;
            case 'desc':

              column.sortOrder = undefined;
              break;
            default:

              column.sortOrder = 'asc';
              break;
          }
          columnsDefs.forEach(function(col) {
            if (col.sortProp !== column.sortProp) {
              delete col.sortOrder;
            }
          });
        }
        self.queryParams.sortname = column.sortProp;
        self.queryParams.sortorder = column.sortOrder;
        self.gridMarketOptions.pager.pageNum = 1;
        self.onSearch().then(function() {
          self.isRefeshGrid = true;
        });
      }

      /**
       * 关键字搜索
       * @param {event} event 事件
       */
      self.onKeyupSearch = function(event) {
        if (event === undefined || (event && event.keyCode === 13)) {
          self.gridMarketOptions.pager.pageNum = 1;
          self.onSearch().then(function() {
            self.isRefeshGrid = true;
          });
        }
      };

      /**
       * 打开树形搜索
       */
      self.onTreeSearchInput = function() {
        self.isTreeOpen = true;
        self.isSearchInputOpen = true;
      }

      /**
       * 双击打开详情
       * @param {object} entity 表格行数据
       */
      self.onDblclick = function(entity) {
        $state.go('campaign.market.details', { id: entity.campId, workflowId: entity.workflowId });
      }

      /**
       * 查询条件修改后查询
       */
      self.onChangeSearch = function() {
        if (self.currentState === 'campaign.market.list') {
          self.onSearch().then(function() {
            self.isRefeshGrid = true;
          });
        }

        if (self.currentState === 'campaign.market.calendar') {
          getQueryParams();
          $scope.$broadcast('change-query-params', self.queryParams);
        }
      }

      // 监听$stateChangeSuccess
      $scope.$on('$stateChangeSuccess', function(event, toState) {
        // 判断是否为视图模式
        self.isView = toState.name !== 'campaign.market.details';
        // 设置当前页面的路由
        self.currentState = toState.name;

        if (toState.name === 'campaign.market') {
          $state.go('campaign.market.calendar');
        }

        if (toState.name === 'campaign.market.calendar') {
          self.onChangeSearch();
          // 模板新建
          var urlSearch = $location.$$search;
          urlSearch.template && self.activityEvent(null, 'template', urlSearch.template);
          urlSearch.template && $location.search({});
        }

        if (!self.isView) {
          if ($stateParams.id === '') {
            $state.go('campaign.market.list');
          } else {
            // 获取活动id
            self.currentTab = $stateParams.id;
            // 根据id获取活动详情
            self.currentTabEntity = self.gridMarketOptions.externalData.find(function(item) {
              return item.campId === Number(self.currentTab);
            });
            // 刷新浏览器
            getListService.getCampaignUpdate(self.currentTab, function(res) {
              if (!self.currentTabEntity) {
                self.addTab(res, true);
              } else {
                self.addTab(res);
              }
            });

          }
        } else {
          self.currentTab = '';
          angular.element('.mxTooltip').remove();
        }
      });

      // 操作活动
      self.activityEvent = function(campaign, type, params) {
        if (campaign && self.activityIsOpen(campaign.campId)) return false;
        var title = campaign ? "编辑活动" : "新建活动";
        type === "view" && (title = "查看活动");
        // 模板 + 分群创建
        var templateId = '';
        if ('template' === type) {
          templateId = params;
        }
        var modalInstance = $ccModal
          .modal({
            title: title,
            hasFooter: type === "view" ? false : true,
            body: CAMPAIGN_STATIC.tplBasePath + 'view/create/index.html?_=' + (+new Date()),
            style: {
              overflow: 'auto'
            },
            controller: 'MarketCreate',
            bindings: {
              curCampaignId: campaign ? campaign.campId : '',
              templateId: templateId
            }
          }).open();

        modalInstance.result.then(function(data) {
          var confirmModalInstance = $ccModal.confirm('活动保存成功，是否立即进入活动编辑？', function() {
            // 更新视图
            self.onChangeSearch();
          }).open();

          var creatNewHdobg = {
            "campName": data.name.replace(/\s+/g, ""),
            "workflowId": data.workflowId || "",
            "campId": data.id
          };

          confirmModalInstance.result.then(function() {
            $state.go('^.details', { id: creatNewHdobg.campId, workflowId: creatNewHdobg.workflowId });
            // $scope.marketLayer.show_flog = false;
          }, function() {
            // 更新视图
            self.onChangeSearch();
          });

        }, function(error) {
          console.log('rejected', error);
        });
      };

      // 验证活动
      self.activityIsOpen = function(curId) {
        var index = self.tabTitles.findIndex(function(item) {
          return item.campId == curId;
        });

        if (index !== -1) {
          if (!this.errorTips || !this.errorTips.element) {
            this.errorTips = $ccTips.error("编辑失败，请先退出该活动流程");
          }
          return true;
        }

        return false;
      };

      // 删除活动
      self.deleteActivity = function(campaign) {
        if (self.activityIsOpen(campaign.campId)) return false;
        var confirmDelete = $ccModal.confirm('活动删除后将无法恢复，确定要删除活动' + campaign.campName + '吗？', function() {

        }).open();

        confirmDelete.result.then(function() {
          deleteService.deleteCampaign(campaign.campId, function(data) {
            this.errorTips = $ccTips.success("删除成功");
            self.onSearch().then(function() {
              self.isRefeshGrid = true;
            });
          });
        }, function() { });
      };

      /**
       * 下一页tab
       */
      self.onNextTab = function() {
        var tabData = getTabScrollData();
        // 右侧滑动是否满足一屏
        var isFill = Math.floor(tabData.overflowRight / tabData.showWidth) > 0;
        if (isFill) {
          $(tabData.boxDom).animate({ left: (tabData.offsetLeft - tabData.showWidth) + 'px' });
        } else {
          $(tabData.boxDom).animate({ left: (tabData.offsetLeft - tabData.overflowRight) + 'px' });
        }
      };

      /**
       * 上一页tab
       */
      self.onPreTab = function() {
        var tabData = getTabScrollData(),
          // 右侧滑动是否满足一屏
          isFill = Math.floor(tabData.overflowLeft / tabData.showWidth) > 0;
        if (isFill) {
          $(tabData.boxDom).animate({ left: (tabData.offsetLeft + tabData.showWidth) + 'px' });
        } else {
          $(tabData.boxDom).animate({ left: (tabData.offsetLeft + tabData.overflowLeft) + 'px' });
        }
      };

      /**
       * 获取tab滚动数据
       */
      function getTabScrollData() {
        var tabUlDom = $('.hearder-box .tab-title-box .title-list'),
          tabScrollDom = $('.hearder-box .tab-title-box .tab-nav-scroll'),
          scrollWidth, showWidth, overflowLeft, overflowRight, offsetLeft;
        if (tabUlDom.length > 0) {
          // 滚动宽度
          scrollWidth = tabUlDom[0].scrollWidth;
          // 可视宽度= tab容器宽度
          showWidth = tabScrollDom[0].clientWidth;
          // left值
          offsetLeft = tabUlDom[0].offsetLeft;
          // 左侧溢出值
          overflowLeft = -offsetLeft;
          overflowRight = scrollWidth - (showWidth + overflowLeft);
        }
        return {
          // 滚动宽度即展示宽度+隐藏长度
          scrollWidth: scrollWidth,
          // 可视宽度
          showWidth: showWidth,
          offsetLeft: offsetLeft,
          overflowLeft: overflowLeft,
          overflowRight: overflowRight,
          boxDom: tabUlDom[0]
        };
      }

      /**
       * 提取查询参数
       */
      function getQueryParams() {
        var prop;
        // 选中列表
        var statusMapCheckeds = [];

        // 遍历statusMap获取当前选中的活动状态
        for (prop in self.statusMap) {
          if (self.statusMap[prop].isChecked) {
            statusMapCheckeds.push(prop);
          }
        }

        // 用“,” 分割
        self.queryParams.campState = statusMapCheckeds.join(',');

        // 添加查询时间戳
        self.queryParams._ = new Date().getTime();

        // 缓存排序数据(防止数据错乱)
        preQueryMark = self.queryParams._;

        // 分页信息
        self.queryParams.page = self.gridMarketOptions.pager.pageNum || self.queryParams.page;
        self.queryParams.pagesize = self.gridMarketOptions.pager.pageSize || self.queryParams.pagesize;
      }

      /**
       * 判断是否展示滚动控制器
       */
      function getIsScrollCtrl() {
        var boxUlWidth = getTabHeaderWidth(),
          totalLiWidth = getTabWidth();
        return boxUlWidth < totalLiWidth;
      }

      /**
       * 获取tab头部容器宽度
       */
      function getTabHeaderWidth() {
        var tabHeaderDom = $('.hearder-box .tab-title-box .tab-nav-scroll'),
          boxWidth = 0;

        if (tabHeaderDom.length > 0) {
          boxWidth = tabHeaderDom[0].clientWidth;
        }
        return boxWidth || 0;
      }

      /**
       * 获取各个tab的宽度之和
       */
      function getTabWidth() {
        var tabLiDoms = $('.hearder-box .tab-title-box .title-list>li'),
          totalWidth = 0,
          index = 0;
        for (index; index <= tabLiDoms.length; index++) {
          totalWidth = +totalWidth + ($(tabLiDoms[index]).width() || 0);
        }
        return totalWidth || 0;
      }
    }
  ])
  .controller('marketCalendarCtrl', marketCalendarCtrl);


marketCalendarCtrl.$inject = ['$imCalendar', '$imEventModal', '$scope', '$resource', '$ccTips'];
function marketCalendarCtrl($imCalendar, $imEventModal, $scope, $resource, $ccTips) {
  var self = this;
  // 缓存上次日历高度
  var preCalendarHeigth;
  var parentScope = $scope.$parent.$parent.$parent;
  // onresize中的setTimeout值
  var onresizeTimer;

  self.total = 0;
  // 查询参数
  self.queryParams = {
    campState: '',
    myActivity: false,
    myApproval: false,
    classificationId: '',
    startTime: '',
    endTime: '',
    dayTime: null,
    isCycle: true,
    pageNumber: 1,
    pageSize: 20
  };

  // 是否加载中。。。
  self.loading = true;
  // 今日日期
  self.today = new Date();
  // 默认状态
  self.mode = 'month';
  // 模式map
  self.modeMap = { week: '周', month: '月' };
  self.year = self.today.getFullYear();
  self.month = self.today.getMonth() + 1;
  // 当前视图中列表信息（页码，条数）
  self.currentList = [];
  // 展示上界页数
  self.limitPage = 5;

  /**
   * 选择模式
   * @param {string} mode 模式
   */
  self.onSwitch = function(mode) {
    self.mode = mode;
    self.queryParams.dayTime = null;
    self.queryParams.pageNumber = 1;
    if (mode === 'week') {
      self.week = $imCalendar.getWeekNumber(self.today);
    }
    self.onSearch().then(function(res) {
      normalHandleRes(res);
    });
  };

  /**
   * 滚动加载
   */
  self.onScroll = function(type, targetDom) {
    var pageNumber;
    if (type === 'next') {
      var pageTotal = Math.ceil(self.total / self.queryParams.pageSize);
      pageNumber = +self.currentList[self.currentList.length - 1].pageNumber + 1;
      if (pageNumber <= pageTotal) {
        self.queryParams.pageNumber = pageNumber;
        self.onSearch()
          .then(function(res) {
            preOrNextHandleRes(res, 'next');
          });
      }
    }
    if (type === 'pre') {
      pageNumber = +self.currentList[0].pageNumber - 1;
      if (pageNumber > 0) {
        self.queryParams.pageNumber = pageNumber;
        self.onSearch()
          .then(function(res) {
            // 修复上一页加载需要滚动条向下拉一下再向上拉一下才能请求的问题
            targetDom.target.scrollTop = 10;
            preOrNextHandleRes(res, 'pre');
          });
      }
    }
  };

  /**
   * Title回调
   */
  self.onHeader = function(mode, column) {
    self.queryParams.dayTime = column.startTime;
    self.queryParams.pageNumber = null;

    self.onSearch()
      .then(function(res) {
        self.queryParams.dayTime = null;
        normalHandleRes(res);
      });
  };

  /**
   * 上一月,上一周
   */
  self.preMonth = function() {
    self.queryParams.pageNumber = 1;

    var yeared;
    var monthed;
    var weeked;

    if (self.mode === 'month') {
      if (self.month <= 1) {
        yeared = self.year - 1;
        monthed = 12;
      } else if (self.month > 1 && self.month <= 12) {
        monthed = self.month - 1;
        yeared = self.year
      }
    } else if (self.mode === 'week') {
      // 上一周的最后一天是那一年
      yeared = moment(self.queryParams.startTime).subtract(7, 'days')._d.getFullYear()
      weeked = $imCalendar.getWeekNumber(moment(self.queryParams.startTime).subtract(7, 'days')._d);
    }

    // 月视图下 如果只查询2017以后的数据
    if (self.mode === 'month' && yeared >= 2017) {
      self.year = yeared;
      self.month = monthed;
      self.today = new Date(self.year, self.month - 1, 1);
      self.onSearch()
        .then(function(res) {
          normalHandleRes(res);
        });
    }

    // 如果是周视图 则只显示2016年最后一周及以后的数据
    if (self.mode === 'week' && ((yeared === 2016 && weeked === 0) || yeared >= 2017)) {

      self.year = yeared;
      self.week = weeked;
      self.onSearch()
        .then(function(res) {
          normalHandleRes(res);
        });
    }
  };

  /**
   * 下一月,下一周
   */
  self.nextMonth = function() {
    self.queryParams.pageNumber = 1;
    if (self.mode === 'month') {
      if (self.month > 0 && self.month < 12) {
        self.month = self.month + 1;
      } else if (self.month >= 12) {
        self.year = self.year + 1;
        self.month = 1;
      }
      self.today = new Date(self.year, self.month - 1, 1);
    } else if (self.mode === 'week') {
      // 下一周的最后一天是那一年
      const nextWeekYear = moment(self.queryParams.endTime).add(1, 'days')._d.getFullYear()
      const weeked = $imCalendar.getWeekNumber(moment(self.queryParams.endTime).add(1, 'days')._d);
      self.week = weeked;
      self.year = nextWeekYear;
    }
    self.onSearch()
      .then(function(res) {
        normalHandleRes(res);
      });
  };

  /**
   * 查询日历数据(返回一个promise)
   * @param {boolean} isResize 容器是否发生变化
   */
  self.onSearch = function(isResize) {
    var viewDate;
    if (self.mode === 'week') {
      viewDate = $imCalendar.getWeekViewTime(self.year, self.week);
    } else {
      viewDate = $imCalendar.getMonthViewTime(self.today);
    }
    self.queryParams.startTime = viewDate.start.label.replace(/\//g, '-');
    self.queryParams.endTime = viewDate.end.label.replace(/\//g, '-');
    if (self.queryParams.dayTime) {
      self.queryParams.dayTime = self.queryParams.dayTime.replace(/\//g, '-');
    }

    if (isResize) {
      if (isPagesizeChange()) {
        // 容器未改变时，总条数
        var currentTotal = self.queryParams.pageSize * self.queryParams.pageNumber;

        // 当前页码的第一条在总页面中的第多少条
        var currentPageFirst = (currentTotal - self.queryParams.pageSize + 1) > 0 ? currentTotal - self.queryParams.pageSize + 1 : 1;

        self.eventsBoxHeight = preCalendarHeigth > 100 ? preCalendarHeigth : 100;

        self.queryParams.pageSize = $imCalendar.getPageSize(self.eventsBoxHeight);

        self.queryParams.pageNumber = Math.ceil(currentPageFirst / self.queryParams.pageSize);

        // 展示条数临界值
        self.limitCount = self.queryParams.pageSize * self.limitPage;
      }
    }
    var apiUrl = GLOBAL_STATIC.campaignRoot + 'campaign/calendar';
    self.loading = true;
    return $resource(apiUrl, {})
      .get(self.queryParams, function(res) {
        self.loading = false;
        // 当前页
        self.queryParams.pageNumber = +res.page;
        self.queryParams.pageSize = +res.pageSize;
        self.total = +res.total;
        return res;
      }).$promise;
  };

  /**
   * 页面入口
   */
  self.$onInit = function() {
    // 接收父级传来的查询参数
    extendQueryParams(parentScope.$ctrl.queryParams);
    self.events = [];
    self.onSearch(true)
      .then(function(res) {
        normalHandleRes(res);
      });
  };

  /**
   * 合并查询参数
   * @param {object} queryParams 查询参数
   */
  function extendQueryParams(queryParams) {
    queryParams = queryParams || {};
    self.queryParams.campState = queryParams.campState;
    self.queryParams.myActivity = queryParams.myActivity;
    self.queryParams.myApproval = queryParams.myApproval;
    self.queryParams.classificationId = queryParams.classificationId;
    self.queryParams.isCycle = queryParams.isCycle;
  }

  // 父级过滤条件发生改变
  $scope.$on('change-query-params', function(event, queryParams) {
    // 条件发生修改，则请求页码改为1
    self.queryParams.pageNumber = 1;
    extendQueryParams(queryParams);
    self.onSearch()
      .then(function(res) {
        normalHandleRes(res);
      });
  });

  /**
   * 绑定onresize
   */
  self.$postLink = function() {
    // 获取已经绑定在window.onresize 的时间
    self.onOldResize = window.onresize;

    window.onresize = function() {
      self.onOldResize && self.onOldResize();
      onresizeTimer && clearTimeout(onresizeTimer);

      onresizeTimer = setTimeout(function() {
        if (isPagesizeChange()) {
          self.onSearch(true)
            .then(function(res) {
              normalHandleRes(res);
            });
        }
      }, 500);
    };
  };

  /**
   * 销毁onresize绑定
   */
  self.$onDestroy = function() {
    window.onresize = self.onOldResize;
  }

  /**
   * 判断页码是否更改
   */
  function isPagesizeChange() {
    var maincontainerBDom = angular.element.find('.maincontainerB')[0];
    var mainHeight = maincontainerBDom.getBoundingClientRect().height;
    var teHeight = mainHeight - 156 - 15;
    if (preCalendarHeigth === undefined || teHeight > preCalendarHeigth) {
      preCalendarHeigth = teHeight;
      return true;
    }
    return false;
  }

  /**
   * 上一页、下一页响应处理
   * @param {object} res 数据响应体
   * @param {string} type 类型
   */
  function preOrNextHandleRes(res, type) {
    if (res.data.length <= 0) {
      return;
    }
    // 如果当前页已存在，则不执行插入
    if (self.currentList.findIndex(function(item) { return item.pageNumber === +res.page; }) >= 0) {
      return;
    }

    var listLength = self.currentList.length;
    // var firstList = self.currentList[0];
    // var lastList = self.currentList[listLength - 1];
    if (listLength < self.limitPage) {
      if (type === 'pre') {
        // 上一页记录从头插入标记
        self.currentList.unshift({
          pageNumber: +res.page,
          length: res.data.length
        });
        self.events = res.data.concat(self.events);
      }

      if (type === 'next') {
        // 下一页记录从尾部插入标记
        self.currentList.push({
          pageNumber: +res.page,
          length: res.data.length
        });
        self.events = self.events.concat(res.data);
      }

    } else {
      // 上一页 则移除当前数据集中最后一页的数据，并且在数据集最前面填充上响应数据
      if (type === 'pre') {
        self.currentList.splice(self.limitPage - 1, 1);
        self.currentList.unshift({
          pageNumber: +res.page,
          length: res.data.length
        });
        // 截取长度
        var curLength = self.events.length % self.queryParams.pageSize;
        curLength = curLength === 0 ? self.queryParams.pageSize : curLength;

        // 移除数据集中最后一页
        self.events.splice(self.events.length - curLength, curLength);

        // 在头部填充响应数据
        self.events = res.data.concat(self.events);
      }

      // 下一页 则移除当前数据集中最前一页的数据，并且拼接上当前响应的数据
      if (type === 'next') {
        self.currentList.splice(0, 1);
        self.currentList.push({
          pageNumber: +res.page,
          length: res.data.length
        });
        self.events.splice(0, self.queryParams.pageSize);
        self.events = self.events.concat(res.data);
      }
    }
  }

  /**
   * 正常响应体处理
   * @param {object} res 数据响应体
   */
  function normalHandleRes(res) {
    self.events = res.data || [];
    self.currentList = [];
    // 存储列表信息
    self.currentList.push({
      pageNumber: +res.page,
      length: self.events.length
    });
  }
}
