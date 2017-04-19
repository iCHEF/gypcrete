import React from 'react';

import SearchInput from 'src/SearchInput';
import DebugBox from '../DebugBox';

function SearchInputDoc() {
    return (
        <div>
            <h2>&lt;SeachInput&gt;</h2>

            <DebugBox>
                <SearchInput />
            </DebugBox>

            <DebugBox>
                <SearchInput defaultValue="Monkey King" />
            </DebugBox>
        </div>
    );
}

export default SearchInputDoc;
