import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import InfiniteScroll from '@ichef/gypcrete/src/InfiniteScroll';

import BasicUsageExample from './BasicUsage';
import PageAsContainerExample from './PageAsContainer';

import getPropTables from '../../utils/getPropTables';

storiesOf('InfiniteScroll')
    .add('basic usage',
        withInfo('placed in a fixed height container')(
            () => <BasicUsageExample />
        )
    )
    .add('page as scroll container',
        withInfo({ inline: false })(
            () => <PageAsContainerExample />
        )
    )
    // Props table
    .add('props', getPropTables([InfiniteScroll]));
