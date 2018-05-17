//$(function(){
$('#startTime').datepicker({
  //dateFormat:'yy-mm-dd 00:00:00',
  showOtherMonths: true,
  selectOtherMonths: false,
  changeMonth: true,
  changeYear: true,
  minDate: new Date(),
  onClose: function(selectedDate) {
    if (selectedDate) {
      var obj = $("#endTime");
      $(this).val(this.value.split(' ')[0] + ' 00:00:00');
      obj.datepicker("option", "minDate", selectedDate);
      if (obj.val()) {
        obj.val(obj.val() + ' 23:59:59');
      }
    }
  }
});
$('#endTime').datepicker({
  //dateFormat:'yy-mm-dd 23:59:59',
  showOtherMonths: true,
  selectOtherMonths: false,
  changeMonth: true,
  changeYear: true,
  minDate: new Date(),
  onClose: function(selectedDate) {
    if (selectedDate) {
      var obj = $("#startTime");
      $(this).val(this.value.split(' ')[0] + ' 23:59:59');
      obj.datepicker("option", "maxDate", selectedDate);
      if (obj.val()) {
        obj.val(obj.val() + ' 00:00:00');
      }
    }
  }
});
//datepicker end;

$.validator.addMethod("thresholdRule", function(value, element, params) {
    return this.optional(element) || parseInt(value) > parseInt($('[name=denominationValue] :selected').html());
  }, '使用条件必须大于优惠券面额');

function ticketsAddCtrl($scope, $location, $http) {
  var path = $location.path().split(':');
  //根据path判断是修改还是新建
  $scope.isModify = /\/modify$/.test(path[0]) ? true: false;
  if ($scope.isModify) {
    $scope.title = '修改优惠券';
    //获取数据
    $http.get(rootStatic + "coupon/taobao/" + path[1] + '/?_=' + new Date().getTime()).success(function(response) {
      $scope.ticket = response.data;
      if ($scope.ticket.threshold == 0) {
        $scope.ticket.threshold = '不填表示不限';
      }
    });
  } else {
    $scope.title = '新建优惠券';
    //获取优惠券通道
    /*
     $http.get(rootStatic+"coupon/taobao/channel").success(function(response){
     $scope.couponChannels = response.data.channels;
     });
     */
    //获取优惠券面额
    $http.get(rootStatic + "coupon/taobao/denomination").success(function(response) {
      $scope.prices = response.data.denominations;
    })
    //获取店铺
    $http.get(rootStatic + "shop/taobao/list").success(function(response) {
      $scope.shops = response.data.shops;
      //删除第一个option
      $('[name=shopId] option').eq(0).remove();
    });
    //获取淘宝优惠券授权页面
    $http.get(rootStatic + "coupon/taobao/grandUrl").success(function(response) {
      $scope.grandUrl = response.data.grandUrl;
    });
  }

  angular.element('#ticketForm').validate({
    rules: {
      threshold: {
        thresholdRule: true
      }
    },
    submitHandler: function() {
      if ($scope.isModify) {
        subFn('PUT', rootStatic + "coupon/taobao/" + path[1]);
      } else {
        //判断是否授权
        $http.get(rootStatic + "coupon/taobao/shop/" + $('select[name=shopId]').val() + "/authorization").success(function(response) {
          if (response.data.authorized) {
            subFn('POST', rootStatic + "coupon/taobao/");
          } else {
            $("#couponPop").addInteractivePop({
              magTitle: "授权提醒",
              mark: true
            });
          }
        });
      }
    }
  });

  //授权
  $('#getSessionKey').click(function() {
    $(this).hide().next().show();
  });
  $('#sureSessionKey').click(function() {
    var _this = $(this);
    $http.get(rootStatic + "coupon/taobao/shop/" + $('select[name=shopId]').val() + "/authorization").success(function(response) {
      if (response.data.authorized) {
        subFn('POST', rootStatic + "coupon/taobao");
      } else {
        $('#failMark').html('您尚未授权成功').show();
        _this.hide().prev().show();
      }
    });
  });

  function subFn(method, url) {
    var json = {};
    $('#ticketForm :input[name]').each(function() {
      var val = this.value;
      if ($(this).attr('disabled') || this.name == '') return;
      if (this.name == 'denominationValue' || this.name == 'threshold') {
        val = parseInt(this.value) || 0;
      }
      json[this.name] = val;
    });
    $http({
      "method": method,
      "url": url,
      "data": JSON.stringify(json)
    }).success(function(response) {
      if (response.status == 0) {
        location.hash = '#/view/tickets';
      } else {
        alert(response.message);
      }
    });
  }
}