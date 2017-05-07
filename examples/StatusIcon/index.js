import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import StatusIcon from 'src/StatusIcon';

import BasicStatusIconExample from './BasicStatusIcon';
import CornerStatusIconExample from './CornerStatusIcon';

storiesOf('StatusIcon', module)
    .addWithInfo('basic usage', BasicStatusIconExample)
    .addWithInfo('corner position', CornerStatusIconExample)
    // Props table
    .addPropsTable(() => <StatusIcon />);
