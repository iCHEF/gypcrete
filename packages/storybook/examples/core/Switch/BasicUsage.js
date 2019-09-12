import React from 'react';
import Switch from '@ichef/gypcrete/src/Switch';
import DebugBox from 'utils/DebugBox';

function BasicUsage() {
    return (
        <div>
            <DebugBox>
                <Switch />
            </DebugBox>

            <DebugBox>
                <Switch
                    basic="Switch with basic"
                    aside="Rare usage"
                />
            </DebugBox>

            <DebugBox>
                <Switch disabled />
            </DebugBox>
        </div>
    );
}

export default BasicUsage;
