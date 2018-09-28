import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SwitchRow from '@ichef/gypcrete-form/src/SwitchRow';

import BasicUsage from './BasicUsage';
import getPropTables from '../../utils/getPropTables';

storiesOf('[Form] SwitchRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    // Props table
    .add('props', getPropTables([SwitchRow]));
