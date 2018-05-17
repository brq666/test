angular.module("loginApp", []).controller("loginCtrl",
    ['$scope', '$http', '$location', 'Tenant', function($scope, $http, $location, Tenant) {
      var hostname = window.location.hostname;
      var tenantId = hostname.substring(0, hostname.indexOf('-')) || '1';
      var browser = $.browser;
      // 不支持IE内核的低版本
      if (browser.msie) {
        $(this).Alert({
          "title": "提示",
          "str": "请使用<a href='http://www.firefox.com.cn/download/' title='下载火狐浏览器'>火狐</a>或者<a href='http://www.google.cn/chrome/browser/desktop/index.html' title='下载谷歌浏览器'>谷歌</a>浏览器登录数据赢家系统，使用其他浏览器会导致部分功能不可用。",
          "mark": true,
          "width": "220px"
        });
      }
      $scope.errorMarkFlag = false;
      $scope.errorContent = "";
      $scope.formActionUrl = rootStatic + "web-portal/credentials";
      $scope.loginPlatName = "";
      $scope.sendChoseValue = "";

      // 获取登入租户id，添加判断登入模式
      Tenant.getTenant(tenantId, function(data) {
        data = data || {};
        $scope.defaultClassVal = true;
        $scope.tenantId = data.tenantId;
        if (data.pageLoginEnabled) {
          $scope.bottomPlatName = $scope.loginPlatName = "登录营销系统";
          $scope.canLoginSys = true;
          $scope.isTopBar = false;
        } else {
          $scope.bottomPlatName = $scope.loginPlatName = "登录管理平台";
          $scope.isTopBar = true;
          $scope.userName = "root";
          $('.userName input').val("root");
        }
        $scope.tmlLoaded = true;
      })

      $scope.defaultClassVal = true;
      $scope.bottomPlatName = $scope.loginPlatName = "登录营销系统";
      $scope.canLoginSys = true;
      $scope.isTopBar = false;
      $scope.tmlLoaded = false;
      var onoff4 = true
      $scope.chosePlatVal = function(e) {
        if(onoff4){
          onoff4 = false;
          if (!$scope.canLoginSys) {
            return "不切换";
          }
          var targetVal = e.target.innerHTML,
              //element = angular.element(e.target),
              //element2 = element.siblings(),
              curStatus = $scope.loginPlatName == "登录营销系统" ? true: false;
          if (!curStatus && targetVal == "登录营销系统") {
            $scope.loginPlatName = "登录营销系统";
            /*element.snabbt({
              position: [0, 0, 0],
              fromRotation: [2, 2, 0]
            });
            element2.snabbt({
              position: [0, 0, 0],
              fromRotation: [2, 2, 0],
              opacity: 0.3
            });*/
            $scope.defaultClassVal = true;
            $scope.userName = "";
          } else if (curStatus && targetVal == "登录管理平台") {
            $scope.loginPlatName = "登录管理平台";
            /*element.snabbt({
              position: [0, 60, 0],
              fromRotation: [2, 2, 0]
            });
            element2.snabbt({
              position: [0, -60, 0],
              fromRotation: [2, 2, 0],
              opacity: 0.3
            });*/
            $scope.defaultClassVal = false;
            $scope.userName = "root";
          };
          angular.element(".userName input,.userPassWord input").removeClass("error");
          $scope.errorContent = "";
          $scope.errorMarkFlag = false;
        }
      };

      //切换效果
      var onoff = true;
      var onff2 = true;
      var onff3 = false;
      var $loginBox = $('.loginBoxBg3');
      var $loginBox2 = $('.loginBoxBg2');
      var $loginBoxP = $('.loginBoxBg3 p');
      var $loginBox2P = $('.loginBoxBg2 P');
      var $maskeone = $('#maskone')
      var $masktwo = $('#masktwo')

      $scope.play = function(obj1,obj2,obj3,obj4){
        obj1.removeClass('boxShow2').addClass('boxShow')
        obj2.removeClass('boxShow').addClass('boxShow2')
        obj3.removeClass('mar').addClass('clear')
        obj4.removeClass('clear').addClass('mar')
      }
      $scope.fixed = function(obj1,obj2){
        obj1.removeClass('boxfront').addClass('boxbehind')
        obj2.removeClass('boxbehind').addClass('boxfront')
      }

      $('#maskone').click(function(){
        if(onoff && onff2){
          $maskeone.hide();
          $loginBox2.show();
          onoff = false;
          onff2 = false;
          $scope.play($loginBox,$loginBox2,$loginBoxP,$loginBox2P)
          setTimeout(function(){
            $scope.fixed($loginBox,$loginBox2)
            $loginBox.fadeOut("slow");
            $masktwo.fadeIn("slow");
            setTimeout(function(){
              onoff = true;
              onff3 = true;
              onoff4 = true;
            },800)
          },1100)
        }
        else{
          return
        }
      });

      $('#masktwo').click(function(){
        if(onoff && onff3){
          $masktwo.hide();
          $loginBox.show();
          onoff = false
          onff3 = false;
          $scope.play($loginBox2,$loginBox,$loginBox2P,$loginBoxP)
          setTimeout(function(){
            $scope.fixed($loginBox2,$loginBox)
            $loginBox2.fadeOut("slow");
            $maskeone.fadeIn("slow");
            setTimeout(function(){
              onoff = true;
              onff2 = true;
              onoff4 = true;
            },800)
          },1100)
        }
        else{
          return
        }
      });

      //切换效果结尾
      $scope.loginMethod = function() {
        var dataObj = {
          "tenantId": $scope.tenantId ? $scope.tenantId : 'yangyangyang3',
          "name": $scope.userName ? $scope.userName: $("input[name='name']").val(),
          "password": $scope.userPassWord ? $scope.userPassWord: $("input[name='password']").val()
        };
        var errorMessage = [];
        /*验证start*/
        if (dataObj.name == "" || dataObj.password == "") {
          if (dataObj.name == "") {
            angular.element(".userName input").addClass("error");
            errorMessage.push("用户名");
          };
          if (dataObj.password == "") {
            angular.element(".userPassWord input").addClass("error");
            errorMessage.push("密码");
          };
          $scope.errorContent = "请填写" + errorMessage.join(',');
          $scope.errorMarkFlag = true;
          return false;
        };

        window.tenantId = dataObj.tenantId;

        if ($scope.defaultClassVal && $scope.canLoginSys && dataObj.name.toUpperCase() == "ROOT") {
          angular.element(".userName input").addClass("error");
          $scope.errorContent = "不允许root账号登陆营销系统";
          $scope.errorMarkFlag = true;
          return false;
        }

        /*验证end*/
        var buttonBeforeAjaxVal = $scope.loginPlatName;
        $scope.loginPlatName = "登录中...";
        $http({
          method: 'post',
          data: $.param(dataObj),
          url: $scope.formActionUrl,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        }).success(function(data, status, headers, config) {
          if (window.sessionStorage) {
            window.sessionStorage.clear();
          }
          window.sessionStorage.setItem("username", dataObj.name || "");
          window.sessionStorage.setItem("userId", data.userId || "");
          window.sessionStorage.setItem("tenantId", data.tenantId || "");
          window.sessionStorage.setItem("JSESSIONID", data.id || "");
          var LoginUrl = "";
          if ($scope.defaultClassVal && $scope.canLoginSys) {
            LoginUrl = rootModule + "/modules/dashboard/index.html";
          } else {
            LoginUrl = rootModule + "/modules/systemManage/index.html#/view/systemAccount";
          };
          location.replace(LoginUrl);
        }).error(function(data, status, headers, config) {
          angular.element(".userName input").addClass("error");
          angular.element(".userPassWord input").addClass("error");
          $scope.errorContent = data.message ? data.message : "租户ID,用户名或密码错误";
          $scope.errorMarkFlag = true;
          $scope.loginPlatName = buttonBeforeAjaxVal;
        });
      };
      angular.element(window).keydown(function(event) {
        var keyCode = event.keyCode;
        if (13 == keyCode) {
          $scope.$apply(function() {
            $scope.loginMethod();
          });
        }
      });

      /*login input functions*/
      angular.element("div.loginInputWrapper").click(function() {
        $(this).find(".login_tip").css("display", "none");
        $(this).find("input").focus();
      });
      angular.element("div.loginInputWrapper").focusout(function() {
        if ($(this).find("input").attr("value").length <= 0) {
          $(this).find(".login_tip").css("display", "block");
        }
      });
      angular.element("div.loginInputWrapper").find("input").focusin(function() {
        $(this).parent("div.loginInputWrapper").find(".login_tip").css("display", "none");
      });

      $scope.$watch(function() {
        return $location.$$absUrl
      }, function(val) {
        var searchEmpty = /error=.+/ig.test(val);
        if (searchEmpty) {
          angular.element(".userName input").addClass("error");
          angular.element(".userPassWord input").addClass("error");
          $scope.errorContent = decodeURI(/error=(.+)/ig.exec(val)[1]) || "";
          $scope.errorMarkFlag = true;
        }
      });

    }]).directive({
      "ngInputFocus": function() {
        return function(scope, element) {
          element.bind("focus", function() {
            scope.$apply(function() {
              var bodyScope = angular.element("body").scope();
              bodyScope.errorMarkFlag = false;
              bodyScope.errorContent = "";
            });
            element.removeClass("error");
          });
        };
      }
}).service('Tenant', ['$http', function($http) {
  return {
    getTenant: function(tenantId, callback) {
      $http({
        method: 'get',
        url: rootStatic + "web-portal/" + tenantId + "/system?_=" + new Date().getTime()
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": "错误提示",
          "str": data.message,
          "mark": true
        });
      });
    }
  }
}]);
