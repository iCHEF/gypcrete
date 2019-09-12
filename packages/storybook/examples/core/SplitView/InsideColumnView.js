import React from 'react';

import SplitView from '@ichef/gypcrete/src/SplitView';
import SplitViewColumn from '@ichef/gypcrete/src/SplitViewColumn';

import ColoredBox from 'utils/ColoredBox';

import DemoColumnView from './DemoColumnView';

function InsideColumnView() {
    return (
        <DemoColumnView bodyPadding={{ bottom: 0 }}>
            <SplitView>
                <SplitViewColumn>
                    <ColoredBox
                        width="100%"
                        height="30rem"
                        color="rgb(255, 235, 235)"
                    >
                        Narrow Column
                    </ColoredBox>
                </SplitViewColumn>

                <SplitViewColumn wide>
                    <ColoredBox
                        width="100%"
                        height="30rem"
                        color="rgb(235, 245, 255)"
                    >
                        Narrow Column
                    </ColoredBox>
                </SplitViewColumn>
            </SplitView>
        </DemoColumnView>
    );
}

export default InsideColumnView;
