import React from 'react';

import SearchInput from 'src/SearchInput';
import DebugBox from '../DebugBox';

function BasicSearchInputExample() {
    return (
        <div>
            <DebugBox>
                <SearchInput />
            </DebugBox>

            <DebugBox>
                <SearchInput defaultValue="Monkey King" />
            </DebugBox>

            <DebugBox>
                <SearchInput defaultValue="Monkey King" status="loading" />
            </DebugBox>
        </div>
    );
}

export default BasicSearchInputExample;
