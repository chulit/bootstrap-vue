"use strict";

exports.__esModule = true;
exports.default = exports.BNavbarBrand = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _pluckProps = _interopRequireDefault(require("../../utils/pluck-props"));

var _link = require("../link/link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var linkProps = (0, _link.propsFactory)();
linkProps.href.default = undefined;
linkProps.to.default = undefined;

var props = _objectSpread({}, linkProps, {
  tag: {
    type: String,
    default: 'div'
  } // @vue/component

});

exports.props = props;

var BNavbarBrand =
/*#__PURE__*/
_vue.default.extend({
  name: 'BNavbarBrand',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var isLink = Boolean(props.to || props.href);
    var tag = isLink ? _link.BLink : props.tag;
    return h(tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'navbar-brand',
      props: isLink ? (0, _pluckProps.default)(linkProps, props) : {}
    }), children);
  }
});

exports.BNavbarBrand = BNavbarBrand;
var _default = BNavbarBrand;
exports.default = _default;