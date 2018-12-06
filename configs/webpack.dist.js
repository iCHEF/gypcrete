/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const packageDirname = process.cwd();
const fullPackageName = process.env.npm_package_name || process.env.GPT_PKG_NAME;
const packageName = fullPackageName.replace(/@ichef\//, '');

module.exports = {
    entry: './src/index.js',

    context: packageDirname,

    output: {
        filename: `${packageName}.js`,
        path: path.resolve(packageDirname, 'dist'),
        library: packageName,
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(packageDirname, 'src')
                ],
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
                include: [
                    path.resolve(packageDirname, 'src')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded',
                            },
                        },
                    ],
                }),
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin(`${packageName}.css`),
    ],

    externals: {
        react: 'React',
    }
};
