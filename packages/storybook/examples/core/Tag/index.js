import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Tag from '@ichef/gypcrete/src/Tag';
import getPropTables from 'utils/getPropTables';

import BasicTagExample from './BasicTag';
import TagWithParentColorExample from './TagWithParentColor';

storiesOf('@ichef/gypcrete|Tag', module)
    .add('basic usage', withInfo()(BasicTagExample))
    .add('with parent color', withInfo()(TagWithParentColorExample))
    // Props table
    .add('props', getPropTables([Tag]));
