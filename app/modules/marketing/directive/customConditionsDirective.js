//行为自定义 订单查询指令
(function(window, angular, undefined) {
    var app = angular.module('campaign.controllers');
    app.directive({
        "customTemplateInit": ['$compile', '$q', '$templateCache', 'customConditionsService', '$parse',
            function($compile, $q, $templateCache, customConditionsService, $parse) { //初始化模板
                return {
                    controller: ['$http', '$scope', '$sce',
                        function($http, $scope, $sce) {
                            // 安全插入html
                            $scope.deliberatelyTrustDangerousSnippet = function(snippet) {
                                return $sce.trustAsHtml(snippet);
                            };
                            angular.forEach(customTemplates, function(val, key) { //缓存模板
                                $templateCache.put(val.customType, val.template);
                            });
                            var storeCustomScope = [],
                                storeCustomIndicatorScope = [];
                            $scope.isToggleConditionsAreaShow = false; // 展开是否显示
                            var _this = this;
                            _this.createScope = function(data) { //创建条件新scope，储存数据
                                var newCustomScope = $scope.$new();
                                newCustomScope.data = data;
                                storeCustomScope.push(newCustomScope);
                                return newCustomScope;
                            };
                            _this.createIndicatorScope = function(data) { //创建指标新scope，储存数据
                                var newCustomScope = $scope.$new();
                                newCustomScope.data = data;
                                storeCustomIndicatorScope.push(newCustomScope);
                                return newCustomScope;
                            };
                            _this.setElementLayout = function(data, lay) {
                                //if(data.length<1){return false;}
                                var curScopeData;
                                for (var i = 1; i <= 15; i++) { //循环设定位子
                                    var forEachFlag = false,
                                        curEleTemplate;
                                    angular.forEach(data, function(v, k) { //定位Y轴
                                        if (v.posY == i) {
                                            forEachFlag = true;
                                            curEleTemplate = $compile($($templateCache.get("custom" + v.type)));
                                            curScopeData = $.extend(true, {},
                                                v);
                                            return;
                                        }
                                    });
                                    if (!forEachFlag) {
                                        curEleTemplate = $compile($($templateCache.get("customvisibility"))); //占位子元素
                                        curScopeData = $.extend(true, {}, {
                                            posY: i
                                        });
                                    };
                                    var layCurScope = _this.createScope(curScopeData);
                                    curEleTemplate(layCurScope, function(viewElement) { //重新添加编译
                                        if (lay == "areaOne") {
                                            angular.element(".conditionLayoutWidth45").append(viewElement);
                                        } else if (lay == "areaTwo") {
                                            angular.element(".conditionLayoutWidth30").append(viewElement);
                                        } else if (lay == "areaThree") {
                                            angular.element(".conditionLayoutWidth25").append(viewElement);
                                        }
                                    });
                                }
                            };
                            _this.addCustomCondition = function(data) {
                                /*
                                 * 处理数据，转化成 {"areaOne":[{},{}],"areaTwo":[{},{}],"areaThree":[{},{}]}———分成三块（左、中、右）布局
                                 */
                                var areaStoreBox = {
                                    "areaOne": [],
                                    "areaTwo": [],
                                    "areaThree": []
                                };
                                angular.forEach(data, function(val, key) { //0-左边，1-中间，2—右边
                                    if (val.posX == 0) {
                                        areaStoreBox.areaOne.push(val);
                                    } else if (val.posX == 1) {
                                        areaStoreBox.areaTwo.push(val);
                                    } else if (val.posX == 2) {
                                        areaStoreBox.areaThree.push(val);
                                    }
                                    if (val.posY > 5) {
                                        $scope.isToggleConditionsAreaShow = true
                                    }
                                });
                                angular.forEach(areaStoreBox, function(data, layout) {
                                    _this.setElementLayout(data, layout);
                                });
                            };
                            /*添加指标 start*/
                            var labelCount = 0;
                            _this.addLabelCondition = function(data, curId, configListData) { // 类型数据、默认类型项ID、已配置的数据
                                labelCount++;
                                var curLabelScopeData = data.slice(); //数组形式
                                var curLabelTemplate = $compile($($templateCache.get("customcommLabelTemplate")));
                                var labelCurScope = _this.createIndicatorScope(curLabelScopeData);
                                labelCurScope.index = labelCount;
                                labelCurScope.type = "指标";
                                angular.forEach(data, function(v, k) { //设置默认项
                                    if (v.id == curId) {
                                        labelCurScope.curLabeloperator = v;
                                    };
                                });
                                if (configListData) { // 编辑重新填充值的数据
                                    labelCurScope.curDefaultData = configListData;
                                }
                                curLabelTemplate(labelCurScope, function(labelElement) {
                                    angular.element(".secondLayout .indicatorListBox").append(labelElement);
                                    labelElement[0].scrollIntoView();
                                });
                            };
                            //删查指标
                            _this.removeIndicatorScope = function(index) {
                                labelCount--;
                                for (var i = index; i < storeCustomIndicatorScope.length; i++) {
                                    storeCustomIndicatorScope[i].index = storeCustomIndicatorScope[i].index - 1;
                                }
                                var scope = storeCustomIndicatorScope.splice((index - 1), 1)[0];
                                scope.$destroy();
                            };
                            /*添加指标 end*/
                            /*获取scope数据start*/
                            _this.getAllCustomDatas = function() {
                                var customRequestObj = {
                                        "attribute": [],
                                        "index": []
                                    }
                                    //获取配置属性数据
                                angular.forEach(storeCustomScope, function(custom, key) {
                                    if (custom.data.name && custom.getCustomValue) { //有配置才获取值、占位元素忽略
                                        var storeData = {
                                            "id": "",
                                            "queryItemId": custom.data.id || "",
                                            "type": custom.data.type,
                                            "posX": custom.data.posX,
                                            "posY": custom.data.posY
                                        };
                                        storeData.values = custom.getCustomValue();
                                        //storeData.data=custom.data;看保存的处理
                                        customRequestObj.attribute.push(storeData);
                                    };
                                });
                                //获取配置指标数据
                                angular.forEach(storeCustomIndicatorScope, function(indicator, key) {
                                    var storeIndicatorData = indicator.getCustomIndicatorValue();
                                    //storeData.data=custom.data;看保存的处理
                                    customRequestObj.index.push(storeIndicatorData);
                                });
                                return customRequestObj;
                            };
                            /*获取scope数据end*/
                        }
                    ],
                    link: function(scope, element, attr, ctrl) {
                        var defaultIndicatorLists = '',
                            defaultIndicatorId = ''; //储存指标list和默认指标id
                        /*打开请求数据并填充start*/
                        if (!scope.editorCustomFalg) { //新建自定义条件
                            customConditionsService.getCustomInitData(scope.customDragCurId, function(response) {
                                scope.customerTemplateLoadingFlag = false;
                                /*设置全局参数start*/
                                scope.customObj.globalLists = response.globle ? response.globle : [];
                                scope.customObj.customTimeType = "absolutely";
                                /*设置全局参数end*/
                                /*指标关系*/
                                scope.customObj.curLabelRelationship = response.indexRelation && response.indexRelation == "AND" ? "并且" : "或者";
                                //scope.customTimeType=response.timeType;
                                var attributeResponse = response.attribute ? response.attribute : [];
                                if (attributeResponse) { //初始化条件配置
                                    ctrl.addCustomCondition(response.attribute);
                                } else {

                                };
                                /*初始化指标start*/
                                if (response.index && response.index.length > 0) {
                                    ctrl.addLabelCondition(response.index, response.defaultIndex); //显示list表，和默认显示项的ID
                                    defaultIndicatorLists = response.index.slice();
                                    defaultIndicatorId = response.defaultIndex;
                                }
                                /*初始化指标end*/
                            });
                        } else { //编辑自定义条件
                            customConditionsService.editorCustomConditions(scope.customDragCurId, function(response) {
                                scope.customerTemplateLoadingFlag = false;
                                /*设置全局参数start*/
                                scope.customObj.globalLists = response.globle ? response.globle : [];
                                scope.customObj.customTimeType = "absolutely";
                                /*设置全局参数end*/
                                /*指标关系*/
                                scope.customObj.curLabelRelationship = response.indexRelation && response.indexRelation == "AND" ? "并且" : "或者";
                                //scope.customTimeType=response.timeType;
                                var attributeResponse = response.attribute ? response.attribute : [];
                                if (attributeResponse) { //初始化条件配置
                                    ctrl.addCustomCondition(response.attribute);
                                } else {

                                };
                                /*初始化指标start*/
                                if (response.index && response.index.length > 0) {
                                    if (response.configs && response.configs.length > 0) { // 有无以保存的指标配置
                                        angular.forEach(response.configs,
                                            function(val, key) {
                                                ctrl.addLabelCondition(response.index, val.queryItemId, val); // 循环指标数
                                            });
                                    } else {
                                        ctrl.addLabelCondition(response.index, response.defaultIndex); //显示list表，和默认显示项的ID
                                    }
                                    defaultIndicatorLists = response.index.slice();
                                    defaultIndicatorId = response.defaultIndex;
                                }
                                /*初始化指标end*/
                            });
                        }
                        /*打开请求数据并填充end*/
                        /*添加指标*/
                        scope.addIndicator = function() {
                            ctrl.addLabelCondition(defaultIndicatorLists, defaultIndicatorId);
                        };
                        /*删除指标*/
                        scope.linkRemoveIndicatorScope = function(i) {
                            ctrl.removeIndicatorScope(i);
                        }

                        scope.getAllCustomDatas = function() {
                            return ctrl.getAllCustomDatas();
                        }
                    }
                }
            }
        ]
    });

    app.directive({
        "customOrderQueryTemplateInit": ['$compile', '$q', '$templateCache', 'customConditionsService', '$parse', function($compile, $q, $templateCache, customConditionsService, $parse) {
            //初始化模板
            return {
                controller: ['$http', '$scope', '$sce', function($http, $scope, $sce) {
                    // 安全插入html
                    $scope.deliberatelyTrustDangerousSnippet = function(snippet) {
                        return $sce.trustAsHtml(snippet);
                    };

                    angular.forEach(customTemplates, function(val, key) { //缓存模板
                        $templateCache.put(val.customType, val.template);
                    });
                    var storeCustomScope = [],
                        storeCustomIndicatorScope = [];
                    $scope.isToggleConditionsAreaShow = false; // 展开是否显示
                    var _this = this;
                    _this.createScope = function(data) { //创建条件新scope，储存数据
                        var newCustomScope = $scope.$new();
                        newCustomScope.data = data;
                        storeCustomScope.push(newCustomScope)
                        return newCustomScope;
                    };
                    _this.createIndicatorScope = function(data) { //创建指标新scope，储存数据
                        var newCustomScope = $scope.$new();
                        newCustomScope.data = data;
                        storeCustomIndicatorScope.push(newCustomScope)
                        return newCustomScope;
                    };
                    _this.setElementLayout = function(data, lay) {
                        //if(data.length<1){return false;}
                        var curScopeData;
                        for (var i = 1; i <= 15; i++) { //循环设定位子
                            var forEachFlag = false,
                                curEleTemplate;
                            angular.forEach(data, function(v, k) { //定位Y轴
                                if (v.posY == i) {
                                    forEachFlag = true;
                                    curEleTemplate = $compile($($templateCache.get("custom" + v.type)));
                                    curScopeData = $.extend(true, {}, v);
                                    // 迪卡侬
                                    curScopeData.platCode = $scope.tfilterFindObj.subjectCode;
                                    return;
                                }
                            });
                            if (!forEachFlag) {
                                curEleTemplate = $compile($($templateCache.get("customvisibility"))); //占位子元素
                                curScopeData = $.extend(true, {}, { posY: i });
                            };
                            var layCurScope = _this.createScope(curScopeData);
                            curEleTemplate(layCurScope, function(viewElement) { //重新添加编译
                                if (lay == "areaOne") {
                                    angular.element(".conditionLayoutWidth45").append(viewElement);
                                } else if (lay == "areaTwo") {
                                    angular.element(".conditionLayoutWidth30").append(viewElement);
                                } else if (lay == "areaThree") {
                                    angular. element(".conditionLayoutWidth25").append(viewElement);
                                }
                            });
                        }
                    };
                    _this.addCustomCondition = function(data) {
                        /*
                         * 处理数据，转化成 {"areaOne":[{},{}],"areaTwo":[{},{}],"areaThree":[{},{}]}———分成三块（左、中、右）布局
                         */
                        var areaStoreBox = {
                            "areaOne": [],
                            "areaTwo": [],
                            "areaThree": []
                        };
                        angular.forEach(data, function(val, key) { //0-左边，1-中间，2—右边
                            if (val.posX == 0) {
                                areaStoreBox.areaOne.push(val);
                            } else if (val.posX == 1) {
                                areaStoreBox.areaTwo.push(val);
                            } else if (val.posX == 2) {
                                areaStoreBox.areaThree.push(val);
                            }
                            if (val.posY > 5) { $scope.isToggleConditionsAreaShow = true }
                        });
                        angular.forEach(areaStoreBox, function(data, layout) {
                            _this.setElementLayout(data, layout);
                        });
                    };
                    /*添加指标 start*/
                    var labelCount = 0;
                    _this.addLabelCondition = function(data, curId, configListData) { // 类型数据、默认类型项ID、已配置的数据
                        labelCount++;
                        var curLabelScopeData = data.slice(); //数组形式
                        var curLabelTemplate = $compile($($templateCache.get("customcommLabelTemplate")));
                        var labelCurScope = _this.createIndicatorScope(curLabelScopeData);
                        labelCurScope.index = labelCount;
                        labelCurScope.type = "指标";
                        angular.forEach(data, function(v, k) { //设置默认项
                            if (v.id == curId) {
                                labelCurScope.curLabeloperator = v;
                            };
                        });
                        if (configListData) { // 编辑重新填充值的数据
                            labelCurScope.curDefaultData = configListData;
                        }
                        curLabelTemplate(labelCurScope, function(labelElement) {
                            angular.element(".secondLayout .indicatorListBox").append(labelElement);
                            labelElement[0].scrollIntoView();
                        });
                    };
                    //删查指标
                    _this.removeIndicatorScope = function(index) {
                        labelCount--;
                        for (var i = index; i < storeCustomIndicatorScope.length; i++) {
                            storeCustomIndicatorScope[i].index = storeCustomIndicatorScope[i].index - 1;
                        }
                        var scope = storeCustomIndicatorScope.splice((index - 1), 1)[0];
                        scope.$destroy();
                    };
                    /*添加指标 end*/
                    /*获取scope数据start*/
                    _this.getAllCustomDatas = function() {
                        var customRequestObj = {
                                "attribute": [],
                                "index": []
                            }
                            //获取配置属性数据
                        angular.forEach(storeCustomScope, function(custom, key) {
                            if (custom.data.name && custom.getCustomValue) { //有配置才获取值、占位元素忽略
                                var storeData = {
                                    "id": "",
                                    "queryItemId": custom.data.id || "",
                                    "type": custom.data.type,
                                    "posX": custom.data.posX,
                                    "posY": custom.data.posY
                                };
                                storeData.values = custom.getCustomValue();
                                //storeData.data=custom.data;看保存的处理
                                customRequestObj.attribute.push(storeData);
                            };
                        });
                        //获取配置指标数据
                        angular.forEach(storeCustomIndicatorScope, function(indicator, key) {
                            var storeIndicatorData = indicator.getCustomIndicatorValue();
                            //storeData.data=custom.data;看保存的处理
                            storeIndicatorData.showOrder = key;
                            customRequestObj.index.push(storeIndicatorData);
                        });
                        return customRequestObj;
                    };
                    /*获取scope数据end*/

                }],
                link: function(scope, element, attr, ctrl) {
                    var defaultIndicatorLists = '',
                        defaultIndicatorId = ''; //储存指标list和默认指标id
                    /*打开请求数据并填充start*/
                    if (!scope.editorCustomFalg) { //新建自定义条件
                        customConditionsService.getOrderQueryCustomInitData(scope.customDragCurId, function(response) {
                            scope.customerTemplateLoadingFlag = false;
                            /*设置全局参数start*/
                            scope.customObj.globalLists = response.globle ? response.globle : [];
                            scope.customObj.customTimeType = "absolutely";
                            /*设置全局参数end*/
                            /*指标关系*/
                            scope.customObj.curLabelRelationship = response.indexRelation && response.indexRelation == "AND" ? "并且" : "或者";
                            //scope.customTimeType=response.timeType;
                            var attributeResponse = response.attribute ? response.attribute : [];
                            if (attributeResponse) { //初始化条件配置
                                ctrl.addCustomCondition(response.attribute);
                            } else {

                            };
                            /*初始化指标start*/
                            if (response.index && response.index.length > 0) {
                                ctrl.addLabelCondition(response.index, response.defaultIndex); //显示list表，和默认显示项的ID
                                defaultIndicatorLists = response.index.slice();
                                defaultIndicatorId = response.defaultIndex;
                            }
                            /*初始化指标end*/
                        });
                    } else { //编辑自定义条件
                        customConditionsService.editorOrderQueryCustomConditions(scope.customDragCurId, function(response) {
                            scope.customerTemplateLoadingFlag = false;
                            /*设置全局参数start*/
                            scope.customObj.globalLists = response.globle ? response.globle : [];
                            scope.customObj.customTimeType = "absolutely";
                            /*设置全局参数end*/
                            /*指标关系*/
                            scope.customObj.curLabelRelationship = response.indexRelation && response.indexRelation == "AND" ? "并且" : "或者";
                            //scope.customTimeType=response.timeType;
                            var attributeResponse = response.attribute ? response.attribute : [];
                            if (attributeResponse) { //初始化条件配置
                                ctrl.addCustomCondition(response.attribute);
                            } else {

                            };
                            /*初始化指标start*/
                            if (response.index && response.index.length > 0) {
                                if (response.configs && response.configs.length > 0) { // 有无以保存的指标配置
                                    angular.forEach(response.configs, function(val, key) {
                                        ctrl.addLabelCondition(response.index, val.queryItemId, val); // 循环指标数
                                    });
                                } else {
                                    ctrl.addLabelCondition(response.index, response.defaultIndex); //显示list表，和默认显示项的ID
                                }
                                defaultIndicatorLists = response.index.slice();
                                defaultIndicatorId = response.defaultIndex;
                            }
                            /*初始化指标end*/
                        });
                    }
                    /*打开请求数据并填充end*/
                    /*添加指标*/
                    scope.addIndicator = function() {
                        ctrl.addLabelCondition(defaultIndicatorLists, defaultIndicatorId);
                    };
                    /*删除指标*/
                    scope.linkRemoveIndicatorScope = function(i) {
                        ctrl.removeIndicatorScope(i);
                    }

                    scope.getAllCustomDatas = function() {
                        return ctrl.getAllCustomDatas();
                    }
                }
            }

        }]
    });

  app.directive('commDataSelectorType', ['newSelectorShops', 'universalSelector', function(newSelectorShops, universalSelector) {
    return {
      // controller
      controller: ['$scope', function($scope) {
        var config = {};
        var shops = [];
        var selectedValus = [];
        // 第二次展示的view数据
        $scope.selectedValues = $scope.data && $scope.data.values && $scope.data.values.view && $scope.data.values.view.split(',') || [];
        setTimeout(function () {
          var shopsId = $scope.data && $scope.data.values && $scope.data.values.value && $scope.data.values.value.split(',') || [];
          var shopsName = $scope.data && $scope.data.values && $scope.data.values.view && $scope.data.values.view.split(',') || [];
          switch ($scope.selectorType) {
            case 'shop':
              shops = shopsId.map(function (item, index) {
                var result = {
                  shopId: item,
                  shopName: shopsName[index]
                };
                return result;
              });
              break;
            default:
              selectedValus = shopsId.map(function (item, index) {
                var result = {};
                result[item] = shopsName[index];
                return result;
              });
              break;
          }
        }, 10);
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

              newSelectorShops({ // 订单查询节点 店铺选择器
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
        $scope.getCustomValue = function() {
          var postData = {
            value: '',
            view: ''
          };
          var values = [];
          var views = [];
          selectedValus.map(function(item) {
            var key = Object.keys(item)[0];
            values.push(key);
            views.push(item[key]);
          });
          postData.value = values.join(',');
          postData.view = views.join(',');
          console.log(postData);
          return postData;
        };
      }],

      // Link function
      link: function(scope, elem, attrs) {
        if(attrs.commDataSelectorType === "店铺") {
          attrs.commDataSelectorType = "销售门店";
        }
        scope.selectorType = {
          "Event Store": 'shop',
          "Event Store Region": 'city',
          "Event Store Zone": 'area',
          "开卡门店": 'shop',
          "销售门店": 'shop',
          "开卡城市": 'city',
          "销售城市": 'city',
          "开卡大区": 'area',
          "销售大区": 'area'
        }[attrs.commDataSelectorType];
      }
    };
  }]);
    //类型指令
    app.directive({
        /*字符输入*/
        "customStringType": ['$compile', '$parse',
            function($compile, $parse) {
                return {
                    controller: ['$scope',
                        function($scope) { //$scope.data当前scope的数据
                            $scope.customStringInput = $scope.data.values ? $scope.data.values.value : "";
                        }
                    ],
                    link: function(scope, element, attr, ctrl) {
                        /*验证start*/
                        //"StringSpecialValidator":[Email IdentityCard Mobile 不验证 ]
                        scope.$watch('data.configs', function(val, oldVal) {
                            if (val == undefined) {
                                return;
                            }
                            //增加限制条件
                            var eleInput = element.find("input");
                            var setConfig = scope.data.configs;
                            if (setConfig.StringLengthLimit && setConfig.StringLengthLimit[0]) { //设置长度
                                eleInput.attr("maxLength", setConfig.StringLengthLimit[0]);
                            };
                            if (val.StringSpecialValidator && val.StringSpecialValidator[0] == "Email") {
                                eleInput.attr("email", true);
                            } else if (val.StringSpecialValidator && val.StringSpecialValidator[0] == "Mobile") {
                                eleInput.attr({
                                    "phone": true,
                                    "number": true
                                });
                            }
                        });
                        /*验证end*/

                        //获取每个scope的数据values
                        scope.getCustomValue = function() {
                            var value = {};
                            value.value = scope.customStringInput;
                            return value;
                        };
                    }
                }
            }
        ],
        /*
         *时间选择
         * $scope.numcount：月-max120，天—max3650，分-max6000
         */
      /*日期选择*/
      "customDateType": function() {
        return {
          "controller": ['$scope',
            function($scope) {
              //处理展示数据
              $scope.disponseTimeViewValue = function(val) {
                var returnViewValue = "";
                if (val.values.type == "absolutely" && val.values.value && !(/^,$/.test(val.values.value))) {
                  var valueAry = val.values.value.split(",");
                  angular.forEach(valueAry, function(val, key) {
                    if (val == "") {
                      valueAry[key] = "不限"
                    };
                  });
                  returnViewValue = valueAry.join("~");
                } else if (val.values.type == "relatively" && val.values.interval && val.values.interval != ",") {
                  var aryOne, aryTwo, aryThree;
                  var descriptionValue = val.values.direction;
                  aryOne = val.values.interval.split(",");
                  if (val.values.dimension == "月") {
                    aryTwo = val.values.day ? val.values.day.split(",") : [];
                    aryThree = val.values.time ? val.values.time.split(",") : [];
                    returnViewValue = (aryOne[0] ? (descriptionValue + aryOne[0] + "月" + aryTwo[0] + (aryTwo[0] ? ("号" + aryThree[0]) : "")) : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "月" + aryTwo[1] + (aryTwo[1] ? ("号" + aryThree[1]) : "")) : "不限");
                  } else if (val.values.dimension == "天") {
                    aryTwo = val.values.time ? val.values.time.split(",") : [];
                    returnViewValue = (aryOne[0] ? (descriptionValue + aryOne[0] + "天" + aryTwo[0]) : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "天" + aryTwo[1]) : "不限");
                  } else if (val.values.dimension == "分钟") {
                    returnViewValue = (aryOne[0] ? (descriptionValue + aryOne[0] + "分钟") : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "分钟") : "不限");
                  }
                }
                return returnViewValue;
              };

              //点击触发默认数据填充
              $scope.initPlugDataValues = function(defalutDatas) {
                var defaultVal = defalutDatas;
                angular.forEach($scope.timeTypeLists, function(val, key) {
                  if (val.type == defalutDatas.type) {
                    $scope.curTimeList = val;
                  }
                });
                $scope.configType = "0"; //默认前
                $scope.stringInput = defaultVal.value || "";
                if ($scope.curTimeList.type == "absolutely") {
                  $scope.dateInput1 = defaultVal.value.split(',')[0];
                  $scope.dateInput2 = defaultVal.value.split(',')[1];
                } else if ($scope.curTimeList.type == "relatively") {
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
                  $scope.configType = value.direction == "前" ? "0" : "1";
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
                }
              };

              $scope.timeTypeLists = [{
                "type": "absolutely",
                "value": "绝对日期"
              }, {
                "type": "relatively",
                "value": "相对日期"
              }];
              $scope.isMid = true; //默认介于，共用时间插件判断
              $scope.isStartValidateWatch = false; //是否开始验证监听
              console.log('$scope.data');
              console.log($scope.data);
              if (!$scope.data.values) { //　增加 ||　编辑
                $scope.curTimeList = $scope.timeTypeLists[0];
                $scope.subType = '0'; //相对时间,默认'月'
                $scope.configType = "0"; //默认前
                $scope.dateInput1 = "";
                $scope.dateInput2 = "";
                $scope.totleTimeValue = "";
                $scope.numcount = 120; // 月设置最大输入
                $scope.getSaveDefaultDatas = {
                  "type": $scope.curTimeList.type,
                  "value": ""
                };
              } else {
                $scope.getSaveDefaultDatas = $scope.data.values;
                $scope.totleTimeValue = $scope.disponseTimeViewValue($scope.data);
              }

            }
          ],
          "link": function(scope, element, attr, ctrl) {
            //选择框改变
            scope.editorTimeConditions = function() {
              scope.isStartValidateWatch = false;
              if (scope.getSaveDefaultDatas && (scope.getSaveDefaultDatas.value != "")) { // 编辑
                scope.initPlugDataValues(scope.getSaveDefaultDatas);
                scope.errorFlagOne = false;
                scope.errorFlagTwo = false;
              } else {
                scope.curTimeList = scope.timeTypeLists[0];
                clearDate1();
                clearDate2();
              }
              element.find(".timeSetBox").addInteractivePop({
                magTitle: "请设置条件",
                width: 300,
                height: 210,
                mark: false,
                position: "fixed",
                childElePop: true
              });
            };

            //监听前后类型
            scope.$watch("configType", function(newVal, oldVal) {
              if (oldVal != undefined && oldVal != newVal) {
                scope.errorFlagOne = false;
                scope.errorFlagTwo = false;
              }
            })

            //监听时间类型
            scope.$watch("curTimeList.type", function(newVal, oldVal) {
              if (oldVal != undefined && oldVal != newVal) {
                if (newVal == "absolutely") {
                  scope.subType = '0';
                } else if (newVal == "relatively") {
                  scope.subType = '1';
                  scope.numcount = 3650;
                }
                clearDate2();
                clearDate1();
              }
            })
            //监听月,天,秒切换
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

            //绝对时间清除操作
            function clearDate1() {
              scope.dateInput1 = '';
              scope.dateInput2 = '';
              scope.errorFlagOne = false;
              scope.errorFlagTwo = false;
              element.find(".absoluteInputClass").val("");
            }
            //相对时间清除操作
            function clearDate2() {
              scope.timeInput1 = '';
              scope.timeInput2 = '';
              scope.dayInput1 = '';
              scope.dayInput2 = '';
              scope.errorFlagOne = false;
              scope.errorFlagTwo = false;
              scope.errorInput1 = false;
              scope.errorInput2 = false;
              scope.errorInput3 = false;
              scope.errorInput4 = false;
              scope.errorInput5 = false;
              scope.errorInput6 = false;
              scope.monthOrDayOrSecondInput1 = '';
              scope.monthOrDayOrSecondInput2 = '';
            };
            //获取每个scope的数据values
            scope.getCustomValue = function() {
              return scope.getSaveDefaultDatas;
            };
            //获取已设置的条件
            scope.getSettingCustomValues = function() {
              var value = {};
              if (scope.curTimeList.type == "absolutely") { //根据global状态判断
                value.type = "absolutely";
                value.value = scope.dateInput1 + ',' + scope.dateInput2;
              } else if (scope.curTimeList.type == "relatively") {
                value.type = "relatively";
                value.direction = scope.configType == "0" ? "前" : "后";
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
              }
              return value;
            }
            //重置
            scope.clearSettingData = function() {
              clearDate1();
              clearDate2();
            }
            //确定
            scope.sureTimeTypeValue = function(e) {
              scope.isStartValidateWatch = true;
              changeErrorStyle("first");
              changeErrorStyle("last");
              if (!scope.errorFlagOne && !scope.errorFlagTwo) {
                isTrueInputValue()
              };
              if (scope.errorFlagOne || scope.errorFlagTwo) {
                return "验证未通过"
              };

              var obj = {
                values: scope.getSettingCustomValues()
              }
              scope.getSaveDefaultDatas = $.extend({}, true, scope.getSettingCustomValues());
              scope.totleTimeValue = scope.disponseTimeViewValue(obj);
              closestPopPlug(angular.element(e.target));
            }

            function closestPopPlug(element) {
              element.closest(".ccmsPublicPop").hide();
              if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
                if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
                  if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
                    element.closest(".commCustomConfigBox").find(".childElementMark").remove(); //class commCustomConfigBox 自定义属性 专属class
                  }
                } else {
                  angular.element(".ccmsPublicPop").find(".childElementMark").remove();
                }
              } else {
                angular.element(".yunat_maskLayer:last").remove();
              }
            }

            //验证填入的时间段是否合法
            function isTrueInputValue() {
              scope.errorInput1 = scope.errorInput2 = scope.errorInput3 = scope.errorInput4 = scope.errorInput5 = scope.errorInput6 = false;
              if (scope.configType == "1") { //"后"——验证
                if (scope.monthOrDayOrSecondInput1 != "" && scope.monthOrDayOrSecondInput2 != "") {
                  if (scope.monthOrDayOrSecondInput1 * 1 == scope.monthOrDayOrSecondInput2 * 1) {
                    if (scope.subType == "2") {
                      scope.errorInput1 = scope.errorInput4 = true;
                      scope.errorFlagOne = true;
                      scope.errorMessage = "请填写正确的区间的值";
                    } else {
                      if (scope.dayInput1 == scope.dayInput2) {
                        if (scope.timeInput1 >= scope.timeInput2) {
                          scope.errorFlagOne = true;
                          scope.errorInput3 = scope.errorInput6 = true;
                          scope.errorMessage = "请填写正确的区间的值";
                        } else {
                          scope.errorFlagOne = false;
                          scope.errorFlagTwo = false;
                          scope.errorMessage = "";
                        }
                      } else if (scope.dayInput1 * 1 > scope.dayInput2 * 1) {
                        scope.errorFlagOne = true;
                        scope.errorInput2 = scope.errorInput5 = true;
                        scope.errorMessage = "请填写正确的区间的值";
                      } else {
                        scope.errorFlagOne = false;
                        scope.errorFlagTwo = false;
                        scope.errorMessage = "";
                      }
                    }

                  } else if (((scope.monthOrDayOrSecondInput1 * 1 > scope.monthOrDayOrSecondInput2 * 1) && scope.subType != "2") || ((scope.monthOrDayOrSecondInput1 * 1 > scope.monthOrDayOrSecondInput2 * 1) && scope.subType == "2")) {
                    scope.errorInput1 = scope.errorInput4 = true;
                    scope.errorFlagOne = true;
                    scope.errorMessage = "请填写正确的区间的值";
                  } else {
                    scope.errorFlagOne = false;
                    scope.errorFlagTwo = false;
                    scope.errorMessage = "";
                  }
                }
              } else { // "前"——验证
                if (scope.monthOrDayOrSecondInput1 != "" && scope.monthOrDayOrSecondInput2 != "") {
                  if (scope.monthOrDayOrSecondInput1 == scope.monthOrDayOrSecondInput2) {
                    if (scope.subType == "2") {
                      scope.errorFlagOne = true;
                      scope.errorMessage = "请填写正确的区间的值";
                    } else {
                      if (scope.dayInput1 == scope.dayInput2) {
                        if (scope.timeInput1 >= scope.timeInput2) {
                          scope.errorInput3 = scope.errorInput6 = true;
                          scope.errorFlagOne = true;
                          scope.errorMessage = "请填写正确的区间的值";
                        } else {
                          scope.errorFlagOne = false;
                          scope.errorFlagTwo = false;
                          scope.errorMessage = "";
                        }
                      } else if (scope.dayInput1 * 1 > scope.dayInput2 * 1) {
                        scope.errorInput2 = scope.errorInput5 = true;
                        scope.errorFlagOne = true;
                        scope.errorMessage = "请填写正确的区间的值";
                      } else {
                        scope.errorFlagOne = false;
                        scope.errorFlagTwo = false;
                        scope.errorMessage = "";
                      }
                    }

                  } else if (((scope.monthOrDayOrSecondInput1 * 1 < scope.monthOrDayOrSecondInput2 * 1) && (scope.subType != "2")) || ((scope.monthOrDayOrSecondInput1 * 1 < scope.monthOrDayOrSecondInput2 * 1) && (scope.subType == "2"))) {
                    scope.errorInput1 = scope.errorInput4 = true;
                    scope.errorFlagOne = true;
                    scope.errorMessage = "请填写正确的区间的值";
                  } else {
                    scope.errorFlagOne = false;
                    scope.errorFlagTwo = false;
                    scope.errorMessage = "";
                  }
                }
              }
            }

            //监听验证
            function changeErrorStyle(flag) {
              if (!scope.isStartValidateWatch) {
                return "不监听验证"
              };
              if (flag == "first") {
                if ((scope.monthOrDayOrSecondInput1 == "" && scope.dayInput1 == "" ) || (scope.monthOrDayOrSecondInput1 != "" && scope.dayInput1 != "" ) || (scope.monthOrDayOrSecondInput1 != "" && scope.subType == "1") || (scope.monthOrDayOrSecondInput1 != "" && scope.subType == "2")) {
                  scope.errorFlagOne = false;
                  scope.errorInput1 = false;
                  scope.errorInput2 = false;
                  scope.errorInput3 = false;
                } else {
                  if (scope.subType == "0") {
                    if (scope.monthOrDayOrSecondInput1 == "") {
                      scope.errorInput1 = true;
                    } else {
                      scope.errorInput1 = false;
                    };

                    if (scope.dayInput1 == "") {
                      scope.errorInput2 = true;
                    } else {
                      scope.errorInput2 = false;
                    };

                    scope.errorFlagOne = true;
                    scope.errorMessage = "请填写完整的值";
                  } else if (scope.subType == "1") {
                    if (scope.monthOrDayOrSecondInput1 == "") {
                      scope.errorInput1 = true;
                    } else {
                      scope.errorInput1 = false;
                    };
                    scope.errorFlagOne = true;
                    scope.errorMessage = "请填写完整的值";
                  }
                }
              } else if (flag == "last") {
                if ((scope.monthOrDayOrSecondInput2 == "" && scope.dayInput2 == "" ) || (scope.monthOrDayOrSecondInput2 != "" && scope.dayInput2 != "") || (scope.monthOrDayOrSecondInput2 != "" && scope.subType == "1") || (scope.monthOrDayOrSecondInput2 != "" && scope.subType == "2")) {
                  scope.errorFlagTwo = false;
                  scope.errorInput4 = false;
                  scope.errorInput5 = false;
                  scope.errorInput6 = false;
                } else {
                  if (scope.subType == "0") {
                    if (scope.monthOrDayOrSecondInput2 == "") {
                      scope.errorInput4 = true;
                    } else {
                      scope.errorInput4 = false;
                    };

                    if (scope.dayInput2 == "") {
                      scope.errorInput5 = true;
                    } else {
                      scope.errorInput5 = false;
                    };

                    scope.errorFlagTwo = true;
                    scope.errorMessage = "请填写完整的值";
                  } else if (scope.subType == "1") {
                    if (scope.monthOrDayOrSecondInput2 == "") {
                      scope.errorInput4 = true;
                    } else {
                      scope.errorInput4 = false;
                    };

                    scope.errorFlagTwo = true;
                    scope.errorMessage = "请填写完整的值";
                  }
                }
              }
            }

            scope.$watch("monthOrDayOrSecondInput1", function(nVal, oVal) {
              if (oVal != undefined) {
                changeErrorStyle("first");
              }
            });

            scope.$watch("dayInput1", function(nVal, oVal) {
              if (oVal != undefined) {
                changeErrorStyle("first");
              }
            });

            scope.$watch("timeInput1", function(nVal, oVal) {
              if (oVal != undefined) {
                changeErrorStyle("first");
              }
            });

            scope.$watch("monthOrDayOrSecondInput2", function(nVal, oVal) {
              if (oVal != undefined) {
                changeErrorStyle("last");
              }
            });

            scope.$watch("dayInput2", function(nVal, oVal) {
              if (oVal != undefined) {
                changeErrorStyle("last");
              }
            });

            scope.$watch("timeInput2", function(nVal, oVal) {
              if (oVal != undefined) {
                changeErrorStyle("last");
              }
            });

          }
        }
      },
      /*时间选择*/
        "customTimeType": function() {
            return {
                "controller": ['$scope',
                    function($scope) {
                        //处理展示数据
                        $scope.disponseTimeViewValue = function(val) {
                            var returnViewValue = "";
                            if (val.values.type == "absolutely" && val.values.value && !(/^,$/.test(val.values.value))) {
                                var valueAry = val.values.value.split(",");
                                angular.forEach(valueAry, function(val, key) {
                                    if (val == "") {
                                        valueAry[key] = "不限"
                                    };
                                });
                                returnViewValue = valueAry.join("~");
                            } else if (val.values.type == "relatively" && val.values.interval && val.values.interval != ",") {
                                var aryOne, aryTwo, aryThree;
                                var descriptionValue = val.values.direction;
                                aryOne = val.values.interval.split(",");
                                if (val.values.dimension == "月") {
                                    aryTwo = val.values.day ? val.values.day.split(",") : [];
                                    aryThree = val.values.time ? val.values.time.split(",") : [];
                                    returnViewValue = (aryOne[0] ? (descriptionValue + aryOne[0] + "月" + aryTwo[0] + (aryTwo[0] ? ("号" + aryThree[0]) : "")) : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "月" + aryTwo[1] + (aryTwo[1] ? ("号" + aryThree[1]) : "")) : "不限");
                                } else if (val.values.dimension == "天") {
                                    aryTwo = val.values.time ? val.values.time.split(",") : [];
                                    returnViewValue = (aryOne[0] ? (descriptionValue + aryOne[0] + "天" + aryTwo[0]) : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "天" + aryTwo[1]) : "不限");
                                } else if (val.values.dimension == "分钟") {
                                    returnViewValue = (aryOne[0] ? (descriptionValue + aryOne[0] + "分钟") : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "分钟") : "不限");
                                }
                            }
                            return returnViewValue;
                        };

                        //点击触发默认数据填充
                        $scope.initPlugDataValues = function(defalutDatas) {
                            var defaultVal = defalutDatas;
                            angular.forEach($scope.timeTypeLists, function(val, key) {
                                if (val.type == defalutDatas.type) {
                                    $scope.curTimeList = val;
                                }
                            });
                            $scope.configType = "0"; //默认前
                            $scope.stringInput = defaultVal.value || "";
                            if ($scope.curTimeList.type == "absolutely") {
                                $scope.dateInput1 = defaultVal.value.split(',')[0];
                                $scope.dateInput2 = defaultVal.value.split(',')[1];
                            } else if ($scope.curTimeList.type == "relatively") {
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
                                $scope.configType = value.direction == "前" ? "0" : "1";
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
                            }
                        };

                        $scope.timeTypeLists = [{
                            "type": "absolutely",
                            "value": "绝对时间"
                        }, {
                            "type": "relatively",
                            "value": "相对时间"
                        }];
                        $scope.isMid = true; //默认介于，共用时间插件判断
                        $scope.isStartValidateWatch = false; //是否开始验证监听
                        if (!$scope.data.values) { //　增加 ||　编辑
                            $scope.curTimeList = $scope.timeTypeLists[0];
                            $scope.subType = '0'; //相对时间,默认'月'
                            $scope.configType = "0"; //默认前
                            $scope.dateInput1 = "";
                            $scope.dateInput2 = "";
                            $scope.totleTimeValue = "";
                            $scope.numcount = 120; // 月设置最大输入
                            $scope.getSaveDefaultDatas = {
                                "type": $scope.curTimeList.type,
                                "value": ""
                            };
                        } else {
                            $scope.getSaveDefaultDatas = $scope.data.values;
                            $scope.totleTimeValue = $scope.disponseTimeViewValue($scope.data);
                        }

                    }
                ],
                "link": function(scope, element, attr, ctrl) {
                    //选择框改变
                    scope.editorTimeConditions = function() {
                        scope.isStartValidateWatch = false;
                        if (scope.getSaveDefaultDatas && (scope.getSaveDefaultDatas.value != "")) { // 编辑
                            scope.initPlugDataValues(scope.getSaveDefaultDatas);
                            scope.errorFlagOne = false;
                            scope.errorFlagTwo = false;
                        } else {
                            scope.curTimeList = scope.timeTypeLists[0];
                            clearDate1();
                            clearDate2();
                        }
                        element.find(".timeSetBox").addInteractivePop({
                            magTitle: "请设置条件",
                            width: 300,
                            height: 210,
                            mark: false,
                            position: "fixed",
                            childElePop: true
                        });
                    };

                    //监听前后类型
                    scope.$watch("configType", function(newVal, oldVal) {
                        if (oldVal != undefined && oldVal != newVal) {
                            scope.errorFlagOne = false;
                            scope.errorFlagTwo = false;
                        }
                    })

                    //监听时间类型
                    scope.$watch("curTimeList.type", function(newVal, oldVal) {
                            if (oldVal != undefined && oldVal != newVal) {
                                if (newVal == "absolutely") {
                                    scope.subType = '0';
                                } else if (newVal == "relatively") {
                                    scope.subType = '1';
                                    scope.numcount = 3650;
                                }
                                clearDate2();
                                clearDate1();
                            }
                        })
                        //监听月,天,秒切换
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

                    //绝对时间清除操作
                    function clearDate1() {
                        scope.dateInput1 = '';
                        scope.dateInput2 = '';
                        scope.errorFlagOne = false;
                        scope.errorFlagTwo = false;
                        element.find(".absoluteInputClass").val("");
                    }
                    //相对时间清除操作
                    function clearDate2() {
                        scope.timeInput1 = '';
                        scope.timeInput2 = '';
                        scope.dayInput1 = '';
                        scope.dayInput2 = '';
                        scope.errorFlagOne = false;
                        scope.errorFlagTwo = false;
                        scope.errorInput1 = false;
                        scope.errorInput2 = false;
                        scope.errorInput3 = false;
                        scope.errorInput4 = false;
                        scope.errorInput5 = false;
                        scope.errorInput6 = false;
                        scope.monthOrDayOrSecondInput1 = '';
                        scope.monthOrDayOrSecondInput2 = '';
                    };
                    //获取每个scope的数据values
                    scope.getCustomValue = function() {
                        return scope.getSaveDefaultDatas;
                    };
                    //获取已设置的条件
                    scope.getSettingCustomValues = function() {
                            var value = {};
                            if (scope.curTimeList.type == "absolutely") { //根据global状态判断
                                value.type = "absolutely";
                                value.value = scope.dateInput1 + ',' + scope.dateInput2;
                            } else if (scope.curTimeList.type == "relatively") {
                                value.type = "relatively";
                                value.direction = scope.configType == "0" ? "前" : "后";
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
                            }
                            return value;
                        }
                        //重置
                    scope.clearSettingData = function() {
                            clearDate1();
                            clearDate2();
                        }
                        //确定
                    scope.sureTimeTypeValue = function(e) {
                        scope.isStartValidateWatch = true;
                        changeErrorStyle("first");
                        changeErrorStyle("last");
                        if (!scope.errorFlagOne && !scope.errorFlagTwo) {
                            isTrueInputValue()
                        };
                        if (scope.errorFlagOne || scope.errorFlagTwo) {
                            return "验证未通过"
                        };

                        var obj = {
                            values: scope.getSettingCustomValues()
                        }
                        scope.getSaveDefaultDatas = $.extend({}, true, scope.getSettingCustomValues());
                        scope.totleTimeValue = scope.disponseTimeViewValue(obj);
                        closestPopPlug(angular.element(e.target));
                    }

                    function closestPopPlug(element) {
                        element.closest(".ccmsPublicPop").hide();
                        if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
                            if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
                                if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
                                    element.closest(".commCustomConfigBox").find(".childElementMark").remove(); //class commCustomConfigBox 自定义属性 专属class
                                }
                            } else {
                                angular.element(".ccmsPublicPop").find(".childElementMark").remove();
                            }
                        } else {
                            angular.element(".yunat_maskLayer:last").remove();
                        }
                    }

                    //验证填入的时间段是否合法
                    function isTrueInputValue() {
                        scope.errorInput1 = scope.errorInput2 = scope.errorInput3 = scope.errorInput4 = scope.errorInput5 = scope.errorInput6 = false;
                        if (scope.configType == "1") { //"后"——验证
                            if (scope.monthOrDayOrSecondInput1 != "" && scope.monthOrDayOrSecondInput2 != "") {
                                if (scope.monthOrDayOrSecondInput1 * 1 == scope.monthOrDayOrSecondInput2 * 1) {
                                    if (scope.subType == "2") {
                                        scope.errorInput1 = scope.errorInput4 = true;
                                        scope.errorFlagOne = true;
                                        scope.errorMessage = "请填写正确的区间的值";
                                    } else {
                                        if (scope.dayInput1 == scope.dayInput2) {
                                            if (scope.timeInput1 >= scope.timeInput2) {
                                                scope.errorFlagOne = true;
                                                scope.errorInput3 = scope.errorInput6 = true;
                                                scope.errorMessage = "请填写正确的区间的值";
                                            } else {
                                                scope.errorFlagOne = false;
                                                scope.errorFlagTwo = false;
                                                scope.errorMessage = "";
                                            }
                                        } else if (scope.dayInput1 * 1 > scope.dayInput2 * 1) {
                                            scope.errorFlagOne = true;
                                            scope.errorInput2 = scope.errorInput5 = true;
                                            scope.errorMessage = "请填写正确的区间的值";
                                        } else {
                                            scope.errorFlagOne = false;
                                            scope.errorFlagTwo = false;
                                            scope.errorMessage = "";
                                        }
                                    }

                                } else if (((scope.monthOrDayOrSecondInput1 * 1 > scope.monthOrDayOrSecondInput2 * 1) && scope.subType != "2") || ((scope.monthOrDayOrSecondInput1 * 1 > scope.monthOrDayOrSecondInput2 * 1) && scope.subType == "2")) {
                                    scope.errorInput1 = scope.errorInput4 = true;
                                    scope.errorFlagOne = true;
                                    scope.errorMessage = "请填写正确的区间的值";
                                } else {
                                    scope.errorFlagOne = false;
                                    scope.errorFlagTwo = false;
                                    scope.errorMessage = "";
                                }
                            }
                        } else { // "前"——验证
                            if (scope.monthOrDayOrSecondInput1 != "" && scope.monthOrDayOrSecondInput2 != "") {
                                if (scope.monthOrDayOrSecondInput1 == scope.monthOrDayOrSecondInput2) {
                                    if (scope.subType == "2") {
                                        scope.errorFlagOne = true;
                                        scope.errorMessage = "请填写正确的区间的值";
                                    } else {
                                        if (scope.dayInput1 == scope.dayInput2) {
                                            if (scope.timeInput1 >= scope.timeInput2) {
                                                scope.errorInput3 = scope.errorInput6 = true;
                                                scope.errorFlagOne = true;
                                                scope.errorMessage = "请填写正确的区间的值";
                                            } else {
                                                scope.errorFlagOne = false;
                                                scope.errorFlagTwo = false;
                                                scope.errorMessage = "";
                                            }
                                        } else if (scope.dayInput1 * 1 > scope.dayInput2 * 1) {
                                            scope.errorInput2 = scope.errorInput5 = true;
                                            scope.errorFlagOne = true;
                                            scope.errorMessage = "请填写正确的区间的值";
                                        } else {
                                            scope.errorFlagOne = false;
                                            scope.errorFlagTwo = false;
                                            scope.errorMessage = "";
                                        }
                                    }

                                } else if (((scope.monthOrDayOrSecondInput1 * 1 < scope.monthOrDayOrSecondInput2 * 1) && (scope.subType != "2")) || ((scope.monthOrDayOrSecondInput1 * 1 < scope.monthOrDayOrSecondInput2 * 1) && (scope.subType == "2"))) {
                                    scope.errorInput1 = scope.errorInput4 = true;
                                    scope.errorFlagOne = true;
                                    scope.errorMessage = "请填写正确的区间的值";
                                } else {
                                    scope.errorFlagOne = false;
                                    scope.errorFlagTwo = false;
                                    scope.errorMessage = "";
                                }
                            }
                        }
                    }

                    //监听验证
                    function changeErrorStyle(flag) {
                        if (!scope.isStartValidateWatch) {
                            return "不监听验证"
                        };
                        if (flag == "first") {
                            if ((scope.monthOrDayOrSecondInput1 == "" && scope.dayInput1 == "" && scope.timeInput1 == "") || (scope.monthOrDayOrSecondInput1 != "" && scope.dayInput1 != "" && scope.timeInput1 != "") || (scope.monthOrDayOrSecondInput1 != "" && scope.timeInput1 != "" && scope.subType == "1") || (scope.monthOrDayOrSecondInput1 != "" && scope.subType == "2")) {
                                scope.errorFlagOne = false;
                                scope.errorInput1 = false;
                                scope.errorInput2 = false;
                                scope.errorInput3 = false;
                            } else {
                                if (scope.subType == "0") {
                                    if (scope.monthOrDayOrSecondInput1 == "") {
                                        scope.errorInput1 = true;
                                    } else {
                                        scope.errorInput1 = false;
                                    };

                                    if (scope.dayInput1 == "") {
                                        scope.errorInput2 = true;
                                    } else {
                                        scope.errorInput2 = false;
                                    };

                                    if (scope.timeInput1 == "") {
                                        scope.errorInput3 = true;
                                    } else {
                                        scope.errorInput3 = false;
                                    };

                                    scope.errorFlagOne = true;
                                    scope.errorMessage = "请填写完整的值";
                                } else if (scope.subType == "1") {
                                    if (scope.monthOrDayOrSecondInput1 == "") {
                                        scope.errorInput1 = true;
                                    } else {
                                        scope.errorInput1 = false;
                                    };
                                    if (scope.timeInput1 == "") {
                                        scope.errorInput3 = true;
                                    } else {
                                        scope.errorInput3 = false;
                                    };
                                    scope.errorFlagOne = true;
                                    scope.errorMessage = "请填写完整的值";
                                }
                            }
                        } else if (flag == "last") {
                            if ((scope.monthOrDayOrSecondInput2 == "" && scope.dayInput2 == "" && scope.timeInput2 == "") || (scope.monthOrDayOrSecondInput2 != "" && scope.dayInput2 != "" && scope.timeInput2 != "") || (scope.monthOrDayOrSecondInput2 != "" && scope.timeInput2 != "" && scope.subType == "1") || (scope.monthOrDayOrSecondInput2 != "" && scope.subType == "2")) {
                                scope.errorFlagTwo = false;
                                scope.errorInput4 = false;
                                scope.errorInput5 = false;
                                scope.errorInput6 = false;
                            } else {
                                if (scope.subType == "0") {
                                    if (scope.monthOrDayOrSecondInput2 == "") {
                                        scope.errorInput4 = true;
                                    } else {
                                        scope.errorInput4 = false;
                                    };

                                    if (scope.dayInput2 == "") {
                                        scope.errorInput5 = true;
                                    } else {
                                        scope.errorInput5 = false;
                                    };

                                    if (scope.timeInput2 == "") {
                                        scope.errorInput6 = true;
                                    } else {
                                        scope.errorInput6 = false;
                                    };

                                    scope.errorFlagTwo = true;
                                    scope.errorMessage = "请填写完整的值";
                                } else if (scope.subType == "1") {
                                    if (scope.monthOrDayOrSecondInput2 == "") {
                                        scope.errorInput4 = true;
                                    } else {
                                        scope.errorInput4 = false;
                                    };

                                    if (scope.timeInput2 == "") {
                                        scope.errorInput6 = true;
                                    } else {
                                        scope.errorInput6 = false;
                                    };

                                    scope.errorFlagTwo = true;
                                    scope.errorMessage = "请填写完整的值";
                                }
                            }
                        }
                    }

                    scope.$watch("monthOrDayOrSecondInput1", function(nVal, oVal) {
                        if (oVal != undefined) {
                            changeErrorStyle("first");
                        }
                    });

                    scope.$watch("dayInput1", function(nVal, oVal) {
                        if (oVal != undefined) {
                            changeErrorStyle("first");
                        }
                    });

                    scope.$watch("timeInput1", function(nVal, oVal) {
                        if (oVal != undefined) {
                            changeErrorStyle("first");
                        }
                    });

                    scope.$watch("monthOrDayOrSecondInput2", function(nVal, oVal) {
                        if (oVal != undefined) {
                            changeErrorStyle("last");
                        }
                    });

                    scope.$watch("dayInput2", function(nVal, oVal) {
                        if (oVal != undefined) {
                            changeErrorStyle("last");
                        }
                    });

                    scope.$watch("timeInput2", function(nVal, oVal) {
                        if (oVal != undefined) {
                            changeErrorStyle("last");
                        }
                    });

                }
            }
        },
        /*字典单选1*/
        "customDicOneType": function() {
            return {
                "controller": ['$scope',
                    function($scope) {
                        $scope.dicOneLists = $scope.data.configs;
                        $scope.setCurRadioId = function(e, v) {
                            var curRadioElement = angular.element(e.target);
                            curRadioElement.closest("label").siblings("label").find(".simulateRadioUnChecked ").removeClass("simulateRadioChecked");
                            if (curRadioElement.hasClass("simulateRadioChecked")) {
                                curRadioElement.removeClass("simulateRadioChecked");
                                $scope.curSelectId = "";
                            } else {
                                curRadioElement.addClass("simulateRadioChecked");
                                $scope.curSelectId = v;
                            }
                        }
                        if (!$scope.data.values) { // add || editor
                            $scope.dicOneValue = "";
                            $scope.curSelectId = "";
                        } else {
                            $scope.dicOneValue = $scope.data.values.value || "";
                            $scope.curSelectId = $scope.data.values.value || "";
                        }
                    }
                ],
                "link": function(scope, element, attr, ctrl) {
                    scope.getCustomValue = function() { //获取每个scope的数据values
                        var value = {};
                        value.value = scope.curSelectId;
                        return value;
                    };
                }
            }
        },
        /*字典单选2*/
        "customDicTwoType": function() {
            return {
                "controller": ['$scope',
                    function($scope) {
                        $scope.dicTwoLists = $scope.data.configs;
                        if (!$scope.data.values) {
                            $scope.dicTwoValue = "";
                        } else {
                            angular.forEach($scope.dicTwoLists, function(val, key) {
                                if (val.id == $scope.data.values.value) {
                                    $scope.dicTwoValue = val;
                                }
                            });
                        }
                    }
                ],
                "link": function(scope, element, attr, ctrl) {
                    scope.getCustomValue = function() { //获取每个scope的数据values
                        var value = {};
                        value.value = scope.dicTwoValue ? scope.dicTwoValue.id : "";
                        return value;
                    };
                }
            }
        },
        /*树形多选*/
        "customDicZtreeType": function() {
            return {
                "controller": ['$scope',
                    function($scope) {
                        $scope.dicZtreeLists = $scope.data.configs;

                        function initCustomZtree(data) { //初始化checkedBox ztree
                            var setting = {
                                check: {
                                    enable: true,
                                    chkStyle: "checkbox",
                                    chkboxType: {
                                        "Y": "ps",
                                        "N": "ps"
                                    },
                                    nocheckInherit: true
                                },
                                view: {
                                    addDiyDom: function(treeId, treeNode) {
                                        var spaceWidth = 15;
                                        var switchObj = $("#" + treeNode.tId + "_switch"),
                                            icoObj = $("#" + treeNode.tId + "_ico"),
                                            checkObj = $("#" + treeNode.tId + "_check"),
                                            spanObj = $("#" + treeNode.tId + "_span");
                                        switchObj.remove();
                                        icoObj.before(switchObj);
                                        spanObj.attr("treenode_check", "");
                                        switchObj.after(checkObj);
                                        var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
                                        if (treeNode.level != 0) {
                                            switchObj.before(spaceStr)
                                        }; // 展定最外层不给宽度
                                        if (treeNode.level == 0 && !treeNode.isLastNode) {
                                            $('#' + treeNode.tId + '_a').after("<div class='root_level0_line'></div>");
                                        }
                                    },
                                    dblClickExpand: false,
                                    showIcon: false
                                },
                                data: {
                                    simpleData: {
                                        enable: true
                                    }
                                },
                                callback: {
                                    onCheck: function onCheck(event, treeId, treeNode) {}
                                },
                                edit: {
                                    enable: false
                                }
                            };
                            $scope.thisScopecheckedZtree = $.fn.zTree.init($(".queryCustomCheckedZtree" + $scope.data.id), setting, data);
                            if ($scope.viewCustomZtreeIds) {
                                setDefaultTreeNode($scope.thisScopecheckedZtree, $scope.viewCustomZtreeIds.split(","));
                            }
                        }

                        function setDefaultTreeNode(treeEle, defalutObj) { //设置默认的tree node defalutObj——id的数组
                            treeEle.checkAllNodes(false);
                            for (var i = 0; i < defalutObj.length; i++) {
                                var node = treeEle.getNodesByParam("id", defalutObj[i])[0];
                                if (node) {
                                    treeEle.checkNode(node, true, false);
                                    treeEle.expandNode(node.getParentNode(), true);
                                }
                            }
                        }
                        $scope.initCustomZtree = function() {
                            initCustomZtree($scope.dicZtreeLists);
                        };

                        if (!$scope.data.values) { // add || editor
                            $scope.viewCustomZtreeValues = "";
                            $scope.viewCustomZtreeIds = "";
                        } else {
                            $scope.viewCustomZtreeValues = $scope.data.values.view || "";
                            $scope.viewCustomZtreeIds = $scope.data.values.value || "";
                        }
                    }
                ],
                "link": function(scope, element, attr, ctrl) {
                    scope.theCustomZtreeShow = function() { // 开始选择
                        scope.initCustomZtree();
                        scope.isShowSelectedTree = true;
                    };
                    scope.sureCustomZtreeData = function() { // 确定选择
                        var storeCustomZtreeValuesAry = [],
                            storeCustomZtreeIdsAry = [];
                        var returnZtreeData = scope.thisScopecheckedZtree.getCheckedNodes(true); //返回ztree选中数据
                        if (returnZtreeData.length > 0) {
                            angular.forEach(returnZtreeData, function(val, key) {
                                storeCustomZtreeValuesAry.push(val.name);
                                storeCustomZtreeIdsAry.push(val.id);
                            })
                        };
                        scope.viewCustomZtreeValues = storeCustomZtreeValuesAry.join(",");
                        scope.viewCustomZtreeIds = storeCustomZtreeIdsAry.join(",");
                        scope.hiddenCustomZtree();
                    };
                    scope.hiddenCustomZtree = function() { //取消选中
                        scope.isShowSelectedTree = false;
                        element.find(".ztree").html("");
                    };
                    scope.getCustomValue = function() { //获取每个scope的数据values
                        var value = {};
                        value.value = scope.viewCustomZtreeIds;
                        value.view = scope.viewCustomZtreeValues;
                        return value;
                    };
                }
            }
        },
        /*数字输入*/
        "customNumberType": ['$compile',
            function($compile) {
                return {
                    "controller": ['$scope',
                        function($scope) {
                            if (!$scope.data.values) { // add || editor
                                $scope.operator = $scope.data.configs['NumberType'][0]; //默认选择类型
                                $scope.numInput1 = "";
                                $scope.numInput2 = "";
                            } else {
                                var defaultVal = $scope.data.values;
                                $scope.operator = defaultVal.operator;
                                $scope.numInput1 = defaultVal.operator == "介于" ? defaultVal.value.split(',')[0] : defaultVal.value;
                                $scope.numInput2 = defaultVal.value.split(',')[1] || "";
                            }
                        }
                    ],
                    "link": function(scope, element, attr, ctrl) {
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

                        //操作符是介于必填
                        scope.$watch("numInput1", function(val, oldVal) {
                            if ((scope.operator == "介于") && val || (scope.operator == "介于" && scope.numInput2)) {
                                toggleRequired(true);
                            } else {
                                toggleRequired(false);
                            }
                        });

                        scope.$watch("numInput2", function(val, oldVal) {
                            if ((scope.operator == "介于" && val) || (scope.operator == "介于" && scope.numInput1)) {
                                toggleRequired(true);
                            } else {
                                toggleRequired(false);
                            }
                        });
                        //end
                        function toggleRequired(flag) {
                            if (flag) {
                                element.find("input").addClass("required");
                            } else {
                                element.find("input").removeClass("required error").css("borderColor", "#D9D9D9");
                                element.find(".error").remove();
                            }
                        };

                        function addStrict(config) {
                            // var config = scope.data.configs;
                            if (inited) {
                                return;
                            }
                            var els = element.find('input');
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

                            $compile(element.find('input')[0])(scope);
                            $compile(element.find('input')[1])(scope);
                            inited = true;
                        };
                        scope.getCustomValue = function() { //获取每个scope的数据values
                            var value = {};
                            var numInput = '';
                            if (scope.data.configs['NumberInputType'] && scope.data.configs['NumberInputType'][0] == 'Percentage') {
                                value.percent = scope.data.configs['NumberInputPrecision'] && scope.data.configs['NumberInputPrecision'][0];
                            }
                            if (scope.operator == "介于") {
                                numInput = scope.numInput1 + ',' + scope.numInput2;
                            } else {
                                numInput = scope.numInput1 + "";
                            }
                            value.value = numInput;
                            value.operator = scope.operator;
                            return value;
                        };
                    }
                }
            }
        ],
        /*关键字选择*/
        "customKeywordType": function() {
            return {
                "controller": ['$scope',
                    function($scope) {
                        if (!$scope.data.values) { // add || editor
                            $scope.fontLists = [];
                            $scope.viewValues = $scope.fontLists.join(",");
                            $scope.fontRelation = "AND";
                        } else {
                            $scope.viewValues = $scope.data.values.value;
                            $scope.fontLists = $scope.viewValues ? $scope.viewValues.split(",") : [];
                            $scope.fontRelation = $scope.data.values.relation || "AND";
                        }
                    }
                ],
                "link": function(scope, element, attr) {
                    //选择框改变
                    scope.editorKeyword = function() {
                        scope.commPlugSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/selectorFonts.html?_=" + new Date().getTime();
                    };
                    //选择器弹框调用
                    scope.openPlugPop = function() {
                        element.find(".commSelectPlug").addInteractivePop({
                            magTitle: "请选择关键字",
                            width: 520,
                            mark: false,
                            position: "fixed",
                            childElePop: true
                        });
                    };
                    scope.$watch("fontLists", function(nVal, oVal) {
                        scope.viewValues = nVal.join(",");
                        scope.viewInputValues = nVal.length != 0 ? "已选择" + nVal.length + "个关键字" : "";
                    });

                    //获取保存到服务器的values
                    scope.getCustomValue = function() {
                        var value = {
                            "relation": scope.fontRelation,
                            "value": scope.viewValues
                        };
                        return value;
                    };
                }
            }
        },
        /*地区选择*/
        "customCityType": function() {
            return {
                controller: ['$scope',
                    function($scope) {
                        if (!$scope.data.values) { // add || editor
                            $scope.cityLists = [];
                            $scope.inputCityLists = [];
                            $scope.viewCityValues = $scope.cityLists.join(",");
                        } else {
                            $scope.cityLists = [];
                            $scope.inputCityLists = [];
                            $scope.viewCityValues = $scope.cityLists.join(",");
                        }
                    }
                ],
                link: function(scope, elem, attrs) {
                    //选择框改变
                    scope.editorCitys = function() {
                        scope.commPlugSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/citys.html?_=" + new Date().getTime();
                    };
                    //选择器弹框调用
                    scope.openPlugPop = function() {
                        elem.find(".commSelectPlug").addInteractivePop({
                            magTitle: "地区选择",
                            width: 820,
                            mark: false,
                            position: "fixed",
                            childElePop: true
                        });
                    }

                    //选择结果赋值
                    scope.getCitySelectedData = function(callBackData) {
                        scope.cityLists = callBackData.slice();
                        scope.inputCityLists = callBackData.slice();
                    }
                    scope.$watch("inputCityLists", function(nVal, oVal) {
                        scope.cityInputValue = "已选择" + nVal.length + "个地区";
                        var cityNames = [];
                        angular.forEach(nVal,
                            function(v, k) {
                                if (v.name) {
                                    cityNames.push(v.name.replace(/,/ig, "-"))
                                };
                            });
                        scope.viewCityValues = cityNames.join(",");
                    });

                    //获取保存到服务器的values
                    scope.getCustomValue = function() {
                        var value = scope.inputCityLists.slice();
                        return value;
                    };
                }
            }
        },
        /*通用化选择器*/
        "commSelectorType": function() {
            return {
                controller: ['$scope',
                    function($scope) {
                        if (!$scope.data.values) { // add || editor
                            $scope.parentPrimary = ""
                        } else {
                            $scope.parentPrimary = $scope.data.values.value || "";
                            $scope.commSelectViews = $scope.data.values.view || "";
                        }
                    }
                ],
                link: function(scope, elem, attrs) {
                    //选择框改变
                    scope.editorProducts = function() {
                        scope.commPlugSrc = GLOBAL_STATIC.rootModule + "/modules/commSelector/index.html?_=" + new Date().getTime();
                    };
                    //选择器弹框调用
                    scope.openPlugPop = function() {
                      console.log('呵呵呵~commSelectorType');
                        elem.find(".commSelectPlug").addInteractivePop({
                            magTitle: scope.data.name + "选择器",
                            width: 900,
                            mark: false,
                            position: "fixed",
                            childElePop: true
                        });
                    }

                    scope.$on('commSelectSubmit', function(currScope, q, primary) {
                        scope.commSelectViews = "已选择" + scope.data.name + "数" + primary.length;
                        scope.parentPrimary = primary.toString();
                        scope.primary = primary;
                    });

                    //获取保存到服务器的values
                    scope.getCustomValue = function() {
                        var result = {
                            'value': scope.parentPrimary,
                            'view': scope.commSelectViews
                        };
                        return result;
                    };
                }
            }
        },
        /*商品选择*/
        "customProductType": ['selectorProduct', function(selectorProduct) {
            return {
                controller: ['$scope', '$rootScope',
                    function($scope, $rootScope) {
                        if (!$scope.data.values) { // add || editor
                            $scope.cityLists = [];
                            $scope.viewProductValues = $scope.cityLists.join(",");
                            $scope.productInputValue = "";
                            $scope.storeProductId = "";
                            $scope.snapshootId = 0;
                            $scope.serviceType = "node_query";
                        } else {
                            $scope.cityLists = [];
                            $scope.productInputValue = $scope.data.values.fillProductValue || "";
                            $scope.storeProductId = $scope.data.values.storeProductId || "";
                            $scope.viewProductValues = $scope.cityLists.join(",");
                            $scope.snapshootId = $scope.storeProductId || 0;
                            $scope.serviceType = "node_query";
                        }
                      $scope.segmentationId = $rootScope.segmentationId;
                    }
                ],
                link: function(scope, elem, attrs) {
                    //选择框改变
                    scope.editorProducts = function() {
                      var self = this;
                      this.bindings = {};
                       var a = {
                         bject$$hashKey: "object:1357",
                         chooseId: scope.storeProductId,
                         code: "SellerCode",
                         enableMultiple: false,
                         length: 0,
                         range: 2,
                         resourceName: "sellerCode",
                         sideFlag: true
                       };
                      selectorProduct({
                        type: 'product',
                        disable: false ,// this.navName !== 'create' && this.navName !== 'edit',
                        title: '商品选择器',
                        bindings: Object.assign({}, self.bindings[a.code], {cid: a.chooseId}, {sideFlag: a.sideFlag}, {segmentationId: scope.segmentationId}, {platCode: scope.data.platCode}),
                        onDone: function(bindings, changed) {
                         console.log(bindings)
                          scope.getProductSelectedData(bindings);
                        }
                       });
                        //scope.commPlugSrc = GLOBAL_STATIC.rootModule + "/modules/Selector/goodsList.html?_=" + new Date().getTime();
                    };

                    //选择结果赋值
                    scope.getProductSelectedData = function(callBackData) {
                        scope.callBackData = callBackData;
                        scope.inputProductLists = callBackData.items && callBackData.items.slice();
                        scope.storeProductId = callBackData.cid;
                        scope.snapshootId =  callBackData.cid;
                    }
                    scope.$watch("inputProductLists", function(nVal, oVal) {
                        if (!oVal && !nVal) {
                            return false
                        }
                        var hasSearchGoodConditions = false;
                        if (scope.callBackData && scope.callBackData.selectorSearchVO) {
                            for (var i in scope.callBackData.selectorSearchVO) {
                                hasSearchGoodConditions = true;
                            }
                        };
                        if (nVal == undefined || nVal.length == 0) {
                            scope.productInputValue = hasSearchGoodConditions ? "已选择1个搜索条件" : "";
                            return false;
                        }

                        scope.productInputValue = hasSearchGoodConditions ? "已选择" + nVal.length + "条数据,1个搜索条件" : "已选择" + nVal.length + "条数据";
                        var productNames = [];
                        angular.forEach(nVal,
                            function(v, k) {
                                if (v.title) {
                                    productNames.push(v.title.replace(/,/ig, "-"))
                                };
                            });
                        scope.viewProductValues = productNames.join(",");
                    });

                    //获取保存到服务器的values
                    scope.getCustomValue = function() {
                        var value = {
                            "fillProductValue": scope.productInputValue || "",
                            "storeProductId": scope.productInputValue ? (scope.storeProductId || "") : ""
                        }
                        return value;
                    };
                }
            }
        }],
        /*标签选择*/
        "customLabelType": function() {
            return {
                "controller": ['$scope',
                    function($scope) {
                        if (!$scope.data.values) { // add || editor
                            $scope.labelLists = [];
                            $scope.viewValues = $scope.labelLists.join(",");
                            $scope.viewlabelIds = "";
                            $scope.customerLabelLists = [];
                        } else {
                            $scope.viewValues = $scope.data.values.value || "";
                            $scope.labelLists = $scope.viewValues.split(",") || [];
                            $scope.viewlabelIds = $scope.data.values.ids || "";
                            $scope.customerLabelLists = [];
                        }
                    }
                ],
                "link": function(scope, element, attr) {
                    //选择框改变
                    scope.editorLabels = function() {
                        scope.commPlugSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/label.html?_=" + new Date().getTime();
                    };
                    //选择器弹框调用
                    scope.openPlugPop = function() {
                        element.find(".commSelectPlug").addInteractivePop({
                            magTitle: "请选择标签",
                            width: 520,
                            mark: false,
                            position: "fixed",
                            childElePop: true
                        });
                    };
                    scope.$watch("labelLists", function(nVal, oVal) {
                        scope.viewlabelValues = nVal.join(",");
                        scope.labelInputValue = nVal.length != 0 ? "已选择" + nVal.length + "个关键字" : "";

                        angular.forEach(scope.viewlabelIds.split(","), function(val, key) { // 用于标签模板默认选择状态
                            scope.customerLabelLists.push({
                                "id": val,
                                "value": nVal[key]
                            })
                        })
                    });

                    //获取保存到服务器的values
                    scope.getCustomValue = function() {
                        var value = {
                            "value": scope.viewlabelValues,
                            "ids": scope.viewlabelIds
                        };
                        return value;
                    };
                }
            }
        },
        "customIndicatorType": ['$compile',
            function($compile) {
                return {
                    "controller": ['$scope',
                        function($scope) {
                            //console.log($scope.curDefaultData)
                            if (!$scope.curDefaultData) { // 增加&& 初始化
                                if ($scope.curLabeloperator.type == '数字输入') {
                                    $scope.operator = ($scope.curLabeloperator.values && $scope.curLabeloperator.values.operator) || $scope.curLabeloperator.configs['NumberType'][0]; //默认选择类型
                                    $scope.numInput1 = ($scope.curLabeloperator.values && $scope.curLabeloperator.values.value) || "";
                                } else if ($scope.curLabeloperator.type == '时间选择') {
                                    $scope.numcount = 120;
                                    $scope.indicatorTimeTypeLists = [{
                                        "type": "absolutely",
                                        "value": "绝对时间"
                                    }, {
                                        "type": "relatively",
                                        "value": "相对时间"
                                    }];
                                    $scope.indicatorCurTimeList = $scope.indicatorTimeTypeLists[0];
                                    $scope.timeOperator = $scope.curLabeloperator.configs['DatetimeType'][0]; //默认选择类型
                                    $scope.isMid = true; //默认介于，共用时间插件判断
                                    $scope.subType = '0'; //相对时间,默认'月'
                                    $scope.dateInput1 = "";
                                    $scope.dateInput2 = "";
                                }
                            } else { // 编辑填充
                                var defaultVal = $scope.curDefaultData.values;
                                if ($scope.curLabeloperator.type == '数字输入') {
                                    $scope.operator = defaultVal.operator;
                                    $scope.numInput1 = defaultVal.value.split(',')[0] || defaultVal.value;
                                    $scope.numInput2 = defaultVal.value.split(',')[1] || "";
                                } else if ($scope.curLabeloperator.type == '时间选择') {
                                    $scope.indicatorTimeTypeLists = [{
                                        "type": "absolutely",
                                        "value": "绝对时间"
                                    }, {
                                        "type": "relatively",
                                        "value": "相对时间"
                                    }];
                                    angular.forEach($scope.indicatorTimeTypeLists, function(val, key) {
                                        if (val.type == $scope.curDefaultData.values.type) {
                                            $scope.indicatorCurTimeList = val;
                                        }
                                    });
                                    $scope.timeOperator = defaultVal.operator; //默认选择类型
                                    if ($scope.indicatorCurTimeList.type == "absolutely") {
                                        if ($scope.timeOperator == "介于") {
                                            $scope.dateInput1 = defaultVal.value.split(',')[0];
                                            $scope.dateInput2 = defaultVal.value.split(',')[1];
                                        } else {
                                            $scope.dateInput1 = defaultVal.value;
                                        }
                                    } else if ($scope.indicatorCurTimeList.type == "relatively") {
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
                                        if ($scope.timeOperator == "介于") {
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
                                }
                            }
                        }
                    ],
                    "link": function(scope, element, attr, ctrl) {
                        var inited = false; //给定参数，防止切换operator刷新
                        //监听指标类型
                        scope.$watch('curLabeloperator', function(newVal, oldVal) {
                            if (newVal == oldVal) { //阻止第一次监听
                                return;
                            }
                            if (newVal.type == '数字输入') {
                                inited = false;
                                scope.operator = newVal.configs['NumberType'][0];
                                scope.numInput1 = "";
                                scope.numInput2 = "";
                                addStrict(newVal.configs);
                            } else if (newVal.type == '时间选择') {
                                scope.indicatorTimeTypeLists = [{
                                    "type": "absolutely",
                                    "value": "绝对时间"
                                }, {
                                    "type": "relatively",
                                    "value": "相对时间"
                                }];
                                scope.indicatorCurTimeList = scope.indicatorTimeTypeLists[0];
                                scope.timeOperator = newVal.configs['DatetimeType'][0];
                                scope.subType = '0';
                                if (scope.customObj.customTimeType == "absolutely") {
                                    clearDate1();
                                } else {
                                    clearDate2();
                                }
                            }
                        });
                        /*指标数字类型 start*/
                        //选择框改变
                        scope.$watch('operator', function(val, oldVal) {
                            if (val == undefined) {
                                return;
                            }
                            if (oldVal != undefined && oldVal != val && scope.numInput1) {
                                scope.numInput1 = "";
                                scope.numInput2 = "";
                            }
                            addStrict(scope.curLabeloperator.configs);
                            if (val == "介于") {
                                scope.isMid = true;
                            } else {
                                scope.isMid = false;
                            }
                        });

                        function addStrict(config) {
                            if (inited) {
                                return;
                            }
                            var els = element.find('.indicatorNum input');
                            //输入类型 :浮点数 整数 百分数
                            els.next(".dollor").remove();
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

                            $compile(element.find('input')[0])(scope);
                            $compile(element.find('input')[1])(scope);
                            inited = true;
                        };
                        /*指标数字类型 end*/
                        /*指标时间类型 start*/
                        //选择框改变
                        scope.$watch('timeOperator', function(val, oldVal) {
                            //每次切换的时候清空
                            if (oldVal != undefined && oldVal != val) {
                                if (scope.customObj.customTimeType == "absolutely") {
                                    clearDate1();
                                } else {
                                    clearDate2();
                                }
                            }
                            if (val == "介于") {
                                scope.isTimeMid = true;
                            } else {
                                scope.isTimeMid = false;
                            }
                        });
                        //监听时间类型
                        scope.$watch("indicatorCurTimeList", function(newVal, oldVal) {
                                if (oldVal != undefined && oldVal != newVal) {
                                    if (scope.curLabeloperator.type == "数字输入") {
                                        scope.operator = scope.curLabeloperator.configs['NumberType'][0];
                                    } else if (scope.curLabeloperator.type == "时间选择") {
                                        scope.subType = '0';
                                        scope.numcount = 120;
                                        scope.timeOperator = scope.curLabeloperator.configs['DatetimeType'][0];
                                    }
                                    if (newVal == "absolutely") {
                                        clearDate1();
                                    } else if (newVal == "relatively") {
                                        clearDate2();
                                    }
                                }
                            })
                            //监听月,天,秒切换
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
                        };
                        /*指标时间类型 end*/
                        /*删除指标*/
                        scope.removeIndicator = function(i) {
                            element.remove();
                            scope.linkRemoveIndicatorScope(i);
                        };
                        scope.getCustomIndicatorValue = function() { //获取每个scope的数据values
                            var itemIndicatorData = {
                                "id": "",
                                "queryItemId": scope.curLabeloperator.id,
                                "type": scope.curLabeloperator.type,
                                "name": scope.curLabeloperator.name,
                                "values": {}
                            };
                            if (scope.curLabeloperator.type == "数字输入") {
                                var numInput = '';
                                if (scope.curLabeloperator.configs['NumberInputType'] && scope.curLabeloperator.configs['NumberInputType'][0] == 'Percentage') {
                                    itemIndicatorData.values.percent = scope.curLabeloperator.configs['NumberInputPrecision'] && scope.curLabeloperator.configs['NumberInputPrecision'][0];
                                }
                                if (scope.operator == "介于") {
                                    if (Number(scope.numInput1) > Number(scope.numInput2)) {
                                        var numInputTe = scope.numInput1;
                                        scope.numInput1 = scope.numInput2;
                                        scope.numInput2 = numInputTe;
                                    }
                                    numInput = scope.numInput1 + ',' + scope.numInput2;
                                    console.log(numInput);

                                } else {
                                    numInput = scope.numInput1 + "";
                                }
                                itemIndicatorData.values.value = numInput;
                                itemIndicatorData.values.operator = scope.operator;
                            } else if (scope.curLabeloperator.type == "时间选择") {
                                var value = {};

                                itemIndicatorData.values.operator = scope.timeOperator;
                                if (scope.indicatorCurTimeList.type == "absolutely") {
                                    itemIndicatorData.values.type = "absolutely";
                                    if (scope.timeOperator == "介于") {
                                        itemIndicatorData.values.value = scope.dateInput1 + ',' + scope.dateInput2;
                                    } else {
                                        itemIndicatorData.values.value = scope.dateInput1;
                                    }
                                } else if (scope.indicatorCurTimeList.type == "relatively") {
                                    itemIndicatorData.values.type = "relatively";
                                    if (scope.timeOperator == "介于") {


                                        if (scope.subType == '0') {
                                            itemIndicatorData.values.dimension = '月';
                                            if (Number(scope.monthOrDayOrSecondInput1) < Number(scope.monthOrDayOrSecondInput2)) {
                                                //第一个值小于第二个值，如前5月-前8月则互换
                                                var firstInput3 = scope.monthOrDayOrSecondInput1;
                                                scope.monthOrDayOrSecondInput1 = scope.monthOrDayOrSecondInput2;
                                                scope.monthOrDayOrSecondInput2 = firstInput3;

                                                var dayTemp = scope.dayInput1;
                                                scope.dayInput1 = scope.dayInput2;
                                                scope.dayInput2 = dayTemp;

                                                var timeTemp2 = scope.timeInput1;
                                                scope.timeInput1 = scope.timeInput2;
                                                scope.timeInput2 = timeTemp2;

                                            }
                                            if (Number(scope.monthOrDayOrSecondInput1) == Number(scope.monthOrDayOrSecondInput2)) {

                                                //判断号
                                                if (Number(scope.dayInput1) > Number(scope.dayInput2)) {
                                                    var dayTemp4 = scope.dayInput1;
                                                    scope.dayInput1 = scope.dayInput2;
                                                    scope.dayInput2 = dayTemp4;

                                                    var timeTemp4 = scope.timeInput1;
                                                    scope.timeInput1 = scope.timeInput2;
                                                    scope.timeInput2 = timeTemp4;
                                                }
                                                if (Number(scope.dayInput1) == Number(scope.dayInput2)) {
                                                    if (scope.timeInput1 > scope.timeInput2) {
                                                        var timeTemp5 = scope.timeInput1;
                                                        scope.timeInput1 = scope.timeInput2;
                                                        scope.timeInput2 = timeTemp5;
                                                    }
                                                }

                                            }
                                            itemIndicatorData.values.day = scope.dayInput1 + ',' + scope.dayInput2;
                                            itemIndicatorData.values.time = scope.timeInput1 + ',' + scope.timeInput2;

                                        } else if (scope.subType == '1') {
                                            itemIndicatorData.values.dimension = '天';
                                            if (Number(scope.monthOrDayOrSecondInput1) < Number(scope.monthOrDayOrSecondInput2)) {
                                                //第一个值小于第二个值，如前5天-前8天则互换
                                                var firstInput2 = scope.monthOrDayOrSecondInput1;
                                                scope.monthOrDayOrSecondInput1 = scope.monthOrDayOrSecondInput2;
                                                scope.monthOrDayOrSecondInput2 = firstInput2;

                                                var timeTemp = scope.timeInput1;
                                                scope.timeInput1 = scope.timeInput2;
                                                scope.timeInput2 = timeTemp;

                                            }
                                            if (Number(scope.monthOrDayOrSecondInput1) == Number(scope.monthOrDayOrSecondInput2)) {
                                                if (scope.timeInput1 > scope.timeInput2) {
                                                    var timeTemp3 = scope.timeInput1;
                                                    scope.timeInput1 = scope.timeInput2;
                                                    scope.timeInput2 = timeTemp3;
                                                }

                                            }

                                            itemIndicatorData.values.time = scope.timeInput1 + ',' + scope.timeInput2;
                                        } else if (scope.subType == '2') {
                                            itemIndicatorData.values.dimension = '分钟';

                                            if (Number(scope.monthOrDayOrSecondInput1) < Number(scope.monthOrDayOrSecondInput2)) {
                                                //第一个值小于第二个值，如前5分钟-前8分钟则互换
                                                var firstInput1 = scope.monthOrDayOrSecondInput1;
                                                scope.monthOrDayOrSecondInput1 = scope.monthOrDayOrSecondInput2;
                                                scope.monthOrDayOrSecondInput2 = firstInput1;
                                            }
                                        }

                                        itemIndicatorData.values.interval = scope.monthOrDayOrSecondInput1 + ',' + scope.monthOrDayOrSecondInput2;

                                        /*if (scope.subType == '0') {
                                          itemIndicatorData.values.dimension = '月';
                                          itemIndicatorData.values.day = scope.dayInput1 + ',' + scope.dayInput2;
                                          itemIndicatorData.values.time = scope.timeInput1 + ',' + scope.timeInput2;
                                        } else if (scope.subType == '1') {
                                          itemIndicatorData.values.dimension = '天';
                                          itemIndicatorData.values.time = scope.timeInput1 + ',' + scope.timeInput2;
                                        } else if (scope.subType == '2') {
                                          itemIndicatorData.values.dimension = '分钟';
                                        }*/




                                    } else {
                                        itemIndicatorData.values.interval = scope.monthOrDayOrSecondInput1;
                                        if (scope.subType == '0') {
                                            itemIndicatorData.values.dimension = '月';
                                            itemIndicatorData.values.day = scope.dayInput1;
                                            itemIndicatorData.values.time = scope.timeInput1;
                                        } else if (scope.subType == '1') {
                                            itemIndicatorData.values.dimension = '天';
                                            itemIndicatorData.values.time = scope.timeInput1;
                                        } else if (scope.subType == '2') {
                                            itemIndicatorData.values.dimension = '分钟';
                                        }
                                    }
                                }
                            }
                            console.log(itemIndicatorData);
                            return itemIndicatorData;
                        };
                    }
                }
            }
        ]
    });
})(window, angular, undefined);
