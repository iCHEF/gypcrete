import { Fragment } from 'react';
import { TYPE_SYMBOL as CHECKBOX_OPTION_TYPE_SYMBOL } from '../SelectOption';
import { TYPE_SYMBOL as RADIO_OPTION_TYPE_SYMBOL } from '../RadioSelectOption';

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
    const elementTypeSymbol = getElementTypeSymbol(child);
    if (
      elementTypeSymbol === CHECKBOX_OPTION_TYPE_SYMBOL
      || elementTypeSymbol === RADIO_OPTION_TYPE_SYMBOL
    ) {
      return child.props;
    }

    if (child && child.type === Fragment) {
      return parseSelectOptions(child.props.children);
    }

    return null;
  });

  return results.flat().filter(item => item);
}
