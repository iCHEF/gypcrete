import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

import NormalList from './NormalList';
import SettingList from './SettingList';
import NestedList from './NestedList';

storiesOf('List', module)
    .add('Normal list',
        withInfo()(NormalList)
    )
    .add('Setting list',
        withInfo()(SettingList)
    )
    .add('Nested list', withInfo()(NestedList))
    // Props table
    .addPropsTable(() => <List />, [ListRow]);
