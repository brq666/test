(function(window, angular, undefined, webApp) {
  webApp.controller("proList", ["$scope", "$http", "ngSelectorService", "$q", "$rootScope",
    function($scope, $http, ngSelectorService, $q, $rootScope) {
      $scope.saleStatus = 'all';
      $(".queryLoading").show();
      $scope.searchButtonStatus = false;
      /*start 窗口尺寸改动*/
      function changeWindowSize() {
        $(".selectionBox").height($(window).height() - 400);
        $("#selectionBtn").css("top", $(".selectionBox").height() / 2);
      }

      changeWindowSize();
      $(window).resize(changeWindowSize);
      /*end 窗口尺寸改动*/
      /*start 右击事件--隐藏弹窗窗或者enable复选框*/
      document.addEventListener("mousedown",
      function(e) {
        var target = e.target || e.srcElement;
        if ($(target).closest(".skuItemsLeft").length > 0 || target.className == "addGoods" || target.innerText == "SKU" || $(target).closest(".skuItemsRight").length > 0) {} else {
          $(".skuItemsLeft").hide();
          $(".skuItemsRight").hide();
          $("#prevSelection .items input").removeAttr("disabled");
        }
      }, false);
      /*end 右击事件--隐藏弹窗窗或者enable复选框*/
      //商品选择器-商品标准类目
      $scope.change_Standard = function() {
        if ($scope.shop != null) {
          $("#StandardCategoryValue").removeAttr("disabled");
          $("#Classification").removeAttr("disabled");
          $("#selProperty").attr("disabled", "disabled");
          $("#selPropertyValue").attr("disabled", "disabled");
          $scope.StandardCategory.StandardCategoryValue = "不限类目";
          $scope.StandardCategory.StandardCategoryValueId = "";
          $scope.StandardCategory.defaultCheckedId = "";
          $scope.Classification.ClassificationValue = "";
          ngSelectorService.getStandardCategoryByShopId(function(responseA) {
            var noSelect = {
              "cid": "",
              "isLeaf": "true",
              "name": "不限类目",
              "parentCid": "0"
            }
            responseA.unshift(noSelect);
            $scope.StandardCategory.settingStandardCategoryCheckZtree(responseA);
          }, $scope.shop.idInPlat);
          ngSelectorService.getCustomcategory(function(Customcategory) {
            $scope.Classification.settingClassificationCheckZtree(Customcategory);
          }, $scope.shop.idInPlat);
          $scope.selProperty = null;
          $scope.selPropertyValue = null;
        } else {
          $scope.StandardCategory.StandardCategoryValue = "不限类目";
          $scope.StandardCategory.StandardCategoryValueId = "";
          $scope.StandardCategory.defaultCheckedId = "";
          $scope.selProperty = null;
          $scope.selPropertyValue = null;
          $scope.Classification.ClassificationValue = "";
          $scope.Classification.ClassificationValueIds = [];
          $scope.Classification.leafCid = [];
          $("#Classification").attr("disabled", "disabled");
          $("#StandardCategoryValue").attr("disabled", "disabled");
          $("#selProperty").attr("disabled", "disabled");
          $("#selPropertyValue").attr("disabled", "disabled");
        }
      }
      //根据标准类目CID查询商品属性信息列表
      $scope.change_property_by_cid = function() {
        if ($scope.StandardCategory.StandardCategoryValueId != "") {
          ngSelectorService.getPropertysByCid(function(response) {
            $scope.PropertysList = response;
            $scope.selProperty = null;
            $("#selProperty").removeAttr("disabled");
            $scope.selPropertyValue = null;
            $("#selPropertyValue").attr("disabled", "disabled");
          }, $scope.StandardCategory.StandardCategoryValueId);
        } else {
          $scope.selProperty = null;
          $scope.selPropertyValue = null;
          $("#selProperty").attr("disabled", "disabled");
          $("#selPropertyValue").attr("disabled", "disabled");
        }
      }
      //根据标准类目CID和PID查询商品属性值列表
      $scope.change_property_by_cid_and_pid = function() {
        if ($scope.selProperty != null) {
          ngSelectorService.getPropertysByCidAndPid(function(response) {
            $scope.PropertyValueList = response;
            $scope.selPropertyValue = null;
            $("#selPropertyValue").removeAttr("disabled");
          }, $scope.StandardCategory.StandardCategoryValueId, $scope.selProperty.pid);
        } else {
          $scope.selPropertyValue = null;
          $("#selPropertyValue").attr("disabled", "disabled");
        }
      }
      //截取
      $scope.changeProductOutCodeCutFlag = function() {
        $scope.productOuterVO.outerId = "";
        if ($scope.productOuterVO.outerCutFlag == 'true') {
          $scope.productOuterVO.startCutBit = "";
          $scope.productOuterVO.endCutBit = "";
        }
      }
      //标签
      var tagsDefer = $q.defer(); // 标签获取后再初始化执行save方法
      ngSelectorService.getTags(function(response) {
        $scope.goodTags.hasPower = false;
        $scope.tagLists = response;
        tagsDefer.resolve();
      }, function(data, status) {
        if (status == 403 && data.description == "您不能进行此操作") {
          $scope.goodTags.hasPower = true;
          $scope.productTags = data.description;
          return false;
        }
      })

      //检查格式
      $scope.checkSearch = function() {
        if ($scope.minPrice > 0 && $scope.maxPrice > 0 && parseFloat($scope.minPrice) >= parseFloat($scope.maxPrice)) {
          var min = $scope.minPrice;
          var max = $scope.maxPrice;
          $scope.maxPrice = min;
          $scope.minPrice = max;
        }
        //商品外部ID
        if ($scope.productOuterVO.outerCutFlag == "true") {
          if ($scope.productOuterVO.endCutBit != undefined && $scope.productOuterVO.endCutBit != "" && $scope.productOuterVO.endCutBit && null) {
            if ($scope.productOuterVO.startCutBit == "" || $scope.productOuterVO.startCutBit == undefined || $scope.productOuterVO.startCutBit == null) {
              $scope.outerShow = true;
              $scope.outerMessage = "请输入开始位数";
              return false;
            }
            if ($scope.productOuterVO.outerId == "" || $scope.productOuterVO.outerId == undefined || $scope.productOuterVO.outerId == null) {
              $scope.outerShow = true;
              $scope.outerMessage = "请输入匹配的外部编码";
              return false;
            }
          }
          if ($scope.productOuterVO.outerId != undefined && $scope.productOuterVO.outerId != "" && $scope.productOuterVO.outerId != null) {
            if ($scope.productOuterVO.startCutBit == "" || $scope.productOuterVO.startCutBit == undefined || $scope.productOuterVO.startCutBit == null) {
              $scope.outerShow = true;
              $scope.outerMessage = "请输入开始位数";
              return false;
            }
            if ($scope.productOuterVO.endCutBit == "" || $scope.productOuterVO.endCutBit == undefined || $scope.productOuterVO.endCutBit == null) {
              $scope.outerShow = true;
              $scope.outerMessage = "请输入截止位数";
              return false;
            }
          }
          if ($scope.productOuterVO.startCutBit != undefined && $scope.productOuterVO.startCutBit != "" && $scope.productOuterVO.startCutBit != null) {
            if ($scope.productOuterVO.endCutBit == "" || $scope.productOuterVO.endCutBit == undefined || $scope.productOuterVO.endCutBit == null) {
              $scope.outerShow = true;
              $scope.outerMessage = "请输入截止位数";
              return false;
            }
            if ($scope.productOuterVO.outerId == "" || $scope.productOuterVO.outerId == undefined || $scope.productOuterVO.outerId == null) {
              $scope.outerShow = true;
              $scope.outerMessage = "请输入匹配的外部编码";
              return false;
            }
          }
          if ($scope.productOuterVO.outerId != undefined && $scope.productOuterVO.startCutBit != undefined && $scope.productOuterVO.endCutBit != undefined && $scope.productOuterVO.outerId != null && $scope.productOuterVO.startCutBit != null && $scope.productOuterVO.endCutBit != null && $scope.productOuterVO.outerId != "" && $scope.productOuterVO.startCutBit != "" && $scope.productOuterVO.endCutBit != "") {
            if (parseInt($scope.productOuterVO.endCutBit) < parseInt($scope.productOuterVO.startCutBit)) {
              $scope.outerShow = true;
              $scope.outerMessage = "截止位数大于开始位数";
              $scope.productOuterVO.endCutBit = "";
              $scope.productOuterVO.startCutBit = "";
              $scope.productOuterVO.outerId = "";
              return false;
            }
            var length = $scope.productOuterVO.endCutBit - $scope.productOuterVO.startCutBit + 1;
            if ($scope.productOuterVO.outerId.length != length) {
              $scope.outerShow = true;
              $scope.outerMessage = "长度必须和位数匹配";
              $scope.productOuterVO.outerId = "";
              $scope.productOuterVO.endCutBit = "";
              $scope.productOuterVO.startCutBit = "";
              return false;
            }
          }
          $scope.outerShow = false;
          $scope.outerMessage = "";
        }
        //商品属性和商品属性值
        if ($scope.selProperty != null && $scope.selPropertyValue == null) {
          $(this).Alert({
            "title": "提示",
            "str": "请选择商品属性值",
            "mark": true,
            "width": "200px"
          });
          return false;
        }
        return true;
      }
      //查询条件
      $scope.getSearchCondition = function() {
        var searchParam = {};
        searchParam.page = $scope.pageEvent.currentPage;
        searchParam.query = "";
        searchParam.pagesize = parseInt($scope.pageEvent.rp);
        searchParam.sortname = "";
        searchParam.sortorder = "";
        if ($scope.shop == null) { //店铺ID
          searchParam.shopId = null;
        } else {
          searchParam.shopId = $scope.shop.idInPlat;
        }
        searchParam.isKeywordAnd = $scope.goodsKeyWordPop.goodsEditorKeyWorldGX; //关键字关系 true:AND,false:OR
        searchParam.keywords = $scope.goodsKeyWordPop.initKeyWorldLists; //商品标题（关键字）
        searchParam.productStandardCategoryClustersVO = {};
        if ($scope.StandardCategory.StandardCategoryValueId != "") {
          searchParam.productStandardCategoryClustersVO.productStandardCategoryId = $scope.StandardCategory.StandardCategoryValueId; //标准类目ID
          searchParam.productStandardCategoryClustersVO.productStandardCategoryName = $scope.StandardCategory.StandardCategoryValue; //标准类目名称
          if ($scope.selProperty != null && $scope.selPropertyValue != null) {
            searchParam.productStandardCategoryClustersVO.productStandardCategoryPropertyId = $scope.selProperty.pid; //标准类目属性值ID
            searchParam.productStandardCategoryClustersVO.productStandardCategoryPropertyName = $scope.selProperty.name; //标准类目属性名称
            searchParam.productStandardCategoryClustersVO.productStandardCategoryPropertyValueId = $scope.selPropertyValue.vid; //标准类目属性ID
            searchParam.productStandardCategoryClustersVO.productStandardCategoryPropertyValueName = $scope.selPropertyValue.name; //标准类目属性值名称
          }
        }
        searchParam.numiid = $scope.numiid; //商品ID
        searchParam.productSkuVO = {};
        searchParam.productSkuVO.skuName = $scope.productSkuVO.skuName; //商品SKU名称
        searchParam.productSkuVO.outerId = $scope.productSkuVO.outerId; //商品SKU外部id
        searchParam.productOuterVO = {}; //
        searchParam.productOuterVO.outerCutFlag = $scope.productOuterVO.outerCutFlag; //是否截取外部编码 0：不截取 1：截取
        searchParam.productOuterVO.startCutBit = $scope.productOuterVO.startCutBit; //开始截取的位数
        searchParam.productOuterVO.endCutBit = $scope.productOuterVO.endCutBit; //结束截取的位数
        searchParam.productOuterVO.outerId = $scope.productOuterVO.outerId; //外部编码
        searchParam.isOnsale = $scope.saleStatus; //是否当前在售，'true'：是，'false'：下架, 'all' : 全部
        searchParam.productCustomCategoryVO = {};
        searchParam.productCustomCategoryVO.leafCid = $scope.Classification.ClassificationValueIds; //标准类目ID
        searchParam.tagsIds = $scope.tagsIds; //商品标签ID
        searchParam.minPrice = $scope.minPrice;
        searchParam.maxPrice = $scope.maxPrice;
        searchParam.isSelectorSearch = $scope.isSelectorSearch;
        return searchParam;
      }
      //搜索
      $scope.searchProductList = function(page, rp, flag) {
        $scope.prevCheckedAll = false;
        if ($scope.checkSearch()) {
          $(".queryLoading").show();
          $scope.searchButtonStatus = true;
          var searchParam = $scope.defaultSearchParams =  $scope.getSearchCondition();
          ngSelectorService.GetProductList(function(res) {
            $(".queryLoading").hide();
            $scope.searchButtonStatus = false;
            $scope.seachGoods = res["data"];
            $scope.pageEvent.totalPage = Math.ceil((res["total"]) / (searchParam.pagesize)) || 1;
          }, searchParam);
        }
      }
      //重置
      $scope.reset = function() {
        $scope.shop = $scope.Shops[0];
        $scope.numiid = "";
        $scope.StandardCategory.StandardCategoryValue = "";
        $scope.StandardCategory.StandardCategoryValueId = "";
        $scope.selProperty = null;
        $scope.selPropertyValue = null;
        $scope.Classification.ClassificationValue = "";
        $scope.Classification.leafCid = [];
        $scope.Classification.ClassificationValueIds = [];
        $scope.tagsIds = [];
        $scope.productKeyWorld = "";
        $scope.goodsKeyWordPop.initKeyWorldLists = [];
        $scope.goodsKeyWordPop.keyWorldLists = [];
        $scope.productTags = "";
        $scope.productSkuVO = {};
        $scope.productSkuVO.skuName = "";
        $scope.productSkuVO.outerId = "";
        $scope.minPrice = "";
        $scope.maxPrice = "";
        $scope.findByType = [];
        $scope.productOuterVO = {};
        $scope.productOuterVO.outerCutFlag = "false";
        $scope.productOuterVO.startCutBit = "";
        $scope.productOuterVO.endCutBit = "";
        $scope.productOuterVO.outerId = "";
        $scope.saleStatus = 'all';
        $("#Classification").attr("disabled", "disabled");
        $("#StandardCategoryValue").attr("disabled", "disabled");
        $("#selProperty").attr("disabled", "disabled");
        $("#selPropertyValue").attr("disabled", "disabled");
      }
      //保存搜索条件
      $scope.save = function(saveType) {
        if ($scope.checkSearch()) {
          $scope.isSelectorSearch = 1;
          var conditions = "商品条件：";
          if ($scope.shop != null) {
            conditions += "店铺=" + $scope.shop.name + ","
          }
          if ($scope.numiid != "" && $scope.numiid != undefined) {
            conditions += "商品ID=" + $scope.numiid + ","
          }
          if ($scope.goodsKeyWordPop.initKeyWorldLists.length > 0) {
            conditions += "关键字=" + $scope.goodsKeyWordPop.initKeyWorldLists.toString() + ","
          }
          if ($scope.StandardCategory.StandardCategoryValueId != "") {
            conditions += "商品标准类目=" + $scope.StandardCategory.StandardCategoryValue + ","
          }
          if ($scope.selPropertyValue != null) {
            conditions += "商品属性=" + $scope.selPropertyValue.name + ","
          }
          if ($scope.Classification.ClassificationValue != "" && $scope.Classification.ClassificationValue != "") {
            conditions += "商品自定义类目=" + $scope.Classification.ClassificationValue + ","
          }
          if ($scope.tagsIds != null) {
            var tags = [];
            for (var i = 0; i < $scope.tagsIds.length; i++) {
              for (var j = 0; j < $scope.tagLists.length; j++) {
                if ($scope.tagLists[j].tagId == $scope.tagsIds[i]) {
                  tags.push($scope.tagLists[j].tagName);
                  break;
                }
              }
            }
            if (tags.length > 0) {
              conditions += "商品标签=" + tags.join(",") + ","
            }
          }
          if ($scope.saleStatus && $scope.saleStatus != "false" && $scope.saleStatus != "all") {
            conditions += "只显示在架=是,";
          } else {
            conditions += "只显示在架=否,";
          }
          if ($scope.productSkuVO.skuName != "" && $scope.productSkuVO.skuName != undefined) {
            conditions += "SKU名称=" + $scope.productSkuVO.skuName + ","
          }
          if ($scope.productSkuVO.outerId != "" && $scope.productSkuVO.outerId != undefined) {
            conditions += "SKU外部ID=" + $scope.productSkuVO.outerId + ","
          }
          if ($scope.maxPrice > 0 && $scope.minPrice == "") {
            conditions += "价格=低于" + $scope.maxPrice + ","
          }
          if ($scope.minPrice > 0 && $scope.maxPrice == "") {
            conditions += "价格=高于" + $scope.minPrice + ","
          }
          if ($scope.minPrice > 0 && $scope.maxPrice > 0) {
            conditions += "价格=" + $scope.minPrice + "-" + $scope.maxPrice + ","
          }
          if ($scope.productOuterVO.outerCutFlag.toString() == "false") {
            if ($scope.productOuterVO.outerId != undefined && $scope.productOuterVO.outerId != null && $scope.productOuterVO.outerId != "") conditions += "商品外部编码=" + $scope.productOuterVO.outerId + ","
          } else {
            if ($scope.productOuterVO.endCutBit > 0 && $scope.productOuterVO.startCutBit > 0) {
              conditions += "商品外部编码=从" + $scope.productOuterVO.startCutBit + "位到" + $scope.productOuterVO.endCutBit + "是" + $scope.productOuterVO.outerId + ","
            }
          }
          if (conditions.lastIndexOf(",") > 0) {
            conditions = conditions.substr(0, conditions.length - 1);
          }
          $scope.conditions = conditions;
          $scope.selectorSearchVO = $scope.getSearchCondition();
          if (conditions == "商品条件：") {
            $scope.conditions = "";
            $scope.conditionFlag = false;
          } else {
            $scope.conditionFlag = true;
          }
          setNextSelectionHeight();
        }
      }
      $scope.selectorSearchVO = {};
      $scope.deleteContions = function() {
        $scope.conditions = "";
        $scope.conditionFlag = false;
        $scope.isSelectorSearch = 0;
        $scope.selectorSearchVO = {};
        setNextSelectionHeight();
      }
      //根据是否显示保存为条件来控制右侧商品列表的高度
      function setNextSelectionHeight() {
        var maxHeight = $(window).height() - 400 - 50 - 60;
        if (!$scope.conditionFlag) {
          maxHeight = $(window).height() - 400 - 50;
        }
        $("#nextSelection .productList").height(maxHeight);
      }
      $(window).resize(setNextSelectionHeight);
      //展示SKU列表
      $scope.showSkuList = function(part, $index, event, listsku) {
        var elem = angular.element(".skuItems" + part),
            ajaxDelay = $q.defer();
        if (part == "Left") {
          var skuSearchData = {
            "outerId": $scope.defaultSearchParams.productSkuVO.outerId || "",
            "skuName": $scope.defaultSearchParams.productSkuVO.skuName || ""
          };
          angular.element(event.target).hide().siblings(".skuListLoading").show().closest(".items ").siblings(".items").find(".skuListLoading").hide().end().find(".tag").show();
          ngSelectorService.getSkusList(function(data) {
            listsku = data || [];
            ajaxDelay.resolve();
            angular.element(event.target).show().siblings(".skuListLoading").hide();
          },$scope.shop.idInPlat ,$scope.seachGoods[$index].num_iid, skuSearchData);
        } else {
          ajaxDelay.resolve();
        };

        ajaxDelay.promise.then(function() {
          var skuHeight = listsku.length * 58;
          if (skuHeight > 135) {
            skuHeight = 135;
          }
          var left = $(event.target).position().left - 210;
          var id;
          if (part == "Left") {
            id = "#prevSelection";
          } else {
            id = "#nextSelection";
          }
          var prev = $(id + " .productList");
          var top = $(event.target).position().top + $index * 58 - prev.scrollTop();
          var bottom = prev.height() - ($(event.target).position().top + $index * 58 - prev.position().top - prev.scrollTop()) - 24;
          //var bottom = prev.height() - ($(event.target).position().top + $index * 58 -  prev.scrollTop());
          var space = bottom - skuHeight;
          if (space <= 0) {
            $(".slideUnfold3,.slideUnfold4").show();
            $(".slideUnfold,.slideUnfold2").hide();
            top = prev.height() + space - 40;
          } else {
            top = top + 30;
            $(".slideUnfold3,.slideUnfold4").hide();
            $(".slideUnfold,.slideUnfold2").show();
          }
          elem.css({
            "left": left,
            "top": top
          });
          var height = elem.height();
          /*if (height >= 270) {
           elem.css({"overflow-y": "scroll"});
           }*/

          if (part == "Left") {
            if (elem.attr("var") != $scope.seachGoods[$index].num_iid) {
              elem.show();
            } else {
              elem.toggle("fast");
            }
            $scope.leftlistsku = listsku;
            $scope.leftlistsku.num_iid = $scope.seachGoods[$index].num_iid;
            elem.attr("var", $scope.leftlistsku.num_iid)
          } else {
            $scope.rightlistsku = listsku;
            $scope.rightlistsku.num_iid = $scope.findGoods[$index].num_iid;
            elem.attr("var", $scope.rightlistsku.num_iid);
            if (elem.attr("var") != $scope.findGoods[$index].num_iid) {
              elem.show();
            } else {
              elem.toggle("fast");
            }
          }
          if (elem.css("display") != "none") {
            $("#prevSelection .items").eq($index).find("input").attr("disabled", "disabled");
            $("#prevSelection .items").eq($index).find("input").attr("checked", false)
          }
        })
      }
      //点击左侧单条SKU
      $scope.changeThis = function(index) {
        var typeElement = angular.element(".skuItemsLeft li");
        var elem = typeElement.eq(index);
        elem.toggleClass("cur");
      }
      /*start 产品列表操作 */
      $scope.selectGoods = {
        //选中产品
        "addGoods": function() {
          if ($scope.maxGoods != undefined) {
            if ($scope.checkedGoodsLen > $scope.maxGoods) {
              $(this).Alert({
                "title": "提示",
                "str": "选择商品数不得超过" + $scope.maxGoods + "个",
                "mark": true,
                "width": "200px"
              });
              return false;
            }
          }
          //添加产品
          $("#prevSelection .pic input").each(function(index, ele) {
            if (ele.checked) {
              var $items = $(this).parents(".items");
              var id = $items.find(".goodsId span").text().trim();
              var storeObj = {};
              angular.forEach($scope.findIds,
                  function(val, key) {
                    storeObj[val] = 1;
                  });
              if (! (id in storeObj)) {
                var selectedGood = angular.copy($scope.seachGoods[index]);
                if (($scope.productSkuVO.skuName != "" && $scope.productSkuVO.skuName != null) || ($scope.productSkuVO.outerId != "" && $scope.productSkuVO.outerId != null)) {
                  selectedGood.bySKU = true;
                } else {
                  selectedGood.skus = [];
                  selectedGood.bySKU = false;
                }
                selectedGood.byType = "numid";
                $scope.findGoods.push(selectedGood);
                $scope.findIds.push(id);
                $scope.checkedGoodsLen = $scope.findGoods.length;
              } else {
                var rightindex;
                var goods = {};
                $scope.findGoods.forEach(function(v, key) {
                  if (v.num_iid == id) {
                    rightindex = key;
                  }
                });
                if (rightindex != undefined) {
                  if (($scope.productSkuVO.skuName != "" && $scope.productSkuVO.skuName != null) || ($scope.productSkuVO.outerId != "" && $scope.productSkuVO.outerId != null)) {
                    $scope.findGoods[rightindex] = angular.copy($scope.seachGoods[index]);
                    $scope.findGoods[rightindex].bySKU = true;
                  } else {
                    $scope.findGoods[rightindex].skus = [];
                    $scope.findGoods[rightindex].bySKU = false;
                  }
                  $scope.findGoods[rightindex].byType = "numid";
                }
              }
            }
          });
          //添加SKU
          if ($scope.leftlistsku != null) {
            var id = $scope.leftlistsku.num_iid;
            if ($scope.findIds.join(",").indexOf(id) < 0) {
              var goods = {};
              $scope.seachGoods.forEach(function(v, key) {
                if (v.num_iid == id) {
                  goods.num_iid = v.num_iid;
                  goods.title = v.title;
                  goods.pic_url = v.pic_url;
                  goods.price = v.price;
                  goods.outerId = v.outerId;
                  goods.skus = [];
                }
              });
              $(".skuItems li").each(function(index, ele) {
                if ($(ele).hasClass("cur")) {
                  goods.skus.push($scope.leftlistsku[index]);
                }
              });
              if (goods.skus.length > 0) {
                goods.byType = "skuid";
                $scope.findGoods.push(goods);
                $scope.findIds.push(id);
                $scope.checkedGoodsLen = $scope.findGoods.length;
              }
            } else {
              var currentIndex;
              $scope.findGoods.forEach(function(v, key) {
                if (v.num_iid == id) {
                  currentIndex = key;
                }
              });
              if ($scope.findGoods[currentIndex].byType == "numid") {
                $(".skuItemsLeft li").each(function(index, ele) {
                  if ($(ele).hasClass("cur")) {
                    $scope.findGoods[currentIndex].skus = [];
                    $scope.findGoods[currentIndex].skus.push($scope.leftlistsku[index]);
                    $scope.findGoods[currentIndex].byType = "skuid";
                  }
                });
              } else {
                $(".skuItemsLeft li").each(function(index, ele) {
                  var isExist = false;
                  if ($(ele).hasClass("cur")) {
                    $scope.findGoods[currentIndex].skus.forEach(function(v, key) {
                      if (v.skuId == $(ele).attr("var")) {
                        isExist = true;
                      }
                    });
                    if (!isExist) {
                      $scope.findGoods[currentIndex].skus.push($scope.leftlistsku[index]);
                    }
                    $scope.findGoods[currentIndex].byType = "skuid";
                  }
                });
              }

              $scope.checkedGoodsLen = $scope.findGoods.length;
            }
            $scope.nextCheckedAll = false;
            $scope.prevChecked = false;
            $scope.prevCheckedAll = false;
            $(".skuItemsLeft li").removeClass("cur");
          }
        },
        //单个删除选中产品
        "delGoods": function(index) {
          $scope.nextCheckedAll = false;
          $scope.prevCheckedAll = false;
          this.delObjProperty(index);
        },
        //批量删除选中商品
        "clearGoods": function() {
          $scope.nextCheckedAll = false;
          $scope.prevCheckedAll = false;
          var x = 0;
          $("#nextSelection .pic input:checked").each(function() {
            var index = $("#nextSelection .pic input").index($(this));
            index = index - x;
            $scope.selectGoods.delObjProperty(index);
            x++;
          });
        },
        "delObjProperty": function(index) {
          angular.element(".skuItemsRight").hide();
          $scope.findGoods.splice(index, 1);
          $scope.findIds.splice(index, 1);
          $scope.rightlistsku = {};
          $scope.checkedGoodsLen = $scope.findGoods.length;
        },
        //保存选中商品
        "saveSelectGoods": function() {
          var searchParam = {};
          searchParam.serviceType = $scope.serviceType;
          searchParam.selectorSearchVO = $scope.selectorSearchVO;
          searchParam.numIids = [];
          //searchParam.snapshootId = $scope.snapshootId;
          searchParam.snapshootId = 0;
          $scope.findGoods.forEach(function(value, index) {
            var numIid = {};
            numIid.numIid = value.num_iid;
            numIid.title = value.title;
            numIid.skuIds = [];
            value.skus.forEach(function(sku) {
              var skuItem = {};
              skuItem.skuId = sku.skuId;
              numIid.skuIds.push(skuItem);
            });
            searchParam.numIids.push(numIid);
          });
          ngSelectorService.postSelector(function(response) {
            if (response.snapshootId != undefined) {
              ngSelectorService.getProductCount(function(data) {
                    var backData = {};
                    backData.snapshootId = response.snapshootId;
                    backData.count = data.count;
                    $scope.$emit("Ctr1NameChange", backData);
                  },
                  response.snapshootId);

              if ($scope.serviceType != "campaign_ump") {
                $scope.getProductSelectedData(searchParam, response.snapshootId); // 调用域下面，什么方法，获取选择的products的ids
              }
            }
          }, searchParam);
        },
        //取消选中商品
        "cancelSelectGoods": function() {},
        //删除单个SKU
        "removeThis": function(index) {
          var removeIndex;
          //从findgood中删除sku
          $scope.findGoods.forEach(function(v, key) {
            if (v.num_iid == $scope.rightlistsku.num_iid) {
              $scope.findGoods[key].skus.splice(index, 1);
              removeIndex = key;
            }
          });
          //右侧删除商品
          if ($scope.findGoods[removeIndex].skus.length == 0) {
            angular.element(".skuItemsRight").hide();
            $scope.findGoods.splice(removeIndex, 1);
            $scope.findIds.splice(removeIndex, 1);
            $scope.rightlistsku.num_iid = "";
          }
          $scope.checkedGoodsLen = $scope.findGoods.length;
        }
      }
      /*end 产品列表操作 */
      /*start 页码*/
      $scope.pageEvent = {
        "currentPage": 1,
        "totalPage": 1,
        "rp": 20,
        "effectiveRange": function(val) {
          if (isNaN(val)) {
            $scope.currentPage = 1;
            return false;
          } else {
            if (val < 1 || val > $scope.pageEvent.totalPage) {
              $scope.currentPage = 1;
              return false;
            } else {
              return true;
            }
          }
        },
        "firstPage": function() {
          if (this.currentPage == 1) {
            return false
          };
          if (this.effectiveRange(this.currentPage)) {
            this.currentPage = 1;
            $scope.searchProductList(this.currentPage, parseInt(this.rp));
          }
        },
        "lastPage": function() {
          if (this.currentPage == this.totalPage) {
            return false
          };
          if (this.effectiveRange(this.currentPage)) {
            this.currentPage = this.totalPage;
            $scope.searchProductList(this.currentPage, parseInt(this.rp));
          }
        },
        "prevPage": function() {
          if (this.effectiveRange(this.currentPage) && this.currentPage != 1) {
            this.currentPage--;
            $scope.searchProductList(this.currentPage, parseInt(this.rp));
          }
        },
        "nextPage": function() {
          if (this.effectiveRange(this.currentPage) && this.currentPage != this.totalPage) {
            this.currentPage++;
            $scope.searchProductList(this.currentPage, parseInt(this.rp));
          }
        },
        "changeRp": function() {
          this.currentPage = 1;
          $scope.searchProductList(this.currentPage, parseInt(this.rp));
        },
        "searchPage": function(currentPage) {
          this.currentPage = 1;
          $scope.searchProductList(parseInt(currentPage), parseInt(this.rp));
        }
      }
      $('#dataInput').bind('keypress', function(event) {
        if (event.keyCode == "13") {
          $scope.searchProductList(parseInt($scope.pageEvent.currentPage), parseInt($scope.pageEvent.rp));
        }
      });
      /*end 页码*/
      /*start 关键字选择器*/
      $scope.goodsKeyWordPop = {
        "keyWorldLists": [],
        "keyWorldError": false,
        "keyWorldErrorText": "",
        "initKeyWorldLists": [],
        "sysgoodsEditorKeyWorldGX": "true",
        "goodsEditorKeyWorldGX": "true",
        "showGoodKeyWorldPop": function() {
          if (this.initKeyWorldLists.length > 0) {
            this.keyWorldLists = this.initKeyWorldLists.slice();
          }
          this.sysgoodsEditorKeyWorldGX = this.goodsEditorKeyWorldGX;
          this.keyWorldError = false;
          this.goodsKeyWorld = "";
          if (this.keyWorldLists.length > 0) {
            $scope.productKeyWorld = "您添加了" + this.keyWorldLists.length + "个关键字";
          }
          angular.element(".goodsEditor .borderHighlight").removeClass("isError");
          $scope.hideOtherPops();
          $(".goodsListKeyWorld").addInteractivePop({
            magTitle: "关键字筛选条件设置",
            mark: false,
            width: 350,
            drag: true,
            position: "fixed",
            "eleZindex": 1010
          });
          var curPopKeyWordElement = "";
          if ($(".commSelectPlug").length == 0) {
            curPopKeyWordElement = $(".productSelected");
          } else {
            curPopKeyWordElement = $(".commSelectPlug");
          }
          var defaultWrapLeft = parseFloat(curPopKeyWordElement.css("left")) + 500,
              defaultWrapTop = parseFloat(curPopKeyWordElement.css("top")) + 90;
          $(".goodsListKeyWorld ").css({
            "top": defaultWrapTop,
            "left": defaultWrapLeft
          });
        },
        //添加关键字
        "addGoodsKeyWorld": function() {
          var _this = this;
          var hasKeyWorldFlag = false;
          angular.forEach(_this.keyWorldLists, function(val) {
            if (_this.goodsKeyWorld == val) {
              hasKeyWorldFlag = true;
            }
          });
          if (hasKeyWorldFlag) {
            this.keyWorldErrorText = "关键字不可以重复";
          } else if (this.goodsKeyWorld == "") {
            this.keyWorldErrorText = "请填写关键字";
          } else if (this.goodsKeyWorld.length > 30) {
            this.keyWorldErrorText = "每个关键字最大30个字符";
          }
          if (this.goodsKeyWorld == "" || hasKeyWorldFlag || (this.goodsKeyWorld.length > 30)) {
            this.keyWorldError = true;
            angular.element(".goodsListKeyWorld .borderHighlight").addClass("isError");
          } else {
            angular.element(".goodsListKeyWorld .borderHighlight").removeClass("isError");
            this.keyWorldLists.push(this.goodsKeyWorld);
            this.keyWorldError = false;
          }
          var height = $(".goodsListKeyWorld ul").height();
          if (height >= 200) {
            $(".goodsListKeyWorld ul").css("overflow-y", "scroll")
          }
          this.goodsKeyWorld = "";
        },
        //删除关键字
        "goodsKeyWorldDel": function(i) {
          this.keyWorldLists.splice(i, 1);
        },
        "goodsKeyWorldCancel": function() {
          $scope.goodsMarkFlag = false;
          this.goodsEditorKeyWorldGX = this.sysgoodsEditorKeyWorldGX;
          $(".goodsListKeyWorld").hide();
        },
        //确认关键字
        "goodsKeyWorldSure": function() {
          this.initKeyWorldLists = this.keyWorldLists.slice();
          if (this.keyWorldLists.length > 0) {
            $scope.productKeyWorld = "您添加了" + this.keyWorldLists.length + "个关键字";
          } else {
            $scope.productKeyWorld = "";
          }
          $(".goodsListKeyWorld").hide();
        }
      }
      /*end 关键字选择器*/
      /*start 标准类目*/
      $scope.StandardCategory = {
        "defaultCheckedId": {},
        "StandardCategoryValueId": "",
        "StandardCategoryValue": "",
        "checkedZtree": function() {},
        "settingStandardCategoryCheckZtree": function(response) { //配置check ztree插件
          var _this = this;
          var setting = {
            check: {
              enable: true,
              chkStyle: "radio",
              radioType: "all"
            },
            data: {
              key: {
                title: "name",
                name: "name"
              },
              simpleData: {
                enable: true,
                idKey: "cid",
                pIdKey: "parentCid",
                rootPId: 0,
                isLeaf: "isLeaf"
              }
            },
            view: {
              addDiyDom: _this.addDiyDom,
              dblClickExpand: false,
              showIcon: false
            },
            callback: {
              onClick: _this.onClick,
              onCheck: _this.onCheck
            },
            edit: {
              enable: false
            }
          }
          _this.checkedZtree = $.fn.zTree.init($("#StandardCategory"), setting, response);

          _this.setDefaultTreeNode(_this.checkedZtree, _this.defaultCheckedId);
        },
        "onCheck": function(e, treeId, treeNode) {
          _this = this;
          var zTree = $.fn.zTree.getZTreeObj("StandardCategory");
          var nodes = zTree.getCheckedNodes(true);
          var v = "";
          for (var i = 0,
                   l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
          }
          if (v.length > 0) {
            v = v.substring(0, v.length - 1);
            $("#StandardCategoryValue").attr("value", v);
          } else {
            $("#StandardCategoryValue").attr("value", "不限类目");
          }
        },
        "onClick": function(e, treeId, treeNode) {
          var zTree = $.fn.zTree.getZTreeObj("StandardCategory");
          zTree.checkNode(treeNode, !treeNode.checked, null, true);
          $("#StandardCategory  li a").removeClass("curSelectedNode");
          if (treeNode.checked) {
            $('#' + treeNode.tId + " a").addClass("curSelectedNode");
          } else {
            $('#' + treeNode.tId + " a").removeClass("curSelectedNode");
          }
          return false;
        },
        "addDiyDom": function(treeId, treeNode) {
          var spaceWidth = 15;
          var switchObj = $("#" + treeNode.tId + "_switch"),
              icoObj = $("#" + treeNode.tId + "_ico"),
              checkObj = $("#" + treeNode.tId + "_check");
          switchObj.remove();
          icoObj.before(switchObj);
          switchObj.after(checkObj);
          var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
          if (treeNode.cid == "") {
            spaceStr = "<span style='margin-left:-15px;display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
          }
          switchObj.before(spaceStr);
          if (treeNode.level == 0 && !treeNode.isLastNode) {
            $('#' + treeNode.tId + '_a').after("<div class='root_level0_line'></div>");
          }
          checkObj.remove();
          if (treeNode.isLeaf == "false") {
            checkObj.remove();
            treeNode.nocheck = true;
          }

        },
        "setDefaultTreeNode": function(treeEle, defaultObj) { //设置默认的tree node
          if (defaultObj.id != undefined && defaultObj.id != null) {
            var node = treeEle.getNodesByParam("cid", defaultObj.id)[0];
            treeEle.expandNode(node.getParentNode(), true);
            $("#" + node.tId + "_a").addClass("curSelectedNode");
          }
        },
        "getStandardCategoryValue": function() {
          _this = this;
          if($scope.shop == null) {
            return false;
          }
          ngSelectorService.getStandardCategoryByShopId(function(responseA) {
            var noSelect = {
              "cid": "",
              "isLeaf": "true",
              "name": "不限类目",
              "parentCid": "0"
            }
            //responseA.push(noSelect);
            responseA.unshift(noSelect);
            $scope.StandardCategory.settingStandardCategoryCheckZtree(responseA);

            $scope.hideOtherPops();
            $(".StandardCategory").show();
          }, $scope.shop.idInPlat);
        },
        "sureStandardCategoryValue": function() { //自定义数据权限确定
          var _this = this;
          _this.removePop();
          var checkedZtreeData = _this.checkedZtree.getCheckedNodes(true);
          if (checkedZtreeData.length > 0) {
            angular.forEach(checkedZtreeData, function(val, key) {
              _this.StandardCategoryValueId = val.cid;
              _this.StandardCategoryValue = val.name;
              _this.defaultCheckedId = {
                "id": val.cid
              };
            })
          } else {
            _this.StandardCategoryValueId = "";
            _this.StandardCategoryValue = "不限类目";
            _this.defaultCheckedId = {
              "id": ""
            };
          }
          $scope.change_property_by_cid();

        },
        "removePop": function() {
          angular.element(".StandardCategory").hide();
        }
      }
      /*end 标准类目*/
      /*start 自定义商品类目*/
      $scope.Classification = {
        "defaultCheckedId": [],
        "ClassificationValue": [],
        "ClassificationValueIds": [],
        "checkedZtreeview": [],
        "checkedZtree": function() {},
        //配置check ztree插件
        "settingClassificationCheckZtree": function(response) {
          var _this = this;
          var setting = {
            treeId: "goodsSelector",
            check: {
              enable: true,
              chkStyle: "checkbox",
              chkboxType: {
                "Y": "ps",
                "N": "ps"
              },
              nocheckInherit: true
            },
            data: {
              key: {
                title: "name",
                name: "name"
              },
              simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid",
                rootPId: null

              }
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
                switchObj.before(spaceStr);
                if (treeNode.level == 0 && !treeNode.isLastNode) {
                  $('#' + treeNode.tId + '_a').after("<div class='root_level0_line'></div>");
                }
              },
              dblClickExpand: false,
              showIcon: false
            },
            callback: {
              onCheck: function onCheck(event, treeId, treeNode) {}
            },
            edit: {
              enable: false
            }
          }
          _this.checkedZtree = $.fn.zTree.init($("#ClassificationValue"), setting, response);
          _this.setDefaultTreeNode(_this.checkedZtree, _this.defaultCheckedId)
        },
        "setDefaultTreeNode": function(treeEle, defalutObj) { //设置默认的tree node
          treeEle.checkAllNodes(false);
          for (var i = 0; i < defalutObj.length; i++) {
            var node = treeEle.getNodesByParam("id", defalutObj[i].id)[0];
            if (node) {
              treeEle.checkNode(node, true, false);
              treeEle.expandNode(node.getParentNode(), true);
            }
          }
        },
        "getClassificationValue": function() {
          if($scope.shop == null) {
            return false;
          }
          ngSelectorService.getCustomcategory(function(response) {
            $scope.Classification.settingClassificationCheckZtree(response);
            $scope.hideOtherPops();
            $(".ClassificationValue").show();
          }, $scope.shop.idInPlat);

        },
        "sureClassificationValue": function() { //自定义数据权限确定
          var _this = this;
          _this.ClassificationValueIds = [];
          _this.checkedZtreeview = [];
          _this.defaultCheckedId = [];
          var checkedZtreeData = _this.checkedZtree.getCheckedNodes(true); //获取已选择数据 directive(ztree)定义的
          if (checkedZtreeData) {
            angular.forEach(checkedZtreeData, function(val, key) {
              if (!val.isParent) {
                _this.ClassificationValueIds.push(val.id);
                _this.checkedZtreeview.push(val.name);
                _this.defaultCheckedId.push({
                  "id": val.id
                });
              }
            })
          }
          _this.ClassificationValue = _this.checkedZtreeview.join(",");
          _this.removePop();
        },
        "removePop": function() {
          angular.element(".ClassificationValue").hide();
        }
      }
      /*end 自定义商品类目*/
      $scope.hideOtherPops = function() {
        $(".goodsListKeyWorld").hide();
        angular.element(".StandardCategory").hide();
        angular.element(".ClassificationValue").hide();
        $(".goodsListLabel").hide();
      }
      /*start 标签选择器*/
      $scope.productLists = [];

      $scope.goodTags = {
        "hasPower": false,
        "showTagsPop": function() {
          if (this.hasPower) {
            return "没有权限,不能进行此操作"
          };
          var height = $(".goodsListLabel ul").height();
          if (height >= 200) {
            $(".goodsListLabel ul").css("overflow-y", "scroll")
          }
          $scope.hideOtherPops();
          $(".goodsListLabel").addInteractivePop({
            magTitle: "标签筛选条件设置",
            mark: false,
            width: 520,
            drag: true,
            position: "fixed",
            "eleZindex": 1010
          });
          $(".goodsListLabel li").each(function(i) {
            $(this).removeClass("cur");
            $scope.tagsIds.forEach(function(value, index) {
              if (value == $scope.tagLists[i].tagId) {
                $(".goodsListLabel li").eq(i).addClass("cur");
              }
            });
            $(this).unbind("click").bind("click", function() {
              $(this).toggleClass("cur");
            });
          });
        },
        //隐藏标签
        "goodsTagsCancel": function() {
          $(".goodsListLabel").hide();
        },
        //确认标签
        "goodsTagsSure": function() {
          $(".goodsListLabel li").each(function(index) {
            if ($(this).hasClass("cur")) {
              if ($scope.tagsIds.join(",").indexOf($scope.tagLists[index].tagId) < 0) {
                $scope.tagsIds.push($scope.tagLists[index].tagId);
              }
            } else {
              var removeIndex;
              for (var i = 0; i < $scope.tagsIds.length; i++) {
                if ($scope.tagsIds[i] == $(this).attr("var")) {
                  removeIndex = i;
                }
              }
              if (removeIndex >= 0) {
                $scope.tagsIds.splice(removeIndex, 1);
              }
            }
          });

          if ($scope.tagsIds.length > 0) {
            $scope.productTags = "您选择了" + $scope.tagsIds.length + "个标签";
          } else {
            $scope.productTags = "";
          }
          $(".goodsListLabel").hide();
        }
      }
      /*end 标签选择器*/
      $scope.change_right = function(event) {
        var v = $(event.target).attr("checked");
        if (v == undefined) {
          $("#nextAllchecked").attr("checked", false);
        }

      }
      $scope.change_left = function(event) {
        var v = $(event.target).attr("checked");
        if (v == undefined) {
          $("#prevAllchecked").attr("checked", false);
        }
      }

      $scope.findIds = [];
      $scope.findGoods = [];
      $scope.findByType = [];
      //初始化条件
      /*
       * 使商品选择器的店铺与外部功能的店铺属于同一平台
       *  $rootScope.subjectMarkToGoodsPlug:查询节点的店铺
       */
      var getShopsDefaultFlag = "默认";
      if ($rootScope.subjectMarkToGoodsPlug && $rootScope.subjectMarkToGoodsPlug.querySubjectShops) {
        getShopsDefaultFlag = "查询节点"; //或者订单分析节点
      } else if ($scope.$parent.ShopsForCounpon) {
        getShopsDefaultFlag = "优惠管理"; //包括商品级优惠、订单级优惠、包邮卡优惠
      };
      /* end */
      ngSelectorService.getCondition(function(response) {
        $scope.goodsKeyWordPop.goodsEditorKeyWorldGX = response.isKeywordAnd.toString();
        $scope.goodsKeyWordPop.initKeyWorldLists = response.keywords;
        if (response.keywords.length > 0) {
          $scope.productKeyWorld = "您添加了" + response.keywords.length + "个关键字";
        }
        $scope.tagsIds = response.tagsIds;
        if (response.tagsIds.length > 0) {
          $scope.productTags = "您选择了" + response.tagsIds.length + "个标签";
        }
        $scope.saleStatus = response.isOnsale;
        $scope.numiid = response.numiid;
        $scope.maxPrice = response.maxPrice;
        $scope.minPrice = response.minPrice;
        $scope.productOuterVO = response.productOuterVO;
        if (response.productOuterVO.outerCutFlag == "false") {
          $scope.productOuterVO.startCutBit = "";
          $scope.productOuterVO.endCutBit = "";
        }
        $scope.productOuterVO = response.productOuterVO;
        $scope.productSkuVO = response.productSkuVO;
        $scope.isSelectorSearch = response.isSelectorSearch;
        $scope.conditionFlag = $scope.isSelectorSearch == 1 ? true: false;
        var notExist = ($scope.Shops == undefined);
        if (getShopsDefaultFlag == "查询节点") {
          var data = [];
          angular.forEach($rootScope.subjectMarkToGoodsPlug.querySubjectShops,
              function(val, key) {
                data.push({
                  "id": val.id,
                  "name": val.name,
                  "idInPlat": val.idInPlat
                });
              });
          if (response.shopId) {
            commInitConditions();
          } else {
            $scope.shop = data[0];
            $scope.Shops = data;
            $scope.change_Standard();
            if ($scope.conditionFlag) {
              tagsDefer.promise.then(function() {
                $scope.save();
              })
            }
          }
        } else if (getShopsDefaultFlag == "优惠管理") {
          var data = [];
          data.push($scope.$parent.shopForCounpon);
          if (response.shopId) {
            commInitConditions();
          } else {
            $scope.shop = data[0];
            $scope.Shops = data;
            $scope.change_Standard();
            if ($scope.conditionFlag) {
              tagsDefer.promise.then(function() {
                $scope.save();
              })
            }
          }
        } else {
          if (response.shopId) {
            ngSelectorService.getShops(function(data) {
              commInitConditions();
            });
          } else {
            $scope.shop = data[0];
            ngSelectorService.getShops(function(data) {
              $scope.Shops = data;
            });
            if ($scope.conditionFlag) {
              $scope.save();
            }
          }
        };
        function commInitConditions() {
          if (notExist) {
            $scope.Shops = data;
          } else {
            if ($scope.Shops.length == 1) {
              response.shopId = $scope.Shops[0].idInPlat;
            }
          }
          $scope.Shops.forEach(function(Value, key) {
            if (Value.idInPlat == response.shopId) {
              $scope.shop = Value;
              //自定义类目
              $("#Classification").removeAttr("disabled");
              var leafCid = response.productCustomCategoryVO.leafCid;
              leafCid.forEach(function(leaf, leafIndex) {
                $scope.Classification.defaultCheckedId.push({
                  "id": leaf
                });
                $scope.Classification.ClassificationValueIds.push(leaf);
              });
              ngSelectorService.getCustomcategory(function(Customcategory) {
                Customcategory.forEach(function(value, key) {
                  for (var i = 0; i < $scope.Classification.defaultCheckedId.length; i++) {
                    if ($scope.Classification.defaultCheckedId[i].id == value.id) {
                      $scope.Classification.ClassificationValue += value.name + ",";
                      //$scope.Classification.ClassificationValueIds.push($scope.Classification.defaultCheckedId[i].id);
                    }
                  }
                })
              }, $scope.shop.idInPlat);

              ngSelectorService.getStandardCategoryByShopId(function(responseA) {
                if (response.productStandardCategoryClustersVO != null) {
                  $("#StandardCategoryValue").removeAttr("disabled");
                  $scope.StandardCategory.StandardCategoryValueId = response.productStandardCategoryClustersVO.productStandardCategoryId == null ? "": response.productStandardCategoryClustersVO.productStandardCategoryId;
                  $scope.StandardCategory.StandardCategoryValue = response.productStandardCategoryClustersVO.productStandardCategoryName == null ? "不限类目": response.productStandardCategoryClustersVO.productStandardCategoryName;
                  $scope.StandardCategory.defaultCheckedId = {
                    "id": $scope.StandardCategory.StandardCategoryValueId
                  };
                  var noSelect = {
                    "cid": "",
                    "featureList": "",
                    "isLeaf": "true",
                    "name": "不限类目",
                    "parentCid": "0",
                    "sortOrder": "14"
                  }
                  responseA.unshift(noSelect);
                  $scope.StandardCategory.settingStandardCategoryCheckZtree(responseA);
                  if ($scope.StandardCategory.StandardCategoryValueId != "") {
                    //根据标准类目CID查询商品属性信息列表
                    ngSelectorService.getPropertysByCid(function(responseB) {
                      $scope.PropertysList = responseB;
                      $("#selProperty").removeAttr("disabled");
                      var productStandardCategoryPropertyId = response.productStandardCategoryClustersVO.productStandardCategoryPropertyId;
                      if (productStandardCategoryPropertyId != "") {
                        $scope.PropertysList.forEach(function(Value, key) {
                          if (Value.pid == productStandardCategoryPropertyId) {
                            $scope.selProperty = Value;
                          }
                        })
                      }
                      if ($scope.selProperty != null) {
                        //根据标准类目CID和PID查询商品属性值列表
                        ngSelectorService.getPropertysByCidAndPid(function(responseC) {
                          $scope.PropertyValueList = responseC;
                          var productStandardCategoryPropertyValueId = response.productStandardCategoryClustersVO.productStandardCategoryPropertyValueId;
                          if (productStandardCategoryPropertyValueId != "") {
                            $scope.PropertyValueList.forEach(function(Value, key) {
                              if (Value.vid == productStandardCategoryPropertyValueId) {
                                $scope.selPropertyValue = Value;
                              }
                            });
                            if ($scope.conditionFlag) {
                              $scope.save();
                            }
                          } else {
                            $scope.selPropertyValue = null;
                          }
                          $("#selPropertyValue").removeAttr("disabled");
                        }, $scope.StandardCategory.StandardCategoryValueId, $scope.selProperty.pid);
                      }
                    }, $scope.StandardCategory.StandardCategoryValueId);
                  } else {
                    $scope.selProperty = null;
                    if ($scope.conditionFlag) {
                      $scope.save();
                    }
                  }
                } else {
                  $scope.StandardCategory.StandardCategoryValue = "不限类目";
                  $scope.StandardCategory.StandardCategoryValueId = "";
                  $scope.StandardCategory.defaultCheckedId = "";
                  if ($scope.conditionFlag) {
                    $scope.save();
                  }
                }
              }, $scope.shop.idInPlat);
            }
          })
        }
        $scope.searchProductList(0, 20, true);
      }, $scope.snapshootId);

      ngSelectorService.getproductsBysnapshootId(function(response) {
        var selectedGood = response.data;
        if (selectedGood.length > 0) {
          selectedGood.forEach(function(item) {
            $scope.findIds.push(item.num_iid);
            if (item.skus.length > 0) {
              item.byType = "skuid";
            } else {
              item.bySKU = false;
              item.byType = "numid";
            }
            $scope.findGoods.push(item);
          });
          $scope.checkedGoodsLen = $scope.findGoods.length;
        }
      }, $scope.snapshootId);
    }
  ])
})(window, angular, undefined, webApp);
