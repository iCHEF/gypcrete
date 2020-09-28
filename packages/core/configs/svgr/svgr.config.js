const template = require('./componentTemplate');
const indexTemplate = require('./indexTemplate');

module.exports = {
  template,
  indexTemplate,
  replaceAttrValues: {
    '#000': 'currentColor',
  },
  prettier: true,
  prettierConfig: {
    singleQuote: true,
    tabWidth: 2,
  },
};
