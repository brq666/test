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
angular.module('systemManage.controllers').controller('AccountListCtrl', ["$scope", function($scope) {
    $(".ccms_tips").Tips();

    var sel = 15;

    $('#couponListsGrid').flexigrid({
        url: GLOBAL_STATIC.systemRoot + 'sys/user/listbind/?idInPlat=',
        method: 'GET',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        colModel: [{
                display: '账号',
                name: 'loginName',
                width: 1,
                sortable: true,
                dataindex: 'loginName'
            }, {
                display: '姓名',
                name: 'realName',
                width: 1,
                sortable: true,
                dataindex: 'realName'
            }, {
                display: '手机号码',
                name: 'mobile',
                width: 1,
                sortable: true,
                align: 'center',
                dataindex: 'mobile'
            }, {
                display: 'Email',
                name: 'email',
                width: 1,
                sortable: true,
                dataindex: 'email'
            },
            /*{ display: '所属部门', name: 'department', width: 1, sortable: false,  dataindex: 'department.name' },先不做*/
            {
                display: '账号角色',
                name: 'role',
                width: 1,
                sortable: false,
                dataindex: 'roles',
                renderer: function(v) {
                    var role = [];
                    for (i = 0; i < v.length; i++) {
                        role.push(v[i].name);
                    }
                    return role;
                }
            }, {
                display: '绑定的旺旺账号',
                name: 'role',
                width: 1,
                sortable: false,
                dataindex: 'nameInPlat',
                mapping: ['bound'],
                convert: function(v, mappVal) {
                    if (mappVal[0]) {
                        return "<span>" + v + "</span>"
                    } else {
                        return "";
                    }
                }
            },
            /*{ display: '数据权限', name: 'permission', width: 1, sortable: false,  dataindex: 'dataPermissionType.desc' },*/
            {
                display: '备注',
                name: 'remark',
                width: 1,
                sortable: false,
                align: 'center',
                dataindex: 'remark',
                renderer: function(v) {
                    return v == '' ? '' : '<a href="javascript:void(0)" class="couponMark" _title="' + v + '"ng-mouseover="accountObj.viewMark($event,\''+ v +'\')" ng-mouseleave="accountObj.hideMark()"></a>';
                }
            }, {
                display: '状态',
                name: 'enable',
                width: 1,
                align: 'center',
                dataindex: 'enabled',
                mapping: ['id'],
                convert: function(v, mappVal) {
                    return '<a href="javascript:void(0)" class="' + (v ? "avaliableTrue" : "avaliableFalse") + '" title="' + (v ? "点击禁用" : "点击启用") + '" ng-click="accountObj.changeAvaliable(\'' + mappVal[0] + '\',' + v + ');"></a>'
                }
            }, {
                display: '操作',
                name: 'enable',
                width: 1,
                align: 'center',
                dataindex: 'enabled',
                mapping: ['id', "bound", "idInPlat"],
                convert: function(v, mappVal) {
                    if (!mappVal[1] || !mappVal[2]) {
                        return '<a href="javascript:void(0)" ng-click="accountObj.accountMethod(\'update\',\'' + mappVal[0] + '\')" title="编辑" class="edit_delete edit_icon"></a><a href="javascript:void(0)" ng-click="accountObj.unbindAccount(\'' + mappVal[0] + '\',$event)" title="解绑" class="unbindAccount" style="visibility:hidden">解</a>';
                    } else {
                        return '<a href="javascript:void(0)" ng-click="accountObj.accountMethod(\'update\',\'' + mappVal[0] + '\')" title="编辑" class="edit_delete edit_icon"></a><a href="javascript:void(0)" ng-click="accountObj.unbindAccount(\'' + mappVal[0] + '\',$event)" title="解绑" class="unbindAccount">解</a>';
                    }
                }
            }
        ],
        sortname: '',
        sortorder: "desc",
        buttons: [],
        updateDefaultParam: true,
        searchitems: {
            display: '搜索帐号/姓名',
            name: ""
        },
        usepager: true,
        useRp: true,
        showTableToggleBtn: true,
        colAutoWidth: true,
        rp: 15,
        page: 1,
        //current page
        total: 1,
        //total pages
        useRp: true,

        //use the results per page select box
        //results per page
        onSuccess: function(data) {
            var currScope = $(".listContainer").scope();
            var scope = $('.maincontainerB').scope();
            // portal兼容删除
            scope.accountObj.upCompile(currScope);
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
}])
