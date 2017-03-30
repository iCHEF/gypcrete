// This file is not used in production.
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    context: path.resolve(__dirname, '..'),

    output: {
        filename: 'gypcrete.js',
        path: path.resolve(__dirname, '../dist'),
        library: 'gypcrete'
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
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot|svg)$/,
                include: [
                    path.resolve(__dirname, '../src/fonts')
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]',
                            outputPath: 'fonts/',
                            publicPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('gypcrete.css')
    ]
};
