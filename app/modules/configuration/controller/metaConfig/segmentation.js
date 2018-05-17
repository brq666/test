angular.module('ccmsApp').controller('segmentationCtrl', ['$scope', 'segmentationService',
  function($scope, segmentationService) {
    //初始化数据
    $scope.segmentationData = [];
    $scope.segmentationName = "";
    $scope.isAdd = true;
    $scope.segmentationCurrentId = null;
    //获取分组元模型数据
    function getSegmentationDatas() {

      var callback = function(data) {
        $scope.segmentationData = data;
      }
      segmentationService.get(callback)
    }
    getSegmentationDatas();
    //新建分组
    $scope.segmentationAdd = function() {
      $scope.segmentationName = "";
      $(".segmentationTpl").addInteractivePop({
        magTitle: "新增分组模型",
        width: 388,
        mark: true,
        position: "fixed",
        childElePop: true
      });
    }
    //修改分组
    $scope.segmentationModify = function(id) {
      $scope.isAdd = false;
      var callback = function(data) {
        $scope.segmentationCurrentId = data.segmentationMetaId;
        $scope.segmentationName = data.segmentationMetaName;
        $(".segmentationTpl").addInteractivePop({
          magTitle: "修改分组模型",
          width: 388,
          mark: true,
          position: "fixed",
          childElePop: true
        });
      }
      segmentationService.getModifyData(callback, id);
    }
    //删除分组
    $scope.segmentationDel = function(id) {
      var callback = function() {
        getSegmentationDatas();
      };
      $(this).Confirm({
        "title": "删除",
        "str": "您确定要删除吗？",
        "mark": true
      },
      function() {
        segmentationService["delete"](callback, id);
      });
    }
    //禁用分组
    $scope.segmentationDisable = function(id, isEnable) {
      var parame = {};
      parame.segmentationMetaId = id;
      if (isEnable) {
        isEnable = false;
      } else {
        isEnable = true;
      }
      parame.isEnabled = isEnable;
      var callback = function() {
        getSegmentationDatas();
      }
      segmentationService.put(callback, parame);
    };
    $scope.segmentationSave = function() {
      var parame = {};
      parame.segmentationMetaId = $scope.segmentationCurrentId;
      parame.segmentationMetaName = $scope.segmentationName;

      var callback = function() {
        $(".segmentationTpl").hide();
        $(".yunat_maskLayer").remove();
        getSegmentationDatas();
      }
      segmentationService.save(callback, parame);
    }

  }
]);