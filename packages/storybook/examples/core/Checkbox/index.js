import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Checkbox, { PureCheckbox } from '@ichef/gypcrete/src/Checkbox';
import getPropTables from 'utils/getPropTables';

import BasicCheckboxExample from './BasicCheckbox';
import CheckboxWithIndeterminateExample from './CheckboxWithIndeterminate';
import CheckboxWithStatusExample from './CheckboxWithStatus';

storiesOf('@ichef/gypcrete|Checkbox', module)
    .add('basic usage', withInfo()(BasicCheckboxExample))
    .add('indeterminate state',
        withInfo('`Check all` indeterminate state is interacting with `item 1` and `item 2`.')(
            () => <CheckboxWithIndeterminateExample />
        ))
    .add('with status', withInfo()(CheckboxWithStatusExample))
    .add('props', ...getPropTables([PureCheckbox, Checkbox]));
