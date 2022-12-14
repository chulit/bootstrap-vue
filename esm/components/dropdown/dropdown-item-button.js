function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import nomalizeSlotMixin from '../../mixins/normalize-slot';
export var props = {
  active: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: 'active'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: null
  } // @vue/component

};
export var BDropdownItemButton =
/*#__PURE__*/
Vue.extend({
  name: 'BDropdownItemButton',
  mixins: [nomalizeSlotMixin],
  inheritAttrs: false,
  inject: {
    bvDropdown: {
      default: null
    }
  },
  props: props,
  methods: {
    closeDropdown: function closeDropdown() {
      if (this.bvDropdown) {
        this.bvDropdown.hide(true);
      }
    },
    onClick: function onClick(evt) {
      this.$emit('click', evt);
      this.closeDropdown();
    }
  },
  render: function render(h) {
    var _class;

    return h('li', [h('button', {
      staticClass: 'dropdown-item',
      class: (_class = {}, _defineProperty(_class, this.activeClass, this.active), _defineProperty(_class, "text-".concat(this.variant), this.variant && !(this.active || this.disabled)), _class),
      attrs: _objectSpread({}, this.$attrs, {
        role: 'menuitem',
        type: 'button',
        disabled: this.disabled
      }),
      on: {
        click: this.onClick
      },
      ref: 'button'
    }, this.normalizeSlot('default'))]);
  }
});
export default BDropdownItemButton;