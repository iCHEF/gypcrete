const path = require('path');

function isUpperCase(char) {
  return char.toUpperCase() === char;
}

/**
 * Transform upper camel case (pascal case) string to kebab case.
 * e.g. `AddItem` -> `add-item`
 * @param {string} inputString
 */
function upperCamelCaseToKebabCase(inputString) {
  let result = '';
  inputString.split('').forEach((char, i) => {
    if (isUpperCase(char)) {
      if (i !== 0) {
        result += '-';
      }
      result += char.toLowerCase();
    } else {
      result += char;
    }
  });
  return result;
}
/**
 * Receive icon component file absolut path array,
 * return the content of `index.js`.
 * See svgr document: https://react-svgr.com/docs/custom-templates/#custom-index-template
 * @param {string[]} iconComponentFileAbsPaths Array of component file absolute path.
 * @returns {string} Plain text for the index js file.
 */
function indexTemplate(iconComponentFileAbsPaths) {
  const importStatements = iconComponentFileAbsPaths.map((filePath) => {
    const componentFileNameWithoutExt = path.basename(filePath, path.extname(filePath));
    /* Let's assume component name is as same as filename */
    return `import ${componentFileNameWithoutExt} from './${componentFileNameWithoutExt}';`;
  });
  const exportStatements = iconComponentFileAbsPaths.map((filePath) => {
    const componentFileNameWithoutExt = path.basename(filePath, path.extname(filePath));
    /**
         * icon type on <Icon /> is kebab case.
         * svgr will transform it to upper camel case(pascal case) for component.
         * Here we just transform it back.
         */
    const originalSvgName = upperCamelCaseToKebabCase(componentFileNameWithoutExt);
    const keyString = originalSvgName.includes('-') ? `'${originalSvgName}'` : originalSvgName;
    return `${keyString}: ${componentFileNameWithoutExt},`;
  });
  return `${importStatements.join('\n')}

export default {
${exportStatements.map(s => `    ${s}`).join('\n')}
};
`;
}
module.exports = indexTemplate;
