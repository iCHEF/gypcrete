import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Popup, { PurePopup } from '@ichef/gypcrete/src/Popup';

import BasicPopupExample from './BasicPopup';
import HorizontalButtonsExample from './HorizontalButtons';

import getPropTables from '../../utils/getPropTables';

storiesOf('Popup', module)
    .add('basic usage', withInfo()(BasicPopupExample))
    .add('horizontal buttons', withInfo()(HorizontalButtonsExample))
    // Props table
    .add('props', getPropTables([PurePopup, Popup]));
