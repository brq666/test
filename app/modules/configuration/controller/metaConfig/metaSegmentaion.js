/**
 *
 * @Description: 分组元模型JS
 * @author fanhong.meng
 * @date Mar 17, 2014 8:53:00 PM
 */
angular.module('ccmsApp').controller('metaSegmentation', ['$scope', '$http', 'segmentationService',
  function($scope, $http, segmentationService) {

    $scope.configData = {
      "getSeconds_callback": function(data) {

      },
      "segmentation_init": function() {
        segmentationService.getAllSegmentation($scope.configData.getSeconds_callback)
      },
      "getSegmentation_callback": function(data) {

      },
      "deleteSegmentation_callback": function(data) {

      },
      "saveSegmentation_callback": function(data) {

      }
    };

    $scope.configuration = {
      "getSegmentation": function(id) {
        segmentationService.getSegmentation($scope.configData.getSegmentation_callback, id);
      },
      "deleteSegmentation": function(id) {
        segmentationService["delete"]($scope.configData.deleteSegmentation_callback, id);
      },
      "saveSegmentation": function() {
        segmentationService.save($scope.configData.deleteSegmentation_callback);
      },
      "openWindows": function(id) {
        $(".createSegmentation").addInteractivePop({
          magTitle: "分组元模型配置",
          mark: true,
          drag: true,
          position: "fixed",
          width: 640
        }); //弹框调用
      }
    };

    $scope.configData.segmentation_init();

  }
]);