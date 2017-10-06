import React from 'react';
import { storiesOf } from '@storybook/react';

import Switch, { PureSwitch } from '@ichef/gypcrete/src/Switch';

import BasicUsage from './BasicUsage';
import ControlledInput from './ControlledInput';
import WithStatus from './WithStatus';
import InputProps from './InputProps';

storiesOf('Switch', module)
    .addWithInfo(
        'Basic usage',
        `A <Switch> is a row component which can be turned either on
         or off, with its underlying <input type=checkbox>.`,
        BasicUsage
    )
    .addWithInfo('Controlled input', ControlledInput)
    .addWithInfo('With status', WithStatus)
    .addWithInfo(
        '<input> props',
        `Pass additional props to the underlying <input type="checkbox">
         via the 'input' prop.`,
         InputProps
    )
    // Props table
    .addPropsTable(() => <Switch />, [PureSwitch]);
