"use strict";

exports.__esModule = true;
exports.default = exports.BNavItemDropdown = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _dropdown = require("../dropdown/dropdown");

var _id = _interopRequireDefault(require("../../mixins/id"));

var _dropdown2 = _interopRequireDefault(require("../../mixins/dropdown"));

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _pluckProps = _interopRequireDefault(require("../../utils/pluck-props"));

var _html = require("../../utils/html");

var _link = require("../link/link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// -- Constants --
var props = _objectSpread({}, (0, _pluckProps.default)(['menuClass', 'toggleClass', 'noCaret', 'role'], _dropdown.props), {
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

exports.props = props;

var BNavItemDropdown =
/*#__PURE__*/
_vue.default.extend({
  name: 'BNavItemDropdown',
  mixins: [_id.default, _dropdown2.default, _normalizeSlot.default],
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
    var button = h(_link.BLink, {
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
      domProps: (0, _html.htmlOrText)(this.html, this.text)
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

exports.BNavItemDropdown = BNavItemDropdown;
var _default = BNavItemDropdown;
exports.default = _default;