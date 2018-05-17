(function() {
  'use strict';

  var commser = angular.module('commser', ['basis']);
  commser.provider('$mdCommConf', ['$$interimElementProvider', MdCommConfProvider]);

  function MdCommConfProvider($$interimElementProvider) {

    var CommConfMethods = ['id', 'tip', 'parent', 'title', 'content', 'config'];

    return $$interimElementProvider('$mdCommConf').setDefaults({
      methods: ['targetEvent'],
      options: ['$timeout', '$rootElement', '$compile', '$animate', '$mdUtil', '$$rAF', '$q', '$mdCommConf', commconfDefaultOptions]
    }).addPreset('dicsType', {
      methods: CommConfMethods.concat('select'),
      options: ['mdCommConf', dicsOption]
    }).addPreset('numberType', {
      methods: CommConfMethods,
      options: ['mdCommConf', numberOption]
    }).addPreset('timeType', {
      methods: CommConfMethods,
      options: ['mdCommConf', timeOption]
    }).addPreset('stringType', {
      methods: CommConfMethods,
      options: ['mdCommConf', stringOption]
    });

    /* @ngInject */
    function dicsOption($mdCommConf) {
      return {
        template: ['<div class="condition">', '<label class="down disa-title">{{commconf.title}}<em></em>', '</label>', '<section>', '<span class="firstLine">请选择{{commconf.content}}:</span>', '<select class="commSelect width130" ng-model="commconf.select" ng-options="item.id as item.name for item in commconf.config"><option value="">请选择</option></select>', '<em class="ico_tips" ng-show="commconf.tip" ng-title="{{commconf.tip}}"></em>', '<button class="btn btnBlue commSmallBtn" dics-btn>确定</button>', '</section>', '<label class="edit" style="display:none">', '<span><em class="disa-down"></em><a title=""></a><em class="remove">×</em></span>', '</label>', '</div>'].join(''),
        controller: function mdCommConfCtrl() {
          this.hide = function() {
            $mdCommConf.hide(true);
          };
          this.abort = function() {
            $mdCommConf.cancel();
          };
        },
        controllerAs: 'commconf',
        bindToController: true
      };
    }

    /* @ngInject */
    function stringOption($mdCommConf) {
      return {
        template: ['<div class="condition">', '<label class="down disa-title">{{commconf.title}}<em></em>', '</label>', '<section  >', '<span class="firstLine">请输入{{commconf.content}}:</span>', '<input type="text" class="borderHighlight w130 mr5" maxlength="{{commconf.config.StringLengthLimit}}" value="{{commconf.start}}" ng-model="commconf.start">', '<em class="ico_tips" ng-show="commconf.tip" ng-title="{{commconf.tip}}"></em>', '<button class="btn btnBlue commSmallBtn" string-btn>确定</button>', '</section>', '<label class="edit" style="display:none">', '<span><em class="disa-down"></em><a title="">{{commconf.start}}</a><em class="remove">×</em></span>', '</label>', '</div>'].join(''),
        controller: function mdCommConfCtrl() {
          this.hide = function() {
            $mdCommConf.hide(true);
          };
          this.abort = function() {
            $mdCommConf.cancel();
          };
        },
        controllerAs: 'commconf',
        bindToController: true
      };
    }

    function timeOption($mdCommConf) {
      return {
        template: ['<div>', '<label class="down disa-title">{{commconf.title}}<em></em>', '</label>', '<section>', '<span class="firstLine">请输入{{commconf.title}}:</span>', '<input type="text"  class="required borderHighlight w150 mr5" ng-model="commconf.start" ng-date-picker-second readonly="true"> ', '<span class="m">-</span>', '<input type="text"  class="required borderHighlight w150 mr5" ng-model="commconf.end" ng-date-picker-second readonly="true">', "<em class='ico_tips' ng-show='commconf.tip' ng-title='{{commconf.tip}}'></em>", '<button class="btn btnBlue commSmallBtn" time-btn>确定</button>', '</section>', '<label class="edit" style="display:none">', '<span><em class="disa-down"></em><a href="###"></a><em class="remove">×</em></span>', '</label>', '</div>'].join(''),
        controller: function mdCommConfCtrl() {
          this.hide = function() {
            $mdCommConf.hide(true);
          };
          this.abort = function() {
            $mdCommConf.cancel();
          };
        },
        controllerAs: 'commconf',
        bindToController: true
      };
    }

    /* @ngInject */
    function numberOption($mdCommConf) {
      return {
        template: ['<div class="condition">', '<label class="down disa-title" >{{commconf.title}}<em></em>', '</label>', '<section>', '<span class="firstLine">请输入{{commconf.content}}:</span>', '<input type="text" num-valid value="{{commconf.start}}" ng-model="commconf.start" class="borderHighlight w50 mr5">-', '<input type="text" num-valid value="{{commconf.end}}" ng-model="commconf.end" class="borderHighlight w50 mr5" style="margin-left:5px" >', '<em class="ico_tips" ng-show="commconf.tip" ng-title="{{commconf.tip}}"></em>', '<button class="btn btnBlue commSmallBtn" number-btn >确定</button>', '</section>', '<label class="edit" style="display:none">', '<span><em class="disa-down"></em><a title=""></a><em class="remove">×</em></span>', '</label>', '</div>'].join(''),
        controller: function mdCommConfCtrl() {
          this.hide = function() {
            $mdCommConf.hide(true);
          };
          this.abort = function() {
            $mdCommConf.cancel();
          };
        },
        controllerAs: 'commconf',
        bindToController: true
      };
    }

    /* @ngInject */
    function commconfDefaultOptions($timeout, $rootElement, $compile, $animate, $mdUtil, $$rAF, $q, $mdCommConf) {
      return {
        hasBackdrop: true,
        isolateScope: true,
        onShow: onShow,
        onRemove: onRemove,
        clickOutsideToClose: true,
        escapeToClose: true,
        targetEvent: null
      };

      // On show method for CommConfs
      function onShow(scope, element, options) {
        // Incase the user provides a raw dom element, always wrap it in jqLite
        //options.parent = angular.element(options.parent);
        options.parent = angular.element('#condition');

        options.popInTarget = angular.element((options.targetEvent || {}).target);

        return commconfPopIn(scope, element, options.parent, options.popInTarget.length && options.popInTarget);

      }

      // On remove function for all commconfs
      function onRemove(scope, element, options) {
        var defered = $q.defer();

        if (options.backdrop) {
          $animate.leave(options.backdrop);
          element.data('backdrop', undefined);
        }
        if (options.escapeToClose) {
          $rootElement.off('keyup', options.rootElementKeyupCallback);
        }
        if (options.clickOutsideToClose) {
          element.off('click', options.commconfClickOutsideCallback);
        }
        element.remove();
        options.popInTarget && options.popInTarget.focus();
        defered.resolve();
        return defered.promise;
      }

      function commconfPopIn(scope, element, parentElement, clickElement) {
        var deferred = $q.defer();
        parentElement.prepend(element);

        $(element.find('.disa-title')).on('click',
            function(e) {
              var currTarget = e.currentTarget;
              if ($(currTarget).hasClass('down')) {
                element.siblings().each(function(index, item) {
                  var button = item.querySelector('button');
                  button ? button.click() : angular.noop();
                });
                element.find('section').show();
                $(element.find('.disa-title')).show().addClass('up').removeClass('down');
                $(element.find('.edit')).hide();
              } else {
                if (scope.commconf.subF) {
                  $(element.find('.edit')).show();
                  $(element.find('.disa-title')).hide();
                } else {
                  $(element.find('.edit')).hide();
                  $(element.find('.disa-title')).show();
                }
                element.find('section').hide();
                $(element.find('.disa-title')).addClass('down').removeClass('up');
              }
            });

        element.find('.edit').on('click', function(e) {
          var removeEle = element.find('.remove');
          var target = e.currentTarget;

          element.siblings().each(function(index, item) {
            var button = item.querySelector('button');
            button ? button.click() : angular.noop();
          });

          if (target !== removeEle) {
            element.find('section').show();
            $(element.find('.disa-title')).show().addClass('up').removeClass('down');
            $(element.find('.edit')).hide();
          }
        });

        element.find('.remove').on('click', function(e) {
          $(element.find('.edit')).hide();
          $(element.find('.disa-title')).show().addClass('down').removeClass('up');
          scope.$apply(function() {
            scope.commconf.start = '';
            scope.commconf.end = '';
            scope.commconf.select = '';
            element.find('input').each(function(index, item) {
              item.value = '';
            });
            scope.commconf.subF = false;
          });
        });

        return deferred.promise;
      }
    }
  }
})();