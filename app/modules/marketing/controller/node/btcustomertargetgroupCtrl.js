angular.module("campaign.controllers").controller('btcustomertargetgroupCtrl', ['$scope', '$location', '$http', '$interval', 'saveService', 'getListService',
  function($scope, $location, $http, $interval, saveService, getListService) {
    $scope.openNodePop(); //调用弹框方法
    getListService.nodeStatus(function(response) { // 打开节点获取节点的状态——用途：涉及到查看报告
      if (response.subjobStatus > 20) {
        console.log(response);
        $scope.targetgroupObj.viewTargetData = true;
        $scope.targetgroupObj.subjobId = response.subjobId;
      }
      if (response.isShow === "true") {
        $scope.targetgroupObj.showTargetDate = true;
      }
    }, graph.nodeId, graph.campJobid);

    //获取目标组信息
    $scope.targetgroupObj = {
      "nodeId": graph.nodeId,
      "jobId": graph.campJobid,
      "subjobId": null,
      "viewTargetData": false,
      "targetsent": {
        "id": graph.nodeId
      },
      "targetnode": {
        "name": "",
        "id": "",
        "controlType": "",
        "percent": null,
        "peopleCount": null,
        "remark": ""
      },
      "percentShow": false,
      "peopleCountShow": false,
      "initNode": function() {
        var _this = this;
        getListService.getTargetMessage(function(response) {
          $scope.nodecomment = response.remark ? response.remark: "";
          _this.targetnode.name = response.name ? response.name: "目标组";
          _this.targetnode.id = response.id ? response.id: "";
          _this.targetnode.controlType = response.controlType ? response.controlType: 1;
          if (response.controlType && response.controlType == 1) {
            _this.targetnode.percent = response.percent ? (disposeCommMethod.handleBooleNumber(response.percent, 100)) : null;
          } else {
            _this.targetnode.peopleCount = response.peopleCount ? response.peopleCount: null;
          }
        }, _this.targetsent)

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          _this.targetnode.tips = responseTips.tips || "";
        }, "tcustomertargetgroup");
      },
      "saveTargetMssage": function() {
        var _this = this;
        var postFlag = true;
        if (!_this.targetnode.name) {
          return false;
        };
        if (_this.targetnode.controlType == 2) {
          if (this.targetnode.peopleCount == "0") {
            postFlag = false;
            _this.peopleCountShow = true;
          } else {
            _this.peopleCountShow = false;
            postFlag = true;
          }
        } else {
          if (_this.targetnode.percent == "0" || _this.targetnode.percent == "0.0") {
            postFlag = false;
            _this.percentShow = true;
          } else {
            _this.percentShow = false;
            postFlag = true;
          }
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
            saveService.TargetMessage(function() {
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
    $scope.targetgroupObj.initNode();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    //只能输入一位小数点
    $scope.numcheck = function(obj) {
      if ($scope.targetgroupObj.targetnode.percent > 100) {
        $scope.targetgroupObj.targetnode.percent = 100;
      }
      $scope.targetgroupObj.targetnode.percent = String($scope.targetgroupObj.targetnode.percent).replace(/[^\d.]/g, "").replace(/^0\d+/, "0"); //先把非数字的都替换掉，除了数字和.
      $scope.targetgroupObj.targetnode.percent = String($scope.targetgroupObj.targetnode.percent).replace(/^\./g, ""); //必须保证第一个为数字而不是.
      $scope.targetgroupObj.targetnode.percent = String($scope.targetgroupObj.targetnode.percent).replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
      $scope.targetgroupObj.targetnode.percent = String($scope.targetgroupObj.targetnode.percent).replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //保证.只出现一次，而不能出现两次以上
      var arr = $scope.targetgroupObj.targetnode.percent.split(".");
      if (arr[0] != 100) {
        arr[0] = arr[0].substring(0, 2);
      }
      if (arr[1]) {
        arr[1] = arr[1].substring(0, 1);
      }
      $scope.targetgroupObj.targetnode.percent = arr.join(".");
    };
    //查看数据
    $scope.showDataPop = function() {
      $scope.existFile = "false";
      $scope.checkFile$ || ($scope.checkFile$ = $interval(function() {
        $scope.existFile === "true" || getListService.checkFileTargetResult($scope.targetgroupObj.subjobId, function(data) {
          $scope.existFile = data.existFile;
        });
        if ($scope.existFile === "true") {
          $interval.cancel($scope.checkFile$);
          $scope.checkFile$ = undefined;
        }
      }, 3000));
      $(".queryDataListView").addInteractivePop({
        magTitle: "客户数据查看",
        width: 1200,
        mark: false,
        position: "fixed",
        childElePop: true,
        closeFn: function() {
          $interval.cancel($scope.checkFile$);
          $scope.checkFile$ = undefined;
        }
      });
      getListService.getQueryDataResult($scope.targetgroupObj.subjobId, function(response) {
        if (!response) {
          return "没有数据"
        };
        if(response.result.length==0){
          $scope.targetgroupObj.reportDownLoadFlag=false;
        }else{
          $scope.targetgroupObj.reportDownLoadFlag = response.authority;
        }

        $scope.targetDataListsTitle = response.result[0] ? response.result[0] : [];
        console.log($scope.targetDataListsTitle)
        $scope.targetDataListsVal = (response.result && response.result.length > 1) ? response.result.slice(1) : [[], []];
        $scope.autoWidth = ($scope.targetDataListsTitle != 0 ? 100 / $scope.targetDataListsTitle.length + "%": "100%");
      });
    };

    $scope.disponseTargetResultData = function(v) {
      return (v == "null" ? "": v)
    }
    //清空
    $scope.$watch("targetgroupObj.targetnode.controlType", function(newId, oldId) {
      if (oldId == "") {
        return false;
      }

      $scope.targetgroupObj.targetnode.percent = null;
      $scope.targetgroupObj.targetnode.peopleCount = null;
    });
  }
]);
