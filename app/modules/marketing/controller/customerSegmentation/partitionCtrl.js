angular.module("campaign.controllers").controller('partitionCtrl', ['$scope', "$http", "$location", '$q', 'getListService', '$rootScope', '$ccModal', '$state',
  function ($scope, $http,$location, $q, getListService, $rootScope, $ccModal, $state) {
    /*新建修改分群*/
    $scope.partitionLayer = {
      "tpl_src": "",
      "card_src":"",//是否加载主视图
      "show_flog": false,
      "isHavePage":false,
      "index_groupList_flag": true,
      "returnList":function () {
        var _this=this;
        _this.isHavePage=true;
        _this.conel_btn()
      },
      "initAll":function () {
        var _this=this;
        _this.isHavePage=false;
        $rootScope.curCategoryId=""; // 初始化分组id为空
        $rootScope.cmBack={
          page:1,
          pagesize:12,
          categoryId: "",
          query: "",
          card:1
        }
        angular.element(".templatePop").hide()
        _this.card_src=CAMPAIGN_STATIC.tplBasePath + 'view/customerSegmentation/partitionList.html?_=' + new Date().getTime()
      },
      "initialize": function (curCampaignId, curCampaignName, status) {
        $scope.titleType = curCampaignId ? "分组详情" : "新建客户分组";
        var _this = this;
        _this.show_flog = true;
        _this.editorCampaignId = curCampaignId ? curCampaignId: "";
        if (curCampaignId) { //修改
            $scope.customerGroupStatus = true;
            $scope.curCustomerGroupId = curCampaignId;
        }else { //新建
          $scope.customerGroupStatus = false;
          $scope.curCustomerGroupId = "";
        };
        _this.tpl_src = CAMPAIGN_STATIC.tplBasePath + 'view/customerSegmentation/newPartition.html?_=' + new Date().getTime();

      },
      "add": function (curCampaignId, curCampaignName, status, noCheck) {  // noCheck 字段为true就不发送检测请求
        $scope.partitionLayer.initialize(curCampaignId, curCampaignName, status);
        // if(noCheck) {
        //   $scope.partitionLayer.initialize(curCampaignId, curCampaignName, status);
        // } else {
        //   getListService.isPostAdd(function (res) {
        //     if($.isEmptyObject(res)){
        //       $scope.partitionLayer.initialize(curCampaignId, curCampaignName, status);
        //     }
        //   })
        // }
      },
      "format":function (num) {//千分位
        return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
      },
      "createCamp": function (id,name, pCount,sId) {//新建营销活动
        var _this=this;
        _this.curCreateCampId = id;
        _this.curCreateCampName = name;
        if(typeof(pCount)!="object"){
          _this.curCreateCampCount = _this.format(pCount);
          _this.peopleShow=false
        }else{
          _this.curCreateCampCount = pCount;
          _this.peopleShow=true
        }

        _this.curCreateCampsId = sId;
        // $scope.marketLayerPar.campName="";
        // $scope.marketLayerPar.progName="";
        // $scope.classificationId=""
        // angular.element("[name='program']").html("");
        // angular.element("[name='program']").attr("valueid","");
        // $scope.marketLayerPar.campTypeName="";
        // $scope.marketLayerPar.campDesc="";
        // angular.element(".nameInput").removeClass("error")
        // angular.element("[name='investigator']").removeClass("error")
        // angular.element(".nameInput").next("label").remove();
        // angular.element("[name='investigator']").next("label").remove();

        // var getUser=JSON.parse(localStorage.getItem("ccmsRequestCredential"));//获取用户相关信息
        // $scope.marketLayerPar.investigatorName=getUser.username;
        // $('[name="investigator"]').val(getUser.username);
        // $('[name="investigator"]').attr("valueid",getUser.userId)


        var modalInstance = $ccModal
          .modal({
            title: '新建活动',
            body: CAMPAIGN_STATIC.tplBasePath + 'view/create/index.html',
            style: {
              overflow: 'auto'
            },
            controller: 'MarketCreate',
            bindings: {
              curCreateCampName: _this.curCreateCampName,
              curCreateCampCount: _this.curCreateCampCount,
              peopleShow: _this.peopleShow
            }
          }).open();

        modalInstance.result.then(function(data) {
          var dataNode={
            "id": "",
            "name": "",
            "tip":"",
            "remark":"",
            "type": "existingGroup",
            "subjectId": _this.curCreateCampsId,
            "workflowId": data.workflowId,
            "groupId": _this.curCreateCampId,
            "groupName": _this.curCreateCampName
          }

          var creatNewHdobg = {
            "campName": data.name.replace(/\s+/g, ""),
            "workflowId": data.workflowId || "",
            "campId": data.id
          };
          var confirmModalInstance = $ccModal.confirm('活动保存成功，是否立即进入活动编辑？', function() {
            self.onSearch().then(function() {
              self.isRefeshGrid = true;
            });
          }).open();

          confirmModalInstance.result.then(function() {
            $state.go('campaign.market.details', { id: creatNewHdobg.campId, workflowId: creatNewHdobg.workflowId });
            // $scope.marketLayer.show_flog = false;
          }, function() {
            self.onSearch().then(function() {
              self.isRefeshGrid = true;
            });
          });

          getListService.postcgqConfigConditionsCamp(function(response) {
           
          }, dataNode);
        }, function(error) {
          console.log('rejected', error);
        });
      },
      "conel_btn": function () { // 取消返回列表
        this.show_flog = false;
        this.tpl_src = "";
        //新建取消留着原页面
        $scope.partitionLayer.card_src = CAMPAIGN_STATIC.tplBasePath + 'view/customerSegmentation/partitionList.html?_=' + new Date().getTime();
      },
      }
    $scope.partitionLayer.initAll();
  }
]);
