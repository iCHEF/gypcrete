import React from 'react';
import { storiesOf } from '@storybook/react';

import EditableText from '@ichef/gypcrete/src/EditableText';

import BasicUsage from './BasicUsage';
import Alignments from './Alignments';
import MultiLines from './MultiLines';

storiesOf('EditableText', module)
    .addWithInfo('Basic usage', BasicUsage)
    .addWithInfo('Alignments', Alignments)
    .addWithInfo('Mutiple lines', MultiLines)
    // Props table
    .addPropsTable(() => <EditableText />);
