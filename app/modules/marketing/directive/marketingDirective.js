var campaginDirectives = angular.module('campaign.directives', []);
//我们需要编写一个directive 来让 DOM 的改变即时更新到 Model 里
function putObject(path, object, value) {
  var modelPath = path.split(".");

  function fill(object, elements, depth, value) {
    var hasNext = ((depth + 1) < elements.length);
    if (depth < elements.length && hasNext) {
      if (!object.hasOwnProperty(modelPath[depth])) {
        object[modelPath[depth]] = {};
      }
      fill(object[modelPath[depth]], elements, ++depth, value);
    } else {
      object[modelPath[depth]] = value;
    }
  }

  fill(object, modelPath, 0, value);
}
// 禁用button按键
campaginDirectives.directive("ngButtonDisable",
  function() {
    return function(scope, element, attr) {
      element.bind({
        "click": function() {
          element.attr('disabled', true);
        }
      });
    };
  }
);

campaginDirectives.directive('ngpopreport',
  function() {
    return {
      template: ['<div style="display:inline-block">', '<label class="reportButton">', '<em class="reportIcon"></em>{{title}}', '</label>', '<div class="data-view" style="display:none">', '<div class="commWrapThree">', '<div class="clearfix mb10"></div>', '<div class="data-list" style="display:none;height:300px"></div>', '</div>', '</div>', '</div>'].join(''),
      scope: {
        ngpopreport: '='
      },
      replace: true,
      link: function(scope, element, attrs) {
        var report = scope.ngpopreport;
        scope.title = report.title;
        element.find('label').on('click', function(e) {
          $('.data-view').addInteractivePop({
            magTitle: report.title,
            width: 1000,
            mark: false,
            position: "fixed",
            childElePop: true
          });

          $('.data-list').flexigrid({
            url: report.url,
            method: 'GET',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            colModel: report.colModel,
            updateDefaultParam: true,
            sortname: "",
            sortorder: "desc",
            buttons: [],
            usepager: true,
            useRp: true,
            rp: 20,
            showTableToggleBtn: true,
            colAutoWidth: true,
            onSuccess: function() {
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
          });
        });
      }
    };
  }
);

//活动搜索效果
campaginDirectives.directive("ngSearcheffect",
  function() {
    return function(scope, element, attr) {
      var blurGridElement = angular.element(".campaignListCon")[0] || null;
      if (blurGridElement) {
        if (blurGridElement.p) {
          blurGridElement.p.query = "";
        }
      }
      element.bind({
        "click": function() {
          element.closest(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (element.parent().find(".commSearchVal").val() == "") {
            element.closest(".commSearch").find(".default_color").show();
          }
          if (blurGridElement) {
            if (blurGridElement.p) {
              blurGridElement.p.qtype = "keywords";
            }
          }
        }
      });
      scope.$watch("hdValue", function(newVal, oldVal) {
        if (!newVal) {
          element.closest(".commSearch").find(".default_color").show();
        } else {
          element.closest(".commSearch").find(".default_color").hide();
        }
        if (blurGridElement) {
          if (blurGridElement.p) {
            blurGridElement.p.qtype = "keywords";
            blurGridElement.p.query = newVal || "";
          }
        }
      });
    };
  }
);

//共用数据表搜索
campaginDirectives.directive("ngCommdtableSearch",
  function() {
    return function(scope, element, attr) {
      element.bind({
        "click": function() {
          element.closest(".commPenEditor").find(".default_color").hide().end().find(".tableSearch ").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (element.parent().find(".tableSearch").val() == "") {
            element.closest(".commPenEditor").find(".default_color").show();
          }
        }
      });
    };
  }
);
//搜索效果
campaginDirectives.directive("ngGoodsSearcheffect",
  function() {
    return function(scope, element, attr) {
      element.siblings(".default_color").bind("click", function() {
        $(this).hide();
        $(this).siblings(".commSearchVal").focus();
      });
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
          //var blurGridElement=angular.element(".ump_flexgrid")[0];
          //blurGridElement.p.query = "";
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = "";
        }
      });
      scope.$watch("hdValue", function(newVal, oldVal) {
        if (!newVal) {
          element.closest(".commSearch").find(".default_color").show();
        }
        //var blurGridElement=angular.element(".ump_flexgrid")[0];
        //blurGridElement.p.qtype = "keywords";
        //blurGridElement.p.query = newVal || "";
      });
    };
  }
);
//活动列表删除
campaginDirectives.directive("ngDeleteCampaign", ['deleteService',
  function(deleteService) {
    return function(scope, element) {
      element.bind({
        "click": function() {
          var $tr = element.closest("tr");
          var rec = $tr.data('rec');
          var campId = rec.campId;
          var campName = rec.campName;
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
                "str": "活动删除后将无法恢复，确定要删除活动" + campName + "吗？",
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
              })
          }
        }
      })
    }
  }
]);

//新建活动模板选择效果
campaginDirectives.directive("ngCheckradio",
  function() {
    return function(scope, element) {
      var thisVal, sibElement = element.parent(".radioLabel").siblings(".moduleCreateBox").find(".moduleInput");
      element.bind("click", function() {
        thisVal = element.val();
        if (thisVal == 0) {
          sibElement.prop("disabled", true);
          sibElement.removeClass("required error");
        } else {
          sibElement.prop("disabled", false);
          sibElement.addClass("required");
        }
      });
    }
  }
);
//只有时、分控件
campaginDirectives.directive('timepickeronly',
  function() {
    return function(scope, element, attrs) {
      var minDate = new Date();
      minDate.setHours(minDate.getHours());
      minDate.setMinutes(minDate.getMinutes());
      minDate.setSeconds(0);
      element.datetimepicker({
        timeOnly: true,
        inline: true,
        timeFormat: 'HH:mm',
        showSecond: false,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        minDate: minDate,
        onSelect: function(dateText) {
          var modelPath = $(this).attr('ng-model');
          putObject(modelPath, scope, dateText);
          scope.$apply();
        }
      });
    }
  }
);

//对日期的指令的分装
campaginDirectives.directive('datepicker',
  function() {
    return function(scope, element, attrs) {
      var minDate = new Date();
      minDate.setHours(minDate.getHours());
      minDate.setMinutes(minDate.getMinutes());
      minDate.setSeconds(0);
      element.datetimepicker({
        inline: true,
        timeFormat: 'HH:mm',
        showSecond: false,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        //日期简写名称
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //月份简写名称
        //stepHour: 2,//设置步长
        //stepMinute: 10,
        //stepSecond: 10,
        // minDate: new Date(),
        minDate: minDate,
        onSelect: function(dateText) {
          var modelPath = $(this).attr('ng-model');
          putObject(modelPath, scope, dateText);
          scope.$apply();
        }
      });
    }
  }
);

//日期指令，只显示年月日,查询节点相对，绝对日期使用
campaginDirectives.directive('datePicker', ['$parse', function($parse) {
  return function(scope, elem, attrs) {
    elem.datepicker({
      showSecond: false,
      changeMonth: true,
      changeYear: true,
      yearRange: "-114:+10",
      onSelect: function(dateText) {
        $parse(attrs.ngModel).assign(scope, dateText);
        if (scope.isMid) { //条件是介于的时候，开始日期小于结束日期 设置
          if (attrs.ngModel == "dateInput1") {
            elem.siblings("span").find("input").datepicker("option", "minDate", dateText);
          } else {
            elem.closest("span").siblings("input").datepicker("option", "maxDate", dateText);
          }
        }
        if (dateText) {
          $(elem[0]).removeAttr("style");
          elem.removeClass("error");
          elem.next("label").remove();
        }
      },
      beforeShow: function() {
        if (scope.isMid) { //条件是介于的时候，开始日期小于结束日期 设置
          if (attrs.ngModel == "dateInput1") {
            elem.datepicker("option", "maxDate", elem.siblings("span").find("input").scope().dateInput2);
            //elem.siblings("span").find("input").datepicker("option","minDate",scope.dateInput1);
          } else {
            elem.datepicker("option", "minDate", elem.closest("span").siblings("input").scope().dateInput1);
            //elem.closest("span").siblings("input").datepicker("option","maxDate",scope.dateInput2);
          }
        }
        if (scope.isMid2) {
          if (attrs.ngModel == "model.dateInput1") {
            elem.datepicker("option", "minDate", scope.starDate);
            if (scope.model.dateInput2) {
              elem.datepicker("option", "maxDate", scope.model.dateInput2);
            } else {
              elem.datepicker("option", "maxDate", scope.endDate);
            }

          } else {
            elem.datepicker("option", "maxDate", scope.endDate);
            if (scope.model.dateInput1) {
              elem.datepicker("option", "minDate", scope.model.dateInput1);
            } else {
              elem.datepicker("option", "minDate", scope.starDate);
            }
          }

        }
      }
    });
  }
}]);

//日期指令，只显示年月日时分秒,查询节点相对，绝对时间使用
campaginDirectives.directive('dateTimePicker', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datetimepicker({
        inline: true,
        timeFormat: 'HH:mm:ss',
        showSecond: true,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        yearRange: "-114:+10",
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        //日期简写名称
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //月份简写名称
        onSelect: function(dateText) {
          $parse(attrs.ngModel).assign(scope, dateText);
          if (scope.isMid) { //条件是介于的时候，开始日期时间小于结束日期设置
            var curDateTime = new Date(dateText.replace(/-/g, "/"));
            if (attrs.ngModel == "dateInput1") {
              element.siblings("span").find("input").datetimepicker("option", "minDate", new Date());
              element.siblings("span").find("input").datetimepicker("option", "minDateTime", new Date());
              /*日期能定位，但是时间未定位， 年后再来弄 传new Date()有效果*/
            } else {
              return;
              element.closest("span").siblings("input").datetimepicker("option", "maxDate", dateText);
              element.closest("span").siblings("input").datetimepicker("option", "maxDateTime", new Date(dateText.replace(/-/g, "/")));
            }
          }
          element.css('border-color', '#d9d9d9').siblings('label').hide();
        },
        beforeShow: function() {
          if (scope.isMid || scope.isTimeMid) { //条件是介于的时候，开始日期时间小于结束日期设置
            if (attrs.ngModel == "dateInput1") {
              //查询节点时间指令和自行以行为指令共用判断
              var maxDateDateInput = (element.siblings("span").find("input").length > 0) ? (element.siblings("span").find("input").scope().dateInput2) : (element.closest(".commPenEditor").siblings(".markSpan").find("input").scope().dateInput2);
              element.datetimepicker("option", "maxDate", maxDateDateInput);
              element.datetimepicker("option", "maxDateTime", new Date(maxDateDateInput.replace(/-/g, "/")));
            } else {
              var minDateDateInput1 = (element.closest("span").siblings("input").length > 0) ? (element.closest("span").siblings("input").scope().dateInput1) : (element.closest(".markSpan").siblings(".commPenEditor").find("input").scope().dateInput1);
              element.datetimepicker("option", "minDate", minDateDateInput1);
              element.datetimepicker("option", "minDateTime", new Date(minDateDateInput1.replace(/-/g, "/")));
            }
          }
        }
      });
    }
  }
]);
//日期指令，不显示年月日时分秒,查询节点相对，绝对时间使用

campaginDirectives.directive('cmDateTimePicker', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datetimepicker({
        inline: true,
        showSecond: false,
        showMinute: false,
        showHour: false,
        showTime: false,
        showTimepicker: false,
        alwaysSetTime: false,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        yearRange: "-114:+10",
        dateFormat: "yy-mm-dd",
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        //日期简写名称
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //月份简写名称
        onSelect: function(dateText) {
          console.log(dateText);
          element.value = dateText;
          $parse(attrs.ngModel).assign(scope, dateText);
          scope.$apply();
          if (scope.isMid) { //条件是介于的时候，开始日期时间小于结束日期设置
            var curDateTime = new Date(dateText.replace(/-/g, "/"));
            if (attrs.ngModel == "dateInput1") {
              element.siblings("span").find("input").datetimepicker("option", "minDate", new Date().toLocaleDateString());
              element.siblings("span").find("input").datetimepicker("option", "minDateTime", new Date());
              /*日期能定位，但是时间未定位， 年后再来弄 传new Date()有效果*/
            } else {
              return;
              element.closest("span").siblings("input").datetimepicker("option", "maxDate", dateText);
              element.closest("span").siblings("input").datetimepicker("option", "maxDateTime", new Date(dateText.replace(/-/g, "/")));
            }
          }
        },
        beforeShow: function() {
          if (scope.isMid || scope.isTimeMid) { //条件是介于的时候，开始日期时间小于结束日期设置
            if (attrs.ngModel == "dateInput1") {
              //查询节点时间指令和自行以行为指令共用判断
              var maxDateDateInput = (element.siblings("span").find("input").length > 0) ?
                (element.siblings("span").find("input").scope().dateInput2) :
                (element.closest(".commPenEditor").siblings(".markSpan").find("input").scope().dateInput2);
              element.datetimepicker("option", "maxDate", maxDateDateInput);
              element.datetimepicker("option", "maxDateTime", new Date(maxDateDateInput.replace(/-/g, "/")));
              console.log('maxDateDateInput', maxDateDateInput);
            } else {
              var minDateDateInput1 = (element.closest("span").siblings("input").length > 0) ?
                (element.closest("span").siblings("input").scope().dateInput1) :
                (element.closest(".markSpan").siblings(".commPenEditor").find("input").scope().dateInput1);
              element.datetimepicker("option", "minDate", minDateDateInput1);
              element.datetimepicker("option", "minDateTime", new Date(minDateDateInput1.replace(/-/g, "/")));
              console.log('minDateDateInput1', minDateDateInput1);

            }
          }
        }
      });
    }
  }
]);

//日期指令，只显示年月日,查询节点相对，绝对日期使用
campaginDirectives.directive('dateAbsolutePicker', ['$parse',
  function($parse) {
    return function(scope, elem, attrs) {
      elem.datepicker({
        showSecond: false,
        changeMonth: true,
        changeYear: true,
        yearRange: "-114:+10",
        onSelect: function(dateText) {
          $parse(attrs.ngModel).assign(scope, dateText);
          if (scope.isMid) { //条件是介于的时候，开始日期小于结束日期 设置
            if (attrs.ngModel == "dateInput1") {
              elem.siblings("span").find("input").datepicker("option", "minDate", dateText);
            } else {
              elem.closest("span").siblings("input").datepicker("option", "maxDate", dateText);
            }
          }
          elem.css('border-color', '#d9d9d9').siblings('label').hide();
        },
        beforeShow: function() {
          if (scope.isMid) { //条件是介于的时候，开始日期小于结束日期 设置
            if (attrs.ngModel == "dateInput1") {
              elem.datepicker("option", "maxDate", elem.siblings("span").find("input").scope().dateInput2);
              //elem.siblings("span").find("input").datepicker("option","minDate",scope.dateInput1);
            } else {
              elem.datepicker("option", "minDate", elem.closest("span").siblings("input").scope().dateInput1);
              //elem.closest("span").siblings("input").datepicker("option","maxDate",scope.dateInput2);
            }
          }
          if (scope.isMid2) {
            if (attrs.ngModel == "model.dateInput1") {
              elem.datepicker("option", "minDate", scope.starDate);
              if (scope.model.dateInput2) {
                elem.datepicker("option", "maxDate", scope.model.dateInput2);
              } else {
                elem.datepicker("option", "maxDate", scope.endDate);
              }

            } else {
              elem.datepicker("option", "maxDate", scope.endDate);
              if (scope.model.dateInput1) {
                elem.datepicker("option", "minDate", scope.model.dateInput1);
              } else {
                elem.datepicker("option", "minDate", scope.starDate);
              }
            }
          }
        }
      });
    }
  }]);

//生日选择指令，只显示月日，查询节点生日选择类型中运用
campaginDirectives.directive('datePickerBirthday', ['$parse',
  function($parse) {
    return function(scope, elem, attrs) {
      elem.datepicker({
        showSecond: false,
        changeMonth: true,
        changeYear: false,
        showYear: false,
        showHeaderButton: false,
        dateFormat: "mm-dd",
        defaultDate: new Date(2000, 0, 1),
        // 设置二月份为29天
        yearRange: "-114:+10",
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        onSelect: function(dateText) {
          $parse(attrs.ngModel).assign(scope, dateText);
          if (scope.isMid) { //条件是介于的时候，开始日期小于结束日期 设置
            if (attrs.ngModel == "dateInput1") {
              elem.siblings("span").find("input").datepicker("option", "minDate", dateText);
            } else {
              elem.closest("span").siblings("input").datepicker("option", "maxDate", dateText);
            }
          }
          elem.css('border-color', '#d9d9d9').siblings('label').hide();
        },
        beforeShow: function() {
          if (scope.isMid) { //条件是介于的时候，开始日期小于结束日期 设置
            if (attrs.ngModel == "dateInput1") {
              elem.datepicker("option", "maxDate", elem.siblings("span").find("input").scope().dateInput2);
              //elem.siblings("span").find("input").datepicker("option","minDate",scope.dateInput1);
            } else {
              elem.datepicker("option", "minDate", elem.closest("span").siblings("input").scope().dateInput1);
              //elem.closest("span").siblings("input").datepicker("option","maxDate",scope.dateInput2);
            }
          }
        }
      });
    }
  }
]);

/*
 *公用指令
 *适用范围：选择到秒，开始时间必须小于结束时间
 */

campaginDirectives.directive('picker5', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datetimepicker({
        inline: true,
        timeFormat: 'HH:mm:ss',
        showSecond: true,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        //minDate:new Date(),
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        //日期简写名称
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //月份简写名称
        beforeShow: function(dateText) {
          if (element.attr("name") == "startTime1") {
            var defaultEndTime = $("[name='endTime1']").val() || "";
            var minTime = $(this).attr("startTime1");
            $(this).datepicker("option", "minDate", minTime);
            $(this).datepicker("option", "minDateTime", new Date(minTime.replace(/-/g, "/")));
            $(this).datepicker("option", "maxDate", defaultEndTime);
            $(this).datepicker("option", "maxDateTime", new Date(defaultEndTime.replace(/-/g, "/")));
            //$("[name='endTime']").datepicker( "option", "minDate", new Date(minTime.replace(/-/g,"/")));
            //$("[name='endTime']").val(defaultEndTime);
          } else if (element.attr("name") == "endTime1") {
            var defaultStartTime = $("[name='startTime1']").val() || "";
            var maxTime = $(this).attr("endTime1");
            $(this).datepicker("option", "maxDate", maxTime);
            $(this).datepicker("option", "maxDateTime", new Date(maxTime.replace(/-/g, "/")));
            $(this).datepicker("option", "minDate", defaultStartTime);
            $(this).datepicker("option", "minDateTime", new Date(defaultStartTime.replace(/-/g, "/")));
            //$("[name='startTime']").datepicker( "option", "maxDate", new Date(maxTime.replace(/-/g,"/")));
            //$("[name='startTime']").val(defaultStartTime);
          } else {
            console.log("未获取到正确对象");
          }
          //$parse(attrs.ngModel).assign(scope, dateText);
        },
        onSelect: function(dateText) {
          if (element.attr("name") == "startTime1") {
            var defaultEndTime = $("[name='endTime1']").val() || "";
            var minTime = $(this).attr("startTime1");
            // $(this).datepicker( "option", "minDate", minTime);
            // $(this).datepicker( "option", "minDateTime", new Date(minTime.replace(/-/g,"/")));
            // $(this).datepicker( "option", "maxDate", defaultEndTime);
            // $(this).datepicker( "option", "maxDateTime", new Date(defaultEndTime.replace(/-/g,"/")));
            //$("[name='endTime1']").datepicker("option", "minDate", dateText);
            $("[name='endTime1']").val(defaultEndTime);
          } else if (element.attr("name") == "endTime1") {
            var defaultStartTime = $("[name='startTime1']").val() || "";
            var maxTime = $(this).attr("endTime1");
            // $(this).datepicker("option", "maxDate", maxTime);
            // $(this).datepicker("option", "maxDateTime", new Date(maxTime.replace(/-/g,"/")));
            // $(this).datepicker( "option", "minDate", defaultStartTime);
            // $(this).datepicker( "option", "minDateTime", new Date(defaultStartTime.replace(/-/g,"/")));
            //$("[name='startTime1']").datepicker("option", "maxDate", dateText);
            $("[name='startTime1']").val(defaultStartTime);
          } else {
            console.log("未获取到正确对象");
          }
          $parse(attrs.ngModel).assign(scope, dateText);
        }
      });
    }
  }
]);

campaginDirectives.directive('picker2', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datetimepicker({
        inline: true,
        timeFormat: 'HH:mm:ss',
        showSecond: true,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        minDate: new Date(),
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        //日期简写名称
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //月份简写名称
        beforeShow: function() {
          if (element.attr("name") == "startTime") {
            var maxTime = $("[name='endTime']").val();
            $("[name='startTime']").datepicker("option", "maxDate", maxTime);
            $("[name='startTime']").datepicker("option", "maxDateTime", new Date(maxTime.replace(/-/g, "/")));

          } else if (element.attr("name") == "endTime") {
            var minTime = $("[name='startTime']").val();
            if (minTime) {
              $("[name='endTime']").datepicker("option", "minDate", minTime);
              $("[name='endTime']").datepicker("option", "minDateTime", new Date(minTime.replace(/-/g, "/")));
            }
          } else {
            console.log("未获取到正确对象");
          }
          //$parse(attrs.ngModel).assign(scope, dateText);
        },
        onSelect: function(dateText) {
          if (element.attr("name") == "startTime") {
            // var minTime = dateText;
            // $("[name='endTime']").datepicker("option", "minDate", dateText);
            // $("[name='endTime']").datepicker("option", "minDateTime", new Date(dateText.replace(/-/g, "/")));
            var defaultEndTime = $("[name='endTime']").val() || "";
            $("[name='endTime']").val(defaultEndTime);

          } else if (element.attr("name") == "endTime") {
            //  var maxTime = dateText;
            //  $("[name='startTime']").datepicker("option", "maxDate", dateText);
            // $("[name='startTime']").datepicker("option", "maxDateTime", new Date(dateText.replace(/-/g, "/")));
            var defaultStartTime = $("[name='startTime']").val() || "";
            $("[name='startTime']").val(defaultStartTime);

          } else {
            console.log("未获取到正确对象");
          }
          $parse(attrs.ngModel).assign(scope, dateText);

        }
      });
    }
  }
]);

//获取当天及其以后的日期，包括当天
campaginDirectives.directive('picker3', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        minDate: new Date(),
        beforeShow: function() {
          var temp = element.val();
          if (element.attr("name") == "startTime") {
            var maxTime = $("[name='endTime']").val();
            $("[name='startTime']").datepicker("option", "maxDate", maxTime);
            $("[name='startTime']").datepicker("option", "maxDateTime", new Date(maxTime.replace(/-/g, "/")));
            element.val(temp);
          } else if (element.attr("name") == "endTime") {
            var minTime = $("[name='startTime']").val();
            if (minTime) {
              $("[name='endTime']").datepicker("option", "minDate", minTime);
              $("[name='endTime']").datepicker("option", "minDateTime", new Date(minTime.replace(/-/g, "/")));
            }
          } else {
            console.log("未获取到正确对象");
          }
          element.val(temp);
        },
        onSelect: function(dateText) {
          //var datat;
          if (element.attr("name") == "startTime") {
            var defaultEndTime = $("[name='endTime']").val() || "";
            $("[name='endTime']").datepicker("option", "minDate", dateText);
            $(this).val(this.value.split(' ')[0] + ' 00:00:00');
            $("[name='endTime']").val(defaultEndTime);
          } else if (element.attr("name") == "endTime") {
            var defaultStartTime = $("[name='startTime']").val() || "";
            $("[name='startTime']").datepicker("option", "maxDate", dateText);
            $(this).val(this.value.split(' ')[0] + ' 23:59:59');
            $("[name='startTime']").val(defaultStartTime);
          } else {
            console.log("未获取到正确对象");
          }
          $parse(attrs.ngModel).assign(scope, $(this).val());
        }
      });
    }
  }
]);

//获取当天以后的日期，不包括当天
campaginDirectives.directive('picker4', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        changeMonth: true,
        changeYear: true,
        minDate: moment().add(1, 'd').toDate(),
        onSelect: function(dateText) {
          //var datat;
          if (element.attr("name") == "startTime") {
            var defaultEndTime = $("[name='endTime']").val() || "";
            $("[name='endTime']").datepicker("option", "minDate", dateText);
            $(this).val(this.value.split(' ')[0] + ' 00:00:00');
            $("[name='endTime']").val(defaultEndTime);
          } else if (element.attr("name") == "endTime") {
            var defaultStartTime = $("[name='startTime']").val() || "";
            $("[name='startTime']").datepicker("option", "maxDate", dateText);
            $(this).val(this.value.split(' ')[0] + ' 23:59:59');
            $("[name='startTime']").val(defaultStartTime);
          } else {
            console.log("未获取到正确对象");
          }
          $parse(attrs.ngModel).assign(scope, $(this).val());
        }
      });
    }
  }
]);

//淘宝权益专属
campaginDirectives.directive('picker6', ['$parse', function($parse) {
  return function(scope, element, attrs) {
    element.datetimepicker({
      inline: true,
      timeFormat: 'HH:mm:ss',
      showSecond: true,
      changeMonth: true,
      changeYear: true,
      ShowCheckBox: true,
      minDate: new Date(),
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'], //日期简写名称
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], //月份简写名称
      beforeShow: function() {
        if (element.attr("name") == "startTime") {
          var maxTime = $("[name='endTime']").val();
          var minTime = $(this).attr("startTime");
          if (minTime) {
            //$(this).datepicker("option", "minDate", minTime);
            $(this).datepicker("option", "minDateTime", new Date());
          }
          $("[name='startTime']").datepicker("option", "maxDate", maxTime);
          $("[name='startTime']").datepicker("option", "maxDateTime", new Date(maxTime.replace(/-/g, "/")));
        } else if (element.attr("name") == "endTime") {
          var minTime = $("[name='startTime']").val();
          $("[name='endTime']").datepicker("option", "minDate", minTime);
          $("[name='endTime']").datepicker("option", "minDateTime", new Date(minTime.replace(/-/g, "/")));
        } else {
          console.log("未获取到正确对象");
        }
        //$parse(attrs.ngModel).assign(scope, dateText);
      },
      onSelect: function(dateText) {
        if (element.attr("name") == "startTime") {
          // var minTime = dateText;
          // $("[name='endTime']").datepicker("option", "minDate", dateText);
          // $("[name='endTime']").datepicker("option", "minDateTime", new Date(dateText.replace(/-/g, "/")));
          var defaultEndTime = $("[name='endTime']").val() || "";
          $("[name='endTime']").val(defaultEndTime);

        } else if (element.attr("name") == "endTime") {
          //  var maxTime = dateText;
          //  $("[name='startTime']").datepicker("option", "maxDate", dateText);
          // $("[name='startTime']").datepicker("option", "maxDateTime", new Date(dateText.replace(/-/g, "/")));
          var defaultStartTime = $("[name='startTime']").val() || "";
          $("[name='startTime']").val(defaultStartTime);

        } else {
          console.log("未获取到正确对象");
        }
        $parse(attrs.ngModel).assign(scope, dateText);

      }
    });
  }
}]);

//效果跟踪节点专属
campaginDirectives.directive('picker7', ['$parse', function($parse) {
  return function(scope, element, attrs) {
    var myTime = new Date();
    var end = new Date();
    var iYear = myTime.getFullYear();
    var iMonth = myTime.getMonth() + 1;
    var iDate = myTime.getDate();
    var iHours = myTime.getHours();
    var iMin = myTime.getMinutes();
    var str = '';

    function toTwo(n) {
      return n < 10 ? '0' + n : '' + n;
    }

    if (iMin > 0 && iMin < 30) {
      iMin = 30
    }
    if (iMin > 30) {
      iMin = 0;
      iHours++;
    }
    str = iYear + '-' + toTwo(iMonth) + '-' + toTwo(iDate) + ' ' + toTwo(iHours) + ':' + toTwo(iMin);
    element.datetimepicker({
      inline: true,
      minuteGrid: 30,
      timeFormat: 'HH:mm',
      changeMonth: true,
      changeYear: true,
      stepMinute: 30,
      ShowCheckBox: true,
      minDate: new Date(str),
      maxDate: new Date(end.valueOf() + 30 * 24 * 60 * 60 * 1000 + 1800000),
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'], //日期简写名称
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], //月份简写名称
      beforeShow: function() {
        setTimeout(function() {
          $('.ui-datepicker-current').hide();
        }, 50)
      },
      onChangeMonthYear: function() {
        setTimeout(function() {
          $('.ui-datepicker-current').hide();
        }, 50)
      },
      onSelect: function(dateText) {
        setTimeout(function() {
          $('.ui-datepicker-current').hide();
        }, 10)
      }
    });
  }
}]);

campaginDirectives.directive('dateSelect', ['$parse',
  function($parse) {
    return {
      require: "ngModel",
      link: function(scope, elem, attrs, modelCtrl) {
        elem.datepicker({
          showSecond: false,
          changeMonth: true,
          changeYear: true,
          defaultDate: new Date(2000, 9),
          showWeek: false,
          beforeShow: function() {
            setTimeout(function() {
              $('.ui-datepicker-header').hide();
              $('.ui-datepicker-calendar thead').hide();
              var top = $('.ui-datepicker').offset().top;
              //如果影藏上面2个元素，并且元素浮动到input上面，则重新设置高度
              if (elem.offset().top > ( top + 180)) {
                $('.ui-datepicker').css('top', (top + 62));
              }
              modelCtrl.$viewValue && angular.element(".ui-datepicker-calendar a.ui-state-default").removeClass('ui-state-active').eq(modelCtrl.$viewValue - 1).addClass("ui-state-active");
            }, 0);
          },
          onSelect: function(dateText) {
            dateText = dateText.match(/\d+$/)[0];
            $parse(attrs.ngModel).assign(scope, dateText);
            elem.val(dateText);
            scope.$digest();
          }
        });
      }
    }
  }
]);

//对日期的指令的分装
campaginDirectives.directive('timepicker', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.timepicker({
        defaultValue: "00:00",
        onSelect: function(dateText) {
          var modelPath = $(this).attr('ng-model');
          putObject(modelPath, scope, dateText);
          scope.$apply();
        },
        beforeShow: function() {
          if (!scope.$eval(attrs.ngModel)) {
            $parse(attrs.ngModel).assign(scope, "00:00");
          }
        }
      });
    }
  }
]);

//对日期第2天指令的分装
//对日期第2天指令的分装
campaginDirectives.directive('datepickertomorrow',
  function() {
    return function(scope, element, attrs) {
      var endData = new Date();
      var now = endData.getDate();
      endData.setHours(0);
      endData.setMinutes(0);
      endData.setSeconds(0);
      now = now + 1;
      endData.setDate(now);
      element.datetimepicker({
        inline: true,
        timeFormat: 'HH:mm',
        showSecond: false,
        changeMonth: true,
        changeYear: true,
        ShowCheckBox: true,
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        //日期简写名称
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //月份简写名称
        //stepHour: 2,//设置步长
        //stepMinute: 10,
        //stepSecond: 10,
        // minDate: new Date(),
        minDate: endData,
        onSelect: function(dateText) {
          var modelPath = $(this).attr('ng-model');
          putObject(modelPath, scope, dateText);
          scope.$apply();
        }
      });
    }
  }
);
//对html number 类型的分装
campaginDirectives.directive('ngNumber',
  function() {
    return {
      restrict: 'EA',
      transclude: true,
      link: function(scope, element, attrs, $compile, $parse) {
        var $upHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_up\" ng-click=\'up()\' ></span>');
        var $downHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_down\" ng-click=\'down()\'></span>');
        var upHtml = '<span class=\"spanClass\" style=\"position: relative;\">';
        var min = attrs.min || 0;
        var max = attrs.max || 9999;
        var storeValue = scope.$eval(attrs.ngModel);
        //  var fn = $parse(attrs['ngNumber']);
        element.wrap(upHtml);
        element.after($upHtml);
        element.after($downHtml);
        scope.$watch(parseInt(scope.$eval(attrs.ngModel)), function() {
          if (parseInt(scope.$eval(attrs.ngModel)) == max) {
            element.next().next().addClass("num_up_hover").removeClass("num_up");
          }
          if (parseInt(scope.$eval(attrs.ngModel)) == min) {
            element.next().addClass("num_down_hover").removeClass("num_down");
          }
        });

        //只对输入时添加数字验证，删除数字不验证
        element.on("input", function(evt) {
          var reg = /[^\d]/;
          var regD = /\d+/;
          var viewValue = $.trim(evt.target.value);
          var ary = attrs.ngModel.split('.');
          scope.$apply(function() {
            //如果输入的时候输入了非数字的格式，则截取前面为数字的部分,
            if (reg.test(viewValue)) {
              scope[ary[0]][ary[1]] = (regD.exec(viewValue) || [])[0] - 0;
            } else if (viewValue - 0 > max) {
              scope[ary[0]][ary[1]] = viewValue.slice(0, viewValue.length - 1) - 0;
            }
            // else if(viewValue.indexOf(0) == 0) {
            //     if(viewValue.length == 1) {
            //     scope[ary[0]][ary[1]] = '';
            //     }
            //     else {
            //         scope[ary[0]][ary[1]] = parseInt(viewValue);
            //     }
            // }
          });
        });
        //如果为空，设置为最小值
        //fixed 不能删除bug
        element.on("blur", function(evt) {
          var viewValue = $.trim(evt.target.value);
          var ary = attrs.ngModel.split('.');
          if (viewValue < min || !viewValue) {
            scope.$apply(function() {
              scope[ary[0]][ary[1]] = min;
            });
          }
        });
        $upHtml.click(function() {
          if (element[0].disabled) {
            return
          }
          scope.$apply(function() {
            var ary = attrs.ngModel.split('.');
            if (parseInt(scope.$eval(attrs.ngModel)) < max) {
              scope[ary[0]][ary[1]] = parseInt(scope.$eval(attrs.ngModel)) + 1;

              element.next().addClass("num_down").removeClass("num_down_hover");

            } else {
              scope[ary[0]][ary[1]] = max;
              element.next().next().addClass("num_up_hover").removeClass("num_up");
            }
          })
        }).mousemove(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
              $(this).addClass("num_up_hover").removeClass("num_up");
            }
          }
        }).mouseout(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
              $(this).addClass("num_up").removeClass("num_up_hover");
            }
          }
        });
        $downHtml.click(function() {
          if (element[0].disabled) {
            return;
          }
          scope.$apply(function() {
            var ary = attrs.ngModel.split('.');
            if (parseInt(scope.$eval(attrs.ngModel)) > min) {
              scope[ary[0]][ary[1]] = parseInt(scope.$eval(attrs.ngModel)) - 1;
              element.next().next().addClass("num_up").removeClass("num_up_hover");
            } else {
              scope[ary[0]][ary[1]] = min;
              element.next().addClass("num_down_hover").removeClass("num_down");
            }
          })
        }).mousemove(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
              $(this).addClass("num_down_hover").removeClass("num_down");
            }
          }
        }).mouseout(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
              $(this).addClass("num_down").removeClass("num_down_hover");
            }
          }
        });
      }
    }
  }
);
//输入小数点数字 ngNumberPoint的值说明保留几位小时
campaginDirectives.directive("ngNumberPointSecond", ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      var maxValue = attrs.max || 100,
        minValue = attrs.min || 0,
        pointNumber = attrs.ngNumberPointSecond * 1;

      scope.$watch(attrs.ngModel, function() {
        if (parseInt(scope.$eval(attrs.ngModel)) < minValue) {
          parseInt(scope.$eval(attrs.ngModel)) = minValue
        }
      });

      element.on("input", function(event) {
        var inputEditorVal = event.target.value.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(/(^\d+\.\d+)\./g, "$1");
        event.target.value = inputEditorVal; //先把非数字的都替换掉，除了数字和.
        if (/^0\d$/.test(inputEditorVal)) {
          inputEditorVal = "0";
        }
        ;
        if (inputEditorVal.indexOf(".") != -1) {
          event.target.value = inputEditorVal.substring(0, inputEditorVal.indexOf(".") + (pointNumber + 1));
        } else {
          event.target.value = inputEditorVal //先把非数字的都替换掉，除了数字和.
        }

        if (parseFloat(inputEditorVal) > maxValue) {
          event.target.value = maxValue;
          $parse(attrs.ngModel).assign(scope, maxValue);
        }
        $parse(attrs.ngModel).assign(scope, event.target.value);
      });
    }
  }
]);

//只能输入数字,小数点 （没有样式的）
campaginDirectives.directive('ngNum', ['$compile', '$parse',
  function($compile, $parse) {
    return {
      restrict: 'EA',
      //replace: true,
      transclude: true,
      link: function(scope, element, attrs) {
        var $upHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_up\" ng-click=\'up()\' ></span>');
        var $downHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_down\" ng-click=\'down()\'></span>');
        var upHtml = '<span class=\"spanClass\" style=\"position: relative;\">';
        var min = attrs.min || 0;
        var max = attrs.max || 9999;
        var storeValue = scope.$eval(attrs.ngModel);
        //  var fn = $parse(attrs['ngNumber']);
        /*scope.$watch(attrs.ngModel, function (nVal,oldVal) { // 赋值最小值 暂时删除
         if(oldVal==undefined){
         return false;
         }
         if(nVal < attrs.min){
         $parse(attrs.ngModel).assign(scope, attrs.min);
         }
         });*/

        //只对输入时添加数字验证，删除数字不验证
        element.on("input", function(evt) {
          var reg = /[^\d]/;
          var regD = /\d+/;
          var regZero = /^0(\d)$/;
          var viewValue = $.trim(evt.target.value);
          var ary = attrs.ngModel.split('.');
          var modelLength = attrs.ngNum;
          scope.$apply(function () {
            if (regZero.test(viewValue)) {
              if (modelLength == "2") {
                scope[ary[0]][ary[1]] = regZero.exec(viewValue)[1] - 0;
              } else {
                scope[ary[0]][ary[1]][ary[2]] = regZero.exec(viewValue)[1] - 0;
              }
            }
            //如果输入的时候输入了非数字的格式，则截取前面为数字的部分,
            if (reg.test(viewValue)) {
              if (modelLength == "2") {
                scope[ary[0]][ary[1]] = (regD.exec(viewValue) || [])[0] - 0;
              } else {
                scope[ary[0]][ary[1]][ary[2]] = (regD.exec(viewValue) || [])[0] - 0;
              }

            } else if (viewValue - 0 > max) {
              if (modelLength == "2") {
                scope[ary[0]][ary[1]] = viewValue.slice(0, viewValue.length - 1) - 0;
              } else {
                scope[ary[0]][ary[1]][ary[2]] = viewValue.slice(0, viewValue.length - 1) - 0;
              }
            }
          });
        });
      }
    }
  }
]);

//节点的添加备注弹出框
//使用方法 controller加$scope.nodecomment = "备注内容"
campaginDirectives.directive("nodetip",
  function() {
    return {
      link: linkFn,
      templateUrl: CAMPAIGN_STATIC.tplBasePath + "view/nodetip.html"
    };

    function linkFn(scope, elem, attr) {
      scope.isShowNodeTip = false;
    }
  }
);

//
campaginDirectives.directive('ngDrag',
  function() {
    return function(scope, element, attrs) {
    }
  }
);

/*节点标题非空输入验证*/
campaginDirectives.directive('ngNoderequire',
  function() {
    return function(scope, elem, attrs) {
      var inited;
      var focused = false;
      var verify = false;
      var txt = elem.parent().parent().parent().children('th').text();
      var txt = txt.replace("：", "").replace(":", "");
      var $warnEl = $('<div style="position:absolute; left:10px; top:26px;" class="warning_text">请输入' + txt + '</div>');
      elem.parent().append($warnEl);
      var $warnChild = $warnEl.children();
      scope.$watch(attrs.ngModel, function(data) {
        if (data) {
          elem.removeClass('border_warning');
          $warnEl.hide();
        }
      });
      elem.on('blur', function(event) {
        event.stopPropagation();
        var a = event.target.value;
        var a = a.trim(); //感觉ie8下有隐患
        //console.log(a);
        if (!a) {
          if (!inited) {
            $warnChild.width(elem.width() + 50);
            inited = true;
          }
          elem.addClass('border_warning');
          $warnEl.show();
          verify = true;
        }
      });
      //不允许输入空格,所以删除
      // elem.on('input', function(event) {
      //     event.stopPropagation();
      //     elem.removeClass("border_warning");
      //     inited && $warnEl.hide();
      // });
    };
  }
);
//弹出层中模拟select 修正
campaginDirectives.directive('ngCustomSelectNode',
  function() {
    return function(scope, element, attrs) {
      element.next().next()[0].style.top = "" + element.next().next()[0].offsetTop - 20 + "px";
      element.next().next()[0].style.left = (parseInt(element.next().next()[0].offsetLeft) + 40) + "px"
    }
  }
);

//模拟select框
campaginDirectives.directive('ngCustomSelect',
  function() {
    return function(scope, element, attrs) {
      var $a = $("<a>").css({
        "width": 15,
        "height": 23,
        "display": "inline-block",
        "position": "absolute",
        "background": "url(/ccms/images/arrows_w10.png) no-repeat 0 0"
      });
      if (attrs.isnew) {
        $a = $("<span class='iconfont icon-arrow customer-dropdown-select-down'></span>");
      }
      element.after($a);
      var left = element.position().left;
      var top = element.position().top;
      var eleWidth = element.outerWidth();
      var eleHeihgt = element.outerHeight();
      var arrowsWidth = left + eleWidth - 7.55;
      var arrowsHeight = top + (eleHeihgt - 23) / 2;
      if (attrs.isnew) {
        arrowsWidth = arrowsWidth - 20;
      }

      if (attrs["class"].indexOf("style-mark") != -1) { // 定位下拉箭头位子
        arrowsWidth -= 8;
      }
      //console.log(eleWidth)
      if (attrs["class"].indexOf("style-par") != -1) { // 定位下拉箭头位子
        if (eleWidth == 209) {
          arrowsWidth -= 9
        } else {
          arrowsWidth = left + 200 - 7.55;
          arrowsHeight = top + 1;
        }
      }

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
      if (attrs["class"].indexOf("style-par") != -1) {
        if (eleWidth == 209) {
        } else {
          divWidth -= 20
          divTop -= 6;

        }
      }
      $div.css({
        "width": divWidth,
        "max-height": 200,
        "left": divLeft,
        "top": divTop,
        "overflow-y": "auto",
        "overflow-x": "hidden"
      });
      element.click(function() {
        scope.$apply(function() {
          scope.$eval(attrs.ngCustomSelect);
        });
        $div.slideToggle(200);
      });
      if (attrs["class"].indexOf("blurCategory") != -1) { // 定位下拉箭头位子
        element.on("mouseleave", function(event) {
          setTimeout(function() {
            if ($div.css("display") == "none") {
              scope.$apply(function() {
                scope.$eval(attrs.ngCustomSelect);
                scope.creatGroupObj.showSelCategory = false
              })
            }
          }, 1000)
        })
        $div.on("mouseleave", function() {
          $(this).slideUp(200);
          element.on("blur", function() {
            $div.slideUp(200);
          })
          scope.$apply(function() {
            scope.$eval(attrs.ngCustomSelect);
            scope.creatGroupObj.showSelCategory = false
          })
        });
      } else {
        $div.on("mouseleave", function() {
          $(this).slideUp(200);
          element.on("blur", function() {
            $div.slideUp(200);
          })
        });
      }
      $a.click(function() {
        var selectButtonStatus = scope.$eval(attrs.ngDisabled);
        if (!selectButtonStatus) {
          scope.$apply(function() {
            scope.$eval(attrs.ngCustomSelect);
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
  }
);
//翻页input输入跳转
campaginDirectives.directive("inputNumberPager", function() {
  return {
    restrict: "A",
    scope: false,
    link: function(scope, element, attr) {
      var ele = angular.element(element);

      scope.$watch('offset', function() {
        ele.val(scope.offset);
      });

      ele.bind("keyup", function(event) {
        var eleValue = ele.val();
        if (eleValue == '') return false;
        if (!/^[\d]+$/.test(eleValue)) ele.val(lastValue);

        if (event.keyCode === 13 || event.key === 'Enter') {
          var validValue = validateInputValue(eleValue);
          if (Number(validValue) !== Number(scope.offset)) {
            scope.fetchs({offset: Number(validValue)});
          }
          scope.offset = validValue;
          ele.val(scope.offset);
          lastValue = scope.offset;
          scope.$digest();
        }
        function validateInputValue(value) {
          var nVal = parseInt(value, 10);
          if (!~Object.prototype.toString.call(parseInt(value, 10)).indexOf('Number') || Number.isNaN(nVal)) return scope.offset;
          switch (true) {
            case nVal >= 1 && nVal <= scope.total:
              return nVal;
            case nVal < 1:
              return 1;
            case nVal > scope.total:
              return scope.total;
          }

        }
      })
    }
  }
});


campaginDirectives.directive("ngChoseUnit",
  function() {
    return function(scope, element, attrs) {
      element.bind("click", function() {
        if (attrs.ngChoseUnit == "Radio") { // 单选
          element.siblings("li").removeClass("cur");
        }
        element.toggleClass("cur");
        // 让全选按钮联动
        if (scope.toggleStatuVal != undefined) {
          var allChecked = false;
          if (element.parent().find('li.cur').length === element.parent().children('li').length) {
            allChecked = true;
          }
          if (allChecked) {
            element.parents('.ccmsPublicPopMain').find('input[ng-model=toggleStatuVal]')[0].checked = true
          } else {
            element.parents('.ccmsPublicPopMain').find('input[ng-model=toggleStatuVal]')[0].checked = false
          }
        }
      });
    }
  }
);

//grid上的活动类型管理各个状态的选择
campaginDirectives.directive('acTypeSelector', ['$rootScope',
  function($rootScope) {
    var statusMap = {
      "所有状态活动": "A0",
      "设计中": "A1",
      "设计时预执行": "B1",
      "待审批": "A2",
      "待审批时预执行": "B2",
      "待执行": "A3",
      "执行中": "B3",
      "终止": "A4",
      "执行完成": "A5",
      "异常": "A6"
    };
    return {
      template: '<div class="type_selector"><div class="ac_status_selector ac_status ac_status_A0">{{statusValue}}<a title="{{acType}}"></a></div><div class="ac_status_selector ac_status_selector2 ac_status ac_icon_A0">{{statusValue}}<a></a></div> ' + '<div class="select_wrap"><div class="select_item ac_item_A0 ac_status" ng-click="searchObj.hdCurStatus()">所有状态活动</div> ' + '<div class="select_item  ac_status ac_item_A1" ng-click="searchObj.hdCurStatus(\'A1\')">设计中</div>' + '<div class="select_item  ac_status ac_item_B1" ng-click="searchObj.hdCurStatus(\'B1\')">设计时预执行</div> ' + '<div class="select_item  ac_status ac_item_A2" ng-click="searchObj.hdCurStatus(\'A2\')">待审批</div> ' + '<div class="select_item  ac_status ac_item_B2" ng-click="searchObj.hdCurStatus(\'B2\')">待审批时预执行</div> ' + '<div class="select_item  ac_status ac_item_A3" ng-click="searchObj.hdCurStatus(\'A3\')">待执行</div> ' + '<div class="select_item  ac_status ac_item_B3" ng-click="searchObj.hdCurStatus(\'B3\')">执行中</div> ' + '<div class="select_item  ac_status ac_item_A4" ng-click="searchObj.hdCurStatus(\'A4\')">终止</div> ' + '<div class="select_item  ac_status ac_item_A5" ng-click="searchObj.hdCurStatus(\'A5\')">执行完成</div> ' + '<div class="select_item  ac_status ac_item_A6" ng-click="searchObj.hdCurStatus(\'A6\')">异常</div>' + '</div> </div>',
      link: function(scope, elem, attrs) {
        var isShow, defalutStatusValue = "";
        var list = elem.find(".select_wrap");
        list.hide();
        //var input = elem.find("input");
        var inputs = elem.find(".ac_status_selector");

        elem.on('mouseenter', function() {
          list.show();
          inputs.addClass('ac_status_selector_hover');

        }).on('mouseleave', function() {
          list.hide();
          inputs.removeClass('ac_status_selector_hover');
        });

        if ($rootScope.defaultAcType) { // 获取默认状态代码的名称
          for (var s in statusMap) {
            if (statusMap[s] == $rootScope.defaultAcType) {
              defalutStatusValue = s;
            }
          }
        }
        ;
        scope.statusValue = defalutStatusValue || "所有状态活动"; //是否是首页切换来的，是则有默认的值
        scope.acType = $rootScope.defaultAcType || "A0";
        scope.$watch("acType", function(type) {
          if (type) {
            inputs[1].className = inputs[1].className.replace(/[AB]\d/, type);
          }
        });

        list.find('div').on("click", function(event) {
          var value = event.target.textContent || event.target.innerHTML;
          if (value) {
            scope.statusValue = value;
            scope.acType = statusMap[value];
            scope.$digest();
          }
          list.hide();
        });
      }
    };
  }
]);

//活动类型管理选择器
campaginDirectives.directive("acTypeSelect",
  function() {
    return {
      template: '<div style="display:inline-block;position:relative"> <div class="ac_type_selecor"> {{selectName}} <a></a> </div> <div class="select_wrap" style="/* display: none; */"> <div class="select_item" ng-click="changeSelected(0)">启用</div> <div class="select_item" ng-click="changeSelected(1)">禁用</div> <div class="select_item" ng-click="changeSelected(2)">全部</div> </div> </div>',
      replace: true,
      link: function(scope, elem, attrs) {
        var valMap = {
          "0": "启用",
          "1": "禁用",
          '2': "全部"
        };
        var list = elem.find('.select_wrap').hide();
        scope.selectName = "启用";
        elem.on('mouseenter', function() {
          list.show();
        });
        elem.on('mouseleave', function() {
          list.hide();
        });
        list.on('click', function() {
          list.hide();
        });
        scope.changeSelected = function(val) {
          scope.selectName = valMap[val];
          scope.selectedType = val;
        };
        scope.changeSelected(0); //默认显示启用
      }
    }
  }
);

/*
 *非公用指令
 *营销活动--商品级优惠
 *获取店铺中优惠券的数量
 */
campaginDirectives.directive("restrictionCount",
  function() {
    return function(scope, element, attr) {
      scope.$watch("shopForCounpon.id", function(nVal, oVal) {
        if (nVal == "") {
          return false;
        }
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "ump/count/shopId/" + nVal + "/userScopeType/",
          async: false,
          type: "GET",
          cache: false,
          dataType: "json",
          contentType: "application/json",
          success: function(res) {
            scope.tpl.totalCount = res.total;
            scope.tpl.applyCount = res.applyCount;
          },
          error: function(data) {
            var responseText = data.responseText;
            var data = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        });
      });
    }
  }
);
/*
 *非公用指令
 *营销活动--拆分节点
 *计算随机拆分的占比总和
 */
campaginDirectives.directive("countTotal",
  function() {
    return function(scope, element, attr) {
      scope.$watch("randomSplit.partPercentage", function(nVal, oVal) {
          var num = 0;
          if (scope.randomSplit.partPercentage) {
            var len = scope.randomSplit.partPercentage.length;
            for (var i = 0; i < len; i++) {
              num += parseInt(scope.randomSplit.partPercentage[i].percentage);
            }
          }
          scope.percentageTotal = num;
          if (num == NaN || num > 100 || num < 0) {
            $(element).addClass("error");
          } else {
            $(element).removeClass("error");
          }
        },
        true);
    }
  }
);

/*
 *非公用指令
 *客户分组
 *分组列表删除
 */
campaginDirectives.directive("ngDeleteGroup", ['deleteService',
  function(deleteService) {
    return function(scope, element) {
      element.bind({
        "click": function() {
          var $tr = element.closest("tr");
          var rec = $tr.data('rec');
          var campId = rec.id;
          var campName = rec.groupName;
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
          if (!isOpen && !isExecute) {
            $(this).Confirm({
              "title": "确认删除",
              "str": "确定删除" + campName + "分组吗？",
              "mark": true
            }, function() {
              deleteService.deleteCustomerGroup(campId,
                function(data) {
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
  }
]);
/*客户分群-分组删除*/
campaginDirectives.directive("ngDeletePartition", ['deleteService',
  function(deleteService) {
    return function(scope, element, attr) {
      element.bind({
        "click": function() {
          if (element.hasClass("item")) {
            var $li = element.closest("li");
            var groupId = attr.groupid;
            var groupName = attr.groupname;
            $(this).ConfirmNew({
              "title": "确认删除",
              //"str": "确定删除" + groupName + "分组吗？",
              "str": "删除客户分组后无法恢复，确定要删除吗？",
              "mark": true
            }, function() {
              deleteService.deletePartitionGroup(groupId,
                function(data) {
                  //$li.detach();
                  $li.remove();
                  $(this).yAlert({
                    "text": "删除成功"
                  });
                  removeAlert();
                  scope.getAllNodes()
                });
            })
          } else {
            var $tr = element.closest("tr");
            var rec = $tr.data('rec');
            var parId = rec.id;
            var parName = rec.groupName;
            $(this).ConfirmNew({
              "title": "确认删除",
              //"str": "确定删除" + parName + "分组吗？",
              "str": "删除客户分组后无法恢复，确定要删除吗？",
              "mark": true
            }, function() {
              deleteService.deletePartitionGroup(parId,
                function(data) {
                  //$tr.detach();
                  $tr.remove();
                  $(this).yAlert({
                    "text": "删除成功"
                  });
                  removeAlert();
                  scope.getAllNodes()
                });
            })
          }

        }
      })
    }
  }
]);
campaginDirectives.directive('umpCityType', ['$compile', '$parse', "getListService",
  function($compile, $parse, getListService) {
    return {
      link: function(scope, elem, attrs) {
        //选择框改变
        scope.editorCondition = function() {
          scope.commPlugSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/citys.html?_=" + new Date().getTime();
        };
        //选择器弹框调用
        scope.openPlugPop = function() {
          elem.find(".commSelectPlug").addInteractivePop({
            magTitle: "地区选择",
            width: 820,
            mark: true,
            position: "fixed"
          });
        }

        //城市选择器，确认父级获取数据method
        scope.getCitySelectedData = function(callBackData) {
          scope.cityLists = callBackData.operateValue.slice();
          scope.cityIds = [];
          var cityIds = [];
          if (scope.support == "province") {
            var areaIds = [];
            angular.forEach(scope.cityLists, function(item) {
              if (item.id.toString().split(",").length == 2) {
                cityIds.push(item.id.split(",")[1]);
              } else if (item.id.toString().split(",").length == 1) {
                areaIds.push(item.id);
              }
            });
            if (areaIds.length > 0) {
              $.ajax({
                async: false,
                type: "GET",
                url: GLOBAL_STATIC.componentRoot + +"area/relationship/child/" + areaIds.join(","),
                success: function(responseA) {
                  for (var i = 0; i < responseA.length; i++) {
                    var ids = responseA[i].id.split(',').slice(1);
                    ids.forEach(function(item) {
                      cityIds.push(item);
                    })
                  }
                },
                error: function(data) {
                  var responseText = data.responseText;
                  var data = $.parseJSON(responseText);
                  $(this).Alert({
                    "title": httpTitle || "提示",
                    "str": data.message,
                    "mark": true
                  });
                }
              });
            }
            scope.cityIds = cityIds;
            if (scope.cityIds.length > 0) {
              scope.cityTip = "选择了" + scope.cityIds.length + "个省";
            } else {
              scope.cityTip = "";
            }
          }
        }
      }
    };
  }
]);

/**
 * 活动查询指令
 */
// 活动时间指令 精确到秒
campaginDirectives.directive('activityTime', [function() {
  return {
    template: '<div class="campTimepicker"><label class="ml5 mr10">\
            <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label>\
            <label class="mr10">\
            <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label>\
            <div class="mt10"><select name="at1{{index}}" ng-model="operator" ng-options="choice for choice in data.configs[\'DatetimeType\']" class="commSelect w100 mr15">\
            </select> <span class="cursorPointer blueColor" ng-click="reset()">重置</span></div>\
            <div class="mt10">\
            <span ng-show="dateType == \'absolutely\'"><input type="text" autocomplete="off" class="required borderHighlight w150 ml5 mr5 datetimepicker" name="at2{{index}}" ng-model="dateInput1" date-time-second-picker readonly="true"><span ng-show="isMid"><span class="m">-</span>\
            <input type="text" autocomplete="off" class="required borderHighlight w150 ml-1 mr5 datetimepicker" name="at3{{index}}" ng-model="dateInput2" date-time-second-picker readonly="true">\
            </span>\
            </span><span ng-show="dateType == \'relatively\'">\
            <span class="ml5">前</span>\
            <input type="text" ng-show="subType==\'2\'" autocomplete="off" timepicker-second class="required borderHighlight w50 mr5" name="at15{{index}}" ng-model="monthOrDayOrSecondInput1">\
            <input type="text" ng-show="subType!=\'2\'" autocomplete="off" class="checked required borderHighlight w50 mr5" name="at5{{index}}" ng-model="monthOrDayOrSecondInput1" max-integer="{{numcount}}">\
            <select name="at6{{index}}" class="w50" ng-model="subType" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime">\
            </select>\
            <span ng-show="subType==\'0\' || subType==\'1\' "><span ng-show="subType==\'0\'"><input type="text" class="checked required borderHighlight w50 mr5" name="at7{{index}}" ng-model="dayInput1" date-select readonly="readonly"> 号</span>\
            <input type="text" autocomplete="off" class="checked required borderHighlight w50 mr5" name="at8{{index}}" ng-model="timeInput1" timepicker-second readonly="true">\
            </span><span ng-show="isMid" class="mt10" style="display:block;">\
            <span class="ml5">前</span>\
            <input type="text" ng-show="subType==\'2\'" autocomplete="off" timepicker-second class="required borderHighlight w50 mr5" name="at16{{index}}" ng-model="monthOrDayOrSecondInput2">\
            <input type="text" ng-show="subType!=\'2\'" autocomplete="off" class="checked required borderHighlight w50 mr5" name="at10{{index}}" ng-model="monthOrDayOrSecondInput2" max-integer="{{numcount}}">\
            <select name="at11{{index}}" id="" class="w50" ng-model="subType" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime">\
            </select>\
            <span ng-show="subType==\'0\' || subType==\'1\' "><span ng-show="subType==\'0\'"><input type="text" autocomplete="off" class="checked required borderHighlight w50 mr5" name="at12{{index}}" ng-model="dayInput2" date-select readonly="readonly"> 号 </span>\
            <input type="text" autocomplete="off" class="checked required borderHighlight w50 mr5" name="at13{{index}}" ng-model="timeInput2" timepicker-second readonly="true">\
            </span>\
            </span>\
            </span>\
            </div></div>',
    scope: {
      index: '=',
      values: '=',
      getValues: '='
    },
    controller: ['$scope', function($scope) {
      var defaultVal;
      $scope.data = {
        "type": "时间选择",
        "configs": {
          "TimeSupportRelative": [
            "Support",
            "NotSupport"
          ],
          "DatetimeType": [
            "晚于",
            "早于",
            "介于"
          ]
        }
      };
      //打开节点，同时带有默认值
      $scope.dirValueListTime = [{"value": "月", "id": "0"}, {"value": "天", "id": "1"}, {"value": "秒", "id": "2"}];
      $scope.dirList = [{"value": "前", "id": "0"} /*{ "value": "后", "id": "1" }*/]; //临时去掉后
      if ($scope.values) {
        defaultVal = $scope.values;
        $scope.operator = defaultVal.operator;
        $scope.stringInput = defaultVal.value || "";
        $scope.dateType = defaultVal.type || "absolutely";
        //TODO:
        $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == 'Support' ? false : true;

        if ($scope.dateType == "absolutely") {
          if ($scope.operator == "介于") {
            $scope.dateInput1 = defaultVal.value.split(',')[0];
            $scope.dateInput2 = defaultVal.value.split(',')[1];
          } else {
            $scope.dateInput1 = defaultVal.value;
          }
        } else if ($scope.dateType == "relatively") {
          var value = defaultVal;
          switch (value.dimension) {
            case '月':
              $scope.subType = '0';
              break;
            case '天':
              $scope.subType = '1';
              break;
            case '秒':
              $scope.subType = '2';
              break;
          }
          if ($scope.operator == "介于") {
            $scope.monthOrDayOrSecondInput1 = value.interval.split(',')[0];
            $scope.monthOrDayOrSecondInput2 = value.interval.split(',')[1];
            if ($scope.subType == '0') {
              $scope.dayInput1 = value.day.split(',')[0];
              $scope.dayInput2 = value.day.split(',')[1]
              $scope.timeInput1 = value.time.split(',')[0];
              $scope.timeInput2 = value.time.split(',')[1];
              $scope.numcount = 120;
            } else if ($scope.subType == '1') {
              $scope.timeInput1 = value.time.split(',')[0];
              $scope.timeInput2 = value.time.split(',')[1];
              $scope.numcount = 3650;
            } else if ($scope.subType == '2') {
              $scope.numcount = 6000;
            }
          } else {
            $scope.monthOrDayOrSecondInput1 = value.interval;
            if ($scope.subType == '0') {
              $scope.dayInput1 = value.day;
              $scope.timeInput1 = value.time;
              $scope.numcount = 120;
            } else if ($scope.subType == '1') {
              $scope.timeInput1 = value.time;
              $scope.numcount = 3650;
            } else if ($scope.subType == '2') {
              $scope.numcount = 6000;
            }
          }
        }
      } else {
        //从服务器获取的值
        $scope.operator = $scope.data.configs['DatetimeType'][2];
        $scope.dateType = "absolutely";
        $scope.dateInput1 = "";
        $scope.dateInput2 = "";
        //相对时间,默认'日'
        $scope.subType = '0';
        $scope.numcount = 120;
        //是否可以点击"相对时间""
        $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == "Support" ? false : true;
      }
    }],
    link: function(scope, ele, attrs) {
      //选择框改变
      scope.$watch('operator', function(val, oldVal) {
        //每次切换的时候清空
        if (oldVal != undefined && oldVal != val) {
          if (scope.dateType == "absolutely") {
            clearDate1();
          } else {
            clearDate2();
          }
        }
        if (val == "介于") {
          scope.isMid = true;
        } else {
          scope.isMid = false;
        }
      });
      //绝对时间or相对时间
      scope.$watch('dateType', function(val, oldVal) {
        if (oldVal != undefined && oldVal != val) {
          if (val == "absolutely") {
            scope.operator = scope.data.configs['DatetimeType'][0];
            scope.subType = '0';
            clearDate1();
          } else if (val == "relatively") {
            scope.subType = '1';
            scope.operator = scope.data.configs['DatetimeType'][0];
            clearDate2();
          }
        }
      });
      //月,天,秒切换
      scope.$watch('subType', function(val, oldVal) {
        if (oldVal != undefined && oldVal != val) {
          clearDate2();
          switch (val) {
            //设置输入框最大整数
            case '0':
              scope.numcount = 120;
              break;
            case '1':
              scope.numcount = 3650;
              break;
            case '2':
              scope.numcount = 6000;
              break;
          }
        }
      });

      //获取保存到服务器的values
      scope.getValues = function() {
        var value = {};
        value.operator = scope.operator;
        if (scope.dateType == "absolutely") {
          value.type = "absolutely";
          if (scope.operator == "介于") {
            value.value = scope.dateInput1 + ',' + scope.dateInput2;
          } else {
            value.value = scope.dateInput1;
          }
        } else if (scope.dateType == "relatively") {
          value.type = "relatively";
          if (scope.operator == "介于") {
            value.interval = scope.monthOrDayOrSecondInput1 + ',' + scope.monthOrDayOrSecondInput2;
            if (scope.subType == '0') {
              value.dimension = '月';
              value.day = scope.dayInput1 + ',' + scope.dayInput2;
              value.time = scope.timeInput1 + ',' + scope.timeInput2;
            } else if (scope.subType == '1') {
              value.dimension = '天';
              value.time = scope.timeInput1 + ',' + scope.timeInput2;
            } else if (scope.subType == '2') {
              value.dimension = '秒';
            }
          } else {
            value.interval = scope.monthOrDayOrSecondInput1;
            if (scope.subType == '0') {
              value.dimension = '月';
              value.day = scope.dayInput1;
              value.time = scope.timeInput1;
            } else if (scope.subType == '1') {
              value.dimension = '天';
              value.time = scope.timeInput1;
            } else if (scope.subType == '2') {
              value.dimension = '秒';
            }
          }
        }
        return value;
      };

      //重置
      scope.reset = function() {
        clearDate1();
        clearDate2();
      }

      //绝对时间清除操作
      function clearDate1() {
        scope.dateInput1 = '';
        scope.dateInput2 = '';
      }

      //相对时间清除操作
      function clearDate2() {
        scope.timeInput1 = '';
        scope.timeInput2 = '';
        scope.dayInput1 = '';
        scope.dayInput2 = '';
        scope.monthOrDayOrSecondInput1 = '';
        scope.monthOrDayOrSecondInput2 = '';
      }

      //相对时间天or月选择
      function clearDate3() {
        scope.timeInput1 = '';
        scope.timeInput2 = '';
        scope.dayInput1 = '';
        scope.dayInput2 = '';
      }
    }
  }
}])

campaginDirectives.directive('preferentialSuccess', [function() {
  return {
    template: '<div>\
            <div class="directory_type_preferential_policies" ng-repeat="checkList in data">\
                <label class="maxWidth90 height18 " title="{{checkList.name}}"><input class="commCheckbox campselect" name="directoryCheck" type="checkbox" ng-model="checkList.status" id="{{checkList.nodeType}}" ng-click="all($event,checkList.nodeType)">{{checkList.name}}</label>\
            </div>\
        </div>',
    scope: {
      values: '=',
      getValues: '=',
      channelTypeData: '='
    },
    controller: ['$scope', function($scope) {
      if ($scope.values) {
        var defaultValusAry = $scope.values ? $scope.values.split(",") : [];
        if ($scope.channelTypeData) { //前台手动添加初始化的status
          $scope.data = angular.copy($scope.channelTypeData);
          angular.forEach($scope.data, function(val, key) {
            val.status = false;
            if (val.name == 'EDM') {
              val.name = '邮件';
            }
            angular.forEach(defaultValusAry, function(defaultVal, othKey) {
              if (defaultVal == val.code) {
                val.status = true;
              }
            })
          });
        }
        if (defaultValusAry.length == $scope.data.length - 1) {
          $scope.data[0].status = true;
        }
      } else {
        //从服务器获取的值
        if ($scope.channelTypeData) { //前台手动添加初始化的status
          $scope.data = angular.copy($scope.channelTypeData);
          angular.forEach($scope.data, function(val, key) {
            val.status = false;
          });
        }
      }
    }],
    link: function(scope, elem, attrs) {
      //获取保存到服务器的values
      scope.getValues = function() {
        var directoryAry = [];
        angular.forEach(scope.data, function(val, key) {
          if (val.status && val.nodeType != 'all') {
            directoryAry.push(val.code);
          }
        })
        var value = directoryAry.join(",");
        return value;
      };
      scope.all = function(e, id) {
        var len = 0;
        if (id == 'all') {
          var element = e.target;
          if ($(element).prop('checked')) {
            $(element).closest('.preferentialSuccess').find('.campselect').prop('checked', true);
            //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',true)
            $(element).prop('disabled', false)
            angular.forEach(scope.data, function(val, key) {
              val.status = true
            })
          }
          else {
            angular.forEach(scope.data, function(val, key) {
              val.status = false
            })
            $(element).closest('.preferentialSuccess').find('.campselect').prop('checked', false);
            //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',false)
          }
        }
        else {
          setTimeout(function() {
            var element = e.target;
            var onOff3 = false;
            angular.forEach(scope.data, function(val, key) {
              if (key == 0 && val.status) {
                onOff3 = true;
                val.status = false;
              }
              else {
                if (val.status) {
                  len++;
                }
              }
            })
            if (len == scope.data.length - 1) {
              angular.forEach(scope.data, function(val, key) {
                val.status = true
              })
              $(element).closest('.preferentialSuccess').find('.campselect').prop('checked', true);
              //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',true)
              //$(element).closest('.preferentialPolicies').find('.campselect').eq(0).prop('disabled',false);
            }
            if (onOff3) {
              $(element).closest('.preferentialSuccess').find('.campselect').eq(0).prop('checked', false);
            }
          }, 50)
        }
      }
    }
  }
}]);

// 沟通优惠方式
campaginDirectives.directive('preferentialLasttime', [function() {
  return {
    template: '<div>\
            <div class="directory_type_preferential_policies" ng-repeat="checkList in data">\
                <label class="maxWidth90 height18 " title="{{checkList.name}}"><input class="commCheckbox campselect" name="directoryCheck" type="checkbox" ng-model="checkList.status" id="{{checkList.nodeType}}" ng-click="all($event,checkList.nodeType)">{{checkList.name}}</label>\
            </div>\
        </div>',
    scope: {
      values: '=',
      getValues: '=',
      channelTypeData: '='
    },
    controller: ['$scope', function($scope) {
      if ($scope.values) {
        var defaultValusAry = $scope.values ? $scope.values.split(",") : [];
        if ($scope.channelTypeData) { //前台手动添加初始化的status
          $scope.data = angular.copy($scope.channelTypeData);
          angular.forEach($scope.data, function(val, key) {
            val.status = false;
            if (val.name == 'EDM') {
              val.name = '邮件';
            }
            angular.forEach(defaultValusAry, function(defaultVal, othKey) {
              if (defaultVal == val.code) {
                val.status = true;
              }
            })
          });
        }
        if (defaultValusAry.length == $scope.data.length - 1) {
          $scope.data[0].status = true;
        }
      } else {
        //从服务器获取的值
        if ($scope.channelTypeData) { //前台手动添加初始化的status
          $scope.data = angular.copy($scope.channelTypeData);
          angular.forEach($scope.data, function(val, key) {
            val.status = false;
          });
        }
      }
    }],
    link: function(scope, elem, attrs) {
      //获取保存到服务器的values
      scope.getValues = function() {
        var directoryAry = [];
        angular.forEach(scope.data, function(val, key) {
          if (val.status && val.nodeType != 'all') {
            directoryAry.push(val.code);
          }
        })
        var value = directoryAry.join(",");
        return value;
      };
      scope.all = function(e, id) {
        var len = 0;
        if (id == 'all') {
          var element = e.target;
          if ($(element).prop('checked')) {
            $(element).closest('.preferentialLasttime').find('.campselect').prop('checked', true);
            //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',true)
            $(element).prop('disabled', false)
            angular.forEach(scope.data, function(val, key) {
              val.status = true
            })
          }
          else {
            angular.forEach(scope.data, function(val, key) {
              val.status = false
            })
            $(element).closest('.preferentialLasttime').find('.campselect').prop('checked', false);
            //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',false)
          }
        }
        else {
          setTimeout(function() {
            var element = e.target;
            var onOff2 = false;
            angular.forEach(scope.data, function(val, key) {
              if (key == 0 && val.status) {
                onOff2 = true;
                val.status = false;
              }
              else {
                if (val.status) {
                  len++;
                }
              }
            })
            if (len == scope.data.length - 1) {
              angular.forEach(scope.data, function(val, key) {
                val.status = true
              })
              $(element).closest('.preferentialLasttime').find('.campselect').prop('checked', true);
              //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',true)
              //$(element).closest('.preferentialPolicies').find('.campselect').eq(0).prop('disabled',false);
            }
            if (onOff2) {
              $(element).closest('.preferentialLasttime').find('.campselect').eq(0).prop('checked', false);
            }
          }, 50)
        }
      }
    }
  }
}]);

// 沟通优惠方式
campaginDirectives.directive('preferentialPolicies', [function() {
  return {
    template: '<div>\
            <div class="directory_type_preferential_policies" ng-repeat="checkList in data">\
                <label class="maxWidth90 height18 " title="{{checkList.name}}"><input class="commCheckbox campselect" name="directoryCheck" type="checkbox" ng-model="checkList.status" id="{{checkList.nodeType}}" ng-click="all($event,checkList.nodeType)">{{checkList.name}}</label>\
            </div>\
        </div>',
    scope: {
      values: '=',
      getValues: '=',
      channelTypeData: '='
    },
    controller: ['$scope', function($scope) {
      // $scope.data = {
      //   "type": "字典选择",
      //   "configs": [
      //     {
      //       "name": "不限",
      //       "id": "aSMS",
      //       "status": false,
      //       "onoff": false
      //     },
      //     {
      //       "name": "短信",
      //       "id": "tcommunicateSMS",
      //       "status": false,
      //       "onoff": false
      //     },
      //     //{
      //     //  "name": "优惠券",
      //     //  "id": "tdiscountEC",
      //     //  "status": false,
      //     //  "onoff": false
      //     //},
      //     {
      //       "name": "邮件",
      //       "id": "tcommunicateEDM",
      //       "status": false,
      //       "onoff": false
      //     }//,
      //     //{
      //     //  "name": "定向优惠",
      //     //  "id": "tdiscountUMP",
      //     //  "status": false,
      //     //  "onoff": false
      //     //}
      //   ]
      // };
      if ($scope.values) {
        var defaultValusAry = $scope.values ? $scope.values.split(",") : [];
        if ($scope.channelTypeData) { //前台手动添加初始化的status
          $scope.data = angular.copy($scope.channelTypeData);
          angular.forEach($scope.data, function(val, key) {
            val.status = false;
            if (val.name == 'EDM') {
              val.name = '邮件';
            }
            angular.forEach(defaultValusAry, function(defaultVal, othKey) {
              if (defaultVal == val.code) {
                val.status = true;
              }
            })
          });
        }
        if (defaultValusAry.length == $scope.data.length - 1) {
          $scope.data[0].status = true;
        }
      } else {
        //从服务器获取的值
        if ($scope.channelTypeData) { //前台手动添加初始化的status
          $scope.data = angular.copy($scope.channelTypeData);
          angular.forEach($scope.data, function(val, key) {
            val.status = false;
          });
        }
      }
    }],
    link: function(scope, elem, attrs) {
      //获取保存到服务器的values
      scope.getValues = function() {
        var directoryAry = [];
        angular.forEach(scope.data, function(val, key) {
          if (val.status && val.nodeType != 'all') {
            directoryAry.push(val.code);
          }
        })
        var value = directoryAry.join(",");
        return value;
      };
      scope.all = function(e, id) {
        var len = 0;
        if (id == 'all') {
          var element = e.target;
          if ($(element).prop('checked')) {
            $(element).closest('.preferentialPolicies').find('.campselect').prop('checked', true);
            //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',true)
            $(element).prop('disabled', false)
            angular.forEach(scope.data, function(val, key) {
              val.status = true
            })
          }
          else {
            angular.forEach(scope.data, function(val, key) {
              val.status = false
            })
            $(element).closest('.preferentialPolicies').find('.campselect').prop('checked', false);
            //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',false)
          }
        }
        else {
          setTimeout(function() {
            var element = e.target;
            var onOff = false;
            angular.forEach(scope.data, function(val, key) {
              if (key == 0 && val.status) {
                onOff = true;
                val.status = false;
              }
              else {
                if (val.status) {
                  len++;
                }
              }
            })
            if (len == scope.data.length - 1) {
              angular.forEach(scope.data, function(val, key) {
                val.status = true
              })
              $(element).closest('.preferentialPolicies').find('.campselect').prop('checked', true);
              //$(element).closest('.preferentialPolicies').find('.campselect').prop('disabled',true)
              //$(element).closest('.preferentialPolicies').find('.campselect').eq(0).prop('disabled',false);
            }
            if (onOff) {
              $(element).closest('.preferentialPolicies').find('.campselect').eq(0).prop('checked', false);
            }
          }, 50)
        }
      }
    }
  }
}]);

campaginDirectives.directive('preferentialJoinnum', [function() {
  return {
    template: '<select  ng-options="val for val in DayList" ng-model="mydaynum"></select>\
            <input type="text" class="verifyonoff" ng-model="joinnum1" ng-class="{groupFirst:isGroup}" ng-keyup="count($event)" maxlength="3" />\
            <span ng-show="isMid"><span style="margin-right:4px;">-</span><input class="verifyonoff" type="text" ng-model="joinnum2" ng-keyup="count($event)" maxlength="3"/></span> 次\
            <div class="warning_text warningJoinnum" style="position: absolute;top: 28px;left:164px;">请填写该字段</div>\
            <div class="warning_text warningJoinnum" style="position: absolute;top: 28px;left:264px;">请填写该字段</div>\
        ',
    scope: {
      values: '=',
      getValues: '=',
      isGroup: '='
    },
    controller: ['$scope', function($scope) {
      $scope.DayList = ['大于等于', '等于', '小于等于', '介于'];
      if ($scope.values.activityOperator == '介于') {
        $scope.isMid = true;
        var defaultValusAry = $scope.values.activityValue.split(",");
        $scope.joinnum1 = defaultValusAry[0];
        $scope.joinnum2 = defaultValusAry[1];
        // 大小转换
        if (parseFloat($scope.joinnum1) > parseFloat($scope.joinnum2)) {
          var temp = $scope.joinnum2;
          $scope.joinnum2 = $scope.joinnum1;
          $scope.joinnum1 = temp;
        }
      }
      else {
        if ($scope.values.activityValue) {
          $scope.joinnum1 = $scope.values.activityValue;
        } else {
          $scope.joinnum1 = '';
        }
      }
      if ($scope.values.activityOperator) {
        angular.forEach($scope.DayList, function(data, index, array) {
          if ($scope.values.activityOperator == data) {
            $scope.mydaynum = $scope.DayList[index];
          }
        })
      }
      else {
        $scope.mydaynum = $scope.DayList[0];
      }
    }],
    link: function(scope, elem, attrs) {
      scope.getValues = function() {
        var val = {};
        val.activityOperator = scope.mydaynum;
        if (scope.joinnum2 && val.activityOperator == '介于') {
          // 大小转换
          if (parseFloat(scope.joinnum1) > parseFloat(scope.joinnum2)) {
            var temp = scope.joinnum2;
            scope.joinnum2 = scope.joinnum1;
            scope.joinnum1 = temp;
          }
          val.activityValue = scope.joinnum1 + ',' + scope.joinnum2;
        }
        else {
          val.activityValue = scope.joinnum1
        }
        return val;
      }
      scope.$watch('mydaynum', function(val, oldVal) {
        if (val != oldVal) {
          if (val == '介于') {
            scope.isMid = true;
          }
          else {
            scope.isMid = false;
          }
          scope.joinnum1 = '';
          scope.joinnum2 = '';
          elem.find('.verifyonoff').removeClass('active');
          elem.find('.warningJoinnum').hide();
        }
      });
      scope.$watch('joinnum1', function(val, oldVal) {
        if (val) {
          elem.find('.verifyonoff').eq(0).removeClass('active');
          elem.find('.warningJoinnum').eq(0).hide();
        }
      })
      scope.$watch('joinnum2', function(val, oldVal) {
        if (val) {
          elem.find('.verifyonoff').eq(1).removeClass('active');
          elem.find('.warningJoinnum').eq(1).hide();
        }
      })
      scope.count = function(ev) {
        scope.joinnum1 = scope.joinnum1.replace(/^0|[^\d]/g, '')
        if (scope.joinnum2) {
          scope.joinnum2 = scope.joinnum2.replace(/^0|[^\d]/g, '')
        }
      }
    }
  }
}]);

campaginDirectives.directive('preferentialSelecttime', [function() {
  return {
    template: '<select ng-options="val for val in NumList" ng-model="mynum"></select>\
            <div class="campmain_active_one_radio">\
            <label><input type="radio" name="dayselect{{listindex}}" value="天" ng-model="dayselect" ><span>天</span></label>\
            <label><input type="radio" name="dayselect{{listindex}}" value="周" ng-model="dayselect" ><span>周（7天）</span></label>\
            <label><input type="radio" name="dayselect{{listindex}}" value="月" ng-model="dayselect" ><span>月（30天）</span></label>\
            </div>\
        ',
    scope: {
      values: '=',
      getValues: '=',
      index: '='
    },
    controller: ['$scope', function($scope) {
      $scope.listindex = $scope.index
      if ($scope.values.type == '天') {
        $scope.NumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        angular.forEach($scope.NumList, function(data, index, array) {
          if ($scope.values.value == data) {
            $scope.mynum = $scope.NumList[index];
          }
        })
      }
      else if ($scope.values.type == '周') {
        $scope.NumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        angular.forEach($scope.NumList, function(data, index, array) {
          if ($scope.values.value == data) {
            $scope.mynum = $scope.NumList[index];
          }
        })
      }
      else if ($scope.values.type == '月') {
        $scope.NumList = [1, 2, 3];
        angular.forEach($scope.NumList, function(data, index, array) {
          if ($scope.values.value == data) {
            $scope.mynum = $scope.NumList[index];
          }
        })
      }
      else {
        $scope.NumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        $scope.mynum = $scope.NumList[0];
        $scope.dayselect = '天'
      }
      $scope.dayselect = $scope.values.type
    }],
    link: function(scope, elem, attrs) {
      scope.getValues = function() {
        var val = {};
        val.type = scope.dayselect;
        val.value = scope.mynum;
        return val;
      }
      scope.$watch('dayselect', function(val, oldVal) {
        if (val != oldVal) {
          if (val == '天') {
            scope.NumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
          }
          if (val == '周') {
            scope.NumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          }
          if (val == '月') {
            scope.NumList = [1, 2, 3];
          }
          scope.mynum = scope.NumList[0];
        }
      });
    }
  }
}]);

campaginDirectives.directive('preferentialAbsolutely', [function() {
  return {
    template: '<div style="padding-top: 12px;position: relative;">\
            <select class="campmain_join_three_sel" ng-options="val for val in absolutelyList" ng-model="myabsolutely"></select>\
            <a ng-click="cleardata()">重置</a>\
            <div class="campmain_join_three_inp">\
            <input type="text" autocomplete="off" style="margin-left:0;" class="required borderHighlight w150 mr5 datetimepicker datapicker1 datapicker" ng-model="dateInput1" date-absolute-picker readonly="true">\
            <span ng-show="isMid">\
            <span style="margin-right:4px;">-</span>\
            <input type="text" autocomplete="off" class="required borderHighlight w150 ml-1 mr5 datetimepicker datapicker2 datapicker" ng-model="dateInput2" date-absolute-picker readonly="true">\
            </span>\
            <div class="warning_text warningabsolu" style="position: absolute;top: 72px;left:0px;">请填写该字段</div>\
            <div class="warning_text warningabsolu" style="position: absolute;top: 72px;left:180px;">请填写该字段</div>\
            </div>\
            </div>\
        ',
    scope: {
      values: '=',
      getValues: '='
    },
    controller: ['$scope', function($scope) {
      $scope.absolutelyList = ['晚于(不包含)', '晚于(包含)', '等于', '早于(不包含)', '早于(包含)', '不等于', '介于'];
      if ($scope.values.operator == '介于') {
        if ($scope.values.value) {
          $scope.isMid = true;
          var defaultValusAry = $scope.values.value.split(",");
          $scope.dateInput1 = defaultValusAry[0];
          $scope.dateInput2 = defaultValusAry[1];
        }
      }
      else {
        if ($scope.values.value) {
          $scope.dateInput1 = $scope.values.value
        }
        else {
          $scope.dateInput1 = '';
        }
      }
      if ($scope.values.value) {
        if ($scope.values.operator) {
          angular.forEach($scope.absolutelyList, function(data, index, array) {
            if ($scope.values.operator == data) {
              $scope.myabsolutely = $scope.absolutelyList[index];
            }
          })
        }
      }
      else {
        $scope.myabsolutely = $scope.absolutelyList[0];
      }
    }],
    link: function(scope, elem, attrs) {
      scope.getValues = function() {
        var val = {};
        val.operator = scope.myabsolutely;
        if (scope.dateInput2) {
          val.value = scope.dateInput1 + ',' + scope.dateInput2
        }
        else {
          val.value = scope.dateInput1
        }
        return val;
      }
      scope.cleardata = function() {
        scope.dateInput1 = '';
        scope.dateInput2 = '';
        $(elem).find('input').val('');
      }
      scope.$watch('values.type', function(val, oldVal) {
        if (val != oldVal) {
          elem.find('.warningabsolu').hide();
          elem.find('.datetimepicker').removeClass('active');
        }
      })
      scope.$watch('myabsolutely', function(val, oldVal) {
        if (val != oldVal) {
          if (val == '介于') {
            scope.isMid = true;
          }
          else {
            scope.isMid = false;
          }
          scope.dateInput1 = '';
          scope.dateInput2 = '';
          elem.find('.datetimepicker').removeClass('active');
          elem.find('.warningabsolu').hide();
        }
      });
      scope.$watch('dateInput1', function(val, oldVal) {
        if (val) {
          elem.find('.datetimepicker').eq(0).removeClass('active');
          elem.find('.warningabsolu').eq(0).hide();
        }
      })
      scope.$watch('dateInput2', function(val, oldVal) {
        if (val) {
          elem.find('.datetimepicker').eq(1).removeClass('active');
          elem.find('.warningabsolu').eq(1).hide();
        }
      })
    }
  }
}]);

campaginDirectives.directive('preferentialRelatively', [function() {
  return {
    template: '<div style="padding-top: 12px;position: relative;">\
            <select class="campmain_join_three_sel" ng-options="val for val in relativelyList" ng-model="myrelatively" style="margin-right:10px;"></select>\
            <input type="text" class="campmain_join_three_input" ng-model="relativelydata1" ng-keyup="count2()" maxlength="4">\
            天前\
            <div class="warning_text warningrelative" style="position: absolute;top: 39px;left:84px;">请填写该字段</div>\
            </div>\
        ',
    scope: {
      values: '=',
      getValues: '='
    },
    controller: ['$scope', function($scope) {
      $scope.relativelyList = ['晚于', '早于', '等于', '不等于'];
      if ($scope.values.interval) {
        $scope.relativelydata1 = $scope.values.interval
      }
      else {
        $scope.relativelydata1 = '';
      }
      if ($scope.values.interval) {
        if ($scope.values.operator) {
          angular.forEach($scope.relativelyList, function(data, index, array) {
            if ($scope.values.operator == data) {
              $scope.myrelatively = $scope.relativelyList[index];
            }
          })
        }
      }
      else {
        $scope.myrelatively = $scope.relativelyList[0];
      }
    }],
    link: function(scope, elem, attrs) {
      scope.getValues = function() {
        var val = {};
        val.operator = scope.myrelatively;
        val.dimension = '天';
        if (scope.relativelydata2) {
          val.interval = scope.relativelydata1 + ',' + scope.relativelydata2
        }
        else {
          val.interval = scope.relativelydata1
        }
        return val;
      }
      scope.$watch('values.type', function(val, oldVal) {
        if (val != oldVal) {
          elem.find('.campmain_join_three_input').removeClass('active');
          elem.find('.warningrelative').hide();
        }
      })
      scope.$watch('myrelatively', function(val, oldVal) {
        if (val != oldVal) {
          scope.relativelydata1 = '';
          scope.relativelydata2 = '';
          elem.find('.campmain_join_three_input').removeClass('active');
          elem.find('.warningrelative').hide();
        }
      });
      scope.$watch('relativelydata1', function(val, oldVal) {
        if (val) {
          elem.find('.campmain_join_three_input').eq(0).removeClass('active');
          elem.find('.warningrelative').hide();
        }
      })

      scope.count2 = function() {
        scope.relativelydata1 = scope.relativelydata1.replace(/^0[0-9]|[^\d]/g, '')
      }
    }
  }
}]);

// 指定/排除活动
campaginDirectives.directive('excludedActivities', [function() {
  return {
    template: '<input class="width200 borderHighlight joinActivities" style="margin-left:0;" name="ea{{index}}" type="text" autocomplete="off" readonly="readonly" ng-model="activityLength" ng-click="selectefActivity()"/><a class="optionModule2 location5" href="javascript:void(0);" ng-click="selectefActivity()"></a><div class="commSelectPlug" ng-include src="commPlugSrc" onload="openActivityPop()"></div>',

    scope: {
      index: '=',
      values: '=',
      getValues: '='
    },

    controller: ['$scope', function($scope) {
      if ($scope.values) {
        $scope.activityId = $scope.values.storeActivityId; // 活动选择器存储id
        $scope.activityLength = $scope.values.fillActivityValue; // 储存后台的input展示值
        //$scope.isExcept = $scope.values.isExcept; // 是否排除
      } else {
        $scope.activityId = ""; // 活动选择器存储id
        $scope.activityLength = ""; // 储存后台的input展示值
        //$scope.isExcept = false; // 是否排除
      }

      $scope.disposeActivityInputView = function(activityData) { // 处理活动选择框的结果展示
        var activityViewNum = 0,
          activityNodeViewNum = 0;
        angular.forEach(activityData.items, function(val, key) {
          if ((val.campaignId && val.nodeId) || (val.campaignName && val.nodeName)) {
            activityNodeViewNum++;
          } else if (val.campaignId || val.campaignName) {
            activityViewNum++;
          }
        });

        if (activityViewNum == 0 && activityNodeViewNum == 0) {
          $scope.activityLength = "";
        } else if (activityViewNum == 0 && activityNodeViewNum != 0) {
          $scope.activityLength = "已选择" + activityNodeViewNum + "个节点";
        } else if (activityViewNum != 0 && activityNodeViewNum == 0 && !$scope.isExcept) {
          $scope.activityLength = "已选择" + activityViewNum + "个活动";
        } else if (activityViewNum != 0 && activityNodeViewNum == 0 && $scope.isExcept) {
          $scope.activityLength = "已排除" + activityViewNum + "个活动";
        } else if (activityViewNum != 0 && activityNodeViewNum != 0) {
          $scope.activityLength = "已选择" + activityViewNum + "个活动," + activityNodeViewNum + "个节点";
        }
      };
    }],
    link: function(scope, elem, attrs) {

      //活动选择器载入
      scope.selectefActivity = function() {
        scope.commPlugSrc = GLOBAL_STATIC.rootModule + "/modules/activitySelector/index.html?_=" + new Date().getTime();
      };
      scope.openActivityPop = function() { // 弹框调用
        if (!location.href.match('/view/customer/group')) {
          elem.find(".commActivityPlug").addInteractivePop({
            magTitle: "请选择营销活动",
            width: 1000,
            mark: false,
            position: "fixed",
            childElePop: true
          });
        } else {
          elem.find(".commActivityPlug").addInteractivePop({
            magTitle: "请选择营销活动",
            width: 1010,
            mark: true,
            position: "fixed"
          });
        }

        // 活动查询节点权限没有限制
        elem.find(".commActivityPlug").scope().activityScopeObj.setActivityListsParams.allAcess = "true";

        // 活动选择器样式特殊处理
        /*if (scope.isExcept) {
         elem.find(".commActivityPlug").scope().activityScopeObj.isExcept = scope.isExcept;
         }*/
        elem.find(".commActivityPlug .selectionBox").css({
          width: '771px'
        }).addClass('tfilterCampQuerySpect');
        //elem.find(".commActivityPlug .isExcept").show();
        elem.find(".commActivityPlug .nodeBox").hide();
        elem.find(".selectMyItems").show();
        // 活动选择器样式特殊处理 end
      };

      scope.getSelectedActivity = function(selectedActivityData, activityId, isExcept) { // 活动选择器确认 返回数据
        console.log(11);
        scope.activityId = activityId;
        //scope.isExcept = isExcept;
        scope.disposeActivityInputView(selectedActivityData);
      };
      scope.$watch('activityLength', function(val, oldVal) {
        elem.find('.joinActivities').removeClass('active');
        elem.find('.warning_text').hide();
      })

      //获取保存到服务器的values
      scope.getValues = function() {
        var value = {};
        value.fillActivityValue = scope.activityLength; // 活动选择器input展示内容
        value.storeActivityId = '' + scope.activityId; // 储存选择器id传给后台
        //value.isExcept = scope.isExcept; //是否排除
        return value;
      };
    }

  }
}]);

// 最后一次参与时间与次数
campaginDirectives.directive('screenConditions', [function() {
  return {
    template: '<div><select name="sc1{{index}}" ng-options="choice for choice in contionLists" ng-model="screenType">\
            </select></div>\
            <div class="mt10" ng-show="screenType ==\'最近一次参与时间\'">\
            <div class="campTimepicker campPicker">\
            <label class="mr10">\
            <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label>\
            <label class="mr10">\
            <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label>\
            <div class="mt10"><select name="sc2{{index}}" ng-model="operator" style="margin-left:0;" ng-options="choice for choice in data.configs[\'DatetimeType\']" class="commSelect w100 mr15">\
            </select> <span class="cursorPointer blueColor" ng-click="reset()">重置</span></div>\
            <div class="mt10">\
            <span ng-show="dateType == \'absolutely\'">\
            <input type="text" autocomplete="off" style="margin-left:0;" class="required borderHighlight w150 mr5 datetimepicker datapicker1 datapicker" name="sc4{{index}}" ng-model="dateInput1" date-time-second-picker readonly="true"><span ng-show="isMid"><span class="m">-</span>\
            <input type="text" autocomplete="off" class="required borderHighlight w150 ml-1 mr5 datetimepicker datapicker2 datapicker" name="sc3{{index}}" ng-model="dateInput2" date-time-second-picker readonly="true">\
            </span>\
            </span><span ng-show="dateType == \'relatively\'">\
            <span>前</span>\
            <input type="text" ng-show="subType==\'2\'" autocomplete="off" class="required checked aaaa borderHighlight w50 mr5" name="sc26{{index}}" timepicker-second ng-model="monthOrDayOrSecondInput1">\
            <input type="text" ng-show="subType!=\'2\'" autocomplete="off" class="checked required aaaa borderHighlight w50 mr5" name="sc6{{index}}" ng-model="monthOrDayOrSecondInput1" max-integer="{{numcount}}">\
            <select name="sc7{{index}}" class="w50" ng-model="subType" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime">\
            </select>\
            <span ng-show="subType==\'0\' || subType==\'1\' "><span ng-show="subType==\'0\'"><input type="text" class="checked required bbbb borderHighlight w50 mr5" name="sc13{{index}}" ng-model="dayInput1" date-select readonly="readonly"> 号</span>\
            <input type="text" autocomplete="off" class="checked required cccc borderHighlight w50 mr5" name="sc9{{index}}" ng-model="timeInput1" timepicker-second readonly="true">\
            </span><span ng-show="isMid" class="mt10" style="display:block;">\
            <span>前</span>\
            <input type="text" ng-show="subType==\'2\'" timepicker-second autocomplete="off" class="required checked dddd borderHighlight w50 mr5" name="sc101{{index}}" ng-model="monthOrDayOrSecondInput2">\
            <input type="text" ng-show="subType!=\'2\'" autocomplete="off" class="checked dddd required borderHighlight w50 mr5" name="sc10{{index}}" ng-model="monthOrDayOrSecondInput2" max-integer="{{numcount}}">\
            <select name="sc12{{index}}" id="" class="w50" ng-model="subType" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime">\
            </select>\
            <span ng-show="subType==\'0\' || subType==\'1\' "><span ng-show="subType==\'0\'"><input type="text" autocomplete="off" class="checked required eeee borderHighlight w50 mr5" name="sc14{{index}}" ng-model="dayInput2" date-select readonly="readonly"> 号 </span>\
            <input type="text" autocomplete="off" class="checked required ffff borderHighlight w50 mr5" name="sc11{{index}}" ng-model="timeInput2" timepicker-second readonly="true">\
            </span>\
            </span>\
            </span>\
            </div>\
            </div>\
            </div>\
        <div class="mt10" ng-show="screenType ==\'参与次数\'">\
            <div class="campTimepicker timePicker">\
            <select name="sc15{{index}}" style="margin-left:0;" ng-model="activityNumOperator" ng-options="choice for choice in data.configs[\'ActivityType\']" class="commSelect w100">\
            </select>\
            <input type="text" class="required gggg checked borderHighlight w50 mr5" autocomplete="off" name="sc16{{index}}" ng-model="joinActivityNum" max-integer="999"><span ng-show="isActivityMid"><span class="m">-</span>\
            <input type="text" autocomplete="off" name="sc17{{index}}" class="required hhhh checked borderHighlight w50 ml-1 mr5" max-integer="999" ng-model="joinActivityNumTwo">\
            </span>\
            </div>\
        </div>',

    scope: {
      index: '=',
      recentJoinTime: '=',
      joinCount: '=',
      screenType: '=',
      getValues: '='
    },

    controller: ['$scope', function($scope) {

      var defaultVal;
      $scope.contionLists = ['最近一次参与时间', '参与次数'];
      $scope.data = {
        "type": "时间选择",
        "configs": {
          "TimeSupportRelative": [
            "Support",
            "NotSupport"
          ],
          "DatetimeType": [
            "晚于",
            "早于",
            "介于"
          ],
          "ActivityType": [
            "大于",
            "大于等于",
            "等于",
            "小于等于",
            "小于",
            "介于"
          ]
        }
      };
      //打开节点，同时带有默认值
      $scope.dirValueListTime = [{"value": "月", "id": "0"}, {"value": "天", "id": "1"}, {"value": "秒", "id": "2"}];
      $scope.dirList = [{"value": "前", "id": "0"} /*{ "value": "后", "id": "1" }*/]; // 临时去掉后选项
      if ($scope.recentJoinTime) {
        defaultVal = $scope.recentJoinTime;
        $scope.operator = defaultVal.operator;
        $scope.stringInput = defaultVal.value || "";
        $scope.dateType = defaultVal.type || "absolutely";
        //TODO:
        $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == 'Support' ? false : true;

        if ($scope.dateType == "absolutely") {
          if ($scope.operator == "介于") {
            $scope.dateInput1 = defaultVal.value.split(',')[0];
            $scope.dateInput2 = defaultVal.value.split(',')[1];
          } else {
            $scope.dateInput1 = defaultVal.value;
          }
        } else if ($scope.dateType == "relatively") {
          var value = defaultVal;
          switch (value.dimension) {
            case '月':
              $scope.subType = '0';
              break;
            case '天':
              $scope.subType = '1';
              break;
            case '秒':
              $scope.subType = '2';
              break;
          }
          if ($scope.operator == "介于") {
            $scope.monthOrDayOrSecondInput1 = value.interval.split(',')[0];
            $scope.monthOrDayOrSecondInput2 = value.interval.split(',')[1];
            if ($scope.subType == '0') {
              $scope.dayInput1 = value.day.split(',')[0];
              $scope.dayInput2 = value.day.split(',')[1]
              $scope.timeInput1 = value.time.split(',')[0];
              $scope.timeInput2 = value.time.split(',')[1];
              $scope.numcount = 120;
            } else if ($scope.subType == '1') {
              $scope.timeInput1 = value.time.split(',')[0];
              $scope.timeInput2 = value.time.split(',')[1];
              $scope.numcount = 3650;
            } else if ($scope.subType == '2') {
              $scope.numcount = 6000;
            }
          } else {
            $scope.monthOrDayOrSecondInput1 = value.interval;
            if ($scope.subType == '0') {
              $scope.dayInput1 = value.day;
              $scope.timeInput1 = value.time;
              $scope.numcount = 120;
            } else if ($scope.subType == '1') {
              $scope.timeInput1 = value.time;
              $scope.numcount = 3650;
            } else if ($scope.subType == '2') {
              $scope.numcount = 6000;
            }
          }
        }

        $scope.activityNumOperator = $scope.joinCount.operator;

        if ($scope.activityNumOperator == "介于") {
          $scope.joinActivityNum = $scope.joinCount.value.split(',')[0];
          $scope.joinActivityNumTwo = $scope.joinCount.value.split(',')[1];

          // 大小转换
          if (parseFloat(scope.joinActivityNum) > parseFloat(scope.joinActivityNumTwo)) {
            var temp = scope.joinActivityNumTwo;
            scope.joinActivityNumTwo = scope.joinActivityNum;
            scope.joinActivityNum = temp;
          }
        } else {
          $scope.joinActivityNum = $scope.joinCount.value;
        }
      } else {
        //从服务器获取的值
        $scope.operator = $scope.data.configs['DatetimeType'][2];
        $scope.activityNumOperator = $scope.data.configs['ActivityType'][0];
        $scope.screenType = '最近一次参与时间';
        $scope.joinActivityNum = "";
        $scope.joinActivityNumTwo = "";
        $scope.dateType = "absolutely";
        $scope.dateInput1 = "";
        $scope.dateInput2 = "";
        //相对时间,默认'日'
        $scope.subType = '0';
        $scope.numcount = 120;
        //是否可以点击"相对时间""
        $scope.isRelativeDisable = $scope.data.configs && $scope.data.configs['TimeSupportRelative'][0] == "Support" ? false : true;
      }
    }],
    link: function(scope, elem, attrs, ctrl) {
      //选择框改变活动次数
      scope.$watch('activityNumOperator', function(val, oldVal) {
        //每次切换的时候清空
        elem.find('input').css('border', '1px solid #d9d9d9');
        if (oldVal != undefined && oldVal != val) {
          scope.joinActivityNum = '';
          scope.joinActivityNumTwo = '';
        }
        if (val == "介于") {
          scope.isActivityMid = true;
        } else {
          scope.isActivityMid = false;
        }
      });

      //选择框改变
      scope.$watch('operator', function(val, oldVal) {
        //每次切换的时候清空
        elem.find('input').css('border', '1px solid #d9d9d9');
        if (oldVal != undefined && oldVal != val) {
          if (scope.dateType == "absolutely") {
            clearDate1();
          } else {
            clearDate2();
          }
        }
        if (val == "介于") {
          scope.isMid = true;
        } else {
          scope.isMid = false;
        }
      });
      //切换参与次数选择框
      scope.$watch('screenType', function(val, oldVal) {
        //每次切换的时候清空
        elem.find('input').css('border', '1px solid #d9d9d9');
      });
      //绝对时间or相对时间
      scope.$watch('dateType', function(val, oldVal) {
        if (oldVal != undefined && oldVal != val) {
          if (val == "absolutely") {
            scope.operator = scope.data.configs['DatetimeType'][0];
            scope.subType = '0';
            clearDate1();
          } else if (val == "relatively") {
            scope.subType = '1';
            scope.operator = scope.data.configs['DatetimeType'][0];
            clearDate2();
          }
        }
      });
      scope.$watch('dateInput1', function(val, oldVal) {
        if (val) {
          elem.find('.datapicker1').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('dateInput2', function(val, oldVal) {
        if (val) {
          elem.find('.datapicker2').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('monthOrDayOrSecondInput1', function(val, oldVal) {
        if (val) {
          elem.find('.aaaa').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('dayInput1', function(val, oldVal) {
        if (val) {
          elem.find('.bbbb').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('timeInput1', function(val, oldVal) {
        if (val) {
          elem.find('.cccc').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('monthOrDayOrSecondInput2', function(val, oldVal) {
        if (val) {
          elem.find('.dddd').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('dayInput2', function(val, oldVal) {
        if (val) {
          elem.find('.eeee').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('timeInput2', function(val, oldVal) {
        if (val) {
          elem.find('.ffff').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('joinActivityNum', function(val, oldVal) {
        if (val) {
          elem.find('.gggg').css('border', '1px solid #d9d9d9');
        }
      })
      scope.$watch('joinActivityNumTwo', function(val, oldVal) {
        if (val) {
          elem.find('.hhhh').css('border', '1px solid #d9d9d9');
        }
      })
      //月,天,秒切换
      scope.$watch('subType', function(val, oldVal) {
        elem.find('input').css('border', '1px solid #d9d9d9');
        if (oldVal != undefined && oldVal != val) {
          clearDate2();
          switch (val) {
            //设置输入框最大整数
            case '0':
              scope.numcount = 120;
              break;
            case '1':
              scope.numcount = 3650;
              break;
            case '2':
              scope.numcount = 6000;
              break;
          }
        }
      });

      //获取保存到服务器的values
      scope.getValues = function() {
        var recentJoinTime = {};
        recentJoinTime.operator = scope.operator;
        if (scope.dateType == "absolutely") {
          recentJoinTime.type = "absolutely";
          if (scope.operator == "介于") {
            recentJoinTime.value = scope.dateInput1 + ',' + scope.dateInput2;
          } else {
            recentJoinTime.value = scope.dateInput1;
          }
        } else if (scope.dateType == "relatively") {
          recentJoinTime.type = "relatively";
          if (scope.operator == "介于") {
            recentJoinTime.interval = scope.monthOrDayOrSecondInput1 + ',' + scope.monthOrDayOrSecondInput2;
            if (scope.subType == '0') {
              recentJoinTime.dimension = '月';
              recentJoinTime.day = scope.dayInput1 + ',' + scope.dayInput2;
              recentJoinTime.time = scope.timeInput1 + ',' + scope.timeInput2;
            } else if (scope.subType == '1') {
              recentJoinTime.dimension = '天';
              recentJoinTime.time = scope.timeInput1 + ',' + scope.timeInput2;
            } else if (scope.subType == '2') {
              recentJoinTime.dimension = '秒';
            }
          } else {
            recentJoinTime.interval = scope.monthOrDayOrSecondInput1;
            if (scope.subType == '0') {
              recentJoinTime.dimension = '月';
              recentJoinTime.day = scope.dayInput1;
              recentJoinTime.time = scope.timeInput1;
            } else if (scope.subType == '1') {
              recentJoinTime.dimension = '天';
              recentJoinTime.time = scope.timeInput1;
            } else if (scope.subType == '2') {
              recentJoinTime.dimension = '秒';
            }
          }
        }
        var joinCount = {};
        joinCount.operator = scope.activityNumOperator;
        if (scope.activityNumOperator == "介于") {
          // 大小转换
          if (parseFloat(scope.joinActivityNum) > parseFloat(scope.joinActivityNumTwo)) {
            var temp = scope.joinActivityNumTwo;
            scope.joinActivityNumTwo = scope.joinActivityNum;
            scope.joinActivityNum = temp;
          }
          joinCount.value = scope.joinActivityNum + "," + scope.joinActivityNumTwo;
        } else {
          joinCount.value = scope.joinActivityNum;
        }
        ;
        return {
          recentJoinTime: recentJoinTime,
          joinCount: joinCount
        };
      };

      //重置操作
      scope.reset = function() {
        clearDate1()
        clearDate2()
      }

      //绝对时间清除操作
      function clearDate1() {
        scope.dateInput1 = '';
        scope.dateInput2 = '';
      }

      //相对时间清除操作
      function clearDate2() {
        scope.timeInput1 = '';
        scope.timeInput2 = '';
        scope.dayInput1 = '';
        scope.dayInput2 = '';
        scope.monthOrDayOrSecondInput1 = '';
        scope.monthOrDayOrSecondInput2 = '';
      }

      //相对时间天or月选择
      function clearDate3() {
        scope.timeInput1 = '';
        scope.timeInput2 = '';
        scope.dayInput1 = '';
        scope.dayInput2 = '';
      }
    }
  }
}]);

//翻页点击数字
campaginDirectives.directive("paginator", [function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: CAMPAIGN_STATIC.tplBasePath + "view/partitionPager.html",
    scope: {
      total: '@total',
      offset: '@offset',
      fetchs: '&fetchs'
    },
    link: function(scope, element, attr) {
      var lastValue = 1;
      scope.$watch('total', function() {
        getPageNumbers();
      });
      scope.$watch('offset', function() {
        getPageNumbers();
      });
      scope.go = function(someWhere) {

        switch (typeof someWhere) {
          case 'number': {
            if (someWhere !== scope.offset) {
              scope.offset = someWhere;
              scope.fetchs({offset: scope.offset});
            }
            break;
          }
          case 'string': {
            if (someWhere === 'next') {
              if (Number(scope.offset) < Number(scope.total)) {
                scope.offset++;
                scope.fetchs({offset: scope.offset});

              }
            }
            if (someWhere === 'previous') {
              if (scope.offset > 1) {
                scope.offset--;
                scope.fetchs({offset: scope.offset});
              }
            }
            break;
          }
          default:
            break;
        }
        lastValue = scope.offset
      }
      function getPageNumbers() {
        var total = Number(scope.total);
        var offset = Number(scope.offset);
        var frontDots = (offset - 1) > 4 && total > 9; //is show front dots ? true -> show, false -> not show
        var endDots = (total - offset) > 4 && total > 9;// is show end dots? true-> show, false-> not show
        var fullPageArray = [];
        for (var i = 1; i <= total; i++) {
          fullPageArray.push({
            value: i,
            isCurrent: i === offset,
            isDot: false
          });
        }
        if (frontDots) {
          fullPageArray.splice(1, Math.min(total - 8, offset - 4), {
            value: '...',
            isCurrent: false,
            isDot: true
          })
        }
        if (endDots) {
          var start =
            fullPageArray.splice(7, Math.min(total - 8, total - offset - 3), {
              value: '...',
              isCurrent: false,
              isDot: true
            })
        }
        //console.log(fullPageArray)
        scope.pageNumbers = fullPageArray;
      }
    }
  }
}]);
// 节点底部统计组件
campaginDirectives.directive('bottomCount', ['$compile', function($compile) {
  return {
    restrict: 'EA',
    template: '<div class="node-count">\
                        <div class="count-button" ng-show="!count.loading">\
                            <span class="button" ng-click="count.startCount()">统计人数</span>\
                            <span class="result">{{count.number}}</span>\
                        </div>\
                        <div class="count-loading-wrap" ng-show="count.loading">\
                            <div class="count-loading-content">\
                                <div class="count-loading"><span class="count-loading-img"></span><div>统计中</div></div>\
                                <div class="count-loading-tip">（如果统计时间过长，可终止统计并测试执行活动查看结果）</div>\
                                <div class="count-stop" ng-click="count.stopCount()">终止统计</div>\
                            </div>\
                        </div>\
                   </div>',
    scope: {
      getNumber: '=',
      stopNumber: '='
    },
    controller: ['$scope', function($scope) {

      var timeHandler = null;

      $scope.count = {
        loading: false,
        number: '',
        startCount: function() {
          // 获取人数
          getNumber();

          function getNumber() {
            var status = $scope.getNumber(function(data) {
              if (data.count == -1) {
                clearTimeout(timeHandler);
                timeHandler = setTimeout(getNumber, 5000);
                $scope.count.loading = true;
              } else {
                $scope.count.loading = false;
                $scope.count.number = data.count;
              }
            }, function(data) {
              clearTimeout(timeHandler);
              $scope.count.loading = false;
              $scope.count.number = '';
            });

            if (status) {
              $scope.count.loading = true;
            } else {
              $scope.count.loading = false;
            }
          }
        },
        stopCount: function() {
          // 终止统计
          clearTimeout(timeHandler);
          $scope.stopNumber(function(data) {
            $scope.count.loading = false;
            $scope.count.number = '';
          }, function(data) {
            $scope.count.loading = false;
            $scope.count.number = '';
          });
        }
      }
    }],
    link: function(scope, ele, attrs) {
      //将加载框动态加载到弹框直接子元素
      var countLoadingContent = $('.node-count .count-loading-wrap').remove().html();
      var newCountLoadingContent = $compile("<div class='count-loading-wrap' ng-show='count.loading' data='{{count.loading}}'>" + countLoadingContent + "</div>")(scope);
      $('#nodeContent').append(newCountLoadingContent);
    }
  }
}]);

