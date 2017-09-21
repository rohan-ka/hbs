const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    composer: './src/bin/composer.js',
    load: './src/bin/load.js',
    build: './src/bin/build.js',
    setup: './src/bin/setup.js',
    index: './src/index.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js'],
  },
  target: 'node',
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/local/bin/node',
      exclude: 'index.js',
      raw: true,
    }),
  ],
};
