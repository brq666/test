angular.module("campaign.controllers").controller('AddGroupCtrl', ['$scope', '$http', '$q', 'getListService', '$rootScope',
  function($scope, $http, $q, getListService, $rootScope) {
    var groupDelay = $q.defer();

    /*发送给查询节点的相关Id
     * sendQuerySubjectId-主题Id，sendQueryNodeId-默认节点ID
     * sendQuerySegmentationId —平台id
     */
    window.graph = null; //清除graph变量
    $scope.sendQuerySubjectId = "";
    $scope.sendQuerySegmentationId = "";
    $scope.sendQueryNodeId = "";
    /*end*/

    $scope.creatGroupObj = {
      "errorFalg": false,
      "ischangeSubject": false,
      "isnotCondition": false,
      "iframeQuery": "",
      "ajaxMethodType": "post",
      "curDefaultGroupId": "",
      "categoryName": "",
      "categoriesList": [],
      "groupTypeList": [],
      "typeTitle": ($scope.customerGroupStatus ? "编辑": "新建"),
      "disposeInitCategoryName": function() { // 处理添加 修改的分类名称显示
        var _this = this;
        angular.forEach(_this.categoriesList, function(val, key) {
          if (val.id == _this.categoryId) {
            _this.categoryName = val.categoryName;
          }
        })
      },
      "getModelNodeData": function() {
        var _this = this;
        if (!$scope.customerGroupStatus) { // 新建
          _this.ajaxMethodType = "post";
          //if($rootScope.curCategoryId){ // 选择分类后才添加 需求没分类就在未分类里面
          getListService.addCustomerGroup(function(response) {
            $scope.sendQueryNodeId = response.nodeId || "";
            response.categories.pop(); // 去除所有层级
            _this.categoriesList = response.categories;
            _this.groupTypeList = response.groupType;
            _this.categoryId = $rootScope.curCategoryId || "";
            _this.disposeInitCategoryName();
            _this.selectedGroupType = "动态分组"; //response.groupType ? response.groupType[0] : ["动态分组","静态分组"];
            _this.selectedGroupTypeFlag = true; // 静态分组前期先不做
            groupDelay.resolve($scope.sendQueryNodeId);
          });
          //}
        } else { // 修改
          _this.ajaxMethodType = "put";
          getListService.editorCustomerGroup(function(response) {
            _this.name = response.groupName || "";
            _this.curDefaultGroupId = response.id || "";
            $scope.sendQueryNodeId = response.result || "";
            response.list.pop();
            _this.categoriesList = response.list;
            _this.categoryName = response.categoryId || ""; // 后端返回值是name
            _this.groupTypeList = ["动态分组", "静态分组"];
            _this.selectedGroupType = response.groupType || "";
            _this.selectedGroupTypeFlag = true; // 编辑分组类型不可修改
            angular.forEach(_this.categoriesList, function(val, key) { //返回name 赋值id
              if (val.categoryName == _this.categoryName) {
                _this.categoryId = val.id;
              }
            });
            groupDelay.resolve();
          }, $scope.curCustomerGroupId);
        };

        groupDelay.promise.then(function() {
          _this.changeGroupTypeMethod(_this.selectedGroupType);
        })
      },
      "changeGroupTypeMethod": function(type) {
        var _this = this;
        if (type == "动态分组") {
          var delay = getListService.getPlatList(function(response) {
            _this.subjectList = response || [];
          });
          $q.when(delay).then(function() {
            getListService.opentfilterNode(function(response) { // 请求打开节点，获取平台,获取subjectsId，然后在查询节点嵌入获取
              _this.subjectLabel = response.subjectLabel || "";
              //获取平台id
              var platIsValit = false;
              angular.forEach(_this.subjectList, function(val, key) {
                if (val.subjectId == response.defaultSubject) {;
                  $scope.sendQuerySegmentationId = val.segmentationId;
                  platIsValit = true;
                  return false;
                }
              })

              if (platIsValit) {
                $scope.sendQuerySubjectId = _this.defaultSubjectId =  response.defaultSubject ;
              } else {
                $scope.sendQuerySegmentationId = _this.subjectList[0] && _this.subjectList[0].segmentationId;
                $scope.sendQuerySubjectId = _this.defaultSubjectId = _this.subjectList[0] && _this.subjectList[0].subjectId;
              }

              _this.iframeQuery = CAMPAIGN_STATIC.tplBasePath + 'view/node/tfilterfindView/tfilterfindRadioContent.html?_=' + new Date().getTime(); // 嵌入查询节点
            }, $scope.sendQueryNodeId);
          })
        } else if (type == "静态分组") {
          _this.iframeQuery = CAMPAIGN_STATIC.tplBasePath + "view/customer/staticViewGroup.html?_=" + new Date().getTime();
        }
      },
      "selectCategory": function() { // 选择类型
        var _this = this;
        $scope.customSelect.commonTree(_this.categoriesList, $('[name="categoryInput"]'));
      },
      "changeSubject": function() { // 切换主题平台
        var _this = this;
        $scope.sendQuerySubjectId = _this.defaultSubjectId;
        angular.forEach(_this.subjectList, function(val, key) {
          if (val.subjectId == _this.defaultSubjectId) {
            $scope.sendQuerySegmentationId = val.segmentationId;
          }
        });
        _this.iframeQuery = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/tfilterfindRadioContent.html?_=" + new Date().getTime();
        _this.ischangeSubject = true;
        $scope.dragReminderFlag = true;
        _this.isnotCondition = false;
      },
      "getQueryConfigData": function() { // 获取查询节点配置相关信息
        var _this = this;
        var postQueryConfigData = {
          "id": $scope.sendQueryNodeId,
          "name": "",
          "remark": "",
          "tip": "",
          "type": "custom",
          "subjectId": _this.defaultSubjectId
        };

        if ("custom" == postQueryConfigData.type) { //自定义查询
          var customScope = $scope.$$childHead.$$childHead ?  $scope.$$childHead.$$childHead : $scope.$$childTail.$$childTail; //获取自定义查询条件域
          postQueryConfigData.relation = customScope.globalConditions.curRelation;
          postQueryConfigData.isExcept = customScope.globalConditions.exceptFlag == "true" ? true: false;
          postQueryConfigData.configs = [];
          postQueryConfigData.conditions = [];
          if (customScope.globalConditions.queryGloballists) { //获取config
            angular.forEach(customScope.globalConditions.queryGloballists, function(val, key) {
              var curConfigData = {};
              curConfigData.id = val.cId ? val.cId: "";
              curConfigData.queryItemId = val.id ? val.id: "";
              curConfigData.type = val.type ? val.type: "";
              curConfigData.values = {};
              if (curConfigData.type == "字典多选") { //暂时获取店铺值，或其可能需要扩展
                angular.forEach(customScope.globalConditions.ShopValsViewAry,
                    function(shopV, shopK) {
                      curConfigData.values[customScope.globalConditions.ShopIdsAry[shopK]] = shopV;
                    });
              }
              postQueryConfigData.configs.push(curConfigData);
            });
          };
        };
        return postQueryConfigData;
      },
      "getCreateGroupData": function() {
        var _this = this;
        var resultObj = {
          "groupName": _this.name,
          "groupType": _this.selectedGroupType,
          'tenantId': CAMPAIGN_STATIC.tenantId
        };
        resultObj.categoryId = $('[name="categoryInput"]').attr("valueid") != "" ? ($('[name="categoryInput"]').attr("valueid")) * 1 : null;
        if (resultObj.groupType == "动态分组") {
          resultObj.result = $scope.sendQueryNodeId;
          resultObj.subjectId = _this.defaultSubjectId;
        };

        if ($scope.customerGroupStatus) { // 编辑id
          resultObj.id = _this.curDefaultGroupId;
        }
        return resultObj
      },
      "postCreateGroup": function() { //新建分组
        var groupDataValue = this.getCreateGroupData();
        var _this = this;
        //验证
        if (!groupDataValue.groupName) {
          this.errorFalg = true;
          this.errorMark = "请填写分群名称";
          return false;
        };

        //if(groupDataValue.categoryId == ""){
        //				this.errorFalg=true;
        //				this.errorMark="请选择活动所属分类";
        //				return false;
        //			};
        this.errorFalg = false;
        if (groupDataValue.groupType == "动态分组") { //动态分组
          var curPostQueryData = this.getQueryConfigData(); // 获取查询节点配置条件
          //店铺必选验证
          var shopObjFlag = function() {
            for (var n in curPostQueryData.configs[0].values) {
              return false;
            }
            return true;
          }
          if (shopObjFlag()) {
            var customScope = $scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead: $scope.$$childTail.$$childTail; //获取自定义查询条件域,切换主题时于的获取方法会改变，暂未找到原因
            customScope.globalConditions.isUnShops = true;
            customScope.globalConditions.ShopValsView = "请选择店铺";
            return false;
          };
          /*插件验证start*/
          angular.element(".queryConditionormWrap").unwrap().wrap("<form id='queryConditionorm'></form>");
          angular.element("[name='relationship']").val(curPostQueryData.relation); // unwrap莫名的bug，暂定这样解决
          angular.element("#queryConditionorm").validate({
            debug: true,
            rules: {
              categoryName: "required"
            },
            messages: {
              categoryName: "请输入属性名称"
            },
            errorPlacement: function(error, element) {
              if (element.is(":text")) {
                element.after(error);
                var top = element.position().top;
                var left = element.position().left;
                error.css({
                  "position": "absolute",
                  "left": left + 10,
                  "top": top + 28,
                  "z-index": 10
                });
                var color = element.css("borderColor");
                element.css({
                  "borderColor": "red"
                });
                error.click(function() {
                  error.remove();
                  element.css({
                    "borderColor": color
                  });
                  element.focus();
                });
                element.click(function() {
                  error.remove();
                  element.css({
                    "borderColor": color
                  });
                });
              } else if (element.is(":checkbox")) {
                //error.appendTo ( element.next() );
              } else {
                //error.appendTo( element.parent().next() );
              }
            },
            submitHandler: function() {
              //获取conditions数据
              var conditionsData = $scope.$$childHead.$$childHead ? $scope.$$childHead.$$childHead.getAllConditions() : $scope.$$childTail.$$childTail.getAllConditions();
              curPostQueryData.conditions = conditionsData.slice();
              if (curPostQueryData.conditions.length == 0) {
                _this.isnotCondition = true;
                return false;
              };

              var nodeConditionsPostFlag = true;
              angular.forEach(curPostQueryData.conditions, function(val, key) { //必填验证
                if (val.values.value == "") {
                  nodeConditionsPostFlag = false;
                  return false;
                }
              });
              if (!nodeConditionsPostFlag) {
                $(this).Alert({
                  "title": "提示",
                  "str": "请填写配置条件内容",
                  "mark": true,
                  "width": "200px",
                  "eleZindex": 1010,
                  "markZindex": 1005
                });
                return false;
              };
              getListService.postConfigConditions(function(response) {
                getListService.createCustomerGroup(function() { //节点保存后，在去触发保存新建分组
                  $scope.groupObj.conel_btn(); //	跳转到列表页
                }, groupDataValue, _this.ajaxMethodType)
              }, curPostQueryData);
            }
          });
          angular.element("#queryConditionorm").submit();
          /*插件验证end*/
        } else { //静态分组
          getListService.createCustomerGroup(function() { //节点保存后，在去触发保存新建分组
            $scope.groupObj.conel_btn(); //	跳转到列表页
          }, groupDataValue, _this.ajaxMethodType)
        }
      }
    };
    $scope.creatGroupObj.getModelNodeData();
  }
]);
