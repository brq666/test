
(function($){
  //左边导航
  $(function(){
    $(".sideNav>li>a").live('click',function(){
      $(this).addClass("sbCurrent").parent().siblings("li").find(".sbCurrent").removeClass("sbCurrent");
      $(".sideNav dd a").removeClass("sbSmallCur");
    })

    $(".sideNav>li>a").mouseover(function(){
      $(this).addClass('bold');
    });
    $(".sideNav>li>a").mouseout(function(){
      $(this).removeClass('bold');
    });



    $(".sideNav dd a").live('click',function(){
      $(".sideNav dd a").removeClass("sbSmallCur");
      $(this).addClass('sbSmallCur');
      $(this).parents("dl").siblings("a").addClass("sbCurrent").parent().siblings("li").find(".sbCurrent").removeClass("sbCurrent");
    })

    $(".sideNav ul a").live('click',function(){
      $(this).addClass('sbSmallCur').parent().siblings().find('a').removeClass('sbSmallCur');
    });
  })
})(jQuery);
//navCtrl
angular.module('ccmsApp').controller('navCtrl', ['$scope', '$http', '$location', '$rootScope',function( $scope, $http, $location, $rootScope){
  $scope.subNavs = $rootScope.subNavAry;
}])
