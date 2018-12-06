const path = require('path');
const autoprefixer = require('autoprefixer');

const includePath = path.resolve(__dirname, '../..'); // gypcrete/packages
const excludePath = /node_modules/;

module.exports = (baseConfig, env, defaultConfig) => {
    // Resolve modules in /storybook
    defaultConfig.resolve.modules.push(
        path.join(__dirname, '..')
    );

    // Ref: Storybook webpack dev config https://git.io/fpJ6h
    const babelLoaderRule = defaultConfig.module.rules[0];
    babelLoaderRule.include.push(includePath);

    defaultConfig.module.rules.push({
        test: /\.scss$/,
        include: includePath,
        exclude: excludePath,
        use: [
            'style-loader',
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
                }
            },
        ],
    });

    // eslint-disable-next-line no-param-reassign
    defaultConfig.devServer = {
        stats: 'minimal',
    };

    return defaultConfig;
};
