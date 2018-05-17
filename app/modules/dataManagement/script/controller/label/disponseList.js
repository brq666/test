/**
 *@project:ccms6.x
 *@author: Peach.Tao
 * Created by on 14-8-11.
 */
angular.module("dataManage.controllers").controller('DisponseListCtrl', ["$scope", "$parse", "ngCustomListService", "productLabelService", "$rootScope",
  function($scope, $parse, ngCustomListService, productLabelService, $rootScope) {
    $scope.disponseLabelObj = {
      "whichAction": "",
      // 判断商品标签的模板的使用途径
      //默认收起
      "searchBoxStatus": true,
      "toggleVal": "展开",
      "toggleConditions": function() {
        this.searchBoxStatus = !this.searchBoxStatus;
        this.toggleVal = this.searchBoxStatus ? "展开": "收起";
      },
      "shopName": "",
      //获取店铺
      "shopId": "",
      "defaultShopName": "",
      "defaultShopId": "",
      "shopDataObj": "",
      "getSearchShops": function() {
        var _this = this;
        _this.common(_this.shopDataObj, $('[name="labelShops"]'));
      },
      "getInitShopData": function() {
        var _this = this;
        ngCustomListService.getShopsByPlatformId(function(data) {
          _this.shopDataObj = data;
          _this.shopName = data[0].name;
          _this.shopId = data[0].idInPlat;
          _this.defaultShopName = data[0].name;
          _this.defaultShopId = data[0].idInPlat;
          //初始化搜索
          _this.searchProductList(1, 20, true);
        }, $rootScope.taobaoSegmentationId);
      },
      "productId": "",
      "fontLists": [],
      //关键字
      "fontRelation": "AND",
      "viewFontValues": "",
      "settingKeyWords": function() {
        this.keyWordSrc = baseUrl + "label/keyword.html"
      },
      "openPlugPop": function(flag) {
        //flag:1-关键字，2-商品标签
        var element = "",
            popWidth = "",
            titleVal = "",
            _this = this;
        if (flag == 1) {
          element = ".keyWorldsPlug";
          popWidth = 520;
          titleVal = "请选择关键字";
        } else if (flag == 2) {
          element = _this.whichAction == "searchAction" ? ".labelFilterPlug": ".productEditorLabelPlug";
          popWidth = 760;
          titleVal = "请选择标签";
        }
        $(element).addInteractivePop({
          magTitle: titleVal,
          width: popWidth,
          mark: true,
          position: "fixed"
        });
      },
      "priceMin": "",
      //价格
      "priceMax": "",
      "viewMarkValue": "",
      //商品标识类目
      "viewMarkId": "",
      "gettingMark": function() {
        var _this = this,
            curShopId = angular.element("[name='labelShops']").attr("valueid");
        productLabelService.getStandardCategoryByShopId(function(data) {
          _this.commonTree(data, $('[name="productMarkZtree"]'));
        }, _this.shopId);
      },
      "viewAttributeValue": "",
      //商品属性
      "viewAttributeId": "",
      "gettingAttribute": function() {
        var _this = this;
        productLabelService.getPropertysByCid(function(data) {
          _this.common(data, $('[name="productAttributes"]'));
        }, _this.viewMarkId);
      },
      "attributeSelectVal": "",
      //属性值
      "attributeSelectId": "",
      "gettingAttributeSelectVal": function() {
        var _this = this;
        productLabelService.getPropertysByCidAndPid(function(data) {
          _this.common(data, $('[name="productAttributeSelectVal"]'));
        }, _this.viewMarkId, _this.viewAttributeId);
      },
      "isShowSelectedTree": false,
      //商品自定义类目
      "checkBoxObj": "",
      "configLmValues": "",
      "configLmIds": [],
      "gettingConfigLm": function() {
        var _this = this,
            curShopId = angular.element("[name='labelShops']").attr("valueid");;
        _this.isShowSelectedTree = true;
        productLabelService.getCustomcategory(function(response) {
          _this.settingCheckBoxZtree(response);
        }, _this.shopId);
      },
      "settingCheckBoxZtree": function(data) {
        var _this = this;
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
                  checkObj = $("#" + treeNode.tId + "_check");
              switchObj.remove();
              icoObj.before(switchObj);

              switchObj.after(checkObj);
              var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
              if (treeNode.level != 0) {
                switchObj.before(spaceStr)
              }; // 展定最外层不给宽度
              if (treeNode.level == 0 && !treeNode.isLastNode) {
                $('#' + treeNode.tId + '_a').after("<div class='root_level0_line'></div>");
              };
              if (!treeNode.isParent) {
                $("#" + treeNode.tId + "_switch").remove();
              }
            },
            dblClickExpand: false,
            showIcon: false
          },
          data: {
            simpleData: {
              enable: true,
              pIdKey: "pid"
            }
          },
          callback: {
            onCheck: function onCheck(event, treeId, treeNode) {}
          },
          edit: {
            enable: false
          }
        };
        $scope.disponseLabelObj.checkBoxObj = $.fn.zTree.init($(".queryCustomCheckedZtree"), setting, data);
        if (_this.configLmIds.length > 0) {
          _this.setDefaultTreeNode($scope.disponseLabelObj.checkBoxObj, _this.configLmIds);
        }
      },
      "setDefaultTreeNode": function(treeEle, defalutObj) { // 标注默认勾选
        treeEle.checkAllNodes(false);
        for (var i = 0; i < defalutObj.length; i++) {
          var node = treeEle.getNodesByParam("id", defalutObj[i])[0];
          if (node) {
            treeEle.checkNode(node, true, false);
            treeEle.expandNode(node.getParentNode(), true);
          }
        }
      },
      "sureCustomZtreeData": function() { // 确定
        var _this = this;
        var storeCustomZtreeValuesAry = [],
            storeCustomZtreeIdsAry = [];
        var returnZtreeData = _this.checkBoxObj.getCheckedNodes(true); //返回ztree选中数据
        if (returnZtreeData.length > 0) {
          angular.forEach(returnZtreeData, function(val, key) {
            if (!val.isParent) {
              storeCustomZtreeValuesAry.push(val.name);
              storeCustomZtreeIdsAry.push(val.id);
            }
          })
        };
        _this.configLmValues = storeCustomZtreeValuesAry.join(",");
        _this.configLmIds = storeCustomZtreeIdsAry.slice();
        _this.hiddenCustomZtree();
      },
      "hiddenCustomZtree": function() {
        this.isShowSelectedTree = false;
        $(".queryCustomCheckedZtree").html("");
      },
      "queryLabelLists": [],
      //商品标签
      "viewLabelFilterId": [],
      "viewLabelFilterValues": "",
      "settingLabelFilter": function() {
        var _this = this;
        _this.productLabelSrc = "";
        _this.whichAction = "searchAction";
        _this.productLabelSrc = baseUrl + "label/productLabelSelected.html"
      },
      "wrapCodeType": "",
      //商品外部编码
      "startCutBit": "",
      "endCutBit": "",
      "wrapCodeContent": "",
      "wrapCodeTypeFlag": "",
      "outerShow": false,
      "outerShowValue": "请输入匹配的外部编码",
      //长度必须和位数匹配
      "getWrapCodeType": function() {
        var _this = this,
            data = [
              {
              "name": "不截取",
              "cutFalg": false
              },
              {
                "name": "截取",
                "cutFalg": true
              }
            ];
        _this.common(data, $('[name="wrapCodeSelect"]'));
      },
      "getSearchDataObj": function() { // 获取搜索配置条件
        var _this = this;
        var searchObj = {
          "shopId": _this.shopId,
          "numiid": _this.productId || null,
          "keywords": _this.fontLists.slice(),
          "isKeywordAnd": _this.fontLists.length > 0 ? (_this.fontRelation == "AND" ? true: false) : "",
          "maxPrice": _this.priceMax * 1 || null,
          "minPrice": _this.priceMin * 1 || null,
          "productStandardCategoryClustersVO": _this.viewMarkId ? {
            "productStandardCategoryId": _this.viewMarkId,
            "productStandardCategoryName": _this.viewMarkValue
          }: {},
          "productCustomCategoryVO": {
            "leafCid": _this.configLmIds.slice()
          },
          "tagsIds": _this.viewLabelFilterId.slice(),
          "productOuterVO": {
            "endCutBit": _this.endCutBit,
            "outerCutFlag": _this.wrapCodeType ? (_this.wrapCodeType == "不截取" ? false: true) : "",
            "outerId": _this.wrapCodeContent,
            "startCutBit": _this.startCutBit
          },
          "productSkuVO": { //非业务功能SKU，后台需要
            "outerId": "",
            "skuName": ""
          }
        };

        if (_this.viewAttributeValue) { //商品属性 属性值
          searchObj.productStandardCategoryClustersVO.productStandardCategoryPropertyId = _this.viewAttributeId;
          searchObj.productStandardCategoryClustersVO.productStandardCategoryPropertyName = _this.viewAttributeValue;
          searchObj.productStandardCategoryClustersVO.productStandardCategoryPropertyValueId = _this.attributeSelectId;
          searchObj.productStandardCategoryClustersVO.productStandardCategoryPropertyValueName = _this.attributeSelectVal;
        }
        _this.isSearchOutData = angular.copy(searchObj);
        return searchObj;
      },
      "isSearchOutData": {},
      "searchProductList": function(page, pageSize, isSearchButtonClick) { //搜索
        var _this = this;
        if (isSearchButtonClick) { // 搜索按钮方可验证
          if (_this.priceMax * 1 < _this.priceMin * 1) {
            var dynamicVal = _this.priceMax * 1;
            _this.priceMax = _this.priceMin * 1;
            _this.priceMin = dynamicVal;
          };

          if (_this.viewAttributeValue && !_this.attributeSelectVal) { // 属性值联动必填
            $(this).Alert({
              "title": "提示",
              "str": "请填写属性值",
              "mark": true,
              "width": "160px",
              "eleZindex": 1010,
              "markZindex": 1005
            });
            return false;
          };

          if (_this.wrapCodeType && !_this.wrapCodeContent) {
            _this.outerShow = true;
            _this.outerShowValue = "请输入匹配的外部编码";
            return false;
          };

          if (_this.wrapCodeType == "截取" && (!_this.startCutBit || !_this.endCutBit)) {
            _this.outerShow = true;
            _this.outerShowValue = "请输入需要截取的位置";
            return false;
          } else if (_this.wrapCodeType == "截取" && (_this.startCutBit > _this.endCutBit)) {
            _this.outerShow = true;
            _this.outerShowValue = "截止位数大于开始位数";
            return false;
          }

          if (_this.wrapCodeType == "截取" && ((_this.endCutBit - _this.startCutBit + 1) != _this.wrapCodeContent.length)) {
            _this.outerShow = true;
            _this.outerShowValue = "长度必须和位数匹配";
            return false;
          }
        };
        _this.outerShow = false;
        var reqData = isSearchButtonClick ? _this.getSearchDataObj() : _this.isSearchOutData;
        reqData.page = page || 1;
        reqData.pagesize = pageSize || 20;
        $scope.searchButtonStatus = true;
        productLabelService.GetProductList(function(response) {
          _this.totalPage = Math.ceil((response.total) / (response.pageSize)) || 1;
          _this.currentPage = response.page || 1;
          _this.rp = response.pageSize || 20;
          _this.resultrProducts = response.data || [];
          _this.resultSearchTotal = response.total || 0;
          _this.setDefaultProductIsChecked();
          /*var s=setInterval(function(){
           console.log(angular.element(".labelListsWrap .labelContentList").length)
           clearInterval(s);
           },1000)*/
          $scope.searchButtonStatus = false;
        }, reqData);
      },
      "resetConditions": function() { // 重置
        this.shopId = this.defaultShopId;
        this.shopName = this.defaultShopName;
        this.productId = "";
        this.fontLists = []; //关键字
        this.fontRelation = "AND";
        this.viewFontValues = "";
        this.priceMax = "";
        this.priceMin = "";
        this.viewMarkValue = ""; //商品标识类目
        this.viewMarkId = "";
        this.viewMarkValue = "";
        this.viewMarkId = "";
        this.viewAttributeValue = "";
        this.viewAttributeId = "";
        this.attributeSelectVal = "";
        this.attributeSelectId = "";
        this.configLmValues = "";
        this.configLmIds = [];
        this.viewLabelFilterId = [];
        this.queryLabelLists = [];
        this.viewLabelFilterValues = [];
        this.wrapCodeType = "";
        this.wrapCodeContent = "";
        this.startCutBit = "";
        this.endCutBit = "";
        this.outerShow = false;
      },
      "firstPage": function() { // 第一页
        var _this = this;
        if (_this.currentPage != 1) {
          _this.currentPage = 1;
          _this.searchProductList(1, _this.rp);
        }
      },
      "prevPage": function() { // 向前一页
        var _this = this;
        if (_this.currentPage > 1) {
          _this.currentPage--;
          _this.searchProductList(_this.currentPage, _this.rp);
        }
      },
      "lastPage": function() { // 回到最后一页
        var _this = this;
        if (_this.currentPage != _this.totalPage) {
          _this.currentPage = _this.totalPage;
          _this.searchProductList(_this.totalPage, _this.rp);
        }
      },
      "nextPage": function() { // 向后一页
        var _this = this;
        if (_this.currentPage != _this.totalPage) {
          _this.currentPage++;
          _this.searchProductList(_this.currentPage, _this.rp);
        }
      },
      "changeRp": function() { // 换页容量
        var _this = this;
        _this.searchProductList(_this.currentPage, _this.rp);
      },
      "resultrProducts": "",
      // 商品搜索结果
      "delSingleLabel": function(pindex, index) { // 单个删除
        var _this = this;
        var singleProData = {
          "proId": _this.resultrProducts[pindex].num_iid,
          "tagId": _this.resultrProducts[pindex].tags[index].tagId,
          "shopId": _this.shopId
        };
        $(this).Confirm({
          "title": "删除提示",
          "str": "确认删除该商品标签？",
          "mark": true,
          "eleZindex": 1010,
          "markZindex": 1005
        }, function() {
          $scope.$apply(function() {
            productLabelService.deleteSingleLabel(function(response) {
                  _this.resultrProducts[pindex].tags.splice(index, 1);
                  $(this).yAlert({
                    "text": "删除成功"
                  });
                  removeAlert();
                },
                singleProData);
          });
        });
      },
      "curSingleProLabelLists": [],
      // 单签选择的商品已有的标签
      "toggleProLabelStatus": function(e) {
        var thisEle = angular.element(e.target);;
        if (e.target != "p") {
          var parentP = thisEle.closest("p");
          if (parentP.find("a").hasClass("downSanjiao")) {
            parentP.find("a").attr("class", "upSanjiao");
            parentP.closest(".labelListsWrap").removeClass("upHeightOverflow");
            parentP.find("span").html("收起");
          } else {
            parentP.find("a").attr("class", "downSanjiao");
            parentP.closest(".labelListsWrap ").addClass("upHeightOverflow");
            parentP.find("span").html("更多");
          }
        } else {
          if (thisEle.find("a").hasClass("downSanjiao")) {
            thisEle.find("a").attr("class", "upSanjiao");
            thisEle.closest(".labelListsWrap ").removeClass("upHeightOverflow");
            thisEle.find("span").html("收起");
          } else {
            thisEle.find("a").attr("class", "downSanjiao");
            thisEle.closest(".labelListsWrap ").addClass("upHeightOverflow");
            thisEle.find("span").html("更多");
          }
        }

      },
      "addSingleLabel": function(pindex, index) { // 单个添加
        var _this = this;
        _this.productEditorLabelPlugSrc = "";
        _this.whichAction = "singleAction";
        _this.curSingleProLabelLists = _this.resultrProducts[pindex];
        _this.productEditorLabelPlugSrc = baseUrl + "label/productLabelSelected.html"
      },
      "sureAddSingleLabelcallback": function(datas, ids) {
        var _this = this,
            curTagsListAry = _this.curSingleProLabelLists.tags;
        var putData = {
          "productIds": [_this.curSingleProLabelLists.num_iid],
          "searchConditions": _this.isSearchOutData,
          "tagIds": ids,
          "allSelect": false
        };
        productLabelService.putSingleLabel(function(data) {
          var newSelectedLabelData = [],
              orderSelectedLabelData = [];
          angular.forEach(curTagsListAry, function(curVal, curKey) {
            var isSelectedFlag = false;
            angular.forEach(datas, function(newVal, newKey) {
              if (curVal.tagId == newVal.tagId) {
                isSelectedFlag = true;
              }
            });
            if (isSelectedFlag) {
              newSelectedLabelData.push(curVal);
            }
          });
          orderSelectedLabelData = newSelectedLabelData.slice();

          angular.forEach(datas, function(v, k) {
            var addFlag = true;
            angular.forEach(newSelectedLabelData, function(hasVal, hasKey) {
              if (v.tagId == hasVal.tagId) {
                addFlag = false;
              }
            });
            if (addFlag) {
              orderSelectedLabelData.push(v);
            }
          });
          _this.curSingleProLabelLists.tags = orderSelectedLabelData.slice();
          $(this).yAlert({
            "text": "添加成功"
          });
          removeAlert();
        }, putData);
      },
      "allActivityCheckedFull": false,
      //批量操作
      "isThisPage": "0",
      // 0:当页，1：全部
      "allActivityCheckedPart": false,
      "getAllSelectedActivityBtn": function() {
        this.allActivityCheckedPart = false;
        if (!this.allActivityCheckedFull) {
          this.allActivityCheckedFull = true;
        } else {
          this.allActivityCheckedFull = false;
        }
        this.setDefaultProductIsChecked();
      },
      "changePageType": function() {
        if (this.isThisPage == "1") {
          this.setDefaultProductIsChecked();
        }
      },
      "changeSingleCheckbox": function(thisChecked) {
        var _this = this,
            selectedLength = 0;
        angular.element(".resultContent .pic input").each(function() {
          if ($(this).attr("checked") == "checked") {
            selectedLength++;
          }
        });
        if (selectedLength == 0) {
          _this.allActivityCheckedFull = false;
          _this.allActivityCheckedPart = false;
          return;
        }
        if (selectedLength == _this.resultrProducts.length) {
          _this.allActivityCheckedFull = true;
          _this.allActivityCheckedPart = false;
        } else {
          _this.allActivityCheckedFull = false;
          _this.allActivityCheckedPart = true;
        }
      },
      "setDefaultProductIsChecked": function() {
        var _this = this;
        angular.forEach(_this.resultrProducts, function(val, key) {
          val.isCheck = _this.allActivityCheckedFull;
        });
        this.allActivityCheckedPart = false;
      },
      "actionProLabelBatch": function(flag) { // 批量增加
        var _this = this;
        if (_this.getSelectedProListIds().length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "请选择商品",
            "mark": true,
            "width": "160px",
            "eleZindex": 1010,
            "markZindex": 1005
          });
          return false;
        };
        _this.productEditorLabelPlugSrc = "";
        _this.whichAction = flag == "批量删除" ? "batchDeleteAction": "batchAddAction";
        _this.productEditorLabelPlugSrc = baseUrl + "label/productLabelSelected.html"
      },
      "sureAddbatchLabelcallback": function(callback, ids) { //确定批量添加
        var _this = this;
        var batchAddData = {
          "productIds": _this.isThisPage == "0" ? _this.getSelectedProListIds().slice() : [],
          "tagIds": ids,
          "allSelect": _this.isThisPage == "0" ? false: true
        };

        batchAddData.searchConditions = _this.isSearchOutData;

        productLabelService.putBatchLabel(function(data) {
          callback();
          _this.searchProductList(_this.currentPage, _this.rp);
          $(this).yAlert({
            "text": "批量添加成功"
          });
          removeAlert();
        }, batchAddData);
      },
      "sureDeletebatchLabelcallback": function(callback, ids) { // 批量删除
        var _this = this;
        var batchDeleteData = {
          "productIds": _this.isThisPage == "0" ? _this.getSelectedProListIds().slice() : [],
          "tagIds": ids,
          "allSelect": _this.isThisPage == "0" ? false: true
        };

        batchDeleteData.searchConditions = _this.isSearchOutData;

        productLabelService.deleteBatchLabel(function(data) {
          callback();
          _this.searchProductList(_this.currentPage, _this.rp);
          $(this).yAlert({
            "text": "批量删除成功"
          });
          removeAlert();
        }, batchDeleteData);
      },
      "getSelectedProListIds": function() {
        var selectedIds = [],
            _this = this;
        angular.forEach(_this.resultrProducts, function(val, key) {
          if (val.isCheck) {
            selectedIds.push(val.num_iid);
          }
        });
        return selectedIds
      },
      //模拟普通的select框
      "common": function(data, ele) {
        var $selContent = ele.siblings(".selectContent");
        $selContent.children().remove();
        var eleName = ele.attr("name");
        var $ul = $("<ul>");
        if (data) {
          $selContent.append($ul);
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (eleName == "productAttributes") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].pid + '>' + data[i].name + '</a></li>')
            } else if (eleName == "labelShops") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].idInPlat + '>' + data[i].name + '</a></li>')
            } else if (eleName == "wrapCodeSelect") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].cutFalg + '>' + data[i].name + '</a></li>')
            } else if (eleName == "productAttributeSelectVal") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].vid + '>' + data[i].name + '</a></li>')
            }
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            })

          }
          $ul.find("a").bind({
            "click": function() {
              var modelValue = "",
                  selecteedId = $(this).attr("id"),
                  selecteedValue = $(this).text();
              ele.val(selecteedValue);
              ele.attr("valueId", selecteedId);

              if (eleName == "labelShops") {
                //店铺
                modelValue = "disponseLabelObj.shopName";
                modelIdValue = "disponseLabelObj.shopId";
              } else if (eleName == "productAttributes") {
                modelValue = "disponseLabelObj.viewAttributeValue";
                modelIdValue = "disponseLabelObj.viewAttributeId";
              } else if (eleName == "wrapCodeSelect") {
                modelValue = "disponseLabelObj.wrapCodeType";
                modelIdValue = "disponseLabelObj.wrapCodeTypeFlag";
              } else if (eleName == "productAttributeSelectVal") {
                modelValue = "disponseLabelObj.attributeSelectVal";
                modelIdValue = "disponseLabelObj.attributeSelectId";
              }
              $selContent.slideUp(200);
              $scope.$apply(function() {
                $parse(modelValue).assign($scope, selecteedValue);
                $parse(modelIdValue).assign($scope, selecteedId);
              })
            },
            "mouseenter": function() {
              $(this).css({
                "color": "#0083BA",
                "background": "#F2F2F2",
                "text-decoration": "none"
              });
            },
            "mouseleave": function() {
              $(this).css({
                "color": "#3D3D3D",
                "background": "#FFFFFF"
              });
            }
          })
        }
      },
      //模拟ztree选择框
      "commonTree": function(data, ele) { //模拟select框中为树形结构
        var $selContent = ele.siblings(".selectContent");
        $selContent.children().remove();
        var $ul = $("<ul>", {
          "class": "ztree"
        });
        $selContent.append($ul);
        var elementName = ele.attr("name");
        if (data) {
          function onClick(event, treeId, treeNode) {
            ele.val(treeNode.name);
            ele.attr("valueId", treeNode.id);
            $selContent.html("").slideUp(200);

            //商品标识类目
            if (elementName == "productMarkZtree") {
              $scope.$apply(function() {
                $scope.disponseLabelObj.viewMarkValue = treeNode.name;
                $scope.disponseLabelObj.viewMarkId = treeNode.cid;
              })
            }
          }

          var setting = {
            data: {
              key: {
                title: "name"
              },
              simpleData: {
                enable: true
              }
            },
            view: { //设置多级样式
              //dblClickExpand: false,父级双击不可点击
              addDiyDom: function(treeId, treeNode) {
                var spaceWidth = 10;
                var switchObj = $("#" + treeNode.tId + "_switch"),
                    icoObj = $("#" + treeNode.tId + "_ico");
                switchObj.remove();
                icoObj.before(switchObj);
                var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
                switchObj.before(spaceStr);
              }
            },
            callback: {
              onClick: onClick
            }
          };
          if (elementName == "productMarkZtree") {
            setting.data.simpleData = {
              enable: true,
              idKey: "cid",
              pIdKey: "parentCid"
            }
          }
          $.fn.zTree.init($ul, setting, data);
        }
      }
    };

    //获取店铺
    $scope.disponseLabelObj.getInitShopData();

    //监听关键字
    $scope.$watch("disponseLabelObj.fontLists", function(n, o) {
      if (n.length != 0) {
        $scope.disponseLabelObj.viewFontValues = "已选择" + n.length + "个关键字";
        $scope.disponseLabelObj.viewFontValuesTitle = n.join(",");
      } else {
        $scope.disponseLabelObj.viewFontValues = "";
        $scope.disponseLabelObj.viewFontValuesTitle = "";
      }
    })

    //监听商品标签
    $scope.$watch("disponseLabelObj.queryLabelLists", function(n, o) {
      if (n.length != 0) {
        $scope.disponseLabelObj.viewLabelFilterValues = "已选择" + n.length + "个商品标签";
        var tagNameAry = [],
            tagIdAry = [];
        angular.forEach(n,
            function(val, key) {
              tagNameAry.push(val.value);
              tagIdAry.push(val.id);
            });
        $scope.disponseLabelObj.viewLabelFilterTitle = tagNameAry.join(",");
        $scope.disponseLabelObj.viewLabelFilterId = tagIdAry.slice();
      } else {
        $scope.disponseLabelObj.viewLabelFilterValues = "";
        $scope.disponseLabelObj.viewLabelFilterTitle = "";
        $scope.disponseLabelObj.viewLabelFilterId = [];
      }
    });

    //外部编码
    $scope.$watch("disponseLabelObj.wrapCodeType", function(n, o) {
      if (n != o) {
        $scope.disponseLabelObj.wrapCodeContent = "";
        $scope.disponseLabelObj.startCutBit = "";
        $scope.disponseLabelObj.endCutBit = "";
        $scope.disponseLabelObj.outerShow = false;
      }
    });

    angular.element(".resultBottom .activityInputPage").bind("keyup", function(e) { // 页码框 输入enter键请求
      if (e.keyCode == 13) {
        $scope.disponseLabelObj.searchProductList($scope.disponseLabelObj.currentPage, $scope.disponseLabelObj.rp);
      }
    });

    //监听操作标签更多按钮
    $scope.$watch(function() {
      $(".labelListsWrap .labelContentList").each(function() {
        var curUlHeight = $(this).height();
        if (curUlHeight < 65) {
          $(this).siblings("p").hide();
        } else {
          $(this).siblings("p").show();
        }
      });
    })

    //店铺 、商品类目，商品属性，属性值联动
    $scope.$watch("disponseLabelObj.shopId", function(newv, oldv) {
      if (newv && oldv && (newv != oldv)) {
        $scope.disponseLabelObj.viewMarkId = "";
        $scope.disponseLabelObj.viewMarkValue = "";
        $scope.disponseLabelObj.configLmValues = "";
        $scope.disponseLabelObj.configLmIds = [];
        $scope.disponseLabelObj.viewAttributeValue = "";
        $scope.disponseLabelObj.viewAttributeId = "";
        $scope.disponseLabelObj.attributeSelectVal = "";
        $scope.disponseLabelObj.attributeSelectId = "";
      }
    });

    //商品类目，商品属性，属性值联动
    $scope.$watch("disponseLabelObj.viewMarkId", function(newv, oldv) {
      if (newv && oldv && (newv != oldv)) {
        $scope.disponseLabelObj.viewAttributeValue = "";
        $scope.disponseLabelObj.viewAttributeId = "";
        $scope.disponseLabelObj.attributeSelectVal = "";
        $scope.disponseLabelObj.attributeSelectId = "";
      }
    });

    $scope.$watch("disponseLabelObj.viewAttributeId", function(newv, oldv) {
      if (newv && oldv && (newv != oldv)) {
        $scope.disponseLabelObj.attributeSelectVal = "";
        $scope.disponseLabelObj.attributeSelectId = "";
      }
    });
  }
]);
