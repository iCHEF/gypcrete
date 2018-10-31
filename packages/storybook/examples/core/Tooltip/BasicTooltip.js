import React from 'react';

import { PureTooltip as Tooltip } from '@ichef/gypcrete/src/Tooltip';

function BasicTooltipExample() {
    return (
        <div>
            <Tooltip>tooltip</Tooltip>

            <div style={{ height: 30 }} />

            <Tooltip placement="bottom">
                placed at bottom of target
            </Tooltip>

            <div style={{ height: 30 }} />

            <Tooltip arrowStyle={{ left: '12px' }}>
                custom arrow style
            </Tooltip>
        </div>
    );
}

export default BasicTooltipExample;
