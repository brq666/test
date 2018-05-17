angular.module("campaign.controllers").controller('MarketCreate', ["$scope", "MarketResource", "modalInstance", "$ccValidator", "getListService", "$ccTips", "selectorProduct", "$rootScope", "$element", function ($scope, MarketResource, modalInstance, $ccValidator, getListService, $ccTips, selectorProduct, $rootScope, $element) {
  /** dataType
   * TextInput(1, "文本输入框"),
   * NumberInput(2, "数字输入"),
   * CharsetChoose(3, "字符选项"),
   * AmountType(4, "金额"),
   * UserSelector(5, "用户"),
   * BrandSelector(6, "品牌"),
   * ORGSelector(7, "组织"),
   * DatetimeSelector(8, "日期"),
   * ProductSelector(9, "商品"),
   * SelectCategory(10, "活动所属分类"),
   * SelectApprover(11, "审批人"),
   * Remark(12, "活动备注");
   */
  var _this = this;
  var promise = getListService.getInvestigator(function (data) {
    _this.investigators = data;
  });

  // 加载完后，设定label height
  $scope.$on('ngRepeatFinished', function() {
    angular.forEach(angular.element('.itemLabel'), function(item) {
      if (angular.element(item).height() > 20) {
        angular.element(item).css({
          "vertical-align": "-11px"
        })
      }
    })
  });

  // 初始化活动目录
  var program = function(id) {
    getListService.getProgramList(function(data) {
      _this.programData = data;
      if (id) {
        var curProfram = _this.programData.find(function (item) {
          return item.id === id;
        })
        _this.classificationId = curProfram.name;
      }
    })
  } 

  // init data
  var disponseData = function (data, editId) {
    data.fieldName = data.fieldName ? data.fieldName + ':' : '';
    if (editId) {
      data.isDisabled = !data.isCanUpdate || data.status === 2;
    } else {
      data.isDisabled = !data.isCanEdit;
    }
    // 自定义类型，id视为code
    /** 
     * data.status
     * 1 预制
     * 2 禁用
     * 3 启用
     * 4 待提交
     */
    if (data.status == 2 || data.status === 3) {
      data.code = data.id;
    }

    // 新增填充默认值
    if (!data.value && (data.initValue || data.defaultValue)) {
      _this[data.code] = data.isCanEdit ? (data.dataType === 8 ? new Date(data.initValue) : data.initValue) : (data.dataType === 8 ? new Date(data.defaultValue) : data.defaultValue);
    }

    // 字符类型
    if (data.dataType === 3) {
      data.list = [];
      var datas = data.cfgValue.split(',') || [];
      datas.forEach(function(i) {
        data.list.push({
          title: i,
          value: i
        })
      })

      if (data.rule.operator === '多选') {
        if (data.value && data.value.value) {
          data.value.value = String(data.value.value).split(',');
        } else {
          _this[data.code] = data.isCanEdit ? data.initValue && String(data.initValue).split(',') : data.defaultValue && String(data.defaultValue).split(',');
        }
      }

    }
    // 组织类型
    if (data.dataType === 7) {
      MarketResource.Organization.get({type: data.cfgValue}, function(res) {
        data.list = res.data || [];
      })

      if (data.rule.operator === '多选') {
        if (data.value && data.value.value) {
          data.value.value = String(data.value.value).split(',').map(function(i) {
            return i * 1;
          });
        } else {
          _this[data.code] = data.isCanEdit ? data.initValue && String(data.initValue).split(',').map(function(i) {
            return i * 1;
          }) : data.defaultValue && String(data.defaultValue).split(',').map(function(i) {
            return i * 1;
          });
        }
      } else {
        if (data.value && data.value.value) {
          data.value.value = data.value.value * 1;
        }
      }
    }

    // 时间类型
    if (data.dataType === 8) {
      data.minTime = data.minTime && new Date(data.minTime);
      data.maxTime = data.maxTime && new Date(data.maxTime);
      if (data.value && data.value.value) {
        data.value.value = new Date(data.value.value);
      }
    } 

    // 商品类型
    if (data.dataType === 9 && data.value && data.value.value) {
      data.storeId = data.value.value;
      data.value.value = data.value.display;
      data.count = data.value.ext;
    }
    return data;
  }

  if (this.curCampaignId) {
    promise.then(function () {
      MarketResource.MarketConditions.get({id: _this.curCampaignId}, function (response) {
        _this.marketArrary = response.map(function (item) {   
          item = disponseData(item, _this.curCampaignId);
          if (item.code === 'classificationId') {
            _this.progNameId = item.value && item.value.value
          } else {
            _this[item.code] = item.value && item.value.value;
          }
          return item;
        }) || [];
      }).$promise.then(function() {
        program(_this.progNameId);
      })
    });
  } else {
    MarketResource.MarketConditions.get(function (response) {
      _this.marketArrary = response.map(function (item) {
        return disponseData(item);
      }) || [];
    })
  }

  this.attrIsInvalid = function (attr, type, opts) {
    if (!this.invalidBegin || opts.isDisabled) return false;
    switch (type) {
      case 0:
        if (opts.dataType === 9) {
          // 商品
          return this[attr] && opts.count && opts.rule.max && !(opts.count <= opts.rule.max);
        } else {
          return this[attr] && this[attr].length > 0 && opts.rule.max && !(this[attr].length <= opts.rule.max);
        }
      case 1:
        // 字符多选
        if(!opts.isRequired) return false;
        if ((opts.dataType === 3 || opts.dataType === 7) && opts.rule.operator === '多选') {
          return !this[attr].length;
        }
        return !this[attr];
      case 2:
        if (opts.dataType === 9) {
          // 商品
          return this[attr] && opts.count && opts.rule.min && !(opts.count >= opts.rule.min);
        } else {
          return this[attr] && this[attr].length > 0 && opts.rule.min && !(this[attr].length >= opts.rule.min);          
        }
      }
  }

  // 自定义验证是否通过
  this.isInvalid = function () {
    for (var i = 0, len = this.marketArrary.length; i < len; i++) {
      var item = this.marketArrary[i];
      var code = item['code'];
      if (item.isRequired && !item.isDisabled && (!this[code] || (Object.prototype.toString.call(this[code]) === '[object Array]' && !this[code].length)) ) {
        // 验证不通过
        console.log('验证不通过');
        return true;
      }
      // 多选
      if ((item.dataType === 3 || item.dataType === 7) && item.rule.operator === '多选' 
          && (
            (this[code] && this[code].length > 0 && item.rule.max && !(this[code].length <= item.rule.max))
            || (this[code] && this[code].length > 0 && item.rule.min && !(this[code].length >= item.rule.min))
          )
      ) {
        console.log('验证不通过');
        return true;
      }
      // 商品选择
      if (item.dataType === 9 
          && (
            (this[code] && item.count && item.rule.max && !(item.count <= item.rule.max))
            || (this[code] && item.count && item.rule.min && !(item.count >= item.rule.min))
          )
      ) {
        return true;
      }
    }

    return false;
  }

  // 审批人
  this.investigatorMapping = {
    valueField: 'id',
    displayField: 'fullView'
  }

  // 活动分类
  this.program = function (code) {
    getListService.getProgramList(function (data) {
      var ele = $('[name="program"]');
      var $selContent = ele.siblings(".selectContent");
      $selContent.children().remove();
      var $ul = $("<ul>", {
        "class": "ztree"
      });
      $selContent.append($ul);
      if (data) {
        function onClick(event, treeId, treeNode) {
          ele.val(treeNode.name);
          ele.attr("valueId", treeNode.id);
          $selContent.slideUp(200);
          _this[code] = treeNode.name;
          _this.progNameId = treeNode.id;
          $scope.$apply();
        }

        var setting = {
          data: {
            key: {
              title: "name"
            },
            simpleData: {
              enable: true
            }
          },
          view: { //设置多级样式
            //dblClickExpand: false,父级双击不可点击
            addDiyDom: function (treeId, treeNode) {
              var spaceWidth = 10;
              var switchObj = $("#" + treeNode.tId + "_switch"),
                icoObj = $("#" + treeNode.tId + "_ico");
              switchObj.remove();
              icoObj.before(switchObj);
              var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
              switchObj.before(spaceStr);
            }
          },
          callback: {
            onClick: onClick
          }
        };
        $.fn.zTree.init($ul, setting, data);
      }
    });
  }

  // 商品选择
  this.editorProducts = function (data) {
    // if (data.isDisabled) return ture;
    var self = this;
    this.bindings = {};
    var a = {
      chooseId: data.storeId || '',
      code: "SellerCode",
      enableMultiple: false,
      length: 0,
      range: 2,
      resourceName: "sellerCode",
      sideFlag: true
    };
    console.log(data);
    selectorProduct({
      type: 'product',
      disable: data.isDisabled ,// this.navName !== 'create' && this.navName !== 'edit',
      title: '商品选择器',
      bindings: Object.assign({}, self.bindings[a.code], {cid: a.chooseId}, {sideFlag: a.sideFlag}, {segmentationId: data.segmentationId}, {platCode: data.platCode}),
      onDone: function(bindings, changed) {
       console.log(bindings);
       data.storeId = bindings.cid || '';
       data.count = bindings.items.length || 0;
       _this[data.code] = (bindings.items && bindings.items.length) ? '已选' + bindings.items.length + '件商品' : '';
      }
     });
  }

  this.getDate = function () {
    var request = {
      tenantId: CAMPAIGN_STATIC.tenantId,
      extInfo: []
    };
    angular.forEach(this.marketArrary, function (item) {
      var extData = {
        id: item.id,
        seq: item.seq,
        name: item.fieldName.replace(/:$/, ''),
        type: item.dataType
      }

      // 自定义类型
      if (item.status === 2 || item.status === 3) {
        if ((item.dataType === 3 || item.dataType === 7)) {
          var dataMap = {
            value: _this[item.id]
          };

          if (item.rule.operator === '多选' &&  _this[item.id]) {
            dataMap.display =  _this[item.id].length > 0 ? '已选择' + (_this[item.id] && _this[item.id].length) + '项' : '';
            dataMap.value =  _this[item.id].join(',')
          }

          if (item.dataType === 7 && item.rule.operator === '单选') {
            var curItem = item.list.find(function(i) {
              return i.id === _this[item.id];
            })
            dataMap.display = curItem && curItem.name;
          }
          extData.value = JSON.stringify(dataMap);
        } else if (item.dataType === 9) {
        // 商品
          extData.value = JSON.stringify({
            value: item.storeId,
            display: _this[item.id],
            ext: item.count
          })
        }else {
          extData.value = _this[item.id];
        }
      } else {
        if (item.code === 'classificationId') {
          request[item.code] = _this.progNameId;
        } else if (item.code === 'campName') {
          request[item.code] = _this[item.code].replace(/\s+/g, "");
        } else if (item.code === 'investigatorId') {
          request[item.code] = _this[item.code] * 1;
        } else {
          request[item.code] = _this[item.code];
        }
        
        extData.value = request[item.code];
      }
      request.extInfo.push(extData);
    });
    return request;
  }

  var errorTips = null;
  var noMoreSubmit = true;
  this.ok = function () {
    this.invalidBegin = true;
    $ccValidator.validate(this.createMaketLayer).then(function () {
      if (!noMoreSubmit) {
        return;
      }
      if (_this.isInvalid()) return false;
      noMoreSubmit = false;
      console.log(_this.getDate());
      var requestData = _this.getDate();
      // 活动模板
      if(_this.templateId) {
        requestData.templateId = _this.templateId;
      }

      if (_this.curCampaignId) {
        MarketResource.Marketing.update({id: _this.curCampaignId}, requestData, function (response) {
          noMoreSubmit = true;
          modalInstance.ok(response);
        }, function (data) {
          noMoreSubmit = true;
          if (!errorTips || !errorTips.element) {
            errorTips = $ccTips.error(data.data.message, $element[0].querySelector('.modal-body'));
          }
        }) 
      } else {
        MarketResource.Marketing.save(requestData, function (response) {
          noMoreSubmit = true;
          modalInstance.ok(response);
        }, function (data) {
          noMoreSubmit = true;
          if (!errorTips || !errorTips.element) {
            errorTips = $ccTips.error(data.data.message, $element[0].querySelector('.modal-body'));
          }
        })           
      }
    });
  }
}]);