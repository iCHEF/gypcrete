import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SelectList from '@ichef/gypcrete-form/src/SelectList';

import SingleControlled from './SingleControlled';
import SingleUncontrolled from './SingleUncontrolled';

storiesOf('[Form] SelectList', module)
    .add('single (uncontrolled)', withInfo()(SingleUncontrolled))
    .add('single (controlled)', withInfo()(SingleControlled))
    // Props table
    .addPropsTable(() => <SelectList />);
