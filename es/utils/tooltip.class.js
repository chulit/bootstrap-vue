"use strict";

exports.__esModule = true;
exports.default = void 0;

var _popper = _interopRequireDefault(require("popper.js"));

var _bvEvent = _interopRequireDefault(require("./bv-event.class"));

var _noop = _interopRequireDefault(require("./noop"));

var _array = require("./array");

var _dom = require("./dom");

var _inspect = require("./inspect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NAME = 'tooltip';
var CLASS_PREFIX = 'bs-tooltip';
var BS_CLASS_PREFIX_REGEX = new RegExp("\\b".concat(CLASS_PREFIX, "\\S+"), 'g');
var TRANSITION_DURATION = 150; // Modal $root hidden event

var MODAL_CLOSE_EVENT = 'bv::modal::hidden'; // Modal container for appending tooltip/popover

var MODAL_CLASS = '.modal-content';
var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOPLEFT: 'top',
  TOPRIGHT: 'top',
  RIGHTTOP: 'right',
  RIGHTBOTTOM: 'right',
  BOTTOMLEFT: 'bottom',
  BOTTOMRIGHT: 'bottom',
  LEFTTOP: 'left',
  LEFTBOTTOM: 'left'
};
var OffsetMap = {
  AUTO: 0,
  TOPLEFT: -1,
  TOP: 0,
  TOPRIGHT: +1,
  RIGHTTOP: -1,
  RIGHT: 0,
  RIGHTBOTTOM: +1,
  BOTTOMLEFT: -1,
  BOTTOM: 0,
  BOTTOMRIGHT: +1,
  LEFTTOP: -1,
  LEFT: 0,
  LEFTBOTTOM: +1
};
var HoverState = {
  SHOW: 'show',
  OUT: 'out'
};
var ClassName = {
  FADE: 'fade',
  SHOW: 'show'
};
var Selector = {
  TOOLTIP: '.tooltip',
  TOOLTIP_INNER: '.tooltip-inner',
  ARROW: '.arrow'
};
var Defaults = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  placement: 'top',
  offset: 0,
  arrowPadding: 6,
  container: false,
  fallbackPlacement: 'flip',
  callbacks: {},
  boundary: 'scrollParent',
  boundaryPadding: 5 // Transition event names

};
var TransitionEndEvents = {
  WebkitTransition: ['webkitTransitionEnd'],
  MozTransition: ['transitionend'],
  OTransition: ['otransitionend', 'oTransitionEnd'],
  transition: ['transitionend'] // Options for Native Event Listeners (since we never call preventDefault)

};
var EvtOpts = {
  passive: true,
  capture: false // Client-side tip ID counter for aria-describedby attribute
  // Each tooltip requires a unique client side ID

};
var NEXTID = 1;
/* istanbul ignore next */

var generateId = function generateId(name) {
  return "__BV_".concat(name, "_").concat(NEXTID++, "__");
};
/*
 * ToolTip class definition
 */


var ToolTip =
/*#__PURE__*/
function () {
  // Main constructor
  function ToolTip(element, config, $root) {
    _classCallCheck(this, ToolTip);

    // New tooltip object
    this.$isEnabled = true;
    this.$fadeTimeout = null;
    this.$hoverTimeout = null;
    this.$visibleInterval = null;
    this.$hoverState = '';
    this.$activeTrigger = {};
    this.$popper = null;
    this.$element = element;
    this.$tip = null;
    this.$id = generateId(this.constructor.NAME);
    this.$root = $root || null;
    this.$routeWatcher = null; // We use a bound version of the following handlers for root/modal
    // listeners to maintain the 'this' context

    this.$forceHide = this.forceHide.bind(this);
    this.$doHide = this.doHide.bind(this);
    this.$doShow = this.doShow.bind(this);
    this.$doDisable = this.doDisable.bind(this);
    this.$doEnable = this.doEnable.bind(this);
    this._noop = _noop.default.bind(this); // Set the configuration

    this.updateConfig(config);
  } // NOTE: Overridden by PopOver class


  _createClass(ToolTip, [{
    key: "updateConfig",
    // Update config
    value: function updateConfig(config) {
      // Merge config into defaults. We use "this" here because PopOver overrides Default
      var updatedConfig = _objectSpread({}, this.constructor.Default, config); // Sanitize delay


      if (config.delay && (0, _inspect.isNumber)(config.delay)) {
        /* istanbul ignore next */
        updatedConfig.delay = {
          show: config.delay,
          hide: config.delay
        };
      } // Title for tooltip and popover


      if (config.title && (0, _inspect.isNumber)(config.title)) {
        /* istanbul ignore next */
        updatedConfig.title = config.title.toString();
      } // Content only for popover


      if (config.content && (0, _inspect.isNumber)(config.content)) {
        /* istanbul ignore next */
        updatedConfig.content = config.content.toString();
      } // Hide element original title if needed


      this.fixTitle(); // Update the config

      this.$config = updatedConfig; // Stop/Restart listening

      this.unListen();
      this.listen();
    } // Destroy this instance

  }, {
    key: "destroy",
    value: function destroy() {
      // Stop listening to trigger events
      this.unListen(); // Disable while open listeners/watchers

      this.setWhileOpenListeners(false); // Clear any timeouts

      clearTimeout(this.$hoverTimeout);
      this.$hoverTimeout = null;
      clearTimeout(this.$fadeTimeout);
      this.$fadeTimeout = null; // Remove popper

      if (this.$popper) {
        this.$popper.destroy();
      }

      this.$popper = null; // Remove tip from document

      if (this.$tip && this.$tip.parentElement) {
        this.$tip.parentElement.removeChild(this.$tip);
      }

      this.$tip = null; // Null out other properties

      this.$id = null;
      this.$isEnabled = null;
      this.$root = null;
      this.$element = null;
      this.$config = null;
      this.$hoverState = null;
      this.$activeTrigger = null;
      this.$forceHide = null;
      this.$doHide = null;
      this.$doShow = null;
      this.$doDisable = null;
      this.$doEnable = null;
    }
  }, {
    key: "enable",
    value: function enable() {
      // Create a non-cancelable BvEvent
      var enabledEvt = new _bvEvent.default('enabled', {
        cancelable: false,
        target: this.$element,
        relatedTarget: null
      });
      this.$isEnabled = true;
      this.emitEvent(enabledEvt);
    }
  }, {
    key: "disable",
    value: function disable() {
      // Create a non-cancelable BvEvent
      var disabledEvt = new _bvEvent.default('disabled', {
        cancelable: false,
        target: this.$element,
        relatedTarget: null
      });
      this.$isEnabled = false;
      this.emitEvent(disabledEvt);
    } // Click toggler

  }, {
    key: "toggle",
    value: function toggle(event) {
      if (!this.$isEnabled) {
        /* istanbul ignore next */
        return;
      }
      /* istanbul ignore else */


      if (event) {
        this.$activeTrigger.click = !this.$activeTrigger.click;

        if (this.isWithActiveTrigger()) {
          this.enter(null);
        } else {
          this.leave(null);
        }
      } else {
        if ((0, _dom.hasClass)(this.getTipElement(), ClassName.SHOW)) {
          this.leave(null);
        } else {
          this.enter(null);
        }
      }
    } // Show tooltip

  }, {
    key: "show",
    value: function show() {
      var _this = this;

      if (!document.body.contains(this.$element) || !(0, _dom.isVisible)(this.$element)) {
        // If trigger element isn't in the DOM or is not visible
        return;
      } // Build tooltip element (also sets this.$tip)


      var tip = this.getTipElement();
      this.fixTitle();
      this.setContent(tip);

      if (!this.isWithContent(tip)) {
        // If no content, don't bother showing

        /* istanbul ignore next */
        this.$tip = null;
        /* istanbul ignore next */

        return;
      } // Set ID on tip and aria-describedby on element


      (0, _dom.setAttr)(tip, 'id', this.$id);
      this.addAriaDescribedby(); // Set animation on or off

      if (this.$config.animation) {
        (0, _dom.addClass)(tip, ClassName.FADE);
      } else {
        (0, _dom.removeClass)(tip, ClassName.FADE);
      }

      var placement = this.getPlacement();
      var attachment = this.constructor.getAttachment(placement);
      this.addAttachmentClass(attachment); // Create a cancelable BvEvent

      var showEvt = new _bvEvent.default('show', {
        cancelable: true,
        target: this.$element,
        relatedTarget: tip
      });
      this.emitEvent(showEvt);

      if (showEvt.defaultPrevented) {
        // Don't show if event cancelled
        this.$tip = null;
        return;
      } // Insert tooltip if needed


      var container = this.getContainer();

      if (!document.body.contains(tip)) {
        container.appendChild(tip);
      } // Refresh popper


      this.removePopper();
      this.$popper = new _popper.default(this.$element, tip, this.getPopperConfig(placement, tip)); // Transitionend callback

      var complete = function complete() {
        if (_this.$config.animation) {
          _this.fixTransition(tip);
        }

        var prevHoverState = _this.$hoverState;
        _this.$hoverState = null;

        if (prevHoverState === HoverState.OUT) {
          _this.leave(null);
        } // Create a non-cancelable BvEvent


        var shownEvt = new _bvEvent.default('shown', {
          cancelable: false,
          target: _this.$element,
          relatedTarget: tip
        });

        _this.emitEvent(shownEvt);
      }; // Enable while open listeners/watchers


      this.setWhileOpenListeners(true); // Show tip

      (0, _dom.addClass)(tip, ClassName.SHOW); // Start the transition/animation

      this.transitionOnce(tip, complete);
    } // Handler for periodic visibility check

  }, {
    key: "visibleCheck",
    value: function visibleCheck(on) {
      var _this2 = this;

      clearInterval(this.$visibleInterval);
      this.$visibleInterval = null;

      if (on) {
        this.$visibleInterval = setInterval(function () {
          var tip = _this2.$tip;

          if (tip && !(0, _dom.isVisible)(_this2.$element) && (0, _dom.hasClass)(tip, ClassName.SHOW)) {
            // Element is no longer visible, so force-hide the tooltip
            _this2.forceHide();
          }
        }, 100);
      }
    }
  }, {
    key: "setWhileOpenListeners",
    value: function setWhileOpenListeners(on) {
      // Modal close events
      this.setModalListener(on); // Periodic $element visibility check
      // For handling when tip is in <keepalive>, tabs, carousel, etc

      this.visibleCheck(on); // Route change events

      this.setRouteWatcher(on); // On-touch start listeners

      this.setOnTouchStartListener(on);

      if (on && /(focus|blur)/.test(this.$config.trigger)) {
        // If focus moves between trigger element and tip container, don't close
        (0, _dom.eventOn)(this.$tip, 'focusout', this, EvtOpts);
      } else {
        (0, _dom.eventOff)(this.$tip, 'focusout', this, EvtOpts);
      }
    } // Force hide of tip (internal method)

  }, {
    key: "forceHide",
    value: function forceHide() {
      if (!this.$tip || !(0, _dom.hasClass)(this.$tip, ClassName.SHOW)) {
        /* istanbul ignore next */
        return;
      } // Disable while open listeners/watchers


      this.setWhileOpenListeners(false); // Clear any hover enter/leave event

      clearTimeout(this.$hoverTimeout);
      this.$hoverTimeout = null;
      this.$hoverState = ''; // Hide the tip

      this.hide(null, true);
    } // Hide tooltip

  }, {
    key: "hide",
    value: function hide(callback, force) {
      var _this3 = this;

      var tip = this.$tip;

      if (!tip) {
        /* istanbul ignore next */
        return;
      } // Create a cancelable BvEvent


      var hideEvt = new _bvEvent.default('hide', {
        // We disable cancelling if force is true
        cancelable: !force,
        target: this.$element,
        relatedTarget: tip
      });
      this.emitEvent(hideEvt);

      if (hideEvt.defaultPrevented) {
        // Don't hide if event cancelled
        return;
      } // Transitionend callback


      var complete = function complete() {
        if (_this3.$hoverState !== HoverState.SHOW && tip.parentNode) {
          // Remove tip from DOM, and force recompile on next show
          tip.parentNode.removeChild(tip);

          _this3.removeAriaDescribedby();

          _this3.removePopper();

          _this3.$tip = null;
        }

        if (callback) {
          callback();
        } // Create a non-cancelable BvEvent


        var hiddenEvt = new _bvEvent.default('hidden', {
          cancelable: false,
          target: _this3.$element,
          relatedTarget: null
        });

        _this3.emitEvent(hiddenEvt);
      }; // Disable while open listeners/watchers


      this.setWhileOpenListeners(false); // If forced close, disable animation

      if (force) {
        (0, _dom.removeClass)(tip, ClassName.FADE);
      } // Hide tip


      (0, _dom.removeClass)(tip, ClassName.SHOW);
      this.$activeTrigger.click = false;
      this.$activeTrigger.focus = false;
      this.$activeTrigger.hover = false; // Start the hide transition

      this.transitionOnce(tip, complete);
      this.$hoverState = '';
    }
  }, {
    key: "emitEvent",
    value: function emitEvent(evt) {
      var evtName = evt.type;

      if (this.$root && this.$root.$emit) {
        // Emit an event on $root
        this.$root.$emit("bv::".concat(this.constructor.NAME, "::").concat(evtName), evt);
      }

      var callbacks = this.$config.callbacks || {};

      if ((0, _inspect.isFunction)(callbacks[evtName])) {
        callbacks[evtName](evt);
      }
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      var container = this.$config.container;
      var body = document.body; // If we are in a modal, we append to the modal instead of body,
      // unless a container is specified

      return container === false ? (0, _dom.closest)(MODAL_CLASS, this.$element) || body : (0, _dom.select)(container, body) || body;
    } // Will be overridden by PopOver if needed

  }, {
    key: "addAriaDescribedby",
    value: function addAriaDescribedby() {
      // Add aria-describedby on trigger element, without removing any other IDs
      var desc = (0, _dom.getAttr)(this.$element, 'aria-describedby') || '';
      desc = desc.split(/\s+/).concat(this.$id).join(' ').trim();
      (0, _dom.setAttr)(this.$element, 'aria-describedby', desc);
    } // Will be overridden by PopOver if needed

  }, {
    key: "removeAriaDescribedby",
    value: function removeAriaDescribedby() {
      var _this4 = this;

      var desc = (0, _dom.getAttr)(this.$element, 'aria-describedby') || '';
      desc = desc.split(/\s+/).filter(function (d) {
        return d !== _this4.$id;
      }).join(' ').trim();

      if (desc) {
        /* istanbul ignore next */
        (0, _dom.setAttr)(this.$element, 'aria-describedby', desc);
      } else {
        (0, _dom.removeAttr)(this.$element, 'aria-describedby');
      }
    }
  }, {
    key: "removePopper",
    value: function removePopper() {
      if (this.$popper) {
        this.$popper.destroy();
      }

      this.$popper = null;
    }
  }, {
    key: "transitionOnce",
    value: function transitionOnce(tip, complete) {
      var _this5 = this;

      var transEvents = this.getTransitionEndEvents();
      var called = false;
      clearTimeout(this.$fadeTimeout);
      this.$fadeTimeout = null;

      var fnOnce = function fnOnce() {
        if (called) {
          /* istanbul ignore next */
          return;
        }

        called = true;
        clearTimeout(_this5.$fadeTimeout);
        _this5.$fadeTimeout = null;
        transEvents.forEach(function (evtName) {
          (0, _dom.eventOff)(tip, evtName, fnOnce, EvtOpts);
        }); // Call complete callback

        complete();
      };

      if ((0, _dom.hasClass)(tip, ClassName.FADE)) {
        transEvents.forEach(function (evtName) {
          (0, _dom.eventOn)(tip, evtName, fnOnce, EvtOpts);
        }); // Fallback to setTimeout()

        this.$fadeTimeout = setTimeout(fnOnce, TRANSITION_DURATION);
      } else {
        fnOnce();
      }
    } // What transitionend event(s) to use? (returns array of event names)

  }, {
    key: "getTransitionEndEvents",
    value: function getTransitionEndEvents() {
      for (var name in TransitionEndEvents) {
        if (!(0, _inspect.isUndefined)(this.$element.style[name])) {
          return TransitionEndEvents[name];
        }
      } // Fallback

      /* istanbul ignore next */


      return [];
    }
    /* istanbul ignore next */

  }, {
    key: "update",
    value: function update() {
      if (!(0, _inspect.isNull)(this.$popper)) {
        this.$popper.scheduleUpdate();
      }
    } // NOTE: Overridden by PopOver class

  }, {
    key: "isWithContent",
    value: function isWithContent(tip) {
      tip = tip || this.$tip;

      if (!tip) {
        /* istanbul ignore next */
        return false;
      }

      return Boolean(((0, _dom.select)(Selector.TOOLTIP_INNER, tip) || {}).innerHTML);
    } // NOTE: Overridden by PopOver class

  }, {
    key: "addAttachmentClass",
    value: function addAttachmentClass(attachment) {
      (0, _dom.addClass)(this.getTipElement(), "".concat(CLASS_PREFIX, "-").concat(attachment));
    }
  }, {
    key: "getTipElement",
    value: function getTipElement() {
      if (!this.$tip) {
        // Try and compile user supplied template, or fallback to default template
        this.$tip = this.compileTemplate(this.$config.template) || this.compileTemplate(this.constructor.Default.template);
      } // Add tab index so tip can be focused, and to allow it to be
      // set as relatedTarget in focusin/out events


      this.$tip.tabIndex = -1;
      return this.$tip;
    }
  }, {
    key: "compileTemplate",
    value: function compileTemplate(html) {
      if (!html || !(0, _inspect.isString)(html)) {
        /* istanbul ignore next */
        return null;
      }

      var div = document.createElement('div');
      div.innerHTML = html.trim();
      var node = div.firstElementChild ? div.removeChild(div.firstElementChild) : null;
      div = null;
      return node;
    } // NOTE: Overridden by PopOver class

  }, {
    key: "setContent",
    value: function setContent(tip) {
      this.setElementContent((0, _dom.select)(Selector.TOOLTIP_INNER, tip), this.getTitle());
      (0, _dom.removeClass)(tip, ClassName.FADE);
      (0, _dom.removeClass)(tip, ClassName.SHOW);
    }
  }, {
    key: "setElementContent",
    value: function setElementContent(container, content) {
      if (!container) {
        // If container element doesn't exist, just return

        /* istanbul ignore next */
        return;
      }

      var allowHtml = this.$config.html;

      if ((0, _inspect.isObject)(content) && content.nodeType) {
        // Content is a DOM node
        if (allowHtml) {
          if (content.parentElement !== container) {
            container.innerHTML = '';
            container.appendChild(content);
          }
        } else {
          /* istanbul ignore next */
          container.innerText = content.innerText;
        }
      } else {
        // We have a plain HTML string or Text
        container[allowHtml ? 'innerHTML' : 'innerText'] = content;
      }
    } // NOTE: Overridden by PopOver class

  }, {
    key: "getTitle",
    value: function getTitle() {
      var title = this.$config.title || '';

      if ((0, _inspect.isFunction)(title)) {
        // Call the function to get the title value

        /* istanbul ignore next */
        title = title(this.$element);
      }

      if ((0, _inspect.isObject)(title) && title.nodeType && !title.innerHTML.trim()) {
        // We have a DOM node, but without inner content,
        // so just return empty string

        /* istanbul ignore next */
        title = '';
      }

      if ((0, _inspect.isString)(title)) {
        title = title.trim();
      }

      if (!title) {
        // If an explicit title is not given, try element's title attributes
        title = (0, _dom.getAttr)(this.$element, 'title') || (0, _dom.getAttr)(this.$element, 'data-original-title') || '';
        title = title.trim();
      }

      return title;
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this6 = this;

      var triggers = this.$config.trigger.trim().split(/\s+/);
      var el = this.$element; // Listen for global show/hide events

      this.setRootListener(true); // Using 'this' as the handler will get automatically directed to
      // this.handleEvent and maintain our binding to 'this'

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          (0, _dom.eventOn)(el, 'click', _this6, EvtOpts);
        } else if (trigger === 'focus') {
          (0, _dom.eventOn)(el, 'focusin', _this6, EvtOpts);
          (0, _dom.eventOn)(el, 'focusout', _this6, EvtOpts);
        } else if (trigger === 'blur') {
          // Used to close $tip when element looses focus
          (0, _dom.eventOn)(el, 'focusout', _this6, EvtOpts);
        } else if (trigger === 'hover') {
          (0, _dom.eventOn)(el, 'mouseenter', _this6, EvtOpts);
          (0, _dom.eventOn)(el, 'mouseleave', _this6, EvtOpts);
        }
      }, this);
    }
  }, {
    key: "unListen",
    value: function unListen() {
      var _this7 = this;

      var events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave']; // Using "this" as the handler will get automatically directed to this.handleEvent

      events.forEach(function (evt) {
        (0, _dom.eventOff)(_this7.$element, evt, _this7, EvtOpts);
      }, this); // Stop listening for global show/hide/enable/disable events

      this.setRootListener(false);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(e) {
      // This special method allows us to use "this" as the event handlers
      if ((0, _dom.isDisabled)(this.$element)) {
        // If disabled, don't do anything. Note: If tip is shown before element gets
        // disabled, then tip not close until no longer disabled or forcefully closed.

        /* istanbul ignore next */
        return;
      }

      if (!this.$isEnabled) {
        // If not enable
        return;
      }

      var type = e.type;
      var target = e.target;
      var relatedTarget = e.relatedTarget;
      var $element = this.$element;
      var $tip = this.$tip;

      if (type === 'click') {
        this.toggle(e);
      } else if (type === 'focusin' || type === 'mouseenter') {
        this.enter(e);
      } else if (type === 'focusout') {
        // target is the element which is loosing focus
        // and relatedTarget is the element gaining focus
        if ($tip && $element && $element.contains(target) && $tip.contains(relatedTarget)) {
          // If focus moves from $element to $tip, don't trigger a leave

          /* istanbul ignore next */
          return;
        }

        if ($tip && $element && $tip.contains(target) && $element.contains(relatedTarget)) {
          // If focus moves from $tip to $element, don't trigger a leave

          /* istanbul ignore next */
          return;
        }
        /* istanbul ignore next: difficult to test */


        if ($tip && $tip.contains(target) && $tip.contains(relatedTarget)) {
          // If focus moves within $tip, don't trigger a leave
          return;
        }
        /* istanbul ignore next: difficult to test */


        if ($element && $element.contains(target) && $element.contains(relatedTarget)) {
          // If focus moves within $element, don't trigger a leave
          return;
        } // Otherwise trigger a leave


        this.leave(e);
      } else if (type === 'mouseleave') {
        this.leave(e);
      }
    }
    /* istanbul ignore next */

  }, {
    key: "setRouteWatcher",
    value: function setRouteWatcher(on) {
      var _this8 = this;

      if (on) {
        this.setRouteWatcher(false);

        if (this.$root && Boolean(this.$root.$route)) {
          this.$routeWatcher = this.$root.$watch('$route', function (newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            } // If route has changed, we force hide the tooltip/popover


            _this8.forceHide();
          });
        }
      } else {
        if (this.$routeWatcher) {
          // Cancel the route watcher by calling the stored reference
          this.$routeWatcher();
          this.$routeWatcher = null;
        }
      }
    }
    /* istanbul ignore next */

  }, {
    key: "setModalListener",
    value: function setModalListener(on) {
      var modal = (0, _dom.closest)(MODAL_CLASS, this.$element);

      if (!modal) {
        // If we are not in a modal, don't worry. be happy
        return;
      } // We can listen for modal hidden events on $root


      if (this.$root) {
        this.$root[on ? '$on' : '$off'](MODAL_CLOSE_EVENT, this.$forceHide);
      }
    }
  }, {
    key: "setRootListener",
    value: function setRootListener(on) {
      // Listen for global 'bv::{hide|show}::{tooltip|popover}' hide request event
      if (this.$root) {
        this.$root[on ? '$on' : '$off']("bv::hide::".concat(this.constructor.NAME), this.$doHide);
        this.$root[on ? '$on' : '$off']("bv::show::".concat(this.constructor.NAME), this.$doShow);
        this.$root[on ? '$on' : '$off']("bv::disable::".concat(this.constructor.NAME), this.$doDisable);
        this.$root[on ? '$on' : '$off']("bv::enable::".concat(this.constructor.NAME), this.$doEnable);
      }
    }
  }, {
    key: "doHide",
    value: function doHide(id) {
      // Programmatically hide tooltip or popover
      if (!id) {
        // Close all tooltips or popovers
        this.forceHide();
      } else if (this.$element && this.$element.id && this.$element.id === id) {
        // Close this specific tooltip or popover
        this.hide();
      }
    }
  }, {
    key: "doShow",
    value: function doShow(id) {
      // Programmatically show tooltip or popover
      if (!id) {
        // Open all tooltips or popovers
        this.show();
      } else if (id && this.$element && this.$element.id && this.$element.id === id) {
        // Show this specific tooltip or popover
        this.show();
      }
    }
  }, {
    key: "doDisable",
    value: function doDisable(id) {
      // Programmatically disable tooltip or popover
      if (!id) {
        // Disable all tooltips or popovers
        this.disable();
      } else if (this.$element && this.$element.id && this.$element.id === id) {
        // Disable this specific tooltip or popover
        this.disable();
      }
    }
  }, {
    key: "doEnable",
    value: function doEnable(id) {
      // Programmatically enable tooltip or popover
      if (!id) {
        // Enable all tooltips or popovers
        this.enable();
      } else if (this.$element && this.$element.id && this.$element.id === id) {
        // Enable this specific tooltip or popover
        this.enable();
      }
    }
  }, {
    key: "setOnTouchStartListener",
    value: function setOnTouchStartListener(on) {
      var _this9 = this;

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children
      // Only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        /* istanbul ignore next: JSDOM does not support 'ontouchstart' event */
        (0, _array.from)(document.body.children).forEach(function (el) {
          if (on) {
            (0, _dom.eventOn)(el, 'mouseover', _this9._noop);
          } else {
            (0, _dom.eventOff)(el, 'mouseover', _this9._noop);
          }
        });
      }
    }
  }, {
    key: "fixTitle",
    value: function fixTitle() {
      var el = this.$element;

      if ((0, _dom.getAttr)(el, 'title') || !(0, _inspect.isString)((0, _dom.getAttr)(el, 'data-original-title'))) {
        (0, _dom.setAttr)(el, 'data-original-title', (0, _dom.getAttr)(el, 'title') || '');
        (0, _dom.setAttr)(el, 'title', '');
      }
    } // Enter handler

  }, {
    key: "enter",
    value: function enter(e) {
      var _this10 = this;

      if (e) {
        this.$activeTrigger[e.type === 'focusin' ? 'focus' : 'hover'] = true;
      }

      if ((0, _dom.hasClass)(this.getTipElement(), ClassName.SHOW) || this.$hoverState === HoverState.SHOW) {
        this.$hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(this.$hoverTimeout);
      this.$hoverState = HoverState.SHOW;

      if (!this.$config.delay || !this.$config.delay.show) {
        this.show();
        return;
      }

      this.$hoverTimeout = setTimeout(function () {
        if (_this10.$hoverState === HoverState.SHOW) {
          _this10.show();
        }
      }, this.$config.delay.show);
    } // Leave handler

  }, {
    key: "leave",
    value: function leave(e) {
      var _this11 = this;

      if (e) {
        this.$activeTrigger[e.type === 'focusout' ? 'focus' : 'hover'] = false;

        if (e.type === 'focusout' && /blur/.test(this.$config.trigger)) {
          // Special case for `blur`: we clear out the other triggers
          this.$activeTrigger.click = false;
          this.$activeTrigger.hover = false;
        }
      }

      if (this.isWithActiveTrigger()) {
        return;
      }

      clearTimeout(this.$hoverTimeout);
      this.$hoverState = HoverState.OUT;

      if (!this.$config.delay || !this.$config.delay.hide) {
        this.hide();
        return;
      }

      this.$hoverTimeout = setTimeout(function () {
        if (_this11.$hoverState === HoverState.OUT) {
          _this11.hide();
        }
      }, this.$config.delay.hide);
    }
  }, {
    key: "getPopperConfig",
    value: function getPopperConfig(placement, tip) {
      var _this12 = this;

      return {
        placement: this.constructor.getAttachment(placement),
        modifiers: {
          offset: {
            offset: this.getOffset(placement, tip)
          },
          flip: {
            behavior: this.$config.fallbackPlacement
          },
          arrow: {
            element: '.arrow'
          },
          preventOverflow: {
            padding: this.$config.boundaryPadding,
            boundariesElement: this.$config.boundary
          }
        },
        onCreate: function onCreate(data) {
          // Handle flipping arrow classes

          /* istanbul ignore next */
          if (data.originalPlacement !== data.placement) {
            _this12.handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          // Handle flipping arrow classes

          /* istanbul ignore next */
          _this12.handlePopperPlacementChange(data);
        }
      };
    }
    /* istanbul ignore next */

  }, {
    key: "getOffset",
    value: function getOffset(placement, tip) {
      if (!this.$config.offset) {
        var arrow = (0, _dom.select)(Selector.ARROW, tip);
        var arrowOffset = parseFloat((0, _dom.getCS)(arrow).width) + parseFloat(this.$config.arrowPadding);

        switch (OffsetMap[placement.toUpperCase()]) {
          case +1:
            return "+50%p - ".concat(arrowOffset, "px");

          case -1:
            return "-50%p + ".concat(arrowOffset, "px");

          default:
            return 0;
        }
      }

      return this.$config.offset;
    }
  }, {
    key: "getPlacement",
    value: function getPlacement() {
      var placement = this.$config.placement;

      if ((0, _inspect.isFunction)(placement)) {
        /* istanbul ignore next */
        return placement.call(this, this.$tip, this.$element);
      }

      return placement;
    }
  }, {
    key: "isWithActiveTrigger",
    value: function isWithActiveTrigger() {
      for (var trigger in this.$activeTrigger) {
        if (this.$activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    } // NOTE: Overridden by PopOver class

    /* istanbul ignore next */

  }, {
    key: "cleanTipClass",
    value: function cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.className.match(BS_CLASS_PREFIX_REGEX);

      if (!(0, _inspect.isNull)(tabClass) && tabClass.length > 0) {
        tabClass.forEach(function (cls) {
          (0, _dom.removeClass)(tip, cls);
        });
      }
    }
    /* istanbul ignore next */

  }, {
    key: "handlePopperPlacementChange",
    value: function handlePopperPlacementChange(data) {
      this.cleanTipClass();
      this.addAttachmentClass(this.constructor.getAttachment(data.placement));
    }
    /* istanbul ignore next */

  }, {
    key: "fixTransition",
    value: function fixTransition(tip) {
      var initConfigAnimation = this.$config.animation || false;

      if (!(0, _inspect.isNull)((0, _dom.getAttr)(tip, 'x-placement'))) {
        return;
      }

      (0, _dom.removeClass)(tip, ClassName.FADE);
      this.$config.animation = false;
      this.hide();
      this.show();
      this.$config.animation = initConfigAnimation;
    }
  }], [{
    key: "getAttachment",
    value: function getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    }
  }, {
    key: "Default",
    get: function get() {
      return Defaults;
    } // NOTE: Overridden by PopOver class

  }, {
    key: "NAME",
    get: function get() {
      return NAME;
    }
  }]);

  return ToolTip;
}();

var _default = ToolTip;
exports.default = _default;