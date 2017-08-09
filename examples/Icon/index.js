import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import Icon from 'src/Icon';

import BasicIconsSet from './BasicIcons';
import PaymentIconsSet from './PaymentIcons';
import CRMIconsSet from './CRMIcons';
import InventoryIconsSet from './InventoryIcons';
import MenuPageIconsSet from './MenuPageIcons';

import LargeIconExample from './LargeIcon';
import IconColorsExample from './IconColors';

storiesOf('Icon', module)
    .addWithInfo('basic icons set', BasicIconsSet)
    .addWithInfo('payment icons set', PaymentIconsSet)
    .addWithInfo('CRM icons set', CRMIconsSet)
    .addWithInfo('Inventory icons set', InventoryIconsSet)
    .addWithInfo('Menu page icons set', MenuPageIconsSet)
    .addWithInfo('large size', LargeIconExample)
    .addWithInfo('color options', IconColorsExample)
    // Props table
    .addPropsTable(() => <Icon />);
