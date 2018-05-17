/**
 * Created by dupenghui on 2015/3/6.
 */
/**
 * Created by dupenghui on 2014/9/19.
 */
angular.module("campaign.controllers").controller('tfilterHeatCtrl', ['$scope', 'getListService', '$compile', '$http', function($scope, getListService, $compile, $http) {
  $scope.waitnode = {};
  getListService.getNodeTipsByType(function (responseTips) { // 获取tips
    $scope.waitnode.tips = responseTips.tips || "";
  }, "tfilterHeat");
  $scope.styleclass="odd"
  $scope.isEditorFlag=(!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8)//节点是否可编辑，确定按钮是否显示,

  $scope.model = {
    "id": graph.nodeId,
    "name": "营销热点",
    "remark": null,
    "shopId":""
  };
  var obj1={
    init:function(){
      $scope.shopSelect={};
      $scope.reg1=false;
      $scope.unusedShops = []
      $.when(getListService.tfilterHeat( {id: graph.nodeId}),this.getShopList()).done(function(data,dataShop){
        $scope.nodecomment = data.remark;
        if(data.shopName){
          $scope.shopSelect.shopId=data.shopId;
          $scope.shopSelect.shopName=data.shopName;
          var isused = false;
          angular.forEach(dataShop, function(val, key) {
            if(val.idInPlat === data.shopId) {
              isused = true;
            }
          });
          if(!isused) {
            $scope.unusedShops.push({
              'idInPlat': data.shopId,
              'name': data.shopName
            })
          }
        }else{
          if(dataShop.length == 1){
            $scope.shopSelect.shopId = $scope.selected =dataShop[0].idInPlat;
            $scope.shopSelect.shopName=dataShop[0].name;
          }
        }
        if(data.grades){
          var grades=[]
          for(var i in data.grades){
            var grade=6-data.grades[i]["grade"]*1
            grades.push(grade)
          }
          data.grades=grades
        }else{
          data.grades=[5]
        }
        $scope.gradeList=[{label:'低',name:false},{label:'较低',name:false},{label:'中',name:false},{label:'较高',name:false},{label:'高',name:false}]
        _.each(data.grades,function(a,b){
          var index=a*1-1
          $scope.gradeList[index]["name"]=true
        })
        $scope.shopLists=dataShop
        $scope.model=data;
      })
      this.event()
    },
    event:function(){
      $scope.openShopList=function(){
        $(".queryShopsPop").addInteractivePop({magTitle:"请选择店铺",width:734,mark:false,position:"fixed",childElePop:true});
        _.each($scope.shopLists, function(val, key) {
          if($scope.selected == val.idInPlat) {
            angular.element('.unitLists li').removeClass('cur').eq(key).addClass('cur');
          }
        })
      }
      $scope.sureAddShop=this.sureAddShop.bind(this)
      $scope.save=this.save.bind(this)
      $scope.changeReg1=function(parm){
        if(parm){
          $scope.reg1=false
        }
      }
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
    checkSelect:function(){
      $scope.shopSelectErr=false
      if(!$scope.selected){
        $scope.shopSelect.shopId=""
        $scope.shopSelect.shopName="请选择店铺"
        $scope.shopSelectErr=true
          /*return false*/
      }
    },
    "sureAddShop":function(){
      var curElement=angular.element(".shopsChecked .cur a");
      if(curElement.length==0){
        $scope.selected=$scope.shopSelect.shopId=""
        $scope.model.shopName=$scope.shopSelect.shopName=""
      }else{
       $scope.selected=$scope.shopSelect.shopId=curElement.attr("id")
        $scope.model.shopName=$scope.shopSelect.shopName=curElement.text()
      }
      this.checkSelect()
    },
    "save":function(e){
      if($scope.isEditorFlag || !$scope.model.name){
        return "节点数据不可保存";
      };
      this.checkSelect()
      if( $scope.shopSelectErr){
        return false
      }
      var model= _.pick($scope.model,"id","name","shopId","shopName")
      var grades=[]
      _.each($scope.gradeList,function(data, index){
        index++
        if(data.name){
          grades.push(6-index)
        }
      })
      if(grades.length<1){
        $scope.reg1=true
        return false
      }
      model.name = model.name.replace(/\s*/g, '');
      model.grades=grades
      model.remark=$scope.nodecomment
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/heat/save',
        /*        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },*/
        data:model
      }).success(function (response, status, headers, config) {
        var element = angular.element(e.target);
        disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
        $("#nodeContent").hide();
        $(".yunat_maskLayer").hide();
        $(this).yAlert({"text":"保存成功"});
        removeAlert();
        $scope.editNodeName( graph.nodeId,response.name,$scope.nodecomment);
      }.bind(this)).error(function (data, status, headers) {
        $(document).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
      })
    }
  }
  obj1.init()
  $scope.openNodePop();    //显示节点弹出框
}]);
