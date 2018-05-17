/**
 * 容器是否包含另一个集合
 */
function proContains(container, collection) {
  return !!collection && collection.every(function (item) { return profindEntity(container, item.num_iid) !== -1 });
}

/**
 * 从集合中获取entity的index,找不到返回-1
 */
function profindEntity(collection, id) {
  return collection.findIndex(function (item) {
    return String(item) === String(id);
  });
}

angular.module('components.selectorByProduct')
  .controller('selectorProductCtrl', ['$ccGrid', '$ccTips', 'ProductResources', '$scope', '$rootScope', function ($ccGrid, $ccTips, ProductResources, $scope, $rootScope) {
    var bindings = this.opts.bindings;
    var type = this.opts.type;
    var that = this;
    var shopPromise = '';
    var firstInit = true; // 首次open，处理店铺

    // 复制bindings
    this.copyBindings = function (bindings) {
      var items = bindings.items ? angular.extend([], bindings.items) : [];
      return {
        items: items,
        cid: bindings.cid || null,
        selectedAll: bindings.selectedAll || false,
        onlySelected: bindings.onlySelected || false,
        sideFlag: bindings.platCode === 'edecathlon' ? false : (bindings.sideFlag || false),
        // sideFlag: false,
        shopIds: bindings.shopIds || [],
        shopsList: bindings.shopsList || [],
        segmentationId: bindings.segmentationId || null,
        platCode: bindings.platCode
        // platCode: 'edecathlon'
      };
    };

    // 转换cid
    this.exchangeId = function (reversal) {
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
          serviceType: 'node_query'
        };
        this.bindings.items.forEach(function (val) {
          params.ids.push(val);
        });
      }

      // return ProductResources.choose[reversal ? 'query' : 'save'](params).$promise;
      return reversal ? ProductResources.chooseView['query'](params).$promise : ProductResources.chooseView['save'](params).$promise;
    };

    this.bindings = this.copyBindings(bindings);
    this._oldBindings = this.copyBindings(this.bindings);
    this._prevGridOptions = {};

    this.advancedSearchState = false;
    this.treeKeywords = '';
    this.tree = this.bindings.platCode === 'edecathlon' ? { level: '000' } : { areaId: null, level: '0' };
    this.searchConf = {};
    this.customConf = {};
    this.searchColumn = [];
    this.searchValue = [];
    this.queryParams = this.opts.queryParams;



    if (this.bindings.platCode !== 'edecathlon') {
      shopPromise = ProductResources.shops(that.bindings.segmentationId, function (res) {
        that.shoplist = res;

        // 店铺回显
        if (firstInit && !that.bindings.cid) that.searchConf.shopId = that.shopId = res[0].id;
        // that.getSearchColumn(type);
      });
    }

    this.mapping = {
      valueField: 'id',
      displayField: 'name'
    };

    this.changeShops = function () {
      // 首次open，处理店铺
      that.onReset();
      that.searchConf.shopId = that.shopId;
      that.getSearchColumn();
      if (firstInit && that.bindings.cid) {
        firstInit = false;
        return;
      }
      that.bindings.items = [];
      that.onSearch();
    };

    // 表格指令配置
    this.gridOptions = {
      rowTpl: GLOBAL_STATIC.rootModule + '/components/selectorByProduct/tpls/row.tpl.html',
      headerTpl: GLOBAL_STATIC.rootModule + '/components/selectorByProduct/tpls/header.tpl.html',
      queryParams: angular.extend({ tenantId: that.bindings.segmentationId }, this.tree, this.queryParams),
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
    this.getSearchColumn = function (type) {
      var ops = {
        subjectId: this.bindings.platCode === 'edecathlon' ? 2 : that.bindings.segmentationId,
        shopId: that.shopId
      };
      ProductResources.searchColumn.get(ops, function (res) {
        that.searchColumn = res.data;
      });
    };

    // 获取表头
    this.getCloume = function (type) {
      var ops = {
        subjectId: this.bindings.platCode === 'edecathlon' ? 2 : that.bindings.segmentationId,
      };
      ProductResources.cloume.get(ops, function (res) {
        that.gridOptions.columnsDef = res.list.map(function (cloume) {
          var cell = {
            displayName: cloume.title,
            field: cloume.code
          };
          cell.align = cloume.align || 'center';

          // 处理宽度
          if (/((px)|(%))$/.test(cloume.width)) cell.width = cloume.width;
          cell.cellTemplate = '<span class="proRow" ng-bind="entity.' + cell.field + '" title="{{entity.' + cell.field + '}}"></span>'
          // 商品图片需要特殊处理
          if (type === 'product' && cloume.code === 'picurl') {
            cell.cellTemplate = '<div class="product-url" style="margin: 5px; width: 50px; height: 50px;">'
              + '<img width="50" height="50" ng-src="{{entity.picurl}}" />'
              + '</div>'
          }
          return cell;
        })
        // that.query({ parent: null, level: '0' });
      });
    };
    // 获取表格header配置
    this.getCloume(type);


    // 选择全部 -- 非当前页
    this.selectAll = function () {
      // 取消全部同时把之前选择的都删除
      if (!this.bindings.selectedAll) this.bindings.items = [];
    };

    // 搜索条件发生变化
    this.onChangeSearchValue = function () {
      this.searchValue = Object.keys(this.searchConf)
        .filter(function (key) {
          that.searchConf[key] !== ''
        })
        .map(function (key) {
          return {
            code: key,
            value: that.searchConf[key]
          }
        });
    };

    this.onChangeRelation = function (code) {
      var relationsValue = '';
      this.searchConf[code] = '';
      if (this.customConf[code + '-min'] === '' && this.customConf[code + '-max'] === '') return;
      if (this.customConf[code + '-min'] && this.customConf[code + '-max']) {
        if (this.customConf[code + '-min'] * 1 > this.customConf[code + '-max'] * 1) {
          relationsValue = this.customConf[code + '-max'] + ',' + this.customConf[code + '-min']
        } else {
          relationsValue = this.customConf[code + '-min'] + ',' + this.customConf[code + '-max']
        }
      } else {
         relationsValue = (this.customConf[code + '-min'] || null) + ',' + (this.customConf[code + '-max'] || null)
      }

      this.searchConf[code] = relationsValue;
    };

    this.onReset = function () {

      // 一旦删除所有属性之后，query方法中的this.gridOptions.queryParams之前保存的值就没法覆盖为空了
      // this.searchConf = {};
      Object.keys(this.searchConf).forEach(function (key) {
        if (Object.prototype.toString.call(that.searchConf[key]) === "[object Array]") {
          that.searchConf[key] = []
        } else {
          if (key !== 'shopId') that.searchConf[key] = '';
        }
      });
      this.customConf = {};
      this.searchValue = [];
    };

    this.onSearch = function () {
      this.query();
      this.advancedSearchState = false;
    };

    // 只显示选中的数据
    this.onOnlySelected = function () {
      var onlySelected = this.bindings.onlySelected;
      var items = this.bindings.items;

      if (onlySelected) {
        var queryParams = this.gridOptions.queryParams;
        var pager = this.gridOptions.pager;

        this._prevGridOptions = {
          queryParams: angular.extend({}, queryParams),
          pager: angular.extend({}, pager)
        };
        if (items.length) {
          this.query({ pageNum: 1, selectedIds: items.join(",") });
        } else {
          this.gridOptions.data = [];
          this.gridOptions.pager.totals = 0;
          this.gridOptions.pager.totalPages = 1;
          this.gridOptions.pager.pageNum = 1;
        }
      } else if (Object.keys(this._prevGridOptions).length) {
        var queryParams = this._prevGridOptions.queryParams;
        var pager = this._prevGridOptions.pager;
        this.gridOptions.queryParams = angular.extend({}, queryParams);
        this.gridOptions.pager = angular.extend({}, pager);
        this._prevGridOptions = {};
        this.query({ pageNum: queryParams.pageNum, selectedIds: null });
      }
    }

    this.query = function (extendOpts) {
      var extendOpts = extendOpts || {};
      var searchValue = {};
      Object
        .keys(this.searchConf)
        .forEach(function (key) {
          if (Object.prototype.toString.call(that.searchConf[key]) === "[object Array]") {
            searchValue[key] = that.searchConf[key].join(',')
          } else {
            searchValue[key] = that.searchConf[key]
          }
        });
      angular.extend(
        this.gridOptions.queryParams,
        { pageNum: 1 },
        searchValue,
        this.bindings.platCode === 'edecathlon' ? transformLevel(this.tree) : this.tree,
        extendOpts
      );
      if (this.loadGridStatus) {
        this.refreshGrid();
      } else {
        this.loadGridStatus = true;
      }

      function transformLevel(_tree) {
        var levelList = _tree.level.split(',');
        return {
          universeCode: levelList[1],
          deptCode: levelList[2],
          subDeptCode: levelList[3],
          familyCode: levelList[4],
          level: undefined,
          shopId: undefined
        };
      }
    };

    this.refreshGrid = function (_opt) {
      this.lastRequest && this.lastRequest.$cancelRequest && this.lastRequest.$cancelRequest();
      if (_opt) {
        this.gridOptions.queryParams.pageNum = _opt.queryParams.pageNum;
        this.gridOptions.queryParams.pageSize = _opt.queryParams.pageSize;
      }
      var resource = that.bindings.platCode === 'edecathlon' ? ProductResources.edecathlonChoose : ProductResources.choose;
      this.lastRequest = resource.query({tenantId: this.gridOptions.queryParams.tenantId}, this.gridOptions.queryParams, function(data) {
        that.gridOptions.pager = {
          totals: data.totals,
          totalPages: data.totalPages,
          pageNum: data.pageNum,
          pageSize: data.pageSize
        };
        that.gridOptions.externalData = data.list;
        $ccGrid.refresh(that.gridOptions).then(function(res) {
          if (firstInit && that.bindings.cid) {
            that.shopId = res.data[0]["dp_id"];
          }
        });
      })
      // this.gridOptions.resource = that.bindings.platCode === 'edecathlon' ? ProductResources.edecathlonChoose : ProductResources.choose;
      // $ccGrid.refresh(this.gridOptions).then(function (res) {
      //   // 处理店铺，赋值
      //   if (firstInit && that.bindings.cid) {
      //     that.shopId = res.data[0]["dp_id"];
      //   }
      // });
    };

    // 点击确定按钮
    this.$ok = function (modalCloseFn) {
      /* if (!this.bindings.selectedAll && !this.bindings.items.length) {
         $ccTips.error('请添加至少一条数据！', document.querySelector('.modal-body'));
         return false;
       }*/

      // 通过数据转换成一个cid
      if (angular.equals(this.bindings, this._oldBindings)) {
        this.opts.onDone && this.opts.onDone(this.copyBindings(this.bindings));
        modalCloseFn();
      } else {
        if (type !== 'shop') {
          // 商品选择
          // if (this.bindings.items.length > 1000) {
          //   var modals = document.querySelectorAll('.modal-body');
          //   $ccTips.error('最多可选1000个商品！', modals[modals.length-1]);
          //   return false;
          // }
          this.exchangeId().then(function (res) {
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
    this.$cancel = function (modalCloseFn) {
      this.bindings = this.copyBindings(this._oldBindings);
      modalCloseFn();
    }

    Object.defineProperty(that, '$allSelected', {
      // 全选标识
      get: function () {
        return !!that.bindings.items.length && !!that.gridOptions.data && proContains(that.bindings.items, that.gridOptions.data);
      }
    });

    this.switchSelectAll = function (allSelected, selectedCollection) {
      if (!allSelected) {
        that.bindings.shopsList = [];
      };
      selectedCollection.forEach(function (entity) {
        var index = profindEntity(that.bindings.items, entity.num_iid);
        if (allSelected) {
          index === -1 && that.bindings.items.push(entity.num_iid);
          index === -1 && that.bindings.shopsList.push({ shopId: entity.num_iid, shopName: entity.store_nm });
        } else {
          index !== -1 && that.bindings.items.splice(index, 1);
          // that.bindings.items = [];
        }
      });
      this.switchSelectRefreshGrid();
    };

    this.switchSelectItem = function ($selected, id) {
      if ($selected) {
        this.bindings.items.push(id);
        this.gridOptions.data.forEach(function (val, key) {
          if (val.num_iid === id) {
            that.bindings.shopsList.push({
              shopId: id,
              shopName: val.store_nm
            });
          }
        });
      } else {
        this.bindings.items.splice(profindEntity(this.bindings.items, id), 1);
        this.bindings.shopsList.forEach(function (v, k) {
          if (v.shopId === id) {
            that.bindings.shopsList.splice(k, 1);
          };
        });
      }
      this.switchSelectRefreshGrid();
    };

    this.switchSelectRefreshGrid = function() {
      if (this.bindings.onlySelected) {
        if (this.bindings.items.length === 0) {
            this.gridOptions.data.length = 0;
            this.gridOptions.pager.totals = 0;
            this.gridOptions.pager.pageNum = 1;
            this.gridOptions.pager.totalPages = 1;
        } else {
          for (var i = 0; i < this.gridOptions.data.length; i++) {
            var data = this.gridOptions.data[i];
            var _index = this.bindings.items.findIndex(function (id) {
              return String(data.num_iid) === String(id);
            });
            if (!~_index) {
              this.gridOptions.data.splice(i, 1);
              i--;
            }
          }
          this.gridOptions.queryParams.selectedIds = this.bindings.items.join(",");
          if (this.gridOptions.data.length === 0) {
            this.gridOptions.queryParams.pageNum > 1 && this.gridOptions.queryParams.pageNum--;
            this.refreshGrid();
          } 
          // else if (this.gridOptions.data.length === this.gridOptions.pager.pageSize - 1) {
          //   this.refreshGrid();
          // } 
          else {
            // this.gridOptions.pager.totals = this.bindings.items.length;
            this.refreshGrid();
            // this.gridOptions.pager.totalPages = Math.ceil((this.gridOptions.pager.totals || 0) / this.gridOptions.pager.pageSize);
          }
        }
      }
    };

    this.isEntitySelected = function (id) {
      return profindEntity(this.bindings.items, id) !== -1;
    }

    //if (this.bindings.cid && !this.bindings.items.length) {
    if (!this.bindings.items.length) {
      if (this.bindings.cid) {
        // 商品选择
        if (shopPromise) {
          shopPromise.$promise.then(function () {
            that.exchangeId(true).then(function (res) {
              that.bindings.items = res || [];
              // 处理店铺回显
              that.bindings.onlySelected = true;
              that.onOnlySelected();
            });
          });
        } else {
          that.exchangeId(true).then(function (res) {
            that.bindings.items = res || [];
            // 处理店铺回显
            that.bindings.onlySelected = true;
            that.onOnlySelected();
          });
        }
      } else {
        // 店铺选择
        that.bindings.items = that.bindings.shopIds || [];
      }
    };

    if (this.bindings.platCode === 'edecathlon') {
      that.searchConf.shopId = that.shopId = 0;
      this.changeShops();
    }

  }]);

