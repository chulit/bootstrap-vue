import ScrollSpy from './scrollspy.class';
import { isBrowser } from '../../utils/env';
import { keys } from '../../utils/object';
import { isNumber, isObject, isString } from '../../utils/inspect'; // Key we use to store our instance

var BV_SCROLLSPY = '__BV_ScrollSpy__'; // Build a ScrollSpy config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object

/* istanbul ignore next: not easy to test */

var parseBindings = function parseBindings(bindings)
/* istanbul ignore next: not easy to test */
{
  var config = {}; // If argument, assume element ID

  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.element = "#".concat(bindings.arg);
  } // Process modifiers


  keys(bindings.modifiers).forEach(function (mod) {
    if (/^\d+$/.test(mod)) {
      // Offset value
      config.offset = parseInt(mod, 10);
    } else if (/^(auto|position|offset)$/.test(mod)) {
      // Offset method
      config.method = mod;
    }
  }); // Process value

  if (isString(bindings.value)) {
    // Value is a CSS ID or selector
    config.element = bindings.value;
  } else if (isNumber(bindings.value)) {
    // Value is offset
    config.offset = Math.round(bindings.value);
  } else if (isObject(bindings.value)) {
    // Value is config object
    // Filter the object based on our supported config options
    keys(bindings.value).filter(function (k) {
      return Boolean(ScrollSpy.DefaultType[k]);
    }).forEach(function (k) {
      config[k] = bindings.value[k];
    });
  }

  return config;
}; // Add or update ScrollSpy on our element


var applyScrollspy = function applyScrollspy(el, bindings, vnode)
/* istanbul ignore next: not easy to test */
{
  if (!isBrowser) {
    /* istanbul ignore next */
    return;
  }

  var config = parseBindings(bindings);

  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].updateConfig(config, vnode.context.$root);
  } else {
    el[BV_SCROLLSPY] = new ScrollSpy(el, config, vnode.context.$root);
  }
}; // Remove ScrollSpy on our element

/* istanbul ignore next: not easy to test */


var removeScrollspy = function removeScrollspy(el)
/* istanbul ignore next: not easy to test */
{
  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].dispose();
    el[BV_SCROLLSPY] = null;
    delete el[BV_SCROLLSPY];
  }
};
/*
 * Export our directive
 */


export var VBScrollspy = {
  bind: function bind(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    applyScrollspy(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    applyScrollspy(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyScrollspy(el, bindings, vnode);
    }
  },
  unbind: function unbind(el)
  /* istanbul ignore next: not easy to test */
  {
    removeScrollspy(el);
  }
};
export default VBScrollspy;