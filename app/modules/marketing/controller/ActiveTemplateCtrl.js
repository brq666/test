function htmlEntities(s, newline) {
    s = s || '';

    s = s.replace(/&/g, '&amp;'); // 38 26
    s = s.replace(/"/g, '&quot;'); // 34 22
    s = s.replace(/\'/g, '&#39;'); // 39 27
    s = s.replace(/</g, '&lt;'); // 60 3C
    s = s.replace(/>/g, '&gt;'); // 62 3E

    if (newline) {
        s = s.replace(/\n/g, '<br />');
    }

    return s;
}
function fixEvt(evt) { //修正对象在各浏览器的不同
  evt = evt || window.event;
  if (!evt.target) { //IE
    evt.target = evt.srcElement;
    evt.layerX = evt.offsetX;
    evt.layerY = evt.offsetY;
    evt.stopPropagation = function() {
      this.cancelBubble = true;
    }
    evt.preventDefault = function() { //evt.preventDefault()放在方法最前，可阻止冒泡。
      event.returnValue = false;
    }
    evt.pageX = evt.clientX + document.documentElement.scrollLeft;
    evt.pageY = evt.clientY + document.documentElement.scrollTop;
  }
  return evt;
}
function viewMark(t, e) { //备注显示
  var boxVal = $(t).attr("_title");
  e = fixEvt(e);
  var posX = e.pageX + 15,
      posY = e.pageY + 15;
  $("#couponTip").css({
    "left": posX,
    "top": posY - 56
  }).html(htmlEntities(boxVal, true)).show();
}
function hideMark() {
  $("#couponTip").hide();
}

(function(angular, window) {
  angular.module('campaign.controllers').controller("ActiveTemplateCtrl", ["$scope", "$http", "$location", "$compile", "ActiveTemplateService", "getListService",
    function($scope, $http, $location, $compile, ActiveTemplateService, getListService) {
      $scope.getList = function() {
        $('.campaignListConTemplate').flexigrid({
          url: GLOBAL_STATIC.campaignRoot + 'campaign/' + CAMPAIGN_STATIC.tenantId + '/template/',
          method: 'GET',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          colModel: [{
            display: '模板ID',
            name: 'id',
            width: 1,
            sortable: true,
            align: 'right',
            dataindex: 'id'
          },
          {
            display: '模板名称',
            name: 'name',
            width: 1,
            sortable: false,
            align: 'left',
            dataindex: 'name',
            renderer: function(v) {
              return '<span title="' + v + '" class="activity_name" ng-click="marketList.nameClick($event)">' + v + '</span>';
            }
          },
          {
            display: '创建人',
            name: 'creator',
            width: 1,
            sortable: false,
            align: 'left',
            dataindex: 'creator',
            renderer: function(v) {
              return '<span title="' + v + '">' + v + '</span>';
            }
          },

          {
            display: '创建时间',
            name: 'createdAt',
            width: 1,
            sortable: false,
            align: 'center',
            dataindex: 'createdAt',
            renderer: function(v) {
              return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
            }
          },
          {
            display: '修改时间',
            name: 'updatedAt',
            width: 1,
            sortable: false,
            align: 'center',
            dataindex: 'updatedAt',
            renderer: function(v) {
              return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
            }
          },
          {
            display: '模板说明',
            name: 'reference',
            width: 1,
            sortable: false,
            align: 'left',
            dataindex: 'reference',
            renderer: function(v) {
              return v == '' || v == null ? '': '<a href="' + v + '">' + v + '</a>';
            }
          },
          {
            display: '备注',
            name: 'remark',
            width: 1,
            sortable: false,
            align: 'center',
            dataindex: 'remark',
            renderer: function(v) {
              return v == '' || v == null ? '': '<a href="javascript:void(0)" class="couponMark" _title="' + v + '" onmouseover="viewMark(this,event)" onmouseout="hideMark()"></a>';
            }
          },
          {
            display: '操作',
            name: 'enable',
            width: 2,
            align: 'left',
            dataindex: 'enabled',
            mapping: ['id', 'reserved'],
            convert: function(v, mappVal) {
              var text1 = '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="gridObj.itemEidt(\'' + mappVal[0] + '\')"></a>' + '<a href="javascript:void(0);" class="edit_delete delete_icon"  title="删除"  ng-click="gridObj.itemDelete(\'' + mappVal[0] + '\')"></a>' + '<a href="/portal/index.html#/campaign/market/calendar?template='+ mappVal[0] +'"    title="新增活动" class="add" style="color:#fff;">创建活动</a>';
              var text2 = '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="gridObj.itemEidt(\'' + mappVal[0] + '\')"></a>' + '<a href="/portal/index.html#/campaign/market/calendar?template='+ mappVal[0] +'"    title="新增活动" class="add" style="color:#fff;">创建活动</a>';
              return mappVal[1] ? text2: text1;
              /*+ '<a href="javascript:void(0);"   title="上传"  ng-click="gridObj.itemUpload(\'' + mappVal[0] + '\')">上传</a>'*/
            }
          }],
          sortname: 'id',
          updateDefaultParam: true,
          sortorder: "desc",
          buttons: [],
          usepager: true,
          useRp: true,
          newp: templateListParams.newp,
          rp: templateListParams.rp,
          query: templateListParams.searchText,
          showTableToggleBtn: true,
          colAutoWidth: true,
          rowDblClick: function() {
            var rec = $(this).data('rec');
            var scope = angular.element(document.querySelector('.tabContentArea')).scope();
            scope.marketList.dbClick(rec);
          },
          onSuccess: function(data) {
            var scope = angular.element($(".campaignListConTemplate")).scope();
            scope.gridObj.upCompile(scope);

            var girdElement = angular.element(".campaignListConTemplate")[0];
            templateListParams.searchText = girdElement.p.query;
            templateListParams.newp = girdElement.p.page;
            templateListParams.rp = girdElement.p.rp;
          },
          onError: function(response) {
            var responseText = response.responseText;
            var data = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
            if (response.status == 401) {
              location.pathname = "/portal/login.html";
            }
          }
        });
      }
      $scope.getList();
      /*活动列表*/
      $scope.marketList = {
        "girdElement": angular.element(".campaignListConTemplate")[0],
        "searchHdButton": function(hdVal) {
          this.girdElement.p.newp = 1;
          this.girdElement.p.qtype = "keywords";
          this.girdElement.p.query = hdVal || "";
          this.girdElement.grid.populate();
        },
        "dbClick": function(res) {
          var o = {
            "id": res.workflowId,
            "campId": res.id,
            "name": res.name,
            "execute_job": null
          }
          var tabList = $scope.tabpanel_campaign.tabList;
          var len = tabList.length;
          var flag = false;
          for (var i = 0; i < len; i++) {
            if (tabList[i].id == o.id) {
              $scope.tabpanel_campaign.tabTitleStyle(i + 1);
              flag = true;
              break;
            }
          }
          if (!flag) {
            $scope.tabpanel_campaign.tabList.push(o);
            $scope.$$phase || $scope.$apply();
            setTimeout(function () {
              $scope.tabpanel_campaign.tabTitleStyle(len + 1);
            })
          }
          $scope.currentWorkflowId = res.workflowId;
          $scope.currentCampId = res.id;
          $scope.currentType = "template";
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + "view/templateWorkflow.html?_=" + new Date().getTime();
          $scope.tabpanel_campaign.flag = false;
          $scope.$$phase || $scope.$apply();

        },
        "nameClick": function(e){
          e.stopPropagation();
          var _this = e.target.closest('tr');
          var res = $(_this).data('rec');
          this.dbClick(res);
        }
      }
      //模板新增或者编辑
      $scope.tpl = {
        "src": "",
        "type": "add",
        "id": 0,
        "title": "新建模板",
        "Template": {
          "name": "",
          "remark": ""
        },
        "submitDisF": false,
        "submit": function() {
          _this = this;
          _this.Template.name=_this.Template.name.replace(/\s+/g,"");
          _this.validate()
        },
        "add": function() {
          _this = this;
          _this.type = "add";
          _this.Template = {
            "name": "",
            "remark": ""
          };
          _this.title = "新建模板";
          $scope.tabpanel_campaign.isCreatFlag = true;
          _this.src = CAMPAIGN_STATIC.tplBasePath + "view/template.html?=" + new Date().getTime();
        },
        "edit": function(id) {
          var isExist = false;
          $scope.tabpanel_campaign.tabList.forEach(function(item) {

            if (item.campId == id) {
              isExist = true;
            }
          });
          if (isExist) {
            $(this).Alert({
              "title": "编辑提示",
              "str": "编辑失败，请先退出该活动流程",
              "mark": true,
              "width": "260px"
            });
          } else {
            _this = this;
            ActiveTemplateService.getTemplate(function(response) {
              _this.type = "edit";
              _this.Template = {
                "name": response.name,
                "remark": response.remark
              };
              _this.id = id;
              _this.title = "编辑模板";
              _this.src = CAMPAIGN_STATIC.tplBasePath + "view/template.html?=" + new Date().getTime();
              $scope.tabpanel_campaign.isCreatFlag = true;
            }, id)
          }
        },
        "closeTpl": function() {
          _this = this;
          _this.src = "";
          $scope.tabpanel_campaign.isCreatFlag = false;
        },
        "save": function() {
          _this = this;
          if (_this.type == "add") {
            _this.submitDisF = true;
            ActiveTemplateService.addTemplate(function(response) {
              _this.submitDisF = false;
              var creatNewHdobg = {
                "name": response.name
              };
              creatNewHdobg.workflowId = (response && response.workflowId) ? response.workflowId: "";
              creatNewHdobg.id = response.id ? response.id: "";
              $(this).Confirm({
                "title": "保存成功",
                "str": "模板保存成功，是否立即进入模版编辑页面？",
                "mark": true,
                "eleZindex": 1010,
                "markZindex": 1005
              }, function() {
                // $scope.$apply(function () {
                _this.src = "";
                $scope.marketList.dbClick(creatNewHdobg);
                _this.show_flog = false;
                $scope.tabpanel_campaign.isCreatFlag = false;
                $('.campaignListConTemplate').flexReload();
                //})
              }, function() {
                $scope.$apply(function() {
                  $scope.tabpanel_campaign.backList();
                  _this.src = "";
                  $scope.tabpanel_campaign.isCreatFlag = false;
                  $('.campaignListConTemplate').flexReload();
                });
              });
              $('.ccmsPublicPopBg .close').on('click',function(){
                $scope.$apply(function() {
                  $scope.tabpanel_campaign.backList();
                  _this.src = "";
                  $scope.tabpanel_campaign.isCreatFlag = false;
                  $('.campaignListConTemplate').flexReload();
                });
              })
            }, _this.Template, function(response) {
              _this.submitDisF = false;
            });
          } else {
            ActiveTemplateService.updateTemplate(function(response) {
              $(this).yAlert({
                "text": "编辑成功"
              });
              removeAlert();
              //
              _this.src = "";
              $scope.tabpanel_campaign.isCreatFlag = false;
              $('.campaignListConTemplate').flexReload();
            }, _this.id, _this.Template);
          }
        },
        "validate": function() {
          $("#ump_form").validate({
            rules: {
              name: {
                required: true,
                maxlength: 20
              },
              remark: {
                maxlength: 200
              }
            },
            messages: {
              name: {
                require: "请输入商品优惠名称",
                maxlength: 20
              },
              remark: {
                maxlength: "输入字符最长为100"
              }
            },
            errorPlacement: function(error, element) {
              if (element.is(":radio")) {
                error.appendTo(element.parent());
              } else {
                element.after(error);
              }

            },
            submitHandler: function() {
              $scope.tpl.save();
            }
          });
        }
      }
      //上传模板
      $scope.upload = {
        "name": "",
        "open": function() {
          $(".upload").addInteractivePop({
            magTitle: "模板上传",
            mark: true,
            position: "fixed",
            childElePop: true
          });
        },
        "save": function() {}
      }
      //营销活动tab页
      $scope.tabpanel_campaign = {
        "flag": true,
        "tabList": [],
        "tabContentList": [],
        "tabTitleStyle": function(i) {
          angular.element("#tabpenel_list li").eq(i).addClass("hover").siblings().removeClass("hover");
        },
        "click_tabTitle": function(index) {
          $("body div.mxTooltip").remove(); //删除节点的remark，避免叠压
          if (typeof(jobRefreshTimer) != "undefined") { //clear活动节点的状态定时器
            clearTimeout(jobRefreshTimer);
          }
          if (typeof(campRefreshTimer) != "undefined") { //clear活动节点的状态定时器
            clearTimeout(campRefreshTimer);
          }
          var clickOneFlag = angular.element("#tabpenel_list li").eq(index).hasClass("hover"); //当前点击不刷新
          this.tabTitleStyle(index);
          $scope.tabpanel_campaign.flag = false;
          //$scope.marketLayer.show_flog = false;
          //去除活动模板zTree
          //$scope.hdZtreeType = "";
          if (!clickOneFlag) {
            this.upDateFlowTpl_src(index - 1);
          }
        },
        "backList": function() {
          $("body div.mxTooltip").remove(); //删除节点的remark，避免叠压
          if (typeof(jobRefreshTimer) != "undefined") { //clear活动节点的状态定时器
            clearTimeout(jobRefreshTimer);
          }
          if (typeof(campRefreshTimer) != "undefined") { //clear活动节点的状态定时器
            clearTimeout(campRefreshTimer);
          }
          this.tabTitleStyle(0);
          $scope.tabpanel_campaign.flag = true;
          //$scope.marketLayer.show_flog = false;
          $scope.flowTpl_src = "";
          //$scope.hdZtreeType = "view/marketTypesTree.html";
        },
        "upDateFlowTpl_src": function(currentGraphIdIndex) {
          $scope.flowTpl_src = "";
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + "view/templateWorkflow.html?_=" + new Date().getTime();
          $scope.currentWorkflowId = $scope.tabpanel_campaign.tabList[currentGraphIdIndex].id;
          $scope.currentCampId = $scope.tabpanel_campaign.tabList[currentGraphIdIndex].campId;
        },
        "click_tabClose": function(key) {
          if (typeof(jobRefreshTimer) != "undefined") { //clear活动节点的状态定时器
            clearTimeout(jobRefreshTimer);
          }
          if (typeof(campRefreshTimer) != "undefined") { //clear活动节点的状态定时器
            clearTimeout(campRefreshTimer);
          }
          var keyFlag = key < $scope.tabpanel_campaign.tabList.length;
          $scope.tabpanel_campaign.tabList.splice(key - 1, 1);
          if (keyFlag) { //向后延续
            this.tabTitleStyle(key + 1);
            this.upDateFlowTpl_src(key - 1);
          } else { //向前延续
            this.tabTitleStyle(key - 1);
            if ($scope.tabpanel_campaign.tabList.length == 0) { //跳转到列表
              $scope.flowTpl_src = "";
              //$scope.marketList.tpl_src = "view/activityList.html?_=" + new Date().getTime();
              $scope.tabpanel_campaign.flag = true;
            } else {
              this.upDateFlowTpl_src(key - 2);
            }
          }
        }
      }
      //自定义表格
      $scope.gridObj = {
        "modelSrc": "",
        // 客户订单查询 修改属性模板入口
        "customerNo": "",
        "curAttrId": "",
        "showConfigAttrSrc": "",
        "addCustomAttrPage": true,
        "customList": "",
        "customVal": "",
        "girdElement": angular.element(".campaignListCon")[0],
        //use 表格列表行内编辑
        "itemEidt": function(id) {
          $scope.tpl.edit(id);
        },

        //删除活动
        "itemDelete": function(id) {
          var isExist = false;
          $scope.tabpanel_campaign.tabList.forEach(function(item) {

            if (item.campId == id) {
              isExist = true;
            }
          });
          if (isExist) {
            $(this).Alert({
              "title": "删除提示",
              "str": "删除失败，请先退出该活动流程",
              "mark": true,
              "width": "260px"
            });
          } else {
            $(this).Confirm({
              "title": "确认删除",
              "str": "是否确认删除模板？",
              "mark": true
            }, function() {
              ActiveTemplateService.deleteTemplate(function(response) {
                $(this).yAlert({
                  "text": "删除成功"
                });
                removeAlert();
                angular.element($(".campaignListCon")).flexReload();
              }, id);
            })
          }
        },
        "itemUpload": function(id) {
          $scope.upload.open();
        },
        //编译模板
        "upCompile": function(curScope) {
          $compile(angular.element(".campaignListCon"))($scope || curScope);
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        }
      }
      // 赋值
      $scope.hdValue = templateListParams.searchText;
    }
  ]);
})(angular, window);
