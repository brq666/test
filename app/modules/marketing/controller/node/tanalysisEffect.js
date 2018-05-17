;angular.module('campaign.controllers').controller('tfilterTrack', ['$scope', 'getListService', '$compile', '$http', '$timeout', '$interval','$q', function ($scope, getListService, $compile, $http, $timeout, $interval,$q) {
  $scope.openNodePop();//显示节点弹出框

  $scope.echart = echarts.init(document.getElementById('mainselecttimegird'));
  var timer1 = null;
  var timer2 = null;
  var timer3 = null;
  var timer4 = null;

  $scope.effectTrack = {
    "newarr": [],
    "tips": "",
    "shopList": [],
    "shopId": "",
    "shopName": "",
    "shopSelectErr": false,
    "startTime": "",
    "day": "1",
    "name": "",
    "totalNumber": "-",
    "deadline": "-",
    "orderNumber": "-",
    "orderAmount": "-",
    "placeOrder": "-",
    "orderCommodity": "-",
    "PaymentNumber": "-",
    "PaymentAmount": "-",
    "PaymentOrder": "-",
    "PaymentCommodity": "-",
    "timeselects": "订单金额",
    "legendleft": "下单金额",
    "legendright": "付款金额",
    "defaultshopname":"",
    "defaultshopid":'',
    "showdata": true,
    "time": "",
    "timeonoff": true,
    "isdefault": null,
    init: function () {
      var _this = this;

      getListService.getShopsByPlatformId(function (response) { //获取店铺数据
        _this.shopList = response;
        if(response.length == 1 && !_this.shopName){
          _this.shopName = response[0].name;
          _this.shopId = response[0].idInPlat;
        }
      }, 1);

      getListService.getNodeTipsByType(function (responseTips) { // 获取tips
        _this.tips = responseTips.tips || "";
      }, "tanalysisEffect");

      getListService.openDiscountTrack(function (response) { //初始化数据
        _this.name = response.name || "效果跟踪";
        _this.id = response.id;
        $scope.nodecomment = response.remark || "";
        if(response.shopId){
          _this.shopId = response.shopId;
          _this.shopName = response.shopName;
        }
        _this.startTime = response.startTime || "";
        _this.day = response.duration || 1;
        _this.isdefault = response.bdefault;
        if (response.bdefault) {
          var datatime = Date.parse(_this.startTime);
        }
        else {
          var datatime = NaN;
        }
        var nowTimes = new Date();

        if (response.shopId) {
          _this.timeonoff = false;
        }

        if(response.bdefault){
          $('.relativeBox input').attr('disabled', 'disabled');
          $('.trackstartime').attr('disabled', 'disabled');
          $('.trackkeep').attr('disabled', 'disabled');
          $('.trackarrowup').hide();
          $('.trackarrowdown').hide();
          $('.effectfinish').show();
          $('#marketSure').css({'background':'#8a8a8a'})
        }

        if (Date.parse(nowTimes) >= datatime && response.bdefault) {
          if( $(window).height() > 777 ){
            var contentHeight = ($(window).height() - 776) / 2
            $('#nodeContent').css({'top': contentHeight+'px'})
          }
          else{
            $('#nodeContent').css({'top': '0px'})
          }
          $('#nodeContent').css({'height': '776px'})
          $('.relativeBox input').attr('disabled', 'disabled');
          $('.relativeBox a').hide();
          $('.trackstartime').attr('disabled', 'disabled');
          $('.trackkeep').attr('disabled', 'disabled');
          $('.trackarrowup').hide();
          $('.trackarrowdown').hide();
          $('.dataSummary').show();
          $('.trackselecttimegird').show();
          $('.trackselect').show();
          $('.dataEmpty').hide();
          $scope.change();
          _this.createX();
          $scope.updatetime();
        }
        else {
          //$('#nodeContent').css({'top': '180px'})
          $('#nodeContent').css({'height': '428px'})
          $('.dataSummary').hide();
          $('.dataEmpty').show();
          $('.trackselecttimegird').hide();
          $('.trackselect').hide();
          if (response.startTime && response.bdefault) {
            var nowtime2 = new Date();
            var timeditch = Date.parse(response.startTime) - Date.parse(nowtime2)
            timer4 = $timeout(function () {
              _this.init();
            }, timeditch)
          }
        }
      })
    },
    openShopList: function () {
      var _this = this;
      $(".queryShopsPop").addInteractivePop({
        magTitle: "请选择店铺",
        width: 734,
        mark: false,
        position: "fixed",
        childElePop: true
      });
      angular.forEach(_this.shopList, function (val, index) {
        if (val.idInPlat == _this.shopId) {
          $('.shopsChecked li').eq(index).addClass('cur');
        }
        else {
          $('.shopsChecked li').eq(index).removeClass('cur');
        }
      })
    },
    sureAddShop: function () {
      var _this = this;
      var curElement = angular.element(".shopsChecked .cur a");
      if (curElement.length == 0) {
        _this.shopName = "请选择店铺";
        _this.shopId = "";
        _this.shopSelectErr = true;
      } else {
        _this.shopName = curElement.text();
        _this.shopId = curElement.attr("id");
        _this.shopSelectErr = false;
      }
    },
    addNum: function (e) {
      var _this = this;
      _this.day++;
      if (_this.day == 2) {
        //$('.trackarrowdown').css({'background-image':"url(../../../../images/order/arrowdown.png)"});
        $('.trackarrowdown').addClass('trackarrowdownerror');
      }
      if (_this.day >= 3) {
        _this.day = 3;
        //$('.trackarrowup').css({'background-image':"url(../../../../images/order/arrowuperror.png)"});
        $('.trackarrowup').addClass('trackarrowuperror')
      }
    },
    minNum: function () {
      var _this = this;
      _this.day--;
      if (_this.day == 2) {
        //$('.trackarrowup').css({'background-image':"url(../../../../images/order/arrowup.png)"});
        $('.trackarrowup').removeClass('trackarrowuperror')
      }
      if (_this.day <= 1) {
        _this.day = 1;
        //$('.trackarrowdown').css({'background-image':"url(../../../../images/order/arrowdownerror.png)"});
        $('.trackarrowdown').removeClass('trackarrowdownerror')
      }
    },
    "searchButtonClick": function (hdVal) {
      var curGridElement;
      curGridElement = angular.element("#listTrackGrid")[0];
      if (!hdVal) {
        hdVal = '';
      }
      curGridElement.p.qtype = "keywords";
      curGridElement.p.query = hdVal;
      curGridElement.p.newp = 1;
      curGridElement.grid.populate();
    },
    "timetrack": function (e) {
      var This = e.target;
      $(This).addClass('active').siblings().removeClass('active');
      $('.trackselecttimegird').show();
      $('.trackselectgrid').hide();
      $('.trackselectsteptwo').show();
      $('.commSearch').hide();
    },
    "listtrack": function (e) {
      var This = e.target;
      $(This).addClass('active').siblings().removeClass('active');
      $('.trackselecttimegird').hide();
      $('.trackselectgrid').show();
      $('.trackselectsteptwo').hide();
      $('.commSearch').show();
      $scope.hdValue = '';

      if (this.showdata) {
        $('#listTrackGrid').flexigrid({ //按商品跟踪列表grid
          url: GLOBAL_STATIC.nodeRoot + 'node/effecttracking/report/product/page/' + graph.nodeId,
          method: 'GET',
          dataType: 'json',
          colModel: [
            {
              display: '商品信息',
              name: 'name',
              width: 2.7,
              //sortable: false,
              mapping: ["pic", "name", "url", "numIid", "price"],
              convert: function (v, mappVal) {
                return "<img class='tracklistimg' src='" + mappVal[0] + "' /><a class='tracklisttitle' target='_blank' href='" + mappVal[2] + "'>" + mappVal[1] + "</a><p class='tracklistId'>商品ID：" + mappVal[3] + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span>￥" + mappVal[4] + "</span></p>"
              }
            },
            /*{display: '下单客人数', name: 'orderPeople', width: 0.8, sortable: true, align: 'right', dataindex: 'orderPeople'},
             {display: '付款客人数', name: 'payPeople', width: 0.8, sortable: true, align: 'right', dataindex: 'payPeople'},*/
            {display: '下单订单数', name: 'orderNum', width: 0.8, sortable: true, align: 'right', dataindex: 'orderNum'},
            {display: '付款订单数', name: 'payNum', width: 0.8, sortable: true, align: 'right', dataindex: 'payNum'},
            {
              display: '下单商品数',
              name: 'orderProductNum',
              width: 0.8,
              sortable: true,
              align: 'right',
              dataindex: 'orderProductNum'
            },
            {
              display: '付款商品数',
              name: 'payProductNum',
              width: 0.8,
              sortable: true,
              align: 'right',
              dataindex: 'payProductNum'
            },
          ],
          sortname: '',
          sortorder: "desc",
          buttons: [],
          usepager: true,
          useRp: true,
          rp: 20,
          showTableToggleBtn: true,
          colAutoWidth: true,
          onSuccess: function () {
            var scope = angular.element(angular.element(".gridCommLayout")).scope();
            scope.customObj.compileTpl(scope);
            $('#listTrackGrid tbody td div').css({'height': '58px', 'line-height': '58px'});
            $('.pReload').hide();
            $('.bDiv').removeClass('hidden_x')
            if ($('#listTrackGrid tr').size() > 3) {
              //$('th[abbr="payProductNum"] div').css({'text-align':'center'})
              //$('td[abbr="payProductNum"] div').css({'text-align':'center'})
              /*$('th[abbr="orderPeople"] div').css({'width':'83px'})
               $('td[abbr="orderPeople"] div').css({'width':'83px'})
               $('th[abbr="payPeople"] div').css({'width':'82px'})
               $('td[abbr="payPeople"] div').css({'width':'82px'})
               $('th[abbr="orderNum"] div').css({'width':'82px'})
               $('td[abbr="orderNum"] div').css({'width':'82px'})
               $('th[abbr="payNum"] div').css({'width':'82px'})
               $('td[abbr="payNum"] div').css({'width':'82px'})
               $('th[abbr="orderProductNum"] div').css({'width':'82px'})
               $('td[abbr="orderProductNum"] div').css({'width':'82px'})
               $('th[abbr="payProductNum"] div').css({'width':'82px'})
               $('td[abbr="payProductNum"] div').css({'width':'82px'})*/
            }
            else {
              //$('th[abbr="payProductNum"] div').css({'text-align':'right'})
              //$('td[abbr="payProductNum"] div').css({'text-align':'right'})
              /*$('th[abbr="orderPeople"] div').css({'width':'85px'})
               $('td[abbr="orderPeople"] div').css({'width':'85px'})
               $('th[abbr="payPeople"] div').css({'width':'85px'})
               $('td[abbr="payPeople"] div').css({'width':'85px'})
               $('th[abbr="orderNum"] div').css({'width':'85px'})
               $('td[abbr="orderNum"] div').css({'width':'85px'})
               $('th[abbr="payNum"] div').css({'width':'85px'})
               $('td[abbr="payNum"] div').css({'width':'85px'})
               $('th[abbr="orderProductNum"] div').css({'width':'85px'})
               $('td[abbr="orderProductNum"] div').css({'width':'85px'})
               $('th[abbr="payProductNum"] div').css({'width':'85px'})
               $('td[abbr="payProductNum"] div').css({'width':'85px'})*/
            }
            this.showdata = false;
          },
          onError: function (response) {
            if (response.status == 302) {
              location.pathname = root + 'login.html';
              return;
            }
          }
        });
      }
    },
    "save": function () {  //保存上传
      var _this = this;
      var nowTime = new Date();
      if(_this.isdefault){
        return;
      }
      if (!_this.shopId) {
        _this.shopName = "请选择店铺";
        _this.shopSelectErr = true;
        return false;
      }
      /*if(!_this.startTime){
       $('.datetimepicker').css({'border':'1px solid red'})
       $('#warningtext').html('请选择跟踪开始时间')
       $('#warningtext').show();
       return false;
       }*/
      if (_this.timeonoff) {
        if (_this.startTime) {
          if (Date.parse(_this.startTime) < Date.parse(nowTime)) {
            $('.datetimepicker').css({'border': '1px solid red'})
            $('#warningtext').show();
            return false;
          }
        }
      }


      var params = {
        "id": graph.nodeId,
        "name": _this.name,
        "shopId": _this.shopId,
        "shopName": _this.shopName,
        "startTime": _this.startTime,
        "duration": _this.day,
        "remark": $scope.nodecomment,
        "bdefault": _this.isdefault
      }

      /*if(_this.default){
       if(_this.modify){
       params.bdefault = false;
       }
       else{
       params.bdefault = true;
       }
       }
       else{
       params.bdefault = false;
       }*/

      $timeout.cancel(timer1);
      $interval.cancel(timer2);
      $interval.cancel(timer3);
      $interval.cancel(timer4);

      getListService.putDiscountTrack(function (response) {
        $("#nodeContent").hide();
        $(".yunat_maskLayer").hide();
        $(this).yAlert({"text": "保存成功"});
        removeAlert();
        $scope.editNodeName(response.id, response.name, $scope.nodecomment);
      }, params)

    },
    "cleartimer": function () {
      $timeout.cancel(timer1);
      $interval.cancel(timer2);
      $interval.cancel(timer3);
      $interval.cancel(timer4);
    },
    "createX": function () {  //生成Echart表格
      var _this = this;
      var selectTime = Date.parse(_this.startTime);
      var oldtime = new Date(_this.startTime);
      var late = new Date(oldtime.valueOf() + _this.day * 1 * 24 * 60 * 60 * 1000);

      /*var iYear = late.getFullYear();
       var iMonth = late.getMonth()+1;
       var iDate = late.getDate();
       var iHours = late.getHours();
       var iMin = late.getMinutes();
       var str = '';*/

      function toTwo(n) {
        return n < 10 ? '0' + n : '' + n;
      }

      //str = iYear+ '-' +toTwo(iMonth)+'-'+toTwo(iDate)+' '+ toTwo(iHours)+':'+ toTwo(iMin);
      var latetime = Date.parse(late);

      for (var k = selectTime; k <= latetime; k += 1800000) {
        var myTime = new Date(k);
        var myyear = myTime.getFullYear();
        var mymonth = myTime.getMonth() + 1;
        var mydate = myTime.getDate();
        var myhours = myTime.getHours();
        var mymin = myTime.getMinutes();
        var st = '';

        st = mymonth + '/' + mydate + ' ' + toTwo(myhours) + ':' + toTwo(mymin);

        _this.newarr.push(st);

      }
      var scalenum = 0;
      if (_this.day == 1) {
        scalenum = 5;
      }
      if (_this.day == 2) {
        scalenum = 11;
      }
      if (_this.day == 3) {
        scalenum = 17;
      }
      //echart
      var myChart = $scope.echart;

      getListService.getDiscountTrackEchart(function (response) {
        var arr1 = [];
        var arr2 = [];

        angular.forEach(response, function (val, key) {
          if (val == null) {
            arr1.push(null)
          }
          else {
            arr1.push(val.order)
          }
        })

        angular.forEach(response, function (val, key) {
          if (val == null) {
            arr2.push(null)
          }
          else {
            arr2.push(val.pay)
          }
        })

        var option = {
          tooltip: {
            show: true,
            trigger: 'axis',
            confine:true
          },
          grid: {
            show: false
          },
          grid: {
            left: '2%',
            top: '6%',
            right: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _this.newarr,
            interval: 2,
            axisLabel: {
              show: true,
              interval: scalenum
              /*formatter:function(val){
               return val.split(" ").join("\n");
               }*/
            }
          },
          yAxis: {
            //type: 'value'
            /*axisLabel: {
             formatter: '{value} W'
             }*/
          },
          series: [
            {
              name: '下单金额',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  label: {
                    show: true
                  }
                }
              },
              symbol: 'none',
              data: arr1,
            },
            {
              name: '付款金额',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  label: {
                    show: false
                  }
                }
              },
              symbol: 'none',
              data: arr2,
            }
          ]
        };

        myChart.setOption(option);
      }, 'amout')


      $scope.$watch('effectTrack.timeselects', function (newVal, oldVal) {
        if (newVal != oldVal) {
          if (newVal == '订单金额') {
            var option = myChart.getOption();
            getListService.getDiscountTrackEchart(function (response) {
              var arr1 = [];
              var arr2 = [];
              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr1.push(null)
                }
                else {
                  arr1.push(val.order)
                }
              })

              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr2.push(null)
                }
                else {
                  arr2.push(val.pay)
                }
              })
              option.series[0].data = arr1;
              option.series[1].data = arr2;
              option.series[0].name = '下单金额';
              option.series[1].name = '付款金额';
              myChart.setOption(option, true);
            }, 'amout')
            $scope.effectTrack.legendleft = '下单金额';
            $scope.effectTrack.legendright = '付款金额';
          }
          if (newVal == '订单笔数') {
            var option = myChart.getOption();
            getListService.getDiscountTrackEchart(function (response) {
              var arr1 = [];
              var arr2 = [];

              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr1.push(null)
                }
                else {
                  arr1.push(val.order)
                }
              })

              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr2.push(null)
                }
                else {
                  arr2.push(val.pay)
                }
              })
              option.series[0].data = arr1;
              option.series[1].data = arr2;
              option.series[0].name = '下单订单数';
              option.series[1].name = '付款订单数';
              myChart.setOption(option, true);
            }, 'num')
            $scope.effectTrack.legendleft = '下单订单数';
            $scope.effectTrack.legendright = '付款订单数';
          }
          if (newVal == '商品数') {
            var option = myChart.getOption();
            getListService.getDiscountTrackEchart(function (response) {
              var arr1 = [];
              var arr2 = [];

              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr1.push(null)
                }
                else {
                  arr1.push(val.order)
                }
              })

              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr2.push(null)
                }
                else {
                  arr2.push(val.pay)
                }
              })
              option.series[0].data = arr1;
              option.series[1].data = arr2;
              option.series[0].name = '下单商品数';
              option.series[1].name = '下单付款数';
              myChart.setOption(option, true);
            }, 'product')
            $scope.effectTrack.legendleft = '下单商品数';
            $scope.effectTrack.legendright = '下单付款数';
          }
          if (newVal == '人数') {
            var option = myChart.getOption();
            getListService.getDiscountTrackEchart(function (response) {
              var arr1 = [];
              var arr2 = [];

              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr1.push(null)
                }
                else {
                  arr1.push(val.order)
                }
              })

              angular.forEach(response, function (val, key) {
                if (val == null) {
                  arr2.push(null)
                }
                else {
                  arr2.push(val.pay)
                }
              })
              option.series[0].data = arr1;
              option.series[1].data = arr2;
              option.series[0].name = '下单人数';
              option.series[1].name = '付款人数';
              myChart.setOption(option, true);
            }, 'people')
            $scope.effectTrack.legendleft = '下单人数';
            $scope.effectTrack.legendright = '付款人数';
          }
        }
      })
    }
  }

  $scope.effectTrack.init();

  $scope.customObj = {
    "compileTpl": function (s) {
      $compile(angular.element(".gridCommLayout"))($scope || s);
      $scope.$apply();
    }
  }

  $scope.formatNumber = function(num,cent,isThousand){
    num = num.toString().replace(/\$|\,/g,'');

    // 检查传入数值为数值类型
     if(isNaN(num))
      num = "0";

    // 获取符号(正/负数)
    sign = (num == (num = Math.abs(num)));

    num = Math.floor(num*Math.pow(10,cent)+0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
    cents = num%Math.pow(10,cent);       // 求出小数位数值
    num = Math.floor(num/Math.pow(10,cent)).toString();  // 求出整数位数值
    cents = cents.toString();        // 把小数位转换成字符串,以便求小数位长度

    // 补足小数位到指定的位数
    while(cents.length<cent)
     cents = "0" + cents;

    if(isThousand) {
     // 对整数部分进行千分位格式化.
     for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
      num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
    }

    if (cent > 0)
     return (((sign)?'':'-') + num + '.' + cents);
    else
     return (((sign)?'':'-') + num);
  }

  $scope.change = function () {  //获取十项数据
    getListService.getDiscountTrack(function (response) {
      $scope.effectTrack.totalNumber = response.total || "-";
      $scope.effectTrack.deadline = response.theDate || "-";
      $scope.effectTrack.orderNumber = response.orderPeople || "-";
      $scope.effectTrack.orderAmount = $scope.formatNumber(response.orderAmout,2,1) || "-";
      $scope.effectTrack.placeOrder = $scope.formatNumber(response.orderNum,0,1) || "-";
      $scope.effectTrack.orderCommodity = $scope.formatNumber(response.orderProductNum,0,1) || "-";
      $scope.effectTrack.PaymentNumber = response.payPeople || "-";
      $scope.effectTrack.PaymentAmount = $scope.formatNumber(response.payAmout,2,1) || "-";
      $scope.effectTrack.PaymentOrder = $scope.formatNumber(response.payNum,0,1) || "-";
      $scope.effectTrack.PaymentCommodity = $scope.formatNumber(response.payProductNum,0,1) || "-";
    })
  }

  $scope.update = function () { //刷新数据
    //刷新十项数据
    $scope.change();

    //刷新echart
    if ($scope.effectTrack.timeselects == '订单金额') {
      var myChart = $scope.echart;
      var option = myChart.getOption();
      getListService.getDiscountTrackEchart(function (response) {
        var arr1 = [];
        var arr2 = [];

        angular.forEach(response, function (val, key) {
          if (val == null) {
            arr1.push(null)
          }
          else {
            arr1.push(val.order)
          }
        })

        angular.forEach(response, function (val, key) {
          if (val == null) {
            arr2.push(null)
          }
          else {
            arr2.push(val.pay)
          }
        })
        option.series[0].data = arr1;
        option.series[1].data = arr2;
      }, 'product')
      myChart.setOption(option, true);
    }
    else {
      $scope.effectTrack.timeselects = '订单金额'
    }

    //刷新表格
    var curGridElement;
    curGridElement = angular.element("#listTrackGrid")[0];
    if (curGridElement.grid) {
      curGridElement.p.newp = 1;
      curGridElement.grid.populate();
    }
  }

  /*$scope.$watch('effectTrack.startTime',function(newVal, oldVal){
   if(newVal){
   $('.datetimepicker').css({'border':'1px solid #d9d9d9'})
   $('#warningtext').hide();
   }
   })*/

  $('.close').click(function (event) { //清理更新的定时器
    $timeout.cancel(timer1);
    $interval.cancel(timer2);
    $interval.cancel(timer3);
    $interval.cancel(timer4);
  });

  $scope.updatetime = function () {

    var nowtime = new Date()
    var nowmin = nowtime.getMinutes();
    var onOff = false;
    var difference = 0;


    if (nowmin != 30 || nowmin != 0) {
      onOff = true;
      if (nowmin > 0 && nowmin < 30) {
        difference = 30 - nowmin;
      }
      if (nowmin > 30) {
        difference = 60 - nowmin;
      }
    }

    if (onOff) {
      timer1 = $timeout(function () {
        $scope.update();
        timer3 = $interval(function () {
          $scope.update();
        }, 30 * 60 * 1000)
      }, 1000 * 60 * difference)
    }
    else {
      timer2 = $interval(function () {
        $scope.update();
      }, 30 * 60 * 1000)
    }
  }

  /*var curDate = new Date();
   var nextDate = new Date(curDate.getTime() + 24*60*60*1000);  //后一天
   var mymin = nextDate.getSeconds();

   var qqq = new Date(curDate.getTime() + 24*60*60*1000-(1000*mymin))

   console.log(nextDate)
   console.log(mymin)

   console.log(qqq)*/


}]);




