"use strict";

exports.__esModule = true;
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Main `<table>` render mixin
// Which indlues all main table stlying options
var _default = {
  // Don't place ATTRS on root element automatically, as table could be wrapped in responsive div
  inheritAttrs: false,
  props: {
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: [Boolean, String],
      default: false
    },
    tableClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    // Layout related computed props
    isStacked: function isStacked() {
      return this.stacked === '' ? true : this.stacked;
    },
    isResponsive: function isResponsive() {
      var responsive = this.responsive === '' ? true : this.responsive;
      return this.isStacked ? false : responsive;
    },
    responsiveClass: function responsiveClass() {
      return this.isResponsive === true ? 'table-responsive' : this.isResponsive ? "table-responsive-".concat(this.responsive) : '';
    },
    tableClasses: function tableClasses() {
      return [// User supplied classes
      this.tableClass, // Styling classes
      _defineProperty({
        'table-striped': this.striped,
        'table-hover': this.hover && this.computedItems.length > 0 && !this.computedBusy,
        'table-dark': this.dark,
        'table-bordered': this.bordered,
        'table-borderless': this.borderless,
        'table-sm': this.small,
        border: this.outlined,
        // The following are b-table custom styles
        'b-table-fixed': this.fixed,
        'b-table-stacked': this.stacked === true || this.stacked === ''
      }, "b-table-stacked-".concat(this.stacked), this.stacked !== true && this.stacked), // Selectable classes
      this.selectableTableClasses];
    },
    tableAttrs: function tableAttrs() {
      // Preserve user supplied aria-describedby, if provided in $attrs
      var adb = [(this.$attrs || {})['aria-describedby'], this.captionId].filter(Boolean).join(' ') || null;
      var items = this.computedItems;
      var fields = this.computedFields;
      var selectableAttrs = this.selectableTableAttrs || {};
      return _objectSpread({
        // We set aria-rowcount before merging in $attrs, in case user has supplied their own
        'aria-rowcount': this.filteredItems && this.filteredItems.length > items.length ? String(this.filteredItems.length) : null
      }, this.$attrs, {
        // Now we can override any $attrs here
        id: this.safeId(),
        role: this.isStacked ? 'table' : null,
        'aria-busy': this.computedBusy ? 'true' : 'false',
        'aria-colcount': String(fields.length),
        'aria-describedby': adb
      }, selectableAttrs);
    }
  },
  render: function render(h) {
    // Build the caption (from caption mixin)
    var $caption = this.renderCaption ? this.renderCaption() : null; // Build the colgroup

    var $colgroup = this.renderColgroup ? this.renderColgroup() : null; // Build the thead

    var $thead = this.renderThead(); // Build the tfoot

    var $tfoot = this.renderTfoot(); // Build the tbody

    var $tbody = this.renderTbody(); // Assemble table

    var $table = h('table', {
      key: 'b-table',
      staticClass: 'table b-table',
      class: this.tableClasses,
      attrs: this.tableAttrs
    }, [$caption, $colgroup, $thead, $tfoot, $tbody].filter(Boolean)); // Add responsive wrapper if needed and return table

    return this.isResponsive ? h('div', {
      key: 'b-table-responsive',
      class: this.responsiveClass
    }, [$table]) : $table;
  }
};
exports.default = _default;