/**
 * Created by dupenghui on 2014/9/19.
 */
angular.module("campaign.controllers").controller('tfilterdataImportCtrl', ['$scope', 'getListService', '$compile', '$http',
  function($scope, getListService, $compile, $http) {
    /*//各种时间类型的映射
     var typeMap = {"0":{waitType:0,waitDateTime:$scope.waitDateTime},
     "1":{waitType:1,waitDay:$scope.waitDay,waitTime:$scope.waitTime},
     "2":{waitType:2,waitHour:$scope.waitHour,waitMinute:$scope.waitMinute}
     };
     */
    //$scope.id = "123";
    $scope.isEditorFlag = (!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8) //节点是否可编辑，确定按钮是否显示,
    $scope.waitnode = {};
    $scope.select_lables = [1, 2, 3, 4, 5];
    $scope.model = {
      "id": graph.nodeId,
      "name": "导入查询",
      "remark": null,
      "subjects": [{
        "id": 1,
        "name": "淘宝客户"
      },
      {
        "id": 201,
        "name": "微旺铺客户"
      },
      {
        "id": 101,
        "name": "京东客户"
      },
      {
        "id": 401,
        "name": "一号店客户"
      },
      {
        "id": 20001,
        "name": "移动客户"
      }],
      batch: [{
        "id": 389,
        "name": "为空分号"
      },
      {
        "id": 399,
        "name": "繁体字"
      }]
    }

    $scope.viewModel = {

    }
    $scope.selectTr = function(parm) {
      $scope.trSelected = parm

    }

    $scope.deletLabel = function(index) {
      var i = index;
      $scope.viewModel.batch.splice(i, 1);
      setgridModel()

    }

    $scope.deletAll = function() {
      $scope.viewModel.batch = [];
      setgridModel()
      /*        $scope.gridModel.page=1
       Grid.params={
       "subjectId":$scope.viewModel.subjectId,
       "page":1,
       "pagesize":10,
       "sortname":"importTime",
       "sortorder":"desc"
       }
       Grid.ajax()*/
      /*   setgridModel()*/
    }
    $scope.changePlat = function() {
      for (var i in $scope.viewModel.subjects) {
        if ($scope.viewModel.subjects[i].id == $scope.viewModel.subjectId) {
          $scope.viewModel.subjectName = $scope.viewModel.subjects[i].name
          break;
        }
      }
      $scope.viewModel.batch = [];
      $scope.gridModel.page = 1;
      $scope.gridModel.myBatchs = false;
      Grid.params = {
        "subjectId": $scope.viewModel.subjectId,
        "page": 1,
        "pagesize": 10,
        "sortname": "created",
        "sortorder": "desc",
        "myBatchs": "",
        "query": ""
      }
      Grid.ajax()
    }

    $scope.setBatch = function(parm, index) {
      var temp = $scope.gridModel.data[index]
      var batchLable = _.pick(temp, 'id', 'batchName');
      batchLable = {
        "id": batchLable.id,
        "name": batchLable.batchName
      }
      if (parm) {
        $scope.viewModel.batch.push(batchLable)
      } else {

        var id = batchLable.id
        var temp = _.filter($scope.viewModel.batch, function(num) {

          return num.id != id
        });
        $scope.viewModel.batch = temp

      }

    }

    $scope.gridfresh = function() {
      Grid.ajax()
    }

    /*  var gridIsCompile = false;//阻止grid刷新多次compile
     $('#couponListsGrid').flexigrid({
     url:GLOBAL_STATIC.nodeRoot + 'web-node/node/impreserch/batch/',
     method: 'GET',
     */
    /*      dataType: 'json',*/
    /*
     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
     colModel: [
     { display: '', name: 'submitTime', width: 1, sortable: false, align: 'center', dataindex: 'id', renderer: function (v) {

     return  "<input ng-click='setBatch($event)'   class='mt5' type='radio' name='batchRadio'   value='" + v + "' />";
     }},
     { display: '批次编号', name: 'id', width: 1, sortable: true, dataindex: "id" },
     { display: '所属平台', name: 'platName', width: 1, sortable: true, dataindex: 'platName' },
     { display: '批次名称', name: 'batchName', width: 1, sortable: true, align: 'center', dataindex: 'batchName' },
     {display: '导入时间', name: 'importTime', width: 2, sortable: true, align: 'center', dataindex: 'importTime'},
     {
     display: '导入人', name: 'operator', width: 1, align: 'center', dataindex: 'operator'
     }
     ],
     sortname: 'lastUpdate',
     updateDefaultParam: true,
     sortorder: "desc",
     buttons: [],
     usepager: true,
     useRp: true,
     rp: 10, // 每页默认的结果数
     rpOptions: [5, 10, 15, 20, 25, 30, 40],// 可选择设定的每页结果数
     showTableToggleBtn: true,
     colAutoWidth: true,
     onSuccess: function () {
     if (!gridIsCompile) {
     var scope = angular.element($("#couponListsGrid")).scope();
     $compile(angular.element("#couponListsGrid"))(scope);
     $scope.$apply();
     }
     gridIsCompile = true;
     }, onError: function (response) {
     if (response.status == 401) {
     location.pathname = root + 'login.html';
     }
     }
     });*/

    $scope.loading = true;
    $scope.gridModel = {}

    var Grid = {
      params: {
        "page": "1",
        "pagesize": "10",
        "sortname": "created",
        /*按照导入时间排序*/
        "sortorder": "desc",
        "query": "",
        /*输入查询的条件*/
        "subjectId": "1",
        /* 选择的平台*/
        "myBatchs": ""
        /*只显示我导入的*/
      },
      event: function() {
        $scope.gridModel.pageSize = 10

        $scope.gridModel.pageSize1 = [{
          text: 10,
          value: 10
        },
        {
          text: 15,
          value: 15
        },
        {
          text: 20,
          value: 20
        },
        {
          text: 30,
          value: 30
        },
        {
          text: 50,
          value: 50
        }];

        $scope.gridModel.changePageSize = function() {
          $scope.gridModel.page = 1;
          this.params.page = $scope.gridModel.page;
          this.params.pagesize = $scope.gridModel.pageSize;
          this.ajax()
        }.bind(this);
        $scope.keypress = function(event) {
          if (event.keyCode == 13) {

            if (isNaN($scope.gridModel.page * 1)) {
              $scope.gridModel.page = 1
            }
            $scope.gridModel.page = Math.floor($scope.gridModel.page);
            if ($scope.gridModel.page >= $scope.gridModel.pageCounts) {
              $scope.gridModel.page = $scope.gridModel.pageCounts
            }
            if ($scope.gridModel.page <= 1) {
              $scope.gridModel.page = 1
            }
            this.params.page = $scope.gridModel.page;
            this.ajax()
          } else {
            return false
          }

        }.bind(this)

        $scope.next = function() {
          this.params.page = this.params.page * 1 + 1

          if (this.params.page > $scope.gridModel.pageCounts) {
            this.params.page = $scope.gridModel.pageCounts;
            $scope.gridModel.page = $scope.gridModel.pageCounts;
            return false
          }

          this.ajax()
        }.bind(this);

        $scope.last = function() {
          if ($scope.gridModel.page >= $scope.gridModel.pageCounts) {
            return false
          }
          var page = $scope.gridModel.pageCounts;
          this.params.page = page;
          this.ajax()

        }.bind(this);
        $scope.first = function() {
          if (this.params.page <= 1) {
            $scope.gridModel.page = 1
            return false
          }
          this.params.page = 1;
          this.ajax()
        }.bind(this)

        $scope.prev = function() {
          this.params.page = this.params.page * 1 - 1
          if (this.params.page < 1) {
            this.params.page = 1;
            $scope.gridModel.page = 1
            return false
          }
          this.ajax()
        }.bind(this)

        $scope.search = function(query) {
          /*           $scope.gridModel.myBatchs=true*/
          var parms = {
            "page": "1",
            "pagesize": "10",
            "sortname": "created",
            /*按照导入时间排序*/
            "sortorder": "desc",
            "query": query,
            /*输入查询的条件*/
            "subjectId": this.params.subjectId,
            /* 选择的平台*/
            "myBatchs": this.params.myBatchs
            /*只显示我导入的*/
          }
          this.params = parms;
          this.ajax()
        }.bind(this);
        $scope.myBatchs = function(parm) {
          if (parm) {
            parm = parm
          } else {
            parm = ""
          }
          var parms = {
            "page": "1",
            "pagesize": "10",
            "sortname": "created",
            /*按照导入时间排序*/
            "sortorder": "desc",
            "query": "",
            /*输入查询的条件*/
            "subjectId": this.params.subjectId,
            /* 选择的平台*/
            "myBatchs": parm
            /*只显示我导入的*/
          }
          parms.query = $scope.grdiQuery;
          this.params = parms;
          this.ajax()
        }.bind(this)
      },
      ajax: function() {
        $scope.loading = true;
        $http({
          method: 'GET',
          url: GLOBAL_STATIC.nodeRoot + 'node/impreserch/batch/',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          params: this.params

        }).success(function(response, status, headers, config) {
          response.pageSize = response.pageSize * 1;
          $scope.gridModel = _.extend($scope.gridModel, response);
          $scope.gridModel.realPage = response.page;
          $scope.gridModel.pageCounts = Math.ceil($scope.gridModel.total / $scope.gridModel.pageSize);
          if ($scope.gridModel.pageCounts == 0) {
            $scope.gridModel.pageCounts = 1
          }
          this.render()
        }.bind(this)).error(function(data, status, headers) {
          $(document).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }.bind(this))
      },
      render: function() {
        $scope.loading = false

        setgridModel()
      }

    }

    $scope.save = function(event) {
      if ($scope.isEditorFlag) {
        return "节点数据不可编辑";
      };
      var model = _.pick($scope.viewModel, "batch", "name", "id", "remark", "subjectId");
      if (model.name == "") {
        return false
      }
      model.remark = $scope.nodecomment
      if (model.batch.length < 1) {
        $(document).Alert({
          "title": "提示",
          "str": "请至少选择一个批次",
          "mark": true
        });
        return false
      }
      $http({
        method: 'PUT',
        url: GLOBAL_STATIC.nodeRoot + 'node/impreserch/save/',
        /*        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },*/
        data: model

      }).success(function(response, status, headers, config) {
        var element = angular.element(event.target);
        disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
        element.closest("#nodeContent").hide();
        /*  $("#nodeContent").hide();*/
        $(".yunat_maskLayer").hide();
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        $scope.editNodeName(graph.nodeId, response.name, $scope.nodecomment);

      }.bind(this)).error(function(data, status, headers) {
        $(document).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    }

    function setgridModel() {
      for (var i in $scope.gridModel.data) {
        var id = $scope.gridModel.data[i].id;
        $scope.gridModel.data[i].select = false
        for (var j in $scope.viewModel.batch) {
          if ($scope.viewModel.batch[j].id == id) {
            $scope.gridModel.data[i].select = true
          }
        }
      }

    }

    //成功获取节点信息
    function getDateSucc(data) {
      /*        $scope.waitnode.name = data.name || "等待节点";
       $scope.waitnode.id = data.id;
       $scope.subjects = data.subjects
       $scope.defaultSubject = data.defaultSubject
       $scope.batch = data.batch*/
      /* data.batch=[]*/
      if (data.batch == null) {
        data.batch = []
      }
      $scope.nodecomment = data.remark;
      $scope.viewModel = _.extend($scope.viewModel, data);
      $scope.viewModel.subjectId = data.defaultSubject;
      Grid.params.subjectId = $scope.viewModel.subjectId;

      for (var i in $scope.viewModel.subjects) {
        if ($scope.viewModel.subjects[i].id == $scope.viewModel.subjectId) {
          $scope.viewModel.subjectName = $scope.viewModel.subjects[i].name
        }
      }
      Grid.ajax();
      Grid.event()
    }

    //获取失败
    function getDateError() {
      $(this).Alert({
        "title": "提示",
        "str": data.message,
        "mark": true
      });
    }

    //请求数据
    getListService.impreserch(getDateSucc, getDateError, {
      id: graph.nodeId
    })

    getListService.getNodeTipsByType(function(responseTips) { // 获取tips
      $scope.waitnode.tips = responseTips.tips || "";
    }, "tfilterdataImport");
    $scope.openNodePop(); //显示节点弹出框
  }
]);
