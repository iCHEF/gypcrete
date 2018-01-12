import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Tooltip, { PureTooltip } from '@ichef/gypcrete/src/Tooltip';

import BasicTooltipExample from './BasicTooltip';
import AnchoredTooltipExample from './AnchoredTooltip';

storiesOf('Tooltip', module)
    .add('basic usage',
        withInfo()(BasicTooltipExample)
    )
    .add(
        'anchored popover',
        withInfo('placed to a specified DOM element')(
            () => <AnchoredTooltipExample />
        )
    )
    // Props table
    .addPropsTable(() => <Tooltip />, [PureTooltip]);
