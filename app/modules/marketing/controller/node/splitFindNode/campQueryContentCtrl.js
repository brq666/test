;angular.module('campaign.controllers').controller('campQueryContentCtrl', ['$scope', 'getListService', function($scope, getListService) {
	$scope.vm = {
		"conditions": $scope.$parent.$parent.tfilterFindObj.conditions,
		"queryConditionClose": function(index) { //删除配置
		    this.conditions.splice(index, 1);
		},
		addNewCondition: function() { //新增条件
			this.conditions.push({});
		}
	}
	console.log($scope.vm.conditions)
	$scope.hehe = function(){
		var postData = {};
		postData.conditions = angular.copy($scope.vm.conditions);
		postData.conditions.forEach(function(val, index) {
			if(val.type == '参加次数'){
				if(val.getExcludedselecttime){
					val.values = val.getExcludedselecttime();
				}
				if(val.getExcludedselectcheckbox){
					val.valueChannel = val.getExcludedselectcheckbox();
				}
				if(val.getExcludedselectnum){
					angular.extend(val.values, val.getExcludedselectnum());
				}
	      delete val.getExcludedselecttime;
	      delete val.getExcludedselectcheckbox;
	      delete val.getExcludedselectnum;
			}
			if(val.type == '最后参加时间'){
				if(val.getExcludedselectlasttime){
					val.valueChannel = val.getExcludedselectlasttime();
				}
				delete val.getExcludedselectlasttime;
			}
    });
    console.log(postData.conditions)
	}
}]);
