const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = process.env.NODE_ENV

module.exports = {
  mode: mode || 'development',
  entry: {
    embed: path.resolve(__dirname, 'src/embed.js'),
    app: path.resolve(__dirname, 'src/index.js'),
    form: path.resolve(__dirname, 'src/form.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      excludeChunks: ['embed']
    }),
    new HtmlWebpackPlugin({
      filename: 'form.html',
      template: 'src/form.html',
      excludeChunks: ['embed', 'app']
    }),
    new MiniCssExtractPlugin(),
    ...(mode === 'production' ? [(new CleanWebpackPlugin(['dist']), new UglifyJSPlugin())] : [])
  ]
}
