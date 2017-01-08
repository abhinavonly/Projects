'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  // the entry file for the bundle
  devtools: 'eval-source-map',
  entry: ['webpack-hot-middleware/client', __dirname + '/client/index.js'],

  // the bundle file we will get in the result
  output: {
    path: '/',
    publicPath: '/'
  },
  plugins: [new webpack.NoErrorsPlugin(), new webpack.optimize.OccurenceOrderPlugin(), new webpack.HotModuleReplacementPlugin()],
  module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }]
  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true,
  resolve: {
    alias: {
      'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min')
    }
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

//# sourceMappingURL=webpack.config-compiled.js.map