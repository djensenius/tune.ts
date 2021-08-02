/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  // sourceMap: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'dist'),
    ],
    compress: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 9000,
  },
  output: {
    filename: 'tune.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
