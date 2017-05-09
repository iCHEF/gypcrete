import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import SearchInput, { PureSearchInput } from 'src/SearchInput';

import BasicSearchInputExample from './BasicSearchInput';

storiesOf('SearchInput', module)
    .addWithInfo('basic usage', BasicSearchInputExample)
    // Props table
    .addPropsTable(() => <SearchInput />, [PureSearchInput]);
