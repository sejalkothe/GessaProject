const { ModuleFederationPlugin } = require('webpack').container;
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const { dependencies } = require('../../package.json');

const _shared = {};
const depsBlacklist = ['gridstack'];

Object.keys(dependencies).forEach((d, i) => {
  if (depsBlacklist.includes(d)) return;

  _shared[d] = {
    singleton: true,
    eager: true,
    requiredVersion: dependencies[d],
  };
});

module.exports = (config, context) => {
  nrwlConfig(config);
  config.context = process.cwd();
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'pagesGessaApp',
      filename: 'remoteEntry.js',
      remotes: {
        ViewPageApp: `ViewPageApp@http://localhost:8001`,
      },
      exposes: {
        // Module
        // './someModule': './apps/test-app/src/app/someModule',
        // Slice
        // './someSlice': './apps/test-app/src/app/store/someSlice',
        // Route
        // './someRoute': './apps/test-app/src/app/routes/someRoute',
      },
      shared: {
        ..._shared,
      },
    })
  );
  config.optimization.runtimeChunk = false;
  config.output = {
    ...config.output,
    uniqueName: 'pagesGessaApp',
    publicPath: 'auto',
  };

  return config;
};
