const path = require('path');
const webpack = require('webpack');

const APP_NAME = 'ng-fire-universal';

module.exports = {
  entry: {  server: './server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  stats: 'errors-only',
  mode: 'development',
  target: 'node',
  externals: [
    // Firebase has some troubles being webpacked when in in the Node environment, skip it.
    // Note: you may need to exclude other dependencies depending on your project.
    /^firebase/
  ],
  output: {
    // Export a UMD of the webpacked server.ts & deps, for rendering in Cloud Functions
    path: path.join(__dirname, `dist/${APP_NAME}-webpack`),
    library: 'app',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
}
