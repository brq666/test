window.imgAnimateTime;
var animateObj = {
  scrollMethod: function(dataLength) {
    var num = 0;
    var index, sumNum;
    //滑动事件
    function slide(n) {
      clearTimeout(imgAnimateTime);
      $(".adsDivBox .pic a").hide();
      $(".adsDivBox .pic a:eq(" + n + ")").fadeIn(400);
      $(".adsDivBox .label a").removeClass("cur");
      $(".adsDivBox .label a:eq(" + n + ")").addClass("cur");
    };
    function move() {
      slide(num);
      if (num == sumNum) {
        num = 0
      } else {
        num++
      };
      imgAnimateTime = setTimeout(move, 2000);
    };
    //鼠标移动事件
    $(function() {
      sumNum = dataLength - 1;
      $(".adsDivBox .pic a").die("mouseenter").live("mouseenter", function() {
        clearTimeout(imgAnimateTime);
      }).die("mouseleave").live("mouseleave", function() {
        index = $(".adsDivBox .pic a").index(this);
        if (index == sumNum) {
          num = 0;
        } else {
          num = index + 1;
        }
        imgAnimateTime = setTimeout(move, 2000);
      });

      $(".adsDivBox .label a").live({
        "mouseenter": function() {
          clearTimeout(imgAnimateTime);
          index = $(".adsDivBox .label a").index(this);
          if ($(this).attr("class").indexOf("cur") == -1) {
            slide(index);
          };
        },
        "mouseleave": function() {
          imgAnimateTime = setTimeout(move, 2000);
        }
      });
    });
    move();
  }
};
/*效果end*/

var dashboardCtrl = angular.module("dashboard.controllers", []);
