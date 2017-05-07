import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import Icon from 'src/Icon';

import BasicIconsSet from './BasicIcons';
import PaymentIconsSet from './PaymentIcons';
import CRMIconsSet from './CRMIcons';
import LargeIconExample from './LargeIcon';
import IconColorsExample from './IconColors';

storiesOf('Icon', module)
    .addWithInfo('basic icons set', BasicIconsSet)
    .addWithInfo('payment icons set', PaymentIconsSet)
    .addWithInfo('CRM icons set', CRMIconsSet)
    .addWithInfo('large size', LargeIconExample)
    .addWithInfo('color options', IconColorsExample)
    // Props table
    .addPropsTable(() => <Icon />);
