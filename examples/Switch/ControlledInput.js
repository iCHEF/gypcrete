import React from 'react';
import Switch from 'src/Switch';
import DebugBox from '../DebugBox';

function ControlledInput() {
    return (
        <div>
            <DebugBox>
                <Switch basic="Uncontrolled" />
            </DebugBox>

            <DebugBox>
                <Switch
                    defaultTurnedOn
                    basic="Uncontrolled"
                    aside="with defaults" />
            </DebugBox>
            <DebugBox>
                <Switch
                    turnedOn
                    basic="Controlled"
                    onChange={() => {}} />
            </DebugBox>
        </div>
    );
}

export default ControlledInput;
