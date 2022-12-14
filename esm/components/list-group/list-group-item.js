function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { mergeData } from 'vue-functional-data-merge';
import pluckProps from '../../utils/pluck-props';
import { arrayIncludes } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { BLink, propsFactory as linkPropsFactory } from '../link/link';
var NAME = 'BListGroupItem';
var actionTags = ['a', 'router-link', 'button', 'b-link'];
var linkProps = linkPropsFactory();
delete linkProps.href.default;
delete linkProps.to.default;
export var props = _objectSpread({
  tag: {
    type: String,
    default: 'div'
  },
  action: {
    type: Boolean,
    default: null
  },
  button: {
    type: Boolean,
    default: null
  },
  variant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'variant');
    }
  }
}, linkProps); // @vue/component

export var BListGroupItem =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var tag = props.button ? 'button' : !props.href && !props.to ? props.tag : BLink;
    var isAction = Boolean(props.href || props.to || props.action || props.button || arrayIncludes(actionTags, props.tag));
    var attrs = {};
    var itemProps = {};

    if (tag === 'button') {
      if (!data.attrs || !data.attrs.type) {
        // Add a type for button is one not provided in passed attributes
        attrs.type = 'button';
      }

      if (props.disabled) {
        // Set disabled attribute if button and disabled
        attrs.disabled = true;
      }
    } else {
      itemProps = pluckProps(linkProps, props);
    }

    var componentData = {
      attrs: attrs,
      props: itemProps,
      staticClass: 'list-group-item',
      class: (_class = {}, _defineProperty(_class, "list-group-item-".concat(props.variant), Boolean(props.variant)), _defineProperty(_class, 'list-group-item-action', isAction), _defineProperty(_class, "active", props.active), _defineProperty(_class, "disabled", props.disabled), _class)
    };
    return h(tag, mergeData(data, componentData), children);
  }
});
export default BListGroupItem;