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
                    basic="Join pilot program"
                    aside="Secondary helps"
                    tag="New" />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    basic="Count me in"
                    status="loading" />
            </DebugBox>

            <DebugBox>
                <Checkbox
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

export default CheckboxDoc;
