import React from 'react';

import Modal, { PureModal } from '@ichef/gypcrete/src/Modal';

import ContainsColumnView from '../SplitView/ContainsColumnView';
import ClosableModalExample, { MulitpleClosableModalExample } from './ClosableModalExample';

export default {
    title: '@ichef/gypcrete|Modal',
    component: PureModal,
    subcomponents: {
        'renderToLayer()': Modal
    },
}

export function BasicModal() {
    return (
        <Modal header="Basic modal">
            Hello World!
        </Modal>
    );
}

export function ClosableModal() {
    return <ClosableModalExample />;
}

export function SplitViewModal() {
    return (
        <Modal header="With <SplitView>" flexBody bodyPadding={{ bottom: 0 }}>
            <ContainsColumnView />
        </Modal>
    );
}

SplitViewModal.story = {
    name: 'With <SplitView>',
};

export function CenteredModal() {
    return (
        <Modal header="Vertically-centered modal" centered>
            Hello World!
        </Modal>
    );
}

export function MultilpleLayerModal() {
    return <MulitpleClosableModalExample depth={10} />;
}

MultilpleLayerModal.story = {
    parameters: {
        docs: {
            storyDescription: 'Indented with 32px from each side for each layer. When number of layer > 7 we won\'t indent it',
        },
    },
};
