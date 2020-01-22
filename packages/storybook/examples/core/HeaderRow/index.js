import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import HeaderRow from '@ichef/gypcrete/src/HeaderRow';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import OptionalArea from './OptionalArea';

storiesOf('@ichef/gypcrete|HeaderRow', module)
    .add('Basic usage', withInfo()(BasicUsage))
    .add(
        'Optional area',
        withInfo('Remove an area from DOM by explictly setting it to false.')(OptionalArea)
    )

    // Props table
    .add('props', ...getPropTables([HeaderRow]));
