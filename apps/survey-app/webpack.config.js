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
      name: 'SurveyPage',
      filename: 'remoteEntry.js',
      exposes: {
        // Module
        './SurveyAppComponent': './apps/survey-app/src/app/app.js',

        // Slice
        // './grid': './apps/survey-app/src/app/pages/projects/store/index.js',

        // Route
        // './RoutingDemoConfig':
        // './apps/survey-app/src/app/pages/projects/DemoConfig.js',
      },
      shared: {
        ..._shared,
      },
    })
  );
  config.optimization.runtimeChunk = false;
  config.output = {
    ...config.output,
    uniqueName: 'react-survey',
    publicPath: 'auto',
  };

  return config;
};
