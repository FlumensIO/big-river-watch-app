require('dotenv').config({ silent: true });
const webpack = require('webpack');
const appConfig = require('@flumens/webpack-config');

const required = [
  'APP_SENTRY_KEY',
  'SUPABASE_PROJECT',
  'SUPABASE_ANON_KEY',
  'APP_MAPBOX_MAP_KEY',
];

const development = {
  APP_BACKEND_URL: '',
};

appConfig.plugins.unshift(
  new webpack.EnvironmentPlugin(required),
  new webpack.EnvironmentPlugin(development)
);

module.exports = appConfig;
