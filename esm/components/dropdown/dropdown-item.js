function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { requestAF } from '../../utils/dom';
import nomalizeSlotMixin from '../../mixins/normalize-slot';
import { BLink, propsFactory as linkPropsFactory } from '../link/link';
export var props = linkPropsFactory(); // @vue/component

export var BDropdownItem =
/*#__PURE__*/
Vue.extend({
  name: 'BDropdownItem',
  mixins: [nomalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props: _objectSpread({}, props, {
    variant: {
      type: String,
      default: null
    }
  }),
  methods: {
    closeDropdown: function closeDropdown() {
      var _this = this;

      // Close on next animation frame to allow <b-link> time to process
      requestAF(function () {
        if (_this.bvDropdown) {
          _this.bvDropdown.hide(true);
        }
      });
    },
    onClick: function onClick(evt) {
      this.$emit('click', evt);
      this.closeDropdown();
    }
  },
  render: function render(h) {
    return h('li', [h(BLink, {
      props: this.$props,
      staticClass: 'dropdown-item',
      class: _defineProperty({}, "text-".concat(this.variant), this.variant && !(this.active || this.disabled)),
      attrs: _objectSpread({}, this.$attrs, {
        role: 'menuitem'
      }),
      on: {
        click: this.onClick
      },
      ref: 'item'
    }, this.normalizeSlot('default'))]);
  }
});
export default BDropdownItem;