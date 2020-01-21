import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Text, { PureText } from '@ichef/gypcrete/src/Text';
import getPropTables from 'utils/getPropTables';

import BasicTextExample from './BasicText';
import EllipsisExample from './Ellipsis';
import TextWithStatusIconExample from './TextWithStatusIcon';

storiesOf('@ichef/gypcrete|Text', module)
    .add('basic usage', withInfo()(BasicTextExample))
    .add('ellipsis-cropped', withInfo()(EllipsisExample))
    .add('with statusIcon', withInfo()(TextWithStatusIconExample))
    // Props table
    .add('props', ...getPropTables([PureText, Text]));
