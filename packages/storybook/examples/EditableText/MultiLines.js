import React from 'react';
import { action } from '@storybook/addon-actions';

import EditableText from '@ichef/gypcrete/src/EditableText';
import DebugBox from 'utils/DebugBox';

function MultiLines() {
    return (
        <div>
            <DebugBox>
                <EditableText
                    inputTag="textarea"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <EditableText
                    inputTag="textarea"
                    value={'Controlled input\nin multiple lines'}
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <EditableText
                    inputTag="textarea"
                    defaultValue={'Unontrolled input\nin multiple lines'}
                    onChange={action('change')} />
            </DebugBox>
        </div>
    );
}

export default MultiLines;
