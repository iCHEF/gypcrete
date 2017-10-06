import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import SearchInput, { PureSearchInput } from '@ichef/gypcrete/src/SearchInput';

import BasicSearchInputExample from './BasicSearchInput';

storiesOf('SearchInput', module)
    .addWithInfo('basic usage', BasicSearchInputExample)
    // Props table
    .addPropsTable(() => <SearchInput />, [PureSearchInput]);
