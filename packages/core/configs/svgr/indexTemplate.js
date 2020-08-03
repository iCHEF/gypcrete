const path = require('path');

function isUpperCase(char) {
    return char.toUpperCase() === char;
}

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
 *
 * @param {string[]} filePaths Array of component file absolute path.
 */
function indexTemplate(filePaths) {
    const importStatements = filePaths.map((filePath) => {
        const exportName = path.basename(filePath, path.extname(filePath));
        return `import ${exportName} from './${exportName}';`;
    });
    const exportStatements = filePaths.map((filePath) => {
        const exportName = path.basename(filePath, path.extname(filePath));
        const originalSvgName = upperCamelCaseToKebabCase(exportName);
        const keyString = originalSvgName.includes('-') ? `'${originalSvgName}'` : originalSvgName;
        return `${keyString}: ${exportName},`;
    });
    return `${importStatements.join('\n')}

export default {
${exportStatements.map(s => `    ${s}`).join('\n')}
};
`;
}
module.exports = indexTemplate;
