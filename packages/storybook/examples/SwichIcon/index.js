import React from 'react';
import { storiesOf } from '@storybook/react';

import SwitchIcon from 'src/SwitchIcon';
import BasicUsage from './BasicUsage';

storiesOf('SwitchIcon', module)
    .addWithInfo(
        'Basic usage',
        `A <SwitchIcon> is a visual element that is supposed to be
         like a 64x32 icon.`,
        BasicUsage
    )
    // Props table
    .addPropsTable(() => <SwitchIcon />);
