import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Tooltip, { PureTooltip } from '@ichef/gypcrete/src/Tooltip';
import getPropTables from 'utils/getPropTables';

import BasicTooltipExample from './BasicTooltip';
import AnchoredTooltipExample from './AnchoredTooltip';

storiesOf('@ichef/gypcrete|Tooltip', module)
    .add('basic usage', withInfo()(BasicTooltipExample))
    .add(
        'anchored popover',
        withInfo('placed to a specified DOM element')(
            () => <AnchoredTooltipExample />
        )
    )
    // Props table
    .add('props', getPropTables([PureTooltip, Tooltip]));
