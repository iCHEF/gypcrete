import React from 'react';

import List from '@ichef/gypcrete/src/List';
import { PureSwitch } from '@ichef/gypcrete/src/Switch';
import SwitchRow, { PureSwitchRow } from '@ichef/gypcrete-form/src/SwitchRow';

export default {
    title: '@ichef/gypcrete-form|SwitchRow',
    component: PureSwitchRow,
    subcomponents: {
        'formRow()': SwitchRow,
        Switch: PureSwitch,
    },
};

export const basicUsage = () => (
    <List>
        <SwitchRow label="Switch row label" />
    </List>
);

export const controlledInput = () => (
    <List>
        <SwitchRow label="Switch row label" checked />
    </List>
);
controlledInput.story = {
    parameters: {
        docs: {
            storyDescription: 'In this example the input value is controlled via `checked={true}`.',
        },
    },
};

export const disabledRow = () => (
    <List>
        <SwitchRow disabled label="Disabled row" />
    </List>
);

export const customizedValueLabel = () => (
    <List>
        <SwitchRow
            label="Customized value label"
            asideOn="The switch is ON"
            asideOff="The switch is OFF"
        />
    </List>
);

export const errorState = () => (
    <List>
        <SwitchRow
            checked
            label="Go war?"
            asideOn="There will be war"
            asideOff="There will be peace"
            status="error"
            errorMsg="Cannot declare a war."
        />
    </List>
);
