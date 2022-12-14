"use strict";

exports.__esModule = true;
exports.default = exports.BModal = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _modalManager = _interopRequireDefault(require("./helpers/modal-manager"));

var _bvModalEvent = _interopRequireDefault(require("./helpers/bv-modal-event.class"));

var _id = _interopRequireDefault(require("../../mixins/id"));

var _listenOnRoot = _interopRequireDefault(require("../../mixins/listen-on-root"));

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _bvTransition = _interopRequireDefault(require("../../utils/bv-transition"));

var _keyCodes = _interopRequireDefault(require("../../utils/key-codes"));

var _observeDom = _interopRequireDefault(require("../../utils/observe-dom"));

var _transporter = require("../../utils/transporter");

var _env = require("../../utils/env");

var _inspect = require("../../utils/inspect");

var _config = require("../../utils/config");

var _html = require("../../utils/html");

var _dom = require("../../utils/dom");

var _button = require("../button/button");

var _buttonClose = require("../button/button-close");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// --- Constants ---
var NAME = 'BModal'; // ObserveDom config to detect changes in modal content
// so that we can adjust the modal padding if needed

var OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['style', 'class'] // Options for DOM event listeners

};
var EVT_OPTIONS = {
  passive: true,
  capture: false
};
var props = {
  title: {
    type: String,
    default: ''
  },
  titleHtml: {
    type: String
  },
  titleTag: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'titleTag');
    }
  },
  size: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'size');
    }
  },
  centered: {
    type: Boolean,
    default: false
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  buttonSize: {
    type: String,
    default: ''
  },
  noStacking: {
    type: Boolean,
    default: false
  },
  noFade: {
    type: Boolean,
    default: false
  },
  noCloseOnBackdrop: {
    type: Boolean,
    default: false
  },
  noCloseOnEsc: {
    type: Boolean,
    default: false
  },
  noEnforceFocus: {
    type: Boolean,
    default: false
  },
  headerBgVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'headerBgVariant');
    }
  },
  headerBorderVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'headerBorderVariant');
    }
  },
  headerTextVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'headerTextVariant');
    }
  },
  headerCloseVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'headerCloseVariant');
    }
  },
  headerClass: {
    type: [String, Array],
    default: null
  },
  bodyBgVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'bodyBgVariant');
    }
  },
  bodyTextVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'bodyTextVariant');
    }
  },
  modalClass: {
    type: [String, Array],
    default: null
  },
  dialogClass: {
    type: [String, Array],
    default: null
  },
  contentClass: {
    type: [String, Array],
    default: null
  },
  bodyClass: {
    type: [String, Array],
    default: null
  },
  footerBgVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'footerBgVariant');
    }
  },
  footerBorderVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'footerBorderVariant');
    }
  },
  footerTextVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'footerTextVariant');
    }
  },
  footerClass: {
    type: [String, Array],
    default: null
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  },
  hideHeaderClose: {
    type: Boolean,
    default: false
  },
  hideBackdrop: {
    type: Boolean,
    default: false
  },
  okOnly: {
    type: Boolean,
    default: false
  },
  okDisabled: {
    type: Boolean,
    default: false
  },
  cancelDisabled: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  returnFocus: {
    // type: Object,
    default: null
  },
  headerCloseLabel: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'headerCloseLabel');
    }
  },
  cancelTitle: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'cancelTitle');
    }
  },
  cancelTitleHtml: {
    type: String
  },
  okTitle: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'okTitle');
    }
  },
  okTitleHtml: {
    type: String
  },
  cancelVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'cancelVariant');
    }
  },
  okVariant: {
    type: String,
    default: function _default() {
      return (0, _config.getComponentConfig)(NAME, 'okVariant');
    }
  },
  lazy: {
    type: Boolean,
    default: false
  },
  busy: {
    type: Boolean,
    default: false
  },
  static: {
    type: Boolean,
    default: false
  } // @vue/component

};
exports.props = props;

var BModal =
/*#__PURE__*/
_vue.default.extend({
  name: NAME,
  mixins: [_id.default, _listenOnRoot.default, _normalizeSlot.default],
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: props,
  data: function data() {
    return {
      isHidden: true,
      // If modal should not be in document
      isVisible: false,
      // Controls modal visible state
      isTransitioning: false,
      // Used for style control
      isShow: false,
      // Used for style control
      isBlock: false,
      // Used for style control
      isOpening: false,
      // To signal that the modal is in the process of opening
      isClosing: false,
      // To signal that the modal is in the process of closing
      ignoreBackdropClick: false,
      // Used to signify if click out listener should ignore the click
      isModalOverflowing: false,
      return_focus: this.returnFocus || null,
      // The following items are controlled by the modalManager instance
      scrollbarWidth: 0,
      zIndex: _modalManager.default.getBaseZIndex(),
      isTop: true,
      isBodyOverflowing: false
    };
  },
  computed: {
    modalClasses: function modalClasses() {
      return [{
        fade: !this.noFade,
        show: this.isShow
      }, this.modalClass];
    },
    modalStyles: function modalStyles() {
      var sbWidth = "".concat(this.scrollbarWidth, "px");
      return {
        paddingLeft: !this.isBodyOverflowing && this.isModalOverflowing ? sbWidth : '',
        paddingRight: this.isBodyOverflowing && !this.isModalOverflowing ? sbWidth : '',
        // Needed to fix issue https://github.com/bootstrap-vue/bootstrap-vue/issues/3457
        // Even though we are using v-show, we must ensure 'none' is restored in the styles
        display: this.isBlock ? 'block' : 'none'
      };
    },
    dialogClasses: function dialogClasses() {
      var _ref;

      return [(_ref = {}, _defineProperty(_ref, "modal-".concat(this.size), Boolean(this.size)), _defineProperty(_ref, 'modal-dialog-centered', this.centered), _defineProperty(_ref, 'modal-dialog-scrollable', this.scrollable), _ref), this.dialogClass];
    },
    headerClasses: function headerClasses() {
      var _ref2;

      return [(_ref2 = {}, _defineProperty(_ref2, "bg-".concat(this.headerBgVariant), Boolean(this.headerBgVariant)), _defineProperty(_ref2, "text-".concat(this.headerTextVariant), Boolean(this.headerTextVariant)), _defineProperty(_ref2, "border-".concat(this.headerBorderVariant), Boolean(this.headerBorderVariant)), _ref2), this.headerClass];
    },
    bodyClasses: function bodyClasses() {
      var _ref3;

      return [(_ref3 = {}, _defineProperty(_ref3, "bg-".concat(this.bodyBgVariant), Boolean(this.bodyBgVariant)), _defineProperty(_ref3, "text-".concat(this.bodyTextVariant), Boolean(this.bodyTextVariant)), _ref3), this.bodyClass];
    },
    footerClasses: function footerClasses() {
      var _ref4;

      return [(_ref4 = {}, _defineProperty(_ref4, "bg-".concat(this.footerBgVariant), Boolean(this.footerBgVariant)), _defineProperty(_ref4, "text-".concat(this.footerTextVariant), Boolean(this.footerTextVariant)), _defineProperty(_ref4, "border-".concat(this.footerBorderVariant), Boolean(this.footerBorderVariant)), _ref4), this.footerClass];
    },
    modalOuterStyle: function modalOuterStyle() {
      // Styles needed for proper stacking of modals
      return {
        position: 'absolute',
        zIndex: this.zIndex
      };
    },
    slotScope: function slotScope() {
      return {
        ok: this.onOk,
        cancel: this.onCancel,
        close: this.onClose,
        hide: this.hide,
        visible: this.isVisible
      };
    }
  },
  watch: {
    visible: function visible(newVal, oldVal) {
      if (newVal !== oldVal) {
        this[newVal ? 'show' : 'hide']();
      }
    }
  },
  created: function created() {
    // Define non-reactive properties
    this._observer = null;
  },
  mounted: function mounted() {
    // Set initial z-index as queried from the DOM
    this.zIndex = _modalManager.default.getBaseZIndex(); // Listen for events from others to either open or close ourselves
    // and listen to all modals to enable/disable enforce focus

    this.listenOnRoot('bv::show::modal', this.showHandler);
    this.listenOnRoot('bv::hide::modal', this.hideHandler);
    this.listenOnRoot('bv::toggle::modal', this.toggleHandler); // Listen for `bv:modal::show events`, and close ourselves if the
    // opening modal not us

    this.listenOnRoot('bv::modal::show', this.modalListener); // Initially show modal?

    if (this.visible === true) {
      this.$nextTick(this.show);
    }
  },
  beforeDestroy: function beforeDestroy() {
    // Ensure everything is back to normal
    if (this._observer) {
      this._observer.disconnect();

      this._observer = null;
    }

    this.setEnforceFocus(false);
    this.setResizeEvent(false);

    if (this.isVisible) {
      this.isVisible = false;
      this.isShow = false;
      this.isTransitioning = false;
    }
  },
  methods: {
    // Private method to update the v-model
    updateModel: function updateModel(val) {
      if (val !== this.visible) {
        this.$emit('change', val);
      }
    },
    // Private method to create a BvModalEvent object
    buildEvent: function buildEvent(type) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new _bvModalEvent.default(type, _objectSpread({
        // Default options
        cancelable: false,
        target: this.$refs.modal || this.$el || null,
        relatedTarget: null,
        trigger: null
      }, opts, {
        // Options that can't be overridden
        vueTarget: this,
        componentId: this.safeId()
      }));
    },
    // Public method to show modal
    show: function show() {
      if (this.isVisible || this.isOpening) {
        // If already open, on in the process of opening, do nothing

        /* istanbul ignore next */
        return;
      }

      if (this.isClosing) {
        // If we are in the process of closing, wait until hidden before re-opening

        /* istanbul ignore next: very difficult to test */
        this.$once('hidden', this.show);
        /* istanbul ignore next */

        return;
      }

      this.isOpening = true; // Set the element to return focus to when closed

      this.return_focus = this.return_focus || this.getActiveElement();
      var showEvt = this.buildEvent('show', {
        cancelable: true
      });
      this.emitEvent(showEvt); // Don't show if canceled

      if (showEvt.defaultPrevented || this.isVisible) {
        this.isOpening = false; // Ensure the v-model reflects the current state

        this.updateModel(false);
        return;
      } // Show the modal


      this.doShow();
    },
    // Public method to hide modal
    hide: function hide() {
      var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!this.isVisible || this.isClosing) {
        /* istanbul ignore next */
        return;
      }

      this.isClosing = true;
      var hideEvt = this.buildEvent('hide', {
        cancelable: trigger !== 'FORCE',
        trigger: trigger || null
      }); // We emit specific event for one of the three built-in buttons

      if (trigger === 'ok') {
        this.$emit('ok', hideEvt);
      } else if (trigger === 'cancel') {
        this.$emit('cancel', hideEvt);
      } else if (trigger === 'headerclose') {
        this.$emit('close', hideEvt);
      }

      this.emitEvent(hideEvt); // Hide if not canceled

      if (hideEvt.defaultPrevented || !this.isVisible) {
        this.isClosing = false; // Ensure v-model reflects current state

        this.updateModel(true);
        return;
      } // Stop observing for content changes


      if (this._observer) {
        this._observer.disconnect();

        this._observer = null;
      } // Trigger the hide transition


      this.isVisible = false; // Update the v-model

      this.updateModel(false);
    },
    // Public method to toggle modal visibility
    toggle: function toggle(triggerEl) {
      if (triggerEl) {
        this.return_focus = triggerEl;
      }

      if (this.isVisible) {
        this.hide('toggle');
      } else {
        this.show();
      }
    },
    // Private method to get the current document active element
    getActiveElement: function getActiveElement() {
      if (_env.isBrowser) {
        var activeElement = document.activeElement; // Note: On IE11, `document.activeElement` may be null.
        // So we test it for truthiness first.
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/3206
        // Returning focus to document.body may cause unwanted scrolls, so we
        // exclude setting focus on body

        if (activeElement && activeElement !== document.body && activeElement.focus) {
          // Preset the fallback return focus value if it is not set
          // `document.activeElement` should be the trigger element that was clicked or
          // in the case of using the v-model, which ever element has current focus
          // Will be overridden by some commands such as toggle, etc.
          return activeElement;
        }
      }

      return null;
    },
    // Private method to finish showing modal
    doShow: function doShow() {
      var _this = this;

      /* istanbul ignore next: commenting out for now until we can test stacking */
      if (_modalManager.default.modalsAreOpen && this.noStacking) {
        // If another modal(s) is already open, wait for it(them) to close
        this.listenOnRootOnce('bv::modal::hidden', this.doShow);
        return;
      }

      _modalManager.default.registerModal(this); // Place modal in DOM


      this.isHidden = false;
      this.$nextTick(function () {
        // We do this in `$nextTick()` to ensure the modal is in DOM first
        // before we show it
        _this.isVisible = true;
        _this.isOpening = false; // Update the v-model

        _this.updateModel(true);

        _this.$nextTick(function () {
          // In a nextTick in case modal content is lazy
          // Observe changes in modal content and adjust if necessary
          _this._observer = (0, _observeDom.default)(_this.$refs.content, _this.checkModalOverflow.bind(_this), OBSERVER_CONFIG);
        });
      });
    },
    // Transition handlers
    onBeforeEnter: function onBeforeEnter() {
      this.isTransitioning = true;
      this.setResizeEvent(true);
    },
    onEnter: function onEnter() {
      this.isBlock = true;
    },
    onAfterEnter: function onAfterEnter() {
      var _this2 = this;

      this.checkModalOverflow();
      this.isShow = true;
      this.isTransitioning = false;
      this.$nextTick(function () {
        _this2.emitEvent(_this2.buildEvent('shown'));

        _this2.focusFirst();

        _this2.setEnforceFocus(true);
      });
    },
    onBeforeLeave: function onBeforeLeave() {
      this.isTransitioning = true;
      this.setResizeEvent(false);
    },
    onLeave: function onLeave() {
      // Remove the 'show' class
      this.isShow = false;
    },
    onAfterLeave: function onAfterLeave() {
      var _this3 = this;

      this.isBlock = false;
      this.isTransitioning = false;
      this.setEnforceFocus(false);
      this.isModalOverflowing = false;
      this.isHidden = true;
      this.$nextTick(function () {
        _this3.returnFocusTo();

        _this3.isClosing = false;
        _this3.return_focus = null;

        _modalManager.default.unregisterModal(_this3); // TODO: Need to find a way to pass the `trigger` property
        //       to the `hidden` event, not just only the `hide` event


        _this3.emitEvent(_this3.buildEvent('hidden'));
      });
    },
    // Event emitter
    emitEvent: function emitEvent(bvModalEvt) {
      var type = bvModalEvt.type; // We emit on root first incase a global listener wants to cancel
      // the event first before the instance emits it's event

      this.emitOnRoot("bv::modal::".concat(type), bvModalEvt, bvModalEvt.componentId);
      this.$emit(type, bvModalEvt);
    },
    // UI event handlers
    onDialogMousedown: function onDialogMousedown() {
      var _this4 = this;

      // Watch to see if the matching mouseup event occurs outside the dialog
      // And if it does, cancel the clickOut handler
      var modal = this.$refs.modal;

      var onceModalMouseup = function onceModalMouseup(evt) {
        (0, _dom.eventOff)(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS);

        if (evt.target === modal) {
          _this4.ignoreBackdropClick = true;
        }
      };

      (0, _dom.eventOn)(modal, 'mouseup', onceModalMouseup, EVT_OPTIONS);
    },
    onClickOut: function onClickOut(evt) {
      if (this.ignoreBackdropClick) {
        // Click was initiated inside the modal content, but finished outside.
        // Set by the above onDialogMousedown handler
        this.ignoreBackdropClick = false;
        return;
      } // Do nothing if not visible, backdrop click disabled, or element
      // that generated click event is no longer in document body


      if (!this.isVisible || this.noCloseOnBackdrop || !(0, _dom.contains)(document.body, evt.target)) {
        return;
      } // If backdrop clicked, hide modal


      if (!(0, _dom.contains)(this.$refs.content, evt.target)) {
        this.hide('backdrop');
      }
    },
    onOk: function onOk() {
      this.hide('ok');
    },
    onCancel: function onCancel() {
      this.hide('cancel');
    },
    onClose: function onClose() {
      this.hide('headerclose');
    },
    onEsc: function onEsc(evt) {
      // If ESC pressed, hide modal
      if (evt.keyCode === _keyCodes.default.ESC && this.isVisible && !this.noCloseOnEsc) {
        this.hide('esc');
      }
    },
    // Document focusin listener
    focusHandler: function focusHandler(evt) {
      // If focus leaves modal, bring it back
      var modal = this.$refs.modal;

      if (!this.noEnforceFocus && this.isTop && this.isVisible && modal && document !== evt.target && !(0, _dom.contains)(modal, evt.target)) {
        modal.focus({
          preventScroll: true
        });
      }
    },
    // Turn on/off focusin listener
    setEnforceFocus: function setEnforceFocus(on) {
      var method = on ? _dom.eventOn : _dom.eventOff;
      method(document, 'focusin', this.focusHandler, EVT_OPTIONS);
    },
    // Resize listener
    setResizeEvent: function setResizeEvent(on) {
      var method = on ? _dom.eventOn : _dom.eventOff; // These events should probably also check if
      // body is overflowing

      method(window, 'resize', this.checkModalOverflow, EVT_OPTIONS);
      method(window, 'orientationchange', this.checkModalOverflow, EVT_OPTIONS);
    },
    // Root listener handlers
    showHandler: function showHandler(id, triggerEl) {
      if (id === this.safeId()) {
        this.return_focus = triggerEl || this.getActiveElement();
        this.show();
      }
    },
    hideHandler: function hideHandler(id) {
      if (id === this.safeId()) {
        this.hide('event');
      }
    },
    toggleHandler: function toggleHandler(id, triggerEl) {
      if (id === this.safeId()) {
        this.toggle(triggerEl);
      }
    },
    modalListener: function modalListener(bvEvt) {
      // If another modal opens, close this one if stacking not permitted
      if (this.noStacking && bvEvt.vueTarget !== this) {
        this.hide();
      }
    },
    // Focus control handlers
    focusFirst: function focusFirst() {
      // Don't try and focus if we are SSR
      if (_env.isBrowser) {
        var modal = this.$refs.modal;
        var activeElement = this.getActiveElement(); // If the modal contains the activeElement, we don't do anything

        if (modal && !(activeElement && (0, _dom.contains)(modal, activeElement))) {
          // Make sure top of modal is showing (if longer than the viewport)
          // and focus the modal content wrapper
          this.$nextTick(function () {
            modal.scrollTop = 0;
            modal.focus();
          });
        }
      }
    },
    returnFocusTo: function returnFocusTo() {
      // Prefer `returnFocus` prop over event specified
      // `return_focus` value
      var el = this.returnFocus || this.return_focus || null; // Is el a string CSS selector?

      el = (0, _inspect.isString)(el) ? (0, _dom.select)(el) : el;

      if (el) {
        // Possibly could be a component reference
        el = el.$el || el;

        if ((0, _dom.isVisible)(el) && el.focus) {
          el.focus();
        }
      }
    },
    checkModalOverflow: function checkModalOverflow() {
      if (this.isVisible) {
        var modal = this.$refs.modal;
        this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight;
      }
    },
    makeModal: function makeModal(h) {
      // Modal header
      var header = h(false);

      if (!this.hideHeader) {
        var modalHeader = this.normalizeSlot('modal-header', this.slotScope);

        if (!modalHeader) {
          var closeButton = h(false);

          if (!this.hideHeaderClose) {
            closeButton = h(_buttonClose.BButtonClose, {
              props: {
                disabled: this.isTransitioning,
                ariaLabel: this.headerCloseLabel,
                textVariant: this.headerCloseVariant || this.headerTextVariant
              },
              on: {
                click: this.onClose
              }
            }, [this.normalizeSlot('modal-header-close', {})]);
          }

          var domProps = !this.hasNormalizedSlot('modal-title') && this.titleHtml ? {
            innerHTML: this.titleHtml
          } : {};
          modalHeader = [h(this.titleTag, {
            class: ['modal-title'],
            domProps: domProps
          }, [this.normalizeSlot('modal-title', this.slotScope) || (0, _html.stripTags)(this.title)]), closeButton];
        }

        header = h('header', {
          ref: 'header',
          staticClass: 'modal-header',
          class: this.headerClasses,
          attrs: {
            id: this.safeId('__BV_modal_header_')
          }
        }, [modalHeader]);
      } // Modal body


      var body = h('div', {
        ref: 'body',
        staticClass: 'modal-body',
        class: this.bodyClasses,
        attrs: {
          id: this.safeId('__BV_modal_body_')
        }
      }, this.normalizeSlot('default', this.slotScope)); // Modal footer

      var footer = h(false);

      if (!this.hideFooter) {
        var modalFooter = this.normalizeSlot('modal-footer', this.slotScope);

        if (!modalFooter) {
          var cancelButton = h(false);

          if (!this.okOnly) {
            var cancelHtml = this.cancelTitleHtml ? {
              innerHTML: this.cancelTitleHtml
            } : null;
            cancelButton = h(_button.BButton, {
              props: {
                variant: this.cancelVariant,
                size: this.buttonSize,
                disabled: this.cancelDisabled || this.busy || this.isTransitioning
              },
              on: {
                click: this.onCancel
              }
            }, [this.normalizeSlot('modal-cancel', {}) || (cancelHtml ? h('span', {
              domProps: cancelHtml
            }) : (0, _html.stripTags)(this.cancelTitle))]);
          }

          var okHtml = this.okTitleHtml ? {
            innerHTML: this.okTitleHtml
          } : null;
          var okButton = h(_button.BButton, {
            props: {
              variant: this.okVariant,
              size: this.buttonSize,
              disabled: this.okDisabled || this.busy || this.isTransitioning
            },
            on: {
              click: this.onOk
            }
          }, [this.normalizeSlot('modal-ok', {}) || (okHtml ? h('span', {
            domProps: okHtml
          }) : (0, _html.stripTags)(this.okTitle))]);
          modalFooter = [cancelButton, okButton];
        }

        footer = h('footer', {
          ref: 'footer',
          staticClass: 'modal-footer',
          class: this.footerClasses,
          attrs: {
            id: this.safeId('__BV_modal_footer_')
          }
        }, [modalFooter]);
      } // Assemble modal content


      var modalContent = h('div', {
        ref: 'content',
        staticClass: 'modal-content',
        class: this.contentClass,
        attrs: {
          role: 'document',
          id: this.safeId('__BV_modal_content_'),
          'aria-labelledby': this.hideHeader ? null : this.safeId('__BV_modal_header_'),
          'aria-describedby': this.safeId('__BV_modal_body_')
        }
      }, [header, body, footer]); // Modal dialog wrapper

      var modalDialog = h('div', {
        staticClass: 'modal-dialog',
        class: this.dialogClasses,
        on: {
          mousedown: this.onDialogMousedown
        }
      }, [modalContent]); // Modal

      var modal = h('div', {
        ref: 'modal',
        staticClass: 'modal',
        class: this.modalClasses,
        style: this.modalStyles,
        directives: [{
          name: 'show',
          rawName: 'v-show',
          value: this.isVisible,
          expression: 'isVisible'
        }],
        attrs: {
          id: this.safeId(),
          role: 'dialog',
          tabindex: '-1',
          'aria-hidden': this.isVisible ? null : 'true',
          'aria-modal': this.isVisible ? 'true' : null
        },
        on: {
          keydown: this.onEsc,
          click: this.onClickOut
        }
      }, [modalDialog]); // Wrap modal in transition
      // Sadly, we can't use BVTransition here due to the differences in
      // transition durations for .modal and .modal-dialog. Not until
      // issue https://github.com/vuejs/vue/issues/9986 is resolved

      modal = h('transition', {
        props: {
          enterClass: '',
          enterToClass: '',
          enterActiveClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: ''
        },
        on: {
          beforeEnter: this.onBeforeEnter,
          enter: this.onEnter,
          afterEnter: this.onAfterEnter,
          beforeLeave: this.onBeforeLeave,
          leave: this.onLeave,
          afterLeave: this.onAfterLeave
        }
      }, [modal]); // Modal backdrop

      var backdrop = h(false);

      if (!this.hideBackdrop && this.isVisible) {
        backdrop = h('div', {
          staticClass: 'modal-backdrop',
          attrs: {
            id: this.safeId('__BV_modal_backdrop_')
          }
        }, [this.normalizeSlot('modal-backdrop', {})]);
      }

      backdrop = h(_bvTransition.default, {
        props: {
          noFade: this.noFade
        }
      }, [backdrop]); // Tab trap to prevent page from scrolling to next element in
      // tab index during enforce focus tab cycle

      var tabTrap = h(false);

      if (this.isVisible && this.isTop && !this.noEnforceFocus) {
        tabTrap = h('div', {
          attrs: {
            tabindex: '0'
          }
        });
      } // Assemble modal and backdrop in an outer <div>


      return h('div', {
        key: "modal-outer-".concat(this._uid),
        style: this.modalOuterStyle,
        attrs: {
          id: this.safeId('__BV_modal_outer_')
        }
      }, [modal, tabTrap, backdrop]);
    }
  },
  render: function render(h) {
    if (this.static) {
      return this.lazy && this.isHidden ? h(false) : this.makeModal(h);
    } else {
      return this.isHidden ? h(false) : h(_transporter.BTransporterSingle, {}, [this.makeModal(h)]);
    }
  }
});

exports.BModal = BModal;
var _default2 = BModal;
exports.default = _default2;