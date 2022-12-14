/*!
 * BoostrapVue 2.0.0-rc.24
 *
 * @link https://bootstrap-vue.js.org
 * @source https://github.com/bootstrap-vue/bootstrap-vue
 * @copyright (c) 2016-2019 BootstrapVue
 * @license MIT
 * https://github.com/bootstrap-vue/bootstrap-vue/blob/master/LICENSE
 */
"use strict";

exports.__esModule = true;
exports.default = void 0;

var _plugins = require("./utils/plugins");

var _config = require("./utils/config");

var _components = require("./components");

var _directives = require("./directives");

// This index file is used to create the legacy es/index.js
// and will be removed once the `es/` build has been removed.
// It has no top-level named exports
var BootstrapVue = {
  install: (0, _plugins.installFactory)({
    plugins: {
      componentsPlugin: _components.componentsPlugin,
      directivesPlugin: _directives.directivesPlugin
    }
  }),
  setConfig: _config.setConfig // Default export is the BootstrapVue plugin

};
var _default = BootstrapVue;
exports.default = _default;