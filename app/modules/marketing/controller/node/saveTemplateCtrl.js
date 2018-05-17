(function(window, angular, undefined) {

  var app = angular.module('campaign.controllers');

  app.controller("saveTemplateCtrl", ["$window", "$scope", "$http", "$location", "$compile", "ActiveTemplateService", "getListService",
    function($window, $scope, $http, $location, $compile, ActiveTemplateService, getListService) {
      $scope.OpenTemplate();
      //模板新增或者编辑
      $scope.tpl = {
        "src": "",
        "type": "add",
        "id": 0,
        "title": "新建模板",
        "Template": {
          "name": "",
          "remark": "",
          "workflowId": $scope.workflowId
        },
        "submitDisF": false,
        "submit": function() {
          _this = this;
          _this.validate()
        },
        "save": function() {
          _this = this;
          if (_this.type == "add") {
            _this.submitDisF = true;
            ActiveTemplateService.addTemplate(function(response) {
              _this.submitDisF = false;
              $(this).yAlert({
                "text": "添加成功"
              });
              removeAlert();
              $("#saveAsTemplate").hide();
              //setTimeout($window.location.href=root+"app/marketing/index.html#/view/ActiveTemplate",1000);
            }, _this.Template, function(response) {
              _this.submitDisF = false;
            });
          } else {
            ActiveTemplateService.updateTemplate(function(response) {
              $(this).yAlert({
                "text": "编辑成功"
              });
              removeAlert();
              setTimeout($window.location.href = "/portal/index.html#/campaign/marketActivity", 1000);
              $('.campaignListCon').flexReload();
            }, _this.id, _this.Template);
          }
        },
        "validate": function() {
          $("#ump_form").validate({
            rules: {
              name: {
                required: true,
                maxlength: 20
              },
              remark: {
                maxlength: 200
              }
            },
            messages: {
              name: {
                require: "请输入商品优惠名称",
                maxlength: 20
              },
              remark: {
                maxlength: "输入字符最长为100"
              }
            },
            errorPlacement: function(error, element) {
              if (element.is(":radio")) {
                error.appendTo(element.parent());
              } else {
                element.after(error);
              }

            },
            submitHandler: function() {
              $scope.tpl.save();
            }
          });
        }
      }
    }
  ]);
})(window, angular, undefined);
