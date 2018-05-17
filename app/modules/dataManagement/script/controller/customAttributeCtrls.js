/**
 * Created by dupenghui on 2014/8/11.
 */

angular.module("dataManage.controllers").filter('tagType', function () {
  return function (input) {
    var viewValue = ""
    switch (input) {
      case 0:
        viewValue = "字符选择";
        break;
      case 1:
        viewValue = "字符输入";
        break;
      case 2:
        viewValue = "数字选择";
        break;
      case 3:
        viewValue = "数字输入";
        break;
      case 4:
        viewValue = "日期选择";
        break;
    }
    return viewValue;
  }
});
angular.module("dataManage.controllers").filter('optionalVal', function () {
  return function (input, charSels, numSels) {
    if (input === 0) { //字符选择
      var storeAryString = [];
      for (var i = 0; i < charSels.length; i++) {
        storeAryString.push(charSels[i].charValue);
      }
      return storeAryString.join(",");
    } else if (input === 2) { //数字选择
      var storeAryNum = [];
      for (var j = 0; j < numSels.length; j++) {
        storeAryNum.push(numSels[j].numValue);
      }
      return storeAryNum.join(",");
    } else {
      return ""
    }
  }
});
angular.module("dataManage.controllers").filter('wordConstraints', function () {
  return function (input, maxlength) {
    if (input.length > maxlength) {
      return input.slice(0, maxlength) + "...";
    }
    return input;
  }
});
angular.module("dataManage.controllers").filter('setISO', function () {
  return function (input) {
    return setISO(input, "all");
  }
});
angular.module("dataManage.controllers").controller('CustomAttribute', ["$scope", "$http", "$compile", "$resource", "$timeout", "$ccGrid", "$q", "$ccModal", "$ccTips", "ngCustomService",
  function ($scope, $http, $compile, $resource, $timeout, $ccGrid, $q, $ccModal, $ccTips, ngCustomService) {

    $scope.customObj = {
      "attrEntity": null, // 当前标签对象
      "catalogId": "", // 当前标签目录id
      "gridViewUrl": baseUrl + "customAttributeList.html",
      "hdValue": "", // 标签名称关键字查询
      "searchAttrVal": "", // 客户标签数据关键字查询
      "labelVal": "", // 标签值
      "labelValList": [], // 标签值列表
      "operationMenu": [
        {label: "新建目录", type: "addNode", show: "canUse"},
        {label: "重命名", type: "updateNode", show: "canEdit"},
        {label: "删除", type: "removeNode", show: "canEdit"}
      ]
    };

    $scope.setCustomObj = {
      "curAttrId": "",
      "selectValuesList": [], //可选值集合
      "storeTypeList": [], // 标签类型下拉框
      "customAttrName": "", //标签名称
      "attrStatus": "true", // 状态
      "attrConfigMark": "", // 备注
      "curStoreType": "", // 标签类型
      "catalogId": "" // 标签目录id
    };

    $scope.hintAttr = {
      "loadAttributes": false, // 标签目录 可选值 组件重置
      "notice": "",
      "errorFont": "",
      "errorStatus": true,
      "customAttrNameRequiredError": "请填写客户标签名称",
      "customAttrNameFalg": false, // customAttrNameRequiredError
      "selectValuesFlag": false, // 请编辑可选值
      "curStoreTypeFlag": false, // 请选择标签类型
      "curCatalogIdFlag": false, // 请选择标签目录
      "isEditorFlag": false, // 标签类型disable
      "customAttributeValueShow": false, // 客户标签数据呈现
      "valueStatus": true // 可选值disable
    };

    $scope.customFunc = {
      "checkValue": function(curEditorValue, selectValuesList) {
        $scope.hintAttr.errorStatus = true;
        $scope.hintAttr.selectValuesFlag = false;
        $scope.hintAttr.errorFont = "";
        angular.forEach(selectValuesList, function(val, key) {
            if (val === curEditorValue) {
              $scope.hintAttr.errorStatus = false;
              $scope.hintAttr.errorFont = "不可重名";
            }
            if ((curEditorValue && $scope.setCustomObj.curStoreType === 2 && (val * 1 == curEditorValue))) {
              $scope.hintAttr.errorStatus = false;
              $scope.hintAttr.errorFont = "不可重复";
            }
          });
        // if (curEditorValue === "") {
        //   $scope.hintAttr.errorStatus = false;
        //   $scope.hintAttr.errorFont = "请输入正确的值，不能包含空格";
        // }
        if (curEditorValue && $scope.setCustomObj.curStoreType == 2) {
          var validateReg = /^\d{0,7}(\.\d{1,2})?$/;
          var reg = /^\./;
          if (!(validateReg.test(curEditorValue))) {
            $scope.hintAttr.errorStatus = false;
            $scope.hintAttr.errorFont = "每项输入范围为0-9999999.99";
          }
          if(reg.test(curEditorValue) ){
            $scope.hintAttr.errorStatus = false;
            $scope.hintAttr.errorFont = "每项输入范围为0-9999999.99";
          }
        } else if (curEditorValue && $scope.setCustomObj.curStoreType == 0) {
          if (curEditorValue.length > 20) {
            $scope.hintAttr.errorStatus = false;
            $scope.hintAttr.errorFont = "每项最多输入20个字符";
            // /\s/g.test(curEditorValue)
          }
        };
        return $scope.hintAttr.errorStatus;
        // if (errorStatus) {
        //   $scope.setCustomObj.selectValuesList.push(curEditorValue);
        // }
      },
      "selectChange": function() {
        if ($scope.customObj.labelVal) {
          $scope.customFunc.configAttrRefresh(1);
        }
      },
      "searchButtonClick": function (event, othFlag) {
        if (event === '' || (event && event.keyCode === 13)) {
          if (othFlag) {
            $scope.customFunc.configAttrRefresh(1);
          } else {
            $scope.customFunc.attrListRefresh(1);
          };
        }
      },
      "showCustomAttrPage": function (event, entity) {
        event.stopPropagation();
        $scope.customObj.labelVal = "";
        ngCustomService.getPropertiesValueById(function(response) {
          $scope.customObj.labelValList = response;
        }, entity.propertyId);
        $scope.customObj.searchAttrVal = "";
        $scope.customObj.attrEntity = entity;
        $scope.hintAttr.customAttributeValueShow = true;
        $scope.customFunc.configAttrRefresh(1, 20);
      },
      "hideCustomAttrPage": function (event) {
        event.stopPropagation();
        $scope.hintAttr.customAttributeValueShow = false;
      },
      "settingAttr": function(param) {
        $scope.hintAttr.selectValuesFlag = false;
        $scope.hintAttr.customAttrNameFalg = false;
        $scope.hintAttr.curStoreTypeFlag = false;
        $scope.hintAttr.curCatalogIdFlag = false;
        $scope.hintAttr.errorStatus = true;
        if (!param) {
          $scope.hintAttr.isEditorFlag = false;
          $scope.hintAttr.newCustomAttributeFlag = true;
          ngCustomService.getQueryTypes(function (response) { //获取存储类型lists
            $scope.setCustomObj.storeTypeList = response;
          });
          $scope.hintAttr.valueStatus = true;
          $scope.setCustomObj.customAttrName = "";
          $scope.setCustomObj.attrStatus = "true";
          $scope.setCustomObj.attrConfigMark = "";
          $scope.setCustomObj.curStoreType = "";
          $scope.setCustomObj.selectValuesList = [];
          $scope.setCustomObj.catalogId = -1;
          $scope.setCustomObj.curAttrId = "";
          $scope.hintAttr.loadAttributes = true;
          $(".settingAttributes").addInteractivePop({
            magTitle: "新建客户标签",
            width: 630,
            mark: true,
            position: "fixed",
            closeFn: function() {
              $scope.hintAttr.loadAttributes = false;
            }
          });
        } else {
          $scope.hintAttr.isEditorFlag = true;
          ngCustomService.getQueryTypes(function (data) { //获取存储类型lists
            $scope.setCustomObj.storeTypeList = data;
            $scope.setCustomObj.curAttrId = Number(param);
            ngCustomService.editorAttrConfig(Number(param), function (response) { //获取存储类型lists
              $scope.setCustomObj.customAttrName = response.name ? response.name : "";
              $scope.setCustomObj.attrStatus = response.status ? "true" : "false";
              $scope.setCustomObj.attrConfigMark = response.remark ? response.remark : "";
              $scope.setCustomObj.catalogId = response.catalogId;
              angular.forEach(data, function (val, key) {
                if (val.value === response.type) {
                  $scope.setCustomObj.curStoreType = val.value;
                };
              });
              var getDefaultSelectValue = [];
              if (response.type === 0) {
                $scope.hintAttr.valueStatus = false;
                if (response.charSels) {
                  angular.forEach(response.charSels, function (val, key) {
                    getDefaultSelectValue.push(val.charValue);
                  });
                }
                // _this.selectValues = getDefaultSelectValue.join(",");
                $scope.setCustomObj.selectValuesList = getDefaultSelectValue.slice();
              } else if (response.type === 2) {
                $scope.hintAttr.valueStatus = false;
                if (response.numSels) {
                  angular.forEach(response.numSels, function (val, key) {
                    getDefaultSelectValue.push(val.numValue);
                  });
                }
                // _this.selectValues = getDefaultSelectValue.join(",");
                $scope.setCustomObj.selectValuesList = getDefaultSelectValue.slice();
              } else {
                $scope.hintAttr.valueStatus = true;
                // _this.selectValues = "";
                $scope.setCustomObj.selectValuesList = [];
              }
              $scope.hintAttr.loadAttributes = true;
              $(".settingAttributes").addInteractivePop({
                magTitle: "修改客户标签",
                width: 630,
                mark: true,
                position: "fixed",
                closeFn: function() {
                  $scope.hintAttr.loadAttributes = false;
                }
              });
            });
          });
        }
      },
      "changeStoreType": function (param, old) {
        $scope.setCustomObj.selectValuesList = [];
        $(".search__field")[0].value = "";
        $scope.hintAttr.errorStatus = true;
        $scope.hintAttr.selectValuesFlag = false;
        if (!$scope.hintAttr.isEditorFlag) {
          if (param === 0 || param === 2) {
            $scope.hintAttr.notice = param === 0 ? "每项最多输入20个字符" : "每项输入范围为0-9999999.99";
            $scope.hintAttr.valueStatus = false;
          } else {
            $scope.hintAttr.valueStatus = true;
          }
        }
      },
      "saveAttrData": function () {
        var _this = $scope.setCustomObj;
        var curConfigData = {};
        curConfigData.name = _this.customAttrName;
        curConfigData.type = _this.curStoreType;
        curConfigData.status = _this.attrStatus === "true" ? true : false;
        curConfigData.remark = _this.attrConfigMark;
        curConfigData.catalogId = _this.catalogId;
        curConfigData.charSels = [];
        curConfigData.numSels = [];
        if (!curConfigData.name || (/\s+/g.test(curConfigData.name))) {
          $scope.hintAttr.customAttrNameFalg = true;
          return;
        } else {
          $scope.hintAttr.customAttrNameFalg = false;
        };
        if (curConfigData.type === "" || curConfigData.type === null) {
          $scope.hintAttr.curStoreTypeFlag = true;
          return;
        } else {
          $scope.hintAttr.curStoreTypeFlag = false;
        };
        if (curConfigData.catalogId === "") {
          $scope.hintAttr.curCatalogIdFlag = true;
          return;
        } else {
          $scope.hintAttr.curCatalogIdFlag = false;
        };
        if ((curConfigData.type === 0 || curConfigData.type === 2) && $scope.setCustomObj.selectValuesList.length === 0) {
          $scope.hintAttr.selectValuesFlag = true;
          return;
        } else {
          $scope.hintAttr.selectValuesFlag = false;
        }
        switch (curConfigData.type) { //属性存储方法
          case 0:
            curConfigData.charSels = $scope.setCustomObj.selectValuesList.slice();
            break;
          case 2:
            curConfigData.numSels = $scope.setCustomObj.selectValuesList.slice();
            break;
          case 4:
            viewValue = "时间查询";
            break;
        }
        $scope.hintAttr.submitDisF = true;
        if ($scope.setCustomObj.curAttrId === "") {
          ngCustomService.postAttrConfig(function (response) {
            $scope.hintAttr.submitDisF = false;
            angular.element(".settingAttributes").hide();
            angular.element(".yunat_maskLayer").remove();
            $scope.customFunc.attrListRefresh(1);
            $(this).yAlert({
              "text": "新增成功"
            });
            removeAlert();
            $scope.hintAttr.loadAttributes = false;
          }, curConfigData, function (response) {
            $scope.hintAttr.submitDisF = false;
          });
        } else {
          ngCustomService.updateAttrConfig(function (response) {
            $scope.hintAttr.submitDisF = false;
            angular.element(".settingAttributes").hide();
            angular.element(".yunat_maskLayer").remove();
            $scope.customFunc.attrListRefresh();
            $(this).yAlert({
              "text": "修改成功"
            });
            removeAlert();
            $scope.hintAttr.loadAttributes = false;
          }, curConfigData, $scope.setCustomObj.curAttrId, function (response) {
            $scope.hintAttr.submitDisF = false;
          });
        }
      },
      "changeNewFlag": function () { // 改变实时验证的flag
        $scope.hintAttr.newCustomAttributeFlag = false;
      },
      "attrListRefresh": function(pageNum) {
        var param = {
          catalogId: $scope.customObj.catalogId,
          newp: 1,
          qtype: "keywords",
          query: $scope.customObj.hdValue || ""
        };
        pageNum && (param.pageNum = pageNum);
        angular.extend($scope.attrListsGridOpts.queryParams, param);
        $scope.attrListsGridOpts.resource = $resource(GLOBAL_STATIC.datamanageRoot + 'customproperty/list/?_=' + new Date().getTime());
        $ccGrid.refresh($scope.attrListsGridOpts, param);
      },
      "configAttrRefresh": function(pageNum, pageSize) {
        var param = {
          name: $scope.customObj.attrEntity.type,
          propertyId: $scope.customObj.attrEntity.propertyId,
          value: $scope.customObj.labelVal,
          newp: 1,
          qtype: "keywords",
          query: $scope.customObj.searchAttrVal || ""
        };
        pageNum && (param.pageNum = pageNum);
        pageSize && (param.pageSize = pageSize);
        angular.extend($scope.configAttrGridOpts.queryParams, param);
        $scope.configAttrGridOpts.resource = $resource(GLOBAL_STATIC.datamanageRoot + 'customproperty/properties/?_=' + new Date().getTime());
        $ccGrid.refresh($scope.configAttrGridOpts, param);
      },
      "treeNodeOperation": function(treeId, treeNode, type, name) {
        if (type === "removeNode") {
          var modalInstance = $ccModal.confirm('确认删除当前目录及其子目录？', function() {
            console.log('close');
          });
          return modalInstance.open().result.then(function() {
            return ngCustomService.deleteCatalog(function(data) {
              $ccTips.success("删除成功");
              return {dynamicRefresh: false};
            }, treeNode.id);
          }, function() {
            return false;
          });
        } else if (type === "addNode") {
          return ngCustomService.postCatalog(function(data) {
            return {dynamicRefresh: false, id: data.data.id};
          }, {name: name, parentId: treeNode.id});
        } else if (type === "updateNode") {
          return ngCustomService.updateCatalog(function(data) {
            return {dynamicRefresh: false};
          }, {id: treeNode.id, name: name});
        } else if (type === "click") {
          $scope.customObj.catalogId = treeNode.id;
          return $scope.customFunc.attrListRefresh(1);
        } else {
          return false;
        }
      },
      "loadTreeData": function(index) {
        return ngCustomService.getCatalogTree(function(data) {
          return data.data.list.slice(index || 0);
        });
      }
    };

    $scope.attrListsGridOpts = {
      queryParams: {
        newp: 1,
        query: "",
        qtype: "",
        pageNum: 1,
        pageSize: 20,
        sortname: "",
        sortorder: ""
      },
      columnsDef: [{
        cellTemplate: '<span><a class="tag-name" title="{{entity.name}}" ng-click="customFunc.showCustomAttrPage($event, entity)">{{entity.name | wordConstraints:10}}</a><i class="iconfont icon-beizhu camp-remark" tooltip-placement="bottom-left" tooltip-append-to-body="true" cc-tooltip="entity.remark" ng-if="entity.remark"></i></span>',
        displayName: '标签名称',
        width: '180px'
      }, {
        field: 'type',
        displayName: '标签类型',
        cellTemplate: '<span ng-bind="entity.type | tagType"></span>'
      }, {
        field: 'gender',
        displayName: '可选值',
        cellTemplate: '<span class="ellipsis" ng-bind="entity.type | optionalVal:entity.charSels:entity.numSels | wordConstraints:10" title="{{entity.type | optionalVal:entity.charSels:entity.numSels}}"></span>'
      }, {
        field: 'created',
        displayName: '创建时间',
        cellTemplate: "<span class='ac_status_grid ac_status_{{entity.created}}'>{{entity.created | setISO}}</span>",
        width: '140px'
      }, {
        field: 'creator',
        displayName: '创建人',
        width: '80px'
      }, {
        field: 'status',
        displayName: '状态',
        align: 'center',
        cellTemplate: '<a href="javascript:void(0)" class="{{entity.status && \'avaliableTrue\' || \'avaliableFalse\'}}" title="{{entity.status && \'点击禁用\' || \'点击启用\'}}" ng-data-change-status="customFunc.attrListRefresh"></a>',
        width: '80px'
      }, {
        field: 'operation',
        displayName: '操作',
        cellTemplate: '<a class="operation-btn" href="javascript:void(0);" ng-click="customFunc.settingAttr(entity.propertyId)">编辑</a>\
                       <a class="operation-btn" href="javascript:void(0);" ng-data-delete-attr="customFunc.attrListRefresh">删除</a>'
      }],
      transformer: {
        list: 'data',
        pageNum: 'page',
        totals: 'total'
      },
      emptyTipTpl: '<div class="init-msg"><span class="msg">没有搜索结果,请重新输入关键字或者查看全部</span></div>'
    };

    $scope.configAttrGridOpts = {
      queryParams: {
        newp: 1,
        query: "",
        qtype: "",
        pageNum: 1,
        pageSize: 20,
        sortname: "",
        sortorder: ""
      },
      columnsDef: [
        {
          field: 'subject_id',
          displayName: '主题',
          align: 'center'
        }, {
          field: 'uni_id',
          displayName: '客户ID',
          align: 'center'
        }, {
          field: 'pro',
          displayName: '标签值',
          align: 'center'
        }
      ],
      transformer: {
        list: 'data',
        pageNum: 'page',
        totals: 'total'
      },
      emptyTipTpl: '<div class="init-msg"><span class="msg">暂无数据</span></div>'
    };

    $scope.$watch("setCustomObj.customAttrName", function (newVal, oldVal) {
      if (newVal == undefined) {
        return;
      }
      if (oldVal != undefined && oldVal != newVal && !newVal && !$scope.hintAttr.newCustomAttributeFlag) {
        $scope.hintAttr.customAttrNameFalg = true;
        $scope.hintAttr.customAttrNameRequiredError = "请填写客户标签名称";
      } else if (/\s+/g.test($scope.setCustomObj.customAttrName)) {
        $scope.hintAttr.customAttrNameFalg = true;
        $scope.hintAttr.customAttrNameRequiredError = "客户标签名称不能包含空格";
      } else {
        $scope.hintAttr.customAttrNameFalg = false;
      }
    });

    $scope.customFunc.attrListRefresh();

  }
])