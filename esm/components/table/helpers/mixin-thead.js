function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import KeyCodes from '../../../utils/key-codes';
import startCase from '../../../utils/startcase';
import { getComponentConfig } from '../../../utils/config';
import { htmlOrText } from '../../../utils/html';
import filterEvent from './filter-event';
import textSelectionActive from './text-selection-active';
export default {
  props: {
    headVariant: {
      type: String,
      default: function _default() {
        return getComponentConfig('BTable', 'headVariant');
      }
    },
    theadClass: {
      type: [String, Array, Object],
      default: null
    },
    theadTrClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    headClasses: function headClasses() {
      return [this.headVariant ? 'thead-' + this.headVariant : '', this.theadClass];
    }
  },
  methods: {
    fieldClasses: function fieldClasses(field) {
      // header field (th) classes
      return [field.variant ? 'table-' + field.variant : '', field.class ? field.class : '', field.thClass ? field.thClass : ''];
    },
    headClicked: function headClicked(evt, field, isFoot) {
      if (this.stopIfBusy && this.stopIfBusy(evt)) {
        // If table is busy (via provider) then don't propagate
        return;
      } else if (filterEvent(evt)) {
        // clicked on a non-disabled control so ignore
        return;
      } else if (textSelectionActive(this.$el)) {
        // User is selecting text, so ignore

        /* istanbul ignore next: JSDOM doesn't support getSelection() */
        return;
      }

      evt.stopPropagation();
      evt.preventDefault();
      this.$emit('head-clicked', field.key, field, evt, isFoot);
    },
    renderThead: function renderThead() {
      var _this = this;

      var isFoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var h = this.$createElement;

      if (this.isStacked === true) {
        // In always stacked mode, we don't bother rendering the head/foot
        return h(false);
      }

      var fields = this.computedFields || []; // Helper function to generate a field TH cell

      var makeCell = function makeCell(field, colIndex) {
        var ariaLabel = null;

        if (!field.label.trim() && !field.headerTitle) {
          // In case field's label and title are empty/blank
          // We need to add a hint about what the column is about for non-sighted users

          /* istanbul ignore next */
          ariaLabel = startCase(field.key);
        }

        var hasHeadClickListener = _this.$listeners['head-clicked'] || _this.isSortable;
        var handlers = {};

        if (hasHeadClickListener) {
          handlers.click = function (evt) {
            _this.headClicked(evt, field, isFoot);
          };

          handlers.keydown = function (evt) {
            var keyCode = evt.keyCode;

            if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
              _this.headClicked(evt, field, isFoot);
            }
          };
        }

        var sortAttrs = _this.isSortable ? _this.sortTheadThAttrs(field.key, field, isFoot) : {};
        var sortClass = _this.isSortable ? _this.sortTheadThClasses(field.key, field, isFoot) : null;
        var data = {
          key: field.key,
          class: [_this.fieldClasses(field), sortClass],
          style: field.thStyle || {},
          attrs: _objectSpread({
            // We only add a tabindex of 0 if there is a head-clicked listener
            tabindex: hasHeadClickListener ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            role: 'columnheader',
            scope: 'col',
            'aria-colindex': String(colIndex + 1),
            'aria-label': ariaLabel
          }, sortAttrs),
          on: handlers
        };
        var fieldScope = {
          label: field.label,
          column: field.key,
          field: field
        };
        var slot = isFoot && _this.hasNormalizedSlot("FOOT_".concat(field.key)) ? _this.normalizeSlot("FOOT_".concat(field.key), fieldScope) : _this.normalizeSlot("HEAD_".concat(field.key), fieldScope);

        if (!slot) {
          data.domProps = htmlOrText(field.labelHtml);
        }

        return h('th', data, slot || field.label);
      }; // Generate the array of TH cells


      var $cells = fields.map(makeCell).filter(function (th) {
        return th;
      }); // Genrate the row(s)

      var $trs = [];

      if (isFoot) {
        $trs.push(h('tr', {
          class: this.tfootTrClass,
          attrs: {
            role: 'row'
          }
        }, $cells));
      } else {
        var scope = {
          columns: fields.length,
          fields: fields
        };
        $trs.push(this.normalizeSlot('thead-top', scope) || h(false));
        $trs.push(h('tr', {
          class: this.theadTrClass,
          attrs: {
            role: 'row'
          }
        }, $cells));
      }

      return h(isFoot ? 'tfoot' : 'thead', {
        key: isFoot ? 'tfoot' : 'thead',
        class: isFoot ? this.footClasses : this.headClasses,
        attrs: {
          role: 'rowgroup'
        }
      }, $trs);
    }
  }
};