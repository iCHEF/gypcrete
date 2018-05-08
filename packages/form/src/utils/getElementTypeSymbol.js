import { isValidElement } from 'react';

function getElementTypeSymbol(element) {
    let symbol;

    if (isValidElement(element)) {
        symbol = element.type.typeSymbol;
    }

    return symbol || null;
}

export default getElementTypeSymbol;
