import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from '@ichef/gypcrete/src/TextInput';
import DebugBox from 'utils/DebugBox';

function MultiLines() {
    return (
        <div>
            <DebugBox>
                <TextInput
                    multiLine
                    label="Empty Textarea"
                    onChange={action('change')}
                />
            </DebugBox>

            <DebugBox>
                <TextInput
                    multiLine
                    label="Controlled Textarea"
                    value={'Controlled input\nin multiple lines'}
                    onChange={action('change')}
                />
            </DebugBox>

            <DebugBox>
                <TextInput
                    multiLine
                    label="Uncontrolled Textarea"
                    defaultValue={'Uncontrolled input\nin multiple lines'}
                    onChange={action('change')}
                />
            </DebugBox>

            <DebugBox>
                <TextInput
                    multiLine
                    readOnly
                    label="Read-only Textarea"
                    value={'Read-only input\nin multiple lines'}
                />
            </DebugBox>

            <DebugBox>
                <TextInput
                    multiLine
                    disabled
                    label="Disabled Textarea"
                    value={'Disabled input\nin multiple lines'}
                    onChange={action('change')}
                />
            </DebugBox>
        </div>
    );
}

export default MultiLines;
