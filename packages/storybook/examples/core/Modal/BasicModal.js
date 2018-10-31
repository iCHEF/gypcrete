import React, { PureComponent } from 'react';
import { action } from '@storybook/addon-actions';
import Modal from '@ichef/gypcrete/src/Modal';
import ModalHeader from './ModalHeader';


function BasicModalExample(props) {
    return (
        <Modal {...props}>
            <div>
                {props.children}
            </div>
        </Modal>
    );
}

class ClosableModalExample extends PureComponent {
    state ={
        modalOpen: true
    };

    handleModalOpen = () => {
        this.setState({ modalOpen: true });
    }

    handleModalClose = () => {
        action('cancel')();
        this.setState({ modalOpen: false });
    }

    render() {
        const { modalOpen } = this.state;
        const header = (
            <ModalHeader
                onCancel={this.handleModalClose} />
        );

        if (!modalOpen) {
            return null;
        }

        return (
            <BasicModalExample
                header={header} onClose={this.handleModalClose}
                bodyPadding {...this.props} />
        );
    }
}

export { ClosableModalExample };
export default BasicModalExample;
