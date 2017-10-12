import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from '@ichef/gypcrete/src/TextInput';
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
