//查询节点类型配置
var dataManageQueryTemplates = [
  {
    'type': '数字输入',
    'template': '<div  id="{{data.id}}" class="condition" data-index="{{index}}"   data-index="{{index}}" customer-condition' +
        ' number-data-type ><label class="down" id="lbl{{data.id}}" title="{{data.name}}">{{data.name}}<em></em></label>' +
        '<section data-type="add" id="add{{data.id}}" class="numberType" default="{{defaultOldValue}}"><span class="firstLine">请输入{{data.name}}:</span>' +
        '<input type="text" name="numValited{{index}}" class="required borderHighlight w50 mr5"  ng-model="numInput1">' +
        '-' +
        '<input type="text" name="numValited{{index}}" class="required borderHighlight w50 mr5" ng-model="numInput2">' +
        "<em class='ico_tips' ng-show='data.tip' dm-title='{{data.tip}}'></em></label>" +
        '<button class="btn btnBlue commSmallBtn">确定</button>' +
        '<span class="lineMask"></span></section><label class="edit" id="edit{{data.id}}" style="display:none"><span><em></em><a title="{{numInput}}">{{numInput}}' +
        '</a><em >×</em></span></label></div>'
  },
  {
    'type': '字符输入',
    "template": '<div  id="{{data.id}}"  class="condition" data-index="{{index}}"  customer-condition string-data-type >' +
        '<label class="down" id="lbl{{data.id}}" title="{{data.name}}">{{data.name}}<em></em></label>' +
        '<section data-type="add" id="add{{data.id}}"  default="{{defaultOldValue}}"><span class="firstLine">请输入{{data.name}}:</span>' +
        '<input name="stringValited{{index}}" type="text" class="required borderHighlight w130 mr5"  ng-model="stringInput" >' +
        "<em class='ico_tips' ng-show='data.tip' dm-title='{{data.tip}}'></em></label>" +
        '<button class="btn btnBlue commSmallBtn">确定</button>' +
        '<span class="lineMask"></span></section><label class="edit" id="edit{{data.id}}" style="display:none"><span><em></em><a title="{{stringInput}}">{{stringInput}}</a>' +
        '<em>×</em></span></label></div>'
  },
  {
    'type': '时间选择',
    'template': '<div  id="{{data.id}}"  class="condition" data-index="{{index}}"  customer-condition time-data-type ><label class="down" title="{{data.name}}" id="lbl{{data.id}}">{{data.name}}<em></em></label>' +
        '<section data-type="add" id="add{{data.id}}"  default="{{defaultOldValue}}"><span class="firstLine">请输入{{data.name}}:</span>' +
        '<input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" ng-data-date-picker readonly="true"> ' +
        '<span ng-show="isMid"> <span class="m">-</span> ' +
        '<input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" ng-data-date-picker readonly="true">' +
        "<em class='ico_tips' ng-show='data.tip' dm-title='{{data.tip}}'></em></label>" +
        '<button class="btn btnBlue commSmallBtn">确定</button>' +
        '<span class="lineMask"></span></section><label class="edit" id="edit{{data.id}}" style="display:none"><span >' +
        '<em ></em><em>×</em></span></label></div>'
  },
  {
    'type': '日期选择',
    'template': '<div  id="{{data.id}}"  class="condition" data-index="{{index}}"  customer-condition date-data-type >' +
        '<label class="down"  id="lbl{{data.id}}" title="{{data.name}}">{{data.name}}<em></em></label>' +
        '<section data-type="add" id="add{{data.id}}"  default="{{defaultOldValue}}"><span class="firstLine">请输入{{data.name}}:</span>' +
        '<input type="text"  class="required borderHighlight w150 mr5 datetimepicker"  name="{{index}}d" ng-model="dateInput1" ng-data-date-picker readonly="true"> ' +
        '-' +
        '<input type="text"  class="required borderHighlight w150 mr5 datetimepicker"  name="{{index}}e" ng-model="dateInput2" ng-data-date-picker readonly="true">' +
        "<em class='ico_tips' ng-show='data.tip' dm-title='{{data.tip}}'></em></label>" +
        '<button class="btn btnBlue commSmallBtn">确定</button>' +
        '<span class="lineMask"></span></section><label class="edit" id="edit{{data.id}}" style="display:none"><span >' +
        '<em ></em><em >×</em></span></label></div>'
  },
  {
    'type': '生日选择',
    'template': '<div class="query_node_condition" class="condition" customer-condition birthday-data-type id="{{data.id}}"  data-index="{{index}}" > ' +
        '<div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="mt10"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DatetimeType\']"  class="commSelect w100 mr5 fl"></select> <span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-picker-birthday readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-picker-birthday readonly="true"></span> </span></div></div></div> '
  },
  {
    'type': '字典选择',
    'template': '<div  id="{{data.id}}"  class="condition" data-index="{{index}}"  customer-condition directory-data-type ><label class="down"  id="lbl{{data.id}}">{{data.name}}<em></em></label>' +
        '<section data-type="add" id="add{{data.id}}"  default="{{defaultOldValue}}"><span class="firstLine">请选择{{data.name}}:</span>' +
        ' <select  name="{{index}}c" ng-model="directoryValue" style="width:140px;margin-left:0" class="commSelect width130 ng-pristine ng-valid"' +
        'ng-options="choice.name for choice in data.configs" ><option value="">-请选择-</option></option></select>' +
        "<em class='ico_tips' ng-show='data.tip' dm-title='{{data.tip}}'></em></label>" +
        '<button class="btn btnBlue commSmallBtn">确定</button>' +
        '<span class="lineMask"></span></section><label class="edit" id="edit{{data.id}}"  style="display:none"><span ><em ></em><a title="{{directoryValue.name}}">{{directoryValue.name}}</a>' +
        '<em >×</em></span></label></div>'
  },
  {
    'type': '关键字定制',
    'template': '<div class="query_node_condition" customer-condition keyword-data-type><div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCondition()">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><p class="fl commFontMark mr10 blueColor maxWidth90" ng-repeat="fontList in fontLists" title="{{fontList}}">{{fontList}}</p></div><div class="commSelectPlug" ng-include src="commPlugSrc"></div></div></div> '
  },
  {
    'type': '地区选择',
    'template': '<div class="query_node_condition" customer-condition city-data-type><div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCondition(cityLists)">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><p class="fl commFontMark mr10 blueColor" ng-repeat="fontList in cityLists">{{replace(fontList.name)}}</p></div><div class="commSelectPlug" ng-include src="commPlugSrc"></div></div></div> '
  },
  {
    'type': '标签选择',
    'template': '<div class="query_node_condition" customer-condition query-data-label-type><div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCondition()">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><p class="fl commFontMark mr10 blueColor maxWidth90" ng-repeat="labelList in queryLabelLists" title="{{labelList.value}}">{{labelList.value}}</p></div><div class="commSelectPlug" ng-include src="commPlugSrc"></div></div></div> '
  },
  {
    'type': '行为自定义',
    'template': '<div class="query_node_condition custom_node-condition" customer-condition custom-data-type> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <a class="fl ml10 blueColor" href="javascript:void(0)" ng-click="editorCustomCondition(data.id,data.type,data.name)">[编辑]</a><div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><div class="clearfix"><div class="fl queryCustomAttr mr10"><p>筛选条件</p><ul ng-show="queryCustomAttrLists.length==0"><li>不限</li></ul><ul ng-show="queryCustomAttrLists.length!=0"><li ng-repeat="queryCustomAttr in queryCustomAttrLists" ng-show="queryCustomAttr.values" ><span class="queryCustomAttrTitle">{{queryCustomAttr.name}}</span><span class="queryCustomAttrValue">：<span ng-bind-html="queryCustomAttr.values"></span></span></li></ul></div><div class="fl queryCustomIndicator"><p>满足汇总指标</p><ul ng-show="queryCustomIndicatorLists.length==0"><li>不限</li></ul><ul ng-show="queryCustomIndicatorLists.length!=0"><li ng-repeat="queryCustomIndicator in queryCustomIndicatorLists" ng-show="queryCustomIndicator.values"><span class="queryCustomIndicatorTitle">{{queryCustomIndicator.name}}</span><span class="queryCustomIndicatortrValue">：{{queryCustomIndicator.values}}</span></li></ul></div></div></div></div> '
  },
  {
    'type': '未参加',
    'template': '<div class="query_node_condition" customer-condition activity-history-unattend-or-last> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect w100 mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-data-type="整数" month-data-input> <select name="{{index}}g" id="" class="w50" ng-model="isDay"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-data-type="整数" month-data-input> <select name="i" ng-model="isDay" id="" class="w50"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div></div></div> '
  },
  {
    'type': '最后参加时间',
    'template': '<div class="query_node_condition" customer-condition activity-history-unattend-or-last> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect w100 mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-data-type="整数" month-data-input> <select name="{{index}}g" id="" class="w50" ng-model="isDay"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-data-type="整数" month-data-input> <select name="i" ng-model="isDay" id="" class="w50"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div></div></div> '
},
  {
    'type': '参加次数',
    'template': '<div class="query_node_condition" customer-condition activity-history-number> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect w100 mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-data-type="整数" month-data-input> <select name="{{index}}g" id="" class="w50" ng-model="isDay"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-data-type="整数" month-data-input> <select name="i" ng-model="isDay" id="" class="w50"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div><div class="mt10"><label class="commLabelWidth84">活动选择：</label><input class="width200 borderHighlight ml5 " type="text" name="hdxz{{index}}" readonly="readonly" ng-model="activityLength" ng-click="selectefActivity()" /></div><div class="mt10"><label class="commLabelWidth84">参加活动次数：</label><select  name="{{index}}c" ng-model="activityNumOperator" ng-options="choice for choice in data.configs[\'ActivityType\']"  class="commSelect w100"></select><input type="text"  class="required borderHighlight w50 mr5" name="hd{{index}}" ng-model="joinActivityNum" max-integer="{{numcount}}"  ><span ng-show="isActivityMid"><span class="m">-</span><input type="text" name="hdjy{{index}}" class="required borderHighlight w50 mr5" max-integer="{{numcount}}" ng-model="joinActivityNumTwo"></span></div><div class="commSelectPlug" ng-include src="commPlugSrc" onload="openActivityPop()" ></div></div></div> '
  },
  {
    'type': '活动成功',
    'template': '<div class="query_node_condition" customer-condition  activity-history-success> <div class="query_node_title"> <div class="query_node_title_blue"></div><div class="fl maxWidth700 height30" title="{{defaultName || data.name}}">{{index}} -{{defaultName || data.name}}</div> <div class="query_node_close" ng-click="queryConditionClose(index)"></div></div> <div class="query_node_content"><label class="commLabelWidth84">活动时间：</label><label class="mr10"> <input type="radio" class="commRadio v1" ng-model="dateType" value="absolutely">绝对时间</label> <label class="mr10"> <input type="radio" class="commRadio v1" value="relatively" ng-model="dateType" ng-disabled="isRelativeDisable">相对时间</label> <div class="mt10 ml84"> <select  name="{{index}}c" ng-model="operator" ng-options="choice for choice in data.configs[\'DateType\']"  class="commSelect w100 mr5 fl"></select> <span ng-show="dateType == \'absolutely\'"> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}d" ng-model="dateInput1" date-absolute-picker readonly="true"> <span ng-show="isMid"> <span class="m">-</span> <input type="text"  class="required borderHighlight w150 mr5 datetimepicker" name="{{index}}e" ng-model="dateInput2" date-absolute-picker readonly="true"></span> </span> <span ng-show="dateType == \'relatively\'"> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}f" ng-model="dayOrMonthInput1" num-data-type="整数" month-data-input> <select name="{{index}}g" id="" class="w50" ng-model="isDay"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sg" ng-model="dayInput1" date-select>号</span> <span ng-show="isMid"> <span class="m">-</span> 前 <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}sah" ng-model="dayOrMonthInput2" num-data-type="整数" month-data-input> <select name="i" ng-model="isDay" id="" class="w50"> <option value="false">月</option> <option value="true">天</option> </select> <span ng-show="isDay==\'false\'"> <input type="text"  class="required borderHighlight w50 mr5" name="{{index}}skk" ng-model="dayInput2" date-select>号</span> </span> </span> </div><div class="mt10"><label class="commLabelWidth84">活动选择：</label><input class="width200 borderHighlight ml5 " type="text" name="hdxz{{index}}" readonly="readonly" ng-model="activityLength" ng-click="selectefActivity()" /></div><div class="commSelectPlug" ng-include src="commPlugSrc" onload="openActivityPop()"></div></div></div> '
  }
]