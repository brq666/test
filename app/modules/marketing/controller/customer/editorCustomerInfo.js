angular.module("campaign.controllers").controller('EditorCustomerInfoCtrl', ['$scope', '$compile', function($scope,$compile) {
  $(".editorCustomerInfoWrap").addInteractivePop({magTitle:"客户信息修改",mark:true,drag:true,position:"fixed",width:600});
}]);
