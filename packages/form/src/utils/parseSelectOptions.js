import { Fragment } from 'react';
import { TYPE_SYMBOL } from '../SelectOption';

import getElementTypeSymbol from './getElementTypeSymbol';

/**
 * Convert children of `<SelectOptions>` components to array of options.
 *
 * @param {ReactChildren} children - children of `<SelectOptions>`
 * @returns {array}
 */
export default function parseSelectOptions(children) {
    const childArray = Array.isArray(children) ? children : [children].filter(item => item);

    const results = childArray.map((child) => {
        if (getElementTypeSymbol(child) === TYPE_SYMBOL) {
            return child.props;
        }

        if (child && child.type === Fragment) {
            return parseSelectOptions(child.props.children);
        }

        return null;
    });

    return results.flat().filter(item => item);
}
