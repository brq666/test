/*
 * GET customerSegmentation data.
 */
var url = require("url");
module.exports = {
  //获取列表数据
  "getGroupCategoryList": function (req, res) {
    res.send({
      "page": 1,
      "pageSize": 20,
      "total": 100,
      "data": [
        {
          "id": 1,
          "groupName": "今天是星期四终于你我也兴趣abcdefghigkimgopqrsyuiwisy完美的一天9",
          "subjectId": 102,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "categoryId": "4",
          "customerCount": 23,
          "categoryName": "MG小象旗舰店4",
        }, {
          "id": 2,
          "groupName": "67676今天是星期四终于你我也兴趣abcdefghigkimgopqrsyuiwisy完美的一天9",
          "subjectId": 1056,
          "subjectName": "一号店客户",
          "groupType": "属性查询",
          "categoryId": "5",
          "customerCount": null,
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 3,
          "groupName": "第四分组",
          "subjectId": 10345,
          "subjectName": "当当客户",
          "groupType": "属性查询",
          "customerCount": 23,
          "categoryId": "7",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 4,
          "groupName": "第三4分组",
          "subjectId": 10267,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": null,
          "categoryId": "8",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 5,
          "groupName": "第三分组",
          "subjectId": 103422,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": 243,
          "categoryId": "3",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 6,
          "groupName": "第三分组",
          "subjectId": 13402,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": 2334,
          "categoryId": "3",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 7,
          "groupName": "第8分组",
          "subjectId": 103422,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "categoryId": "3",
          "customerCount": 23,
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 8,
          "groupName": "第9分组",
          "subjectId": 1011112,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": 23321,
          "categoryId": "3",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 9,
          "groupName": "第10分组",
          "subjectId": 105652,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": 2663,
          "categoryId": "3",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 10,
          "groupName": "这是一个45个汉字的分群颤抖吧愚蠢的人类哈哈哈哈哈哈哈就是这么厉害哒哒哒到肆拾伍了吧abc",
          "subjectId": 10562,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": 2663,
          "categoryId": "3",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 11,
          "groupName": "第三23分组",
          "subjectId": 1056231,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": 2663100,
          "categoryId": "3",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }, {
          "id": 12,
          "groupName": "第三23分组",
          "subjectId": 105624,
          "subjectName": "淘宝客户",
          "groupType": "属性查询",
          "customerCount": 263363,
          "categoryId": "3",
          "categoryName": "MG小象旗舰店4",
          "creator": "admin",
          "created": "2016-10-22T16:38:34.000+0800",
          "imgUrl": "1.jpg"
        }]
    })
  },
  //右侧tree
  "getCategoryTree": function (req, res) {
    res.send([
      {
        "id": 1,
        "categoryName": "全部",
        "open": true,
        "parentId": 0,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 1,
      }, {
        "id": 2,
        "categoryName": "系统内置目录",
        "open": false,
        "parentId": 1,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 1,
      }, {
        "id": 3,
        "categoryName": "内置1",
        "open": false,
        "parentId": 2,
        "groupCnt": 1034,
        "tenantId": "qiushi6",
        "categoryType": 1,
      }, {
        "id": 4,
        "categoryName": "内置222",
        "open": true,
        "parentId": 2,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 1,
      }, {
        "id": 5,
        "categoryName": "我是内置里user自定义第一个",
        "open": true,
        "parentId": 2,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 6,
        "categoryName": "内置里user自定义第二个",
        "open": false,
        "parentId": 2,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 7,
        "categoryName": "小巷有几何六七八九十23",
        "open": false,
        "parentId": 1,
        "groupCnt": 1034,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 8,
        "categoryName": "红颜若雪",
        "open": true,
        "parentId": 1,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 9,
        "categoryName": "红颜若雪child你是谁呀78",
        "open": true,
        "parentId": 8,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 10,
        "categoryName": "MG小象Shop",
        "open": true,
        "parentId": 1,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 11,
        "categoryName": "默认",
        "open": false,
        "parentId": 1,
        "groupCnt": 10,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 12,
        "categoryName": "这是一个有十五个字的目录你",
        "open": false,
        "parentId": 1,
        "groupCnt": 0,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 13,
        "categoryName": "helloworld",
        "open": false,
        "parentId": 1,
        "groupCnt": 0,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 14,
        "categoryName": "testttt",
        "open": false,
        "parentId": 1,
        "groupCnt": 7,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 15,
        "categoryName": "--阿萨德",
        "open": false,
        "parentId": 1,
        "groupCnt": 6,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 16,
        "categoryName": "te222stttt",
        "open": false,
        "parentId": 1,
        "groupCnt": 7,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 17,
        "categoryName": "00222阿萨德",
        "open": false,
        "parentId": 1,
        "groupCnt": 6,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 18,
        "categoryName": "你好",
        "open": false,
        "parentId": 1,
        "groupCnt": 7,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 19,
        "categoryName": "hello阿萨德",
        "open": false,
        "parentId": 1,
        "groupCnt": 6,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 20,
        "categoryName": "你你您",
        "open": false,
        "parentId": 1,
        "groupCnt": 7,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 21,
        "categoryName": "我问问",
        "open": false,
        "parentId": 1,
        "groupCnt": 6,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 22,
        "categoryName": "test而ttt",
        "open": false,
        "parentId": 1,
        "groupCnt": 7,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }, {
        "id": 23,
        "categoryName": "是否阿萨德",
        "open": false,
        "parentId": 1,
        "groupCnt": 6,
        "tenantId": "qiushi6",
        "categoryType": 0,
      }])
  },
  "getNewCategoryTree": function (req, res) {
    res.send([{
      "id": 1032,
      "tenantId": "ermei",
      "categoryName": "默认",
      "parentId": 1031,
      "categoryType": 1,
      "open": true,
      "groupCnt": 14
    }, {
      "id": 1042,
      "tenantId": "ermei",
      "categoryName": "这是一个有十五个字的目录你",
      "parentId": 1031,
      "categoryType": 0,
      "open": true,
      "groupCnt": 8
    }, {
      "id": 1046,
      "tenantId": "ermei",
      "categoryName": "这是一个有十五个字的目录你信",
      "parentId": 1031,
      "categoryType": 0,
      "open": true,
      "groupCnt": 4
    }, {
      "id": 1057,
      "tenantId": "ermei",
      "categoryName": "343",
      "parentId": 1031,
      "categoryType": 0,
      "open": true,
      "groupCnt": 0
    }, {
      "id": 1059,
      "tenantId": "ermei",
      "categoryName": "343",
      "parentId": 1046,
      "categoryType": 0,
      "open": true,
      "groupCnt": 2
    }, {
      "id": 2103,
      "tenantId": "ermei",
      "categoryName": "8900",
      "parentId": 1031,
      "categoryType": 0,
      "open": true,
      "groupCnt": 1
    }, {
      "id": 2146,
      "tenantId": "ermei",
      "categoryName": "1",
      "parentId": 2103,
      "categoryType": 0,
      "open": true,
      "groupCnt": 0
    }, {
      "id": 2147,
      "tenantId": "ermei",
      "categoryName": "干活干活就回家干活就刚",
      "parentId": 1031,
      "categoryType": 0,
      "open": true,
      "groupCnt": 0
    }, {
      "id": 2148,
      "tenantId": "ermei",
      "categoryName": "我们来自哪里",
      "parentId": 2103,
      "categoryType": 0,
      "open": true,
      "groupCnt": 0
    }, {
      "id": 2149,
      "tenantId": "ermei",
      "categoryName": "Excsd",
      "parentId": 2103,
      "categoryType": 0,
      "open": true,
      "groupCnt": 0
    }, {
      "id": 2152,
      "tenantId": "ermei",
      "categoryName": "这是一个有十五个字的_你信吗a",
      "parentId": 1046,
      "categoryType": 0,
      "open": true,
      "groupCnt": 0
    }, {
      "id": 2153,
      "tenantId": "ermei",
      "categoryName": "1234567890123",
      "parentId": 1031,
      "categoryType": 0,
      "open": true,
      "groupCnt": 0
    }])
  },
  "putDelNewCtg": function (req, res) {
    res.send({})
  },
  "addCategoryTree": function (req, res) {
    res.send({
      "id": 123,
      "open": false,
      "categoryName": "我是分类名",
      "parentId": 1,
      "groupCnt": 0,
      "tenantId": "qiushi6",
      "categoryType": 0
    });
  },
  "deleteCategoryTree": function (req, res) {
    res.send({});
  },
  "updateCategoryTree": function (req, res) {
    res.send({"id": 123, "categoryName": "分类名字", "parentId": 1, "open": false});
  },
  "saveParMove": function (req, res) {
    //res.statusCode=400
    // res.send({"args":[{"name":"groupName","value":"777"}],"message":"编辑失败,分组名称已存在"})
    res.send({
        "id": 1300,
        "subjectId": 1,
        "subjectName": null,
        "groupName": "打法啊士大夫",
        "categoryId": "未分类",
        "list": [
          {
            "id": 1,
            "categoryName": "全部",
            "open": true,
            "parentId": 0,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 1,
          }, {
            "id": 2,
            "categoryName": "系统内置目录",
            "open": false,
            "parentId": 1,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 1,
          }, {
            "id": 3,
            "categoryName": "内置1",
            "open": false,
            "parentId": 2,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 1,
          }, {
            "id": 4,
            "categoryName": "内置222",
            "open": true,
            "parentId": 2,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 1,
          }, {
            "id": 5,
            "categoryName": "我是内置里user自定义第一个",
            "open": true,
            "parentId": 2,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 6,
            "categoryName": "内置里user自定义第二个",
            "open": false,
            "parentId": 2,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 7,
            "categoryName": "小巷有几何",
            "open": false,
            "parentId": 1,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 8,
            "categoryName": "红颜若雪",
            "open": true,
            "parentId": 1,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 9,
            "categoryName": "红颜若雪child",
            "open": true,
            "parentId": 8,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 10,
            "categoryName": "MG小象Shop",
            "open": true,
            "parentId": 1,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 11,
            "categoryName": "test",
            "open": false,
            "parentId": 1,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 12,
            "categoryName": "啦啦啦",
            "open": false,
            "parentId": 1,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }, {
            "id": 13,
            "categoryName": "helloworld",
            "open": false,
            "parentId": 1,
            "groupCnt": 10,
            "tenantId": "qiushi6",
            "categoryType": 0,
          }
        ],
        "creator": null,
        "created": null,
        "groupType": "动态分组-属性查询",
        "customerCount": null,
        "result": "10014238",
      })
  },
  //删除单个列表数据
  "deleteSinglePar": function (req, res) {
    res.send({})
  },
  "isPostAdd":function (req,res) {
    res.send(
      //{"args":[{"name":"tenantId","value":"ermei"}],"message":"您最多只能创建20个客户分群，当前已达到20个。"}
    )
  },
  "addCustomerGroup": function (req, res) {//新建客户分群获取
    res.send({
      "nodeId": 123,
      "categories": [
        {
          "id": 1,
          "categoryName": "全部",
          "open": true,
          "parentId": 0,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 1,
        }, {
          "id": 2,
          "categoryName": "系统内置目录",
          "open": false,
          "parentId": 1,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 1,
        }, {
          "id": 3,
          "categoryName": "内置1",
          "open": false,
          "parentId": 2,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 1,
        }, {
          "id": 4,
          "categoryName": "内置222",
          "open": true,
          "parentId": 2,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 1,
        }, {
          "id": 5,
          "categoryName": "我是内置里user自定义第一个",
          "open": true,
          "parentId": 2,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 6,
          "categoryName": "内置里user自定义第二个",
          "open": false,
          "parentId": 2,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 7,
          "categoryName": "小巷有几何六七八九十23",
          "open": false,
          "parentId": 1,
          "groupCnt": 0,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 8,
          "categoryName": "红颜若雪",
          "open": true,
          "parentId": 1,
          "groupCnt": 0,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 9,
          "categoryName": "红颜若雪child你是谁呀78",
          "open": true,
          "parentId": 8,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 10,
          "categoryName": "MG小象Shop",
          "open": true,
          "parentId": 1,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 11,
          "categoryName": "默认",
          "open": false,
          "parentId": 1,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 12,
          "categoryName": "这是一个有十五个字的目录你",
          "open": false,
          "parentId": 1,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 13,
          "categoryName": "helloworld",
          "open": false,
          "parentId": 1,
          "groupCnt": 10,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 14,
          "categoryName": "testttt",
          "open": false,
          "parentId": 1,
          "groupCnt": 7,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 15,
          "categoryName": "--阿萨德",
          "open": false,
          "parentId": 1,
          "groupCnt": 6,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 16,
          "categoryName": "默认888",
          "open": false,
          "parentId": 1,
          "groupCnt": 1,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 17,
          "categoryName": "爽乐",
          "open": false,
          "parentId": 1,
          "groupCnt": 80,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 18,
          "categoryName": "23333",
          "open": false,
          "parentId": 1,
          "groupCnt": 1,
          "tenantId": "qiushi6",
          "categoryType": 0,
        }, {
          "id": 19,
          "categoryName": "last",
          "open": true,
          "parentId": 1,
          "groupCnt": 19,
          "tenantId": "qiushi6",
          "categoryType": 1,
        }],
      "groupType": [
        "属性查询",
        "订单查询",
        "活动查询"
      ]
    })
  },
  "postCreateGroup": function (req, res) {//保存
    res.send({
      "id": 3,
      "subjectId": 1,
      "subjectName": "淘宝客户",
      "groupName": "打法啊士大夫",
      "categoryId": 1,
      "categoryName": "未分类",
      "list": [
        {
          "id": 2,
          "categoryName": "未分类",
          "parentId": 1,
          "categoryType": 0,
        },
        {
          "id": 1,
          "categoryName": "所有",
          "parentId": null,
          "categoryType": 0,
        }
      ],
      "creator": null,
      "groupType": "属性查询",
      "customerCount": null,
      "result": 10014238,
    })
  },
  "getDetailCustomerGroup": function (req, res) {//获取分群详情
    res.send({
      "id": 3,
      "subjectId": "淘宝客户",
      "subjectName": "淘宝客户",
      "groupName": "niuoo2",
      "categoryName": "韩都衣舍",//所属目录名称
      "list": [
        {
          "id": 1,
          "categoryName": "所有分组",
          "open": true,
          "parentId": 0
        },
        {
          "id": 7,
          "categoryName": "默认",
          "parentId": 1,
          "categoryType": 0,
          "open": true
        },
        {
          "id": 5,
          "categoryName": "测试用的",
          "parentId": 3,
          "categoryType": 1,
          "open": true
        },
        {
          "id": 3,
          "categoryName": "预置分组",
          "parentId": 1,
          "categoryType": 1,
          "open": true
        },
        {
          "id": 2,
          "categoryName": "未分类",
          "parentId": 1,
          "categoryType": 0,
          "open": true
        }],
      "creator": "Sharon",
      "updated": "2016-10-22T16:38:34.000+0800",//分群人数更新时间
      "created": "2016-10-22T16:38:34.000+0800",//分群创建时间
      "modified": "2016-10-22T16:38:34.000+0800",//分群修改时间
      "groupType": "活动查询",
      "customerCount": 34522,
      "result": "10013784",
    })
  }

};
