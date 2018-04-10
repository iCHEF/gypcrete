/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    context: path.resolve(__dirname, '..'),

    output: {
        filename: 'gypcrete-imageeditor.js',
        path: path.resolve(__dirname, '../dist'),
        library: 'gypcrete-imageeditor'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('gypcrete-form.css')
    ],

    externals: {
        react: 'React'
    }
};
