var mxGraphCells = (function() {
  var flow = {
    "openFlow": function(id) {
      var dtd = $.Deferred();
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId,
        //async: false,
        type: "GET",
        cache: false,
        dataType: "json",
        success: function(res) {
          graph.execute_list = [];
          var data = res;
          var nodes = data.nodes; //获取所有节点信息并在画布上循环出来
          for (var i = 0; i < nodes.length; i++) {
            var s = nodes[i].type + ';image='+ GLOBAL_STATIC.rootModule + '/modules/marketing/mxGraph/images/flowIcon/' + nodes[i].type + '.png;';
            if (nodes[i].type == "tflowblank") {
              flow.addSpecialVertex(nodes[i].id, nodes[i].remark, nodes[i].x, nodes[i].y, 62, 62, "tflowblank;");
            } else {
              flow.addVertex(nodes[i].id, nodes[i].name, nodes[i].x, nodes[i].y, 64, 64, s, true, nodes[i].remark);
            }

          }
          var connects = data.connects;
          for (var i = 0; i < connects.length; i++) {
            var sourceId = connects[i].source;
            var targetId = connects[i].target;
            var position = connects[i].position;
            var name = connects[i].name;
            if(name){
              name = name.replace(/\</g,'&lt;');
            }
            flow.addEdge(sourceId, position, targetId, name);
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
      });
      dtd.resolve();
      return dtd.promise();
    },
    "saveTemplate": function() {
      var parent = graph.getDefaultParent();
      var childCount = graph.model.getChildCount(parent);
      var nodes = [];
      var connects = [];
      for (var i = 0; i < childCount; i++) {
        var cell = graph.model.getChildAt(parent, i);
        var o = {};
        if (cell.vertex) {
          o.workflowId = graph.workflowId;
          o.id = cell.id;
          o.name = cell.value;
          o.type = cell.style.split(";")[0];
          o.x = cell.geometry.x;
          o.y = cell.geometry.y;
          nodes.push(o);
        }
        if (cell.edge) {
          o.workflowId = graph.workflowId;
          o.source = cell.source.id;
          o.target = cell.target.id;
          connects.push(o);
        }
      }
      var parame = {
        "nodes": nodes,
        "connects": connects
      }
      var parames = JSON.stringify(parame);
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId,
        async: false,
        type: "POST",
        cache: false,
        data: parames,
        dataType: "json",
        contentType: 'application/json',
        success: function(res) {
          alert(res);
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
    "save": function() {
      var parent = graph.getDefaultParent();
      var childCount = graph.model.getChildCount(parent);
      var nodes = [];
      var connects = [];
      for (var i = 0; i < childCount; i++) {
        var cell = graph.model.getChildAt(parent, i);
        var o = {};
        if (cell.vertex) {
          o.workflowId = graph.workflowId;
          o.id = cell.id;
          o.name = cell.value;
          o.type = cell.style.split(";")[0];
          o.x = cell.geometry.x;
          o.y = cell.geometry.y;
          nodes.push(o);
        }
        if (cell.edge) {
          o.workflowId = graph.workflowId;
          o.source = cell.source.id;
          o.target = cell.target.id;
          connects.push(o);
        }
      }
      var parame = {
        "nodes": nodes,
        "connects": connects
      }
      var parames = JSON.stringify(parame);
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId,
        async: false,
        type: "POST",
        cache: false,
        data: parames,
        dataType: "json",
        contentType: 'application/json',
        success: function(res) {

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
    "editor": function(action) {
      if (action == "delete") {
        operatePalette.cells.del();
      } else if (action == "undo") {
        operatePalette.cells.undo();
      } else if (action == "redo") {
        operatePalette.cells.redo();
      } else if (action == "zoomIn") {
        graph.zoomIn();
      } else if (action == "zoomOut") {
        graph.zoomOut();
      } else if (action == "actualSize") {
        graph.zoomActual();
      } else {
        editor.execute(action);
      }
    },
    "addVertex": function(id, label, x, y, w, h, s, selection, remark) { // remark-是否有备注

      graph.htmlLabels = true; // 设置可解析html
      var model = new mxGraphModel();
      addCellStyle.getDefaultVertexStyle(graph); //设置节点的默认样式
      var parent = graph.getDefaultParent();
      model.beginUpdate();
      //处理字符串，6个字为一行
      if (label) {
        label = disposeCommMethod.disposeLabel(label, 6);
        label = label.replace(/<(?!br)/gi, "&lt;");
      }
      try {
        var v1 = graph.insertVertex(parent, id, label, x, y, w, h, s);
        v1.setConnectable(true);
        /*有备注鼠标浮动备注*/
        if (remark) {
          v1.flowValidationNotPass = true;
          v1.flowValidationNotPassMessage = remark;
        }
        if (selection) {
          return false;
        } else {
          graph.setSelectionCell(v1)
        }
      } finally {
        model.endUpdate();
      }
    },
    "addSpecialVertex": function(id, label, x, y, w, h, s) { //特殊节点--拆分节点虚拟框
      var model = new mxGraphModel();
      addCellStyle.putOccupiedCaseStyle(graph);
      var parent = graph.getDefaultParent();
      model.beginUpdate();
      try {
        var v1 = graph.insertVertex(parent, id, label, x, y, w, h, s);
        v1.setConnectable(false);
        graph.orderCells("back", [v1]);
      } finally {
        model.endUpdate();
      }
    },
    "addEdge": function(sourceId, position, targetId, name) {
      var model = new mxGraphModel();
      var parent = graph.getDefaultParent();
      addCellStyle.getDefaultEdgeStyle(graph); //设置连线的默认样式
      addCellStyle.dashedStyle();
      var sourceCell = graph.getModel().getCell(sourceId);
      var targetCell = graph.getModel().getCell(targetId);
      var targetCellStyle = targetCell.style.split(";")[0];
      var s = null;
      if (targetCellStyle == "tflowblank") {
        s = "dashed";
      }
      var connectId = "" + sourceId;
      if (position == null) {
        connectId = connectId + "_" + "null";
      } else {
        connectId = connectId + "_" + position;
      }
      if (targetId == null) {
        connectId = connectId + "_" + "null";
      } else {
        connectId = connectId + "_" + targetId;
      }
      model.beginUpdate();
      try {
        graph.insertEdge(parent, connectId, name, sourceCell, targetCell, s);
      } finally {
        model.endUpdate();
      }
    }

  };
  return flow;
})();
