/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
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
  context: __dirname,
  output: {
    filename: 'tune.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Tune',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
};
