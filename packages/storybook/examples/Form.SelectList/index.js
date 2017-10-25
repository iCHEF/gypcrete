import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SelectList from '@ichef/gypcrete-form/src/SelectList';

import SingleControlled from './SingleControlled';
import SingleUncontrolled from './SingleUncontrolled';
import MultipleUncontrolled from './MultipleUncontrolled';

storiesOf('[Form] SelectList', module)
    .add('single (uncontrolled)', withInfo()(SingleUncontrolled))
    .add('single (controlled)', withInfo()(SingleControlled))
    .add('multiple (uncontrolled)', withInfo()(MultipleUncontrolled))
    // Props table
    .addPropsTable(() => <SelectList />);
