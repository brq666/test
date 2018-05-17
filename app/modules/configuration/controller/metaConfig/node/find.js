angular.module('ccmsApp').controller('findCtrl', ['$scope', 'subject', 'filter', 'findNode',
  function($scope, subject, filter, findNode) {
    $scope.findId = 1; //查询界定啊id目前写死为1
    $scope.configurationNode = {
      "dbclick": function() {
        $scope.subject.src = "view/metaConfig/node/find/subject.html?" + new Date().getTime();
      }
    }
    //配置主题
    $scope.subject = {
      "src": "",
      "subjectData": [],
      "operationData": [],
      "filterData": [],
      "listData": [],
      "isAdd": true,
      "loadingFn": function() {
        $(".subject_page").show();
        this.getSubjectData();
        $scope.subject.getList();
      },
      "toBack": function() {
        this.src = "";
        $(".subject_page").hide();
      },
      "add": function() {
        this.isAdd = true;
        this.tpl.src = "view/metaConfig/node/find/subjectAddTpl.html?" + new Date().getTime();
      },
      "modify": function(id) {
        this.isAdd = false;
        this.tpl.src = "view/metaConfig/node/find/subjectAddTpl.html?" + new Date().getTime();
        var callback = function() {

        }
        findNode.subject.get(callback, id);
      },
      "del": function(id) {
        var _this = this;
        var callback = function() {
          _this.getList();
        }
        $(this).Confirm({
          "title": "删除",
          "str": "您确定要删除吗？",
          "mark": true
        },
        function() {
          findNode.subject["delete"](callback, id);
        })
      },
      "tpl": { //新增弹出框
        "show": function() {
          $(".subject_AddTpl").addInteractivePop({
            magTitle: "新增主题",
            width: 500,
            mark: true,
            position: "fixed"
          });
        },
        "hide": function() {
          $scope.subject.tpl.src = "";
          $(".subject_AddTpl").hide();
        }
      },
      "getList": function() {
        var _this = this;
        var callback = function(data) {
          _this.listData = data;
        }
        findNode.subject.getList(callback, $scope.findId);
      },
      "dbclick": function() {
        $(".condition_page").show();
        $scope.condition.src = "view/metaConfig/node/find/condition.html?" + new Date().getTime();
      },
      "save": function() {
        var _this = this;
        var parame = {},
            i = 0,
            len = _this.filterData.length;
        parame.filters = [];
        for (; i < len; i++) {
          if (_this.filterData[i].checked) {
            var o = {};
            o.filterId = _this.filterData[i].filterId;
            parame.filters.push(o);
          }
        }
        if (_this.isAdd) {
          parame.configSubjectId = null;
        } else {

        }
        if (_this.subjectListModel) {
          parame.subjectId = _this.subjectListModel.subjectId;
        }
        var callback = function(data) {
          _this.getList();
          _this.tpl.hide();
        }
        findNode.subject.post(callback, parame);
      },
      "getSubjectData": function() {
        var _this = this;
        var callback = function(data) {
          _this.subjectData = data;
        }
        subject.getAll(callback);

      },
      "changeSubject": function(subjectId) {
        this.getFilterData(subjectId);
      },
      "getFilterData": function(subjectId) {
        var _this = this;
        var callback = function(data) {
          _this.filterData = data;
        }
        filter.get(callback, subjectId);

      },
      "filterOpertion": { //过滤器效果方法
        "upward": function(index) {
          //得到该元素的前一个元素
          if (index == 0) {
            return false;
          }
          var currentObj = $scope.subject.filterData[index];
          $scope.subject.filterData.splice(index, 1);
          $scope.subject.filterData.splice(index - 1, 0, currentObj);
        },
        "downward": function(index) {
          var len = $scope.subject.filterData.length;
          if (len == index) {
            return false;
          }
          var currentObj = $scope.subject.filterData[index];
          $scope.subject.filterData.splice(index, 1);
          $scope.subject.filterData.splice(index + 1, 0, currentObj);
        }
      }
    }
    //配置主题
    $scope.condition = {
      "src": ""
    }
  }
]);