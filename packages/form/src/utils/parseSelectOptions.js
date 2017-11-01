import { Children } from 'react';
import SelectOption from '../SelectOption';

/**
 * Convert children of `<SelectOptions>` components to array of options.
 *
 * @param {ReactChildren} children - children of `<SelectOptions>`
 * @returns {array}
 */
function parseSelectOptions(children) {
    const results = [];

    Children.forEach(children, (child) => {
        if (child && child.type === SelectOption) {
            results.push(child.props);
        }
    });

    return results;
}

export default parseSelectOptions;
