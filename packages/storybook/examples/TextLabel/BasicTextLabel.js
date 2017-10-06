import React from 'react';

import TextLabel from 'src/TextLabel';
import DebugBox from '../DebugBox';

function BasicTextLabelExample() {
    return (
        <div>
            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Basic text"
                    tag="Tag"
                    aside="left align (default)" />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Basic text"
                    tag="Tag"
                    aside="center align"
                    align="center" />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Basic text"
                    tag="Tag"
                    aside="right align"
                    align="right" />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Basic text"
                    tag="Tag"
                    aside="reverse align"
                    align="reverse" />
            </DebugBox>
        </div>
    );
}

export default BasicTextLabelExample;
