var dataManageDirectives = angular.module('dataManage.directives', []);

//模拟select框
/*自定义属性指令 start*/
dataManageDirectives.directive({
  "ngDataDeleteAttr": ["ngCustomService",
    function(ngCustomService) {
      return function(scope, element, attr) {
        var refresh = scope.$eval(attr.ngDataDeleteAttr);
        element.bind({
          "click": function() {
            // var $tr = element.closest("tr");
            // var rec = $tr.data('rec');
            var rec = scope.entity;
            var campId = rec.propertyId;
            var campName = rec.name;
            var campStatus = rec.state;
            var isOpen = false;
            var isExecute = false;
            if (!isOpen && !isExecute) {
              $(this).Confirm({
                "title": "确认删除",
                "str": "删除客户标签时会将所有客户的该标签值一起删除，确定要删除吗？",
                "mark": true
              }, function() {
                ngCustomService.deleteAttr(campId, function(data) {
                  // $tr.detach();
                  $(this).yAlert({
                    "text": "删除成功"
                  });
                  removeAlert();
                  refresh();
                });
              })
            }
          }
        })
      };
    }],
  "ngDataDeleteRed": ["deleteService",
    function(deleteService) {
      return function(scope, element) {
        element.bind({
          "click": function() {
            var $tr = element.closest("tr");
            var rec = $tr.data('rec');
            var campId = rec.campId;
            var campName = rec.campName;
            var campStatus = rec.status;
            var isOpen = false;
            var isExecute = false;
            if (!isOpen && !isExecute) {
              $(this).Confirm({
                "title": "确认删除",
                "str": "删除自定义属性时会将所有客户的该属性值一起删除，确定要删除吗？",
                "mark": true
              }, function() {
                deleteService.deleteRedList(campId, function(data) {
                  $tr.detach();
                  $(this).yAlert({
                    "text": "删除成功"
                  });
                  removeAlert();
                });
              })
            }
          }
        })
      };
    }],
  "ngDataChangeStatus": ["ngCustomService", "$ccModal",
    function(ngCustomService, $ccModal) {
      return function(scope, element, attr) {
        var refresh = scope.$eval(attr.ngDataChangeStatus);
        element.bind({
          "click": function() {
            var rec = scope.entity;
            var campId = rec.propertyId;
            var campName = rec.name;
            var campStatus = rec.status;
            var modalInstance = $ccModal.confirm('确认要' + (campStatus ? '禁用': '启用') + campName +'吗？', function() {
              console.log('close');
            });
            modalInstance.open().result.then(function() {
              ngCustomService.changeStatus(campId, function() {
                $(this).yAlert({
                  "text": (campStatus ? '禁用': '启用') + '成功'
                });
                removeAlert();
                refresh();
              }, campStatus);
            }, function() {
            });
            // var $tr = element.closest("tr");
            // var rec = $tr.data('rec');
          }
        })
      };
    }],
  //搜索
  "ngDataGridSearch": function() {
    return function(scope, element, attr) {
      var attrs = attr.ngGridSearch;
      element.bind({
        "click": function() {
          element.closest(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (angular.element(".commSearchVal").val() == "") {
            element.closest(".commSearch").find(".default_color").show();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = "";
        }
      });
      if (attrs != "attr") {
        scope.$watch("hdValue", function(newVal, oldVal) {
          //var blurGridElement=angular.element("#configAttrGrid")[0];
          if (!newVal) {
            element.closest(".commSearch").find(".default_color").show();
          } else {
            element.closest(".commSearch").find(".default_color").hide();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = newVal;
        });
      } else {
        scope.$watch("searchAttrVal", function(newVal, oldVal) {
          var blurGridElement = angular.element("#attrListsGrid")[0];
          if (!newVal) {
            element.closest(".commSearch").find(".default_color").show();
          } else {
            element.closest(".commSearch").find(".default_color").hide();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = newVal || "";
        });
      };
    }
  },
  "ngDataHandleValues": ["$compile",
    function($compile) {
      return {
        "controller": ["$scope", "ngCustomService",
          function($scope, ngCustomService) {
            $scope.unDeleteValue = false;
            $scope.addSelectValues = function() {
              $scope.unDeleteValue = false;
              $scope.errorStatus = true;
              if (!$scope.curEditorValue || $scope.curEditorValue == "") {
                $scope.errorStatus = false;
                $scope.errorFont = "不能为空";
              };
              angular.forEach($scope.selectValuesLists, function(val, key) {
                  if (val == $scope.curEditorValue) {
                    $scope.errorStatus = false;
                    $scope.errorFont = "不可重名";
                  }
                  if (($scope.curEditorValue && $scope.customObj.curStoreType.value == 2 && (val * 1 == $scope.curEditorValue))) {
                    $scope.errorStatus = false;
                    $scope.errorFont = "不可重复";
                  }
                });
              if ($scope.curEditorValue && $scope.customObj.curStoreType.value == 2) {
                var validateReg = /^\d{0,9}(\.\d{1,2})?$/;
                var reg = /^\./;
                if (! (validateReg.test($scope.curEditorValue))) {
                  $scope.errorStatus = false;
                  $scope.errorFont = "请输入正确的数字";
                }
                if( reg.test($scope.curEditorValue) ){
                  $scope.errorStatus = false;
                  $scope.errorFont = "请输入正确的数字";
                }
              } else if ($scope.curEditorValue && $scope.customObj.curStoreType.value == 0) {
                if ($scope.curEditorValue.length > 20) {
                  $scope.errorStatus = false;
                  $scope.errorFont = "请输入正确的值";
                } else if (/\s/g.test($scope.curEditorValue)) {
                  $scope.errorStatus = false;
                  $scope.errorFont = "请输入正确的值，不能包含空格";
                }
              };
              if ($scope.errorStatus) {
                $scope.selectValuesLists.push($scope.curEditorValue);
              }
              $scope.curEditorValue = "";
            };
            $scope.deSelectValues = function(i) {
              if ($scope.customObj.curAttrId != "") { // 编辑删除值需要后台请求验证
                var deleteSendObj = {
                  id: $scope.customObj.curAttrId,
                  value: $scope.selectValuesLists[i]
                }
                ngCustomService.deleteSelectedValues(function(response) {
                  if (response) {
                    $scope.selectValuesLists.splice(i, 1);
                    $scope.unDeleteValue = false;
                  } else {
                    $scope.unDeleteValue = true;
                  }
                }, deleteSendObj);
              } else {
                $scope.selectValuesLists.splice(i, 1);
              }
            }
            $scope.subMitValues = function() {
              $scope.selectValuesPopFalg = false;
              $scope.errorStatus = true;
              $scope.curEditorValue = "";
              $scope.customObj.selectValues = $scope.selectValuesLists.join(",");
              $scope.selectValuesFlag = $scope.customObj.selectValues ? false: true;
            }
          }],
        "link": function(scope, element, attr, ctrl) {
          var $tempDiv = angular.element("<div class='selectValuesPop selectFontsClass' ng-show='selectValuesPopFalg'><div class='commSanjiao'></div><p class='editorPBox'><button class='commAddEventBtn' type='button' ng-click='addSelectValues()'>添加</button><em class='ico_tips' dm-title='{{selectValuesTips}}'></em><label class='error domBlock' ng-show='!errorStatus'>{{errorFont}}</label></p><ul class='clearfix'><li ng-repeat='selectValuesList in selectValuesLists' title='{{selectValuesList}}'><span>{{selectValuesList}}</span><a class='deleteImg' href='javascript:void(0)' title='删除' ng-click='deSelectValues($index)'><img ng-src='/ccms/images/deletex.png' width='10' height='10' /></a></li></ul><p class='mt10 ml5'><button class='btn btnBlue commSmallBtn' type='button' ng-click='subMitValues()'>确定</button><label class='error' ng-show='unDeleteValue' >当前值不可删除</label></p></div>");
          angular.element(".relativeLi").append($tempDiv);
          $compile($tempDiv)(scope);
          element.bind("click", function() {
            var inpitElement;
            scope.curEditorValue = "";
            scope.unDeleteValue = false;
            scope.$apply(function() {
              scope.selectValuesPopFalg = true;
              if (scope.customObj.curStoreType.value == 2) {
                scope.selectValuesTips = "输入范围0-999999999.99";
                inpitElement = "<input class='borderHighlight mr5' ng-model='curEditorValue' />";
              } else {
                scope.selectValuesTips = "输入长度不能超过20";
                inpitElement = "<input class='borderHighlight mr5' ng-model='curEditorValue' dm-input-normal-name='true' />";
              }
              angular.element(".selectValuesPop .commAddEventBtn").siblings(".borderHighlight").remove().end().before(inpitElement);
              $compile($tempDiv.find(".borderHighlight"))(scope);
            });
          })
        }
      }
    }],
  /*红名单表格列表单行删除 Added By 茅丹丹2014-3-17*/
  "ngDataRedDeleteAttr": ["ngRedAndBlackCustomService",
    function(ngRedAndBlackCustomService) {
      return function(scope, element) {
        element.bind({
          "click": function() {
            var $tr = element.closest("tr");
            var title = element.attr("title");
            var rec = $tr.data('rec');
            var campId = rec.checklistId;
            var campName = rec.name;
            var campStatus = rec.status;
            var isOpen = false;
            var isExecute = false;
            if (!isOpen && !isExecute) {
              $(this).Confirm({
                "title": "确认删除",
                "str": "你确定" + title + "吗",
                "mark": true
              }, function() {
                ngRedAndBlackCustomService.deleteRedAndBlackCustomById(function(response) {
                  $tr.detach();
                  $(this).yAlert({
                    "text": "删除成功"
                  });
                  removeAlert();
                }, campId);
              })
            }
          }
        })
      };
    }],
  /*红名单表格搜索 Added By 茅丹丹2014-3-17*/
  "ngDataRedGridSearch": function() {
    return function(scope, element, attr) {
      var attrs = attr.ngRedGridSearch;
      element.bind({
        "click": function() {
          element.closest(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (angular.element(".commSearchVal").val() == "") {
            element.closest(".commSearch").find(".default_color").show();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = "";
        }
      });
      if (attrs != "attr") {
        scope.$watch("hdValue", function(newVal, oldVal) {
          //var blurGridElement=angular.element("#configAttrGrid")[0];
          if (!newVal) {
            element.closest(".commSearch").find(".default_color").show();
          } else {
            element.closest(".commSearch").find(".default_color").hide();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = newVal;
        });
      } else {
        scope.$watch("searchAttrVal", function(newVal, oldVal) {
          var blurGridElement = angular.element("#attrListsGrid")[0];
          if (!newVal) {
            element.closest(".commSearch").find(".default_color").show();
          } else {
            element.closest(".commSearch").find(".default_color").hide();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = newVal || "";
        });
      };
    }
  },
  /*红名单表格分组筛选 Added By 茅丹丹2014-3-17*/
  "redDataGroupSelector": ["$compile",
    function($compile) {
      return {
        controller: ["$scope",
          function($scope) {
            $scope.redGroupClick = function(event) {
              var value = event.target.textContent || event.target.innerHTML;
              if (value) {
                $scope.redGroupText = value;
                $scope.redGroupValue = $scope.groups[value];
              }
              var id = $(event.target).attr("var");
              $scope.gridObj.changeActivityByGroupId(id);
            }
          }],
        template: '<div class="type_selector"><div class="ac_status_selector ac_status ac_status_A0">{{redGroupText}}<a ></a></div>' + '<div class="select_wrap groups_selector"><div class="select_item" ng-repeat="group in groups" ng-click="redGroupClick($event)" title={{group.groupName}} var="{{group.groupId}}">{{group.groupName}}</div></div> </div>',
        link: function(scope, elem, attrs) {
          var list = elem.find(".select_wrap");
          list.hide();
          var inputs = elem.find(".ac_status_selector");
          elem.on('mouseenter', function() {
            list.show();
            scope.InitHeight();
            inputs.addClass('ac_status_selector_hover');
          }).on('mouseleave', function() {
            list.hide();
            inputs.removeClass('ac_status_selector_hover');
          });

          scope.redGroupText = "请选择分组";
          scope.redGroupValue = "";

          scope.$watch("redStatusValue", function(type) {
            if (type) {
              inputs[1].className = inputs[1].className.replace(/[AB]\d/, type);
            }
          });
          list.find('div').on("click", function(event) {
            var value = event.target.textContent || event.target.innerHTML;
            if (value) {
              scope.redStatusText = value;
              scope.redStatusValue = scope.groups[value];
              scope.$digest();
            }
            list.hide();
          });
        }
      };
    }],
  /*红名单平台搜索 Added By 茅丹丹2014-3-17*/
  "platDataSelector": ["$compile", "$http",
    function($compile, $http) {
      return {
        controller: ["$scope",
          function($scope) {
            $scope.subjectClick = function(event) {
              var value = event.target.textContent || event.target.innerHTML;
              if (value) {
                $scope.subjectStatusText = value;
                $scope.subjectStatusValue = $scope.subjects[value];
              }
              var id = $(event.target).attr("var");
              $scope.gridObj.changeActivityByPlat(id);
            }
          }],
        template: '<div class="type_selector plats_selector"><div class="ac_status_selector ac_status ac_status_A0">{{subjectStatusText}}<a ></a></div>' + '<div class="select_wrap"><div class="select_item" ng-repeat="subject in subjects" ng-click="subjectClick($event)" var="{{subject.subjectId}}">{{subject.subjectId}}</div></div> </div>',
        link: function(scope, elem, attrs) {
          var list = elem.find(".select_wrap");
          list.hide();
          var inputs = elem.find(".ac_status_selector");
          elem.on('mouseenter', function() {
            list.show();
            inputs.addClass('ac_status_selector_hover');
          }).on('mouseleave', function() {
            list.hide();
            inputs.removeClass('ac_status_selector_hover');
          });
          scope.subjectStatusText = "请选择主题";
          scope.subjectStatusValue = "";
          scope.$watch("subjectStatusValue", function(type) {
            if (type) {
              inputs[1].className = inputs[1].className.replace(/[AB]\d/, type);
            }
          });
          list.find('div').on("click", function(event) {
            var value = event.target.textContent || event.target.innerHTML;
            if (value) {
              scope.platStatusText = value;
              scope.platStatusValue = $scope.subjects[value];
              scope.$digest();
            }
            list.hide();
          });
        }
      };
    }]
});

dataManageDirectives.directive("ngDataUploadFile",
  function() {
    return {
      link: function(scope, element, attr) {
        var defaultOrigin = location.protocol + "//" + location.host;
        var JSESSIONID_temp = window.sessionStorage.getItem('JSESSIONID') || '';
        var tenantId_temp = window.sessionStorage.getItem('tenantId') || '';
        var username_temp = window.sessionStorage.getItem('username') || '';
        var userId_temp = window.sessionStorage.getItem('userId') || '';
        var uploaderParam = "?JSESSIONID=" + JSESSIONID_temp + "&tenantId=" + tenantId_temp + "&username=" + username_temp + "&userId=" +  userId_temp;
        var uploader = new plupload.Uploader({
          runtimes : 'html5,flash,silverlight,html4',
          headers : {
            'X-TOKEN': GLOBAL_STATIC.Credentials.access_token,
            'Authorization': 'Bearer ' + GLOBAL_STATIC.Credentials.access_token
          },
          browse_button : 'portUpLoadFile',
          url : GLOBAL_STATIC.datamanageRoot + 'files/upload/' + uploaderParam,
          multi_selection: false,
          unique_names : true,
          file_data_name: 'Filedata',
          filters:{
            max_file_size:'8mb',
            mime_types : [
              {title : "Text files", extensions : "txt"},
              {title : "Csv files", extensions : "csv"}
            ]
          },
          init:{
            BeforeUpload:function(up, file){
              scope.stepOne.upFileWarningFlag = false;
              scope.stepOne.upFileWarningText = '';
              angular.element(".loadingPosition").removeClass("domNone");
              $("#portUpLoadFile").val(file.name)
              //angular.element('#portUpLoadFile').uploadify('settings', 'buttonText', files.name);
            },
            FilesAdded:function(up, files){
              uploader.start();
            },
            FileUploaded:function(up, file,responseObject){
              scope.fileId = JSON.parse(responseObject.response).fileId;
              angular.element(".loadingPosition").addClass("domNone");
              scope.stepOne.checkFile();
              scope.prevSpaF = true;
              scope.$apply();
            },
            Error:function(up,errObject){
              angular.element(".loadingPosition").addClass("domNone");
              scope.$apply(function() {
				if( errObject.status != 400 ){
					scope.stepOne.upFileWarningText = errObject.status;
                	scope.stepOne.upFileWarningFlag = true;
				}
              });
            }
          }
        })
        uploader.init()

        /*element.uploadify({
          'buttonClass': 'uploadify_input_style',
          'method': "post",
          'swf': defaultOrigin + GLOBAL_STATIC.rootModule + '/components/uploadify/uploadify.swf',
          'uploader': GLOBAL_STATIC.componentRoot + 'files/upload/' + uploaderParam,
          'buttonText': '上传文件',
          'fileSizeLimit': '8MB',
          'width': '243',
          'height': '20',
          'overrideEvents': ['onDialogClose', 'onSelect', 'onUploadSuccess', 'onSelectError'],
          'float': 'left',
          'fileTypeExts': '*.csv; *.txt',
          'successTimeout': '120',
          "onUploadStart": function(file) {
            scope.$parent.stepOne.upFileWarningFlag = false;
            scope.$parent.stepOne.upFileWarningText = '';
            angular.element(".loadingPosition").removeClass("domNone");
            angular.element('#portUpLoadFile').uploadify('settings', 'buttonText', file.name);
          },

          'onCancel': function(file) {
            alert('The file ' + file.name + ' was cancelled.');
          },

          'onUploadSuccess': function(file, data, response) {
            scope.$parent.fileId = JSON.parse(data).fileId;
            angular.element(".loadingPosition").addClass("domNone");
            scope.$parent.stepOne.checkFile();
            scope.$parent.prevSpaF = true;
            scope.$parent.$apply();
          },

          'onUploadError': function(file, errorCode, errorMsg, errorString) {
            scope.$apply(function() {
              scope.matchFileUploadFlag = true;
              scope.uploadErrorInfo = errorMsg;
            });
          }
        });*/
      }
    };
  }
);
/*自定义属性指令 end*/
dataManageDirectives.directive("ngDataSearcheffect",
  function() {
    return function(scope, element, attr) {
      var blurGridElement = angular.element("#RFMResults")[0];
      //blurGridElement.p.query = "";
      element.bind({
        "click": function() {
          element.closest(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (angular.element(".commSearchVal").val() == "") {
            element.closest(".commSearch").find(".default_color").show();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = "";
        }
      });
      scope.$watch("hdValue", function(newVal, oldVal) {
        if (!newVal) {
          element.closest(".commSearch").find(".default_color").show();
        }
        //blurGridElement.p.qtype = "keywords";
        //blurGridElement.p.query = newVal || "";
      });

    };
  }
);
//对html number 类型的分装
dataManageDirectives.directive('ngDataNumber',
  function() {
    return {
      restrict: 'EA',
      transclude: true,
      link: function(scope, element, attrs, $compile, $parse) {
        var $upHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_up\" ng-click=\'up()\' ></span>');
        var $downHtml = $('<span onselectstart="return false" onselect="document.selection.empty()" class=\"num_down\" ng-click=\'down()\'></span>');
        var upHtml = '<span class=\"spanClass\" style=\"position: relative;display: inline-block;\">';
        var min = attrs.min || 0;

        var max = attrs.max || 9999;
        var storeValue = scope.$eval(attrs.ngModel);
        //  var fn = $parse(attrs['ngNumber']);
        element.wrap(upHtml);
        element.after($upHtml);
        element.after($downHtml);
       /* scope.$watch(parseInt(scope.$eval(attrs.ngModel)), function() {
          if (parseInt(scope.$eval(attrs.ngModel)) == max) {
            element.next().next().addClass("num_up_hover").removeClass("num_up");
          }
          if (parseInt(scope.$eval(attrs.ngModel)) == min) {
            element.next().addClass("num_down_hover").removeClass("num_down");
          }
        });*/

        //只对输入时添加数字验证，删除数字不验证
        element.on("input", function(evt) {
          var reg = /[^\d]/;
          var regD = /\d+/;
          var viewValue = $.trim(evt.target.value);
          var ary = attrs.ngModel.split('.');
          scope.$apply(function() {
            //如果输入的时候输入了非数字的格式，则截取前面为数字的部分,
            if (reg.test(viewValue)) {
              scope[ary[0]][ary[1]][ary[2]] = (regD.exec(viewValue) || [])[0] - 0;
            } else if (viewValue - 0 > max) {
              scope[ary[0]][ary[1]][ary[2]] = viewValue.slice(0, viewValue.length - 1) - 0;
            }
          });
        });
        //如果为空，设置为最小值
        //fixed 不能删除bug
        element.on("blur",
          function(evt) {
            var viewValue = $.trim(evt.target.value);
            var ary = attrs.ngModel.split('.');
            if (attrs.ngNumber == "empty" && !viewValue) {
              return
            };
            if (viewValue < min || !viewValue) {
              scope.$apply(function() {
                scope[ary[0]][ary[1]][ary[2]] = min;
              });
            }
          });
          $upHtml.click(function() {
            if (element[0].disabled) {
              return
            }
            scope.$apply(function() {
              var ary = attrs.ngModel.split('.');
              if (parseInt(scope.$eval(attrs.ngModel)) < max) {
                scope[ary[0]][ary[1]][ary[2]] = parseInt(scope.$eval(attrs.ngModel)) + 1;

                //element.next().addClass("num_down").removeClass("num_down_hover");

              } else {
                scope[ary[0]][ary[1]][ary[2]] = max;
                //element.next().next().addClass("num_up_hover").removeClass("num_up");
              }
            }
          )
        }).mousemove(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
              //$(this).addClass("num_up_hover").removeClass("num_up");
            }
          }
        }).mouseout(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
              //$(this).addClass("num_up").removeClass("num_up_hover");
            }
          }
        });
        $downHtml.click(function() {
          if (element[0].disabled) {
            return;
          }
          scope.$apply(function() {
            var ary = attrs.ngModel.split('.');
            if (parseInt(scope.$eval(attrs.ngModel)) > min) {
              scope[ary[0]][ary[1]][ary[2]] = parseInt(scope.$eval(attrs.ngModel)) - 1;
              //element.next().next().addClass("num_up").removeClass("num_up_hover");
            } else {
              scope[ary[0]][ary[1]][ary[2]] = min;
              //element.next().addClass("num_down_hover").removeClass("num_down");
            }
          })
        }).mousemove(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
             // $(this).addClass("num_down_hover").removeClass("num_down");
            }
          }
        }).mouseout(function(e) {
          if (!element[0].disabled) {
            if (parseInt(scope.$eval(attrs.ngModel)) != max && parseInt(scope.$eval(attrs.ngModel)) != min) {
              //$(this).addClass("num_down").removeClass("num_down_hover");
            }
          }
        });
      }
    }
  }
);
dataManageDirectives.directive("ngDataSearchresultseffect",
  function() {
    return function(scope, element, attr) {
      var blurGridElement = angular.element("#customerRFMResults")[0];
      //blurGridElement.p.query = "";
      element.bind({
        "click": function() {
          element.parent(".commSearch").find(".default_color").hide().end().find(".commSearchVal").focus();
        },
        "keyup": function() {
          scope.$apply();
        },
        "blur": function() {
          if (angular.element(".commSearchVal2").val() == "") {
            element.parent(".commSearch").find(".default_color").show();
          }
          //blurGridElement.p.qtype = "keywords";
          //blurGridElement.p.query = "";
        }
      });
      scope.$watch("hdValue", function(newVal, oldVal) {
        if (!newVal) {
          element.parent(".commSearch").find(".default_color").show();
        }
        //blurGridElement.p.qtype = "keywords";
        //blurGridElement.p.query = newVal || "";
      });

    };
  }
);
//节点子弹框取消事件
dataManageDirectives.directive("ngCloseChildWindowData", function() {
  return {
    scope: {
      data: '=',
      maxLength: "@"
    },
    link: function (scope, element, attrs) {
      element.bind("click", function () {
        if (scope.data && scope.data.length > scope.maxLength) {
          return '保存失效'
        }
        element.closest(".ccmsPublicPop").hide();
        if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
          if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
            if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
              element.closest(".commCustomConfigBox").find(".childElementMark").remove(); //class commCustomConfigBox 自定义属性 专属class
            }
          } else {
            angular.element(".ccmsPublicPop").find(".childElementMark").remove();
          }
        } else {
          angular.element(".yunat_maskLayer:last").remove();
        }
      });
    }
  }
});
dataManageDirectives.directive('dataCustomer', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datepicker({
        showSecond: false,
        changeMonth: true,
        changeYear: false,
        showYear: false,
        showHeaderButton: false,
        dateFormat: "mm-dd",
        defaultDate: new Date(2000, 0, 1),
        // 设置二月份为29天
        yearRange: "-114:+10",
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        onSelect: function(dateText) {
          var defaultEndTime = $("[name='startTime']").val() || "";

          $("[name='startTime']").datepicker("option", "defaultDate", "2000-" + dateText);
          $("[name='startTime']").val(defaultEndTime);
          $parse(attrs.ngModel).assign(scope, dateText);

        }
      });
    }
  }]);
dataManageDirectives.directive('ngDataCustomer', ['$parse',
  function($parse) {
    return function(scope, element, attrs) {
      element.datepicker({
        showSecond: false,
        changeMonth: true,
        changeYear: false,
        showYear: false,
        showHeaderButton: false,
        dateFormat: "mm-dd",
        defaultDate: new Date(2000, 0, 1),
        // 设置二月份为29天
        yearRange: "-114:+10",
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        onSelect: function(dateText) {
          var defaultEndTime = $("[name='startTime']").val() || "";

          $("[name='startTime']").datepicker("option", "defaultDate", "2000-" + dateText);
          $("[name='startTime']").val(defaultEndTime);
          $parse(attrs.ngModel).assign(scope, dateText);

        }
      });
    }
  }]);
dataManageDirectives.directive("ngDataChoseUnit",
  function() {
    return function(scope, element, attrs) {
      element.bind("click", function() {
        if (attrs.ngDataChoseUnit == "Radio") { // 单选
          element.siblings("li").removeClass("cur");
        }
        if (attrs.required) { //必选
          element.addClass("cur");
        } else {
          element.toggleClass("cur");
        }
      });
    }
  }
);
//商品标签directive
dataManageDirectives.directive({
  "ngDataDeleteLabel": ["productLabelService",
    function(productLabelService) {
      return function(scope, element, attr) {
        element.bind({
          "click": function() {
            var $tr = element.closest("tr");
            var rec = $tr.data('rec');
            var campId = rec.tagId;
            var usedCount = rec.productCount;
            if (!usedCount || usedCount * 1 == 0) {
              msg = "是否确定删除？"
            } else {
              msg = "有" + usedCount + "个商品正在使用当前标签，如果删除标签，将会同时清除这些商品上的对应标签,是否确定要删除？";
            }
            $(this).Confirm({
              "title": "确认删除",
              "str": msg,
              "mark": true
            }, function() {
              productLabelService.deleteLabel(function(data) {
                  $tr.detach();
                  $(this).yAlert({
                    "text": "删除成功"
                  });
                  removeAlert();
                }, campId);
            })
          }
        })
      };
    }],
  "ngDataInitSelect": function() {
    return function(scope, element, attrs) {
      var $a = $("<a>").css({
        "width": 15,
        "height": 23,
        "display": "inline-block",
        "position": "absolute",
        "background": "url(/ccms/images/arrows_w10.png) no-repeat 0 0"
      });
      element.after($a);
      var left = element.position().left;
      var top = element.position().top;
      var eleWidth = element.outerWidth();
      var eleHeihgt = element.outerHeight();
      var arrowsWidth = left + eleWidth - 17.55;
      var arrowsHeight = top + (eleHeihgt - 23) / 2;
      $a.css({
        "left": arrowsWidth,
        "top": arrowsHeight
      });
      var $div = $("<div>", {
        "class": "selectContent"
      }).css({
        "display": "none",
        "position": "absolute",
        "border": "1px solid #CCC",
        "background": "#fff",
        "overflow-x": "hidden",
        "zIndex": 2
      });
      element.after($div);
      var divWidth = element.innerWidth();
      var divLeft = left + parseInt(element.css("marginLeft"));
      var divTop = top + eleHeihgt;
      $div.css({
        "width": divWidth,
        "max-height": 200,
        "left": divLeft - 1,
        "top": divTop,
        "overflow-y": "auto",
        "overflow-x": "hidden"
      });
      element.click(function() {
        scope.$apply(function() {
          scope.$eval(attrs.ngInitSelect);
        });
        $div.slideToggle(200);
      });
      $a.click(function() {
        var selectButtonStatus = scope.$eval(attrs.ngDisabled);
        if (!selectButtonStatus) {
          scope.$apply(function() {
            scope.$eval(attrs.ngInitSelect);
          });
          $div.slideToggle(200);
        }
      });
      $div.on("mouseleave", function() {
        $(this).html("").slideUp(200);
        element.on("blur", function() {
          $div.html("").slideUp(200);
        })
      });
      $div.on("mouseenter", function() {
        element.off('blur');
      });
      element.on("blur", function() {
        $div.html("").slideUp(200);
      })
    }
  }
});
