"use strict";

exports.__esModule = true;
exports.default = void 0;
var _default = {
  props: {
    perPage: {
      type: [Number, String],
      default: 0
    },
    currentPage: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    localPaging: function localPaging() {
      return this.hasProvider ? !!this.noProviderPaging : true;
    },
    paginatedItems: function paginatedItems() {
      var items = this.sortedItems || this.filteredItems || this.localItems || [];
      var currentPage = Math.max(parseInt(this.currentPage, 10) || 1, 1);
      var perPage = Math.max(parseInt(this.perPage, 10) || 0, 0); // Apply local pagination

      if (this.localPaging && !!perPage) {
        // Grab the current page of data (which may be past filtered items limit)
        items = items.slice((currentPage - 1) * perPage, currentPage * perPage);
      } // Return the items to display in the table


      return items;
    }
  }
};
exports.default = _default;