import React from 'react';
import { storiesOf } from '@storybook/react';

// For props table
import Tag from '@ichef/gypcrete/src/Tag';

import BasicTagExample from './BasicTag';
import TagWithParentColorExample from './TagWithParentColor';

storiesOf('Tag', module)
    .addWithInfo('basic usage', BasicTagExample)
    .addWithInfo('with parent color', TagWithParentColorExample)
    // Props table
    .addPropsTable(() => <Tag />);
