(function(window, angular, undefined) {
  var app = angular.module("campaign.controllers");
    //等待节点请求
    app.service("waitNodeDate", ['$http', function($http) {
      function get(id,succcb, errcb) {
        $http.get(GLOBAL_STATIC.nodeRoot+"node/wait/"+id+"/?_=" + new Date().getTime()).success(function(res) {
          if(typeof res == "object"){
            succcb(res);
          }else {
            errcb();
          }
        }).error(errcb);
      }
      function post(data,succcb, errcb) {
        $http.post(GLOBAL_STATIC.nodeRoot+"node/wait/",data).success(function(res) {
          if(typeof res == "object") {
            succcb();
          }else {
            errcb();
          }
        }).error(errcb);
      }

      return {
        get:get,
        post: post
      };
    }])

    //拆分节点请求
    app.service("splitNodeDate", ['$http', function($http){
      function get(id,callback){
        $http.get(GLOBAL_STATIC.nodeRoot + "node/split/" + id + "/?_=" + new Date().getTime())
          .success(function(res){
            callback(res);
          })
          .error(function(res){
          });
      }
      function post(id,data,callback,curElement){
        $http.post(GLOBAL_STATIC.nodeRoot + "node/split/" + id, data)
          .success(function(res){
            callback();
          })
          .error(function (data, status, headers, config) {
            $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
            if(curElement){ // 保存出错，按钮回复原来状态
              disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
            }
          });
      }
      return {
        get:get,
        post:post
      }
    }
  ]);
})(window, angular, undefined);
