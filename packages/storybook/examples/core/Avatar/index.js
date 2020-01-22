import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Avatar from '@ichef/gypcrete/src/Avatar';
import getPropTables from 'utils/getPropTables';

import BasicAvatar from './BasicAvatar';

storiesOf('@ichef/gypcrete|Avatar', module)
    .add('basic usage', withInfo()(BasicAvatar))
    // Props table
    .add('props', ...getPropTables([Avatar]));
