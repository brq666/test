angular.module("campaign.controllers").controller('customConditionCtrl', ['$scope', 'customConditionsService', '$compile',
  function($scope, customConditionsService, $compile) {
    $scope.flag = false;
    $scope.toggleConditions = function() {
      $scope.flag = !$scope.flag;
    };

    //监听展开、收起弹框高度设置
    $scope.$watch(function() {
      var _main = $('.commCustomConfigBox .ccmsPublicPopMain .ccmsPublicPopMain');
      if ($scope.flag) {
        var mainH = _main.children('div').outerHeight(true),
            mainT = _main.offset() ? _main.offset().top : 0,
            winH = $(window).height();
        if (mainH + mainT > winH) {
          _main.css({
            'height': winH - mainT
          });
        }
      } else {
        _main.removeAttr('style');
      }
    });

    $scope.toggleFontName = function() {
      return $scope.flag ? "收起": "展开"
    };

    $scope.customObj = {
      "labelRelationships": ["并且", "或者"],
      "getSummitData": function() { //获取保存数据
        $scope.getAllCustomDatas();
      },
      "removeCustomPop": function() {
        if (angular.element(".childElementMark:last").length > 0) {
          angular.element(".childElementMark:last").remove();
        } else {
          angular.element(".yunat_maskLayer:last").remove();
        }
        angular.element(".commCustomConfigBox ").hide();
      },
      "submitCustomComfig": function() { //利用插件validate验证，获取数据，保存后台
        console.log('2');
        if ($scope.tfilterFindObj && $scope.tfilterFindObj.isEditorFlag && $scope.customerTemplateLoadingFlag) {
          return "节点数据不可编辑";
        };
        var _this = this;
        if (!$scope.flag && $scope.isToggleConditionsAreaShow) {
          $scope.toggleConditions();
        }
        angular.element("#customConfigForm").validate({
          debug: true,
          errorClass: "error errorWidth",
          rules: {
            //categoryName:"required"
          },
          messages: {
            //categoryName:"请输入属性名称"
          },
          errorPlacement: function(error, element) {
            if (element.is(":text")) {
              var errorText = error.attr("message") || error.text();
              error.text("");
              error.attr("ng-title", errorText)
              //if(element.closest("span").attr("class")=="commPenEditor"){
              element.closest("span").after(error);
              //}else{
              element.after(error);
              //}
              var top = element.position().top;
              var left = element.position().left;
              error.css({
                "position": "absolute",
                "right": 5,
                "top": 2,
                "z-index": 10
              });
              element.css({
                "borderColor": "red"
              });
              error.click(function() {
                error.remove();
                element.css({
                  "borderColor": "#AACBE1"
                });
                element.focus();
                angular.element("#tooltip").remove();
              });
              element.click(function() {
                error.remove();
                element.css({
                  "borderColor": "#AACBE1"
                });
                angular.element("#tooltip").remove();
              });
            } else if (element.is(":checkbox")) {
              //error.appendTo ( element.next() );
            } else {
              //error.appendTo( element.parent().next() );
            }
            $compile(error)($scope);
          },
          submitHandler: function() {
            var postConfigCustomData = {
              "nodeId": ($scope.tfilterFindObj ? $scope.tfilterFindObj.id: $scope.sendQueryNodeId),
              "globle": "",
              "indexRelation": $scope.customObj.curLabelRelationship == "并且" ? "AND": "OR",
              "conditions": [],
              "indexConfig": [],
              "subjectId": ($scope.tfilterFindObj ? $scope.tfilterFindObj.defaultSubjectId: $scope.sendQuerySubjectId)
            };
            if (!$scope.editorCustomFalg) { //新建传数据
              postConfigCustomData.configId = "";
              postConfigCustomData.behaviorId = $scope.customDragCurId;
            } else { // 修改传数据
              postConfigCustomData.configId = $scope.customDragCurId; //已经生成的id
              postConfigCustomData.behaviorId = "";
            };
            var conditionsConfigData = $scope.getAllCustomDatas(); //获取数据
            postConfigCustomData.attribute = conditionsConfigData.attribute.slice();
            postConfigCustomData.configs = conditionsConfigData.index.slice();
            /*if(!$scope.editorCustomFalg){//添加
             customConditionsService.postCustomInitData(function(response){
             _this.removeCustomPop();
             $scope.addCondition(response,response.type);//调用创建conditions方法
             },postConfigCustomData);
             }else{//修改
             _this.removeCustomPop();
             $scope.$apply(function(){angular.element(".query_node_condition:eq("+($scope.curEditorCustomIndex-1)+")").scope().queryCustomAttrLists=[];});
             }*/
            customConditionsService.postCustomInitData(function(response) {
              if (!$scope.editorCustomFalg) {
                $scope.addCondition(response, response.type, $scope.applyGroupData); //调用创建conditions方法
              } else {
                angular.element(".query_node_condition:eq(" + ($scope.curEditorCustomIndex - 1) + ")").scope().queryCustomAttrLists = response.values && response.values.conditions || [];
                angular.element(".query_node_condition:eq(" + ($scope.curEditorCustomIndex - 1) + ")").scope().queryCustomIndicatorLists = response.values && response.values.indexConfig || [];
                angular.element(".query_node_condition:eq(" + ($scope.curEditorCustomIndex - 1) + ")").scope().queryCustomIndicatorRelation = (response.values && response.values.relationship) ? (response.values.relationship == "AND" ? "并且": "或者") : "";
              }
              _this.removeCustomPop();
            }, postConfigCustomData);
          }
        });
      }

    }
    /*汇总指标 start*/

    /*汇总指标 end*/
  }
]);
