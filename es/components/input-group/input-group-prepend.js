"use strict";

exports.__esModule = true;
exports.default = exports.BInputGroupPrepend = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _inputGroupAddon = require("./input-group-addon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @vue/component
var BInputGroupPrepend =
/*#__PURE__*/
_vue.default.extend({
  name: 'BInputGroupPrepend',
  functional: true,
  props: _inputGroupAddon.commonProps,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    // pass all our props/attrs down to child, and set`append` to false
    return h(_inputGroupAddon.BInputGroupAddon, (0, _vueFunctionalDataMerge.mergeData)(data, {
      props: _objectSpread({}, props, {
        append: false
      })
    }), children);
  }
});

exports.BInputGroupPrepend = BInputGroupPrepend;
var _default = BInputGroupPrepend;
exports.default = _default;