(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JsonRefs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function getRemoteJson(e,r,t){var n,i,o=e.split("#")[0],s=remoteCache[o];_.isUndefined(s)?(i=request.get(e).set("user-agent","whitlockjc/json-refs"),_.isUndefined(r.prepareRequest)||r.prepareRequest(i,e),_.isFunction(i.buffer)&&i.buffer(!0),i.end(function(i,a){if(i)n=i;else if(a.error)n=a.error;else if(_.isUndefined(r.processContent))try{s=JSON.parse(a.text)}catch(c){n=c}else try{s=r.processContent(a.text,e,a)}catch(c){n=c}remoteCache[o]=s,t(n,s)})):t(n,s)}var _={cloneDeep:require("lodash-compat/lang/cloneDeep"),each:require("lodash-compat/collection/each"),indexOf:require("lodash-compat/array/indexOf"),isArray:require("lodash-compat/lang/isArray"),isFunction:require("lodash-compat/lang/isFunction"),isPlainObject:require("lodash-compat/lang/isPlainObject"),isString:require("lodash-compat/lang/isString"),isUndefined:require("lodash-compat/lang/isUndefined"),keys:require("lodash-compat/object/keys"),map:require("lodash-compat/collection/map")},async=window.async,request=window.superagent,traverse=window.traverse,remoteCache={},supportedSchemes=["http","https"];module.exports.clearCache=function(){remoteCache={}};var isJsonReference=module.exports.isJsonReference=function(e){return _.isPlainObject(e)&&_.isString(e.$ref)},pathToPointer=module.exports.pathToPointer=function(e){if(_.isUndefined(e))throw new Error("path is required");if(!_.isArray(e))throw new Error("path must be an array");var r="#";return e.length>0&&(r+="/"+_.map(e,function(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}).join("/")),r},findRefs=module.exports.findRefs=function(e){if(_.isUndefined(e))throw new Error("json is required");if(!_.isPlainObject(e))throw new Error("json must be an object");return traverse(e).reduce(function(e){var r=this.node;return"$ref"===this.key&&isJsonReference(this.parent.node)&&(e[pathToPointer(this.path)]=r),e},{})},isRemotePointer=module.exports.isRemotePointer=function(e){if(_.isUndefined(e))throw new Error("ptr is required");if(!_.isString(e))throw new Error("ptr must be a string");return/^(([a-zA-Z0-9+.-]+):\/\/|\.{1,2}\/)/.test(e)},pathFromPointer=module.exports.pathFromPointer=function(e){if(_.isUndefined(e))throw new Error("ptr is required");if(!_.isString(e))throw new Error("ptr must be a string");var r=[];return isRemotePointer(e)?r=e:"#"===e.charAt(0)&&"#"!==e&&(r=_.map(e.substring(1).split("/"),function(e){return e.replace(/~0/g,"~").replace(/~1/g,"/")}),r.length>1&&r.shift()),r};module.exports.resolveRefs=function e(r,t,n){function i(e){return e.map(function(){this.circular&&this.update(traverse(this.node).map(function(){this.circular&&this.parent.remove()}))})}function o(e,r,t,n){var i,o,s,a={ref:t},c=!1;t=-1===t.indexOf("#")?"#":t.substring(t.indexOf("#")),o=pathFromPointer(n),i=o.slice(0,o.length-1),0===i.length?(c=!_.isUndefined(r.value),s=r.value,e.value=s):(c=!r.has(pathFromPointer(t)),s=r.get(pathFromPointer(t)),e.set(i,s)),c||(a.value=s),u[n]=a}if(arguments.length<3&&(n=arguments[1],t={}),_.isUndefined(r))throw new Error("json is required");if(!_.isPlainObject(r))throw new Error("json must be an object");if(!_.isPlainObject(t))throw new Error("options must be an object");if(_.isUndefined(n))throw new Error("done is required");if(!_.isFunction(n))throw new Error("done must be a function");if(!_.isUndefined(t.prepareRequest)&&!_.isFunction(t.prepareRequest))throw new Error("options.prepareRequest must be a function");if(!_.isUndefined(t.processContent)&&!_.isFunction(t.processContent))throw new Error("options.processContent must be a function");var s,a={},c=findRefs(r),u={};Object.keys(c).length>0?(s=traverse(_.cloneDeep(r)),_.each(c,function(e,r){isRemotePointer(e)?a[r]=e:o(s,s,e,r)}),async.map(_.keys(a),function(r,n){var i=a[r],c=i.split(":")[0];"."===i.charAt(0)||-1===_.indexOf(supportedSchemes,c)?n():getRemoteJson(i,t,function(a,c){a?n(a):e(c,t,function(e,t){e?n(e):(o(s,traverse(t),i,r),n())})})},function(e){e?n(e):n(void 0,i(s),u)})):n(void 0,r,u)};
},{"lodash-compat/array/indexOf":2,"lodash-compat/collection/each":4,"lodash-compat/collection/map":6,"lodash-compat/lang/cloneDeep":58,"lodash-compat/lang/isArray":60,"lodash-compat/lang/isFunction":61,"lodash-compat/lang/isPlainObject":64,"lodash-compat/lang/isString":65,"lodash-compat/lang/isUndefined":67,"lodash-compat/object/keys":68}],2:[function(require,module,exports){
function indexOf(e,n,r){var a=e?e.length:0;if(!a)return-1;if("number"==typeof r)r=0>r?nativeMax(a+r,0):r;else if(r){var i=binaryIndex(e,n),t=e[i];return(n===n?n===t:t!==t)?i:-1}return baseIndexOf(e,n,r||0)}var baseIndexOf=require("../internal/baseIndexOf"),binaryIndex=require("../internal/binaryIndex"),nativeMax=Math.max;module.exports=indexOf;


},{"../internal/baseIndexOf":19,"../internal/binaryIndex":31}],3:[function(require,module,exports){
function last(t){var e=t?t.length:0;return e?t[e-1]:void 0}module.exports=last;


},{}],4:[function(require,module,exports){
module.exports=require("./forEach");


},{"./forEach":5}],5:[function(require,module,exports){
var arrayEach=require("../internal/arrayEach"),baseEach=require("../internal/baseEach"),createForEach=require("../internal/createForEach"),forEach=createForEach(arrayEach,baseEach);module.exports=forEach;


},{"../internal/arrayEach":8,"../internal/baseEach":14,"../internal/createForEach":37}],6:[function(require,module,exports){
function map(a,r,e){var i=isArray(a)?arrayMap:baseMap;return r=baseCallback(r,e,3),i(a,r)}var arrayMap=require("../internal/arrayMap"),baseCallback=require("../internal/baseCallback"),baseMap=require("../internal/baseMap"),isArray=require("../lang/isArray");module.exports=map;


},{"../internal/arrayMap":9,"../internal/baseCallback":11,"../internal/baseMap":24,"../lang/isArray":60}],7:[function(require,module,exports){
function arrayCopy(r,a){var o=-1,y=r.length;for(a||(a=Array(y));++o<y;)a[o]=r[o];return a}module.exports=arrayCopy;


},{}],8:[function(require,module,exports){
function arrayEach(r,a){for(var e=-1,n=r.length;++e<n&&a(r[e],e,r)!==!1;);return r}module.exports=arrayEach;


},{}],9:[function(require,module,exports){
function arrayMap(r,a){for(var e=-1,n=r.length,o=Array(n);++e<n;)o[e]=a(r[e],e,r);return o}module.exports=arrayMap;


},{}],10:[function(require,module,exports){
var baseCopy=require("./baseCopy"),getSymbols=require("./getSymbols"),isNative=require("../lang/isNative"),keys=require("../object/keys"),preventExtensions=isNative(preventExtensions=Object.preventExtensions)&&preventExtensions,nativeAssign=function(){var e=preventExtensions&&isNative(e=Object.assign)&&e;try{if(e){var s=preventExtensions({1:0});s[0]=1}}catch(n){try{e(s,"xo")}catch(n){}return!s[1]&&e}return!1}(),baseAssign=nativeAssign||function(e,s){return null==s?e:baseCopy(s,getSymbols(s),baseCopy(s,keys(s),e))};module.exports=baseAssign;


},{"../lang/isNative":62,"../object/keys":68,"./baseCopy":13,"./getSymbols":42}],11:[function(require,module,exports){
function baseCallback(e,t,r){var a=typeof e;return"function"==a?void 0===t?e:bindCallback(e,t,r):null==e?identity:"object"==a?baseMatches(e):void 0===t?property(e):baseMatchesProperty(e,t)}var baseMatches=require("./baseMatches"),baseMatchesProperty=require("./baseMatchesProperty"),bindCallback=require("./bindCallback"),identity=require("../utility/identity"),property=require("../utility/property");module.exports=baseCallback;


},{"../utility/identity":73,"../utility/property":74,"./baseMatches":25,"./baseMatchesProperty":26,"./bindCallback":33}],12:[function(require,module,exports){
function baseClone(a,e,r,t,o,n,g){var l;if(r&&(l=o?r(a,t,o):r(a)),void 0!==l)return l;if(!isObject(a))return a;var b=isArray(a);if(b){if(l=initCloneArray(a),!e)return arrayCopy(a,l)}else{var T=objToString.call(a),i=T==funcTag;if(T!=objectTag&&T!=argsTag&&(!i||o))return cloneableTags[T]?initCloneByTag(a,T,e):o?a:{};if(isHostObject(a))return o?a:{};if(l=initCloneObject(i?{}:a),!e)return baseAssign(l,a)}n||(n=[]),g||(g=[]);for(var c=n.length;c--;)if(n[c]==a)return g[c];return n.push(a),g.push(l),(b?arrayEach:baseForOwn)(a,function(t,o){l[o]=baseClone(t,e,r,o,a,n,g)}),l}var arrayCopy=require("./arrayCopy"),arrayEach=require("./arrayEach"),baseAssign=require("./baseAssign"),baseForOwn=require("./baseForOwn"),initCloneArray=require("./initCloneArray"),initCloneByTag=require("./initCloneByTag"),initCloneObject=require("./initCloneObject"),isArray=require("../lang/isArray"),isHostObject=require("./isHostObject"),isObject=require("../lang/isObject"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[stringTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=!0,cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[mapTag]=cloneableTags[setTag]=cloneableTags[weakMapTag]=!1;var objectProto=Object.prototype,objToString=objectProto.toString;module.exports=baseClone;


},{"../lang/isArray":60,"../lang/isObject":63,"./arrayCopy":7,"./arrayEach":8,"./baseAssign":10,"./baseForOwn":17,"./initCloneArray":44,"./initCloneByTag":45,"./initCloneObject":46,"./isHostObject":48}],13:[function(require,module,exports){
function baseCopy(e,o,r){r||(r={});for(var a=-1,n=o.length;++a<n;){var t=o[a];r[t]=e[t]}return r}module.exports=baseCopy;


},{}],14:[function(require,module,exports){
var baseForOwn=require("./baseForOwn"),createBaseEach=require("./createBaseEach"),baseEach=createBaseEach(baseForOwn);module.exports=baseEach;


},{"./baseForOwn":17,"./createBaseEach":35}],15:[function(require,module,exports){
var createBaseFor=require("./createBaseFor"),baseFor=createBaseFor();module.exports=baseFor;


},{"./createBaseFor":36}],16:[function(require,module,exports){
function baseForIn(e,r){return baseFor(e,r,keysIn)}var baseFor=require("./baseFor"),keysIn=require("../object/keysIn");module.exports=baseForIn;


},{"../object/keysIn":69,"./baseFor":15}],17:[function(require,module,exports){
function baseForOwn(e,r){return baseFor(e,r,keys)}var baseFor=require("./baseFor"),keys=require("../object/keys");module.exports=baseForOwn;


},{"../object/keys":68,"./baseFor":15}],18:[function(require,module,exports){
function baseGet(e,t,o){if(null!=e){e=toObject(e),void 0!==o&&o in e&&(t=[o]);for(var r=-1,n=t.length;null!=e&&++r<n;)e=toObject(e)[t[r]];return r&&r==n?e:void 0}}var toObject=require("./toObject");module.exports=baseGet;


},{"./toObject":56}],19:[function(require,module,exports){
function baseIndexOf(e,r,n){if(r!==r)return indexOfNaN(e,n);for(var f=n-1,a=e.length;++f<a;)if(e[f]===r)return f;return-1}var indexOfNaN=require("./indexOfNaN");module.exports=baseIndexOf;


},{"./indexOfNaN":43}],20:[function(require,module,exports){
function baseIsEqual(e,u,a,s,l,n){if(e===u)return!0;var t=typeof e,o=typeof u;return"function"!=t&&"object"!=t&&"function"!=o&&"object"!=o||null==e||null==u?e!==e&&u!==u:baseIsEqualDeep(e,u,baseIsEqual,a,s,l,n)}var baseIsEqualDeep=require("./baseIsEqualDeep");module.exports=baseIsEqual;


},{"./baseIsEqualDeep":21}],21:[function(require,module,exports){
function baseIsEqualDeep(r,e,a,t,o,s,u){var i=isArray(r),b=isArray(e),c=arrayTag,g=arrayTag;i||(c=objToString.call(r),c==argsTag?c=objectTag:c!=objectTag&&(i=isTypedArray(r))),b||(g=objToString.call(e),g==argsTag?g=objectTag:g!=objectTag&&(b=isTypedArray(e)));var y=c==objectTag&&!isHostObject(r),j=g==objectTag&&!isHostObject(e),l=c==g;if(l&&!i&&!y)return equalByTag(r,e,c);if(!o){var p=y&&hasOwnProperty.call(r,"__wrapped__"),T=j&&hasOwnProperty.call(e,"__wrapped__");if(p||T)return a(p?r.value():r,T?e.value():e,t,o,s,u)}if(!l)return!1;s||(s=[]),u||(u=[]);for(var n=s.length;n--;)if(s[n]==r)return u[n]==e;s.push(r),u.push(e);var q=(i?equalArrays:equalObjects)(r,e,a,t,o,s,u);return s.pop(),u.pop(),q}var equalArrays=require("./equalArrays"),equalByTag=require("./equalByTag"),equalObjects=require("./equalObjects"),isArray=require("../lang/isArray"),isHostObject=require("./isHostObject"),isTypedArray=require("../lang/isTypedArray"),argsTag="[object Arguments]",arrayTag="[object Array]",objectTag="[object Object]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objToString=objectProto.toString;module.exports=baseIsEqualDeep;


},{"../lang/isArray":60,"../lang/isTypedArray":66,"./equalArrays":38,"./equalByTag":39,"./equalObjects":40,"./isHostObject":48}],22:[function(require,module,exports){
function baseIsFunction(n){return"function"==typeof n||!1}module.exports=baseIsFunction;


},{}],23:[function(require,module,exports){
function baseIsMatch(e,r,a,s,i){for(var u=-1,n=r.length,o=!i;++u<n;)if(o&&s[u]?a[u]!==e[r[u]]:!(r[u]in e))return!1;for(u=-1;++u<n;){var t=r[u],v=e[t],f=a[u];if(o&&s[u])var l=void 0!==v||t in e;else l=i?i(v,f,t):void 0,void 0===l&&(l=baseIsEqual(f,v,i,!0));if(!l)return!1}return!0}var baseIsEqual=require("./baseIsEqual");module.exports=baseIsMatch;


},{"./baseIsEqual":20}],24:[function(require,module,exports){
function baseMap(r,a){var e=-1,i=isArrayLike(r)?Array(r.length):[];return baseEach(r,function(r,s,n){i[++e]=a(r,s,n)}),i}var baseEach=require("./baseEach"),isArrayLike=require("./isArrayLike");module.exports=baseMap;


},{"./baseEach":14,"./isArrayLike":47}],25:[function(require,module,exports){
function baseMatches(t){var r=keys(t),e=r.length;if(!e)return constant(!0);if(1==e){var a=r[0],i=t[a];if(isStrictComparable(i))return function(t){return null==t?!1:(t=toObject(t),t[a]===i&&(void 0!==i||a in t))}}for(var n=Array(e),s=Array(e);e--;)i=t[r[e]],n[e]=i,s[e]=isStrictComparable(i);return function(t){return null!=t&&baseIsMatch(toObject(t),r,n,s)}}var baseIsMatch=require("./baseIsMatch"),constant=require("../utility/constant"),isStrictComparable=require("./isStrictComparable"),keys=require("../object/keys"),toObject=require("./toObject");module.exports=baseMatches;


},{"../object/keys":68,"../utility/constant":72,"./baseIsMatch":23,"./isStrictComparable":53,"./toObject":56}],26:[function(require,module,exports){
function baseMatchesProperty(e,r){var t=isArray(e),a=isKey(e)&&isStrictComparable(r),i=e+"";return e=toPath(e),function(s){if(null==s)return!1;var u=i;if(s=toObject(s),!(!t&&a||u in s)){if(s=1==e.length?s:baseGet(s,baseSlice(e,0,-1)),null==s)return!1;u=last(e),s=toObject(s)}return s[u]===r?void 0!==r||u in s:baseIsEqual(r,s[u],null,!0)}}var baseGet=require("./baseGet"),baseIsEqual=require("./baseIsEqual"),baseSlice=require("./baseSlice"),isArray=require("../lang/isArray"),isKey=require("./isKey"),isStrictComparable=require("./isStrictComparable"),last=require("../array/last"),toObject=require("./toObject"),toPath=require("./toPath");module.exports=baseMatchesProperty;


},{"../array/last":3,"../lang/isArray":60,"./baseGet":18,"./baseIsEqual":20,"./baseSlice":29,"./isKey":50,"./isStrictComparable":53,"./toObject":56,"./toPath":57}],27:[function(require,module,exports){
function baseProperty(e){return function(t){return null==t?void 0:toObject(t)[e]}}var toObject=require("./toObject");module.exports=baseProperty;


},{"./toObject":56}],28:[function(require,module,exports){
function basePropertyDeep(e){var t=e+"";return e=toPath(e),function(r){return baseGet(r,e,t)}}var baseGet=require("./baseGet"),toPath=require("./toPath");module.exports=basePropertyDeep;


},{"./baseGet":18,"./toPath":57}],29:[function(require,module,exports){
function baseSlice(e,r,l){var a=-1,n=e.length;r=null==r?0:+r||0,0>r&&(r=-r>n?0:n+r),l=void 0===l||l>n?n:+l||0,0>l&&(l+=n),n=r>l?0:l-r>>>0,r>>>=0;for(var o=Array(n);++a<n;)o[a]=e[a+r];return o}module.exports=baseSlice;


},{}],30:[function(require,module,exports){
function baseToString(n){return"string"==typeof n?n:null==n?"":n+""}module.exports=baseToString;


},{}],31:[function(require,module,exports){
function binaryIndex(e,n,r){var i=0,t=e?e.length:i;if("number"==typeof n&&n===n&&HALF_MAX_ARRAY_LENGTH>=t){for(;t>i;){var A=i+t>>>1,y=e[A];(r?n>=y:n>y)?i=A+1:t=A}return t}return binaryIndexBy(e,n,identity,r)}var binaryIndexBy=require("./binaryIndexBy"),identity=require("../utility/identity"),MAX_ARRAY_LENGTH=Math.pow(2,32)-1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH>>>1;module.exports=binaryIndex;


},{"../utility/identity":73,"./binaryIndexBy":32}],32:[function(require,module,exports){
function binaryIndexBy(n,o,r,A){o=r(o);for(var a=0,i=n?n.length:0,e=o!==o,t=void 0===o;i>a;){var M=floor((a+i)/2),v=r(n[M]),R=v===v;if(e)var _=R||A;else _=t?R&&(A||void 0!==v):A?o>=v:o>v;_?a=M+1:i=M}return nativeMin(i,MAX_ARRAY_INDEX)}var floor=Math.floor,nativeMin=Math.min,MAX_ARRAY_LENGTH=Math.pow(2,32)-1,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH-1;module.exports=binaryIndexBy;


},{}],33:[function(require,module,exports){
function bindCallback(n,t,r){if("function"!=typeof n)return identity;if(void 0===t)return n;switch(r){case 1:return function(r){return n.call(t,r)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)};case 5:return function(r,e,u,i,c){return n.call(t,r,e,u,i,c)}}return function(){return n.apply(t,arguments)}}var identity=require("../utility/identity");module.exports=bindCallback;


},{"../utility/identity":73}],34:[function(require,module,exports){
(function (global){
function bufferClone(r){return bufferSlice.call(r,0)}var constant=require("../utility/constant"),isNative=require("../lang/isNative"),ArrayBuffer=isNative(ArrayBuffer=global.ArrayBuffer)&&ArrayBuffer,bufferSlice=isNative(bufferSlice=ArrayBuffer&&new ArrayBuffer(0).slice)&&bufferSlice,floor=Math.floor,Uint8Array=isNative(Uint8Array=global.Uint8Array)&&Uint8Array,Float64Array=function(){try{var r=isNative(r=global.Float64Array)&&r,e=new r(new ArrayBuffer(10),0,1)&&r}catch(a){}return e}(),FLOAT64_BYTES_PER_ELEMENT=Float64Array?Float64Array.BYTES_PER_ELEMENT:0;bufferSlice||(bufferClone=ArrayBuffer&&Uint8Array?function(r){var e=r.byteLength,a=Float64Array?floor(e/FLOAT64_BYTES_PER_ELEMENT):0,t=a*FLOAT64_BYTES_PER_ELEMENT,f=new ArrayBuffer(e);if(a){var n=new Float64Array(f,0,a);n.set(new Float64Array(r,0,a))}return e!=t&&(n=new Uint8Array(f,t),n.set(new Uint8Array(r,t))),f}:constant(null)),module.exports=bufferClone;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":62,"../utility/constant":72}],35:[function(require,module,exports){
function createBaseEach(e,t){return function(r,n){var a=r?getLength(r):0;if(!isLength(a))return e(r,n);for(var c=t?a:-1,g=toObject(r);(t?c--:++c<a)&&n(g[c],c,g)!==!1;);return r}}var getLength=require("./getLength"),isLength=require("./isLength"),toObject=require("./toObject");module.exports=createBaseEach;


},{"./getLength":41,"./isLength":51,"./toObject":56}],36:[function(require,module,exports){
function createBaseFor(e){return function(r,t,o){for(var a=toObject(r),c=o(r),n=c.length,u=e?n:-1;e?u--:++u<n;){var b=c[u];if(t(a[b],b,a)===!1)break}return r}}var toObject=require("./toObject");module.exports=createBaseFor;


},{"./toObject":56}],37:[function(require,module,exports){
function createForEach(r,a){return function(e,i,n){return"function"==typeof i&&void 0===n&&isArray(e)?r(e,i):a(e,bindCallback(i,n,3))}}var bindCallback=require("./bindCallback"),isArray=require("../lang/isArray");module.exports=createForEach;


},{"../lang/isArray":60,"./bindCallback":33}],38:[function(require,module,exports){
function equalArrays(r,e,a,o,f,i,l){var n=-1,t=r.length,u=e.length,v=!0;if(t!=u&&!(f&&u>t))return!1;for(;v&&++n<t;){var s=r[n],d=e[n];if(v=void 0,o&&(v=f?o(d,s,n):o(s,d,n)),void 0===v)if(f)for(var g=u;g--&&(d=e[g],!(v=s&&s===d||a(s,d,o,f,i,l))););else v=s&&s===d||a(s,d,o,f,i,l)}return!!v}module.exports=equalArrays;


},{}],39:[function(require,module,exports){
function equalByTag(e,a,r){switch(r){case boolTag:case dateTag:return+e==+a;case errorTag:return e.name==a.name&&e.message==a.message;case numberTag:return e!=+e?a!=+a:e==+a;case regexpTag:case stringTag:return e==a+""}return!1}var boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",numberTag="[object Number]",regexpTag="[object RegExp]",stringTag="[object String]";module.exports=equalByTag;


},{}],40:[function(require,module,exports){
function equalObjects(r,t,o,e,n,c,s){var i=keys(r),u=i.length,a=keys(t),f=a.length;if(u!=f&&!n)return!1;for(var y=n,p=-1;++p<u;){var v=i[p],l=n?v in t:hasOwnProperty.call(t,v);if(l){var b=r[v],j=t[v];l=void 0,e&&(l=n?e(j,b,v):e(b,j,v)),void 0===l&&(l=b&&b===j||o(b,j,e,n,c,s))}if(!l)return!1;y||(y="constructor"==v)}if(!y){var O=r.constructor,h=t.constructor;if(O!=h&&"constructor"in r&&"constructor"in t&&!("function"==typeof O&&O instanceof O&&"function"==typeof h&&h instanceof h))return!1}return!0}var keys=require("../object/keys"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=equalObjects;


},{"../object/keys":68}],41:[function(require,module,exports){
var baseProperty=require("./baseProperty"),getLength=baseProperty("length");module.exports=getLength;


},{"./baseProperty":27}],42:[function(require,module,exports){
var constant=require("../utility/constant"),isNative=require("../lang/isNative"),toObject=require("./toObject"),getOwnPropertySymbols=isNative(getOwnPropertySymbols=Object.getOwnPropertySymbols)&&getOwnPropertySymbols,getSymbols=getOwnPropertySymbols?function(t){return getOwnPropertySymbols(toObject(t))}:constant([]);module.exports=getSymbols;


},{"../lang/isNative":62,"../utility/constant":72,"./toObject":56}],43:[function(require,module,exports){
function indexOfNaN(r,e,n){for(var f=r.length,t=e+(n?0:-1);n?t--:++t<f;){var a=r[t];if(a!==a)return t}return-1}module.exports=indexOfNaN;


},{}],44:[function(require,module,exports){
function initCloneArray(t){var r=t.length,n=new t.constructor(r);return r&&"string"==typeof t[0]&&hasOwnProperty.call(t,"index")&&(n.index=t.index,n.input=t.input),n}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=initCloneArray;


},{}],45:[function(require,module,exports){
(function (global){
function initCloneByTag(a,t,r){var e=a.constructor;switch(t){case arrayBufferTag:return bufferClone(a);case boolTag:case dateTag:return new e(+a);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:e instanceof e&&(e=ctorByTag[t]);var g=a.buffer;return new e(r?bufferClone(g):g,a.byteOffset,a.length);case numberTag:case stringTag:return new e(a);case regexpTag:var n=new e(a.source,reFlags.exec(a));n.lastIndex=a.lastIndex}return n}var bufferClone=require("./bufferClone"),boolTag="[object Boolean]",dateTag="[object Date]",numberTag="[object Number]",regexpTag="[object RegExp]",stringTag="[object String]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",reFlags=/\w*$/,ctorByTag={};ctorByTag[float32Tag]=global.Float32Array,ctorByTag[float64Tag]=global.Float64Array,ctorByTag[int8Tag]=global.Int8Array,ctorByTag[int16Tag]=global.Int16Array,ctorByTag[int32Tag]=global.Int32Array,ctorByTag[uint8Tag]=global.Uint8Array,ctorByTag[uint8ClampedTag]=global.Uint8ClampedArray,ctorByTag[uint16Tag]=global.Uint16Array,ctorByTag[uint32Tag]=global.Uint32Array,module.exports=initCloneByTag;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./bufferClone":34}],46:[function(require,module,exports){
function initCloneObject(n){var t=n.constructor;return"function"==typeof t&&t instanceof t||(t=Object),new t}module.exports=initCloneObject;


},{}],47:[function(require,module,exports){
function isArrayLike(e){return null!=e&&isLength(getLength(e))}var getLength=require("./getLength"),isLength=require("./isLength");module.exports=isArrayLike;


},{"./getLength":41,"./isLength":51}],48:[function(require,module,exports){
var isHostObject=function(){try{Object({toString:0}+"")}catch(t){return function(){return!1}}return function(t){return"function"!=typeof t.toString&&"string"==typeof(t+"")}}();module.exports=isHostObject;


},{}],49:[function(require,module,exports){
function isIndex(n,E){return n=+n,E=null==E?MAX_SAFE_INTEGER:E,n>-1&&n%1==0&&E>n}var MAX_SAFE_INTEGER=Math.pow(2,53)-1;module.exports=isIndex;


},{}],50:[function(require,module,exports){
function isKey(r,e){var t=typeof r;if("string"==t&&reIsPlainProp.test(r)||"number"==t)return!0;if(isArray(r))return!1;var i=!reIsDeepProp.test(r);return i||null!=e&&r in toObject(e)}var isArray=require("../lang/isArray"),toObject=require("./toObject"),reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;module.exports=isKey;


},{"../lang/isArray":60,"./toObject":56}],51:[function(require,module,exports){
function isLength(e){return"number"==typeof e&&e>-1&&e%1==0&&MAX_SAFE_INTEGER>=e}var MAX_SAFE_INTEGER=Math.pow(2,53)-1;module.exports=isLength;


},{}],52:[function(require,module,exports){
function isObjectLike(e){return!!e&&"object"==typeof e}module.exports=isObjectLike;


},{}],53:[function(require,module,exports){
function isStrictComparable(e){return e===e&&!isObject(e)}var isObject=require("../lang/isObject");module.exports=isStrictComparable;


},{"../lang/isObject":63}],54:[function(require,module,exports){
function shimIsPlainObject(t){var r;if(!isObjectLike(t)||objToString.call(t)!=objectTag||isHostObject(t)||!hasOwnProperty.call(t,"constructor")&&(r=t.constructor,"function"==typeof r&&!(r instanceof r))||!support.argsTag&&isArguments(t))return!1;var e;return support.ownLast?(baseForIn(t,function(t,r,o){return e=hasOwnProperty.call(o,r),!1}),e!==!1):(baseForIn(t,function(t,r){e=r}),void 0===e||hasOwnProperty.call(t,e))}var baseForIn=require("./baseForIn"),isArguments=require("../lang/isArguments"),isHostObject=require("./isHostObject"),isObjectLike=require("./isObjectLike"),support=require("../support"),objectTag="[object Object]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objToString=objectProto.toString;module.exports=shimIsPlainObject;


},{"../lang/isArguments":59,"../support":71,"./baseForIn":16,"./isHostObject":48,"./isObjectLike":52}],55:[function(require,module,exports){
function shimKeys(r){for(var e=keysIn(r),s=e.length,n=s&&r.length,t=n&&isLength(n)&&(isArray(r)||support.nonEnumStrings&&isString(r)||support.nonEnumArgs&&isArguments(r)),i=-1,o=[];++i<s;){var u=e[i];(t&&isIndex(u,n)||hasOwnProperty.call(r,u))&&o.push(u)}return o}var isArguments=require("../lang/isArguments"),isArray=require("../lang/isArray"),isIndex=require("./isIndex"),isLength=require("./isLength"),isString=require("../lang/isString"),keysIn=require("../object/keysIn"),support=require("../support"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=shimKeys;


},{"../lang/isArguments":59,"../lang/isArray":60,"../lang/isString":65,"../object/keysIn":69,"../support":71,"./isIndex":49,"./isLength":51}],56:[function(require,module,exports){
function toObject(r){if(support.unindexedChars&&isString(r)){for(var t=-1,e=r.length,i=Object(r);++t<e;)i[t]=r.charAt(t);return i}return isObject(r)?r:Object(r)}var isObject=require("../lang/isObject"),isString=require("../lang/isString"),support=require("../support");module.exports=toObject;


},{"../lang/isObject":63,"../lang/isString":65,"../support":71}],57:[function(require,module,exports){
function toPath(r){if(isArray(r))return r;var e=[];return baseToString(r).replace(rePropName,function(r,a,t,i){e.push(t?i.replace(reEscapeChar,"$1"):a||r)}),e}var baseToString=require("./baseToString"),isArray=require("../lang/isArray"),rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,reEscapeChar=/\\(\\)?/g;module.exports=toPath;


},{"../lang/isArray":60,"./baseToString":30}],58:[function(require,module,exports){
function cloneDeep(e,n,l){return n="function"==typeof n&&bindCallback(n,l,1),baseClone(e,!0,n)}var baseClone=require("../internal/baseClone"),bindCallback=require("../internal/bindCallback");module.exports=cloneDeep;


},{"../internal/baseClone":12,"../internal/bindCallback":33}],59:[function(require,module,exports){
function isArguments(r){return isObjectLike(r)&&isArrayLike(r)&&objToString.call(r)==argsTag}var isArrayLike=require("../internal/isArrayLike"),isObjectLike=require("../internal/isObjectLike"),support=require("../support"),argsTag="[object Arguments]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objToString=objectProto.toString,propertyIsEnumerable=objectProto.propertyIsEnumerable;support.argsTag||(isArguments=function(r){return isObjectLike(r)&&isArrayLike(r)&&hasOwnProperty.call(r,"callee")&&!propertyIsEnumerable.call(r,"callee")}),module.exports=isArguments;


},{"../internal/isArrayLike":47,"../internal/isObjectLike":52,"../support":71}],60:[function(require,module,exports){
var isLength=require("../internal/isLength"),isNative=require("./isNative"),isObjectLike=require("../internal/isObjectLike"),arrayTag="[object Array]",objectProto=Object.prototype,objToString=objectProto.toString,nativeIsArray=isNative(nativeIsArray=Array.isArray)&&nativeIsArray,isArray=nativeIsArray||function(r){return isObjectLike(r)&&isLength(r.length)&&objToString.call(r)==arrayTag};module.exports=isArray;


},{"../internal/isLength":51,"../internal/isObjectLike":52,"./isNative":62}],61:[function(require,module,exports){
(function (global){
var baseIsFunction=require("../internal/baseIsFunction"),isNative=require("./isNative"),funcTag="[object Function]",objectProto=Object.prototype,objToString=objectProto.toString,Uint8Array=isNative(Uint8Array=global.Uint8Array)&&Uint8Array,isFunction=baseIsFunction(/x/)||Uint8Array&&!baseIsFunction(Uint8Array)?function(t){return objToString.call(t)==funcTag}:baseIsFunction;module.exports=isFunction;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":22,"./isNative":62}],62:[function(require,module,exports){
function isNative(t){return null==t?!1:objToString.call(t)==funcTag?reIsNative.test(fnToString.call(t)):isObjectLike(t)&&(isHostObject(t)?reIsNative:reIsHostCtor).test(t)}var escapeRegExp=require("../string/escapeRegExp"),isHostObject=require("../internal/isHostObject"),isObjectLike=require("../internal/isObjectLike"),funcTag="[object Function]",reIsHostCtor=/^\[object .+?Constructor\]$/,objectProto=Object.prototype,fnToString=Function.prototype.toString,objToString=objectProto.toString,reIsNative=RegExp("^"+escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");module.exports=isNative;


},{"../internal/isHostObject":48,"../internal/isObjectLike":52,"../string/escapeRegExp":70}],63:[function(require,module,exports){
function isObject(t){var e=typeof t;return"function"==e||!!t&&"object"==e}module.exports=isObject;


},{}],64:[function(require,module,exports){
var isArguments=require("./isArguments"),isNative=require("./isNative"),shimIsPlainObject=require("../internal/shimIsPlainObject"),support=require("../support"),objectTag="[object Object]",objectProto=Object.prototype,objToString=objectProto.toString,getPrototypeOf=isNative(getPrototypeOf=Object.getPrototypeOf)&&getPrototypeOf,isPlainObject=getPrototypeOf?function(t){if(!t||objToString.call(t)!=objectTag||!support.argsTag&&isArguments(t))return!1;var e=t.valueOf,o=isNative(e)&&(o=getPrototypeOf(e))&&getPrototypeOf(o);return o?t==o||getPrototypeOf(t)==o:shimIsPlainObject(t)}:shimIsPlainObject;module.exports=isPlainObject;


},{"../internal/shimIsPlainObject":54,"../support":71,"./isArguments":59,"./isNative":62}],65:[function(require,module,exports){
function isString(t){return"string"==typeof t||isObjectLike(t)&&objToString.call(t)==stringTag}var isObjectLike=require("../internal/isObjectLike"),stringTag="[object String]",objectProto=Object.prototype,objToString=objectProto.toString;module.exports=isString;


},{"../internal/isObjectLike":52}],66:[function(require,module,exports){
function isTypedArray(a){return isObjectLike(a)&&isLength(a.length)&&!!typedArrayTags[objToString.call(a)]}var isLength=require("../internal/isLength"),isObjectLike=require("../internal/isObjectLike"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=!1;var objectProto=Object.prototype,objToString=objectProto.toString;module.exports=isTypedArray;


},{"../internal/isLength":51,"../internal/isObjectLike":52}],67:[function(require,module,exports){
function isUndefined(e){return void 0===e}module.exports=isUndefined;


},{}],68:[function(require,module,exports){
var isArrayLike=require("../internal/isArrayLike"),isNative=require("../lang/isNative"),isObject=require("../lang/isObject"),shimKeys=require("../internal/shimKeys"),support=require("../support"),nativeKeys=isNative(nativeKeys=Object.keys)&&nativeKeys,keys=nativeKeys?function(e){var i=null!=e&&e.constructor;return"function"==typeof i&&i.prototype===e||("function"==typeof e?support.enumPrototypes:isArrayLike(e))?shimKeys(e):isObject(e)?nativeKeys(e):[]}:shimKeys;module.exports=keys;


},{"../internal/isArrayLike":47,"../internal/shimKeys":55,"../lang/isNative":62,"../lang/isObject":63,"../support":71}],69:[function(require,module,exports){
function keysIn(r){if(null==r)return[];isObject(r)||(r=Object(r));var o=r.length;o=o&&isLength(o)&&(isArray(r)||support.nonEnumStrings&&isString(r)||support.nonEnumArgs&&isArguments(r))&&o||0;for(var n=r.constructor,t=-1,e=isFunction(n)&&n.prototype||objectProto,s=e===r,a=Array(o),i=o>0,u=support.enumErrorProps&&(r===errorProto||r instanceof Error),p=support.enumPrototypes&&isFunction(r);++t<o;)a[t]=t+"";for(var g in r)p&&"prototype"==g||u&&("message"==g||"name"==g)||i&&isIndex(g,o)||"constructor"==g&&(s||!hasOwnProperty.call(r,g))||a.push(g);if(support.nonEnumShadows&&r!==objectProto){var c=r===stringProto?stringTag:r===errorProto?errorTag:objToString.call(r),P=nonEnumProps[c]||nonEnumProps[objectTag];for(c==objectTag&&(e=objectProto),o=shadowProps.length;o--;){g=shadowProps[o];var b=P[g];s&&b||(b?!hasOwnProperty.call(r,g):r[g]===e[g])||a.push(g)}}return a}var arrayEach=require("../internal/arrayEach"),isArguments=require("../lang/isArguments"),isArray=require("../lang/isArray"),isFunction=require("../lang/isFunction"),isIndex=require("../internal/isIndex"),isLength=require("../internal/isLength"),isObject=require("../lang/isObject"),isString=require("../lang/isString"),support=require("../support"),arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",stringTag="[object String]",shadowProps=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],errorProto=Error.prototype,objectProto=Object.prototype,stringProto=String.prototype,hasOwnProperty=objectProto.hasOwnProperty,objToString=objectProto.toString,nonEnumProps={};nonEnumProps[arrayTag]=nonEnumProps[dateTag]=nonEnumProps[numberTag]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},nonEnumProps[boolTag]=nonEnumProps[stringTag]={constructor:!0,toString:!0,valueOf:!0},nonEnumProps[errorTag]=nonEnumProps[funcTag]=nonEnumProps[regexpTag]={constructor:!0,toString:!0},nonEnumProps[objectTag]={constructor:!0},arrayEach(shadowProps,function(r){for(var o in nonEnumProps)if(hasOwnProperty.call(nonEnumProps,o)){var n=nonEnumProps[o];n[r]=hasOwnProperty.call(n,r)}}),module.exports=keysIn;


},{"../internal/arrayEach":8,"../internal/isIndex":49,"../internal/isLength":51,"../lang/isArguments":59,"../lang/isArray":60,"../lang/isFunction":61,"../lang/isObject":63,"../lang/isString":65,"../support":71}],70:[function(require,module,exports){
function escapeRegExp(e){return e=baseToString(e),e&&reHasRegExpChars.test(e)?e.replace(reRegExpChars,"\\$&"):e}var baseToString=require("../internal/baseToString"),reRegExpChars=/[.*+?^${}()|[\]\/\\]/g,reHasRegExpChars=RegExp(reRegExpChars.source);module.exports=escapeRegExp;


},{"../internal/baseToString":30}],71:[function(require,module,exports){
(function (global){
var argsTag="[object Arguments]",objectTag="[object Object]",arrayProto=Array.prototype,errorProto=Error.prototype,objectProto=Object.prototype,document=(document=global.window)&&document.document,objToString=objectProto.toString,propertyIsEnumerable=objectProto.propertyIsEnumerable,splice=arrayProto.splice,support={};!function(o){var r=function(){this.x=o},t=arguments,e={0:o,length:o},p=[];r.prototype={valueOf:o,y:o};for(var n in new r)p.push(n);support.argsTag=objToString.call(t)==argsTag,support.enumErrorProps=propertyIsEnumerable.call(errorProto,"message")||propertyIsEnumerable.call(errorProto,"name"),support.enumPrototypes=propertyIsEnumerable.call(r,"prototype"),support.funcDecomp=/\bthis\b/.test(function(){return this}),support.funcNames="string"==typeof Function.name,support.nodeTag=objToString.call(document)!=objectTag,support.nonEnumStrings=!propertyIsEnumerable.call("x",0),support.nonEnumShadows=!/valueOf/.test(p),support.ownLast="x"!=p[0],support.spliceObjects=(splice.call(e,0,1),!e[0]),support.unindexedChars="x"[0]+Object("x")[0]!="xx";try{support.dom=11===document.createDocumentFragment().nodeType}catch(s){support.dom=!1}try{support.nonEnumArgs=!propertyIsEnumerable.call(t,1)}catch(s){support.nonEnumArgs=!0}}(1,0),module.exports=support;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],72:[function(require,module,exports){
function constant(n){return function(){return n}}module.exports=constant;


},{}],73:[function(require,module,exports){
function identity(t){return t}module.exports=identity;


},{}],74:[function(require,module,exports){
function property(e){return isKey(e)?baseProperty(e):basePropertyDeep(e)}var baseProperty=require("../internal/baseProperty"),basePropertyDeep=require("../internal/basePropertyDeep"),isKey=require("../internal/isKey");module.exports=property;


},{"../internal/baseProperty":27,"../internal/basePropertyDeep":28,"../internal/isKey":50}]},{},[1])(1)
});