var campListParams = []; // 初始化grid的参数
function loadScrip(obj) {
  if (obj.attr('_href')) {
    obj.attr('href', root + obj.attr('_href'));
  }
  if (obj.attr('_src')) {
    $.ajax({
      url: root + obj.attr('_src'),
      dataType: 'script',
      async: false,
      cache: obj.attr('cache') ? true: false,
      success: function() {
        obj.remove();
      }
    });
  }
}
var webApp = angular.module("ccmsApp", ['ngRoute', 'ngSanitize', "http-auth-interceptor"], ['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    var interceptor = ['$rootScope', '$q',
      function(scope, $q) {

        function success(response) {
          return response;
        }

        function error(response) {
          var status = response.status;
          if (status == 404) {
            $(this).Confirm({
              "title": "错误提示",
              "str": "当前页面出现错误，请刷新页面",
              "mark": true,
              "eleZindex": 1010,
              "markZindex": 1005
            }, function() {
              window.location.reload();
            });
            return {};
          }

          // 权限错误
          if (status == 403) {
            $(this).Alert({
              "title": "提示",
              "str": "您没有操作当前功能的权限，请联系系统管理员",
              "mark": true
            });
            return {};
          }

          // 错误提示title
          switch(status) {
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
          // otherwise
          return $q.reject(response);

        }

        return function(promise) {
          return promise.then(success, error);
        }

      }];
    $httpProvider.responseInterceptors.push(interceptor);
  }]);
webApp.controller("mainCtrl", ['$scope', '$http', '$location', '$rootScope',
  function($scope, $http, $location, $rootScope) {

    /*angualr http权限验证
     *发送http若为401，则说明验证不通过，跳回登入页
     */
    $scope.$on('event:auth-loginRequired', function(s, datas) { // 权限失败
      location.replace(rootModule + "/modules/login/index.html");
    });

    $scope.$on('event:auth-loginConfirmed', function() { //权限成功
      //doing
    });

    /*end*/

    // 定义变量，页面跳转使用
    $scope.appOrigin = location.protocol + "//" + location.host; // 获取绝对路径http
    $scope.appRoot = rootModule;

    $scope.afterLoadCont = function() {
      $scope.tmlLoaded = true;
    };

    $scope.headerUrl = rootModule + "/modules/header/menu.html";

    /*是否加载侧栏 start*/
    $scope.hasSideMenu = function() {
      var regUrl = /modules\/([a-z_0-9]*)\/index.html/ig;
      $rootScope.subNavAry = [];
      var path = regUrl.exec(location.pathname)[1]; //xxx
      $http.get(rootStatic + "web-portal/module/" + path).success(function(data) {
        angular.forEach(data.children, function(n) {
          //if(/R/.test(n.supportOps)){//R为可读
          $rootScope.subNavAry.push(n);
          //}
        });
        if ($rootScope.subNavAry.length > 0) {
          $scope.navUrl = rootModule + "/modules/leftmenu/nav.html";
        } else {
          $scope.navUrl = "";
        }
        // 调转侧栏高亮变化，如：活动模板——>新建活动
        $scope.$watch(function() {
          return $location.path()
        }, function(path) {
          if (path && $(".sideNav .firstSidebar").length > 0) {
            $(".sideNav .firstSidebar").each(function() {
              var defaultBarUrl = $(this).attr("href");
              if (defaultBarUrl.indexOf(path) != -1) {
                $(this).addClass("sbCurrent").parent().siblings("li").find(".sbCurrent").removeClass("sbCurrent");
              }
            });
          }
        });
        $scope.delaySidebarLoad();
      });
    };
    $scope.hasSideMenu();
    /*是否加载侧栏 end*/

    //监听location改变pageUrl
    $scope.delaySidebarLoad = function() {
      $scope.$watch(function() {
        return $location.path()
      }, function(path) {
        if (path) {
          var curPagrUrl = path.substring(1);
          curPagrUrl = curPagrUrl.replace(/\/modify.*/, '/SMScampaign');
          if (path.indexOf("iframe") == -1) { // 正常模板
            $scope.pageUrl = curPagrUrl + ".html?_=" + new Date().getTime();
          } else { //嵌入模板
            $scope.pageUrl = "view/iframe.html?_=" + new Date().getTime();
            var matchUrl = "";
            eachBreakstatus: for (var i = 0; i < $rootScope.subNavAry.length; i++) {
              if ($rootScope.subNavAry[i].url && ($rootScope.subNavAry[i].url).indexOf(path) != -1) {
                matchUrl = $rootScope.subNavAry[i].dataUrl;
                break;
              } else {
                for (var j = 0; j < $rootScope.subNavAry[i].children.length; j++) {
                  if (($rootScope.subNavAry[i].children[j].url).indexOf(path) != -1) {
                    matchUrl = $rootScope.subNavAry[i].children[j].dataUrl;
                    break eachBreakstatus;
                  }
                }
              }
            };
            $scope.iframeSrc = matchUrl;
          }
        }
      });
    }
    //dashboard ——> 营销活动参数
    var locationQueryParams = $location.$$search || {};
    for (var itemsParams in locationQueryParams) {
      var itemsParamsObj = {
        "name": itemsParams,
        "value": locationQueryParams[itemsParams]
      }
      campListParams.push(itemsParamsObj);
    };
    $scope.myActivity = locationQueryParams.myActivity == "true" ? true: false;
    $rootScope.defaultAcType = locationQueryParams.campState || "";

  }]);

//选择店铺controller不再另写文件了
webApp.controller("selectShop", ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.getShops = function() {
      $http.get(rootStatic + "web-component/shop/selector/" + CAMPAIGN_STATIC.tenantId + "?_=" + new Date().getTime()).success(function(response) {
        $scope.shopsList = response;
      })
    };
    $scope.getShops();
    $scope.toRealUrl = function(shopId) {
      $http.get(rootStatic + "module/microMarketing/?shopId=" + shopId).success(function(response) {
        $scope.realUrl = response.dataUrl;
        window.open($scope.realUrl);
      })
    }
  }]);

webApp.directive({
  ngAddsubcurrent: function() {
    return function(scope, element, attr) { //首次加载添加二级导航样式
      scope.$watch(function() {
        return element.attr('href')
      }, function(href) {
        if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
          element.addClass('sbCurrent');
        }
      });
    }
  },
  ngAddsubcur: function() {
    return function(scope, element, attr) {
      scope.$watch(function() {
        return element.attr('href')
      }, function(href) {
        if (location.hash.indexOf(href.replace(/\..*/g, '')) >= 0) {
          var _parent = element.parents('li');
          _parent.find('>a').addClass('sbCurrent');
          _parent.find('dl').show();
          element.addClass('sbSmallCur');
        }
      });
    }
  },
  getRoot: function() {
    return function(scope, element) {
      loadScrip(element);
    }
  }
});

//短信编辑器
function listenLen(objIframe) {
  var nowLen = 0;
  if (jQuery.browser.mozilla) { //ff中每增加一个img，len增加1
    nowLen = objIframe.find("img.varImg").length;
  } else {
    var $iframeButton = objIframe.find("span.iframeButton");
    for (var i = 0; i < $iframeButton.length; i++) {
      nowLen = nowLen + $iframeButton.eq(i).text().length;
    }
  }
  return nowLen;
}
var kindEditorObj = {
  "delEditor": function(id) {
    KindEditor.remove(id)
  },
  "creatEditorforEDM": function(id) {
    //编辑器插件(EDM编辑)
    var ke = KindEditor.create(id, {
      basePath: root + 'components/kindeditor-4.1.6/',
      allowFileManager: true,
      items: ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage', 'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink', '|', 'about'],
      width: '100%',
      height: '350',
      resizeType: 0,
      pasteType: 0,
      fullscreenMode: false,
      //全屏
      newlineTag: "br" //设置换行符
    });
    return ke;

  },
  "creatEditorforEDMPre": function(id) {
    //编辑器插件
    var ke = KindEditor.create(id, {
      basePath: root + 'components/kindeditor-4.1.6/',
      allowFileManager: true,
      items: [],
      width: '100%',
      height: '350',
      resizeType: 0,
      pasteType: 0,
      fullscreenMode: false,
      //全屏
      newlineTag: "br" //设置换行符
    });
    ke.readonly(true);
    return ke;
  },
  "creatEditor": function(id) {
    //编辑器插件
    var ke = KindEditor.create(id, {
      basePath: root + 'components/kindeditor-4.1.6/',
      allowFileManager: true,
      items: [],
      width: '100%',
      resizeType: 0,
      pasteType: 0,
      fullscreenMode: false,
      //全屏
      newlineTag: "br",
      //设置换行符
      afterChange: function() {
        var objIframe = $(document.getElementById('mesIframe').contentWindow.document.body);
        var nowLen = listenLen(objIframe);
        var count = this.count('text');
        var sStr = this.html().match(/&([^n]*?);/g);
        if (sStr) {
          $.each(sStr, function(i, n) {
            count = count - n.match(/&([^n]*?;)/)[1].length;
          });
        }

        if ($(".tdBtn").is(":checked")) {
          KindEditor('.mseLen').html(count + 7 - nowLen);
        } else {
          KindEditor('.mseLen').html(count - nowLen);
        }
        if (KindEditor.IE && this.isEmpty()) {
          objIframe.html("")
        }; //IE删除再添加bug
        //保存后bug，span添加contenteditable属性
        objIframe.find("span").attr("contenteditable", false);
        if (objIframe.find("span")[0]) {
          objIframe.find("span").attr("val", objIframe.find("span")[0].textContent);
        }
      }
    });
    return ke;
  },
  "editorAddElement": function(ele, id, val, orderVal) {
    var imgStr, cvalAttr = '';
    if (typeof orderVal != 'undefined') {
      cvalAttr = orderVal;
    }

    if (jQuery.browser.mozilla) { //ff用img，其他button
      imgStr = "<img id='" + id + "' class='varImg " + orderVal + "' src='' alt=" + val + ">";
    } else {
      imgStr = "<span id='" + id + "' class='iframeButton " + orderVal + "'>" + val + "</span>" + "&nbsp;";
    }
    ele.insertHtml(imgStr);
  },
  "firstSetVal": function(value) { //获取数据
    var firstValue;
    if (jQuery.browser.mozilla) {
      //var regOne=/<span id=['\\"](\d+)['\\"] class=['\\"]iframeButton['\\"] contenteditable=['\\"]false['\\"]>([^<\/span>]+)<\/span>/gi;
      var regOne = /<span id=(['\\"])(\d+)\1 class=\1iframeButton(\s[#a-z]*)\1>([^<\/span]+)<\/span>(&nbsp;)?/gi;
      var flagOne = regOne.test(value);
      if (flagOne) {
        firstValue = value.replace(regOne, "<img id='$2' class='varImg$3' src='' alt='$4' />");
      } else {
        firstValue = value;
      }
    } else {
      var regTwo = /<img id=(['\\"])(\d+)\1 class=\1varImg(\s[#a-z]*)\1 src=\1\1 alt=\1([^\/>]+)\1 \/>(&nbsp;)?/gi;
      var flagTwo = regTwo.test(value);
      if (flagTwo) {
        firstValue = value.replace(regTwo, "<span id='$2' class='iframeButton$3' contenteditable='false'>$4</span>");
      } else {
        firstValue = value;
      }
      var valReg = />$/;
      if (valReg.test(firstValue)) { //IE无法获取光标bug
        firstValue += "&nbsp;";
      }
    }
    return firstValue;
  },
  "getKindEditorVal": function(s) {
    s = jQuery.trim(s.replace(/\<br \/\>/gi, "").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
    if (jQuery.browser.mozilla) {
      return s = (s.replace(/^(&nbsp;\s*)+/, "")).replace(/(&nbsp;\s*)+$/, "");
    } else { //去浏览器添加的空格
      s = (s.replace(/^(&nbsp;\s*)+/, "")).replace(/(&nbsp;\s*)+$/, "");
      var spanReg = /(<span id="(\d+)" class="iframeButton">[^<\/span>]+<\/span>)&nbsp;/gi;
      s = s.replace(spanReg, "$1");
      return s = s.replace(/<p>\s*/g, "").replace(/<\/p>\s*/g, "").replace(/\n*/g, "");
    }
  }
}
