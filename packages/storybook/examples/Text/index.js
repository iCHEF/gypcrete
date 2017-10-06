import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import Text, { PureText } from '@ichef/gypcrete/src/Text';

import BasicTextExample from './BasicText';
import EllipsisExample from './Ellipsis';
import TextWithStatusIconExample from './TextWithStatusIcon';

storiesOf('Text', module)
    .addWithInfo('basic usage', BasicTextExample)
    .addWithInfo('ellipsis-cropped', EllipsisExample)
    .addWithInfo('with statusIcon', TextWithStatusIconExample)
    // Props table
    .addPropsTable(() => <Text />, [PureText]);
