import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import InfiniteScroll from '@ichef/gypcrete/src/InfiniteScroll';

import BasicUsageExample from './BasicUsage';
import PageAsContainerExample from './PageAsContainer';

storiesOf('InfiniteScroll', module)
    .add('basic usage',
        withInfo('placed in a fixed height container')(
            <BasicUsageExample />
        )
    )
    .add('page as scroll container',
        withInfo()(
            () => <PageAsContainerExample />
        )({ source: false })
    )
    // Props table
    .addPropsTable(
        () => <InfiniteScroll onLoadMore={null} />
    );
