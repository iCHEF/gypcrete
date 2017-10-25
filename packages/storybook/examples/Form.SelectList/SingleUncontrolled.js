import React from 'react';
import { action } from '@storybook/addon-actions';

import SelectList, { Option } from '@ichef/gypcrete-form/src/SelectList';

function SingleUncontrolled() {
    return (
        <SelectList defaultValues={['1']} onChange={action('change')}>
            <Option label="Option A" value="1" />
            <Option label="Option B" value="2" />
            <Option label="Option C" value="3" />
        </SelectList>
    );
}

export default SingleUncontrolled;
