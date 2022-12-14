"use strict";

exports.__esModule = true;
exports.default = exports.BCarouselSlide = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _id = _interopRequireDefault(require("../../mixins/id"));

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _env = require("../../utils/env");

var _html = require("../../utils/html");

var _img = require("../image/img");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  imgSrc: {
    type: String // default: undefined

  },
  imgAlt: {
    type: String // default: undefined

  },
  imgWidth: {
    type: [Number, String] // default: undefined

  },
  imgHeight: {
    type: [Number, String] // default: undefined

  },
  imgBlank: {
    type: Boolean,
    default: false
  },
  imgBlankColor: {
    type: String,
    default: 'transparent'
  },
  contentVisibleUp: {
    type: String
  },
  contentTag: {
    type: String,
    default: 'div'
  },
  caption: {
    type: String
  },
  captionHtml: {
    type: String
  },
  captionTag: {
    type: String,
    default: 'h3'
  },
  text: {
    type: String
  },
  textHtml: {
    type: String
  },
  textTag: {
    type: String,
    default: 'p'
  },
  background: {
    type: String
  } // @vue/component

};
exports.props = props;

var BCarouselSlide =
/*#__PURE__*/
_vue.default.extend({
  name: 'BCarouselSlide',
  mixins: [_id.default, _normalizeSlot.default],
  inject: {
    bvCarousel: {
      default: function _default() {
        return {
          // Explicitly disable touch if not a child of carousel
          noTouch: true
        };
      }
    }
  },
  props: props,
  data: function data() {
    return {};
  },
  computed: {
    contentClasses: function contentClasses() {
      return [this.contentVisibleUp ? 'd-none' : '', this.contentVisibleUp ? "d-".concat(this.contentVisibleUp, "-block") : ''];
    },
    computedWidth: function computedWidth() {
      // Use local width, or try parent width
      return this.imgWidth || this.bvCarousel.imgWidth || null;
    },
    computedHeight: function computedHeight() {
      // Use local height, or try parent height
      return this.imgHeight || this.bvCarousel.imgHeight || null;
    }
  },
  render: function render(h) {
    var noDrag = !this.bvCarousel.noTouch && _env.hasTouchSupport;
    var img = this.normalizeSlot('img');

    if (!img && (this.imgSrc || this.imgBlank)) {
      img = h(_img.BImg, {
        props: {
          fluidGrow: true,
          block: true,
          src: this.imgSrc,
          blank: this.imgBlank,
          blankColor: this.imgBlankColor,
          width: this.computedWidth,
          height: this.computedHeight,
          alt: this.imgAlt
        },
        // Touch support event handler
        on: noDrag ? {
          dragstart: function dragstart(e) {
            /* istanbul ignore next: difficult to test in JSDOM */
            e.preventDefault();
          }
        } : {}
      });
    }

    if (!img) {
      img = h(false);
    }

    var content = h(this.contentTag, {
      staticClass: 'carousel-caption',
      class: this.contentClasses
    }, [this.caption || this.captionHtml ? h(this.captionTag, {
      domProps: (0, _html.htmlOrText)(this.captionHtml, this.caption)
    }) : h(false), this.text || this.textHtml ? h(this.textTag, {
      domProps: (0, _html.htmlOrText)(this.textHtml, this.text)
    }) : h(false), this.normalizeSlot('default')]);
    return h('div', {
      staticClass: 'carousel-item',
      style: {
        background: this.background || this.bvCarousel.background || null
      },
      attrs: {
        id: this.safeId(),
        role: 'listitem'
      }
    }, [img, content]);
  }
});

exports.BCarouselSlide = BCarouselSlide;
var _default2 = BCarouselSlide;
exports.default = _default2;