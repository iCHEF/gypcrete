import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import TextInput from '@ichef/gypcrete-form/src/TextInput';

import BasicUsage from './BasicUsage';

storiesOf('[Form] TextInput', module)
    .add('basic usage',
        withInfo()(BasicUsage)
    )
    // Props table
    .addPropsTable(() => <TextInput />);
