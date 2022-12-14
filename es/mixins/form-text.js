"use strict";

exports.__esModule = true;
exports.default = void 0;

var _inspect = require("../utils/inspect");

// @vue/component
var _default = {
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    plaintext: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    formatter: {
      type: Function,
      default: null
    },
    trim: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    lazyFormatter: {
      type: Boolean,
      value: false
    }
  },
  data: function data() {
    return {
      localValue: this.stringifyValue(this.value)
    };
  },
  computed: {
    computedClass: function computedClass() {
      return [{
        // Range input needs class custom-range
        'custom-range': this.type === 'range',
        // plaintext not supported by type=range or type=color
        'form-control-plaintext': this.plaintext && this.type !== 'range' && this.type !== 'color',
        // form-control not used by type=range or plaintext. Always used by type=color
        'form-control': !this.plaintext && this.type !== 'range' || this.type === 'color'
      }, this.sizeFormClass, this.stateClass];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // this.ariaInvalid is null or false or 'false'
        return this.computedState === false ? 'true' : null;
      }

      if (this.ariaInvalid === true) {
        // User wants explicit aria-invalid=true
        return 'true';
      } // Most likely a string value (which could be the string 'true')


      return this.ariaInvalid;
    }
  },
  watch: {
    value: function value(newVal) {
      if (newVal !== this.localValue) {
        this.localValue = this.stringifyValue(newVal);
      }
    }
  },
  mounted: function mounted() {
    var value = this.stringifyValue(this.value);

    if (value !== this.localValue) {
      /* istanbul ignore next */
      this.localValue = value;
    }
  },
  methods: {
    stringifyValue: function stringifyValue(value) {
      return (0, _inspect.isUndefined)(value) || (0, _inspect.isNull)(value) ? '' : String(value);
    },
    getFormatted: function getFormatted(value, evt) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      value = this.stringifyValue(value);

      if ((!this.lazyFormatter || force) && (0, _inspect.isFunction)(this.formatter)) {
        value = this.formatter(value, evt);
      }

      return value;
    },
    updateValue: function updateValue(value) {
      value = this.stringifyValue(value);

      if (value !== this.localValue) {
        // Keep the input set to the value before modifiers
        this.localValue = value;

        if (this.number) {
          // Emulate `.number` modifier behaviour
          var num = parseFloat(value);
          value = isNaN(num) ? value : num;
        } else if (this.trim) {
          // Emulate `.trim` modifier behaviour
          value = value.trim();
        } // Update the v-model


        this.$emit('update', value);
      } else if (this.$refs.input && value !== this.$refs.input.value) {
        // When the `localValue` hasn't changed but the actual input value
        // is out of sync, make sure to change it to the given one.
        // Usually casued by browser autocomplete and how it triggers the
        // change or input event, or depending on the formatter function.
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2657
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/3498

        /* istanbul ignore next: hard to test */
        this.$refs.input.value = value;
      }
    },
    onInput: function onInput(evt) {
      // `evt.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js

      /* istanbul ignore if: hard to test composition events */
      if (evt.target.composing) {
        return;
      }

      var formatted = this.getFormatted(evt.target.value, evt); // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event

      if (formatted === false || evt.defaultPrevented) {
        /* istanbul ignore next */
        evt.preventDefault();
        return;
      }

      this.updateValue(formatted);
      this.$emit('input', formatted);
    },
    onChange: function onChange(evt) {
      // `evt.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js

      /* istanbul ignore if: hard to test composition events */
      if (evt.target.composing) {
        return;
      }

      var formatted = this.getFormatted(evt.target.value, evt); // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event

      if (formatted === false || evt.defaultPrevented) {
        /* istanbul ignore next */
        evt.preventDefault();
        return;
      }

      this.updateValue(formatted);
      this.$emit('change', formatted);
    },
    onBlur: function onBlur(evt) {
      // Lazy formatter
      if (this.lazyFormatter) {
        var formatted = this.getFormatted(evt.target.value, evt, true); // Exit when the `formatter` function strictly returned `false`

        if (formatted === false) {
          return;
        }

        this.updateValue(formatted);
      } // Emit native blur event


      this.$emit('blur', evt);
    },
    focus: function focus() {
      // For external handler that may want a focus method
      if (!this.disabled) {
        this.$el.focus();
      }
    },
    blur: function blur() {
      // For external handler that may want a blur method
      if (!this.disabled) {
        this.$el.blur();
      }
    }
  }
};
exports.default = _default;