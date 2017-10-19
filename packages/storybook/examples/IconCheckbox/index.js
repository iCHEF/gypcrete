import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import IconCheckbox from '@ichef/gypcrete/src/IconCheckbox';

import BasicIconCheckboxExample from './BasicIconCheckbox';
import IconCheckboxWithStatusExample from './IconCheckboxWithStatus';

storiesOf('IconCheckbox', module)
    .add('basic usage',
        withInfo('IconCheckbox is a variant of `<Checkbox>`')(
            BasicIconCheckboxExample
        )
    )
    .add('with status',
        withInfo()(IconCheckboxWithStatusExample)
    )
    // Props table
    .addPropsTable(
        () => <IconCheckbox />,
        'check `<Checkbox>` props table for more available props.'
    );
