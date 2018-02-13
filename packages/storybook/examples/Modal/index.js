import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Modal from '@ichef/gypcrete/src/Modal';

import BasicModalExample, { ClosableModalExample } from './BasicModal';

storiesOf('Modal', module)
    .add('basic usage', withInfo()(() => <BasicModalExample bodyPadding />))
    .add('small modal', withInfo()(() => <BasicModalExample bodyPadding size="small" />))
    .add('large modal', withInfo()(() => <BasicModalExample bodyPadding size="large" />))
    .add('full modal', withInfo()(() => <BasicModalExample bodyPadding size="full" />))
    .add('closable modal', withInfo()(() => <ClosableModalExample />))
    // Props table
    .addPropsTable(() => <Modal />);
