import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import Text, { PureText } from 'src/Text';

import BasicTextExample from './BasicText';
import TextWithStatusIconExample from './TextWithStatusIcon';

storiesOf('Text', module)
    .addWithInfo('basic usage', BasicTextExample)
    .addWithInfo('with statusIcon', TextWithStatusIconExample)
    // Props table
    .addPropsTable(() => <Text />, [PureText]);
