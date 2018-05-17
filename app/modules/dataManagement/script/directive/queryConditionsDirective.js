//获得当前对象和body之间的左边距
function getLeftSet(elem) {
  return elem.offsetParent ? elem.offsetLeft + getLeftSet(elem.offsetParent) : elem.offsetLeft;
}
//获得当前对象和body之间的上边距
function getTopSet(elem) {
  return elem.offsetParent ? elem.offsetTop + getTopSet(elem.offsetParent) : elem.offsetTop;
}
function putObject(path, object, value) {
  var modelPath = path.split(".");

  function fill(object, elements, depth, value) {
    var hasNext = ((depth + 1) < elements.length);
    if (depth < elements.length && hasNext) {
      if (!object.hasOwnProperty(modelPath[depth])) {
        object[modelPath[depth]] = {};
      }
      fill(object[modelPath[depth]], elements, ++depth, value);
    } else {
      object[modelPath[depth]] = value;
    }
  }

  fill(object, modelPath, 0, value);
}
//查询节点右边的查询条件的directive
var dataManageQuerydirective = angular.module('dataManage.querydirectives', []);
dataManageQuerydirective.directive('customerConditions', ['$compile', '$q', '$templateCache',
  function($compile, $q, $templateCache) {
    return {
      controller: ["$http", "$scope", "$q",
        function($http, $scope, $q) {
          /*模版载入start*/
          angular.forEach(dataManageQueryTemplates, function(val, key) {
            $templateCache.put(val.type, val.template);
          });
          /*模板加载 end*/
          //暂存所有scope,设置从1开始，和index对应
          var storeCons = [];
          //条件span数量,index
          var count = 0;
          //保存每个新加入的查询条件
          this.addCondition = function(data, groupData) {
            count++;
            var newScope = $scope.$new();
            //左上角的index
            newScope.index = count;
            //数据是否已加载,则保存数据到scope,设置发请求的参数为,防止每个在发请求获取数据
            if (typeof data == 'object') {
              newScope.isLoaded = true;
              newScope.data = data;
              newScope.groupData = data.groupConditions || groupData; // 特殊自定义行为
            } else {
              newScope.queryItemId = data;
              newScope.isLoaded = false;
              newScope.groupData = groupData;
            }
            storeCons.push(newScope);
            return newScope;
          };
          //删查询条件的时候销毁作用域
          this.removeCondition = function(index) {
            var scope = storeCons.splice(index, 1)[0];
            scope.$destroy();

          };
          this.removeAllConditions = function() {
            storeCons = [];
            count = 0;
            $(".targetDivBox .content-conditions").html("");
          }
          //获取所有条件的
          this.getAllConditions = function() {
            var conditions = [];
            angular.forEach(storeCons, function(storeScope, key) {
              /*debugger;
               if (key == 0) {
               return;
               }*/
              var condition = {};
              condition.values = {};
              var config = storeScope.data;

              // condition.id = storeScope.data.id ? storeScope.data.id : "";
              condition.attributeId = storeScope.data.id ? storeScope.data.id: "";
              //string转为intege
              //condition.queryItemId -= 0;
              condition.type = config.type;
              var values = storeScope.getSubmitValue();
              condition.operator = values.operator;
              condition.values = values.value;
              //condition.groupConditions = storeScope.groupData
              conditions.push(condition);
            });
            return conditions;
          };
          this.editConditions = function(data, groupData) {
            var has = false;
            var preScope;
            var index;
            for (var i = 0; i < storeCons.length; i++) {
              if (storeCons[i].defaultName == data.name) {
                has = true;
                preScope = $scope.$new();
                //左上角的index
                preScope.index = storeCons[i].index;
                preScope.data = data;
                preScope.isLoaded = true;
                preScope.groupData = data.groupConditions || groupData; // 特殊自定义行为
                index = i;
              }
            }
            if (has) {
              this.removeCondition(index);
              storeCons.push(preScope);
              return preScope;
            }

          };
        }],
      link: function(scope, elem, attrs, ctrl) {
        //暂存compile后的节点,提高效率,一次compile,多次link
        var compiledDires = {};
        //增加一个筛选条件
        scope.addCondition = function(id, type, groupData, defaultName, curEditorCustomIndex) { // defaultName营销历史赋值名称 groupData——获取传给后台、无实际业务意义,  curEditorCustomIndex判断是否为自定义属性编辑
          scope.markInitType = type; //用于表示营销历史新生成条件发送不同请求
          var compileDire;
          //第一次编译的时候暂存
          if (!compiledDires[type]) {
            compileDire = compiledDires[type] = {};
            //根据类型加载模版
            compileDire['node'] = $($templateCache.get(type));
            compileDire['link'] = $compile(compileDire['node']);
          } else {
            //取出暂存的dire
            compileDire = compiledDires[type];
          }
          /*行为自定义类型 订单查询 start*/
          if (!defaultName && !id.name) { // 自定义可能新建后端没传值
            defaultName = scope.customDragCurName || "";
          }
          /*行为自定义类型 订单查询 end*/
          var newScope = ctrl.addCondition(id, groupData);
          newScope.defaultName = defaultName; //只有营销历史，才用到此名称
          if (typeof id == 'number') {
            scope.$apply(function() {
              linkFun();
            });
          } else {
            linkFun();
          }
          //链接函数
          function linkFun() {
            compileDire['link'](newScope, function(cloneNode) {
              elem.append(cloneNode);
              //滚动条最下移
              //cloneNode[0].scrollIntoView();
            });
          }
        };
        scope.editCondition = function(id, type, groupData, defaultName, curEditorCustomIndex) {
          scope.markInitType = type; //用于表示营销历史新生成条件发送不同请求
          var compileDire;

          //第一次编译的时候暂存
          if (!compiledDires[type]) {
            compileDire = compiledDires[type] = {};
            //根据类型加载模版
            compileDire['node'] = $($templateCache.get(type));
            compileDire['link'] = $compile(compileDire['node']);
          } else {
            //取出暂存的dire
            compileDire = compiledDires[type];
          }
          /*行为自定义类型 订单查询 start*/
          if (!defaultName && !id.name) { // 自定义可能新建后端没传值
            defaultName = scope.customDragCurName || "";
          }

          /*行为自定义类型 订单查询 end*/
          var newScope = ctrl.editConditions(id, groupData);
          newScope.defaultName = defaultName; //只有营销历史，才用到此名称
          if (typeof id == 'number') {
            scope.$apply(function() {
              linkFun();
            });
          } else {
            scope.$apply(function() {
              linkFun();
            })
          }
          //链接函数
          function linkFun() {
            compileDire['link'](newScope, function(cloneNode) {
              if (newScope.index == scope.ConditionLength) {
                $("div[data-index='" + (newScope.index - 1) + "']").after(cloneNode)
              } else {
                $("div[data-index='" + (newScope.index + 1) + "']").before(cloneNode)
              }
            });
          }
        };
        //保存后再打开节点获取的所有的条件
        scope.addAllConditions = function(data) { //默认的值在data里面，可自行打印查看
          scope.AllConditions = data;
          var i = 0;
          angular.forEach(data, function(value, key) {
            var returnDefaultName = disponseQueryName(value.conditionOps.groupConditions, value.conditionOps.name); //处理回显名称
            var defaultConfig = value.conditionOps; //获取配置的数据
            scope.addCondition(defaultConfig, defaultConfig.type, "", returnDefaultName);
            i++;
          });
          scope.ConditionLength = i;
          $compile('<button class="btn btnLine24" ng-class="{btnBlue:SearTools.dataLoading}" ng-click="SearTools.startSearch()">{{SearTools.searchButtonVal}}</button>')(scope, function(searchButton) {
            elem.append(searchButton);
          })
        };
        scope.resetConditions = function(id) {
          var AllConditions = angular.copy(scope.AllConditions);
          angular.forEach(AllConditions, function(value, key) {
            if (key == id) {
              var returnDefaultName = disponseQueryName(value.conditionOps.groupConditions, value.conditionOps.name); //处理回显名称
              var defaultConfig = value.conditionOps; //获取配置的数据
              scope.editCondition(defaultConfig, defaultConfig.type, "", returnDefaultName);
            }
          });
        }
        //处理回显条件 有分组的的名称展示
        function disponseQueryName(customerConditions, innerName) {
          var storeConditionsNameAry = [],
              defalultReturnName = "";
          if (customerConditions) {
            for (var i = 1; i <= customerConditions.length; i++) {
              angular.forEach(customerConditions, function(val, key) {
                if (val.orderId == i) {
                  storeConditionsNameAry.push(val.valueShow);
                }
              });
            }
            storeConditionsNameAry.push(innerName);
            defalultReturnName = storeConditionsNameAry.join("-");
          }
          return defalultReturnName
        }

        //删除一个筛选条件
        scope.removeCondition = function(index) {
          ctrl.removeCondition(index);
        };
        //保存所有条件
        scope.getAllConditions = function() {
          return ctrl.getAllConditions();
        };
        scope.removeAllConditions = function() {
          return ctrl.removeAllConditions();
        }
      }
    }
  }
]);
//每个筛选条件的公用方法
dataManageQuerydirective.directive('customerCondition', ['$compile',
  function() {
    return {
      name: 'customerCondition',
      priority: 1,
      controller: ["$http", "$scope", "$q",
        function($http, $scope, $q) {
          var defer = $q.defer();
          var id;
          $scope.asyncDefaultData = defer.promise;
          //如果数据打开的时候就有了
          if ($scope.isLoaded) {
            defer.resolve();
            return true;
          }

        }
      ],
      link: function(scope, elem, attrs, ctrls) {
        scope.$watch('myCommit.value', function(val, oldVal) {
          if (oldVal != undefined && val == "") {}
        });
        elem.find("label").eq(0).unbind("click").bind("click", function(event) {
          $(".condition .edit").each(function() {
            var isValue = $(this).find("a").html() == "";
            if (($(this).siblings("section[data-type='add']").css("display") != "none") && (!($(this).siblings("section[data-type='add']").hasClass("numberType")) && ($(this).siblings("section[data-type='add']").attr("default") != $(this).find("a").html()) || (($(this).siblings("section[data-type='add']").hasClass("numberType")) && ($(this).siblings("section[data-type='add']").attr("default") == "valueChange")))) {
              $(this).siblings("label").hide().end().show().siblings("section").find("button").click();
              $("section[data-type='add']").hide();
            }
          });
          $("section[data-type='add']").hide();
            $(".targetDivBox label").css("border-bottom-color", "#cecece");
            $(".targetDivBox .up").not($(this)).attr("class", "down");
            var id = $(elem)[0].id;
            var section = $("#add" + id);
            var label = $("#lbl" + id);
            //条件输入框展示和隐藏
            if (label.hasClass("down")) {
              var maincontainer = document.getElementsByClassName("maincontainer")[0];
              var x = getLeftSet($(this)[0]) - getLeftSet(maincontainer);
              var y = getTopSet($(this)[0]) - getTopSet(maincontainer) + $(this).outerHeight() - 1;
              if (section.attr("style").indexOf("left") == -1) {
                section.css({
                  "top": y,
                  "left": x
                });
              }
              section.show();
              label.attr("class", "up").css("border-bottom-color", "white");
            } else {
              if (scope.IsCommit) {
                $("#edit" + id).show();
                $("#add" + id).hide();
                label.hide();
                label.attr("class", "up").css("border-bottom-color", "white");
              } else {
                section.hide();
                label.attr("class", "down").css("border-bottom-color", "#cecece");
              }
            }
            //确定
            $(section).find("button").unbind("click").bind("click", function(e) {
              scope.myCommit = scope.getSubmitValue();
              var hasCommit = scope.myCommit;
              if (hasCommit.value != undefined && hasCommit.value != "") {
                scope.IsCommit = true;
                $("#edit" + id).show();
                $("#add" + id).hide();
                label.hide();
                // scope.SearTools.changeData();// 由于性能问题，先注释不实时刷新
              } else {
                scope.IsCommit = false;
                $("#edit" + id).hide();
                $("#add" + id).hide();
                label.attr("class", "down").css("border-bottom-color", "#cecece");
                if (hasCommit.value == "" || hasCommit.value == undefined) {
                  elem.remove();
                  scope.resetConditions(id);
                  // scope.SearTools.changeData();
                }
              }
              scope.$apply();
            })
            //选择后的下拉区域触发
            $("#edit" + id).find("span").unbind("click").click(function() {
              $(this).find("em:eq(0)").click();
            })

            //编辑-详细
            $("#edit" + id).find("em").eq(0).unbind("click").bind("click", function(e) {
              $("section[data-type='add']").hide();
              $("#edit" + id).hide();
              $("#add" + id).show();
              /*   $(this).closest(".edit").siblings("section").attr("default", $(this).siblings("a").html());
               if( $(this).closest(".edit").siblings("section").hasClass("numberType")){//数字类型特殊处理
               $(this).closest(".edit").siblings("section").attr("default","");
               }*/
              label.show();
              label.attr("class", "up");
              $(".targetDivBox .up").not(label).attr("class", "down");
              e.stopPropagation();
            });
            $("#edit" + id).find("a").eq(0).unbind("click").bind("click",
            function(e) {
              $("section[data-type='add']").hide();
              $("#edit" + id).hide();
              $("#add" + id).show();
              label.show();
              e.stopPropagation();
            })
          //编辑-删除
          $("#edit" + id).find("em").eq(1).unbind("click").bind("click", function(e) {
            elem.remove();
            scope.resetConditions(id);
            //scope.SearTools.changeData();
          });
          event.stopPropagation();
        })
      }
    }
  }
]);
//1.数字类型
dataManageQuerydirective.directive('numberDataType', ['$compile', '$parse',
  function($compile, $parse) {
    // Runs during compile
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            //从服务器获取的值
            $scope.operator = $scope.data.configs['NumberType'][0];
          });
        }],
      link: function(scope, elem, attrs) {
        var inited = false;
        addStrict(scope.data.configs);
        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var numInput = undefined;
          scope.numInput = "";
          if (~~scope.numInput1 <= ~~scope.numInput2 && scope.numInput1 != "" && scope.numInput2 != "" && scope.numInput1 != undefined && scope.numInput2 != undefined) { //between and
            scope.operator = scope.data.configs['NumberType'][0];
            numInput = scope.numInput1 + ',' + scope.numInput2;
            scope.numInput = scope.operator + scope.numInput1 + '和' + scope.numInput2;
          } else if (~~scope.numInput1 > ~~scope.numInput2 && scope.numInput1 != "" && scope.numInput2 != "" && scope.numInput1 != undefined && scope.numInput2 != undefined) { //between and
            scope.operator = scope.data.configs['NumberType'][0];
            var num1 = scope.numInput1;
            var num2 = scope.numInput2;
            scope.numInput1 = num2;
            scope.numInput2 = num1;
            numInput = scope.numInput1 + ',' + scope.numInput2;
            scope.numInput = scope.operator + scope.numInput1 + '和' + scope.numInput2;
          } else if (~~scope.numInput1 > 0 && (scope.numInput2 == undefined || scope.numInput2 == "")) { //>=
            scope.operator = scope.data.configs['NumberType'][1];
            numInput = scope.numInput1;
            scope.numInput = scope.operator + scope.numInput1;
          } else if (~~scope.numInput2 > 0 && (scope.numInput1 == undefined || scope.numInput1 == "")) { //<=
            scope.operator = scope.data.configs['NumberType'][2];
            numInput = scope.numInput2;
            scope.numInput = scope.operator + scope.numInput2;
          } else {
            numInput = scope.numInput1;
          }
          var value = {};
          value.value = numInput;
          value.operator = scope.operator;
          return value;
        };
        function addStrict(config) {
          if (inited) {
            return;
          }
          var els = elem.find('input');
          //输入类型 :浮点数 整数 百分数
          if (config['NumberInputType']) {
            switch (config['NumberInputType'][0]) {
              case 'Int':
                els.attr('num-data-type', '整数');
                break;
              case 'Float':
                els.attr('num-data-type', '浮点数');
                break;
              case 'Percentage':
                els.attr('num-data-type', '百分数');
                els.after('<span class="mr10 dollor">%</span>');
                break;
            }
          }
          //202(输入精度:小数点后几位)
          if (config['NumberInputPrecision']) {
            els.attr('num-data-precision', config['NumberInputPrecision'][0]);
          }
          //204(输入范围)
          if (config['NumberInputRange']) {
            els.attr('num-data-between', config['NumberInputRange']);
            els.attr('range', config['NumberInputRange']);
          }

          $compile(elem.find('input')[0])(scope);
          $compile(elem.find('input')[1])(scope);
          inited = true;
        }

        //监听值的变化
        scope.$watch("numInput1", function(n, o) {
          if (n == undefined && o == undefined) {
            scope.defaultOldValue = "";
            return null;
          };
          if (n != o) {
            scope.defaultOldValue = "valueChange";
          } else {
            scope.defaultOldValue = "";
          }
        });

        scope.$watch("numInput2", function(n, o) {
          if (n == undefined && o == undefined) {
            scope.defaultOldValue = "";
            return null;
          };

          if (n != o) {
            scope.defaultOldValue = "valueChange";
          } else {
            scope.defaultOldValue = "";
          }
        })

      }
    };
  }
]);
//2.字符类型
dataManageQuerydirective.directive('stringDataType', ['$compile', '$parse',
  function($compile, $parse) {
    // Runs during compile
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            //从服务器获取的值
            $scope.operator = $scope.data.configs['StringType'][0];
          });

        }],
      link: function(scope, elem, attrs) {
        var inited = false;
        //"102":[EMAIL 身份证 手机 不验证 ]
        scope.$watch('data.configs.StringSpecialValidator[0]', function(val, oldVal) {
          if (val == undefined) {
            return;
          }
          //增加限制条件
          addStrict(val);
        });
        //长度限制
        scope.$watch('data.configs.StringLengthLimit[0]', function(val, oldVal) {
          if (val == undefined) {
            return;
          }
          //增加限制条件
          addStrict(val);
        });
        //选择框改变
        scope.$watch('operator', function(val, oldVal) {
          //每次切换的时候清空
          if (oldVal != undefined && oldVal != val && scope.stringInput) {
            scope.stringInput = "";
          }
        });

        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {};
          value.value = scope.stringInput;
          value.operator = scope.operator;

          return value;
        };

        function addStrict(val) {
          var config = scope.data.configs;
          var el = elem.find('input');
          if (inited) {
            return;
          }
          //101长度限制
          if (config['StringLengthLimit'] && config['StringLengthLimit'][0]) {
            el.attr('maxLength', config['StringLengthLimit'][0]);
          }
          //102限制
          if (val == 'Mobile') {
            el.attr("phone", true);
            el.attr("number", true);
          }
          if (val == 'IdentityCard') {}
          if (val == 'Email') {
            el.attr("email", true);
          }
          // $compile(elem.find('input'))(scope);//删除谷歌会不容许输入字符
          inited = true;
        }

        //监听值的变化
        scope.$watch("stringInput", function(n, o) {
          scope.defaultOldValue = o;
        })
      }
    };
  }
]);
//3.字典类型
dataManageQuerydirective.directive('directoryDataType', ['$compile', '$parse',
  function($compile, $parse) {
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {});
        }],
      link: function(scope, elem, attrs) {
        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {};
          if (scope.directoryValue != undefined) {
            value.value = scope.directoryValue.id;
          } else {
            value.value = undefined;
          }
          value.operator = "";
          return value;
        };
        //监听值的变化
        scope.$watch("directoryValue.name",
            function(n, o) {
              scope.defaultOldValue = o;
            })
      }
    }
  }
]);
//4.日期类型
dataManageQuerydirective.directive('dateDataType', ['$compile', '$parse',
  function($compile, $parse) {
    // Runs during compile
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            //从服务器获取的值
            $scope.operator = $scope.data.configs['DateType'][0];
            $scope.operator = "介于";
            $scope.dateType = "absolutely";
            //相对时间,默认'日'
            $scope.isDay = 'true';
          })
        }],
      link: function(scope, elem, attrs) {

        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {};
          value.operator = scope.operator;
          if (scope.dateType == "absolutely") {
            value.type = "absolutely";
            if (scope.operator == "介于") {
              value.value = scope.dateInput1 + ',' + scope.dateInput2;
            } else {
              value.value = scope.dateInput1;
            }
          } else if (scope.dateType == "relatively") {
            value.type = "relatively";
            if (scope.operator == "介于") {
              if (scope.isDay == 'true') {
                value.interval = scope.dayOrMonthInput1 + ',' + scope.dayOrMonthInput2;
                value.dimension = '天';
              } else {
                value.interval = scope.dayOrMonthInput1 + ',' + scope.dayOrMonthInput2;
                value.dimension = '月';
                value.day = scope.dayInput1 + ',' + scope.dayInput2;
              }
            } else {
              if (scope.isDay == 'true') {
                value.interval = scope.dayOrMonthInput1;
                value.dimension = '天';
              } else {
                value.interval = scope.dayOrMonthInput1;
                value.dimension = '月';
                value.day = scope.dayInput1;
              }
            }
          }
          return value;
        };

        //绝对时间清除操作
        function clearDate1() {
          scope.dateInput1 = '';
          scope.dateInput2 = '';
        }

        //相对时间清除操作
        function clearDate2() {
          // scope.timeInput2 = '';
          // scope.timeInput1 = '';
          scope.dayInput1 = '';
          scope.dayInput2 = '';
          scope.dayOrMonthInput1 = '';
          scope.dayOrMonthInput2 = '';
        }

        //相对时间天or月选择
        function clearDate3() {
          // scope.timeInput1 = '';
          // scope.timeInput2 = '';
          scope.dayInput1 = '';
          scope.dayInput2 = '';
          // scope.dayOrMonthInput1
        }

        //监听值的变化
        scope.$watch("directoryValue.name", function(n, o) {
          scope.defaultOldValue = o;
        })
      }
    };
  }
]);
//关键字类型-TODO
dataManageQuerydirective.directive('keywordDataType', ['$compile', '$parse',
  function($compile, $parse) {
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            if ($scope.data.values) {
              $scope.fontLists = $scope.data.values.value ? $scope.data.values.value.split(",") : [];
              $scope.fontRelation = $scope.data.values.relation ? $scope.data.values.relation: "AND";
            } else {
              //从服务器获取的值
              $scope.fontLists = [];
              $scope.fontRelation = "AND";
            }
          });
        }],
      link: function(scope, elem, attrs) {
        //选择框改变
        scope.editorCondition = function() {
          scope.commPlugSrc = "view/node/tfilterfindView/commPlugView/selectorFonts.html?_=" + new Date().getTime();
        };
        //选择器弹框调用
        scope.openPlugPop = function() {
          if (scope.tfilterFindObj) { // 查询节点调取弹框
            elem.find(".commSelectPlug").addInteractivePop({
              magTitle: "请选择关键字",
              width: 520,
              mark: false,
              position: "fixed",
              childElePop: true
            });
          } else { // 客户分组
            elem.find(".commSelectPlug").addInteractivePop({
              magTitle: "请选择关键字",
              width: 520,
              mark: true,
              position: "fixed"
            });
          }
        }

        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {
            "relation": scope.fontRelation,
            "value": scope.fontLists.join(",")
          };
          return value;
        };
      }
    };
  }
]);
//自定义查询-TODO
dataManageQuerydirective.directive('customDataType', ['$compile', '$parse',
  function($compile, $parse) {
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            if ($scope.data.values) {
              $scope.queryCustomAttrLists = $scope.data.values.conditions ? $scope.data.values.conditions: [];
              $scope.queryCustomIndicatorLists = $scope.data.values.indexConfig ? $scope.data.values.indexConfig: [];
            }
          });
        }],
      link: function(scope, elem, attrs) {
        scope.editorCustomCondition = function(id, type, titleName) { //编辑已经配置好的数据
          scope.addCondition(Number(id), type, "", titleName, scope.index);
        };
        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {
            //"relation":scope.fontRelation,
            //"value":scope.fontLists.join(",")
          };
          return value;
        };
      }
    };
  }
]);
//地区选择-TODO
dataManageQuerydirective.directive('cityDataType', ['$compile', '$parse', "getListService",
  function($compile, $parse, getListService) {
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            //$scope.support = "province";	//是否支持市、区县
            if ($scope.data.values) {
              var cityIdsAry = ($scope.data.values && $scope.data.values.id) ? $scope.data.values.id.split("|") : [],
                  cityNamesAry = ($scope.data.values && $scope.data.values.value) ? $scope.data.values.value.split("|") : [],
                  cityStatusAry = ($scope.data.values && $scope.data.values.status) ? $scope.data.values.status.split("|") : [];
              $scope.cityLists = [];

              angular.forEach(cityIdsAry, function(val, key) {
                var singleAryCity = {
                  id: val || "",
                  name: cityNamesAry[key] || "",
                  status: cityStatusAry[key] || ""
                }
                $scope.cityLists.push(singleAryCity);
              });
            } else {
              $scope.cityLists = [];
            }
          });
        }],
      link: function(scope, elem, attrs) {
        //选择框改变
        scope.editorCondition = function() {
          scope.commPlugSrc = "view/node/tfilterfindView/commPlugView/citys.html?_=" + new Date().getTime();
        };
        //选择器弹框调用
        scope.openPlugPop = function() {
          if (scope.tfilterFindObj) { // 查询节点调取弹框
            elem.find(".commSelectPlug").addInteractivePop({
              magTitle: "地区选择",
              width: 820,
              mark: false,
              position: "fixed",
              childElePop: true
            });
          } else { // 客户分组
            elem.find(".commSelectPlug").addInteractivePop({
              magTitle: "地区选择",
              width: 820,
              mark: true,
              position: "fixed"
            });
          }
        }

        //城市选择器，确认父级获取数据method
        scope.getCitySelectedData = function(callBackData) {
          scope.cityLists = callBackData.operateValue.slice();
        }
        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var listAry = [],
              idAry = [],
              statusAry = [];
          angular.forEach(scope.cityLists, function(val, key) {
            listAry.push(val.name);
            idAry.push(val.id);
            statusAry.push(val.status);
          });
          var value = {
            value: listAry.join("|"),
            id: idAry.join("|"),
            status: statusAry.join("|")
          }
          return value;
        };
        scope.replace = function(str) {
          return str.replace(/,/g, "-");
        }
      }
    };
  }
]);
dataManageQuerydirective.directive('ngCitysChecked', ['$compile', '$parse',
  function($compile, $parse) {
    return function(scope, elem, attrs) {
      scope.$watch('operateValue', function(val, oldval) {
        var level = parseInt(attrs.ngCitysChecked);
        var id = scope.c.id;
        var data = scope.operateValue;
        elem.removeClass("checkbox_true_part checkbox_true_full");
        for (var i = 0; i < data.length; i++) {
          var ids = data[i].id.split(",");
          var currentId = parseInt(ids[level]);
          if (currentId && id == currentId) {
            var status = data[i].status.split(",")[level];
            if (status == "part") {
              elem.addClass("checkbox_true_part");
              elem.attr("status", "part");
            } else if (status == "full") {
              elem.addClass("checkbox_true_full");
              elem.attr("status", "full");
            }
            break;
          }
        }
      },
      true);
    }
  }
])
//标签选择-TODO
dataManageQuerydirective.directive('queryDataLabelType', ['$compile', '$parse', "getListService",
  function($compile, $parse, getListService) {
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            $scope.labelTemplateMark = "baseQueryLabel"; //标记label模板的功能的参数
            if ($scope.data.values) {
              $scope.queryLabelLists = $scope.data.values.value ? $scope.data.values.value: [];
            } else {
              //从服务器获取的值
              $scope.queryLabelLists = [];
            }
          });
        }],
      link: function(scope, elem, attrs) {
        //选择框改变
        scope.editorCondition = function() {
          scope.commPlugSrc = "view/node/tfilterfindView/commPlugView/label.html?_=" + new Date().getTime();
        };
        //选择器弹框调用
        scope.openPlugPop = function() {
          if (scope.tfilterFindObj) { // 查询节点调取弹框
            elem.find(".commSelectPlug").addInteractivePop({
              magTitle: "请选择关键字",
              width: 734,
              mark: false,
              position: "fixed",
              childElePop: true
            });
          } else { // 客户分组
            elem.find(".commSelectPlug").addInteractivePop({
              magTitle: "请选择关键字",
              width: 760,
              mark: true,
              position: "fixed"
            });
          }
        }

        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {
            "value": scope.queryLabelLists.slice()
          };
          return value;
        };
      }
    };
  }
]);

//生日选择
dataManageQuerydirective.directive('birthdayDataType', ['$compile', '$parse',
  function($compile, $parse) {
    // Runs during compilebirthdayDataType
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            var defaultVal;
            //打开节点，同时带有默认值
            if ($scope.data.values) {
              defaultVal = $scope.data.values;
              $scope.operator = defaultVal.operator;
              if ($scope.operator == '介于') {
                $scope.dateInput1 = defaultVal.value.split(',')[0];
                $scope.dateInput2 = defaultVal.value.split(',')[1];
              } else {
                $scope.dateInput1 = defaultVal.value;
              }
            } else {
              //从服务器获取的值
              $scope.operator = $scope.data.configs['DatetimeType'][0];
            }
          });
        }],
      link: function(scope, elem, attrs) {
        //选择框改变
        scope.$watch('operator', function(val, oldVal) {
          //每次切换的时候清空
          if (oldVal != undefined && oldVal != val) {
            clearDate1();
          }
          if (val == "介于") {
            scope.isMid = true;
          } else {
            scope.isMid = false;
          }
        });

        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {};
          value.operator = scope.operator;
          if (scope.operator == "介于") {
            value.value = scope.dateInput1 + ',' + scope.dateInput2;
          } else {
            value.value = scope.dateInput1;
          }
          return value;
        };

        //绝对时间清除操作
        function clearDate1() {
          scope.dateInput1 = '';
          scope.dateInput2 = '';
        }
      }
    };
  }
]);
//5.时间类型
dataManageQuerydirective.directive('timeDataType', ['$compile', '$parse',
  function($compile, $parse) {
    // Runs during compile
    return {
      controller: ["$scope",
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            var defaultVal;
            //打开节点，同时带有默认值
            if ($scope.data.values) {
              defaultVal = $scope.data.values;
              $scope.operator = defaultVal.operator;
              $scope.stringInput = defaultVal.value || "";
              $scope.dateType = defaultVal.type || "absolutely";
              //TODO:
              //$scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == 'Support' ? false : true;
              if ($scope.dateType == "absolutely") {
                if ($scope.operator == "介于") {
                  $scope.dateInput1 = defaultVal.value.split(',')[0];
                  $scope.dateInput2 = defaultVal.value.split(',')[1];
                } else {
                  $scope.dateInput1 = defaultVal.value;
                }
              } else if ($scope.dateType == "relatively") {
                var value = defaultVal;
                switch (value.dimension) {
                  case '月':
                    $scope.subType = '0';
                    break;
                  case '天':
                    $scope.subType = '1';
                    break;
                  case '分钟':
                    $scope.subType = '2';
                    break;
                }
                if ($scope.operator == "介于") {
                  $scope.monthOrDayOrSecondInput1 = value.interval.split(',')[0];
                  $scope.monthOrDayOrSecondInput2 = value.interval.split(',')[1];
                  if ($scope.subType == '0') {
                    $scope.dayInput1 = value.day.split(',')[0];
                    $scope.dayInput2 = value.day.split(',')[1];
                    $scope.timeInput1 = value.time.split(',')[0];
                    $scope.timeInput2 = value.time.split(',')[1];
                  } else if ($scope.subType == '1') {
                    $scope.timeInput1 = value.time.split(',')[0];
                    $scope.timeInput2 = value.time.split(',')[1];
                  } else if ($scope.subType == '2') {

                  }
                } else {
                  $scope.monthOrDayOrSecondInput1 = value.interval;
                  if ($scope.subType == '0') {
                    $scope.dayInput1 = value.day;
                    $scope.timeInput1 = value.time;
                  } else if ($scope.subType == '1') {
                    $scope.timeInput1 = value.time;
                  } else if ($scope.subType == '2') {

                  }
                }
              }
            } else {
              //从服务器获取的值
              $scope.operator = $scope.data.configs['DatetimeType'][0];
              $scope.dateType = "absolutely";
              //相对时间,默认'日'
              $scope.subType = '0';
              //是否可以点击"相对时间""
              $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == "Support" ? false: true;
            }
          });
        }],
      link: function(scope, elem, attrs) {
        //选择框改变
        scope.$watch('operator', function(val, oldVal) {
          //每次切换的时候清空
          if (oldVal != undefined && oldVal != val) {
            if (scope.dateType == "absolutely") {
              clearDate1();
            } else {
              clearDate2();
            }
          }
          if (val == "介于") {
            scope.isMid = true;
          } else {
            scope.isMid = false;
          }
        });
        //绝对时间or相对时间
        scope.$watch('dateType', function(val, oldVal) {
          if (oldVal != undefined && oldVal != val) {
            if (val == "absolutely") {
              scope.operator = scope.data.configs['DatetimeType'][0];
              scope.subType = '0';
              clearDate1();
            } else if (val == "relatively") {
              scope.subType = '0';
              scope.operator = scope.data.configs['DatetimeType'][0];
              clearDate2();
            }
          }
        });
        //月,天,秒切换
        scope.$watch('subType', function(val, oldVal) {
          if (oldVal != undefined && oldVal != val) {
            clearDate2();
            switch (val) {
              //设置输入框最大整数
              case '0':
                scope.numcount = "";
                break;
              case '1':
                break;
              case '2':
                scope.numcount = "";
                break;
            }
          }
        });

        //获取保存到服务器的values
        scope.getSubmitValue = function() {
          var value = {};
          value.operator = scope.operator;
          if (scope.dateType == "absolutely") {
            value.type = "absolutely";
            if (scope.operator == "介于") {
              value.value = scope.dateInput1 + ',' + scope.dateInput2;
            } else {
              value.value = scope.dateInput1;
            }
          } else if (scope.dateType == "relatively") {
            value.type = "relatively";
            if (scope.operator == "介于") {
              value.interval = scope.monthOrDayOrSecondInput1 + ',' + scope.monthOrDayOrSecondInput2;
              if (scope.subType == '0') {
                value.dimension = '月';
                value.day = scope.dayInput1 + ',' + scope.dayInput2;
                value.time = scope.timeInput1 + ',' + scope.timeInput2;
              } else if (scope.subType == '1') {
                value.dimension = '天';
                value.time = scope.timeInput1 + ',' + scope.timeInput2;
              } else if (scope.subType == '2') {
                value.dimension = '分钟';
              }
            } else {
              value.interval = scope.monthOrDayOrSecondInput1;
              if (scope.subType == '0') {
                value.dimension = '月';
                value.day = scope.dayInput1;
                value.time = scope.timeInput1;
              } else if (scope.subType == '1') {
                value.dimension = '天';
                value.time = scope.timeInput1;
              } else if (scope.subType == '2') {
                value.dimension = '分钟';
              }
            }
          }
          return value;
        };

        //绝对时间清除操作
        function clearDate1() {
          scope.dateInput1 = '';
          scope.dateInput2 = '';
        }

        //相对时间清除操作
        function clearDate2() {
          scope.timeInput1 = '';
          scope.timeInput2 = '';
          scope.dayInput1 = '';
          scope.dayInput2 = '';
          scope.monthOrDayOrSecondInput1 = '';
          scope.monthOrDayOrSecondInput2 = '';
        }

        //相对时间天or月选择
        function clearDate3() {
          scope.timeInput1 = '';
          scope.timeInput2 = '';
          scope.dayInput1 = '';
          scope.dayInput2 = '';
          // scope.dayOrMonthInput1
        }
      }
    };
  }
]);
//限制条件input的输入
//formatCondition为不满足条件的正则, 对于保留字用\转义
//[^\\d] 只能输入数字
//[]
dataManageQuerydirective.directive('formatLimit', ['$parse',
  function($parse) {
    return function(scope, elem, attrs) {
      var reg = new RegExp(attrs.formatLimit);
      // var scopeVal = scope.$eval(attrs.model);
      scope.$watch(attrs.ngModel, function(val, oldVal) {
        if (val == undefined) {
          return;
        }
        //如果存在不满足的条件
        if (reg.test(val)) {
          $parse(attrs.ngModel).assign(scope, val.replace(reg, ''));
        }
      });
    };
  }
]);
//输入201(输入类型) 浮点数 整数 百分数
dataManageQuerydirective.directive('numDataType', ['$parse',
  function($parse) {
    return {
      priority: 1000,
      link: linkFn
    };
    function linkFn(scope, elem, attrs) {
      var INTREG = /[^\d]/g;
      var FLOATREG = /[^\d|.]/g;
      var DDOTREG = /\./g;
      //输入限制，不能输入数字和'.'
      elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(evt) {
        var val = evt.target.value,
        curAttrValue = angular.element(evt.target).attr("num-data-type");
        var valed;

        if (!val) {
          return;
        }
        valed = getVerifiedVal(val, curAttrValue);
        if (valed != val) {
          evt.target.value = valed;
          $parse(attrs.ngModel).assign(scope, valed);
        }
      });
      function getVerifiedVal(val, curAttrValue) {
        switch (curAttrValue) {
          case "整数":
            return verifyInt(val);
            break;
          case '浮点数':
            return verifyFloat(val);
            break;
          case '百分数':
            return verifyFloat(val);
            break;
        }
      }

      //限制整形输入
      function verifyInt(val) {
        //整数首字母不为0
        var zeroReg = /^0(\d+)/g
        if (zeroReg.test(val)) {
          val = val.replace(zeroReg, "$1");
          //火狐浏览器bug
          zeroReg.lastIndex = 0;
        }
        //去掉非字母
        if (INTREG.test(val)) {
          //火狐浏览器bug
          INTREG.lastIndex = 0;
          val = val.replace(INTREG, '');
        }
        return val;
      }

      //限制浮点数输入
      function verifyFloat(val) {
        //不允许0开头，后面不紧接'.'
        var zeroReg = /^0(?!\.)/;
        if (FLOATREG.test(val)) {
          val = val.replace(FLOATREG, '');
        }
        //数字开头
        if (!/^\d/.test(val)) {
          val = '';
        }
        //如果0开头，后面不为.
        if (val.length > 1 && zeroReg.test(val)) {
          val = val.replace(/^0+([1-9])?/, function(a, b, c) {
            return b ? b: 0;
          });
        }
        //如果包含多个.取第一个，删除后来的
        var dotsVal = val.match(DDOTREG);
        if (dotsVal && dotsVal[1]) {
          var arrVals = val.split('.');
          val = arrVals[0] + '.' + arrVals.slice(1).join('');
        }
        return val;
      }
    }
  }
]);
// 小数点精度设置
dataManageQuerydirective.directive('numDataPrecision', ['$parse',
  function($parse) {
    return {
      priority: 13,
      link: linkFn
    };

    function linkFn(scope, elem, attrs) {
      var LEN = attrs.numPrecision - 0;
      var REG = /\./;
      //用于ie8 "propertychange"事件的bug
      var _lastVal;
      scope.$watch(attrs.ngModel, function(val, oldVal) {
        if (val == undefined) {
          return;
        }
        // verifyPrecision(val);
      });
      //限制输入超过精度的小数
      elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(evt) {
        var val = evt.target.value;
        if (!val || _lastVal == val) {
          return;
        }
        LEN = angular.element(evt.target).attr("num-data-precision") * 1 - 0;
        val = limitPrecision(val);
        _lastVal = val;
        evt.target.value = val;
        $parse(attrs.ngModel).assign(scope, val);
        return true;
      });
      //添加末尾的0
      elem.off('blur');
      elem.on('blur', function(evt) {
        var val = evt.target.value;
        if (!val) {
          return;
        }
        var val = verifyPrecision(val);
        evt.target.value = val;
        $parse(attrs.ngModel).assign(scope, val);
      });
      //限制输入时的的小数位数超过输入
      function limitPrecision(val) {
        var arrVals = val.split('.');
        if (LEN == 0) {
          val = arrVals[0]
        } else if (arrVals[1] && arrVals[1].length > LEN) {
          val = arrVals[0] + '.' + arrVals[1].substring(0, LEN);
        }
        return val;
      }

      //拼接0
      function verifyPrecision(val) {
        if (~val.indexOf('.')) {
          var valArrs = val.split('.');
          if (val.split('.').length == 2) {
            var len = LEN - valArrs[1].length
            var i = 0;
            if (len > 0) {
              while (i < len) {
                valArrs[1] = valArrs[1] + '' + '0';
                i++;
              }
            } else {
              //如果小数位数过多，截断
              valArrs[1] = valArrs[1].substring(0, LEN);
            }
          }
          val = valArrs[0] + '.' + valArrs[1];
        } else {
          var i = 0;
          if (LEN == 0) {
            val = val;
          } else {
            val = val + '.';
          }
          while (i < LEN) {
            val += '0';
            i++;
          }
        }
        return val;
      }
    }
  }
]);
//数值输入介于验证,禁止输入超过范围的值
dataManageQuerydirective.directive('numDataBetween', ['$parse',
  function($parse) {
    return {
      priority: 10,
      link: linkFn
    };
    //
    function linkFn(scope, elem, attrs) {
      var MIX = attrs.numDataBetween.split(',').sort()[0] - 0,
          MAX = attrs.numDataBetween.split(',').sort()[1] - 0;
      elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
        var val = event.target.value;
        if (!val) {
          $parse(attrs.ngModel).assign(scope, MIX);
          event.target.value = MIX;
        }

        if (val < MIX || val > MAX) {
          val = MAX;
          $parse(attrs.ngModel).assign(scope, val);
          event.target.value = val;
        }
      });
    };
  }
]);
//相对时间月份输入，只能输入最大12的整数
dataManageQuerydirective.directive('monthDataInput', ['$parse',
  function($parse) {
    return linkFn;
    //
    function linkFn(scope, elem, attrs) {
      elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
        if (! (scope.dateType == "相对时间" && scope.isDay == 'false')) {
          return;
        }
        var val = event.target.value;
        if (!val) {
          return;
        }

        if (val > 12) {
          val = val.substring(0, val.length - 1);
          $parse(attrs.ngModel).assign(scope, val);
          event.target.value = val;
        }
      });
    };
  }
]);
//月天分最大正整数限制
dataManageQuerydirective.directive('max-data-integer', ['$parse',
  function($parse) {
    return linkFn;
    //
    function linkFn(scope, elem, attrs) {
      var INTREG = /[^\d]/g;
      var MAX = attrs.maxIntege;
      //改变最大长度
      attrs.$observe('maxInteger', function(val, oldVal) {
        MAX = val - 0;
      });
      elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange": 'input', function(event) {
        var val = event.target.value;
        if (!val) {
          return;
        }
        var zeroReg = /^0(\d+)/g
        if (zeroReg.test(val)) {
          val = val.replace(zeroReg, "$1");
          zeroReg.lastIndex = 0;
          event.target.value = val;
        }
        //去掉非字母
        if (INTREG.test(val)) {
          val = val.replace(INTREG, '');
          INTREG.lastIndex = 0;
          event.target.value = val;
        }
        if (MAX > 0 && val > MAX) {
          val = MAX;
          event.target.value = val;
        }
        $parse(attrs.ngModel).assign(scope, val);
      });
    };
  }
]);
//日期选择器
dataManageQuerydirective.directive('ngDataDatePicker', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      var minDate = new Date();
      minDate.setHours(minDate.getHours());
      minDate.setMinutes(minDate.getMinutes());
      minDate.setSeconds(0);
      element.datetimepicker({
        inline: true,
        timeFormat: 'HH:mm',
        showSecond: false,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        //日期简写名称
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //月份简写名称
        minDate: minDate,
        onSelect: function(dateText) {
          var modelPath = $(this).attr('ng-model');
          putObject(modelPath, scope, dateText);
          scope.$apply();
        }
      });
    }
  }
]);
