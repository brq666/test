
angular.module('dataManage.dataServices').factory("ngCustomInfoService", ["$http",function ($http) {
  return{
    "getCustomerInfo": function (callback, data) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.decathlonRoot + "decathlon/custv/getCustv?user=" + data
      }).success(function (response) {
        callback(response);
      })
    },
    "getTotalActivity": function (callback, data) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.decathlonRoot + "decathlon/custv/getActSummary?user=" + data
      }).success(function (response) {
        callback(response);
      })
    }    
  }
}]);

