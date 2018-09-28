import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SelectRow from '@ichef/gypcrete-form/src/SelectRow';

import BasicUsage from './BasicUsage';
import MultipleValues from './MultipleValues';
import Customize from './Customize';

import getPropTables from '../../utils/getPropTables';

storiesOf('[Form] SelectRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    .add('multiple selection', withInfo()(MultipleValues))
    .add('customize labels', withInfo()(Customize))
    // Props table
    .add('props', getPropTables([SelectRow]));
