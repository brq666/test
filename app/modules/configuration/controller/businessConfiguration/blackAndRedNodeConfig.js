/*黑红名单 优惠 定向优惠配置控制器 start*/
angular.module('ccmsApp').controller('BlackAndRedCtrl', ['$scope', '$http', '$compile', '$templateCache', 'WhiteBlackNodeConfigService',
  function($scope, $http, $compile, $templateCache, WhiteBlackNodeConfigService) {
    $scope.loadData = function() {
      WhiteBlackNodeConfigService.getNodeList(function(response) {
        $scope.ListNode = response;
      })
    }
    $scope.loadData();

    $scope.Pop = {
      "addOrModify": function() {
        WhiteBlackNodeConfigService.getSubjects(function(response) {
          $scope.Subjects = response;
        });

        $(".addPop").addInteractivePop({
          magTitle: "黑红名单配置",
          mark: true,
          width: 400,
          drag: true,
          position: "fixed",
          "eleZindex": 1001
        });
      },
      "ChangeSubject": function() {
        if ($scope.subject != undefined) {
          WhiteBlackNodeConfigService.getAttributes(function(response) {
            $scope.attributes = response;
          }, $scope.subject.subjectId);
          $("#mobile").removeAttr("disabled");
          $("#mail").removeAttr("disabled");
        } else {
          $("#mobile").attr("disabled", "disabled");
          $("#mail").attr("disabled", "disabled");
          $scope.mail = {};
          $scope.mobile = {};
        }
      },
      "addPopSave": function() {
        if ($scope.subject == undefined) {
          $scope.subjectShow = true;
          return;
        } else {
          $scope.subjectShow = false;
        }
        if ($scope.mobile == undefined || $scope.mobile == {}) {
          $scope.mobileShow = true;
          return;
        } else {
          $scope.mobileShow = false;
        }
        if ($scope.mail == undefined || $scope.mail == {}) {
          $scope.mailShow = true;
          return;
        } else {
          $scope.mailShow = false;
        }
        if ($scope.mail == $scope.mobile) {
          $(this).yAlert({
            "text": "手机号属性和邮箱属性不能一样"
          });
          removeAlert();
          return;
        }
        var param = {
          "subjectId": $scope.subject.subjectId,
          "subjectName": $scope.subject.subjectName,
          "phoneAttributeKey": $scope.mobile.attributeKey,
          "phoneAttributeName": $scope.mobile.attributeName,
          "emailAttributeKey": $scope.mail.attributeKey,
          "emailAttributeName": $scope.mail.attributeName
        }

        WhiteBlackNodeConfigService.postNode(function(response) {
          $(this).yAlert({
            "text": "新增成功"
          });
          removeAlert();
          $scope.loadData();
          $(".addPop").hide();
        }, param);
      }
    }
  }
]);