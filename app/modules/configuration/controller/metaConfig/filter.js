angular.module('ccmsApp').controller('filterCtrl', ['$scope', 'dic', 'subject', 'filter', '$compile',
  function($scope, dic, subject, filter, $compile) {
    $scope.filter = {
      "isAdd": true,
      "refresh": function() {
        $scope.loadGrid();
      },
      "showAddTpl": function() {
        $(".filter_addTpl").addInteractivePop({
          magTitle: "过滤器配置",
          width: 560,
          mark: true,
          position: "fixed"
        });
      },
      "add": function() {
        this.isAdd = true;
        $scope.addTpl.src = "view/metaConfig/filterAddTpl.html?" + new Date().getTime();
        $scope.service.dic.get();
        $scope.service.subject.get();
      },
      "modify": function(filterId) {
        console.log(filterId);
      },
      "del": function(filterId) {
        var callback = function() {
          $scope.filter.refresh();
        }
        $(this).Confirm({
          "title": "删除",
          "str": "您确定要删除吗？",
          "mark": true
        },
        function() {
          filter["delete"](callback, filterId);
        })
      }
    }
    $scope.addTpl = {
      "opcityData": [],
      "src": "",
      "isRelation": "true",
      "filterType": "字典多选",
      "save": function() {
        var parame = {},
            opcityData = this.opcityData,
            len = opcityData.length,
            i = 0;
        parame.associatedSubjectList = [];
        for (; i < len; i++) {
          var data = opcityData[i],
              o = {};
          if (data.attributeCollectionModel && data.attributeModel) {
            o.subjectId = data.subjectId;
            o.attributeCollectionId = data.attributeCollectionModel.attributeCollectionId;
            o.attributeId = data.attributeModel.attributeId;
            parame.associatedSubjectList.push(o);
          }
        }

        if ($scope.filter.isAdd) {
          parame.filterId = null;
        }
        parame.filterName = this.filterName;
        parame.dicKey = $scope.dicListModel.dicKey;
        parame.isAssociatedPermissions = this.isRelation;

        var callback = function() {
          $scope.addTpl.close();
          $scope.filter.refresh();
        }
        filter.post(callback, parame)

      },
      "close": function() {
        this.src = "";
        $(".filter_addTpl").hide();
        $(".yunat_maskLayer").remove();
      }
    }
    $scope.service = {
      "dic": {
        "get": function() {
          var callback = function(data) {
            $scope.dicList = data;
            $scope.dicListModel = data[0];
          }
          dic.get(callback);
        }
      },
      "subject": {
        "get": function() {
          var callback = function(data) {
            $scope.subjectList = data;
            $scope.addTpl.opcityData = data;
          }
          subject.getAll(callback);
        }
      }
    }

    $scope.compileTpl = function(b) {
      $compile(angular.element(".flexgridList"))($scope || b);
      $scope.$apply();
    }
    $scope.loadGrid = function() {
      $('.flexgridList').flexigrid({
        url: rootStatic + 'metas/filter/page',
        method: 'GET',
        dataType: 'json',
        colModel: [{
          display: '显示名称',
          name: 'filterName',
          width: 2,
          sortable: false,
          align: 'center',
          dataindex: 'filterName'
        },
        {
          display: '状态',
          name: 'status',
          width: 2,
          sortable: false,
          align: 'center',
          mapping: ["filterId"],
          convert: function(v, mappval) {
            return '<a ng-click="filter.modify(' + mappval[0] + ')" href="javascript:void(0);" class="edit_delete edit_icon" title="修改"></a><a ng-click="filter.del(' + mappval[0] + ')" href="javascript:void(0);" class="edit_delete delete_icon" title="删除"></a>';
          }
        }],
        updateDefaultParam: true,
        sortname: "",
        sortorder: "desc",
        rp: 20,
        usepager: true,
        useRp: true,
        showTableToggleBtn: true,
        colAutoWidth: true,
        onSuccess: function() {
          var scope = angular.element(document.querySelector('.flexgridList')).scope();
          scope.compileTpl(scope);
        }
      });
    }
    $scope.loadGrid();
  }
]);