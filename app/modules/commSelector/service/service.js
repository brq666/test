(function(window, webApp, angular, undefined) {
  webApp.service('commSelectorService', ['$http',
    function($http) {
      function get(url, callback, erroback) {
        $http.get(url).success(function(data, status, headers, config) {
          callback(data);
        }).error(function(data, status, headers, config) {
          if (angular.isFunction(erroback)) {
            erroback();
          } else {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          }
        });
      }
      var commSelectorService = {
        'openSelector': function(targetUrl, callback, erroback) {
          var url = GLOBAL_STATIC.ualRoot + targetUrl;
          get(url, callback, erroback);
        },
        'getList': function(parame, callback, erroback) {
          var url = GLOBAL_STATIC.ualRoot + parame.url + parame.id + '/listdata?primary=' + parame.pris;
          get(url, callback, erroback);
        }

      };
      return commSelectorService;
    }
  ]);
})(window, webApp, angular, undefined);
