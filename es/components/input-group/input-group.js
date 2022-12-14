"use strict";

exports.__esModule = true;
exports.default = exports.BInputGroup = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _html = require("../../utils/html");

var _normalizeSlot = require("../../utils/normalize-slot");

var _inputGroupPrepend = require("./input-group-prepend");

var _inputGroupAppend = require("./input-group-append");

var _inputGroupText = require("./input-group-text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var props = {
  id: {
    type: String
  },
  size: {
    type: String
  },
  prepend: {
    type: String
  },
  prependHTML: {
    type: String
  },
  append: {
    type: String
  },
  appendHTML: {
    type: String
  },
  tag: {
    type: String,
    default: 'div'
  } // @vue/component

};
exports.props = props;

var BInputGroup =
/*#__PURE__*/
_vue.default.extend({
  name: 'BInputGroup',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots;
    var $slots = slots();
    var $scopedSlots = scopedSlots || {};
    var childNodes = []; // Prepend prop/slot

    if (props.prepend || props.prependHTML || (0, _normalizeSlot.hasNormalizedSlot)('prepend', $scopedSlots, $slots)) {
      childNodes.push(h(_inputGroupPrepend.BInputGroupPrepend, [// Prop
      props.prepend || props.prependHTML ? h(_inputGroupText.BInputGroupText, {
        domProps: (0, _html.htmlOrText)(props.prependHTML, props.prepend)
      }) : h(false), // Slot
      (0, _normalizeSlot.normalizeSlot)('prepend', {}, $scopedSlots, $slots) || h(false)]));
    } else {
      childNodes.push(h(false));
    } // Default slot


    if ((0, _normalizeSlot.hasNormalizedSlot)('default', $scopedSlots, $slots)) {
      childNodes.push.apply(childNodes, _toConsumableArray((0, _normalizeSlot.normalizeSlot)('default', {}, $scopedSlots, $slots)));
    } else {
      childNodes.push(h(false));
    } // Append prop


    if (props.append || props.appendHTML || (0, _normalizeSlot.hasNormalizedSlot)('append', $scopedSlots, $slots)) {
      childNodes.push(h(_inputGroupAppend.BInputGroupAppend, [// prop
      props.append || props.appendHTML ? h(_inputGroupText.BInputGroupText, {
        domProps: (0, _html.htmlOrText)(props.appendHTML, props.append)
      }) : h(false), // Slot
      (0, _normalizeSlot.normalizeSlot)('append', {}, $scopedSlots, $slots) || h(false)]));
    } else {
      childNodes.push(h(false));
    }

    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'input-group',
      class: _defineProperty({}, "input-group-".concat(props.size), Boolean(props.size)),
      attrs: {
        id: props.id || null,
        role: 'group'
      }
    }), childNodes);
  }
});

exports.BInputGroup = BInputGroup;
var _default = BInputGroup;
exports.default = _default;