import React from 'react';

import DebugBox from '../DebugBox';
import Text from '../../src/Text';

function TextDoc() {
    return (
        <div>
            <h2>&lt;Text&gt;</h2>

            <DebugBox>
                <Text basic="Basic Text" aside="Aside Text" />
            </DebugBox>

            <DebugBox>
                <Text
                    basic="A Long Long Long Basic Text"
                    aside="I am left-aligned"
                    tag="Tag"
                    stateIcon={<span>O</span>} />
            </DebugBox>

            <DebugBox>
                <Text
                    align="center"
                    basic="Basic Text"
                    aside="I am center-aligned"
                    tag="Tag"
                    stateIcon={<span>O</span>} />
            </DebugBox>

            <DebugBox>
                <Text
                    align="right"
                    basic="A Long Long Long Basic Text"
                    aside="I am right-aligned"
                    tag="Tag"
                    stateIcon={<span>O</span>} />
            </DebugBox>
        </div>
    );
}

export default TextDoc;
