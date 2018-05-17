var physicalApp = angular.module("metaDataServices", []);
//数据源 
physicalApp.factory("dataSourceService", ['$http', '$rootScope',
  function($http, $rootScope) {

    var dataSourceService = {};
    dataSourceService.getDataSouece = function(callback) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/physical/datasource/all/?_=' + new Date().getTime()
      }).success(function(resultSet) {
        callback(resultSet);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    };

    dataSourceService.getTemplate = function(callback) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/physical/datasource/template/?_=' + new Date().getTime()
      }).success(function(resultSet) {
        callback(resultSet);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    };

    dataSourceService.deleteDataSource = function(callback, id) {
      $http({
        method: 'delete',
        url: rootStatic + 'metas/physical/datasource/' + id + '/'
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "删除成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    };

    dataSourceService.saveDataSource = function(callback, data) {

      var connectionArray = [];
      for (var i = 0; i < data.metaDataSourceConnection.metaDataSourceConnectionDefinition.length; i++) {
        var connectionObj = {};
        connectionObj.connectionDefinitionId = data.metaDataSourceConnection.metaDataSourceConnectionDefinition[i].connectionDefinitionId;
        connectionObj.connectionValue = data.metaDataSourceConnection.metaDataSourceConnectionDefinition[i].connectionKey;
        connectionArray.push(connectionObj);
      }

      console.log(connectionArray);

      var paramObject = {
        "dataSourceName": data.dataSourceName,
        "templateType": data.templateType,
        "templateUrl": data.templateUrl,
        "connectionInfo": connectionArray

      };

      $http({
        method: 'post',
        url: rootStatic + "metas/physical/datasource/",
        data: paramObject
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "新增成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    };

    dataSourceService.getUnselectedTables = function(callback, id, data) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/physical/datasource/' + id + '/table/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    dataSourceService.saveSourceService = function(callback, id, data) {
      $http({
        method: 'post',
        url: rootStatic + "metas/physical/register/table/?dataSourceId=" + id + '/',
        data: data
      }).success(function(data) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    return dataSourceService;
  }]);

//注册表
physicalApp.factory('registerTableService', ['$http',
  function($http) {
    var registerTableService = {};
    registerTableService.getAllTables = function(callback) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/physical/register/table/?_=' + new Date().getTime()
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    return registerTableService;
  }]);

//注册列
physicalApp.factory("registerColumnService", ['$http',
  function($http) {
    var registerColumnService = {};
    registerColumnService.getAllTables = function(callback) {
      $http({
        method: "get",
        url: rootStatic + 'metas/physical/register/table/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    registerColumnService.getField = function(callback, id) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/physical/register/table/' + id + '/column/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    registerColumnService.getCloumn = function(callback, id, name) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/physical/datasource/' + id + '/table/' + name + '/column/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    registerColumnService.save = function(callback, data) {
      $http({
        method: 'post',
        url: rootStatic + 'metas/physical/register/table/column/',
        data: data
      }).success(function(res) {
        callback();
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    return registerColumnService;
  }]);

// 分组元模型
physicalApp.factory('segmentationService', ['$http',
  function($http) {
    var segmentationService = {};
    segmentationService.get = function(callback) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/segmentation/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    segmentationService["delete"] = function(callback, id) {
      $http({
        method: 'delete',
        url: rootStatic + 'metas/segmentation/' + id + '/'
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    segmentationService.getModifyData = function(callback, id) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/segmentation/' + id + '/'
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    segmentationService.save = function(callback, data) {
      $http({
        method: "post",
        url: rootStatic + 'metas/segmentation/',
        data: data
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        callback();
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    segmentationService.put = function(callback, data) {
      $http({
        method: 'put',
        url: rootStatic + 'metas/segmentation/enabled/',
        data: data
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "修改成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    return segmentationService;
  }]);

//属性集配置
physicalApp.factory("attributeCollection", ['$http',
  function($http) {
    var attributeCollection = {};
    attributeCollection.post = function(callback, data) {
      $http({
        method: 'post',
        url: rootStatic + 'metas/attribute-collection/',
        data: data
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    attributeCollection.getAllTables = function(callback, id) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/physical/register/table/?dataSourceId=' + id + '&_/?=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    return attributeCollection;
  }]);

//主题配置
physicalApp.factory("subject", ['$http',
  function($http) {
    var subject = {};
    subject.getAttributeCollection = function(callback) {
      $http({
        method: "get",
        url: rootStatic + "metas/attribute-collection/?_=" + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    subject.getRelationAttributeList = function(callback, id) {
      $http({
        method: "get",
        url: rootStatic + "metas/attribute-collection/" + id + "/?_=" + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    subject.post_attribute = function(callback, data) {
      $http({
        method: 'post',
        url: rootStatic + 'metas/subject/',
        data: data
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    subject.get = function(callback, id) { //获取元模型下的主题
      $http({
        method: "get",
        url: rootStatic + "metas/segmentation/" + id + "/subject/?_=" + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    subject.getAll = function(callback) { //获取所有的主题
      $http({
        method: "get",
        url: rootStatic + "metas/subject/?_=" + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    subject["delete"] = function(callback, id) {
      $http({
        method: 'delete',
        url: rootStatic + 'metas/subject/' + id + '/?_=' + new Date().getTime()
      }).success(function(data) {
        $(this).yAlert({
          "text": "删除成功"
        });
        removeAlert();
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    subject.getRelationAttributeCollection = function(callback, id) {
      $http({
        method: "get",
        url: rootStatic + "metas/subject/" + id + "/attribute-collection/?_=" + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    subject.getRelationAttribute = function(callback, id) {
      $http({
        method: "get",
        url: rootStatic + "metas/attribute/collection/?id=" + id + "&_/?=" + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    subject.postRelation = function(callback, data) {
      $http({
        method: 'post',
        url: rootStatic + 'metas/subject/behavior/',
        data: data
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    subject.getRelationList = function(callback, id) {
      $http({
        method: "get",
        url: rootStatic + "metas/" + id + "/subject/behavior/?_=" + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    subject.delete_relation = function(callback, id) {
      $http({
        method: 'delete',
        url: rootStatic + 'metas/subject/' + id + '/behavior/?_=' + new Date().getTime()
      }).success(function(data) {
        $(this).yAlert({
          "text": "删除成功"
        });
        removeAlert();
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    return subject;

  }]);

//函数配置
physicalApp.factory("functionAttribute", ['$http',
  function($http) {
    var functionAttribute = {};
    functionAttribute.post = function(callback, data) {
      $http({
        method: 'post',
        url: rootStatic + 'metas/function/',
        data: data
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    functionAttribute.getDataType = function(callback) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/function/filed/datatype/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    functionAttribute["delete"] = function(callback, id) {
      $http({
        method: 'delete',
        url: rootStatic + 'metas/function/' + id + '/?_=' + new Date().getTime()
      }).success(function(data) {
        $(this).yAlert({
          "text": "删除成功"
        });
        removeAlert();
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    functionAttribute.modify = function(callback, id) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/function/' + id + '/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    return functionAttribute;
  }]);

//过滤器
physicalApp.factory("filter", ['$http',
  function($http) {
    var filter = {};
    filter.get = function(callback, id) { //获取主题下的过滤集
      $http({
        method: 'get',
        url: rootStatic + 'metas/filter/subject/' + id + '/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    filter.post = function(callback, data) {
      $http({
        method: 'post',
        url: rootStatic + 'metas/filter/',
        data: data
      }).success(function(resultSet) {
        $(this).yAlert({
          "text": "保存成功"
        });
        removeAlert();
        callback(resultSet);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    filter["delete"] = function(callback, id) {
      $http({
        method: 'delete',
        url: rootStatic + 'metas/filter/' + id + '/?_=' + new Date().getTime()
      }).success(function(data) {
        $(this).yAlert({
          "text": "删除成功"
        });
        removeAlert();
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    return filter;
  }]);
//字典
physicalApp.factory("dic", ['$http',
  function($http) {
    var dic = {};
    dic.get = function(callback) {
      $http({
        method: 'get',
        url: rootStatic + 'metas/dic/?_=' + new Date().getTime()
      }).success(function(data) {
        callback(data);
      }).error(function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    return dic;
  }]);

//查询节点配置
physicalApp.factory("findNode", ['$http',
  function($http) {
    var findNode = {
      "subject": {
        "post": function(callback, data) {
          $http({
            method: 'post',
            url: rootStatic + 'metas/node/query/config/subject/',
            data: data
          }).success(function(resultSet) {
            $(this).yAlert({
              "text": "保存成功"
            });
            removeAlert();
            callback(resultSet);
          }).error(function(data) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        "getList": function(callback, findId) {
          $http({
            method: 'get',
            url: rootStatic + 'metas/node/query/config/' + findId + '/subject/?_=' + new Date().getTime()
          }).success(function(data) {
            callback(data);
          }).error(function(data) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        "get": function(callback, subjectId) {
          $http({
            method: 'get',
            url: rootStatic + 'metas/node/query/config/subject/' + subjectId + '/?_=' + new Date().getTime()
          }).success(function(data) {
            callback(data);
          }).error(function(data) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        },
        "delete": function(callback, subjectId) {
          $http({
            method: 'delete',
            url: rootStatic + 'metas/node/query/config/subject/' + subjectId + '/?_=' + new Date().getTime()
          }).success(function(data) {
            $(this).yAlert({
              "text": "删除成功"
            });
            removeAlert();
            callback(data);
          }).error(function(data) {
            $(this).Alert({
              "title": httpTitle || "提示",
              "str": data.message,
              "mark": true
            });
          });
        }
      }
    };

    return findNode;
  }
]);