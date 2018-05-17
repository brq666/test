angular.module('systemManage.controllers').controller('SysIframeCtrl', ['$resource', '$scope', '$stateParams', '$sce', function($resource, $scope, $stateParams, $sce) {
  const _this = this;
  const context = $stateParams.moduleUrl || '';
  $resource(GLOBAL_STATIC.portalRoot + 'module/' + SYS_STATIC.tenantId + '/sys').query(function(ctcMenusData) {
    var matchUrl="";
    console.log(ctcMenusData);
    console.log(context)
    eachBreakstatus:
    for(var i=0;i < ctcMenusData.length;i++){
      if(ctcMenusData[i].state && ctcMenusData[i].state.indexOf(context) != -1){
        matchUrl = ctcMenusData[i].dataUrl;
        break;
      }else{
        for(var j = 0; j < ctcMenusData[i].children.length; j++){
          if((ctcMenusData[i].children[j].state).indexOf(context) !=-1){
            matchUrl = ctcMenusData[i].children[j].dataUrl;
            break eachBreakstatus;
          }
        }
      }
    };
    console.log(matchUrl)
    _this.contextUrl = $sce.trustAsResourceUrl(matchUrl);
  });
}]);
