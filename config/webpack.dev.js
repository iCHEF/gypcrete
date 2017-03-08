// This file is not used in production.
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devPlugins = baseConfig.plugins.slice();

devPlugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);

module.exports = Object.assign({}, baseConfig, {
    entry: [
        'react-hot-loader/patch',
        './doc/index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '/'
    },

    devtool: 'inline-source-map',

    devServer: {
        compress: true,
        contentBase: false,
        hotOnly: true,
        port: 3100,
        publicPath: '/',
        stats: {
            assets: false,
            children: false,
            chunkModules: false,
            hash: false,
            version: false
        },
        setup: (app) => {
            app.get('/', (request, response) => {
                const indexFile = path.resolve(__dirname, '../doc/index.html');
                response.sendFile(indexFile);
            });
        }
    },

    plugins: devPlugins
});
