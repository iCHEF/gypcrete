module.exports = {
    presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage' }],
        '@babel/preset-react',
    ],

    plugins: [
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-transform-runtime', {
            corejs: 2,
        }],
        ['babel-plugin-module-resolver', {
            root: ['./'],
            cwd: 'packagejson',
        }],
    ],

    env: {
        dist: {
            // Environment for Webpack. Empty for now.
            // Module: CommonJS
        },
        es5: {
            // Module: CommonJS
            plugins: [
                'babel-plugin-strip-css-imports',
            ],
            ignore: ['**/__tests__/*'],
        },
        lib: {
            // Module: ES Module
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                    useBuiltIns: 'usage',
                }],
            ],
            plugins: [
                'babel-plugin-strip-css-imports',
            ],
            ignore: ['**/__tests__/*'],
        },
        test: {
            // Module: CommonJS
            presets: [
                ['@babel/preset-env', {
                    useBuiltIns: 'usage',
                    targets: {
                        node: 'current',
                    },
                }],
            ],
            plugins: [
                'babel-plugin-strip-css-imports',
            ],
        },
    },
};
