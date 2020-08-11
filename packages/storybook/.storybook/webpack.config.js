const path = require('path');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

const includePath = path.resolve(__dirname, '../..'); // gypcrete/packages
const excludePath = /node_modules/;

module.exports = ({ config, mode }) => {
    // Resolve modules in /storybook
    config.resolve.modules.push(
        path.join(__dirname, '..')
    );

    // By default storybook will minify js with default terser plugin
    // https://webpack.js.org/configuration/optimization/#optimizationminimize
    // That will mangle the function name so we couldn't read original
    // component name in published storybook.
    // Following config customize the TerserPlugin to remove the mangling.
    // Note that this will make the total bundle size increase a little (2.9MB => 3.2MB).
    // Consider storybook is for developer this should be fine.
    if (config.optimization && mode === 'PRODUCTION') {
        // eslint-disable-next-line no-param-reassign
        config.optimization.minimizer = [new TerserPlugin({
            cache: true,
            parallel: true,
            terserOptions: {
                mangle: false,
            }
        })];
    }

    // Ref: Storybook webpack dev config https://git.io/fpJ6h
    const babelLoaderRule = config.module.rules[0];
    babelLoaderRule.include.push(includePath);
    babelLoaderRule.use[0].options.sourceType = 'unambiguous';

    // For typescript
    config.resolve.extensions.push('.ts', '.tsx');
    babelLoaderRule.test = /\.(ts|js)x?$/;
    babelLoaderRule.use[0].options.presets.push('@babel/preset-typescript');

    config.module.rules.push({
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
    config.devServer = {
        stats: 'minimal',
    };

    return config;
};
