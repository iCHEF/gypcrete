import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SearchInput, { PureSearchInput } from '@ichef/gypcrete/src/SearchInput';
import getPropTables from 'utils/getPropTables';

import BasicSearchInputExample from './BasicSearchInput';

storiesOf('@ichef/gypcrete|SearchInput', module)
    .add('basic usage',
        withInfo()(BasicSearchInputExample)
    )
    // Props table
    .add('props', getPropTables([PureSearchInput, SearchInput]));
