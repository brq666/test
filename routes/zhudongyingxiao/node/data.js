/*
 * GET zhudongyingxiao listing.
 */
var url = require("url");
var model = {};

module.exports = {
  "getNodeTips": function (req, res) { // 获取tips
    res.send({
      'type': 'tflowtime',
      'name': '时间',
      'tips': '周期性活动尽量不要太集中'
    })
  },
  "getNumber": function (req, res) { // 获取节点底部统计人数
    model.count = model.count || -1;
    res.send({
      count: model.count
    });
    setTimeout(function () {
      model.count = 78968;
    }, 2000);
  },
  "getTime": function (req, res) { //时间节点
    res.send({
      "name": "时间",
      "remark": null,
      "tips": "茶壶sd卡金黄色的久爱时空",
      "id": 10002527,
      "days": null,
      "executionType": 0,
      "fixedBeginDate": null,
      "fixedBeginTime": null,
      "cycleType": 0,
      "cycleDay": 1,
      "cycleWeek": null,
      "cycleMonthType": null,
      "monthBegin": null,
      "monthEnd": null,
      "cycleBeginDate": "2013-12-28T00:00:00.000+0800",
      "cycleBeginTime": "15:55",
      "cycleEndType": 0,
      "repeats": null,
      "cycleEndDate": null,
      "cycleEndTime": null,
      "prompt": null,
      "cycleMonth1": null,
      "cycleMonth2": null
    })
  },
  "putQueryCreateGroupByQuery": function (req, res) {
    res.send(200);
  },
  "postTime": function (req, res) {
    res.send({
      "id": 29,
      "name": "time",
      "timeNode": {
        "iscycle": "0",
        "isrealtime": "0",
        "twoVal": "1",
        "realtimebeginDate": "2013-03-27",
        "realtimebeginTime": "10:18",
        "cyclebeginDate": "2013-03-01",
        "cycleendDate": "2013-04-01",
        "cyclebeginTime": "12:18"
      },
      "weekMap": {
        "1": "周日",
        "2": "周一",
        "3": "周二",
        "4": "周三",
        "5": "周四",
        "6": "周五",
        "7": "周六"
      },
      "monthMap": {
        "1": "1日",
        "2": "2日",
        "3": "3日",
        "4": "4日",
        "5": "5日",
        "6": "6日",
        "7": "7日",
        "8": "8日",
        "9": "9日",
        "10": "10日",
        "11": "11日",
        "12": "12日",
        "13": "13日",
        "14": "14日",
        "15": "15日",
        "16": "16日",
        "17": "17日",
        "18": "18日",
        "19": "19日",
        "20": "20日",
        "21": "21日",
        "22": "22日",
        "23": "23日",
        "24": "24日",
        "25": "25日",
        "26": "26日",
        "27": "27日",
        "28": "28日",
        "29": "29日",
        "30": "30日",
        "31": "31日"
      }
    });
  },
  "getWait": function (req, res) { //等待节点
    res.send({
      "id": 30,
      "name": "等待",
      "remark": "备注",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "waitType": 1,
      "waitDateTime": "2013-11-11 23:59",
      "waitDay": 10,
      "waitTime": "23:59",
      "waitHour": 10,
      "waitMinute": 10
    })
  },
  "postWait": function (req, res) {
    res.send({
      "id": 30,
      "name": "等待",
      "remark": "备注",
      "waitType": 1,
      "waitDateTime": "2013-11-11 23:59",
      "waitDay": 10,
      "waitTime": "23:59",
      "waitHour": 10,
      "waitMinute": 10
    })
  },
  "getTarget": function (req, res) { //目标组节点
    res.send({
      "control": 1,
      "name": "目标组",
      "id": 456,
      "remark": "dasdas",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列"
    })
  },
  "getTargetData": function (req, res) { //获取目标组信息
    res.send({
      "authority": true,
      "result": [
        ["平台", "是否控制组", "客户ID", "姓名", "性别", "生日", "省份", "城市", "区域", "客户全站等级", "手机号", "Email", "买家信用等级", "买家好评率", "地址", "邮编"],
        ["淘宝平台", "是", "007tammy", "null", "f", "null", "浙江", "杭州", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "0mm021168", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "111mmm65", "null", "null", "null", "null", "null", "null", "null", "null", "null", "1", "1.0000", "null", "0"],
        ["淘宝平台", "是", "11mm0", "null", "f", "null", "null", "null", "null", "null", "null", "null", "4", "1.0000", "null", "0"],
        ["淘宝平台", "是", "11猪mm", "null", "f", "null", "null", "null", "null", "null", "null", "null", "5", "1.0000", "null", "0"],
        ["淘宝平台", "是", "1220980454mm", "彭鸿英", "null", "null", "云南省", "曲靖市", "麒麟区", "null", "13508746161", "null", "6", "1.0000", "曲靖市麒麟区政府1号院20栋3座601", "655000"],
        ["淘宝平台", "是", "1220_mm", "null", "f", "null", "浙江", "杭州", "null", "null", "null", "null", "7", "1.0000", "null", "0"],
        ["淘宝平台", "是", "123456mm1979", "null", "null", "null", "null", "null", "null", "null", "null", "null", "4", "1.0000", "null", "0"],
        ["淘宝平台", "是", "123mm21", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "123麽麽mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "12415790summer", "null", "f", "null", "江苏", "徐州", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "13579emma", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "155171715mm", "null", "", "null", "山东", "泰安", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "163qzysttmm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "4", "1.0000", "null", "0"],
        ["淘宝平台", "是", "171103852mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "5", "1.0000", "null", "0"],
        ["淘宝平台", "是", "1970summerday", "null", "null", "null", "null", "null", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "197805mmyy", "null", "null", "null", "null", "null", "null", "asso_vip", "null", "null", "1", "1.0000", "null", "0"],
        ["淘宝平台", "是", "1986mm21", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "198857mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "19910907mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "0", "1.0000", "null", "0"],
        ["淘宝平台", "是", "2011tammy", "null", "f", "null", "浙江", "绍兴", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "240441469mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "1", "1.0000", "null", "0"],
        ["淘宝平台", "是", "2丫mm", "null", "f", "null", "安徽", "合肥", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "3120mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "5", "1.0000", "null", "0"],
        ["淘宝平台", "是", "329mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "4", "1.0000", "null", "0"],
        ["淘宝平台", "是", "348005145summer", "null", "null", "null", "null", "null", "null", "null", "null", "null", "7", "1.0000", "null", "0"],
        ["淘宝平台", "是", "361511595_mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "380000398wwyymm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "5211314mm521", "null", "null", "null", "null", "null", "null", "null", "null", "null", "0", "null", "null", "0"],
        ["淘宝平台", "是", "52summer4", "null", "null", "null", "null", "null", "null", "vip1", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "52石宇涵mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "54ttmm", "null", "f", "null", "河南", "郑州", "null", "null", "null", "null", "4", "1.0000", "null", "0"],
        ["淘宝平台", "是", "553540670mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "5887470mmll", "null", "f", "null", "重庆", "重庆", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "612emma", "null", "f", "null", "重庆", "重庆", "null", "null", "null", "null", "4", "0.9903", "null", "0"],
        ["淘宝平台", "是", "63680216mm", "null", "m", "null", "山东", "临沂", "null", "null", "null", "null", "5", "1.0000", "null", "0"],
        ["淘宝平台", "是", "66557744mm", "null", "", "null", "江苏", "连云港", "null", "null", "null", "null", "8", "1.0000", "null", "0"],
        ["淘宝平台", "是", "6902008mm", "null", "f", "null", "", "", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "7ttttmmmc", "null", "null", "null", "null", "null", "null", "null", "null", "null", "2", "1.0000", "null", "0"],
        ["淘宝平台", "是", "82530mm", "null", "null", "null", "湖南", "娄底", "null", "null", "null", "null", "5", "1.0000", "null", "0"],
        ["淘宝平台", "是", "90后可爱mm", "null", "f", "null", "null", "null", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "920626mm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "aamm", "null", "m", "null", "安徽", "芜湖", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "adamm18508", "null", "null", "null", "广东", "深圳", "null", "null", "null", "null", "5", "1.0000", "null", "0"],
        ["淘宝平台", "是", "adawjmm", "null", "null", "null", "null", "null", "null", "vip3", "null", "null", "7", "1.0000", "null", "0"],
        ["淘宝平台", "是", "ada_mmshn", "null", "null", "null", "上海", "上海", "null", "null", "null", "null", "6", "1.0000", "null", "0"],
        ["淘宝平台", "是", "ahfanmm", "null", "null", "null", "重庆", "重庆", "null", "null", "null", "null", "8", "1.0000", "null", "0"],
        ["淘宝平台", "是", "ahmm57", "null", "null", "null", "null", "null", "null", "vip1", "null", "null", "4", "1.0000", "null", "0"],
        ["淘宝平台", "是", "aimm0311", "null", "null", "null", "null", "null", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "aipiaoliangmm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "3", "1.0000", "null", "0"],
        ["淘宝平台", "是", "aiwwdmm", "null", "null", "null", "null", "null", "null", "null", "null", "null", "5", "1.0000", "null", "0"],
        ["淘宝平台", "是", "cclovemm920", "郑晨晨", "null", "null", "福建省", "宁德市", "福安市", "null", "18650527179", "null", "null", "null", "福隆宾馆 福泰路140号", "355000"],
        ["淘宝平台", "是", "chenmmn2", "陈娜", "null", "null", "陕西省", "西安市", "碑林区", "null", "15809269313", "null", "null", "null", "南二环西段21号华融国际大厦A25D陕西金标典公司", "710043"],
        ["淘宝平台", "是", "commonness1116", "刘婷婷", "null", "null", "山东省", "济南市", "章丘市", "null", "13853132428", "null", "null", "null", "普集镇镇委", "250206"],
        ["淘宝平台", "是", "emmayan84", "颜倩", "null", "null", "浙江省", "台州市", "玉环县", "null", "13967663173", "null", "null", "null", "楚门镇南兴西路168号中国农业银行", "317605"],
        ["淘宝平台", "是", "emmayaoo", "刘雅茵", "null", "null", "广东省", "广州市", "天河区", "null", "13660713042", "null", "null", "null", "珠江新城华成路2号名悦大厦A座5楼", "510000"],
        ["淘宝平台", "是", "emma子鸢", "何艳", "null", "null", "江苏省", "苏州市", "园区", "null", "13814898564", "null", "null", "null", "通园路666号A栋蓝聘集团", "215000"],
        ["淘宝平台", "是", "emmy881227", "张叶梅", "null", "null", "云南省", "曲靖市", "麒麟区", "null", "15877866602", "null", "null", "null", "云南省曲靖市麒麟区翠峰东路夕阳红公寓酒店六楼万丰建筑工程有限公司", "655000"],
        ["淘宝平台", "是", "janicesummer", "沈思婕", "null", "null", "江苏省", "苏州市", "常熟市", "null", "18626238720", "null", "null", "null", "江苏省常熟市沿江开发区 通联路 美桥公司", "215500"],
        ["淘宝平台", "是", "kgcmm1228", "曹梦梅", "null", "null", "江苏省", "南京市", "建邺区", "null", "18651897860", "null", "null", "null", "江苏省南京市建邺区江东中路219号凯旋丽都花园8幢301室", "210004"],
        ["淘宝平台", "是", "kummy2011", "郑亚丽", "null", "null", "福建省", "泉州市", "永春县", "null", "13850747583", "null", "null", "null", "新华路2号新华书店", "362617"],
        ["淘宝平台", "是", "meijingxuexiangmmm", "李春艳", "null", "null", "湖北省", "宜昌市", "西陵区", "null", "15871612058", "null", "null", "null", "宜昌市二中新校区高三英语组(西陵二路116号)", "443000"],
        ["淘宝平台", "是", "mikomm2008", "张鑫", "null", "null", "广东省", "深圳市", "其它区", "null", "13631628080", "null", "null", "null", "光明新区田寮社区怡景工业城B7栋5楼", "518000"],
        ["淘宝平台", "是", "missfanmm", "樊苗苗", "null", "null", "江苏省", "南京市", "鼓楼区", "null", "13776515097", "null", "null", "null", "\"南京市鼓楼区汉中门大街187号", "康怡花园2栋1单元302室\"", "210000"],
        ["淘宝平台", "是", "misssammi", "黄璐敏", "null", "null", "广东省", "惠州市", "惠城区", "null", "13902628966", "null", "null", "null", "广东省惠州市江北34号小区校园北路药检所4楼", "516003"],
        ["淘宝平台", "是", "mm1306915755", "王箫宇", "null", "null", "吉林省", "长春市", "宽城区", "null", "13069008880", "null", "null", "null", "长春市北亚泰大街2688号宽城住建局505室", "130051"],
        ["淘宝平台", "是", "mm1991225hh1991412", "许灏", "null", "null", "江苏省", "无锡市", "江阴市", "null", "18795678225", "null", "null", "null", "山观镇西苑新村43幢202室", "214400"],
        ["淘宝平台", "是", "mm446567482", "黄爱明", "null", "null", "河北省", "承德市", "双桥区", "null", "18830435871", "null", "null", "null", "双桥区 小老虎沟   承家园   5号楼  一单 元  黄爱明收", "067000"],
        ["淘宝平台", "是", "mm513622", "马继红", "null", "null", "河北省", "衡水市", "桃城区", "null", "15030816693", "null", "null", "null", "红旗大街南南苑小区8号楼4单元202室", "053000"],
        ["淘宝平台", "是", "mm99999999", "刘显宏", "null", "null", "山东省", "枣庄市", "滕州市", "null", "18663281308", "null", "null", "null", "新兴小区续建东区4-5-109", "277500"],
        ["淘宝平台", "是", "mmmmm03", "薛宇婧", "null", "null", "陕西省", "榆林市", "榆阳区", "null", "13488485777", "null", "null", "null", "陕西省榆林市开发区川渝人家楼底华夏烟酒城", "719000"],
        ["淘宝平台", "是", "mm_lee80", "李明梅", "null", "null", "北京", "北京市", "西城区", "null", "13366892787", "null", "null", "null", "西城区 德外大街117号", "100066"],
        ["淘宝平台", "是", "pcemm222", "潘翠娥", "null", "null", "江苏省", "盐城市", "大丰市", "null", "18616879327", "null", "null", "null", "经济开发区纬三路南（常州路与张謇路交叉处）", "224100"],
        ["淘宝平台", "是", "qiumm998", "李秋香", "null", "null", "湖南省", "郴州市", "资兴市", "null", "13875568786", "null", "null", "null", "新区东江南路消防队旁.广兴石材", "423400"],
        ["淘宝平台", "是", "qqdemm88", "男妮", "null", "null", "上海", "上海市", "宝山区", "null", "18017352077", "null", "null", "null", "长逸路301弄新梅淞南苑18号102室", "201900"],
        ["淘宝平台", "是", "sammi34", "康雯佳", "null", "null", "上海", "上海市", "虹口区", "null", "13801628831", "null", "null", "null", "上海市虹口区通州路188号1号楼2103室", "200086"],
        ["淘宝平台", "是", "sammixyf86", "王亚兰", "null", "null", "江苏省", "苏州市", "昆山市", "null", "18068072865", "null", "null", "null", "西湾新村30号305室", "215300"],
        ["淘宝平台", "是", "sammiyy2001", "张兰", "null", "null", "上海", "上海市", "徐汇区", "null", "15202101068", "null", "null", "null", "\"法雷奥"],
        ["漕河泾开发区虹梅路1801 号"],
        ["凯科国际大厦7 楼\"", "200233"],
        ["淘宝平台", "是", "scmswydmm敏敏888", "张敏", "null", "null", "四川省", "眉山市", "东坡区", "null", "18990325669", "null", "null", "null", "湖滨路中2段130号眉山市工商局", "620020"],
        ["淘宝平台", "是", "shuipingmm", "孙萍", "null", "null", "陕西省", "榆林市", "神木县", "null", "15690973399", "null", "null", "null", "大柳塔镇神东公司核算中心", "719315"],
        ["淘宝平台", "是", "ssmmiao", "王霞", "null", "null", "新疆维吾尔自治区", "伊犁哈萨克自治州", "伊宁市", "null", "18699991965", "null", "null", "null", "上林广场邮储银行信贷中心", "835000"],
        ["淘宝平台", "是", "summer1097", "陈秋", "null", "null", "广东省", "广州市", "番禺区", "null", "15989231521", "null", "null", "null", "大石迎宾路559-567号渔民新村", "511430"],
        ["淘宝平台", "是", "summerxoo86", "王月华", "null", "null", "河北省", "承德市", "宽城满族自治县", "null", "13643145015", "null", "null", "null", "民族街天宝酒店6楼603室", "067600"],
        ["淘宝平台", "是", "susiemmp", "彭萌萌", "null", "null", "北京", "北京市", "东城区", "null", "15901116775", "null", "null", "null", "建国门北大街8号华润大厦16层", "100005"],
        ["淘宝平台", "是", "tjmmm2011", "谭嘉敏", "null", "null", "广东省", "佛山市", "高明区", "null", "13424671249", "null", "null", "null", "广东溢达纺织有限公司华洋楼", "528500"],
        ["淘宝平台", "是", "wyhmm_85", "顾艺华", "null", "null", "上海", "上海市", "浦东新区", "null", "18701989018", "null", "null", "null", "金海路2360号15号楼316（二工大）", "201209"],
        ["淘宝平台", "是", "yccmmzxc", "张晓翠", "null", "null", "陕西省", "宝鸡市", "渭滨区", "null", "13892722211", "null", "null", "null", "太白路8号渭警苑小区", "721006"],
        ["淘宝平台", "是", "zjyxmm", "黄晓君", "null", "null", "上海", "上海市", "宝山区", "null", "13611754294", "null", "null", "null", "铁力路2468号甲1幢 305室", "200941"],
        ["淘宝平台", "是", "zwenmm", "张文", "null", "null", "贵州省", "贵阳市", "金阳开发区", "null", "13765159688", "null", "null", "null", "政府大楼A区6楼633", "550081"],
        ["淘宝平台", "是", "公主mmm", "苗雅梅", "null", "null", "陕西省", "西安市", "雁塔区", "null", "13991928763", "null", "null", "null", "高新区锦业路一号都市之门B座18层", "710000"],
        ["淘宝平台", "是", "周婷婷timmy", "周婷婷", "null", "null", "浙江省", "温州市", "瑞安市", "null", "15168705025", "null", "null", "null", "礁石工业区二路-7号---瑞安市先锋包装机械有限公司", "325200"],
        ["淘宝平台", "是", "哦小猫mm", "霍丹丹", "null", "null", "河北省", "邯郸市", "丛台区", "null", "18631021212", "null", "null", "null", "河北省邯郸市高开区总不基地十号楼八层", "056004"],
        ["淘宝平台", "是", "夏日嬷嬷茶mm", "林静", "null", "null", "四川省", "泸州市", "龙马潭区", "null", "13982757889", "null", "null", "null", "回龙湾沱一桥桥头    雅丽美发用品总汇", "646000"],
        ["淘宝平台", "是", "小丑鱼cmm", "陈国芬", "null", "null", "海南省", "三亚市", "null", "null", "13700463936", "null", "null", "null", "海南省三亚市崖城镇东门路4号", "572000"],
        ["淘宝平台", "是", "小蜜蜂mm1981", "徐水灵", "null", "null", "广东省", "湛江市", "廉江市", "null", "13824818198", "null", "null", "null", "廉江市罗洲大道水湖小区移动公司综合楼", "524400"],
        ["淘宝平台", "是", "帐蓬mm", "陈珠萍 老师", "null", "null", "浙江省", "台州市", "椒江区", "null", "15906861368", "null", "null", "null", "椒江三梅中学", "318000"],
        ["淘宝平台", "是", "涩柠檬mm", "谢海飞", "null", "null", "山东省", "淄博市", "张店区", "null", "15953364900", "null", "null", "null", "大化纤生活区化纤街1号院22丙4单元101", "255000"],
        ["淘宝平台", "是", "淼淼mm10", "崔淼", "null", "null", "内蒙古自治区", "呼和浩特市", "赛罕区", "null", "18748134954", "null", "null", "null", "赛罕区金桥世纪六路万豪长隆湾金园7号楼一单元401", "013000"],
        ["淘宝平台", "是", "澄清mm", "池凤", "null", "null", "重庆", "重庆市", "渝北区", "null", "15215090330", "null", "null", "null", "重庆市渝北区两路镇双凤桥唐庄小区 第二栋 第二单元 4-2室", "401121"],
        ["淘宝平台", "是", "烟卷mm", "付晓莉", "null", "null", "四川省", "成都市", "武侯区", "null", "13881837979", "null", "null", "null", "新光路9号新加坡花园1-3-204", "610000"]
      ]
    })
  },
  "postTarget": function (req, res) {
    res.send({
      "nodeId": 456,
      "name": "xxx",
      "controlGroupType": "0",
      "controlGroupValue": "5",
      "remark": "xxx"
    })
  },
  "getMerge": function (req, res) { //合并节点
    res.send({
      "id": 456,
      "name": "合并",
      "remark": "备注信息",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（"
    });
  },
  "postMerge": function (req, res) {
    res.send({
      "id": 456,
      "name": "合并",
      "remark": "备注信息"
    });
  },
  "getCampaignQuery": function (req, res) {
    res.send({
      "id": 456,
      subjects: [{
        id: "110",
        name: "淘宝客户",
        segmentationId: "10"
      }, {
        id: "111",
        name: "京东客户",
        segmentationId: "11"
      }, {
        id: "112",
        name: "易迅",
        segmentationId: "12"
      }],
      "name": "活动查询",
      "remark": "sadlfjjasdf",
      "type": "custom",
      "defaultSubject": "淘宝客户",
      "configs": [{
        "type": "字典多选",
        "values": {
          "100571094": "大狗子19890202",
          "10066666": "吧啦啦啦"
        }
      }],
      "relation": "and",
      "conditions": [{
        "id": 80647,
        "showOrder": 0,
        "type": "参加次数",
        "valueChannel": "1,2",
        "values": {
          "type": "周",
          "value": 3,
          "activityOperator": "介于",
          "activityValue": "2,6"
        }
      }, {
        "id": 80648,
        "showOrder": 1,
        "type": "最后参加时间",
        "valueChannel": "1,2,3",
        "values": {
          "type": "absolutely",
          "operator": "介于",
          "value": "2014-11-11,2014-11-11",
          //"interval": "4,23",
          "dimension": "天",
        }
      }, {
        "id": 80649,
        "showOrder": 2,
        "type": "活动成功",
        "valueChannel": "1,3",
        "values": {
          "storeActivityId": "",
          "fillActivityValue": "选了5个活动"
        }
      }]
      /*"conditions": [{
       "campaignTime": {
       "operator": "介于",
       "type": "absolutely",
       "value": "2014-11-11 11:00:00,2014-11-11 12:00:00"
       },
       "excludedActivities": {
       "storeActivityId": "",
       "fillActivityValue": "选了5个活动",
       "isExcept": true
       },
       "choice": "tcommunicateSMS,tcommunicateEDM,tdiscountEC,tdiscountUMP,tcommunicateWechat",
       "joinCount": {
       "operator": "介于",
       "value": "4,8"
       },
       "screenType": "最近一次参与时间",
       "recentJoinTime": {
       "operator": "介于",
       "type": "relatively",
       "direction": "前",
       "interval": "23,2",
       "dimension": "月",
       "day": "08,22",
       "time": "12:00,07:00"
       }
       }]*/
    });
  },
  "getCampaignQueryChannelType": function (req, res) {
    res.send([
      { "code": 0, "name": "不限", "nodeType": "all", "disable": 1 },
      { "code": 1, "name": "短信", "nodeType": "tcommunicateSMS", "disable": 1 },
      { "code": 2, "name": "微信", "nodeType": "tcommunicateWechat", "disable": 1 },
      { "code": 3, "name": "EDM", "nodeType": "tcommunicateEDM", "disable": 1 }
    ]);
  },
  "getOrderQuery": function (req, res) {
    // 打开订单查询
    res.send({
      "id": 456,
      "name": "订单查询",
      "remark": "这是remark",
      "tip": null,
      "type": "custom",
      "subjects": [{
        "id": "淘宝客户",
        "queryitem": 1,
        "segmentationId": 1
      }, {
        "id": "京东客户",
        "queryitem": 50,
        "segmentationId": 100
      }, {
        "id": "拍拍客户",
        "queryitem": 20,
        "segmentationId": 500
      }, {
        "id": '迪卡侬定制',
        "platCode": "edecathlon",
        "queryitem": 20,
        "segmentationId": 2
      }],
      "defaultSubject": '淘宝客户',
      "relation": "AND",
      "groupId": null,
      "groupCategoryId": null,
      "groupName": null,
      "shops": [{
        "id": 273,
        "values": {
          "100571094": "大狗子19890202"
        }
      }],
      "conditions": [{
        "id": 80498,
        "queryItemId": null,
        "type": "行为自定义",
        "values": {
          "relationship": "OR",
          "conditions": [{
            "name": "下单时间",
            "values": "  2016-07-01 13:00~2016-07-15 15:39"
          }, {
            "name": "订单状态",
            "values": "  配送中心已收货"
          }],
          "indexConfig": [{
            "name": "购买金额",
            "values": "大于 222.00"
          }]
        },
        "name": null,
        "showOrder": 1
      }, {
        "id": 80500,
        "queryItemId": 31,
        "type": "未参加",
        "values": {
          "operator": "晚于(不包含)",
          "type": "absolutely",
          "value": "2016-07-01"
        },
        "name": null,
        "showOrder": 2
      }, {
        "id": 80499,
        "queryItemId": 7000,
        "type": "字符输入",
        "values": {
          "value": "test",
          "operator": "等于"
        },
        "name": null,
        "showOrder": 0
      }]
    });
  },
  "getAttrQueryTree": function (req, res) {
    setTimeout(function () {
      res.send(require('./attrNodeTree'));
    }, 30);
  },
  "getAttrQueryZidingyi": function (req, res) {
    setTimeout(function () {
      res.send(require('./attrNodeTree')[1].queryItemRequestNewList);
    }, 30);
  },
  "getAttrQueryQianNiu": function (req, res) {
    res.send([
      {
        id: "queryitem:70400",
        valueId: 70400,
        name: "用法",
        type: "字典选择",
        conditions: [
          {
            attributeId: 8296,
            attributeType: "normal",
            attributeName: "",
            valueShow: "sdgsg",
            value: "100094062",
            orderId: 1
          },
          {
            attributeId: 8298,
            attributeType: "normal",
            attributeName: "",
            valueShow: "sg",
            value: "100094762",
            orderId: 2
          }
        ]
      }
    ]);
  },
  "getAttrQuery": function (req, res) { // 属性查询节点
    res.send({
      id: 456,
      name: "属性查询节点名字1",
      remark: "备注",
      tips: "这个tip就是打开节点之后顶头那个提示",
      type: "custom",
      subjects: [{
        id: "110",
        name: "淘宝客户",
        segmentationId: "10"
      }, {
        id: "111",
        name: "京东客户",
        segmentationId: "11"
      }, {
        id: "112",
        name: "易迅",
        segmentationId: "12"
      }],
      //shops: null,
      shops: [
        {
          id: 24,
          queryItemId: 1,
          attributeKey: null,
          type: "字典多选",
          values: { 100571094: "大狗子19890202", 10066666: "吧啦啦啦" },
          name: null,
          groupConditions: [],
          showOrder: null
        }
      ],
      defaultSubject: "淘宝客户"
    });
  },
  "getQuery": function (req, res) { //查询节点
    res.send({
      id: 31,
      name: "名字",
      remark: "备注",
      tips: "这个tip就是打开节点之后顶头那个提示",
      type: "custom",
      subjectLabel: "平台选择",
      subjects: [{
        id: "110",
        name: "淘宝客户",
        segmentationId: "10"
      }, {
        id: "111",
        name: "京东客户",
        segmentationId: "11"
      }, {
        id: "112",
        name: "易迅",
        segmentationId: "12"
      }],
      defaultSubject: "拍拍客户"
    })
  },
  "getcustomergroupQuery": function (req, res) { //客户分组/分群查询节点
    res.send({
      id: 456,
      name: "选择分组",
      remark: "备注备注",
      tip: "这个tip就是打开节点之后顶头那个提示",
      type: "existingGroup",
      subjectId: "22",
      error: true,
      groupId: 3,
      groupName: "第四分组"

    })
  },
  'getQueryConditionAttribute': function (req, res) {
    var reqId
    if (/campaign/ig.test(req.url)) {
      reqId = /\/node\/query\/campaign\/attribute\/(\d+)?.*/.exec(req.url)[1];
    } else if (/attr\/query/ig.test(req.url)) {
      reqId = /\/node\/attr\/query\/attribute\/(\d+)?.*/.exec(req.url)[1];
    } else {
      reqId = /\/node\/query\/attribute\/(\d+)?.*/.exec(req.url)[1];
    }

    if (130 == reqId) { //数字输入
      res.send({
        "id": reqId,
        "name": "数字输入",
        "type": "数字输入",
        "configs": {
          "NumberInputPrecision": ["2", "5"],
          "NumberInputType": ["Percentage", "Float", "Int"],
          "NumberType": ["等于", "大于", "介于", "大于等于"],
          "NumberInputRange": [null, "3000"]
        }
      });
    } else if (1243 == reqId) { //积分即将到期
      res.send({
        "id": 70006,
        "name": "即将到期积分",
        "type": "即将到期积分",
        "tip": null,
        "configs": {
          "IntegralType": ["大于", "大于等于", "等于", "小于", "小于等于", "不等于", "介于"],
          "DateSupportRelative": ["Support", "NotSupport"],
          "DateType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"]
        }
      });
    } else if (124 == reqId) { //字符输入
      res.send({
        "id": reqId,
        "name": "字符输入",
        "type": "字符输入",
        "configs": {
          "StringLengthLimit": ["8"],
          "StringSpecialValidator": ["Email"],
          "StringType": ["包含", "以字符开头", "不等于", "不包含", "等于", "以字符结尾"]
        }
      });
    } else if (125 == reqId) { //日期选择
      res.send({
        "id": reqId,
        "name": "日期选择",
        "type": "日期选择",
        "configs": {
          "DateSupportRelative": ["Support", "NotSupport"],
          "DateType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"]
        }
      });
    } else if (12000 == reqId) {
      res.send({
        "id": reqId,
        "name": "生日选择",
        "type": "生日选择",
        "configs": {
          "TimeSupportRelative": ["Support", "NotSupport"],
          "DatetimeType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"]
        }
      });
    } else if (126 == reqId) { //时间选择
      res.send({
        "id": reqId,
        "name": "时间选择",
        "type": "时间选择",
        "configs": {
          "TimeSupportRelative": ["Support", "NotSupport"],
          "DatetimeType": ["介于", "晚于", "早于"]
        }
      });
    } else if (127 == reqId) { //字典输入
      res.send({
        "id": reqId,
        "name": "字典选择",
        "type": "字典选择",
        "configs": [{
          "name": "女",
          "id": "1"
        }, {
          "name": "男",
          "id": "2"
        }, {
          "name": "不限",
          "id": "3"
        }, {
          "name": "其他",
          "id": "4"
        }, {
          "name": "中性",
          "id": "5"
        }]
      });
    } else if (128 == reqId) { //关键字输入
      res.send({
        "id": reqId,
        "name": "关键字定制",
        "type": "关键字定制",
        "configs": {
          "TimeSupportRelative": ["Support", "NotSupport"],
          "DatetimeType": ["晚于", "早于", "介于"]
        }
      });
    } else if (129 == reqId) { //地区选择
      res.send({
        "id": reqId,
        "name": "地区选择",
        "type": "地区选择",
        "configs": {
          "TimeSupportRelative": ["Support", "NotSupport"],
          "DatetimeType": ["晚于", "早于", "介于"]
        }
      });
    } else if (1500 == reqId) { // 未参加活动
      res.send({
        "id": reqId,
        "name": "未参加活动",
        "type": "未参加",
        "tip": "1223",
        "configs": {
          "DateSupportRelative": ["Support", "NotSupport"],
          "DateType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"]
        }
      });
    } else if (1502 == reqId) { // 　最后一次参加活动时间
      res.send({
        "id": reqId,
        "name": "最后一次参加活动时间",
        "tip": "我是贺岁",
        "type": "最后参加时间",
        "configs": {
          "DateSupportRelative": ["Support", "NotSupport"],
          "DateType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"]
        }
      });
    } else if (1501 == reqId) { // 参加活动次数
      res.send({
        "id": reqId,
        "name": "参加活动次数",
        "type": "参加次数",
        "tip": "我是贺岁",
        "configs": {
          "DateSupportRelative": ["Support", "NotSupport"],
          "DateType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"],
          "ActivityType": ["大于", "大于等于", "等于", "小于等于", "小于", "介于"]
        }
      });
    } else if (1503 == reqId) { // 营销成功
      res.send({
        "id": reqId,
        "name": "营销成功",
        "type": "活动成功",
        "tip": "我是贺岁",
        "configs": {
          "DateSupportRelative": ["Support", "NotSupport"],
          "DateType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"]
        }
      });
    } else if (19000 == reqId) { // 标签选择
      res.send({
        "id": reqId,
        "name": "标签选择",
        "type": "标签选择",
        "configs": [{
          "name": "荣誉会员",
          "id": "1"
        }, {
          "name": "普通会员",
          "id": "c"
        }, {
          "name": "VIP1",
          "id": "vip1"
        }, {
          "name": "VIP2",
          "id": "vip2"
        }, {
          "name": "VIP3",
          "id": "vip3"
        }, {
          "name": "VIP4",
          "id": "vip4"
        }, {
          "name": "VIP5",
          "id": "vip5"
        }, {
          "name": "VIP6",
          "id": "vip6"
        }]
      });
    } else if (1504 == reqId) { // 外部数据导入
      res.send({
        "id": reqId,
        "name": "外部数据导入",
        "type": "数据导入",
        "configs": {}
      });
    } else if (reqId == 111) {
      res.send({
        id: reqId,
        name: '开卡门店',
        type: '数据选择器类型',
        configs: {}
      });
    } else if (reqId == 222) {
      res.send({
        id: reqId,
        name: '开卡城市',
        type: '数据选择器类型',
        configs: {}
      });
    } else if (reqId == 333) {
      res.send({
        id: reqId,
        name: '开卡大区',
        type: '数据选择器类型',
        configs: {}
      });
    } else if (1203 == reqId) { //字典输入
      res.send({
        "id": reqId,
        "name": "字典选择",
        "type": "字典选择",
        "configs": [{
          "name": "未分级",
          "id": "1"
        }, {
          "name": "一心",
          "id": "2"
        }, {
          "name": "二心",
          "id": "3"
        }, {
          "name": "三心",
          "id": "4"
        }, {
          "name": "四心",
          "id": "5"
        }, {
          "name": "五心",
          "id": "6"
        }, {
          "name": "一钻",
          "id": "7"
        }, {
          "name": "二钻",
          "id": "8"
        }, {
          "name": "三钻",
          "id": "9"
        }, {
          "name": "四钻",
          "id": "10"
        }, {
          "name": "五钻",
          "id": "11"
        }, {
          "name": "一皇冠",
          "id": "12"
        }, {
          "name": "二皇冠",
          "id": "13"
        }, {
          "name": "三皇冠",
          "id": "14"
        }, {
          "name": "四皇冠",
          "id": "15"
        }, {
          "name": "五皇冠",
          "id": "16"
        }, {
          "name": "一金冠",
          "id": "17"
        }, {
          "name": "二金冠",
          "id": "18"
        }, {
          "name": "三金冠",
          "id": "19"
        }, {
          "name": "四金冠",
          "id": "20"
        }, {
          "name": "五金冠",
          "id": "21"
        }]
      });
    }
  },
  "attributeTree": function (req, res) {
    var params = req.body.categoryId,
      responseData;
    if (!params) {
      responseData = [{
        "id": "item:123",
        "name": "基本信息",
        "valueId": 123,
        "pId": "2014",
        "hasChildren": true,
        "isParent": true,
        "orderId": 0
      }, {
        "id": "category:111",
        "valueId": 111,
        "name": "会员等级",
        "pId": "2014",
        "isParent": true,
        "hasChildren": true,
        "hasChild": true,
        "orderId": 0,
        "conditions": []
      },
      {
        "id": "category:115",
        "valueId": 115,
        "name": "RFM模型",
        "hasChildren": true,
        "pId": "2014",
        "isParent": true,
        "orderId": 0
      },

      {
        "id": "category:130",
        "valueId": 130,
        "name": "营销历史",
        "hasChildren": true,
        "pId": "2014",
        "isParent": true,
        "orderId": 0,
        "conditions": [{
          "attributeId": 1,
          "value": "订单查询",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }
      ]
    } else {
      responseData = [{
        "hasChildren": false,
        "id": 1243,
        "isParent": false,
        "name": "即将到期积分",
        "orderId": null,
        "pId": 1243,
        "valueId": 1243,
        "type": "即将到期积分",
        "configs": {
          "IntegralType": ["大于", "大于等于", "等于", "小于", "小于等于", "不等于", "介于"],
          "DateSupportRelative": ["Support", "NotSupport"],
          "DateType": ["晚于(不包含)", "晚于(包含)", "等于", "早于(不包含)", "早于(包含)", "不等于", "介于"]
        }
      }, {
        "id": "item:13000",
        "name": "数字输入",
        "valueId": 130,
        "pId": "item:130",
        "isParent": false,
        "type": "数字输入",
        "conditions": [{
          "attributeId": 1,
          "value": "数字输入",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }, {
        "id": "item:124",
        "name": "字符输入",
        "valueId": 124,
        "pId": "item:123",
        "isParent": false,
        "type": "字符输入",
        "conditions": [{
          "attributeId": 1,
          "value": "字符输入",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }, {
        "id": "item:125",
        "name": "日期选择",
        "pId": "item:123",
        "valueId": 125,
        "isParent": false,
        "type": "日期选择",
        "conditions": [{
          "attributeId": 1,
          "value": "日期选择",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }, {
        "id": "item:126",
        "name": "时间选择",
        "pId": "item:123",
        "valueId": 126,
        "isParent": false,
        "type": "时间选择",
        "conditions": [{
          "attributeId": 1,
          "value": "时间选择",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }, {
        "id": "item:127",
        "name": "字典选择",
        "pId": "item:123",
        "valueId": 127,
        "isParent": false,
        "type": "字典选择",
        "conditions": null
      }, {
        "id": "item:128",
        "name": "关键字定制",
        "pId": "item:123",
        "valueId": 128,
        "isParent": false,
        "type": "关键字定制",
        "conditions": null
      }, {
        "id": "item:129",
        "name": "地区选择",
        "valueId": 129,
        "pId": "item:123",
        "isParent": false,
        "type": "地区选择",
        "conditions": [{
          "attributeId": 1,
          "value": "地区选择",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }, {
        "id": "item:12000",
        "name": "生日选择",
        "valueId": 12000,
        "pId": "item:123",
        "isParent": false,
        "type": "生日选择",
        "conditions": [{
          "attributeId": 1,
          "value": "地区选择",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }, {
        "id": "item:19000",
        "name": "标签选择",
        "valueId": 19000,
        "pId": "item:123",
        "isParent": false,
        "type": "标签选择",
        "conditions": [{
          "attributeId": 1,
          "value": "地区选择",
          "orderId": 1
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2
        }]
      }, {
        "id": "category:112",
        "valueId": 112,
        "name": "订单查询",
        "pId": "category:111",
        "isParent": false,
        "type": "行为自定义",
        "conditions": null
      }, {
        "id": "item:1500",
        "name": "1未参加活动",
        "pId": "category:130",
        "valueId": "1500",
        "isParent": false,
        "type": "未参加",
        "conditions": [{
          "attributeId": 1,
          "value": "未参加活动",
          "orderId": 1,
          "valueShow": "1参加活动次数"
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2,
          "valueShow": "后面"
        }]
      }, {
        "id": "item:1501",
        "name": "1参加活动次数",
        "pId": "category:130",
        "valueId": "1501",
        "isParent": false,
        "type": "参加次数",
        "conditions": [{
          "attributeId": 1,
          "value": "未参加活动",
          "orderId": 1,
          "valueShow": "1参加活动次数"
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2,
          "valueShow": "后面"
        }]
      }, {
        "id": "item:1502",
        "name": "1最后一次参加活动时间",
        "pId": "category:130",
        "valueId": "1502",
        "isParent": false,
        "type": "最后参加时间",
        "conditions": [{
          "attributeId": 1,
          "value": "未参加活动",
          "orderId": 1,
          "valueShow": "1参加活动次数"
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2,
          "valueShow": "后面"
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 3,
          "valueShow": "后后面"
        }]
      }, {
        "id": "item:1503",
        "name": "1营销成功",
        "pId": "category:130",
        "valueId": "1503",
        "isParent": false,
        "type": "活动成功",
        "conditions": [{
          "attributeId": 1,
          "value": "未参加活动",
          "orderId": 1,
          "valueShow": "1参加活动次数"
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2,
          "valueShow": "后面"
        }]
      }, {
        "id": "item:1504",
        "name": "外部数据导入",
        "pId": "category:130",
        "valueId": "1504",
        "isParent": false,
        "type": "数据导入",
        "conditions": [{
          "attributeId": 1,
          "value": "未参加活动",
          "orderId": 1,
          "valueShow": "1参加活动次数"
        }, {
          "attributeId": 2,
          "value": "0",
          "orderId": 2,
          "valueShow": "后面"
        }]
      }]
    }
    res.send(responseData);
  },
  "getQueryChildrenData": function (req, res) {
    res.send([

    ])
  },
  "getGlobalHead": function (req, res) {
    res.send([{
      "id": 1,
      "name": "店铺选择",
      "type": "字典多选",
      "dic": [{
        "name": "大狗子19890202",
        "id": "100571094"
      }, {
        "name": "ben1247",
        "id": "70582239"
      }, {
        "name": "测试店铺3",
        "id": "2"
      }, {
        "name": "测试店铺4",
        "id": "3"
      }, {
        "name": "测试店铺5",
        "id": "5"
      }, {
        "name": "测试店铺6",
        "id": "123456"
      }, {
        "name": "tomwalk",
        "id": "65927470"
      }, {
        "name": "店铺A",
        "id": "20140411001"
      }, {
        "name": "店铺B",
        "id": "20140411002"
      }, {
        "name": "店铺testaaaaaaqwweeeeee",
        "id": "20140512002"
      }]
    }])
  },
  "getAttrConfigConditions": function (req, res) {
    res.send({
      "id": "10008985",
      "relation": "AND",
      "conditions": [{
        "id": 83345,
        "queryItemId": 70002,
        "attributeKey": null,
        "type": "数字输入",
        "values": { "value": "100", "operator": "等于" },
        "name": "",
        "valueShow": "会员卡",
        "groupConditions": [{
          "attributeId": 19100,
          "attributeType": "normal",
          "attributeName": "",
          "value": "2",
          "valueShow": "齐齐哈尔",
          "orderId": 1
        }],
        "showOrder": 0
      },
      {
        "id": 83346,
        "queryItemId": 70000,
        "attributeKey": null,
        "type": "日期选择",
        "values": {
          "operator": "等于",
          "type": "absolutely",
          "value": "2016-08-03"
        },
        "name": "",
        "valueShow": "会员卡",
        "groupConditions": [{ "attributeId": 19100, "attributeType": "normal", "attributeName": "", "value": "2", "valueShow": "齐齐哈尔", "orderId": 1 }], "showOrder": 1
      },
      {
        "id": 83351,
        "queryItemId": 1203,
        "attributeKey": null,
        "type": "字典选择",
        "values": { "value": "2" },
        "name": "",
        "valueShow": "店铺会员等级",
        "groupConditions": [{ "attributeId": 1200, "attributeType": "normal", "attributeName": "", "value": "71677914", "valueShow": "miaomiaozhu0620", "orderId": 1 }],
        "showOrder": 2
      }
      ],
      "details":
        {
          "1203":
            {
              "id": 1203, "name": "会员等级", "type": "字典选择", "tip": null,
              /* "configs":[{"name":"店铺客户","id":"0"},{"name":"普通会员","id":"1"},{"name":"高级会员","id":"2"},{"name":"VIP会员","id":"3"},{"name":"至尊VIP会员","id":"4"}]*/
              "configs": [{
                "name": "荣誉会员",
                "id": "1"
              }, {
                "name": "普通会员",
                "id": "2"
              }, {
                "name": "VIP1",
                "id": "3"
              }, {
                "name": "VIP2",
                "id": "4"
              }, {
                "name": "VIP3",
                "id": "5"
              }, {
                "name": "VIP4",
                "id": "6"
              }, {
                "name": "VIP5",
                "id": "6"
              }, {
                "name": "VIP6",
                "id": "7"
              }]
            }, "70000": { "id": 70000, "name": "等级生效日期", "type": "日期选择", "tip": null, "configs": { "DateSupportRelative": ["Support"], "DateType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"] } }, "70002": { "id": 70002, "name": "当前积分", "type": "数字输入", "tip": null, "configs": { "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"], "NumberInputPrecision": ["0"], "NumberInputType": ["Int"], "NumberInputRange": ["0", "9999999"] } }
        }
    });
  },
  "getConfigConditions": function (req, res) {
    res.send({
      "id": 31,
      "relation": "OR",
      "isExcept": "true",
      "configs": [{
        "id": "conditionId",
        "queryItemId": 1,
        "type": "字典多选",
        "values": {
          "100571098": "店铺A",
          "100571091": "店铺B",
          "001": "已过期店铺",
          "002": "已过期店铺2"
        }
      }],
      "filters": [{
        "id": 11111,
        "name": "店铺选择",
        "type": "字典多选",
        "dic": [{
          "name": "大狗子19890202",
          "id": "100571094"
        }, {
          "name": "ben1247",
          "id": "70582239"
        }, {
          "name": "测试店铺3",
          "id": "2"
        }, {
          "name": "测试店铺4",
          "id": "3"
        }, {
          "name": "测试店铺5",
          "id": "5"
        }, {
          "name": "测试店铺6",
          "id": "123456"
        }, {
          "name": "tomwalk",
          "id": "65927470"
        }, {
          "name": "店铺A",
          "id": "20140411001"
        }, {
          "name": "店铺B",
          "id": "20140411002"
        }, {
          "name": "店铺testaaaaaaqwweeeeee",
          "id": "20140512002"
        }]
      }],
      "conditions": [
        /* {
         "id": 1,
         "queryItemId": 200,
         "type": "数字输入",
         "values": {
         "operator": "介于",
         "value": "20,30",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "数字输入",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 2,
         "queryItemId": 200,
         "type": "数字输入",
         "values": {
         "operator": "大于",
         "value": "40",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "数字输入",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 3,
         "queryItemId": 100,
         "type": "字符输入",
         "values": {
         "operator": "不等于",
         "value": "13623232626",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "字符输入",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 4,
         "queryItemId": 400,
         "type": "日期选择",
         "values":{
         "type":"absolutely",
         "operator":"等于",
         "value":"2013-12-12",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "日期选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 4,
         "queryItemId": 400,
         "type": "日期选择",
         "values":{
         "type":"absolutely",
         "operator":"介于",
         "value":"2013-12-12,2013-12-13",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "日期选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 5,
         "queryItemId": 400,
         "type": "日期选择",
         "values": {
         "type":"relatively", "operator":"等于", "interval":"3", "dimension":"月", "day": 3,
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "日期选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 6,
         "queryItemId": 400,
         "type": "日期选择",
         "values": {
         "type":"relatively", "operator":"早于(不包含)","interval":"3", "dimension":"天",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "日期选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 7,
         "queryItemId": 400,
         "type": "日期选择",
         "values": {
         "type":"relatively", "operator":"介于","interval": "2, 3", "dimension":"月", "day": "3, 2",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "日期选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 8,
         "queryItemId": 400,
         "type": "日期选择",
         "values": {
         "type":"relatively", "operator":"介于", "interval": "2,3", "dimension":"天",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "日期选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 9,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"absolutely", "operator":"晚于", "value":"2013-12-12 20:15:15",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 10,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"absolutely", "operator":"早于", "value":"2013-12-12 15:15:15, 2013-12-12 20:15:15",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 11,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"relatively", "operator":"晚于", "interval":"3", "dimension":"月", "day": "3", "time": "11:11:11",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 111,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"absolutely", "operator":"介于", "value":"2014-02-07 07:00:00,2014-02-20 10:00:00",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 12,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"relatively", "operator":"晚于","interval":"3", "dimension":"天", "time": "11:11:11",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 13,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"relatively", "operator":"晚于","interval":"3", "dimension":"分钟",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 14,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"relatively", "operator":"介于","interval":"3, 2", "dimension":"月", "day": "3, 2", "time": "11:11:11, 22:22:22",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 15,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"relatively", "operator":"介于", "interval":"3, 2", "dimension":"天", "time": "11:11:11, 22:22:22",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 16,
         "queryItemId": 500,
         "type": "时间选择",
         "values": {
         "type":"relatively", "operator":"介于", "interval":"3, 2", "dimension":"分钟",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "时间选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 17,
         "queryItemId": 600,
         "type": "字典选择",
         "values": {
         "value":"1,2,3",
         "groupConditions": [
         {
         "attributeId": 1,
         "value": "字典选择",
         "orderId": 1
         },
         {
         "attributeId": 2,
         "value": "0",
         "orderId": 2
         }
         ]
         }
         },
         {
         "id": 19,
         "queryItemId": 800,
         "type": "地区选择",
         "values":[
         {
         "id":"1",
         "name":"江浙沪",
         "status":"part"
         },
         {
         "id":"1,101",
         "name":"江浙沪,上海",
         "status":"part,full"
         },
         {
         "id":"1,102",
         "name":"江浙沪,浙江",
         "status":"part,part"
         }
         ]
         },*/
        {
          "id": 18,
          "queryItemId": 700,
          "type": "关键字定制",
          "values": {
            "relation": "OR",
            "value": "aaa,bbb,ccc",
            "groupConditions": [{
              "attributeId": 1,
              "value": "关键字定制",
              "orderId": 1
            }, {
              "attributeId": 2,
              "value": "0",
              "orderId": 2
            }]
          }
        }, {
          "id": 22,
          "queryItemId": 900,
          "type": "行为自定义",
          "name": "行为自定义",
          "values": {
            "conditions": [{
              "name": "下单时间",
              "values": "2014-01-01,2014-02-03"
            }, {
              "name": "订单力来源",
              "values": "<b>sa"
            }, {
              "name": "单笔订单金额",
              "values": "sa>"
            }, {
              "name": "订单状态",
              "values": "<img class='imgBanner' src='../../images/redBanner.png' />"
            }],
            "indexConfig": [{
              "name": "购买总次数",
              "values": "不限"
            }, {
              "name": "购买总金额",
              "values": "1000,2000"
            }],
            "relationship": "AND",
            "groupConditions": [{
              "attributeId": 1,
              "value": "行为自定义",
              "orderId": 1
            }, {
              "attributeId": 2,
              "value": "0",
              "orderId": 2
            }]
          }
        }, {
          "id": 19,
          "queryItemId": 800,
          "type": "地区选择",
          "values": {
            "id": "1|1,101|1,102",
            "value": "江浙沪|江浙沪,上海|江浙沪,浙江",
            "status": "part|part,full|part,part"
          }
        }, {
          "id": 4,
          "queryItemId": 1100,
          "type": "未参加",
          "groupConditions": [{
            "attributeId": 1,
            "value": "日期选择",
            "orderId": 1,
            "valueShow": "1参加活动次数"
          }, {
            "attributeId": 2,
            "value": "0",
            "orderId": 2,
            "valueShow": "后面"
          }],
          "values": {
            "type": "absolutely",
            "operator": "介于",
            "value": "2013-12-12,2013-12-13"
          }
        }, {
          "id": 4,
          "queryItemId": 1000,
          "type": "最后参加时间",
          "groupConditions": [{
            "attributeId": 1,
            "value": "日期选择",
            "orderId": 1,
            "valueShow": "前面"
          }, {
            "attributeId": 2,
            "value": "0",
            "orderId": 2,
            "valueShow": "后面"
          }],
          "values": {
            "type": "absolutely",
            "operator": "介于",
            "value": "2013-12-12,2013-12-13"
          }
        }, {
          "id": 4,
          "queryItemId": 1200,
          "type": "参加次数",
          "groupConditions": [{
            "attributeId": 1,
            "value": "日期选择",
            "orderId": 1,
            "valueShow": "前面"
          }, {
            "attributeId": 2,
            "value": "0",
            "orderId": 2,
            "valueShow": "后面"
          }],
          "values": {
            "type": "absolutely",
            "operator": "介于",
            "value": "2013-12-12,2013-12-13",
            "activityOperator": "小于",
            "activityValue": "12",
            "storeActivityId": 12345,
            "fillActivityValue": "已经选1个活动,1个节点"
          }
        },/*add*/
        {
          "id": 4,
          "queryItemId": 1200,
          "type": "参加次数",
          "groupConditions": [{
            "attributeId": 1,
            "value": "日期选择",
            "orderId": 1,
            "valueShow": "前面1"
          }, {
            "attributeId": 2,
            "value": "0",
            "orderId": 2,
            "valueShow": "后面1"
          }],
          "values": {
            "type": "relatively",
            "operator": "介于",
            "dimension": "天",
            "interval": "2,13",
            "activityOperator": "小于",
            "activityValue": "12",
            "storeActivityId": 12345,
            "fillActivityValue": "已经选1个活动,1个节点"
          }
        }, {
          "id": 4,
          "queryItemId": 1300,
          "type": "活动成功",
          "groupConditions": [{
            "attributeId": 1,
            "value": "日期选择",
            "orderId": 1,
            "valueShow": "前面"
          }, {
            "attributeId": 2,
            "value": "0",
            "orderId": 2,
            "valueShow": "后面"
          }],
          "values": {
            "type": "absolutely",
            "operator": "介于",
            "value": "2013-12-12,2013-12-13",
            "storeActivityId": 12345,
            "fillActivityValue": "已经选1个活动"
          }
        }, {
          "id": 600,
          "queryItemId": 88000,
          "type": "标签选择",
          "name": "标签选择",
          "values": {
            "value": "1,vip1,vip2"
          }
        }, {
          "id": 600,
          "queryItemId": 88800,
          "type": "数据导入",
          "name": "数据导入",
          "values": {
            "value": [123, 2, 3]
          }
        }
      ],
      "details": {
        "100": {
          "id": 100,
          "name": "默认-字符手机",
          "type": "字符输入",
          "configs": {
            "StringType": [
              "等于",
              "不等于"
            ],
            "StringLengthLimit": [
              "11"
            ],
            "StringSpecialValidator": [
              "Mobile"
            ]
          }
        },
        "200": {
          "id": 200,
          "name": "默认-数字",
          "type": "数字输入",
          "configs": {
            "NumberType": [
              "等于",
              "大于",
              "介于",
              "大于等于"
            ],
            "NumberInputType": [
              "Percentage",
              "Float",
              "Int"
            ],
            "NumberInputPrecision": [
              "1",
              "2"
            ]
          }
        },
        "400": {
          "id": 400,
          "name": "日期选择",
          "type": "日期选择",
          "configs": {
            "DateType": [
              "晚于(不包含)",
              "晚于(包含)",
              "等于",
              "早于(不包含)",
              "早于(包含)",
              "不等于",
              "介于"
            ],
            "DateSupportRelative": [
              "Support"
            ]
          }
        },
        "500": {
          "id": 500,
          "name": "时间选择",
          "type": "时间选择",
          "configs": {
            "DatetimeType": [
              "晚于",
              "早于",
              "介于"
            ],
            "TimeSupportRelative": [
              "Support"
            ]
          }
        },
        "600": {
          "id": "127",
          "name": "字典选择",
          "type": "字典选择",
          "configs": [{
            "name": "女",
            "id": "1"
          }, {
            "name": "男",
            "id": "2"
          }, {
            "name": "不限",
            "id": "3"
          }, {
            "name": "其他",
            "id": "4"
          }, {
            "name": "中性",
            "id": "5"
          }]
        },
        "700": {
          "id": "128",
          "name": "关键字定制",
          "type": "关键字定制",
          "configs": {}
        },
        "800": {
          "id": "129",
          "name": "地区选择",
          "type": "地区选择",
          "configs": {}
        },
        "1000": {
          "id": 400,
          "name": "最后一次参加活动时间",
          "type": "最后参加时间",
          "tip": "就是这样的吧",
          "configs": {
            "DateType": [
              "晚于(不包含)",
              "晚于(包含)",
              "等于",
              "早于(不包含)",
              "早于(包含)",
              "不等于",
              "介于"
            ],
            "DateSupportRelative": [
              "Support"
            ]
          }
        },
        "1100": {
          "id": 400,
          "name": "未参加活动",
          "type": "未参加",
          "tip": "就是这样的吧",
          "configs": {
            "DateType": [
              "晚于(不包含)",
              "晚于(包含)",
              "等于",
              "早于(不包含)",
              "早于(包含)",
              "不等于",
              "介于"
            ],
            "DateSupportRelative": [
              "Support"
            ]
          }
        },
        "1200": {
          "id": 400,
          "name": "参加活动次数",
          "type": "参加次数",
          "tip": "就是这样的吧",
          "configs": {
            "DateType": [
              "晚于(不包含)",
              "晚于(包含)",
              "等于",
              "早于(不包含)",
              "早于(包含)",
              "不等于",
              "介于"
            ],
            "DateSupportRelative": [
              "Support"
            ],
            "ActivityType": [
              "大于",
              "大于等于",
              "等于",
              "小于等于",
              "小于",
              "介于"
            ]
          }
        },
        "1300": {
          "id": 400,
          "name": "营销成功",
          "type": "活动成功",
          "tip": "就是这样的吧",
          "configs": {
            "DateType": [
              "晚于(不包含)",
              "晚于(包含)",
              "等于",
              "早于(不包含)",
              "早于(包含)",
              "不等于",
              "介于"
            ],
            "DateSupportRelative": [
              "Support"
            ]
          }
        },
        "88000": {
          "id": "127",
          "name": "标签选择",
          "type": "标签选择",
          "configs": [{
            "name": "荣誉会员",
            "id": "1"
          }, {
            "name": "普通会员",
            "id": "c"
          }, {
            "name": "VIP1",
            "id": "vip1"
          }, {
            "name": "VIP2",
            "id": "vip2"
          }, {
            "name": "VIP3",
            "id": "vip3"
          }, {
            "name": "VIP4",
            "id": "vip4"
          }, {
            "name": "VIP5",
            "id": "vip5"
          }, {
            "name": "VIP6",
            "id": "vip6"
          }]
        },
        "88800": {
          "id": "127",
          "name": "数据导入",
          "type": "数据导入",
          "configs": []
        }
      }
    })
  },
  "postConfigConditions": function (req, res) {
    res.send({
      id: 31,
      relation: "OR",
      isExcept: "false",
      name: req.body.name,
      shops: [{
        "id": 123,
        "name": "店铺A"
      }, {
        "id": 124,
        "name": "店铺B"
      }],
      conditions: [{
        id: "conditionId",
        title: "",
        type: "",
        name: "",
        operator: "",
        values: []
      }]
    })
  },
  "postcgqConfigConditions": function (req, res) {//客户分组查询节点保存
    res.send({
      id: 456,
      name: req.body.name,
      remark: "备注备注",
      conditions: [{
        id: "conditionId",
        title: "",
        type: "",
        name: "",
        values: []
      }]
    })
  },
  /*订单查询数据模拟start*/
  "getCustomConditions": function (req, res) {
    res.send({
      "behaviorId": 1,
      "behaviorName": "订单查询",
      "configId": null,
      "nodeId": null,
      "defaultIndex": 2903,
      "globle": null,
      "attribute": [{
        "id": 2003,
        "queryItemId": 2003,
        "name": "下单时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 1,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2009,
        "queryItemId": 2009,
        "name": "付款时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 2,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2012,
        "queryItemId": 2012,
        "name": "发货时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 3,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2004,
        "queryItemId": 2004,
        "name": "结束时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 4,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2207,
        "queryItemId": 2207,
        "name": "评价结果",
        "type": "字典单选1",
        "posX": 2,
        "posY": 8,
        "configs": [{
          "name": "差评",
          "pId": null,
          "id": "bad",
          "open": "true"
        }, {
          "name": "好评",
          "pId": null,
          "id": "good",
          "open": "true"
        }, {
          "name": "中评",
          "pId": null,
          "id": "neutral",
          "open": "true"
        }],
        "values": null,
        "tips": "只有评价生效了，才可以查询评价结果。评价生效条件:买、卖双方互为评价 或 超过15天有效评价时间，评价自动生效。"
      }, {
        "id": 3963,
        "queryItemId": 3963,
        "name": "评价字数",
        "type": "数字输入",
        "posX": 2,
        "posY": 6,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "1000"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": "只有评价生效了，才可以查询评价字数。评价生效条件:买、卖双方互为评价 或 超过15天有效评价时间，评价自动生效。"
      }, {
        "id": 2212,
        "queryItemId": 2212,
        "name": "评价内容",
        "type": "关键字定制",
        "posX": 2,
        "posY": 7,
        "configs": {},
        "values": null,
        "tips": "只有评价生效了，才可以查询评价内容。评价生效条件:买、卖双方互为评价 或 超过15天有效评价时间，评价自动生效。"
      }, {
        "id": 2307,
        "queryItemId": 2307,
        "name": "退款时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 11,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2310,
        "queryItemId": 2310,
        "name": "退款状态",
        "type": "树形多选",
        "posX": 0,
        "posY": 12,
        "configs": [{
          "name": "退款关闭",
          "pId": null,
          "id": "CLOSED",
          "open": "true"
        }, {
          "name": "卖家拒绝退款",
          "pId": null,
          "id": "SELLER_REFUSE_BUYER",
          "open": "true"
        }, {
          "name": "退款成功",
          "pId": null,
          "id": "SUCCESS",
          "open": "true"
        }, {
          "name": "卖家已经同意退款，等待买家退货",
          "pId": null,
          "id": "WAIT_BUYER_RETURN_GOODS",
          "open": "true"
        }, {
          "name": "买家已经申请退款，等待卖家同意",
          "pId": null,
          "id": "WAIT_SELLER_AGREE",
          "open": "true"
        }, {
          "name": "买家已经退货，等待卖家确认收货",
          "pId": null,
          "id": "WAIT_SELLER_CONFIRM_GOODS",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2313,
        "queryItemId": 2313,
        "name": "单笔订单退款金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 13,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2315,
        "queryItemId": 2315,
        "name": "退款原因",
        "type": "字符输入",
        "posX": 0,
        "posY": 14,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["50"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2121,
        "queryItemId": 2121,
        "name": "商品成交时名称",
        "type": "关键字定制",
        "posX": 2,
        "posY": 3,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["255"]
        },
        "values": null,
        "tips": "根据商品成交时的标题来筛选客人，而不是根据商品当前的标题来筛选客人;可以输入多个关键字，用空格隔开，例如“聚划算 促销”"
      }, {
        "id": 2131,
        "queryItemId": 2131,
        "name": "SKU名称",
        "type": "关键字定制",
        "posX": 2,
        "posY": 4,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["2000"]
        },
        "values": null,
        "tips": "输入成交时的SKU名称来筛选购买了这些SKU的客人。可以输入多个关键字，用空格隔开，例如“红色 大码”，多个关键字之间为或者关系。也可以在前面加入 “:” 或者填写更完整的名称，例如“:XL”或者“尺码:XL”，便于更加精确的查找。"
      }, {
        "id": 2016,
        "queryItemId": 2016,
        "name": "单笔订单实付金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 6,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2040,
        "queryItemId": 2040,
        "name": "单笔订单商品数量",
        "type": "数字输入",
        "posX": 0,
        "posY": 7,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2011,
        "queryItemId": 2011,
        "name": "单笔订单邮费",
        "type": "数字输入",
        "posX": 0,
        "posY": 8,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2402,
        "queryItemId": 2402,
        "name": "订单参与优惠名称",
        "type": "字符输入",
        "posX": 0,
        "posY": 9,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["50"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2135,
        "queryItemId": 2135,
        "name": "子订单运单号",
        "type": "字符输入",
        "posX": 1,
        "posY": 11,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["50"]
        },
        "values": null,
        "tips": "仅支持查询30天内数据"
      }, {
        "id": 2134,
        "queryItemId": 2134,
        "name": "子订单快递公司",
        "type": "字符输入",
        "posX": 1,
        "posY": 12,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["200"]
        },
        "values": null,
        "tips": "仅支持查询30天内数据"
      }, {
        "id": 2008,
        "queryItemId": 2008,
        "name": "订单类型",
        "type": "字典单选2",
        "posX": 1,
        "posY": 1,
        "configs": [{
          "name": "拍卖",
          "pId": null,
          "id": "auction",
          "open": "true"
        }, {
          "name": "自动发货",
          "pId": null,
          "id": "auto_delivery",
          "open": "true"
        }, {
          "name": "货到付款",
          "pId": null,
          "id": "cod",
          "open": "true"
        }, {
          "name": "直冲",
          "pId": null,
          "id": "ec",
          "open": "true"
        }, {
          "name": "统一外部交易",
          "pId": null,
          "id": "external_trade",
          "open": "true"
        }, {
          "name": "分销",
          "pId": null,
          "id": "fenxiao",
          "open": "true"
        }, {
          "name": "一口价",
          "pId": null,
          "id": "fixed",
          "open": "true"
        }, {
          "name": "游戏装备",
          "pId": null,
          "id": "game_equipment",
          "open": "true"
        }, {
          "name": "一口价、拍卖",
          "pId": null,
          "id": "guarantee_trade",
          "open": "true"
        }, {
          "name": "旺店标准版交易",
          "pId": null,
          "id": "independent_shop_trade",
          "open": "true"
        }, {
          "name": "旺店入门版交易",
          "pId": null,
          "id": "independent_simple_trade",
          "open": "true"
        }, {
          "name": "万网交易",
          "pId": null,
          "id": "netcn_trade",
          "open": "true"
        }, {
          "name": "ShopEX交易",
          "pId": null,
          "id": "shopex_trade",
          "open": "true"
        }, {
          "name": "万人团",
          "pId": null,
          "id": "step",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2005,
        "queryItemId": 2005,
        "name": "主订单状态",
        "type": "树形多选",
        "posX": 1,
        "posY": 2,
        "configs": [{
          "name": "等待买家付款",
          "pId": null,
          "id": "WAIT_BUYER_PAY",
          "open": "true"
        }, {
          "name": "等待卖家发货,即:买家已付款",
          "pId": null,
          "id": "WAIT_SELLER_SEND_GOODS",
          "open": "true"
        }, {
          "name": "卖家部分发货",
          "pId": null,
          "id": "SELLER_CONSIGNED_PART",
          "open": "true"
        }, {
          "name": "等待买家确认收货,即:卖家已发货",
          "pId": null,
          "id": "WAIT_BUYER_CONFIRM_GOODS",
          "open": "true"
        }, {
          "name": "买家已签收,货到付款专用",
          "pId": null,
          "id": "TRADE_BUYER_SIGNED",
          "open": "true"
        }, {
          "name": "交易成功",
          "pId": null,
          "id": "TRADE_FINISHED",
          "open": "true"
        }, {
          "name": "付款以前，卖家或买家主动关闭交易",
          "pId": null,
          "id": "TRADE_CLOSED_BY_TAOBAO",
          "open": "true"
        }, {
          "name": "付款以后用户退款成功，交易自动关闭",
          "pId": null,
          "id": "TRADE_CLOSED",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2108,
        "queryItemId": 2108,
        "name": "子订单状态",
        "type": "树形多选",
        "posX": 1,
        "posY": 3,
        "configs": [{
          "name": "等待买家付款",
          "pId": null,
          "id": "WAIT_BUYER_PAY",
          "open": "true"
        }, {
          "name": "等待卖家发货,即:买家已付款",
          "pId": null,
          "id": "WAIT_SELLER_SEND_GOODS",
          "open": "true"
        }, {
          "name": "卖家部分发货",
          "pId": null,
          "id": "SELLER_CONSIGNED_PART",
          "open": "true"
        }, {
          "name": "等待买家确认收货,即:卖家已发货",
          "pId": null,
          "id": "WAIT_BUYER_CONFIRM_GOODS",
          "open": "true"
        }, {
          "name": "买家已签收,货到付款专用",
          "pId": null,
          "id": "TRADE_BUYER_SIGNED",
          "open": "true"
        }, {
          "name": "交易成功",
          "pId": null,
          "id": "TRADE_FINISHED",
          "open": "true"
        }, {
          "name": "付款以前，卖家或买家主动关闭交易",
          "pId": null,
          "id": "TRADE_CLOSED_BY_TAOBAO",
          "open": "true"
        }, {
          "name": "付款以后用户退款成功，交易自动关闭",
          "pId": null,
          "id": "TRADE_CLOSED",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2006,
        "queryItemId": 2006,
        "name": "分期付款订单状态",
        "type": "字典单选2",
        "posX": 1,
        "posY": 4,
        "configs": [{
          "name": "未付订金",
          "pId": null,
          "id": "FRONT_NOPAID_FINAL_NOPAID",
          "open": "true"
        }, {
          "name": "已付订金未付尾款",
          "pId": null,
          "id": "FRONT_PAID_FINAL_NOPAID",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2044,
        "queryItemId": 2044,
        "name": "订单备注旗帜",
        "type": "字典单选1",
        "posX": 1,
        "posY": 6,
        "configs": [{
          "name": "<img class='imgBanner' src='../../images/redBanner.png' />",
          "pId": null,
          "id": "1",
          "open": "true"
        }, {
          "name": "<img class='imgBanner' src='../../images/yellowBanner.png' />",
          "pId": null,
          "id": "2",
          "open": "true"
        }, {
          "name": "<img class='imgBanner' src='../../images/greenBanner.png' />",
          "pId": null,
          "id": "3",
          "open": "true"
        }, {
          "name": "<img class='imgBanner' src='../../images/blueBanner.png' />",
          "pId": null,
          "id": "4",
          "open": "true"
        }, {
          "name": "<img class='imgBanner' src='../../images/purpleBanner.png' />",
          "pId": null,
          "id": "5",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2043,
        "queryItemId": 2043,
        "name": "订单备注内容",
        "type": "字符输入",
        "posX": 1,
        "posY": 7,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["1000"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2042,
        "queryItemId": 2042,
        "name": "买家留言",
        "type": "字符输入",
        "posX": 1,
        "posY": 8,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["1000"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2007,
        "queryItemId": 2007,
        "name": "交易来源",
        "type": "树形多选",
        "posX": 2,
        "posY": 1,
        "configs": [{
          "name": "嗨淘",
          "pId": null,
          "id": "HITAO",
          "open": "true"
        }, {
          "name": "聚划算",
          "pId": null,
          "id": "JHS",
          "open": "true"
        }, {
          "name": "普通淘宝",
          "pId": null,
          "id": "TAOBAO",
          "open": "true"
        }, {
          "name": "TOP平台",
          "pId": null,
          "id": "TOP",
          "open": "true"
        }, {
          "name": "手机",
          "pId": null,
          "id": "WAP",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2111,
        "queryItemId": 2111,
        "name": "购买商品",
        "type": "商品选择",
        "posX": 2,
        "posY": 2,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["50"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2007,
        "queryItemId": 2007,
        "name": "交易来源",
        "type": "树形多选",
        "posX": 2,
        "posY": 1,
        "configs": [{
          "name": "嗨淘",
          "pId": null,
          "id": "HITAO",
          "open": "true"
        }, {
          "name": "聚划算",
          "pId": null,
          "id": "JHS",
          "open": "true"
        }, {
          "name": "普通淘宝",
          "pId": null,
          "id": "TAOBAO",
          "open": "true"
        }, {
          "name": "TOP平台",
          "pId": null,
          "id": "TOP",
          "open": "true"
        }, {
          "name": "手机",
          "pId": null,
          "id": "WAP",
          "open": "true"
        }],
        "values": null,
        "tips": null
      }, {
        "id": 2111,
        "queryItemId": 2111,
        "name": "购买商品",
        "type": "商品选择",
        "posX": 2,
        "posY": 2,
        "configs": {
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"],
          "StringLengthLimit": ["50"]
        },
        "values": null,
        "tips": null
      },
      { "id": 890003, "queryItemId": 890003, "name": "销售门店", "type": "数据选择器类型", "posX": 0, "posY": 10, "configs": {}, "values": null, "tips": null, "showOrder": null },
      { "id": 890004, "queryItemId": 890004, "name": "销售大区", "type": "数据选择器类型", "posX": 1, "posY": 10, "configs": {}, "values": null, "tips": null, "showOrder": null },
      { "id": 890005, "queryItemId": 890005, "name": "销售城市", "type": "数据选择器类型", "posX": 2, "posY": 10, "configs": {}, "values": null, "tips": null, "showOrder": null },
      { "id": 890006, "queryItemId": 890006, "name": "Event Store", "type": "数据选择器类型", "posX": 0, "posY": 5, "configs": {}, "values": null, "tips": null, "showOrder": null },
      { "id": 890007, "queryItemId": 890007, "name": "Event Store Zone", "type": "数据选择器类型", "posX": 1, "posY": 5, "configs": {}, "values": null, "tips": null, "showOrder": null },
      { "id": 890008, "queryItemId": 890008, "name": "Event Store Region", "type": "数据选择器类型", "posX": 2, "posY": 5, "configs": {}, "values": null, "tips": null, "showOrder": null },
      {
        "id": 2003,
        "queryItemId": 2003,
        "name": "日期选择",
        "type": "日期选择",
        "posX": 1,
        "posY": 13,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }
      ],
      "indexRelation": "AND|OR",
      "index": [{
        "id": 2901,
        "queryItemId": 2901,
        "name": "购买次数",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2902,
        "queryItemId": 2902,
        "name": "购买订单数",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2903,
        "queryItemId": 2903,
        "name": "购买金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": {
          "value": "0.00",
          "operator": "大于"
        },
        "tips": null
      }, {
        "id": 2904,
        "queryItemId": 2904,
        "name": "购买件数",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2905,
        "queryItemId": 2905,
        "name": "退款次数",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2906,
        "queryItemId": 2906,
        "name": "退款金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2907,
        "queryItemId": 2907,
        "name": "最后一次购买时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 0,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2909,
        "queryItemId": 2909,
        "name": "最后一次购买间隔",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2910,
        "queryItemId": 2910,
        "name": "第一次购买时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 0,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2912,
        "queryItemId": 2912,
        "name": "第一次购买间隔",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2913,
        "queryItemId": 2913,
        "name": "平均每次购买金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2914,
        "queryItemId": 2914,
        "name": "平均每次购买件数",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2915,
        "queryItemId": 2915,
        "name": "平均每次购买间隔",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2916,
        "queryItemId": 2916,
        "name": "平均发货到确认收货间隔",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"],
          "NumberInputPrecision": ["0"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2917,
        "queryItemId": 2917,
        "name": "最大单笔订单购买金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2918,
        "queryItemId": 2918,
        "name": "订单级优惠费用",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }, {
        "id": 2919,
        "queryItemId": 2919,
        "name": "商品级优惠费用",
        "type": "数字输入",
        "posX": 0,
        "posY": 0,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"],
          "NumberInputPrecision": ["2"]
        },
        "values": null,
        "tips": null
      }],
      "configs": [],
      "subjectId": null,
      "conditions": null,
      "indexConfig": null
    })
  },
  "postCustomConditions": function (req, res) {
    res.send({
      "id": "10002725",
      "name": "自定义查询",
      "queryItemId": "130",
      "type": "行为自定义",
      "values": {
        "conditions": [{
          "name": "下单时间",
          "values": "2014-01-01,2014-02-03"
        }, {
          "name": "订单力来源",
          "values": "聚划算"
        }, {
          "name": "单笔订单金额",
          "values": "100,200"
        }, {
          "name": "订单状态",
          "values": "<img class='imgBanner' src='/app/images/redBanner.png' />"
        }],
        "indexConfig": [{
          "name": "购买总次数",
          "values": "不限"
        }, {
          "name": "购买总金额",
          "values": "1000,2000"
        }],
        "relationship": "OR"
      }
    });
  },
  "editorCustomConditions": function (req, res) {
    res.send({
      "globle": ["绝对时间", "相对时间"],
      "attribute": [{

        id: 1,
        name: "字符left",
        type: "字符输入",
        posX: 0,
        posY: 1,
        configs: {
          "StringLengthLimit": ["1000"],
          "StringSpecialValidator": ["Email"],
          "StringType": ["等于", "不等于", "包含"]
        },
        values: {
          value: 1111
        }
      }, {
        id: 2,
        name: "时间选择",
        type: "时间选择",
        posX: 0,
        posY: 3,
        values: {
          "type": "relatively",
          "interval": "3, 2",
          "dimension": "月",
          "day": "3, 2",
          "time": "11:11:11, 22:22:22"
        }
      }, {
        id: 3,
        name: "字典单选1",
        type: "字典单选1",
        posX: 0,
        posY: 5,
        configs: [{
          "name": "<img class='imgBanner' src='/app/images/redBanner.png' />",
          "id": "0"
        }, {
          "name": "<img class='imgBanner' src='/app/images/purpleBanner.png' />",
          "id": 12
        }, {
          "name": "<img class='imgBanner' src='/app/images/yellowBanner.png' />",
          "id": 13
        }, {
          "name": "<img class='imgBanner' src='/app/images/greenBanner.png' />",
          "id": 14
        }, {
          "name": "<img class='imgBanner' src='/app/images/blueBanner.png' />",
          "id": 15
        }],
        values: {
          value: "0"
        }
      }, {
        id: 101,
        name: "数字输入",
        type: "数字输入",
        posX: 0,
        posY: 4,
        configs: {
          "NumberInputPrecision": [
            "2"
          ],
          "NumberInputType": [
            "Float"
          ],
          "NumberType": [
            "等于",
            "大于",
            "介于",
            "大于等于"
          ],
          "NumberInputRange": [
            "0",
            "300"
          ]
        },
        "values": {
          "operator": "介于",
          "value": "20,30"
        }
      }, {
        id: 4,
        name: "字典单选2",
        type: "字典单选2",
        posX: 1,
        posY: 3,
        configs: [{
          "name": "女",
          "id": 1
        }, {
          "name": "男",
          "id": 2
        }],
        values: {
          value: 2
        }

      }, {
        id: 44,
        name: "关键字定制",
        type: "关键字定制",
        posX: 1,
        posY: 1,
        configs: [],
        values: {
          "relation": "OR",
          "value": "aaa,bbb,ccc"
        }
      }, {
        id: 45,
        name: "地区选择",
        type: "地区选择",
        posX: 1,
        posY: 2,
        configs: [],
        values: {
          value: []
        }
      }, {
        id: 46,
        name: "标签选择",
        type: "标签选择",
        posX: 1,
        posY: 4,
        configs: [],
        values: {
          "ids": "1,2",
          "value": "大狗子19890202,测试店铺2"
        }
      }, {
        id: 4699,
        name: "商品选择",
        type: "商品选择",
        posX: 1,
        posY: 5,
        configs: [],
        values: {
          "fillProductValue": "已选择1个商品",
          "storeProductId": "33"
        }
      }],
      "indexRelation": "AND",
      "defaultIndex": 12,
      "index": [{
        "id": 11,
        "name": "数字输入选项1",
        "type": "数字输入",
        "configs": {
          "NumberInputPrecision": [
            "0"
          ],
          "NumberInputType": [
            "Int"
          ],
          "NumberType": [
            "等于",
            "大于",
            "介于",
            "大于等于"
          ],
          "NumberInputRange": [
            "0",
            "1000"
          ]
        }
      }, {
        "id": 12,
        "name": "数字输入选项2",
        "type": "数字输入",
        "configs": {
          "NumberInputPrecision": [
            "2"
          ],
          "NumberInputType": [
            "Float"
          ],
          "NumberType": [
            "等于",
            "大于",
            "介于",
            "大于等于",
            "不等于"
          ],
          "NumberInputRange": [
            "0",
            "100"
          ]
        },
        "values": {
          value: "1",
          operator: "大于"
        }
      }, {
        "id": 13,
        "name": "时间输入1",
        "type": "时间选择",
        "configs": {
          "DatetimeType": [
            "晚于",
            "早于",
            "介于"
          ]
        }
      }, {
        "id": 14,
        "name": "时间输入2",
        "type": "时间选择",
        "configs": {
          "DatetimeType": [
            "晚于",
            "早于",
            "介于",
            "不早不晚"
          ]
        }
      }],
      "configs": [{
        "id": 12,
        "queryItemId": 12,
        "type": "数字输入",
        "name": "数字输入选项2",
        "values": {
          "value": "21.000,21.000",
          "operator": "介于"
        }
      }, {
        "id": 11,
        "queryItemId": 11,
        "type": "数字输入",
        "name": "数字输入选项1",
        "values": {
          "value": "0.21",
          "operator": "等于"
        }
      }, {
        "id": 13,
        "queryItemId": 13,
        "type": "时间输入",
        "name": "时间输入1",
        "values": {
          "operator": "晚于",
          "type": "absolutely",
          "value": "2014-03-20 00:00"
        }
      }, {
        "id": 14,
        "queryItemId": 14,
        "type": "时间输入",
        "name": "时间输入1",
        "values": {
          "operator": "介于",
          "type": "absolutely",
          "value": "2014-03-20 00:00,2014-03-20 01:00"
        }
      }],
      "triggers": [{
        "triggetId": "123",
        "reactId": "234",
        "reactName": "name",
        "hasValue": "enable|disable",
        "noValue": "enable|disable"
      }]
    })
  },
  "behaviorSave": function (req, res) {
    var data = req.body
    var snapshots = []
    if (data.snapshots.length > 0) {
      for (var i in data.snapshots) {
        var temp = {
          id: "123",
          topValue: data.snapshots[i]
        }
        snapshots.push(temp)
      }
    }
    data.snapshots = snapshots
    this.behaviorNode = data


    /*        var data={"id":123,"name":"访问查询","shopId":"323132324","shopName":"323132324",
     "timeType":1,
     "starttime":"2014-12-08 17:14:43",
     "endtime":"2014-12-08 17:14:43",
     "begin":true,
     "end":true,
     "pc":true,
     "wireless":true,
     "favoriteGoods":true,
     "favoriteShops":true,
     "snapshots":[{"id":123,"topValue":2},{"id":123,"topValue":3}]}*/
    res.send(this.behaviorNode)

  },
  "heatSaveNode": function (req, res) {
    var data = req.body
    var grades = []
    if (data.grades.length > 0) {
      for (var i in data.grades) {
        var temp = {
          id: "123",
          grade: data.grades[i]
        }
        grades.push(temp)
      }
    }
    data.grades = grades
    this.heatNode = data
    res.send(data)

  },
  //优惠券响应节点
  "getResponseEC": function (req, res) {
    res.send({
      "id": 1,
      "name": "优惠响应节点234",
      "remark": "我是备注",
      "outputType": 1
    });
  },
  "saveResponseEC": function (req, res) {
    res.send()
  },
  "getResponseEDM": function (req, res) {
    res.send({
      "id": 1,
      "name": "edm响应节点",
      "remark": "我是备注",
      "outputType": 1,
      "urls": [
        "http://baidu.com",
        "http://shuyun.com"
      ]
    })
  },
  "getResponseEDMUrl": function (req, res) {
    res.send([{
      "url": "http://baidu.com"
    }, {
      "url": "http://shuyun.com"
    }])
  },
  "saveResponseEDM": function (req, res) {
    res.send({
      "id": 112,
      "name": "优惠劵响应节点",
      "remark": "备注",
      "outputType": 1,
      "urls": ["http://baidu.com", "http://ceshi.com"]
    })
  },
  /*订单查询数据模拟end*/
  "gateway": function (req, res) { // 短息节点
    res.send([{
      "gatewayId": 1,
      "gatewayName": "亿美软通",
      "signature": "【签名1】",
      "gatewayType": 1,
      "markLength": "3",
      "isDefault": false,
      "balance": 230088.0,
      "quantity": 7000,
      "wordsLimit": "70"
    }, {
      "gatewayId": 2,
      "markLength": "3",
      "gatewayName": "亿美软d通",
      "signature": "【签名2】",
      "isDefault": true,
      "balance": 230088.0,
      "quantity": 46017,
      "wordsLimit": "70",
      "gatewayType": 2
    }]);
  },
  "viewMseeage": function (req, res) {
    res.send({
      "errorContentKey": "",
      "content": [
        "200",
        "【淘宝】【淘宝】11111111{淘宝昵称} {姓名} {生日}发大水发呆发呆发呆发呆发<div></div></div>呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发",
        "呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆",
        "发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆发呆【签名】"
      ]
    });
  },
  "getSmsMessage": function (req, res) { // 短息节点
    if (this.saveSmsMessageContent) {
      var content = this.saveSmsMessageContent
    } else {
      var content = [{
        "type": "text",
        "text": "短信内容《shuyu》<shuyun>"
      }, {
        "id": "7788",
        "text": "姓名",
        "type": "var"
      }, {
        "type": "text",
        "text": "dgf"
      }, {
        "id": "8877",
        "text": "测试",
        "type": "var"
      }, {
        "type": "text",
        "text": "sdfg"
      }]
    }
    res.send({
      "id": 1,
      "signature": null,
      "deliveryTimeSelection": 1,
      "name": "&lt;sad",
      "remark": "备注",
      "gatewayId": 3,
      "gatewayName": '我是通道',
      "blacklist": {
        "customer": [{
          "id": 1002,
          "name": "预置的黑名单分组"
        }],
        "email": [{
          "id": 1008,
          "name": "DDDDDDAAA"
        }],
        "mobile": [{
          "id": 1013,
          "name": "预置的手机分组"
        }]
      },
      "redlist": [{
        'id': 1001,
        'name': '预置的红名单分组'
      }],
      "tips": "sasdhashkdkjs文件第一列数据是客户ID（淘宝昵称）只能导入第一列",
      "signature": null,
      "content": content,
      "testMobile": "13125526996,13125526996"
    });
  },
  "saveSmsMessage": function (req, res) { // 短息节点
    this.saveSmsMessageContent = req.body.content
    res.send({
      "id": 1,
      "name": "短信节点",
      "remark": "备注",
      "gatewayId": 1,
      "content": "短信内容",
      "testMobile": "13125526996,13125526996"
    });
  },
  "getSmsTag": function (req, res) { // 短息标签
    res.send([{
      "attributeId": 7788,
      "tag": "1",
      "name": "淘宝 昵称",
      "source": "varcenter",
      "sort": 3
    }, {
      "attributeId": 8877,
      "tag": "1",
      "name": "姓名",
      "source": "varcenter",
      "sort": 1
    }, {
      "attributeId": 8877,
      "tag": "1",
      "name": "生日",
      "source": "varcenter",
      "sort": 4
    }, {
      "attributeId": 8877,
      "tag": "1",
      "imgName": "iconfont-webcalendar",
      "name": "当前日期",
      "source": "other",
      "sort": 2
    }]);
  },
  "getShops": function (req, res) {
    res.send([{
      "name": "大狗子19890202",
      "id": 1,
      "idInPlat": "100571094",
      "remark": "",
      "img": null
    }, {
      "name": "测试店铺2",
      "id": 2,
      "idInPlat": "100571098",
      "remark": "",
      "img": null
    }, {
      "name": "测试店铺3",
      "id": 3,
      "idInPlat": "100571091",
      "remark": "",
      "img": null
    }, {
      "name": "测试店铺4",
      "id": 4,
      "idInPlat": "100571087",
      "remark": "",
      "img": null
    }, {
      "name": "测试店铺5",
      "id": 5,
      "idInPlat": "100571065",
      "remark": "",
      "img": null
    }]);
  },
  "getSmsLabels": function (req, res) { // 短息标签
    res.send([{
      "id": 4,
      "flag": "1",
      "name": "H5链接",
      "enabled": 1,
      "imgName": "iconfont-h5",
      "source": "other",
      "sort": 3
    }, {
      "id": 1,
      "flag": "1",
      "name": "淘宝商品短链",
      "enabled": 1,
      "imgName": "iconfont-tao",
      "source": "other",
      "sort": 1
    }, {
      "id": 2,
      "flag": "1",
      "name": "自定义短链",
      "enabled": 1,
      "imgName": "iconfont-link",
      "source": "other",
      "sort": 4
    }, {
      "id": 3,
      "flag": "1",
      "name": "当前积分",
      "enabled": 1,
      "imgName": "iconfont-webcalendar",
      "source": "varcenter",
      "sort": 2
    }]);
  },
  "getShortLinkType": function (req, res) {
    res.send([{
      "id": 1,
      "name": "微博短信",
      "code": 1,
      "tip": "当前短链类型长度为XX字符（包括前后空格）"
    }, {
      "id": 2,
      "name": "fff短信",
      "code": 1,
      "tip": "XX字符（包括前后空格）"
    }]);
  },
  "getShortLink": function (req, res) {
    setTimeout(function () {
      res.send({
        "shorturl": "shortxxxurl"
      });
    }, 5000);
  },
  "getPruducts": function (req, res) { // 短息标签
    var page = req.query.page;
    var shopId = req.query.shopId;
    var query = req.query.query;
    if (page == 2) {
      res.send({
        "page": 2,
        "total": 4,
        "data": [{
          "productId": "AXXX1",
          "productName": "page2测试商品1",
          "price": 1000000,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx1",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX2",
          "productName": "page2测试商品2",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx2",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX3",
          "productName": "page2测试商品3",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx3",
          "num": 133,
          "imageUrl": "uuuuu"
        }]
      });
    } else if (shopId == 2) {
      res.send({
        "page": 1,
        "total": 4,
        "data": [{
          "productId": "AXXX1",
          "productName": "shop2试商品1",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx1",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX2",
          "productName": "shop2测试商品2",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx2",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX3",
          "productName": "shop2测试商品3",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx3",
          "num": 133,
          "imageUrl": "uuuuu"
        }]
      });
    } else if (query == 'ss') {
      res.send({
        "page": 1,
        "total": 4,
        "data": [{
          "productId": "AXXX1",
          "productName": "ss试商品1",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx1",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX2",
          "productName": "ss测试商品2",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx2",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX3",
          "productName": "ss测试商品3",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx3",
          "num": 133,
          "imageUrl": "uuuuu"
        }]
      });
    } else {
      res.send({
        "page": 1,
        "total": 4,
        "data": [{
          "productId": "AXXX1",
          "productName": "试商品1",
          "price": 100,
          "createdAt": "",
          "productUrl": "",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX2",
          "productName": "测测试商品2测试商品2测试商品2试商品2",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx2",
          "num": 133,
          "imageUrl": "uuuuu"
        }, {
          "productId": "AXXX3",
          "productName": "测试商品3",
          "price": 100,
          "createdAt": "2014-06-18 15:22",
          "productUrl": "xxxxxx3",
          "num": 133,
          "imageUrl": "uuuuu"
        }]
      });
    }
  },
  "getSignature": function (req, res) { // 短信签名
    res.send([{
      "id": 1,
      "name": "签名1"
    }, {
      "id": 2,
      "name": "签名2"
    }, {
      "id": 2,
      "name": "签名2"
    }, {
      "id": 2,
      "name": "签名是这样子的你放心是的"
    }, {
      "id": 2,
      "name": "签名1234566782"
    }]);
  },
  "deleteSignature": function (req, res) { // 删除签名
    res.send([{
      "id": 1,
      "name": "签名1"
    }]);
  },
  "addSignature": function (req, res) { // 增加签名
    res.send([{
      "id": 1,
      "name": "签名1"
    }]);
  },
  "gatewayById": function (req, res) { // 增加签名
    res.send({
      "gatewayId": 2,
      "gatewayName": "亿美软d通",
      "signature": "签名1",
      "isDefault": true,
      "balance": 230088.0,
      "quantity": 46017,
      "wordsLimit": "70",
      "markLength": "3",
      "gatewayType": "0"
    });
  },
  "getEDM": function (req, res) {
    res.send({
      "nodeEdm": {
        "id": 10017282,
        "shopId": 1212,
        "emailId": 111,
        "emailName": "text.html",
        "gatewayId": 202,
        /*"sender": "82282636@qq.com",*/
        "senderEmail": "service@channel7.edm.fenxibao.com",
        "useEnterpriseEmail": true,
        "subject": "testEDM",
        "emailType": 2,
        "testEmail": null,
        "blacklist": "{\"customer\":[],\"email\":[]}",
        "redlist": "[]",
        "deliveryTimeSelection": 1,
        "deliveryDate": null,
        "overAssignDelivery": true,
        "outputControl": 0,
        "emailFileName": "/home/admin/upload/upload_edm/node_edm_10017282.zip",
        "uploadFileName": "node_edm_10017282.zip",
        "createdAt": null,
        "updatedAt": null,
        "channelId": 202,
        "channelType": 3,
        "nodeChannelType": "tcommunicateEDM",
        "outputControlType": 0,
        "designerDomain": "http://co-branding-email.fenxibao.com/home/midpage"
      },
      "name": "EDM",
      "remark": null,
      "sampleEmailZipFormatUrl": null,
      "sampleEmailHtmlFormatUrl": null,
      "designerDomain": "http://co-branding-email.fenxibao.com/home/midpage",
      "blacklist": {
        "customer": [],
        "email": [{ 'id': "1009", 'name': "邮箱" }]
      },
      "redlist": [],
      "emailFileName": null,
      "htmlStr": null,
      "id": 10017282,
      "subject": "",
      "gatewayId": 202,
      "createdAt": null,
      "updatedAt": null,
      /*  "sender": "82282636@qq.com",*/
      "emailType": 1,
      "uploadFileName": "node_edm_10017282.zip",
      "senderEmail": "service@channel7.edm.fenxibao.com",
      "testEmail": null,
      "deliveryTimeSelection": 1,
      "deliveryDate": null,
      "overAssignDelivery": true,
      "outputControl": 0,
      "useEnterpriseEmail": true,
      "status": 500,
      "errorMsg": "已选择邮件：你好.html（邮件已被删除）"
    }

    );
  },
  "getEmails": function (req, res) {
    res.send({
      "page": 1,
      "pageSize": 10,
      "total": 30,
      "data": [{
        "id": "1",
        "no": "1234",
        "name": "邮件0",
        "categoryId": "10",
        "categoryName": "未分类",
        "created": "2010-01-01 01:01:01",
        "shopId": "1234"
      }, {
        "id": "2",
        "no": "1",
        "name": "邮件1",
        "categoryId": "10",
        "categoryName": "未分类",
        "created": "2010-01-01 01:01:01",
        "shopId": "1234"
      }, {
        "id": "3",
        "no": "1",
        "name": "邮件1",
        "categoryId": "10",
        "categoryName": "未分类",
        "created": "2010-01-01 01:01:01",
        "shopId": "1234"
      }, {
        "id": "4",
        "no": "1",
        "name": "邮件1",
        "categoryId": "10",
        "categoryName": "未分类",
        "created": "2010-01-01 01:01:01",
        "shopId": "1234"
      }]
    })
  },
  "getAllCategorty": function (req, res) {
    res.send({
      "msg": 'sa',
      "data": [{
        "id": 1,
        "name": "所有",
        "open": true,
        "parentId": 0
      }, {
        "id": 2,
        "name": "测试a",
        "open": false,
        "parentId": 1
      }, {
        "id": 4,
        "name": "测试",
        "open": false,
        "parentId": 2
      }, {
        "id": 5,
        "name": "aaa",
        "open": false,
        "parentId": 1
      }, {
        "id": 6,
        "name": "bbbb",
        "open": true,
        "parentId": 1
      }, {
        "id": 7,
        "name": "ddddd",
        "open": true,
        "parentId": 6
      }, {
        "id": 8,
        "name": "yyyyyyyy",
        "open": true,
        "parentId": 1
      }, {
        "id": 9,
        "name": "gggggg",
        "open": true,
        "parentId": 2
      }, {
        "id": 10,
        "name": "默认类别",
        "open": true,
        "parentId": 0
      }, {
        "id": 11,
        "name": "bbbbb",
        "open": true,
        "parentId": 2
      }, {
        "id": 12,
        "name": "fgggg",
        "open": false,
        "parentId": 2
      }],
      "success": true
    });
  },
  "saveEDM": function (req, res) {
    res.send();
  },
  "checkemail": function (req, res) {
    res.send({
      "flag": true
    })
  },
  "EDMgetGateway": function (req, res) {
    res.send([{
      "gatewayId": 28,
      "gatewayName": "思齐通用",
      "quantity": 2,
      "default": true
    }, {
      "gatewayId": 202,
      "gatewayName": "comm100邮件通道",
      "quantity": 0,
      "default": false
    }, {
      "gatewayId": 271,
      "gatewayName": "FocusSend预执行",
      "quantity": 43,
      "default": false
    }])
  },
  "EnterpriseEmail": function (req, res) {
    res.send({
      "email": "x@aaa.com "
    })
  },
  "modifyEDMuploadFile": function (req, res) {
    res.send({
      "nodeId": 1,
      "emailFileName": "email.zip",
      "html": "<a target='_blank' href='http://www.taobao.com'>百度</a>"
    })
  },
  "saveUploadFile": function (req, res) {
    res.send({
      "nodeId": 1,
      "emailFileName": "email.zip",
      "html": "<h2>曹徽，天下好男人122！</h2>"
    })

  },
  "edmUploadFile": function (req, res) {
    res.send({
      "nodeId": 1,
      emailFileName: "email.zip",
      "html": ""
    })
  },
  //"getUploadFile":function
  //拆分节点
  "getSplit": function (req, res) {
    res.send({
      "nodeId": 10001,
      "name": "拆分",
      "remark": "备注",
      "type": "RANDOM",
      "partPercentage": [{
        "index": 122121,
        "name": "拆分1",
        "percentage": 50
      }, {
        "index": 5454,
        "name": "拆分2",
        "percentage": 50
      }]
    });
  },
  "postSplit": function (req, res) {
    res.send({

    });
  },
  "getAttributeEditNode": function (req, res) {
    res.send({
      "id": 10053396,
      "tenantId": null,
      "name": "标签修改",
      "propertyId": 10080111,
      "propertyType": null,
      "needDel": null,
      "newValue": null,
      "isNew": null,
      "operator": null,
      "targetValue": null,
      "remark": null,
      "catalogId": null
    });
  },
  "saveAttributeEditNode": function (req, res) {
    res.send({
      "id": 123,
      "name": "测用户自定属性",
      "propertyType": "0",
      "newValue": "eww",
      "propertyId": 3,
      "needDel": true,
      "isNew": true,
      "operator": 1,
      "targetValue": "1",
      "remark": "测试用例-数字选择"
    })
  },
  "getAttribute": function (req, res) {
    res.send(
      [
        {
          "propertyId": 10080,
          "tenantId": "cartoon",
          "name": "23",
          "type": 1,
          "creator": "admin",
          "created": "2018-01-25T16:24:41.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10080",
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [],
          "numSels": []
        },
        {
          "propertyId": 10071,
          "tenantId": "cartoon",
          "name": "aa",
          "type": 0,
          "creator": "admin",
          "created": "2017-12-26T14:09:26.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10071",
          "disabled": false,
          "remark": "aa",
          "catalogId": null,
          "charSels": [
            {
              "id": 134,
              "propertyId": 10071,
              "charValue": "a1"
            },
            {
              "id": 135,
              "propertyId": 10071,
              "charValue": "a2"
            }
          ],
          "numSels": []
        },
        {
          "propertyId": 10009,
          "tenantId": "cartoon",
          "name": "aas",
          "type": 0,
          "creator": "hd",
          "created": "2017-12-25T13:48:56.000+0800",
          "status": true,
          "resultTable": null,
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [
            {
              "id": 105,
              "propertyId": 10009,
              "charValue": "aa"
            }
          ],
          "numSels": []
        },
        {
          "propertyId": 10011,
          "tenantId": "cartoon",
          "name": "saaa",
          "type": 0,
          "creator": "hd",
          "created": "2017-12-25T13:49:59.000+0800",
          "status": true,
          "resultTable": null,
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [
            {
              "id": 107,
              "propertyId": 10011,
              "charValue": "aa"
            }
          ],
          "numSels": []
        },
        {
          "propertyId": 10075,
          "tenantId": "cartoon",
          "name": "test123",
          "type": 0,
          "creator": "admin",
          "created": "2018-01-04T09:49:26.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10075",
          "disabled": false,
          "remark": "改好",
          "catalogId": null,
          "charSels": [
            {
              "id": 140,
              "propertyId": 10075,
              "charValue": "45"
            }
          ],
          "numSels": []
        },
        {
          "propertyId": 10078,
          "tenantId": "cartoon",
          "name": "testnum",
          "type": 2,
          "creator": "admin",
          "created": "2018-01-11T11:41:45.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10078",
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [],
          "numSels": [
            {
              "id": 60,
              "propertyId": 10078,
              "numValue": 12
            },
            {
              "id": 61,
              "propertyId": 10078,
              "numValue": 23
            }
          ]
        },
        {
          "propertyId": 10077,
          "tenantId": "cartoon",
          "name": "testttt",
          "type": 0,
          "creator": "admin",
          "created": "2018-01-05T17:30:55.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10077",
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [
            {
              "id": 145,
              "propertyId": 10077,
              "charValue": "特"
            }
          ],
          "numSels": []
        },
        {
          "propertyId": 10076,
          "tenantId": "cartoon",
          "name": "tst",
          "type": 0,
          "creator": "admin",
          "created": "2018-01-05T16:47:21.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10076",
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [
            {
              "id": 141,
              "propertyId": 10076,
              "charValue": "t"
            },
            {
              "id": 142,
              "propertyId": 10076,
              "charValue": "e"
            }
          ],
          "numSels": []
        },
        {
          "propertyId": 10054,
          "tenantId": "cartoon",
          "name": "tt39",
          "type": 1,
          "creator": "admin",
          "created": "2017-12-25T16:12:08.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10054",
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [],
          "numSels": []
        },
        {
          "propertyId": 10013,
          "tenantId": "cartoon",
          "name": "ww",
          "type": 0,
          "creator": "admin",
          "created": "2017-12-25T14:53:35.000+0800",
          "status": true,
          "resultTable": null,
          "disabled": false,
          "remark": "钉钉",
          "catalogId": null,
          "charSels": [
            {
              "id": 109,
              "propertyId": 10013,
              "charValue": "呃呃"
            }
          ],
          "numSels": []
        },
        {
          "propertyId": 10081,
          "tenantId": "cartoon",
          "name": "辅导费",
          "type": 1,
          "creator": "admin",
          "created": "2018-01-25T16:29:01.000+0800",
          "status": true,
          "resultTable": "custom_property_idx_10081",
          "disabled": false,
          "remark": "",
          "catalogId": null,
          "charSels": [],
          "numSels": []
        }
      ]
    )
  },
  //淘宝权益节点
  "getDiscountBenefit": function (req, res) {
    res.send({
      "id": 34,
      "name": "支付宝红包",
      "activityName": "清明雨上优惠",
      "remark": "备注",
      "shopId": null,
      "shopIdReal": null,
      "shopName": null,
      "relationId": null,
      "blacklist": {
        "customer": []
      },
      "testUsers": "ceshi1,ceshi2",
      "outputType": 1
    });
  },
  "postDiscountEc": function (req, res) {
    res.send({
      "id": 34,
      "name": "优惠券",
      "couponName": "10元优惠券",
      "remark": "备注",
      "shopId": 11,
      "shopName": "大狗子店铺",
      "relationId": 1,
      "testUsers": "testOne,testTwo",
      "outputType": 0
    });
  },
  "getDiscountBenefitActivity": function (req, res) {
    res.send([{
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }, {
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }, {
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }, {
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }, {
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }, {
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }, {
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }, {
      "relationId": 0,
      "activityName": "淘宝权益测试"
    }, {
      "relationId": 1,
      "activityName": "淘宝权益活动测试"
    }])
  },

  // 微信节点
  "getWechat": function (req, res) {
    res.send({
      // "id": 34,
      // "nodeCode": '34',
      // "nodeName": "微信1233333",
      // "remark": "",
      // "offAcct": 11,
      // "authAppid": "appid1",
      // "materialId": '素材一',
      // "materialName": '图文素材一',
      // "materialType": 'news',
      // "sendTimeType": 'excute',
      // "sendTime": "2014-02-26T14:25:22.000+0800",
      // "testOpenId": "ceshi1,ceshi2",
      // "outType": 'all',
      // "msgType": 'olds'
      "id": 34,
      "msg": '',
      "nodeName": "微信1233333",
      "sendTimeType": 'excute',
      "sendTime": "2014-02-26T14:25:22.000+0800",
      "outType": 'all',
      "msgType": 'olds'
    });
  },
  "getFilterList": function (req, res) {
    res.send({
      "blackList": [
        {
          "id": 1,
          "groupType": "MOBILE",
          "groupName": "ddd",
          "selected": false
        },
        {
          "id": 2,
          "groupType": "BLACK",
          "groupName": "ddd",
          "selected": true
        },
        {
          "id": 3,
          "groupType": "MOBILE",
          "groupName": "ddd",
          "selected": false
        },
        {
          "id": 4,
          "groupType": "BLACK",
          "groupName": "ddd",
          "selected": true
        }
      ],
      "redList": [
        {
          "id": 1,
          "groupType": "WHITE",
          "groupName": "ddd2",
          "selected": true
        },
        {
          "id": 1,
          "groupType": "WHITE",
          "groupName": "ddd2",
          "selected": true
        }
      ]
    })
  },
  "postWechat": function (req, res) {
    res.send({
      "id": 34,
      "name": "优惠券",
      "couponName": "10元优惠券",
      "remark": "备注",
      "shopId": 11,
      "shopName": "大狗子店铺",
      "relationId": 1,
      "testUsers": "testOne,testTwo",
      "outputType": 0
    });
  },
  'getWechatNumbers': function (req, res) {
    res.send(
      [
        {
          "appid": "appid1",
          "nickname": "nickname1"
        },
        {
          "appid": "appid2",
          "nickname": "nickname2"
        },
        {
          "appid": "appid3",
          "nickname": "nickname3"
        }
      ]);
  },
  'getMaterialType': function (req, res) {
    res.send([
      { "code": "image", "name": "图片" },
      { "code": "video", "name": "视频" },
      { "code": "voice", "name": "语音" },
      { "code": "news", "name": "图文" }
    ]);
  },
  'authorize': function (req, res) {
    res.send()
  },
  'materialList': function (req, res) {
    res.send({
      "total_count": 300,
      "item_count": 20,
      "item": [
        {
          "media_id": "123",
          "update_time": "2017-11-27T17:43:13",
          "content":
            {
              "news_item": [
                {
                  "title": "素材标题要很长素材标题要很长素材标题要很长素材标题要很长素材标题要很长素材标题要很长素材标题要很长素材标题要很长素材标题要很长素材标题要很长",
                  "thumb_media_id": "素材id",
                  "author": "yueyu",
                  "content": "hahahahahaha",
                  "url": "http://wwwwwwww",
                  "content_source_url": "dddddddddddd"
                },
                {
                  "title": "素材标题2",
                  "thumb_media_id": "素材id",
                  "author": "yueyu",
                  "content": "hahahahahaha",
                  "url": "http://wwwwwwww",
                  "content_source_url": "dddddddddddd"
                },
              ]
            }
        },
        {
          "media_id": "123",
          "update_time": "2017-11-27T17:43:13",
          "content":
            {
              "news_item": [
                {
                  "title": "素材标题",
                  "thumb_media_id": "素材id",
                  "author": "yueyu",
                  "content": "hahahahahaha",
                  "url": "http://wwwwwwww",
                  "content_source_url": "dddddddddddd"
                },
                {
                  "title": "素材标题2",
                  "thumb_media_id": "素材id",
                  "author": "yueyu",
                  "content": "hahahahahaha",
                  "url": "http://wwwwwwww",
                  "content_source_url": "dddddddddddd"
                },
              ]
            }
        },
      ]
    })
    // res.send({
    //   "total_count": 300,
    //   "item_count": 300,
    //   "item": [{
    //     "media_id": "123444",
    //     "name": "xiexie",
    //     "update_time": "2017-11-27T17:43:13",
    //     "url":"wwwwwwwwww"
    //   },
    //     {
    //       "media_id": "123444",
    //       "name": "xiexie",
    //       "update_time": "2017-11-27T17:43:13",
    //       "url":"wwwwwwwwww"
    //     },
    //     {
    //       "media_id": "123444",
    //       "name": "xiexie",
    //       "update_time": "2017-11-27T17:43:13",
    //       "url":"wwwwwwwwww"
    //     },
    //   ]
    // })
  },
  'materials': function (req, res) {
    res.send([{
      "title": "素材一",
      "mediaId": 11,
      "type": "olds"
    }, {
      "title": "素材二",
      "mediaId": 12,
      "type": "olds"
    }, {
      "title": "素材三",
      "mediaId": 13,
      "type": "news"
    }])
  },
  "reportArticleRead": function (req, res) {
    res.send({
      "sendDate": "2014-12-14",
      "sendUserCount": 55555,
      "actualSendCount": 4444,
      "details": [
        {
          "id": 1,
          "msgid": "202457380asdf",
          "index": 1,
          "title": "马航丢画记",
          "stat_date": "2014-12-14",
          "target_user": 261917,
          "int_page_read_user": 23676,
          "int_page_read_count": 25615,
          "ori_page_read_user": 29,
          "ori_page_read_count": 34,
          "share_user": 122,
          "share_count": 994,
          "add_to_fav_user": 1,
          "add_to_fav_count": 3,
          "int_page_from_session_read_user": 657283,
          "int_page_from_session_read_count": 753486,
          "int_page_from_hist_msg_read_user": 1669,
          "int_page_from_hist_msg_read_count": 1920,
          "int_page_from_feed_read_user": 367308,
          "int_page_from_feed_read_count": 433422,
          "int_page_from_friends_read_user": 15428,
          "int_page_from_friends_read_count": 19645,
          "int_page_from_other_read_user": 477,
          "int_page_from_other_read_count": 703,
          "feed_share_from_session_user": 63925,
          "feed_share_from_session_cnt": 66489,
          "feed_share_from_feed_user": 18249,
          "feed_share_from_feed_cnt": 19319,
          "feed_share_from_other_user": 731,
          "feed_share_from_other_cnt": 775
        }
      ]
    })
  },
  //迪卡侬微信节点
  'getWechatNumbersDkt': function (req, res) {
    res.send([
      {
        "offacct": "wxc724d28eef67468f1",
        "offacctName": "数云测试公众号1"
      }, {
        "offacct": "wxc724d28eef67468f2",
        "offacctName": "数云测试公众号2"
      }
    ])
  },
  "getWechatDkt": function (req, res) {
    res.send({
      "id": "1096",
      "name": "微信节点",
      "offacct": "wxc724d28eef67468f1",
      "offacctName": "订票中心",
      "mediaId": "ddd-123",
      "mediaName": "订餐热线",
      "redList": "1",
      "blackList": "1",
      "outputType": "1",
      "msgType": "news"
    });
  },
  'materialsDkt': function (req, res) {
    res.send({
      "page": 1,
      "pageSize": 20,
      "total": 100,
      "data": [{
        "mediaId": "ddd-123",
        "type": "news",
        "updateTime": "2017-10-22 10:10:10",
        "newsItem": [
          {
            "title": "订餐热线",
            "author": "作者",
            "url": "www.baidu.com"
          },
          {
            "title": "订餐热线",
            "author": "作者",
            "url": "www.baidu.com"
          },
          {
            "title": "订餐热线",
            "author": "作者",
            "url": "www.baidu.com"
          }
        ]
      }, {
        "mediaId": "ddd-124",
        "type": "news",
        "updateTime": "2017-10-22 10:10:10",
        "newsItem": [
          {
            "title": "订票热线2",
            "author": "作者",
            "url": "www.baidu.com"
          },
          {
            "title": "订票热线",
            "author": "作者",
            "url": "www.baidu.com"
          },
          {
            "title": "订票热线",
            "author": "作者",
            "url": "www.baidu.com"
          }
        ]
      }]
    })
  },
  "postWechatDkt": function (req, res) {
    res.send({
      "id": 34,
      "name": "优惠券",
      "couponName": "10元优惠券",
      "remark": "备注",
      "shopId": 11,
      "shopName": "大狗子店铺",
      "relationId": 1,
      "testUsers": "testOne,testTwo",
      "outputType": 0
    });
  },
  //百丽优惠券节点
  "getDiscountEcBelle": function (req, res) {
    res.send({
      "id": 10000149,
      "name": "百丽优惠券",
      "remark": null,
      "brandNames": "生效品牌",
      "ruleName": "优惠券规则名称",
      "couponRuleCode": "优惠券规则代码",
      "eUsedDate": null,
      "sUsedDate": null,
      "publishOrganName": null,
      "releaseNum": null,
      "discType": 1,
      "faceMoney": "2",
      "settlementPrice": 1,
      "instructions": null,
      "nodeRemark": null,
      "outputType": 0
    });
  },
  "postDiscountEcBelle": function (req, res) {
    res.send({
      "id": 10000150,
      "name": "百丽优惠券",
      "msg": "保存成功",
      "code": "xxxx"
    });
  },
  "getDiscountCouponBelle": function (req, res) {
    res.send({
      "brandNames": "生效品牌" + Math.random() * 100,
      "ruleName": "优惠券规则名称",
      "eUsedDate": null,
      "sUsedDate": null,
      "publishOrganName": null,
      "releaseNum": null,
      "discType": 2,
      "faceMoney": "2",
      "settlementPrice": 3,
      "instructions": null,
      "nodeRemark": null
    });
  },
  //优惠券节点
  "getDiscountEc": function (req, res) {
    res.send({
      "id": 10000151,
      "name": "店铺优惠券",
      "remark": null,
      "couponId": null,
      "couponName": null,
      "shopId": null,
      "shopName": null,
      "testUsers": null,
      "outputType": 0,
      "blacklist": {
        "customer": []
      },
      "useable": true
    });
  },
  "postDiscountEc": function (req, res) {
    res.send({
      "id": 10000152,
      "name": "店铺优惠券",
      "remark": null,
      "couponId": null,
      "couponName": null,
      "shopId": null,
      "shopName": null,
      "testUsers": null,
      "outputType": 0,
      "blacklist": {
        "customer": []
      },
      "useable": true
    });
  },
  "postDiscountBenefitData": function (req, res) {
    res.send({
      "id": 34,
      "name": "店铺优惠券",
      "couponName": "10元优惠券",
      "remark": "备注",
      "shopId": 11,
      "shopName": "大狗子店铺",
      "couponId": 1,
      "testUsers": "testOne,testTwo",
      "outputType": 1
    });
  },
  "getDiscountCoupon": function (req, res) {
    res.send([{
      "couponId": 0,
      "couponName": "商品级优惠测试",
      "useable": false
    }, {
      "couponId": 1,
      "couponName": "订单级测试",
      "useable": false
    }, {
      "couponId": 0,
      "couponName": "商品级优惠测试",
      "useable": true
    }, {
      "couponId": 1,
      "couponName": "订单级测试",
      "useable": true
    }, {
      "couponId": 0,
      "couponName": "商品级优惠测试",
      "useable": true
    }, {
      "couponId": 1,
      "couponName": "订单级测试"
    }, {
      "couponId": 0,
      "couponName": "商品级优惠测试"
    }, {
      "couponId": 1,
      "couponName": "订单级测试"
    }, {
      "couponId": 0,
      "couponName": "商品级优惠测试"
    }, {
      "couponId": 1,
      "couponName": "订单级测试"
    }, {
      "couponId": 0,
      "couponName": "商品级优惠测试"
    }, {
      "couponId": 1,
      "couponName": "订单级测试"
    }, {
      "couponId": 0,
      "couponName": "商品级优惠测试"
    }, {
      "couponId": 1,
      "couponName": "订单级测试"
    }, {
      "couponId": 0,
      "couponName": "商品级优惠测试"
    }, {
      "couponId": 1,
      "couponName": "订单级测试"
    }])
  },
  //积分发放节点
  "getCheckDesc": function (req, res) {
    res.send(true);
  },
  "getDiscountIsNew": function (req, res) {
    res.send({
      "id": 34,
      "name": "积分发放",
      "remark": "备注",
      "tip": "撒飒飒飒飒爱上爱上撒",
      "ctyId": null,
      "ctyName": "积分卡",
      "number": 998,
      "output": "ALL",
      "hasReport": true,
      "desc": "描述",
      "integralTypeId": -999,
      "poolType": 0,
      "view": "淘宝积分"
    });
  },
  "getDiscountIs": function (req, res) {
    res.send({
      "id": 34,
      "name": "积分发放",
      "remark": "备注",
      "tip": "撒飒飒飒飒爱上爱上撒",
      "ctyId": null,
      "ctyName": "积分卡",
      "number": 998,
      "output": "ALL",
      "hasReport": true,
      "desc": "描述",
      "integralTypeId": -999,
      "poolType": 0,
      "view": "淘宝积分"
    });
  },
  "getDiscountType": function (req, res) {
    res.send([{
      shopId: 100571094,
      poolType: 0,
      view: "淘宝积分",
      integralTypeId: -999
    }, {
      shopId: 100571098,
      poolType: 2,
      view: "未配置积分",
      integralTypeId: null
    }, {
      shopId: 100571091,
      poolType: 80,
      view: "淘宝积分2",
      integralTypeId: 252
    }, {
      shopId: 100571087,
      poolType: 2,
      view: "未配置积分2",
      integralTypeId: null
    }, {
      shopId: 100571065,
      poolType: 0,
      view: "淘宝积分6",
      integralTypeId: -999
    }]);
  },
  "postDiscountIs": function (req, res) {
    res.send({
      "id": 34,
      "name": "积分发放",
      "remark": "备注",
      "tip": "撒飒飒飒飒爱上爱上撒",
      "shopId": 11,
      "shopName": "大狗子店铺",
      "number": 998,
      "output": "ONLY_SUCCESS",
      "hasReport": true
    });
  },
  "getDiscountIsReportData": function (req, res) {
    res.send({
      "total": 1,
      "page": 1,
      "pagesize": 10,
      "data": [{
        "id": "(这个字段不显示)",
        "submitTime": "2014-02-26T14:25:22.000+0800",
        "submitCount": "客户提交数",
        "sendTime": "2014-02-26T14:25:22.000+0800",
        "sendIntegralNum": "积分发放数",
        "successCount": "发送成功人数",
        "errorCount": "发送失败人数",
        "detail": "明细(下载链接地址)"
      }]
    })
  },
  "getDiscountIsShops": function (req, res) {
    res.send([{
      "id": 1,
      "name": "大狗子19890202",
      "idInPlat": "100571094",
      "img": "",
      "remark": "",
      "segmentationId": 1
    }, {
      "id": 2,
      "name": "ben1247",
      "idInPlat": "70582239",
      "img": "",
      "remark": "",
      "segmentationId": 1
    }, {
      "id": 3,
      "name": "miaomiaozhu0620",
      "idInPlat": "71677914",
      "img": "",
      "remark": "",
      "segmentationId": 1
    }, {
      "id": 6,
      "name": "测试店铺6",
      "idInPlat": "123456",
      "img": "",
      "remark": "",
      "segmentationId": 1
    }, {
      "id": 7,
      "name": "tomwalk",
      "idInPlat": "65927470",
      "img": "",
      "remark": "",
      "segmentationId": 1
    }, {
      "id": 20140512002,
      "name": "店铺testaaaaaaqwweeeeee",
      "idInPlat": "20140512002",
      "img": "",
      "remark": "",
      "segmentationId": 1
    }])
  },
  //定向优惠节点
  "getDiscountUmp": function (req, res) {
    res.send({
      "id": 34,
      "name": "定向优惠卡",
      "umpName": "定向优惠",
      "remark": "备注",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "shopId": 11,
      "shopName": "大狗子店铺",
      "umpId": 1,
      "nodeUmpType": {
        "value": 0,
        "name": "商品级优惠"
      },
      "testUsers": "testOne,testTwo",
      "outputType": 1
    })
  },
  "getDiscountUmpType": function (req, res) {
    res.send([{
      "value": 0,
      "name": "商品级优惠"
    }, {
      "value": 1,
      "name": "订单级"
    }, {
      "value": 3,
      "name": "包邮卡"
    }]);
  },
  "resCouponHdNames": function (req, res) {
    res.send([{
      "umpId": 0,
      "umpName": "商品级优惠测试"
    }, {
      "umpId": 1,
      "umpName": "订单级测试"
    }, {
      "umpId": 2,
      "umpName": "活动测试"
    }])
  },
  "postDiscountUmp": function (req, res) {
    res.send({
      "id": 34,
      "name": "定向优惠",
      "remark": "备注",
      "shop": {
        "id": 11,
        "name": "店铺一"
      },
      "couponType": "商品优惠",
      "couponTypeList": ["商品优惠", "订单优惠", "包邮卡"],
      "discountName": {
        "id": 2,
        "name": "活动二"
      },
      "testAccount": "testOne,testTwo",
      "exportTarget": "1"
    })
  },
  "getUmpReport": function (req, res) {
    res.send([{
      "umpName": "双11优惠",
      "commitTime": "2014-02-13T16:22:45.000+0800",
      "commitTimes": 5,
      "successTimes": 100,
      "failTimes": 5,
      "updateTime": "2014-02-13T16:22:45.000+0800",
      "downloadUrl": "ftp://shuyun/"
    }, {
      "umpName": "双11优惠",
      "commitTime": "2014-02-13T16:22:45.000+0800",
      "commitTimes": 5,
      "successTimes": 100,
      "failTimes": 5,
      "updateTime": "2014-02-13T16:22:45.000+0800",
      "downloadUrl": "ftp://shuyun/"
    }]);

  },
  "getcardtypes": function (req, res) {
    res.send([{
      "ctyId": 1,
      "ctyName": "测试卡类型1",
      "loyaltyMemberGrade": [{
        "priority": 1,
        "membergradeName": "测试会员等级1"
      }, {
        "priority": 2,
        "membergradeName": "测试会员等级2"
      }, {
        "priority": 3,
        "membergradeName": "测试会员等级3"
      }]
    }, {
      "ctyId": 2,
      "ctyName": "测试卡类型2",
      "loyaltyMemberGrade": [{
        "priority": 1,
        "membergradeName": "测试会员等级11"
      }, {
        "priority": 2,
        "membergradeName": "测试会员等级21"
      }, {
        "priority": 3,
        "membergradeName": "测试会员等级31"
      }]
    }]);
  },
  "getNewVipSetting": function (req, res) {
    res.send({
      "id": 10012619,
      "name": "会员等级设置",
      "remark": "", //备注
      "validPeriod": "200", //相对有效期
      "absoluteDate": "2012-03-23 06:33", //绝对有效期
      "flagAbsoluteDate": "2",
      "ctyId": 2, //卡类型编号
      "ctyName": "测试卡类型2",
      "priority": 3,
      "membergradeName": "普通卡",
      "tips": "^^^^^^^^^^^"
    });
  },
  "getVipSetting": function (req, res) {
    res.send({
      "id": 10012619,
      "name": "会员等级设置",
      "remark": "", //备注
      "validPeriod": "200", //相对有效期
      "absoluteDate": "2012-03-23 06:33", //绝对有效期
      "flagAbsoluteDate": "2",
      "ctyId": 2, //卡类型编号
      "ctyName": "测试卡类型2",
      "priority": 3,
      "membergradeName": "普通卡",
      "tips": "^^^^^^^^^^^"
    });
  },
  "saveVipSetting": function (req, res) {
    res.send({
      "id": 123,
      "name": "wii",
      "shopId": 456,
      "grade": 1,
      "validPeriod": 1,
      "remark": " 备注信息"
    });
  },
  "getCardTypeList": function (req, res) {
    res.send([{
      "ctyId": 10010, //卡类型编号
      "ctyName": "积分卡1", //卡类型名称
      "pointTypeId": 10009, //积分类型编号
      "pointName": "卡类型编号1" //积分类型名称
    }, {
      "ctyId": 10011, //卡类型编号
      "ctyName": "积分卡2", //卡类型名称
      "pointTypeId": 10009, //积分类型编号
      "pointName": "卡类型编号2" //积分类型名称
    }, {
      "ctyId": 10012, //卡类型编号
      "ctyName": "积分卡3", //卡类型名称
      "pointTypeId": 10009, //积分类型编号
      "pointName": "卡类型编号3", //积分类型名称
      "shopId": 1
    }, {
      "ctyId": 10013, //卡类型编号
      "ctyName": "积分卡4", //卡类型名称
      "pointTypeId": 10009, //积分类型编号
      "pointName": "卡类型编号3", //积分类型名称
      "shopId": 1
    }]);
  },
  "getShopsForVip": function (req, res) {
    res.send([{
      "shopId": 123,
      "shopName": "wii"
    }, {
      "shopId": 456,
      "shopName": "uey"
    }]);

  },
  "getGradeTypeVip": function (req, res) {
    res.send([{
      "name": "普通会员",
      "value": 1
    }, {
      "name": "高级会员",
      "value": 2
    }, {
      "name": "VIP会员",
      "value": 3
    }, {
      "name": "至尊VIP",
      "value": 4
    }]);
  },
  "getVIPReports": function (req, res) {
    res.send({
      "total": 2,
      "page": 1,
      "pageSize": 2,
      "data": [{
        "pk": {
          "jobId": 1817,
          "nodeId": 10006312
        },
        "submitTime": "2014-05-15T20:57:42.000+0800",
        "submitNum": 8,
        "successNum": 2,
        "failNum": 6,
        "setGradeTime": "2014-05-15T20:57:42.000+0800",
        "fileUrl": "membergrade_report_1400158661978.zip"
      }, {
        "pk": {
          "jobId": 1816,
          "nodeId": 10006312
        },
        "submitTime": "2014-05-15T20:50:12.000+0800",
        "submitNum": 8,
        "successNum": 2,
        "failNum": 6,
        "setGradeTime": "2014-05-15T20:50:12.000+0800",
        "fileUrl": "membergrade_report_1400158212027.zip"
      }]
    })
  },
  "openMatchNode": function (req, res) { // 名单匹配节点
    res.send({
      "id": 123,
      "name": "名单匹配节点",
      "remark": "备注",
      "platform": "京东",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "platformList": [{
        "id": 1,
        "name": "淘宝"
      }, {
        "id": 2,
        "name": "京东"
      }],
      "delimiter": 0,
      "fileName": "aaa.txt",
      "example": "www.11.com",
      "hasColumnName": false,
      "importNumber": 120,
      "distinctNumber": 132,
      "matchNumber": 12,
      "matchRate": 0.5
    })
  },
  "postMatchUpload": function (req, res) {
    res.send({
      "columnName": "customerId",
      "records": [
        "账号1",
        "账号2",
        "账号3"
      ]
    })
  },
  "postMatchMatch": function (req, res) {
    res.send({
      "id": 123,
      "name": "名单匹配节点",
      "remark": "备注",
      "platform": "淘宝",
      "platformList": [
        "淘宝",
        "京东"
      ],
      "delimiter": ",|;| ",
      "hasColumnName": "false",
      "importNumber": 100,
      "distinctNumber": 90,
      "matchNumber": 10,
      "matchRate": 0.5
    })
  },
  "getHFiveMesage": function (req, res) { // H5链接模板
    var page_index = req.query.page_index;
    var shop_id = req.query.shop_id;
    var keyword = req.query.keyword;
    var page_size = req.query.page_size;
    if (page_index == 2) {
      res.send({
        "page_index": 2,
        "page_count": 4,
        "data": [{
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }]
      });
    } else if (page_index == 3) {
      res.send({
        "page_index": 3,
        "page_count": 4,
        "data": [{
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }]
      });
    } else if (page_index == 4) {
      res.send({
        "page_index": 4,
        "page_count": 4,
        "data": [{
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }]
      });
    } else if (shop_id == 2) {
      res.send({
        "page_index": 1,
        "page_count": 2,
        "data": [{
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }]
      });
    } else if (page_size == 8) {
      res.send({
        "page_index": 1,
        "page_count": 2,
        "data": [{
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2014-06-18 15:22",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }]
      });
    } else {
      res.send({
        "page_index": 1,
        "page_count": 4,
        "data": [{
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2016-01-13 15:51:28.0",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2016-01-13 15:51:28.0",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2016-01-13 15:51:28.0",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2016-01-13 15:51:28.0",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2016-01-13 15:51:28.0",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }, {
          "cid": "0010100001010",
          "title": "双十一活动专项微信端的手机页面",
          "creator": '张三',
          "time": "2016-01-13 15:51:28.0",
          "url": "http://www.baidu.com",
          "thumbnail": "http://abc/efg/hi"
        }]
      });
    }
  },
  //效果跟踪
  "getDiscountTrack": function (req, res) {
    res.send({
      "taskId": "123",
      "total": 198998,
      "theDate": "2016-07-22 15:04:06",
      "orderPeople": 0,
      "orderAmout": 1234569.23,
      "orderNum": 1234569,
      "orderProductNum": 987654321,
      "payPeople": 0,
      "payAmout": 12345629.8,
      "payNum": 1231456,
      "payProductNum": 4465446
    });
  },
  "getDiscountTrackEchart": function (req, res) {
    res.send([
      {
        "order": 0,
        "pay": 0
      },
      {
        "order": 123,
        "pay": 7894
      },
      {
        "order": 14566,
        "pay": 88866
      },
      {
        "order": 123132,
        "pay": 1212
      },
      {
        "order": 6461456,
        "pay": 13213213
      },
      {
        "order": 15645614,
        "pay": 1321313
      },
      {
        "order": 123131321,
        "pay": 514545454
      },
      {
        "order": 1231313258,
        "pay": 514545454
      },
      {
        "order": 123131326,
        "pay": 514545454
      },
      {
        "order": 123131329,
        "pay": 514545454
      },
      {
        "order": 123131323,
        "pay": 514545454
      },
      {
        "order": 123131341,
        "pay": 514545454
      },
      {
        "order": 123131341,
        "pay": 514545454
      },
      {
        "order": 123131341,
        "pay": 514545454
      },
      {
        "order": 123131341,
        "pay": 514545454
      },
      {
        "order": 123131341,
        "pay": 514545454
      },
      {
        "order": 123131341,
        "pay": 514545454
      },
      {
        "order": 123131341,
        "pay": 514545454
      },
      null
    ]);
  },
  "openDiscountTrack": function (req, res) {
    res.send({
      "id": 122,
      "name": "效果跟踪160707",
      "tips": "在活动跟踪时间段内，系统每30分钟计算一次最新活动效果。跟踪时间段结束后，订单状态不再刷新，请以后续分析节点和分析报告为准。每活动最多添加3个效果跟踪节点。",
      "remark": "我是备注",
      "shopId": null,
      "shopName": '',
      "startTime": "2016-12-27 19:30",
      "duration": 1,
      "bdefault": true
    });
  },
  "openTrackpropertyList": function (req, res) {
    res.send({
      "total": 3,
      "page": 1,
      "pageSize": 20,
      "data": [{
        "numIid": 123123445,
        "name": "sfe",
        "price": 213.3,
        "pic": "http://none",
        "url": "http://noe",
        "orderPeople": 1,
        "orderNum": 1,
        "orderProductNum": 1,
        "payPeople": 0,
        "payNum": 0,
        "payProductNum": 1231
      }, {
        "numIid": 123123445,
        "name": "sfe",
        "price": 213.3,
        "pic": "http://none",
        "url": "http://noe",
        "orderPeople": 1,
        "orderNum": 1,
        "orderProductNum": 1,
        "payPeople": 0,
        "payNum": 0,
        "payProductNum": 0
      }, {
        "numIid": 123123445,
        "name": "sfe",
        "price": 213.3,
        "pic": "http://none",
        "url": "http://noe",
        "orderPeople": 1,
        "orderNum": 1,
        "orderProductNum": 1,
        "payPeople": 0,
        "payNum": 0,
        "payProductNum": 0
      }, {
        "numIid": 123123445,
        "name": "sfe",
        "price": 213.3,
        "pic": "http://none",
        "url": "http://noe",
        "orderPeople": 1,
        "orderNum": 1,
        "orderProductNum": 1,
        "payPeople": 0,
        "payNum": 0,
        "payProductNum": 0
      }, {
        "numIid": 123123445,
        "name": "sfe",
        "price": 213.3,
        "pic": "http://none",
        "url": "http://noe",
        "orderPeople": 1,
        "orderNum": 1,
        "orderProductNum": 1,
        "payPeople": 0,
        "payNum": 0,
        "payProductNum": 0
      }, {
        "numIid": 123123445,
        "name": "sfe",
        "price": 213.3,
        "pic": "http://none",
        "url": "http://noe",
        "orderPeople": 1,
        "orderNum": 1,
        "orderProductNum": 1,
        "payPeople": 0,
        "payNum": 0,
        "payProductNum": 0
      }]
    })
  },
  "putDiscountTrack": function (req, res) {
    res.send({
      "id": 456,
      "name": "效果跟踪节点"
    });
  },
  "postMatchSave": function (req, res) {
    res.send({
      "id": 36,
      "name": "名单匹配节点",
      "remark": "备注",
      "platform": "淘宝",
      "platformList": [
        "淘宝",
        "京东"
      ],
      "delimiter": ",|;| ",
      "hasColumnName": "false",
      "importNumber": 120,
      "distinctNumber": 100,
      "matchNumber": 5,
      "matchRate": 0.5
    })
  },
  "putPreview": function (req, res) {
    res.send({
      "columnName": "customerId",
      "records": [
        "切换账号1",
        "切换账号2",
        "切换账号3"
      ]
    })
  },
  "getMatchResultData": function (req, res) {
    res.send({
      "columnName": "查看结果",
      "records": [
        "切换账号1",
        "切换账号2",
        "切换账号3"
      ]
    })
  },
  "openExcludeNode": function (req, res) { // 排除节点
    res.send({
      "id": 123,
      "name": "排除节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "fromId": null,
      "toId": null,
      "preNodes": [{
        "id": 123,
        "name": "查询节点"
      }, {
        "id": 124,
        "name": "拆分节点"
      }]
    })
  },
  "postExcludeSave": function (req, res) {
    res.send({
      "id": 40,
      "name": "排除节点",
      "remark": "备注排除",
      "beforeNodeId": 124,
      "connectNodes": [{
        "id": 123,
        "name": "查询节点"
      }, {
        "id": 124,
        "name": "拆分节点"
      }]
    })
  },
  "openPriorityNode": function (req, res) { // 排重节点
    res.send({
      "id": 123,
      "name": "排重节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "fromId": 124,
      "toId": 123,
      "inputAndOutputAttrs": [{
        "inputNodeId": 1,
        "priority": 1,
        "inputNodeType": "类型1",
        "inputNodeName": "查询节点",
        "outputNodeName": "输出节点名称",
        "outputNodeId": 11
      }, {
        "inputNodeId": 2,
        "priority": 2,
        "inputNodeType": "类型2",
        "inputNodeName": "查询节点",
        "outputNodeName": "输出节点名称",
        "outputNodeId": 22
      }, {
        "inputNodeId": 3,
        "priority": 3,
        "inputNodeType": "类型3",
        "inputNodeName": "查询节点",
        "outputNodeName": "输出节点名称",
        "outputNodeId": 33
      }, {
        "inputNodeId": 4,
        "priority": 4,
        "inputNodeType": "类型4",
        "inputNodeName": "查询节点",
        "outputNodeName": "输出节点名称",
        "outputNodeId": 44
      }, {
        "inputNodeId": 5,
        "priority": 5,
        "inputNodeType": "类型5",
        "inputNodeName": "查询节点",
        "outputNodeName": "输出节点名称",
        "outputNodeId": 55
      }, {
        "inputNodeId": 6,
        "priority": 6,
        "inputNodeType": "类型6",
        "inputNodeName": "查询节点",
        "outputNodeName": "输出节点名称",
        "outputNodeId": 66
      }, {
        "inputNodeId": 7,
        "priority": 7,
        "inputNodeType": "类型7",
        "inputNodeName": "查询节点",
        "outputNodeName": "输出节点名称",
        "outputNodeId": 77
      }]
    })
  },
  "postPrioritySave": function (req, res) {
    res.send({
      "id": 45,
      "name": "排除节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "fromId": 124,
      "toId": 123,
      "priorityNodes": [{
        "id": 1,
        "priority": 1,
        "type": "类型1",
        "inName": "查询节点",
        "outName": "输出节点名称"
      }, {
        "id": 2,
        "priority": 2,
        "type": "类型2",
        "inName": "查询节点",
        "outName": "输出节点名称"
      }, {
        "id": 3,
        "priority": 3,
        "type": "类型3",
        "inName": "查询节点",
        "outName": "输出节点名称"
      }, {
        "id": 4,
        "priority": 4,
        "type": "类型4",
        "inName": "查询节点",
        "outName": "输出节点名称"
      }, {
        "id": 5,
        "priority": 5,
        "type": "类型5",
        "inName": "查询节点",
        "outName": "输出节点名称"
      }, {
        "id": 6,
        "priority": 6,
        "type": "类型6",
        "inName": "查询节点",
        "outName": "输出节点名称"
      }, {
        "id": 7,
        "priority": 7,
        "type": "类型7",
        "inName": "查询节点",
        "outName": "输出节点名称"
      }]
    })
  },
  "openSampleNode": function (req, res) { // 抽样节点
    res.send({
      "id": 123,
      "name": "抽样节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "type": 1,
      "value": 100
    })
  },
  "postSampleSave": function (req, res) {
    res.send({
      "id": 50,
      "name": "抽样节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "type": 1,
      "value": 100
    })
  },
  "openAndNode": function (req, res) { // 交集节点
    res.send({
      "id": 123,
      "name": "交集节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列"
    })
  },
  "postAndSave": function (req, res) {
    res.send({
      "id": 50,
      "name": "交集节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列"
    })
  },
  "openimmediatelyNode": function (req, res) { // 立即营销节点
    res.send({
      "id": 123,
      "name": "立即营销",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "shopName": "淘宝店铺",
      "generatorTime": "2014-04-09 15:04:17",
      "dataSynchronizedStatus": "导入完成"
    })
  },
  "postimmediatelySave": function (req, res) {
    res.send({
      "id": 457,
      "name": "立即营销",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "shopName": "淘宝店铺",
      "generatorTime": "2014-04-09 15:04:17",
      "dataSynchronizedStatus": "导入完成"
    })
  },
  "openCustomerGroupNode": function (req, res) { // 客户分组节点
    res.send({
      "id": 123,
      "name": "客户分组",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "type": "NEW",
      "categoryId": 10,
      "groupName": "分组一",
      "groupId": 233,
      "groupList": [{
        "id": 11,
        "groupName": "分组一",
        "creator": "admin"
      }, {
        "id": 12,
        "groupName": "名称",
        "creator": "admin"
      }, {
        "id": 13,
        "groupName": "这样吧",
        "creator": "admin"
      }],
      "categoryList": [{
        "id": 1,
        "categoryName": "所有分组",
        "open": true,
        "parentId": 0
      }, {
        "id": 2,
        "categoryName": "测试a",
        "open": false,
        "parentId": 1
      }, {
        "id": 4,
        "categoryName": "测试",
        "open": false,
        "parentId": 2
      }, {
        "id": 5,
        "categoryName": "aaa",
        "open": false,
        "parentId": 1
      }, {
        "id": 6,
        "categoryName": "bbbb",
        "open": true,
        "parentId": 1
      }, {
        "id": 7,
        "categoryName": "ddddd",
        "open": true,
        "parentId": 6
      }, {
        "id": 8,
        "categoryName": "yyyyyyyy",
        "open": true,
        "parentId": 1
      }, {
        "id": 9,
        "categoryName": "gggggg",
        "open": true,
        "parentId": 2
      }, {
        "id": 10,
        "categoryName": "未分类",
        "open": true,
        "parentId": 1
      }, {
        "id": 11,
        "categoryName": "bbbbb",
        "open": true,
        "parentId": 2
      }, {
        "id": 12,
        "categoryName": "fgggg",
        "open": false,
        "parentId": 2
      }]
    })
  },
  "postCustomerGroupSave": function (req, res) {
    res.send({
      "id": 456,
      "name": "客户分组",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "shopName": "淘宝店铺",
      "generatorTime": "2014-04-09 15:04:17",
      "dataSynchronizedStatus": "导入完成"
    })
  },
  "openResponseNode": function (req, res) { // 响应组节点
    res.send({
      "id": 123,
      "name": "响应组节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "percent": 0.09,
      "controlType": 1,
      "peopleCount": null
    })
  },
  "openDCLResponseNode": function (req, res) { // 响应组节点
    res.send({
      "control": 0,
      "id": 123,
      "name": "dcl响应组节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "controlType": 1
    })
  },
  "postResponseSave": function (req, res) {
    res.send({
      "id": 456,
      "name": "响应组节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "percent": null,
      "controlType": 2,
      "peopleCount": 1
    })
  },
  "postTargetSave": function (req, res) {
    res.send({
      "id": 456,
      "name": "DCL响应组节点",
      "remark": "备注排除",
      "tips": "只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称）只能导入第一列只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列数据，请确保导入文件第一列数据是客户ID（淘宝昵称） 只能导入第一列",
      "percent": null,
      "controlType": 2,
      "peopleCount": 1
    })
  },
  "getResponseData": function (req, res) { //获取目标组信息
    res.send({
      "authority": true,
      result: [
        ["id", "姓名响应组", "xx", "yy", "姓名", "性别", "生日", "客户全站等级", "淘宝呢称", "手机号", "买家信用等级"],
        ["1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3"],
        ["1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3"],
        ["1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3"]
      ]
    })
  },
  "getTcommunicateOther": function (req, res) {
    res.send({
      "id": 100,
      "name": "线下节点名称",
      "remark": "备注"
    })
  },
  "saveTcommunicateOther": function (req, res) {
    res.send({
      "id": 1,
      "name": "线下节点名称",
      "remark": "备注"
    })
  },
  "saveMarketEffect": function (req, res) {
    res.send({
      "id": 457,
      "name": "营销效果分析节点",
      "remark": "备注"
    });
  },
  "getOpenMarketEffect": function (req, res) {
    res.send({
      "id": 10500342,
      "name": "营销效果分析节点",
      "remark": null,
      "shop_id": null,
      "defaultTypeId": 1,
      "analysisTypeList": [{
        "id": 1,
        "analysis_type_value": "营销"
      }, {
        "id": 2,
        "analysis_type_value": "关怀"
      }, {
        "id": 3,
        "analysis_type_value": "提醒"
      }],
      "analysisTimeType": '2',
      "analysisTimeValue": '2015-2-3',
      "analysisName": null,
      "analysisCont": null
    });
  },
  "getOpenAnalysisOrder": function (req, res) { // 订单分析节点
    res.send({
      "nodeId": 1001,
      "nodeName": "订单分析节点",
      "nodeRemark": "订单分析节点注意",
      "subjectId": "一号店客户",
      "shopVOs": [{
        "shopId": "100571094",
        "shopName": "大狗子19890202"
      }, {
        "shopId": "71677914",
        "shopName": "miaomiaozhu0620"
      }],
      "nodeAnalysisSubjectVOs": [{
        "subjectId": 101,
        "subjectName": "淘宝平台",
        "isSelected": true,
        "segmentationId": 10
      }, {
        "subjectId": 102,
        "subjectName": "京东平台",
        "isSelected": false,
        "segmentationId": 11
      }],
      "nodeAnalysisScreeningVO": []
    })
  },
  "getOpenSelectorOrder": function (req, res) {
    res.send([{
      platCode: "taobao",
      segmentationId: 1,
      subjectId: '淘宝订单'
    },
    {
      platCode: "jos",
      segmentationId: 1,
      subjectId: '京东订单'
    },
    {
      platCode: "edecathlon",
      segmentationId: 2,
      subjectId: '迪卡侬定制'
    }])
  },
  "postAnalysisOrder": function (req, res) {
    res.send({
      "nodeId": 456,
      "nodeName": "订单分析节点",
      "nodeRemark": "订单分析节点注意",
      "subjectId": 101
    });
  },
  "getShopDataPower": function (req, res) {
    res.send({
      "authorityCode": "12"
    });
  },
  "getShopDataBySubjectId": function (req, res) {
    res.send([{
      "shopId": "100571094",
      "shopName": "大狗子19890202",
      "platId": 1
    }, {
      "shopId": "70582239",
      "shopName": "ben1247",
      "platId": 1
    }, {
      "shopId": "71677914",
      "shopName": "miaomiaozhu0620",
      "platId": 1
    }, {
      "shopId": "123456",
      "shopName": "测试店铺6",
      "platId": 1
    }, {
      "shopId": "65927470",
      "shopName": "tomwalk",
      "platId": 1
    }, {
      "shopId": "20140512002",
      "shopName": "店铺testaaaaaaqwweeeeee",
      "platId": 1
    }])
  },
  "getAnalysisOrderItems": function (req, res) {
    res.send({
      "nodeAnalysisQuotaVOs": [{
        "attributeKey": "quota_10001",
        "attributeName": "购买客人数",
        "isChecked": false
      }, {
        "attributeKey": "quota_10002",
        "attributeName": "",
        "isChecked": false
      }, {
        "attributeKey": "quota_10003",
        "attributeName": "购买客人数",
        "isChecked": false
      }, {
        "attributeKey": "quota_10004",
        "attributeName": "购买订单数",
        "isChecked": false
      }, {
        "attributeKey": "quota_10005",
        "attributeName": "购买客人数",
        "isChecked": false
      }, {
        "attributeKey": "quota_10006",
        "attributeName": "购买订单数",
        "isChecked": false
      }],
      "nodeAnalysisDimensionVOs": [{
        "dimensionId": 1,
        "attributeKey": "",
        "name": "汇总",
        "isChecked": true,
        "isDefaultCheck": true
      }, {
        "dimensionId": 2,
        "attributeKey": "normal_143",
        "name": "按商品",
        "isChecked": false
      }, {
        "dimensionId": 3,
        "attributeKey": "function_110",
        "name": "按下单时间",
        "isChecked": false
      }]
    })
  },
  "getAnalysisOrderscreening": function (req, res) {
    res.send({
      "configId": 5,
      "attribute": [{
        "queryItemId": 2207,
        "name": "评价结果",
        "type": "字典单选1",
        "posX": 2,
        "posY": 8,
        "configs": [{
          "id": "bad",
          "open": "true",
          "pId": null,
          "name": "差评"
        }, {
          "id": "good",
          "open": "true",
          "pId": null,
          "name": "好评"
        }, {
          "id": "neutral",
          "open": "true",
          "pId": null,
          "name": "中评"
        }],
        "values": {
          "value": "",
          "img": ""
        }
      }, {
        "queryItemId": 2043,
        "name": "订单备注内容",
        "type": "字符输入",
        "posX": 1,
        "posY": 7,
        "configs": {
          "StringLengthLimit": ["1000"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "value": ""
        }
      }, {
        "queryItemId": 2006,
        "name": "分期付款订单状态",
        "type": "字典单选2",
        "posX": 1,
        "posY": 4,
        "configs": [{
          "id": "FRONT_NOPAID_FINAL_NOPAID",
          "open": "true",
          "pId": null,
          "name": "未付订金"
        }, {
          "id": "FRONT_PAID_FINAL_NOPAID",
          "open": "true",
          "pId": null,
          "name": "已付订金未付尾款"
        }],
        "values": {
          "value": "",
          "img": ""
        }
      }, {
        "queryItemId": 2108,
        "name": "子订单状态",
        "type": "树形多选",
        "posX": 1,
        "posY": 3,
        "configs": [{
          "id": "WAIT_BUYER_PAY",
          "open": "true",
          "pId": null,
          "name": "等待买家付款"
        }, {
          "id": "WAIT_SELLER_SEND_GOODS",
          "open": "true",
          "pId": null,
          "name": "等待卖家发货,即:买家已付款"
        }, {
          "id": "SELLER_CONSIGNED_PART",
          "open": "true",
          "pId": null,
          "name": "卖家部分发货"
        }, {
          "id": "WAIT_BUYER_CONFIRM_GOODS",
          "open": "true",
          "pId": null,
          "name": "等待买家确认收货,即:卖家已发货"
        }, {
          "id": "TRADE_BUYER_SIGNED",
          "open": "true",
          "pId": null,
          "name": "买家已签收,货到付款专用"
        }, {
          "id": "TRADE_FINISHED",
          "open": "true",
          "pId": null,
          "name": "交易成功"
        }, {
          "id": "TRADE_CLOSED_BY_TAOBAO",
          "open": "true",
          "pId": null,
          "name": "付款以前，卖家或买家主动关闭交易"
        }, {
          "id": "TRADE_CLOSED",
          "open": "true",
          "pId": null,
          "name": "付款以后用户退款成功，交易自动关闭"
        }],
        "values": {
          "value": "",
          "view": ""
        }
      }, {
        "queryItemId": 2012,
        "name": "发货时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 3,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": {
          "type": "absolutely",
          "value": ","
        }
      }, {
        "queryItemId": 2044,
        "name": "订单备注旗帜",
        "type": "字典单选1",
        "posX": 1,
        "posY": 6,
        "configs": [{
          "id": "1",
          "open": "true",
          "pId": null,
          "name": "<img class='imgBanner' src='/app/images/redBanner.png' />"
        }, {
          "id": "2",
          "open": "true",
          "pId": null,
          "name": "<img class='imgBanner' src='/app/images/yellowBanner.png' />"
        }, {
          "id": "3",
          "open": "true",
          "pId": null,
          "name": "<img class='imgBanner' src='/app/images/greenBanner.png' />"
        }, {
          "id": "4",
          "open": "true",
          "pId": null,
          "name": "<img class='imgBanner' src='/app/images/blueBanner.png' />"
        }, {
          "id": "5",
          "open": "true",
          "pId": null,
          "name": "<img class='imgBanner' src='/app/images/purpleBanner.png' />"
        }],
        "values": {
          "value": "",
          "img": ""
        }
      }, {
        "queryItemId": 2004,
        "name": "结束时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 4,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": {
          "type": "absolutely",
          "value": ","
        }
      }, {
        "queryItemId": 2011,
        "name": "单笔订单邮费",
        "type": "数字输入",
        "posX": 0,
        "posY": 8,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputPrecision": ["2"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"]
        },
        "values": {
          "value": "",
          "operator": "等于"
        }
      }, {
        "queryItemId": 2315,
        "name": "退款原因",
        "type": "字符输入",
        "posX": 0,
        "posY": 14,
        "configs": {
          "StringLengthLimit": ["50"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "value": ""
        }
      }, {
        "queryItemId": 2121,
        "name": "商品成交时名称",
        "type": "关键字定制",
        "posX": 2,
        "posY": 3,
        "configs": {
          "StringLengthLimit": ["255"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "relation": "AND",
          "value": ""
        }
      }, {
        "queryItemId": 2402,
        "name": "订单参与优惠名称",
        "type": "字符输入",
        "posX": 0,
        "posY": 9,
        "configs": {
          "StringLengthLimit": ["50"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "value": ""
        }
      }, {
        "queryItemId": 2307,
        "name": "退款时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 11,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": {
          "type": "absolutely",
          "value": ","
        }
      }, {
        "queryItemId": 2133,
        "name": "买家是否已评价",
        "type": "字典单选1",
        "posX": 2,
        "posY": 6,
        "configs": [{
          "id": "0",
          "open": "true",
          "pId": null,
          "name": "未评价"
        }, {
          "id": "1",
          "open": "true",
          "pId": null,
          "name": "已评价"
        }],
        "values": {
          "value": "",
          "img": ""
        }
      }, {
        "queryItemId": 2005,
        "name": "主订单状态",
        "type": "树形多选",
        "posX": 1,
        "posY": 2,
        "configs": [{
          "id": "WAIT_BUYER_PAY",
          "open": "true",
          "pId": null,
          "name": "等待买家付款"
        }, {
          "id": "WAIT_SELLER_SEND_GOODS",
          "open": "true",
          "pId": null,
          "name": "等待卖家发货,即:买家已付款"
        }, {
          "id": "SELLER_CONSIGNED_PART",
          "open": "true",
          "pId": null,
          "name": "卖家部分发货"
        }, {
          "id": "WAIT_BUYER_CONFIRM_GOODS",
          "open": "true",
          "pId": null,
          "name": "等待买家确认收货,即:卖家已发货"
        }, {
          "id": "TRADE_BUYER_SIGNED",
          "open": "true",
          "pId": null,
          "name": "买家已签收,货到付款专用"
        }, {
          "id": "TRADE_FINISHED",
          "open": "true",
          "pId": null,
          "name": "交易成功"
        }, {
          "id": "TRADE_CLOSED_BY_TAOBAO",
          "open": "true",
          "pId": null,
          "name": "付款以前，卖家或买家主动关闭交易"
        }, {
          "id": "TRADE_CLOSED",
          "open": "true",
          "pId": null,
          "name": "付款以后用户退款成功，交易自动关闭"
        }],
        "values": {
          "value": "",
          "view": ""
        }
      }, {
        "queryItemId": 2134,
        "name": "子订单快递公司",
        "type": "字符输入",
        "posX": 1,
        "posY": 12,
        "configs": {
          "StringLengthLimit": ["200"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "value": ""
        }
      }, {
        "queryItemId": 2008,
        "name": "订单类型",
        "type": "字典单选2",
        "posX": 1,
        "posY": 1,
        "configs": [{
          "id": "auction",
          "open": "true",
          "pId": null,
          "name": "拍卖"
        }, {
          "id": "auto_delivery",
          "open": "true",
          "pId": null,
          "name": "自动发货"
        }, {
          "id": "cod",
          "open": "true",
          "pId": null,
          "name": "货到付款"
        }, {
          "id": "ec",
          "open": "true",
          "pId": null,
          "name": "直冲"
        }, {
          "id": "external_trade",
          "open": "true",
          "pId": null,
          "name": "统一外部交易"
        }, {
          "id": "fenxiao",
          "open": "true",
          "pId": null,
          "name": "分销"
        }, {
          "id": "fixed",
          "open": "true",
          "pId": null,
          "name": "一口价"
        }, {
          "id": "game_equipment",
          "open": "true",
          "pId": null,
          "name": "游戏装备"
        }, {
          "id": "guarantee_trade",
          "open": "true",
          "pId": null,
          "name": "一口价、拍卖"
        }, {
          "id": "independent_shop_trade",
          "open": "true",
          "pId": null,
          "name": "旺店标准版交易"
        }, {
          "id": "independent_simple_trade",
          "open": "true",
          "pId": null,
          "name": "旺店入门版交易"
        }, {
          "id": "netcn_trade",
          "open": "true",
          "pId": null,
          "name": "万网交易"
        }, {
          "id": "shopex_trade",
          "open": "true",
          "pId": null,
          "name": "ShopEX交易"
        }, {
          "id": "step",
          "open": "true",
          "pId": null,
          "name": "万人团"
        }],
        "values": {
          "value": "",
          "img": ""
        }
      }, {
        "queryItemId": 2313,
        "name": "单笔订单退款金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 13,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputPrecision": ["2"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"]
        },
        "values": {
          "value": "",
          "operator": "等于"
        }
      }, {
        "queryItemId": 2003,
        "name": "下单时间",
        "type": "时间选择",
        "posX": 0,
        "posY": 1,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": {
          "type": "absolutely",
          "value": "2014-06-13 00:00,"
        }
      }, {
        "queryItemId": 2135,
        "name": "子订单运单号",
        "type": "字符输入",
        "posX": 1,
        "posY": 11,
        "configs": {
          "StringLengthLimit": ["50"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "value": ""
        }
      }, {
        "queryItemId": 2212,
        "name": "评价内容",
        "type": "关键字定制",
        "posX": 2,
        "posY": 10,
        "configs": {},
        "values": {
          "relation": "AND",
          "value": ""
        }
      }, {
        "queryItemId": 2111,
        "name": "购买商品",
        "type": "商品选择",
        "posX": 2,
        "posY": 2,
        "configs": {
          "StringLengthLimit": ["50"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "fillProductValue": "",
          "storeProductId": ""
        }
      }, {
        "queryItemId": 2131,
        "name": "SKU名称",
        "type": "关键字定制",
        "posX": 2,
        "posY": 4,
        "configs": {
          "StringLengthLimit": ["2000"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "relation": "AND",
          "value": ""
        }
      }, {
        "queryItemId": 3963,
        "name": "评价字数",
        "type": "数字输入",
        "posX": 2,
        "posY": 9,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于"],
          "NumberInputPrecision": ["0"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "1000"]
        },
        "values": {
          "value": "",
          "operator": "等于"
        }
      }, {
        "queryItemId": 2016,
        "name": "单笔订单实付金额",
        "type": "数字输入",
        "posX": 0,
        "posY": 6,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputPrecision": ["2"],
          "NumberInputType": ["Float"],
          "NumberInputRange": ["0", "9999999.99"]
        },
        "values": {
          "value": "",
          "operator": "等于"
        }
      }, {
        "queryItemId": 2042,
        "name": "买家留言",
        "type": "字符输入",
        "posX": 1,
        "posY": 8,
        "configs": {
          "StringLengthLimit": ["1000"],
          "StringType": ["等于", "不等于", "包含", "不包含", "以字符开头", "以字符结尾"]
        },
        "values": {
          "value": ""
        }
      }, {
        "queryItemId": 2132,
        "name": "卖家是否已评价",
        "type": "字典单选1",
        "posX": 2,
        "posY": 7,
        "configs": [{
          "id": "0",
          "open": "true",
          "pId": null,
          "name": "未评价"
        }, {
          "id": "1",
          "open": "true",
          "pId": null,
          "name": "已评价"
        }],
        "values": {
          "value": "",
          "img": ""
        }
      }, {
        "queryItemId": 2040,
        "name": "单笔订单商品数量",
        "type": "数字输入",
        "posX": 0,
        "posY": 7,
        "configs": {
          "NumberType": ["等于", "不等于", "大于", "大于等于", "小于", "小于等于", "介于"],
          "NumberInputPrecision": ["0"],
          "NumberInputType": ["Int"],
          "NumberInputRange": ["0", "99999"]
        },
        "values": {
          "value": "",
          "operator": "等于"
        }
      }, {
        "queryItemId": 2009,
        "name": "付款时间",
        "type": "日期选择",
        "posX": 0,
        "posY": 2,
        "configs": {
          "TimeSupportRelative": ["Support"],
          "DatetimeType": ["早于", "晚于", "介于"]
        },
        "values": {
          "type": "absolutely",
          "value": ","
        }
      }, {
        "queryItemId": 2007,
        "name": "交易来源",
        "type": "树形多选",
        "posX": 2,
        "posY": 1,
        "configs": [{
          "id": "HITAO",
          "open": "true",
          "pId": null,
          "name": "嗨淘"
        }, {
          "id": "JHS",
          "open": "true",
          "pId": null,
          "name": "聚划算"
        }, {
          "id": "TAOBAO",
          "open": "true",
          "pId": null,
          "name": "普通淘宝"
        }, {
          "id": "TOP",
          "open": "true",
          "pId": null,
          "name": "TOP平台"
        }, {
          "id": "WAP",
          "open": "true",
          "pId": null,
          "name": "手机"
        }],
        "values": {
          "value": "",
          "view": ""
        }
      }, {
        "queryItemId": 2310,
        "name": "退款状态",
        "type": "字典单选2",
        "posX": 0,
        "posY": 12,
        "configs": [{
          "id": "CLOSED",
          "open": "true",
          "pId": null,
          "name": "退款关闭"
        }, {
          "id": "SELLER_REFUSE_BUYER",
          "open": "true",
          "pId": null,
          "name": "卖家拒绝退款"
        }, {
          "id": "SUCCESS",
          "open": "true",
          "pId": null,
          "name": "退款成功"
        }, {
          "id": "WAIT_BUYER_RETURN_GOODS",
          "open": "true",
          "pId": null,
          "name": "卖家已经同意退款，等待买家退货"
        }, {
          "id": "WAIT_SELLER_AGREE",
          "open": "true",
          "pId": null,
          "name": "买家已经申请退款，等待卖家同意"
        }, {
          "id": "WAIT_SELLER_CONFIRM_GOODS",
          "open": "true",
          "pId": null,
          "name": "买家已经退货，等待卖家确认收货"
        }],
        "values": {
          "value": "",
          "img": ""
        }
      }]
    })
  },
  "getResponseTabListTitle": function (req, res) {
    res.send([{
      "resultId": 1,
      "displayName": "汇总",
      "nodeAnalysisResultsTabThVOs": [{
        "displayName": "购买客人数",
        "dataindex": "779",
        "orderId": 101
      }, {
        "displayName": "购买订单数",
        "dataindex": "782",
        "orderId": 102
      }, {
        "displayName": "购买次数",
        "dataindex": "785",
        "orderId": 103
      }, {
        "displayName": "购买金额",
        "dataindex": "788",
        "orderId": 104
      }, {
        "displayName": "购买件数",
        "dataindex": "790",
        "orderId": 105
      }, {
        "displayName": "平均每人购买次数",
        "dataindex": "780",
        "orderId": 106
      }, {
        "displayName": "平均每人购买金额",
        "dataindex": "783",
        "orderId": 107
      }, {
        "displayName": "平均每人购买件数",
        "dataindex": "786",
        "orderId": 108
      }, {
        "displayName": "平均每单购买金额",
        "dataindex": "781",
        "orderId": 109
      }, {
        "displayName": "平均每单购买件数",
        "dataindex": "784",
        "orderId": 110
      }, {
        "displayName": "平均每次购买金额",
        "dataindex": "787",
        "orderId": 111
      }, {
        "displayName": "平均每次购买件数",
        "dataindex": "789",
        "orderId": 112
      }]
    }, {
      "resultId": 2,
      "displayName": "商品",
      "nodeAnalysisResultsTabThVOs": [{
        "displayName": "商品ID2",
        "dataindex": "normal_161"
      }, {
        "displayName": "商品名称2",
        "dataindex": "normal_162"
      }, {
        "displayName": "商品外部编码2",
        "dataindex": "normal_163"
      }, {
        "displayName": "购买客人数",
        "dataindex": "function_13"
      }]
    }, {
      "resultId": 3,
      "displayName": "下单时间",
      "nodeAnalysisResultsTabThVOs": [{
        "displayName": "商品ID3",
        "dataindex": "normal_161"
      }, {
        "displayName": "商品名称",
        "dataindex": "normal_162"
      }, {
        "displayName": "商品外部编码",
        "dataindex": "normal_163"
      }, {
        "displayName": "购买客人数",
        "dataindex": "function_13"
      }]
    }])
  },
  "checkFile": function (req, res) {
    res.send({
      existFile: "true"
    })
  },
  "getResponseDataByDimensionId": function (req, res) {
    res.send({
      "total": 1,
      "page": 1,
      "pageSize": 20,
      "data": [{
        "790": "3",
        "781": "11.11",
        "782": "1",
        "783": "11.11",
        "784": "3.00",
        "785": "1",
        "786": "3.00",
        "787": "11.11",
        "788": "11.11",
        "789": "3.00",
        "779": "1",
        "780": "1.00"
      }]
    })
  },

  "impreserch": function (req, res) {
    var id = req.params.id
    res.send({
      "id": id,
      "name": "导入查询",
      "remark": null,
      "subjects": [{
        "id": 1,
        "name": "1淘宝客户"
      }, {
        "id": 201,
        "name": "201微旺铺客户"
      }, {
        "id": 101,
        "name": "101京东客户"
      }, {
        "id": 401,
        "name": "401一号店客户"
      }, {
        "id": 20001,
        "name": "20001移动客户"
      }],
      "defaultSubject": 201,
      "batch": [{
        "id": 389,
        "name": "为空分号"
      }, {
        "id": 399,
        "name": "繁体字"
      }]
    })

  },
  "searchGrid": function (req, res) {
    var page = req.query.page
    var pageSize = req.query.pagesize
    res.send({
      "total": 103,
      "page": page,
      "pageSize": pageSize,
      "data": [{
        "id": 388,
        "platName": "淘宝客户",
        "batchName": "字段为空值388",
        "importTime": "2014-9-10 17:17:40",
        "operator": "KJ"
      }, {
        "id": 389,
        "platName": "淘宝客户",
        "batchName": "字段为空值分号389",
        "importTime": "2014-9-10 17:23:33",
        "operator": "KJ"
      }, {
        "id": 390,
        "platName": "淘宝客户",
        "batchName": "为空分号390",
        "importTime": "2014-9-10 18:08:03",
        "operator": "KJ"
      }, {
        "id": 391,
        "platName": "淘宝客户",
        "batchName": "繁体字391",
        "importTime": "2014-9-10 18:23:08",
        "operator": "KJ"
      }, {
        "id": 392,
        "platName": "淘宝客户",
        "batchName": "字段有效性校验392",
        "importTime": "2014-9-10 18:24:07",
        "operator": "KJ"
      }, {
        "id": 393,
        "platName": "淘宝客户",
        "batchName": "字段有效性校验393",
        "importTime": "2014-9-10 18:24:07",
        "operator": "KJ"
      }, {
        "id": 394,
        "platName": "淘宝客户",
        "batchName": "字段有效性校验394",
        "importTime": "2014-9-10 18:24:07",
        "operator": "KJ"
      }, {
        "id": 395,
        "platName": "淘宝客户",
        "batchName": "字段有效性校验395",
        "importTime": "2014-9-10 18:24:07",
        "operator": "KJ"
      }, {
        "id": 396,
        "platName": "淘宝客户",
        "batchName": "字段有效性校验396",
        "importTime": "2014-9-10 18:24:07",
        "operator": "KJ"
      }, {
        "id": 397,
        "platName": "淘宝客户",
        "batchName": "字段有效性校验397",
        "importTime": "2014-9-10 18:24:07",
        "operator": "KJ"
      }]
    })
  },

  "impreserchSave": function (req, res) {
    /* console.log("a222222",req.body)*/
    var name = req.body.name
    var id = req.body.id
    res.send({
      "id": id,
      "name": name,
      "remark": null,
      "subjects": [{
        "id": 1,
        "name": "淘宝客户"
      }, {
        "id": 201,
        "name": "微旺铺客户"
      }, {
        "id": 101,
        "name": "京东客户"
      }, {
        "id": 401,
        "name": "一号店客户"
      }, {
        "id": 20001,
        "name": "移动客户"
      }],
      "defaultSubject": 1,
      "batch": [{
        "id": 389,
        "name": "为空分号"
      }, {
        "id": 399,
        "name": "繁体字"
      }]
    })

  },

  "behavior": function (req, res) {
    var endDate = new Date()
    var starDate = new Date(endDate.getTime() - 3 * 24 * 60 * 60 * 1000)
    var starDate = starDate.getFullYear() + "-" + (starDate.getMonth() * 1 + 1) + "-" + starDate.getDate()
    var endDate = endDate.getFullYear() + "-" + (endDate.getMonth() * 1 + 1) + "-" + endDate.getDate()
    var data = {
      "id": 123,
      "name": "访问查询",
      "shopId": null,
      "shopName": null,
      "timeType": 1,
      "starttime": "2014-01-04",
      "endtime": "2014-01-08",
      "begin": 6,
      "end": 1,
      "pc": true,
      "wireless": true,
      "favoriteGoods": true,
      "favoriteShops": true,
      //"version": 10010,
      "snapshots": [{
        "id": 123,
        "topValue": 2
      }, {
        "id": 123,
        "topValue": 3
      }]
    }
    if (this.behaviorNode) {
      res.send(this.behaviorNode)
    } else {
      res.send(data)
    }


  },
  "getTBShops": function (req, res) {
    var data1 = [{
      "idInPlat": 1243,
      "name": "tomwalk"
    }, {
      "idInPlat": 123,
      "name": "sjowow"
    }]
    res.send(data1)

  },
  "heat": function (req, res) {
    if (!this.heatNode) {
      this.heatNode = {
        "id": 123,
        "name": "营销热度查询",
        "shopId": null,
        "shopName": null,
        "grades": null
      }
      res.send(this.heatNode)
    } else {
      res.send(this.heatNode)

    }


  },
  "heatgetTBShops": function (req, res) {
    var data = [{
      "idInPlat": 1223,
      "name": "heat1"
    }, {
      "idInPlat": 123,
      "name": "heat2"
    }]
    res.send(data)
  },
  "behaviorGetTop5": function (req, res) {
    var data1 = [{
      "picurl": "http://img01.taobaocdn.com/imgextra/i1/168417313/T2.we1XlRaXXXXXXXX_!!168417313.jpg",
      "title": "雪花半指室内多色手套",
      "id": "123",
      "price": 122.3,
      "num": 200,
      "detailurl": "http://item.taobao.com/item.htm?id=39654336920&ali_refid=a3_420961_1006:1107568894:6:%BB%DD%C8%CB+hu-600wn%D5%A5%D6%AD%BB%FA:85f751524d8630a9a7a7a7816ce9d14f&ali_trackid=1_85f751524d8630a9a7a7a7816ce9d14f&spm=a310e.2169749.5642501.1.ZWCubU"
    }, {
      "picurl": "http://img01.taobaocdn.com/imgextra/i1/168417313/T2.we1XlRaXXXXXXXX_!!168417313.jpg",
      "title": "雪花半指室内多色手套",
      "id": "123",
      "price": 122.3,
      "num": 200,
      "detailurl": "http://item.taobao.com/item.htm?id=39654336920&ali_refid=a3_420961_1006:1107568894:6:%BB%DD%C8%CB+hu-600wn%D5%A5%D6%AD%BB%FA:85f751524d8630a9a7a7a7816ce9d14f&ali_trackid=1_85f751524d8630a9a7a7a7816ce9d14f&spm=a310e.2169749.5642501.1.ZWCubU"
    }, {
      "picurl": "http://img01.taobaocdn.com/imgextra/i1/168417313/T2.we1XlRaXXXXXXXX_!!168417313.jpg",
      "title": "雪花半指室内多色手套",
      "id": "123",
      "price": 122.3,
      "num": 200,
      "detailurl": "http://item.taobao.com/item.htm?id=39654336920&ali_refid=a3_420961_1006:1107568894:6:%BB%DD%C8%CB+hu-600wn%D5%A5%D6%AD%BB%FA:85f751524d8630a9a7a7a7816ce9d14f&ali_trackid=1_85f751524d8630a9a7a7a7816ce9d14f&spm=a310e.2169749.5642501.1.ZWCubU"
    }, {
      "picurl": "http://img01.taobaocdn.com/imgextra/i1/168417313/T2.we1XlRaXXXXXXXX_!!168417313.jpg",
      "title": "雪花半指室内多色手套",
      "id": "123",
      "price": 122.3,
      "num": 200,
      "detailurl": "http://item.taobao.com/item.htm?id=39654336920&ali_refid=a3_420961_1006:1107568894:6:%BB%DD%C8%CB+hu-600wn%D5%A5%D6%AD%BB%FA:85f751524d8630a9a7a7a7816ce9d14f&ali_trackid=1_85f751524d8630a9a7a7a7816ce9d14f&spm=a310e.2169749.5642501.1.ZWCubU"
    }, {
      "picurl": "http://img01.taobaocdn.com/imgextra/i1/168417313/T2.we1XlRaXXXXXXXX_!!168417313.jpg",
      "title": "雪花半指室内多色手套",
      "id": "123",
      "price": 122.3,
      "num": 200,
      "detailurl": "http://item.taobao.com/item.htm?id=39654336920&ali_refid=a3_420961_1006:1107568894:6:%BB%DD%C8%CB+hu-600wn%D5%A5%D6%AD%BB%FA:85f751524d8630a9a7a7a7816ce9d14f&ali_trackid=1_85f751524d8630a9a7a7a7816ce9d14f&spm=a310e.2169749.5642501.1.ZWCubU"
    }]
    res.send(data1)
  },
  'featuranalysisItems': function (req, res) {
    setTimeout(function () {
      res.send({
        "data": [{ "id": 10001, "name": "基本信息", "dataType": "C", "pId": 0 }, {
          "id": 10002, "name": "会员等级", "dataType": "C", "pId"
            : 0
        }, { "id": 10003, "name": "性别", "dataType": "I", "pId": 10001 }, {
          "id": 10004, "name": "年龄", "dataType": "I", "pId"
            : 10001
        }, { "id": 3, "name": "所在地区（省）", "dataType": "I", "pId": 10001 }, {
          "id": 10006, "name": "淘宝全站VIP等级", "dataType"
            : "I", "pId": 10001
        }, { "id": 5, "name": "信用等级", "dataType": "I", "pId": 10001 }, { "id": 20150203170, "name": "商品选择器测试真实店铺59568783", "dataType": "I", "pId": 10002 }, {
          "id": 20150203171, "name": "哈妹爱卖什么就卖什么", "dataType": "I", "pId"
            : 10002
        }]
      });
    }, 2000)

  },
  'featuranalysis': function (req, res) {
    res.send({
      "id": 1,
      "name": "",
      "analysisItems": null,
      "hasReport": "true",
      "remark": ""
    });
  },
  'featuranalysisData': function (req, res) {
    var response = {};
    var itemId = /(\d+)\/\d+\/report/g.exec(req.url)[1];
    if (itemId == 2) {
      response = {
        "showType": "02",
        "title": "客户年龄分析",
        "feature": ["年龄", "活动名称", "客户占比"],
        "data": {
          "conditions": ["未知", "20以下", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "50以上"],
          "counts": ["50", "43", "22", "456", "43", "2", "15", "72", "28"],
          "percents": ["23.2", "43.5", "22", "456", "43", "2", "15", "72", "28"]
        }
      }
    } else if (itemId == 5) {
      response = {
        "showType": "01",
        "title": "淘宝全站VIP等级分析", //报表标题
        "feature": "淘宝全站VIP等级", //平面图时为表格标题字段；横向柱状图中为固定的y轴；竖向柱状图中为固定的x轴
        "data": {
          "conditions": ["未知", "VIP1", "VIP2", "VIP3", "VIP4", "未知", "VIP1", "VIP2", "VIP3", "VIP4", "未知11", "VIP1", "VIP2", "VIP3", "VIP4", "未知12", "VIP1", "VIP2", "VIP3", "VIP4"],
          "counts": ["50", "43", "22", "456", "43", "50", "43", "22", "456", "43", "50", "43", "22", "456", "43", "50", "43", "22", "456", "43", "50", "43", "22", "456", "43"], //计数
          "percents": ["23.2", "43.5", "22", "45.6", "43"] //百分比
        }
      }
    } else if (itemId == 3) {
      response = {
        "showType": "04",
        "title": "所在地区分析",
        "feature": "所在地区分析",
        "data": {
          "conditions": ["上海市", "吉林省", "天津市", "安徽省", "山东省", "山西省", "新疆维吾尔自治区", "河北省", "河南省", "湖南省"],
          "counts": ["10", "23", "32", "46", "53", "60", "70", "80", "90", "100"], //计数
          "percents": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] //百分比
        }
      }
    } else {
      response = {
        "showType": "02",
        "title": "客户年龄分析",
        "feature": ["年龄", "活动名称", "客户占比"],
        "data": {
          "conditions": ["未知", "20以下", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "50以上"],
          "counts": ["50", "43", "22", "456", "43", "2", "15", "72", "28"],
          "percents": ["23.2", "43.5", "22", "456", "43", "2", "15", "72", "28"]
        }
      }
    }
    res.send(response);
  },
  // 查询标签
  'getUnionlabelNode': function (req, res) {
    res.send({
      "nodeUnionLabel": {
        "id": 10,
        "unionLabels": [{
          "typeEng": "platform",
          "typeZh": "平台",
          "values": [{
            "typeEng": "taobao",
            "typeZh": "淘宝"
          }, {
            "typeEng": "jd",
            "typeZh": "京东"
          }, {
            "typeEng": "paipai",
            "typeZh": "拍拍"
          }]
        }, {
          "typeEng": "job",
          "typeZh": "工作",
          "values": [{
            "typeEng": "school",
            "typeZh": "学校"
          }, {
            "typeEng": "floor",
            "typeZh": "地下室"
          }]
        }],
        "shopId": 100571094,
        "shopName": '店铺A',
        "subjectId": 101,
        "remark": "",
        "name": "联合标签"
      },
      "subjects": [{
        "id": 1,
        "name": "淘宝客户",
        "segmentationId": 1
      }, {
        "id": 101,
        "name": "京东客户",
        "segmentationId": 101
      }],
      "enabled": {
        "status": "ENABLED",
        "createdAt": "2015-09-06T08:01:23",
        "finishAt": "2015-09-07 09:00:00"
      }
    })
  },
  'getUnionlabelData': function (req, res) {
    res.send({
      "shops": [{
        "id": "1000000",
        "name": "测试店铺1"
      }, {
        "id": "2000000",
        "name": "测试店铺2"
      }],
      "labels": [{
        "typeEng": "platform",
        "typeZh": "平台",
        "values": [{
          "typeEng": "taobao",
          "typeZh": "淘宝"
        }, {
          "typeEng": "jd",
          "typeZh": "京东"
        }]
      }, {
        "typeEng": "job",
        "typeZh": "工作",
        "values": [{
          "typeEng": "school",
          "typeZh": "学校"
        }, {
          "typeEng": "mall",
          "typeZh": "商场"
        }]
      }]
    })
  },
  'toggleEnabled': function (req, res) {
    res.send({
      "status": "ENABLED",
      "createdAt": "2015-09-06T08:01:23",
      "finishAt": "2015-09-07T09:00:00"
    })
  },
  'putUnionlabelData': function (req, res) {
    res.send({
      "status": "ENABLED",
      "createdAt": "2015-09-06T08:01:23",
      "finishAt": "2015-09-07T09:00:00"
    })
  },
  'getOptout': function (req, res) {
    res.send(true)
  }
};
