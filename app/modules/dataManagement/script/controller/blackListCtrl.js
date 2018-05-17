/**
 * Created by dupenghui on 2014/8/12.
 */
angular.module("dataManage.controllers").controller('blackListCtrl', ["$scope", "$window", "$location", "$http", "$compile", "ngRedAndBlackCustomService", "FileUploader",
  function($scope, $window, $location, $http, $compile, ngRedAndBlackCustomService, FileUploader) {
    $scope.selectedIds = [];
    $scope.deselectedIds = [];
    $scope.editRedCustom = {};
    $scope.currentGroup = {};
    $scope.selectMode = "BY_ID";
    $scope.progress = false;
    $scope.single = {};
    //关闭弹框分组
    cancelgroup = function(){
      $('.popRemoveFlag').hide();
      $scope.groupShow = false;
    };
    //自定义表格
    $scope.gridObj = {
      "curAttrId": "",
      "showConfigAttrSrc": "",
      "addCustomAttrPage": true,
      "customList": "",
      "customVal": "",
      "dataCoverList": [{
        "selectMode": "BY_ID",
        "selectText": "选择当页"
      },
      {
        "selectMode": "BY_QUERY",
        "selectText": "选择全部"
      }],
      "girdElement": angular.element("#couponListsGrid")[0],
      //use 表格列表行内编辑
      "redListEidt": function(param, name) { //自定义数据权限
        $(".editPop").addInteractivePop({
          magTitle: "编辑客户黑名单",
          width: 470,
          mark: true,
          height: 250,
          position: "fixed",
          childElePop: true
        });
        $scope.edittype = "single";
        $scope.intiEidtPop();
        ngRedAndBlackCustomService.getRedAndBlackCustomById(function(response) { //获取存储类型lists
          $scope.editRedCustom = response;
          $scope.editRedCustom.groupName = name;
          $scope.editRedCustom.checklistId = param
        }, param);
      },

      //编译模板用的  编译类为couponListsGrid元素及子元素
      "upCompile": function(curScope, nubFlag) {
        if (!nubFlag) {
          $compile(angular.element(".hDivBox"))($scope || curScope);
        }
        /*  新增 flex逻辑一道控制器中    thead中有scope变量 也要编译以下  */
        $compile(angular.element("#couponListsGrid"))($scope || curScope);
        $scope.checkStatus = false;
        $scope.$apply();
        $(".cloneCheckbox").removeClass("cloneCheckboxHalfChecked");
      },
      //主题筛选
      "changeActivityByPlat": function(atr) {
        this.girdElement.grid.addParams("subjectId", atr);
        this.girdElement.p.newp = 1;
        this.girdElement.grid.populate();
        $scope.querySubjectId = atr || "";
      },
      //分组筛选
      "changeActivityByGroupId": function(atr) {
        this.girdElement.grid.addParams("groupId", atr);
        this.girdElement.p.newp = 1;
        this.girdElement.grid.populate();
        $scope.queryGroupId = atr || "";
      },
      //搜索
      "searchButtonClick": function(hdVal, othFlag) {
        var curGridElement = angular.element("#couponListsGrid")[0];
        curGridElement.p.qtype = "keywords";
        curGridElement.p.query = hdVal || "";
        curGridElement.p.newp = 1;
        curGridElement.grid.populate();
      },
      //点击树更新 unused
      "updateFromTreeClick": function(id) {
        this.girdElement.grid.addParams("classificationId", id);
        this.girdElement.grid.populate();
      },
      //表格标题行里面的复选框按钮
      "selectChange": function() {
        $(".cloneCheckbox").removeClass("cloneCheckboxHalfChecked");
        $scope.checkStatus = !$scope.checkStatus;
        if ($scope.selectMode == "BY_QUERY") {
          angular.element("#couponListsGrid").find("tr input").attr("checked", $scope.checkStatus);
          if ($scope.checkStatus) {
            angular.element("#couponListsGrid").find("tr input").attr("disabled", "disabled");
          } else {
            angular.element("#couponListsGrid").find("tr input").removeAttr("disabled");
          }
        } else {
          angular.element("#couponListsGrid").find("tr input").attr("checked", $scope.checkStatus);
        }
        angular.forEach($scope.single, function(value, key) {
          $scope.single[key] = $scope.checkStatus ? 'yes' : 'no';
        })
      },
      //当前页和全部页联动复选框
      "changeCheckbox": function() {
        if ($scope.checkStatus) {
          if ($scope.selectMode == "BY_ID") {
            angular.element("#couponListsGrid").find("tr input").removeAttr("disabled");
            angular.element("#couponListsGrid").find("tr input").attr("checked", $scope.checkStatus);
          } else {
            angular.element("#couponListsGrid").find("tr input").attr("checked", $scope.checkStatus);
            angular.element("#couponListsGrid").find("tr input").attr("disabled", "disabled");
          }
        }
      },
      //点击表格列表触发的复选框事件
      "singleSelectChange": function(value, en) {
        $scope.getSelectedIds();
        if ($scope.checkStatus && en[value] == "no") {
          $scope.checkStatus = false;
          if($scope.allIds.length == 1) {
            $(".cloneCheckbox").removeClass("cloneCheckboxChecked");
          } else {
            $(".cloneCheckbox").addClass("cloneCheckboxHalfChecked");
          }
        } else if ($scope.checkStatus && en[value] == "yes") {
          $scope.checkStatus = true;
          $(".cloneCheckbox").removeClass("cloneCheckboxHalfChecked");
        } else if (!$scope.checkStatus && en[value] == "yes") {
          var selectedlength = $scope.selectedIds.length;
          var allselectedlength = $scope.allIds.length;
          if (selectedlength == allselectedlength) {
            $scope.checkStatus = true;
            $(".cloneCheckbox").removeClass("cloneCheckboxHalfChecked");
          } else {
            $(".cloneCheckbox").addClass("cloneCheckboxHalfChecked");
          }

        } else if (!$scope.checkStatus && en[value] == "no") {
          var selectedlength = $scope.selectedIds.length;
          if (selectedlength == 0) {
            $(".cloneCheckbox").removeClass("cloneCheckboxHalfChecked");
            $scope.checkStatus = false;
          }
        }
      }
    };
    //读取选中的ids
    $scope.getSelectedIds = function() {
      $scope.allIds = [];
      $scope.currentIds = [];
      $scope.selectedIds = [];
      var trs = angular.element("#couponListsGrid").find("tr");
      for (var i = 0; i < trs.length; i++) {
        var data = angular.element(trs[i]).data();
        var checklistId = data.rec["checklistId"];
        $scope.currentIds.push(checklistId);
        $scope.allIds.push(checklistId);
      }

      if ($scope.checkStatus) { ////选择全部
        if ($scope.selectMode == "BY_QUERY") {
          $scope.deselectedIds = [];
          $scope.selectedIds = $scope.allIds;
        } else {
          $scope.selectedIds = $scope.currentIds;
        }
      } else {
        $scope.selectMode = "BY_ID";
        for (var i = 0; i < trs.length; i++) {
          if ($(trs[i]).find("input").attr("checked")) {
            var data = angular.element(trs[i]).data();
            var checklistId = data.rec["checklistId"];
            $scope.selectedIds.push(checklistId);
          }
        }
      }
    };
    //读取分组列表
    $scope.getAllGroup = function() {
      ngRedAndBlackCustomService.getGroup(function(response) { //获取存储类型lists
        $scope.groups = response;
      }, "BLACK");
    };
    $scope.getAllGroup();
    //读取主题列表
    $scope.getAllSubject = function() {
      ngRedAndBlackCustomService.getPlatList(function(response) { //获取存储类型lists
        $scope.subjects = response;
      }, "BLACK");
    };
    $scope.getAllSubject();
    //设置高度
    $scope.InitHeight = function() {
      var height = $(".groups_selector").height();
      if (height > 300) {
        $(".type_selector .groups_selector").css({
          "max-height": "300px",
          "overflow-y": "scroll"
        })
      }
    }
    //初始化新增弹窗
    $scope.initAddPop = function() {
      $scope.platShow = false;
      $scope.customernoShow = false;
      $scope.groupShow = false;
      $scope.customerGroupIdShow = false;
      $scope.subjectId = "";
      $scope.customerno = "";
      $scope.groupName = "";
      $scope.remark = "";
      $scope.fileName = "";
      $scope.fileShow = false;
      $scope.upSuccess = false;
      $scope.fileId = "";
      angular.element("#file_upload").val = "";
      //$scope.initUp();
    };
    //初始化编辑弹窗
    $scope.intiEidtPop = function() {
      $scope.customerEditGroupIdShow = false;
      $scope.itemName = "";
      if ($scope.edittype == "list") {
        $scope.editRedCustom = {};
      }
    };
    //新增黑名单--"增加客户黑名单弹框"
    $scope.showAddCustomPop = function() {
      $scope.edittype = "";
      $scope.initAddPop();
      $scope.status = 0;
      $(".addPop").addInteractivePop({
        magTitle: "添加客户黑名单",
        width: 470,
        mark: true,
        height: 300,
        position: "fixed",
        childElePop: true
      });
      $(".bBRemove").addClass("btnBlue");
      $(".bBRemove").removeAttr("disabled");
      $scope.errorStatus=true;
    };
    //编辑批量----弹出黑名单
    $scope.showEditBulkPop = function() {
      $scope.select_Group = true;
      $scope.showEditBulkPop;
      $scope.edittype = "list";
      $scope.intiEidtPop();
      $scope.getSelectedIds();
      if ($scope.selectedIds.length == 0) {
        $(this).yAlert({
          "text": "请选择需要编辑的客户名单"
        });
        removeAlert();
      } else {
        $(".editPop").addInteractivePop({
          magTitle: "编辑客户黑名单",
          width: 470,
          mark: true,
          height: 250,
          position: "fixed",
          childElePop: true
        });
      }
    };
    //编辑批量黑名单

    $scope.$watch("select_Group", function(a, b) {
      if (a != b && a == true) {
        $scope.editRedCustom.groupName = ""
      }
    });
    $scope.$watch("editRedCustom.groupName", function(a, b) {
      if ($scope.edittype == "list") {
        if (a != b && a) {
          $scope.select_Group = false
        }
      }
    })

    $scope.redListEdit = function() {
      if (!$scope.editRedCustom.groupName && !$scope.select_Group) {
        $scope.customerEditGroupIdShow = true;
        return;
      } else {
        $scope.customerEditGroupIdShow = false;
        //批量编辑
        if ($scope.edittype == "list") {
          var editCustomList = {};
          if ($scope.selectMode == "BY_QUERY" && $scope.checkStatus) {
            $scope.select_Group ? editCustomList.groupId = "": editCustomList.groupId = $scope.editRedCustom.groupId;
            editCustomList.queryChecklistType = "BLACK";
            editCustomList.selectMode = $scope.selectMode;
            editCustomList.querySubjectId = $scope.querySubjectId;
            editCustomList.queryGroupId = $scope.queryGroupId;
            editCustomList.queryCustomerno = $scope.hdValue;
            editCustomList.deselectedIds = $scope.deselectedIds;
            /*	editCustomList.groupId = $scope.editRedCustom.groupId;*/
            editCustomList.remark = $scope.editRedCustom.remark;
          } else {
            $scope.select_Group ? editCustomList.groupId = "": editCustomList.groupId = $scope.editRedCustom.groupId;
            editCustomList.queryChecklistType = "BLACK";
            editCustomList.selectMode = $scope.selectMode;
            editCustomList.selectedIds = $scope.selectedIds;
            /*editCustomList.groupId = $scope.editRedCustom.groupId;*/
            editCustomList.remark = $scope.editRedCustom.remark;
          }
          ngRedAndBlackCustomService.putBulkList(function(response) {
            $(this).yAlert({
              "text": "批量编辑成功"
            });
            removeAlert();
            $(".editPop").hide();
            angular.element($("#couponListsGrid")).flexReload();
            $scope.checkStatus = false;
            $scope.groupShow = false;
            $scope.select_Group = true
            $(".cloneCheckbox").removeClass("cloneCheckboxHalfChecked cloneCheckboxChecked");
          }, editCustomList);
        }
        //单条编辑
        else if ($scope.edittype == "single") {
          var postCustom = {};
          postCustom.checklistId = $scope.editRedCustom.checklistId;
          postCustom.groupId = $scope.editRedCustom.groupId;
          postCustom.remark = $scope.editRedCustom.remark;
          ngRedAndBlackCustomService.editRedAndBlackCustom(function(response) {
            $(this).yAlert({
              "text": "编辑成功"
            });
            removeAlert();
            $(".editPop").hide();
            angular.element($("#couponListsGrid")).flexReload();
            $scope.groupShow = false;
          }, postCustom)
        }
      }
    };
    //删除批量黑名单
    $scope.deleteRedBulk = function() {
      $scope.getSelectedIds();
      if ($scope.selectedIds.length == 0) {
         $(this).Alert({
          "title": "提示",
          "str": "请选择需要删除的客户名单",
          "mark": true
        });
      } else {
        var deleteCustomList = {};
        var needReduce = false;
        var optionalSelectLength = $('#couponListsGrid tr').length;
        var couponListsGrid = angular.element($("#couponListsGrid"))[0];
        console.log(couponListsGrid.p)
        if($scope.selectedIds.length === optionalSelectLength && couponListsGrid.p.page !== 1 && couponListsGrid.p.page === couponListsGrid.p.pages) {
          needReduce = true;
        } else {
          needReduce = false;
        }
        if ($scope.selectMode == "BY_QUERY" && $scope.checkStatus) //全选状态
        {
          deleteCustomList.queryChecklistType = "BLACK";
          deleteCustomList.selectMode = "BY_QUERY";
          deleteCustomList.querySubjectId = $scope.querySubjectId;
          deleteCustomList.queryGroupId = $scope.queryGroupId;
          deleteCustomList.queryCustomerno = $scope.hdValue;
          deleteCustomList.deselectedIds = $scope.deselectedIds;
        } else {
          deleteCustomList.queryChecklistType = "BLACK";
          deleteCustomList.selectMode = "BY_ID";
          deleteCustomList.selectedIds = $scope.selectedIds;
        }
        $(this).Confirm({
          "title": "确认删除",
          "str": "确定批量删除吗？",
          "mark": true
        }, function() {
          ngRedAndBlackCustomService.deleteBulkList(function(response) {
            $(this).yAlert({
              "text": "删除成功"
            });
            removeAlert();
            var couponListsGrid = angular.element($("#couponListsGrid"));
            if(needReduce) {
              couponListsGrid[0].p.newp = couponListsGrid[0].p.page - 1;
            }
            couponListsGrid.flexReload();
            $scope.checkStatus = false;
            $scope.checkStatus = false;
            $(".cloneCheckbox").removeClass("cloneCheckboxHalfChecked cloneCheckboxChecked");
          }, deleteCustomList);
        })
      }
    };
    // 批量下载
    $scope.downLoad = function(type) {
      type = type || 'BLACK';
      ngRedAndBlackCustomService.downLoad(type, angular.noop, angular.noop);
    };
    $scope.downLoadUrl = function(type) {
      type = type || 'BLACK';
      return ngRedAndBlackCustomService.downLoadUrl(type, angular.noop, angular.noop);
    };
    $scope.downLoadTime = function(type) {
      return new Date().toLocaleDateString();
    };
    $scope.noDownLoadPermissions = function () {
      console.log('进来~' + $scope.downLoadPermissions);
      if ($scope.downLoadPermissions === undefined) {
        $(window).Alert({
          "title": "提示",
          "str": "对不起！正在查询下载权限！请稍后再试",
          "mark": true,
          "eleZindex": 1003,
          "markZindex": 1002
        });
        return;
      }
      $(window).Alert({
        "title": "提示",
        "str": '对不起,您没有下载权限！',
        "mark": true,
        "eleZindex": 1003,
        "markZindex": 1002
      });
    };
    //重置
    $scope.reset = function() {
      $scope.redGroupText = "请选择分组";
      $scope.redGroupValue = "";
      $scope.subjectStatusText = "请选择主题";
      $scope.subjectStatusValue = "";
      $scope.hdValue = "";

      $scope.gridObj.girdElement.p.qtype = "";
      $scope.gridObj.girdElement.p.query = "";

      var curGridElement = angular.element("#couponListsGrid")[0];
      curGridElement.grid.removeParams("groupId");
      curGridElement.grid.removeParams("subjectId");
      angular.element("#couponListsGrid").flexReload();
      $scope.checkStatus = false;
    }
    //导出
    $scope.reportRedBulk = function() {
      if ($scope.selectedIds.length == 0) {
        $(this).yAlert({
          "text": "请选择需要导出的客户名单"
        });
        removeAlert();
      }
    };
    /*var uploader = $scope.uploader = new FileUploader({
      url: GLOBAL_STATIC.componentRoot + 'files/upload/',
      autoUpload: true,
      alias: 'Filedata',
      filter: [{
        name:'maxSize',
        fn: function(file) {
          if(file.size > 1024) {
            return false;
          }
          else {
            return true;
          }
        }
      }]
    });*/

    $scope.fileName = '';

    var uploader = new plupload.Uploader({
      runtimes : 'html5,flash,silverlight,html4',
      browse_button : 'pickfiles',
      multi_selection:false,
      url : GLOBAL_STATIC.datamanageRoot + 'files/upload/',
      file_data_name: 'Filedata',
      unique_names : true,
      headers:{
        'X-TOKEN': GLOBAL_STATIC.Credentials.access_token,
        'Authorization': 'Bearer ' + GLOBAL_STATIC.Credentials.access_token
      },
      /*filters:{
        mime_types : [
          {title : "Text files", extensions : "txt"},
          {title : "Zip files", extensions : "zip"},
          {title : "Csv files", extensions : "csv"}
        ]
      },*/
      init:{
        FilesAdded:function(up, files){
          if(!files[0].size){
            $(this).Alert({"title": "提示", "str": "文件不能为空", "mark": true, "eleZindex": 20002, "markZindex": 20001});
            uploader.removeFile(files[0].id);
            return;
          }
          var arr = files[0].name.split('.');
          var str = arr[arr.length - 1];
          if(str != 'zip' && str != 'txt' && str != 'csv'){
            $(this).Alert({"title": "提示", "str": "文件格式错误,上传文件失败", "mark": true, "eleZindex": 20002, "markZindex": 20001});
            uploader.removeFile(files[0].id);
            return;
          }
          $scope.progress = true;
          $scope.$apply();
          uploader.start();
        },
        FileUploaded:function(up, files,responseObject){
          var data = JSON.parse(responseObject.response);
          $scope.fileName = "已成功上传文件：" + files.name;
          $scope.upSuccess = true;
          $scope.fileShow = false;
          $scope.progress = false;
          $scope.fileId = data.fileId;
          $(this).yAlert({
            "text": "文件 " + files.name + " 上传成功."
          });
          $scope.$apply();
          if(removeSetVar){
            clearTimeout(removeSetVar);
          }
          var removeSetVar=setTimeout(function() {
            $(".yAlert").parents(".ccmsPublicPopBg").remove();
            $(".yunat_maskLayer").last().remove();
          }, 1500);
        },
        UploadProgress:function(up,file){
          $('.uploadify-progress-bar').css({width:file.percent+'%'});
        }
      }
    })
    uploader.init()

    // 取消文件
    $('#cancelFile').click(function() {
        uploader.stop();
        $scope.progress = false;
        $scope.$apply();
    });

    /*uploader.onAfterAddingFile = function(fileItem) {
      console.log(fileItem);
      $scope.progress = true;
      $scope.$apply();
    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      $scope.fileName = "已成功上传文件：" + fileItem.file.name;
      $scope.upSuccess = true;
      $scope.fileShow = false;
      $scope.progress = false;
      $scope.fileId = response.fileId;
      $(this).yAlert({
        "text": "文件 " + fileItem.file.name + " 上传成功."
      });
      if(removeSetVar){
        clearTimeout(removeSetVar);
      }
      var removeSetVar=setTimeout(function() {
        $(".yAlert").parents(".ccmsPublicPopBg").remove();
        $(".yunat_maskLayer").last().remove();
      }, 1500);
    }*/
    //"增加客户黑名单弹框" --"增加客户黑名单分组弹框" -添加
    $scope.redListSave = function() {
      //单条数据上传
      if ($scope.status == 0) {
        if (!$scope.subjectId) {
          $scope.platShow = true;
          return;
        } else {
          $scope.platShow = false;
        }
        if (!$scope.customerno) {
          $scope.customernoShow = true;
          return;
        } else {
          $scope.customernoShow = false;
        }
        if (!$scope.groupName) {
          $scope.customerGroupIdShow = true;
          return;
        } else {
          $scope.customerGroupIdShow = false;
        }

        var redCustmerData = {
          customerno : $scope.customerno,
          subjectId : $scope.subjectId,
          remark : $scope.remark,
          checklistType : "BLACK",
          groupId : $scope.groupId,
          tenantId : DATA_STATIC.tenantId
        };

        disposeCommMethod.shuyunAjaxButtonClickMethod(function() { // 处理保存按钮多次点击出现的问题
          ngRedAndBlackCustomService.postRedAndBlackCustom(function(response) {
            $(this).yAlert({
              "text": "成功新增黑名单"
            });
            removeAlert();
            angular.element($("#couponListsGrid"))[0].p.newp = 1;
            angular.element($("#couponListsGrid")).flexReload();
            $(".addPop").hide();
            $scope.groupShow = false;
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
          }, redCustmerData);
        });
      }
      //批量数据上传
      else {
        if (!$scope.subjectId) {
          $scope.platShow = true;
          return;
        } else {
          $scope.platShow = false;
        }
        if ($scope.fileId == "") {
          $scope.fileShow = true;
          return;
        }
        else {
          $scope.fileShow = false;
        }
        if (!$scope.groupName) {
          $scope.customerGroupIdShow = true;
          return;
        } else {
          $scope.customerGroupIdShow = false;
        }

        var redCustmerData = {};
        redCustmerData.checklistType = "BLACK";
        redCustmerData.subjectId = $scope.subjectId;
        redCustmerData.filePath = $scope.fileId;
        redCustmerData.groupId = $scope.groupId;
        redCustmerData.remark = $scope.remark;
        if(!$scope.platShow&&!$scope.fileShow&&!$scope.customerGroupIdShow){
          $(".bBRemove").removeClass("btnBlue");
          $(".bBRemove").attr("disabled","true");
        }
        disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
          ngRedAndBlackCustomService.postBulkList(function(response) {
            $scope.uploadProgress = setInterval(function(){
              ngRedAndBlackCustomService.getBulkList(function(response){
                if(response.state == 100){
                  var es = response.message.replace(/\\/,'');
                  var esjson = JSON.parse(es);
                  clearInterval($scope.uploadProgress);
                  var message = "保存成功，本次上传共上传信息" + esjson.total + "条，成功导入" + (esjson.insert + esjson.update) + "条";
                  if (esjson.fail > 0) {
                    message += "<br/>失败原因：" + esjson.failDetails[0].reason;
                  }
                  setTimeout(function(){
                    $(".yunat_maskLayer").first().remove();
                  }, 0)
                  $(this).Alert({
                    "title": "保存成功",
                    "str": message,
                    "mark": true,
                    "eleZindex": 1003,
                    "markZindex": 1002
                  });
                  angular.element($("#couponListsGrid"))[0].p.newp = 1;
                  angular.element($("#couponListsGrid")).flexReload();
                  $(".addPop").hide();
                  $scope.groupShow = false;
                  disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
                }
                else if(response.state == -1){
                  clearInterval($scope.uploadProgress);
                  var message = "失败原因：" + response.message;
                  setTimeout(function(){
                    $(".yunat_maskLayer").first().remove();
                  }, 0)
                  $(this).Alert({
                    "title": "导入失败",
                    "str": message,
                    "mark": true,
                    "eleZindex": 1003,
                    "markZindex": 1002
                  });
                  angular.element($("#couponListsGrid"))[0].p.newp = 1;
                  angular.element($("#couponListsGrid")).flexReload();
                  $(".addPop").hide();
                  $scope.groupShow = false;
                  disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
                }
              },response.batchid)
            },2000)
          }, redCustmerData);
        });
      }
    };
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(); // 设置ajax保存按钮true  可点击
    //"增加客户黑名单弹框" ---确定
    $scope.subMitValues = function(type) {
      if ($scope.selectGroup) {
        if ($scope.type == "add") {
          $scope.groupName = $scope.currentGroup.groupName;
          $scope.groupId = $scope.currentGroup.groupId;
        } else {
          $scope.editRedCustom.groupId = $scope.currentGroup.groupId;
          $scope.editRedCustom.groupName = $scope.currentGroup.groupName;
          $scope.groupName = $scope.editRedCustom.groupName;
          $scope.groupId = $scope.editRedCustom.groupId;
        }
      } else {
        $scope.editRedCustom.groupId = "";
        $scope.editRedCustom.groupName = "";
      }
      $scope.selectGroup = false;
      $scope.groupShow = false;
    };
    //"增加客户黑名单弹框" -----"增加客户黑名单分组弹框"-- 确定
    $scope.addItem = function() {
      $scope.errorStatus = true;
      if (!$scope.itemName || $scope.itemName == "") {
        $scope.errorStatus = false;
        $scope.errorFont = "不能为空";
        return;
      }
      angular.forEach($scope.groups, function(val, key) {
        if (val.groupName == $scope.itemName) {
          $scope.errorStatus = false;
          $scope.errorFont = "不可重名";
          return;
        }
      });
      if ($scope.errorStatus) {

        var curGroupData = {
          groupName : $scope.itemName ? $scope.itemName: "",
          groupType : "BLACK",
          tenantId: DATA_STATIC.tenantId
        };
        ngRedAndBlackCustomService.postGroup(function(response) {
          $scope.groups.push(response);
        }, curGroupData);
      }
      $scope.itemName = "";
      if ($(".selectValuesPop .clearfix").height() >= 200) {
        $(".selectValuesPop .clearfix").addClass("sign_flow");
      } else {
        $(".selectValuesPop .clearfix").removeClass("sign_flow");
      }
    };
    //组别弹窗
    $scope.signClickShow = function(type) {
      $scope.type = type;
      $(".stateImg img").each(function(i) {
        if ($scope.groups[i].reserved) {
          $(this).hide();
        } else {
          $(this).show();
        }
        if ($scope.type == "add" && $scope.groupName == $scope.groups[i].groupName) {
          $(this).attr("src", "/ccms/images/state_executed.png").attr("title", "选择");
          $(this).show();
        } else if ($scope.edittype == "single" && $scope.editRedCustom.groupName == $scope.groups[i].groupName) {
          $(this).attr("src", "/ccms/images/state_executed.png").attr("title", "选择");
          $(this).show()
        } else {
          if (!$scope.groups[i].reserved) {
            $(this).attr("src", "/ccms/images/deletex.png").attr("title", "删除");
            $(this).unbind("click").bind("click", function(e) {
              $scope.$apply(function() {
                $scope.deleteItem(e)
              })
            });
          }
        }
      });
      $scope.errorStatus = true;
      $scope.groupShow = true;
      $(".selectValuesPop").css('display','inline-block')

      var left;
      var top;
      if (type == "add") {
        left = $("#addfenzu").offset().left;
        top = $("#addfenzu").offset().top;
      } else {
        left = $("#editfenzu").offset().left;
        top = $("#editfenzu").offset().top;
      }
      $(".selectValuesPop").css("left", left);
      $(".selectValuesPop").css("top", top - 40);
      $(".selectValuesPop").css("z-index", 1001);

      if ($(".selectValuesPop").height() >= 260) {
        $(".selectValuesPop .clearfix").addClass("sign_flow");
      } else {
        $(".selectValuesPop .clearfix").removeClass("sign_flow");
      }
    };
    //组列表被选中以后图标变成选中状态,存储当前group
    $scope.changeStateImg = function(index, $event) {
      $scope.selectGroup = false;
      $(".stateImg img").each(function(i) {
        if (i != index) {
          if (!$scope.groups[i].reserved) {
            $(this).attr("src", "/ccms/images/deletex.png").attr("title", "删除");
            $(this).unbind("click").bind("click", function(e) {
              $scope.$apply(function() {
                $scope.deleteItem(e);
              })
            });
          } else {
            $(this).attr("src", "/ccms/images/deletex.png").attr("title", "删除");
            $(this).unbind("click").bind("click", function(e) {
              $scope.$apply(function() {
                $scope.deleteItem(e);
              })
            });
            $(this).hide();
          }
        } else {
          if ($(this).attr("src").indexOf("deletex") != -1) {
            $(this).attr("src", "/ccms/images/state_executed.png").attr("title", "确定");
            $(this).unbind("click");
            $scope.selectGroup = true;
            $scope.currentGroup = $scope.groups[index];
            $(this).css("display", "inline-block");
          } else {
            if (!$scope.groups[i].reserved) {
              $(this).attr("src", "/ccms/images/deletex.png").attr("title", "删除");
              $(this).unbind("click").bind("click", function(e) {
                $scope.$apply(function() {
                  $scope.deleteItem(e);
                })
              });
            } else {
              $(this).attr("src", "/ccms/images/deletex.png").attr("title", "删除");
              $(this).hide();
            }
          }
        }
      });
    };
    //"增加客户黑名单弹框" --"增加客户黑名单分组弹框"-删除
    $scope.deleteItem = function(event) {
      var et = event.target;
      var groupId = $(et).attr("var");
      var index;
      for (var i = 0; i < $scope.groups.length; i++) {
        if (groupId == $scope.groups[i].groupId) {
          index = i;
          break;
        }
      }
      $(this).Confirm({
        "title": "确认删除",
        "str": "确定删除此分组吗？",
        "mark": true
      }, function() {
        ngRedAndBlackCustomService.deleteGroup(function(response) {
              $scope.groups.splice(index, 1);
              $(this).yAlert({
                "text": "分组删除成功"
              });
              removeAlert(1);
              if ($(".selectValuesPop .clearfix").height() >= 200) {
                $(".selectValuesPop .clearfix").addClass("sign_flow");
              } else {
                $(".selectValuesPop .clearfix").removeClass("sign_flow");
              }
            },
            groupId)
      })
    }
    var gridIsCompile = false; //阻止grid刷新多次compile
    $('#couponListsGrid').flexigrid({
      url: GLOBAL_STATIC.componentRoot + 'checklist/?checklistType=BLACK',
      method: 'GET',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      colModel: [{
        display: '<span ng-class={cloneCheckbox:true,cloneCheckboxChecked:checkStatus} style="margin-left: -3px;" ng-click="gridObj.selectChange()"  ></span>' + '<select class="commSelect width80"  ng-model="selectMode"  ng-change="gridObj.changeCheckbox()" ' + ' ng-options="dataCover.selectMode as dataCover.selectText for dataCover in gridObj.dataCoverList"></select>',
        sortable: false,
        name: 'enable',
        width: 1.1,
        dataindex: 'enabled',
        align: 'center',
        mapping: ['checklistId'],
        convert: function(v, mappVal) {
          var temp = (+new Date());
          $scope.single[temp] = 'no';
          return '<input type="checkbox" ng-checked="master" ng-true-value="\'yes\'"   ng-false-value="\'no\'" ng-change="gridObj.singleSelectChange(\'' + temp + '\',single)"   ng-model="single[' + temp + ']" class="v2 m10 ng-valid ng-dirty" value="true">'
        }
      },
      {
        display: '所属主题',
        name: 'subjectName',
        width: 1,
        sortable: true,
        dataindex: "subjectName"
      },
      {
        display: '客户ID',
        name: 'customerno',
        width: 1,
        sortable: true,
        dataindex: 'customerno'
      },
      {
        display: '所属客户黑名单分组',
        name: 'groupName',
        width: 1,
        sortable: true,
        align: 'center',
        dataindex: 'groupName'
      },
      {
        display: '更新时间',
        name: 'lastUpdate',
        width: 2,
        sortable: true,
        align: 'center',
        dataindex: 'lastUpdate',
        renderer: function(v) {
          return "<span class='ac_status_grid ac_status_" + v + "'>" + setISO(v, "all") + "</span>";
        }
      },
      {
        display: '添加方式',
        name: 'entryMode',
        width: 1,
        sortable: false,
        align: 'center',
        dataindex: 'entryMode'
      },
      {
        display: '添加人',
        name: 'entryMode',
        width: 1,
        sortable: false,
        align: 'center',
        dataindex: 'lastOperator'
      },
      {
        display: '备注',
        name: 'remark',
        width: 1,
        sortable: false,
        align: 'center',
        dataindex: 'remark',
        renderer: function(v) {
          return v == '' || v == null ? '': '<a href="javascript:void(0)" class="couponMark" _title="' + v + '" onmouseover="viewMark(this,event)" onmouseout="hideMark()"></a>';
        }
      },
      {
        display: '操作',
        name: 'enable',
        width: 1,
        align: 'center',
        dataindex: 'enabled',
        mapping: ['checklistId', 'groupName'],
        convert: function(v, mappVal) {
          return '<a ng-click="gridObj.redListEidt(\'' + mappVal[0] + '\',\'' + mappVal[1] + '\')"  href="javascript:void(0);" class="edit_delete edit_icon" title="修改" ></a>' + '<a href="javascript:void(0);" class="edit_delete delete_icon" title="删除此用户信息"  ng-data-red-delete-attr ></a>'
        }
      }],
      sortname: 'lastUpdate',
      updateDefaultParam: true,
      sortorder: "desc",
      buttons: [],
      usepager: true,
      useRp: true,
      rp: 10,
      showTableToggleBtn: true,
      singleSelect:false,
      singleStyle: true,
      colAutoWidth: true,
      onSuccess: function(data) {
        var scope = angular.element($("#couponListsGrid")).scope();
        scope.gridObj.upCompile(scope, gridIsCompile);
        gridIsCompile = true;
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
    console.log('ngRedAndBlackCustomService');
    ngRedAndBlackCustomService.checkDownLoad('BLACK', function () {
      console.log('有权限');
      $scope.downLoadPermissions = true;
    }, function () {
      console.log('无权限');
      $scope.downLoadPermissions = false;
    });
  }
]);
