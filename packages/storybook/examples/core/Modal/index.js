import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Modal, { PureModal } from '@ichef/gypcrete/src/Modal';
import { getAddonOptions } from 'utils/getPropTables';

import ContainsColumnView from '../SplitView/ContainsColumnView';
import ClosableModalExample, { MulitpleClosableModalExample } from './ClosableModalExample';

storiesOf('@ichef/gypcrete|Modal', module)
    .addDecorator(withInfo)
    .add(
        'basic modal',
        () => (
            <Modal header="Basic modal">
                Hello World!
            </Modal>
        )
    )
    .add(
        'closable modal',
        () => <ClosableModalExample />
    )
    .add(
        'with <SplitView>',
        () => (
            <Modal header="With <SplitView>" flexBody bodyPadding={{ bottom: 0 }}>
                <ContainsColumnView />
            </Modal>
        )
    )
    .add(
        'centered modal',
        () => (
            <Modal header="Vertically-centered modal">
                Hello World!
            </Modal>
        )
    )
    .add(
        'multiple layer modals',
        () => <MulitpleClosableModalExample depth={10} />,
        {
            info: 'Indented with 32px from each side for each layer. When number of layer > 7 we won\'t indent it',
        }
    )
    // Props table
    .add(
        'props',
        () => <div />,
        { info: getAddonOptions([PureModal, Modal]) }
    );
