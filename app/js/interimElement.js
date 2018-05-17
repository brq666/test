(function() {
'use strict';
var commser = angular.module('basis', []);

commser
  .config(['$provide', MdCoreConfigure])
  .service('$mdCompiler', ['$q', '$http', '$injector', '$compile', '$controller', '$templateCache', mdCompilerService])
  .provider('$$interimElement', InterimElementProvider)
  .factory('$mdUtil', ['$cacheFactory', function($cacheFactory) {
  var Util;
  return Util = {
  now: window.performance ? angular.bind(window.performance, window.performance.now) : Date.now,

  /**
   * Publish the iterator facade to easily support iteration and accessors
   * @see iterator below
   */
  iterator: iterator,

  /**
   * @see cacheFactory below
   */
  cacheFactory: cacheFactory,

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce: function debounce(func, wait, immediate) {
    var timeout;
    return function debounced() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  },

  // Returns a function that can only be triggered every `delay` milliseconds.
  // In other words, the function will not be called unless it has been more
  // than `delay` milliseconds since the last call.
  throttle: function throttle(func, delay) {
    var recent;
    return function throttled() {
      var context = this;
      var args = arguments;
      var now = Util.now();

      if (!recent || recent - now > delay) {
        func.apply(context, args);
        recent = now;
      }
    };
  },

  /**
   * nextUid, from angular.js.
   * A consistent way of creating unique IDs in angular. The ID is a sequence of alpha numeric
   * characters such as '012ABC'. The reason why we are not using simply a number counter is that
   * the number string gets longer over time, and it can also overflow, where as the nextId
   * will grow much slower, it is a string, and it will never overflow.
   *
   * @returns an unique alpha-numeric string
   */
  nextUid: function() {
    var index = nextUniqueId.length;
    var digit;

    while(index) {
      index--;
      digit = nextUniqueId[index].charCodeAt(0);
      if (digit == 57 /*'9'*/) {
        nextUniqueId[index] = 'A';
        return nextUniqueId.join('');
      }
      if (digit == 90  /*'Z'*/) {
        nextUniqueId[index] = '0';
      } else {
        nextUniqueId[index] = String.fromCharCode(digit + 1);
        return nextUniqueId.join('');
      }
    }
    nextUniqueId.unshift('0');
    return nextUniqueId.join('');
  },

  // Stop watchers and events from firing on a scope without destroying it,
  // by disconnecting it from its parent and its siblings' linked lists.
  disconnectScope: function disconnectScope(scope) {
    if (!scope) return;

    // we can't destroy the root scope or a scope that has been already destroyed
    if (scope.$root === scope) return;
    if (scope.$$destroyed ) return;

    var parent = scope.$parent;
    scope.$$disconnected = true;

    // See Scope.$destroy
    if (parent.$$childHead === scope) parent.$$childHead = scope.$$nextSibling;
    if (parent.$$childTail === scope) parent.$$childTail = scope.$$prevSibling;
    if (scope.$$prevSibling) scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
    if (scope.$$nextSibling) scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;

    scope.$$nextSibling = scope.$$prevSibling = null;

  },

  // Undo the effects of disconnectScope above.
  reconnectScope: function reconnectScope(scope) {
    if (!scope) return;

    // we can't disconnect the root node or scope already disconnected
    if (scope.$root === scope) return;
    if (!scope.$$disconnected) return;

    var child = scope;

    var parent = child.$parent;
    child.$$disconnected = false;
    // See Scope.$new for this logic...
    child.$$prevSibling = parent.$$childTail;
    if (parent.$$childHead) {
      parent.$$childTail.$$nextSibling = child;
      parent.$$childTail = child;
    } else {
      parent.$$childHead = parent.$$childTail = child;
    }
  }
  };

  /*
  * iterator is a list facade to easily support iteration and accessors
  *
  * @param items Array list which this iterator will enumerate
  * @param reloop Boolean enables iterator to consider the list as an endless reloop
  */
  function iterator(items, reloop) {
  var trueFn = function() { return true; };

  reloop = !!reloop;
  var _items = items || [ ];

  // Published API
  return {
    items: getItems,
    count: count,

    inRange: inRange,
    contains: contains,
    indexOf: indexOf,
    itemAt: itemAt,

    findBy: findBy,

    add: add,
    remove: remove,

    first: first,
    last: last,
    next: next,
    previous: previous,

    hasPrevious: hasPrevious,
    hasNext: hasNext

  };

  /*
   * Publish copy of the enumerable set
   * @returns {Array|*}
   */
  function getItems() {
    return [].concat(_items);
  }

  /*
   * Determine length of the list
   * @returns {Array.length|*|number}
   */
  function count() {
    return _items.length;
  }

  /*
   * Is the index specified valid
   * @param index
   * @returns {Array.length|*|number|boolean}
   */
  function inRange(index) {
    return _items.length && ( index > -1 ) && (index < _items.length );
  }

  /*
   * Can the iterator proceed to the next item in the list; relative to
   * the specified item.
   *
   * @param item
   * @returns {Array.length|*|number|boolean}
   */
  function hasNext(item) {
    return item ? inRange(indexOf(item) + 1) : false;
  }

  /*
   * Can the iterator proceed to the previous item in the list; relative to
   * the specified item.
   *
   * @param item
   * @returns {Array.length|*|number|boolean}
   */
  function hasPrevious(item) {
    return item ? inRange(indexOf(item) - 1) : false;
  }

  /*
   * Get item at specified index/position
   * @param index
   * @returns {*}
   */
  function itemAt(index) {
    return inRange(index) ? _items[index] : null;
  }

  /*
   * Find all elements matching the key/value pair
   * otherwise return null
   *
   * @param val
   * @param key
   *
   * @return array
   */
  function findBy(key, val) {
    return _items.filter(function(item) {
      return item[key] === val;
    });
  }

  /*
   * Add item to list
   * @param item
   * @param index
   * @returns {*}
   */
  function add(item, index) {
    if ( !item ) return -1;

    if (!angular.isNumber(index)) {
      index = _items.length;
    }

    _items.splice(index, 0, item);

    return indexOf(item);
  }

  /*
   * Remove item from list...
   * @param item
   */
  function remove(item) {
    if ( contains(item) ){
      _items.splice(indexOf(item), 1);
    }
  }

  /*
   * Get the zero-based index of the target item
   * @param item
   * @returns {*}
   */
  function indexOf(item) {
    return _items.indexOf(item);
  }

  /*
   * Boolean existence check
   * @param item
   * @returns {boolean}
   */
  function contains(item) {
    return item && (indexOf(item) > -1);
  }

  /*
   * Find the next item. If reloop is true and at the end of the list, it will
   * go back to the first item. If given ,the `validate` callback will be used
   * determine whether the next item is valid. If not valid, it will try to find the
   * next item again.
   * @param item
   * @param {optional} validate
   * @returns {*}
   */
  function next(item, validate) {
    validate = validate || trueFn;

    if (contains(item)) {
      var index = indexOf(item) + 1,
      found = inRange(index) ? _items[ index ] : (reloop ? first() : null);

      return validate(found) ? found : next(found, validate);
    }

    return null;
  }

  /*
   * Find the previous item. If reloop is true and at the beginning of the list, it will
   * go back to the last item. If given ,the `validate` callback will be used
   * determine whether the previous item is valid. If not valid, it will try to find the
   * previous item again.
   * @param item
   * @param {optional} validate
   * @returns {*}
   */
  function previous(item, validate) {
    validate = validate || trueFn;

    if (contains(item)) {
      var index = indexOf(item) - 1,
      found = inRange(index) ? _items[ index ] : (reloop ? last() : null);

      return validate(found) ? found : previous(found, validate);
    }

    return null;
  }

  /*
   * Return first item in the list
   * @returns {*}
   */
  function first() {
    return _items.length ? _items[0] : null;
  }

  /*
   * Return last item in the list...
   * @returns {*}
   */
  function last() {
    return _items.length ? _items[_items.length - 1] : null;
  }
  }

  /*
  * Angular's $cacheFactory doesn't have a keys() method,
  * so we add one ourself.
  */
  function cacheFactory(id, options) {
  var cache = $cacheFactory(id, options);

  var keys = {};
  cache._put = cache.put;
  cache.put = function(k,v) {
    keys[k] = true;
    return cache._put(k, v);
  };
  cache._remove = cache.remove;
  cache.remove = function(k) {
    delete keys[k];
    return cache._remove(k);
  };

  cache.keys = function() {
    return Object.keys(keys);
  };

  return cache;
  }
  }]);

function MdCoreConfigure($provide) {
  $provide.decorator('$$rAF', ['$delegate', '$rootScope', rAFDecorator]);

  function rAFDecorator($$rAF, $rootScope) {
    /**
     * Use this to debounce events that come in often.
     * The debounced function will always use the *last* invocation before the
     * coming frame.
     *
     * For example, window resize events that fire many times a second:
     * If we set to use an raf-debounced callback on window resize, then
     * our callback will only be fired once per frame, with the last resize
     * event that happened before that frame.
     *
     * @param {function} callback function to debounce
     */
    $$rAF.debounce = function(cb) {
      var queueArgs, alreadyQueued, queueCb, context;
      return function debounced() {
        queueArgs = arguments;
        context = this;
        queueCb = cb;
        if (!alreadyQueued) {
          alreadyQueued = true;
          $$rAF(function() {
            queueCb.apply(context, queueArgs);
            alreadyQueued = false;
          });
        }
      };
    };
    return $$rAF;

  }

}

function mdCompilerService($q, $http, $injector, $compile, $controller, $templateCache) {

  this.compile = function(options) {
    var templateUrl = options.templateUrl;
    var template = options.template || '';
    var controller = options.controller;
    var controllerAs = options.controllerAs;
    var resolve = options.resolve || {};
    var locals = options.locals || {};
    var transformTemplate = options.transformTemplate || angular.identity;
    var bindToController = options.bindToController;

    // Take resolve values and invoke them.
    // Resolves can either be a string (value: 'MyRegisteredAngularConst'),
    // or an invokable 'factory' of sorts: (value: function ValueGetter($dependency) {})
    angular.forEach(resolve, function(value, key) {
      if (angular.isString(value)) {
        resolve[key] = $injector.get(value);
      } else {
        resolve[key] = $injector.invoke(value);
      }
    });
    //Add the locals, which are just straight values to inject
    //eg locals: { three: 3 }, will inject three into the controller
    angular.extend(resolve, locals);

    if (templateUrl) {
      resolve.$template = $http.get(templateUrl, {cache: $templateCache})
        .then(function(response) {
          return response.data;
        });
    } else {
      resolve.$template = $q.when(template);
    }

    // Wait for all the resolves to finish if they are promises
    return $q.all(resolve).then(function(locals) {

      var template = transformTemplate(locals.$template);
      var element = angular.element('<div>').html(template).contents();
      var linkFn = $compile(element);

      //Return a linking function that can be used later when the element is ready
      return {
        locals: locals,
        element: element,
        link: function link(scope) {
          locals.$scope = scope;

          //Instantiate controller if it exists, because we have scope
          if (controller) {
            var ctrl = $controller(controller, locals);
            if (bindToController) {
              angular.extend(ctrl, locals);
            }
            //See angular-route source for this logic
            element.data('$ngControllerController', ctrl);
            element.children().data('$ngControllerController', ctrl);

            if (controllerAs) {
              scope[controllerAs] = ctrl;
            }
          }

          return linkFn(scope);
        }
      };
    });

  };
}

function InterimElementProvider() {
  createInterimElementProvider.$get = ['$document', '$q', '$rootScope', '$timeout', '$rootElement', '$animate', '$mdCompiler', InterimElementFactory];
  return createInterimElementProvider;

  function createInterimElementProvider(interimFactoryName) {
    var providerConfig = {
      presets: {}
    };
    var provider = {
      setDefaults: setDefaults,
      addPreset: addPreset,
      $get: ['$$interimElement', '$animate', '$injector', factory]
    };

    /**
     * all interim elements will come with the 'build' preset
     */
    provider.addPreset('build', {
      methods: ['controller', 'controllerAs', 'onRemove', 'onShow', 'resolve',
        'template', 'templateUrl', 'themable', 'transformTemplate', 'parent']
    });

    return provider;

    /**
     * Save the configured defaults to be used when the factory is instantiated
     */
    function setDefaults(definition) {
      providerConfig.optionsFactory = definition.options;
      providerConfig.methods = definition.methods;
      return provider;
    }
    /**
     * Save the configured preset to be used when the factory is instantiated
     */
    function addPreset(name, definition) {
      definition = definition || {};
      definition.methods = definition.methods || [];
      definition.options = definition.options || function() { return {}; };

      if (/^cancel|hide|show$/.test(name)) {
        throw new Error("Preset '" + name + "' in " + interimFactoryName + " is reserved!");
      }
      if (definition.methods.indexOf('_options') > -1) {
        throw new Error("Method '_options' in " + interimFactoryName + " is reserved!");
      }
      providerConfig.presets[name] = {
        methods: definition.methods,
        optionsFactory: definition.options
      };
      return provider;
    }

    /**
     * Create a factory that has the given methods & defaults implementing interimElement
     */
    /* @ngInject */
    function factory($$interimElement, $animate, $injector) {
      var defaultMethods;
      var defaultOptions;
      var interimElementService = $$interimElement();

      /*
       * publicService is what the developer will be using.
       * It has methods hide(), cancel(), show(), build(), and any other
       * presets which were set during the config phase.
       */
      var publicService = {
        hide: interimElementService.hide,
        cancel: interimElementService.cancel,
        getConf: interimElementService.getConf,
        clearConf: interimElementService.clearConf,
        show: showInterimElement
      };

      defaultMethods = providerConfig.methods || [];
      // This must be invoked after the publicService is initialized
      defaultOptions = invokeFactory(providerConfig.optionsFactory, {});

      angular.forEach(providerConfig.presets, function(definition, name) {
        var presetDefaults = invokeFactory(definition.optionsFactory, {});
        var presetMethods = (definition.methods || []).concat(defaultMethods);

        angular.extend(presetDefaults, { $type: name });

        function Preset(opts) {
          this._options = angular.extend({}, presetDefaults, opts);
        }
        angular.forEach(presetMethods, function(name) {
          Preset.prototype[name] = function(value) {
            this._options[name] = value;
            return this;
          };
        });

        // eg $mdCommConf will return a new alert preset
        publicService[name] = function(options) {
          return new Preset(options);
        };
      });

      return publicService;

      function showInterimElement(opts) {
        // opts is either a preset which stores its options on an _options field,
        // or just an object made up of options
        return interimElementService.show(
          angular.extend({}, defaultOptions, (opts || {})._options || opts)
        );
      }

      /**
       * Helper to call $injector.invoke with a local of the factory name for
       * this provider.
       * If an $mdCommConf is providing options for a CommConf and tries to inject
       * $mdCommConf, a circular dependency error will happen.
       * We get around that by manually injecting $mdCommConf as a local.
       */
      function invokeFactory(factory, defaultVal) {
        var locals = {};
        locals[interimFactoryName] = publicService;
        return $injector.invoke(factory || function() { return defaultVal; }, {}, locals);
      }

    }

  }

  /* @ngInject */
  function InterimElementFactory($document, $q, $rootScope, $timeout, $rootElement, $animate, $mdCompiler/*, $mdTheming*/) {

    return function createInterimElementService() {
      /*
       * @ngdoc service
       * @name $$interimElement.$service
       *
       * @description
       * A service used to control inserting and removing an element into the DOM.
       *
       */
      var stack = [];
      var service;
      return service = {
        show: show,
        hide: hide,
        cancel: cancel,
        getConf:getConf,
        clearConf:clearConf
      };

      function clearConf() {
        stack = [];
      }

      function getConf() {
        return stack;
      }

      function show(options) {
        //if (stack.length) {
          //service.cancel();
        //}

        var interimElement = new InterimElement(options);

        stack.push(interimElement);
        return interimElement.show().then(function() {
          return interimElement.deferred.promise;
        });
      }

      /*
       * @ngdoc method
       * @name $$interimElement.$service#hide
       * @kind function
       *
       * @description
       * Removes the `$interimElement` from the DOM and resolves the promise returned from `show`
       *
       * @param {*} resolveParam Data to resolve the promise with
       *
       * @returns undefined data that resolves after the element has been removed.
       *
       */
      function hide(response) {
        var interimElement = stack.shift();
        interimElement && interimElement.remove().then(function() {
          interimElement.deferred.resolve(response);
        });
      }

      /*
       * @ngdoc method
       * @name $$interimElement.$service#cancel
       * @kind function
       *
       * @description
       * Removes the `$interimElement` from the DOM and rejects the promise returned from `show`
       *
       * @param {*} reason Data to reject the promise with
       *
       * @returns undefined
       *
       */
      function cancel(reason) {
        var interimElement = stack.shift();
        interimElement && interimElement.remove().then(function() {
          interimElement.deferred.reject(reason);
        });
      }


      /*
       * Internal Interim Element Object
       * Used internally to manage the DOM element and related data
       */
      function InterimElement(options) {
        var self;
        var hideTimeout, element;

        options = options || {};
        options = angular.extend({
          scope: options.scope || $rootScope.$new(options.isolateScope),
          onShow: function(scope, element, options) {
            return $animate.enter(element, options.parent);
          },
          onRemove: function(scope, element, options) {
            // Element could be undefined if a new element is shown before
            // the old one finishes compiling.
            return element && $animate.leave(element) || $q.when();
          }
        }, options);

        return self = {
          options: options,
          deferred: $q.defer(),
          show: function() {
            return $mdCompiler.compile(options).then(function(compileData) {
              angular.extend(compileData.locals, self.options);

              // Search for parent at insertion time, if not specified
              if (angular.isString(options.parent)) {
                options.parent = angular.element($document[0].querySelector(options.parent));
              } else if (!options.parent) {
                options.parent = $rootElement.find('body');
                if (!options.parent.length) options.parent = $rootElement;
              }

              element = compileData.link(options.scope);
              //if (options.themable) $mdTheming(element);
              var ret = options.onShow(options.scope, element, options);
              return $q.when(ret)
                .then(function(){
                  // Issue onComplete callback when the `show()` finishes
                  (options.onComplete || angular.noop)(options.scope, element, options);
                  startHideTimeout();
                });

              function startHideTimeout() {
                if (options.hideDelay) {
                  hideTimeout = $timeout(service.cancel, options.hideDelay) ;
                }
              }
            });
          },
          cancelTimeout: function() {
            if (hideTimeout) {
              $timeout.cancel(hideTimeout);
              hideTimeout = undefined;
            }
          },
          remove: function() {
            self.cancelTimeout();
            var ret = options.onRemove(options.scope, element, options);
            return $q.when(ret).then(function() {
              options.scope.$destroy();
            });
          }
        };
      }
    };
  }

}

})();
