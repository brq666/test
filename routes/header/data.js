/*
 * GET header listing.
 */
/*var contactData={//联系人数据信息，可动态改变
 "exists":false,
 "contact": {
 "fullName":"jiang",
 "email":"email",
 "mobile":"13817466666",
 "qq":"44556677",
 "wangwang":"wangwang",
 "weibo":"weibo@sina.com.cn"
 }
 };*/


module.exports = {
  "login": function (req, res) {//登入信息
    res.send({
      "needLogin": false,
      "loginUser": {"id": 1, "userName": "remark", "loginName": "remark"},
      "pop": true,
      "loginUrl": "http://localhost:3000"
    });
  },
  "logout": function (req, res) {
    res.send({
      "status": "success",
      "message": "logout success"
    });
  },
  "nav": function (req, res) {//导航菜单数据
    res.send({
      "name": "",
      "key": "nav", "id": 10,
      "children": [
        {
          "name": "首页",
          "key": "nav/shopHealth_link",
          "id": 12,
          "children": [],
          "tip": null,
          "dataUrl": null,
          "url": "/app/modules/dashboard/index.html",
          "supportOps": "CDWRV"
        },
        {
          "name": "营销活动",
          "key": "nav/marketing_link",
          "id": 15,
          "children": [],
          "tip": null,
          "dataUrl": null,
          "url": "/app/modules/marketing/index.html#/view/marketActivity",
          "supportOps": "CDWRV"
        },
        {
          "name": "微营销中心",
          "key": "nav/customerManage_link",
          "id": 17,
          "children": [],
          "tip": null,
          "dataUrl": null,
          "url": "/app/modules/microMarketing/index.html#/view/microMarketing",
          "supportOps": "CDWRV"
        },
        {
          "name": "数据管理",
          "key": "nav/promotions_link",
          "id": 16,
          "children": [],
          "tip": null,
          "dataUrl": null,
          "url": "/app/modules/dataManagement/index.html#/view/rfmTarget",
          "supportOps": "CDWRV"
        },
        {
          "name": "系统管理",
          "key": "nav/promotions_link",
          "id": 16,
          "children": [],
          "tip": null,
          "dataUrl": null,
          "url": "/app/modules/systemManage/index.html#/view/systemAccount",
          "supportOps": "CDWRV"
        },
        {
          "name": "通用化配置",
          "key": "nav/promotions_link",
          "id": 16,
          "children": [],
          "tip": null,
          "dataUrl": null,
          "url": "/app/modules/configuration/index.html#/view/dataConfigureSubject",
          "supportOps": "CDWRV"
        },
        {
          "name": "电话模块嵌入",
          "key": "nav/promotions_link",
          "id": 17,
          "children": [],
          "tip": null,
          "dataUrl": "http://www.taobao.com/",
          "url": "/app/modules/insert/index.html#/phone",
          "supportOps": "CDWRV"
        },
        {
          "name": "全体嵌入",
          "key": "nav/promotions_link",
          "id": 17,
          "children": [],
          "tip": null,
          "dataUrl": "http://www.asas.com/",
          "url": "/app/modules/insert/index.html#/2121",
          "supportOps": "CDWRV"
        },
        {
          "name": "个性化包裹",
          "key": "nav/promotions_link",
          "id": 17,
          "children": [],
          "tip": null,
          "dataUrl": null,
          "url": "/app/modules/personalized/index.html",
          "supportOps": "CDWRV"
        }
      ],
      "tip": null,
      "dataUrl": null,
      "url": null,
      "supportOps": "CDWRV"
    });
  },
  "number": function (req, res) {
    // 联合营销提示数字
    res.send({
      "count": "3"
    });
  },
  "recharge": function (req, res) {//账号管理数据
    res.send({
      "code": 0,
      "status": "ok",
      "visit": "2013-04-09 12:00:00",
      "data": {
        "rechargeUrl": "http://www.yunat.com"
      }
    })
  },
  "contact": function (req, res) {//联系人数据
    var contactData = {//联系人数据信息，可动态改变
      "exists": false,
      "contact": {
        "fullName": "jiang",
        "email": "email",
        "mobile": "13817466666",
        "qq": "44556677",
        "wangwang": "wangwang",
        "weibo": "weibo@sina.com.cn"
      }
    };
    res.send(contactData);
  },
  "contactSave": function (req, res) {//联系人数据保存
    contactData = {//改变get数据
      "exists": true,
      "contact": {
        "fullName": req.body.fullName,
        "email": "email",
        "mobile": req.body.mobile,
        "qq": "44556677",
        "wangwang": "wangwang",
        "weibo": "weibo@sina.com.cn"
      }
    };
    res.send(
      {"status": "ok", "code": "200", "data": []}
    );
  },
  "notices": function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({
      "total": 9,
      "message": "",
      "page": 1,
      "data": [{
        "content": "尊敬的数据赢家用户：<br>\n您好！<br>\n&nbsp;&nbsp;&nbsp;&nbsp;淘宝对卡券平台发券接口做了相应调整，目前发送速度非常慢，而即将到来的年货节也是一轮优惠券发送高峰，鉴于此情况数云诚恳的建议您继续<a href=http://help.fenxibao.com/ccms6/?p=3343 target=_blank >通过内容管理发领取式优惠券</a>或者其他方式来让买家领取实现活动效果。如有优惠券最新进展数云亦会继续同步通知。<br>\n如有疑问，欢迎联系客服咨询<br>\n数据赢家客服团队",
        "sysType": 1,
        "title": "【提醒】关于淘宝对卡券平台发券接口调整优惠券发送建议",
        "noticeId": "16011264721",
        "status": 0,
        "created": "2016-01-12 17:06:05",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br>\n您好！<br>\n&nbsp;&nbsp;&nbsp;&nbsp;数据管理模块下“微信用户”和“微信公众号管理”功能为避免误操作导致损失，目前平台这两个功能的权限默认为不勾选，若有帐号需要对这两个功能做操作，则需root账号分配相应权限<a href=http://help.fenxibao.com/ccms6/?p=4649 target=_blank >详见具体操作</a>，给您带来的不便，敬请谅解。<br>\n如有疑问，欢迎联系客服咨询<br>\n数据赢家客服团队<br>",
        "sysType": 1,
        "title": "【提醒】数据管理模块下“微信用户”和“微信公众号管理”功能不可见的说明",
        "noticeId": "16010774105",
        "status": 0,
        "created": "2016-01-07 12:00:57",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br>\n您好！<br>\n&nbsp;&nbsp;&nbsp;&nbsp;平台将在2016年1月6号22时至7号01时进行版本6.20的发布维护，期间平台无法登录和操作，请您尽量避开在维护的时间段内执行短信、EDM、优惠券等渠道节点。给您带来的不便，敬请谅解。<br>\n本次发布主要内容如下：<br>\n1、主动营销—营销活动—目标客户筛选类型下新增“优惠券使用查询”节点和“定向优惠使用查询”节点；<a href=http://help.fenxibao.com/ccms6/?p=3293 target=_blank >进入帮助链接</a> <br>\n2、修复目标组如果人数为20000的倍数，则下载的文件会少一条记录；<br>\n3、修复EDM节点无法上传邮件的问题；<br>\n4、优化查询节点的商品选择器“在售商品”查询和商品选择器整体性能；<br>\n5、优化短信节点生成自定义短链的性能。<br>\n如有疑问，欢迎联系客服咨询<br>\n数据赢家客服团队",
        "sysType": 2,
        "title": "【发布】1月6日晚6.20版本发布维护通知",
        "noticeId": "16010652839",
        "status": 0,
        "created": "2016-01-06 15:18:13",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br>\n您好！<br>\n&nbsp;&nbsp;&nbsp;&nbsp;平台将在2016年1月5号18时~19时进行忠诚度V1.9.0版本发布，期间只有手淘积分兑换的手机页面会有5分钟无法使用，不会影响到您操作和登录数云平台。<br>\n本次优化发布主要内容如下：<br>\n1、等级规则设置的过滤器条件设置增加“累积订单金额（不含邮费）、单笔订单金额（不含邮费）”的选项；<br>\n2、积分池连接池性能；<br>\n3、其他界面优化。<br>\n如有疑问，欢迎联系客服咨询<br>\n数据赢家客服团队",
        "sysType": 2,
        "title": "【发布】1月5日晚忠诚度V1.9.0版本发布内容通知",
        "noticeId": "16010580697",
        "status": 0,
        "created": "2016-01-05 15:33:26",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br>\n&nbsp;&nbsp;&nbsp;&nbsp;大家好！<br>\n为更好了解您对我们产品和服务反馈，我司将开展为期2周（2016年1月4日-1月15日）的满意度问卷收集工作帮助提升产品，优化服务。很荣幸邀请到您用几分钟时间帮忙填答这份问卷，本问卷所有数据仅用于统计分析，请您放心填写。您的反馈是我们持续改善产品和服务的动力，谢谢您的帮助与支持！<a href=https://www.wenjuan.com/s/iYNZBj/ target=_blank >问卷地址</a>\n 并为感谢您对我们信息反馈，我们已准备红包及实物奖品，快来填写赢取小奖品吧！<br>\n如有疑问，欢迎联系客服咨询<br>\n数据赢家客服团队",
        "sysType": 2,
        "title": "【重要公告】填问卷 赢红包（数云2015下半年满意度调研）",
        "noticeId": "16010516973",
        "status": 0,
        "created": "2016-01-05 11:38:01",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br> \n您好！<br> \n&nbsp;&nbsp;&nbsp;&nbsp;2016年即将来临，亲们如需对2015年充值、打款等款项要开票的，请及时在账户管理下的发票管理申请，申请后将会有专人为您处理开票事宜。<br> \n同时请您注意：【开票时间是从充值、打款成功开始,截止至第三个月的最后一天（从打款时的月份算起）,过后就不能再开票了】。&nbsp;即15年10月的充值、打款等款项发票申请时间截止15年12月31日18点；&nbsp;15年11月和12月的充值、打款等款项发票申请由于跨年财务结算影响故统一截止时间到2016年1月31日18点，逾期概不处理2015年开票事宜。<br> \n非常感谢大家对我们的支持！<br> \n数据赢家客服团队<br> ",
        "sysType": 2,
        "title": "【重要提醒】关于2015年充值、打款等需要开票相关事宜的截止时间通知",
        "noticeId": "15122919630",
        "status": 0,
        "created": "2015-12-29 17:59:18",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br> \n您好！<br> \n&nbsp;&nbsp;&nbsp;&nbsp;平台将在2015年12月29日22:00-30日01:00对订单中心、客服中心和个性化包裹进行版本6.4.8发布维护，期间这3个模块和历史数据导入功能无法使用，给您带来的不便，敬请谅解。<br> \n本次发布内容如下：<br> \n1、订单中心和客服中心增加对短信内容特殊字符串的校验；<br> \n2、客服中心增加物流公司：韵达快递；<br> \n3、个性化包裹解决“多个订单进行中”误备注的问题；<br> \n如有疑问，欢迎咨询客服<br> \n数据赢家客服团队",
        "sysType": 2,
        "title": "【维护】12月29日晚订单中心、客服中心和个性化包裹发布维护通知 ",
        "noticeId": "15122956349",
        "status": 0,
        "created": "2015-12-29 15:09:54",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br>\n您好！<br>\n&nbsp;&nbsp;&nbsp;&nbsp;根据国家相关部门规定，数云2016年元旦放假时间安排如下：<br>\n2016年1月1日至2016年1月3日放假，1月4日正常上班。<br>\n数据赢家客服团队服务时间安排如下<br>\n2016.1.1日全体公休<br>\n2016.1.2日—1.3日值班时间9:00—18:00<br>\n2016.1.4日起恢复9:00—21:00<br>\n祝您在2016年工作顺利！财源滚滚！<br>\n数据赢家客服团队<br>",
        "sysType": 2,
        "title": "【公告】2016年元旦放假和客服服务时间调整通知",
        "noticeId": "15122873628",
        "status": 0,
        "created": "2015-12-28 09:27:22",
        "userName": "标准版6.0全部"
      }, {
        "content": "尊敬的数据赢家用户：<br>\n您好！<br>\n&nbsp;&nbsp;&nbsp;&nbsp;平台将在2015年12月22日22:00-23日01:00对订单中心、客服中心和个性化包裹进行优化维护，期间这3个模块和历史数据导入功能无法使用，维护后“订单中心”及“客服中心”物流相关数据获取将恢复为每天（0、7、9、10、11、13、15、17、19、21时）共10个时间点更新。给您带来的不便，敬请谅解。<br> \n如有疑问，欢迎联系客服咨询<br>\n数据赢家客服团队<br>",
        "sysType": 2,
        "title": "【维护】“订单中心”及“客服中心”物流相关数据更新说明（三）",
        "noticeId": "15122270921",
        "status": 0,
        "created": "2015-12-22 13:56:09",
        "userName": "标准版6.0全部"
      }],
      "success": true
    })
  },
  "noticesimple": function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(
      [{
        "id": "14",
        "isRead": false,
        "title": "1【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知【公告】双十一系统活动模板上线通知线通知【公告】双十一系统活动模板上线通知",
        "date": "2012-10-21 19:37:39",
        "content": null
      },
        {"id": "18", "isRead": false, "title": "2", "date": "2014-03-19 09:36:37", "content": null},
        {"id": "12", "isRead": false, "title": "3", "date": "2014-04-19 10:35:33", "content": null},
        {"id": "11", "isRead": false, "title": "4", "date": "2014-05-17 19:34:23", "content": null},
        {"id": "10", "isRead": true, "title": "5", "date": "2014-01-19 12:33:47", "content": null}]
    );
  },
  "marketKpi": function (req, res) {
    var interval = req.query.interval
    switch (interval) {
      case "360":

        var data = {
          marketCustomers: 0,      //营销人数
          marketSucess: 0,            //成功营销
          marketCost: 0,         //营销成本
          marketBenefits: 0,        //营销收益
          messagNum: 0,             //短信发送
          emailNum: 0,            //邮件发送
          couponNum: 0,           //优惠劵
          directionalCoupon: 0   //定向优惠劵

        }
        break;
      case "7":
        var data = {
          marketCustomers: 10,      //营销人数
          marketSucess: 0,            //成功营销
          marketCost: 20,         //营销成本
          marketBenefits: 80,        //营销收益
          messagNum: 70,             //短信发送
          emailNum: 0,            //邮件发送
          couponNum: 100,           //优惠劵
          directionalCoupon: 40   //定向优惠劵

        }
        break;
      default :
        var data = {
          marketCustomers: 10,      //营销人数
          marketSucess: 5,            //成功营销
          marketCost: 200000,         //营销成本
          marketBenefits: 800,        //营销收益
          messagNum: 5000,             //短信发送
          emailNum: 2000,            //邮件发送
          couponNum: 3999,           //优惠劵
          directionalCoupon: 4999   //定向优惠劵

        }
    }
    res.send(data);
  },
  "channelSend": function (req, res) {
    var interval = req.query.interval
    switch (interval) {
      case "360":
        var data = []
        break;
      case "7":
        var data = [{"type": "EDM", "total": "22"}, {"type": "短信", "total": "22"}]
        break;
      default :
        var data = [
          {type: "短信", total: 5000},
          {type: "EDM", total: 2000},
          {type: "优惠券", total: 3999},
          {type: "定向优惠", total: 4999}
        ]

    }
    res.send(data);
  },
  campaignkpi: function (req, res) {
    var interval = req.query.interval
    switch (interval) {
      case "30":
        var data = {
          investmentCustomerNum: 0,
          investmentTotalCash: 0.5,
          returnCustomerNum: 0,
          returnTotalCash: 100,
          roi: "5:18"
        }
        break;
      case "7":
        var data = {
          investmentCustomerNum: 10,
          investmentTotalCash: 2,
          returnCustomerNum: 0,
          returnTotalCash: 5,
          roi: "2:43",
          created: 1414491741634
        }
        break;
      default :
        var data = {
          investmentCustomerNum: 98754898,
          investmentTotalCash: 178459.53,
          returnCustomerNum: 65487354,
          returnTotalCash: 67846.21,
          created: 1414491741634,
          roi: "1:200"
        }

    }
    res.send(data);
  },
  'itemNotices': function (req, res) {
    res.send(
      {"message": "操作成功!", "success": true}
    )
  }
};
