/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const autoprefixer = require('autoprefixer');

// Load default config generator
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

const includePath = path.resolve(__dirname, '../..'); // gypcrete/packages
const excludePath = /node_modules/;

module.exports = (defaultConfig, configType) => {
    const storybookConfig = genDefaultConfig(defaultConfig, configType);

    // Inject gypcrete common styles into preview entry
    storybookConfig.entry.preview.push(
        '@ichef/gypcrete/src/styles/index.scss'
    );

    // Resolve modules in storybook/ package
    storybookConfig.resolve.modules.push(
        path.join(__dirname, '..')
    );

    // Override loaders to control include paths.
    storybookConfig.module.rules = [
        {
            test: /\.jsx?$/,
            include: includePath,
            exclude: excludePath,
            use: {
                loader: 'babel-loader',
                options: {
                    rootMode: 'upward',
                },
            },
        },
        {
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
        },
        {
            test: /\.json$/,
            include: includePath,
            exclude: excludePath,
            loader: require.resolve('json-loader'),
        },
        {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
            include: includePath,
            exclude: excludePath,
            loader: require.resolve('file-loader'),
            query: {
                name: 'static/media/[name].[hash:8].[ext]',
            },
        },
    ];

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
