import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Popup, { EscapablePopup, PurePopup } from '@ichef/gypcrete/src/Popup';

import BasicPopupExample from './BasicPopup';
import HorizontalButtonsExample from './HorizontalButtons';

storiesOf('Popup', module)
    .add('basic usage', withInfo()(BasicPopupExample))
    .add('horizontal buttons', withInfo()(HorizontalButtonsExample))
    // Props table
    .addPropsTable(() => <Popup />, [EscapablePopup, PurePopup]);
