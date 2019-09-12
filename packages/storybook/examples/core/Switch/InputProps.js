import React from 'react';
import Switch from '@ichef/gypcrete/src/Switch';
import DebugBox from 'utils/DebugBox';

function InputProps() {
    return (
        <div>
            <DebugBox>
                <Switch
                    input={{
                        id: 'dom-id',
                        title: 'Tooltip for <input>',
                        'data-prop': true,
                    }}
                />
            </DebugBox>
        </div>
    );
}

export default InputProps;
