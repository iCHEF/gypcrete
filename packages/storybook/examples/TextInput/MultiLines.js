import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from 'src/TextInput';
import DebugBox from '../DebugBox';

function MultiLines() {
    return (
        <div>
            <DebugBox>
                <TextInput
                    inputTag="textarea"
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    inputTag="textarea"
                    value={'Controlled input\nin multiple lines'}
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    inputTag="textarea"
                    defaultValue={'Uncontrolled input\nin multiple lines'}
                    onChange={action('change')} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    readOnly
                    inputTag="textarea"
                    value={'Read-only input\nin multiple lines'} />
            </DebugBox>

            <DebugBox>
                <TextInput
                    disabled
                    inputTag="textarea"
                    value={'Disabled input\nin multiple lines'} />
            </DebugBox>
        </div>
    );
}

export default MultiLines;
