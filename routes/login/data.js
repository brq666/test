
/*
 * GET login listing.
 */

module.exports={
  'login':function(req, res){
    //var result = {
      //authedItem: req.body
    //};
    res.status(201);
    res.send({
      id:'89638c4691d59625e95d4186bfc2f35b880e44b4'
    });
  },
  'checkLogin': function(req, res) {
    var result = {
      id: '89638c4691d59625e95d4186bfc2f35b880e44b4',
      host: 'http://qiushi.ccmsyun.com:8181',
      username: 'admin',
      sign: '12f90afe49d2f993a08a63e67bb60347',
      userId: 10000007,
      authType: '',
      tenantId: 'qiushi',
      authenticatedTime: '2015-08-10T17:19:47.000+0800',
      expireTime: '2015-08-10T17:49:47.000+0800',
      expired: false,
      needLogin: false,
      remark: '',
      sub: '111'
    };
    res.cookie('ccmsRequestCredential', JSON.stringify(result));
    res.send(result);
  },
  'visit': function(req, res) {
    res.status(201);
    res.send({
      "tip": "",
      "supportOps": ["VIEW"],
      "name": "(导航)",
      "type": "PageModule",
      "id": "nav",
      "level": 1,
      "url": "",
      "children": [{
        "tip": "",
        "dataUrl": "&sign=4779589c649cb0a00f231120a594f471",
        "supportOps": ["VIEW"],
        "name": "首页",
        "type": "PageModule",
        "id": "nav/link_index",
        "level": 10,
        "url": "dashboard",
        "children": []
      }, {
        "tip": "",
        "dataUrl": "https://bi.fenxibao.com/rest/oauth2?timestamp=1432801163142&username=qiushi&operator=admin&sign=3ddc76cd5096dbab50cd9c3583fc1f50&usertype=build-in",
        "supportOps": ["VIEW"],
        "name": "商业智能",
        "type": "PageModule",
        "id": "nav/link_bi",
        "level": 10,
        "url": "/app/modules/insert/index.html#/bi",
        "children": []
      },{
        "tip": "",
        "dataUrl": "https://bi.fenxibao.com/rest/oauth2?timestamp=1432801163142&username=qiushi&operator=admin&sign=3ddc76cd5096dbab50cd9c3583fc1f50&usertype=build-in",
        "supportOps": ["VIEW"],
        "name": "联合营销",
        "type": "PageModule",
        "id": "nav/link_bi",
        "level": 10,
        "url": "/app/modules/insert/index.html#/bi",
        "children": []
      },{
        "tip": "",
        "dataUrl": "&sign=4779589c649cb0a00f231120a594f471",
        "supportOps": ["VIEW"],
        "name": "主动营销",
        "type": "PageModule",
        "id": "nav/link_marketing",
        "level": 10,
        "url": "campaign.market",
        "children": []
      }, {
        "tip": "",
        "dataUrl": "https://newcallcenter.fenxibao.com/callcenter/?userName=qiushi&loginName=admin&userType=build-in&timestamp=1432801163144&sign=30734019f9fb4e671275375fd9a78fcd",
        "supportOps": ["VIEW"],
        "name": "呼叫系统",
        "type": "PageModule",
        "id": "nav/callSystem",
        "level": 10,
        "url": "https://newcallcenter.fenxibao.com/callcenter/?userName=qiushi&loginName=admin&userType=build-in&timestamp=1432801163144&sign=30734019f9fb4e671275375fd9a78fcd",
        "children": []
      }, {
        "tip": "",
        "dataUrl": "http://10.200.187.119:18080/loyaltyweb/user/login?timestamp=1432801163144&username=qiushi&operator=admin&sign=f105e153046da717b549284368ec1828&usertype=build-in",
        "supportOps": ["VIEW"],
        "name": "忠诚度管理",
        "type": "PageModule",
        "id": "nav/link_loyalty",
        "level": 10,
        "url": "/app/modules/insert/index.html#/loyalty",
        "children": []
      }, {
        "tip": "",
        "dataUrl": "https://base-qiushi-ccms.fenxibao.com/index_iframe.html#/affairs/orderlist?timestamp=1432801163143&username=qiushi&operator=admin&sign=fe264bc725963a187d2a13bb80516b85&usertype=build-in",
        "supportOps": ["VIEW"],
        "name": "客服中心",
        "type": "PageModule",
        "id": "nav/link_server",
        "level": 10,
        "url": "/app/modules/insert/index.html#/server",
        "children": []
      }, {
        "tip": "",
        "dataUrl": "https://base-qiushi-ccms.fenxibao.com/index_iframe.html#/order/orderMonitor?timestamp=1432801163143&username=qiushi&operator=admin&sign=fe264bc725963a187d2a13bb80516b85&usertype=build-in",
        "supportOps": ["VIEW"],
        "name": "订单中心",
        "type": "PageModule",
        "id": "nav/link_order",
        "level": 10,
        "url": "/app/modules/insert/index.html#/order",
        "children": []
      }, {
        "tip": "",
        "dataUrl": "&sign=fe0128094c202fc81da9871b7fe46e45",
        "supportOps": ["VIEW"],
        "name": "数据管理",
        "type": "PageModule",
        "id": "nav/link_data",
        "level": 10,
        "url": "dataManagement",
        "children": []
      },
      {
        "tip": "",
        "dataUrl": "&sign=fe0128094c202fc81da9871b7fe46e45",
        "supportOps": ["VIEW"],
        "name": "系统管理",
        "type": "PageModule",
        "id": "nav/link_data",
        "level": 10,
        "url": "systemManage",
        "children": []
      },{
        "tip": "",
        "dataUrl": "https://base-qiushi-ccms.fenxibao.com/index_iframe.html#/personalizedPackage/subIndex?timestamp=1432801163144&username=qiushi&operator=admin&sign=45db08c97dac28e4e1df1e5436617518&usertype=build-in",
        "supportOps": ["VIEW"],
        "name": "个性化营销",
        "type": "PageModule",
        "id": "nav/link_individuation",
        "level": 10,
        "url": "/app/modules/insert/index.html#/individuation",
        "children": []
      }, {
        "tip": "",
        "dataUrl": "https://content.fenxibao.com/content/contentManage?timestamp=1432801163145&username=qiushi&operator=admin&sign=a76c5cf2f6fcd5c98e8f6783c797747e&usertype=build-in",
        "supportOps": ["ADD", "DEL", "UPDATE", "VIEW", "CLICK"],
        "name": "内容管理",
        "type": "PageModule",
        "id": "nav/link_contentManage",
        "level": 10,
        "url": "/app/modules/insert/index.html#/contentManage",
        "children": []
      }]
    });
  },
  'platform': function(req, res) {
    res.send({
      'pageLoginEnabled':true,'tenantId':'qiushi'
    })
  }
}
