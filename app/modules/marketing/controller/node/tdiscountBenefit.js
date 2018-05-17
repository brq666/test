angular.module("campaign.controllers").controller('discountBenefitCtrl', ["$scope", "$rootScope", "$http", "getListService", "$compile", "$filter", "$q",function ($scope, $rootScope, $http, getListService, $compile, $filter, $q) {
  $scope.openNodePop(); //调用弹框方法
  getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
    if (response.subjobStatus >= 19) {
      $scope.benefitScopeObj.viewBenefitDataFlag = true;
    }
  }, graph.nodeId, graph.campJobid);

  $scope.ngBlackAble = false;
  var whileaAndBlackProm = "";

  //自定义表格
  $scope.gridObj = {
    "modelSrc": "", // 客户订单查询 修改属性模板入口
    "customerNo": "",
    "curAttrId": "",
    "showConfigAttrSrc": "",
    "addCustomAttrPage": true,
    "customList": "",
    "customVal": "",
    "girdElement": angular.element(".dataInfoListBenfit")[0],
    //编译模板
    "upCompile": function(curScope) {
      $compile(angular.element(".dataInfoListBenfit"))($scope || curScope);
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    },
    /*"itemdown": function(jobId) {
      getListService.getCouponDownLoad(function(response) {}, graph.campId, graph.nodeId, jobId)
    }*/ //这个暂时没有用处待删除
  }
  $scope.benefitScopeObj = {
    "viewBenefitDataFlag": false, // 查看数据按钮
    "blacklistTip": "",
    "showBenefitDataPop": function() {
      angular.element(".discountBenefitDataView").addInteractivePop({
        magTitle: "发送报告",
        width: 842,
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
      getListService.senderBenefitSummary(function(response){
        $scope.submitNumTotal = response.submitNumTotal;
        $scope.successNumTotal = response.successNumTotal;
        $scope.failNumTotal = response.failNumTotal;
      });
      $('.dataInfoGridBenfit').flexigrid({
        url: GLOBAL_STATIC.nodeRoot + 'report/sender/benefit/list?campId=' + graph.campId + '&nodeId=' + graph.nodeId,
        method: 'GET',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: [{
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
        },{
          display: '发送时间',
          name: 'updated',
          width: 150,
          sortable: false,
          align: 'center',
          dataindex: 'updated',
          renderer: function(v){
            return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>";
          }
        }, {
          display: '成功人数',
          name: 'successNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'successNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '失败人数',
          name: 'failNum',
          width: 100,
          sortable: false,
          align: 'right',
          dataindex: 'failNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        },{
          display: '详情下载',
          name: 'enable',
          width: 100,
          align: 'left',
          dataindex: 'enabled',
          mapping: ['jobId'],
          convert: function(v, mappVal) {
            var href = '{{appOrigin}}/node/v1/web/report/sender/benefit/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + graph.nodeId;
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
          var scope = angular.element('.dataInfoListBenfit').scope();
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
    "name": "支付宝红包",
    "fillData": function() {
      var _this = this;
      getListService.openDiscountBenefit(function(response) {
        _this.name = response.name || "支付宝红包";
        _this.id = response.id || "";
        $scope.nodecomment = response.remark || "";
        _this.testAccount = response.testUsers || "";
        _this.targetClient = response.outputType ? String(response.outputType) : "0";
        _this.discountCurShop = response.shopName || "";
        _this.discountCurShopId = response.shopId || "";
        _this.discountCurShopRealId = response.shopIdReal || "";
        _this.discountCurActivityName = response.activityName || "";
        _this.discountCurAelationId = response.relationId || "";
        _this.discountStatus = response.relationId ? false : true;
        _this.blacklist = response.blacklist;
        $scope.discountUsedStatus = response.useable; //这个应该没有用处待删除
        var msg = "";
        if (response.blacklist.customer.length > 0) {
          if(response.blacklist.customer.length === 1) {
            msg += response.blacklist.customer[0].name;
          } else {
            msg += response.blacklist.customer.length + "个客户黑名单组";
          }
          if (msg != "") {
            $scope.benefitScopeObj.blacklistTip = "选择了" + msg;
          } else {
            $scope.benefitScopeObj.blacklistTip = "";
          }

        } else if (response.blacklist.customer.length === 0 && !_this.discountCurShop) {
          $q.when(whileaAndBlackProm).then(function() {
            console.timeEnd('start')
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
              if (msg != "") {
                $scope.benefitScopeObj.blacklistTip = "选择了" + msg;
              } else {
                $scope.benefitScopeObj.blacklistTip = "";
              }
            }
          });
        }
      });

      getListService.getNodeTipsByType(function(responseTips) { // 获取tips
        _this.tips = responseTips.tips || "";
      }, "tdiscountBenefit"); //这里把Ec改成Benefit不知道会不会有什么影响
      $scope.benefitScopeObj.getDiscountShops()
    },
    "getEditorData": function() {  //需要传给后台的数据点
      var _this = this;
      var discountBenefitData = {
        "id": graph.nodeId,
        "name": _this.name || "",
        "remark": $scope.nodecomment || "",
        "relationId": Number(angular.element("[name='shopBenefit']").attr("valueId")),
        "shopId":Number(angular.element("[name='discountShop']").attr("realId")),
        "shopIdReal":Number(angular.element("[name='discountShop']").attr("realId")),
        "testUsers": _this.testAccount || "",
        "blacklist": _this.blacklist,
        "outputType": Number(_this.targetClient)
      };
      return discountBenefitData;
    },
    "postDiscountBenefitData": function(ent) {
      if ($scope.benefitScopeObj.name == "") {
        return false;
      };
      if (!(angular.element("[name='discountShop']").attr("valueId"))) {
        $scope.discountBenefitShopFlag = true;
        return null;
      } else {
        $scope.discountBenefitShopFlag = false;
      };

      if(!(angular.element("[name='shopBenefit']").attr("valueId"))){
        $(this).Alert({"title":"提示","str":"需要选择支付宝活动","mark":true});
        return false;
      }
      /*if (!(angular.element("[name='shopBenefit']").attr("valueId"))) {  //判断支付宝活动的问题待删除
        $scope.discountCouponFlag = true;
        return null;
      } else {
        $scope.discountCouponFlag = false;
      };*/
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
        getListService.postDiscountBenefitData(function(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          element.closest("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName(response.id, response.name, $scope.nodecomment);
        }, $scope.benefitScopeObj.getEditorData(), element);
      }, element);
    },
    "getDiscountShops": function() {
      _this = this;
      getListService.getShopsByPlatformId(function(data) {
        // if( data.length > 0 && !_this.discountCurShop ){  // 由于隐藏了店铺选择框, 默认选中第一个, 后期需要调整逻辑
        //   _this.discountCurShop = data[0].name;
        //   _this.discountCurShopId = data[0].idInPlat;
        //   $scope.benefitScopeObj.discountStatus = false;
        // }
        $scope.benefitScopeObj.common(data, $('[name="discountShop"]'));
      }, $rootScope.taobaoSegmentationId);
    },
    "getDiscountActivities": function() {
      if (!this.discountStatus) {
        getListService.getBenefitActivity(function(data) {
          $scope.benefitScopeObj.common(data, $('[name="shopBenefit"]'));
        }, $('[name="discountShop"]').attr("realId"));
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
          } else if (eleName == "shopBenefit") {
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].relationId + ' status=' + data[i].useable + '>' + data[i].activityName + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          } else if (eleName == "discountShop") {
            $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].idInPlat + ' realId=' + data[i].id + '>' + data[i].name + '</a></li>');
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
                $scope.benefitScopeObj.discountStatus = false;
              });
            } else {
              $scope.$apply(function() {
                $scope.benefitScopeObj.discountStatus = true;
              });
            };

            if (eleName == "discountShop") {
              ele.attr("realId", $(this).attr("realId"));
              angular.element("[name='shopBenefit']").attr("valueId", "").val("");
              /*$scope.$apply(function() {  //判断优惠券有没有效果的 待删除
                $scope.discountUsedStatus = true;
              });*/
            } /*else if (eleName == "shopBenefit") { //判断优惠券有没有效果的 待删除
              var curUsedStatus = $(this).attr("status");
              $scope.$apply(function() {
                $scope.discountUsedStatus = curUsedStatus == "false" ? false : true;
              });
            };*/
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
  whileaAndBlackProm = $scope.getWhiteAndBlackList();

  $scope.benefitScopeObj.fillData();
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
      $scope.benefitScopeObj.blacklist = {};
      $scope.benefitScopeObj.blacklist.customer = [];
      $(".groupList .ALLGroupContent li.cur").each(function() {
        switch ($(this).attr("var")) {
          case "BLACK":
            $scope.benefitScopeObj.blacklist.customer.push({
              "id": $(this).data("id"),
              "name": $(this).data("name")
            });
            break;
          case "EMAIL":
            $scope.benefitScopeObj.blacklist.email.push({
              "id": $(this).data("id"),
              "name": $(this).data("name")
            });
            break;
        }
      })
      var msg = "";
      if ($scope.benefitScopeObj.blacklist.customer.length > 0) {
        if($scope.benefitScopeObj.blacklist.customer.length === 1) {
          msg += $scope.benefitScopeObj.blacklist.customer[0].name;
        } else {
          msg += $scope.benefitScopeObj.blacklist.customer.length + "个客户黑名单组,";
        }
      }
      if (msg.lastIndexOf(",") == msg.length - 1) {
        msg = msg.substr(0, msg.length - 1);
      }
      if (msg != "") {
        $scope.benefitScopeObj.blacklistTip = "选择了" + msg;
      } else {
        $scope.benefitScopeObj.blacklistTip = "";
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
      $scope.benefitScopeObj.blacklist.customer.forEach(function (value, key) {
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
      var lengthDefaultBlack = $scope.benefitScopeObj.blacklist.customer.length;
      if (lengthDefaultBlack == lengthBlack) {
          $("#BLACK").attr("checked", "checked");
          $("#ALL").attr("checked", "checked");
      } else {
          $("#BLACK").removeAttr("checked");
          $("#ALL").removeAttr("checked");
      }
  }


  $scope.$watch("benefitScopeObj.testAccount", function(n, o) {
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

  /*$scope.$watch("discountUsedStatus", function(newVal) { //监听优惠券状态 待删除
    if (newVal === false) {
      $scope.discountCouponFlag = true;
      $scope.discountErrorValue = "优惠券已经失效";
    } else {
      $scope.discountCouponFlag = false;
      $scope.discountErrorValue = "请选择优惠券";
    }
  })*/
}]);
