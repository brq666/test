angular.module('ccmsApp').controller('subjectCtrl', ['$scope', 'subject', 'segmentationService',
  function($scope, subject, segmentationService) {
    //初始化数据
    $scope.attributeData = [];
    $scope.segmentationData = [];
    $scope.subjectData = [];
    //获取属性集数据
    $scope.getAttributeCollectionList = function() {
      var callback = function(data) {
        $scope.attributeData = data;
        $scope.attributeData_model = $scope.attributeData[0];
      }
      subject.getAttributeCollection(callback);
    }
    $scope.getAttributeCollectionList();
    //获取元模型数据
    $scope.getSegmentationList = function() {
      var callback = function(data) {
        $scope.segmentationData = data;
        $scope.segmentationModel = data[0];
        $scope.getDataList();
        $scope.relationSubject.refresh();
      }
      segmentationService.get(callback);
    }
    $scope.getSegmentationList();
    $scope.getDataList = function() {
      var callback = function(data) {
        $scope.subjectData = data;
      };
      subject.get(callback, $scope.segmentationModel.segmentationMetaId);
    };

    $scope.deleteDataList = function(id) {
      var callback = function() {
        $scope.getDataList();
      }
      $(this).Confirm({
            "title": "删除",
            "str": "您确定要删除吗？",
            "mark": true
          },
          function() {
            subject["delete"](callback, id);
          })
    }

    $scope.metaSubject = {
      "src": "",
      "subjectName": "",
      "showAddTpl": function() {
        $(".mateSubject_AddTpl").addInteractivePop({
          magTitle: "主题配置",
          width: 500,
          mark: true,
          position: "fixed"
        });
      },
      "add": function() {
        this.src = "view/metaConfig/subject_metaTpl.html?" + new Date().getTime();
      },
      "modify": function() {},
      "save_box1": function() {
        var _this = this;
        var parame = {};
        parame.modelId = $scope.segmentationModel.segmentationMetaId;
        parame.subjectName = $scope.metaSubject.subjectName;
        parame.attributeCollectionConfigs = [];
        //筛选主属性集数据集合
        var a = {},
            attributeData_model = $scope.attributeData_model,
            metaAttributes = attributeData_model.metaAttributes,
            len = metaAttributes.length,
            i = 0;

        a.attributeCollectionId = attributeData_model.attributeCollectionId;
        a.isMaster = true;
        for (; i < len; i++) {
          if (metaAttributes[i].isMaster) {
            a.attributeId = metaAttributes[i].attributeId;
            break;
          }
        }
        parame.attributeCollectionConfigs.push(a);
        //筛选新增属性集
        var list = $scope.attribute.list,
            len2 = list.length,
            j = 0;
        for (; j < len2; j++) {
          var b = {};
          b.attributeCollectionId = list[j].a.attributeCollectionId;
          b.attributeId = list[j].b.attributeId;
          b.isMaster = false;
          parame.attributeCollectionConfigs.push(b);
        }

        var callback = function() {
          _this.close();
          $scope.getDataList();
        }
        subject.post_attribute(callback, parame);

      },
      "close": function() {
        this.src = "";
        $(".mateSubject_AddTpl").hide();
        $(".yunat_maskLayer").remove();
      }
    }
    //属性集
    $scope.attribute = {
      "list": [],
      "refresh": function() {
        var callback = function(data) {
          $scope.subjectData = data;
        };
        subject.get(callback, $scope.segmentationModel.segmentationMetaId);
      },
      "open": function() {
        var _this = this;
        _this.edit = [{
          a: {},
          b: {},
          c: {}
        }];
        $(".selectField").addInteractivePop({
          magTitle: "主题对应属性集配置",
          width: 560,
          mark: true,
          position: "fixed",
          childElePop: true
        });
      },
      "add": function() {
        this.edit.push({
          a: {},
          b: {}
        });
      },
      "del": function(index) {
        if (this.edit.length == 1) {
          return false;
        }
        this.edit.splice(index, 1);
      },
      "change": function(obj, index) {
        var _this = this;
        var callback = function(data) {
          _this.edit[index].c = data.metaAttributes;
        }
        subject.getRelationAttributeList(callback, obj.attributeCollectionId);
      },
      "sure": function() {
        var editData = this.edit,
            len = editData.length,
            i = 0,
            _this = this;
        for (; i < len; i++) {
          _this.list.push(editData[i]);
        }
        _this.close();
      },
      "cancel": function() {
        _this.close();
      },
      "close": function() {
        $(".selectField").hide();
        $(".childElementMark").remove();
        $(".yunat_maskLayer").last().remove();
      }
    }
    //函数属性配置
    $scope.fn = {
      "open": function() {
        var _this = this;
        $(".functionTpl").addInteractivePop({
          magTitle: "主题对应函数属性配置",
          width: 560,
          mark: true,
          position: "fixed",
          childElePop: true
        });
      },
      "sure": function() {

      },
      "cancel": function() {
        _this.close();
      },
      "close": function() {
        $(".functionTpl").hide();
        $(".childElementMark").remove();
        $(".yunat_maskLayer").last().remove();
      }
    }

    //关联配置
    $scope.relationSubject = {
      "src": "",
      "refresh": function() {
        var callback = function(data) {
          $scope.relationData = data;
        }
        subject.getRelationList(callback, $scope.segmentationModel.segmentationMetaId);
      },
      "showAddTpl": function() {
        $(".relationSubject_AddTpl").addInteractivePop({
          magTitle: "关联配置",
          width: 530,
          mark: true,
          position: "fixed"
        });
      },
      "add": function() {
        this.src = "view/metaConfig/subject_relationTpl.html?" + new Date().getTime();
        $scope.subjectDataModel = $scope.subjectData[0];
        //定义操作数据
        $scope.relationSubject.operate = [{
          a: {},
          b: {},
          b1: {},
          c: {},
          c1: {}
        }]; //a对象为行为主题model，b为关联属性集数据，b1为关联属性集model，c为关联属性数据，c1为关联属性model
      },
      "del": function(id) {
        var callback = function() {
          $scope.relationSubject.refresh();
        }
        $(this).Confirm({
          "title": "删除",
          "str": "您确定要删除吗？",
          "mark": true
        },
        function() {
          subject.delete_relation(callback, id);
        })
      },
      "changeSubjectAction": function(model, index) {
        var callback = function(data) {
          $scope.relationSubject.operate[index].b = data;
        }
        subject.getRelationAttributeCollection(callback, model.subjectId);
      },
      "changeAttributeCollection": function(model, index) {
        var callback = function(data) {
          $scope.relationSubject.operate[index].c = data;
        }
        subject.getRelationAttribute(callback, model.attributeCollectionId);
      },
      "save": function() {
        var _this = this;
        var parame = {};
        parame.subjectId = $scope.subjectDataModel.subjectId;
        parame.behaviorList = [];
        var data = $scope.relationSubject.operate,
            len = data.length,
            i = 0;
        for (; i < len; i++) {
          var o = {};
          o.subjectId = data[i].a.subjectId;
          o.attributeCollectionId = data[i].b1.attributeCollectionId;
          o.attributeId = data[i].c1.attributeId;
          parame.behaviorList.push(o);
        }

        var callback = function() {
          _this.close();
          $scope.relationSubject.refresh();
        }
        subject.postRelation(callback, parame);
      },
      "close": function() {
        $(".relationSubject_AddTpl").hide();
        $(".yunat_maskLayer").remove();
      },
      "addAction": function() {
        $scope.relationSubject.operate.push({
          a: {},
          b: {},
          b1: {},
          c: {},
          c1: {}
        });
      },
      "delAction": function(index) {
        var len = $scope.relationSubject.operate.length;
        if (len == 1) {
          return false;
        }
        $scope.relationSubject.operate.splice(index, 1)
      }
    }
    //
    $scope.relationSubject
  }
]);