"use strict";

exports.__esModule = true;
exports.default = exports.VBPopover = void 0;

var _popper = _interopRequireDefault(require("popper.js"));

var _popover = _interopRequireDefault(require("../../utils/popover.class"));

var _warn = _interopRequireDefault(require("../../utils/warn"));

var _config = require("../../utils/config");

var _env = require("../../utils/env");

var _inspect = require("../../utils/inspect");

var _object = require("../../utils/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Key which we use to store tooltip object on element
var BV_POPOVER = '__BV_PopOver__'; // Valid event triggers

var validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true // Build a PopOver config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object

  /* istanbul ignore next: not easy to test */

};

var parseBindings = function parseBindings(bindings)
/* istanbul ignore next: not easy to test */
{
  // We start out with a basic config
  var NAME = 'BPopover';
  var config = {
    delay: (0, _config.getComponentConfig)(NAME, 'delay'),
    boundary: String((0, _config.getComponentConfig)(NAME, 'boundary')),
    boundaryPadding: parseInt((0, _config.getComponentConfig)(NAME, 'boundaryPadding'), 10) || 0 // Process bindings.value

  };

  if ((0, _inspect.isString)(bindings.value)) {
    // Value is popover content (html optionally supported)
    config.content = bindings.value;
  } else if ((0, _inspect.isFunction)(bindings.value)) {
    // Content generator function
    config.content = bindings.value;
  } else if ((0, _inspect.isObject)(bindings.value)) {
    // Value is config object, so merge
    config = _objectSpread({}, config, bindings.value);
  } // If argument, assume element ID of container element


  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = "#".concat(bindings.arg);
  } // Process modifiers


  (0, _object.keys)(bindings.modifiers).forEach(function (mod) {
    if (/^html$/.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (/^nofade$/.test(mod)) {
      // no animation
      config.animation = false;
    } else if (/^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)) {
      // placement of popover
      config.placement = mod;
    } else if (/^(window|viewport|scrollParent)$/.test(mod)) {
      // Boundary of popover
      config.boundary = mod;
    } else if (/^d\d+$/.test(mod)) {
      // Delay value
      var delay = parseInt(mod.slice(1), 10) || 0;

      if (delay) {
        config.delay = delay;
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // Offset value (negative allowed)
      var offset = parseInt(mod.slice(1), 10) || 0;

      if (offset) {
        config.offset = offset;
      }
    }
  }); // Special handling of event trigger modifiers trigger is
  // a space separated list

  var selectedTriggers = {}; // Parse current config object trigger

  var triggers = (0, _inspect.isString)(config.trigger) ? config.trigger.trim().split(/\s+/) : [];
  triggers.forEach(function (trigger) {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Parse modifiers for triggers

  (0, _object.keys)(validTriggers).forEach(function (trigger) {
    if (bindings.modifiers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Sanitize triggers

  config.trigger = (0, _object.keys)(selectedTriggers).join(' ');

  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to focus
    config.trigger = 'focus';
  }

  if (!config.trigger) {
    // Remove trigger config
    delete config.trigger;
  }

  return config;
}; // Add or update PopOver on our element


var applyPopover = function applyPopover(el, bindings, vnode) {
  if (!_env.isBrowser) {
    /* istanbul ignore next */
    return;
  } // Popper is required for PopOvers to work


  if (!_popper.default) {
    /* istanbul ignore next */
    (0, _warn.default)('v-b-popover: Popper.js is required for PopOvers to work');
    /* istanbul ignore next */

    return;
  }

  var config = parseBindings(bindings);

  if (el[BV_POPOVER]) {
    el[BV_POPOVER].updateConfig(config);
  } else {
    el[BV_POPOVER] = new _popover.default(el, config, vnode.context.$root);
  }
}; // Remove PopOver on our element


var removePopover = function removePopover(el) {
  if (el[BV_POPOVER]) {
    el[BV_POPOVER].destroy();
    el[BV_POPOVER] = null;
    delete el[BV_POPOVER];
  }
};
/*
 * Export our directive
 */


var VBPopover = {
  bind: function bind(el, bindings, vnode) {
    applyPopover(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode) {
    applyPopover(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyPopover(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyPopover(el, bindings, vnode);
    }
  },
  unbind: function unbind(el) {
    removePopover(el);
  }
};
exports.VBPopover = VBPopover;
var _default = VBPopover;
exports.default = _default;