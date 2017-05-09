import React from 'react';
import { storiesOf } from '@kadira/storybook';

// For props table
import Tag from 'src/Tag';

import BasicTagExample from './BasicTag';
import TagWithParentColorExample from './TagWithParentColor';

storiesOf('Tag', module)
    .addWithInfo('basic usage', BasicTagExample)
    .addWithInfo('with parent color', TagWithParentColorExample)
    // Props table
    .addPropsTable(() => <Tag />);
