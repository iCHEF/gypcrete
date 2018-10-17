import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import TextInputRow from '@ichef/gypcrete-form/src/TextInputRow';
import getPropTables from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import MultiLineUsage from './MultiLineUsage';

storiesOf('[Form] TextInputRow', module)
    .add('basic usage', withInfo()(BasicUsage))
    .add('multi-line usage', withInfo()(MultiLineUsage))
    // Props table
    .add('props', getPropTables([TextInputRow]));
