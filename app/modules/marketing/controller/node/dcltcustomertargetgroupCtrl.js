angular.module("campaign.controllers").controller('dcltcustomertargetgroupCtrl', ['$scope', '$location', '$http', 'saveService', 'getListService',
  function($scope, $location, $http, saveService, getListService) {
    $scope.openNodePop(); //调用弹框方法

    //获取目标组信息
    $scope.targetgroupObj = {
      "nodeId": graph.nodeId,
      "jobId": graph.campJobid,
      "subjobId": null,
      "isWhiteZone": false,
      "viewTargetData": false,
      "showTargetDate": false,
      "targetsent": {
        "id": graph.nodeId
      },
      "targetnode": {
        "name": "",
        "id": "",
        "remark": "",
        "control": this.isWhiteZone ? 1 :0
      },
      "initNode": function() {
        var _this = this;
        getListService.dclGetTargetMessage(function(response) {
          $scope.nodecomment = response.remark ? response.remark: "";
          _this.targetnode.name = response.name ? response.name: "目标组";
          _this.targetnode.id = response.id ? response.id: "";
          _this.isWhiteZone = response.control === 1 || response.control === null;
        }, _this.targetsent);

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.targetnode.tips = responseTips.tips || "";
        }, "tcustomerdtargetgroup");
      },
      "saveTargetMssage": function() {
        var _this = this;
        _this.targetnode.control = _this.isWhiteZone ? 1 :0 ;
        var postFlag = true;
        if (!_this.targetnode.name) {
          return false;
        };
        if (postFlag) {
          _this.targetnode.remark = $scope.nodecomment;
          var putTargetData = $.extend({},
                  true, _this.targetnode),
              element = angular.element("#marketSure");
          if (putTargetData.percent) {
            putTargetData.percent = (putTargetData.percent * 1) / 100;
          };
          if (putTargetData.peopleCount) {
            putTargetData.peopleCount = (putTargetData.peopleCount * 1);
          };
          delete putTargetData.tips;

          disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
            saveService.dclTargetMessage(function() {
              disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
              $scope.editNodeName(_this.targetnode.id, _this.targetnode.name, $scope.nodecomment);
              $("#nodeContent").hide();
              $(".yunat_maskLayer").remove();
              $(this).yAlert({
                "text": "保存成功"
              });
              removeAlert();
            }, putTargetData, element)
          }, element);
        }
      }
    };

    getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
      if (response.subjobStatus > 20) {
        $scope.targetgroupObj.viewTargetData = true;
        $scope.targetgroupObj.subjobId = response.subjobId;
      }
      if (response.isShow === "true") {
        $scope.targetgroupObj.showTargetDate = true;
      }
    }, graph.nodeId, graph.campJobid);
    $scope.targetgroupObj.initNode();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    //查看数据
    $scope.showDataPop = function() {
      $(".queryDataListView").addInteractivePop({
        magTitle: "客户数据查看",
        width: 1200,
        mark: false,
        position: "fixed",
        childElePop: true
      });
      getListService.dclGetQueryDataResult($scope.targetgroupObj.subjobId, function(response) {
        if (!response) {
          return "没有数据"
        };
        if(response.result.length==0){
          $scope.targetgroupObj.reportDownLoadFlag=false;
        }else{
          $scope.targetgroupObj.reportDownLoadFlag = response.authority;
        }
        $scope.targetDataListsTitle = response.result[0] ? response.result[0] : [];
        console.log($scope.targetDataListsTitle);
        $scope.targetDataListsVal = (response.result && response.result.length > 1) ? response.result.slice(1) : [[], []];
        $scope.autoWidth = ($scope.targetDataListsTitle != 0 ? 100 / $scope.targetDataListsTitle.length + "%": "100%");
      });
    };

    $scope.disponseTargetResultData = function(v) {
      return (v == "null" ? "": v)
    }
  }
]);
