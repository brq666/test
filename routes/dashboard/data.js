
/*
 * GET dashboard listing.
 */
var moment = require('moment');

module.exports = {
  "cityselector": function (req, res) {//系统信息
    res.send({
      "code": 1,
      "msg": "获取数据成功!",
      "list": [
        {
          "pkid": "3",
          "code": "BT",
          "name": "拔佳",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "BT",
          "children": [
            {
              "pkid": "4",
              "code": "CL",
              "name": "其乐",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            },
            {
              "pkid": "422",
              "code": "CL",
              "name": "其乐2",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            }
          ]
        },
        {
          "pkid": "10",
          "code": "MB",
          "name": "美丽宝",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "MB"
        },
        {
          "pkid": "13",
          "code": "SD",
          "name": "森达",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "SD"
        },
        {
          "pkid": "15",
          "code": "TM",
          "name": "天美意",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "TM"
        },
        {
          "pkid": "16",
          "code": "TT",
          "name": "他她",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "TT"
        },
        {
          "pkid": "2955",
          "code": "0",
          "name": "行政架构",
          "level": "0",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "0"
        },
        {
          "pkid": "4064",
          "code": "AD",
          "name": "阿迪达斯",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "AD"
        },
        {
          "pkid": "4065",
          "code": "AS",
          "name": "阿迪达斯休闲",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "AS"
        },
        {
          "pkid": "4067",
          "code": "AK",
          "name": "阿迪达斯小童",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "AK"
        },
        {
          "pkid": "4069",
          "code": "CV",
          "name": "匡威",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "CV"
        },
        {
          "pkid": "4072",
          "code": "TB",
          "name": "添柏岚",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "TB"
        }
      ]
    });
  },
  "category": function (req, res) {
    res.send({
      "register": {
        id: 2,
        name: "女装"
      },
      "deriveList": [{
        id: 1,
        name: "化妆品"
      }, {
        id: 2,
        name: "女装"
      }]
    });
  },
  "salesAmunt": function (req, res) {
    res.send({
      "statisTime": "2015-7-13",
      "month": ["201301", "201302", "201303", "201304", "201305", "201306", "201307", "201308", "201309", "201310", "201311", "201312"],
      "figure": [{
        "type": "salesAmoutBackShop",
        "name": "店铺回头购买金额",
        "data": [2000.0, 3000.0, 4000.0, 5000.0, 6000.0, 7000.0, 8000.0, 9000.0, 5000.0, 5000.0, 4000.0, 3000.0]
      }, {
        "type": "salesRateShop",
        "name": "店铺回头购买率",
        "data": [9.9, 7.5, 10.64, 12.92, 14.4, 17.6, 3.56, 14.85, 21.64, 49.41, 75.6, 54.4]
      }, {
        "type": "salesAmoutFirstShop",
        "name": "店铺首次购买金额",
        "data": [200.0, 300.0, 400.0, 500.0, 600.0, 700.0, 800.0, 900.0, 500.0, 500.0, 400.0, 600.0]
      }, {
        "type": "salesBackRateIndustry",
        "name": "行业回购购买率",
        "data": [49.9, 71.5, 10.64, 12.92, 14.4, 17.6, 3.56, 14.85, 21.64, 19.41, 25.6, 54.4]
      }]
    });
  },
  "reBuy": function (req, res) {
    res.send({
      "statisTime": "2015-7-13",
      "month": ["201401", "201402", "201403", "201404", "201405", "201406", "201407", "201408", "201409", "201410", "201411", "201412"],
      "figure": [{
        "type": "buybackShopGuestsNum",
        "name": "店铺重复购买客人数",
        "data": [200000.0, 30000.0, 40000.0, 500000.0, 600000.0, 700000.0, 500000.0, 600000.0, 500000.0, 500000.0, 400000.0, 300000.0, 800000.0]
      }, {
        "type": "buybackShopRate",
        "name": "店铺重复购买率",
        "data": [29.9, 71.5, 10.64, 12.92, 14.4, 17.6, 13.56, 14.85, 21.64, 19.41, 95.6, 54.4, 90.0]
      }, {
        "type": "buybackIndustryGuestsNum",
        "name": "行业重复购买人数",
        "data": [200.0, 300.0, 400.0, 500.0, 600.0, 700.0, 800.0, 900.0, 500.0, 500.0, 400.0, 600.0, 900]
      }, {
        "type": "buybackIndustryRate",
        "name": "行业重复购买率",
        "data": [29.9, 71.5, 10.64, 12.92, 14.4, 17.6, 1.56, 14.85, 21.64, 19.41, 95.6, 54.4, 90.0]
      }]
    });
  },
  "nodejsurl": function (req, res) {
    res.send({
      'url': 'http://notifications.api.shuyun.com/'
    });
  },
  "defaultModules": function (req, res) {//首页默认模板
    res.send({
      "left": [{
        "id": 1,
        "name": "CRM销售贡献",
        "url": "templates/homepage/module/views/crmKpi.html",
        "order": 1
      }, {
        "id": 1,
        "name": "CRM销售贡献",
        "url": "templates/homepage/module/views/salesPerformance.html",
        "order": 1
      }, {
        "id": 2,
        "name": "营销活动KPI",
        "url": "templates/homepage/module/views/marketingKpi.html",
        "order": 2
      }/*,
        {"id":2,"name":"通道监控","url":"templates/homepage/module/views/channelMoniter.html","order":2}*/
      ],
      "right": [{
        "id": 1,
        "name": "店铺信息",
        "url": "templates/homepage/module/views/shopInfo.html",
        "order": 1
      }, {
        "id": 2,
        "name": "快捷入口",
        "url": "templates/homepage/module/views/fastEnter.html",
        "order": 2
      }, {
        "id": 3,
        "name": "广告位一",
        "url": "templates/homepage/module/views/adsBanner.html",
        "order": 3
      },/* {
        "id":4,
        "name":"新手帮助","url":"templates/homepage/module/views/newerHelp.html",
        "order":4
      },*/
      {
        "id": 4,
        "name": "通道余额",
        "url": "templates/homepage/module/views/balance.html",
        "order": 4
      }
      ]
    });
  },
  "simpleView": function (req, res) {//系统信息
    res.send(
      [
        {
          "id": "11",
          "isRead": false,
          "title": "【公告】系统升级优化维护通知  ",
          "date": "2014-03-31 15:29:30",
          "content": ""
        },
        {
          "id": "10",
          "isRead": false,
          "title": "【公告】数据赢家清明放假和客服服务时间调整通知",
          "date": "2014-03-31 14:13:44",
          "content": ""
        }
      ])
  },
  "pagedView": function (req, res) {//系统信息更多
    var page = req.query.page
    res.send({
      "total": 110,
      "page": page,
      "data": [
        {
          "id": page + "_" + 1,
          "isRead": false,
          "title": page + "_" + 1 + "【公告】系统升级优化维护通知",
          "date": "2014-03-31 15:29:30",
          "content": ""
        },
        {
          "id": page + "_" + 2,
          "isRead": true,
          "title": page + "_" + 2 + "【公告】数据赢家清明放假和客服服务时间调整通知",
          "date": "2014-03-31 14:13:44",
          "content": ""
        }
      ]
    });
  },
  "clearNotices": function (req, res) {
    res.send({})
  },
  "deleteNotices": function (req, res) {
    var data = req.body
    res.send(data)
  },
  "notice": function (req, res) {//点击信息详情
    res.send({
      "id": "9",
      "isRead": true,
      "title": "双十一之后的客户维系指南——疯狂后的平静！",
      "date": "2014-03-26 10:00:57",
      "content": "尊敬的数据赢家客户：<br>大家好！<br>由于短信通道在监管，提交的批量短信需经过人工审核，并且延迟严重......."
    });
  },
  "advert": function (req, res) {//轮播图片
    res.send(
      [
        { "img": "../../images/dashboard/images_ad.jpg", "href": "http://href1", "index": "0" }, { "img": "../../images/dashboard/images_ad.jpg", "href": "http://href1", "index": "1" },
        { "img": "../../images/dashboard/images_ad.jpg", "href": "http://href2", "index": "2" },
        { "img": "../../images/dashboard/images_ad.jpg", "href": "http://href3", "index": "3" },
        { "img": "../../images/dashboard/images_ad.jpg", "href": "http://href3", "index": "3" }
      ]
    );
  },
  "shopinfo": function (req, res) {//店铺信息
    //前端有做过期禁用期判断 为了保证不过期，加7天
    var expire = moment().add(7, 'days').format('YYYY-MM-DD');

    res.send(
      {
        "shop": [
          { "shopId": "1", "shopName": "淘宝店铺", "lastUpdateTime": "2013-07-07 14:14:14", "earliestTime": "2014-04-10 14:14:14", "pltType": "plt_taobao_shop", "shopExpiration": "2013-07-07", "sessionKeyExpiration": "2015-07-07" },
          { "shopId": "2", "shopName": "一号店店铺", "lastUpdateTime": "2013-07-07 14:14:14", "earliestTime": "2014-04-10 14:14:14", "pltType": "plt_yhd_shop", "shopExpiration": "2013-07-07", "sessionKeyExpiration": "0" },
          { "shopId": "3", "shopName": "京东店铺京东店铺京东店铺京东店铺", "lastUpdateTime": "2013-07-07 14:14:14", "earliestTime": "2014-04-10 14:14:14", "pltType": "plt_jd_shop", "shopExpiration": "2013-07-07", "sessionKeyExpiration": "0" },
          { "shopId": "4", "shopName": "淘宝店铺", "lastUpdateTime": "2013-07-07 14:14:14", "earliestTime": "2014-04-10 14:14:14", "pltType": "plt_taobao_shop", "shopExpiration": "2013-07-07", "sessionKeyExpiration": "0" },
          { "shopId": "5", "shopName": "拍拍店铺", "lastUpdateTime": "2013-07-07 14:14:14", "earliestTime": "2014-04-10 14:14:14", "pltType": "plt_paipai_shop", "shopExpiration": "2013-07-07", "sessionKeyExpiration": "0" },
          { "shopId": "6", "shopName": "当当店铺", "lastUpdateTime": "2013-07-07 14:14:14", "earliestTime": "2014-04-10 14:14:14", "pltType": "plt_dd_shop", "shopExpiration": "0", "sessionKeyExpiration": "0" }

        ],
        "version": "基础版",
        "version_code": "0-PD",
        "tenant_id": "qiushi6",
        "expire": expire,
        "recharge": "http://xxx/xxx/xxx",
        "wangwang": "http://www.taobao.com/webww/ww.php?ver=3&touid=%E6%95%B0%E6%8D%AE%E8%B5%A2%E5%AE%B6&siteid=cntaobao&status=1&charset=utf-8",
        "wangwangqun": "32324234",
        "qq": "http://wpa.qq.com/msgrd?v=3&uin=800016177&site=qq&menu=yes"
      }
    )

  },
  "helpinfo": function (req, res) {//店铺帮助
    res.send(
      [
        {
          "title": "如何建立客户二次营销活动,提升重复购买率?",
          "href": "http://help.fenxibao.com/ccmsbase/?cat=20",
          "postTime": "2013-09-26 13:28:02",
          "showIndex": 1
        },
        {
          "title": "如何进行催付和物流关怀提升付款率?",
          "href": "http://help.fenxibao.com/ccmsbase/?p=139",
          "postTime": "2013-09-26 13:28:02",
          "showIndex": 2
        }
      ]
    );
  },
  "nodejsurl": function (req, res) {
    res.send({ url: "http://localhost:3000/" });
  },
  "helplink": function (req, res) {
    res.send({ url: "http://www.baidu.com" });
  },
  "SSOlink": function (req, res) {
    res.send();
  },
  "static": function (req, res) {//快捷入口
    res.send(
      {
        "WAIT_ME_DESIGN": 10,//等待我设计的
        "WAIT_ME_APPROVE": 1,//等待我审批的
        "VISABLE_EXECUTING": 10,//我可见的执行中的活动数量
        "VISABLE_WAIT_EXECUTE": 0,//我可见的等待执行的活动数量
        "VISABLE_ERROR": 0//我可见的出错的活动数量
      }
    );
  },
  "sendStatic": function (req, res) {//通道监控 7天数据和30天数据
    var resData;
    if (req.query.interval == 7) {
      resData = [
        { "sendDate": "2013-06-01", "tcommunicateSMS": "200", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-02", "tcommunicateSMS": "220", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-06", "tcommunicateSMS": "122", "tcommunicateEDM": "123" }
      ]
    } else if (req.query.interval == 30) {
      resData = [
        { "sendDate": "2013-06-01", "tcommunicateSMS": "100", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-02", "tcommunicateSMS": "220", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "500", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "600", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-03", "tcommunicateSMS": "272", "tcommunicateEDM": "123" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "633", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-04", "tcommunicateSMS": "222", "tcommunicateEDM": "13" },
        { "sendDate": "2013-06-05", "tcommunicateSMS": "292", "tcommunicateEDM": "163" },
        { "sendDate": "2013-06-06", "tcommunicateSMS": "122", "tcommunicateEDM": "123" }
      ]
    };
    res.send(resData);
  },
  "balance": function (req, res) {//通道余额
    res.send(
      [
        {
          "channelId": "51",
          "channelName": "短信通道",
          "recharge": "http://recharge.fenxibao.com/channel-recharge/accountManage/recharge?opt_name=0_taobao_68984019_0&client_id=100022&interface=accountManage×tamp=1397182692822&sign=21267f3607acde68f2cfeb52ddc4c66b",
          "overAmount": 23709
        },
        {
          "channelId": "52",
          "channelName": "邮件通道",
          "recharge": "http://recharge.fenxibao.com/channel-recharge/accountManage/recharge?opt_name=0_taobao_68984019_0&client_id=100022&interface=accountManage×tamp=1397182692822&sign=21267f3607acde68f2cfeb52ddc4c66b",
          "overAmount": 1
        },
        {
          "channelId": "532",
          "channelName": "邮件通道1",
          "recharge": "http://recharge.fenxibao.com/channel-recharge/accountManage/recharge?opt_name=0_taobao_68984019_0&client_id=100022&interface=accountManage×tamp=1397182692822&sign=21267f3607acde68f2cfeb52ddc4c66b",
          "overAmount": 1
        },
        {
          "channelId": "152",
          "channelName": "邮件通道2",
          "recharge": "http://recharge.fenxibao.com/channel-recharge/accountManage/recharge?opt_name=0_taobao_68984019_0&client_id=100022&interface=accountManage×tamp=1397182692822&sign=21267f3607acde68f2cfeb52ddc4c66b",
          "overAmount": 1
        },
        {
          "channelId": "521",
          "channelName": "邮件通道3",
          "recharge": "http://recharge.fenxibao.com/channel-recharge/accountManage/recharge?opt_name=0_taobao_68984019_0&client_id=100022&interface=accountManage×tamp=1397182692822&sign=21267f3607acde68f2cfeb52ddc4c66b",
          "overAmount": 1
        },
        {
          "channelId": "53",
          "channelName": "邮件通道4",
          "recharge": "http://recharge.fenxibao.com/channel-recharge/accountManage/recharge?opt_name=0_taobao_68984019_0&client_id=100022&interface=accountManage×tamp=1397182692822&sign=21267f3607acde68f2cfeb52ddc4c66b",
          "overAmount": 1
        },
        {
          "channelId": "52",
          "channelName": "邮件通道5",
          "recharge": "http://recharge.fenxibao.com/channel-recharge/accountManage/recharge?opt_name=0_taobao_68984019_0&client_id=100022&interface=accountManage×tamp=1397182692822&sign=21267f3607acde68f2cfeb52ddc4c66b",
          "overAmount": 1
        }
      ]
    );
  },
  "accountLink": function (req, res) {
    res.send()
  },
  "saleskpi": function (req, res) {
    var interval = req.query.interval
    switch (interval) {
      case "7":
        var data = {
          created: 1414493303335,
          shopId: '100571094',
          totalFee: 20000.73,
          crmFee: 10000.45,
          roi: "50%"
        }
        res.send(data)
        break;
      default:

        var data = {
          created: null,
          shopId: '100571094',
          totalFee: 20000,
          crmFee: 10000,
          roi: "50%"
        }
        setTimeout(function () {
          res.send(data)
        }, 2000)
    }


  },
  "topRank": function (req, res) {
    var type = req.query.type
    var data = [

      {

        "campaignId": 1001 + "_" + type,

        "campaignName": "活动2",

        "investmentNum": 10,

        "returnNum": 5,

        "convertSuccessRate": "50%",

        "investmentPrice": 1000,

        "returnPrice": 200,

        "convertRoi": "20%",
        "workflowId": 1

      },

      {

        "campaignId": 1002 + "_" + type,

        "campaignName": "活动2",

        "investmentNum": 10,

        "returnNum": 5,

        "convertSuccessRate": "50%",

        "investmentPrice": 1000,

        "returnPrice": 200,

        "convertRoi": "20%",
        "workflowId": 2

      },
      {

        "campaignId": 1003 + "_" + type,

        "campaignName": "活动2",

        "investmentNum": 10,

        "returnNum": 5,

        "convertSuccessRate": "50%",

        "investmentPrice": 1000,

        "returnPrice": 200,

        "convertRoi": "20%",
        "workflowId": 1

      },

      {

        "campaignId": 1004 + "_" + type,
        "campaignName": "活动2",

        "investmentNum": 10,

        "returnNum": 5,

        "convertSuccessRate": "50%",

        "investmentPrice": 1000,

        "returnPrice": 200,

        "convertRoi": "20%",
        "workflowId": 1

      },
      {

        "campaignId": 1005 + "_" + type,
        "campaignName": "活动2",

        "investmentNum": 10,

        "returnNum": 5,

        "convertSuccessRate": "50%",

        "investmentPrice": 1000,

        "returnPrice": 200,

        "convertRoi": "20%",
        "workflowId": 1

      }

    ]
    setTimeout(function () {
      res.send(data)

    }, 5000)
  },
  "cloumePro": function (req, res) {
    res.send({
      "code": 1, "msg": "获取数据成功!", "list": [
        { "code": "title", "width": 100, "title": "商品名称" },
        { "code": "num_iid", "width": 100, "title": "商品id" },
        { "code": "outer_id", "width": 100, "title": "外部编码" },
        { "code": "c_name", "width": 100, "title": "标准类目" }
      ]
    })
  },
  "searchColumnPro": function (req, res) {
    res.send({
      "code": 1, "msg": "获取查询条件数据成功!", "data": [
        { "code": "pkid", "title": "门店ID", type: "input", "display": "商品选择器" },
        { "code": "name", "title": "门店名称", type: "input", "display": "商品选择器" },
        { "code": "remark", "title": "门店地址", type: "input", "display": null },
        { "code": "shopid", "title": "门店地址", type: "select", configs: [{ name: "店铺1", id: "1" }, { name: "店铺2", id: "2" }, { name: "店铺3", id: "3" }] },
        { "code": "price", "title": "价格", type: "extent" },
        { "code": "c_name", "title": "类目查询", type: "multiselect", configs: [{ name: "店铺1", id: "1" }, { name: "店铺2", id: "2" }, { name: "店铺3", id: "3" }] }
      ], "size": 3
    })
  },
  "cloume": function (req, res) {
    res.send({
      "code": 1, "msg": "获取数据成功!", "list": [
        { "code": "store_no", "width": 100, "title": "门店ID" },
        { "code": "store_nm", "width": 100, "title": "门店名称" },
        { "code": "remark", "width": 100, "title": "门店地址" }
      ]
    })
  },
  "tree": function (req, res) {
    var reqId = Number(/\/selector\/(\d+)\/tree/.exec(req.url)[1]);
    var data = {
      "code": 1,
      "msg": "获取数据成功!",
      "list": []
    };
    var type = req.query.type;
    console.log(reqId, type)
    if (type === 'shop') {
      data.list = [
        {
          "pkid": "9",
          "parent": "3",
          "name": "四川",
          "code": "ii",
          "level": 2,
          "type": "shop",
          "isFinal": 0,
          "children": [
            {
              "pkid": "15",
              "parent": "9",
              "name": "华盛顿",
              "code": "oo",
              "level": 3,
              "type": "shop",
              "isFinal": 1
            }
          ]
        },
        {
          "pkid": "8",
          "parent": "3",
          "name": "河北",
          "code": "hh",
          "level": 2,
          "type": "shop",
          "isFinal": 0,
          "children": [
            {
              "pkid": "14",
              "parent": "8",
              "name": "纽约",
              "code": "nn",
              "level": 3,
              "type": "shop",
              "isFinal": 1
            }
          ]
        }
      ]
    } else if (type === 'area') {
      data.list =  [
        {
          "pkid": "3",
          "code": "BT",
          "name": "华东地区",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "BT",
          "children": [
            {
              "pkid": "4",
              "code": "CL",
              "name": "山东",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            },
            {
              "pkid": "422",
              "code": "CL",
              "name": "江苏",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            },
            {
              "pkid": "4232",
              "code": "CL",
              "name": "安徽",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            },
            {
              "pkid": "4422",
              "code": "CL",
              "name": "浙江",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            }
          ]
        },
        {
          "pkid": "10",
          "code": "MB",
          "name": "华南地区",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "MB",
          "children": [
            {
              "pkid": "1240",
              "code": "MB",
              "name": "广东",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            },
            {
              "pkid": "1160",
              "code": "MB",
              "name": "广西",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            },
            {
              "pkid": "1050",
              "code": "MB",
              "name": "海南",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            }
          ]
        },
        {
          "pkid": "13",
          "code": "SD",
          "name": "华中地区",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "SD",
          "children": [
            {
              "pkid": "1920",
              "code": "MB",
              "name": "湖北",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            },
            {
              "pkid": "1310",
              "code": "MB",
              "name": "湖南",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            },
            {
              "pkid": "1400",
              "code": "MB",
              "name": "河南",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            }
          ]
        },
        {
          "pkid": "15",
          "code": "TM",
          "name": "华北地区",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "TM",
          "children": [
            {
              "pkid": "1920",
              "code": "MB",
              "name": "北京",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            },
            {
              "pkid": "1310",
              "code": "MB",
              "name": "天津",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            },
            {
              "pkid": "1400",
              "code": "MB",
              "name": "河北",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "MB"
            }
          ]
        }
      ]
    } else if (type === 'city') {
      data.list = [
        {
          "pkid": "3",
          "code": "BT",
          "name": "拔佳",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "BT",
          "children": [
            {
              "pkid": "4",
              "code": "CL",
              "name": "其乐",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            },
            {
              "pkid": "422",
              "code": "CL",
              "name": "其乐2",
              "level": "1",
              "type": "shop",
              "isFinal": 0,
              "parent_organ_id": "0",
              "organ_no": "CL"
            }
          ]
        },
        {
          "pkid": "10",
          "code": "MB",
          "name": "美丽宝",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "MB"
        },
        {
          "pkid": "13",
          "code": "SD",
          "name": "森达",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "SD"
        },
        {
          "pkid": "15",
          "code": "TM",
          "name": "天美意",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "TM"
        },
        {
          "pkid": "16",
          "code": "TT",
          "name": "他她",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "TT"
        },
        {
          "pkid": "2955",
          "code": "0",
          "name": "行政架构",
          "level": "0",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "0"
        },
        {
          "pkid": "4064",
          "code": "AD",
          "name": "阿迪达斯",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "AD"
        },
        {
          "pkid": "4065",
          "code": "AS",
          "name": "阿迪达斯休闲",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "AS"
        },
        {
          "pkid": "4067",
          "code": "AK",
          "name": "阿迪达斯小童",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "AK"
        },
        {
          "pkid": "4069",
          "code": "CV",
          "name": "匡威",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "CV"
        },
        {
          "pkid": "4072",
          "code": "TB",
          "name": "添柏岚",
          "level": "1",
          "type": "shop",
          "isFinal": 0,
          "parent_organ_id": "0",
          "organ_no": "TB"
        }
      ]
    }
    res.send(data);
  },
  "edecathlonTree": function (req, res) {
    var data = {
      "code": 1,
      "msg": "获取数据成功!",
      "list": {
        "productOrgName": "全部",
        "parentOrgCode": "",
        "children": [
          {
            "productOrgCode": "universe_code1",
            "productOrgName": "universe_name1",
            "parentOrgCode": "000",
            "treeCode": "000,universe_code1",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "department_code1",
                "productOrgName": "department_name1",
                "parentOrgCode": "universe_code1",
                "treeCode": "000,universe_code1,department_code1",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "14",
            "productOrgName": "Services",
            "parentOrgCode": "000",
            "treeCode": "000,14",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "116",
                "productOrgName": "Specifics",
                "parentOrgCode": "14",
                "treeCode": "000,14,116",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "16",
            "productOrgName": "Swimming univ",
            "parentOrgCode": "000",
            "treeCode": "000,16",
            "childCount": 3,
            "children": [
              {
                "productOrgCode": "418",
                "productOrgName": "AQUAGYM, AQUABIKE",
                "parentOrgCode": "16",
                "treeCode": "000,16,418",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "420",
                "productOrgName": "WATERPOLO",
                "parentOrgCode": "16",
                "treeCode": "000,16,420",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "896",
                "productOrgName": "SWIMMING",
                "parentOrgCode": "16",
                "treeCode": "000,16,896",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "17",
            "productOrgName": "Horse riding univ",
            "parentOrgCode": "000",
            "treeCode": "000,17",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "173",
                "productOrgName": "EQUESTRIAN SPORTS",
                "parentOrgCode": "17",
                "treeCode": "000,17,173",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "24",
            "productOrgName": "Fishing univ",
            "parentOrgCode": "000",
            "treeCode": "000,24",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "341",
                "productOrgName": "Fishing",
                "parentOrgCode": "24",
                "treeCode": "000,24,341",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "3",
            "productOrgName": "Boating, Sailing, Dinghy, Windsurf",
            "parentOrgCode": "000",
            "treeCode": "000,3",
            "childCount": 3,
            "children": [
              {
                "productOrgCode": "426",
                "productOrgName": "DINGHY SAILING",
                "parentOrgCode": "3",
                "treeCode": "000,3,426",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "442",
                "productOrgName": "WINDSURF",
                "parentOrgCode": "3",
                "treeCode": "000,3,442",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "73",
                "productOrgName": "BOATING, SAILING, YACHTING",
                "parentOrgCode": "3",
                "treeCode": "000,3,73",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "38",
            "productOrgName": "Climbing, Mountaineering univ",
            "parentOrgCode": "000",
            "treeCode": "000,38",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "126",
                "productOrgName": "Climbing",
                "parentOrgCode": "38",
                "treeCode": "000,38,126",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "4",
            "productOrgName": "Running univ",
            "parentOrgCode": "000",
            "treeCode": "000,4",
            "childCount": 3,
            "children": [
              {
                "productOrgCode": "370",
                "productOrgName": "Trail running",
                "parentOrgCode": "4",
                "treeCode": "000,4,370",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "400",
                "productOrgName": "Jogging",
                "parentOrgCode": "4",
                "treeCode": "000,4,400",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "128",
                "productOrgName": "Running Athletics",
                "parentOrgCode": "4",
                "treeCode": "000,4,128",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "41",
            "productOrgName": "Univ Iceskating, Ice hockey",
            "parentOrgCode": "000",
            "treeCode": "000,41",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "141",
                "productOrgName": "Ice skating",
                "parentOrgCode": "41",
                "treeCode": "000,41,141",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "371",
                "productOrgName": "Ice hockey",
                "parentOrgCode": "41",
                "treeCode": "000,41,371",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "47",
            "productOrgName": "Basket univ",
            "parentOrgCode": "000",
            "treeCode": "000,47",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "904",
                "productOrgName": "BASKETBALL",
                "parentOrgCode": "47",
                "treeCode": "000,47,904",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "49",
            "productOrgName": "Trekking univ",
            "parentOrgCode": "000",
            "treeCode": "000,49",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "415",
                "productOrgName": "TREKKING SEVERAL DAYS",
                "parentOrgCode": "49",
                "treeCode": "000,49,415",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "5",
            "productOrgName": "Hiking univ",
            "parentOrgCode": "000",
            "treeCode": "000,5",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "127",
                "productOrgName": "HIKING",
                "parentOrgCode": "5",
                "treeCode": "000,5,127",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "204",
                "productOrgName": "CONVERTED FOAM CUTTING BTWIN",
                "parentOrgCode": "5",
                "treeCode": "000,5,204",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "50",
            "productOrgName": "Cross country ski univ",
            "parentOrgCode": "000",
            "treeCode": "000,50",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "165",
                "productOrgName": "CROSS COUTNRY SKI",
                "parentOrgCode": "50",
                "treeCode": "000,50,165",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "51",
            "productOrgName": "Canyoning univ",
            "parentOrgCode": "000",
            "treeCode": "000,51",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "416",
                "productOrgName": "CANYONING",
                "parentOrgCode": "51",
                "treeCode": "000,51,416",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "6",
            "productOrgName": "Fitness Cardio univ",
            "parentOrgCode": "000",
            "treeCode": "000,6",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "88",
                "productOrgName": "Fitness",
                "parentOrgCode": "6",
                "treeCode": "000,6,88",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "65",
            "productOrgName": "Cross-training, bodybuilding univ",
            "parentOrgCode": "000",
            "treeCode": "000,65",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "433",
                "productOrgName": "CROSS-TRAINING",
                "parentOrgCode": "65",
                "treeCode": "000,65,433",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "438",
                "productOrgName": "BODYBUILDING",
                "parentOrgCode": "65",
                "treeCode": "000,65,438",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "7",
            "productOrgName": "Hunting univ",
            "parentOrgCode": "000",
            "treeCode": "000,7",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "13",
                "productOrgName": "WILDLIFE WATCHING / HUNTING",
                "parentOrgCode": "7",
                "treeCode": "000,7,13",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "428",
                "productOrgName": "SHOOTING",
                "parentOrgCode": "7",
                "treeCode": "000,7,428",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "74",
            "productOrgName": "Rugby univ",
            "parentOrgCode": "000",
            "treeCode": "000,74",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "105",
                "productOrgName": "Rugby",
                "parentOrgCode": "74",
                "treeCode": "000,74,105",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "76",
            "productOrgName": "Table tennis univ",
            "parentOrgCode": "000",
            "treeCode": "000,76",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "404",
                "productOrgName": "TABLE TENNIS",
                "parentOrgCode": "76",
                "treeCode": "000,76,404",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "77",
            "productOrgName": "Badminton univ",
            "parentOrgCode": "000",
            "treeCode": "000,77",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "403",
                "productOrgName": "BADMINTON",
                "parentOrgCode": "77",
                "treeCode": "000,77,403",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "8",
            "productOrgName": "Tennis univ",
            "parentOrgCode": "000",
            "treeCode": "000,8",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "402",
                "productOrgName": "TENNIS",
                "parentOrgCode": "8",
                "treeCode": "000,8,402",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "409",
                "productOrgName": "OTHER RACKET SPORTS",
                "parentOrgCode": "8",
                "treeCode": "000,8,409",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "9",
            "productOrgName": "Health Discovery univ",
            "parentOrgCode": "000",
            "treeCode": "000,9",
            "childCount": 5,
            "children": [
              {
                "productOrgCode": "131",
                "productOrgName": "Electronics",
                "parentOrgCode": "9",
                "treeCode": "000,9,131",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "63",
                "productOrgName": "Optical",
                "parentOrgCode": "9",
                "treeCode": "000,9,63",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "67",
                "productOrgName": "Books",
                "parentOrgCode": "9",
                "treeCode": "000,9,67",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "15",
                "productOrgName": "Nutrition Care",
                "parentOrgCode": "9",
                "treeCode": "000,9,15",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "60",
                "productOrgName": "Walking luggage",
                "parentOrgCode": "9",
                "treeCode": "000,9,60",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "universe_code2",
            "productOrgName": "universe_name2",
            "parentOrgCode": "000",
            "treeCode": "000,universe_code2",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "department_code2",
                "productOrgName": "department_name2",
                "parentOrgCode": "universe_code2",
                "treeCode": "000,universe_code2,department_code2",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "universe_code3",
            "productOrgName": "universe_name3",
            "parentOrgCode": "000",
            "treeCode": "000,universe_code3",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "department_code3",
                "productOrgName": "department_name3",
                "parentOrgCode": "universe_code3",
                "treeCode": "000,universe_code3,department_code3",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "wyyuniverse1",
            "productOrgName": "wyy自己造的",
            "parentOrgCode": "000",
            "treeCode": "000,wyyuniverse1",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "wyydepartment01",
                "productOrgName": "wyy自己造的Department",
                "parentOrgCode": "wyyuniverse1",
                "treeCode": "000,wyyuniverse1,wyydepartment01",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "10",
            "productOrgName": "Football univ",
            "parentOrgCode": "000",
            "treeCode": "000,10",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "902",
                "productOrgName": "Football",
                "parentOrgCode": "10",
                "treeCode": "000,10,902",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "11",
            "productOrgName": "Skate Scooter Inline univ",
            "parentOrgCode": "000",
            "treeCode": "000,11",
            "childCount": 3,
            "children": [
              {
                "productOrgCode": "392",
                "productOrgName": "Skateboard, Waveboard, Longboard",
                "parentOrgCode": "11",
                "treeCode": "000,11,392",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "393",
                "productOrgName": "Scooter",
                "parentOrgCode": "11",
                "treeCode": "000,11,393",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "903",
                "productOrgName": "Inline skate / Quad",
                "parentOrgCode": "11",
                "treeCode": "000,11,903",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "111",
            "productOrgName": "UNIVERSE1_第一层",
            "parentOrgCode": "000",
            "treeCode": "000,111",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "333",
                "productOrgName": "DEPT1_第二层_test_line_feed",
                "parentOrgCode": "111",
                "treeCode": "000,111,333",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "2",
            "productOrgName": "Cycle univ",
            "parentOrgCode": "000",
            "treeCode": "000,2",
            "childCount": 5,
            "children": [
              {
                "productOrgCode": "169",
                "productOrgName": "KID BIKE",
                "parentOrgCode": "2",
                "treeCode": "000,2,169",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "56",
                "productOrgName": "CITY BIKE RIDING",
                "parentOrgCode": "2",
                "treeCode": "000,2,56",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "398",
                "productOrgName": "MOUNTAIN BIKE",
                "parentOrgCode": "2",
                "treeCode": "000,2,398",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "55",
                "productOrgName": "HYBRID BIKE RIDING",
                "parentOrgCode": "2",
                "treeCode": "000,2,55",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "57",
                "productOrgName": "ROAD BIKE",
                "parentOrgCode": "2",
                "treeCode": "000,2,57",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "222",
            "productOrgName": "UNIVERSE2_第一层",
            "parentOrgCode": "000",
            "treeCode": "000,222",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "444",
                "productOrgName": "UNIVERSE2_DEPT1",
                "parentOrgCode": "222",
                "treeCode": "000,222,444",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "25",
            "productOrgName": "Target sport univ",
            "parentOrgCode": "000",
            "treeCode": "000,25",
            "childCount": 3,
            "children": [
              {
                "productOrgCode": "177",
                "productOrgName": "DARTS, BILLIARD SPORTS",
                "parentOrgCode": "25",
                "treeCode": "000,25,177",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "178",
                "productOrgName": "PETANQUE, SKITTELS, PALETS",
                "parentOrgCode": "25",
                "treeCode": "000,25,178",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "28",
                "productOrgName": "ARCHERY",
                "parentOrgCode": "25",
                "treeCode": "000,25,28",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "30",
            "productOrgName": "Golf univ",
            "parentOrgCode": "000",
            "treeCode": "000,30",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "634",
                "productOrgName": "GOLF",
                "parentOrgCode": "30",
                "treeCode": "000,30,634",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "32",
            "productOrgName": "Walking univ",
            "parentOrgCode": "000",
            "treeCode": "000,32",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "134",
                "productOrgName": "Walking",
                "parentOrgCode": "32",
                "treeCode": "000,32,134",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "35",
            "productOrgName": "Ski Snowboard Sledge univ",
            "parentOrgCode": "000",
            "treeCode": "000,35",
            "childCount": 3,
            "children": [
              {
                "productOrgCode": "117",
                "productOrgName": "SKI",
                "parentOrgCode": "35",
                "treeCode": "000,35,117",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "423",
                "productOrgName": "SNOWBOARD",
                "parentOrgCode": "35",
                "treeCode": "000,35,423",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "424",
                "productOrgName": "SLEDGE",
                "parentOrgCode": "35",
                "treeCode": "000,35,424",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "39",
            "productOrgName": "Boxing, Martial arts univ",
            "parentOrgCode": "000",
            "treeCode": "000,39",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "349",
                "productOrgName": "BOXING",
                "parentOrgCode": "39",
                "treeCode": "000,39,349",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "353",
                "productOrgName": "MARTIAL ARTS",
                "parentOrgCode": "39",
                "treeCode": "000,39,353",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "44",
            "productOrgName": "Diving univ",
            "parentOrgCode": "000",
            "treeCode": "000,44",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "71",
                "productOrgName": "Diving",
                "parentOrgCode": "44",
                "treeCode": "000,44,71",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "45",
            "productOrgName": "Surf, bodyboard, towed/aerial sports",
            "parentOrgCode": "000",
            "treeCode": "000,45",
            "childCount": 4,
            "children": [
              {
                "productOrgCode": "396",
                "productOrgName": "Water ski, wakeboard, towable tube",
                "parentOrgCode": "45",
                "treeCode": "000,45,396",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "397",
                "productOrgName": "Flying disk, Boomerang",
                "parentOrgCode": "45",
                "treeCode": "000,45,397",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "75",
                "productOrgName": "Bodyboard, skimboard",
                "parentOrgCode": "45",
                "treeCode": "000,45,75",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "394",
                "productOrgName": "Surf",
                "parentOrgCode": "45",
                "treeCode": "000,45,394",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "46",
            "productOrgName": "Kayak, stand up paddle univ",
            "parentOrgCode": "000",
            "treeCode": "000,46",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "417",
                "productOrgName": "Stand up paddle",
                "parentOrgCode": "46",
                "treeCode": "000,46,417",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "348",
                "productOrgName": "Kayak",
                "parentOrgCode": "46",
                "treeCode": "000,46,348",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "48",
            "productOrgName": "Kite sports univ",
            "parentOrgCode": "000",
            "treeCode": "000,48",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "413",
                "productOrgName": "Kite Sports",
                "parentOrgCode": "48",
                "treeCode": "000,48,413",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "62",
            "productOrgName": "Volley,Hand,Field hockey,American sport",
            "parentOrgCode": "000",
            "treeCode": "000,62",
            "childCount": 5,
            "children": [
              {
                "productOrgCode": "354",
                "productOrgName": "Baseball",
                "parentOrgCode": "62",
                "treeCode": "000,62,354",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "359",
                "productOrgName": "American football, Lacrosse",
                "parentOrgCode": "62",
                "treeCode": "000,62,359",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "369",
                "productOrgName": "Field hockey",
                "parentOrgCode": "62",
                "treeCode": "000,62,369",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "102",
                "productOrgName": "Volley ball",
                "parentOrgCode": "62",
                "treeCode": "000,62,102",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "107",
                "productOrgName": "Handball",
                "parentOrgCode": "62",
                "treeCode": "000,62,107",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "68",
            "productOrgName": "Yoga univ",
            "parentOrgCode": "000",
            "treeCode": "000,68",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "440",
                "productOrgName": "YOGA",
                "parentOrgCode": "68",
                "treeCode": "000,68,440",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "70",
            "productOrgName": "Dance, Artistic/Rhythmic Gym univ",
            "parentOrgCode": "000",
            "treeCode": "000,70",
            "childCount": 2,
            "children": [
              {
                "productOrgCode": "337",
                "productOrgName": "DANCES",
                "parentOrgCode": "70",
                "treeCode": "000,70,337",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "802",
                "productOrgName": "ARTISTIC/RHYTHMIC GYMNASTICS",
                "parentOrgCode": "70",
                "treeCode": "000,70,802",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "72",
            "productOrgName": "Gym, Pilates univ",
            "parentOrgCode": "000",
            "treeCode": "000,72",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "441",
                "productOrgName": "GYM, PILATES",
                "parentOrgCode": "72",
                "treeCode": "000,72,441",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "78",
            "productOrgName": "Padel univ",
            "parentOrgCode": "000",
            "treeCode": "000,78",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "408",
                "productOrgName": "PADEL",
                "parentOrgCode": "78",
                "treeCode": "000,78,408",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "79",
            "productOrgName": "Squash univ",
            "parentOrgCode": "000",
            "treeCode": "000,79",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "406",
                "productOrgName": "SQUASH",
                "parentOrgCode": "79",
                "treeCode": "000,79,406",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "81",
            "productOrgName": "Cricket univ",
            "parentOrgCode": "000",
            "treeCode": "000,81",
            "childCount": 1,
            "children": [
              {
                "productOrgCode": "357",
                "productOrgName": "Cricket",
                "parentOrgCode": "81",
                "treeCode": "000,81,357",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          },
          {
            "productOrgCode": "90",
            "productOrgName": "Workshop Univ",
            "parentOrgCode": "000",
            "treeCode": "000,90",
            "childCount": 8,
            "children": [
              {
                "productOrgCode": "386",
                "productOrgName": "WORKSHOP MOUNTAIN SPORTS",
                "parentOrgCode": "90",
                "treeCode": "000,90,386",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "388",
                "productOrgName": "WORKSHOP ELECTRONIQUE",
                "parentOrgCode": "90",
                "treeCode": "000,90,388",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "389",
                "productOrgName": "WORKSHOP OTHER SPORTS",
                "parentOrgCode": "90",
                "treeCode": "000,90,389",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "112",
                "productOrgName": "WORKSHOP CYCLE",
                "parentOrgCode": "90",
                "treeCode": "000,90,112",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "376",
                "productOrgName": "WORKSHOP FITNESS",
                "parentOrgCode": "90",
                "treeCode": "000,90,376",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "379",
                "productOrgName": "WORKSHOP PERSONALIZATION",
                "parentOrgCode": "90",
                "treeCode": "000,90,379",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "382",
                "productOrgName": "WORKSHOP ROLLER",
                "parentOrgCode": "90",
                "treeCode": "000,90,382",
                "childCount": 0,
                "children": null,
                "final": true
              },
              {
                "productOrgCode": "383",
                "productOrgName": "SPORTS REWARDS",
                "parentOrgCode": "90",
                "treeCode": "000,90,383",
                "childCount": 0,
                "children": null,
                "final": true
              }
            ],
            "final": false
          }
        ],
        "childCount": 47,
        "final": false,
        "treeCode": "000",
        "productOrgCode": "000"
      }
    };
    res.send(data);
  },
  "searchColumn": function (req, res) {
    res.send({
      "code": 1, "msg": "获取查询条件数据成功!", "data": [
        { "code": "pkid", "title": "门店ID", type: "input", "display": "商品选择器" },
        { "code": "name", "title": "门店名称", type: "input", "display": "商品选择器" },
        { "code": "remark", "title": "门店地址", type: "input", "display": null },
        { "code": "shopid", "title": "门店地址", type: "select", configs: [{ name: "店铺1", id: "1" }, { name: "店铺2", id: "2" }, { name: "店铺3", id: "3" }] },
        { "code": "price", "title": "价格", type: "extent" },
        { "code": "c_name", "title": "类目查询", type: "multiselect", configs: [{ name: "店铺1", id: "1" }, { name: "店铺2", id: "2" }, { name: "店铺3", id: "3" }] }
      ], "size": 3
    })
  },
  "choosePro": function (req, res) {
    res.send({
      "pageSize": 20,
      "pageNum": 1,
      "totals": 1919,
      "totalPages": 10,
      "list": [
        {
          "title": "商品1",
          "num_iid": "100000",
          "outer_id": "100000",
          "dp_id": 2
        },
        {
          "title": "商品2",
          "num_iid": "100001",
          "outer_id": "100001"
        },
        {
          "title": "商品3",
          "num_iid": "100571094",
          "outer_id": "100002"
        },
        {
          "title": "商品4",
          "num_iid": "100003",
          "outer_id": "100003"
        },
        {
          "title": "商品5",
          "num_iid": "100004",
          "outer_id": "100004"
        },
        {
          "title": "商品6",
          "num_iid": "10066666",
          "outer_id": "100005"
        },
        {
          "title": "商品7",
          "num_iid": "100006",
          "outer_id": "100006"
        }
      ]
    })
  },
  "edecathlonChoosePro": function (req, res) {
    res.send({
      "pageSize": 20,
      "pageNum": 1,
      "totals": 1919,
      "totalPages": 10,
      "list": [
        {
          "title": "商品1",
          "num_iid": "100000",
          "outer_id": "100000",
          "dp_id": 2
        },
        {
          "title": "商品2",
          "num_iid": "100001",
          "outer_id": "100001"
        },
        {
          "title": "商品3",
          "num_iid": "100571094",
          "outer_id": "100002"
        },
        {
          "title": "商品4",
          "num_iid": "100003",
          "outer_id": "100003"
        },
        {
          "title": "商品5",
          "num_iid": "100004",
          "outer_id": "100004"
        },
        {
          "title": "商品6",
          "num_iid": "10066666",
          "outer_id": "100005"
        },
        {
          "title": "商品7",
          "num_iid": "100006",
          "outer_id": "100006"
        }
      ]
    })
  },
  "choose": function (req, res) {
    res.send({
      "pageSize": 20,
      "pageNum": 1,
      "totals": 1919,
      "totalPages": 10,
      "list": [
        {
          "store_no": "100000",
          "store_nm": "100000"
        },
        {
          "store_no": "100001",
          "store_nm": "100001"
        },
        {
          "store_no": "100571094",
          "store_nm": "100002"
        },
        {
          "store_no": "100003",
          "store_nm": "100003"
        },
        {
          "store_no": "100004",
          "store_nm": "100004"
        },
        {
          "store_no": "10066666",
          "store_nm": "100005"
        },
        {
          "store_no": "100006",
          "store_nm": "100006"
        },
        {
          "store_no": "100007",
          "store_nm": "100007"
        },
        {
          "store_no": "100008",
          "store_nm": "100008"
        },
        {
          "store_no": "100009",
          "store_nm": "100009"
        },
        {
          "store_no": "100010",
          "store_nm": "100010"
        },
        {
          "store_no": "100011",
          "store_nm": "100011"
        },
        {
          "store_no": "100012",
          "store_nm": "100012"
        },
        {
          "store_no": "100013",
          "store_nm": "100013"
        },
        {
          "store_no": "100014",
          "store_nm": "100014"
        },
        {
          "store_no": "100015",
          "store_nm": "100015"
        },
        {
          "store_no": "100016",
          "store_nm": "100016"
        },
        {
          "store_no": "100017",
          "store_nm": "100017"
        },
        {
          "store_no": "100018",
          "store_nm": "100018"
        },
        {
          "store_no": "100019",
          "store_nm": "100019"
        }
      ]
    })
  },
  chooseId: function (req, res) {
    res.send(["100000", "100301"])
  },
  choseSave: function (req, res) {
    res.send({ "code": 1, "msg": "添加指定门店/商品成功", "snapshootId": "377" })
  }
};
