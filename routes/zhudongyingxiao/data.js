/*
 * GET zhudongyingxiao listing.
 */
const moment = require('moment');
let timeouttingTimer;
module.exports = {
  "getTaobaoPlatId": function(req, res) {
    res.send({
      "id": 1,
      "name": "淘宝客户",
      "segmentationId": 1
    });
  },
  "startSp": function(req, res) {
    res.send({ "workflowId": 10001481, "pass": true, "details": [] })
  },
  "putstartSp": function(req, res) {
    res.send({ "campaignStatus": "A2" });
  },
  "campaign": function(req, res) { //活动列表
    const query = req.query;
    const page = +query.page;
    const pagesize = +query.pagesize;
    const data = [
      {
        "campId": 4,
        "campName": "4、我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 16:29:09",
        "status": "A1",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "remark": "是个\nsd是过来是个了就是的两个极乐世界管理局临时登记管理时间管理局打了个家里",
        "workflowId": 11,
        isCycle: true
      },
      {
        "campId": 3,
        "campName": "3、我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 10:43:00",
        "status": "B1",
        "edition": "STANDARD",
        "creater": "创建者2",
        "approver": "审批人2",
        "category": "类型2",
        "remark": "xxx\nxxx",
        "workflowId": 2,
        extInfo: {
          custom2: 'hshssh'
        }
      },
      {
        "campId": 5,
        "campName": "5、我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 16:29:09",
        "status": "A2",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "workflowId": 3,
        extInfo: {
          '25': '自定义内容',
          custom2: 'hshssh'
        }
      },
      {
        "campId": 6,
        "campName": "6、我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 10:43:00",
        "status": "B2",
        "edition": "STANDARD",
        "creater": "创建者2",
        "approver": "审批人2",
        "category": "类型2",
        "workflowId": 4,
        extInfo: {
          custom1: '自定义内容',
          custom2: 'hshssh',
          "25": 'sss',
        }
      },
      {
        "campId": 1221,
        "campName": "1221、我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 16:29:09",
        "status": "A3",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "workflowId": 1,
        "transfer_version": "5.0",
        "transfer_pk_camp_id": 123456,
        extInfo: {
          custom1: '自定义内容',
          custom2: 'hshssh'
        }
      },
      {
        "campId": 1222,
        "campName": "1222、我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 16:29:09",
        "status": "B3",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "workflowId": 1,
        "transfer_version": "5.0",
        "transfer_pk_camp_id": 123456,
        extInfo: {
          custom1: '自定义内容',
          "25": 'hshssh'
        }
      },
      {
        "campId": 1223,
        "campName": "我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 16:29:09",
        "status": "A4",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "workflowId": 1,
        "transfer_version": "5.0",
        "transfer_pk_camp_id": 123456,
        extInfo: {
          custom1: '自定义内容',
          custom2: 'hshssh'
        }
      },
      {
        "campId": 1224,
        "campName": "5我名字故意这么长，你咬我啊咬我啊咬我啊",
        "createdTime": "2013-10-30 16:29:09",
        "status": "A5",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "workflowId": 1,
        "transfer_version": "5.0",
        "transfer_pk_camp_id": 123456,
        extInfo: {
          custom1: '自定义内容',
          custom2: 'hshssh'
        }
      },
      {
        "campId": 1225,
        "campName": "5.0活动",
        "createdTime": "2013-10-30 16:29:09",
        "status": "A6",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "workflowId": 1,
        "transfer_version": "5.0",
        "transfer_pk_camp_id": 123456,
        extInfo: {
          custom1: '自定义内容',
          custom2: 'hshssh'
        }
      },
      {
        "campId": 1226,
        "campName": "5.0活动",
        "createdTime": "2013-10-30 16:29:09",
        "status": "A3",
        "edition": "STANDARD",
        "creater": "创建者1",
        "approver": "审批人1",
        "category": "类型1",
        "workflowId": 1,
        "transfer_version": "5.0",
        "transfer_pk_camp_id": 123456,
        extInfo: {
          custom1: '自定义内容',
          custom2: 'hshssh'
        }
      }
    ];
    const dataLength = data.length;
    new Array(pagesize).fill('').forEach((col, index) => {
      const campId = page * pagesize + index + 1;
      if (dataLength > (index + 1)) {
        data[index].campId = campId;
      } else {
        data.push({
          "campId": campId,
          "campName": "追加数据。。。快快快",
          "createdTime": "2013-10-30 16:29:09",
          "status": "A1",
          "edition": "STANDARD",
          "creater": "创建者1",
          "approver": "审批人1",
          "category": "类型1",
          "remark": "是个\nsd是过来是个了就是的两个极乐世界管理局临时登记管理时间管理局打了个家里",
          "workflowId": 11,
          isCycle: true
        });
      }
    });

    res.send({
      "total": 600,
      "page": page,
      "pageSize": pagesize,
      "autoConfig": page % 2 == 0 ? [
        { seq: 1, fieldName: '自定义1', id: '25' },
        { seq: 2, fieldName: '自定义2', id: 'custom2' }
      ] : [],
      "data": data
    });
  },
  "campaignActiveDetail": function(req, res) {
    res.send({
      "campId": 10000095,
      "campName": "双十一天猫预热活动,名称就是这么吊！",
      "createdTime": null,
      "status": 'A6',
      "edition": null,
      "creater": "morgan",
      "approver": "admin",
      "category": null,
      "templateId": 1,
      "templateName": "默认模版",
      "classification": "未分类",
      "remark": "就是一个备注内容，嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟……………………",
      "categoryId": null,
      "classificationId": 2,
      "createrName": "##逗比熊爷##",
      "approverName": "##逗比熊奶##",
      "workflowId": 10001615,
      "createrId": 4,
      "approverId": 1,
      "isCycle": false,
      "transfer_version": null,
      "transfer_pk_camp_id": null,
      "extInfo": null,
      "createTime": "2017-10-30T10:25:11.000+0800",
      "startTime": "2017-10-30T00:00:00.000+0800",
      "endTime": "2017-10-30T00:00:00.000+0800",
      "cloneTemplate": false
    });
  },
  "campaignActiveCalendar": function(req, res) {
    const query = req.query;
    const startTime = query.startTime;
    const pageNumber = +(query.pageNumber === undefined ? 10 : query.pageNumber);
    const endTime = query.endTime;
    const dayTime = query.dayTime;
    const pagesize = query.pageSize;

    const eventsMap = {
      week: [
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！设计中',
          status: 'A1',
          startTime: moment(new Date(startTime)).subtract(1, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(3, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！设计中预执行',
          status: 'B1',
          startTime: moment(new Date(startTime)).add(1, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(4, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！待审批',
          status: 'A2',
          startTime: moment(new Date(startTime)).add(3, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(4, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！预执行',
          status: 'B2',
          startTime: moment(new Date(startTime)).add(3, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(5, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！待执行',
          status: 'A6',
          startTime: moment(new Date(startTime)).add(5, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(endTime)).format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！待执行',
          status: 'B3',
          startTime: moment(new Date(startTime)).add(5, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(endTime)).format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！待执行',
          status: 'A4',
          startTime: moment(new Date(startTime)).add(5, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(endTime)).format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页周-我的名字就是这么吊！！！！待执行',
          status: 'A5',
          startTime: moment(new Date(startTime)).add(5, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(endTime)).format('YYYY-MM-DD'),
          isCycle: true
        }
      ],
      month: [
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！设计中',
          status: 'A1',
          startTime: moment(new Date(startTime)).format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(5, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！设计中预执行',
          status: 'B1',
          startTime: moment(new Date(startTime)).add(3, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(4, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！待审批',
          status: 'A2',
          startTime: moment(new Date(startTime)).add(4, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(5, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！预执行',
          status: 'B2',
          startTime: moment(new Date(startTime)).add(6, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(10, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！待执行',
          status: 'A3',
          startTime: moment(new Date(startTime)).add(11, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(16, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！执行中',
          status: 'B3',
          startTime: moment(new Date(startTime)).add(11, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(20, 'days').format('YYYY-MM-DD'),
          isCycle: false
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！完成',
          status: 'A5',
          startTime: moment(new Date(startTime)).add(13, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(23, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！终止',
          status: 'A4',
          startTime: moment(new Date(startTime)).add(20, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(startTime)).add(25, 'days').format('YYYY-MM-DD'),
          isCycle: true
        },
        {
          campName: pageNumber + '页我的名字就是这么吊！！！！异常',
          status: 'A6',
          startTime: moment(new Date(startTime)).add(25, 'days').format('YYYY-MM-DD'),
          endTime: moment(new Date(endTime)).format('YYYY-MM-DD'),
          isCycle: true
        }
      ]
    };
    let data = eventsMap.week;
    if ((new Date(endTime).getTime() - new Date(startTime).getTime()) > (24 * 60 * 60 * 1000 * 7)) {
      data = eventsMap.month;
    }
    const fillLength = +query.pageSize - data.length;

    if (fillLength > 0) {
      new Array(fillLength).fill(' ').forEach(() => {
        data.push(Object.assign({}, data[Math.ceil(Math.random() * 7)]));
      });
    } else {
      data.splice(data.length + fillLength, -fillLength)
    }
    const startID = pagesize * pageNumber;

    data.forEach((item, index) => {
      item.campId = index + startID + 1;
    });

    const response = {
      total: 503,
      page: pageNumber,
      pageSize: +query.pageSize,
      autoConfig: null,
      data
    };

    if (dayTime !== undefined) {
      timeouttingTimer && clearTimeout(timeouttingTimer);
      timeouttingTimer = setTimeout(() => res.send(response), 1000);
    } else {
      res.send(response);
    }
  },
  "openOldCcms": function(req, res) {
    res.send({
      "url": "https://test1.ccmsyun.com-ccms.fenxibao.com/single_sign_on_check?qy_appkey=QY&qy_sign=ab1bfe71e6268d33d6fd47c8915ae162&name=跳转活动&id=13245"
    })
  },
  "postCampaign": function(req, res) {
    res.send({ "id": 10000014, "name": "对萨达", "templateId": null, "categoryId": 124, "classificationId": 134, "approverId": 111, "createrId": 1, "workflowId": 1212, "workflow": { "id": 10000017, "createTime": 1383882012501, "updateTime": 1383882012501, "nodes": null, "connects": null, "reserved": false }, "edition": "STANDARD", "status": { "statusId": "A1", "statusValue": "设计中", "sortNo": 1 }, "disabled": false, "remark": "倒萨", "createAt": 1383882012497, "updatedAt": null, "creater": null, "approver": null, "cloneTemplate": null });
  },
  "groups": function(req, res) {
    //res.statusCode =401;
    res.send([{
      "nodes": [{
        "id": 3,
        "name": "等待",
        "type": "tflowwait",
        "viewable": true
      }, {
        "id": 5,
        "name": "查询",
        "type": "tfilterfind",
        "viewable": true
      }, {
        "id": 15,
        "name": "目标组",
        "type": "tcustomertargetgroup",
        "viewable": true
      }, {
        "id": 19,
        "name": "短信",
        "type": "tcommunicateSMS",
        "viewable": true
      }, {
        "id": 26,
        "name": "优惠券响应",
        "type": "tchannelresponseEC",
        "viewable": true
      }, {
        "id": 28,
        "name": "订单分析",
        "type": "tanalysisorder",
        "viewable": true
      }],
      "name": "top",
      "text": "常用"
    }, {
      "nodes": [{
        "id": 1,
        "name": "开始",
        "type": "tflowstart",
        "viewable": false
      }, {
        "id": 2,
        "name": "时间",
        "type": "tflowtime",
        "viewable": false
      }, {
        "id": 3,
        "name": "等待",
        "type": "tflowwait",
        "viewable": true
      }],
      "name": "tflow",
      "text": "流程操作"
    }, {
      "nodes": [{
        "id": 5,
        "name": "查询",
        "type": "tfilterfind",
        "viewable": true
      }, {
        "id": 6,
        "name": "屏蔽",
        "type": "tfilterscreen",
        "viewable": true
      }, {
        "id": 15,
        "name": "活动查询",
        "type": "tfilterCampQuery",
        "viewable": true
      }, {
        "id": 16,
        "name": "属性查询",
        "type": "tfilterAttrQuery",
        "viewable": true
      }, {
        "id": 17,
        "name": "订单查询",
        "type": "tfilterOrderQuery",
        "viewable": true
      }, {
        "id": 14,
        "name": "选择分组",
        "type": "tfilterCustomerGroup",
        "viewable": true
      }, {
        "id": 7,
        "name": "拆分",
        "type": "tfiltersplit",
        "viewable": true
      }, {
        "id": 8,
        "name": "合并",
        "type": "tfiltermerge",
        "viewable": true
      }, {
        "id": 9,
        "name": "交集",
        "type": "tfilterand",
        "viewable": true
      }, {
        "id": 11,
        "name": "排重",
        "type": "tfiltergrouppriority",
        "viewable": true
      }, {
        "id": 10,
        "name": "排除",
        "type": "tfilterexclude",
        "viewable": true
      }, {
        "id": 12,
        "name": "抽样",
        "type": "tfiltersample",
        "viewable": true
      }, {
        "id": 4,
        "name": "名单匹配",
        "type": "teximimport",
        "viewable": true
      }, {
        "id": 39,
        "name": "立即营销",
        "type": "teximmarketingondemand",
        "viewable": true
      }, {
        "id": 66,
        "name": "导入查询",
        "type": "tfilterdataImport",
        "viewable": true
      }, {
        "id": 67,
        "name": "营销热度查询",
        "type": "tfilterHeat",
        "viewable": true
      }, {
        "id": 68,
        "name": "定向优惠使用查询",
        "type": "tdiscountUMPQuery",
        "viewable": true
      }, {
        "id": 72,
        "name": "优惠券使用查询",
        "type": "tdiscountECQuery",
        "viewable": true
      }, {
        "id": 69,
        "name": "访问查询",
        "type": "tfilterBehavior",
        "viewable": true
      }, {
        "id": 70,
        "name": "标签查询",
        "type": "tfilterUnionlabel",
        "viewable": true
      }],
      "name": "tfilter",
      "text": "目标客户组"
    }, {
      "nodes": [{
        "id": 15,
        "name": "目标组",
        "type": "tcustomertargetgroup",
        "viewable": true
      }, {
        "id": 151,
        "name": "dcl目标组",
        "type": "tcustomerdtargetgroup",
        "viewable": true
      }, {
        "id": 16,
        "name": "响应组",
        "type": "tcustomerrespondgroup",
        "viewable": true
      }, {
        "id": 161,
        "name": "dcl响应组",
        "type": "tcustomerdrespondgroup",
        "viewable": true
      }, {
        "id": 18,
        "name": "匹配订单",
        "type": "tspecialordermatch",
        "viewable": true
      }],
      "name": "tcustomer",
      "text": "客户组"
    }, {
      "nodes": [{
        "id": 41,
        "name": "百丽优惠券",
        "type": "tdiscountECBelle",
        "viewable": true
      }, {
        "id": 24,
        "name": "店铺优惠券",
        "type": "tdiscountEC",
        "viewable": true
      }, {
        "id": 25,
        "name": "定向优惠卡",
        "type": "tdiscountUMP",
        "viewable": true
      }, {
        "id": 37,
        "name": "数字优惠码",
        "type": "tdiscountdigitalpromocode",
        "viewable": true
      }, {
        "id": 38,
        "name": "积分发放",
        "type": "tdiscountIS",
        "viewable": true
      }, {
        "id": 39,
        "name": "新积分发放",
        "type": "tdiscountISNew",
        "viewable": true
      }, {
        "id": 40,
        "name": "支付宝红包",
        "type": "tdiscountBenefit",
        "viewable": true
      }],
      "name": "tdiscount",
      "text": "优惠方式"
    }, {
      "nodes": [{
        "id": 19,
        "name": "短信",
        "type": "tcommunicateSMS",
        "viewable": true
      }, {
        "id": 191,
        "name": "dkt短信",
        "type": "dclonsms",
        "viewable": true
      }, {
        "id": 22,
        "name": "EDM",
        "type": "tcommunicateEDM",
        "viewable": true
      }, {
        "id": 221,
        "name": "dktEDM",
        "type": "dclonedm",
        "viewable": true
      }, {
        "id": 21,
        "name": "彩信",
        "type": "tcommunicateMMS",
        "viewable": true
      }, {
        "id": 20,
        "name": "WAP推送",
        "type": "tcommunicateWAP",
        "viewable": true
      }, {
        "id": 23,
        "name": "线下活动",
        "type": "tcommunicateOther",
        "viewable": true
      }, {
        "id": 287,
        "name": "微信",
        "type": "tcommunicateWechat",
        "viewable": true
      }, {
        "id": 2871,
        "name": "dkt微信",
        "type": "dclonwechat",
        "viewable": true
      }],
      "name": "tcommunicate",
      "text": "沟通方式"
    }, {
      "nodes": [{
        "id": 26,
        "name": "优惠券响应",
        "type": "tchannelresponseEC",
        "viewable": true
      }, {
        "id": 34,
        "name": "EDM响应",
        "type": "tchannelresponseEDM",
        "viewable": true
      }, {
        "id": 38,
        "name": "数字优惠码响应",
        "type": "tchannelresponseDigitalPromoCode",
        "viewable": true
      }],
      "name": "tchannelresponse",
      "text": "渠道反馈"
    }, {
      "nodes": [{
        "id": 35,
        "name": "新会员等级设置",
        "type": "tdatammvipnew",
        "viewable": true
      }, {
        "id": 32,
        "name": "会员等级设置",
        "type": "tdatammvip",
        "viewable": true
      }, {
        "id": 31,
        "name": "客户分组操作",
        "type": "tdatacustomgroup",
        "viewable": true
      }, {
        "id": 33,
        "name": "属性修改",
        "type": "tdataattributeedit",
        "viewable": true
      }],
      "name": "tdata",
      "text": "数据操作"
    }, {
      "nodes": [{
        "id": 27,
        "name": "效果跟踪",
        "type": "tanalysisEffect",
        "viewable": true
      }, {
        "id": 28,
        "name": "订单分析",
        "type": "tanalysisorder",
        "viewable": true
      }, {
        "id": 29,
        "name": "营销效果",
        "type": "tanalysiseffmarket",
        "viewable": true
      }, {
        "id": 99,
        "name": " 客户特征分析",
        "type": "tanalysisFeature",
        "viewable": true
      }],
      "name": "tanalysis",
      "text": "客户分析"
    }]);
  },
  "putworkflow": function(req, res) { //加载打开流程节点
    res.send({
      "nodes": [{
        "id": 28,
        "type": "tflowstart",
        "name": "开始",
        "style": "tflowstart;image=../images/graph/icon/lc_begin.png",
        "x": 100,
        "y": 200,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 29,
        "type": "tflowtime",
        "name": "时间",
        "style": "tflowtime;;image=../images/graph/icon/lc_time.png",
        "x": 200,
        "y": 200,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 30,
        "type": "tflowwait",
        "name": "等待",
        "style": "tflowtime;;image=../images/graph/icon/lc_time.png",
        "x": 300,
        "y": 200,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 30,
        "type": "tfilterfind",
        "name": "查询",
        "style": "tfilterfind;;image=../images/graph/icon/lc_time.png",
        "x": 500,
        "y": 200,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 30,
        "type": "tcommunicateEDM",
        "name": "EDM",
        "style": "tfilterfind;;image=../images/graph/icon/lc_time.png",
        "x": 420,
        "y": 190,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 30,
        "type": "tdataattributeedit",
        "name": "属性修改",
        "style": "tfilterfind;;image=../images/graph/icon/lc_time.png",
        "x": 370,
        "y": 80,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 37,
        "type": "tfiltersplit",
        "name": "拆分节点",
        "style": "tfiltersplit;image=mxGraph/images/flowIcon/tfiltersplit.png",
        "x": 570,
        "y": 200,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 38,
        "type": "tcustomertargetgroup",
        "name": "目标组",
        "style": "tcustomertargetgroup;image=mxGraph/images/flowIcon/tcustomertargetgroup.png;",
        "x": 670,
        "y": 200,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 33,
        "type": "tdiscountUMP",
        "name": "定向优惠卡",
        "style": "tdiscountUMP;;image=../images/flowIcon/tdiscountUMP.png",
        "x": 550,
        "y": 80,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 34,
        "type": "tdiscountEC",
        "name": "优惠券",
        "style": "tdiscountEC;;image=../images/flowIcon/tdiscountEC.png",
        "x": 460,
        "y": 80,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 36,
        "type": "teximimport",
        "name": "名单匹配",
        "style": "teximimport;;image=../images/flowIcon/teximimport.png",
        "x": 730,
        "y": 80,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 39,
        "type": "tfilterexclude",
        "name": "排除",
        "style": "tfilterexclude;;image=../images/flowIcon/tfilterexclude.png",
        "x": 800,
        "y": 80,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 45,
        "type": "tfiltergrouppriority",
        "name": "排重",
        "style": "tfiltergrouppriority;;image=../images/flowIcon/tfiltergrouppriority.png",
        "x": 800,
        "y": 300,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 50,
        "type": "tfiltersample",
        "name": "抽样",
        "style": "tfiltersample;;image=../images/flowIcon/tfiltersample.png",
        "x": 1000,
        "y": 300,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 55,
        "type": "teximmarketingondemand",
        "name": "立即营销",
        "style": "teximmarketingondemand;;image=../images/flowIcon/teximmarketingondemand.png",
        "x": 1100,
        "y": 300,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 34,
        "type": "tdatammvip",
        "name": "会员等级设置",
        "style": "tfilterfind;;image=../images/flowIcon/tdiscountEC.png",
        "x": 160,
        "y": 80,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 35,
        "type": "tdatammvipnew",
        "name": "会员等级设置",
        "style": "tfilterfind;;image=../images/flowIcon/tdiscountEC.png",
        "x": 160,
        "y": 80,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }, {
        "id": 88,
        "type": "tflowblank",
        "name": "拆分组一",
        "style": "tfilterfind;;image=../images/flowIcon/tdiscountEC.png",
        "x": 650,
        "y": 350,
        "vertex": "1",
        "width": 52,
        "height": 52,
        "asT": "geometry"
      }],
      "connects": [{
        "id": 27,
        "source": 28,
        "target": 29,
        "edge": "1",
        "relative": "1",
        "asT": "geometry"
      }, {
        "id": 27,
        "source": 29,
        "target": 30,
        "edge": "1",
        "relative": "1",
        "asT": "geometry"
      }, {
        "id": 888,
        "source": 37,
        "target": 38,
        "edge": "1",
        "relative": "1",
        "asT": "geometry"
      }, {
        "id": 888,
        "source": 37,
        "target": 88,
        "edge": "1",
        "relative": "1",
        "asT": "geometry"
      }],
      "visit": "2013-10-23 14:42:39"
    })
  },
  "workflowPer": function(req, res) {
    res.send({ "id": 10000326, "createTime": "2016-03-25T15:42:24.000+0800", "updateTime": "2016-03-25T15:42:24.000+0800", "nodes": [{ "id": 10002782, "name": "时间", "workflowId": 10000326, "type": "tflowtime", "x": 200, "y": 200, "remark": null, "reserved": false }, { "id": 10002781, "name": "开始", "workflowId": 10000326, "type": "tflowstart", "x": 100, "y": 200, "remark": null, "reserved": false }, { "id": 10002783, "name": "查询", "workflowId": 10000326, "type": "tfilterfind", "x": 350, "y": 200, "remark": "", "reserved": false }], "connects": [{ "workflowId": 10000326, "source": 10002781, "target": 10002782, "position": 0, "name": null, "reserved": true }, { "workflowId": 10000326, "source": 10002782, "target": 10002783, "position": 0, "name": null, "reserved": false }], "reserved": false });
  },
  "workflow": function(req, res) { //加载打开流程节点
    res.send({
      "nodes": [
        {
          id: 10019153,
          name: "活动查询",
          remark: null,
          reserved: false,
          tenantId: "cartoon",
          type: "tfilterCampQuery",
          workflowId: 10001719,
          x: 130,
          y: 60,
        }, {
          "id": 28,
          "type": "tflowstart",
          "name": "开始",
          "style": "tflowstart;image=../images/graph/icon/lc_begin.png",
          "x": 100,
          "y": 200,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 29,
          "type": "tflowtime",
          "name": "时间这是世界建设路口干净利落了楼上的",
          "style": "tflowtime;;image=../images/graph/icon/lc_time.png",
          "x": 200,
          "y": 200,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry",
          "remark": ""
        }, {
          "id": 30,
          "type": "tflowwait",
          "name": "等待",
          "style": "tflowtime;;image=../images/graph/icon/lc_time.png",
          "x": 300,
          "y": 200,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 30,
          "type": "tfilterfind",
          "name": "查询",
          "style": "tfilterfind;;image=../images/graph/icon/lc_time.png",
          "x": 500,
          "y": 200,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry",
          "remark": "我的查询节点"
        }, {
          "id": 30,
          "type": "tcommunicateEDM",
          "name": "EDM",
          "style": "tfilterfind;;image=../images/graph/icon/lc_time.png",
          "x": 420,
          "y": 190,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 221,
          "type": "dclonedm",
          "name": "dktEDM",
          "style": "dclonedm;;image=../images/graph/icon/dclonedm.png",
          "x": 440,
          "y": 190,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 30,
          "type": "tdataattributeedit",
          "name": "属性修改",
          "style": "tfilterfind;;image=../images/graph/icon/lc_time.png",
          "x": 370,
          "y": 80,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 37,
          "type": "tfiltersplit",
          "name": "拆分节点",
          "style": "tfiltersplit;image=mxGraph/images/flowIcon/tfiltersplit.png",
          "x": 570,
          "y": 200,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 38,
          "type": "tcustomertargetgroup",
          "name": "目标组",
          "style": "tcustomertargetgroup;image=mxGraph/images/flowIcon/tcustomertargetgroup.png;",
          "x": 670,
          "y": 200,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 33,
          "type": "tdiscountUMP",
          "name": "定向优惠",
          "style": "tdiscountUMP;;image=../images/flowIcon/tdiscountUMP.png",
          "x": 550,
          "y": 80,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 34,
          "type": "tdiscountEC",
          "name": "店铺优惠券",
          "style": "tdiscountEC;;image=../images/flowIcon/tdiscountEC.png",
          "x": 460,
          "y": 80,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 36,
          "type": "teximimport",
          "name": "名单匹配",
          "style": "teximimport;;image=../images/flowIcon/teximimport.png",
          "x": 730,
          "y": 80,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 39,
          "type": "tfilterexclude",
          "name": "排除",
          "style": "tfilterexclude;;image=../images/flowIcon/tfilterexclude.png",
          "x": 800,
          "y": 80,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 45,
          "type": "tfiltergrouppriority",
          "name": "排重",
          "style": "tfiltergrouppriority;;image=../images/flowIcon/tfiltergrouppriority.png",
          "x": 800,
          "y": 300,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 50,
          "type": "tfiltersample",
          "name": "<dasd我是",
          "style": "tfiltersample;;image=../images/flowIcon/tfiltersample.png",
          "x": 1000,
          "y": 300,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 55,
          "type": "teximmarketingondemand",
          "name": "立即营销",
          "style": "teximmarketingondemand;;image=../images/flowIcon/teximmarketingondemand.png",
          "x": 1100,
          "y": 300,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 34,
          "type": "tdatammvip",
          "name": "会员等级设置",
          "style": "tfilterfind;;image=../images/flowIcon/tdiscountEC.png",
          "x": 160,
          "y": 80,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 191,
          "type": "dclonsms",
          "name": "dkt短信节点",
          "style": "dclonsms;;image=../images/flowIcon/dclonsms.png",
          "x": 260,
          "y": 80,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry"
        }, {
          "id": 88,
          "type": "tflowblank",
          "name": "拆分组一",
          "style": "tfilterfind;;image=../images/flowIcon/tdiscountEC.png",
          "x": 650,
          "y": 350,
          "vertex": "1",
          "width": 52,
          "height": 52,
          "asT": "geometry",
          "remark": "拖入节点"
        }],
      "connects": [{
        "id": 27,
        "name": 'asda',
        "source": 28,
        "target": 29,
        "edge": "1",
        "relative": "1",
        "asT": "geometry"
      }, {
        "id": 27,
        "name": null,
        "source": 29,
        "target": 30,
        "edge": "1",
        "relative": "1",
        "asT": "geometry"
      },
        {
          "id": 888,
          "name": null,
          "source": 37,
          "target": 38,
          "edge": "1",
          "relative": "1",
          "asT": "geometry"
        },
        {
          "id": 888,
          "name": "<abcde>",
          "source": 37,
          "target": 88,
          "edge": "1",
          "relative": "1",
          "asT": "geometry"
        }],
      "visit": "2013-10-23 14:42:39"
    })
  },
  "addCell": function(req, res) {
    res.send({
      "id": 456,
      "name": req.body.name,
      "workflowId": 123,
      "type": req.body.type,
      "x": req.body.x,
      "y": req.body.y,
      "description": "节点的描述"
    });
  },
  "deleteCell": function(req, res) {
    var nodes = req.body.nodes;
    var connects = req.body.connects;
    res.send({
      "nodes": nodes,
      "connects": connects
    })
  },
  "moveCell": function(req, res) {
    res.send();
  },
  "getCampStatusPer": function(req, res) {
    global.getCampStatusPerStatus = global.getCampStatusPerStatus ? global.getCampStatusPerStatus : 8;
    if (global.getCampStatusPerStatus === 8) {
      global.getCampStatusPerStatus = 11;
      res.send({ "campaignId": 10010548, "campaignStatus": "B3", "showJobList": true, "showReport": true, "jobList": [{ "jobId": 1099, "jobStatus": 8, "plantime": "2016-03-25T15:44:00.000+0800", "starttime": "2016-03-25T15:44:00.000+0800", "endtime": "2016-03-25T15:44:06.000+0800", "latestData": null, "subjobList": null }] });
    } else if (global.getCampStatusPerStatus === 11) {
      global.getCampStatusPerStatus = 21;
      res.send({ "campaignId": 10010548, "campaignStatus": "B3", "showJobList": true, "showReport": true, "jobList": [{ "jobId": 1100, "jobStatus": 8, "plantime": "2016-03-26T15:44:00.000+0800", "starttime": null, "endtime": null, "latestData": null, "subjobList": null }, { "jobId": 1099, "jobStatus": 11, "plantime": "2016-03-25T15:44:00.000+0800", "starttime": "2016-03-25T15:44:00.000+0800", "endtime": "2016-03-25T15:44:06.000+0800", "latestData": null, "subjobList": null }] });
    } else {
      global.getCampStatusPerStatus = 8;
      res.send({ "campaignId": 10010548, "campaignStatus": "B3", "showJobList": true, "showReport": true, "jobList": [{ "jobId": 1100, "jobStatus": 8, "plantime": "2016-03-26T15:44:00.000+0800", "starttime": null, "endtime": null, "latestData": null, "subjobList": null }, { "jobId": 1099, "jobStatus": 21, "plantime": "2016-03-25T15:44:00.000+0800", "starttime": "2016-03-25T15:44:00.000+0800", "endtime": "2016-03-25T15:44:06.000+0800", "latestData": null, "subjobList": null }] });
    }
  },
  "getCampStatus": function(req, res) {
    res.send({
      "campaignId": 123456,
      "campaignStatus": "A1",
      "showJobList": true,
      "showReport": true,
      "jobList": [
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },

        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },

        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-05T14:55:00.000+0800", "starttime": "2014-12-05T14:55:00.000+0800", "endtime": "2014-12-05T14:56:55.000+0800", "latestData": null, "subjobList": null },
        { "jobId": 4157, "jobStatus": 21, "plantime": "2014-12-06T14:22:00.000+0800", "starttime": "2014-12-06T19:55:00.000+0800", "endtime": "2014-12-06T14:56:55.000+0800", "latestData": null, "subjobList": null }
      ]

    });
  },
  "multiLine": function(req, res) {
    res.send({
      "nodes": [
        { "id": 48, "type": "tflowblank", "name": "拆分2", "x": 670, "y": 300 }
      ],
      "connects": [
        { "source": 37, "target": 48, "position": 1, "reserved": false }
      ]
    });
  },
  "classification": function(req, res) {
    res.send([
      { "id": 1, "name": "所有", "open": true, "pId": 0 },
      { "id": 2, "name": "测试a", "open": false, "pId": 1 },
      { "id": 4, "name": "测试", "open": false, "pId": 2 },
      { "id": 5, "name": "aaa", "open": false, "pId": 1 },
      { "id": 6, "name": "bbbb", "open": true, "pId": 1 },
      { "id": 7, "name": "ddddd", "open": true, "pId": 6 },
      { "id": 8, "name": "yyyyyyyy", "open": true, "pId": 1 },
      { "id": 9, "name": "gggggg", "open": true, "pId": 2 },
      { "id": 10, "name": "未分类", "open": true, "pId": 1 },
      { "id": 11, "name": "bbbbb", "open": true, "pId": 2 },
      { "id": 12, "name": "fgggg", "open": false, "pId": 2 }
    ])
  },
  "addNode": function(req, res) {
    res.send({});
  },
  "deleteNode": function(req, res) {
    res.send({});
  },
  "renameNode": function(req, res) {
    res.send({});
  },
  "moveNode": function(req, res) {
    res.send({});
  },
  "status": function(req, res) {
    var s = req.query.data_from + 1;
    res.send({
      "jobId": 123,
      "jobStatus": 21,
      "latest_data": s,
      "subjobList": [
        { "subjobId": 1001, "nodeId": 28, "nodeType": "tfstart", "subjobStatus": 9, "tips": "同时执行节点数已超过xx个，排队中", "planTime": "2013-04-09 12:00:00", "startTime": "2013-04-09 12:00:00", "endTime": "2013-04-09 12:00:05", "duration": "5s", "outputMsg": "8人", "memo": "" },
        { "subjobId": 1001, "nodeId": 31, "nodeType": "tfstart", "subjobStatus": 21, "planTime": "2013-04-09 12:00:00", "startTime": "2013-04-09 12:00:00", "endTime": "2013-04-09 12:00:05", "duration": "5s", "outputMsg": "8人", "memo": "" },
        { "subjobId": 1001, "nodeId": 32, "nodeType": "tcommunicateEDM", "subjobStatus": 55, "planTime": "2013-04-09 12:00:00", "startTime": "2013-04-09 12:00:00", "endTime": "2013-04-09 12:00:05", "duration": "5s", "outputMsg": "8人", "memo": "" },
        { "subjobId": 1002, "nodeId": 29, "nodeType": "tftime", "subjobStatus": 11, "startTime": "2013-04-09 12:00:00", "endTime": "2013-04-09 12:00:05", "duration": "5s", "outputMsg": "100人", "memo": "" },
        { "subjobId": 1003, "nodeId": 30, "nodeType": "tfwait", "subjobStatus": 11, "startTime": "2013-04-09 12:00:00", "endTime": "2013-04-09 12:00:05", "duration": "5s", "outputMsg": "10人", "memo": "", "header": "8" }
      ]
    })
  },
  //获取指定周期下指定节点的执行状态 added by 茅丹丹 2014-4-29 小屈
  "nodeStatus": function(req, res) {
    res.send({
      "subjobId": 1001,
      "jobId": 123,
      "nodeId": 28,
      "isShow": "true",
      "isDownload": "true",
      "subjobStatus": 21,
      "planTime": "2013-04-09 12:00:00",
      "startTime": "2013-04-09 12:00:00",
      "endTime": "2013-04-09 12:00:00",
      "duration": 20,
      "isTest": null,
      "header": "sss",
      "tips": "ssss"
    })
  },
  "users": function(req, res) {
    res.send([
      { "id": 10000, "loginName": "tomwalk", "fullView": 'fulltomwalk' },
      { "id": 10001, "loginName": "大狗子", "fullView": 'full大狗子' }
    ]);
  },
  "category": function(req, res) {
    res.send([
      { "categoryId": "活动类型1", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型2", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型3", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型4", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型5", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型6", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型7", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型8", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型9", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型10", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型11", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型12", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型13", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型14", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型15", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型16", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型17", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型18", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型19", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型20", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型21", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型22", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型23", "categoryValue": "活动类型名", "disabled": false },
      { "categoryId": "活动类型24", "categoryValue": "活动类型名", "disabled": true },
      { "categoryId": "活动类型25", "categoryValue": "活动类型名", "disabled": false }
    ])
  },
  "changeTypeCategory": function(req, res) {
    res.send({});
  },
  "deleteCategory": function(req, res) {
    res.send({});
  },
  "validate": function(req, res) {
    res.send({
      "workflowId": 567,
      "pass": true,
      "details": [
        { "type": "error", "message": "流程中存在闭环" },
        { "type": "error", "message": "流程中存在孤立节点" },
        { "type": "error", "nodeId": 29, "message": "时间未配置" },
        { "type": "error", "nodeId": 28, "message": "开始节点未配置" }
      ]
    })
  },
  "putTest": function(req, res) {
    res.send({ "campaignId": 123, "campaignStatus": "B1", "prevStatus": "A1" });
  },
  "postCategory": function(req, res) {
    res.send({ "categoryId": "活动类型id", "categoryValue": "活动类型名", "disabled": "" })
  },
  "deleteCategory": function(req, res) {
    res.send({ "categoryId": "活动类型id", "categoryValue": "活动类型名", "disabled": "" });
  },
  "updateCampaignPer": function(req, res) {
    res.send({ "campId": 10010548, "campName": "dfghdfgh", "createdTime": null, "status": null, "edition": null, "creater": "admin", "approver": "admin", "category": null, "templateId": 1, "templateName": "默认模版", "classification": "未分类", "remark": "", "categoryId": null, "classificationId": 2, "createrName": null, "approverName": null, "workflowId": 10000326, "createrId": null, "approverId": 10000129, "transfer_version": null, "transfer_pk_camp_id": null, "cloneTemplate": false, "supportOps": ["ADD", "DEL", "UPDATE", "VIEW", "CLICK"] });
  },
  "updateCampaign": function(req, res) {
    res.send({
      "campId": 4,
      "campName": "名字就是这么长，你告我啊！！！",
      "cloneTemplate": true,
      "templateId": 1221,
      "templateName": "模板名称",
      "category": "类型",
      "categoryId": "111",
      "classification": "分类",
      "classificationId": "11111",
      "approver": "admin",
      "approverId": "111",
      "createrId": "111",
      "creater": "admin",
      "workflowId": 2121,
      "id": '9393939000002',
      "name": '双十一天猫预热活动,名称就是这么吊！',
      "status": 'A6',
      "isCycle": true,
      "createrName": '##逗比熊爷##',
      "createAt": '2017-09-10',
      "startTime": '2017-09-10',
      "endTime": '2017-09-30',
      "remark": "就是一个备注内容，嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟嘚瑟……………………"
    });
  },
  "putCampaign": function(req, res) {
    res.send({ "id": 10000014, "name": "对萨达", "templateId": null, "categoryId": 124, "classificationId": 134, "approverId": 111, "createrId": 111, "workflow": { "id": 10000017, "createTime": 1383882012501, "updateTime": 1383882012501, "nodes": null, "connects": null, "reserved": false }, "edition": "STANDARD", "status": { "statusId": "A1", "statusValue": "设计中", "sortNo": 1 }, "disabled": false, "remark": "倒萨", "createAt": 1383882012497, "updatedAt": null, "creater": null, "approver": null, "cloneTemplate": null });
  },
  "deleteCampaign": function(req, res) {
    res.send({ "categoryId": "活动类型id", "categoryValue": "活动类型名", "disabled": "" })
  },
  "getAllCitys": function(req, res) {
    var id = req.route.params["id"];
    if (id == 0) {
      res.send([{
        "id": "1",
        "name": "华东地区",
        "child": [{
          "id": "310000",
          "name": "上海",
          "child": [{
            "id": "311000",
            "name": "南京市",
            "child": [
              { "id": "311100", "name": "京东区" },
              { "id": "311200", "name": "秦淮区" }
            ]
          }, {
            "id": "312000",
            "name": "县",
            "child": [
              { "id": "312100", "name": "崇明县" }
            ]
          }]
        }, {
          "id": "320000",
          "name": "江苏省",
          "child": [{
            "id": "321000",
            "name": "南京市",
            "child": [
              { "id": "321100", "name": "市辖区" },
              { "id": "321200", "name": "玄武区" },
              { "id": "321300", "name": "白下区" },
              { "id": "321400", "name": "下关区" }
            ]
          }, {
            "id": "322000",
            "name": "无锡市",
            "child": [
              { "id": "322100", "name": "市辖区" },
              { "id": "322200", "name": "崇安区" },
              { "id": "322300", "name": "南长区" },
              { "id": "322400", "name": "北塘区" },
              { "id": "322500", "name": "西三区" }
            ]
          }, {
            "id": "323000",
            "name": "徐州市",
            "child": [
              { "id": "5", "name": "京东区" }
            ]
          }, {
            "id": "324000",
            "name": "常州市",
            "child": [
              { "id": "5", "name": "京东区" }
            ]
          }, {
            "id": "325000",
            "name": "苏州市",
            "child": [
              { "id": "5", "name": "京东区" }
            ]
          }]
        }, {
          "id": "330000",
          "name": "浙江省",
          "child": [{
            "id": "331000",
            "name": "南京市",
            "child": [
              { "id": "331100", "name": "京东区" }
            ]
          }]
        }, {
          "id": "340000",
          "name": "福建省",
          "child": [{
            "id": "341000",
            "name": "南京市",
            "child": [
              { "id": "341100", "name": "京东区" }
            ]
          }]
        }, {
          "id": "350000",
          "name": "安徽省",
          "child": [{
            "id": "351000",
            "name": "南京市",
            "child": [
              { "id": "351100", "name": "京东区" }
            ]
          }]
        }, {
          "id": "360000",
          "name": "江苏省",
          "child": [{
            "id": "361000",
            "name": "南京市",
            "child": [
              { "id": "361100", "name": "京东区" }
            ]
          }]
        }, {
          "id": "370000",
          "name": "山东省",
          "child": [{
            "id": "371000",
            "name": "南京市",
            "child": [
              { "id": "371100", "name": "京东区" }
            ]
          }]
        }]
      }, {
        "id": "2",
        "name": "华南地区",
        "child": [{
          "id": "410000",
          "name": "广东省",
          "child": [{
            "id": "411000",
            "name": "南京市",
            "child": [
              { "id": "411100", "name": "京东区" }
            ]
          }]
        }, {
          "id": "420000",
          "name": "广西壮族自治区",
          "child": [{
            "id": "421000",
            "name": "南京市",
            "child": [
              { "id": "421100", "name": "京东区" }
            ]
          }]
        }, {
          "id": "430000",
          "name": "海南省",
          "child": [{
            "id": "431000",
            "name": "南京市",
            "child": [
              { "id": "431100", "name": "京东区" }
            ]
          }]
        }, {
          "id": "440000",
          "name": "江苏省",
          "child": [{
            "id": "441000",
            "name": "南京市",
            "child": [
              { "id": "441100", "name": "京东区" }
            ]
          }]
        }]
      }, {
        "id": "3",
        "name": "华中地区",
        "child": [{
          "id": "510000",
          "name": "江苏省",
          "child": [{
            "id": "511000",
            "name": "南京市",
            "child": [
              { "id": "511100", "name": "京东区" }
            ]
          }]
        }]
      }, {
        "id": "4",
        "name": "华北地区",
        "child": [{
          "id": "610000",
          "name": "江苏省",
          "child": [{
            "id": "611000",
            "name": "南京市",
            "child": [
              { "id": "611100", "name": "京东区" }
            ]
          }]
        }]
      }, {
        "id": "5",
        "name": "西北地区",
        "child": [{
          "id": "710000",
          "name": "江苏省",
          "child": [{
            "id": "711000",
            "name": "南京市",
            "child": [
              { "id": "711100", "name": "京东区" }
            ]
          }]
        }]
      }, {
        "id": "6",
        "name": "西南地区",
        "child": [{
          "id": "810000",
          "name": "江苏省",
          "child": [{
            "id": "811000",
            "name": "南京市",
            "child": [
              { "id": "811100", "name": "京东区" }
            ]
          }]
        }]
      }, {
        "id": "7",
        "name": "东北地区",
        "child": [{
          "id": "910000",
          "name": "江苏省",
          "child": [{
            "id": "921000",
            "name": "南京市",
            "child": [
              { "id": "921100", "name": "京东区" }
            ]
          }]
        }]
      }]);
    }
  },
  //added by 茅丹丹
  "getCitys": function(req, res) {

    var type = req.route.params["type"];
    var id = req.route.params["id"];
    if (type == 0) {
      res.send(
        [
          { "id": "1", "name": "华东地区", "parentId": "0", "type": 0, "zip": null, "hasChild": true },
          { "id": "2", "name": "华南地区", "parentId": "0", "type": 0, "zip": null, "hasChild": true },
          { "id": "3", "name": "华中地区", "parentId": "0", "type": 0, "zip": null, "hasChild": true },
          { "id": "4", "name": "华北地区", "parentId": "0", "type": 0, "zip": null, "hasChild": true },
          { "id": "5", "name": "西北地区", "parentId": "0", "type": 0, "zip": null, "hasChild": true },
          { "id": "6", "name": "西南地区", "parentId": "0", "type": 0, "zip": null, "hasChild": true },
          { "id": "7", "name": "东北地区", "parentId": "0", "type": 0, "zip": null, "hasChild": true },
          { "id": "8", "name": "台港澳地区", "parentId": "0", "type": 0, "zip": null, "hasChild": false }
        ])
    } else if (type == 1) {
      if (id == 1) {
        res.send([
          { "id": "310000", "name": "上海", "parentId": "1", "type": 1, "zip": null, "hasChild": true },
          { "id": "320000", "name": "江苏省", "parentId": "1", "type": 1, "zip": null, "hasChild": true },
          { "id": "330000", "name": "浙江省", "parentId": "1", "type": 1, "zip": null, "hasChild": true },
          { "id": "340000", "name": "安徽省", "parentId": "1", "type": 1, "zip": null, "hasChild": true },
          { "id": "350000", "name": "福建省", "parentId": "1", "type": 1, "zip": null, "hasChild": true },
          { "id": "370000", "name": "山东省", "parentId": "1", "type": 1, "zip": null, "hasChild": false }
        ])
      } else if (id == 2) {
        res.send([
          { "id": "440000", "name": "广东省", "parentId": "2", "type": 1, "zip": null, "hasChild": true },
          { "id": "450000", "name": "广西壮族自治区", "parentId": "2", "type": 1, "zip": null, "hasChild": true },
          { "id": "460000", "name": "海南省", "parentId": "2", "type": 1, "zip": null, "hasChild": true }
        ])
      } else if (id == 3) {
        res.send([
          { "id": "360000", "name": "江西省", "parentId": "3", "type": 1, "zip": null, "hasChild": true },
          { "id": "410000", "name": "河南省", "parentId": "3", "type": 1, "zip": null, "hasChild": true },
          { "id": "420000", "name": "湖北省", "parentId": "3", "type": 1, "zip": null, "hasChild": true },
          { "id": "430000", "name": "湖南省", "parentId": "3", "type": 1, "zip": null, "hasChild": true }
        ])
      } else if (id == 4) {
        res.send([
          { "id": "110000", "name": "北京", "parentId": "4", "type": 1, "zip": null, "hasChild": true },
          { "id": "120000", "name": "天津", "parentId": "4", "type": 1, "zip": null, "hasChild": true },
          { "id": "130000", "name": "河北省", "parentId": "4", "type": 1, "zip": null, "hasChild": true },
          { "id": "140000", "name": "山西省", "parentId": "4", "type": 1, "zip": null, "hasChild": true },
          { "id": "150000", "name": "内蒙古自治区", "parentId": "4", "type": 1, "zip": null, "hasChild": true }
        ])
      } else {
        res.send([{ "id": "310230", "name": "崇明县", "parentId": "310200", "type": 3, "zip": null, "hasChild": true }]);
      }
    } else if (type == 2) {
      if (id == 310000) {
        res.send([
          { "id": "310100", "name": "上海市", "parentId": "310000", "type": 2, "zip": null, "hasChild": true },
          { "id": "310200", "name": "县", "parentId": "310000", "type": 2, "zip": null, "hasChild": true }
        ])
      } else if (id == 320000) {
        res.send([
          { "id": "320100", "name": "南京市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320200", "name": "无锡市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320300", "name": "徐州市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320400", "name": "常州市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320500", "name": "苏州市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320600", "name": "南通市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320700", "name": "连云港市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320800", "name": "淮安市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "320900", "name": "盐城市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "321000", "name": "扬州市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "321100", "name": "镇江市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "321200", "name": "泰州市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true },
          { "id": "321300", "name": "宿迁市", "parentId": "320000", "type": 2, "zip": null, "hasChild": true }
        ])
      } else if (id == 330000) {
        res.send([
          { "id": "330100", "name": "杭州市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330200", "name": "宁波市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330300", "name": "温州市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330400", "name": "嘉兴市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330500", "name": "湖州市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330600", "name": "绍兴市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330700", "name": "金华市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330800", "name": "衢州市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "330900", "name": "舟山市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "331000", "name": "台州市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true },
          { "id": "331100", "name": "丽水市", "parentId": "330000", "type": 2, "zip": null, "hasChild": true }
        ])
      } else {
        res.send([]);
      }

    } else if (type == 3) {
      if (id == 320100) {
        res.send([{
          "id": "320101",
          "name": "市辖区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320102",
          "name": "玄武区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320103",
          "name": "白下区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320104",
          "name": "秦淮区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320105",
          "name": "建邺区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320106",
          "name": "鼓楼区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320107",
          "name": "下关区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320111",
          "name": "浦口区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320113",
          "name": "栖霞区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320114",
          "name": "雨花台区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320115",
          "name": "江宁区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320116",
          "name": "六合区",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320124",
          "name": "溧水县",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }, {
          "id": "320125",
          "name": "高淳县",
          "parentId": "320100",
          "type": 3,
          "zip": null
        }])
      } else if (id == 320200) {
        res.send([{
          "id": "320201",
          "name": "市辖区",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320202",
          "name": "崇安区",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320203",
          "name": "南长区",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320204",
          "name": "北塘区",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320205",
          "name": "锡山区",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320206",
          "name": "惠山区",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320211",
          "name": "滨湖区",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320281",
          "name": "江阴市",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }, {
          "id": "320282",
          "name": "宜兴市",
          "parentId": "320200",
          "type": 3,
          "zip": null
        }])
      } else {
        res.send([{ "id": "310230", "name": "崇明县", "parentId": "310200", "type": 3, "zip": null }]);
      }

    }
  },
  //added by 茅丹丹 4-28 根据类别获取该级地区
  "getCityRelationship": function(req, res) {
    res.send(
      [{
        "id": "1,310000",
        "name": "华东地区,上海"
      }, {
        "id": "1,320000",
        "name": "华东地区,江苏省"
      }, {
        "id": "1,330000",
        "name": "华东地区,浙江省"
      }, {
        "id": "1,340000",
        "name": "华东地区,安徽省"
      }, {
        "id": "1,350000",
        "name": "华东地区,福建省"
      }, {
        "id": "1,370000",
        "name": "华东地区,山东省"
      }])
  },
  "getProvinceByArea": function(req, res) {
    res.send([{
      "id": "1,310000,320000,330000,340000,350000,370000",
      "name": "华东地区,上海,江苏省,浙江省,安徽省,福建省,山东省"
    }, {
      "id": "2,440000,450000,460000",
      "name": "华南地区,广东省,广西壮族自治区,海南省"
    }, {
      "id": "3,360000,410000,420000,430000",
      "name": "华中地区,江西省,河南省,湖北省,湖南省"
    }, {
      "id": "4,110000,120000,130000,140000,150000",
      "name": "华北地区,北京,天津,河北省,山西省,内蒙古自治区"
    }, {
      "id": "5,610000,620000,630000,640000,650000",
      "name": "西北地区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区"
    }, {
      "id": "6,500000,510000,520000,530000,540000",
      "name": "西南地区,重庆,四川省,贵州省,云南省,西藏自治区"
    }, {
      "id": "7,210000,220000,230000",
      "name": "东北地区,辽宁省,吉林省,黑龙江省"
    }, {
      "id": "8,920000,970000,990000",
      "name": "台港澳地区,台湾省,香港特别行政区,澳门特别行政区"
    }])
  },
  "umpList": function(req, res) {
    res.send({
      "total": 70,
      "page": 3,
      "data": [{
        "shopName": "测试店铺001",
        "umpId": 1,
        "name": "测试优惠",
        "userScopeType": 2,
        "userLevel": 1,
        "useConditionType": 0,
        "useConditionDetail": 30,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-15T16:22:45.000+0800",
        "goodsScopeType": 1,
        "goodsIds": "",
        "operateWayConditionType": "1",
        "operateWayConditionDetail": "3.8",
        "operateWay": 0,
        "operateWayDetail": 3,
        "creater": "MR.brown",
        "createTime": "2014-02-13T16:22:45.000+0800",
        "description": "纯测试商品级定向优惠",
        "status": 0
      }, {
        "shopName": "测试店铺002",
        "umpId": 2,
        "name": "测试优惠",
        "userScopeType": 2,
        "userLevel": 1,
        "useConditionType": 0,
        "useConditionDetail": 30,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-15T16:22:45.000+0800",
        "goodsScopeType": 1,
        "goodsIds": "",
        "operateWayConditionType": "1",
        "operateWayConditionDetail": "3.8",
        "operateWay": 0,
        "operateWayDetail": 3,
        "creater": "MR.brown",
        "createTime": "2014-02-13T16:22:45.000+0800",
        "description": "纯测试商品级定向优惠",
        "status": 0
      }]
    });
  },
  "umpAdd": function(req, res) {
    res.send({
      "code": "noApply",
      "msg": "http",
      "applyHttp": "http://container.api.taobao.com/container?appkey=12283535&scope=promotion,item,usergrade",
      "umpId": 1,
      "isNewStatus": true
    })
  },
  "umpModify": function(req, res) {
    res.send({
      "umpId": 70,
      "name": "VIP111133",
      "userScopeType": 1,
      "userScopeDetail": "3",
      "useConditionType": null,
      "useConditionDetail": null,
      "startTime": "2014-08-22T11:49:20.000+0800",
      "endTime": "2014-08-26T23:49:20.000+0800",
      "createTime": "2014-03-22T11:50:18.000+0800",
      "goodsScopeType": 2,
      "goodsIds": null,
      "operateWayConditionType": 3,
      "operateWayConditionDetail": "1",
      "operateWay": 1,
      "operateWayDetail": "1111.00",
      "description": "10000",
      "type": 0,
      "status": 0,
      "userId": 1,
      "postagve": 1,
      "postagveArea": "310000*320000*330000*340000*350000*370000",
      "userName": null,
      "shopId": 1,
      "shopName": "大狗子19890202",
      "startTimeString": null,
      "endTimeString": null,
      snapshootId: 3
    })
  },
  "getEmpowerContent": function(req, res) {
    res.send({
      "$schema": "http://json-schema.org/schema",
      "properties": "默认内容"
    })
  },
  "postApplyNotice": function(req, res) {
    res.send();
  },
  "tiJiao": function(req, res) {
    res.send({
      "code": "noApply",
      "msg": "http",
      "applyHttp": "http://container.api.taobao.com/container?appkey=12283535&scope=promotion,item,usergrade",
      "umpId": 1,
      "isNewStatus": true
    })
  },
  "couponAdd": function(req, res) {
    res.send({
      "code": "noApply",
      "msg": "http",
      "applyHttp": "http://container.api.taobao.com/container?appkey=12283535&scope=promotion,item,usergrade",
      "id": 1
    })
  },
  "couponModify": function(req, res) {
    res.send({
      "id": 1,
      "name": "测试优惠",
      "shopId": 2,
      "money": 22,
      "useConditionType": 0,
      "useConditionDetail": 30,
      "startTime": "2014-02-13T16:22:45.000+0800",
      "endTime": "2014-02-15T16:22:45.000+0800",
      "remark": "纯测试商品级定向优惠",
      "status": 0
    })
  },
  "couponList": function(req, res) {
    res.send({
      "total": 7,
      "page": 1,
      "data": [{
        "id": 111,
        "name": "四月份优惠",
        "shopName": "towlll",
        "money": 5,
        "useConditionType": 0,
        "useConditionDetail": 100,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-13T16:22:45.000+0800",
        "createName": "wwww",
        "remark": "打个测试备注",
        "status": 0,
        "createTime": "2014-02-13T16:22:45.000+0800"
      }, {
        "id": 112,
        "name": "四月份优惠",
        "shopName": "towlll",
        "money": 5,
        "useConditionType": 0,
        "useConditionDetail": 100,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-13T16:22:45.000+0800",
        "createName": "wwww",
        "remark": "打个测试备注",
        "status": 1,
        "createTime": "2014-02-13T16:22:45.000+0800"
      }]
    });
  },
  "senderSmsList": function(req, res) {
    res.send({
      "total": 4,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 41,
        "nodeId": 20000111,
        "jobId": 100001,
        "nodeName": "短信节点1",
        "gatewayName": "短信通道",
        "submitTime": "2014-03-18T14:36:00.000+0800",
        "submitNum": 1,
        "receiveTime": "2014-03-18T14:36:01.000+0800",
        "receiveNum": 1,
        "replyMoNum": "",
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }, {
        "id": 42,
        "nodeId": 20000111,
        "jobId": 100002,
        "nodeName": "短信节点1",
        "gatewayName": "短信通道",
        "submitTime": "2014-03-18T14:38:00.000+0800",
        "submitNum": 100,
        "receiveTime": "2014-03-18T14:38:11.000+0800",
        "receiveNum": 95,
        "replyMoNum": 0,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": true
      }, {
        "id": 43,
        "nodeId": 20000112,
        "jobId": 100003,
        "nodeName": "短信节点2",
        "gatewayName": "短信通道",
        "submitTime": "2014-03-18T14:39:00.000+0800",
        "submitNum": 987634,
        "receiveTime": "2014-03-18T14:40:01.000+0800",
        "receiveNum": 987600,
        "replyMoNum": 3,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }, {
        "id": 44,
        "nodeId": 20000113,
        "jobId": 100004,
        "nodeName": "短信节点3",
        "gatewayName": "短信通道",
        "submitTime": "2014-03-18T14:44:00.000+0800",
        "submitNum": 3333,
        "receiveTime": "2014-03-18T14:46:00.000+0800",
        "receiveNum": 1456,
        "replyMoNum": 3,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }]
    });
  },
  "senderSmsSummary": function(req, res) {
    res.send({
      "submitNumTotal": 10,
      "receiveNumTotal": 10,
      "replyMoNumTotal": 10
    })
  },
  "senderEdmSummary": function(req, res) {
    res.send({
      "submitNumTotal": 10,
      "receiveNumTotal": 10,
      "successNumTotal": 10,
      "errorNumTotal": 10,
      "bounceNumTotal": 10,
      "openNumTotal": 10,
      "clickNumTotal": 10
    })
  },
  "senderCouponSummary": function(req, res) {
    res.send({
      "submitNumTotal": 10,
      "successNumTotal": 10,
      "failNumTotal": 10,
      "unKnownNumTotal": 10,
      "usingNumTotal": 10,
      "usedNumTotal": 10,
      "unUsedNumTotal": 10
    })
  },
  "senderBenefitSummary": function(req, res) {
    res.send({
      "submitNumTotal": 10,
      "successNumTotal": 10,
      "failNumTotal": 10
    })
  },
  "articleRead": function(req, res) {
    res.send({
      "gongzhonghao" : 20,
      "huihua" : 20,
      "pengyouquan" : 20,
      "other" : 20,
    })
  },
  "senderumpSummary": function(req, res) {
    res.send({
      "submitNumTotal": 10,
      "successNumTotal": 10,
      "failNumTotal": 10
    })
  },
  "senderEdmList": function(req, res) {
    res.send({
      "total": 1,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 11,
        "campId": 20000003,
        "nodeId": 20000114,
        "jobId": 100005,
        "nodeName": "邮件节点1",
        "gatewayName": "EDM邮件通道",
        "submitTime": "2014-03-18T13:44:39.000+0800",
        "submitNum": 145,
        "receiveTime": "2014-03-18T13:45:39.000+0800",
        "receiveNum": 143,
        "successNum": 130,
        "errorNum": 2,
        "bounceNum": 11,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false,
        "sendInfoUrl": "www.baidu.com"
      }]
    });
  },
  "senderCouponList": function(req, res) {
    res.send({
      "total": 1,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 11,
        "campId": 20000003,
        "nodeId": 20000115,
        "jobId": 100006,
        "nodeName": "优惠券1",
        "couponId": 10000032,
        "submitTime": "2014-03-18T13:49:39.000+0800",
        "submitNum": 3456,
        "successNum": 3401,
        "failNum": 51,
        "unknownNum": 4,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }]
    });
  },
  "senderBenefitList": function(req, res) {
    res.send({ "page": 1, "pageSize": 30, "data": [{ "id": 30, "campId": 1, "nodeId": 10024850, "jobId": 2339377567, "submitTime": "2016-04-18T14:13:16.000+0800", "submitNum": 3, "successNum": 3, "failNum": 0, "succURL": null, "failURL": null, "updated": "2016-04-18T14:14:17.000+0800", "nodeName": "淘宝权益" }], "total": 1 });
  },
  "getChannelNodesKAO": function(req, res) {
    res.send({ "channels": [{ "nodeName": "SMS", "number": 0 }, { "nodeName": "EDM", "number": 1 }, { "nodeName": "优惠券", "number": 2 }, { "nodeName": "定向优惠", "number": 3 }, { "nodeName": "淘宝权益", "number": 4 }] })
  },
  "senderUmpList": function(req, res) {
    res.send({
      "total": 1,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 11,
        "campId": 20000003,
        "nodeId": 20000118,
        "jobId": 100009,
        "nodeName": "定向优惠1",
        "umpName": "商品优惠x21",
        "submitTime": "2014-03-18T13:51:39.000+0800",
        "submitNum": 31,
        "successNum": 30,
        "failNum": 1,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }]
    });
  },
  /*start 节点发送报告接口Added By 茅丹丹 2014/4/23*/
  //sms发送报告请求
  "senderSms": function(req, res) {
    res.send({
      "total": 100,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 41,
        "nodeId": 20000111,
        "jobId": 100001,
        "nodeName": "短信节点1",
        "gatewayName": "短信通道",
        "submitTime": "2014-03-18T14:36:00.000+0800",
        "submitNum": 1,
        "receiveTime": "2014-03-18T14:36:01.000+0800",
        "receiveNum": 1,
        "replyMoNum": 3,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }]
    })
  },
  //edm发送报告请求
  "senderEdm": function(req, res) {
    res.send({
      "total": 100,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 11,
        "campId": 20000003,
        "nodeId": 20000114,
        "jobId": 100005,
        "nodeName": "邮件节点1",
        "gatewayName": "EDM邮件通道",
        "submitTime": "2014-03-18T13:44:39.000+0800",
        "submitNum": 145,
        "receiveTime": "2014-03-18T13:45:39.000+0800",
        "receiveNum": 143,
        "successNum": 130,
        "errorNum": 2,
        "bounceNum": 11,
        "openNum": 2,
        "clickNum": 11,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }]
    });
  },
  //ump发送报告请求
  "senderUmp": function(req, res) {
    res.send({
      "total": 100,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 11,
        "campId": 20000003,
        "nodeId": 20000118,
        "jobId": 100009,
        "nodeName": "定向优惠1",
        "umpName": "商品优惠x21",
        "submitTime": "2014-03-18T13:51:39.000+0800",
        "submitNum": 31,
        "successNum": 30,
        "failNum": 1,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }]
    });
  },

  //营销效果分析
  "getmarketeffect": function(req, res) {
    res.send({
      "total": 2,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 1,
        "dt": '20140419',
        "nodeId": 20000115,
        "jobId": 100006,
        "submitNum": 3456,
        "succNum": 3401,
        "failNum": 51,
        "failedUrl": null
      }, {
        "id": 1,
        "dt": '20140419',
        "nodeId": 20000115,
        "jobId": 100006,
        "submitNum": 3456,
        "succNum": 3401,
        "failNum": 51,
        "failedUrl": null
      }, {
        "id": 1,
        "dt": '20140419',
        "nodeId": 20000115,
        "jobId": 100006,
        "submitNum": 3456,
        "succNum": 3401,
        "failNum": 51,
        "failedUrl": null
      }]
    });
  },
  //coupon发送报告请求
  "senderCoupon": function(req, res) {
    res.send({
      "total": 100,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 11,
        "campId": 20000003,
        "nodeId": 20000115,
        "jobId": 100006,
        "nodeName": "优惠券1",
        "couponId": 10000032,
        "submitTime": "2014-03-18T13:49:39.000+0800",
        "submitNum": 3456,
        "successNum": 3401,
        "failNum": 51,
        "unknownNum": 4,
        "usingNum": 51,
        "usedNum": 4,
        "updated": "2014-03-19T14:36:00.000+0800",
        "testExecute": false
      }]
    });
  },
  /*end 节点发送报告接口Added By 茅丹丹 2014/4/23*/
  "responseReportList": function(req, res) {
    res.send([{
      "targetNodeId": 100001,
      "targetNodeName": "目标组1",
      "data": [{
        "id": 100001,
        "campId": 3,
        "jobId": 10001,
        "targetNodeId": 100001,
        "targetNodeName": "目标组1",
        "targetCustomerSenderGroupNum": 100,
        "targetCustomerControlGroupNum": 20,
        "communicationNodeId": 100004,
        "communicationNodeName": "短信节点1",
        "communicationSenderGroupNum": 70,
        "communicationControlGroupNum": 0,
        "responseNodeId": 100007,
        "responseNodeName": "响应组1",
        "responseSenderGroupNum": 25,
        "responseControlGroupNum": 3,
        "responsePrecentSend": null,
        "responsePrecentControl": null,
        "responsePrecentUp": null
      }, {
        "id": 100002,
        "campId": 3,
        "jobId": 10001,
        "targetNodeId": 100001,
        "targetNodeName": "目标组1",
        "targetCustomerSenderGroupNum": 100,
        "targetCustomerControlGroupNum": 20,
        "communicationNodeId": 100005,
        "communicationNodeName": "EDM节点1",
        "communicationSenderGroupNum": 80,
        "communicationControlGroupNum": 0,
        "responseNodeId": 100007,
        "responseNodeName": "响应组1",
        "responseSenderGroupNum": 25,
        "responseControlGroupNum": 3,
        "responsePrecentSend": null,
        "responsePrecentControl": null,
        "responsePrecentUp": null
      }]
    }, {
      "targetNodeId": 100007,
      "targetNodeName": "响应组1",
      "data": [{
        "id": 100003,
        "campId": 3,
        "jobId": 10001,
        "targetNodeId": 100007,
        "targetNodeName": "响应组1",
        "targetCustomerSenderGroupNum": 20,
        "targetCustomerControlGroupNum": 8,
        "communicationNodeId": 100010,
        "communicationNodeName": "短信节点2",
        "communicationSenderGroupNum": 15,
        "communicationControlGroupNum": 0,
        "responseNodeId": 100011,
        "responseNodeName": "响应组2",
        "responseSenderGroupNum": 8,
        "responseControlGroupNum": 1,
        "responsePrecentSend": 20,
        "responsePrecentControl": null,
        "responsePrecentUp": null
      }, {
        "id": 100004,
        "campId": 3,
        "jobId": 10001,
        "targetNodeId": 100007,
        "targetNodeName": "响应组1",
        "targetCustomerSenderGroupNum": 20,
        "targetCustomerControlGroupNum": 8,
        "communicationNodeId": 100008,
        "communicationNodeName": "EDM节点2",
        "communicationSenderGroupNum": 17,
        "communicationControlGroupNum": 0,
        "responseNodeId": 100011,
        "responseNodeName": "响应组2",
        "responseSenderGroupNum": 8,
        "responseControlGroupNum": 1,
        "responsePrecentSend": null,
        "responsePrecentControl": 5,
        "responsePrecentUp": null
      }]
    }]);
  },
  "ordersLists": function(req, res) {
    res.send({
      "total": 100,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "shopName": "测试店铺001",
        "umpId": 1,
        "name": "测试优惠",
        "userScopeType": 2,
        "userLevel": 1,
        "useConditionType": 0,
        "useConditionDetail": 30,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-15T16:22:45.000+0800",
        "goodsScopeType": 1,
        "goodsIds": "",
        "operateWayConditionType": 1,
        "operateWayConditionDetail": "3.8",
        "operateWay": 0,
        "operateWayDetail": 3,
        "postagve": 1,
        "postagveArea": "310000*320000*330000*340000*350000*370000",
        "creater": "MR.brown",
        "createTime": "2014-02-13T16:22:45.000+0800",
        "description": "纯测试商品级定向优惠",
        "status": 0
      }, {
        "shopName": "测试店铺002",
        "umpId": 2,
        "name": "测试优惠",
        "userScopeType": 2,
        "userLevel": 1,
        "useConditionType": 0,
        "useConditionDetail": 30,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-15T16:22:45.000+0800",
        "goodsScopeType": 1,
        "goodsIds": "",
        "operateWayConditionType": 1,
        "operateWayConditionDetail": "3.8",
        "operateWay": 0,
        "operateWayDetail": 3,
        "postagve": 1,
        "postagveArea": "310000*320000*330000*340000*350000*370000",
        "creater": "MR.brown",
        "createTime": "2014-02-13T16:22:45.000+0800",
        "description": "纯测试商品级定向优惠",
        "status": 0
      }]
    });
  },
  "postageLists": function(req, res) {
    res.send({

      "total": 100,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "shopName": "测试店铺001",
        "umpId": 1,
        "name": "测试优惠",
        "userScopeType": 2,
        "userLevel": 1,
        "useConditionType": 0,
        "useConditionDetail": 30,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-15T16:22:45.000+0800",
        "goodsScopeType": 1,
        "goodsIds": "",
        "operateWayConditionType": 1,
        "operateWayConditionDetail": "3.8",
        "operateWay": "",
        "operateWayDetail": "",
        "postagve": 1,
        "postagveArea": "310000*320000*330000*340000*350000*370000",
        "creater": "MR.brown",
        "createTime": "2014-02-13T16:22:45.000+0800",
        "description": "纯测试包邮定向优惠",
        "status": 0
      }, {
        "shopName": "测试店铺002",
        "umpId": 2,
        "name": "测试优惠",
        "userScopeType": 2,
        "userLevel": 1,
        "useConditionType": 0,
        "useConditionDetail": 30,
        "startTime": "2014-02-13T16:22:45.000+0800",
        "endTime": "2014-02-15T16:22:45.000+0800",
        "goodsScopeType": 1,
        "goodsIds": "",
        "operateWayConditionType": 1,
        "operateWayConditionDetail": "3.8",
        "operateWay": "",
        "operateWayDetail": "",
        "postagve": 1,
        "postagveArea": "310000*320000*330000*340000*350000*370000",
        "creater": "MR.brown",
        "createTime": "2014-02-13T16:22:45.000+0800",
        "description": "纯测试包邮卡定向优惠",
        "status": 0
      }]

    });
  },
  /*start 活动模板 Added By 茅丹丹 2014-4-21*/
  //模版列表
  "getTemplateList": function(req, res) {
    res.send({
      "total": 100,
      "page": 1,
      "pageSize": 10,
      "data": [{
        "id": 123,
        "name": "大促模版1",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "是个↵sdg",
        "reference": "http://help.shuyun.com",
        "reserved": true,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }, {
        "id": 143456,
        "name": "大促模版3",
        "workflowId": 456,
        "creator": "admin",
        "createdAt": "2014-02-12T15:11:42.000+0800",
        "updatedAt": "2014-02-12T15:11:42.000+0800",
        "remark": "为大促定制，流程简化",
        "reference": "http://help.shuyun.com",
        "reserved": false,
        "thumbnail": "http://xxx/xxx.jpg"
      }

      ]
    })
  },
  //添加模版
  "addTemplate": function(req, res) {
    res.send({
      "id": 123,
      "name": "大促模版1",
      "workflowId": 456,
      "creator": "admin",
      "createdAt": "2014-02-12T15:11:42.000+0800",
      "remark": "为大促定制，流程简化",
      "reference": "http://help.xxx.com",
      "thumbnail": "http://xxx/xxx.jpg"
    })
  },
  //修改模版
  "updateTemplate": function(req, res) {
    res.send({
      "id": 123,
      "name": "双11模版1",
      "workflowId": 456,
      "creator": "admin",
      "createdAt": "2014-02-12T15:11:42.000+0800",
      "updatedAt": "2014-02-12T15:11:42.000+0800",
      "remark": "为大促定制，流程简化",
      "reference": "http://help.xxx.com",
      "thumbnail": "http://xxx/xxx.jpg"
    })
  },
  //单个模板
  "getTemplate": function(req, res) {
    res.send({
      "id": 123,
      "name": "双11模版1",
      "workflowId": 456,
      "creator": "admin",
      "createdAt": "2014-02-12T15:11:42.000+0800",
      "updatedAt": "2014-02-12T15:11:42.000+0800",
      "remark": "为大促定制，流程简化",
      "reference": "http://help.xxx.com",
      "thumbnail": "http://xxx/xxx.jpg"
    })
  },
  //删除
  "delelteTemplate": function(req, res) {
    res.send({})
  },
  //可用的模板 2014-04-22
  "getAvailableTemplates": function(req, res) {
    res.send([
      { "id": 1000033, "enabled": true, "reserved": false, "name": "11111111", "workflowId": 10000583, "creator": "admin", "createdAt": "2014-04-26T16:06:18.000+0800", "updatedAt": "2014-04-26T16:06:18.000+0800", "reference": null, "remark": "ss" },
      { "id": 1000034, "enabled": true, "reserved": false, "name": "1111", "workflowId": 10000586, "creator": "admin", "createdAt": "2014-04-26T16:40:13.000+0800", "updatedAt": "2014-04-26T16:40:13.000+0800", "reference": null, "remark": "11" },
      { "id": 1000035, "enabled": true, "reserved": false, "name": "test0428a", "workflowId": 10000592, "creator": "admin", "createdAt": "2014-04-28T10:50:06.000+0800", "updatedAt": "2014-04-28T10:50:06.000+0800", "reference": null, "remark": "lwj test" },
      { "id": 1000036, "enabled": true, "reserved": false, "name": "asdasd", "workflowId": 10000596, "creator": "admin", "createdAt": "2014-04-28T11:27:10.000+0800", "updatedAt": "2014-04-28T11:27:10.000+0800", "reference": null, "remark": null },
      { "id": 1000039, "enabled": true, "reserved": false, "name": "testTemplate", "workflowId": 10000617, "creator": "admin", "createdAt": "2014-04-28T12:57:25.000+0800", "updatedAt": "2014-04-28T12:57:25.000+0800", "reference": null, "remark": null },
      { "id": 1000040, "enabled": true, "reserved": false, "name": "123", "workflowId": 10000639, "creator": "admin", "createdAt": "2014-04-29T10:42:51.000+0800", "updatedAt": "2014-04-29T10:42:51.000+0800", "reference": null, "remark": null },
      { "id": 1000041, "enabled": true, "reserved": false, "name": "属性节点模板", "workflowId": 10000656, "creator": "admin", "createdAt": "2014-04-29T19:46:28.000+0800", "updatedAt": "2014-04-29T19:46:28.000+0800", "reference": null, "remark": "1" },
      { "id": 1000042, "enabled": true, "reserved": false, "name": "324444444", "workflowId": 10000664, "creator": "admin", "createdAt": "2014-04-29T21:03:33.000+0800", "updatedAt": "2014-04-30T14:26:10.000+0800", "reference": null, "remark": "1" },
      { "id": 1000043, "enabled": true, "reserved": false, "name": "123123123", "workflowId": 10000666, "creator": "admin", "createdAt": "2014-04-29T21:06:01.000+0800", "updatedAt": "2014-04-29T21:06:01.000+0800", "reference": null, "remark": null },
      { "id": 1000045, "enabled": true, "reserved": false, "name": "24513451414231441", "workflowId": 10000680, "creator": "admin", "createdAt": "2014-04-29T21:14:02.000+0800", "updatedAt": "2014-04-29T21:14:02.000+0800", "reference": null, "remark": null },
      { "id": 1000046, "enabled": true, "reserved": false, "name": "我是dgz模版", "workflowId": 10000685, "creator": "admin", "createdAt": "2014-04-30T11:14:09.000+0800", "updatedAt": "2014-04-30T11:14:09.000+0800", "reference": null, "remark": "111" },
      { "id": 1000047, "enabled": true, "reserved": false, "name": "11231231", "workflowId": 10000694, "creator": "admin", "createdAt": "2014-04-30T11:52:21.000+0800", "updatedAt": "2014-04-30T11:52:21.000+0800", "reference": null, "remark": "111" },
      { "id": 1000051, "enabled": true, "reserved": false, "name": "我是活动过来的模板哦", "workflowId": 10000705, "creator": "admin", "createdAt": "2014-04-30T15:42:01.000+0800", "updatedAt": "2014-04-30T15:42:01.000+0800", "reference": null, "remark": "1321" }
    ])
  },
  /*end 活动模板 Added By 茅丹丹 2014-4-21*/
  "getCustomerGroups": function(req, res) {
    res.send([{
      "customerGropNodeId": 100,
      "customerGropNodeName": '目标组1'
    }, {
      "customerGropNodeId": 200,
      "customerGropNodeName": '目标组2'
    }]);
  },
  "getChannelNodes": function(req, res) {
    res.send([{
      "channelNodeId": 500,
      "channelNodeName": '短信'
    }, {
      "channelNodeId": 800,
      "channelNodeName": '邮件'
    }]);
  },
  "evaluateTotal": function(req, res) {
    res.send([{ "jobId": 1003017, "shopId": null, "customerGroupNodeId": 10019403, "customerGroupNodeName": "目标组", "channelNodeId": 10019404, "channelNodeName": "短信", "controlGroupType": "发送组", "investmentNum": 1, "investmentPrice": 0.05, "returnNum": 0, "returnPrice": 0.0, "evaluateStartDate": "2014-09-02T16:31:02.000+0800", "evaluateEndDate": "2014-09-03T00:00:00.000+0800", "roi": "1:0.00" },
      { "jobId": 1003017, "shopId": null, "customerGroupNodeId": 10019403, "customerGroupNodeName": "目标组", "channelNodeId": 10019404, "channelNodeName": "短信", "controlGroupType": "控制组", "investmentNum": 0, "investmentPrice": 0.0, "returnNum": 0, "returnPrice": 0.0, "evaluateStartDate": "2014-09-02T16:31:02.000+0800", "evaluateEndDate": "2014-09-03T00:00:00.000+0800", "roi": "" }
    ])
  },
  "getCounponCounts": function(req, res) {
    res.send({
      "total": 150,
      "applyCount": 10
    });
  },
  "evaluateDay": function(req, res) {
    res.send([{
      "created": "2014-01-01",
      "customerGroupNodeName": "目标组",
      "channelNodeName": "短信",
      "controlGroupType": "发送组",
      "investmentNum": 1000,
      "investmentPrice": 50,
      "returnNum": 5,
      "returnPrice": 1000,
      "roi": "1900%"
    }, {
      "created": "2014-01-01",
      "customerGroupNodeName": "目标组",
      "channelNodeName": "短信",
      "controlGroupType": "控制组",
      "investmentNum": 0,
      "investmentPrice": 0,
      "returnNum": 0,
      "returnPrice": 0,
      "roi": ""
    }, {
      "created": "2014-01-02",
      "customerGroupNodeName": "目标组",
      "channelNodeName": "短信",
      "controlGroupType": "发送组",
      "investmentNum": 1000,
      "investmentPrice": 50,
      "returnNum": 5,
      "returnPrice": 1000,
      "roi": "1900%"
    }, {
      "created": "2014-01-01",
      "customerGroupNodeName": "目标组",
      "channelNodeName": "短信",
      "controlGroupType": "控制组",
      "investmentNum": 0,
      "investmentPrice": 0,
      "returnNum": 0,
      "returnPrice": 0,
      "roi": ""
    }])
  },
  "campaignNews": function(req, res) {
    res.send({
      "campId": 10000056,
      "campName": "测试后动审批流程",
      "createdTime": "2014-10-15 15:11:35",
      "creater": "admin",
      "status": "A3",
      "remark": "111111",
      "category": null,
      "listflow": [{
        "operator": "admin",
        "operation": "审批通过",
        "operate_time": "2014-10-15 15:17:06",
        "remark": null
      }, {
        "operator": "admin",
        "operation": "提交审批",
        "operate_time": "2014-10-15 15:14:23",
        "remark": null
      }, {
        "operator": "admin",
        "operation": "拒绝审批",
        "operate_time": "2014-10-15 15:12:55",
        "remark": "11111测试理由"
      }, {
        "operator": "admin",
        "operation": "提交审批",
        "operate_time": "2014-10-15 15:12:35",
        "remark": null
      }]
    })
  },
  'benefitActiveGrid': function(req, res) {
    res.send({
      "total": 30,
      "page": 1,
      "data": [{
        "relationId": "1111111111",
        "activityName": "双十一活动",
        "startTime": "2014-10-15 15:12:55",
        "endTime": "2014-10-15 15:12:55",
        "benefitCount": 5,
        "benefitName": "淘宝红包",
        "userName": "admin",
        "benefitId": 5121121,
        "status": 1,
        "remark": "纯测试商品级定向优惠"
      }, {
        "relationId": "222222222",
        "activityName": "双十一活动",
        "startTime": "2014-10-15 15:12:55",
        "endTime": "2014-10-15 15:12:55",
        "benefitCount": 5,
        "benefitName": "淘宝红包",
        "userName": "admin",
        "benefitId": 5121121,
        "status": 1,
        "remark": "纯测试商品级定向优惠"
      }, {
        "relationId": "3333333333",
        "activityName": "双十一活动",
        "startTime": "2014-10-15 15:12:55",
        "endTime": "2014-10-15 15:12:55",
        "benefitCount": 5,
        "benefitName": "淘宝红包",
        "userName": "admin",
        "benefitId": 5121121,
        "status": 2,
        "remark": "纯测试商品级定向优惠"
      }]
    })
  },
  'benefitListGrid': function(req, res) {
    res.send({
      "total": 300,
      "page": 1,
      "data": [{
        "benefitId": 24884006, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "我我我我我我我我我问的开个房间都是放假", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884007, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test2", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test3333", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }, {
        "benefitId": 24884008, //权益ID
        "benefitType": "ALIPAY_COUPON", //权益类型
        "benefitTypeName": "支付宝优惠券", //权益类型名称
        "benefitName": "test3333", //权益名称
        "status": "VALID",
        "usedMoney": 0,
        "sendNum": 0,
        "usedNum": 0,
        "endTime": "2015-08-27 17:45:05", //权益结束时间
        "outObjectId": "20150728000291010000940000149368",
        "relateActivityNum": 34, //关联活动数
        "startTime": "2015-07-28 17:45:05", //权益开始时间
        "totalNum": 10,
        "feature": {},
        "validTotalNum": 10,
        "denomination": 0
      }]
    })
  },
  'activityDetail': function(req, res) {
    res.send({
      "benefitId": 24884006, //权益ID
      "benefitType": "ALIPAY_COUPON", //权益类型
      "benefitTypeName": "ALIPAY_COUPON", //权益类型名称
      "benefitName": "test2", //权益名称
      "status": "VALID",
      "endTime": "2015-08-27 23:59:59", //权益结束时间
      "benefitPrice": 1,
      "startTime": "2015-07-28 17:12:47", //权益开始时间
      "outObjectId": "20150728000291010000940000149368",
      "totalNum": 10,
      "validTotalNum": 10,
      "denomination": 0,
      "totalMoney": 10
    })
  },
  'newActivityRelation': function(req, res) {
    res.send({
        "relationId": 1111111111, //活动权益关联ID，当做活动ID
        "msg": '用户名已经存在'
      }


    )
  },
  'updateActivity': function(req, res) {
    res.send({
        "isSuccess": true, //是否更新成功
        "msg": '没有删除的权限'
      }


    )
  },
  'benefitTypesList': function(req, res) {
    res.send({
      "benefitTypeList": [{
        "benefitType": "ALIPAY_COUPON",
        "benefitTypeName": "支付宝优惠券"
      }, {
        "benefitType": "YOUKU_NUMBER",
        "benefitTypeName": "优酷会员"
      }]
    })
  },
  'platDate': function(req, res) {
    res.send(
      [
        { segmentationId: 1, subjectId: "淘宝客户", platCode: "taobao" },
        { segmentationId: 100, subjectId: "京东客户", platCode: "jos" },
        /* { segmentationId: 400, subjectId: "一号店客户", platCode: "yhd" },
         { segmentationId: 500, subjectId: "拍拍客户", platCode: "pop" },
         { segmentationId: 600, subjectId: "当当客户", platCode: "dangdang" }*/
      ]
    )
  },
  'marketAttribute': function(req, res) {
    var id = /\d+?$/.exec(req.url);
    if (id) {
      res.send([
        {
          id: '2',
          code: 'campName',
          fieldName: "活动名称",
          seq: 2,
          dataType: 1,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填写活动名称',
          rule: {
            maxLength: 25,
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc',
          value: {
            value: '名称'
          }
        },
        {
          id: '2',
          code: 'campName',
          fieldName: "文本类型",
          seq: 2,
          dataType: 1,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填写活动名称',
          rule: {
            maxLength: 25,
            min: 1,
            max: 9
          },
          status: 2,
          notice: '文案提示',
          value: {
            value: '名称'
          }
        },
        {
          id: '3',
          code: 'classificationId',
          fieldName: "活动目录",
          seq: 2,
          dataType: 10,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填选择活动目录',
          rule: {
            operator: '单选',
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc',
          value: {
            value: 2
          }
        },
        {
          id: '31',
          code: 'gender',
          fieldName: "字符类型",
          seq: 2,
          status: 2,
          dataType: 3,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: false,
          showInList: true,
          isRequired: false,
          reqMsg: '请填选择活动目录',
          rule: {
            operator: '单选',
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc',
          value: {
            value: 'bbbb'
          }
        },
        {
          id: '32',
          code: 'gendermany',
          fieldName: "字符类型多选",
          seq: 2,
          status: 2,
          dataType: 3,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: false,
          reqMsg: '请填选择活动目录',
          rule: {
            operator: '多选',
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc',
          value: {
            value: 'bbbb,cccc'
          }
        },
        {
          id: '3',
          code: 'investigatorId',
          fieldName: "审批人",
          seq: 2,
          dataType: 11,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填选择审批人',
          rule: {
            operator: '单选',
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc',
          value: {
            value: 10001
          }
        },
        {
          id: '3',
          code: 'remark',
          fieldName: "备注",
          seq: 2,
          dataType: 12,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填填写备注',
          rule: {
            maxLength: 200,
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc',
          value: null
        },
        {
          id: '42',
          code: 'area',
          fieldName: "组织大区",
          seq: 2,
          status: 3,
          dataType: 7,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请选择大区',
          rule: {
            operator: '单选',
            min: 1,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 5,
          value: {
            value: '2'
          }
        },
        {
          id: '41',
          code: 'areashop',
          fieldName: "组织店铺",
          seq: 2,
          dataType: 7,
          status: 2,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请选择大区',
          rule: {
            operator: '多选',
            min: 1,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 3,
          value: {
            value: '2,3'
          }
        },
        {
          id: '43',
          code: 'goods',
          fieldName: "商品选择",
          seq: 2,
          dataType: 9,
          status: 2,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          platCode: 'taobao',
          segmentationId: 9,
          reqMsg: '请选择商品',
          rule: {
            maxLength: 200,
            min: 2,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc',
          value: {
            value: 4545,
            display: '已选择1件商品',
            ext: 1
          }
        },
        {
          id: '44',
          code: 'time',
          fieldName: "时间选择",
          seq: 2,
          dataType: 8,
          status: 3,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请选择时间',
          initValue: '2017-11-01T02:09:20.000Z',
          maxTime: '2017-11-07T02:09:20.000Z',
          minTime: '2017-11-01T02:09:20.000Z',
          rule: {
            operator: '多选',
            min: 1,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 3,
          value: {
            value: '2017-11-01T02:09:20.000Z'
          }
        }
      ])
    } else {
      res.send([
        {
          id: '2',
          code: 'campName',
          fieldName: "活动名称",
          seq: 2,
          dataType: 1,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填写活动名称',
          rule: {
            maxLength: 25,
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc'
        },
        {
          id: '2',
          code: 'campName',
          fieldName: "文本类型",
          seq: 2,
          dataType: 1,
          isCanEdit: true,
          isCanDisplay: true,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填写活动名称',
          rule: {
            maxLength: 25,
            min: 1,
            max: 9
          },
          defaultValue: '',
          status: 2,
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc'
        },
        {
          id: '3',
          code: 'classificationId',
          fieldName: "活动目录",
          seq: 2,
          dataType: 10,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: false,
          status: 2,
          reqMsg: '请填选择活动目录',
          rule: {
            operator: '单选',
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc'
        },
        {
          id: '31',
          code: 'gender',
          fieldName: "字符类型",
          seq: 2,
          status: 2,
          dataType: 3,
          isCanEdit: false,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填选择活动目录',
          rule: {
            operator: '单选',
            min: 1,
            max: 9
          },
          notice: '文案提示',
          defaultValue: 'cccc',
          cfgValue: 'aaaa,bbbb,cccc'
        },
        {
          id: '32',
          code: 'gendermany',
          fieldName: "字符类型多选",
          seq: 2,
          status: 2,
          dataType: 3,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填选择活动目录',
          rule: {
            operator: '多选',
            min: 2,
            max: 3
          },
          notice: '文案提示',
          defaultValue: 'aaaa,bbbb',
          initValue: 'aaaa,bbbb',
          cfgValue: 'aaaa,bbbb,cccc,dddd,eeee,ffff,gggg'
        },
        {
          id: '3',
          code: 'investigatorId',
          fieldName: "审批人",
          seq: 2,
          dataType: 11,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请填选择审批人',
          rule: {
            operator: '单选',
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc'
        },
        {
          id: '3',
          code: 'remark',
          fieldName: "备注",
          seq: 2,
          dataType: 12,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: false,
          reqMsg: '请填填写备注',
          rule: {
            maxLength: 200,
            min: 1,
            max: 9
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc'
        },
        {
          id: '42',
          code: 'area',
          fieldName: "组织大区组织大区组织大区组织大区组织大区",
          seq: 2,
          status: 3,
          dataType: 7,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请选择大区',
          rule: {
            operator: '单选',
            min: 1,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 5
        },
        {
          id: '41',
          code: 'areashop',
          fieldName: "组织店铺",
          seq: 2,
          dataType: 7,
          status: 2,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: false,
          reqMsg: '请选择大区',
          rule: {
            operator: '多选',
            min: 1,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 3
        },
        {
          id: '44',
          code: 'time',
          fieldName: "时间选择",
          seq: 2,
          dataType: 8,
          status: 2,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: true,
          reqMsg: '请选择时间',
          initValue: '2017-11-01T02:09:20.000Z',
          maxTime: '2017-11-07T02:09:20.000Z',
          minTime: '2017-11-01T02:09:20.000Z',
          rule: {
            operator: '多选',
            min: 1,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 3
        },
        {
          id: '43',
          code: 'goods',
          fieldName: "商品选择",
          seq: 2,
          dataType: 9,
          status: 2,
          isCanEdit: true,
          isCanDisplay: false,
          isCanUpdate: true,
          showInList: true,
          isRequired: false,
          platCode: 'taobao',
          segmentationId: 9,
          reqMsg: '请选择商品',
          rule: {
            maxLength: 200,
            min: 2,
            max: 3
          },
          notice: '文案提示',
          cfgValue: 'aaaa,bbbb,cccc'
        }
      ])
    }
  },
  'organizations': function(req, res) {
    res.send({
      data: [
        {
          id: 1,
          name: '大区一'
        },
        {
          id: 2,
          name: '大区a'
        },
        {
          id: 3,
          name: '大区b'
        },
        {
          id: 4,
          name: '大区c'
        }
      ]
    })
  },
  'edecathlonBI': function(req, res) {
    res.send({
      "result": true,
      "err_msg": "",
      "err_code": "0",
      "content": {
        "biurl": "http://www.taobao.com"
      }
    })
  }
};
