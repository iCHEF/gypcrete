import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Button, { PureButton } from '@ichef/gypcrete/src/Button';
import getPropTables from 'utils/getPropTables';

import BasicButtonExample from './BasicButton';
import SolidButtonExample from './SolidButton';
import DisabledButtonExample from './DisabledButton';
import ExpandedButtonExample from './ExpandedButton';
import ButtonWithStatusExample from './ButtonWithStatus';
import CustomTagButtonExample from './CustomTagButton';

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
    .add('custom tag', withInfo()(CustomTagButtonExample))
    .add('props', getPropTables([PureButton, Button]));
