"use strict";

exports.__esModule = true;
exports.default = exports.BInputGroupAddon = exports.commonProps = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _inputGroupText = require("./input-group-text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var commonProps = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  isText: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.commonProps = commonProps;

var BInputGroupAddon =
/*#__PURE__*/
_vue.default.extend({
  name: 'BInputGroupAddon',
  functional: true,
  props: _objectSpread({}, commonProps, {
    append: {
      type: Boolean,
      default: false
    }
  }),
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: {
        'input-group-append': props.append,
        'input-group-prepend': !props.append
      },
      attrs: {
        id: props.id
      }
    }), props.isText ? [h(_inputGroupText.BInputGroupText, children)] : children);
  }
});

exports.BInputGroupAddon = BInputGroupAddon;
var _default = BInputGroupAddon;
exports.default = _default;