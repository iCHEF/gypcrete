import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SwitchIcon from '@ichef/gypcrete/src/SwitchIcon';
import BasicUsage from './BasicUsage';

storiesOf('SwitchIcon', module)
    .add('Basic usage',
        withInfo(
            `A <SwitchIcon> is a visual element that is supposed
            to be like a 64x32 icon.`
        )(BasicUsage)
    )
    // Props table
    .addPropsTable(() => <SwitchIcon />);
