"use strict";

exports.__esModule = true;
exports.default = void 0;

var _keyCodes = _interopRequireDefault(require("../../../utils/key-codes"));

var _get = _interopRequireDefault(require("../../../utils/get"));

var _toString = _interopRequireDefault(require("../../../utils/to-string"));

var _array = require("../../../utils/array");

var _inspect = require("../../../utils/inspect");

var _filterEvent = _interopRequireDefault(require("./filter-event"));

var _textSelectionActive = _interopRequireDefault(require("./text-selection-active"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  props: {
    tbodyTrClass: {
      type: [String, Array, Function],
      default: null
    }
  },
  methods: {
    // Methods for computing classes, attributes and styles for table cells
    tdClasses: function tdClasses(field, item) {
      var cellVariant = '';

      if (item._cellVariants && item._cellVariants[field.key]) {
        cellVariant = "".concat(this.dark ? 'bg' : 'table', "-").concat(item._cellVariants[field.key]);
      }

      return [field.variant && !cellVariant ? "".concat(this.dark ? 'bg' : 'table', "-").concat(field.variant) : '', cellVariant, field.class ? field.class : '', this.getTdValues(item, field.key, field.tdClass, '')];
    },
    tdAttrs: function tdAttrs(field, item, colIndex) {
      var attrs = {
        role: 'cell',
        'aria-colindex': String(colIndex + 1)
      };

      if (field.isRowHeader) {
        attrs.scope = 'row';
        attrs.role = 'rowheader';
      }

      if (this.isStacked) {
        // Generate the "header cell" label content in stacked mode
        attrs['data-label'] = field.label;
      }

      return _objectSpread({}, attrs, this.getTdValues(item, field.key, field.tdAttr, {}));
    },
    rowClasses: function rowClasses(item) {
      return [item._rowVariant ? "".concat(this.dark ? 'bg' : 'table', "-").concat(item._rowVariant) : '', (0, _inspect.isFunction)(this.tbodyTrClass) ? this.tbodyTrClass(item, 'row') : this.tbodyTrClass];
    },
    getTdValues: function getTdValues(item, key, tdValue, defValue) {
      var parent = this.$parent;

      if (tdValue) {
        var value = (0, _get.default)(item, key, '');

        if ((0, _inspect.isFunction)(tdValue)) {
          return tdValue(value, key, item);
        } else if ((0, _inspect.isString)(tdValue) && (0, _inspect.isFunction)(parent[tdValue])) {
          return parent[tdValue](value, key, item);
        }

        return tdValue;
      }

      return defValue;
    },
    // Method to get the value for a field
    getFormattedValue: function getFormattedValue(item, field) {
      var key = field.key;
      var formatter = field.formatter;
      var parent = this.$parent;
      var value = (0, _get.default)(item, key, null);

      if (formatter) {
        if ((0, _inspect.isFunction)(formatter)) {
          value = formatter(value, key, item);
        } else if ((0, _inspect.isString)(formatter) && (0, _inspect.isFunction)(parent[formatter])) {
          value = parent[formatter](value, key, item);
        }
      }

      return (0, _inspect.isUndefined)(value) || (0, _inspect.isNull)(value) ? '' : value;
    },
    tbodyRowKeydown: function tbodyRowKeydown(evt, item, rowIndex) {
      var keyCode = evt.keyCode;
      var target = evt.target;
      var trs = this.$refs.itemRows;

      if (this.stopIfBusy && this.stopIfBusy(evt)) {
        // If table is busy (via provider) then don't propagate
        return;
      } else if (!(target && target.tagName === 'TR' && target === document.activeElement)) {
        // Ignore if not the active tr element
        return;
      } else if (target.tabIndex !== 0) {
        // Ignore if not focusable

        /* istanbul ignore next */
        return;
      } else if (trs && trs.length === 0) {
        /* istanbul ignore next */
        return;
      }

      var index = trs.indexOf(target);

      if (keyCode === _keyCodes.default.ENTER || keyCode === _keyCodes.default.SPACE) {
        evt.stopPropagation();
        evt.preventDefault(); // We also allow enter/space to trigger a click (when row is focused)
        // We translate to a row-clicked event

        this.rowClicked(evt, item, rowIndex);
      } else if ((0, _array.arrayIncludes)([_keyCodes.default.UP, _keyCodes.default.DOWN, _keyCodes.default.HOME, _keyCodes.default.END], keyCode)) {
        evt.stopPropagation();
        evt.preventDefault();
        var shift = evt.shiftKey;

        if (keyCode === _keyCodes.default.HOME || shift && keyCode === _keyCodes.default.UP) {
          // Focus first row
          trs[0].focus();
        } else if (keyCode === _keyCodes.default.END || shift && keyCode === _keyCodes.default.DOWN) {
          // Focus last row
          trs[trs.length - 1].focus();
        } else if (keyCode === _keyCodes.default.UP && index > 0) {
          // Focus previous row
          trs[index - 1].focus();
        } else if (keyCode === _keyCodes.default.DOWN && index < trs.length - 1) {
          // Focus next row
          trs[index + 1].focus();
        }
      }
    },
    // Row event handlers
    rowClicked: function rowClicked(e, item, index) {
      if (this.stopIfBusy && this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      } else if ((0, _filterEvent.default)(e)) {
        // clicked on a non-disabled control so ignore
        return;
      } else if ((0, _textSelectionActive.default)(this.$el)) {
        // User is selecting text, so ignore

        /* istanbul ignore next: JSDOM doesn't support getSelection() */
        return;
      }

      this.$emit('row-clicked', item, index, e);
    },
    middleMouseRowClicked: function middleMouseRowClicked(e, item, index) {
      if (this.stopIfBusy && this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }

      this.$emit('row-middle-clicked', item, index, e);
    },
    rowDblClicked: function rowDblClicked(e, item, index) {
      if (this.stopIfBusy && this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      } else if ((0, _filterEvent.default)(e)) {
        // clicked on a non-disabled control so ignore

        /* istanbul ignore next: event filtering already tested via click handler */
        return;
      }

      this.$emit('row-dblclicked', item, index, e);
    },
    rowHovered: function rowHovered(e, item, index) {
      if (this.stopIfBusy && this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }

      this.$emit('row-hovered', item, index, e);
    },
    rowUnhovered: function rowUnhovered(e, item, index) {
      if (this.stopIfBusy && this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }

      this.$emit('row-unhovered', item, index, e);
    },
    rowContextmenu: function rowContextmenu(e, item, index) {
      if (this.stopIfBusy && this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }

      this.$emit('row-contextmenu', item, index, e);
    },
    // Render helpers
    renderTbodyRowCell: function renderTbodyRowCell(field, colIndex, item, rowIndex) {
      var _this = this;

      var h = this.$createElement; // Renders a TD or TH for a row's field

      var $scoped = this.$scopedSlots;
      var detailsSlot = $scoped['row-details'];
      var formatted = this.getFormattedValue(item, field);
      var data = {
        // For the Vue key, we concatenate the column index and
        // field key (as field keys can be duplicated)
        key: "row-".concat(rowIndex, "-cell-").concat(colIndex, "-").concat(field.key),
        class: this.tdClasses(field, item),
        attrs: this.tdAttrs(field, item, colIndex)
      };

      var toggleDetailsFn = function toggleDetailsFn() {
        if (detailsSlot) {
          _this.$set(item, '_showDetails', !item._showDetails);
        }
      };

      var slotScope = {
        item: item,
        index: rowIndex,
        field: field,
        unformatted: (0, _get.default)(item, field.key, ''),
        value: formatted,
        toggleDetails: toggleDetailsFn,
        detailsShowing: Boolean(item._showDetails)
      };

      if (this.selectedRows) {
        // Add in rowSelected scope property if selectable rows supported
        slotScope.rowSelected = Boolean(this.selectedRows[rowIndex]);
      }

      var $childNodes = $scoped[field.key] ? $scoped[field.key](slotScope) : (0, _toString.default)(formatted);

      if (this.isStacked) {
        // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
        $childNodes = [h('div', {}, [$childNodes])];
      } // Render either a td or th cell


      return h(field.isRowHeader ? 'th' : 'td', data, [$childNodes]);
    },
    renderTbodyRow: function renderTbodyRow(item, rowIndex) {
      var _this2 = this;

      // Renders an item's row (or rows if details supported)
      var h = this.$createElement;
      var $scoped = this.$scopedSlots;
      var fields = this.computedFields;
      var tableStriped = this.striped;
      var hasRowClickHandler = this.$listeners['row-clicked'] || this.selectable;
      var $detailsSlot = $scoped['row-details'];
      var rowShowDetails = Boolean(item._showDetails && $detailsSlot); // We can return more than one TR if rowDetails enabled

      var $rows = []; // Details ID needed for aria-describedby when details showing

      var detailsId = rowShowDetails ? this.safeId("_details_".concat(rowIndex, "_")) : null;

      var toggleDetailsFn = function toggleDetailsFn() {
        if ($detailsSlot) {
          _this2.$set(item, '_showDetails', !item._showDetails);
        }
      }; // For each item data field in row


      var $tds = fields.map(function (field, colIndex) {
        return _this2.renderTbodyRowCell(field, colIndex, item, rowIndex);
      }); // Calculate the row number in the dataset (indexed from 1)

      var ariaRowIndex = null;

      if (this.currentPage && this.perPage && this.perPage > 0) {
        ariaRowIndex = String((this.currentPage - 1) * this.perPage + rowIndex + 1);
      } // Create a unique :key to help ensure that sub components are re-rendered rather than
      // re-used, which can cause issues. If a primary key is not provided we use the rendered
      // rows index within the tbody.
      // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/2410


      var primaryKey = this.primaryKey;
      var rowKey = primaryKey && !(0, _inspect.isUndefined)(item[primaryKey]) && !(0, _inspect.isNull)(item[primaryKey]) ? (0, _toString.default)(item[primaryKey]) : String(rowIndex); // If primary key is provided, use it to generate a unique ID on each tbody > tr
      // In the format of '{tableId}__row_{primaryKeyValue}'

      var rowId = primaryKey && !(0, _inspect.isUndefined)(item[primaryKey]) && !(0, _inspect.isNull)(item[primaryKey]) ? this.safeId("_row_".concat(item[primaryKey])) : null;
      var handlers = {};

      if (hasRowClickHandler) {
        handlers['click'] = function (evt) {
          _this2.rowClicked(evt, item, rowIndex);
        };

        handlers['keydown'] = function (evt) {
          _this2.tbodyRowKeydown(evt, item, rowIndex);
        };
      } // Selctable classes and attributes


      var selectableClasses = this.selectableRowClasses ? this.selectableRowClasses(rowIndex) : {};
      var selectableAttrs = this.selectableRowAttrs ? this.selectableRowAttrs(rowIndex) : {}; // Add the item row

      $rows.push(h('tr', {
        key: "__b-table-row-".concat(rowKey, "__"),
        ref: 'itemRows',
        refInFor: true,
        class: [this.rowClasses(item), selectableClasses, {
          'b-table-has-details': rowShowDetails
        }],
        attrs: _objectSpread({
          id: rowId,
          tabindex: hasRowClickHandler ? '0' : null,
          'data-pk': rowId ? String(item[primaryKey]) : null,
          'aria-describedby': detailsId,
          'aria-owns': detailsId,
          'aria-rowindex': ariaRowIndex,
          role: 'row'
        }, selectableAttrs),
        on: _objectSpread({}, handlers, {
          // TODO: Instantiate the following handlers only if we have registered
          //       listeners i.e. this.$listeners['row-middle-clicked'], etc.
          auxclick: function auxclick(evt) {
            if (evt.which === 2) {
              _this2.middleMouseRowClicked(evt, item, rowIndex);
            }
          },
          contextmenu: function contextmenu(evt) {
            _this2.rowContextmenu(evt, item, rowIndex);
          },
          // Note: these events are not accessibility friendly!
          dblclick: function dblclick(evt) {
            _this2.rowDblClicked(evt, item, rowIndex);
          },
          mouseenter: function mouseenter(evt) {
            _this2.rowHovered(evt, item, rowIndex);
          },
          mouseleave: function mouseleave(evt) {
            _this2.rowUnhovered(evt, item, rowIndex);
          }
        })
      }, $tds)); // Row Details slot

      if (rowShowDetails) {
        var tdAttrs = {
          colspan: String(fields.length),
          role: 'cell'
        };
        var trAttrs = {
          id: detailsId,
          role: 'row' // Render the details slot

        };
        var $details = h('td', {
          attrs: tdAttrs
        }, [$detailsSlot({
          item: item,
          index: rowIndex,
          fields: fields,
          toggleDetails: toggleDetailsFn
        })]); // Add a hidden row to keep table row striping consistent when details showing

        if (tableStriped) {
          $rows.push(h('tr', {
            key: "__b-table-details-".concat(rowIndex, "-stripe__"),
            staticClass: 'd-none',
            attrs: {
              'aria-hidden': 'true',
              role: 'presentation'
            }
          }));
        } // Add the actual details row


        $rows.push(h('tr', {
          key: "__b-table-details-".concat(rowIndex, "__"),
          staticClass: 'b-table-details',
          class: [(0, _inspect.isFunction)(this.tbodyTrClass) ? this.tbodyTrClass(item, 'row-details') : this.tbodyTrClass],
          attrs: trAttrs
        }, [$details]));
      } else if ($detailsSlot) {
        // Only add the placeholder if a the table has a row-details slot defined (but not shown)
        $rows.push(h(false));

        if (tableStriped) {
          // add extra placeholder if table is striped
          $rows.push(h(false));
        }
      } // Return the row(s)


      return $rows;
    }
  }
};
exports.default = _default;