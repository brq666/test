;angular.module('campaign.controllers').controller('tfilterCustomerGroup', ['$scope', '$location', '$http', 'saveService', 'getListService', function($scope, $location, $http, saveService, getListService) {

    $scope.openNodePop();//调用弹框方
    $scope.tfilterFindObj={
        "isEditorFlag":(!graph.isRemark) || (graph.campStatus != null && (graph.campStatus != "A1" && graph.campStatus != "B3")) || (graph.campStatus == "B3" && graph.jobStatus != 8),//节点是否可编辑，确定按钮是否显示,
        "removePop":function(){
            angular.element("#nodeContent").hide();
            angular.element(".yunat_maskLayer:last").remove();
        },
        "initData":function(){//打开
            getListService.opentfiltercgqNode(function(response){
                $scope.tfilterFindObj.name=response.name ? response.name : "客户分组查询节点";
                $scope.tfilterFindObj.id=response.id ? response.id : "";
                $scope.nodecomment=response.remark ? response.remark :"";
                $scope.tfilterFindObj.radioSrc=CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/tfiltercgqDefaultCustomer.html?_="+new Date().getTime();
                $scope.responseGroupName=response.groupName || "";
                $scope.responseIsError=response.error;
                $scope.responseGroupId=response.groupId || "";
                $scope.tfilterFindObj.defaultSubjectId=response.subjectId || "";
            },graph.nodeId);
          getListService.getNodeTipsByType(function(responseTips) { // 获取tips
            $scope.tfilterFindObj.tip = responseTips.tips || "";
          }, "tfilterCustomerGroup");
        },
        "getPostData":function(){
            var _this=this;
            var postData={
                "id": _this.id,
                "name": _this.name,
                "tip":_this.tip,
                "remark": $scope.nodecomment,
                "type": "existingGroup"
            };
                postData.groupName=($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName!="undefined")  ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupName : "";
                postData.groupId=($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId!="undefined")  ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupId : "";
                postData.subjectId=($scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId!="undefined")  ? $scope.$$childHead.$$childHead.queryCustomerGroupObj.curSelectedGroupSubjectId : "";
            return postData;
        },
        "postQueryDataMethod":function(data){
            var _this=this,element=angular.element(".queryNodeGlobalButton");

            disposeCommMethod.shuyunAjaxButtonClickMethod(function(){
                getListService.postcgqConfigConditions(function(response){
                    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
                    _this.removePop();
                    $scope.editNodeName(_this.id,_this.name,$scope.nodecomment);
                    $(this).yAlert({"text":"保存成功"});
                    removeAlert();
                },data,element);
            },element);
        },
        "postQueryData":function(cgd){//保存节点 cgd="group"创建客户分组验证
            if(this.isEditorFlag){
                return "节点数据不可编辑";
            };
            if(!this.name){
                return "请输入节点名称";
            };
            var _this=this;
            var curPostData=_this.getPostData();
            if(!curPostData.groupName){
                $(this).Alert({"title":"提示","str":"请选择分组","mark":true,"width":"330px","eleZindex":1010,"markZindex":1005});
                return false;
            };
            if($scope.$$childHead.$$childHead.queryCustomerGroupObj.isError){
                $(this).Alert({"title":"提示","str":"由于此分组里的查询条件已修改，请重现选择分组或者修改分组！","mark":true,"width":"260px","eleZindex":1010,"markZindex":1005})
                return false;
            }
            _this.postQueryDataMethod(curPostData);
        },

    };
    $scope.tfilterFindObj.initData();
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

}]);

