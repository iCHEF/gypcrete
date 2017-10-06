import React, { PureComponent } from 'react';

import Popup from 'src/Popup';
import Button from 'src/Button';
import Icon from 'src/Icon';

class BasicPopupExample extends PureComponent {
    state ={
        errorPopup: false,
        successPopup: false,
    };

    /**
     * Handle popup open or close
     *
     * @param {String}  popup
     * @param {Boolean} isOpen
     */
    handleTogglePopup = (popup, isOpen) => () => {
        this.setState({
            [popup]: isOpen
        });
    }

    renderErrorPopup() {
        const { errorPopup } = this.state;

        if (!errorPopup) {
            return null;
        }

        return (
            <Popup
                message="ERROR"
                icon={<Icon large type="error" color="red" />}
                buttons={[
                    <Button
                        key="dismiss-btn"
                        color="red"
                        basic="Dismiss"
                        onClick={this.handleTogglePopup('errorPopup', false)} />
                ]} />
        );
    }

    renderSuccessPopup() {
        const { successPopup } = this.state;

        if (!successPopup) {
            return null;
        }

        return (
            <Popup
                message="Success"
                icon={<Icon large type="success" color="blue" />}
                buttons={[
                    <Button
                        key="dismiss-btn"
                        color="blue"
                        basic="Dismiss"
                        onClick={this.handleTogglePopup('successPopup', false)} />
                ]} />
        );
    }

    render() {
        return (
            <div>
                <Button
                    color="red"
                    basic="Open error popup"
                    onClick={this.handleTogglePopup('errorPopup', true)} />

                <Button
                    color="blue"
                    basic="Open success popup"
                    onClick={this.handleTogglePopup('successPopup', true)} />

                {this.renderErrorPopup()}
                {this.renderSuccessPopup()}
            </div>
        );
    }
}

export default BasicPopupExample;
