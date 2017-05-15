import React from 'react';

import TextInput from 'src/TextInput';
import DebugBox from '../DebugBox';

function BasicUsage() {
    return (
        <div>
            <DebugBox>
                <TextInput />
            </DebugBox>

            <DebugBox>
                <TextInput value="Controlled input" />
            </DebugBox>

            <DebugBox>
                <TextInput defaultValue="Uncontrolled input" />
            </DebugBox>
        </div>
    );
}

export default BasicUsage;
