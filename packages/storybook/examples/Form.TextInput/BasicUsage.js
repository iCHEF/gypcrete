import React from 'react';

import List from '@ichef/gypcrete/src/List';
import TextInput from '@ichef/gypcrete-form/src/TextInput';

function BasicUsage() {
    return (
        <List title="Configs">
            <TextInput
                label="Module name"
                defaultValue="Points module" />

            <TextInput
                disabled
                label="Disabled row"
                value="Points module" />

            <TextInput
                readOnly
                label="Read-only row"
                value="Points module" />


            <TextInput
                label="Secret code"
                value="Foo bar"
                status="error"
                errorMsg="Cannot authenticate with this code." />
        </List>
    );
}

export default BasicUsage;
