import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Tooltip from '@ichef/gypcrete/src/Tooltip';

import BasicTooltipExample from './BasicTooltip';
import TooltipBottomPlacementExample from './TooltipBottomPlacement';
import TooltipCustomArrowStyleExample from './TooltipCustomArrowStyle';

storiesOf('Tooltip', module)
    .add('basic usage',
        withInfo()(BasicTooltipExample)
    )
    .add('bottom placement',
        withInfo()(TooltipBottomPlacementExample)
    )
    .add('custom arrow style',
        withInfo()(TooltipCustomArrowStyleExample)
    )
    // Props table
    .addPropsTable(() => <Tooltip />);
