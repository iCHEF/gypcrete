import React from 'react';

import DebugBox from '../DebugBox';
import Text from '../../src/Text';

function TextDoc() {
    return (
        <div>
            <h2>&lt;Text&gt;</h2>

            <DebugBox>
                <Text basic="Basic Text" />
            </DebugBox>

            <DebugBox>
                <Text basic="Basic Text" aside="Aside Text" />
            </DebugBox>

            <DebugBox>
                <Text
                    basic="A Long Long Long Basic Text"
                    aside="Aside Text"
                    tag="Tag"
                    stateIcon={<span>O</span>} />
            </DebugBox>
        </div>
    );
}

export default TextDoc;
