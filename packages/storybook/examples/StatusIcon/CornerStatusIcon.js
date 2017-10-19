import React from 'react';

import StatusIcon from '@ichef/gypcrete/src/StatusIcon';
import DebugBox from 'utils/DebugBox';

function CornerStatusIconExample() {
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

export default CornerStatusIconExample;
