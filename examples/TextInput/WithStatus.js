import React from 'react';
import { action } from '@kadira/storybook';

import TextInput from 'src/TextInput';
import DebugBox from '../DebugBox';

function WithStatus() {
    return (
        <div>
            <DebugBox>
                <TextInput status="loading" />
            </DebugBox>

            <DebugBox>
                <TextInput
                    defaultValue="Living room TV"
                    status="success"
                    statusOptions={{ autohide: false }} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    value="Kitchen Printer"
                    status="error"
                    errorMsg="Network failure"
                    onChange={action('change')} />
            </DebugBox>
        </div>
    );
}

export default WithStatus;
