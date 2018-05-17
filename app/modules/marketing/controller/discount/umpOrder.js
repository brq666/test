angular.module("campaign.controllers").controller('ccmsUmpOrder', ['$scope', '$location', '$http', '$compile', 'getListService', '$q', '$rootScope',
  function($scope, $location, $http, $compile, getListService, $q, $rootScope) {
    $rootScope.subjectMarkToGoodsPlug = null; //清楚查询节点给商品选择器赋值的店铺
    /*新建修改公用一个弹出层
     *定义数据字段
     *如果为新增，需要初始化数据为空，或者初始化为默认值，如果为修改，需要将保存的值显示出来
     */
    $scope.status = "7";
    $scope.statusModel = "7";
    $scope.shopForCounpon = {};
    $scope.ngtip = false;
    $scope.nggoodstip = false;
    $scope.productSelect = "";
    $scope.tpl = {
      "name": "",
      //优惠名称
      "shopId": "",
      //所属店铺
      "userScopeType": undefined,
      //优惠范围
      "userLevel": 1,
      //会员等级，选择指定会员优惠时出现
      "startTime": "",
      //起始时间
      "endTime": "",
      //结束时间
      "startTime1": "",
      //起始时间
      "endTime1": "",
      //结束时间
      "operateWayConditionType": 2,
      //限购条件，1限购，0不限购
      "operateWayConditionDetail": "",
      //限购件数
      "operateWay": 0,
      //优惠方式 0 打折，1 减价
      "operateWayDetail": "",
      //优惠值
      "postagve": false,
      //是否包邮
      "postagveArea": "",
      //包邮城市 **
      "goodsScopeType": 0,
      "description": "",
      //描述
      "onSale": "",
      "discount": "",
      "isEdit": true,
      "isSelectEdit": true,
      "isAdd": true,
      "src": "",
      "jian": "",
      "yuan": "",
      "noRestrict": "",
      "changeCityTip": function() {
        if (!$scope.postagve) {
          $scope.cityLists = [];
          $scope.cityTip = "";
          $scope.tpl.postagveArea = "";
          $scope.$$childHead.cityTip = "";
          $scope.ngtip = false;
        }
      },
      //方法
      "init_msg": function(type) {
        $scope.msg = {};
        if ($scope.tpl.isAdd || type) {
          $scope.msgcount = "";
          $scope.snapshootId = 0;
        }
        $scope.productSelect = "";
        $scope.nggoodstip = false;
        $scope.support = "province";
      },
      "add": function() {
        $scope.tpl.init_msg();
        $scope.ngtip = false;
        $scope.status = 0;
        this.userScopeType = undefined;
        this.isEdit = true;
        this.isAdd = true;
        this.isEditor = false;
        this.name = "";
        this.shopId = "";
        this.userLevel = 1;
        this.startTime = "";
        this.endTime = "";
        this.startTime1 = "";
        this.endTime1 = "";
        this.goodsScopeType = 0;
        this.operateWayConditionType = 2;
        this.operateWayConditionDetail = "";
        this.operateWay = 0;
        this.operateWayDetail = "";
        this.postagve = false;
        this.postagveArea = "";
        this.description = "";
        this.onSale = "";
        this.discount = "";
        this.src = CAMPAIGN_STATIC.tplBasePath + "view/discount/addUmpOrder.html?_=" + ( + new Date);
        this.title = "新建订单优惠";
        this.isSelectEdit = true;
        this.jian = "";
        this.yuan = "";
        this.status = 0;
        this.noRestrict = "";
        $scope.shopForCounpon = $scope.ShopsForCounpon[0];
        $scope.cityLists = [];
        $scope.cityTip = "";
        $scope.snapshootId = 0;
      },
      "modify": function(id, curShopName, status) {
        $scope.ngtip = false;
        $scope.tpl.init_msg();
        var _this = this;
        _this.isAdd = false;
        _this.isEditor = (status == '4' ? true : false);
        this.title = "修改订单优惠";
        this.src = CAMPAIGN_STATIC.tplBasePath + "view/discount/addUmpOrder.html?_=" + ( + new Date);
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "ump/ump/" + id,
          async: false,
          type: "get",
          cache: false,
          dataType: "json",
          contentType: 'application/json',
          success: function(res) {
            _this.name = res.name;
            _this.shopId = res.shopId;
            angular.forEach($scope.ShopsForCounpon, function(val, key) {
              if (val.id == _this.shopId) {
                $scope.shopForCounpon = val;
              }
            });
            _this.jian = "";
            _this.discount = "";
            _this.onSale = "";
            _this.yuan = "";
            _this.umpId = id;
            _this.userScopeType = res.userScopeType;
            _this.userLevel = res.userScopeDetail;
            //_this.startTime=res.startTime;
            //_this.endTime=res.endTime;
            _this.operateWayConditionType = res.operateWayConditionType;
            _this.operateWayConditionDetail = "";
            _this.operateWayConditionDetail = res.operateWayConditionDetail;
            _this.postagve = res.postagve == 1 ? true: false;
            _this.postagveArea = res.postagveArea; //包邮城市 **
            if (res.postagve == 1 && _this.postagveArea != null && _this.postagveArea != "" && _this.postagveArea != undefined) {
              var postagveArea = _this.postagveArea.split('*');
              $scope.cityTip = postagveArea.length > 0 ? "选择了" + postagveArea.length + "个省": "";
              getListService.getCityRelationship(function(citys) {
                $scope.cityLists = citys;
              }, postagveArea.join(','));
            } else {
              $scope.cityTip = "";
              $scope.cityLists = [];
            }
            if (res.operateWayConditionType == 2) {
              _this.jian = res.operateWayConditionDetail;
            } else if (res.operateWayConditionType == 3) {
              _this.yuan = res.operateWayConditionDetail;
            }
            _this.operateWay = res.operateWay;
            _this.operateWayDetail = res.operateWayDetail;
            if (_this.operateWay == 0) {
              _this.discount = _this.operateWayDetail;
            } else {
              _this.onSale = _this.operateWayDetail;
            }
            _this.description = res.description;
            if (res.operateWay == "2") {
              _this.operateWay = 1;
              //$("#noRestrictId").attr("checked", "checked");
              _this.noRestrict = true;
            } else {
              _this.noRestrict = false
            }
            _this.status = res.status;
            $scope.status = res.status;
            if (res.status == 1 || res.status == 2 || res.status == 3) {
              _this.isEdit = false;
            }
            _this.isSelectEdit = false;
            if (res.status == 0) {
              _this.startTime = setISO(res.startTime, "all");
              _this.endTime = setISO(res.endTime, "all");
            } else {
              _this.startTime1 = setISO(res.startTime, "all");
              _this.endTime1 = setISO(res.endTime, "all");
            }
            _this.goodsScopeType = res.goodsScopeType;
            $scope.snapshootId = res.snapshootId;
            if ($scope.snapshootId != "" && $scope.snapshootId != null && $scope.snapshootId != undefined) {
              $.ajax({
                async: false,
                "type": "GET",
                dataType: "json",
                "contentType": "application/json;charset=utf-8",
                "url": GLOBAL_STATIC.componentRoot + "product/selector/snapshoot/" + $scope.snapshootId + "/product/count",
                success: function(response) {
                  if (response.count > 0) {
                    $scope.msgcount = "已选中" + response.count + "商品"
                  } else {
                    $scope.msgcount = "";
                  }
                },
                error: function(res) {
                  var res = $.parseJSON(res.responseText);
                  $(this).Alert({
                    "title": httpTitle || "提示",
                    "str": res.message,
                    "mark": true
                  });
                }
              });
            } else {
              $scope.snapshootId = 0;
              $scope.msgcount = "";
            }
            $scope.tpl.shopCounts($scope.shopForCounpon.id, $scope.tpl.userScopeType);
          },
          error: function(data) {
            var data = $.parseJSON(data.responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        })
      },
      "submit": function() {
        if(this.isEditor) {
          return '不可编辑'
        }
        $scope.validate();

      },
      "confirmChecked": function() {
        if (this.noRestrict == true) {
          $(this).Confirm({
            title: "提示",
            mark: true,
            str: "上不封顶的意思是可以重复减价，例如设置的活动是满100元减10元，勾选上不封顶后意味着满200元会减20元，满300元会减30元…以此类推。满件减也是如此。</br>你确认要这样操作？",
            position: "fixed",
            closeButton: false
          },
          "",
          function() {
            $scope.tpl.noRestrict = false;
            $scope.$apply();
          });

          //$scope.tpl.noRestrict=false
        } else {
          //$scope.tpl.noRestrict=true
        }
      },

      "save": function(moreTime) {
        if ($scope.$$childHead.cityTip == "" && $scope.tpl.postagve == 1) {
          angular.element(".cityError").show();
          return;
        } else {
          angular.element(".cityError").hide();
        }
        //快照id
        if ($scope.$$childHead.snapshootId == 0 && $scope.shopForCounpon.id > 0 && ($scope.tpl.goodsScopeType == "2" || $scope.tpl.goodsScopeType == "1")) {
          angular.element(".productError").html("请选择商品").show();
          return;
        } else if ($scope.$$childHead.snapshootId > 0 && $scope.msgcount.length == 0) {
          angular.element(".productError").html("请选择商品").show();
          return;
        } else if ($scope.tpl.goodsScopeType == "1" && $scope.$$childHead.snapshootId > 0 && $scope.msg.count < 2) {
          angular.element(".productError").html("至少选择两种参与优惠的商品").show();
          return;
        } else {
          angular.element(".productError").hide();
        };

        if (this.operateWayConditionType == 2 && this.jian < 2) {
          angular.element(".jianError").show();
          return;
        } else {
          angular.element(".jianError").hide();
        }
        /*验证
         *特殊数据的处理，然后保存数据
         *新建未提交状态订单级优惠做授权处理
         */
        //数据保存
        var ajaxType;
        var _this = this;
        if (_this.operateWay == 1) {
          _this.operateWayDetail = _this.onSale;
        } else {
          _this.operateWayDetail = _this.discount;
        }
        var parame = {};
        parame.name = _this.name;
        parame.shopId = $scope.shopForCounpon.id;
        parame.userScopeType = _this.userScopeType;
        parame.userScopeDetail = _this.userLevel;
        if (_this.userScopeType != 1) {
          parame.userScopeDetail = "";
        }
        if (_this.status == 0) {
          parame.startTimeString = _this.startTime;
          parame.endTimeString = _this.endTime;
        } else {
          parame.startTimeString = _this.startTime1;
          parame.endTimeString = _this.endTime1;
        }

        parame.operateWayConditionType = _this.operateWayConditionType;
        if (parame.operateWayConditionType == 2) {
          parame.operateWayConditionDetail = _this.jian;
        } else if (parame.operateWayConditionType == 3) {
          parame.operateWayConditionDetail = _this.yuan;
        }
        $scope.tpl.operateWayConditionDetail = parame.operateWayConditionDetail;
        parame.operateWayDetail = _this.operateWayDetail;
        parame.postagve = $scope.tpl.postagve ? 1 : 0;
        if (parame.postagve == 1) {
          if ($scope.$$childTail.cityIds != undefined) {
            if ($scope.$$childTail.cityIds.length > 0) {
              $scope.tpl.postagveArea = parame.postagveArea = ($scope.$$childTail.cityIds.length > 0) ? $scope.$$childTail.cityIds.join("*") : "";
            } else {
              parame.postagveArea = $scope.tpl.postagveArea;
            }
          } else {
            parame.postagveArea = $scope.tpl.postagveArea;
          }
        } else {
          parame.postagveArea = $scope.tpl.postagveArea = "";
        }
        parame.description = _this.description;
        parame.type = 1; //0 商品级  1订单级 2 包邮卡
        parame.goodsScopeType = $scope.tpl.goodsScopeType;
        parame.snapshootId = parseInt($scope.snapshootId);
        parame.tenantId = CAMPAIGN_STATIC.tenantId;
        if (_this.noRestrict == true) {
          parame.operateWay = 2;
        } else {
          parame.operateWay = _this.operateWay;
        }
        if (_this.isAdd) {
          ajaxType = "POST";
        } else {
          ajaxType = "PUT";
          parame.umpId = _this.umpId;
        }
        parames = JSON.stringify(parame);
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "ump/ump",
          async: false,
          type: ajaxType,
          cache: false,
          data: parames,
          dataType: "json",
          contentType: 'application/json',
          success: function(res) {
            $scope.status = res.isNewStatus;
            $scope.$apply();
            if (res.code == "success") {
              $(".submitEmpower").hide();
              $(this).yAlert({
                "text": "保存成功"
              });

              removeAlert();
              $('.ump_order_flexgrid').flexReload();

              _this.src = "";
            } else if (res.code == "error") {
              $(this).Alert({
                "title": "错误",
                "str": "提交失败，失败原因：" + res.msg,
                "mark": true
              });
            } else if (res.code == "noApply") {

              if (moreTime) {
                $scope.blockOrHiddenTxt = true;
                //$(this).Alert({"title": "提示", "str": "保存失败，授权未成功，请授权后重新提交", "mark": true});
                $scope.blockOrHidden = 0;
              } else {
                $scope.blockOrHiddenTxt = false;
              }
              _this.src = CAMPAIGN_STATIC.tplBasePath + "view/discount/addUmpOrder.html";
              $scope.applyHttp = res.applyHttp;
              $scope.applyUmpId = res.umpId;
              $(".text a:eq(0)").unbind("click").bind("click", function() {
                $scope.$apply(function() {
                  $scope.productSelect = "";  // 不添加这个, 会让商品选择器页面出现
                  $scope.empower.init($scope.applyUmpId)
                })
              });
              // $(".content a:eq(0)").attr("href", $scope.applyHttp);
              // $(".content a:eq(1)").unbind("click").bind("click", function () {
              //     $scope.$apply(function () {
              //         $scope.empower.init($scope.applyUmpId)
              //     })
              // });
              //立即授权按钮
              $(".submitEmpower .commBottom button:eq(0)").unbind("click").bind("click", function() {
                $scope.$apply(function() {
                  window.open($scope.applyHttp);
                  $scope.productSelect = "";  // 不添加这个, 会让商品选择器页面出现
                  $scope.blockOrHidden = 1;
                  //$scope.datacoupon.save('second');
                })
              })

              $(".submitEmpower .commBottom button:eq(1)").unbind("click").bind("click", function() {
                $scope.$apply(function() {
                  $scope.productSelect = "";  // 不添加这个, 会让商品选择器页面出现
                  $scope.tpl.save('second');
                })
              });
              if (!moreTime) {
                $(".submitEmpower").addInteractivePop({
                  magTitle: "提交",
                  mark: true,
                  drag: true,
                  position: "fixed"
                });

              } else {
                $(".submitEmpower").addInteractivePop({
                  magTitle: "提交",
                  mark: false,
                  drag: true,
                  position: "fixed"
                });
              }
            }
          },
          error: function(res) {
            var res = $.parseJSON(res.responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": res.message,
              "mark": true
            });
          }
        })
      },
      "del": function(id, item) {
        $(this).Confirm({
          "title": "确认删除",
          "str": "活动删除后将无法恢复，确定要删除活动？",
          "mark": true
        }, function() {
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "ump/ump/" + id,
            async: false,
            type: "DELETE",
            cache: false,
            //data:parames,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              if (res.code == "success") {
                $('.ump_order_flexgrid').flexReload();
                $(this).yAlert({
                  "text": "删除成功"
                });
                removeAlert();
              } else if (res.code == "error") {
                $(this).Alert({
                  "title": "错误",
                  "str": res.msg,
                  "mark": true
                });
              }
            },
            error: function(res) {
              var res = $.parseJSON(res.responseText);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": res.message,
                "mark": true
              });
            }
          })
        })
      },
      "smt": function(id, item) {
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "ump/channel/" + id,
          async: false,
          type: "PUT",
          cache: false,
          dataType: "json",
          contentType: 'application/json',
          success: function(res) {
            if (res.code == "success") {
              $('.ump_order_flexgrid').flexReload();
              $(".yunat_maskLayer").remove();
              $(".submitEmpower").hide();
            } else if (res.code == "error") {
              $(this).Alert({
                "title": "错误",
                "str": "提交失败，失败原因：" + res.msg,
                "mark": true
              });
            } else if (res.code == "noApply") {
              $scope.tpl.shouquan(item, res)
            }
          },
          error: function(res) {
            var res = $.parseJSON(res.responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": res.message,
              "mark": true
            });
          }
        })
      },
      "shouquan": function(item, res) {
        if (item) {
          $scope.blockOrHiddenTxt = true;
        } else {
          $scope.blockOrHiddenTxt = false;
        }
        $scope.status = res.isNewStatus;
        $scope.applyHttp = res.applyHttp;
        $scope.applyUmpId = res.umpId;
        $scope.blockOrHidden = 0;
        //item为传回来的参数，如果是'secondTime'是，弹出框不需要mark，否则会黑的像鬼一样！
        if (item) {
          $(".submitEmpower").addInteractivePop({
            magTitle: "提交",
            mark: false,
            drag: true,
            position: "fixed"
          });
        } else {
          $(".submitEmpower").addInteractivePop({
            magTitle: "提交",
            mark: true,
            drag: true,
            position: "fixed"
          });
        }
        $(".text a:eq(0)").unbind("click").bind("click", function() {
          $scope.$apply(function() {
            $scope.empower.init($scope.applyUmpId, 'listToApply')
          })
        });
        $(".submitEmpower .commBottom button:eq(0)").unbind("click").bind("click", function() {
          $scope.$apply(function() {
            $scope.blockOrHidden = 1;
            window.open($scope.applyHttp);

          })
        });
        $(".submitEmpower .commBottom button:eq(1)").unbind("click").bind("click", function() {
          $scope.$apply(function(opts) {
            $scope.tpl.smt($scope.applyUmpId, 'secondTime')
          })
        })

      },
      "closeTpl": function() {
        this.src = "";
      },
      "getRestrictionCount": function(shopId) {
        if (shopId == "") {
          return false;
        } else {
          var callback = function(data) {
            return data.total;
          }
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "ump/count/restriction/" + shopId,
            async: false,
            type: "GET",
            cache: false,
            dataType: "json",
            contentType: "application/json",
            success: function(res) {
              callback(res);
            },
            error: function(res) {
              var res = $.parseJSON(res.responseText);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": res.message,
                "mark": true
              });
            }
          });
        }
      },
      "shopCounts": function(shopId, userScopeType) {
        $http.get(GLOBAL_STATIC.campaignRoot + "ump/count/shopId/" + shopId + "/userScopeType/" + userScopeType + "/" + CAMPAIGN_STATIC.tenantId).success(function(response) {
          $scope.totalCount = response.total;
          $scope.applyCount = response.applyCount;
        })
      },
      "getShops": function() {
        this.common($scope.ShopsForCounpon, $('[name="discountShop"]'));
      },
      "userScopeTypeAry": [{
        name: "全部客户优惠",
        type: 0
      },
      {
        name: "指定会员优惠",
        type: 1
      },
      {
        name: "指定客户优惠",
        type: 2
      }],
      "getUserScopeType": function() {
        this.common($scope.tpl.userScopeTypeAry, $('[name="userScopeType"]'));
      },
      "goodsScopeTypeAry": [{
        name: "全部商品优惠",
        type: 0
      },
      {
        name: "选择享受优惠商品",
        type: 1
      },
      {
        name: "选择不享受优惠商品",
        type: 2
      }],
      "getGoodsScopeType": function() {
        this.common($scope.tpl.goodsScopeTypeAry, $('[name="goodsScopeType"]'));
      },
      "common": function(data, ele) { //模拟普通的select框
        var $selContent = ele.siblings(".selectContent").css("zIndex", 1000);
        $selContent.children().remove();
        var eleName = ele.attr("name");
        var $ul = $("<ul>");
        if (data) {
          $selContent.append($ul);
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (eleName == "userScopeType") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].type + '>' + data[i].name + '</a></li>');
            } else if (eleName == "goodsScopeType") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].type + '>' + data[i].name + '</a></li>');
            } else if (eleName == "discountShop") {
              $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].id + '>' + data[i].name + '</a></li>');
            };
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          }
          $ul.find("a").bind({
            "click": function() {
              var textVal = $(this).text(),
                  idVal = $(this).attr("id");
              $selContent.slideUp(200);
              if (eleName == "discountShop") {
                $scope.$apply(function() {
                  angular.forEach($scope.ShopsForCounpon, function(val, key) {
                    if (val.id == idVal) {
                      $scope.shopForCounpon = $scope.ShopsForCounpon[key]
                    }
                  })
                });
              } else if (eleName == "userScopeType") {
                $scope.$apply(function() {
                  $scope.tpl.userScopeType = idVal;
                });
              } else if (eleName == "goodsScopeType") {
                $scope.$apply(function() {
                  if ($scope.tpl.goodsScopeType != idVal) {
                    $scope.tpl.init_msg(true);
                  }
                  $scope.tpl.goodsScopeType = idVal;
                });
              }
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
      }
    };

    $scope.$watch("shopForCounpon", function(n, o) { //监听店铺
      if (o && n && n.name && o.id != n.id && $scope.tpl.userScopeType != undefined) {
        $scope.tpl.shopCounts($scope.shopForCounpon.id, $scope.tpl.userScopeType)
      }
    });

    $scope.$watch("tpl.userScopeType", function(n, o) { //监听优惠范围
      $scope.tpl.userScopeTypeName = "";
      if (n != undefined) {
        angular.forEach($scope.tpl.userScopeTypeAry, function(val, key) {
          if (val.type == n) {
            $scope.tpl.userScopeTypeName = val.name;
          }
        });
        if ($scope.shopForCounpon && $scope.shopForCounpon.name) {
          $scope.tpl.shopCounts($scope.shopForCounpon.id, $scope.tpl.userScopeType)
        }
      }
    });

    $scope.$watch("tpl.goodsScopeType", function(n, o) { //优惠商品范围
      if (n != undefined) {
        angular.forEach($scope.tpl.goodsScopeTypeAry, function(val, key) {
          if (val.type == n) {
            $scope.tpl.goodsScopeTypeName = val.name;
          }
        });
        $scope.tpl.init_msg();
      }
    });

    $scope.validate = function() {
      $("#ump_form").validate({
        rules: {
          name: "required",
          shopId: "required",
          menber: "required",
          startTime: "required",
          endTime: "required",
          userScopeType: "required",
          shopId: "required",
          jian: {
            required: true,
            digits: true
          },
          yuan: {
            required: true,
            digits: true
          },
          discount: {
            required: true,
            range: [0.01, 9.99]
          },
          onSale: {
            required: true,
            range: [0.01, 999999999.99]
          },
          description: {
            required: true,
            maxlength: 200
          }
        },
        messages: {
          name: "请输入订单优惠名称",
          shopId: "请选择店铺",
          menber: "请选择会员",
          startTime: "活动开始时间必填",
          endTime: "活动结束时间必填",
          shopId: "所属店铺必填",
          jian: {
            required: "请输入限购数量",
            digits: "只能输入正整数"
          },
          yuan: {
            required: "请输入限购数量",
            digits: "只能输入正整数"
          },
          discount: {
            required: "此字段必填",
            range: "请输入合法的数字{0到9.99之间}"
          },
          onSale: {
            required: "此字段必填",
            number: "请输入合法的数字{0到999999999.99之间}"
          },
          description: {
            required: "此字段必填",
            maxlength: "输入字符最长为200"
          },
          userScopeType: "请选择优惠范围"
        },
        errorPlacement: function(error, element) {
          if (element.is(":radio")) {
            error.appendTo(element.parent());
          } else {
            element.after(error);
          }

        },
        submitHandler: function() {
          if ($scope.ngtip) {
            return;
          } else {
            $scope.tpl.save();
          }

        }
      });
    }
    $scope.compileTpl = function(b) {
      $compile(angular.element(".ump_content"))($scope || b);
      $scope.$apply();
    }
    //活动列表
    $scope.list = {
      "searchButtonClick": function(hdVal) {
        var _this = angular.element(".ump_order_flexgrid")[0];
        _this.p.newp = 1;
        _this.p.qtype = "name";
        _this.p.query = hdVal || "";
        _this.grid.populate();
      },
      "screeningOfState": function(val) {
        var _this = angular.element(".ump_order_flexgrid")[0];
        _this.p.newp = 1;
        _this.p.qtype = "name";
        _this.grid.addParams("status", val || "");;
        _this.grid.populate();
      }
    }
    //获取店铺
    $scope.getShopsForCounpon = function() {
      var callback = function(data) {
        $scope.ShopsForCounpon = data;
        $scope.shopForCounpon = $scope.ShopsForCounpon[0];
      }
      getListService.getShopsByPlatformId(callback, $rootScope.taobaoSegmentationId);
    }
    $scope.getShopsForCounpon();
    //授权
    $scope.empower = {
      "applyContent": "",
      "email": "",
      "telphone": "",
      "exec": "",
      "init": function(id, item) {
        $scope.item = item;
        if ($scope.item == "listToApply") {
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "ump/applyNotice/" + id,
            async: false,
            type: "get",
            cache: false,
            //data:parames,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              $scope.empower.applyContent = res.applyContent;
              $(".empowerApply").addInteractivePop({
                magTitle: "授权申请",
                mark: false,
                drag: true,
                position: "fixed"
              });
              $(".empowerApply button:eq(0)").unbind("click").bind("click", function() {
                $scope.$apply(function() {
                  $scope.empower.validation()
                })
              })
            },
            error: function(res) {
              var res = $.parseJSON(res.responseText);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": res.message,
                "mark": true
              });
            }
          })
        } else {
          var time = new Date();
          var timeYear = time.getFullYear();
          var timeMonth = time.getMonth() + 1;
          if (timeMonth < 10) {
            timeMonth = "0" + timeMonth
          }
          var timeDay = time.getDate();
          if (timeDay < 10) {
            timeDay = "0" + timeDay
          }
          var myTime = timeYear + "-" + timeMonth + "-" + timeDay;
          $scope.empower.applyContent = myTime + "创建'" + $scope.shopForCounpon.name + "'订单优惠'" + $scope.tpl.name + "',请授权。退订回复TD";
          $(".empowerApply").addInteractivePop({
            magTitle: "授权申请",
            mark: false,
            drag: true,
            position: "fixed"
          });
          $(".empowerApply button:eq(0)").unbind("click").bind("click", function() {
            $scope.$apply(function() {
              $scope.empower.validation('');
            })
          })
          //搞不明白，到底是什么触发了页面的跳转，测试了，不是上面的$apply，但是找不到，只好加一段停留在此页面
          $scope.tpl.src = CAMPAIGN_STATIC.tplBasePath + "view/discount/addUmpOrder.html";
        }

      },
      "apply": function() {
        this.validation();

      },
      "smt": function() {

      },
      "closeApplyPop": function() {
        $(".empowerApply").hide();
      },
      "validation": function() {
        $("#empower_form").validate({
          rules: {
            phone: "phone",
            eamil: {
              email: true
            },
            content: {
              required: true,
              maxlength: 200
            }
            //exec: "required"
          },
          messages: {
            phone: "请输入合法的手机号",
            eamil: "请输入合法的电子邮箱地址",
            content: {
              required: "此字段必填",
              maxlength: "最长200字符"
            }
            //exec: "此字段必填"
          },
          "submitHandler": function() {
            var _this = $scope.empower;
            /*  if (_this.telphone == "" && _this.email == "") {
             $(this).Alert({"title": "提示", "str": "手机号和邮箱至少填写一个", "mark": true});
             return false;
             }*/
            var parame = null;
            var parame = {};
            //列表页申请不需要传一下字段
            if ($scope.item != "listToApply") {
              parame.name = $scope.tpl.name;
              parame.shopId = $scope.shopForCounpon.id;
              parame.userScopeType = $scope.tpl.userScopeType;
              parame.userScopeDetail = $scope.tpl.userLevel;
              parame.useConditionType = $scope.tpl.userScopeType;
              if (parame.userScopeType != 1) {
                parame.userScopeDetail = "";
              }
              parame.useConditionDetail = "";
              if ($scope.tpl.status == 0) {
                parame.startTimeString = $scope.tpl.startTime;
                parame.endTimeString = $scope.tpl.endTime;
              } else {
                parame.startTimeString = $scope.tpl.startTime1;
                parame.endTimeString = $scope.tpl.endTime1;
              }

              parame.operateWayConditionType = $scope.tpl.operateWayConditionType;
              parame.operateWayConditionDetail = $scope.tpl.operateWayConditionDetail;
              if ($scope.tpl.noRestrict == true) {
                parame.operateWay = 2;
              } else {
                parame.operateWay = $scope.tpl.operateWay;
              }
              parame.operateWayDetail = $scope.tpl.operateWayDetail;
              parame.description = $scope.tpl.description;
              parame.type = 1; //商品级优惠是0
              parame.postagve = $scope.tpl.postagve ? 1 : 0;
              parame.postagveArea = $scope.tpl.postagveArea;
              parame.snapshootId = parseInt($scope.snapshootId);
              parame.goodsScopeType = $scope.tpl.goodsScopeType;
            }
            parame.umpId = $scope.applyUmpId;
            parame.applyContent = _this.applyContent;
            parame.email = _this.email;
            parame.comment = _this.exec;
            parame.mobile = _this.telphone;
            parame.tenantId = CAMPAIGN_STATIC.tenantId;
            var parames = JSON.stringify(parame);
            $.ajax({
              url: GLOBAL_STATIC.campaignRoot + "ump/applyNotice/",
              async: false,
              type: "POST",
              cache: false,
              data: parames,
              dataType: "json",
              contentType: 'application/json',
              success: function(res) {
                $(".yunat_maskLayer").remove();
                $(".empowerApply").hide();
                $(".submitEmpower").hide();
                $(this).yAlert({
                  "text": "提交成功"
                });
                removeAlert();

                $scope.tpl.src = "";
                $('.ump_order_flexgrid').flexReload();

              },
              error: function(res) {
                $(this).Alert({
                  "title": "错误",
                  "str": "提交失败，请重新提交或稍后再试",
                  "mark": false
                });
              }
            })
          }
        });
      }
    }
    /*start 商品选择器*/
    $scope.$on("Ctr1NameChange", function(event, msg) {
      $scope.snapshootId = msg.snapshootId;
      $scope.msg = msg;
      if ($scope.msg != {} && $scope.msg.count > 0) {
        $scope.msgcount = "已选中" + $scope.msg.count + "商品"
      } else {
        $scope.msgcount = ""
      }

    });
    $scope.goodsSelector = function() {
      $scope.serviceType = "campaign_ump";
      $scope.isSupportSKU = false;
      $scope.maxGoods = 150;
      $scope.Shops = [];
      $scope.Shops.push($scope.shopForCounpon);
      $scope.isSupportSave = false;
      $scope.productSelect = GLOBAL_STATIC.rootModule + "/modules/Selector/goodsList.html?_=" + new Date().getTime();
    }
    $scope.popupProSel = function() {
      $(".productSelected").addInteractivePop({
        position: "fixed",
        magTitle: "商品选择",
        mark: true
      });
    }
    $scope.getProductSelectedData = function() {}
    /*end 商品选择器*/

    //活动列表
    $('.ump_order_flexgrid').flexigrid({
      url: GLOBAL_STATIC.campaignRoot + 'ump/order/',
      method: 'GET',
      dataType: 'json',
      params: [{
        "name": "status",
        "value": "7"
      },{
        "name": "tenantId",
        "value": CAMPAIGN_STATIC.tenantId
      }],
      colModel: [{
        display: '店铺名称',
        name: 'shopName',
        width: 2,
        sortable: false,
        align: 'left',
        dataindex: 'shopName',
        renderer: function(v) {
          return '<span title="' + v + '">' + v + '</span>';
        }
      },
      {
        display: '定向优惠ID',
        name: 'umpId',
        width: 2,
        sortable: true,
        align: 'left',
        dataindex: 'umpId'
      },
      {
        display: '优惠名称',
        name: 'name',
        width: 2,
        sortable: false,
        align: 'left',
        dataindex: 'name',
        renderer: function(v) {
          return '<span title="' + v + '">' + v + '</span>';
        }
      },
      {
        display: '起止时间',
        name: 'time',
        width: 2,
        height: "auto",
        sortable: false,
        align: 'left',
        mapping: ["startTime", "endTime"],
        convert: function(v, mappVal) {
          return "<span>" + setISO(mappVal[0], "all") + "</span></br><span>" + setISO(mappVal[1], "all") + "</span>";
        }
      },
      {
        display: '优惠方式',
        name: 'operateWay',
        width: 2,
        sortable: false,
        align: 'left',
        mapping: ["operateWay", "operateWayDetail"],
        convert: function(v, mappval) {
          if (mappval[0] == 0) {
            return "打" + mappval[1] + "折"
          } else if (mappval[0] == 1) {
            return "减" + mappval[1] + "元"
          }
          if (mappval[0] == 2) {
            return "减" + mappval[1] + "元且上不封顶"
          }
        }
      },
      {
        display: '包邮地区',
        name: 'postagve',
        width: 2,
        sortable: false,
        align: 'left',
        mapping: ["postagveArea", "postagve"],
        convert: function(v, mappval) {
          if (mappval[0] == 0) {
            return "不包邮";
          } else {
            if (mappval[0].split("*").length == 35) {
              return "所有地区包邮";
            } else if (mappval[0] == "") {
              return "不包邮";
            } else {
              return "地区包邮";
            }
          }
        }
      },
      {
        display: '优惠范围',
        name: 'operateWay',
        width: 2,
        sortable: false,
        align: 'left',
        mapping: ["userScopeType"],
        convert: function(v, mappval) {
          if (mappval[0] == 0) {
            return "全部客户优惠";
          } else if (mappval[0] == 1) {
            return "指定会员优惠";
          } else if (mappval[0] == 2) {
            return "指定客户优惠";
          }
        }
      },
      {
        display: '优惠条件',
        name: 'operateWay',
        width: 2,
        sortable: false,
        align: 'left',
        mapping: ["operateWayConditionType", "operateWayConditionDetail"],
        convert: function(v, mappval) {
          if (mappval[0] == 2) {
            return "满" + mappval[1] + "件送";
          } else if (mappval[0] == 3) {
            return "满" + mappval[1] + "元送";
          }
        }
      },
      { display: '优惠商品范围', name: 'operateWay', width: 2, sortable: false, align: 'left', mapping: ["goodsScopeType"], convert: function (v, mappval) {
        if (mappval[0] == 0) {
          return "全部商品优惠";
        } else if (mappval[0] == 1) {
          return "选择享受优惠商品";
        } else if (mappval[0] == 2) {
          return "选择不享受优惠商品";
        }
      }},
      {
        display: '创建人',
        name: 'creater',
        width: 2,
        sortable: false,
        align: 'left',
        mapping: ["userName", "createTime"],
        convert: function(v, mappval) {
          return mappval[0] + "</br><span class='gray'>" + setISO(mappval[1], "all") + "</span>";
        }
      },
      {
        display: '备注',
        name: 'description',
        width: 1,
        sortable: false,
        align: 'center',
        dataindex: 'description',
        renderer: function(v) {
          return v == '' ? '': '<a href="javascript:void(0)" class="contentTips" ng-title="' + v + '"></a>';
        }
      },
      {
        display: '状态',
        name: 'status',
        width: 2,
        sortable: false,
        align: 'center',
        mapping: ["status", "umpId"],
        convert: function(v, mappval) {
          var status = mappval[0];
          //status 0 新建未提交 1未开始 2进行中 3修改未提交  4已结束
          if (status == 0) {
            return "<span class='yellow'>新建未提交</span></br><a class='smalldarkerblueBtn' href='javascript:void(0)' ng-click='tpl.smt(" + mappval[1] + ")'>提交</a>";
          } else if (status == 1) {
            return "<span class='green'>未开始</span>";
          } else if (status == 2) {
            return "<span class='green'>进行中</span>";
          } else if (status == 3) {
            return "<span class='yellow'>修改未提交</span></br><a class='smalldarkerblueBtn' href='javascript:void(0)' ng-click='tpl.smt(" + mappval[1] + ")'>提交</a>";
          } else if (status == 4) {
            return "<span class='gray'>已结束</span>";
          }

        }
      },
      {
        display: '操作',
        name: 'operation',
        width: 2,
        sortable: false,
        align: 'center',
        mapping: ["status", "umpId", "shopName"],
        convert: function(v, mappval) {
          var status = mappval[0];
          //status 0 新建未提交 1未开始 2进行中 3修改未提交  4已结束
          return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="tpl.modify(' + mappval[1] + ',\''+mappval[2]+'\',\''+mappval[0]+'\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-click="tpl.del(' + mappval[1] + ')"></a>';
        }
      }],
      updateDefaultParam: true,
      sortname: "umpId",
      sortorder: "desc",
      rp: 20,
      usepager: true,
      useRp: true,
      showTableToggleBtn: true,
      searchitems: {
        display: '优惠名称',
        name: 'name'
      },
      colAutoWidth: true,
      onSuccess: function() {
        var scope = angular.element(document.querySelector('.ump_content')).scope();
        scope.compileTpl(scope);
      },
      onError: function(data) {
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
]);
