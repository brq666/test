angular.module("campaign.controllers").controller('discountISCtrl', ["$scope", "$rootScope", "$http", "getListService", "$compile", "$q" ,function($scope, $rootScope, $http, getListService, $compile, $q) {
  $scope.openNodePop(); //调用弹框方法


  $scope.cardListDef = $q.defer();

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
  $scope.isScopeObj = {
    "viewIsDataFlag": false, // 查看数据按钮
    "showIsDataPop": function() {
      angular.element(".discountIsDataView").addInteractivePop({
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
      $('.dataInfoList').flexigrid({
        url: GLOBAL_STATIC.nodeRoot + 'node/integralsend/report/?nodeId=' + graph.nodeId + "&_=" + new Date().getTime(),
        method: 'GET',
        dataType: 'json',
        colModel: [{
          display: '客户提交时间',
          name: 'submitTime',
          width: 1,
          sortable: false,
          align: 'center',
          dataindex: 'submitTime',
          renderer: function(v) {
            return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
          }
        }, {
          display: '客户提交数',
          name: 'submitCount',
          width: 1,
          sortable: false,
          align: 'center',
          dataindex: 'submitCount',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '积分发放时间',
          name: 'sendTime',
          width: 1,
          sortable: false,
          align: 'center',
          dataindex: 'sendTime',
          renderer: function(v) {
            return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
          }
        }, {
          display: '积分发放数',
          name: 'sendIntegralNum',
          width: 1,
          sortable: false,
          align: 'center',
          dataindex: 'sendIntegralNum',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '发放成功人数',
          name: 'successCount',
          width: 1,
          sortable: false,
          align: 'center',
          dataindex: 'successCount',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '发放失败人数',
          name: 'errorCount',
          width: 1,
          sortable: false,
          align: 'center',
          dataindex: 'errorCount',
          renderer: function(v) {
            return v ? v : 0;
          }
        }, {
          display: '导出明细',
          name: 'detail',
          width: 1,
          align: 'center',
          dataindex: 'detail',
          mapping: ['detail'],
          convert: function(v, mappVal) {
            var href = '{{appOrigin}}/node/v1/web/node/integralsend/download/?fileName=' + v;
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
        colAutoWidth: true,
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
    "name": "积分发放",
    "fillData": function() {
      var _this = this;
      getListService.openDiscountIs(function(response) {
        _this.name = response.name || "积分发放";
        _this.id = response.id || "";
        $scope.nodecomment = response.remark || "";
        _this.testNumber = response.number;
        _this.targetClient = response.output ? response.output : "ONLY_SUCCESS";
        _this.description = response.desc || "";
        _this.viewIsDataFlag = response.hasReport;
        _this.ctyId = response.ctyId;
        _this.ctyName = response.ctyName;
        _this.discountTypeView = response.view || "";
        _this.integralTypeId = response.integralTypeId;
        $q.all($scope.cardListDef).then(function(){
          var cardTypeList = $scope.cardTypeList;
          if(!response.ctyId) {
            _this.ctyId = cardTypeList[0].ctyId;
            _this.ctyName = cardTypeList[0].ctyName;
            _this.shopId = cardTypeList[0].shopId;
            _this.discountTypeView = cardTypeList[0].pointName;
            _this.integralTypeId = cardTypeList[0].pointTypeId;
          } else {
            angular.forEach(cardTypeList, function(val, key) {
              if(val.ctyId == _this.ctyId) {
                _this.shopId = val.shopId;
              }
            })
          }
        });
        _this.poolType = response.poolType;
      });

      getListService.getNodeTipsByType(function(response) { // 获取tips
        $scope.isScopeObj.tips = response.tips || "";
      }, "tdiscountIS");
    },
    "getEditorData": function() {
      var _this = this;
      var discountIsData = {
        "id": graph.nodeId,
        "name": _this.name || "",
        "remark": $scope.nodecomment || "",
        "number": (_this.testNumber * 1) || "",
        "output": _this.targetClient,
        "ctyId": (angular.element("[name='discountCard']").attr("valueId")) * 1,
        "ctyName": angular.element("[name='discountCard']").val(),
        "desc": _this.description,
        "shopId": _this.shopId,
        "integralTypeId": _this.integralTypeId,
        "integralTypeName": _this.discountTypeView,
        "poolType": _this.poolType
      };
      return discountIsData;
    },
    "postDiscountIs": function(ent) {
      var _this = this;
      if ($scope.isScopeObj.name == "") {
        return false;
      };
      if (!(angular.element("[name='discountCard']").attr("valueId"))) {
        $scope.ctyIdFlag = true;
        return null;
      } else {
        $scope.ctyIdFlag = false;
      };

      if ($scope.isScopeObj.integralTypeId == null) {
        $(this).Alert({
          "title": "保存失败",
          "str": "失败原因：选择的店铺没有配置积分类型",
          "mark": true,
          "width": "260px",
          "eleZindex": 1010,
          "markZindex": 1005
        });
        return false;
      }

      if (!_this.testNumber) {
        $scope.testAccountFormatError = true;
      };

      if ($scope.testAccountFormatError || $scope.beizhuError) {
        return null;
      }

      if (!_this.description) {
        $scope.beizhuError = true;
        _this.beizhuDesc = "请填写备注内容"
        return null;
      } else {
        $scope.beizhuError = false;
      }
      var element = angular.element(ent.target);
      disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
        getListService.postDiscountIs(function(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          element.closest("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName(response.id, response.name, $scope.nodecomment);
        }, $scope.isScopeObj.getEditorData(), element);
      }, element);
    },
    "getCardTypeList": function() {
      $q.all($scope.cardListDef).then(function() {
        var cardTypeList = $scope.cardTypeList;
        $scope.isScopeObj.common(cardTypeList, $('[name="discountCard"]'));
      });
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
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].couponId + '>' + data[i].couponName + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          } else if (eleName == "discountCard") {
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].ctyId + '>' + data[i].ctyName + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          }
        }
        $ul.find("a").bind({
          "click": function() {
            var elementIndex = $ul.find("li").index($(this).closest("li"));
            ele.val($(this).text());
            ele.attr("valueId", $(this).attr("id"));
            $selContent.slideUp(200);
            if (angular.element("[name='discountCard']").attr("valueId")) {
              $scope.$apply(function() {
                $scope.isScopeObj.discountStatus = false;
              });
            } else {
              $scope.$apply(function() {
                $scope.isScopeObj.discountStatus = true;
              });
            };

            if (eleName == "discountCard") {
              angular.element("[name='shopCoupon']").attr("valueId", "").val("");
              $scope.$apply(function() {
                $scope.isScopeObj.ctyId = ele.attr("valueId");
                $scope.ctyIdFlag = false;
                $scope.isScopeObj.integralTypeId = data[elementIndex].pointTypeId;
                //$scope.isScopeObj.poolType = data[elementIndex].poolType;
                $scope.isScopeObj.discountTypeView = data[elementIndex].pointName;
                $scope.isScopeObj.shopId = data[elementIndex].shopId;
              })
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
    },
    "beizhuDesc": "请填写备注内容",
    "blurMethod": function(callBack) {
      var _this = this;
      if (_this.description) {
        $scope.beizhuError = false;
        /*getListService.validateMarkCheck(function(response) {
          if (response == "false") {
            _this.beizhuDesc = "备注中含有敏感词"
            $scope.beizhuError = true;
          } else {
            if (callBack) {
              callBack()
            };
          }
        }, _this.shopId, _this.description);*/
      } else {
        _this.beizhuDesc = "请填写备注内容"
        $scope.beizhuError = true;
      }
    },
    "beizhuFocus": function() {
      $scope.beizhuError = false;
    }
  };

  getListService.getCardTypeList(function(data) {
    $scope.cardTypeList = data;
    $scope.cardListDef.resolve();
  });
  $scope.isScopeObj.fillData();
  disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();


  $scope.$watch("isScopeObj.testNumber", function(n, o) {
    if (n == undefined) {
      return false;
    };
    var testTestAccountReg = /^0\d*|\D/gi;
    if (testTestAccountReg.test(n) || (n * 1 > 99999) || !n) {
      $scope.testAccountFormatError = true;
    } else {
      $scope.testAccountFormatError = false;
    }
  })
}])
