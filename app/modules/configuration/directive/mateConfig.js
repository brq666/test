var mateConfigDir = angular.module('mateConfigDirectives', []);
/*
 *非公用指令
 *通用化配置
 *获取主题下的属性集数据
 */
mateConfigDir.directive("getAttributeCollectionData", ['subject',
  function(subject) {
    return function(scope, element, attrs) {
      var a = scope.item;
      var callback = function(data) {
        a.metaAttributeCollection = data;
      }
      subject.getRelationAttributeCollection(callback, a.subjectId);
      var ele = $(element).parents(".box");
    }
  }
]);
/*
 *非公用指令
 *通用化配置
 *获取主题下的属性数据
 */
mateConfigDir.directive("getAttributeData", ['subject',
  function(subject) {
    return function(scope, element, attrs) {
      var a = scope.item;
      var callback = function(data) {
        a.metaAttributes = data.metaAttributes;
      }
      subject.getRelationAttributeList(callback, a.subjectId);
      var ele = $(element).parents(".box");
    }
  }
]);
/*
 *公用指令
 *系统管理
 *作用：基于后端数据去选中options
 *说明：ng-model值为单个的id或者key值
 */
mateConfigDir.directive("setSelectModel", [function() {
  return function(scope, element, attrs) {
    console.log(scope);
  }
}]);