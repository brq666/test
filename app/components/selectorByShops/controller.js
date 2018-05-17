/**
 * 容器是否包含另一个集合
 */
function contains(container, collection) {
	return !!collection && collection.every(function(item) { return findEntity(container, item.store_no) !== -1});
}

/**
 * 从集合中获取entity的index,找不到返回-1
 */
function findEntity(collection, id) {
	return collection.findIndex(function(item) {
		return String(item) === String(id);
	});
}

angular.module('components.selectorByShops')
  .controller('selectorShopCtrl', ['$ccGrid', '$ccTips', 'ShopsResources', '$scope', function($ccGrid, $ccTips, ShopsResources, $scope) {
    var bindings = this.opts.bindings;
    var type = this.opts.type;
    var that = this;

    // 复制bindings
    this.copyBindings = function(bindings) {
      var items = bindings.items ? angular.extend([], bindings.items) : [];
      return {
        items: items,
        cid: bindings.cid || null,
        selectedAll: bindings.selectedAll || false,
        onlySelected: bindings.onlySelected || false,
        sideFlag: bindings.sideFlag || false,
        shopIds: bindings.shopIds || [],
        shopsList:  bindings.shopsList || []
      };
    };

    // 转换cid
    this.exchangeId = function(reversal) {
      var self = this;
      var type = this.opts.type;

      if (reversal) {
        var params = {
          type: type
        };
        params.cid = self.bindings.cid;
      } else {
        // params.ids = this.bindings.items;
        var params = {
          type: type,
          ids: [],
          serviceType:  'node_query'
        };
        this.bindings.items.forEach(function(val) {
          params.ids.push(val);
        });
      }

      return ShopsResources.choose[reversal ? 'query' : 'save'](params).$promise;
    };

    this.bindings = this.copyBindings(bindings);
    this._oldBindings = this.copyBindings(this.bindings);
    this._prevGridOptions = {};

    this.advancedSearchState = false;
    this.treeKeywords = '';
    this.tree = {areaId: null, level: '0'};
    this.searchConf = {};
    this.searchColumn = [];
    this.searchValue = [];
    this.queryParams = this.opts.queryParams;

    // 表格指令配置
    this.gridOptions = {
      rowTpl: GLOBAL_STATIC.rootModule + '/components/selectorByShops/tpls/row.tpl.html',
      headerTpl: GLOBAL_STATIC.rootModule + '/components/selectorByShops/tpls/header.tpl.html',
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


    //if (this.bindings.cid && !this.bindings.items.length) {
    if (!this.bindings.items.length) {
      if(this.bindings.cid) {
        // 商品选择
         this.exchangeId(true).then(function(res) {
            that.bindings.items = res || [];
         });
      } else {
        // 店铺选择
        that.bindings.items = that.bindings.shopIds || [];
      }
    };

    // 获取搜索的配置
    this.getSearchColumn = function(type) {
      var ops = {
        type: type
      };
      ShopsResources.searchColumn.get(ops, function(res) {
        that.searchColumn = res.data;
      });
    };

    this.getSearchColumn(type);

    // 获取表头
    this.getCloume = function(type) {
      var ops = {
        type: type
      };
      ShopsResources.cloume.get(ops, function(res) {
        that.gridOptions.columnsDef = res.list.map(function(cloume) {
          var cell = {
            displayName: cloume.title,
            field: cloume.code
          };
          cell.align = cloume.align || 'center';

          // 处理宽度
          if (/((px)|(%))$/.test(cloume.width)) cell.width = cloume.width;

          // 商品图片需要特殊处理
          if (type === 'product' && cloume.code === 'picurl') {
            cell.cellTemplate = '<div class="product-url" style="margin: 5px; width: 50px; height: 50px;">'
            + '<img width="50" height="50" ng-src="{{entity.picurl}}" />'
            + '</div>'
          }
          return cell;
        })
        that.query({ parent: null, level: '0' });
      });
    };
    // 获取表格header配置
    this.getCloume(type);


    // 选择全部 -- 非当前页
    this.selectAll = function() {
      // 取消全部同时把之前选择的都删除
      if (!this.bindings.selectedAll) this.bindings.items = [];
    };

    // 搜索条件发生变化
    this.onChangeSearchValue = function() {
      this.searchValue = Object.keys(this.searchConf)
        .filter(function(key) {
          that.searchConf[key] !== ''
        })
        .map(function(key) {
          return {
            code: key,
            value: that.searchConf[key]
          }
        });
    };
    this.onReset = function() {

      // 一旦删除所有属性之后，query方法中的this.gridOptions.queryParams之前保存的值就没法覆盖为空了
      // this.searchConf = {};
      Object.keys(this.searchConf).forEach(function(key) {
        that.searchConf[key] = '';
      });
      this.searchValue = [];
    };

    this.onSearch = function() {
      this.query();
      this.advancedSearchState = false;
    };

    // 只显示选中的数据
    this.onOnlySelected = function() {
      var onlySelected = this.bindings.onlySelected;
      var items = this.bindings.items;

      if (onlySelected) {
        var queryParams = this.gridOptions.queryParams;
        var pager = this.gridOptions.pager;

        this._prevGridOptions = {
          queryParams: angular.extend({}, queryParams),
          pager: angular.extend({}, pager )
        };
        this.query({ pageNum: 1, selectedIds: items.join(',') });
      } else if (Object.keys(this._prevGridOptions).length) {
        var queryParams = this._prevGridOptions.queryParams;
        var pager = this._prevGridOptions.pager;
        this.gridOptions.queryParams = angular.extend({}, queryParams);
        this.gridOptions.pager = angular.extend({}, pager );
        this._prevGridOptions = {};
        this.query({ pageNum: queryParams.pageNum, selectedIds: null });
      }
    }

    this.query = function(extendOpts) {
      var extendOpts = extendOpts || {};
      var searchValue = {};
      Object
        .keys(this.searchConf)
        .forEach(function(key) {
          searchValue[key] = that.searchConf[key]
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
      this.gridOptions.resource = ShopsResources.choose;
      $ccGrid.refresh(this.gridOptions);
    };

    // 点击确定按钮
    this.$ok = function(modalCloseFn) {
      if (!this.bindings.selectedAll && !this.bindings.items.length) {
        $ccTips.error('请添加至少一条数据！', document.querySelector('.modal-body'));
        return false;
      }

      // 通过数据转换成一个cid
      if (angular.equals(this.bindings, this._oldBindings)) {
        this.opts.onDone && this.opts.onDone(this.copyBindings(this.bindings));
        modalCloseFn();
      } else {
        if(type !== 'shop') {
          // 商品选择
          this.exchangeId().then(function(res) {
            that.bindings.cid = res.snapshootId;
            that.opts.onDone && that.opts.onDone(that.copyBindings(that.bindings));
            modalCloseFn();
          })
        } else {
          that.opts.onDone && that.opts.onDone(that.copyBindings(that.bindings));
          modalCloseFn();
        }
      }
    };

    // 取消
    this.$cancel = function(modalCloseFn) {
      this.bindings = this.copyBindings(this._oldBindings);
      modalCloseFn();
    }

    Object.defineProperty(that, '$allSelected', {
      // 全选标识
      get: function() {
           return !!that.bindings.items.length && !!that.gridOptions.data && contains(that.bindings.items, that.gridOptions.data);
      }
    });

    this.switchSelectAll = function(allSelected, selectedCollection) {
      if(!allSelected) {
        that.bindings.shopsList = [];
      };
      selectedCollection.forEach(function(entity) {
        var index = findEntity(that.bindings.items, entity.store_no);
        if (allSelected) {
          index === -1 && that.bindings.items.push(entity.store_no);
          index === -1 && that.bindings.shopsList.push({shopId: entity.store_no, shopName: entity.store_nm});
        } else {
          index !== -1 && that.bindings.items.splice(index, 1);
        }
      });
    };

    this.switchSelectItem = function($selected, id) {
      if ($selected) {
        this.bindings.items.push(id);
        this.gridOptions.data.forEach(function(val, key) {
          if(val.store_no === id) {
            that.bindings.shopsList.push({
              shopId: id,
              shopName: val.store_nm
            });
            return;
          }
        });
      } else {
        this.bindings.items.splice(findEntity(this.bindings.items, id), 1);
        this.bindings.shopsList.forEach(function(v, k) {
          if(v.shopId === id) {
            that.bindings.shopsList.splice(k, 1);
            return;
          };
        });
      }
    };

    this.isEntitySelected = function(id) {
      return findEntity(this.bindings.items, id) !== -1;
    }


  }]);

