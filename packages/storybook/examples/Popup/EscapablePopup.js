import React from 'react';
import { action } from '@storybook/addon-actions';

import Popup from '@ichef/gypcrete/src/Popup';
import PopupButton from '@ichef/gypcrete/src/PopupButton';

function EscapablePopupExample() {
    return (
        <Popup
            icon="delete"
            message="Try 'Esc' key"
            buttons={[
                <PopupButton
                    key="dismiss-btn"
                    basic="Dismiss"
                    onClick={action('click')} />
            ]}
            closable={{
                onEscape: true,
            }}
            onClose={action('escape')} />
    );
}

export default EscapablePopupExample;
