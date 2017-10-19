import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Button, { PureButton } from '@ichef/gypcrete/src/Button';

import BasicButtonExample from './BasicButton';
import SolidButtonExample from './SolidButton';
import DisabledButtonExample from './DisabledButton';
import ExpandedButtonExample from './ExpandedButton';
import ButtonWithStatusExample from './ButtonWithStatus';

storiesOf('Button', module)
    .add('basic usage',
        withInfo()(BasicButtonExample)
    )
    .add('solid style',
        withInfo()(SolidButtonExample)
    )
    .add('disabled state',
        withInfo()(DisabledButtonExample)
    )
    .add('expanded button',
        withInfo()(ExpandedButtonExample)
    )
    .add('with status',
        withInfo()(ButtonWithStatusExample)
    )
    // Props table
    .addPropsTable(() => <Button />, [PureButton]);
