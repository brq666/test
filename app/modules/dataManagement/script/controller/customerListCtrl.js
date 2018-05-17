/**
 * Created by dupenghui on 2014/8/11.
 */
//获得当前对象和body之间的左边距
function getLeftSet(elem) {
  return elem.offsetParent ? elem.offsetLeft + getLeftSet(elem.offsetParent) : elem.offsetLeft;
}
//获得当前对象和body之间的上边距
function getTopSet(elem) {
  return elem.offsetParent ? elem.offsetTop + getTopSet(elem.offsetParent) : elem.offsetTop;
}
//绑定列表
angular.module("dataManage.controllers").controller('CustomerOrderCtrl', ["$scope", "$location", "$http", "ngCustomListService",
  function($scope, $location, $http, ngCustomListService) {
    //订单列表
    $scope.OrderList = function() {
      var scope = angular.element(document.querySelector('.maincontainer')).scope();

      ngCustomListService.getOrderList(function(response) {
        $scope.OrderList.Order = response;
        $(".commCustomerOrderWrap").addInteractivePop({
          magTitle: "客户订单查看",
          mark: true,
          drag: true,
          width: 1000,
          position: "fixed",
          childElePop: true
        });
        if (response.length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "该客户没有订单数据",
            "mark": true,
            "width": "200px",
            "eleZindex": 1010,
            "markZindex": 1005
          }, function() {
            $scope.$apply(function() {
              $scope.gridObj.modelSrc = ""
            });
            angular.element(".yunat_maskLayer").remove();
          });
        }
      }, scope.gridObj.customerNo, scope.SearTools.ShopIds);
    }
    $scope.OrderList();

    $scope.customerOrderObj = {
      "getDetailInfo": function(item) {
        var cur = item;
        return {
          "receiverName": cur.consigneename,
          "receiverPhone": cur.consigneemobile,
          "receiverState": cur.consigneeprovince,
          "receiverCity": cur.consigneecity,
          "receiverDistrict": cur.consigneeregion,
          "receiverAddress": cur.consigneeaddress,
          "receiverZip": cur.consigneepostcode
        }
      },
      "toNormalTime": function(str) { // 转化时间
        return setISO(str, "all");
      },
      "toNormalState": function(str) { //订单状态
        var text = "";
        switch (str) {
          case "TRADE_NO_CREATE_PAY":
            text = "没有创建支付宝交易";
            break;
          case "WAIT_BUYER_PAY":
            text = "等待买家付款";
            break;
          case "WAIT_SELLER_SEND_GOODS":
            text = "等待卖家发货(买家已付款)";
            break;
          case "WAIT_BUYER_CONFIRM_GOODS":
            text = "等待买家确认收货(卖家已发货)";
            break;
          case "WAIT_BUYER_CONFIRM_GOODS":
            text = "等待买家确认收货(卖家已发货)";
            break;
          case "TRADE_BUYER_SIGNED":
            text = "买家已签收,货到付款专用";
            break;
          case "TRADE_FINISHED":
            text = "交易成功";
            break;
          case "TRADE_CLOSED":
            text = "付款以后用户退款成功，交易自动关闭";
            break;
          case "TRADE_CLOSED_BY_TAOBAO":
            text = "付款以前，卖家或买家主动关闭交易";
            break;
          case "PAY_PENDING":
            text = "国际信用卡支付付款确认中";
            break;
        }
        return text;
      }
    }

  }]
);

angular.module("dataManage.controllers").controller('customerListNewCtrl', ["$scope", "$window", "$location", "$http", "$compile", "ngCustomListService", "ngRedAndBlackCustomService", "$q", "dataSelectorShops", "$ccModal",
  function($scope, $window, $location, $http, $compile, ngCustomListService, ngRedAndBlackCustomService, $q, dataSelectorShops, $ccModal) {
    //搜索栏
    $scope.SearTools = {
      "Subject": {},
      //主题-必选条件
      "Shop": {},
      //店铺-必选条件
      "ShopValsView": "",
      "ShopIds": "",
      "isSelectedShops": [],
      "OptionalQueryItmes": {},
      //可选条件
      "conditionId": null,
      "searchDelay": "",
      // 设定先取店铺再加载数据
      "dataLoading": true,
      // 是否正在加载数据
      "searchButtonVal": "搜索",
      "startSearch": function() {
        // if ($scope.SearTools.ShopValsView === '') {
        //   $scope.showShopValsViewError = true;
        // } else {
          if (this.dataLoading) {
            this.dataLoading = false;
            this.searchButtonVal = "数据加载中";
            this.changeData();
          }
        // }
      },
      "initData": function() { //初始化数据
        $scope.SubjectController.initData();
        $scope.shops = [];
        $scope.config = {};
      },
      "GetResult": function(type) {
        var _this = this;
        var condition = {};
        var deferred = $q.defer();
        condition.attributeId = $scope.mustQueryItems.id;
        condition.type = $scope.mustQueryItems.type;
        condition.operator = "";
        condition.values = $scope.SearTools.ShopIds;
        var curPostData = {};
        curPostData.subjectId = _this.Subject.subjectId;
        var conditons = $scope.getAllConditions();
        conditons.push(condition);
        curPostData.queryItems = conditons;
        ngCustomListService.postConditions(function(response) {
          _this.conditionId = response.conditionId;
          if (type == "init") {
            _this.dataLoading = true;
            _this.searchButtonVal = "搜索";
            getOrderConfigList();
            //监听是否有店铺
            $scope.$watch("SearTools.ShopValsView",function(newVal,oldVal){
              if(!newVal && !oldVal){
                // $scope.SearTools.dataLoading = false;
              }else if(!newVal && oldVal){
                // $scope.SearTools.dataLoading = false;
              }else{
                $scope.showShopValsViewError = false;
                // $scope.SearTools.dataLoading = true;
              }
            })
          } else {
            $scope.gridObj.changeByParams();
          }
        }, curPostData);
      },
      "searchData": function() { //第一次搜索
        var _this = this;
        $scope.SearTools.searchDelay.promise.then(function(shopData) {
          _this.dataLoading = false;
          _this.searchButtonVal = "数据加载中";
          _this.GetResult("init")
        })
      },
      "changeData": function() { //刷新
        var _this = this;
        _this.GetResult("other");
      },
      "getShops": function() {
        var self = this;
        $scope.config.queryParams = {
          tenantId: DATA_STATIC.tenantId,
          platCode: $scope.SearTools.Subject.platCode
        };

        dataSelectorShops({ // 数据管理 客户基本信息 选择注册门店
          type: 'shop',
          config: $scope.config,
          shops: $scope.shops
        }).then(function(res) {
          $scope.shops = angular.copy(res.shops);
          self.sureAddShop($scope.shops);
          $scope.config = res.config;
        });
       },
      "sureAddShop": function(lists) {
        var _this = this;
        _this.isSelectedShops = [];
        angular.forEach(lists, function(v, k) {
          var item = {
            id: v.shopId,
            name: v.shopName
          }
          _this.isSelectedShops.push(item);
        });
        _this.initShopsView(_this.isSelectedShops);
        $scope.globalConditions.change_shop();
      },
      "initShopsView": function(data) {
        if (data.length > 0) {
          var storeValue = [],
            soreIds = [];
          angular.forEach(data, function(val, key) {
            storeValue.push(val.name);
            soreIds.push(val.id);
          });
          $scope.SearTools.ShopValsView = storeValue.join(",");
          $scope.SearTools.ShopIds = soreIds.join(",");
        } else {
          var allShopsAry = [];
          angular.forEach($scope.mustQueryItems.configs, function(val, key) {
            allShopsAry.push(val.idInPlat);
          });

          $scope.SearTools.ShopValsView = $scope.mustQueryItems.configs[0] ? $scope.mustQueryItems.configs[0].name: "";
          if( !$scope.SearTools.ShopValsView ){

          }
          $scope.SearTools.ShopIds = allShopsAry[0];
          this.isSelectedShops.push();
        }
      }
    }
    //主题
    $scope.SubjectController = {
      "MetasSubject": {},
      "initData": function() { //加载主题列表
        var _this = this;
        ngRedAndBlackCustomService.getPlatList(function(response) {
          _this.MetasSubject = response;
          $scope.SearTools.Subject = _this.MetasSubject[0];
          $scope.QueryItmesController.initData();
        })
      },
      "change_subject": function() { //切换主题，加载店铺和可选条件
        $scope.removeAllConditions();
        $("#shop").hide();
        $scope.QueryItmesController.initData();
        $scope.SearTools.isSelectedShops = $scope.shops = [];

        if ($scope.SearTools.Shop != {}) {
          $("#shop").show();
        }

      }
    }
    //获取初始化数据
    $scope.globalConditions = {
      "disposeInitConditions": function(details) { //初始化
        angular.forEach(details, function(val, key) {
          if (details[val.queryItemId]) { // 行为自定义无details
            val.conditionOps = $.extend(true, {},
              (val.queryItemId && details[val.queryItemId] ? details[val.queryItemId] : {}));
          } else {
            val.conditionOps = {
              "type": val.type,
              "queryItemId": val.queryItemId,
              "name": val.name,
              "configs": val.configs,
              "tip": val.tip,
              "groupConditions": []
            }
          }
          val.conditionOps.id = val.id ? val.id : ""; //重新赋值条件list的id
          val.conditionOps.queryItemId = val.queryItemId ? val.queryItemId : "";
          val.conditionOps.groupConditions = val.groupConditions || [];
          var values = {
            value: "",
            operator: "",
            type: "absolutely"
          };
          val.conditionOps.values = values;
        });
        return details;
      },
      "change_shop": function() { //更新店铺
        //$scope.SearTools.changeData();
      }
    };
    //加载搜索栏-加载店铺+可选选项
    $scope.QueryItmesController = {
      "initData": function() {
        ngCustomListService.getQueryitmesBySubjectId(function(response) {
          //默认初始化conditions
          if (response.details) {
            angular.forEach(response.details, function(val, key) {
              if (val.head) { // 行为自定义无details
                $scope.mustQueryItems = val;
                $scope.SearTools.searchDelay = $q.defer();
                // ngCustomListService.getShopsByPlatformId(function(responseShopData) { //获取权限店铺
                var responseShopData = []
                $scope.mustQueryItems.configs = responseShopData;
                $scope.SearTools.initShopsView([]);
                $scope.SearTools.Shop = $scope.mustQueryItems.configs[0];
                $scope.SearTools.searchDelay.resolve(responseShopData);
                $scope.SearTools.searchDelay.reject();
                // }, $scope.SearTools.Subject.segmentationId);
                delete response.details[key];
              }
            });
            var disposeData = $scope.globalConditions.disposeInitConditions(response.details);

            $scope.addAllConditions(disposeData);
            $scope.SearTools.searchData();
          }
        }, $scope.SearTools.Subject.subjectId)
      }
    };
    /*start 右击事件--隐藏弹窗窗或者enable复选框*/
    document.addEventListener("mousedown", function(e) {
      var target = e.target || e.srcElement;
      if ($(target).closest(".condition").length > 0) {

      } else {
        $(".condition .edit").each(function() {
          var isValue = $(this).find("a").html() == "";
          if (($(this).siblings("section[data-type='add']").css("display") != "none") && (!($(this).siblings("section[data-type='add']").hasClass("numberType")) && ($(this).siblings("section[data-type='add']").attr("default") != $(this).find("a").html()) || (($(this).siblings("section[data-type='add']").hasClass("numberType")) && ($(this).siblings("section[data-type='add']").attr("default") == "valueChange")))) {
            $(this).siblings("label").hide().end().show().siblings("section").find("button").click();
            $("section[data-type='add']").hide();
          }
        });
        $("section[data-type='add']").hide();
        $(".targetDivBox label").css("border-bottom-color", "#cecece");
        $(".targetDivBox .up").attr("class", "down");
      }
    }, false);
    /*end 右击事件--隐藏弹窗窗或者enable复选框*/

    //加载搜索栏
    $scope.SearTools.initData();
    //自定义表格
    $scope.gridObj = {
      "modelSrc": "",
      // 客户订单查询 修改属性模板入口
      "customerNo": "",
      "curAttrId": "",
      "showConfigAttrSrc": "",
      "addCustomAttrPage": true,
      "customList": "",
      "customVal": "",
      "girdElement": "",
      //use 表格列表行内编辑
      "itemEidt": function(customerno) { //自定义数据权限
        ngCustomListService.getCustomerByCustomerNo(function(response) {
          $scope.Pop.Customer = {
            "id": response.id,
            "shopid": response.shopid,
            "customerno": response.customerno,
            "username": response.username,
            "sex": response.sex,
            "month": response.month,
            "day": response.day,
            "age": response.age,
            "mobile": response.mobile,
            "email": response.email
          };
          if (response.month == null || response.day == null) {
            $scope.Pop.birthday = "";
          } else {
            $scope.Pop.birthday = response.month + "-" + response.day;
          }
          $scope.Pop.OpenPop();
          $('#empower_form [name=phone], #empower_form [name=email]').removeClass('error')
          $('#empower_form [for=phone], #empower_form [for=email]').hide()
        }, customerno)
      },

      "changeByParams": function() {
        this.girdElement.grid.addParams("conditionId", $scope.SearTools.conditionId);
        this.girdElement.p.newp = 1;
        this.girdElement.grid.populate();
        //mdd
        //var _this = angular.element("#couponListsGridMain")[0];
        //_this.p.qtype = "name";
        //_this.grid.removeParams("status");
        //_this.grid.addParams("conditionId", $scope.SearTools.conditionId);
        //_this.grid.populate();

      },
      // 查看客户订单信息
      "orderInformationView": function(customerNo) { // 查看客户订单信息
        $scope.gridObj.customerNo = customerNo;
        this.modelSrc = baseUrl + "customerOrderInfo.html?_=" + new Date().getTime();
      },
      //编译模板用的  编译类为couponListsGrid元素及子元素
      "upCompile": function(curScope) {
        $compile(angular.element("#couponListsGridMain"))($scope || curScope);
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
    };
    //编辑
    $scope.Pop = {
      "Customer": {
        "id": "",
        "shopid": "",
        "age": "",
        "customerno": "",
        "username": "",
        "sex": "",
        "month": "",
        "day": "",
        "mobile": "",
        "email": ""

      },
      "birthday": "",
      "days": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      "OpenPop": function() {
        $(".Pop").addInteractivePop({
          magTitle: "客户信息修改",
          width: 470,
          mark: true,
          position: "fixed",
          childElePop: true
        });
      },
      "showOrHideDay": function() {
        _this = this;
        $(".day_start dd div").each(function(index, item) {
          $(item).bind("click", function() {
            $(".day_start dd div").removeClass("cur");
            $(item).addClass("cur");
          })
        });
        $(".day_start").show();
      },
      "chooseDay": function() {
        if ($(".day_start dd div.cur").length > 0) {
          _this.Customer.day = $(".day_start dd div.cur").html().trim();
        }
        $(".day_start").hide();
      },
      "HideDay": function() {
        _this = this;
        $(".day_start").hide();
      },
      "resetValue": function() {
        this.birthday = "";
        angular.element(".ngplaceholder_wrapper input").val("");
        this.Customer.day = "";
        this.Customer.month = "";
      },
      "Sure": function() {
        _this = this;
        $("#empower_form").validate({
          rules: {
            phone: "phone",
            email: "email"
          },
          messages: {
            phone: "请输入合法的手机号",
            email: "请输入合法的Email"
          },
          "submitHandler": function() {
            if (_this.birthday != "") {
              _this.Customer.month = _this.birthday.split('-')[0];
              _this.Customer.day = _this.birthday.split('-')[1];
            }
            ngCustomListService.updateCustomerByCustomer(function(response) {
              $(this).yAlert({
                "text": "修改成功"
              });
              removeAlert();
              $scope.gridObj.changeByParams();
              $(".Pop").hide();
            }, _this.Customer);
          }
        })
      }
    }
    var getOrderConfigList = function() {
      $.ajax({
        "type": "GET",
        "url": GLOBAL_STATIC.datamanageRoot + 'customerinfo/metas/columns/' + $scope.SearTools.Subject.subjectId + '?_=' + new Date().getTime(),
        "dataType": "JSON",
        "success": function(response) {
          var gridListData = [];
          var process = {};
          angular.forEach(response, function(val, key) {
            if (val.textAlign == "href") {
              var temObj = {
                display: val.attributeName,
                name: val.attributeName,
                width: 1,
                sortable: false,
                align: "center",
                dataindex: val.attributeName,
                renderer: function(v) {
                  return '<a class="icon-search icon-search-color icon-medium-size" target="_blank" href="' + v + '" title="查看" style="position:relative;top:5px"></a>';
                }
              };
              gridListData.push(temObj);
            } else {
              gridListData.push({
                display: val.attributeName,
                name: val.attributeName,
                width: 1,
                sortable: false,
                align: val.textAlign,
                dataindex: val.attributeName,
                renderer: function(v) {
                  return '<span title="' + v + '">' + v + '</span>';
                }
              });
            }
            if (val.isPk) {
              process = {
                display: '操作',
                name: 'enable',
                width: 1,
                align: 'center',
                dataindex: 'enabled',
                mapping: ['key','encrypted_contact_id','_ID'],
                convert: function(v, mappVal) {
                  var msg = "";
                  if (val.canEdit) {
                    msg += '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改此客户" ' + 'ng-click="gridObj.itemEidt(\'' + mappVal[0] + '\')"></a>';
                  } else {
                    if (DATA_STATIC.tenantId !== 'edecathlon') {
                      msg += '<a href="javascript:void(0);" class="lock_edit_delete" title="该平台目前暂时不支持该操作，我们正在开发中!" ' + '></a>';    
                    }
                  }
                  // if (val.canCheckOrder) {
                  //   msg += '<a href="javascript:void(0);" class="detail"  title="查看此客户订单" ' + 'ng-click="gridObj.orderInformationView(\'' + mappVal[0] + '\')"></a>';
                  // } else {
                  //   msg += '<a href="javascript:void(0);" class="lock_detail"  title="该平台目前暂时不支持该操作，我们正在开发中!" ' + '></a>';
                  // }
                  if (DATA_STATIC.tenantId === 'edecathlon') {
                    // 360视图
                    msg += '<a href="javascript:void(0);" class="edit_delete search_icon" title="查看" ng-click="getDetailInfo(\'' + mappVal[1] + '\', \'' + mappVal[2] + '\')"></a>'
                  }
                  return msg;
                }
              };
            }
          });
          if (!$.isEmptyObject(process)) {
            gridListData.push(process);
          }
          var $attributeGridElement = $("<div id='couponListsGridMain'></div>");
          $(".couponListssBoxMain").html("").append($attributeGridElement);
          $scope.gridObj.girdElement = angular.element("#couponListsGridMain")[0];
          $('#couponListsGridMain').flexigrid({ //属性值grid
            url: GLOBAL_STATIC.datamanageRoot + 'customerinfo/metas/datas?_=' + new Date().getTime(),
            method: 'GET',
            dataType: 'json',
            colModel: gridListData,
            sortname: '',
            sortorder: "asc",
            buttons: [],
            params: [{
              "name": "conditionId",
              "value": $scope.SearTools.conditionId
            }],
            usepager: true,
            useRp: true,
            rp: 20,
            showTableToggleBtn: true,
            colAutoWidth: true,
            autoload: false,
            rowDblClick: function() {
              $(".orderConfigContent").show();
            },
            onSuccess: function(data) {
              var scope = angular.element($("#couponListsGridMain")).scope();
              scope.gridObj.upCompile(scope);
              $scope.$apply(function() {
                $scope.SearTools.dataLoading = true;
                $scope.SearTools.searchButtonVal = "搜索";
              });
            },
            onError: function(response) {
              var responseText = response.responseText;
              var data = $.parseJSON(responseText);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          })
          var thDivs = document.querySelectorAll('.flexigrid div.hDiv th:not(:last-child) div');
          $.each(thDivs, function(index, div) {
            $(div).attr("title", $(div).text());
          });
          //$scope.gridObj.girdElement.grid.populate();
        }
      })
    }

    $scope.getDetailInfo = function(id, _ID) {
      var modalInstance = $ccModal
      .modal({
        title: '客户视图',
        body: baseUrl + 'customerInfoTable.html',
        style: {
          overflow: 'auto',
          width: '1100px',
          height: '600px',
          'max-width': '1100px'
        },
        hasFooter: false,
        fullscreen: true,
        controller: 'CustomerInfoCtrl',
        bindings: {
          id: id,
          _ID: _ID
        }
      }).open();

    }
  }
]);
