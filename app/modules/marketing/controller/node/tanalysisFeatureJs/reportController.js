angular.module("campaign.controllers").controller('featureReportController', ['$scope', '$rootScope', '$http', 'getListService', '$q', function ($scope,$rootScope,$http,getListService,$q){
  angular.element(".report-wrap").addInteractivePop({
    magTitle: "分析报告",
    width: 1100,
    mark: false,
    height: 710,
    position: "fixed",
    childElePop: true
  });

  $scope.analysisReportObj = {
    'reportZtree': '',
    'currentAnalysisItemData': '',
    'selecteNodeList': '',
    'currentSelectNode': '',
    'selectedNodeIndex': 0,
    'getReportItems': function() {
      var callBack = function(response) {
        $scope.analysisReportObj.analysisItems = response.data || [];
        $scope.analysisReportObj.initReportZtree($scope.analysisReportObj.analysisItems);
      };
      return getListService.getAnalysisItemsById(callBack)
    },
    'initReportZtree': function(data) {
      var isFirstItem = true;
      angular.forEach(data, function(val ,key) {
        val.open = false;
        if(val.dataType === 'C' && isFirstItem) {
          val.open = true;
          isFirstItem = false;
        }
      });
      var settings = '';
      var _this = this;
      settings = {
        data: {
          key: {
            title: "name"
          },
          simpleData: {
            enable: true
          }
        },
        view: {
          addDiyDom: function(treeId, treeNode) {
            var spaceWidth = 20;
            var switchObj = $("#" + treeNode.tId + "_switch"),
                icoObj = $("#" + treeNode.tId + "_ico"),
                checkObj = $("#" + treeNode.tId + "_check");
            switchObj.remove();
            icoObj.before(switchObj);
            switchObj.after(checkObj);
            var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
            switchObj.before(spaceStr);
            if (treeNode.isParent) {
              $("#" + treeNode.tId + "_check").remove();
            }
          },
          dblClickExpand: false,
          showIcon: true
        },
        callback: {
          onClick: function(even, treeId, treeNode) {
            $scope.$apply(function() {
              $scope.analysisReportObj.getAnalysisDate(treeNode, 'click');
            })
          }
        }
      };
      this.reportZtree = $.fn.zTree.init($('.report-wrap .reportItemZtree'), settings, data);
      this.selectedAnalysisItem();
    },
    'selectedAnalysisItem': function(flag) {
       var itemNodes = this.selecteNodeList= this.reportZtree.getNodesByFilter(function(node) {
        return (node.dataType === 'I');
      });
      var selectedNode = this.reportZtree.getSelectedNodes() || '';
      if(itemNodes.length <= 0) {
        return '当前无分析项';
      }
      if(!flag) {
        // 默认第一项
        this.selectedNodeIndex = 0;
      } else if(flag === 'prev' && this.selectedNodeIndex != 0){
        this.selectedNodeIndex--
      } else if(flag === 'next' && (this.selectedNodeIndex != itemNodes.length)){
        this.selectedNodeIndex++
      }
      this.reportZtree.selectNode(itemNodes[this.selectedNodeIndex]);
      this.getAnalysisDate(itemNodes[this.selectedNodeIndex]);
    },
    'getAnalysisDate': function(obj, flag) {
      var _this = this;
      if(flag) {
        angular.forEach(_this.selecteNodeList, function(val ,key) {
          if(val.id == _this.reportZtree.getSelectedNodes()[0].id) {
            _this.selectedNodeIndex = key;
          }
        });
      }
      _this.currentSelectNode = angular.copy(obj);
      if(obj.dataType === 'I') {
        // 获取分析报告数据
        _this.isChartsSvg = (_this.isChartsSvg != undefined ? _this.isChartsSvg : true);
        getListService.getAnalysisItemData(function(response) {
          var data = _this.currentAnalysisItemData =  response || '';
          if(_this.currentAnalysisItemData.showType == '01') {
            // pie sidebar
            _this.pieSidebarItemOne = _this.currentAnalysisItemData.data.conditions.slice(0, 11);
            _this.pieSidebarItemTwo = _this.currentAnalysisItemData.data.conditions.slice(11);
          }
          _this.initHighCharts(data);
        }, _this.currentSelectNode.id)
      }
    },
    'pieClolors': ['#F49C75', '#F6B37F', '#FBCE8A', '#FEF39A', '#CCE199', '#ACD697', '	#8AC896', '#86CAC9', '#7FCEF3', '#88AAD9',
      '#8C97CB', '#8E83BC', '#AA89BB', '#C390C0', '#F09FC2', '#F29DA0', '#EC6841', '#F2914A', '#F7B550', '#FDEC59',
        '#B2D464', '#80C26A', '#44B06C', '#34B4B2', '#1EB7EB', '#448AC9', '#448AC9', '#5F54A2', '#8A59A2', '#AE5CA1'
    ],
    'hasReportData': true, // 标记是否有数据，展示饼图
    'disponseChinaMap': function(data) {
      var staticResult = [
        { 'hc-key' : 'cn-sh', 'name' : '上海市' },
        { 'hc-key' : 'cn-jl',  'name' : '吉林省' },
        { 'hc-key' : 'cn-tj', 'name' : '天津市' },
        { 'hc-key' : 'cn-ah', 'name' : '安徽省' },
        { 'hc-key' : 'cn-sd', 'name' : '山东省' },
        { 'hc-key' : 'cn-sx', 'name' : '山西省' },
        { 'hc-key' : 'cn-xj',  'name' : '新疆维吾尔自治区' },
        { 'hc-key' : 'cn-hb', 'name' : '河北省' },
        { 'hc-key' : 'cn-he', 'name' : '河南省' },
        { 'hc-key' : 'cn-hn', 'name' : '湖南省' },
        { 'hc-key' : 'cn-gs', 'name' : '甘肃省' },
        { 'hc-key' : 'cn-fj',  'name' : '福建省' },
        { 'hc-key' : 'cn-gz', 'name' : '贵州省' },
        { 'hc-key' : 'cn-cq', 'name' : '重庆市' },
        { 'hc-key' : 'cn-js', 'name' : '江苏省' },
        { 'hc-key' : 'cn-hu', 'name' : '湖北省' },
        { 'hc-key' : 'cn-nm',  'name' : '内蒙古自治区' },
        { 'hc-key' : 'cn-gx', 'name' : '广西壮族自治区' },
        { 'hc-key' : 'cn-hl', 'name' : '黑龙江省' },
        { 'hc-key' : 'cn-yn', 'name' : '云南省' },
        { 'hc-key' : 'cn-ln', 'name' : '辽宁省' },
        { 'hc-key' : 'cn-zj',  'name' : '浙江省' },
        { 'hc-key' : 'cn-bj', 'name' : '北京市' },
        { 'hc-key' : 'cn-gd', 'name' : '广东省' },
        { 'hc-key' : 'cn-xz',  'name' : '西藏自治区' },
        { 'hc-key' : 'cn-sa', 'name' : '陕西省' },
        { 'hc-key' : 'cn-sc', 'name' : '四川省' },
        { 'hc-key' : 'cn-ha', 'name' : '海南省' },
        { 'hc-key' : 'cn-nx', 'name' : '宁夏回族自治区' },
        { 'hc-key' : 'cn-qh', 'name' : '青海省' },
        { 'hc-key' : 'cn-jx', 'name' : '江西省' }
      ]
      angular.forEach(staticResult, function(val, key) {
        var count = 0;
        var percent = 0;
        angular.forEach(data.conditions, function(v, k) {
          if(val.name == v) {
            count = data.counts[k];
            percent = data.percents[k];
          }
        })
        val.value = count;
        val.percent = percent;
      });
      return staticResult;
    },
    'initHighCharts': function(response) {
      var options = '';
      var _this = this;
      var categories = (response.data && response.data.conditions) || [];
      var commomOptions = {
        chart: {
          height: 520,
          backgroundColor: '#f8f8f8',
          width: 870
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        }
      }
      _this.hasReportData = true;
      response.data.counts = response.data && response.data.counts && response.data.counts.map(function(val) {
        return val*1;
      })
      _this.currentAnalysisItemData.totle = 0;
      angular.forEach(response.data.counts, function(val, key) {
        _this.currentAnalysisItemData.totle += val;
      });

      response.data.percents =response.data &&  response.data.percents && response.data.percents.map(function(val) {
        return val + '%';
      })

      /*
      * type: 01->饼图
      * 02->横向柱图
      * 03->竖向柱图
      * 04->中国地图
      */
      if(response.showType === '02') {
        // 横向柱图
        options = {
          chart: {
            type: 'bar'
          },
          xAxis: {
            reversed: false,
            categories:categories
          },
          yAxis: {
            title: {
              text: ''
            },
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
            },
            lineWidth: 1,
            tickAmount: 6,
            id: 'numb-axis'
          },
          legend: {
            enabled: false
          },
          tooltip: {
            formatter: function () {
              var s = this.x + ': ' + this.y + '人 占比:' + response.data.percents[this.point.index];
              return s;
            }
          },
          series: [{
            name: 'Population',
            color: '#2AA2D7',
            data: response.data.counts
          }]
        }
      } else if(response.showType === '01') {
        _this.hasReportData = false;
        var filterCounts = [];
        var filterConditions = [];
        var filterPercents = [];
        var defaultColor = ['#BCBCBC'];
        var filterFillColors = [];
        var formatterFn = function() {
          return filterConditions[this.point.index]+ ': <b>' + filterPercents[this.point.index]+ '</b>';
        };
        angular.forEach(response.data.counts, function(v, k) {
          if(v != 0) {
            _this.hasReportData = true;
            filterCounts.push(v);
            filterConditions.push(response.data.conditions[k]);
            filterPercents.push(response.data.percents[k]);
            filterFillColors.push(_this.pieClolors[k]);
          }
        })
        // 无数据，显示灰色pie
        if(!_this.hasReportData) {
          filterCounts = [1];
          formatterFn = function() {
            return '当前没有分析项输出'
          }
        }

        // 饼图
        options = {
          colors:_this.hasReportData ?  filterFillColors : defaultColor,
          chart: {
            type: 'pie'
          },
          tooltip: {//鼠标移动到每个饼图显示的内容
            formatter: formatterFn
          },
          plotOptions: {
            pie: {
              borderWidth: 0,
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
                color: '#000000',
                connectorColor: '#000000',
                formatter: function() {
                  return  '<b>'+ filterConditions[this.point.index] +'</b>: ' + this.point.y;
                }
              },
              padding:20
            }
          },
          series: [{//设置每小个饼图的颜色、名称、百分比
            type: 'pie',
            data: filterCounts
          }]
        }
      } else if(response.showType === '04') {
        // 中国地图
        var disponseData = _this.disponseChinaMap( response.data);
        options = {
          colorAxis: {
            min: 0,
            stops: [
              [0, '#EFEFFF'],
              [0.5, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
            ]
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom'
          },
          series: [{
            data:disponseData,
            joinBy: 'hc-key',
            name: '数量分布',
            mapData: Highcharts.maps["countries/cn/cn-all"] ,
            states: {
              hover: {
                color: Highcharts.getOptions().colors[2]
              }
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style : {
                'fontSize' : '9px',
                'fontWeight': 'normal'
              }
            },
            tooltip: {
              valueSuffix: ' 所占比率{point.percent}'
            }
          }]
        }
      }

      options = $.extend(true, commomOptions, options);
      $('.report-wrap .charts-element').html("");
      if(response.showType === '04') {
        $('.report-wrap .charts-element').highcharts('Map', options);
      } else {
        $('.report-wrap .charts-element').highcharts(options);
      }
    }
  }

  $scope.analysisReportObj.getReportItems();
}]);
