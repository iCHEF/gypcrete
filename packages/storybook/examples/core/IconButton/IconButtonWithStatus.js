import React from 'react';

import IconButton from '@ichef/gypcrete/src/IconButton';
import FlexRow from 'utils/FlexRow';

function IconButtonWithStatusExample() {
    return (
        <FlexRow>
            <IconButton
                icon="printer"
                status="loading"
            />

            <IconButton
                icon="printer"
                status="success"
                statusOptions={{ autohide: false }}
            />

            <IconButton
                icon="printer"
                status="error"
                errorMsg="Cannot add printer."
            />
        </FlexRow>
    );
}

export default IconButtonWithStatusExample;
