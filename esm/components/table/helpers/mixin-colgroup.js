export default {
  methods: {
    renderColgroup: function renderColgroup() {
      var h = this.$createElement;
      var fields = this.computedFields;
      var $colgroup = h(false);

      if (this.hasNormalizedSlot('table-colgroup')) {
        $colgroup = h('colgroup', {
          key: 'colgroup'
        }, [this.normalizeSlot('table-colgroup', {
          columns: fields.length,
          fields: fields
        })]);
      }

      return $colgroup;
    }
  }
};