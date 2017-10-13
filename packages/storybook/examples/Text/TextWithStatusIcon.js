import React from 'react';

import Text from '@ichef/gypcrete/src/Text';
import StatusIcon from '@ichef/gypcrete/src/StatusIcon';

import DebugBox from 'utils/DebugBox';

function TextWithStatusIconExample() {
    return (
        <div>
            <DebugBox>
                <Text
                    basic="A Long Long Long Basic Text"
                    aside="I am left-aligned"
                    tag="Tag"
                    statusIcon={<StatusIcon status="loading" />} />
            </DebugBox>

            <DebugBox>
                <Text
                    align="center"
                    basic="Basic Text"
                    aside="I am center-aligned"
                    tag="Tag"
                    statusIcon={<StatusIcon status="success" autohide={false} />} />
            </DebugBox>

            <DebugBox>
                <Text
                    align="right"
                    basic="A Long Long Long Basic Text"
                    aside="I am right-aligned"
                    tag="Tag"
                    statusIcon={<StatusIcon status="error" />} />
            </DebugBox>
        </div>
    );
}

export default TextWithStatusIconExample;
