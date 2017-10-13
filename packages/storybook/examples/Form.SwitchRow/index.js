import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SwitchRow from '@ichef/gypcrete-form/src/SwitchRow';

import BasicUsage from './BasicUsage';

storiesOf('[Form] SwitchRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    // Props table
    .addPropsTable(() => <SwitchRow />);
