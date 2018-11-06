import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import IconCheckbox from '@ichef/gypcrete/src/IconCheckbox';
import getPropTables from 'utils/getPropTables';

import BasicIconCheckboxExample from './BasicIconCheckbox';
import IconCheckboxWithStatusExample from './IconCheckboxWithStatus';

storiesOf('@ichef/gypcrete|IconCheckbox', module)
    .add('basic usage',
        withInfo('IconCheckbox is a variant of `<Checkbox>`')(
            BasicIconCheckboxExample
        ))
    .add('with status', withInfo()(IconCheckboxWithStatusExample))
    .add('props', getPropTables([IconCheckbox], {
        text: 'check `<Checkbox>` props table for more available props.',
    }));
