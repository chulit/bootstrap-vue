/* Form control contextual state class computation
 *
 * Returned class is either 'is-valid' or 'is-invalid' based on the 'state' prop
 * state can be one of five values:
 *  - true or 'valid' for is-valid
 *  - false or 'invalid' for is-invalid
 *  - null (or empty string) for no contextual state
 */
// @vue/component
export default {
  props: {
    state: {
      // true/'valid', false/'invalid', '',null
      // The order must be String first, then Boolean!
      type: [String, Boolean],
      default: null
    }
  },
  computed: {
    computedState: function computedState() {
      var state = this.state;

      if (state === '') {
        return null;
      } else if (state === true || state === 'valid') {
        return true;
      } else if (state === false || state === 'invalid') {
        return false;
      }

      return null;
    },
    stateClass: function stateClass() {
      var state = this.computedState;

      if (state === true) {
        return 'is-valid';
      } else if (state === false) {
        return 'is-invalid';
      }

      return null;
    }
  }
};