angular.module('ccmsApp').controller('discountMetaConfigCtrl', ['$scope', '$http', '$compile', '$templateCache', 'WhiteBlackDiscountConfigService',
  function($scope, $http, $compile, $templateCache, WhiteBlackDiscountConfigService) {
    WhiteBlackDiscountConfigService.getCadidates(function(response) {
      $scope.Cadidates = response;
      WhiteBlackDiscountConfigService.getSubject(function(data) {
        $scope.selectSubject = data;
        $scope.Cadidates.forEach(function(value, index) {
          $scope.selectSubject.forEach(function(v, i) {
            if (value.subjectId == v.subjectId) {
              $("#subjectList input[type=checkbox]").eq(index).attr("checked", "checked");
              $("#subjectList input[type=checkbox]").eq(index).attr("disabled", "disabled");
            }
          })
        })
      })

    })

    $scope.save = function() {
      var ids = [];
      $("#subjectList input[type=checkbox]").each(function(index) {
        if ($(this).attr("checked")) {
          ids.push({
            "subjectId": $scope.Cadidates[index].subjectId
          });
        }
      });
      WhiteBlackDiscountConfigService.postSubject(function(response) {}, ids);
    }
  }
]);

angular.module('ccmsApp').controller('directionalDiscountMetaConfigCtrl', ['$scope', '$http', '$compile', '$templateCache', 'WhiteBlackDiscountConfigService',
  function($scope, $http, $compile, $templateCache, WhiteBlackDiscountConfigService) {
    WhiteBlackDiscountConfigService.getCadidates(function(response) {
      $scope.Cadidates = response;
      WhiteBlackDiscountConfigService.getSubject(function(data) {
        $scope.selectSubject = data;
        $scope.Cadidates.forEach(function(value, index) {
          $scope.selectSubject.forEach(function(v, i) {
            if (value.subjectId == v.subjectId) {
              $("#subjectList input[type=checkbox]").eq(index).attr("checked", "checked");
              $("#subjectList input[type=checkbox]").eq(index).attr("disabled", "disabled");
            }
          })
        })
      })

    })

    $scope.save = function() {
      var ids = [];
      $("#subjectList input[type=checkbox]").each(function(index) {
        if ($(this).attr("checked")) {
          ids.push({
            "subjectId": $scope.Cadidates[index].subjectId
          });
        }
      });
      WhiteBlackDiscountConfigService.postSubject(function(response) {},ids);
    }
  }
]);

/*黑红名单 优惠 定向优惠节点配置控制器 end*/
