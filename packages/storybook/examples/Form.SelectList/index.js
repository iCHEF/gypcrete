import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SelectList from '@ichef/gypcrete-form/src/SelectList';

import BasicUsage from './BasicUsage';

storiesOf('[Form] SelectList', module)
    .add('basic usage', withInfo()(BasicUsage))
    // Props table
    .addPropsTable(() => <SelectList />);
