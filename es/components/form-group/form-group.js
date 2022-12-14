"use strict";

exports.__esModule = true;
exports.default = exports.BFormGroup = void 0;

var _memoize = _interopRequireDefault(require("../../utils/memoize"));

var _upperFirst = _interopRequireDefault(require("../../utils/upper-first"));

var _warn = _interopRequireDefault(require("../../utils/warn"));

var _array = require("../../utils/array");

var _config = require("../../utils/config");

var _dom = require("../../utils/dom");

var _env = require("../../utils/env");

var _inspect = require("../../utils/inspect");

var _object = require("../../utils/object");

var _formState = _interopRequireDefault(require("../../mixins/form-state"));

var _id = _interopRequireDefault(require("../../mixins/id"));

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _col = require("../layout/col");

var _formRow = require("../layout/form-row");

var _formText = require("../form/form-text");

var _formInvalidFeedback = require("../form/form-invalid-feedback");

var _formValidFeedback = require("../form/form-valid-feedback");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Component name
var NAME = 'BFormGroup'; // Selector for finding first input in the form-group

var SELECTOR = 'input:not([disabled]),textarea:not([disabled]),select:not([disabled])';
var DEPRECATED_MSG = 'Props "horizontal" and "breakpoint" are deprecated. Use "label-cols(-{breakpoint})" props instead.'; // Render helper functions (here rather than polluting the instance with more methods)

var renderInvalidFeedback = function renderInvalidFeedback(h, ctx) {
  var content = ctx.normalizeSlot('invalid-feedback') || ctx.invalidFeedback;
  var invalidFeedback = h(false);

  if (content) {
    invalidFeedback = h(_formInvalidFeedback.BFormInvalidFeedback, {
      props: {
        id: ctx.invalidFeedbackId,
        // If state is explicitly false, always show the feedback
        state: ctx.computedState,
        tooltip: ctx.tooltip,
        ariaLive: ctx.feedbackAriaLive,
        role: ctx.feedbackAriaLive ? 'alert' : null
      },
      attrs: {
        tabindex: content ? '-1' : null
      }
    }, [content]);
  }

  return invalidFeedback;
};

var renderValidFeedback = function renderValidFeedback(h, ctx) {
  var content = ctx.normalizeSlot('valid-feedback') || ctx.validFeedback;
  var validFeedback = h(false);

  if (content) {
    validFeedback = h(_formValidFeedback.BFormValidFeedback, {
      props: {
        id: ctx.validFeedbackId,
        // If state is explicitly true, always show the feedback
        state: ctx.computedState,
        tooltip: ctx.tooltip,
        ariaLive: ctx.feedbackAriaLive,
        role: ctx.feedbackAriaLive ? 'alert' : null
      },
      attrs: {
        tabindex: content ? '-1' : null
      }
    }, [content]);
  }

  return validFeedback;
};

var renderHelpText = function renderHelpText(h, ctx) {
  // Form help text (description)
  var content = ctx.normalizeSlot('description') || ctx.description;
  var description = h(false);

  if (content) {
    description = h(_formText.BFormText, {
      attrs: {
        id: ctx.descriptionId,
        tabindex: content ? '-1' : null
      }
    }, [content]);
  }

  return description;
};

var renderLabel = function renderLabel(h, ctx) {
  // Render label/legend inside b-col if necessary
  var content = ctx.normalizeSlot('label') || ctx.label;
  var labelFor = ctx.labelFor;
  var isLegend = !labelFor;
  var isHorizontal = ctx.isHorizontal;
  var labelTag = isLegend ? 'legend' : 'label';

  if (!content && !isHorizontal) {
    return h(false);
  } else if (ctx.labelSrOnly) {
    var label = h(false);

    if (content) {
      label = h(labelTag, {
        class: 'sr-only',
        attrs: {
          id: ctx.labelId,
          for: labelFor || null
        }
      }, [content]);
    }

    return h(isHorizontal ? _col.BCol : 'div', {
      props: isHorizontal ? ctx.labelColProps : {}
    }, [label]);
  } else {
    return h(isHorizontal ? _col.BCol : labelTag, {
      on: isLegend ? {
        click: ctx.legendClick
      } : {},
      props: isHorizontal ? _objectSpread({
        tag: labelTag
      }, ctx.labelColProps) : {},
      attrs: {
        id: ctx.labelId,
        for: labelFor || null,
        // We add a tab index to legend so that screen readers
        // will properly read the aria-labelledby in IE.
        tabindex: isLegend ? '-1' : null
      },
      class: [// When horizontal or if a legend is rendered, add col-form-label
      // for correct sizing as Bootstrap has inconsistent font styling
      // for legend in non-horizontal form-groups.
      // See: https://github.com/twbs/bootstrap/issues/27805
      isHorizontal || isLegend ? 'col-form-label' : '', // Emulate label padding top of 0 on legend when not horizontal
      !isHorizontal && isLegend ? 'pt-0' : '', // If not horizontal and not a legend, we add d-block to label
      // so that label-align works
      !isHorizontal && !isLegend ? 'd-block' : '', ctx.labelSize ? "col-form-label-".concat(ctx.labelSize) : '', ctx.labelAlignClasses, ctx.labelClass]
    }, [content]);
  }
}; // -- BFormGroup Prop factory -- used for lazy generation of props
// Memoize this function to return cached values to
// save time in computed functions


var makePropName = (0, _memoize.default)(function () {
  var breakpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var prefix = arguments.length > 1 ? arguments[1] : undefined;
  return "".concat(prefix).concat((0, _upperFirst.default)(breakpoint));
}); // BFormGroup prop generator for lazy generation of props

var generateProps = function generateProps() {
  var BREAKPOINTS = (0, _config.getBreakpointsUpCached)(); // Generate the labelCol breakpoint props

  var bpLabelColProps = BREAKPOINTS.reduce(function (props, breakpoint) {
    // i.e. label-cols, label-cols-sm, label-cols-md, ...
    props[makePropName(breakpoint, 'labelCols')] = {
      type: [Number, String, Boolean],
      default: breakpoint ? false : null
    };
    return props;
  }, (0, _object.create)(null)); // Generate the labelAlign breakpoint props

  var bpLabelAlignProps = BREAKPOINTS.reduce(function (props, breakpoint) {
    // label-align, label-align-sm, label-align-md, ...
    props[makePropName(breakpoint, 'labelAlign')] = {
      type: String,
      // left, right, center
      default: null
    };
    return props;
  }, (0, _object.create)(null));
  return _objectSpread({
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    },
    labelSize: {
      type: String,
      default: null
    },
    labelSrOnly: {
      type: Boolean,
      default: false
    }
  }, bpLabelColProps, bpLabelAlignProps, {
    labelClass: {
      type: [String, Array, Object],
      default: null
    },
    description: {
      type: String,
      default: null
    },
    invalidFeedback: {
      type: String,
      default: null
    },
    validFeedback: {
      type: String,
      default: null
    },
    tooltip: {
      // Enable tooltip style feedback
      type: Boolean,
      default: false
    },
    feedbackAriaLive: {
      type: String,
      default: 'assertive'
    },
    validated: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    horizontal: {
      // Deprecated
      type: Boolean,
      default: false,
      deprecated: DEPRECATED_MSG
    },
    breakpoint: {
      // Deprecated (ignored if horizontal is not true)
      type: String,
      default: null,
      // legacy value 'sm',
      deprecated: DEPRECATED_MSG
    }
  });
}; // We do not use Vue.extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component


var BFormGroup = {
  name: NAME,
  mixins: [_id.default, _formState.default, _normalizeSlot.default],

  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props; // eslint-disable-next-line no-return-assign

    return this.props = generateProps();
  },

  computed: {
    labelColProps: function labelColProps() {
      var _this = this;

      var props = {};
      /* istanbul ignore next: deprecated */

      if (this.horizontal) {
        // Deprecated setting of horizontal/breakpoint props

        /* istanbul ignore next */
        (0, _warn.default)("b-form-group: ".concat(DEPRECATED_MSG)); // Legacy default is breakpoint sm and cols 3

        var bp = this.breakpoint || (0, _config.getBreakpointsUpCached)()[1]; // 'sm'

        var cols = parseInt(this.labelCols, 10) || 3;
        props[bp] = cols > 0 ? cols : 3; // We then return the single breakpoint prop for legacy compatibility

        return props;
      }

      (0, _config.getBreakpointsUpCached)().forEach(function (breakpoint) {
        // Grab the value if the label column breakpoint prop
        var propVal = _this[makePropName(breakpoint, 'labelCols')]; // Handle case where the prop's value is an empty string,
        // which represents true


        propVal = propVal === '' ? true : propVal || false;

        if (!(0, _inspect.isBoolean)(propVal)) {
          // Convert to column size to number
          propVal = parseInt(propVal, 10) || 0; // Ensure column size is greater than 0

          propVal = propVal > 0 ? propVal : false;
        }

        if (propVal) {
          // Add the prop to the list of props to give to b-col
          // If breakpoint is '' (labelCols=true), then we use the
          // col prop to make equal width at xs
          var bColPropName = breakpoint || ((0, _inspect.isBoolean)(propVal) ? 'col' : 'cols'); // Add it to the props

          props[bColPropName] = propVal;
        }
      });
      return props;
    },
    labelAlignClasses: function labelAlignClasses() {
      var _this2 = this;

      var classes = [];
      (0, _config.getBreakpointsUpCached)().forEach(function (breakpoint) {
        // Assemble the label column breakpoint align classes
        var propVal = _this2[makePropName(breakpoint, 'labelAlign')] || null;

        if (propVal) {
          var className = breakpoint ? "text-".concat(breakpoint, "-").concat(propVal) : "text-".concat(propVal);
          classes.push(className);
        }
      });
      return classes;
    },
    isHorizontal: function isHorizontal() {
      // Determine if the resultant form-group will be rendered
      // horizontal (meaning it has label-col breakpoints)
      return (0, _object.keys)(this.labelColProps).length > 0;
    },
    labelId: function labelId() {
      return this.$slots['label'] || this.label ? this.safeId('_BV_label_') : null;
    },
    descriptionId: function descriptionId() {
      return this.$slots['description'] || this.description ? this.safeId('_BV_description_') : null;
    },
    hasInvalidFeedback: function hasInvalidFeedback() {
      // Used for computing aria-describedby
      var $slots = this.$slots;
      return this.computedState === false && ($slots['invalid-feedback'] || this.invalidFeedback);
    },
    invalidFeedbackId: function invalidFeedbackId() {
      return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null;
    },
    hasValidFeedback: function hasValidFeedback() {
      // Used for computing aria-describedby
      return this.computedState === true && (this.$slots['valid-feedback'] || this.validFeedback);
    },
    validFeedbackId: function validFeedbackId() {
      return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null;
    },
    describedByIds: function describedByIds() {
      // Screen readers will read out any content linked to by aria-describedby
      // even if the content is hidden with `display: none;`, hence we only include
      // feedback IDs if the form-group's state is explicitly valid or invalid.
      return [this.descriptionId, this.invalidFeedbackId, this.validFeedbackId].filter(Boolean).join(' ') || null;
    }
  },
  watch: {
    describedByIds: function describedByIds(add, remove) {
      if (add !== remove) {
        this.setInputDescribedBy(add, remove);
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      // Set the aria-describedby IDs on the input specified by label-for
      // We do this in a nextTick to ensure the children have finished rendering
      _this3.setInputDescribedBy(_this3.describedByIds);
    });
  },
  methods: {
    legendClick: function legendClick(evt) {
      if (this.labelFor) {
        // Don't do anything if labelFor is set

        /* istanbul ignore next: clicking a label will focus the input, so no need to test */
        return;
      }

      var tagName = evt.target ? evt.target.tagName : '';

      if (/^(input|select|textarea|label|button|a)$/i.test(tagName)) {
        // If clicked an interactive element inside legend,
        // we just let the default happen

        /* istanbul ignore next */
        return;
      }

      var inputs = (0, _dom.selectAll)(SELECTOR, this.$refs.content).filter(_dom.isVisible);

      if (inputs && inputs.length === 1 && inputs[0].focus) {
        // if only a single input, focus it, emulating label behaviour
        inputs[0].focus();
      }
    },
    setInputDescribedBy: function setInputDescribedBy(add, remove) {
      // Sets the `aria-describedby` attribute on the input if label-for is set.
      // Optionally accepts a string of IDs to remove as the second parameter.
      // Preserves any aria-describedby value(s) user may have on input.
      if (this.labelFor && _env.isBrowser) {
        var input = (0, _dom.select)("#".concat(this.labelFor), this.$refs.content);

        if (input) {
          var adb = 'aria-describedby';
          var ids = ((0, _dom.getAttr)(input, adb) || '').split(/\s+/);
          add = (add || '').split(/\s+/);
          remove = (remove || '').split(/\s+/); // Update ID list, preserving any original IDs
          // and ensuring the ID's are unique

          ids = ids.filter(function (id) {
            return !(0, _array.arrayIncludes)(remove, id);
          }).concat(add).filter(Boolean);
          ids = (0, _object.keys)(ids.reduce(function (memo, id) {
            return _objectSpread({}, memo, _defineProperty({}, id, true));
          }, {})).join(' ').trim();

          if (ids) {
            (0, _dom.setAttr)(input, adb, ids);
          } else {
            // No IDs, so remove the attribute
            (0, _dom.removeAttr)(input, adb);
          }
        }
      }
    }
  },
  render: function render(h) {
    var isFieldset = !this.labelFor;
    var isHorizontal = this.isHorizontal; // Generate the label

    var label = renderLabel(h, this); // Generate the content

    var content = h(isHorizontal ? _col.BCol : 'div', {
      ref: 'content',
      attrs: {
        tabindex: isFieldset ? '-1' : null,
        role: isFieldset ? 'group' : null
      }
    }, [this.normalizeSlot('default') || h(false), renderInvalidFeedback(h, this), renderValidFeedback(h, this), renderHelpText(h, this)]); // Create the form-group

    var data = {
      staticClass: 'form-group',
      class: [this.validated ? 'was-validated' : null, this.stateClass],
      attrs: {
        id: this.safeId(),
        disabled: isFieldset ? this.disabled : null,
        role: isFieldset ? null : 'group',
        'aria-invalid': this.computedState === false ? 'true' : null,
        // Only apply aria-labelledby if we are a horizontal fieldset
        // as the legend is no longer a direct child of fieldset
        'aria-labelledby': isFieldset && isHorizontal ? this.labelId : null,
        // Only apply aria-describedby IDs if we are a fieldset
        // as the input will have the IDs when not a fieldset
        'aria-describedby': isFieldset ? this.describedByIds : null
      } // Return it wrapped in a form-group
      // Note: Fieldsets do not support adding `row` or `form-row` directly
      // to them due to browser specific render issues, so we move the `form-row`
      // to an inner wrapper div when horizontal and using a fieldset

    };
    return h(isFieldset ? 'fieldset' : isHorizontal ? _formRow.BFormRow : 'div', data, isHorizontal && isFieldset ? [h(_formRow.BFormRow, {}, [label, content])] : [label, content]);
  }
};
exports.BFormGroup = BFormGroup;
var _default = BFormGroup;
exports.default = _default;