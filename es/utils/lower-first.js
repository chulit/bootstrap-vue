"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * @param {string} str
 */
var lowerFirst = function lowerFirst(str) {
  str = String(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};

var _default = lowerFirst;
exports.default = _default;