import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ColumnView from '@ichef/gypcrete/src/ColumnView';
import BasicUsage from './BasicUsage';

import getPropTables from '../../utils/getPropTables';

storiesOf('ColumnView', module)
    .add('basic usage',
        withInfo()(BasicUsage)
    )
    .add('props', getPropTables([ColumnView]));
