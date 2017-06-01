import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import InfiniteScroll from 'src/InfiniteScroll';

import BasicUsageExample from './BasicUsage';
import WindowAsScrollContainerExample from './WindowAsScrollContainer';

storiesOf('InfiniteScroll', module)
    .addWithInfo(
        'basic usage',
        'placed in a fixed height container',
        () => <BasicUsageExample />,
    )
    .addWithInfo('window as scroll container',
        () => <WindowAsScrollContainerExample />,
        { source: false }
    )
    // Props table
    .addPropsTable(
        () => <InfiniteScroll onLoadMore={null} />
    );
