function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { BInputGroupAddon, commonProps } from './input-group-addon'; // @vue/component

export var BInputGroupPrepend =
/*#__PURE__*/
Vue.extend({
  name: 'BInputGroupPrepend',
  functional: true,
  props: commonProps,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    // pass all our props/attrs down to child, and set`append` to false
    return h(BInputGroupAddon, mergeData(data, {
      props: _objectSpread({}, props, {
        append: false
      })
    }), children);
  }
});
export default BInputGroupPrepend;