/**
 * Created by dupenghui on 2014/8/12.
 */
angular.module("dataManage.controllers").controller('customerServiceWorkbench', ["$scope", "$http", "$compile", "ngCustomService",
    function($scope, $http, $compile, ngCustomService) {
        $scope.serviceWorkbenchUrl = baseUrl + "customerServiceWorkbenchList.html";
        $scope.customObj = {
            "showConfigAttrSrc": "",
            "addCustomAttrPage": true,
            "customList": "hover",
            "customVal": "",
            "girdElement": angular.element("#labelListsGrid")[0],
            "searchButtonClick": function(hdVal, othFlag) {
                var curGridElement;
                if (othFlag) {
                    curGridElement = angular.element("#attributeGrid")[0];
                    $scope.searchDefaultFlag = true;
                } else {
                    curGridElement = angular.element("#labelListsGrid")[0];
                }
                curGridElement.p.newp = 1;
                curGridElement.p.qtype = "keywords";
                curGridElement.p.query = hdVal || "";
                curGridElement.grid.populate();
            },
            "compileTpl": function(s) {
                $compile(angular.element(".gridCommLayout"))($scope || s);
                $scope.$apply();
            },
            "showCustomAttrPage": function() {
                this.customList = "hover";
                this.customVal = "";
                $scope.hdValue = "";
                $scope.serviceWorkbenchUrl = baseUrl + "customerServiceWorkbenchList.html"
            },
            "hideCustomAttrPage": function() {
                this.customList = "";
                this.customVal = "hover";
                $scope.searchDefaultFlag = false; // 判断属性切换  搜索是否有默认值
                $scope.searchAttrVal = "";
                $scope.serviceWorkbenchUrl = baseUrl + "customerServiceWorkbenchValues.html"
            }
        };
        /* $scope.$apply();*/
    }
]);

angular.module("dataManage.controllers").controller('workbenchListCtrl', ["$scope", "ngCustomService", "$rootScope",
    function($scope, ngCustomService, $rootScope) {
        ngCustomService.getShopsByPlatformId(function(response) {
            $scope.workbenchShopsLists = response;
            $scope.curWorkbenchShop = response[0];
            $('#labelListsGrid').flexigrid({ //标签列表grid
                url: GLOBAL_STATIC.datamanageRoot + 'service/workbench/label/',
                method: 'GET',
                dataType: 'json',
                colModel: [
                    //          {display: 'ID', name: 'id', width: 2, sortable: false, dataindex: 'id'},
                    {
                        display: '店铺',
                        name: 'shopName',
                        width: 2,
                        sortable: false,
                        dataindex: 'shopName'
                    }, {
                        display: '客户ID',
                        name: 'buyerNick',
                        width: 2,
                        sortable: false,
                        dataindex: 'buyerNick'
                    }, {
                        display: '标签',
                        name: 'label',
                        width: 2,
                        sortable: false,
                        dataindex: 'label'
                    }
                ],
                sortname: '',
                sortorder: "asc",
                updateDefaultParam: true,
                buttons: [],
                usepager: true,
                useRp: true,
                rp: 20,
                params: [{
                    "name": "shopId",
                    "value": $scope.curWorkbenchShop.idInPlat
                }],
                showTableToggleBtn: true,
                colAutoWidth: true,
                onSuccess: function() {
                    var scope = angular.element(angular.element(".gridCommLayout")).scope();
                    scope.customObj.compileTpl(scope);
                },
                onError: function(response) {
                    if (response.status == 401) {
                        location.pathname = "/portal/login.html";
                        return;
                    }
                }
            });
        }, $rootScope.taobaoSegmentationId);
        $scope.upDateWorkbenchList = function() {
            angular.element("#labelListsGrid")[0].grid.addParams("shopId", $scope.curWorkbenchShop.idInPlat);
            angular.element("#labelListsGrid")[0].grid.populate();
        };
        /*$scope.$apply();*/
    }
]);

angular.module("dataManage.controllers").controller('workbenchValuesCtrl', ["$scope", "ngCustomService", "$rootScope",
    function($scope, ngCustomService, $rootScope) {

        var refreshTableAndlist = function(shopId, searchVal, searchDefaultFalg) {
            $.ajax({
                "type": "GET",
                "url": GLOBAL_STATIC.datamanageRoot + 'service/workbench/attributeHeads/?shopId=' + shopId + "&_=" + new Date().getTime(),
                "dataType": "JSON",
                "success": function(response) {
                    var gridListData = [];
                    angular.forEach(response.data, function(val, key) {
                        // 动态head加载
                        gridListData.push({
                            display: val.display,
                            name: val.name,
                            width: 2,
                            sortable: false,
                            dataindex: val.dataindex
                        });
                    });
                    var $attributeGridElement = $("<div id='attributeGrid'></div>");
                    $(".showConfigAttr").html("").append($attributeGridElement);
                    $('#attributeGrid').flexigrid({ //属性列表grid
                        url: GLOBAL_STATIC.datamanageRoot + 'service/workbench/attributeValues/?_=' + new Date().getTime(),
                        method: 'GET',
                        dataType: 'json',
                        colModel: gridListData,
                        sortname: '',
                        sortorder: "asc",
                        updateDefaultParam: true,
                        buttons: [],
                        usepager: true,
                        useRp: true,
                        rp: 20,
                        query: searchVal && searchDefaultFalg ? searchVal : "",
                        qtype: searchVal && searchDefaultFalg ? "keywords" : "",
                        params: [{
                            "name": "shopId",
                            "value": shopId
                        }],
                        showTableToggleBtn: true,
                        colAutoWidth: true,
                        onSuccess: function(data) {
                            var scope = angular.element(angular.element(".gridCommLayout")).scope();
                            scope.customObj.compileTpl(scope);

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
                }
            })


        };

        ngCustomService.getShopsByPlatformId(function(response) {
            $scope.workbenchShopsLists = response;
            $scope.curWorkbenchShop = response[0];
            refreshTableAndlist($scope.curWorkbenchShop.idInPlat);
        }, $rootScope.taobaoSegmentationId);

        $scope.updateWorkbenchValues = function() {
            refreshTableAndlist($scope.curWorkbenchShop.idInPlat, $scope.searchAttrVal, $scope.searchDefaultFlag);

        };
        /*$scope.$apply();*/
    }
]);
