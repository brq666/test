/*
/*
 * GET dashboard listing.
 */
var url = require('url');//获取url模块

module.exports = {
    "module": function (req, res) {//页面侧栏 数据通过：id判断
        var navFlag = /\/module\/qiushi\/(.*)/ig.exec(req.url)[1];
        var responseData;
       // res.statusCode =401;
        switch (navFlag) {
            case "orderCenter" :
                responseData = {"name": "", "key": "coupon", "id": 8, "children": [
                    {"name": "订单监控", "key": "fullshop", "id": 28, "children": [], "tip": null, "dataUrl": null, "url": "#/view/orderMonitor", "supportOps": "CDWRV"},
                    {"name": "订单催付", "key": "order", "id": 28, "children": [
                        {"name": "自动催付", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/urpay?type=1", "supportOps": "CDWRV"},
                        {"name": "预关闭催付", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/urpay?type=2", "supportOps": "CDWRV"},
                        {"name": "聚划算催付", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/urpay?type=3", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0);", "supportOps": "CDWRV"},
                    {"name": "订单关怀", "key": "fullshop", "id": 28, "children": [
                        {"name": "下单关怀", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/care?type=6", "supportOps": "CDWRV"},
                        {"name": "发货关怀", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/care?type=7", "supportOps": "CDWRV"},
                        {"name": "同城关怀", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/care?type=8", "supportOps": "CDWRV"},
                        {"name": "派件关怀", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/care?type=9", "supportOps": "CDWRV"},
                        {"name": "签收关怀", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/care?type=10", "supportOps": "CDWRV"}
                        ,
                        {"name": "退款关怀", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/care?type=11", "supportOps": "CDWRV"},
                        {"name": "确认收获关怀", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/care?type=12", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0);", "supportOps": "CDWRV"},
                    {"name": "发送记录", "key": "fullshop", "id": 28, "children": [], "tip": null, "dataUrl": null, "url": "#/view/urpayLog", "supportOps": "CDWRV"},
                    {"name": "异常告警", "key": "fullshop", "id": 28, "children": [
                        {"name": "中差评告警", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/alarm?type=1", "supportOps": "CDWRV"},
                        {"name": "退款告警", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/alarm?type=2", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0);", "supportOps": "CDWRV"}
                ], "tip": null, "dataUrl": null, "url": null, "supportOps": "CDWRV"};
                break;//下单中心
            case "serverCenter" :
                responseData = {"name": "", "key": "coupon", "id": 8, "children": [
                    {"name": "事务跟进", "key": "order", "id": 28, "children": [
                        {"name": "未付款跟进", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/unpayment", "supportOps": "CDWRV"},
                        {"name": "发货跟进", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/sendGoods", "supportOps": "CDWRV"},
                        {"name": "评价跟进", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/evaluate", "supportOps": "CDWRV"},
                        {"name": "物流跟进", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/logistics", "supportOps": "CDWRV"},
                        {"name": "退款跟进", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/refund", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0);", "supportOps": "CDWRV"}
                ], "tip": null, "dataUrl": null, "url": null, "supportOps": "CDWRV"};
                break;//客服中心
            case "marketing" :
                responseData = [
                  {"name": "客户分组", "key": "campaign", "id": 28, "children": [], "tip": null, "dataUrl": null, "state": "campaign.customerSegmentation", "supportOps": "CDWRV"},
                  //{"name": "客户分组", "key": "campaign", "id": 28, "children": [], "tip": null, "dataUrl": null, "state": "campagin.customerGroup", "supportOps": "CDWRV"},
                  {"name": "营销活动", "key": "campaign", "id": 28, "children": [], "tip": null, "dataUrl": null, "state": "campaign.marketActivity", "supportOps": "CDWRV"},
                  {"_id":23,"key":"marketing/campaignTemplate","level":2,"tip":"","name":"活动模板","__v":0,"supportOps":["VIEW"],"state":"campaign.ActiveTemplate.localTemplate", "children":[],"type":"PageModule"},
                  {"name": "外层嵌入页面", "key": "campaign/wrap", "state": "campaign.iframe({moduleUrl: 'wrap'})","children":[],"dataUrl":"http://www.qq.com/"}
                ]
                break;//营销活动
            case "benefitManage" :
                responseData = [{"name": "权益管理", "key": "benefitManage", "id": 28, "state": "javascript:void(0)", "children": [
                    {"name": "发送式优惠劵", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "state": "benefitManage.coupon", "supportOps": "CDWRV"},
                    {"name": "商品优惠", "key": "", "id": 29, "children": [], "tip": null, "dataUrl": null, "state": "benefitManage.umpDiscount", "supportOps": "CDWRV"},
                    {"name": "订单优惠", "key": "", "id": 31, "children": [], "tip": null, "dataUrl": null, "state": "benefitManage.umpOrder", "supportOps": "CDWRV"},
                    {"name": "包邮卡", "key": "", "id": 31, "children": [], "tip": null, "dataUrl": null, "state": "benefitManage.umpPostage", "supportOps": "CDWRV"},
                    {"name": "淘宝权益", "key": "", "id": 36, "children": [], "tip": null, "dataUrl": null, "state": "benefitManage.benefit", "supportOps": "CDWRV"}
                ], "tip": null, "supportOps": "CDWRV"}]
                break;//权益管理
            case "coupon" :
                responseData = {"name": "", "key": "coupon", "id": 8, "children": [
                    {"name": "优惠券", "key": "tickets", "id": 28, "children": [], "tip": null, "dataUrl": null, "url": "#/coupon/tickets", "supportOps": "CDWRV"}
                ], "tip": null, "dataUrl": null, "url": null, "supportOps": "CDWRV"};
                break;//促销管理
            case "personalized" :
                responseData = {"name": "", "key": "marketing", "id": 8, "children": [
                    {"name": "个性化包裹", "key": "tickets", "id": 28, "children": [
                        {"name": "方案部署", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/bushu", "supportOps": "CDWRV"},
                        {"name": "方案配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/peizhi/", "supportOps": "CDWRV"},
                        {"name": "运行监控", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/jiankong", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0)", "supportOps": "CDWRV"}
                ], "tip": null, "dataUrl": null, "url": null, "supportOps": "CDWRV"};
                break;//个性化营销
            case "customer" :
                responseData = {"name": "", "key": "marketing", "id": 8, "children": [
                    {"name": "手机黑名单", "key": "campaign", "id": 28, "children": [], "tip": null, "dataUrl": null, "url": "#/view/blacklist", "supportOps": "CDWRV"}
                ], "tip": null, "dataUrl": null, "url": null, "supportOps": "CDWRV"};
                break;//客户管理
            case "dataManagement":
            case "data":
                responseData = [
                  {"_id":27,"key":"dataManagement/orderInfo","level":2,"tip":"","state":"dataManagement.orderInfo","name":"订单信息","__v":0,"supportOps":["VIEW"],"children":[{"_id":37,"key"
            :"dataManagement/history","level":3,"tip":"","state":"dataManagement.orderInfo.history","name":"历史数据导入","__v":0
              ,"supportOps":["VIEW"],"children":[],"type":"PageModule"}],"type":"PageModule"},
                        {"name": "客户数据", "key": "customerData", "id": 101,"state": "dataManagement.rfmTarget","children": [
                            {"name": "RFM指标", "state": "dataManagement.rfmTarget"},
                            {"name": "自定义属性", "state": "dataManagement.customAttribute"},
                            {"name": "客户数据导入", "state": "dataManagement.customDataImport"},
                            {"name": "客户基本信息", "state": "dataManagement.customerList"},
                            {"name": "客户详细信息", "state": "dataManagement.customerInfoTable"},
                            {"name": "嵌入页面", "state": "dataManagement.iframe","dataUrl":"http://www.hao123.com/"}
                        ]},
                        {"name": "红名单管理", "key": "", "id": 102, "children": [
                            {"name": "客户红名单", "state": "dataManagement.redList"}
                        ]},
                        {"name": "黑名单管理", "key": "", "id": 102, "children": [
                            {"name": "客户黑名单", "state": "dataManagement.blacklist.customBlackList"},
                            {"name": "手机黑名单", "state": "dataManagement.blacklist.phoneBlackList"},
                            {"name": "邮件黑名单", "state": "dataManagement.blacklist.mailBlackList"}
                        ]},
                        {"name": "客服工作台数据", "key": "", "id": 103, "state": "dataManagement.customerServiceWorkbench","children":[]},
                        {"name": "外层嵌入页面", "state": "dataManagement.iframe","children":[],"dataUrl":"http://www.qwqw.com/"},
                        {"name": "商品标签", "key": "", "id": 103, "state": "dataManagement.productLabel","children":[]},
                        {"name": "微信用户信息", "key": "", "id": 104, "state": "dataManagement.wechat","children":[]},
                        {"name": "微信公众号管理", "key": "", "id": 105, "state": "dataManagement.wechatManagement","children":[]},
                        {"name": "外层嵌入页面", "key": "dataManagement/wrap", "state": "dataManagement.iframe({moduleUrl: 'wrap'})","children":[],"dataUrl":"http://www.qq.com/"}
                    ];
                break;//数据管理
            case "sys" :
                responseData = [
                    {"name": "账号管理", "key": "systemAccount", "id": 28, "children": [
                        {"name": "系统账号", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "state": "systemManage.systemAccount.list", "supportOps": "CDWRV"},
                        {"name": "旺旺账号", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "state": "systemManage.subAccount.list", "supportOps": "CDWRV"},
                        {"name": "外层嵌入页面2", "key": "systemManage/baidu", "state": "systemManage.iframe({moduleUrl: 'baidu'})","children":[],"dataUrl":"http://www.baidu.com/"}
                    ], "tip": null, "dataUrl": null, "supportOps": "CDWRV"},
                    {"name": "部门管理", "key": "tickets", "id": 28, "tip": null,"children":[], "dataUrl": null, "state": "systemManage.departmentManagement", "supportOps": "CDWRV"},
                    {"name": "角色管理", "key": "tickets", "id": 28, "tip": null, "children":[],"dataUrl": null, "state": "systemManage.roleManagement", "supportOps": "CDWRV"},
                    {"name": "外层嵌入页面", "key": "systemManage/wrap", "state": "systemManage.iframe({moduleUrl: 'wrap'})","children":[],"dataUrl":"http://www.qq.com/"}
                ];
                break;//系统管理
			case "configuration" :
                responseData = {"name": "", "key": "systemManage", "id": 9, "children": [
                    {"name": "数据配置NEW", "key": "systemAccount", "id": 28, "children": [
                        {"name": "源数据配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/sourceData", "supportOps": "CDWRV"},
                        {"name": "表配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/tables", "supportOps": "CDWRV"},
                        {"name": "字段配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/field", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0)", "supportOps": "CDWRV"},
					{"name": "模型配置", "key": "systemAccount", "id": 28, "children": [
                        {"name": "分组元模型", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/segmentation", "supportOps": "CDWRV"},
						{"name": "属性集配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/attributeCollection", "supportOps": "CDWRV"},
						{"name": "函数配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/function", "supportOps": "CDWRV"},
						{"name": "主题配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/subject", "supportOps": "CDWRV"},
						{"name": "过滤器配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/filter", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0)", "supportOps": "CDWRV"},
					{"name": "业务配置", "key": "systemAccount", "id": 28, "children": [
                        {"name": "查询节点配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/metaConfig/node/find", "supportOps": "CDWRV"},
                        {"name": "会员等级设置配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/businessConfiguration/memberGradeSettings", "supportOps": "CDWRV"},
                        {"name": "客户自定义属性配置", "key": "customerManage/blacklistManage/smsBlacklist", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/businessConfiguration/customerAttributesSettings", "supportOps": "CDWRV"},
                        {"name": "黑红名单节点配置", "key": "", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "#/view/businessConfiguration/blackAndRedMetaConfig", "supportOps": "CDWRV"},
                        {"name": "优惠券节点配置", "key": "", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "", "supportOps": "CDWRV"},
                        {"name": "定向优惠券节点配置", "key": "", "id": 29, "children": [], "tip": null, "dataUrl": null, "url": "", "supportOps": "CDWRV"},
						{"name": "名单匹配节点配置", "key": "", "id": 30, "children": [], "tip": null, "dataUrl": null, "url": "#/view/businessConfiguration/rollmatchSettings", "supportOps": "CDWRV"},
						{"name": "立即营销节点配置", "key": "", "id": 31, "children": [], "tip": null, "dataUrl": null, "url": "#/view/businessConfiguration/marketingondemandSettings", "supportOps": "CDWRV"},
						{"name": "客服工作台配置", "key": "", "id": 32, "children": [], "tip": null, "dataUrl": null, "url": "#/view/businessConfiguration/workbenchSettings", "supportOps": "CDWRV"}
                    ], "tip": null, "dataUrl": null, "url": "javascript:void(0)", "supportOps": "CDWRV"},
					{"name": "外层嵌入页面", "url": "#/view/iframe/index","children":[],"dataUrl":"http://www.qwqw.com/"}
                ], "tip": null, "dataUrl": null, "url": null, "supportOps": "CDWRV"};
                break;//通用化配置
			case "phone":
				 responseData = {"name": "RFM", "key": "dataManage", "id": 10,"url": "javascript:void(0)",
                    "children": [
                        {"name": "嵌入一", "key": "customerData", "id": 101, "children": [
                            {"name": "电话模块嵌入", "url": "#/phone","dataUrl":"http://www.taobao.com/"},
							{"name": "店铺模块嵌入", "url": "#/shop","dataUrl":"http://www.hao123.com/"},
                            {"name": "自定义属性", "url": "modules/dataManagement/index.html#/view/customAttribute"}
                        ]}
                    ]};
                break;//嵌入页面
            case "microMarketing":
                responseData={"name": "RFM", "key": "dataManage", "id": 10,"url": "javascript:void(0)",
                "children":[
                 {"name": "选择店铺", "key": "customerData", "id": 101, "children": []}
                ], "tip": null, "dataUrl": null, "url": null, "supportOps": "CDWRV"
                };
                break;
        }
        ;
        res.send(responseData);
    }
};


