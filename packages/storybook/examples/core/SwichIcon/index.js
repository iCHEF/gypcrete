import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SwitchIcon from '@ichef/gypcrete/src/SwitchIcon';
import getPropTables from 'utils/getPropTables';
import BasicUsage from './BasicUsage';

storiesOf('@ichef/gypcrete|SwitchIcon', module)
    .add('Basic usage',
        withInfo(
            `A <SwitchIcon> is a visual element that is supposed
            to be like a 64x32 icon.`
        )(BasicUsage)
    )
    // Props table
    .add('props', getPropTables([SwitchIcon]));
