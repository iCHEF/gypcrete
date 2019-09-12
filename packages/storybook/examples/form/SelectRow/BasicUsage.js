import React from 'react';
import { action } from '@storybook/addon-actions';

import List from '@ichef/gypcrete/src/List';
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';
import Option from '@ichef/gypcrete-form/src/SelectOption';

function BasicUsage() {
    return (
        <List title="Switch rows">
            <SelectRow
                label="Module default state on iPad"
                desc="Default is off"
                defaultValue="no"
                onChange={action('change')}
            >
                <Option label="Yes" value="yes" />
                <Option label="No" value="no" />
            </SelectRow>

            <SelectRow
                disabled
                label="Disabled row"
            >
                <Option label="Yes" value="yes" />
                <Option label="No" value="no" />
            </SelectRow>

            <SelectRow
                checked
                label="World peace"
                status="error"
                errorMsg="Cannot declare a war."
                value="peace"
            >
                <Option label="Peace" value="peace" />
                <Option label="War" value="war" />
            </SelectRow>
        </List>
    );
}

export default BasicUsage;
