function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { BForm, props as formProps } from '../form/form';
export var BDropdownForm =
/*#__PURE__*/
Vue.extend({
  name: 'BDropdownForm',
  functional: true,
  inheritAttrs: false,
  props: _objectSpread({}, formProps, {
    disabled: {
      type: Boolean,
      default: false
    }
  }),
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('li', [h(BForm, mergeData(data, {
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
export default BDropdownForm;