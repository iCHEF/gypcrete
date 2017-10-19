import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import EditableText from '@ichef/gypcrete/src/EditableText';

import BasicUsage from './BasicUsage';
import Alignments from './Alignments';
import MultiLines from './MultiLines';

storiesOf('EditableText', module)
    .add('Basic usage',
        withInfo()(BasicUsage)
    )
    .add('Alignments',
        withInfo()(Alignments)
    )
    .add('Mutiple lines',
        withInfo()(MultiLines)
    )
    // Props table
    .addPropsTable(() => <EditableText />);
