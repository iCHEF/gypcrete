import React from 'react';

import IconButton from 'src/IconButton';
import FlexRow from '../FlexRow';

function BasicIconButtonExample() {
    return (
        <FlexRow>
            <IconButton
                icon="printer" />

            <IconButton
                solid
                color="blue"
                icon="edit" />
        </FlexRow>
    );
}

export default BasicIconButtonExample;
