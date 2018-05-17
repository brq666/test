angular.module('dataServices', []).factory('saveService', ['$http', '$rootScope',
  function($http, $rootScope) {
    var saveService = {};
    saveService.saveShops = function(callback, o) {
      $http({
        method: 'put',
        url: rootStatic + 'web-system/sys/department/' + o.id + '/shops/',
        data: o.data
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    }
    saveService.saveRoles = function(callback, o) {
      $http({
        method: 'put',
        //updated by 茅丹丹 2014-4-21
        //url: rootStatic + 'web-system/sys/role/' + o.id + '/permissions',
        //updated by 茅丹丹 2014-5-6
        url: rootStatic + 'web-system/sys/role/' + o.id + '/permissions/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    }
    saveService.saveMemberGradeSetting = function(callback, o) {
      $http({
        method: 'post',
        url: rootStatic + 'web-common-component/node/membergrade/config/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    saveService.updateMemberGradeSetting = function(callback, o) {
      $http({
        method: 'put',
        url: rootStatic + 'web-common-component/node/membergrade/config/' + o.id + '/update/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    saveService.saveCustomerAttributesSettings = function(callback, o) {
      $http({
        method: 'post',
        url: rootStatic + 'web-common-component/customproperty/config/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //名单匹配节点配置
    saveService.postRollMatchSubjectsList = function(callback, o) {
      $http({
        method: 'put',
        url: rootStatic + "web-common-component/node/match/config/",
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    //立即营销节点配置
    saveService.postMarketingondemandSubjectsList = function(callback, o) {
      $http({
        method: 'put',
        url: rootStatic + "web-common-component/node/marketingondemand/config/",
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    //客服工作台配置
    saveService.postWorkbenchSubjectsList = function(callback, o) {
      $http({
        method: 'put',
        url: rootStatic + "customer/service/workbench/config/",
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    return saveService;

  }]);
angular.module('dataServices').factory('getListService', ['$http', '$rootScope',
  function($http, $rootScope) {
    var getListService = {};
    getListService.getAllShops = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + 'web-component/shop/selector/' + CAMPAIGN_STATIC.tenantId,
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    //获取某一个部门下的店铺
    getListService.getShopsById = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + 'web-system/sys/department/' + o.id + '/shops/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getRolesById = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + 'web-system/sys/role/' + o.id + '/permissions/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    //获取主题
    getListService.getSubject = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/subject/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //获取店铺纬度和VIP等级纬度(字典纬度)
    getListService.getDic = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/dic/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    //获取等级设置列表
    getListService.getMemberGradeSettings = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + 'web-common-component/node/membergrade/config/all/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    //获取客户自定义属性配置
    getListService.getCustomerAttributesSettings = function(callback, data) {
      $http({
        method: "get",
        url: rootStatic + "web-common-component/customproperty/config/open/"
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    //名单匹配节点配置
    getListService.getRollMatchSubjectsList = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + "web-common-component/node/match/subjects/?_=" + new Date().getTime()
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    //立即营销活动节点配置
    getListService.getMarketingondemandSubjectsList = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + "web-common-component/node/marketingondemand/subjects/?_=" + new Date().getTime()
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    //客服工作台配置
    getListService.getWorkbenchSubjectsList = function(callback, o) {
      $http({
        method: 'get',
        url: rootStatic + "customer/service/workbench/subjects/?_=" + new Date().getTime()
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    return getListService;

  }]);
angular.module('dataServices').factory('deleteService', ['$http',
  function($http) {
    var deleteServiceObj = {};
    deleteServiceObj.deleteMemberGradeSetting = function(callback, id) {
      $http({
        method: 'delete',
        url: rootStatic + 'web-common-component/node/membergrade/config/' + id + '/delete/'
      }).success(function() {
        callback();
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    return deleteServiceObj;
  }]);
angular.module('dataServices').factory("accountService", ['$http',
  function($http) { //新建系统账号
    return {
      "getRolesList": function(callback, data) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-system/sys/role/?_=" + new Date().getTime()
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
      "getSectionList": function(callback, data) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-system/sys/department/root/?_=" + new Date().getTime()
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
      "getCurUser": function(callback, curId) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-system/sys/user/" + curId + '/'
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
      "postSaveUser": function(callback, data) {
        $http({
          "method": "POST",
          "url": rootStatic + "web-system/sys/user/",
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
      "putSaveUser": function(callback, data) {
        $http({
          "method": "PUT",
          "url": rootStatic + "web-system/sys/user/" + data.id + '/',
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
      "getStatus": function(id, v, callback) {
        $http({
          "method": "PUT",
          url: rootStatic + 'web-system/sys/user/' + id + '/status/',
          data: '{ "id":' + id + ',"enabled":' + !v + '}'
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
  }]);
angular.module('dataServices').factory("queryConfigService", ['$http',
  function($http) { //查询条件配置
    return {
      "deleteConfig": function(data, callback) {
        $http({
          "method": "DELETE",
          "url": rootStatic + "queryitem/" + data + '/'
        }).success(function(response) {
          if (response.isBoolean) {
            callback();
          } else {
            $(this).Alert({
              "title": "提示",
              "str": data.message,
              "mark": true
            });
          }
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "queryType": function(callback) { //获取查询类型
        $http({
          "method": "get",
          "url": rootStatic + "subject/attribute/queryitem/querytype/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getTables": function(callback) {
        $http({
          "method": "get",
          "url": rootStatic + "meta/register/tables/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getTableColumn": function(callback, tableName, schemaName) {
        $http({
          "method": "get",
          "url": rootStatic + "meta/database" + "/tables/" + tableName + "/columns/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "queryDictionary": function(callback, dictionaryTypeId, ele, frontendComponentType, configParamValue, id) {
        $http({
          "method": "get",
          "url": rootStatic + "subject/attribute/queryitem/dictionary/type/" + dictionaryTypeId + "/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response, ele, frontendComponentType, configParamValue, id);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "queryMetaDic": function(callback, ele, frontendComponentType, configParamValue, id) {
        $http({
          "method": "get",
          "url": rootStatic + "meta/dic/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response, ele, frontendComponentType, configParamValue, id);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "queryMetaDicSimplify": function(callback) {
        $http({
          "method": "get",
          "url": rootStatic + "meta/dic/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "categoryType": function(callback) {
        $http({
          "method": "GET",
          url: rootStatic + "category/type/?_=" + new Date().getTime()
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
      "getCategory": function(callback) {
        $http({
          "method": "GET",
          url: rootStatic + "category/?_=" + new Date().getTime()
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
      "queryCategoryGroupBy": function(callback, id) {
        $http({
          "method": "get",
          "url": rootStatic + "category/groupby/" + id + "/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "saveCategoryGroupBy": function(callback, data) {
        $http({
          "method": "post",
          "url": rootStatic + "category/groupby/?_=" + new Date().getTime(),
          "data": data
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "modificationCategory": function(callback, id) {
        $http({
          "method": "GET",
          url: rootStatic + "queryitem/" + id + "/?_=" + new Date().getTime()
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
      "postCategory": function(callback, data) {
        $http({
          "method": "POST",
          url: rootStatic + "category/",
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
      "deleteCategory": function(callback, data) {
        $http({
          "method": "DELETE",
          url: rootStatic + "category/" + data + '/'
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
  }]);
angular.module('dataServices').factory("dataTableConfigService", ['$http',
  function($http) { //查询条件配置
    return {
      "deleteTable": function(data, callback) {
        $http({
          "method": "DELETE",
          "url": rootStatic + "meta/database/register/table/" + data + '/'
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getStateLists": function(data, callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "meta/database/tables/" + data + "/mix/subject-column/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      }
    }
  }]);
angular.module('dataServices').factory("dataFilterConfigService", ['$http',
  function($http) { //查询条件配置
    return {
      "getSubjects": function(callback, data) {
        $http({
          "method": "GET",
          "url": rootStatic + "subject/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getRegisterTable": function(callback, data) {
        $http({
          "method": "GET",
          "url": rootStatic + "meta/database/register/tables/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "deleteFilter": function(data, callback) {
        $http({
          "method": "DELETE",
          "url": rootStatic + "meta/filter/" + data + '/'
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getFilterConfigLists": function(data, callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "getFilterConfigLists/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "postFilterConfigLists": function(data, callback) {
        $http({
          "method": "POST",
          "data": data,
          "url": rootStatic + "meta/filter/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getMetaFilterTypeData": function(callback, data) {
        $http({
          "method": "GET",
          "url": rootStatic + "meta/filter/type/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getMetaDirData": function(callback, data) {
        $http({
          "method": "GET",
          "url": rootStatic + "meta/dic/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getColumnsData": function(callback, data) {
        $http({
          "method": "GET",
          "url": rootStatic + "meta/database/tables/" + data + "/columns/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getCurFilter": function(data, callback) { //全局配置subject切换
        $http({
          "method": "GET",
          "url": rootStatic + "subject/" + data.subjectId + "/filter/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "submitGlobalData": function(data, callback) {
        $http({
          "method": "POST",
          "data": data,
          "url": rootStatic + "meta/global/?_=" + new Date().getTime()
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      }
    }
  }])
/*短信节点配置 start Added By 茅丹丹 2014-3-24*/
angular.module('dataServices').factory("smsAttributeConfigService", ['$http',
  function($http) {
    return {
      //获取单个短信元数据配置的主题
      "getSubjectById": function(callback, param) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/sms/config/subject/" + param + '/'
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //元数据配置的主题
      "deletesmsAttributeConfigById": function(callback, param) {
        $http({
          "method": "DELETE",
          "url": rootStatic + "web-common-component/node/sms/config/subject/" + param + '/'
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //保存短信元数据配置的主题
      "postSubjectList": function(callback, data) {
        $http({
          "method": "POST",
          "url": rootStatic + "web-common-component/node/sms/config/subject/",
          "data": data
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取元分组模型
      "getMetasegmentList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/sms/config/metasegment/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取所有主题
      "getMetaSubjectList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/sms/config/metasubject/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取所有属性
      "getMetaAttributeList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/sms/config/metaattribute/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //单个-获取所有属性集
      "getSimpleMetaAttributeList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/sms/config/metaattributecollection/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //单个-获取某属性集的所有属性
      "getSimpleMetaAttributeListById": function(callback, params) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/sms/config/metaattributecollection/" + params + "/metaattribute/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取所有短信元数据配置的主题
      "getSmSSubjectsList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/sms/config/subjects/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      }
    }
  }])
/*短信节点配置 end Added By 茅丹丹 2014-3-24*/
/*elm节点配置 start Added By 茅丹丹 2014-3-27*/
angular.module('dataServices').factory("edmAttributeConfigService", ['$http',
  function($http) {
    return {
      //获取单个短信元数据配置的主题
      "getSubjectById": function(callback, param) {
        $http({
          "method": "GET",
          "url": rootStatic + "node/edm/config/subject/" + param + '/'
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //元数据配置的主题
      "deleteEdmAttributeConfigById": function(callback, param) {
        $http({
          "method": "DELETE",
          "url": rootStatic + "web-common-component/node/edm/config/subject/" + param + '/'
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //保存短信元数据配置的主题
      "postSubjectList": function(callback, data) {
        $http({
          "method": "POST",
          "url": rootStatic + "web-common-component/node/edm/config/subject/S",
          "data": data
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取元分组模型
      "getMetasegmentList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/edm/config/metasegment/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取所有主题
      "getMetaSubjectList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/edm/config/metasubject/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取所有属性
      "getMetaAttributeList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/edm/config/metaattribute/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //单个-获取所有属性集
      "getSimpleMetaAttributeList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/edm/config/metaattributecollection/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //单个-获取某属性集的所有属性
      "getSimpleMetaAttributeListById": function(callback, params) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/edm/config/metaattributecollection/" + params + "/metaattribute/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取所有edm元数据配置的主题
      "getEdmSubjectsList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/node/edm/config/subjects/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      }
    }
  }])
/*end 优惠券节点和定向优惠节点配置  Added By 茅丹丹 */
/*start 优惠券节点和定向优惠节点配置  Added By 茅丹丹 */

angular.module('dataServices').factory("WhiteBlackNodeConfigService", ['$http',
  function($http) {
    return {
      //获取列表
      "getNodeList": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "web-common-component/checklist/subject/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取主题
      "getSubjects": function(callback) {
        $http({
          "method": "GET",
          "url": rootStatic + "metas/subject/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //获取手机号 //获取邮箱 属性
      "getAttributes": function(callback, param) {
        $http({
          "method": "GET",
          "url": rootStatic + "metas/subject/" + param + "/main-arributeset/attribute/"
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      //保存黑红名单主题
      "postNode": function(callback, data) {
        $http({
          "method": "POST",
          "url": rootStatic + "web-common-component/checklist/subject/",
          "data": data
        }).success(function(response) {
          callback(response);
        }).error(function(data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      }

    }
  }
])
/*start 优惠券节点和定向优惠节点配置  Added By 茅丹丹 */
