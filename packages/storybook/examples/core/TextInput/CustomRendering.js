import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from '@ichef/gypcrete/src/TextInput';
import DebugBox from 'utils/DebugBox';

export default function CustomRendering() {
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
