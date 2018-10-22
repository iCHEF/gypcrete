import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SplitView from '@ichef/gypcrete/src/SplitView';
import SplitViewColumn from '@ichef/gypcrete/src/SplitViewColumn';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import ContainsColumnView from './ContainsColumnView';
import InsideColumnView from './InsideColumnView';

storiesOf('@ichef/gypcrete|SplitView', module)
    .add('basic usage', withInfo()(BasicUsage))
    .add('contains <ColumnView>', withInfo()(ContainsColumnView))
    .add('inside <ColumnView>', withInfo()(InsideColumnView))
    .add('props', getPropTables([SplitView, SplitViewColumn]));
