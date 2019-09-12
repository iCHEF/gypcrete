import React from 'react';
import { action } from '@storybook/addon-actions';

import Popup from '@ichef/gypcrete/src/Popup';
import PopupButton from '@ichef/gypcrete/src/PopupButton';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

function HorizontalButtonsExample() {
    const message = (
        <TextLabel
            bold
            align="center"
            basic="File generated"
            aside="Please click “Download” to get your file."
        />
    );
    const buttons = [
        <PopupButton key="dismiss" basic="Dismiss" onClick={action('dismiss')} />,
        <PopupButton key="download" bold basic="Download" onClick={action('download')} />,
    ];
    return (
        <Popup
            message={message}
            icon="success"
            buttons={buttons}
            buttonsDirection="horizontal"
        />
    );
}

export default HorizontalButtonsExample;
