"use strict";

exports.__esModule = true;
exports.default = exports.BBreadcrumb = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _toString = _interopRequireDefault(require("../../utils/to-string"));

var _inspect = require("../../utils/inspect");

var _breadcrumbItem = require("./breadcrumb-item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = {
  items: {
    type: Array,
    default: null
  } // @vue/component

};
exports.props = props;

var BBreadcrumb =
/*#__PURE__*/
_vue.default.extend({
  name: 'BBreadcrumb',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var childNodes = children; // Build child nodes from items if given.

    if ((0, _inspect.isArray)(props.items)) {
      var activeDefined = false;
      childNodes = props.items.map(function (item, idx) {
        if (!(0, _inspect.isObject)(item)) {
          item = {
            text: (0, _toString.default)(item)
          };
        } // Copy the value here so we can normalize it.


        var active = item.active;

        if (active) {
          activeDefined = true;
        }

        if (!active && !activeDefined) {
          // Auto-detect active by position in list.
          active = idx + 1 === props.items.length;
        }

        return h(_breadcrumbItem.BBreadcrumbItem, {
          props: _objectSpread({}, item, {
            active: active
          })
        });
      });
    }

    return h('ol', (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'breadcrumb'
    }), childNodes);
  }
});

exports.BBreadcrumb = BBreadcrumb;
var _default = BBreadcrumb;
exports.default = _default;