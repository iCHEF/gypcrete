import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SplitView from '@ichef/gypcrete/src/SplitView';
import SplitViewColumn from '@ichef/gypcrete/src/SplitViewColumn';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';

storiesOf('@ichef/gypcrete|SplitView', module)
    .add('basic usage', withInfo()(BasicUsage))
    .add('props', getPropTables([SplitView, SplitViewColumn]));
