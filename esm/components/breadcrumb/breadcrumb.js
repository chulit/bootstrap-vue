function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import toString from '../../utils/to-string';
import { isArray, isObject } from '../../utils/inspect';
import { BBreadcrumbItem } from './breadcrumb-item';
export var props = {
  items: {
    type: Array,
    default: null
  } // @vue/component

};
export var BBreadcrumb =
/*#__PURE__*/
Vue.extend({
  name: 'BBreadcrumb',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var childNodes = children; // Build child nodes from items if given.

    if (isArray(props.items)) {
      var activeDefined = false;
      childNodes = props.items.map(function (item, idx) {
        if (!isObject(item)) {
          item = {
            text: toString(item)
          };
        } // Copy the value here so we can normalize it.


        var active = item.active;

        if (active) {
          activeDefined = true;
        }

        if (!active && !activeDefined) {
          // Auto-detect active by position in list.
          active = idx + 1 === props.items.length;
        }

        return h(BBreadcrumbItem, {
          props: _objectSpread({}, item, {
            active: active
          })
        });
      });
    }

    return h('ol', mergeData(data, {
      staticClass: 'breadcrumb'
    }), childNodes);
  }
});
export default BBreadcrumb;