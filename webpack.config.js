const {resolve} = require('path');

const BabelStandalonePlugin = require('./webpack/babel-standalone-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  optimization: {
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: resolve(__dirname, 'src/template/index.html'),
    }),
    new BabelStandalonePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, './node_modules/babel-polyfill/dist/polyfill.js'),
          to: 'babel-polyfill.min.js',
        },
        {
          from: resolve(__dirname, './node_modules/babel-standalone/babel.js'),
          to: 'babel.min.js',
        },
      ],
    }),
  ],
}
