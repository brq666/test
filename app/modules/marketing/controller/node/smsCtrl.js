(function(window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  app.filter('GroupByType', function() {
    return function(items, type) {
      var newItems = [];
      angular.forEach(items, function(item) {
        if (item.groupType == type) {
          newItems.push(item);
        }
      });
      return newItems;
    }
  });
  app.controller('smsCtrl', ["$scope", "$http", "$compile", "$window", "$location", "saveService", "getListService", "$filter","$sce", "$q", "$rootScope",
    function($scope, $http, $compile, $window, $location, saveService, getListService, $filter, $sce, $q, $rootScope) {
      $scope.openNodePop(); //调用弹框方法
      $scope.blacklistTip = "";
      $scope.redlistTip = "";
      $scope.data = {};
      $scope.data.name = "";
      $scope.data.code = graph.nodeId;
      $scope.nodecomment = $scope.data.remark;
      $scope.numCheck = true;
      $scope.count = 0;
      $scope.varCount = 0;
      $scope.editorHide = true;
      $scope.bannerall = false;
      $scope.sShow = false;
      $scope.smsShowContents = [];
      $scope.data.outputControl = '0';
      $scope.data.deliveryTimeSelection = '0';
      $scope.data.overAssignDelivery = true;
      $scope.data.unsubscribe = true;
      $scope.flag = 1;
      $scope.sign_true = true;
      $scope.timedisabled = true;
      $scope.errorMessage = true;
      $scope.error_sShow = true;
      $scope.a = [];
      $scope.showNodeReport = false;
      $scope.pagination = {
        "currentPage": 1,
        "pagesize": 20
      };
      $scope.$watch('data.deliveryTimeSelection', function() {
        if ($scope.data.deliveryTimeSelection == "1") {
          $scope.timedisabled = false;
        } else {
          $scope.timedisabled = true;
        }
      });
      kindEditor = kindEditorObj.creatEditor("#textEditor");
      $('.ke-statusbar').height(32);

      function settingCurCount() {
        if( $(document.getElementById('mesIframe').contentWindow.document.body).find('#input_substitute').html() ){
          var str1 = $(document.getElementById('mesIframe').contentWindow.document.body).find('#input_substitute').html();
          var str2 = $(document.getElementById('mesIframe').contentWindow.document.body).html()
          var str3 = str2 + str1;
          $(document.getElementById('mesIframe').contentWindow.document.body).html(str3)
          $(document.getElementById('mesIframe').contentWindow.document.body).find('#input_substitute').html('');
        }
        if (kindEditorObj.getKindEditorVal(kindEditor.html()) != "") {
          $scope.editorHide = true;
        } else {
          $scope.editorHide = false;
        }

        var str=kindEditor.html()
        var regSpace=/(&nbsp;)/g
        str=str.replace(regSpace,function(){return " "})
        str=str.replace(/(^\s+)|(\s+$)/g, "")
        var regHasValue=/(<img[^\>]*?>)|(<span\s?[^\>]*>.*?<\/span>)|(<input[^\>]*?>)/gi
        str=str.replace(regHasValue,"")

        var objIframe = $(document.getElementById('mesIframe').contentWindow.document.body);
        var nowLen = listenLen(objIframe);
        /*   var count = kindEditor.count('text');*/
        var count = str.length
        var sStr = kindEditor.html().match(/&([^n]*?);/g);
        if (sStr) {
          $.each(sStr, function(i, n) {
            count = count - n.match(/&([^n]*?;)/)[1].length;
          });
        }
        var customBlankLen = kindEditor.html().replace(/(&nbsp;*\s*)+$/, "").match(/<span[\s\S]*?<\/span>&nbsp;/gi) || []; //自定义js加上去的空格，去除长度
        //var imgBlankLen=(kindEditor.html().replace(/(&nbsp;*\s*(\<br \/\>)*)+$/,"").match(/<img[\s\S]*?>\s/gi)||[]).length;
        $scope.count = count - customBlankLen.length;
        $scope.varCount = (kindEditor.html().split('<input').length - 1) + (kindEditor.html().split('<img').length - 1);
      };

      $scope.tagClick = function(id, name, tag, lid) {
        if (lid === 3) {
          $('#currentIntegral').addInteractivePop({
            magTitle: "卡类型选择",
            width: 732,
            mark: false,
            position: "fixed",
            childElePop: true
          });
          $scope.getCardList();
        } else{
          $scope.editorHide = true;
          kindEditorObj.editorAddElement(kindEditor, id, name, tag);
          settingCurCount();
        }
      }

      $scope.initEditor = function() {
        $sd = $(document.getElementById('mesIframe').contentWindow.document.body)
        //$(".ke-statusbar").hide();
        //$(".ke-toolbar").hide()

        // 节点不可编辑,
        if (!graph.isEditable) {
          $(document.getElementById('mesIframe')).css({
            "position": "relative",
            "zIndex": 100
          });
          kindEditor.readonly(true);
        }

        $sd.bind('paste',function(){
          setTimeout(function(){
            $scope.$apply(function() {
              settingCurCount();
            })
          },100)
        })

        $sd.keyup(function() {
          $scope.$apply(function() {
            settingCurCount();
          })
        })

      }
      $scope.initEditor();
      //获取店铺下的商品信息
      $scope.getGoodsOfShop = function(param) {
        var shopId = $scope.shopId,
            query = $scope.hdQuery || '';
        var params = {
          'page': 1,
          'pagesize': 20,
          'shopId': shopId,
          'sortname': 'list_time',
          'query': query
        };
        angular.extend(params, param);
        var callback = function(dat) {
          $scope.goods = dat.data;
          $scope.pagination.currentPage = dat.page;
          if (dat.hasOwnProperty('total') && dat.total > 0) {
            $scope.pagination.totalPage = Math.ceil(dat.total / params.pagesize);
          } else {
            $scope.pagination.totalPage = 1
          }
        }
        getListService.getGoodsOfShop(params, callback);
      }
      //选择短链商品
      $scope.checkGood = function(e) {
        var currentTarget = $(e.currentTarget);
        var sibling = $('input[name=checkGoods]');
        angular.forEach(sibling, function(item) {
          item.checked = false;
        });
        currentTarget.prop('checked', true);
        $scope.productUrl = currentTarget.attr('data-id'); //短链生成接口调整
        //$scope.productUrl = currentTarget.prop('value');
        //if($scope.productUrl == '') {
        //var id = currentTarget.attr('data-id');
        //$scope.productUrl = 'http://item.taobao.com/item.htm?id=' + id;
        //}
        $scope.checkedGoodUrl = true;
      }
      //获取店铺下信息
      $scope.getShops = function(flag) {
        var callback = function(dat) {
          $scope.shops = dat;
          $scope.shopId = dat[0].idInPlat;
          if(!flag) {
            // 获取商品信息
            $scope.getGoodsOfShop({
              "shopId": $scope.shopId
            });
          }
        }
        getListService.getShopsByPlatformId(callback, 1); //查下的店铺需要有权限限制
      }

      $scope.chainChange = function(shortChainType) {
        $scope.customChain = "";
        $scope.shortChainType = shortChainType;
        $scope.customChain = shortChainType !== 1 ? '' : $scope.customChain
        for(var i=0; i < $scope.chainTypes.length; i++) {
          var item = $scope.chainTypes[i];
          if(shortChainType == item.id) {
            $scope.shortChainTip = item.tip;
          }
        }
      }
      //淘宝短链-》短链类型变化时
      $scope.subChainTypeChange = function(subChainType) {
        $scope.subChainType = subChainType;
      }
      $scope.getShortLinkType = function() {
        var callback = function(dat) {
          $scope.chainTypes = dat;
          $scope.chainChange(2);//默认为淘宝短链
        }

        getListService.getShortLinkType(callback);
      }

      $scope.insertCurrentIntegral = function(e) {
        var currentTarget = $(e.target);
        var curTypeElement = angular.element("#currentIntegral li.cur a");
        if(curTypeElement.length > 0) {
          var name = curTypeElement.attr('title');
          var id = curTypeElement.attr("id");
          $scope.editorHide = true;
          kindEditorObj.editorAddElement(kindEditor, id, name);
          settingCurCount();
        }
        currentTarget.closest(".ccmsPublicPop").hide();
        angular.element(".ccmsPublicPop").find(".childElementMark").remove();
      }

      $scope.labelClick = function(id, name, order,tag,lid) {
        $scope.labelOb = {
          "id": id,
          "name": name,
          "order": order
        }
        if (id === 1) {
          $scope.shopId = "";
          $scope.goods = [];
          $('#shortChainOfShops').addInteractivePop({
            magTitle: "商品选择",
            width: 800,
            mark: false,
            position: "fixed",
            padding: 0,
            childElePop: true
          });
          $scope.HFiveStyle = 'goods';
          $scope.getShops();
          $scope.hdQuery = '';
          $scope.checkedGoodUrl = false;
        }
        else if(id === 4){
          $('#ChainOfHfive').addInteractivePop({
            magTitle: "H5页面选择",
            width: 560,
            mark: false,
            position: "fixed",
            padding: 0,
            childElePop: true
          });
          $scope.getHFiveShops();
          $scope.HFive = [];
          $scope.hdQuery = '';
          $scope.HFiveStyle = 'list';
          $scope.hideSelect = true;
          $('.default_color').show();
          $scope.checkedHFiveUrl = false;
        }
        else if (id === 2) {
          $('#shortChainOfCustom').addInteractivePop({
            magTitle: "自定义短链",
            width: 800,
            mark: false,
            position: "fixed",
            childElePop: true
          });
          $scope.getShortLinkType();

          $scope.customChain = "";
          $scope.shortLinkName = "";
          $scope.shortLinkWarning = false;
          $scope.shortNameClass = "";

          $scope.subChainTypes = [{"id": 3, "name":"活动页面"}, {"id": 2, "name": "店铺首页"}];
          $scope.subChainType = 3; //默认为活动页面
          $scope.getShops();
        } else if(id === 3) {
           $('#currentIntegral').addInteractivePop({
            magTitle: "卡类型选择",
            width: 732,
            mark: false,
            position: "fixed",
            childElePop: true
          });
          $scope.getCardList();
        }
        else if(tag){
          $scope.editorHide = true;
          kindEditorObj.editorAddElement(kindEditor, lid, name, tag);
          settingCurCount();
        }
      }

      //获取H5链接店铺
      var defaultShopId = window.CCMS_INFOS_CONFIG.H5MODELShop;
      $scope.getHFiveShops = function() {
        var callback = function(dat){
          $scope.shops = dat.shop;
          $scope.shopId = dat.shop[0].shopId;
          $scope.pltType = dat.shop[0].pltType;
          $scope.shopName = dat.shop[0].shopName;
          $scope.tenant = dat.tenant_id;
          $scope.getMessageOfHFive({
            "shopId": $scope.shopId,
            "pltType": $scope.pltType
          });
        }
        // getListService.getShopsByHfive(callback, 1); //查下的店铺需要有权限限制
        $scope.shops = [{shopId: defaultShopId, shopName: '百丽集团'}];
        $scope.shopId = defaultShopId;
        $scope.pltType = 'plt_taobao_shop';
        $scope.shopName = '百丽集团';
        $scope.tenant = $rootScope.tenantId;
        $scope.getMessageOfHFive({
          "shopId": $scope.shopId
        });
      }

      //获取H5链接下的信息
      $scope.getMessageOfHFive = function(param) {
        var shopId = defaultShopId,//$scope.shopId,
            pltType = 'plt_taobao_shop',//$scope.pltType,
            query = $scope.hdQuery || '';
        var params = {
          'page_index': 1,
          'page_size': 6,
          'shop_id': shopId,
          'pltType': pltType,
          'thumbnail': 0,
          'keyword': query
        };
        angular.extend(params, param);
        var callback = function(dat) {
          for (var i = 0; i < dat.data.length; i++) {
            dat.data[i].time = dat.data[i].time.substring(0,dat.data[i].time.length-2);
          }
          $scope.HFive = dat.data;
          $scope.urlLength = dat.urlLength;
          if(dat.page_index == 0){
            $scope.pagination.currentPage = 1;
          }
          else{
            $scope.pagination.currentPage = dat.page_index;
          }
          $scope.pagination.currentPage1 = $scope.pagination.currentPage;
          if (dat.hasOwnProperty('page_count') && dat.page_count > 0) {
            //$scope.pagination.totalPage = Math.ceil(dat.tp / params.page_size);
            $scope.pagination.totalPage = dat.page_count;
          } else {
            $scope.pagination.totalPage = 1;
          }
        }
        getListService.getMessageOfHFive(params, callback);
      }

      //H5链接选择店铺
      $scope.shopChangeOfHFive = function(shopId,type,name) {
        $scope.shopId = shopId;
        $scope.pltType = type;
        $scope.shopName = name;
        $scope.hideSelect = true;
        $scope.getMessageOfHFive({
          "shopId": shopId,
          "pltType": type
        });
      }

      //H5点击搜索框
      $scope.HFiveFocus = function(){
        $('.default_color').hide();
        $('.commSearchVal').focus();
      }
      $scope.HFiveBlur = function(){
        if( $scope.hdQuery == ''){
          $('.default_color').show();
        }
      }

      //H5链接搜索
      $scope.searchHFiveButton = function(hdQuery) {
        $scope.getMessageOfHFive({
          "query": hdQuery,
          "shopId": $scope.shopId
        });
      }

      //页码框 输入enter键请求
      $scope.pagination.enterPage = function(e) {
        if (e.keyCode == 13) {
          if (!$scope.pagination.currentPage) {
            $scope.pagination.currentPage1=$scope.pagination.currentPage=1;
            var params1 = {
              'page_index': $scope.pagination.currentPage1,
              'page_size': 6,
              'shop_id': $scope.shopId,
              'pltType': $scope.pltType,
              'thumbnail': 0,
              'keyword': $scope.hdQuery || ''
            };
            $scope.getMessageOfHFive(params1);
            return;
          }
          $scope.pagination.currentPage = +$scope.pagination.currentPage;
          if (!isNaN($scope.pagination.currentPage) && angular.isNumber($scope.pagination.currentPage)) {
            if ($scope.pagination.currentPage > $scope.pagination.totalPages) {
              $scope.pagination.currentPage1=$scope.pagination.currentPage = $scope.pagination.totalPages;
              return;
            } else if ($scope.pagination.currentPage < 1) {
              $scope.pagination.currentPage = 1;
              return;
            }
            $scope.pagination.currentPage1=$scope.pagination.currentPage;
            // 查询
            var params1 = {
              'page_index': $scope.pagination.currentPage1,
              'page_size': 6,
              'shop_id':$scope.shopId,
              'pltType': $scope.pltType,
              'thumbnail': 0,
              'keyword': $scope.hdQuery || ''
            };
            $scope.getMessageOfHFive(params1);
          } else {
            $scope.pagination.currentPage1=$scope.pagination.currentPage = 1;
            var params1 = {
              'page_index': $scope.pagination.currentPage1,
              'page_size': 6,
              'shop_id': $scope.shopId,
              'pltType': $scope.pltType,
              'thumbnail': 0,
              'keyword':$scope.hdQuery || ''
            };
            $scope.getMessageOfHFive(params1);
          }
        }
      }

      //H5链接选择信息
      $scope.onOff = null;
      $scope.checkHFive = function(e) {
        var currentTarget = $(e.currentTarget);
        var sibling = $('input[name=checkGoods]');
        /*angular.forEach(sibling, function(item) {
          item.checked = false;
        });*/
        /*sibling.click(function(){
          if(!this.checked){
            this.checked = true;
          }else{
            this.checked = false;
          }
        })*/
        if( !$scope.onOff ){
          angular.forEach(sibling, function(item) {
            item.checked = false;
          });
          currentTarget.prop('checked', true);
          $scope.HFiveUrl = currentTarget.attr('data-id');
          $scope.HFivePreview = currentTarget.val();
          $scope.HFiveTitle = currentTarget.attr('data-title');
          $scope.checkedHFiveUrl = true;
          $scope.onOff = true;
        }else{
          angular.forEach(sibling, function(item) {
            item.checked = false;
          });
          $scope.checkedHFiveUrl = false;
          $scope.onOff = false;
        }
      }

      //H5获取短链
      $scope.insertHFiveChain = function(e) {
        var currentTarget = $(e.currentTarget);
        if ($scope.checkedHFiveUrl === true) {
            $scope.checkedHFiveUrl = false;
            $scope.editorHide = true;
            var name = $scope.HFiveTitle+'(' + $scope.urlLength + '个字)';
            //var id = $scope.HFiveUrl;
            var id = 'h5^'+ $scope.pltType +'^'+ $scope.tenant +'^' + $scope.shopId +'^' + $scope.HFivePreview;
            var mozilla = 'mozilla';
            var shopid = $scope.shopId;
            var pltType = $scope.pltType;
            var url = $scope.HFivePreview;
            var tenant = $scope.tenant;
            //kindEditor.insertHtml(dat.shorturl);
            kindEditorObj.editorAddElementHFive(kindEditor, id, name,mozilla,shopid,pltType,url,tenant);
            settingCurCount();
            currentTarget.closest(".ccmsPublicPop").hide();
            angular.element(".ccmsPublicPop").find(".childElementMark").remove();
        } else {
          $(this).Alert({
            "title": "提示",
            "str": "请先选择一个H5页面",
            "mark": true,
            "eleZindex":1010,
            "markZindex":1005
          })
          $('.ccmsPublicPopBg').css({
            'z-index':'1002'
          })
          $('.yunat_maskLayer').eq(1).css({
            'z-index':'1001'
          })
        }
      }

      //判断是否有H5短链
      $scope.testhfive = function(meg){
        console.log( kindEditorObj.getKindEditorVal(kindEditor.html()) )
        var reg = /vcrm\.me\/A[A-Za-z0-9]{1,5}/g;
        var str = kindEditorObj.getKindEditorVal(kindEditor.html());
        var tempStr = str.replace(reg, '<temp#>');// /{1,5}(?!)/反向预查的bug，解决方案先temp替换，
        if(meg == 'preview'){
          if( /<temp#>(?!\")/.test(tempStr)){// 格式为：'crm.me/A64v" name=' | src="表示动态插入
            $(".testSavePop").addInteractivePop({
              magTitle: "提示",
              width: 508,
              mark: false,
              position: "fixed",
              childElePop: true
            });
          }
          else{
            $scope.previewStatus = true;
            $scope.smsClickShow();
          }
        }
        else{
          if(/<temp#>(?!\")/.test(tempStr)){
            $(".testSaveHfive").addInteractivePop({
              magTitle: "提示",
              width: 508,
              mark: false,
              position: "fixed",
              childElePop: true
            });
          }
          else{
            $scope.saveSmsMessageCheck();
          }
        }
      }

      //获取积分信息
      $scope.getCardList = function() {
        var callback = function(data) {
          data.forEach(function(card, index) {
            data[index].ctyTitleName = card.ctyName;
            if(card.ctyName.length > 18) {
              data[index].ctyName = data[index].ctyName.slice(0, 17) + '...';
            }
          })
          $scope.cardList = data;
        }
        getListService.getCardList(callback);
      }
      $scope.chooseCardList = function(index) {
        var typeElement = angular.element("#currentIntegral li");
        for (var i = 0; i < typeElement.length; i++) {
          if (index != i) {
            typeElement.eq(i).removeClass('cur');
          }
        }
        var elem = typeElement.eq(index)
        elem.toggleClass("cur");
      }


      $scope.shopChange = function(shopId) {
        $scope.shopId = shopId;
        $scope.getGoodsOfShop({
          "shopId": shopId
        });
      }

      $scope.searchHdButton = function(hdQuery) {
        $scope.getGoodsOfShop({
          "query": hdQuery,
          "shopId": $scope.shopId
        });
      }

      $scope.insertCustomChain = function(e) {
        var currentTarget = $(e.currentTarget);
        //短链服务类型
        var shortChainType = $scope.shortChainType;
        //淘宝短链类型
        var subChainType = shortChainType === 2 ? $scope.subChainType : '' ;
        //微博短链的地址和淘宝短链活动页面地址
        var taobao_linkData = shortChainType === 1 || (shortChainType === 2 && subChainType === 3) ? $scope.customChain : '';
        //淘宝短链的店铺id
        var shortLinkName = $scope.shortLinkName;
        var taobao_shopid = shortChainType === 2 ? $scope.shopId : '';
        var errorMessage = shortChainType === 1 ? '您还没有输入需要插入短信中的链接' : '您还没有输入要插入短信中的页面地址';
        var errorFlag = false;
        if (shortChainType == 1) {//微博短链支持http或https
          var regE = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
        }else{//只支持http
          var regE = /^http:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
        }
        if (!((shortChainType ===2 && subChainType === 2) ||
            (!(shortChainType === 2 && subChainType === 2)) && taobao_linkData && taobao_linkData.trim())){
          $(this).Alert({
            "title":'提示',
            "str": errorMessage,
            "mark": true,
            "eleZindex":1010,
            "markZindex":1005
          });
          return;
        }
        if(shortChainType ===2) {
          if(!shortLinkName) {
            $scope.shortLinkWarning = true;
            $scope.shortNameClass = "error";
            return ;
          }
          else {
            $scope.shortLinkWarning = false;
            $scope.shortNameClass = "";
          }
        }

        if (taobao_linkData && taobao_linkData.length > 500){
          $(this).Alert({
            "title": '提示',
            "str": '您输入的链接长度不能超过500',
            "mark": true,
            "eleZindex":1010,
            "markZindex":1005
          });
          return;
        }
        if(taobao_linkData && !regE.test(taobao_linkData)) {
          $(this).Alert({
            "title": '提示',
            "str": '请先填写完整的链接地址:http://example.com',
            "mark": true,
            "eleZindex":1010,
            "markZindex":1005
          });
          return;
        }
        var params = {
          'shortLinkServiceType': shortChainType,
          'taobao_linkType': subChainType,
          'taobao_linkData': taobao_linkData,
          'taobao_shopid': taobao_shopid
        };

        if(shortChainType === 2) {
          params.shortLinkName = shortLinkName;
        }

        var callback = function(dat) {
          if (dat.result === 'error'){
            $(this).Alert({
              "title": '提示',
              "str": dat.errorMessage,
              "mark": true,
              "eleZindex":1010,
              "markZindex":1005
            });
            $scope.createChainFlag = false;
            currentTarget.addClass('btnBlue');
            currentTarget.prop('disabled', false);
            return;
          }
          $scope.editorHide = true;
          kindEditor.insertHtml(dat.shorturl);
          settingCurCount();
          $scope.createChainFlag = false;
          currentTarget.closest(".ccmsPublicPop").hide()
          currentTarget.addClass('btnBlue');
          currentTarget.prop('disabled', false);
          angular.element(".ccmsPublicPop").find(".childElementMark").remove();
        }

        $scope.createChainFlag = true;
        currentTarget.removeClass('btnBlue');
        currentTarget.prop('disabled', true);
        getListService.getShortLink(params, callback);
      }

      $scope.insertShortChain = function(e) {
        var currentTarget = $(e.currentTarget);
        if ($scope.checkedGoodUrl && $scope.checkedGoodUrl === true) {
          var params = {
            'shortLinkServiceType': 2, //生成短链接口调整，2表示淘宝短链
            'taobao_linkType': 1, //生成短链接口调整，1表示商品
            'taobao_linkData': $scope.productUrl, //生成短链接口调整productUrl其实是商品id
            'taobao_shopid': $scope.shopId
          };
          var callback = function(dat) {
            if (dat.result === 'error'){
              $(this).Alert({
                "title": '提示',
                "str": dat.errorMessage,
                "mark": true,
                "eleZindex":1010,
                "markZindex":1005
              });
              $scope.createChainFlag = false;
              currentTarget.addClass('btnBlue');
              currentTarget.prop('disabled', false);
              return;
            }
            $scope.createChainFlag = false;
            $scope.checkedGoodUrl = false;
            $scope.editorHide = true;
            kindEditor.insertHtml(dat.shorturl);
            settingCurCount();
            currentTarget.closest(".ccmsPublicPop").hide()
            currentTarget.addClass('btnBlue');
            currentTarget.prop('disabled', false);
            angular.element(".ccmsPublicPop").find(".childElementMark").remove();
          }
          $scope.createChainFlag = true;
          currentTarget.removeClass('btnBlue');
          currentTarget.prop('disabled', true);
          getListService.getShortLink(params, callback);
        } else {
          $(this).Alert({
            "title": "提示",
            "str": "请先选择一个商品",
            "mark": true,
            "eleZindex":1010,
            "markZindex":1005
          })
        }
      }

      //分页相关>>
      $scope.pagination.nextPage = function() {
        var currentPage = $scope.pagination.currentPage;
        var totalPage = $scope.pagination.totalPage;
        if (currentPage >= totalPage) {
          return;
        } else {
          if( $scope.HFiveStyle == 'list' ){
            console.log(123)
            $scope.getMessageOfHFive({
              "page_index": $scope.pagination.currentPage + 1,
              "page_size": 6
            });
          }else{
            $scope.getGoodsOfShop({
              "page": $scope.pagination.currentPage + 1,
              "pagesize": $scope.pagination.pagesize
            });
          }
        }
      }

      $scope.pagination.prevPage = function() {
        var currentPage = $scope.pagination.currentPage;
        if (currentPage <= 1) {
          return;
        } else {
          if($scope.HFiveStyle == 'list'){
            $scope.getMessageOfHFive({
              "page_index": $scope.pagination.currentPage - 1,
              "page_size": 6
            });
          }else{
            $scope.getGoodsOfShop({
              "page": $scope.pagination.currentPage - 1,
              "pagesize": $scope.pagination.pagesize
            });
          }
        }
      }

      $scope.pagination.firstPage = function() {
        var currentPage = $scope.pagination.currentPage;
        if (currentPage === 1) {
          return;
        } else {
          if($scope.HFiveStyle == 'list'){
            $scope.getMessageOfHFive({
              "page_index":1,
              "page_size": 6
            });
          }else{
            $scope.getGoodsOfShop({
              "page": 1,
              "pagesize": $scope.pagination.pagesize
            });
          }
        }
      }

      $scope.pagination.lastPage = function() {
        var currentPage = $scope.pagination.currentPage;
        var totalPage = $scope.pagination.totalPage;
        if (currentPage === totalPage) {
          return;
        } else {
          if( $scope.HFiveStyle == 'list' ){
            $scope.getMessageOfHFive({
              "page_index": totalPage,
              "page_size": 6
            });
          }else{
            $scope.getGoodsOfShop({
              "page": totalPage,
              "pagesize": $scope.pagination.pagesize
            });
          }
        }
      }

      // 页码框 输入enter键请求
      angular.element("#activNum").bind("keyup", function(e) {
        var currentPage = $scope.pagination.currentPage;
        if (e.keyCode == 13) {
          $scope.getGoodsOfShop({
            "page": currentPage,
            "pagesize": $scope.pagination.pagesize
          });
        }
      });
      //分页相关<<
      $scope.arrLabel = [];
      $scope.arrTag = [];
      //获取当前通道信息
      $scope.getGatewayById = function(id, name) {
        var valit = false;
        $scope.gateways.forEach(function(item) {
          if(item.gatewayId === id) {
            $scope.gate = item;
            $scope.data.modelVal = item.gatewayName;
            $scope.change($scope.data.modelVal);
            valit = true;
          }
        });

        if(!valit) {
          $scope.gateways.push({
            gatewayName: name,
            gatewayId: id,
            isValit: false,
            quantity: 0
          })
          $scope.quantity = 0;
          $scope.data.modelVal = name;
          $scope.data.isValit = false;
        }
      }
      //获取标签信息
      $scope.getSmsTag = function() {
        var callback = function(dat) {
          angular.forEach(dat,function(data,index){
            if( data.source == 'other' ){
              $scope.arrLabel.push(dat[index]);
            }else{
              $scope.arrTag.push(dat[index]);
            }
          })
          $scope.smsLabels = $scope.arrLabel.sort(function(x,y){
            return x.sort - y.sort
          })
          $scope.smsTags = $scope.arrTag.sort(function(x,y){
            return x.sort - y.sort
          })
        }
        getListService.getSmsTag(
            callback, //callback
            $scope.model //表单数据
        )
      }
      //$scope.getSmsTag();
      //获取标签label信息
      $scope.getSmsLabel = function() {
        var callback = function(dat) {
          angular.forEach(dat,function(data,index){
            if( data.source == 'other' ){
              $scope.arrLabel.push(dat[index]);
            }else{
              $scope.arrTag.push(dat[index]);
            }
          });
          $scope.getSmsTag();
        }
        getListService.getSmsLabel(
            callback, //callback
            $scope.model //表单数据
        )
      }
      $scope.getSmsLabel();
      //处理标签title显示
      $scope.judgeTitle = function(flag) {
        if (flag == 1) {
          return "字符数21个";
        }
      }

      var initForm=function(data){
        /*       data=[{type: "var", id: "normal_1000", text: "淘宝昵称"},{id: null,
         text: "                        f",
         type: "text"}]*/
        var result=""
        for(var i in data){
          if(data[i].type=="text"){
            var str=KindEditor.escape(data[i]["text"])
            var regSpace=/(\s)/g
            str=str.replace(regSpace,"&nbsp;")
            result+=str
          }
          else{
            /*           var str="<input readonly='true' id='"+data[i]["id"]+"'   class='btInput' value='"+data[i]["text"]+"' >"*/
            if (jQuery.browser.mozilla) {
              var str="<img id='"+data[i]["id"]+"' class='varImg' alt='"+data[i]["text"]+"' >"
            }else{
              /*            var str="<span id='"+data[i]["id"]+"' class='iframeButton' cc='"+data[i]["text"]+"' >"+data[i]["text"]+"</span>&nbsp;"*/
              var str="<input readonly='true' id='"+data[i]["id"]+"'   class='btInput' value='"+data[i]["text"]+"' >"
            }

            result+=str
          }
        }
        return result
      }

      //获取短信节点 信息
      $scope.getSmsMessage = function() {
        var callback = function(dat) {
          var isModify = dat.gatewayId ? true : false;
          dat.content=initForm(dat.content)
          dat.modelVal = $scope.data.modelVal;
          $scope.data = dat;
          kindEditor.html(kindEditorObj.firstSetVal($scope.data.content)); //处理后台出来初始化数据
          $scope.count = $scope.strToTagNameNum($scope.data.content).replace(new RegExp('&nbsp;', 'g'), ' ').length;
          $scope.data.code = dat.id;
          $scope.data.signature = dat.signature || "";
          $scope.data.overAssignDelivery = dat.overAssignDelivery;
          $scope.data.name = dat.name || "短信";
          // $scope.data.sign = $scope.data.signature.substring(0,8)+"...";
          $scope.data.signall = $scope.data.signature;
          if ($scope.data.signall.length > 8) {
            $scope.data.sign = $scope.data.signall.substring(0, 8) + "..."
          } else {
            $scope.data.sign = $scope.data.signall
          }
          if (!$scope.data.gatewayId) {

            $scope.data.gatewayId = $scope.gatewayId;
          }
          $scope.getGatewayById($scope.data.gatewayId, dat.gatewayName)
          if ($scope.data.remark) {
            $scope.nodecomment = $scope.data.remark;
          }
          //循环签名加上选中样式
          $scope.$broadcast($scope.data.sign);
          if (!$scope.data.outputControl) {
            $scope.data.outputControl = '0';
          } else {
            $scope.data.outputControl = $scope.data.outputControl + '';
          }
          if (!$scope.data.deliveryTimeSelection) {
            $scope.data.deliveryTimeSelection = '0';
          } else {
            $scope.data.deliveryTimeSelection = $scope.data.deliveryTimeSelection + '';
          }

          if($scope.data.blacklist.customer.length === 0 && $scope.data.blacklist.mobile.length === 0 &&  !$scope.data.content ) {
            $scope.getWhiteAndBlackList(function() {
              $scope.WhiteAndBlackList.forEach(function(item) {
                if(item.groupType === "BLACK") {
                  $scope.data.blacklist.customer.push({
                    'name':item.groupName,
                    'id': item.groupId
                  });
                }
                else if(item.groupType === "MOBILE") {
                  $scope.data.blacklist.mobile.push({
                    'name':item.groupName,
                    'id': item.groupId
                  });
                }
              });
              var msg = "";

              if ($scope.data.blacklist.customer.length > 0) {
                msg += $scope.data.blacklist.customer.length + "个客户黑名单组,";
              }
              if ($scope.data.blacklist.mobile.length > 0) {
                msg += $scope.data.blacklist.mobile.length + "个手机黑名单组,";
              }
              if (msg.lastIndexOf(",") == msg.length - 1) {
                msg = msg.substr(0, msg.length - 1);
              }
              if (msg != "") {
                $scope.blacklistTip = "选择了" + msg;
              } else {
                $scope.blacklistTip = "";
              }
            });
          }
          else {
            var msg = "";

            if ($scope.data.blacklist.customer.length > 0) {
              msg += $scope.data.blacklist.customer.length + "个客户黑名单组,";
            }
            if ($scope.data.blacklist.mobile.length > 0) {
              msg += $scope.data.blacklist.mobile.length + "个手机黑名单组,";
            }
            if (msg.lastIndexOf(",") == msg.length - 1) {
              msg = msg.substr(0, msg.length - 1);
            }
            if (msg != "") {
              $scope.blacklistTip = "选择了" + msg;
            } else {
              $scope.blacklistTip = "";
            }
          }

          $scope.data.redlist = dat.redlist || "";
          if ($scope.data.redlist.length > 0) {
            $scope.redlistTip = "选择了" + $scope.data.redlist.length + "个红名单组";
          } else {
            $scope.redlistTip = "";
          }
          $scope.data.unsubscribe = isModify ? dat.unsubscribe : true;
          settingCurCount();
        }
        getListService.getSmsMessage(
            callback, //callback
            $scope.model //表单数据
        );

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          $scope.smsTips = responseTips.tips || "";
        }, "tcommunicateSMS");

      }
      $scope.getGateway = function() {
        var callback = function(data) {
          $scope.gateways = [];

          for (var i = 0; i < data.length; i++) {
            if (data[i].isDefault) {
              $scope.isDefault = data[i];
              //不再显示余额
              //$scope.balance = data[i].balance;
              $scope.quantity = data[i].quantity;
              $scope.gatewayId = data[i].gatewayId;
              $scope.wordsLimit = data[i].wordsLimit;
              $scope.sign_xi = data[i].signature;
              $scope.gatewayType = data[i].gatewayType;
              $scope.markLength = data[i].markLength;
              $scope.settlementFlag = data[i].settlement_type !== 1;
            } else {
              $scope.gateways.push(data[i])
            }
          }
          $scope.gateways = data;
          $scope.data.modelVal = $scope.isDefault.gatewayName;
          $scope.getSmsMessage();
        }
        getListService.getGateway(
            callback, //callback
            $scope.model //表单数据
        )

      }
      $scope.getGateway();
      $scope.$watch('data.testMobile', function() {
        $scope.mobiles = [];
        if ($scope.data.testMobile) {
          $scope.mobiles = $scope.data.testMobile.split(",")
        }
        if ($scope.mobiles[0] == "" || !$scope.mobiles || $scope.mobiles == "") {
          $scope.numCheck = true;
        } else {
          for (i = 0; i < $scope.mobiles.length; i++) {
            $scope.num = /^(?:1\d\d|15[89]|17[0-9])-?\d{5}(\d{3}|\*{3})$/.test($scope.mobiles[i]);
            if (!$scope.num) {
              $scope.numCheck = false;
            } else {
              $scope.numCheck = true;
            }
          }
        }
      });
      //保存短信节点信息
      $scope.saveSmsMessageCheck = function(e) {
        if (!$scope.data.name) {
          return;
        };
        if ($scope.numCheck == false) {
          return;
        }
        if($scope.count > 680) {
          $(this).Alert({"title":"保存失败","str":"短信内容输入字数不能超过680个字","mark":true, "eleZindex":1010,"markZindex":1005});
          return;
        }
        if($scope.data.isValit === false) {
          $(this).Alert({"title":"保存失败","str":"当前通道已被禁用，请重新选择通道","mark":true, "eleZindex":1010,"markZindex":1005});
          return;
        }
        var callback = function(data, status) {
          if (status && status !== 200) {
            $(this).Alert({
              "title": data.message,
              "str": data.description,
              "mark": true,
              "eleZindex":1010,
              "markZindex":1005
            });
            return;
          }
          $scope.errorword = "";
          $scope.errorword = data.errorContentKey;
          if ($scope.errorword != "") {
            $scope.error_sShow = true;
          } else {
            $scope.error_sShow = false;
          }

          //var a = $scope.data.name.replace(/(^s*)|(s*$)/g, ""); //删除节点名称的前后空格
          if ($scope.data.deliveryTimeSelection == 1 && !$scope.data.deliveryDate) {
            $(this).Alert({
              "title": "填写发送时间",
              "str": "请填写延时发送时间",
              "mark": true,
              "eleZindex":1010,
              "markZindex":1005
            });

          } else if (!$scope.data.name) {
            return;
          } else {
            $scope.saveSmsMessage(data);
          }
        }
        $scope.data.content = kindEditorObj.getKindEditorVal(kindEditor.html());
        $scope.smsContent = $scope.strToTagName($scope.data.content).replace(new RegExp('&nbsp;', 'g'), ' ');
        //$scope.smsContent = $scope.strToTagName($scope.data.content);
        if($scope.data.unsubscribe) {
          $scope.smsContent = $scope.smsContent + "退订回复TD";
        }
        if ($scope.data.sign) {
          $scope.smsContent = $scope.smsContent + "【" + $scope.data.signall + "】";

          $scope.countShow = $scope.countShow + $scope.data.signall.length + 2
          // }
        }
        if ($scope.gatewayType == 0) {
          if (!$scope.data.sign) {
            if ($scope.sign_xi) {
              $scope.smsContent = $scope.smsContent + $scope.sign_xi;

              //   $scope.countShow = $scope.countShow + $scope.sign_xi.length

            }
          }
        }

        if ($scope.gatewayType == 1 || $scope.gatewayType == 5) {
          if ($scope.sign_xi) {
            $scope.smsContent = $scope.smsContent + $scope.sign_xi;

            //   $scope.countShow = $scope.countShow + $scope.sign_xi.length

          }
        }
        $scope.model = {};
        //$scope.model.content = $scope.smsContent;
        $scope.model.content = KindEditor.unescape($scope.strToTagName($scope.data.content).replace(new RegExp('&nbsp;', 'g'), ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
        $scope.model.gatewayId = $scope.data.gatewayId;
        $scope.model.gatewayName = $scope.data.modelVal;
        $scope.model.unsubscribe_enabled = $scope.data.unsubscribe ? 1 : 0;
        $scope.model.signature = $scope.data.signall ? "【" + $scope.data.signall + "】" : "";
        getListService.getErrorWords(
            callback, //callback
            $scope.model, //表单数据
            callback
        )
      }
      var formDate=function(data){
        var reg=/(&nbsp;)|(\s)/gi
        data=data.replace(reg," ")
        data=data.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
        /*                var spanReg1 =/(<span\s?[^\>]*>[^<\/span>]+<\/span>)\s/gi
         data = data.replace(spanReg1, "$1");//去掉span生成的空格*/   //不适用span了
        /*    var regValue=/(<input[^\>]*?>)/gi*/
        if (jQuery.browser.mozilla){
          var regValue=/(<img[^\>]*?>)/gi
        }
        else{
          var regValue=/(<input[^\>]*?>)/gi
        }
        var data= data.split(regValue)
        var resultObj=[]
        for(var i in data){
          var obj={};
          var objhfive = {};
          if(regValue.test(data[i])){
            if( $(data[i])[0].name ){
              if(jQuery.browser.mozilla){
                objhfive.h5_shopid = $(data[i])[0].title;
                objhfive.h5_plat = $(data[i])[0].name;
                objhfive.h5_tenatid = $(data[i])[0].align;
                objhfive.h5_templeturl = $(data[i])[0].src;
                obj.id= 'h5^' + $(data[i])[0].name + '^' + $(data[i])[0].align + '^' + $(data[i])[0].title + '^' + $(data[i])[0].src;
              }
              else{
                /*objhfive.h5_shopid = $(data[i])[0].alt;
                objhfive.h5_plat = $(data[i])[0].name;
                objhfive.h5_tenatid = $(data[i])[0].align;
                objhfive.h5_templeturl = $(data[i])[0].src;*/
                obj.id ='h5^' + $(data[i])[0].name + '^' + $(data[i])[0].align + '^' + $(data[i])[0].alt + '^' + $(data[i])[0].src;
              }
            }
            else{
              obj.id=$(data[i])[0].id
            }
            if($(data[i])[0].tagName=="INPUT"){
              obj.text=$(data[i]).val()
            }
            else{
              obj.text=$(data[i])[0].alt
            }
            obj.type="var"
            resultObj.push(obj)
          }
          else{
            var str=data[i]
            /*    var reg=/(&nbsp;)+|(\s+)/gi
             str=str.replace(reg,function(){return " "})*/
            if(str){
              obj.type="text"
              obj.text=KindEditor.unescape(str)
              resultObj.push(obj)
            }/*else{
             break;
             }*/

          }

        }
        return resultObj
      }
      $scope.saveSmsMessage = function(response) {
        if ($(".Confirm").length > 0) {

        } else {
          if ($scope.count == 0) {
            $scope.smsShowContents = [];
            $scope.smsShowContents[0] = "短信内容为空，请重新编辑";
            $scope.sShow = true;
            $scope.sign = "";
            $(".queryShopsPop").addInteractivePop({
              magTitle: "短信预览",
              width: 388,
              mark: false,
              position: "fixed",
              childElePop: true
            });
          } else {
            if ((!$scope.sign_xi || $scope.sign_xi == "") && !$scope.data.sign) {
              $(this).Alert({
                "title": "请添加签名",
                "str": "请添加签名",
                "mark": true,
                "eleZindex":1010,
                "markZindex":1005
              });
            } else {
              $scope.countShow = $scope.count;
              $scope.dingcount = $scope.count;
              $scope.data.content = kindEditorObj.getKindEditorVal(kindEditor.html());
              $scope.smsContent = $scope.strToTagName($scope.data.content).replace(new RegExp('&nbsp;', 'g'), ' ');
              //$scope.smsContent = $scope.strToTagName($scope.data.content);
              if($scope.data.unsubscribe) {
                $scope.smsContent = $scope.smsContent + "退订回复TD";
                $scope.dingcount = $scope.dingcount + 6;
              }
              if ($scope.data.sign) {
                if ($scope.gatewayType == 0 || $scope.gatewayType == 1 ||  $scope.gatewayType == 5) {
                  $scope.smsContent = $scope.smsContent + "【" + $scope.data.signall + "】";
                } else if ($scope.gatewayType == 2 || $scope.gatewayType == 3 || $scope.gatewayType == 4) {
                  $scope.smsContent = "【" + $scope.data.signall + "】" + $scope.smsContent;
                }
                $scope.countShow = $scope.countShow + $scope.data.signall.length + 2
                $scope.dingcount = $scope.dingcount + $scope.data.signall.length + 2;
              }

              switch ($scope.gatewayType) {
                case 0: //共享通道后置签名
                {
                  if (!$scope.data.sign) {
                    if ($scope.sign_xi) {
                      $scope.smsContent = $scope.smsContent + $scope.sign_xi;
                      $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                    }
                  }
                }
                  break;
                case 1: //独享通道后签名
                  if ($scope.sign_xi) {
                    $scope.smsContent = $scope.smsContent + $scope.sign_xi;
                    $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                  }
                  break;
                case 2: //共享通道前置签名
                  if (!$scope.data.sign) {
                    if ($scope.sign_xi) {
                      $scope.smsContent = $scope.sign_xi + $scope.smsContent;
                      $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                    }
                  }
                  break;
                case 3: //独享通道前置签名
                case 4:
                  if ($scope.sign_xi) {
                    $scope.smsContent = $scope.sign_xi + $scope.smsContent;
                    $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                  }
                  break;
                case 5:
                  if ($scope.sign_xi) {
                    $scope.smsContent = $scope.smsContent + $scope.sign_xi;
                    $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                  }
                  break;
              }
              /*            if($scope.gatewayType==0||$scope.gatewayType==2){
               if(!$scope.data.sign){
               if ($scope.sign_xi){
               *//*   var temp=$scope.dingcount- $scope.sign_xi.length*//*
               $scope.addSign="由于您的短信内容没有签名，通道会自动增加签名"+$scope.sign_xi+",短信内容输入共"+($scope.dingcount- $scope.sign_xi.length)+"字,"
               }
               }else{
               $scope.addSign=""
               }
               }else{
               $scope.addSign=""
               }*/
              $scope.addSign=""
              $scope.countShow = $scope.dingcount
              if($scope.gatewayType==0 || $scope.gatewayType==2){
                if(!$scope.data.sign&&$scope.sign_xi){
                  /*   var temp=$scope.dingcount- $scope.sign_xi.length*/
                  $scope.addSign="由于您的短信内容没有签名，通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span class='red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span class='red'>"+$scope.countShow +"</span>个字,"
                }
              }

              if($scope.gatewayType==5){
                if($scope.sign_xi){
                  /*   var temp=$scope.dingcount- $scope.sign_xi.length*/
                  if(!$scope.data.sign) {
                    $scope.addSign="由于您的短信内容没有签名，通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span class='red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span class='red'>"+$scope.countShow +"</span>个字,"
                  } else {
                    $scope.addSign="通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span class='red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span class='red'>"+$scope.countShow +"</span>个字,"
                  }

                }
              }

              if($scope.gatewayType==1 || $scope.gatewayType==3 || $scope.gatewayType==4){
                if($scope.sign_xi){
                  $scope.addSign="通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span  class='red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span class='red'>"+$scope.countShow +"</span>个字,"
                }
              }

              var regHasValue=/(<img[^\>]*?>)|(<span\s?[^\>]*>.*?<\/span>)|(<input[^\>]*?>)/gi
              /* var regHasValue=/(<img[^\>]*?>)|(<span\s?[^\>]*>.*?<\/span>)/gi*/
              var hasValue=regHasValue.test($scope.data.content)
              if (hasValue) {
                if ($scope.countShow != 0) {
                  $scope.sShow = true;
                  $scope.countPerSMS=$scope.wordsLimit-$scope.markLength;
                  $scope.sign = "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。固定文字部分共" + $scope.dingcount+ "字，插入变量后字数和计费条数以实际执行时发送为准";
                }
              } else {
                $scope.sShow = false;
              }
              if ($scope.data.sign) {
                $scope.nameShow = true;
              } else {
                $scope.nameShow = false;
              }
              if ($scope.countShow > $scope.wordsLimit) {
                $scope.smsContent=KindEditor.unescape($scope.smsContent)
                $scope.smsShowContents = [];
                if ($scope.sShow) {
                  //   $scope.countShow = $scope.countShow + 6;
                }
                if ($scope.markLength) {
                  var num = Math.ceil($scope.countShow / ($scope.wordsLimit - $scope.markLength));
                } else {
                  var num = Math.ceil($scope.countShow / $scope.wordsLimit);
                }
                if (num > 1 && $scope.markLength) {
                  $scope.Limit = $scope.wordsLimit - $scope.markLength;
                } else {
                  $scope.Limit = $scope.wordsLimit;
                }
                var start = 0;
                var count = parseInt($scope.Limit)
                for (var i = 0; i < num; i++) {
                  $scope.smsShowContents.push($scope.smsContent.substring(start, count));
                  start += parseInt($scope.Limit);
                  count += parseInt($scope.Limit);
                }
                for(var i in $scope.smsShowContents){
                  $scope.smsShowContents[i]=KindEditor.escape($scope.smsShowContents[i])  /*分割完还要转义回去 之所以用转义是为了判断span img标签方便，只有变量是html*/
                }
              } else {
                $scope.smsShowContents = [];
                $scope.smsShowContents.push($scope.smsContent);
              }
              $scope.smsCount = $scope.smsShowContents.length;
              // $scope.smsShow = true;
              var cnum = $scope.countShow;
              var num = $scope.smsCount;
              var errorword = $scope.errorword;
              if ($scope.error_sShow) {
                $(this).Alert({
                  "title": "检查内容，重新编辑",
                  "str": "您所编辑的内容中存在非法文字,请去除这些字符</br>非法文字: " + errorword + ",请删除之后再发送",
                  "mark": true,
                  "eleZindex":1010,
                  "markZindex":1005
                });

              } else {
                $scope.countPerSMS=$scope.wordsLimit-$scope.markLength;
                var tempAddSign=$scope.addSign
                var str=""
                if(response && response.content) {
                  $scope.smsShowContents = [];
                  angular.forEach(response.content, function(val, key) {
                    if(key !== 0) {
                      $scope.smsShowContents.push(val);
                    }
                  });
                };
                for(var i in $scope.smsShowContents){
                  str+=' <div style="white-space: pre-wrap;word-wrap:  break-word; margin: 10px 0px" class="sms_content">'+$scope.smsShowContents[i]+'</div>'
                }
                /*   var message =str+ "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+tempAddSign+"本短信正式发送时共<span style='color: red'>" + $scope.dingcount + "</span> 字，按<span style='color: red'>" + num + "</span>条短信计费！";*/
                var message = "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+tempAddSign+"按<span class=' red'>" + num + "</span>条短信计费！";
                if(!tempAddSign){
                  message = "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+tempAddSign+"本短信内容输入共<span class='red'>" + $scope.dingcount + "</span> 字，按<span class='red'>" + num + "</span>条短信计费！";
                }
                if ($scope.sShow) {

                  message = "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+tempAddSign+"固定文字部分共<span class='red'>" + $scope.dingcount + "</span>字，插入变量后字数和计费条数以实际执行时发送为准";
                }

                if ($scope.isTest == false) {
                  $scope.ConfirmMessagesCounts();
                } else {
                  $scope.confirmMessages = $scope.smsShowContents;
                  $scope.confirmSaveMark = message;
                  $(".confirmSavePop").addInteractivePop({
                    magTitle: "确认发送",
                    width: 530,
                    mark: false,
                    position: "fixed",
                    childElePop: true
                  });
                }
              }
            }
          }
        }
      }
      $scope.ConfirmMessagesCounts = function() {
        $scope.ConfirmMessagesCounts.ajaxFlag = $scope.ConfirmMessagesCounts.ajaxFlag || false;
        var resultContent=formDate(kindEditor.html())
        $scope.data.content = kindEditorObj.getKindEditorVal(kindEditor.html());
        //  $scope.smsContent = $scope.strToTag($scope.data.content);
        $scope.smsContent = $scope.data.content;
        $scope.sentData = {};
        $scope.sentData.gatewayId = "";
        $scope.sentData.id = $scope.data.code;
        $scope.sentData.name = $scope.data.name;
        $scope.sentData.remark = $scope.nodecomment;
        $scope.sentData.content = resultContent;
        $scope.sentData.testMobile = $scope.data.testMobile;
        $scope.sentData.signature = $scope.data.signall;
        $scope.sentData.gatewayId = $scope.gatewayId;
        $scope.sentData.unsubscribe = $scope.data.unsubscribe || false;
        $scope.sentData.deliveryTimeSelection = $scope.data.deliveryTimeSelection;
        $scope.sentData.deliveryDate = $scope.data.deliveryDate;
        $scope.sentData.overAssignDelivery = $scope.data.overAssignDelivery;
        $scope.sentData.outputControl = $scope.data.outputControl;
        $scope.sentData.redlist = $scope.data.redlist;
        $scope.sentData.blacklist = $scope.data.blacklist;



        //if ($scope.gatewayId) {
        //    $scope.sentData.gatewayId = $scope.gatewayId;
        //}
        var callback = function(data) {
          $scope.ConfirmMessagesCounts.ajaxFlag = false;
          $scope.data = data;
          if ($scope.data.remark) {
            $scope.nodecomment = $scope.data.remark;
          }
          $scope.editNodeName($scope.sentData.id, $scope.sentData.name, $scope.nodecomment);
          $("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
        }
        var errorCallback = function() {
          $scope.ConfirmMessagesCounts.ajaxFlag = false;
        }
        if ($scope.sentData.testMobile) {
          $scope.mobiles = [];
          $scope.mobiles = $scope.sentData.testMobile.split(",")
          for (var i = 0; i < $scope.mobiles.length; i++) {
            $scope.num = /^(?:1\d\d|15[89]|17[0-9])-?\d{5}(\d{3}|\*{3})$/.test($scope.mobiles[i]);
            if (!$scope.num) {
              $scope.numCheck = false;
              //return;
            }
          }
        }

        if ($scope.numCheck && !$scope.ConfirmMessagesCounts.ajaxFlag) {
          $scope.ConfirmMessagesCounts.ajaxFlag = true;
          saveService.SaveSmsMessage(
              callback, //callback
              $scope.sentData, //表单数据
              errorCallback
          )
        }
      }
      $scope.change = function(x) {
        for (var i = 0; i < $scope.gateways.length; i++) {
          if ($scope.gateways[i].gatewayName == x) {
            //$scope.balance = $scope.gateways[i].balance;
            $scope.settlementFlag = $scope.gateways[i].settlement_type !== 1;
            $scope.quantity = $scope.gateways[i].quantity;
            if($scope.settlementFlag) {
              $scope.data.unsubscribe = true;
            }
            $scope.gatewayId = $scope.gateways[i].gatewayId;
            $scope.data.gatewayId = $scope.gateways[i].gatewayId;
            $scope.data.isValit = $scope.gateways[i].isValit;
            $scope.wordsLimit = $scope.gateways[i].wordsLimit;
            $scope.sign_xi = $scope.gateways[i].signature;
            $scope.gatewayType = $scope.gateways[i].gatewayType;
            $scope.markLength = $scope.gateways[i].markLength;
          } else {
            // $scope.gateways.push(data[i])
          }
        }
      }
      $scope.tap = function(id) {
        switch (id) {
          case 1:
            $("#tab1").addClass("mesg_tab").siblings().removeClass("mesg_tab");
            break;
          case 2:
            $("#tab2").addClass("mesg_tab").siblings().removeClass("mesg_tab");
            break;
          case 3:
            $("#tab3").addClass("mesg_tab").siblings().removeClass("mesg_tab");
            break;
          default:
            $("#tab1").addClass("mesg_tab").siblings().removeClass("mesg_tab");

            break;
        }

      }
      $scope.banner = function(id) {
        if (id == 1) {
          $scope.bannerall = true;

        } else {

          $scope.bannerall = false;
        }
      }
      $scope.strToTag = function(str) {
        if (jQuery.browser.mozilla) {
          str = str.replace(/<img[\s\S]*?>/g, function() {
            return $('[' + arguments[0] + ']').attr("class").replace("iframeButton", "");
          });
        } else {
          str = str.replace(/<span[\s\S]*?<\/span>/g, function() {
            return $('[' + arguments[0] + ']').attr("class").replace("iframeButton", "");
          });
        }
        return str;
      }
      $scope.strToTagName = function(str) {
        /*   var  regSpan=/\<span\s?[^\>]*class=\"[^\"]*\biframeButton\b[^\"]*"[^\>]*\>[\s\S]*?<\/span>/g*/
        var regInput=/\<input\s?[^\>]*\>/g
        var regImg=/\<img\s?[^\>]*class=\"[^\"]*\bvarImg\b[^\"]*"[^\>]*\>/g
        /*           str = str.replace(regInput, function() {
         var text =  $('[' + arguments[0] + ']').val()
         text = "{" + text + "}";
         return text;
         })*/
        if (jQuery.browser.mozilla) {
          str = str.replace(regImg, function() {
            var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText || $('[' + arguments[0] + ']').attr("alt")
            text = "{" + text + "}";
            return text;
          })/*.replace(/<span[\s\S]*?<\/span>&nbsp;/g, function() {
           var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText
           text = "{" + text + "}";
           return text;
           });*/
        } else {
          str = str.replace( regInput, function() {
            var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].value

            text = "{" + text + "}";
            return text;
          })/*.replace(/<img[\s\S]*?>/g, function() {
           var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText || $('[' + arguments[0] + ']').attr("alt")
           text = "{" + text + "}";
           return text;
           });*/
        }
        return str;
      }
      //算字数的
      $scope.strToTagNameNum = function(str) {
        if (jQuery.browser.mozilla) {
          str = str.replace(/<img[\s\S]*?>/g, function() {
            var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText || $('[' + arguments[0] + ']').attr("alt")
            text = "";
            return text;
          }).replace(/<span[\s\S]*?<\/span>/g, function() {
                var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText
                text = "";
                return text;
              });
        } else {
          str = str.replace(/<span[\s\S]*?<\/span>/g, function() {
            var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText
            text = "";
            return text;
          }).replace(/<img[\s\S]*?>/g, function() {
                var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText || $('[' + arguments[0] + ']').attr("alt")
                text = "";
                return text;
              });
        }
        return str;
      }
      //短息预览
      $scope.smsClickShow = function() {
        /*    alert(5)*/
        $scope.errorMes = "";
        $scope.errorword = "";
        $scope.dingcount = $scope.count;
        if ($scope.errorword != "") {
          $scope.error_sShow = true;
        } else {
          $scope.error_sShow = false;
        }

        if ($scope.count == 0) {
          $scope.previewStatus = false;
          $scope.smsShowContents = [];
          $scope.smsShowContents[0] = "短信内容为空，请重新编辑";
          $scope.sShow = true;
          $scope.sign = "";
          $(".queryShopsPop").addInteractivePop({
            magTitle: "短信预览",
            width: 388,
            mark: false,
            position: "fixed",
            childElePop: true
          });
        } else {
          if ((!$scope.sign_xi || $scope.sign_xi == "") && !$scope.data.sign) {
           /* $(this).yAlert({
              "text": "请添加签名"
            });*/
            $scope.previewStatus = false;
            $(this).Alert({
              "title": "请添加签名",
              "str": "请添加签名",
              "mark": true
            });
            //removeAlert();
          } else {
            $scope.countShow = $scope.count;
            $scope.data.content = kindEditorObj.getKindEditorVal(kindEditor.html());
            //取消中文字符中括号验证20140618
            // var myReg = /^[^【】]+$/;
            // if(!myReg.test($scope.data.content) && $scope.data.content.length > 0){
            //   $(this).Alert({ 'title': '非法字符', 'str': '短信内容中不可包含 "【 " 或 " 】"', 'mark': true });
            // return;
            // }
            $scope.smsContent = $scope.strToTagName($scope.data.content).replace(new RegExp('&nbsp;', 'g'), ' ');
            //"TD" must be added ignore any condition
            if($scope.data.unsubscribe) {
              $scope.smsContent = $scope.smsContent + "退订回复TD";
              $scope.dingcount = $scope.dingcount + 6;
            }

            if ($scope.data.sign) {
              if ($scope.gatewayType == 0 || $scope.gatewayType == 1 || $scope.gatewayType == 5) {
                $scope.smsContent = $scope.smsContent + "【" + $scope.data.signall + "】";
              } else if ($scope.gatewayType == 2 || $scope.gatewayType == 3 || $scope.gatewayType == 4) {
                $scope.smsContent = "【" + $scope.data.signall + "】" + $scope.smsContent;
              }
              $scope.countShow = $scope.countShow + $scope.data.signall.length + 2
              $scope.dingcount = $scope.dingcount + $scope.data.signall.length + 2;
            }
            /*debugger*/
            /*  $scope.gatewayType=2*/
            switch ($scope.gatewayType) {
              case 0: //共享通道后置签名
              {
                if (!$scope.data.sign) {
                  if ($scope.sign_xi) {

                    $scope.smsContent = $scope.smsContent + $scope.sign_xi;
                    $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                  }
                }
              }
                break;
              case 1: //独享通道后签名
                if ($scope.sign_xi) {

                  $scope.smsContent = $scope.smsContent + $scope.sign_xi;
                  $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                  /* debugger*/
                }
                break;
              case 2: //共享通道前置签名
                if (!$scope.data.sign) {
                  if ($scope.sign_xi) {

                    $scope.smsContent = $scope.sign_xi + $scope.smsContent;
                    $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                  }
                }
                break;
              case 3: //独享通道前置签名
              case 4:
                if ($scope.sign_xi) {

                  $scope.smsContent = $scope.sign_xi + $scope.smsContent;
                  $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                }
                break;
              case 5:
                if ($scope.sign_xi) {
                  $scope.smsContent = $scope.smsContent + $scope.sign_xi;
                  $scope.dingcount = $scope.dingcount + $scope.sign_xi.length;
                }
                break;
            }
            $scope.countShow =$scope.dingcount
            $scope.addSign=""
            if($scope.gatewayType==0||$scope.gatewayType==2){
              if(!$scope.data.sign&&$scope.sign_xi){
                /*   var temp=$scope.dingcount- $scope.sign_xi.length*/
                $scope.addSign="由于您的短信内容没有签名，通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span  style='color: red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span style='color: red'>"+$scope.countShow +"</span>个字,"
              }
            }

            if($scope.gatewayType==5) {
              if(!$scope.data.sign) {
                $scope.addSign="由于您的短信内容没有签名，通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span class='red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span class='red'>"+$scope.countShow +"</span>个字,"
              } else {
                $scope.addSign="通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span class='red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span class='red'>"+$scope.countShow +"</span>个字,"
              }
            }

            if($scope.gatewayType==1||$scope.gatewayType==3 || $scope.gatewayType==4){
              if($scope.sign_xi){
                $scope.addSign="通道会自动增加签名"+$scope.sign_xi+",短信内容输入共<span  style='color: red' >"+($scope.dingcount- $scope.sign_xi.length)+"</span>字,包含通道签名后合计<span style='color: red'>"+$scope.countShow +"</span>个字,"
              }
            }


            /*    $scope.countShow =$scope.dingcount*/
            var regHasValue=/(<img[^\>]*?>)|(<span\s?[^\>]*>.*?<\/span>)|(<input[^\>]*?>)/gi
            var hasValue=regHasValue.test($scope.data.content)

            if ($scope.data.sign) {
              $scope.nameShow = true;
            } else {
              $scope.nameShow = false;
            }

            if ($scope.countShow > $scope.wordsLimit) {
              $scope.smsContent=KindEditor.unescape($scope.smsContent)  /*这里反转一下 这样分割短信 计算字数方便*/
              $scope.smsShowContents = [];
              if ($scope.sShow) {}
              if ($scope.markLength) {
                var num = Math.ceil($scope.countShow / ($scope.wordsLimit - $scope.markLength));
              } else {
                var num = Math.ceil($scope.countShow / $scope.wordsLimit);
              }
              if (num > 1 && $scope.markLength) {
                $scope.Limit = $scope.wordsLimit - $scope.markLength;
              } else {
                $scope.Limit = $scope.wordsLimit;
              }
              var start = 0;
              var count = parseInt($scope.Limit);
              for (i = 0; i < num; i++) {
                if (i == (num - 1)) {
                  count += parseInt($scope.Limit) + 100;
                }
                $scope.smsShowContents.push($scope.smsContent.substring(start, count));
                start += parseInt($scope.Limit);
                count += parseInt($scope.Limit);
              }
              for(var i in $scope.smsShowContents){
                $scope.smsShowContents[i]=KindEditor.escape($scope.smsShowContents[i])  /*分割完还要转义回去 之所以用转义是为了判断span img标签方便，只有变量是html*/
              }

            } else {
              $scope.smsShowContents = [];
              $scope.smsShowContents.push($scope.smsContent);

            }

            $scope.smsCount = $scope.smsShowContents.length;

            if (hasValue) {
              if ($scope.countShow != 0) {
                $scope.sShow = true;
                $scope.countPerSMS=$scope.wordsLimit-$scope.markLength;
                $scope.sign = "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+$scope.addSign+"固定文字部分共<span style='color: red'>" + $scope.countShow + "</span>字，插入变量后字数和计费条数以实际执行时发送为准";


                /*                                    if($scope.addSign){
                 var ttmp=$scope.dingcount- $scope.sign_xi.length;
                 $scope.sign = "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。由于您的短信内容没有签名，通道会自动增加签名"+$scope.sign_xi+",短信内容输入共"+ttmp+",固定文字部分共" + $scope.countShow + "字，插入变量后字数和计费条数以实际执行时发送为准";
                 }
                 else{
                 $scope.sign = "当前通道单条短信字数限制"+$scope.wordsLimit+"个，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。固定文字部分共" + $scope.countShow + "字，插入变量后字数和计费条数以实际执行时发送为准";
                 }*/
              }
            } else {
              $scope.sShow = false;
              $scope.countPerSMS=$scope.wordsLimit-$scope.markLength;
              /* $scope.sign="当前通道单条短信字数限制"+$scope.wordsLimit+"，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+$scope.addSign+"本短信正式发送时共<span style='color: red'>"+$scope.countShow+"</span> 字，按<span style='color: red'>"+$scope.smsCount+"</span>条短信计费！"*/
              $scope.sign="当前通道单条短信字数限制"+$scope.wordsLimit+"，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+$scope.addSign+"按<span style='color: red'>"+$scope.smsCount+"</span>条短信计费！"
              if(!$scope.addSign){
                $scope.sign="当前通道单条短信字数限制"+$scope.wordsLimit+"，超出"+$scope.wordsLimit+"个字后按每"+$scope.countPerSMS+"个字一条计费。"+$scope.addSign+"本短信内容输入共<span style='color: red'>"+$scope.countShow+"</span> 字，按<span style='color: red'>"+$scope.smsCount+"</span>条短信计费！"
              }
            }

            $scope.sign=$sce.trustAsHtml($scope.sign);

            var callback = function(data) {
              $scope.previewStatus = false;
              $scope.errorword = data.errorContentKey;
              if ($scope.errorword != "") {
                $scope.error_sShow = true;
              } else {
                $scope.error_sShow = false;
              };
              $scope.smsShowContents = [];
              angular.forEach(data.content, function(val, key) {
                if(key !== 0) {
                  $scope.smsShowContents.push(val);
                }
              });

              $(".queryShopsPop").addInteractivePop({
                magTitle: "短信预览",
                width: 388,
                mark: false,
                position: "fixed",
                childElePop: true
              });
            }
            $scope.model = {};
            //$scope.model.content = $scope.smsContent;
            $scope.model.content = KindEditor.unescape( $scope.strToTagName($scope.data.content).replace(new RegExp('&nbsp;', 'g'), ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
            $scope.model.gatewayId = $scope.data.gatewayId;
            $scope.model.unsubscribe_enabled = $scope.data.unsubscribe ? 1 : 0;
            $scope.model.signature = $scope.data.signall ? "【" + $scope.data.signall + "】" : "";
            getListService.getErrorWords(
                callback, //callback
                $scope.model //表单数据
            )

          }
          // $scope.smsShow = true;
        }
      }
      //获取短信违禁词
      $scope.getErrorWords = function(words) {
        var callback = function(data) {
          $scope.errorword = data.errorContentKey;
          if ($scope.errorword != "") {
            $scope.error_sShow = true;
          } else {
            $scope.error_sShow = false;
          }
        }
        $scope.model = words;
        getListService.getErrorWords(
            callback, //callback
            $scope.model //表单数据
        )
      }
      //接受子controller发来的数据  其实没有用，我靠！！浪费了一天的事件
      $scope.$on("itemsToParent", function(event, data) {
        $scope.a = data;
      });
      //关闭预览
      $scope.smsClose = function() {
        $scope.smsShow = false;
      }
      $scope.signClickShow = function() {
        $scope.signShow = true;
        var abc = angular.element(".ac_type_item .ac_type_span");
        angular.forEach(abc, function(val, key) {
          if ($scope.data.sign == val.innerHTML) {
            angular.element(val).parent().addClass("cur_color_start");
          }
        });
      }
      //关闭预览
      $scope.signClose = function() {
        $scope.signShow = false;
      }
      $scope.getWhiteAndBlackList = function(nextFn) {
        var callback = function(data) {
          $scope.WhiteAndBlackList = data;
          $scope.ngRedAble = false;
          $scope.ngBlackAble = false;
          nextFn();
        }
        var callback2 = function(data) {
          $scope.ngRedAble = true;
          $scope.ngBlackAble = true;
        }
        return getListService.getWhiteAndBlackList(callback, $scope.WhiteAndBlackList, callback2);

      }
      var whiteAndBlackListProm = $scope.getWhiteAndBlackList(function(){
      });

      function checkSelectByClick() {
        if ($(".groupList .WHITE li.cur").length == $(".groupList .WHITE  li").length && $(".groupList .WHITE li").length > 0) {
          $("#WHITE").attr("checked", "checked");
        } else {
          $("#WHITE").removeAttr("checked");
        }
        if ($(".groupList .BLACK li.cur").length == $(".groupList .BLACK li").length && $(".groupList .BLACK li").length > 0) {
          $("#BLACK").attr("checked", "checked");
        } else {
          $("#BLACK").removeAttr("checked");
        }
        if ($(".groupList .MOBILE li.cur").length == $(".groupList .MOBILE li").length && $(".groupList .MOBILE li").length > 0) {
          $("#MOBILE").attr("checked", "checked");
        } else {
          $("#MOBILE").removeAttr("checked");
        }
        if ($(".groupList .ALLGroupContent .cur").length == $(".groupList .ALLGroupContent  li").length) {
          $("#ALL").attr("checked", "checked");
        } else {
          $("#ALL").removeAttr("checked");
        }
      }

      function checkSelectByData() {
        //初始化列表选中状态
        $scope.defaultIds = [];
        $scope.data.blacklist.customer.forEach(function(value, key) {
          $scope.defaultIds.push(value.id);
        })
        $scope.data.blacklist.mobile.forEach(function(value, key) {
          $scope.defaultIds.push(value.id);
        })
        $scope.data.redlist.forEach(function(value, key) {
          $scope.defaultIds.push(value.id);
        })
        $(".groupList li").each(function(i) {
          $(".groupList li").eq(i).removeClass("cur");
          $scope.defaultIds.forEach(function(v, k) {
            if ($(".groupList li").eq(i).data("id") == v) {
              $(".groupList li").eq(i).addClass("cur");
            }
          })
        })
        //初始化复选框状态
        var length = $filter('GroupByType')($scope.WhiteAndBlackList, 'WHITE').length;
        if ($scope.data.redlist.length == length) {
          $("#WHITE").attr("checked", "checked");
        } else {
          $("#WHITE").removeAttr("checked");
        }
        var lengthBlack = $filter('GroupByType')($scope.WhiteAndBlackList, 'BLACK').length;
        var lengthDefaultBlack = $scope.data.blacklist.customer.length;
        if (lengthDefaultBlack == lengthBlack  || lengthBlack == 0) {
          $("#BLACK").attr("checked", "checked");
        } else {
          $("#BLACK").removeAttr("checked");
        }
        var lengthMobile = $filter('GroupByType')($scope.WhiteAndBlackList, 'MOBILE').length;
        var lengthDefaultMobile = $scope.data.blacklist.mobile.length;
        if (lengthDefaultMobile == lengthMobile || lengthMobile == 0) {
          $("#MOBILE").attr("checked", "checked");
        } else {
          $("#MOBILE").removeAttr("checked");
        }
        if (lengthBlack + lengthMobile == lengthDefaultMobile + lengthDefaultBlack || (lengthBlack == 0 && lengthMobile == 0)  ) {
          $("#ALL").attr("checked", "checked");
        } else {
          $("#ALL").removeAttr("checked");
        }
      }

      //自定义表格
      $scope.gridObj = {
        "modelSrc": "", // 客户订单查询 修改属性模板入口
        "customerNo": "",
        "curAttrId": "",
        "showConfigAttrSrc": "",
        "addCustomAttrPage": true,
        "customList": "",
        "customVal": "",
        "girdElement": angular.element(".dataInfoList")[0],
        //编译模板
        "upCompile": function(curScope) {
          $compile(angular.element(".dataInfoList"))($scope || curScope);
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        },
        "itemdown": function(jobId) {
          getListService.getSmsDownLoad(function(response) {}, graph.campId, graph.nodeId, jobId)
        }
      }
      getListService.nodeStatus(function(response) {
        if (response.subjobStatus >= 19) {
          $scope.showNodeReport = true;
          $scope.isTest = response.isTest;
        }
      }, graph.nodeId, graph.campJobid)

      //获取响应报告
      $scope.getReports = function() {
        $(".discountEcDataView").addInteractivePop({
          magTitle: "发送报告",
          width: 1000,
          mark: false,
          position: "fixed",
          childElePop: true
        });
        getListService.senderSmsSummary(function(response){
          $scope.submitNumTotal = response.submitNumTotal;
          $scope.receiveNumTotal = response.receiveNumTotal;
          $scope.replyMoNumTotal = response.replyMoNumTotal;
        });
        $('.dataInfoList').flexigrid({
          url: GLOBAL_STATIC.nodeRoot + 'report/sender/sms/list?campId=' + graph.campId + '&nodeId=' + graph.nodeId + '&jobId=',
          method: 'GET',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          colModel: [

            {
              display: '通道',
              name: 'gatewayName',
              width: 1,
              sortable: false,
              align: 'left',
              dataindex: 'gatewayName',
              title:true
            }, {
              display: '客户提交时间',
              name: 'submitTime',
              width: 1.5,
              sortable: false,
              align: 'center',
              dataindex: 'submitTime',
              title:true,
              renderer: function(v) {
                if(!v){
                  return "";
                }else{
                  return "<span class='ac_status_grid ac_status_" + v + "' title='"+setISO(v, "all")+"'>" + setISO(v, "all") + "</span>";
                }
              }
            }, {
              display: '客户提交数',
              name: 'submitNum',
              width: 1,
              sortable: false,
              align: 'right',
              dataindex: 'submitNum'
            }, {
              display: '通道接收时间',
              name: 'receiveTime',
              width:1.5,
              sortable: false,
              align: 'center',
              dataindex: 'receiveTime',
              renderer: function(v) {
                if(!v){
                  return "";
                }else{
                  return "<span class='ac_status_grid ac_status_" + v + "' title='"+setISO(v, "all")+"'>" + setISO(v, "all") + "</span>";
                }
              }
            }, {
              display: '通道接收数',
              name: 'receiveNum',
              width: 1,
              sortable: false,
              align: 'right',
              dataindex: 'receiveNum'
            }, {
              display: '报告更新时间',
              name: 'updated',
              width: 1.5,
              sortable: false,
              align: 'center',
              dataindex: 'updated',
              renderer: function(v) {
                if(!v){
                  return "";
                }else{
                  return "<span class='ac_status_grid ac_status_" + v + "' title='"+setISO(v, "all")+"'>" + setISO(v, "all") + "</span>";
                }
              }
            },

            {
              display: '短信回复数据',
              name: 'enable',
              width: 1,
              align: 'left',
              dataindex: 'enabled',
              mapping: ['jobId', 'replyMoNum'],
              convert: function(v, mappVal) {
                if (!mappVal[1]) {
                  return "暂无数据";
                } else {
                  var href = '/node/v1/web/report/sender/sms/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + graph.nodeId;
                  return '<a title="下载"  ng-href="' + href + '">下载</a>';
                }
              }
            }
          ],
          /* params: campListParams,*/
          updateDefaultParam: true,
          sortname: "",
          sortorder: "desc",
          buttons: [],
          usepager: true,
          useRp: true,
          rp: 20,
          showTableToggleBtn: true,
          colAutoWidth: true,
          onSuccess: function() {
            var scope = angular.element('.dataInfoList').scope();
            scope.gridObj.upCompile(scope);

          },
          onError: function(response) {
            if (response.status == 401) {
              location.pathname = "/portal/login.html";
              return;
            }
          }
        });

      }
      //名单
      $scope.groupPop = {
        "openGroupPop": function(type) {
          $scope.groupType = type;
          checkSelectByData();
          $(".groupList li").die("click").live("click", function() {
            $(this).toggleClass("cur");
            checkSelectByClick();
          });


          if ($scope.groupType == "WHITE") {
            $(".WHITEGroupContent").show();
            $(".ALLGroupContent").hide();
            $(".groupList").addInteractivePop({
              magTitle: "选择红名单",
              mark: false,
              position: "fixed",
              childElePop: true
            });
          } else {
            $(".WHITEGroupContent").hide();
            $(".ALLGroupContent").show();
            $(".groupList").addInteractivePop({
              magTitle: "选择黑名单",
              mark: false,
              position: "fixed",
              childElePop: true
            });
          }
        },
        //复选框
        "change": function(e, type) {
          if (e.target.checked) {
            if (e.target.id == "ALL") {
              $(".groupList .ALLGroupContent li").each(function() {
                $(this).addClass("cur");
              })
              $("#BLACK").attr("checked", true);
              $("#MOBILE").attr("checked", "checked");
            } else {
              $(".groupList ." + e.target.id + " li").each(function() {
                $(this).addClass("cur")
              })
              if ($(".groupList .ALLGroupContent li").length == $(".groupList .ALLGroupContent li.cur").length && $("#BLACK").attr("checked") &&  $("#MOBILE").attr("checked")) {
                $("#ALL").attr("checked", "checked");
              }
            }

          } else {
            if (e.target.id == "ALL") {
              $(".groupList .ALLGroupContent li").each(function() {
                $(this).removeClass("cur")
              })
              $("#BLACK").removeAttr("checked");
              $("#MOBILE").removeAttr("checked");
            } else {
              $(".groupList ." + e.target.id + " li").each(function() {
                $(this).removeClass("cur")
              })
              // if ($(".groupList .ALLGroupContent .cur").length != $(".groupList .ALLGroupContent li").length) {
                $("#ALL").removeAttr("checked");
              // }
            }
          }
        },
        //保存选定的分组
        "save": function() {

          if ($scope.groupType == "WHITE") {
            $scope.data.redlist = [];
          } else {
            $scope.data.blacklist = {};
            $scope.data.blacklist.customer = [];
            $scope.data.blacklist.mobile = [];
          }

          if ($scope.groupType == "WHITE") {
            $(".groupList .WHITE li.cur").each(function() {
              $scope.data.redlist.push({
                "id": $(this).data("id"),
                "name": $(this).data("name")
              });
            })
          } else {
            $(".groupList .ALLGroupContent li.cur").each(function() {
              switch ($(this).attr("var")) {
                case "BLACK":
                  $scope.data.blacklist.customer.push({
                    "id": $(this).data("id"),
                    "name": $(this).data("name")
                  });
                  break;
                case "MOBILE":
                  $scope.data.blacklist.mobile.push({
                    "id": $(this).data("id"),
                    "name": $(this).data("name")
                  });
                  break;
              }
            })
          }


          if ($scope.groupType == "WHITE") {
            if ($scope.data.redlist.length > 0) {
              $scope.redlistTip = "选择了" + $scope.data.redlist.length + "个红名单组";
            } else {
              $scope.redlistTip = "";
            }

          } else {
            var msg = "";
            if ($scope.data.blacklist.customer.length > 0) {
              msg += $scope.data.blacklist.customer.length + "个客户黑名单组,";
            }
            if ($scope.data.blacklist.mobile.length > 0) {
              msg += $scope.data.blacklist.mobile.length + "手机黑名单组,";
            }
            if (msg.lastIndexOf(",") == msg.length - 1) {
              msg = msg.substr(0, msg.length - 1);
            }
            if (msg != "") {
              $scope.blacklistTip = "选择了" + msg;
            } else {
              $scope.blacklistTip = "";
            }
          }
          $(".groupList").hide();
          $(".childElementMark").remove();
        }
      }
    }
  ])
  app.controller('signCtrl', ["$scope", "$http",
    function($scope, $http) {

      //点击签名
      $scope.curClick = function(e) {

        var obj = e.target.parentElement || e.srcElement.parentElement;
        $a = $(obj)

        if (!$a.hasClass("cur_color_start")) {
          $a.addClass("cur_color_start").siblings().removeClass("cur_color_start");
          $b = $($a.children()[0])
          $scope.data.sign = $b.attr("var")
          $scope.data.signall = $b.attr("varall")

        } else {
          $a.removeClass("cur_color_start")
          $scope.data.sign = "";
          $scope.data.signall = "";
        }

      }
      //判断给签名弹窗 加滚动条
      $scope.signClick = function(name, tag) {
        if ($("#sign_show").height() >= 200) {
          $("#sign_show").addClass("sign_flow");
        } else {
          $("#sign_show").removeClass("sign_flow");
        }
      }
      //右上角select选择框
      //0启用，1经用，2全部
      $scope.selectedType = "0";

      //$scope.items = ["a", "b", "c"];
      //启用禁用添加删除服务成功
      function serverSucc(res) {
        $scope.addItem.ajaxFlag = false;
        if (res.hasOwnProperty("message") && res.hasOwnProperty("description")) {
          $scope.isExisted = true;
          $(this).Alert({
            "title": res.message || "提示",
            "str": res.description || "改签名已存在",
            "mark": true,
            "eleZindex":1010,
            "markZindex":1005
          });
        } else {
          //清空input
          $scope.itemName = "";
          $scope.getAllItem();
          $(this).yAlert({
            "text": "添加成功"
          });
          removeAlert(2);

        }
      }

      //启用禁用添加删除服务失败
      function serverErr(res) {
        $scope.addItem.ajaxFlag = false;
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": res.message || "错误",
          "mark": true,
          "eleZindex":1010,
          "markZindex":1005
        });
      }

      //增加item
      $scope.addItem = function() {
        $scope.addItem.ajaxFlag = $scope.addItem.ajaxFlag || false;
        //如果值为空
        if($('#sign_id').hasClass('red_border')) {
          return;
        }
        if (!$scope.itemName) {
          $scope.isInputEmpty = true;
          return;
        }
        if($scope.addItem.ajaxFlag) {
          return;
        }
        $scope.addItem.ajaxFlag = true;
        $http.post(GLOBAL_STATIC.nodeRoot + "node/sms/signature/", {
          name: $scope.itemName
        }).success(serverSucc).error(serverErr);
      };
      //删除item
      $scope.deleteItem = function(item, $event) {
        $event.stopPropagation();
        //   $http.delete(root + "sms/signature/" + item.id).success(serverSucc).error(serverErr);
        //ie8不能用delete
        $(this).Confirm({
          "title": "确认",
          "str": "确定要删除短信签名" + item.name + "吗？",
          "mark": true,
          "eleZindex": 20002,
          "markZindex": 20001
        }, function() {

          $http({
            method: 'DELETE',
            url: GLOBAL_STATIC.nodeRoot  + "node/sms/signature/" + item.id
          }).success(serverDeleteSucc).error(serverErr);

        });

        function serverDeleteSucc() {
          if (item.name == $scope.data.sign) {
            $scope.data.sign = "";
            $scope.data.signall = "";
          }
          $scope.itemName = "";
          $(this).yAlert({
            "text": "删除成功"
          });
          removeAlert(2);
          $scope.getAllItem();
        }
      };
      //禁用item
      // $scope.disableItem = function(categoryId) {
      // 	$http.get(root + "campaign/category", categoryId).success(getDataSucc).error(getDataErr);
      // };
      // //启用item
      // $scope.enableItem = function() {
      // 	$http.get(root + "campaign/category").success(getDataSucc).error(getDataErr);
      // };
      //启用禁用item
      $scope.changeType = function(item) {
        $http.put(GLOBAL_STATIC.campaignRoot + "campaign/category/" + item.categoryId).success(serverSuccEnableOrDisable).error(serverErr);

        function serverSuccEnableOrDisable(res) {
          $(this).yAlert({
            "text": "活动类型\"" + item.categoryValue + "\"" + (item.disabled ? "启用" : "禁用") + "成功"
          });
          removeAlert();

          $scope.itemName = "";
          $scope.getAllItem();
        }
      };
      //请求所有数据
      $scope.getAllItem = function() {
        $http.get(GLOBAL_STATIC.nodeRoot  + "node/sms/signature/" + "?_=" + new Date().getTime()).success(getDataSucc).error(getDataErr);
        //成功获取节点信息

        function getDataSucc(data) {
          $scope.items = data || [];
          $scope.$emit("itemsToParent", $scope.items);
          for (i = 0; i < $scope.items.length; i++) {
            $scope.items[i].nameAll = $scope.items[i].name;
            if ($scope.items[i].name.length > 8) {
              $scope.items[i].name = $scope.items[i].name.substring(0, 8) + "..."
            }
          }
          $scope.signClick();
        }

        //获取活动失败
        function getDataErr(res) {
          $(this).Alert({
            "title": res.message || "提示",
            "str": res.description || "错误",
            "mark": true,
            "eleZindex":1010,
            "markZindex":1005
          });
        };
      };
      //返回按钮
      $scope.viewBack = function() {
        $scope.$parent.$parent.dataviewBack();
      }
      $scope.getAllItem();


    }
  ]);
})
    (window, angular, undefined);
