/*
 * 通用化配置数据配置
 */
module.exports = {
    // 源数据配置
    "dataSource": {
        "get": function(req, res) {
            res.send([{
                "dataSourceId": 1,
                "dataSourceName": "默认MYSQL数据源",
                "dataSourcePropertys": [{
                    "dataSourceConnectionId": 1,
                    "isEncryption": false,
                    "isRequired": true,
                    "value": "loalhost"
                }],
                "isSysDefault": true
            },
            {
                "dataSourceId": 2,
                "dataSourceName": "非默认MYSQL数据源",
                "dataSourcePropertys": [{
                    "dataSourceConnectionId": 1,
                    "isEncryption": false,
                    "isRequired": true,
                    "value": "loalhost"
                }],
                "isSysDefault": false
            }]);
        }
    },

    //字段配置
    "field":{
        "getTablesData": function(req, res) {
            res.send([{
                "metaDataSource":{
				    "dataSourceId":1	
				},
                "registerTableName": "plt_taobao_customer"
            },
            {
                "metaDataSource":{
				    "dataSourceId":2	
				},
                "registerTableName": "plt_taobao_order"
            }]);
        },
        "getFieldData": function(req, res) {
            res.send([{
                "registerColumnId": 1,
                "registerColumnName": "customerno",
                "registerColumnComent": "客人昵称",
                "registerColumnDataType": "varchar"
            },
            {
                "registerColumnId": 2,
                "registerColumnName": "full_name",
                "registerColumnComent": "客人全称",
                "registerColumnDataType": "varchar"
            }]);
        },
        "getColumnData": function(req, res) {
            res.send([{
                "columnName": "customerno",
                "columnDataType": "varchar",
                "columnComment": "用户id，CCMS系统用户ID,淘宝UID"
            },
            {
                "columnName": "full_name",
                "columnDataType": "varchar",
                "columnComment": "客户姓名"
            }]);
        }
    },

    //分组模型配置
    "segmentation": {
        "get": function(req, res) {
            res.send([{
                "segmentationMetaId": 7,
                "segmentationMetaName": "淘宝平台2",
                "segmentationKey": "淘宝平台2",
                "isEnabled": true
            },
            {
                "segmentationMetaId": 8,
                "segmentationMetaName": "淘宝平台",
                "segmentationKey": "淘宝平台",
                "isEnabled": false
            }]);
        },
        "post": function(req, res) {
            res.send({});
        },
        "delete": function(req, res) {
            res.send({});
        },
        "getModifyData": function(req, res) {
            res.send({
                "segmentationMetaId": 7,
                "segmentationMetaName": "淘宝平台2",
                "segmentationKey": "淘宝平台2",
                "isEnabled": true
            });
        }
    },

    //属性集配置
    "attribute": {
        "getList": function(req, res) {
            res.send({
                "total": 2,
                "page": 0,
                "data": [{
                    "attributeCollectionId": 1,
                    "attributeCollectionName": "属性集1",
                    "metasRegisterTable": {
                        "registerTableId": 1,
                        "registerTableName": "plt_taobao_customer"
                    },
                    "metaAttributes": [{
                        "attributeId": 1,
                        "attributeName": "customerno",
                        "isMaster": true
                    },
                    {
                        "attributeId": 2,
                        "attributeName": "full_name",
                        "isMaster": false
                    }]
                },
                {
                    "attributeCollectionId": 2,
                    "attributeCollectionName": "属性集2",
                    "metasRegisterTable": {
                        "registerTableId": 3,
                        "registerTableName": "plt_taobao_order"
                    },
                    "metaAttributes": [{
                        "attributeId": 3,
                        "attributeName": "tid",
                        "isMaster": true
                    },
                    {
                        "attributeId": 4,
                        "attributeName": "dp_id",
                        "isMaster": false
                    }]
                }],
                "pageSize": 10
            });
        }
    },

    //主题配置
    "subject": {
        "getAttributeList": function(req, res) {
            res.send([{
                "attributeCollectionId": 1,
                "attributeCollectionName": "属性集1",
                "metasRegisterTable": {
                    "registerTableId": 1,
                    "registerTableName": "plt_taobao_customer"
                },
                "metaAttributes": [{
                    "attributeId": 1,
                    "attributeName": "customerno",
                    "isMaster": true
                },
                {
                    "attributeId": 2,
                    "attributeName": "full_name",
                    "isMaster": false
                }]
            },
            {
                "attributeCollectionId": 2,
                "attributeCollectionName": "属性集2",
                "metasRegisterTable": {
                    "registerTableId": 3,
                    "registerTableName": "plt_taobao_order"
                },
                "metaAttributes": [{
                    "attributeId": 3,
                    "attributeName": "tid",
                    "isMaster": true
                },
                {
                    "attributeId": 4,
                    "attributeName": "dp_id",
                    "isMaster": false
                }]
            }

            ]);
        },
        "getAttributeList": function(req, res) {
            res.send({
                "attributeCollectionId": 3,
                "attributeCollectionName": "属性集1",
                "metaAttributes": [{
                    "attributeId": 4,
                    "attributeName": "客户全称",
                    "isMaster": false,
                    "metasRegisterColumn": {
                        "registerColumnId": 1,
                        "registerColumnName": "full_name",
                        "registerColumnComment": "客户姓名",
                        "registerColumnDataType": "varchar"
                    }
                },
                {
                    "attributeId": 3,
                    "attributeName": "客户标识",
                    "isMaster": true,
                    "metasRegisterColumn": {
                        "registerColumnId": 15,
                        "registerColumnName": "customerno",
                        "registerColumnComment": "用户id，CCMS系统用户ID,淘宝UID(number)",
                        "registerColumnDataType": "varchar"
                    }
                }]
            });
        },
        "post_attribute": function(req, res) {
            res.send({});
        },
        "getList": function(req, res) {
            res.send([{
                "subjectId": 1,
                "subjectName": "subject1",
                "primaryAttributeCollectionName": "属性集1",
                "primaryAttributeName": "客户标识",
                "configAttributeCollectionNum": 2
            },
            {
                "subjectId": 2,
                "subjectName": "subject2",
                "primaryAttributeCollectionName": "属性集1",
                "primaryAttributeName": "客户标识",
                "configAttributeCollectionNum": 1
            },
            {
                "subjectId": 3,
                "subjectName": "subject3",
                "primaryAttributeCollectionName": "属性集1",
                "primaryAttributeName": "客户标识",
                "configAttributeCollectionNum": 1
            }]);
        },
        "getAll": function(req, res) {
            res.send([{
                "subjectId": 1,
                "subjectName": "subject1",
                "primaryAttributeCollectionName": "属性集1",
                "primaryAttributeName": "客户标识",
                "configAttributeCollectionNum": 2
            },
            {
                "subjectId": 2,
                "subjectName": "subject2",
                "primaryAttributeCollectionName": "属性集1",
                "primaryAttributeName": "客户标识",
                "configAttributeCollectionNum": 1
            },
            {
                "subjectId": 3,
                "subjectName": "subject3",
                "primaryAttributeCollectionName": "属性集1",
                "primaryAttributeName": "客户标识",
                "configAttributeCollectionNum": 1
            }]);
        },
        "getRelationAttributeList": function(req, res) {
            res.send([{
                "attributeCollectionId": 1,
                "attributeCollectionName": "属性集1"
            },
            {
                "attributeCollectionId": 2,
                "attributeCollectionName": "属性集2"
            }])
        },
        "getAttribute": function(req, res) {
            res.send([{
                "attributeId": 1,
                "attributeName": "标识",
                "isMaster": true,
                "registerColumnId": 1
            },
            {
                "attributeId": 2,
                "attributeName": "性别",
                "isMaster": false,
                "registerColumnId": 3
            }]);
        },
        "post_relation": function(req, res) {
            res.send({});
        },
        "getRelationList": function(req, res) {
            res.send([{
                "subjectName": "客人主题",
                "behaviorList": [{
                    "relateSubjectName": "订单主题",
                    "relateAttributeSetName": "订单属性集",
                    "relateAttributeName": "订单客人属性"
                }]
            },
            {
                "subjectName": "订单主题",
                "behaviorList": [{
                    "relateSubjectName": "订单主题",
                    "relateAttributeSetName": "订单属性集",
                    "relateAttributeName": "订单客人属性"
                },
                {
                    "relateSubjectName": "订单主题",
                    "relateAttributeSetName": "订单属性集",
                    "relateAttributeName": "订单客人属性"
                }]
            }]);
        },
        // added by 茅丹丹 2014-04-03 备选的主题
        "getCadidates": function(req, res) {
            res.send([{
                "subjectId": 1,
                "subjectName": "淘宝客户"
            },
            {
                "subjectId": 2,
                "subjectName": "京东客户"
            },
            {
                "subjectId": 3,
                "subjectName": "当当客户"
            },
            {
                "subjectId": 4,
                "subjectName": "官网客户"
            }])
        }

    },
    //过滤器
    "filter": {
        "post": function(req, res) {
            res.send({});
        },
        "getList": function(req, res) {
            res.send({
                "total": 1,
                "page": 0,
                "pageSize": 20,
                "data": [{
                    "filterId": 5,
                    "filterName": "店铺",
                    "dicKey": "dic_shp",
                    "isAssociatedPermissions": true,
                    "associatedSubjectList": [{
                        "subjctId": 2,
                        "attributeCollectionId": 1,
                        "attributeId": 1
                    },
                    {
                        "subjctId": 1,
                        "attributeCollectionId": 1,
                        "attributeId": 1

                    }]
                }]
            });
        },
        "subjectOfFilter": function(req, res) {
            res.send([{
                "filterId": 1,
                "filterName": "店铺",
                "dicKey": "dic_shp",
                "isAssociatedPermissions": true,
                "associatedSubjectList": [{
                    "subjctId": 1,
                    "attributeCollectionId": 1,
                    "attributeId": 1
                },
                {
                    "subjctId": 2,
                    "attributeCollectionId": 1,
                    "attributeId": 1
                }]
            },
            {
                "filterId": 2,
                "filterName": "会员等级",
                "dicKey": "dic_vip",
                "isAssociatedPermissions": true,
                "associatedSubjectList": [{
                    "subjctId": 1,
                    "attributeCollectionId": 1,
                    "attributeId": 1
                },
                {
                    "subjctId": 2,
                    "attributeCollectionId": 1,
                    "attributeId": 1
                }]
            },
            {
                "filterId": 2,
                "filterName": "第三者",
                "dicKey": "dic_vip",
                "isAssociatedPermissions": true,
                "associatedSubjectList": [{
                    "subjctId": 1,
                    "attributeCollectionId": 1,
                    "attributeId": 1
                },
                {
                    "subjctId": 2,
                    "attributeCollectionId": 1,
                    "attributeId": 1
                }]
            }]);
        }
    },
    //函数配置
    "functionAttribute": {
        "getDataType": function(req, res) {
            res.send([{
                "displayName": "整数型",
                "dataType": "int"
            },
            {
                "displayName": "字符型",
                "dataType": "varchar"
            },
            {
                "displayName": "小数型",
                "dataType": "double"
            },
            {
                "displayName": "时间类型",
                "dataType": "datetime"
            }])
        }

        ,
        "post": function(req, res) {
            res.send({});
        }

        ,
        "getGrid": function(req, res) {
            res.send({
                "total": 1,
                "page": 0,
                "pageSize": 20,
                "data": [{
                    "id": 110,
                    "dataSourceId": 1,
                    "functionName": "第一次购买",
                    "functionBody": "SUM(DISTINCT #money) / count(payment)",
                    "params": [{
                        "paramName": "create_time",
                        "paramDataType": "datetime"
                    },
                    {
                        "paramName": "payment",
                        "paramDataType": "double"
                    }],
                    "returnDataType": null
                },
                {
                    "id": 111,
                    "dataSourceId": 1,
                    "functionName": "第一次购买",
                    "functionBody": "SUM(DISTINCT #money) / count(payment)",
                    "params": [{
                        "paramName": "create_time",
                        "paramDataType": "datetime"
                    },
                    {
                        "paramName": "payment",
                        "paramDataType": "double"
                    }],
                    "returnDataType": "int"
                }]
            });
        }

        ,
        "modify": function(req, res) {
            res.send({
                "id": 1,
                "dataSourceId": 1,
                "functionName": "第一次购买",
                "functionBody": "SUM(DISTINCT #money) / count(payment)",
                "params": [{
                    "paramName": "create_time",
                    "paramDataType": "datetime"
                },
                {
                    "paramName": "payment",
                    "paramDataType": "double"
                }],
                "returnDataType": "double"
            });
        }
    },

    //字典配置
    "dic": {
        "get": function(req, res) {
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
            },
            {
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
        }
    },

    /*短信元数据配置 start Added By 茅丹丹 2014-3-24*/
    "smsattribute": {
        //获取单个短信元数据配置的主题
        "getSubjectById": function(req, res) {
            res.send({
                "id": "1",
                "metaSegmentModelId": "1",
                "subjectId": "1",
                "mobileAttributeId": "1",
                "attributes": [{
                    "id": 1,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                },
                {
                    "id": 2,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                }]
            });
        }

        ,
        //删除单个短信元数据配置的主题
        "deletesmsAttributeConfigById": function(req, res) {
            res.send({
                "id": "1"
            });
        }

        ,
        //保存短信元数据配置的主题
        "postSubjectList": function(req, res) {
            res.send({});
        }

        ,
        //获取元分组模型
        "getMetaSegmentList": function(req, res) {
            res.send([{
                "modelId": 1,
                "modelName": "sss"
            },
            {
                "modelId": 2,
                "modelName": "sss"
            }]);
        }

        ,
        //获取所有主题
        "getMetaSubjectList": function(req, res) {
            res.send([{
                "subjectId": 1,
                "subjectName": "name"
            },
            {
                "subjectId": 2,
                "subjectName": "name"
            }]);
        }

        ,
        //复杂--获取所有属性
        "getMetaAttributeList": function(req, res) {
            res.send([{
                "attributeId": 1,
                "attributeName": "name"
            },
            {
                "attributeId": 2,
                "attributeName": "age"
            },
            {
                "attributeId": 3,
                "attributeName": "email"
            },
            {
                "attributeId": 4,
                "attributeName": "address"
            }]);
        }

        ,
        //单个-获取所有属性集
        "getSimpleMetaAttributeList": function(req, res) {
            res.send([{
                "attributeCollectionId": 1,
                "attributeCollectionName": "name"
            },
            {
                "attributeCollectionId": 2,
                "attributeCollectionName": "age"
            }]);
        }

        ,
        //单个-获取某属性集的所有属性
        "getSimpleMetaAttributeListById": function(req, res) {
            res.send([{
                "attributeId": 1,
                "attributeName": "name"
            },
            {
                "attributeId": 2,
                "attributeName": "age"
            },
            {
                "attributeId": 3,
                "attributeName": "email"
            },
            {
                "attributeId": 4,
                "attributeName": "address"
            }])
        }

        ,
        //获取所有短信元数据配置的主题
        "getSmSSubjectsList": function(req, res) {
            res.send([{
                "id": "1",
                "metaSegmentModelId": "1",
                "subjectId": "1",
                "mobileAttributeId": "1",
                "attributes": [{
                    "id": 1,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                },
                {
                    "id": 2,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                }]
            }])
        }
    },
    //表配置
    "tableConfig": {
        "getRegisterTable": function(req, res) {
            res.send({
                "total": 3,
                "page": 1,
                "pageSize": 20,
                "data": [{
                    "registerTableId": 5,
                    "registerTableName": "plt_taobao_customer",
                    "registerTableComment": "客户信息表",
                    "metaDataSource": {
                        "dataSourceId": 1,
                        "metaDataSourceTemplate": {
                            "id": 1,
                            "templateName": "mysql",
                            "templateUrl": "jdbc:mysql://#host:#port/#schema?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true",
                            "metaDataSourceConnectionDefinition": [{
                                "connectionDefinitionId": 3,
                                "connectionKey": "schema",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 5,
                                "connectionKey": "password",
                                "isEncryption": true,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 4,
                                "connectionKey": "username",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 2,
                                "connectionKey": "port",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 1,
                                "connectionKey": "host",
                                "isEncryption": false,
                                "isNeed": true
                            }]
                        },
                        "metaDataSourceConnection": [{
                            "id": 4,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 4,
                                "connectionKey": "username",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "ccms"
                        },
                        {
                            "id": 3,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 3,
                                "connectionKey": "schema",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "ccms6_yinwei"
                        },
                        {
                            "id": 1,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 1,
                                "connectionKey": "host",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "localhost"
                        },
                        {
                            "id": 5,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 5,
                                "connectionKey": "password",
                                "isEncryption": true,
                                "isNeed": true
                            },
                            "connectionValue": "ccms"
                        },
                        {
                            "id": 2,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 2,
                                "connectionKey": "port",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "3306"
                        }],
                        "dataSourceName": "默认数据源连接",
                        "isSysDefault": true
                    },
                    "metaRegisterColumn": [{
                        "registerColumnId": 27,
                        "registerColumnName": "buyer_credit_total_num",
                        "registerColumnComment": "买家累计订单数",
                        "registerColumnDataType": "int"
                    },
                    {
                        "registerColumnId": 24,
                        "registerColumnName": "buyer_credit_lev",
                        "registerColumnComment": "买家信用等级",
                        "registerColumnDataType": "int"
                    },
                    {
                        "registerColumnId": 25,
                        "registerColumnName": "buyer_credit_score",
                        "registerColumnComment": "买家信用评分",
                        "registerColumnDataType": "int"
                    },
                    {
                        "registerColumnId": 22,
                        "registerColumnName": "full_name",
                        "registerColumnComment": "客户姓名",
                        "registerColumnDataType": "varchar"
                    },
                    {
                        "registerColumnId": 28,
                        "registerColumnName": "zip",
                        "registerColumnComment": "邮编",
                        "registerColumnDataType": "varchar"
                    },
                    {
                        "registerColumnId": 23,
                        "registerColumnName": "sex",
                        "registerColumnComment": "性别。可选值:m(男),f(女)",
                        "registerColumnDataType": "char"
                    },
                    {
                        "registerColumnId": 26,
                        "registerColumnName": "buyer_credit_good_num",
                        "registerColumnComment": "买家好评订单数",
                        "registerColumnDataType": "int"
                    },
                    {
                        "registerColumnId": 21,
                        "registerColumnName": "customerno",
                        "registerColumnComment": "用户id，CCMS系统用户ID,淘宝UID(number)",
                        "registerColumnDataType": "varchar"
                    }],
                    "registerTableType": null
                },
                {
                    "registerTableId": 6,
                    "registerTableName": "plt_taobao_order",
                    "registerTableComment": "订单表",
                    "metaDataSource": {
                        "dataSourceId": 1,
                        "metaDataSourceTemplate": {
                            "id": 1,
                            "templateName": "mysql",
                            "templateUrl": "jdbc:mysql://#host:#port/#schema?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true",
                            "metaDataSourceConnectionDefinition": [{
                                "connectionDefinitionId": 3,
                                "connectionKey": "schema",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 5,
                                "connectionKey": "password",
                                "isEncryption": true,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 4,
                                "connectionKey": "username",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 2,
                                "connectionKey": "port",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 1,
                                "connectionKey": "host",
                                "isEncryption": false,
                                "isNeed": true
                            }]
                        },
                        "metaDataSourceConnection": [{
                            "id": 4,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 4,
                                "connectionKey": "username",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "ccms"
                        },
                        {
                            "id": 3,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 3,
                                "connectionKey": "schema",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "ccms6_yinwei"
                        },
                        {
                            "id": 1,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 1,
                                "connectionKey": "host",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "localhost"
                        },
                        {
                            "id": 5,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 5,
                                "connectionKey": "password",
                                "isEncryption": true,
                                "isNeed": true
                            },
                            "connectionValue": "ccms"
                        },
                        {
                            "id": 2,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 2,
                                "connectionKey": "port",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "3306"
                        }],
                        "dataSourceName": "默认数据源连接",
                        "isSysDefault": true
                    },
                    "metaRegisterColumn": [{
                        "registerColumnId": 31,
                        "registerColumnName": "customerno",
                        "registerColumnComment": "客户ID",
                        "registerColumnDataType": "varchar"
                    },
                    {
                        "registerColumnId": 30,
                        "registerColumnName": "dp_id",
                        "registerColumnComment": "店铺ID",
                        "registerColumnDataType": "varchar"
                    },
                    {
                        "registerColumnId": 29,
                        "registerColumnName": "tid",
                        "registerColumnComment": "订单号",
                        "registerColumnDataType": "varchar"
                    }],
                    "registerTableType": null
                },
                {
                    "registerTableId": 7,
                    "registerTableName": "plt_taobao_order_item",
                    "registerTableComment": "订单明细表（子订单/商品明细）",
                    "metaDataSource": {
                        "dataSourceId": 1,
                        "metaDataSourceTemplate": {
                            "id": 1,
                            "templateName": "mysql",
                            "templateUrl": "jdbc:mysql://#host:#port/#schema?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true",
                            "metaDataSourceConnectionDefinition": [{
                                "connectionDefinitionId": 3,
                                "connectionKey": "schema",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 5,
                                "connectionKey": "password",
                                "isEncryption": true,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 4,
                                "connectionKey": "username",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 2,
                                "connectionKey": "port",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            {
                                "connectionDefinitionId": 1,
                                "connectionKey": "host",
                                "isEncryption": false,
                                "isNeed": true
                            }]
                        },
                        "metaDataSourceConnection": [{
                            "id": 4,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 4,
                                "connectionKey": "username",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "ccms"
                        },
                        {
                            "id": 3,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 3,
                                "connectionKey": "schema",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "ccms6_yinwei"
                        },
                        {
                            "id": 1,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 1,
                                "connectionKey": "host",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "localhost"
                        },
                        {
                            "id": 5,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 5,
                                "connectionKey": "password",
                                "isEncryption": true,
                                "isNeed": true
                            },
                            "connectionValue": "ccms"
                        },
                        {
                            "id": 2,
                            "metaDataSourceConnectionDefinition": {
                                "connectionDefinitionId": 2,
                                "connectionKey": "port",
                                "isEncryption": false,
                                "isNeed": true
                            },
                            "connectionValue": "3306"
                        }],
                        "dataSourceName": "默认数据源连接",
                        "isSysDefault": true
                    },
                    "metaRegisterColumn": [],
                    "registerTableType": null
                }]
            })
        }

        ,
        "getUnselectedTables": function(req, res) {
            res.send([{
                "tableName": "plt_taobao_customer",
                "tableComment": "客人表"
            },
            {
                "tableName": "plt_taobao_order",
                "tableComment": "订单表"
            }])
        }

        ,
        "saveSourceService": function(req, res) {
            res.send();
        }

    },
    /*短信元数据配置 end Added By 茅丹丹 2014-3-24*/
    /*edm配置 start Added By 茅丹丹 2014-3-24*/
    "edmattribute": {
        //获取单个edm配置的主题
        "getSubjectById": function(req, res) {
            res.send({
                "id": "1",
                "metaSegmentModelId": "1",
                "subjectId": "1",
                "emailAttributeId": "1",
                "attributes": [{
                    "id": 1,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                },
                {
                    "id": 2,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                }]
            });
        }

        ,
        //删除单个edm配置的主题
        "deleteEdmAttributeConfigById": function(req, res) {
            res.send({
                "id": "1"
            });
        }

        ,
        //保存edm据配置的主题
        "postSubjectList": function(req, res) {
            res.send({});
        }

        ,
        //获取元分组模型
        "getMetaSegmentList": function(req, res) {
            res.send([{
                "modelId": 1,
                "modelName": "sss"
            },
            {
                "modelId": 2,
                "modelName": "sss"
            }]);
        }

        ,
        //获取所有主题
        "getMetaSubjectList": function(req, res) {
            res.send([{
                "subjectId": 1,
                "subjectName": "name"
            },
            {
                "subjectId": 2,
                "subjectName": "name"
            }]);
        }

        ,
        //复杂--获取所有属性
        "getMetaAttributeList": function(req, res) {
            res.send([{
                "attributeId": 1,
                "attributeName": "name"
            },
            {
                "attributeId": 2,
                "attributeName": "age"
            },
            {
                "attributeId": 3,
                "attributeName": "email"
            },
            {
                "attributeId": 4,
                "attributeName": "address"
            }]);
        }

        ,
        //单个-获取所有属性集
        "getSimpleMetaAttributeList": function(req, res) {
            res.send([{
                "attributeCollectionId": 1,
                "attributeCollectionName": "name"
            },
            {
                "attributeCollectionId": 2,
                "attributeCollectionName": "age"
            }]);
        }

        ,
        //单个-获取某属性集的所有属性
        "getSimpleMetaAttributeListById": function(req, res) {
            res.send([{
                "attributeId": 1,
                "attributeName": "name"
            },
            {
                "attributeId": 2,
                "attributeName": "age"
            },
            {
                "attributeId": 3,
                "attributeName": "email"
            },
            {
                "attributeId": 4,
                "attributeName": "address"
            }])
        }

        ,
        //获取所有edm元数据配置的主题
        "getEdmSubjectsList": function(req, res) {
            res.send([{
                "id": "1",
                "metaSegmentModelId": "1",
                "subjectId": "1",
                "emailAttributeId": "1",
                "attributes": [{
                    "id": 1,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                },
                {
                    "id": 2,
                    "subjectId": 1,
                    "attributeType": 1,
                    "attributeId": 1
                }]
            }])
        }
    }
    /*edm元数据配置 end Added By 茅丹丹 2014-3-27*/
	
	,
	//查询节点配置
	"findNode":{
		 "subject":{
		     "post":function(req,res){
				 res.send({});
			  },
			  "getList":function(req,res){
				  res.send([
					  {
						  "configSubjectId": 9,
						  "configSubjectName":"淘宝客户",
						  "queryConfigId": 1, 
						  "metasSubjectId": 1, 
						  "filters": [
							  {
								  "filterId": 2, 
								  "orderId": 2
							  }, 
							  {
								  "filterId": 1, 
								  "orderId": 1
							  }
						  ]
					  }, 
					  {
						  "configSubjectId": 10, 
						  "queryConfigId": 1, 
						  "configSubjectName":"京东客户",
						  "metasSubjectId": 2, 
						  "filters": [
							  {
								  "filterId": 2, 
								  "orderId": 2
							  }, 
							  {
								  "filterId": 1, 
								  "orderId": 1
							  }
						  ]
					  }
				  ]);
			  },
			  "get":function(req,res){
				   res.send({
						"configSubjectId": 9,
						"queryConfigId": 1,
						"metasSubjectId": 1,
						"filters": [
							{
								"filterId": 1,
								"orderId": 1
							},
							{
								"filterId": 2,
								"orderId": 2
							}
						]
					});
			  },
			  "delete":function(req,res){
				   res.send({});  
			  }
		 }
	}
};