import React from 'react';

import StatusIcon from '@ichef/gypcrete/src/StatusIcon';

function BasicStatusIconExample() {
    return (
        <div>
            <StatusIcon status="loading" />

            <StatusIcon status="success" autohide={false} />

            <StatusIcon status="error" />
        </div>
    );
}

export default BasicStatusIconExample;
