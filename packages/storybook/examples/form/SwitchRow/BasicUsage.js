import React from 'react';

import List from '@ichef/gypcrete/src/List';
import SwitchRow from '@ichef/gypcrete-form/src/SwitchRow';

const DESC = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nunc risus risus, gravida in nisl ac, iaculis aliquam dui.
    Nunc dictum ipsum eu sapien lacinia, eu finibus nibh vestibulum.
`;

function BasicUsage() {
    return (
        <List title="Switch rows">
            <SwitchRow
                label="Module default state on iPad"
                asideOn="Turned on by default"
                asideOff="Turned off by default"
                desc={DESC}
            />

            <SwitchRow
                disabled
                label="Disabled row"
            />

            <SwitchRow
                checked
                label="World peace"
                asideOn="There will be peace"
                asideOff="There will be war"
                status="error"
                errorMsg="Cannot declare a war."
            />
        </List>
    );
}

export default BasicUsage;
