import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Popover from '@ichef/gypcrete/src/Popover';

import BasicExample from './Basic';

storiesOf('Popover', module)
    .add('basic usage', withInfo()(BasicExample))
    // Props table
    .addPropsTable(() => <Popover />);
