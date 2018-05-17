/**
 *@project:ccms6.x
 *@author: Peach.Tao
 * Created by on 14-8-6.
 */
/*
 *	处理数据的一些方法——PEACH
 */

//重写jquery的ajax方法
window.httpTitle = ""; // 错误提示title
(function($) {
  //备份jquery的ajax方法
  var _ajax = $.ajax;

  //重写jquery的ajax方法
  $.ajax = function(opt) {
    //备份opt中error和success方法
    var fn = {
      error: function(XMLHttpRequest, textStatus, errorThrown) {},
      success: function(data, textStatus) {}
    }
    if (opt.error) {
      fn.error = opt.error;
    }
    if (opt.success) {
      fn.success = opt.success;
    }

    //扩展增强处理
    var _opt = $.extend(opt, {
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(); //解决保存按钮可点击
        if (XMLHttpRequest.status == 401) {
          location.replace("/portal/timeout.html");
          return false;
        }

        // 权限错误
        if (XMLHttpRequest.status == 403) {
          $(this).Alert({
            "title": "提示",
            "str": "您没有操作当前功能的权限，请联系系统管理员",
            "mark": true
          });
          return {};
        }

        // 错误提示title
        switch(XMLHttpRequest.status) {
          case 500:
            window.httpTitle = '未知错误';
            break;
          case 405:
            window.httpTitle = '操作失败';
            break;
          case 400:
            window.httpTitle = '提示';
            break;
        }

        fn.error(XMLHttpRequest, textStatus, errorThrown);
      }, success: function(data, textStatus) {
        //成功回调方法增强处理
        fn.success(data, textStatus);
      }
    });
    _ajax(_opt);
  };
})(jQuery);

var disposeCommMethod = {
  "handleBooleNumber": function(num1, num2) { // 处理小数相乘精确度误差
    if (!num1) {
      return false;
    }
    var m = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    if (s1.split(".")[1]) {
      m += s1.split(".")[1].length
    };
    if (s2.split(".")[1]) {
      m += s2.split(".")[1].length
    };
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  "divisionNumber": function(arg1, arg2) { // 处理小数除以100
    if (!arg1) {
      return false;
    }
    var t1 = 0,
        t2 = 0,
        t3 = 0,
        r1, r2, d;
    if (arg1.toString().split(".")[1]) {
      t1 = arg1.toString().split(".")[1].length
    };
    if (arg2.toString().split(".")[1]) {
      t2 = arg2.toString().split(".")[1].length
    };
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    d = r1 / r2;
    if (d.toString().split(".")[1]) {
      t3 = d.toString().split(".")[1].length
    };
    return (Number(d.toString().replace(".", ""))) / Math.pow(10, (t1 - t2 + t3));
  },
  /*解决节点保存ajax有延时，出现多次点击的请求的方法 start*/
  "initShuyunAjaxButtonGlobaValueTrue": function(curElement) { //初始化参数
    this.shuyunAjaxButtonGlobaValue = true;
    if (curElement) {
      curElement.html("确定")
    };
  },
  "shuyunAjaxButtonClickMethod": function(ajaxMethod, curElement) {
    if (this.shuyunAjaxButtonGlobaValue) {
      this.shuyunAjaxButtonGlobaValue = !this.shuyunAjaxButtonGlobaValue;
      if (curElement) {
        curElement.html("保存中...");
      }
      ajaxMethod();
    };
  },
  /*解决节点保存ajax有延时，出现多次点击的请求的方法 end*/
  "disposeLabel": function(v, num) { //  处理字符串手动添加<br/>使其换行，v-内容，num-多少字一换行
    var size = Math.ceil(v.length / num),
        vAry = v.split("");
    if (size > 1) {
      var brLen = 0;
      for (var i = 1; i < size; i++) {
        vAry.splice((i * num + brLen), 0, "<br />");
        brLen++;
      }
    }
    return vAry.join("");
  }
};
disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
/*end*/

/*共用处理时间方法*/
// js iso8601的时间格式 默认输出Date 类型
//type 默认返回 时间类型   type=all 返回 年-月-日 分：秒  ；type=year，返回 年-月-日
//style 默认以- 进行连接， type="/"  年/月/日
//minStyle 默认以: 进行连接， minStyle="/"  分/秒
function setISO(string, type, style, minStyle) {
  function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  }

  Date.prototype.setISO8601 = function() {
    if (!style) {
      style = "-";
    }
    if (!minStyle) {
      minStyle = ":";
    }
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" + "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" + "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    if (string) {
      var d = string.match(new RegExp(regexp));
      var offset = 0;
      var date = new Date(d[1], 0, 1);

      if (d[3]) {
        date.setMonth(d[3] - 1);
      }
      if (d[5]) {
        date.setDate(d[5]);
      }
      if (d[7]) {
        date.setHours(d[7]);
      }
      if (d[8]) {
        date.setMinutes(d[8]);
      }
      if (d[10]) {
        date.setSeconds(d[10]);
      }
      if (d[12]) {
        date.setMilliseconds(Number("0." + d[12]) * 1000);
      }
      if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
      }
      offset -= date.getTimezoneOffset();
      //time = (Number(date));
      //var date = new Date(time);
      if (type == "year") {
        var minutes = date.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        var month = date.getMonth();
        month = month + 1;
        if (month < 10) {
          month = "0" + month;
        }
        var date_now = date.getDate();
        if (date_now < 10) {
          date_now = "0" + date_now;
        }
        var hour = date.getHours();

        if (hour < 10) {
          hour = "0" + hour;
        }
        date = date.getFullYear() + style + month + style + date_now;
      }
      if (type == "monthday") {
        var minutes = date.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        var month = date.getMonth();
        month = month + 1;
        if (month < 10) {
          month = "0" + month;
        }
        var date_now = date.getDate();
        if (date_now < 10) {
          date_now = "0" + date_now;
        }
        var hour = date.getHours();

        if (hour < 10) {
          hour = "0" + hour;
        }
        date = month + "月" + date_now + "日";
      }
      if (type == "all") {
        var minutes = date.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        var month = date.getMonth();
        month = month + 1;
        if (month < 10) {

          month = "0" + month;
        }
        var date_now = date.getDate();
        if (date_now < 10) {
          date_now = "0" + date_now;
        }
        var hour = date.getHours();

        if (hour < 10) {
          hour = "0" + hour;
        }
        var seconds = date.getSeconds();
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        date = date.getFullYear() + style + month + style + date_now + " " + hour + minStyle + minutes + minStyle + seconds;
      }
      return date;
    } else {
      return;
    }
  }
  var today = new Date();
  today = today.setISO8601(string);
  return today;
};
