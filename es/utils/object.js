"use strict";

exports.__esModule = true;
exports.deepFreeze = exports.readonlyDescriptor = exports.omit = exports.isPlainObject = exports.isObject = exports.hasOwnProperty = exports.is = exports.isFrozen = exports.create = exports.getPrototypeOf = exports.getOwnPropertySymbols = exports.getOwnPropertyDescriptor = exports.freeze = exports.defineProperty = exports.defineProperties = exports.keys = exports.getOwnPropertyNames = exports.assign = void 0;

var _assign = _interopRequireDefault(require("core-js/library/fn/object/assign"));

var _is = _interopRequireDefault(require("core-js/library/fn/object/is"));

var _array = require("./array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// --- Static ---
var assign = Object.assign || _assign.default;
exports.assign = assign;
var getOwnPropertyNames = Object.getOwnPropertyNames;
exports.getOwnPropertyNames = getOwnPropertyNames;
var keys = Object.keys;
exports.keys = keys;
var defineProperties = Object.defineProperties;
exports.defineProperties = defineProperties;
var defineProperty = Object.defineProperty;
exports.defineProperty = defineProperty;
var freeze = Object.freeze;
exports.freeze = freeze;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
exports.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
exports.getOwnPropertySymbols = getOwnPropertySymbols;
var getPrototypeOf = Object.getPrototypeOf;
exports.getPrototypeOf = getPrototypeOf;
var create = Object.create;
exports.create = create;
var isFrozen = Object.isFrozen;
exports.isFrozen = isFrozen;
var is = Object.is || _is.default; // --- "Instance" ---

exports.is = is;

var hasOwnProperty = function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}; // --- Utilities ---

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * Note object could be a complex type like array, date, etc.
 */


exports.hasOwnProperty = hasOwnProperty;

var isObject = function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
};
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


exports.isObject = isObject;

var isPlainObject = function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}; // @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc


exports.isPlainObject = isPlainObject;

var omit = function omit(obj, props) {
  return keys(obj).filter(function (key) {
    return props.indexOf(key) === -1;
  }).reduce(function (result, key) {
    return _objectSpread({}, result, _defineProperty({}, key, obj[key]));
  }, {});
};

exports.omit = omit;

var readonlyDescriptor = function readonlyDescriptor() {
  return {
    enumerable: true,
    configurable: false,
    writable: false
  };
};
/**
 * Deep-freezes and object, making it immutable / read-only.
 * Returns the same object passed-in, but frozen.
 * Freezes inner object/array/values first.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * Note: this method will not work for property values using Symbol() as a key
 */


exports.readonlyDescriptor = readonlyDescriptor;

var deepFreeze = function deepFreeze(obj) {
  // Retrieve the property names defined on object/array
  // Note: `keys` will ignore properties that are keyed by a `Symbol()`
  var props = keys(obj); // Iterate over each prop and recursively freeze it

  props.forEach(function (prop) {
    var value = obj[prop]; // If value is a plain object or array, we deepFreeze it

    obj[prop] = value && (isPlainObject(value) || (0, _array.isArray)(value)) ? deepFreeze(value) : value;
  });
  return freeze(obj);
};

exports.deepFreeze = deepFreeze;