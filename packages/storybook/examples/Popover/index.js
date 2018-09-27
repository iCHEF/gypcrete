import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Popover, { PurePopover } from '@ichef/gypcrete/src/Popover';

import BasicExample from './Basic';
import AnchoredExample from './Anchored';

import getPropTables from '../../utils/getPropTables';

storiesOf('Popover', module)
    .add('basic usage', withInfo()(BasicExample))
    .add(
        'anchored popover',
        withInfo('placed to a specified DOM element')(
            () => <AnchoredExample />
        )
    )
    // Props table
    .add('props', getPropTables([PurePopover, Popover]));
