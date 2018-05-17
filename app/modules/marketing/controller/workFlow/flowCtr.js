angular.module("campaign.controllers").controller('workflow', ['$http', '$scope', '$compile', '$locale', 'getListService', '$stateParams',
  function($http, $scope, $compile, $locale, getListService, $stateParams) {
    campRefreshTimer && clearTimeout(campRefreshTimer);
    jobRefreshTimer && clearTimeout(jobRefreshTimer);
    window.graph && (window.graph.execute_job = null); // 清楚用户选择的周期
    $scope.nodeSrc = "";
    $scope.templateSrc = "";
    $scope.getOpenNodeCell = function(scope, cell) {
      if (!cell || !cell.vertex) {
        return false;
      }
      var style = cell.style;
      var value = cell.value;
      var nodeName = style.split(";");
      nodeName = nodeName[0];
      if (nodeName == 'tflowstart' || nodeName == 'tflowblank') { //判断为vertex成立
        return false;
      }
      if (cell.parent.vertex) { //排除vertex中的子元素
        return false;
      }

      $scope.nodeSrc = CAMPAIGN_STATIC.tplBasePath + "view/node/" + nodeName + ".html?_=" + new Date().getTime();
      $scope.$apply();
      graph.nodeId = cell.id;
      var len = configuration.length; //变量configuration为前端配置文件，主要存储节点的信息
      graph.openNode = null;
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < configuration[i].nodes.length; j++) {
          if (configuration[i].nodes[j].type == nodeName) {
            graph.openNode = configuration[i].nodes[j]
            break;
          }
        }
      }
    }
    $scope.saveAsTemplate = function(scope) {
      $scope.workflowId = graph.workflowId;
      $scope.templateSrc = CAMPAIGN_STATIC.tplBasePath + "view/savetemplate.html?_=" + new Date().getTime();
    }
    $scope.OpenTemplate = function() {
      $(".marketLayer").css({
        "left": "0px",
        "top": "40px",
        "background": "transparent"
      });
      $("#saveAsTemplate").addInteractivePop({
        magTitle: "保存为模板",
        mark: true,
        drag: true,
        position: "fixed",
        width: 640,
        height: 210
      });
    }
    $scope.openNodePop = function() {
      if (graph.openNode != null) {
        $("#nodeContent").addInteractivePop({
          magTitle: graph.openNode.name + "节点",
          mark: true,
          drag: true,
          position: "fixed",
          width: graph.openNode.popWidth,
          height: graph.openNode.popHeight
        });
        var notCreator = !graph.isRemark;
        var campaignStatusNotEditable = (graph.campStatus != "A1" && graph.campStatus != "B3");
        var jobNotEditable = (graph.campStatus == "B3" && graph.jobStatus != 8);
        var nodeNotEditableWhileExecuting = (graph.campStatus == "B3" && graph.openNode.type == "tflowtime");
        graph.isEditable = true; //节点是否禁止编辑,默认可以编辑
        if (notCreator || campaignStatusNotEditable || jobNotEditable || nodeNotEditableWhileExecuting) {
          graph.isEditable = false;
          var whyNotEditable = "";
          if (notCreator) whyNotEditable += "当前登录用户不是创建者,";
          if (campaignStatusNotEditable) whyNotEditable += "活动状态不可编辑,";
          if (jobNotEditable) whyNotEditable += "周期状态不可编辑,";
          if (nodeNotEditableWhileExecuting) whyNotEditable += "当前节点不可在运行时编辑,";
          console.log("节点不可编辑，原因：" + whyNotEditable);
          $div = $("<div>").css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "bottom": 0,
            "right": 0,
            "background": "#fff",
            "opacity": 0.3,
            "z-index": 88
          });
          $div.addClass('node-mask');
          if (graph.openNode.type == "tfilterfind") { //查询节点执行后显示滚动条
            $div.css("right", "30px");
          };
          if (graph.openNode.type == "tanalysisorder") { //订单分析出现滚动条
            $div.css("bottom", "300px");
          }
          if (graph.openNode.type != "tfilterfind" && graph.openNode.type!="tanalysisorder" && graph.openNode.type!="tdiscountUMP") { //查询节点执行后，暂不做遮罩层处理
            $("#nodeContent .commNodeMarkRelative").append($div);
          }
        }
      }
    }

    $scope.hideNodeTips = function() {
      setTimeout(function() {
        angular.element('.mxTooltip').css('visibility', 'hidden');
      },200);
    }

    //修改节点名称
    $scope.editNodeName = function(cellId, cellName, remark) {
      //处理字符串，6个字为一行
      if (cellName) {
        cellName = disposeCommMethod.disposeLabel(cellName, 6);
      }
      var cell = graph.getModel().getCell(cellId);
      cell.value = cellName.replace(/<(?!br)/gi, "&lt;");
      /*有备注鼠标浮动备注*/
      if (remark && !cell.children) {
        cell.flowValidationNotPass = true;
        cell.flowValidationNotPassMessage = remark;
      } else {
        cell.flowValidationNotPass = false;
      }
      graph.refresh();
    }
    //清楚活动状态定时器
    $scope.clearStatusTimer = function() {
      if (typeof(jobRefreshTimer) != "undefined") {
        clearTimeout(jobRefreshTimer);
      }
      if (typeof(campRefreshTimer) != "undefined") {
        clearTimeout(campRefreshTimer);
      }
    }
    //特殊节点配置成功后生成虚框节点（如拆分）
    $scope.refreshGraph = function() {
      /*
       *清楚页面中执行状态
       *清楚画布中的节点
       *重新加载画布节点
       *重新启动执行活动的方法
       */
      this.clearStatusTimer();
      graph.model.clear();
      mxGraphCells.openFlow();
      exeuteFlow.init();
    }
    /*编辑区*/
    $scope.screen = {
      "init": function() {
        var $screen = angular.element("#screen");
        if ($screen.hasClass("fullScree")) {
          $screen.addClass("shrinkScreen").removeClass("fullScree");
          $screen.attr("title", "退出全屏");
          $scope.screen.fullScreen();
        } else if ($screen.hasClass("shrinkScreen")) {
          $screen.addClass("fullScree").removeClass("shrinkScreen");
          $screen.attr("title", "全屏编辑");
          $scope.screen.shrinkScreen();
        }
      },
      "fullScreen": function() {
        angular.element("#operating_area").css("cssText", "position: fixed !important;top: 34px");
        angular.element(".action_buttons").css({
          "position": "fixed"
        });
        angular.element(".header").css({
          "z-index": 0
        });
        //html5 触发浏览器全屏
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        rfs.call(el);
      },
      "shrinkScreen": function() {
        angular.element("#operating_area").css("cssText", "position: absolute !important;top: 34px");
        angular.element(".action_buttons").css({
          "position": "absolute"
        });
        angular.element(".header").css({
          "z-index": 900
        });

        //html5 退出浏览器全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      },
      "cur_ac_flow_status": "",
      "cur_ac_flow_statusValue": "",
      "campNewsObj": {},
      "showFlowInfos": function() {
        if (angular.element(".action_buttons .flowInfosContent").css("display") == "block") {
          return "已经打开";
        }
        var _this = this;
        getListService.getCurCampNews(function(response) {
          _this.campNewsObj.curCampName = response.campName;
          _this.campNewsObj.curCampId = response.campId;
          _this.campNewsObj.curCampType = response.category || "未选择";
          _this.campNewsObj.curCreatedTime = response.createdTime;
          _this.campNewsObj.curCreater = response.creater;
          _this.campNewsObj.getRemarkFlag=response.remark?true:false;
          _this.campNewsObj.curRemark = response.remark || "无备注"; (function(status) {
            switch (status) {
              case "A1":
                _this.campNewsObj.curStatus = "设计中";
                break;
              case "A2":
                _this.campNewsObj.curStatus = "待审批";
                break;
              case "B1":
                _this.campNewsObj.curStatus = "设计时预执行";
                break;
              case "B2":
                _this.campNewsObj.curStatus = "待审批时预执行";
                break;
              case "A3":
                _this.campNewsObj.curStatus = "待执行";
                break;
              case "B3":
                _this.campNewsObj.curStatus = "执行中";
                break;
              case "A4":
                _this.campNewsObj.curStatus = "终止";
                break;
              case "A5":
                _this.campNewsObj.curStatus = "执行完成";
                break;
              case "A6":
                _this.campNewsObj.curStatus = "异常"
                break;
            }
          })(response.status);
          _this.campNewsObj.curListflow = response.listflow || [];
          angular.element(".action_buttons .flowInfosContent").show();
        }, graph.campId);
      },
      "closeFlowInfo": function() {
        angular.element(".action_buttons .flowInfosContent").hide();
      },
      "disposeValue": function(operation, remark) {
        return remark ? (operation + "，" + remark + "。") : (operation + "。")
      }
    }
    /*查看报告*/
    $scope.viewReport = function() {
      if (graph.showReport == true) {
        if (angular.element("#reportMask").css("display") == "none") {
          angular.element("#reportMask").css("display", "block");
        } else {
          $scope.viewReportSrc = CAMPAIGN_STATIC.tenantId === 'edecathlon' ? CAMPAIGN_STATIC.tplBasePath + "view/viewBIReport.html?_=" + new Date().getTime() : CAMPAIGN_STATIC.tplBasePath + "view/viewReport.html?_=" + new Date().getTime();
        }
        $(".toolbar").hide();
        angular.element(".maincontainer").css("z-index", 1);
      } else {

      }
    }
    $(function() {
      window.graph = null;

      if (!mxClient.isBrowserSupported()) {
        mxUtils.error('该浏览器版本太低，请升级', 200, false);
      } else {
        CAMPAIGN_STATIC.tenantId !== 'edecathlon' && $("#viewReport").remove(); // 临时禁用报告
        window.editor = new mxEditor();
        graph = editor.graph;
        var container = document.getElementById("operating_area");
        editor.setGraphContainer(container);
        mxConnectionHandler.prototype.connectImage = new mxImage(GLOBAL_STATIC.rootModule + '/modules/marketing/mxGraph/images/connector.gif', 14, 14); //重定义连线icon
        graph.setConnectable(true); //建立连线
        graph.setTooltips(true); //显示提示
        graph.setCellsResizable(false); //不允许改变大小
        graph.setAllowDanglingEdges(false); //连线必须作用在对象上
        graph.foldingEnabled = false; //不可折叠
        graph.cloneNode = false; //自定义属性，克隆节点的标志
        graph.isMoveCellStart = false; //自定义属性，用于标志节点拖拽的开始状态
        graph.isAllowDragArea = false; //允许拖入的区域，拆分节点的虚框处理
        graph.intoTheBox = null; //被拖入的虚框
        graph.campRedo = [];
        graph.campUndo = [];
        graph.campStatus = null;
        graph.showReport = false; //是否查看报告按钮
        graph.campJobid = null;
        graph.dropEnabled = true;
        graph.getIntersectionCell = function(x, y, parent) { //获取和虚框相交的元素
          parent = parent || this.getDefaultParent();
          if (parent != null) {
            var childCount = this.model.getChildCount(parent);
            var result = null;
            for (var i = 0; i < childCount; i++) {
              var child = this.model.getChildAt(parent, i);
              var style = child.style;
              if (style && style.indexOf("tflowblank") >= 0) {
                if (x < child.geometry.x + 62 && x >= child.geometry.x && y < child.geometry.y + 62 && y >= child.geometry.y) {
                  result = child;
                  break;
                }
              }
            }
            return result;
          }
        }
        mxTooltipHandler.prototype.zIndex = 999;
        new mxRubberband(graph); //橡皮圈选中
        // graph.setCellsCloneable(false);
        /*加载流程数据*/
        var scope = angular.element(document.querySelector('.tabContentArea')).scope();
        // graph.workflowId = scope.currentWorkflowId || 1;
        // graph.campId = scope.currentCampId || 1;
        // graph.currentType = scope.currentType || '21';
        graph.workflowId = $stateParams.workflowId;
        graph.campId = $stateParams.id;
        graph.currentType = 'marketActivity';
        if (graph.currentType == "template") {
          $("#but_save_template").show();
          $(".excute_button_list").hide()
        }
        graph.isApprover = false; //是否为审批人
        graph.isRemark = false; //是否为创建人
        graph.isCampRunning = false; //活动是否为执行中
        graph.camp_EditPermissions = function(dtd) {
          var dtd = $.Deferred();
          $.ajax({
            url: GLOBAL_STATIC.campaignRoot + "campaign/" + graph.campId,
            //async: false,
            type: "GET",
            cache: false,
            dataType: "json",
            contentType: 'application/json',
            success: function(res) {
              if (res.createrId == CAMPAIGN_STATIC.useID) {
                graph.isRemark = true;
              }
              if (res.approverId == CAMPAIGN_STATIC.useID) {
                graph.isApprover = true;
              }
              //debugger
              dtd.resolve();
            },
            "error": function(XMLHttpRequest) {
              var responseText = XMLHttpRequest.responseText;
              var data = $.parseJSON(responseText);
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          })
          //debugger
          return dtd.promise();
        }
        //graph.camp_EditPermissions();     //编辑权限判断
        mxGraphCells.openFlow()

        var keyHandler = new mxKeyHandler(graph);
        keyHandler.bindKey(46, function() { //绑定键盘删除事件
          operatePalette.cells.del();
        });
        keyHandler.bindKey(27, function() { //ESC
        });
        keyHandler.bindKey(122, function() { //F11
        });
        keyHandler.bindKey(37, function() { //绑定键盘删除事件
        });
        keyHandler.bindControlKey(37, function() {

        })

        graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt) { //双击打开活动流程
          var cell = evt.getProperty('cell');
          var scope = angular.element(document.querySelector('#workflow')).scope();
          console.log(cell);
          scope.getOpenNodeCell(scope, cell);
          graph.stopEditing(cell); //撤销双击编辑节点名称
          var cellStyle = cell ? cell.style : '';  //这里会运行2次,第二次cell是undefined
          var isErrorNodeFlag = cellStyle.indexOf("strokeColor=#F00") != -1;
          if (cell && cell.flowValidationNotPass && isErrorNodeFlag) { //该节点为验证未通过节点
            cell.flowValidationNotPass = false;
          }
        })

        graph.addListener(mxEvent.CLICK, function(sender, evt) { //单击已经短信、EDM节点重置
          var cell = evt.getProperty('cell'),
              nodeIsErrorStatus = false,
              nodeName = "",
              nodeJobStatus = "";
          if (!cell) {
            return "不存在节点"
          };
          nodeName = cell.style.split(";")[0];
          if (cell.overlays && cell.overlays[0] && cell.overlays[0].image && cell.overlays[0].image.src) {
            nodeJobStatus = /\?(\d+)/ig.exec(cell.overlays[0].image.src)[1];
          }
          nodeIsErrorStatus = (cell.overlays && cell.overlays[0] && cell.overlays[0].image && cell.overlays[0].image.src && (cell.overlays[0].image.src.indexOf("execute-mismatching") != -1)) || false;
          if (graph.isRemark && nodeIsErrorStatus && (nodeName == "tcommunicateSMS" || nodeName == "tcommunicateEDM" || nodeName == "dclonsms" || nodeName == "dclonedm") && (nodeJobStatus == 25) && (graph.campStatus == "B3" || graph.campStatus == "A4" || graph.campStatus == "A5" || graph.campStatus == "A6")) {
            graph.setSelectionCell(cell);
            $(".reset_Runnode").removeClass("disalbe_reset");
          }
        })

        mxGraph.prototype.cellsMoved = function(cells) { //去除graph自带的节点移动方法,自定义方法operatePalette.cells.move
          return false;
        }
        graph.addListener(mxEvent.MOVE_CELLS, function(sender, evt) { //节点的移动
          var move_cells = evt.properties.cells;
          if (graph.campCloneNode) {
            move_cells = graph.campCloneCells;
          }
          var dx = evt.properties.dx;
          var dy = evt.properties.dy;
          var nodes = [];
          var connects = [];
          // var cells=[];
          for (var i = 0; i < move_cells.length; i++) {
            if (move_cells[i].vertex) {
              var o = {};
              o.id = parseInt(move_cells[i].id);
              o.x = move_cells[i].geometry.x + dx; //拖动后的坐标
              o.y = move_cells[i].geometry.y + dy;
              if (o.y < 15) {
                o.y = 15
              } //解决边缘拖拽
              /*  alert(o.y)*/
              nodes.push(o);
              //cells.push(move_cells[i]);
            }
            if (move_cells[i].edge) {
              var o = {};
              o.targetId = move_cells[i].target.id;
              o.sourceId = move_cells[i].source.id;
              connects.push(o);
            }
          }

          if (graph.campCloneNode) {
            var parame = {
              "nodes": nodes,
              "connects": connects
            };
            //graph.removeCells(move_cells);                  //删除mxGraph自动复制的节点
            graph.campCloneNode = false;
            //graph.refresh();
            operatePalette.cells.clone(parame);

            //自定义复制节点
          } else {

            if (graph.isAllowDragArea) { //此时为将普通节点拖入到虚线框中
              var moveCell = move_cells[0],
              //移动的节点
                  moveCellId = parseInt(moveCell.id),
                  sourceCell = graph.intoTheBox.edges[0].source,
              //拆分节点
                  sourceCellId = sourceCell.id,
                  targetCell = graph.intoTheBox,
              //拆分虚拟框
                  targetCellId = targetCell.id;
              $.ajax({
                url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/node/" + moveCellId + "/replace/" + targetCellId,
                async: false,
                type: "PUT",
                cache: false,
                dataType: "json",
                contentType: 'application/json',
                success: function(res) {
                  //刷新画布
                  var scope = angular.element(document.querySelector('#workflow')).scope();
                  scope.refreshGraph();
                },
                error: function(XMLHttpRequest) {
                  var responseText = XMLHttpRequest.responseText;
                  var res = $.parseJSON(responseText);
                  $(this).Alert({
                    "title": "连接失败",
                    "str": res.message,
                    "mark": true
                  });
                  var scope = angular.element(document.querySelector('#workflow')).scope();
                  scope.refreshGraph();
                  return false;
                }
              })
            } else {
              operatePalette.cells.move(nodes)
            }
          }

        });

        //鼠标划入划出事件
        var track = new mxCellTracker(graph);
        track.flag = false;
        track.cur_cell = null;
        track.mouseMove = function(sender, me) {
          var cell = this.getCell(me);
          if (cell && cell.vertex && !(track.flag)) {
            var style = cell.style.split(";")[0];
            track.flag = true;
            if (cell.flowValidationNotPass) {
              if (style == "tflowblank") { // 执行错误，拆分节点可拖入
                addCellStyle.mouseover(cell);
              }
            } else {
              addCellStyle.mouseover(cell);
            }

            cur_cell = cell;
            return false;
          } else {
            if (!cell && track.flag) {
              if (cur_cell.flowValidationNotPass) {
                //alert("验证未通过");
              } else {
                addCellStyle.mouseout(cur_cell)
              }

              track.cur_cell = null;
              track.flag = false;
            }
          }
        }
        track.mouseDown = function(sender, me) {
          var cell = this.getCell(me);
          if (cell && cell.vertex) {
            graph.isMoveCellStart = true;
          }

        }
        track.mouseUp = function(sender, me) {
          graph.isMoveCellStart = false;
        }
        //复制节点
        mxGraphModel.prototype.cloneCells = function(cells, includeChildren) {
          var mapping = new Object();
          var clones = [];
          var nodes = [];
          var connects = [];
          for (var i = 0; i < cells.length; i++) {
            if (cells[i] != null) {
              clones.push(this.cloneCellImpl(cells[i], mapping, includeChildren));
            } else {
              clones.push(null);
            }
          }
          for (var i = 0; i < clones.length; i++) {
            if (clones[i] != null) {
              this.restoreClone(clones[i], cells[i], mapping);
            }
          }
          if (clones.length > 0) { //自定义操作
            graph.campCloneNode = true;
            graph.campCloneCells = cells;
          }
          return clones;
        }

        //连线验证
        operatePalette.connectValidation();
        //执行操作
        // exeuteFlow.init();
        //加载工具栏
        toolbar.init(graph);
        exeuteFlow.campRefreshAgain();
      }
      //工具栏的拖拽
      yunatPop.drag($(".toolbar_title"));
    });
  }
]);
