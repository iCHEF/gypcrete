import React from 'react';

import SelectList, { Option } from '@ichef/gypcrete-form/src/SelectList';

function BasicUsage() {
    return (
        <SelectList values={['1']}>
            <Option label="Option A" value="1" readOnly />
            <Option label="Option B" value="2" />
            <Option label="Option C" value="3" />
        </SelectList>
    );
}

export default BasicUsage;
