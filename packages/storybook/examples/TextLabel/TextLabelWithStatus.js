import React from 'react';

import TextLabel from '@ichef/gypcrete/src/TextLabel';
import DebugBox from '../DebugBox';

function TextLabelWithStatusExample() {
    return (
        <div>
            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Loading"
                    tag="Tag"
                    aside="Center align"
                    align="center"
                    status="loading" />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Success"
                    tag="Tag"
                    aside="Reverse align"
                    align="reverse"
                    status="success"
                    statusOptions={{ autohide: false }} />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Error"
                    tag="Tag"
                    aside="Left align"
                    status="error"
                    errorMsg="Save failed" />
            </DebugBox>
        </div>
    );
}

export default TextLabelWithStatusExample;
