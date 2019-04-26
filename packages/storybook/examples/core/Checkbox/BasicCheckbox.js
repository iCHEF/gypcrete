import React from 'react';

import Checkbox from '@ichef/gypcrete/src/Checkbox';
import Avatar from '@ichef/gypcrete/src/Avatar';
import DebugBox from 'utils/DebugBox';

function BasicCheckboxExample() {
    const rdAvatar = <Avatar type="square" alt="Avatar of RD" src="https://api.adorable.io/avatars/285/rd@ichef.tw" />;

    return (
        <div>
            <DebugBox>
                <Checkbox basic="Count me in" />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    defaultChecked
                    basic="Join pilot program"
                    aside="Secondary helps"
                    tag="New" />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    defaultChecked
                    basic="Join pilot program"
                    avatar={rdAvatar} />
            </DebugBox>

            <DebugBox>
                <Checkbox
                    defaultChecked
                    basic="Turn the light"
                    aside="center align"
                    align="center" />
            </DebugBox>
        </div>
    );
}

export default BasicCheckboxExample;
