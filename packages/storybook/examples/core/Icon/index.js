import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Icon from '@ichef/gypcrete/src/Icon';
import getPropTables from 'utils/getPropTables';

import BasicIconsSet from './BasicIcons';
import PaymentIconsSet from './PaymentIcons';
import CRMIconsSet from './CRMIcons';
import InventoryIconsSet from './InventoryIcons';
import MenuPageIconsSet from './MenuPageIcons';
import PaginationIconsSet from './PaginationIcons';

import InlineIconsSet from './InlineIcons';
import LargeIconExample from './LargeIcon';
import IconColorsExample from './IconColors';

storiesOf('@ichef/gypcrete|Icon', module)
    .add('basic icons set', withInfo()(BasicIconsSet))
    .add('payment icons set', withInfo()(PaymentIconsSet))
    .add('CRM icons set', withInfo()(CRMIconsSet))
    .add('Inventory icons set', withInfo()(InventoryIconsSet))
    .add('Menu page icons set', withInfo()(MenuPageIconsSet))
    .add('Pagination icons set', withInfo()(PaginationIconsSet))
    .add('inline-sized icons set', withInfo()(InlineIconsSet))
    .add('large size', withInfo()(LargeIconExample))
    .add('color options', withInfo()(IconColorsExample))
    // Props table
    .add('props', ...getPropTables([Icon]));
