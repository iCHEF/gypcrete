import React from 'react';

import Text from 'src/Text';
import DebugBox from '../DebugBox';

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
                    basic="A Long Long Long Basic Text"
                    aside="I am right-aligned"
                    tag="Tag" />
            </DebugBox>
        </div>
    );
}

export default BasicTextExample;
