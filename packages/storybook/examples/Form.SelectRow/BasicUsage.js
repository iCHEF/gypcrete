import React from 'react';

import List from '@ichef/gypcrete/src/List';
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';
import Option from '@ichef/gypcrete-form/src/SelectOption';

const DESC = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nunc risus risus, gravida in nisl ac, iaculis aliquam dui.
    Nunc dictum ipsum eu sapien lacinia, eu finibus nibh vestibulum.
`;

function BasicUsage() {
    return (
        <List title="Switch rows">
            <SelectRow
                label="Module default state on iPad"
                desc={DESC}
                defaultValues={['0']}>
                <Option label="Yes" value="1" />
                <Option label="No" value="0" />
            </SelectRow>

            <SelectRow
                disabled
                label="Disabled row" />

            <SelectRow
                checked
                label="World peace"
                status="error"
                errorMsg="Cannot declare a war." />
        </List>
    );
}

export default BasicUsage;
