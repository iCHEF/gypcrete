import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Text, { PureText } from '@ichef/gypcrete/src/Text';

import BasicTextExample from './BasicText';
import EllipsisExample from './Ellipsis';
import TextWithStatusIconExample from './TextWithStatusIcon';

storiesOf('Text', module)
    .add('basic usage',
        withInfo()(BasicTextExample)
    )
    .add('ellipsis-cropped',
        withInfo()(EllipsisExample)
    )
    .add('with statusIcon',
        withInfo()(TextWithStatusIconExample)
    )
    // Props table
    .addPropsTable(() => <Text />, [PureText]);
