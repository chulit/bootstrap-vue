function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../utils/vue';
import { omit } from '../../utils/object';
import { mergeData } from 'vue-functional-data-merge';
import { BImgLazy, props as imgLazyProps } from '../image/img-lazy'; // Copy of `<b-img-lazy>` props, and remove conflicting/non-applicable props
// The `omit()` util creates a new object, so we can just pass the original props

var lazyProps = omit(imgLazyProps, ['left', 'right', 'center', 'block', 'rounded', 'thumbnail', 'fluid', 'fluidGrow']);
export var props = _objectSpread({}, lazyProps, {
  top: {
    type: Boolean,
    default: false
  },
  bottom: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false // alias of 'left'

  },
  right: {
    type: Boolean,
    default: false
  },
  end: {
    type: Boolean,
    default: false // alias of 'right'

  } // @vue/component

});
export var BCardImgLazy =
/*#__PURE__*/
Vue.extend({
  name: 'BCardImgLazy',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var baseClass = 'card-img';

    if (props.top) {
      baseClass += '-top';
    } else if (props.right || props.end) {
      baseClass += '-right';
    } else if (props.bottom) {
      baseClass += '-bottom';
    } else if (props.left || props.start) {
      baseClass += '-left';
    } // False out the left/center/right props before passing to b-img-lazy


    var lazyProps = _objectSpread({}, props, {
      left: false,
      right: false,
      center: false
    });

    return h(BImgLazy, mergeData(data, {
      class: [baseClass],
      props: lazyProps
    }));
  }
});
export default BCardImgLazy;