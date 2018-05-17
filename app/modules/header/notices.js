//js
function toggleSubSidebarFn(obj) {
  var _next = $(obj).next();
  if (_next.children().length) {
    if (_next.is(':visible')) {
      _next.slideUp();
      $(obj).removeClass("sideNavGray");
    } else {
      _next.slideDown();
      $(obj).addClass("sideNavGray");
    }
  }
}
window.tenantId = window.sessionStorage.getItem('tenantId');

var setNavFunction;
$(function () {
  //平台下拉框
  $('.platform').toggle(function () {
    $(this).find("ul").slideDown();
  }, function () {
    $(this).find("ul").slideUp();
  });

  $(".platform ul li").click(function () {
    var listtext = $(this).text();
    $('.platform span').text(listtext);
    $(".platform ul").slideUp();
  })

  //顶部导航栏
  setNavFunction = function () {
    var listnum = $(".nav>li").length //导航总共的个数
    var navwidth = $(document).width() - $("h1").outerWidth(true) - $(".headerAside").outerWidth(true) - $(".platform").outerWidth(true) - 80;
    var showlistnum = parseInt(navwidth / $(".nav>li").width());
    var hidelistnum = listnum - showlistnum;
    if (hidelistnum > 0) {
      $(".nav>li").slice(-hidelistnum).hide();
      $(".more ul li").slice(-hidelistnum).show();
      $(".more").show();
      $(".nav>li").slice(0, showlistnum).show();
      $(".more ul li").slice(0, showlistnum).hide();
    } else if (hidelistnum <= 0) {
      $(".nav>li").slice(0, showlistnum).show();
      $(".more ul li").slice(0, showlistnum).hide();
      $(".more").hide();
    }
    ;
  }
  $(window).resize(setNavFunction);
  $(".comboboxParent,.seeContact").hover(function () {
    $(this).find(".combobox").stop(true, true).slideDown();
  }, function () {
    $(this).find(".combobox").stop(true, true).hide();
  });


  $(".headerAside span b").hover(function () {
    $(this).addClass("headerAsideHover");
  }, function () {
    $(this).removeClass("headerAsideHover");
  })
  $(".newmailX").click(function () {
    $(".newmail").remove();
  })
  $('#shopinfo').live('mouseenter', function () {
    $(this).find("dl").stop(true, true).slideDown().siblings('span').addClass("spanHover");
  }).live('mouseleave', function () {
    $(this).find("dl").stop(true, true).hide().siblings('span').removeClass("spanHover");
  }).find('a').live('click', function () {
    $(this).parents('dl').hide().siblings('span').removeClass("spanHover");
  });
});
/*jQuery效果end*/

//检查登录
var userName = '',
  useID = '',
  campUserName = '',
  thisTime = new Date().getTime();

(function (angular, window, undefined, webApp) {
  'use strict';

  webApp.controller('menuCtrl', ['$scope', '$http', '$location', '$rootScope', '$timeout', '$q', '$interval', 'authService', 'headerService', function menuCtrl($scope, $http, $location, $rootScope, $timeout, $q, $interval, authService, headerService) {
    $rootScope.shuyunLoginUrl = "";
    $rootScope.shopInfoDefer = $q.defer();
    $scope.disableFlag = false;
    $scope.user = {
      "name": userName,
      "noticeCount": 58,
      "id": useID
    };
    //检查是否到期
    $scope.$watch(setNavFunction);
    headerService.getShopInfo({}, function (data) {
      $rootScope.ccmsVersion = data.version_code;
      $scope.noticeObj.getStatus();
      $rootScope.shopInfoDefer.resolve();
      if (data.expire && moment().isAfter(moment(data.expire, 'YYYY-MM-DD'))) {
        $(this).yAlert({
          "text": "合同已到期",
          "markZindex": 2000
        });
      }
      /* 得到个性化营销的number tip */
      headerService.getNumber({}, function (data) {
        $scope.unionMarketingNumberShow = parseInt(data.count) === 0 ? false : true;
        $scope.unionMarketingNumber = parseInt(data.count) > 100 ? 99 : data.count;
      }, function (err) {
        $scope.unionMarketingNumberShow = false;
      });
    }, angular.noop);

    //检验登入
    function checkLogin() {
      headerService.checkLogin({}, function (data) {
        //借用此接口获取下用户
        if (data.expired) { //true 需要登录
          var loginUrl = GLOBAL_STATIC.rootModule + "/modules/login/index.html";
          location.pathname = loginUrl;
          authService.loginCancelled(); //权限不通过；
        } else {
          userName = data.username;
          useID = data.userId;
          campUserName = data.username;
          authService.loginConfirmed(); //权限验证通过；
          $scope.user.name = userName;
          $scope.user.id = useID;
          CAMPAIGN_STATIC.tenantId = data.tenantId;
          fetchMenu();
        }
      }, function (data) {
        var loginUrl = GLOBAL_STATIC.rootModule + "/modules/login/index.html";
        location.pathname = loginUrl;
        authService.loginCancelled(); //权限不通过；
      });
    }

    checkLogin();

    //退出账户
    var clearStorage = function () {
      window.sessionStorage.removeItem("shuyunSessionMenu")
      window.sessionStorage.removeItem("shuYunMenuHelp")
      window.sessionStorage.removeItem("shuYunSSOlink")
      window.sessionStorage.removeItem("shuyunAccountLink")
      window.sessionStorage.removeItem("shuyunContact")
    }
    $scope.logout = function () {
      $(this).Confirm({
        "title": "退出提示",
        "str": "确认退出该用户？",
        "mark": true,
        "eleZindex": 1010,
        "markZindex": 1005
      }, function () {
        headerService.logOut({}, function () {
          checkLogin();
          clearStorage()
        }, angular.noop);
      });
    };
    //修改密码
    $scope.changePassword = function () {
      $scope.oldPassword = $scope.password = $scope.newPassword = "";
      angular.element('#changePassword label.error').hide();
      $scope.passwordPage = rootModule + "/modules/header/passwordmodify.html?_=" + (+new Date());
    }
    $scope.popPassword = function () {
      $(".changeThePassword").addInteractivePop({
        magTitle: "修改密码",
        width: 400,
        mark: true,
        drag: true,
        position: "fixed",
        "eleZindex": 1010,
        "markZindex": 1009
      });
    }

    $scope.confirmChange = function () {
      $.validator.addMethod('checkpasswd', function (value, element) {
        var ne = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$');
        return ne.test(value);
      });
      $("#changePassword").validate({
        wrapper: "li",
        errorClass: "white-sp error",
        rules: {
          oldPassword: "required",
          password: {
            required: true,
            checkpasswd: true
          },
          newPassword: {
            required: true,
            equalTo: "#password"
          }
        },
        messages: {
          oldPassword: {
            required: "密码不能为空"
          },
          password: {
            required: "请输入登录密码",
            checkpasswd: "密码至少8位，并包括大小写字母及数字"
          },
          newPassword: {
            required: "请输入确认密码",
            equalTo: "两次输入的密码不一致"
          }
        },
        errorPlacement: function (error, element) {
          element.parent().after(error);

        },
        submitHandler: function () {
          $scope.savePassword();
        }
      })
    }
    $scope.savePassword = function () {
      var passwordScope = angular.element('.changeThePassword').scope();
      var PasswordInfo = {
        id: $scope.user.id,
        password: passwordScope.password,
        newPassword: passwordScope.newPassword,
        oldPassword: passwordScope.oldPassword
      }
      $http.put(rootStatic + "web-system/sys/user/" + PasswordInfo.id + "/password/?_=" + new Date().getTime(), PasswordInfo).success(function () {
        $(this).yAlert({
          "text": "密码修改成功！"
        });
        removeAlert();
        $(".changeThePassword").hide();
        $(".yunat_maskLayer").remove();
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": false,
          "eleZindex": 20002,
          "markZindex": 20001
        });
      })
    }
    $scope.cancelChangePass = function () {
      $(".changeThePassword").hide();
      $(".yunat_maskLayer").remove();
    }
    //menu
    var regUrl;
    if (location.pathname.indexOf('app/modules') != -1) {
      // develop
      regUrl = /app\/modules\/([a-z_0-9]*)\/index.html/ig;
    } else {
      // dist
      regUrl = /ccms\/modules\/([a-z_0-9]*)\/index.html/ig;
    }
    var curLocation = location;
    if (location.pathname === '/') {
      var portalUrl = '';
      (location.pathname.indexOf('app/modules') != -1) ? portalUrl = '/app/modules/dashboard/index.html' : portalUrl = '/ccms/modules/dashboard/index.html';
      location.pathname = portalUrl
    }

    var getpSildBarValue = regUrl.exec(curLocation)[1]; //刷新下不选择高亮修复，模板头部高亮判断，头部不能出现同个模板，如：marketing

    if (getpSildBarValue == "insert") { // 排除嵌入模板，初始化多个选中高亮
      getpSildBarValue = new RegExp(rootModule + '\/modules\/([a-z_0-9]*)\/index.html', 'ig').exec(location.pathname)[0] + "#" + $location.$$path;
    }

    function fetchMenu() {
      var navAry = [];
      var appSeeionMenu = $.parseJSON(sessionStorage.getItem("shuyunSessionMenu")); // "获取菜单缓存"
      if (appSeeionMenu) {
        getSessionMenu(appSeeionMenu);
      } else {
        headerService.checkVisit({
          tenantId: CAMPAIGN_STATIC.tenantId
        }, function (data) {
          data.children = data.children.filter(function (val, index) {
            return val
          });
          angular.forEach(data.children, function (n) {
            var targetParam = n.url
            var regFlag = n.url.indexOf(getpSildBarValue);
            if (regFlag != -1) {
              n.curClass = "navCur"
            }
            n.url = root + n.url;
            navAry.push(n);
          });
          $scope.user.nav = navAry;
          $rootScope.user = angular.copy($scope.user);
          var stringData = JSON.stringify({
            menuData: $scope.user.nav.slice()
          });

          sessionStorage.setItem("shuyunSessionMenu", stringData);
        });
      }
    }

    function getSessionMenu(data) {
      var appSeeionMenu = data;
      angular.forEach(appSeeionMenu.menuData.slice(), function (n) {
        var regFlag = n.url.indexOf(getpSildBarValue);
        n.curClass = "";
        if (regFlag != -1) { //当前的菜单样式 navCur
          n.curClass = "navCur"
        }
      });
      $scope.user.nav = appSeeionMenu.menuData.slice();
      $rootScope.user = angular.copy($scope.user);
    }

    /*start 填写信息*
     /*start 是否已经有联系方式*/
    var getContactAjaxMethod = function () {
      var shuyunContact = window.sessionStorage.getItem("shuyunContact")
      if (shuyunContact) {
        var response = JSON.parse(shuyunContact)
        if (response.exists) {
          $scope.addPerInfoFlag = false;
          $scope.contactLiFlag = true;
          $scope.contactName = response.contact.fullName;
          $scope.contactQQ = response.contact.qq;
          $scope.contactPhone = response.contact.mobile;
          $scope.contactWW = response.contact.wangwang;
          $scope.contactEmail = response.contact.email;
          $scope.contactWeibo = response.contact.weibo;
        } else {
          $scope.addPerInfoFlag = true;
          $scope.contactLiFlag = false;
          $scope.contactName = "";
          $scope.contactQQ = "";
          $scope.contactPhone = "";
          $scope.contactWW = "";
          $scope.contactEmail = "";
          $scope.contactWeibo = "";
        }
      } else {
        $http.get(rootStatic + "web-dashboard/dashboard/assemble/contact/exists/?tenantId=" + CAMPAIGN_STATIC.tenantId).success(function (response) {
          var Stringres = JSON.stringify(response)
          window.sessionStorage.setItem("shuyunContact", Stringres)
          if (response.exists) {
            $scope.addPerInfoFlag = false;
            $scope.contactLiFlag = true;
            $scope.contactName = response.contact.fullName;
            $scope.contactQQ = response.contact.qq;
            $scope.contactPhone = response.contact.mobile;
            $scope.contactWW = response.contact.wangwang;
            $scope.contactEmail = response.contact.email;
            $scope.contactWeibo = response.contact.weibo;
          } else {
            $scope.addPerInfoFlag = true;
            $scope.contactLiFlag = false;
            $scope.contactName = "";
            $scope.contactQQ = "";
            $scope.contactPhone = "";
            $scope.contactWW = "";
            $scope.contactEmail = "";
            $scope.contactWeibo = "";
          }
        });
      }
    };
    getContactAjaxMethod();
    /*end 是否已经有联系方式*/

    $scope.getContactInfo = function () { //查看联系人信息
      getContactAjaxMethod();
    };

    $scope.cancelAddInfo = function () { //关闭提示
      $scope.addPerInfoFlag = false;
    };

    $scope.viewAddPerPop = function () { //弹出信息框
      $(".collectPerInfoPop").addInteractivePop({
        magTitle: "填写联系人信息",
        mark: true,
        drag: true,
        position: "fixed",
        "eleZindex": 1010,
        "markZindex": 1009
      });
    };
    $scope.cancelPerInfoPop = function () { //取消
      $(".collectPerInfoPop").hide();
      $(".yunat_maskLayer").remove();
    };

    $scope.perInfoSave = function () { //保存联系人方式
      $scope.disableFlag = false;

      var contactPerInfo = {};
      contactPerInfo.fullName = $scope.contactName;
      contactPerInfo.email = $scope.contactEmail;
      contactPerInfo.mobile = $scope.contactPhone;
      contactPerInfo.qq = $scope.contactQQ;
      contactPerInfo.wangwang = $scope.contactWW;
      contactPerInfo.weibo = $scope.contactWeibo;
      contactPerInfo.tenantId = CAMPAIGN_STATIC.tenantId;
      //验证
      var phoneNumberFlag = /^[1][3-9]{1}\d{9}$/.test($scope.contactPhone);
      /*if (!contactPerInfo.mobile) {
       phoneNumberFlag = true;
       }*/
      //标准版中不对联系人姓名和手机号码做必填验证，所以删除contactPerInfo.fullName && contactPerInfo.mobile
      //if (phoneNumberFlag) {

      if (!($scope.contactName || $scope.contactEmail || $scope.contactPhone || $scope.contactQQ || $scope.contactWW || $scope.contactWeibo)) {
        this.cancelPerInfoPop();
      } else if (!phoneNumberFlag && $scope.contactPhone) {
        $scope.errorPhone = "isError";
      } else {
        //按钮变灰
        $scope.disableFlag = true;
        $(".collectPerInfoPop .submitPerData").removeClass("btnBlue");

        $timeout(function(){

          $http.post(rootStatic + "web-dashboard/dashboard/assemble/contact/", contactPerInfo).success(function (response) {

            if (response.code == "200") {
              $scope.disableFlag = false;
              $(".collectPerInfoPop .submitPerData").addClass("btnBlue");
              console.log(22);

              var sessionData = window.sessionStorage.getItem("shuyunContact")
              sessionData = JSON.parse(sessionData)
              sessionData.exists = true

              for (var i in contactPerInfo) {
                sessionData[i] = contactPerInfo[i]
              }
              sessionData = JSON.stringify(sessionData)
              window.sessionStorage.setItem("shuyunContact", sessionData)
              $(".collectPerInfoPop").hide();
              $(".yunat_maskLayer").remove();
              $(this).yAlert({
                "text": "保存成功"
              });
              $scope.addPerInfoFlag = false;
              $scope.contactLiFlag = true;
              removeAlert();
            } else {
              $(this).Alert({
                "title": "提示",
                "str": response.message,
                "mark": true,
                "width": "100px",
                "eleZindex": 1010,
                "markZindex": 1005
              });
            }
          });
        },1000);


        //} else {
        //标准版中不对联系人姓名和手机号码做必填验证，所以删除contactPerInfo.fullName && contactPerInfo.mobile,只验证手机号码正确性。
        // if(!contactPerInfo.fullName){
        //  //$scope.error="isError";标准版不做验证
        // };


      }
      ;
    };
    $scope.removeBorderColor = function (f) { //移除border css
      if (f) {
        $scope.error = "";
      } else {
        $scope.errorPhone = "";
      }
    }
    /*end 填写信息*/

    //获取帮助更多链接
    $scope.getHelpLink = function () {
      //var helpSession=window.sessionStorage.getItem("shuYunMenuHelp")
      // if(helpSession){
      // $scope.helplink=helpSession
      //}else{
      $http.get(rootStatic + "web-dashboard/dashboard/assemble/helplink/").success(function (response) {
        $scope.helplink = response.url;
        window.open($scope.helplink)
        // window.sessionStorage.setItem("shuYunMenuHelp",response.url)
      }).error(function (data, status, headers, config) {
        if (data.message) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": false,
            "eleZindex": 20002,
            "markZindex": 20001
          });
        }

      })
      //}

    }
    //$scope.getHelpLink();
    //单点登录
    $scope.SSOlinkyes = false;
    $scope.get5xLink = function () {
      var shuYunSSOlink = window.sessionStorage.getItem("shuYunSSOlink")
      if (shuYunSSOlink) {
        $scope.SSOlink = shuYunSSOlink;
        $scope.SSOlinkyes = true;
      } else {
        $http.get(rootStatic + "web-dashboard/dashboard/sso/directive/?tenantId=" + CAMPAIGN_STATIC.tenantId).success(function (resoponse) {
          if (resoponse) {
            $scope.SSOlink = resoponse.url;
            $scope.SSOlinkyes = true;
            window.sessionStorage.setItem("shuYunSSOlink", resoponse.url)
          }
        }).error(function (data, status, headers, config) {
          if (data.message) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": false,
              "eleZindex": 20002,
              "markZindex": 20001
            });
          }
        })
      }

    }
    $scope.get5xLink()

    //获取账户信息链接
    $scope.getAccountLink = function () {
      var accountlink = window.sessionStorage.getItem("shuyunAccountLink")
      if (accountlink) {
        $scope.accountLink = accountlink;
      } else {
        $http.get(rootStatic + "web-dashboard/dashboard/channel/accountlink/?tenantId=" + CAMPAIGN_STATIC.tenantId).success(function (response) {
          $scope.accountLink = response.url;
          window.sessionStorage.setItem("shuyunAccountLink", response.url)
        }).error(function (data, status, headers, config) {
          if (data.message) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": false,
              "eleZindex": 20002,
              "markZindex": 20001
            });
          }

        })
      }

    }
    $scope.getAccountLink();

    //嵌入模板之间相互切换 操作
    $rootScope.resertTemplateClickFlag = true;
    $scope.disponseTitleALink = function (data) { // 菜单$watch 和嵌入模板click();
      if (data.indexOf("callcenter") != -1) {
        return "javascript:void(0)";
      }
      ;

      if (data.indexOf("insert") == -1) {
        return data;
      } else {
        return "javascript:void(0)";
      }
    }

    $scope.appOrigin = location.protocol + "//" + location.host; // 获取绝对路径http
    $scope.appRoot = root;

    $rootScope.insertCompileLocation = $scope.insertCompileLocation = function (url) {
      $rootScope.resertTemplateClickFlag = false;
      if (url.indexOf("callcenter") != -1) { // 电话模块在新页面操作
        window.open(url);
        return false;
      }

      if (url.indexOf("insert") != -1) {
        window.location.href = $scope.appOrigin + url;
        if (window.location.href.indexOf("insert") != -1) {
          window.location.reload();
        }
      }
    };

    var ShowMessContent = function () {
      $("#isShowMessContent").css("display", "block")
    }
    var hideMessContent = function () {
      $("#isShowMessContent").css("display", "none")
    }
    //弹出更多的弹出框
    $scope.showMoreMessageDialog = function () {
      $(".moreMessagePop").addInteractivePop({
        magTitle: "系统消息",
        width: 888,
        mark: true,
        position: "fixed",
        childElePop: true
      });
      //获取服务器数据
      $scope.noticeObj.getNotices();
    };

    //影藏消息详情内容弹出框
    $scope.hideContentDialog = function () {
      hideMessContent()
    };

    var interProm = $interval(function () {
      $scope.noticeObj.getStatus();
    }, 60000);
    $scope.noticeObj = {
      'deleIdList': {},
      'hideContentDialog': function () {
        $("#isShowMessContent").css("display", "none");
      },
      'setSelectAll': function (checked) {
        var _this = this;

        $scope.popMesses.forEach(function (item) {
          _this.deleIdList[item.id] = checked;
          item.select = checked;
        });
        var pro = Object.getOwnPropertyNames(_this.deleIdList);
        $scope.deleteButton = pro.length > 0;
      },
      'selectNoticeId': function (id, checked) {
        var _this = this;
        _this.deleIdList[id] = checked;
        var checkedList = $scope.popMesses.filter(function (item) {
          return item.select === true;
        });
        var pro = Object.getOwnPropertyNames(_this.deleIdList);

        $scope.deleteButton = pro.length > 0;
        $scope.selectAll = checkedList.length === $scope.popMesses.length;
        if ($scope.popMesses.length === 0) {
          $scope.selectAll = false;
        }
      },
      'getNoticeCb': function (res) {
        $scope.selectAll = false;
        //总共多少页
        var pages = Math.ceil(res.total / 10);
        if (pages === 0) {
          pages = 1;
        }
        res.data.forEach(function (item) {
          item.isRead = item.status === 1;
          item.select = $scope.noticeObj.deleIdList[item.noticeId];
        });
        $scope.deleteButton = false;

        $scope.popMesses = res.data;
        $scope.page = res.page;
        $scope.total = pages;
        //是否是第一页，是否是最后一页
        $scope.isLastPage = !!(pages - res.page);
        $scope.isFirstPage = res.page !== 1;
      },
      'getNoticeEB': function (res) {
        $scope.popMesses = [];
        $scope.page = 0;
        $scope.total = 0;
      },
      'getStatus': function () {
        var param = {
          'userName': CAMPAIGN_STATIC.tenantId,
          'ccmsVersion': $rootScope.ccmsVersion
        };
        headerService.getStatus(param, function (res) {
          if (res.status) {
            $scope.newsTrue = true;
          } else {
            $scope.newsTrue = false;
          }
        }, function () {
          $interval.cancel(interProm);
        });
      },
      'getNotices': function () {
        var _this = this;
        var param = {
          'userName': CAMPAIGN_STATIC.tenantId,
          'ccmsVersion': $rootScope.ccmsVersion,
          'pageNo': 1
        };
        headerService.getNoticesList(param, _this.getNoticeCb, _this.getNoticeEB);
      },
      'getPrePage': function () {
        var _this = this;
        var param = {
          'userName': CAMPAIGN_STATIC.tenantId,
          'ccmsVersion': $rootScope.ccmsVersion,
          'pageNo': --$scope.page
        };
        headerService.getNoticesList(param, _this.getNoticeCb, _this.getNoticeEB);
      },
      'getNextPage': function () {
        var _this = this;
        var param = {
          'userName': CAMPAIGN_STATIC.tenantId,
          'ccmsVersion': $rootScope.ccmsVersion,
          'pageNo': ++$scope.page
        };
        headerService.getNoticesList(param, _this.getNoticeCb, _this.getNoticeEB);
      },
      'readClick': function (index) {
        var notice = $scope.popMesses[index];
        var param = {
          'userName': CAMPAIGN_STATIC.tenantId,
          'ccmsVersion': $rootScope.ccmsVersion,
          'id': parseInt(notice.noticeId)
        };
        $("#isShowMessContent").css("display", "block")
        notice.isRead || headerService.postNotice(param);
        notice.isRead = true;

        $scope.content = notice.content;
        $scope.contitle = notice.title;
        $scope.condate = notice.created;
      },
      'deleteNotice': function () {
        var _this = this;
        var ids = [];
        for (var i in _this.deleIdList) {
          if (_this.deleIdList[i]) {
            ids.push(i);
          }
        }
        var param = {
          'userName': CAMPAIGN_STATIC.tenantId,
          'setId': $rootScope.ccmsVersion,
          'ccmsVersion': $rootScope.ccmsVersion,
          'ids': ids.join(',')
        };

        var cb = function (res) {
          _this.ids = [];
          var text = '删除失败';
          if (res.success) {
            text = '删除成功';
          }
          _this.getNotices();
          $(this).yAlert({
            "text": text,
            "markZindex": 2000
          });
          removeAlert();
        };
        var eb = function () {
        };

        headerService.deleteNotices(param, cb, eb);
      },
      'clearNotice': function () {
        var _this = this;
        var ids = [];
        $scope.popMesses.forEach(function (item) {
          if (item.isRead) {
            ids.push(item.noticeId);
          }
        });
        var param = {
          'userName': CAMPAIGN_STATIC.tenantId,
          'setId': $rootScope.ccmsVersion,
          'ccmsVersion': $rootScope.ccmsVersion,
          'ids': ids.join(',')
        };

        var cb = function (res) {
          _this.ids = [];
          _this.getNotices();
          $(this).yAlert({
            "text": "删除成功",
            "markZindex": 2000
          });
          removeAlert();
        };
        var eb = function () {
        };

        headerService.deleteNotices(param, cb, eb);
      }
    };

  }])
})(angular, window, undefined, webApp);
