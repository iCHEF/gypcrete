import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from 'src/TextInput';
import DebugBox from '../DebugBox';

function BasicUsage() {
    return (
        <div>
            <DebugBox>
                <TextInput />
            </DebugBox>

            <DebugBox>
                <TextInput
                    value="Controlled input"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput defaultValue="Uncontrolled input" />
            </DebugBox>
        </div>
    );
}

export default BasicUsage;
