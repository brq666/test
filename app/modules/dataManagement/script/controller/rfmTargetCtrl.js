angular.module("dataManage.controllers").controller('rfmTarget', ["$scope", "$location", "$http", "$compile", "RFMTreeService","$timeout",
  function($scope, $location, $http, $compile, RFMTreeService,$timeout) {
    //tab切换
    $scope.RFMTableSwitch = 1;
    $scope.changeHeight = null;
    var settingZtreeObj = {
      //初始化ztree
      /*
       * 依赖指令ztree && out-root-tree && tree-node-search-input
       */
      "init": function() {
        //标志树的根节点外外部
        // $scope.hasOutRoot =  true;
        $scope.FIXNODENAME = "未分类";
        var succcb = function(res) {
          $scope.treeNodes = res
        }, errcb = function() {
          $scope.treeNodes = []
        };
        $scope.treeSettings = {
          view: {
            selectedMulti: false
          },
          data: {
            simpleData: {
              enable: true
            }
          }
        };
        //设置默认的tree node
        $scope.getAllNodes = function() { //初始化请求
          RFMTreeService.getRFMTree(function(response) {
            $scope.treeNodes = response;
            /* var treeEle = $.fn.zTree.init($("#bbb"), $scope.treeSettings, response);
             var defaultObj = $scope.treeNodes[1];
             var node = treeEle.getNodesByParam("id", defaultObj.id)[0];
             $("#" + node.tId + "_a").addClass("curSelectedNode");*/
          })
        };
        $scope.getAllNodes();
        $scope.searchTreeNodes = function(searchValue) {
          //tree搜索框
          $scope.tree.searchNode(searchValue);
        };

      }
    };
    settingZtreeObj.init();
    //初始化ztree end
    /*活动列表自定义搜索start*/
    $scope.defaultFlag = true;
    $scope.searchObj = {
      "girdElement": angular.element("#RFMResults")[0],
      "girdElement2": angular.element("#customerRFMResults")[0],
      "searchHdButton": function() { //RFM指标列表
        this.girdElement.p.qtype = "keywords";
        this.girdElement.p.query = $scope.hdValue ? $scope.hdValue: "";
        this.girdElement.p.newp = 1;
        this.girdElement.grid.populate();
      },
      "searchHdButton2": function() { //客户RFM指标搜索
        this.girdElement2.p.qtype = "keywords";
        this.girdElement2.p.query = $scope.hdValue2 ? $scope.hdValue2: "";
        this.girdElement2.p.newp = 1;
        this.girdElement2.grid.populate();
      },
      //点击树更新
      "updateFromTreeClick": function(shopId, categoryCode, isPreset) {
        $scope.configuration.curClassificationId = shopId;
        this.girdElement.grid.addParams("shopId", shopId);
        this.girdElement.grid.addParams("categoryCode", categoryCode);
        this.girdElement.grid.addParams("isPreset", isPreset);
        this.girdElement.p.query = $scope.hdValue ? $scope.hdValue: "";
        this.girdElement.grid.populate();
        this.girdElement2.grid.addParams("shopId", shopId);
        this.girdElement2.grid.addParams("categoryCode", categoryCode);
        this.girdElement2.grid.addParams("isPreset", isPreset);
        this.girdElement2.p.query = $scope.hdValue2 ? $scope.hdValue2: "";
        this.girdElement2.grid.populate();
      }
    };
    $scope.updataone = function(){
      /*var girdElement3 = angular.element("#RFMResults")[0];
      girdElement3.p.newp = 1;
      $timeout(function(){
        girdElement3.grid.height = '500px';
        girdElement3.grid.populate();
      },500)*/
      if($scope.changeHeight){
        $("#table1 .flexigrid .bDiv").height($scope.changeHeight)
      }
    }
    $scope.updatatwo = function(){
      if($scope.changeHeight){
        $("#table2 .flexigrid .bDiv").height($scope.changeHeight)
      }
    }
    $(window).resize(function() {
      $timeout(function(){
        if( $("#table1 .flexigrid .bDiv").height() ){
          $scope.changeHeight = $("#table1 .flexigrid .bDiv").height();
        }
        if( $("#table2 .flexigrid .bDiv").height() ){
          $scope.changeHeight = $("#table2 .flexigrid .bDiv").height();
        }
      },100)
    });
    $scope.gridObj = {
      "compileTpl": function(b) {
        $compile(angular.element("#RFMResults"))($scope || b); //编译类为marketingList元素及子元素
        $scope.$apply(); //js改变angular属性值后必须apply下
      },
      "deleteCampaign": function() {}
    };
    /*活动列表自定义搜索end*/
    $scope.configuration = {
      "curClassificationId": "",
      //当前分类id
      "addConfig": function() {
        //console.log($scope.tree.getSelectedNodes());
        if ($scope.tree.getSelectedNodes().length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "请先选择分类",
            "mark": true
          });
        } else {
          this.switchILoadSrc();
        }
        $scope.isAddConfiguration = true;
      },
      "switchILoadSrc": function() { //配置弹框include src
        this.pop_src = baseUrl + "metaConfiguration/configurationPop.html"
      },
      "modification": function(categoryId, queryIteamId) { //修改
        this.switchILoadSrc();
        $scope.categoryId = parseInt(categoryId);
        $scope.queryIteamId = parseInt(queryIteamId);
        $scope.isAddConfiguration = false;
      },
      "showPopWindow": function() {
        $(".configurationPop").addInteractivePop({
          magTitle: "属性配置",
          mark: true,
          drag: true,
          position: "fixed",
          width: 640,
          height: 485
        })
      }
    };
    $('#RFMResults').flexigrid({ //属性列表grid
      url: GLOBAL_STATIC.datamanageRoot + 'rfm/',
      method: 'GET',
      dataType: 'json',
      colModel: [
        {
        display: '指标ID',
        name: 'rfmId',
        width: 20,
        sortable: false,
        dataindex: 'rfmId'
      },
      {
        display: '指标名称',
        name: 'rfmName',
        width: 20,
        sortable: false,
        dataindex: 'rfmName'
      },
      {
        display: '创建人',
        name: 'creator',
        width: 20,
        sortable: false,
        align: 'center',
        dataindex: 'creator'
      },
      {
        display: '创建时间',
        name: 'created',
        width: 20,
        sortable: false,
        align: 'center',
        dataindex: 'created',
        renderer: function(v) {
          return setISO(v, "all");
        }
      },
      {
        display: '备注',
        name: 'remark',
        width: 10,
        sortable: false,
        align: 'center',
        dataindex: 'remark',
        renderer: function(v) {
          return v == null ? '': '<a href="javascript:void(0)" class="couponMark" _title="' + v + '" onmouseover="viewMark(this,event)" onmouseout="hideMark()"></a>';
        }
      },
      {
        display: '状态',
        name: 'status',
        width: 10,
        align: 'center',
        dataindex: 'status',
        mapping: ['couponId'],
        convert: function(v, mappVal) {
          return '<a href="javascript:void(0)" class="' + (v ? "avaliableTrue": "avaliableFalse") + '" title="预置RFM不可被禁用"></a>'
        }
      }],
      sortname: '',
      sortorder: "asc",
      buttons: [],
      usepager: true,
      useRp: true,
      rp: 20,
      showTableToggleBtn: true,
      width: 'auto',
      height:'auto',
      colAutoWidth: true,
      onSuccess: function() {
        $scope.changeHeight = $("#table1 .flexigrid .bDiv").height();
        var scope = angular.element(angular.element("#RFMResults")).scope();
        scope.gridObj.compileTpl(scope);
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
    $('#customerRFMResults').flexigrid({ //属性列表grid
      url: GLOBAL_STATIC.datamanageRoot + 'rfm/order/',
      method: 'GET',
      dataType: 'json',
      colModel: [{
        display: '客户ID',
        name: 'pk.buyerNick',
        width: 80,
        sortable: false,
        dataindex: 'pk.buyerNick'
      },
      {
        display: '最后计算时间',
        name: 'updatedAt',
        width: 140,
        sortable: false,
        align: 'center',
        dataindex: 'updatedAt',
        renderer: function(v) {
          if (v) {
            return setISO(v, "all");
          } else {
            return "";
          }
        }
      },
      {
        display: '购买次数',
        name: 'numberPurchased',
        width: 140,
        sortable: false,
        dataindex: 'numberPurchased'
      },
      {
        display: '购买订单数',
        name: 'totalTradeCount',
        width: 140,
        sortable: false,
        dataindex: 'totalTradeCount'
      },
      {
        display: '购买金额',
        name: 'totalAmount',
        width: 140,
        sortable: false,
        align: 'center',
        dataindex: 'totalAmount'
      },
      {
        display: '购买件数',
        name: 'totalNumberOfItems',
        width: 140,
        sortable: false,
        align: 'center',
        dataindex: 'totalNumberOfItems'
      },
      {
        display: '退款次数',
        name: 'numberRefunded',
        width: 140,
        sortable: false,
        align: 'center',
        dataindex: 'numberRefunded'
      },
      {
        display: '退款金额',
        name: 'totalRefunded',
        width: 140,
        sortable: false,
        align: 'center',
        dataindex: 'totalRefunded'
      },
      {
        display: '最后一次购买时间',
        name: 'dateMostRecent',
        width: 140,
        sortable: false,
        align: 'center',
        dataindex: 'dateMostRecent',
        renderer: function(v) {
          if (v != null) {
            return setISO(v, "year");
          } else {
            return "";
          }
        }
      },
      {
        display: '最后一次购买金额',
        name: 'amountMostRecent',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'amountMostRecent'
      },
      {
        display: '最后一次购买间隔',
        name: 'intervalMostRecent',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'intervalMostRecent'
      },
      {
        display: '第一次购买时间',
        name: 'dateLeastRecent',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'dateLeastRecent',
        renderer: function(v) {
          if (v != null) {
            return setISO(v, "year");
          } else {
            return "";
          }
        }
      },
      {
        display: '第一次购买金额',
        name: 'amountLeastRecent',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'amountLeastRecent'
      },
      {
        display: '第一次购买间隔',
        name: 'intervalLeastRecent',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'intervalLeastRecent'
      },
      {
        display: '平均每次购买金额',
        name: 'averageAmount',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'averageAmount'
      },
      {
        display: '平均每次购买件数',
        name: 'averageNumberOfItems',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'averageNumberOfItems'
      },
      {
        display: '平均每次购买间隔',
        name: 'averageInterval',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'averageInterval'
      },
      {
        display: '平均发货到确认收货间隔',
        name: 'averageDeliveryInterval',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'averageDeliveryInterval'
      },
      {
        display: '最大单笔订单购买金额',
        name: 'maxTradeAmount',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'maxTradeAmount'
      },
      {
        display: '订单级优惠费用',
        name: 'totalTradeDiscountFee',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'totalTradeDiscountFee'
      },
      {
        display: '商品级优惠费用',
        name: 'totalItemDiscountFee',
        width: 120,
        sortable: false,
        align: 'center',
        dataindex: 'totalItemDiscountFee'
      }],
      sortname: '',
      sortorder: "asc",
      buttons: [],
      usepager: true,
      useRp: true,
      rp: 20,
      showTableToggleBtn: true,
      //colAutoWidth:true,
      //width: 'auto',
      onSuccess: function() {
        $scope.changeHeight = $("#table2 .flexigrid .bDiv").height();
        var scope = angular.element(angular.element("#customerRFMResults")).scope();
        scope.gridObj.compileTpl(scope);
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
  }
]);
