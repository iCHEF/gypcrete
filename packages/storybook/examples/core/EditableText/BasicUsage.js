import React from 'react';
import { action } from '@storybook/addon-actions';

import EditableText from '@ichef/gypcrete/src/EditableText';
import DebugBox from 'utils/DebugBox';

function BasicUsage() {
    return (
        <div>
            <DebugBox>
                <EditableText onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <EditableText
                    value="Controlled input"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <EditableText
                    defaultValue="Uncontrolled input"
                    onChange={action('change')} />
            </DebugBox>
        </div>
    );
}

export default BasicUsage;
