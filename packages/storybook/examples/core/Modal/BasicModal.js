import React, { PureComponent } from 'react';
import { action } from '@storybook/addon-actions';
import Modal from '@ichef/gypcrete/src/Modal';
import ModalHeader from './ModalHeader';


function BasicModalExample({ children, ...props }) {
    return (
        <Modal {...props}>
            <div>
                {children}
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
                header={header}
                onClose={this.handleModalClose}
                bodyPadding
                {...this.props} />
        );
    }
}

const MulitpleClosableModalExample = (props) => {
    const { depth, modalProp } = props;
    if (depth === 0) {
        return false;
    }
    return (
        <ClosableModalExample {...modalProp}>
            <div>{depth}</div>
            <MulitpleClosableModalExample depth={depth - 1} />
        </ClosableModalExample>
    );
};

export { ClosableModalExample, MulitpleClosableModalExample };
export default BasicModalExample;
