// JavaScript Document
var dashboardDirectives = angular.module("dashboard.directives", []);

dashboardDirectives.directive('chartDay', function() {
  return function($scope, elem, attr) {
    //radio事件 7天 or 30天
    elem.find('input').bind('click', function(event) {
      if (event.target.value === "7") {
        $scope.renderChartWeek();
      } else if (event.target.value === "30") {
        $scope.renderChartMonth();
      }
    });

    setTimeout(function() {
      $scope.chart = new Highcharts.Chart({
        chart: {
          renderTo: 'chartContainer',
          //margin: [0, 80, 0, 80],
          //	type: 'xy',
          height: 300,
          backgroundColor: "#fcfcfc",
          events: {
            load: function(e) {
              e.target.chartWidth = parseInt(angular.element("#chartContainer").css("width"));
            }
          }
        },
        credits: {
          text: '',
          href: ''
        },
        title: {
          text: '  '
        },
        subtitle: {
          text: ''
        },
        yAxis: [{
          title: {
            text: '短信数量',
            style: {
              color: '#AA4643',
              fontWeight: 'normal'
            }
          },
          labels: {
            formatter: function() {
              return this.value;
            },
            style: {
              color: '#AA4643'
            }
          },
          min: 0
        },
        {
          labels: {
            formatter: function() {
              return this.value;
            },
            style: {
              color: '#4572A7'
            }
          },
          title: {
            text: "邮件数量",
            style: {
              color: '#4572A7',
              fontWeight: 'normal'
            }
          },
          opposite: true,
          min: 0
        }],
        series: [{
          data: [],
          color: '#AA4643',
          yAxis: 0,
          name: '短信数量'
        },
        {
          data: [],
          yAxis: 1,
          color: '#4572A7',
          name: '邮件数量'
        }]
      });
      $scope.renderChart();
    }, 2000);
  };
});

//系统消息title中的更多
dashboardDirectives.directive('moreMessagePop', function() {
  return function(scope, elem, attr) {
    elem.bind('click', function() {
      //messes弹出框的显示，用于ng-show
      scope.messesDialogShow = true;
      //获取服务器数据
      scope.getPopMesses();
      scope.$digest();
    });
  };
});
//把服务器的字符串转为dom， 防止</br>不转义
dashboardDirectives.directive('parsecontent', function() {
  return function(scope, elem, attr) {
    scope.$watch('content', function(value) {
      elem.html(value);
    });
  }
});

dashboardDirectives.directive('moremessesdialog', function() {
  return function(scope, elem, attr) {
    elem.find('.close').bind('click', function() {
      scope.isMessesDialogShow = false;
      scope.$digest();
    });
  }
});

dashboardDirectives.directive('messageSlide', function() {
  return function(scope, elem, attr) {
    var toppx = 0
    var slide = {
      destrory: function() {
        $(elem).css({
          top: "0px"
        });
        var temp = scope.messes
        var first = temp.shift();
        if (!first.isRead) {
          temp.push(first)
        }
        if (scope.messes.length == 0) {
          scope1 = angular.element("#newsTrue").scope();
          scope1.newsTrue = false;
          scope.hidemesses = false

        };
        scope.messes = temp;
        scope.$apply()
      },
      top: function() {
        toppx = -28;
        $(elem).animate({
          top: toppx + "px"
        }, function() {
          this.destrory()
        }.bind(this))
      },
      settimee: function() {
        if (scope.messes.length > 0) {
          window.setTimeout(function() {
            this.top();
            this.settimee()
          }.bind(this), 3000)
        }
      },
      event: function() {
        this.settimee()
      }
    }
    scope.$watch("messes", function(a, b) {
      if (a && a != b) {
        slide.event()
      }
    })

  }
});

//通道监控中的通道余额
dashboardDirectives.directive('channelrecharge', function() {
  return function(scope, elem, attr) {
    //数字span
    var num = elem.find('span');
    //a链接
    var aTag = elem.find('a');
    if (scope.channel.overAmount <= 100) {
      num.addClass('orange_a');
      aTag.addClass('recharge_red');
    } else {
      num.addClass('gray_a');
      aTag.addClass('recharge_gray');
    }
  }
});

//通道监控中的通道余额的滑动效果
dashboardDirectives.directive('channelslide', function() {
  //暂存左边的偏移
  var marginL = 0,
  //右边剩余个数
      rCount = 0,
  //左边剩余个数
      lCount = 0,
  //总个数
      totalCount = 0;
  return function(scope, elem, attr) {
    //包裹层
    var wrapper = elem.find('.channelSliceWrapper');
    //很长的内容
    var slide = elem.find('.channelSlide'),
        itemWidth = 206;
    scope.$watch("count", function(count) {
      totalCount = count;
      if (count) {
        //获取容器总宽度 80为最左边单元格宽度 151
        var container = elem.width() - 80;
        var last = container - itemWidth * count;
        //如果放不下
        if (last < 0) {
          rCount = count - Math.floor(container / itemWidth);
          scope.rightA = true;
          //var wrapperW = container - 86;
          //wrapper定死
          //wrapper.width(wrapperW);
          //设置一个很宽的宽度
          //slide.width(4000);
        }
      }
      //向右滑动
      scope.slideToLeft = function() {
        scope.leftA = true;
        //206为单元格宽度
        marginL = marginL - itemWidth;
        var rw = parseInt(elem.find(".channelSliceWrapper").css("width")),
            itemCount = elem.find(".channelSlide p").length,
            showedItems = itemCount - rCount;
        if (! (lCount == 0 && rw < (itemWidth * showedItems + 42))) {
          rCount = rCount - 1;
        }
        lCount = lCount + 1;
        if (rCount === 0) {
          //影藏左边的按钮
          scope.rightA = false;
          scope.leftA = true;
        }
        slide.animate({
          'margin-left': marginL
        })
      }
      //向右滑动
      scope.slideToRight = function() {
        scope.rightA = true;
        marginL = marginL + itemWidth;
        rCount = rCount + 1;
        lCount = lCount - 1;
        if (lCount === 0) {
          //影藏右边的按钮
          scope.leftA = false;
        }
        slide.animate({
          "margin-left": marginL
        })
      }
    });
  }
});
//店铺信息更多
dashboardDirectives.directive('viewMoreShop', function() {
  return function(scope, element, attr) {
    var eleSpan = element.find("span"),
        eleA = element.children('a');
    element.bind({
      "mouseenter": function() {
        eleSpan.show();
        eleA.addClass("cur");
      },
      "mouseleave": function() {
        eleSpan.hide();
        eleA.removeClass("cur");
      }
    })
  }
});

dashboardDirectives.directive("mySelect", function() {
  return {
    restrict: 'AE',
    scope: {
      'list': '&data',
      "changeSelect": "&selectChange",
      "selectModel": "=selectModel",
      "noChange": "=noChange"
    },

    link: function($scope, $element, $attrs) {
      $scope.list = $scope.list();
      $scope.list.map(function(item, index) {
        if (item[$attrs.value] == $scope.$parent[$attrs.selectModel]) {
          $scope.selectModels = item;
          $scope.$parent[$attrs.selectModel] = item
        }
        if (item[$attrs.name]) {
          item.name = item[$attrs.name];
          delete item[$attrs.name]
        }
        if (item[$attrs.value]) {
          item.value = item[$attrs.value];
          delete item[$attrs.value]
        }
      });
      $scope.done = function(index) {
        if ($scope.noChange) {
          return false
        }
        var model = $scope.list[index];
        $scope.hideSelect = true;
        $scope.selectModels = angular.copy(model);
        $scope.$parent[$attrs.selectModel] = $scope.selectModels.value;
        $scope.changeSelect()

      }
    },
    template: '<div  class="al_dropDown"> ' + '<span ng-mouseover="hideSelect=false" >' + '<span style="text-overflow: ellipsis;word-wrap: break-word;white-space: nowrap; padding-left: 0px;overflow: hidden;width: 100px;border: none">{{selectModels.name}}</span> <a></a></span>' + ' <ul ng-hide="hideSelect" ><li ng-click="done($index)"  ng-repeat=" i in list " >{{i.name}}</li> </ul> ' + '</div>'
  }
});

dashboardDirectives.directive("ngLoading", function() {
  return {
    restrict: 'AE',
    template: ' <div style="position: relative;height: 100%"><div style="transform:translate(-50%,-50%);"  class="loading"><i></i>加载中...</div></div>'
  }
});
