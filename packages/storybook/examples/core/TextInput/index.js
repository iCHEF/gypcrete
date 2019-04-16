import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import TextInput, { PureTextInput } from '@ichef/gypcrete/src/TextInput';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import MultiLines from './MultiLines';
import CustomRendering from './CustomRendering';

storiesOf('@ichef/gypcrete|TextInput', module)
    .add('Basic usage', withInfo()(BasicUsage))
    .add('Multiple lines', withInfo()(MultiLines))
    .add('Custom rendering', withInfo()(CustomRendering))
    // Props table
    .add('props', getPropTables([PureTextInput, TextInput]));
