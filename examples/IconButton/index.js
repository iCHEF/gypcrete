import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import IconButton from 'src/IconButton';

import BasicIconButtonExample from './BasicIconButton';
import IconButtonWithStatusExample from './IconButtonWithStatus';

storiesOf('IconButton', module)
    .addWithInfo(
        'basic usage',
        'IconButton is a variant of `<Button>`.',
        BasicIconButtonExample
    )
    .addWithInfo('with status', IconButtonWithStatusExample)
    // Props table
    .addPropsTable(
        () => <IconButton icon="null" />,
        'check `<Button>` props table for more available props.'
    );
