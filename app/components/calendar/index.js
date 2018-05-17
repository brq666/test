/**
 * @author: Michael
 * @date: 2017-10-14 17:38:38
 * @last modified by: Michael
 * @last modified time: 2017-10-14 17:38:38
 * @gitHub: https://github.com/maxsmu
*/
angular.module('commondirectives.calendar', [])
  .component('imCalendar', {
    templateUrl: GLOBAL_STATIC.rootModule + '/components/calendar/tpls/calendar.tpl.html',
    controller: imCalendarCtrl,
    controllerAs: '$imCal',
    bindings: {
      events: '<?',
      mode: '<',
      year: '<?',
      month: '<?',
      week: '<?',
      height: '<',
      loading: '<?',
      onScroll: '&?',
      onHeader: '&?'
    }
  })
  .component('imCalendarHeader', {
    templateUrl: GLOBAL_STATIC.rootModule + '/components/calendar/tpls/calendar-header.tpl.html',
    controller: imCalendarHeaderCtrl,
    controllerAs: '$imCalHead',
    bindings: {
      mode: '<',
      columns: '<',
    }
  })
  .component('imCalendarBody', {
    templateUrl: GLOBAL_STATIC.rootModule + '/components/calendar/tpls/calendar-body.tpl.html',
    controller: imCalendarBodyCtrl,
    controllerAs: '$imCalBody',
    bindings: {
      mode: '<',
      columns: '<',
      events: '<',
      loading: '<'
    }
  })
  .component('imCalendarRowWallpaper', {
    templateUrl: GLOBAL_STATIC.rootModule + '/components/calendar/tpls/calendar-row-wallpaper.tpl.html',
    controller: imCalendarRowWallpaperCtrl,
    controllerAs: '$imCalRow',
    bindings: {
      columns: '<'
    }
  })
  .component('imEventBar', {
    templateUrl: GLOBAL_STATIC.rootModule + '/components/calendar/tpls/calendar-event-bar.tpl.html',
    controller: imEventBarCtrl,
    controllerAs: '$imCalEveBar',
    bindings: {
      event: '<',
      index: '<'
    }
  })
  .factory('$imCalendar', imCalendarHelper)
  .provider('$imEventModal', imEventModalHelper)
  .filter('imDate', imDateFilterHelper);

// 日历控制器
imCalendarCtrl.$inject = ['$imCalendar'];
function imCalendarCtrl($imCalendar) {
  var self = this;
  self.loading = self.loading === undefined ? true : self.loading;

  self.$onChanges = function(changeObj) {
    if (self.mode === 'month' || self.mode === 'week') {
      self.getViewColumns(self.mode);
    }
  };

  /**
   * 获取视图显示数据
   */
  self.getViewColumns = function(mode) {
    // 视图数据
    var viewData;
    if (mode === 'month') {
      var currentDate = new Date(self.year, self.month - 1, 1);
      viewData = $imCalendar.getMonthViewTime(currentDate);
      self.columns = viewData.weeks;
      self.startTime = viewData.start;
      self.endTime = viewData.end;
    }

    if (mode === 'week') {
      viewData = $imCalendar.getWeekViewTime(self.year, self.week);
      self.columns = viewData.weeks;
      self.startTime = viewData.start;
      self.endTime = viewData.end;
    }
  }
}

// 日历头部
imCalendarHeaderCtrl.$inject = ['$imCalendar', '$scope'];
function imCalendarHeaderCtrl($imCalendar, $scope) {
  var self = this;
  var imCalCtrl = $scope.$parent.$imCal;
  self.$onInit = function() {
    self.flex = $imCalendar.getFlexNumber(self.columns.length);
  };

  /**
   * 单击Title
   */
  self.onClickHeader = function(mode, column) {
    // 点击头部更新中
    imCalCtrl.clickHeaderUpdating = true;
    if (imCalCtrl.onHeader) {
      var eventboxDom = $('.event-bar-box');
      if (eventboxDom.length > 0) { eventboxDom[0].scrollTop = 10; }
      imCalCtrl.onHeader({ mode: mode, column: column });
    }
  };
}

// 日历主体
imCalendarBodyCtrl.$inject = ['$imCalendar', '$document', '$scope'];
function imCalendarBodyCtrl($imCalendar, $document, $scope) {
  var self = this;
  var imCalCtrl = $scope.$parent.$imCal;

  // 获取节点绑定事件
  self.$postLink = function() {
    var eventsDom = $document.find('.event-bar-box')[0];

    //  监听任务列表容器的滚动条事件
    eventsDom.onscroll = function(event) {
      if (imCalCtrl.clickHeaderUpdating) {
        imCalCtrl.clickHeaderUpdating = false;
      } else {
        var targetDom = event.target;
        if (targetDom.scrollTop < 2) {
          imCalCtrl.onScroll && imCalCtrl.onScroll({ type: 'pre', event: event });
        }

        if (targetDom.scrollTop + targetDom.clientHeight >= targetDom.scrollHeight) {
          imCalCtrl.onScroll && imCalCtrl.onScroll({ type: 'next', event: event });
        }
      }
    }
  }
}

/**
 * 日历画布
 */
imCalendarRowWallpaperCtrl.$inject = ['$imCalendar', '$scope'];
function imCalendarRowWallpaperCtrl($imCalendar, $scope) {
  var self = this;
  var imCalCtrl = $scope.$parent.$parent.$imCal;
  self.$onInit = function() {
    self.flex = $imCalendar.getFlexNumber(imCalCtrl.columns.length);
  };
}

/**
 * 事件bar控制器
 */
imEventBarCtrl.$inject = ['$scope', '$imEventModal', '$document'];
function imEventBarCtrl($scope, $imEventModal, $document) {
  var self = this;

  self.$onChanges = function() {
    self.init();
  }
  self.init = function() {
    // 日历控制器
    var imCalCtrl = $scope.$parent.$parent.$parent.$imCal;
    // 起始时间
    var startTime = imCalCtrl.startTime,
      // 结束时间
      endTime = imCalCtrl.endTime,
      // 任务起始时间
      taskStart = self.event.startTime,
      // 任务结束时间
      taskEnd = self.event.endTime,
      // 任务状态
      taskStatus = self.event.status;

    // 特殊处理： 如果任务开始时间早于列表开始时间，则使用列表开始时间
    if (startTime.date._d > new Date(taskStart)) {
      taskStart = startTime.label;
    }

    // 特殊处理：如果任务结束时间晚于列表结束时间，则使用列表结束时间
    if (endTime.date._d < new Date(taskEnd)) {
      taskEnd = endTime.label;
    }

    // 特殊处理：设计中、设计中预执行、待审批、待审批预执行、待执行
    // if (['A1', 'B1', 'A2', 'B2', 'A3'].indexOf(taskStatus) >= 0) {
    //   taskEnd = endTime.label;
    // }

    // 任务条长度
    var length = getTimeQuantum(taskStart, taskEnd, 1),
      // 任务条left 长度
      leftLength = getTimeQuantum(startTime.date._d, taskStart, 0);

    //  任务列表定位
    self.style = {
      width: getWidth(imCalCtrl.columns.length, imCalCtrl.mode, length) + '%',
      marginLeft: getWidth(imCalCtrl.columns.length, imCalCtrl.mode, leftLength) + '%'
    };
  }

  /**
   * 单击任务条
   */
  self.onEventClick = function(event, item) {
    var offset = getPosition(event.clientX || 0, event.clientY || 0);
    // 日历控制器
    var imCalCtrl = $scope.$parent.$parent.$parent.$imCal;
    $imEventModal.open(offset, item, function() {
      if (self.index >= 0) {
        imCalCtrl.events.splice(self.index, 1);
      }
    });
  }

  /**
   * 获取详情框位置
   * @param {number} clientX 鼠标点击X值
   * @param {number} clientY 鼠标点击Y值
   */
  function getPosition(clientX, clientY) {
    var containerDom = document.querySelector('.ccmsc-main-container'),
      // 容器宽度
      conW = containerDom.clientWidth,
      // 容器高度
      conH = containerDom.clientHeight,
      // 任务详情宽度
      detailW = 310 + 8,
      // 任务详情最大高度
      detailH = 245,
      pos = {};
    // （容器宽度 - 鼠标单击位置X方向值 - 任务详情框体宽度）< 0 则说明溢出内容框
    if (conW - clientX - detailW < 0) {
      pos.right = (conW - clientX) > 0 ? (conW - clientX) + 15 : 15;
    } else {
      pos.left = clientX;
    }

    // （容器高度 - 鼠标单击位置Y方向值 - 任务详情框体高度）< 0 则说明溢出内容框
    if (conH - clientY - detailH < 0) {
      pos.bottom = (conH - clientY) > 0 ? (conH - clientY) : 0;
    } else {
      pos.top = clientY - 15;
    }
    return pos;
  }

  /**
   * 获取长度
   * @param {number} colLength 列长度
   * @param {number} mode 模式
   * @param {number} days bar长度
   */
  function getWidth(colLength, mode, days) {
    var modeCount = mode === 'month' ? 7 : 1;
    var rowWidth = Math.floor(100 / colLength * 100) / 100;
    var dayWidth = Math.floor(100 / (colLength * modeCount) * 100) / 100;
    var colCount = Math.floor(days / modeCount);
    // 余数
    var remNum = days % modeCount;

    // 长度=整数列长度（列width * 长度/列） + 不完整列的长度（剩余天数 * 长度/天）
    var result = (colCount * rowWidth) + (dayWidth * remNum);

    if (result < 0) {
      result = 0;
    } else if (result > 100) {
      result = 100;
    }
    return result;
  }

  /**
   * 获取时间段长度
   * @param {string} start 起始时间
   * @param {string} end 结束时间
   * @param {number} baseNum 基础值
   */
  function getTimeQuantum(start, end, baseNum) {
    var dayLength = 24 * 60 * 60 * 1000;
    return ((new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0)) / dayLength) + baseNum;
  }
}

/**
 * 日历组件服务
 */
imCalendarHelper.$inject = [];
function imCalendarHelper() {
  function getMonthViewData(date, weekFirst) {
    weekFirst = 1;
    var viewDays = [];
    var firstDay = moment(date).startOf('month');
    var lastDay = moment(date).endOf('month');
    var daysCount = lastDay.date();
    var firstDayWeek = firstDay.day();
    var lastDayWeek = lastDay.day();

    // 填充上一月数据的索引
    var prei;
    // 填充上一月数组长度
    var preFillLength;

    // 当前月数据的索引
    var ini;

    // 填充下一月数据的索引
    var nexti;
    // 填充下一月数组长度
    var nextFillLength;

    // 周日为一星期最后一天
    if (weekFirst !== 0) {
      prei = 1;
      ini = 1;
      nexti = 1;
      preFillLength = firstDayWeek - 1;
      nextFillLength = lastDayWeek === 0 ? 0 : 7 - lastDayWeek;

      if (firstDayWeek === 0) {
        preFillLength = 6;
      }
    } else {
      // 周日为一个星期的第一天

    }

    // 填充
    for (prei; prei <= preFillLength; prei++) {
      viewDays.push(getDayView(moment(date).startOf('months').subtract(preFillLength - prei + 1, 'days')));
    }

    // 填充本月数据
    for (ini; ini <= daysCount; ini++) {
      viewDays.push(getDayView(moment(date).startOf('months').add(ini - 1, 'days')));
    }

    for (nexti; nexti <= nextFillLength; nexti++) {
      viewDays.push(getDayView(moment(date).endOf('months').add(nexti, 'days')));
    }
    return viewDays;
  }

  /**
   * 获取某年的某天是第几周
   * @param {Date} day 指定日期
   * @param {Number} mode 模式
   */
  function getWeekNumber(day, mode) {
    // 活需要查询当天是周几，（用来确认为那一年）
    var currentDayWeek = day.getDay();
    // 计算参考日期(所在周的周一)
    var referDate;
    // 计算参考日期(所在周的周日)
    var referEndDate;

    if (currentDayWeek === 0) {
      referDate = moment(day).subtract(7 - 1, 'days')._d;
      referEndDate = moment(day)._d;
    } else {
      referDate = moment(day).subtract(currentDayWeek - 1, 'days')._d;
      referEndDate = moment(day).add(7 - currentDayWeek, 'days')._d;
    }

    // 年 ； 月 ； 日
    var year = referDate.getFullYear(),
      month = referDate.getMonth() + 1,
      days = referDate.getDate();

    // 获取year年第一天是周几
    var firstDayWeek = new Date(year, 0, 1).getDay(),
      //  索引
      i = 1,
      // 当前是一年中第几天
      yearCount = 0,
      // 第多少周
      weeks;

    // 循环计算前几个月一共多少天数
    for (i; i < month; i++) {
      yearCount += getMonthDays(year, i);
    }
    // 日期是一年中的第多少天
    yearCount = yearCount + days;

    if (firstDayWeek === 1) {
      weeks = Math.ceil(yearCount / 7);
    } else {
      if (firstDayWeek === 0) {
        yearCount = yearCount - 1;
      } else {
        yearCount = yearCount - (7 - firstDayWeek + 1);
      }

      weeks = Math.ceil(yearCount / 7);
    }

    if (referDate.getFullYear() < referEndDate.getFullYear()) {
      return 0;
    }
    // firstDayWeek === 1 ? weeks : weeks - 1
    // 如果xxxx年01-01 是周日则本年从第一周开始、否则为第0周开始
    return weeks;
  }

  /**
   * 获取某年某月有多少天
   * @param {Number} year 年份
   * @param {Number} month 月份
   */
  function getMonthDays(year, month) {
    return [31, '', 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1] || (isLeapYear(year) ? 29 : 28);
  }

  /**
   * 判断某年是否为润年
   * @param {Number} year 年份
   */
  function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
  }
  /**
   * 获取指定日期信息
   * @param {moment} momentDate 日期
   */
  function getDayView(momentDate) {
    return {
      date: momentDate,
      inMonth: momentDate.format('YYYY-MM') === (moment().format('YYYY-MM')),
      isToday: momentDate.isSame(moment()),
      isWeekend: momentDate.day() === 0,
      week: momentDate.day(),
      monthLabel: momentDate.format('DD'),
      MonthDayLabel: momentDate.format('MM/DD'),
      label: momentDate.format('YYYY/MM/DD')
    };
  }

  /**
   * 获取月视图时间段
   * @param {Date} today 今日时间
   */
  function getMonthViewTime(today) {

    var viewDays = getMonthViewData(today),
      i = 0,
      length = viewDays.length,
      weekMap = {},
      weeks = [];

    // 遍历天数组装周信息
    for (i; i < length; i++) {
      var dayData = viewDays[i];
      // 如果是周一 或者是周日
      if (dayData.week === 1 || dayData.isWeekend) {
        // 当前是第几周
        var dayWeekCount = getWeekNumber(dayData.date._d, 1);
        // console.log('周数：', dayWeekCount, dayData.label);
        weekMap[dayWeekCount] = weekMap[dayWeekCount] || {};

        if (dayData.week === 1) {
          weekMap[dayWeekCount].start = dayData.MonthDayLabel;
          weekMap[dayWeekCount].startTime = dayData.label;
        }

        if (dayData.isWeekend) {
          weekMap[dayWeekCount].end = dayData.MonthDayLabel;
          weekMap[dayWeekCount].endTime = dayData.label;
          weekMap[dayWeekCount].week = dayWeekCount;
          weeks.push(weekMap[dayWeekCount]);
        }
      }
    }

    return {
      start: viewDays[0],
      end: viewDays[length - 1],
      weeks: weeks
    };
  }

  /**
   * 获取指定周视图
   * @param {Number} yaer 年
   * @param {Number} week 周
   */
  function getWeekViewTime(year, week) {
    var firstDay = new Date(year, 0, 1),
      firstDayWeek = firstDay.getDay(),
      yearTotalDays = week * 7,
      // 循环索引
      i = 0,
      result = { weeks: [] };

    if (firstDayWeek !== 1) {
      if (firstDayWeek === 0) {
        yearTotalDays = yearTotalDays + 1;
      } else {
        yearTotalDays = yearTotalDays + 7 - firstDayWeek + 1;
      }
    }

    var weekMap = {
      0: '周日',
      1: '周一',
      2: '周二',
      3: '周三',
      4: '周四',
      5: '周五',
      6: '周六',
    };

    for (i; i < 7; i++) {
      var momentDay = getDayView(moment(firstDay).add(yearTotalDays - (7 - i), 'days'));
      if (i === 0) {
        result.start = momentDay;
      }

      if (i === 6) {
        result.end = momentDay;
      }

      result.weeks.push({
        start: momentDay.MonthDayLabel,
        startTime: momentDay.label,
        title: weekMap[momentDay.week]
      });
    }

    return result;
  }

  /**
   * flex style
   * @param {Number} count 数目
   */
  function getFlexNumber(count) {
    var width = Math.floor(100 / count * 10) / 10;
    return {
      '-webkit-box-flex': width + '%',
      '-webkit-flex': width + '%',
      '-ms-flex': width + '%',
      'flex': width + '%'
    };
  };

  /**
   * 获取pagesize
   * @param {Number} height 高度
   */
  function getPageSize(height) {
    var boxHeight = height >= 100 ? height : 100;
    return Math.ceil((boxHeight - 40) / 25);
  }

  return {
    getMonthViewData: getMonthViewData,
    /**
     * 获取月视图起始、结束时间以及生成Title
     */
    getMonthViewTime: getMonthViewTime,
    /**
     * 获取周视图起始、结束时间以及生成Title
     */
    getWeekViewTime: getWeekViewTime,
    /**
     * 获取当前日期属于一年中第几周
     */
    getWeekNumber: getWeekNumber,
    /**
     * 自适应flex计算
     */
    getFlexNumber: getFlexNumber,
    /**
     * 获取页面pagesize
     */
    getPageSize: getPageSize
  };
}

/**
 * 任务详情
 */
function imEventModalHelper() {
  this.$get = [
    '$injector',
    '$q',
    '$http',
    '$templateCache',
    '$document',
    '$compile',
    '$rootScope',
    '$resource',
    '$ccModal',
    'deleteService',
    '$ccTips',
    function($injector, $q, $http, $templateCache, $document, $compile, $rootScope, $resource, $ccModal, deleteService, $ccTips) {
      // 模板地址
      var templateUrl = GLOBAL_STATIC.rootModule + '/components/calendar/tpls/event-modal.tpl.html';
      // 模板
      var template = $http
        .get(templateUrl, { cache: $templateCache })
        .then(function(response) {
          return response.data;
        });

      /**
       * 自动关闭
       * @param {event} event 事件
       */
      function autoCloseFn(event, isForce) {
        var eventsDom = $document.find('.im-event-detail-box'),
          ccModalDom = $document.find('.ccms-modal.modal-opened'),
          eventBox = $document.find('.im-calendar-body .event-bar-box');

        angular.forEach(eventsDom, function(item) {
          var isModal = true;
          if (ccModalDom.length > 0) {
            isModal = !ccModalDom[0].contains(event.target);
          }
          // 若点击是非modal或者非本身，又或是强制删除，这执行删除
          if ((!item.contains(event.target) && isModal) || isForce) {
            item.remove();
            eventBox[0] && (eventBox[0].style.overflow = 'auto');
          }
        });
      }
      return {
        open: function(pos, camp, bcFn) {
          // 移除之前的单击绑定
          document.removeEventListener('click', autoCloseFn, true);
          // 添加单击绑定
          document.addEventListener('click', autoCloseFn, true);
          var promises = { template: template },
            scope = $rootScope.$new(),
            eventBox = $document.find('.im-calendar-body .event-bar-box'),
            // 获取body
            bodyDom = $document.find('body').eq(0);

          // 框体定位
          scope.pos = pos;
          // 三角定位
          scope.anglePos = {};

          if (pos.right > 0) {
            scope.anglePos.right = -4;
            scope.anglePos.left = 'auto';
          }

          if (pos.bottom > 0) {
            scope.anglePos.bottom = 55;
            scope.anglePos.top = 'auto';
          }
          scope.event = {};

          // 活动状态列表
          scope.statusMap = {
            A1: {
              showMark: '设计中',
              name: '设计中',
              className: 'a1',
              isDesign: false,
              isEdit: true,
              isDel: true,
              isView: false
            },
            B1: {
              showMark: '预执行',
              name: '设计时预执行',
              className: 'b1',
              isDesign: false,
              isEdit: false,
              isDel: false,
              isView: true
            },
            A2: {
              showMark: '待审批',
              name: '待审批',
              className: 'a2',
              isDesign: false,
              isEdit: false,
              isDel: true,
              isView: true
            },
            B2: {
              showMark: '预执行',
              name: '待审批时预执行',
              className: 'b2',
              isDesign: false,
              isEdit: false,
              isDel: false,
              isView: true
            },
            A3: {
              showMark: '待执行',
              name: '待执行',
              className: 'a3',
              isDesign: false,
              isEdit: false,
              isDel: true,
              isView: true
            },
            B3: {
              showMark: '执行中',
              name: '执行中',
              className: 'b3',
              isDesign: false,
              isEdit: false,
              isDel: false,
              isView: true
            },
            A5: {
              showMark: '完成',
              name: '完成',
              className: 'a5',
              isDesign: false,
              isEdit: false,
              isDel: true,
              isView: true
            },
            A4: {
              showMark: '终止',
              name: '终止',
              className: 'a4',
              isDesign: false,
              isEdit: false,
              isDel: true,
              isView: true
            },
            A6: {
              showMark: '异常',
              name: '异常',
              className: 'a6',
              isDesign: false,
              isEdit: false,
              isDel: true,
              isView: true
            }
          };

          /**
           * 删除活动
           */
          scope.onDel = function() {
            var confirmDel = $ccModal
              .confirm('活动删除后将无法恢复，确定要删除活动' + camp.campName + '吗？',
              function() { })
              .open();

            confirmDel
              .result
              .then(function() {
                deleteService
                  .deleteCampaign(camp.campId,
                  function(data) {
                    $ccTips.success("删除成功");
                    var eventsDom = $document.find('.im-event-detail-box');
                    angular.forEach(eventsDom, function(item) {
                      item.remove();
                    });
                    bcFn && bcFn();
                  });
              });
          };

          /**
           * 强制关闭
           */
          scope.onForce = function(event) {
            autoCloseFn(event, true);
          };

          /**
           * 编辑获取
           */
          scope.onEdit = function(event, camp, type) {
            scope.onForce(event);
            var boxCtrl = $document.find('.marketActivity-page').scope();
            boxCtrl.$ctrl.activityEvent(camp, type);
          };

          /**
           * 获取单个活动详情
           */
          scope.getCampDetail = function() {
            scope.loading = true;
            var apiUrl = GLOBAL_STATIC.campaignRoot + 'campaign/:id';
            $resource(apiUrl)
              .get({ _: new Date().getTime(), id: camp.campId }, function(res) {
                scope.loading = false;
                scope.event = res || {};
              });
          };

          return $q
            .all(promises)
            .then(function(resolves) {
              scope.getCampDetail();
              eventBox[0].style.overflow = 'hidden';
              bodyDom.append($compile(resolves.template)(scope));
            });
        }
      };
    }];

}

/**
 * 过滤器
 */
function imDateFilterHelper() {
  return function(date) {
    if (!date) {
      return '';
    }
    var out = '';
    var dateTime = new Date(date),
      year = dateTime.getFullYear(),
      month = dateTime.getMonth() + 1,
      day = dateTime.getDate();

    if (year >= 2099) {
      out = '无结束时间';
    } else {
      out = year + '年' + month + '月' + day + '日';
    }
    return out;
  };
}
