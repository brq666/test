angular.module('campaign.controllers').controller('dclonwechatCtrl', ['$scope', '$rootScope', '$http', 'getListService', 'dclonService', '$compile', '$filter', '$q', function ($scope, $rootScope, $http, getListService, dclonService, $compile, $filter, $q) {
    $scope.openNodePop(); //调用弹框方法
  
    $scope.wechatScope = {
      "viewWechatDataFlag": false, // 查看数据按钮
      "showWechatDataPop": function () {
        angular.element(".discountBenefitDataView").addInteractivePop({
          magTitle: "发送报告",
          width: 842,
          mark: false,
          position: "fixed",
          childElePop: true
        });
        var reportDataParams = {
          "campId": graph.campId || "",
          "jobId": graph.campJobid || "",
          "nodeId": Number(graph.nodeId) || ""
        };
        getListService.senderWechatSummary(function (response) {
          $scope.submitNumTotal = response.submitNumTotal;
          $scope.successNumTotal = response.successNumTotal;
          $scope.failNumTotal = response.failNumTotal;
        });
        $('.dataInfoGrid').flexigrid({
          url: GLOBAL_STATIC.nodeRoot + 'report/sender/wechat/list?campId=' + graph.campId + '&nodeId=' + graph.nodeId + '&jobId=' + graph.campJobid,
          method: 'GET',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          colModel: [{
            display: '客户提交时间',
            name: 'submitTime',
            width: 150,
            sortable: false,
            align: 'center',
            dataindex: 'submitTime',
            renderer: function (v) {
              return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>";
            }
          }, {
            display: '客户提交数',
            name: 'submitNum',
            width: 100,
            sortable: false,
            align: 'right',
            dataindex: 'submitNum',
            renderer: function (v) {
              return v ? v : 0;
            }
          }, {
            display: '发送时间',
            name: 'senderTime',
            width: 150,
            sortable: false,
            align: 'center',
            dataindex: 'senderTime',
            renderer: function (v) {
              return v ? "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>" : "";
            }
          }, {
            display: '成功人数',
            name: 'successNum',
            width: 100,
            sortable: false,
            align: 'right',
            dataindex: 'successNum',
            renderer: function (v) {
              return v ? v : 0;
            }
          }, {
            display: '失败人数',
            name: 'failNum',
            width: 100,
            sortable: false,
            align: 'right',
            dataindex: 'failNum',
            renderer: function (v) {
              return v ? v : 0;
            }
          }, {
            display: '详情下载',
            name: 'enable',
            width: 100,
            align: 'left',
            dataindex: 'enabled',
            mapping: ['jobId'],
            convert: function (v, mappVal) {
              var href = '{{appOrigin}}/report/sender/wechat/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + graph.nodeId;
              return '<a title="下载" target="_blank"  ng-href="' + href + '">下载</a>';
            }
          }],
          /* params: campListParams,*/
          sortname: "",
          updateDefaultParam: true,
          sortorder: "desc",
          buttons: [],
          usepager: true,
          useRp: true,
          rp: 20,
          showTableToggleBtn: true,
          colAutoWidth: false,
          onSuccess: function () {
            var scope = angular.element('.dataInfoList').scope();
            $compile(angular.element(".dataInfoList"))($scope || scope);
            if (!$scope.$$phase) {
              $scope.$apply();
            }
          },
          onError: function (data, status, headers, config) {
            $(this).Alert({
              "title": data.message,
              "str": data.description,
              "mark": true
            });
          }
        });
      },
      'openDefer': $q.defer(),
      "fillData": function () {
        var _this = this;
        var openPromise = _this.getPublicNumbers(true);
        openPromise.then(function (data) {
          dclonService.wechat.openWechat(function (response) {
            _this.name = response.name || "微信";
            _this.id = response.id || "";
            $scope.nodecomment = response.remark || "";  
            _this.testAccount = response.testOpenId || "";
            _this.publicNumberCur = response.offacctName || _this.publicNumbersList[0].offacctName;
            _this.publicNumberId = response.offacct || _this.publicNumbersList[0].offacct;
            _this.materialId = response.mediaId || "";
            _this.materialName = response.mediaName || "";
            _this.discountStatus = _this.publicNumberId ? false : true;
            //发送报告功能未实现，暂时关闭按钮
            // _this.viewWechatDataFlag = response.hasReport || "";
            _this.msgType = response.msgType || "";
            // 输出控制
            _this.outputControl = response.outputType ? (response.outputType + '') : '0'; //输出控制
            //名单控制
            _this.blacklistTip = response.blackList == '0'? false : true; 
            _this.redlistTip= response.redList == '0'? false : true;   
          });
        })
  
        getListService.getNodeTipsByType(function (responseTips) { // 获取tips
          _this.tips = responseTips.tips || "";
        }, "dclonwechat");

        dclonService.sms.getOptout(function (data) {
          $scope.optoutDis = data;
        })
      },
      "getEditorData": function () {  //需要传给后台的数据点
        var _this = this;
        var discountWechatData = {
          "id": graph.nodeId,
          "name": _this.name || "",
          "remark": $scope.nodecomment || "",   
          "offacct": _this.publicNumberId,
          "offacctName": _this.publicNumberCur,
          "mediaId": _this.materialId,
          "mediaName": _this.materialName,
          // "testOpenId": _this.testAccount.replace(/^,|,$/g, '') || "",
          "msgType": _this.msgType,
          "outputType": _this.outputControl,
          "redList": _this.redlistTip ? '1' : '0',
          "blackList": _this.blacklistTip ? '1' : '0'
        };
        return discountWechatData;
      },
      "postDiscountWechatData": function (ent) {
        var _this = this;
        if ($scope.wechatScope.name == "") {
          return false;
        };
        if (!_this.publicNumberId) {
          $scope.publicNumberFlag = true;
          return null;
        } else {
          $scope.publicNumberFlag = false;
        };
  
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
          dclonService.wechat.postWechatData(function (response) {
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            element.closest("#nodeContent").hide();
            $(".yunat_maskLayer").remove();
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            $scope.editNodeName(response.id, response.name, $scope.nodecomment);
          }, $scope.wechatScope.getEditorData(), element);
        }, element);
      },
      "getPublicNumbers": function (init) {
        var _this = this;
        dclonService.wechat.getPublicNumbers(function (response) {
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
      "showMaterialsPop": function(){
        //素材选择弹窗
        $(".choiceMaterialsPop").addInteractivePop({
          magTitle: "微信素材选择",
          width: 630,
          mark: false,
          position: "fixed",
          childElePop: true
        });
        this.initMaterials();
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
              $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].offacct + '>' + data[i].offacctName + '</a></li>');
              $ul.find("a").css({
                "padding": "3px 10px",
                "color": "#3D3D3D",
                "display": "block"
              });
            } else if(eleName == "materialsType") {
              $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].type + '>' + data[i].name + '</a></li>');
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
                  $scope.materialFlag = true;
                  $scope.publicNumberFlag = false;
                  $scope.wechatScope.materialId = '';
                  $scope.wechatScope.materialName = '';
                  $scope.wechatScope.publicNumberId = currentId;
                  $scope.wechatScope.publicNumberCur = numberlName;
                });
              } else if (eleName == "shopWechat") {
                var msgType = $(this).attr("type");
                var materialName = $(this).text();
                $scope.$apply(function () {
                  $scope.materialFlag = false;
                  $scope.wechatScope.materialId = currentId;
                  $scope.wechatScope.materialName = materialName;
                  $scope.wechatScope.msgType = msgType;
                });
              } else if (eleName == "materialsType") {
                var materialsTypeName = $(this).text();
                $scope.$apply(function () {
                  $scope.materialFlag = false;
                  $scope.wechatScope.materialsType = currentId;
                  $scope.wechatScope.materialsTypeName=materialsTypeName;
                })
              };
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
      /*以下为素材选择器弹窗 */
      "initMaterials": function(){
        var _this=this;
        //素材类型(news:图文素材;image:图片;video:视频;voice:语音)
        _this.materialsTypeList=[{
          "type": "news",
          "name": "图文素材"
        }];
        _this.materialsType=_this.materialsTypeList[0].type;
        _this.materialsTypeName=_this.materialsTypeList[0].name;
        _this.materialsRadioSelect=_this.materialId;
        $scope.wechatScope.common(_this.materialsTypeList, $('[name="materialsType"]'));
        _this.getMaterials();
      },
      "getMaterials": function () { //获取素材列表
        var _this=this;
        var params = {
          page:$scope.materialsPage.pager.currentPage1,
          pagesize: $scope.materialsPage.pager.pagesize,
          sortorder:'desc',
          sortname:'id',
          msgType:_this.materialsType,
          offacct:$scope.wechatScope.publicNumberId
        };
        _this.searching = false;
        _this.isExternal = true;
        _this.loading = true;
        dclonService.wechat.getWechatMaterials(params,function (response) {
          if(response.data) {
            _this.materialsList=response.data;
            $scope.materialsPage.pager.totalPages = Math.ceil(response.total / $scope.materialsPage.pager.pagesize)==0 ? 1 : Math.ceil(response.total / $scope.materialsPage.pager.pagesize);
          }  
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
                if(val.mediaId==$scope.wechatScope.materialsRadioSelect){
                    $scope.materialFlag=false;
                    $scope.wechatScope.materialId=val.mediaId;
                    $scope.wechatScope.materialName=val.newsItem[0].title;
                }
            });
            currentTarget.closest(".ccmsPublicPop").hide();
            angular.element(".ccmsPublicPop").find(".childElementMark").remove();
        }
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
      $scope.wechatScope.getMaterials();
    });
    //监听查询列表页面pageSize改变
    $scope.$watch('materialsPage.pager.pagesize', function (newValue, oldValue) {
      if (!newValue || newValue == oldValue) {
        return;
      }
      // pageSize改变默认回到第一页
      $scope.materialsPage.pager.currentPage = 1;
      $scope.materialsPage.pager.currentPage1 =$scope.materialsPage.pager.currentPage;
      $scope.wechatScope.getMaterials();
    });
    $scope.wechatScope.fillData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
  }]);
  
  