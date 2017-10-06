import React from 'react';

import Text from '@ichef/gypcrete/src/Text';
import DebugBox from '../DebugBox';

const LONG_LABEL =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Proin at pellentesque dui. Vivamus non egestas ante. Integer a egestas dui.`;

function BasicTextExample() {
    return (
        <div>
            <DebugBox>
                <Text basic="Basic Text" />
            </DebugBox>

            <DebugBox>
                <Text
                    align="center"
                    basic="Basic Text"
                    aside="I am center-aligned" />
            </DebugBox>

            <DebugBox>
                <Text
                    align="right"
                    basic="Basic Text"
                    tag="Tag"
                    aside="I am right-aligned" />
            </DebugBox>

            <DebugBox>
                <Text
                    basic={LONG_LABEL}
                    tag="Tag"
                    aside="Multi-line basic" />
            </DebugBox>

            <DebugBox>
                <Text aside="Aside Only Text" />
            </DebugBox>
        </div>
    );
}

export default BasicTextExample;
