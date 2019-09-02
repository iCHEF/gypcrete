import React from 'react';

import SplitView from '@ichef/gypcrete/src/SplitView';
import SplitViewColumn from '@ichef/gypcrete/src/SplitViewColumn';

import ColoredBox from 'utils/ColoredBox';

import DemoColumnView from './DemoColumnView';

function ContainsColumnView() {
    return (
        <SplitView>
            <SplitViewColumn>
                <DemoColumnView>
                    <ColoredBox
                        width="100%"
                        height="30rem"
                        color="rgb(255, 235, 235)">
                        Narrow Column
                    </ColoredBox>
                </DemoColumnView>
            </SplitViewColumn>

            <SplitViewColumn wide>
                <DemoColumnView>
                    <ColoredBox
                        width="100%"
                        height="30rem"
                        color="rgb(235, 245, 255)">
                        Narrow Column
                    </ColoredBox>
                </DemoColumnView>
            </SplitViewColumn>
        </SplitView>
    );
}

export default ContainsColumnView;
