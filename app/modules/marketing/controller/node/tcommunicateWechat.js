angular.module('campaign.controllers').controller('wechatCtrl', ['$scope', '$rootScope', '$http', 'getListService','dclonService',  '$compile', '$filter', '$q', function ($scope, $rootScope, $http, getListService, dclonService,  $compile, $filter, $q) {
  $scope.openNodePop(); //调用弹框方法
  getListService.nodeStatus(function(response) {
    if (response.subjobStatus == 21) {
      !response.isTest && ($scope.wechatScope.viewWechatDataFlag = true);
    }
  },graph.nodeId, graph.campJobid);
  $scope.wechatScope = {
    "viewWechatDataFlag": false, // 查看数据按钮
    "articleShow": false,
    "showWechatDataPop": function () {
      var _this = this;
      angular.element(".discountBenefitDataView").addInteractivePop({
        magTitle: "发送报告",
        width: 800,
        mark: false,
        position: "fixed",
        childElePop: true
      });
      angular.element('.weChatGroupWrap .shareGroup .groupTr').removeClass('groupArticle').find('.icon_down').removeClass('icon_up');
      var reportDataParams = {
        "campId": graph.campId || "",
        "jobId": graph.campJobid || "",
        "nodeId": Number(graph.nodeId) || ""
      };
      getListService.senderWechatSummary(function (response) {
        $scope.sendDate = response.sendDate|| 0;
        $scope.sendUserCount = response.sendUserCount || 0;
        $scope.actualSendCount = response.actualSendCount || 0;
        $scope.details = response.details || [];
        if($scope.details.length == 1) {
          setTimeout(function(){
            $('.group_0 .icon_down').addClass('icon_up');
          $('.group_0').addClass('groupArticle');
            _this.showEchart(0);
          },50)
        }
      });
    },
    'openDefer': $q.defer(),
    "fillData": function () {
      var _this = this;
      var openPromise = _this.getPublicNumbers(true);
      openPromise.then(function (data) {
        getListService.openWechat(function (response) {
          if (response.msg){
            $(this).Alert({
              "title": "提示",
              "str": response.msg || "公众号授权异常，请重新授权",
              "mark": true,
              "eleZindex": 1010,
              "markZindex": 1005
            });
          }
          _this.name = response.nodeName || "微信";
          _this.id = response.id || '';
          _this.nodeCode = response.nodeCode || "";
          $scope.nodecomment = response.remark || "";
          // _this.testAccount = response.testOpenId || "";
          // _this.targetClient = response.outputType ? "0" : String(response.outputType);
          // _this.publicNumberCur = response.authAppid || _this.publicNumbersList[0].offAcctName;
          _this.publicNumberId = response.authAppid || "";
          _this.materialId = response.materialId || "";
          _this.materialName = response.materialName || "";
          _this.materialType = response.materialType || 'news';
          _this.discountStatus = _this.publicNumberId ? false : true;
          _this.deliveryTimeSelection = response.sendTimeType&&response.sendTimeType == 'excute' || true;
          _this.outputControl = response.outType&&response.outType == 'all' || 0;
          // _this.viewWechatDataFlag = response.hasReport || "";
          _this.msgType = response.msgType || "";
          angular.forEach(_this.publicNumbersList, function(data,index,array){
            if(data.appid == _this.publicNumberId) {
              _this.publicNumberName = data.nickname;
            }
          });
          _this.publicNumberCur = _this.publicNumberName || '';
        });
      })

      getListService.getNodeTipsByType(function (responseTips) { // 获取tips
        _this.tips = responseTips.tips || "";
      }, "tcommunicateWechat");
    },
    "getEditorData": function () {  //需要传给后台的数据点
      var _this = this;
      var discountWechatData = {
        "id": _this.id,
        "nodeCode": _this.nodeCode,
        "nodeName": _this.name || "",
        "remark": $scope.nodecomment || "",
        "authAppid": _this.publicNumberId,
        "materialId": _this.materialId,
        "materialName": _this.materialName,
        "materialType": _this.materialType,
        "sendTime": '',
        "sendTimeType": _this.deliveryTimeSelection? 'excute':'timing',
        "outType": _this.outputControl == 1 ? 'all': 'only_success',
        "selectFilterIds":$scope.WeChatNode.selectFilterIds
        // "testOpenId": _this.testAccount.replace(/^,|,$/g, '') || "",
        // "msgType": _this.msgType
        // "outputType": Number(_this.targetClient)
      };
      return discountWechatData;
    },
    "postDiscountWechatData": function (ent) {
      var _this = this;
      if ($scope.wechatScope.name == "") {
        return false;
      }
      ;
      if (!_this.publicNumberId) {
        $scope.publicNumberFlag = true;
        return null;
      } else {
        $scope.publicNumberFlag = false;
      }
      ;

      if (!_this.materialId) {
        $scope.materialFlag = true;
        return null;
      } else {
        $scope.materialFlag = false;
      }

      var acountLength = this.testAccount ? this.testAccount.replace(/^,|,$/g, '').split(",").length : 0;

      /*if (acountLength < 2) {
       $scope.testAccountMsg = '测试执行账号至少填写2个';
       $scope.testAccountError = true;
       return null;
       } else if(acountLength > 20) {
       $scope.testAccountMsg = '测试执行账号最多不能超过20个';
       $scope.testAccountError = true
       return null;
       } else {
       $scope.testAccountError = false;
       }*/

      var element = angular.element(ent.target);

      disposeCommMethod.shuyunAjaxButtonClickMethod(function () {
        getListService.postWechatData(function (response) {
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
          element.closest("#nodeContent").hide();
          $(".yunat_maskLayer").remove();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName($scope.wechatScope.nodeCode, $scope.wechatScope.name, $scope.nodecomment);
        }, $scope.wechatScope.getEditorData(), element);
      }, element);
    },
    "getPublicNumbers": function (init) {
      var _this = this;
      getListService.getPublicNumbers(function (response) {
        $scope.wechatScope.publicNumbersList = response;
        if (init) {
          _this.openDefer.resolve();
          return '初始化节点调用'
        }
        $scope.wechatScope.common(response, $('[name="publicNumber"]'));
      }, $rootScope.taobaoSegmentationId);
      if (init) {
        return _this.openDefer.promise
      }
      ;
    },
    "goAuthorizationHref": function () {
      var url = '/node/v1/web/node/wechat/authorize';
      window.open(url);
    },

    "showMaterialsPop": function(){
      var _this = this;
      if (!_this.publicNumberId) {
       $scope.publicNumberFlag = true;
        return false;
      }
      //素材选择弹窗
      $(".choiceMaterialsPop").addInteractivePop({
        magTitle: "微信素材选择",
        width: 630,
        mark: false,
        position: "fixed",
        childElePop: true
      });
      _this.initMaterials();
    },
    "common": function (data, ele) { //模拟普通的select框
      var $selContent = ele.next(".selectContent:first");
      $selContent.children().remove();
      var eleName = ele.attr("name");
      var $ul = $("<ul>");
      if (data) {
        $selContent.append($ul);
        var len = data.length;
        for (var i = 0; i < len; i++) {
          if (eleName == "shopWechat") {
            $ul.append('<li><a href="javascript:void(0);" id=' + data[i].mediaId + ' type=' + data[i].type + '>' + data[i].title + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          } else if (eleName == "publicNumber") {
            $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].appid + '>' + data[i].nickname + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          } else if(eleName == "materialsType") {
            $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].code + '>' + data[i].name + '</a></li>');
            $ul.find("a").css({
              "padding": "3px 10px",
              "color": "#3D3D3D",
              "display": "block"
            });
          }

        }
        $ul.find("a").bind({
          "click": function () {
            var currentId = $(this).attr("id");
            ele.val($(this).text());
            ele.attr("valueId", currentId);
            $selContent.slideUp(200);
            if (eleName == "publicNumber") {
              angular.element("[name='shopWechat']").attr("valueId", "").val("");
              var numberlName = $(this).text();
              $scope.$apply(function () {
                // $scope.materialFlag = true;
                $scope.publicNumberFlag = false;
                $scope.wechatScope.materialId = '';
                $scope.wechatScope.publicNumberId = currentId;
                $scope.wechatScope.publicNumberCur = numberlName;
              });
            }
            else if (eleName == "materialsType") {
              var materialTypeId = $(this).attr("id");
              var typeName = $(this).text();
              $scope.$apply(function () {
                // $scope.materialFlag = false;
                // $scope.wechatScope.materialId = currentId;
                $scope.wechatScope.materialsTypeName = typeName;
                $scope.wechatScope.materialsType = currentId;
                $scope.wechatScope.getMaterials();
              });
            }
            ;
          },
          "mouseenter": function () {
            $(this).css({
              "color": "#0083BA",
              "background": "#F2F2F2",
              "text-decoration": "none"
            });
          },
          "mouseleave": function () {
            $(this).css({
              "color": "#3D3D3D",
              "background": "#FFFFFF"
            });
          }
        })
      }
    },
    "initMaterials": function(){
      var _this=this;
      getListService.getWechatMaterialType(function(response) {
        _this.materialsTypeList = response;
        _this.materialsRadioSelect=_this.materialId;
        $scope.wechatScope.common(_this.materialsTypeList, $('[name="materialsType"]'));
        _this.materialsTypeList.forEach(function(data){
          // console.log(val,key);
          if(data.code == $scope.wechatScope.materialType){
            _this.materialsTypeName = data.name;
            _this.materialsType = data.code;
          }
        })
        _this.getMaterials(true);
      });

    },
    "getMaterials": function (init) { //获取素材列表
      var _this=this;
      if (init){
        $scope.wechatScope.material = $scope.wechatScope.materialType;
      } else {
        $scope.wechatScope.material = $scope.wechatScope.materialsType;
      }
      var params = {
        pageIndex:$scope.materialsPage.pager.currentPage1,
        pageSize: $scope.materialsPage.pager.pagesize,
        // sortorder:'desc',
        // sortname:'id',
        materialType:$scope.wechatScope.material,
        authAppid:$scope.wechatScope.publicNumberId
      };
      _this.searching = false;
      _this.isExternal = true;
      _this.loading = true;
      getListService.getWechatMaterialList(params,function (response) {
        _this.materialsList = response.item;
        $scope.materialsPage.pager.totalPages = Math.ceil(response.total_count / $scope.materialsPage.pager.pagesize)==0 ? 1 : Math.ceil(response.total_count / $scope.materialsPage.pager.pagesize);
        _this.isExternal = false;
        _this.loading = false;
        _this.searching = true;
      });
    },
    "toggleAllMaterials": function(event,itemIndex){//展开/关闭所有素材
      var elem=$(event.target),
        curClass = elem.attr("class");
      if (curClass.indexOf("icon_left") != -1) {
        elem.removeClass("icon_left").addClass("icon_down");
        $(".materials_"+itemIndex).show();
        elem.attr("title", "收起");
      } else {
        elem.addClass("icon_left").removeClass("icon_down");
        $(".materials_"+itemIndex).hide();
        elem.attr("title", "展开");
      }
    },
    "toggleMaterial": function(e,index){
      console.log(index);
    },
    "selectMaterials": function(e) { //选择素材
      var currentTarget = $(e.currentTarget);
      if(!$scope.wechatScope.materialsRadioSelect){
        $(this).Alert({
          "title": "提示",
          "str": "请选择素材",
          "mark": true,
          "eleZindex": 1010,
          "markZindex": 1005
        });
      }else{
        angular.forEach($scope.wechatScope.materialsList,function(val,key){
          if(val.media_id == $scope.wechatScope.materialsRadioSelect){
            $scope.materialFlag=false;
            $scope.wechatScope.materialId=val.media_id;
            $scope.wechatScope.materialName= val.content? val.content.news_item[0].title : val.name;
          }
        });
        $scope.wechatScope.materialType = $scope.wechatScope.materialsType;
        $scope.wechatScope.materialTypeName = $scope.wechatScope.materialsTypeName;
        currentTarget.closest(".ccmsPublicPop").hide();
        angular.element(".ccmsPublicPop").find(".childElementMark").remove();
      }
    },
    "cancelMaterials": function(){
      $scope.wechatScope.materialsType = 'news';
      $scope.wechatScope.materialsTypeName = '图文素材';
    },
    "showDetail": function(e,index) {
      var _this = this;
      var elm = e.target.childNodes.length !=0 ? e.target.childNodes[1] : e.target;
      var elmClass = elm.className;
      if (elmClass.indexOf('icon_up') != -1) {
        $(elm).removeClass('icon_up');
        $('.group_'+index).removeClass('groupArticle');
      } else {
        $(elm).addClass('icon_up');
        $('.group_'+index).addClass('groupArticle');
      }
      _this.showEchart(index);

    },
    'showEchart' : function(index) {
      var chart1Item = {
        '公众号会话': 'int_page_from_session_read_',
        '好友转发': 'int_page_from_friends_read_',
        '朋友圈': 'int_page_from_feed_read_',
        '历史消息': 'int_page_from_hist_msg_read_',
        '其他':'int_page_from_other_read_'
      };

      var chart2Item = {
        '公众号会话': 'feed_share_from_session_',
        '朋友圈': 'feed_share_from_feed_',
        '其他':'feed_share_from_other_'
      };

      $scope.echart1 = echarts.init(document.getElementById('ar_'+ index));
      $scope.echart2 = echarts.init(document.getElementById('arShare_'+ index));
      var myChart1 = $scope.echart1;
      var myChart2 = $scope.echart2;
      var arr = $scope.details[index];
      var option1 = {
        title: {
          subtext: '阅读总数',
          text:arr.int_page_read_user +'人' + '\n' +arr.int_page_read_count +'次',
          x: 'center',
          y: 'center',
          subtextStyle: {
            color: '#999',
            fontSize: 12
          },
          textStyle: {
            color: '#333',
            fontSize: 14
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          // formatter: function(params){
          //   return params.data.int_page_from_session_read_count;
          // }
          formatter: "{b} :{c}次({d}%)",
          textStyle: {
            fontSize: 12,

          }
        },
        legend: {
          orient: 'horizontal',
          top: '218px',
          selected: {
            '公众号会话': true,
            '好友转发': true,
            '朋友圈': true,
            '历史消息': true,
            '其他': true
          },
          data:['公众号会话','好友转发','朋友圈','历史消息','其他'],
          textStyle: {
            color: '#666',
            fontSize: '12px'
          }
        },
        series: [
          {
            type:'pie',
            radius: ['50%', '65%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {
                value:arr.int_page_from_session_read_count,
                name:'公众号会话',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: '#13c7a8'
                  }
                }
              },
              {
                value:arr.int_page_from_friends_read_count,
                name:'好友转发',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: '#52a0e7'
                  }
                }

              },
              {
                value:arr.int_page_from_feed_read_count,
                name:'朋友圈',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: '#f97979'
                  }
                }
              },
              {
                value:arr.int_page_from_hist_msg_read_count,
                name:'历史消息',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: 'pink'
                  }
                }
              },
              {
                value:arr.int_page_from_other_read_count,
                name:'其他',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: '#ffcd57'
                  }
                }

              }
            ]
          }
        ]
      };
      myChart1.setOption(option1);
      myChart1.on('legendselectchanged', function(params) {
        var viewUserCount1 = 0;
        var viewReadCount1 = 0;
        option1.legend.selected = params.selected;
        for(var i in params.selected) {
          if(params.selected[i]) {
            viewUserCount1 += arr[chart1Item[i] + 'user'];
            viewReadCount1 += arr[chart1Item[i] + 'count'];
          }
        }
        option1.title.text= viewUserCount1 +'人' + '\n' + viewReadCount1 +'次';
        myChart1.setOption(option1);
      })
      var option2 = {
        title: {
          subtext: '分享总数',
          text:arr.share_user +'人' + '\n' +arr.share_count +'次',
          x: 'center',
          y: 'center',
          subtextStyle: {
            color: '#999',
            fontSize: 12
          },
          textStyle: {
            color: '#333',
            fontSize: 14
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          // formatter: function(params){
          //   return params.data.int_page_from_session_read_count;
          // }
          formatter: "{b} :{c}次({d}%)",
          textStyle: {
            fontSize: 12,
          }
        },
        legend: {
          orient: 'horizontal',
          top: '218px',
          selected: {
            '公众号会话': true,
            '朋友圈': true,
            '其他': true
          },
          data:['公众号会话','朋友圈','其他'],
          textStyle: {
            color: '#666',
            fontSize: '12px'
          }
        },
        series: [
          {
            type:'pie',
            radius: ['50%', '65%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data:[
              {
                value:arr.feed_share_from_session_cnt,
                name:'公众号会话',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: '#13c7a8'
                  }
                }
              },
              {
                value:arr.feed_share_from_feed_cnt,
                name:'朋友圈',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: '#f97979'
                  }
                }
              },
              {
                value:arr.feed_share_from_other_cnt,
                name:'其他',
                type: 'pie',
                itemStyle: {
                  normal:{
                    color: '#ffcd57'
                  }
                }

              }
            ]
          }
        ]
      };
      myChart2.setOption(option2);
      myChart2.on('legendselectchanged', function(params) {
        var viewUserCount2 = 0;
        var viewReadCount2 = 0;
        option2.legend.selected = params.selected;
        for(var i in params.selected) {
          if(params.selected[i]) {
            viewUserCount2 += arr[chart2Item[i] + 'user'];
            viewReadCount2 += arr[chart2Item[i] + 'cnt'];
          }
        }
        option2.title.text= viewUserCount2 +'人' + '\n' + viewReadCount2 +'次';
        myChart2.setOption(option2);
      })
    }
  };

  $scope.materialsPage = {
    "setPage": function(page) { //素材选择器分页
      var _this=this;
      if(!$scope.wechatScope.searching) {
        return false;
      }
      var currentPage = +_this.pager.currentPage;
      if (angular.isString(page)) {
        switch (page) {
          case 'first':
            currentPage = 1;
            break;
          case 'last':
            currentPage = +_this.pager.totalPages;
            break;
          case 'prev':
            if(currentPage>=1){
              currentPage--;
            }else{
              currentPage=1;
            }
            break;
          case 'next':
            currentPage++;
            break;
        }
      } else if (angular.isNumber(page)) {
        currentPage = page;
      }
      _this.pager.currentPage1= _this.pager.currentPage = currentPage;
      $scope.wechatScope.getMaterials();
    },
    "noPrevious": function() { //素材选择器分页
      return this.pager.currentPage == 1;
    },
    "sizeList": [10],
    "pager": {
      currentPage: 1,
      currentPage1: 1,
      pagesize: 10,
      totalPages: '',
      // categoryId: $rootScope.categoryCroupId||"",
      // query: encodeURIComponent($scope.hdValuePar) || "",
    },
    "resetPager": function(){ //素材选择器分页
      return this.pager.currentPage1=this.pager.currentPage=1;
    },
    "noNext": function() { //素材选择器分页
      return this.pager.currentPage === this.pager.totalPages;
    },
    "enterPage":function(ev) { //素材选择器分页
      var _this=this;
      if (ev.keyCode == 13) {
        if (!_this.pager.currentPage || _this.isExternal ) {
          _this.pager.currentPage1=_this.pager.currentPage=1;
          $scope.wechatScope.getMaterials();
          return;
        }
        _this.pager.currentPage = +_this.pager.currentPage;
        if (!isNaN(_this.pager.currentPage) && angular.isNumber(_this.pager.currentPage)) {
          if (_this.pager.currentPage > _this.pager.totalPages) {
            _this.pager.currentPage1=_this.pager.currentPage = _this.pager.totalPages;
            $scope.wechatScope.getMaterials();
            return;
          } else if (_this.pager.currentPage < 1) {
            _this.pager.currentPage = 1;
            $scope.wechatScope.getMaterials();
            return;
          }
          _this.pager.currentPage1=_this.pager.currentPage;
          $scope.wechatScope.getMaterials();
        } else {
          _this.pager.currentPage1=_this.pager.currentPage = 1;
          $scope.wechatScope.getMaterials();
        }
      }
    }
  }
  //切换素材类型，加载素材列表信息
  $scope.$watch('wechatScope.materialsTypeName',function(newValue, oldValue){
    if (!newValue || newValue == oldValue) {
      return;
    }
    //重置分页
    $scope.materialsPage.resetPager();
    // $scope.wechatScope.getMaterials();
  });
  //监听查询列表页面pageSize改变
  $scope.$watch('materialsPage.pager.pagesize', function (newValue, oldValue) {
    if (!newValue || newValue == oldValue) {
      return;
    }
    // pageSize改变默认回到第一页
    $scope.materialsPage.pager.currentPage = 1;
    $scope.materialsPage.pager.currentPage1 =$scope.materialsPage.pager.currentPage;
    // $scope.wechatScope.getMaterials();
  });


  //名单控制
  $scope.WeChatNode = {
    'blacklist': {
      'customer': [],
      'email': []
    },
    'redlist': [],
    'selectFilterIds':[]
  };
  $scope.getWhiteAndBlackList = function(nextFn) {
    var callback = function(data) {
      $scope.WhiteAndBlackList = data.blackList;
      $scope.ngRedAble = false;
      $scope.ngBlackAble = false;
      nextFn();
    }
    var callback2 = function(data) {
      $scope.ngRedAble = true;
      $scope.ngBlackAble = true;
    }
    return getListService.getFilterList(callback, $scope.WhiteAndBlackList, callback2);
  }
  $scope.getWhiteAndBlackList(function() {
    $scope.WhiteAndBlackList.forEach(function(item) {
      if (item.selected) {
        $scope.WeChatNode.selectFilterIds.push(item.id);
        if(item.groupType === "BLACK") {
          $scope.WeChatNode.blacklist.customer.push({
            'name':item.groupName,
            'id': item.id
          });
        } else if(item.groupType === "MOBILE") {
          $scope.WeChatNode.blacklist.email.push({
            'name':item.groupName,
            'id': item.id
          });
        }
      }

    });
    var msg = "";
    if ($scope.WeChatNode.blacklist.customer.length > 0) {
      msg += $scope.WeChatNode.blacklist.customer.length + "个客户黑名单组,";
    }
    if ($scope.WeChatNode.blacklist.email.length > 0) {
      msg += $scope.WeChatNode.blacklist.email.length + "个手机黑名单组,";
    }
    if (msg.lastIndexOf(",") == msg.length - 1) {
      msg = msg.substr(0, msg.length - 1);
    }
    if (msg != "") {
      $scope.WeChatNode.blacklistTip = "选择了" + msg;
    } else {
      $scope.WeChatNode.blacklistTip = "";
    }
  });
  function checkSelectByData() {
    //初始化列表选中状态
    $scope.defaultIds = [];
    $scope.WeChatNode.blacklist.customer.forEach(function(value, key) {
      $scope.defaultIds.push(value.id);
    });
    $scope.WeChatNode.blacklist.email.forEach(function(value, key) {
      $scope.defaultIds.push(value.id);
    });
    $scope.WeChatNode.redlist.forEach(function(value, key) {
      $scope.defaultIds.push(value.id);
    });
    $(".groupList li").each(function(i) {
      $(".groupList li").eq(i).removeClass("cur");
      $scope.defaultIds.forEach(function(v, k) {
        if ($(".groupList li").eq(i).data("id") == v) {
          console.log($(".groupList li").eq(i).data("id"));
          console.log(v);
          $(".groupList li").eq(i).addClass("cur");
        }
      })
    })
    //初始化复选框状态
    var length = $filter('GroupByType')($scope.WhiteAndBlackList, 'WHITE').length;
    if ($scope.WeChatNode.redlist.length == length) {
      $("#WHITE").attr("checked", "checked");
    } else {
      $("#WHITE").removeAttr("checked");
    }
    var lengthBlack = $filter('GroupByType')($scope.WhiteAndBlackList, 'BLACK').length;
    var lengthDefaultBlack = $scope.WeChatNode.blacklist.customer.length;
    if (lengthDefaultBlack == lengthBlack || lengthBlack == 0) {
      $("#BLACK").attr("checked", "checked");
    } else {
      $("#BLACK").removeAttr("checked");
    }
    var lengthEmail = $filter('GroupByType')($scope.WhiteAndBlackList, 'MOBILE').length;
    var lengthDefaultEmail = $scope.WeChatNode.blacklist.email.length;
    if (lengthDefaultEmail == lengthEmail || lengthEmail == 0) {
      $("#MOBILE").attr("checked", "checked");
    } else {
      $("#MOBILE").removeAttr("checked");
    }
    if (lengthBlack + lengthEmail == lengthDefaultEmail + lengthDefaultBlack || (lengthBlack == 0 && lengthEmail == 0)) {
      $("#ALL").attr("checked", "checked");
    } else {
      $("#ALL").removeAttr("checked");
    }
  };
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
  };
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
            $(this).addClass("cur")
          });
          $("#BLACK").attr("checked", true);
          $("#MOBILE").attr("checked", "checked");
        } else {
          $(".groupList ." + e.target.id + " li").each(function() {
            $(this).addClass("cur")
          });
          if ($(".groupList .ALLGroupContent li").length == $(".groupList .ALLGroupContent li.cur").length && $("#BLACK").attr("checked") &&  $("#MOBILE").attr("checked")) {
            $("#ALL").attr("checked", "checked");
          }
        }

      } else {
        if (e.target.id == "ALL") {
          $(".groupList .ALLGroupContent li").each(function() {
            $(this).removeClass("cur")
          });
          $("#BLACK").removeAttr("checked");
          $("#MOBILE").removeAttr("checked");
        } else {
          $(".groupList ." + e.target.id + " li").each(function() {
            $(this).removeClass("cur")
          });
          // if ($(".groupList .ALLGroupContent .cur").length != $(".groupList .ALLGroupContent li").length) {
          $("#ALL").removeAttr("checked");
          // }
        }
      }
    },
    //保存选定的分组
    "save": function() {
      if ($scope.groupType == "WHITE") {
        $scope.WeChatNode.redlist = [];
      } else {
        $scope.WeChatNode.blacklist = {};
        $scope.WeChatNode.blacklist.customer = [];
        $scope.WeChatNode.blacklist.email = [];
        $scope.WeChatNode.selectFilterIds = [];
      }
      if ($scope.groupType == "WHITE") {
        $(".groupList .WHITE li.cur").each(function() {
          $scope.WeChatNode.redlist.push({
            "id": $(this).data("id") + "",
            "name": $(this).data("name")
          });
        })
      } else {
        $(".groupList .ALLGroupContent li.cur").each(function() {
          $scope.WeChatNode.selectFilterIds.push($(this).data('id'));
          console.log($scope.WeChatNode.selectFilterIds);
          switch ($(this).attr("var")) {
            case "BLACK":
              $scope.WeChatNode.blacklist.customer.push({
                "id": $(this).data("id") + "",
                "name": $(this).data("name")
              });
              break;
            case "MOBILE":
              $scope.WeChatNode.blacklist.email.push({
                "id": $(this).data("id") + "",
                "name": $(this).data("name")
              });
              break;
          }
        })
      }

      if ($scope.groupType == "WHITE") {
        if ($scope.WeChatNode.redlist.length > 0) {
          $scope.WeChatNode.redlistTip = "选择了" + $scope.WeChatNode.redlist.length + "个红名单组";
        } else {
          $scope.WeChatNode.redlistTip = "";
        }

      } else {
        var msg = "";
        if ($scope.WeChatNode.blacklist.customer.length > 0) {
          msg += $scope.WeChatNode.blacklist.customer.length + "个客户黑名单组,";
        }
        if ($scope.WeChatNode.blacklist.email.length > 0) {
          msg += $scope.WeChatNode.blacklist.email.length + "个邮箱黑名单组,";
        }
        if (msg.lastIndexOf(",") == msg.length - 1) {
          msg = msg.substr(0, msg.length - 1);
        }
        if (msg != "") {
          $scope.WeChatNode.blacklistTip = "选择了" + msg;
        } else {
          $scope.WeChatNode.blacklistTip = "";
        }
      }
      $(".groupList").hide();
      $(".childElementMark").remove();
    }
  };




  $scope.wechatScope.fillData();
  disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
}]);

