"use strict";

exports.__esModule = true;
exports.default = exports.BVTransition = void 0;

var _vue = _interopRequireDefault(require("./vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _inspect = require("./inspect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NO_FADE_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: 'show',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: ''
};

var FADE_PROPS = _objectSpread({}, NO_FADE_PROPS, {
  enterActiveClass: 'fade',
  leaveActiveClass: 'fade'
});

var BVTransition =
/*#__PURE__*/
_vue.default.extend({
  name: 'BVTransition',
  functional: true,
  props: {
    noFade: {
      // Only applicable to the built in transition
      // Has no effect if `trans-props` provided
      type: Boolean,
      default: false
    },
    mode: {
      type: String // default: undefined

    },
    // For user supplied transitions (if needed)
    transProps: {
      type: Object,
      default: null
    }
  },
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        listeners = _ref.listeners,
        props = _ref.props;
    var transProps = props.transProps;

    if (!(0, _inspect.isPlainObject)(transProps)) {
      transProps = props.noFade ? NO_FADE_PROPS : FADE_PROPS;
    }

    transProps = _objectSpread({
      mode: props.mode
    }, transProps, {
      // We always need `css` true
      css: true
    });
    return h('transition', // Any listeners will get merged here
    (0, _vueFunctionalDataMerge.mergeData)(data, {
      props: transProps
    }), children);
  }
});

exports.BVTransition = BVTransition;
var _default = BVTransition;
exports.default = _default;