angular.module("campaign.controllers").controller('benefitController', ['$scope', '$http', '$compile', '$rootScope', '$timeout','getListService', function($scope,$http, $compile, $rootScope,$timeout,getListService) {
  $scope.benefitObject = {
    'templateValue': 1, // 模板item
    'shopsData': [],
    'title': '',
    'benefitTypeData': [],
    'currentActiveShop': '',
    'currentListShop': '',
    'currentBenefitType': {
	    benefitTypeName: '类型不限',
      benefitType: ''
    },
    'defaultType': '',
    'enableBenefit': [],
    'toggleTemplate': function(flag) {
      flag ? this.activeUrl = CAMPAIGN_STATIC.tplBasePath + "view/discount/benefitActive.html?_=" + ( + new Date) : this.activeUrl = CAMPAIGN_STATIC.tplBasePath + "view/discount/benefitList.html?_=" + ( + new Date);
      this.templateValue = flag;
      if(flag==0){
        $scope.benefitObject.hdValue='';
      }else if(flag==1){
        $scope.benefitObject.benefitValue='';
      }
    },
	  'gitBenefitTypes': function() {
		  // 获取权益类型
		  var _this = this;
		  var callback = function(data) {
			  _this.benefitTypeData = angular.copy(data.benefitTypeList);
			  _this.benefitTypeData.unshift({
				  "benefitType": "",   //权益类型
				  "benefitTypeName": "类型不限"
			  })
		  }
		  getListService.getBenefitTypesData(callback);
	  },
    'getShops': function() {
      var _this = this;
      var callback = function(data) {
        _this.shopsData = data;
        _this.currentActiveShop = angular.copy(_this.shopsData[0]);
        _this.currentListShop = angular.copy(_this.shopsData[0]);
        // 初始化活动列表
        _this.toggleTemplate(true);
      }
      getListService.getShopsByPlatformId(callback, $rootScope.taobaoSegmentationId);
    },
    'selectShops': function (flag) {
      if(flag) {
        this.common(this.shopsData, $('[name="'+flag+'"]'));
      } else{
        this.common(this.shopsData, $('[name="discountShop"]'));
      }
    },
    'benefitTypeSelector': function() {
      this.common(this.benefitTypeData, $('[name="benefitType"]'));
    },
    'common': function(data, ele) {
      if (ele.next("label").hasClass('error')) {
        var $selContent = ele.next("label").next(".selectContent:first").css("zIndex", 1000);
      }else{
        var $selContent = ele.next(".selectContent:first").css("zIndex", 1000);
      }
      $selContent.children().remove();
      var eleName = ele.attr("name");
      var $ul = $("<ul>");
      if (data) {
        $selContent.append($ul);
        var len = data.length;
        for (var i = 0; i < len; i++) {
          if (eleName == "benefitShop" || eleName == "discountShop" || eleName == "modifyActiveShop") {
            $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].idInPlat + '>' + data[i].name + '</a></li>');
          } else if (eleName == "benefitType") {
            $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].benefitType + '>' + data[i].benefitTypeName + '</a></li>');
          }
          $ul.find("a").css({
            "padding": "3px 10px",
            "color": "#3D3D3D",
            "display": "block"
          });
        }
        $ul.find("a").bind({
          "click": function() {
            var _this =this;
            if(eleName == "modifyActiveShop" && $scope.benefitObject.modifyActiveShop.idInPlat && $scope.benefitObject.modifyActiveShop.idInPlat != $(_this).attr("id") && $('.link-benefit').length>1) {
              $(this).Confirm({
                "title": "提示",
                "str": "如果更换店铺，所有权益需要重新关联",
                "mark": true
              }, function() {
                selectedPromise ();
                $scope.$apply(function() {$scope.benefitObject.enableBenefit = []});
              });
            } else {
              selectedPromise ();
            }
            function selectedPromise () {
              var textVal = $(_this).text(),
                  idVal = $(_this).attr("id");
              $selContent.slideUp(200);
              $scope.$apply(function() {
              if(eleName == 'benefitType') {
                angular.forEach($scope.benefitObject.benefitTypeData, function(val, key) {
                  if (val.benefitType == idVal) {
                    $scope.benefitObject.currentBenefitType = $scope.benefitObject.benefitTypeData[key];
                    $scope.benefitObject.updateGrid();
                  }
                })
              } else {
                angular.forEach($scope.benefitObject.shopsData, function(val, key) {
                  if (val.idInPlat == idVal) {
                    if(eleName == 'discountShop') {
                      $scope.benefitObject.currentActiveShop = $scope.benefitObject.shopsData[key]
                      $scope.benefitObject.updateGrid(true);
                    } else if(eleName == 'benefitShop') {
                      $scope.benefitObject.currentListShop = $scope.benefitObject.shopsData[key];
                      $scope.benefitObject.updateGrid();
                    }  else if(eleName == 'modifyActiveShop') {
                      $scope.benefitObject.modifyActiveShop = $scope.benefitObject.shopsData[key];
                      ele.next("label").remove();
                      ele.removeClass('error');
                    }
                  }
                })
              }
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
    },
    'compileTpl': function(b) {
      $compile(angular.element(".benifit-active-flexgrid"))($scope || b);
      $scope.$apply();
    },
    'updateGrid': function(isActive) {
      var gridElement = "";
      if(isActive) {
        gridElement = angular.element(".benifit-active-flexgrid")[0];
        gridElement.p.query = this.hdValue || "";
        gridElement.grid.addParams('shopId', $scope.benefitObject.currentActiveShop.idInPlat);
        gridElement.grid.addParams("status", $scope.benefitObject.defaultType*1 ?  $scope.benefitObject.defaultType : "");
      } else {
        gridElement = angular.element(".benifit-flexgrid")[0];
        gridElement.grid.addParams('shopId', $scope.benefitObject.currentListShop.idInPlat);
        gridElement.grid.addParams('benefitType', $scope.benefitObject.currentBenefitType.benefitType);
        gridElement.p.query = this.benefitValue || "";
      }
      gridElement.p.newp = 1;
      gridElement.grid.populate();
    },
    'changeStatus': function (val) {
      this.defaultType = val;
      this.updateGrid(true);
    },
    'deleteActive': function(id) {
	    var _this = this;
      $(this).Confirm({"title":"确认删除","str":"活动删除后将无法恢复，确定要删除活动？","mark":true},function(){
        getListService.deleteBenefitActive(function(res) {
          $('.benifit-active-flexgrid').flexReload();
          $(this).yAlert({ "text": "删除成功" });
          removeAlert();
        }, id, _this.currentActiveShop.idInPlat)
      })
    },
    'editorBenefitActive': function(e, id) {
      var _this = this;
      if(e) {
        // modify
        _this.isNew = false;
        _this.title = '编辑权益活动';
        _this.editExclusive=true;
        var activitys = $(e.target).closest('tr').data('rec');
        getListService.getActiveInfoById(function(res) {
          _this.relationId = id;
          _this.activityName = activitys.activityName;
          _this.startTime = activitys.startTime;
          _this.endTime = activitys.endTime;
          _this.remark = activitys.remark;
          _this.enableBenefit = [res];
          _this.modifyActiveShop = angular.copy( _this.currentActiveShop);
        }, id, _this.currentActiveShop.idInPlat)
      } else {
        // add
        _this.editExclusive=false;
        _this.isNew = true;
        _this.activityName = '';
        _this.relationId = '';
        _this.startTime = '';
        _this.endTime = '';
        _this.remark = '';
        _this.shopId = '';
        _this.enableBenefit = [];
        _this.modifyActiveShop = {}
        _this.title = '新建权益活动';
      }
      this.activeUrl = CAMPAIGN_STATIC.tplBasePath + "view/discount/addBenefit.html?_=" + ( + new Date);
    },
    'backBenefitActiveList': function(flag) {
      // flag店铺是否需要同步
      this.templateValue = true;
      if( flag && this.modifyActiveShop.name && this.modifyActiveShop.idInPlat ){
        this.currentActiveShop.name=this.modifyActiveShop.name;
        this.currentActiveShop.idInPlat=this.modifyActiveShop.idInPlat;
      }
      $scope.benefitObject.defaultType='';
      this.defaultBenefitType='';
      this.activeUrl = CAMPAIGN_STATIC.tplBasePath + "view/discount/benefitActive.html?_=" + ( + new Date);
    },
    'submit': function() {
      $("#benefit-form").validate({
        rules: {
          name: "required",
          modifyActiveShop: "required",
          startTime: "required",
          endTime: "required",
          benefitId: "required",
          remark: {
            maxlength: 200,
            required: true
          }

        },
        messages: {
          name: "请输入活动名称",
          modifyActiveShop: "请选择店铺",
          startTime: "开始时间必填",
          endTime: "结束时间必填",
          benefitId: "至少关联一个权益",
          remark: {
            maxlength: "输入字符最长为200",
            required: "此字段必填"
          }
        },
        submitHandler: function() {
          $scope.benefitObject.saveBenefitActive();
        }
      });
    },
    'saveBenefitActive': function() {
      var _this =this;
      var params = {
        "shopId": _this.modifyActiveShop.idInPlat,
        "activityName": _this.activityName,
        "endTime": _this.endTime,
        "startTime": _this.startTime,
        "remark":  _this.remark,
        "tenantId": CAMPAIGN_STATIC.tenantId
      }

      _this.oBtn=true;
      $('.mb button').toggleClass('btnBlue');
      $timeout(function(){
        _this.oBtn=false;
        $('.mb button').addClass('btnBlue');
      },2000)

      if(_this.enableBenefit.length <= 0) {
        $(this).Alert({"title":"提示","str":"请选择所要关联的权益","mark":true});
        return false;
      }
      var currentBenefitData = _this.enableBenefit[0];
      params.benefitId = currentBenefitData.benefitId;
      params.benefitType = currentBenefitData.benefitType;
      params.benefitName = currentBenefitData.benefitName;
      params.benefitTypeName = currentBenefitData.benefitTypeName;
      params.benefitStartTime = currentBenefitData.startTime;
      params.benefitEndTime = currentBenefitData.endTime;
      var tempTimeStart = _this.startTime.replace(/-/g,'/');
      var nowTime = new Date();
      var tempTime = _this.endTime.replace(/-/g, '/');
      var startMinEnd = Date.parse(tempTime) - Date.parse(tempTimeStart)
      if(Date.parse(nowTime) > Date.parse(tempTime)){
        $(this).Alert({"title":"提示","str":"当前活动结束时间早于当前时间，请修改后再提交","mark":true});
        return false;
      }

      if( startMinEnd <= 3000 ){
        $(this).Alert({"title":"提示","str":"当前活动结束时间至少比开始时间晚三秒以上","mark":true});
        return false;
      }

      /*if (!_this.relationId) {
        $(this).Alert({"title":'提示',"str":"保存失败","mark":true});
        return false;
      };*/

      if(_this.isNew) {
        getListService.addNewBenefitActive(function(res) {
          _this.backBenefitActiveList(true);
          $('.benifit-active-flexgrid').flexReload();
          $(this).yAlert({
            'text': '新建活动成功!'
          });
          removeAlert();
        }, params);
      } else {
        getListService.modifyBenefitActive(function(res) {
          _this.backBenefitActiveList(true);
          $('.benifit-active-flexgrid').flexReload();
          $(this).yAlert({
            'text': '修改成功'
          });
          removeAlert();
        }, params, _this.relationId);
      }
    },
    'benefitLists':[], // 权益选择器
    'sizeList': [10, 15, 20, 30, 50],
    'queryValue': '',
    'defaultBenefitType': '', // 权益默认类型
    'selectedBenefitItem': '',
    'pager': {
      currentPage: 1,
      pagesize: 10,
      totalPages: ''
    },
    'queryPage': function(e){
      var keycode = window.event ? e.keyCode : e.which;
      if(keycode==13){
        this.getBenefitData();
      }
    },
    'addBenefitList': function() {
      if(!this.modifyActiveShop.id){
        $(this).Alert({"title":"提示","str":"请先选择店铺","mark":true});
        return false;
      }
      $(".benefit-selector").addInteractivePop({magTitle:"权益选择",mark:true,drag:true,position:"fixed"});
      // 初始化权益列表
      $scope.benefitObject.queryValue='';
      this.pager.currentPage=1;
      this.defaultBenefitType ? this.getBenefitData(this.defaultBenefitType) : this.getBenefitData();
    },
    'getBenefitData': function(issearch) {
      var that = this;
      that.defaultBenefitType = issearch && typeof issearch == 'string' ? issearch : that.defaultBenefitType;
      if(issearch == 'none') {
        // 类型不限
        that.defaultBenefitType = '';
      }
      if(issearch){
        that.pager.currentPage=1;
      }
      // id搜索
      var searchById = /^\d+$/g.test(that.productName);
      if( issearch ){
        that.isExternal = true;
      }
      var params = {
        page:that.pager.currentPage,
        pagesize: that.pager.pagesize,
        query: that.queryValue,
        shopId: that.modifyActiveShop.idInPlat,
        benefitType: that.defaultBenefitType
      };

      that.benefitLists =null;

      var successCallback = function(response) {
        if(response.data) {
          that.benefitLists = response.data;
          that.pager.totalPages = Math.ceil(response.total / that.pager.pagesize)==0 ? 1 : Math.ceil(response.total / that.pager.pagesize);
        };
        that.isExternal = false;
        that.loading = false;
      }

      // search按钮触发
      if(issearch) {
        params.pagesize = that.pager.pagesize = 10;
        params.pageNum = 1;
      }
      that.loading = true;

        getListService.getBenefitData(successCallback, params);
    },
    'setPage': function(page) {
      var currentPage = +$scope.benefitObject.pager.currentPage;
      if (angular.isString(page)) {
        switch (page) {
          case 'first':
            currentPage = 1;
            break;
          case 'last':
            currentPage = +$scope.benefitObject.pager.totalPages;
            break;
          case 'prev':
            currentPage--;
            break;
          case 'next':
            currentPage++;
            break;
        }
      } else if (angular.isNumber(page)) {
        currentPage = page;
      }

      $scope.benefitObject.pager.currentPage = currentPage;
      this.getBenefitData(false);
    },
    'noPrevious': function() {
      return this.pager.currentPage == 1;
    },
    'noNext': function() {
      return this.pager.currentPage === this.pager.totalPages;
    },
    'benefitToggleClass': function($index) {
      angular.forEach(this.benefitLists, function(val, key) {
        val.selected = false;
      });
      this.benefitLists[$index].selected = true;
      this.selectedBenefitItem = this.benefitLists[$index];
    },
	  'removeBenefit': function($index){
		  var _this = this;
		  _this.enableBenefit.splice($index,1);
      _this.selectedBenefitItem = '';
	  },
    'selectedBenefit': function() {
      var flag = true;
      var _this = this;
      angular.forEach(this.enableBenefit, function(val ,key) {
        if(val.benefitId == _this.selectedBenefitItem.benefitId) {
          flag = false;
        }
      })
      // if(this.enableBenefit){
      //   $(this).Alert({"title":"提示","str":"至少关联一个权益","mark":true});
      //   return false;
      // }
      flag && _this.selectedBenefitItem && _this.enableBenefit.push(_this.selectedBenefitItem);
      $(".benefit-selector").hide();
      $(".yunat_maskLayer").hide();
    }
  }
  $scope.benefitObject.getShops();
	$scope.benefitObject.gitBenefitTypes();

  $scope.$watch('benefitObject.pager.currentPage', function (newValue, oldValue) {
    if (!newValue || newValue == oldValue || newValue == '0' || $scope.benefitObject.isExternal) {
      $scope.benefitObject.pager.currentPage = 1;
      return;
    }
    newValue = +newValue;
    if (!isNaN(newValue) && angular.isNumber(newValue)) {
      if (newValue > $scope.benefitObject.pager.totalPages) {
        $scope.benefitObject.pager.currentPage = $scope.benefitObject.pager.totalPages;
        return;
      } else if (newValue < 1) {
        $scope.benefitObject.pager.currentPage = 1;
        return;
      }
    } else {
      $scope.benefitObject.pager.currentPage = 1;
    }
  });

  $scope.$watch('benefitObject.pager.pagesize', function (newValue, oldValue) {
    if (!newValue || newValue == oldValue) {
      return;
    }
    // pageSize改变默认回到第一页
    $scope.benefitObject.pager.currentPage = 1;
    $scope.benefitObject.getBenefitData();
  });

  $scope.promptHide=function(){
    $('.benefit-select-val').attr('placeholder','');
  }

  $scope.promptShow=function(){
    $('.benefit-select-val').attr('placeholder','权益名称');
  }

}]).controller('benefitActiveController', ['$scope', '$location', '$http', '$compile', 'getListService', '$q', '$rootScope', function($scope, $location, $http, $compile, getListService, $q, $rootScope) {
  $('.benifit-active-flexgrid').flexigrid({
    url: GLOBAL_STATIC.campaignRoot + 'benefit/activities',
    method: 'GET',
    dataType: 'json',
    params: [{
      "name": "shopId",
      "value":  $scope.benefitObject.currentActiveShop.idInPlat
    },{
      "name": "status",
      "value":  $scope.benefitObject.defaultType
    }],
    colModel: [{
      display: '活动ID',
      name: 'relationId',
      width: 1.5,
      sortable: false,
      align: 'center',
      dataindex: 'relationId',
      renderer: function(v) {
        return '<span title="' + v + '">' + v + '</span>';
      }
    },
      {
        display: '活动名称',
        name: 'activityName',
        width: 2,
        sortable: false,
        align: 'left',
        dataindex: 'activityName',
        renderer: function(v) {
          return '<span title="' + v + '">' + v + '</span>';
        }
      },
      {
        display: '起始时间',
        name: 'startTime',
        width: 2,
        height: "auto",
        sortable: false,
        align: 'center',
        dataindex: 'startTime'
      },
      {
        display: '终止时间',
        name: 'endTime',
        width: 2,
        height: "auto",
        sortable: false,
        align: 'center',
        dataindex: 'endTime'
      },
      /*{
        display: '已关联权益数',
        name: 'benefitCount',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'benefitCount',
        renderer: function(v) {
          return '<span title="' + v + '">' + v + '</span>';
        }
      },*/
      {
        display: '权益ID',
        name: 'benefitId',
        width: 1,
        sortable: false,
        align: 'center',
        dataindex: 'benefitId',
        renderer: function(v){
          return '<span title="'+v+'">'+v+'</span>';
        }
      },
      {
        display: '权益名称',
        name: 'benefitName',
        width: 2,
        sortable: false,
        align: 'left',
        dataindex: 'benefitName',
        renderer: function(v){
          return '<span title="'+v+'">'+v+'</span>';
        }
      },
      {
        display: '创建人',
        name: 'userName',
        width: 1.5,
        sortable: false,
        align: 'left',
        dataindex: 'userName',
        renderer: function(v){
          return '<span title="'+v+'">'+v+'</span>';
        }
      },
      {
        display: '状态',
        name: 'status',
        width: 1,
        sortable: false,
        align: 'center',
        mapping: ["status", "relationId"],
        convert: function(v, mappval) {
          var status = mappval[0];
          //status 0 新建未提交 1未开始 2进行中 3修改未提交  4已结束
          if (status == 2) {
            return "已开始";
          } else if (status == 1) {
            return "<span class='green'>未开始</span>";
          } else if (status == 3) {
            return "<span class='gray'>已结束</span>";
          }
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
        display: '操作',
        name: 'operation',
        width: 1,
        sortable: false,
        align: 'center',
        mapping: ["status", "relationId", "shopName"],
        convert: function(v, mappval) {
          var status = mappval[0];
          //status 0 新建未提交 1未开始 2进行中 3修改未提交  4已结束
          return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="benefitObject.editorBenefitActive($event,' + mappval[1] + ',\'' + mappval[2] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-click="benefitObject.deleteActive(' + mappval[1] + ')"></a>';

        }
      }],
    updateDefaultParam: true,
    sortname: "id",
    sortorder: "desc",
    rp: 20,
    usepager: true,
    useRp: true,
    showTableToggleBtn: true,
    colAutoWidth: true,
    onSuccess: function() {
      var scope = angular.element(document.querySelector('.ump_content')).scope();
      $scope.benefitObject.compileTpl(scope);
    }
  });

  $scope.promptHide=function(){
    $('.activity-search-val').attr('placeholder','')
  }
  $scope.promptShow=function(){
    $('.activity-search-val').attr('placeholder','活动名称/权益ID/权益名称')
  }

}]).controller('benefitListController', ['$scope', '$location', '$http', '$compile', 'getListService', '$q', '$rootScope', function($scope, $location, $http, $compile, getListService, $q, $rootScope) {
  $('.benifit-flexgrid').flexigrid({
    url: GLOBAL_STATIC.campaignRoot + 'benefit/Selector',
    method: 'GET',
    dataType: 'json',
    params: [{
      "name": "shopId",
      "value": $scope.benefitObject.currentListShop.idInPlat
    },
    {
      "name": "benefitType",
      "value": $scope.benefitObject.currentBenefitType.benefitType
    }],
    colModel: [{
      display: '权益ID',
      name: 'benefitId',
      width: 2,
      sortable: false,
      align: 'center',
      dataindex: 'benefitId',
      renderer: function(v) {
        return '<span title="' + v + '">' + v + '</span>';
      }
    },
      {
        display: '权益名称',
        name: 'benefitName',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'benefitName',
        renderer: function(v) {
          return '<span title="' + v + '">' + v + '</span>';
        }
      },
      {
        display: '权益类型',
        name: 'benefitTypeName',
        width: 2,
        sortable: false,
        align: 'center',
        dataindex: 'benefitTypeName',
        renderer: function(v) {
          return '<span title="' + v + '">' + v + '</span>';
        }
      },
      {
        display: '起始时间',
        name: 'startTime',
        width: 2,
        height: "auto",
        sortable: false,
        align: 'center',
        dataindex: 'startTime'
      },
      {
        display: '终止时间',
        name: 'endTime',
        width: 2,
        height: "auto",
        sortable: false,
        align: 'center',
        dataindex: 'endTime'
      }],
    updateDefaultParam: true,
    sortname: "id",
    sortorder: "desc",
    rp: 20,
    usepager: true,
    useRp: true,
    showTableToggleBtn: true,
    colAutoWidth: true,
    onSuccess: function() {
      var scope = angular.element(document.querySelector('.ump_content')).scope();
      $scope.benefitObject.compileTpl(scope);
    }
  });

  $scope.promptHide=function(){
    $('.activity-search-val').attr('placeholder','');
  }
  $scope.promptShow=function(){
    $('.activity-search-val').attr('placeholder','权益名称');
  }

}]).directive('activeTypeSelector', ['$rootScope', function($rootScope) {
  var statusMap = {
    "所有状态活动": "A0",
    "未开始": "A3",
    "已开始": "B3",
    "已结束": "A5"
  };
  return {
    template: '<div class="type_selector"><div class="ac_status_selector ac_status ac_status_A0">{{statusValue}}<a title="{{acType}}"></a></div><div class="ac_status_selector ac_status_selector2 ac_status ac_icon_A0">{{statusValue}}<a></a></div> ' +
        '<div class="select_wrap"><div class="select_item ac_item_A0 ac_status" ng-click="changeStatus({value: \'0\'})">所有状态活动</div> ' +
        '<div class="select_item  ac_status ac_item_A3" ng-click="changeStatus({value: \'1\'})">未开始</div>' +
        '<div class="select_item  ac_status ac_item_B3" ng-click="changeStatus({value: \'2\'})">已开始</div> ' +
        '<div class="select_item  ac_status ac_item_A5" ng-click="changeStatus({value: \'3\'})">已结束</div> ' +
        '</div> </div>',
    scope:{
      defaultType: '=',
      changeStatus: '&'
    },
    link: function (scope, elem, attrs) {
      var isShow, defalutStatusValue = "";
      var list = elem.find(".select_wrap");
      list.hide();
      //var input = elem.find("input");
      var inputs = elem.find(".ac_status_selector");

      elem.on('mouseenter',function () {
        list.show();
        inputs.addClass('ac_status_selector_hover');
      }).on('mouseleave', function () {
        list.hide();
        inputs.removeClass('ac_status_selector_hover');
      });

      switch(scope.defaultType) {
        case '0':
          scope.defaultType = '0';
          break;
        case '1':
          scope.defaultType = '1';
          break;
        case '2':
          scope.defaultType = '2';
          break;
        case '3':
          scope.defaultType = '3';
          break;
      }

      if (scope.defaultType) { // 获取默认状态代码的名称
        for (var s in statusMap) {
          if (statusMap[s] == scope.defaultType) {
            defalutStatusValue = s;
          }
        }
      };
      scope.statusValue = defalutStatusValue || "所有状态活动"; //是否是首页切换来的，是则有默认的值
      scope.acType = scope.defaultType || "A0";
      scope.$watch("acType", function (type) {
        if (type) {
          inputs[1].className = inputs[1].className.replace(/[AB]\d/, type);
        }
      });

      list.find('div').on("click", function (event) {
        var value = event.target.textContent || event.target.innerHTML;
        if (value) {
          scope.statusValue = value;
          scope.acType = statusMap[value];
          scope.$digest();
        }
        list.hide();
      });
    }
  };
}]).directive('benefitTypeSelector', ['$rootScope', function($rootScope) {
  return {
    template: '<div class="type_selector"><div class="ac_status_selector ac_status">{{statusValue}}<a title="{{acType}}"></a></div>' +
        '<div class="select_wrap"><div class="select_item" ng-click="changeItemStatus(item)" ng-repeat="item in benefitTypeData" ng-bind="item.benefitTypeName"></div> ' +
        '</div> </div>',
    scope:{
      defaultType: '= defaultBenefitType',
      changeStatus: '&',
      benefitTypeData: '='
    },
    link: function (scope, elem, attrs) {
      var isShow, defalutStatusValue = "";
      var list = elem.find(".select_wrap");
      list.hide();
      //var input = elem.find("input");
      var inputs = elem.find(".ac_status_selector");

      elem.on('mouseenter',function () {
        list.show();
        inputs.addClass('benefit-selector-hover');
      }).on('mouseleave', function () {
        list.hide();
        inputs.removeClass('benefit-selector-hover');
      });

      if (scope.defaultType) { // 获取默认状态代码的名称
        for (var s in scope.benefitTypeData) {
          if (scope.benefitTypeData[s].benefitType == scope.defaultType) {
            defalutStatusValue = scope.benefitTypeData[s].benefitTypeName;
          }
        }
      };
      scope.statusValue = defalutStatusValue || scope.benefitTypeData[0].benefitTypeName; //是否是首页切换来的，是则有默认的值
      scope.acType = scope.defaultType || scope.benefitTypeData[0].benefitType;

      scope.changeItemStatus = function(item) {
        scope.statusValue = item.benefitTypeName;
        scope.acType = item.benefitType || "none";
        scope.changeStatus({value:scope.acType});
        list.hide();
      }
    }
  };
}])
