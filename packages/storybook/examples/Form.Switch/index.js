import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Switch from '@ichef/gypcrete-form/src/Switch';

import BasicUsage from './BasicUsage';

storiesOf('[Form] Switch', module)
    .add('basic usage', withInfo()(BasicUsage))
    // Props table
    .addPropsTable(() => <Switch />);
