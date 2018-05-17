angular.module("campaign.controllers").controller('discountUMPCtrl', ['$scope', '$rootScope', '$http', 'getListService', '$parse', '$compile',
  function($scope, $rootScope, $http, getListService, $parse, $compile) {
    $scope.openNodePop(); //调用弹框方法
    getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
      if (response.subjobStatus > 20) {
        $scope.umpScopeObj.viewUmpDataFlag = true;
      }
    }, graph.nodeId, graph.campJobid);

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
      "girdElement": angular.element(".dataInfoList")[0],
      //编译模板
      "upCompile": function(curScope) {
        $compile(angular.element(".dataInfoList"))($scope || curScope);
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      },
      "itemdown": function(jobId) {
        getListService.getUpmDownLoad(function(response) {},
            graph.campId, graph.nodeId, jobId)
      }
    }

    $scope.discountUmpFlag = false;
    $scope.umpScopeObj = {
      "isEditorFlag": (!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8),//节点是否可编辑，确定按钮是否显示,,
      "viewUmpDataFlag": false,
      // 查看数据按钮*/
      "showDataUmpPop": function() {
        $(".discountUmpDataView").addInteractivePop({
          magTitle: "发送报告",
          width: 900,
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
        getListService.senderUMPSummary(function(response){
          $scope.submitNumTotal = response.submitNumTotal;
          $scope.successNumTotal = response.successNumTotal;
          $scope.failNumTotal = response.failNumTotal;
        });
        $('.dataInfoGrid').flexigrid({
          url: GLOBAL_STATIC.nodeRoot + 'report/sender/ump/list?campId=' + graph.campId + '&jobId=' + graph.campJobid + '&nodeId=' + graph.nodeId,
          method: 'GET',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          colModel: [

            {
              display: '定向优惠名称',
              name: 'umpName',
              width: 100,
              sortable: false,
              align: 'left',
              dataindex: 'umpName'
            },

            {
              display: '客户提交时间',
              name: 'submitTime',
              width: 150,
              sortable: false,
              align: 'center',
              dataindex: 'submitTime',
              renderer: function(v) {
                return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "' >" + setISO(v, "all") + "</span>";
              }
            },
            {
              display: '客户提交数',
              name: 'submitNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'submitNum',
              renderer: function(v) {
                return v ? v: 0;
              }
            },
            {
              display: '发送成功数',
              name: 'successNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'successNum',
              renderer: function(v) {
                return v ? v: 0;
              }
            },
            {
              display: '发送失败数',
              name: 'failNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'failNum',
              renderer: function(v) {
                return v ? v: 0;
              }
            },
            {
              display: '更新时间',
              name: 'updated',
              width: 150,
              sortable: false,
              align: 'center',
              dataindex: 'updated',
              renderer: function(v) {
                return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>";
              }
            },
            {
              display: '导出明细',
              name: 'enable',
              width: 100,
              align: 'left',
              dataindex: 'enabled',
              mapping: ['jobId'],
              convert: function(v, mappVal) {
                var href = '/node/v1/web/report/sender/ump/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + graph.nodeId;
                return '<a title="下载"  ng-href="' + href + '">下载</a>';
              }
            }],
          /* params: campListParams,*/
          updateDefaultParam: true,
          sortname: "",
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
            var responseText = data.responseText;
            var data = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        });
      },
      "toNormalTime": function(str) { // 转化时间
        return setISO(str, "all");
      },
      "name": "定向优惠卡",
      "fillData": function() {
        var _this = this;
        getListService.openDiscountUmp(function(response) {
          _this.name = response.name || "定向优惠卡";
          _this.id = response.id || "";
          $scope.nodecomment = response.remark || "";
          _this.testAccount = response.testUsers || "";
          _this.targetClient = response.outputType ? String(response.outputType) : "0";
          _this.discountCurShop = response.shopName || "";
          _this.discountCurShopId = response.shopId == 0 ? 0 : (response.shopId || "");
          if (response.nodeUmpType) { // 优惠类型
            _this.curUmpTypeValue = response.nodeUmpType.value == 0 ? 0 : (response.nodeUmpType.value || "");
            _this.curUmpTypeName = response.nodeUmpType.name || "";
          }

          // 优惠名称
          _this.useHdNameId = response.umpId == 0 ? 0 : (response.umpId || "");
          _this.useHdName = response.umpName || "";
          _this.useHdInputFlag = (_this.discountCurShop && _this.curUmpTypeValue) || (_this.curUmpTypeValue == 0) ? false: true;

          // isEditorUmpflag 是否是编辑
          $scope.umpScopeObj.isEditorUmpflag = _this.discountCurShopId ? true: false
        });

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "tdiscountUMP");
        $scope.umpScopeObj.getDiscountShops();
      },
      "getEditorUmpData": function() {
        var _this = this;
        var discountUmpData = {
          "id": Number(graph.nodeId),
          "name": _this.name || "",
          "remark": $scope.nodecomment || "",
          "umpId": Number(angular.element("[name='useHdInput']").attr("valueId")),
          "testUsers": _this.testAccount || "",
          "outputType": Number(_this.targetClient)
        };
        return discountUmpData;
      },
      "postDiscountUmpData": function(ent) {
        var postUmpObj = $scope.umpScopeObj.getEditorUmpData();
        var responseCallback = function(callbackData) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          element.closest("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName(callbackData.id, callbackData.name, $scope.nodecomment);
        };
        if ($scope.umpScopeObj.name == "" || $scope.umpScopeObj.isEditorFlag) {
          return false;
        };
        if (! (angular.element("[name='discountShop']").attr("valueId"))) {
          $scope.discountUmpShopFlag = true;
          return null;
        } else {
          $scope.discountUmpShopFlag = false;
        };
        if (!angular.element("[name='discountType']").attr("valueId")) {
          $scope.discountUmpFlag = true;
          $scope.umpErrorMark = "请选择优惠类型";
          return null;
        } else if (!angular.element("[name='useHdInput']").attr("valueId")) {
          $scope.discountUmpFlag = true;
          $scope.umpErrorMark = "请选择优惠名称";
          return null;
        } else {
          $scope.umpErrorMark = "";
          $scope.discountUmpFlag = false;
        };
        if ($scope.testUmpAccountFormatError) {
          return null;
        };
        var element = angular.element(ent.target);

        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          if (!$scope.umpScopeObj.isEditorUmpflag) { // 新建
            getListService.postDiscountUmp(function(response) {
              responseCallback(response);
            }, postUmpObj, element);
          } else { // 修改
            getListService.putDiscountUmp(function(response) {
              responseCallback(response);
            }, postUmpObj, element);
          };
        }, element);
      },
      "getDiscountShops": function() {
        _this = this;
        getListService.getShopsByPlatformId(function(data) {
          if( data.length > 0 && !_this.discountCurShop ){  // 由于隐藏了店铺选择框, 默认选中第一个, 后期需要调整逻辑
            _this.discountCurShop = data[0].name;
            _this.discountCurShopId = data[0].id;
          }
          $scope.umpScopeObj.common(data, $('[name="discountShop"]'));
        }, $rootScope.taobaoSegmentationId);
      },
      "getDiscountUmpType": function() {
        getListService.getDiscountUmpType(function(data) {
          $scope.umpScopeObj.common(data, $('[name="discountType"]'));
        });
      },
      "getUseHdList": function() {
        var params = {
          "shopId": angular.element("[name='discountShop']").attr("valueId"),
          "type": angular.element("[name='discountType']").attr("valueId")
        };
        if (params.shopId && params.type) {
          $('[name="useHdInput"]').next(".selectContent:first").children().remove();
          getListService.getTaregtNamesList(function(data) {
            $scope.umpScopeObj.common(data, $('[name="useHdInput"]'));
          }, params);
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
            } else if (eleName == "discountType") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].value + '>' + data[i].name + '</a></li>');
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
              if (angular.element("[name='discountShop']").attr("valueId") && angular.element("[name='discountType']").attr("valueId")) {
                $scope.$apply(function() {
                  $scope.umpScopeObj.useHdInputFlag = false;
                });
              } else {
                $scope.$apply(function() {
                  $scope.umpScopeObj.useHdInputFlag = true;
                });
              };

              if (eleName != "useHdInput") {
                angular.element("[name='useHdInput']").attr("valueId", "").val("");
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
    $scope.umpScopeObj.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    $scope.$watch("umpScopeObj.testAccount", function(n, o) {
      if (n == undefined) {
        return false;
      };
      var testTestAccountReg = /[^\u4e00-\u9fa5a-zA-Z0-9_,]/gi;
      if (testTestAccountReg.test(n) || (n && !n.replace(/,/g, ''))) {
        $scope.testUmpAccountFormatError = true;
      } else {
        $scope.testUmpAccountFormatError = false;
      }
    })
  }
]);
