import React from 'react';

import TextLabel from '@ichef/gypcrete/src/TextLabel';
import Text from '@ichef/gypcrete/src/Text';
import DebugBox from '../DebugBox';

function TextLabelWithTextExample() {
    return (
        <div>
            <DebugBox>
                <TextLabel>
                    <Text basic="foo" tag="Tag" />
                </TextLabel>
            </DebugBox>

            <DebugBox>
                <TextLabel status="loading">
                    <Text basic="foo" aside="loading..." />
                </TextLabel>
            </DebugBox>
        </div>
    );
}

export default TextLabelWithTextExample;
