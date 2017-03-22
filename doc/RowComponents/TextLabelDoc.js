import React from 'react';
import TextLabel from 'src/TextLabel';
import DebugBox from '../DebugBox';

function TextLabelDoc() {
    return (
        <div>
            <h2>&lt;TextLabel&gt;</h2>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Basic text"
                    tag="Tag"
                    aside="Aside text" />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    basic="Basic text"
                    tag="Tag"
                    aside="Aside text"
                    align="center" />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Basic text"
                    tag="Tag"
                    aside="Aside text"
                    align="center"
                    status="loading" />
            </DebugBox>

            <DebugBox>
                <TextLabel
                    icon="printer"
                    basic="Basic text"
                    tag="Tag"
                    aside="Aside text"
                    align="right"
                    status="loading" />
            </DebugBox>

            <DebugBox>
                <TextLabel>
                    foo
                </TextLabel>
            </DebugBox>
        </div>
    );
}

export default TextLabelDoc;
