module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],

  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        cwd: 'packagejson',
      },
    ],
  ],

  env: {
    dist: {
      // Environment for Webpack. Empty for now.
      // Module: CommonJS
    },
    lib: {
      // Module: CommonJS
      plugins: ['babel-plugin-strip-css-imports'],
      ignore: ['**/__tests__/*'],
    },
    es: {
      // Module: ES Module
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['babel-plugin-strip-css-imports'],
      ignore: ['**/__tests__/*'],
    },
    test: {
      // Module: CommonJS
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: [
        'babel-plugin-strip-css-imports',
        [
          '@babel/plugin-transform-runtime',
          {
            // so `setTimeout` is not replaced with core-js 3 version.
            corejs: false,
          },
        ],
      ],
    },
  },
};
