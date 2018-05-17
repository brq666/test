var url=require("url");
module.exports = {
    "deleteFile": function(req, res) {
        res.send(200, {
            "status" : 0
        });
    },
    "viewResult": function(req, res) {
        res.send([
            {
                "id":"2323",
                "fileName":"ExportOrderList2013-08-28.csv",
                "fileType":0,
                "importRecordTotal":"278,128",
                "fileRecordTotal":"268,128",
                "importErrTotal": "10000",
                "isImport":"是否导入系统",
                "createTime":"入库时间",
                "updateTime":"更新时间"
            },
            {
                "id":"2323",
                "fileName":"ExportItemList2013-08-28.csv",
                "fileType":1,
                "importRecordTotal":"378,128",
                "fileRecordTotal":"378,128",
                "importErrTotal": 0,
                "isImport":"是否导入系统",
                "createTime":"入库时间",
                "updateTime":"更新时间"
            }
        ]);
    },
    "checkImportStatus": function(req, res) {
        res.send([{
                        "id": "11",
                        "isSuccessful": true,
                        "isImport": 1,
                        "importSuccessfulTotal": "293,729,372",
                        "message": "错误消息"
                    }, {
                        "id": "33",
                        "isImport": 1,
                        "isSuccessful": true,
                        "importSuccessfulTotal": "293,729,372",
                        "message": "错误消息"
                    }, {
                        "id": "999",
                        "isImport": 1,
                        "isSuccessful": true,
                        "importSuccessfulTotal": "32",
                        "message": "错误消息"
                    }
                ]);
    },

    "getList": function(req, res) {
        res.send([{
              "pkId": "11",
              "tradeFileId": "http://localhost/ExportOrder.csv",
              "orderFileId": "http://localhost/ExportOrder.csv",
              "tradeFileName": "ExportOrderList2013-10-10.csv",
              "orderFileName": "ExportItemList2013-10-10.csv",
              "tradeTotal": "8,123",
              "orderTotal": "99,233",
              "isImport": 0,
              "dpId": "444444",
              "importSuccessfulTotal": "646,644"
            }, {
              "pkId": "22",
              "tradeFileId": "http://localhost/ExportOrder.csv",
              "orderFileId": "http://localhost/ExportOrder.csv",
              "tradeFileName": "",
              "orderFileName": "ExportItemlList2013-09-11.csv",
              "tradeTotal": "",
              "orderTotal": "99,233",
              "isImport": 0,
              "dpId": "444444",
              "importSuccessfulTotal": "0"
            }, {
              "pkId": "33",
              "tradeFileId": "http://localhost/ExportOrder.csv",
              "orderFileId": "http://localhost/ExportOrder.csv",
              "tradeFileName": "ExportOrderList2013-09-13.csv",
              "orderFileName": "ExportItemList2013-09-13.csv",
              "tradeTotal": "65,744",
              "orderTotal": "54,574",
              "isImport": 0,
              "dpId": "2323",
              "importSuccessfulTotal": "4,646,446"
            }, {
              "pkId": "44",
              "tradeFileId": "http://localhost/ExportOrder.csv",
              "orderFileId": "http://localhost/ExportOrder.csv",
              "tradeFileName": "ExportOrderList2013-09-10.csv",
              "orderFileName": "",
              "tradeTotal": "65,744",
              "orderTotal": "",
              "isImport": 0,
              "dpId": "2323",
              "importSuccessfulTotal": "0"
            }]);
    },

    "saveList": function(req, res) {
        res.send({
          "status": 0,
          "errCode": null,
          "message": null,
          "data": {
            "v": {
              "fileName": "ExportItemlList2016-11-16.csv",
              "newFileName": "b43fc9e8672f45ccb7640bdb3b73c8fc.csv",
              "fileFlag": "O",
              "rowNum": 1,
              "pkId": 353,
              "fileId": "5833a7bde4b04429e161f1f6",
              "dpId": "121944829",
              "check": true
            }
          },
          "visit": "2016-11-22 10:04:42"
        });
    },

    "startImport": function(req, res) {
        res.send({
            'id': 222,
            'result': false,
            'msg': '导入失败！'
        });
    },

    "importList": function(req, res) {
        res.send({
            'page': 1,
            'total':40,
            'data': [{
                'id': 123,
                'platform': 'ttt',
                'name': '323',
                'delimiter': ',',
                'hasColumnName': true | false,
                'totalNum': 999,
                'importNum': 888,
                'importTime': '2014-09-03T16:05:11.000+0800',
                'operator': 'admin'
            }, {
                'id': 124,
                'platform': 'ttt',
                'name': '323',
                'delimiter': ',',
                'hasColumnName': true | false,
                'totalNum': 999,
                'importNum': 888,
                'importTime': '2014-09-03T16:05:11.000+0800',
                'operator': 'admin'
            }]
        });
    },

    "importDetail": function(req, res) {
        res.send({
            'page': 1,
            'total': 1,
            'header': ['col0', 'col1', 'col2', 'col3'],
            'data': [{
                'col0': 'null',
                'col1': 'null',
                'col2': 'null',
                'col3': 'jjjjj'
            }, {
                'col0': 'fff',
                'col1': 'ssss',
                'col2': 'ddddd',
                'col3': 'jjjjj'
            }]
        });
    },

    "checkName": function(req, res) {
        res.send(true);
    },

    "getProgress": function(req, res) {
        res.send({
            'state': '4',
            'id': 222,
            'upload': 3000,
            'distinct': 2000,
            'verify': 1000
        });
    },

    "stopVerify": function(req, res) {
        res.send({
            'state': '2',
            'id': 222,
            'verify': []
        });
    },

    "startVerify": function(req, res) {
        res.send({
            'state': '3',
            'id': 22,
            'progress': 50
        });
    },
    "saveColumn": function(req, res) {
        res.send({
            'state': '2',
            'id': 22,
            'verify': [{
                'id': 1,
                'name': '系统已有客户校验（只允许导入系统内已有的客户ID）'
            }, {
                'id': 2,
                'name': '淘宝昵称合法性校验（只允许导入合法淘宝昵称的客户ID）'
            },{
                'id': 3,
                'name': '不校验(所有用户ID均可导入)'
            }]
        });
    },
    "saveFile": function(req, res) {
        res.send({
            'state': 1,
            'id': 11,
            'preview': {
                'header': ['col0', 'col1', 'col2', 'col3'],
                'data': [{
                    'col0': 'fff',
                    'col1': 'ssss',
                    'col2': 'ddddd',
                    'col3': 'jjjjj'
                }, {
                    'col0': 'fff',
                    'col1': 'ssss',
                    'col2': 'ddddd',
                    'col3': 'jjjjj'
                }]
            },
            'columns': [{
                'id': 1,
                'name': '客户ID',
                'tips': ''
            }, {
                'id': 22,
                'name': '性别'
            }, {
                'id': 33,
                'name': '性别ss',
                'tips': '主持块三看看看看看看看看看就看看看看看看看看'
            }, {
                'id': 44,
                'name': 'ss性别ss',
                'tips': 'ooxx'
            }]
        });
    },
 "getState": function(req, res) {
        res.send({
                'state': 1,
                'id':11,
                'preview':{
                    'header':['col0', 'col1', 'col2', 'col3'],
                    'data':[
                        {'col0':'fff', 'col1':'ssss', 'col2':'ddddd', 'col3':'jjjjj'},
                        {'col0':'fff', 'col1':'ssss', 'col2':'ddddd', 'col3':'jjjjj'}
                    ]
                },
                'batchColumns':[
                {
                    'id':1,
                    'bachId':222,
                    'columnId':22,
                    'order':0
                },{
                    'id':2,
                    'bachId':222,
                    'columnId':11,
                    'order':1
                }
                ],
                'columns': [
                     {'id':11,'name':'客户ID','tips':''},
                     {'id':22,'name':'性别'},
                     {'id':33,'name':'性别ss','tips':'主持块三看看看看看看看看看就看看看看看看看看'},
                     {'id':44,'name':'ss性别ss','tips':'ooxx'}
                ]
        });
        /*
        res.send({
            'state':4,
            'id':222,
            'upload':3000,
            'distinct':2000,
            'verify':1000
        });
        /*
        res.send({
                'state': 3,
                'id': 22,
                'progress':50
        });
        /*
        res.send({
                'state': 2,
                'id': 22,
                'verify':[
                    { 'id':1, 'name':'本地校验'},
                    { 'id':2, 'name':'就看看块淘宝校验'}
                ]
        });
        /*
        res.send({
                'state': 1,
                'id':11,
                'header':['col0', 'col1', 'col2', 'col3'],
                'data':[
                    {'col0':'fff', 'col1':'ssss', 'col2':'ddddd', 'col3':'jjjjj'},
                    {'col0':'fff', 'col1':'ssss', 'col2':'ddddd', 'col3':'jjjjj'}
                ],
                'columns': [
                     {'id':11,'name':'客户ID','tips':''},
                     {'id':22,'name':'性别'},
                     {'id':33,'name':'性别ss','tips':'主持块三看看看看看看看看看就看看看看看看看看'},
                     {'id':44,'name':'ss性别ss','tips':'ooxx'}
                ]
        });
        res.send({
            'state': 0,
            'id': 1,
            'platform': [{
                "id": 1,
                "name": "淘宝A"
            }, {
                "id": 2,
                "name": "淘宝B"
            }, {
                "id": 3,
                "name": "淘宝C"
            }],
            'columns': []
        });
        */
    },
    "getImporData": function(req, res) {
        /*
        res.send({
            'state':4,
            'id':222,
            'upload':3000,
            'distinct':2000,
            'verify':1000
        });
        /*
        res.send({
                'state': 3,
                'id': 22,
                'progress':50
        });
        /*
        res.send({
                'state': 2,
                'id': 22,
                'verify':[
                    { 'id':1, 'name':'本地校验'},
                    { 'id':2, 'name':'就看看块淘宝校验'}
                ]
        });
        */
        //res.send({"state":1,"id":100258,"preview":{"header":["第一列(客户ID)","第二列(姓名)","第三列(性别)","第四列(职业)","第五列(年龄)","第六列(生日)","第七列(手机号)"],"data":[{"第四列(职业)":"职业01","第二列(姓名)":"姓名01","第一列(客户ID)":"客户ID01","第七列(手机号)":"13500000000","第五列(年龄)":"20","第三列(性别)":"男","第六列(生日)":"2014/7/1"},{"第四列(职业)":"职业02","第二列(姓名)":"姓名02","第一列(客户ID)":"客户ID02","第七列(手机号)":"13500000001","第五列(年龄)":"20","第三列(性别)":"男","第六列(生日)":"2014/7/2"},{"第四列(职业)":"职业03","第二列(姓名)":"姓名03","第一列(客户ID)":"客户ID03","第七列(手机号)":"13500000002","第五列(年龄)":"20","第三列(性别)":"男","第六列(生日)":"2014/7/3"},{"第四列(职业)":"职业04","第二列(姓名)":"姓名04","第一列(客户ID)":"客户ID04","第七列(手机号)":"13500000003","第五列(年龄)":"20","第三列(性别)":"男","第六列(生日)":"2014/7/4"},{"第四列(职业)":"职业05","第二列(姓名)":"姓名05","第一列(客户ID)":"客户ID05","第七列(手机号)":"13500000004","第五列(年龄)":"20","第三列(性别)":"男","第六列(生日)":"2014/7/5"},{"第四列(职业)":"职业06","第二列(姓名)":"姓名06","第一列(客户ID)":"客户ID06","第七列(手机号)":"13500000005","第五列(年龄)":"20","第三列(性别)":"女","第六列(生日)":"2014/7/6"},{"第四列(职业)":"职业07","第二列(姓名)":"姓名07","第一列(客户ID)":"客户ID07","第七列(手机号)":"13500000006","第五列(年龄)":"20","第三列(性别)":"女","第六列(生日)":"2014/7/7"},{"第四列(职业)":"职业08","第二列(姓名)":"姓名08","第一列(客户ID)":"客户ID08","第七列(手机号)":"13500000007","第五列(年龄)":"20","第三列(性别)":"女","第六列(生日)":"2014/7/8"},{"第四列(职业)":"职业09","第二列(姓名)":"姓名09","第一列(客户ID)":"客户ID09","第七列(手机号)":"13500000008","第五列(年龄)":"20","第三列(性别)":"女","第六列(生日)":"2014/7/9"},{"第四列(职业)":"职业10","第二列(姓名)":"姓名10","第一列(客户ID)":"客户ID10","第七列(手机号)":"13500000009","第五列(年龄)":"20","第三列(性别)":"女","第六列(生日)":"2014/7/10"}]},"columns":[{"id":1,"name":"客户ID","tips":"请保证客户ID不重复，如果有重复系统只保留第一条记录"},{"id":2,"name":"姓名","tips":null},{"id":3,"name":"性别","tips":"要求是\"男\"或\"女\""},{"id":4,"name":"职业","tips":null},{"id":5,"name":"年龄","tips":"要求是1-200的两位整数"},{"id":6,"name":"生日","tips":"要求格式：YYYY-MM-DD，如1988-08-21/1988-8-21"},{"id":7,"name":"手机号","tips":null},{"id":8,"name":"邮箱","tips":null}],"batchColumns":null});
        res.send({
            'state': 0,
            'id': 1,
            'platform': [{
                "id": 1,
                "name": "淘宝A"
            }, {
                "id": 2,
                "name": "淘宝B"
            }, {
                "id": 3,
                "name": "淘宝C"
            }],
            'columns': []
        });
    },
    "getImporData1": function(req, res) {
        res.send({"state":0,"id":100125,"platform":[{"id":"淘宝客户","name":"淘宝客户"}]});
    },
    "getPreview": function(req, res) {
        res.send({
            header: ['col0', 'col1', 'col2', 'col3'],
            page: 1,
            total: 3,
            data: [{
                'col0': 'fff',
                'col1': 'ssss',
                'col2': 'ddddd',
                'col3': 'jjjjj'
            }, {
                'col0': 'fff',
                'col1': 'ssss',
                'col2': 'ddddd',
                'col3': 'jjjjj'
            }]
        });
    },
    "getRFMTree": function(req, res) {
        res.send([{
            "id": 1,
            "name": "店铺A",
            "categoryCode": "",
            "shopId": "1231",
            "pId": null,
            "isPreset": true
        }, {
            "id": 2,
            "name": "时间不限",
            "categoryCode": "",
            "shopId": "1231",
            "pId": 1,
            "isPreset": true
        }, {
            "id": 3,
            "name": "最近60天",
            "categoryCode": "",
            "shopId": "1231",
            "pId": 1,
            "isPreset": true
        }]);
    },
    "getRFMResults": function(req, res) {
        res.send({
            "data": [{
                "rfmId": 2,
                "rfmName": "购买次数",
                "rfmPeriod": 0,
                "tableName": "plt_taobao_order_rfm",
                "columnName": "number_purchased",
                "shopId": "12334",
                "creator": "系统预置",
                "created": "1399628745000",
                "status": true,
                "type": false,
                "remark": ""
            }],
            "size": 0,
            "number": 0,
            "sort": null,
            "page": 1,
            "totalElements": 19,
            "total": 1,
            "numberOfElements": 19,
            "firstPage": true,
            "lastPage": false
        })
    },
    "getCustomerRFMResults": function(req, res) {
        res.send({
            "total": 1,
            "page": 1,
            "pageSize": 10,
            "data": [{
                "pk": {
                    "buyerNick": "roxette",
                    "shopId": 12334,
                    "rfmPeriod": 12
                },
                "updatedAt": "2014-02-28T16:34:43.000+0800",
                "numberPurchased": 11,
                "totalTradeCount": 11,
                "totalAmount": 11.0,
                "totalNumberOfItems": 11,
                "numberRefunded": 11.0,
                "totalRefunded": 11.0,
                "dateMostRecent": "2014-02-28T16:34:43.000+0800",
                "amountMostRecent": 11.0,
                "intervalMostRecent": 11,
                "dateLeastRecent": "2014-02-28T16:34:43.000+0800",
                "amountLeastRecent": 11.0,
                "intervalLeastRecent": 12,
                "averageAmount": 23.0,
                "averageNumberOfItems": 21.0,
                "averageInterval": 334.0,
                "averageDeliveryInterval": 221.0,
                "maxTradeAmount": 112.0,
                "totalTradeDiscountFee": 2221.0,
                "totalItemDiscountFee": 122.0
            }]
        })
    },
    "addCustomproperty": function(req, res) {
        res.send({})
    },
    "updateCustomproperty": function(req, res) {
        res.send({})
    },
    "deleteCustomproperty": function(req, res) {
        res.send({});
    },
    "deleteSelectValues": function(req, res) {
        res.send([true])
    },
    "editorCustomproperty": function(req, res) {
        res.send({
            "name": "测用户自定属性",
            "type": 2,
            "status": false,
            "catalogId": 1,
            "charSels": [{
                "id": 30,
                "charValue": "val3"
            }, {
                "id": 32,
                "charValue": "val4"
            }],
            "numSels": [{
                "id": 30,
                "numValue": "val9"
            }, {
                "id": 30,
                "numValue": "val3"
            }],
            "remark": "备注"
        });
    },
    "changeStatus": function(req, res) {
        res.send();
    },
    "custompropertyTitle": function(req, res) {
        res.send([{
            "display": "ID2",
            "name": "id",
            "dataindex": "id"
        }, {
            "display": "店铺2",
            "name": "shopName",
            "dataindex": "shopName"
        }, {
            "display": "客户ID2",
            "name": "buyerNick",
            "dataindex": "buyerNick"
        }, {
            "display": "职业2",
            "name": "attrValue1",
            "dataindex": "attrValue1"
        }, {
            "display": "户籍所在地2",
            "name": "attrValue2",
            "dataindex": "attrValue2"
        }, {
            "display": "身高(cm)2",
            "name": "attrValue3",
            "dataindex": "attrValue3"
        }, {
            "display": "婚姻状况2",
            "name": "attrValue4",
            "dataindex": "attrValue4"
        }, {
            "display": "工龄2",
            "name": "attrValue5",
            "dataindex": "attrValue5"
        }, {
            "display": "学历2",
            "name": "attrValue6",
            "dataindex": "attrValue6"
        }]);
    },
    "custompropertyProperties": function(req, res) {
        res.send({
            "total": 3,
            "page": 1,
            "pageSize": 10,
            "data": [{
                "subject_id": "淘宝客户",
                "uni_id": "%mid",
                "pro": "12.0"
            }, {
                "subject_id": "淘宝客户",
                "uni_id": "tb857226_2012",
                "pro": "12.0"
            }, {
                "subject_id": "淘宝客户",
                "uni_id": "zeng_fen",
                "pro": "12.0"
            }]
        })
    },
    "querytypes": function(req, res) {
        res.send([{
            "value": 0,
            "viewname": "字符选择"
        }, {
            "value": 2,
            "viewname": "字符输入"
        }, {
            "value": 1,
            "viewname": "其他"
        }, {
            "value": 3,
            "viewname": "其他"
        }])
    },
    "getRedList": function(req, res) {
        res.send({
            "total": 100,
            "page": 1,
            "pageSize": 10,
            "data": [{
                    "checklistId": 1000001,
                    "checklistType": "WHITE",
                    "subjectName": "淘宝1",
                    "customerno": "大狗子1",
                    "groupName": "邮件订阅组1",
                    "entryMode": "单个添加1",
                    "lastUpdate": "2014-02-12T15:11:42.000+0800",
                    "lastOperator": "admin1",
                    "remark": "客户要求添加1"
                }, {
                    "checklistId": 1000002,
                    "checklistType": "WHITE",
                    "subjectName": "淘宝2",
                    "customerno": "大狗子2",
                    "groupName": "邮件订阅组2",
                    "entryMode": "单个添加2",
                    "lastUpdate": "2014-02-12T15:11:42.000+0800",
                    "lastOperator": "admin2",
                    "remark": "客户要求添加2"
                }, {
                    "checklistId": 1000003,
                    "checklistType": "WHITE",
                    "subjectName": "淘宝3",
                    "customerno": "大狗子3",
                    "groupName": "邮件订阅组3",
                    "entryMode": "单个添加3",
                    "lastUpdate": "2014-02-12T15:11:42.000+0800",
                    "lastOperator": "admin3",
                    "remark": "客户要求添加3"
                }

            ]
        })
    },
    "getRedListById": function(req, res) {
        res.send({
            "redListId": 12345,
            "subjectId": "taobao",
            "customerno": "大狗子",
            "groupId": 123456,
            "remark": "客户要求添加"
        })
    },
    "propertyList": function(req, res) {
        res.send({
            "total": 5,
            "page": 1,
            "pageSize": 20,
            "data": [{
                "propertyId": 1,
                "name": "数字选择fds萨范德萨",
                "type": 2,
                "charSels": [],
                "numSels": [{
                    "id": 3,
                    "propertyId": 1,
                    "numValue": 333455
                }, {
                    "id": 4,
                    "propertyId": 1,
                    "numValue": 8789
                }],
                "creator": "111111",
                "created": "2014-01-02T11:29:13.000+0800",
                "status": false,
                "resultTable": "tmp_table_2",
                "remark": "的认同感1234567890的认同1234567890的认同感1234567890的认同1234567890的认同感1234567891的认同1234567890的认同感1234567890的认同1234567890的认同感1234567890的认同1234567892的认同感1234567890的认同1234567890的认同感1234567890的认同1234567890的认同感1234567"
            }, {
                "propertyId": 2,
                "name": "字符选择1111111",
                "type": 0,
                "charSels": [{
                    "id": 1,
                    "propertyId": 2,
                    "charValue": "值121221212"
                }, {
                    "id": 2,
                    "propertyId": 2,
                    "charValue": "值2发的范德萨范德萨发"
                }],
                "numSels": [],
                "creator": "hsh",
                "created": "2014-01-02T11:29:13.000+0800",
                "status": true,
                "resultTable": "tmp_table_0",
                "remark": "测试用例-字符选择"
            }, {
                "propertyId": 3,
                "name": "字符输入范德萨范德萨范德萨",
                "type": 1,
                "charSels": [],
                "numSels": [],
                "creator": "护手霜",
                "created": "2014-01-02T11:29:13.000+0800",
                "status": true,
                "resultTable": "tmp_table_1",
                "remark": "测试用例-字符输入"
            }, {
                "propertyId": 4,
                "name": "数字输入",
                "type": 3,
                "charSels": [],
                "numSels": [],
                "creator": "何少辉",
                "created": "2014-01-02T11:29:13.000+0800",
                "status": true,
                "resultTable": "tmp_table_3",
                "remark": "测试用例-数字输入"
            }, {
                "propertyId": 5,
                "name": "时间",
                "type": 4,
                "charSels": [],
                "numSels": [],
                "creator": "何少辉",
                "created": "2014-01-02T11:29:13.000+0800",
                "status": true,
                "resultTable": "tmp_table_4",
                "remark": "测试用例-时间查询"
            }]
        })
    },
    "cswLabelList": function(req, res) { // 客服工作台数据标签list
        res.send({
            "total": 3,
            "page": 1,
            "pageSize": 10,
            "data": [{
                "id": 1000001,
                "shopName": "小也香水",
                "buyerNick": "tomwalk",
                "label": "三月之内二次购买客户"
            }, {
                "id": 1000002,
                "shopName": "小也香水",
                "buyerNick": "samung8888",
                "label": "三月之内二次购买客户"
            }, {
                "id": 1000003,
                "shopName": "小也香水",
                "buyerNick": "\n <b></b>&",
                "label": "三月之内二次购买客户"
            }]
        })
    },
    "cswAttributeHeads": function(req, res) { // 客服工作台数据属性列头List
        var data;
        if (req.query.shopId == 100571091) {
            data = {
                "data": [{
                    "display": "ID2",
                    "name": "id",
                    "dataindex": "id"
                }, {
                    "display": "店铺2",
                    "name": "shopName",
                    "dataindex": "shopName"
                }, {
                    "display": "客户ID2",
                    "name": "buyerNick",
                    "dataindex": "buyerNick"
                }, {
                    "display": "职业2",
                    "name": "attrValue1",
                    "dataindex": "attrValue1"
                }, {
                    "display": "户籍所在地2",
                    "name": "attrValue2",
                    "dataindex": "attrValue2"
                }, {
                    "display": "身高(cm)2",
                    "name": "attrValue3",
                    "dataindex": "attrValue3"
                }, {
                    "display": "婚姻状况2",
                    "name": "attrValue4",
                    "dataindex": "attrValue4"
                }, {
                    "display": "工龄2",
                    "name": "attrValue5",
                    "dataindex": "attrValue5"
                }, {
                    "display": "学历2",
                    "name": "attrValue6",
                    "dataindex": "attrValue6"
                }]
            }
        } else {
            data = {
                "data": [{
                    "display": "ID",
                    "name": "id",
                    "dataindex": "id"
                }, {
                    "display": "店铺",
                    "name": "shopName",
                    "dataindex": "shopName"
                }, {
                    "display": "客户ID",
                    "name": "buyerNick",
                    "dataindex": "buyerNick"
                }, {
                    "display": "职业",
                    "name": "attrValue1",
                    "dataindex": "attrValue1"
                }, {
                    "display": "户籍所在地",
                    "name": "attrValue2",
                    "dataindex": "attrValue2"
                }, {
                    "display": "身高(cm)",
                    "name": "attrValue3",
                    "dataindex": "attrValue3"
                }, {
                    "display": "婚姻状况",
                    "name": "attrValue4",
                    "dataindex": "attrValue4"
                }, {
                    "display": "工龄",
                    "name": "attrValue5",
                    "dataindex": "attrValue5"
                }, {
                    "display": "学历",
                    "name": "attrValue6",
                    "dataindex": "attrValue6"
                }]
            }
        }
        res.send(data);
    },
    "cswAttributeValues": function(req, res) { // 客服工作台数据属性list
        res.send({
            "total": 3,
            "page": 1,
            "pageSize": 10,
            "data": [{
                "id": 1000001,
                "shopName": "小也香水",
                "buyerNick": "tomwalk",
                "attrValue1": "<b></b>",
                "attrValue2": "湖北",
                "attrValue3": "165cm",
                "attrValue4": "未婚",
                "attrValue5": "5年",
                "attrValue6": "大专"
            }, {
                "id": 1000002,
                "shopName": "小也香水",
                "buyerNick": "samung8888",
                "attrValue1": "室内设计",
                "attrValue2": "上海",
                "attrValue3": "172cm",
                "attrValue4": "已婚",
                "attrValue5": "10年",
                "attrValue6": "本科"
            }, {
                "id": 1000003,
                "shopName": "小也香水",
                "buyerNick": "大狗子1989",
                "attrValue1": "工人",
                "attrValue2": "浙江",
                "attrValue3": "163cm",
                "attrValue4": "离异",
                "attrValue5": "8年",
                "attrValue6": "高中"
            }]
        })
    },
    //Anmi 2014 -3-15-----------------------------------------------------------------------
    //客户名单分组--新增分组
    "postGroup": function(req, res) {
        res.send({})
    },
    //客户名单分组--分组获取
    "getGroup": function(req, res) {
            res.send([{
                "groupId": 1001,
                "groupType": "WHITE",
                "groupName": "预置的红名单分组",
                "reserved": true
            }, {
                "groupId": 1002,
                "groupType": "BLACK",
                "groupName": "预置的黑名单分组",
                "reserved": false
            }, {
                "groupId": 1003,
                "groupType": "WHITE",
                "groupName": "AAAAAAAAAA",
                "reserved": true
            }, {
                "groupId": 1004,
                "groupType": "BLACK",
                "groupName": "BBBBBB",
                "reserved": false
            }, {
                "groupId": 1005,
                "groupType": "BLACK",
                "groupName": "CCCCCC",
                "reserved": false
            }, {
                "groupId": 1006,
                "groupType": "WHITE",
                "groupName": "sssssssssssssssssssss",
                "reserved": true
            }, {
                "groupId": 1007,
                "groupType": "BLACK",
                "groupName": "DDDDDDDDD",
                "reserved": false
            }, {
                "groupId": 1008,
                "groupType": "EMAIL",
                "groupName": "DDDDDDAAA",
                "reserved": false
            }, {
                "groupId": 1009,
                "groupType": "EMAIL",
                "groupName": "邮箱",
                "reserved": true
            }, {
                "groupId": 1010,
                "groupType": "MOBILE",
                "groupName": "UUUUUUMOBILE",
                "reserved": false
            }, {
                "groupId": 1012,
                "groupType": "MOBILE",
                "groupName": "手机MOBILE",
                "reserved": false
            }, {
                "groupId": 1013,
                "groupType": "MOBILE",
                "groupName": "预置的手机分组",
                "reserved": true
            }, {
                "groupId": 1015,
                "groupType": "BLACK",
                "groupName": "预置的黑名单分组",
                "reserved": false
            }])
    },
    //客户名单分组--删除名单分组
    "deleteGroup": function(req, res) {
        res.send({});
    },
    //客户名单（按类型区分 红名单 和 黑名单 手机，EMAIL）
    "getRedAndBlackList": function(req, res) {
        res.send({
            "total": 12,
            "page": 1,
            "pageSize": 10,
            "data":[{
              "checklistId": "57087518e4b006abb33009eb",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "%$%",
              "groupName": "22222",
              "remark": null,
              "entryMode": "单个添加",
              "lastUpdate": "2016-04-09T11:20:56.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "570757a5e4b03b66ec014ba4",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "21",
              "groupName": "11",
              "remark": null,
              "entryMode": "单个添加",
              "lastUpdate": "2016-04-08T15:03:01.000+0800",
              "lastOperator": "admin"
            }, {
              "checklistId": "57071031e4b03b66ec00bc64",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul10",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "57071031e4b03b66ec00bc65",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul11",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "57071031e4b03b66ec00bc66",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul30",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "57071031e4b03b66ec00bc67",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul14",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "57071031e4b03b66ec00bc68",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul15",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "57071031e4b03b66ec00bc69",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul12",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "57071031e4b03b66ec00bc6a",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul13",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }, {
              "checklistId": "57071031e4b03b66ec00bc6b",
              "checklistType": "BLACK",
              "subjectName": "淘宝客户",
              "customerno": "lostsoul18",
              "groupName": "llllllllllllllllllll",
              "remark": "123123123",
              "entryMode": "批量导入",
              "lastUpdate": "2016-04-08T11:27:51.000+0800",
              "lastOperator": "csm"
            }]
        })
    },
    //客户名单添加
    "postRedAndBlackCustom": function(req, res) {
        res.statusCode=400;
        res.send({"message":"未指定租户id或者租户id不存在"});
    },
    //客户黑名单修改
    "editRedAndBlackCustom": function(req, res) {
        res.send({});
    },
    //获取单个客户名单
    "getRedAndBlackCustomById": function(req, res) {
        res.send({
            "checklistId": 12345,
            "checklistType": "WHITE",
            "subjectId": "taobao",
            "customerno": "大狗子",
            "groupId": 123456,
            "remark": "客户要求添加"
        });
    },
    //删除单个客户名单
    "deleteRedAndBlackCustomById": function(req, res) {
        res.send({});
    },
    //客户名单批量导入
    "postBulkList": function(req, res) {
        res.send({
            "id":122,
            "batchid":25,
            "state":00,
            "operator":'String',
            "importDate":'Date',
            "message":'Objet',
            "tenant_id":'String'
        });
    },
    //获取手机黑名单批量上传进度
    "getBulkList": function(req, res) {
        res.send({
          "id": 7,
          "batchid": "57159257e4b0295401dcba89",
          "state": 100,
          "operator": "admin",
          "importDate": "2016-04-19T10:05:11.000+0800",
          "message": "{\"fail\":10001,\"failDetails\":[{\"customerno\":\"测试客户chensumei_9247\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9246\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9249\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9248\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9241\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9240\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9243\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9242\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9245\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9244\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9236\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9235\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9238\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9237\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9239\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9230\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9232\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9231\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9234\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9233\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9269\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9268\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9261\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9260\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9263\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9262\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9265\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9264\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9267\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9266\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9258\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9257\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9259\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9250\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9252\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9251\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9254\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9253\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9256\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9255\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9203\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9202\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9205\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9204\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9207\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9206\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9209\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9208\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9201\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9200\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9225\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9224\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9227\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9226\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9229\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9228\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9221\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9220\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9223\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9222\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9214\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9213\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9216\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9215\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9218\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9217\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9219\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9210\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9212\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_9211\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3095\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3096\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3093\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3094\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3091\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3092\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3090\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3099\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3097\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3098\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3062\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4393\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3063\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4394\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3060\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4391\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3061\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4392\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4390\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3068\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4399\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3069\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3066\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4397\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3067\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4398\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3064\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4395\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_3065\",\"reason\":\"手机号码不合法\"},{\"customerno\":\"测试客户chensumei_4396\",\"reason\":\"手机号码不合法\"}],\"insert\":0,\"total\":10001,\"update\":0}",
          "tenantId": "dagouzi01"
        });
    },
    //名单批量更新
    "putBulkList": function(req, res) {
        res.send({});
    },
    //名单批量删除
    "deleteBulkList": function(req, res) {
        res.send({});
    },

    //系统内平台
    "getPlat": function(req, res) {
        res.send([{
            "subjectId": "taobao",
            "subjectName": "淘宝"
        }, {
            "subjectId": "JD",
            "subjectName": "京东"
        }]);
    },
    //获取所有主题
    "getSubject": function(req, res) {
        res.send([{
            "subjectId": 1,
            "subjectName": "淘宝客户",
            "phoneAttributeKey": "normal-123",
            "phoneAttributeName": "手机号",
            "emailAttributeKey": "normal-456",
            "emailAttributeName": "邮箱地址"
        }, {
            "subjectId": 2,
            "subjectName": "淘宝客户",
            "phoneAttributeKey": "normal-8",
            "phoneAttributeName": "手机号",
            "emailAttributeKey": "normal-9",
            "emailAttributeName": "邮箱地址"
        }])
    },
    //提交黑红名单主题配置 added by 茅丹丹 2014-4-9
    "postNode": function(req, res) {
        res.send({
            "subjectId": 1,
            "subjectName": "淘宝客户",
            "phoneAttributeKey": "normal-123",
            "phoneAttributeName": "手机号",
            "emailAttributeKey": "normal-456",
            "emailAttributeName": "邮箱地址"
        })
    },
    //获取属性
    "getAttributes": function(req, res) {
        res.send([{
            "attributeKey": "normal_1",
            "attributeName": "客人标识"
        }, {
            "attributeKey": "normal_2",
            "attributeName": "客人全称"
        }])
    },
    //postBulkFile
    "postBulkFile": function(req, res) {
        res.send({
            fileId: 1221
        });
    },
    //Anmi 2014 -3-15-----------------------------------------------------------------------
    /*start 客户基本信息 Added By 茅丹丹 2014-4-17*/
    //客户基本信息查询
    "searchMembergrade": function(req, res) {
        res.send({
            "total": 2,
            "page": 1,
            "pageSize": 20,
            "data": [{
                "id": 2444,
                "shopid": "89876878",
                "platcode": "taobao",
                "customerno": "1w3",
                "username": "roxehte1",
                "sex": "f",
                "birthday": "1985-12-23",
                "age": 12,
                "mobile": "12345678901",
                "email": "dreo@163.com",
                "province": "江苏省",
                "city": "南京市",
                "region": "华中",
                "address": "南京区大好人路250号",
                "postcode": "200001"
            }, {
                "id": 2434,
                "shopid": "89876878",
                "platcode": "taobao",
                "customerno": "1ww3",
                "username": "roxehte2",
                "sex": "m",
                "birthday": "",
                "age": 12,
                "mobile": "12345678901",
                "email": "dreo@163.com",
                "province": "江苏省",
                "city": "南京市",
                "region": "华中",
                "address": "南京区大好人路250号",
                "postcode": "200001"
            }]
        })
    },
    //单个客户基本信息查询
    "getCustomerByCustomerNo": function(req, res) {
        res.send({
            "customerno": "1w3",
            "username": "roxehte4",
            "sex": "f",
            "month": null,
            "day": null,
            "age": 12,
            "mobile": "12345678901",
            "email": "dreo@163.com"
        })
    },
    //修改客户基本信息
    "updateCustomerByCustomer": function(req, res) {
        res.send({
            "customerno": "1w3",
            "username": "roxehte5",
            "sex": "f",
            "month": 12,
            "day": 23,
            "age": 12,
            "mobile": "12345678901",
            "email": "dreo@163.com"
        })
    },
    "getOrderList": function(req, res) {
        res.send(
            [{
                "tid": "20140430000001",
                "created": "2014-04-15T11:48:33.000+0800",
                "paytime": "2014-04-23T15:54:49.000+0800",
                "endtime": "2014-05-04T15:53:35.000+0800",
                "consigneename": "",
                "consigneeregion": "金水区",
                "consigneeprovince": "河南",
                "consigneecity": "郑州",
                "consigneepostcode": "100238",
                "consigneeaddress": "金水路1009号XXXXXX公司",
                "consigneemobile": "15026639723",
                "orderitems": [{
                    "oid": "20140430000001",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套2",
                    "shopname": "店铺A",
                    "num": 1,
                    "price": 50.0,
                    "totalfee": 200.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000002",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套1",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 100.0,
                    "status": "WAIT_BUYER_CONFIRM_GOODS"
                }, {
                    "oid": "20140430000003",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的帽子1",
                    "shopname": "店铺A",
                    "num": 1,
                    "price": 50.0,
                    "totalfee": 50.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000004",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套4",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000006",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套23",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 10.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000009",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套17",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000010",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套16",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000011",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套15",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000012",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套14",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000013",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套13",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000014",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套12",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000015",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套11",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000016",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套10",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000017",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套9",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 101.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000018",
                    "tid": "20140430000001",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套8",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 5.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }]
            }, {
                "tid": "20140430000002",
                "created": "2014-05-06T13:58:01.000+0800",
                "paytime": "2014-05-07T13:58:42.000+0800",
                "endtime": "2014-05-08T13:58:23.000+0800",
                "consigneename": "",
                "consigneeregion": "",
                "consigneeprovince": "",
                "consigneecity": "",
                "consigneepostcode": "",
                "consigneeaddress": "",
                "consigneemobile": "",
                "orderitems": [{
                    "oid": "20140430000019",
                    "tid": "20140430000002",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套7",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000020",
                    "tid": "20140430000002",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套6",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000021",
                    "tid": "20140430000002",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套5",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }, {
                    "oid": "20140430000022",
                    "tid": "20140430000002",
                    "picpath": "http://img04.taobaocdn.com/bao/uploaded/i4/13930033357584081/T1Iz4uXpFeXXXXXXXX_!!0-item_pic.jpg",
                    "productname": "王健的手套4",
                    "shopname": "店铺A",
                    "num": 2,
                    "price": 50.0,
                    "totalfee": 90.0,
                    "status": "TRADE_FINISHED"
                }]
            }]
        )
    },

    /*end 客户基本信息 Added By 茅丹丹 2014-4-17*/

    /*start 客户基本信息 Added By 茅丹丹 2014-6-5*/
    //客户基本信息-通用化客户信息显示字段接口
    "getCustomerCellsBySubjectId": function(req, res) {
        var shopIds=(/columns\/(.*)/g.exec(req.url))[1];
        if(shopIds=="淘宝客户"){
            res.send(
                [{
                    "id": 1,
                    "attributeName": "淘宝昵称",
                    "subjectId": 1,
                    "textAlign": "center",
                    "attributeType": "normal",
                    "attributeId": 1000,
                    "canEdit": true,
                    "isPk": true,
                    "orderId": 1,
                    "canCheckOrder": true
                },
                {
                    "id": 2,
                    "attributeName": "姓名",
                    "subjectId": 1,
                    "textAlign": "left",
                    "attributeType": "function",
                    "attributeId": 1003,
                    "canEdit": false,
                    "isPk": false,
                    "orderId": 2,
                    "canCheckOrder": false
                },
                {
                    "id": 3,
                    "attributeName": "查看",
                    "subjectId": 1,
                    "textAlign": "href",
                    "attributeType": "normal",
                    "attributeId": 1004,
                    "canEdit": false,
                    "isPk": false,
                    "orderId": 3,
                    "canCheckOrder": false
                }
            ]
            )
    }else{
        res.send(
            [{
                "id": 1,
                "attributeName": "JD淘宝昵称",
                "subjectId": 1,
                "textAlign": "center",
                "attributeType": "normal",
                "attributeId": 1000,
                "canEdit": true,
                "isPk": true,
                "orderId": 1,
                "canCheckOrder": true
            }, {
                "id": 2,
                "attributeName": "JD姓名",
                "subjectId": 1,
                "textAlign": "left",
                "attributeType": "function",
                "attributeId": 1003,
                "canEdit": false,
                "isPk": false,
                "orderId": 2,
                "canCheckOrder": false
            }]
        )
    }
    },
    //客户基本信息-通用化客户信息 查询条件接口
    "getQueryitmesBySubjectId": function(req, res) {
        var shopIds=(/queryitmes\/(.*)/g.exec(req.url))[1];
        if(shopIds=="淘宝客户"){
            res.send({
                "details": {
                    "10004": {
                        "id":10004,"name":"店铺","type":"字典选择","tip":"","configs":[{"name":"大狗子19890202","id":"100571094"},{"name":"店铺A","id":"20140411001"},{"name":"店铺B","id":"20140411002"},{"name":"tomwalk","id":"65927470"}],"head":true
                    },
                    
                    "10001": {
                        "id": 10001,
                        "name": "性别",
                        "type": "字典选择",
                        "tip": "性别是字典值",
                        "configs": [{
                            "name": "女",
                            "id": "f"
                        }, {
                            "name": "男",
                            "id": "m"
                        }]
                    },
                    "10002": {
                        "id": 10002,
                        "name": "手机号",
                        "type": "日期选择",
                        "tip": "手机号是已字符开头",
                        "configs": {
                            "StringLengthLimit": ["11"],
                            "StringType": ["以字符开头"]
                        }
                    },
                    "10003": {
                        "id": 10003,
                        "name": "Email",
                        "type": "字符输入",
                        "tip": "Email是包含关系",
                        "configs": {
                            "StringLengthLimit": ["20"],
                            "StringType": ["包含"]
                        }
                    },
                    "10000": {
                        "id": 10000,
                        "name": "年龄",
                        "type": "数字输入",
                        "tip": "年龄是介于关系",
                        "configs": {
                            "NumberType": ["介于", "大于等于", "小于等于"],
                            "NumberInputPrecision": ["0"],
                            "NumberInputType": ["Int"],
                            "NumberInputRange": ["1", "200"]
                        }
                    },
                    "10005": {
                        "id": 10005,
                        "name": "淘宝昵称",
                        "type": "字符输入",
                        "tip": "淘宝昵称是包含",
                        "configs": {
                            "StringLengthLimit": ["50"],
                            "StringType": ["包含"]
                        }
                    }
                }
            })
        }else{
            res.send({
                "details": {
                    "225748285": {
                        "id": 225748285,
                        "name": "年龄",
                        "type": "数字输入",
                        "tip": "年龄支持介于1-200整数",
                        "configs": {
                            "NumberType": [
                                "不等于",
                                "介于",
                                "大于",
                                "小于",
                                "等于",
                                "小于等于",
                                "大于等于"
                            ],
                            "NumberInputType": [
                                "Int"
                            ],
                            "NumberInputRange": [
                                "0",
                                "200"
                            ],
                            "NumberInputPrecision": [
                                "0"
                            ]
                        },
                        "head": false
                    },
                    "7000": {
                        "id": 7000,
                        "name": "买家账号",
                        "type": "字符输入",
                        "tip": "年龄是介于关系",
                        "configs": {
                            "StringLengthLimit": [
                                "50"
                            ],
                            "StringType": [
                                "等于",
                                "不等于",
                                "包含",
                                "不包含",
                                "以字符开头",
                                "以字符结尾"
                            ]
                        }
                    },
                    "7099": {
                        "id": 7099,
                        "name": "Gender",
                        "type": "字典选择",
                        "tip": "年龄是介于关系",
                        "configs": [
                            {
                                name: 'M',
                                id: 'M'
                            },
                            {
                                name: 'F',
                                id: 'F'
                            }
                        ]
                    },
                    "7051": {
                        "id": 7051,
                        "name": "商家id",
                        "type": "字符输入",
                        "tip": "",
                        "configs": {
                            "StringLengthLimit": [
                                "50"
                            ],
                            "StringType": [
                                "等于",
                                "不等于",
                                "包含",
                                "不包含",
                                "以字符开头",
                                "以字符结尾"
                            ]
                        }
                    },
                    "7002": {
                        "id": 7002,
                        "name": "姓名",
                        "type": "字符输入",
                        "tip": "性别是字典值",
                        "configs": {
                            "StringLengthLimit": [
                                "20"
                            ],
                            "StringType": [
                                "等于",
                                "不等于",
                                "包含",
                                "不包含",
                                "以字符开头",
                                "以字符结尾"
                            ]
                        }
                    },
                    "7008": {
                        "id": 7008,
                        "name": "手机",
                        "type": "字符输入",
                        "tip": "手机号是已字符开头",
                        "configs": {
                            "StringLengthLimit": [
                                "20"
                            ],
                            "StringType": [
                                "等于",
                                "不等于",
                                "包含",
                                "不包含",
                                "以字符开头",
                                "以字符结尾"
                            ]
                        }
                    },
                    "7001": {
                        "id": 7001,
                        "name": "email",
                        "type": "字符输入",
                        "tip": "Email是包含关系",
                        "configs": {
                            "StringLengthLimit": [
                                "50"
                            ],
                            "StringType": [
                                "等于",
                                "不等于",
                                "包含",
                                "不包含",
                                "以字符开头",
                                "以字符结尾"
                            ]
                        }
                    },
                    "10004": {
                        "id": 10004,
                        "name": "JD店铺",
                        "type": "字典多选",
                        "tip": "店铺是字典",
                        "configs": [{
                            "name": "JDtomwalk",
                            "id": "00002112"
                        }, {
                            "name": "JDss",
                            "id": "sads"
                        }],
                        "head":true
                    }
                }
            })
        }
    },
    //客户基本信息-通用化客户信息 平台接口
    "getMetasSubjects": function(req, res) {
        res.send({
            "display": "选择主题:",
            "subject": [{
                "id": 1,
                "name": "淘宝客户",
                "segmentationId":10
            }, {
                "id": 101,
                "name": "京东客户",
                "segmentationId":11
            }]
        })
    },
    //客户基本信息-通用化客户信息 数据展示接口  2014-6-6
    "getMetasDatas": function(req, res) {
        res.send({
          "total":6,
          "page":1,
          "pageSize":20,
          "data":[
            {"JD淘宝昵称":"下雪了打雷了","_ID": 12345, "姓名":"","生日":"","年龄":"","手机号":"18962910075","Email":"1562054300@qq.com","买家好评率":"","省份":"","城市":"","地区":"","地址":"","邮政编码":"","key":"下雪了打雷了"},
            {"淘宝昵称":"dpkt73454","姓名":"","生日":"","年龄":"","手机号":"17002186000","Email":"yangshekui@qq.com","买家好评率":"","省份":"","城市":"","地区":"","地址":"","邮政编码":""},
            {"淘宝昵称":"dpkt73457","姓名":"","生日":"","年龄":"","手机号":"","Email":"yk1@sina.com","买家好评率":"","省份":"","城市":"","地区":"","地址":"","邮政编码":""},
            {"淘宝昵称":"dpkt73453","姓名":"","生日":"","年龄":"","手机号":"15000685388","Email":"874004220@qq.com","买家好评率":"","省份":"","城市":"","地区":"","地址":"","邮政编码":""},
            {"淘宝昵称":"dpkt73458","姓名":"","生日":"","年龄":"","手机号":"","Email":"yk1@sina.com","买家好评率":"","省份":"","城市":"","地区":"","地址":"","邮政编码":""},
            {"淘宝昵称":"樱木花道","姓名":"","性别":"女","生日":"","年龄":"","手机号":"","Email":"1562054300@qq.com","买家好评率":"","省份":"","城市":"","地区":"","地址":"","邮政编码":""}
            ]});
    },
    "getCustomerInfo": function(req, res) {
        res.send({
            "result": true,
            "err_msg": "",
            "err_code": "0",
            "content": {
                "contact_id": "1",
                "firstname": "aojie",
                "lastname": "chen",
                "gender": "M",
                "civility": "NA",
                "birthdate": "1992/07/25 11:45:59",
                "city": "宿州市",
                "province": "安徽省",
                "home_country": "中国",
                "address": "砀山县",
                "email": "aojie.zero@gmall.com",
                "mobile": "15900868107",
                "wechat_id": "qwertyuiop",
                "usual_store_id": "7_888_888",
                "usual_store_number": "888",
                "usual_store_country": "CN",
                "usual_store_name": "storename",
                "in_seed_list": "Y",
                "optin": "NO",
                "in_white_zone": "Y",
                "loyalty_status": "ACTIVATED",
                "loyalty_status_update_date": "2017/01/05 10:55:00",
                "loyalty_card_number": "123456",
                "loyalty_card_type": "FIDELITY",
                "point_balance": "0",
                "voucher_amount": "100",
                "subscription_method": "MyDKT"
            }
        });
    },  
    "getActivities": function(req, res) {
        res.send({
          "total": 12,
          "page": 1,
          "rp": 10,        
          "data": [
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        },
          {
            "time": "2017/11/07 18:05:29",
            "channel": "短信",
            "status": "Success",
            "campaign_id": 1,
            "campaign_name": "测试活动",
            "node_id": 1,
            "node_name": "测试节点"
        }                                                                
        ]
    });
    }, 
    "getActSummary": function(req, res) {
        res.send({
            "result": true,
            "err_msg": "",
            "err_code": "0",
            "content": {
                "totalcount": 999,
                "smscount": 400,
                "wxcount": 199,
                "edmcount": 400,
                "totalsuccesscount": 99,
                "smssuccessmcount": 44,
                "wxsuccessmcount": 10,
                "edsuccessmcount": 45
            }
        });
    },
    "openCustmerOrder": function(req, res) {
        res.send(
            [{
                    "tid": "201402212045015",
                    "created": "2012-05-10T09:00:00.000+0800",
                    "paytime": "2012-05-10T09:00:00.000+0800",
                    "endtime": "2012-05-10T09:00:00.000+0800",
                    "payment":30.99,
                    "orderitems": [{
                        "oid": "201402212045015",
                        "tid": "201402212045015",
                        "picpath": null,
                        "productname": null,
                        "shopname": null,
                        "num": 0,
                        "price": null,
                        "totalfee": 100,
                        "status": "TRADE_FINISHED",
                        "consigneename": null,
                        "consigneeregion": null,
                        "consigneeprovince": null,
                        "consigneecity": null,
                        "consigneepostcode": null,
                        "consigneeaddress": null,
                        "consigneemobile": null
                    }]
                }

            ]
        )
    },
    "editorInfos": function(req, res) {
        res.send({
            "customerno": "1w3",
            "username": "roxehte",
            "sex": "f",
            "month": 12,
            "day": 23,
            "age": 12,
            "mobile": "12345678901",
            "email": "dreo@163.com"
        })
    },
    //客户基本信息-通用化客户信息 传递查询参数接口 2014-6-17
    "postConditions": function(req, res) {
        res.send({
            "conditionId": 23
        })
    },
    /*end 客户基本信息 Added By 茅丹丹 2014-6-5*/
    /*商品标签 start*/
    "getLabelLists": function(req, res) {
        res.send({
            "total": 5,
            "page": 1,
            "pageSize": 20,
            "data": [{
                "tagId": 1,
                "tagName": "数字选择",
                "productCount": 3,
                "tagDescribe": "描述备注",
                "createrName": "admin",
                "createrAt": "2014-01-02T11:29:13.000+0800"
            }, {
                "tagId": 2,
                "tagName": "标签二",
                "productCount": 3,
                "tagDescribe": "",
                "createrName": "admin",
                "createrAt": "2014-01-02T11:29:13.000+0800"
            }, {
                "tagId": 3,
                "tagName": "标签三",
                "productCount": 3,
                "tagDescribe": "描述备注",
                "createrName": "admin",
                "createrAt": "2014-01-02T11:29:13.000+0800"
            }, {
                "tagId": 4,
                "tagName": "标签四",
                "productCount": null,
                "tagDescribe": "描述备注",
                "createrName": "admin",
                "createrAt": "2014-01-02T11:29:13.000+0800"
            }]
        })
    },
    "addLabelLists": function(req, res) {
        res.send({});
    },
    "getProductLabelLists": function(req, res) {
        res.send(
            [{
                tagId: 1,
                tagName: "标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 2,
                tagName: "标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 3,
                tagName: "标签3",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 4,
                tagName: "标签4",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 5,
                tagName: "添加标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 6,
                tagName: "添加标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            },{
                tagId: 11,
                tagName: "标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 21,
                tagName: "标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 31,
                tagName: "标签3",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 41,
                tagName: "标签4",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 51,
                tagName: "添加标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 61,
                tagName: "添加标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            },{
                tagId: 12,
                tagName: "标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 22,
                tagName: "标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 32,
                tagName: "标签3",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 42,
                tagName: "标签4",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 52,
                tagName: "添加标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 62,
                tagName: "添加标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            },{
                tagId: 13,
                tagName: "标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 23,
                tagName: "标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 33,
                tagName: "标签3",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 43,
                tagName: "标签4",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 53,
                tagName: "添加标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 63,
                tagName: "添加标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            },{
                tagId: 14,
                tagName: "标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 24,
                tagName: "标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 34,
                tagName: "标签3",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 44,
                tagName: "标签4",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 54,
                tagName: "添加标签1",
                tagDescribe: "标签1备注",
                createName: "admin"
            }, {
                tagId: 64,
                tagName: "添加标签2",
                tagDescribe: "标签1备注",
                createName: "admin"
            }]
        )
    },
    "deleteSingleLabel": function(req, res) {
        res.send()
    },
    "putSingleLabel": function(req, res) {
        res.send();
    },
    "deleteBatchLabel": function(req, res) {
        res.send()
    },
    "putBatchLabel": function(req, res) {
        res.send();
    },
    /*商品标签 end*/
    /* 微信用户信息 */
    "getCustomerCellsBySubjectIdWeChat": function(req, res) {
      res.send(
          [{
            "id": 1,
            "attributeName": "微信头像",
            "subjectId": 1,
            "textAlign": "img",
            "attributeType": "normal",
            "attributeId": 1000,
            "isBinding": true,
            "isPk": true,
            "orderId": 1,
            "canCheckOrder": true
          },
            {
              "id": 2,
              "attributeName": "微信昵称",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": false,
              "isPk": false,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 3,
              "attributeName": "openId",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": true,
              "isPk": true,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 4,
              "attributeName": "性别",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": false,
              "isPk": false,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 5,
              "attributeName": "省份",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": false,
              "isPk": false,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 6,
              "attributeName": "城市",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": false,
              "isPk": false,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 7,
              "attributeName": "关注时间",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": false,
              "isPk": false,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 8,
              "attributeName": "绑定平台",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": true,
              "isPk": true,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 9,
              "attributeName": "平台账号",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": false,
              "isPk": false,
              "orderId": 2,
              "canCheckOrder": false
            },
            {
              "id": 10,
              "attributeName": "绑定时间",
              "subjectId": 1,
              "textAlign": "left",
              "attributeType": "function",
              "attributeId": 1003,
              "isBinding": false,
              "isPk": false,
              "orderId": 2,
              "canCheckOrder": false
            }
          ]
      )
    },
    //解绑微信
    'deleteBilding': function(req, res) {
      res.send({
        "code": "SUCCESS",
        "msg": "移除成功"
      })
    },
    //
    'bindingPlat': function(req, res) {
      res.send({
        "code": "SUCCESS",
        "msg": "移除成功"
      })
    },
    "portMatchLoadWeChat":function(req,res){
      res.send({
        "batchId":1232323,//批次号
        "records":[
          {
            "openId":"31231asdafa",//微信OpenId
            "pltCustNo":"大狗子"//电商客户编号
          },
          {
            "openId":"31231asddfd",//微信OpenId
            "pltCustNo":"大狗子"//电商客户编号
          },
          {
            "openId":"33431asdafa",//微信OpenId
            "pltCustNo":"大狗子"//电商客户编号
          }
        ]
      })
    },
    "viewSplitDataWeChat":function(req,res){
      res.send({
        "batchId":1232323,//批次号
        "records":[
          {
            "openId":"2222dfdsffd",//微信OpenId
            "pltCustNo":"二狗子"//电商客户编号
          },
          {
            "openId":"2233dfdsffd",//微信OpenId
            "pltCustNo":"二狗子"//电商客户编号
          },
          {
            "openId":"2442dfdsffd",//微信OpenId
            "pltCustNo":"二狗子"//电商客户编号
          }
        ]
      })
    },
    "startMatchWechat":function(req,res){
      res.send({
        "batchId":1232323,//批次号
        "delimiter":"0",//分隔符
        "hasColumnName":"false",//是否包含列名
        "importNumber":100,  //导入条数
        "distinctNumber":90,//去重后条数
        "matchNumber":10//成功条数
      })
    },
    "getPortDataResultWechat":function(req,res){
      res.send({
        "records":[
          {
            "openId":"2222dfdsffd",//微信OpenId
            "pltCustNo":"三狗子"//电商客户编号
          },
          {
            "openId":"2233dfdsffd",//微信OpenId
            "pltCustNo":"三狗子"//电商客户编号
          },
          {
            "openId":"2442dfdsffd",//微信OpenId
            "pltCustNo":"三狗子"//电商客户编号
          }
        ]
      })
    },
    'postMatchNodeDataWechat': function(req, res) {
      res.send({
        "code": "SUCCESS",
        "msg": "绑定成功"
      })
    },
    // 得到表格渲染数据
    "getMetasDatasWeChat": function(req, res) {
      res.send({
        "total": 2,
        "page": 1,
        "pageSize": 20,
        "data": [{
          "headImgUrl":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",//微信头像，即微信图片url
          "nickName":"大狗子",//微信昵称
          "openId":"lasdfj2342asdf",//微信OpenId
          "sex":"0",//用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
          "province":"广东",//用户所在省份
          "city":"广州",//用户所在城市
          "subscribeTime":"2015-10-06T13:46:07.000+0800",//关注时间
          "pltId":"1",//绑定平台
          "pltName":"淘宝",//平台名称
          "pltCustNo":"溜达",//平台账号
          "status":1,
          "doneDate":"2015-01-01"//绑定时间
        }, {
          "headImgUrl":"http://e.hiphotos.baidu.com/baike/w%3D268/sign=0f20f4a86d600c33f079d9ce224d5134/0dd7912397dda144c9775b0eb4b7d0a20cf4860b.jpg",//微信头像，即微信图片url
          "nickName":"大狗子",//微信昵称
          "openId":"lasdfj2342asdf",//微信OpenId
          "sex":"1",//用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
          "province":"广东",//用户所在省份
          "city":"广州",//用户所在城市
          "subscribeTime":"2015-01-01",//关注时间
          "pltId":"",//绑定平台
          "pltName":"",//平台名称
          "pltCustNo":"",//平台账号
          "status":2,
          "doneDate":""//绑定时间
        }]
      });
    },
    "getPublicNumberSubjects": function(req, res) {
      res.send({
        "data": [{
          "offAcct":"2341dsf",
          "offAcctName":"公众号1"
        }, {
          "offAcct":"435665vxcvxv",
          "offAcctName":"公众号2"
        }]
      })
    },
    "getPublicNumber": function(req, res) {
      res.send([
        {
          "id": 1,
          "img": null,
          "idInPlat":3,
          "name": "公众号1"
        },
        {
          "id": 2,
          "img": null,
          "idInPlat":1,
          "name": "公众号2"
        },
        {
          "id": 3,
          "img": null,
          "idInPlat":2,
          "name": "公众号3"
        }
      ]);
    },
    "getPlat": function(req, res) {
      res.send([
        {
          "id" : '1',
          "name" : "淘宝"
        },
        {
          "id" : '2',
          "name" : "京东"
        }
      ]);
    },
    "getQueryitmesBySubjectIdWeChat": function(req, res) {
      res.send({
        "details": {
          "10006": {
            "id":10006,"name":"公众号:","type":"字典选择","tip":"","head":true
          },
          "10001": {
            "id": 10001,
            "name": "微信昵称",
            "type": "字符输入",
            "tip": "微信昵称",
            "configs": [{
              "name": "女",
              "id": "f"
            }, {
              "name": "男",
              "id": "m"
            }],
            "configs": {
              "StringLengthLimit": ["50"],
              "StringType": ["包含"]
            }
          },
          "10002": {
            "id": 10002,
            "name": "openId",
            "type": "字符输入",
            "tip": "openId",
            "configs": [{
              "name": "女",
              "id": "f"
            }, {
              "name": "男",
              "id": "m"
            }],
            "configs": {
              "StringLengthLimit": ["50"],
              "StringType": ["包含"]
            }
          },
          "10003": {
            "id": 10003,
            "name": "性别",
            "type": "字典选择",
            "tip": "性别",
            "configs": [{
              "name": "女",
              "id": "f"
            }, {
              "name": "男",
              "id": "m"
            }]
          },
          "10004": {
            "id": 10004,
            "name": "关注时间",
            "type": "日期选择",
            "tip": "关注时间",
            "configs": {
              "StringLengthLimit": ["11"],
              "StringType": ["以字符开头"]
            }
          },
          "10005": {
            "id": 10005,
            "name": "是否绑定",
            "type": "字典选择",
            "tip": "是否绑定",
            "configs": [{
              "name": "是",
              "id": "f"
            }, {
              "name": "否",
              "id": "m"
            }]
          }

        }
      })
    },
    'wechatShop': function(req, res) {
      res.send({
        "page": 1,
        "pageSize": 1,
        "total": 30,
        "data": [
          {
            "logo":"http://www.sdfadf.com",
            "shopId":201,
            "shopName":"大狗子",
            "pltId":1,
            "pltName":"淘宝",
            "offAcct":"2341dsfsafas",
            "offAcctName":"公众号1",
            "status": 1
          },
          {
            "logo":"http://www.sdfadf.com",
            "shopId":202,
            "shopName":"大狗子2",
            "pltId":1,
            "pltName":"淘宝",
            "offAcct":"2341dsfsafas",
            "offAcctName":"公众号2",
            "status": 1
          },
          {
            "logo":"http://www.sdfadf.com",
            "shopId":203,
            "shopName":"大狗子3",
            "pltId":1,
            "pltName":"淘宝",
            "status": 2
          }
        ]
      })
    },
    'authDomain': function(req, res) {
      res.send({
        "data": "https://www.asdfadsfj.com"
      });
    },
    'wechatShopUnbind': function(req, res) {
      res.send({
        "code": "SUCCESS",
        "msg": "移除成功"
      })
    },
    'getWechatList': function(req, res) {
      res.send({
        "data": [
          {
            "offAcct":"1",
            "offAcctName":"公众号1",
            "type": 'news'
          },
          {
            "offAcct":"2",
            "offAcctName":"公众号2",
            "type": 'news'
          },
          {
            "offAcct":"3",
            "offAcctName":"公众号3",
            "type": 'olds'
          },
          {
            "offAcct":"4",
            "offAcctName":"公众号4",
            "type": 'olds'
          }
        ]
      })
    },
    'getCatalogTree': function(req, res) {
        res.send({
            "code": 1,
            "msg": "获取数据成功!",
            "list": [
              {
                "id": 0,
                "name": "全部",
                "parentId": null,
                "level": 1,
                "canUse": true,
                "canEdit": false,
                "childrenCatalogs": []
              },
              {
                "id": 1,
                "name": "one01kfldkfl;dskf;lsdkfdl;skf;sdfdlsfklds",
                "parentId": null,
                "level": 1,
                "canUse": true,
                "canEdit": true,
                "childrenCatalogs": []
              },
              {
                "id": 3,
                "name": "one03",
                "parentId": null,
                "level": 1,
                "canUse": true,
                "canEdit": true,
                "childrenCatalogs": [
                  {
                    "id": 6,
                    "name": "two301",
                    "parentId": 3,
                    "level": 2,
                    "canUse": true,
                    "canEdit": true,
                    "childrenCatalogs": []
                  },
                  {
                    "id": 8,
                    "name": "two303",
                    "parentId": 3,
                    "level": 2,
                    "canUse": true,
                    "canEdit": true,
                    "childrenCatalogs": [
                      {
                        "id": 11,
                        "name": "three3801",
                        "parentId": 8,
                        "level": 3,
                        "canUse": false,
                        "canEdit": true,
                        "childrenCatalogs": []
                      }
                    ]
                  }
                ]
              },
              {
                "id": -1,
                "name": "未分类",
                "parentId": null,
                "level": 1,
                "canUse": false,
                "canEdit": false,
                "childrenCatalogs": []
              }
            ]
          }
        )
    },
    'catalog': function(req, res) {
        res.send({
            "code":1,
            "msg":"操作成功!"
        })
    },
    'getPropertiesValueById': function(req, res) {
        res.send(["212121", "fdsfdsf", "gfdg43fs"]);
    }
}
