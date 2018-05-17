/**
 * Created by dupenghui on 2014/8/11.
 */
angular.module("dataManage.controllers").controller('wechatCtrl', ["$scope", "$window", "$location", "$http", "$compile", "ngWeChatService", "$q",
  function($scope, $window, $location, $http, $compile, ngWeChatService, $q) {
      //搜索栏
    $scope.SearTools = {
        "Subject": {}, //主题-必选条件
        "Shop": {}, //店铺-必选条件
        "ShopValsView": "",
        "ShopIds": "",
        "isSelectedShops": [],
        "OptionalQueryItmes": {}, //可选条件
        "conditionId": null,
        "searchDelay": "", // 设定先取店铺再加载数据
        "dataLoading": true, // 是否正在加载数据
        "weChatNickname":"",
        "weChatOpenId":"",
        "searchButtonVal": "搜索",
        "startSearch": function() {
          if (this.dataLoading) {
            this.dataLoading = false;
            this.searchButtonVal = "数据加载中"
            this.changeData();
          }
        },
        "initData": function() { //初始化数据
          $scope.SubjectController.initData();
        },
        "GetResult": function(type) {
          var _this = this;
          var condition = {};
          condition.operator = "";
          condition.values = $scope.SearTools.ShopIds;

          var curPostData = {};
          curPostData.subjectId = _this.Subject.id;

          var conditons = $scope.getAllConditions();
          conditons.push(condition);

          curPostData.queryItems = conditons;
          //微信昵称和id
          //console.log( $('#edit10001 a').html() )
          this.weChatNickname=$('#edit10001 a').html();  //conditons[0].values
          this.weChatOpenId=$('#edit10002 a').html();

          //ngWeChatService.postConditions(function(response) {
            //_this.conditionId = response.conditionId;
            if (type == "init") {
              getOrderConfigList();
              _this.dataLoading = true;
              _this.searchButtonVal = "搜索";
            } else {
              $scope.gridObj.changeByParams();
            }
          //}, curPostData);
        },
        "searchData": function() { //第一次搜索
          var _this = this;
            _this.dataLoading = false;
            _this.searchButtonVal = "数据加载中";
            _this.GetResult("init")
        },
        "changeData": function() { //刷新
          var _this = this;
          _this.GetResult("other");
        }
        /*"getShops": function() {
          var _this = this;
          $(".customerShopsPop").addInteractivePop({
            magTitle: "请选择店铺",
            width: 760,
            height: 328,
            mark: true,
            position: "fixed"
          });
          angular.forEach($scope.mustQueryItems.configs, function(val, key) {
            var flag = false;
            angular.forEach(_this.isSelectedShops, function(v, k) {
              if (val.idInPlat == v.id) {
                flag = true;
              }
            });
            if (flag) {
              val.classVal = "cur";
              angular.element(".customerShopsPop .unitLists li:eq(" + key + ")").addClass("cur");
            } else {
              angular.element(".customerShopsPop .unitLists li:eq(" + key + ")").removeClass("cur");
            }
          })
        },
        "sureAddShop": function() {
          var _this = this;
          _this.isSelectedShops = [];
          var curElement = angular.element(".shopsChecked .cur a");
          curElement.each(function() {
            _this.isSelectedShops.push({
              "name": angular.element(this).text(),
              "id": angular.element(this).attr("id")
            });
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
            $scope.SearTools.ShopValsView = $scope.mustQueryItems.configs[0] ? $scope.mustQueryItems.configs[0].name : "";
            $scope.SearTools.ShopIds = allShopsAry[0];
            this.isSelectedShops.push({
              "name": $scope.SearTools.ShopValsView,
              "id": $scope.SearTools.ShopIds
            });
          }
        }*/
      }
      //主题
    $scope.SubjectController = {
        "titleName":"公众号:",
        "PublicNumberSubject": {},
        "PublicNumberSubjectNum":'',
        "PublicNumberName":'',
        "initData": function() { //加载主题列表
          var _this = this;
          ngWeChatService.getPublicNumberSubjects(function(response) {
            if( response.data.length==0 ){
               $scope.QueryItmesController.initData();
            }
            else{
              _this.PublicNumberSubject = response;
              $scope.SearTools.Subject = _this.PublicNumberSubject.data[0].offAcct;
              _this.PublicNumberName = response.data[0].offAcctName;
              _this.PublicNumberSubjectNum= response.data[0].offAcct;
              //$scope.SearTools.NumberId = _this.PublicNumberSubject.data[0].offAcct;
              $scope.QueryItmesController.initData();
            }

          })
        },
        "change_subject": function() { //切换主题，加载店铺和可选条件
          $scope.removeAllConditions();
          //$("#shop").hide();
          var PublicNowNumber=($('#selectF').find("option:selected").val()).substring(7)-1;
          var PublicNumberNow=this.PublicNumberSubject.data[PublicNowNumber].offAcct;
          this.PublicNumberSubjectNum=PublicNumberNow;
          this.PublicNumberName=this.PublicNumberSubject.data[PublicNowNumber].offAcctName;
          $scope.QueryItmesController.initData();
          /*if ($scope.SearTools.Shop != {}) {
            $("#shop").show();
          }*/

        }
      }
      //获取初始化数据
    $scope.globalConditions = {
      "disposeInitConditions": function(details) { //初始化
        angular.forEach(details, function(val, key) {
          if (details[val.queryItemId]) { // 行为自定义无details
            val.conditionOps = $.extend(true, {}, (val.queryItemId && details[val.queryItemId] ? details[val.queryItemId] : {}));
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
        var mockItems = {
          "details": {
            "10001": {
              "id": 10001,
              "name": "微信昵称",
              "type": "字符输入",
              "tip": "微信昵称支持模糊查询",
              "configs": {
                "StringLengthLimit": ["50"],
                "StringType": ["包含"]
              }
            },
            "10002": {
              "id": 10002,
              "name": "openid",
              "type": "字符输入",
              "tip": "openid仅支持精准查询",
              "configs": {
                "StringLengthLimit": ["50"],
                "StringType": ["包含"]
              }
            }
            /*"10003": {
              "id": 10003,
              "name": "性别",
              "type": "字典选择",
              "tip": "性别",
              "configs": [{
                "name": "女",
                "id": "f"
              }, {
                "name": "男",
                "id": "m"
              }]
            },
            "10004": {
              "id": 10004,
              "name": "关注时间",
              "type": "日期选择",
              "tip": "关注时间",
              "configs": {
                "StringLengthLimit": ["11"],
                "StringType": ["以字符开头"]
              }
            },
            "10005": {
              "id": 10005,
              "name": "是否绑定",
              "type": "字典选择",
              "tip": "是否绑定",
              "configs": [{
                "name": "是",
                "id": "f"
              }, {
                "name": "否",
                "id": "m"
              }]
            }*/
          }
        }
        var disposeData = $scope.globalConditions.disposeInitConditions(mockItems.details);
        $scope.addAllConditions(disposeData);
        $scope.SearTools.searchData();
      }
    };
    /*start 右击事件--隐藏弹窗窗或者enable复选框*/
    document.addEventListener("mousedown", function(e) {
      var target = e.target || e.srcElement;
      if ($(target).closest(".condition").length > 0) {

      } else {
        $(".condition .edit").each(function() {
          var isValue = $(this).find("a").html() == "";
          if (
            ($(this).siblings("section[data-type='add']").css("display") != "none") &&
            (!($(this).siblings("section[data-type='add']").hasClass("numberType")) && ($(this).siblings("section[data-type='add']").attr("default") != $(this).find("a").html()) || (($(this).siblings("section[data-type='add']").hasClass("numberType")) &&
              ($(this).siblings("section[data-type='add']").attr("default") == "valueChange")))
          ) {
            $(this).siblings("label").hide().end().show().siblings("section").find("button").click();
            $("section[data-type='add']").hide();
          }
        })
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
      "modelSrc": "", // 客户订单查询 修改属性模板入口
      "customerNo": "",
      "curAttrId": "",
      "showConfigAttrSrc": "",
      "addCustomAttrPage": true,
      "customList": "",
      "customVal": "",
      "girdElement": "",
      //use 表格列表行内编辑
      "itemEidt": function(p1) { //自定义数据权限
        var response=[
          {
            "id" : '1',
            "name" : "淘宝"
          }
        ];
        $scope.Pop.platId=null;
        $scope.Pop.account='';
        $scope.Pop.plats = response;
        $scope.Pop.OpenPop(p1);
      },
      "deleteEidt": function(p1,p2,p3) {
        $(this).Confirm({
          "title": "确认",
          "str": "是否解除绑定？",
          "mark": true
        }, function() {
          var param = {
            "requestInfoList" : [
              {
                "openId": p1,
                "offAcct": $scope.SubjectController.PublicNumberSubjectNum,
                "pltId": p2,
                "pltCustNo":p3
              }
            ]
          };
          ngWeChatService.deleteBilding(function(data) {
            console.log(data)
            if( data.code === 'SUCCESS' ){
              $(this).yAlert({"text": "解除成功"});
              removeAlert();
              angular.element("#couponListsGrid")[0].grid.populate();
            }
            else{
              $(this).Alert({"title":"提示","str": data.msg,"mark":true,"eleZindex":1010,"markZindex":1005});
            }
          }, param);
        })
      },
      "changeByParams": function() {
        //console.log( $('#edit10001 a').html() )

        this.girdElement.grid.addParams("offAcct", $scope.SubjectController.PublicNumberSubjectNum);
        this.girdElement.grid.addParams("nickName", $scope.SearTools.weChatNickname);
        this.girdElement.grid.addParams("openId", $scope.SearTools.weChatOpenId);
        this.girdElement.p.newp = 1;
        this.girdElement.grid.populate();
        //var _this = angular.element("#couponListsGrid")[0];
        //_this.grid.addParams("conditionId", $scope.SearTools.conditionId);
        //_this.grid.populate();
      },
      // 查看客户订单信息
      "orderInformationView": function(customerNo) { // 查看客户订单信息
        $scope.gridObj.customerNo = customerNo;
        this.modelSrc = "view/customerOrderInfo.html?_=" + new Date().getTime();

      },
      //编译模板用的  编译类为couponListsGrid元素及子元素
      "upCompile": function(curScope) {
        $compile(angular.element("#couponListsGrid"))($scope || curScope);
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
    };
    //编辑

    /*初始化上传插件 start*/
    var defaultOrigin=location.protocol+"//"+location.host;
    var uploader = new plupload.Uploader({
      runtimes : 'html5,flash,silverlight,html4',
      browse_button : 'portUpLoadFile',
      url : GLOBAL_STATIC.componentRoot + 'upload/',
      unique_names : true,
      multi_selection:false,
      file_data_name: 'Filedata',
      filters:{
        mime_types : [
          {title : "Text files", extensions : "txt"},
          {title : "Csv files", extensions : "csv"}
        ]
      },
      init:{
        BeforeUpload:function(up, files){
          if (files.size <= 1) {
              $(this).Alert({"title":"提示","str": "您上传的文件为空文件，请重新选择正确的文件","mark":true,"eleZindex":1010,"markZindex":1005});
              return false;
          }
          angular.element(".loadingPosition").removeClass("domNone");
          angular.element('#portUpLoadFile').val(files.name);
        },
        FilesAdded:function(up, files){
          uploader.start();
        },
        FileUploaded:function(up, file,responseObject){
          var matchLoadData=$.extend({},true,$scope.Batch.getEditorData());
          matchLoadData.fileName=($.parseJSON(responseObject.response)).fileId || "";
          delete matchLoadData.remark;
          ngWeChatService.portMatchLoadWeChat(function(response){
            angular.element(".loadingPosition").addClass("domNone");
            $scope.Batch.matchFileUploadFlag=false;
            $scope.Batch.isRollListShow=true;
            $scope.Batch.rollList=response.records;
            $scope.Batch.upLoadFileName=matchLoadData.fileName;
            $scope.Batch.startLoadBtnStatus=false; // 可以触发开始匹配
            $scope.Batch.weChatbatchId=response.batchId;
            angular.element(".commSmallBtn").addClass("btnBlue");
          },matchLoadData)
        },
        Error:function(up,errObject){
          angular.element(".loadingPosition").addClass("domNone");
          $scope.$apply(function(){
            $scope.Batch.matchFileUploadFlag=true;
            $scope.Batch.matchFileWarningText=errObject.status;
          });
        }
      }
    })
    uploader.init()
    /*angular.element("#portUpLoadFile").uploadify({
      'buttonClass' : 'uploadify_input_style',
      'method':"post",
      'swf' : defaultOrigin + root + GLOBAL_STATIC.rootModule + '/components/uploadify/uploadify.swf',
      'uploader' : GLOBAL_STATIC.ualRoot + 'upload/',
      'buttonText':'上传文件',
      'width':'200',
      'height':'20',
      'overrideEvents': ['onDialogClose', 'onSelect', 'onUploadSuccess', 'onSelectError'],
      'float':'left',
      'fileTypeExts' : '*.csv; *.txt',
      'successTimeout':'2',
      'onSelectError':function(){
        $(this).Alert({"title":"提示","str": "您上传的文件为空文件，请重新选择正确的文件","mark":true,"eleZindex":1010,"markZindex":1005});
      },
      "onUploadStart":function(file){
        angular.element(".loadingPosition").removeClass("domNone");
        angular.element('#portUpLoadFile').uploadify('settings','buttonText',file.name);
      },
      'onCancel' : function(file) {
        alert('The file ' + file.name + ' was cancelled.');
      },
      'onUploadSuccess' : function(file, data, response) {
        var matchLoadData=$.extend({},true,$scope.Batch.getEditorData());
        matchLoadData.fileName=($.parseJSON(data)).fileId || "";
        // matchLoadData.fileName = file.name;
        ngWeChatService.portMatchLoadWeChat(function(response){
          angular.element(".loadingPosition").addClass("domNone");
          $scope.Batch.matchFileUploadFlag=false;
          $scope.Batch.isRollListShow=true;
          $scope.Batch.rollList=response.records;
          $scope.Batch.upLoadFileName=matchLoadData.fileName;
          $scope.Batch.startLoadBtnStatus=false; // 可以触发开始匹配
          $scope.Batch.weChatbatchId=response.batchId;
          angular.element(".commSmallBtn").addClass("btnBlue");
        },matchLoadData)
      },
      'onUploadError' : function(file, errorCode, errorMsg, errorString) {
        $scope.$apply(function(){
          $scope.Batch.matchFileUploadFlag=true;
          $scope.Batch.matchFileWarningText=errorMsg;
        });
      }
    });*/
    /*初始化上传插件 end*/




    //批量绑定
    $scope.Batch = {
      "prevWeChatbatchId":0,
      "matchImportNumber":0,
      "matchDistinctNumber":0,
      "matchNumber":0,
      "matchPoint":0,
      "weChatbatchId":null,
      "matchFileFlag":false,
      "matchStatusMark":'请先进行文件匹配后再确定保存',
      "startLoadBtnStatus":true,
      "upLoadFileName":'',
      "fillData":function(){
        var resopn = [{
          "id":"1",
          "name":"淘宝"
        }];
        this.platformList=resopn;
        this.splitSign=0;
        angular.element('#portUpLoadFile').val('选择文件');
        //angular.element('#portUpLoadFile').uploadify('settings','buttonText','选择文件');
        this.headFlag = false;
        angular.element(".commSmallBtn").removeClass("btnBlue");
      },
      "getEditorData":function(){  //文件上传时给予后端的数据
        var _this=this;
        var discountEcData = {
          "delimiter": $scope.Batch.splitSign,
          "hasColumnName": $scope.Batch.headFlag
        }
        return discountEcData;
      },
      "getSplitData":function(){  //分隔符给予后端的数据
        var _this=this;
        var discountSplitData = {
          "delimiter": $scope.Batch.splitSign,
          "hasColumnName": $scope.Batch.headFlag,
          "fileName": $scope.Batch.upLoadFileName
        }
        return discountSplitData;
      },
      "getMatchData":function(){  //匹配时给予后端的数据
        var _this=this;
        var discountMatchData = {
          "delimiter": $scope.Batch.splitSign,
          "hasColumnName": $scope.Batch.headFlag,
          "offAcct": $scope.SubjectController.PublicNumberSubjectNum,
          "pltId":1,
          "batchId":$scope.Batch.weChatbatchId
        }
        return discountMatchData;
      },
      "viewSplitSign":function(){
        if( this.isRollListShow ){
          var putSplitData=$.extend({},true,$scope.Batch.getSplitData());
          ngWeChatService.viewSplitDataWeChat(function(response){
            $scope.Batch.rollList=response.records || [];
            $scope.Batch.weChatbatchId=response.batchId;
          },putSplitData);
        }
      },
      "dealNumber":function(n){
        if(isNaN(n)){
          return 0;
        }
        var stringNumber=n.toString();
        if(stringNumber.indexOf(".")!=-1){
          return stringNumber.substring(0,stringNumber.indexOf(".") + 3);
        }else{
          return  stringNumber;
        }
      },
      "startMatchData":function(){
        var _this=this;
        if(_this.startLoadBtnStatus && !_this.matchFileFlag){
          _this.matchButtonMark=true;
          return false;
        }
        if(!$scope.Batch.curPlatformId){
          $scope.Batch.platShow=true;
          return null;
        } else {
          $scope.Batch.platShow=false;
        }

        if(!_this.startLoadBtnStatus){
          _this.startLoadBtnStatus=true;
          _this.matchFileFlag=true;
          angular.element(".commSmallBtn").removeClass("btnBlue");
          var putMatchData=$.extend({},true,$scope.Batch.getMatchData());
          ngWeChatService.startMatchWechat(function(response){
            $scope.Batch.isRollListShow=false;
            _this.matchFileFlag=false;
            _this.matchImportNumber=response.importNumber || "";
            _this.matchDistinctNumber=response.distinctNumber || 0;
            _this.matchNumber=response.matchNumber || 0;
            _this.matchPoint=_this.dealNumber((response.matchNumber/response.distinctNumber)*100);
            $scope.Batch.weChatbatchId=response.batchId;
            $scope.Batch.prevWeChatbatchId = $scope.Batch.weChatbatchId;
            $scope.Batch.matchButtonMark=false;
            angular.element('#portUpLoadFile').val('选择文件');
            //angular.element('#portUpLoadFile').uploadify('settings','buttonText','选择文件'); // 设置文件为空
            _this.startLoadBtnStatus=true;
            _this.matchStatusMark="请重新选择文件，并完成匹配";
          },putMatchData);
        }
      },
      "showResponseData":function(){
        if(this.matchImportNumber==0){
          $(this).Alert({"title":"提示","str": "请先匹配文件","mark":true,"eleZindex":1010,"markZindex":1005});
          return;
        }
        $(".configAttrBox .matchDataListView").addInteractivePop({magTitle:"匹配数据查看",width:500,mark:false,position:"fixed",childElePop:true});
        ngWeChatService.getPortDataResultWechat($scope.Batch.prevWeChatbatchId,function(response){
          $scope.targetDataListsVal=(response.records&&response.records.length>0)?response.records:[];
        });
      },
      "getWechatPostData":function(){
        var _this=this;
        var wechatPostData ={
          "batchId": $scope.Batch.prevWeChatbatchId,
          "offAcct": $scope.SubjectController.PublicNumberSubjectNum,
          "pltId":1
        };
        return wechatPostData
      },
      "postDiscountWechatData":function(ent){
        if(!$scope.Batch.curPlatformId){
          $scope.Batch.platShow=true;
          return null;
        } else {
          $scope.Batch.platShow=false;
        }

        if(!$scope.Batch.matchImportNumber){
          $scope.Batch.matchButtonMark=true;
          return null;
        }
        ngWeChatService.postMatchNodeDataWechat(function(data){
          if(data.code === 'SUCCESS') {
            $(this).yAlert({"text": "绑定成功"});
            removeAlert();
            angular.element('.PopBatch').hide();
            $scope.Batch.cancelDiscountWechatData();
            $scope.gridObj.girdElement.p.newp = 1;
            $scope.gridObj.girdElement.grid.populate();
          } else {
            $(this).Alert({"title":"提示","str": data.msg,"mark":true,"eleZindex":1010,"markZindex":1005});
          }
        },$scope.Batch.getWechatPostData());
      },
      "cancelDiscountWechatData":function(){
        $scope.Batch.matchImportNumber=0;
        $scope.Batch.matchDistinctNumber=0;
        $scope.Batch.matchNumber=0;
        $scope.Batch.matchPoint=0;
        $scope.Batch.isRollListShow=false;
        $scope.Batch.matchButtonMark=false;
        $scope.Batch.platShow=false;
        $scope.Batch.matchStatusMark='请先进行文件匹配后再确定保存';
        $scope.Batch.curPlatformId = null;
        angular.element(".commSmallBtn").addClass("btnBlue");
      }
    };

    //隔离区
    $scope.Pop = {
      "PopOpenId": '',
      "OpenPop": function(p1) {
        this.PopOpenId=p1;
        $(".Pop").addInteractivePop({
          magTitle: "绑定平台账号",
          width: 470,
          mark: true,
          position: "fixed",
          childElePop: true
        });
      },
      "openPopBatch": function() {
          $(".PopBatch").addInteractivePop({
            magTitle: "批量绑定平台账号",
            width: 730,
            mark: true,
            position: "fixed",
            childElePop: true
          });
          $scope.Batch.fillData()
      },
      "platSave": function() {
        // 输入值检测
        var _this=this;
        $scope.$watch( 'Pop.account' ,function(newVal,oldVal){
          if( newVal ){
            _this.accountShow=false;
          }
        })
        $scope.$watch( 'Pop.platId' ,function(newVal,oldVal){
          if( newVal ){
            _this.platShow=false;
          }
        })
        if (!this.platId || !this.account) {
          if (!this.platId) {
            this.platShow = true;
          } else {
            this.platShow = false;
          }
          if (!this.account) {
            this.accountShow = true;
          } else {
            this.accountShow = false;
          }
          return false;
        }



        var param = {
            "requestInfoList" : [
              {
                "openId": $scope.Pop.PopOpenId,
                "offAcct": $scope.SubjectController.PublicNumberSubjectNum,
                "pltId": '1',
                "pltCustNo":$scope.Pop.account
              }
            ]
          };
          //发送值到后台
        ngWeChatService.bindingPlat(function(data) {
          if(data.code === 'SUCCESS') {
            $(this).yAlert({"text": "绑定成功"});
            removeAlert();
            angular.element('.Pop').hide();
            angular.element("#couponListsGrid")[0].grid.populate();
            //$('#couponListsGrid').flexReload();
            //$scope.gridObj.changeByParams();
          } else {
            $(this).Alert({"title":"提示","str": data.msg,"mark":true,"eleZindex":1010,"markZindex":1005});
          }
        }, param);

      }
    }

    var getOrderConfigList = function() {
      var $attributeGridElement = $("<div id='couponListsGrid'></div>");
      $(".couponListssBox").html("").append($attributeGridElement);
      $('#couponListsGrid').flexigrid({
        url: GLOBAL_STATIC.datamanageRoot + 'wechat/cust/bind/info?_=' + new Date().getTime(),
        method: 'GET',
        dataType: 'json',
        contentType: '',
        params: [{
          "name": "offAcct",
          "value": $scope.SubjectController.PublicNumberSubjectNum
        }],
        colModel: [{
          display: '微信头像',
          name: 'headImgUrl',
          width: 1.5,
          sortable: false,
          align: 'center',
          dataindex: 'headImgUrl',
          renderer: function(v) {
            if( v ){
              return '<img src="' + v + '" style="width:24px;height:24px;" />';
            }
            else{
              return '<span>-</span>';
            }
          }
        },
          {
            display: '微信昵称',
            name: 'nickName',
            width: 1.5,
            height: "auto",
            sortable: false,
            align: 'left',
            dataindex: 'nickName',
            renderer: function(v) {
              return v ? '<span title="' + v + '">' + v + '</span>' : '<span>-</span>'
            }
          },
          {
            display: 'openid',
            name: 'openId',
            width: 1.5,
            height: "auto",
            sortable: false,
            align: 'left',
            dataindex: 'openId',
            renderer: function(v) {
              return v ? '<span title="' + v + '">' + v + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '性别',
            name: 'sex',
            width: 1,
            height: "auto",
            sortable: false,
            align: 'left',
            dataindex: 'sex',
            renderer: function(v) {
              if( v==1 ){
                return '<span title="男">男</span>';
              }
              else if( v==2 ){
                return '<span title="女">女</span>';
              }
              else if( v==0 ){
                return '<span title="未知">未知</span>';
              }
            }
          },
          {
            display: '省份',
            name: 'province',
            width: 1,
            sortable: false,
            align: 'left',
            dataindex: 'province',
            renderer: function(v){
               return v ? '<span title="' + v + '">' + v + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '城市',
            name: 'city',
            width: 1,
            sortable: false,
            align: 'left',
            dataindex: 'city',
            renderer: function(v){
               return v ? '<span title="' + v + '">' + v + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '关注时间',
            name: 'subscribeTime',
            width: 1.5,
            sortable: false,
            align: 'center',
            dataindex: 'subscribeTime',
            renderer: function(v){
               return v ? '<span title="' + setISO(v, "all") + '">' + setISO(v, "all") + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '平台',
            name: 'pltId',
            width: 0,
            hide:true,
            sortable: false,
            align: 'center',
            dataindex: 'pltId',
            renderer: function(v){
               return v ? '<span title="' + v + '">' + v + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '绑定平台',
            name: 'pltName',
            width: 1.5,
            sortable: false,
            align: 'left',
            dataindex: 'pltName',
            renderer: function(v){
               return v ? '<span title="' + v + '">' + v + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '平台账号',
            name: 'pltCustNo',
            width: 1.5,
            sortable: false,
            align: 'left',
            dataindex: 'pltCustNo',
            renderer: function(v){
               return v ? '<span title="' + v + '">' + v + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '绑定时间',
            name: 'doneDate',
            width: 1.5,
            sortable: false,
            align: 'center',
            dataindex: 'doneDate',
            mapping: ["status"],
            convert: function(v, mappVal){
               return (v && mappVal[0] != 2) ? '<span title="' + setISO(v, "all") + '">' + setISO(v, "all") + '</span>' : '<span>-</span>'
            }
          },
          {
            display: '状态',
            name: 'status',
            width: 0,
            sortable: false,
            hide:true,
            align: 'center',
            dataindex: 'status',
            renderer: function(v) {
              if( v==1 ){
                return '<span title="绑定">绑定</span>';
              }
              else if( v==2 ){
                return '<span title="未绑定">未绑定</span>';
              }
            }
          },
          {
            display: '操作',
            name: 'operation',
            width: 1,
            sortable: false,
            align: 'center',
            mapping: ["openId","pltId","pltCustNo","status"],
            convert: function(v, mappVal) {
              if( mappVal[3]==2 ){
                return '<a href="javascript:void(0);" style="color:#2f9ac6;" class="weChatbundling" title="绑定" ng-click="gridObj.itemEidt(\'' + mappVal[0] + '\')" >绑定</a>'
              }
              return '<a href="javascript:void(0);" class="weChatbundling" title="解除绑定" ng-click="gridObj.deleteEidt(\'' + mappVal[0] + '\', \'' + mappVal[1] + '\', \'' + mappVal[2] + '\');">解除绑定</a>';

            }
          }],
          sortname: '',
          sortorder: "asc",
          updateDefaultParam: 'custom',
          customParams: ['page', 'size'],
          buttons: [],
          usepager: true,
          useRp: true,
          rp: 20,
          showTableToggleBtn: true,
          colAutoWidth: true,
          autoload: false,
          rowDblClick: function () {
            $(".orderConfigContent").show();
          },
          onSuccess: function (data) {
              var scope = angular.element($("#couponListsGrid")).scope();
              scope.gridObj.upCompile(scope);
              $scope.$apply(function(){
                  $scope.SearTools.dataLoading=true;
                  $scope.SearTools.searchButtonVal="搜索";
              });
          },
          onError: function (response) {
              if (response.status == 302) {
                  location.pathname = root + 'login.html';
              }
          }
      });
      $scope.gridObj.girdElement = angular.element("#couponListsGrid")[0];
      $scope.gridObj.girdElement.grid.addParams("offAcct", $scope.SubjectController.PublicNumberSubjectNum);
      $scope.gridObj.girdElement.grid.populate();
    }
  }
]);
