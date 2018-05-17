angular.module("dataManage.controllers").controller('customDataImport', ["$scope", "$timeout", "$compile", "$http", "$location", "$cacheFactory", "ngDataImportService",
  function($scope, $timeout, $compile, $http, $location, $cacheFactory, ngDataImportService) {

    $scope.titleName = "客户数据导入";
    $scope.index = 1;
    $scope.initState = false;
    $scope.initStateThree = false;
    $scope.columns = {};
    $scope.tips = {};
    $scope.fileId;
    $scope.stepOne = {};
    $scope.stepTwo = {};
    $scope.stepTwo.colConf = [];
    $scope.stepTwo.columns = [];
    $scope.stepThree = {};
    $scope.mycache = $cacheFactory.get('customData') || $cacheFactory('customData');
    $scope.prevSpaF = false;
    $scope.prevBtnF = {
      'visibility': 'hidden'
    };
    $scope.tabClass = {
      'tab1': {
        'hover': true
      },
      'tab2': {
        'hover': false
      }
    };
    $scope.stepOneClass = {
      'completed': {
        'did-icon-completed': false
      },
      'noCompleted': {
        'dids-non-complete': false
      }
    };
    $scope.stepTwoClass = {
      'completed': {
        'did-icon-completed': false
      },
      'noCompleted': {
        'dids-non-complete': true
      }
    };
    $scope.stepThreeClass = {
      'completed': {
        'did-icon-completed': false
      },
      'noCompleted': {
        'dids-non-complete': true
      }
    };

    $scope.setInitStatus = function(data) {
      $timeout(function() {
        if (data.hasOwnProperty('state')) {
          $scope.id = data.id;
          $scope.state = data.state;
          switch (data.state) {
            //初始页面
            case 0:
              $scope.index = 1;
              toStep($scope.index);
              console.log($scope.stepOne)
              $scope.stepOne.platformList = $scope.stepOne.platformList !== undefined ? $scope.stepOne.platformList : data.platform;
              $scope.stepOne.curPlatformId = $scope.stepOne.curPlatformId !== undefined ? $scope.stepOne.curPlatformId : data.platform[0].id;
              if($scope.stepOne.splitSign == 0){
                $scope.stepOne.splitSign = 'number:0'
              }
              else if($scope.stepOne.splitSign == 1){
                $scope.stepOne.splitSign = 'number:1'
              }
              else if($scope.stepOne.splitSign == 2){
                $scope.stepOne.splitSign = 'number:2'
              }
              $scope.stepOne.splitSign = $scope.stepOne.splitSign !== undefined ? $scope.stepOne.splitSign : 'number:0';
              $scope.stepOne.headFlag = $scope.stepOne.headFlag !== undefined ? $scope.stepOne.headFlag : false;
              $scope.stepOne.prevFlag = $scope.stepOne.prevFlag !== undefined ? $scope.stepOne.prevFlag : false;
              $scope.stepThree.importFlag = $scope.stepOne.importFlag !== undefined ? $scope.stepOne.importFlag : false;
              $scope.stepThree.verifyBtnF = $scope.stepOne.verifyBtnF !== undefined ? $scope.stepOne.verifyBtnF : false;
              break;
            //字段选择页面
            case 1:
              var header = data.preview.header;
              $scope.index = 2;
              data.data = data.preview.data;
              data.header = data.preview.header;
              $scope.initState = true;
              $scope.columns = {};
              $scope.tips = {};
              $scope.stepTwo.colConf = [];
              $scope.stepTwo.columns = [];
              angular.forEach($scope.stepTwo.columns,
                  function(value, key) {
                    value = null;
                  });
              toStep(2);
              $scope.formatData(data);
              $scope.displayColumn(data);
              /*
               if (data.batchColumns) {
               var batchColumns = data.batchColumns;
               for(var i = 0;i<batchColumns.length; i++) {
               var order = batchColumns[i].order;
               $scope.stepTwo.columnChange(order, header[order]);
               }
               }*/
              break;
            //验方式选择页面
            case 2:
              $scope.index = 2;
              $scope.initState = true;
              $scope.initStateThree = true;
              toStep(3);
              $scope.displayVerify(data);
              break;
            //正在校验页面
            case 3:
              $scope.index = 3;
              $scope.initState = true;
              $scope.initStateThree = true;
              $scope.stepThree.percent = data.progress;
              toStep(3);
              $scope.stepThree.importFlag = false;
              //issue :CCMSQY-2532需求
              $timeout(function() {
                    $scope.stepThree.progressFlag = true;
                  },
                  0);
              $scope.stepThree.verifyBtnF = false;
              $scope.displayProgress(data);
              break;
            //导入页面
            case 4:
              $scope.index = 3;
              $scope.initState = true;
              $scope.initStateThree = true;
              toStep(3);
              $scope.displayResult(data);
              break;
          }
        }
      }, 0);
    }

    ngDataImportService.getInitStatus($scope.setInitStatus);

    $scope.stepOne.platformChange = function(pId) {
      $scope.stepOne.curPlatformId = pId;
    }

    $scope.stepOne.checkName = function() {
      var sequence = $scope.stepOne.sequence || '';
      var params = {
        'id': $scope.id,
        'name': sequence
      }
      var callback = function(data) {
        $scope.stepOne.warningFlag = !(data == true);
        $scope.stepOne.warningText = '导入批次名称不可重复';
      }

      if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
          return this.replace(/^\s+|\s+$/g, '');
        }
      }
      if (!sequence.trim()) {
        $scope.stepOne.warningFlag = true;
        $scope.stepOne.warningText = '导入批次名称不可为空';
      } else {
        ngDataImportService.checkName(callback, params);
      }
      return ! $scope.stepOne.warningFlag;
    }

    $scope.stepOne.checkFile = function() {
      if ($scope.fileId && $scope.fileId != null) {
        $scope.stepOne.upFileWarningFlag = false;
        $scope.stepOne.upFileWarningText = '';
        return true;
      } else {
        $scope.stepOne.upFileWarningFlag = true;
        $scope.stepOne.upFileWarningText = '导入文件不可为空';
        return false;
      }
    }

    $scope.stepOne.splitSignChange = function(signId) {
      $scope.stepOne.splitSign = signId;
    }

    $scope.formatData = function(data) {
      //两个接口返回的数据格式不同，在此统一处理
      var header = data.header || data.preview.header;
      var colAutoWidth = true,
          flexResizable = true;
      var flexGrid, flexHeight, flexWidth;
      $scope.prevData = data;
      if (!$scope.stepTwo.header) {
        $scope.stepTwo.header = data.header;
      }

      if (header.length > 4 && $scope.index === 1) {
        colAutoWidth = false;
        flexWidth = 130;
      } else {
        flexWidth = 1;
        colAutoWidth = true;
        flexResizable = false;
      }

      $scope.colModel = [];
      for (var i = 0; i < header.length; i++) {
        var colItem = {
          display: header[i],
          name: header[i] + i,
          width: flexWidth,
          sortable: false,
          align: 'center',
          dataindex: header[i]
        };
        $scope.colModel.push(colItem);
      }
      if ($scope.index === 1) {
        flexGrid = $($('#previewMain').children()[0]);
        flexGrid.removeClass('flexigrid');
        flexHeight = 'auto';
      } else {
        flexGrid = $($('#configMain').children()[0]);
        flexGrid.removeClass('flexigrid');
        flexHeight = 250;
        for (var j = 1; j < header.length; j++) {
          $scope.stepTwo['col' + j] = header[j];
        }
      }

      flexGrid.flexigrid({
        //url: GLOBAL_STATIC.datamanageRoot + 'extImport/preview/?fileId=' + params.fileId + '&delimiter=' + params.delimiter + '&hasColumn=' + params.hasColumn,
        height: flexHeight,
        resizable: flexResizable,
        method: 'GET',
        dataType: 'json',
        colAutoWidth: colAutoWidth,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: $scope.colModel,
        /* params: campListParams,*/
        updateDefaultParam: true,
        sortname: "",
        sortorder: "desc",
        buttons: [],
        showTableToggleBtn: true,
        onSuccess: function(_this, resData) {},
        onError: function(response) {
          var responseText = response.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
      flexGrid.flexAddData(data);
    }

    $scope.getPreviewData = function() {
      var num1 = 0;
      if($scope.stepOne.splitSign == 'number:0'){
        num1 = 0
      }
      else if($scope.stepOne.splitSign == 'number:1'){
        num1 = 1
      }
      else if($scope.stepOne.splitSign == 'number:2'){
        num1 = 2
      }
      var params = {
        fileId: $scope.fileId,
        delimiter: num1,
        hasColumn: $scope.stepOne.headFlag
      };
      ngDataImportService.getPreviewData($scope.formatData, params);
    }

    $scope.stepOne.preView = function() {
      if (!$scope.$$phase) {
        $scope.$apply();
      }
      $timeout(function() {
        $('#dataPreview').addInteractivePop({
          magTitle: '文件预览',
          width: 759,
          height: 416,
          mark: false,
          position: 'fixed',
          childElePop: true
        });
      }, 0);

      $scope.getPreviewData();
    }

    $scope.displayColumn = function(data) {
      var headerLen = data.preview.header.length || 6;
      $scope.stepTwo.header = data.preview.header;
      $scope.id = data.id;
      $scope.state = data.state;
      for (var i = 0; i < headerLen; i++) {
        $scope.stepTwo.columns.push($.extend(true, [], data.columns));
      }
    }

    $scope.stepTwoInit = function() {
      var num2 = 0;
      if($scope.stepOne.splitSign == 'number:0'){
        num2 = 0
      }
      else if($scope.stepOne.splitSign == 'number:1'){
        num2 = 1
      }
      else if($scope.stepOne.splitSign == 'number:2'){
        num2 = 2
      }
      var params = {
        'platform': $scope.stepOne.curPlatformId,
        'fileId': $scope.fileId,
        'name': $scope.stepOne.sequence,
        'delimiter': num2,
        'hasColumn': $scope.stepOne.headFlag
      }
      $scope.getPreviewData();
      ngDataImportService.saveFile($scope.setInitStatus, params);
    }

    $scope.stepTwo.columnChange = function(index, col) {
      var stepTwo = $('#stepTwo'),
          findCont = 'th[abbr=\'' + col + index + '\']',
          columnId = $scope.columns[col + index],
          colItem = {
            'order': index,
            'columnId': columnId
          },
          tips,
          curColumn;

      //如果配置数组里已有对当前列的配置信息，将此信息拿出放入curColumn
      for (var i = 0; i < $scope.stepTwo.colConf.length; i++) {
        var obj = $scope.stepTwo.colConf[i];
        if (obj.order === colItem.order) {
          curColumn = $scope.stepTwo.colConf[i];
          $scope.stepTwo.colConf.splice(i, 1);
          break;
        }
      }
      //遍历所有下拉数组，将curColumn信息放入，同时对当前列的下拉数组删除选择信息
      for (var j = 0; j < $scope.stepTwo.columns.length; j++) {
        var item = $scope.stepTwo.columns[j];
        if (j !== index) {
          for (var k = 0; k < item.length; k++) {
            var childItem = item[k];
            if (childItem.id === columnId) {
              item.splice(k, 1);
            }
          }
          if (curColumn && curColumn.name) {
            item.push({
              'id': curColumn.columnId,
              'name': curColumn.name,
              'tips': curColumn.tips || ''
            });
          }
        } else {
          for (var m = 0; m < item.length; m++) {
            var childItem = item[m];
            if (childItem.id === columnId) {
              colItem.tips = childItem.tips || '';
              colItem.name = childItem.name;
            }
          }
        }
      }
      if (columnId) {
        $scope.stepTwo.colConf.push(colItem);
        $scope.tips[col + index] = colItem.tips;
        stepTwo.find(findCont).find('div').text(colItem.name).css('font-weight', 'bold');
      } else {
        $scope.tips[col + index] = '';
        stepTwo.find(findCont).find('div').text(col).css('font-weight', 'normal');
      }
    }

    $scope.stepThree.stopVerify = function() {
      var params = {
        id: $scope.id
      }
      var callback = function(data) {
        $scope.id = data.id;
        $scope.state = data.state;
      }
      clearInterval($scope.stepThree.checkPoll);
      $scope.stepThree.importFlag = false;
      $scope.stepThree.progressFlag = false;
      $scope.stepThree.verifyBtnF = true;
      angular.element('#prevBtn').prop('disabled', false);
      $scope.stepThree.percent = 0;
      ngDataImportService.stopVerify(callback, params);
    }

    $scope.displayResult = function(data) {
      clearInterval($scope.stepThree.checkPoll);
      $scope.stepThree.percent = 100;
      $scope.stepThree.importFlag = true;
      $scope.stepThree.progressFlag = false;
      $scope.stepThree.verifyBtnF = false;
      //$scope.stepThree.percent = 0;
      $('.progress-bar').width('100%');
      angular.element('#prevBtn').prop('disabled', false);
      $scope.id = data.id;
      $scope.state = data.state;
      $scope.stepThree.upload = data.upload;
      $scope.stepThree.distinct = data.distinct;
      $scope.stepThree.verify = data.verify;
    }

    $scope.displayProgress = function(data) {
      $scope.id = data.id;
      $scope.stepThree.percent = 0;
      var params = {
        'id': $scope.id
      };

      var callback = function(data) {
        $scope.stepThree.percent = data.progress;
        if(data.progress == 100){
          $('.progress-bar').width('100%');
        }
        if (data.state && data.state == 4) {
          $scope.displayResult(data);
        }
      };
      var erroback = function(data) {
        $timeout(function() {
          clearInterval($scope.stepThree.checkPoll);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }, 0);
      };

      $scope.stepThree.percent = data.progress;
      $scope.stepThree.checkPoll = setInterval(function() {
        ngDataImportService.getProgress(callback, params, erroback);
      }, 5000);
    }

    $scope.stepThree.startVerify = function() {
      var params = {
        'id': $scope.id,
        'type': $scope.stepThree.verifyType
      }
      $scope.stepThree.percent = 0;
      $('.progress-bar').width('0%');
      $scope.stepThree.importFlag = false;
      $scope.stepThree.progressFlag = true;
      $scope.stepThree.verifyBtnF = false;
      angular.element('#prevBtn').prop('disabled', true);
      ngDataImportService.startVerify($scope.displayProgress, params);
    }

    $scope.displayVerify = function(data) {
      $scope.stepThree.verifyList = data.verify;
      $scope.id = data.id;
      $scope.state = data.state;
      $scope.stepThree.progressFlag = false;
      $scope.stepThree.importFlag = false;
      $scope.stepThree.verifyBtnF = true;
      $scope.stepThree.verifyType = data.verify[0].id;
    }

    $scope.stepThree.startImport = function() {
      var params = {
        'id': $scope.id
      };
      var importBtn = angular.element('#importBtn')

      var callback = function(data) {
        $timeout(function() {
          var msg = '导入成功';
          if (data.hasOwnProperty('result') && data.result === false) {
            msg = '导入失败!失败原因：文件格式不正确！';
            $(this).Alert({
              "title": '',
              "str": msg,
              "mark": true
            });
          } else {
            $(this).yAlert({
              "text": msg
            });
            removeAlert();
          }
          $('#portUpLoadFile-button').find('span').text('上传文件');
          importBtn.prop('disabled', false);
          $scope.index = 1;
          reSetAll();
          ngDataImportService.getInitStatus($scope.setInitStatus);
          //toStep($scope.index);
        }, 0);
      }

      importBtn.prop('disabled', true);
      ngDataImportService.startImport(callback, params);
    }

    $scope.stepThreeInit = function() {
      var params = {
        'id': $scope.id,
        'column': $scope.stepTwo.colConf
      }
      ngDataImportService.saveColumn($scope.displayVerify, params);
    }

    function toData(index) {
      switch (index) {
        case 1:
          break;
        case 2:
          if (!$scope.initState) {
            $scope.stepTwoInit();
          }
          break;
        case 3:
          if (!$scope.initStateThree) {
            $scope.stepThreeInit();
          }
          break;
      }
    }

    function reSetAll() {
      //初始化数据
      $scope.columns = {};
      $scope.tips = {};
      $scope.stepTwo.colConf = [];
      angular.forEach($scope.stepTwo.columns,
          function(value, key) {
            value = null;
          });
      $scope.stepOne.sequence = '';
      $('#portUpLoadFile').val('上传文件');
      $scope.fileId = null;
    }

    function toStep(index) {
      var errorMsgF = false,
      //标志位，判定是否忽略验证相关操作
          errorMsg = '',
          customIdF = false,
          customConF = false;
      switch (index) {
        case 1:
          $scope.stepOneF = true;
          $scope.initState = false;
          $scope.stepTwoF = $scope.stepThreeF = false;
          $scope.nextBtnF = true;
          $scope.prevBtnF = {
            'visibility': 'hidden'
          };
          $scope.stepThree.importFlag = false;
          $scope.stepThree.verifyBtnF = false;
          $scope.stepOneClass.completed['did-icon-completed'] = false;
          $scope.stepTwoClass.completed['did-icon-completed'] = false;
          $scope.stepThreeClass.completed['did-icon-completed'] = false;
          $scope.stepOneClass.noCompleted['dids-non-complete'] = false;
          $scope.stepTwoClass.noCompleted['dids-non-complete'] = true;
          $scope.stepThreeClass.noCompleted['dids-non-complete'] = true;
          //初始化数据
          $scope.stepOne.splitSign = 0;
          $scope.columns = {};
          $scope.tips = {};
          $scope.stepTwo.colConf = [];
          angular.forEach($scope.stepTwo.columns, function(value, key) {
            value = null;
          });
          $scope.stepOne.warningFlag = false;
          $scope.stepOne.warningText = '';
          break;
        case 2:
          if (($scope.stepOne.checkName() && $scope.stepOne.checkFile()) || $scope.initState) {
            $scope.initStateThree = false;
            $scope.stepTwoF = true;
            $scope.initStateThree = false;
            $scope.stepOneF = $scope.stepThreeF = false;
            $scope.prevBtnF = {
              'visibility': 'visible'
            };
            $scope.prevSpaF = false;
            $scope.nextBtnF = true;
            $scope.stepThree.importFlag = false;
            $scope.stepThree.verifyBtnF = false;
            $scope.stepOneClass.completed['did-icon-completed'] = true;
            $scope.stepTwoClass.completed['did-icon-completed'] = false;
            $scope.stepThreeClass.completed['did-icon-completed'] = false;

            $scope.stepOneClass.noCompleted['dids-non-complete'] = false;
            $scope.stepTwoClass.noCompleted['dids-non-complete'] = false;
            $scope.stepThreeClass.noCompleted['dids-non-complete'] = true;
            if ($scope.initState) {
              $scope.$apply();
            } else {
              $timeout(function() {
                $scope.$apply();
              }, 0);
            }
          } else {
            errorMsgF = true;
          }
          break;
        case 3:
          //对字段配置必选值验证
          for (var i = 0; i < $scope.stepTwo.colConf.length; i++) {
            if ($scope.stepTwo.colConf[i].columnId === 1) {
              customIdF = true;
            }
            customConF = true;
          }
          if ((customIdF && customConF) || $scope.initStateThree) {
            $scope.stepThreeF = true;
            $scope.stepOneF = $scope.stepTwoF = false;
            $scope.prevBtnF = {
              'visibility': 'visible'
            };
            $scope.prevSpaF = false;
            $scope.stepThree.verifyBtnF = true;
            $scope.nextBtnF = false;
            $scope.stepOneClass.completed['did-icon-completed'] = true;
            $scope.stepTwoClass.completed['did-icon-completed'] = true;
            $scope.stepThreeClass.completed['did-icon-completed'] = false;

            $scope.stepOneClass.noCompleted['dids-non-complete'] = false;
            $scope.stepTwoClass.noCompleted['dids-non-complete'] = false;
            $scope.stepThreeClass.noCompleted['dids-non-complete'] = false;
          } else if (customConF) {
            if (!customIdF) {
              errorMsg = '请配置客户ID字段';
              errorMsgF = true;
            }
          } else if (!customConF) {
            errorMsg = "请配置文件字段";
            errorMsgF = true;
          }
          break;
      }
      if (errorMsgF) {
        $scope.index--;
        if (errorMsg !== '') {
          $timeout(function() {
            $(this).Alert({
              "title": '',
              "str": errorMsg,
              "mark": true
            });
          }, 0);
        }
      } else {
        toData(index);
      }
    }

    $scope.updateState = function() {
      var state = $scope.state;

      if (state == 4) {
        state = 2;
        $scope.index = 2;
      } else {
        state = $scope.state - 1 > 0 ? $scope.state - 1 : 0;
      }
      var params = {
        'state': state,
        'id': $scope.id
      }
      var callback = function(data) {
        $scope.setInitStatus(data);
      }
      ngDataImportService.updateState(callback, params);
    }

    $scope.prevStep = function() {
      if ($scope.index > 1) {
        $scope.index--;
      }
      $scope.updateState();
      //toStep($scope.index);
      //toData($scope.index);
    }

    $scope.nextStep = function() {
      if ($scope.index < 3) {
        $scope.index++;
      }
      toStep($scope.index);
    }

    $scope.showDataImport = function() {
      $('#dataImport').show();
      $('#importList').hide();
      $('.dataImportListul li').eq(1).removeClass('active')
      $('.dataImportListul li').eq(0).addClass('active')
      $scope.tabClass.tab1.hover = true;
      $scope.tabClass.tab2.hover = false;
      $scope.backToListF = false;
      $scope.titleName = "客户数据导入";
    }

    $scope.displayImportList = function(data) {
      var sel = 20;
      var importListMain = $('#importListMain');
      importListMain.removeClass('ng-hide');
      var flexGrid = $(importListMain.children()[0]);
      var colModel = [{
        display: '批次编号',
        name: 'id',
        width: 1,
        sortable: false,
        align: 'right',
        dataindex: 'id'
      },
      {
        display: '所属平台',
        name: 'platform',
        width: 1,
        sortable: false,
        align: 'left',
        dataindex: 'platform'
      },
      {
        display: '批次名称',
        name: 'name',
        width: 1,
        sortable: false,
        align: 'left',
        dataindex: 'name'
      },
      {
        display: '分隔符',
        name: 'delimiter',
        width: 1,
        sortable: false,
        align: 'left',
        dataindex: 'delimiter'
      },
      {
        display: '第一行是否包含字段名',
        name: 'hasColumnName',
        width: 1,
        sortable: false,
        align: 'right',
        dataindex: 'hasColumnName'
      },
      {
        display: '总记录数',
        name: 'totalNum',
        width: 1,
        sortable: false,
        align: 'right',
        dataindex: 'totalNum'
      },
      {
        display: '成功导入数',
        name: 'importNum',
        width: 1,
        sortable: false,
        align: 'right',
        dataindex: 'importNum'
      },
      {
        display: '导入时间',
        name: 'importTime',
        width: 1,
        sortable: false,
        align: 'center',
        dataindex: 'importTime',
        renderer: function(v) {
          return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
        }
      },
      {
        display: '导入人',
        name: 'operator',
        width: 1,
        sortable: false,
        align: 'left',
        dataindex: 'operator'
      },
      {
        display: '操作',
        name: 'enable',
        width: 2,
        align: 'left',
        dataindex: 'enabled',
        mapping: ['id', 'reserved'],
        convert: function(v, mappVal) {
          var text1 = '<span class="icon-search icon-search-color icon-medium-size" ng-click="importDetail(' + mappVal[0] + ')" title="查看"></span>';
          return text1;
        }
      }];
      flexGrid.flexigrid({
        url: GLOBAL_STATIC.datamanageRoot + 'extImport/list/',
        method: 'GET',
        dataType: 'json',
        resizable: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: colModel,
        /* params: campListParams,*/
        updateDefaultParam: true,
        sortname: "",
        sortorder: "desc",
        usepager: true,
        useRp: true,
        rp: 20,
        showTableToggleBtn: true,
        colAutoWidth: true,
        onSuccess: function(_this, resData) {
          var curScope = angular.element('#importListMain').scope();
          $compile(angular.element("#importListMain"))($scope || curScope);
          if (!$scope.$$phase) {
            $scope.$apply();
          }
          $('.flexigrid select').val(sel)
        },
        onError: function(response) {
          var responseText = response.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
      //$('.pReload').remove();
      flexGrid.flexAddData(data);
      $('.flexigrid select').change(function(event) {
        sel = $(this).children('option:selected').val()
      });
    }

    $scope.displayImportDetail = function(data, flexGrid) {
      var flexGrid = $($('#importDetailP').children()[0]);
      var id = $scope.importData.id;

      var colModel = [];
      var header = data.header;
      for (var i = 0; i < header.length; i++) {
        var colItem = {
          display: header[i],
          name: header[i],
          width: 1,
          sortable: false,
          align: 'center',
          renderer: function(v) {
            if (v == null || v == 'null') {
              return "";
            } else {
              return v;
            }
          },
          dataindex: header[i]
        };
        colModel.push(colItem);
      }

      flexGrid.flexigrid({
        url: GLOBAL_STATIC.datamanageRoot + 'extImport/detail/?id=' + id,
        method: 'GET',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: colModel,
        /* params: campListParams,*/
        updateDefaultParam: true,
        sortname: "",
        sortorder: "desc",
        buttons: [],
        usepager: true,
        useRp: true,
        rp: 20,
        showTableToggleBtn: true,
        colAutoWidth: true,
        onSuccess: function(_this, resData) {
          var curScope = angular.element('#previewMain').scope();
          $compile(angular.element("#previewMain"))($scope || curScope);
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        },
        onError: function(response) {
          var responseText = response.responseText;
          var data = $.parseJSON(responseText);
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
      //$('.pReload').remove();
      flexGrid.flexAddData(data);
    }

    $scope.importDetail = function(id) {
      var params = {
        'id': id,
        'page': 1,
        'pagesize': 20
      };
      $scope.importData = {
        'id': id
      };
      var flexGrid = $($('#importDetailP').children()[0]);
      flexGrid.empty().removeClass('flexigrid');
      $scope.importListParentF = false;
      $scope.backToListF = true;
      $scope.titleName = "导入组明细查看";
      $scope.importDetailF = true;
      ngDataImportService.getImportDetail($scope.displayImportDetail, params);
    }

    $scope.showImportList = function() {
      $('#dataImport').hide();
      $('#importList').show();
      $('.dataImportListul li').eq(0).removeClass('active')
      $('.dataImportListul li').eq(1).addClass('active')
      $scope.tabClass.tab1.hover = false;
      $scope.tabClass.tab2.hover = true;

      $scope.backToListF = false;
      $scope.importListParentF = true;
      $scope.importDetailF = false;
      var params = {
        'page': 1,
        'pagesize': 20
      };
      var importListCah = $scope.mycache.get('importListCah');
      var callback = function(data) {
        $scope.mycache.put('importListCah', data);
        $scope.displayImportList(data);
      };

      if (importListCah) {
        $scope.displayImportList(importListCah);
      } else {
        ngDataImportService.getImportList(callback, params);
      }
    }

    $scope.backToList = function() {
      $scope.backToListF = false;
      $scope.importListParentF = true;
      $scope.importDetailF = false;
      $scope.titleName = "客户数据导入";
    }
  }
]);
