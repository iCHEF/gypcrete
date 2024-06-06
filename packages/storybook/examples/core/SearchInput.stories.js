import { useState } from 'react';
import { action } from '@storybook/addon-actions';

import SearchInput, { PureSearchInput } from '@ichef/gypcrete/src/SearchInput';
import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/SearchInput',
  component: PureSearchInput,
  subcomponents: {
    'rowComp()': SearchInput,
  },
};

export function BasicSearchInputExample() {
  const [controlledInputValue, setValue] = useState('');

  const handleControlledInputChange = (e) => {
    action('onChange')(e.target.value);
    setValue(e.target.value);
  };

  const handleControlledInputReset = () => {
    action('onReset')();
    setValue('');
  };

  return (
    <div>
      <DebugBox>
        <SearchInput
          value={controlledInputValue}
          onChange={handleControlledInputChange}
          onSearch={action('onSearch')}
          onReset={handleControlledInputReset}
          // searchOnInputChange
          searchOnInputBlur
          blockDuplicateValueSearch
          blockEmptyValueSearch
        />
      </DebugBox>

      <DebugBox>
        <SearchInput defaultValue="Monkey King" />
      </DebugBox>

      <DebugBox>
        <SearchInput
          defaultValue="Monkey King"
          status="loading"
        />
      </DebugBox>
    </div>
  );
}
