import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import TextInput, { PureTextInput } from 'src/TextInput';

import BasicUsage from './BasicUsage';
import WithStatus from './WithStatus';
import MultiLines from './MultiLines';

storiesOf('TextInput', module)
    .addWithInfo('Basic usage', BasicUsage)
    .addWithInfo('With status', WithStatus)
    .addWithInfo('Multiple lines', MultiLines)
    // Props table
    .addPropsTable(() => <TextInput />, [PureTextInput]);
