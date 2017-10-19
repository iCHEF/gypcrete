import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import TextLabel, { PureTextLabel } from '@ichef/gypcrete/src/TextLabel';

import BasicTextLabelExample from './BasicTextLabel';
import TextLabelWithStatusExample from './TextLabelWithStatus';
import TextLabelWithTextExample from './TextLabelWithText';
import Editable from './Editable';

storiesOf('TextLabel', module)
    .add('basic usage',
        withInfo()(BasicTextLabelExample)
    )
    .add('with status',
        withInfo()(TextLabelWithStatusExample)
    )
    .add('<Text> in child',
        withInfo()(TextLabelWithTextExample)
    )
    .add('Editable',
        withInfo()(Editable)
    )
    // Props table
    .addPropsTable(() => <TextLabel />, [PureTextLabel]);
