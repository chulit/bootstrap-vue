"use strict";

exports.__esModule = true;
exports.default = exports.BFormDatalist = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _formOptions = _interopRequireDefault(require("../../mixins/form-options"));

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _html = require("../../utils/html");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @vue/component
var BFormDatalist =
/*#__PURE__*/
_vue.default.extend({
  name: 'BFormDatalist',
  mixins: [_formOptions.default, _normalizeSlot.default],
  props: {
    id: {
      type: String,
      default: null,
      required: true
    }
  },
  render: function render(h) {
    var options = this.formOptions.map(function (option, index) {
      return h('option', {
        key: "option_".concat(index, "_opt"),
        attrs: {
          disabled: option.disabled
        },
        domProps: _objectSpread({}, (0, _html.htmlOrText)(option.html, option.text), {
          value: option.value
        })
      });
    });
    return h('datalist', {
      attrs: {
        id: this.id
      }
    }, [options, this.normalizeSlot('default')]);
  }
});

exports.BFormDatalist = BFormDatalist;
var _default = BFormDatalist;
exports.default = _default;