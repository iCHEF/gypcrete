import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import IconButton from '@ichef/gypcrete/src/IconButton';
import getPropTables from 'utils/getPropTables';

import BasicIconButtonExample from './BasicIconButton';
import IconButtonWithStatusExample from './IconButtonWithStatus';

storiesOf('IconButton', module)
    .add('basic usage',
        withInfo('IconButton is a variant of `<Button>`.')(
            BasicIconButtonExample
        )
    )
    .add('with status',
        withInfo()(IconButtonWithStatusExample)
    )
    .add('props', getPropTables([IconButton], {
        text: 'check `<Button>` props table for more available props.',
    }));
