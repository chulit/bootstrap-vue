"use strict";

exports.__esModule = true;
exports.default = exports.BNavItem = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _link = require("../link/link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = (0, _link.propsFactory)(); // @vue/component

exports.props = props;

var BNavItem =
/*#__PURE__*/
_vue.default.extend({
  name: 'BNavItem',
  functional: true,
  props: _objectSpread({}, props, {
    linkAttrs: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    linkClasses: {
      type: [String, Object, Array],
      default: null
    }
  }),
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;
    // We transfer the listeners to the link
    delete data.on;
    return h('li', (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'nav-item'
    }), [h(_link.BLink, {
      staticClass: 'nav-link',
      class: props.linkClasses,
      attrs: props.linkAttrs,
      props: props,
      on: listeners
    }, children)]);
  }
});

exports.BNavItem = BNavItem;
var _default2 = BNavItem;
exports.default = _default2;