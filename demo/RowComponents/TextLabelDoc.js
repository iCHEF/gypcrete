import React from 'react';
import Text from 'src/Text';
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
                    status="success"
                    statusOptions={{ autohide: false }} />
            </DebugBox>

            <DebugBox>
                <TextLabel status="error">
                    <Text basic="foo" />
                </TextLabel>
            </DebugBox>
        </div>
    );
}

export default TextLabelDoc;
