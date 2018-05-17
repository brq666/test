angular.module("campaign.controllers").controller('AddPartitionCtrl', ['$scope', '$timeout','$http', '$q', 'getListService', '$rootScope',
  function ($scope, $timeout,$http, $q, getListService, $rootScope) {
    var groupDelay = $q.defer();

    /*发送给查询节点的相关Id
     * sendQuerySubjectId-主题Id，sendQueryNodeId-默认节点ID
     * sendQuerySegmentationId —平台id
     */
    window.graph = {}; //清除graph变量
    $scope.sendQuerySubjectId = "";
    $scope.sendQuerySegmentationId = "";
    $scope.sendQueryNodeId = "";
    /*end*/

    $scope.creatGroupObj = {
      "errorFalg": false,
      "blurFlag":false,//编辑名称和目录时标志
      "blurNameFlag":false,//编辑名称和目录时标志
      "ischangeSubject": false,
      "isnotCondition": false,
      "iframeQuery": "",
      "ajaxMethodType": "post",
      "curDefaultGroupId": "",
      "categoryName": "",
      "showSelCategory": false,//点击编辑显示选择目录category
      "editName": false,//编辑name
      "editRule": false,//编辑规则button
      "eNodeFlag": false,//编辑单个条件
      "buttonFlag": true,//编辑按钮显示
      "showPostButton":true,//是否显示底部保存/取消
      "categoriesList": [],
      "groupTypeList": [],
      "disposeInitCategoryName": function () { // 处理添加 修改的分类名称显示
        var _this = this;
        angular.forEach(_this.categoriesList, function (val, key) {
          if (val.categoryName == '默认') {
            _this.findCategoryName = val.categoryName;
            _this.findCategoryId = val.id;
          }
        })
        if (_this.categoryId) {
          angular.forEach(_this.categoriesList, function (val, key) {
              if (val.id == _this.categoryId) {
                if (val.categoryName == '全部') {
                  _this.categoryName =  _this.findCategoryName;
                  _this.categoryId =  _this.findCategoryId;
                }else{
                  _this.categoryName = val.categoryName;
                }
              }
          })
        } else {
          angular.forEach(_this.categoriesList, function (val, key) {
            if (val.categoryName == '默认') {
              _this.categoryName = val.categoryName;
              _this.categoryId = val.id;
            }
          })
        }
      },
      "getModelNodeData": function () {
        var _this = this;
        if (!$scope.customerGroupStatus) { // 新建
          $scope.isNew=true;
          _this.ajaxMethodType = "post";
          _this.titleType = "新建客户分组";
          _this.eNodeFlag=true;
          getListService.addCustomerGroup(function (response) {
            $scope.creatGroupObj.relationCreate="OR";
            graph.nodeId = $scope.sendQueryNodeId = response.nodeId || "";
           // response.categories.pop(); // 去除所有层级
            _this.categoriesList = response.categories;
            _this.groupTypeList = ["属性查询", "订单查询", "活动查询"];
            _this.selectedGroupType = "属性查询";
            _this.categoryId = $rootScope.curCategoryId || "";
            _this.disposeInitCategoryName();
            groupDelay.resolve($scope.sendQueryNodeId);
            $scope.$on('subjectId',function (ev,msg) {
              _this.defaultSubjectId=msg?msg:""; //基础版只有一个平台：淘宝客户
            })
            $scope.$on('staticShop',function (ev,msg) {
              _this.staticShop=msg?msg:"";//店铺选择：大狗子
            });

          });

        } else { // 修改
          $scope.isNew=false;
          _this.ajaxMethodType = "put";
          _this.titleType = "分组详情";
          _this.showPostButton=false;
          _this.eNodeFlag=false;
          getListService.editorCustomerGroup(function (response) {
            _this.name = response.groupName || "";
            _this.oldname = response.groupName || "";
            _this.curDefaultGroupId = response.id || "";
            graph.nodeId =$scope.sendQueryNodeId = response.result || "";
            _this.creator = response.creator|| "";
            _this.created=_this.changeTimeRule(response.created,true);
            _this.modified=_this.changeTimeRule(response.modified,true);
            _this.updatedTimeOri=response.updated;//未转换格式的时间
            _this.updatedTime=_this.changeTimeRule(response.updated,false);
            _this.updateTimeFlag = _this.updatedTime? false : true;//不存在时样式改变
            _this.customerCountPost = response.customerCount;
            if(typeof(response.customerCount)!="object"){
              _this.customerCount = (response.customerCount + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            }else{
              $(".getCount").html("等待更新中……")
            }

            //response.list.pop();
            _this.categoriesList = response.list;
            _this.categoryName = response.categoryName || "";
            _this.subjectIdValue = response.subjectId || ""
            _this.selectedGroupType = response.groupType || ""
            angular.forEach(_this.categoriesList, function (val, key) { //返回name 赋值id
              if (val.categoryName == _this.categoryName) {
                _this.categoryId = val.id;
              }
            });
            groupDelay.resolve($scope.sendQueryNodeId);
            $scope.$on('childRelation', function(event,msg) {
              _this.relationEdit=msg?msg:"OR";
              _this.relationEditCopy=msg?msg:"OR";
            });
            $scope.$on('subjectId',function (ev,data) {
              _this.defaultSubjectId=data?data:"" //基础版只有一个平台：淘宝客户
            })
            $scope.$on('staticShop',function (ev,data) {
              _this.staticShop=data?data:""//店铺选择：大狗子
            });
          }, $scope.curCustomerGroupId);
        }
        groupDelay.promise.then(function () {
          _this.changeGroupTypeMethod(_this.selectedGroupType);
        })
      },
      "changeTimeRule":function (data,mark) {//true月日十分秒，false月日十分
        if(data){
          var before=setISO(data, "all").split(" ")[0].split("-");
          var full=setISO(data, "all").split(" ")[1];
          var after=full.split(":");
          if(mark){
            var timeShow=before[1]+"月"+before[2]+"日 "+full;
          }else{
            var timeShow=before[1]+"月"+before[2]+"日 "+after[0]+":"+after[1];
          }
          return timeShow;
        }else{
          return "";
        }
      },
      "saveEditName": function () {
        var _this = this;
          if(!this.name){
            _this.editName = true;
            _this.errorFalg = true;
            _this.errorMark = "请填写分组名称";
            return false;
          }else{
            _this.editName = false;
            _this.blurFlag = true;
            _this.blurNameFlag = true;
            _this.postCreateGroup();
          }
      },
      "clickEditName": function () {
        var _this = this;
        _this.editName = true;
        $timeout(function () {
          $(".clickEditName").focus();
        })
      },
      "showButton": function () {//编辑规则button
        var _this=this;
        _this.buttonFlag=false;//hide self
        _this.editRule=true;
        _this.showPostButton=true;//显示确定按钮
        _this.eNodeFlag=true;
        $('.seditRule,.seditRule1').hide();
        $('.editRuleS,.editRuleS1').css("cssText", "display:block !important;");
        if( $('.editRuleS .mr20').hasClass('top109') ){
          $('.editRuleS .top109').css({
            'top':'-49px',
            'left':'-15px'
          })
        }else if($('.editRuleS .mr20').hasClass('top99')){
          $('.editRuleS .top99').css({
            'top':'-41px',
            'left':'-15px'
          })
        }else if( $('.editRuleS .mr20').hasClass('top48') ){
          $('.editRuleS .top48').css({
            'top':'-53px',
            'left':'-25px'
          })
        }
        //临时加
        if($('.editRuleS1 .mr20').hasClass('topTemp49')){
          $('.editRuleS1 .topTemp49').css({
            'top':'-53px'
          })
        }else if($('.editRuleS1 .mr20').hasClass('topTemp100')){
          $('.editRuleS1 .topTemp100').css({
            'top':'-42px'
          })
        }
        $('.queryRadioTitleWrap').addClass('editCustomLayout')
        $('.seditRulet').css('left','555px')
      },
      "showEditCate":function () {
        var _this=this;
        _this.showSelCategory=true
      },
      "createCamp":function(id,name,pcount,customerCount){
        $scope.partitionLayer.createCamp(id,name,pcount,customerCount)
      },
      "changeGroupTypeMethod": function (type) {
        var _this = this;
        var templateUrl = '';
        switch (type) {
          case '属性查询':
            templateUrl = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterAttrQuery.html?_=" + new Date().getTime();
            break;
          case '订单查询':
            templateUrl = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterOrderQuery.html?_=" + new Date().getTime();
            break;
          case '活动查询':
            templateUrl = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterCampQuery.html?_=" + new Date().getTime();
            break;
          default:
            templateUrl = '';
        }
        ;
        _this.iframeQuery = templateUrl;
      },
      "selectCategory": function () { // 所属目录
        var _this = this;
        _this.dataReGroup(_this.categoriesList)
        _this.commonTree(_this.categoriesList.slice(1), $('[name="categoryInputNew"]'));
      },
      "selectCategoryEdit": function () { // 所属目录
        var _this = this;
        _this.dataReGroup(_this.categoriesList)
        _this.commonTree(_this.categoriesList.slice(1), $('[name="categoryInputEdit"]'));
      },
      "dataReGroup":function (data) {
        var saveFix = {};
        var parentId = data[0].id;
        angular.forEach(data, function (value, key) {
          if (value.categoryName == "默认" && value.parentId == parentId) {
            saveFix=value;
            data.splice(key,1);
            data.push(saveFix)
          }
        })
        return data;
      },
      "commonTree": function (data, ele) { //模拟select框中为树形结构
        var $selContent = ele.siblings(".selectContent");
        $selContent.children().remove();
        var eleName = ele.attr("name");
        var $ul = $("<ul>", {
          "class": "ztree"
        });
        $selContent.append($ul);
        if (data) {
          function onClick(event, treeId, treeNode) {
            ele.val(treeNode.categoryName);
            ele.attr("valueId", treeNode.id);
            $selContent.slideUp(200);
            $scope.creatGroupObj.categoryName = treeNode.categoryName;
            $scope.creatGroupObj.categoryNameId = treeNode.id;
            if (eleName == "categoryInputEdit") {
              $scope.$apply(function () {
                $scope.creatGroupObj.showSelCategory = false;
                $scope.creatGroupObj.blurFlag = true;
                $scope.creatGroupObj.postCreateGroup();
              })
            }
          }

          var setting = {
            data: {
              key: {
                title: "categoryName", name: "categoryName"
              },
              simpleData: {
                enable: true,
                pIdKey: "parentId"
              }
            },
            view: { //设置多级样式
              //dblClickExpand: false,父级双击不可点击
              addDiyDom: function (treeId, treeNode) {
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
      "conel_operation":function () {
        $('.seditRule,.seditRule1').show();
        //$('.seditRulet').css('left','0px');
        $('.seditRulet').css('left','184px');
        $('.editRuleS').removeAttr("style");
        $('.editRuleS .mr20').removeAttr("style");
        var _this=this;
        _this.buttonFlag=true;
        _this.editRule=false;
        _this.relationEdit=_this.relationEditCopy;
        _this.showPostButton=false;
        _this.eNodeFlag=false;
        $scope.customerGroupStatus=true;
        _this.getModelNodeData();

      },
      "getCreateGroupData": function () {
        var _this = this;
        var reg=/\s+/g;
        if(reg.test(_this.name)){
          _this.name=_this.name.replace(/\s+/g,"")
        }
        var resultObj = {
          "groupName": _this.name,
          "groupType": _this.selectedGroupType,
          "tenantId" : CAMPAIGN_STATIC.tenantId,
          "result":$scope.sendQueryNodeId
        };
        if ($scope.customerGroupStatus) { // 编辑id
          resultObj.id = _this.curDefaultGroupId;
          resultObj.categoryId = $('[name="categoryInputEdit"]').attr("valueid")? $('[name="categoryInputEdit"]').attr("valueid"): null;
          resultObj.subjectId=_this.subjectIdValue;
          resultObj.updated=null
          if(_this.blurFlag){
            resultObj.customerCount=_this.customerCountPost;
            resultObj.updated=_this.updatedTimeOri
          }
        }else{
          resultObj.categoryId = $('[name="categoryInputNew"]').attr("valueid")!=""?$('[name="categoryInputNew"]').attr("valueid"):null;
          resultObj.subjectId = $scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead.tfilterFindObj.defaultSubjectId : $scope.$$childTail.$$childTail.tfilterFindObj.defaultSubjectId;
        }

        return resultObj
      },
      "postCreateGroup": function () { //新建分组
        var groupDataValue = this.getCreateGroupData();
        //console.log(groupDataValue)
        var _this = this;
        var promise = null;
        //验证
        if (!groupDataValue.groupName) {
          this.errorFalg = true;
          this.errorMark = "请填写分组名称";
          return false;
        }
        this.errorFalg = false;


       if(!$scope.customerGroupStatus){//新建
         promise = ($scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead.tfilterFindObj.postQueryData() : $scope.$$childTail.$$childTail.tfilterFindObj.postQueryData());
         promise && promise.then(function () {
          getListService.createCustomerGroup(function (res) { //节点保存后，在去触发保存新建分组
            //	跳转到列表页 $scope.partitionLayer.conel_btn();
            $scope.curCustomerGroupId = res.id;
            _this.editStatus = true;//进入查看详情页面
            $scope.customerGroupStatus = true;
            _this.getModelNodeData();
          }, groupDataValue, _this.ajaxMethodType)
        })
       }else{//编辑
          if(_this.blurFlag){//编辑名字和目录
            promise = ($scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead.tfilterFindObj.postQueryData() : $scope.$$childTail.$$childTail.tfilterFindObj.postQueryData());

            promise && promise.then(function () {
           /*   getListService.createCustomerGroup(function (res) { //节点保存后，在去触发保存新建分组
                if(res.id){
                  $scope.curCustomerGroupId = res.id;
                  _this.curDefaultGroupId = res.id;
                  _this.name = res.groupName || "";
                  $scope.customerGroupStatus = true;//进入查看详情页面
                  _this.editRule=false;
                  _this.buttonFlag=true;
                  _this.showPostButton=false;
                  _this.blurFlag=false;
                  _this.blurNameFlag=false;
                  // _this.getModelNodeData();
                  _this.ajaxMethodType = "put";
                  _this.titleType = "分群详情";
                  _this.showPostButton=false;
                  _this.eNodeFlag=false;
                  _this.updatedTimeOri=res.updated;//未转换格式的时间
                  _this.updatedTime=_this.changeTimeRule(res.updated,false);
                  _this.updateTimeFlag = _this.updatedTime? false : true;//不存在时样式改变
                  _this.customerCountPost = res.customerCount;
                  if(typeof(res.customerCount)!="object"){
                    _this.customerCount = (res.customerCount + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                  }else{
                    $(".getCount").html("等待更新中……")
                  }
                  _this.categoriesList = res.list;
                  _this.categoryName = res.categoryName || "";
                  angular.forEach(_this.categoriesList, function (val, key) { //返回name 赋值id
                    if (val.categoryName == _this.categoryName) {
                      _this.categoryId = val.id;
                    }
                  });
                }
              }, groupDataValue, _this.ajaxMethodType)*/
              function callback(res) {
                if(res.id){
                  $scope.curCustomerGroupId = res.id;
                  _this.curDefaultGroupId = res.id;
                  _this.name = res.groupName || "";
                  $scope.customerGroupStatus = true;//进入查看详情页面
                  _this.editRule=false;
                  _this.buttonFlag=true;
                  _this.showPostButton=false;
                  _this.blurFlag=false;
                  _this.blurNameFlag=false;
                  // _this.getModelNodeData();
                  _this.ajaxMethodType = "put";
                  _this.titleType = "分组详情";
                  _this.showPostButton=false;
                  _this.eNodeFlag=false;
                  _this.updatedTimeOri=res.updated;//未转换格式的时间
                  _this.updatedTime=_this.changeTimeRule(res.updated,false);
                  _this.updateTimeFlag = _this.updatedTime? false : true;//不存在时样式改变
                  _this.customerCountPost = res.customerCount;
                  if(typeof(res.customerCount)!="object"){
                    _this.customerCount = (res.customerCount + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                  }else{
                    $(".getCount").html("等待更新中……")
                  }
                  _this.categoriesList = res.list;
                  _this.categoryName = res.categoryName || "";
                  angular.forEach(_this.categoriesList, function (val, key) { //返回name 赋值id
                    if (val.categoryName == _this.categoryName) {
                      _this.categoryId = val.id;
                    }
                  });
                }
              }
              if(_this.blurNameFlag){
                $http({
                  method: _this.ajaxMethodType,
                  url: GLOBAL_STATIC.nodeRoot + "node/group/customerGroup/?_=" + new Date().getTime(),
                  data: groupDataValue
                }).success(function(data, status, headers, config) {
                  callback(data);
                }).error(function(data, status, headers, config) {
                  $(this).AlertNew({
                    "title": httpTitle || "提示",
                    "str": data.message,
                    "mark": true
                  });
                  _this.name= _this.oldname
                })
              }else{
                $http({
                  method: _this.ajaxMethodType,
                  url: GLOBAL_STATIC.nodeRoot + "node/group/customerGroup/?_=" + new Date().getTime(),
                  data: groupDataValue
                }).success(function(data, status, headers, config) {
                  callback(data);
                }).error(function(data, status, headers, config) {
                  $(this).AlertNew({
                    "title": httpTitle || "提示",
                    "str": data.message,
                    "mark": true
                  });
                })
              }

            })
          }else{
            if(!_this.isnotCondition){
              promise = ($scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead.tfilterFindObj.postQueryData() : $scope.$$childTail.$$childTail.tfilterFindObj.postQueryData());
              if(promise){
              //  $(this).ConfirmNew({
              //    "title": "确认",
              //    "str": "编辑规则后，系统将在10分钟左右计算出人数。<br>" +
              //    "这期间不会展示分组的人数，但您可以正常创建营销活动。",
              //    "mark": true,
              //    "eleZindex": 1010,
              //    "markZindex": 1005
              //  }, function() {
              //     $('.seditRule,.seditRule1').show();
              //     $('.seditRulet').css('left','184px');
              //     //$('.seditRulet').css('left','0px');
              //     $('.editRuleS').removeAttr("style");
              //     $('.editRuleS .mr20').removeAttr("style");
              //    promise && promise.then(function () {
              //    getListService.createCustomerGroup(function (res) { //节点保存后，在去触发保存新建分组
              //      $scope.curCustomerGroupId = res.id;
              //      $scope.customerGroupStatus = true;//进入查看详情页面
              //      _this.editRule=false;
              //      _this.buttonFlag=true;
              //      _this.showPostButton=false;
              //      _this.blurFlag=false;
              //      _this.blurNameFlag=false;
              //      $(".getCount").html("等待更新中……")
              //      _this.getModelNodeData();
              //    }, groupDataValue, _this.ajaxMethodType)
              //    })
              //  }, function() {
              //  });
              
              promise && promise.then(function () {
                getListService.createCustomerGroup(function (res) { //节点保存后，在去触发保存新建分组
                  $scope.curCustomerGroupId = res.id;
                  $scope.customerGroupStatus = true;//进入查看详情页面
                  _this.editRule=false;
                  _this.buttonFlag=true;
                  _this.showPostButton=false;
                  _this.blurFlag=false;
                  _this.blurNameFlag=false;
                  $(".getCount").html("等待更新中……")
                  _this.getModelNodeData();
                }, groupDataValue, _this.ajaxMethodType)
              })
             }

            }
          }



       }

      }
    };
    $scope.creatGroupObj.getModelNodeData();
  }
]);
