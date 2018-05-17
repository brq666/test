//mxGraph定义节点样式
var addCellStyle = (function() {
  var vertexHander = new mxVertexHandler();
  function defaultVertexStyle(graph) {
    var style = new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL; //必须定义label，不然会默认vertex中只有图片，这样图片会自动压缩
    style[mxConstants.STYLE_IMAGE_ALIGN] = "center";
    style[mxConstants.STYLE_IMAGE_vertical_ALIGN] = "middle";
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_ALIGN] = "center";
    style[mxConstants.STYLE_VERTICAL_ALIGN] = "top";
    style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "bottom";
    style[mxConstants.STYLE_GRADIENTCOLOR] = 'none';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_OPACITY] = '100';
    style[mxConstants.STYLE_FONTSIZE] = '12';
    style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
    style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
    graph.getStylesheet().putDefaultVertexStyle(style);
  };
  function defaultEdgeStyle(graph) {
    var style = new Object();
    style[mxConstants.STYLE_ROUNDED] = true; //设置连接线为曲线
    // style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC; //定义箭头样式
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
    style[mxConstants.STYLE_STROKECOLOR] = '#868686';
    style[mxConstants.STYLE_PERIMETER_SPACING] = 1; //连线与节点间的距
    graph.getStylesheet().putDefaultEdgeStyle(style)
  }
  function mouseOverStyle(cell) {
    var style = cell.style.split(";")[0];
    var model = new mxGraphModel();
    model.beginUpdate();
    try {
      if (style == "tflowblank") { //排除虚框节点
        if (graph.isMoveCellStart) {
          //cell.setValue("建立连\n接关系");
          graph.setCellStyles("strokeWidth", 2, [cell]);
          graph.setCellStyles("strokeColor", "#F00", [cell]);
          graph.isAllowDragArea = true;
          graph.intoTheBox = cell;

        } else {
          return false;
        }
      } else {
        graph.setCellStyles("strokeWidth", 1, [cell]);
        graph.setCellStyles("strokeColor", "#4ccaf6", [cell]);
        graph.setCellStyles("fillColor", "#ecf7fe", [cell]);
      }
    } finally {
      model.endUpdate();
    }

  }
  function mouseOutStyle(cell) {
    var style = cell.style.split(";")[0];
    var model = new mxGraphModel();
    model.beginUpdate();
    try {
      if (style == "tflowblank") { //排除虚框节点
        //cell.setValue("请拖入\n节点");
        graph.setCellStyles("strokeWidth", 2, [cell]);
        graph.setCellStyles("strokeColor", "#000", [cell]);
      } else {
        graph.setCellStyles("strokeWidth", 1, [cell]);
        graph.setCellStyles("strokeColor", "none", [cell]);
        graph.setCellStyles("fillColor", "none", [cell]);
      }
      graph.isAllowDragArea = false;
      graph.intoTheBox = null;
    } finally {
      model.endUpdate();
    }
  }
  function validationErrorStyle(cell) {
    var model = new mxGraphModel();
    model.beginUpdate();
    try {
      graph.setCellStyles("strokeWidth", 2, [cell]);
      graph.setCellStyles("strokeColor", "#F00", [cell]);
      graph.setCellStyles("fillColor", "#FFF", [cell]);
    } finally {
      model.endUpdate();
    }

  }
  function occupiedCaseStyle(graph) { //拆分节点生成虚框样式
    var style = new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SQUARE;
    style[mxConstants.STYLE_OPACITY] = '20';
    style[mxConstants.STYLE_FILLCOLOR] = 'none';
    style[mxConstants.STYLE_STROKECOLOR] = '#000';
    style[mxConstants.STYLE_DASHED] = true;

    style[mxConstants.STYLE_VERTICAL_ALIGN] = "";
    style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "center";
    graph.getStylesheet().putCellStyle("tflowblank", style)
  }
  function dashedStyle() {
    var style = new Object();
    style[mxConstants.STYLE_DASHED] = true;
    graph.getStylesheet().putCellStyle("dashed", style);
  }

  function initializeVertexStyle() {
    vertexHander.setSelectionDashed(false);
    vertexHander.setSelectionColor("#4ccaf6");
  };
  initializeVertexStyle();
  return {
    "getDefaultVertexStyle": defaultVertexStyle,
    "getDefaultEdgeStyle": defaultEdgeStyle,
    "putOccupiedCaseStyle": occupiedCaseStyle,
    "dashedStyle": dashedStyle,
    "mouseover": mouseOverStyle,
    "mouseout": mouseOutStyle,
    "error": validationErrorStyle
  }
})();

//工具栏操作
var toolbar = (function() {
  function getToolbarData() {
    $.ajax({
      url: GLOBAL_STATIC.campaignRoot + "workflow/node/groups",
      async: true,
      type: "GET",
      cache: false,
      dataType: "json",
      success: function(res) {
        var data = res;
        analysisToolbarUI(data);
      },
      error: function(XMLHttpRequest) {
        var responseText = XMLHttpRequest.responseText;
        var res = $.parseJSON(responseText);
        $(this).Alert({
          "title": httpTitle || '提示',
          "str": res.message,
          "mark": true
        });
      }
    })
  }
  function analysisToolbarUI(data) { //解析工具栏UI
    // issue CCMSSAAS-2266 如果分类下面没有节点,则隐藏分类栏
    data = data.filter(function(value, index) {
      var viewNodes = 0;
      if(value.nodes) {
        value.nodes.forEach(function(node) {
          if(node.viewable === true) {
            viewNodes ++;
          }
        });

        if(viewNodes > 0) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    });
    var len = data.length;
    for (var i = 0; i < len; i++) {
      var html = '<dl>' + '  <dt onselectstart="return false" onselect="document.selection.empty()" class="show_this_tool">' + data[i].text + '<a class="arrow_down_show fr" href="javascript:void(0);"></a></dt>' + '  <dd class="padlr"  id="' + data[i].name + '_bar">'

          + '  </dd>' + '  </dl>';
      $(".toolbar_content").append($(html));
      var obj = $("#" + data[i].name + "_bar").get(0); //此对象不能为jq对象
      if (mxClient.IS_IE) {
        new mxDivResizer(obj);
      }
      var classify = new mxToolbar(obj); //工具菜单分类列表
      for (var j = 0; j < data[i].nodes.length; j++) {
        var nodeTitle = data[i].nodes[j].name;
        var nodeName = data[i].nodes[j].type;
        var src = getNodeImgSrc(nodeName); //前端根据nodeName配置拖拽后显示的图片src
        if (data[i].nodes[j].viewable) {
          vertex.create(graph, classify, nodeTitle, nodeName, src);
        }
      }
    }
    slide();
  }
  function getNodeImgSrc(name) {
    return  GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/" + name + ".png"
  }
  //菜单的伸缩效果
  var top = $(".toolbar").length > 0 ? $(".toolbar").position().top: '';
  window.onresize = function() {
    if ($(".toolbar").length > 0) {
      top = $(".toolbar").position().top;
      toobar();
    }
  }

  function toobar() {
    var winHeight = window.innerHeight;
    var height = $(".toolbar")[0].clientHeight;
    var toolHeight = top + height + 5;

    var maxHeight = winHeight - top - 30;
    if (toolHeight >= winHeight) {
      $(".toolbar_content").addClass("toolbar_flow");
      $(".toolbar_content").css("max-height", maxHeight);
    } else {
      $(".toolbar_content").css("max-height", "");
      $(".toolbar_content").removeClass("toolbar_flow");
    }

  }
  function slide() {
    $(".toolbar dd:eq(0)").show();
    $(".show_this_tool").eq(0).children("a").addClass("arrow_show").removeClass("arrow_down_show");

    //全体伸缩 展开
    $("#draw").bind("click", function() {
      if ($(this).hasClass("draw_down")) {
        $(this).addClass("draw_up").removeClass("draw_down");
        $(".toolbar dd").each(function() {
          $(this).show();
          toobar();
        });
        $(".toolbar dt").each(function() {
          $(this).children("a").addClass("arrow_show").removeClass("arrow_down_show");
        })
      } else {
        $(this).addClass("draw_down").removeClass("draw_up");
        $(".toolbar dd").each(function() {
          $(this).hide();
          toobar();
        });
        $(".toolbar dt").each(function() {
          $(this).children("a").addClass("arrow_down_show").removeClass("arrow_show");
        })

      }
    })
    //整体放大 缩小
    $("#draw_big").bind("click", function() {
      if ($(this).hasClass("draw_small")) {
        $(this).addClass("draw_big").removeClass("draw_small");
        $(".toolbar_content").hide(100);
      } else {
        $(this).addClass("draw_small").removeClass("draw_big");
        $(".toolbar_content").show(100);

      }
    })

    $(".show_this_tool").bind("click", function() {
      //$(".toolbar dd").hide(300);
      //判断是否出现滚动条
      if ($(this).next()[0].style.display == "none" || $(this).next()[0].style.display == "") {
        $(this).children("a").addClass("arrow_show").removeClass("arrow_down_show");
        $(this).next().show(100, function() {
          toobar();
        });
      } else {
        $(this).children("a").addClass("arrow_down_show").removeClass("arrow_show");
        $(this).next().hide(100, function() {
          toobar();
        });
      }

    });
    $(".toolbar").show();
  }
  return {
    "init": getToolbarData
  }
})();

var vertex = (function() {
  function createVertex(graph, sidebar, label, style, subImg) {
    var flog = "left";
    var container = graph.container;
    var parent = graph.getDefaultParent();
    var funct = function(graph, evt, cell, x, y, extra) {
      if(graph.currentType && graph.currentType == "marketActivity") {
        if (!graph.isRemark || graph.campStatus != "A1" || style == "teximmarketingondemand") {
          return false;
        }
      }

      var intersectionCell = graph.getIntersectionCell(x, y); //将新增节点拖入虚框中
      var parame = {};
      var s = "";
      if (extra) {
        extra.x = extra.x + 90;
        parame.name = extra.name;
        parame.type = extra.style;
        parame.x = extra.x;
        parame.y = extra.y;
        var img =  GLOBAL_STATIC.rootModule + "/modules/marketing/mxGraph/images/flowIcon/" + extra.style + ".png";
        s = style + ';image=' + img + ';';
      } else {
        parame.name = label;
        parame.type = style;
        parame.x = x - 32;
        parame.y = y - 32;
        s = style + ';image=' + subImg + ';';
      }
      parame.tenantId = CAMPAIGN_STATIC.tenantId;
      var parames = JSON.stringify(parame);
      var len = 0;
      $('#workflow image').each(function(index, el) {
        if( $(this).attr('href') == '/ccms/modules/marketing/mxGraph/images/flowIcon/tanalysisEffect.png' ){
          len ++;
        }
      })
      if(len == 3 && parame.name == "效果跟踪"){
        $(this).Alert({"title":"连接失败","str":"为确保计算性能，每个活动最多3个效果跟踪节点","mark":true});
      }
      else{
        $.ajax({
          url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/node",
          async: false,
          type: "POST",
          cache: false,
          data: parames,
          dataType: "json",
          contentType: 'application/json',
          success: function(res) {
            if (intersectionCell !== null) { // 从工具栏拖入虚框
              if (res.id || res.id == 0) {
                $.ajax({ // 发送拖入虚空请求
                  url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/node/" + res.id + "/replace/" + intersectionCell.id,
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
                    //刷新画布
                    var scope = angular.element(document.querySelector('#workflow')).scope();
                    scope.refreshGraph();
                    return false;
                  }
                })
              }
            } else { // 拖入空白处生成
              var data = res;
              mxGraphCells.addVertex(data.id, data.name, data.x, data.y, 64, 64, s);
              //前端测试使用
              //mxGraphCells.addVertex(res.id,parame.name,parame.x,parame.y,62,62,s);
            }

          },
          error: function(XMLHttpRequest) {
            var responseText = XMLHttpRequest.responseText;
            var res = $.parseJSON(responseText);
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": res.message,
              "mark": true
            });
          }
        })
      }
    }
    if (sidebar && sidebar != null) {
      var botton = sidebar.addMode(label, null, funct, null, null, null);
      var tool_icon_htmlModel;
      if (style == "teximmarketingondemand") { // 是否是可拖拽节点样式：如立即营销节点
        tool_icon_htmlModel = '<a href="javascript:void(0);" class="tool_icon ' + style + '" type=' + style + '></a><span class="toolbarLockStyle">' + label + '</span>';
      } else {
        tool_icon_htmlModel = '<a href="javascript:void(0);" class="tool_icon ' + style + '" type=' + style + '></a><span>' + label + '</span>';
      }
      $(botton).append(tool_icon_htmlModel);
      mxEvent.addListener(botton, 'click', function(evt) {
        var parent = graph.getDefaultParent();
        var cells = parent.children;
        var childCount = parent.getChildCount();

        var lastCell = null;
        for (var i = 0; i < childCount; i++) {
          var curCell = parent.getChildAt(i);
          if (curCell.vertex) {
            lastCell = curCell;
          }
        }
        if (lastCell != null) {
          var value = $(botton).text();
          var type = $(botton).find(".tool_icon").attr("type");

          var o = {
            "name": value,
            "style": type,
            "x": lastCell.geometry.x,
            "y": lastCell.geometry.y
          }
          funct(graph, null, null, null, null, o);

        } else {
          return false;
        }
      });
      var dragEltChild = document.createElement('div');
      dragEltChild.style.border = 'dashed black 1px';
      dragEltChild.style.width = '64px';
      dragEltChild.style.height = '64px';
      dragEltChild.style.position = 'absolute';
      dragEltChild.style.top = '-32px';
      dragEltChild.style.left = '-32px';
      var dragElt = document.createElement('div');
      //dragElt.style.border = 'dashed black 1px';
      dragElt.style.width = '64px';
      dragElt.style.height = '64px';
      dragElt.style.position = 'relative';
      dragElt.background = "none";
      dragElt.appendChild(dragEltChild);
      var ds = mxUtils.makeDraggable(botton, graph, funct, dragElt, 0, 0, true, true);
      var intersectionCellsIds = [];
      var selectCell = null;
      ds.getDropTarget = function(graph, x, y) { //此方法必须设置graph.dropEnabled=true
        //将节点拖入虚框中
        var intersectionCell = graph.getIntersectionCell(x, y);

        if (intersectionCell !== null) {
          var id = intersectionCell.id;
          if (!screening(id, intersectionCellsIds)) {
            intersectionCellsIds.push(id);
            selectCell = intersectionCell;
          }
          setIntersectionCellsStyle(intersectionCell)
        } else {
          if (selectCell) {
            // addCellStyle.mouseout(selectCell);
            //selectCell=null;
          }
        }
      }
      function screening(id, ids) {
        var flag = false;
        for (var i = 0; i < ids.length; i++) {
          if (ids[i] == id) {
            flag = true;
            break;
          }
        }
        return flag;
      }
      function setIntersectionCellsStyle(intersectionCell) {
        var model = new mxGraphModel();
        model.beginUpdate();
        try {
          graph.setCellStyles("strokeWidth", 2, [intersectionCell]);
          graph.setCellStyles("strokeColor", "#f00", [intersectionCell]);
          graph.setCellStyles("fillColor", "none", [intersectionCell]);
        } finally {
          model.endUpdate();
        }
      }
    }
  }
  return {
    "create": createVertex
  }
})();
