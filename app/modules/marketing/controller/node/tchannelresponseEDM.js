(function(window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  app.controller('tchannelresponseEDMCtrl', ["$scope", "$http", "$compile", "saveService", "getListService", "$filter","$timeout",
    function($scope, $http, $compile, saveService, getListService, $filter,$timeout) {
      $scope.responseEDM = {};
      $scope.responseEDM.name = "EDM响应";
      $scope.responseEDM.id = graph.nodeId;
      $scope.responseEDM.outputType = 0;

      $scope.getResponseEDM = function() {
        var callback = function(data) {
          $scope.responseEDM = data;
          $scope.nodecomment = data.remark;
          $scope.responseEDM.name = data.name || "EDM响应";
          $scope.responseEDM.outputType = data.outputType;
          if (!data.outputType || data.outputType == null || data.outputType == undefined) {
            $scope.responseEDM.outputType = 0;
          }
        }
        getListService.getResponseEDM(callback, $scope.getResponseEDM);
        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          $timeout(function(){
              $scope.responseEDM.tips=responseTips.tips || "";
              console.log(responseTips)
              if(responseTips.tips){
                $('.canNotUnderstand').show()
              }
          },50)
        }, "tchannelresponseEDM");
      }
      $scope.getResponseEDMUrl = function() {
        var callback = function(data) {
          $scope.responseEDMUrl = data;
          $scope.getResponseEDM();
        }
        getListService.getResponseEDMUrl(callback, $scope.getResponseEDMUrl);
      }
      $scope.getResponseEDMUrl();
      $scope.openNodePop();
      $scope.selectUrls = function() {
        for (var i = $scope.responseEDM.urls.length - 1; i >= 0; i--) {
          angular.forEach($scope.responseEDMUrl, function(val, key) {
            if (val.url == $scope.responseEDM.urls[i]) {
              val.check = true;
            }
          })
        };
        $(".selectUrl").addInteractivePop({
          magTitle: "URL选择",
          width: 888,
          mark: false,
          position: "fixed",
          childElePop: false
        });
      }

      $scope.saveUrls = function() {
        var selectedUrls = [];
        for (var i = $scope.responseEDMUrl.length - 1; i >= 0; i--) {
          if ($scope.responseEDMUrl[i].check == true) {
            selectedUrls.push($scope.responseEDMUrl[i].url);
          }
        };
        $scope.responseEDM.urls = selectedUrls;
        $(".selectUrl").hide()
      }
      $scope.closeSelectUrls = function() {
        $(".selectUrl").hide();
      }
      $scope.saveResponseEDM = function() {
        if (!$scope.responseEDM.name) {
          return
        }
        if ($scope.responseEDM.outputType == 3 && $scope.responseEDM.urls.length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "邮件中指定URL不能为空",
            "mark": true,
            "eleZindex": 20002,
            "markZindex": 20001
          });
          return
        }
        var subInfo = {
          id: $scope.responseEDM.id,
          name: $scope.responseEDM.name,
          remark: $scope.nodecomment,
          outputType: $scope.responseEDM.outputType,
          urls: $scope.responseEDM.urls
        };
        saveService.saveResponseEDM(function() {
          $("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          $scope.editNodeName($scope.responseEDM.id, $scope.responseEDM.name, $scope.nodecomment);
          removeAlert();
          //$scope.editNodeName($scope.responseEDM.id, $scope.responseEDM.name)
          $scope.refreshGraph();
        }, subInfo);
      }
    }
  ]);
})(window, angular, undefined);
