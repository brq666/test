// 活动报告控制器
// 活动报告控制器
angular.module("campaign.controllers").controller('viewReportCtr', ['$http', '$scope', '$compile', 'reportService', '$sce',
    function($http, $scope, $compile, reportService, $sce) {
        $scope.serviceReportUrl = CAMPAIGN_STATIC.tplBasePath + "view/viewSenderReport.html";
        $scope.serviceReportUrls = [ CAMPAIGN_STATIC.tplBasePath + "view/viewSenderReport.html",  CAMPAIGN_STATIC.tplBasePath + "view/viewResponseReport.html",  CAMPAIGN_STATIC.tplBasePath + "view/viewResultTrackingReport.html"];
        $scope.reportSwitch = 0;

        $scope.reportObj = {
            "showCurrentReportPage": function(switchNo) {
                $scope.reportSwitch = switchNo;
                $scope.serviceReportUrl = $scope.serviceReportUrls[switchNo];
            }
        };

        $scope.reportViewBack = function() {
            angular.element(".maincontainer").css("z-index", "inherit");
            angular.element("#reportMask").css("display", "none");
            $(".toolbar").show();
        }
    }
]);

angular.module("campaign.controllers").controller('viewBIReportCtr', ['$http', '$scope', '$compile', 'reportService', '$sce',
    function($http, $scope, $compile, reportService, $sce) {
        $scope.reportViewBack = function() {
            angular.element(".maincontainer").css("z-index", "inherit");
            angular.element("#reportMask").css("display", "none");
            $(".toolbar").show();
        }

        var data = "width=" + angular.element('#viewReportContent iframe').width()
                    + '&height=' + angular.element('#viewReportContent iframe').height() 
                    + '&camp_id=' + graph.campId;   

        reportService.getBIReport(data, function(data) {
            $scope.biReportUrl = data.content ? $sce.trustAsResourceUrl(data.content) : '';
        })
    }
]);


// 效果跟踪
angular.module("campaign.controllers").controller('trackingReport', ['$http', '$scope', '$compile', 'reportService', 'getListService',
    function($http, $scope, $compile, reportService, getListService) {
        $scope.hideDateLoading = true;
        $scope.typeOfSends = [{
            "key": -9999,
            "name": "不限"
        }, {
            "key": "发送组",
            "name": "发送组"
        }, {
            "key": "控制组",
            "name": "控制组"
        }];
        $scope.typeOfSend = {};
        $scope.typeOfSend.key = "发送组";
        $scope.selectPeriods = [];
        $scope.resultsType = 0;
        $scope.getPeriods = function() {
            var callback = function(data) {
                $scope.selectPeriods = data.jobList;
                $scope.selectPeriods.forEach(function(item) {
                    item.starttime = setISO(item.starttime, "all");
                    item.plantime = setISO(item.plantime, "all")
                });
                $scope.selectPeriodSelectedJobId = $scope.selectPeriods[0].jobId;
                $scope.getShops();
            }
            reportService.getCampJobs(callback, $scope.getPeriods);
        }
        $scope.getShops = function() {
            var callback = function(data) {
                $scope.shops = data;
                $scope.shop = $scope.shops[0];
                $scope.getEvaluateTotal();
                //$scope.shop.id= $scope.shops[0].id;
            }
            getListService.getShops(callback, $scope.getShops);
        }
        $scope.getCustomerGroups = function() {
            var callback = function(data) {
                $scope.customerGroups = data;
                var buxian = {
                    "customerGropNodeId": -9999,
                    "customerGropNodeName": "不限"
                }
                $scope.customerGroups.unshift(buxian);
                $scope.customerGroup = {};
                $scope.customerGroup.customerGropNodeId = -9999;
            }
            reportService.getCustomerGroups(callback, $scope.getCustomerGroups)
        }
        $scope.getChannelNodes = function() {
            var callback = function(data) {
                $scope.channelNodes = data;
                var buxian = {
                    "channelNodeId": -9999,
                    "channelNodeName": "不限"
                }
                $scope.channelNodes.unshift(buxian);
                $scope.channelNode = {};
                $scope.channelNode.channelNodeId = -9999;
            }
            reportService.getChannelNodes(callback, $scope.getChannelNodes)
        }

        $scope.getEvaluateTotal = function(type) {
            $scope.hideDateLoading = false;
            $(".multiTitleTable").hide();
            var callback = function(data) {
                $scope.hideDateLoading = true;
                $scope.resultsDatas = data;
                $(".multiTitleTable").show();
            }

            var controlGroupType, customerGroupNodeId, channelNodeId;
            if ($scope.typeOfSend.key == -9999) {
                controlGroupType = "";
            } else {
                controlGroupType = $scope.typeOfSend.key;
            }
            if ($scope.customerGroup.customerGropNodeId == -9999) {
                customerGroupNodeId = "";
            } else {
                customerGroupNodeId = $scope.customerGroup.customerGropNodeId
            }
            if ($scope.channelNode.channelNodeId == -9999) {
                channelNodeId = "";
            } else {
                channelNodeId = $scope.channelNode.channelNodeId
            }
            var getAttributes = {
                "campaignId": graph.campId,
                "jobId": $scope.selectPeriodSelectedJobId,
                "shopId": $scope.shop.idInPlat,
                "customerGroupNodeId": customerGroupNodeId,
                "channelNodeId": channelNodeId,
                "controlGroupType": controlGroupType
            }
            if ((type == 0 || $scope.resultsType == 0) && type != 1) {
                reportService.evaluateTotal(callback, getAttributes);
            } else {
                reportService.evaluateDay(callback, getAttributes);
            }
        }
        $scope.getPeriods();
        $scope.getCustomerGroups();
        $scope.getChannelNodes();
    }
]);

// add by tao.yang 2014-03-20  Modify by Eric
//写死的渠道＝＝＝》获取的渠道
angular.module("campaign.controllers").controller('senderReportCtrl', ['$scope', 'reportService', '$http',
    function($scope, reportService, $http) {
        $scope.channelReportAccessSuffixUrls = ["sms", "edm", "coupon", "ump", "benefit"];
        $scope.getchannelNode = function() {
            $http.get(GLOBAL_STATIC.campaignRoot + "workflow/" + graph.workflowId + "/channelnode/").success(function(response) {
                $scope.channelNodes = response.channels;
                $scope.channelSwitch = $scope.channelNodes[0].number;
                $scope.channelReportAccessSuffixUrl = $scope.channelReportAccessSuffixUrls[$scope.channelSwitch];
                $scope.colModelValue = $scope.colModels[$scope.channelSwitch];
                $scope.flexigridFun($scope.channelReportAccessSuffixUrl, $scope.colModelValue);
            })
        }
        $scope.getchannelNode();

        // 默认短信
        //$scope.channelReportAccessSuffixUrl = "sms";
        $scope.colModels = [
            [ // 短信
                {
                    display: '执行类型',
                    name: 'testExecute',
                    width: 2,
                    sortable: false,
                    dataindex: 'testExecute',
                    renderer: function(v) {
                        if (!v) {
                            return "正式执行"
                        }
                        return "测试执行"
                    }
                }, {
                    display: '节点ID',
                    name: 'nodeId',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeId'
                }, {
                    display: '节点名称',
                    name: 'nodeName',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeName'
                }, {
                    display: '通道名称',
                    name: 'gatewayName',
                    width: 2,
                    sortable: false,
                    dataindex: 'gatewayName'
                }, {
                    display: '客户提交时间',
                    name: 'submitTime',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitTime',
                    renderer: function(v) {
                        return setISO(v, "all")
                    }
                }, {
                    display: '客户提交数',
                    name: 'submitNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitNum'
                }, {
                    display: '通道接收时间',
                    name: 'receiveTime',
                    width: 2,
                    sortable: false,
                    dataindex: 'receiveTime',
                    renderer: function(v) {
                        if (!v || v == null) {
                            return ""
                        } else {
                            return setISO(v, "all")
                        }
                    }
                }, {
                    display: '通道接收数',
                    name: 'receiveNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'receiveNum'
                }, {
                    display: '最后更新时间',
                    name: 'updated',
                    width: 2,
                    sortable: false,
                    dataindex: 'updated',
                    renderer: function(v) {
                        if (!v || v == null) {
                            return ""
                        } else {
                            return setISO(v, "all")
                        }
                    }
                }, {
                    display: '短信回复',
                    name: 'replyMoNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'replyMoNum'
                }, {
                    display: '短信回复数据',
                    name: 'enable',
                    width: 1,
                    align: 'center',
                    dataindex: 'enabled',
                    mapping: ['jobId', 'replyMoNum', 'nodeId'],
                    convert: function(v, mappVal) {
                        if (mappVal[1] == 0) {
                            return "暂无数据";
                        } else {
                            var href = GLOBAL_STATIC.nodeRoot + 'report/sender/sms/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + mappVal[2];
                            return '<a title="下载"  ng-href="' + href + '" href="' + href + '">下载</a>';
                        }
                    }
                }
            ],
            [ // EDM
                {
                    display: '执行类型',
                    name: 'testExecute',
                    width: 2,
                    sortable: false,
                    dataindex: 'testExecute',
                    renderer: function(v) {
                        if (!v) {
                            return "正式执行"
                        }
                        return "测试执行"
                    }
                }, {
                    display: '节点ID',
                    name: 'nodeId',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeId'
                }, {
                    display: '节点名称',
                    name: 'nodeName',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeName'
                }, {
                    display: '通道名称',
                    name: 'gatewayName',
                    width: 2,
                    sortable: false,
                    dataindex: 'gatewayName'
                }, {
                    display: '客户提交时间',
                    name: 'submitTime',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitTime',
                    renderer: function(v) {
                        return setISO(v, "all")
                    }
                }, {
                    display: '客户提交数',
                    name: 'submitNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitNum'
                }, {
                    display: '通道接收时间',
                    name: 'receiveTime',
                    width: 2,
                    sortable: false,
                    dataindex: 'receiveTime',
                    renderer: function(v) {
                        if (!v || v == null) {
                            return ""
                        } else {
                            return setISO(v, "all")
                        }

                    }
                }, {
                    display: '通道接收数',
                    name: 'receiveNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'receiveNum'
                }, {
                    display: '发送成功数',
                    name: 'successNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'successNum'
                }, {
                    display: '邮件退回数',
                    name: 'bounceNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'bounceNum'
                }, {
                    display: '邮件地址错误数',
                    name: 'errorNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'errorNum'
                }, {
                    display: '最后更新时间',
                    name: 'updated',
                    width: 2,
                    sortable: false,
                    dataindex: 'updated',
                    renderer: function(v) {
                        if (!v || v == null) {
                            return ""
                        } else {
                            return setISO(v, "all")
                        }
                    }
                }, {
                    display: '点击',
                    name: 'enable',
                    width: 1,
                    align: 'center',
                    dataindex: 'enabled',
                    mapping: ['clickNum', 'jobId', 'nodeId'],
                    convert: function(v, mappVal) {
                        if (mappVal[0] == 0) {
                            return "暂无数据";
                        } else {
                            var href = GLOBAL_STATIC.nodeRoot + 'report/sender/edm/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[1] + '&nodeId=' + mappVal[2];
                            return '<a title="下载"  ng-href="' + href + '" href="' + href + '">下载</a>';

                        }
                    }
                }
            ],
            [ // Coupon
                {
                    display: '执行类型',
                    name: 'testExecute',
                    width: 2,
                    sortable: false,
                    dataindex: 'testExecute',
                    renderer: function(v) {
                        if (!v) {
                            return "正式执行"
                        }
                        return "测试执行"
                    }
                }, {
                    display: '节点ID',
                    name: 'nodeId',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeId'
                }, {
                    display: '节点名称',
                    name: 'nodeName',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeName'
                }, {
                    display: '优惠券ID',
                    name: 'couponId',
                    width: 2,
                    sortable: false,
                    dataindex: 'couponId'
                }, {
                    display: '客户提交时间',
                    name: 'submitTime',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitTime',
                    renderer: function(v) {
                        return setISO(v, "all")
                    }
                }, {
                    display: '客户提交数',
                    name: 'submitNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitNum'
                }, {
                    display: '发送成功数',
                    name: 'successNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'successNum'
                }, {
                    display: '发送失败数',
                    name: 'failNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'failNum'
                }, {
                    display: '状态未知数',
                    name: 'unknownNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'unknownNum'
                }, {
                    display: '最后更新时间',
                    name: 'updated',
                    width: 2,
                    sortable: false,
                    dataindex: 'updated',
                    renderer: function(v) {
                        if (!v || v == null) {
                            return ""
                        } else {
                            return setISO(v, "all")
                        }
                    }
                }, {
                    display: '导出明细',
                    name: 'enable',
                    width: 1,
                    align: 'center',
                    dataindex: 'enabled',
                    mapping: ['jobId', 'nodeId'],
                    convert: function(v, mappVal) {

                        var href = GLOBAL_STATIC.nodeRoot + 'report/sender/coupon/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + mappVal[1];
                        return '<a title="下载"  ng-href="' + href + '" href="' + href + '">下载</a>';

                    }
                }
            ],
            [ // UMP
                {
                    display: '执行类型',
                    name: 'testExecute',
                    width: 2,
                    sortable: false,
                    dataindex: 'testExecute',
                    renderer: function(v) {
                        if (!v) {
                            return "正式执行"
                        }
                        return "测试执行"
                    }
                }, {
                    display: '节点ID',
                    name: 'nodeId',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeId'
                }, {
                    display: '节点名称',
                    name: 'nodeName',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeName'
                }, {
                    display: '定向优惠名称',
                    name: 'umpName',
                    width: 2,
                    sortable: false,
                    dataindex: 'umpName'
                }, {
                    display: '客户提交时间',
                    name: 'submitTime',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitTime',
                    renderer: function(v) {
                        return setISO(v, "all")
                    }
                }, {
                    display: '客户提交数',
                    name: 'submitNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitNum'
                }, {
                    display: '发送成功数',
                    name: 'successNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'successNum'
                }, {
                    display: '发送失败数',
                    name: 'failNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'failNum'
                }, {
                    display: '最后更新时间',
                    name: 'updated',
                    width: 2,
                    sortable: false,
                    dataindex: 'updated',
                    renderer: function(v) {
                        if (!v || v == null) {
                            return ""
                        } else {
                            return setISO(v, "all")
                        }
                    }
                }, {
                    display: '导出明细',
                    name: 'enable',
                    width: 1,
                    align: 'center',
                    dataindex: 'enabled',
                    mapping: ['jobId', 'nodeId'],
                    convert: function(v, mappVal) {
                        var href = GLOBAL_STATIC.nodeRoot + 'report/sender/ump/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + mappVal[1];
                        return '<a title="下载"  ng-href="' + href + '" href="' + href + '">下载</a>';
                    }
                }
            ],
            [ //benefit
                {
                    display: '执行类型',
                    name: 'testExecute',
                    width: 2,
                    sortable: false,
                    dataindex: 'testExecute',
                    renderer: function(v) {
                        if (!v) {
                            return "正式执行"
                        }
                        return "测试执行"
                    }
                }, {
                    display: '节点ID',
                    name: 'nodeId',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeId'
                }, {
                    display: '节点名称',
                    name: 'nodeName',
                    width: 2,
                    sortable: false,
                    dataindex: 'nodeName'
                }, {
                    display: '客户提交时间',
                    name: 'submitTime',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitTime',
                    renderer: function(v) {
                        return setISO(v, "all")
                    }
                }, {
                    display: '客户提交数',
                    name: 'submitNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'submitNum'
                }, {
                    display: '发送成功数',
                    name: 'successNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'successNum'
                }, {
                    display: '发送失败数',
                    name: 'failNum',
                    width: 2,
                    sortable: false,
                    dataindex: 'failNum'
                }, {
                    display: '最后更新时间',
                    name: 'updated',
                    width: 2,
                    sortable: false,
                    dataindex: 'updated',
                    renderer: function(v) {
                        if (!v || v == null) {
                            return ""
                        } else {
                            return setISO(v, "all")
                        }
                    }
                }, {
                    display: '导出明细',
                    name: 'enable',
                    width: 1,
                    align: 'center',
                    dataindex: 'enabled',
                    mapping: ['jobId', 'nodeId'],
                    convert: function(v, mappVal) {
                        var href = GLOBAL_STATIC.nodeRoot + 'report/sender/benefit/download/?campaignId=' + graph.campId + '&jobId=' + mappVal[0] + '&nodeId=' + mappVal[1];
                        return '<a title="下载"  ng-href="' + href + '" href="' + href + '">下载</a>';
                    }
                }
            ]
        ];
        //$scope.colModelValue = $scope.colModels[0];
        $scope.flexigridFun = function(suffix, colModelValue) {
            var $attributeGridElement = $("<div id='labelListsGrid'></div>");
            $(".couponListssBox").html("").append($attributeGridElement);
            $('#labelListsGrid').flexigrid({
                url: GLOBAL_STATIC.nodeRoot + 'report/sender/' + suffix + "/list/",
                method: 'GET',
                dataType: 'json',
                colModel: colModelValue,
                sortname: '',
                sortorder: "asc",
                updateDefaultParam: true,
                buttons: [],
                usepager: true,
                useRp: true,
                rp: 20,
                params: [{
                    "name": "campId",
                    "value": graph.campId
                }],
                showTableToggleBtn: true,
                colAutoWidth: true,
                onSuccess: function() {},
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
        };
        $scope.channelObject = {
            "showCurrentChannelPage": function(switchNo, $e) {
                angular.element("ul.selectChannel li").removeClass("selectedChannel");
                angular.element($e.target).addClass("selectedChannel");
                $scope.channelSwitch = switchNo;
                console.log(switchNo)
                $scope.channelReportAccessSuffixUrl = $scope.channelReportAccessSuffixUrls[switchNo];
                console.log($scope.channelReportAccessSuffixUrl)
                $scope.colModelValue = $scope.colModels[switchNo];

                $scope.flexigridFun($scope.channelReportAccessSuffixUrl, $scope.colModelValue);
                angular.element("#labelListsGrid")[0].grid.addParams("campId", graph.campId);
                angular.element("#labelListsGrid")[0].grid.populate();
            }
        };
    }
]);

// add by tao.yang  n-times edit by eric
angular.module("campaign.controllers").controller('responseReportCtrl', ['$scope', 'reportService',
    function($scope, reportService) {
        $scope.selectChange = function(jobId) {
            $scope.hideDateLoading = false;
            $(".viewTable").hide();
            reportService.getResponseReports(function(data) {
                $scope.hideDateLoading = true;
                $(".viewTable").show();
                $scope.responeReportList = data;
            }, jobId);
        };
        //默认为循环后第一个jobStatus>20的周期！。
        reportService.getCampJobs(function(response) {
            $scope.campJobList = response.jobList;
            $scope.campJobList.forEach(function(item) {
                item.plantime = setISO(item.plantime, "all")
            });
            for (var i = 0; i < $scope.campJobList.length; i++) {
                if ($scope.campJobList[i].jobStatus > 20) {
                    $scope.curcampJob = $scope.campJobList[i];
                    break;
                }
            }
            $scope.selectChange($scope.curcampJob.jobId);
        });

        $scope.updateResponseReport = function(curcampJob) {
            $scope.selectChange(curcampJob.jobId);
        };
        //返回状态大于20的波次（执行完成有相应报告）
        $scope.getOKStatus = function(e) {
            return e.jobStatus > 20;
        }
    }
]);
