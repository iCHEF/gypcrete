import React from 'react';

import List from '@ichef/gypcrete/src/List';
import TextInputRow from '@ichef/gypcrete-form/src/TextInputRow';

import ControlledRow from './ControlledRow';

const EXAMPLE_TEXT = (`
Lorem ipsum dolor sit amet,

consectetur adipiscing elit.
Donec vitae nibh sem.
`).trim();

function MultiLineUsage() {
    return (
        <List title="Configs">
            <TextInputRow
                multiLine
                label="Module name"
                defaultValue={EXAMPLE_TEXT}
            />

            <ControlledRow
                multiLine
                initValue={EXAMPLE_TEXT}
            />

            <TextInputRow
                multiLine
                disabled
                label="Disabled row"
                value={EXAMPLE_TEXT}
            />

            <TextInputRow
                multiLine
                readOnly
                label="Read-only row"
                value={EXAMPLE_TEXT}
            />


            <TextInputRow
                multiLine
                label="Secret code"
                value={EXAMPLE_TEXT}
                status="error"
                errorMsg="Cannot authenticate with this code."
            />
        </List>
    );
}

export default MultiLineUsage;
