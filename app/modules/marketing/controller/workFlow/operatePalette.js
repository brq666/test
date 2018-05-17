var operatePalette = (function() { //画板的操作
  var cells = {
    /*"disalbeNode":{   //默认不可操作的节点
     "delStyle":["tflowstart","tflowtime"],
     "moveStyle":["tflowstart","tflowtime"]
     },*/
    "del": function() {
      function delNode(selectdCells) {
        var len = selectdCells.length;
        var parame = {
          "nodes": [],
          "connects": []
        }
        for (var i = 0; i < len; i++) {
          if (selectdCells[i].vertex) {
            parame.nodes.push(((selectdCells[i].id) + "").replace(/children_/, "")); //bug 批量删除节点时，id中会出现children_
          } else {
            var o = {};
            o.source = selectdCells[i].source.id;
            o.target = selectdCells[i].target.id;
            parame.connects.push(o);
          }
        }
        parame = JSON.stringify(parame);
        cells.ajaxDel(parame);
      }
      if (graph.currentType === "marketActivity" && graph.campStatus != "A1") {
        return "不是测试执行，节点不能删除"
      }
      if(cells.OpenConfirm || $('.yunat_maskLayer').length > 0) { //打开弹窗就不操作
        return;
      }
      var selectdCells = null;
      var hasNode = false;
      if (!graph.isSelectionEmpty()) {
        selectdCells = graph.getSelectionCells();

        selectdCells.forEach(function(cell) {
          if(cell.edge !== true) {
            hasNode = true;
          }
        });

        if(hasNode) { // 有节点删除弹出提示框
          cells.OpenConfirm = true;
          $(this).Confirm({"title":"确认删除","str":"你确定删除此节点吗？","mark":true,"eleZindex":1010,"markZindex":1005},function() {
            cells.OpenConfirm = false;
            delNode(selectdCells);
          }, function() {
            cells.OpenConfirm = false;
          });
        } else {
          delNode(selectdCells);
        }
      } else {
        return false;
      }

    },
    "ajaxDel": function(parame) {
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/elements",
        async: false,
        type: "DELETE",
        cache: false,
        data: parame,
        dataType: "json",
        contentType: 'application/json',
        success: function(res) {
          /*var nodes=res.nodes;
           var connects=res.connects;
           var cells=[];
           for(var i=0;i<nodes.length;i++){
           var cell=graph.getModel().getCell(nodes[i].id);
           cells.push(cell);
           }
           for(var i=0;i<connects.length;i++){
           var connectId=connects[i].source + "_" + connects[i].position + "_" + connects[i].target;
           var cell=graph.getModel().getCell(connectId);
           cells.push(cell);
           }
           graph.removeCells(cells,false)*/
          angular.element("#workflow").scope().refreshGraph();
        },
        "error": function(XMLHttpRequest) {
          var responseText = XMLHttpRequest.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": "删除失败",
            "str": data.message,
            "mark": true
          });
          var scope = angular.element(document.querySelector('#workflow')).scope();
          scope.refreshGraph();
        }
      })
    },
    "move": function(parame) {
      var parames = JSON.stringify(parame);
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/node",
        async: false,
        type: "PUT",
        cache: false,
        data: parames,
        dataType: "json",
        contentType: 'application/json',
        success: function(res) {
          /* var len=res.length;
           var cell=null;
           for(var i=0;i<len;i++){
           cell=graph.getModel().getCell(res[i].id);

           cell.geometry.x=res[i].x;
           cell.geometry.y=res[i].y;
           graph.refresh();
           graph.setSelectionCell(cell)
           }*/

          //前端测试代码
          var len = parame.length;
          var cell = null;
          for (var i = 0; i < len; i++) {
            cell = graph.getModel().getCell(parame[i].id);
            cell.geometry.x = parame[i].x;
            cell.geometry.y = parame[i].y;
            graph.refresh();
            graph.setSelectionCell(cell)
          }
        },
        error: function(XMLHttpRequest) {
          /*var responseText=XMLHttpRequest.responseText;
           var res=eval('(' + responseText + ')');
           $(this).Alert({"title":res.message,"str":res.description,"mark":true}); */
          //console.log(parame.length);
          //前端测试代码
          var len = parame.length;
          var cell = null;
          for (var i = 0; i < len; i++) {
            cell = graph.getModel().getCell(parame[i].id);
            cell.geometry.x = parame[i].x;
            cell.geometry.y = parame[i].y;
            graph.refresh();
            graph.setSelectionCell(cell)
          }

        }
      })
    },
    "clone": function(parame) {
      var parames = JSON.stringify(parame);
      var len = 0;
      $('#workflow image').each(function(index, el) {
        if( $(this).attr('href') == '/ccms/modules/marketing/mxGraph/images/flowIcon/tanalysisEffect.png' ){
            len ++;
        }
      })
      for (var i = 0; i < parame.nodes.length; i++) {
        var value = graph.getModel().getCell(parame.nodes[i].id).value;
        if (value == "开始" || value == "时间" || value == "立即营销") {
          $(this).Alert({
            "title": "提示",
            "str": value + "节点不可复制",
            "mark": true
          });
          var scope = angular.element(document.querySelector('#workflow')).scope();
          scope.refreshGraph();
          return;
        }
        if( len==3 && value == "效果跟踪"){
          $(this).Alert({"title":"连接失败","str":"为确保计算性能，每个活动最多3个效果跟踪节点","mark":true});
          var scope = angular.element(document.querySelector('#workflow')).scope();
          scope.refreshGraph();
          return ;
        }
      }
      $.ajax({
        "url": GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/elements",
        "type": "POST",
        "async": false,
        "data": parames,
        "dataType": "json",
        "contentType": 'application/json',
        "success": function(res) {
          var scope = angular.element(document.querySelector('#workflow')).scope();
          scope.refreshGraph();
        },
        "error": function(XMLHttpRequest) {
          var responseText = XMLHttpRequest.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
          var scope = angular.element(document.querySelector('#workflow')).scope();
          scope.refreshGraph();
        }
      })

    },
    "undo": function() {

    },
    "redo": function() {

    }
  }

  function connectValidation() {
    mxConnectionHandler.prototype.connect = function(source, target, evt, dropTarget) {
      var sourceStyle = source.style.split(";")[0];
      var targetStyle = target.style.split(";")[0];
      var sourceId = source.id;
      var targetId = target.id;
      var parame = {
        "source": sourceId,
        "target": targetId
      }
      var parames = JSON.stringify(parame);
      $.ajax({
        url: GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/connect",
        //async: false,
        type: "POST",
        cache: false,
        data: parames,
        dataType: "json",
        contentType: 'application/json',
        success: function(res) {
          //处理验证出错节点
          var targetCell = graph.getModel().getCell(targetId);
          var sourceCell = graph.getModel().getCell(sourceId);
          if (targetCell.flowValidationNotPass) {
            targetCell.flowValidationNotPass = false;
            addCellStyle.mouseout(targetCell)
          }
          if (sourceCell.flowValidationNotPass) {
            sourceCell.flowValidationNotPass = false;
            addCellStyle.mouseout(sourceCell)
          }
          mxGraphCells.addEdge(sourceId, res.position, targetId);
        },
        error: function(XMLHttpRequest) {
          //前端测试代码
          // mxGraphCells.addEdge(sourceId,null,targetId);
          var responseText = XMLHttpRequest.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      })
    }
  }

  return {
    "cells": cells,
    "connectValidation": connectValidation
  }
})();
