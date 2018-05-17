module.exports = {
    'getList': function(req, res) {
        res.send({
            "total": 100,
            "page": 1,
            "pageSize": 20,
            "data": [{
                "店铺": "军师的店铺",
                "用户id": null,
                "性别":null
            }, {
                "店铺": "押司的店铺",
                "用户id": "2",
                "性别": "男"
            }, {
                "店铺": "二郎的店铺",
                "用户id": "3",
                "性别": "男"
            }]
        });
    },
    'getCommons': function(req, res) {
        res.send({
            "subjectName": "淘宝商品选择器",
            "listTitleViewInfoLists": [{
                "viewName": "用户id",
                "viewWidth": 100,
                "viewTextAlign": "center",
                "viewDisable": false,
                "sortValue": 0,
                "primary": true
            }, {
                "viewName": "店铺",
                "viewWidth": 700,
                "viewTextAlign": "center",
                "viewDisable": false,
                "sortValue": 2,
                "primary": false
            }, {
                "viewName": "性别",
                "viewWidth": 900,
                "viewTextAlign": "center",
                "viewDisable": false,
                "sortValue": 1,
                "primary": false
            }],
            "pagedResultVo": {},
            "commonsSelectQueryItemVOs": [{
                "id": 49,
                "viewName": "店铺",
                "viewDisable": true,
                "hasInitData": false,
                "initUrl": "/commoms/select/shops",
                "sortValue": 1,
                "posX": "0",
                "tip":'sss',
                "posY": "0",
                "operType": "dicsType",
                "configs":[
                  {'name':'男', 'id':'a'},
                  {'name':'女', 'id':'b'}
                ]
            },
            {
                "id": 50,
                "viewName": "关键字",
                "viewDisable": true,
                "hasInitData": false,
                "initUrl": "",
                "sortValue": 2,
                "posX": "0",
                "tip":'sss',
                "posY": "1",
                "operType": "stringType",
                "configs":{
                  "StringLengthLimit": [50],
                  "StringType": ["包含"]
                }
            },
            {
                "id": 50,
                "viewName": "日期",
                "viewDisable": true,
                "hasInitData": false,
                "initUrl": "",
                "sortValue": 4,
                "posX": "0",
                "tip":'sss',
                "posY": "1",
                "operType": "timeType",
                "configs":{
                  'NumberInputPrecision':['3'],
                  'NumberInputRange':['0', '999']
                }
            },
            {
                "id": 50,
                "viewName": "年龄",
                "viewDisable": true,
                "hasInitData": false,
                "initUrl": "",
                "sortValue": 3,
                "posX": "0",
                "tip":'sss',
                "posY": "1",
                "operType": "numberType",
                "configs":{
                  'NumberInputPrecision':['3'],
                  'NumberInputRange':['0', '999']
                }
            }]
        });
    }
};
