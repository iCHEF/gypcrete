import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BasicIconButtonExample from './BasicIconButton';
import IconButtonWithStatusExample from './IconButtonWithStatus';

storiesOf('IconButton', module)
    .addWithInfo(
        'basic usage',
        'TODO: fix button color',
        () => <BasicIconButtonExample />
    )
    .addWithInfo('with status', () => <IconButtonWithStatusExample />);
