import Vue from '../../utils/vue';
import PopOver from '../../utils/popover.class';
import warn from '../../utils/warn';
import { isArray, arrayIncludes } from '../../utils/array';
import { getComponentConfig } from '../../utils/config';
import { HTMLElement } from '../../utils/safe-types';
import normalizeSlotMixin from '../../mixins/normalize-slot';
import toolpopMixin from '../../mixins/toolpop';
var NAME = 'BPopover';
export var props = {
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  triggers: {
    type: [String, Array],
    default: 'click'
  },
  placement: {
    type: String,
    default: 'right'
  },
  fallbackPlacement: {
    type: [String, Array],
    default: 'flip',
    validator: function validator(value) {
      return isArray(value) || arrayIncludes(['flip', 'clockwise', 'counterclockwise'], value);
    }
  },
  delay: {
    type: [Number, Object, String],
    default: function _default() {
      return getComponentConfig(NAME, 'delay');
    }
  },
  boundary: {
    // String: scrollParent, window, or viewport
    // Element: element reference
    type: [String, HTMLElement],
    default: function _default() {
      return getComponentConfig(NAME, 'boundary');
    }
  },
  boundaryPadding: {
    type: Number,
    default: function _default() {
      return getComponentConfig(NAME, 'boundaryPadding');
    }
  } // @vue/component

};
export var BPopover =
/*#__PURE__*/
Vue.extend({
  name: NAME,
  mixins: [toolpopMixin, normalizeSlotMixin],
  props: props,
  data: function data() {
    return {};
  },
  methods: {
    createToolpop: function createToolpop() {
      // getTarget is in toolpop mixin
      var target = this.getTarget();
      /* istanbul ignore else */

      if (target) {
        this._toolpop = new PopOver(target, this.getConfig(), this.$root);
      } else {
        this._toolpop = null;
        warn("b-popover: 'target' element not found!");
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
    }, this.normalizeSlot('title')), h('div', {
      ref: 'content'
    }, this.normalizeSlot('default'))]);
  }
});
export default BPopover;