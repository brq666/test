
/*
 * 通用化配置数据配置
 */
 
module.exports={
	"categoryType":function(req,res){
		res.send([{"typeId": 1,"typeName": "普通查询"},{"typeId": 2,"typeName": "分组查询"}
])
	},
	"category":function(req,res){//分类的获取
		res.send([{"id":2,"name":"普通配置","open":false,"typeId":1,"pId":null},{"id":4,"name":"拆分组配置","open":false,"typeId":2,"pId":null},{"id":5,"name":"拆分组子节点","open":false,"typeId":2,"pId":4},{"id":7,"name":"拆分组子节2点","open":false,"typeId":2,"pId":5},{"id":6,"name":"拆分组子节点","open":false,"typeId":2,"pId":4},{"id":3,"name":"自定义配置","open":false,"typeId":3,"pId":null}])
	},
	"postCategory":function(req,res){
		var dataObj={"id":138,"parent":{"id":137,"name":"22222","parent":{"id":32,"name":"所有","parent":null,"createrId":null,"createAt":null,"updatedAt":null},"createrId":null,"createAt":null,"updatedAt":null},"createrId":null,"createAt":null,"updatedAt":null};
		dataObj.name=req.body.name;
		dataObj.typeId=req.body.typeId;
		res.send(dataObj)	
	},
	"modificationCategory":function(req,res){
		res.send([
			{
				"id": 44,
				"attributeName": "用户昵称",
				"tableName": "plt_taobao_customer",
				"columnName": "customerno",
				"columnType": "varchar",
				"queryTypeName": "字符输入",
				"userName": "admin",
				"modified": "2014-01-10T16:53:31.000+0800",
				"config": [
					{
						"operatorId": "100",
						"operatorValue": [
							{
								"id": 1,
								"value": [
									"大于"
								]
							}
						]
					},
					{
						"operatorId": "101",
						"operatorValue": [
							{
								"id": 1,
								"value": [
									"input输入"
								]
							}
						]
					},
					{
						"operatorId": "102",
						"operatorValue": [
							{
								"id": 1,
								"value": [
									"小于"
								]
							}
						]
					}
				]
			}
		])	
	},
	"putCategory":function(req,res){
		res.send([{"id":1,"name":"所有","open":true,"pId":0},{"id":2,"name":"测试a","open":false,"pId":1},{"id":4,"name":"测试","open":false,"pId":2},{"id":5,"name":"aaa","open":false,"pId":1},{"id":6,"name":"bbbb","open":true,"pId":1},{"id":7,"name":"ddddd","open":true,"pId":6},{"id":8,"name":"yyyyyyyy","open":true,"pId":1},{"id":9,"name":"gggggg","open":true,"pId":2},{"id":10,"name":"未分类","open":true,"pId":1},{"id":11,"name":"bbbbb","open":true,"pId":2},{"id":12,"name":"fgggg","open":false,"pId":2}])	
	},
	"deleteCategory":function(req,res){
		res.send([{"id":1,"name":"所有","open":true,"pId":0},{"id":2,"name":"测试a","open":false,"pId":1},{"id":4,"name":"测试","open":false,"pId":2},{"id":5,"name":"aaa","open":false,"pId":1},{"id":6,"name":"bbbb","open":true,"pId":1},{"id":7,"name":"ddddd","open":true,"pId":6},{"id":8,"name":"yyyyyyyy","open":true,"pId":1},{"id":9,"name":"gggggg","open":true,"pId":2},{"id":10,"name":"未分类","open":true,"pId":1},{"id":11,"name":"bbbbb","open":true,"pId":2},{"id":12,"name":"fgggg","open":false,"pId":2}])	
	},
	"queryitem":function(req,res){
		res.send({"total":2,"page":0,"data":[{"categoryId":11,"id":1,"attributeName":"名称一","tableName":"plt_taobao_customer","columnName":"full_name","columnType":"varchar","queryTypeName":"字符类型","userName":"admin","modified":"2014-01-02T11:29:13.000+0800"},{"categoryId":22,"id":2,"attributeName":"名称一","tableName":"plt_taobao_customer","columnName":"sex","columnType":"char","queryTypeName":"字符类型","userName":"admin","modified":"2014-01-02T11:29:13.000+0800"},{"categoryId":33,"id":3,"attributeName":"名称一","tableName":"plt_taobao_customer","columnName":"sex","columnType":"char","queryTypeName":"字符类型","userName":"admin","modified":"2014-01-02T11:29:13.000+0800"}],"pageSize":10})
	},
	"deleteQueryitem":function(req,res){
		res.send({"isBoolean": true});	
	},
	"queryConfigType":function(req,res){
		 res.send([{"id":1,"queryTypeName":"字符输入","attributeQueryConfigMeta":[{"id":1,"configParamId":100,"configParamValue":"StringOperator","configParamName":"字符操作符","validatorExpression":null,"sortId":1,"comment":null,"frontendComponentControl":[{"id":1,"type":"checkbox","mappingtype":"dictionary","dictionaryTypeId":110000}]},{"id":2,"configParamId":101,"configParamValue":"LengthLimit","configParamName":"长度限制","validatorExpression":null,"sortId":2,"comment":null,"frontendComponentControl":[{"id":1,"type":"input","mappingtype":"input"}]},{"id":3,"configParamId":102,"configParamValue":"SpecialValidator","configParamName":"特殊校验","validatorExpression":null,"sortId":3,"comment":null,"frontendComponentControl":[{"id":1,"type":"radio","mappingtype":"dictionary","dictionaryTypeId":120000}]}]},{"id":2,"queryTypeName":"数字输入","attributeQueryConfigMeta":[{"id":4,"configParamId":200,"configParamValue":"NumberOperator","configParamName":"数字操作符","validatorExpression":null,"sortId":1,"comment":null,"frontendComponentControl":[{"id":1,"type":"checkbox","mappingtype":"dictionary","dictionaryTypeId":130000}]},{"id":5,"configParamId":201,"configParamValue":"InputType","configParamName":"输入类型","validatorExpression":null,"sortId":2,"comment":null,"frontendComponentControl":[{"id":1,"type":"select","mappingtype":"dictionary","dictionaryTypeId":140000}]},{"id":6,"configParamId":202,"configParamValue":"InputPrecision","configParamName":"输入精度","validatorExpression":null,"sortId":3,"comment":null,"frontendComponentControl":[{"id":1,"type":"select","mappingtype":"dictionary","dictionaryTypeId":150000}]},{"id":7,"configParamId":204,"configParamValue":"InputRange","configParamName":"输入范围","validatorExpression":null,"sortId":4,"comment":null,"frontendComponentControl":[{"id":1,"type":"input","mappingtype":"input"},{"id":2,"type":"field","text":"-"},{"id":3,"type":"input","mappingtype":"input"}]}]},{"id":7,"queryTypeName":"字典选择","attributeQueryConfigMeta":[{"id":1,"configParamId":100,"configParamValue":"StringOperator","configParamName":"字符操作符","validatorExpression":null,"sortId":1,"comment":null,"frontendComponentControl":[{"id":1,"type":"select","mappingtype":"meta_dic","dictionaryTypeId":110000}]}]},{"id":8,"queryTypeName":"关键字定制","attributeQueryConfigMeta":[]}]);
	},
	"getTablesLists":function(req,res){
		res.send(
			{
			  "total": 7,
			  "page": 1,
			  "data": [
				{
				  "id": 1,
				  "registerTableName": "plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				},
				{
				  "id": 2,
				  "registerTableName": "表2plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				},
				{
				  "id": 3,
				  "registerTableName": "表3plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				},
				{
				  "id": 4,
				  "registerTableName": "表4plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				}
			  ]
			}
		);
	},
	"getTables":function(req,res){
		res.send(
			[
				{
					"id": 1, 
					"registerTableName": "plt_taobao_customer", 
					"schemaName": "ccms6_mfh", 
					"registerTableComment": null
				}, 
				{
					"id": 2, 
					"registerTableName": "plt_taobao_crm_member", 
					"schemaName": "ccms6_mfh", 
					"registerTableComment": "店铺买家会员信息表"
				}
			]
		);
	},
	"postTables":function(req,res){
		res.send(
			{
			  "total": 7,
			  "page": 1,
			  "data": [
				{
				  "id": 1,
				  "registerTableName": "plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				},
				{
				  "id": 2,
				  "registerTableName": "表2plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				},
				{
				  "id": 3,
				  "registerTableName": "表3plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				},
				{
				  "id": 4,
				  "registerTableName": "表4plt_taobao_customer",
				  "tableComment":"表说明",
				  "subjectRelation": "subject关系",
				  "filterRelation": "filter关系"
				}
			  ]
			}
		);
	},
	"deleteTables":function(req,res){
		res.send({"code": "删除成功！"})
	},
	"getStateLists":function(req,res){
		res.send([
			{
				"subjectId": 1,
				"subjectName": "客户",
				"defaultColumnName":"",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},
			{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},
			{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},
			{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},
			{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},
			{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},
			{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			},
			{
				"subjectId": 2,
				"subjectName": "订单",
				"defaultColumnName":"customerno",
				"columnMetaDTO": [
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "customerno",
						"dataType": "varchar",
						"columnType": "varchar(50)",
						"columnKey": "PRI"
					},
					{
						"tableSchema": "ccms6_yinwei",
						"tableName": "plt_taobao_customer",
						"columnName": "sex",
						"dataType": "char",
						"columnType": "char(1)",
						"columnKey": ""
					}
				]
			}
		])
	},
	"getUnTables":function(req,res){
		res.send([
			{
				"id":1,
				"tableSchema": "ccms6_yinwei",
				"tableName": "我plt_taobao_customer",
				"tableComment": "客户表1"
			},
			{
				"id":2,
				"tableSchema": "ccms6_yinwei",
				"tableName": "他plt_taobao_customer",
				"tableComment": "客户表2"
			},
			{
				"id":3,
				"tableSchema": "ccms6_yinwei",
				"tableName": "plt_taobao_customer",
				"tableComment": "客户表3"
			},
		])
	},
	"getTableColumn":function(req,res){
		res.send([[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"customerno"},"varchar","varchar(50)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"full_name"},"varchar","varchar(50)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"sex"},"char","char(1)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"buyer_credit_lev"},"int","int(11)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"buyer_credit_score"},"int","int(11)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"buyer_credit_good_num"},"int","int(11)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"buyer_credit_total_num"},"int","int(11)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"zip"},"varchar","varchar(20)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"address"},"varchar","varchar(255)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"city"},"varchar","varchar(50)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"state"},"varchar","varchar(50)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"country"},"varchar","varchar(100)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"district"},"varchar","varchar(100)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"created"},"datetime","datetime"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"last_visit"},"datetime","datetime"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"birthday"},"date","date"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"vip_info"},"varchar","varchar(20)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"email"},"varchar","varchar(100)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"mobile"},"varchar","varchar(20)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"phone"},"varchar","varchar(50)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"last_sync"},"datetime","datetime"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"job"},"varchar","varchar(50)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"birth_year"},"smallint","smallint(6)"],[{"tableSchema":"ccms6_yinwei","tableName":"plt_taobao_customer","columnName":"changed"},"datetime","datetime"]]);
	},
	"queryDictionary":function(req,res){
		res.send([
			{
				"typeValueId": 10000002,
				"parentTypeValueId": null,
				"typeValue": "dictionary",
				"viewname": "大于",
				"memo": null,
				"importId": null
			},
			{
				"typeValueId": 10000001,
				"parentTypeValueId": null,
				"typeValue": "number",
				"viewname": "小于",
				"memo": null,
				"importId": null
			},
			{
				"typeValueId": 10000000,
				"parentTypeValueId": null,
				"typeValue": "string",
				"viewname": "等于",
				"memo": "属性查询类型",
				"importId": null
			}
		]);
	},
	"queryMetaDic":function(req,res){
		 res.send([
			{
				"dicId": 1,
				"dicGroup": "group.basic",
				"dicKey": "dic.sex",
				"dicName": "性别"
			},
			{
				"dicId": 2,
				"dicGroup": "group.basic",
				"dicKey": "dic.boolean",
				"dicName": "是否"
			},
			{
				"dicId": 3,
				"dicGroup": "group.basic",
				"dicKey": "dic.validation",
				"dicName": "有效性"
			}
		]);
	},
	"queryMetaDicSimplify":function(req,res){
		 res.send([
			{
				"dicId": 1,
				"dicGroup": "group.basic",
				"dicKey": "dic.sex",
				"dicName": "性别"
			},
			{
				"dicId": 2,
				"dicGroup": "group.basic",
				"dicKey": "dic.boolean",
				"dicName": "是否"
			},
			{
				"dicId": 3,
				"dicGroup": "group.basic",
				"dicKey": "dic.validation",
				"dicName": "有效性"
			}
		]);
	},
	"queryCategoryGroupBy":function(req,res){
		 res.send(
			{
				"categoryId": 1, 
				"groupByColumns": [
					{
						"columnName": "customerno", 
						"columnType": "varchar", 
						"dicKey": "dic.name", 
						"orderId": 1
					},
					{
						"columnName": "dp_id", 
						"columnType": "varchar", 
						"dicKey": "dic.shop", 
						"orderId": 2
					}
				], 
				"subjectId": 101, 
				"tableName": "plt_taobao_customerno"
			}
		);
	},
	"saveCategoryGroupBy":function(req,res){
		 res.send([
			{
				"categoryId": 1, 
				"groupByColumns": [
					{
						"columnName": "customerno", 
						"columnType": "varchar", 
						"dicKey": "dic.name", 
						"orderId": 1
					},
					{
						"columnName": "dp_id", 
						"columnType": "varchar", 
						"dicKey": "dic.shop", 
						"orderId": 2
					}
				], 
				"subjectId": 101, 
				"tableName": "plt_taobao_customerno"
			}
		]);
	},
	"getSubject":function(req,res){//数据配置  主题数据
		res.send([
		  {
			"subjectId": "活动类型1",
			"subjectName": "活动类型名",
			"disabled": true
		  },
		  {
			"subjectId": "活动类型2",
			"subjectName": "活动类型名",
			"disabled": false
		  },
		  {
			"subjectId": "活动类型3",
			"subjectName": "活动类型名",
			"disabled": true
		  },
		  {
			"subjectId": "活动类型4",
			"subjectName": "活动类型名",
			"disabled": false
		  }
		])
	},
	"postSubject":function(req,res){
		res.send({})
	},
	"deleteSubject":function(req,res){
		res.send({})	
	},
	"getMetaFilter":function(req,res){
		res.send({
		  "total": 7,
		  "page": 1,
		  "data": [
			{
			  "id": 1,
			  "filterName": "plt_taobao_customer",
			  "associatePurview": "fasle",
			  "filterType": {id:1,filterTypeName:"123456"},
			  "metaDic": {"dicId":11,"dicName":"name"}
			},
			{
			  "id": 2,
			  "filterName": "表2plt_taobao_customer",
			  "associatePurview": "表说明",
			  "filterType": {id:1,filterTypeName:"123456"},
			   "metaDic": {"dicId":11,"dicName":"name"}
			},
			{
			  "id": 3,
			  "filterName": "表3plt_taobao_customer",
			  "associatePurview": "表说明",
			  "filterType": {id:1,filterTypeName:"123456"},
			  "metaDic": {"dicId":11,"dicName":"name"}
			},
			{
			  "id": 4,
			  "filterName": "表4plt_taobao_customer",
			  "associatePurview": "表说明",
			  "filterType": {id:1,filterTypeName:"123456"},
			   "metaDic": {"dicId":11,"dicName":"name"}
			}
		  ]
		})
	},
	"postMetaFilter":function(req,res){
		res.send({"code":"新增成功"})
	},
	"deleteMetaFilter":function(req,res){
		res.send({"code": "删除成功！"})
	},
	"getMetaFilterType":function(req,res){
		res.send([
			{
				"id": 1,
				"filterTypeName": "字典单选"
			},
			{
				"id": 2,
				"filterTypeName": "字典多选"
			}
		])
	},
	"getGlobalFilter":function(req,res){
		res.send([
			{id:1,filterName:"过获取滤器1",checked:false},{id:2,filterName:"过滤器2",checked:false},{id:3,filterName:"过滤器3",checked:false},{id:4,filterName:"过滤器4",checked:false}
		]);
	},
	"postGlobalParam":function(req,res){
		res.send({"code":"新增成功"});
	},
	"postFilterConfigLists":function(req,res){
		res.send()
	},
	"getColumns":function(req,res){
		res.send([
			{
				"tableSchema": "ccms6_yinwei",
				"tableName": "plt_taobao_customer",
				"columnName": "customerno",
				"dataType": "varchar",
				"columnType": "varchar(50)",
				"columnKey": "PRI"
			},
			{
				"tableSchema": "ccms6_yinwei",
				"tableName": "plt_taobao_customer",
				"columnName": "full_name",
				"dataType": "varchar",
				"columnType": "varchar(50)",
				"columnKey": ""
			},
			{
				"tableSchema": "ccms6_yinwei",
				"tableName": "plt_taobao_customer",
				"columnName": "sex",
				"dataType": "char",
				"columnType": "char(1)",
				"columnKey": ""
			}
		])	
	},
	/*订单查询配置开始*/
	"queryOrderList":function(req,res){
		 res.send({
			"total": 30,
			"page": 1,
			"data": [{
				"categoryId": 11,
				"id": 1,
				"attributeName": "名称一",
				"attributeCount":20,
				"indexCount":25,
				"positionCount":15,
				"userName": "admin",
				"modified": "2014-01-02T11:29:13.000+0800"
			}, {
				"categoryId": 22,
				"id": 2,
				"attributeName": "名称二",
				"attributeCount":20,
				"indexCount":25,
				"positionCount":15,
				"userName": "admin",
				"modified": "2014-01-02T11:29:13.000+0800"
			}, {
				"categoryId": 33,
				"id": 3,
				"attributeName": "名称三",
				"attributeCount":20,
				"indexCount":25,
				"positionCount":15,
				"userName": "admin",
				"modified": "2014-01-02T11:29:13.000+0800"
			}],
			"pageSize": 10
		});
	}
	/*订单查询配置结束*/
};