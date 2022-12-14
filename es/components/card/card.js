"use strict";

exports.__esModule = true;
exports.default = exports.BCard = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _prefixPropName = _interopRequireDefault(require("../../utils/prefix-prop-name"));

var _unprefixPropName = _interopRequireDefault(require("../../utils/unprefix-prop-name"));

var _copyProps = _interopRequireDefault(require("../../utils/copy-props"));

var _pluckProps = _interopRequireDefault(require("../../utils/pluck-props"));

var _normalizeSlot = require("../../utils/normalize-slot");

var _cardMixin = _interopRequireDefault(require("../../mixins/card-mixin"));

var _cardBody = require("./card-body");

var _cardHeader = require("./card-header");

var _cardFooter = require("./card-footer");

var _cardImg = require("./card-img");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cardImgProps = (0, _copyProps.default)(_cardImg.props, _prefixPropName.default.bind(null, 'img'));
cardImgProps.imgSrc.required = false;

var props = _objectSpread({}, _cardBody.props, _cardHeader.props, _cardFooter.props, cardImgProps, (0, _copyProps.default)(_cardMixin.default.props), {
  align: {
    type: String,
    default: null
  },
  noBody: {
    type: Boolean,
    default: false
  } // @vue/component

});

exports.props = props;

var BCard =
/*#__PURE__*/
_vue.default.extend({
  name: 'BCard',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots;
    var $slots = slots(); // Vue < 2.6.x may return undefined for scopedSlots

    var $scopedSlots = scopedSlots || {}; // Create placeholder elements for each section

    var imgFirst = h(false);
    var header = h(false);
    var content = h(false);
    var footer = h(false);
    var imgLast = h(false);

    if (props.imgSrc) {
      var img = h(_cardImg.BCardImg, {
        props: (0, _pluckProps.default)(cardImgProps, props, _unprefixPropName.default.bind(null, 'img'))
      });

      if (props.imgBottom) {
        imgLast = img;
      } else {
        imgFirst = img;
      }
    }

    if (props.header || (0, _normalizeSlot.hasNormalizedSlot)('header', $scopedSlots, $slots)) {
      header = h(_cardHeader.BCardHeader, {
        props: (0, _pluckProps.default)(_cardHeader.props, props)
      }, (0, _normalizeSlot.normalizeSlot)('header', {}, $scopedSlots, $slots));
    }

    content = (0, _normalizeSlot.normalizeSlot)('default', {}, $scopedSlots, $slots) || [];

    if (!props.noBody) {
      // Wrap content in card-body
      content = [h(_cardBody.BCardBody, {
        props: (0, _pluckProps.default)(_cardBody.props, props)
      }, _toConsumableArray(content))];
    }

    if (props.footer || (0, _normalizeSlot.hasNormalizedSlot)('footer', $scopedSlots, $slots)) {
      footer = h(_cardFooter.BCardFooter, {
        props: (0, _pluckProps.default)(_cardFooter.props, props)
      }, (0, _normalizeSlot.normalizeSlot)('footer', {}, $scopedSlots, $slots));
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card',
      class: (_class = {
        'flex-row': props.imgLeft || props.imgStart,
        'flex-row-reverse': (props.imgRight || props.imgEnd) && !(props.imgLeft || props.imgStart)
      }, _defineProperty(_class, "text-".concat(props.align), Boolean(props.align)), _defineProperty(_class, "bg-".concat(props.bgVariant), Boolean(props.bgVariant)), _defineProperty(_class, "border-".concat(props.borderVariant), Boolean(props.borderVariant)), _defineProperty(_class, "text-".concat(props.textVariant), Boolean(props.textVariant)), _class)
    }), [imgFirst, header].concat(_toConsumableArray(content), [footer, imgLast]));
  }
});

exports.BCard = BCard;
var _default = BCard;
exports.default = _default;