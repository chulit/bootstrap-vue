"use strict";

exports.__esModule = true;
exports.default = exports.BLink = exports.omitLinkProps = exports.pickLinkProps = exports.props = exports.propsFactory = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _array = require("../../utils/array");

var _inspect = require("../../utils/inspect");

var _object = require("../../utils/object");

var _router = require("../../utils/router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * The Link component is used in many other BV components.
 * As such, sharing its props makes supporting all its features easier.
 * However, some components need to modify the defaults for their own purpose.
 * Prefer sharing a fresh copy of the props to ensure mutations
 * do not affect other component references to the props.
 *
 * https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
 * @return {{}}
 */
var propsFactory = function propsFactory() {
  return {
    href: {
      type: String,
      default: null
    },
    rel: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: '_self'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // router-link specific props
    to: {
      type: [String, Object],
      default: null
    },
    append: {
      type: Boolean,
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    activeClass: {
      type: String // default: undefined

    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String // default: undefined

    },
    routerTag: {
      type: String,
      default: 'a'
    },
    // nuxt-link specific prop(s)
    noPrefetch: {
      type: Boolean,
      default: false
    }
  };
};

exports.propsFactory = propsFactory;
var props = propsFactory(); // Return a fresh copy of <b-link> props
// Containing only the specified prop(s)

exports.props = props;

var pickLinkProps = function pickLinkProps(propsToPick) {
  var freshLinkProps = propsFactory(); // Normalize everything to array.

  propsToPick = (0, _array.concat)(propsToPick);
  return (0, _object.keys)(freshLinkProps).reduce(function (memo, prop) {
    if ((0, _array.arrayIncludes)(propsToPick, prop)) {
      memo[prop] = freshLinkProps[prop];
    }

    return memo;
  }, {});
}; // Return a fresh copy of <b-link> props
// Keeping all but the specified omitting prop(s)


exports.pickLinkProps = pickLinkProps;

var omitLinkProps = function omitLinkProps(propsToOmit) {
  var freshLinkProps = propsFactory(); // Normalize everything to array.

  propsToOmit = (0, _array.concat)(propsToOmit);
  return (0, _object.keys)(props).reduce(function (memo, prop) {
    if (!(0, _array.arrayIncludes)(propsToOmit, prop)) {
      memo[prop] = freshLinkProps[prop];
    }

    return memo;
  }, {});
};

exports.omitLinkProps = omitLinkProps;

var clickHandlerFactory = function clickHandlerFactory(_ref) {
  var disabled = _ref.disabled,
      tag = _ref.tag,
      href = _ref.href,
      suppliedHandler = _ref.suppliedHandler,
      parent = _ref.parent;
  return function onClick(evt) {
    var _arguments = arguments;

    if (disabled && evt instanceof Event) {
      // Stop event from bubbling up.
      evt.stopPropagation(); // Kill the event loop attached to this specific EventTarget.
      // Needed to prevent vue-router for doing its thing

      evt.stopImmediatePropagation();
    } else {
      if ((0, _router.isRouterLink)(tag) && evt.currentTarget.__vue__) {
        // Router links do not emit instance 'click' events, so we
        // add in an $emit('click', evt) on it's vue instance

        /* istanbul ignore next: difficult to test, but we know it works */
        evt.currentTarget.__vue__.$emit('click', evt);
      } // Call the suppliedHandler(s), if any provided


      (0, _array.concat)(suppliedHandler).filter(function (h) {
        return (0, _inspect.isFunction)(h);
      }).forEach(function (handler) {
        handler.apply(void 0, _toConsumableArray(_arguments));
      });
      parent.$root.$emit('clicked::link', evt);
    }

    if (!(0, _router.isRouterLink)(tag) && href === '#' || disabled) {
      // Stop scroll-to-top behavior or navigation on regular links
      // when href is just '#'
      evt.preventDefault();
    }
  };
}; // @vue/component


var BLink =
/*#__PURE__*/
_vue.default.extend({
  name: 'BLink',
  functional: true,
  props: propsFactory(),
  render: function render(h, _ref2) {
    var props = _ref2.props,
        data = _ref2.data,
        parent = _ref2.parent,
        children = _ref2.children;
    var tag = (0, _router.computeTag)(props, parent);
    var rel = (0, _router.computeRel)(props);
    var href = (0, _router.computeHref)(props, tag);
    var eventType = (0, _router.isRouterLink)(tag) ? 'nativeOn' : 'on';
    var suppliedHandler = (data[eventType] || {}).click;
    var handlers = {
      click: clickHandlerFactory({
        tag: tag,
        href: href,
        disabled: props.disabled,
        suppliedHandler: suppliedHandler,
        parent: parent
      })
    };
    var componentData = (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: {
        active: props.active,
        disabled: props.disabled
      },
      attrs: {
        rel: rel,
        target: props.target,
        tabindex: props.disabled ? '-1' : data.attrs ? data.attrs.tabindex : null,
        'aria-disabled': props.disabled ? 'true' : null
      },
      props: _objectSpread({}, props, {
        tag: props.routerTag
      })
    }); // If href attribute exists on router-link (even undefined or null) it fails working on SSR
    // So we explicitly add it here if needed (i.e. if computeHref() is truthy)

    if (href) {
      componentData.attrs.href = href;
    } else {
      // Ensure the prop HREF does not exist for router links
      delete componentData.props.href;
    } // We want to overwrite any click handler since our callback
    // will invoke the user supplied handler if !props.disabled


    componentData[eventType] = _objectSpread({}, componentData[eventType] || {}, handlers);
    return h(tag, componentData, children);
  }
});

exports.BLink = BLink;
var _default = BLink;
exports.default = _default;