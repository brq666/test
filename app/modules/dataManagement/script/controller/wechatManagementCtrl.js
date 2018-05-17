/**
 * Created by taoyong on 2015/10/15.
 */
angular.module("dataManage.controllers").controller('wechatManagementCtrl', ["$scope", "$rootScope", "$location", "$http", "$compile", "ngWeChatService", "$q",
  function($scope, $window, $location, $http, $compile, ngWeChatService, $q) {

    $scope.managementObj = {
      getWechatDomain: function() {
        ngWeChatService.getWeChatDomain(function(response) {
          $scope.managementObj.authDomain = response.data || "";
        })
      },
      getWechatList: function(callback) {
        ngWeChatService.getWechatList(function(response) {
          $scope.managementObj.weChatListData = response.data || [];
          callback();
        })
      },
      weChatListData: [],
      hdValue: '',
      bindShopId: '',
      bindShopIds: [],
      searchButtonClick: function() {
        var curGridElement = angular.element("#shopListsGrid")[0];
        curGridElement.grid.addParams("shopName", $scope.managementObj.hdValue);
        curGridElement.p.newp = 1;
        curGridElement.grid.populate();
      },
      bindShop: function(p3) {
        var _this = this;
        _this.bindShopId = p3 || '';
        if(!p3) {
          // 批量验证
          var isSelected = false;
          _this.bindShopIds = [];
          angular.forEach(angular.element('#shopListsGrid input[type="checkbox"]'), function(value, key) {
            if(angular.element(value).is(':checked')) {
              isSelected = true;
              _this.bindShopIds.push(angular.element(value).attr('shopId'));
            };
          })
          if(!isSelected) {
            $(this).Alert({"title":"提示","str": "请选择要关联的店铺","mark":true, "eleZindex":1010,"markZindex":1005});
            return 'false'
          }
        }
        $scope.managementObj.getWechatList(function() {
          $scope.managementObj.curBindWechat = $scope.managementObj.weChatListData[0];
          $(".settingBind").addInteractivePop({magTitle: "微信公众号关联", width: 570, mark: true, position: "fixed"});
        });
      },
      searchBindShops: function() {
        var _this = this;
        var bindDatas;
        if(_this.bindShopId) {
          // 单个绑定
          bindDatas = {
            "requestInfoList": [
              {
                "offAcct": _this.curBindWechat.offAcct,
                "offAcctName": _this.curBindWechat.offAcctName,
                "shopId": _this.bindShopId
              }
            ]
          }
        } else {
          // 批量绑定
          bindDatas = {
            "requestInfoList": []
          }
          angular.forEach(_this.bindShopIds, function(val, key) {
            bindDatas.requestInfoList.push({
              "offAcct": _this.curBindWechat.offAcct,
              "offAcctName": _this.curBindWechat.offAcctName,
              "shopId": val
            })
          })
        }
        ngWeChatService.bindAuth(function(data) {
          if(data.code === 'SUCCESS') {
            $(this).yAlert({"text": "关联成功"});
            removeAlert();
            angular.element('.settingBind').hide();
            angular.element("#shopListsGrid")[0].grid.populate();
          } else {
            $(this).Alert({"title":"提示","str": data.msg,"mark":true,"eleZindex":1010,"markZindex":1005});
          }
        }, bindDatas)
      },
      ubBindShop: function(p1, p2, p3) {
        $(this).Confirm({"title": "确认解除关联", "str": "是否解除关联？", "mark": true}, function () {
          var curData = {
            "requestInfoList": [
              {
                "offAcct": p2,
                "offAcctName": p1,
                "shopId": p3
              }
            ]
          }
          ngWeChatService.unbindAuth(function (data) {
            if(data.code === 'SUCCESS') {
              $(this).yAlert({"text": "解除成功"});
              removeAlert();
              angular.element("#shopListsGrid")[0].grid.populate();
            } else {
              $(this).Alert({"title":"提示","str": data.msg,"mark":true,"eleZindex":1010,"markZindex":1005});
            }
          },curData);
        })
      },
      'checkedAll': function() {
        var checkedValue = angular.element('input[name="check-all"]').attr('checked');
        angular.forEach(angular.element('#shopListsGrid input[type="checkbox"]'), function(value, key) {
          angular.element(value).attr('checked', !!checkedValue);
        })
      },
      'singleChecked': function(e) {
        var isCkeckedAll = true;
        angular.forEach(angular.element('#shopListsGrid input[type="checkbox"]'), function(value, key) {
          if(!angular.element(value).is(':checked')) {
            isCkeckedAll = false;
          };
        })

        if(isCkeckedAll) {
          angular.element('input[name="check-all"]').attr('checked', 'checked');
        } else {
          angular.element('input[name="check-all"]').attr('checked', false);
        }
      }
    };

    $scope.managementObj.getWechatDomain();

    $('#shopListsGrid').flexigrid({//标签列表grid
      url: GLOBAL_STATIC.datamanageRoot + 'wechat/shop/bind/info/',
      method: 'GET',
      dataType: 'json',
      contentType: '',
      colModel: [
        {display: 'Logo', name: 'logo', className: 'indent20', width: 2, align: 'left', sortable: false, dataindex: 'logo', mapping:['shopId'], convert: function(v, mappVal) {
          v = v || '../../images/static.png'
          return '<input type="checkbox" ng-click="managementObj.singleChecked($event)" name="shop" shopId="' + mappVal[0] + '" /> <img class="grid-logo ml5 managementimg" src="' + v + '" width="24" height="24" />';
        }},
        {display: '店铺', name: 'shopName', width: 2, align: 'left', sortable: false, dataindex: 'shopName'},
        {display: '平台', name: 'pltId', width: 2, align: 'center', sortable: false, dataindex: 'pltName'},
        {display: '微信公众号', name: 'offAcctName', width: 2, align: 'left', sortable: false, dataindex: 'offAcctName', renderer: function(v) {
          return v ? v : '-'
        }},
        {display: '操作', name: 'status', width: 2, sortable: false, align: 'center', dataindex: 'status',  mapping: ['offAcctName', 'offAcct', 'shopId'], convert: function (v, mappVal) {
          if(v === 1){
            return '<a href="javascript:void(0);" class="fixButtonStyle managementblack" ng-click="managementObj.ubBindShop(\'' + mappVal[0] + '\', \'' + mappVal[1] + '\', \'' + mappVal[2] + '\');" title="解除关联">解除关联</a>'
          }else{
            return '<a href="javascript:void(0);" class="fixButtonStyle" ng-click="managementObj.bindShop(\'' + mappVal[2] + '\');" title="关联">关联</a>';
          }
        }}
      ],
      sortname: '',
      sortorder: "asc",
      updateDefaultParam: 'custom',
      customParams: ['page', 'size'],
      buttons: [],
      usepager: true,
      useRp: true,
      rp: 20,
      params :[{"name":"shopName","value":$scope.managementObj.hdValue}],
      showTableToggleBtn: true,
      colAutoWidth: true,
      singleSelect: false,
      singleStyle: true,
      onSuccess: function () {
        var scope = angular.element(angular.element(".gridCommLayout")).scope();
        $compile(angular.element(".gridCommLayout"))($scope || scope);
        angular.element('input[name="check-all"]').attr('checked', false);
        $scope.$apply();
      },
      onError:function(response){
        if (response.status == 302) {
          location.pathname=root+'login.html';
          return;
        }
      }
    });

    $scope.upDateWorkbenchList=function(){
      angular.element("#labelListsGrid")[0].grid.addParams("shopId", $scope.curWorkbenchShop.idInPlat);
      angular.element("#labelListsGrid")[0].grid.populate();
    };
  }
]);
