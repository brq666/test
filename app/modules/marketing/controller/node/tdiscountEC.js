angular.module("campaign.controllers").controller('discountECCtrl', ["$scope", "$rootScope", "$http", "getListService", "$compile", "$filter", "$q", function($scope, $rootScope, $http, getListService, $compile, $filter, $q) {
  $scope.openNodePop(); //调用弹框方法
  getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
    if (response.subjobStatus >20) {
      $scope.ecScopeObj.viewEcDataFlag = true;
    }
  }, graph.nodeId, graph.campJobid);

  $scope.ngBlackAble = false;
  var whiteAndBlackListProm = "";
  //自定义表格
  $scope.gridObj = {
    "modelSrc": "", // 客户订单查询 修改属性模板入口
    "customerNo": "",
    "curAttrId": "",
    "showConfigAttrSrc": "",
    "addCustomAttrPage": true,
    "customList": "",
    "customVal": "",
    "girdElement": angular.element(".dataInfoList")[0],
    //编译模板
    "upCompile": function(curScope) {
      $compile(angular.element(".dataInfoList"))($scope || curScope);
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    },
    "itemdown": function(jobId) {
      getListService.getCouponDownLoad(function(response) {}, graph.campId, graph.nodeId, jobId)
    }
  }
  $scope.ecScopeObj = {
    "viewEcDataFlag": false, // 查看数据按钮
    "blacklistTip": "",
    "showEcDataPop": function() {
      angular.element(".discountEcDataView").addInteractivePop({
        magTitle: "发送报告",
        width: 1100,
        mark: false,
        position: "fixed",
        childElePop: true
      });
      var reportDataParams = {
        "campId": graph.campId || "",
        "jobId": graph.campJobid || "",
        "nodeId": Number(graph.nodeId) || ""
      };
      /*getListService.getUmpDataResult(reportDataParams,function(response){
       $scope.targetDataListsVal=response||[];
       $scope.autoWidth=(100/7)+"%";
       });*/

      getListService.senderCouponSummary(function(response){
        $scope.submitNumTotal = response.submitNumTotal;
        $scope.successNumTotal = response.successNumTotal;
        $scope.failNumTotal = response.failNumTotal;
        $scope.unKnownNumTotal = response.unKnownNumTotal;
        $scope.usingNumTotal = response.usingNumTotal;
        $scope.usedNumTotal = response.usedNumTotal;
        $scope.unUsedNumTotal = response.unUsedNumTotal;
      });
      $('.dataInfoGrid').flexigrid({
        url: GLOBAL_STATIC.nodeRoot + 'report/sender/coupon/list?campId=' + graph.campId + '&nodeId=' + graph.nodeId,
        method: 'GET',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: [{
          display: '优惠券ID',
          name: 'couponId',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'couponId'
        }, {
          display: '客户提交时间',
          name: 'submitTime',
          width: 150,
          sortable: false,
          align: 'center',
          dataindex: 'submitTime',
          renderer: function(v) {
            return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>";
          }
        }, {
          display: '客户提交数',
          name: 'submitNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'submitNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '发送成功数',
          name: 'successNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'successNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '发送失败数',
          name: 'failNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'failNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '状态未知数',
          name: 'unknownNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'unknownNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '已使用人数',
          name: 'usedNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'usedNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '未使用人数',
          name: 'unUsedNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'unUsedNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '使用中人数',
          name: 'usingNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'usingNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '更新时间',
          name: 'updated',
          width: 150,
          sortable: false,
          align: 'center',
          dataindex: 'updated',
          renderer: function(v) {
            return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>";
          }
        }, {
          display: '导出明细',
          name: 'enable',
          width: 100,
          align: 'left',
          dataindex: 'enabled',
          mapping: ['jobId'],
          convert: function(v, mappVal) {
            var href = '/node/v1/web/report/sender/coupon/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + graph.nodeId;
            return '<a title="下载" target="_blank"  ng-href="' + href + '">下载</a>';
          }
        }],
        /* params: campListParams,*/
        sortname: "",
        updateDefaultParam: true,
        sortorder: "desc",
        buttons: [],
        usepager: true,
        useRp: true,
        rp: 20,
        showTableToggleBtn: true,
        colAutoWidth: false,
        onSuccess: function() {
          var scope = angular.element('.dataInfoList').scope();
          scope.gridObj.upCompile(scope);

        },
        onError: function(data, status, headers, config) {
          $(this).Alert({
            "title": data.message,
            "str": data.description,
            "mark": true
          });
        }
      });
    },
    "toNormalTime": function(str) { // 转化时间
      return setISO(str, "all");
    },
    "name": "店铺优惠券",
    "fillData": function() {
      var _this = this;
      getListService.openDiscountEc(function(response) {
        _this.name = response.name || "店铺优惠券";
        _this.id = response.id || "";
        $scope.nodecomment = response.remark || "";
        _this.testAccount = response.testUsers || "";
        _this.targetClient = response.outputType ? String(response.outputType) : "0";
        _this.discountCurShop = response.shopName || "";
        _this.discountCurShopId = response.shopId || "";
        _this.discountCurCouponName = response.couponName || "";
        _this.discountCurCouponId = response.couponId || "";
        _this.discountStatus = false; //response.couponId ? false : true;
        _this.blacklist = response.blacklist;
        $scope.discountUsedStatus = response.useable;
        var msg = "";
        if (response.blacklist.customer.length > 0) {
          if(response.blacklist.customer.length === 1) {
            msg += response.blacklist.customer[0].name;
          } else {
            msg += response.blacklist.customer.length + "个客户黑名单组";
          }
          if (msg != "") {
            $scope.ecScopeObj.blacklistTip = "选择了" + msg;
          } else {
            $scope.ecScopeObj.blacklistTip = "";
          }

        } else if (response.blacklist.customer.length === 0 && !_this.discountCurShop) {
          $q.when(whiteAndBlackListProm).then(function() {
            $scope.WhiteAndBlackList.forEach(function(item) {
              if(item.groupType === "BLACK") {
                _this.blacklist.customer.push({
                  'name':item.groupName,
                  'id': item.groupId
                });
              }
            });
            if ( _this.blacklist.customer.length > 0) {
              if(_this.blacklist.customer.length === 1) {
                msg += _this.blacklist.customer[0].name;
              } else {
                msg += _this.blacklist.customer.length + "个客户黑名单组";
              }
              $scope.ecScopeObj.blacklistTip = "选择了" + msg;
            }
          });
        }
        $scope.ecScopeObj.getDiscountShops()
      });

      getListService.getNodeTipsByType(function(responseTips) { // 获取tips
        _this.tips = responseTips.tips || "";
      }, "tdiscountEC");
    },
    "getEditorData": function() {
      var _this = this;
      var discountEcData = {
        "id": graph.nodeId,
        "name": _this.name || "",
        "remark": $scope.nodecomment || "",
        "couponId": Number(angular.element("[name='shopCoupon']").attr("valueId")),
        "testUsers": _this.testAccount || "",
        "blacklist": _this.blacklist,
        "outputType": Number(_this.targetClient)
      };
      return discountEcData;
    },
    "postDiscountEcData": function(ent) {
      if ($scope.ecScopeObj.name == "") {
        return false;
      };
      if (!(angular.element("[name='discountShop']").attr("valueId"))) {
        $scope.discountEcShopFlag = true;
        return null;
      } else {
        $scope.discountEcShopFlag = false;
      };
      if (!(angular.element("[name='shopCoupon']").attr("valueId")) || ($scope.discountCouponFlag && $scope.discountErrorValue == "优惠券已经失效")) {
        $scope.discountCouponFlag = true;
        return null;
      } else {
        $scope.discountCouponFlag = false;
      };
      if (this.testAccount && (this.testAccount.split(",").length) > 20) {
        $scope.testAccountError = true;
        return null;
      } else {
        $scope.testAccountError = false;
      }
      if ($scope.testAccountFormatError) {
        return null;
      }
      var element = angular.element(ent.target);

      disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
        getListService.postDiscountData(function(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          element.closest("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName(response.id, response.name, $scope.nodecomment);
        }, $scope.ecScopeObj.getEditorData(), element);
      }, element);
    },
    "getDiscountShops": function() {
      _this = this;
      getListService.getShopsByPlatformId(function(data) {
        if(data.length > 0 && !_this.discountCurShop){ // 由于隐藏了店铺选择框, 默认选中第一个, 后期需要调整逻辑
          _this.discountCurShop = data[0].name;
          _this.discountCurShopId = data[0].id;
          $scope.ecScopeObj.discountStatus = false;
        }
        $scope.ecScopeObj.common(data, $('[name="discountShop"]'));
      }, $rootScope.taobaoSegmentationId);
    },
    "getDiscountCoupons": function() {
      if (!this.discountStatus) {
        getListService.getCoupons(function(data) {
          $scope.ecScopeObj.common(data, $('[name="shopCoupon"]'));
        }, $('[name="discountShop"]').attr("valueId"));
      }
    },
    "common": function(data, ele) { //模拟普通的select框
      var $selContent = ele.next(".selectContent:first");
      $selContent.children().remove();
      var eleName = ele.attr("name");
      var $ul = $("<ul>");
      if (data) {
        $selContent.append($ul);
        var len = data.length;
        for (var i = 0; i < len; i++) {
          if (eleName == "useHdInput") {
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].umpId + '>' + data[i].umpName + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          } else if (eleName == "shopCoupon") {
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].couponId + ' status=' + data[i].useable + '>' + data[i].couponName + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          } else if (eleName == "discountShop") {
            $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].id + '>' + data[i].name + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          }

        }
        $ul.find("a").bind({
          "click": function() {
            ele.val($(this).text());
            ele.attr("valueId", $(this).attr("id"));
            $selContent.slideUp(200);
            if (angular.element("[name='discountShop']").attr("valueId")) {
              $scope.$apply(function() {
                $scope.ecScopeObj.discountStatus = false;
              });
            } else {
              $scope.$apply(function() {
                $scope.ecScopeObj.discountStatus = true;
              });
            };

            if (eleName == "discountShop") {
              angular.element("[name='shopCoupon']").attr("valueId", "").val("");
              $scope.$apply(function() {
                $scope.discountUsedStatus = true;
              });
            } else if (eleName == "shopCoupon") {
              var curUsedStatus = $(this).attr("status");
              $scope.$apply(function() {
                $scope.discountUsedStatus = curUsedStatus == "false" ? false : true;
              });
            };
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

  $scope.getWhiteAndBlackList = function () {
      var callback = function (data) {
          $scope.WhiteAndBlackList = data;
          $scope.ngRedAble = false;
          $scope.ngBlackAble = false;
      }
      var callback2 = function (data) {
          $scope.ngRedAble = true;
          $scope.ngBlackAble = true;
      }
    return getListService.getWhiteAndBlackList(callback, $scope.WhiteAndBlackList, callback2);
  }
  whiteAndBlackListProm = $scope.getWhiteAndBlackList();

  $scope.ecScopeObj.fillData();
  disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

  $scope.groupPop = {
    "openGroupPop": function(type) {
      $scope.groupType = type;

      checkSelectByData();
      $(".groupList li").die("click").live("click", function() {
        $(this).toggleClass("cur");
        checkSelectByClick();
      });

      if ($scope.groupType == "WHITE") {
        $(".WHITEGroupContent").show();
        $(".ALLGroupContent").hide();
        $(".groupList").addInteractivePop({
          magTitle: "选择红名单",
          mark: false,
          position: "fixed",
          childElePop: true
        });
      } else {
        $(".WHITEGroupContent").hide();
        $(".ALLGroupContent").show();
        $(".groupList").addInteractivePop({
          magTitle: "选择黑名单",
          mark: false,
          position: "fixed",
          childElePop: true
        });
      }
    },
    //复选框
    "change": function(e, type) {
      if (e.target.checked) {
        if (e.target.id == "ALL") {
          $(".groupList .ALLGroupContent li").each(function() {
            $(this).addClass("cur")
          })
          $("#BLACK").attr("checked", true);
          $("#EMAIL").attr("checked", "checked");
        } else {
          $(".groupList ." + e.target.id + " li").each(function() {
            $(this).addClass("cur")
          })
          if ($(".groupList .ALLGroupContent li").length == $(".groupList .ALLGroupContent li.cur").length) {
            $("#ALL").attr("checked", "checked");
          }
        }

      } else {
        if (e.target.id == "ALL") {
          $(".groupList .ALLGroupContent li").each(function() {
            $(this).removeClass("cur")
          })
          $("#BLACK").removeAttr("checked");
          $("#EMAIL").removeAttr("checked");
        } else {
          $(".groupList ." + e.target.id + " li").each(function() {
            $(this).removeClass("cur")
          })
          if ($(".groupList .ALLGroupContent .cur").length != $(".groupList .ALLGroupContent li").length) {
            $("#ALL").removeAttr("checked");
          }
        }
      }
    },
    //保存选定的分组
    "save": function() {
      $scope.ecScopeObj.blacklist = {};
      $scope.ecScopeObj.blacklist.customer = [];
      $(".groupList .ALLGroupContent li.cur").each(function() {
        switch ($(this).attr("var")) {
          case "BLACK":
            $scope.ecScopeObj.blacklist.customer.push({
              "id": $(this).data("id"),
              "name": $(this).data("name")
            });
            break;
          case "EMAIL":
            $scope.ecScopeObj.blacklist.email.push({
              "id": $(this).data("id"),
              "name": $(this).data("name")
            });
            break;
        }
      })
      var msg = "";
      if ($scope.ecScopeObj.blacklist.customer.length > 0) {
        if($scope.ecScopeObj.blacklist.customer.length === 1) {
          msg += $scope.ecScopeObj.blacklist.customer[0].name;
        } else {
          msg += $scope.ecScopeObj.blacklist.customer.length + "个客户黑名单组,";
        }
      }
      if (msg.lastIndexOf(",") == msg.length - 1) {
        msg = msg.substr(0, msg.length - 1);
      }
      if (msg != "") {
        $scope.ecScopeObj.blacklistTip = "选择了" + msg;
      } else {
        $scope.ecScopeObj.blacklistTip = "";
      }
      $(".groupList").hide();
      $(".childElementMark").remove();

    }
  }

  function checkSelectByClick() {
      if ($(".groupList .BLACK li.cur").length == $(".groupList .BLACK li").length && $(".groupList .BLACK li").length > 0) {
          $("#BLACK").attr("checked", "checked");
      } else {
          $("#BLACK").removeAttr("checked");
      }
  }

  function checkSelectByData() {
      //初始化列表选中状态
      $scope.defaultIds = [];
      $scope.ecScopeObj.blacklist.customer.forEach(function (value, key) {
          $scope.defaultIds.push(value.id);
      })
      $(".groupList li").each(function (i) {
          $(".groupList li").eq(i).removeClass("cur");
          $scope.defaultIds.forEach(function (v, k) {
              if ($(".groupList li").eq(i).data("id") == v) {
                  $(".groupList li").eq(i).addClass("cur");
              }
          })
      })
      //初始化复选框状态
      var length = $filter('GroupByType')($scope.WhiteAndBlackList, 'WHITE').length;
      var lengthBlack = $filter('GroupByType')($scope.WhiteAndBlackList, 'BLACK').length;
      var lengthDefaultBlack = $scope.ecScopeObj.blacklist.customer.length;
      if (lengthDefaultBlack == lengthBlack) {
          $("#BLACK").attr("checked", "checked");
          $("#ALL").attr("checked", "checked");
      } else {
          $("#BLACK").removeAttr("checked");
          $("#ALL").removeAttr("checked");
      }
  }


  $scope.$watch("ecScopeObj.testAccount", function(n, o) {
    if (n == undefined) {
      return false;
    };
    var testTestAccountReg = /[^\u4e00-\u9fa5a-zA-Z0-9_,]/gi;
    if (testTestAccountReg.test(n) || (n && !n.replace(/,/g, ''))) {
      $scope.testAccountFormatError = true;
    } else {
      $scope.testAccountFormatError = false;
    }
  });

  $scope.$watch("discountUsedStatus", function(newVal) { //监听优惠券状态
    if (newVal === false) {
      $scope.discountCouponFlag = true;
      $scope.discountErrorValue = "优惠券已经失效";
    } else {
      $scope.discountCouponFlag = false;
      $scope.discountErrorValue = "请选择优惠券";
    }
  })
}])
