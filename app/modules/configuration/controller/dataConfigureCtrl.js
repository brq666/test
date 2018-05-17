//通用化配置的表配置，定义subject， 定义filter控制器
var app = angular.module('ccmsApp');
//表配置
app.controller("dataConfigureTable", ["$scope", "$http",
  function($scope, $http) {

    //获取未选中的表
    $scope.getAllUnselectedTable = function() {
      $scope.unselectedTables = [];
      $http.get(rootStatic + 'meta/database/tables/?_=' + new Date().getTime()).then(function(res) {
        $scope.defaultDatas = res.data;
        $scope.unselectedTables = res.data;
        $scope.selectAll = false;
      },
      function() {
        $(this).Alert({
          "title": res.code || "提示",
          "str": res.description || "错误",
          "mark": true
        });
      });
    };
    $scope.submitSelectTable = function() {
      $scope.hideAddTableEl();
    };
    $scope.cancelSelectTable = function() {
      $scope.isShowAddTable = false;
    };
    //监听搜索
    $scope.$watch("selectTable",
        function(newVal) {
          $scope.unselectedTables = $scope.unselectedTables || [];
          var searchResultAry = [];
          if (newVal == "") {
            $scope.unselectedTables = $scope.defaultDatas ? $scope.defaultDatas.slice() : [];
            return
          }
          angular.forEach($scope.unselectedTables, function(val, key) {
            var flagIndex = (val.tableName).indexOf(newVal);
            if (flagIndex != -1) {
              searchResultAry.push(val);
            };
          });
          $scope.unselectedTables = searchResultAry.slice();
        });
  }]);

//定义subject
app.controller("dataConfigureSubject", ["$scope", "$http", "dataFilterConfigService",
  function($scope, $http, dataFilterConfigService) {
    //添加主题
    $scope.addSubject = function() {
      //如果值为空
      if (!$scope.subjectName) {
        $scope.isInputEmpty = true;
        return;
      }
      $http.post(rootStatic + "subject", {
        subjectName: $scope.subjectName
      }).success(serverSucc).error(serverErr);

      function serverSucc(res) {
        //清空input
        $scope.isExisted = false;
        $scope.subjectName = "";
        $scope.getAllSubjects();
        $(this).Alert({
          "title": res.code || "提示",
          "str": res.description || "成功",
          "mark": true
        });
      }
    };

    function serverErr(res) {
      $scope.isExisted = true;
      $(this).Alert({
        "title": res.message || "提示",
        "str": res.description || "错误",
        "mark": true
      });
    }
    //获取所有主题
    $scope.getAllSubjects = function() {
      dataFilterConfigService.getSubjects(function(data) {
        $scope.subjects = data || [];
      });
    };
    $scope.getAllSubjects();
    //删除主题
    $scope.deleteItem = function(data) {
      $(this).Confirm({
        "title": "确认",
        "str": "确定要删除主题\"" + data.subjectName + "\"吗？",
        "mark": true
      },
      function() {
        $http({
          method: 'DELETE',
          url: rootStatic + "subject/" + data.subjectId
        }).success(serverDeleteSucc).error(serverErr);
      });

      function serverDeleteSucc(response) {
        $scope.itemName = "";
        $(this).yAlert({
          "text": response.code
        });
        removeAlert();
        $scope.getAllSubjects();
      }
    }
  }]);

//定义filter控制器
app.controller("dataConfigureFilter", ["$scope", "$http", "$compile", "dataFilterConfigService",
  function($scope, $http, $compile, dataFilterConfigService) {
    $scope.customSelect = {
      "common": function(data, ele) { //模拟普通的select框
        var $selContent = ele.siblings(".selectContent:first");
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
            } else if (eleName == "filterType") {
              $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].id + '>' + data[i].filterTypeName + '</a></li>');
              $ul.find("a").css({
                "padding": "3px 10px",
                "color": "#3D3D3D",
                "display": "block"
              })
            } else if (eleName == "dicType") {
              $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].dicId + '>' + data[i].dicName + '</a></li>');
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
      }
    };
    $scope.filterConfigObj = {
      "relevance": "true",
      "guanlianThemeLists": [],
      "recompile": function(b) {
        $compile(angular.element(".wrapConfigGrid"))($scope || b);
        $scope.$apply();
      },
      "addFilter": function() {
        angular.element(".editorTableDataPop,.unselectedTableMark").remove();
        if (angular.element(".editorFilterPop").length > 1) {
          angular.element(".editorFilterPop:last").remove();
        };
        var _this = this;
        angular.element("body").append(angular.element(".editorFilterPop"));
        $scope.addFilterPopFlag = true;
        /*初始化为空*/
        _this.filterName = "";
        $("[name='filterType']").attr("valueid", "").val("");
        $("[name='dicType']").attr("valueid", "").val("");
        _this.relevance = "true";
        _this.guanlianThemeLists = [];
        /*end*/
        dataFilterConfigService.getSubjects(function(data) {
          dataFilterConfigService.getRegisterTable(function(response) {
            angular.forEach(data, function(val, key) {
              _this.guanlianThemeLists.push({
                "subjectId": val.subjectId,
                "subjectName": val.subjectName,
                "registerTables": response.data ? response.data: [],
                "tableValue": "",
                "registerThemes": []
              });
            });
          });
        });
      },
      "getMetaFilterType": function() {
        dataFilterConfigService.getMetaFilterTypeData(function(response) {
          $scope.customSelect.common(response, $('[name="filterType"]'));
        });
      },
      "getMetaDic": function() {
        dataFilterConfigService.getMetaDirData(function(response) {
          $scope.customSelect.common(response, $('[name="dicType"]'));
        });
      },
      "changeGuanlianDatas": function(index, curTableName) {
        var _this = this;
        if (curTableName) {
          dataFilterConfigService.getColumnsData(function(response) {
            _this.guanlianThemeLists[index].registerThemes = response;
          }, curTableName.registerTableName);
        } else {
          _this.guanlianThemeLists[index].registerThemes = [];
        };
      },
      "getConfigFilterData": function() {
        var _this = this;
        var submitDataObj = {};
        submitDataObj.filterName = _this.filterName;
        submitDataObj.filterTypeId = Number($("[name='filterType']").attr("valueid") ? $("[name='filterType']").attr("valueid") : "");
        submitDataObj.dicId = Number($("[name='dicType']").attr("valueid") ? $("[name='dicType']").attr("valueid") : "");
        submitDataObj.associatePurview = _this.relevance;
        submitDataObj.subjectMapping = [];
        if ($scope.filterConfigObj && $scope.filterConfigObj.guanlianThemeLists) {
          angular.forEach($scope.filterConfigObj.guanlianThemeLists, function(val, key) {
            if (val.tableValue) { //不填不传数据
              var subjectObjData = {
                "subjectId": val.subjectId,
                "mappingTable": val.tableValue ? val.tableValue.registerTableName: "",
                "mappingSubjectColumn": val.themeValue ? val.themeValue.columnName: "",
                "mappingFilterColumn": val.filterValue ? val.filterValue.columnName: ""
              }
              submitDataObj.subjectMapping.push(subjectObjData);
            }
          });
        }
        return submitDataObj;
      },
      "submitAddFilter": function() {
        dataFilterConfigService.postFilterConfigLists($scope.filterConfigObj.getConfigFilterData(), function(response) {
          $(this).yAlert({
            "text": response.code
          });
          removeAlert();
          angular.element(".wrapConfigGrid div").flexReload();
          $scope.addFilterPopFlag = false;
        });
      },
      "cancelAddFilter": function() {
        $scope.addFilterPopFlag = false;
      }
    }
  }
]);