import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import TextLabel, { PureTextLabel } from '@ichef/gypcrete/src/TextLabel';

import BasicTextLabelExample from './BasicTextLabel';
import TextLabelWithStatusExample from './TextLabelWithStatus';
import TextLabelWithTextExample from './TextLabelWithText';
import Editable from './Editable';

storiesOf('TextLabel', module)
    .addWithInfo('basic usage', BasicTextLabelExample)
    .addWithInfo('with status', TextLabelWithStatusExample)
    .addWithInfo('<Text> in child', TextLabelWithTextExample)
    .addWithInfo('Editable', Editable)
    // Props table
    .addPropsTable(() => <TextLabel />, [PureTextLabel]);
