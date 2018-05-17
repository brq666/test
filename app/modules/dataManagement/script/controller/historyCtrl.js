/**
 * Created by marchen on 2015/12/28.
 */
angular.module("dataManage.controllers").controller('historyCtrl', ["$scope", "$window", "$location", "$http", "$compile", "ngHistoryService", "FileUploader",
function($scope, $window, $location, $http, $compile, ngHistoryService, FileUploader) {
  $scope.getCookie =  function (cookieName)  {
      var cookieValue = document.cookie;
      var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
      if (cookieStartAt == -1) {
        cookieStartAt = cookieValue.indexOf(cookieName + "=");
      }
      if (cookieStartAt == -1) {
        cookieValue = null;
      } else {
        cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
        cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
        if (cookieEndAt == -1) {
          cookieEndAt = cookieValue.length;
        }
        cookieValue = unescape(cookieValue.substring(cookieStartAt, cookieEndAt)); //解码latin-1
      }
      return cookieValue;
  }

  $scope.history = {
    "initData": function() {
      ngHistoryService.getShops(function(response) {
        $scope.history.shops = response;
        $scope.history.selectedShopIndex = 0;
        $scope.history.selectedShopIndexTemp = 0;
        selectOneShop($scope.history.shops, 0);
        $scope.history.ShopValsView = $scope.history.shops[0].name;
      });
      $("#ccms_tips").Tips();
    },
    "choiceShops": function(index) {
      selectOneShop($scope.history.shops, index);
    },
    "getShops": function() {
      $(".customerShopsPop").addInteractivePop({
        magTitle: "请选择店铺",
        width: 760,
        height: 328,
        mark: true,
        position: "fixed"
      });
    },
    "sureAddShop": function() {
      $scope.history.selectedShopIndex = $scope.history.selectedShopIndexTemp;
      $scope.history.ShopValsView = $scope.history.shops[$scope.history.selectedShopIndex].name;
    },
    "cancelAddShop": function() {
      console.log($scope.history.selectedShopIndex)
      $scope.history.selectedShopIndexTemp = $scope.history.selectedShopIndex;
      selectOneShop($scope.history.shops, $scope.history.selectedShopIndex);
    },
    "addFile": function() {
      $("#uploadify_dialog").addInteractivePop({
        magTitle: "请选择店铺",
        width: 550,
        height: 280,
        mark: true,
        position: "fixed"
      });
      $('#uploadify_dialog').css('visibility', 'visible');
    }
  }
  // 选择一个店铺
  function selectOneShop(shops, index) {
    shops.forEach(function(shop, index) {
      shop.isSelected = false;
    });
    if(index !== undefined) {
      shops[index].isSelected = true;
    }
    $scope.history.selectedShopIndexTemp = index;
  }
  // 初始化数据
  $scope.history.initData(true);

  // 上传文件相关
  var JSESSIONID_temp = window.sessionStorage.getItem('JSESSIONID') || '';
  var tenantId_temp = window.sessionStorage.getItem('tenantId') || '';
  var username_temp = window.sessionStorage.getItem('username') || '';
  var userId_temp = window.sessionStorage.getItem('userId') || '';
  var uploaderParam = "&JSESSIONID=" + JSESSIONID_temp + "&tenantId=" + tenantId_temp + "&username=" + username_temp + "&userId=" +  userId_temp;
  $scope.swfUnloadTip = '<span class="swfInitMsg red ml5">请检查您的浏览器是否禁用了flash插件或是否安装flash插件，flash插件下载地址：<a href="http://www.skycn.com/soft/appid/8.html" target="_blank">http://www.skycn.com/soft/appid/8.html</a></span>';
  var defaultOrigin = location.protocol + "//" + location.host;
  var newUploader = new plupload.Uploader();
  var newUploaderOrder = new plupload.Uploader();
  var newUploaderItem = new plupload.Uploader();
  var uploadify = {
    itemRule: 'Iteml|Item|OrderDetail',
    fileRule: /^(ExportOrderList|ExportItemList|ExportItemlList|ExportOrderDetailList)\d{4}-\d{1,2}-\d{1,2}\./,
    siggleSetting: {
      'siggleUpload': true
    },
    setting: {
      'headers': {
        'X-TOKEN': GLOBAL_STATIC.Credentials.access_token,
        'Authorization': 'Bearer ' + GLOBAL_STATIC.Credentials.access_token
      },
      'siggleUpload': false,
      'runtimes': 'html5,silverlight,html4',
      'browse_button': 'file_upload',
      'filters' : {
        max_file_size:'80mb',
        mime_types : [
          {title : "Csv files", extensions : "csv"}
        ]
      },
      'itemTemplate' : '<div id="${fileID}" class="history-uploadify-queue-item">\
          <span class="uploadify-ico"></span>\
          <div class="uploadify-queue-main">\
            <div><span class="fileName" >${fileName}</span></div>\
            <div class="uploadify-prog-wrap">\
              <div class="uploadify-progress"><div class="uploadify-progress-bar"></div></div>\
              <span class="data" id="${fileName}">error</span> &nbsp;\
              <a class="uploadify-cancel" href="javascript:void(0);">取消</a>\
            </div>\
          </div>\
        </div>',
      init:{
        FileFiltered:function(up, file){
          up.setOption('multipart_params',{'dpId': $scope.history.shops[$scope.history.selectedShopIndex].idInPlat, 'JSESSIONID': $scope.getCookie('JSESSIONID')})
          var fileId = file.id;
          var swfId = up.settings.browse_button[0].id;
          var swfUploader = $('#' + swfId);
          var itemHTML = uploadify.setting.itemTemplate;
          var fileName = file.name;
          var fileDate = fileName.replace(/\D/g, '');
          var isSiggleUpload = up.settings.siggleUpload;
          var itemData = {
            'fileName':fileName,
            'fileID':fileId
          }
          for (var d in itemData) {
            itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), itemData[d]);
          }
          if(uploadify.fileRule.test(fileName)){
            if(isSiggleUpload){
              if(new RegExp(uploadify.getFileName(swfUploader.parents('tr').find('.fileName').text())).test(fileName)){//上传单个文件的时候，判断上传的文件是否是对应的文件
                uploadify.creatItem(fileName, fileDate, itemHTML, fileId, swfId,up);
                swfUploader.parents('td').find('.uploadify_error').hide().text('');
              }
              else{
                var txtAry = ['订单', '宝贝'],
                  txtIndex = /order/.test(swfId) ? 0 : 1;

                up.removeFile(fileName)
                swfUploader.parents('td').find('.uploadify_error').show().text('您选择的'+ txtAry[txtIndex] +'报表与对应的'+ txtAry[1 -txtIndex] +'报表文件不匹配，请重新选择');
              }
            }
            else{
              uploadify.creatItem(fileName, fileDate, itemHTML, fileId, swfId,up);
            }
          }
          else{
            up.removeFile(fileName)
          }
        },
        FilesAdded:function(up, files){
          $(".yunat_maskLayer:last").remove();
          var errorNames = '';
          $.each(files, function(k,v){
            var fileName = v.name;

            if(!uploadify.fileRule.test(fileName)){
              errorNames += '"' + fileName + '",';
            }
          });
          if(errorNames){
            $('#upload_error_tip').text(errorNames.slice(0, -1) + '文件名格式有误，必须为ExportOrderList或ExportItemlList/ExportItemList/ExportOrderDetailList开头，xxxx-xx-xx（日期格式）结尾的文件名；');
            $('.ccmsPublicPop').hide();
            return
          }else{
            $('#upload_error_tip').text('从淘宝后台下载历史订单文件后，请只修改文件名称后上传，切勿打开文件和保存文件（文件编码变更会导致导入失败）');
          }
          $('#uploadify_dialog').css('visibility', 'hidden');
          up.start();
        },
        FileUploaded:function(up, file,responseObject){
          var text = responseObject.response;
          var data = typeof text === 'string' ? $.parseJSON(text) : text,
          uploadItem = $('#' + file.id);
          if(data.status == '0'){
            var result = data.data.v;
            uploadItem.attr('success','true');
            var listWrap = uploadItem.parents('tr');
            if(listWrap.find('.history-uploadify-queue-item[success="true"]').length == 2){ //当主定单和子订单都添加时显示 导入系统 按钮
              listWrap.attr('pkId', result.pkId).find('.importSystem').html('<a href="javascript:void(0);" class="upload_button">导入系统</a>')
                .end().find(':checkbox').attr('disabled', false)
                .end().find('.importSystem a').click(function(){
                  //uploadify.importFile($(this));
                  uploadify.importBatch($(this).parents('tr'));
                });
            }
            //显示文件行数
            uploadItem.find('.uploadify-prog-wrap').html('完成<span class="uploadify_btn_wrap"><a href="javascript:void(0);" class="uploadify_del" style="display:inline;" pkId="'+ result.pkId +'">删除</a></span>' + result.rowNum + '条记录');
            uploadItem.find('.uploadify_del').click(function(){
              uploadify.delUpload(this);
            });
          }
          else{
            uploadItem.find('.uploadify-progress').hide().after('<span class="red">'+ data.message +'</span>');
          }
        },
        Error:function(uploader,errObject){
          if(errObject.code == -600){
            var errorTxt = $('#upload_select_error').text();
            $('#upload_select_error').text(errorTxt + '"'+ file.name +'"超过'+ this.settings.fileSizeLimit + '；').show();
          }
          setTimeout(function() {
            if($('.ccmsPublicPopBg').length > 1) {
              $('.ccmsPublicPopBg').last().remove();
              $('.yunat_maskLayer').last().remove();
            }
          }, 0);
          var fileId = errObject.file.id;
          $('#'+fileId).find('.data').html('- HTTP Error (' + errObject.status+')')
          $('#'+fileId).addClass('uploadify-error');
          $(window).Alert({
            "title": "错误",
            "str": "文件上传失败,请重新上传",
            "mark": true
          });
        },
        Destroy:function(up){
          $('#'+ $(up.settings.browse_button[0].id).attr('id')).remove();
        },
        UploadProgress:function(up,file){
          $('#' + file.id).find('.uploadify-progress-bar').css({width:file.percent+'%'});
        }
      }
    },
    getFileName: function(str){
      if(/ExportOrderList/.test(str)){
        return str.replace('Order', '(Item|Iteml|OrderDetail)');
      }else{
        return str.replace(new RegExp(this.itemRule), 'Order');
      }
    },
    getFileDateObj: function(fileDate){
      return $('tr[fileDate='+fileDate+']').filter(function(){
        return !Number($(this).attr('isImport'));
      });//filter -- 过滤掉已经导入系统的;
    },
    creatItem: function(fileName, fileDate, itemHTML, fileId, swfId,up){//生成 上传的DOM
      if(!uploadify.getFileDateObj(fileDate).length){//判断是否有同一日期的tr
        $('#upload_list').append('<tr fileDate="'+fileDate+'">\
          <td><input type="checkbox" disabled="disabled" /></td>\
          <td><span class="uploadify-item-wrap"><div id="upload_order'+fileDate+'" class="uploadify-button uploadify-button-sty"  >选择主订单文件</div><div class="uploadify_error"></div></span></td>\
          <td><span class="uploadify-item-wrap"><div id="upload_item'+fileDate+'" class="uploadify-button uploadify-button-sty"  >选择子订单文件</div><div class="uploadify_error"></div></span></td>\
          <td class="importSystem"></td>\
        </tr>');
        var _this = this;
        //初始化每个 upload

        _this.initOrderUploader('upload_order'+ fileDate);
        _this.initItemUploader('upload_item'+ fileDate);
      }

      var obj = uploadify.getFileDateObj(fileDate).find('td').eq(/ExportOrderList/.test(fileName) ? 1 : 2);
      var obj2 = uploadify.getFileDateObj(fileDate).find('td').eq(/ExportItemList/.test(fileName) ? 1 : 2);

      obj.find('.uploadify-button-sty').hide() //隐藏选择标签，取消后记得显示
      obj2.css({'text-align':'left'})

      if(obj.find('.history-uploadify-queue-item').length){//判断是否有上传过相应的文件，有则删除（子订单文件名有三种情况 ExportItemList|ExportItemlList|ExportOrderDetailList）
        obj.find('.history-uploadify-queue-item').remove();
      }

      if(obj.find('.uploadify').length){
        obj.find('.uploadify').css({'left': '-9999px', 'position': 'absolute'}).next().hide();
      }

      obj.children().append(itemHTML).attr('fileNmae', fileName)
      .find('.uploadify-cancel').click(function(){
        uploadify.cancelUpload(swfId, fileId,up,fileName);
      });

    },
    getList: function(shopId){ //加载已上传的文件
      _this = this;
      function isShow(flg){
        return flg ? '' : ' style="display:none;"';
      }
      function getItem(k, v, key){
        if(v[key + 'FileName']){
          return '<div class="history-uploadify-queue-item" success="true">\
                <span class="uploadify-ico"></span>\
                <div class="uploadify-queue-main">\
                  <div><span class="fileName">'+ v[key + 'FileName'] + '</span></div>\
                  <div class="uploadify-prog-wrap">\
                    完成\
                    <span class="uploadify_btn_wrap">\
                      <a href="javascript:void(0);" class="uploadify_del" pkId="'+ v.pkId +'">删除</a>\
                    </span>' + v[key + 'Total'] +'条记录\
                  </div>\
                </div>\
              </div>';
        }else{
          if( key == 'trade'){
            return '<div class="translation"><div id="upload_'+ key + k +'" class="uploadify-button uploadify-button-sty" >选择主订单文件</div><div class="uploadify_error"></div></div>';
          }else{
            return '<div class="translationitem"><div id="upload_'+ key + k +'" class="uploadify-button uploadify-button-sty" >选择子订单文件</div><div class="uploadify_error"></div></div>';
          }
        }
      }
      var _this = this;
      ngHistoryService.getList(function(res){
        $('#uploadify_loaded, #upload_list').html('');
        $.each(res, function(k, v){
          var html = '<tr pkId="'+v.pkId+'" isImport="'+ v.isImport +'" fileDate="'+ (v.tradeFileName || v.orderFileName).replace(/\D/g, '') +'">\
            <td><input type="checkbox" type="checkbox" disabled="disabled" /></td>\
            <td>\
              <span class="uploadify-item-wrap">'+ getItem(k, v, 'trade') +'</span>\
            </td>\
            <td>\
              <span class="uploadify-item-wrap">'+ getItem(k, v, 'order') +'</span>\
            </td>\
            <td class="importSystem"></td>\
          </tr>';
          var obj = $(html).appendTo($('#uploadify_loaded')),
            _importSystem = obj.find('.importSystem');

          obj.find('.uploadify_del').click(function(){
            _this.delUpload(this);
          });

          if(v.tradeFileName && v.orderFileName){//主订单和子订单都上传了。
            switch (v.isImport){
              case 0:
                _importSystem.html('<a href="javascript:void(0);" class="upload_button">导入系统</a>');
                obj.find('.uploadify_del').css('display', 'inline').end().find(':checkbox').attr('disabled', false).end()
                  .find('.importSystem a').click(function(){
                    //_this.importFile($(this));
                    _this.importBatch($(this).parents('tr'));
                  });
                break;
              case 1:
                _importSystem.html('导入成功' + v.importSuccessfulTotal + '条主订单<span class="ico_tips" ng-title-max="210" dm-title="数据导入成功后大概需要等待一段时间（导入1万条数据大概需要20分钟）才能在营销活动中查询到数据。"></span> <a href="javascript:void(0);" class="showHistoryLog ml5">查看</a>').find('a').click(function(){
                  _this.showHistory(v.pkId, $(this));
                });
                $compile(_importSystem.contents())($scope);
                obj.find('.uploadify_del').css('display', 'none');
                break;
              case 2:
                _importSystem.html('<div class="loading"><i></i>正在导入...</div>');
            }
          }else{
            obj.find('.uploadify_del').css('display', 'inline').end().find(':checkbox').attr('disabled', true);
            /*if(!v.tradeFileName){
              _this.initOrderUploader('upload_trade'+ k);
            }
            else if(!v.orderFileName){
              _this.initItemUploader('upload_order' + k);
            }*/
          }
        });
        $('.translation').each(function(){
          var newUploaderOrder = new plupload.Uploader($.extend({},_this.setting,_this.siggleSetting,{browse_button:$(this).find('div').attr('id')}));
          newUploaderOrder.init();
        })
         $('.translationitem').each(function(){
          var newUploaderItem = new plupload.Uploader($.extend({},_this.setting,_this.siggleSetting,{browse_button:$(this).find('div').attr('id')}));
          newUploaderItem.init();
        })
        //$compile($('.translation').contents())($scope);
        setTimeout(function(){
          _this.checkImportStatus();
        }, 5000);
      }, shopId);
    },
    cancelUpload: function(instanceID, fileID,obj,fileName){//取消上传
      var _this = this;
      var isOrder = /ExportOrderList/.test(fileName);
      var orderName = isOrder ? 'order' : 'item';
      var _parent = $('#'+ fileID).parents('td');
      var swfUploader = $('#' + instanceID);
      var _parentTr = $('#'+ fileID).parents('tr');
      var fileDate = _parentTr.attr('filedate');
      _parentTr.css('background-color', 'red');
      obj.removeFile(fileName);
      $('#'+ fileID).find('.data').html(' - 已取消');
      $('#'+ fileID).find('.uploadify-progress-bar').remove();
      $('#'+ fileID).fadeOut('normal', function() {
        $(this).remove();
      });
      (function checkHide(){
        setTimeout(function(){
          if($('#' + fileID).length){
            checkHide();
          }else{
            if(_parentTr.find('.history-uploadify-queue-item').length){//判断是取消一条，还是删除整行
              if(_parent.find('.uploadify-button').length){
                _parent.find('.uploadify-button').attr('style', '');
              } else {
                if(orderName == 'order'){
                  _parent.find('.uploadify-item-wrap').append('<div id="upload_order'+fileDate+'" class="uploadify-button uploadify-button-sty"  >选择主订单文件</div><div class="uploadify_error"></div>');
                  _this.initOrderUploader('upload_'+ orderName + fileDate);
                }else{
                  _parent.find('.uploadify-item-wrap').append('<div id="upload_item'+fileDate+'" class="uploadify-button uploadify-button-sty"  >选择子订单文件</div><div class="uploadify_error"></div>');
                  _this.initItemUploader('upload_'+ orderName + fileDate);
                }
              }
            }else{
              _parentTr.remove();
            }
          }
        }, 500);
      })();
    },
    changeClass: function(obj){//改变 "批量导入系统" 的颜色
      if(obj.filter(':checked').length){
        $('#import_batch_system').removeClass('btn_disabled');
      }else{
        $('#import_batch_system').addClass('btn_disabled');
      }
    },
    initOrderUploader: function(obj){
      var newUploaderOrder = new plupload.Uploader($.extend({},this.setting,this.siggleSetting,{browse_button:obj}))
      newUploaderOrder.init();
    },
    initItemUploader: function(obj){
      var newUploaderItem = new plupload.Uploader($.extend({},this.setting,this.siggleSetting,{browse_button:obj}))
      newUploaderItem.init();
    },
    delUpload: function(obj){//删除文件
      var _this = this,
        _parent = $(obj).parents('td'),
        _parentTr = $(obj).parents('tr'),
        fileName = _parent.find('.fileName').text(),
        isOrder = /ExportOrderList/.test(fileName),
        orderName = isOrder ? 'order' : 'item',
        fileDate = _parentTr.attr('filedate'),
        flag = isOrder ? 'T' : 'O',
        pkId = $(obj).attr('pkId');
      $(this).Confirm({"title":"确认","str":"确定要删除该文件？","mark":true},function(){
        $(obj).text('删除中...').off('click');
        var param = "pkId=" + pkId + "&fileName=" + fileName + "&flag=" + flag;

        ngHistoryService.deleteFile(function(){
          if(_parentTr.find('.history-uploadify-queue-item').length <= 1){//若该行没有文件了，直接删除改行，否则删除该条数据
            _parentTr.remove();
          }else{
            _parent.find('.history-uploadify-queue-item').remove();

            if(_parent.find('.uploadify-button').length){
              _parent.find('.uploadify-button').attr('style', '');
            }else{
              if(orderName == 'order'){
                _parent.find('.uploadify-item-wrap').append('<div id="upload_order'+fileDate+'" class="uploadify-button uploadify-button-sty"  >选择主订单文件</div><div class="uploadify_error"></div>');
                _this.initOrderUploader('upload_'+ orderName + fileDate);
              }else{
                _parent.find('.uploadify-item-wrap').append('<div id="upload_item'+fileDate+'" class="uploadify-button uploadify-button-sty"  >选择子订单文件</div><div class="uploadify_error"></div>');
                _this.initItemUploader('upload_'+ orderName + fileDate);
              }
            }
            _parentTr.find('.importSystem').html('').end().find(':checkbox').attr({'checked': false, 'disabled': true});
          }
          $(this).yAlert({
              "text": "文件删除成功"
            });
          removeAlert();
        }, param);
      });
    },
    importBatch: function(obj){
      var pkids = '';
      $(this).Confirm({"title":"确认","str":"为了保证数据导入准确，请确认您导入的是<span class='red'>"+ $('#shopinfo span').text() +"</span>店铺的历史数据","mark":true},function(){
        obj.each(function(){
          pkids += $(this).attr('pkid') + ',';
          $(this).attr('isImport', '2').find('.importSystem').html('<div class="loading"><i></i>正在导入...</div>').end()
            .find('.uploadify').uploadify('destroy');//销毁flash
        });
        $.ajax({
          url: GLOBAL_STATIC.datamanageRoot + 'orderimport/importBatch?pkIds=' + pkids.slice(0, -1),
          timeout: 20000
        });
        setTimeout(function(){
          uploadify.checkImportStatus();
        }, 3000);
      });
    },
    checkImportStatus: function(){  //定时检查导入状态
      var pkids = '',
        _this = this,
        _item = $('#upload_wrap tr');
      _item.filter('[isimport=2]').each(function(){
        pkids += $(this).attr('pkid')  + ',';
      });

      if(_this.checkFlag) clearTimeout(_this.checkFlag);

      if(pkids){
        ngHistoryService.checkImportStatus(function(res){
          $.each(res, function(i, n){
            var _parentTr = _item.filter('[pkid='+ n.id +']'),
              _importWrap = _parentTr.find('.importSystem');

            if(n.isImport == 1){
              if(n.isSuccessful){
                _importWrap.html('导入成功' + n.importSuccessfulTotal + '条主订单<span class="ico_tips" ng-title-max="210" dm-title="数据导入成功后大概需要等待一段时间（导入1万条数据大概需要20分钟）才能在营销活动中查询到数据。"></span> <a href="javascript:void(0);" class="showHistoryLog ml5">查看</a>').find('a').click(function(){
                  _this.showHistory(_importWrap.parent().attr('pkId'), $(this));
                });

                $compile(_importWrap.contents())($scope);
                //隐藏删除按钮和禁用checkbox
                _parentTr.attr('isImport', '1').find('.uploadify_del').hide().end().find(':checkbox').attr({'checked': false, 'disabled': true});
              }else{
                _importWrap.html('<span class="red">'+ n.message +'</span>').parent().attr('isImport', '0');
              }
            }
          });

          _this.checkFlag = setTimeout(function(){
            _this.checkImportStatus();
          }, 20000);
        }, pkids);
      }

    },
    showHistory: function(pkId, obj){//查看报告
      var _historyLog = $('#historyLog'),
        _this = this;
      _historyLog.addInteractivePop({magTitle: '导入报告', mark: true, drag: true, width: 760, height: 328, position: 'fixed'});
      if(pkId == _historyLog.attr('pkId')) return false; //查看的是否是刚关闭的报告
      _historyLog.find('tbody').html('');

      if(obj.data('data')){
        _this.creatLogItem(obj.data('data'), pkId);
      }else{
        ngHistoryService.getViewResult(function(res){
          var data = res;
          obj.data('data', data); //缓存查看过的报告数据
          _this.creatLogItem(data, pkId);
        }, pkId);
      }
    },
    creatLogItem: function(data, pkId){//创建查看报告的列表
      console.log($scope.appOrigin)
      console.log(GLOBAL_STATIC.datamanageRoot)
      var _historyLog = $('#historyLog'),
        _this = this;
      _historyLog.attr('pkId', pkId);
      $.each(data, function(i, n){
        var orderName = _this.getTypeName(n.fileType),
          itemName = _this.getTypeName(!n.fileType),
          errorTip = n.importErrTotal ? '<span ng-title-max="204" dm-title="'+ orderName +'报表记录导入失败原因可能是由于淘宝数据缺失导致淘宝'+ orderName +'报表里面的订单在'+ itemName +'报表里面缺失导致的。" style="vertical-align:-1px" class="ico_tips"></span>' : '';
        $('#historyLog').find('tbody').append('<tr>\
          <td>'+ orderName +'报表</td>\
          <td>'+ n.fileName +'</td>\
          <td>'+ n.fileRecordTotal +'条</td>\
          <td>'+ n.importRecordTotal +'条</td>\
          <td>'+ n.importErrTotal +'条'+ errorTip +'</td>\
          <td>'+ (n.importErrTotal ? '<a href="'+ $scope.appOrigin + '/common-component/v1/orderimport/downloadError?pkId='+ pkId +'&fileType='+ (n.fileType ? 'O' : 'T') +'">下载</a>' : '下载') +'</td>\
        </tr>');
      });
      $compile($('#historyLog').contents())($scope);
      _historyLog.resetPostion();
    },
    getTypeName: function(fileType){
      return fileType ? '宝贝' : '订单';
    }
  }


  $scope.init = function(shopId){
    uploadify.getList(shopId);
  }

  var onOff = true;

  //当加载了店铺过后再执行相关操作
  $scope.$watch(function(){return $scope.history.ShopValsView}, function(shops){
    if($scope.history.ShopValsView) {
      // 动态产生uploader ulr
      uploadify.setting.url = GLOBAL_STATIC.datamanageRoot + 'orderimport/save?dpId=' + $scope.history.shops[$scope.history.selectedShopIndex].idInPlat + uploaderParam;
      $scope.init($scope.history.shops[$scope.history.selectedShopIndex].idInPlat);
      if(onOff){
        newUploader = new plupload.Uploader($.extend({},uploadify.setting,{browse_button:'file_upload'}));
        newUploader.init();
        onOff = false;
      } else {
        newUploader.settings.url = uploadify.setting.url;
      }
      //$('#file_upload').uploadify(uploadify.setting);
      $('#show_uploadify').click(uploadify.showDialog);
      $("#ccms_tips").Tips();
      $('#import_batch_system').addClass('btn_disabled');
      //全选
      $('#checkAll').unbind('click');
      $('#checkAll')[0].className = 'cloneCheckbox';
      $('#checkAll').click(function(){
        var isChecked = $('#checkAll').hasClass('cloneCheckboxChecked');
        var _checkbox = $('#upload_wrap tbody').find(':checkbox:enabled');
        $('#checkAll')[0].className = isChecked ? 'cloneCheckbox' : 'cloneCheckbox cloneCheckboxChecked';
        console.log('isChecked:' +  isChecked)
        console.log($('#checkAll')[0].className)
        _checkbox.attr('checked', !isChecked);
        uploadify.changeClass(_checkbox);
      });
      $('#upload_wrap tbody').find(':checkbox').live('change', function(){
        var allCheck = $('#upload_wrap tbody').find(':checkbox:enabled').length;
        var checked = $('#upload_wrap tbody').find(':checkbox:checked').length;
        if(allCheck === checked) {
          $('#checkAll')[0].className = 'cloneCheckbox cloneCheckboxChecked';
        } else if(checked === 0) {
          $('#checkAll')[0].className = 'cloneCheckbox';
        } else {
          $('#checkAll')[0].className = 'cloneCheckbox cloneCheckboxHalfChecked';
        }
        uploadify.changeClass($('#upload_wrap tbody').find(':checkbox'));
      });

      //批量导入系统
      $('#import_batch_system').off('click').click(function(){
        if($(this).hasClass('btn_disabled')) return false;
        uploadify.importBatch($('#upload_wrap tbody').find('tr:has(:checked)'));
      });
    }
  });
}]);
