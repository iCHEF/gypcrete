import React from 'react';

import StatusIcon from '@ichef/gypcrete/src/StatusIcon';
import DebugBox from 'utils/DebugBox';

export default {
    title: '@ichef/gypcrete|StatusIcon',
    component: StatusIcon,
};

export function BasicStatusIcon() {
    return (
        <div>
            <StatusIcon status="loading" />
            <StatusIcon status="success" autohide={false} />
            <StatusIcon status="error" />
        </div>
    );
}

export function StatusIconInCorner() {
    return (
        <div>
            <DebugBox width={32} height={32}>
                <StatusIcon status="loading" position="corner" />
            </DebugBox>
            <DebugBox width={32} height={32}>
                <StatusIcon status="success" position="corner" autohide={false} />
            </DebugBox>
            <DebugBox width={32} height={32}>
                <StatusIcon status="error" position="corner" />
            </DebugBox>
        </div>
    );
}
