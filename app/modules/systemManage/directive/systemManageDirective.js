var systemManageDirectives = angular.module('systemManage.directives', []);
//模拟select框
systemManageDirectives.directive("ngCloneSelect", [function() {
  return function(scope, element, attrs) {
    var $a = $("<a>").css({
      "width": 15,
      "height": 19,
      "display": "inline-block",
      "position": "absolute",
      "background": "url(/ccms/images/arrows_w10.png) no-repeat 0 0"
    });
    element.after($a);
    var left = element.position().left;
    var top = element.position().top;
    var eleWidth = element.outerWidth();
    var eleHeihgt = element.outerHeight();
    var arrowsWidth = left + eleWidth - 8;
    var arrowsHeight = top + (eleHeihgt - 19) / 2;
    $a.css({
      "left": arrowsWidth,
      "top": arrowsHeight
    });
    var $div = $("<div>", {
      "class": "selectContent"
    }).css({
      "display": "none",
      "position": "absolute",
      "border": "1px solid #CCC",
      "background": "#fff",
      "overflow-x": "hidden",
      "zIndex": 2
    });
    element.after($div);
    var divWidth = element.innerWidth();
    var divLeft = left + parseInt(element.css("marginLeft"));
    var divTop = top + eleHeihgt;
    $div.css({
      "width": divWidth,
      "max-height": 200,
      "left": divLeft - 1,
      "top": divTop,
      "overflow_y": "auto",
      "cverflow_x": "hidden"
    });
    element.click(function() {
      scope.$apply(function() {
        scope.$eval(attrs.ngCloneSelect);
      });
      $div.slideToggle(200);
    });
    $a.click(function() {
      var selectButtonStatus = scope.$eval(attrs.ngDisabled);
      if (!selectButtonStatus) {
        scope.$apply(function() {
          scope.$eval(attrs.ngCloneSelect);
        });
        $div.slideToggle(200);
      }
    });
    $div.on("mouseleave", function() {
      $(this).slideUp(200);
      element.on("blur", function() {
        $div.slideUp(200);
      })
    });
    $div.on("mouseenter", function() {
      element.off('blur');
    });
    element.on("blur", function() {
      $div.slideUp(200);
    })
  }
}]);

//窗口关闭
systemManageDirectives.directive({
  "ngCloseWindow": [function() {
    return function(scope, element) {
      element.bind("click", function() {
        var pop = element.closest(".ccmsPublicPop");
        pop.addClass("ccmsPublicPopAnimated ccmsPublicPopFadeOutUp");
        pop.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
          pop.removeClass("ccmsPublicPopAnimated ccmsPublicPopFadeOutUp").hide();
        });
        $(".yunat_maskLayer").remove();
      });
    };
  }],
  "ngChoseUnit": [function() {
    return function(scope, element) {
      element.bind("click", function() {
        element.toggleClass("cur");
      });
    }
  }],
  "ngSubRadio": [function() {
    return function(scope, element, attr) {
      element.bind("click", function() {
        scope.subAccountObj.dataRight = attr.value;
        if (attr.value == 3) {
          scope.subAccountObj.disabledFalg = false;
        } else {
          scope.subAccountObj.disabledFalg = true;
          scope.subAccountObj.configDataRightIds = [];
          scope.subAccountObj.configDataRight = "";
          scope.subAccountObj.defaultCheckedName = [];
          element.closest("label").siblings("span").find("label").hide().siblings("input").removeClass("error");
        }
        scope.$apply();
      });
    }
  }],
  "ngRadioRole": [function() {
    return function(scope, element, attr) {
      element.bind("click", function() {
        scope.accountObj.dataRight = attr.value;
        if (attr.value == 3) {
          scope.accountObj.disabledFalg = false;
        } else {
          scope.accountObj.disabledFalg = true;
          scope.accountObj.configDataRightIds = [];
          scope.accountObj.configDataRight = "";
          scope.accountObj.defaultCheckedName = [];
          element.closest("label").siblings("span").find("label").hide().siblings("input").removeClass("error");
        };
        scope.$apply();
      });
    }
  }],
  "passwordStatus": [function() { //密码是否必填项判断
    return function(scope, element, attr) {
      if (scope.accountObj.passwordStatus) { //判断密码是否必填
        element.addClass("required").siblings("label").find("font").show();
      } else {
        element.removeClass("required").siblings("label").find("font").hide();
      };
    }
  }],
  "ngDeleteConfigquery": [function(queryConfigService) {
    return function(scope, element) {
      element.bind({
        "click": function() {
          var $tr = element.closest("tr");
          var rec = $tr.data('rec');
          var campId = rec.id;
          var campName = rec.tableName;
          var campStatus = rec.status;
          var isOpen = false;
          var isExecute = false;
          angular.element("#tabpenel_list li").each(function() {
            if ($.trim(angular.element(this).text()) == campName) {
              isOpen = true;
              $(this).Alert({
                "title": "删除提示",
                "str": "删除失败，请先退出该活动流程",
                "mark": true,
                "width": "220px"
              });
            }
          });
          if (campStatus == "B1" || campStatus == "B2" || campStatus == "B3") {
            isExecute = true;
            $(this).Alert({
              "title": "提示",
              "str": "当前活动状态下的活动不允许删除",
              "mark": true,
              "width": "260px"
            });
          }
          if (!isOpen && !isExecute) {
            $(this).Confirm({
              "title": "确认删除",
              "str": "条件删除后将无法恢复，确定要删除条件" + campName + "吗？",
              "mark": true
            },function() {
              queryConfigService.deleteConfig(campId, function(data) {
                $tr.detach();
                $(this).yAlert({
                  "text": "删除成功"
                });
                removeAlert();
              });
            })
          }
        }
      })
    }
  }],
  "ngSearcheffect": [function() {
    return function(scope, element, attr) {
      var blurGridElement = angular.element(".campaignListCon")[0];
      blurGridElement.p.query = "";
      element.bind({
        "click": function() {
          element.closest(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (angular.element(".commSearchVal").val() == "") {
            element.closest(".commSearch").find(".default_color").show();
          }
          blurGridElement.p.qtype = "keywords";
          blurGridElement.p.query = "";
        }
      });
      scope.$watch("hdValue", function(newVal, oldVal) {
        if (!newVal) {
          element.closest(".commSearch").find(".default_color").show();
        }
        blurGridElement.p.qtype = "keywords";
        blurGridElement.p.query = newVal || "";
      });

    };
  }],
  "searcheffect": [function() {
    return function(scope, element, attr) {
      element.bind({
        "click": function() {
          element.closest(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (angular.element(".commSearchVal").val() == "") {
            element.closest(".commSearch").find(".default_color").show();
          }
        }
      });
      scope.$watch("hdValue", function(newVal, oldVal) {
        if (!newVal) {
          element.closest(".commSearch").find(".default_color").show();
        }
      });

    };
  }],
  "hideError": [function() {
    return function(scope, element, attr) {
      element.bind("focus", function() {
        scope.categoryTypeObj.errorMark = false;
        scope.$apply();
      })
    }
  }]
});

//返回查询节点配置参数html片段
systemManageDirectives.directive("ngShowConfigParams", ['$http', 'queryConfigService', '$compile', function($http, queryConfigService, $compile) {
  return function(scope, elem, attrs) {
    scope.$watch('parame', function(newVal, oldVal) {
      scope.slice(newVal, elem)
    });
    scope.slice = function(obj, elem) {
      var frontendComponentControl = obj.frontendComponentControl;
      var html = "";
      for (var i = 0; i < frontendComponentControl.length; i++) {
        var frontendComponentType = frontendComponentControl[i].type;
        var mappingQueryType = frontendComponentControl[i].mappingtype;
        var configParamValue = obj.configParamValue;
        var id = frontendComponentControl[i].id;
        if (mappingQueryType == "input") {
          if (frontendComponentType == "input") {
            var inputValue = configParamValue + frontendComponentType + id;
            //console.log(scope.isAddConfiguration);
            //console.log(scope.modificationData[0]);
            if (scope.isAddConfiguration) { //修改
              scope[inputValue] = "";
            }
            html = $('<input class="borderHighlight" type="text"  ng-model=' + inputValue + '>');
          }
          elem.append(html);
          $compile(html)(scope);
        } else if (frontendComponentType == "field") {
          elem.append(frontendComponentControl[i].text);
        } else if (mappingQueryType == "dictionary") {
          var dictionaryTypeId = frontendComponentControl[i].dictionaryTypeId;
          queryConfigService.queryDictionary(scope.dictionary_callback, dictionaryTypeId, elem, frontendComponentType, configParamValue, id);
        } else if (mappingQueryType == "meta_dic") {
          queryConfigService.queryMetaDic(scope.meta_dic_callback, elem, frontendComponentType, configParamValue, id);
        }
      }
    }
    scope.meta_dic_callback = function(data, ele, frontendComponentType, configParamValue, id) {
      if (frontendComponentType == "select") {
        scope.option = data;
        var optionValue = configParamValue + frontendComponentType + id;
        if (scope.isAddConfiguration) { //修改
          scope[optionValue] = scope.option[0].dicName;
        }

        html = $('<select class="commSelect width130" ng-model="' + optionValue + '"><option ng-repeat="o in option">{{o.dicName}}</option></select>');
      }
      ele.append(html);
      $compile(html)(scope);
    }
    scope.dictionary_callback = function(data, ele, frontendComponentType, configParamValue, id) {
      if (frontendComponentType == "select") {
        scope.option = data;
        var optionValue = configParamValue + frontendComponentType + id;
        if (scope.isAddConfiguration) { //修改
          scope[optionValue] = scope.option[0].viewname;
        }
        html = $('<select class="commSelect width130" ng-model="' + optionValue + '"><option ng-repeat="o in option" id="{{o.typeValueId}}">{{o.viewname}}</option></select>');
      } else if (frontendComponentType == "radio") {
        scope.radio = data;
        //var radioValue=configParamValue+frontendComponentType+id;
        if (scope.isAddConfiguration) { //修改
          scope.radioValue = scope.radio[0].viewname;
        }
        html = $('<span ng-repeat="r in radio"><input type="radio" ng-model="radioValue" value="{{r.viewname}}"  id="{{r.typeValueId}}" name="radio" ng-click="radioChange(r.viewname)">{{r.viewname}}</span>');
      } else if (frontendComponentType == "checkbox") {
        scope.checkbox = data;
        html = $('<span ng-repeat="c in checkbox"><input type="checkbox" ng-model="c.checkboxValue" value="{{c.viewname}}"  id="{{c.typeValueId}}">{{c.viewname}}</span>');
      }
      ele.append(html);
      $compile(html)(scope);
    }
    scope.radioChange = function(name) {
      scope.radioValue = name;
    }
  }
}]);
//数据配置 中的表配置的grid指令
/*表配置 start*/
var grid;
systemManageDirectives.directive("commondataConfigureTable", ['$compile', 'dataTableConfigService', '$http', function($compile, dataTableConfigService, $http) {
  return function(scope, elem, attrs) {
    //删除item
    scope.deleteItem = function() {
      $(this).Confirm({
        "title": "确认删除",
        "str": "活动删除后将无法恢复，确定要删除活动" + "吗？",
        "mark": true
      },function() {
        deleteService.deleteCampaign(campId, function(data) {
          $tr.detach();
          $(this).yAlert({
            "text": "删除成功"
          });
          removeAlert();
        });
      });
    };
    //外部更新表格接口
    scope.updateGrid = function() {
      grid.grid.populate();
    };
    //编辑item
    scope.curRegisterTableId = "";
    scope.editTable = function(curId, curName) {
      if (angular.element(".editorTableDataPop").length > 1) {
        angular.element(".editorTableDataPop:last").remove();
      };
      scope.curRegisterTableId = Number(curId);
      angular.element("body").append(angular.element(".editorTableDataPop"));
      dataTableConfigService.getStateLists(curName, function(data) {
        scope.sumStateLists = data;
        scope.showFalg = true;
      });
    };
    scope.submitSetState = function() {
      var selectTableIds = [];
      angular.forEach(scope.$$childHead.sumStateLists, function(val, key) {
        if (val.defaultColumnName) {
          selectTableIds.push({
            "subjectId": val.subjectId,
            "registerTableId": scope.curRegisterTableId,
            "registerTableColumn": val.defaultColumnName
          });
        }
      });
      $http.post(GLOBAL_STATIC.systemRoot + "subject/registrytable/relationship", selectTableIds).success(function(response) {
        $(this).yAlert({
          "text": response.code
        });
        removeAlert();
        angular.element(".wrapConfigGrid div").flexReload();
        scope.showFalg = false;
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    scope.cancelSetState = function() {
      scope.showFalg = false;
    };
    //编辑end
    //flexgird初始化
    grid = elem.flexigrid({
      url: GLOBAL_STATIC.systemRoot + 'meta/database/register/tables/',
      method: 'GET',
      dataType: 'json',
      colModel: [{
        display: '表名称',
        name: 'registerTableName',
        width: 2,
        sortable: true,
        align: 'center',
        dataindex: 'registerTableName'
      },
      {
        display: '表说明',
        name: 'registerTableComment',
        width: 2.5,
        sortable: true,
        align: 'left',
        dataindex: 'registerTableComment',
        renderer: function(v) {
          return '<span style="color:#155a77;cursor:pointer">' + v + '</span>'
        }
      },
      /*{
       display: 'subject对应关系',
       name: 'subjectRelation',
       width: 3.5,
       sortable: true,
       align: 'center',
       dataindex: 'subjectRelation'
       }, {
       display: 'filter对应关系',
       name: 'filterRelation',
       width: 2,
       sortable: true,
       align: 'center',
       dataindex: 'filterRelation',
       renderer: function(v) {
       if (v == null || v == "null") {
       return "";
       } else {
       return v;
       }
       }
       },*/
      {
        display: '操作',
        name: 'operation',
        width: 2,
        align: 'center',
        dataindex: 'campId',
        mapping: ['id', 'registerTableName', 'status'],
        convert: function(v, mappVal) {
          return '<a href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ng-click="editTable(\'' + mappVal[0] + '\',\'' + mappVal[1] + '\')"></a><a href="javascript:void(0);" class="edit_delete delete_icon" title="删除" delete-table-list></a>'
        }
      }],
      updateDefaultParam: true,
      sortname: "id",
      sortorder: "desc",
      rp: 20,
      usepager: true,
      useRp: true,
      showTableToggleBtn: true,
      colAutoWidth: true,
      rowDblClick: function() {},
      onSuccess: function() {
        $compile(elem)(scope);
      },
      onError: function(response) {
        var responseText = response.responseText;
        var data = $.parseJSON(responseText);
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      }
    })[0];
    //搜索
    scope.searchButtonClick = function() {
      grid.p.newp = 1;
      grid.p.qtype = "keywords";
      grid.p.query = scope.hdValue || "";
      grid.grid.populate();
    }
  };
}]);
//搜索
systemManageDirectives.directive("tableDataSearch", [function() {
  return function(scope, element, attr) {
    element.bind({
      "click": function() {
        element.closest(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
      },
      "keyup": function() {
        scope.$apply();
      },
      "blur": function() {
        if (angular.element(".commSearchVal").val() == "") {
          element.closest(".commSearch").find(".default_color").show();
        };
      }
    });
    scope.$watch("hdValue", function(newVal, oldVal) {
      //var blurGridElement = angular.element(".wrapConfigGrid div")[0];
      if (!newVal) {
        element.closest(".commSearch").find(".default_color").show();
      }
      // grid.p.qtype = "keywords";
      // grid.p.query = newVal || "";
    });
  };
}])

//数据配置 中的表配置的新增表
systemManageDirectives.directive("commonconfigureTableDialog", ['$compile', "$http", function($compile, $http) {
  return function link(scope, elem, attrs) {
    if (angular.element(".unselectedTableMark").length > 1) {
      angular.element(".unselectedTableMark:last").remove();
    };
    angular.element('body').append(elem);
    scope.isShowAddTable = false;
    scope.$watch('isShowAddTable', function(oldVal, val) {
      if (oldVal == true) {
        //获取所有未选中的表
        scope.selectTable = "";
        scope.getAllUnselectedTable();
      }
    });
    //确定按钮隐藏
    scope.hideAddTableEl = function() {
      var selectTableResult = [];
      scope.submitStatus = true;
      angular.element(".dataConfigure_table_list input:checked").each(function() {
        selectTableResult.push({
          "registerTableName": $(this).attr("name"),
          "registerTableComment": $(this).attr("comment"),
          "schemaName": $(this).attr("scheam")
        });
      });
      $http.post(GLOBAL_STATIC.systemRoot + "meta/database/register/tables", selectTableResult).success(function(data) {
        scope.isShowAddTable = false;
        $(this).yAlert({
          "text": data.code
        });
        removeAlert();
        angular.element(".wrapConfigGrid div").flexReload();
        scope.submitStatus = false;
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
  };
}]);

//
//数据配置NEW 指令
systemManageDirectives.directive("commonconfigureNewtableDialog", ['$compile', "$http", function($compile, $http) {
  return function link(scope, elem, attrs) {
    if (angular.element(".unselectedTableMark").length > 1) {
      angular.element(".unselectedTableMark:last").remove();
    };
    angular.element('body').append(elem);
    scope.isShowMetaTable = false;
    scope.$watch('isShowMetaTable', function(oldVal, val) {
      if (oldVal == true) {
        //获取所有未选中的表
        scope.selectTable = "";
        scope.getAllUnselectedTable();
      }
    });
    //确定按钮隐藏
    scope.hideAddTableEl = function() {
      var selectTableResult = [];
      scope.submitStatus = true;
      angular.element(".dataConfigure_table_list input:checked").each(function() {
        selectTableResult.push({
          "registerTableName": $(this).attr("name"),
          "registerTableComment": $(this).attr("comment")
        });
      });
      $http.post(GLOBAL_STATIC.systemRoot + "metas/physical/register/table?dataSourceId=" + scope.dataSourceNameModel.dataSourceId, selectTableResult).success(function(data) {
        scope.isShowAddTable = false;
        $(this).yAlert({
          "text": data.code
        });
        removeAlert();
        angular.element(".wrapConfigGrid div").flexReload();
        scope.submitStatus = false;
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
  };
}]);

systemManageDirectives.directive("deleteTableList", ['dataTableConfigService', function(dataTableConfigService) {
  return function(scope, element, attr) {
    element.bind({
      "click": function() {
        var $tr = element.closest("tr");
        var rec = $tr.data('rec');
        var id = rec.id;
        var registerTableName = rec.registerTableName;
        $(this).Confirm({
          "title": "确认删除",
          "str": "数据表删除后将无法恢复，确定要删除数据表" + registerTableName + "吗？",
          "mark": true
        }, function() {
          dataTableConfigService.deleteTable(id, function(data) {
            $tr.detach();
            $(this).yAlert({
              "text": data.code
            });
            removeAlert();
          });
        })
      }
    })
  }
}])
/*表配置 end*/
/*过滤器配置 start*/
systemManageDirectives.directive({
  "deleteFilterList": ['dataFilterConfigService', function(dataFilterConfigService) {
    return function(scope, element, attr) {
      element.bind({
        "click": function() {
          var $tr = element.closest("tr");
          var rec = $tr.data('rec');
          var id = rec.id;
          var registerTableName = rec.filterName;
          $(this).Confirm({
            "title": "确认删除",
            "str": "数据表删除后将无法恢复，确定要删除数据表" + registerTableName + "吗？",
            "mark": true
          }, function() {
            dataFilterConfigService.deleteFilter(id, function(data) {
              $tr.detach();
              $(this).yAlert({
                "text": data.code
              });
              removeAlert();
            });
          })
        }
      });
    }
  }]
});
/*过滤器配置 end*/

/*
 *非公用指令
 *通用化配置--订单配置--布局配置
 *监听数据，用于显示已定位的属性配置
 */
systemManageDirectives.directive({
  "positionConfig": [function() {
    return function(scope, element, attr) {
      scope.$watch("orderPositionValue", function(val, oldval) {
        if (!scope.orderPositionValue) {
          return false
        } else {
          var parame = attr.positionConfig;
          var position = parame.split(",")[0];
          var index = parame.split(",")[1];
          var arr = scope.orderPositionValue[position];
          var flog = false;
          var obj = {};
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].position == index) {
              flog = true;
              obj = arr[i];
            }
          }
          if (flog) {
            var tpl = $("<label>" + obj.name + "</label>");
            $(element).append(tpl);
            $(element).siblings(".placeholder").hide();
            $(element).siblings(".add").hide();
          } else {
            ///$(element).siblings(".placeholder").show();
          }
        }
      },true);
    }
  }]
});

systemManageDirectives.directive({
  "customTemplateInit": ['$compile', '$q', '$templateCache', '$parse', 'smsAttributeConfigService', function($compile, $q, $templateCache, $parse, smsAttributeConfigService) {
    return {
      controller: function($http, $scope, $sce) {
        // 安全插入html
        $scope.deliberatelyTrustDangerousSnippet = function(snippet) {
            return $sce.trustAsHtml(snippet);
        };
        angular.forEach(customTemplates, function(val, key) { //缓存模板
          $templateCache.put(val.type, val.template);
        });
        var storeCustomIndicatorScope = [];
        var _this = this;

        _this.createIndicatorScope = function(data) { //创建指标新scope，储存数据
          var newCustomScope = $scope.$new();
          newCustomScope.data = data;
          storeCustomIndicatorScope.push(newCustomScope);
          return newCustomScope;
        };
        /*添加指标 start*/
        var labelCount = 0;
        _this.addLabelCondition = function(data, curId, configListData) { // 类型数据、默认类型项ID、已配置的数据
          labelCount++;
          var curLabelScopeData = data.slice(); //数组形式
          var curLabelTemplate = $compile($($templateCache.get("commLabelTemplate")));
          var labelCurScope = _this.createIndicatorScope(curLabelScopeData);
          labelCurScope.index = labelCount;

          curLabelTemplate(labelCurScope, function(labelElement) {
            angular.element(".indicatorListBox").append(labelElement);
          });
        };
        //删查指标
        _this.removeIndicatorScope = function(index) {
          labelCount--;
          for (var i = index; i < storeCustomIndicatorScope.length; i++) {
            storeCustomIndicatorScope[i].index = storeCustomIndicatorScope[i].index - 1;
          }
          var scope = storeCustomIndicatorScope.splice((index - 1), 1)[0];
          scope.$destroy();
        };
      },
      link: function(scope, element, attr, ctrl) {
        var defaultIndicatorLists = '',
          defaultIndicatorId = ''; //储存指标list和默认指标id
        /*打开请求数据并填充start*/
        if (!scope.editorCustomFalg) { //新建自定义条件
          ctrl.addLabelCondition(scope.attributeCommit, 1);
        } else { //编辑自定义条件
          smsAttributeConfigService.getSubjectById(function(response) {
            /*初始化指标end*/
          },1);
        }
        /*打开请求数据并填充end*/
        /*添加指标*/
        scope.addIndicator = function() {
          ctrl.addLabelCondition(defaultIndicatorLists, defaultIndicatorId);
        };
        /*删除指标*/
        scope.linkRemoveIndicatorScope = function(i) {
          ctrl.removeIndicatorScope(i);
        }

        scope.getAllCustomDatas = function() {
          return ctrl.getAllCustomDatas();
        }
      }
    }
  }]
})

systemManageDirectives.directive({
  "customIndicatorType": ['$compile', '$q', '$templateCache', '$parse', 'smsAttributeConfigService', function($compile, $q, $templateCache, $parse, smsAttributeConfigService) {
    return {
      controller: function($http, $scope) {
        if (!$scope.curDefaultData) { // 增加&& 初始化
        } else { // 编辑填充
        }
      },
      "link": function(scope, element, attr, ctrl) {
        var inited = false; //给定参数，防止切换operator刷新
        //监听指标类型
        scope.$watch('curLabeloperator', function(newVal, oldVal) {

        });

        /*指标时间类型 end*/
        /*删除指标*/
        scope.removeIndicator = function(i) {
          element.remove();
          scope.linkRemoveIndicatorScope(i);
        };
      }
    }
  }]
})

systemManageDirectives.directive('mCheckbox', ['inputDirective', function(inputDirective) {
  inputDirective = inputDirective[0];

  var FULL_CHECK_CSS = 'btn-full-check',
      PART_CHECK_CSS = 'btn-part-check';
  var KEY_CODE_SPACE = 32;

  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    require: '?ngModel',
    template: '<div class="btn-checkbox">' + '<div class="btn-icon"></div>' + '</div>',
    compile: compile
  };

  function compile(tElement, tAttrs) {
    tAttrs.type = 'checkbox';
    tAttrs.tabIndex = 0;
    tElement.attr('role', tAttrs.type);

    return function postLink(scope, element, attr, ngModelCtrl) {
      var checked = false;

      ngModelCtrl = ngModelCtrl || {
        $setViewValue: function(value) {
          this.$viewValue = value;
        },
        $parsers: [],
        $formatters: []
      };

      inputDirective.link(scope, {
        on: angular.noop,
        0 : {}
      }, attr, ngModelCtrl);

      element.on('click', listener);
      element.on('keypress', keypressHandler);
      ngModelCtrl.$render = render;

      function keypressHandler(ev) {
        if (ev.which === KEY_CODE_SPACE) {
          ev.preventDefault();
          listener(ev);
        }
      }

      function listener(ev) {
        if (element[0].hasAttribute('disabled')) return;

        scope.$apply(function() {
          checked = !checked;
          ngModelCtrl.$setViewValue(checked, ev && ev.type);
          ngModelCtrl.$render();
        });
      }

      function render() {
        checked = ngModelCtrl.$viewValue;
        element.removeClass(PART_CHECK_CSS);
        if (checked) {
          element.addClass(FULL_CHECK_CSS);
        } else {
          element.removeClass(FULL_CHECK_CSS);
        }
      }
    }
  }
}]);

systemManageDirectives.directive('roleztreemenu', [function() {
  return {
    template: '<div class="market_tree_menu grey_border" id="tree_menu">\
                   <div  id="tree_node_add" class="market_tree_menu_item" ng-click="addNode()">增加{{menuType}}</div>\
                   <div  id="tree_node_remove" class="market_tree_menu_item" ng-click="removeNode()">删除{{menuType}}</div>\
                   <div  id="tree_node_rename" class="market_tree_menu_item" ng-click="renameNode()">重命名</div> </div>',
    link: linkFn,
    replace: true
  };

  function linkFn(scope, elem, attrs) {
    //将菜单存入scope,好在ztree的directive里可以调用
    scope.menu = new Menu();

    function Menu() {
      var el = elem;
      //增删改button
      var addBtn = el.find('#tree_node_add');
      var removeBtn = el.find('#tree_node_remove');
      var renameBtn = el.find('#tree_node_rename');
      this.show = function(type, x, y, e, node) {
        el.show();
        addBtn.show();
        removeBtn.show();
        renameBtn.show();
        //非节点
        if (type == "root") {
          removeBtn.hide();
          renameBtn.hide();
          //节点
        } else if (type.typeId && type.typeId == 2) { //分组查询右键配置
          if (type.pId == null) {
            addBtn.hide();
          } else {
            el.hide();
          }
        } else {
          removeBtn.show();
          renameBtn.show();
        }

        if (node && node !== null) {
          if (node.hasOwnProperty('deleteable') && node.deleteable === false) {
            removeBtn.hide();
          }
          if (node.hasOwnProperty('renameable') && node.renameable === false) {
            renameBtn.hide();
          }
        }
        var ztreeMenuScrollTop = el.siblings(".market_tree_wrapper").scrollTop() || 0,
            ztreeMenuScrollLeft = el.siblings(".market_tree_wrapper").scrollLeft() || 0,
            maxMenuHeight = e.clientY + 80;

        el.css({
          "top": maxMenuHeight > $(window).height() ? (y - ztreeMenuScrollTop - 60) + "px": (y - ztreeMenuScrollTop) + "px",
          "left": (x - ztreeMenuScrollLeft) + "px",
          "dispaly": "block"
        });

        $("body").bind("mousedown", onBodyMouseDown);
      };

      this.hide = function() {
        //return;
        el.hide();
        $("body").unbind("mousedown", onBodyMouseDown);
      };

      function onBodyMouseDown(event) {
        if (! (event.target.id == "tree_menu" || $(event.target).parents("#tree_menu").length > 0) || event.target.className == "") {
          //el.css({"visibility" : "hidden"});
          el.hide();
        }
      }
    }
  }
}]);

systemManageDirectives.directive('departmentZtreeMenu', [function() {
  return {
    template: '<div class="market_tree_menu grey_border" id="tree_menu">\
                   <div  id="tree_node_add" class="market_tree_menu_item" ng-click="addNode()">增加{{menuType}}</div>\
                   <div  id="tree_node_remove" class="market_tree_menu_item" ng-click="removeNode()">删除{{menuType}}</div>\
                   <div  id="tree_node_rename" class="market_tree_menu_item" ng-click="renameNode()">重命名</div> </div>',
    link: linkFn,
    replace: true
  };

  function linkFn(scope, elem, attrs) {
    //将菜单存入scope,好在ztree的directive里可以调用
    scope.menu = new Menu();

    function Menu() {
      var el = elem;
      //增删改button
      var addBtn = el.find('#tree_node_add');
      var removeBtn = el.find('#tree_node_remove');
      var renameBtn = el.find('#tree_node_rename');
      this.show = function(type, x, y, e, node) {
        el.show();
        addBtn.show();
        removeBtn.show();
        renameBtn.show();
        //非节点
        if (type == "root") {
          removeBtn.hide();
          renameBtn.hide();
          //节点
        } else if (type.typeId && type.typeId == 2) { //分组查询右键配置
          if (type.pId == null) {
            addBtn.hide();
          } else {
            el.hide();
          }
        } else {
          removeBtn.show();
          renameBtn.show();
        }

        /*
         if(node && node !==null){
         if(node.name.search(/^旺旺子账号/) != -1) {
         renameBtn.hide();
         }
         }*/
        if (node && node !== null) {
          if (node.hasOwnProperty('deletable') && node.deletable === false) {
            removeBtn.hide();
          }
          if (node.hasOwnProperty('renameable') && node.renameable === false) {
            renameBtn.hide();
          }
        }
        var ztreeMenuScrollTop = el.siblings(".market_tree_wrapper").scrollTop() || 0,
          ztreeMenuScrollLeft = el.siblings(".market_tree_wrapper").scrollLeft() || 0,
          maxMenuHeight = e.clientY + 80;

        el.css({
          "top": maxMenuHeight > $(window).height() ? (y - ztreeMenuScrollTop - 60) + "px": (y - ztreeMenuScrollTop) + "px",
          "left": (x - ztreeMenuScrollLeft) + "px",
          "dispaly": "block"
        });

        $("body").bind("mousedown", onBodyMouseDown);
      };

      this.hide = function() {
        //return;
        el.hide();
        $("body").unbind("mousedown", onBodyMouseDown);
      };

      function onBodyMouseDown(event) {
        if (! (event.target.id == "tree_menu" || $(event.target).parents("#tree_menu").length > 0) || event.target.className == "") {
          //el.css({"visibility" : "hidden"});
          el.hide();
        }
      }
    }
  }
}]);
