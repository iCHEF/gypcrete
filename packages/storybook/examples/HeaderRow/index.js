import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import HeaderRow from 'src/HeaderRow';

import BasicUsage from './BasicUsage';

storiesOf('HeaderRow', module)
    .addWithInfo('Basic usage', BasicUsage)
    // Props table
    .addPropsTable(() => <HeaderRow />);
