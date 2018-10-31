import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import EditableText, { PureEditableText } from '@ichef/gypcrete/src/EditableText';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import Alignments from './Alignments';
import MultiLines from './MultiLines';

storiesOf('@ichef/gypcrete|EditableText', module)
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
    .add('props', getPropTables([PureEditableText, EditableText]));
