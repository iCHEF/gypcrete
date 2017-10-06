import React from 'react';

import Text from 'src/Text';
import TextEllipsis from 'src/TextEllipsis';
import DebugBox from '../DebugBox';

const LONG_LABEL =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Proin at pellentesque dui. Vivamus non egestas ante. Integer a egestas dui.`;

function EllipsisExample() {
    const ellipsisLabel = <TextEllipsis>{LONG_LABEL}</TextEllipsis>;

    return (
        <div>
            <DebugBox>
                <Text
                    basic={ellipsisLabel}
                    tag="tag"
                    aside="Left-aligned" />
            </DebugBox>

            <DebugBox>
                <Text
                    align="center"
                    basic={ellipsisLabel}
                    tag="tag"
                    aside="Center-aligned" />
            </DebugBox>

            <DebugBox>
                <Text
                    align="right"
                    basic={ellipsisLabel}
                    tag="tag"
                    aside="Right-aligned" />
            </DebugBox>
        </div>
    );
}

export default EllipsisExample;
