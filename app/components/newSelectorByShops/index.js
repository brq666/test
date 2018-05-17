
angular.module('components.newSelectorByShops', [])
	.factory('newSelectorShops', ['$ccModal', '$rootScope', function($ccModal, $rootScope) {
    return function(data) {
      return $ccModal.modal({
        title: '店铺选择器',
        scope: $rootScope.$new(),
        body: GLOBAL_STATIC.rootModule + '/components/newSelectorByShops/tpls/body.html',
        footer: GLOBAL_STATIC.rootModule + '/components/newSelectorByShops/tpls/footer.html',
        controller: 'NewSelectorShopCtrl',
        controllerAs: '$ctrl',
        locals: {
          data: data
        },
        style: {
          'width': '1000px',
          'min-width': '1000px',
          'height': '456px',
          'min-height': '456px'
        }
      }).open().result;
    }
  }])
	.directive('newSelectorTreeManager', ['$compile', 'newShopsResources', function($compile, newShopsResources) {
    return function(scope, element, attrs) {
      var that = this;
      this.$scope = scope;
      this.ctrl = scope.$ctrl;
      this.$element = element;

      this.treeVoObj = {};
      this.lastChildrens = [];
      // 添加事件
      this._bindLoadNextTreeEvent = function() {
        var treeListEle = this.$element[0].querySelector('.menu');
        var searchInput = this.$element[0].querySelector('.instant-search input');
        var searchBtn = this.$element[0].querySelector('.instant-search .search-btn');
        var searchTree = function(evt, onClick) {
          if (onClick || evt.which === 13 || evt.key === 'Enter') {

            that._resetFilter();
            angular.extend([], that.lastChildrens).forEach(function (ele) {
              that._filterTree(ele, that.ctrl.treeKeywords);
            });

            // 剩下没展开的先全部展开
            if (!that.$scope.createdAll) {
              that._createSurplusTree();
              that.$scope.createdAll = true;
            }
          }
        };

        treeListEle.addEventListener('click', function(evt) {
          var target = evt.target.tagName === 'H4' ? evt.target : evt.target.parentNode;
          if (target.tagName !== 'H4') return false;

          var selected = evt.target.tagName !== 'I';
          var pkid = target.getAttribute('pkid');
          var level = target.getAttribute('level');

          // 行为是否要选中当前项
          if (selected) {
            that.ctrl.tree = {areaId: pkid, level: level};
            that.ctrl.query();
            that._setSelected(target);

            if (!that.topLevel) return false;
          }

          // 展开/收起 下一层数据
          if (target.getAttribute('created')) {
            target.classList.toggle('open');
          } else {
            newShopsResources.tree.get({
              pkid: pkid,
              platCode : that.ctrl.queryParams.platCode
            }, function(res) {
              that._createTree(res.list || [], target.parentNode);
              that._setOpen(target);
            });
          }
        });

        searchInput.addEventListener('keyup', function(evt) {searchTree(evt)});
        searchBtn.addEventListener('click', function(evt) {searchTree(evt, true)});
      };

    	// 加载顶层数据
      this._loadRootTree = function() {
        console.log('newSelector');
        newShopsResources.tree.get({
          pkid: 0,
          platCode : that.ctrl.queryParams.platCode
        }, function(res) {
          var parent = that.$element[0];

          // 创建第一层
          that._createTree(res.list || [], parent.querySelector('.menu .item > li'), true);

          // 设置打开状态
          that._setOpen(parent.querySelector('.root-tree'));
        });
      }

      this._createTree = function(data, parentNode, createAll) {
        if (!data) return false;

        var html = data.map(function(item) {
            var html = angular.element([
                '<li text="' + item.name + '">',
                '<h4 pkid="' + item.pkid + '" level="' + item.level + '"' + (createAll ? 'created="true"' : '') + '>',
                '<i ng-if="' + (!item.isFinal) + '" class="icon-arrow"></i>',
                '<span ng-class="{basement: ' + (!!item.isFinal) + '}" title="' + item.name + '">' + item.name +'</span>',
                '</h4>',
                '</li>'
              ].join(''))[0];

          $compile(html)(that.$scope);

          if (!that.treeVoObj[item.pkid]) {
            that.treeVoObj[item.pkid] = item.children || [];
          }

          if (createAll && that.treeVoObj[item.pkid].length) {
            that._createTree(item.children, html, createAll);
          }

          if (item.isFinal || (item.children && !item.children.length)) {
            that.lastChildrens.push(html);
          }

          return html;
        });
        var list = angular.element('<ul></ul>');
        list.append(html);
        angular.element(parentNode).append(list);
      };

      // 创建
      this._createSurplusTree = function() {
        angular.forEach(this.$element[0].querySelectorAll('h4'), function(ele) {
            var pkid = ele.getAttribute('pkid');
          if (!ele.parentNode.querySelector('ul')) {
            that._createTree(that.treeVoObj[pkid], ele.parentNode, true);
            ele.setAttribute('created', 'true');
          }
        });
      };

      this._filterTree = function(ele, keywords) {
        if (keywords !== '') {
          var REGEXP = new RegExp(keywords, 'g');

          while (!ele.classList.contains('root-tree-parent')) {

            // 当层下面没有匹配到搜索的词隐藏
            if (!REGEXP.test(ele.getAttribute('text')) && !ele.querySelectorAll('li:not(.not-found)').length) {
              ele.classList.add('not-found');
            }

            (function(currentEle) {
              setTimeout(function() {
                var notFound = !currentEle.classList.contains('not-found');
                var notFounds = currentEle.querySelectorAll('li:not(.not-found)').length;
                notFound && notFounds && that._setOpen(currentEle.querySelector('h4:nth-child(1)'));
              }, 16);
            })(ele);
            ele = (ele.parentNode.tagName === 'UL' ? ele.parentNode.parentNode : ele.parentNode);
          }
        }
      }

      // 重置过滤掉的菜单
      this._resetFilter = function() {
        angular.forEach(this.$element[0].querySelectorAll('.not-found'), function(node) {
          node.classList.remove('not-found');
        });
      }

      // 设置选中当前
      this._setSelected = function(target) {
        angular.forEach(document.querySelectorAll('.modal-body .menu-tree h4'), function(ele) {
          ele.classList.contains('selected') && ele.classList.remove('selected');
        });
        target.classList.add('selected');
      },

      // 设置打开状态
      this._setOpen = function(ele) {
        ele.setAttribute('created', true);
        ele.classList.add('open');
      };


      this._bindLoadNextTreeEvent();
      this._loadRootTree();
    }
  }]);
