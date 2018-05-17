
/*
 * GET dashboard listing.
 */

module.exports={
	"taobao":function(req,res){//淘宝店铺
		res.send({
			"data":{
				"shops":[{"shopId":"123","shopName":"数云旗舰店","shopType":"taobao"},{"shopId":"23246","shopName":"数云旗舰店2","shopType":"taobao"},{"shopId":"46464","shopName":"数云旗舰店3","shopType":"taobao"}]
			}
		});
	},
	"planGroup":function(req,res){//方案部署 方案
		res.send({"code":0,"status":"ok","visit":"2013-02-11 13:47:12","data":{"shopId":"10293829","sign":"【数22112云】","plans":[{"id":1,"name":"方案1：物流选择","position":1,"active":false,"startTime":"2013-02-11 13:47:12","localTime":"2013-06-20 13:47:12","lastConfigTime":"2013-02-11 13:47:12","rules":[{"id":11,"name":"方案1：购物满100送优惠券","position":1,"remarkContent":"送小样A","conditions":[{"id":111,"name":"购物满100","position":1,"useDefaultName":true,"conditionOpName":"EQ","type":"ORDER_BASED","propertyId":608,"referenceValue":"1,2,3","hasProvideValues":false},{"id":111,"name":"购物满100","position":1,"useDefaultName":true,"conditionOpName":"EQ","type":"ORDER_BASED","propertyId":605,"referenceValue":"天津,上海","hasProvideValues":false},{"id":333,"name":"购物满100","position":1,"relation":"AND"}]},{"id":22,"name":"购物满100送优惠券","position":2,"remarkContent":"送小样B","conditions":[{"id":111,"name":"购物满100","position":1},{"id":222,"name":"购物满100","position":1,"relation":"OR"},{"id":333,"name":"购物满100","position":1,"relation":"OR"}]},{"id":33,"name":"购物满100送优惠券","position":3,"remarkContent":"送小样c","conditions":[{"id":111,"name":"购物满100","position":1},{"id":222,"name":"购物满100","position":1}]}]},{"id":2,"name":"方案2：物流选择","position":1,"active":true,"localTime":"2013-06-20 09:12:23","startTime":"2013-06-20 09:12:23","lastConfigTime":"2013-02-11 13:47:12","rules":[{"id":11,"name":"方案2：购物满100送优惠券","position":1,"conditions":[{"id":111,"name":"购物满100","position":1,"relation":"OR"},{"id":222,"name":"购物满100","position":1,"relation":"OR"},{"id":333,"name":"购物满100","position":1,"relation":"OR"}
]},{"id":22,"name":"购物满100送优惠券","position":1,"conditions":[{"id":111,"name":"购物满100","position":1,"relation":"AND"},{"id":222,"name":"购物满100","position":1,"relation":"AND"},{"id":333,"name":"购物满100","position":1,"relation":"AND"}]},{"id":33,"name":"购物满100送优惠券","position":1,"conditions":[{"id":111,"name":"购物满100","position":1},{"id":222,"name":"购物满100","position":1},{"id":333,"name":"购物满100","position":1}]}]},{"id":3,"name":"方案3：物流选择","position":1,"active":false,"startTime":"2013-03-21 09:12:23","lastConfigTime":"2013-02-11 13:47:12","rules":[]}]}}
		);
	},
	"planStatus":function(req,res){//方案开启与关闭
		res.send(
			{
				"status":0,
				"message":"获取时间错误",
				"data":{
					"startTime":"2013-06-17 16:30:00"
				},
				"visit":"2013-06-18 15:30:30"
			}	 
		)
	},
	"remark":function(req,res){//修改备注
		res.send(
			{ "status":0 }	 
		)
	},
	"signContent":function(req,res){//预览备注
		res.send(
			{
				"status":0,	
				"data":{
				"content":"方案一产生的备注；方案二产生的备注；方案三产生的备注{数云}"
				}
			}		 
		)
	},
	//方案配置数据
	"savePlan":function(req,res){//保存方案
		res.send({"status":0,"errCode":"","message":"同名错误","data":"","visit":"2013-06-08 17:30:32"});
	},
	"condition":function(req,res){//获取全部指标类型
		res.send(
			{
				"code":0,
				"status":"ok",
				"data":[
					{"typeId":"CUSTOMER_BASED","typeName":"基于顾客"},
					{"typeId":"ORDER_BASED","typeName":"基于订单"}
				]
			}		 
		)
	},
	"property":function(req,res){//获取特定指标类型下的指标
		res.send({
			"code":0,
			"status":"ok",
			"data":[
				{"id":42,"name":"会员等级"},
				{"id":43,"name":"信用等级"},
				{"id":605,"name":"收货人所在地"},
				{"id":608,"name":"包含商品"}
			]
		});
	},
	"cankaozhi":function(req,res){//获取指标支持的操作符 和 可选值（又称“参考值”）
		res.send(
			{
				"code":0,
				"status":"ok",
				"data":{
					"propId":42,
					"propName":"会员等级",
					"propType":"string",
					"supportOps":[{"name":"EQ","label":"等于"},{"name":"GT","label":"大于"}],
					"providedValues":[{"id":1,"value":"北京","name":"北京"},{"id":2222,"value":"天津","name":"天津"},{"id":2,"value":"河北","name":"河北省"},{"id":3,"value":"山西","name":"山西省"},{"id":4,"value":"内蒙古","name":"内蒙古自治区"}]
				}   
			}	 
		)
	},
	"products":function(req,res){//按商品标题检索在售商品列表
		res.send(
			{"status":0,"errCode":"","message":"","data":{"count":1,"content":[{"numIid":36395580196,"title":"测试宝贝","picUrl":"http://img02.taobaocdn.com/bao/uploaded/i2/18625031580119075/T1uvIBFhFXXXXXXXXX_!!2-item_pic.png","price":"0.02"}]},"visit":"2013-12-09 11:22:42"}	 
		)
	},
	"numiids":function(req,res){//将所给的商品id串来显示相应的商品信息
		res.send(
			{"status":0,"errCode":"","message":"","data":{"count":"","content":[{"numIid":36395580196,"title":"测试宝贝","picUrl":"http://img02.taobaocdn.com/bao/uploaded/i2/18625031580119075/T1uvIBFhFXXXXXXXXX_!!2-item_pic.png","price":"0.02"}]},"visit":"2013-12-09 11:23:42"}		 
		);
	},
	"region":function(req,res){//根据上级区域的id获取它的直接下级区域列表。如根据省的id获取市列表
		res.send(
			{
				"status":0,
				"data":[{"id":110100,"name":"北京市","value":"北京"},{"id":221,"name":"上海市","value":"上海"},{"id":2225025,"name":"天津市","value":"天津"}]
			}	 
		)
	},
	//运行监控
	"dateSlot":function(req,res){
		res.send({"status":0,"errCode":"","message":"","data":{"handled":2000,"matched":1000,"ruleData":[{"id":11,"handled":1985,"matched":700,"rate":"20%"},{"id":22,"handled":1985,"matched":700,"rate":"40%"},{"id":33,"handled":1985,"matched":700,"rate":"40%"}]},"visit":"2013-06-20 12:12:12"});
	}
	
};
