angular.module('ccmsApp').controller('AttrConfigCtrl', ['$scope', '$http', 'queryConfigService',
  function($scope, $http, queryConfigService) {
    $scope.configuration.showPopWindow(); //弹框调用
    $scope.configCenter = {
      "closeConfigurationPop": function() {
        angular.element(".ccmsPublicPop").hide();
        angular.element(".yunat_maskLayer").remove();
      },
      "change_type": function(typeName, typeList) {
        for (var i = 0; i < typeList.length; i++) {
          if (typeList[i].queryTypeName == typeName) {
            $scope.currentQueryType = typeList[i];
            $scope.configParams.init($scope.currentQueryType);
            $scope.configData.init($scope.currentQueryType);
          }
        }
        return $scope.currentQueryType;
      },
      "querytype_calback": function(data) {
        // console.log(data);
        $scope.configCenter.querytype_list = data;
        if (!$scope.isAddConfiguration) { //修改
          $scope.configCenter.currentType = $scope.modificationData[0].queryTypeName;
          currentQueryType = $scope.configCenter.change_type($scope.configCenter.currentType, data);
          $scope.categoryName = $scope.modificationData[0].attributeName;
          //参数配置数据处理,ng-model的值为  类型名称 + 控件类型 + 控件id（如字符输入下的长度限制框的值 LengthLimitinput1   LengthLimit + input + id）
          var attributeQueryConfigMeta = currentQueryType.attributeQueryConfigMeta;
          for (var i = 0; i < attributeQueryConfigMeta.length; i++) {
            var frontendComponentControl = attributeQueryConfigMeta[i].frontendComponentControl;
            for (var j = 0; j < frontendComponentControl.length; j++) {
              var type = frontendComponentControl[j].type;
              var mappingtype = frontendComponentControl[j].mappingtype;
              var id = frontendComponentControl[j].id;
              //edit by yinwei 以后台 query_type_condition_config表的config_param_value作为唯一标识
              var operatorId = attributeQueryConfigMeta[i].configParamValue;
              console.log("operatorId:" + operatorId);
              var modelValue = attributeQueryConfigMeta[i].configParamValue + type + id;
              for (var m = 0; m < $scope.modificationData[0].config.length; m++) {
                var config = $scope.modificationData[0].config[m];
                if ($scope.modificationData[0].config[m].operatorId == operatorId) {
                  for (var n = 0; n < config.operatorValue.length; n++) {
                    if (config.operatorValue[n].id == id) {
                      $scope[modelValue] = config.operatorValue[n].value[0];
                    }
                  }
                }
              }
              if (type == "radio") {
                $scope.radioValue = $scope[modelValue];
              }
              if (mappingtype == "meta_dic") { //字典型特殊处理
                var metaValue = modelValue;
                var saveVal = $scope[modelValue];
                $http({
                  "method": "GET",
                  url: rootStatic + "meta/dic/?_=" + new Date().getTime()
                }).success(function(response) {
                  for (var i = 0; i < response.length; i++) {
                    if (response[i].dicKey == saveVal) {
                      $scope[metaValue] = response[i].dicName;
                    }
                  }
                }).error(function(data, status, headers, config) {
                  $(this).Alert({
                    "title": httpTitle || "提示",
                    "str": data.message,
                    "mark": true
                  });
                });
              }
            }
          }
        } else {
          $scope.currentQueryType = data[0];
          $scope.configCenter.currentType = $scope.currentQueryType.queryTypeName;
          $scope.configParams.init($scope.currentQueryType);
          $scope.configData.init($scope.currentQueryType);
        }

      },
      "querytype": function() {
        queryConfigService.queryType(this.querytype_calback);
      },
      "modificationCategory_callback": function(data) {
        $scope.configCenter.querytype();
        $scope.modificationData = data;
      },
      "init": function() {
        if (!$scope.isAddConfiguration) { //修改活动
          queryConfigService.modificationCategory(this.modificationCategory_callback, $scope.queryIteamId);
        } else {
          this.querytype();
        }
      },
      "saveConfigData": function() { //保存数据
        //$("#configContent").submit();
        var parame = {}
        if (!$scope.isAddConfiguration) { //修改活动
          parame.categoryId = $scope.categoryId;
        } else {
          parame.categoryId = $scope.tree.getSelectedNodes()[0].id;
        }

        parame.subjectId = 1;
        parame.attributeName = $scope.categoryName;
        parame.attributeType = "normal";
        parame.tableName = $scope.configData.tableName;
        parame.columnName = $scope.configData.columnName;
        parame.columnType = "varchar";
        parame.config = [];
        var currentParame = $scope.configParams.currentParame;
        parame.queryTypeId = $scope.currentQueryType.id;
        for (var i = 0; i < currentParame.length; i++) {
          var o = {};
          //edit by yinwei 以后台 query_type_condition_config表的config_param_value作为唯一标识
          o.operatorId = currentParame[i].configParamValue;
          console.log("operatorId2:" + o.operatorId);
          o.operatorValue = [];
          for (var j = 0; j < currentParame[i].frontendComponentControl.length; j++) {
            var p = {};
            var frontendComponentControl = currentParame[i].frontendComponentControl[j];
            var configParamValue = currentParame[i].configParamValue;
            p.id = frontendComponentControl.id;
            p.value = [];
            var mappingtype = frontendComponentControl.mappingtype;
            //o.operatorId=frontendComponentControl.dictionaryTypeId;
            var scope = angular.element($('.slice').eq(i)).scope();
            if (frontendComponentControl.type == "input") {
              var val = scope[configParamValue + frontendComponentControl.type + p.id];
              p.value.push(val);
            } else if (frontendComponentControl.type == "radio") {
              var radioData = scope.radio;
              p.value.push(scope.radioValue);
            } else if (frontendComponentControl.type == "select") {
              var selectData = scope.option;
              if (mappingtype == "meta_dic") {
                for (var m = 0; m < selectData.length; m++) {
                  if (selectData[m].dicName == scope[configParamValue + frontendComponentControl.type + p.id]) {
                    p.value.push(selectData[m].dicKey);
                  }
                }
              } else {
                p.value.push(scope[configParamValue + frontendComponentControl.type + p.id]);
              }
            } else if (frontendComponentControl.type == "checkbox") {
              var selectData = scope.checkbox;
              for (var m = 0; m < selectData.length; m++) {
                if (selectData[m].checkboxValue) {
                  p.value.push(selectData[m].viewname);
                }
              }
            }
            if (frontendComponentControl.type != "field") {
              o.operatorValue.push(p)
            }

          }
          parame.config.push(o);

        }
        this.closeConfigurationPop();
        $http({
          "method": "POST",
          "url": rootStatic + "queryitem",
          "data": JSON.stringify(parame)
        }).success(function(response) {
          //callback(response);
          $scope.searchObj.updateFromTreeClick($scope.configuration.curClassificationId); //刷新列表
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      }
    };
    $scope.configCenter.init();
    //参数配置
    $scope.configParams = {
      "currentParame": [],
      "init": function(data) {
        $scope.configParams.currentParame = data.attributeQueryConfigMeta;
      }
    }
    //数据配置
    $scope.configData = {
      "getTables_calback": function(data) {
        var _this = $scope.configData;
        _this.tables = data;
        if (!$scope.isAddConfiguration) { //修改活动
          _this.tableName = $scope.modificationData[0].tableName
          for (var i = 0; i < data.length; i++) {
            if (_this.tableName == data[i].registerTableName) {
              _this.schemaName = data[i].schemaName;
            }
          }
        } else {
          _this.tableName = data[0].registerTableName;
          _this.schemaName = data[0].schemaName;
        }
        _this.getTableColumn(_this.tableName, _this.schemaName);
      },
      "getTableColumn_calback": function(data) {
        var _this = $scope.configData;
        _this.tableColumns = data;
        if (!$scope.isAddConfiguration) { //修改活动
          _this.columnName = $scope.modificationData[0].columnName;
        } else {
          _this.columnName = data[0].columnName;
        }
      },
      "changeTable": function(tableName) {
        var _this = $scope.configData;
        var data = _this.tables;
        for (var i = 0; i < data.length; i++) {
          if (tableName == data[i].registerTableName) {
            $scope.configData.schemaName = data[i].schemaName;
          }
        }
        _this.getTableColumn(tableName, $scope.configData.schemaName);
      },
      "getTableColumn": function(tableName, schemaName) {
        queryConfigService.getTableColumn($scope.configData.getTableColumn_calback, tableName, schemaName);
      },
      "init": function() {
        queryConfigService.getTables($scope.configData.getTables_calback);
      }
    }
    //验证
    $scope.validation = function() {
      $("#configContent").validate({
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
              "left": left + 15,
              "top": top + 4
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
          }

          else if (element.is(":checkbox")) {
            //error.appendTo ( element.next() );
          } else {
            //error.appendTo( element.parent().next() );
          }
        }
      });

    }
    $scope.validation();
  }
]);