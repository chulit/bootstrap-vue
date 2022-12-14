"use strict";

exports.__esModule = true;
exports.default = exports.BDropdownItem = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _dom = require("../../utils/dom");

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _link = require("../link/link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = (0, _link.propsFactory)(); // @vue/component

exports.props = props;

var BDropdownItem =
/*#__PURE__*/
_vue.default.extend({
  name: 'BDropdownItem',
  mixins: [_normalizeSlot.default],
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
      (0, _dom.requestAF)(function () {
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
    return h('li', [h(_link.BLink, {
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

exports.BDropdownItem = BDropdownItem;
var _default = BDropdownItem;
exports.default = _default;