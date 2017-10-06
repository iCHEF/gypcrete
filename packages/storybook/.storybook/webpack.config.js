/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const autoprefixer = require('autoprefixer');

// Load default config generator
const genDefaultConfig =
    require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (defaultConfig, configType) => {
    const storybookConfig = genDefaultConfig(defaultConfig, configType);

    // Inject gypcrete common styles into preview entry
    storybookConfig.entry.preview.push(
        path.resolve(__dirname, '../src/styles/index.scss')
    );

    // Loaders
    storybookConfig.module.rules.push(
        {
            test: /\.scss$/,
            include: [
                path.resolve(__dirname, '../src')
            ],
            use: [
                {
                    loader: 'style-loader'
                },
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
        },
        {
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, '../src'),
                path.resolve(__dirname, '../examples')
            ],
            enforce: 'pre',
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
    );

    // webpack-dev-server
    storybookConfig.devServer = {
        stats: {
            assets: false,
            children: false,
            chunkModules: false,
            hash: false,
            version: false
        }
    };

    return storybookConfig;
};
