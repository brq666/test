var webApp=angular.module("ccmsApp",[]);
webApp.controller("mainCtrl",function($scope,$http){
	$scope.afterLoadCont = function(){
		$scope.tmlLoaded = true;
	};

//检查请求是否是在分页上发起的 客服中心&&订单中心用到
	$scope.checkIsPager = function(arg,scope,curPgae,rp){//arg 为函数的默认参数,scope 作用域 ,curPage 默认当前页 ,rp 默认显示条数
		var isPager = false
		$.each(arg,function(i,n){
			if(n == 'isPager'){
				isPager = true;
				return
			}
		});
		if(isPager){
			scope.defaultPage = scope.pager.curpage;			
		}else{
			scope.defaultPage = curPgae;	
		}
		if(scope.pager){
			scope.defaultSize = scope.pager.rp;
		}else{
			scope.defaultSize = rp;
		}
	}
});

webApp.directive({
	ngAddsubcurrent:function(){
		return function(scope,element,attr){//首次加载添加二级导航样式
			scope.$watch(function(){return element.attr('href')}, function(href){
				if(location.hash.indexOf(href.replace(/\..*/g,'')) >= 0){
					element.addClass('sbCurrent');
				}
			});
		}
	},
	ngAddsubcur:function(){
		return function(scope,element,attr){
			scope.$watch(function(){return element.attr('href')}, function(href){
				if(location.hash.indexOf(href.replace(/\..*/g,'')) >= 0){
					var _parent = element.parents('li');
					_parent.find('>a').addClass('sbCurrent')
					_parent.find('dl').show();
					element.addClass('sbSmallCur');
				}
			});
		}
	}	 
});