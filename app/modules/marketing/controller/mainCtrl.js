(function() {
  $.ajaxSetup({ cache: true });
})();

var campListParams = []; // 初始化grid的参数
var hdValue = ""; //为了保留搜索结果，最简单的全局参数-_-!
var activityListParams;
var groupListParams;
var groupListPar;
var templateListParams;

function loadScrip(obj) {
  if (obj.attr('_href')) {
    obj.attr('href', root + obj.attr('_href'));
  }
  if (obj.attr('_src')) {
    $.ajax({
      url: root + obj.attr('_src'),
      dataType: 'script',
      async: false,
      cache: obj.attr('cache') ? true : false,
      success: function() {
        obj.remove();
      }
    });
  }
}

angular.module('campaign.controllers', []);

var webApp = angular
  .module("campaign.App", [
    'campaign.controllers',
    'campaign.directives',
    'campaign.dataServices',
    'marketingCommondirectives',
    'commser',
    'components.selectorByShops'])
  .config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {
      $stateProvider
        .state('campaign.marketActivity', {
          url: "/marketActivity",
          templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/marketActivity.html'
        })
        .state('campaign.market', {
          url: "/market",
          templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/marketActivities.html',
        })
        // 营销活动列表视图
        .state('campaign.market.list', {
          url: '/list',
          templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/activities.html',
        })
        // 营销活动日历视图
        .state('campaign.market.calendar', {
          url: '/calendar',
          templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/calendar.html',
        })
        // 画布视图
        .state('campaign.market.details', {
          url: '/details/:id/:workflowId',
          views: {
            "details": {
              templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/workflow.html?_=' + new Date().getTime()
            }
          }
        })

        .state('campaign.customerSegmentation', {
          url: "/customerSegmentation",
          templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/customerSegmentation/partition.html'
        })
        .state('campaign.customerGroup', {
          url: "/customerGroup",
          templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/customer/group.html'
        })
        .state('campaign.ActiveTemplate', {
          url: "/ActiveTemplate"
        })
        .state('campaign.ActiveTemplate.localTemplate', {
          url: "/localTemplate",
          views: {
            '@campaign': {
              templateUrl: CAMPAIGN_STATIC.tplBasePath + 'view/ActiveTemplate.html'
            }
          }
        })
        .state('campaign.iframe', {
          url: "/{moduleUrl}",
          templateUrl: CAMPAIGN_STATIC.tplBasePath + "view/iframe.html"
        });

    }]);

webApp.controller("campaignMainCtrl", [
  '$scope',
  '$http',
  '$location',
  '$rootScope',
  'getListService',
  '$resource',
  '$state',
  function($scope, $http, $location, $rootScope, getListService, $resource, $state) {
    // 清空保存的参数
    activityListParams = { searchText: "", newp: 1, rp: 20, params: [{ name: "myActivity", value: false }, { name: "campState", value: "" }] }; //活动列表参数保留
    groupListParams = { searchText: "", newp: 1, rp: 20 }; // 客户分组参数保留
    groupListPar = { searchText: "", newp: 1, rp: 20 }; // 客户分群节点参数
    templateListParams = { searchText: "", newp: 1, rp: 20 }; // 活动模板参数保留

    $scope.menusOptions = {
      unfold: true,
      shops: false,
      menusResource: $resource(GLOBAL_STATIC.portalRoot + 'module/' + CAMPAIGN_STATIC.tenantId + '/marketing')
    };
    /*end*/

    // 定义变量，页面跳转使用
    $scope.appOrigin = location.protocol + "//" + location.host; // 获取绝对路径http
    $scope.appRoot = GLOBAL_STATIC.rootModule;

    $scope.afterLoadCont = function() {
      $scope.tmlLoaded = true;
      $location.search({})

      // campListParams = []//左侧切换的时候需要初始化这个全局参数，否则参数不会被清空，请求出现错误结果。
    };

    // $scope.headerUrl = rootModule + "/modules/header/menu.html";

    /*是否加载侧栏 start*/
    $scope.hasSideMenu = function() {
      var regUrl = /modules\/([a-z_0-9]*)\/index.html/ig;
      $rootScope.subNavAry = [];
      var path = regUrl.exec(location.pathname)[1]; //xxx
      $http.get(GLOBAL_STATIC.portalRoot + "module/" + path).success(function(data) {
        angular.forEach(data.children, function(n) {
          //if(/R/.test(n.supportOps)){//R为可读
          $rootScope.subNavAry.push(n);
          //}
        });
        if ($rootScope.subNavAry.length > 0) {
          $scope.navUrl = GLOBAL_STATIC.rootModule + "/modules/leftmenu/nav.html";
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
    //$scope.hasSideMenu();
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
            $rootScope.iframeSrc = matchUrl;
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
      if (itemsParamsObj.name === 'myActivity') {
        activityListParams.params[0].value = (itemsParamsObj.value == 'true' ? true : false);
      } else if (itemsParamsObj.name === 'campState') {
        activityListParams.params[1].value = itemsParamsObj.value;
      } else if (itemsParamsObj.name === 'myApproval') {
        activityListParams.params.push(itemsParamsObj);
      }
    };
    $scope.myActivity = locationQueryParams.myActivity == "true" ? true : false;
    $rootScope.defaultAcType = locationQueryParams.campState || "";
    if ($state.current.name === "campaign") {
      $state.go('campaign.market');
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
      basePath: GLOBAL_STATIC.rootModule + '/components/kindeditor-4.1.6/',
      allowFileManager: true,
      items: ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage', 'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink', '|', 'about'],
      width: '100%',
      height: '350',
      resizeType: 0,
      pasteType: 0,
      filterMode: false,
      fullscreenMode: false,
      //全屏
      newlineTag: "br" //设置换行符
    });
    return ke;

  },
  "creatEditorforEDMPre": function(id) {
    //编辑器插件
    var ke = KindEditor.create(id, {
      basePath: GLOBAL_STATIC.rootModule + '/components/kindeditor-4.1.6/',
      allowFileManager: true,
      items: [],
      width: '100%',
      height: '350',
      resizeType: 0,
      pasteType: 0,
      filterMode: false,
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
      basePath: GLOBAL_STATIC.rootModule + '/components/kindeditor-4.1.6/',
      // cssPath: root + 'components/kindeditor-4.1.6/kindeditor.css',
      allowFileManager: true,
      filterMode: true,
      htmlTags: {
        "img": ["class", "id", "alt", "type"],
        "span": ["class", "id", "cc"],
        "input": ["id", "class", "type", "value", "readonly"]
      },
      items: [],
      width: '100%',
      resizeType: 0,
      pasteType: 1,
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
        var inputs = objIframe.find("input");
        inputs.each(function(a, b) {
          /*var width = b.value.length * 14;
          $(b).width(width);
          $(b).css({
            "color": "red",
            "text-align": "center",
            border: "none"
          })*/
          objIframe.find('#input_substitute').remove();
          objIframe.append('<button  id="input_substitute" style="display:none;">' + b.value + '</button>');
          var width = objIframe.find('#input_substitute').width();
          $(b).width(width);
          $(b).css({ "color": "red", "text-align": "center", border: "none" });
          objIframe.find('#input_substitute').html('');
        });
        var spans1 = objIframe.find("span");
        if (spans1.length > 0) {
          spans1.each(function(a, b) {
            if (b.id.indexOf("__kindeditor_bookmark_start") >= 0) {
              if (b.style.display != "none") {
                $(b).remove()
              }
            }

          })
        }
        /*针对此编辑器bug 粘贴撤退操作下会生成个唯一id的span标签*/
        //保存后bug，span添加contenteditable属性
        /*                objIframe.find("span").attr("contenteditable", false);
         if (objIframe.find("span")[0]) {
         objIframe.find("span").attr("val", objIframe.find("span")[0].textContent);}
         var spans1=objIframe.find("span")
         if(spans1.length>0){
         spans1.each(function(a,b){
         if(b.id.indexOf("__kindeditor_bookmark_start")>=0){
         $(b).remove()
         }

         })
         }针对此编辑器bug 粘贴撤退操作下会生成个唯一id的span标签*/

        /* var spans=objIframe.find("span.iframeButton")*/
        objIframe.find(".__kindeditor_paste__").remove()
        /*针对此编辑器bug  粘贴情况下生成__kindeditor_paste__的div标签*/
        /* if(spans.length>0){
         spans.each(function(a,b){
         if($(b).find("span.iframeButton").length>0){
         var t=$(b).attr("cc")
         var cc=$(b).attr("cc")
         $(b).find("span.iframeButton").remove()
         $(b).html(t)
         $(b).attr("cc",t)
         }

         var cc=$(b).attr("cc")
         var tpl=$(b).text()
         var index=tpl.indexOf(cc)
         if(index&&cc){
         var prev=tpl.slice(0,index)
         var last=tpl.slice(index)
         $(b).html(last)
         $(b).before(prev)
         }

         if(tpl!=cc){
         $(b).html(cc)
         }
         })
         }*/

      }
    });
    return ke;
  },
  "editorAddElement": function(ele, id, val, orderVal) {
    var imgStr, cvalAttr = '';
    if (typeof orderVal != 'undefined') {
      cvalAttr = orderVal;
    }
    /*      imgStr = "<input    readonly='readonly'  id='" + id + "' class='btInput'  value='"+val+"'>";*/
    if (jQuery.browser.mozilla) { //ff用img，其他button
      imgStr = "<img id='" + id + "' style='margin:1px;' class='varImg " + orderVal + "' alt='" + val + "'>";
    } else {
      imgStr = "<input    readonly='readonly'  id='" + id + "' style='margin:1px;' class='btInput'  value='" + val + "'>";
    }
    ele.focus();
    ele.insertHtml(imgStr);

    /*        var objIframe = $(document.getElementById('mesIframe').contentWindow.document.body);
     var inputs=objIframe.find("input")
     inputs.each(function(a,b){
     var width= b.value.length*14
     $(b).width(width)
     $(b).css({"color":"red","text-align":"center",border:"none"})
     })*/

  },
  "editorAddElementHFive": function(ele, id, val, orderVal, shopId, pltType, url, tenant) {
    var imgStr, cvalAttr = '';
    if (typeof orderVal != 'undefined') {
      cvalAttr = orderVal;
    }
    if (jQuery.browser.mozilla) {//ff用img，其他button
      imgStr = "<img id='" + id + "' class='varImg " + orderVal + "' src='" + url + "' name='" + pltType + "' align='" + tenant + "' title='" + shopId + "' alt=" + val + ">";
    } else {
      imgStr = "<input    readonly='readonly'  id='" + id + "' class='btInput'  value='" + val + "' alt='" + shopId + "' name='" + pltType + "' align='" + tenant + "' src='" + url + "' >";
    }
    ele.focus()
    ele.insertHtml(imgStr);
  },
  "firstSetVal": function(value) { //获取数据
    var firstValue;
    firstValue = value;
    if (jQuery.browser.mozilla) {
      //var regOne=/<span id=['\\"](\d+)['\\"] class=['\\"]iframeButton['\\"] contenteditable=['\\"]false['\\"]>([^<\/span>]+)<\/span>/gi;
      /*        var regOne = /<span id=(['\\"])(\d+)\1.*?class=\1iframeButton(\s[#a-z]*)\1[^\>]*>([^<\/span]+)<\/span>(&nbsp;)?/gi;
       var flagOne = regOne.test(value);
       if (flagOne) {
       firstValue = value.replace(regOne, "<img id='$2' class='varImg$3' src='' alt='$4' />");
       } else {
       firstValue = value;
       }*/
      //把span转为img 的逻辑不需要了
    } else {
      /*       var regTwo = /<img id=(['\\"])(\d+)\1 class=\1varImg(\s[#a-z]*)\1 src=\1\1 alt=\1([^\/>]+)\1 \/>(&nbsp;)?/gi;
       var flagTwo = regTwo.test(value);
       if (flagTwo) {
       firstValue = value.replace(regTwo, "<span id='$2' class='iframeButton$3' contenteditable='false' cc='$4'>$4</span>");
       } else {
       firstValue = value;
       }*/
      //把img转span的逻辑不需要了
      var valReg = />$/;
      if (valReg.test(firstValue)) { //IE无法获取光标bug
        firstValue += "&nbsp;";
      }
    }
    return firstValue;
  },
  "getKindEditorVal": function(s) {
    s = jQuery.trim(s.replace(/\<br \/\>/gi, ""));
    if (jQuery.browser.mozilla) {
      return s = (s.replace(/^(&nbsp;\s*)+/, "")).replace(/(&nbsp;\s*)+$/, "");
    } else { //去浏览器添加的空格
      s = (s.replace(/^(&nbsp;\s*)+/, "")).replace(/(&nbsp;\s*)+$/, "");
      var spanReg = /(<span id="(\d+)" class="iframeButton">[^<\/span>]+<\/span>)&nbsp;/gi;
      s = s.replace(spanReg, "$1");
      return s
    }
  }
};
