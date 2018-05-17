(function(window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  app.filter('GroupByType', function() {
    return function(items, type) {
      var newItems = [];
      angular.forEach(items, function(item) {
        if (item.groupType == type) {
          newItems.push(item);
        }
      });
      return newItems;
    }
  });

  app.controller('edmNodeCtrl', ["$rootScope", "$scope", "$http", "$compile", "saveService", "getListService", "$filter", "$q", "$sce",
    function($rootScope, $scope, $http, $compile, saveService, getListService, $filter, $q, $sce) {
      //节点是否可编辑，确定按钮是否显示,
      $scope.isEditorFlag = (!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8)
      $scope.showNodeReport = false;
      //增加弹窗对象限制
      $scope.oncewindow= true;
      //节点默认数据
      $scope.EDMnode = {};
      $scope.EDMGateway = [];
      $scope.EnterpriseEmail = {};
      $scope.CurEDMGateway = {};
      $scope.EDMnode = {
        //"savewaitnode":savewaitnode,
        "id": graph.nodeId,
        "name": ""
      }
      $scope.mailTitle = "模板";
      $scope.EDMnode.blacklistTip = "";
      $scope.EDMnode.redlistTip = "";
      $scope.EDMnode.emailType = "1";
      $scope.EDMnode.customerEamilDataSelected = {};
      getListService.nodeStatus(function(response) {
        if (response.subjobStatus > 20) {
          $scope.showNodeReport = true;
        }
      }, graph.nodeId, graph.campJobid)
      //graph.campStatus='A5';
      //装载控件
      $scope.initUp = function(element) {
        var JSESSIONID_temp = window.sessionStorage.getItem('JSESSIONID') || '';
        var tenantId_temp = window.sessionStorage.getItem('tenantId') || '';
        var username_temp = window.sessionStorage.getItem('username') || '';
        var userId_temp = window.sessionStorage.getItem('userId') || '';
        var uploaderParam = "?tenantId=" + tenantId_temp + "&username=" + username_temp + "&userId=" +  userId_temp;
        if($scope.oncewindow){
          var uploader = new plupload.Uploader({
            runtimes : 'html5,silverlight,html4',
            browse_button : 'file_upload',
            url : GLOBAL_STATIC.nodeRoot + 'node/edm/upload/' + graph.nodeId + "/camp/" + graph.campId + "/gateway/" + $scope.CurEDMGateway.gatewayId + uploaderParam,
            unique_names : true,
            multi_selection:false,
            timeout: 120000,
            headers:{
              'X-TOKEN': GLOBAL_STATIC.getCredentials().access_token,
              'Authorization': 'Bearer ' + GLOBAL_STATIC.getCredentials().access_token
            },
            filters:{
              mime_types : [
                {title : "Html files", extensions : "html"},
                {title : "Zip files", extensions : "zip"}
              ]
            },
            init:{
              FilesAdded:function(up, files){
                if( files.length>1 ){
                  $(this).Alert({"title": "提示", "str": "每次最多上传1个文件", "mark": true, "eleZindex": 20002, "markZindex": 20001});
                  return;
                }
                $(".uploadResult").remove();
                $('#file_upload').hide();
                $('#file_upload').parent().find('input').hide();
                $('.newEDMupload').show();
                uploader.start();
              },
              UploadProgress:function(up, files){
                $('.newuploadify-progress-bar').css('width',files.percent+'%');
                if(files.percent == 100){
                  $('.newuploadify-progress-bar').css('width','100%');
                  $('.newEDMupload p').show();
                }
                else{
                  $('.newuploadmessage span').html(' - '+files.percent+'%');
                  //$('#cancelemail').show();
                  //$('.newEDMupload p').hide();
                }
              },
              FileUploaded:function(up, files,responseObject){
                $('#cancelemail').hide();
                $('.newuploadmessage span').html("完成");
                $('.newEDMupload p').hide();
                $('.newEDMupload').fadeOut('slow',function(){
                  $('#file_upload').show();
                  $('#file_upload').parent().find('input').show();
                  $('#cancelemail').show();
                  if(!responseObject.response) {
                    $(this).Alert({"title": "提示", "str": "上传失败，请稍后再试", "mark": true, "eleZindex": 20002, "markZindex": 20001});
                    return '超时失败'
                  };
                  var data = JSON.parse(responseObject.response);
                  if(data.uploadStatus == true){
                    var afterTxt = '<span class="uploadResult"><span class="resultTips">您已上传文件。<span id="fileName" style="display:none">' + data.emailFileName + '</span></span></span>'; //<a ng-click="modifyPop()" href="javascript:void(0)">查看邮件</a>
                    $scope.EDMnode.uploadFileName = data.emailFileName;
                    $scope.EDMnode.emailFileName = data.emailFileName;
                    $scope.EDMnode.isHistoryData = false;
                  }
                  else{
                    var afterTxt = '<span class="uploadResult"><span class="resultTipsError">上传文件校验失败，请重新上传！</span></span>';
                    $scope.EDMnode.uploadFileName = "";
                  }
                  $scope.mailTitle = "邮件";
                  $("#file_upload").after(afterTxt);
                  var scope = angular.element(angular.element(".uploadResult")).scope();
                  scope.gridObj.compileTpl(scope);
                  $scope.$apply();
                });
              },
              Error:function(up,errObject){
                var msgText = "上传失败\n";
                switch( errObject.code ){
                  case -601:
                    msgText += "文件格式不正确，仅限 *.zip;*.html"
                    break;
                  case -600:
                    msgText += "文件大小超过限制"
                    break;
                  default:
                    msgText += "文件格式错误,上传Email文件失败"
                }
                $(this).Alert({"title": "提示", "str": msgText, "mark": true, "eleZindex": 20002, "markZindex": 20001});
                $('.newEDMupload').fadeOut('slow',function(){
                  $('#file_upload').show();
                  $('#file_upload').parent().find('input').show();
                })
              }
            }
          })
          uploader.init()
          console.log(123)
          $scope.oncewindow= false;
          $('#cancelemail').click(function(){
            uploader.stop();
             $('.newEDMupload').fadeOut('slow',function(){
              $('#file_upload').show();
              $('#file_upload').parent().find('input').show();
             })
          })
        }

        /*angular.element("#file_upload").uploadify({
          'onFallback': function() {
            $(this).Alert({"title": "提示", "str": "未检测到兼容版本的Flash，或者您禁用了flash。", "mark": true, "eleZindex": 20002, "markZindex": 20001});
          },

          'removeTimeout': 1,
          'method': 'post',
          'swf': GLOBAL_STATIC.rootModule + '/components/uploadify/uploadify.swf',
          'percentage': 'speed',
          'uploader': GLOBAL_STATIC.nodeRoot + 'node/edm/upload/' + graph.nodeId + "/camp/" + graph.campId + "/gateway/" + $scope.CurEDMGateway.gatewayId + uploaderParam,
          'buttonClass': $scope.isEditorFlag ? 'upload-button-disabled' :'upload-button',
          'buttonText': '上传文件',
          'fileTypeDesc': '文件格式为',
          'fileTypeExts': '*.zip;*.html;',
          'width': '68',
          'height': '22',
          //'fileTypeExts': '*.zip; *.html; *.htm;',
          'successTimeout': '60',
          'itemTemplate':  '<div id="${fileID}" class="uploadify-queue-item" style="height:16px;">\
            <div class="uploadify-progress" style="width:70%;float:left; margin-top:0px;"><div class="uploadify-progress-bar"></div></div>\
            <span class="data" style="float:left; margin-left:5px;"></span>\
            <div class="cancel" style="float:left; margin-left:5px;">\
            <a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">取消</a>\
            </div>\
            </div><p class="yunMark" style="display: none;color: #FF0000;margin-right: 5px;position: relative;top: -7px;">正在同步到云服务器</p>',
          // 'onCancel': function (file) {
          //     alert('The file ' + file.name + ' was cancelled.');
          // },
          'onUploadSuccess': function(file, data, response) {
            $(".uploadResult").remove();
            $(".uploadify-queue .yunMark").remove();
            $(".cancel").hide();
            // 上传超时返回空data
            if(!data) {
              $(this).Alert({"title": "提示", "str": "上传失败，请稍后再试", "mark": true, "eleZindex": 20002, "markZindex": 20001});
              return '超时失败'
            };
            var data = JSON.parse(data);
            if (data.uploadStatus == true) {
              var afterTxt = '<span class="uploadResult"><span class="resultTips">您已上传文件。<span id="fileName" style="display:none">' + data.emailFileName + '</span></span><a ng-click="modifyPop()" href="javascript:void(0)">查看邮件</a></span>';
              $scope.EDMnode.uploadFileName = data.emailFileName;
              $scope.EDMnode.emailFileName = data.emailFileName;
              $scope.EDMnode.isHistoryData = false;
            } else {
              var afterTxt = '<span class="uploadResult"><span class="resultTipsError">上传文件校验失败，请重新上传！</span></span>';
              $scope.EDMnode.uploadFileName = "";
            }
            $scope.mailTitle = "邮件";
            $("#file_upload").after(afterTxt);
            $('.uploadify-queue').find(".data").html("完成");
            var scope = angular.element(angular.element(".uploadResult")).scope();
            scope.gridObj.compileTpl(scope);
            $scope.$apply();

          },
          'onUploadStart': function(file) {
            $(".cancel").show();
            $(".uploadify-queue").css({
              "position": "absolute",
              "top": "0px",
              "z-index": "999",
              "width": "100%"
            });
            $(".uploadify-queue-item").css({
              "position": "relative",
              "border-radius": "0px",
              "margin-top": "0px",
              "height": "22px",
              "padding": "0",
              "background-color": "#f8f8f8",
              "margin-bottom": "0"
            });
            $(".uploadify-queue-item .cancel a").css({
              "text-indent": "0",
              "background": "none",
              "width": "auto",
              "height": "auto"
            })
          },
          'onUploadError': function(file, errorCode, errorMsg, errorString) {
            $(".uploadify-queue .yunMark").remove();
            if(console.log) {
              console.log(file)
              console.log(errorCode);
              console.log(errorMsg);
              console.log(errorString);
            }
            if(errorCode != -280)  {
              // 非取消动作
              $(this).Alert({"title": "提示", "str": "文件格式错误,上传Email文件失败", "mark": true, "eleZindex": 20002, "markZindex": 20001});
            }
          },
          'overrideEvents': ['onDialogClose', 'onSelectError', 'onUploadSuccess'],
          'onSelectError': function(file, errorCode, errorMsg, errorString) {
            $(".uploadify-queue .yunMark").remove();
            var msgText = "上传失败\n";
            switch (errorCode) {
              case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                break;
              case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";
                break;
              case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                msgText = "文件格式错误,上传Email文件失败";
                break;
              case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                break;
              default:
                msgText += "错误代码：" + errorCode + "\n" + errorMsg;
            }
            $(this).Alert({"title": "提示", "str": msgText, "mark": true, "eleZindex": 20002, "markZindex": 20001});
          }
        });*/

      }

      //编辑器
      $scope.initEdit = function(preview) {
        if (preview == "review") {
          $scope.kindEditor = kindEditorObj.creatEditorforEDMPre("#emailReview");
          //$scope.kindEditor.readonly(true);
        } else {
          $scope.kindEditor = kindEditorObj.creatEditorforEDM("#emailEditor");
        }
        $scope.kindEditor.html($scope.uploadFileHtml);
        $scope.kindEditor.clickToolbar("preview", function() {
          var dialog = KindEditor.dialog({
            width: "100%",
            height: angular.element(window).height(),
            title: '预览',
            body: '<div style="padding:10px 20px;height:100%;"><iframe frameborder="0" class="ke-textarea-custom" width="100%" height="100%"></iframe></div>',
            closeBtn: {
              name: '关闭',
              click: function(e) {
                dialog.remove();
              }
            },
            noBtn: {
              name: '取消',
              click: function(e) {
                dialog.remove();
              }
            }
          });
          angular.element(".ke-textarea-custom")[0].contentWindow.onload = function() {
            angular.element(this.document.head).html(angular.element(document.getElementById('mesIframe').contentWindow.document.head).html());
            angular.element(this.document.body).html(angular.element(document.getElementById('mesIframe').contentWindow.document.body).html());
          };
        })
      }

      //获取EDM节点
      $scope.getEDM = function() {
        var callback = function(data) {
          //if(data){$scope.EDMnode = data}
          //$scopeEDMnode.id = data.id;
          $scope.EDMnode.name = data.name || "EDM";
          $scope.nodecomment = data.remark;
          $scope.EDMnode.sender = data.sender;
          $scope.EDMnode.senderEmail = data.senderEmail;
          $scope.EDMnode.useEnterpriseEmail = data.useEnterpriseEmail || false; //是否使用企业邮箱，默认不使用
          $scope.EDMnode.subject = data.subject;
          $scope.EDMnode.testEmail = data.testEmail;
          $scope.EDMnode.emailType = data.emailType ? (data.emailType + '') : '1'; //选择邮箱类型，默认为1 上传文件
          $scope.EDMnode.deliveryTimeSelection = data.deliveryTimeSelection ? (data.deliveryTimeSelection + '') : '0'; //发送时间类型；默认为0；
          $scope.EDMnode.deliveryDate = data.deliveryDate;
          $scope.EDMnode.overAssignDelivery = data.overAssignDelivery; //超过预设时间实时发送，默认为1；
          $scope.EDMnode.outputControl = data.outputControl ? (data.outputControl + '') : '0'; //输出控制
          $scope.EDMnode.gatewayId = data.gatewayId; //渠道通道
          $scope.EDMnode.blacklist = data.blacklist;
          $scope.EDMnode.designerDomain = data.designerDomain;
          if($scope.EDMnode.emailType !== '1') {
            // 自定义邮件
            $scope.EDMnode.customerEamilDataSelected.shopId = data.nodeEdm.shopId;
            $scope.EDMnode.customerEamilDataSelected.id = data.nodeEdm.emailId;
            $scope.EDMnode.customerEamilDataSelected.name = data.nodeEdm.emailName;
            $scope.EDMnode.customerEamilDataSelected.status = data.status || 200;
            $scope.EDMnode.customerEamilDataSelected.errorMsg = data.errorMsg || "";
          }
          if($scope.EDMnode.blacklist.customer.length === 0 && $scope.EDMnode.blacklist.email.length === 0 && !$scope.EDMnode.senderEmail) {
            $scope.getWhiteAndBlackList(function() {
              $scope.WhiteAndBlackList.forEach(function(item) {
                if(item.groupType === "BLACK") {
                  $scope.EDMnode.blacklist.customer.push({
                    'name':item.groupName,
                    'id': item.groupId
                  });
                } else if(item.groupType === "EMAIL") {
                  $scope.EDMnode.blacklist.email.push({
                    'name':item.groupName,
                    'id': item.groupId
                  });
                }
              });
              var msg = "";
              if ($scope.EDMnode.blacklist.customer.length > 0) {
                msg += $scope.EDMnode.blacklist.customer.length + "个客户黑名单组,";
              }
              if ($scope.EDMnode.blacklist.email.length > 0) {
                msg += $scope.EDMnode.blacklist.email.length + "个邮箱黑名单组,";
              }
              if (msg.lastIndexOf(",") == msg.length - 1) {
                msg = msg.substr(0, msg.length - 1);
              }
              if (msg != "") {
                $scope.EDMnode.blacklistTip = "选择了" + msg;
              } else {
                $scope.EDMnode.blacklistTip = "";
              }
              });
            } else {
            var msg = "";

            if ($scope.EDMnode.blacklist.customer.length > 0) {
              msg += $scope.EDMnode.blacklist.customer.length + "个客户黑名单组,";
            }
            if ($scope.EDMnode.blacklist.email.length > 0) {
              msg += $scope.EDMnode.blacklist.email.length + "个邮箱黑名单组,";
              /*$scope.WhiteAndBlackList = [];
              $scope.EDMnode.blacklist.email.forEach(function(item){
                $scope.WhiteAndBlackList.push({
                  'groupName':item.name,
                  'groupId':item.id,
                  'groupType':'EMAIL',
                  'reserved':true
                })
              })*/
            }
            if (msg.lastIndexOf(",") == msg.length - 1) {
              msg = msg.substr(0, msg.length - 1);
            }
            if (msg != "") {
              $scope.EDMnode.blacklistTip = "选择了" + msg;
            } else {
              $scope.EDMnode.blacklistTip = "";
            }
          }
          $scope.EDMnode.redlist = data.redlist;
          if ($scope.EDMnode.redlist.length > 0) {
            $scope.EDMnode.redlistTip = "选择了" + $scope.EDMnode.redlist.length + "个红名单组";
          } else {
            $scope.EDMnode.redlistTip = "";
          }
          $scope.EDMnode.uploadFileName = data.uploadFileName;
          // 是否是历史数据，用联合营销EDM编辑器
          $scope.EDMnode.isHistoryData = false;
          if ($scope.EDMnode.uploadFileName) {
            $scope.uploadFileName = '<span class="uploadResult"><span class="resultTips">您已上传文件。<span id="fileName" style="display:none">{{EDMnode.uploadFileName}}</span></span></span>'; //<a ng-click="modifyPop()" href="javascript:void(0)">查看邮件</a>
            $scope.mailTitle = "邮件";
            angular.element("#file_upload").after($scope.uploadFileName);
            $scope.gridObj.compileTpl();
            $scope.EDMnode.uploadFileName = data.nodeEdm.emailFileName;
            $scope.EDMnode.emailFileName = data.nodeEdm.emailFileName;
            $scope.EDMnode.isHistoryData = data.nodeEdm.version != 10010 ? true : false;
          }
          $scope.EDMnode.sampleEmailZipFormatUrl = data.sampleEmailZipFormatUrl || "1212";
          $scope.EDMnode.sampleEmailHtmlFormatUrl = data.sampleEmailHtmlFormatUrl;
          if (!$scope.EDMnode.gatewayId || $scope.EDMnode.gatewayId == null || $scope.EDMnode.gatewayId == "") {
            $scope.CurEDMGateway = $scope.EDMGateways[0];
          } else {
            for (var i = 0, len = $scope.EDMGateways.length; i < len; i++) {
              if ($scope.EDMGateways[i].gatewayId == $scope.EDMnode.gatewayId) {
                $scope.CurEDMGateway = $scope.EDMGateways[i];

              }
              //                            else{
              //                                $scope.CurEDMGateway = $scope.EDMGateways[0];
              //                            }
            }
          }
          if($scope.isEditorFlag) {  //不可编辑
            $('#file_upload').css('background', '#8a8a8a');
          } else {
            $scope.initUp();
          }
          reactElements();
        }
        getListService.getEDM(callback, $scope.EDMnode //表单数据
        )

        getListService.getNodeTipsByType(function(responseTips) { // 获取tips
          $scope.EDMnode.tips = responseTips.tips || "";
        }, "tcommunicateEDM");
      }
      function reactElements() {
        if(!graph.isEditable) {
          $('#file_upload').find('object').remove();
          $('#modifyeMail').remove();
          $("#nodeContent .commNodeMarkRelative .node-mask").remove();
          var eles = $('form[name=edmForm]')[0].elements;
          for(var i = 0; i < eles.length; i++) {
            eles[i].disabled = true;
          }
          ($('#reviewToModify').removeClass('btnBlue')[0]) && ($('#reviewToModify').removeClass('btnBlue')[0].disabled = true);
        }
        //执行完成,即使创建人也不可编辑
        if(graph.campStatus === 'A5') {
          $('#modifyeMail').remove();
          ($('#reviewToModify').removeClass('btnBlue')[0]) && ($('#reviewToModify').removeClass('btnBlue')[0].disabled = true);
        }
      }
      //获取EDM通道
      $scope.EDMgetGateway = function() {
        var callback = function(data) {
          $scope.EDMGateways = data;
          $scope.getEDM();

          //$scope.getEDMuploadFile();
        }
        getListService.EDMgetGateway(callback, $scope.EDMGateway)
      }
      //获取企业邮箱
      $scope.EnterpriseEmail = function() {
        var callback = function(data) {
          $scope.EnterpriseEmail = data;
          $scope.EnterpriseEmail.email = data.email;
        }
        getListService.EnterpriseEmail(callback, $scope.EnterpriseEmail)
      }
      $scope.useEnterpriseEmail = function() {
        if ($scope.EDMnode.useEnterpriseEmail == true) {
          $scope.EDMnode.senderEmail = $scope.EnterpriseEmail.email;
        } else {
          $scope.EDMnode.senderEmail = "";
        }
      }

      $scope.getWhiteAndBlackList = function(nextFn) {
        var callback = function(data) {
          $scope.WhiteAndBlackList = data;
          $scope.ngRedAble = false;
          $scope.ngBlackAble = false;
          nextFn();
        }
        var callback2 = function(data) {
          $scope.ngRedAble = true;
          $scope.ngBlackAble = true;
        }
        return getListService.getWhiteAndBlackList(callback, $scope.WhiteAndBlackList, callback2);
      }
      var whiteAndBlackListProm = $scope.getWhiteAndBlackList(function(){
      });
      $scope.EDMgetGateway();
      $scope.EnterpriseEmail();
      //邮件编辑
      $scope.modifyPop = function (isCustomer) {
        if($scope.EDMnode.isHistoryData) {
          getListService.uploadtoyun(function(response) {
            $scope.EDMnode.emailFileName = response.emailFileName || "";
            if($scope.EDMnode.emailFileName) {
              //window.open("http://co-branding-email.fenxibao.com/home/midpage?from=1&pagename=designer&yFile=" + $scope.EDMnode.emailFileName);
              window.open($scope.EDMnode.designerDomain + "#/email/third/" + $scope.EDMnode.emailFileName);
            }
          }, graph.nodeId);
        } else {
          //window.open("http://co-branding-email.fenxibao.com/home/midpage?from=1&pagename=designer&yFile=" + $scope.EDMnode.emailFileName);
          window.open($scope.EDMnode.designerDomain + "#/email/third/" + $scope.EDMnode.emailFileName);
        }
      }
      $scope.reviewToModify = function() {
        $(".reviewEmailPop").hide();
        kindEditorObj.delEditor("#emailReview");
        $(".modifyEmailPop").addInteractivePop({
          magTitle: "编辑模板",
          width: 888,
          mark: false,
          position: "fixed",
          childElePop: true
        });
        $(".modifyEmailPop  .title  a").remove();
        $scope.initEdit();
      }
      //关闭预览和编辑弹窗，然后删除编辑器本身
      $scope.closeEditorPop = function(style) {
        if (style == "closeReview") {
          $(".childElementMark").remove();
          $(".reviewEmailPop").hide();
          kindEditorObj.delEditor("#emailReview");

        } else {
          $(".childElementMark").remove();
          $(".modifyEmailPop").hide();
          kindEditorObj.delEditor("#emailEditor");

        }
      }
      $scope.checkEDMnode = function() {
        if($scope.isEditorFlag) {
          return "当前节点不可编辑";
        }
        $scope.testEmails = [];
        if ($scope.EDMnode.testEmail) {
          $scope.testEmails = $scope.EDMnode.testEmail.split(",");
        }

        var emailCheck = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}\s*$/;
        $scope.senderEmailCheck = emailCheck.test($scope.EDMnode.senderEmail);

        if ($scope.testEmails.length == 0) {
          $scope.testEmailsCheck = true;
        } else if ($scope.testEmails.length > 20) {
          $(this).Alert({
            "title": "提示",
            "str": "最多只能输入20个测试邮箱",
            "mark": true,
            "eleZindex": 20002,
            "markZindex": 20001
          });
          return;
        } else {
          for (var i = 0; i < $scope.testEmails.length; i++) {
            $scope.num = emailCheck.test($scope.testEmails[i]);
            if (!$scope.num) {
              $scope.testEmailsCheck = false;
            } else {
              $scope.testEmailsCheck = true;
            }
          }
        }
        if(!$scope.EDMnode.sender){
          $("div:contains('发件人名称')").css('display','block');
          $("div:contains('发件人名称')").prev('input').addClass('border_warning');
        }
        if(!$scope.EDMnode.subject){
          $("div:contains('Email主题')").css('display','block');
          $("div:contains('Email主题')").prev('input').addClass('border_warning');
        }
        if(!$scope.EDMnode.senderEmail){
          $("div:contains('发件人邮箱')").css('display','block');
          $("div:contains('发件人邮箱')").siblings('input').addClass('border_warning');
        }
        if ($scope.EDMnode.deliveryTimeSelection == '1') {
          if ($scope.EDMnode.name && $scope.EDMnode.sender && $scope.EDMnode.senderEmail && $scope.EDMnode.subject && $scope.EDMnode.deliveryDate && $scope.senderEmailCheck && $scope.testEmailsCheck == true) {
            $scope.saveEDMnode()
          } else {
            if (!$scope.senderEmailCheck || $scope.testEmailsCheck == false) {
              $(this).Alert({
                "title": "提示",
                "str": "请填写正确的邮件地址!",
                "mark": true,
                "eleZindex": 20002,
                "markZindex": 20001
              });
            } else if (!$scope.EDMnode.deliveryDate) {
              $(this).Alert({
                "title": "提示",
                "str": "您已选择延时发送，请输入发送时间。",
                "mark": true,
                "eleZindex": 20002,
                "markZindex": 20001
              });
            }else {
              return
            }
          }

        } else {
          if ($scope.EDMnode.name && $scope.EDMnode.sender && $scope.EDMnode.senderEmail && $scope.EDMnode.subject && $scope.senderEmailCheck && $scope.testEmailsCheck == true) {
            $scope.saveEDMnode()
          } else {
            if (!$scope.senderEmailCheck || $scope.testEmailsCheck == false) {
              $(this).Alert({
                "title": "提示",
                "str": "请填写正确的邮件地址!",
                "mark": true,
                "eleZindex": 20002,
                "markZindex": 20001
              });
            } else{
              return
              }
            }
          }

        }


      $scope.saveEDMnode = function() {
        var subInfo = {
          nodeEdm: {
            id: graph.nodeId,
            gatewayId: $scope.CurEDMGateway.gatewayId,
            sender: $scope.EDMnode.sender,
            senderEmail: $scope.EDMnode.senderEmail,
            useEnterpriseEmail: $scope.EDMnode.useEnterpriseEmail,
            subject: $scope.EDMnode.subject,
            testEmail: $scope.EDMnode.testEmail,
            emailType: $scope.EDMnode.emailType,
            deliveryTimeSelection: $scope.EDMnode.deliveryTimeSelection,
            deliveryDate: $scope.EDMnode.deliveryDate,
            overAssignDelivery: $scope.EDMnode.overAssignDelivery,
            outputControl: $scope.EDMnode.outputControl
          },
          name: $scope.EDMnode.name,
          remark: $scope.nodecomment,
          blacklist: $scope.EDMnode.blacklist,
          redlist: $scope.EDMnode.redlist,
          sampleEmailZipFormatUrl: $scope.EDMnode.sampleEmailZipFormatUrl,
          sampleEmailHtmlFormatUrl: $scope.EDMnode.sampleEmailHtmlFormatUrl
        };
        console.log(subInfo)
        if($scope.EDMnode.emailType == '1') {
          subInfo.nodeEdm.emailFileName =  $scope.EDMnode.uploadFileName;
          subInfo.emailFileName = $scope.EDMnode.uploadFileName;
        } else {
          subInfo.nodeEdm.shopId =  $scope.EDMnode.customerEamilDataSelected.shopId;
          subInfo.nodeEdm.emailId =  $scope.EDMnode.customerEamilDataSelected.id;
          subInfo.nodeEdm.emailName =  $scope.EDMnode.customerEamilDataSelected.name;
        };
        if (!subInfo.nodeEdm.gatewayId) {
          $(this).Alert({"title": "提示", "str": "请选择EDM通道。", "mark": true, "eleZindex": 20002, "markZindex": 20001});
        } else if ($scope.EDMnode.emailType == '1' && !subInfo.nodeEdm.emailFileName) {
          $(this).Alert({"title": "提示", "str": "您未上传邮件。", "mark": true, "eleZindex": 20002, "markZindex": 20001});
        } else if($scope.EDMnode.emailType == '2' && !subInfo.nodeEdm.emailId) {
          $(this).Alert({"title": "提示", "str": "您未选择邮件。", "mark": true, "eleZindex": 20002, "markZindex": 20001});
        } else if($scope.EDMnode.emailType == '2' && $scope.EDMnode.customerEamilDataSelected.status == 500) {
          $(this).Alert({"title": "提示", "str": "您选择邮件已被删除，请重新选择。", "mark": true, "eleZindex": 20002, "markZindex": 20001});
        } else {
          $http.get(GLOBAL_STATIC.nodeRoot + 'node/edm/checkemail?gatewayid=' + $scope.CurEDMGateway.gatewayId + '&email=' + $scope.EDMnode.senderEmail + '').success(function (data) {
            if (data.flag == false) {
              $(this).Confirm({"title": "提示", "str": "你现在使用的是个人邮箱发送邮件，邮件发送成功率无法保障，建议使用企业邮箱发送。", "mark": true},
                function () {
                  saveService.saveEDMnode(function () {
                    $(this).yAlert({"text": "保存成功"});
                    $("#nodeContent").hide();
                    //$(".yunat_maskLayer").remove();
                    removeAlert();
                    $scope.editNodeName($scope.EDMnode.id, $scope.EDMnode.name,$scope.nodecomment)
                  }, subInfo);
                });
            }else {
              saveService.saveEDMnode(function () {
                $("#nodeContent").hide();
                $(".yunat_maskLayer").remove();
                $(this).yAlert({"text": "保存成功"});
                removeAlert();
                $scope.editNodeName($scope.EDMnode.id, $scope.EDMnode.name,$scope.nodecomment)
              }, subInfo);
            }
          });
        }
      }
      function checkSelectByClick() {
        if ($(".groupList .WHITE li.cur").length == $(".groupList .WHITE  li").length && $(".groupList .WHITE li").length > 0) {
          $("#WHITE").attr("checked", "checked");
        } else {
          $("#WHITE").removeAttr("checked");
        }
        if ($(".groupList .BLACK li.cur").length == $(".groupList .BLACK li").length && $(".groupList .BLACK li").length > 0) {
          $("#BLACK").attr("checked", "checked");
        } else {
          $("#BLACK").removeAttr("checked");
        }
        if ($(".groupList .EMAIL li.cur").length == $(".groupList .EMAIL li").length && $(".groupList .EMAIL li").length > 0) {
          $("#EMAIL").attr("checked", "checked");
        } else {
          $("#EMAIL").removeAttr("checked");
        }
        if ($(".groupList .ALLGroupContent .cur").length == $(".groupList .ALLGroupContent  li").length) {
          $("#ALL").attr("checked", "checked");
        } else {
          $("#ALL").removeAttr("checked");
        }
      }

      function checkSelectByData() {
        //初始化列表选中状态
        $scope.defaultIds = [];
        $scope.EDMnode.blacklist.customer.forEach(function(value, key) {
          $scope.defaultIds.push(value.id);
        });
        $scope.EDMnode.blacklist.email.forEach(function(value, key) {
          $scope.defaultIds.push(value.id);
        });
        $scope.EDMnode.redlist.forEach(function(value, key) {
          $scope.defaultIds.push(value.id);
        });
        $(".groupList li").each(function(i) {
          $(".groupList li").eq(i).removeClass("cur");
          $scope.defaultIds.forEach(function(v, k) {
            if ($(".groupList li").eq(i).data("id") == v) {
              $(".groupList li").eq(i).addClass("cur");
            }
          })
        })
        //初始化复选框状态
        var length = $filter('GroupByType')($scope.WhiteAndBlackList, 'WHITE').length;
        if ($scope.EDMnode.redlist.length == length) {
          $("#WHITE").attr("checked", "checked");
        } else {
          $("#WHITE").removeAttr("checked");
        }
        var lengthBlack = $filter('GroupByType')($scope.WhiteAndBlackList, 'BLACK').length;
        var lengthDefaultBlack = $scope.EDMnode.blacklist.customer.length;
        if (lengthDefaultBlack == lengthBlack || lengthBlack == 0) {
          $("#BLACK").attr("checked", "checked");
        } else {
          $("#BLACK").removeAttr("checked");
        }
        var lengthEmail = $filter('GroupByType')($scope.WhiteAndBlackList, 'EMAIL').length;
        var lengthDefaultEmail = $scope.EDMnode.blacklist.email.length;
        if (lengthDefaultEmail == lengthEmail || lengthEmail == 0) {
          $("#EMAIL").attr("checked", "checked");
        } else {
          $("#EMAIL").removeAttr("checked");
        }
        if (lengthBlack + lengthEmail == lengthDefaultEmail + lengthDefaultBlack || (lengthBlack == 0 && lengthEmail == 0)) {
          $("#ALL").attr("checked", "checked");
        } else {
          $("#ALL").removeAttr("checked");
        }
      }

      //自定义表格
      $scope.gridObj = {
        "modelSrc": "",
        // 客户订单查询 修改属性模板入口
        "customerNo": "",
        "curAttrId": "",
        "showConfigAttrSrc": "",
        "addCustomAttrPage": true,
        "customList": "",
        "customVal": "",
        "girdElement": angular.element(".dataInfoList")[0],
        //编译模板
        "upCompile": function(curScope) {
          $compile(angular.element(".dataInfoList"))($scope || curScope);
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        },
        "compileTpl": function(b) {
          $compile(angular.element(".uploadResult"))($scope || b); //编译类为marketingList元素及子元素
        },
        "itemdown": function(jobId) {
          getListService.getEdmDownLoad(function(response) {}, graph.campId, graph.nodeId, jobId)
        }

      }
      //获取响应报告
      $scope.getReports = function() {
        $('.dataInfoList').height(300);//表格重载
        $('.dataInfoList .bDiv ').height(231);//表格重载
        $(".discountEcDataView").addInteractivePop({
          magTitle: "发送报告",
          width: 910,
          heigth: 500,
          mark: false,
          position: "fixed",
          childElePop: true,
          screenBtn: true
        });
        getListService.senderEdmSummary(function(response){
          $scope.submitNumTotal = response.submitNumTotal;
          $scope.receiveNumTotal = response.receiveNumTotal;
          $scope.successNumTotal = response.successNumTotal;
          $scope.errorNumTotal = response.errorNumTotal;
          $scope.bounceNumTotal = response.bounceNumTotal;
          $scope.openNumTotal = response.openNumTotal;
          $scope.clickNumTotal = response.clickNumTotal;
        });

        $('.dataInfoGrid').flexigrid({
          url: GLOBAL_STATIC.nodeRoot + 'report/sender/edm/list?campId=' + graph.campId + '&nodeId=' + graph.nodeId,
          method: 'GET',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          colModel: [

            {
              display: '通道',
              name: 'gatewayName',
              width: 100,
              sortable: false,
              align: 'left',
              dataindex: 'gatewayName'
            },
            {
              display: '客户提交时间',
              name: 'submitTime',
              width: 150,
              sortable: false,
              align: 'center',
              dataindex: 'submitTime',
              renderer: function(v) {
                if (!v) {
                  return "";
                } else {
                  return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>";
                }
              }
            },
            {
              display: '客户提交数',
              name: 'submitNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'submitNum'
            },
            {
              display: '通道接收时间',
              name: 'receiveTime',
              width: 150,
              sortable: false,
              align: 'center',
              dataindex: 'receiveTime',
              renderer: function(v) {
                if (!v) {
                  return "";
                } else {
                  return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "'>" + setISO(v, "all") + "</span>";
                }
              }
            },
            {
              display: '通道接收数',
              name: 'receiveNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'receiveNum'
            },
            {
              display: '发送',
              name: 'successNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'successNum'
            },
            {
              display: '报告更新时间',
              name: 'updated',
              width: 150,
              sortable: false,
              align: 'center',
              dataindex: 'updated',
              renderer: function(v) {
                if (!v) {
                  return "";
                } else {
                  return "<span class='ac_status_grid ac_status_" + v + "' title='" + setISO(v, "all") + "' >" + setISO(v, "all") + "</span>";
                }
              }
            },
            {
              display: '地址错误',
              name: 'errorNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'errorNum'
            },
            {
              display: '退回',
              name: 'bounceNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'bounceNum'
            },
            {
              display: '打开',
              name: 'openNum',
              width: 100,
              sortable: false,
              align: 'right',
              dataindex: 'openNum'
            },
            {
              display: '点击',
              name: 'enable',
              width: 100,
              align: 'right',
              dataindex: 'enabled',
              mapping: ['clickNum', 'jobId'],
              convert: function(v, mappVal) {
                if (!mappVal[0]) {
                  return 0;
                } else {
                  return mappVal[0];
                }
              }
            },
            {
              display: '发送详情',
              name: 'sendInfoUrl',
              width: 100,
              align: 'left',
              dataindex: 'sendInfoUrl',
              renderer: function(v) {
                return '<a title="下载" target="_blank"  ng-href="' + v + '">查看</a>';
              }
            }
          ],
          /* params: campListParams,*/
          updateDefaultParam: true,
          sortname: "",
          sortorder: "desc",
          buttons: [],
          usepager: true,
          useRp: true,
          rp: 20,
          showTableToggleBtn: true,
          colAutoWidth: false,
          onSuccess: function() {
            var scope = angular.element('.dataInfoList').scope();
            scope.gridObj.upCompile(scope);

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
        $('.discountEcDataView .areaScreen').click(function() {
          var currentClass = $(this).attr('class');
          setTimeout(function() {
            if(currentClass === 'fullScreen') {
              return false;
            }
            var maxHeight = $(window).height();
            var flexiWidth = $('.dataInfoList').width();
            $('.dataInfoList').height('auto');
            $('.dataInfoList .bDiv ').height(maxHeight - 206);
            $('.dataInfoList .flexigrid tr div').width((flexiWidth-105)/13);
          },0)
        });
        $(".discountEcDataView .fullScreen").die().live("click",function(){
          $('.dataInfoList').height(300);
          $('.dataInfoList .bDiv ').height(231);
        });
        $(".discountEcDataView .close").die().live("click",function(){
          $(this).siblings('.fullScreen').attr("class","areaScreen");
        });

      }
      //名单
      $scope.groupPop = {
        "openGroupPop": function(type) {
          $scope.groupType = type;

          checkSelectByData();
          $(".groupList li").die("click").live("click", function() {
            $(this).toggleClass("cur");
            checkSelectByClick();
          });

          if ($scope.groupType == "WHITE") {
            $(".WHITEGroupContent").show();
            $(".ALLGroupContent").hide();
            $(".groupList").addInteractivePop({
              magTitle: "选择红名单",
              mark: false,
              position: "fixed",
              childElePop: true
            });
          } else {
            $(".WHITEGroupContent").hide();
            $(".ALLGroupContent").show();
            $(".groupList").addInteractivePop({
              magTitle: "选择黑名单",
              mark: false,
              position: "fixed",
              childElePop: true
            });
          }
        },
        //复选框
        "change": function(e, type) {
          if (e.target.checked) {
            if (e.target.id == "ALL") {
              $(".groupList .ALLGroupContent li").each(function() {
                $(this).addClass("cur")
              });
              $("#BLACK").attr("checked", true);
              $("#EMAIL").attr("checked", "checked");
            } else {
              $(".groupList ." + e.target.id + " li").each(function() {
                $(this).addClass("cur")
              });
              if ($(".groupList .ALLGroupContent li").length == $(".groupList .ALLGroupContent li.cur").length && $("#BLACK").attr("checked") &&  $("#EMAIL").attr("checked")) {
                $("#ALL").attr("checked", "checked");
              }
            }

          } else {
            if (e.target.id == "ALL") {
              $(".groupList .ALLGroupContent li").each(function() {
                $(this).removeClass("cur")
              });
              $("#BLACK").removeAttr("checked");
              $("#EMAIL").removeAttr("checked");
            } else {
              $(".groupList ." + e.target.id + " li").each(function() {
                $(this).removeClass("cur")
              });
             // if ($(".groupList .ALLGroupContent .cur").length != $(".groupList .ALLGroupContent li").length) {
                $("#ALL").removeAttr("checked");
             // }
            }
          }
        },
        //保存选定的分组
        "save": function() {
          if ($scope.groupType == "WHITE") {
            $scope.EDMnode.redlist = [];
          } else {
            $scope.EDMnode.blacklist = {};
            $scope.EDMnode.blacklist.customer = [];
            $scope.EDMnode.blacklist.email = [];
          }
          if ($scope.groupType == "WHITE") {
            $(".groupList .WHITE li.cur").each(function() {
              $scope.EDMnode.redlist.push({
                "id": $(this).data("id") + "",
                "name": $(this).data("name")
              });
            })
          } else {
            $(".groupList .ALLGroupContent li.cur").each(function() {
              switch ($(this).attr("var")) {
                case "BLACK":
                  $scope.EDMnode.blacklist.customer.push({
                    "id": $(this).data("id") + "",
                    "name": $(this).data("name")
                  });
                  break;
                case "EMAIL":
                  $scope.EDMnode.blacklist.email.push({
                    "id": $(this).data("id") + "",
                    "name": $(this).data("name")
                  });
                  break;
              }
            })
          }

          if ($scope.groupType == "WHITE") {
            if ($scope.EDMnode.redlist.length > 0) {
              $scope.EDMnode.redlistTip = "选择了" + $scope.EDMnode.redlist.length + "个红名单组";
            } else {
              $scope.EDMnode.redlistTip = "";
            }

          } else {
            var msg = "";
            if ($scope.EDMnode.blacklist.customer.length > 0) {
              msg += $scope.EDMnode.blacklist.customer.length + "个客户黑名单组,";
            }
            if ($scope.EDMnode.blacklist.email.length > 0) {
              msg += $scope.EDMnode.blacklist.email.length + "个邮箱黑名单组,";
            }
            if (msg.lastIndexOf(",") == msg.length - 1) {
              msg = msg.substr(0, msg.length - 1);
            }
            if (msg != "") {
              $scope.EDMnode.blacklistTip = "选择了" + msg;
            } else {
              $scope.EDMnode.blacklistTip = "";
            }
          }
          $(".groupList").hide();
          $(".childElementMark").remove();
        }
      }
      $scope.openNodePop();
      // customer list
      $scope.EDMnode.common = function (data, ele) {     //模拟普通的select框
        var $selContent = ele.next(".selectContent:first");
        $selContent.children().remove();
        var eleName = ele.attr("name");
        var $ul = $("<ul>");
        if (data) {
          $selContent.append($ul);
          var len = data.length;
          for (var i = 0; i < len; i++) {
            if (eleName == "EDMnodeShop") {
              $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].idInPlat + '>' + data[i].name + '</a></li>');
              $ul.find("a").css({
                "padding": "3px 10px",
                "color": "#3D3D3D",
                "display": "block"
              });
            }

          }
          $ul.find("a").bind({
            "click": function () {
              var curId = $(this).attr("id");
              var shopName = $(this).text();
              ele.val(shopName);
              ele.attr("valueId", curId);
              $selContent.slideUp(200);
              $scope.$apply(function(){
                $scope.EDMnode.shopId = curId;
                $scope.EDMnode.shopName = shopName;
                $scope.EDMnode.categoryId ="";
                $scope.EDMnode.categoryName="";
              });
            },
            "mouseenter": function () {
              $(this).css({
                "color": "#0083BA",
                "background": "#F2F2F2",
                "text-decoration": "none"
              });
            },
            "mouseleave": function () {
              $(this).css({
                "color": "#3D3D3D",
                "background": "#FFFFFF"
              });
            }
          })
        }
      };

      $scope.EDMnode.getShops = function() {
        getListService.getShopsByPlatformId(function(data){
          $scope.EDMnode.common(data, $('[name="EDMnodeShop"]'));
        },$rootScope.taobaoSegmentationId);
      };

      $scope.EDMnode.getShopsFirstList = function() {
        getListService.getShopsByPlatformId(function(data){
          if(data) {
            $scope.EDMnode.shopName = data[0].name;
            $scope.EDMnode.shopId = data[0].idInPlat;
            $scope.EDMnode.categoryId ="";
            $scope.EDMnode.categoryName="";
            $('[name="EDMnodeShop"]').val($scope.shopName);
            $('[name="EDMnodeShop"]').attr("valueId", $scope.shopId);
          }
        },$rootScope.taobaoSegmentationId);
      }

      $scope.EDMnode.selectEmail = function() {
        if($scope.isEditorFlag) {
          return "当前节点不可编辑";
        }
        $('.customer-email-wrap').empty();
        $scope.EDMnode.emailSelectorUrl = CAMPAIGN_STATIC.tplBasePath + "view/node/tcommunicateEDMSelector.html?_=" + new Date().getTime();
        $scope.EDMnode.shopName = "";
        $scope.EDMnode.shopId = "";
        $scope.EDMnode.categoryName = "";
        $scope.EDMnode.categoryId = "";
        $scope.EDMnode.productName = "";
        $scope.EDMnode.customerEmailData = [];
      }

      $scope.EDMnode.showEmailPop = function() {
        $(".customer-email-wrap").addInteractivePop({ magTitle: "邮件选择", width: 910, heigth: 500, mark: false, position: "fixed", childElePop: true });
      }

      $scope.EDMnode.pager = {
        currentPageInput: 1,
        currentPage: 1,
        pageSize: "10",
        totalPages: 1
      };

      $scope.EDMnode.getEmailsData = function(issearch, pageSizeIsChange) {
        var that = this;
        that.isExternal = true;

        var currentPage = +that.pager.currentPage;
        if (!isNaN(currentPage) && angular.isNumber(currentPage)) {
            if (currentPage > that.pager.totalPages) {
                currentPage = that.pager.totalPages;
            } else if (currentPage < 1) {
                currentPage = 1;
            }
        } else {
            currentPage = 1;
        }

        var params = {
          page: pageSizeIsChange ? 1 : currentPage,
          size: that.pager.pageSize,
          shopId: that.shopId,
          mediaName: that.productName,
          categoryId: that.categoryId
        };

        if(issearch) {
          params.size = 10;
          params.page = 1;
        }

        getListService.getAllEmails(function(response) {
          if(response.data) {
            that.customerEmailData = response.data;
            that.customerEmailData.shopName = that.shopName;
            that.pager.currentPage = response.page;
            that.pager.currentPageInput = response.page;
            that.pager.pageSize = response.pageSize + '';
            that.pager.totalPages = Math.ceil(response.total / response.pageSize);
          };
          that.isExternal = false;
        }, params);
      };

      // 邮件分类
      $scope.EDMnode.getCategory = function() {
        getListService.getAllCategory(function(response) {
          var data = response.data;
          $scope.EDMnode.commonTree(data, $('[name="EDMCategory"]'));
        }, $scope.EDMnode.shopId);
      };

      $scope.EDMnode.commonTree = function(data, ele) {
        var $selContent = ele.siblings(".selectContent");
        $selContent.children().remove();
        var $ul = $("<ul>", {"class": "ztree"});
        $selContent.append($ul);
        if (data) {
          function onClick(event, treeId, treeNode) {
            ele.val(treeNode.name);
            ele.attr("valueId", treeNode.id);
            $selContent.slideUp(200);
            $scope.EDMnode.categoryName = treeNode.name;
            $scope.EDMnode.categoryId = treeNode.id;
          }

          var setting = {
            data: {
              key: {
                title: "name"
              },
              simpleData: {
                enable: true,
                pIdKey: "parentId"
              }
            },
            view: {//设置多级样式
              addDiyDom: function (treeId, treeNode) {
                var spaceWidth = 10;
                var switchObj = $("#" + treeNode.tId + "_switch"),
                    icoObj = $("#" + treeNode.tId + "_ico");
                switchObj.remove();
                icoObj.before(switchObj);
                var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
                switchObj.before(spaceStr);
              }
            },
            callback: {
              onClick: onClick
            }
          };
          $.fn.zTree.init($ul, setting, data);
        }
      };

      $scope.EDMnode.setPage = function(page) {
        var currentPage = +$scope.EDMnode.pager.currentPage;
        if (angular.isString(page)) {
          switch (page) {
            case 'first':
              currentPage = 1;
              break;
            case 'last':
              currentPage = +$scope.EDMnode.pager.totalPages;
              break;
            case 'prev':
              currentPage--;
              break;
            case 'next':
              currentPage++;
              break;
          }
        } else if (angular.isNumber(page)) {
          currentPage = page;
        }
        $scope.EDMnode.pager.currentPage = currentPage;
        $scope.EDMnode.getEmailsData();
      };

      $scope.EDMnode.noPrevious = function() {
        return this.pager.currentPage == 1;
      };

      $scope.EDMnode.noNext = function() {
        return this.pager.currentPage === this.pager.totalPages;
      }

      $scope.EDMnode.addEmail = function() {
        $('.dataInfoList input[type="radio"]').each(function(key) {
          if($(this).is(":checked")) {
            $scope.EDMnode.customerEamilDataSelected = $scope.EDMnode.customerEmailData[key]
            $scope.EDMnode.customerEamilDataSelected.status = 200;
            $scope.EDMnode.customerEamilDataSelected.errorMsg = "";
          }
        });
        $(".customer-email-wrap").hide();
        $(".childElementMark").remove();
        // console.log($scope.EDMnode.customerEamilDataSelected)
      }

      $scope.$watch('EDMnode.pager.currentPage', function (newValue, oldValue) {
        if (!newValue || newValue == oldValue || $scope.EDMnode.isExternal) {
          return;
        }
        newValue = +newValue;
        if (!isNaN(newValue) && angular.isNumber(newValue)) {
          if (newValue > $scope.EDMnode.pager.totalPages) {
            $scope.EDMnode.pager.currentPage = $scope.EDMnode.pager.totalPages;
            return;
          } else if (newValue < 1) {
            $scope.EDMnode.pager.currentPage = 1;
            return;
          }
        } else {
          $scope.EDMnode.pager.currentPage = 1;
        }
      });

      $(".customer-email-wrap .inputPage").die().live({
        "keydown": function(e) {
          if(e.keyCode === 13) {
            $scope.EDMnode.pager.currentPage = $scope.EDMnode.pager.currentPageInput;
            $scope.EDMnode.getEmailsData();
          }
        }

      })

      $scope.$watch('EDMnode.pager.pageSize', function (newValue, oldValue) {
        if (!newValue || newValue == oldValue) {
          return;
        }
        $scope.EDMnode.getEmailsData(false, true);
      });
      // 监听邮件名称输入特殊字符
      $scope.$watch('EDMnode.productName', function(n, v) {
        if (!n || n == v) {
          return;
        }

        if(/[^\u4e00-\u9fa5a-zA-Z0-9\s_]/g.test(n)) {
          $scope.EDMnode.productName = $scope.EDMnode.productName.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s_]/g, '');
        }
      });

      // 跳转到内容管理
      $scope.EDMnode.goContentManage = function() {
        var contentManage = '';
        angular.forEach($rootScope.user.nav, function(v, k) {
          if(v.name === '内容管理') {
            contentManage = v.url;  //可能的值insert({context: 'contentManage'})
          }
        });
        if(!contentManage) {
          $(this).Alert({"title": "提示", "str": "您没有内容管理权限", "mark": true, "eleZindex": 20002, "markZindex": 20001});
        } else {
          $('.yunat_maskLayer').remove();  //先移除遮罩层
          location.href = location.pathname + "#/insert/contentManage";
        }
      }
    }
  ]);
})(window, angular, undefined);
