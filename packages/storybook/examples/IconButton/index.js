import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import IconButton from '@ichef/gypcrete/src/IconButton';

import BasicIconButtonExample from './BasicIconButton';
import IconButtonWithStatusExample from './IconButtonWithStatus';

storiesOf('IconButton', module)
    .add('basic usage',
        withInfo('IconButton is a variant of `<Button>`.')(
            BasicIconButtonExample
        )
    )
    .add('with status',
        withInfo()(IconButtonWithStatusExample)
    )
    // Props table
    .addPropsTable(
        () => <IconButton icon="null" />,
        'check `<Button>` props table for more available props.'
    );
