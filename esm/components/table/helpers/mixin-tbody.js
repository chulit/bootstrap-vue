function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import tbodyRowMixin from './mixin-tbody-row';
export default {
  mixins: [tbodyRowMixin],
  props: {
    tbodyClass: {
      type: [String, Array],
      default: null
    },
    tbodyTransitionProps: {
      type: Object // default: undefined

    },
    tbodyTransitionHandlers: {
      type: Object // default: undefined

    }
  },
  methods: {
    renderTbody: function renderTbody() {
      var _this = this;

      // Render the tbody element and children
      var h = this.$createElement;
      var items = this.computedItems; // Prepare the tbody rows

      var $rows = []; // Add the item data rows or the busy slot

      var $busy = this.renderBusy ? this.renderBusy() : null;

      if ($busy) {
        // If table is busy and a busy slot, then return only the busy "row" indicator
        $rows.push($busy);
      } else {
        // Table isn't busy, or we don't have a busy slot
        // Add static Top Row slot (hidden in visibly stacked mode as we can't control data-label attr)
        $rows.push(this.renderTopRow ? this.renderTopRow() : h(false)); // render the rows

        items.forEach(function (item, rowIndex) {
          // Render the individual item row (rows if details slot)
          $rows.push(_this.renderTbodyRow(item, rowIndex));
        }); // Empty Items / Empty Filtered Row slot (only shows if items.length < 1)

        $rows.push(this.renderEmpty ? this.renderEmpty() : h(false)); // Static bottom row slot (hidden in visibly stacked mode as we can't control data-label attr)

        $rows.push(this.renderBottomRow ? this.renderBottomRow() : h(false));
      } // If tbody transition enabled


      var isTransGroup = this.tbodyTransitionProps || this.tbodyTransitionHandlers;
      var tbodyProps = {};
      var tbodyOn = {};

      if (isTransGroup) {
        tbodyOn = this.tbodyTransitionHandlers || {};
        tbodyProps = _objectSpread({}, this.tbodyTransitionProps || {}, {
          tag: 'tbody'
        });
      } // Assemble rows into the tbody


      var $tbody = h(isTransGroup ? 'transition-group' : 'tbody', {
        props: tbodyProps,
        on: tbodyOn,
        class: [this.tbodyClass],
        attrs: {
          role: 'rowgroup'
        }
      }, $rows); // Return the assembled tbody

      return $tbody;
    }
  }
};