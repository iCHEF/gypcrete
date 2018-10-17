import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SwitchRow from '@ichef/gypcrete-form/src/SwitchRow';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';

storiesOf('@ichef/gypcrete-form|SwitchRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    // Props table
    .add('props', getPropTables([SwitchRow]));
