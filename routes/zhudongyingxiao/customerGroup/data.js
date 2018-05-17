/*
 * GET customerGroup data.
 */
var url = require("url");
module.exports = {
  "getGroupCategory": function(req, res) {
    res.send([{
      "id": 1,
      "categoryName": "所有分组",
      "open": true,
      "parentId": 0
    }, {
      "id": 2,
      "categoryName": "测试a",
      "open": false,
      "parentId": 1
    }, {
      "id": 4,
      "categoryName": "测试",
      "open": false,
      "parentId": 2
    }, {
      "id": 5,
      "categoryName": "aaa",
      "open": false,
      "parentId": 1
    }, {
      "id": 6,
      "categoryName": "bbbb",
      "open": true,
      "parentId": 1
    }, {
      "id": 7,
      "categoryName": "ddddd",
      "open": true,
      "parentId": 6
    }, {
      "id": 8,
      "categoryName": "yyyyyyyy",
      "open": true,
      "parentId": 1
    }, {
      "id": 9,
      "categoryName": "gggggg",
      "open": true,
      "parentId": 2
    }, {
      "id": 10,
      "categoryName": "未分类",
      "open": true,
      "parentId": 1
    }, {
      "id": 11,
      "categoryName": "bbbbb",
      "open": true,
      "parentId": 2
    }, {
      "id": 12,
      "categoryName": "fgggg",
      "open": false,
      "parentId": 2
    }])
  },
  "addGroupCategory": function(req, res) {
    res.send({
      "id": 123,
      "categoryName": "分类名字",
      "parentId": 0,
      "open": false
    })
  },
  "putGroupCategory": function(req, res) {
    res.send({})
  },
  "deleteGroupCategory": function(req, res) {
    res.send({})
  },
  "getGroupCategoryList": function(req, res) {
    res.send({
      "page": 1,
      "pageSize": 20,
      "total": 12,
      "data": [{
        "id": 0,
        "subjectId": "11",
        "subjectName": "主题1",
        "groupName": "第一分组",
        "categoryId": "分类一",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 1,
        "subjectId": "12",
        "subjectName": "主题2",
        "groupName": "第二分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "静态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题3",
        "groupName": "第三分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 3,
        "subjectId": "13",
        "subjectName": "主题4",
        "groupName": "第四分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题5",
        "groupName": "第三分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题6",
        "groupName": "第三分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题7",
        "groupName": "第三分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题8",
        "groupName": "第8分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题9",
        "groupName": "第9分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题10",
        "groupName": "第10分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题33",
        "groupName": "第三23分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }]
    })
  },
  "getGroupCategoryListById": function(req, res) {
    res.send(
      [{
        "id": 0,
        "subjectId": "11",
        "subjectName": "主题1",
        "groupName": "第一分组",
        "categoryId": "分类一",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }, {
        "id": 1,
        "subjectId": "22",
        "subjectName": "主题2",
        "groupName": "第二分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "静态分组",
        "customerCount": 1223
      }, {
        "id": 2,
        "subjectId": "13",
        "subjectName": "主题3",
        "groupName": "第三分组",
        "categoryId": "分类二",
        "creator": "admin",
        "created": "2014-01-02T11:29:13.000+0800",
        "groupType": "动态分组",
        "customerCount": 1223
      }]
    )
  },
  "deleteCustomerGroup": function(req, res) {
    res.send({})
  },


  "putCreateGroup": function(req, res) {
    res.send({
      "id": 0,
      "subjectId": null,
      "groupName": null,
      "categoryId": null,
      "creator": null,
      "created": null,
      "groupType": "动态分组",
      "customerCount": null
    })
  },
  "editorCustomerGroup": function(req, res) {
    var reqId = /\/node\/group\/customerGroup\/(\d+)?.*/.exec(req.url)[1];
    var responseData;
    if (reqId == 1) {
      responseData = {
        "id": 999,
        "groupName": "分组",
        "groupType": "静态分组",
        "categoryId": "测试",
        "result": 888,
        "list": [
        {
          "id": 1,
          "categoryName": "所有分组",
          "open": true,
          "parentId": 0
        }, {
          "id": 2,
          "categoryName": "测试a",
          "open": false,
          "parentId": 1
        }, {
          "id": 4,
          "categoryName": "测试",
          "open": false,
          "parentId": 2
        }, {
          "id": 5,
          "categoryName": "aaa",
          "open": false,
          "parentId": 1
        }, {
          "id": 6,
          "categoryName": "bbbb",
          "open": true,
          "parentId": 1
        }, {
          "id": 7,
          "categoryName": "ddddd",
          "open": true,
          "parentId": 6
        }, {
          "id": 8,
          "categoryName": "yyyyyyyy",
          "open": true,
          "parentId": 1
        }, {
          "id": 9,
          "categoryName": "gggggg",
          "open": true,
          "parentId": 2
        }, {
          "id": 10,
          "categoryName": "未分类",
          "open": true,
          "parentId": 1
        }, {
          "id": 11,
          "categoryName": "bbbbb",
          "open": true,
          "parentId": 2
        }, {
          "id": 12,
          "categoryName": "fgggg",
          "open": false,
          "parentId": 2
        }]
      }
    } else {
      responseData = {
        "id": 999,
        "groupName": "分组",
        "groupType": "动态分组",
        "categoryId": "测试",
        "result": 888,
        "list": [
        {
          "id": 1,
          "categoryName": "所有分组",
          "open": true,
          "parentId": 0
        }, {
          "id": 2,
          "categoryName": "测试a",
          "open": false,
          "parentId": 1
        }, {
          "id": 4,
          "categoryName": "测试",
          "open": false,
          "parentId": 2
        }, {
          "id": 5,
          "categoryName": "aaa",
          "open": false,
          "parentId": 1
        }, {
          "id": 6,
          "categoryName": "bbbb",
          "open": true,
          "parentId": 1
        }, {
          "id": 7,
          "categoryName": "ddddd",
          "open": true,
          "parentId": 6
        }, {
          "id": 8,
          "categoryName": "yyyyyyyy",
          "open": true,
          "parentId": 1
        }, {
          "id": 9,
          "categoryName": "gggggg",
          "open": true,
          "parentId": 2
        }, {
          "id": 10,
          "categoryName": "未分类",
          "open": true,
          "parentId": 1
        }, {
          "id": 11,
          "categoryName": "bbbbb",
          "open": true,
          "parentId": 2
        }, {
          "id": 12,
          "categoryName": "fgggg",
          "open": false,
          "parentId": 2
        }]
      }
    }
    res.send(responseData);
  },
  "DataTables": function(req, res) {
    res.send({
      "page": 1,
      "pageSize": 20,
      "total": 12,
      "count": 12122121,
      "modified": "1993-12-10T00:00:00.000+0800",
      "headers": [{
        "displayName": "客户ID",
        "name": "客户ID",
        "indexId": "客户ID"
      }, {
        "displayName": "姓名",
        "name": "姓名",
        "indexId": "姓名"
      }, {
        "displayName": "性别",
        "name": "性别",
        "indexId": "性别"
      }, {
        "displayName": "生日",
        "name": "生日",
        "indexId": "生日"
      }, {
        "displayName": "年龄",
        "name": "年龄",
        "indexId": "年龄"
      }, {
        "displayName": "省份",
        "name": "省份",
        "indexId": "省份"
      }, {
        "displayName": "城市",
        "name": "城市",
        "indexId": "城市"
      }, {
        "displayName": "地区",
        "name": "地区",
        "indexId": "地区"
      }, {
        "displayName": "客户全站等级",
        "name": "客户全站等级",
        "indexId": "客户全站等级"
      }, {
        "displayName": "手机号",
        "name": "手机号",
        "indexId": "手机号"
      }, {
        "displayName": "Email",
        "name": "Email",
        "indexId": "Email"
      }, {
        "displayName": "买家信用等级",
        "name": "买家信用等级",
        "indexId": "买家信用等级"
      }, {
        "displayName": "买家好评率",
        "name": "买家好评率",
        "indexId": "买家好评率"
      }, {
        "displayName": "地址",
        "name": "地址",
        "indexId": "地址"
      }, {
        "displayName": "邮政编码",
        "name": "邮政编码",
        "indexId": "邮政编码"
      }],
      "data": [{
        "platform": "淘宝",
        "客户ID": "wj_huaat1",
        "姓名": "wj_huaat1",
        "性别": "m",
        "生日": "1993-12-10T00:00:00.000+0800",
        "年龄": 21,
        "手机号": "是",
        "Email": "ddd",
        "省份": "aa",
        "城市": "a",
        "地区": "aaa",
        "地址": "a"
      }, {
        "platform": "jd",
        "客户ID": "wj_huaat1",
        "姓名": "wj_huaat1",
        "性别": "f",
        "生日": "1993-12-10T00:00:00.000+0800",
        "年龄": 21,
        "手机号": "是",
        "Email": "ddd",
        "省份": "aa",
        "城市": "a",
        "地区": "aaa",
        "地址": "a"
      }]
    })
  },
  "getActivityNodeList": function(req, res) { // 活动选择器数据
    var paramsId = req.query.workflowid,
      resData;
    if (paramsId == 1) {
      resData = [{
        "id": 11,
        "name": "2节点一",
        "campaignId": 124,
        "campaignName": "2活动一"
      }, {
        "id": 21,
        "name": "2节点二",
        "campaignId": 124,
        "campaignName": "2活动一"
      }, {
        "id": 31,
        "name": "2节点三",
        "campaignId": 124,
        "campaignName": "2活动一"
      }, {
        "id": 41,
        "name": "2节点四",
        "campaignId": 124,
        "campaignName": "2活动一"
      }, {
        "id": 51,
        "name": "2节点五",
        "campaignId": 124,
        "campaignName": "2活动一"
      }]
    } else if (!paramsId) {
      resData = [];
    } else {
      resData = [{
        "id": 1,
        "name": "节点一",
        "campaignId": 123,
        "campaignName": "活动一"
      }, {
        "id": 2,
        "name": "节点二",
        "campaignId": 123,
        "campaignName": "活动一"
      }, {
        "id": 3,
        "name": "节点三",
        "campaignId": 123,
        "campaignName": "活动一"
      }, {
        "id": 4,
        "name": "节点四",
        "campaignId": 123,
        "campaignName": "活动一"
      }, {
        "id": 5,
        "name": "节点五",
        "campaignId": 123,
        "campaignName": "活动一"
      }]
    }
    res.send(resData);
  },
  "postActivityNodeList": function(req, res) {
    res.send({
      id: 123456
    });
  },
  "getStoreActivity": function(req, res) {
    res.send({
      "items": [{
        "campaignId": 3,
        "campaignName": "活动分组",
        "nodeId": 1,
        "nodeName": "你好"
      },{
        "campaignId": 4,
        "campaignName": "活动分组"
      },{
        "campaignId": 5,
        "campaignName": "活动分组"
      },{
        "campaignId": 6,
        "campaignName": "活动分组"
      }, {
        "campaignId": 1221,
        "campaignName": "活动分组"
      }]
    })
  }
};
