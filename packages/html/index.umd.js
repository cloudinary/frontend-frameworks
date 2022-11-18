(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CloudinaryHtml = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var lodash_clonedeep = {exports: {}};

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	(function (module, exports) {
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    getPrototype = overArg(Object.getPrototypeOf, Object),
	    objectCreate = Object.create,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols,
	    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	    nativeKeys = overArg(Object.keys, Object);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = cloneDeep;
	}(lodash_clonedeep, lodash_clonedeep.exports));

	var cloneDeep = lodash_clonedeep.exports;

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	/**
	 * Iterate through plugins and break in cases where the response is canceled. The
	 * response is canceled if component is updated or unmounted
	 * @param element {HTMLImageElement|HTMLVideoElement} Html Image or Video element
	 * @param pluginCloudinaryAsset {CloudinaryImage|CloudinaryVideo} The Cloudinary asset generated by base
	 * @param plugins {plugins} array of plugins passed in by the user
	 * @param pluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions
	 */
	function render(element, pluginCloudinaryAsset, plugins, pluginState) {
	    return __awaiter(this, void 0, void 0, function () {
	        var i, response;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    if (plugins === undefined)
	                        return [2 /*return*/];
	                    i = 0;
	                    _a.label = 1;
	                case 1:
	                    if (!(i < plugins.length)) return [3 /*break*/, 4];
	                    return [4 /*yield*/, plugins[i](element, pluginCloudinaryAsset, pluginState)];
	                case 2:
	                    response = _a.sent();
	                    if (response === 'canceled') {
	                        return [3 /*break*/, 4];
	                    }
	                    _a.label = 3;
	                case 3:
	                    i++;
	                    return [3 /*break*/, 1];
	                case 4: return [2 /*return*/];
	            }
	        });
	    });
	}

	var HtmlImageLayer = /** @class */ (function () {
	    function HtmlImageLayer(element, userCloudinaryImage, plugins, analyticsOptions) {
	        var _this = this;
	        this.imgElement = element;
	        this.htmlPluginState = { cleanupCallbacks: [], pluginEventSubscription: [] };
	        var pluginCloudinaryImage = cloneDeep(userCloudinaryImage);
	        render(element, pluginCloudinaryImage, plugins, this.htmlPluginState)
	            .then(function () {
	            _this.htmlPluginState.pluginEventSubscription.forEach(function (fn) { fn(); });
	            _this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL({
	                trackedAnalytics: {
	                    sdkCode: analyticsOptions.sdkCode,
	                    sdkSemver: analyticsOptions.sdkSemver,
	                    techVersion: analyticsOptions.techVersion,
	                }
	            }));
	        });
	    }
	    /**
	     * Called when component is updated and re-triggers render
	     * @param userCloudinaryImage
	     * @param plugins
	     * @param analyticsOptions
	     */
	    HtmlImageLayer.prototype.update = function (userCloudinaryImage, plugins, analyticsOptions) {
	        var _this = this;
	        var pluginCloudinaryImage = cloneDeep(userCloudinaryImage);
	        render(this.imgElement, pluginCloudinaryImage, plugins, this.htmlPluginState)
	            .then(function () {
	            _this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL({
	                trackedAnalytics: {
	                    sdkCode: analyticsOptions.sdkCode,
	                    sdkSemver: analyticsOptions.sdkSemver,
	                    techVersion: analyticsOptions.techVersion,
	                }
	            }));
	        });
	    };
	    return HtmlImageLayer;
	}());

	/**
	 * @summary SDK
	 * @memberOf SDK
	 */
	class QualifierValue {
	    /**
	     *
	     * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
	     */
	    constructor(qualifierValue) {
	        this.values = [];
	        this.delimiter = ':'; // {value}{delimiter}{value}...
	        if (this.hasValue(qualifierValue)) {
	            this.addValue(qualifierValue);
	        }
	    }
	    /**
	     * @description Joins the provided values with the provided delimiter
	     */
	    toString() {
	        return this.values.join(this.delimiter);
	    }
	    /**
	     * @description Checks if the provided argument has a value
	     * @param {any} v
	     * @private
	     * @return {boolean}
	     */
	    hasValue(v) {
	        return typeof v !== 'undefined' && v !== null && v !== '';
	    }
	    /**
	     * @desc Adds a value for the this qualifier instance
	     * @param {any} value
	     * @return {this}
	     */
	    addValue(value) {
	        // Append value or array of values
	        if (Array.isArray(value)) {
	            this.values = this.values.concat(value);
	        }
	        else {
	            this.values.push(value);
	        }
	        // Remove falsy values
	        this.values = this.values.filter((v) => this.hasValue(v));
	        return this;
	    }
	    /**
	     * @description Sets the delimiter for this instance
	     * @param delimiter
	     */
	    setDelimiter(delimiter) {
	        this.delimiter = delimiter;
	        return this;
	    }
	}

	class UnsupportedError extends Error {
	    constructor(message = 'Unsupported') {
	        super(message);
	    }
	}
	/**
	 * Creates a new UnsupportedError
	 * @param message
	 */
	function createUnsupportedError(message) {
	    return new UnsupportedError(message);
	}

	/**
	 * Returns the action's model
	 */
	function qualifierToJson() {
	    return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
	}

	class QualifierModel {
	    constructor() {
	        this._qualifierModel = {};
	    }
	    toJson() {
	        return qualifierToJson.apply(this);
	    }
	}

	/**
	 * @summary SDK
	 * @memberOf SDK
	 */
	class Qualifier extends QualifierModel {
	    constructor(key, qualifierValue) {
	        super();
	        this.delimiter = '_'; // {key}{delimiter}{qualifierValue}
	        this.key = key;
	        if (qualifierValue instanceof QualifierValue) {
	            this.qualifierValue = qualifierValue;
	        }
	        else {
	            this.qualifierValue = new QualifierValue();
	            this.qualifierValue.addValue(qualifierValue);
	        }
	    }
	    toString() {
	        const { key, delimiter, qualifierValue } = this;
	        return `${key}${delimiter}${qualifierValue.toString()}`;
	    }
	    addValue(value) {
	        this.qualifierValue.addValue(value);
	        return this;
	    }
	}

	/**
	 * @memberOf Qualifiers.Flag
	 * @extends {SDK.Qualifier}
	 * @description the FlagQualifier class
	 */
	class FlagQualifier extends Qualifier {
	    constructor(flagType, flagValue) {
	        let qualifierValue;
	        if (flagValue) {
	            qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(':');
	        }
	        else {
	            qualifierValue = flagType;
	        }
	        super('fl', qualifierValue);
	        this.flagValue = flagValue;
	    }
	    toString() {
	        return super.toString().replace(/\./, '%2E');
	    }
	    getFlagValue() {
	        return this.flagValue;
	    }
	}

	/**
	 * Sort a map by key
	 * @private
	 * @param map <string, any>
	 * @Return array of map's values sorted by key
	 */
	function mapToSortedArray(map, flags) {
	    const array = Array.from(map.entries());
	    // objects from the Array.from() method above are stored in array of arrays:
	    // [[qualifierKey, QualifierObj], [qualifierKey, QualifierObj]]
	    // Flags is an array of FlagQualifierObj
	    // We need to convert it to the same form: [flagQualifier] =>  ['fl', flagQualifier]
	    flags.forEach((flag) => {
	        array.push(['fl', flag]); // push ['fl', flagQualifier]
	    });
	    return array.sort().map((v) => v[1]);
	}

	/**
	 * Returns the action's model
	 */
	function actionToJson() {
	    const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
	    if (actionModelIsNotEmpty) {
	        return this._actionModel;
	    }
	    return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
	}

	class ActionModel {
	    constructor() {
	        this._actionModel = {};
	    }
	    toJson() {
	        return actionToJson.apply(this);
	    }
	}

	/**
	 * @summary SDK
	 * @memberOf SDK
	 * @description Defines the category of transformation to perform.
	 */
	class Action extends ActionModel {
	    constructor() {
	        super(...arguments);
	        // We're using map, to overwrite existing keys. for example:
	        // addParam(w_100).addQualifier(w_200) should result in w_200. and not w_100,w_200
	        this.qualifiers = new Map();
	        // Unlike regular qualifiers, there can be multiple flags in each url component /fl_1,fl_2/
	        // If the falgs are added to the qualifiers map, only a single flag could exist in a component (it's a map)
	        // So flags are stored separately until the very end because of that reason
	        this.flags = [];
	        this.delimiter = ','; // {qualifier}{delimiter}{qualifier} for example: `${'w_100'}${','}${'c_fill'}`
	        this.actionTag = ''; // A custom name tag to identify this action in the future
	    }
	    prepareQualifiers() { }
	    /**
	     * @description Returns the custom name tag that was given to this action
	     * @return {string}
	     */
	    getActionTag() {
	        return this.actionTag;
	    }
	    /**
	     * @description Sets the custom name tag for this action
	     * @return {this}
	     */
	    setActionTag(tag) {
	        this.actionTag = tag;
	        return this;
	    }
	    /**
	     * @description Calls toString() on all child qualifiers (implicitly by using .join()).
	     * @return {string}
	     */
	    toString() {
	        this.prepareQualifiers();
	        return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
	    }
	    /**
	     * @description Adds the parameter to the action.
	     * @param {SDK.Qualifier} qualifier
	     * @return {this}
	     */
	    addQualifier(qualifier) {
	        // if string, find the key and value
	        if (typeof qualifier === 'string') {
	            const [key, value] = qualifier.toLowerCase().split('_');
	            if (key === 'fl') {
	                // if string qualifier is a flag, store it in the flags arrays
	                this.flags.push(new FlagQualifier(value));
	            }
	            else {
	                // if the string qualifier is not a flag, create a new qualifier from it
	                this.qualifiers.set(key, new Qualifier(key, value));
	            }
	        }
	        else {
	            // if a qualifier object, insert to the qualifiers map
	            this.qualifiers.set(qualifier.key, qualifier);
	        }
	        return this;
	    }
	    /**
	     * @description Adds a flag to the current action.
	     * @param {Qualifiers.Flag} flag
	     * @return {this}
	     */
	    addFlag(flag) {
	        if (typeof flag === 'string') {
	            this.flags.push(new FlagQualifier(flag));
	        }
	        else {
	            if (flag instanceof FlagQualifier) {
	                this.flags.push(flag);
	            }
	        }
	        return this;
	    }
	    addValueToQualifier(qualifierKey, qualifierValue) {
	        this.qualifiers.get(qualifierKey).addValue(qualifierValue);
	        return this;
	    }
	}

	/**
	 * @memberOf Qualifiers.Region
	 */
	class NamedRegion extends Action {
	    constructor(type) {
	        super();
	        this.regionType = type;
	    }
	}

	/**
	 * @memberOf Qualifiers.Region
	 */
	class CustomRegion extends NamedRegion {
	    constructor() {
	        super('named');
	    }
	    /**
	     * @description The x position in pixels.
	     * @param {number} x
	     */
	    x(x) {
	        this.addQualifier(new Qualifier('x', x));
	        return this;
	    }
	    /**
	     * @description The y position in pixels.
	     * @param {number} y
	     */
	    y(y) {
	        this.addQualifier(new Qualifier('y', y));
	        return this;
	    }
	    /**
	     * @description The width of the region in pixels.
	     * @param {number} width
	     */
	    width(width) {
	        this.addQualifier(new Qualifier('w', width));
	        return this;
	    }
	    /**
	     * @description The height of the region in pixels.
	     * @param {number} height
	     */
	    height(height) {
	        this.addQualifier(new Qualifier('h', height));
	        return this;
	    }
	}

	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Region
	 * @return {Qualifiers.Region.CustomRegion}
	 */
	function custom() {
	    return new CustomRegion();
	}
	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Region
	 * @return {Qualifiers.Region.NamedRegion}
	 */
	function faces() {
	    return new NamedRegion('faces');
	}

	/**
	 * @description The Action class of the blur Builder.
	 * @extends SDK.Action
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class BlurAction extends Action {
	    constructor(strength) {
	        super();
	        this._actionModel = {};
	        this._strength = strength;
	        this._actionModel.actionType = 'blur';
	        this._actionModel.strength = strength;
	    }
	    /**
	     * @description Specifies the region to blur.
	     * @param {NamedRegion} blurRegion
	     */
	    region(blurRegion) {
	        this._actionModel.region = { RegionType: blurRegion.regionType };
	        this._region = blurRegion;
	        return this;
	    }
	    /**
	     * @description Sets the strength of the blur effect.
	     * @param {number | string} strength
	     */
	    strength(strength) {
	        this._strength = strength;
	        this._actionModel.strength = strength;
	        return this;
	    }
	    prepareQualifiers() {
	        /*
	         * Blur with region is a unique object in this codebase.
	         * On top of Blur being an Action with Qualifiers,
	         * it also accepts a Qualifier called Region.
	         *
	         * This Qualifier is in itself composite of qualifiers (such as height, or width).
	         * The existence of Region changes the output of Blur in non traditional ways
	         * which forced this relatively ad-hoc implementation.
	         *
	         * Aside from all of that, all of the Qualifiers in the component should be alphabetized
	         * This happens naturally in the Action class,
	         * however since we're dealing with two levels of qualifiers (Blur and Region),
	         * these need to be merged.
	         *
	         * This function will merge the Region qualifiers with Blur
	         * and add all needed implicit qualifiers (like g_ocr_text).
	         * We're not using the full Gravity Qualifier here to prevent the code import for such a simplistic case
	         */
	        const str = this._strength ? `:${this._strength}` : '';
	        if ('_region' in this) {
	            const qualifiers = this._region.qualifiers;
	            // Copy qualifiers from the region "action" to the blur action
	            qualifiers.forEach((q) => this.addQualifier(q));
	            if (this._region.regionType === 'named') {
	                this.addQualifier(new Qualifier('e', `blur_region${str}`));
	            }
	            if (this._region.regionType === 'ocr_text') {
	                this.addQualifier(new Qualifier('e', `blur_region${str}`));
	                this.addQualifier(new Qualifier('g', `ocr_text`));
	            }
	            if (this._region.regionType === 'faces') {
	                this.addQualifier(new Qualifier('e', `blur_faces${str}`));
	            }
	        }
	        else {
	            this.addQualifier(new Qualifier('e', `blur${str}`));
	        }
	    }
	    static fromJson(actionModel) {
	        const { actionType, strength, region } = actionModel;
	        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
	        // This allows the inheriting classes to determine the class to be created
	        const result = new this(strength);
	        strength && result.strength(strength);
	        if (region && region.RegionType === 'faces') {
	            result.region(faces());
	        }
	        if (region && region.RegionType === 'custom') {
	            result.region(custom());
	        }
	        return result;
	    }
	}

	/**
	 * Flip keys and values for given object
	 * @param obj
	 */
	function objectFlip(obj) {
	    const result = {};
	    Object.keys(obj).forEach((key) => {
	        result[obj[key]] = key;
	    });
	    return result;
	}

	/**
	 * This file is for internal constants only.
	 * It is not intended for public use and is not part of the public API
	 */
	const ACTION_TYPE_TO_CROP_MODE_MAP = {
	    limitFit: 'limit',
	    limitFill: 'lfill',
	    minimumFit: 'mfit',
	    thumbnail: 'thumb',
	    limitPad: 'lpad',
	    minimumPad: 'mpad'
	};
	const ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
	    colorSpace: 'cs',
	    dpr: 'dpr',
	    density: 'dn',
	    defaultImage: 'd',
	    format: 'f',
	    quality: 'q'
	};
	const ACTION_TYPE_TO_EFFECT_MODE_MAP = {
	    redEye: 'redeye',
	    advancedRedEye: 'adv_redeye',
	    oilPaint: 'oil_paint',
	    unsharpMask: 'unsharp_mask',
	    makeTransparent: 'make_transparent'
	};
	const ACTION_TYPE_TO_QUALITY_MODE_MAP = {
	    autoBest: 'auto:best',
	    autoEco: 'auto:eco',
	    autoGood: 'auto:good',
	    autoLow: 'auto:low',
	    jpegminiHigh: 'jpegmini:1',
	    jpegminiMedium: 'jpegmini:2',
	    jpegminiBest: 'jpegmini:0'
	};
	const ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
	    fullHd: 'full_hd',
	    fullHdWifi: 'full_hd_wifi',
	    fullHdLean: 'full_hd_lean',
	    hdLean: 'hd_lean'
	};
	const CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
	    444: "CHROMA_444",
	    420: "CHROMA_420"
	};
	const COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
	    'noCmyk': 'no_cmyk',
	    'keepCmyk': 'keep_cmyk',
	    'tinySrgb': 'tinysrgb',
	    'srgbTrueColor': 'srgb:truecolor'
	};
	const CHROMA_MODEL_ENUM_TO_CHROMA_VALUE = objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
	objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
	const CROP_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
	const DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
	const EFFECT_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
	objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
	objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);

	/**
	 * @description A class that defines a simple effect of the type e_{effectName}
	 * @extends SDK.Action
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class SimpleEffectAction extends Action {
	    constructor(effectType, level) {
	        super();
	        this._actionModel = {};
	        this._actionModel.actionType = EFFECT_MODE_TO_ACTION_TYPE_MAP[effectType] || effectType;
	        const qualifierEffect = this.createEffectQualifier(effectType, level);
	        this.addQualifier(qualifierEffect);
	    }
	    createEffectQualifier(effectType, level) {
	        let qualifierValue;
	        if (level) {
	            qualifierValue = new QualifierValue([effectType, `${level}`]).setDelimiter(':');
	        }
	        else {
	            qualifierValue = new QualifierValue(effectType);
	        }
	        return new Qualifier('e', qualifierValue);
	    }
	    static fromJson(actionModel) {
	        const { actionType, level, strength } = actionModel;
	        const effectType = ACTION_TYPE_TO_EFFECT_MODE_MAP[actionType] || actionType;
	        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
	        // This allows the inheriting classes to determine the class to be created
	        // @ts-ignore
	        const result = new this(effectType, level ? level : strength);
	        return result;
	    }
	}

	/**
	 * @description A base class for effects with a level, the extending class needs to implement a method that calls setLevel()
	 * @extends {Actions.Effect.SimpleEffectAction}
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class LeveledEffectAction extends SimpleEffectAction {
	    constructor(effectType, level) {
	        super(effectType, level);
	        this.LEVEL_NAME = 'level';
	        this._actionModel = {};
	        this.effectType = effectType;
	        this._actionModel.actionType = EFFECT_MODE_TO_ACTION_TYPE_MAP[effectType] || effectType;
	        if (level) {
	            this.setLevel(level);
	        }
	    }
	    /**
	     *
	     * @description Sets the effect level for the action
	     * @param {string | number} level - The strength of the effect
	     * @protected
	     */
	    setLevel(level) {
	        this._actionModel[this.LEVEL_NAME] = level;
	        const qualifierEffect = this.createEffectQualifier(this.effectType, level);
	        this.addQualifier(qualifierEffect);
	        return this;
	    }
	}

	/**
	 * Returns RGB or Color
	 * @private
	 * @param color
	 */
	function prepareColor(color) {
	    if (color) {
	        return color.match(/^#/) ? `rgb:${color.substr(1)}` : color;
	    }
	    else {
	        return color;
	    }
	}

	/**
	 * @description Vectorizes the image.
	 * @extends SDK.Action
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class VectorizeEffectAction extends Action {
	    constructor() {
	        super();
	        this._actionModel = {};
	        this._actionModel.actionType = 'vectorize';
	    }
	    /**
	     * @description The number of colors. (Range: 2 to 30, Server default: 10)
	     * @param {number | string} num
	     * @return {this}
	     */
	    numOfColors(num) {
	        this._actionModel.numOfColors = num;
	        this._numOfColors = num;
	        return this;
	    }
	    /**
	     * @description The level of detail. Specify either a percentage of the original image (Range: 0.0 to 1.0) or an absolute number of pixels (Range: 0 to 1000). (Server default: 300)
	     * @param {number | string} num
	     * @return {this}
	     */
	    detailsLevel(num) {
	        this._actionModel.detailLevel = num;
	        this._detailsLevel = num;
	        return this;
	    }
	    /**
	     * @description The size of speckles to suppress. Specify either a percentage of the original image (Range: 0.0 to 1.0) or an absolute number of pixels (Range: 0 to 100, Server default: 2)
	     * @param {number | string} num
	     * @return {this}
	     */
	    despeckleLevel(num) {
	        this._actionModel.despeckleLevel = num;
	        this._despeckleLevel = num;
	        return this;
	    }
	    /**
	     * @description The corner threshold. Specify 100 for no smoothing (polygon corners), 0 for completely smooth corners. (Range: 0 to 100, Default: 25)
	     * @param {number | string} num
	     * @return {this}
	     */
	    cornersLevel(num) {
	        this._actionModel.cornersLevel = num;
	        this._cornersLevel = num;
	        return this;
	    }
	    /**
	     * @description The optimization value. Specify 100 for least optimization and the largest file. (Range: 0 to 100, Server default: 100).
	     * @param {number} num
	     * @return {this}
	     */
	    paths(num) {
	        this._actionModel.paths = num;
	        this._paths = num;
	        return this;
	    }
	    prepareQualifiers() {
	        let str = 'vectorize';
	        if (this._numOfColors) {
	            str += `:${new QualifierValue(`colors:${this._numOfColors}`).toString()}`;
	        }
	        if (this._detailsLevel) {
	            str += `:${new QualifierValue(`detail:${this._detailsLevel}`).toString()}`;
	        }
	        if (this._despeckleLevel) {
	            str += `:${new QualifierValue(`despeckle:${this._despeckleLevel}`).toString()}`;
	        }
	        if (this._paths) {
	            str += `:${new QualifierValue(`paths:${this._paths}`).toString()}`;
	        }
	        if (this._cornersLevel) {
	            str += `:${new QualifierValue(`corners:${this._cornersLevel}`).toString()}`;
	        }
	        this.addQualifier(new Qualifier('e', str));
	    }
	    static fromJson(actionModel) {
	        const { actionType, paths, cornersLevel, despeckleLevel, detailLevel, numOfColors } = actionModel;
	        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
	        // This allows the inheriting classes to determine the class to be created
	        const result = new this();
	        paths && result.paths(paths);
	        cornersLevel && result.cornersLevel(cornersLevel);
	        despeckleLevel && result.despeckleLevel(despeckleLevel);
	        detailLevel && result.detailsLevel(detailLevel);
	        numOfColors && result.numOfColors(numOfColors);
	        return result;
	    }
	}

	/**
	 * @description A class that provides a built in level() method that sets the level of the effect
	 * @extends {Actions.Effect.LeveledEffectAction}
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class EffectActionWithLevel extends LeveledEffectAction {
	    level(value) {
	        this._actionModel.level = value;
	        return this.setLevel(value);
	    }
	}

	/**
	 * @description Applies stripes to the image to help people with common color-blind conditions to differentiate between colors that are similar for them.
	 *              You can replace colors using the xray() method.
	 * @extends SDK.Action
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class AssistColorBlindEffectAction extends Action {
	    constructor() {
	        super();
	        this._actionModel = {};
	        this._actionModel.actionType = 'assistColorblind';
	        this.addQualifier(new Qualifier('e', new QualifierValue('assist_colorblind')));
	    }
	    /**
	     * @description Replaces problematic colors with colors that are easier to differentiate.
	     * @return {this}
	     */
	    xray() {
	        this._actionModel.type = 'xray';
	        return this.addQualifier(new Qualifier('e', new QualifierValue(['assist_colorblind', 'xray']).setDelimiter(':')));
	    }
	    /**
	     * @description Applies stripes of the specified intensity to help people with common color blind conditions to differentiate between colors that are similar for them.
	     * @param {number | string} strength The intensity of the stripes. (Range: 1 to 100, Server default: 10)
	     * @return {this}
	     */
	    stripesStrength(strength) {
	        this._actionModel.type = 'stripes';
	        this._actionModel.stripesStrength = strength;
	        return this.addQualifier(new Qualifier('e', new QualifierValue(['assist_colorblind', strength]).setDelimiter(':')));
	    }
	    static fromJson(actionModel) {
	        const { actionType, type, stripesStrength } = actionModel;
	        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
	        // This allows the inheriting classes to determine the class to be created
	        const result = new this();
	        if (type === 'xray') {
	            result.xray();
	        }
	        if (type === 'stripes') {
	            stripesStrength && result.stripesStrength(stripesStrength);
	        }
	        return result;
	    }
	}

	/**
	 * @description Applies a colorizing filter to the asset, use the methods in the class to adjust the filter
	 * @extends EffectActionWithLevel
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class ColorizeEffectAction extends EffectActionWithLevel {
	    /**
	     * @description The color to use for colorization. Specify HTML name or RGB hex code. (Server default: gray)
	     * @param {string} color HTML name(red, green, etc.) or RGB hex code. (Server default: gray)
	     * @return {this}
	     */
	    color(color) {
	        this._actionModel.color = color;
	        return this.addQualifier(new Qualifier('co', new QualifierValue(prepareColor(color))));
	    }
	    static fromJson(actionModel) {
	        const { actionType, level, color } = actionModel;
	        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
	        // This allows the inheriting classes to determine the class to be created
	        const result = new this(actionType, level);
	        color && result.color(color);
	        return result;
	    }
	}

	/**
	 * @description The Action class of the pixelate Builder
	 * @extends SDK.Action
	 * @memberOf Actions.Effect
	 * @see Visit {@link Actions.Effect|Effect} for an example
	 */
	class Pixelate extends Action {
	    constructor(squareSize) {
	        super();
	        this._actionModel = {};
	        this._squareSize = squareSize;
	        this._actionModel.actionType = 'pixelate';
	        this._actionModel.squareSize = squareSize;
	    }
	    /**
	     * @description Specifies the region to piexlate.
	     * @param {NamedRegion} pixelateRegion
	     */
	    region(pixelateRegion) {
	        this._region = pixelateRegion;
	        this._actionModel.region = { RegionType: this._region.regionType };
	        return this;
	    }
	    /**
	     * @description Sets the squareSize of the pixelate effect.
	     * @param {number | string} squareSize
	     */
	    squareSize(squareSize) {
	        this._squareSize = squareSize;
	        this._actionModel.squareSize = squareSize;
	        return this;
	    }
	    prepareQualifiers() {
	        /*
	         * pixelate with region is a unique object in this codebase.
	         * On top of pixelate being an Action with Qualifiers,
	         * it also accepts a Qualifier called Region.
	         *
	         * This Qualifier is in itself composite of qualifiers (such as height, or width).
	         * The existence of Region changes the output of pixelate in non traditional ways
	         * which forced this relatively ad-hoc implementation.
	         *
	         * Aside from all of that, all of the Qualifiers in the component should be alphabetized
	         * This happens naturally in the Action class,
	         * however since we're dealing with two levels of qualifiers (pixelate and Region),
	         * these need to be merged.
	         *
	         * This function will merge the Region qualifiers with pixelate
	         * and add all needed implicit qualifiers (like g_ocr_text).
	         * We're not using the full Gravity Qualifier here to prevent the code import for such a simplistic case
	         */
	        const str = this._squareSize ? `:${this._squareSize}` : '';
	        if ('_region' in this) {
	            const qualifiers = this._region.qualifiers;
	            // Copy qualifiers from the region "action" to the pixelate action
	            qualifiers.forEach((q) => this.addQualifier(q));
	            if (this._region.regionType === 'named') {
	                this.addQualifier(new Qualifier('e', `pixelate_region${str}`));
	            }
	            if (this._region.regionType === 'ocr_text') {
	                this.addQualifier(new Qualifier('e', `pixelate_region${str}`));
	                this.addQualifier(new Qualifier('g', `ocr_text`));
	            }
	            if (this._region.regionType === 'faces') {
	                this.addQualifier(new Qualifier('e', `pixelate_faces${str}`));
	            }
	        }
	        else {
	            this.addQualifier(new Qualifier('e', `pixelate${str}`));
	        }
	    }
	    static fromJson(actionModel) {
	        const { actionType, region, squareSize } = actionModel;
	        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
	        // This allows the inheriting classes to determine the class to be created
	        const result = new this(squareSize);
	        squareSize && result.squareSize(squareSize);
	        if (region && region.RegionType === 'faces') {
	            result.region(faces());
	        }
	        if (region && region.RegionType === 'custom') {
	            result.region(custom());
	        }
	        return result;
	    }
	}

	/**
	 * @summary action
	 * @description Applies a blurring filter to the asset.
	 * @memberOf Actions.Effect
	 * @param {number} blurLevel The strength of the blur. (Range: 1 to 2000, Server default: 100)
	 * @return {Actions.Effect.BlurAction}
	 */
	function blur(blurLevel) {
	    return new BlurAction(blurLevel);
	}
	/**
	 * @summary action
	 * @description Converts the image to gray-scale (multiple shades of gray).
	 * @memberOf Actions.Effect
	 * @return {Actions.Effect.SimpleEffectAction}
	 */
	function grayscale() {
	    return new SimpleEffectAction('grayscale');
	}
	/**
	 * @summary action
	 * @description Applies a colorizing filter to the asset.
	 * @memberOf Actions.Effect
	 * @param {number} colorizeLevel The strength of the color. (Range: 0 to 100, Server default: 100)
	 * @return {Actions.Effect.ColorizeEffectAction}
	 */
	function colorize(colorizeLevel) {
	    return new ColorizeEffectAction('colorize', colorizeLevel);
	}
	/**
	 * @summary action
	 * @description
	 * Vectorizes the image.
	 * Notes:
	 * To deliver the image as a vector image, make sure to change the format (or URL extension) to a vector format, such as SVG.</br>
	 * However, you can also deliver in a raster format if you just want to get the 'vectorized' graphic effect.</br>
	 * Large images are scaled down to 1000 pixels in the largest dimension before vectorization.
	 *
	 * @memberOf Actions.Effect
	 * @return {Actions.Effect.VectorizeEffectAction}
	 */
	function vectorize() {
	    return new VectorizeEffectAction();
	}
	/**
	 * @summary action
	 * @description
	 * Applies stripes to the image to help people with common color-blind conditions to differentiate between colors that are similar for them.</br>
	 * You can replace colors using the xRay() method of the \Cloudinary\Transformation\AssistColorBlind class.
	 * @memberOf Actions.Effect
	 * @return {Actions.Effect.AssistColorBlindEffectAction}
	 */
	function assistColorBlind() {
	    return new AssistColorBlindEffectAction();
	}
	/**
	 * @summary action
	 * @description Applies a pixelatering filter to the asset.
	 * @memberOf Actions.Effect
	 * @param {number} squareSize The squareSize in the pixelation. (Range: 1 to 2000, Server default: 100)
	 * @return {Actions.Effect.Pixelate}
	 */
	function pixelate(squareSize) {
	    return new Pixelate(squareSize);
	}

	/**
	 * @extends SDK.Action
	 * @description A class for background transformations.
	 */
	class BackgroundColor extends Action {
	    constructor(color) {
	        super();
	        this.addQualifier(new Qualifier('b', new QualifierValue(color).setDelimiter('_')));
	    }
	}

	/**
	 * @summary SDK
	 * @memberOf SDK
	 * @description Defines an action that's a string literal, no validations or manipulations are performed
	 */
	class RawAction {
	    constructor(raw) {
	        this.raw = raw;
	    }
	    toString() {
	        return this.raw;
	    }
	    toJson() {
	        return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
	    }
	}

	/**
	 * Validates obj is an instance of IErrorObject
	 * @param obj
	 */
	function isErrorObject(obj) {
	    const errorObj = obj;
	    return ('error' in errorObj) && !!errorObj.error;
	}

	/**
	 * @description Defines flags that you can use to alter the default transformation behavior.
	 * @namespace Flag
	 * @memberOf Qualifiers
	 */
	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Flag
	 * @description * Allows specifying only either width or height so the value of the second axis remains as is, and is not
	 * recalculated to maintain the aspect ratio of the original image.
	 * @return {Qualifiers.Flag.FlagQualifier}
	 */
	function ignoreInitialAspectRatio() {
	    return new FlagQualifier('ignore_aspect_ratio');
	}
	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Flag
	 * @description Automatically use lossy compression when delivering animated GIF files.
	 *
	 * This flag can also be used as a conditional flag for delivering PNG files: it tells Cloudinary to deliver the
	 * image in PNG format (as requested) unless there is no transparency channel - in which case deliver in JPEG
	 * format.
	 * @return {Qualifiers.Flag.FlagQualifier}
	 */
	function lossy() {
	    return new FlagQualifier('lossy');
	}
	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Flag
	 * @description When used with automatic fetch_format (f_auto): ensures that images with a transparency channel will be
	 * delivered in PNG format.
	 * @return {Qualifiers.Flag.FlagQualifier}
	 */
	function preserveTransparency() {
	    return new FlagQualifier('preserve_transparency');
	}
	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Flag
	 * @description Generates a JPG image using the progressive (interlaced) JPG format.
	 *
	 * This format allows the browser to quickly show a low-quality rendering of the image until the full-quality
	 * image is loaded.
	 *
	 * @param {string} mode? The mode to determine a specific progressive outcome as follows:
	 * * semi - A smart optimization of the decoding time, compression level and progressive rendering
	 *          (less iterations). This is the default mode when using q_auto.
	 * * steep - Delivers a preview very quickly, and in a single later phase improves the image to
	 *           the required resolution.
	 * * none  - Use this to deliver a non-progressive image. This is the default mode when setting
	 *           a specific value for quality.
	 * @return {Qualifiers.Flag.FlagQualifier}
	 */
	function progressive(mode) {
	    return new FlagQualifier('progressive', mode);
	}
	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Flag
	 * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the overlaid region
	 * @return {Qualifiers.Flag.FlagQualifier}
	 */
	function regionRelative() {
	    return new FlagQualifier('region_relative');
	}
	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Flag
	 * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the containing image instead of the added layer.
	 * @return {Qualifiers.Flag.FlagQualifier}
	 */
	function relative() {
	    return new FlagQualifier('relative');
	}

	/**
	 * @memberOf Qualifiers.Format
	 * @extends {SDK.QualifierValue}
	 */
	class FormatQualifier extends QualifierValue {
	    constructor(val) {
	        super(val);
	        this.val = val;
	    }
	    getValue() {
	        return this.val;
	    }
	}

	/**
	 * @description Qualifies the delivery of an asset.
	 * @memberOf Actions.Delivery
	 * @extends SDK.Action
	 */
	class DeliveryAction extends Action {
	    /**
	     * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
	     * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
	     * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
	     * @see Visit {@link Actions.Delivery|Delivery} for an example
	     */
	    constructor(deliveryKey, deliveryType, modelProperty) {
	        super();
	        this._actionModel = {};
	        let deliveryTypeValue;
	        if (deliveryType instanceof FormatQualifier) {
	            deliveryTypeValue = deliveryType.getValue();
	        }
	        else {
	            deliveryTypeValue = deliveryType;
	        }
	        this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
	        this._actionModel[modelProperty] = deliveryTypeValue;
	        this.addQualifier(new Qualifier(deliveryKey, deliveryType));
	    }
	}

	/**
	 * @description Contains functions to select the mode when using a progressive format.
	 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/transformation_reference#fl_progressive|Progressive modes}
	 * @memberOf Qualifiers
	 * @namespace Progressive
	 * @example
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {format} from "@cloudinary/url-gen/actions/delivery";
	 * import {jpg} from "@cloudinary/url-gen/qualifiers/format";
	 * import {steep} from "@cloudinary/url-gen/qualifiers/progressive";
	 *
	 * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
	 * const image = yourCldInstance.image('woman');
	 * image.delivery(format(jpg()).progressive(steep()))
	 */
	class ProgressiveQualifier extends FlagQualifier {
	    constructor(mode) {
	        super('progressive', mode);
	    }
	}

	/**
	 * @memberOf Actions.Delivery
	 * @extends {Actions.Delivery.DeliveryAction}
	 * @see Visit {@link Actions.Delivery|Delivery} for an example
	 */
	class DeliveryFormatAction extends DeliveryAction {
	    constructor(deliveryKey, deliveryType) {
	        super(deliveryKey, deliveryType, 'formatType');
	    }
	    /**
	     * @description Uses lossy compression when delivering animated GIF files.
	     * @return {this}
	     */
	    lossy() {
	        this._actionModel.lossy = true;
	        this.addFlag(lossy());
	        return this;
	    }
	    /**
	     * @description Uses progressive compression when delivering JPG file format.
	     * @return {this}
	     */
	    progressive(mode) {
	        if (mode instanceof ProgressiveQualifier) {
	            this._actionModel.progressive = { mode: mode.getFlagValue() };
	            this.addFlag(mode);
	        }
	        else {
	            this._actionModel.progressive = { mode: mode };
	            this.addFlag(progressive(mode));
	        }
	        return this;
	    }
	    /**
	     * @description Ensures that images with a transparency channel are delivered in PNG format.
	     */
	    preserveTransparency() {
	        this._actionModel.preserveTransparency = true;
	        this.addFlag(preserveTransparency());
	        return this;
	    }
	    static fromJson(actionModel) {
	        const { formatType, lossy, progressive, preserveTransparency } = actionModel;
	        let result;
	        if (formatType) {
	            result = new this('f', formatType);
	        }
	        else {
	            result = new this('f');
	        }
	        if (progressive) {
	            if (progressive.mode) {
	                result.progressive(progressive.mode);
	            }
	            else {
	                result.progressive();
	            }
	        }
	        lossy && result.lossy();
	        preserveTransparency && result.preserveTransparency();
	        return result;
	    }
	}

	/**
	 * @summary SDK
	 * @description - Defines how to transform an asset
	 * @memberOf SDK
	 */
	class Transformation {
	    constructor() {
	        this.actions = [];
	    }
	    /**
	     * @param {SDK.Action | string} action
	     * @return {this}
	     */
	    addAction(action) {
	        let actionToAdd;
	        if (typeof action === 'string') {
	            if (action.indexOf('/') >= 0) {
	                throw 'addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead';
	            }
	            else {
	                actionToAdd = new RawAction(action);
	            }
	        }
	        else {
	            actionToAdd = action;
	        }
	        this.actions.push(actionToAdd);
	        return this;
	    }
	    /**
	     * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
	     * @param {string | SDK.Transformation} tx
	     * @example
	     * import {Transformation} from "@cloudinary/url-gen";
	     *
	     * const transformation = new Transformation();
	     * transformation.addTransformation('w_100/w_200/w_300');
	     * @return {this}
	     */
	    addTransformation(tx) {
	        if (tx instanceof Transformation) {
	            // Concat the new actions into the existing actions
	            this.actions = this.actions.concat(tx.actions);
	        }
	        else {
	            this.actions.push(new RawAction(tx));
	        }
	        return this;
	    }
	    /**
	     * @return {string}
	     */
	    toString() {
	        return this.actions
	            .map((action) => {
	            return action.toString();
	        })
	            .filter((a) => a)
	            .join('/');
	    }
	    /**
	     * @description Delivers an animated GIF.
	     * @param {AnimatedAction} animatedAction
	     * @return {this}
	     */
	    animated(animatedAction) {
	        return this.addAction(animatedAction);
	    }
	    /**
	     * @description Adds a border around the image.
	     * @param {Border} borderAction
	     * @return {this}
	     */
	    border(borderAction) {
	        return this.addAction(borderAction);
	    }
	    /**
	     * @description Adjusts the shape of the delivered image. </br>
	     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
	     * @param {IReshape} reshapeAction
	     * @return {this}
	     */
	    reshape(reshapeAction) {
	        return this.addAction(reshapeAction);
	    }
	    /**
	     * @description Resize the asset using provided resize action
	     * @param {ResizeSimpleAction} resizeAction
	     * @return {this}
	     */
	    resize(resizeAction) {
	        return this.addAction(resizeAction);
	    }
	    /**
	     * @desc An alias to Action Delivery.quality
	     * @param {string|number} quality
	     * @return {this}
	     */
	    quality(quality) {
	        this.addAction(new DeliveryFormatAction('q', quality));
	        return this;
	    }
	    /**
	     * @desc An alias to Action Delivery.format
	     * @param {string} format
	     * @return {this}
	     */
	    format(format) {
	        this.addAction(new DeliveryFormatAction('f', format));
	        return this;
	    }
	    /**
	     * @description Rounds the specified corners of an image.
	     * @param roundCornersAction
	     * @return {this}
	     */
	    roundCorners(roundCornersAction) {
	        return this.addAction(roundCornersAction);
	    }
	    /**
	     * @description Adds an overlay over the base image.
	     * @param {LayerAction} overlayAction
	     * @return {this}
	     */
	    overlay(overlayAction) {
	        return this.addAction(overlayAction);
	    }
	    /**
	     * @description Adds an underlay under the base image.
	     * @param {LayerAction} underlayAction
	     * @return {this}
	     */
	    underlay(underlayAction) {
	        underlayAction.setLayerType('u');
	        return this.addAction(underlayAction);
	    }
	    /**
	     * @description Defines an new user variable.
	     * @param {VariableAction} variableAction
	     * @return {this}
	     */
	    addVariable(variableAction) {
	        return this.addAction(variableAction);
	    }
	    /**
	     * @description Specifies a condition to be met before applying a transformation.
	     * @param {ConditionalAction} conditionAction
	     * @return {this}
	     */
	    conditional(conditionAction) {
	        return this.addAction(conditionAction);
	    }
	    /**
	     * @description Applies a filter or an effect on an asset.
	     * @param {SimpleEffectAction} effectAction
	     * @return {this}
	     */
	    effect(effectAction) {
	        return this.addAction(effectAction);
	    }
	    /**
	     * @description Applies adjustment effect on an asset.
	     * @param action
	     * @return {this}
	     */
	    adjust(action) {
	        return this.addAction(action);
	    }
	    /**
	     * @description Rotates the asset by the given angle.
	     * @param {RotateAction} rotateAction
	     * @return {this}
	     */
	    rotate(rotateAction) {
	        return this.addAction(rotateAction);
	    }
	    /**
	     * @description Applies a pre-defined named transformation of the given name.
	     * @param {NamedTransformation} namedTransformation
	     * @return {this}
	     */
	    namedTransformation(namedTransformation) {
	        return this.addAction(namedTransformation);
	    }
	    /**
	     * @description Applies delivery action.
	     * @param deliveryAction
	     * @return {this}
	     */
	    delivery(deliveryAction) {
	        return this.addAction(deliveryAction);
	    }
	    /**
	     * @description Sets the color of the background.
	     * @param {Qualifiers.Color} color
	     * @return {this}
	     */
	    backgroundColor(color) {
	        return this.addAction(new BackgroundColor(prepareColor(color)));
	    }
	    /**
	     * @description Adds a layer in a Photoshop document.
	     * @param action
	     * @return {this}
	     */
	    psdTools(action) {
	        return this.addAction(action);
	    }
	    /**
	     * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
	     * @param action
	     * @return {this}
	     */
	    extract(action) {
	        return this.addAction(action);
	    }
	    /**
	     * @description Adds a flag as a separate action.
	     * @param {Qualifiers.Flag | string} flagQualifier
	     * @return {this}
	     */
	    addFlag(flagQualifier) {
	        const action = new Action();
	        let flagToAdd = flagQualifier;
	        if (typeof flagQualifier === 'string') {
	            flagToAdd = new FlagQualifier(flagQualifier);
	        }
	        action.addQualifier(flagToAdd);
	        return this.addAction(action);
	    }
	    /**
	     * @description Inject a custom function into the image transformation pipeline.
	     * @return {this}
	     */
	    customFunction(customFunction) {
	        return this.addAction(customFunction);
	    }
	    /**
	     * Transcodes the video (or audio) to another format.
	     * @param {Action} action
	     * @return {this}
	     */
	    transcode(action) {
	        return this.addAction(action);
	    }
	    /**
	     * Applies the specified video edit action.
	     *
	     * @param {videoEditType} action
	     * @return {this}
	     */
	    videoEdit(action) {
	        return this.addAction(action);
	    }
	    toJson() {
	        const actions = [];
	        for (const action of this.actions) {
	            const json = action.toJson();
	            if (isErrorObject(json)) {
	                // Fail early and return an IErrorObject
	                return json;
	            }
	            actions.push(json);
	        }
	        return { actions };
	    }
	}

	/**
	 * @description
	 * Returns a string representing the float value of the input, if the input was a number-like.
	 * Examples:
	 * - '1.0' -> '1.0'
	 * - 1 -> '1.0'
	 * - '5' -> '5.0'
	 * - 'auto' -> 'auto'
	 * @private
	 * @param {string|number} value
	 * @return {string}
	 */
	function toFloatAsString(value) {
	    // Turn the input to string
	    // The Function will return `returnValue` value if the input is not a number-like expression
	    const returnValue = value.toString();
	    // if the string contains letters, return the input
	    if (returnValue.match(/[A-Z]/gi)) {
	        return returnValue;
	    }
	    // If the leading digit is 0, and we have more than 1 digit, it's not a number.
	    // 00, 00000, 0x15 etc.
	    if (returnValue.length > 1 && returnValue[0] === '0') {
	        return returnValue;
	    }
	    // Final sanity check, parse the number as a float and check if its NaN
	    const isNumberLike = !isNaN(parseFloat(returnValue)) && returnValue.indexOf(':') === -1;
	    // If it's a number-like, but the input does not contain a decimal - add it.
	    if (isNumberLike && returnValue.indexOf('.') === -1) {
	        return `${returnValue}.0`;
	    }
	    else {
	        // If the input already contains a decimal, just return the value
	        return returnValue;
	    }
	}

	/**
	 * @memberOf Qualifiers.AspectRatio
	 * @extends {SDK.QualifierValue}
	 */
	class AspectRatioQualifierValue extends QualifierValue {
	}

	/**
	 * @description Defines a resize using width and height.
	 * @extends SDK.Action
	 * @memberOf Actions.Resize
	 * @see Visit {@link Actions.Resize| Resize} for examples
	 */
	class ResizeSimpleAction extends Action {
	    /**
	     * @param {string} cropType
	     * @param {number | string} cropWidth The required width of a transformed asset.
	     * @param {number | string} cropHeight The required height of a transformed asset.
	     */
	    constructor(cropType, cropWidth, cropHeight) {
	        super();
	        this._actionModel = { dimensions: {} };
	        this._actionModel.actionType = CROP_MODE_TO_ACTION_TYPE_MAP[cropType] || cropType;
	        this.addQualifier(new Qualifier('c', cropType));
	        cropWidth && this.width(cropWidth);
	        cropHeight && this.height(cropHeight);
	    }
	    /**
	     * @description Sets the height of the resize
	     * @param {string | number} x The height in pixels (if an integer is specified) or as a percentage (if a float is specified).
	     */
	    height(x) {
	        this._actionModel.dimensions.height = x;
	        return this.addQualifier(new Qualifier('h', x));
	    }
	    /**
	     * @description Sets the width of the resize
	     * @param {string | number} x The width in pixels (if an integer is specified) or as a percentage (if a float is specified).
	     */
	    width(x) {
	        this._actionModel.dimensions.width = x;
	        return this.addQualifier(new Qualifier('w', x));
	    }
	    /**
	     * @description Sets the aspect ratio of the asset.
	     * For a list of supported types see {@link Qualifiers.AspectRatio|
	      * AspectRatio values}
	     * @param {AspectRatioType|number|string} ratio The new aspect ratio, specified as a percentage or ratio.
	     * @return {this}
	     */
	    aspectRatio(ratio) {
	        // toFloatAsString is used to ensure 1 turns into 1.0
	        if (ratio instanceof AspectRatioQualifierValue) {
	            this._actionModel.dimensions.aspectRatio = `${ratio}`;
	            return this.addQualifier(new Qualifier('ar', ratio));
	        }
	        if (typeof ratio === 'number' || typeof ratio === 'string') {
	            this._actionModel.dimensions.aspectRatio = toFloatAsString(ratio);
	            return this.addQualifier(new Qualifier('ar', toFloatAsString(ratio)));
	        }
	        if (ratio instanceof FlagQualifier) {
	            this._actionModel.dimensions.aspectRatio = `${ratio.qualifierValue}`;
	            return this.addFlag(ratio);
	        }
	    }
	    /**
	     * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the containing image instead of the added layer.
	     * @return {this}
	     */
	    relative() {
	        this._actionModel.relative = true;
	        return this.addFlag(relative());
	    }
	    /**
	     * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the overlaid region
	     * @return {this}
	     */
	    regionRelative() {
	        this._actionModel.regionRelative = true;
	        return this.addFlag(regionRelative());
	    }
	    static fromJson(actionModel) {
	        const { actionType, dimensions, relative, regionRelative } = actionModel;
	        const { aspectRatio, width, height } = dimensions;
	        const cropMode = ACTION_TYPE_TO_CROP_MODE_MAP[actionType] || actionType;
	        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
	        // This allows the inheriting classes to determine the class to be created
	        const result = new this(cropMode, width, height);
	        aspectRatio && result.aspectRatio(aspectRatio === 'ignore_aspect_ratio' ? ignoreInitialAspectRatio() : aspectRatio);
	        relative && result.relative();
	        regionRelative && result.regionRelative();
	        return result;
	    }
	}

	/**
	 * @memberOf Gravity.GravityQualifier
	 * @extends {SDK.Qualifier}
	 */
	class GravityQualifier extends Qualifier {
	    /**
	     * @param value, an array containing (GravityObject | AutoGravity | string) or a string;
	     */
	    constructor(value) {
	        super('g', new QualifierValue(value));
	    }
	}

	/**
	 * @description The class for the autoGravity builder
	 * @memberOf Qualifiers.Gravity
	 * @extends {Qualifiers.Gravity.GravityQualifier}
	 */
	class AutoGravity extends GravityQualifier {
	    constructor() {
	        // Required due to https://github.com/microsoft/TypeScript/issues/13029
	        /* istanbul ignore next */
	        super('auto');
	    }
	    /**
	     * @description Autofocuses on objects, allowing their priority within the algorithm to be configured.
	     * @param {AutoFocus} AutoFocusObjects
	     */
	    autoFocus(...AutoFocusObjects) {
	        this.addValue(AutoFocusObjects);
	        return this;
	    }
	}

	/**
	 * @description The class for the FocusOn builder
	 * @memberOf Qualifiers.Gravity
	 * @extends {Qualifiers.Gravity.GravityQualifier}
	 */
	class FocusOnGravity extends GravityQualifier {
	    constructor(FocusOnObjects) {
	        // Required due to https://github.com/microsoft/TypeScript/issues/13029
	        /* istanbul ignore next */
	        super(FocusOnObjects);
	    }
	    /**
	     * @description Specifies the gravity to use if none of the other gravity objects are found.
	     * @param {Qualifiers.Gravity.AutoGravity} val
	     */
	    fallbackGravity(val) {
	        /*
	         *  FocusOnGravity(this) is already a qualifier, with a key and a value g_{obj1}
	         *  fallBackGravity also attempts to add a value, to reach the result of g_{obj1}:auto:{obj2}
	         *  Since AutoGravity is a Qualifier, it also comes with its own g_ key, which needs to be removed.
	         *  To solve it, we take only the value from the qualifier, instead of the whole thing
	         */
	        this.addValue(val.qualifierValue);
	        return this;
	    }
	}

	/**
	 * @description The class for the CompassGravity builder
	 * @memberOf Qualifiers.Gravity
	 * @extends {Qualifiers.Gravity.GravityQualifier}
	 */
	class CompassGravity extends GravityQualifier {
	    constructor(dir) {
	        // Required due to https://github.com/microsoft/TypeScript/issues/13029
	        /* istanbul ignore next */
	        super(dir);
	    }
	}

	/**
	 * @description Defines the gravity based on directional values from a compass.
	 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/resizing_and_cropping#control_gravity|Control gravity for images}
	 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/video_resizing_and_cropping#control_gravity|Control gravity for videos}
	 * @param {Qualifiers.Compass | string} direction A compass Values
	 * @memberOf Qualifiers.Gravity
	 * @example
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
	 * import {north} from "@cloudinary/url-gen/qualifiers/compass";
	 * import {crop} from "@cloudinary/url-gen/actions/resize";
	 *
	 * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
	 * const image = yourCldInstance.image('woman');
	 * image.resize(crop().width(300).gravity(compass(north())))
	 * @return {CompassGravity}
	 */
	function compass(direction) {
	    return new CompassGravity(direction);
	}
	/**
	 * @summary qualifier
	 * @description Specifies what to focus on, for example: faces, objects, eyes, etc.
	 * @param {...Qualifier.FocusOn} args One or more objects to focus on
	 * @memberOf Qualifiers.Gravity
	 * @example
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
	 * import {crop} from "@cloudinary/url-gen/actions/resize";
	 * import {cat} from "@cloudinary/url-gen/qualifiers/focusOn";
	 *
	 * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
	 * const image = yourCldInstance.image('woman');
	 * image.resize(crop().width(300).gravity(focusOn(cat())))
	 * @return {FocusOnGravity}
	 */
	function focusOn(...args) {
	    const res = [...args];
	    return new FocusOnGravity(res);
	}
	/**
	 * @summary qualifier
	 * @description Automatically identifies the most interesting regions in the asset, can be qualified further by including what to focus on.
	 * @memberOf Qualifiers.Gravity
	 * @return {Qualifiers.Gravity.AutoGravity}
	 * @example
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {autoGravity} from "@cloudinary/url-gen/qualifiers/gravity";
	 * import {crop} from "@cloudinary/url-gen/actions/resize";
	 *
	 * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
	 * const image = yourCldInstance.image('woman');
	 * image.resize(crop().width(300).gravity(autoGravity()))
	 * @example
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {autoGravity} from "@cloudinary/url-gen/qualifiers/gravity";
	 * import {crop} from "@cloudinary/url-gen/actions/resize";
	 * import {cat} from "@cloudinary/url-gen/qualifiers/focusOn";
	 * import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";
	 *
	 * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
	 * const image = yourCldInstance.image('woman');
	 * image.resize(crop().width(300).gravity(autoGravity().autoFocus(AutoFocus.focusOn(cat()))))
	 */
	function autoGravity() {
	    return new AutoGravity();
	}

	/**
	 * @memberOf Qualifiers.FocusOn
	 * @extends {SDK.QualifierValue}
	 */
	class FocusOnValue extends QualifierValue {
	    constructor(name) {
	        super();
	        this.name = name;
	    }
	    toString() {
	        return this.name;
	    }
	}

	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.FocusOn
	 * @description Detect all text elements in an image using the {@link https://cloudinary.com/documentation/ocr_text_detection_and_extraction_addon|OCR Text Detection and Extraction add-on} and use the detected bounding box coordinates as the basis of the transformation.
	 * @return {Qualifiers.FocusOn.FocusOnValue} FocusOnValue
	 */
	function ocr() {
	    return new FocusOnValue('ocr_text');
	}

	/**
	 * true if gravity starts with 'auto' or 'auto:'
	 * @param gravity
	 */
	function isIAutoGravityString(gravity) {
	    return gravity && `${gravity}`.split(':')[0] === 'auto';
	}
	/**
	 * Validate that given val is an ICompassGravity
	 * @param gravity
	 */
	function isCompassGravity(gravity) {
	    //const gravityString = `${(typeof gravity === "string" ? gravity : gravity.qualifierValue)}`;
	    const gravityValue = getGravityValue(gravity);
	    return ['north', 'center', 'east', 'west', 'south', 'north_west', 'south_east', 'south_west', 'north_east'].includes(gravityValue);
	}
	/**
	 * Get the value of given gravity
	 * @param gravity
	 */
	function getGravityValue(gravity) {
	    return `${gravity}`.replace('g_', '');
	}
	/**
	 * Creates a compassGravity model
	 * @param gravity
	 */
	function createCompassGravityModel(gravity) {
	    return {
	        compass: getGravityValue(gravity),
	        gravityType: 'direction'
	    };
	}
	/**
	 * Validate that given gravity is an instance of ocr gravity
	 * @param gravity
	 */
	function isOcrGravity(gravity) {
	    return getGravityValue(gravity) === 'ocr_text';
	}
	/**
	 * Creates an ocr gravity model
	 */
	function createOcrGravityModel() {
	    return {
	        gravityType: 'ocr'
	    };
	}
	/**
	 * Validate that given gravity is an instance of AutoGravity
	 * @param gravity
	 */
	function isAutoGravity(gravity) {
	    return `${gravity.qualifierValue}`.split(':')[0] === 'auto';
	}
	/**
	 * Create an instance of IAutoGravityObjectModel
	 * @param gravity
	 */
	function createIAutoFocusObject(gravity) {
	    const gravityString = gravity.toString();
	    const values = gravityString.split('_');
	    const result = {
	        object: values[0]
	    };
	    if (values.length > 1) {
	        if (values[1] === 'avoid') {
	            result.avoid = true;
	        }
	        else {
	            result.weight = +values[1];
	        }
	    }
	    return result;
	}
	/**
	 * Creates an auto gravity model from given AutoGravity
	 * @param gravity
	 */
	function createAutoGravityModel(gravity) {
	    let values;
	    const gravityQualifier = gravity === 'auto' ? new AutoGravity() : gravity;
	    if (`${gravity}`.startsWith('auto:')) {
	        values = `${gravity}`.split(':').filter((v) => v !== 'auto');
	    }
	    else {
	        values = gravityQualifier.qualifierValue.values.filter((v) => v !== 'auto');
	    }
	    const autoFocus = values.map(createIAutoFocusObject);
	    return {
	        gravityType: 'auto',
	        autoFocus
	    };
	}
	/**
	 * Create IFocusOnGravityModel from FocusOnGravity
	 * @param gravity
	 */
	function createFocusOnGravityModel(gravity) {
	    const hasAutoGravity = `${gravity}`.split(':').includes('auto');
	    const values = gravity.qualifierValue.values;
	    const focusOnValues = hasAutoGravity ? values.slice(0, values.length - 1) : values;
	    const result = {
	        gravityType: 'object',
	        focusOnObjects: focusOnValues.map((v) => `${v}`)
	    };
	    if (hasAutoGravity) {
	        // Remove the first 'auto' value by slicing it, because it's added by autoGravity()
	        const autoFocusObjects = values[values.length - 1].values.slice(1);
	        const autoGravityInstance = autoGravity().autoFocus(...autoFocusObjects);
	        result.fallbackGravity = createAutoGravityModel(autoGravityInstance);
	    }
	    return result;
	}
	/**
	 * Creates a FocusOnGravity from given string
	 * @param gravity
	 */
	function createFocusOnGravity(gravity) {
	    const values = gravity.split(':');
	    const focusOnValues = values.map((g) => new FocusOnValue(g));
	    return new FocusOnGravity(focusOnValues);
	}
	/**
	 * Create a model of given gravity
	 * @param gravity
	 */
	function createGravityModel(gravity) {
	    if (isCompassGravity(gravity)) {
	        return createCompassGravityModel(gravity);
	    }
	    if (isOcrGravity(gravity)) {
	        return createOcrGravityModel();
	    }
	    if (isIAutoGravityString(gravity) || isAutoGravity(gravity)) {
	        return createAutoGravityModel(gravity);
	    }
	    return createFocusOnGravityModel(typeof gravity === 'string' ? createFocusOnGravity(gravity) : gravity);
	}

	/**
	 * @summary qualifier
	 * @namespace AutoFocus
	 * @memberOf Qualifiers
	 * @see Visit {@link Qualifiers.Gravity|Gravity} for an example
	 */
	/**
	 * @memberOf Qualifiers.AutoFocus
	 * @extends {SDK.QualifierValue}
	 * @see Visit {@link Qualifiers.Gravity|Gravity} for an example
	 */
	class AutoFocus extends QualifierValue {
	    constructor(focusOn, weight) {
	        super();
	        this._weight = weight;
	        this.focusOn = focusOn;
	        this.shouldAvoid = false;
	    }
	    /**
	     * @summary qualifier
	     * @description Specifies the object to focus on automatically
	     * Accepts an AutoFocusObject (which is just a wrapper for a FocusOn object, but with extra method: avoid, weight)
	     * @param {Qualifiers.FocusOn} obj The object to focus on.
	     * @param {number} weight
	     */
	    static focusOn(obj, weight) {
	        return new AutoFocus(obj, weight);
	    }
	    shouldAddWeight() {
	        return typeof this._weight === 'number' || typeof this._weight === 'string' || this.shouldAvoid;
	    }
	    /**
	     * @summary qualifier
	     * @desc Get the name of the of the object
	     */
	    getName() {
	        return this.focusOn.name;
	    }
	    /**
	     * @summary qualifier
	     * @desc Get the weight for the object
	     */
	    getWeight() {
	        if (this.shouldAvoid) {
	            return 'avoid';
	        }
	        else {
	            return this._weight;
	        }
	    }
	    /**
	     * @summary qualifier
	     * @desc Return the string representation of this QualifierValue
	     */
	    toString() {
	        // Future proofing, in case we'd like to support some custom string in the future, or if data is coming from a DB
	        if (this.shouldAddWeight()) {
	            return `${this.getName()}_${this.getWeight()}`;
	        }
	        else {
	            return `${this.getName()}`;
	        }
	    }
	    /**
	     * @summary qualifier
	     * @description Sets the importance level of the object within the automatic gravity algorithm
	     * @param {numebr} w The focus weight for the object
	     * @return {this}
	     */
	    weight(w) {
	        this._weight = w;
	        return this;
	    }
	    /**
	     * @summary qualifier
	     * @description Attempts to avoid the detected object in the image
	     * @return {this}
	     */
	    avoid() {
	        this.shouldAvoid = true;
	        return this;
	    }
	}

	/**
	 * @memberOf Qualifiers.Compass
	 * @extends {SDK.QualifierValue}
	 */
	class CompassQualifier extends QualifierValue {
	    constructor(val) {
	        super();
	        this.val = val;
	    }
	    toString() {
	        return this.val;
	    }
	}

	/**
	 * Validates that gravityModel is an ICompassGravityModel
	 * @param gravityModel
	 */
	function isCompassGravityModel(gravityModel) {
	    return gravityModel.gravityType === 'direction';
	}
	/**
	 * Validates that gravityModel is an IOcrGravityModel
	 * @param gravityModel
	 */
	function isOcrGravityModel(gravityModel) {
	    return gravityModel.gravityType === 'ocr';
	}
	/**
	 * Validates that gravityModel is an IAutoGravityModel
	 * @param gravityModel
	 */
	function isAutoGravityModel(gravityModel) {
	    return gravityModel.gravityType === 'auto';
	}
	/**
	 * Create AutoFocus from IAutoGravityObjectModel
	 * @param autoGravityObjectModel
	 */
	function createAutoFocusFromModel(autoGravityObjectModel) {
	    const { object, weight, avoid } = autoGravityObjectModel;
	    const autoFocus = new AutoFocus(new FocusOnValue(object));
	    (weight || weight === 0) && autoFocus.weight(weight);
	    avoid && autoFocus.avoid();
	    return autoFocus;
	}
	/**
	 * Create AutoGravity from IAutoGravityModel
	 * @param gravityModel
	 */
	function createAutoGravityFromModel(gravityModel) {
	    const autoFocusModel = gravityModel.autoFocus || [];
	    const autoFocus = autoFocusModel.map(createAutoFocusFromModel);
	    return autoGravity().autoFocus(...autoFocus);
	}
	/**
	 * Create FocusOnGravity from given IFocusOnGravityModel
	 * @param gravityModel
	 */
	function createFocusOnGravityFromModel(gravityModel) {
	    const focusOnObjects = (gravityModel.focusOnObjects || []).map((str) => new FocusOnValue(str));
	    const result = focusOn(...focusOnObjects);
	    if (gravityModel.fallbackGravity) {
	        const autoGravity = createAutoGravityFromModel(gravityModel.fallbackGravity);
	        result.fallbackGravity(autoGravity);
	    }
	    return result;
	}
	/**
	 * Create gravity instance from given gravity model
	 * @param gravityModel
	 */
	function createGravityFromModel(gravityModel) {
	    if (isCompassGravityModel(gravityModel)) {
	        return new CompassGravity(new CompassQualifier(gravityModel.compass));
	    }
	    if (isOcrGravityModel(gravityModel)) {
	        return focusOn(ocr());
	    }
	    if (isAutoGravityModel(gravityModel)) {
	        return createAutoGravityFromModel(gravityModel);
	    }
	    return createFocusOnGravityFromModel(gravityModel);
	}

	/**
	 * @description Defines an advanced resize.
	 * @extends Actions.Resize.ResizeSimpleAction
	 * @memberOf Actions.Resize
	 * @see Visit {@link Actions.Resize| Resize} for examples
	 */
	class ResizeAdvancedAction extends ResizeSimpleAction {
	    /**
	     * @description Which part of the original image to include.
	     * @param {Qualifiers.Gravity} gravity
	     */
	    gravity(gravity) {
	        this._actionModel.gravity = createGravityModel(gravity);
	        const gravityQualifier = typeof gravity === "string" ? new Qualifier('g', gravity) : gravity;
	        return this.addQualifier(gravityQualifier);
	    }
	    static fromJson(actionModel) {
	        const result = super.fromJson.apply(this, [actionModel]);
	        if (actionModel.gravity) {
	            result.gravity(createGravityFromModel(actionModel.gravity));
	        }
	        return result;
	    }
	}

	/**
	 * @description Defines the visual appearance of the background.
	 * @memberOf Qualifiers.Background
	 * @extends {SDK.Qualifier}
	 */
	class BackgroundQualifier extends Qualifier {
	    constructor(backgroundValue) {
	        // The qualifier key for this qualifier
	        super('b');
	        // Such as color (b_red)
	        if (backgroundValue) {
	            this.addValue(backgroundValue);
	        }
	    }
	}

	/**
	 * @description A class for blurred background transformations.
	 * @memberOf Qualifiers.Background
	 * @extends {Qualifiers.Background.BackgroundQualifier}
	 */
	class BlurredBackgroundAction extends BackgroundQualifier {
	    /**
	     * @description Sets the intensity of the blur.
	     * @param {number} value - The intensity of the blur.
	     */
	    intensity(value) {
	        this.intensityLevel = value;
	        return this;
	    }
	    /**
	     * @description Sets the brightness of the background.
	     * @param {number} value - The brightness of the background.
	     */
	    brightness(value) {
	        this.brightnessLevel = value;
	        return this;
	    }
	    /**
	     * @description
	     * Stringify the qualifier
	     * BackgroundQualifiers don't have a value, but instead override the toString() function
	     */
	    toString() {
	        // b_blurred:{intensity}:{brightness}
	        return `
    b_blurred
    ${this.intensityLevel ? `:${this.intensityLevel}` : ''}
    ${this.brightnessLevel ? `:${this.brightnessLevel}` : ''}
    `.replace(/\s+/g, '');
	    }
	}
	var BlurredBackgroundAction$1 = BlurredBackgroundAction;

	/**
	 * @description Defines the background color to use when resizing with padding.
	 * @memberOf Qualifiers.Background
	 * @extends {Qualifiers.Background.BackgroundQualifier}
	 */
	class BaseCommonBackground extends BackgroundQualifier {
	    constructor() {
	        super();
	        this._palette = [];
	    }
	    /**
	     * @description Selects the strongest contrasting color to use for padding.
	     * @return {this}
	     */
	    contrast() {
	        this._contrast = true;
	        return this;
	    }
	    /**
	     * @description Defines the custom colors to use when resizing using content-aware padding.
	     * @param {...string} colors One or more colors - Example: palette('green', 'red', blue')
	     * @return {this}
	     */
	    palette(...colors) {
	        this._palette = colors.map((color) => {
	            return prepareColor(color);
	        });
	        return this;
	    }
	}

	/**
	 * @description Automatically determines the color to use for padding, if needed when resizing an asset. Selects the
	 * predominant color from the border of the image.
	 * @memberOf Qualifiers.Background
	 * @extends {Qualifiers.Background.BaseCommonBackground}
	 */
	class BackgroundAutoBorderQualifier extends BaseCommonBackground {
	    /**
	     * @description
	     * Stringify the qualifier
	     * BackgroundQualifiers don't have a value, but instead override the toString() function.
	     */
	    toString() {
	        return `
    b_auto:border
    ${this._contrast ? '_contrast' : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
	    }
	}

	/**
	 * @description Defines the gradient fade effect to use for the background when resizing with padding.
	 * @memberOf Qualifiers.Background
	 * @extends {Qualifiers.Background.BaseCommonBackground}
	 */
	class BaseGradientBackground extends BaseCommonBackground {
	    /**
	     *
	     * @description Sets the number of predominant colors to use (2 or 4).
	     * @param {number} num
	     * @return {this}
	     */
	    gradientColors(num) {
	        this._gradientColors = num;
	        return this;
	    }
	    /**
	     * @description Sets the direction for a background gradient fade effect.
	     * @param {Qualifiers.GradientDirection | GradientDirectionType | string} direction Use one of these functions
	     * provided by {@link Qualifiers.GradientDirection|GradientDirection}
	     * @return {this}
	     */
	    gradientDirection(direction) {
	        this._gradientDirection = direction;
	        return this;
	    }
	}

	/**
	 * @description Specifies that the gradient fade effect, used for the background when resizing with padding, uses the
	 * predominant colors in the border pixels of the image.
	 * @memberOf Qualifiers.Background
	 * @extends {Qualifiers.Background.BaseGradientBackground}
	 */
	class BackgroundBorderGradientQualifier extends BaseGradientBackground {
	    /**
	     * @description
	     * Stringify the qualifier
	     * BackgroundQualifiers don't have a value, but instead override the toString() function.
	     */
	    toString() {
	        return `
    b_auto:border_gradient
    ${this._contrast ? '_contrast' : ''}
    ${this._gradientColors ? `:${this._gradientColors}` : ''}
    ${this._gradientDirection ? `:${this._gradientDirection}` : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
	    }
	}

	/**
	 * @description Specifies that the gradient fade effect, used for the background when resizing with padding, uses the
	 * predominant colors in the whole of the image.
	 * @memberOf Qualifiers.Background
	 * @extends {Qualifiers.Background.BaseGradientBackground}
	 */
	class BackgroundPredominantGradientQualifier extends BaseGradientBackground {
	    /**
	     * @description
	     * Stringify the qualifier
	     * BackgroundQualifiers don't have a value, but instead override the toString() function.
	     */
	    toString() {
	        return `
    b_auto:predominant_gradient
    ${this._contrast ? '_contrast' : ''}
    ${this._gradientColors ? `:${this._gradientColors}` : ''}
    ${this._gradientDirection ? `:${this._gradientDirection}` : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
	    }
	}

	/**
	 * @description Automatically determines the color to use for padding, if needed when resizing an asset. Selects the
	 * predominant color from the whole image.
	 * @memberOf Qualifiers.Background
	 * @extends {Qualifiers.Background.BaseCommonBackground}
	 */
	class BackgroundAutoPredominantQualifier extends BaseCommonBackground {
	    /**
	     * @description
	     * Stringify the qualifier
	     * BackgroundQualifiers don't have a value, but instead override the toString() function.
	     */
	    toString() {
	        return `
    b_auto:predominant
    ${this._contrast ? '_contrast' : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
	    }
	}

	/**
	 * Get the value of given background
	 * @param background
	 */
	function getBackgroundValue(background) {
	    return `${background}`.replace('b_', '');
	}
	/**
	 * Create an IAutoBackgroundModel from given background
	 */
	function createAutoBackgroundModel() {
	    return { backgroundType: 'auto' };
	}
	/**
	 * Create an IBlurredBackgroundModel from given background
	 * @param background
	 */
	function createBlurredBackgroundModel(background) {
	    const { intensityLevel, brightnessLevel } = background;
	    const result = {
	        backgroundType: 'blurred'
	    };
	    if (intensityLevel || intensityLevel === 0) {
	        result.intensity = intensityLevel;
	    }
	    if (brightnessLevel || brightnessLevel === 0) {
	        result.brightness = brightnessLevel;
	    }
	    return result;
	}
	/**
	 * Create an IContrastPaletteBackgroundModel from given background
	 * @param background
	 */
	function createContrastPaletteBackgroundModel(background) {
	    const contrast = background._contrast;
	    const palette = background._palette;
	    const result = {
	        backgroundType: ''
	    };
	    if (contrast) {
	        result.contrast = true;
	    }
	    if (palette) {
	        result.palette = palette;
	    }
	    return result;
	}
	/**
	 * Create an IBorderBackgroundModel from given background
	 * @param background
	 */
	function createBorderBackgroundModel(background) {
	    return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: 'border' });
	}
	/**
	 * Create an IBaseGradientBackgroundModel from given background
	 * @param background
	 */
	function createBaseGradientBackgroundModel(background) {
	    const gradientColors = background._gradientColors;
	    const gradientDirection = `${background._gradientDirection}`;
	    const result = createContrastPaletteBackgroundModel(background);
	    if (gradientColors) {
	        result.gradientColors = gradientColors;
	    }
	    if (gradientDirection) {
	        result.gradientDirection = gradientDirection;
	    }
	    return result;
	}
	/**
	 * Create an IBorderGradientBackgroundModel from given background
	 * @param background
	 */
	function createBorderGradientBackgroundModel(background) {
	    return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: 'borderGradient' });
	}
	/**
	 * Create an IColorBackgroundModel from given background
	 * @param background
	 */
	function createColorBackgroundModel(background) {
	    return {
	        backgroundType: 'color',
	        color: getBackgroundValue(background)
	    };
	}
	/**
	 * Create an IPredominantBackgroundModel from given background
	 * @param background
	 */
	function createPredominantBackgroundModel(background) {
	    return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: 'predominant' });
	}
	/**
	 * Create an IPredominantGradientBackgroundModel from given background
	 * @param background
	 */
	function createPredominantGradientBackgroundModel(background) {
	    return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: 'predominantGradient' });
	}
	/**
	 * Create an IBackgroundModel from given background
	 * @param background
	 */
	function createBackgroundModel(background) {
	    if (getBackgroundValue(background) === 'auto') {
	        return createAutoBackgroundModel();
	    }
	    if (background instanceof BlurredBackgroundAction$1) {
	        return createBlurredBackgroundModel(background);
	    }
	    if (background instanceof BackgroundAutoBorderQualifier) {
	        return createBorderBackgroundModel(background);
	    }
	    if (background instanceof BackgroundBorderGradientQualifier) {
	        return createBorderGradientBackgroundModel(background);
	    }
	    if (background instanceof BackgroundAutoPredominantQualifier) {
	        return createPredominantBackgroundModel(background);
	    }
	    if (background instanceof BackgroundPredominantGradientQualifier) {
	        return createPredominantGradientBackgroundModel(background);
	    }
	    return createColorBackgroundModel(background);
	}

	/**
	 * @summary qualifier
	 * @description Image format svg.
	 * @memberOf Qualifiers.Format
	 * @return {Qualifiers.Format.FormatQualifier}
	 */
	function svg() { return new FormatQualifier('svg'); }
	/**
	 * @summary qualifier
	 * @description Image format auto.
	 * @memberOf Qualifiers.Format
	 * @return {Qualifiers.Format.FormatQualifier}
	 */
	function auto$1() { return new FormatQualifier('auto'); }

	/**
	 * @description Defines the background color to use instead of transparent background areas or when resizing with padding.
	 *
	 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#setting_background_color|Setting background for images} | {@link https://cloudinary.com/documentation/video_effects_and_enhancements#background_color|Setting background for videos}
	 *
	 * @namespace Background
	 * @memberOf Qualifiers
	 */
	/**
	 * @summary qualifier
	 * @description Selects the predominant color while taking only the image border pixels into account.
	 * @memberOf Qualifiers.Background
	 * @return {BackgroundAutoBorderQualifier}
	 */
	function border() {
	    return new BackgroundAutoBorderQualifier();
	}
	/**
	 * @summary qualifier
	 * @description Automatically determines the color to use for padding, if needed when resizing an asset.
	 *
	 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#content_aware_padding|Content-aware padding}
	 * @memberOf Qualifiers.Background
	 * @return {Qualifiers.Background.BackgroundQualifier}
	 */
	function auto() {
	    return new BackgroundQualifier('auto');
	}
	/**
	 * @summary qualifier
	 * @description Applies a padding gradient fade effect using the predominant colors in the border of the image.
	 * @memberOf Qualifiers.Background
	 * @return {BackgroundBorderGradientQualifier}
	 */
	function borderGradient() {
	    return new BackgroundBorderGradientQualifier();
	}
	/**
	 * @summary qualifier
	 * @description Applies a padding gradient fade effect using the predominant colors in the image.
	 * @memberOf Qualifiers.Background
	 * @return {BackgroundPredominantGradientQualifier}
	 */
	function predominantGradient() {
	    return new BackgroundPredominantGradientQualifier();
	}
	/**
	 * @summary qualifier
	 * @description Selects the predominant color while taking all pixels in the image into account
	 * @memberOf Qualifiers.Background
	 * @return {BackgroundAutoPredominantQualifier}
	 */
	function predominant() {
	    return new BackgroundAutoPredominantQualifier();
	}
	/**
	 * @summary qualifier
	 * @description Selects the predominant color while taking all pixels in the image into account.
	 * @memberOf Qualifiers.Background
	 * @return {Qualifiers.Background.BackgroundQualifier}
	 */
	function color(colorStr) {
	    return new BackgroundQualifier(prepareColor(colorStr));
	}
	/**
	 * @summary qualifier
	 * @description Selects the predominant color while taking all pixels in the image into account.
	 * @memberOf Qualifiers.Background
	 * @return {BlurredBackgroundAction}
	 */
	function blurred() {
	    return new BlurredBackgroundAction$1();
	}
	const Background = {
	    auto: auto,
	    border: border,
	    borderGradient: borderGradient,
	    predominantGradient: predominantGradient,
	    predominant: predominant,
	    color: color,
	    blurred: blurred
	};

	/**
	 * Create BackgroundQualifier from IBlurredBackgroundModel
	 * @param backgroundModel
	 */
	function createBlurredBackground(backgroundModel) {
	    const { brightness, intensity } = backgroundModel;
	    const result = Background.blurred();
	    if (brightness || brightness == 0) {
	        result.brightness(brightness);
	    }
	    if (intensity || intensity == 0) {
	        result.intensity(intensity);
	    }
	    return result;
	}
	/**
	 * Create a gradientBackground from given model
	 * @param background
	 * @param backgroundModel
	 */
	function createGradientBackground(background, backgroundModel) {
	    const { gradientColors, gradientDirection, contrast, palette } = backgroundModel;
	    if (contrast) {
	        background.contrast();
	    }
	    if (palette) {
	        background.palette(...palette);
	    }
	    if (gradientColors) {
	        background.gradientColors(+gradientColors);
	    }
	    if (gradientDirection) {
	        background.gradientDirection(gradientDirection);
	    }
	    return background;
	}
	/**
	 * Crete a background with contrast and palette from given model
	 * @param background
	 * @param backgroundModel
	 */
	function createContrastPaletteBackground(background, backgroundModel) {
	    const { contrast, palette } = backgroundModel;
	    if (contrast) {
	        background.contrast();
	    }
	    if (palette) {
	        background.palette(...palette);
	    }
	    return background;
	}
	/**
	 * Create BackgroundQualifier from IBackgroundModel
	 * @param backgroundModel
	 */
	function createBackgroundFromModel(backgroundModel) {
	    const { backgroundType } = backgroundModel;
	    switch (backgroundType) {
	        case 'auto':
	            return auto();
	        case 'blurred':
	            return createBlurredBackground(backgroundModel);
	        case 'border':
	            return createContrastPaletteBackground(border(), backgroundModel);
	        case 'borderGradient':
	            return createGradientBackground(borderGradient(), backgroundModel);
	        case 'predominant':
	            return createContrastPaletteBackground(predominant(), backgroundModel);
	        case 'predominantGradient':
	            return createGradientBackground(predominantGradient(), backgroundModel);
	        default:
	            return color(backgroundModel.color);
	    }
	}

	/**
	 * @description Defines an advanced resize with padding.
	 * @extends Actions.Resize.ResizeAdvancedAction
	 * @memberOf Actions.Resize
	 * @see Visit {@link Actions.Resize| Resize} for examples
	 */
	class ResizePadAction extends ResizeAdvancedAction {
	    /**
	     * @description Sets the background.
	     * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
	     * transparent background areas or when resizing with padding.
	     */
	    background(backgroundQualifier) {
	        this._actionModel.background = createBackgroundModel(backgroundQualifier);
	        return this.addQualifier(backgroundQualifier);
	    }
	    /**
	     * @description Horizontal position for custom-coordinates based padding.
	     * @param {number} x The x position.
	     */
	    offsetX(x) {
	        this._actionModel.x = x;
	        return this.addQualifier(new Qualifier('x', x));
	    }
	    /**
	     * @description Vertical position for custom-coordinates based padding
	     * @param {number} y The y position.
	     */
	    offsetY(y) {
	        this._actionModel.y = y;
	        return this.addQualifier(new Qualifier('y', y));
	    }
	    static fromJson(actionModel) {
	        const result = super.fromJson.apply(this, [actionModel]);
	        actionModel.background && result.background(createBackgroundFromModel(actionModel.background));
	        actionModel.x && result.offsetX(actionModel.x);
	        actionModel.y && result.offsetY(actionModel.y);
	        actionModel.zoom && result.zoom(actionModel.zoom);
	        return result;
	    }
	}

	/**
	 * @description Defines a scaling resize action.
	 * @extends Actions.Resize.ResizeSimpleAction
	 * @memberOf Actions.Resize
	 * @see Visit {@link Actions.Resize| Resize} for examples
	 */
	class ResizeScaleAction extends ResizeSimpleAction {
	    /**
	     * @description Changes the aspect ratio of an image while retaining all important content and avoiding unnatural
	     * distortions.
	     * @return {this}
	     */
	    liquidRescaling() {
	        return this.addQualifier(new GravityQualifier('liquid'));
	    }
	}

	/**
	 * @description Defines how to crop an asset
	 * @extends Actions.Resize.ResizeAdvancedAction
	 * @memberOf Actions.Resize
	 * @see Visit {@link Actions.Resize| Resize} for examples
	 */
	class ResizeCropAction extends ResizeAdvancedAction {
	    /**
	     * @description Horizontal position for custom-coordinates based cropping.
	     * @param {number} x The x position.
	     */
	    x(x) {
	        this._actionModel.x = x;
	        return this.addQualifier(new Qualifier('x', x));
	    }
	    /**
	     * @description Vertical position for custom-coordinates based cropping
	     * @param {number} y The y position.
	     */
	    y(y) {
	        this._actionModel.y = y;
	        return this.addQualifier(new Qualifier('y', y));
	    }
	    /**
	     * @description Controls how much of the original image surrounding the face to keep when using either the 'crop' or 'thumb' cropping modes with face detection.
	     * @param {number | string} z The zoom factor. (Default: 1.0)
	     */
	    zoom(z) {
	        this._actionModel.zoom = z;
	        return this.addQualifier(new Qualifier('z', z));
	    }
	    static fromJson(actionModel) {
	        const result = super.fromJson.apply(this, [actionModel]);
	        actionModel.x && result.x(actionModel.x);
	        actionModel.y && result.y(actionModel.y);
	        actionModel.zoom && result.zoom(actionModel.zoom);
	        return result;
	    }
	}

	/**
	 * @description Defines how to crop-fill an asset
	 * @extends Actions.Resize.ResizeAdvancedAction
	 * @memberOf Actions.Resize
	 * @see Visit {@link Actions.Resize| Resize} for examples
	 */
	class ResizeFillAction extends ResizeAdvancedAction {
	    /**
	     * @description Absolute X position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
	     * @param {number} x The x position.
	     */
	    x(x) {
	        this._actionModel.x = x;
	        return this.addQualifier(new Qualifier('x', x));
	    }
	    /**
	     * @description Absolute Y position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
	     * @param {number} y The y position.
	     */
	    y(y) {
	        this._actionModel.y = y;
	        return this.addQualifier(new Qualifier('y', y));
	    }
	    static fromJson(actionModel) {
	        const result = super.fromJson.apply(this, [actionModel]);
	        actionModel.x && result.x(actionModel.x);
	        actionModel.y && result.y(actionModel.y);
	        return result;
	    }
	}

	/**
	 * @description Determines how to crop, scale, and/or zoom the delivered asset according to the requested dimensions.
	 * @memberOf Actions
	 * @namespace Resize
	 * @see Learn more about Gravity and Focus {@link Qualifiers.Gravity| here }
	 * @example
	 * <caption> <h4>Scaling an image</h4> </caption>
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {scale, fit, pad, crop} from '@cloudinary/url-gen/actions/resize';
	 *
	 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
	 * const image = yourCldInstance.image('woman');
	 *
	 * image.resize( scale(100, 100) );
	 * // All resize actions have a similar interface.
	 * // image.resize( fit(100, 100)) );
	 * // image.resize( pad(100, 100)) );
	 * // image.resize( crop(100, 100)) );
	 * // However, Some actions have additional arguments exposed as builder methods.
	 * // See the documentation for each method for more information
	 *
	 *
	 * // Alternative syntax, using builder methods
	 * image.resize(
	 *  scale()
	 *    .width(100)
	 *    .height(100)
	 * );
	 * image.toString()
	 *
	 * @example
	 * <caption> <h4>Cropping with automatic focus(Gravity)</h4> </caption>
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 *
	 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
	 * const image = yourCldInstance.image('woman');
	 *
	 * import {scale} from '@cloudinary/url-gen/actions/resize';
	 * import {autoGravity} from '@cloudinary/url-gen/qualifiers/gravity';
	 *
	 * image.resize( crop(100, 100).gravity(autoGravity()) );
	 *
	 * // Alternative syntax, using builder methods
	 * image.resize(
	 *  scale()
	 *    .width(100)
	 *    .height(100)
	 *    .gravity(autoGravity())
	 * );
	 * image.toString()
	 */
	/**
	 * @summary action
	 * @description
	 * Changes the size of the image exactly to the given width and height without necessarily retaining the original aspect ratio:<br/>
	 * all original image parts are visible but might be stretched or shrunk.
	 * @memberOf Actions.Resize
	 * @param {number|string} width The required width of a transformed asset.
	 * @param {number|string} height The required height of a transformed asset.
	 * @return {Actions.Resize.ScaleAction}
	 */
	function scale(width, height) {
	    return new ResizeScaleAction('scale', width, height);
	}
	/**
	 * @summary action
	 * @description Extracts a region of the given width and height out of the original image.
	 * @memberOf Actions.Resize
	 * @param {number|string} width The required width of a transformed asset.
	 * @param {number|string} height The required height of a transformed asset.
	 * @return {Actions.Resize.ResizeCropAction}
	 */
	function crop(width, height) {
	    return new ResizeCropAction('crop', width, height);
	}
	/**
	 * @summary action
	 * @description
	 * Creates an image with the exact given width and height without distorting the image.<br/>
	 * This option first scales up or down as much as needed to at least fill both of the given dimensions.<br/><br/>
	 * If the requested aspect ratio is different than the original, cropping will occur on the dimension that exceeds the requested size after scaling.
	 * @memberOf Actions.Resize
	 * @param {number|string} width The required width of a transformed asset.
	 * @param {number|string} height The required height of a transformed asset.
	 * @return {Actions.Resize.ResizeFillAction}
	 */
	function fill(width, height) {
	    return new ResizeFillAction('fill', width, height);
	}
	/**
	 * @summary action
	 * @description
	 * Resizes the asset to fill the given width and height while retaining the original aspect ratio.
	 *
	 * If the proportions of the original asset do not match the given width and height, padding is added to the asset
	 * to reach the required size.
	 * @memberOf Actions.Resize
	 * @param {number|string} width The required width of a transformed asset.
	 * @param {number|string} height The required height of a transformed asset.
	 * @return {Actions.Resize.ResizePadAction}
	 */
	function pad(width, height) {
	    return new ResizePadAction('pad', width, height);
	}

	/**
	 * @description Controls the quality of the delivered image or video.
	 * @memberOf Actions.Delivery
	 * @extends {Actions.Delivery.DeliveryAction}
	 * @see Visit {@link Actions.Delivery|Delivery} for an example
	 */
	class DeliveryQualityAction extends DeliveryAction {
	    /**
	     * @param {Qualifiers.Quality} qualityValue a Quality value
	     */
	    constructor(qualityValue) {
	        super('q', qualityValue.toString(), 'level');
	    }
	    /**
	     * Selet the Chroma sub sampling</br>
	     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/image_optimization#toggle_chroma_subsampling|Toggling chroma subsampling}
	     * @param {420 | 444 | number} type The chroma sub sampling type
	     */
	    chromaSubSampling(type) {
	        this._actionModel.chromaSubSampling = CHROMA_VALUE_TO_CHROMA_MODEL_ENUM[type];
	        const qualityWithSubSampling = new QualifierValue([this._actionModel.level, type]);
	        qualityWithSubSampling.setDelimiter(':');
	        // We either have chroma or quantization, but not both
	        return this.addQualifier(new Qualifier('q', qualityWithSubSampling));
	    }
	    /**
	     * Controls the final quality by setting a maximum quantization percentage
	     * @param {number} val
	     */
	    quantization(val) {
	        this._actionModel.quantization = val;
	        const qualityWithQuantization = new QualifierValue([this._actionModel.level, `qmax_${val}`]).setDelimiter(':');
	        // We either have chroma or quantization, but not both
	        return this.addQualifier(new Qualifier('q', qualityWithQuantization));
	    }
	    static fromJson(actionModel) {
	        const { level, chromaSubSampling, quantization } = actionModel;
	        const levelType = ACTION_TYPE_TO_QUALITY_MODE_MAP[level] || level;
	        const result = new this(levelType);
	        if (chromaSubSampling) {
	            //Turn strings like 'CHROMA_420' to 420
	            const chromaValue = CHROMA_MODEL_ENUM_TO_CHROMA_VALUE[chromaSubSampling.toUpperCase()];
	            chromaValue && result.chromaSubSampling(+chromaValue);
	        }
	        quantization && result.quantization(quantization);
	        return result;
	    }
	}

	/**
	 * @description Defines transformations for delivering your assets without changing the visual or audio experience for the end user.
	 * @memberOf Actions
	 * @namespace Delivery
	 * @example
	 * See the examples under every method
	 */
	/**
	 * @summary action
	 * @description Defines the format of the delivered asset.
	 *
	 * <b>Learn more:</b>
	 * {@link https://cloudinary.com/documentation/image_transformations#image_format_support|Image formats}
	 * {@link https://cloudinary.com/documentation/video_manipulation_and_delivery#transcoding_video_to_other_formats|Video formats}
	 *
	 * @memberOf Actions.Delivery
	 * @param {string} format The file format. For a list of supported format types see {@link Qualifiers.Format| format types} for
	 * possible values
	 * @return {Actions.Delivery.DeliveryFormat}
	 * @example
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {format} from "@cloudinary/url-gen/actions/delivery";
	 *
	 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
	 * const image = yourCldInstance.image('woman');
	 * image.delivery(
	 *  format('jpg'),
	 * );
	 *
	 */
	function format(format) {
	    return new DeliveryFormatAction('f', format);
	}
	/**
	 * @summary action
	 * @description Controls the quality of the delivered image or video.
	 *
	 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/image_optimization#how_to_optimize_image_quality|Image quality}
	 *  {@link https://cloudinary.com/documentation/video_optimization#how_to_optimize_video_quality|Video quality}
	 * @memberOf Actions.Delivery
	 * @param {QualityTypes | string | number | Qualifiers.Quality} qualityType For a list of supported quality types see
	 * {@link Qualifiers.Quality| quality types} for
	 * possible values.
	 * @return {Actions.Delivery.DeliveryQualityAction}
	 * @example
	 * import {Cloudinary} from "@cloudinary/url-gen";
	 * import {quality} from "@cloudinary/url-gen/actions/delivery";
	 * import {quality} from "@cloudinary/url-gen/qualifiers/quantity";
	 *
	 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
	 * const image = yourCldInstance.image('woman');
	 * image.delivery(
	 *  quality('auto'),
	 * );
	 */
	function quality(qualityType) {
	    return new DeliveryQualityAction(qualityType);
	}

	/**
	 * @summary qualifier
	 * @memberOf Qualifiers.Compass
	 * @description North east corner (top right).
	 * @return {Qualifiers.Compass.CompassQualifier} Compass
	 */
	function northEast() {
	    return new CompassQualifier('north_east');
	}

	/**
	 * Predefined accessibility transformations
	 * @const {Object} Cloudinary.ACCESSIBILITY_MODES
	 */
	var ACCESSIBILITY_MODES = {
	    'darkmode': colorize(70).color('black'),
	    'brightmode': colorize(40).color('white'),
	    'monochrome': grayscale(),
	    'colorblind': assistColorBlind()
	};
	/**
	 * Predefined vectorize placeholder transformation
	 */
	var VECTORIZE = new Transformation()
	    .effect(vectorize())
	    .delivery(quality('auto'))
	    .delivery(format(svg()));
	/**
	 * Predefined pixelate placeholder transformation
	 */
	var PIXELATE = new Transformation()
	    .effect(pixelate())
	    .delivery(quality('auto'))
	    .delivery(format(auto$1()));
	/**
	 * Predefined blur placeholder transformation
	 */
	var BLUR = new Transformation()
	    .effect(blur(2000))
	    .delivery(quality('auto'))
	    .delivery(format(auto$1()));
	/**
	 * Predefined predominant color placeholder transformation
	 */
	var PREDOMINANT_COLOR_TRANSFORM = new Transformation()
	    .resize(pad('iw_div_2').aspectRatio(1).background(Background.auto()))
	    .resize(crop(1, 1).gravity(compass(northEast())))
	    .resize(fill().height('ih').width('iw'))
	    .delivery(quality('auto'))
	    .delivery(format(auto$1()));
	/**
	 * Predefined placeholder image options
	 */
	var PLACEHOLDER_IMAGE_OPTIONS = {
	    'vectorize': VECTORIZE,
	    'pixelate': PIXELATE,
	    'blur': BLUR,
	    'predominant-color': PREDOMINANT_COLOR_TRANSFORM
	};
	/**
	 * transparent gif
	 */
	var singleTransparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	/**
	 * Convert common video file extensions to mime types
	 * Most other common video file extensions have an identical mime type so do not need conversion.
	 */
	var VIDEO_MIME_TYPES = {
	    'flv': 'x-flv',
	    '3gp': '3gpp',
	    'mov': 'quicktime',
	    'mpg': 'mpeg',
	    'avi': 'x-msvideo',
	    'wmv': 'x-ms-wmv',
	    'ogv': 'ogg',
	    'webm': 'webm',
	    'mp4': 'mp4',
	};

	var ANALYTICS_DELIMITER = '?_a=';
	var HtmlVideoLayer = /** @class */ (function () {
	    function HtmlVideoLayer(element, userCloudinaryVideo, sources, plugins, videoAttributes) {
	        var _this = this;
	        this.mimeType = 'video';
	        this.mimeSubTypes = VIDEO_MIME_TYPES;
	        this.videoElement = element;
	        this.originalVideo = userCloudinaryVideo;
	        this.htmlPluginState = { cleanupCallbacks: [], pluginEventSubscription: [] };
	        var pluginCloudinaryVideo = cloneDeep(userCloudinaryVideo);
	        render(element, userCloudinaryVideo, plugins, this.htmlPluginState)
	            .then(function () {
	            _this.htmlPluginState.pluginEventSubscription.forEach(function (fn) { fn(); });
	            _this.setVideoAttributes(videoAttributes);
	            _this.handleSourceToVideo(pluginCloudinaryVideo, sources);
	        });
	    }
	    /**
	     * Handles user supplied sources or default sources
	     * @param userCloudinaryVideo {CloudinaryVideo}
	     * @param sources
	     */
	    HtmlVideoLayer.prototype.handleSourceToVideo = function (userCloudinaryVideo, sources) {
	        var _this = this;
	        // checks if user supplied sources
	        if (sources) {
	            this.generateUserSources(userCloudinaryVideo, sources);
	        }
	        else {
	            var defaultTypes = ['webm', 'mp4', 'ogv'];
	            defaultTypes.forEach(function (type) {
	                _this.appendSourceTag(userCloudinaryVideo, type);
	            });
	        }
	    };
	    /**
	     * Generate sources based on user input
	     * @param userCloudinaryVideo {CloudinaryVideo}
	     * @param sources
	     */
	    HtmlVideoLayer.prototype.generateUserSources = function (userCloudinaryVideo, sources) {
	        var _this = this;
	        sources.map(function (_a) {
	            var type = _a.type, codecs = _a.codecs, transcode = _a.transcode;
	            return (_this.appendSourceTag(cloneDeep(userCloudinaryVideo)
	                .transcode(transcode), type, _this.buildMimeType(type, codecs)));
	        });
	    };
	    /**
	     * Appends source tag to html video element
	     * @param userCloudinaryVideo {CloudinaryVideo}
	     * @param type {string}
	     * @param mimeType {string}
	     */
	    HtmlVideoLayer.prototype.appendSourceTag = function (userCloudinaryVideo, type, mimeType) {
	        var source = document.createElement('source');
	        var url = userCloudinaryVideo.toURL();
	        // Split url to get analytics string so that we can insert the file extension (type) before it
	        // To simplify this we could add a .getPublicId to CloudinaryVideo and do vid.setPublicId(vid.getPublicId+type)
	        // Another option could be to add a .setExtension, which will allow to do vid.setExtension(type)
	        var srcParts = url.split(ANALYTICS_DELIMITER);
	        var analyticsStr = srcParts[1] ? "".concat(ANALYTICS_DELIMITER).concat(srcParts[1]) : '';
	        source.src = "".concat(srcParts[0], ".").concat(type).concat(analyticsStr);
	        // Ideally, we want to use the VIDEO_MIME_TYPE to detect the mime of the extension
	        // For future proofing of simple formats (say .foo and mimetype of video/foo), we also fallback to the actual type
	        source.type = mimeType ? mimeType : "video/".concat(VIDEO_MIME_TYPES[type] || type);
	        this.videoElement.appendChild(source);
	    };
	    /**
	     * Determines MIME type of given source type and codecs.
	     * @param type - format of the video
	     * @param codecs - optional information about codecs of the video
	     */
	    HtmlVideoLayer.prototype.buildMimeType = function (type, codecs) {
	        var mimeType = "".concat(this.mimeType, "/").concat(this.mimeSubTypes[type] || type);
	        if (codecs) {
	            mimeType += "; codecs=" + (Array.isArray(codecs) ? codecs.join(', ') : codecs);
	        }
	        return mimeType;
	    };
	    /**
	     * Iterates through the video attributes and sets to true if passed in by the user.
	     * In case of poster, sets the poster.
	     * @param videoAttributes {object} Supported attributes: controls, loop, muted, poster, preload, autoplay, playsinline
	     */
	    HtmlVideoLayer.prototype.setVideoAttributes = function (videoAttributes) {
	        if (videoAttributes) {
	            for (var _i = 0, _a = Object.entries(videoAttributes); _i < _a.length; _i++) {
	                var _b = _a[_i], key = _b[0], value = _b[1];
	                // Boolean attributes are considered to be true if they're present on the element at all.
	                // You should set value to the empty string ("") or the attribute's name.
	                // See https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
	                value && this.videoElement.setAttribute(key, key === 'poster' ? value : '');
	            }
	        }
	    };
	    /**
	     * Called when component is updated. If our video source has changed, a video reload is triggered.
	     * @param updatedCloudinaryVideo
	     * @param sources
	     * @param plugins
	     * @param videoAttributes
	     */
	    HtmlVideoLayer.prototype.update = function (updatedCloudinaryVideo, sources, plugins, videoAttributes) {
	        var _this = this;
	        if (updatedCloudinaryVideo !== this.originalVideo) {
	            var sourcesToDelete = this.videoElement.getElementsByTagName("SOURCE");
	            while (sourcesToDelete[0])
	                sourcesToDelete[0].parentNode.removeChild(sourcesToDelete[0]);
	            render(this.videoElement, updatedCloudinaryVideo, plugins, this.htmlPluginState)
	                .then(function () {
	                _this.setVideoAttributes(videoAttributes);
	                _this.handleSourceToVideo(updatedCloudinaryVideo, sources);
	                _this.videoElement.load();
	            });
	        }
	    };
	    return HtmlVideoLayer;
	}());

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var lodash_debounce = debounce;

	/**
	 * Returns true if value is number
	 * @param value
	 */
	function isNum(value) {
	    return typeof value === "number";
	}

	/**
	 * return true when window is defined
	 */
	function isBrowser() {
	    return typeof window !== 'undefined';
	}

	/**
	 * returns true if input is an image element
	 * @param i
	 */
	function isImage(i) {
	    return i instanceof HTMLImageElement;
	}

	/**
	 * @namespace
	 * @description Updates the src with the size of the parent element and triggers a resize event for
	 * subsequent resizing.
	 * @param steps {number | number[]} The step size in pixels or an array of image widths in pixels.
	 * @return {Plugin}
	 * @example <caption>NOTE: The following is in React. For further examples, see the Packages tab.</caption>
	 * <AdvancedImage cldImg={img} plugins={[responsive({steps: [800, 1000, 1400]})]} />
	 */
	function responsive(_a) {
	    var _b = _a === void 0 ? {} : _a, steps = _b.steps;
	    return responsivePlugin.bind(null, steps);
	}
	/**
	 * @description Responsive plugin
	 * @param steps {number | number[]} The step size in pixels.
	 * @param element {HTMLImageElement} The image element
	 * @param responsiveImage {CloudinaryImage}
	 * @param htmlPluginState {HtmlPluginState} holds cleanup callbacks and event subscriptions
	 */
	function responsivePlugin(steps, element, responsiveImage, htmlPluginState) {
	    if (!isBrowser())
	        return true;
	    if (!isImage(element))
	        return;
	    return new Promise(function (resolve) {
	        htmlPluginState.cleanupCallbacks.push(function () {
	            window.removeEventListener("resize", resizeRef);
	            resolve('canceled');
	        });
	        // Use a tagged generic action that can be later searched and replaced.
	        responsiveImage.addAction(new Action().setActionTag('responsive'));
	        // Immediately run the resize plugin, ensuring that first render gets a responsive image.
	        onResize(steps, element, responsiveImage);
	        var resizeRef;
	        htmlPluginState.pluginEventSubscription.push(function () {
	            window.addEventListener('resize', resizeRef = lodash_debounce(function () {
	                onResize(steps, element, responsiveImage);
	            }, 100));
	        });
	        resolve();
	    });
	}
	/**
	 * On resize updates image src
	 * @param steps {number | number[]} The step size in pixels.
	 * | number[] A set of image sizes in pixels.
	 * @param element {HTMLImageElement} The image element
	 * @param responsiveImage {CloudinaryImage}
	 */
	function onResize(steps, element, responsiveImage) {
	    updateByContainerWidth(steps, element, responsiveImage);
	    element.src = responsiveImage.toURL();
	}
	/**
	 * Updates the responsiveImage by container width.
	 * @param steps {number | number[]} The step size in pixels.
	 * | number[] A set of image sizes in pixels.
	 * @param element {HTMLImageElement} The image element
	 * @param responsiveImage {CloudinaryImage}
	 */
	function updateByContainerWidth(steps, element, responsiveImage) {
	    // Default value for responsiveImgWidth, used when no steps are passed.
	    var responsiveImgWidth = element.parentElement.clientWidth;
	    if (isNum(steps)) {
	        var WIDTH_INTERVALS = steps;
	        // We need to force the container width to be intervals of max width.
	        responsiveImgWidth = Math.ceil(responsiveImgWidth / WIDTH_INTERVALS) * WIDTH_INTERVALS;
	    }
	    else if (Array.isArray(steps)) {
	        responsiveImgWidth = steps.reduce(function (prev, curr) {
	            return (Math.abs(curr - responsiveImgWidth) < Math.abs(prev - responsiveImgWidth) ? curr : prev);
	        });
	    }
	    responsiveImage.transformation.actions.forEach(function (action, index) {
	        if (action instanceof Action && action.getActionTag() === 'responsive') {
	            responsiveImage.transformation.actions[index] = scale(responsiveImgWidth).setActionTag('responsive');
	        }
	    });
	}

	/**
	 * @namespace
	 * @description Loads an image once it is in a certain margin in the viewport. This includes vertical and horizontal scrolling.
	 * @param rootMargin {string} The root element's bounding box before the intersection test is performed. Default: 0px.
	 * @param threshold {number} The percentage of the image's visibility at which point the image should load. Default: 0.1 (10%).
	 * @return {Plugin}
	 * @example
	 * <caption>
	 * NOTE: The following is in React. For further examples, see the Packages tab.
	 * When using the plugin make sure to add dimensions, otherwise the images will load with
	 * the size of 0x0, meaning the images will be in the viewport and trigger the lazyload plugin.
	 * </caption>
	 * <AdvancedImage style={{width: "400px", height: "400px"}}  cldImg={img} plugins={[lazyload({rootMargin: '0px',
	 * threshold: 0.25})]} />
	 */
	function lazyload(_a) {
	    var _b = _a === void 0 ? {} : _a, _c = _b.rootMargin, rootMargin = _c === void 0 ? '0px' : _c, _d = _b.threshold, threshold = _d === void 0 ? 0.1 : _d;
	    return lazyloadPlugin.bind(null, rootMargin, threshold);
	}
	/**
	 * @description lazyload plugin
	 * @param rootMargin {string} The root element's bounding box before the intersection test is performed. Default: 0px.
	 * @param threshold {number} The percentage of the image's visibility at which point the image should load. Default: 0.1 (10%).
	 * @param element The image element.
	 * @param element {HTMLImageElement} The image element.
	 * @param cloudinaryImage {CloudinaryImage}
	 * @param htmlPluginState {HtmlPluginState} Holds cleanup callbacks and event subscriptions.
	 */
	function lazyloadPlugin(rootMargin, threshold, element, cloudinaryImage, htmlPluginState) {
	    if (rootMargin === void 0) { rootMargin = '0px'; }
	    if (threshold === void 0) { threshold = 0.1; }
	    // if SSR skip plugin
	    if (!isBrowser())
	        return false;
	    return new Promise(function (resolve) {
	        var onIntersect = function () { return (resolve()); };
	        var unobserve = detectIntersection(element, onIntersect, rootMargin, threshold);
	        htmlPluginState.cleanupCallbacks.push(function () {
	            unobserve();
	            resolve('canceled');
	        });
	    });
	}
	/**
	 * Check if IntersectionObserver is supported
	 * @return {boolean} true if window.IntersectionObserver is defined
	 */
	function isIntersectionObserverSupported() {
	    // Check that 'IntersectionObserver' property is defined on window
	    return window && 'IntersectionObserver' in window;
	}
	/**
	 * Calls onIntersect() to resolve when intersection is detected, or when
	 * no native lazy loading or when IntersectionObserver isn't supported.
	 * @param {Element} el - the element to observe
	 * @param {function} onIntersect - called when the given element is in view
	 * @param rootMargin {string} The root element's bounding box before the intersection test is performed. Default: 0px.
	 * @param threshold {number} The percentage of the image's visibility at which point the image should load. Default: 0.1 (10%).
	 */
	function detectIntersection(el, onIntersect, rootMargin, threshold) {
	    try {
	        if (!isIntersectionObserverSupported()) {
	            // Return if there's no need or possibility to detect intersection
	            onIntersect();
	            return;
	        }
	        // Detect intersection with given element using IntersectionObserver
	        var observer_1 = new IntersectionObserver(function (entries) {
	            entries.forEach(function (entry) {
	                if (entry.isIntersecting) {
	                    observer_1.unobserve(entry.target);
	                    onIntersect();
	                }
	            });
	        }, { rootMargin: rootMargin, threshold: threshold });
	        observer_1.observe(el);
	        return function () { el && observer_1.observe(el); };
	    }
	    catch (e) {
	        onIntersect();
	    }
	}

	/**
	 * @namespace
	 * @description Appends accessibility transformations to the original image.
	 * @return {Plugin}
	 * @example <caption>NOTE: The following is in React. For further examples, see the Packages tab.</caption>
	 * <AdvancedImage cldImg={img} plugins={[accessibility()]}/>
	 */
	function accessibility(_a) {
	    var _b = _a === void 0 ? {} : _a, _c = _b.mode, mode = _c === void 0 ? 'darkmode' : _c;
	    return accessibilityPlugin.bind(null, mode);
	}
	/**
	 * @description Accessibility plugin
	 * @param mode {accessibilityMode} The accessibility mode to use. Possible modes: 'darkmode' | 'brightmode' | 'monochrome' | 'colorblind'. Default: 'darkmode'.
	 * @param element {HTMLImageElement} The image element.
	 * @param pluginCloudinaryImage {CloudinaryImage}
	 * @param htmlPluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions.
	 */
	function accessibilityPlugin(mode, element, pluginCloudinaryImage, htmlPluginState) {
	    if (isBrowser()) {
	        if (!isImage(element))
	            return;
	        return new Promise(function (resolve) {
	            // resolved promise when canceled
	            htmlPluginState.cleanupCallbacks.push(function () {
	                resolve('canceled');
	            });
	            if (!ACCESSIBILITY_MODES[mode]) {
	                mode = 'darkmode';
	            }
	            pluginCloudinaryImage.effect(ACCESSIBILITY_MODES[mode]);
	            resolve();
	        });
	    }
	    else {
	        pluginCloudinaryImage.effect(ACCESSIBILITY_MODES[mode]);
	        return true;
	    }
	}

	/**
	 * @namespace
	 * @description Displays a placeholder image until the original image loads.
	 * @param mode {PlaceholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
	 * @return {Plugin}
	 * @example <caption>NOTE: The following is in React. For further examples, see the Packages tab.</caption>
	 * <AdvancedImage cldImg={img} plugins={[placeholder({mode: 'blur'})]} />
	 */
	function placeholder(_a) {
	    var _b = _a === void 0 ? {} : _a, _c = _b.mode, mode = _c === void 0 ? 'vectorize' : _c;
	    return placeholderPlugin.bind(null, mode);
	}
	/**
	 * @description Placeholder plugin
	 * @param mode {PlaceholderMode} The type of placeholder image to display. Possible modes: 'vectorize' | 'pixelate' | 'blur' | 'predominant-color'. Default: 'vectorize'.
	 * @param element {HTMLImageElement} The image element.
	 * @param pluginCloudinaryImage {CloudinaryImage}
	 * @param htmlPluginState {htmlPluginState} Holds cleanup callbacks and event subscriptions.
	 */
	function placeholderPlugin(mode, element, pluginCloudinaryImage, htmlPluginState) {
	    // @ts-ignore
	    // If we're using an invalid mode, we default to vectorize
	    if (!PLACEHOLDER_IMAGE_OPTIONS[mode]) {
	        mode = 'vectorize';
	    }
	    // A placeholder mode maps to an array of transformations
	    var PLACEHOLDER_ACTIONS = PLACEHOLDER_IMAGE_OPTIONS[mode].actions;
	    // Before proceeding, clone the original image
	    // We clone because we don't want to pollute the state of the image
	    // Future renders (after the placeholder is loaded) should not load placeholder transformations
	    var placeholderClonedImage = cloneDeep(pluginCloudinaryImage);
	    //appends a placeholder transformation on the clone
	    // @ts-ignore
	    PLACEHOLDER_ACTIONS.forEach(function (transformation) {
	        placeholderClonedImage.addAction(transformation);
	    });
	    if (!isBrowser()) {
	        // in SSR, we copy the transformations of the clone to the user provided CloudinaryImage
	        // We return here, since we don't have HTML elements to work with.
	        pluginCloudinaryImage.transformation = placeholderClonedImage.transformation;
	        return true;
	    }
	    // Client side rendering, if an image was not provided we don't perform any action
	    if (!isImage(element))
	        return;
	    // For the cloned placeholder image, we remove the responsive action.
	    // There's no need to load e_pixelate,w_{responsive} beacuse that image is temporary as-is
	    // and it just causes another image to load.
	    // This also means that the de-facto way to use responsive in SSR is WITH placeholder.
	    // This also means that the user must provide dimensions for the responsive plugin on the img tag.
	    placeholderClonedImage.transformation.actions.forEach(function (action, index) {
	        if (action instanceof Action && action.getActionTag() === 'responsive') {
	            delete placeholderClonedImage.transformation.actions[index];
	        }
	    });
	    // Set the SRC of the imageElement to the URL of the placeholder Image
	    element.src = placeholderClonedImage.toURL();
	    //Fallback, if placeholder errors, load a single transparent pixel
	    element.onerror = function () {
	        element.src = singleTransparentPixel;
	    };
	    /*
	     * This plugin loads two images:
	     * - The first image is loaded as a placeholder
	     * - The second image is loaded after the placeholder is loaded
	     *
	     * Placeholder image loads first. Once it loads, the promise is resolved and the
	     * larger image will load. Once the larger image loads, promised and plugin is resolved.
	     */
	    return new Promise(function (resolve) {
	        element.onload = function () {
	            resolve();
	        };
	    }).then(function () {
	        return new Promise(function (resolve) {
	            htmlPluginState.cleanupCallbacks.push(function () {
	                element.src = singleTransparentPixel;
	                resolve('canceled');
	            });
	            // load image once placeholder is done loading
	            var largeImage = new Image();
	            largeImage.src = pluginCloudinaryImage.toURL();
	            largeImage.onload = function () {
	                resolve();
	            };
	            // image does not load, resolve
	            largeImage.onerror = function () {
	                resolve();
	            };
	        });
	    });
	}

	function serverSideSrc(plugins, serverCloudinaryImage, analyticsOptions) {
	    var clonedServerCloudinaryImage = cloneDeep(serverCloudinaryImage);
	    if (plugins) {
	        for (var i = 0; i < plugins.length; i++) {
	            var response = plugins[i](null, clonedServerCloudinaryImage);
	            if (!response) { //lazyload
	                break;
	            }
	        }
	    }
	    return clonedServerCloudinaryImage.toURL(analyticsOptions ? { trackedAnalytics: analyticsOptions } : null);
	}

	/**
	 * Cancels currently running plugins. This is called from unmount or update
	 * @param pluginState {HtmlPluginState} Holds cleanup callbacks and event subscriptions
	 */
	function cancelCurrentlyRunningPlugins(pluginState) {
	    pluginState.cleanupCallbacks.forEach(function (fn) {
	        fn(); // resolve each promise with 'canceled'
	    });
	}

	exports.HtmlImageLayer = HtmlImageLayer;
	exports.HtmlVideoLayer = HtmlVideoLayer;
	exports.accessibility = accessibility;
	exports.cancelCurrentlyRunningPlugins = cancelCurrentlyRunningPlugins;
	exports.isBrowser = isBrowser;
	exports.lazyload = lazyload;
	exports.placeholder = placeholder;
	exports.responsive = responsive;
	exports.serverSideSrc = serverSideSrc;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
