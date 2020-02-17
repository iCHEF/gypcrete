import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import Popup, { PurePopup } from '@ichef/gypcrete/src/Popup';
import PopupButton from '@ichef/gypcrete/src/PopupButton';

import Button from '@ichef/gypcrete/src/Button';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

export default {
    title: '@ichef/gypcrete|Popup',
    component: PurePopup,
    subcomponents: {
        'renderToLayer()': Popup,
    },
};


export function BasicUsage(popupProps) {
    const [opened, setOpened] = useState(false);
    const message = (
        <TextLabel
            bold
            align="center"
            basic="File generated"
            aside="Please click “Download” to get your file." />
    );
    const handlePopupButtonClick = actionName => () => {
        setOpened(false);
        action(actionName);
    };
    const buttons = [
        <PopupButton key="download" bold basic="Download" onClick={handlePopupButtonClick('download')} />,
        <PopupButton key="dismiss" basic="Dismiss" onClick={handlePopupButtonClick('dismiss')} />,
    ];
    const handlePopupOpen = () => setOpened(true);

    return (
        <div>
            <Button
                solid
                color="blue"
                onClick={handlePopupOpen}
                style={{ display: 'inline-block' }}
            >
                Open Popup
            </Button>
            {opened && (
                <Popup
                    message={message}
                    icon="success"
                    buttons={buttons}
                    {...popupProps}
                />
            )}
        </div>
    );
}

export function HorizontalButtons() {
    /*
        <BasicUsage> will pass `buttonsDirection` into <Popup>.
        See <BasicUsage> component code in Basic Usage example.
    */
    return <BasicUsage buttonsDirection="horizontal" />;
}
