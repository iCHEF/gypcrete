import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Modal, { PureModal } from '@ichef/gypcrete/src/Modal';
import getPropTables from 'utils/getPropTables';

import BasicModalExample, { ClosableModalExample, MulitpleClosableModalExample } from './BasicModal';

storiesOf('@ichef/gypcrete|Modal', module)
    .add(
        'basic usage',
        withInfo()(() => (
            <BasicModalExample bodyPadding>
                Modal Content
            </BasicModalExample>
        ))
    )
    .add(
        'small modal',
        withInfo()(() => (
            <BasicModalExample bodyPadding size="small" header="Small Modal">
                Modal Content
            </BasicModalExample>
        ))
    )
    .add(
        'large modal',
        withInfo()(() => (
            <BasicModalExample bodyPadding size="large" header="Large Modal">
                Modal Content
            </BasicModalExample>
        ))
    )
    .add(
        'full modal',
        withInfo()(() => (
            <BasicModalExample bodyPadding size="full" header="Full Modal">
                Modal Content
            </BasicModalExample>
        ))
    )
    .add('closable modal', withInfo()(() => <ClosableModalExample />))
    .add(
        'closable overlaying modals',
        withInfo()(() => (
            <ClosableModalExample size="large">
                <div>Outer Modal</div>
                <ClosableModalExample size="small">
                    <div>Inner Modal</div>
                </ClosableModalExample>
            </ClosableModalExample>
        ))
    )
    .add('centered modal', withInfo()(() => (
        <BasicModalExample bodyPadding centered>
            Modal Content
        </BasicModalExample>
    )))
    .add(
        'multiple layer modals',
        withInfo('Indented with 8px from each side for each layer. When number of layer > 7 we won\'t indent it')(() => (
            <MulitpleClosableModalExample depth={8} />
        ))
    )
    // Props table
    .add('props', getPropTables([PureModal, Modal]));
