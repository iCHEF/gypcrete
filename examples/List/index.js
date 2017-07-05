import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import List from 'src/List';
import ListRow from 'src/ListRow';

import NormalList from './NormalList';
import SettingList from './SettingList';

storiesOf('List', module)
    .addWithInfo('Normal list', NormalList)
    .addWithInfo('Setting list', SettingList)
    // Props table
    .addPropsTable(() => <List />, [ListRow]);
