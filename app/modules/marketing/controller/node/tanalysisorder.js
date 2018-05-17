angular.module("campaign.controllers").controller('AnalysisCtrl', ['$scope', '$rootScope', '$http', '$interval', 'getListService', '$q', 'selectorShops',
  function($scope, $rootScope, $http, $interval, getListService, $q,selectorShops) {
    $scope.openNodePop(); //调用弹框方法
    getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
      if (response.subjobStatus > 20) {
        $scope.analysisScopeObj.viewAnalysisDataFlag = true;
      }
      if (response.isDownload === 'true') {
        $scope.analysisScopeObj.showViewDate = true;
      }

      //测试执行不显示下载报告
      $scope.isTestStatus = (!response.isTest || response.isTest != 1) ? true: false;
    }, graph.nodeId, graph.campJobid);

    $scope.analysisScopeObj = {
      "isEditorFlag": (!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8),//节点是否可编辑，确定按钮是否显示,,
      "isErrorShow": false,
      "curSubjectAnalysisConfigConditions": "",
      // 条件配置数据
      //"analysisOrderConditionsView":[], // 条件配置展示array
      "errorMes": "分析指标最多可选5种",
      "name": "订单分析",
      "defaultShopValueAry": [],
      "defaultShopIdAry": [],
      "postSaveShopsData": [],
      "ShopUnusedAry": [],
      "isCurSubjectShopsStore": { // 储存已保存的平台店铺
        "subjectId": "",
        "selectShopsSend": [],
        "curSubjectSelectShopsVal": "",
        "curSubjectSelectShopsId": "",
        "unusedShops": [],
        "DefaultSelected":"",
        "DefaultSelectedId":"",
      },
      "fillData": function() {
        var _this = this,
            useabledShops = [];
        _this.jobId = graph.campJobid || "";

        var delay = getListService.getOrderPlatList(function(response) {
          _this.subjectAry = response || [];
        });
        $q.when(delay).then(function() {
          getListService.openAnalysisNode(function(response) {
            _this.name = response.nodeName || "订单分析";
            _this.id = response.nodeId || (response.nodeId && "");
            $scope.nodecomment = response.nodeRemark || "";

            //设置平台
            var platIsValit = false;
            angular.forEach(_this.subjectAry, function(val, key) {
              if (val.subjectId == response.subjectId) {
               $rootScope.segmentationIdByorder = _this.segmentationId = val.segmentationId;
                _this.subjectCode = val.platCode;
                platIsValit = true;
                return false;
              }
            })
            if (platIsValit) {
              _this.defaultSubjectId =  response.subjectId ;
            } else {
              $rootScope.segmentationIdByorder = _this.segmentationId = _this.subjectAry[0] && _this.subjectAry[0].segmentationId;
              _this.defaultSubjectId = _this.subjectAry[0] && _this.subjectAry[0].subjectId;
              _this.subjectCode = _this.subjectAry[0] && _this.subjectAry[0].platCode;
            }

            //处理权限过期店铺
            _this.getShopsLists().promise.then(function() {
              useabledShops = _this.disponseShops(response.shopVOs);
              var ids = [];
              angular.forEach(useabledShops, function(val, key) {
                _this.defaultShopValueAry.push(val.shopName);
                _this.defaultShopIdAry.push(val.shopId);
                ids.push(val.shopId);
              });
              _this.storeId = response.chooseId || '';
              _this.shopIds = ids;
              _this.postSaveShopsData = angular.copy(useabledShops);
              _this.selectShopsVal = _this.defaultShopValueAry.join(",") || $scope.analysisScopeObj.DefaultSelected;
              _this.ShopIdsAry = _this.defaultShopIdAry.slice() || $scope.analysisScopeObj.DefaultSelectedId;
              _this.selectShopsId = _this.ShopIdsAry.join(",");
              _this.isCurSubjectShopsStore = {
                "subjectId": _this.defaultSubjectId,
                "curSubjectShopsSend": _this.postSaveShopsData.slice(),
                "curSubjectShopIdsAry": _this.ShopIdsAry.slice(),
                "curSubjectSelectShopsVal": _this.selectShopsVal,
                "curSubjectSelectShopsId": _this.selectShopsId,
                "unusedShops": _this.ShopUnusedAry.slice()
              }
            });
            //获取维度和条件
            _this.getAnalysisItems(_this.defaultSubjectId);

            //获取筛选配置条件
            _this.getDefaultAnalysisConditions(_this.defaultSubjectId);
          });
        })

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tanalysisorder");
      },
      "getShopsLists": function() { //获取店铺
        var _this = this,
            delay = $q.defer();
        _this.shopLists = [];
        delay.resolve();
        return delay;
      },
      "disponseShops": function(datas) { //处理店铺，判断已选店铺是否有权限
        var disponseResult = [],
            _this = this;
        angular.extend(disponseResult,datas );
        return disponseResult;
      },
      "getAnalysisItems": function(curSubjectId) { // 获取分析类容 && 分析维度
        var _this = this;
        getListService.getAnalysisItemsData(function(response) {
          _this.analysisItemsList = response.nodeAnalysisQuotaVOs || [];
          _this.analysisDimensionList = response.nodeAnalysisDimensionVOs || [];
          $scope.analysisLoadingFlag = true;
          if (_this.isEditorFlag) { // 无编辑权限
            angular.forEach(_this.analysisItemsList, function(val, key) {
              val.isEditor = true;
            });
            angular.forEach(_this.analysisDimensionList, function(val, key) {
              val.isDefaultCheck = true;
            })
          }
        }, curSubjectId);
      },
      "getDefaultAnalysisConditions": function(curSubjectId) { // 获取配置条件数据
        var _this = this;
        getListService.getAnalysisScreeningData(curSubjectId, function(response) {
          _this.curSubjectAnalysisConfigConditions = $.extend({}, response, true);
          _this.disposeSubjectConditionsView((_this.curSubjectAnalysisConfigConditions.attribute || []));
          $scope.analysisLoadingSecondFlag = true;
        });
      },
      "changeSubject": function(segmentationId) { // 切换平台
        var _this = this;
        _this.selectShopsVal = "";
        _this.selectShopsId = "";
        _this.isUnShops = false;
        _this.ShopIdsAry = [];
        _this.ShopUnusedAry = [];
        _this.postSaveShopsData = [];
        // _this.shops.shopIds = [];
        angular.forEach(_this.subjectAry, function(val, key) {
          if (_this.defaultSubjectId == val.subjectId) {
            $rootScope.segmentationIdByorder = _this.segmentationId = val.segmentationId;
            _this.subjectCode = val.platCode;
            return false;
          }
        });
        //店铺处理
        _this.getShopsLists().promise.then(function() {
          _this.disponseShops()
        });
        //获取维度和条件
        _this.getAnalysisItems(_this.defaultSubjectId);
        //获取筛选配置条件
        _this.getDefaultAnalysisConditions(_this.defaultSubjectId);
        if (_this.defaultSubjectId == _this.isCurSubjectShopsStore.subjectId) {
          _this.selectShopsVal = _this.isCurSubjectShopsStore.curSubjectSelectShopsVal;
          _this.selectShopsId = _this.isCurSubjectShopsStore.curSubjectSelectShopsId;
          _this.ShopIdsAry = _this.isCurSubjectShopsStore.curSubjectShopIdsAry.slice();
          _this.postSaveShopsData = _this.isCurSubjectShopsStore.curSubjectShopsSend.slice();
          _this.ShopUnusedAry = _this.isCurSubjectShopsStore.unusedShops.slice();
        }
        else{
          if(_this.shopLists.length == 1){
            _this.selectShopsVal = $scope.analysisScopeObj.DefaultSelected;
            _this.selectShopsId = $scope.analysisScopeObj.DefaultSelectedId;
          }
        }
      },
      "disposeSubjectConditionsView": function(conditions) { // 处理筛选条件展示
        var _this = this;
        _this.analysisOrderConditionsView = [];
        angular.forEach(conditions, function(val, key) {
          var returnViewDate = _this.returnConditionsDateByType(val);
          if (returnViewDate.value != "") {
            _this.analysisOrderConditionsView.push(returnViewDate);
          }
        });
      },
      "returnConditionsDateByType": function(val) {
        var returnV = {
          "name": "",
          "value": ""
        }
        if (val.type == "字符输入" && val.values && val.values.value) {
          returnV.name = val.name;
          returnV.value = val.values.value;
        } else if ((val.type == "时间选择" || val.type == "日期选择") && val.values && val.values.type) {
          if (val.values.type == "absolutely" && val.values.value && !(/^,$/.test(val.values.value))) {
            returnV.name = val.name;
            var valueAry = val.values.value.split(",");
            angular.forEach(valueAry, function(val, key) {
              if (val == "") {
                valueAry[key] = "不限"
              };
            });
            returnV.value = valueAry.join("~");
          } else if (val.values.type == "relatively" && val.values.interval && !(/^,$/.test(val.values.interval))) {
            returnV.name = val.name;
            var aryOne, aryTwo, aryThree;
            var descriptionValue = val.values.direction;
            aryOne = val.values.interval.split(",");
            if (val.values.dimension == "月") {
              aryTwo = val.values.day ? val.values.day.split(",") : [];
              aryThree = val.values.time ? val.values.time.split(",") : [];
              returnV.value = (aryOne[0] ? (descriptionValue + aryOne[0] + "月" + aryTwo[0] + (aryTwo[0] ? ("号" + aryThree[0]) : "")) : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "月" + aryTwo[1] + (aryTwo[1] ? ("号" + aryThree[1]) : "")) : "不限");
            } else if (val.values.dimension == "天") {
              aryTwo = val.values.time ? val.values.time.split(",") : [];
              returnV.value = (aryOne[0] ? (descriptionValue + aryOne[0] + "天" + aryTwo[0]) : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "天" + aryTwo[1]) : "不限");
            } else if (val.values.dimension == "分钟") {
              returnV.value = (aryOne[0] ? (descriptionValue + aryOne[0] + "分钟") : "不限") + "~" + (aryOne[1] ? (descriptionValue + aryOne[1] + "分钟") : "不限");
            }
          }
        } else if (val.type == "字典单选1" && val.values && val.values.value) {
          returnV.name = val.name;
          returnV.value = "等于 " + val.values.img;
        } else if (val.type == "字典单选2" && val.values && val.values.value) {
          returnV.name = val.name;
          returnV.value = "等于 " + val.values.img;
        } else if (val.type == "树形多选" && val.values && val.values.value) {
          returnV.name = val.name;
          returnV.value = val.values.view;
        } else if (val.type == "数字输入" && val.values && val.values.value && !(/^,$/.test(val.values.value))) {
          returnV.name = val.name;
          var valueAry = val.values.value.split(",");
          angular.forEach(valueAry, function(val, key) {
            if (val == "") {
              valueAry[key] = "不限"
            };
          });
          returnV.value = val.values.operator + " " + valueAry.join("~");
        } else if (val.type == "关键字定制" && val.values && val.values.value) {
          returnV.name = val.name;
          returnV.value = "关键字 \"" + (val.values.relation == "OR" ? val.values.value.split(",").join(" 或者 ") : val.values.value.split(",").join(" 并且 ")) + "\"";
        } else if (val.type == "地区选择" && val.values && val.values.value) {
          //暂时不实现
        } else if (val.type == "标签选择" && val.values && val.values.value) {
          returnV.name = val.name;
          returnV.value = val.values.value;
        } else if (val.type == "商品选择" && val.values && val.values.storeProductId) {
          returnV.name = val.name;
          returnV.value = val.values.fillProductValue;
        }
        return returnV;
      },
      "isImgData": function(val) { // 处理是自带你单选旗帜title展示问题
        if (! (/<img.*/ig.test(val))) {
          return val
        }
      },
      "getAnalysisShops": function() { // 店铺选择
        var self = _this = this;
        if(self.isEditorFlag) {
          return '当前节点不可编辑';
        }
        this.bindings = {};
        var a = {
          bject$$hashKey: "object:1357",
          chooseId: this.storeId,
          code: "SellerCode",
          enableMultiple: false,
          length: 0,
          range: 2,
          resourceName: "sellerCode",
          shopIds:  self.shopIds,
          shopsList: self.postSaveShopsData
        };
        var type = 'shop';
        selectorShops({
          type: 'shop',
          disable: false ,// this.navName !== 'create' && this.navName !== 'edit',
          title: '店铺选择器',
          queryParams: {
            tenantId: CAMPAIGN_STATIC.tenantId,
            platCode: _this.subjectCode
          },
          bindings: Object.assign({}, self.bindings[a.code], {cid: a.chooseId}, {shopIds: a.shopIds}, {shopsList: a.shopsList}),
          onDone: function(bindings, changed) {
            console.log(bindings)
            //self.bindings[a.code] = bindings;
            //a.chooseId = bindings.cid;
            //a.length = bindings.items.length;
            self.sureAddShop(bindings.shopsList);
          }
        });
      },
      "toggleAllShops": function(s) {
        if (s) {
          angular.element(".shopsChecked .editorShops li").addClass("cur");
        } else {
          angular.element(".shopsChecked .editorShops li").removeClass("cur");
        }
      },
      "sureAddShop": function(lists) {
        var _this = this;
        _this.ShopValsViewAry = [];
        _this.ShopIdsAry = [];
        _this.postSaveShopsData = [];
        lists.forEach(function(val, key) {
          _this.ShopIdsAry.push(val.shopId);
          _this.ShopValsViewAry.push(val.shopName);
          _this.postSaveShopsData.push(val);
        });
        _this.selectShopsVal = _this.ShopValsViewAry.join(",");
        _this.selectShopsId = _this.ShopIdsAry.join(",");
        if (_this.ShopIdsAry.length > 0) {
          _this.isUnShops = false;
        }
      },
      "editorOrderConditions": function() { // 订单条件筛选
        var _this = this;
        _this.orderConditionsTemplate =  CAMPAIGN_STATIC.tplBasePath + "view/node/tanalysisorderView/customOrderCondition/customOrderTemplate.html?_=" + new Date().getTime();
      },
      'orderConditionsPop': function() {
        $(".commCustomConfigBox").addInteractivePop({
          magTitle: "订单筛选条件设置",
          width: 1250,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      },
      "isPower": false,
      //下载权限
      "openResult": function() { // 查看报告
        var _this = this;
        $scope.existFile = "false";
        $(".analysisDataListView").addInteractivePop({
          magTitle: "订单分析结果查看",
          width: 1000,
          mark: false,
          position: "fixed",
          childElePop: true,
          closeFn: function() {
            $interval.cancel($scope.checkFile$);
            $scope.checkFile$ = undefined;
          }
        });
        // if (angular.element("#newsGeidWrap").length == 0) {
          getListService.getReportDataListTitle(graph.nodeId, function(response) {
            _this.tabReportList = response || [];
            _this.toggleReportTitle(0, _this.tabReportList[0]); // 默认汇总
          });
          getListService.getReportPower(graph.nodeId, function(response) {
            _this.isPower = response.authorityCode == null ? false: true;
          });
        // }
      },
      "getReportDataByDimension": function(curTitleList) { // 获取不同指标的数据
        var gridListData = [];
        if (curTitleList && curTitleList.nodeAnalysisResultsTabThVOs) {
          var isAutoTableWidth = curTitleList.nodeAnalysisResultsTabThVOs && curTitleList.nodeAnalysisResultsTabThVOs.length > 9 ? false: true;
          angular.forEach(curTitleList.nodeAnalysisResultsTabThVOs, function(val, key) {
            // 动态head加载
            gridListData.push({
              display: val.displayName,
              displaytitle: val.displayName,
              name: val.displayName,
              align: 'right',
              width: 100,
              sortable: false,
              dataindex: val.dataindex
            });
          });

          var $newsGrid = $("<div id='newsGeidWrap'></div>");
          angular.element(".analysisDataListView .dataInfoList").html("").append($newsGrid);
          $('#newsGeidWrap').flexigrid({ //属性列表grid
            url: GLOBAL_STATIC.nodeRoot + 'node/analysis/order/' + graph.nodeId + '/results/?_=' + new Date().getTime(),
            method: 'GET',
            dataType: 'json',
            colModel: gridListData,
            sortname: '',
            sortorder: "asc",
            updateDefaultParam: true,
            buttons: [],
            params: [{
              "name": "resultId",
              "value": curTitleList.resultId
            }],
            usepager: true,
            useRp: true,
            rp: 20,
            query: "",
            qtype: "",
            showTableToggleBtn: true,
            colAutoWidth: isAutoTableWidth,
            onSuccess: function() {
              $('#newsGeidWrap tr').find(" td:last div").css("padding", "5px 9px")
            },
            onError: function(data, status, headers, config) {
              var responseText = data.responseText;
              var data = $.parseJSON(responseText);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          });
        }
      },
      "toggleReportTitle": function(i, curTitleList) { // 切换报告
        var _this = this;
        angular.forEach(_this.tabReportList, function(val, key) {
          val.hoverVal = false;
          if (i == key) {
            val.hoverVal = true;
          }
        });
        _this.resultId = curTitleList.resultId;
        _this.getReportDataByDimension(curTitleList);

        $scope.existFileResult = "false";

        if ($scope.checkFile$) {
        } else {
          $scope.checkFile$ = $interval(function() {
            $scope.existFile === "true" || getListService.checkFile($scope.analysisScopeObj, function(data) {
              $scope.existFile = data.existFile;
            });
            getListService.checkFileResult($scope.analysisScopeObj, function(data) {
              $scope.existFileResult = data.existFile;
            });
          }, 3000);
        }

      },
      "getEditorData": function() {
        var _this = this; //验证输出名是否重名的数组
        var analysisData = {
          "nodeId": graph.nodeId,
          "nodeName": _this.name || "",
          "nodeRemark": $scope.nodecomment || "",
          "shopVOs": _this.postSaveShopsData || [],
          "subjectId": _this.defaultSubjectId || "",
          "quotaAttributeKeys": [],
          "dimensionAttributeKeys": []
        };
        analysisData.nodeAnalysisScreeningVO = $.extend({},
            _this.curSubjectAnalysisConfigConditions, true);
        var storgConditionsAry = [];
        if (analysisData.nodeAnalysisScreeningVO.attribute) { // 处理nodeAnalysisScreeningVO，只传已填入的数据
          angular.forEach(analysisData.nodeAnalysisScreeningVO.attribute, function(val, key) {
            if ((val.type == "商品选择" && val.values && val.values.storeProductId) || (val.values && val.values.value && !(/^,$/.test(val.values.value))) || (val.values && val.values.interval && !(/^,$/.test(val.values.interval)))) {
              storgConditionsAry.push(val)
            }
          });
        }
        analysisData.nodeAnalysisScreeningVO.attribute = storgConditionsAry.slice();

        angular.forEach(_this.analysisItemsList, function(val, key) {
          if (val.isChecked) {
            analysisData.quotaAttributeKeys.push(val.attributeKey);
          }
        });

        angular.forEach(_this.analysisDimensionList, function(val, key) {
          if (val.isChecked) {
            analysisData.dimensionAttributeKeys.push(val.attributeKey);

          }
        })

        return analysisData;
      },
      "postDiscountEcData": function(ent) {
        var postServiceData = $scope.analysisScopeObj.getEditorData(),
            _this = this;
        if(_this.isEditorFlag) {
          return '当前节点不可编辑';
        }
        if ($scope.analysisScopeObj.name == "") {
          return false;
        };
        if (postServiceData.shopVOs.length == 0) {
          this.isUnShops = true;
          this.selectShopsVal = "请选择店铺";
          return false;
        }

        if (postServiceData.quotaAttributeKeys.length > 5) {
          $(this).Confirm({
            "title": "温馨提示",
            "str": "选择分析内容超过5个会导致分析执行时间较长，确定要保存吗？",
            "mark": true,
            "eleZindex": 1010,
            "markZindex": 1005
          }, function() {
            $scope.$apply(function() {
              putTanalysisData();
            });
          });
          return false;
        }

        if (postServiceData.quotaAttributeKeys.length == 0) {
          _this.isErrorShow = true;
          _this.errorMes = "请至少选择一种分析内容"
          return false;
        }

        function putTanalysisData() {
          var element = angular.element(ent.target);
          disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
            getListService.postAnalysisNodeData(function(response) {
              disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
              element.closest("#nodeContent").hide();
              $(".yunat_maskLayer").remove();
              $(this).yAlert({
                "text": "保存成功"
              });
              removeAlert();
              $scope.editNodeName(response.nodeId, response.nodeName, $scope.nodecomment);
            }, postServiceData, element);
          }, element);
        }
        putTanalysisData();
      }
    };
    $scope.analysisScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }
]);
