import React, { PureComponent } from 'react';

import Popup from '@ichef/gypcrete/src/Popup';
import Button from '@ichef/gypcrete/src/Button';

class EscapablePopupExample extends PureComponent {
    state ={
        isPopupOpen: false
    };

    handlePopupOpen = () => {
        this.setState({ isPopupOpen: true });
    }

    handlePopupClose = () => {
        this.setState({ isPopupOpen: false });
    }

    renderPopup() {
        const { isPopupOpen } = this.state;

        if (!isPopupOpen) {
            return null;
        }

        return (
            <Popup
                icon="delete"
                message="Try 'Esc' key"
                buttons={[
                    <Button
                        key="dismiss-btn"
                        basic="Dismiss"
                        onClick={this.handlePopupClose} />
                ]}
                onEscape={this.handlePopupClose} />
        );
    }

    render() {
        return (
            <div>
                <Button
                    basic="Open popup"
                    onClick={this.handlePopupOpen} />

                {this.renderPopup()}
            </div>
        );
    }
}

export default EscapablePopupExample;
