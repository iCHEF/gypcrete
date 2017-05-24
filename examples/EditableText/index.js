import React from 'react';
import { storiesOf } from '@kadira/storybook';

import EditableText from 'src/EditableText';

import BasicUsage from './BasicUsage';
import Alignments from './Alignments';

storiesOf('EditableText', module)
    .addWithInfo('Basic usage', BasicUsage)
    .addWithInfo('Alignments', Alignments)
    // Props table
    .addPropsTable(() => <EditableText />);
