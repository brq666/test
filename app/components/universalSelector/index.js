
angular.module('components.universalSelector', [])
	.factory('universalSelector', ['$ccModal', '$rootScope', function($ccModal, $rootScope) {
    return function(opts) {
      return $ccModal.modal({
        title: opts.title || '选择器',
        scope: $rootScope.$new(),
        body: GLOBAL_STATIC.rootModule + '/components/universalSelector/tpls/body.html',
        footer: GLOBAL_STATIC.rootModule + '/components/universalSelector/tpls/footer.html',
        controller: 'UniversalSelectorCtrl',
        controllerAs: '$ctrl',
        locals: {
          data: opts
        },
        style: {
          'width': '380px',
          'min-width': '380px',
          'height': '450px',
          'min-height': '450px'
        }
      }).open().result;
    }
  }])
	.directive('universalTreeManager', ['$compile', '$resource', function($compile, $resource) {
    var Resources = {
      city: $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:pkid/tree', {type: 'city'}),
      area: $resource(GLOBAL_STATIC.componentRoot + 'shop/selector/:pkid/tree', {type: 'area'})
    };

    return {
      link: function(scope, element, attrs) {
        var ctrl = scope.$ctrl;
        var codes = ctrl.data.items.map(function(item) {
          return Object.keys(item)[0];
        });

        this.treeVoObj = {};
        this.lastChildrens = [];

        var that = this;
        var index = 0;

        // 展开/收起
        scope.toggleList = function(evt) {
          var target = evt.target.parentNode;

          // 展开/收起 下一层数据
          if (target.getAttribute('created')) {
            target.classList.toggle('open');
          } else {
            cityselector.get({
              pkid: target.getAttribute('pkid')
            }, function(res) {
              that._createTree(res.list || [], target.parentNode);
              that._setOpen(target);

              isSelected();
            });
          }
        }

        // 搜索
        scope.searchTree = function(evt, onClick) {
          if (onClick || evt.which === 13 || evt.key === 'Enter') {

            that._resetFilter();
            angular.extend([], that.lastChildrens).forEach(function (ele) {
              that._filterTree(ele, ctrl.treeKeywords);
            });

             // 剩下没展开的先全部展开
            if (!scope.createdAll) {
              that._createSurplusTree();
              scope.createdAll = true;
            }
          }
        };

        // 选择
        scope.selectItem = function(evt, root) {
          var checkbox = evt.target;
          var liItem = checkbox.parentNode.parentNode.parentNode;
          var checkboxs = liItem.querySelectorAll('[type="checkbox"]');

          Array.prototype.slice.apply(checkboxs).forEach(function(item) {
            if (item !== checkbox) item.checked = checkbox.checked;
          });

          isSelected();
        }

        // 上一级是否需要选上
        function isSelected() {
          var i = index;
          var liItems = [];

          while (i) {
            liItems.push.apply(liItems, Array.prototype.slice.apply(document.querySelectorAll('[index="'+ i +'"]')));
            i--;
          }

          liItems.forEach(function(li) {
            var setAll = true;
            var checkeds = [];
            var ul = li.querySelector('ul');
            var parentCheckbox = angular.element(li).children('h4')[0].querySelector('[type="checkbox"]');
            var checkboxs = ul ? ul.querySelectorAll('[type="checkbox"]') : [];

            Array.prototype.slice.apply(checkboxs).forEach(function(checkbox) {
              if (checkbox.checked) checkeds.push(checkbox.getAttribute('value'));
            });

            if (checkboxs.length) {
              var checked = checkboxs.length === checkeds.length;

              // 半选
              if (checkeds.length && checkboxs.length > checkeds.length) {
                parentCheckbox.indeterminate = true;
              } else {
                parentCheckbox.indeterminate = false;
              }

              // 全选
              parentCheckbox.checked = checked;
              checked ? parentCheckbox.setAttribute('checked', 'true') : parentCheckbox.removeAttribute('checked');
            }
          });
        };

        scope.getValues = function() {
          var checkboxs = document.querySelectorAll('.menu input[is-final]:checked');
          return Array.prototype.slice.apply(checkboxs).map(function(checkbox) {
            var values = checkbox.value.split(':');
            var result = {};
            result[values[0]] = values[1];

            return result;
          });
        };

        // 加载顶层数据
        this._loadRootTree = function() {
          Resources[ctrl.data.type].get({
            pkid: 0
          }, function(res) {
            var parent = element[0];

            // 创建第一层
            that._createTree(res.list || [], parent.querySelector('.menu .item > li'), true);

            // 设置打开状态
            that._setOpen(parent.querySelector('.root-tree'));

            // 设置选中状态
            isSelected();
          });
        }

        this._createTree = function(data, parentNode, createAll) {
          if (!data) return false;

          var currentIndex = Number(parentNode.getAttribute('index'));
          var parentCheckbox = parentNode.querySelector('[type="checkbox"]');

          index = currentIndex + 1;

          var html = data.map(function(item) {
            var isFinal = !item.children || item.children.length === 0;

            var html = angular.element([
              '<li text="'+ item.name +'" index="'+ index +'">',
                '<h4 pkid="'+ item.pkid +'" level="'+ item.level +'"'+ (createAll ? 'created="true"' : '') +'>',
                  '<i ng-if="'+ !isFinal +'" class="icon-arrow" ng-click="toggleList($event)"></i>',
                  '<label ng-class="{basement: '+ !!isFinal +'}">',
                    '<input type="checkbox" value="'+ item.code +':'+ item.name +'" '+ (isFinal ? 'is-final' : '') +' ng-click="selectItem($event)" /> '+ item.name,
                  '</label>',
                '</h4>',
              '</li>'
            ].join(''))[0];

            $compile(html)(scope);

            var checkbox = html.querySelector('[type="checkbox"]');

            // 设置checked值
            if (parentCheckbox.checked || codes.indexOf(item.code) !== -1) {
              checkbox.checked = true;
              checkbox.setAttribute('checked', 'true');
            }

            if (!that.treeVoObj[item.pkid]) {
              that.treeVoObj[item.pkid] = item.children || [];
            }

            if (createAll && that.treeVoObj[item.pkid].length) {
              that._createTree(item.children, html, createAll);
            }

            if (isFinal || (item.children && !item.children.length)) {
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
          angular.forEach(element[0].querySelectorAll('h4'), function(ele) {
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
          angular.forEach(element[0].querySelectorAll('.not-found'), function(node) {
            node.classList.remove('not-found');
          });
        }

        // 设置打开状态
        this._setOpen = function(ele) {
          ele.setAttribute('created', true);
          ele.classList.add('open');
        };

        this._loadRootTree();
      }
    }
  }]);
