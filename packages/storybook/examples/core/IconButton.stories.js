import React from 'react';

import Button from '@ichef/gypcrete/src/Button';
import IconButton from '@ichef/gypcrete/src/IconButton';
import FlexRow from 'utils/FlexRow';

export default {
    title: '@ichef/gypcrete|IconButton',
    component: IconButton,
    subcomponents: {
        Button,
    },
};

export function BasicUsage() {
    return (
        <FlexRow>
            <IconButton icon="printer" />
        </FlexRow>
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
