/**
 * Created by gongrui on 2015/10/16.
 */
(function (window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  app.controller('vipNewSetting', ["$scope", "$rootScope","saveService", "getListService", "$compile",
    function ($scope, $rootScope,saveService, getListService,$compile) {
      $scope.VIPnode = {
        "id": graph.nodeId
      }
      $scope.getVIPReports = "";

      //获取会员等级节点
      $scope.getVIPnode = function () {
        var callback = function (data) {
          $scope.VIPnode.id = graph.nodeId;
          $scope.VIPnode.name = data.name;
          $scope.nodecomment = data.remark;
          if ($scope.nodecomment != null) {
            $scope.ngtip = true;
          } else {
            $scope.ngtip = false;
          }
          $scope.VIPnode.ctyId = data.ctyId;
          $scope.VIPnode.ctyName =data.ctyName || "";
          var grade = {},has=false;
          //$scope.getVIPGrades.forEach(function (item) {
          //if (item.value == data.grade) {
          //grade = item;
          //has = true;
          //}
          //})
          //grade = has ? grade : [];
          $scope.VIPnode.gradeValue = data.priority;
          $scope.VIPnode.flagAbsoluteDate = data.flagAbsoluteDate || "1";
          $scope.VIPnode.gradeName = data.membergradeName;
          $scope.VIPnode.validPeriod = data.validPeriod;
          $scope.VIPnode.absoluteDate = data.absoluteDate;
          $scope.getVIPGrades();
        }
        getListService.getVIPnode(
          callback,
          $scope.getVIPnode//表单数据
        );

        getListService.getNodeTipsByType(function(responseTips){ // 获取tips
          $scope.getVIPnodeTips=responseTips.tips || "";
        },"tdatammvipnew");
      };

      //获取卡类型
      //$scope.getVIPShops = function (data) {
      //$scope.VIPShops = data;
      //}

      $scope.isScopeObj={
        "getVipShops":function(){
          this.common($scope.VIPShops, $('[name="discountShop"]'));
        },
        "getVIPGrades":function(){
          this.common($scope.IVPGrades, $('[name="VIPGrades"]'));
        },
        "common": function (data, ele) {     //模拟普通的select框
          var $selContent = ele.next(".selectContent:first");
          $selContent.children().remove();
          var eleName = ele.attr("name");
          var $ul = $("<ul>");
          if (data) {
            $selContent.append($ul);
            var len = data.length;
            for (var i = 0; i < len; i++) {
              if (eleName == "VIPGrades") {
                $ul.append('<li><a href="javascript:void(0);" id=' + data[i].priority + '>' + data[i].membergradeName + '</a></li>');
                $ul.find("a").css({
                  "padding": "3px 10px",
                  "color": "#3D3D3D",
                  "display": "block"
                });
              } else if (eleName == "discountShop") {
                $ul.append('<li style="margin:0;"><a href="javascript:void(0);" id=' + data[i].value + '>' + data[i].name + '</a></li>');
                $ul.find("a").css({
                  "padding": "3px 10px",
                  "color": "#3D3D3D",
                  "display": "block"
                });
              }

            }
            $ul.find("a").bind({
              "click": function () {
                var modelValue,modelName;
                var elementIndex = $ul.find("li").index($(this).closest("li"));
                ele.val($(this).text());
                ele.attr("valueId", $(this).attr("id"));
                $selContent.slideUp(200);

                if (eleName == "discountShop") {
                  $scope.$apply(function(){
                    var oldIdValue = $scope.VIPnode.ctyId;
                    $scope.VIPnode.ctyName = ele.val();
                    $scope.VIPnode.ctyId = ele.attr("valueId");
                    if(oldIdValue != $scope.VIPnode.ctyId) {
                      $scope.IVPGrades = data[elementIndex].LoyaltyMemberGrade;
                      $scope.VIPnode.gradeValue = '';
                      $scope.VIPnode.gradeName = '';
                    }
                    $scope.discountIsShopFlag = $scope.VIPnode.ctyId? false : true;
                  })
                }else{
                  $scope.$apply(function(){
                    $scope.VIPnode.gradeName =  ele.val();
                    $scope.VIPnode.gradeValue =  ele.attr("valueId");
                    $scope.discountIsVIPGrades=$scope.VIPnode.gradeValue ? false : true;
                  })
                };
              },
              "mouseenter": function () {
                $(this).css({
                  "color": "#0083BA",
                  "background": "#F2F2F2",
                  "text-decoration": "none"
                });
              },
              "mouseleave": function () {
                $(this).css({
                  "color": "#3D3D3D",
                  "background": "#FFFFFF"
                });
              }
            })
          }
        }
      };
      //获取店铺会员等级
      $scope.getVIPGrades = function () {
        var callback = function (data) {
          $scope.cardTypeList = data;
          $scope.cardTypeList.forEach(function(item) {
            if(item.ctyId === $scope.VIPnode.ctyId) {
              $scope.IVPGrades = item.loyaltyMemberGrade;
            }
          });
          $scope.VIPShops = $scope.cardTypeList.map(function(item) {
            var tem = {name:item.ctyName, value:item.ctyId, LoyaltyMemberGrade:item.loyaltyMemberGrade};
            return tem;
          });
        }
        getListService.getVIPGrades(callback, $scope.getVIPGrades);
      }

      $scope.getVIPnode();
      $scope.openNodePop();
      $scope.confirmChange = function () {
        if(!$scope.VIPnode.ctyId){
          $scope.discountIsShopFlag=true;
          return false;
        }else{
          $scope.discountIsShopFlag=false;
        };

        if(!$scope.VIPnode.gradeValue){
          $scope.discountIsVIPGrades=true;
          return false;
        }else{
          $scope.discountIsVIPGrades=false;
        }

        $("#VIPSettings").validate({
          wrapper: "div",
          rules: {
            VIPnodeName: "required",
            VIPnodeValidPeriod: {
              range: [1, 3600],
              digits: true
            }
          },
          messages: {
            VIPnodeName: {
              required: "请输入节点名称"
            },
            VIPnodeValidPeriod: {
              range: "可以输入1-3600的正整数，不填写则代表有效期到2099年1月1日",
              digits: "请输入1-3600以内正整数"
            }
          },
          errorPlacement: function (error, element) {
            element.parent().append(error);

          },
          submitHandler: function () {
            $scope.saveVIPnode();
          }
        })
      }
      //保存信息
      $scope.saveVIPnode = function () {
        var subInfo = {
          id: $scope.VIPnode.id,
          name: $scope.VIPnode.name,
          remark: $scope.nodecomment,
          validPeriod: $scope.VIPnode.validPeriod,
          absoluteDate : $scope.VIPnode.absoluteDate,
          flagAbsoluteDate : $scope.VIPnode.flagAbsoluteDate,
          ctyId : $scope.VIPnode.ctyId,
          ctyName : $scope.VIPnode.ctyName,
          priority : $scope.VIPnode.gradeValue,
          membergradeName: $scope.VIPnode.gradeName
        };
        //过滤默认时间
        if(($scope.VIPnode.isChecked === 'relativeTime' && !subInfo.validPeriod)  || ($scope.VIPnode.isChecked === 'positionTime' && !subInfo.absoluteDate)) {
          subInfo.absoluteDate = '2099-01-01';
          subInfo.flagAbsoluteDate = 1;
          alert('ok');
        }
        if (subInfo.flagAbsoluteDate == 1) {
          subInfo.absoluteDate = "";
        } else {
          subInfo.validPeriod = "";
        }
        saveService.saveVIPnode(function () {
          $("#nodeContent").hide();
          $(".yunat_maskLayer").hide();
          $(this).yAlert({"text": "保存成功"});
          removeAlert();
          $scope.editNodeName($scope.VIPnode.id, $scope.VIPnode.name,$scope.nodecomment);
        }, subInfo);

      }

      //获取响应报告
      $scope.getReports = function () {
        $(".discountEcDataView").addInteractivePop({ magTitle: "发送报告", width: 910, mark: false, position: "fixed", childElePop: true });
        $('.dataInfoList').flexigrid({
          url: GLOBAL_STATIC.nodeRoot + "node/membergrade/" + graph.nodeId + "/report/?_=" + new Date().getTime(),
          method: 'GET',
          dataType: 'json',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          colModel: [
            { display: '客户提交时间', name: 'submitTime', width: 1, sortable: false, align: 'center', dataindex: 'submitTime',
              renderer: function (v) {
                return  "<span class='ac_status_grid ac_status_" + v + "' title='"+setISO(v, "all")+"'>" + setISO(v, "all") + "</span>";
              } },
            { display: '客户提交数', name: 'submitNum', width: 1, sortable: false, align: 'right', dataindex: 'submitNum'},
            { display: '设置成功数', name: 'successNum', width: 1, sortable: false, align: 'right', dataindex: 'successNum'},
            { display: '设置失败数', name: 'failNum', width: 1, sortable: false, align: 'right', dataindex: 'failNum'},
            {
              display: '设置会员时间', name: 'setGradeTime', width: 1, sortable: false, align: 'center', dataindex: 'setGradeTime', renderer: function (v) {
              return  "<span class='ac_status_grid ac_status_" + v + "' title='"+setISO(v, "all")+"'>" + setISO(v, "all") + "</span>";
            }
            },
            { display: '下载数据', name: 'enable', width: 1, align: 'left', dataindex: 'enabled', mapping: ['fileUrl'],
              convert: function (v, mappVal) {
                var href = GLOBAL_STATIC.nodeRoot + "node/membergrade/download/" + mappVal[0];
                return '<a title="下载"  ng-href="' + href + '" href="' + href + '">下载</a>';

              }}
          ],
          /* params: campListParams,*/
          updateDefaultParam: true,
          sortname: "",
          sortorder: "desc",
          buttons: [],
          usepager: true,
          useRp: true,
          rp: 20,
          showTableToggleBtn: true,
          colAutoWidth: true,
          onSuccess: function () {
            var scope = angular.element('.dataInfoList').scope();
            scope.gridObj.upCompile(scope);
          },
          onError: function (response) {
            if (response.status == 401) {
              location.pathname = "/portal/index.html";
              return;
            }
          }
        });
      }
      $scope.openReport = function () {
        $scope.getReports();

      }
      $scope.toNormalTime = function (str) { // 转化时间
        return setISO(str, "all");
      }
      //自定义表格
      $scope.gridObj = {
        "modelSrc": "",// 客户订单查询 修改属性模板入口
        "customerNo": "",
        "curAttrId": "",
        "showConfigAttrSrc": "",
        "addCustomAttrPage": true,
        "customList": "",
        "customVal": "",
        "girdElement": angular.element(".dataInfoList")[0],
        //编译模板
        "upCompile": function (curScope) {
          $compile(angular.element(".dataInfoList"))($scope || curScope);
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        }

      }

    }]);

})(window, angular, undefined);
