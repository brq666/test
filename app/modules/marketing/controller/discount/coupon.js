angular.module("campaign.controllers").controller('ccmsCoupon', ['$scope', '$rootScope', '$location', '$http', '$compile', 'getListService',
  function($scope, $rootScope, $location, $http, $compile, getListService) {
    /*新建修改公用一个弹出层
     *定义数据字段
     *如果为新增，需要初始化数据为空，或者初始化为默认值，如果为修改，需要将保存的值显示出来
     */
    $scope.status = "5";
    $scope.statusModel = "5";
    $scope.shopForCounpon = {};
    $scope.datacoupon = {
      "name": "",
      //优惠名称
      "shopId": "",
      //所属店铺
      "money": "",
      //优惠券面额
      "moneyName": "",
      "startTime": "",
      //起始时间
      "endTime": "",
      //结束时间
      "remark": "",
      //描述
      "useConditionType": 0,
      "useConditionDetail": "",
      "isEdit": true,
      "isAdd": true,
      "isSelectEdit": true,
      "src": "",
      //方法
      "add": function() {
        $scope.status = 0;
        this.isEdit = true;
        this.isAdd = true;
        this.isSelectEdit = true;
        this.name = "";
        this.moneyName = "";
        this.shopId = "";
        this.startTime = "";
        this.endTime = "";
        this.useConditionDetail = "";
        this.remark = "";
        this.money = "",
        this.src = CAMPAIGN_STATIC.tplBasePath + "view/discount/addCoupon.html";
        this.title = "新建发送式优惠券";
        $scope.shopForCounpon = $scope.ShopsForCounpon[0];
      },
      "modify": function(id, curShopName) {
        var _this = this;
        _this.isAdd = false;
        this.src = CAMPAIGN_STATIC.tplBasePath + "view/discount/addCoupon.html";
        this.title = "修改发送式优惠券";
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "coupon/" + id + "/",
          async: false,
          type: "get",
          cache: false,
          dataType: "json",
          contentType: 'application/json',
          success: function(res) {
            _this.name = res.name;
            _this.shopId = res.shopId;
            $scope.shopForCounpon = {
              name: curShopName,
              id: _this.shopId
            };
            _this.id = id;
            _this.money = res.money;
            _this.useConditionType = res.useConditionType;
            _this.useConditionDetail = res.useConditionDetail;
            _this.startTime = setISO(res.startTime, "all");
            _this.endTime = setISO(res.endTime, "all");
            _this.remark = res.remark;
            _this.status = res.status;
            $scope.status = res.status;
            _this.isSelectEdit = false;
            _this.isEdit = false;
            if (res.status == 0) {
              _this.isEdit = true;
            }
            //店铺选中操作
            // $("#shopId option").each(function(){
            //     var _this=$(this);
            //     var val=_this.attr("value");
            //     if(val==res.shopId){
            //         _this.attr("selected","selected");
            //     }
            // });
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
      "submit": function() {
        //验证
        $scope.validate()
      },
      "save": function(moreTime) {
        $scope.$apply(function() {
          $scope.blockOrHidden = false;
          $scope.blockOrHiddenTxt = false;
        })
        /*验证
         *特殊数据的处理，然后保存数据
         *新建未提交状态商品级优惠做授权处理
         */

        //数据保存
        var ajaxType;
        var _this = this;
        if (_this.operateWay == 1) {
          _this.operateWayDetail = _this.onSale;
        } else {
          _this.operateWayDetail = _this.discount;
        }
        //_this.src="";
        var parame = {};
        parame.name = _this.name;
        parame.shopId = $scope.shopForCounpon.id;
        //parame.shopId=_this.shopId;
        parame.money = _this.money;
        parame.useConditionType = 0;
        parame.useConditionDetail = _this.useConditionDetail;
        parame.startTimeString = _this.startTime;
        parame.endTimeString = _this.endTime;
        parame.remark = _this.remark;
        parame.status = _this.status;
        parame.tenantId = CAMPAIGN_STATIC.tenantId;
        var a = parseInt(parame.useConditionDetail);
        var b = parseInt(parame.money);
        if (_this.isAdd) {
          ajaxType = "POST";
        } else {
          ajaxType = "PUT";
          parame.id = _this.id;
        }
        if (a <= b || a > 999999999 || a == 0) {
          if (a <= b && a != 0) {
            $(this).Alert({
              "title": "使用条件设置错误",
              "str": "使用条件必须大于所选优惠券。",
              "mark": true,
              "width": "300px"
            });
          } else if (a > 999999999) {
            $(this).Alert({
              "title": "使用条件设置错误",
              "str": "使用条件最大为999999999。",
              "mark": true,
              "width": "300px"
            });
          } else if (a == 0 && a <= b) {
            $(this).Alert({
              "title": "使用条件设置错误",
              "str": "使用条件不能为0。",
              "mark": true,
              "width": "300px"
            });
          }
          return;
        } else {

          parames = JSON.stringify(parame);
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "coupon/",
            async: false,
            type: ajaxType,
            cache: false,
            data: parames,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              $scope.blockOrHiddenTxt = false;
              $scope.status = res.isNewStatus;
              $scope.$apply();
              if (res.code == "success") {
                $(this).yAlert({
                  "text": "保存成功"
                });
                $(".submitEmpower").hide();
                removeAlert();
                $('.coupon_flexgrid').flexReload();
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
                  //$scope.blockOrHidden=0;
                }
                $scope.applyHttp = res.applyHttp;
                $scope.applyUmpId = res.id;;

                //$(".content a:eq(0)").attr("href",$scope.applyHttp);
                $(".text a:eq(0)").unbind("click").bind("click", function() {
                  $scope.$apply(function() {
                    $scope.empower.init($scope.applyUmpId)
                  })
                });
                //立即授权按钮
                $(".submitEmpower .commBottom button:eq(0)").unbind("click").bind("click", function() {
                  $scope.$apply(function() {
                    window.open($scope.applyHttp);
                    $scope.blockOrHidden = 1;
                    //$scope.datacoupon.save('second');
                  })
                })
                //提交按钮
                $(".submitEmpower .commBottom button:eq(1)").unbind("click").bind("click", function() {
                  $scope.$apply(function() {
                    $scope.datacoupon.save('second');
                  })
                });
                if (!moreTime) {
                  $(".submitEmpower").addInteractivePop({
                    magTitle: "授权提醒",
                    mark: true,
                    drag: true,
                    position: "fixed"
                  });
                } else {
                  $(".submitEmpower").addInteractivePop({
                    magTitle: "授权提醒",
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

        }

      },
      "del": function(id, item) {
        $(this).Confirm({
          "title": "确认删除",
          "str": "活动删除后将无法恢复，确定要删除活动？",
          "mark": true
        }, function() {
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "coupon/" + id,
            async: false,
            type: "DELETE",
            cache: false,
            //data:parames,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              if (res.code == "success") {
                $('.coupon_flexgrid').flexReload();
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
              } else if (res.code == "noApply") {
                $scope.datacoupon.shouquan(item, res);
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
      "disable": function(id) {
        $(this).Confirm({
          "title": "确认禁用",
          "str": "是否确定禁用？",
          "mark": true
        }, function() {
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "coupon/disable/" + id,
            async: false,
            type: "PUT",
            cache: false,
            //data:parames,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              //if(res=="success"){接口中不涉及不成功得情况
              $('.coupon_flexgrid').flexReload();
              //}else if(res=="error"){
              //$(this).Alert({"title":"错误","str":res.msg,"mark":true});
              //}
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
      "able": function(id) {
        $(this).Confirm({
          "title": "确认启用",
          "str": "是否确定启用？",
          "mark": true
        }, function() {
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "coupon/able/" + id,
            async: false,
            type: "PUT",
            cache: false,
            //data:parames,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              //if(res=="success"){接口中不涉及不成功得情况
              $('.coupon_flexgrid').flexReload();
              //}else if(res=="error"){
              // $(this).Alert({"title":"错误","str":res.msg,"mark":true});
              // }
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
        // $scope.$apply(function(){
        $scope.blockOrHidden = false;
        $scope.blockOrHiddenTxt = false;
        // })
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "coupon/channel/" + id,
          async: false,
          type: "PUT",
          cache: false,
          dataType: "json",
          contentType: 'application/json',
          success: function(res) {
            if (res.code == "success") {
              $('.coupon_flexgrid').flexReload();
              $(".yunat_maskLayer").remove();
              $(".submitEmpower").hide();
            } else if (res.code == "error") {
              $(this).Alert({
                "title": "错误",
                "str": "提交失败，失败原因：" + res.msg,
                "mark": true
              });
            } else if (res.code == "noApply") {
              $scope.datacoupon.shouquan(item, res)
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
          //$(this).Alert({"title": "提示", "str": "保存失败，授权未成功，请授权后重新提交", "mark": true});
        } else {
          $scope.blockOrHiddenTxt = false;
        }
        $scope.status = res.isNewStatus;
        $scope.applyHttp = res.applyHttp;
        $scope.applyUmpId = res.id;
        $scope.blockOrHidden = 0;
        //item为传回来的参数，如果是'secondTime'是，弹出框不需要mark，否则会黑的像鬼一样！
        if (item) {
          $(".submitEmpower").addInteractivePop({
            magTitle: "授权提醒",
            mark: false,
            drag: true,
            position: "fixed"
          });
        } else {
          $(".submitEmpower").addInteractivePop({
            magTitle: "授权提醒",
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
          $scope.$apply(function() {
            $scope.datacoupon.smt($scope.applyUmpId, 'secondTime')
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
            url: GLOBAL_STATIC.campaignRoot + "coupon/count/restriction/" + shopId,
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
      "getShops": function() {
        this.common($scope.ShopsForCounpon, $('[name="discountShop"]'));
      },
      "couponsValAry": [{
        name: "3元",
        type: 3
      },
        {
          name: "5元",
          type: 5
        },
        {
          name: "10元",
          type: 10
        },
        {
          name: "20元",
          type: 20
        },
        {
          name: "50元",
          type: 50
        },
        {
          name: "100元",
          type: 100
        }],
      "getCouponsVal": function() {
        this.common($scope.datacoupon.couponsValAry, $('[name="money"]'));
      },
      "common": function(data, ele) { //模拟普通的select框
        var $selContent = ele.siblings(".selectContent:first").css("zIndex", 1000);
        $selContent.children().remove();
        var eleName = ele.attr("name");
        var $ul = $("<ul>");
        if (data) {
          $selContent.append($ul);
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (eleName == "money") {
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
              } else if (eleName == "money") {
                $scope.$apply(function() {
                  $scope.datacoupon.money = idVal;
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
    $scope.$watch("datacoupon.money", function(n, o) { //优惠券面额
      if (n != undefined) {
        angular.forEach($scope.datacoupon.couponsValAry, function(val, key) {
          if (val.type == n) {
            $scope.datacoupon.moneyName = val.name;
          }
        });
      }
    });
    $scope.validate = function() {
      $("#coupon_form").validate({
        rules: {
          name: "required",
          shopId: "required",
          money: "required",
          startTime: "required",
          endTime: "required",
          remark: {
            maxlength: 200
          },
          useConditionDetail: {
            digits: true
          }

        },
        messages: {
          name: "请输入优惠券名称",
          shopId: "请选择店铺",
          money: "请选择优惠券面额",
          startTime: "开始时间必填",
          endTime: "结束时间必填",
          remark: {
            maxlength: "输入字符最长为200"
          },
          useConditionDetail: {
            digits: "必须输入正整数"
          }
        },
        errorPlacement: function(error, element) {
          if (element.is(":radio")) {
            error.appendTo(element.parent());
          } else {
            element.after(error);
          }

        },
        submitHandler: function() {
          $scope.datacoupon.save();
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
        var _this = angular.element(".coupon_flexgrid")[0];
        _this.p.newp = 1;
        _this.p.qtype = "name";
        _this.p.query = hdVal || "";
        _this.grid.populate();
      },
      "screeningOfState": function(val) {
        var _this = angular.element(".coupon_flexgrid")[0];
        _this.p.newp = 1;
        _this.p.qtype = "name";
        //_this.grid.removeParams("status");
        _this.grid.addParams("status", val || "");
        _this.grid.populate();
      }
    }
    //$scope.list.screeningOfState(5);
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
            url: GLOBAL_STATIC.campaignRoot + "coupon/applyNotice/" + id,
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
                mark: true,
                drag: true,
                position: "fixed",
                eleZindex: 1002,
                markZindex: 1001,
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
          $scope.empower.applyContent = myTime + "创建'" + $scope.shopForCounpon.name + "'发送式优惠券'" + $scope.datacoupon.name + "',请授权。退订回复TD";
          $(".empowerApply").addInteractivePop({
            magTitle: "授权申请",
            mark: true,
            drag: true,
            position: "fixed",
            eleZindex: 1002,
            markZindex: 1001,
          });
          $(".empowerApply button:eq(0)").unbind("click").bind("click", function() {
            $scope.$apply(function() {
              $scope.empower.validation('');
            })
          })
        }
      },
      "apply": function() {
        this.validation();

      },
      "smt": function() {

      },
      "closeApplyPop": function() {
        angular.element(".empowerApply").hide();
        angular.element(".yunat_maskLayer:last").remove();
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
              maxlength: 100
            }
            //exec:"required"
          },
          messages: {
            phone: "请输入合法的手机号",
            eamil: "请输入合法的电子邮箱地址",
            content: {
              required: "此字段必填",
              maxlength: "最长100字符"
            }
            //exec:"此字段必填"
          },
          "submitHandler": function() {
            var _this = $scope.empower;
            /* if(_this.telphone=="" && _this.email==""){
             $(this).Alert({"title":"提示","str":"手机号和邮箱至少填写一个","mark":true});
             return false;
             }*/
            var parame = {};
            //parame.$schema="";
            parame = {};
            parame.id = $scope.applyUmpId;
            parame.applyContent = _this.applyContent;
            parame.email = _this.email;
            parame.comment = _this.exec;
            parame.mobile = _this.telphone;
            parame.tenantId = CAMPAIGN_STATIC.tenantId;
            if ($scope.item != "listToApply") {
              parame.name = $scope.datacoupon.name;
              parame.shopId = $scope.shopForCounpon.id;
              parame.money = $scope.datacoupon.money;
              parame.useConditionType = $scope.datacoupon.useConditionType;
              parame.useConditionDetail = $scope.datacoupon.useConditionDetail;
              parame.startTimeString = $scope.datacoupon.startTime;
              parame.endTimeString = $scope.datacoupon.endTime;
              parame.remark = $scope.datacoupon.remark;

            }

            var parames = JSON.stringify(parame);
            $.ajax({
              url: GLOBAL_STATIC.campaignRoot + "coupon/applyNotice",
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
                $scope.datacoupon.src = "";
                $('.coupon_flexgrid').flexReload();
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

    $('.coupon_flexgrid').flexigrid({
      url: GLOBAL_STATIC.campaignRoot + 'coupon/',
      method: 'GET',
      dataType: 'json',
      params: [{
        "name": "status",
        "value": "5"
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
        display: '优惠券ID',
        name: 'id',
        width: 2,
        sortable: true,
        align: 'left',
        dataindex: 'id'
      },
      {
        display: '优惠券名称',
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
        display: '优惠券面额',
        name: 'name',
        width: 2,
        sortable: false,
        align: 'left',
        dataindex: 'money'
      },
      {
        display: '使用条件',
        name: 'name',
        width: 2,
        sortable: false,
        align: 'left',
        mapping: ["useConditionDetail", "money"],
        convert: function(v, mappVal) {
          if (mappVal[0] == "") {
            mappVal[0] = mappVal[1] + 0.01;
          }
          return "单笔消费满" + mappVal[0] + "元";
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
        display: '创建人',
        name: 'createName',
        width: 2,
        sortable: false,
        align: 'left',
        mapping: ["createName", "createTime"],
        convert: function(v, mappval) {
          return mappval[0] + "</br><span class='gray'>" + setISO(mappval[1], "all") + "</span>";
        }
      },
      {
        display: '备注',
        name: 'remark',
        width: 1,
        sortable: false,
        align: 'center',
        dataindex: 'remark',
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
        mapping: ["status", "id"],
        convert: function(v, mappval) {
          var status = mappval[0];
          //status 0 新建未提交 1未开始 2进行中 3修改未提交  4已结束
          if (status == 0) {
            return "<span class='yellow'>新建未提交</span></br><a class='smalldarkerblueBtn' href='javascript:void(0)' ng-click='datacoupon.smt(" + mappval[1] + ")'>提交</a>";
          } else if (status == 1) {
            return "<span class='green'>生效</span></br><a class='stopUse smalldarkerblueBtn' href='javascript:void(0)' ng-click='datacoupon.disable(" + mappval[1] + ")'>禁用</a>";
          } else if (status == 2) {
            return "<span class='green'>失效</span></br><a class='stopUse smalldarkerblueBtn' href='javascript:void(0)' ng-click='datacoupon.disable(" + mappval[1] + ")'>禁用</a>";
          } else if (status == 3) {
            return "<span class='yellow'>禁用</span></br><a class='smalldarkerblueBtn' href='javascript:void(0)' ng-click='datacoupon.able(" + mappval[1] + ")'>启用</a>";
          }
        }
      },
      {
        display: '操作',
        name: 'operation',
        width: 2,
        sortable: false,
        align: 'center',
        mapping: ["status", "id", "shopName"],
        convert: function(v, mappval) {
          var status = mappval[0];
          //status 0 新建未提交 1生效 2失效 3禁用
          if (status == 0) {
            return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="datacoupon.modify(' + mappval[1] + ',\'' + mappval[2] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-click="datacoupon.del(' + mappval[1] + ')"></a>';
          } else {
            return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="datacoupon.modify(' + mappval[1] + ',\'' + mappval[2] + '\')"></a>';
          }
        }
      }],
      updateDefaultParam: true,
      sortname: "id",
      sortorder: "desc",
      rp: 20,
      usepager: true,
      useRp: true,
      showTableToggleBtn: true,
      searchitems: {
        display: '发送优惠券名称',
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
