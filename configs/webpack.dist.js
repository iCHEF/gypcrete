/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const packageDirname = process.cwd();
const fullPackageName = process.env.npm_package_name || process.env.GPT_PKG_NAME;
const packageName = fullPackageName.replace(/@ichef\//, '');

function toCamelCase(str) {
  return str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
}

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  context: packageDirname,

  output: {
    filename: `${packageName}.js`,
    path: path.resolve(packageDirname, 'dist'),
    library: {
      name: toCamelCase(packageName),
      type: 'var',
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(packageDirname, 'src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [path.resolve(packageDirname, 'src')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${packageName}.css`,
    }),
  ],

  externals: {
    react: 'React',
  },
};
