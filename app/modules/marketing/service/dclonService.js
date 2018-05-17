(function (window, angular, undefined) {
    angular.module("campaign.dataServices").factory("dclonService", ['$http', '$rootScope', function ($http, $rootScope) {
        var sms = {};
        //保存短信节点
        sms.SaveSmsMessage = function (callback, o, errorcallback) {
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
        sms.getSmsMessage = function (callback, o) {
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
        sms.getSmsTag = function (callback, o) {
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
        sms.getShopsOfTaoBao = function (callback, o) {
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
        sms.getShortLinkType = function (callback, o) {
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
        sms.getSmsLabel = function (callback, o) {
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
        sms.getErrorWords = function (callback, o, errorcallback) {
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
        sms.getGateway = function (callback, o) {
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
        sms.getGatewayById = function (callback, o) {
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
        sms.senderSms = function (callback) { // 保存
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
        sms.senderSmsSummary = function (callback) { // 保存
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
        sms.getSmsDownLoad = function (callback, campaignId, jobId, nodeId) {
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
        sms.getGoodsOfShop = function (parame, callback) {
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
        sms.getShortLink = function (parame, callback) {
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
        sms.getMessageOfHFive = function (parame, callback) {
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

        sms.getCardList = function (callback, param) { //短信节点获取卡类型
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

        sms.getOptout = function (callback) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonsms/optout/?"
            }).success(function (data, status, headers, config) {
                callback(data);
            }).
                error(function (data, status, headers, config) {
                    $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
                });

        }

        var edm = {};

        edm.getOptout = function (callback) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/optout/?"
            }).success(function (data, status, headers, config) {
                callback(data);
            }).
                error(function (data, status, headers, config) {
                    $(this).Alert({ "title": data.message, "str": data.description, "mark": true });
                });

        }

        //EDM节点
        edm.saveEDMnode = function (callback, o) {
            $http({
                method: 'post',
                url: GLOBAL_STATIC.nodeRoot + 'node/dclonedm/',
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
        //保存邮件编辑
        edm.saveUploadFile = function (callback, o) {
            $http({
                method: 'post',
                url: GLOBAL_STATIC.nodeRoot + 'node/dclonedm/save/email/',
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
        //获取EDM节点
        edm.getEDM = function (callback, o) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/" + graph.nodeId + "/?_=" + new Date().getTime()
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
        edm.getAllEmails = function (callback, o) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/email_moulds/?_=" + new Date().getTime(),
                params: o
            }).success(function (data, status, headers, config) {
                callback(data);
            }).
                error(function (data, status, headers, config) {
                    $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
                });
        }
        edm.getAllCategory = function (callback, o) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/categories/" + o + "/?_=" + new Date().getTime()
            }).success(function (data, status, headers, config) {
                callback(data);
            }).
                error(function (data, status, headers, config) {
                    $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
                });
        }
        //获取EDM渠道
        edm.EDMgetGateway = function (callback, o) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/gateway/" + "?_=" + new Date().getTime()
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
        edm.EnterpriseEmail = function (callback, o) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/email/" + "?_=" + new Date().getTime()
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
        edm.modifyEDMuploadFile = function (callback, o) {
            $http({
                method: "post",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/edit/fileHtml/?_=" + new Date().getTime(),
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
        edm.uploadtoyun = function (callback, o) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "node/dclonedm/uploadtoyun/" + o + "/?_=" + new Date().getTime()
            }).success(function (data, status, headers, config) {
                callback(data);
            }).
                error(function (data, status, headers, config) {
                    $(this).Alert({ "title": httpTitle || "提示", "str": data.message, "mark": true });
                })
        }
        //EDM发送报告列表
        edm.senderEdm = function (callback, data) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "report/sender/dclonedm/list/?_=" + new Date().getTime(),
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
        edm.senderEdmSummary = function (callback) { // 保存
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "report/sender/dclonedm/summary/?_=" + new Date().getTime() + "&campaignId=" + graph.campId + "&nodeId=" + graph.nodeId
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
        edm.getEdmDownLoad = function (callback, campaignId, jobId, nodeId) {
            $http({
                method: "get",
                url: GLOBAL_STATIC.nodeRoot + "report/sender/dclonedm/download/?campaignId=" + campaignId + "&jobId=" + jobId + "&nodeId=" + nodeId + '/'
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
         //获取邮件节点标题标签
         edm.getEdmTag = function (callback, o) {
            $http({
                method: 'get',
                url: GLOBAL_STATIC.nodeRoot + 'node/dclonedm/tag/',
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

        var wechat = {};
        wechat.openWechat = function (callback) {
            $http({
              method: "get",
              url: GLOBAL_STATIC.nodeRoot + "wechatdkt/" + graph.nodeId + "/?_=" + new Date().getTime()
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
        wechat.postWechatData = function (callback, data, curElement) {
            $http({
              method: "put",
              url: GLOBAL_STATIC.nodeRoot + "wechatdkt/?_=" + new Date().getTime(),
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
        // 获取微信公众号
        wechat.getPublicNumbers = function (callback, data) {
            $http({
              method: "get",
              url: GLOBAL_STATIC.nodeRoot + "wechatdkt/getOffaccts?_=" + new Date().getTime()
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
        wechat.getWechatMaterials = function (parame, callback, data) {
            $http({
              method: "get",
              url: GLOBAL_STATIC.nodeRoot + "wechatdkt/materials/" + parame.offacct + "/"+parame.page + "/" +parame.msgType + "?page=" + parame.page + "&pagesize=" + parame.pagesize + "&_=" + new Date().getTime()
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
        return {
            sms: sms,
            edm: edm,
            wechat: wechat
        }
    }
    ]);
})(window, angular, undefined);