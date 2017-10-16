import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';

import BasicUsage from './BasicUsage';

storiesOf('[Form] SelectRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    // Props table
    .addPropsTable(() => <SelectRow />);
