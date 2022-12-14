"use strict";

exports.__esModule = true;
exports.default = exports.BDropdownForm = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _form = require("../form/form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BDropdownForm =
/*#__PURE__*/
_vue.default.extend({
  name: 'BDropdownForm',
  functional: true,
  inheritAttrs: false,
  props: _objectSpread({}, _form.props, {
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', [h(_form.BForm, (0, _vueFunctionalDataMerge.mergeData)(data, {
      ref: 'form',
      staticClass: 'b-dropdown-form',
      class: {
        disabled: props.disabled
      },
      props: props,
      attrs: {
        disabled: props.disabled,
        // Tab index of -1 for keyboard navigation
        tabindex: props.disabled ? null : '-1'
      }
    }), children)]);
  }
});

exports.BDropdownForm = BDropdownForm;
var _default = BDropdownForm;
exports.default = _default;