import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SearchInput, { PureSearchInput } from '@ichef/gypcrete/src/SearchInput';

import BasicSearchInputExample from './BasicSearchInput';
import getPropTables from '../../utils/getPropTables';

storiesOf('SearchInput', module)
    .add('basic usage',
        withInfo()(BasicSearchInputExample)
    )
    // Props table
    .add('props', getPropTables([PureSearchInput, SearchInput]));
