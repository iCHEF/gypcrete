import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import Popup, { EscapablePopup, PurePopup } from 'src/Popup';

import BasicPopupExample from './BasicPopup';

storiesOf('Popup', module)
    .addWithInfo(
        'basic usage',
        () => <BasicPopupExample />
    )
    // Props table
    .addPropsTable(() => <Popup />, [EscapablePopup, PurePopup]);
