"use strict";

exports.__esModule = true;
exports.default = exports.BDropdown = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _html = require("../../utils/html");

var _config = require("../../utils/config");

var _safeTypes = require("../../utils/safe-types");

var _id = _interopRequireDefault(require("../../mixins/id"));

var _dropdown = _interopRequireDefault(require("../../mixins/dropdown"));

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _button = require("../button/button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAME = 'BDropdown';
var props = {
  toggleText: {
    // This really should be toggleLabel
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'toggleText');
    }
  },
  size: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'variant');
    }
  },
  menuClass: {
    type: [String, Array],
    default: null
  },
  toggleTag: {
    type: String,
    default: 'button'
  },
  toggleClass: {
    type: [String, Array],
    default: null
  },
  noCaret: {
    type: Boolean,
    default: false
  },
  split: {
    type: Boolean,
    default: false
  },
  splitHref: {
    type: String // default: undefined

  },
  splitTo: {
    type: [String, Object] // default: undefined

  },
  splitVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'splitVariant');
    }
  },
  role: {
    type: String,
    default: 'menu'
  },
  boundary: {
    // String: `scrollParent`, `window` or `viewport`
    // HTMLElement: HTML Element reference
    type: [String, _safeTypes.HTMLElement],
    default: 'scrollParent'
  } // @vue/component

};
exports.props = props;

var BDropdown =
/*#__PURE__*/
_vue.default.extend({
  name: NAME,
  mixins: [_id.default, _dropdown.default, _normalizeSlot.default],
  props: props,
  computed: {
    dropdownClasses: function dropdownClasses() {
      return [this.directionClass, {
        show: this.visible,
        // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
        // when boundary is anything other than `scrollParent`
        // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
        'position-static': this.boundary !== 'scrollParent' || !this.boundary
      }];
    },
    menuClasses: function menuClasses() {
      return [this.menuClass, {
        'dropdown-menu-right': this.right,
        show: this.visible
      }];
    },
    toggleClasses: function toggleClasses() {
      return [this.toggleClass, {
        'dropdown-toggle-split': this.split,
        'dropdown-toggle-no-caret': this.noCaret && !this.split
      }];
    }
  },
  render: function render(h) {
    var split = h(false);
    var buttonContent = this.normalizeSlot('button-content') || this.normalizeSlot('text') || this.html || (0, _html.stripTags)(this.text);

    if (this.split) {
      var btnProps = {
        disabled: this.disabled,
        variant: this.splitVariant || this.variant,
        size: this.size // We add these as needed due to router-link issues with defined property with undefined/null values

      };

      if (this.splitTo) {
        btnProps.to = this.splitTo;
      }

      if (this.splitHref) {
        btnProps.href = this.splitHref;
      }

      split = h(_button.BButton, {
        ref: 'button',
        props: btnProps,
        attrs: {
          id: this.safeId('_BV_button_')
        },
        on: {
          click: this.click
        }
      }, [buttonContent]);
    }

    var toggle = h(_button.BButton, {
      ref: 'toggle',
      staticClass: 'dropdown-toggle',
      class: this.toggleClasses,
      props: {
        variant: this.variant,
        size: this.size,
        disabled: this.disabled,
        tag: this.toggleTag
      },
      attrs: {
        id: this.safeId('_BV_toggle_'),
        'aria-haspopup': 'true',
        'aria-expanded': this.visible ? 'true' : 'false'
      },
      on: {
        click: this.toggle,
        // click
        keydown: this.toggle // enter, space, down

      }
    }, [this.split ? h('span', {
      class: ['sr-only']
    }, [this.toggleText]) : buttonContent]);
    var menu = h('ul', {
      ref: 'menu',
      staticClass: 'dropdown-menu',
      class: this.menuClasses,
      attrs: {
        role: this.role,
        tabindex: '-1',
        'aria-labelledby': this.safeId(this.split ? '_BV_button_' : '_BV_toggle_')
      },
      on: {
        keydown: this.onKeydown // up, down, esc

      }
    }, this.normalizeSlot('default', {
      hide: this.hide
    }));
    return h('div', {
      staticClass: 'dropdown btn-group b-dropdown',
      class: this.dropdownClasses,
      attrs: {
        id: this.safeId()
      }
    }, [split, toggle, menu]);
  }
});

exports.BDropdown = BDropdown;
var _default2 = BDropdown;
exports.default = _default2;