(function(window, angular, undefined, webApp) {
  webApp.factory("ngSelectorService", ['$http',
    function($http) {
      return {
        //商品列表
        "GetProductList": function(callback, data) {
          $http({
            "method": "post",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/search/page/",
            "headers": {
              'Content-Type': 'application/json'
            },
            data: data
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        //sku列表
        "getSkusList": function(callback, shopId, numIid, data) {
          $http({
            "method": "post",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/search/shop/"+ shopId +"/numiid/" + numIid + "/skus/",
            "headers": {
              'Content-Type': 'application/json'
            },
            "data": data
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        //店铺
        "getShops": function(callback, param) { //获取shops
          $.ajax({
            "async": false,
            "type": "get",
            "url": GLOBAL_STATIC.componentRoot + "shop/selector/" + CAMPAIGN_STATIC.tenantId + "?_=" + new Date().getTime(),
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "contentType": "application/json",
            "dataType": "json",
            "success": function(response) {
              callback(response);
            },
            "error": function(data, status, headers, config) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          });
        },
        //商品选择器-商品标准类目
        "getStandardCategoryByShopId": function(callback, param) {
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + CAMPAIGN_STATIC.tenantId + "/shop/" + param + "/standardcategory/"
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        //根据标准类目CID查询商品属性信息列表
        "getPropertysByCid": function(callback, param) {
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + CAMPAIGN_STATIC.tenantId + "/standardcategory/" + param + "/property/"
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        //根据标准类目CID与商品属性PID查询商品属性值信息列表
        "getPropertysByCidAndPid": function(callback, param1, param2) {
          $http({
            "method": "GET",
            async: false,
            "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + CAMPAIGN_STATIC.tenantId + "/standardcategory/" + param1 + "/property/" + param2 + "/value/"
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        //商品选择器-商品自定义类目
        "getCustomcategory": function(callback, param) {
          /* $http({
           "method": "GET",
           "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + tenantId + "shop/" + param + "/customcategory/"
           }).success(function (response) {
           callback(response);
           }).error(function (data, status, headers, config) {
           $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
           });*/

          $.ajax({
            "type": "GET",
            "dataType": "json",
            "contentType": "application/json;charset=utf-8",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/tenantId/" + CAMPAIGN_STATIC.tenantId + "/shop/" + param + "/customcategory/",
            "success": function(response) {
              callback(response);
            },
            "error": function(data, status, headers, config) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          });

        },

        //查询商品标签列表
        "getTags": function(callback, errorback) {
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.datamanageRoot + "producttag/?_=" + new Date().getTime()
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            errorback(data, status, headers, config);
            if (status != 403) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              })
            };
          });
        },
        //查询条件
        "getCondition": function(callback, param) {
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/snapshoot/" + param + "/condition/"
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        //加载之前选中的产品
        "getFindedProduct": function(callback, param) {
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/snapshoot/" + param + "/product/"
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        //保存搜索条件和选中记录
        "postSelector": function(callback, param) {
          $.ajax({
            "async": false,
            "type": "post",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/",
            "data": JSON.stringify(param),
            "headers": {
              "Accept": "application/json, text/plain, */*"
            },
            "contentType": "application/json",
            "dataType": "json",
            "success": function(response) {
              callback(response);
            },
            "error": function(data, status, headers, config) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          });
        },
        //查询商品列表个数 2014-4-12
        "getProductCount": function(callback, param) {
          $.ajax({
            "async": false,
            "type": "GET",
            "dataType": "json",
            "contentType": "application/json;charset=utf-8",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/snapshoot/" + param + "/product/count/",
            "success": function(response) {
              callback(response);
            },
            "error": function(data, status, headers, config) {
              $(this).Alert({
                "title": httpTitle || "提示",
                "str": data.message,
                "mark": true
              });
            }
          });
        },
        //查询默认商品 2014-5-13
        "getproductsBysnapshootId": function(callback, param) {
          /*    $.ajax({
           async: false,
           "type": "GET",
           dataType: "json",
           "contentType": "application/json;charset=utf-8",
           "url": GLOBAL_STATIC.componentRoot + "product/selector/snapshoot/"+param+"/product/",
           success: function (response) {
           callback(response);
           }, error: function (data, status, headers, config) {
           $(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
           }
           });*/
          $http({
            "method": "GET",
            "url": GLOBAL_STATIC.componentRoot + "product/selector/snapshoot/" + param + "/product/"
          }).success(function(response) {
            callback(response);
          }).error(function(data, status, headers, config) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        }
      }
    }
  ])
})(window, angular, undefined, webApp);
