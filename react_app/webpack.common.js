const webpack = require("webpack")
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;


module.exports = {
  mode: "production",
  devtool: 'source-map',
  output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist/static'),
     publicPath: 'static/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|sqgZgif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      }
    ]},
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      GRAPHQL_KEY: JSON.stringify(process.env.GRAPHQL_KEY)
    })
  ]
};