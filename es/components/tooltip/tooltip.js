"use strict";

exports.__esModule = true;
exports.default = exports.BTooltip = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _tooltip = _interopRequireDefault(require("../../utils/tooltip.class"));

var _warn = _interopRequireDefault(require("../../utils/warn"));

var _array = require("../../utils/array");

var _config = require("../../utils/config");

var _safeTypes = require("../../utils/safe-types");

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _toolpop = _interopRequireDefault(require("../../mixins/toolpop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAME = 'BTooltip'; // @vue/component

var BTooltip =
/*#__PURE__*/
_vue.default.extend({
  name: NAME,
  mixins: [_toolpop.default, _normalizeSlot.default],
  props: {
    title: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    },
    fallbackPlacement: {
      type: [String, Array],
      default: 'flip',
      validator: function validator(value) {
        return (0, _array.isArray)(value) || (0, _array.arrayIncludes)(['flip', 'clockwise', 'counterclockwise'], value);
      }
    },
    delay: {
      type: [Number, Object, String],
      default: function _default() {
        return (0, _config.getComponentConfig)(NAME, 'delay');
      }
    },
    boundary: {
      // String: scrollParent, window, or viewport
      // Element: element reference
      type: [String, _safeTypes.HTMLElement],
      default: function _default() {
        return (0, _config.getComponentConfig)(NAME, 'boundary');
      }
    },
    boundaryPadding: {
      type: Number,
      default: function _default() {
        return (0, _config.getComponentConfig)(NAME, 'boundaryPadding');
      }
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    createToolpop: function createToolpop() {
      // getTarget is in toolpop mixin
      var target = this.getTarget();
      /* istanbul ignore else */

      if (target) {
        this._toolpop = new _tooltip.default(target, this.getConfig(), this.$root);
      } else {
        this._toolpop = null;
        (0, _warn.default)("b-tooltip: 'target' element not found!");
      }

      return this._toolpop;
    }
  },
  render: function render(h) {
    return h('div', {
      class: ['d-none'],
      style: {
        display: 'none'
      },
      attrs: {
        'aria-hidden': true
      }
    }, [h('div', {
      ref: 'title'
    }, this.normalizeSlot('default'))]);
  }
});

exports.BTooltip = BTooltip;
var _default2 = BTooltip;
exports.default = _default2;