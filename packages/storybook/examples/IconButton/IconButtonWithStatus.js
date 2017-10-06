import React from 'react';

import IconButton from 'src/IconButton';
import FlexRow from '../FlexRow';

function IconButtonWithStatusExample() {
    return (
        <FlexRow>
            <IconButton
                icon="printer"
                status="loading" />

            <IconButton
                icon="printer"
                status="success"
                statusOptions={{ autohide: false }} />

            <IconButton
                icon="printer"
                status="error"
                errorMsg="Cannot add printer." />
        </FlexRow>
    );
}

export default IconButtonWithStatusExample;
