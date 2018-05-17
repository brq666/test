angular.module('campaign.dataServices', []).factory('saveService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var saveService = {};
    saveService.timeNode = function (callback, o, fn) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/time/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        fn()
      });

    }
    //保存目标组节点
    saveService.TargetMessage = function(callback, o, curElement) {
      $http({
        method: 'put',
        url: GLOBAL_STATIC.nodeRoot + 'node/target/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });

    }
    //dcl保存目标组节点
    saveService.dclTargetMessage = function(callback, o, curElement) {
      $http({
        method: 'put',
        url: GLOBAL_STATIC.nodeRoot + 'node/dtarget/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });

    }

    //保存查询节点
    saveService.queryNode = function(callback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/query/',
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

    //保存短信节点
    saveService.SaveSmsMessage = function(callback, o, errorcallback) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/',
        data: o
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        errorcallback();
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true,
          "eleZindex": 20002,
          "markZindex": 20001
        });
      });

    }
    //EDM节点
    saveService.saveEDMnode = function(callback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/edm/',
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
    //保存邮件编辑
    saveService.saveUploadFile = function(callback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/edm/save/email/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    saveService.saveAttributeEditNode = function (callback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/customproperty/?_=' + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    }
    saveService.saveVIPnode = function (callback, o) {
      $http({
        method: "post",
        url: GLOBAL_STATIC.nodeRoot + "node/membergrade/save/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    saveService.saveNEWVIPnode = function (callback, o) {
      $http({
        method: "post",
        url: GLOBAL_STATIC.nodeRoot + "node/newmembergrade/save/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    saveService.saveResponseEC = function (callback, o) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/couponresp/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    saveService.saveResponseEDM = function (callback, o) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/edmresp/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    saveService.saveTcommunicateOther = function (callback, o) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/offline/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    return saveService;
  }
]).factory('getListService', ['$http', '$rootScope', '$q',
  function ($http, $rootScope, $q) {
    var getListService = {};

    //获取打开活动信息
    getListService.getCurCampNews = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.campaignRoot + "campaign/" + o + "/news/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    //获取活动查询节点的统计人数
    getListService.gettfilterCampQueryCount = function (callback, errorCallback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + "node/camp/query/count/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        errorCallback(data);
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    };

    //停止活动查询节点的统计人数
    getListService.stoptfilterCampQueryCount = function (callback, errorCallback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + "node/camp/query/count/stop/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        errorCallback(data);
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    };

    //获取订单查询节点的统计人数
    getListService.gettfilterOrderQueryCount = function (callback, errorCallback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + "node/order/query/count/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        errorCallback(data);
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    };

    //停止订单查询节点的统计人数
    getListService.stoptfilterOrderQueryCount = function (callback, errorCallback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + "node/order/query/count/stop/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        errorCallback(data);
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    };

    //获取属性查询节点的统计人数
    getListService.gettfilterAttrQueryCount = function (callback, errorCallback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + "node/attr/query/count/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        errorCallback(data);
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    };

    //停止属性查询节点的统计人数
    getListService.stoptfilterAttrQueryCount = function (callback, errorCallback, o) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + "node/attr/query/count/stop/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        errorCallback(data);
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    };

    //获取节点的tips
    getListService.getNodeTipsByType = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.campaignRoot + "workflow/meta/node/" + o + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.getTimeNode = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/time/' + graph.nodeId + "/?_=" + new Date().getTime(),
        data: $.param(o)
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
    //获取目标组信息
    getListService.getTargetMessage = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/target/' + graph.nodeId + "/?_=" + new Date().getTime(),
        data: $.param(o)
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
    // dcl获取目标组信息
    getListService.dclGetTargetMessage = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dtarget/' + graph.nodeId + "/?_=" + new Date().getTime(),
        data: $.param(o)
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
    //获取短信节点 getSmsMessage
    getListService.getSmsMessage = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/' + graph.nodeId + "/?_=" + new Date().getTime(),
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
    //获取短息标签
    getListService.getSmsTag = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/tag/',
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
    //获取淘宝店铺
    getListService.getShopsOfTaoBao = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/shop/',
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
    //获取短链类型
    getListService.getShortLinkType = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/shortlinktype/',
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
    //获取短息标签
    getListService.getSmsLabel = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/labels/',
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
    //获取短信违禁词
    getListService.getErrorWords = function(callback, o, errorcallback) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/content/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        if (errorcallback && typeof errorcallback == 'function') {
          errorcallback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    }

    //获取目标组信息
    getListService.getTargetMessageList = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/target/' + graph.nodeId + '/result/',
        data: $.param(o)
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    //获取查询节点信息
    getListService.getFindNode = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/query/' + graph.nodeId + "/?_=" + new Date().getTime(),
        data: $.param(o)
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.getDefaultGroup = function (callback, o) { //获取已有分组
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + "node/group/category" + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getParMoveInputOutAll = function (callback, o) { //获取已有分组
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + "node/group/category/view/movegroup/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getCampaignUpdate = function (param, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.campaignRoot + 'campaign/' + param + '/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.getQueryDataResult = function (param, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/target/result/' + param + '/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.checkFileTargetResult = function (subjobId, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/target/download/checkFile/' + subjobId + '/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    //dcl目标组查看数据
    getListService.dclGetQueryDataResult = function(param, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dtarget/result/' + param + '/?_=' + new Date().getTime()
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
    getListService.downLoadTargetData = function(param, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/target/download/' + graph.campJobid + '/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getUmpDataResult = function(params, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/ump/report/?campId=' + params.campId + '&jobId=' + params.jobId + '&nodeId=' + params.nodeId + '&_=' + new Date().getTime()
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
    //获取活动所属分类
    getListService.getProgram = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.campaignRoot + 'campaign/' +CAMPAIGN_STATIC.tenantId + '/classification/?_=' + new Date().getTime()
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
    getListService.getProgramList = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.campaignRoot + 'campaign/' +CAMPAIGN_STATIC.tenantId + '/classification/list?_=' + new Date().getTime()
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
    //获取活动类型
    getListService.getCategory = function(callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.campaignRoot + 'campaign/category/' + CAMPAIGN_STATIC.tenantId + '?disabled=false_=' + new Date().getTime()
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
    //获取审批人
    getListService.getInvestigator = function(callback, o) {
      var temp = $q.defer();
      $http({
        method: 'get',
        url: GLOBAL_STATIC.orgsRoot + 'admin/users/approvers?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
        temp.resolve();
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        temp.reject();
      });
      return temp.promise;
    }

    //获取短息通道
    getListService.getGateway = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/gateway/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getGatewayById = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/gateway/' + o + '/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    // 活动查询节点
    getListService.opentfilterCampQueryNode = function (callback, data) {  //打开活动查询节点
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/camp/query/" + data + "/?_=" + new Date().getTime()
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示", "str": data.message, "mark": true
        });
      });
    }

    getListService.tfilterCampQueryNodeChannelType = function (callback) {  //打开活动查询节点
      $http({
        method: "get",
        url: GLOBAL_STATIC.componentRoot + "basedata/channelType/?_=" + new Date().getTime()
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示", "str": data.message, "mark": true
        });
      });
    }

    // 订单查询节点
    getListService.opentfilterOrderQueryNode = function (callback, data) {  //打开订单查询节点
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/order/query/" + data + "/?_=" + new Date().getTime()
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
      });
    }

    // 属性查询节点
    getListService.opentfilterAttrQueryNode = function (callback, data) {  //打开属性查询节点
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/attr/query/" + data + "/?_=" + new Date().getTime()
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
      });
    }
    // 属性查询节点左侧树
    getListService.getAttrQueryNodeTree = function (callback, data) {  //得到属性查询节点左侧树
      getListService.getAttrQueryNodeTree.callback = callback;
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "metas/picker/queryItem/property/subject/" + data + "/?_=" + new Date().getTime(),
      }).
      success(function (data, status, headers, config) {
        if (getListService.getAttrQueryNodeTree.callback === callback) {
          callback(data);
        }
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    }

    // 属性查询节点 客户标签
    getListService.getZidingyi = function(callback, categoryId, catalogId, subjectId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "metas/picker/queryItem/property/zidingyi/" + categoryId + "/" + catalogId + "/" + subjectId + "?_=" + new Date().getTime()
      }).then(function(data) {
        callback(data);
      }, function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.getAttrQueryQianNiu = function (callback, data) {//得到属性查询节点千牛数据
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "metas/picker/queryItem/property/qianniu/" + data + "/?_=" + new Date().getTime()
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    }

    getListService.getAttrQueryConfigConditions = function (callback, data) {//打开属性查询节点的自定义查询条件
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/attr/query/custom/" + data + "/?_=" + new Date().getTime()
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    }

    //客户分群查询节点
    getListService.opentfiltercgqNode = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/customergroup/query/" + data + "/?_=" + new Date().getTime()
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    }

    //查询节点 start
    getListService.opentfilterNode = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/query/" + data + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getConfigConditions = function (callback, data) { //打开节点的自定义查询条件
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/query/custom/" + data + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getGlobalHead = function (callback, data) { //打开节点的自定义查询条件
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/query/filter/" + data + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.postCampQueryConditions = function (callback, data, curElement) {//保存活动查询的自定义查询条件
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/camp/query/custom/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }

    getListService.postAttrQueryConditions = function (callback, data, curElement) {//保存属性查询的自定义查询条件
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/attr/query/custom/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }

    getListService.postOrderQueryConditions = function (callback, data, curElement) {//保存订单查询的自定义查询条件
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/order/query/custom/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }

    getListService.postConfigConditions = function (callback, data, curElement) { //保存节点的自定义查询条件
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/query/custom/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }

    getListService.postcgqConfigConditions = function (callback, data, curElement) {//客户分组查询节点保存
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/customergroup/query/custom/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }
    getListService.postcgqConfigConditionsCamp = function (callback, data) {//客户分组查询节点保存
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/customergroup/query/custom/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }
    getListService.putCreateGroupByQuery = function (callback, data) { //保存节点的查询条件为客户分组
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/query/custom-group/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.putOrderQueryCreateGroupByQuery = function (callback, data, curElement) {//订单查询保存节点的查询条件为客户分组
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/order/query/custom-group/?_=" + new Date().getTime(),
        data: data
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true, "markZindex": 1005, "eleZindex": 1006 });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }
    getListService.putCampQueryCreateGroupByQuery = function (callback, data, curElement) {//活动查询保存节点的查询条件为客户分组
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/camp/query/custom-group/?_=" + new Date().getTime(),
        data: data
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        data.description = '提示';
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true, "markZindex": 1005, "eleZindex": 1006 });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }
    getListService.putAttrQueryCreateGroupByQuery = function (callback, data, curElement) {//属性查询保存节点的查询条件为客户分组
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/attr/query/custom-group/?_=" + new Date().getTime(),
        data: data
      }).
      success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true, "markZindex": 1005, "eleZindex": 1006 });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      });
    }

    getListService.getShops = function (callback, data) { //获取shops
      $http({
        method: "get",
        url: GLOBAL_STATIC.componentRoot + "shop/selector/" + CAMPAIGN_STATIC.tenantId + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.getOrderPlatList = function (callback, data) { // 获取平台数据
      var temp = $q.defer();
      $http({
        method: "get",
        url: GLOBAL_STATIC.componentRoot + "plat/selector/subject/order?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
        temp.resolve();
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        temp.reject();
      });
      return temp.promise;
    }

    getListService.getPlatList = function (callback, data) { // 获取平台数据
      var temp = $q.defer();
      $http({
        method: "get",
        url: GLOBAL_STATIC.componentRoot + "plat/selector/subject?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
        temp.resolve();
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        temp.reject();
      });
      return temp.promise;
    }

    getListService.getShopsByPlatformId = function (callback, platformId) { //获取shops
      $http({
        method: "get",
        url: GLOBAL_STATIC.componentRoot + "shop/selector/" + CAMPAIGN_STATIC.tenantId + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getShopsForUMP = function (callback, data) { //获取UMP店铺
      $http({
        method: "get",
        url: GLOBAL_STATIC.campaignRoot + "ump/shop/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    }
    getListService.getShopsForCoupon = function (callback, data) { //获取Coupon店铺
      $http({
        method: "get",
        url: GLOBAL_STATIC.campaignRoot + "coupon/shop/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });

    }
    //查询节点 end
    //获取EDM节点
    getListService.getEDM = function (callback, o) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edm/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.getAllEmails = function (callback, o) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edm/email_moulds/?_=" + new Date().getTime(),
        params: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
      });
    }

    getListService.getAllCategory = function (callback, o) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edm/categories/" + o + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
      });
    }
    //获取EDM渠道
    getListService.EDMgetGateway = function (callback, o) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edm/gateway/" + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    }
    getListService.EnterpriseEmail = function (callback, o) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edm/email/" + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    }
    getListService.modifyEDMuploadFile = function (callback, o) {
      $http({
        method: "post",
        url: GLOBAL_STATIC.nodeRoot + "node/edm/edit/fileHtml/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    getListService.uploadtoyun = function (callback, o) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edm/uploadtoyun/" + o + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
      })
    }
    //属性修改节点
    getListService.getAttributeEditNode = function (callback, o) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/customproperty/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    }
    getListService.getCatalogTree = function(callback) { //获取标签目录
      return $http({
        method: "get",
        url: GLOBAL_STATIC.datamanageRoot + "customproperty/catalog/tree" + "?_=" + new Date().getTime()
      }).then(function(data) {
        return callback(data);
      }, function(data) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        return false;
      });
    }
    //获取自定义属性
    getListService.getAttributes = function (callback, catalogId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/customproperty/properties/" + graph.nodeId + "/?catalogId=" + catalogId + "&_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    //支付宝红包节点
    getListService.openDiscountBenefit = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/benefit/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getBenefitActivity = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/benefit/shop/" + data + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.postDiscountBenefitData = function (callback, data, curElement) {
      $http({
        method: 'put',
        url: GLOBAL_STATIC.nodeRoot + "node/benefit/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    }


    //效果跟踪节点
    getListService.openDiscountTrack = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/effecttracking/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      })
    };
    getListService.putDiscountTrack = function (callback, data) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/effecttracking/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      })
    };
    getListService.getDiscountTrackEchart = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/effecttracking/report/pair/" + graph.nodeId + "/?type=" + data + "&_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      })
    };
    getListService.getDiscountTrack = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/effecttracking/report/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      })
    };


    getListService.senderWechatSummary = function (callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/dataAnalysis/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    // 微信节点
    getListService.openWechat = function (callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getFilterList = function (callback, data, callback2) {
      return $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/filterList/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        callback2(data);
        //$(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
      })
    }

    getListService.getArticleRead = function (callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/wechat/article/?_=" + new Date().getTime()+ "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.postWechatData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/" + graph.nodeId + "/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.getPublicNumbers = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/queryAppInfo?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getWechatMaterialType = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/materialType?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getWechatMaterialList = function (parame, callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/materialList/" + parame.authAppid + "/"+parame.materialType+ "?pageIndex=" + parame.pageIndex + "&pageSize=" + parame.pageSize
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getWechatMaterials = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/materials/" + data + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.goAuthorization = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/wechat/authorize?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    //百丽优惠券节点
    getListService.openDiscountEcBelle = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/couponBelle/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getDiscountCouponBelle = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/couponBelle/getCouponBelle/" + data + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.postDiscountEcBelleData = function (callback, data) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/couponBelle/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    //优惠券节点
    getListService.openDiscountEc = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/coupon/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getDiscountShops = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/shops/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getCoupons = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/coupon/shop/" + data + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.postDiscountData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/coupon/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    //定向优惠节点
    getListService.openDiscountUmp = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/ump/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getDiscountUmpType = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/ump/umptype/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getTaregtNamesList = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/ump/shop/" + parame.shopId + "/umptype/" + parame.type + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.postDiscountUmp = function (callback, data, curElement) {
      $http({
        method: "post",
        url: GLOBAL_STATIC.nodeRoot + "node/ump/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.putDiscountUmp = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/ump/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };
    //新的积分发放节点
    getListService.openDiscountIsNew = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsendnew/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    // 积分发放节点
    getListService.openDiscountIs = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsend/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
      })
    };
    getListService.postDiscountIs = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsend/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };
    getListService.getCardTypeList = function (callback, platformId) {//获取shops
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsend/cardtypelist/tenantId/" + CAMPAIGN_STATIC.tenantId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
      });
    };
    getListService.postDiscountIsData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsend/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.getIsShops = function (callback, data) { //获取shops
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsend/shops/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.openDiscountType = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsend/shop/" + data + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    // 名单匹配节点
    getListService.openMatchNode = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/match/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.postMatchNodeData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/match/save/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.getPortDataResult = function (data, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/match/result/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.startMatchNode = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/match/" + data.id + "/matchResult/?progressTable=" + data.progressTable + "&_=" + new Date().getTime(),
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.matchMatchNode = function (callback, data) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/match/match/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.viewSplitData = function (callback, data) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/match/preview/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.portMatchLoad = function (callback, data) { // 上传文件 名单获取匹配
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/match/upload/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    // 排除节点
    getListService.openExcludeNode = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/exclude/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.postExcludeNodeData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/exclude/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    // 排重节点
    getListService.openPriorityNode = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/prioritize/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.postPriorityNodeData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/prioritize/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    // 抽样节点
    getListService.openSampleNode = function (callback, parame, curElement) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/sample/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.postSampleNodeData = function (callback, data) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/sample/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    // 交集节点
    getListService.openAndNode = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/intersection/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.postAndNodeData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/intersection/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    // 立即营销节点
    getListService.openImmediately = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/marketingondemand/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.postImmediatelyData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/marketingondemand/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    // 客户分组节点
    getListService.openCustomerGroup = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.isPostAdd = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/isExceeded/" + CAMPAIGN_STATIC.tenantId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        // $(this).AlertNew({
        //   "title":"提示",
        //   "str":"您最多只能创建20个客户分群，当前已达到20个。",
        //   "mark":true,
        //   "width":"445px"
        // });

      })
    };
    getListService.postCustomerGroupData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/group/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.getCurCustomerGroupData = function (callback, data) { //ztree点击获取静态分组
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/list/category/" + data + '/' + CAMPAIGN_STATIC.tenantId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getCurAllCustomerGroupData = function (callback, data) { //ztree点击获取全部分组列表
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/list/category/all/" + data + '/' + CAMPAIGN_STATIC.tenantId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    // 响应组节点
    getListService.openResponseGroupNode = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/response/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.postResponseGroupNodeData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/response/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.checkFileResponseResult = function (subjobId, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/response/download/checkFile/' + subjobId + '/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }

    getListService.getResponseDataResult = function (param, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/response/result/' + param + '/?_=' + new Date().getTime(),
        params: {
          "id": param,
          "jobId": graph.campJobid
        }
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    // dcl定制响应组节点
    getListService.dclOpenResponseGroupNode = function(callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/dresponse/" + graph.nodeId + "/?_=" + new Date().getTime()
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

    getListService.dclPostResponseGroupNodeData = function(callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/dresponse/?_=" + new Date().getTime(),
        data: data
      }).success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.dclGetResponseDataResult = function(param, callback) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dresponse/result/'+ param +'/?_=' + new Date().getTime(),
        params: {
          "id": param,
          "jobId": graph.campJobid
        }
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
    //会员等级设置节点
    getListService.getVIPnode = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/membergrade/" + graph.nodeId + "/open/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getNEWVIPnode = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/newmembergrade/" + graph.nodeId + "/open/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getVIPShops = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/membergrade/getshops/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getNEWVIPShops = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/newmembergrade/getcardtypes/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    };
    getListService.getVIPGrades = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/membergrade/getcardtypes/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getNEWVIPGrades = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/newmembergrade/getcardtypes/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getVIPReports = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/membergrade/" + graph.nodeId + "/report/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.getNEWVIPReports = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/newmembergrade/" + graph.nodeId + "/report/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //会员报告文件下载 Added by 2014-5-7 茅丹丹--少辉
    getListService.getVIPReportsDown = function (callback, filename) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/membergrade/download/" + filename + '/'
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    getListService.getNEWVIPReportsDown = function (callback, filename) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/newmembergrade/download/" + filename + '/'
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    getListService.getWhiteAndBlackList = function (callback, data, callback2) {
      return $http({
        method: "get",
        url: GLOBAL_STATIC.componentRoot + "checklist/group/tenantId/" + CAMPAIGN_STATIC.tenantId + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        callback2(data);
        //$(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});
      })
    }
    //优惠券响应节点和EDM响应节点
    getListService.getResponseEC = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/couponresp/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.getResponseEDM = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edmresp/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    getListService.getResponseEDMUrl = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/edmresp/urls/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    /*start 节点发送报告接口Added By 茅丹丹 2014/4/23*/
    //sms发送报告列表
    getListService.senderSms = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/sms/list/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //sms发送报告获取汇总值
    getListService.senderSmsSummary = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/sms/summary/?_=" + new Date().getTime() + "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //EDM发送报告列表
    getListService.senderEdm = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/edm/list/?_=" + new Date().getTime(),
        contentType: "application/json;charset=utf-8"
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    //EDM发送报告获取汇总值
    getListService.senderEdmSummary = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/edm/summary/?_=" + new Date().getTime() + "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //定向优惠发送报告列表
    getListService.senderUmp = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/ump/list/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //优惠券发送报告列表
    getListService.senderCoupon = function (callback, data) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/coupon/list/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //优惠券发送报告获取汇总值
    getListService.senderCouponSummary = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/coupon/summary/?_=" + new Date().getTime() + "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //淘宝权益发送报告获取汇总值
    getListService.senderBenefitSummary = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/benefit/summary/?_=" + new Date().getTime() + "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //定向优惠发送报告获取汇总值
    getListService.senderUMPSummary = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/ump/summary/?_=" + new Date().getTime() + "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    /*end 节点发送报告接口Added By 茅丹丹 2014/4/23*/
    /*start 节点发送报告下载接口Added By 茅丹丹 2014/4/24*/
    //sms 下载
    getListService.getSmsDownLoad = function (callback, campaignId, jobId, nodeId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/sms/download/?campaignId=" + campaignId + "&jobId=" + jobId + "&nodeId=" + nodeId + '/'
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //edm下载
    getListService.getEdmDownLoad = function (callback, campaignId, jobId, nodeId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/edm/download/?campaignId=" + campaignId + "&jobId=" + jobId + "&nodeId=" + nodeId + '/'
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //upm下载
    getListService.getUpmDownLoad = function (callback, campaignId, jobId, nodeId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/upm/download/?campaignId=" + campaignId + "&jobId=" + jobId + "&nodeId=" + nodeId + '/'
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //coupon下载
    getListService.getCouponDownLoad = function (callback, campaignId, jobId, nodeId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/coupon/download/?campaignId=" + campaignId + "&jobId=" + jobId + "&nodeId=" + nodeId + '/'
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    /*end 节点发送报告下载接口Added By 茅丹丹 2014/4/24*/

    //新建客户分群
    getListService.addCustomerGroup = function (callback, data) { // 新建
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/customerGroup/new/" + CAMPAIGN_STATIC.tenantId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    //客户分组 start


    getListService.createCustomerGroup = function (callback, data, methodType) { // 保存
      $http({
        method: methodType,
        url: GLOBAL_STATIC.nodeRoot + "node/group/customerGroup/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.editorCustomerGroup = function (callback, id) { // 编辑-查看分群
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/customerGroup/" + id + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.editorStaticCustomerGroup = function (callback, data) { // 新建
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/result/?_=" + new Date().getTime() + "&page=1&pagesize=20&sortname=&sortorder=desc&query=&qtype=&id=" + data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    //客户分组 end
    //客户分群start

    getListService.getCardGroupData = function (callback, params) {  //卡片式
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/list/?page=" + params.page + "&pagesize=" + params.pagesize + "&query=" + params.query + "&categoryId=" + params.categoryId + "&tenantId=" + CAMPAIGN_STATIC.tenantId + "&sortname=id&sortorder=desc",
        data: params
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getParMoveInput = function (callback, o) { //获取已有分组
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + "node/group/category" + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    }
    getListService.saveParMove = function (callback, data) { // 保存分群要移动的目录
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/group/customerGroup/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    getListService.getNewCategoryTree = function (callback, treeId, tenantId) {  //获取新的tree
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/group/category/except/" + treeId + "/" + tenantId,
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.putDelNewCtg = function (callback, data) {  //删除时选择新移动目录保存
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/group/category/move/?oldId=" + data.oldId + "&newId=" + data.newId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getParMoveCategory = function (callback, data) {  //获取新的tree
      $http({
        method: "get",
        url: GLOBAL_STATIC.campaignRoot + "group/parCategory",
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).AlertNew({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    //客户分群end
    //城市列表
    getListService.getCityByType = function (callback, id, type) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.componentRoot + "area/selector/" + id + "/" + type + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //地区选择器
    getListService.getCityRelationship = function (callback, ids) { // 编辑
      $http({
        method: "post",
        url: GLOBAL_STATIC.componentRoot + "area/relationship/parent/?_=" + new Date().getTime(),
        data: { ids: ids }
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //获取指定周期下指定节点的执行状态 added by 茅丹丹 2014-4-29 小屈
    getListService.nodeStatus = function (callback, nodeId, jobId) { // 编辑
      if (jobId != null) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.campaignRoot + "campaign/schedule/status/job/" + jobId + "/node/" + nodeId + "/?_=" + new Date().getTime()
        }).success(function (data, status, headers, config) {
          if (data.isOk === "FALSE") {
            // 不执行操作,后端返回值特殊处理
          } else {
            callback(data);
          }
        }).error(function (data, status, headers, config) {
          //$(this).Alert({"title": httpTitle || "提示", "str": data.message, "mark": true});  // 去掉出错提示，原因：执行的节点再生成新节点，打开会报错
        })
      }
    }

    //订单分析节点
    getListService.openAnalysisNode = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.saveMarketEffectNode = function (callback, parame) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/effmarket/analysis/save/",
        data: parame
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.openMarketEffectNode = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/effmarket/analysis/open/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.postAnalysisNodeData = function (callback, data, curElement) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/" + graph.nodeId + "/?_=" + new Date().getTime(),
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        if (curElement) { // 保存出错，按钮回复原来状态
          disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(curElement);
        }
      })
    };

    getListService.getAnalysisItemsData = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/" + graph.nodeId + "/config/subjectid/" + parame + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getAnalysisScreeningData = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/" + graph.nodeId + "/config/screening/subjectid/" + parame + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getAnalysisShopBySubjectId = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/subjectid/" + parame + "/shop/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getGoodsOfShop = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/sms/products?shopId=" + parame.shopId + "&query=" + parame.query + "&page=" + parame.page + "&pagesize=" + parame.pagesize + "&sortname=" + parame.sortname + "&t=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.getShortLink = function (parame, callback) {
      $http({
        method: "post",
        url: GLOBAL_STATIC.nodeRoot + 'node/sms/shortlink?' + '_=' + new Date().getTime(),
        data: parame
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
//导出下载结果 验证接口
    getListService.checkFileResult = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/checkFile/" + parame.id + "/job/" + parame.jobId + "/" + parame.resultId + "/download/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
//下载订单明细 验证接口
    getListService.checkFile = function(parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/checkFile/" + parame.id + "/job/" + parame.jobId + "/download/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.getReportDataListTitle = function (parame, callback) {
      graph.campJobid = (graph.campJobid == null ? 0 : graph.campJobid);
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/" + graph.nodeId + "/job/" + graph.campJobid + "/results/tab/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getReportPower = function (parame, callback) {
      graph.campJobid = (graph.campJobid == null ? 0 : graph.campJobid);
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/analysis/order/download/authority/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };

    getListService.getOldCcmsUrl = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.dashboardRoot + "dashboard/sso/directive?originalCampId=" + parame.id + "&originalCampName=" + parame.name + "&_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.getTcommunicateOther = function (callback, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/offline/" + parame.id + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    getListService.validateMarkCheck = function (callback, shopId, desc) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/integralsend/checkDesc/?shopId=" + shopId + "&desc=" + desc + "&_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.impreserch = function (callback, getDateError, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/impreserch/" + parame.id + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    }

    getListService.getTaobaoPlatId = function (callback, getDateError, parame) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.dashboardRoot + "metas/ucenter/plat/taobao/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })

    }

    getListService.behavior = function (parame) {
      var dtd = $.Deferred();
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/behavior/" + parame.id + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        dtd.resolve(data)
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        dtd.reject();
      });
      return dtd.promise()
    } //访问查询节点
    getListService.tfilterHeat = function (parame) {
      var dtd = $.Deferred();
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/heat/" + parame.id + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        dtd.resolve(data)
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
        dtd.reject();
      });
      return dtd.promise()
    } //访问查询节点

    // 客户特征分析
    getListService.openFeatureNode = function (callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/featureanalysis/" + graph.nodeId + "/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.getAnalysisItems = function (callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/featureanalysis/items/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.getAnalysisItemsById = function (callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/featureanalysis/items/" + graph.nodeId + "?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.putAnalysisItems = function (callback, data) {
      $http({
        method: "put",
        url: GLOBAL_STATIC.nodeRoot + "node/featureanalysis/",
        data: data
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    getListService.getAnalysisItemData = function (callback, itemId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/featureanalysis/" + graph.nodeId + "/" + itemId + "/" + graph.campJobid + "/report/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }

    // 淘宝权益
    getListService.deleteBenefitActive = function (callback, param, shopId) {
      $http({
        "method": "DELETE",
        "url": GLOBAL_STATIC.campaignRoot + "benefit/" + shopId + "/activityDetail/" + param + '/'
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    //获取H5店铺
    getListService.getShopsByHfive = function (callback, platformId) {//获取shops
      $http({
        method: "get",
        url: GLOBAL_STATIC.dashboardRoot + "dashboard/assemble/shopinfo/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    }

    //H5链接获取模板信息
    getListService.getMessageOfHFive = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/sms/h5Model?shop_id=" + parame.shop_id + "&keyword=" + parame.keyword + "&page_index=" + parame.page_index + "&page_size=" + parame.page_size + "&pltType=" + parame.pltType + "&thumbnail=" + parame.thumbnail + "&_=" + new Date().getTime()
      })
        .success(function (data, status, headers, config) {
          callback(data);
        })
        .error(function (data, status, headers, config) {
          $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        })
    }

    getListService.getCardList = function (callback, param) { //短信节点获取卡类型
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/sms/loyaltyCarties/?"
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    }

    getListService.getActiveInfoById = function (callback, param, shopId) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.campaignRoot + "benefit/" + shopId + "/activityDetail/" + param
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    getListService.addNewBenefitActive = function (callback, param) {
      $http({
        "method": "POST",
        "url": GLOBAL_STATIC.campaignRoot + "benefit/activityRelation/",
        "data": param
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.modifyBenefitActive = function (callback, param, relationId) {
      $http({
        "method": "POST",
        "url": GLOBAL_STATIC.campaignRoot + "benefit/activityRelation/" + relationId,
        "data": param
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.getBenefitData = function (callback, param) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.campaignRoot + "benefit/Selector",
        "params": param
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.getBenefitTypesData = function (callback) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.campaignRoot + "benefit/benefitTypes"
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    // 查询标签
    getListService.opentLabelNode = function (callback) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.nodeRoot + "node/unionlabel/" + graph.nodeId
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.getLabelsData = function (callback, subjectId) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.nodeRoot + "node/unionlabel/shopAndLabels/" + subjectId
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.toggleEnabledLabel = function (callback, enabled) {
      $http({
        "method": "GET",
        "url": GLOBAL_STATIC.nodeRoot + "node/unionlabel/enabled/" + enabled
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    getListService.putLabelNode = function (callback, data) {
      $http({
        "method": "PUT",
        "url": GLOBAL_STATIC.nodeRoot + "node/unionlabel/save",
        "data": data
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    return getListService;
  }
]).factory('deleteService', ['$http',
  function ($http) {
    var deleteServiceObj = {};
    deleteServiceObj.deleteCampaign = function (param, callback) {
      $http({
        "method": "DELETE",
        "url": GLOBAL_STATIC.campaignRoot + "campaign/" + param + '/'
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };

    deleteServiceObj.deletePartitionGroup = function (param, callback) {//删除单个分群
      $http({
        "method": "DELETE",
        "url": GLOBAL_STATIC.nodeRoot + "node/group/customerGroup/" + param
      }).success(function (response) {
        callback(response);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    return deleteServiceObj;
    /*行为自定义 start*/
  }
]).factory('customConditionsService', ['$http',
  function ($http) {
    return {
      "getCustomInitData": function (data, callback) { //初始化获取数据
        $http({
          method: "get",
          url: GLOBAL_STATIC.nodeRoot + "node/query/behavior/" + data + "/new/?_=" + new Date().getTime()
        }).success(function (data, status, headers, config) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "postCustomInitData": function (callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.nodeRoot + "node/query/behavior/save/?_=" + new Date().getTime(),
          data: data
        }).success(function (data, status, headers, config) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "editorCustomConditions": function (data, callback) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.nodeRoot + "node/query/behavior/" + data + "/?_=" + new Date().getTime()
        }).success(function (data, status, headers, config) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getOrderQueryCustomInitData": function (data, callback) {//订单查询初始化获取数据
        var _this = this;
        _this.getOrderQueryCustomInitData.index = _this.getOrderQueryCustomInitData.index || 0;
        _this.getOrderQueryCustomInitData.index++;
        $http({
          method: "get",
          url: GLOBAL_STATIC.nodeRoot + "node/order/query/behavior/" + data + "/new/?_=" + new Date().getTime()
        }).
        success((function (index) {
          return function (data, status, headers, config) {
            if (index === _this.getOrderQueryCustomInitData.index) {
              callback(data);
            }
          }
        })(_this.getOrderQueryCustomInitData.index)).
        error(function (data, status, headers, config) {
          $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        });
      },
      "postOrderQueryCustomInitData": function (callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.nodeRoot + "node/order/query/behavior/save/?_=" + new Date().getTime(),
          data: data
        }).
        success(function (data, status, headers, config) {
          callback(data);
        }).
        error(function (data, status, headers, config) {
          $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        });
      },
      "editorOrderQueryCustomConditions": function (data, callback) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.nodeRoot + "node/order/query/behavior/" + data + "/?_=" + new Date().getTime()
        }).
        success(function (data, status, headers, config) {
          callback(data);
        }).
        error(function (data, status, headers, config) {
          $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        });
      },
      "changeCustomData": function (callback, data) { //初始化获取数据
        $http({
          method: "get",
          url: GLOBAL_STATIC.campaignRoot + "custom" + data + "/?_=" + new Date().getTime()
        }).success(function (data, status, headers, config) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      }
    }
  }
]).factory('reportService', ['$http',
  function ($http) {
    return {
      // TODO//获取周期也使用此接口
      "getCampJobs": function (callback, data) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.campaignRoot + "campaign/schedule/status/campaign/" + graph.campId + '/?_=' + new Date().getTime(),
          "headers": {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }).success(function (response) {
          callback(response);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getResponseReports": function (callback, data) {
        $http({
          "method": "GET",
          "url": GLOBAL_STATIC.campaignRoot + "report/response/list/?campId=" + graph.campId + "&workflowId=" + graph.workflowId + "&jobId=" + data + '&_=' + new Date().getTime()
        }).success(function (response) {
          callback(response);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getCustomerGroups": function (callback, data) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.campaignRoot + "report/evaluate/customergroup/?campaignId=" + graph.campId + '&_=' + new Date().getTime()
        }).success(function (data) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        });
      },
      "getChannelNodes": function (callback, data) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.campaignRoot + "report/evaluate/channelnode/?campaignId=" + graph.campId + '&_=' + new Date().getTime()
        }).success(function (data) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "evaluateTotal": function (callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.campaignRoot + "report/evaluate/total/?_=" + new Date().getTime(),
          data: data
        }).success(function (data) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "evaluateDay": function (callback, data) {
        $http({
          method: "post",
          url: GLOBAL_STATIC.campaignRoot + "report/evaluate/day/?_=" + new Date().getTime(),
          data: data
        }).success(function (data) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      },
      "getBIReport": function (data, callback) {
        $http({
          method: "get",
          url: GLOBAL_STATIC.decathlonRoot + "decathlon/bi/getDirectUrl?" + data + '&_=' + new Date().getTime()
        }).success(function (data) {
          callback(data);
        }).error(function (data, status, headers, config) {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        })
      }
    }
  }
]).factory('dclonService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var dclonService = {};
    //保存短信节点
    dclonService.SaveSmsMessage = function (callback, o, errorcallback) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        errorcallback();
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true,
          "eleZindex": 20002,
          "markZindex": 20001
        });
      });
    };
    //获取短信节点 getSmsMessage
    dclonService.getSmsMessage = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/' + graph.nodeId + "/?_=" + new Date().getTime(),
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    //获取短息标签
    dclonService.getSmsTag = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/tag/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    //获取淘宝店铺
    dclonService.getShopsOfTaoBao = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/shop/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    //获取短链类型
    dclonService.getShortLinkType = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/shortlinktype/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    //获取短息标签
    dclonService.getSmsLabel = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/labels/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    //获取短信违禁词
    dclonService.getErrorWords = function (callback, o, errorcallback) {
      $http({
        method: 'post',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/content/',
        data: o
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        if (errorcallback && typeof errorcallback == 'function') {
          errorcallback(data, status);
        } else {
          $(this).Alert({
            "title": httpTitle || "提示",
            "str": data.message,
            "mark": true
          });
        }
      });
    };
    //获取短息通道
    dclonService.getGateway = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/gateway/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    dclonService.getGatewayById = function (callback, o) {
      $http({
        method: 'get',
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/gateway/' + o + '/?_=' + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      });
    };
    //sms发送报告列表
    dclonService.senderSms = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/dclonsms/list/?_=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //sms发送报告获取汇总值
    dclonService.senderSmsSummary = function (callback) { // 保存
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/dclonsms/summary/?_=" + new Date().getTime() + "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    //sms 下载
    dclonService.getSmsDownLoad = function (callback, campaignId, jobId, nodeId) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "report/sender/dclonsms/download/?campaignId=" + campaignId + "&jobId=" + jobId + "&nodeId=" + nodeId + '/'
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    };
    dclonService.getGoodsOfShop = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/dclonsms/products?shopId=" + parame.shopId + "&query=" + parame.query + "&page=" + parame.page + "&pagesize=" + parame.pagesize + "&sortname=" + parame.sortname + "&t=" + new Date().getTime()
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    dclonService.getShortLink = function (parame, callback) {
      $http({
        method: "post",
        url: GLOBAL_STATIC.nodeRoot + 'node/dclonsms/shortlink?' + '_=' + new Date().getTime(),
        data: parame
      }).success(function (data, status, headers, config) {
        callback(data);
      }).error(function (data, status, headers, config) {
        $(this).Alert({
          "title": httpTitle || "提示",
          "str": data.message,
          "mark": true
        });
      })
    }
    //H5链接获取模板信息
    dclonService.getMessageOfHFive = function (parame, callback) {
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/dclonsms/h5Model?shop_id=" + parame.shop_id + "&keyword=" + parame.keyword + "&page_index=" + parame.page_index + "&page_size=" + parame.page_size + "&pltType=" + parame.pltType + "&thumbnail=" + parame.thumbnail + "&_=" + new Date().getTime()
      })
        .success(function (data, status, headers, config) {
          callback(data);
        })
        .error(function (data, status, headers, config) {
          $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
        })
    }

    dclonService.getCardList = function (callback, param) { //短信节点获取卡类型
      $http({
        method: "get",
        url: GLOBAL_STATIC.nodeRoot + "node/dclonsms/loyaltyCarties/?"
      }).success(function (data, status, headers, config) {
        callback(data);
      }).
      error(function (data, status, headers, config) {
        $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
      });
    }
    return dclonService;
  }
]);
/*行为自定义 end*/
