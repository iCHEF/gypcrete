import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Icon from '@ichef/gypcrete/src/Icon';

import BasicIconsSet from './BasicIcons';
import PaymentIconsSet from './PaymentIcons';
import CRMIconsSet from './CRMIcons';
import InventoryIconsSet from './InventoryIcons';
import MenuPageIconsSet from './MenuPageIcons';

import LargeIconExample from './LargeIcon';
import IconColorsExample from './IconColors';

storiesOf('Icon', module)
    .add('basic icons set',
        withInfo()(BasicIconsSet)
    )
    .add('payment icons set',
        withInfo()(PaymentIconsSet)
    )
    .add('CRM icons set',
        withInfo()(CRMIconsSet)
    )
    .add('Inventory icons set',
        withInfo()(InventoryIconsSet)
    )
    .add('Menu page icons set',
        withInfo()(MenuPageIconsSet)
    )
    .add('large size',
        withInfo()(LargeIconExample)
    )
    .add('color options',
        withInfo()(IconColorsExample)
    )
    // Props table
    .addPropsTable(() => <Icon />);
