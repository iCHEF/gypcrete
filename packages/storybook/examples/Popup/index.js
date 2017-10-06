import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import Popup, { EscapablePopup, PurePopup } from 'src/Popup';

import BasicPopupExample from './BasicPopup';
import EscapablePopupExample from './EscapablePopup';

storiesOf('Popup', module)
    .addWithInfo(
        'basic usage',
        () => <BasicPopupExample />
    )
    .addWithInfo(
        'escapable popup',
        'Key `Esc` to close.',
        () => <EscapablePopupExample />
    )
    // Props table
    .addPropsTable(() => <Popup />, [EscapablePopup, PurePopup]);
