import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SelectRow from '@ichef/gypcrete-form/src/SelectRow';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import MultipleValues from './MultipleValues';
import WithAvatar from './WithAvatar';
import Customize from './Customize';

storiesOf('@ichef/gypcrete-form|SelectRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    .add('multiple selection', withInfo()(MultipleValues))
    .add('with avatar', withInfo()(WithAvatar))
    .add('customize labels', withInfo()(Customize))
    // Props table
    .add('props', getPropTables([SelectRow]));
