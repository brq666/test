/*短信节点配置控制器 start*/
angular.module('ccmsApp').controller('CmsConfigQueryCtrl', ['$scope', '$http', '$compile', '$templateCache', 'smsAttributeConfigService',
  function($scope, $http, $compile, $templateCache, smsAttributeConfigService) {
    $scope.attributes = [];
    $scope.attributeCommit = [];
    $scope.model = "add";

    //获取元分组模型
    $scope.initMetaSegmentList = function() { //初始化请求
      smsAttributeConfigService.getMetasegmentList(function(response) {
        $scope.MetaSegmentList = response;
      })
    };
    $scope.initMetaSegmentList();
    //获取所有主题
    $scope.initMetaSubjectList = function() { //初始化请求
      smsAttributeConfigService.getMetaSubjectList(function(response) {
        $scope.MetaSubjectList = response;
      })
    };
    $scope.initMetaSubjectList();
    /*短信配置列表 start*/
    $scope.getList = function() {
      smsAttributeConfigService.getSmSSubjectsList(function(response) {
        $scope.SmSSubjectsList = response;
        $scope.SmSSubjectsList.forEach(function(SmSSubject) {
          $scope.MetaSubjectList.forEach(function(metaSubject) {
            if (metaSubject.subjectId == SmSSubject.subjectId) {
              SmSSubject.subjectName = metaSubject.subjectName;
            }
          });
          $scope.MetaSegmentList.forEach(function(metaSegment) {
            if (metaSegment.modelId == SmSSubject.metaSegmentModelId) {
              SmSSubject.modelName = metaSegment.modelName;
            }
          });
        });
      })
    };
    $scope.getList();
    /*短信配置列表 end*/
    /*删除短信配置 start*/
    $scope.deleteSmsAttributeCon = function(cid) {
      $(this).Confirm({
        "title": "确认删除",
        "str": "你确定删除此短信节点配置吗",
        "mark": true
      }, function() {
        smsAttributeConfigService.deletesmsAttributeConfigById(function(response) {
          $(this).yAlert({
            "text": "删除成功"
          });
          removeAlert();
          $scope.getList();
        }, cid);
      })
    }
    /*新建或者编辑短信节点口弹窗 start*/
    $scope.showsmsQueryConfigurationPop = function(cid) {
      if (!cid) {
        $(".addPop").addInteractivePop({
          magTitle: "短信节点配置",
          mark: true,
          width: 450,
          height: 320,
          drag: true,
          position: "fixed"
        });
        addAndEditPopData.init();
        $scope.model = "add";
      } else {
        $(".addPop").addInteractivePop({
          magTitle: "编辑短信节点配置",
          mark: true,
          width: 450,
          height: 320,
          drag: true,
          position: "fixed"
        });
        addAndEditPopData.init(cid);
        $scope.model = "edit";
      }

    }
    //初始化短信节点弹出框
    var addAndEditPopData = {
      "init": function(cid) {
        if ($scope.model == "add") {
          $scope.attributeCommit = [];
          var attributeInit = {
            "attributeType": 0,
            "attributeCollectionId": 0,
            "attributeId": 0,
            "attributeName": ""
          };
          $scope.attributeCommit.push(attributeInit);
        } else {
          //获取当前的短信配置
          $scope.intiEditsmsQueryConfigurationPop = function() {
            smsAttributeConfigService.getSubjectById(function(response) {
              $scope.modelId = response.metaSegmentModelId;
              $scope.subjectId = response.subjectId;
              $scope.mobileAttributeId = response.mobileAttributeId;
              $scope.attributeCommit = response.attributes;
              $scope.attributeCommit.forEach(function(attribute) {
                //简单
                if (attribute.attributeType == 1) {
                  getAttributeList(1);
                } else {
                  getAttributeList(2);
                }
                $scope.MetaAttributeList.forEach(function(metaAttribute) {
                  if (metaAttribute.attributeId == attribute.attributeId) attribute.attributeName = metaAttribute.attributeName;
                });
              });
            }, cid);
          }
          $scope.intiEditsmsQueryConfigurationPop();
        }
      }
    }

    /*新建或者编辑短信节点口弹窗 end*/
    /*新建属性文本框 begin*/
    $scope.addIndicator = function(index) {
      if ($scope.attributeCommit[index].attributeName == "") {
        $(".attrerror").hide();
        $(".attrerror").eq(index).show();
      } else {
        var attributeInit = {
          "attributeType": 0,
          "attributeCollectionId": 0,
          "attributeId": 0,
          "attributeName": ""
        };
        $scope.attributeCommit.push(attributeInit);
      }
      var height = $(".conditionLayoutBox").height();
      if (height == 100) {
        $(".conditionLayoutBox").css("overflow-y", "scroll");
      } else {
        $(".conditionLayoutBox").css("overflow-y", "hidden");
      }
    }
    /*新建属性文本框 end*/
    /*移除属性文本框 begin*/
    $scope.removeIndicator = function(index) {
      if ($scope.attributeCommit.length > 1) {
        $scope.attributeCommit.splice(index, 1);
      }
    }
    /*移除属性文本框 end*/
    /*展示属性弹窗 start*/
    $scope.showAttrPop = function(index) {
      $scope.attrIndex = index;
      var left = $(".attributeInput").eq(index).offset().left;
      var top = $(".attributeInput").eq(index).offset().top;
      $(".attrPop").css({
        "left": left + 30,
        "top": top - 60
      });
      $(".attrPop").show();
      if ($scope.model == "add") {
        $scope.attributeCollectionId = "";
        $scope.metaAttribute = {};
      }
      $scope.status = 0;
      $scope.change_state(0);
    }
    /*改变复杂简单属性 start*/
    $scope.change_state = function(status) {
      if ($scope.status == 0) {
        $("#attributeSelect").attr("disabled", "true");
        $("#attributeCollectionSelect").removeAttr("disabled");
        //单个-获取所有属性集
        $scope.initSimpleMetaAttributeList = function() { //初始化请求
          smsAttributeConfigService.getSimpleMetaAttributeList(function(response) {
            $scope.MetaAttributeCollectionList = response;
          })
        };
        $scope.initSimpleMetaAttributeList();
      } else {
        $scope.attributeCollectionId = "";
        $("#attributeCollectionSelect").attr("disabled", "true");
        $("#attributeSelect").removeAttr("disabled");
        //获取所有复杂属性
        getAttributeList(1);
      }
      if ($scope.model == "add") {
        $scope.metaAttribute = {}
      }
    }
    /*改变复杂简单属性 end*/
    /*改变简单属性集联动子集 start*/
    $scope.change_select = function() {
      if (typeof($scope.attributeCollectionId) == "undefined") {
        $("#attributeSelect").attr("disabled", "true");
      } else {
        getAttributeList(0);
        $("#attributeSelect").removeAttr("disabled");
      }
    }
    /*改变简单属性集联动子集 end*/
    function getAttributeList(type) {
      if (type == 0) {
        smsAttributeConfigService.getSimpleMetaAttributeListById(function(response) {
          $scope.MetaAttributeList = response;
        }, $scope.modelId)

      } else {
        smsAttributeConfigService.getMetaAttributeList(function(response) {
          $scope.MetaAttributeList = response;
        })
      }
    }

    /*展示属性弹窗 end*/
    /*保存新短信节点弹窗 start*/
    $scope.AttrPopSave = function() {
      if ($scope.status == 0) {
        if (!$scope.attributeCollectionId) {
          $scope.attributeCollectionIdShow = true;
          return;
        } else {
          $scope.attributeCollectionIdShow = false;
        }
        if (typeof($scope.metaAttribute.attributeName) == "undefined") {
          $scope.attributeIdShow = true;
          return;
        } else {
          $scope.attributeIdShow = false;
        }
        $scope.attributeCommit.forEach(function(attribute, index) {
          if (index == $scope.attrIndex) {
            attribute.attributeType = $scope.status;
            attribute.attributeCollectionId = $scope.attributeCollectionId;
            attribute.attributeId = $scope.metaAttribute.attributeId;
            attribute.attributeName = $scope.metaAttribute.attributeName;
          }
        });
      } else {
        if (typeof($scope.metaAttribute.attributeName) == "undefined") {
          $scope.attributeIdShow = true;
          return;
        } else {
          $scope.attributeIdShow = false;
        }
        $scope.attributeCommit.forEach(function(attribute, index) {
          if (index == $scope.attrIndex) {
            attribute.attributeType = $scope.status;
            attribute.attributeCollectionId = "";
            attribute.attributeId = $scope.metaAttribute.attributeId;
            attribute.attributeName = $scope.metaAttribute.attributeName;
          }
        });
      }
      $(".attrerror").hide();
      $(".attrPop").hide();
    }
    /*保存新短信节点弹窗 end*/
    /*保存新短信节点弹窗 start*/
    $scope.addPopSave = function() {
      if (!$scope.modelId) {
        $scope.metaSegmentShow = true;
        return;
      } else {
        $scope.metaSegmentShow = false;
      }
      if (!$scope.subjectId) {
        $scope.metaSubjectShow = true;
        return;
      } else {
        $scope.metaSubjectShow = false;
      }

      var postData = {};
      postData.metaSegmentModelId = $scope.modelId;
      postData.subjectId = $scope.subjectId;
      postData.mobileAttributeId = "1";
      $scope.attributes = [];
      $scope.attributeCommit.forEach(function(attribute, index) {
        var curattribute = {};
        curattribute.subjectId = $scope.subjectId;
        curattribute.attributeType = attribute.attributeType;
        curattribute.attributeCollectionId = attribute.attributeCollectionId;
        curattribute.attributeId = attribute.attributeId;
        $scope.attributes.push(curattribute);
      });
      if (!$scope.attributes) {
        $(".attrerror").eq(0).show();
        return;
      } else {
        $(".attrerror").hide();
      }
      postData.attributes = $scope.attributes;
      if ($scope.model == "add") {
        smsAttributeConfigService.postSubjectList(function(response) {
          $(this).yAlert({
            "text": "新建成功"
          });
          removeAlert();
          $(".addPop").hide();
        }, postData);
      } else {
        smsAttributeConfigService.postSubjectList(function(response) {
          $(this).yAlert({
            "text": "编辑成功"
          });
          removeAlert();
          $(".addPop").hide();
        }, postData);
      }
      $scope.getList();
    }
    /*保存新短信节点弹窗 end*/
  }
]);
/*查询节点配置控制器 end*/
