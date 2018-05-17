angular.module("campaign.controllers").controller('dataBatchCtrl', ['$scope',
  function($scope) {
    $scope.dataBatchObj = {
      "searchHdButton": function(val) {
        var gridEle = angular.element(".dataBatchInfoGrid")[0];
        gridEle.p.newp = 1;
        gridEle.p.qtype = "keywords";
        gridEle.p.query = val || "";
        gridEle.grid.populate();
      },
      "setDefaultSelected": function() {
        angular.forEach($scope.$parent.$parent.defaulteDataBatchAry, function(val, key) {
          angular.element(".dataBatchInfoGrid tr").each(function() {
            var recData = $(this).data().rec;
            if (recData.id == val) {
              $(this).find("[name='batchRadio']").attr("checked", true);
            }
          })
        });
      },
      "sureAddBatch": function() {
        var isSelectedAry = [];
        angular.element(".dataBatchInfoGrid tr").each(function() {
          if ($(this).find("[name='batchRadio']").attr("checked")) {
            isSelectedAry.push($(this).data().rec.id);
          }
        });
        $scope.$parent.$parent.defaulteDataBatchAry = isSelectedAry.slice();
      }
    };

    $('.dataBatchInfoGrid').flexigrid({
      url: GLOBAL_STATIC.componentRoot + 'extImport/list/',
      method: 'GET',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      colModel: [{
        display: '',
        name: 'submitTime',
        width: 20,
        sortable: false,
        align: 'center',
        dataindex: 'submitTime',
        renderer: function(v) {
          return "<input class='mt5' type='radio' name='batchRadio' />";
        }
      },
      {
        display: '批次编号123',
        name: 'id',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'id'
      },
      {
        display: '所属平台',
        name: 'platform',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'platform'
      },
      {
        display: '批次名称',
        name: 'name',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'name'
      },
      {
        display: '分隔符',
        name: 'delimiter',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'delimiter'
      },
      {
        display: '第一行是否包含字段名',
        name: 'hasColumnName',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'hasColumnName'
      },
      {
        display: '总记录数',
        name: 'totalNum',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'totalNum'
      },
      {
        display: '成果导入数',
        name: 'importNum',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'importNum'
      },
      {
        display: '导入时间',
        name: 'importTime',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'importTime'
      },
      {
        display: '导入人',
        name: 'operator',
        width: 100,
        sortable: false,
        align: 'center',
        dataindex: 'operator'
      }],
      /* params: campListParams,*/
      sortname: "",
      updateDefaultParam: true,
      sortorder: "desc",
      buttons: [],
      usepager: true,
      useRp: true,
      rp: 20,
      showTableToggleBtn: true,
      colAutoWidth: false,
      onSuccess: function() {
        $scope.$apply(function() {
          $scope.dataBatchObj.setDefaultSelected();
        })
      },
      onError: function(data, status, headers, config) {
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
]);
