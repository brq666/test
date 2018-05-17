angular.module("campaign.controllers").controller('orderAnalysisConditionCtrl', ['$scope', 'customConditionsService', '$compile',
  function($scope, customConditionsService, $compile) {
    $scope.flag = false;
    $scope.toggleAnalysisConditions = function() {
      $scope.flag = !$scope.flag;
    }

    //监听展开、收起弹框高度设置
    $scope.$watch(function() {
      var _main = $('.commCustomConfigBox .ccmsPublicPopMain .ccmsPublicPopMain');
      if(_main.length === 0) {
        return;
      }
      $('.commCustomConfigBox .ccmsPublicPopMain').css('overflow','visible');
      if ($scope.flag) {
        var mainH = _main.children('div').outerHeight(true),
            mainT = _main.offset().top,
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

    $scope.analysisObj = {
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
        console.log('3');
        var _this = this;
        if($scope.analysisScopeObj.isEditorFlag) {
          return '当前节点不可编辑';
        }
        if (!$scope.flag && $scope.isAnalysisToggleConditionsAreaShow) {
          $scope.toggleAnalysisConditions();
        }
        angular.element("#analysisConfigForm").validate({
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
              "configId": $scope.analysisScopeObj.curSubjectAnalysisConfigConditions.configId || ""
            };
            var conditionsConfigData = $scope.getAllCustomDatas(); //获取数据
            postConfigCustomData.attribute = conditionsConfigData.attribute.slice();
            $scope.$apply(function() {
              $scope.analysisScopeObj.curSubjectAnalysisConfigConditions = $.extend({},
                  postConfigCustomData, true);
              $scope.analysisScopeObj.disposeSubjectConditionsView(($scope.analysisScopeObj.curSubjectAnalysisConfigConditions.attribute || []));
            });
            _this.removeCustomPop();
            //console.log($scope.analysisScopeObj.curSubjectAnalysisConfigConditions)
          }
        });
      }

    }
  }
]);
