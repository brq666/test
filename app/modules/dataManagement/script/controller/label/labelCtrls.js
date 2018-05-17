// 自定义属性控制器
angular.module("dataManage.controllers").controller('productLabelCtrl', ["$scope", "$http", "$compile", "ngCustomService", "productLabelService",
  function($scope, $http, $compile, ngCustomService, productLabelService) {
    $scope.gridViewUrl = baseUrl + "label/labelList.html";
    $scope.isLabelNameError = false;
    $scope.configConditionsUrl = "";
    $scope.productLabelObj = {
      "header": "新建标签",
      "customList": "hover",
      "curLabelId": "",
      "labelStatus": false,
      "girdElement": angular.element("#attrListsGrid")[0],
      "searchButtonClick": function(hdVal) {
        var curGridElement = angular.element("#attrListsGrid")[0];
        curGridElement.p.newp = 1;
        curGridElement.grid.addParams("tagName", hdVal || "");
        curGridElement.grid.populate();
      },
      "showMylabel": function(val) {
        var curGridElement = angular.element("#attrListsGrid")[0];
        curGridElement.grid.addParams("createdFlag", !val);
        curGridElement.grid.populate();
      },
      "compileTpl": function(s) {
        $compile(angular.element(".gridCommLayout"))($scope || s);
        $scope.$apply();
      },
      "showLabelPage": function() {
        this.customList = "hover";
        this.customVal = "";
        $scope.hdValue = "";
        $scope.gridViewUrl = baseUrl + "label/labelList.html"
      },
      "hideLabelPage": function() {
        this.customList = "";
        this.customVal = "hover";
        $scope.searchAttrVal = "";
        $scope.gridViewUrl = baseUrl + "label/disponseList.html"
      },
      "settingLabel": function(id, name, mark) {
        var _this = this;
        _this.labelName = "";
        _this.remark = "";
        _this.curLabelId = "";
        _this.labelStatus = false;
        $scope.isLabelNameError = false;
        if (!id) { //增加
          _this.header = "新建标签";
        } else { //修改
          _this.labelStatus = true;
          _this.curLabelId = Number(id);
          _this.labelName = name;
          _this.remark = mark;
          _this.header = "编辑标签"
        };
        $scope.configConditionsUrl = baseUrl + "label/editorLabel.html"
      },
      "saveLabelData": function() {
        var _this = this;
        var curConfigData = {};
        curConfigData.tagDescribe = _this.remark ? _this.remark: "";
        var curName = _this.labelName ? _this.labelName: "";
        if (!curName) {
          $scope.isLabelNameError = true;
          return;
        } else {
          $scope.isLabelNameError = false;
        };
        if (_this.curLabelId == "") {
          curConfigData.tagName = curName ? curName: "";
          productLabelService.postLabelConfig(function(response) {
            $scope.configConditionsUrl = "";
            _this.showLabelPage();
            $(this).yAlert({
              "text": "新增成功"
            });
            removeAlert();
          }, curConfigData);
        } else {
          curConfigData.tagId = _this.curLabelId ? _this.curLabelId: "";
          productLabelService.updateLabelConfig(function(response) {
            $scope.configConditionsUrl = "";
            _this.showLabelPage();
            $(this).yAlert({
              "text": "修改成功"
            });
            removeAlert();
          }, curConfigData, _this.curLabelId);
        }
      },
      "cancelBtnMethod": function() {
        $scope.configConditionsUrl = "";
      }
    };
  }]);

angular.module("dataManage.controllers").controller('labelListCtrl', [function() {
  $('#attrListsGrid').flexigrid({ //属性列表grid
    url: GLOBAL_STATIC.datamanageRoot + 'producttag/page/',
    method: 'GET',
    dataType: 'json',
    colModel: [{
      display: '标签ID',
      name: 'tagId',
      width: 2,
      sortable: false,
      dataindex: 'tagId'
    },
    {
      display: '标签名称',
      name: 'tagName',
      width: 2,
      sortable: false,
      dataindex: 'tagName'
    },
    {
      display: '使用该标签商品数量',
      name: 'productCount',
      width: 2,
      sortable: false,
      dataindex: 'productCount',
      renderer: function(v) {
        return v ? v: 0;
      }
    },
    {
      display: '创建时间',
      name: 'createrAt',
      width: 2,
      sortable: false,
      align: 'center',
      dataindex: 'createrAt',
      renderer: function(v) {
        return v ? "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>": "";
      }
    },
    {
      display: '创建人',
      name: 'createrName',
      width: 2,
      sortable: false,
      dataindex: 'createrName',
      renderer: function(v) {
        return v ? v: "";
      }
    },
    {
      display: '标签说明',
      name: 'tagDescribe',
      width: 1,
      sortable: false,
      dataindex: 'tagDescribe',
      renderer: function(v) {
        return v ? v: "";
      }
    },
    {
      display: '操作',
      name: 'operation',
      width: 2,
      align: 'center',
      dataindex: 'campId',
      mapping: ['tagId', 'tagName', 'tagDescribe'],
      convert: function(v, mappVal) {
        return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="productLabelObj.settingLabel(\'' + mappVal[0] + '\',\'' + mappVal[1] + '\',\'' + mappVal[2] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" ng-data-delete-label></a>'
      }
    }],
    params: [],
    updateDefaultParam: true,
    sortname: "id",
    sortorder: "desc",
    rp: 20,
    usepager: true,
    useRp: true,
    showTableToggleBtn: true,
    colAutoWidth: true,
    onSuccess: function() {
      var scope = angular.element(angular.element(".gridCommLayout")).scope();
      scope.productLabelObj.compileTpl(scope);
    },
    onError: function(response) {
      if (response.status == 401) {
        location.pathname = "/portal/login.html";
        return;
      }
    }
  });
}]);

angular.module("dataManage.controllers").controller('labelSelectCtrl', ["$scope", "getListService", "productLabelService",
  function($scope, getListService, productLabelService) {
    var labelUseedTo = $scope.$parent.disponseLabelObj.whichAction,
        useedDefaultEditorDate; // whichAction：searchAction—商品选择，singleAction—单个标签添加， batchAddAction—批量增加标签，batchDeleteAction—批量删除标签，
    $scope.disponseLabelObj.openPlugPop(2);
    $scope.labelObj = {
      "setLabelDefaultStatus": function(selectedDate) {
        if (labelUseedTo == "searchAction") {
          angular.forEach(selectedDate, function(val, key) {
            var curLabelId = val.id;
            angular.forEach($scope.labelObj.valuesLists, function(sv, sk) {
              if (sv.tagId == curLabelId) {
                sv.hasClass = true;
                return "stop each"
              }
            })
          })
        } else {
          angular.forEach(selectedDate, function(val, key) {
            var curLabelId = val.tagId;
            angular.forEach($scope.labelObj.valuesLists, function(sv, sk) {
              if (sv.tagId == curLabelId) {
                sv.hasClass = true;
                return "stop each"
              }
            })
          })
        }
      },
      "getCurrentLabelData": function(e) {
        var dataArrary = [];
        angular.forEach($scope.labelObj.valuesLists, function(sv, sk) {
          if (sv.hasClass) {
            if (labelUseedTo == "searchAction") {
              dataArrary.push({
                "id": Number(sv.tagId),
                "value": sv.tagName
              })
            } else if (labelUseedTo == "singleAction" || labelUseedTo == "batchAddAction") {
              dataArrary.push({
                "tagId": Number(sv.tagId),
                "tagName": sv.tagName,
                "tagDescribe": sv.tagDescribe
              })
            }
          } else {
            if (labelUseedTo == "batchDeleteAction") {
              dataArrary.push({
                "tagId": Number(sv.tagId),
                "tagName": sv.tagName,
                "tagDescribe": sv.tagDescribe
              })
            }
          }
        });
        return dataArrary;
      },
      "sureClosePop": function(e) {
        var element = angular.element(e.target);
        element.closest(".ccmsPublicPop").hide();
        if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
          if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
            if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
              element.closest(".commCustomConfigBox").find(".childElementMark").remove(); //class commCustomConfigBox 自定义属性 专属class
            }
          } else {
            angular.element(".ccmsPublicPop").find(".childElementMark").remove();
          }
        } else {
          angular.element(".yunat_maskLayer:last").remove();
        }
      },
      "toggleLabelStatus": function(valuesList) {
        valuesList.hasClass = !valuesList.hasClass;
      },
      "getDefaultLabelListDatas": function(callback) {
        productLabelService.getProductLabel(function(data) {
          callback(data);
        });
      },
      "getDefaultUsedLabelListDatas": function(callback, reqdata) {
        productLabelService.getProductLabelUsed(function(data) {
          if (data && data.length == 0) {
            $(this).Alert({
              "title": "提示",
              "str": "当前选中的商品没有标签，请重新选择！",
              "mark": true,
              "width": "260px",
              "eleZindex": 1010,
              "markZindex": 1005
            }, function() {
              angular.element(".productEditorLabelPlug").hide();
              angular.element(".yunat_maskLayer:last").remove();
            });
            return false;
          }
          callback(data);
        }, reqdata);
      }
    };

    if (labelUseedTo == "searchAction") { // 商品标签搜索查询
      useedDefaultEditorDate = $scope.$parent.disponseLabelObj.queryLabelLists ? $scope.$parent.disponseLabelObj.queryLabelLists.slice() : [];

      $scope.labelObj.sureAddLabel = function(e) {
        $scope.$parent.disponseLabelObj.queryLabelLists = $scope.labelObj.getCurrentLabelData(e);
        $scope.labelObj.sureClosePop(e);
      };
    } else if (labelUseedTo == "singleAction") { // 单个商品标签添加操作
      useedDefaultEditorDate = ($scope.$parent.disponseLabelObj.curSingleProLabelLists && $scope.$parent.disponseLabelObj.curSingleProLabelLists.tags) ? $scope.$parent.disponseLabelObj.curSingleProLabelLists.tags.slice() : [];

      $scope.labelObj.sureAddLabel = function(e) {
        var labelSelectIds = [],
            labelSelectNames = [];
        var selectedData = $scope.labelObj.getCurrentLabelData(e);
        angular.forEach(selectedData, function(val, key) {
          labelSelectIds.push(val.tagId);
          labelSelectNames.push(val.tagName);
          labelSelectNames.push(val.tagDescribe);
        });
        $scope.labelObj.sureClosePop(e);
        $scope.$parent.disponseLabelObj.sureAddSingleLabelcallback(selectedData, labelSelectIds);
      };
    } else if (labelUseedTo == "batchAddAction") { // 商品标签批量增加
      useedDefaultEditorDate = $scope.$parent.disponseLabelObj.queryLabelLists ? $scope.$parent.disponseLabelObj.queryLabelLists.slice() : [];

      $scope.labelObj.sureAddLabel = function(e) {
        var selectedData = $scope.labelObj.getCurrentLabelData(e);
        if (selectedData.length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "请选择标签",
            "mark": true,
            "width": "160px",
            "eleZindex": 1010,
            "markZindex": 1005
          });
          return false;
        };
        var batchAddlabelSelectIds = [];
        angular.forEach(selectedData, function(val, key) {
          batchAddlabelSelectIds.push(val.tagId);
        });
        $(this).Confirm({
          "title": "增加提示",
          "str": "确定为商品批量增加标签？",
          "mark": true,
          "eleZindex": 1010,
          "markZindex": 1005
        }, function() {
          $scope.$apply(function() {
            $scope.$parent.disponseLabelObj.sureAddbatchLabelcallback(function() {
              $scope.labelObj.sureClosePop(e)
            }, batchAddlabelSelectIds);
          });
        });
      };
    } else if (labelUseedTo == "batchDeleteAction") { // 商品标签批量删除
      $scope.labelObj.sureAddLabel = function(e) {
        var selectedData = $scope.labelObj.getCurrentLabelData(e);
        if (selectedData.length == 0) {
          $(this).Alert({
            "title": "提示",
            "str": "请选择标签",
            "mark": true,
            "width": "160px",
            "eleZindex": 1010,
            "markZindex": 1005
          });
          return false;
        };
        var batchDeletelabelSelectIds = [];
        angular.forEach(selectedData, function(val, key) {
          batchDeletelabelSelectIds.push(val.tagId);
        });
        $(this).Confirm({
          "title": "删除提示",
          "str": "确定批量删除商品的标签？",
          "mark": true,
          "eleZindex": 1010,
          "markZindex": 1005
        }, function() {
          $scope.$apply(function() {
            $scope.$parent.disponseLabelObj.sureDeletebatchLabelcallback(function() {
                  $scope.labelObj.sureClosePop(e)
                },
                batchDeletelabelSelectIds);
          });
        });
      };
    };

    //初始化标签列表
    if (labelUseedTo != "batchDeleteAction") {
      $scope.labelObj.getDefaultLabelListDatas(function(data) {
        $scope.labelObj.valuesLists = data;
        $scope.labelObj.setLabelDefaultStatus(useedDefaultEditorDate);
      });
    } else {
      var getBatchUsedData = {
        "productIds": $scope.$parent.disponseLabelObj.isThisPage == "0" ? $scope.$parent.disponseLabelObj.getSelectedProListIds().slice() : [],
        "allSelect": $scope.$parent.disponseLabelObj.isThisPage == "0" ? false: true
      };
      $scope.labelObj.getDefaultUsedLabelListDatas(function(data) {
        $scope.labelObj.valuesLists = data;
        useedDefaultEditorDate = $scope.labelObj.valuesLists ? $scope.labelObj.valuesLists.slice() : [];
        $scope.labelObj.setLabelDefaultStatus(useedDefaultEditorDate);
      }, getBatchUsedData)
    }
  }]);

angular.module("dataManage.controllers").controller('keyWordSelectCtrl', ["$scope",
  function($scope) {
    $scope.disponseLabelObj.openPlugPop(1);
    $scope.selectFontObj = {
      "filterGX": $scope.$parent.$parent.disponseLabelObj.fontRelation || "AND",
      "filterLists": $scope.$parent.$parent.disponseLabelObj.fontLists || [],
      "filterInputVal": "",
      "addFilterList": function() {
        var _this = this,
            hasFilterKeyWorldFlag = false;
        angular.forEach(_this.filterLists, function(val, key) {
          if (_this.filterInputVal == val) {
            hasFilterKeyWorldFlag = true;
          }
        });
        if (hasFilterKeyWorldFlag) {
          $scope.filterKeyWorldErrorText = "关键字不可以重复";
        } else if (_this.filterInputVal == "") {
          $scope.filterKeyWorldErrorText = "请填写关键字";
        } else if (_this.filterInputVal.length > 30) {
          $scope.filterKeyWorldErrorText = "每个关键字最大30个字符";
        } else if (/,|，/gi.test(_this.filterInputVal)) {
          $scope.filterKeyWorldErrorText = "关键字不能包含逗号";
        };
        if (_this.filterInputVal == "" || hasFilterKeyWorldFlag || (_this.filterInputVal.length > 30 || /,|，/gi.test(_this.filterInputVal))) {
          $scope.filterKeyWorldError = true;
          angular.element(".keyWorldPop .borderHighlight").addClass("isError");
        } else {
          angular.element(".keyWorldPop .borderHighlight").removeClass("isError");
          _this.filterLists.push(_this.filterInputVal);
          $scope.filterKeyWorldError = false;
        }
        _this.filterInputVal = "";
      },
      "delFilterFont": function(i) { //del keyWorld
        this.filterLists.splice(i, 1);
      },
      "filterSure": function() {
        $scope.$parent.$parent.disponseLabelObj.fontLists = this.filterLists.slice();
        $scope.$parent.$parent.disponseLabelObj.fontRelation = this.filterGX;
      }
    }
  }
]);
