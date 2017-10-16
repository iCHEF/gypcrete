import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Popup, { EscapablePopup, PurePopup } from '@ichef/gypcrete/src/Popup';

import BasicPopupExample from './BasicPopup';
import EscapablePopupExample from './EscapablePopup';

storiesOf('Popup', module)
    .add('basic usage',
        withInfo()(
            () => <BasicPopupExample />
        )
    )
    .add('escapable popup',
        withInfo('Key `Esc` to close.')(
            () => <EscapablePopupExample />
        )
    )
    // Props table
    .addPropsTable(() => <Popup />, [EscapablePopup, PurePopup]);
