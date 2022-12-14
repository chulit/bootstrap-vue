function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Tooltip/Popover component mixin
 * Common props
 */
import observeDom from '../utils/observe-dom';
import { isElement, getById } from '../utils/dom';
import { isArray, isFunction, isObject, isString } from '../utils/inspect';
import { HTMLElement } from '../utils/safe-types'; // --- Constants ---

var PLACEMENTS = {
  top: 'top',
  topleft: 'topleft',
  topright: 'topright',
  right: 'right',
  righttop: 'righttop',
  rightbottom: 'rightbottom',
  bottom: 'bottom',
  bottomleft: 'bottomleft',
  bottomright: 'bottomright',
  left: 'left',
  lefttop: 'lefttop',
  leftbottom: 'leftbottom',
  auto: 'auto'
};
var OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['class', 'style'] // @vue/component

};
export default {
  props: {
    target: {
      // String ID of element, or element/component reference
      type: [String, Object, HTMLElement, Function] // default: undefined

    },
    offset: {
      type: [Number, String],
      default: 0
    },
    noFade: {
      type: Boolean,
      default: false
    },
    container: {
      // String ID of container, if null body is used (default)
      type: String,
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      // semaphore for preventing multiple show events
      localShow: false
    };
  },
  computed: {
    baseConfig: function baseConfig() {
      var cont = this.container;
      var delay = isObject(this.delay) ? this.delay : parseInt(this.delay, 10) || 0;
      return {
        // Title prop
        title: (this.title || '').trim() || '',
        // Content prop (if popover)
        content: (this.content || '').trim() || '',
        // Tooltip/Popover placement
        placement: PLACEMENTS[this.placement] || 'auto',
        // Tooltip/popover fallback placemenet
        fallbackPlacement: this.fallbackPlacement || 'flip',
        // Container currently needs to be an ID with '#' prepended, if null then body is used
        container: cont ? /^#/.test(cont) ? cont : "#".concat(cont) : false,
        // boundariesElement passed to popper
        boundary: this.boundary,
        // boundariesElement padding passed to popper
        boundaryPadding: this.boundaryPadding,
        // Show/Hide delay
        delay: delay || 0,
        // Offset can be css distance. if no units, pixels are assumed
        offset: this.offset || 0,
        // Disable fade Animation?
        animation: !this.noFade,
        // Open/Close Trigger(s)
        trigger: isArray(this.triggers) ? this.triggers.join(' ') : this.triggers,
        // Callbacks so we can trigger events on component
        callbacks: {
          show: this.onShow,
          shown: this.onShown,
          hide: this.onHide,
          hidden: this.onHidden,
          enabled: this.onEnabled,
          disabled: this.onDisabled
        }
      };
    }
  },
  watch: {
    show: function show(_show, old) {
      if (_show !== old) {
        _show ? this.onOpen() : this.onClose();
      }
    },
    disabled: function disabled(_disabled, old) {
      if (_disabled !== old) {
        _disabled ? this.onDisable() : this.onEnable();
      }
    },
    localShow: function localShow(show, old) {
      if (show !== this.show) {
        this.$emit('update:show', show);
      }
    }
  },
  created: function created() {
    // Create non-reactive property
    this._toolpop = null;
    this._obs_title = null;
    this._obs_content = null;
  },
  mounted: function mounted() {
    var _this = this;

    // We do this in a next tick to ensure DOM has rendered first
    this.$nextTick(function () {
      // Instantiate ToolTip/PopOver on target
      // The createToolpop method must exist in main component
      if (_this.createToolpop()) {
        if (_this.disabled) {
          // Initially disabled
          _this.onDisable();
        } // Listen to open signals from others


        _this.$on('open', _this.onOpen); // Listen to close signals from others


        _this.$on('close', _this.onClose); // Listen to disable signals from others


        _this.$on('disable', _this.onDisable); // Listen to enable signals from others


        _this.$on('enable', _this.onEnable); // Observe content Child changes so we can notify popper of possible size change


        _this.setObservers(true); // Set initially open state


        if (_this.show) {
          _this.onOpen();
        }
      }
    });
  },
  updated: function updated() {
    // If content/props changes, etc
    if (this._toolpop) {
      this._toolpop.updateConfig(this.getConfig());
    }
  },
  activated: function activated()
  /* istanbul ignore next: can't easily test in JSDOM */
  {
    // Called when component is inside a <keep-alive> and component brought offline
    this.setObservers(true);
  },
  deactivated: function deactivated()
  /* istanbul ignore next: can't easily test in JSDOM */
  {
    // Called when component is inside a <keep-alive> and component taken offline
    if (this._toolpop) {
      this.setObservers(false);

      this._toolpop.hide();
    }
  },
  beforeDestroy: function beforeDestroy() {
    // Shutdown our local event listeners
    this.$off('open', this.onOpen);
    this.$off('close', this.onClose);
    this.$off('disable', this.onDisable);
    this.$off('enable', this.onEnable);
    this.setObservers(false); // bring our content back if needed

    this.bringItBack();

    if (this._toolpop) {
      this._toolpop.destroy();

      this._toolpop = null;
    }
  },
  methods: {
    getConfig: function getConfig() {
      var cfg = _objectSpread({}, this.baseConfig);

      if (this.$refs.title && this.$refs.title.innerHTML.trim()) {
        // If slot has content, it overrides 'title' prop
        // We use the DOM node as content to allow components!
        cfg.title = this.$refs.title;
        cfg.html = true;
      }

      if (this.$refs.content && this.$refs.content.innerHTML.trim()) {
        // If slot has content, it overrides 'content' prop
        // We use the DOM node as content to allow components!
        cfg.content = this.$refs.content;
        cfg.html = true;
      }

      return cfg;
    },
    onOpen: function onOpen() {
      if (this._toolpop && !this.localShow) {
        this.localShow = true;

        this._toolpop.show();
      }
    },
    onClose: function onClose(callback) {
      // What is callback for ? it is not documented

      /* istanbul ignore else */
      if (this._toolpop && this.localShow) {
        this._toolpop.hide(callback);
      } else if (isFunction(callback)) {
        // Is this even used?
        callback();
      }
    },
    onDisable: function onDisable() {
      if (this._toolpop) {
        this._toolpop.disable();
      }
    },
    onEnable: function onEnable() {
      if (this._toolpop) {
        this._toolpop.enable();
      }
    },
    updatePosition: function updatePosition() {
      /* istanbul ignore next: can't test in JSDOM until mutation observer is implemented */
      if (this._toolpop) {
        // Instruct popper to reposition popover if necessary
        this._toolpop.update();
      }
    },
    getTarget: function getTarget() {
      var target = this.target;

      if (isFunction(target)) {
        /* istanbul ignore next */
        target = target();
      }
      /* istanbul ignore else */


      if (isString(target)) {
        // Assume ID of element
        return getById(target);
      } else if (isObject(target) && isElement(target.$el)) {
        // Component reference

        /* istanbul ignore next */
        return target.$el;
      } else if (isObject(target) && isElement(target)) {
        // Element reference

        /* istanbul ignore next */
        return target;
      }
      /* istanbul ignore next */


      return null;
    },
    // Callbacks called by Tooltip/Popover class instance
    onShow: function onShow(evt) {
      this.$emit('show', evt);
      this.localShow = !(evt && evt.defaultPrevented);
    },
    onShown: function onShown(evt) {
      this.setObservers(true);
      this.$emit('shown', evt);
      this.localShow = true;
    },
    onHide: function onHide(evt) {
      this.$emit('hide', evt);
      this.localShow = !!(evt && evt.defaultPrevented);
    },
    onHidden: function onHidden(evt) {
      this.setObservers(false); // bring our content back if needed to keep Vue happy
      // Tooltip class will move it back to tip when shown again

      this.bringItBack();
      this.$emit('hidden', evt);
      this.localShow = false;
    },
    onEnabled: function onEnabled(evt) {
      /* istanbul ignore next */
      if (!evt || evt.type !== 'enabled') {
        // Prevent possible endless loop if user mistakenly fires enabled instead of enable
        return;
      }

      this.$emit('update:disabled', false);
      this.$emit('disabled');
    },
    onDisabled: function onDisabled(evt) {
      /* istanbul ignore next */
      if (!evt || evt.type !== 'disabled') {
        // Prevent possible endless loop if user mistakenly fires disabled instead of disable
        return;
      }

      this.$emit('update:disabled', true);
      this.$emit('enabled');
    },
    bringItBack: function bringItBack() {
      // bring our content back if needed to keep Vue happy
      if (this.$el && this.$refs.title) {
        this.$el.appendChild(this.$refs.title);
      }

      if (this.$el && this.$refs.content) {
        this.$el.appendChild(this.$refs.content);
      }
    },
    setObservers: function setObservers(on) {
      if (on) {
        if (this.$refs.title) {
          this._obs_title = observeDom(this.$refs.title, this.updatePosition.bind(this), OBSERVER_CONFIG);
        }

        if (this.$refs.content) {
          this._obs_content = observeDom(this.$refs.content, this.updatePosition.bind(this), OBSERVER_CONFIG);
        }
      } else {
        if (this._obs_title) {
          this._obs_title.disconnect();

          this._obs_title = null;
        }

        if (this._obs_content) {
          this._obs_content.disconnect();

          this._obs_content = null;
        }
      }
    }
  }
};