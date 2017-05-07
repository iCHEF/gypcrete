import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import Button, { PureButton } from 'src/Button';

import BasicButtonExample from './BasicButton';
import SolidButtonExample from './SolidButton';
import DisabledButtonExample from './DisabledButton';
import ExpandedButtonExample from './ExpandedButton';
import ButtonWithStatusExample from './ButtonWithStatus';

storiesOf('Button', module)
    .addWithInfo('basic usage', BasicButtonExample)
    .addWithInfo('solid style', SolidButtonExample)
    .addWithInfo('disabled state', DisabledButtonExample)
    .addWithInfo('expanded button', ExpandedButtonExample)
    .addWithInfo('with status', ButtonWithStatusExample)
    // Props table
    .addPropsTable(() => <Button />, [PureButton]);
