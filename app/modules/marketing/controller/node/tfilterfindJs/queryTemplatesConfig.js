//查询节点类型配置
var queryTemplates=[
  {
    'type':'数字输入',
    'template':'<div class="query_node_condition" query-condition number-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div><select name="numSelected{{index}}"  ng-model="operator" ng-options="choice for choice in data.configs[\'NumberType\']"  class="commSelect inputDescribe mr5 fl"></select><input type="text" autocomplete="off" name="numValited{{index}}" class="required borderHighlight w90 mr5"  ng-model="numInput1"><span ng-show="isMid"><span class="m">-</span><input type="text" autocomplete="off" name="numValitedTwo{{index}}" class="required borderHighlight w90 mr5" ng-model="numInput2"></span></div></div></div> '
  },
  {
    'type':'字符输入',
    'template':'<div class="query_node_condition" query-condition string-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div><select name="stringSelected{{index}}" ng-model="operator" ng-options="choice for choice in data.configs[\'StringType\']"  class="commSelect inputDescribe mr5 fl"></select><input name="stringValited{{index}}" autocomplete="off" type="text" class="required borderHighlight w90 mr5"  ng-model="stringInput" ></div></div></div> '
  },
  {
    'type':'时间选择',
    'template':'<div class="query_node_condition" query-condition time-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="ml5 mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10"> <select  name="c{{index}}" ng-model="operator" ng-options="choice for choice in data.configs[\'DatetimeType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="d{{index}}" ng-model="dateInput1" date-time-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="e{{index}}" ng-model="dateInput2" date-time-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'">  <select  name="gggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select>  <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="f{{index}}" ng-model="monthOrDayOrSecondInput1" max-integer="{{numcount}}"> <select name="g{{index}}" class="w50" ng-model="subType"  ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime"></select> <span ng-show="subType==\'0\' || subType==\'1\' "> <span ng-show="subType==\'0\'"><input type="text"  class="required borderHighlight w50 mr5"  name="h{{index}}" ng-model="dayInput1" date-select readonly="readonly"> 号</span> <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="hh{{index}}" ng-model="timeInput1" timepicker readonly="true"></span> <span ng-show="isMid"> <span class="m">-</span><select name="ggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select><input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="j{{index}}" ng-model="monthOrDayOrSecondInput2" max-integer="{{numcount}}"> <select name="k{{index}}" id="" class="w50" ng-model="subType" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime" ng-options="dirValueTime.id as dirValueTime.value for dirValueTime in dirValueListTime" > </select> <span ng-show="subType==\'0\' || subType==\'1\' "> <span ng-show="subType==\'0\'"><input type="text" autocomplete="off" class="required borderHighlight w50 mr5"  name="gg{{index}}" ng-model="dayInput2" date-select readonly="readonly"> 号 </span><input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="i{{index}}" ng-model="timeInput2" timepicker readonly="true"></span> </span> </span> </div></div></div> '
  },
  {
    'type':'日期选择',
    'template':'<div class="query_node_condition" query-condition date-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="ml5 mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" autocomplete="off" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> <select  name="gggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}f" autocomplete="off" ng-model="dayOrMonthInput1" num-type="整数" max-integer="{{numcount}}" month-input> <select name="{{index}}g" id="" class="w50" ng-model="isDay" ng-options="dirValue.id as dirValue.value for dirValue in dirValueList ">  </select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select readonly="readonly" >号</span> <span ng-show="isMid"> <span class="m">-</span> <select  name="gggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select> <input type="text"autocomplete="off"  class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" max-integer="{{numcount}}" num-type="整数" month-input> <select name="i" ng-model="isDay" id="" class="w50"  ng-options="dirValue.id as dirValue.value for dirValue in dirValueList" ></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select readonly="readonly">号</span> </span> </span> </div></div></div> '
  },
  {
    'type':'生日选择',
    'template':'<div class="query_node_condition" query-condition birthday-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="ml5 mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DatetimeType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-picker-birthday readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" autocomplete="off" name="{{index}}e" ng-model="dateInput2" date-picker-birthday readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> <select  name="gggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select>  <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}f" autocomplete="off" ng-model="dayOrMonthInput1" num-type="整数" max-integer="{{numcount}}" month-input> <select name="{{index}}g" id="" class="w50" ng-model="isDay" ng-options="dirValue.id as dirValue.value for dirValue in dirValueList ">  </select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select readonly="readonly" >号</span> <span ng-show="isMid"> <span class="m">-</span> <select  name="gggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select>  <input type="text"autocomplete="off"  class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" max-integer="{{numcount}}" num-type="整数" month-input> <select name="i" ng-model="isDay" id="" class="w50"  ng-options="dirValue.id as dirValue.value for dirValue in dirValueList" ></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select readonly="readonly">号</span> </span> </span> </div></div></div>'
  },
  {
    'type':'字典选择',
    'template':'<div class="query_node_condition" query-condition directory-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div><div class="directory_type_item" ng-repeat="checkList in data.configs"><label class="maxWidth90 height18" title="{{checkList.name}}"><input class="commCheckbox" name="directoryCheck" type="checkbox" ng-model="checkList.status"  id="{{checkList.id}}">{{checkList.name}}</label></div></div> </div></div> '
  },
  {
    'type':'关键字定制',
    'template': '<div class="query_node_condition" query-condition keyword-type><div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCondition()">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><p class="fl commFontMark mr10 blueColor maxWidth90" ng-repeat="fontList in fontLists" title="{{fontList}}">{{fontList}}</p></div><div class="commSelectPlug" ng-include src="commPlugSrc"></div></div></div> '
  },
  {
    'type':'地区选择',
    'template': '<div class="query_node_condition" query-condition city-type><div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCondition(cityLists)">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><p class="fl commFontMark mr10 blueColor" ng-repeat="fontList in cityLists">{{replace(fontList.name)}}</p></div><div class="commSelectPlug" ng-include src="commPlugSrc"></div></div></div> '
  },
  {
    'type':'标签选择',
    'template': '<div class="query_node_condition" query-condition query-label-type><div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCondition()">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><p class="fl commFontMark mr10 blueColor maxWidth90" ng-repeat="labelList in queryLabelLists" title="{{labelList.name}}">{{labelList.name}}</p></div><div class="commSelectPlug" ng-include src="commPlugSrc"></div></div></div> '
  },
  {
    'type':'行为自定义',
    'template':'<div class="query_node_condition custom_node-condition" ng-cloak query-condition custom-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCustomCondition(data.id,data.type,data.name)">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><div class="fl queryCustomAttr mr10"><p>筛选条件</p><ul ng-show="queryCustomAttrLists.length==0"><li>不限</li></ul><ul ng-show="queryCustomAttrLists.length!=0"><li ng-repeat="queryCustomAttr in queryCustomAttrLists" ng-show="queryCustomAttr.values" ><span class="queryCustomAttrTitle" title="{{queryCustomAttr.name}}">{{queryCustomAttr.name}}</span><span class="queryCustomAttrValue" title="{{filterTitle(queryCustomAttr.values)}}">：<span ng-bind-html="trustHtml(queryCustomAttr.values)"></span></span></li></ul></div><div class="fl queryCustomIndicator"><p>满足汇总指标<span  ng-show="queryCustomIndicatorLists.length!=0">（多个指标关系：{{queryCustomIndicatorRelation}}）</span></p><ul ng-show="queryCustomIndicatorLists.length==0"><li>不限</li></ul><ul ng-show="queryCustomIndicatorLists.length!=0"><li ng-repeat="queryCustomIndicator in queryCustomIndicatorLists" ng-show="queryCustomIndicator.values"><span class="queryCustomIndicatorTitle" title="{{queryCustomIndicator.name}}">{{queryCustomIndicator.name}}</span><span class="queryCustomIndicatortrValue" title="{{queryCustomIndicator.values}}">：{{queryCustomIndicator.values}}</span></li></ul></div></div></div></div> '
  },
  {
    'type':'未参加',
    'template':'<div class="query_node_condition" query-condition activity-history-unattend-or-last> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div><em class="ico_tips queryConditionsTips" ng-title="{{data.tip}}" ng-show="data.tip"></em> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" autocomplete="off" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="{{index}}g" id="" class="w50" ng-model="isDay" ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" readonly="readonly" class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="i" ng-model="isDay" id="" class="w50" ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"> </select> <span ng-show="isDay==\'false\'"> <input type="text"  readonly="readonly" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div></div></div> '
  },
  {
    'type':'最后参加时间',
    'template':'<div class="query_node_condition" query-condition activity-history-unattend-or-last> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div><em class="ico_tips queryConditionsTips" ng-title="{{data.tip}}" ng-show="data.tip"></em>  <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="{{index}}g" id="" class="w50" ng-model="isDay"  ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" readonly="readonly" class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="i" ng-model="isDay" id="" class="w50"  ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" readonly="readonly" class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div></div></div> '
  },
  {
    'type':'参加次数',
    'template':'<div class="query_node_condition" query-condition activity-history-number> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div><em class="ico_tips queryConditionsTips" ng-title="{{data.tip}}" ng-show="data.tip"></em>  <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="{{index}}g" id="" class="w50" ng-model="isDay" ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" readonly="readonly" class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="i" ng-model="isDay" id="" class="w50"  ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" readonly="readonly" class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div><div class="mt10"><label class="commLabelWidth84">活动选择：</label><input class="width200 borderHighlight ml5 " type="text" autocomplete="off" name="hdxz{{index}}" readonly="readonly" ng-model="activityLength" ng-click="selectefActivity()" /></div><div class="mt10"><label class="commLabelWidth84">参加活动次数：</label><select  name="{{index}}c" ng-model="activityNumOperator" ng-options="choice for choice in data.configs[\'ActivityType\']"  class="commSelect inputDescribe"></select><input type="text"  class="required borderHighlight w50 mr5" autocomplete="off" name="hd{{index}}" ng-model="joinActivityNum" max-integer="{{numcount}}"  ><span ng-show="isActivityMid"><span class="m">-</span><input type="text"  autocomplete="off" name="hdjy{{index}}" class="required borderHighlight w50 mr5" max-integer="{{numcount}}" ng-model="joinActivityNumTwo"></span></div><div class="commSelectPlug" ng-include src="commPlugSrc" onload="openActivityPop()" ></div></div></div> '
  },
  {
    'type':'活动成功',
    'template':'<div class="query_node_condition" query-condition  activity-history-success> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div><em class="ico_tips queryConditionsTips" ng-title="{{data.tip}}" ng-show="data.tip"></em>  <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="{{index}}g" id="" class="w50" ng-model="isDay" ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" readonly="readonly" class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="i" ng-model="isDay" id="" class="w50" ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" readonly="readonly" autocomplete="off"  class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div><div class="mt10"><label class="commLabelWidth84">活动选择：</label><input class="width200 borderHighlight ml5 " autocomplete="off" type="text" name="hdxz{{index}}" readonly="readonly" ng-model="activityLength" ng-click="selectefActivity()" /></div><div class="commSelectPlug" ng-include src="commPlugSrc" onload="openActivityPop()"></div></div></div> '
  },
  {
    'type':'数据导入',
    'template':'<div class="query_node_condition" query-condition  import-batch-data> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div><em class="ico_tips queryConditionsTips" ng-title="{{data.tip}}" ng-show="data.tip"></em>  <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="mt10"><label class="commLabelWidth84">导入批次选择：</label><input class="width200 borderHighlight ml5 " autocomplete="off" type="text" name="hdxz{{index}}" readonly="readonly" ng-model="dataBatchNum" ng-click="selectedDataBatch()" /></div><div class="commSelectPlug" ng-include src="commPlugDataBatchSrc" onload="openDataBatchPop()"></div></div></div> '
  },
  {
    'type':'即将到期积分',
    'template':'<div class="query_node_condition" query-condition integral-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div><em class="ico_tips queryConditionsTips" ng-title="{{data.tip}}" ng-show="data.tip"></em> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="mb10"><label class="commLabelWidth84">积分数值：</label><select  name="{{index}}c" ng-model="integralNumOperator" ng-options="choice for choice in data.configs[\'IntegralType\']"  class="commSelect inputDescribe"></select><input type="text"  class="required borderHighlight w50 mr5" autocomplete="off" name="hd{{index}}" ng-model="joinIntegralNum" max-integer="{{numcount}}"  ><span ng-show="isIntegralMid"><span class="m">-</span><input type="text"  autocomplete="off" name="hdjy{{index}}" class="required borderHighlight w50 mr5" max-integer="{{numcount}}" ng-model="joinIntegralNumTwo"></span></div><label class="commLabelWidth84">积分到期时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect inputDescribe mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" autocomplete="off" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text" autocomplete="off" class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> <select  name="gggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select> <input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="{{index}}g" id="" class="w50" ng-model="isDay" ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"></select> <span ng-show="isDay==\'false\'"> <input type="text" autocomplete="off" readonly="readonly" class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span><select  name="gggg{{index}}" ng-options="dir.id as dir.value for dir in dirList" ng-model="configDirType"></select><input type="text" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-type="整数" month-input  max-integer="{{numcount}}"> <select name="i" ng-model="isDay" id="" class="w50" ng-options="dirValueMarket.id as dirValueMarket.value for dirValueMarket in dirValueListMarket"> </select> <span ng-show="isDay==\'false\'"> <input type="text"  readonly="readonly" autocomplete="off" class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div></div></div> '
  }
];
