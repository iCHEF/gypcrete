import React from 'react';

import TextLabelDoc from './TextLabelDoc';
import ButtonDoc from './ButtonDoc';
import IconButtonDoc from './IconButtonDoc';
import CheckboxDoc from './CheckboxDoc';
import IconCheckboxDoc from './IconCheckboxDoc';
import SearchInputDoc from './SearchInputDoc';

function RowComponents() {
    return (
        <div>
            <h1>Row Components</h1>

            <TextLabelDoc />
            <ButtonDoc />
            <IconButtonDoc />
            <CheckboxDoc />
            <IconCheckboxDoc />
            <SearchInputDoc />
        </div>
    );
}

export default RowComponents;
