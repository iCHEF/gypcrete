import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import StatusIcon from '@ichef/gypcrete/src/StatusIcon';

import BasicStatusIconExample from './BasicStatusIcon';
import CornerStatusIconExample from './CornerStatusIcon';

storiesOf('StatusIcon', module)
    .add('basic usage',
        withInfo()(BasicStatusIconExample)
    )
    .add('corner position',
        withInfo()(CornerStatusIconExample)
    )
    // Props table
    .addPropsTable(() => <StatusIcon />);
