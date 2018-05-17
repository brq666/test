/**
 * 地区选择器
 * 优化算法,采用一次加载全部数据的方式
 */
angular
  .module('campaign.controllers')
  .controller('cityCtrl', ['$scope', 'filterFilter', 'cityService', function($scope, filterFilter, cityService) {
    var vm = this;
    var temp = {};
    $scope.openPlugPop();
    init();

    /** 功能方法定义 */

    vm.showData = function(obj, type) {
      // 显示后面的数值
      vm['cityDatas' + type] = obj.child; //显示数据
      // 后面的不显示
      while (type < 4) {
        type++;
        vm['cityDatas' + type] = [];
      }
    };

    // 点击事件
    vm.selectToggleAllChild = function(obj, type) {
      setStatus(obj);
      getSelectedCitys(vm.cityDatas);
      // 后面的不显示
      vm['cityDatas' + type] = obj.child;
      while (type < 4) {
        type++;
        vm['cityDatas' + type] = [];
      }
    };

    // 保存数据
    vm.save = function(e) {
      // 修复保存后名称,id显示问题
      var obj = {};
      vm.selectedCitys.forEach(function(value, index, array) {
        value.name = value.dotPath;
        value.id = value.dotId;
      });
      obj.operateValue = vm.selectedCitys;
      if(obj.operateValue.length > 100) {
        $(this).Alert({"title":"提示","str":"选择地区过多，保存失败，请减少所选中的地区","mark":true,"width":"300px","eleZindex":1010,"markZindex":1005});
        return false;
      }
      $scope.getCitySelectedData(obj, e); // 传给父级scope cityLists
    };

    // 删除数据
    vm.delete = function(city) {
      setStatus(city);
      getSelectedCitys(vm.cityDatas);
    }

    // 清空数据
    vm.empty = function(){
      setChild(temp, '');
      getSelectedCitys(vm.cityDatas);
    }

    /** 内部方法定义 */

    // 初始化
    function init() {
      cityService.getCitys().then(function(res) {
        vm.cityDatas1 = [];
        vm.cityDatas2 = [];
        vm.cityDatas3 = [];
        vm.selectedCitys = $scope.cityLists || [];
        vm.cityDatas = res.data;
        temp.child = vm.cityDatas;
        setCity(temp); //给cityDatas添加额外属性并根据选择的城市修改状态
        getSelectedCitys(vm.cityDatas);
      }, errorHandler);
    };

    // 出错提示
    function errorHandler(res) {
      $scope.Alert({
        'title': res.message,
        'str': res.description,
        'mark': true
      });
    };

    // 增强属性
    function setCity(citys) {
      if (citys.child) {
        citys.child.forEach(function(obj, index, array) {
          obj.parent = citys;
          if (citys.id) {
            obj.dotId = citys.dotId + ',' + obj.id;
          } else {
            obj.dotId = obj.id;
          }
          if (citys.name) {
            obj.path = citys.path + '>' + obj.name;
            obj.dotPath = citys.dotPath + ',' + obj.name;
          } else {
            obj.path = obj.name;
            obj.dotPath = obj.name;
          }
          if(citys.child) {
            citys.hasChild = true;
          }
          // 根据选择的城市修改状态
          vm.selectedCitys.forEach(function(value, index, array) {
            if (value.id == obj.dotId) {
              setStatus(obj); //点击下这个地区
            }
          });
          if (!obj.child) return;
          setCity(obj);
        });
      }
    }

    // 渲染路径,相当于点击
    function setStatus(obj) {
      var status = '';
      status = obj.checkStatus = (obj.checkStatus !== 'checkbox_true_full' ? 'checkbox_true_full' : '');
      setChild(obj, status);

      while (obj.parent) {
        var maxNumber = obj.parent.child.length;
        var fullNumber = filterFilter(obj.parent.child, {
          checkStatus: 'checkbox_true_full'
        }).length;

        var partNumber = filterFilter(obj.parent.child, {
          checkStatus: 'checkbox_true_part'
        }).length;

        if (partNumber > 0) {
          if (obj.parent) {
            obj.parent.checkStatus = 'checkbox_true_part';
          }
        } else if (fullNumber === maxNumber) {
          if (obj.parent) {
            obj.parent.checkStatus = 'checkbox_true_full';
          }
        } else if (fullNumber === 0) {
          if (obj.parent) {
            obj.parent.checkStatus = '';
          }
        } else {
          if (obj.parent) {
            obj.parent.checkStatus = 'checkbox_true_part';
          }
        }

        obj = obj.parent;
      }
    }

    function setChild(obj, status) {
      if (!obj.child) return;
      obj.child.forEach(function(value, index, array) {
        array[index].checkStatus = status;
        setChild(array[index], status);
      });
    }

    function getSelectedCitys(obj) {
      vm.selectedCitys = [];
      run(obj);

      function run(obj) {
        vm.selectedCitys = vm.selectedCitys.concat(filterFilter(obj, {
          checkStatus: 'checkbox_true_full'
        }));
        filterFilter(obj, {
          checkStatus: 'checkbox_true_part'
        }).forEach(function(value, index, array) {
          run(value.child);
        });
      }
    };

  }])
  .factory('cityService', ['$http', function($http) {
    return {
      getCitys: function(id, type) {
        id = id || 0;
        type = type || 0;
        return $http.get(GLOBAL_STATIC.componentRoot + 'area/' + id + '?_=' + new Date().getTime());
      }
    };
  }])
  .directive('ccmsCityCur', function() {
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        iElm.bind('click', iElm, function(event) {

          var target = event.target;
          $(this).find('li').removeClass('cur');
          if (target.nodeName === 'LI') {
            //点击的是li元素的话,就添加cur类
            $(target).addClass('cur');
          } else {
            $(target).parents('li').eq(0).addClass('cur');
          }
        });
      }
    };
  });
