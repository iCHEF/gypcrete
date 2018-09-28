import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SelectList from '@ichef/gypcrete-form/src/SelectList';
import SelectOption from '@ichef/gypcrete-form/src/SelectOption';

import SingleControlled from './SingleControlled';
import SingleUncontrolled from './SingleUncontrolled';
import MultipleUncontrolled from './MultipleUncontrolled';
import MultipleControlled from './MultipleControlled';
import MultipleWithoutCheckAll from './MultipleWithoutCheckAll';
import MultipleReadOnlyOption from './MultipleReadOnlyOption';
import MultipleMinCheck from './MultipleMinCheck';

import getPropTables from '../../utils/getPropTables';

storiesOf('[Form] SelectList', module)
    .add('single (uncontrolled)', withInfo()(SingleUncontrolled))
    .add('single (controlled)', withInfo()(SingleControlled))
    .add('multiple (uncontrolled)', withInfo()(MultipleUncontrolled))
    .add('multiple (controlled)', withInfo()(MultipleControlled))
    .add('multiple (without checkAll)', withInfo()(MultipleWithoutCheckAll))
    .add('with read-only options', withInfo()(MultipleReadOnlyOption))
    .add('has minimum checks', withInfo()(MultipleMinCheck))
    .add('props', getPropTables([SelectList, SelectOption]));
