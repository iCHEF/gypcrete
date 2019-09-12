import React from 'react';
import { action } from '@storybook/addon-actions';

import Popup from '@ichef/gypcrete/src/Popup';
import PopupButton from '@ichef/gypcrete/src/PopupButton';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

function BasicPopupExample() {
    const message = (
        <TextLabel
            bold
            align="center"
            basic="File generated"
            aside="Please click “Download” to get your file."
        />
    );
    const buttons = [
        <PopupButton key="download" bold basic="Download" onClick={action('download')} />,
        <PopupButton key="dismiss" basic="Dismiss" onClick={action('dismiss')} />,
        <PopupButton key="nothing" basic="Do nothing" onClick={action('nothing')} />,
    ];
    return (
        <Popup
            message={message}
            icon="success"
            buttons={buttons}
        />
    );
}

export default BasicPopupExample;
