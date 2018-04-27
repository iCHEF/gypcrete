import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import TextInputRow from '@ichef/gypcrete-form/src/TextInputRow';

import BasicUsage from './BasicUsage';
import MultiLineUsage from './MultiLineUsage';

storiesOf('[Form] TextInputRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    .add('multi-line usage', withInfo()(MultiLineUsage))
    // Props table
    .addPropsTable(() => <TextInputRow />);
