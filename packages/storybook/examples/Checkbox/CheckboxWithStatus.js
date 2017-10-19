import React from 'react';

import Checkbox from '@ichef/gypcrete/src/Checkbox';
import DebugBox from 'utils/DebugBox';

function CheckboxWithStatusExample() {
    return (
        <div>
            <DebugBox>
                <Checkbox
                    indeterminate
                    align="center"
                    basic="Count me in"
                    status="loading" />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    defaultChecked
                    align="reverse"
                    basic="Count me in"
                    status="success"
                    statusOptions={{ autohide: false }} />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    basic="Count me in"
                    status="error"
                    errorMsg="Unauthorized" />
            </DebugBox>
        </div>
    );
}

export default CheckboxWithStatusExample;
