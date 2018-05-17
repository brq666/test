/**
 * 容器是否包含另一个集合
 */
function newShopcontains(container, collection) {
  return !!collection && collection.every(function(item) {
      return newShopfindEntity(container, item.store_no) !== -1;
    });
}

/**
 * 从集合中获取entity的index,找不到返回-1
 */
function newShopfindEntity(collection, id) {
  return collection.findIndex(function(item) {
    return String(item) === String(id);
  });
}

angular.module('components.newSelectorByShops')
  .controller('NewSelectorShopCtrl', ['$ccGrid', '$ccTips', 'newShopsResources', '$scope', 'data', 'modalInstance', function($ccGrid, $ccTips, newShopsResources, $scope, data, modalInstance) {

    var config = data.config;
    var type = data.type;
    var self = this;

    this.disable = !!config.disable;
    this.selectedAll = !!config.selectedAll;
    this.onlySelected = !!config.onlySelected;
    this.sideFlag = !!config.sideFlag;
    this.shops = angular.copy(data.shops || []);
    this.shopIds = this.shops.map(function(shop) {
      return Object.keys(shop)[0];
    });
    this.shopIds = this.shops.map(function(shop) {
      return shop.shopId;
    });
    this.items = angular.copy(this.shopIds);
    this._prevGridOptions = {};

    this.advancedSearchState = false;
    this.treeKeywords = '';
    this.tree = {areaId: null, level: '0'};
    this.searchConf = {};
    this.searchColumn = [];
    this.searchValue = [];
    this.queryParams = config.queryParams || {}

    // 表格指令配置
    this.gridOptions = {
      rowTpl: GLOBAL_STATIC.rootModule + '/components/newSelectorByShops/tpls/row.tpl.html',
      headerTpl: GLOBAL_STATIC.rootModule + '/components/newSelectorByShops/tpls/header.tpl.html',
      queryParams: angular.extend({type: type}, this.tree, this.queryParams),
      pager: {
        totals: 0,  		// 总条数
        totalPages: 1,  	// 总页数
        pageNum: 1,  		// 当前页码
        pageSize: 20, 		// 每页大小
        pageSizeList: [10, 20, 50, 100],
        pageSizeListDisabled: false
      },
      emptyTipTpl: '<div class="init-msg"><span class="msg">暂无数据</span> </div>'
    };

    // 获取搜索的配置
    this.getSearchColumn = function(type) {
      newShopsResources.searchColumn.get({type: type}, function(res) {
        self.searchColumn = res.data;
      });
    };

    this.getSearchColumn(type);

    // 获取表头
    this.getCloume = function(type) {
      newShopsResources.cloume.get({type: type}, function(res) {
        self.gridOptions.columnsDef = res.list.map(function(cloume) {
          var cell = {displayName: cloume.title, field: cloume.code};

          cell.align = cloume.align || 'center';

          // 处理宽度
          if (/((px)|(%))$/.test(cloume.width)) cell.width = cloume.width;

          // 商品图片需要特殊处理
          if (type === 'product' && cloume.code === 'picurl') {
            cell.cellTemplate = [
              '<div class="product-url" style="margin: 5px; width: 50px; height: 50px;">',
              '<img width="50" height="50" ng-src="{{entity.picurl}}" />',
              '</div>'
            ].join('');
          }
          return cell;
        })
        self.query({parent: null, level: '0'});
      });
    };
    // 获取表格header配置
    this.getCloume(type);


    // 选择全部 -- 非当前页
    this.selectAll = function() {
      // 取消全部同时把之前选择的都删除
      if (!this.selectedAll) this.items = [];
    };

    // 搜索条件发生变化
    this.onChangeSearchValue = function() {
      this.searchValue = Object.keys(this.searchConf)
        .filter(function(key) {
          self.searchConf[key] !== '';
        })
        .map(function(key) {
          return {
            code: key,
            value: self.searchConf[key]
          };
        });
    };

    this.onReset = function() {

      // 一旦删除所有属性之后，query方法中的this.gridOptions.queryParams之前保存的值就没法覆盖为空了
      // this.searchConf = {};
      Object.keys(this.searchConf).forEach(function(key) {
        self.searchConf[key] = '';
      });
      this.searchValue = [];
    };

    this.onSearch = function() {
      this.query();
      this.advancedSearchState = false;
    };

    // 只显示选中的数据
    this.onOnlySelected = function() {
      var onlySelected = this.onlySelected;
      var items = this.items;

      if (onlySelected) {
        var queryParams = this.gridOptions.queryParams;
        var pager = this.gridOptions.pager;

        this._prevGridOptions = {
          queryParams: angular.extend({}, queryParams),
          pager: angular.extend({}, pager)
        };
        this.query({pageNum: 1, selectedIds: items.join(',')});
      } else if (Object.keys(this._prevGridOptions).length) {
        var queryParams = this._prevGridOptions.queryParams;
        var pager = this._prevGridOptions.pager;
        this.gridOptions.queryParams = angular.extend({}, queryParams);
        this.gridOptions.pager = angular.extend({}, pager);
        this._prevGridOptions = {};
        this.query({pageNum: queryParams.pageNum, selectedIds: null});
      }
    }

    this.query = function(extendOpts) {
      var extendOpts = extendOpts || {};
      var searchValue = {};

      Object
        .keys(this.searchConf)
        .forEach(function(key) {
          searchValue[key] = self.searchConf[key]
        });

      angular.extend(
        this.gridOptions.queryParams,
        {pageNum: 1},
        this.tree,
        searchValue,
        extendOpts
      );
      this.refreshGrid();
    };

    this.refreshGrid = function() {
      this.gridOptions.resource = newShopsResources.choose;
      $ccGrid.refresh(this.gridOptions);
    };

    this.$ok = function() {
      if (!this.selectedAll && !this.items.length) {
        $ccTips.error('请添加至少一条数据！', document.querySelector('.modal-body'));
        return false;
      }

      modalInstance.ok({
        shops: this.shops,
        config: {
          disable: this.disable,
          selectedAll: this.selectedAll,
          onlySelected: this.onlySelected,
          sideFlag: this.sideFlag
        }
      });
    };

    // 取消
    this.$cancel = function() {
      modalInstance.cancel();
    }

    this.switchSelectAll = function(allSelected, selectedCollection) {
      if (!allSelected) {
        this.shops = [];
      }
      ;
      selectedCollection.forEach(function(entity) {
        var index = newShopfindEntity(self.items, entity.store_no);

        if (allSelected && index === -1) {
          self.items.push(entity.store_no);
          self.shops.push({shopId: entity.store_no, shopName: entity.store_nm});
        } else if (!allSelected && index !== -1) {
          self.items.splice(index, 1);
        }
      });
    };

    this.switchSelectItem = function($selected, id) {
      if ($selected) {
        this.items.push(id);
        this.gridOptions.data.forEach(function(val, key) {
          if (val.store_no === id) {
            self.shops.push({
              shopId: id,
              shopName: val.store_nm
            });
            return;
          }
        });
      } else {
        this.items.splice(newShopfindEntity(this.items, id), 1);
        this.shops.forEach(function(v, k) {
          if (v.shopId === id) {
            self.shops.splice(k, 1);
            return;
          }
          ;
        });
      }
    };

    this.isEntitySelected = function(id) {
      return newShopfindEntity(this.items, id) !== -1;
    }

    // 设置 get
    Object.defineProperty(this, '$allSelected', {
      // 全选标识
      get: function() {
        return !!this.items.length && !!this.gridOptions.data && newShopcontains(this.items, this.gridOptions.data);
      }
    });
  }]);

