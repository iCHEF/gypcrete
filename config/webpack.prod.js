const baseConfig = require('./webpack.base');

module.exports = Object.assign({}, baseConfig, {
    externals : {
        react: 'React'
    }
});
