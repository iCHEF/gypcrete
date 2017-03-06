const path = require('path');
const baseConfig = require('./webpack.base');

module.exports = Object.assign({}, baseConfig, {
    entry: './doc/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '/'
    },

    devServer: {
        compress: true,
        contentBase: false,
        port: 3100,
        publicPath: '/',
        setup: (app) => {
            app.get('/', (request, response) => {
                const indexFile = path.resolve(__dirname, '../doc/index.html');
                response.sendFile(indexFile);
            });
        }
    }
});
