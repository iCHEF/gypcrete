import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import TextInput from '@ichef/gypcrete-form/src/TextInput';

import BasicUsage from './BasicUsage';

storiesOf('[Form] TextInput', module)
    .addWithInfo('basic usage', BasicUsage)
    // Props table
    .addPropsTable(() => <TextInput />);
