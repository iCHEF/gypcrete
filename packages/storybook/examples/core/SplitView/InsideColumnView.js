import React from 'react';

import SplitView from '@ichef/gypcrete/src/SplitView';
import SplitViewColumn from '@ichef/gypcrete/src/SplitViewColumn';

import DebugBox from 'utils/DebugBox';
import ColoredBox from 'utils/ColoredBox';

import DemoColumnView from './DemoColumnView';

function InsideColumnView() {
    return (
        <DebugBox width="40rem" height="24rem">
            <DemoColumnView bottomPadding="0">
                <SplitView>
                    <SplitViewColumn>
                        <ColoredBox
                            width="100%"
                            height="30rem"
                            color="rgb(255, 235, 235)">
                            Narrow Column
                        </ColoredBox>
                    </SplitViewColumn>

                    <SplitViewColumn wide>
                        <ColoredBox
                            width="100%"
                            height="30rem"
                            color="rgb(235, 245, 255)">
                            Narrow Column
                        </ColoredBox>
                    </SplitViewColumn>
                </SplitView>
            </DemoColumnView>
        </DebugBox>
    );
}

export default InsideColumnView;
