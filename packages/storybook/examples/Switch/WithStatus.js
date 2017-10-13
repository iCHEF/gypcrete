import React from 'react';
import Switch from '@ichef/gypcrete/src/Switch';
import DebugBox from 'utils/DebugBox';

function WithStatus() {
    return (
        <div>
            <DebugBox>
                <Switch
                    turnedOn
                    status="loading"
                    onChange={() => {}} />
            </DebugBox>

            <DebugBox>
                <Switch
                    turnedOn
                    status="success"
                    statusOptions={{ autohide: false }}
                    onChange={() => {}} />
            </DebugBox>

            <DebugBox>
                <Switch
                    turnedOn={false}
                    status="error"
                    errorMsg="Network error"
                    onChange={() => {}} />
            </DebugBox>
        </div>
    );
}

export default WithStatus;
