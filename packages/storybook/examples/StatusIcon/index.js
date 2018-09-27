import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import StatusIcon from '@ichef/gypcrete/src/StatusIcon';

import BasicStatusIconExample from './BasicStatusIcon';
import CornerStatusIconExample from './CornerStatusIcon';

import getPropTables from '../../utils/getPropTables';

storiesOf('StatusIcon', module)
    .add('basic usage',
        withInfo()(BasicStatusIconExample)
    )
    .add('corner position',
        withInfo()(CornerStatusIconExample)
    )
    // Props table
    .add('props', getPropTables([StatusIcon]));
