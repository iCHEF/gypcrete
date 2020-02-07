import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput, { PureTextInput } from '@ichef/gypcrete/src/TextInput';
import DebugBox from 'utils/DebugBox';

export default {
    title: '@ichef/gypcrete|TextInput',
    component: PureTextInput,
    subcomponents: {
        'rowComp()': TextInput,
    },
};

export function BasicUsage() {
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
export function MultiLines() {
    return (
        <div>
            <DebugBox>
                <TextInput
                    multiLine
                    label="Controlled Textarea"
                    value={'Controlled input\nin multiple lines'}
                    onChange={action('change')}
                />
            </DebugBox>
        </div>
    );
}

export function CustomRendering() {
    return (
        <DebugBox>
            <TextInput
                label="Pick a color"
                defaultValue="#d94e41"
                renderInput={inputProps => (
                    <input type="color" {...inputProps} />
                )}
                onChange={action('change')}
            />
        </DebugBox>
    );
}
