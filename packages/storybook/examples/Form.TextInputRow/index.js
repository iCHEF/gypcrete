import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import TextInputRow from '@ichef/gypcrete-form/src/TextInputRow';

import BasicUsage from './BasicUsage';

storiesOf('[Form] TextInputRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    // Props table
    .addPropsTable(() => <TextInputRow />);
