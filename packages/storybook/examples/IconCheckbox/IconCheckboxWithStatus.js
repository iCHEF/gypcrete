import React from 'react';

import IconCheckbox from '@ichef/gypcrete/src/IconCheckbox';
import FlexRow from '../FlexRow';

function IconCheckboxWithStatusExample() {
    return (
        <FlexRow>
            <IconCheckbox
                defaultChecked
                status="loading" />

            <IconCheckbox
                status="success"
                statusOptions={{ autohide: false }} />

            <IconCheckbox
                status="error"
                errorMsg="Cannot add printer." />
        </FlexRow>
    );
}

export default IconCheckboxWithStatusExample;
