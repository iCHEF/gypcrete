import React from 'react';
import { action } from '@storybook/addon-actions';

import List from '@ichef/gypcrete/src/List';
import TextInputRow from '@ichef/gypcrete-form/src/TextInputRow';
import ControlledRow from './ControlledRow';

function BasicUsage() {
    return (
        <List title="Configs">
            <TextInputRow
                label="Module name"
                defaultValue="Points module"
                onChange={action('change')}
            />

            <ControlledRow initValue="Points module" />

            <TextInputRow
                disabled
                label="Disabled row"
                value="Points module"
                onChange={action('change')}
            />

            <TextInputRow
                readOnly
                label="Read-only row"
                value="Points module"
                onChange={action('change')}
            />


            <TextInputRow
                label="Secret code"
                value="Foo bar"
                onChange={action('change')}
                status="error"
                errorMsg="Cannot authenticate with this code."
            />
        </List>
    );
}

export default BasicUsage;
