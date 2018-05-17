
/*
 * GET dashboard listing.
 */

module.exports={
	"couponList":function(req,res){//优惠券列表
		res.send({"total":2,"page":1,"pageSize":20,"data":[{"couponId":123456,"couponName":"双11满100减10","couponType":"taobao","createTime":"20131001 12:00:00","startTime":"20131001 00:00:00","endTime":"20131010 12:00:00","available":true,"enable":true,"denomination":{"denominationId":1,"denominationName":"3元","denominationValue":3},"shop":{"shopId":"123","shopName":"数云旗舰店","shopType":"taobao"},"creator":{"userId":1,"userType":"taobao","loginName":"数云旗舰店:客服1","realName":"数云旗舰店:客服1"},"threshold":0,"remark":""},{"couponId":574641,"couponName":"11满100减10","couponType":"taobao","createTime":"20131001 12:00:00","startTime":"20131001 00:00:00","endTime":"20131010 12:00:00","available":false,"enable":true,"denomination":{"denominationId":1,"denominationName":"3元","denominationValue":3},"shop":{"shopId":"222","shopName":"数云旗舰店","shopType":"taobao"},"creator":{"userId":1,"userType":"taobao","loginName":"数云旗舰店:客服1","realName":"数云旗舰店:客服1"},"threshold":99,"remark":"备注备注.."},{"couponId":13246574,"couponName":"双11满100减10","couponType":"taobao","createTime":"20131001 12:00:00","startTime":"20131001 00:00:00","endTime":"20131010 12:00:00","available":true,"enable":true,"denomination":{"denominationId":1,"denominationName":"3元","denominationValue":3},"shop":{"shopId":"333","shopName":"数云旗舰店","shopType":"taobao"},"creator":{"userId":1,"userType":"taobao","loginName":"数云旗舰店:客服1","realName":"数云旗舰店:客服1"},"threshold":8888,"remark":"备注备注备注备注备注备注备注备注备注备注备注备注备注备注.."},{"couponId":654646,"couponName":"双11满100减10","couponType":"taobao","createTime":"20131001 12:00:00","startTime":"20131001 00:00:00","endTime":"20131010 12:00:00","available":true,"enable":false,"denomination":{"denominationId":1,"denominationName":"3元","denominationValue":3},"shop":{"shopId":"44444","shopName":"数云旗舰店","shopType":"taobao"}
,"creator":{"userId":1,"userType":"taobao","loginName":"数云旗舰店:客服1","realName":"数云旗舰店:客服1"},"threshold":100,"remark":"备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注.."}]});	
	},
	//新建优惠券
	"denomination":function(req,res){
		res.send({"data":{
			"denominations":[{"denominationId":123,"denominationName":"5元","denominationValue":5},{"denominationId":124,"denominationName":"10元","denominationValue":10},{"denominationId":125,"denominationName":"20元","denominationValue":20}]
			}
		});
	},
	"grandUrl":function(req,res){
		res.send({"data":{"grandUrl":"http://container.api.taobao.com/container?appkey=12283535&scope=promotion,item,usergrade"}})		
	},
	"authorization":function(req,res){//优惠券授权
		res.send({"status":0,"data":{"coupons":[{"couponId":123456,"couponName":"双11满100减10","createTime":"20131001 12:00:00","startTime":"20131001 12:00:00","endTime":"20131010 12:00:00","available":true,"enable":true,"threshold":100,"remark":"备注内容"},{"couponId":22,"couponName":"我的优惠券222","createTime":"20131001 12:00:00","startTime":"20131001 12:00:00","endTime":"20131010 12:00:00","available":true,"enable":true,"threshold":100,"remark":"备注内容"},{"couponId":333333,"couponName":"优惠券3333","createTime":"20131001 12:00:00","startTime":"20131001 12:00:00","endTime":"20131010 12:00:00","available":true,"enable":true,"threshold":100,"remark":"备注内容"}]}});	
	}
};
