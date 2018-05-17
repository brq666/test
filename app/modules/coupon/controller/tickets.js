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
  var posX = e.pageX + 15,
      posY = e.pageY + 15;
  $("#couponTip").css({
    "left": posX,
    "top": posY - 56
  }).html(htmlEntities(boxVal, true)).show();
}

function hideMark() {
  $("#couponTip").hide();
}

$('#couponListsGrid').flexigrid({
  url: rootStatic + 'coupon/taobao/list/',
  method: 'GET',
  dataType: 'json',
  colModel: [{
    display: '店铺名称',
    name: 'shopName',
    width: 2,
    sortable: false,
    dataindex: 'shop.shopName'
  },
  {
    display: '优惠券ID',
    name: 'couponId',
    width: 2,
    sortable: false,
    dataindex: 'couponId'
  },
  {
    display: '优惠券名称',
    name: 'couponName',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'couponName'
  },
  {
    display: '创建人',
    name: 'couponEditor',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'creator.realName'
  },
  {
    display: '创建时间',
    name: 'createTime',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'createTime'
  },
  {
    display: '生效时间',
    name: 'startTime',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'startTime'
  },
  {
    display: '截止时间',
    name: 'endTime',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'endTime'
  },
  {
    display: '优惠券面额（元）',
    name: 'couponValue',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'denomination.denominationName'
  },
  {
    display: '备注',
    name: 'remark',
    width: 1,
    sortable: false,
    align: 'center',
    dataindex: 'remark',
    renderer: function(v) {
      return v == '' ? '': '<a href="javascript:void(0)" class="couponMark" _title="' + v + '" onmouseover="viewMark(this,event)" onmouseout="hideMark()"></a>';
    }
  },
  {
    display: '使用条件',
    name: 'threshold',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'threshold',
    renderer: function(v) {
      return v == 0 ? '不限': '满' + v + '元';
    }
  },
  {
    display: '是否失效',
    name: 'available',
    width: 2,
    sortable: false,
    align: 'center',
    dataindex: 'available',
    renderer: function(v) {
      if (v) {
        return "有效";
      } else {
        return "失效";
      }
    }
  },
  {
    display: '状态',
    name: 'enable',
    width: 1,
    align: 'center',
    dataindex: 'enable',
    mapping: ['couponId'],
    convert: function(v, mappVal) {
      return '<a href="javascript:void(0)" class="' + (v ? "avaliableTrue": "avaliableFalse") + '" title="' + (v ? "点击禁用": "点击启用") + '" onclick="changeAvaliable(\'' + mappVal[0] + '\',' + v + ');"></a>'
    }
  },
  {
    display: '操作',
    name: 'operation',
    width: 1,
    align: 'center',
    dataindex: 'couponId',
    renderer: function(v) {
      return '<a href="#/tickets/modify:' + v + '" class="modify_btn" title="修改"></a>';
    }
  }],
  sortname: '',
  sortorder: "asc",
  buttons: [],
  searchitems: {
    display: '搜索优惠券名称',
    name: 'couponName'
  },
  usepager: true,
  useRp: true,
  rp: 20,
  showTableToggleBtn: true,
  colAutoWidth: true,
  rowDblClick: function() {
    location.hash = '#/view/modify:' + $(this).data('rec').couponId;
  },
  onError: function(response) {
    if (response.status == 401) {
      location.pathname = root + 'login.html';
      return;
    }
  }
});

function changeAvaliable(id, v) {
  $.ajax({
    headers: {
      'Content-Type': 'application/json'
    },
    type: "PUT",
    url: rootStatic + "coupon/taobao/" + id,
    data: '{"enable":' + !v + '}',
    success: function() {
      //alert((v ? '禁用' : '启用')+'成功');
      $(this).Alert({
        "title": "提示",
        "str": (v ? '禁用': '启用') + '成功',
        "mark": true,
        "width": "160px"
      });
      $('#couponListsGrid').flexReload();
    }
  });
}
