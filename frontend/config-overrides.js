const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
  config.plugins.push(new NodePolyfillPlugin());
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

  return config
}
