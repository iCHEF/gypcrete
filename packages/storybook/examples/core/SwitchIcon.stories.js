import React from 'react';
import SwitchIcon from '@ichef/gypcrete/src/SwitchIcon';

export default {
  title: 'gypcrete/SwitchIcon',
  component: SwitchIcon,
};

export function BasicUsage() {
  return (
    <div>
      <SwitchIcon />
      <SwitchIcon state="on" />
    </div>
  );
}
