import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SelectList from '@ichef/gypcrete-form/src/SelectList';

import SingleControlled from './SingleControlled';
import SingleUncontrolled from './SingleUncontrolled';
import MultipleUncontrolled from './MultipleUncontrolled';
import MultipleControlled from './MultipleControlled';
import MultipleReadOnlyOption from './MultipleReadOnlyOption';
import MultipleMinCheck from './MultipleMinCheck';

storiesOf('[Form] SelectList', module)
    .add('single (uncontrolled)', withInfo()(SingleUncontrolled))
    .add('single (controlled)', withInfo()(SingleControlled))
    .add('multiple (uncontrolled)', withInfo()(MultipleUncontrolled))
    .add('multiple (controlled)', withInfo()(MultipleControlled))
    .add('with read-only options', withInfo()(MultipleReadOnlyOption))
    .add('has minimum checks', withInfo()(MultipleMinCheck))
    // Props table
    .addPropsTable(() => <SelectList />);
