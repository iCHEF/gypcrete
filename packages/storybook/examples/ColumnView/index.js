import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import ColumnView from '@ichef/gypcrete/src/ColumnView';
import BasicUsage from './BasicUsage';

storiesOf('ColumnView', module)
    .addWithInfo('basic usage', BasicUsage)
    // Props table
    .addPropsTable(() => <ColumnView />);
