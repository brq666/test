//行为自定义 订单查询指令
(function(window, angular, undefined) {
  var app = angular.module('campaign.controllers');
  app.directive({
    "analysisTemplateInit": ['$compile', '$q', '$templateCache', 'getListService', '$parse','$timeout', function($compile,$q,$templateCache,getListService,$parse,$timeout){//初始化模板
      return {
        controller: ['$http', '$scope', '$sce',function($http,$scope,$sce){
          // 安全插入html
          $scope.deliberatelyTrustDangerousSnippet = function(snippet) {
              return $sce.trustAsHtml(snippet);
          };
          angular.forEach(analysisTemplates,function(val,key){//缓存模板
            $templateCache.put(val.customType, val.template);
          });
          var storeCustomScope=[],storeCustomIndicatorScope=[];
          $scope.isAnalysisToggleConditionsAreaShow=false; // 展开是否显示
          var _this=this;
          _this.createScope=function(data){//创建条件新scope，储存数据
            var newCustomScope=$scope.$new();
            newCustomScope.data=data;
            storeCustomScope.push(newCustomScope)
            return newCustomScope;
          };
          _this.createIndicatorScope=function(data){//创建指标新scope，储存数据
            var newCustomScope=$scope.$new();
            newCustomScope.data=data;
            storeCustomIndicatorScope.push(newCustomScope)
            return newCustomScope;
          };
          _this.setElementLayout=function(data,lay){
            //if(data.length<1){return false;}
            var curScopeData;
            for(var i=1;i<=15;i++){//循环设定位子
              var forEachFlag=false,curEleTemplate;
              angular.forEach(data,function(v,k){//定位Y轴
                if(v.posY==i){
                  forEachFlag=true;
                  curEleTemplate=$compile($($templateCache.get("analysis"+v.type)));
                  curScopeData=$.extend(true,{},v);
                  // 迪卡侬
                  curScopeData.platCode = $scope.analysisScopeObj.subjectCode;
                  return;
                }
              });
              if(!forEachFlag){
                curEleTemplate=$compile($($templateCache.get("analysisvisibility")));//占位子元素
                curScopeData=$.extend(true,{},{posY:i});
              };
              var layCurScope=_this.createScope(curScopeData);
              curEleTemplate(layCurScope,function(viewElement){//重新添加编译
                if(lay=="areaOne"){
                  angular.element(".conditionLayoutWidth45").append(viewElement);
                }else if(lay=="areaTwo"){
                  angular.element(".conditionLayoutWidth30").append(viewElement);
                }else if(lay=="areaThree"){
                  angular.element(".conditionLayoutWidth25").append(viewElement);
                }
              });
            }
          };
          _this.addCustomCondition=function(data){
            /*
            * 处理数据，转化成 {"areaOne":[{},{}],"areaTwo":[{},{}],"areaThree":[{},{}]}———分成三块（左、中、右）布局
            */
            var areaStoreBox={
              "areaOne":[],
              "areaTwo":[],
              "areaThree":[]
            };
            angular.forEach(data,function(val,key){//0-左边，1-中间，2—右边
              if(val.posX==0){
                areaStoreBox.areaOne.push(val);
              }else if(val.posX==1){
                areaStoreBox.areaTwo.push(val);
              }else if(val.posX==2){
                areaStoreBox.areaThree.push(val);
              }
              if(val.posY > 5){$scope.isAnalysisToggleConditionsAreaShow=true}
            });
            angular.forEach(areaStoreBox,function(data,layout){
              _this.setElementLayout(data,layout);
            });
          };
          /*获取scope数据start*/
          _this.getAllCustomDatas=function(){
            var customRequestObj={
              "attribute":[],
              "index":[]
            }
            //获取配置属性数据
            angular.forEach(storeCustomScope,function(custom,key){
              if(custom.data.name && custom.getCustomValue){//有配置才获取值、占位元素忽略
                var storeData={
                  "id":"",
                  "queryItemId":custom.data.queryItemId||"",
                  "type":custom.data.type,
                  "name":custom.data.name,
                  "posX":custom.data.posX,
                  "posY":custom.data.posY,
                  "configs":custom.data.configs
                };
                storeData.values=custom.getCustomValue();
                //storeData.data=custom.data;看保存的处理
                customRequestObj.attribute.push(storeData);
              };
            });
            return customRequestObj;
          };
          /*获取scope数据end*/
        }],
        link:function(scope,element,attr,ctrl){
            var defaultIndicatorLists='',defaultIndicatorId='';//储存指标list和默认指标id
          /*打开填充start*/
          $timeout(function(){
            ctrl.addCustomCondition(scope.analysisScopeObj.curSubjectAnalysisConfigConditions.attribute);
          })
          /*打开请求数据并填充end*/

          scope.getAllCustomDatas=function(){
            return ctrl.getAllCustomDatas();
          }
        }
      }
    }]
  });

  //类型指令
  app.directive({
    /*字符输入*/
    "analysisStringType": ['$compile', '$parse', function($compile,$parse){
      return {
        controller: ['$scope', function($scope){//$scope.data当前scope的数据
          $scope.customStringInput=$scope.data.values?$scope.data.values.value:"";
        }],
        link:function(scope,element,attr,ctrl){
          /*验证start*/
          //"StringSpecialValidator":[Email IdentityCard Mobile 不验证 ]
          scope.$watch('data.configs', function(val, oldVal){
            if(val == undefined) {
              return;
            }
            //增加限制条件
            var eleInput=element.find("input");
            var setConfig=scope.data.configs;
            if(setConfig.StringLengthLimit && setConfig.StringLengthLimit[0]){//设置长度
              eleInput.attr("maxLength",setConfig.StringLengthLimit[0]);
            };
            if(val.StringSpecialValidator && val.StringSpecialValidator[0]=="Email"){
              eleInput.attr("email",true);
            }else if(val.StringSpecialValidator && val.StringSpecialValidator[0]=="Mobile"){
              eleInput.attr({"phone":true,"number":true});
            }
          });
          /*验证end*/

          //获取每个scope的数据values
          scope.getCustomValue = function() {
            var value = {};
            value.value = scope.customStringInput;
            return value;
          };
        }
      }
    }],
    /*时间选择
    * $scope.numcount：月-max120，天—max3650，分-max6000
    */
    "analysisTimeType":function(){
      return {
        "controller": ['$scope', function($scope){
          //处理展示数据
          $scope.disponseTimeViewValue=function(val){
            var returnViewValue="";
            if(val.values.type == "absolutely" && val.values.value && !(/^,$/.test(val.values.value))){
              var valueAry=val.values.value.split(",");
              angular.forEach(valueAry,function(val,key){
                if(val==""){valueAry[key]="不限"};
              });
              returnViewValue=valueAry.join("~");
            }else if( val.values.type == "relatively" && val.values.interval && val.values.interval!=","){
              var aryOne,aryTwo,aryThree;
              var descriptionValue=val.values.direction;
              aryOne=val.values.interval.split(",");
              if(val.values.dimension=="月"){
                aryTwo = val.values.day ? val.values.day.split(",") : [];
                aryThree =  val.values.time ? val.values.time.split(",") : [];
                returnViewValue = (aryOne[0] ? (descriptionValue+aryOne[0]+"月"+aryTwo[0]+(aryTwo[0] ? ("号"+aryThree[0]) : "")) : "不限")+"~"+(aryOne[1] ? (descriptionValue+aryOne[1]+"月"+aryTwo[1]+(aryTwo[1] ? ("号"+aryThree[1]):"")) : "不限");
              }else if(val.values.dimension=="天"){
                aryTwo = val.values.time ? val.values.time.split(",") : [];
                returnViewValue = (aryOne[0] ? (descriptionValue+aryOne[0]+"天"+aryTwo[0]) :"不限")+"~"+(aryOne[1] ? (descriptionValue+aryOne[1]+"天"+aryTwo[1]) : "不限");
              }else if(val.values.dimension=="分钟"){
                returnViewValue = (aryOne[0] ? (descriptionValue+aryOne[0]+"分钟") : "不限")+"~"+(aryOne[1] ? (descriptionValue+aryOne[1]+"分钟") : "不限");
              }
            }
            return returnViewValue;
          };

          //点击触发默认数据填充
          $scope.initPlugDataValues=function(defalutDatas){
            var defaultVal =defalutDatas;
            angular.forEach($scope.timeTypeLists,function(val,key){
              if(val.type==defalutDatas.type){
                $scope.curTimeList = val;
              }
            });
            $scope.configType = "0";//默认前
            $scope.stringInput = defaultVal.value || "";
            if ($scope.curTimeList.type == "absolutely") {
              $scope.dateInput1 =	defaultVal.value.split(',')[0];
              $scope.dateInput2 = defaultVal.value.split(',')[1];
            } else if ($scope.curTimeList.type == "relatively") {
              var value = defaultVal;
              switch(value.dimension) {
                case '月':$scope.subType = '0';break;
                case '天':$scope.subType = '1';break;
                case '分钟':$scope.subType = '2';break;
              }
              $scope.configType=value.direction=="前" ? "0" : "1";
              $scope.monthOrDayOrSecondInput1 = value.interval.split(',')[0];
              $scope.monthOrDayOrSecondInput2 = value.interval.split(',')[1];
              if ($scope.subType == '0') {
                $scope.dayInput1 = value.day.split(',')[0];
                $scope.dayInput2 = value.day.split(',')[1]
                $scope.timeInput1 = value.time.split(',')[0];
                $scope.timeInput2 = value.time.split(',')[1];
                $scope.numcount=120;
              } else if ($scope.subType == '1') {
                $scope.timeInput1 = value.time.split(',')[0];
                $scope.timeInput2 = value.time.split(',')[1];
                $scope.numcount=3650;
              } else if ($scope.subType == '2') {
                $scope.numcount=6000;
              }
            }
          };

          $scope.timeTypeLists=[{"type":"absolutely","value":"绝对时间"},{"type":"relatively","value":"相对时间"}];
          $scope.isMid=true;//默认介于，共用时间插件判断
          $scope.isStartValidateWatch=false;//是否开始验证监听
          if(!$scope.data.values){//　增加 ||　编辑
            $scope.curTimeList=$scope.timeTypeLists[0];
            $scope.subType = '0';//相对时间,默认'月'
            $scope.configType = "0";//默认前
            $scope.dateInput1="";
            $scope.dateInput2="";
            $scope.totleTimeValue="";
            $scope.numcount=120; // 月设置最大输入
            $scope.getSaveDefaultDatas={
              "type":$scope.curTimeList.type,
              "value":""
            };
          }else{
            $scope.getSaveDefaultDatas=$scope.data.values;
            $scope.totleTimeValue=$scope.disponseTimeViewValue($scope.data);
          }


        }],
        "link":function(scope,element,attr,ctrl){
          //选择框改变
          scope.editorTimeConditions = function(){
            scope.isStartValidateWatch=false;
            if(scope.getSaveDefaultDatas && (scope.getSaveDefaultDatas.value!="")){ // 编辑
              scope.initPlugDataValues(scope.getSaveDefaultDatas);
              scope.errorFlagOne=false;
              scope.errorFlagTwo=false;
            }else{
              scope.curTimeList=scope.timeTypeLists[0];
              clearDate1();
              clearDate2();
            }
            element.find(".timeSetBox").addInteractivePop({magTitle:"请设置条件",width:300,height:210,mark:false,position:"fixed",childElePop:true});
          };


          //监听前后类型
          scope.$watch("configType",function(newVal,oldVal){
            if(oldVal!=undefined && oldVal != newVal){
              scope.errorFlagOne=false;
              scope.errorFlagTwo=false;
            }
          })

          //监听时间类型
          scope.$watch("curTimeList.type",function(newVal,oldVal){
            if(oldVal!=undefined && oldVal != newVal){
              if(newVal=="absolutely"){
                scope.subType = '0';
              }else if(newVal=="relatively"){
                scope.subType = '0';
                scope.numcount = 120;
              }
              clearDate2();
              clearDate1();
            }
          })
          //监听月,天,秒切换
          scope.$watch('subType', function(val, oldVal){
            if(oldVal != undefined && oldVal != val){
              clearDate2();
              switch(val){
                //设置输入框最大整数
                case '0': scope.numcount = 120;break;
                case '1': scope.numcount = 3650; break;
                case '2': scope.numcount = 6000;break;
              }
            }
          });

          //绝对时间清除操作
          function clearDate1() {
            scope.dateInput1 = '';
            scope.dateInput2 = '';
            scope.errorFlagOne=false;
            scope.errorFlagTwo=false;
            element.find(".absoluteInputClass").val("");
          }
          //相对时间清除操作
          function clearDate2() {
            scope.timeInput1 = '';
            scope.timeInput2 = '';
            scope.dayInput1 = '';
            scope.dayInput2 = '';
            scope.errorFlagOne=false;
            scope.errorFlagTwo=false;
            scope.errorInput1=false;
            scope.errorInput2=false;
            scope.errorInput3=false;
            scope.errorInput4=false;
            scope.errorInput5=false;
            scope.errorInput6=false;
            scope.monthOrDayOrSecondInput1 = '';
            scope.monthOrDayOrSecondInput2 = '';
          };
          //获取每个scope的数据values
          scope.getCustomValue = function() {
            return scope.getSaveDefaultDatas;
          };
          //获取已设置的条件
          scope.getSettingCustomValues=function(){
            var value = {};
            if(scope.curTimeList.type == "absolutely") {//根据global状态判断
              value.type="absolutely";
              value.value = scope.dateInput1 + ',' + scope.dateInput2;
            }else if(scope.curTimeList.type == "relatively"){
              value.type="relatively";
              value.direction=scope.configType=="0" ? "前" : "后";
              value.interval = scope.monthOrDayOrSecondInput1 + ',' + scope.monthOrDayOrSecondInput2;
              if(scope.subType == '0') {
                value.dimension = '月';
                value.day = scope.dayInput1  + ',' + scope.dayInput2;
                value.time =  scope.timeInput1 + ',' + scope.timeInput2;
              }else if(scope.subType == '1'){
                value.dimension = '天';
                value.time =  scope.timeInput1 + ',' + scope.timeInput2;
              }else if(scope.subType == '2') {
                value.dimension = '分钟';
              }
            }
            return value;
          }
          //重置
          scope.clearSettingData=function(){
            clearDate1();
            clearDate2();
          }
          //确定
          scope.sureTimeTypeValue=function(e){
            scope.isStartValidateWatch=true;
            changeErrorStyle("first");
            changeErrorStyle("last");
            if(!scope.errorFlagOne && !scope.errorFlagTwo){isTrueInputValue()};
            if(scope.errorFlagOne || scope.errorFlagTwo){return "验证未通过"};

            var obj={
              values:	scope.getSettingCustomValues()
            }
            scope.getSaveDefaultDatas=$.extend({},true,scope.getSettingCustomValues());
            scope.totleTimeValue=scope.disponseTimeViewValue(obj);
            closestPopPlug(angular.element(e.target));
          }

          function closestPopPlug(element){
            element.closest(".ccmsPublicPop").hide();
            if (element.parents(".ccmsPublicPop").find(".childElementMark").length > 0) {
              if (angular.element(".ccmsPublicPop").find(".childElementMark").length > 1) {
                if (angular.element(".ccmsPublicPop").find(".childElementMark").length == 2) { // 3个弹框
                  element.closest(".commCustomConfigBox").find(".childElementMark").remove();	//class commCustomConfigBox 自定义属性 专属class
                }
              } else {
                angular.element(".ccmsPublicPop").find(".childElementMark").remove();
              }
            } else {
              angular.element(".yunat_maskLayer:last").remove();
            }
          }

          //验证填入的时间段是否合法
          function isTrueInputValue(){
            scope.errorInput1=scope.errorInput2=scope.errorInput3=scope.errorInput4=scope.errorInput5=scope.errorInput6=false;
            if(scope.configType=="1"){ //"后"——验证
              if (scope.monthOrDayOrSecondInput1 != "" && scope.monthOrDayOrSecondInput2 != "") {
                if (scope.monthOrDayOrSecondInput1 * 1 == scope.monthOrDayOrSecondInput2 * 1) {
                  if (scope.subType == "2") {
                    scope.errorInput1 = scope.errorInput4 = true;
                    scope.errorFlagOne = true;
                    scope.errorMessage = "请填写正确的区间的值";
                  } else {
                    if (scope.dayInput1 == scope.dayInput2) {
                      if (scope.timeInput1 >= scope.timeInput2) {
                        scope.errorFlagOne = true;
                        scope.errorInput3 = scope.errorInput6 = true;
                        scope.errorMessage = "请填写正确的区间的值";
                      } else {
                        scope.errorFlagOne = false;
                        scope.errorFlagTwo = false;
                        scope.errorMessage = "";
                      }
                    } else if (scope.dayInput1 * 1 > scope.dayInput2 * 1) {
                      scope.errorFlagOne = true;
                      scope.errorInput2 = scope.errorInput5 = true;
                      scope.errorMessage = "请填写正确的区间的值";
                    } else {
                      scope.errorFlagOne = false;
                      scope.errorFlagTwo = false;
                      scope.errorMessage = "";
                    }
                  }

                } else if (((scope.monthOrDayOrSecondInput1 * 1 > scope.monthOrDayOrSecondInput2 * 1) && scope.subType != "2") || ((scope.monthOrDayOrSecondInput1 * 1 > scope.monthOrDayOrSecondInput2 * 1) && scope.subType == "2")) {
                  scope.errorInput1 = scope.errorInput4 = true;
                  scope.errorFlagOne = true;
                  scope.errorMessage = "请填写正确的区间的值";
                } else {
                  scope.errorFlagOne = false;
                  scope.errorFlagTwo = false;
                  scope.errorMessage = "";
                }
              }
            }else{ // "前"——验证
              if(scope.monthOrDayOrSecondInput1 != "" && scope.monthOrDayOrSecondInput2 != ""){
                if(scope.monthOrDayOrSecondInput1 == scope.monthOrDayOrSecondInput2){
                  if(scope.subType=="2"){
                    scope.errorFlagOne=true;
                    scope.errorMessage="请填写正确的区间的值";
                  }else{
                    if(scope.dayInput1 == scope.dayInput2){
                      if(scope.timeInput1 >= scope.timeInput2){
                        scope.errorInput3=scope.errorInput6=true;
                        scope.errorFlagOne=true;
                        scope.errorMessage="请填写正确的区间的值";
                      }else{
                        scope.errorFlagOne=false;
                        scope.errorFlagTwo=false;
                        scope.errorMessage="";
                      }
                    }else if(scope.dayInput1*1 > scope.dayInput2*1){
                      scope.errorInput2=scope.errorInput5=true;
                      scope.errorFlagOne=true;
                      scope.errorMessage="请填写正确的区间的值";
                    }else{
                      scope.errorFlagOne=false;
                      scope.errorFlagTwo=false;
                      scope.errorMessage="";
                    }
                  }

                }else if(((scope.monthOrDayOrSecondInput1*1 < scope.monthOrDayOrSecondInput2*1) && (scope.subType!="2")) || ((scope.monthOrDayOrSecondInput1*1 < scope.monthOrDayOrSecondInput2*1) && (scope.subType=="2"))){
                  scope.errorInput1=scope.errorInput4=true;
                  scope.errorFlagOne=true;
                  scope.errorMessage="请填写正确的区间的值";
                }else{
                  scope.errorFlagOne=false;
                  scope.errorFlagTwo=false;
                  scope.errorMessage="";
                }
              }
            }
          }

          //监听验证
          function changeErrorStyle(flag){
            if(!scope.isStartValidateWatch){return "不监听验证"};
            if(flag=="first"){
              if((scope.monthOrDayOrSecondInput1=="" && scope.dayInput1=="" && scope.timeInput1=="") || (scope.monthOrDayOrSecondInput1!="" && scope.dayInput1!="" && scope.timeInput1!="") || (scope.monthOrDayOrSecondInput1!="" && scope.timeInput1!="" && scope.subType=="1") || (scope.monthOrDayOrSecondInput1!="" && scope.subType=="2")){
                scope.errorFlagOne=false;
                scope.errorInput1=false;
                scope.errorInput2=false;
                scope.errorInput3=false;
              }else{
                if(scope.subType=="0"){
                  if(scope.monthOrDayOrSecondInput1==""){
                    scope.errorInput1=true;
                  }else{
                    scope.errorInput1=false;
                  };

                  if(scope.dayInput1==""){
                    scope.errorInput2=true;
                  }else{
                    scope.errorInput2=false;
                  };

                  if(scope.timeInput1==""){
                    scope.errorInput3=true;
                  }else{
                    scope.errorInput3=false;
                  };

                  scope.errorFlagOne=true;
                  scope.errorMessage="请填写完整的值";
                }else if(scope.subType=="1"){
                  if(scope.monthOrDayOrSecondInput1==""){
                    scope.errorInput1=true;
                  }else{
                    scope.errorInput1=false;
                  };
                  if(scope.timeInput1==""){
                    scope.errorInput3=true;
                  }else{
                    scope.errorInput3=false;
                  };
                  scope.errorFlagOne=true;
                  scope.errorMessage="请填写完整的值";
                }
              }
            }else if(flag=="last"){
              if((scope.monthOrDayOrSecondInput2=="" && scope.dayInput2=="" && scope.timeInput2=="") || (scope.monthOrDayOrSecondInput2!="" && scope.dayInput2!="" && scope.timeInput2!="") || (scope.monthOrDayOrSecondInput2!="" && scope.timeInput2!="" && scope.subType=="1") || (scope.monthOrDayOrSecondInput2!="" && scope.subType=="2")){
                scope.errorFlagTwo=false;
                scope.errorInput4=false;
                scope.errorInput5=false;
                scope.errorInput6=false;
              }else{
                if(scope.subType=="0"){
                  if(scope.monthOrDayOrSecondInput2==""){
                    scope.errorInput4=true;
                  }else{
                    scope.errorInput4=false;
                  };

                  if(scope.dayInput2==""){
                    scope.errorInput5=true;
                  }else{
                    scope.errorInput5=false;
                  };

                  if(scope.timeInput2==""){
                    scope.errorInput6=true;
                  }else{
                    scope.errorInput6=false;
                  };

                  scope.errorFlagTwo=true;
                  scope.errorMessage="请填写完整的值";
                }else if(scope.subType=="1"){
                  if(scope.monthOrDayOrSecondInput2==""){
                    scope.errorInput4=true;
                  }else{
                    scope.errorInput4=false;
                  };

                  if(scope.timeInput2==""){
                    scope.errorInput6=true;
                  }else{
                    scope.errorInput6=false;
                  };

                  scope.errorFlagTwo=true;
                  scope.errorMessage="请填写完整的值";
                }
              }
            }
          }

          scope.$watch("monthOrDayOrSecondInput1",function(nVal,oVal){
            if(oVal != undefined){
              changeErrorStyle("first");
            }
          });

          scope.$watch("dayInput1",function(nVal,oVal){
            if(oVal != undefined){
              changeErrorStyle("first");
            }
          });

          scope.$watch("timeInput1",function(nVal,oVal){
            if(oVal != undefined){
              changeErrorStyle("first");
            }
          });

          scope.$watch("monthOrDayOrSecondInput2",function(nVal,oVal){
            if(oVal != undefined){
              changeErrorStyle("last");
            }
          });

          scope.$watch("dayInput2",function(nVal,oVal){
            if(oVal != undefined){
              changeErrorStyle("last");
            }
          });

          scope.$watch("timeInput2",function(nVal,oVal){
            if(oVal != undefined){
              changeErrorStyle("last");
            }
          });

        }
      }
    },
    /*字典单选1*/
    "analysisDicOneType":function(){
      return {
        "controller": ['$scope', function($scope){
          $scope.dicOneLists=$scope.data.configs;
          $scope.setCurRadioId=function(e,v){
            var curRadioElement=angular.element(e.target);
            curRadioElement.closest("label").siblings("label").find(".simulateRadioUnChecked").removeClass("simulateRadioChecked");
            if(curRadioElement.hasClass("simulateRadioChecked")){
              curRadioElement.removeClass("simulateRadioChecked");
              $scope.curSelectId="";
              $scope.curSelectImg="";
            }else{
              curRadioElement.addClass("simulateRadioChecked");
              $scope.curSelectId=v;
              $scope.curSelectImg=curRadioElement.siblings("span").html();
            }
          }
          if(!$scope.data.values){ // add || editor
            $scope.dicOneValue="";
            $scope.curSelectId="";
            $scope.curSelectImg="";
          }else{
            $scope.dicOneValue=$scope.data.values.value || "";
            $scope.curSelectId=$scope.data.values.value || "";
            $scope.curSelectImg=$scope.data.values.img || "";
          }
        }],
        "link":function(scope,element,attr,ctrl){
          scope.getCustomValue = function() {//获取每个scope的数据values
            var value = {};
            value.value = scope.curSelectId;
            value.img = scope.curSelectImg;
            return value;
          };
        }
      }
    },
    /*字典单选2*/
    "analysisDicTwoType":function(){
      return {
        "controller": ['$scope', function($scope){
          $scope.dicTwoLists=$scope.data.configs;
          if(!$scope.data.values){
            $scope.dicTwoValue="";
          }else{
            angular.forEach($scope.dicTwoLists,function(val,key){
              if(val.id==$scope.data.values.value){
                $scope.dicTwoValue=val;
              }
            });
          }
        }],
        "link":function(scope,element,attr,ctrl){
          scope.getCustomValue = function() {//获取每个scope的数据values
            var value = {};
            value.value = scope.dicTwoValue ? scope.dicTwoValue.id : "";
            value.img = scope.dicTwoValue ? scope.dicTwoValue.name : "";
            return value;
          };
        }
      }
    },
    /*树形多选*/
    "analysisDicZtreeType":function(){
      return {
        "controller": ['$scope', function($scope){
          $scope.dicZtreeLists=$scope.data.configs;
          function initCustomZtree(data){ //初始化checkedBox ztree
            var setting={
               check: {
                 enable: true,
                 chkStyle:"checkbox",
                 chkboxType: {
                   "Y": "ps",
                   "N": "ps"
                 },
                 nocheckInherit: true
               },
              view: {
                addDiyDom: function(treeId, treeNode){
                  var spaceWidth =15;
                  var switchObj = $("#" + treeNode.tId + "_switch"),
                    icoObj = $("#" + treeNode.tId + "_ico"),
                    checkObj = $("#" + treeNode.tId + "_check"),
                                        spanObj = $("#" + treeNode.tId + "_span");
                  switchObj.remove();
                  icoObj.before(switchObj);
                                    spanObj.attr("treenode_check","");

                  switchObj.after(checkObj);
                  var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level + 10) + "px'></span>";
                  if(treeNode.level != 0){switchObj.before(spaceStr)}; // 展定最外层不给宽度
                  if(treeNode.level == 0 && !treeNode.isLastNode) {
                    $('#'+treeNode.tId+'_a').after("<div class='root_level0_line'></div>");
                  }
                },
                dblClickExpand: false,
                showIcon: false
              },
              data: {
                simpleData: {
                  enable: true
                }
              },
              callback: {
                onCheck: function onCheck(event, treeId, treeNode){}
              },
              edit: {
                enable: false
              }
            };
            $scope.thisScopecheckedZtree=$.fn.zTree.init($(".queryCustomCheckedZtree"+$scope.data.queryItemId),setting,data);
            if($scope.viewCustomZtreeIds){
              setDefaultTreeNode($scope.thisScopecheckedZtree,$scope.viewCustomZtreeIds.split(","));
            }
          }

          function setDefaultTreeNode(treeEle,defalutObj){//设置默认的tree node defalutObj——id的数组
            treeEle.checkAllNodes(false);
            for(var i = 0; i < defalutObj.length; i++) {
              var node = treeEle.getNodesByParam("id", defalutObj[i])[0];
              if(node) {
                treeEle.checkNode(node, true, false);
                treeEle.expandNode(node.getParentNode(),true);
              }
            }
          }
          $scope.initCustomZtree=function(){initCustomZtree($scope.dicZtreeLists);};
          if(!$scope.data.values){ // add || editor
            $scope.viewCustomZtreeValues="";
            $scope.viewCustomZtreeIds="";
          }else{
            $scope.viewCustomZtreeValues=$scope.data.values.view || "";
            $scope.viewCustomZtreeIds=$scope.data.values.value || "";
          }
        }],
        "link":function(scope,element,attr,ctrl){
          scope.theCustomZtreeShow=function(){ // 开始选择
            scope.initCustomZtree();
            scope.isShowSelectedTree=true;
          };
          scope.sureCustomZtreeData=function(){ // 确定选择
            var storeCustomZtreeValuesAry=[],storeCustomZtreeIdsAry=[];
            var returnZtreeData=scope.thisScopecheckedZtree.getCheckedNodes(true);//返回ztree选中数据
            if(returnZtreeData.length>0){
              angular.forEach(returnZtreeData,function(val,key){
                storeCustomZtreeValuesAry.push(val.name);
                storeCustomZtreeIdsAry.push(val.id);
              })
            };
            scope.viewCustomZtreeValues=storeCustomZtreeValuesAry.join(",");
            scope.viewCustomZtreeIds=storeCustomZtreeIdsAry.join(",");
            scope.hiddenCustomZtree();
          };
          scope.hiddenCustomZtree=function(){ //取消选中
            scope.isShowSelectedTree=false;
            element.find(".ztree").html("");
          };
          scope.getCustomValue = function() {//获取每个scope的数据values
            var value = {};
            value.value = scope.viewCustomZtreeIds;
            value.view = scope.viewCustomZtreeValues;
            return value;
          };
        }
      }
    },
    /*数字输入*/
    "analysisNumberType": ['$compile', function($compile){
      return {
        "controller": ['$scope', function($scope){
          if(!$scope.data.values){ // add || editor
            $scope.operator = $scope.data.configs['NumberType'][0];//默认选择类型
            $scope.numInput1="";
            $scope.numInput2="";
          }else{
            var defaultVal = $scope.data.values;
            $scope.operator = defaultVal.operator;
            $scope.numInput1 = defaultVal.operator=="介于" ? defaultVal.value.split(',')[0] : defaultVal.value;
            $scope.numInput2 = defaultVal.value.split(',')[1] || "";
          }
        }],
        "link":function(scope,element,attr,ctrl){
          var inited = false;
          //选择框改变
          scope.$watch('operator', function(val, oldVal){
            if(val == undefined) {
              return;
            }
            if(oldVal != undefined && oldVal != val &&  scope.numInput1) {
              scope.numInput1 = "";
              scope.numInput2 = "";
            }
            addStrict(scope.data.configs);
            if(val == "介于") {
              scope.isMid = true;
            }else {
              scope.isMid = false;
            }
          });

          //操作符是介于必填
          scope.$watch("numInput1",function(val,oldVal){
            if((scope.operator=="介于") && val || (scope.operator=="介于" && scope.numInput2)){
              toggleRequired(true);
            }else {
              toggleRequired(false);
            }
          });

          scope.$watch("numInput2",function(val,oldVal){
            if((scope.operator=="介于" && val) || (scope.operator=="介于" && scope.numInput1)){
              toggleRequired(true);
            }else {
              toggleRequired(false);
            }
          });
          //end
          function toggleRequired(flag){
            if(flag){
              element.find("input").addClass("required");
            }else{
              element.find("input").removeClass("required error").css("borderColor","#D9D9D9");
              element.find(".error").remove();
            }
          };

          function addStrict(config) {
            // var config = scope.data.configs;
            if (inited) {
              return;
            }
            var els = element.find('input');
            //输入类型 :浮点数 整数 百分数
            if(config['NumberInputType']){
              switch(config['NumberInputType'][0]){
                case 'Int': els.attr('num-type','整数'); break;
                case 'Float':els.attr('num-type','浮点数');break;
                case 'Percentage': els.attr('num-type','百分数'); els.after('<span class="mr10 dollor">%</span>'); break;
              }
            }
            //202(输入精度:小数点后几位)
            if(config['NumberInputPrecision']){
              els.attr('num-precision', config['NumberInputPrecision'][0]);
            }
            //204(输入范围)
            if(config['NumberInputRange']){
              els.attr('num-between', config['NumberInputRange']);
              els.attr('range', config['NumberInputRange']);
            }

            $compile(element.find('input')[0])(scope);
            $compile(element.find('input')[1])(scope);
            inited = true;
          };
          scope.getCustomValue = function() {//获取每个scope的数据values
            var value = {};
            var numInput = '';
            if(scope.data.configs['NumberInputType'] && scope.data.configs['NumberInputType'][0] == 'Percentage') {
               value.percent=scope.data.configs['NumberInputPrecision'] && scope.data.configs['NumberInputPrecision'][0];
            }
            if(scope.operator =="介于") {
              numInput = scope.numInput1 + ',' + scope.numInput2;
            }else {
              numInput = scope.numInput1+"";
            }
            value.value = numInput;
            value.operator = scope.operator;
            return value;
          };
        }
      }
    }],
    /*关键字选择*/
    "analysisKeywordType":function(){
      return {
        "controller": ['$scope', function($scope){
          if(!$scope.data.values){ // add || editor
            $scope.fontLists =[];
            $scope.viewValues=$scope.fontLists.join(",")
            $scope.fontRelation = "AND";
          }else{
            $scope.viewValues=$scope.data.values.value;
            $scope.fontLists =$scope.viewValues ? $scope.viewValues.split(",") : [];
            $scope.fontRelation = $scope.data.values.relation || "AND";
          }
        }],
        "link":function(scope,element,attr){
          //选择框改变
          scope.editorKeyword = function(){
            scope.commPlugSrc=  CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/selectorFonts.html?_="+new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop=function(){
            element.find(".commSelectPlug").addInteractivePop({magTitle:"请选择关键字",width:520,mark:false,position:"fixed",childElePop:true});
          };
          scope.$watch("fontLists",function(nVal,oVal){
            scope.viewValues=nVal.join(",");
            scope.viewInputValues=nVal.length!=0?"已选择"+nVal.length+"个关键字":"";
          });

          //获取保存到服务器的values
          scope.getCustomValue = function() {
            var value = {
              "relation":scope.fontRelation,
              "value":scope.viewValues
            };
            return value;
          };
        }
      }
    },
    /*地区选择*/
    "analysisCityType":function(){
      return {
        controller: ['$scope', function($scope){
          if(!$scope.data.values){ // add || editor
            $scope.cityLists=[];
            $scope.inputCityLists=[];
            $scope.viewCityValues=$scope.cityLists.join(",");
          }else{
            $scope.cityLists=[];
            $scope.inputCityLists=[];
            $scope.viewCityValues=$scope.cityLists.join(",");
          }
        }],
        link: function(scope, elem, attrs) {
          //选择框改变
          scope.editorCitys = function(){
            scope.commPlugSrc =  CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/citys.html?_="+new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop=function(){
            elem.find(".commSelectPlug").addInteractivePop({magTitle:"地区选择",width:820,mark:false,position:"fixed",childElePop:true});
          }

          //选择结果赋值
          scope.getCitySelectedData=function(callBackData){
            scope.cityLists=callBackData.slice();
            scope.inputCityLists=callBackData.slice();
          }
          scope.$watch("inputCityLists",function(nVal,oVal){
            scope.cityInputValue="已选择"+nVal.length+"个地区";
            var cityNames=[];
            angular.forEach(nVal,function(v,k){
              if(v.name){cityNames.push(v.name.replace(/,/ig,"-"))};
            });
            scope.viewCityValues=cityNames.join(",");
          });

          //获取保存到服务器的values
          scope.getCustomValue = function() {
            var value =scope.inputCityLists.slice();
            return value;
          };
        }
      }
    },
    /*商品选择*/
    "analysisProductType":["selectorProduct", "$rootScope", function(selectorProduct, $rootScope){
      return {
        controller: ['$scope', function($scope){
          if(!$scope.data.values){ // add || editor
            $scope.cityLists=[];
            $scope.viewProductValues=$scope.cityLists.join(",");
            $scope.productInputValue=""
            $scope.storeProductId="";
            $scope.snapshootId=0;
            $scope.serviceType="node_query";
          }else{
            $scope.cityLists=[];
            $scope.productInputValue=$scope.data.values.fillProductValue || "";
            $scope.storeProductId=$scope.data.values.storeProductId || "";
            $scope.viewProductValues=$scope.cityLists.join(",");
            $scope.snapshootId=$scope.storeProductId || 0;
            $scope.serviceType="node_query";
          }
          $scope.segmentationId = $rootScope.segmentationIdByorder;
        }],
        link: function(scope, elem, attrs) {
          //选择框改变
          scope.editorProducts = function(){
            var self = this;
            this.bindings = {};
            var a = {
              bject$$hashKey: "object:1357",
              chooseId: scope.storeProductId,
              code: "SellerCode",
              enableMultiple: false,
              length: 0,
              range: 2,
              resourceName: "sellerCode",
              sideFlag: true
            };
            selectorProduct({
              type: 'product',
              disable: false ,// this.navName !== 'create' && this.navName !== 'edit',
              title: '商品选择器',
              bindings: Object.assign({}, self.bindings[a.code], {cid: a.chooseId}, {sideFlag: a.sideFlag}, {segmentationId: scope.segmentationId}, {platCode: self.data.platCode}),
              onDone: function(bindings, changed) {
                console.log(bindings)
                scope.getProductSelectedData(bindings);
              }
            });
            // scope.commPlugSrc = GLOBAL_STATIC.rootModule + "/modules/Selector/goodsList.html?_="+new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop=function(){
            console.log('商品选择openPlugPop');
            elem.find(".commSelectPlug").addInteractivePop({magTitle:"商品选择",width:900,mark:false,position:"fixed",childElePop:true});
          }

          //选择结果赋值
          scope.getProductSelectedData=function(callBackData,storeId){
            scope.callBackData = callBackData;
            scope.inputProductLists = callBackData.items && callBackData.items.slice();
            scope.storeProductId = callBackData.cid;
            scope.snapshootId =  callBackData.cid;
          }
          scope.$watch("inputProductLists",function(nVal,oVal){
            if(!oVal && !nVal){return false}
            var hasSearchGoodConditions=false;
            if(scope.callBackData && scope.callBackData.selectorSearchVO){
              for(var i in scope.callBackData.selectorSearchVO){
                hasSearchGoodConditions=true;
              }
            };
            if(nVal==undefined || nVal.length==0){
              scope.productInputValue=hasSearchGoodConditions ? "已选择1个搜索条件" : "";
              return false;
            }

            // scope.productInputValue=hasSearchGoodConditions ? "已选择"+nVal.length+"个商品,1个搜索条件" : "已选择"+nVal.length+"个商品";
            scope.productInputValue=hasSearchGoodConditions ? "已选择"+nVal.length+"条数据,1个搜索条件" : "已选择"+nVal.length+"条数据";
            var productNames=[];
            angular.forEach(nVal,function(v,k){
              if(v.title){productNames.push(v.title.replace(/,/ig,"-"))};
            });
            scope.viewProductValues=productNames.join(",");
          });

          //获取保存到服务器的values
          scope.getCustomValue = function() {
            var value ={
              "fillProductValue":scope.productInputValue || "",
              "storeProductId":scope.productInputValue ? (scope.storeProductId || "") : ""
            }
            return value;
          };
        }
      }
    }],
    /*标签选择*/
    "analysisLabelType":function(){
      return {
        "controller": ['$scope', function($scope){
          if(!$scope.data.values){ // add || editor
            $scope.labelLists =[];
            $scope.viewValues=$scope.labelLists.join(",")
            $scope.viewlabelIds="";
            $scope.customerLabelLists=[];
          }else{
            $scope.viewValues=$scope.data.values.value || "";
            $scope.labelLists =$scope.viewValues.split(",")||[];
            $scope.viewlabelIds=$scope.data.values.ids || "";
            $scope.customerLabelLists=[];
          }
        }],
        "link":function(scope,element,attr){
          //选择框改变
          scope.editorLabels = function(){
            scope.commPlugSrc =  CAMPAIGN_STATIC.tplBasePath + "view/node/tfilterfindView/commPlugView/label.html?_="+new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop=function(){
            element.find(".commSelectPlug").addInteractivePop({magTitle:"请选择标签",width:520,mark:false,position:"fixed",childElePop:true});
          };
          scope.$watch("labelLists",function(nVal,oVal){
            scope.viewlabelValues=nVal.join(",");
            scope.labelInputValue=nVal.length!=0?"已选择"+nVal.length+"个关键字":"";

            angular.forEach(scope.viewlabelIds.split(","),function(val,key){ // 用于标签模板默认选择状态
              scope.customerLabelLists.push({
                "id":val,
                "value":nVal[key]
              })
            })
          });

          //获取保存到服务器的values
          scope.getCustomValue = function() {
            var value = {
              "value":scope.viewlabelValues,
              "ids":scope.viewlabelIds
            };
            return value;
          };
        }
      }
    },
    /*通用化选择器*/
    "analysisSelectorType": function() {
      return {
        controller: ['$scope',
          function($scope) {
            if (!$scope.data.values) { // add || editor
              $scope.parentPrimary = ""
            } else {
              $scope.parentPrimary = $scope.data.values.value || "";
              $scope.commSelectViews = $scope.data.values.view || "";
            }
          }
        ],
        link: function(scope, elem, attrs) {
          //选择框改变
          scope.editorProducts = function() {
            scope.commPlugSrc = GLOBAL_STATIC.rootModule + "/modules/commSelector/index.html?_=" + new Date().getTime();
          };
          //选择器弹框调用
          scope.openPlugPop = function() {
            console.log('李文杰');
            elem.find(".commSelectPlug").addInteractivePop({
              magTitle: scope.data.name + "选择器",
              width: 900,
              mark: false,
              position: "fixed",
              childElePop: true
            });
          }

          scope.$on('commSelectSubmit', function(currScope, q, primary) {
            scope.commSelectViews = "已选择" + scope.data.name + "数" + primary.length;
            scope.parentPrimary = primary.toString();
            scope.primary = primary;
          });

          //获取保存到服务器的values
          scope.getCustomValue = function() {
            var result = {
              'value': scope.parentPrimary,
              'view': scope.commSelectViews
            };
            return result;
          };
        }
      }
    }
  })

})(window, angular, undefined);
