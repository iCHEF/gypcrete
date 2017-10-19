import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Tag from '@ichef/gypcrete/src/Tag';

import BasicTagExample from './BasicTag';
import TagWithParentColorExample from './TagWithParentColor';

storiesOf('Tag', module)
    .add('basic usage',
        withInfo()(BasicTagExample)
    )
    .add('with parent color',
        withInfo()(TagWithParentColorExample)
    )
    // Props table
    .addPropsTable(() => <Tag />);
