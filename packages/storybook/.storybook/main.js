module.exports = {
  core: {
    builder: 'webpack5',
  },

  stories: [
    '../examples/**/*.stories.(js|mdx)',
    '../examples/**/index.js',
  ],

  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
  ],
};
