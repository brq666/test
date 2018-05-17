/**
 * 容器是否包含另一个集合
 */

angular.module('components.universalSelector')
  .controller('UniversalSelectorCtrl', ['$ccTips', '$resource', '$scope', 'modalInstance', 'data', function($ccTips, $resource, $scope, modalInstance, data) {

    this.data = data;
    this.values = [];
    this.advancedSearchState = false;
    this.treeKeywords = '';
    this.tree = {areaId: null, level: '0'};

    // 点击确定按钮
    this.$ok = function() {
      modalInstance.ok($scope.getValues());
    };

    // 取消
    this.$cancel = function() {
      modalInstance.cancel();
    }

  }]);

