import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from '@ichef/gypcrete/src/TextInput';
import DebugBox from 'utils/DebugBox';

function BasicUsage() {
    return (
        <div>
            <DebugBox>
                <TextInput label="Label" onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    align="reverse"
                    label="Controlled input"
                    value="Input Value"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    label="Uncontrolled input"
                    defaultValue="Input Value"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    label="Error input"
                    defaultValue="Input Value"
                    status="error"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    readOnly
                    label="Read-only input"
                    value="Input Value" />
            </DebugBox>

            <DebugBox>
                <TextInput
                    disabled
                    label="Disabled input"
                    value="Input Value"
                    onChange={action('change')} />
            </DebugBox>
        </div>
    );
}

export default BasicUsage;
