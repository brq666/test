angular.module("campaign.controllers").controller('tfilterBehaviorCtrl', ['$scope', 'getListService', '$compile', '$http',
  function ($scope, getListService, $compile, $http) {
  $scope.waitnode = {};
  getListService.getNodeTipsByType(function (responseTips) { // 获取tips
      $scope.waitnode.tips = responseTips.tips || "";
  }, "tfilterBehavior");

  // 监听弹框大小
  var nodeBehaviorWatch = "";
  $scope.$on("$destroy", function() {
    if(nodeBehaviorWatch) {
      nodeBehaviorWatch();
    }
  });
  nodeBehaviorWatch =  $scope.$watch(function() {
    var _main = $('#nodeContent .commWrapFour'),
        mainH = _main.outerHeight(true),
        mainT = _main.offset().top,
        winH = $(window).height();
        _main.css({
          'max-height': winH - mainT - 100,
          'overflow-y': 'auto',
          "overflow-x":"hidden"
        });
    $('#nodeContent .ccmsPublicPopMain').css('overflow-y', 'hidden');
  })

  $scope.isEditorFlag=(!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8)//节点是否可编辑，确定按钮是否显示,
  var timeDirec={
    init:function(){
      $scope.timeLastErr=false
      $scope.timeTypeLists=[{"type":1,"value":"绝对时间"},{"type":2,"value":"相对时间"}];
      $scope.curTimeList=$scope.timeTypeLists[0];
      $scope.model.timeType=$scope.model.timeType?$scope.model.timeType:1
      if($scope.model.timeType){
        var index=$scope.model.timeType*1-1
        $scope.curTimeList=$scope.timeTypeLists[index];
      }

      if($scope.model.timeType==1){
        /*  if($scope.model.endtime&&$scope.model.starttime){
           $scope.totleTimeValue= $scope.model.starttime+"~"+ $scope.model.endtime
        }else{
           $scope.totleTimeValue=$scope.model.starttime+"~"+ $scope.model.endtime
        }*/
        var startTime=$scope.model.starttime?$scope.model.starttime:""
        var endTime=$scope.model.endtime?$scope.model.endtime:""
        $scope.totleTimeValue=startTime+"~"+ endTime
      }
      if($scope.model.timeType==2){
        var begin=$scope.model.begin?"前"+$scope.model.begin+"天":" "
        var end=$scope.model.end?"前"+$scope.model.end+"天":" "
        $scope.totleTimeValue=begin+" ~  "+ end
      }
      var h=$scope.totleTimeValue.replace(/(^\s*)|(\s*$)/g,'')
      if(h=="~"){
        $scope.totleTimeValue=" "
      }

      if($scope.model.endtime){
        $scope.model.dateInput2=$scope.model.endtime.slice(0,10)
      }else{$scope.model.dateInput2=""}

      if($scope.model.starttime){
        $scope.model.dateInput1=$scope.model.starttime.slice(0,10)
        if(new  Date($scope.model.dateInput1).getTime()<new Date($scope.starDate).getTime()){
          //$scope.model.dateInput1=$scope.starDate
          $scope.model.dateInput1=""
          $scope.model.dateInput2=""
          $scope.timeLastErr=true
        }
      }else{
        $scope.model.dateInput1=""
        $scope.model.dateInput2=""
      }
      $scope.model.dateInput3=$scope.model.begin
      $scope.model.dateInput4=$scope.model.end
      this.event()
    },
    getSettingCustomValues:function(){
      var value = {};
      if($scope.curTimeList.type == 1) {//根据global状态判断
        $scope.model.timeType=1;
        $scope.model.dateInput3=""
        $scope.model.dateInput4=""
        value.totleTimeValue = $scope.model.dateInput1 + '~' + $scope.model.dateInput2;
      }else if($scope.curTimeList.type == 2){
        $scope.model.timeType=2;
        $scope.model.dateInput1=""
        $scope.model.dateInput2=""
        var begin=$scope.model.dateInput3?"前"+$scope.model.dateInput3+"天":" "
        var end=$scope.model.dateInput4?"前"+$scope.model.dateInput4+"天":" "
        value.totleTimeValue = begin + ' ~  ' +end;
      }
      return value;
    },
    getShopList:function(){
       var dtd = $.Deferred();
       $http({
         method: 'GET',
         url: GLOBAL_STATIC.componentRoot + 'shop/selector/' + CAMPAIGN_STATIC.tenantId + '?segmentationId=1'
       }).success(function(data){
         dtd.resolve(data)
       })
       return dtd.promise()
    },
    "sureAddShop":function(){
      var curElement=angular.element(".shopsChecked .cur a");
      if(curElement.length==0){
        $scope.model.shopId=$scope.shopSelect.shopId=""
        $scope.model.shopName=$scope.shopSelect.shopName=""
      }else{
        $scope.model.shopId=$scope.shopSelect.shopId=curElement.attr("id")
        $scope.model.shopName=$scope.shopSelect.shopName=curElement.text()
      }
      this.checkSelect()
      if(!$scope.shopSelectErr){
        this.getGoodList("cg")
      }
    },
    "cancelAddShop": function() {
      var curIndex = -1;
      $(".shopsChecked li").removeClass("cur");
      if($scope.model.shopId) {
        $scope.shopLists.forEach(function(item, index) {
          if(item.idInPlat == $scope.model.shopId) {
            curIndex = index;
          }
        });
      }
      if(curIndex !== -1) {
        $(".shopsChecked li").eq(curIndex).addClass("cur");
      }
    },
    checkSelect:function(){
      $scope.shopSelectErr=false
      if(!$scope.model.shopId){
        $scope.shopSelect.shopId=""
        $scope.shopSelect.shopName="请选择店铺"
        $scope.shopSelectErr=true
        /*return false*/
      }
    },
    getGoodList:function(parm){
      $http({
        method: 'GET',
        url: GLOBAL_STATIC.nodeRoot + 'node/behavior/getTop5/'+$scope.shopSelect.shopId
       }).success(function(data){
        $scope.goodsList=data
        if(parm=="cg"){
          $scope.model.snapshots=[]
          $scope.model.favoriteGoods=false
          $scope.shopsnap6=false
        }else{
          angular.forEach($scope.model.snapshots,function(data){
            data=data*1
            if(data==6){
              $scope.shopsnap6=true
            }
            var index=data-1
            if($scope.goodsList[index]){
              $scope.goodsList[index]["value"]=true
            }
          })
        }

        $scope.goods={}
        if($scope.model.favoriteGoods){
        if($scope.model.snapshots.length<($scope.goodsList.length*1+1)){
          $scope.goods.goodsHalf=true
        }else{
          $scope.goods.goodsAll=true
        }
        }else{
          $scope.goods.goodsNone=true
        }
      })
    },
    checkTime:function(){
      $scope.errorInput1=false
      $scope.errorInput2=false
      $scope.errorInput3=false
      $scope.errorInput4=false
      $scope.errorFlagTwo=false
      $scope.errorMessage=""
      if( $scope.model.timeType==1){
      /*   if(!$scope.model.dateInput1){
             $scope.errorInput1=true
             return false
         }*/

      /*   if(!$scope.model.dateInput2){
             $scope.errorInput2=true
             return false
         }*/
      }else{
      /*    if(!$scope.model.dateInput3){
             $scope.errorInput3=true
             $scope.errorMessage="请填写完整的区间的值"
             $scope.errorFlagTwo=true
             return false
         }
         if(!$scope.model.dateInput4){
             $scope.errorInput4=true
             $scope.errorMessage="请填写完整的区间的值"
             $scope.errorFlagTwo=true
             return false
         }*/
        if($scope.model.dateInput3&&$scope.model.dateInput3>7){
           $scope.errorInput3=true
           $scope.errorMessage="请填写正确的区间的值"
           $scope.errorFlagTwo=true
           return false

        }
        if($scope.model.dateInput4&&$scope.model.dateInput4<1){
           $scope.errorInput3=true
           $scope.errorMessage="请填写正确的区间的值"
           $scope.errorFlagTwo=true
           return false
        }
        if($scope.model.dateInput3&&$scope.model.dateInput4&&$scope.model.dateInput3<=$scope.model.dateInput4){
           $scope.errorInput3=true
           $scope.errorInput4=true
           $scope.errorMessage="请填写正确的区间的值"
           $scope.errorFlagTwo=true
           return false
        }
      }
      return true
    },
    event:function(){
      function closestPopPlug(element){
        element.closest(".ccmsPublicPop").hide();
        if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
          if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
            if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
              element.closest(".commCustomConfigBox").find(".childElementMark").remove(); //class commCustomConfigBox 自定义属性 专属class
            }
          } else {
            angular.element(".ccmsPublicPop").find(".childElementMark").remove();
          }
        } else {
          angular.element(".yunat_maskLayer:last").remove();
        }
      }
      $scope.clearSettingData=function(){
        //绝对时间清除操作
        function clearDate1() {
          $scope.model.dateInput1 = '';
          $scope.model.dateInput2 = '';
          $scope.model.dateInput3 = '';
          $scope.model.dateInput4 = '';
          $scope.errorInput1=false
          $scope.errorInput2=false
          $scope.errorInput3=false
          $scope.errorInput4=false
          $scope.errorMessage=""
          $scope.errorFlagOne=false;
          $scope.errorFlagTwo=false;
          angular.element(".absoluteInputClass").val("");
        }
        clearDate1();
      }
      $scope.editorTimeConditions = function(){
        if($scope.model.timeType!=$scope.curTimeList.type){
          var index=$scope.model.timeType*1-1
          $scope.curTimeList=$scope.timeTypeLists[index];
        }
        angular.element(".timeSetBox").addInteractivePop({magTitle:"请设置条件",width:300,mark:false,position:"fixed",childElePop:true});
      };
      $scope.sureTimeTypeValue=function(e){
        var saveData=this.getSettingCustomValues()
        if(!this.checkTime()){
          return false
        }
        $scope.totleTimeValue=saveData.totleTimeValue ;
        var h=$scope.totleTimeValue.replace(/(^\s*)|(\s*$)/g,'')
        if(h=="~"){
          $scope.totleTimeValue=" "
        }
        $scope.totleTimeValueErr=false
        $scope.timeLastErr=false
        closestPopPlug(angular.element(e.target));
      }.bind(this)
      $scope.openShopList=function(){
        $(".queryShopsPop").addInteractivePop({magTitle:"请选择店铺",width:734,mark:false,position:"fixed",childElePop:true});
        /*angular.forEach($scope.shopLists, function(val, key) {
          if(val.idInPlat == $scope.shopSelect.shopId){
            val.classVal = "cur";
            angular.element(".queryShopsPop .editorShops li:eq(" + key + ")").addClass("cur");
          }
          else{
            angular.element(".queryShopsPop .editorShops li:eq(" + key + ")").removeClass("cur");
          }
        });*/
      }
      $scope.sureAddShop=this.sureAddShop.bind(this)
      $scope.cancelAddShop=this.cancelAddShop.bind(this)
    }
}

  var obj1={
    init:function(){
      $scope.shopSelect={}
      $scope.unusedShops = []
      $scope.model={shopId:"",shopName:"",pc:"",wireless:false,favoriteShops:false,favoriteGoods:false,snapshots:[]}
      $.when(getListService.behavior( {id: graph.nodeId}),timeDirec.getShopList()).done(function(data,dataShop){
        var dbull=function(parm){
          if(typeof (parm)=="object"&&parm==null){
            return true
          }
        }
        if(dbull(data.pc)){
          data.pc=true
        }
        if(dbull(data.wireless)){
          data.wireless=true
        }
        if(data.snapshots){
          var snapShots=[]
          for(var i in data.snapshots){
           var topValue=data.snapshots[i]["topValue"]*1
           snapShots.push(topValue)
          }
          data.snapshots=snapShots
        }else{
          data.snapshots=[]
        }
        if(data.shopName){
          $scope.shopSelect.shopId=data.shopId
          $scope.shopSelect.shopName=data.shopName
          var isused = false
          angular.forEach(dataShop, function(val, key) {
            if(val.idInPlat === data.shopId) {
              isused = true;
            }
          })
          if(!isused) {
            $scope.unusedShops.push({
              'idInPlat': data.shopId,
              'name': data.shopName
            })
          }
          timeDirec.getGoodList()
        }
        else{
         if(dataShop.length == 1){
            $scope.shopSelect.shopId=dataShop[0].idInPlat
            $scope.shopSelect.shopName=dataShop[0].name
          }
        }
       /* data.starttime=""
        data.endtime=""*/
        /*data.snapshots=[]*/
        $scope.shopLists=dataShop
        $scope.shopLists = dataShop.map(function(item) {
          if(data.shopName && (item.idInPlat == data.shopId)) {
            item.class = 'cur';
          }
          else if( (dataShop.length == 1) && (item.idInPlat == $scope.shopSelect.shopId)){
            item.class = 'cur';
          }
          else {
            item.class = '';
          }
          return item;
        });
        $scope.model=data
        $scope.nodecomment = data.remark;

        timeDirec.init()
        this.event()
      }.bind(this))
      this.setTimeSelect()
    },
    event:function(){
      $scope.save=this.save
      $scope.getSnapshots=this.getSnapshots
      $scope.changeGoods=this.changeGoods.bind(this)
    },
    changeGoods:function(){
      var selectAll=function(){
        for(var i in $scope.goodsList){
          $scope.goodsList[i]["value"]=true
        }
        $scope.shopsnap6=true
      }

      var selectNone=function(){
        for(var i in $scope.goodsList){
          $scope.goodsList[i]["value"]=false
        }
        $scope.shopsnap6=false
      }
      var len=_.filter($scope.goodsList, function(num){ return num.value == true; });
      if($scope.shopsnap6){
        len.push(6)
      }
      if(len.length>0){
        if(len.length<($scope.goodsList.length*1+1)){
          $scope.goods={}
          $scope.goods.goodsAll=true
          $scope.model.favoriteGoods=true
          selectAll()
        }else{
          $scope.goods={}
          $scope.goods.goodsNone=true
          $scope.model.favoriteGoods=false
          selectNone()
        }
      }else{
        $scope.goods={}
        $scope.goods.goodsAll=true
        $scope.model.favoriteGoods=true
        selectAll()
      }
      $scope.model.snapshots=[]
      angular.forEach($scope.goodsList, function(data,index){
        if(data.value){
          var temp=index*1+1
          $scope.model.snapshots.push(temp)
        }
      });
      if($scope.shopsnap6){
        $scope.model.snapshots.push(6)
      }
    },
    getSnapshots:function(a,b){
      $scope.model.snapshots=[]
      angular.forEach($scope.goodsList, function(data,index){
        if(data.value){
          $scope.model.snapshots.push(index+1)
        }
      });
      if($scope.shopsnap6){
        $scope.model.snapshots.push(6)
      }

      var len=_.filter($scope.goodsList, function(num){ return num.value == true; });
      if($scope.shopsnap6){
        len.push(6)
      }
      if(len.length>0){
        $scope.model.favoriteGoods=true
        if(len.length<($scope.goodsList.length*1+1)){
          $scope.goods={}
          $scope.goods.goodsHalf=true
        }else{
          $scope.goods={}
          $scope.goods.goodsAll=true
          $scope.model.favoriteGoods=true
        }
      }else{
        $scope.goods={}
        $scope.goods.goodsNone=true
        $scope.model.favoriteGoods=false
      }
    },
    setTimeSelect:function(){
      var hh=function(parm){
        parm=parm.toString()
        if(parm.length<2){
          parm="0"+parm
        }
        return parm

      }
      $scope.isMid2=true
      var endDate=new Date()
      var starDate=new Date(endDate.getTime()-7*24*60*60*1000)
      var endtime=new Date(endDate.getTime()-1*24*60*60*1000)
      $scope.starDate=starDate.getFullYear()+"-"+ hh(starDate.getMonth()*1+1)+"-"+hh(starDate.getDate())
      $scope.endDate=endDate.getFullYear()+"-"+ hh(endDate.getMonth()*1+1)+"-"+hh(endDate.getDate())
      $scope.endtime=endtime.getFullYear()+"-"+ hh(endtime.getMonth()*1+1)+"-"+hh(endtime.getDate())
    },
    save:function(event){
      if($scope.isEditorFlag){
        return "节点数据不可编辑";
      };
      var model= _.pick($scope.model,"id","name","shopId","shopName","timeType","begin","end","pc","wireless","favoriteGoods","favoriteShops","snapshots")
      model.favoriteShops = model.favoriteShops ? true : false;
      console.log(model)
      if(!$scope.model.name) {
        return false
      }
      if($scope.model.version == 10010)   {
        model.timeType = '2'
        model.begin = '7'
        model.end = '1'
        model.starttime=$scope.starDate
        model.endtime=$scope.endtime
        model.remark=$scope.nodecomment
        timeDirec.checkSelect()
        if( $scope.shopSelectErr){
          return false
        }
        if(!$scope.totleTimeValue||$scope.timeLastErr==true){
          $scope.totleTimeValue="时间格式错误"
          $scope.totleTimeValueErr=true
          return false
        }
      } else{
        model.starttime=$scope.model.dateInput1
        model.endtime=$scope.model.dateInput2
        model.begin=$scope.model.dateInput3
        model.end=$scope.model.dateInput4
        model.remark=$scope.nodecomment
        timeDirec.checkSelect()
        if( $scope.shopSelectErr){
          return false
        }
        if(!$scope.totleTimeValue||$scope.timeLastErr==true){
          $scope.totleTimeValue="时间格式错误"
          $scope.totleTimeValueErr=true
          return false
        }
      }

      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/behavior/save',
        /*        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },*/
        data:model

      }).success(function (response, status, headers, config) {
        var element = angular.element(event.target);
        disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
        $("#nodeContent").hide();
        $(".yunat_maskLayer").hide();
        $(this).yAlert({"text":"保存成功"});
        removeAlert();
        $scope.editNodeName( graph.nodeId,response.name,$scope.nodecomment);

      }.bind(this)).error(function (data, status, headers) {
        $(document).Alert({"title": data.message, "str": data.description, "mark": true});
      })
    }
  }
  obj1.init()











  //获取失败
  function getDateError() {
      $(this).Alert({"title": "提示", "str": data.message, "mark": true});
  }

    //请求数据





    $scope.openNodePop();    //显示节点弹出框


}
]);
