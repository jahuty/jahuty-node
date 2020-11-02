const path = require('path');

module.exports = {
  entry: './index.js',
  target: 'node', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jahuty.js',
    library: 'jahuty',
    libraryTarget: 'umd',
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
