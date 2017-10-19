import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import HeaderRow from '@ichef/gypcrete/src/HeaderRow';

import BasicUsage from './BasicUsage';

storiesOf('HeaderRow', module)
    .add('Basic usage',
        withInfo()(BasicUsage)
    )
    // Props table
    .addPropsTable(() => <HeaderRow />);
