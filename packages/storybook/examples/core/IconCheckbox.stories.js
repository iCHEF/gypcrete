import React from 'react';
import Checkbox from '@ichef/gypcrete/src/Checkbox';
import IconCheckbox from '@ichef/gypcrete/src/IconCheckbox';

import FlexRow from 'utils/FlexRow';

export default {
  title: '@ichef/gypcrete|IconCheckbox',
  component: IconCheckbox,
  subcomponents: {
    Checkbox,
  },
};

export function BasicUsage() {
  return (
    <FlexRow>
      <IconCheckbox />

      <IconCheckbox indeterminate />
    </FlexRow>
  );
}

export function WithStatus() {
  return (
    <FlexRow>
      <IconCheckbox
        defaultChecked
        status="loading" />

      <IconCheckbox
        status="success"
        statusOptions={{ autohide: false }} />

      <IconCheckbox
        status="error"
        errorMsg="Cannot add printer." />
    </FlexRow>
  );
}
