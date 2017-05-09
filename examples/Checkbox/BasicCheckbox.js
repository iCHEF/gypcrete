import React from 'react';

import Checkbox from 'src/Checkbox';
import DebugBox from '../DebugBox';

function BasicCheckboxExample() {
    return (
        <div>
            <DebugBox>
                <Checkbox basic="Count me in" />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    defaultChecked
                    basic="Join pilot program"
                    aside="Secondary helps"
                    tag="New" />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    defaultChecked
                    basic="Turn the light"
                    aside="center align"
                    align="center" />
            </DebugBox>
        </div>
    );
}

export default BasicCheckboxExample;
