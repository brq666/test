/*短信节点配置控制器 start*/
angular.module('ccmsApp').controller('ProductCtrl', ['$scope', '$http', '$compile', '$templateCache', 'smsAttributeConfigService',
  function($scope, $http, $compile, $templateCache, smsAttributeConfigService) {
    $scope.goodsSelector = function() {
      $scope.productSelect = "../selector/goodsList.html?_=" + new Date().getTime();
    };
    $scope.popupProSel = function() {
      $(".productSelected").addInteractivePop({
        magTitle: "商品选择",
        mark: true,
        width: 1000,
        height: 700,
        drag: true,
        position: "fixed"
      });

    };
  }
])
/*查询节点配置控制器 end*/
