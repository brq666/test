//查询节点右边的查询条件的directive
(function(window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  /* 属性查询指令 start */
  app.directive('attrQueryConditions', ['$compile', '$q', '$templateCache', function($compile, $q, $templateCache) {
    return {
      controller: ['$http', '$scope', '$q', function($http, $scope, $q) {

        /*模版载入start*/
        angular.forEach(attrQueryTemplates, function(val, key) {
          $templateCache.put(val.type, val.template);
        });
        /*模板加载 end*/
        //暂存所有scope,设置从1开始，和index对应
        var stroeGroupCons = [''],
          //条件span数量,index
          conCount = 0,
          groupCount = 0;
        //保存每个新加入的组的条件
        this.addGroup = function(name) {
          var newScope = $scope.$new();
          //左上角的index
          groupCount++;
          newScope.index = groupCount;
          newScope.name = name;
          newScope.child = [''];
          newScope.isLoaded = true;
          stroeGroupCons.push(newScope);
          return newScope;
        }
        //保存每个新加入的查询条件
        this.addCondition = function(data, groupData) {
          var newScope = $scope.$new();
          //左上角的index
          conCount++;
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
          return newScope;
        };
        //保存条件到组
        this.addConditionToGroup = function(scopeCon, groupIndex) {
          scopeCon.groupIndex = groupIndex;
          scopeCon.groupPosition = stroeGroupCons[groupIndex].child.length;
          if (groupIndex > 1) { // 取本组最大或上组最大
            if (stroeGroupCons[groupIndex].child.length > 1) {  // 取本组最大
              scopeCon.index = stroeGroupCons[groupIndex].child[stroeGroupCons[groupIndex].child.length - 1].index + 1;
            } else { // 取上组最大
              scopeCon.index = stroeGroupCons[groupIndex - 1].child[stroeGroupCons[groupIndex - 1].child.length - 1].index + 1;
            }
          } else {
            if (stroeGroupCons[groupIndex].child.length > 1) {
              scopeCon.index = stroeGroupCons[groupIndex].child[stroeGroupCons[groupIndex].child.length - 1].index + 1;
            } else {
              scopeCon.index = 1;
            }
          }
          for (var i = groupIndex + 1; i < stroeGroupCons.length; i++) {
            for (var j = 1; j < stroeGroupCons[i].child.length; j++) {
              stroeGroupCons[i].child[j].index = stroeGroupCons[i].child[j].index + 1;
            }
          }
          stroeGroupCons[groupIndex].child.push(scopeCon);
          return stroeGroupCons[groupIndex];
        }
        //删除组
        this.removeGroup = function(groupIndex) {
          var delGroupLen = stroeGroupCons[groupIndex].child.length - 1;
          groupCount--;
          conCount = conCount - delGroupLen;
          for (var i = groupIndex + 1; i < stroeGroupCons.length; i++) {
            stroeGroupCons[i].index = stroeGroupCons[i].index - 1;
            for (var j = 1; j < stroeGroupCons[i].child.length; j++) {
              stroeGroupCons[i].child[j].index = stroeGroupCons[i].child[j].index - delGroupLen;
              stroeGroupCons[i].child[j].groupIndex = stroeGroupCons[i].child[j].groupIndex - 1;
            }
          }
          var scope = stroeGroupCons.splice(groupIndex, 1)[0];
          scope.$destroy();
        }
        //删除组中单个条件
        this.removeCondition = function(groupPosition, groupIndex) {
          conCount--;
          for (var i = groupIndex; i < stroeGroupCons.length; i++) {
            if (i == groupIndex) {
              for (var j = groupPosition + 1; j < stroeGroupCons[i].child.length; j++) {
                stroeGroupCons[i].child[j].index = stroeGroupCons[i].child[j].index - 1;
                stroeGroupCons[i].child[j].groupPosition = stroeGroupCons[i].child[j].groupPosition - 1;
              }
            } else {
              for (var k = 1; k < stroeGroupCons[i].child.length; k++) {
                stroeGroupCons[i].child[k].index = stroeGroupCons[i].child[k].index - 1;
              }
            }
          }
          var scope = stroeGroupCons[groupIndex].child.splice(groupPosition, 1)[0];
          scope.$destroy();
        };
        //得到组索引
        this.getGroupByName = function(name) {
          for (var i = 1; i < stroeGroupCons.length; i++) {
            if (stroeGroupCons[i].name === name) {
              return stroeGroupCons[i];
            }
          }
          return false;
        }
        //删除所有条件
        this.removeAllConditions = function() {
          for (var i = 1; i < stroeGroupCons.length; i++) {
            for (var j = 1; j < stroeGroupCons[i].child.length; j++) {
              stroeGroupCons[i].child[j].$destroy();
            }
          }
          stroeGroupCons = [''];
          conCount = 0;
          groupCount = 0;
        }

        //获取所有条件的
        this.getAllConditions = function() {
          var conditions = [];
          angular.forEach(stroeGroupCons, function(storeGroup, key) {
            if (key == 0) {
              return;
            }
            angular.forEach(storeGroup.child, function(storeScope, key) {
              if (key == 0) {
                return;
              }
              var condition = {};
              condition.values = {};

              var config = storeScope.data;
              condition.id = storeScope.data.id ? storeScope.data.id : "";
              condition.queryItemId = storeScope.queryItemId || storeScope.data.queryItemId;
              //string转为intege
              condition.queryItemId -= 0;
              condition.type = config.type;
              // condition.valueShow = config.valueShow;
              condition.values = storeScope.getSubmitValue();
              condition.groupConditions = storeScope.groupData
              conditions.push(condition);
            });
          });
          return conditions;
        };
        //得到查询条件个数
        this.getConditionCount = function() {
          return conCount;
        };
      }],
      link: function(scope, elem, attrs, ctrl) {
        //暂存compile后的节点,提高效率,一次compile,多次link
        var compiledDires = {};
        var groupDire;
        //增加一个筛选条件
        scope.addCondition = function(id, type, groupData, defaultName, curEditorCustomIndex, isNotScroll) {
          /* defaultName 包括的组名和属性名称 比如 基本属性-姓名*/
          var compileDire;
          groupDire = groupDire || $compile($($templateCache.get('group')));
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
          window.ccmsQueryCustomTitle = defaultName || id.name; // 自定义行为弹框的title名称
          if (type == "行为自定义" && typeof id == 'number') {//拖拽，而非展示已经保存的
            scope.customerTemplateLoadingFlag = true;
            scope.commCustomTemplate = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/customCondition/customTemplate.html?_=" + new Date().getTime()
            scope.customDragCurId = id;//标记当前拖拽自定义Id
            scope.customDragCurName = window.ccmsQueryCustomTitle;
            if (curEditorCustomIndex) {
              scope.editorCustomFalg = true;
              scope.curEditorCustomIndex = curEditorCustomIndex;//当前编辑的index
            } else {
              scope.editorCustomFalg = false;
              scope.applyGroupData = groupData; // 传给打开自定义行为分组数据。
              scope.$apply();
            }
            return;
          }
          ;
          /*行为自定义类型 订单查询 end*/
          var newScope = ctrl.addCondition(id, groupData);
          var groupNameAndCon = defaultName.split('-');
          newScope.defaultName = groupNameAndCon.pop();  // 属性名,最后一个字段
          var groupName = groupNameAndCon.join('-');
          var groupScope = ctrl.getGroupByName(groupName);
          var hasGroup = groupScope;
          if (!groupScope) {
            groupScope = ctrl.addGroup(groupName);
          }
          ctrl.addConditionToGroup(newScope, groupScope.index);
          linkFun();
          //链接函数
          function linkFun() {
            if (hasGroup) {
              compileDire['link'](newScope, function(cloneNode) {
                hasGroup.elem.append(cloneNode);
                //滚动条最下移
                isNotScroll || cloneNode[0].scrollIntoView(true);
              });
            } else {
              groupDire(groupScope, function(cloneNode) {
                elem.append(cloneNode);
                var groupElem = cloneNode.find('.attr_wrap_query_node_content');
                groupScope.elem = groupElem;
                compileDire['link'](newScope, function(cloneNode) {
                  groupElem.append(cloneNode);
                  //滚动条最下移
                  isNotScroll || cloneNode[0].scrollIntoView(true);
                });
              });
            }
          }
        };
        //保存后再打开节点获取的所有的条件, 滚动不滚动到底部
        scope.addAllConditions = function(data) {//默认的值在data里面，可自行打印查看
          // console.log(data)
          angular.forEach(data, function(value, key) {
            var returnDefaultName = disponseQueryName(value.conditionOps);//处理回显名称
            var defaultConfig = value.conditionOps;//获取配置的数据
            scope.addCondition(defaultConfig, defaultConfig.type, "", returnDefaultName, undefined, true);
          });
        };

        //处理回显条件 有分组的的名称展示
        function disponseQueryName(conditionOps) {
          var storeConditionsNameAry = [], defalultReturnName = "";
          storeConditionsNameAry.push(conditionOps.valueShow);
          if (conditionOps.groupConditions) {
            for (var i = 1; i <= conditionOps.groupConditions.length; i++) {
              angular.forEach(conditionOps.groupConditions, function(val, key) {
                if (val.orderId == i && val.valueShow && val.attributeId) {
                  storeConditionsNameAry.push(val.valueShow);
                }
              });
            }
            ;
            storeConditionsNameAry.push(conditionOps.name);
            defalultReturnName = storeConditionsNameAry.join("-");
          }
          return defalultReturnName
        }

        //删除所有条件
        scope.removeAllConditions = function() {
          $('.attr_wrap_query_node_condition').remove();
          ctrl.removeAllConditions();
        }
        //删除一个组
        scope.removeGroup = function(index) {
          ctrl.removeGroup(index);
        }
        //删除一个筛选条件
        scope.removeCondition = function(groupPosition, groupIndex) {
          ctrl.removeCondition(groupPosition, groupIndex);
        };
        //保存所有条件
        scope.getAllConditions = function() {
          return ctrl.getAllConditions();
        };
        //得到查询条件数量
        scope.getConditionCount = function() {
          return ctrl.getConditionCount();
        }
      }
    }
  }]);
  //每个筛选条件的公用方法
  app.directive('attrQueryCondition', ['$compile',
    function() {
      return {
        name: 'attrQueryCondition',
        priority: 1,
        controller: ['$http', '$scope', '$q', function($http, $scope, $q) {

          var defer = $q.defer();
          var id;
          $scope.asyncDefaultData = defer.promise;
          //如果数据打开的时候就有了
          if ($scope.isLoaded) {
            defer.resolve();
            return true;
          }
          //新拖出来的条件
          var newConditionUrl = 'node/attr/query/attribute/';
          $http.get(GLOBAL_STATIC.nodeRoot + newConditionUrl + $scope.queryItemId + '/?_=' + new Date().getTime()).success(function(req) {
            delete req.id;
            $scope.data = req;
            defer.resolve();
          }).error(function(req) {
            $scope.data = '';
          });

        }],
        require: '^attrQueryConditions',
        link: function(scope, elem, attrs, ctrls) {
          // 删除组
          scope.queryGroupClose = function(index) {
            $(this).Confirm({
              "title": "确认删除",
              "str": "是否确认删除该组条件？",
              "mark": true,
              "eleZindex": 1010,
              "markZindex": 1005
            }, function() {
              scope.$apply(function() {
                elem.remove();
                scope.removeGroup(index);
                /*var rts03 = [];
                 var rts = elem.find('.conditionsSelectedTitle').attr('title').split('-');
                 var rts01 = rts[0];
                 var rts02 = rts[1] || rts01;
                 var rts04 = rts[2] || '';
                 elem.find('.attr_query_node_name').each(function(index,element){
                 rts03.push( $(this).attr('title') )
                 })
                 for (var i = 0; i < rts03.length; i++) {
                 $('.attr_box').each(function(index,element){
                 if( $(this).find('.label').html() == rts01 ){
                 if( $(this).find('.selectInput0').find('input').val() ){
                 if( $(this).find('.selectInput0').find('input').val() == rts02){
                 if( $(this).find('.selectInput1').find('input').val() ){
                 if( $(this).find('.selectInput1').find('input').val() == rts04 ){
                 $(this).find('.attr_items li').each(function(ind,elm){
                 if( $(this).html() == rts03[i] ){
                 $(this).removeClass('selected')
                 }
                 })
                 }
                 }else{
                 $(this).find('.attr_items li').each(function(ind,elm){
                 if( $(this).html() == rts03[i] ){
                 $(this).removeClass('selected')
                 }
                 })
                 }
                 }
                 }else{
                 if(rts01 == '基本信息'){
                 $(this).find('.attr_items li').each(function(ind,elm){
                 if( $(this).html() == rts03[i] ){
                 $(this).removeClass('selected')
                 }
                 })
                 }
                 if(rts01 == '自定义属性'){
                 $(this).find('.attr_items li').each(function(ind,elm){
                 if( $(this).html() == rts03[i] ){
                 $(this).removeClass('selected')
                 }
                 })
                 }
                 }
                 }
                 })
                 }*/
              });
            });
          }
          // 删除条件
          scope.queryConditionClose = function(groupPosition, groupIndex) {
            /*var str = elem.closest('.attr_wrap_query_node_content').siblings('.attr_wrap_query_node_title').find('.conditionsSelectedTitle').attr('title').split('-');
             var str01 = str[0];
             var str02 = str[1] || str01;
             var str04 = str[2] || '';
             var str03 = elem.find('.attr_query_node_name').attr('title');
             $('.attr_box').each(function(index,element){
             if( $(this).find('.label').html() == str01 ){
             if( $(this).find('.selectInput0').find('input').val() ){
             if( $(this).find('.selectInput0').find('input').val() == str02){
             if( $(this).find('.selectInput1').find('input').val() ){
             if( $(this).find('.selectInput1').find('input').val() == str04 ){
             $(this).find('.attr_items li').each(function(ind,elm){
             if( $(this).html() == str03 ){
             $(this).removeClass('selected')
             }
             })
             }
             }else{
             $(this).find('.attr_items li').each(function(ind,elm){
             if( $(this).html() == str03 ){
             $(this).removeClass('selected')
             }
             })
             }
             }
             }else{
             if(str01 == '基本信息'){
             $(this).find('.attr_items li').each(function(ind,elm){
             if( $(this).html() == str03 ){
             $(this).removeClass('selected')
             }
             })
             }
             if(str01 == '自定义属性'){
             $(this).find('.attr_items li').each(function(ind,elm){
             if( $(this).html() == str03 ){
             $(this).removeClass('selected')
             }
             })
             }
             }
             }
             })*/
            // 如果只有组里只有一个子元素,同时删除该组
            if (elem.siblings().length === 0) {
              elem.parents('.attr_wrap_query_node_condition').remove();
              scope.removeGroup(groupIndex);
            } else {
              elem.remove();
              scope.removeCondition(groupPosition, groupIndex);
            }
          }
        }
      };
    }
  ]);
  /* 属性查询指令 end */
  app.directive('queryConditions', ['$compile', '$q', '$templateCache',
    function($compile, $q, $templateCache) {
      return {
        controller: ['$http', '$scope', '$q',
          function($http, $scope, $q) {
            /*模版载入start*/
            angular.forEach(queryTemplates,
              function(val, key) {
                $templateCache.put(val.type, val.template);
              });
            /*模板加载 end*/

            //暂存所有scope,设置从1开始，和index对应
            var storeCons = [''],
              //条件span数量,index
              count = 0;
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
              count--;
              for (var i = index + 1; i < storeCons.length; i++) {
                storeCons[i].index = storeCons[i].index - 1;
              }
              var scope = storeCons.splice(index, 1)[0];
              scope.$destroy();
            };
            //获取所有条件的
            this.getAllConditions = function() {
              var conditions = [];
              angular.forEach(storeCons, function(storeScope, key) {
                if (key == 0) {
                  return;
                }
                var condition = {};
                condition.values = {};

                var config = storeScope.data;
                condition.id = storeScope.data.id ? storeScope.data.id : "";
                condition.queryItemId = storeScope.queryItemId || storeScope.data.queryItemId;
                //string转为intege
                condition.queryItemId -= 0;
                condition.type = config.type;
                condition.values = storeScope.getSubmitValue();
                condition.groupConditions = storeScope.groupData;
                conditions.push(condition);
              });
              return conditions;
            }
          }],
        link: function(scope, elem, attrs, ctrl) {
          //暂存compile后的节点,提高效率,一次compile,多次link
          var compiledDires = {};
          //增加一个筛选条件
          scope.addCondition = function(id, type, groupData, defaultName, curEditorCustomIndex) { // defaultName营销历史赋值名称 groupData——获取传给后台、无实际业务意义,  curEditorCustomIndex判断是否为自定义属性编辑
            if (scope.$parent.tfilterFindObj) {
              scope.$parent.tfilterFindObj.isnotCondition = false; // 无条件错误提示隐藏
            } else {
              scope.$parent.creatGroupObj.isnotCondition = false; // 无条件错误提示隐藏
            }
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
            window.ccmsQueryCustomTitle = defaultName || id.name; // 自定义行为弹框的title名称
            if (type == "行为自定义" && typeof id == 'number') { //拖拽，而非展示已经保存的
              scope.customerTemplateLoadingFlag = true;
              scope.commCustomTemplate = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/customCondition/customTemplate.html?_=" + new Date().getTime();
              scope.customDragCurId = id; //标记当前拖拽自定义Id
              scope.customDragCurName = window.ccmsQueryCustomTitle;
              if (curEditorCustomIndex) {
                scope.editorCustomFalg = true;
                scope.curEditorCustomIndex = curEditorCustomIndex; //当前编辑的index
              } else {
                scope.editorCustomFalg = false;
                scope.applyGroupData = groupData; // 传给打开自定义行为分组数据。
                scope.$apply();
              }
              return;
            }
            ;
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
            ;
            //链接函数
            function linkFun() {
              compileDire['link'](newScope, function(cloneNode) {
                elem.append(cloneNode);
                //滚动条最下移
                cloneNode[0].scrollIntoView();
              });
            }
          };
          //保存后再打开节点获取的所有的条件
          scope.addAllConditions = function(data) { //默认的值在data里面，可自行打印查看
            //console.log(data);
            angular.forEach(data, function(value, key) {
              var returnDefaultName = disponseQueryName(value.conditionOps.groupConditions, value.conditionOps.name); //处理回显名称
              var defaultConfig = value.conditionOps; //获取配置的数据
              scope.addCondition(defaultConfig, defaultConfig.type, "", returnDefaultName);
            });
          };

          //处理回显条件 有分组的的名称展示
          function disponseQueryName(queryConditions, innerName) {
            var storeConditionsNameAry = [],
              defalultReturnName = "";
            if (queryConditions) {
              for (var i = 1; i <= queryConditions.length; i++) {
                angular.forEach(queryConditions, function(val, key) {
                  if (val.orderId == i && val.valueShow) {
                    storeConditionsNameAry.push(val.valueShow);
                  }
                });
              }
              ;
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
        }
      }
    }
  ]);
  //每个筛选条件的公用方法
  app.directive('queryCondition', ['$compile',
    function() {
      return {
        name: 'queryCondition',
        priority: 1,
        controller: ['$http', '$scope', '$q',
          function($http, $scope, $q) {
            var defer = $q.defer();
            var id;
            $scope.asyncDefaultData = defer.promise;
            //如果数据打开的时候就有了
            if ($scope.isLoaded) {
              defer.resolve();
              return true;
            }
            ;

            //新拖出来的条件
            var newConditionUrl;
            if ($scope.markInitType == "未参加" || $scope.markInitType == "参加次数" || $scope.markInitType == "最后参加时间" || $scope.markInitType == "活动成功") { //营销历史，请求数据地址不同
              newConditionUrl = 'node/query/campaign/attribute/';
            } else {
              newConditionUrl = 'node/query/attribute/';
            }
            ;

            $http.get(GLOBAL_STATIC.nodeRoot + newConditionUrl + $scope.queryItemId + '/?_=' + new Date().getTime()).success(function(req) {
              delete req.id;
              $scope.data = req;
              defer.resolve();
            }).error(function(req) {
              $scope.data = '';
            });
          }],
        require: '^queryConditions',
        link: function(scope, elem, attrs, ctrls) {
          scope.queryConditionClose = function(index) {
            elem.remove();
            //移除元素，移除作用域
            scope.removeCondition(index);
          }
        }
      };
    }
  ]);
  //1.数字类型
  app.directive('numberType', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              if ($scope.data.configs.NumberInputRange[0] > $scope.data.configs.NumberInputRange[1]) {
                var temp = $scope.data.configs.NumberInputRange[0];
                $scope.data.configs.NumberInputRange[0] = $scope.data.configs.NumberInputRange[1];
                $scope.data.configs.NumberInputRange[1] = temp
              }
              //打开节点，同时带有默认值
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.numInput1 = defaultVal.value.split(',')[0] || defaultVal.value;
                $scope.numInput2 = defaultVal.value.split(',')[1] || "";

                if ($scope.operator === '介于') {
                  // 大小转换
                  if (parseFloat($scope.numInput1) > parseFloat($scope.numInput2)) {
                    var temp = $scope.numInput2;
                    $scope.numInput2 = $scope.numInput1;
                    $scope.numInput1 = temp;
                  }
                }
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['NumberType'][0];
              }
            });
          }],
        link: function(scope, elem, attrs) {
          var inited = false;
          //选择框改变
          scope.$watch('operator', function(val, oldVal) {
            if (val == undefined) {
              return;
            }
            if (oldVal != undefined && oldVal != val && scope.numInput1) {
              scope.numInput1 = "";
              scope.numInput2 = "";
            }
            addStrict(scope.data.configs);
            if (val == "介于") {
              scope.isMid = true;
            } else {
              scope.isMid = false;
            }
          });

          //获取保存到服务器的values
          scope.getSubmitValue = function() {
            var value = {};
            var numInput = '';
            if (scope.data.configs['NumberInputType'] && scope.data.configs['NumberInputType'][0] == 'Percentage') {
              value.percent = scope.data.configs['NumberInputPrecision'] && scope.data.configs['NumberInputPrecision'][0];
            }
            if (scope.operator == "介于") {
              numInput = (scope.numInput1 * 1 > scope.numInput2 * 1) ? (scope.numInput2 + ',' + scope.numInput1) : (scope.numInput1 + ',' + scope.numInput2);
            } else {
              numInput = scope.numInput1 + "";
            }
            value.value = numInput;
            value.operator = scope.operator;
            return value;
          };

          function addStrict(config) {
            // var config = scope.data.configs;
            if (inited) {
              return;
            }
            var els = elem.find('input');
            //输入类型 :浮点数 整数 百分数
            if (config['NumberInputType']) {
              switch (config['NumberInputType'][0]) {
                case 'Int':
                  els.attr('num-type', '整数');
                  break;
                case 'Float':
                  els.attr('num-type', '浮点数');
                  break;
                case 'Percentage':
                  els.attr('num-type', '百分数');
                  els.after('<span class="mr10 dollor">%</span>');
                  break;
              }
            }
            //202(输入精度:小数点后几位)
            if (config['NumberInputPrecision']) {
              els.attr('num-precision', config['NumberInputPrecision'][0]);
            }
            //204(输入范围)
            if (config['NumberInputRange']) {
              els.attr('num-between', config['NumberInputRange']);
              els.attr('range', config['NumberInputRange']);
            }

            $compile(elem.find('input')[0])(scope);
            $compile(elem.find('input')[1])(scope);
            inited = true;
          }
        }
      };
    }
  ]);
  //2.字符类型
  app.directive('stringType', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              //打开节点，同时带有默认值
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.stringInput = defaultVal.value || "";
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['StringType'][0];
              }
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
            if (val == 'IdentityCard') {
            }
            if (val == 'Email') {
              el.attr("email", true);
            }
            // $compile(elem.find('input'))(scope);//删除谷歌会不容许输入字符
            inited = true;
          }
        }
      };
    }
  ]);

  //3.字典类型
  app.directive('directoryType', ['$compile', '$parse', function($compile, $parse) {
    return {
      controller: ['$scope', function($scope) {
        $scope.imgMap = [
          {"name": "VIP1", "cName": "commonvip vipLevel1", "text": "V1会员"},
          {"name": "VIP2", "cName": "commonvip vipLevel2", "text": "V2会员"},
          {"name": "VIP3", "cName": "commonvip vipLevel3", "text": "V3会员"},
          {"name": "VIP4", "cName": "commonvip vipLevel4", "text": "V4会员"},
          {"name": "VIP5", "cName": "commonvip vipLevel5", "text": "V5会员"},
          {"name": "VIP6", "cName": "commonvip vipLevel6", "text": "V6会员"},
          {"name": "一心", "cName": "commonvip heart1"},
          {"name": "二心", "cName": "commonvip heart2"},
          {"name": "三心", "cName": "commonvip heart3"},
          {"name": "四心", "cName": "commonvip heart4"},
          {"name": "五心", "cName": "commonvip heart5"},
          {"name": "一钻", "cName": "commonvip dio1"},
          {"name": "二钻", "cName": "commonvip dio2"},
          {"name": "三钻", "cName": "commonvip dio3"},
          {"name": "四钻", "cName": "commonvip dio4"},
          {"name": "五钻", "cName": "commonvip dio5"},
          {"name": "一皇冠", "cName": "commonvip huang1"},
          {"name": "二皇冠", "cName": "commonvip huang2"},
          {"name": "三皇冠", "cName": "commonvip huang3"},
          {"name": "四皇冠", "cName": "commonvip huang4"},
          {"name": "五皇冠", "cName": "commonvip huang5"},
          {"name": "一金冠", "cName": "commonvip jin1"},
          {"name": "二金冠", "cName": "commonvip jin2"},
          {"name": "三金冠", "cName": "commonvip jin3"},
          {"name": "四金冠", "cName": "commonvip jin4"},
          {"name": "五金冠", "cName": "commonvip jin5"},
        ];
        $scope.asyncDefaultData.then(function() {
          if ($scope.data.values) {
            var defaultValusAry = $scope.data.values.value ? $scope.data.values.value.split(",") : [];
            if ($scope.data && $scope.data.configs) {//前台手动添加初始化的status
              angular.forEach($scope.data.configs, function(val, key) {
                val.cName = "changePos";
                val.repName = val.name;
                $scope.imgMap.forEach(function(item) {
                  if (val.name == item.name) {
                    val.cName = item.cName;
                    val.repName = item.text ? item.text : ""
                  }
                })
                angular.forEach(defaultValusAry, function(defaultVal, othKey) {
                  if (defaultVal == val.id) {
                    val.status = true;
                  }
                })
              });
            }
          } else {
            //从服务器获取的值
            if ($scope.data && $scope.data.configs) {//前台手动添加初始化的status
              angular.forEach($scope.data.configs, function(val, key) {
                val.status = false;
                val.cName = "changePos";
                val.repName = val.name;
                $scope.imgMap.forEach(function(item) {
                  if (val.name == item.name) {
                    val.cName = item.cName;
                    val.repName = item.text ? item.text : ""
                  }
                })
              });
            }
          }
        });

      }],
      link: function(scope, elem, attrs) {
        //获取保存到服务器的values
        // 处理历史数据
        if (scope.defaultName === '基本信息-手机号码是否有效') {
          elem.find('.query_node_content').css({
            'background-color': 'rgb(237, 237, 237)'
          });
          elem.find('.query_node_title').append($('<span class="history_error" style="float:right;margin-right:30px;color:red;">此条件已失效，请删除</span>'))
        }
        scope.getSubmitValue = function() {
          var directoryAry = [];
          angular.forEach(scope.data.configs, function(val, key) {
            if (val.status) {
              directoryAry.push(val.id);
            }
          })
          var value = {
            "value": directoryAry.join(",")
          };
          return value;
        };
      }
    }
  }]);
  //关键字类型
  app.directive('keywordType', ['$compile', '$parse',
    function($compile, $parse) {
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              if ($scope.data.values) {
                $scope.fontLists = $scope.data.values.value ? $scope.data.values.value.split(",") : [];
                $scope.fontRelation = $scope.data.values.relation ? $scope.data.values.relation : "AND";
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
            scope.commPlugSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/selectorFonts.html?_=" + new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop = function() {
            if (!location.href.match('/campaign/customerSegmentation')) { // 查询节点调取弹框
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
  //自定义查询
  app.directive('customType', ['$compile', '$parse', '$sce',
    function($compile, $parse, $sce) {
      return {
        controller: ['$scope',
          function($scope, $sce) {
            $scope.asyncDefaultData.then(function() {
              if ($scope.data.values) {
                $scope.queryCustomAttrLists = $scope.data.values.conditions ? $scope.data.values.conditions : [];
                $scope.queryCustomIndicatorLists = $scope.data.values.indexConfig ? $scope.data.values.indexConfig : [];
                $scope.queryCustomIndicatorRelation = $scope.data.values.relationship == "AND" ? "并且" : "或者";
              }
            });
          }],
        link: function(scope, elem, attrs) {
          scope.editorCustomCondition = function(id, type, titleName) { //编辑已经配置好的数据
            scope.addCondition(Number(id), type, "", titleName, scope.index);
          };

          scope.filterTitle = function(value) {
            if (!(/<img.*/ig.test(value))) {
              return value
            }
          };

          scope.trustHtml = function(v) {
            if (!v) return '';
            var exg = new RegExp('<(?!\'img\')')
            value = v.replace(exg, '&lt;')
            return value;
            //return $sce.getTrustedHtml(value);
          }
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
  //地区选择
  app.directive('cityType', ['$compile', '$parse', "getListService",
    function($compile, $parse, getListService) {
      return {
        controller: ['$scope',
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
            scope.commPlugSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/citys.html?_=" + new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop = function() {
            if (!location.href.match('/campaign/customerSegmentation')) { // 查询节点调取弹框
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
          scope.getCitySelectedData = function(callBackData, e) {
            scope.cityLists = callBackData.operateValue.slice();
            angular.element(e.target).closest(".ccmsPublicPop").hide();
            if (!location.href.match('/campaign/customerSegmentation')) {
              angular.element(".childElementMark").remove();
            } else {
              angular.element(".yunat_maskLayer").remove();
            }
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
  app.directive('ngCitysChecked', ['$compile', '$parse',
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
        }, true);
      }
    }
  ]);

  //标签选择
  app.directive('queryLabelType', ['$compile', '$parse', "getListService",
    function($compile, $parse, getListService) {
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              $scope.labelTemplateMark = "baseQueryLabel"; //标记label模板的功能的参数
              $scope.totleQueryLabelDatas = $scope.data.configs ? $scope.data.configs : [];
              $scope.queryLabelLists = [];
              if ($scope.data.values) { // 编辑
                var storeIds = $scope.data.values.value ? $scope.data.values.value.split(",") : [];
                angular.forEach(storeIds, function(id, key) {
                  var CurLabelId = id;
                  angular.forEach($scope.totleQueryLabelDatas, function(v, k) {
                    if (v.id == CurLabelId) {
                      $scope.queryLabelLists.push(v);
                    }
                  });
                });
              }
            });
          }],
        link: function(scope, elem, attrs) {
          //选择框改变
          scope.editorCondition = function() {
            scope.commPlugSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/label.html?_=" + new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop = function() {
            if (!location.href.match('/campaign/customerSegmentation')) { // 查询节点调取弹框
              elem.find(".commSelectPlug").addInteractivePop({
                magTitle: "请选择标签",
                width: 734,
                mark: false,
                position: "fixed",
                childElePop: true
              });
            } else { // 客户分组
              elem.find(".commSelectPlug").addInteractivePop({
                magTitle: "请选择标签",
                width: 760,
                mark: true,
                position: "fixed"
              });
            }
          }

          //获取保存到服务器的values
          scope.getSubmitValue = function() {
            var storeAry = [];
            angular.forEach(scope.queryLabelLists,
              function(val, key) {
                storeAry.push(val.id);
              });

            var value = {
              "value": storeAry.join(",")
            };
            return value;
          };
        }
      };
    }
  ]);

  //4.日期类型
  app.directive('dateType', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              //打开节点，同时带有默认值
              $scope.dirValueList = [{
                "value": "月",
                "id": "false"
              },
                {
                  "value": "天",
                  "id": "true"
                }];
              $scope.dirList = [{
                "value": "前",
                "id": "0"
              },
                {
                  "value": "后",
                  "id": "1"
                }];
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.isRelativeDisable = $scope.data.configs['DateSupportRelative'][0] == "Support" ? false : true;
                $scope.dateType = defaultVal.type;
                $scope.configDirType = defaultVal.direction == "前" ? "0" : "1" //默认前
                if ($scope.dateType == "absolutely") {
                  if ($scope.operator == '介于') {
                    $scope.dateInput1 = defaultVal.value.split(',')[0];
                    $scope.dateInput2 = defaultVal.value.split(',')[1];
                  } else {
                    $scope.dateInput1 = defaultVal.value;
                  }
                } else if ($scope.dateType == "relatively") {
                  var value = defaultVal;
                  $scope.dimension = value.dimension;
                  $scope.isDay = $scope.dimension == "天" ? 'true' : 'false';
                  if ($scope.operator == "介于") {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.dayInput1 = value.day.split(',')[0];
                      $scope.dayInput2 = value.day.split(',')[1];
                      $scope.numcount = 120;
                    }
                  } else {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.dayInput1 = value.day;
                      $scope.numcount = 120;
                    }
                  }
                }
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['DateType'][0];
                $scope.dateType = "absolutely";
                //相对时间,默认'日'
                $scope.isDay = 'true';
                $scope.numcount = 3650;
                $scope.configDirType = "0"; //默认前
                //是否可以点击"相对时间""
                $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['DateSupportRelative'][0] == 'Support' ? false : true;
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
            // console.log('--', val, oldVal);
            if (oldVal != undefined && oldVal != val) {
              if (val == "absolutely") {
                scope.operator = scope.data.configs['DateType'][0];
                clearDate1();
              } else if (val == "relatively") {
                scope.operator = scope.data.configs['DateType'][0];
                scope.isDay = 'true';
                scope.numcount = 3650;
                clearDate2();
              }
            }
          });
          //相对时间天or月
          scope.$watch('isDay', function(val, oldVal) {
            if (oldVal != undefined && oldVal != val) {
              clearDate2();
              if (val == 'true') {
                scope.numcount = 3650;
              } else {
                scope.numcount = 120;
              }
            }
            ;
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
              value.direction = scope.configDirType == "0" ? "前" : "后";
              if (scope.operator == "介于") {
                if (scope.isDay == 'true') {

                  if (scope.configDirType == "0") {
                    //day-before
                    if (+scope.dayOrMonthInput1 < +scope.dayOrMonthInput2) {
                      var inputa1 = scope.dayOrMonthInput1;
                      scope.dayOrMonthInput1 = scope.dayOrMonthInput2;
                      scope.dayOrMonthInput2 = inputa1;
                    }

                  } else {
                    //day-after
                    if (+scope.dayOrMonthInput1 > +scope.dayOrMonthInput2) {
                      var inputa11 = scope.dayOrMonthInput1;
                      scope.dayOrMonthInput1 = scope.dayOrMonthInput2;
                      scope.dayOrMonthInput2 = inputa11;
                    }
                  }

                  value.interval = scope.dayOrMonthInput1 + ',' + scope.dayOrMonthInput2;
                  value.dimension = '天';
                  // console.log(scope.configDirType+'-'+scope.dayOrMonthInput1+'天到'+scope.configDirType+'-'+scope.dayOrMonthInput2+'天');
                } else {
                  //月

                  if (scope.configDirType == "0") {
                    //前
                    if (+scope.dayOrMonthInput1 < +scope.dayOrMonthInput2) {
                      var inputam = scope.dayOrMonthInput1;
                      scope.dayOrMonthInput1 = scope.dayOrMonthInput2;
                      scope.dayOrMonthInput2 = inputam;

                      var temp1 = scope.dayInput1;
                      scope.dayInput1 = scope.dayInput2;
                      scope.dayInput2 = temp1;
                    } else if (scope.dayOrMonthInput1 == scope.dayOrMonthInput2) {
                      if (+scope.dayInput1 > +scope.dayInput2) {
                        var temp2 = scope.dayInput1;
                        scope.dayInput1 = scope.dayInput2;
                        scope.dayInput2 = temp2;
                      }
                    }

                  } else {
                    //后
                    if (+scope.dayOrMonthInput1 > +scope.dayOrMonthInput2) {
                      var inputam1 = scope.dayOrMonthInput1;
                      scope.dayOrMonthInput1 = Math.min(scope.dayOrMonthInput1, scope.dayOrMonthInput2);
                      scope.dayOrMonthInput2 = inputam1;

                      var temp3 = scope.dayInput1;
                      scope.dayInput1 = scope.dayInput2;
                      scope.dayInput2 = temp3;
                    }
                    if (scope.dayOrMonthInput1 == scope.dayOrMonthInput2) {
                      if (+scope.dayInput1 > +scope.dayInput2) {
                        var temp4 = scope.dayInput1;
                        scope.dayInput1 = scope.dayInput2;
                        scope.dayInput2 = temp4;
                      }
                    }
                  }

                  value.interval = scope.dayOrMonthInput1 + ',' + scope.dayOrMonthInput2;
                  value.dimension = '月';
                  value.day = scope.dayInput1 + ',' + scope.dayInput2;
                  // console.log(scope.configDirType+'-'+scope.dayOrMonthInput1+'月-'+scope.dayInput1+'号到'+scope.configDirType+'-'+scope.dayOrMonthInput2+'月-'+scope.dayInput2+'号');
                }
              } else {
                if (scope.isDay == 'true') {
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '天';
                } else {
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '月';
                  value.day = scope.dayInput1;
                }
              }
            }
            // console.log(日期类型,value);
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
        }
      };
    }
  ]);

  //生日选择
  app.directive('birthdayType', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              //打开节点，同时带有默认值
              $scope.dirValueList = [{
                "value": "天",
                "id": "true"
              }];
              $scope.dirList = [{
                "value": "前",
                "id": "0"
              },
                {
                  "value": "后",
                  "id": "1"
                }];
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.isRelativeDisable = $scope.data.configs['TimeSupportRelative'][0] == "Support" ? false : true;
                $scope.configDirType = defaultVal.direction == "前" ? "0" : "1" //默认前
                $scope.dateType = defaultVal.type;
                if ($scope.dateType == "absolutely") {
                  if ($scope.operator == '介于') {
                    $scope.dateInput1 = defaultVal.value.split(',')[0];
                    $scope.dateInput2 = defaultVal.value.split(',')[1];
                  } else {
                    $scope.dateInput1 = defaultVal.value;
                  }
                } else if ($scope.dateType == "relatively") {
                  var value = defaultVal;
                  $scope.dimension = value.dimension;
                  $scope.isDay = $scope.dimension == "天" ? 'true' : 'false';
                  if ($scope.operator == "介于") {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.dayInput1 = value.day.split(',')[0];
                      $scope.dayInput2 = value.day.split(',')[1];
                      $scope.numcount = 120;
                    }
                  } else {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.dayInput1 = value.day;
                      $scope.numcount = 120;
                    }
                  }
                }
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['DatetimeType'][0];
                $scope.dateType = "absolutely";
                //相对时间,默认'日'
                $scope.isDay = 'true';
                $scope.configDirType = "0"; //默认前
                $scope.numcount = 3650;
                //是否可以点击"相对时间""
                $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == 'Support' ? false : true;
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
            // console.log('--', val, oldVal);
            if (oldVal != undefined && oldVal != val) {
              if (val == "absolutely") {
                scope.operator = scope.data.configs['DatetimeType'][0];
                clearDate1();
              } else if (val == "relatively") {
                scope.operator = scope.data.configs['DatetimeType'][0];
                scope.numcount = 3650;
                scope.isDay = 'true';
                clearDate2();
              }
            }
          });
          //相对时间天or月
          scope.$watch('isDay', function(val, oldVal) {
            if (oldVal != undefined && oldVal != val) {
              clearDate2();
              if (val == 'true') {
                scope.numcount = 3650;
              } else {
                scope.numcount = 120;
              }
            }
            ;
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
              value.direction = scope.configDirType == "0" ? "前" : "后";
              if (scope.operator == "介于") {
                if (scope.isDay == 'true') {
                  value.dimension = '天';
                } else {
                  value.dimension = '月';
                  value.day = scope.dayInput1 + ',' + scope.dayInput2;
                }
                // mdd
                if (scope.configDirType == "0") {
                  if (+scope.dayOrMonthInput1 < +scope.dayOrMonthInput2) {
                    var inputa1 = scope.dayOrMonthInput1;
                    scope.dayOrMonthInput1 = scope.dayOrMonthInput2;
                    scope.dayOrMonthInput2 = inputa1;
                  }

                } else {
                  if (+scope.dayOrMonthInput1 > +scope.dayOrMonthInput2) {
                    var inputa11 = scope.dayOrMonthInput1;
                    scope.dayOrMonthInput1 = scope.dayOrMonthInput2;
                    scope.dayOrMonthInput2 = inputa11;
                  }
                }
                value.interval = scope.dayOrMonthInput1 + ',' + scope.dayOrMonthInput2;

              } else {
                if (scope.isDay == 'true') {
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '天';
                } else {
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '月';
                  value.day = scope.dayInput1;
                }
              }
            }
            // console.log('生日类型', value);

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
        }
      };
    }
  ]);

  //5.时间类型  $scope.numcount：月-max120，天—max3650，分-max6000
  app.directive('timeType', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              //打开节点，同时带有默认值
              $scope.dirValueListTime = [{
                "value": "月",
                "id": "0"
              },
                {
                  "value": "天",
                  "id": "1"
                },
                {
                  "value": "分",
                  "id": "2"
                }];
              $scope.dirList = [{
                "value": "前",
                "id": "0"
              },
                {
                  "value": "后",
                  "id": "1"
                }];
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.stringInput = defaultVal.value || "";
                $scope.configDirType = defaultVal.direction == "前" ? "0" : "1";//默认前
                $scope.dateType = defaultVal.type || "absolutely";
                //TODO:
                $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == 'Support' ? false : true;

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
                      $scope.numcount = 120;
                    } else if ($scope.subType == '1') {
                      $scope.timeInput1 = value.time.split(',')[0];
                      $scope.timeInput2 = value.time.split(',')[1];
                      $scope.numcount = 3650;
                    } else if ($scope.subType == '2') {
                      $scope.numcount = 6000;
                    }
                  } else {
                    $scope.monthOrDayOrSecondInput1 = value.interval;
                    if ($scope.subType == '0') {
                      $scope.dayInput1 = value.day;
                      $scope.timeInput1 = value.time;
                      $scope.numcount = 120;
                    } else if ($scope.subType == '1') {
                      $scope.timeInput1 = value.time;
                      $scope.numcount = 3650;
                    } else if ($scope.subType == '2') {
                      $scope.numcount = 6000;
                    }
                  }
                }
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['DatetimeType'][0];
                $scope.dateType = "absolutely";
                //相对时间,默认'日'
                $scope.dateInput1 = '';
                $scope.dateInput2 = '';
                $scope.subType = '0';
                $scope.configDirType = "0"; //默认前
                $scope.numcount = 120;
                //是否可以点击"相对时间""
                $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == "Support" ? false : true;
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
                scope.subType = '1';
                scope.numcount = 3650;
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
                  scope.numcount = 120;
                  break;
                case '1':
                  scope.numcount = 3650;
                  break;
                case '2':
                  scope.numcount = 6000;
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
              value.direction = scope.configDirType == "0" ? "前" : "后";
              if (scope.operator == "介于") {
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
                // mdd
                if (scope.configDirType == "0") {
                  if (+scope.monthOrDayOrSecondInput1 < +scope.monthOrDayOrSecondInput2) {
                    var inputa1 = scope.monthOrDayOrSecondInput1;
                    scope.monthOrDayOrSecondInput1 = scope.monthOrDayOrSecondInput2;
                    scope.monthOrDayOrSecondInput2 = inputa1;
                  } else if(+scope.monthOrDayOrSecondInput1 == +scope.monthOrDayOrSecondInput2) {
                    if (scope.subType == "1") {
                      // 天
                      var timeArrary1 = scope.timeInput1.split(':');
                      var timeArrary2 = scope.timeInput2.split(':');
                      var timeSeconds1 = timeArrary1[0] * 60 + timeArrary1[1] * 1;
                      var timeSeconds2 = timeArrary2[0] * 60 + timeArrary2[1] * 1;
                      if (timeSeconds1 > timeSeconds2) {
                        var timeTemp = scope.timeInput1;
                        scope.timeInput1 = scope.timeInput2;
                        scope.timeInput2 = timeTemp;
                      }
                    } else if (scope.subType == "0") {
                      // 月
                      if (+scope.dayInput1 > +scope.dayInput2) {
                        var dayTemp = scope.dayInput1;
                        scope.dayInput1 = scope.dayInput2;
                        scope.dayInput2 = dayTemp;
                      } else if (+scope.dayInput1 == +scope.dayInput2) {
                        var timeArrary1 = scope.timeInput1.split(':');
                        var timeArrary2 = scope.timeInput2.split(':');
                        var timeSeconds1 = timeArrary1[0] * 60 + timeArrary1[1] * 1;
                        var timeSeconds2 = timeArrary2[0] * 60 + timeArrary2[1] * 1;
                        if (timeSeconds1 > timeSeconds2) {
                          var timeTemp = scope.timeInput1;
                          scope.timeInput1 = scope.timeInput2;
                          scope.timeInput2 = timeTemp;
                        }
                      }
                    }
                  }
                } else {
                  if (+scope.monthOrDayOrSecondInput1 > +scope.monthOrDayOrSecondInput2) {
                    var inputa11 = scope.monthOrDayOrSecondInput1;
                    scope.monthOrDayOrSecondInput1 = scope.monthOrDayOrSecondInput2;
                    scope.monthOrDayOrSecondInput2 = inputa11;
                  } else if(+scope.monthOrDayOrSecondInput1 == +scope.monthOrDayOrSecondInput2) {
                    if (scope.subType == "1") {
                      // 天
                      var timeArrary1 = scope.timeInput1.split(':');
                      var timeArrary2 = scope.timeInput2.split(':');
                      var timeSeconds1 = timeArrary1[0] * 60 + timeArrary1[1] * 1;
                      var timeSeconds2 = timeArrary2[0] * 60 + timeArrary2[1] * 1;
                      if (timeSeconds1 > timeSeconds2) {
                        var timeTemp = scope.timeInput1;
                        scope.timeInput1 = scope.timeInput2;
                        scope.timeInput2 = timeTemp;
                      }
                    } else if (scope.subType == "0") {
                      // 月
                      if (+scope.dayInput1 > +scope.dayInput2) {
                        var dayTemp = scope.dayInput1;
                        scope.dayInput1 = scope.dayInput2;
                        scope.dayInput2 = dayTemp;
                      } else if (+scope.dayInput1 == +scope.dayInput2) {
                        var timeArrary1 = scope.timeInput1.split(':');
                        var timeArrary2 = scope.timeInput2.split(':');
                        var timeSeconds1 = timeArrary1[0] * 60 + timeArrary1[1] * 1;
                        var timeSeconds2 = timeArrary2[0] * 60 + timeArrary2[1] * 1;
                        if (timeSeconds1 > timeSeconds2) {
                          var timeTemp = scope.timeInput1;
                          scope.timeInput1 = scope.timeInput2;
                          scope.timeInput2 = timeTemp;
                        }
                      }
                    }
                  }
                }
                value.interval = scope.monthOrDayOrSecondInput1 + ',' + scope.monthOrDayOrSecondInput2;

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
            // console.log(8888, value);

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
  app.directive('formatLimit', ['$parse',
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
  app.directive('numType', ['$parse',
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
        elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange" : 'input', function(evt) {
          var val = evt.target.value,
            curAttrValue = angular.element(evt.target).attr("num-type");
          var valed;
          var limitPrecision = angular.element(evt.target).attr("num-precision-limit") * 1 - 0;

          if (!val) {
            return;
          }
          valed = getVerifiedVal(val, curAttrValue, limitPrecision);
          if (valed != val) {
            evt.target.value = valed;
            $parse(attrs.ngModel).assign(scope, valed);
          }
        });


        function getVerifiedVal(val, curAttrValue, limitPrecision) {
          switch (curAttrValue) {
            case "整数":
              return verifyInt(val);
              break;
            case '浮点数':
              return verifyFloat(val, limitPrecision);
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
        function verifyFloat(val, limitPrecision) {
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
              return b ? b : 0;
            });
          }
          //如果包含多个.取第一个，删除后来的
          var dotsVal = val.match(DDOTREG);
          if (dotsVal && dotsVal[1]) {
            var arrVals = val.split('.');
            val = arrVals[0] + '.' + arrVals.slice(1).join('');
          }

          var arrVals = val.split('.');
          if(limitPrecision && arrVals[1] ) {
            val = arrVals[0] + '.' + arrVals[1].substring(0, limitPrecision);
          }
          return val;
        }
      }
    }
  ]);

  app.directive('ngDatePickerSecond', ['$parse',
    function($parse) {
      return function(scope, element, attrs) {
        element.datetimepicker({
          inline: true,
          timeFormat: 'HH:mm:ss',
          showSecond: true,
          changeMonth: true,
          changeYear: true,
          ShowCheckBox: true,
          dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
          //日期简写名称
          monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          //月份简写名称
          beforeShow: function() {
            setTimeout(function() {
              $('.ui-datepicker').css('z-index', 1011);
            }, 0);
            if (attrs.ngModel == 'commconf.start') {
              if (scope.commconf.end) {
                element.datepicker("option", "maxDate", scope.commconf.end);
              }
            } else if (attrs.ngModel === 'commconf.end') {
              if (scope.commconf.start) {
                element.datepicker("option", "minDate", scope.commconf.start);
              }
            }
          },
          onSelect: function(dateText) {
            var modelPath = $(this).attr('ng-model');
            putObject(modelPath, scope, dateText);
            scope.$apply();
          }
        });
      }
    }
  ]);

  app.directive('ngDatePicker', ['$parse',
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

  app.directive('dicsBtn',
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          element.on('click', scope, clickHandler);

          function clickHandler(ev) {
            var data = ev.data.commconf,
              value;
            var currenTarget = ev.currentTarget;
            var parentEle = currenTarget.parentElement;
            var seleText = parentEle.querySelector('select').selectedOptions[0].text;

            $(parentEle).hide();
            if (data.select) {
              $(parentEle.previousElementSibling).hide();
              $(parentEle.nextElementSibling).show();
              $(parentEle.nextElementSibling).find('a').text(seleText);
              data.subF = true;
            } else {
              $(parentEle.previousElementSibling).addClass('down').removeClass('up');
            }
          }
        }
      }
    }
  );

  app.directive('stringBtn',
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          element.on('click', scope, clickHandler);

          function clickHandler(ev) {
            var data = ev.data.commconf,
              value;
            var currenTarget = ev.currentTarget;
            var parentEle = currenTarget.parentElement;
            $(parentEle).hide();
            if (data.start) {
              $(parentEle.previousElementSibling).hide();
              $(parentEle.nextElementSibling).show();
              data.subF = true;
            } else {
              $(parentEle.previousElementSibling).addClass('down').removeClass('up');
            }
          }
        }
      }
    }
  );

  app.directive('timeBtn',
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {

          var formatStr = 'YYYY-MM-DD HH:mm:ss';
          element.on('click', scope, clickHandler);

          function min(tarA, tarB) {
            return moment.min(moment(tarA), moment(tarB)).format(formatStr);
          }

          function max(tarA, tarB) {
            return moment.max(moment(tarA), moment(tarB)).format(formatStr);
          }

          function clickHandler(ev) {
            var data = ev.data.commconf,
              value;
            var currenTarget = ev.currentTarget;
            var parentEle = currenTarget.parentElement;
            var subTitle = '';
            if ((data.start == "" || data.start == undefined) && data.end) {
              subTitle = '小于等于' + data.end;
              data.subF = true;
            } else if ((data.end == "" || data.end == undefined) && data.start) {
              subTitle = '大于等于' + data.start;
              data.subF = true;
            } else if (data.start && data.end) {
              subTitle = '介于' + min(data.start, data.end) + '和' + max(data.start, data.end) + '之间';
              data.subF = true;
            }
            $(parentEle).hide();
            if (subTitle) {
              $(parentEle.previousElementSibling).hide();
              $(parentEle.nextElementSibling).show();
              $(parentEle.nextElementSibling).find('a').text(subTitle).attr('title', subTitle);
            } else {
              $(parentEle.previousElementSibling).addClass('down').removeClass('up');
            }
          }
        }
      }
    }
  );

  app.directive('numberBtn',
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          element.on('click', scope, clickHandler);

          function clickHandler(ev) {
            var data = ev.data.commconf,
              value;
            var currenTarget = ev.currentTarget;
            var parentEle = currenTarget.parentElement;
            var subTitle = '';
            if ((data.start == "" || data.start == undefined) && data.end) {
              subTitle = '小于等于' + data.end;
              data.subF = true;
            } else if ((data.end == "" || data.end == undefined) && data.start) {
              subTitle = '大于等于' + data.start;
              data.subF = true;
            } else if (data.start && data.end) {
              subTitle = '介于' + Math.min(data.start, data.end) + '和' + Math.max(data.start, data.end) + '之间';
              data.subF = true;
            }

            $(parentEle).hide();
            if (subTitle) {
              $(parentEle.previousElementSibling).hide();
              $(parentEle.nextElementSibling).show();
              $(parentEle.nextElementSibling).find('a').text(subTitle).attr('title', subTitle);
            } else {
              $(parentEle.previousElementSibling).addClass('down').removeClass('up');
            }
          }
        }
      }
    }
  );

  app.directive('numValid',
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          element.on('input', scope, inputHandler);

          function inputHandler(ev) {
            var data = ev.data.commconf,
              value;
            ev.preventDefault();

            //转化为数字
            value = converToNum(ev.target.value, data);
            ev.target.value = value;
          }

          function converToNum(input, data) {
            var valArr = input.replace(/[^0-9\.]+/g, '').split('\.');
            var result;
            var precision = data.config.NumberInputPrecision || 0;
            var NumberInputRange = data.config.NumberInputRange;
            if (valArr.length >= 2) {
              switch (valArr[1]) {
                case "":
                  result = valArr[0] + '.';
                  break;
                default:
                  valArr[1] = valArr[1].substr(0, precision);
                  valArr[0] = valArr[0] == "" ? 0 : valArr[0];
                  result = valArr[0] + '.' + valArr[1];
              }
              if (precision == 0) {
                result = valArr[0];
              }
            } else if (valArr.length === 1) {
              result = valArr[0];
            }

            if (Number(result) > Math.max(NumberInputRange[0], NumberInputRange[1])) {
              result = result.substr(0, result.length - 1);
            }
            return result;
          }
        }
      };
    }
  );
  // 小数点精度设置
  app.directive('numPrecision', ['$parse',
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
        elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange" : 'input', function(evt) {
          var val = evt.target.value;
          if (!val || _lastVal == val) {
            return;
          }
          LEN = angular.element(evt.target).attr("num-precision") * 1 - 0;
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
          console.log(val)
          if (!val) {
            return;
          }
          val = verifyPrecision(val);
          console.log(val)
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
            val = valArrs[1].length ? (valArrs[0] + '.' + valArrs[1]) : valArrs[0];
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
  app.directive('numBetween', ['$parse',
    function($parse) {
      return {
        priority: 10,
        link: linkFn
      };
      function linkFn(scope, elem, attrs) {
        var MIX = attrs.numBetween.split(',').sort()[0] ? attrs.numBetween.split(',').sort()[0] - 0 : '',
          MAX = attrs.numBetween.split(',').sort()[1] - 0;
        elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange" : 'input', function(event) {
          var val = event.target.value;
          if (!val) {
            return;
          }

          if (val > MAX) {
            val = MAX;
            $parse(attrs.ngModel).assign(scope, val);
            event.target.value = val;
          }
        });
      };
    }]);
  //相对时间月份输入，只能输入最大12的整数
  app.directive('monthInput', ['$parse',
    function($parse) {
      return linkFn;
      //
      function linkFn(scope, elem, attrs) {
        elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange" : 'input', function(event) {
          if (!(scope.dateType == "相对时间" && scope.isDay == 'false')) {
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
  app.directive('maxInteger', ['$parse',
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
        elem.on(navigator.userAgent.indexOf("MSIE 8.0") > 0 ? "propertychange" : 'input', function(event) {
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

  /*营销历史查询类型 start*/

  //未参加活动 或者 最后一次参加活动时间
  app.directive('activityHistoryUnattendOrLast', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              //打开节点，同时带有默认值
              $scope.dirValueListMarket = [{
                "value": "月",
                "id": "false"
              },
                {
                  "value": "天",
                  "id": "true"
                }];
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.isRelativeDisable = $scope.data.configs['DateSupportRelative'][0] == "Support" ? false : true;
                $scope.dateType = defaultVal.type;
                if ($scope.dateType == "absolutely") {
                  if ($scope.operator == '介于') {
                    $scope.dateInput1 = defaultVal.value.split(',')[0];
                    $scope.dateInput2 = defaultVal.value.split(',')[1];
                  } else {
                    $scope.dateInput1 = defaultVal.value;
                  }
                } else if ($scope.dateType == "relatively") {
                  var value = defaultVal;
                  $scope.dimension = value.dimension;
                  $scope.isDay = $scope.dimension == "天" ? 'true' : 'false';
                  if ($scope.operator == "介于") {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.dayInput1 = value.day.split(',')[0];
                      $scope.dayInput2 = value.day.split(',')[1];
                      $scope.numcount = 120;
                    }
                  } else {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.dayInput1 = value.day;
                      $scope.numcount = 120;
                    }
                  }
                }
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['DateType'][0];
                $scope.dateType = "absolutely";
                //相对时间,默认'日'
                $scope.isDay = 'true';
                $scope.numcount = 3650;
                //是否可以点击"相对时间""
                $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['DateSupportRelative'][0] == 'Support' ? false : true;
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
                scope.operator = scope.data.configs['DateType'][0];
                clearDate1();
              } else if (val == "relatively") {
                scope.operator = scope.data.configs['DateType'][0];
                scope.isDay = 'true';
                scope.numcount = 3650;
                clearDate2();
              }
            }
          });
          //相对时间天or月
          scope.$watch('isDay', function(val, oldVal) {
            if (oldVal != undefined && oldVal != val) {
              clearDate2();
              if (val == 'true') {
                scope.numcount = 3650;
              } else {
                scope.numcount = 120;
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
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '天';
                } else {
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '月';
                  value.day = scope.dayInput1;
                }
              }
            }
            // console.log('最后一次参加活动时间', value);

            return value;
          };

          //绝对时间清除操作
          function clearDate1() {
            scope.dateInput1 = '';
            scope.dateInput2 = '';
          }

          //相对时间清除操作
          function clearDate2() {
            scope.dayInput1 = '';
            scope.dayInput2 = '';
            scope.dayOrMonthInput1 = '';
            scope.dayOrMonthInput2 = '';
          }

          //相对时间天or月选择
          function clearDate3() {
            scope.dayInput1 = '';
            scope.dayInput2 = '';
          }
        }
      };
    }]);

  //参加活动次数
  app.directive('activityHistoryNumber', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              //打开节点，同时带有默认值
              $scope.dirValueListMarket = [{
                "value": "月",
                "id": "false"
              },
                {
                  "value": "天",
                  "id": "true"
                }];
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.isRelativeDisable = $scope.data.configs['DateSupportRelative'][0] == "Support" ? false : true;
                $scope.dateType = defaultVal.type;
                if ($scope.dateType == "absolutely") {
                  if ($scope.operator == '介于') {
                    $scope.dateInput1 = defaultVal.value.split(',')[0];
                    $scope.dateInput2 = defaultVal.value.split(',')[1];
                  } else {
                    $scope.dateInput1 = defaultVal.value;
                  }
                } else if ($scope.dateType == "relatively") {
                  var value = defaultVal;
                  $scope.dimension = value.dimension;
                  $scope.isDay = $scope.dimension == "天" ? 'true' : 'false';
                  if ($scope.operator == "介于") {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.dayInput1 = value.day.split(',')[0];
                      $scope.dayInput2 = value.day.split(',')[1];
                      $scope.numcount = 120;
                    }
                  } else {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.dayInput1 = value.day;
                      $scope.numcount = 120;
                    }
                  }
                }
                ;
                $scope.activityId = defaultVal.storeActivityId; // 活动选择器存储id
                $scope.activityLength = defaultVal.fillActivityValue; // 储存后台的input展示值
                $scope.activityNumOperator = defaultVal.activityOperator;
                if ($scope.activityNumOperator == "介于") {
                  $scope.joinActivityNum = defaultVal.activityValue.split(',')[0];
                  $scope.joinActivityNumTwo = defaultVal.activityValue.split(',')[1];
                } else {
                  $scope.joinActivityNum = defaultVal.activityValue;
                }
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['DateType'][0];
                $scope.activityNumOperator = $scope.data.configs['ActivityType'][0];
                $scope.joinActivityNum = "";
                $scope.joinActivityNumTwo = "";
                $scope.activityId = ""; // 活动选择器储存数据的id
                $scope.activityLength = "";
                $scope.dateType = "absolutely";
                //相对时间,默认'日'
                $scope.isDay = 'true';
                $scope.numcount = 3650;
                //是否可以点击"相对时间""
                $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['DateSupportRelative'][0] == 'Support' ? false : true;
              }
              ;

              $scope.disposeActivityInputView = function(activityData) { // 处理活动选择框的结果展示
                var activityViewNum = 0,
                  activityNodeViewNum = 0;
                angular.forEach(activityData.items, function(val, key) {
                  if ((val.campaignId && val.nodeId) || (val.campaignName && val.nodeName)) {
                    activityNodeViewNum++;
                  } else if (val.campaignId || val.campaignName) {
                    activityViewNum++;
                  }
                });
                if (activityViewNum == 0 && activityNodeViewNum == 0) {
                  $scope.activityLength = "";
                } else if (activityViewNum == 0 && activityNodeViewNum != 0) {
                  $scope.activityLength = "已经选" + activityNodeViewNum + "个节点";
                } else if (activityViewNum != 0 && activityNodeViewNum == 0) {
                  $scope.activityLength = "已经选" + activityViewNum + "个活动";
                } else if (activityViewNum != 0 && activityNodeViewNum != 0) {
                  $scope.activityLength = "已经选" + activityViewNum + "个活动," + activityNodeViewNum + "个节点";
                }
              };
            });
          }],
        link: function(scope, elem, attrs, ctrl) {

          //活动选择器载入
          scope.selectefActivity = function() {
            scope.commPlugSrc = GLOBAL_STATIC.rootModule + "/modules/activitySelector/index.html?_=" + new Date().getTime();
          };

          scope.openActivityPop = function() { // 弹框调用
            if (scope.tfilterFindObj) { // 查询节点调取弹框
              elem.find(".commActivityPlug").addInteractivePop({
                magTitle: "请选择营销活动",
                width: 1010,
                mark: false,
                position: "fixed",
                childElePop: true
              });
            } else { // 客服分组新建嵌入查询节点
              elem.find(".commActivityPlug").addInteractivePop({
                magTitle: "请选择营销活动",
                width: 1010,
                mark: true,
                position: "fixed"
              });
            }
          }

          scope.getSelectedActivity = function(selectedActivityData, activityId) { // 活动选择器确认 返回数据
            scope.disposeActivityInputView(selectedActivityData);
            scope.activityId = activityId;
          };
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

          //选择框改变活动次数
          scope.$watch('activityNumOperator', function(val, oldVal) {
            //每次切换的时候清空
            if (oldVal != undefined && oldVal != val) {
              scope.joinActivityNum = '';
              scope.joinActivityNumTwo = '';
            }
            if (val == "介于") {
              scope.isActivityMid = true;
            } else {
              scope.isActivityMid = false;
            }
          });

          //绝对时间or相对时间
          scope.$watch('dateType', function(val, oldVal) {
            if (oldVal != undefined && oldVal != val) {
              if (val == "absolutely") {
                scope.operator = scope.data.configs['DateType'][0];
                clearDate1();
              } else if (val == "relatively") {
                scope.operator = scope.data.configs['DateType'][0];
                scope.isDay = 'true';
                scope.numcount = 3650;
                clearDate2();
              }
            }
          });
          //相对时间天or月
          scope.$watch('isDay', function(val, oldVal) {
            if (oldVal != undefined && oldVal != val) {
              clearDate2();
              if (val == "true") {
                scope.numcount = 3650;
              } else {
                scope.numcount = 120;
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
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '天';
                } else {
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '月';
                  value.day = scope.dayInput1;
                }
              }
            }

            value.fillActivityValue = scope.activityLength; // 活动选择器input展示内容
            value.storeActivityId = scope.activityId; // 储存选择器id传给后台
            value.activityOperator = scope.activityNumOperator;
            if (scope.activityNumOperator == "介于") {
              value.activityValue = scope.joinActivityNum + "," + scope.joinActivityNumTwo;
            } else {
              value.activityValue = scope.joinActivityNum;
            }
            // console.log('参加活动次数', value);
            return value;
          };

          //绝对时间清除操作
          function clearDate1() {
            scope.dateInput1 = '';
            scope.dateInput2 = '';
          }

          //相对时间清除操作
          function clearDate2() {
            scope.dayInput1 = '';
            scope.dayInput2 = '';
            scope.dayOrMonthInput1 = '';
            scope.dayOrMonthInput2 = '';
          }

          //相对时间天or月选择
          function clearDate3() {
            scope.dayInput1 = '';
            scope.dayInput2 = '';
          }
        }
      };
    }]);

  //营销成功
  app.directive('activityHistorySuccess', ['$compile', '$parse',
    function($compile, $parse) {
      // Runs during compile
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              var defaultVal;
              //打开节点，同时带有默认值
              $scope.dirValueListMarket = [{
                "value": "月",
                "id": "false"
              },
                {
                  "value": "天",
                  "id": "true"
                }];
              if ($scope.data.values) {
                defaultVal = $scope.data.values;
                $scope.operator = defaultVal.operator;
                $scope.isRelativeDisable = $scope.data.configs['DateSupportRelative'][0] == "Support" ? false : true;
                $scope.dateType = defaultVal.type;
                if ($scope.dateType == "absolutely") {
                  if ($scope.operator == '介于') {
                    $scope.dateInput1 = defaultVal.value.split(',')[0];
                    $scope.dateInput2 = defaultVal.value.split(',')[1];
                  } else {
                    $scope.dateInput1 = defaultVal.value;
                  }
                } else if ($scope.dateType == "relatively") {
                  var value = defaultVal;
                  $scope.dimension = value.dimension;
                  $scope.isDay = $scope.dimension == "天" ? 'true' : 'false';
                  if ($scope.operator == "介于") {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                      $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                      $scope.dayInput1 = value.day.split(',')[0];
                      $scope.dayInput2 = value.day.split(',')[1];
                      $scope.numcount = 120;
                    }
                  } else {
                    if ($scope.isDay == 'true') {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.numcount = 3650;
                    } else {
                      $scope.dayOrMonthInput1 = value.interval;
                      $scope.dayInput1 = value.day;
                      $scope.numcount = 120;
                    }
                  }
                }
                $scope.activityId = defaultVal.storeActivityId; // 活动选择器存储id
                $scope.activityLength = defaultVal.fillActivityValue; // 储存后台的input展示值
              } else {
                //从服务器获取的值
                $scope.operator = $scope.data.configs['DateType'][0];
                $scope.activityId = ""; // 活动选择器存储id
                $scope.activityLength = ""; // 储存后台的input展示值
                $scope.dateType = "absolutely";
                //相对时间,默认'日'
                $scope.isDay = 'true';
                $scope.numcount = 3650;
                //是否可以点击"相对时间""
                $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['DateSupportRelative'][0] == 'Support' ? false : true;
              }

              $scope.disposeActivityInputView = function(activityData) { // 处理活动选择框的结果展示
                var activityViewNum = 0,
                  activityNodeViewNum = 0;
                angular.forEach(activityData.items, function(val, key) {
                  if ((val.campaignId && val.nodeId) || (val.campaignName && val.nodeName)) {
                    activityNodeViewNum++;
                  } else if (val.campaignId || val.campaignName) {
                    activityViewNum++;
                  }
                });

                if (activityViewNum == 0 && activityNodeViewNum == 0) {
                  $scope.activityLength = "";
                } else if (activityViewNum == 0 && activityNodeViewNum != 0) {
                  $scope.activityLength = "已经选" + activityNodeViewNum + "个节点";
                } else if (activityViewNum != 0 && activityNodeViewNum == 0) {
                  $scope.activityLength = "已经选" + activityViewNum + "个活动";
                } else if (activityViewNum != 0 && activityNodeViewNum != 0) {
                  $scope.activityLength = "已经选" + activityViewNum + "个活动," + activityNodeViewNum + "个节点";
                }
              };

            });
          }],
        link: function(scope, elem, attrs) {

          //活动选择器载入
          scope.selectefActivity = function() {
            scope.commPlugSrc = GLOBAL_STATIC.rootModule + "/modules/activitySelector/index.html?_=" + new Date().getTime();
          };
          scope.openActivityPop = function() { // 弹框调用
            if (scope.tfilterFindObj) { // 查询节点调取弹框
              elem.find(".commActivityPlug").addInteractivePop({
                magTitle: "请选择营销活动",
                width: 1000,
                mark: false,
                position: "fixed",
                childElePop: true
              });
            } else {
              elem.find(".commActivityPlug").addInteractivePop({
                magTitle: "请选择营销活动",
                width: 1000,
                mark: true,
                position: "fixed"
              });
            }
          };

          scope.getSelectedActivity = function(selectedActivityData, activityId) { // 活动选择器确认 返回数据
            scope.disposeActivityInputView(selectedActivityData);
            scope.activityId = activityId;
          };

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
                scope.operator = scope.data.configs['DateType'][0];
                clearDate1();
              } else if (val == "relatively") {
                scope.operator = scope.data.configs['DateType'][0];
                scope.isDay = 'true';
                scope.numcount = 3650;
                clearDate2();
              }
            }
          });
          //相对时间天or月
          scope.$watch('isDay', function(val, oldVal) {
            if (oldVal != undefined && oldVal != val) {
              clearDate2();
              if (val == "true") {
                scope.numcount = 3650;
              } else {
                scope.numcount = 120;
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
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '天';
                } else {
                  value.interval = scope.dayOrMonthInput1 + '';
                  value.dimension = '月';
                  value.day = scope.dayInput1;
                }
              }
            }
            value.fillActivityValue = scope.activityLength; // 活动选择器input展示内容
            value.storeActivityId = scope.activityId; // 储存选择器id传给后台
            // console.log('营销成功', value);
            return value;
          };

          //绝对时间清除操作
          function clearDate1() {
            scope.dateInput1 = '';
            scope.dateInput2 = '';
          }

          //相对时间清除操作
          function clearDate2() {
            scope.dayInput1 = '';
            scope.dayInput2 = '';
            scope.dayOrMonthInput1 = '';
            scope.dayOrMonthInput2 = '';
          }

          //相对时间天or月选择
          function clearDate3() {
            scope.dayInput1 = '';
            scope.dayInput2 = '';
          }
        }
      };
    }]);

  //外部数据导入
  app.directive('importBatchData', ['$compile', '$parse', "getListService",
    function($compile, $parse, getListService) {
      return {
        controller: ['$scope',
          function($scope) {
            $scope.asyncDefaultData.then(function() {
              $scope.defaulteDataBatchAry = [];
              $scope.dataBatchNum = "";
              if ($scope.data.values) { // 编辑
                $scope.defaulteDataBatchAry = $scope.data.values.value ? $scope.data.values.value.slice() : [];
                $scope.dataBatchNum = "已经选" + $scope.defaulteDataBatchAry.length + "个批次数据";
              }
            });
            $scope.$watch('defaulteDataBatchAry', function(nVal, o) {
              if (nVal.length > 0) {
                $scope.dataBatchNum = "已经选" + $scope.defaulteDataBatchAry.length + "个批次数据";
              }
            });
          }],
        link: function(scope, elem, attrs) {
          //选择框改变
          scope.selectedDataBatch = function() {
            scope.commPlugDataBatchSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/dataBatchImport.html?_=" + new Date().getTime();
          };
          //选择器弹框调用
          scope.openDataBatchPop = function() {
            if (scope.tfilterFindObj) { // 查询节点调取弹框
              elem.find(".commActivityPlug").addInteractivePop({
                magTitle: "请选择导入批次",
                width: 900,
                mark: false,
                position: "fixed",
                childElePop: true
              });
            } else { // 客户分组
              elem.find(".commActivityPlug").addInteractivePop({
                magTitle: "请选择导入批次",
                width: 926,
                mark: true,
                position: "fixed"
              });
            }
          }

          //获取保存到服务器的values
          scope.getSubmitValue = function() {
            var storeAry = [];
            angular.forEach(scope.defaulteDataBatchAry, function(val, key) {
              storeAry.push(val);
            });

            var value = {
              "value": storeAry.slice()
            };
            return value;
          };
        }
      };
    }
  ]);
  /*营销历史查询类型 end*/

  /* 积分到期时间 */
  app.directive('integralType', ['$compile', '$parse', function($compile, $parse) {
    // Runs during compile
    return {
      controller: ['$scope',
        function($scope) {
          $scope.asyncDefaultData.then(function() {
            var defaultVal;
            //打开节点，同时带有默认值
            $scope.dirValueListMarket = [{"value": "月", "id": "false"}, {"value": "天", "id": "true"}];
            $scope.dirList = [{"value": "前", "id": "0"}, {"value": "后", "id": "1"}];
            if ($scope.data.values) {
              defaultVal = $scope.data.values;
              $scope.operator = defaultVal.operator;
              $scope.isRelativeDisable = $scope.data.configs['DateSupportRelative'][0] == "Support" ? false : true;
              $scope.dateType = defaultVal.type;
              $scope.configDirType = defaultVal.direction == "前" ? "0" : "1"//默认前
              if ($scope.dateType == "absolutely") {
                if ($scope.operator == '介于') {
                  $scope.dateInput1 = defaultVal.value.split(',')[0];
                  $scope.dateInput2 = defaultVal.value.split(',')[1];
                } else {
                  $scope.dateInput1 = defaultVal.value;
                }
              } else if ($scope.dateType == "relatively") {
                var value = defaultVal;
                $scope.dimension = value.dimension;
                $scope.isDay = $scope.dimension == "天" ? 'true' : 'false';
                if ($scope.operator == "介于") {
                  if ($scope.isDay == 'true') {
                    $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                    $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                    $scope.numcount = 3650;
                  } else {
                    $scope.dayOrMonthInput1 = value.interval.split(',')[0];
                    $scope.dayOrMonthInput2 = value.interval.split(',')[1];
                    $scope.dayInput1 = value.day.split(',')[0];
                    $scope.dayInput2 = value.day.split(',')[1];
                    $scope.numcount = 120;
                  }
                } else {
                  if ($scope.isDay == 'true') {
                    $scope.dayOrMonthInput1 = value.interval;
                    $scope.numcount = 3650;
                  } else {
                    $scope.dayOrMonthInput1 = value.interval;
                    $scope.dayInput1 = value.day;
                    $scope.numcount = 120;
                  }
                }
              }
              ;
              $scope.integralNumOperator = defaultVal.integralOperator;
              if ($scope.IntegralNumOperator == "介于") {
                $scope.joinIntegralNum = defaultVal.integralValue.split(',')[0];
                $scope.joinIntegralNumTwo = defaultVal.integralValue.split(',')[1];
              } else {
                $scope.joinIntegralNum = defaultVal.integralValue;
              }
            } else {
              //从服务器获取的值
              $scope.operator = $scope.data.configs['DateType'][0];
              $scope.integralNumOperator = $scope.data.configs['IntegralType'][0];
              $scope.joinIntegralNum = "";
              $scope.joinIntegralNumTwo = "";
              $scope.dateType = "absolutely";
              //相对时间,默认'日'
              $scope.isDay = 'true';
              $scope.numcount = 3650;
              $scope.configDirType = "0";//默认前
              //是否可以点击"相对时间""
              $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['DateSupportRelative'][0] == 'Support' ? false : true;
            }
            ;
          });
        }],
      link: function(scope, elem, attrs, ctrl) {
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

        //选择框改变活动次数
        scope.$watch('integralNumOperator', function(val, oldVal) {
          //每次切换的时候清空
          if (oldVal != undefined && oldVal != val) {
            scope.joinIntegralNum = '';
            scope.joinIntegralNumTwo = '';
          }
          if (val == "介于") {
            scope.isIntegralMid = true;
          } else {
            scope.isIntegralMid = false;
          }
        });

        //绝对时间or相对时间
        scope.$watch('dateType', function(val, oldVal) {
          if (oldVal != undefined && oldVal != val) {
            if (val == "absolutely") {
              scope.operator = scope.data.configs['DateType'][0];
              clearDate1();
            } else if (val == "relatively") {
              scope.operator = scope.data.configs['DateType'][0];
              scope.isDay = 'true';
              scope.numcount = 3650;
              clearDate2();
            }
          }
        });
        //相对时间天or月
        scope.$watch('isDay', function(val, oldVal) {
          if (oldVal != undefined && oldVal != val) {
            clearDate2();
            if (val == "true") {
              scope.numcount = 3650;
            } else {
              scope.numcount = 120;
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
            value.direction = scope.configDirType == "0" ? "前" : "后";
            if (scope.operator == "介于") {
              if (scope.isDay == 'true') {
                value.dimension = '天';
              } else {
                value.dimension = '月';
                value.day = scope.dayInput1 + ',' + scope.dayInput2;
              }
              // mdd
              if (scope.configDirType == "0") {
                if (+scope.dayOrMonthInput1 < +scope.dayOrMonthInput2) {
                  var inputa1 = scope.dayOrMonthInput1;
                  scope.dayOrMonthInput1 = scope.dayOrMonthInput2;
                  scope.dayOrMonthInput2 = inputa1;
                }

              } else {
                if (+scope.dayOrMonthInput1 > +scope.dayOrMonthInput2) {
                  var inputa11 = scope.dayOrMonthInput1;
                  scope.dayOrMonthInput1 = scope.dayOrMonthInput2;
                  scope.dayOrMonthInput2 = inputa11;
                }
              }
              value.interval = scope.dayOrMonthInput1 + ',' + scope.dayOrMonthInput2;

            } else {
              if (scope.isDay == 'true') {
                value.interval = scope.dayOrMonthInput1 + '';
                value.dimension = '天';
              } else {
                value.interval = scope.dayOrMonthInput1 + '';
                value.dimension = '月';
                value.day = scope.dayInput1;
              }
            }
          }
          value.integralOperator = scope.integralNumOperator;
          if (scope.integralNumOperator == "介于") {
            value.integralValue = scope.joinIntegralNum + "," + scope.joinIntegralNumTwo;
          } else {
            value.integralValue = scope.joinIntegralNum;
          }
          ;
          return value;
        };

        //绝对时间清除操作
        function clearDate1() {
          scope.dateInput1 = '';
          scope.dateInput2 = '';
        }

        //相对时间清除操作
        function clearDate2() {
          scope.dayInput1 = '';
          scope.dayInput2 = '';
          scope.dayOrMonthInput1 = '';
          scope.dayOrMonthInput2 = '';
        }

        //相对时间天or月选择
        function clearDate3() {
          scope.dayInput1 = '';
          scope.dayInput2 = '';
        }
      }
    };
  }]);
  /* 积分到期时间 end*/

  app.directive('universalSelect', ['newSelectorShops', 'universalSelector', function(newSelectorShops, universalSelector) {
    return {
      // controller
      controller: ['$scope', function($scope) {
        var config = {};
        var shops = [];
        var selectedValus = [];

        $scope.selectedValues = '';

        /**
         * 同步数据
         */
        $scope.asyncDefaultData.then(function() {
          var type = $scope.selectorType;
          var values = $scope.data.values;
          if (values && Object.keys(values).length > 0) {
            for (var attr in values) {
              var item = {};
              item[attr] = values[attr];
              selectedValus.push(item);
            }
            switch (type) {
              case 'shop':
                // shops = selectedValus.map(function(shop) {
                //   var key = Object.keys(shop)[0];
                //   var result = {};
                //
                //   result[key] = shop[key];
                //
                //   return result;
                // });
                console.log('selectedValus');
                console.log(selectedValus);
                shops = selectedValus.map(function(value) {
                  var key = Object.keys(value)[0];
                  return {
                    shopId: key,
                    shopName: value[key]
                  };
                })
                console.log('shops');
                console.log(shops);
                break;
                break;
              default:
                break;
            }

            $scope.selectedValues = selectedValus.map(function(value) {
              var key = Object.keys(value)[0];
              return value[key];
            }).join(',');
          }
        });

        /**
         * 调用相关选择器
         */
        $scope.openSelector = function() {
          var type = $scope.selectorType;

          switch (type) {
            case 'shop':
              config.queryParams = {
                tenantId: CAMPAIGN_STATIC.tenantId,
                platCode: $scope.tfilterFindObj.subjectCode
              };

              newSelectorShops({ // 属性查询节点 店铺选择器
                type: 'shop',
                config: config,
                shops: shops
              }).then(function(res) {
                shops = angular.copy(res.shops);

                selectedValus = shops.map(function(shop) {
                  var result = {};

                  result[shop.shopId] = shop.shopName;

                  return result;
                });

                $scope.selectedValues = shops.map(function(shop) {
                  return shop.shopName;
                });

                config = res.config;
              });
              break;
            case 'city':
            case 'area':
              universalSelector({
                type: type,
                title: '选择器',
                items: angular.copy(selectedValus)
              }).then(function(items) {
                selectedValus = angular.copy(items);
                $scope.selectedValues = selectedValus.map(function(item) {
                  var key = Object.keys(item)[0];

                  return item[key];
                });
              });
              break;
          }
        }

        /**
         * 获取保存到服务器的values
         */
        $scope.getSubmitValue = function() {
          var postData = {};
          selectedValus.map(function(item) {
            var key = Object.keys(item)[0];
            postData[key] = item[key];
          });
          console.log(postData);
          return postData;
        };
      }],

      // Link function
      link: function(scope, elem, attrs) {
        scope.selectorType = {
          "Usual Store": 'shop',
          "店铺": 'shop',
          "开卡门店": 'shop',
          "销售门店": 'shop',
          "Usual Store Region": 'city',
          "开卡城市": 'city',
          "销售城市": 'city',
          "Usual Store Zone": 'area',
          "开卡大区": 'area',
          "销售大区": 'area'
        }[attrs.universalSelect];
      }
    };
  }]);

})(window, angular, undefined);
