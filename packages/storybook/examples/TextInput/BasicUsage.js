import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from 'src/TextInput';
import DebugBox from '../DebugBox';

function BasicUsage() {
    return (
        <div>
            <DebugBox>
                <TextInput onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    value="Controlled input"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    defaultValue="Uncontrolled input"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    readOnly
                    value="Read-only input" />
            </DebugBox>

            <DebugBox>
                <TextInput
                    disabled
                    value="Disabled input" />
            </DebugBox>
        </div>
    );
}

export default BasicUsage;
