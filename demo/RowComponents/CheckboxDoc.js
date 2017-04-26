import React from 'react';

import Checkbox from 'src/Checkbox';
import DebugBox from '../DebugBox';

function CheckboxDoc() {
    return (
        <div>
            <h2>&lt;Checkbox&gt;</h2>

            <DebugBox>
                <Checkbox basic="Count me in" />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    defaultChecked
                    basic="Join pilot program"
                    aside="Secondary helps"
                    tag="New" />
            </DebugBox>

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

            <DebugBox>
                <Checkbox
                    disabled
                    basic="Join pilot program"
                    aside="Secondary helps"
                    tag="New" />
            </DebugBox>
        </div>
    );
}

export default CheckboxDoc;
