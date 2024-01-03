/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpackMerge = require('webpack-merge');

const defaultConfigs = require('../../../configs/webpack.dist');

const packageDirname = process.cwd();

module.exports = webpackMerge(defaultConfigs, {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|otf|ttf|eot)$/,
        include: [
          path.resolve(packageDirname, 'src/fonts'),
        ],
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash:6][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'icons/[name]-[hash:6][ext]',
        },
      },
    ],
  },
});
