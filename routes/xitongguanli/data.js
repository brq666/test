/*
 * GET login listing.
 */

var fs = require('fs');

function readJsonFile(filename) {

    filename = __dirname + '/' + filename;

    var content = fs.readFileSync(filename, {
        enconding: 'utf-8'
    });
    return JSON.parse(content);
}

module.exports = {
    "getDepartment": function(req, res) {
        res.send({
    "id": 10000025,
    "name": "sdg",
    "tenantId": "qiushi",
    "createTime": "2015-04-09T16:47:05.000+0800",
    "parentId": null,
    "children": [
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000185,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "kjkjkjk",
                    "id": 10000212
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "1124",
            "id": 10000185
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-06-26T12:36:45.000+0800",
            "name": "123123",
            "id": 10000490
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-08-13T14:19:46.000+0800",
            "name": "123321",
            "id": 10003004
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "shopsVariable": true,
                                    "parentable": true,
                                    "deletable": true,
                                    "renameable": true,
                                    "parentVariable": true,
                                    "parentId": 10000032,
                                    "tenantId": "qiushi",
                                    "createTime": "2015-04-09T16:47:05.000+0800",
                                    "name": "aa",
                                    "id": 10000094
                                }
                            ],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000030,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "123",
                            "id": 10000032
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000030,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "department1426644029619",
                            "id": 10000357
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000031,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "department1426586323776",
                    "id": 10000030
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000031,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "fffsssaaass",
                    "id": 10000219
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "14234234",
            "id": 10000031
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "1e1esd4syr",
            "id": 10000415
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2016-03-03T10:25:15.000+0800",
            "name": "2354",
            "id": 10003312
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-06-19T11:34:09.000+0800",
            "name": "444",
            "id": 10000489
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10003129,
                    "tenantId": "qiushi",
                    "createTime": "2015-11-23T15:20:36.000+0800",
                    "name": "BC",
                    "id": 10003130
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-23T15:13:01.000+0800",
            "name": "AB",
            "id": 10003129
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000195,
                            "tenantId": "qiushi",
                            "createTime": "2015-07-17T16:45:05.000+0800",
                            "name": "aaaa3333333333",
                            "id": 10000569
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000194,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "aaaaa11",
                    "id": 10000195
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "aaaa",
            "id": 10000194
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-23T11:51:16.000+0800",
            "name": "ceshi12",
            "id": 10003127
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department0320001",
            "id": 10000362
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1426643863478",
            "id": 10000355
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1426643937279",
            "id": 10000356
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1427078565575",
            "id": 10000372
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1427080770993",
            "id": 10000379
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1427080910366",
            "id": 10000380
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1427081188786",
            "id": 10000381
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1428400170582",
            "id": 10000432
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1428400195447",
            "id": 10000433
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1428400258704",
            "id": 10000434
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1428400965435",
            "id": 10000435
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1428401318602",
            "id": 10000436
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1428401561314",
            "id": 10000437
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "department1428402077947",
            "id": 10000438
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-17T16:19:55.000+0800",
            "name": "department1429258794271",
            "id": 10000457
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-17T18:05:46.000+0800",
            "name": "department1429265145241",
            "id": 10000461
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-17T18:06:09.000+0800",
            "name": "department1429265168664",
            "id": 10000462
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:50:16.000+0800",
            "name": "department1448589013579",
            "id": 10003131
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:50:24.000+0800",
            "name": "department1448589021625",
            "id": 10003132
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:50:31.000+0800",
            "name": "department1448589028769",
            "id": 10003133
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:50:37.000+0800",
            "name": "department1448589035202",
            "id": 10003134
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:50:44.000+0800",
            "name": "department1448589041595",
            "id": 10003135
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:51:17.000+0800",
            "name": "department1448589074783",
            "id": 10003136
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:51:21.000+0800",
            "name": "department1448589078882",
            "id": 10003137
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:51:25.000+0800",
            "name": "department1448589082888",
            "id": 10003138
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-27T09:51:42.000+0800",
            "name": "department1448589100247",
            "id": 10003139
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-08-05T12:12:03.000+0800",
            "name": "dongpf",
            "id": 10002922
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "fssbrhhsr",
            "id": 10000425
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-11T16:15:22.000+0800",
            "name": "hshtest",
            "id": 10003123
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2016-03-22T10:23:50.000+0800",
            "name": "sdf",
            "id": 10003314
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2016-03-15T17:36:30.000+0800",
            "name": "ssdgsg",
            "id": 10003313
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000091,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "department1426586226331",
                    "id": 10000276
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000091,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "gggfgfg",
                    "id": 10000215
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000091,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "sdffeeed",
                    "id": 10000216
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000091,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "sdfsfddsf",
                    "id": 10000214
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000091,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "ssssddddfff",
                    "id": 10000217
                },
                {
                    "children": [
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000092,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "333",
                            "id": 10000277
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000092,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "dkdkdkdkgggggggggggg",
                            "id": 10000109
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000091,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test0923a",
                    "id": 10000092
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "sssss",
            "id": 10000091
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-12-24T11:14:48.000+0800",
            "name": "tesss",
            "id": 10003300
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "shopsVariable": true,
                                    "parentable": true,
                                    "deletable": true,
                                    "renameable": true,
                                    "parentVariable": true,
                                    "parentId": 10000079,
                                    "tenantId": "qiushi",
                                    "createTime": "2015-04-09T16:47:05.000+0800",
                                    "name": "test31",
                                    "id": 10000198
                                }
                            ],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000078,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "test3",
                            "id": 10000079
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "shopsVariable": true,
                                    "parentable": true,
                                    "deletable": true,
                                    "renameable": true,
                                    "parentVariable": true,
                                    "parentId": 10000081,
                                    "tenantId": "qiushi",
                                    "createTime": "2015-04-09T16:47:05.000+0800",
                                    "name": "032000101",
                                    "id": 10000363
                                }
                            ],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000078,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "test4",
                            "id": 10000081
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000077,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test2",
                    "id": 10000078
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000077,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test5",
                    "id": 10000190
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test1",
            "id": 10000077
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000162,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test1029d",
                    "id": 10000165
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test1029a",
            "id": 10000162
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test10aaa",
            "id": 10000083
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000167,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test1102c",
                    "id": 10000168
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test1102b",
            "id": 10000167
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000180,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "sfdsfdsf",
                    "id": 10000213
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test1114c",
            "id": 10000180
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test1201a",
            "id": 10000211
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000270,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "056",
                    "id": 1
                },
                {
                    "children": [
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000268,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "test1213b1",
                            "id": 10000269
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000270,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test1213a",
                    "id": 10000268
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test1219a",
            "id": 10000270
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test1223a",
            "id": 10000275
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:25:14.000+0800",
            "name": "test12337",
            "id": 10003105
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:39:13.000+0800",
            "name": "test13323",
            "id": 10003108
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "shopsVariable": true,
                                    "parentable": true,
                                    "deletable": true,
                                    "renameable": true,
                                    "parentVariable": true,
                                    "parentId": 10000086,
                                    "tenantId": "qiushi",
                                    "createTime": "2015-04-09T16:47:05.000+0800",
                                    "name": "dfafasfasdf",
                                    "id": 10000110
                                }
                            ],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000085,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "test211",
                            "id": 10000086
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000084,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test21",
                    "id": 10000085
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test20",
            "id": 10000084
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test21499",
            "id": 10000439
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:26:13.000+0800",
            "name": "test48913",
            "id": 10003106
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test52096",
            "id": 10000161
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:27:28.000+0800",
            "name": "test53679",
            "id": 10003107
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T16:03:21.000+0800",
            "name": "test574380925",
            "id": 10003114
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:57:51.000+0800",
            "name": "test66443",
            "id": 10003112
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:48:33.000+0800",
            "name": "test71782",
            "id": 10003110
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:52:21.000+0800",
            "name": "test72862",
            "id": 10003111
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T16:02:36.000+0800",
            "name": "test734672",
            "id": 10003113
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T15:46:17.000+0800",
            "name": "test95836",
            "id": 10003109
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "test98175",
            "id": 10000431
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-14T16:26:00.000+0800",
            "name": "test店铺选择",
            "id": 10003089
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-14T16:26:35.000+0800",
            "name": "test店铺选择bale",
            "id": 10003090
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-10-22T16:04:02.000+0800",
            "name": "wujietest373798433",
            "id": 10003115
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-06T14:38:54.000+0800",
            "name": "zhangbin",
            "id": 10003120
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-06T14:39:14.000+0800",
            "name": "zhangbin2",
            "id": 10003121
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-11-06T14:39:44.000+0800",
            "name": "zhangbin3",
            "id": 10003122
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "全网",
            "id": 10000203
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10003037,
                    "tenantId": "qiushi",
                    "createTime": "2015-09-22T16:49:19.000+0800",
                    "name": "和我",
                    "id": 10003048
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10003037,
                    "tenantId": "qiushi",
                    "createTime": "2015-09-22T16:55:02.000+0800",
                    "name": "热热",
                    "id": 10003049
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-08-18T17:19:11.000+0800",
            "name": "哈妹test",
            "id": 10003037
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "天猫平台",
            "id": 10000200
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "官网",
            "id": 10000201
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "微信",
            "id": 10000202
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000196,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "线下",
                    "id": 10000197
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "探路者专用",
            "id": 10000196
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000026,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "名字11",
                    "id": 10000118
                },
                {
                    "children": [
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T10:11:12.000+0800",
                            "name": "department_1450231871559",
                            "id": 10003153
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T10:18:45.000+0800",
                            "name": "department_1450232325008",
                            "id": 10003154
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T10:53:39.000+0800",
                            "name": "department_1450234419019",
                            "id": 10003159
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T10:56:17.000+0800",
                            "name": "department_1450234576581",
                            "id": 10003162
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T11:00:28.000+0800",
                            "name": "department_1450234827658",
                            "id": 10003165
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T16:26:39.000+0800",
                            "name": "department_1450254398854",
                            "id": 10003210
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T17:07:29.000+0800",
                            "name": "department_1450256848639",
                            "id": 10003213
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T17:10:11.000+0800",
                            "name": "department_1450257010738",
                            "id": 10003216
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T17:10:43.000+0800",
                            "name": "department_1450257042593",
                            "id": 10003219
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T17:12:32.000+0800",
                            "name": "department_1450257151739",
                            "id": 10003223
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T17:13:25.000+0800",
                            "name": "department_1450257204147",
                            "id": 10003226
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T17:15:37.000+0800",
                            "name": "department_1450257336320",
                            "id": 10003229
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T17:15:38.000+0800",
                            "name": "department_1450257336320_A0",
                            "id": 10003232
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T18:11:06.000+0800",
                            "name": "department_1450260665364",
                            "id": 10003233
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-16T18:11:10.000+0800",
                            "name": "department_1450260665364_A0",
                            "id": 10003236
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:44:51.000+0800",
                            "name": "department_1450316689811",
                            "id": 10003237
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:45:13.000+0800",
                            "name": "department_1450316712594",
                            "id": 10003240
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:45:20.000+0800",
                            "name": "department_1450316712594_A0",
                            "id": 10003243
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:45:57.000+0800",
                            "name": "department_1450316756230",
                            "id": 10003244
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:45:58.000+0800",
                            "name": "department_1450316756230_A0",
                            "id": 10003247
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:46:40.000+0800",
                            "name": "department_1450316799256",
                            "id": 10003248
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:46:41.000+0800",
                            "name": "department_1450316799256_A0",
                            "id": 10003251
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:49:15.000+0800",
                            "name": "department_1450316954468",
                            "id": 10003252
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:49:16.000+0800",
                            "name": "department_1450316954468_A0",
                            "id": 10003255
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:50:48.000+0800",
                            "name": "department_1450317047098",
                            "id": 10003256
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:50:53.000+0800",
                            "name": "department_1450317047098_A0",
                            "id": 10003259
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:52:42.000+0800",
                            "name": "department_1450317161929",
                            "id": 10003260
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:52:44.000+0800",
                            "name": "department_1450317161929_A0",
                            "id": 10003263
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:56:05.000+0800",
                            "name": "department_1450317364848",
                            "id": 10003264
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:56:10.000+0800",
                            "name": "department_1450317364848_A0",
                            "id": 10003267
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:58:12.000+0800",
                            "name": "department_1450317491023",
                            "id": 10003268
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:58:13.000+0800",
                            "name": "department_1450317491023_A0",
                            "id": 10003271
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:59:24.000+0800",
                            "name": "department_1450317563035",
                            "id": 10003272
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T09:59:25.000+0800",
                            "name": "department_1450317563035_A0",
                            "id": 10003275
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T10:01:36.000+0800",
                            "name": "department_1450317695307",
                            "id": 10003276
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T10:01:40.000+0800",
                            "name": "department_1450317695307_A0",
                            "id": 10003279
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T10:05:02.000+0800",
                            "name": "department_1450317901893",
                            "id": 10003280
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T10:05:04.000+0800",
                            "name": "department_1450317901893_A0",
                            "id": 10003283
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T10:05:33.000+0800",
                            "name": "department_1450317932949",
                            "id": 10003284
                        },
                        {
                            "children": [],
                            "shopsVariable": false,
                            "parentable": false,
                            "deletable": false,
                            "renameable": true,
                            "parentVariable": false,
                            "parentId": 10000119,
                            "tenantId": "qiushi",
                            "createTime": "2015-12-17T10:05:35.000+0800",
                            "name": "department_1450317932949_A0",
                            "id": 10003287
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000026,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "名字13",
                    "id": 10000119
                }
            ],
            "shopsVariable": true,
            "parentable": false,
            "deletable": false,
            "renameable": false,
            "parentVariable": false,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "旺旺账号",
            "id": 10000026
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10003304,
                            "tenantId": "qiushi",
                            "createTime": "2016-01-19T14:38:56.000+0800",
                            "name": "部门11",
                            "id": 10003306
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10003304,
                            "tenantId": "qiushi",
                            "createTime": "2016-01-19T14:39:02.000+0800",
                            "name": "部门12",
                            "id": 10003307
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10003303,
                    "tenantId": "qiushi",
                    "createTime": "2016-01-19T14:38:34.000+0800",
                    "name": "部门1",
                    "id": 10003304
                },
                {
                    "children": [
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10003305,
                            "tenantId": "qiushi",
                            "createTime": "2016-01-19T14:39:21.000+0800",
                            "name": "部门21",
                            "id": 10003308
                        },
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10003305,
                            "tenantId": "qiushi",
                            "createTime": "2016-01-19T14:39:29.000+0800",
                            "name": "部门22",
                            "id": 10003309
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10003303,
                    "tenantId": "qiushi",
                    "createTime": "2016-01-19T14:38:42.000+0800",
                    "name": "部门2",
                    "id": 10003305
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2016-01-19T14:37:57.000+0800",
            "name": "根",
            "id": 10003303
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000322,
                    "tenantId": "qiushi",
                    "createTime": "2015-07-17T17:50:35.000+0800",
                    "name": "旺旺账号1",
                    "id": 10000570
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "水水水水",
            "id": 10000322
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-08-10T10:04:30.000+0800",
            "name": "测试店铺绑定",
            "id": 10002961
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门0403001",
            "id": 10000422
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000248,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "测试部门11",
                    "id": 10000249
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000248,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "测试部门12",
                    "id": 10000251
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门1",
            "id": 10000248
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000252,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "测试部门21",
                    "id": 10000253
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门2",
            "id": 10000252
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000254,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "测试部门31",
                    "id": 10000258
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000254,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "测试部门32",
                    "id": 10000257
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门3",
            "id": 10000254
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000147,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "分部1",
                    "id": 10000149
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000147,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "分部2",
                    "id": 10000150
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门A",
            "id": 10000147
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000151,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "小分部31",
                            "id": 10000152
                        },
                        {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "children": [],
                                            "shopsVariable": true,
                                            "parentable": true,
                                            "deletable": true,
                                            "renameable": true,
                                            "parentVariable": true,
                                            "parentId": 10000158,
                                            "tenantId": "qiushi",
                                            "createTime": "2015-04-09T16:47:05.000+0800",
                                            "name": "asdf",
                                            "id": 10000159
                                        }
                                    ],
                                    "shopsVariable": true,
                                    "parentable": true,
                                    "deletable": true,
                                    "renameable": true,
                                    "parentVariable": true,
                                    "parentId": 10000153,
                                    "tenantId": "qiushi",
                                    "createTime": "2015-04-09T16:47:05.000+0800",
                                    "name": "department1426586384501",
                                    "id": 10000158
                                }
                            ],
                            "shopsVariable": true,
                            "parentable": true,
                            "deletable": true,
                            "renameable": true,
                            "parentVariable": true,
                            "parentId": 10000151,
                            "tenantId": "qiushi",
                            "createTime": "2015-04-09T16:47:05.000+0800",
                            "name": "小分部32",
                            "id": 10000153
                        }
                    ],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000148,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "分部3",
                    "id": 10000151
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门B",
            "id": 10000148
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000155,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "test111",
                    "id": 10000160
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门D",
            "id": 10000155
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "测试部门c",
            "id": 10000154
        },
        {
            "children": [],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "电泳",
            "id": 10000282
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000259,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "研发一部",
                    "id": 10000260
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000259,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "研发二部",
                    "id": 10000261
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "研发部",
            "id": 10000259
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000204,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "上海探路者户外用品有限公司",
                    "id": 10000206
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000204,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "北京探路者飞越户外用品销售有限公司",
                    "id": 10000205
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000204,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "大连双飞天商贸有限公司",
                    "id": 10000209
                },
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000204,
                    "tenantId": "qiushi",
                    "createTime": "2015-04-09T16:47:05.000+0800",
                    "name": "广州探路者户外用品有限公司",
                    "id": 10000207
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "线下店铺",
            "id": 10000204
        },
        {
            "children": [
                {
                    "children": [],
                    "shopsVariable": true,
                    "parentable": true,
                    "deletable": true,
                    "renameable": true,
                    "parentVariable": true,
                    "parentId": 10000243,
                    "tenantId": "qiushi",
                    "createTime": "2015-12-22T11:47:29.000+0800",
                    "name": "1112",
                    "id": 10003299
                }
            ],
            "shopsVariable": true,
            "parentable": true,
            "deletable": true,
            "renameable": true,
            "parentVariable": true,
            "parentId": 10000025,
            "tenantId": "qiushi",
            "createTime": "2015-04-09T16:47:05.000+0800",
            "name": "雅诗兰黛官网",
            "id": 10000243
        }
    ]
});
    },
    "getShops": function(req, res) {
    /*基础版只有单店铺*/
 res.send([
        {
            "name": "大狗子19890202",
            "id": 1,
            "deprecatedShopId": 1,
            "shopId": "taobao_121944829",
            "idInPlat": "100571094",
            "remark": "",
            "img": null
        }, {
     "name": "吧啦啦啦",
     "id": 2,
     "deprecatedShopId": 2,
     "shopId": "taobao_12222222",
     "idInPlat": "10066666",
     "remark": "",
     "img": null
   }]);
    },
    "addDepartment": function(req, res) {
        res.send({
            "children": [],
            "name": "bbbb",
            "id": 10000007,
            "parentId": 10000005
        });
    },
    "deleteDepartment": function(req, res) {
        //res.send({});
        res.status(400).send({
            'description': '部们test有员工，不能删除，请先解除员工与部门的关系'
        });
    },
    "updateDepartment": function(req, res) {
        res.send({});
    },
    "getPermissions": function(req, res) {
        res.send([{
            "id": 101,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "商业aaaa智能",
            "children": []
        }, {
            "id": 102,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "主动营销",
            "children": [{
                "children": [],
                "name": "客户分组",
                "id": 103,
                "remark": "",
                "parentId": 102,
                "permissionKey": ""
            }, {
                "children": [{
                    "children": [],
                    "name": "活动创建",
                    "id": 105,
                    "remark": "",
                    "parentId": 104,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "活动审批",
                    "id": 106,
                    "remark": "",
                    "parentId": 104,
                    "permissionKey": "activityExaminer"
                }, {
                    "children": [],
                    "name": "订单信息高级下载",
                    "id": 107,
                    "remark": "",
                    "parentId": 104,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "订单信息初级下载",
                    "id": 108,
                    "remark": "",
                    "parentId": 104,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "客户信息高级下载",
                    "id": 109,
                    "remark": "",
                    "parentId": 104,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "客户信息中级下载",
                    "id": 110,
                    "remark": "",
                    "parentId": 104,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "客户信息初级下载",
                    "id": 111,
                    "remark": "",
                    "parentId": 104,
                    "permissionKey": ""
                }],
                "name": "营销活动",
                "id": 104,
                "remark": "",
                "parentId": 102,
                "permissionKey": ""
            }, {
                "children": [{
                    "children": [],
                    "name": "本地模版",
                    "id": 113,
                    "remark": "",
                    "parentId": 112,
                    "permissionKey": ""
                }],
                "name": "活动模版",
                "id": 112,
                "remark": "",
                "parentId": 102,
                "permissionKey": ""
            }, {
                "children": [{
                    "children": [],
                    "name": "发送式优惠券",
                    "id": 117,
                    "remark": "",
                    "parentId": 116,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "商品优惠",
                    "id": 118,
                    "remark": "",
                    "parentId": 116,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "订单优惠",
                    "id": 119,
                    "remark": "",
                    "parentId": 116,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "包邮卡",
                    "id": 120,
                    "remark": "",
                    "parentId": 116,
                    "permissionKey": ""
                }],
                "name": "优惠管理",
                "id": 116,
                "remark": "",
                "parentId": 102,
                "permissionKey": ""
            }]
        }, {
            "id": 103,
            "parentId": 102,
            "remark": "",
            "permissionKey": "",
            "name": "客户分组",
            "children": []
        }, {
            "id": 104,
            "parentId": 102,
            "remark": "",
            "permissionKey": "",
            "name": "营销活动",
            "children": [{
                "children": [],
                "name": "活动创建",
                "id": 105,
                "remark": "",
                "parentId": 104,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "活动审批",
                "id": 106,
                "remark": "",
                "parentId": 104,
                "permissionKey": "activityExaminer"
            }, {
                "children": [],
                "name": "订单信息高级下载",
                "id": 107,
                "remark": "",
                "parentId": 104,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "订单信息初级下载",
                "id": 108,
                "remark": "",
                "parentId": 104,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "客户信息高级下载",
                "id": 109,
                "remark": "",
                "parentId": 104,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "客户信息中级下载",
                "id": 110,
                "remark": "",
                "parentId": 104,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "客户信息初级下载",
                "id": 111,
                "remark": "",
                "parentId": 104,
                "permissionKey": ""
            }]
        }, {
            "id": 105,
            "parentId": 104,
            "remark": "",
            "permissionKey": "",
            "name": "活动创建",
            "children": []
        }, {
            "id": 106,
            "parentId": 104,
            "remark": "",
            "permissionKey": "activityExaminer",
            "name": "活动审批",
            "children": []
        }, {
            "id": 107,
            "parentId": 104,
            "remark": "",
            "permissionKey": "",
            "name": "订单信息高级下载",
            "children": []
        }, {
            "id": 108,
            "parentId": 104,
            "remark": "",
            "permissionKey": "",
            "name": "订单信息初级下载",
            "children": []
        }, {
            "id": 109,
            "parentId": 104,
            "remark": "",
            "permissionKey": "",
            "name": "客户信息高级下载",
            "children": []
        }, {
            "id": 110,
            "parentId": 104,
            "remark": "",
            "permissionKey": "",
            "name": "客户信息中级下载",
            "children": []
        }, {
            "id": 111,
            "parentId": 104,
            "remark": "",
            "permissionKey": "",
            "name": "客户信息初级下载",
            "children": []
        }, {
            "id": 112,
            "parentId": 102,
            "remark": "",
            "permissionKey": "",
            "name": "活动模版",
            "children": [{
                "children": [],
                "name": "本地模版",
                "id": 113,
                "remark": "",
                "parentId": 112,
                "permissionKey": ""
            }]
        }, {
            "id": 113,
            "parentId": 112,
            "remark": "",
            "permissionKey": "",
            "name": "本地模版",
            "children": []
        }, {
            "id": 116,
            "parentId": 102,
            "remark": "",
            "permissionKey": "",
            "name": "优惠管理",
            "children": [{
                "children": [],
                "name": "发送式优惠券",
                "id": 117,
                "remark": "",
                "parentId": 116,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "商品优惠",
                "id": 118,
                "remark": "",
                "parentId": 116,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "订单优惠",
                "id": 119,
                "remark": "",
                "parentId": 116,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "包邮卡",
                "id": 120,
                "remark": "",
                "parentId": 116,
                "permissionKey": ""
            }]
        }, {
            "id": 117,
            "parentId": 116,
            "remark": "",
            "permissionKey": "",
            "name": "发送式优惠券",
            "children": []
        }, {
            "id": 118,
            "parentId": 116,
            "remark": "",
            "permissionKey": "",
            "name": "商品优惠",
            "children": []
        }, {
            "id": 119,
            "parentId": 116,
            "remark": "",
            "permissionKey": "",
            "name": "订单优惠",
            "children": []
        }, {
            "id": 120,
            "parentId": 116,
            "remark": "",
            "permissionKey": "",
            "name": "包邮卡",
            "children": []
        }, {
            "id": 121,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "订单中心",
            "children": []
        }, {
            "id": 122,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "客服中心",
            "children": []
        }, {
            "id": 123,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "个性化包裹",
            "children": [{
                "children": [],
                "name": "个性化包裹",
                "id": 124,
                "remark": "",
                "parentId": 123,
                "permissionKey": ""
            }]
        }, {
            "id": 124,
            "parentId": 123,
            "remark": "",
            "permissionKey": "",
            "name": "个性化包裹",
            "children": []
        }, {
            "id": 125,
            "parentId": 123,
            "remark": "",
            "permissionKey": "",
            "name": "个性化分流",
            "children": []
        }, {
            "id": 126,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "呼叫系统",
            "children": []
        }, {
            "id": 127,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "忠诚度管理",
            "children": [{
                "children": [],
                "name": "会员管理",
                "id": 128,
                "remark": "",
                "parentId": 127,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "积分管理",
                "id": 129,
                "remark": "",
                "parentId": 127,
                "permissionKey": ""
            }]
        }, {
            "id": 128,
            "parentId": 127,
            "remark": "",
            "permissionKey": "",
            "name": "会员管理",
            "children": []
        }, {
            "id": 129,
            "parentId": 127,
            "remark": "",
            "permissionKey": "",
            "name": "积分管理",
            "children": []
        }, {
            "id": 130,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "微营销中心",
            "children": []
        }, {
            "id": 131,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "数据管理",
            "children": [{
                "children": [],
                "name": "客户基本信息",
                "id": 132,
                "remark": "",
                "parentId": 131,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "RFM指标",
                "id": 133,
                "remark": "",
                "parentId": 131,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "客户自定义属性",
                "id": 134,
                "remark": "",
                "parentId": 131,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "千牛数据",
                "id": 135,
                "remark": "",
                "parentId": 131,
                "permissionKey": ""
            }, {
                "children": [{
                    "children": [],
                    "name": "客户黑/红名单",
                    "id": 139,
                    "remark": "",
                    "parentId": 138,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "手机黑/红名单",
                    "id": 140,
                    "remark": "",
                    "parentId": 138,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "邮箱黑/红名单",
                    "id": 141,
                    "remark": "",
                    "parentId": 138,
                    "permissionKey": ""
                }],
                "name": "营销黑/红名单",
                "id": 138,
                "remark": "",
                "parentId": 131,
                "permissionKey": ""
            }, {
                "children": [{
                    "children": [],
                    "name": "历史订单导入",
                    "id": 152,
                    "remark": "",
                    "parentId": 151,
                    "permissionKey": ""
                }],
                "name": "订单数据",
                "id": 151,
                "remark": "",
                "parentId": 131,
                "permissionKey": ""
            }]
        }, {
            "id": 132,
            "parentId": 131,
            "remark": "",
            "permissionKey": "",
            "name": "客户基本信息",
            "children": []
        }, {
            "id": 133,
            "parentId": 131,
            "remark": "",
            "permissionKey": "",
            "name": "RFM指标",
            "children": []
        }, {
            "id": 134,
            "parentId": 131,
            "remark": "",
            "permissionKey": "",
            "name": "客户自定义属性",
            "children": []
        }, {
            "id": 135,
            "parentId": 131,
            "remark": "",
            "permissionKey": "",
            "name": "千牛数据",
            "children": []
        }, {
            "id": 138,
            "parentId": 131,
            "remark": "",
            "permissionKey": "",
            "name": "营销黑/红名单",
            "children": [{
                "children": [],
                "name": "客户黑/红名单",
                "id": 139,
                "remark": "",
                "parentId": 138,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "手机黑/红名单",
                "id": 140,
                "remark": "",
                "parentId": 138,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "邮箱黑/红名单",
                "id": 141,
                "remark": "",
                "parentId": 138,
                "permissionKey": ""
            }]
        }, {
            "id": 139,
            "parentId": 138,
            "remark": "",
            "permissionKey": "",
            "name": "客户黑/红名单",
            "children": []
        }, {
            "id": 140,
            "parentId": 138,
            "remark": "",
            "permissionKey": "",
            "name": "手机黑/红名单",
            "children": []
        }, {
            "id": 141,
            "parentId": 138,
            "remark": "",
            "permissionKey": "",
            "name": "邮箱黑/红名单",
            "children": []
        }, {
            "id": 142,
            "parentId": null,
            "remark": "",
            "permissionKey": "",
            "name": "系统管理",
            "children": [{
                "children": [],
                "name": "权限管理",
                "id": 147,
                "remark": "",
                "parentId": 142,
                "permissionKey": ""
            }, {
                "children": [{
                    "children": [],
                    "name": "系统帐号",
                    "id": 144,
                    "remark": "",
                    "parentId": 143,
                    "permissionKey": ""
                }, {
                    "children": [],
                    "name": "旺旺子帐号",
                    "id": 145,
                    "remark": "",
                    "parentId": 143,
                    "permissionKey": ""
                }],
                "name": "帐号管理",
                "id": 143,
                "remark": "",
                "parentId": 142,
                "permissionKey": ""
            }]
        }, {
            "id": 143,
            "parentId": 142,
            "remark": "",
            "permissionKey": "",
            "name": "帐号管理",
            "children": [{
                "children": [],
                "name": "系统帐号",
                "id": 144,
                "remark": "",
                "parentId": 143,
                "permissionKey": ""
            }, {
                "children": [],
                "name": "旺旺子帐号",
                "id": 145,
                "remark": "",
                "parentId": 143,
                "permissionKey": ""
            }]
        }, {
            "id": 144,
            "parentId": 143,
            "remark": "",
            "permissionKey": "",
            "name": "系统帐号",
            "children": []
        }, {
            "id": 145,
            "parentId": 143,
            "remark": "",
            "permissionKey": "",
            "name": "旺旺子帐号",
            "children": []
        }, {
            "id": 147,
            "parentId": 142,
            "remark": "",
            "permissionKey": "",
            "name": "权限管理",
            "children": []
        }, {
            "id": 151,
            "parentId": 131,
            "remark": "",
            "permissionKey": "",
            "name": "订单数据",
            "children": [{
                "children": [],
                "name": "历史订单导入",
                "id": 152,
                "remark": "",
                "parentId": 151,
                "permissionKey": ""
            }]
        }, {
            "id": 152,
            "parentId": 151,
            "remark": "",
            "permissionKey": "",
            "name": "历史订单导入",
            "children": []
        }]);
    },
    "saveDepartment": function(req, res) {
        res.send([{
            "name": "大狗子19890202",
            "id": 1,
          "shopId": "taobao_121944829",
            "remark": "",
            "idInPlat": "100571094",
            "img": null
        }, {
            "name": "测试店铺2",
            "id": 2,
          "shopId": "222",
            "remark": "",
            "idInPlat": null,
            "img": null
        }, {
            "name": "测试店铺3",
            "id": 3,
          "shopId": "3",
            "remark": "",
            "idInPlat": null,
            "img": null
        }, {
            "name": "测试店铺4",
            "id": 4,
          "shopId": "44",
            "remark": "",
            "idInPlat": null,
            "img": null
        }]);
    },

    /*
    "getPermissions": function(req, res) {
        res.send([{
            "children": [],
            "name": "管理系统",
            "id": 101,
            "parentId": null,
            "remark": "",
            "permissionKey": "test_permissiont1"
        }, {
            "children": [],
            "name": "会员忠诚度",
            "id": 106,
            "parentId": null,
            "remark": "",
            "permissionKey": "test_permissiont6"
        }, {
            "children": [],
            "name": "基础",
            "id": 10000000,
            "parentId": null,
            "remark": "可看首页,获得导航等基础权限",
            "permissionKey": ""
        }, {
            "children": [{
                "children": [],
                "name": "营销活动",
                "id": 104,
                "parentId": 102,
                "remark": "",
                "permissionKey": "test_permissiont4"
            }, {
                "children": [{
                    "children": [],
                    "name": "会员节点",
                    "id": 105,
                    "parentId": 103,
                    "remark": "",
                    "permissionKey": "test_permissiont5"
                }],
                "name": "客户分组",
                "id": 103,
                "parentId": 102,
                "remark": "",
                "permissionKey": "test_permissiont3"
            }],
            "name": "主动营销",
            "id": 102,
            "parentId": null,
            "remark": "",
            "permissionKey": "test_permissiont2"
        }]);
    },
    */
    "getRoles": function(req, res) {
        var filename = 'rolesData.json';
        var content = readJsonFile(filename);
        res.send(content);
    },
    "addRole": function(req, res) {
        res.send({
            "children": [],
            "name": "bbbb",
            "id": 10000007,
            "parentId": 10000005
        });
    },
    "deleteRole": function(req, res) {
        res.send(400, {message: 'error'});
    },
    "updateRole": function(req, res) {
        res.send({});
    },

    "saveRole": function(req, res) {
        res.send([{
            "children": [],
            "name": "管理系统",
            "id": 101,
            "remark": "",
            "parentId": null,
            "permissionKey": "test_permissiont1"
        }, {
            "children": [{
                "children": [],
                "name": "营销活动",
                "id": 104,
                "remark": "",
                "parentId": 102,
                "permissionKey": "test_permissiont4"
            }, {
                "children": [{
                    "children": [],
                    "name": "会员节点",
                    "id": 105,
                    "remark": "",
                    "parentId": 103,
                    "permissionKey": "test_permissiont5"
                }],
                "name": "客户分组",
                "id": 103,
                "remark": "",
                "parentId": 102,
                "permissionKey": "test_permissiont3"
            }],
            "name": "主动营销",
            "id": 102,
            "remark": "",
            "parentId": null,
            "permissionKey": "test_permissiont2"
        }, {
            "children": [{
                "children": [],
                "name": "会员节点",
                "id": 105,
                "remark": "",
                "parentId": 103,
                "permissionKey": "test_permissiont5"
            }],
            "name": "客户分组",
            "id": 103,
            "remark": "",
            "parentId": 102,
            "permissionKey": "test_permissiont3"
        }, {
            "children": [],
            "name": "会员节点",
            "id": 105,
            "remark": "",
            "parentId": 103,
            "permissionKey": "test_permissiont5"
        }, {
            "children": [],
            "name": "会员忠诚度",
            "id": 106,
            "remark": "",
            "parentId": null,
            "permissionKey": "test_permissiont6"
        }, {
            "children": [],
            "name": "基础",
            "id": 10000000,
            "remark": "可看首页,获得导航等基础权限",
            "parentId": null,
            "permissionKey": ""
        }])
    },
    "getSysMgrContent": function(req, res) {
        res.send({
            "name": "",
            "key": "nav",
            "id": 10,
            "children": [{
                "key": "sysMgrContent/departmentId"
            }, {
                "key": "sysMgrContent/dataPermissionType"
            }]
        })
    },
    "getSubAccountList": function(req, res) {
        var resData = [{
            "subid": 1,
            "nick": 'zhangsan: no1',
            "sellernick": "zhangsan"
        }, {
            "subid": 2,
            "nick": 'zhangsan: no2',
            "sellernick": "zhangsan",

        }];
        res.send(resData);
    },
    "getUsers": function(req, res, next) {
      if(req.query.permission && req.query.permission == 'activityExaminer') {
        var filename = 'approverList.json';
        var content = readJsonFile(filename);
        res.send(content);
      }
      else {
        res.send({
            "total": 3,
            "page": 1,
            "data": [{
                "department": {
                    "children": [{
                        "children": [],
                        "name": "默认部门",
                        "id": 2,
                        "parentId": 1
                    }, {
                        "children": [{
                            "children": [],
                            "name": "测试部门",
                            "id": 10000006,
                            "parentId": 10000004
                        }, {
                            "children": [],
                            "name": "test111",
                            "id": 10000008,
                            "parentId": 10000004
                        }],
                        "name": "kkkk",
                        "id": 10000004,
                        "parentId": 1
                    }, {
                        "children": [{
                            "children": [{
                                "children": [],
                                "name": "行政部门1",
                                "id": 10000001,
                                "parentId": 10000002
                            }, {
                                "children": [{
                                    "children": [],
                                    "name": "aaaaaaaaaaaaaaaaaaaa",
                                    "id": 10000005,
                                    "parentId": 10000003
                                }],
                                "name": "测试",
                                "id": 10000003,
                                "parentId": 10000002
                            }],
                            "name": "333",
                            "id": 10000002,
                            "parentId": 10000000
                        }],
                        "name": "行政部门",
                        "id": 10000000,
                        "parentId": 1
                    }],
                    "name": "0_taobao_100571094",
                    "id": 1,
                    "parentId": null
                },
                "roles": [{
                    "permissions": [{
                        "children": [],
                        "name": "管理系统",
                        "id": 101,
                        "parentId": null,
                        "remark": "",
                        "permissionKey": "test_permissiont1"
                    }, {
                        "children": [{
                            "children": [],
                            "name": "营销活动",
                            "id": 104,
                            "parentId": 102,
                            "remark": "",
                            "permissionKey": "test_permissiont4"
                        }, {
                            "children": [{
                                "children": [],
                                "name": "会员节点",
                                "id": 105,
                                "parentId": 103,
                                "remark": "",
                                "permissionKey": "test_permissiont5"
                            }],
                            "name": "客户分组",
                            "id": 103,
                            "parentId": 102,
                            "remark": "",
                            "permissionKey": "test_permissiont3"
                        }],
                        "name": "主动营销",
                        "id": 102,
                        "parentId": null,
                        "remark": "",
                        "permissionKey": "test_permissiont2"
                    }, {
                        "children": [{
                            "children": [],
                            "name": "会员节点",
                            "id": 105,
                            "parentId": 103,
                            "remark": "",
                            "permissionKey": "test_permissiont5"
                        }],
                        "name": "客户分组",
                        "id": 103,
                        "parentId": 102,
                        "remark": "",
                        "permissionKey": "test_permissiont3"
                    }, {
                        "children": [],
                        "name": "营销活动",
                        "id": 104,
                        "parentId": 102,
                        "remark": "",
                        "permissionKey": "test_permissiont4"
                    }, {
                        "children": [],
                        "name": "会员节点",
                        "id": 105,
                        "parentId": 103,
                        "remark": "",
                        "permissionKey": "test_permissiont5"
                    }, {
                        "children": [],
                        "name": "会员忠诚度",
                        "id": 106,
                        "parentId": null,
                        "remark": "",
                        "permissionKey": "test_permissiont6"
                    }, {
                        "children": [],
                        "name": "基础",
                        "id": 10000000,
                        "parentId": null,
                        "remark": "可看首页,获得导航等基础权限",
                        "permissionKey": ""
                    }],
                    "name": "系统管理员",
                    "readOnly": true,
                    "id": 2,
                    "remark": ""
                }, {
                    "permissions": [{
                        "children": [],
                        "name": "管理系统",
                        "id": 101,
                        "parentId": null,
                        "remark": "",
                        "permissionKey": "test_permissiont1"
                    }, {
                        "children": [],
                        "name": "基础",
                        "id": 10000000,
                        "parentId": null,
                        "remark": "可看首页,获得导航等基础权限",
                        "permissionKey": ""
                    }],
                    "name": "可登录用户(默认角色不能删除)",
                    "readOnly": true,
                    "id": 1,
                    "remark": "默认角色"
                }, {
                    "permissions": [{
                        "children": [],
                        "name": "会员忠诚度",
                        "id": 106,
                        "parentId": null,
                        "remark": "",
                        "permissionKey": "test_permissiont6"
                    }, {
                        "children": [],
                        "name": "基础",
                        "id": 10000000,
                        "parentId": null,
                        "remark": "可看首页,获得导航等基础权限",
                        "permissionKey": ""
                    }],
                    "name": "活动审批员",
                    "readOnly": false,
                    "id": 5,
                    "remark": "管理活动审批"
                }],
                dataPermissionType: {
                    "id": 2,
                    "desc": "自定义"
                },
                "realName": "管理员",
                "mobile": "",
                "email": "",
                "id": 1,
                "enabled": true,
                "createTime": 1382944925000,
                "status": 0,
                "departmentId": 1,
                "loginName": "admin",
                "userType": "BUILD_IN",
                "idInPlat": 22,
                "bound":true,
                "nameInPlat": "旺旺账号01",
                "remark": '你好呀'
            }, {
                "department": {
                    "children": [{
                        "children": [],
                        "name": "默认部门",
                        "id": 2,
                        "parentId": 1
                    }, {
                        "children": [{
                            "children": [],
                            "name": "测试部门",
                            "id": 10000006,
                            "parentId": 10000004
                        }, {
                            "children": [],
                            "name": "test111",
                            "id": 10000008,
                            "parentId": 10000004
                        }],
                        "name": "kkkk",
                        "id": 10000004,
                        "parentId": 1
                    }, {
                        "children": [{
                            "children": [{
                                "children": [],
                                "name": "行政部门1",
                                "id": 10000001,
                                "parentId": 10000002
                            }, {
                                "children": [{
                                    "children": [],
                                    "name": "aaaaaaaaaaaaaaaaaaaa",
                                    "id": 10000005,
                                    "parentId": 10000003
                                }],
                                "name": "测试",
                                "id": 10000003,
                                "parentId": 10000002
                            }],
                            "name": "333",
                            "id": 10000002,
                            "parentId": 10000000
                        }],
                        "name": "行政部门",
                        "id": 10000000,
                        "parentId": 1
                    }],
                    "name": "0_taobao_100571094",
                    "id": 1,
                    "parentId": null
                },
                "roles": [],
                dataPermissionType: {
                    "id": 2,
                    "desc": "自定义"
                },
                "realName": "泊美官方旗舰店",
                "mobile": "",
                "email": "",
                "id": 10000,
                "enabled": false,
                "createTime": 1382944925000,
                "status": 1,
                "departmentId": 1,
                "loginName": "tb_旺旺账号02",
                "userType": "TAOBAO",
                "bound":false,
                "idInPlat": 33,
                "nameInPlat": "旺旺账号02"
            }, {
                "department": {
                    "children": [{
                        "children": [],
                        "name": "默认部门",
                        "id": 2,
                        "parentId": 1
                    }, {
                        "children": [{
                            "children": [],
                            "name": "测试部门",
                            "id": 10000006,
                            "parentId": 10000004
                        }, {
                            "children": [],
                            "name": "test111",
                            "id": 10000008,
                            "parentId": 10000004
                        }],
                        "name": "kkkk",
                        "id": 10000004,
                        "parentId": 1
                    }, {
                        "children": [{
                            "children": [{
                                "children": [],
                                "name": "行政部门1",
                                "id": 10000001,
                                "parentId": 10000002
                            }, {
                                "children": [{
                                    "children": [],
                                    "name": "aaaaaaaaaaaaaaaaaaaa",
                                    "id": 10000005,
                                    "parentId": 10000003
                                }],
                                "name": "测试",
                                "id": 10000003,
                                "parentId": 10000002
                            }],
                            "name": "333",
                            "id": 10000002,
                            "parentId": 10000000
                        }],
                        "name": "行政部门",
                        "id": 10000000,
                        "parentId": 1
                    }],
                    "name": "0_taobao_100571094",
                    "id": 1,
                    "parentId": null
                },
                "roles": [],
                dataPermissionType: {
                    "id": 2,
                    "desc": "自定义"
                },
                "realName": "大狗子19890202:dgz001",
                "mobile": "",
                "email": "",
                "id": 100006,
                "enabled": false,
                "createTime": 1382944925000,
                "status": 1,
                "departmentId": 1,
                "loginName": "大狗子19890202:dgz001",
                "userType": "TAOBAO",
                "idInPlat": 44,
                "bound":false,
                "nameInPlat": "旺旺账号03"
            }]
        });
      }
    },
    "getCurUser": function(req, res) {
        res.send({
            id: 10000,
            loginName: "tomwalk",
            realName: "张三",
            email: "126@126.com",
            mobile: "13625252525",
            idInPlat: "1000",
            nameInPlat: "taobao:61345",
            department: {
                id: 9999,
                name: "部门名字"
            },
            roles: [{
                id: 2,
                name: "系统管理员"
            }, {
                id: 5,
                name: "活动审批员"
            }],
            enabled: false,
            dataPermissionType: {
                "id": 2,
                "desc": "自定义"
            }, //数据权限
            permissionedDepartments: [{
                id: 2,
                name: "默认部门"
            }, {
                id: 10000006,
                name: "测试部门"
            }],
            remark: "备注的内容"
        })
    },
    "postUser": function(req, res) {
        res.send({
            id: 12334,
            loginName: "tomwalk"
        })
    },
    "status": function(req, res) {
        res.send({
            "id": 10000005,
            "enabled": false,
            "createTime": "2013-12-18T14:01:03.000+0800",
            "status": 1,
            "userType": "BUILD_IN",
            "departmentId": 10000014,
            "loginName": "test3"
        })
    },
    "getSubject": function(req, res) {
        res.send([{
            "subjectId": 1,
            "subjectName": "subject1",
            "primaryAttributeCollectionName": "属性集1",
            "primaryAttributeName": "客户标识",
            "configAttributeCollectionNum": 2
        }, {
            "subjectId": 2,
            "subjectName": "subject2",
            "primaryAttributeCollectionName": "属性集1",
            "primaryAttributeName": "客户标识",
            "configAttributeCollectionNum": 1
        }, {
            "subjectId": 3,
            "subjectName": "subject3",
            "primaryAttributeCollectionName": "属性集1",
            "primaryAttributeName": "客户标识",
            "configAttributeCollectionNum": 1
        }]);
    },
    "getDic": function(req, res) {
        res.send([{
            "dicId": 1,
            "dicGroup": "group.basic",
            "dicKey": "dic.sex",
            "dicName": "性别",
            "isRelation": false,
            "isMoreTable": false,
            "dbTable": "tds_busi_dic_value",
            "displayNameColumn": "viewname",
            "displayValueColumn": "type_value",
            "dicParentId": null,
            "relationColumn": "type_value_id",
            "relationParentColumn": "parent_type_value_id"
        }, {
            "dicId": 2,
            "dicGroup": "group.basic",
            "dicKey": "dic.boolean",
            "dicName": "是否",
            "isRelation": false,
            "isMoreTable": false,
            "dbTable": "tds_busi_dic_value",
            "displayNameColumn": "viewname",
            "displayValueColumn": "type_value",
            "dicParentId": null,
            "relationColumn": "type_value_id",
            "relationParentColumn": "parent_type_value_id"
        }]);
    },
    "getMemberGrade": function(req, res) {
        res.send([{
            "id": 123,
            "subjectId": 3,
            "shopDicKey": 1,
            "gradeDicKey": 2
        }, {
            "id": 32,
            "subjectId": 1,
            "shopDicKey": "2",
            "gradeDicKey": "1"
        }]);
    },
    "deleteMemberGradeSetting": function(req, res) {
        res.send();
    },
    "saveMemberGradeSetting": function(req, res) {
        res.send({
            "id": 123,
            "subjectId": 3,
            "shopDicKey": "dic_shop",
            "gradeDicKey": "dic_vip"
        });
    },
    "getCustomerAttributesSettings": function(req, res) {
        res.send([1, 3]);
    },
    "saveCustomerAttributesSettings": function(req, res) {
        res.send();
    },
    "getRollMatchSettings": function(req, res) {
        res.send([{
            "id": 123,
            "name": "主题1",
            "selected": true
        }, {
            "id": 124,
            "name": "主题2",
            "selected": true
        }, {
            "id": 124,
            "name": "主题3",
            "selected": false
        }]);
    },
    "saveRollMatchSettings": function(req, res) {
        res.send([1, 2, 3]);
    },
    "getMarketingondemandSettings": function(req, res) {
        res.send([{
            "id": 123,
            "name": "主题1"
        }, {
            "id": 125,
            "name": "主题2",
            "selected": true
        }, {
            "id": 126,
            "name": "主题3"
        }]);
    },
    "saveMarketingondemandSettings": function(req, res) {
        res.send([1, 2, 3]);
    },
    "getWorkbenchSettings": function(req, res) {
        res.send([{
            "id": 123,
            "name": "主题1"
        }, {
            "id": 125,
            "name": "主题2",
            "selected": true
        }, {
            "id": 126,
            "name": "主题3"
        }]);
    },
    "saveWorkbenchSettings": function(req, res) {
        res.send([1, 2, 3]);
    },
    "getUserType": function(req, res) {
        res.send({
            "total": 200,
            "applyCount": 199
        });
    },
    "getUserMode": function(req, res) {
        res.send({
            "pageLoginEnabled": true
        });
    }
}
