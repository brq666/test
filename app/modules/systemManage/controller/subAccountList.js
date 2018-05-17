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
    $("#couponTip").html(htmlEntities(boxVal, true));
    e = fixEvt(e);
    var posX = e.pageX + 15,
        posY = e.pageY + 15,
        ww = $(window).width(),
        wh = $(window).height(),
        ow = $("#couponTip").outerWidth(true),
        oh = $("#couponTip").outerHeight(true);
    if (posX + ow > ww) {
        posX = posX - ow;
    }
    if (posX < 0) {
        posX = 0;
    }
    if (posY + oh > wh) {
        posY = posY - oh;
    }
    if (posY < 0) {
        posY = 56; // header's height
    }
    $("#couponTip").css({
        "left": posX,
        "top": posY - 56
    }).show();
}

function hideMark() {
    $("#couponTip").hide();
}
angular.module('systemManage.controllers').controller('SubAccountListCtrl', ["$scope", function($scope) {
    $(".ccms_tips").Tips();

    var sel = 15;

    $('#subAccountListGrid').flexigrid({
        url: GLOBAL_STATIC.systemRoot + 'sys/user/listbind/?',
        method: 'GET',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: [{
            display: '旺旺账号',
            name: 'nameInPlat',
            width: 1,
            sortable: true,
            dataindex: 'nameInPlat'
        }, {
            display: '绑定的系统账号',
            name: 'loginName',
            width: 1,
            sortable: true,
            dataindex: 'loginName',
            mapping: ['bound'],
            convert: function(v, mappVal) {
                if (mappVal[0]) {
                    return "<span>" + v + "</span>";
                } else {
                    return "";
                }
            }
        }, {
            display: '操作',
            name: 'enable',
            width: 1,
            align: 'center',
            dataindex: 'enabled',
            mapping: ['id', 'nameInPlat', 'idInPlat', 'bound'],
            convert: function(v, mappVal) {
                var edit = '<a href="javascript:void(0)" ng-click="subAccountObj.accountMethod(\'update\',\'' + mappVal + '\')" title="编辑" class="edit_delete edit_icon"></a>';
                //unlock = '<a href="javascript:void(0)" ng-click="subAccountObj.accountMethod(\'update\',\''+mappVal[0]+'\')" title="解绑" class="iconfont jiebang-dec jiebang"></a>';
                return edit;
            }
        }],
        sortname: '',
        sortorder: "desc",
        params: [{
            name: "idInPlat",
            value: "*"
        }],
        buttons: [],
        updateDefaultParam: true,
        searchitems: {
            display: '搜索系统账号或旺旺账号',
            name: ""
        },
        usepager: true,
        useRp: true,
        rp: 20,
        showTableToggleBtn: true,
        colAutoWidth: true,
        page: 1,
        //current page
        total: 1,
        //total pages
        useRp: true,
        //use the results per page select box
        rp: 15,
        //results per page
        onSuccess: function() {
            var currScope = angular.element(".listContainer").scope();
            var scope = angular.element('.maincontainerB').scope();
            scope.subAccountObj.upCompile(currScope);
            $('.flexigrid select').val(sel)
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

    $('.flexigrid select').change(function(event) {
        sel = $(this).children('option:selected').val()
    });
}]);
