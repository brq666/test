$(".ccms_tips").Tips();
function htmlEntities(s, newline) {
    s = s || '';
    
    s = s.replace(/&/g, '&amp;'); // 38 26
    s = s.replace(/"/g, '&quot;'); // 34 22
    s = s.replace(/\'/g, '&#39;'); // 39 27
    s = s.replace(/</g, '&lt;'); // 60 3C
    s = s.replace(/>/g, '&gt;'); // 62 3E
    if (newline) {
        s = s.replace(/\n/g, '<br />');
    }
    return s;
}
function fixEvt(evt) { //修正对象在各浏览器的不同
  evt = evt || window.event;
  if (!evt.target) { //IE
    evt.target = evt.srcElement;
    evt.layerX = evt.offsetX;
    evt.layerY = evt.offsetY;
    evt.stopPropagation = function() {
      this.cancelBubble = true;
    }
    evt.preventDefault = function() { //evt.preventDefault()放在方法最前，可阻止冒泡。
      event.returnValue = false;
    }
    evt.pageX = evt.clientX + document.documentElement.scrollLeft;
    evt.pageY = evt.clientY + document.documentElement.scrollTop;
  }
  return evt;
}

function viewMark(t, e) { //备注显示
  var boxVal = $(t).attr("_title");
  e = fixEvt(e);
  var customMove = 15,
      posX = e.pageX,
      posY = e.pageY,
      windowH = $(window).height(),
      windowW = $(window).width(),
      elementW = $(t).outerWidth(true),
      elementH = $(t).outerHeight(true);
  $("#couponTip").html(htmlEntities(boxVal, true)).css({
    "left": (posX + customMove + elementW > windowW) ? posX - customMove - elementW: posX + customMove,
    "top": ((posY + elementH > windowH) ? windowH - elementH : posY) - 56
  }).show();
}

function hideMark() {
  $("#couponTip").hide();
}
$('#couponListsGrid').flexigrid({
  url: GLOBAL_STATIC.datamanageRoot + 'redlist/',
  //url: 'http://10.200.187.93:8085/web-datamanage/redlist',
  method: 'GET',
  dataType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  colModel: [{
    display: '全选',
    name: 'enable',
    width: 1,
    align: 'center',
    dataindex: 'enabled',
    mapping: ['id'],
    convert: function(v, mappVal) {
      return '<input type="checkbox" class="v2 m10 ng-valid ng-dirty" ng-model="" value="true">'
    }
  },
  {
    display: '客户ID',
    name: 'customerno',
    width: 1,
    sortable: true,
    dataindex: 'customerno'
  },
  {
    display: '所属红名单分组',
    name: 'groupName',
    width: 1,
    sortable: true,
    align: 'center',
    dataindex: 'groupName'
  },
  {
    display: '操作时间',
    name: 'lastUpdate',
    width: 1,
    sortable: true,
    dataindex: 'lastUpdate'
  },
  {
    display: '操作方式',
    name: 'entryMode',
    width: 1,
    sortable: false,
    dataindex: 'entryMode'
  },
  {
    display: '操作人',
    name: 'entryMode',
    width: 1,
    sortable: false,
    dataindex: 'lastOperator'
  },
  {
    display: '备注',
    name: 'remark',
    width: 1,
    sortable: false,
    dataindex: 'remark'
  },

  {
    display: '操作',
    name: 'enable',
    width: 1,
    align: 'center',
    dataindex: 'enabled',
    mapping: ['id'],
    convert: function(v, mappVal) {
      return '<a href="javascript:void(0)" ng-click="accountObj.accountMethod(\'update\',\'' + mappVal[0] + '\')" class="modify_btn"></a>'
    }
  }],
  sortname: '',
  sortorder: "desc",
  buttons: [],
  updateDefaultParam: true,
  searchitems: {
    display: '搜索帐号/姓名'
  },
  usepager: true,
  useRp: true,
  rp: 20,
  showTableToggleBtn: true,
  colAutoWidth: true,
  onSuccess: function() {
    var scope = angular.element(".listContainer").scope();
    scope.accountObj.upCompile(scope);
  },
  onError: function(response) {
    var responseText = response.responseText;
    var data = $.parseJSON(responseText);
    $(this).Alert({
      "title": httpTitle || "提示",
      "str": data.message,
      "mark": true
    });
  }
});
