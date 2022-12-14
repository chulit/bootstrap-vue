function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import { getComponentConfig } from '../../utils/config';
import pluckProps from '../../utils/pluck-props';
import { BLink, propsFactory as linkPropsFactory } from '../link/link';
var NAME = 'BBadge';
var linkProps = linkPropsFactory();
delete linkProps.href.default;
delete linkProps.to.default;
export var props = _objectSpread({}, linkProps, {
  tag: {
    type: String,
    default: 'span'
  },
  variant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'variant');
    }
  },
  pill: {
    type: Boolean,
    default: false
  } // @vue/component

});
export var BBadge =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var tag = !props.href && !props.to ? props.tag : BLink;
    var componentData = {
      staticClass: 'badge',
      class: [props.variant ? "badge-".concat(props.variant) : 'badge-secondary', {
        'badge-pill': Boolean(props.pill),
        active: props.active,
        disabled: props.disabled
      }],
      props: pluckProps(linkProps, props)
    };
    return h(tag, mergeData(data, componentData), children);
  }
});
export default BBadge;