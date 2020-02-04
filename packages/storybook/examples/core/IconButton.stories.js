import React from 'react';

import IconButton from '@ichef/gypcrete/src/IconButton';
import FlexRow from 'utils/FlexRow';

export default {
    title: '@ichef/gypcrete|IconButton',
    component: IconButton,
};

export function BasicUsage() {
    return (
        <IconButton icon="printer" />
    );
}

export function WithStatus() {
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
