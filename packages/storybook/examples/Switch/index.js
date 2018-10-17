import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Switch, { PureSwitch } from '@ichef/gypcrete/src/Switch';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import ControlledInput from './ControlledInput';
import WithStatus from './WithStatus';
import InputProps from './InputProps';

storiesOf('Switch', module)
    .add('Basic usage',
        withInfo(
            `A <Switch> is a row component which can be turned either on
            or off, with its underlying <input type=checkbox>.`
        )(BasicUsage)
    )
    .add('Controlled input',
        withInfo()(ControlledInput)
    )
    .add('With status',
        withInfo()(WithStatus)
    )
    .add('<input> props',
        withInfo(
            `Pass additional props to the underlying <input type="checkbox">
            via the 'input' prop.`
        )(InputProps)
    )
    // Props table
    .add('props', getPropTables([PureSwitch, Switch]));
