function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { props as BDropdownProps } from '../dropdown/dropdown';
import idMixin from '../../mixins/id';
import dropdownMixin from '../../mixins/dropdown';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import pluckProps from '../../utils/pluck-props';
import { htmlOrText } from '../../utils/html';
import { BLink } from '../link/link'; // -- Constants --

export var props = _objectSpread({}, pluckProps(['menuClass', 'toggleClass', 'noCaret', 'role'], BDropdownProps), {
  extraMenuClasses: {
    type: String,
    default: '',
    // `deprecated` -> Don't use this prop
    // `deprecation` -> Refers to a change in prop usage
    deprecated: 'Setting prop "extra-menu-classes" is deprecated. Use "menu-class" prop instead.'
  },
  extraToggleClasses: {
    type: String,
    default: '',
    // `deprecated` -> Don't use this prop
    // `deprecation` -> Refers to a change in prop usage
    deprecated: 'Setting prop "extra-toggle-classes" is deprecated. Use "toggle-class" prop instead.'
  } // @vue/component

});
export var BNavItemDropdown =
/*#__PURE__*/
Vue.extend({
  name: 'BNavItemDropdown',
  mixins: [idMixin, dropdownMixin, normalizeSlotMixin],
  props: props,
  computed: {
    isNav: function isNav() {
      // Signal to dropdown mixin that we are in a navbar
      return true;
    },
    dropdownClasses: function dropdownClasses() {
      return [this.directionClass, {
        show: this.visible
      }];
    },
    menuClasses: function menuClasses() {
      return [this.extraMenuClasses, // Deprecated
      this.menuClass, {
        'dropdown-menu-right': this.right,
        show: this.visible
      }];
    },
    toggleClasses: function toggleClasses() {
      return [this.extraToggleClasses, // Deprecated
      this.toggleClass, {
        disabled: this.disabled,
        'dropdown-toggle-no-caret': this.noCaret
      }];
    }
  },
  render: function render(h) {
    var button = h(BLink, {
      ref: 'toggle',
      staticClass: 'nav-link dropdown-toggle',
      class: this.toggleClasses,
      props: {
        href: '#',
        disabled: this.disabled
      },
      attrs: {
        id: this.safeId('_BV_button_'),
        'aria-haspopup': 'true',
        'aria-expanded': String(this.visible)
      },
      on: {
        click: this.toggle,
        keydown: this.toggle // space, enter, down

      }
    }, [this.$slots['button-content'] || this.$slots.text || h('span', {
      domProps: htmlOrText(this.html, this.text)
    })]);
    var menu = h('ul', {
      staticClass: 'dropdown-menu',
      class: this.menuClasses,
      ref: 'menu',
      attrs: {
        tabindex: '-1',
        'aria-labelledby': this.safeId('_BV_button_')
      },
      on: {
        keydown: this.onKeydown // up, down, esc

      }
    }, [this.normalizeSlot('default', {
      hide: this.hide
    })]);
    return h('li', {
      staticClass: 'nav-item b-nav-dropdown dropdown',
      class: this.dropdownClasses,
      attrs: {
        id: this.safeId()
      }
    }, [button, menu]);
  }
});
export default BNavItemDropdown;