import React from 'react';
import { action } from '@storybook/addon-actions';

import RadioSelectList from '@ichef/gypcrete-form/src/RadioSelectList';
import RadioSelectOption from '@ichef/gypcrete-form/src/RadioSelectOption';

export default {
  title: 'gypcrete-form/RadioSelectList',
  component: RadioSelectList,
  subcomponents: { RadioSelectOption },
};

export const singleUncontrolled = () => (
  <RadioSelectList
    defaultValue="1"
    onChange={action('change')}
  >
    <RadioSelectOption
      label="Option A"
      value="1"
    />
    <RadioSelectOption
      label="Option B"
      value="2"
    />
    <RadioSelectOption
      label="Option C"
      value="3"
    />
  </RadioSelectList>
);
singleUncontrolled.story = {
  name: 'Single-value (uncontrolled)',
};

export const singleControlled = () => (
  <RadioSelectList
    value="1"
    onChange={action('change')}
  >
    <RadioSelectOption
      label="Option A"
      value="1"
    />
    <RadioSelectOption
      label="Option B"
      value="2"
    />
    <RadioSelectOption
      label="Option C"
      value="3"
    />
  </RadioSelectList>
);
singleControlled.story = {
  name: 'Single-value (controlled)',
  parameters: {
    docs: {
      storyDescription: 'Observe its onChange() should be firing with user-clicked option',
    },
  },
};

export const multipleWithReadOnly = () => (
  <RadioSelectList
    value="1"
    onChange={action('change')}
  >
    <RadioSelectOption
      label="Option A"
      value="1"
      readOnly
    />
    <RadioSelectOption
      label="Option B"
      value="2"
    />
    <RadioSelectOption
      label="Option C"
      value="3"
    />
  </RadioSelectList>
);
multipleWithReadOnly.story = {
  name: 'With Read-only options',
};
