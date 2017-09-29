/**
 * @author lgraziani2712
 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
// const ENV = process.env.npm_lifecycle_event;

const mainPath = `${__dirname}/../`;

module.exports = {
  entry: [
    path.join(mainPath, '/src/app.main.js'),
  ],
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'bundle.js',

    // Note: Physical files are only output by the production build task `npm run build`.
    path: path.join(mainPath, '/dist'),

    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.join(mainPath, 'src'),
      'node_modules',
    ],
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.html$/,
      use: ['html-loader'],
    }, {
      test: /src.*\.js$/,
      use: ['ng-annotate-loader'],
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=8192&mimetype=application/font-woff'],
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=8192&mimetype=application/font-woff'],
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=8192&mimetype=application/octet-stream'],
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: ['file-loader'],
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=8192&mimetype=image/svg+xml'],
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      moment: 'moment',
      'window.moment': 'moment',
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(mainPath, './src/public', 'index.html'),
      minify: {
        removeComments: true,
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(mainPath, '/dist'),
    port: 9090,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
