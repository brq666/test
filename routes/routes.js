/**
 * Created with JetBrains WebStorm.
 * User: PEACH
 * Date: 05/12/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */


var isPeriodically = false;  // 周期性执行mock数据,默认关闭
var version = "v1";          // 版本号
var index = require("./index");
var login = require("./login/data");
var header = require("./header/data");
var leftmenu = require("./leftmenu/data");
var dashboard = require("./dashboard/data");
var dianpuzhenduan = require("./dianpuzhenduan/data");
var gexinghuayingxiao = require("./gexinghuayingxiao/data");
var dingdanzhongxin = require("./dingdanzhongxin/data");
var kefuzhongxin = require("./kefuzhongxin/data");
var cuxiaoguanli = require("./cuxiaoguanli/data");
var kehuguanli = require("./kehuguanli/data");
var zhudongyingxiao = require("./zhudongyingxiao/data");
var node = require("./zhudongyingxiao/node/data");
var xitongguanli = require("./xitongguanli/data");
var shujuguanli = require("./shujuguanli/data");
var metaConfiguration = require("./metaConfiguration/data");
var metaConfigNew = require("./metaConfigNew/data");
var shujuguanli = require("./shujuguanli/data");
var Selector = require("./Selector/data");
var customerGroup = require("./zhudongyingxiao/customerGroup/data");
var customerSegmentation = require("./zhudongyingxiao/customerSegmentation/data");
var microMarketing = require("./microMarketing/data");
var commSelector = require("./commselector/data");

var campaignRoot = "/campaign/" + version + "/web";
var commonComponentRoot = "/common-component/" + version;
var datamanageRoot = "/common-component/" + version + "/web";
var nodeRoot = "/node/" + version + "/web";

module.exports = function(app) {
  app.get("/module/sysMgrContent", xitongguanli.getSysMgrContent);
  /*localhost:3000 跳转 start*/
  app.get("/", index.index);
  /*localhost:3000 跳转 end*/

  /*登入页请求 start*/
  app.get("/web-portal/:tenantId/system", login.platform);
  app.post("/web-portal/credentials", login.login);
  app.get("/web-portal/credentials/:id", login.checkLogin);
  app.get("/web-portal/credentials", login.checkLogin);
  app.post("/web-portal/visits", login.visit);
  /*登入页请求 end*/

  /*共用header请求 start*/
  app.get("/web-system/" + version + "/sys/users/login", header.login);
  app.get("/web-system/" + version + "/sys/users/logout", header.logout);
  app.delete("/web-portal/loginOut", header.logout);
  app.get("/web-portal/qiushi6/visit", header.nav);
  app.get("/tenant/channel/recharge", header.recharge);
  app.get("/web-dashboard/" + version + "/system/contact/exists", header.contact);
  app.get("/dashboard/system/contact/exists", header.contact);
  app.post("/web-dashboard/" + version + "/dashboard/assemble/contact", header.contactSave)
  app.get("/web-dashboard/" + version + "/dashboard/assemble/contact/exists", header.contact);
  app.get("/dashboard/assemble/contact/exists", header.contact);
  app.get("/web-dashboard/" + version + "/notices/simple", header.noticesimple);
  app.get("/web-dashboard/" + version + "/crm/marketKpi", header.marketKpi);
  app.get("/web-dashboard/" + version + "/dashboard/channel/send", header.channelSend);
  app.get("/web-dashboard/" + version + "/dashboard/campaignkpi/summary", header.campaignkpi);
  app.get("/web-portal/notifications/:tenantId/0-PD/notices/status", header.noticesimple);
  app.get("/web-portal/notifications/:tenantId/0-PD/notices/status", header.noticesimple);
  app.get("/web-portal/notifications/:tenantId/0-PD/notices", header.notices);
  app.get("/web-portal/notification/notice", header.notices);
  app.post("/web-portal/notifications/:tenantId/0-PD/notices/:id", header.itemNotices);
  app.get(nodeRoot + "/node/edm/cb-service/messages/count/", header.number);  // 联合营销提示数字
  /*共用header请求 end*/

  /*侧栏共用请求 start*/
  app.get("/web-portal/module/:tenantId/:id", leftmenu.module);
  /*侧栏共用请求 end*/

  /*首页请求配置 start*/
  app.get("/web-portal/defaultModules", dashboard.defaultModules);
  app.get("/web-dashboard/" + version + "/dashboard/notices", dashboard.simpleView);
  app.get("/web-dashboard/" + version + "/dashboard/notices/page", dashboard.pagedView);
  app.get("/web-dashboard/" + version + "/dashboard/notices/notice/:id", dashboard.notice)
  app.get("/web-dashboard/" + version + "/dashboard/system/advert", dashboard.advert);
  app.get("/web-dashboard/" + version + "/dashboard/assemble/shopinfo", dashboard.shopinfo);
  app.get("/web-dashboard/" + version + "/dashboard/assemble/shopinfo", dashboard.shopinfo);
  app.get("/web-dashboard/" + version + "/dashboard/assemble/helpinfo", dashboard.helpinfo);
  app.get("/web-dashboard/" + version + "/dashboard/assemble/helplink", dashboard.helplink);
  app.get("/web-portal/assemble/nodejsurl", dashboard.nodejsurl);
  app.get("/web-dashboard/" + version + "/dashboard/sso/directive", dashboard.SSOlink);
  app.get(campaignRoot + "/campaign/status/statistics", dashboard.static);
  app.get("/web-dashboard/" + version + "/dashboard/channel/sendStatic", dashboard.sendStatic);
  app.get("/web-dashboard/" + version + "/dashboard/channel/balance", dashboard.balance);
  app.get("/web-dashboard/" + version + "/dashboard/channel/accountlink/", dashboard.accountLink);
  app.get("/web-dashboard/" + version + "/dashboard/channel/accountlink/", dashboard.accountLink);
  app.get("/web-dashboard/" + version + "/dashboard/crm/kpi", dashboard.saleskpi)
  app.delete("/web-dashboard/" + version + "/dashboard/notices/clear", dashboard.clearNotices)
  app.post("/web-dashboard/" + version + "/dashboard/notices/delete", dashboard.deleteNotices)
  app.get("/web-dashboard/" + version + "/dashboard/top/rank", dashboard.topRank)
  app.get("/web-dashboard/" + version + "/dashboard/crm/kpi/category/:id", dashboard.category)
  app.post("/web-dashboard/" + version + "/dashboard/crm/kpi/buyback_rate", dashboard.reBuy)
  app.post("/web-dashboard/" + version + "/dashboard/crm/kpi/sales_amount", dashboard.salesAmunt)

  app.get(commonComponentRoot + "/shop/selector/:id/tree", dashboard.tree);
  app.get(commonComponentRoot + "/shop/selector/:type/searchColumn", dashboard.searchColumn);
  app.get(commonComponentRoot + "/shop/selector/:type/choose/cloume", dashboard.cloume);
  app.get(commonComponentRoot + "/shop/selector/:type/choose", dashboard.choose);
  app.get(commonComponentRoot + "/shop/selector/:type/choose/:id", dashboard.chooseId);
  app.post(commonComponentRoot + "/shop/selector/:type/choose", dashboard.choseSave);

  app.get(commonComponentRoot + "/product/metas/:subjectId/:shopId/conditions/cfg", dashboard.searchColumn);
  app.get(commonComponentRoot + "/product/metas/:subjectId/view/cfg", dashboard.cloumePro);
  app.get(commonComponentRoot + "/product/selector/:subjectId/search/product", dashboard.choosePro);
  app.post(commonComponentRoot + "/product/selector/:subjectId/search/product", dashboard.choosePro);

  /*首页请求配置 end*/

  /*店铺诊断配置 start*/
  app.get("/ucenter/shop_diagnosis", dianpuzhenduan.shop_diagnosis)
  /*店铺诊断配置 end*/

  /*个性化包裹配置 start*/
  //方案部署
  app.get("/shop/taobao/list", gexinghuayingxiao.taobao);
  app.get("/rulecenter/planGroup/:id", gexinghuayingxiao.planGroup);
  app.put("/rulecenter/plan/:id", gexinghuayingxiao.planStatus);
  app.put("/rulecenter/planGroup/:id", gexinghuayingxiao.remark);
  app.get("/rulecenter/planGroup/:id/signContent", gexinghuayingxiao.signContent);
  //方案配置
  app.post("/rulecenter/plan/:id", gexinghuayingxiao.savePlan);
  app.get("/rulecenter/condition/type/list", gexinghuayingxiao.condition);
  app.get("/rulecenter/condition/type/:base/property/list", gexinghuayingxiao.property);
  app.get("/rulecenter/condition/property/:id", gexinghuayingxiao.cankaozhi);
  app.post("/rulecenter/shop/:shopId/products", gexinghuayingxiao.products);
  app.get("/rulecenter/shop/:shopId/products/:numiids", gexinghuayingxiao.numiids);
  app.get("/rulecenter/condition/region/:regionId", gexinghuayingxiao.region);
  //运行监控
  app.get("/rulecenter/statuses/plans/:plan/slot/:dateSlot", gexinghuayingxiao.dateSlot);
  /*个性化包裹配置 end*/

  /*订单中心配置start*/
  //订单催付
  app.get("/urpay/urpayConfig", dingdanzhongxin.urpayConfig);
  app.get("/urpay/urpaySummary/urpaySummaryList", dingdanzhongxin.urpaySummaryList);
  app.post(nodeRoot + "/node/sms/calculate", dingdanzhongxin.calculate);
  app.post("/urpay/urpayConfig", dingdanzhongxin.saveurpayConfig);
  //订单关怀
  app.get("/care/careConfig", dingdanzhongxin.careConfig);
  app.get("/urpay/urpaySummary/careSummaryList", dingdanzhongxin.careSummaryList);
  app.post("/care/careConfig", dingdanzhongxin.savecareConfig);
  //发送记录
  app.get("/urpay/urpaySummary/urpayType", dingdanzhongxin.urpayType);
  app.get("/urpay/urpaySummary/urpayLogList", dingdanzhongxin.urpayLogList);
  /*订单中心配置end*/

  /*客服中心配置start*/
  //未付款跟进
  app.post("/customerCenter/orders/orderReceptionWw", kefuzhongxin.orderReceptionWw);
  app.post("/customerCenter/orders/ordersList", kefuzhongxin.ordersList);
  app.post("/customerCenter/orders/hiddenOrder", kefuzhongxin.hiddenOrder);
  //发货跟进
  app.get("/meta/dic/:id/value", kefuzhongxin.value);
  app.post("/sendGoods/orders/ordersList", kefuzhongxin.sendGoods);
  app.get("/gateway/sms_list", kefuzhongxin.sms_list);
  //评价跟进
  app.post("/traderate/query", kefuzhongxin.traderate);
  //物流跟进
  app.post("/properties/getArray", kefuzhongxin.properties);
  app.post("/customerCenter/logistics/logisticsList", kefuzhongxin.logisticsList);
  app.post("/customerCenter/logistics/extensionTimes", kefuzhongxin.extensionTimes);
  //退货跟进
  app.post("/customerCenter/refund/refundList", kefuzhongxin.refundList);
  /*客服中心配置end*/

  /*促销管理配置start*/
  app.get("/coupon/taobao/list", cuxiaoguanli.couponList);
  //新建优惠券
  app.get("/coupon/taobao/denomination", cuxiaoguanli.denomination);
  app.get("/coupon/taobao/grandUrl", cuxiaoguanli.grandUrl);
  app.get("/coupon/taobao/shop/:id/web-portal/v1orization", cuxiaoguanli.authorization);
  app.get("/ump/shop", xitongguanli.getShops);//不是系统管理下得接口，只是使用数据模拟
  app.get("/coupon/shop/", xitongguanli.getShops);//不是系统管理下得接口，只是使用数据模拟
  app.get("/web-common-component/" + version + "/ump/count/shopId/:id/userScopeType/:apid/:tenantId", xitongguanli.getUserType);//不是系统管理下得接口，只是使用数据模拟
  /*促销管理配置end*/

  /*客户管理配置start*/
  app.get("/channel/blacklist/MOBILE/page", kehuguanli.MOBILE);
  app.get("/channel/blacklist/MOBILE/exists", kehuguanli.exists);
  app.post("/channel/blacklist/MOBILE", kehuguanli.saveblacklist);
  /*获取旺旺账号list*/
  app.get("/web-system/" + version + "/sys/user/subuserinfo/", xitongguanli.getSubAccountList);
  /*客户管理配置end*/
  /*营销活动配置 start*/
  // 平台列表
  app.get(commonComponentRoot + "/plat/selector/subject", zhudongyingxiao.platDate);
  app.get("/web-dashboard/" + version + "/metas/ucenter/plat/taobao/", zhudongyingxiao.getTaobaoPlatId);
  app.get(campaignRoot + "/workflow/validate/:id", zhudongyingxiao.startSp);
  app.put(campaignRoot + "/campaign/:id/approval/submit", zhudongyingxiao.putstartSp);
  app.get(campaignRoot + "/campaign/:id/page", zhudongyingxiao.campaign);
  // app.get("/web-common-component/" + version + "/campaign/:id([0-9]+)", zhudongyingxiao.campaignActiveDetail);
  // 日历数据
  app.get(campaignRoot + "/campaign/calendar", zhudongyingxiao.campaignActiveCalendar);
  app.get(campaignRoot + "/workflow/node/groups", zhudongyingxiao.groups);
  app.get("/dashboard/sso/directive", zhudongyingxiao.openOldCcms);
  app.get(campaignRoot + "/campaign/:id/news", zhudongyingxiao.campaignNews);
  // Updated by 茅丹丹 2014/4/25
  if (isPeriodically) {
    app.get(campaignRoot + "/workflow/:id", zhudongyingxiao.workflowPer);
  } else {
    app.get(campaignRoot + "/workflow/:id", zhudongyingxiao.workflow);
  }
  app.put(campaignRoot + "/workflow/:id/elements", zhudongyingxiao.putworkflow);
  app.post(campaignRoot + "/workflow/:id/node", zhudongyingxiao.addCell);  //新增节点
  app.delete(campaignRoot + "/workflow/:id/elements/deletion", zhudongyingxiao.deleteCell);  //删除节点
  app.put(campaignRoot + "/workflow/:id/node", zhudongyingxiao.moveCell);  //移动节点
  if (isPeriodically) {
    app.get(campaignRoot + "/campaign/schedule/status/campaign/:id", zhudongyingxiao.getCampStatusPer);  //获取活动执行状态
  } else {
    app.get(campaignRoot + "/campaign/schedule/status/campaign/:id", zhudongyingxiao.getCampStatus);  //获取活动执行状态
  }
  app.get(campaignRoot + "/campaign/:id/classification", zhudongyingxiao.classification);//活动列表ztree
  app.get(campaignRoot + "/campaign/:id/classification/list", zhudongyingxiao.classification);//活动列表ztree
  app.post(campaignRoot + "/campaign/classification", zhudongyingxiao.addNode);//增加列表ztree
  app.delete(campaignRoot + "/campaign/classification/:id", zhudongyingxiao.deleteNode);//删除ztree
  app.put(campaignRoot + "/campaign/classification/:id", zhudongyingxiao.renameNode);//重命名列表ztree
  app.put(campaignRoot + "/campaign/classification/:id/assign", zhudongyingxiao.moveNode);//移动ztree
  app.get(campaignRoot + "/campaign/schedule/status/job/:id", zhudongyingxiao.status);//活动状态
  app.put(campaignRoot + "/workflow/schedule/job/:campJobid/node/:nodeid/recover/", zhudongyingxiao.status);//重试节点
  //获取指定周期下指定节点的执行状态 added by 茅丹丹 2014-4-29 小屈

  app.get(campaignRoot + "/campaign/schedule/status/job/:subjectId/node/:nodeId", zhudongyingxiao.nodeStatus);
  app.get(campaignRoot + "/workflow/:id/validate", zhudongyingxiao.validate);//测试活动
  app.put(campaignRoot + "/workflow/schedule/campaign/:id/test", zhudongyingxiao.putTest);
  app.put(campaignRoot + "/workflow/schedule/campaign/:id/execute", zhudongyingxiao.putTest);
  app.post(campaignRoot + "/workflow/:id/node/:id/split", zhudongyingxiao.multiLine);//生成多条连线


  //start 活动模板 Added By 茅丹丹 2014-4-21


  //模版列表
  app.get(campaignRoot + "/campaign/:tenantId/template/", zhudongyingxiao.getTemplateList);
  //添加模版
  app.post(campaignRoot + "/campaign/template/", zhudongyingxiao.addTemplate);
  //修改模版
  app.put(campaignRoot + "/campaign/template/:id", zhudongyingxiao.updateTemplate);
  //获取可用的活动模版 2014-04-22
  app.get(campaignRoot + "/campaign/template/avaliable", zhudongyingxiao.getAvailableTemplates);
  //单个模板
  app.get(campaignRoot + "/campaign/template/:id", zhudongyingxiao.getTemplate);
  //删除
  app.delete(campaignRoot + "/campaign/template/:id", zhudongyingxiao.delelteTemplate);


  /*end 活动模板 Added By 茅丹丹 2014-4-21*/

  /*客户分群 start*/

  app.get(nodeRoot + "/node/group/list", customerSegmentation.getGroupCategoryList); // 获取分群列表
  app.get(nodeRoot + "/node/group/category", customerSegmentation.getCategoryTree);//初始化右侧目录树
  app.get(nodeRoot + "/node/group/category/view/movegroup", customerSegmentation.getCategoryTree);//初始化右侧目录树
  app.post(nodeRoot + "/node/group/category", customerSegmentation.addCategoryTree);    //增
  app.delete(nodeRoot + "/node/group/category/:id/:tenantId", customerSegmentation.deleteCategoryTree);//删
  app.put(nodeRoot + "/node/group/category", customerSegmentation.updateCategoryTree);  //改
  app.get(nodeRoot+ "/node/group/category/except/:id/:tenantId", customerSegmentation.getNewCategoryTree);//删除时移动选择新目录树
  app.put(nodeRoot + "/node/group/category/move", customerSegmentation.putDelNewCtg);  //删除时移动新目录保存
  app.delete(nodeRoot+ "/node/group/customerGroup/:id", customerSegmentation.deleteSinglePar); // 分群单个删除
  app.put(nodeRoot + "/node/group/customerGroup", customerSegmentation.saveParMove);  //移动
  /*新建客户分群*/
  app.get(nodeRoot + "/node/group/customerGroup/new/:tenantId", customerSegmentation.addCustomerGroup); // 新建客户分群
  app.get(nodeRoot + "/node/group/isExceeded/:tenantId", customerSegmentation.isPostAdd); // 新建客户分群
  app.get(nodeRoot + "/node/group/customerGroup/:id", customerSegmentation.getDetailCustomerGroup); // 新建客户分群
  app.post(nodeRoot + "/node/group/customerGroup", customerSegmentation.postCreateGroup); // 保存新建分群

  /*
   app.put("/web-system/" + version + "/sys/department/:id/shops", xitongguanli.saveDepartment);  //保存
   app.get("/web-system/" + version + "/sys/department/:id/shops", xitongguanli.saveDepartment);  //保存
   */
  /*客户分群 end*/

  /*新建*/
  app.get(campaignRoot + "/user/approvers", zhudongyingxiao.users);//获取审批人配置
  app.get(campaignRoot + "/campaign/category/:id", zhudongyingxiao.category);//获取活动类型
  app.put(campaignRoot + "/campaign/category/:id", zhudongyingxiao.changeTypeCategory);//改变状态
  app.delete(campaignRoot + "/campaign/category/:id", zhudongyingxiao.deleteCategory);//删除活动类型管理
  app.post(campaignRoot + "/campaign", zhudongyingxiao.postCampaign);//创建活动
  if (isPeriodically) {
    app.get(campaignRoot + "/campaign/:id", zhudongyingxiao.updateCampaignPer);//修改活动
  } else {
    app.get(campaignRoot + "/campaign/:id", zhudongyingxiao.updateCampaign);//修改活动
  }
  app.put(campaignRoot + "/campaign/:id", zhudongyingxiao.putCampaign);//保存修改活动
  app.delete(campaignRoot + "/campaign/:id", zhudongyingxiao.deleteCampaign);//删除活动
  app.post(campaignRoot + "/campaign/category", zhudongyingxiao.postCategory);//添加活动管理类型
  app.delete(campaignRoot + "campaign/category/:id", zhudongyingxiao.deleteCategory);//删除管理类型
  app.get(campaignRoot + "/campaign/config/valid/canvas", zhudongyingxiao.marketAttribute);//修改活动
  app.get(campaignRoot + "/campaign/config/valid/canvas/:id", zhudongyingxiao.marketAttribute);//修改活动
  app.get("/epassport/" + version + "/admin/orgs/page", zhudongyingxiao.organizations);//修改活动
  app.get("/epassport/" + version + "/admin/users/approvers", zhudongyingxiao.users);//修改活动
  /*商品优惠start*/
  app.get("/web-common-component/" + version + "/ump/goods", zhudongyingxiao.umpList);  //商品优惠数据列表
  app.post("/web-common-component/" + version + "/ump/ump", zhudongyingxiao.umpAdd);  //商品优惠新建
  app.put("/web-common-component/" + version + "/ump/ump", zhudongyingxiao.umpAdd);  //商品优惠修改
  app.get("/web-common-component/" + version + "/ump/ump/:id", zhudongyingxiao.umpModify);  //商品优惠修改
  app.get("/web-common-component/" + version + "/ump/applyNotice/:id", zhudongyingxiao.getEmpowerContent);  //获取申请内容
  app.get("/web-common-component/" + version + "/coupon/applyNotice/:id", zhudongyingxiao.getEmpowerContent);
  app.post("/web-common-component/" + version + "/coupon/applyNotice", zhudongyingxiao.getEmpowerContent);
  app.post("/web-common-component/" + version + "/ump/applyNotice", zhudongyingxiao.postApplyNotice);
  app.put("/web-common-component/" + version + "/ump/channel/:id", zhudongyingxiao.tiJiao);
  app.delete("/web-common-component/" + version + "/ump/ump/:id", zhudongyingxiao.tiJiao);
  app.put("/web-common-component/" + version + "/coupon/channel/:id", zhudongyingxiao.tiJiao);
  /*发送式优惠劵*/
  app.get("/web-common-component/" + version + "/coupon", zhudongyingxiao.couponList);  //优惠卷数据列表
  app.post("/web-common-component/" + version + "/coupon", zhudongyingxiao.couponAdd);  //优惠卷新建
  app.get("/web-common-component/" + version + "/coupon/:id", zhudongyingxiao.couponModify);
  app.put("/web-common-component/" + version + "/coupon", zhudongyingxiao.couponAdd);
  /*订单级优惠和包邮卡*/
  app.get("/web-common-component/" + version + "/ump/order", zhudongyingxiao.ordersLists);
  app.get("/web-common-component/" + version + "/ump/postage", zhudongyingxiao.postageLists);
  app.get("/web-common-component/" + version + "/ump/count/shopId/61559109/userScopeType/0", zhudongyingxiao.getCounponCounts)
  /*start 节点发送报告接口Added By 茅丹丹 2014/4/23*/

  app.get("/web-common-component/" + version + "/report/sender/sms", zhudongyingxiao.senderSms); //sms发送报告请求
  app.get("/web-common-component/" + version + "/report/sender/edm", zhudongyingxiao.senderEdm); //edm发送报告请求
  app.get("/web-common-component/" + version + "/report/sender/ump", zhudongyingxiao.senderUmp); //ump发送报告请求
  app.get("/web-common-component/" + version + "/report/sender/coupon", zhudongyingxiao.senderCoupon); //coupon发送报告请求
  app.get(nodeRoot + "/node/effmarket/analysis/report", zhudongyingxiao.getmarketeffect);

  /*end 节点发送报告接口Added By 茅丹丹 2014/4/23*/


  /** 活动发送报告相关 */
  app.get("/web-common-component/" + version + "/report/sender/sms/list", zhudongyingxiao.senderSmsList); //sms发送报告列表
  app.get("/web-common-component/" + version + "/report/sender/sms/summary", zhudongyingxiao.senderSmsSummary); //sms发送报告汇总值
  app.get("/web-common-component/" + version + "/report/sender/edm/list", zhudongyingxiao.senderEdmList); //EDM发送报告列表
  app.get("/web-common-component/" + version + "/report/sender/edm/summary", zhudongyingxiao.senderEdmSummary); //EDM发送报告汇总值
  app.get("/web-common-component/" + version + "/report/sender/ump/list", zhudongyingxiao.senderUmpList); //定向优惠发送报告列表
  app.get("/web-common-component/" + version + "/report/sender/coupon/list", zhudongyingxiao.senderCouponList); //优惠券发送报告列表
  app.get("/web-common-component/" + version + "/report/sender/coupon/summary", zhudongyingxiao.senderCouponSummary); //优惠券发送报告汇总值
  app.get(nodeRoot + "/node/benefit/report/sender/list", zhudongyingxiao.senderBenefitList); //淘宝权益发送报告列表
  app.get(nodeRoot + "node/benefit/report/summary", zhudongyingxiao.senderBenefitSummary); //淘宝权益发送报告汇总值
  app.get("/web-common-component/" + version + "/report/sender/ump/summary", zhudongyingxiao.senderumpSummary); //定向优惠发送报告汇总值
  app.get(campaignRoot + "/workflow/:id/channelnode/", zhudongyingxiao.getChannelNodesKAO);//获取发送报道渠道

  /** 活动响应报告相关 */
  app.get(campaignRoot + "/report/response/list", zhudongyingxiao.responseReportList); //响应报告列表

  /*商品优惠end*/
  /*节点配置start*/
  app.get(campaignRoot + "/workflow/meta/node/:nodeType", node.getNodeTips);//获取节点tips
  app.get(nodeRoot + "/node/time/:id", node.getTime);//时间节点
  app.get(nodeRoot + "/node/time/:id", node.getTime);
  app.post(nodeRoot + "/node/time", node.postTime);
  app.get(nodeRoot + "/node/wait/:id", node.getWait);//等待节点
  app.get(nodeRoot + "/node/wait/:id", node.getWait);
  app.post(nodeRoot + "/node/wait", node.postWait);
  app.get(nodeRoot + "/node/target/result/:subjobid", node.getTargetData);//目标组节点
  app.get(nodeRoot + "/node/target/download/checkFile/:subjobid", node.checkFile);
  app.get(nodeRoot + "/node/target/download/:subjobid", node.getTargetData);
  app.get(nodeRoot + "/node/target/:id", node.getTarget);
  app.post(nodeRoot + "/node/target/", node.postTarget);
  app.get(nodeRoot + "/node/merge/:id", node.getMerge);//合并节点
  app.get(nodeRoot + "/node/merge/:id", node.getMerge);
  app.post(nodeRoot + "/node/merge", node.postMerge);
  app.get(nodeRoot + "/node/sms/signature", node.getSignature);//短信签名
  app.get(nodeRoot + "/node/sms/gateway", node.gateway);//短信节点
  app.get(nodeRoot + "/node/sms/gateway/:id", node.gatewayById);//短信节点
  app.get(nodeRoot + "/node/sms/tag", node.getSmsTag);//短信节点标签
  app.get(nodeRoot + "/node/sms/labels", node.getSmsLabels);//短信节点标签
  app.get(nodeRoot + "/node/sms/shortlinktype", node.getShortLinkType);
  app.get(nodeRoot + "/node/sms/shop", node.getShops);//短信节点标签
  app.get(nodeRoot + "/node/sms/products", node.getPruducts);//短信节点标签
  app.post(nodeRoot + "/node/sms/shortlink", node.getShortLink);//短信节点标签
  app.get(nodeRoot + "/node/sms/loyaltyCarties", node.getCardTypeList); //短信节点获取卡类型
  app.get(nodeRoot + "/node/sms/h5Model", node.getHFiveMesage);//H5链接模板信息获取
  app.get(nodeRoot + "/node/sms/:id", node.getSmsMessage);//短信节点node/sms

  // 迪卡侬 短信 邮件start
  app.get(nodeRoot + "/node/dclonsms/optout", node.getOptout);//迪卡侬 排除Opt Out名单 权限
  app.get(nodeRoot + "/node/dclonsms/labels", node.getSmsLabels);//短信节点标签
  app.get(nodeRoot + "/node/dclonsms/gateway", node.gateway);//短信节点
  app.get(nodeRoot + "/node/dclonsms/signature", node.getSignature);//短信签名
  app.get(nodeRoot + "/node/dclonsms/tag", node.getSmsTag);//短信节点标签
  app.get(nodeRoot + "/node/dclonsms/:id", node.getSmsMessage);//短信节点node/dclonsms
  app.post(nodeRoot + "/node/dclonsms/content", node.viewMseeage);
  app.post(nodeRoot + "/node/dclonsms", node.saveSmsMessage);

  app.get(nodeRoot + "/node/dclonedm/optout", node.getOptout);//迪卡侬 排除Opt Out名单 权限
  app.get(nodeRoot + "/node/dclonedm/tag", node.getSmsTag);//短信节点标签
  app.get(nodeRoot + "/node/dclonedm/gateway", node.EDMgetGateway);//获取EDM通道
  app.get(nodeRoot + "/node/dclonedm/email", node.EnterpriseEmail);//获取企业邮箱
  app.get(nodeRoot + "/node/dclonedm/checkemail", node.checkemail);//验证是否是个人信箱
  app.get(nodeRoot + "/node/dclonedm/:id", node.getEDM);
  app.post(nodeRoot + "/node/dclonedm", node.saveEDM);
  // end

  app.post(nodeRoot + "/node/sms/content", node.viewMseeage);
  app.delete(nodeRoot + "/node/sms/signature/:id", node.deleteSignature);//删除签名
  app.post(nodeRoot + "/node/sms/signature", node.addSignature);//删除签名
  app.post(nodeRoot + "/node/sms", node.saveSmsMessage);
  //app.get("/node/query/attributeTree",node.attributeTree);
  app.get(nodeRoot + "/metas/picker/queryItem/subject/:id", node.attributeTree); // 查询节点ztree模式修改——PEACH
  app.post(nodeRoot+ "/metas/picker/queryItem/subcategory/", node.attributeTree); // 查询节点ztree分步查询——PEACH

  app.get(nodeRoot + "/node/query/:id", node.getQuery);//查询节点
  app.get(nodeRoot + "/node/query/:id", node.getQuery);
  app.get(nodeRoot + "/node/query/attribute/:id", node.getQueryConditionAttribute);//拖拽树的时候获取查询条件
  app.get(nodeRoot + "/node/query/campaign/attribute/:id", node.getQueryConditionAttribute);//拖拽树的时候获取查询条件 营销历史
  app.get(nodeRoot + "/node/query/filter/:id", node.getGlobalHead);//获取自定义全局头部
  app.get(nodeRoot + "/node/query/custom/:id", node.getConfigConditions);//获取自定义数据
  app.put(nodeRoot + "/node/query/custom/", node.postConfigConditions);
  app.put(nodeRoot + "/node/query/custom-group/", node.postConfigConditions);
  //app.put(nodeRoot + "/node/camp/query/custom-group/", node.erroralert);
  app.get(nodeRoot + "/node/edm/gateway", node.EDMgetGateway);//获取EDM通道
  app.get(nodeRoot + "/node/edm/email", node.EnterpriseEmail);//获取企业邮箱
  app.get(nodeRoot + "/node/edm/checkemail", node.checkemail);//验证是否是个人信箱
  app.get(nodeRoot + "/node/edm/email_moulds", node.getEmails);
  app.get(nodeRoot + "/node/edm/categories/:id", node.getAllCategorty);
  app.get(nodeRoot + "/node/edm/:id", node.getEDM);
  app.post(nodeRoot + "/node/edm", node.saveEDM);
  app.post(nodeRoot + "/node/edm/upload/:nodeId/camp/:campId/gateway/:gatewayId", node.saveEDM);
  app.get(nodeRoot + "/node/impreserch/batch/", node.searchGrid);//获取Grid
  app.get(nodeRoot + "/node/impreserch/:id", node.impreserch);//获取start
  app.get(nodeRoot + "/node/impreserch/:id", node.impreserch);
  app.put(nodeRoot + "/node/impreserch/save/", node.impreserchSave);//保存节点

  /*   app.put(nodeRoot + "/node/impreserch/:id", node.searchGrid);//保存*/
  //app.post(nodeRoot + "/node/edm/upload")


  app.get(nodeRoot + "/node/split/:id", node.getSplit);//拆分节点
  app.get(nodeRoot + "/node/split/:id", node.getSplit);
  app.post(nodeRoot + "/node/split/:id", node.postSplit);//拆分节点
  app.post(nodeRoot + "/node/edm/edit/fileHtml/", node.modifyEDMuploadFile);//获取EDM模版
  app.post(nodeRoot + "/node/edm/save/email", node.saveUploadFile);//保存编辑后的模版
  app.get(nodeRoot + "/node/customproperty/:id", node.getAttributeEditNode);//获取属性修改节点
  app.post(nodeRoot + "/node/customproperty", node.saveAttributeEditNode);//保存属性修改节点
  app.post(nodeRoot + "/node/edm/upload/:id/camp/:id", node.edmUploadFile)//上传文件
  app.get(nodeRoot + "/node/customproperty/properties/:id", node.getAttribute);//获取自定义属性

  // 会员等级设置节点
  app.get(nodeRoot + "/node/membergrade/:id/report", node.getVIPReports);
  app.get(nodeRoot + "/node/membergrade/:id/open", node.getVipSetting);
  app.post(nodeRoot + "/node/membergrade/save", node.saveVipSetting);
  app.get(nodeRoot + "/node/membergrade/getcardtypes", node.getcardtypes);
  app.get(nodeRoot + "/node/membergrade/gradeType", node.getGradeTypeVip);

  // 新会员等级设置
  app.get(nodeRoot + "/node/newmembergrade/:id/report", node.getVIPReports);
  app.get(nodeRoot + "/node/newmembergrade/:id/open", node.getNewVipSetting);
  app.post(nodeRoot + "/node/newmembergrade/save", node.saveVipSetting);
  app.get(nodeRoot + "/node/newmembergrade/getcardtypes", node.getcardtypes);
  app.get(nodeRoot + "/node/newmembergrade/gradeType", node.getGradeTypeVip);
  app.get(nodeRoot + "/node/newmembergrade/getcardtypes", node.getcardtypes);

  //百丽优惠券节点
  app.get(nodeRoot + "/node/couponBelle/:id", node.getDiscountEcBelle);
  app.put(nodeRoot + "/node/couponBelle/", node.postDiscountEcBelle);
  app.get(nodeRoot + "/node/couponBelle/getCouponBelle/:couponRuleCode", node.getDiscountCouponBelle);

  // 优惠券节点
  app.get(nodeRoot + "/node/coupon/:id", node.getDiscountEc);
  app.put(nodeRoot + "/node/coupon/", node.postDiscountEc);
  app.get(nodeRoot + "/node/coupon/shop/:id", node.getDiscountCoupon);

  //定向优惠节点
  app.get(nodeRoot + "/node/ump/umptype", node.getDiscountUmpType);
  app.get(nodeRoot + "/node/ump/report", node.getUmpReport);
  app.get(nodeRoot + "/node/ump/:id", node.getDiscountUmp);
  app.get(nodeRoot + "/node/ump/:id", node.getDiscountUmp);
  app.get(nodeRoot + "/node/ump/shop/:id/umptype/:type", node.resCouponHdNames);
  app.post(nodeRoot + "/node/ump", node.postDiscountUmp);
  app.put(nodeRoot + "/node/ump", node.postDiscountUmp);

  //积分发放节点
  app.get(nodeRoot + "/node/integralsend/report", node.getDiscountIsReportData);
  app.get(nodeRoot + "/node/integralsend/checkDesc", node.getCheckDesc);
  app.get(nodeRoot + "/node/integralsend/:id", node.getDiscountIs);
  app.get(nodeRoot + "/node/integralsend/cardtypelist/tenantId/:tenantId", node.getCardTypeList);
  app.put(nodeRoot + "/node/integralsend/", node.postDiscountIs);
  app.get(nodeRoot + "/node/integralsendnew/cardtypelist/", node.getCardTypeList);
  app.get(nodeRoot + "/node/integralsendnew/:id", node.getDiscountIsNew);
  app.put(nodeRoot + "/node/integralsendnew/", node.postDiscountIs);

  //名单匹配节点配置
  app.get(nodeRoot + "/node/match/subjects", xitongguanli.getRollMatchSettings);
  app.put(nodeRoot + "/node/match/config", xitongguanli.saveRollMatchSettings);

  // 名单匹配节点
  app.get(nodeRoot + "/node/match/:id", node.openMatchNode);
  app.put(nodeRoot + "/node/match/upload", node.postMatchUpload);
  app.put(nodeRoot + "/node/match/match", node.postMatchMatch);
  app.put(nodeRoot + "/node/match/save", node.postMatchSave);
  app.put(nodeRoot + "/node/match/preview", node.putPreview);
  app.get(nodeRoot + "/node/match/result/:id", node.getMatchResultData);

  // 活动查询节点
  app.get(commonComponentRoot + "/basedata/channelType", node.getCampaignQueryChannelType); //优惠沟通方式
  app.get(nodeRoot + "/node/camp/query/:id", node.getCampaignQuery); //活动查询节点
  app.put(nodeRoot + "/node/camp/query/custom", node.getCampaignQuery);  //保存活动查询节点
  app.post(nodeRoot + "/node/camp/query/count", node.getNumber); //底部统计人数
  app.post(nodeRoot + "/node/camp/query/count/stop", node.getNumber); //停止底部统计人数
  app.put(nodeRoot + "/node/camp/query/custom-group", node.putQueryCreateGroupByQuery);  //保存为客户分群

  // 订单查询节点
  app.get(nodeRoot + "/node/order/query/:id", node.getOrderQuery); //打开订单查询节点
  app.put(nodeRoot + "/node/order/query/custom", node.getOrderQuery);  //保存订单查询节点
  app.post(nodeRoot + "/node/order/query/count", node.getNumber); //底部统计人数
  app.post(nodeRoot + "/node/order/query/count/stop", node.getNumber); //停止底部统计人数
  app.put(nodeRoot + "/node/order/query/custom-group", node.putQueryCreateGroupByQuery);  //保存为客户分群

  // 订单查询节点 订单查询数据
  app.get(nodeRoot + "/node/order/query/behavior/:id/new", node.getCustomConditions);
  app.post(nodeRoot + "/node/order/query/behavior/save", node.postCustomConditions);
  app.get(nodeRoot + "/node/order/query/behavior/:id", node.editorCustomConditions);

  // 属性查询节点
  app.get(nodeRoot + "/node/attr/query/:id", node.getAttrQuery); //打开属性查询节点
  app.get(nodeRoot + "/node/attr/query/custom/:id", node.getAttrConfigConditions);//获取自定义数据
  app.put(nodeRoot + "/node/attr/query/custom", function(req, res) {res.send('success')});  //保存属性查询节点
  app.get(nodeRoot + "/metas/picker/queryItem/property/subject/:id", node.getAttrQueryTree); //得到左边的树
  app.get(nodeRoot + "/metas/picker/queryItem/property/qianniu/:id", node.getAttrQueryQianNiu); //得到千牛数据
  app.get(nodeRoot + "/metas/picker/queryItem/property/zidingyi/:categoryId/:catalogId/:subjectId", node.getAttrQueryZidingyi); //得到客户标签
  app.get(nodeRoot + "/node/attr/query/attribute/:id", node.getQueryConditionAttribute);//点击的时候获取查询条件
  app.post(nodeRoot + "/node/attr/query/count", node.getNumber); //底部统计人数
  app.post(nodeRoot + "/node/attr/query/count/stop", node.getNumber); //停止底部统计人数
  app.put(nodeRoot + "/node/attr/query/custom-group", node.putQueryCreateGroupByQuery);  //保存为客户分群

 // 客户分群查询
   app.get(nodeRoot + "/node/customergroup/query/:id", node.getcustomergroupQuery);
  app.put(nodeRoot + "/node/customergroup/query/custom/", node.postcgqConfigConditions);//客户分群查询节点保存

  // 排除节点
  app.get(nodeRoot + "/node/exclude/:id", node.openExcludeNode);
  app.get(nodeRoot + "/node/exclude/:id", node.openExcludeNode);
  app.put(nodeRoot + "/node/exclude/", node.postExcludeSave);

  // 排重节点
  app.get(nodeRoot + "/node/prioritize/:id", node.openPriorityNode);
  app.get(nodeRoot + "/node/prioritize/:id", node.openPriorityNode);
  app.put(nodeRoot + "/node/prioritize/", node.postPrioritySave);

  // 抽样节点
  app.get(nodeRoot + "/node/sample/:id", node.openSampleNode);
  app.get(nodeRoot + "/node/sample/:id", node.openSampleNode);
  app.put(nodeRoot + "/node/sample/", node.postSampleSave);

  // 交集节点
  app.get(nodeRoot + "/node/intersection/:id", node.openAndNode);
  app.get(nodeRoot + "/node/intersection/:id", node.openAndNode);
  app.put(nodeRoot + "/node/intersection/", node.postAndSave);

  //立即营销节点配置
  app.get(nodeRoot + "/node/marketingondemand/subjects", xitongguanli.getMarketingondemandSettings);
  app.put(nodeRoot + "/node/marketingondemand/config", xitongguanli.saveMarketingondemandSettings);

  //客服工作台配置
  app.get("/customer/service/workbench/subjects", xitongguanli.getWorkbenchSettings);
  app.put("/customer/service/workbench/config", xitongguanli.saveWorkbenchSettings);

  // 立即营销节点
  app.get(nodeRoot + "/node/marketingondemand/:id", node.openimmediatelyNode);
  app.get(nodeRoot + "/node/marketingondemand/:id", node.openimmediatelyNode);
  app.put(nodeRoot + "/node/marketingondemand/", node.postimmediatelySave);

  // 响应组节点
  app.get(nodeRoot + "/node/response/result/:subjobid", node.getResponseData);
  app.get(nodeRoot + "/node/response/:id", node.openResponseNode);
  app.get(nodeRoot + "/node/response/:id", node.openResponseNode);
  app.put(nodeRoot + "/node/response/", node.postResponseSave);
  app.get(nodeRoot + "/node/response/download/checkFile/:subjobid", node.checkFile);

  // dcl响应组节点
  app.get(nodeRoot + "/node/dresponse/result/:subjobid", node.getResponseData);
  app.get(nodeRoot + "/node/dresponse/:id", node.openDCLResponseNode);
  app.get(nodeRoot + "/node/dresponse/:id", node.openDCLResponseNode);
  app.put(nodeRoot + "/node/dresponse/", node.postResponseSave);

  // dcl 目标组节点

  app.get(nodeRoot + "/node/dtarget/result/:subjobid", node.getTargetData);//目标组节点
  app.get(nodeRoot + "/node/target/download/:subjobid", node.getTargetData);
  app.get(nodeRoot + "/node/dtarget/:id", node.getTarget);
  app.put(nodeRoot + "/node/dtarget/", node.postTargetSave);
  //线下活动节点
  app.get(nodeRoot + "/node/offline/:id/", node.getTcommunicateOther);
  app.get(nodeRoot + "/node/offline/:id/", node.getTcommunicateOther);
  app.put(nodeRoot + "/node/offline/", node.saveTcommunicateOther);


  //订单查询 模拟
  app.get(nodeRoot + "/node/query/behavior/:id/new", node.getCustomConditions);
  app.post(nodeRoot + "/node/query/behavior/save", node.postCustomConditions);
  app.get(nodeRoot + "/node/query/behavior/:id", node.editorCustomConditions);
  app.post(nodeRoot + "/node/behavior/save", node.behaviorSave)

  //优惠券响应节点
  app.get(nodeRoot + "/node/couponresp/:id", node.getResponseEC);
  app.get(nodeRoot + "/node/couponresp/:id", node.getResponseEC);
  app.put(nodeRoot + "/node/couponresp/", node.saveResponseEC);

  //EDM响应节点
  app.get(nodeRoot + "/node/edmresp/:id", node.getResponseEDM);
  app.get(nodeRoot + "/node/edmresp/:id", node.getResponseEDM);
  app.get(nodeRoot + "/node/edmresp/urls/:id", node.getResponseEDMUrl);
  app.put(nodeRoot + "/node/edmresp/", node.saveResponseEDM);

  //订单分析节点
  app.get(commonComponentRoot + "/plat/selector/subject/order", node.getOpenSelectorOrder);
  app.get(nodeRoot + "/node/analysis/order/:id/", node.getOpenAnalysisOrder);
  app.put(nodeRoot + "/node/analysis/order/:id", node.postAnalysisOrder);
  app.get(nodeRoot + "/node/analysis/order/:nodeid/config/subjectid/:subjectid", node.getAnalysisOrderItems);
  app.get(nodeRoot + "/node/analysis/order/:nodeid/config/screening/subjectid/:subjectid", node.getAnalysisOrderscreening);
  app.get(nodeRoot + "/node/analysis/order/:nodeid/job/:jobid/results/tab", node.getResponseTabListTitle);
  app.get(nodeRoot + "/node/analysis/order/:nodeId/results/", node.getResponseDataByDimensionId);
  app.get(nodeRoot + "/node/analysis/order/subjectid/:subjectId/shop/", node.getShopDataBySubjectId);
  app.get(nodeRoot + "/node/analysis/order/download/authority/", node.getShopDataPower);

  app.get(nodeRoot + "/node/analysis/order/checkFile/:nodeid/job/:jobid/download", node.checkFile);
  app.get(nodeRoot + "/node/analysis/order/checkFile/:nodeid/job/:jobid/:resultId/download", node.checkFile);

  //营销效果分析节点
  app.get(nodeRoot + "/node/effmarket/analysis/open/:id", node.getOpenMarketEffect);
  app.put(nodeRoot + "/node/effmarket/analysis/save/", node.saveMarketEffect);

  //行为查询 节点
  app.get(nodeRoot + "/node/behavior/:id([0-9]+)", node.behavior)
  app.get(nodeRoot + "/node/behavior/getTBShops", node.getTBShops)
  app.get(nodeRoot + "/node/behavior/getTop5/:id([0-9]+)", node.behaviorGetTop5)
  //营销热度查询 节点
  app.get(nodeRoot + "/node/heat/:id([0-9]+)", node.heat)
  app.get(nodeRoot + "/node/heat/getTBShops", node.heatgetTBShops)
  app.post(nodeRoot + "/node/heat/save", node.heatSaveNode)

  // 客户特征分析
  app.get(nodeRoot + "/node/featureanalysis/items", node.featuranalysisItems)
  app.get(nodeRoot + "/node/featureanalysis/items/:id", node.featuranalysisItems)
  app.get(nodeRoot + "/node/featureanalysis/:id", node.featuranalysis)
  app.put(nodeRoot + "/node/featureanalysis/", node.featuranalysis)
  app.get(nodeRoot + "/node/featureanalysis/:id/:campJobid/:itemId/report", node.featuranalysisData)

  //效果跟踪节点
  app.get(nodeRoot + "/node/effecttracking/report/:id", node.getDiscountTrack);
  app.get(nodeRoot + "/node/effecttracking/report/pair/:id", node.getDiscountTrackEchart);
  app.get(nodeRoot + "/node/effecttracking/:id", node.openDiscountTrack);
  //app.get(nodeRoot + "/node/effecttrackshop/", node.openDiscountTrackShop); //没用
  app.get(nodeRoot + "/node/effecttracking/report/product/page/:id", node.openTrackpropertyList);
  app.put(nodeRoot + "/node/effecttracking", node.putDiscountTrack);

  // 淘宝权益节点
  app.get(nodeRoot + "/node/benefit/:id", node.getDiscountBenefit);
  app.get(nodeRoot + "/node/benefit/activity/:id", node.getDiscountBenefitActivity);
  app.get(nodeRoot + "/node/benefit/shop/:id", node.getDiscountBenefitActivity);
  app.put(nodeRoot + "/node/benefit/", node.postDiscountBenefitData);

  // 标签查询节点
  app.get(nodeRoot + "/node/unionlabel/:id", node.getUnionlabelNode);
  app.get(nodeRoot + "/node/unionlabel/shopAndLabels/:subjectId", node.getUnionlabelData);
  app.get(nodeRoot + "/node/unionlabel/enabled/:enabled", node.toggleEnabled);
  app.put(nodeRoot + "/node/unionlabel/save", node.putUnionlabelData);

  // 微信节点
  app.get(nodeRoot + "/node/wechat/queryAppInfo", node.getWechatNumbers);//获取公众号
  app.get(nodeRoot + "/node/wechat/materialType", node.getMaterialType);  // 素材类型
  app.get(nodeRoot + "node/wechat/authorize", node.authorize);  // 授权
  app.get(nodeRoot + "/node/wechat/:id", node.getWechat);  // 打开节点返回初始节点值
  app.get(nodeRoot + "/node/wechat/filterList/:id", node.getFilterList);  // 名单控制获取
  app.get(nodeRoot + "/node/wechat/materialList/:authAppid/:materialType", node.materialList);  // 素材列表
  app.get(nodeRoot + "/node/wechat/materials/:id", node.materials);
  app.get(nodeRoot + "/node/wechat/dataAnalysis/:nodeCode", node.reportArticleRead);// 查询图文分析
  app.put(nodeRoot + "/node/wechat/:nodeCode", node.postWechat);
  app.get(nodeRoot + "/report/sender/wechat/summary/", zhudongyingxiao.senderBenefitSummary);
  app.get(nodeRoot + "/report/sender/wechat/list", zhudongyingxiao.senderBenefitList); //淘宝权益发送报告列表

  //迪卡侬微信节点
  app.get(nodeRoot + "/wechatdkt/getOffaccts", node.getWechatNumbersDkt);
  app.get(nodeRoot +  + "/wechatdkt/:id", node.getWechatDkt);  // 打开节点返回初始节点值
  app.get(nodeRoot +  + "/wechatdkt/materials/:offacct/:page/:msgType", node.materialsDkt);
  app.put(nodeRoot +  + "/wechatdkt/", node.postWechatDkt);

  /*节点配置end*/

  /*地区选择*/
  //updated by 茅丹丹 2014-4-26 /area/selector？id=1&type=1
  app.get("/web-common-component/" + version + "/area/relationship/parent/:ids", zhudongyingxiao.getCityRelationship);
  app.get("/web-common-component/" + version + "/area/selector/:id/:type", zhudongyingxiao.getCitys);
  //added by 茅丹丹-蔡磊 2014-5-8 获取区下面的省份
  app.get("/web-common-component/" + version + "/area/relationship/child/:ids", zhudongyingxiao.getProvinceByArea);
  app.post("/web-common-component/" + version + "/area/relationship/parent/", zhudongyingxiao.getProvinceByArea);
  //added by 陈宁 2015-8-7 获取指定区域下全部地区
  app.get("/web-common-component/" + version + "/area/:id", zhudongyingxiao.getAllCitys);
  /*营销活动配置end*/

  /*ͷ系统管理start*/
  //部门管理
  app.get("/web-system/" + version + "/sys/department/root", xitongguanli.getDepartment);
  app.get(commonComponentRoot + "/shop/selector/:tenantId", xitongguanli.getShops);
  app.get(commonComponentRoot + "/shop/selector/:segid/all", xitongguanli.getShops);
  app.get("/web-common-component/" + version + "/shop/selector", xitongguanli.getShops);  // 只用在系统管理上
  //失效 Added BY  Maodandan 2014-4-14
  /*app.put("/web-system/" + version + "/sys/department/", xitongguanli.addDepartment);    //增*/
  //Added By Maodandan 2014-4-14
  app.post("/web-system/" + version + "/sys/department/", xitongguanli.addDepartment);    //增*/

  app.put("/web-system/" + version + "/sys/department/:id", xitongguanli.updateDepartment);  //改*/

  app.put("/web-system/" + version + "/sys/department/:id/assign", xitongguanli.updateDepartment);  //移动
  app.delete("/web-system/" + version + "/sys/department/:id", xitongguanli.deleteDepartment);    //删
  app.put("/web-system/" + version + "/sys/department/:id/shops", xitongguanli.saveDepartment);  //保存
  app.get("/web-system/" + version + "/sys/department/:id/shops", xitongguanli.saveDepartment);  //保存

  //角色管理
  app.get("/web-system/" + version + "/sys/permission", xitongguanli.getPermissions);

  app.get("/web-system/" + version + "/sys/role", xitongguanli.getRoles);   // 查
  app.get("/web-system/" + version + "/sys/role/:id/permissions", xitongguanli.getPermissions);   // 查
  app.post("/web-system/" + version + "/sys/role/", xitongguanli.addRole);    //增
  app.put("/web-system/" + version + "/sys/role/:id", xitongguanli.updateRole);  //改
  app.put("/web-system/" + version + "/sys/role/:id/assign", xitongguanli.updateRole);  //移动
  app.delete("/web-system/" + version + "/sys/role/:id", xitongguanli.deleteRole);    //删
  app.post("/web-system/" + version + "/sys/role/:id", xitongguanli.saveRole);  //保存
  app.get("/web-system/" + version + "/sys/role/:id", xitongguanli.saveRole);  //保存
  //账号管理
  app.get("/web-system/" + version + "/sys/user", xitongguanli.getUsers);
  app.get("/web-system/" + version + "/sys/user/bindable", xitongguanli.getUsers);
  app.get("/web-system/" + version + "/sys/user/listbind/", xitongguanli.getUsers);
  //app.get(/\/sys\/user\/listbind\/\?idInPlat=\d+/, xitongguanli.getCurUser);
  app.get("/web-system/" + version + "/sys/department/:id", xitongguanli.getDepartment);

  app.get("/web-system/" + version + "/sys/user/usermode/", xitongguanli.getUserMode);
  app.post("/web-system/" + version + "/sys/user/addww", xitongguanli.postUser);
  app.get("/web-system/" + version + "/sys/user/:id", xitongguanli.getCurUser);
  app.post("/web-system/" + version + "/sys/user/", xitongguanli.postUser);
  app.put("/web-system/" + version + "/sys/user/:id", xitongguanli.postUser);
  app.put("/web-system/" + version + "/sys/user/:id/status", xitongguanli.status);
  app.post("/web-system/" + version + "/sys/user/:id/unbind", xitongguanli.getUsers);
  /*系统管理end*/

  //会员等级设置配置
  app.get("/metas/subject", xitongguanli.getSubject);
  app.get("/metas/dic", xitongguanli.getDic);
  app.get(nodeRoot + "/node/membergrade/config/all", xitongguanli.getMemberGrade);
  app.delete(nodeRoot + "/node/membergrade/config/:id/delete", xitongguanli.deleteMemberGradeSetting);
  app.post(nodeRoot + "/node/membergrade/config", xitongguanli.saveMemberGradeSetting);
  app.put(nodeRoot + "/node/membergrade/config/:id/update", xitongguanli.saveMemberGradeSetting);

  //客户自定义属性配置
  app.get(datamanageRoot + "/customproperty/config/open", xitongguanli.getCustomerAttributesSettings);
  app.post(datamanageRoot + "/customproperty/config", xitongguanli.saveCustomerAttributesSettings);

  // 历史数据导入
  app.get("/web-common-component/" + version + "/orderimport/list", shujuguanli.getList);
  app.post("/web-common-component/" + version + "/orderimport/save", shujuguanli.saveList);
  app.get("/web-common-component/" + version + "/orderimport/checkImportStatus", shujuguanli.checkImportStatus);
  app.get("/web-common-component/" + version + "/orderimport/viewResult", shujuguanli.viewResult);
  app.get("/web-common-component/" + version + "/orderimport/delete", shujuguanli.deleteFile);

  //客户数据导入
  app.get("/web-common-component/" + version + "/extImport", shujuguanli.getImporData);
  app.put("/web-common-component/" + version + "/extImport/state", shujuguanli.getImporData1);
  app.get("/web-common-component/" + version + "/extImport/preview", shujuguanli.getPreview);
  app.put("/web-common-component/" + version + "/extImport/saveFile", shujuguanli.saveFile);
  app.put("/web-common-component/" + version + "/extImport/saveColumn", shujuguanli.saveColumn);
  app.put("/web-common-component/" + version + "/extImport/startVerify", shujuguanli.startVerify);
  app.put("/web-common-component/" + version + "/extImport/stopVerify", shujuguanli.stopVerify);
  app.get("/web-common-component/" + version + "/extImport/getProgress", shujuguanli.getProgress);
  app.get("/web-common-component/" + version + "/extImport/checkName", shujuguanli.checkName);
  app.get("/web-common-component/" + version + "/extImport/list", shujuguanli.importList);
  app.get("/web-common-component/" + version + "/extImport/detail", shujuguanli.importDetail);
  app.put("/web-common-component/" + version + "/extImport/startImport", shujuguanli.startImport);

  /*数据管理start*/
  app.get("/web-common-component/" + version + "/rfm/category", shujuguanli.getRFMTree);
  app.get("/web-common-component/" + version + "/rfm", shujuguanli.getRFMResults);
  app.get("/web-common-component/" + version + "/rfm/order", shujuguanli.getCustomerRFMResults);

  // 客户标签
  app.get(datamanageRoot + "/customproperty/catalog/tree", shujuguanli.getCatalogTree);//获取客户标签目录
  app.post(datamanageRoot + "/customproperty/catalog", shujuguanli.catalog);//获取客户标签目录
  app.put(datamanageRoot + "/customproperty/catalog", shujuguanli.catalog);//获取客户标签目录
  app.delete(datamanageRoot + "/customproperty/catalog/:catalogId", shujuguanli.catalog);//获取客户标签目录
  app.get(datamanageRoot + "/customproperty/properties/values/:id", shujuguanli.getPropertiesValueById);//获取客户标签目录

  /*自定义属性*/
  app.get(datamanageRoot + "/customproperty/titles", shujuguanli.custompropertyTitle);
  app.get(datamanageRoot + "/customproperty/properties", shujuguanli.custompropertyProperties);
  app.get(datamanageRoot + "/customproperty/list", shujuguanli.propertyList);
  app.get(datamanageRoot + "/customproperty/querytypes", shujuguanli.querytypes);
  app.post(datamanageRoot + "/customproperty", shujuguanli.addCustomproperty);
  app.put(datamanageRoot + "/customproperty/:id", shujuguanli.updateCustomproperty);
  app.post(datamanageRoot + "/customproperty/updatestatus/:id", shujuguanli.changeStatus);
  app.get(datamanageRoot + "/customproperty/:id", shujuguanli.editorCustomproperty);//修改自定义
  app.delete(datamanageRoot + "/customproperty/:id/:values", shujuguanli.deleteSelectValues);
  app.delete(datamanageRoot + "/customproperty/:id", shujuguanli.deleteCustomproperty);


  /*客服工作台数据*/
  app.get("/web-common-component/" + version + "/service/workbench/label", shujuguanli.cswLabelList);
  app.get("/web-common-component/" + version + "/service/workbench/attributeHeads", shujuguanli.cswAttributeHeads);
  app.get("/web-common-component/" + version + "/service/workbench/attributeValues", shujuguanli.cswAttributeValues);

  /*客户红名单 Added By 茅丹丹2014-3-17 Begin*/
  //客户名单分组--新增分组
  app.post(commonComponentRoot + "/checklist/group", shujuguanli.postGroup);
  //客户名单分组--分组获取
  app.get(commonComponentRoot + "/checklist/group/tenantId/:tenantId", shujuguanli.getGroup);
  app.get(commonComponentRoot + "/checklist/group/tenantId/:tenantId/type/BLACK", shujuguanli.getGroup);
  //获取所有主题 2014-4-2
  app.get(commonComponentRoot + "/checklist/subject", shujuguanli.getSubject)
  //客户名单分组--删除名单分组
  app.delete(commonComponentRoot + "/checklist/group/:id", shujuguanli.deleteGroup);
  //客户名单（按类型区分 红名单 和 黑名单 手机，EMAIL）
  app.get(commonComponentRoot + "/checklist", shujuguanli.getRedAndBlackList);
  //客户名单添加
  app.post(commonComponentRoot + "/checklist/", shujuguanli.postRedAndBlackCustom);
  //客户黑名单修改
  app.put(commonComponentRoot + "/checklist", shujuguanli.editRedAndBlackCustom);
  //获取单个客户名单
  app.get(commonComponentRoot + "/checklist/:id", shujuguanli.getRedAndBlackCustomById);
  //删除单个客户名单
  app.delete(commonComponentRoot + "/checklist/:id", shujuguanli.deleteRedAndBlackCustomById);
  //客户名单批量导入
  app.post(commonComponentRoot + "/checklist/bulk", shujuguanli.postBulkList);
  //名单批量更新
  app.put(commonComponentRoot + "/checklist/bulk", shujuguanli.putBulkList);
  //名单批量删除
  app.delete(commonComponentRoot + "/checklist/bulk", shujuguanli.deleteBulkList);
  //手机黑名单批量删除获取文件上传进度
  app.get(commonComponentRoot + "/checklist/bulk/state/:id", shujuguanli.getBulkList);
  //系统内平台  2014-4-2 停用
  app.get("/plat", shujuguanli.getPlat);

  //客户红名单数据文件
  app.post(datamanageRoot + "/files/upload", shujuguanli.postBulkFile);

  /*客户红名单 Added By 茅丹丹2014-3-17 End*/

  /*商品标签start*/
  app.get("/web-common-component/" + version + "/producttag/page", shujuguanli.getLabelLists);
  app.post("/web-common-component/" + version + "/producttag", shujuguanli.addLabelLists);
  app.put("/web-common-component/" + version + "/producttag", shujuguanli.addLabelLists);
  app.delete("/web-common-component/" + version + "/producttag/:id", shujuguanli.addLabelLists);
  app.get("/web-common-component/" + version + "/producttag", shujuguanli.getProductLabelLists);
  app.post("/web-common-component/" + version + "/producttag/used", shujuguanli.getProductLabelLists);
  app.delete("/web-common-component/" + version + "/producttag/product/:id/tag/:tagID/relation", shujuguanli.deleteSingleLabel);
  app.post("/web-common-component/" + version + "/producttag/product/tag/relation/", shujuguanli.putSingleLabel);
  app.post("/web-common-component/" + version + "/producttag/product/tag/relation/batch/del-handler/", shujuguanli.deleteBatchLabel);
  app.post("/web-common-component/" + version + "/producttag/product/tag/relation/batch/", shujuguanli.putBatchLabel);
  /*商品标签end*/

  /*微信公众号管理start*/
  app.get("/web-common-component/" + version + "/wechat/shop/bind/info/", shujuguanli.wechatShop);
  app.get("/web-common-component/" + version + "/wechat/offacct/auth/domain", shujuguanli.authDomain);
  app.post("/web-common-component/" + version + "/wechat/shop/bind", shujuguanli.wechatShopUnbind);
  app.post("/web-common-component/" + version + "/wechat/shop/unbind", shujuguanli.wechatShopUnbind);
  app.get("/web-common-component/" + version + "/wechat/offaccts", shujuguanli.getWechatList);
  /*微信公众号管理end*/

  /* 微信用户信息 start */
  app.get("/web-common-component/" + version + "/wechat/find", shujuguanli.searchMembergrade);
  app.get("/web-common-component/" + version + "/wechat/customer/:customerno", shujuguanli.getCustomerByCustomerNo);
  app.put("/web-common-component/" + version + "/wechat/customer/update", shujuguanli.updateCustomerByCustomer);
  app.get("/web-common-component/" + version + "/wechat/order/:customerno/:shopid", shujuguanli.getOrderList);
  app.get("/web-common-component/" + version + "/wechat/metas/columns", shujuguanli.getCustomerCellsBySubjectIdWeChat); // 得到表格格式
  app.get("/web-common-component/" + version + "/wechat/metas/queryitmes", shujuguanli.getQueryitmesBySubjectIdWeChat); // 得到筛选条件
  app.get("/web-common-component/" + version + "/wechat/bind/offaccts", shujuguanli.getPublicNumberSubjects); // 微信获取公共号列表
  app.get("/web-common-component/" + version + "/wechat/publicNumber/", shujuguanli.getPublicNumber); // 公众号列表
  app.get("/web-common-component/" + version + "/wechat/cust/bind/info", shujuguanli.getMetasDatasWeChat); // 根据搜索条件id得到数据
  app.post("/web-common-component/" + version + "/wechat/metas/conditions", shujuguanli.postConditions);  // 发送搜索条件,返回条件id
  app.get("/web-common-component/" + version + "/wechat/customer", shujuguanli.editorInfos);
  app.get("/web-common-component/" + version + "/wechat/order", shujuguanli.openCustmerOrder);
  app.get("/plat", shujuguanli.getPlat);  // 得到平台选择
  app.post("/web-common-component/" + version + "/wechat/cust/unbind", shujuguanli.deleteBilding); //微信用户与电商客户解绑
  app.post("/web-common-component/" + version + "/wechat/cust/bind", shujuguanli.bindingPlat); //微信用户与电商客户绑定
  app.post("/web-common-component/" + version + "/wechat/cust/data/upload", shujuguanli.portMatchLoadWeChat)//微信上传文件
  app.post("/web-common-component/" + version + "/wechat/cust/data/upload/preview", shujuguanli.viewSplitDataWeChat)//微信分隔符
  app.post("/web-common-component/" + version + "/wechat/cust/data/match", shujuguanli.startMatchWechat) //微信匹配
  app.get("/web-common-component/" + version + "/wechat/cust/data/result/:id", shujuguanli.getPortDataResultWechat) //微信查看数据
  app.post("/web-common-component/" + version + "/wechat/cust/batch/bind", shujuguanli.postMatchNodeDataWechat) //微信批量绑定
  /* 微信用户信息 end */

  // 淘宝权益
  app.get("/web-common-component/" + version + "/benefit/activities", zhudongyingxiao.benefitActiveGrid);
  app.get("/web-common-component/" + version + "/benefit/:shopId/activityDetail/:id", zhudongyingxiao.activityDetail);
  app.get("/web-common-component/" + version + "/benefit/Selector", zhudongyingxiao.benefitListGrid);
  app.get("/web-common-component/" + version + "/benefit/benefitTypes", zhudongyingxiao.benefitTypesList);
  app.post("/web-common-component/" + version + "/benefit/activityRelation", zhudongyingxiao.newActivityRelation);
  app.post("/web-common-component/" + version + "/benefit/activityRelation/:id", zhudongyingxiao.newActivityRelation);
  app.post("/web-common-component/" + version + "/benefit/activity", zhudongyingxiao.updateActivity);
  app.delete("/web-common-component/" + version + "/benefit/:shopId/activityDetail/:id", zhudongyingxiao.updateActivity);
  /*数据管理end*/

  /*通用化配置 start*/
  app.get("/category/type", metaConfiguration.categoryType)
  app.get("/category", metaConfiguration.category);
  app.get("/category/groupby/:id", metaConfiguration.queryCategoryGroupBy);
  app.post("/category/groupby", metaConfiguration.saveCategoryGroupBy);

  app.get("/queryitem/:id", metaConfiguration.modificationCategory);
  app.post("/category", metaConfiguration.postCategory);
  app.put("/category", metaConfiguration.putCategory);
  app.delete("/category/:id", metaConfiguration.deleteCategory);
  app.get("/queryitem", metaConfiguration.queryitem);
  app.delete("/queryitem/:id", metaConfiguration.deleteQueryitem);
  app.get("/subject/attribute/queryitem/querytype", metaConfiguration.queryConfigType);
  /*数据配置start*/
  app.get("/meta/register/tables", metaConfiguration.getTables);
  app.get("/meta/database/register/tables", metaConfiguration.getTablesLists);
  app.delete("/meta/database/register/table/:id", metaConfiguration.deleteTables);
  app.post("/meta/database/register/tables", metaConfiguration.postTables);
  app.get("/meta/database/tables/:id/mix/subject-column", metaConfiguration.getStateLists);
  app.get("/meta/database/tables", metaConfiguration.getUnTables);
  app.get("/meta/database/:id/tables/:id/columns", metaConfiguration.getTableColumn);
  app.get("/meta/database/tables/:id/columns", metaConfiguration.getColumns)
  app.get("/subject/attribute/queryitem/dictionary/type/:id", metaConfiguration.queryDictionary)
  app.get("/meta/dic", metaConfiguration.queryMetaDic);
  app.get("/meta/dic", metaConfiguration.queryMetaDic);
  app.get("/subject", metaConfiguration.getSubject);
  app.post("/subject", metaConfiguration.postSubject);
  app.delete("/subject/:id", metaConfiguration.deleteSubject);
  app.get("/meta/filter", metaConfiguration.getMetaFilter);
  app.delete("/meta/filter/:id", metaConfiguration.deleteMetaFilter);
  app.post("/meta/filter", metaConfiguration.postMetaFilter);
  app.get("/meta/filter/type", metaConfiguration.getMetaFilterType);
  app.get("/subject/:id/filter", metaConfiguration.getGlobalFilter);
  app.post("/meta/global", metaConfiguration.postGlobalParam);
  /*数据配置end/*
   /*订单配置开始*/
  app.get("/meta/order", metaConfiguration.queryOrderList);
  /*订单配置结束*/
  /*通用化配置 end*/

  /*数据配置 start*/
  //源数据配置
  app.get("/metas/physical/datasource/all", metaConfigNew.dataSource.get);
  //字段配置
  app.get("/metas/physical/register/table", metaConfigNew.field.getTablesData)
  app.get("/metas/physical/register/table/:id/column", metaConfigNew.field.getFieldData)
  app.get("/metas/physical/datasource/:id/table/:id/column", metaConfigNew.field.getColumnData)
  //表配置
  app.get("/metas/physical/register/table/page", metaConfigNew.tableConfig.getRegisterTable)
  app.get("/metas/physical/datasource/:id/table", metaConfigNew.tableConfig.getUnselectedTables)
  app.post("/metas/physical/register/table", metaConfigNew.tableConfig.saveSourceService)
  //分组模型
  app.get("/metas/segmentation", metaConfigNew.segmentation.get)
  app.post("/metas/segmentation", metaConfigNew.segmentation.post)
  app.delete("/metas/segmentation/:id", metaConfigNew.segmentation.delete)
  app.get("/metas/segmentation/:id", metaConfigNew.segmentation.getModifyData)
  //属性集配置
  app.get("/metas/attribute-collection/page", metaConfigNew.attribute.getList)
  //主题配置
  app.get("/metas/attribute-collection", metaConfigNew.subject.getAttributeList)
  app.get("/metas/attribute-collection/:id", metaConfigNew.subject.getAttributeList)
  app.post("/metas/subject", metaConfigNew.subject.post_attribute)
  app.get("/metas/attribute-collection", metaConfigNew.subject.getAttributeList)
  app.get("/metas/segmentation/:id/subject", metaConfigNew.subject.getList)
  app.get("/metas/subject", metaConfigNew.subject.getAll)
  app.get("/metas/subject/:id/attribute-collection", metaConfigNew.subject.getRelationAttributeList)
  app.get("/metas/attribute/collection", metaConfigNew.subject.getAttribute)
  app.post("/metas/subject/behavior", metaConfigNew.subject.post_relation)
  app.get("/metas/:id/subject/behavior", metaConfigNew.subject.getRelationList)
  //函数配置
  app.get("/metas/function/filed/datatype", metaConfigNew.functionAttribute.getDataType)
  app.post("/metas/function", metaConfigNew.functionAttribute.post)
  app.get("/metas/function/page", metaConfigNew.functionAttribute.getGrid)
  //过滤器配置
  app.post("/metas/filter", metaConfigNew.filter.post)
  app.get("/metas/filter/page", metaConfigNew.filter.getList)
  app.get("/metas/filter/subject/:id", metaConfigNew.filter.subjectOfFilter)
  //字典配置
  app.get("/metas/dic", metaConfigNew.dic.get)
  //查询节点配置
  //查询节点下的主题配置
  app.post("/metas/node/query/config/subject", metaConfigNew.findNode.subject.post)
  app.get("/metas/node/query/config/:id/subject", metaConfigNew.findNode.subject.getList)
  app.get("/metas/node/query/config/subject/:id", metaConfigNew.findNode.subject.get)
  app.delete("/metas/node/query/config/subject/:id", metaConfigNew.findNode.subject.delete)
  /*数据配置 end*/

  /*elm节点配置 start Added By 茅丹丹 2014-3-27*/
  //获取单个短信元数据配置的主题
  app.get(nodeRoot + "/node/sms/config/subject/:id", metaConfigNew.smsattribute.getSubjectById);
  //删除单个短信元数据配置的主题
  app.delete(nodeRoot + "/node/sms/config/subject/:id", metaConfigNew.smsattribute.deletesmsAttributeConfigById);
  //保存短信元数据配置的主题
  app.post(nodeRoot + "/node/sms/config/subject", metaConfigNew.smsattribute.postSubjectList);
  //获取元分组模型
  app.get(nodeRoot + "/node/sms/config/metasegment", metaConfigNew.smsattribute.getMetaSegmentList);
  //获取所有主题
  app.get(nodeRoot + "/node/sms/config/metasubject", metaConfigNew.smsattribute.getMetaSubjectList);
  //复杂--获取所有属性
  app.get(nodeRoot + "/node/sms/config/metaattribute", metaConfigNew.smsattribute.getMetaAttributeList);
  //单个-获取所有属性集
  app.get(nodeRoot + "/node/sms/config/metaattributecollection", metaConfigNew.smsattribute.getSimpleMetaAttributeList);
  //单个-获取某属性集的所有属性
  app.get(nodeRoot + "/node/sms/config/metaattributecollection/:id/metaattribute", metaConfigNew.smsattribute.getSimpleMetaAttributeListById);
  //获取所有短信元数据配置的主题
  app.get(nodeRoot + "/node/sms/config/subjects", metaConfigNew.smsattribute.getSmSSubjectsList);


  /*短信元数据配置 end Added By 茅丹丹 2014-3-24*/
  /*短信元数据配置 start Added By 茅丹丹 2014-3-27*/
  //获取单个短信元数据配置的主题
  app.get(nodeRoot + "/node/edm/config/subject/:id", metaConfigNew.edmattribute.getSubjectById);
  //删除单个短信元数据配置的主题
  app.delete(nodeRoot + "/node/edm/config/subject/:id", metaConfigNew.edmattribute.deleteEdmAttributeConfigById);
  //保存短信元数据配置的主题
  app.post(nodeRoot + "/node/edm/config/subject", metaConfigNew.edmattribute.postSubjectList);
  //获取元分组模型
  app.get(nodeRoot + "/node/edm/config/metasegment", metaConfigNew.edmattribute.getMetaSegmentList);
  //获取所有主题
  app.get(nodeRoot + "/node/edm/config/metasubject", metaConfigNew.edmattribute.getMetaSubjectList);
  //复杂--获取所有属性
  app.get(nodeRoot + "/node/edm/config/metaattribute", metaConfigNew.edmattribute.getMetaAttributeList);
  //单个-获取所有属性集
  app.get(nodeRoot + "/node/edm/config/metaattributecollection", metaConfigNew.edmattribute.getSimpleMetaAttributeList);
  //单个-获取某属性集的所有属性
  app.get(nodeRoot + "/node/edm/config/metaattributecollection/:id/metaattribute", metaConfigNew.edmattribute.getSimpleMetaAttributeListById);
  //获取所有短信元数据配置的主题
  app.get(nodeRoot + "/node/edm/config/subjects", metaConfigNew.edmattribute.getEdmSubjectsList);


  /*elm节点配置 end Added By 茅丹丹 2014-3-27  2014-4-9 失效*/
  /*红黑名单 优惠券 定向优惠节点配置 start Added By 茅丹丹 2014-4-3*/
  //备选的主题
  /*app.get("/web-common-component/checklist/subject/cadidates", metaConfigNew.subject.getCadidates);*/
  //保存 2014-4-3
  /*app.post("/web-common-component/checklist/subject",shujuguanli.postSubject);*/
  /*红黑名单 优惠券 定向优惠节点配置 end Added By 茅丹丹 2014-4-3 2014-4-9 失效*/

  /*红黑名单节点配置 start Added By 茅丹丹 2014-4-9 */
  //提交数据
  app.post(commonComponentRoot + "checklist/subject", shujuguanli.postNode);
  //获取属性
  app.get("/metas/subject/:subjectId/main-arributeset/attribute", shujuguanli.getAttributes);
  /*红黑名单节点配置 end Added By 茅丹丹  2014-4-9*/

  /*商品选择器 Added By 茅丹丹 2014-3-31*/
  app.post(commonComponentRoot + "/product/selector/search/page", Selector.products.getProductList);
  app.post("/selector/web/productselector", Selector.products.getProductList);
  app.post(commonComponentRoot + "/product/selector/search/shop/:shopId/numiid/:numIid/skus", Selector.products.getSkuList);
  //商品选择器-商品标准类目
  app.get(commonComponentRoot + "/product/selector/tenantId/:tenantId/shop/:shopId/standardcategory", Selector.products.getStandardCategoryByShopId);
  //根据标准类目CID与商品属性PID查询商品属性值信息列表
  app.get(commonComponentRoot + "/product/selector/tenantId/:tenantId/standardcategory/:cid/property/:pid/value", Selector.products.getPropertysByCidAndPid);
  //根据标准类目CID查询商品属性信息列表
  app.get(commonComponentRoot + "/product/selector/tenantId/:tenantId/standardcategory/:cid/property", Selector.products.getPropertysByCid);
  app.get(commonComponentRoot + "/product/selector/snapshoot/:snapshootId/product", Selector.products.getproductsBysnapshootId);
  //商品选择器-商品自定义类目
  app.get(commonComponentRoot + "/product/selector/tenantId/:tenantId/shop/:shopId/customcategory", Selector.products.getCustomcategory);
  app.get(commonComponentRoot + "/product/tag", Selector.products.getTags);
  //初始化查询条件 2014-4-4
  app.get(commonComponentRoot + "/product/selector/snapshoot/:snapshootId/condition", Selector.products.getCondition);
  //获取选中商品个数 2014-4-12
  app.get(commonComponentRoot + "/product/selector/snapshoot/:snapshootId/product/count", Selector.products.getProductCount);
  //初始化选中的商品列表 2014-4-7
  app.get(commonComponentRoot + "/product/selector/snapshoot/:snapshootId/product", Selector.products.getFindedProduct);
  //提交查询条件和选中列表 2014-4-7
  app.post(commonComponentRoot + "/product/selector", Selector.products.postSelector);

  /*商品选择器 Added By 茅丹丹 2014-3-31*/

  /*start 客户基本信息 Added By 茅丹丹 2014-4-17*/
  //客户基本信息查询
  app.get(datamanageRoot + "/customerinfo/find", shujuguanli.searchMembergrade);
  //单个客户基本信息查询
  app.get(datamanageRoot + "/customerinfo/customer/:customerno", shujuguanli.getCustomerByCustomerNo);
  //修改单个客户基本信息
  app.put(datamanageRoot + "/customerinfo/customer/update", shujuguanli.updateCustomerByCustomer);
  //客户订单
  app.get(datamanageRoot + "/customerinfo/order/:customerno/:shopid", shujuguanli.getOrderList);
  /*end 客户基本信息 Added By 茅丹丹 2014-4-17*/

  /*start 客户基本信息 Added By 茅丹丹 2014-6-5*/
  //客户基本信息-通用化客户信息显示字段接口
  app.get(datamanageRoot + "/customerinfo/metas/columns/:subjectId", shujuguanli.getCustomerCellsBySubjectId);
  //客户基本信息-通用化客户信息 查询条件接口
  app.get(datamanageRoot + "/customerinfo/metas/queryitmes/:subjectId", shujuguanli.getQueryitmesBySubjectId);
  //客户基本信息-通用化客户信息 平台接口
  app.get(datamanageRoot + "/customerinfo/metas/subjects", shujuguanli.getMetasSubjects);
  //客户基本信息-通用化客户信息 数据展示接口  2014-6-6
  app.get(datamanageRoot + "/customerinfo/metas/datas", shujuguanli.getMetasDatas);
  //查询基本信息和忠诚度信息
  app.get("/decathlon-custv/" + version + "/decathlon/custv/getCustv", shujuguanli.getCustomerInfo);
  //2、查询营销活动信息
  app.get("/decathlon-custv/" + version + "/decathlon/custv/getActivities", shujuguanli.getActivities);
  //3、查询营销活动汇总信息
  app.get("/decathlon-custv/" + version + "/decathlon/custv/getActSummary", shujuguanli.getActSummary);
  //客户基本信息-通用化客户信息 传递查询参数接口 2014-6-17
  app.post(datamanageRoot + "/customerinfo/metas/conditions", shujuguanli.postConditions)
  //客户基本信息-通用化客户信息修改信息 2014-6-17
  app.get(datamanageRoot + "/customerinfo/customer", shujuguanli.editorInfos)
  //客户基本信息-通用化客户查看客户订单2014-6-17
  app.get(datamanageRoot + "/customerinfo/order", shujuguanli.openCustmerOrder)
  /*end 客户基本信息 Added By  茅丹丹 2014-6-5*/


  /*客户分组配置 start*/
  //app.get(nodeRoot + "/node/group/category", customerGroup.getGroupCategory); // 分类ztree
  //app.get(nodeRoot + "/node/group/category/:id", customerGroup.getGroupCategory); // 分类ztree
  //app.post(nodeRoot + "/node/group/category", customerGroup.addGroupCategory); // 增加分类
  //app.put(nodeRoot + "/node/group/category", customerGroup.putGroupCategory); // 修改分类
  //app.delete(nodeRoot + "/node/group/category/:id", customerGroup.deleteGroupCategory); // 删除分类
  //app.get(nodeRoot + "/node/group/list", customerGroup.getGroupCategoryList); // 获取分类列表
  // app.get(nodeRoot + "/node/group/list/category/:id/:tenantId", customerGroup.getGroupCategoryListById); // 获取分类列表 by Id
  app.get(nodeRoot + "/node/group/list/category/all/:id/:tenantId", customerGroup.getGroupCategoryListById); // 获取分类列表 by Id
  //app.delete(nodeRoot + "/node/group/customerGroupnode/group/customerGroup/:id", customerGroup.deleteCustomerGroup); // 获取分类列表
  //app.get(nodeRoot + "/node/group/customerGroup/new", customerGroup.addCustomerGroup); // 添加分组
  //app.put(nodeRoot + "/node/group/customerGroup", customerGroup.putCreateGroup); // 创建保存分类
  //app.get(nodeRoot + "/node/group/customerGroup/:id", customerGroup.editorCustomerGroup); // 编辑分组
  // app.get(nodeRoot + "/node/group/result", customerGroup.DataTables);//查看数据
  /*客户分组配置 end*/


  // 客户分组节点
  app.get(nodeRoot + "/node/group/:id", node.openCustomerGroupNode);
  app.put(nodeRoot + "/node/group/", node.postCustomerGroupSave);

  //通用化选择器
  app.get("/commons/select/subject/:id", commSelector.getCommons);
  app.post("/commons/select/subject/:id/listdata", commSelector.getList);

  //活动选择器
  app.get(nodeRoot + "/campaign/selector/node", customerGroup.getActivityNodeList);
  app.get(nodeRoot + "/campaign/selector/:id", customerGroup.getStoreActivity);
  app.post(nodeRoot + "/campaign/selector", customerGroup.postActivityNodeList);

  //效果评估
  app.get(campaignRoot + "/report/evaluate/customergroup", zhudongyingxiao.getCustomerGroups);//获取目标组节点
  app.get(campaignRoot + "/report/evaluate/channelnode", zhudongyingxiao.getChannelNodes)//获取渠道节点
  app.post(campaignRoot + "/report/evaluate/total", zhudongyingxiao.evaluateTotal)//获取汇总效果跟踪报表
  app.get(campaignRoot + "/report/evaluate/day", zhudongyingxiao.evaluateDay)//获取按日效果跟踪报表

  //微营销中心
  app.get("/module/microMarketing/:id", microMarketing.toRealUrl);//获取店铺真实链接；

  //迪卡侬
  app.get(commonComponentRoot + "/product/selector/:id/edecathlon/tree", dashboard.edecathlonTree);
  app.get(commonComponentRoot + "/product/selector/:subjectId/search/product/edecathlon", dashboard.edecathlonChoosePro);
  app.get(commonComponentRoot + "/decathlon/bi/getDirectUrl", zhudongyingxiao.edecathlonBI);

};
