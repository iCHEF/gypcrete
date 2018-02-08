import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import BasicModalExample from './BasicModal';

storiesOf('Modal', module)
    .add('basic usage', withInfo()(BasicModalExample));
    // TODO: props table
    // // Props table
    // .addPropsTable(() => <Modal />, [PureModal]);
