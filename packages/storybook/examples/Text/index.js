import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// For props table
import Text, { PureText } from '@ichef/gypcrete/src/Text';

import BasicTextExample from './BasicText';
import EllipsisExample from './Ellipsis';
import TextWithStatusIconExample from './TextWithStatusIcon';

import getPropTables from '../../utils/getPropTables';

storiesOf('Text', module)
    .add('basic usage',
        withInfo()(BasicTextExample)
    )
    .add('ellipsis-cropped',
        withInfo()(EllipsisExample)
    )
    .add('with statusIcon',
        withInfo()(TextWithStatusIconExample)
    )
    // Props table
    .add('props', getPropTables([PureText, Text]));
