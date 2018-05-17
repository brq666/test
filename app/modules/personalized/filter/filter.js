/**
 * Created by shuyun on 2015/4/14.
 */
webApp.filter('Countdown',
  function() {
    return function(timeStr) {
      var timePlugObj = {
        "T": "",
        "D":"已执行：<b>{0}</b>天<b>{1}</b>小时<b>{2}</b>分<b>{3}</b>秒", //可以使用其他的显示字符串或Htm
//        "D": "已执行：{0}天{1}小时{2}分{3}秒",
        //可以使用其他的显示字符串或Htm
        "H": function(k, j) {
          return k.replace(/{(\d)}/g, function(l, m) {
            return j[m]
        })
        },
        "B": function(j) {
          return j < 10 ? "0" + j: j
        },
        "F": function(s) {
          if (s > 0) {
            /* 1分=60秒 1天=1440分 1天=86400秒 */
            var _s = s % 60;
            var _m = (s - _s) / 60;
            var _h = parseInt(_m / 60);
            var _d = parseInt(_h / 24);
            _h = _h % 24;
            _m = _m % 60;
            return timePlugObj.H(timePlugObj.D, [_d, timePlugObj.B(_h), timePlugObj.B(_m), timePlugObj.B(_s)]);
          }
          return s;
        }
      };

      var startTime = new Date(timeStr.replace(/-/g, "/")).getTime();
      var diff = new Date().getTime() - startTime;
      if (diff > 0) {
        diff = parseInt(diff / 1000);
        return timePlugObj.F(diff);
      }
      return timeStr;
    };
  }
);