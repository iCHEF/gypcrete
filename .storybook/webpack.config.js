const path = require('path');
const autoprefixer = require('autoprefixer');

// load the default config generator.
const genDefaultConfig =
    require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = (defaultConfig, configType) => {
    const storybookConfig = genDefaultConfig(defaultConfig, configType);

    // Inject gypcrete common styles into preview entry
    storybookConfig.entry.preview.push(
        path.resolve(__dirname, '../src/styles/index.scss')
    );

    // Loaders
    storybookConfig.module.loaders.push(
        {
            test: /\.scss$/,
            include: [
                path.resolve(__dirname, '../src')
            ],
            loaders: [
                'style-loader',
                'css-loader?importLoaders=1',
                'postcss-loader',
                'sass-loader?outputStyle=expanded'
            ]
        }
    );

    // Pre-loaders
    storybookConfig.module.preLoaders = [
        {
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, '../src'),
                path.resolve(__dirname, '../examples')
            ],
            loader: 'eslint-loader',
            options: {
                /**
                 * Report every eslint error as a warning.
                 *
                 * This prevents Webpack dev-server from blocking HMR updates only because
                 * eslint fails. `create-react-app` also chooses to use only warnings,
                 * since `eslint-loader` has already make warnings “very visible”.
                 *
                 * Ref: https://git.io/vyu8d
                 */
                emitWarning: true
            }
        }
    ];

    // Postcss plugins
    storybookConfig.postcss = () => [
        autoprefixer
    ];

    return storybookConfig;
};
