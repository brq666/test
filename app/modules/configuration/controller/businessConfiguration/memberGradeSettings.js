var app = angular.module('ccmsApp');
app.controller("memberGradeSettings", ["$scope", "$http", "getListService", "deleteService", "saveService",
  function($scope, $http, getListService, deleteService, saveService) {
    angular.element(".addTheme").hide();
    $scope.addOrModify = function(item) {
      console.log(item);
      $(".addTheme").addInteractivePop({
        magTitle: "新增主题",
        width: 570,
        mark: true,
        position: "fixed"
      });
      if (item) {
        $scope.a = {};
        $scope.a = item;
        $scope.a.subjectId = item.subjectId;
        $scope.a.gradeDicKey = item.gradeDicKey;
        $scope.a.shopDicKey = item.shopDicKey;
        console.log(item);
      } else {
        $scope.a = {}; //新增主题清空值；
      }
    }
    $scope.dele = function(item) {
      console.log(item);
      var id = item;
      var callback = function() {
        $scope.getMemberGradeSettings();
      }
      deleteServiceObj.deleteMemberGradeSetting(callback, id);

    }
    $scope.getSubject = function() {
      var callback = function(data) {
        $scope.subjects = data;
        $scope.getDic();
      }
      getListService.getSubject(callback, $scope.subjects);

    };

    $scope.getDic = function() {
      var callback = function(data) {
        $scope.dics = data;
        $scope.getMemberGradeSettings();
      }
      getListService.getDic(callback, $scope.dics);

    };
    $scope.getMemberGradeSettings = function() {
      var callback = function(data) {
        $scope.memberGradeSettings = data;
        $scope.memberGradeSettings.subjectName = "";
        for (var i = $scope.memberGradeSettings.length - 1; i >= 0; i--) {
          angular.forEach($scope.subjects, function(val, key) {
            if (val.subjectId == $scope.memberGradeSettings[i].subjectId) {
              $scope.memberGradeSettings[i].subjectName = val.subjectName;
            };
          });

          angular.forEach($scope.dics, function(val, key) {
            if (val.dicId == $scope.memberGradeSettings[i].shopDicKey) {
              $scope.memberGradeSettings[i].shopDicKeyName = val.dicName;
            };
          });

          angular.forEach($scope.dics, function(val, key) {
            if (val.dicId == $scope.memberGradeSettings[i].gradeDicKey) {
              $scope.memberGradeSettings[i].gradeDicKeyName = val.dicName;
            };
          });
        };

      }
      getListService.getMemberGradeSettings(callback, $scope.memberGradeSettings)
    }
    $scope.saveMemberGradeSetting = function() {
      var settingsItem = {
        id: $scope.a.id,
        subjectId: $scope.a.subjectId,
        shopDicKey: $scope.a.shopDicKey,
        gradeDicKey: $scope.a.gradeDicKey
      }
      if ($scope.a.id) {
        var callback = function() {
          $scope.getMemberGradeSettings();
          $(".addTheme").hide();
          $(".yunat_maskLayer").remove();
        }
        saveService.updateMemberGradeSetting(callback, settingsItem);

      } else {
        var callback = function() {
          $scope.getMemberGradeSettings();
          $(".addTheme").hide();
          $(".yunat_maskLayer").remove();
        }
        saveService.saveMemberGradeSetting(callback, settingsItem);
      }
    }
    $scope.getSubject();
  }
]);