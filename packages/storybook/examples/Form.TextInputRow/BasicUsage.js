import React from 'react';

import List from '@ichef/gypcrete/src/List';
import TextInputRow from '@ichef/gypcrete-form/src/TextInputRow';

function BasicUsage() {
    return (
        <List title="Configs">
            <TextInputRow
                label="Module name"
                defaultValue="Points module" />

            <TextInputRow
                disabled
                label="Disabled row"
                value="Points module" />

            <TextInputRow
                readOnly
                label="Read-only row"
                value="Points module" />


            <TextInputRow
                label="Secret code"
                value="Foo bar"
                status="error"
                errorMsg="Cannot authenticate with this code." />
        </List>
    );
}

export default BasicUsage;
