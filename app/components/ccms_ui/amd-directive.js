/**
 * Created by dupenghui on 2014/9/1.
 */
define(function(require) {
    require("angular")
    var ui_shuyun = angular.module("ui.shuyun", ["ui.shuyun.tpls", "ui.shuyun.progressbar", "ui.shuyun.tabs"]);

    angular.module("ui.shuyun.tpls", ["template/tabs/tab.html", "template/tabs/tabset-titles.html", "template/tabs/tabset.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html"]);

    angular.module('ui.shuyun.progressbar', [])

    .constant('progressConfig', {
        animate: true,
        max: 100
    })

    .controller('ProgressController', ['$scope', '$attrs', 'progressConfig',
        function($scope, $attrs, progressConfig) {
            var self = this,
                animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

            this.bars = [];
            $scope.max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max;

            this.addBar = function(bar, element) {
                if (!animate) {
                    element.css({
                        'transition': 'none'
                    });
                }

                this.bars.push(bar);

                bar.$watch('value', function(value) {
                    bar.percent = +(100 * value / $scope.max).toFixed(2);
                });

                bar.$on('$destroy', function() {
                    element = null;
                    self.removeBar(bar);
                });
            };

            this.removeBar = function(bar) {
                this.bars.splice(this.bars.indexOf(bar), 1);
            };
        }
    ])

    .directive('progress', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            controller: 'ProgressController',
            require: 'progress',
            scope: {},
            templateUrl: 'template/progressbar/progress.html'
        };
    })

    .directive('bar', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^progress',
            scope: {
                value: '=',
                type: '@'
            },
            templateUrl: 'template/progressbar/bar.html',
            link: function(scope, element, attrs, progressCtrl) {
                progressCtrl.addBar(scope, element);
            }
        };
    })

    .directive('progressbar', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            controller: 'ProgressController',
            scope: {
                value: '=',
                type: '@'
            },
            templateUrl: 'template/progressbar/progressbar.html',
            link: function(scope, element, attrs, progressCtrl) {
                progressCtrl.addBar(scope, angular.element(element.children()[0]));
            }
        };
    });

    angular.module("template/progressbar/bar.html", []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/progressbar/bar.html",
                "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>");
        }
    ]);

    angular.module("template/progressbar/progress.html", []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/progressbar/progress.html",
                "<div class=\"progress\" ng-transclude></div>");
        }
    ]);

    angular.module("template/progressbar/progressbar.html", []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/progressbar/progressbar.html",
                "<div class=\"progress\">\n" +
                "  <!--[if !IE8]>-->" +
                "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
                "  <!--<![endif]-->\n" +
                "  <!--[if IE8]>\n" +
                "  <div class=\"progress-bar\" style=\"width:{{value}}%;\"></div>\n" +
                "  <![endif]-->\n" +
                "</div>");
        }
    ]);


    angular.module('ui.shuyun.tabs', [])

    .controller('TabsetController', ['$scope',
        function TabsetCtrl($scope) {
            var ctrl = this,
                tabs = ctrl.tabs = $scope.tabs = [];

            ctrl.select = function(selectedTab) {
                angular.forEach(tabs, function(tab) {
                    if (tab.active && tab !== selectedTab) {
                        tab.active = false;
                        tab.onDeselect();
                    }
                });
                selectedTab.active = true;
                selectedTab.onSelect();
            };

            ctrl.addTab = function addTab(tab) {
                tabs.push(tab);
                // we can't run the select function on the first tab
                // since that would select it twice
                if (tabs.length === 1) {
                    tab.active = true;
                } else if (tab.active) {
                    ctrl.select(tab);
                }
            };

            ctrl.removeTab = function removeTab(tab) {
                var index = tabs.indexOf(tab);
                //Select a new tab if the tab to be removed is selected
                if (tab.active && tabs.length > 1) {
                    //If this is the last tab, select the previous tab. else, the next tab.
                    var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
                    ctrl.select(tabs[newActiveIndex]);
                }
                tabs.splice(index, 1);
            };
        }
    ])

    .directive('tabset', function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                type: '@'
            },
            controller: 'TabsetController',
            templateUrl: 'template/tabs/tabset.html',
            link: function(scope, element, attrs) {
                scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
                scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
            }
        };
    })

    .directive('tab', ['$parse',
        function($parse) {
            return {
                require: '^tabset',
                restrict: 'EA',
                replace: true,
                templateUrl: 'template/tabs/tab.html',
                transclude: true,
                scope: {
                    active: '=?',
                    heading: '@',
                    onSelect: '&select', //This callback is called in contentHeadingTransclude
                    //once it inserts the tab's content into the dom
                    onDeselect: '&deselect'
                },
                controller: function() {
                    //Empty controller so other directives can require being 'under' a tab
                },
                compile: function(elm, attrs, transclude) {
                    return function postLink(scope, elm, attrs, tabsetCtrl) {
                        scope.$watch('active', function(active) {
                            if (active) {
                                tabsetCtrl.select(scope);
                            }
                        });

                        scope.disabled = false;
                        if (attrs.disabled) {
                            scope.$parent.$watch($parse(attrs.disabled), function(value) {
                                scope.disabled = !!value;
                            });
                        }

                        scope.select = function() {
                            if (!scope.disabled) {
                                scope.active = true;
                            }
                        };

                        tabsetCtrl.addTab(scope);
                        scope.$on('$destroy', function() {
                            tabsetCtrl.removeTab(scope);
                        });

                        //We need to transclude later, once the content container is ready.
                        //when this link happens, we're inside a tab heading.
                        scope.$transcludeFn = transclude;
                    };
                }
            };
        }
    ])

    .directive('tabHeadingTransclude', [
        function() {
            return {
                restrict: 'A',
                require: '^tab',
                link: function(scope, elm, attrs, tabCtrl) {
                    scope.$watch('headingElement', function updateHeadingElement(heading) {
                        if (heading) {
                            elm.html('');
                            elm.append(heading);
                        }
                    });
                }
            };
        }
    ])

    .directive('tabContentTransclude', function() {
        return {
            restrict: 'A',
            require: '^tabset',
            link: function(scope, elm, attrs) {
                var tab = scope.$eval(attrs.tabContentTransclude);

                //Now our tab is ready to be transcluded: both the tab heading area
                //and the tab content area are loaded.  Transclude 'em both.
                tab.$transcludeFn(tab.$parent, function(contents) {
                    angular.forEach(contents, function(node) {
                        if (isTabHeading(node)) {
                            //Let tabHeadingTransclude know.
                            tab.headingElement = node;
                        } else {
                            elm.append(node);
                        }
                    });
                });
            }
        };

        function isTabHeading(node) {
            return node.tagName && (
                node.hasAttribute('tab-heading') ||
                node.hasAttribute('data-tab-heading') ||
                node.tagName.toLowerCase() === 'tab-heading' ||
                node.tagName.toLowerCase() === 'data-tab-heading'
            );
        }
    });

    angular.module("template/tabs/tab.html", []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/tabs/tab.html",
                "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
                "  <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
                "</li>\n" +
                "");
        }
    ]);

    angular.module("template/tabs/tabset-titles.html", []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/tabs/tabset-titles.html",
                "<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n" +
                "</ul>\n" +
                "");
        }
    ]);

    angular.module("template/tabs/tabset.html", []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/tabs/tabset.html",
                "\n" +
                "<div>\n" +
                "  <ul class=\"clearfix Tab_title\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
                "  <div class=\"tab-content\">\n" +
                "    <div class=\"tab-pane\" \n" +
                "         ng-repeat=\"tab in tabs\" \n" +
                "         ng-class=\"{active: tab.active}\"\n" +
                "         tab-content-transclude=\"tab\">\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>\n" +
                "");
        }
    ]);
    return ui_shuyun
})
