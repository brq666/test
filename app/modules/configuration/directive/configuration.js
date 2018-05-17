var directives = angular.module('directives', []);
//模拟select框
directives.directive("ngCloneSelect",
    function() {
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
          scope.$apply(function() {
            scope.$eval(attrs.ngCloneSelect);
          });
          $div.slideToggle(200);
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
    });

//窗口关闭
directives.directive({
  "ngCloseWindow": function() {
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
  },
  "ngChoseUnit": function() {
    return function(scope, element) {
      element.bind("click", function() {
        element.toggleClass("cur");
      });
    }
  },
  "ngRadioRole": function() {
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
  },
  "passwordStatus": function() { //密码是否必填项判断
    return function(scope, element, attr) {
      if (scope.accountObj.passwordStatus) { //判断密码是否必填
        element.addClass("required").siblings("label").find("font").show();
      } else {
        element.removeClass("required").siblings("label").find("font").hide();
      };
    }
  },
  "ngDeleteConfigquery": function(queryConfigService) {
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
            },
            function() {
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
  },
  "ngSearcheffect": function() {
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
  },
  "searcheffect": function() {
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
  },
  "hideError": function() {
    return function(scope, element, attr) {
      element.bind("focus", function() {
        scope.categoryTypeObj.errorMark = false;
        scope.$apply();
      })
    }
  }
});

//返回查询节点配置参数html片段
directives.directive("ngShowConfigParams", ['$http', 'queryConfigService', '$compile',
  function($http, queryConfigService, $compile) {
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
directives.directive("commondataConfigureTable", ['$compile', 'dataTableConfigService', '$http',
  function($compile, dataTableConfigService, $http) {
    return function(scope, elem, attrs) {
      //删除item
      scope.deleteItem = function() {
        $(this).Confirm({
          "title": "确认删除",
          "str": "活动删除后将无法恢复，确定要删除活动" + "吗？",
          "mark": true
        },
        function() {
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
        $http.post(rootStatic + "subject/registrytable/relationship", selectTableIds).success(function(response) {
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
        url: rootStatic + 'meta/database/register/tables/',
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
          if (response.status == 401) {
            location.pathname = root + 'login.html';
            return;
          }
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
directives.directive("tableDataSearch", [function() {
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
directives.directive("commonconfigureTableDialog", ['$compile', "$http",
  function($compile, $http) {
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
        $http.post(rootStatic + "meta/database/register/tables", selectTableResult).success(function(data) {
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
directives.directive("commonconfigureNewtableDialog", ['$compile', "$http",
  function($compile, $http) {
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
        $http.post(rootStatic + "metas/physical/register/table?dataSourceId=" + scope.dataSourceNameModel.dataSourceId, selectTableResult).success(function(data) {
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

directives.directive("deleteTableList", ['dataTableConfigService',
  function(dataTableConfigService) {
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
directives.directive({
  "deleteFilterList": ['dataFilterConfigService',
    function(dataFilterConfigService) {
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
directives.directive({
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

      }, true);
    }
  }]
});

directives.directive({
  "customTemplateInit": ['$compile', '$q', '$templateCache', '$parse', 'smsAttributeConfigService',
    function($compile, $q, $templateCache, $parse, smsAttributeConfigService) {
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
            }, 1);
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

directives.directive({
  "customIndicatorType": ['$compile', '$q', '$templateCache', '$parse', 'smsAttributeConfigService',
    function($compile, $q, $templateCache, $parse, smsAttributeConfigService) {
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
