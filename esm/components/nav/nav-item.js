function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { BLink, propsFactory as linkPropsFactory } from '../link/link';
export var props = linkPropsFactory(); // @vue/component

export var BNavItem =
/*#__PURE__*/
Vue.extend({
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
    return h('li', mergeData(data, {
      staticClass: 'nav-item'
    }), [h(BLink, {
      staticClass: 'nav-link',
      class: props.linkClasses,
      attrs: props.linkAttrs,
      props: props,
      on: listeners
    }, children)]);
  }
});
export default BNavItem;