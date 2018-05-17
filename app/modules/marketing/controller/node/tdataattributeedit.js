(function (window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  app.controller('attributeEditNodeCtrl', ["$scope", "saveService", "getListService",
    function ($scope, saveService, getListService) {
      //打开属性修改节点
      $scope.attributeEditNode = {};
      $scope.CurAttributesData = {};
      $scope.attributeEditNode.operator = 0;
      $scope.attributeEditNode.id = graph.nodeId;
      $scope.attributeEditNode.name = "标签修改";
      $scope.attributeEditNode.needDel = 0;
      $scope.attributeEditNode.catalogId = "";
      $scope.nodeAttributes = [];
      $scope.loadAttributes = false;
      $scope.nodeAttributesMaps = [
        { id: 0, name: '字符单选' },
        { id: 1, name: '字符输入' },
        { id: 2, name: '数字选择' },
        { id: 3, name: '数字输入' },
        { id: 4, name: '日期选择' }
      ];

      // $scope.$watch("CurAttributesData", function(newValue, oldValue) {
      //   if (newValue === oldValue) {
      //     return;
      //   }
      //   $scope.CurAttributesData = newValue;
      //   $scope.CurAttributesDataNumSels = newValue.numSels;
      //   $scope.CurAttributesDataCharSels = newValue.charSels;
      //   $scope.attributeEditNode.propertyId = newValue.propertyId;
      //   $scope.attributeEditNode.propertyType = newValue.type;
      // });
      //获取属性修改节点
      $scope.getAttributeEditNode = function (element) {
        var callback = function (data) {
          $scope.CurAttributesDataNumSelsNewValue = "";
          $scope.CurAttributesDataCharSelsNewValue = "";
          $scope.attributeEditNode = data;
          $scope.attributeEditNode.name = data.name || "标签修改";
          $scope.attributeEditNode.needDel = data.needDel || 0;
          $scope.attributeEditNode.propertyId = data.propertyId;
          $scope.attributeEditNode.catalogId = data.catalogId || 0;
          $scope.nodecomment = data.remark;

          getListService.getAttributes(function (response) {
            $scope.nodeAttributes = response;
            //forEach找到当前匹配的数据
            angular.forEach($scope.nodeAttributes, function (val, key) {
              if (val.propertyId == data.propertyId) {
                $scope.CurAttributesData = val;
                $scope.CurAttributesDataNumSels = val.numSels;
                $scope.CurAttributesDataCharSels = val.charSels;
              };
            });
            var attrIsEnabled = $scope.nodeAttributes.findIndex(function (item) {
              return item.propertyId === data.propertyId;
            })
            if (attrIsEnabled === -1 && data.propertyId) {
              $scope.attrIsEnabled = true;
            }
            angular.forEach($scope.CurAttributesDataNumSels, function (val, key) {
              if (val.numValue == data.newValue) {
                $scope.CurAttributesDataNumSelsNewValue = val;
              }
            });
            angular.forEach($scope.CurAttributesDataCharSels, function (val, key) {
              if (val.charValue == data.newValue) {
                $scope.CurAttributesDataCharSelsNewValue = val;
              }
            });
            $scope.loadAttributes = true;
          }, $scope.attributeEditNode.catalogId);

          $scope.attributeEditNode.propertyType = data.propertyType; //属性值类型
          $scope.attributeEditNode.needDel = data.needDel; //是否清空原有属性值
          $scope.attributeEditNode.isNew = data.isNew; //是新值还是选择值；
          $scope.attributeEditNode.newValue = data.newValue;
          $scope.attributeEditNode.operator = data.operator || 0; //＋还是－
          $scope.attributeEditNode.targetValue = data.targetValue;
        }
        getListService.getAttributeEditNode(callback, $scope.attributeEditNode);

        getListService.getNodeTipsByType(function (responseTips) { // 获取tips
          $scope.attributeTips = responseTips.tips || "";
        }, "tdataattributeedit");
      }
      //获取属性
      $scope.getNodeAttributes = function (catalogId) {
        var callback = function (data) {
          $scope.nodeAttributes = data;
          $scope.attributeEditNode.propertyId = "";
          $scope.CurAttributesData = {};
          // $scope.nodeAttributesMaps = $scope.nodeAttributes.map(function(value) {
          //   switch(value.type) {
          //     case 0: return {id:0,name:'字符单选'};
          //     case 1: return {id:1,name:'字符输入'};
          //     case 2: return {id:2,name:'数字选择'};
          //     case 3: return {id:3,name:'数字输入'};
          //     case 4: return {id:4,name:'日期选择'};
          //   }
          // });
        }
        getListService.getAttributes(callback, catalogId);
      }
      $scope.getAttributeEditNode();
      $scope.openNodePop()
      //检查节点
      // $scope.$watch("CurAttributesData", function(n, o) {
      //   if (n != undefined) {
      //     if (n) {
      //       $scope.isEmptyValue = false;
      //     } else {
      //       $scope.isEmptyValue = true;
      //     }
      //   }
      // });

      $scope.checkNodeAttributes = function () {
        //type为不同值要去获取的值不同
        if (!$scope.attributeEditNode.propertyId) {
          $scope.attrIsEnabled = false;
          $scope.isEmptyValue = true;
          return "验证错误";
        };

        if ($scope.attributeEditNode.catalogId === "") {
          $(this).Alert({
            "title": "提示",
            "str": "请选择标签目录",
            "mark": true,
            "eleZindex": 20002,
            "markZindex": 20001
          });
          return "验证错误";
        }

        if ($scope.attributeEditNode.needDel == 1) {
          if ($scope.attributeEditNode.name) {
            $scope.saveNodeAttributes();
          } else {
            return
          }
        } else {
          if ($scope.CurAttributesData.type == 3 && $scope.attributeEditNode.isNew == 1 && $scope.attributeEditNode.newValue && $scope.attributeEditNode.name) {
            $scope.finalNewValue = $scope.attributeEditNode.newValue;
            $scope.saveNodeAttributes();
          } else if ($scope.CurAttributesData.type == 3 && $scope.attributeEditNode.isNew == 0 && $scope.attributeEditNode.targetValue && $scope.attributeEditNode.name) {
            //$scope.finalNewValue = $scope.attributeEditNode.targetValue;
            $scope.saveNodeAttributes();
          } else if ($scope.CurAttributesData.type == 0 && $scope.attributeEditNode.name && $scope.CurAttributesDataCharSelsNewValue.charValue) {
            $scope.finalNewValue = $scope.CurAttributesDataCharSelsNewValue.charValue;
            $scope.saveNodeAttributes();
          } else if ($scope.CurAttributesData.type == 2 && $scope.attributeEditNode.name && $scope.CurAttributesDataNumSelsNewValue.numValue != undefined) {
            $scope.finalNewValue = $scope.CurAttributesDataNumSelsNewValue.numValue;
            $scope.saveNodeAttributes();
          } else if ($scope.CurAttributesData.type == 1 || $scope.CurAttributesData.type == 4) {
            if ($scope.attributeEditNode.newValue && $scope.attributeEditNode.name) {
              $scope.finalNewValue = $scope.attributeEditNode.newValue;
              $scope.saveNodeAttributes();
            }
            else {
              $(this).Alert({
                "title": "提示",
                "str": "设置的值不能为空",
                "mark": true,
                "eleZindex": 20002,
                "markZindex": 20001
              });
            }
          } else {
            $(this).Alert({
              "title": "提示",
              "str": "设置的值不能为空",
              "mark": true,
              "eleZindex": 20002,
              "markZindex": 20001
            });
          }
        }

      }
      //保存节点
      $scope.saveNodeAttributes = function () {
        var getFinalData = {
          id: graph.nodeId,
          name: $scope.attributeEditNode.name,
          catalogId: $scope.attributeEditNode.catalogId,
          remark: $scope.nodecomment,
          needDel: $scope.attributeEditNode.needDel,
          isNew: $scope.attributeEditNode.isNew,
          operator: $scope.attributeEditNode.operator,
          newValue: $scope.finalNewValue,
          propertyType: $scope.attributeEditNode.propertyType,
          propertyId: $scope.attributeEditNode.propertyId,
          targetValue: $scope.attributeEditNode.targetValue
        };
        saveService.saveAttributeEditNode(function () {
          $("#nodeContent").hide();
          $(".yunat_maskLayer").hide();
          $(this).yAlert({
            "text": "保存成功"
          });
          removeAlert();
          $scope.editNodeName(graph.nodeId, $scope.attributeEditNode.name, $scope.nodecomment)
        }, getFinalData);
      }
      $scope.clearValue = function (model, oldModel) {
        angular.forEach($scope.nodeAttributes, function (val, key) {
          if (val.propertyId == model) {
            $scope.CurAttributesData = val;
            $scope.CurAttributesDataNumSels = val.numSels;
            $scope.CurAttributesDataCharSels = val.charSels;
            // $scope.attributeEditNode.propertyId = val.propertyId;
            $scope.attributeEditNode.propertyType = val.type;
          };
        });
        $scope.isEmptyValue = false;
        $scope.attrIsEnabled = false;
        $scope.attributeEditNode.newValue = "";
        $scope.attributeEditNode.targetValue = ""
      }
      $scope.loadTreeData = function () {
        return getListService.getCatalogTree(function (data) {
          return data.data.list;
        });
      }
      $scope.selectCatalogId = function (treeId, treeNode, type) {
        if (type === "click") {
          $scope.getNodeAttributes(treeNode.id);
        }
      }
    }
  ]);
})(window, angular, undefined);
