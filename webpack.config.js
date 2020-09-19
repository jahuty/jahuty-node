const path = require('path');

module.exports = {
  entry: './src/jahuty.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jahuty.js',
    library: 'jahuty'
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
