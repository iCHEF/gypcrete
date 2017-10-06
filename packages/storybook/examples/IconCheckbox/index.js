import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import IconCheckbox from '@ichef/gypcrete/src/IconCheckbox';

import BasicIconCheckboxExample from './BasicIconCheckbox';
import IconCheckboxWithStatusExample from './IconCheckboxWithStatus';

storiesOf('IconCheckbox', module)
    .addWithInfo(
        'basic usage',
        'IconCheckbox is a variant of `<Checkbox>`',
        BasicIconCheckboxExample
    )
    .addWithInfo('with status', IconCheckboxWithStatusExample)
    // Props table
    .addPropsTable(
        () => <IconCheckbox />,
        'check `<Checkbox>` props table for more available props.'
    );
