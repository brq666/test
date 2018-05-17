var jobRefreshTimer = null;
var campRefreshTimer = null;
/*添加变量阻塞测试终止按钮多次点击问题
 *@author:Peach-Tao
 *@time:2014-08-01
 */
var checkStopButtonStatus = true;
/*end*/

var exeuteFlow = (function() {
  clearTimeout(campRefreshTimer);
  clearTimeout(jobRefreshTimer);
  //周期性活动
  function showExecuteList(list) {
    /*if (execute_list.length != list.length) {
     execute_list = list;
     $("#periodicExecution select").show().children().remove();
     // $("#periodicExecution select").append('<option>---选择执行周期---</option>');
     for (var i = 0; i < execute_list.length; i++) {
     var plantime = setISO(execute_list[i].plantime, "all");
     var $option = $('<option class="executedStatusIcon_' + execute_list[i].jobStatus + '" value="' + execute_list[i].jobId + '">' + plantime + '</option>')
     $("#periodicExecution select").append($option);
     }
     if (!graph.showJobList) {
     $("#periodicExecution select").hide();
     }
     }
     // add icon if selected option has a one
     $("#periodicExecution select").change(function () {
     $(this).removeClass().addClass("commSelect " + $(this.selectedOptions[0]).attr("class"));
     });*/
    if (graph.execute_list.length != list.length) {
      graph.execute_list = list;
      $("#periodicExecution #al_dropDown").show().children().remove();
      // $("#periodicExecution select").append('<option>---选择执行周期---</option>');
      $("#periodicExecution #al_dropDown").append('<span><a></a></span><ul></ul>');
      for (var i = 0; i < graph.execute_list.length; i++) {
        var plantime = setISO(graph.execute_list[i].plantime, "all");
        if (i == 0) {
          $("#periodicExecution #al_dropDown span").empty().append(plantime + '<a></a>').addClass("executedStatusIcon_" + graph.execute_list[i].jobStatus);
        }
        var $option = $('<li class="executedStatusIcon_' + graph.execute_list[i].jobStatus + '" data-value="' + graph.execute_list[i].jobId + '">' + plantime + '</li>');
        $("#periodicExecution #al_dropDown ul").append($option);
      }
      if (!graph.showJobList) {
        $("#periodicExecution #al_dropDown").hide();
      }
    }
    // add icon if selected option has a one
    $("#periodicExecution #al_dropDown li").click(function() {
      $("#periodicExecution #al_dropDown span").removeClass().addClass($(this).attr("class")).attr("data-value",$(this).attr("data-value")).html($(this).text()+"<a></a>");
    });
  }

  //刷新活动状态和节点状态
  //    function refreshCamp(jobList) {
  //
  //    }
  //刷新节点状态
  function refreshJob() {
    //var dtd = $.Deferred();
    if (flow.curRunCampJobid != graph.campJobid) {
      flow.refreshJoblatest_data = 0;
    }
    $.ajax({
      url: GLOBAL_STATIC.campaignRoot + "campaign/schedule/status/job/" + graph.campJobid + "?data_from=" + flow.refreshJoblatest_data,
      //async: false,
      type: "GET",
      cache: false,
      dataType: "json",
      success: function(res) {
        $(".reset_Runnode").addClass("disalbe_reset"); // 禁用重试节点按钮
        flow.curRunCampJobid = res.jobId;
        graph.jobStatus = res.jobStatus;
        var subjobList = res.subjobList;
        var loadCells = [];
        var parent = graph.getDefaultParent();
        var childCount = graph.model.getChildCount(parent);
        for (var i = 0; i < childCount; i++) {
          var siblingsCell = graph.model.getChildAt(parent, i);
          if (siblingsCell.vertex) {
            var style = siblingsCell.getStyle().split(";")[0];
            if (style && style == "loading") {
              loadCells.push(siblingsCell);
            }
          }
        }
        if (loadCells.length > 0) {
          for (var j = 0; j < loadCells.length; j++) {
            var deleteFlag = false;
            for (var k = 0; k < subjobList.length; k++) {
              if (((loadCells[j].id).indexOf(subjobList[k].nodeId) != -1)) {
                deleteFlag = true;
              }
            }
            if (deleteFlag) {
              graph.removeCells([loadCells[j]], false);
            }
          }
        }
        /*测试执行——>正式执行 清除所有数据*/
        if (flow.refreshJoblatest_data == 0) {
          for (var j = 0; j < childCount; j++) {
            if (parent.children[j] && parent.children[j].value) { // 节点才清除
              var cell = graph.getModel().getCell(parent.children[j].id);
              var overlays = graph.getCellOverlays(cell);
              if (cell.children !== null) {
                graph.removeCells(cell.children, false);
              }
              graph.removeCellOverlays(cell);
            }
          }
        }
        /*end*/
        for (var i = 0; i < subjobList.length; i++) {
          //更新节点状态前初始化
          var cell = graph.getModel().getCell(subjobList[i].nodeId);
          if(!cell) continue;
          var overlays = graph.getCellOverlays(cell);
          if (cell.children !== null) {
            graph.removeCells(cell.children, false);
          }
          graph.removeCellOverlays(cell);
          //更新节点状态
          if (subjobList[i].subjobStatus == 11 || subjobList[i].subjobStatus == 19) {
            var x = cell.geometry.x;
            var y = cell.geometry.y;
            var loadId = "loading_" + subjobList[i].nodeId;
            mxGraphCells.addVertex(loadId, null, x, y, 64, 64, "loading;image=" + GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/node-loadingState.gif;imageWidth=64;imageHeight=64", true);
            var loadcell = graph.getModel().getCell(loadId);
            graph.orderCells("back", [loadcell]);
          } else {
            if (displayNothing(subjobList[i].subjobStatus) == true) {} else {
              cell.flowValidationNotPass = false;
              var statusImg = getStatusImageByStatus(subjobList[i].subjobStatus);
              var planTime = setISO(subjobList[i].planTime, "all");
              var startTime = setISO(subjobList[i].startTime, "all");
              var endTime = setISO(subjobList[i].endTime, "all");
              var duration = subjobList[i].duration;
              var tips = subjobList[i].tips;
              var html = (subjobList[i].subjobStatus != 9) ? getStatusInfo(planTime, startTime, endTime, duration, tips) : (subjobList[i].tips || ""); //9—节点排队中提示语
              var overlay = new mxCellOverlay(new mxImage(statusImg, 14, 14), html, "left", "top", {
                x: 70,
                y: 68
              });
              graph.addCellOverlay(cell, overlay);
            }

          }
          //显示查询人数结果
          var label = graph.insertVertex(cell, "children_" + subjobList[i].nodeId, subjobList[i].header, 0.5, -0.3, 0, 0, null, true);
          label.setConnectable(false);
        }
        if (flow.isJobRunning(graph.jobStatus)) {
          flow.refreshJoblatest_data = res.latest_data || 0;
          clearTimeout(jobRefreshTimer);
          jobRefreshTimer = window.setTimeout(function() {
                refreshJob()
              },
              10000)
        }
      },
      error: function(res) {
        var responseText = res.responseText;
        var data = $.parseJSON(responseText);
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      }
    })
  }

  //根据活动状态更新界面元素 --工具栏
  //    function updateUIByCampStatusTest(){
  //        $.when(graph.camp_EditPermissions(),exeuteFlow.getCampStatus()).done(updateUIByCampStatus(graph.campStatus, graph.showReport))
  //    }
  //    updateUIByCampStatusTest();
  //    function updateUIByCampStatus(campStatus, showReport) {
  //
  //    }
  //    function updateUIByCampStatus(campStatus, showReport) {
  //
  //    }

  var flow = {
    //获取活动状态
    "init": function() {
      this.campRefreshAgain();
    },
    //判断活动是否正在执行中
    "isCampRunning": function(campStatus) {
      if (campStatus == "B1" || campStatus == "B2" || campStatus == "B3") {
        return true;
      }
      return false;
    },
    //判断Job是否正在执行中
    "isJobRunning": function(jobStatus) {
      if (jobStatus == 21 || jobStatus == 22 || jobStatus == 23) {
        return false;
      }
      return true;
    },
    "updateUIByCampStatus": function(campStatus, showReport) {

      var curStatusValue = "";
      $("#exeute > a").addClass("disalbe_execute");
      if (showReport == true) {
        $("#viewReport").removeClass();
      }
      if (campStatus == "A1") {
        checkStopButtonStatus = true;
        $("#test_execute").removeClass().addClass("start_test_execution").find("span").text("测试执行");
        if (graph.isRemark) {
          $(".submit_approval").removeClass("disalbe_execute");
        }
        if (!graph.isRemark && !graph.isApprover) {
          $("#test_execute").addClass("disalbe_execute");
        }
      } else if (campStatus == "B1") {
        $("#test_execute").removeClass().addClass("stop_test_execution").find("span").text("中止执行");
        if (!graph.isRemark && !graph.isApprover) {
          $("#test_execute").addClass("disalbe_execute");
        }
      } else if (campStatus == "A2") {
        checkStopButtonStatus = true;
        $("#test_execute").removeClass().addClass("start_test_execution").find("span").text("测试执行");
        if (graph.isApprover) {
          $(".approve_approval").removeClass("disalbe_execute");
          $(".reject_approval").removeClass("disalbe_execute");
          $(".start_test_execution").removeClass("disalbe_execute");
        }
        if(graph.isRemark) {
          $("#official_cancel").removeClass("disalbe_execute").addClass("start_cancel_execution").find("span").text("返回设计");
        }
        if (!graph.isRemark && !graph.isApprover) {
          $("#test_execute").addClass("disalbe_execute");
        }
      } else if (campStatus == "B2") {
        $("#test_execute").removeClass().addClass("stop_test_execution").find("span").text("中止执行");
        if (!graph.isRemark && !graph.isApprover) {
          $("#test_execute").addClass("disalbe_execute");
        }
      } else if (campStatus == "A3") {
        $("#official_execute").removeClass().addClass("start_official_execution").find("span").text("正式执行");
        if(graph.isRemark) {
          $("#official_cancel").removeClass("disalbe_execute").addClass("start_cancel_execution").find("span").text("返回设计");
        }

        if (!graph.isRemark) {
          $("#official_execute").addClass("disalbe_execute");
          $("#official_cancel").addClass("disalbe_execute");
        }
      } else if (campStatus == "B3") {
        $("#official_execute").removeClass().addClass("stop_official_execution").find("span").text("中止执行");
        if (!graph.isRemark) {
          $("#official_execute").addClass("disalbe_execute");
        }
      };
      //更新活动状态
      switch (campStatus) {
        case "A1":
          curStatusValue = "设计中";
          break;
        case "A2":
          curStatusValue = "待审批";
          break;
        case "B1":
          curStatusValue = "设计时预执行";
          break;
        case "B2":
          curStatusValue = "待审批时预执行";
          break;
        case "A3":
          curStatusValue = "待执行";
          break;
        case "B3":
          curStatusValue = "执行中";
          break;
        case "A4":
          curStatusValue = "终止";
          break;
        case "A5":
          curStatusValue = "执行完成";
          break;
        case "A6":
          curStatusValue = "异常"
          break;
      };
      angular.element(".ac_flow_status").attr("class", "fr ac_status_selector ac_flow_status ac_status ac_icon_" + campStatus).html(curStatusValue).show();

    },
    "refreshCamp": function(jobList) {
      if (jobList.length == 0) {
        return false;
      }
      // var scope = angular.element(document.querySelector('.tabContentArea')).scope();
      // var tabList = scope.tabpanel_campaign.tabList;  活动列表数据无execute_job，先去除此代码
      // var tabList = [];
      // var execute_job = null; //用户选择的周期
      // var cur_tabList = null;
      if (!graph.isRemark || graph.campStatus != "A1") {
        graph.enabled = false;
      } else {
        graph.enabled = true;
      }
      if (graph.campStatus != "A1" && graph.campStatus != "B1" && graph.campStatus != "A2" && graph.campStatus != "B2") {
        showExecuteList(jobList);
        // for (var i = 0; i < tabList.length; i++) {
        //   if (graph.workflowId == tabList[i].id) {
        //     execute_job = tabList[i].execute_job;
        //     cur_tabList = tabList[i];
        //   }
        // }
        if (window.graph.execute_job != null) { //用户选择的周期
          graph.campJobid = window.graph.execute_job;
        } else {
          for (var i = 0; i < jobList.length; i++) {
            if (jobList[i].jobStatus != 15) {
              graph.campJobid = jobList[i].jobId;
              break;
            }
          }
        }
        //            $("#periodicExecution select").val(graph.campJobid);
        //            $("#periodicExecution select").die("change").live("change", function () {
        $("#periodicExecution #al_dropDown span").attr("data-value", graph.campJobid);
        $("#periodicExecution #al_dropDown li").die("click").live("click", function() {
          graph.execute_job = $(this).attr("data-value"); // val
          graph.campJobid = $(this).attr("data-value"); // val
          flow.removeCellOverlays();
          clearTimeout(jobRefreshTimer);
          refreshJob();
        });
      } else {
        graph.campJobid = jobList[0].jobId;
      }
      if (graph.campJobid != null) {
        jobRefreshTimer = window.setTimeout(function() {
          refreshJob();
        }, 500)
      }

    },
    //标记活动运行时获取节点状态的起始位置，主要目的减少数据传输
    "refreshJoblatest_data": 0,
    "curRunCampJobid": "",
    // 标记上一次活动执行的id，用于判断refreshJoblatest_data的值是否归0
    //移除遮罩
    "removeCellOverlays": function() {
      var parent = graph.getDefaultParent();
      var childCount = graph.model.getChildCount(parent);
      var loadCells = [];
      for (var i = 0; i < childCount; i++) {
        var siblingsCell = graph.model.getChildAt(parent, i);
        if (siblingsCell.vertex) {
          var style = siblingsCell.getStyle().split(";")[0];
          if (style && style == "loading") {
            loadCells.push(siblingsCell);
          }
          graph.removeCellOverlays(siblingsCell);
        }
      }
      if (loadCells.length > 0) {
        graph.removeCells(loadCells, false);
      }
    },
    //工具栏按钮变动触发
    "setCampStatus": function() {
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "campaign/schedule/status/campaign/" + graph.campId,
        async: false,
        type: "GET",
        cache: false,
        dataType: "json",
        success: function(res) {
          graph.campStatus = res.campaignStatus;
          graph.showJobList = res.showJobList || false; // 是否显示周期列表
          graph.showReport = res.showReport //是否查看报告；
          flow.updateUIByCampStatus(graph.campStatus, graph.showReport);
          if (!graph.isRemark || graph.campStatus != "A1") {
            graph.enabled = false;
          } else {
            graph.enabled = true;
          }
        },
        error: function(res) {
          var responseText = res.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      })
    },
    //获取活动状态
    "getCampStatus": function(dtd) {
      var dtd = $.Deferred();
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "campaign/schedule/status/campaign/" + graph.campId,
        //async: false,
        type: "GET",
        cache: false,
        dataType: "json",
        success: function(res) {
          graph.campStatus = res.campaignStatus;
          graph.showJobList = res.showJobList || false; // 是否显示周期列表
          graph.showReport = res.showReport //是否查看报告；
          graph.jobList = res.jobList;
          //                    if (flow.isCampRunning(graph.campStatus)) {
          //                        //campRefreshTimer = setTimeout(flow.getCampStatus, 10000);
          //                        campRefreshTimer = setTimeout(flow.campRefreshAgain, 10000);
          //                    } else {
          //                        clearTimeout(campRefreshTimer);
          //                    }
          //debugger
          dtd.resolve();
          //updateUIByCampStatus(graph.campStatus, graph.showReport);
          //refreshCamp(jobList);
        },
        error: function(res) {
          var responseText = res.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      })

      return dtd.promise();
    },
    //
    "campRefreshAgain": function(norefreshCamp) {
      $.when(graph.camp_EditPermissions(), flow.getCampStatus()).done(function() {
        var test = flow.isCampRunning(graph.campStatus);
        if (test) {
          campRefreshTimer = setTimeout(flow.campRefreshAgain, 10000)
        } else {
          clearTimeout(campRefreshTimer)
        }
        flow.updateUIByCampStatus(graph.campStatus, graph.showReport);
        if (!norefreshCamp) {
          flow.refreshCamp(graph.jobList);
        }

        //debugger
        if (!graph.isRemark || graph.campStatus != "A1") {
          graph.enabled = false
        } else {
          graph.enabled = true;
        }
        if (graph.isApprover) { //审批者
          $("#exeute .approve_approval").css("display", "inline-block");
          $("#exeute .reject_approval").css("display", "inline-block");
        }
      });

    },
    //验证节点
    "validationNodeFull": function(fn) {
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/validate/" + graph.workflowId,
        async: false,
        type: "GET",
        cache: false,
        dataType: "json",
        success: function(response) {
          if (response.pass) { //验证成功
            fn();
          } else {
            var details = response.details;
            $(this).Alert({
              "title": "错误提示",
              "str": "流程配置错误，详细信息请查看高亮节点",
              "mark": true
            });
            for (var i = 0; i < details.length; i++) {
              if (details[i].nodeId) {
                var cell = graph.getModel().getCell(details[i].nodeId);
                cell.flowValidationNotPass = true;
                cell.flowValidationNotPassMessage = details[i].message;
                addCellStyle.error(cell);
              }
            }
          }
        },
        error: function(XMLHttpRequest) {
          var responseText = XMLHttpRequest.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    },
    //1测试执行
    "startTextExecution": function() {
      flow.removeCellOverlays();
      //所有选中的节点外框隐藏，曹徽modify@9/1
      $(".start_test_execution,.submit_approval").addClass("disalbe_execute");
      $("g[pointer-events='none']").hide();
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/schedule/campaign/" + graph.campId + "/test",
        async: false,
        type: "PUT",
        cache: false,
        dataType: "json",
        success: function(response) {
          graph.campStatus = response.campaignStatus;
          //clearTimeout(campRefreshTimer);
          //flow.getCampStatus();
          // issue CCMSSAAS-1447
          setTimeout(function(){
            flow.campRefreshAgain();
          }, 1500);
        },
        error: function(XMLHttpRequest) {
          var responseText = XMLHttpRequest.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    },
    //2中止测试执行
    "stopExecution": function() {
      if (graph.campStatus == "B3") {
        $(this).Confirm({
          "title": "确认中止",
          "str": "中止后活动将无法继续执行，确定要中止活动吗？",
          "mark": true
        }, function() {
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "workflow/schedule/campaign/" + graph.campId + "/stop",
            async: false,
            type: "PUT",
            cache: false,
            dataType: "json",
            success: function(response) {
              graph.campStatus = response.campaignStatus;
              flow.campRefreshAgain("noRefreshCamp");
              //flow.setCampStatus();
              refreshJob();
            },
            error: function(XMLHttpRequest) {
              var responseText = XMLHttpRequest.responseText;
              var data = $.parseJSON(responseText);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          });
        });
      } else {
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "workflow/schedule/campaign/" + graph.campId + "/stop",
          async: false,
          type: "PUT",
          cache: false,
          dataType: "json",
          success: function(response) {
            graph.campStatus = response.campaignStatus;
            flow.campRefreshAgain("noRefreshCamp");
            //flow.setCampStatus();
            refreshJob();
          },
          error: function(XMLHttpRequest) {
            var responseText = XMLHttpRequest.responseText;
            var data = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        });
      }

    },
    //3提交审批
    "submitApproval": function() {
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "campaign/" + graph.campId + "/approval/submit",
        async: false,
        type: "PUT",
        cache: false,
        dataType: "json",
        success: function(response) {
          graph.campStatus = response.campaignStatus;
          flow.setCampStatus();
        },
        error: function(XMLHttpRequest) {
          var responseText = XMLHttpRequest.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    },
    //4确认审批
    "approveApproval": function() {
      $(this).Confirm({
        "title": "确认审批",
        "str": "确定要通过审批吗？",
        "mark": true
      }, function() {
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "campaign/" + graph.campId + "/approval/approve",
          async: false,
          type: "PUT",
          cache: false,
          dataType: "json",
          success: function(response) {
            graph.campStatus = response.campaignStatus;
            flow.setCampStatus();
          },
          error: function(XMLHttpRequest) {
            var responseText = XMLHttpRequest.responseText;
            var data = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        });
      })
    },
    //5拒绝审批
    "rejectApproval": function() {
      $("#rejectApproval_remarks textarea").val("");
      $("#rejectApproval_remarks").addInteractivePop({
        magTitle: "审批不通过",
        mark: true,
        width: 380,
        drag: true,
        position: "fixed"
      });
      $("#rejectApproval_remarks").find(".btn:eq(0)").die("click").live("click", function() {
        $("#rejectApproval_remarks").hide();
        $(".yunat_maskLayer").remove();
        var val = $("#rejectApproval_remarks textarea").val();
        var parame = {
          "reason": val
        };
        parame = JSON.stringify(parame);
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "campaign/" + graph.campId + "/approval/reject",
          async: false,
          type: "PUT",
          cache: false,
          dataType: "json",
          data: parame,
          contentType: 'application/json',
          success: function(response) {
            graph.campStatus = response.campaignStatus;
            flow.setCampStatus();
          },
          error: function(XMLHttpRequest) {
            var responseText = XMLHttpRequest.responseText;
            var data = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        });
      });
      $("#rejectApproval_remarks").find(".btn:eq(1)").click(function() {
        $("#rejectApproval_remarks").hide();
        $(".yunat_maskLayer").remove();
      })
    },
    //6正式执行
    "startOfficialExecution": function() {
      flow.removeCellOverlays();
      $("g[pointer-events='none']").hide();
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/schedule/campaign/" + graph.campId + "/execute",
        async: false,
        type: "PUT",
        cache: false,
        dataType: "json",
        success: function(response) {
          graph.campStatus = response.campaignStatus;
          //clearTimeout(campRefreshTimer);
          //flow.getCampStatus();
          setTimeout(function() {
            flow.campRefreshAgain();
          }, 1500)
        },
        error: function(XMLHttpRequest) {
          var responseText = XMLHttpRequest.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    },
    //7返回设计
    "cancleOfficatialExecution": function() {
      $(this).Confirm({
        "title": "确认返回",
        "str": "返回设计后需要重新审批活动后才可以执行，确定要返回设计吗？",
        "mark": true
      }, function() {
        flow.removeCellOverlays();
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "campaign/" + graph.campId + "/approval/cancel",
          async: false,
          type: "PUT",
          cache: false,
          dataType: "json",
          success: function(response) {
            graph.campStatus = response.currentStatus;
            flow.setCampStatus();
          },
          error: function(XMLHttpRequest) {
            var responseText = XMLHttpRequest.responseText;
            var data = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        });
      })
    }
  }
  return flow;
})();
//状态提示
function getStatusInfo(planTime, startTime, endTime, duration, tips) {
  var html = '<div class="wrapbg"><div class="bg"><h1>节点执行时间</h1>';
  if(planTime != null) {
    html = html + '<p>计划时间：<span>' + planTime + '</span></p>';
  }
  if (startTime != null) { // 因后端调试需要，先放开此判断
    html = html + '<p>开始时间：<span>' + startTime + '</span></p>';
  }
  if (endTime != null) {
    html = html + '<p>结束时间：<span>' + endTime + '</span></p>';
  }
  if(duration != null) {
    html = html + '<p>执行时间：<span>' + duration + '</span></p>';
  }
  if (tips != null) {
    html = html + '<p>提示信息：<span>' + tips + '</span></p>';
  }
  html = html + '</div></div>';
  return html;
}

var executeStatusImg = {
  "wait": {
    "img": GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/execute-wait.png"
  },
  "success": {
    "img": GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/execute-success.png"
  },
  "warn": {
    "img": GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/execute-mismatching.png"
  },
  "error": {
    "img": GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/execute-error.png"
  },
  "stop": {
    "img": GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/execute-stop.png"
  },
  "skip": {
    "img": GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/execute-skip.png"
  },
  "queue": {
    "img": GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/execute-queue.png"
  }
}

function displayNothing(campStatus) {
  switch (campStatus) {
    case 10:
    case 24:
    case 54:
      return true;
    default:
      return false;
  }
}

/**
 * 根据周期状态（jobStatus）获取周期状态图片
 * @param jobStatus
 * @returns {*}
 */
function getStatusImageByJobStatus(jobStatus) {
  switch (jobStatus) {
    case 11:
      return (executeStatusImg["executing"].img) + "?" + nodeStatus;
    case 12:
    case 22:
    case 28:
      return (executeStatusImg["error"].img) + "?" + nodeStatus;
    case 21:
      return (executeStatusImg["success"].img) + "?" + nodeStatus;
    case 23:
      return (executeStatusImg["stop"].img) + "?" + nodeStatus;
    case 8:
    case 10:
      return (executeStatusImg["wait"].img) + "?" + nodeStatus;
    default:
      return null;
  }

}

/**
 * 根据节点状态获得节点右下角显示的图片
 * @param nodeStatus
 * @returns {*}
 */
function getStatusImageByStatus(nodeStatus) {
  switch (nodeStatus) {
    case 21:
    case 51:
      return (executeStatusImg["success"].img) + "?" + nodeStatus;
    case 22:
    case 52:
      return (executeStatusImg["error"].img) + "?" + nodeStatus;
    case 24:
    case 54:
      return (executeStatusImg["error"].img) + "?" + nodeStatus;
    case 25:
    case 55:
      return (executeStatusImg["warn"].img) + "?" + nodeStatus;
    case 23:
    case 53:
      return (executeStatusImg["stop"].img) + "?" + nodeStatus;
    case 8:
      return (executeStatusImg["wait"].img) + "?" + nodeStatus;
    case 9:
      return (executeStatusImg["queue"].img) + "?" + nodeStatus;
    default:
      return null;
  }
}

$(document).ready(function() {
  $("#exeute > a").die("click").live("click", function() {
    var $this = $(this);
    if ($this.hasClass("disalbe_execute")) {
      return false;
    } else {
      var str = $this.attr("class");
      if (str.indexOf("start_test_execution") >= 0) { //测试执行
        exeuteFlow.validationNodeFull(exeuteFlow.startTextExecution);
      } else if (str.indexOf("stop_test_execution") >= 0) { //中止测试执行
        if (checkStopButtonStatus) {
          checkStopButtonStatus = false;
          exeuteFlow.stopExecution();
        }
      } else if (str.indexOf("submit_approval") >= 0) { //提交审批
        exeuteFlow.validationNodeFull(exeuteFlow.submitApproval);
      } else if (str.indexOf("approve_approval") >= 0) { //同意审批
        exeuteFlow.approveApproval();
      } else if (str.indexOf("reject_approval") >= 0) { //拒绝审批
        exeuteFlow.rejectApproval();
      } else if (str.indexOf("start_official_execution") >= 0) { //正式执行
        exeuteFlow.validationNodeFull(exeuteFlow.startOfficialExecution);
      } else if (str.indexOf("start_cancel_execution") >= 0) { //返回执行
        exeuteFlow.cancleOfficatialExecution();
      } else if (str.indexOf("stop_official_execution") >= 0) { //停止执行
        exeuteFlow.stopExecution();
      }
    }
  });

  $("a.reset_Runnode").die("click").live("click", function() { //重试节点
    var $this = $(this);
    if ($this.hasClass("disalbe_reset")) {
      return false;
    }
    var selectCell = graph.getSelectionCell();
    if (!selectCell) {
      $(this).Alert({
        "title": "错误提示",
        "str": "请选择需要重试的节点",
        "mark": true
      });
      $(".reset_Runnode").addClass("disalbe_reset");
      return false;
    };
    $.ajax({
      url: GLOBAL_STATIC.campaignRoot + "workflow/schedule/job/" + graph.campJobid + "/node/" + selectCell.id + "/recover/",
      type: "PUT",
      cache: false,
      dataType: "json",
      success: function(res) {
        // exeuteFlow.validationNodeFull(exeuteFlow.startOfficialExecution);
        exeuteFlow.campRefreshAgain();
      },
      error: function(res) {
        var responseText = res.responseText;
        var data = $.parseJSON(responseText);
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      }
    });
  });
});
