const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'mini-vue3.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    port: '9000',
    hot: true,
    client: {
      progress: true,
    },
  },
  plugins: [new HtmlWebpackPlugin()],
}
