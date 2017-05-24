import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import TextInput, { PureTextInput } from 'src/TextInput';

import BasicUsage from './BasicUsage';
import WithStatus from './WithStatus';

storiesOf('TextInput', module)
    .addWithInfo('Basic usage', BasicUsage)
    .addWithInfo('With status', WithStatus)
    // Props table
    .addPropsTable(() => <TextInput />, [PureTextInput]);
