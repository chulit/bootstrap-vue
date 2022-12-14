function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import ToolTip from './tooltip.class';
import { select, addClass, removeClass, getAttr } from './dom';
import { isFunction, isNull, isObject, isString } from './inspect';
var NAME = 'popover';
var CLASS_PREFIX = 'bs-popover';
var BS_CLASS_PREFIX_REGEX = new RegExp("\\b".concat(CLASS_PREFIX, "\\S+"), 'g');

var Defaults = _objectSpread({}, ToolTip.Default, {
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
});

var ClassName = {
  FADE: 'fade',
  SHOW: 'show'
};
var Selector = {
  TITLE: '.popover-header',
  CONTENT: '.popover-body'
};

var PopOver =
/*#__PURE__*/
function (_ToolTip) {
  _inherits(PopOver, _ToolTip);

  function PopOver() {
    _classCallCheck(this, PopOver);

    return _possibleConstructorReturn(this, _getPrototypeOf(PopOver).apply(this, arguments));
  }

  _createClass(PopOver, [{
    key: "isWithContent",
    // --- Method overrides ---
    value: function isWithContent(tip) {
      tip = tip || this.$tip;

      if (!tip) {
        /* istanbul ignore next */
        return false;
      }

      var hasTitle = Boolean((select(Selector.TITLE, tip) || {}).innerHTML);
      var hasContent = Boolean((select(Selector.CONTENT, tip) || {}).innerHTML);
      return hasTitle || hasContent;
    }
  }, {
    key: "addAttachmentClass",
    value: function addAttachmentClass(attachment)
    /* istanbul ignore next */
    {
      addClass(this.getTipElement(), "".concat(CLASS_PREFIX, "-").concat(attachment));
    }
  }, {
    key: "setContent",
    value: function setContent(tip) {
      // we use append for html objects to maintain js events/components
      this.setElementContent(select(Selector.TITLE, tip), this.getTitle());
      this.setElementContent(select(Selector.CONTENT, tip), this.getContent());
      removeClass(tip, ClassName.FADE);
      removeClass(tip, ClassName.SHOW);
    } // This method may look identical to ToolTip version, but it uses a different RegEx defined above

  }, {
    key: "cleanTipClass",
    value: function cleanTipClass()
    /* istanbul ignore next */
    {
      var tip = this.getTipElement();
      var tabClass = tip.className.match(BS_CLASS_PREFIX_REGEX);

      if (!isNull(tabClass) && tabClass.length > 0) {
        tabClass.forEach(function (cls) {
          removeClass(tip, cls);
        });
      }
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      var title = this.$config.title || '';
      /* istanbul ignore next */

      if (isFunction(title)) {
        title = title(this.$element);
      }
      /* istanbul ignore next */


      if (isObject(title) && title.nodeType && !title.innerHTML.trim()) {
        // We have a dom node, but without inner content, so just return an empty string
        title = '';
      }

      if (isString(title)) {
        title = title.trim();
      }

      if (!title) {
        // Try and grab element's title attribute
        title = getAttr(this.$element, 'title') || getAttr(this.$element, 'data-original-title') || '';
        title = title.trim();
      }

      return title;
    } // New methods

  }, {
    key: "getContent",
    value: function getContent() {
      var content = this.$config.content || '';
      /* istanbul ignore next */

      if (isFunction(content)) {
        content = content(this.$element);
      }
      /* istanbul ignore next */


      if (isObject(content) && content.nodeType && !content.innerHTML.trim()) {
        // We have a dom node, but without inner content, so just return an empty string
        content = '';
      }

      if (isString(content)) {
        content = content.trim();
      }

      return content;
    }
  }], [{
    key: "Default",
    // --- Getter overrides ---
    get: function get() {
      return Defaults;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME;
    }
  }]);

  return PopOver;
}(ToolTip);

export default PopOver;