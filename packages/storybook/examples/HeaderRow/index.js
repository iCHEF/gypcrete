import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import HeaderRow from '@ichef/gypcrete/src/HeaderRow';

import BasicUsage from './BasicUsage';

storiesOf('HeaderRow', module)
    .addWithInfo('Basic usage', BasicUsage)
    // Props table
    .addPropsTable(() => <HeaderRow />);
