import React, { PureComponent } from 'react';
import { action } from '@storybook/addon-actions';

import Button from '@ichef/gypcrete/src/Button';
import Modal from '@ichef/gypcrete/src/Modal';

import ModalHeader from './ModalHeader';

export default class ClosableModalExample extends PureComponent {
    state ={
        modalOpen: true,
    };

    handleModalOpen = () => {
        this.setState({ modalOpen: true });
    }

    handleModalClose = () => {
        action('cancel')();
        this.setState({ modalOpen: false });
    }

    render() {
        const { children } = this.props;
        const { modalOpen } = this.state;

        const header = (
            <ModalHeader
                onCancel={this.handleModalClose}
            />
        );

        if (!modalOpen) {
            return (
                <div>
                    <Button
                        solid
                        color="blue"
                        onClick={this.handleModalOpen}
                        style={{ display: 'inline-block' }}
                    >
                        Open Modal
                    </Button>
                </div>
            );
        }

        return (
            <Modal
                header={header}
                onClose={this.handleModalClose}
            >
                Modal content
                {children}
            </Modal>
        );
    }
}

export const MulitpleClosableModalExample = (props) => {
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
