function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import idMixin from '../../mixins/id';
import formMixin from '../../mixins/form';
import formSizeMixin from '../../mixins/form-size';
import formStateMixin from '../../mixins/form-state';
import formTextMixin from '../../mixins/form-text';
import formSelectionMixin from '../../mixins/form-selection';
import formValidityMixin from '../../mixins/form-validity';
import { getCS, isVisible } from '../../utils/dom';
import { isNull } from '../../utils/inspect'; // @vue/component

export var BFormTextarea =
/*#__PURE__*/
Vue.extend({
  name: 'BFormTextarea',
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formTextMixin, formSelectionMixin, formValidityMixin],
  props: {
    rows: {
      type: [Number, String],
      default: 2
    },
    maxRows: {
      type: [Number, String],
      default: null
    },
    wrap: {
      // 'soft', 'hard' or 'off'. Browser default is 'soft'
      type: String,
      default: 'soft'
    },
    noResize: {
      // Disable the resize handle of textarea
      type: Boolean,
      default: false
    },
    noAutoShrink: {
      // When in auto resize mode, disable shrinking to content height
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      dontResize: true,
      heightInPx: null
    };
  },
  computed: {
    computedStyle: function computedStyle() {
      var styles = {
        // Setting `noResize` to true will disable the ability for the user to
        // manually resize the textarea. We also disable when in auto height mode
        resize: !this.computedRows || this.noResize ? 'none' : null
      };

      if (!this.computedRows) {
        // Conditionaly set the computed CSS height when auto rows/height is enabled.
        // We avoid setting the style to null, which can override user manual resize handle.
        styles.height = this.heightInPx; // We always add a vertical scrollbar to the textarea when auto-height is
        // enabled so that the computed height calcaultion returns a stable value.

        styles.overflowY = 'scroll';
      }

      return styles;
    },
    computedMinRows: function computedMinRows() {
      // Ensure rows is at least 2 and positive (2 is the native textarea value).
      // A value of 1 can cause issues in some browsers, and most browsers only support
      // 2 as the smallest value.
      return Math.max(parseInt(this.rows, 10) || 2, 2);
    },
    computedMaxRows: function computedMaxRows() {
      return Math.max(this.computedMinRows, parseInt(this.maxRows, 10) || 0);
    },
    computedRows: function computedRows() {
      // This is used to set the attribute 'rows' on the textarea.
      // If auto-height is enabled, then we return null as we use CSS to control height.
      return this.computedMinRows === this.computedMaxRows ? this.computedMinRows : null;
    }
  },
  watch: {
    dontResize: function dontResize(newVal, oldval) {
      if (!newVal) {
        this.setHeight();
      }
    },
    localValue: function localValue(newVal, oldVal) {
      this.setHeight();
    }
  },
  mounted: function mounted() {
    var _this = this;

    // Enable opt-in resizing once mounted
    this.$nextTick(function () {
      _this.dontResize = false;
    });
  },
  activated: function activated() {
    var _this2 = this;

    // If we are being re-activated in <keep-alive>, enable opt-in resizing
    this.$nextTick(function () {
      _this2.dontResize = false;
    });
  },
  deactivated: function deactivated() {
    // If we are in a deactivated <keep-alive>, disable opt-in resizing
    this.dontResize = true;
  },
  beforeDestroy: function beforeDestroy() {
    /* istanbul ignore next */
    this.dontResize = true;
  },
  methods: {
    setHeight: function setHeight() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.heightInPx = _this3.computeHeight();
      });
    },
    computeHeight: function computeHeight()
    /* istanbul ignore next: can't test getComputedStyle in JSDOM */
    {
      if (this.$isServer || !isNull(this.computedRows)) {
        return null;
      }

      var el = this.$el; // Element must be visible (not hidden) and in document.
      // Must be checked after above checks

      if (!isVisible(el)) {
        return null;
      } // Get current computed styles


      var computedStyle = getCS(el); // Height of one line of text in px

      var lineHeight = parseFloat(computedStyle.lineHeight); // Calculate height of border and padding

      var border = (parseFloat(computedStyle.borderTopWidth) || 0) + (parseFloat(computedStyle.borderBottomWidth) || 0);
      var padding = (parseFloat(computedStyle.paddingTop) || 0) + (parseFloat(computedStyle.paddingBottom) || 0); // Calculate offset

      var offset = border + padding; // Minimum height for min rows (which must be 2 rows or greater for cross-browser support)

      var minHeight = lineHeight * this.computedMinRows + offset; // Get the current style height (with `px` units)

      var oldHeight = el.style.height || computedStyle.height; // Probe scrollHeight by temporarily changing the height to `auto`

      el.style.height = 'auto';
      var scrollHeight = el.scrollHeight; // Place the original old height back on the element, just in case this computedProp
      // returns the same value as before.

      el.style.height = oldHeight; // Calculate content height in "rows" (scrollHeight includes padding but not border)

      var contentRows = Math.max((scrollHeight - padding) / lineHeight, 2); // Calculate number of rows to display (limited within min/max rows)

      var rows = Math.min(Math.max(contentRows, this.computedMinRows), this.computedMaxRows); // Calculate the required height of the textarea including border and padding (in pixels)

      var height = Math.max(Math.ceil(rows * lineHeight + offset), minHeight); // Computed height remains the larger of oldHeight and new height,
      // when height is in `sticky` mode (prop `no-auto-shrink` is true)

      if (this.noAutoShrink && (parseFloat(oldHeight) || 0) > height) {
        return oldHeight;
      } // Return the new computed CSS height in px units


      return "".concat(height, "px");
    }
  },
  render: function render(h) {
    // Using self instead of this helps reduce code size during minification
    var self = this;
    return h('textarea', {
      ref: 'input',
      class: self.computedClass,
      style: self.computedStyle,
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: self.localValue,
        expression: 'localValue'
      }],
      attrs: {
        id: self.safeId(),
        name: self.name,
        form: self.form || null,
        disabled: self.disabled,
        placeholder: self.placeholder,
        required: self.required,
        autocomplete: self.autocomplete || null,
        readonly: self.readonly || self.plaintext,
        rows: self.computedRows,
        wrap: self.wrap || null,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: {
        value: self.localValue
      },
      on: _objectSpread({}, self.$listeners, {
        input: self.onInput,
        change: self.onChange,
        blur: self.onBlur
      })
    });
  }
});
export default BFormTextarea;