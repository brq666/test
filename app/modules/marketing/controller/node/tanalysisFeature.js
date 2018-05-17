angular.module("campaign.controllers").controller('featureController', ['$scope', '$rootScope', '$http', 'getListService', '$q', function ($scope,$rootScope,$http,getListService,$q){
  $scope.openNodePop();//调用弹框方法
  getListService.nodeStatus(function (response) { // 打开节点获取节点的状态——用途：涉及到查看报告
    /*if (response.subjobStatus > 20) {
      $scope.featureObj.viewAnalysisDataFlag = true;
    }*/
    //测试执行不显示下载报告
    $scope.isTestStatus=(!response.isTest || response.isTest!=1) ? true :false;
  }, graph.nodeId, graph.campJobid);
  var delayanalysis = $q.defer();
  $scope.featureObj = {
    'analysisList': [],
    'analysisItems': [],
    'checkedZtree': '',
    'fillData': function() {
      var _this = this,useabledShops=[];
      _this.jobId = graph.campJobid || "";
      getListService.openFeatureNode(function(response) {
        _this.name = response.name || "客户特征分析";
        _this.id = response.id || (response.id && "");
        $scope.nodecomment = response.remark || "" ;
        _this.analysisList = response.analysisItems || [];
        $scope.featureObj.viewAnalysisDataFlag=response.hasReport;// 分析报告的开关
        if(_this.analysisList.length === 0) {
          $q.all(delayanalysis).then(function() {
            angular.forEach(_this.analysisItems, function(val ,key) {
              if(val.dataType === "I") {
                _this.analysisList.push({
                  name: val.pId == 10002 ? '会员等级：' + val.name : val.name,
                  id: val.id,
                  pId: val.pId
                })
              }
            });
          })
        }
      });
      getListService.getNodeTipsByType(function(responseTips){ // 获取tips
        _this.tips = responseTips.tips || "";
      },"tanalysisFeature");
    },
    'getFeaturanalysis': function() {
      var callBack = function(response) {
        $scope.featureObj.analysisItems = response.data || [];
        $scope.featureObj.initCheckedZtree($scope.featureObj.analysisItems);
        delayanalysis.resolve()
      };
      getListService.getAnalysisItems(callBack)
    },
    'initCheckedZtree': function(data) {
      angular.forEach(data, function(val ,key) {
        if(val.dataType === 'I') {
          val.checked = true;
          val.chkDisabled = true;
        } else{
          val.open = true;
        }
      });
      var settings = '';
      var _this = this;
      settings = {
        check: {
          enable: true,
          chkStyle: "checkbox",
          chkboxType: {
            "Y": "",
            "N": ""
          }
        },
        data: {
          key: {
            title: "name"
          },
          simpleData: {
            enable: true
          }
        },
        view: {
          addDiyDom: function(treeId, treeNode) {
            var spaceWidth = 20;
            var switchObj = $("#" + treeNode.tId + "_switch"),
                icoObj = $("#" + treeNode.tId + "_ico"),
                checkObj = $("#" + treeNode.tId + "_check");
            switchObj.remove();
            icoObj.before(switchObj);
            switchObj.after(checkObj);
            var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
            switchObj.before(spaceStr);
            if (treeNode.isParent) {
              $("#" + treeNode.tId + "_check").remove();
            } else{
              $("#" + treeNode.tId + "_ico").remove();

            }
          },
          dblClickExpand: false,
          showIcon: true
        },
        callback: {
          onCheck: function() {

          }
        }
      };

      $.fn.zTree.init($('.featureNode .checkoutZtree'), settings, data);
    },
    'postFeatureData': function(even) {
      var _this = this;
      var analysisIds = [];
      if(_this.name==""){
        return false;
      };

      var featureData = {
        "id": graph.nodeId,
        "name": _this.name,
        "remark": $scope.nodecomment
      }
      angular.forEach(_this.analysisList, function(val, key) {
        analysisIds.push(val.pId + '-' + val.id);
      });

      featureData.analysisItems = analysisIds.join();


      var element=angular.element(even.target);
      disposeCommMethod.shuyunAjaxButtonClickMethod(function(){
        getListService.putAnalysisItems(function(response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          element.closest("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({"text":"保存成功"});
          removeAlert();
          $scope.editNodeName(featureData.id, featureData.name, featureData.remark);
        },featureData);
      },element);
    },
    'openResult': function() {
      // 查看分析报告
      this.reportTemplate =  CAMPAIGN_STATIC.tplBasePath + "view/node/tanalysisFeatureView/tanalysisFeatureReport.html?_="+new Date().getTime();
    }
  };
  $scope.featureObj.getFeaturanalysis();
  $scope.featureObj.fillData();


  disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
}]);
