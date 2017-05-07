import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import Checkbox, { PureCheckbox } from 'src/Checkbox';

import BasicCheckboxExample from './BasicCheckbox';
import CheckboxWithIndeterminateExample from './CheckboxWithIndeterminate';
import CheckboxWithStatusExample from './CheckboxWithStatus';

storiesOf('Checkbox', module)
    .addWithInfo('basic usage', BasicCheckboxExample)
    .addWithInfo(
        'indeterminate state',
        '`Check all` indeterminate state is interacting with `item 1` and `item 2`.',
        () => <CheckboxWithIndeterminateExample />
    )
    .addWithInfo('with status', CheckboxWithStatusExample)
    // Props table
    .addPropsTable(() => <Checkbox />, [PureCheckbox]);
