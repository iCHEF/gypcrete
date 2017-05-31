import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import Tooltip from 'src/Tooltip';

import BasicTooltipExample from './BasicTooltip';
import TooltipBottomPlacementExample from './TooltipBottomPlacement';
import TooltipCustomArrowStyleExample from './TooltipCustomArrowStyle';

storiesOf('Tooltip', module)
    .addWithInfo('basic usage', BasicTooltipExample)
    .addWithInfo('bottom placement', TooltipBottomPlacementExample)
    .addWithInfo('custom arrow style', TooltipCustomArrowStyleExample)
    // Props table
    .addPropsTable(() => <Tooltip />);
