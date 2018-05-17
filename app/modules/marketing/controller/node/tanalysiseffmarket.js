angular.module("campaign.controllers").controller('marketEffect', ['$scope', '$rootScope', '$http', 'getListService', '$q',
  function($scope, $rootScope, $http, getListService, $q) {
    //调用弹框方法
    $scope.openNodePop();
    // 打开节点获取节点的状态——用途：涉及到查看报告
    $scope.marketEffectObj = {
      'isEditorFlag': (!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8),
      'analyTimeType': '1',
      'delayNum': 1,
      'shopView': '',
      'specialTag': true,
      'delayTag': true,
      'shopErro': false,
      'analysisType': 1,
      'shopListDefer': $q.defer(),
      'reportFlag': false,
      'showReport': function() {
        $(".data-report").addInteractivePop({
          magTitle: "发送报告",
          width: 1000,
          mark: false,
          position: "fixed",
          childElePop: true
        });
        $('.dataInfoList').flexigrid({
          url: GLOBAL_STATIC.nodeRoot + 'node/effmarket/analysis/report?campId=' + graph.campId + '&nodeId=' + graph.nodeId,
          method: 'GET',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          colModel: [{
            display: '提交时间',
            name: 'dt',
            width: 1.5,
            sortable: false,
            align: 'center',
            dataindex: 'dt',
            title: true
          },
          {
            display: '客户提交数',
            name: 'submitNum',
            width: 1,
            sortable: false,
            align: 'center',
            dataindex: 'submitNum'
          },
          {
            display: '提交成功数',
            name: 'succNum',
            width: 1,
            sortable: false,
            align: 'center',
            dataindex: 'succNum'
          },
          {
            display: '提交失败数',
            name: 'failNum',
            width: 1,
            sortable: false,
            align: 'center',
            dataindex: 'failNum'
          },
          {
            display: '失败清单',
            name: 'failedUrl',
            width: 1,
            align: 'center',
            dataindex: 'failedUrl',
            renderer: function(v) {
              if (v) {
                return '<a title="下载"  href="' + v + '">下载</a>';
              } else {
                return '';
              }
            }
          }],
          updateDefaultParam: true,
          sortname: "",
          sortorder: "desc",
          buttons: [],
          usepager: true,
          useRp: true,
          rp: 20,
          showTableToggleBtn: true,
          colAutoWidth: true,
          onSuccess: function() {
            //var scope = angular.element('.dataInfoList').scope();
            //scope.gridObj.upCompile(scope);
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
        });
      },
      'selecShops': function() {
        var _this = this;
        _this.toggleStatuVal = false;
        $("#queryShopsPop").addInteractivePop({
          magTitle: "请选择店铺",
          width: 734,
          height: 336,
          mark: false,
          position: "fixed",
          childElePop: true
        });
      },
      'checkShop': function(shop) {
        var _this = this;
        var sum = 0;
        if (shop.checked && shop.checked == 'cur') {
          shop.checked = '';
          _this.temcheckedShop = null;
        } else {
          _this.shopList.forEach(function(item) {
            item.checked = '';
          });
          shop.checked = 'cur';
          _this.temcheckedShop = shop;
        }
      },
      'cancelShop': function() {
        var _this = this;
        if (_this.checkedShop) {
          _this.shopList.forEach(function(item) {
            if (item.idInPlat == _this.checkedShop.idInPlat) {
              item.checked = 'cur';
            } else {
              item.checked = '';
            }
          });
        }
      },
      'sureAddShop': function() {
        var _this = this;
        _this.checkedShop = _this.temcheckedShop;
      },
      'getShopsOfTaoBao': function(params) {
        var _this = this;

        function callback(res) {
          if(res.length == 1){
            _this.checkedShop = {
              name:res[0].name,
              idInPlat:res[0].idInPlat
            }
          }
          _this.shopList = res;
          _this.shopListDefer.resolve();
        }
        getListService.getShopsByPlatformId(callback, 1);
      },
      'changeTimeType': function(value) {
        var _this = this;
        switch (_this.analyTimeType) {
          case '1':
            _this.specialTag = true;
            _this.delayTag = true;
            break;
          case '2':
            if (value) {
              _this.specialDay = value;
            } else {
              _this.specialDay = moment().add(1, 'd').format('YYYY-MM-DD');
            }
            if (editableForm()) {
              _this.specialTag = true;
              _this.delayTag = true;
            } else {
              _this.specialTag = false;
              _this.delayTag = true;
            }
            break;
          case '3':
            if (value) {
              _this.delayNum = value;
            }
            if (editableForm()) {
              _this.specialTag = true;
              _this.delayTag = true;
            } else {
              _this.specialTag = true;
              _this.delayTag = false;
            }
            break;
        }
      },
      'submit': function(e) {
        if (this.isEditorFlag) {
          return "节点数据不可编辑";
        };
        var _this = this;
        _this.init = true;
        var currentTarget = $(e.currentTarget);
        if ($scope.formOne.$valid) {
          var parame = {
            'id': _this.id,
            'name': _this.name,
            'remark': $scope.nodecomment,
            'shop_id': _this.checkedShop.idInPlat,
            'analysisType': _this.analysisType,
            'analysisTimeType': _this.analyTimeType,
            'analysisName': _this.analysisName,
            'analysisCont': _this.analysisCont
          };
          switch (_this.analyTimeType) {
            case '1':
              parame.analysisTimeValue = 1;
              break;
            case '2':
              parame.analysisTimeValue = _this.specialDay;
              break;
            case '3':
              parame.analysisTimeValue = _this.delayNum;
              break;
          }

          getListService.saveMarketEffectNode(function(res) {
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(res.id, res.name, res.remark);
          }, parame);

          currentTarget.closest(".ccmsPublicPop").hide();
          angular.element(".ccmsPublicPop").find(".childElementMark").remove();
          $(".yunat_maskLayer").remove();
        }
      }
    };

    function editableForm() {
      var notCreator = !graph.isRemark;
      var campaignStatusNotEditable = (graph.campStatus != "A1" && graph.campStatus != "B3");
      var jobNotEditable = (graph.campStatus == "B3" && graph.jobStatus != 8);
      var nodeNotEditableWhileExecuting = (graph.campStatus == "B3" && graph.openNode.type == "tflowtime");
      if (graph.campStatus == "A5") {
        $scope.marketEffectObj.reportFlag = true;
      }
      if (notCreator || campaignStatusNotEditable || jobNotEditable || nodeNotEditableWhileExecuting) {
        return true;
      }
      return false;
    }

    getListService.getNodeTipsByType(function(responseTips) { // 获取tips
      $scope.marketEffectObj.tips = responseTips.tips || "";
    }, "tanalysiseffmarket");

    getListService.openMarketEffectNode(function(res) {
      $scope.marketEffectObj.id = res.id;
      $scope.marketEffectObj.name = res.name;
      $scope.marketEffectObj.shopId = res.shop_id;
      $scope.marketEffectObj.analysisType = res.defaultTypeId;
      $scope.marketEffectObj.anaTypeList = res.analysisTypeList;
      $scope.marketEffectObj.analysisName = res.analysisName;
      $scope.marketEffectObj.analysisCont = res.analysisCont;
      $scope.marketEffectObj.analyTimeType = res.analysisTimeType ? res.analysisTimeType: '1';
      $scope.marketEffectObj.changeTimeType(res.analysisTimeValue);
      $scope.nodecomment = res.remark || "";

      var editable = editableForm();
      var eles = $('[name=formOne]')[0].elements;

      if (editable) {
        for (var i = 0; i < eles.length; i++) {
          eles[i].disabled = true;
        }
      }

      $q.all($scope.marketEffectObj.shopListDefer).then(function() {
        $scope.marketEffectObj.shopList.forEach(function(item) {
          if (item.idInPlat == res.shop_id) {
            $scope.marketEffectObj.checkedShop = item;
            item.checked = 'cur';
          }
          else if( ($scope.marketEffectObj.shopList.length == 1) && (item.idInPlat == $scope.marketEffectObj.checkedShop.idInPlat) ){
            $scope.marketEffectObj.checkedShop = item;
            item.checked = 'cur';
          }
        });
      });
    });

    $scope.marketEffectObj.getShopsOfTaoBao();
  }
]);
