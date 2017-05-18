import React from 'react';
import { action } from '@kadira/storybook';

import EditableText from 'src/EditableText';
import DebugBox from '../DebugBox';

function BasicUsage() {
    return (
        <div>
            <DebugBox>
                <EditableText />
            </DebugBox>

            <DebugBox>
                <EditableText
                    value="Controlled input"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <EditableText
                    defaultValue="Uncontrolled input" />
            </DebugBox>
        </div>
    );
}

export default BasicUsage;
