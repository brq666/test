(function (window, angular, undefined) {
    var app = angular.module('campaign.controllers');

    app.controller('dclonedmNodeCtrl', ["$rootScope", "$scope", "$http", "$compile", "getListService", "dclonService", "$q", "$sce",
        function ($rootScope, $scope, $http, $compile, getListService, dclonService, $q, $sce) {
            //节点是否可编辑，确定按钮是否显示,
            $scope.isEditorFlag = (!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8)
            $scope.showNodeReport = false;
            //增加弹窗对象限制
            $scope.oncewindow = true;
            //节点默认数据
            $scope.EDMnode = {};
            $scope.EDMGateway = [];
            $scope.EnterpriseEmail = {};
            $scope.CurEDMGateway = {};

            $scope.editorHide = true;
            $scope.count = 0;
            $scope.varCount = 0;
            $scope.arrTag = [];

            $scope.EDMnode = {
                "id": graph.nodeId,
                "name": ""
            }
            $scope.mailTitle = "模板";
            $scope.EDMnode.blacklistTip = true;
            $scope.EDMnode.redlistTip = true;
            $scope.EDMnode.emailType = "2";
            $scope.EDMnode.customerEamilDataSelected = {};
            getListService.nodeStatus(function (response) {
                if (response.subjobStatus > 20) {
                    $scope.showNodeReport = true;
                }
            }, graph.nodeId, graph.campJobid)

            //装载控件
            $scope.initUp = function (element) {
            }

            dclonService.edm.getOptout(function (data) {
                $scope.optoutDis = data;
            })

            function settingCurCount() {
                if ($(document.getElementById('mesIframe').contentWindow.document.body).find('#input_substitute').html()) {
                    var str1 = $(document.getElementById('mesIframe').contentWindow.document.body).find('#input_substitute').html();
                    var str2 = $(document.getElementById('mesIframe').contentWindow.document.body).html()
                    var str3 = str2 + str1;
                    $(document.getElementById('mesIframe').contentWindow.document.body).html(str3)
                    $(document.getElementById('mesIframe').contentWindow.document.body).find('#input_substitute').html('');
                }
                if (kindEditorObj.getKindEditorVal(kindEditor.html()) != "") {
                    $scope.editorHide = true;
                } else {
                    $scope.editorHide = false;
                }

                var str = kindEditor.html()
                var regSpace = /(&nbsp;)/g
                str = str.replace(regSpace, function () { return " " })
                str = str.replace(/(^\s+)|(\s+$)/g, "")
                var regHasValue = /(<img[^\>]*?>)|(<span\s?[^\>]*>.*?<\/span>)|(<input[^\>]*?>)/gi
                str = str.replace(regHasValue, "")

                var objIframe = $(document.getElementById('mesIframe').contentWindow.document.body);
                var nowLen = listenLen(objIframe);
                /*   var count = kindEditor.count('text');*/
                var count = str.length
                var sStr = kindEditor.html().match(/&([^n]*?);/g);
                if (sStr) {
                    $.each(sStr, function (i, n) {
                        count = count - n.match(/&([^n]*?;)/)[1].length;
                    });
                }
                var customBlankLen = kindEditor.html().replace(/(&nbsp;*\s*)+$/, "").match(/<span[\s\S]*?<\/span>&nbsp;/gi) || []; //自定义js加上去的空格，去除长度
                var inputImgCount = kindEditor.html().match(/value="([^\>]*?)"|alt="([^\>]*?)"/gi);
                var inputImgLen = 0;
                if (inputImgCount) {
                    $.each(inputImgCount, function (i, n) {
                        inputImgLen += n.replace('value="', "").replace('alt="', "").replace('"', "").length;
                    });
                }
                $scope.count = count - customBlankLen.length + inputImgLen;
                $scope.varCount = (kindEditor.html().split('<input').length - 1) + (kindEditor.html().split('<img').length - 1);
            };

            $scope.tagClick = function(id, name, tag, lid) {
                // if (lid === 3) {
                //   $('#currentIntegral').addInteractivePop({
                //     magTitle: "卡类型选择",
                //     width: 732,
                //     mark: false,
                //     position: "fixed",
                //     childElePop: true
                //   });
                //   $scope.getCardList();
                // } else{
                $scope.editorHide = true;
                kindEditorObj.editorAddElement(kindEditor, id, name, tag);
                settingCurCount();
                // }
              }

            $scope.initEditor = function () {
                $sd = $(document.getElementById('mesIframe').contentWindow.document.body)

                // 节点不可编辑,
                if (!graph.isEditable) {
                    $(document.getElementById('mesIframe')).css({
                        "position": "relative",
                        "zIndex": 100
                    });
                    kindEditor.readonly(true);
                }

                $sd.bind('paste', function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            settingCurCount();
                        })
                    }, 100)
                })

                $sd.keyup(function () {
                    $scope.$apply(function () {
                        settingCurCount();
                    })
                })
            }


            //编辑器
            $scope.initEdit = function (preview) {
                if (preview == "review") {
                    $scope.kindEditor = kindEditorObj.creatEditorforEDMPre("#emailReview");
                } else {
                    $scope.kindEditor = kindEditorObj.creatEditorforEDM("#emailEditor");
                }
                $scope.kindEditor.html($scope.uploadFileHtml);
                $scope.kindEditor.clickToolbar("preview", function () {
                    var dialog = KindEditor.dialog({
                        width: "100%",
                        height: angular.element(window).height(),
                        title: '预览',
                        body: '<div style="padding:10px 20px;height:100%;"><iframe frameborder="0" class="ke-textarea-custom" width="100%" height="100%"></iframe></div>',
                        closeBtn: {
                            name: '关闭',
                            click: function (e) {
                                dialog.remove();
                            }
                        },
                        noBtn: {
                            name: '取消',
                            click: function (e) {
                                dialog.remove();
                            }
                        }
                    });
                    angular.element(".ke-textarea-custom")[0].contentWindow.onload = function () {
                        angular.element(this.document.head).html(angular.element(document.getElementById('mesIframe').contentWindow.document.head).html());
                        angular.element(this.document.body).html(angular.element(document.getElementById('mesIframe').contentWindow.document.body).html());
                    };
                })
            }

            var initForm = function (data) {
                var result = ""
                for (var i in data) {
                    if (data[i].type == "text") {
                        var str = KindEditor.escape(data[i]["text"])
                        var regSpace = /(\s)/g
                        str = str.replace(regSpace, "&nbsp;")
                        result += str
                    }
                    else {
                        if (jQuery.browser.mozilla) {
                            var str = "<img id='" + data[i]["id"] + "' class='varImg' alt='" + data[i]["text"] + "' >"
                        } else {
                            var str = "<input readonly='true' id='" + data[i]["id"] + "'   class='btInput' value='" + data[i]["text"] + "' >"
                        }
                        result += str
                    }
                }
                return result
            }

            var formDate = function (data) {
                var reg = /(&nbsp;)|(\s)/gi
                data = data.replace(reg, " ")
                data = data.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
                /*                var spanReg1 =/(<span\s?[^\>]*>[^<\/span>]+<\/span>)\s/gi
                 data = data.replace(spanReg1, "$1");//去掉span生成的空格*/   //不适用span了
                /*    var regValue=/(<input[^\>]*?>)/gi*/
                if (jQuery.browser.mozilla) {
                    var regValue = /(<img[^\>]*?>)/gi
                }
                else {
                    var regValue = /(<input[^\>]*?>)/gi
                }
                var data = data.split(regValue)
                var resultObj = []
                for (var i in data) {
                    var obj = {};
                    var objhfive = {};
                    if (regValue.test(data[i])) {
                        if ($(data[i])[0].name) {
                            if (jQuery.browser.mozilla) {
                                objhfive.h5_shopid = $(data[i])[0].title;
                                objhfive.h5_plat = $(data[i])[0].name;
                                objhfive.h5_tenatid = $(data[i])[0].align;
                                objhfive.h5_templeturl = $(data[i])[0].src;
                                obj.id = 'h5^' + $(data[i])[0].name + '^' + $(data[i])[0].align + '^' + $(data[i])[0].title + '^' + $(data[i])[0].src;
                            }
                            else {
                                /*objhfive.h5_shopid = $(data[i])[0].alt;
                                objhfive.h5_plat = $(data[i])[0].name;
                                objhfive.h5_tenatid = $(data[i])[0].align;
                                objhfive.h5_templeturl = $(data[i])[0].src;*/
                                obj.id = 'h5^' + $(data[i])[0].name + '^' + $(data[i])[0].align + '^' + $(data[i])[0].alt + '^' + $(data[i])[0].src;
                            }
                        }
                        else {
                            obj.id = $(data[i])[0].id
                        }
                        if ($(data[i])[0].tagName == "INPUT") {
                            obj.text = $(data[i]).val()
                        }
                        else {
                            obj.text = $(data[i])[0].alt
                        }
                        obj.type = "var"
                        resultObj.push(obj)
                    }
                    else {
                        var str = data[i]
                        if (str) {
                            obj.type = "text"
                            obj.text = KindEditor.unescape(str)
                            resultObj.push(obj)
                        }
                    }
                }
                return resultObj
            }

            //算字数的
            $scope.strToTagNameNum = function (str) {
                if (jQuery.browser.mozilla) {
                    str = str.replace(/<img[\s\S]*?>/g, function () {
                        var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText || $('[' + arguments[0] + ']').attr("alt")
                        text = "";
                        return text;
                    }).replace(/<span[\s\S]*?<\/span>/g, function () {
                        var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText
                        text = "";
                        return text;
                    });
                } else {
                    str = str.replace(/<span[\s\S]*?<\/span>/g, function () {
                        var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText
                        text = "";
                        return text;
                    }).replace(/<img[\s\S]*?>/g, function () {
                        var text = $('[' + arguments[0] + ']')[0].textContent || $('[' + arguments[0] + ']')[0].innerText || $('[' + arguments[0] + ']').attr("alt")
                        text = "";
                        return text;
                    });
                }
                return str;
            }

            //获取EDM节点
            $scope.getEDM = function () {
                var callback = function (data) {
                    $scope.EDMnode.name = data.name || "EDM";
                    $scope.nodecomment = data.remark;
                    $scope.EDMnode.sender = "迪卡侬";
                    $scope.EDMnode.senderEmail = "info@edm.decathlon.com.cn";
                    $scope.EDMnode.useEnterpriseEmail = data.useEnterpriseEmail || false; //是否使用企业邮箱，默认不使用
                    // $scope.EDMnode.subject = data.subject;

                    $scope.EDMnode.subject = initForm(data.subject);
                    kindEditor.html(kindEditorObj.firstSetVal($scope.EDMnode.subject));
                    $scope.count = $scope.strToTagNameNum($scope.EDMnode.subject).replace(new RegExp('&nbsp;', 'g'), ' ').length;

                    $scope.EDMnode.testEmail = data.testEmail;
                    $scope.EDMnode.emailType = data.emailType ? (data.emailType + '') : '2'; //选择邮箱类型，默认为1 上传文件
                    $scope.EDMnode.deliveryTimeSelection = data.deliveryTimeSelection ? (data.deliveryTimeSelection + '') : '0'; //发送时间类型；默认为0；
                    $scope.EDMnode.deliveryDate = data.deliveryDate;
                    $scope.EDMnode.overAssignDelivery = data.overAssignDelivery; //超过预设时间实时发送，默认为1；
                    $scope.EDMnode.outputControl = data.outputControl ? (data.outputControl + '') : '0'; //输出控制
                    $scope.EDMnode.gatewayId = data.gatewayId; //渠道通道
                    $scope.EDMnode.blacklist = data.blacklist;
                    $scope.EDMnode.designerDomain = data.designerDomain;
                    if ($scope.EDMnode.emailType !== '1') {
                        // 自定义邮件
                        $scope.EDMnode.customerEamilDataSelected.shopId = data.nodeEdm.shopId;
                        $scope.EDMnode.customerEamilDataSelected.id = data.nodeEdm.emailId;
                        $scope.EDMnode.customerEamilDataSelected.name = data.nodeEdm.emailName;
                        $scope.EDMnode.customerEamilDataSelected.status = data.status || 200;
                        $scope.EDMnode.customerEamilDataSelected.errorMsg = data.errorMsg || "";
                    }
                    if ($scope.EDMnode.blacklist.customer.length === 0 && !$scope.EDMnode.senderEmail) {
                        $scope.blacklistTip = true;
                    } else {
                        var msg = "";

                        if ($scope.EDMnode.blacklist.customer.length > 0) {
                            $scope.blacklistTip = $scope.EDMnode.blacklist.customer[0].name == 1 ? true : false;
                        } else {
                            $scope.blacklistTip = true;
                        }
                    }
                    $scope.EDMnode.redlist = data.redlist;
                    if ($scope.EDMnode.redlist.length > 0) {
                        $scope.redlistTip = $scope.EDMnode.redlist[0].name == 1 ? true : false;
                    } else {
                        $scope.redlistTip = true;
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
                        }
                    }
                    if ($scope.isEditorFlag) {  //不可编辑
                        // $('#file_upload').css('background', '#8a8a8a');
                    } else {
                        $scope.initUp();
                    }
                    reactElements();
                    settingCurCount();
                }
                dclonService.edm.getEDM(callback, $scope.EDMnode //表单数据
                )

                getListService.getNodeTipsByType(function (responseTips) { // 获取tips
                    $scope.EDMnode.tips = responseTips.tips || "";
                }, "dclonedm");
            }
            function reactElements() {
                if (!graph.isEditable) {
                    // $('#file_upload').find('object').remove();
                    $('#modifyeMail').remove();
                    $("#nodeContent .commNodeMarkRelative .node-mask").remove();
                    var eles = $('form[name=edmForm]')[0].elements;
                    for (var i = 0; i < eles.length; i++) {
                        eles[i].disabled = true;
                    }
                    ($('#reviewToModify').removeClass('btnBlue')[0]) && ($('#reviewToModify').removeClass('btnBlue')[0].disabled = true);
                }
                //执行完成,即使创建人也不可编辑
                if (graph.campStatus === 'A5') {
                    $('#modifyeMail').remove();
                    ($('#reviewToModify').removeClass('btnBlue')[0]) && ($('#reviewToModify').removeClass('btnBlue')[0].disabled = true);
                }
            }
            //获取EDM通道
            $scope.EDMgetGateway = function () {
                var callback = function (data) {
                    $scope.EDMGateways = data;
                    $scope.getEDM();
                }
                dclonService.edm.EDMgetGateway(callback, $scope.EDMGateway)
            }

             //获取邮件标题
             $scope.getEdmTag = function () {
                var callback = function (dat) {
                    angular.forEach(dat, function (data, index) {
                        if (data.source == 'other') {
                            // $scope.arrLabel.push(dat[index]);
                        } else {
                            $scope.arrTag.push(dat[index]);
                        }
                    })
                    // $scope.smsLabels = $scope.arrLabel.sort(function (x, y) {
                    //     return x.sort - y.sort
                    // })
                    $scope.edmTags = $scope.arrTag.sort(function (x, y) {
                        return x.sort - y.sort
                    })
                }
                dclonService.edm.getEdmTag(
                    callback, //callback
                    $scope.model //表单数据
                )
            }

            $scope.getEdmTag();

            //获取企业邮箱
            $scope.EnterpriseEmail = function () {
                var callback = function (data) {
                    $scope.EnterpriseEmail = data;
                    $scope.EnterpriseEmail.email = data.email;
                }
                dclonService.edm.EnterpriseEmail(callback, $scope.EnterpriseEmail)
            }
            $scope.useEnterpriseEmail = function () {
                if ($scope.EDMnode.useEnterpriseEmail == true) {
                    $scope.EDMnode.senderEmail = $scope.EnterpriseEmail.email;
                } else {
                    $scope.EDMnode.senderEmail = "";
                }
            }

            $scope.EDMgetGateway();
            $scope.EnterpriseEmail();
            //邮件编辑
            $scope.modifyPop = function (isCustomer) {
                if ($scope.EDMnode.isHistoryData) {
                    dclonService.edm.uploadtoyun(function (response) {
                        $scope.EDMnode.emailFileName = response.emailFileName || "";
                        if ($scope.EDMnode.emailFileName) {
                            window.open($scope.EDMnode.designerDomain + "#/email/third/" + $scope.EDMnode.emailFileName);
                        }
                    }, graph.nodeId);
                } else {
                    window.open($scope.EDMnode.designerDomain + "#/email/third/" + $scope.EDMnode.emailFileName);
                }
            }
            $scope.reviewToModify = function () {
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
            $scope.closeEditorPop = function (style) {
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
            $scope.checkEDMnode = function () {
                if ($scope.isEditorFlag) {
                    return "当前节点不可编辑";
                }
                if($scope.count > 200) {
                    $(this).Alert({"title":"保存失败","str":"Email主题长度超过200字符（含变量），请修改。","mark":true, "eleZindex":1010,"markZindex":1005});
                    return;
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
                if (!$scope.EDMnode.sender) {
                    $("div:contains('发件人名称')").css('display', 'block');
                    $("div:contains('发件人名称')").prev('input').addClass('border_warning');
                }
                // if (!$scope.EDMnode.subject) {
                //     $("div:contains('Email主题')").css('display', 'block');
                //     $("div:contains('Email主题')").prev('input').addClass('border_warning');
                // }
                if (!$scope.EDMnode.senderEmail) {
                    $("div:contains('发件人邮箱')").css('display', 'block');
                    $("div:contains('发件人邮箱')").siblings('input').addClass('border_warning');
                }
                if ($scope.EDMnode.deliveryTimeSelection == '1') {
                    if ($scope.EDMnode.name && $scope.EDMnode.sender && $scope.EDMnode.senderEmail && $scope.EDMnode.deliveryDate && $scope.senderEmailCheck && $scope.testEmailsCheck == true) {
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
                        } else {
                            return
                        }
                    }
                } else {
                    if ($scope.EDMnode.name && $scope.EDMnode.sender && $scope.EDMnode.senderEmail && $scope.senderEmailCheck && $scope.testEmailsCheck == true) {
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
                        } else {
                            return
                        }
                    }
                }
            }

            $scope.saveEDMnode = function () {
                if ($scope.count == 0) {
                    $(this).Alert({ "title": "提示", "str": "请输入Email主题。", "mark": true, "eleZindex": 20002, "markZindex": 20001 });
                    return;
                }
                var subInfo = {
                    nodeEdm: {
                        id: graph.nodeId,
                        gatewayId: $scope.CurEDMGateway.gatewayId,
                        sender: $scope.EDMnode.sender,
                        senderEmail: $scope.EDMnode.senderEmail,
                        useEnterpriseEmail: $scope.EDMnode.useEnterpriseEmail,
                        // subject: $scope.EDMnode.subject,
                        subject: formDate(kindEditor.html()),
                        testEmail: $scope.EDMnode.testEmail,
                        emailType: $scope.EDMnode.emailType,
                        deliveryTimeSelection: $scope.EDMnode.deliveryTimeSelection,
                        deliveryDate: $scope.EDMnode.deliveryDate,
                        overAssignDelivery: $scope.EDMnode.overAssignDelivery,
                        outputControl: $scope.EDMnode.outputControl
                    },
                    name: $scope.EDMnode.name,
                    remark: $scope.nodecomment,
                    // blacklist: $scope.EDMnode.blacklist,
                    // redlist: $scope.EDMnode.redlist,
                    redlist: [{id: 1001, name: $scope.redlistTip === true ? 1 : 0}],
                    blacklist: {customer:[{id: 1001, name: $scope.blacklistTip === true ? 1 : 0}]},
                    sampleEmailZipFormatUrl: $scope.EDMnode.sampleEmailZipFormatUrl,
                    sampleEmailHtmlFormatUrl: $scope.EDMnode.sampleEmailHtmlFormatUrl
                };
                console.log(subInfo)
                if ($scope.EDMnode.emailType == '1') {
                    subInfo.nodeEdm.emailFileName = $scope.EDMnode.uploadFileName;
                    subInfo.emailFileName = $scope.EDMnode.uploadFileName;
                } else {
                    subInfo.nodeEdm.shopId = $scope.EDMnode.customerEamilDataSelected.shopId;
                    subInfo.nodeEdm.emailId = $scope.EDMnode.customerEamilDataSelected.id;
                    subInfo.nodeEdm.emailName = $scope.EDMnode.customerEamilDataSelected.name;
                };
                if (!subInfo.nodeEdm.gatewayId) {
                    $(this).Alert({ "title": "提示", "str": "请选择EDM通道。", "mark": true, "eleZindex": 20002, "markZindex": 20001 });
                } else
                if ($scope.EDMnode.emailType == '1' && !subInfo.nodeEdm.emailFileName) {
                    $(this).Alert({ "title": "提示", "str": "您未上传邮件。", "mark": true, "eleZindex": 20002, "markZindex": 20001 });
                } else if ($scope.EDMnode.emailType == '2' && !subInfo.nodeEdm.emailId) {
                    $(this).Alert({ "title": "提示", "str": "您未选择邮件。", "mark": true, "eleZindex": 20002, "markZindex": 20001 });
                } else if ($scope.EDMnode.emailType == '2' && $scope.EDMnode.customerEamilDataSelected.status == 500) {
                    $(this).Alert({ "title": "提示", "str": "您选择邮件已被删除，请重新选择。", "mark": true, "eleZindex": 20002, "markZindex": 20001 });
                } else {
                    $http.get(GLOBAL_STATIC.nodeRoot + 'node/dclonedm/checkemail?gatewayid=' + $scope.CurEDMGateway.gatewayId + '&email=' + $scope.EDMnode.senderEmail + '').success(function (data) {
                        if (data.flag == false) {
                            $(this).Confirm({ "title": "提示", "str": "你现在使用的是个人邮箱发送邮件，邮件发送成功率无法保障，建议使用企业邮箱发送。", "mark": true },
                                function () {
                                    dclonService.edm.saveEDMnode(function () {
                                        $(this).yAlert({ "text": "保存成功" });
                                        $("#nodeContent").hide();
                                        removeAlert();
                                        $scope.editNodeName($scope.EDMnode.id, $scope.EDMnode.name, $scope.nodecomment)
                                    }, subInfo);
                                });
                        } else {
                            dclonService.edm.saveEDMnode(function () {
                                $("#nodeContent").hide();
                                $(".yunat_maskLayer").remove();
                                $(this).yAlert({ "text": "保存成功" });
                                removeAlert();
                                $scope.editNodeName($scope.EDMnode.id, $scope.EDMnode.name, $scope.nodecomment)
                            }, subInfo);
                        }
                    });
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
                "upCompile": function (curScope) {
                    $compile(angular.element(".dataInfoList"))($scope || curScope);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                },
                "compileTpl": function (b) {
                    $compile(angular.element(".uploadResult"))($scope || b); //编译类为marketingList元素及子元素
                },
                "itemdown": function (jobId) {
                    dclonService.edm.getEdmDownLoad(function (response) { }, graph.campId, graph.nodeId, jobId)
                }

            }
            //获取响应报告
            $scope.getReports = function () {
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
                dclonService.edm.senderEdmSummary(function (response) {
                    $scope.submitNumTotal = response.submitNumTotal;
                    $scope.receiveNumTotal = response.receiveNumTotal;
                    $scope.successNumTotal = response.successNumTotal;
                    $scope.errorNumTotal = response.errorNumTotal;
                    $scope.bounceNumTotal = response.bounceNumTotal;
                    $scope.openNumTotal = response.openNumTotal;
                    $scope.clickNumTotal = response.clickNumTotal;
                });

                $('.dataInfoGrid').flexigrid({
                    url: GLOBAL_STATIC.nodeRoot + 'report/sender/dclonedm/list?campId=' + graph.campId + '&nodeId=' + graph.nodeId,
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
                            renderer: function (v) {
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
                            renderer: function (v) {
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
                            renderer: function (v) {
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
                            convert: function (v, mappVal) {
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
                            renderer: function (v) {
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
                    onSuccess: function () {
                        var scope = angular.element('.dataInfoList').scope();
                        scope.gridObj.upCompile(scope);

                    },
                    onError: function (response) {
                        var responseText = response.responseText;
                        var data = $.parseJSON(responseText);
                        $(this).Alert({
                            "title": httpTitle || "提示",
                            "str": data.message,
                            "mark": true
                        });
                    }
                });
                $('.discountEcDataView .areaScreen').click(function () {
                    var currentClass = $(this).attr('class');
                    setTimeout(function () {
                        if (currentClass === 'fullScreen') {
                            return false;
                        }
                        var maxHeight = $(window).height();
                        var flexiWidth = $('.dataInfoList').width();
                        $('.dataInfoList').height('auto');
                        $('.dataInfoList .bDiv ').height(maxHeight - 206);
                        $('.dataInfoList .flexigrid tr div').width((flexiWidth - 105) / 13);
                    }, 0)
                });
                $(".discountEcDataView .fullScreen").die().live("click", function () {
                    $('.dataInfoList').height(300);
                    $('.dataInfoList .bDiv ').height(231);
                });
                $(".discountEcDataView .close").die().live("click", function () {
                    $(this).siblings('.fullScreen').attr("class", "areaScreen");
                });

            }

            $scope.openNodePop();
            kindEditor = kindEditorObj.creatEditor("#textEditor");
            $('.ke-toolbar').css('padding', '0 5px');
            $('.ke-toolbar').css('border-bottom', 'none');
            $('.ke-statusbar').height(0);
            $('.ke-statusbar').css('border-top', 'none');
            $scope.initEditor();

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
                            $scope.$apply(function () {
                                $scope.EDMnode.shopId = curId;
                                $scope.EDMnode.shopName = shopName;
                                $scope.EDMnode.categoryId = "";
                                $scope.EDMnode.categoryName = "";
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

            $scope.EDMnode.getShops = function () {
                getListService.getShopsByPlatformId(function (data) {
                    $scope.EDMnode.common(data, $('[name="EDMnodeShop"]'));
                }, $rootScope.taobaoSegmentationId);
            };

            $scope.EDMnode.getShopsFirstList = function () {
                getListService.getShopsByPlatformId(function (data) {
                    if (data) {
                        $scope.EDMnode.shopName = data[0].name;
                        $scope.EDMnode.shopId = data[0].idInPlat;
                        $scope.EDMnode.categoryId = "";
                        $scope.EDMnode.categoryName = "";
                        $('[name="EDMnodeShop"]').val($scope.shopName);
                        $('[name="EDMnodeShop"]').attr("valueId", $scope.shopId);
                    }
                }, $rootScope.taobaoSegmentationId);
            }

            $scope.EDMnode.selectEmail = function () {
                if ($scope.isEditorFlag) {
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

            $scope.EDMnode.showEmailPop = function () {
                $(".customer-email-wrap").addInteractivePop({ magTitle: "邮件选择", width: 910, heigth: 500, mark: false, position: "fixed", childElePop: true });
            }

            $scope.EDMnode.pager = {
                currentPageInput: 1,
                currentPage: 1,
                pageSize: "10",
                totalPages: 1
            };

            $scope.EDMnode.getEmailsData = function (issearch, pageSizeIsChange) {
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
                    shopId: 0,
                    mediaName: that.productName,
                    categoryId: that.categoryId
                };

                if (issearch) {
                    params.size = 10;
                    params.page = 1;
                }

                dclonService.edm.getAllEmails(function (response) {
                    if (response.data) {
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
            $scope.EDMnode.getCategory = function () {
                dclonService.edm.getAllCategory(function (response) {
                    var data = response.data;
                    $scope.EDMnode.commonTree(data, $('[name="EDMCategory"]'));
                }, $scope.EDMnode.shopId);
            };

            $scope.EDMnode.commonTree = function (data, ele) {
                var $selContent = ele.siblings(".selectContent");
                $selContent.children().remove();
                var $ul = $("<ul>", { "class": "ztree" });
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

            $scope.EDMnode.setPage = function (page) {
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

            $scope.EDMnode.noPrevious = function () {
                return this.pager.currentPage == 1;
            };

            $scope.EDMnode.noNext = function () {
                return this.pager.currentPage === this.pager.totalPages;
            }

            $scope.EDMnode.addEmail = function () {
                $('.dataInfoList input[type="radio"]').each(function (key) {
                    if ($(this).is(":checked")) {
                        $scope.EDMnode.customerEamilDataSelected = $scope.EDMnode.customerEmailData[key]
                        $scope.EDMnode.customerEamilDataSelected.status = 200;
                        $scope.EDMnode.customerEamilDataSelected.errorMsg = "";
                    }
                });
                $(".customer-email-wrap").hide();
                $(".childElementMark").remove();
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
                "keydown": function (e) {
                    if (e.keyCode === 13) {
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
            $scope.$watch('EDMnode.productName', function (n, v) {
                if (!n || n == v) {
                    return;
                }

                if (/[^\u4e00-\u9fa5a-zA-Z0-9\s_]/g.test(n)) {
                    $scope.EDMnode.productName = $scope.EDMnode.productName.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s_]/g, '');
                }
            });

            // 跳转到内容管理
            $scope.EDMnode.goContentManage = function () {
                var contentManage = '';
                angular.forEach($rootScope.user.nav, function (v, k) {
                    if (v.name === '内容管理') {
                        contentManage = v.url;  //可能的值insert({context: 'contentManage'})
                    }
                });
                if (!contentManage) {
                    $(this).Alert({ "title": "提示", "str": "您没有内容管理权限", "mark": true, "eleZindex": 20002, "markZindex": 20001 });
                } else {
                    $('.yunat_maskLayer').remove();  //先移除遮罩层
                    location.href = location.pathname + "#/insert/contentManage";
                }
            }
        }
    ]);
})(window, angular, undefined);
