import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ColumnView from '@ichef/gypcrete/src/ColumnView';
import getPropTables from 'utils/getPropTables';
import BasicUsage from './BasicUsage';

storiesOf('ColumnView', module)
    .add('basic usage',
        withInfo()(BasicUsage)
    )
    .add('props', getPropTables([ColumnView]));
