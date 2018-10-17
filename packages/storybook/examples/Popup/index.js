import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Popup, { PurePopup } from '@ichef/gypcrete/src/Popup';
import getPropTables from 'utils/getPropTables';

import BasicPopupExample from './BasicPopup';
import HorizontalButtonsExample from './HorizontalButtons';

storiesOf('Popup', module)
    .add('basic usage', withInfo()(BasicPopupExample))
    .add('horizontal buttons', withInfo()(HorizontalButtonsExample))
    // Props table
    .add('props', getPropTables([PurePopup, Popup]));
