import SelectOption from '../SelectOption';

/**
 * Convert children of `<SelectOptions>` components to array of options.
 *
 * @param {array} childrenArray - Array of `<SelectOptions>` components
 * @returns {array}
 */
function parseSelectOptions(childrenArray = []) {
    const results = [];

    childrenArray.forEach((child) => {
        if (child && child.type === SelectOption) {
            results.push(child.props);
        }
    });

    return results;
}

export default parseSelectOptions;
