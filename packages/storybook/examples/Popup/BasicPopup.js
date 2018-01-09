import React from 'react';
import { action } from '@storybook/addon-actions';

import Popup from '@ichef/gypcrete/src/Popup';

import Button from '@ichef/gypcrete/src/Button';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

function BasicPopupExample() {
    const message = (
        <TextLabel
            bold
            align="center"
            basic="File generated"
            aside="Please click “Download” to get your file." />
    );
    const buttons = [
        <Button key="download" basic="Download" onClick={action('download')} />,
        <Button key="dismiss" basic="Dismiss" onClick={action('dismiss')} />,
    ];
    return (
        <Popup
            message={message}
            icon="success"
            buttons={buttons} />
    );
}

export default BasicPopupExample;
