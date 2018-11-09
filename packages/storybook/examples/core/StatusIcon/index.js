import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import StatusIcon from '@ichef/gypcrete/src/StatusIcon';
import getPropTables from 'utils/getPropTables';

import BasicStatusIconExample from './BasicStatusIcon';
import CornerStatusIconExample from './CornerStatusIcon';

storiesOf('@ichef/gypcrete|StatusIcon', module)
    .add('basic usage', withInfo()(BasicStatusIconExample))
    .add('corner position', withInfo()(CornerStatusIconExample))
    // Props table
    .add('props', getPropTables([StatusIcon]));
