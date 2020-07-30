const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './app/app.main.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1000
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.html$/,
      include: [
        path.resolve(__dirname, 'app/views')
      ],
      use: [{
        loader: 'file-loader',
        options: {
          name: 'views/[name].[ext]',
          context: ''
        }
      }]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html'
    }),
    new MiniCssExtractPlugin({
      file: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
