import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import Popup, { PurePopup } from '@ichef/gypcrete/src/Popup';
import PopupButton from '@ichef/gypcrete/src/PopupButton';

import Button from '@ichef/gypcrete/src/Button';
import Checkbox from '@ichef/gypcrete/src/Checkbox';

const ReactLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

export default {
    title: '@ichef/gypcrete|Popup',
    component: PurePopup,
    subcomponents: {
        'renderToLayer()': Popup,
    },
};


export function BasicUsage(popupProps) {
    const [opened, setOpened] = useState(false);

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
                style={{ display: 'inline-block', }}
            >
                Open Popup
            </Button>
            {opened && (
                <Popup
                    messageTitle="File generated"
                    messageDesc="Please click “Download” to get your file."
                    messageBottomArea={(
                        <Checkbox basic="Download zip file" />
                    )}
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


export function CustomMessageArea(popupProps) {
    const [opened, setOpened] = useState(false);

    const customMessageNode = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <img alt="react" width={30} height={30} src={ReactLogo} />
            <span style={{ marginLeft: '10px', }}> is awesome!</span>
        </div>
    );

    const handlePopupButtonClick = () => {
        setOpened(false);
    };

    const buttons = [
        <PopupButton key="agree" bold basic="Agree!" onClick={handlePopupButtonClick} />,
    ];
    const handlePopupOpen = () => setOpened(true);

    return (
        <div>
            <Button
                solid
                color="blue"
                onClick={handlePopupOpen}
                style={{ display: 'inline-block', }}>
                Open Popup
            </Button>
            {opened && (
                <Popup
                    customMessageNode={customMessageNode}
                    icon="success"
                    buttons={buttons}
                    {...popupProps}
                />
            )}
        </div>
    );
}
