import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Tooltip, { PureTooltip } from '@ichef/gypcrete/src/Tooltip';

import BasicTooltipExample from './BasicTooltip';
import AnchoredTooltipExample from './AnchoredTooltip';

import getPropTables from '../../utils/getPropTables';

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
    .add('props', getPropTables([PureTooltip, Tooltip]));
