;angular.module('campaign.controllers').controller('attrQueryContentCtrl', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$q', 'saveService', 'getListService', function($rootScope, $scope, $timeout, $location, $http, $q, saveService, getListService) {
    /* 客户分组是涉及到嵌入查询节点，id会变化 */
    var queryDefaultNodeId = window.graph ? graph.nodeId : $scope.sendQueryNodeId;
    $scope.catalogId = 0;
    /* end */
    /*自定义select框*/
    $scope.customSelect = {
        "common": function(data, ele, listIndex, itemIndex) { //模拟普通的select框
            var $selContent = ele.siblings(".selectContent");
            $selContent.children().remove();
            var $ul = $("<ul>");
            if (data) {
                $selContent.append($ul);
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    $ul.append('<li>\
                        <a href="javascript:void(0);" \
                        id="' + data[i].displayValue + '" \
                        dicId="' + data[i].dicId + '" \
                        index="' + data[i].index + '">' + data[i].displayName + '</a></li>');
                    $ul.find("a").css({
                        "fontSize": "12px",
                        "padding": "2px 2px",
                        "color": "#797979",
                        "display": "block"
                    })
                }
                $ul.find("a").bind({
                    "click": function() {
                        var _this = this;
                        ele.val($(_this).text());
                        ele.attr("valueId", $(_this).attr("id"));
                        /* 千牛属性需要特殊发送请求 start */
                        if($scope.globalConditions.leftTree[listIndex].valueShow === '千牛插件标签' || $scope.globalConditions.leftTree[listIndex].valueShow === '千牛自定义属性') {
                            getListService.getAttrQueryQianNiu(function(response) {
                                var qinniuList = $scope.globalConditions.leftTree[listIndex];
                                qinniuList.queryItemRequestNewList = response || [];
                                // 自动展开
                                $(_this).parents('.attr_box').find('.attr_items').slideDown(200);
                            }, $(_this).attr("dicId"));
                        }
                        /* 千牛属性需要特殊发送请求 end */
                        /* 会员卡和店铺会员等级特殊处理 start */
                        if($scope.globalConditions.leftTree[listIndex].valueShow === '忠诚度') {
                            console.log($scope.globalConditions.leftTree[listIndex])
                            var _this = this;
                            $scope.globalConditions.leftTree[listIndex].queryItemRequestNewList = $scope.globalConditions.leftTree[listIndex].items[$(_this).attr("index")];
                            $scope.globalConditions.leftTree[listIndex].queryItemRequestNewList.forEach(function(value) {
                                value.conditions[0].conditionValueList.forEach(function(listValue) {
                                    if(listValue.displayName === $(_this).text()) {
                                        value.conditions[0].value = listValue.displayValue;
                                        value.conditions[0].valueShow = listValue.displayName;
                                    }
                                })
                            });
                        }
                        /* 会员卡和店铺会员等级特殊处理 end */
                        /* 选择后改变变量值 start */
                        $scope.globalConditions.leftTree[listIndex].groupConditions[itemIndex].valueShow = $(this).text();
                        $scope.globalConditions.leftTree[listIndex].groupConditions[itemIndex].value = $(this).attr("id");
                        $scope.globalConditions.leftTree[listIndex].groupConditions[itemIndex].isNotSelected = false;
                        /* 选择后改变变量值 end */
                        // 自动展开
                        $(_this).parents('.attr_box').find('.attr_items').slideDown(200);
                        $selContent.slideUp(200);
                        $scope.$apply();
                        /*var seldown03 = [];
                        var seldown05 = [];
                        var seldown01 = ele.closest('.selectInput').siblings('.label').html();
                        if( ele.closest('.selectInput').hasClass('selectInput0') ){
                            var seldown02 = ele.val();
                            var seldown04 = ele.closest('.selectInput').siblings('.selectInput1').find('input').val() || '';
                        }else{
                            var seldown04 = ele.val();
                            var seldown02 = ele.closest('.selectInput').siblings('.selectInput0').find('input').val();
                        }
                        $timeout(function(){
                            ele.closest('.selectInput').siblings('.label').closest('.attr_box').find('.attr_items li').each(function(){
                                seldown03.push( $(this).html() )
                            })
                            for (var i = 0; i < seldown03.length; i++) {
                                $('.conditionsSelectedTitle').each(function(index, element) {
                                    if( $(this).attr('title').split('-')[0] ==seldown01 ){
                                        if( $(this).attr('title').split('-').length >= 2 ){
                                            if( $(this).attr('title').split('-')[1] == seldown02 ){
                                                if( $(this).attr('title').split('-').length == 3 ){
                                                    if( $(this).attr('title').split('-')[2] == seldown04 ){
                                                        $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                                                            if( $(this).attr('title') == seldown03[i] ){
                                                                seldown05.push(i);
                                                                return false;
                                                            }
                                                        });
                                                    }
                                                }else{
                                                    $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                                                        if( $(this).attr('title') == seldown03[i] ){
                                                            seldown05.push(i);
                                                            return false;
                                                        }
                                                    });
                                                }
                                            }
                                        }else{
                                            $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                                                if( $(this).attr('title') == seldown03[i] ){
                                                    seldown05.push(i);
                                                    return false;
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            ele.closest('.selectInput').siblings('.label').closest('.attr_box').find('.attr_items li').removeClass('selected');
                            for (var j = 0; j < seldown05.length; j++) {
                                ele.closest('.selectInput').siblings('.label').closest('.attr_box').find('.attr_items li').eq(seldown05[j]).addClass('selected');
                            }
                        },50)*/
                    },
                    "mouseenter": function() {
                        $(this).css({
                            "color": "#0083BA",
                            "background": "#F2F2F2",
                            "text-decoration": "none"
                        });
                    },
                    "mouseleave": function() {
                        $(this).css({
                            "color": "#3D3D3D",
                            "background": "#FFFFFF"
                        });
                    }
                });
            }
        }
    };
    $scope.globalConditions = {
        "disposeInitData": function(conditions, details) { //处理初始化条件配置的数据
            angular.forEach(conditions, function(val, key) {
                if (details[val.queryItemId]) { // 行为自定义无details
                    val.conditionOps = $.extend(true, {}, (val.queryItemId && details[val.queryItemId] ? details[val.queryItemId] : {}));
                } else {
                    val.conditionOps = {
                        "type": val.type,
                        "queryItemId": val.queryItemId,
                        "name": val.name,
                        "configs": {},
                        "groupConditions": []
                    }
                };
                val.conditionOps.id = val.id ? val.id : ""; //重新赋值条件list的id
                val.conditionOps.queryItemId = val.queryItemId ? val.queryItemId : "";
                val.conditionOps.groupConditions = val.groupConditions || [];
                val.conditionOps.valueShow = val.valueShow || [];
                val.conditionOps.values = val.values;
            });
            return conditions;
        },
        "changeValueShow": function(conditions) {
            conditions.forEach(function(condition, index) {
                if(condition.valueShow === '会员卡' || condition.valueShow === '店铺会员等级') {
                    condition.valueShow = '忠诚度';
                }
            });
        },
        "getConfigure": function(data, eleName, listIndex, itemIndex) {
            data = data || [];
            $scope.customSelect.common(data, $('[name='+ eleName +']'), listIndex, itemIndex);
        },
        "toggleTree": function(e,index) {
            var target = e.target;
            //提示选择条件
            $('.leftMenuWrap .title input').removeClass('error');
            var labelTitle = $('.leftMenuWrap .label').eq(index).text();
            if(labelTitle === '千牛插件标签' || labelTitle === '千牛自定义属性' || labelTitle  === '忠诚度') {
                if($('.leftMenuWrap .title').eq(index).find('input').val() === '请选择') {
                    $('.leftMenuWrap .title').eq(index).find('input').addClass('error');
                    return;
                }
            }
            // 点击展示
            $('.leftMenuWrap .hoverDown').eq(index).toggleClass('open').parents('.attr_box').find('.attr_items').slideToggle(200);
            /*$('.leftMenuWrap .hoverDown').eq(index).toggleClass('open').parents('.attr_box').find('.attr_items').slideToggle(200,function(){
                if ($(this).is(':hidden')) {
                }else{
                  console.log(55556565656)
                    var arrdown03 = [];
                    var arrdown05 = [];
                    var arrdown01 = $(target).siblings('.label').html();
                    var arrdown02 = $(target).siblings('.selectInput0').find('input').val() || arrdown01;
                    var arrdown04 = $(target).siblings('.selectInput1').find('input').val() || '';
                    $(target).closest('.attr_box').find('.attr_items li').each(function(index,element){
                        arrdown03.push($(this).html())
                    })
                    for (var i = 0; i < arrdown03.length; i++) {
                        $('.conditionsSelectedTitle').each(function(index, element) {
                            if( $(this).attr('title').split('-')[0] ==arrdown01 ){
                                if( $(this).attr('title').split('-').length >= 2 ){
                                    if( $(this).attr('title').split('-')[1] == arrdown02 ){
                                        if( $(this).attr('title').split('-').length == 3 ){
                                            if( $(this).attr('title').split('-')[2] == arrdown04 ){
                                                $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                                                    if( $(this).attr('title') == arrdown03[i] ){
                                                        arrdown05.push(i);
                                                        return false;
                                                    }
                                                });
                                            }
                                        }else{
                                            $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                                                if( $(this).attr('title') == arrdown03[i] ){
                                                    arrdown05.push(i);
                                                    return false;
                                                }
                                            });
                                        }
                                    }
                                }else{
                                    $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                                        if( $(this).attr('title') == arrdown03[i] ){
                                            arrdown05.push(i);
                                            return false;
                                        }
                                    });
                                }
                            }
                        });
                    }
                    $(target).closest('.attr_box').find('.attr_items li').removeClass('selected');
                    for (var j = 0; j < arrdown05.length; j++) {
                        $(target).closest('.attr_box').find('.attr_items li').eq(arrdown05[j]).addClass('selected');
                    }
                }
            });*/
        },
        "strongData": function(data) { //增强数据
            var zhongchengduIndex = 5;  //忠诚度索引
            data.forEach(function(list, listIndex) {
                if (list.category_type_id === 5) {
                    $scope.categoryId = list.categoryId;
                }
                if(list.valueShow === '会员卡') {
                    zhongchengduIndex = listIndex;
                    list.valueShow = '忠诚度';
                    list.conditionNewList.forEach(function(newList) {
                        newList.conditionValueList.forEach(function(value, index) {
                            /* 特殊增加index字段来判断是会员卡还是店铺会员等级  0:会员卡 1:店铺会员等级 2:合并的值*/
                            value.index = 0;
                        });
                    });
                }
                if(list.valueShow === '店铺会员等级') {
                    list.conditionNewList.forEach(function(newList) {
                        newList.conditionValueList.forEach(function(value, index) {
                            /* 特殊增加index字段来判断是会员卡还是店铺会员等级  0:会员卡 1:店铺会员等级 2:合并的值*/
                            value.index = 1;
                        });
                    });
                    data[zhongchengduIndex].conditionNewList[0].conditionValueList = data[zhongchengduIndex].conditionNewList[0].conditionValueList.concat(list.conditionNewList[0].conditionValueList);
                    data[zhongchengduIndex].queryItemRequestNewList.forEach(function(value) {
                        value.conditions = [data[zhongchengduIndex].conditionNewList[0]];
                    });
                    list.queryItemRequestNewList.forEach(function(value) {
                        value.conditions = [list.conditionNewList[0]];
                    });
                    data[zhongchengduIndex].items = [data[zhongchengduIndex].queryItemRequestNewList, list.queryItemRequestNewList, data[zhongchengduIndex].queryItemRequestNewList.concat(list.queryItemRequestNewList)];
                    data[zhongchengduIndex].queryItemRequestNewList = [];
                    // 相同店铺合并
                    var newArr = [];
                    data[zhongchengduIndex].conditionNewList[0].conditionValueList.forEach(function(value, index) {
                        var findIndex = -1;
                        for(var i = 0; i < newArr.length; i ++) {
                            if(newArr[i].displayName === value.displayName) {
                                findIndex = i;
                            }
                        }
                        if(~findIndex) {
                            newArr[findIndex].index = 2;  //有重复的标志位2
                        } else {
                            newArr.push(value);
                        }
                    });
                    data[zhongchengduIndex].conditionNewList[0].conditionValueList = newArr;
                    data.splice(listIndex, 1);
                }
            });

            data.forEach(function(list, listIndex) {
                // 特殊处理千牛插件标签,从而让千牛选择的条件可以加入到标题上
                if(list.valueShow === '千牛插件标签' || list.valueShow === '千牛自定义属性') {
                    list.conditionNewList.forEach(function(newList) {
                        newList.attributeId = true;
                    });
                }
                //特殊处理会员卡和店铺会员等级为忠诚度
                var defaultConditions = [{
                    attributeId: null,
                    attributeName: null,
                    attributeType: null,
                    orderId: 1,
                    value: null,
                    valueShow: list.valueShow
                }];
                if(!list.groupConditions) {
                    if(list.conditionNewList) {
                        var condition = [];
                        list.conditionNewList.forEach(function(con, index) {
                            var pushCon = {
                                attributeId: con.attributeId || null,
                                attributeName: con.attributeName || null,
                                attributeType: con.attributeType || null,
                                orderId: con.orderId || 1
                            }
                            // 如果只有一条数据自己选择
                            /*if(con.conditionValueList.length === 1) {
                                pushCon.value = con.conditionValueList[0].displayValue;
                                pushCon.valueShow = con.conditionValueList[0].displayName;
                                $('.attr_items').eq(listIndex).slideDown(200);
                                //千牛属性需要特殊发送请求 start
                                if(list.valueShow === '千牛插件标签' || list.valueShow === '千牛自定义属性') {
                                    getListService.getAttrQueryQianNiu(function(response) {
                                        list.queryItemRequestNewList = response || [];
                                        // 自动展开
                                        $('.attr_items').eq(listIndex).slideDown(200);
                                        console.log(con)
                                    }, con.conditionValueList[0].dicId);
                                }
                                // 千牛属性需要特殊发送请求
                            }*/
                            condition.push(pushCon);
                        });
                        list.groupConditions = condition;
                    } else {
                        list.groupConditions = defaultConditions;
                    }
                }
            });
        },
        "itemAddQuery": function(e,list, item) {
            //限制添加
            var target = e.target;
            /*var onOff = true
            $scope.item02 = [];
            $('.conditionsSelectedTitle').each(function(ind,elm){
                var str1 = $(this).attr('title').split('-')[0];
                var str2 = $(this).attr('title').split('-')[1] || str1;
                var str3 = $(this).attr('title').split('-')[2] || '';
                $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                    $scope.item02.push({
                        data01:str1,
                        data02:str2,
                        data03:$(this).attr('title'),
                        data04:str3
                    })
                });
            })
            for (var i = 0; i < $scope.item02.length; i++) {
                if($scope.item02[i].data01 == list.valueShow){
                    if($scope.item02[i].data02 == list.groupConditions[0].valueShow){
                        if($scope.item02[i].data03 == item.name){
                            if( list.groupConditions.length == 2 ){
                                if(list.groupConditions[1].valueShow === '请选择'){
                                    onOff = true;
                                }else{
                                    if($scope.item02[i].data04 == list.groupConditions[1].valueShow){
                                        onOff = false;
                                        break;
                                    }
                                }
                            }else{
                                onOff = false
                            }
                        }
                    }
                }
            }
            if(!onOff){
                return false;
            }*/
            // 增加查询条件
            var check = true;
            if(list.groupConditions) {
                for(var i = 0; i < list.groupConditions.length; i++) {
                    if(!list.groupConditions[i].valueShow || list.groupConditions[i].valueShow === '请选择') {
                        list.groupConditions[i].valueShow = '请选择';
                        list.groupConditions[i].isNotSelected = true;
                        check = false;
                    } else {
                        list.groupConditions[i].isNotSelected = false;
                    }
                }
                if(!check) {
                    return false;
                }
            }
            //动态计算item名字
            var titleName = this.disposeTitleName(list, item);
            var groupConditions = angular.copy(item.conditions || list.groupConditions);
            groupConditions = groupConditions.map(function(value) {
                return {
                    attributeId: value.attributeId || '',
                    attributeName: value.attributeName || '',
                    attributeType: value.attributeType || '',
                    orderId: value.orderId || 1,
                    value: value.value || '',
                    valueShow: value.valueShow || ''
                }
            });
            //$(target).addClass('selected');
            $scope.addCondition(item.valueId, item.type, groupConditions, titleName);
        },
        "disposeTitleName": function(list, item) {
            var name = [];
            name.push(list.valueShow);
            if(list.groupConditions) {
                list.groupConditions.forEach(function(newList) {
                    if(newList.attributeId) {
                        name.push(newList.valueShow || '');
                    }
                });
            }
            name.push(item.name || '');
            return name.join('-');
        },
        "initLeftTree": function() {
            // 得到左侧树数据
            var _this = this;
            $scope.tfilterFindObj.openPromise.promise.then(function() {
                $scope.globalConditions.leftTree = [];
                getListService.getAttrQueryNodeTree(function(data) {
                    //增强数据
                    $scope.globalConditions.leftTree = data || [];
                    _this.strongData($scope.globalConditions.leftTree);
                    // 搜索事件
                    $('.search-attr input').keypress(function(event) {
                        if (event.which === 13) {
                            // 按下回车处理事件
                            $('.leftMenuWrap .attr_items').hide();
                            $('.leftMenuWrap .hoverDown').removeClass('open');
                            $('.leftMenuWrap li').removeClass('on');
                            var searchStr = $(this).val();
                            if (searchStr === '') {
                                return false;
                            }
                            // 一级属性搜索
                            $('.leftMenuWrap .title .label').each(function() {
                                var indexParent = $(this).text().toUpperCase().indexOf(searchStr.toUpperCase());
                                if (~indexParent) {
                                    $(this).siblings('.hoverDown').addClass('open');
                                    $(this).parents('.attr_box').find('.attr_items').slideDown(200);
                                }
                            });
                            // 二级属性搜索
                            $('.leftMenuWrap li').each(function() {
                                var index = $(this).text().toUpperCase().indexOf(searchStr.toUpperCase());
                                if (~index) {
                                    $(this).parent('.attr_items').slideDown(200);
                                    $(this).parents('.attr_box').find('.hoverDown').addClass('open');
                                    $(this).addClass('on');
                                } else {
                                    $(this).removeClass('on');
                                }
                            });
                        }
                    });
                    /*var init01 = [];
                    var init02 = [];
                    for (var i = 0; i < data[0].queryItemRequestNewList.length; i++) {
                        init02.push( data[0].queryItemRequestNewList[i].name)
                    }
                    $timeout(function(){
                        for (var i = 0; i < init02.length; i++) {
                            $('.conditionsSelectedTitle').each(function(index, element) {
                                if( $(this).attr('title') == '基本信息' ){
                                    $(this).closest('.attr_wrap_query_node_condition').find('.attr_query_node_name').each(function(index, el) {
                                        if( $(this).attr('title') == init02[i] ){
                                            init01.push(i);
                                            return false;
                                        }
                                    });
                                }
                            });
                        }
                        $('.attr_box').eq(0).find('.attr_items li').removeClass('selected');
                        for (var j = 0; j < init01.length; j++) {
                            $('.attr_box').eq(0).find('.attr_items li').eq(init01[j]).addClass('selected');
                        }
                    },50)*/
                    $scope.selectCatalogId(null, {id: $scope.catalogId}, "click");
                }, $scope.tfilterFindObj.defaultSubjectId);
                
            });
        },
        initGlobalData: function() {
            // then 请求conditions
            $scope.tfilterFindObj.openPromise.promise.then(function() {
                getListService.getAttrQueryConfigConditions(function(response) {
                    //关系
                  $scope.globalConditions.relation = response.relation ? response.relation.toUpperCase() : 'AND';
                  $scope.$emit('childRelation', $scope.globalConditions.relation);
                    //默认初始化conditions
                    if (response.conditions && response.conditions.length > 0) {
                        $scope.globalConditions.changeValueShow(response.conditions); //将会员卡与店铺会员等级变更为忠诚度
                        var disposeData = $scope.globalConditions.disposeInitData(response.conditions, response.details); //处理后返回的数据
                        $scope.addAllConditions(disposeData);
                    }
                }, queryDefaultNodeId);
            });
            // 初始化左侧树
            $scope.globalConditions.initLeftTree();
        },
        "getAllConditions": function() { //得到配置条件

        }
    }
    $scope.loadTreeData = function () {
        return getListService.getCatalogTree(function (data) {
            return data.data.list;
        });
    }
    $scope.selectCatalogId = function (treeId, treeNode, type) {
        if (type === "click") {
            getListService.getZidingyi(function(data) {
                $scope.zidingyiqueryItemRequestNewList = data.data;
                treeId && $('.attr_items.zidingyi').slideDown(200);
            }, $scope.categoryId, treeNode.id, $scope.tfilterFindObj.defaultSubjectId);
        }
    }
    $scope.globalConditions.initGlobalData();
   
}]);
