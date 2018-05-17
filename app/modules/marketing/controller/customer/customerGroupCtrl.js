angular.module("campaign.controllers").controller('CustomerCtrl', ['$scope', '$location', '$http', '$rootScope', 'saveService', 'getListService',
  function($scope, $location, $http, $rootScope, saveService, getListService) {
    $scope.flowTpl_src = ""
    //分组table页
    $scope.groupTable = {
      "flag": true,
      "titleFlag": true,
      // 菜单列表参数
      "tabList": [],
      "tabContentList": [],
      "tabTitleStyle": function(i) {
        angular.element("#tabpenel_list li").eq(i).addClass("hover").siblings().removeClass("hover");
      },
      "click_tabTitle": function(index) {
        var clickOneFlag = angular.element("#tabpenel_list li").eq(index).hasClass("hover"); //当前点击不刷新
        this.tabTitleStyle(index);
        $scope.groupTable.flag = false;
        $scope.groupObj.show_flog = false;
        //去除活动模板zTree
        $scope.hdZtreeType = "";
        if (!clickOneFlag) {
          this.upDateFlowTpl_src(index - 1);
        }
      },
      "backList": function() {
        this.tabTitleStyle(0);
        $scope.groupTable.flag = true;
        $scope.groupObj.show_flog = false;
        //加载活动模板zTree
        $scope.marketList.tpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/groupList.html';
        $scope.hdZtreeType = CAMPAIGN_STATIC.tplBasePath + 'view/customer/groupZtree.html';

      },
      "upDateFlowTpl_src": function(currentGraphIdIndex) {
        $scope.curCustomerGroupId = $scope.groupTable.tabList[currentGraphIdIndex].id;
        $scope.marketList.curTitleStatus = $scope.groupTable.tabList[currentGraphIdIndex].groupType; // 分组类型判断赋值
        if ($scope.marketList.curTitleStatus == "静态分组") { // 静态分组 ||动态分组
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/staticViewGroup.html?_=' + new Date().getTime();
        } else {
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/viewGroup.html?_=' + new Date().getTime();
        }
      },
      "click_tabClose": function(key) {
        var keyFlag = key < $scope.groupTable.tabList.length;
        $scope.groupTable.tabList.splice(key - 1, 1);
        if (keyFlag) { //向后延续
          this.tabTitleStyle(key + 1);
          this.upDateFlowTpl_src(key - 1);
        } else { //向前延续
          this.tabTitleStyle(key - 1);
          if ($scope.groupTable.tabList.length == 0) { //跳转到列表
            $scope.flowTpl_src = "";
            $scope.marketList.tpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/groupList.html?_=' + new Date().getTime();
            $scope.groupTable.flag = true;
          } else {
            this.upDateFlowTpl_src(key - 2);
          }
        }

      }
    }
    /*活动列表*/
    $scope.marketList = {
      "curTitleStatus": "",
      // 标记当前的分组类型
      "tpl_src": CAMPAIGN_STATIC.tplBasePath + 'view/customer/groupList.html?_=' + new Date().getTime(),
      "dbClick": function(res) {
        this.curTitleStatus = res.groupType;
        var o = {
          "id": res.id,
          "name": res.groupName,
          "groupType": res.groupType
        }
        var tabList = $scope.groupTable.tabList;
        var len = tabList.length;
        var flag = false;
        for (var i = 0; i < len; i++) {
          if (tabList[i].id == o.id) {
            $scope.groupTable.tabTitleStyle(i + 1);
            flag = true;
            break;
          }
        }
        if (!flag) {
          $scope.groupTable.tabList.push(o);
          $scope.$apply();
          $scope.groupTable.tabTitleStyle(len + 1);

        }
        $scope.curCustomerGroupId = res.id;
        if (this.curTitleStatus == "静态分组") { // 静态分组 ||动态分组
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/staticViewGroup.html?_=' + new Date().getTime();
        } else {
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/viewGroup.html?_=' + new Date().getTime();
        }
        $scope.groupTable.flag = false;
        $scope.$apply();
        $scope.hdZtreeType = "";
      },
      "viewCustomerData": function() { // 客户数据查看
        $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/customerDataTables.html?_=' + new Date().getTime();
      },
      "backViewGroup": function() { // 数据查看返回
        if (this.curTitleStatus == "静态分组") { // 静态分组 ||动态分组
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/staticViewGroup.html?_=' + new Date().getTime();
        } else {
          $scope.flowTpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/viewGroup.html?_=' + new Date().getTime();
        }
      }
    }

    /*自定义select框*/
    $scope.customSelect = {
      "common": function(data, ele) { //模拟普通的select框
        var $selContent = ele.siblings(".selectContent");
        $selContent.children().remove();
        var eleName = ele.attr("name");
        var $ul = $("<ul>");
        if (data) {
          $selContent.append($ul);
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (eleName == "campType") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].progId + '>' + data[i].progName + '</a></li>')
            } else if (eleName == "investigator") {
              $ul.append('<li><a href="javascript:void(0);" id=' + data[i].id + '>' + data[i].loginName + '</a></li>');
              $ul.find("a").css({
                "padding": "3px 10px",
                "color": "#3D3D3D",
                "display": "block"
              })
            }

          }
          $ul.find("a").bind({
            "click": function() {
              ele.val($(this).text());
              ele.attr("valueId", $(this).attr("id"));
              //$scope.groupObj.investigatorNameId =
              $selContent.slideUp(200);
            },
            "mouseenter": function() {
              $(this).css({
                "color": "#0083BA",
                "background": "#F2F2F2",
                "text-decoration": "none"
              });
            },
            "mouseleave": function() {
              $(this).css({
                "color": "#3D3D3D",
                "background": "#FFFFFF"
              });
            }
          })
        }
      },
      "commonTree": function(data, ele) { //模拟select框中为树形结构
        var $selContent = ele.siblings(".selectContent");
        $selContent.children().remove();
        var $ul = $("<ul>", {
          "class": "ztree"
        });
        $selContent.append($ul);
        if (data) {
          function onClick(event, treeId, treeNode) {
            ele.val(treeNode.categoryName);
            ele.attr("valueId", treeNode.id);
            $selContent.slideUp(200);
            $scope.groupObj.progName = treeNode.categoryName;
            $scope.groupObj.progNameId = treeNode.id;
          }
          var setting = {
            data: {
              key: {
                title: "name",
                name: "categoryName"
              },
              simpleData: {
                enable: true,
                pIdKey: "parentId"
              }
            },
            view: { //设置多级样式
              //dblClickExpand: false,父级双击不可点击
              addDiyDom: function(treeId, treeNode) {
                var spaceWidth = 10;
                var switchObj = $("#" + treeNode.tId + "_switch"),
                    icoObj = $("#" + treeNode.tId + "_ico");
                switchObj.remove();
                icoObj.before(switchObj);
                var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
                switchObj.before(spaceStr);
              }
            },
            callback: {
              onClick: onClick
            }
          };
          $.fn.zTree.init($ul, setting, data);
        }

      },
      "adapter": function(data) { //适配普通树形结构数据
        var len = data.length;
        var zNodes = [];
        for (var i = 0; i < len; i++) {
          var o = {};
          o.id = data[i].id;
          o.pId = data[i].parentId;
          o.name = data[i].name;
          zNodes.push(o);
          if (data[i].children && data[i].children.length > 0) {
            childNode(data[i].children);
          }
        }
        function childNode(d) {
          for (var i = 0; i < d.length; i++) {
            var o = {};
            o.id = d[i].id;
            o.pId = d[i].parentId;
            o.name = d[i].name;
            zNodes.push(o);
            if (d[i].children && d[i].children.length > 0) {
              childNode(d[i].children);
            }
          }
        }
        return zNodes;
      }
    };
    /*新建修改活动*/
    $scope.groupObj = {
      "editorCampaignId": "",
      "show_flog": false,
      "creatServerFlag": false,
      //新建 | 修改
      "tpl_src": "",
      "dispose_once": null,
      "initialize": function(curCampaignId, curCampaignName, status) { //新增与修改公用相同模板，先做数据初始化处理
        $scope.typeTitle = curCampaignId ? "编辑": "新建";
        $scope.groupTable.titleFlag = false;
        _this = this;
        _this.show_flog = true;
        _this.creatServerFlag = false;
        var curCampaignEditor = true;
        _this.editorCampaignId = curCampaignId ? curCampaignId: "";
        if (curCampaignId) { //修改
          angular.element("#tabpenel_list li").each(function() { //已打开活动，不能修改
            if ($.trim(angular.element(this).text()) == curCampaignName) {
              curCampaignEditor = false;
              $(this).Alert({
                "title": "编辑提示",
                "str": "编辑失败，请先退出该活动流程",
                "mark": true,
                "width": "220px"
              });
            }
          });
          if (curCampaignEditor) {
            $scope.customerGroupStatus = true;
            $scope.curCustomerGroupId = curCampaignId;
          }
        } else { //新建
          $scope.customerGroupStatus = false;
          $scope.curCustomerGroupId = "";
        };

        if (curCampaignEditor) { //活动打开不可编辑
          _this.tpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/addGroup.html?_=' + new Date().getTime();
          $scope.hdZtreeType = "";
          $scope.marketList.tpl_src = "";
        } else {
          _this.tpl_src = "";
          _this.show_flog = false;
          $scope.hdZtreeType = CAMPAIGN_STATIC.tplBasePath + 'view/customer/groupZtree.html';
        };
      },
      "add": function(curCampaignId, curCampaignName, status) { //新增活动 || 修改活动true
        //if($rootScope.curCategoryId ==undefined && curCampaignId==undefined){
        //				$(this).Alert({"title":"提示","str":"请先选择分类","mark":true,"width":"100px"});
        //				return false;
        //			}
        this.initialize(curCampaignId, curCampaignName, status);
        $scope.groupTable.flag = true;
      },
      "getSaveParse": function() {
        var result = {};
        result.campName = this.campName;
        result.createType = this.createType;
        if (this.createType == 1) {
          result.templateId = this.templateId;
        }
        result.categoryId = $scope.classificationId ? $scope.classificationId: ""; //类型
        result.classificationId = parseInt($('[name="program"]').attr("valueid") ? $('[name="program"]').attr("valueid") : ""); //分类
        result.investigatorId = parseInt($('[name="investigator"]').attr("valueid") ? $('[name="investigator"]').attr("valueid") : "");
        result.remark = $('[name="campDesc"]').val();
        return result;
      },
      "conel_btn": function() { // 取消返回列表
        this.show_flog = false;
        this.tpl_src = "";
        //新建取消留着原页面
        var titleHasHoverFlag = angular.element("#tabpenel_list li:first").hasClass("hover");
        $scope.groupTable.titleFlag = true;
        if (titleHasHoverFlag) { //判断是列表 || 活动
          $scope.groupTable.flag = true;
          $scope.marketList.tpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customer/groupList.html?_=' + new Date().getTime();
        } else {
          $scope.groupTable.flag = false;
        }
      },
      "removeHdtypePop": function() {
        angular.element(".marketLayerHdTypePop").hide();
        angular.element(".yunat_maskLayer").remove();
      },
      "choseThisType": function(v) {
        var typeElement = angular.element(".marketLayerHdTypePop li");
        for (var i = 0; i < typeElement.length; i++) {
          if (v != i) {
            typeElement.eq(i).removeClass('cur');
          }
        }
        var elem = typeElement.eq(v);
        elem.toggleClass("cur");
      },
      "sure_hdType": function() {
        var curTypeElement = angular.element(".marketLayerHdTypePop li.cur a");
        this.removeHdtypePop();
        this.campTypeName = curTypeElement.text();
        $scope.classificationId = curTypeElement.attr("id");
      },
      "conel_hdType": function() {
        this.removeHdtypePop();
      }
    };
  }
]);
