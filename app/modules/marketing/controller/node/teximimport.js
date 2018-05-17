angular.module("campaign.controllers").controller('teximimportCtrl', ['$scope', '$http', 'getListService', '$q',
    function($scope, $http, getListService, $q) {
        /*初始化上传插件 start*/
        var JSESSIONID_temp = window.sessionStorage.getItem('JSESSIONID') || '';
        var tenantId_temp = window.sessionStorage.getItem('tenantId') || '';
        var username_temp = window.sessionStorage.getItem('username') || '';
        var userId_temp = window.sessionStorage.getItem('userId') || '';
        var uploaderParam = "?JSESSIONID=" + JSESSIONID_temp + "&tenantId=" + tenantId_temp + "&username=" + username_temp + "&userId=" + userId_temp;
        var defaultOrigin = location.protocol + "//" + location.host;
        var uploader = new plupload.Uploader({
          runtimes : 'html5,flash,silverlight,html4',
          browse_button : 'portUpLoadFile',
          url : GLOBAL_STATIC.datamanageRoot + 'files/upload/' + uploaderParam,
          unique_names : true,
          multi_selection:false,
          file_data_name: 'Filedata',
          headers:{
            'X-TOKEN': GLOBAL_STATIC.getCredentials().access_token,
            'Authorization': 'Bearer ' + GLOBAL_STATIC.getCredentials().access_token
          },
          filters:{
            mime_types : [
              {title : "Text files", extensions : "txt"},
              {title : "Csv files", extensions : "csv"}
            ]
          },
          init:{
            BeforeUpload:function(up, files){
              if (files.size > 52428800) {
                  $(this).Alert({ "title": "错误", "str": "上传文件超过15M,请减少文件大小", "mark": true });
                  return false;
              }
              angular.element(".loadingPosition").removeClass("domNone");
              angular.element('#portUpLoadFile').val(files.name);
            },
            FilesAdded:function(up, files){
              uploader.start();
            },
            UploadProgress:function(up, files){
              console.log(files);
              $('#texiLoading').show();
              var loadNum = files.percent;
              $('#teximiLoading').css('width',loadNum+'%');
            },
            FileUploaded:function(up, file,responseObject){
              var matchLoadData = $.extend({}, true, $scope.matchScopeObj.getEditorData());
              matchLoadData.fileId = ($.parseJSON(responseObject.response)).fileId || "";
              delete matchLoadData.remark;
              getListService.portMatchLoad(function(response) {
                  angular.element(".loadingPosition").addClass("domNone");
                  $scope.matchScopeObj.matchFileUploadFlag = false;
                  $scope.matchScopeObj.isRollListShow = true;
                  $scope.matchScopeObj.rollList = response.records;
                  $scope.matchScopeObj.startLoadBtnStatus = false; // 可以触发开始匹配
                  $scope.matchScopeObj.matchButtonMark = false;
                  $scope.matchScopeObj.loadStatus = false;
                  angular.element(".commSmallBtn").addClass("btnBlue");
                  setTimeout(function(){
                    $('#texiLoading').hide();
                    $('#teximiLoading').css('width','0%');
                  },2000)
              }, matchLoadData)
            },
            Error:function(up,errObject){
              $scope.$apply(function() {
                $scope.matchScopeObj.matchFileUploadFlag = true;
                $scope.matchScopeObj.uploadErrorInfo = (errObject.status == 502 ? "上传文件超时" : errObject.message);
              });
            }
          }
        })
        uploader.init()
        /*angular.element("#portUpLoadFile").uploadify({
            'buttonClass': 'uploadify_input_style',
            'method': "post",
            'swf': defaultOrigin + root + GLOBAL_STATIC.rootModule + '/components/uploadify/uploadify.swf',
            'uploader': GLOBAL_STATIC.componentRoot + 'web-component/files/upload/' + uploaderParam,
            'buttonText': '上传文件',
            'width': '200',
            'height': '20',
            'overrideEvents': ['onDialogClose', 'onSelect', 'onUploadSuccess', 'onSelectError'],
            'float': 'left',
            'fileTypeExts': '*.csv; *.txt',
            'successTimeout': '59',
            "onUploadStart": function(file) {
                if (file.size > 15728640) {
                    $(this).Alert({ "title": "错误", "str": "上传文件超过15M,请减少文件大小", "mark": true });
                    return false;
                }
                angular.element(".loadingPosition").removeClass("domNone");
                angular.element('#portUpLoadFile').uploadify('settings', 'buttonText', file.name);
            },
            'onCancel': function(file) {
                alert('The file ' + file.name + ' was cancelled.');
            },
            'onUploadSuccess': function(file, data, response) {
                console.log(file);
                console.log(data);
                console.log(response);
                // timeout
                if (!response) {
                    $(this).Alert({ "title": "错误", "str": "文件上传超时", "mark": true });
                    return false;
                }
                var matchLoadData = $.extend({}, true, $scope.matchScopeObj.getEditorData());
                matchLoadData.fileId = ($.parseJSON(data)).fileId || "";
                delete matchLoadData.remark;
                getListService.portMatchLoad(function(response) {
                    angular.element(".loadingPosition").addClass("domNone");
                    $scope.matchScopeObj.matchFileUploadFlag = false;
                    $scope.matchScopeObj.isRollListShow = true;
                    $scope.matchScopeObj.rollList = response.records;
                    $scope.matchScopeObj.startLoadBtnStatus = false; // 可以触发开始匹配
                    angular.element(".commSmallBtn").addClass("btnBlue");
                }, matchLoadData)
            },
            'onUploadError': function(file, errorCode, errorMsg, errorString) {
                $scope.$apply(function() {
                    $scope.matchScopeObj.matchFileUploadFlag = true;
                    $scope.matchScopeObj.uploadErrorInfo = (errorMsg == 502 ? "上传文件超时" : errorMsg);
                });
            }
        });*/
        /*初始化上传插件 end*/

        $scope.splitSignArrs=[{id:0,name:',(逗号)'},{id:1,name:';(分号)'},{id:2,name:' (空格)'}]
        $scope.openNodePop(); //调用弹框方法
        $scope.matchScopeObj = {
            "isStartLoading": false,
            "startLoadBtnStatus": true,
            "firstStartMatchData":false,
            "loadStatus":true,
            // 匹配按钮状态判断
            "dealNumber": function(n) {
                if (isNaN(n)) {
                    return 0;
                }
                var stringNumber = n.toString();
                if (stringNumber.indexOf(".") != -1) {
                    return stringNumber.substring(0, stringNumber.indexOf(".") + 3);
                } else {
                    return stringNumber;
                }
            },
            "name": "名单匹配",
            "fillData": function() {
                var _this = this;
                var delay = getListService.getPlatList(function(response) {
                    _this.platformList = response || [];
                });
                $q.when(delay).then(function() {
                    getListService.openMatchNode(function(response) {
                        _this.name = response.name || "名单匹配";
                        _this.id = response.id || "";
                        $scope.nodecomment = response.remark || "";
                        _this.curPlatformName = response.platform || "";
                        _this.splitSign = response.delimiter|| 0;
                        if(response.fileName){
                          angular.element('#portUpLoadFile').val(response.fileName);
                        }
                        else{
                          angular.element('#portUpLoadFile').val('选择文件');
                        }
                        _this.upLoadModel = response.example || "javascript:void(0)";
                        _this.hasColumnValue = ((response.hasColumnName + "") != "null" && (response.hasColumnName + "") != "undefined") ? (response.hasColumnName + "") : "false";
                        // 导入结果
                        _this.matchImportNumber = response.importNumber || "";
                        _this.matchDistinctNumber = response.distinctNumber || 0;
                        _this.matchNumber = response.matchNumber || 0;
                        _this.matchPoint = _this.dealNumber((response.matchNumber / response.distinctNumber) * 100);
                        //开始匹配按钮status
                        angular.element(".commSmallBtn").removeClass("btnBlue");
                        _this.matchStatusMark = _this.matchImportNumber ? "请重新选择文件，并完成匹配" : "请先选择文件，并完成匹配";
                    });

                })
                getListService.getNodeTipsByType(function(responseTips) { // 获取tips
                    _this.tips = responseTips.tips || "";
                }, "teximimport");

            },
            "startMatchData": function() {
              var _this = this;
                if (_this.startLoadBtnStatus && !_this.matchFileFlag) {
                    _this.matchButtonMark = true;
                    return false;
                }
                if (!$scope.matchScopeObj.curPlatformName) { // 必须选择平台才能匹配
                    $scope.discountEcShopFlag = true;
                    return null;
                } else {
                    $scope.discountEcShopFlag = false;
                };
                if (!_this.startLoadBtnStatus) {
                    _this.startLoadBtnStatus = true;
                    _this.matchFileFlag = true;
                    angular.element(".commSmallBtn").removeClass("btnBlue");
                    _this.firstStartMatchData = true;
                    var matchMatchData = $.extend({}, true, $scope.matchScopeObj.getEditorData());
                    delete matchMatchData.remark;
                    getListService.matchMatchNode(function(response) {
                        var startMatchData = {
                          id : $scope.matchScopeObj.getEditorData().id,
                          progressTable: response.result
                        }
                        var timeHandler = null;
                        getMatchProcess();
                        function getMatchProcess() {
                          getListService.startMatchNode(function(response) {
                              if(response.result != 'SUCCESS') {
                                clearTimeout(timeHandler);
                                $('#progress').html(response.progress);
                                timeHandler = setTimeout(getMatchProcess, 3000);
                              } else {
                                $scope.matchScopeObj.isRollListShow = false;
                                _this.matchFileFlag = false;
                                _this.startLoadBtnStatus = false;
                                _this.loadStatus = false;
                                _this.matchImportNumber = response.importNumber || "";
                                _this.matchDistinctNumber = response.distinctNumber || 0;
                                _this.matchNumber = response.matchNumber || 0;
                                _this.matchPoint = _this.dealNumber((response.matchNumber / response.distinctNumber) * 100);
                                $scope.matchScopeObj.matchButtonMark = false;
                                angular.element('#portUpLoadFile').val('选择文件');
                                //angular.element('#portUpLoadFile').uploadify('settings', 'buttonText', '选择文件'); // 设置文件为空
                                _this.startLoadBtnStatus = true;
                                _this.loadStatus = true;
                                _this.matchStatusMark = "请重新选择文件，并完成匹配";
                              }
                          }, startMatchData);
                        }
                    }, matchMatchData);
                }
            },
            "viewSplitSign": function() { // 切换分隔符
                if (this.isRollListShow) {
                    var putSplitData = $.extend({},
                        true, $scope.matchScopeObj.getEditorData());
                    delete putSplitData.remark;
                    getListService.viewSplitData(function(response) {
                        $scope.matchScopeObj.rollList = response.records || [];
                    }, putSplitData);
                }
            },
            "getEditorData": function() {
                var _this = this;
                var discountEcData = {
                    "id": graph.nodeId,
                    "name": _this.name || "",
                    "remark": $scope.nodecomment || "",
                    "platform": _this.curPlatformName,
                    "delimiter": _this.splitSign,
                    "hasColumnName": _this.hasColumnValue
                };
                return discountEcData;
            },
            "postDiscountEcData": function(ent) {
                var _this = this;
                if ($scope.matchScopeObj.name == "") {
                    return false;
                };
                if (!$scope.matchScopeObj.curPlatformName) {
                    $scope.discountEcShopFlag = true;
                    return null;
                } else {
                    $scope.discountEcShopFlag = false;
                };
                if(!_this.firstStartMatchData){
                  if (!$scope.matchScopeObj.matchImportNumber) {
                    $scope.matchScopeObj.matchButtonMark = true;
                    return null;
                  }
                }
                var element = angular.element(ent.target);

                disposeCommMethod.shuyunAjaxButtonClickMethod(function() {
                    getListService.postMatchNodeData(function(response) {
                        disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
                        element.closest("#nodeContent").hide();
                        $(".yunat_maskLayer").remove();
                        $(this).yAlert({
                            "text": "保存成功"
                        });
                        removeAlert();
                        $scope.editNodeName(response.id, response.name, $scope.nodecomment);
                    }, $scope.matchScopeObj.getEditorData(), element);
                }, element);
            },
            "showResponseData": function() {
                $(".matchDataListView").addInteractivePop({
                    magTitle: "名单匹配数据查看",
                    width: 600,
                    mark: false,
                    position: "fixed",
                    childElePop: true
                });
                getListService.getPortDataResult(graph.nodeId, function(response) {
                    $scope.targetDataListsTitle = [response.columnName] || [""];
                    $scope.targetDataListsVal = (response.records && response.records.length > 0) ? response.records : [];
                    $scope.autoWidth = ($scope.targetDataListsTitle != 0 ? 100 / $scope.targetDataListsTitle.length + "%" : "100%");
                });
            }
        };
        $scope.matchScopeObj.fillData();
        disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();
    }
]);
