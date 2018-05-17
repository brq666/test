
/*
 * GET dashboard listing.
 */

module.exports={
	"MOBILE":function(req,res){
		res.send({"total":0,"page":1,"data":[]});	
	},
	"exists":function(req,res){//手机存在验证
		res.send(false);	
	},
	"saveblacklist":function(req,res){
		res.send({"status":0,"errCode":"","message":"","data":"","visit":"2013-12-09 15:44:54"});	
	}
};
