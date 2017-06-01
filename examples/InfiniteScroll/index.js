import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import InfiniteScroll from 'src/InfiniteScroll';

import BasicUsageExample from './BasicUsage';
import PageAsContainerExample from './PageAsContainer';

storiesOf('InfiniteScroll', module)
    .addWithInfo(
        'basic usage',
        'placed in a fixed height container',
        () => <BasicUsageExample />,
    )
    .addWithInfo('page as scroll container',
        () => <PageAsContainerExample />,
        { source: false }
    )
    // Props table
    .addPropsTable(
        () => <InfiniteScroll onLoadMore={null} />
    );
