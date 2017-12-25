import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';

import BasicUsage from './BasicUsage';
import MultipleValues from './MultipleValues';
import Customize from './Customize';

storiesOf('[Form] SelectRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    .add('multiple selection', withInfo()(MultipleValues))
    .add('customize labels', withInfo()(Customize))
    // Props table
    .addPropsTable(() => <SelectRow />);
