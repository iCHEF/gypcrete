import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import TextInput, { PureTextInput } from '@ichef/gypcrete/src/TextInput';

import BasicUsage from './BasicUsage';
import WithStatus from './WithStatus';
import MultiLines from './MultiLines';

import getPropTables from '../../utils/getPropTables';

storiesOf('TextInput', module)
    .add('Basic usage',
        withInfo()(BasicUsage)
    )
    .add('With status',
        withInfo()(WithStatus)
    )
    .add('Multiple lines',
        withInfo()(MultiLines)
    )
    // Props table
    .add('props', getPropTables([PureTextInput, TextInput]));
