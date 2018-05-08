import { Children } from 'react';
import { TYPE_SYMBOL } from '../SelectOption';

import getElementTypeSymbol from './getElementTypeSymbol';

/**
 * Convert children of `<SelectOptions>` components to array of options.
 *
 * @param {ReactChildren} children - children of `<SelectOptions>`
 * @returns {array}
 */
function parseSelectOptions(children) {
    const results = [];

    Children.forEach(children, (child) => {
        if (getElementTypeSymbol(child) === TYPE_SYMBOL) {
            results.push(child.props);
        }
    });

    return results;
}

export default parseSelectOptions;
