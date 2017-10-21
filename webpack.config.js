// webpack.config.js
var path = require('path');

module.exports = {
  entry: "./public/js/main.js",
  output: {
      path: path.resolve(__dirname, 'public', 'js'),
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
