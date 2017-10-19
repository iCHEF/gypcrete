import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import ColumnView from '@ichef/gypcrete/src/ColumnView';
import BasicUsage from './BasicUsage';

storiesOf('ColumnView', module)
    .add('basic usage',
        withInfo()(BasicUsage)
    )
    // Props table
    .addPropsTable(() => <ColumnView />);
