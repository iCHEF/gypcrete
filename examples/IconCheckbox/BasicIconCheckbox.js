import React from 'react';

import IconCheckbox from 'src/IconCheckbox';
import FlexRow from '../FlexRow';

function BasicIconCheckboxExample() {
    return (
        <FlexRow>
            <IconCheckbox />

            <IconCheckbox indeterminate />
        </FlexRow>
    );
}

export default BasicIconCheckboxExample;
