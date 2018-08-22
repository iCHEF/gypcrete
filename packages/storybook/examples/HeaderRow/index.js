import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import HeaderRow from '@ichef/gypcrete/src/HeaderRow';

import BasicUsage from './BasicUsage';
import OptionalArea from './OptionalArea';

storiesOf('HeaderRow', module)
    .add('Basic usage', withInfo()(BasicUsage))
    .add(
        'Optional area',
        withInfo('Remove an area from DOM by explictly setting it to false.')(OptionalArea)
    )

    // Props table
    .addPropsTable(() => <HeaderRow />);
