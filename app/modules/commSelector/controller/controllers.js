(function(window, angular, undefined, webApp) {
  webApp.controller('commSelectorCtr', ['$scope', '$http', '$compile', '$q', 'commSelectorService', '$mdCommConf',
    function($scope, $http, $compile, $q, commSelectorService, $mdCommConf) {
      $scope.commSelect = {
        'gridId': 'grid' + $scope.data.id,
        'primary': $scope.parentPrimary ? $scope.parentPrimary.split(',') : [],
        'q': [],
        'parenData': $scope.data,
        //引用父scope值
        'reloadDeferred': $q.defer(),
        'submit': function(ev) {
          var _this = this;
          $scope.$emit('commSelectSubmit', _this.q, _this.primary);
        },
        'filterChecked': function() {
          var _this = this;
          var checkList = $('#' + $scope.commSelect.gridId).find('tr');
          checkList.each(function(index, item) {
            if (!item.querySelector('input[type=checkbox]').checked && _this.filterF) {
              item.style.display = 'none';
            } else if (!item.querySelector('input[type=checkbox]').checked && !_this.filterF) {
              item.style.display = '';
            }
          });
          _this.checkAllF = _this.filterF;
        },
        'checkOne': function(ev) {
          var target = ev.currentTarget,
              value = target.value,
              _this = this;
          if (target.checked && _this.primary.indexOf(value) == -1) {
            _this.primary.push(value);
          } else if ((!target.checked) && (_this.primary.indexOf(value) != -1)) {
            _this.primary.splice(_this.primary.indexOf(value), 1);
          }
        },
        'checkAll': function(ev) {
          var _this = this;
          var target = ev.currentTarget;

          _this.primary.length = 0;
          var checkList = $('#' + $scope.commSelect.gridId).find('tr');

          checkList = checkList.map(function(index, item) {
            if (item.style.display !== 'none') {
              return item;
            }
          });

          checkList.each(function(index, item) {
            var checkbox = item.querySelector('input[type=checkbox]');
            checkbox.checked = target.checked;
            if (target.checked) {
              _this.primary.push(checkbox.value);
            }
          });
        },
        'search': function() {
          var confList = $mdCommConf.getConf();
          var _this = this;

          //_this.primary.length = 0;
          setQueryParam(confList, $scope.commSelect.q);
          $scope.commSelect.filterF = false;

          $('#' + $scope.commSelect.gridId).flexReload();
        }
      };

      function setQueryParam(arry, result) {
        result.length = 0;
        arry = arry.map(function(item) {
          return item.options.scope.commconf;
        });
        var subArry = arry.filter(function(item) {
          return item.subF == true;
        });
        subArry.forEach(function(item) {
          var tem = {
            'id': item.id,
            'type': item.$type,
            'values': []
          };
          var seArry = [];
          switch (item.$type) {
            case 'stringType':
              tem.values.push(item.start);
              tem.operType = item.config.StringType[0]; //接口返回字段，命名规则不在这里统一
              break;
            case 'dicsType':
              tem.values.push(item.select);
              tem.operType = '';
              break;
            case 'numberType':
              seArry = numberSE(item);
              tem.operType = seArry[0];
              tem.values = seArry.slice(1, seArry.length);
              break;
            case 'timeType':
              seArry = timeSE(item);
              tem.operType = seArry[0];
              tem.values = seArry.slice(1, seArry.length);
              break;
          }
          result.push(tem);
        });

        return result;
      }

      function timeSE(data) {
        var formatStr = 'YYYY-MM-DD HH:mm:ss';
        if ((data.start == "" || data.start == undefined) && data.end) {
          return ['小于等于', data.end];
        } else if ((data.end == "" || data.end == undefined) && data.start) {
          return ['大于等于', data.start];
        } else if (data.start && data.end) {
          return ['介于', moment.min(moment(data.start), moment(data.end)).format(formatStr), moment.max(moment(data.start), moment(data.end)).format(formatStr)];
        }
      }

      function numberSE(data) {
        if ((data.start == "" || data.start == undefined) && data.end) {
          return ['小于等于', data.end];
        } else if ((data.end == "" || data.end == undefined) && data.start) {
          return ['大于等于', data.start];
        } else if (data.start && data.end) {
          return ['介于', Math.min(data.start, data.end), Math.max(data.start, data.end)];
        }

      }

      var initNode = function(data) {
        var itemList = data.commonsSelectQueryItemVOs;
        var gridTitle = data.listTitleViewInfoLists;
        var colMod = [];
        $mdCommConf.clearConf();
        itemList.sort(function(a, b) {
          return b.sortValue - a.sortValue;
        });
        itemList.forEach(function(item) {
          if (item.viewDisable && angular.isFunction($mdCommConf[item.operType])) {
            if (item.hasInitData && item.initUrl) {
              $http.get(GLOBAL_STATIC.ualRoot + item.initUrl).success(function(res) {
                $mdCommConf.show($mdCommConf[item.operType]().id(item.id).title(item.viewName).content(item.viewName).tip(item.tip).config(res).parent('#condition'));
              });
            } else {
              $mdCommConf.show($mdCommConf[item.operType]().id(item.id).title(item.viewName).content(item.viewName).tip(item.tip).config(item.configs).parent('#condition'));
            }
          }
        });

        gridTitle.sort(function(a, b) {
          return a.sortValue - b.sortValue;
        });

        gridTitle.forEach(function(item) {
          if (item.primary) {
            $scope.commSelect.abbrPri = item.viewName;
            colMod.push({
              'display': '<input id="checkAll" class="mt5" type="checkbox" ng-model="commSelect.checkAllF" ng-click="commSelect.checkAll($event)">',
              'name': item.viewName,
              'dataindex': item.viewName,
              'align': 'center',
              'width': 20,
              'sortable': true,
              'hide': false,
              'renderer': function(v) {
                if ($scope.commSelect.primary.indexOf(v) !== -1) {
                  return '<input class="mt5" value="' + v + '" checked="true" type="checkbox" ng-click="commSelect.checkOne($event)">';
                } else {
                  return '<input class="mt5" value="' + v + '" type="checkbox" ng-click="commSelect.checkOne($event)">';
                }
              }
            });
          }
          colMod.push({
            'display': item.viewName,
            'name': item.viewName,
            'align': item.viewTextAlign,
            'hide': item.viewDisable,
            'width': item.viewDisable ? 0 : item.viewWidth,
            'dataindex': item.viewName,
            'renderer': function(v) {
              if (v == null) {
                return '';
              } else {
                return '<span title="' + v + '">' + v + '</span>';
              }
            }
          });
        });

        $('#' + $scope.commSelect.gridId).flexigrid({
          url: GLOBAL_STATIC.ualRoot + $scope.commSelect.parenData.configs + '/listdata',
          method: 'POST',
          dataType: 'json',
          colModel: colMod,
          sortname: 'lastUpdate',
          processData: false,
          contentType: 'application/json;charset=UTF-8',
          updateDefaultParam: true,
          sortorder: "desc",
          checkbox: false,
          singleSelect: false,
          buttons: [],
          usepager: true,
          params: [{
            'name': 'q',
            'value': $scope.commSelect.q
          },
          {
            'name': 'primary',
            'value': $scope.commSelect.primary
          }],
          useRp: true,
          rp: 10,
          showTableToggleBtn: true,
          autoload: false,
          colAutoWidth: false,
          onSuccess: function(data, res) {
            var curscope = angular.element(".grid-content").scope();
            //var scope.commSelectEle = angular.element('#' + $scope.commSelect.gridId);
            $scope.gridList = res.data;
            $compile(angular.element(".grid-content"))($scope || curscope);
            $scope.commSelect.reloadDeferred.resolve();
            $scope.$apply();
          },
          onError: function(response) {
            if (response.status == 401) {
              location.pathname = GLOBAL_STATIC.rootModule + "/modules/login/index.html";
            }
          }
        });
        if ($scope.commSelect.primary.length) {
          $('#' + $scope.commSelect.gridId).flexReload();
          $scope.commSelect.filterF = true;
          $q.all($scope.commSelect.reloadDeferred).then(function() {
            $scope.commSelect.filterChecked();
          });
        }
        //$('.pReload').remove();
      };

      commSelectorService.openSelector($scope.commSelect.parenData.configs, initNode);
    }
  ]);
})(window, angular, undefined, webApp);
