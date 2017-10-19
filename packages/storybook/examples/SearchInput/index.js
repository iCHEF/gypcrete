import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import SearchInput, { PureSearchInput } from '@ichef/gypcrete/src/SearchInput';

import BasicSearchInputExample from './BasicSearchInput';

storiesOf('SearchInput', module)
    .add('basic usage',
        withInfo()(BasicSearchInputExample)
    )
    // Props table
    .addPropsTable(() => <SearchInput />, [PureSearchInput]);
