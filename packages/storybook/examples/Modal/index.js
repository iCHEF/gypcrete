import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Modal from '@ichef/gypcrete/src/Modal';

import BasicModalExample, { ClosableModalExample } from './BasicModal';

storiesOf('Modal', module)
    .add('basic usage', withInfo()(() => <BasicModalExample bodyPadding><div>Modal Content</div></BasicModalExample>))
    .add('small modal', withInfo()(() => (
        <BasicModalExample bodyPadding size="small" header="Small Modal">
            <div>Modal Content</div>
        </BasicModalExample>)))
    .add('large modal', withInfo()(() => (
        <BasicModalExample bodyPadding size="large" header="Large Modal">
            <div>Modal Content</div>
        </BasicModalExample>)))
    .add('full modal', withInfo()(() => (
        <BasicModalExample bodyPadding size="full" header="Full Modal">
            <div>Modal Content</div>
        </BasicModalExample>)))
    .add('closable modal', withInfo()(() => <ClosableModalExample />))
    .add('closable overlaying modals', withInfo()(() => (<ClosableModalExample size="large">
        <div>Outer Modal</div>
        <ClosableModalExample size="small">
            <div>Inner Modal</div>
        </ClosableModalExample>
    </ClosableModalExample>)))
    // Props table
    .addPropsTable(() => <Modal />);
