angular.module("campaign.controllers").controller('timeNodeCtrl', ['$scope', '$location', '$http', 'saveService', 'getListService',
  function($scope, $location, $http, saveService, getListService) {
    //时间节点 默认值
    $scope.week_form = "week_form";
    $scope.byDay = true;
    $scope.byWeek = true;
    $scope.byMonth = true;
    $scope.saveChecked = true;
    $scope.Timenode = {};
    $scope.model = {};
    $scope.Timenode.id = graph.nodeId;
    $scope.data = {};
    $scope.Timenode.name = "时间节点";
    $scope.Timenode.executionType = "0";
    // $scope.Timenode.executionType= "0";
    $scope.Timenode.cycleDay = 1;
    $scope.Timenode.cycleWeek = 1;
    $scope.Timenode.cycleMonth1 = 1;
    $scope.Timenode.cycleMonth2 = 1;
    $scope.Timenode.repeats = 1
      // $scope.Timenode.cycleMonthType = "0"
    $scope.Timenode.day = [];
    $scope.Timenode.days = [];
    $scope.Timenode.monthBegin = [];
    $scope.Timenode.monthBegin0 = [];
    $scope.Timenode.monthEnd = [];
    $scope.Timenode.monthEnd0 = [];

    //判断备注信息是否显示
    $scope.comments = false;
    $scope.week = false;
    $scope.circleChecked = false;
    $scope.monthstart = false;
    //正常大小弹出框
    $scope.node_class = 'node';
    //判断备注信息是否显示
    $scope.showOrHidecomments = function() {
        if ($scope.comments) {
          $scope.comments = false;
        } else {
          $scope.comments = true;
        }
      }
      //判断月份表是否显示
    $scope.showOrHideMonth = function(monthTime) {
      if (monthTime == 'monthstart') {
        if ($scope.monthstart) {
          // $scope.monthstart = false;
        } else {
          $scope.monthstart = true;
        }

      } else if (monthTime == 'monthend') {
        if ($scope.monthend) {
          // $scope.monthend = false;
        } else {
          $scope.monthend = true;
        }

      }
    }
    $scope.monthSave = function(monthTime) {
        if (monthTime == 'monthstart') {
          if ($scope.monthstart) {
            $scope.monthstart = false;
          } else {
            $scope.monthstart = true;
          }
          $scope.Timenode.monthBegin = $scope.Timenode.monthBegin0.join(",");
          if ($scope.Timenode.monthBegin.length > 18) {
            $scope.monthBeginShow = $scope.Timenode.monthBegin.substring(0, 18) + "..."
          } else {
            $scope.monthBeginShow = $scope.Timenode.monthBegin;
          }
        } else if (monthTime == 'monthend') {
          if ($scope.monthend) {
            $scope.monthend = false;
          } else {
            $scope.monthend = true;
          }
          // 除去firefox 空白
          for (var i = 0; i < $scope.Timenode.monthEnd0.length; i++) {
            $scope.Timenode.monthEnd0[i] = $scope.Timenode.monthEnd0[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          }
          $scope.Timenode.monthEnd = $scope.Timenode.monthEnd0.join(",");
          if ($scope.Timenode.monthEnd.length > 18) {
            $scope.monthEndShow = $scope.Timenode.monthEnd.substring(0, 18) + "..."
          } else {
            $scope.monthEndShow = $scope.Timenode.monthEnd;
          }
        }
      }
      //选择月 的多选日期
    $scope.proSelect = function(e) {
      var obj = e.target || e.srcElement;
      var index;
      if (!/cur_color/.test(obj.className)) {
        obj.className = "cur cur_color_start";
        $scope.Timenode.monthBegin0.push(obj.textContent.trim());
      } else {
        var pos = $scope.Timenode.monthBegin0.indexOf(obj.textContent.trim());
        $scope.Timenode.monthBegin0.splice(pos, 1);
        obj.className = 'cur'
      }

    }
    $scope.proSelect2 = function(e) {
        var obj = e.target || e.srcElement;
        var index;
        if (!/cur_color/.test(obj.className)) {
          obj.className = "cur cur_color_end";
          $scope.Timenode.monthEnd0.push(obj.innerText || obj.textContent);
        } else {
          var pos = $scope.Timenode.monthEnd0.indexOf(obj.innerText || obj.textContent);
          $scope.Timenode.monthEnd0.splice(pos, 1);
          obj.className = 'cur'
        }

      }
      //弹出框最大化
    $scope.bigNode = function() {

        if ($scope.node_class == 'node') {
          $scope.node_class = 'big_node';
        } else {
          $scope.node_class = 'node';
        }
      }
      //弹出周的选择框
    $scope.$watch('Timenode.cycleType', function() {
      if ($scope.Timenode.cycleType == '1') {
        $scope.week = true;
      } else {
        $scope.week = false
      }
      if ($scope.Timenode.cycleType == '2') {
        if (!$scope.Timenode.cycleMonthType) {
          $scope.Timenode.cycleMonthType = 0;
        }
      } else {}

    });
    $scope.$watch('Timenode.day.length', function() {
      if ($scope.Timenode.day) {
        if ($scope.Timenode.day.length != 0) {
          $scope.week_form = "week_form";
        }
      }
    });
    $scope.$watch('Timenode.monthBegin.length', function() {
      if ($scope.Timenode.day) {
        if ($scope.Timenode.monthBegin.length != 0) {
          $scope.warn = "";
        }
      }
    });
    $scope.$watch('Timenode.monthEnd.length', function() {
      if ($scope.Timenode.day) {
        if ($scope.Timenode.monthEnd.length != 0) {
          $scope.warn_end = "";
        }
      }
    });
    $scope.$watch('Timenode.cycleMonthType', function() {
      if ($scope.Timenode.cycleMonthType == 0) {
        $scope.monthend = false;
      }
    });
    $scope.weekDelect = function(num) {
        if (num == 1) {
          $scope.monthstart = false;
        } else {
          $scope.monthend = false;
        }
      }
      // iso8601的时间格式  年月日
    $scope.iso = function(data) {
      var month = data.getMonth();
      month = month + 1;
      if (month < 10) {

        month = "0" + month;
      }
      var date_now = data.getDate();
      if (date_now < 10) {
        date_now = "0" + date_now;
      }
      var time = data.getFullYear() + "-" + month + "-" + date_now
      return time;
    }

    //周期性选项设置成灰色
    $scope.$watch('Timenode.executionType', function() {
      if ($scope.Timenode.executionType == '2') {

        if (!$scope.Timenode.cycleType) {
          $scope.Timenode.cycleType = "0";
        }
        if (!$scope.Timenode.cycleEndType) {
          $scope.Timenode.cycleEndType = 0;
        }
        $scope.circleChecked = false;
        if (!$scope.Timenode.cycleBegin) {
          var endData = new Date();
          var now = endData.getDate();
          now = now + 1;
          endData.setDate(now);
          var Month = endData.getMonth() + 1;
          if (Month < 10) {
            Month = "0" + Month;
          }
          var minutes = endData.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var date = endData.getDate();
          if (date < 10) {
            date = "0" + date;
          }
          var hour = endData.getHours();
          if (hour < 10) {
            hour = "0" + hour;
          }
          time = endData.getFullYear() + "-" + Month + "-" + date + " " + hour + ":" + minutes;
          $scope.Timenode.cycleBegin = time;
        }
      } else if ($scope.Timenode.executionType == '1') {
        $scope.circleChecked = true;
        if (!$scope.Timenode.fixedBegin) {
          var endData = new Date();
          var now = endData.getDate();
          endData.setDate(now);
          var Month = endData.getMonth() + 1;
          if (Month < 10) {
            Month = "0" + Month;
          }
          var minutes = endData.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var date = endData.getDate();
          if (date < 10) {
            date = "0" + date;
          }
          var hour = endData.getHours();
          if (hour < 10) {
            hour = "0" + hour;
          }
          time = endData.getFullYear() + "-" + Month + "-" + date + " " + hour + ":" + minutes;
          $scope.Timenode.fixedBegin = time;
        }
      } else {
        $scope.circleChecked = true;

      }
    });
    $scope.$watch('Timenode.cycleEndType', function() {
      if ($scope.Timenode.cycleEndType == '2') {
        if (!$scope.Timenode.cycleEnd) {
          var endData = new Date();
          var now = endData.getDate();
          now = now + 1;
          endData.setDate(now);
          var Month = endData.getMonth() + 1;
          if (Month < 10) {
            Month = "0" + Month;
          }
          var minutes = endData.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var date = endData.getDate();
          if (date < 10) {
            date = "0" + date;
          }
          var hour = endData.getHours();
          if (hour < 10) {
            hour = "0" + hour;
          }
          time = endData.getFullYear() + "-" + Month + "-" + date + " " + hour + ":" + minutes;
          $scope.Timenode.cycleEnd = time;
        }
      }
    });
    $scope.$watch('Timenode.cycleType',
        function() {
          if ($scope.Timenode.cycleType == "0") {
            $scope.byDay = false;
            $scope.byWeek = true;
            $scope.byMonth1 = true;
            $scope.byMonth2 = true;
          } else if ($scope.Timenode.cycleType == "1") {
            $scope.byWeek = false;
            $scope.byDay = true;
            $scope.byMonth1 = true;
            $scope.byMonth2 = true;
          } else if ($scope.Timenode.cycleType == "2") {
            $scope.byMonth1 = false;
            $scope.byMonth2 = true;
            $scope.byDay = true;
            $scope.byWeek = true;
          }
        })
      //周期性开始时间和结束时间的判定
      //$scope.$watch('runStartTime', function () {
      //    $scope.$apply($('#endtime').datepicker({ minDate: $('#starttime').datepicker('getDate') }));
      //});
    $scope.saveTimeNode = function() {
        $scope.check = false;
        if ($scope.Timenode.name) {
          if ($scope.Timenode.day) {
            if ($scope.Timenode.day.constructor === Array) {
              if (!$scope.Timenode.days) {
                $scope.Timenode.days = [];
              }
              for (i = 0; i < $scope.Timenode.day.length; i++) {
                if ($scope.Timenode.day[i] == true) {
                  $scope.Timenode.days.push(i);
                }
              }
              //for (x in $scope.Timenode.day) {
              //    $scope.Timenode.days.push(x);
              //}
              $scope.Timenode.days = $scope.Timenode.days.join(",")
            }

            if ($scope.Timenode.days.length == 0) {
              $scope.Timenode.days = undefined;
            }
          }
          //验证
          if ($scope.Timenode.executionType == '2' && $scope.Timenode.cycleType == '1' && !$scope.Timenode.days) {

            $scope.week_form = "week_form_warning";
            $scope.check = true;
          }
          if ($scope.Timenode.executionType == '2' && $scope.Timenode.cycleType == '2' && $scope.Timenode.monthBegin.length == 0 && $scope.Timenode.cycleMonthType == 0) {

            $scope.warn = "warning";
            $scope.check = true;
          }
          if ($scope.Timenode.executionType == '2' && $scope.Timenode.cycleType == '2' && $scope.Timenode.monthEnd.length == 0 && $scope.Timenode.cycleMonthType == 1) {

            $scope.warn_end = "warning";
            $scope.check = true;
          }

          if (!$scope.check) {
            $scope.Timenode.remark = $scope.nodecomment;
            $scope.Timenode.monthBegin0 = undefined;
            $scope.Timenode.monthEnd0 = undefined;
            if ($scope.Timenode.monthBegin != undefined) {
              if ($scope.Timenode.monthBegin.length == 0) {
                $scope.Timenode.monthBegin = undefined;
              }
            }
            if ($scope.Timenode.monthEnd != undefined) {
              if ($scope.Timenode.monthEnd.length == 0) {
                $scope.Timenode.monthEnd = undefined;
              }
            }
            //  $scope.msgNewData.msgreceiver = $scope.msgNewData.msgreceiver.join(",")
            //拆分定时一次性执行时间
            if ($scope.Timenode.cycleBegin) {
              $scope.Timenode.cycleBeginDate = $scope.Timenode.cycleBegin.split(" ")[0];
              $scope.Timenode.cycleBeginTime = $scope.Timenode.cycleBegin.split(" ")[1];
              //   $scope.Timenode.cycleBegin = undefined;
            }
            //拆分开始时间
            if ($scope.Timenode.fixedBegin) {
              $scope.Timenode.fixedBeginDate = $scope.Timenode.fixedBegin.split(" ")[0];
              $scope.Timenode.fixedBeginTime = $scope.Timenode.fixedBegin.split(" ")[1];
              $scope.Timenode.fixedBegin = undefined;
            }
            //拆分结束时间
            if ($scope.Timenode.cycleEnd) {
              $scope.Timenode.cycleEndDate = $scope.Timenode.cycleEnd.split(" ")[0];
              $scope.Timenode.cycleEndTime = $scope.Timenode.cycleEnd.split(" ")[1];
              // $scope.Timenode.cycleEnd = undefined;
            }

            $scope.Timenode.day = undefined;
            var callback = function(d) {
                $scope.editNodeName(d.id, d.name, $scope.nodecomment);
                $("#nodeContent").hide();
                $(".yunat_maskLayer").remove();
                $(this).yAlert({
                  "text": "保存成功"
                });
                removeAlert();
              }
              //向后台传递参数
            if ($scope.Timenode.executionType == "0") {
              $scope.Timenode.cycleDay = undefined;
              $scope.Timenode.cycleType = undefined;
              $scope.Timenode.cycleMonthType = undefined;
              $scope.Timenode.cycleWeek = undefined;
              $scope.Timenode.days = undefined;

            } else if ($scope.Timenode.executionType == "1") {
              $scope.Timenode.cycleDay = undefined;
              $scope.Timenode.cycleType = undefined;
              $scope.Timenode.cycleMonthType = undefined;
              $scope.Timenode.cycleWeek = undefined;
              $scope.Timenode.days = undefined;
            } else {

            }
            if ($scope.Timenode.name) {
              $scope.model.name = $scope.Timenode.name;
            }
            if ($scope.Timenode.remark) {
              $scope.model.remark = $scope.Timenode.remark;
            }
            if ($scope.Timenode.id) {
              $scope.model.id = $scope.Timenode.id;
            }
            if ($scope.Timenode.executionType == 0) {
              $scope.model.executionType = $scope.Timenode.executionType;
            }
            if ($scope.Timenode.executionType == 1) {
              $scope.model.executionType = $scope.Timenode.executionType;
              $scope.model.fixedBeginDate = $scope.Timenode.fixedBeginDate;
              $scope.model.fixedBeginTime = $scope.Timenode.fixedBeginTime;
            }
            if ($scope.Timenode.executionType == 2) {
              $scope.model.executionType = $scope.Timenode.executionType;
              $scope.model.cycleType = $scope.Timenode.cycleType;
              $scope.model.cycleBeginDate = $scope.Timenode.cycleBeginDate;
              $scope.model.cycleBeginTime = $scope.Timenode.cycleBeginTime;
              $scope.model.cycleEndType = $scope.Timenode.cycleEndType;
              if ($scope.model.cycleEndType == 1) {
                $scope.model.repeats = $scope.Timenode.repeats;
              }
              if ($scope.model.cycleEndType == 2) {
                $scope.model.cycleEndDate = $scope.Timenode.cycleEndDate;
                $scope.model.cycleEndTime = $scope.Timenode.cycleEndTime;
              }

              if ($scope.Timenode.cycleType == 0) {
                $scope.model.cycleDay = $scope.Timenode.cycleDay;
              } else if ($scope.Timenode.cycleType == 1) {
                $scope.model.cycleWeek = $scope.Timenode.cycleWeek;
                $scope.model.days = $scope.Timenode.days;
              } else if ($scope.Timenode.cycleType == 2) {
                $scope.model.cycleMonthType = $scope.Timenode.cycleMonthType;
                if ($scope.model.cycleMonthType == 0) {
                  $scope.model.cycleMonth1 = $scope.Timenode.cycleMonth1;
                  $scope.model.monthBegin = $scope.Timenode.monthBegin;
                }
                if ($scope.model.cycleMonthType == 1) {
                  $scope.model.cycleMonth2 = $scope.Timenode.cycleMonth2;
                  $scope.model.monthEnd = $scope.Timenode.monthEnd;
                }
              }

            }
            if ($scope.model.cycleEndDate && $scope.Timenode.executionType == 2) {
              //$scope.model.cycleEnd = $scope.model.cycleEndDate +" "+ $scope.model.cycleEndTime;
              //$scope.model.cycleBegin = $scope.model.cycleBeginDate + " " + $scope.model.cycleBeginTime;
              var begin = parseInt($scope.model.cycleBeginDate.replace("-", "").replace("-", "") + $scope.model.cycleBeginTime.replace(":", ""));
              var end = parseInt($scope.model.cycleEndDate.replace("-", "").replace("-", "") + $scope.model.cycleEndTime.replace(":", ""));
              if (begin > end) {
                $(this).Alert({
                  "title": "提示",
                  "str": "保存失败，结束时间不早于开始时间",
                  "mark": true
                });
                //$scope.Timenode.cycleBegin = $scope.model.cycleBegin
                //$scope.Timenode.cycleEnd = $scope.model.cycleEnd
              } else {
                $scope.model.name = $scope.model.name;
                saveService.timeNode(callback, //callback
                  $scope.model, //表单数据
                  function() {
                    $scope.Timenode.day = [];
                    $scope.Timenode.days = [];
                    $scope.Timenode.monthBegin = [];
                    $scope.Timenode.monthBegin0 = [];
                    $scope.Timenode.monthEnd = [];
                    $scope.Timenode.monthEnd0 = [];
                  }
                )
              }

            } else {
              $scope.model.name = $scope.model.name;
              saveService.timeNode(callback, //callback
                $scope.model, //表单数据
                function() {
                  $scope.Timenode.day = [];
                  $scope.Timenode.days = [];
                  $scope.Timenode.monthBegin = [];
                  $scope.Timenode.monthBegin0 = [];
                  $scope.Timenode.monthEnd = [];
                  $scope.Timenode.monthEnd0 = [];
                }
              )
            }
          }
        }
      }
      //$scope.addMarket = function () {
      //    // $scope.addMarketTpl = "view/timeNode.html?_=" + new Date().getTime();
      //    $("#nodetime").addInteractivePop({ magTitle: "", mark: true, drag: true, position: "fixed" });
      //}
      //$scope.addMarket();
      //获取时间节点信息
    $scope.getTimeNode = function() {
      //  $scope.msgNewData.msgreceiver = $scope.msgNewData.msgreceiver.join(",")
      $scope.cur = "cur";
      var callback = function(d) {
        if (d) {
          $scope.Timenode = d;
        }
        if (!$scope.Timenode.name) {
          $scope.Timenode.name = "时间节点"
        } else {
          $scope.Timenode.name = $scope.Timenode.name;
        }
        if (!$scope.Timenode.cycleDay) {
          $scope.Timenode.cycleDay = 1;
        }
        if (!$scope.Timenode.cycleWeek) {
          $scope.Timenode.cycleWeek = 1;
        }
        if (!$scope.Timenode.cycleMonth1) {
          $scope.Timenode.cycleMonth1 = 1;
        }
        if (!$scope.Timenode.cycleMonth2) {
          $scope.Timenode.cycleMonth2 = 1;
        }
        if (!$scope.Timenode.repeats) {
          $scope.Timenode.repeats = 2;
        }
        $scope.Timenode.monthBegin0 = [];
        $scope.Timenode.monthEnd0 = [];
        $scope.nodecomment = $scope.Timenode.remark
        if (!$scope.Timenode.monthBegin) {
          $scope.Timenode.monthBegin = [];
        } else {
          $scope.Timenode.monthBegin0 = $scope.Timenode.monthBegin.split(",");
          for (i = 0; i < $scope.Timenode.monthBegin0.length; i++) {
            var j = $scope.Timenode.monthBegin0[i];
            $("#monthBegin" + j + "").addClass("cur_color_start");
          }
          if ($scope.Timenode.monthBegin.length > 18) {
            $scope.monthBeginShow = $scope.Timenode.monthBegin.substring(0, 18) + "..."
          } else {
            $scope.monthBeginShow = $scope.Timenode.monthBegin;
          }
        }
        if (!$scope.Timenode.monthEnd) {
          $scope.Timenode.monthEnd = [];
        } else {
          $scope.Timenode.monthEnd0 = $scope.Timenode.monthEnd.split(",");
          for (i = 0; i < $scope.Timenode.monthEnd0.length; i++) {
            var j = $scope.Timenode.monthEnd0[i];
            $("#monthEnd" + j + "").addClass("cur_color_start");
          }
          if ($scope.Timenode.monthEnd.length > 18) {
            $scope.monthEndShow = $scope.Timenode.monthEnd.substring(0, 18) + "..."
          } else {
            $scope.monthEndShow = $scope.Timenode.monthEnd;
          }

        }
        if (!$scope.Timenode.days) {
          $scope.Timenode.days = [];
        }
        if (!$scope.Timenode.day) {
          $scope.Timenode.day = [];
        }

        if ($scope.Timenode.cycleBeginDate) {
          $scope.Timenode.cycleBeginDate = $scope.iso(setISO($scope.Timenode.cycleBeginDate));
          $scope.Timenode.cycleBegin = $scope.Timenode.cycleBeginDate + " " + $scope.Timenode.cycleBeginTime;
        }
        //拆分开始时间
        if ($scope.Timenode.fixedBeginDate) {
          $scope.Timenode.fixedBeginDate = $scope.iso(setISO($scope.Timenode.fixedBeginDate));
          $scope.Timenode.fixedBegin = $scope.Timenode.fixedBeginDate + " " + $scope.Timenode.fixedBeginTime;
        }
        //拆分结束时间
        if ($scope.Timenode.cycleEndDate) {
          $scope.Timenode.cycleEndDate = $scope.iso(setISO($scope.Timenode.cycleEndDate));
          $scope.Timenode.cycleEnd = $scope.Timenode.cycleEndDate + " " + $scope.Timenode.cycleEndTime;
        }
        if ($scope.Timenode.days.length != 0) {
          $scope.Timenode.day = [];
          $scope.Timenode.day = $scope.Timenode.days.split(",");
          var arr = $scope.Timenode.day;
          $scope.Timenode.day = [];
          for (i = 0; i < arr.length; i++) {
            $scope.Timenode.day[arr[i]] = true
          }
          $scope.Timenode.days = [];
        }
      }
      $scope.Timenode.id = graph.nodeId;
      getListService.getTimeNode(callback, //callback
        $scope.Timenode //表单数据
      )

      getListService.getNodeTipsByType(function(responseTips) { // 获取tips
        $scope.timeNodeTips = responseTips.tips || "";
      }, "tflowtime");

    }
    $scope.getTimeNode();
    $scope.up = function(model) {}
      //num_up
    $scope.openNodePop(); //显示节点弹出框
  }
]);
