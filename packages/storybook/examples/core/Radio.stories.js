import React from 'react';
import Radio, { PureRadio } from '@ichef/gypcrete/src/Radio';
import Avatar from '@ichef/gypcrete/src/Avatar';
import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/Radio',
  component: PureRadio,
  subcomponents: {
    'rowComp()': Radio,
  },
};

export function BasicUsage() {
  const rdAvatar = (
    <Avatar
      type="square"
      alt="John Doe"
      src="https://api.adorable.io/avatars/285/johndoe@example.com"
    />
  );

  return (
    <div>
      <DebugBox>
        <Radio basic="Checked Radio" checked />
      </DebugBox>

      <DebugBox>
        <Radio
          basic="Unchecked Radio"
          aside="Secondary helps"
          tag="New"
          defaultChecked={false}
        />
      </DebugBox>

      <DebugBox>
        <Radio
          basic="Radio with avatar"
          avatar={rdAvatar}
          defaultChecked={false}
        />
      </DebugBox>

      <DebugBox>
        <Radio
          basic="Disabled Radio"
          disabled
        />
      </DebugBox>
    </div>
  );
}

export function RadioWithStatusExample() {
  return (
    <div>
      <DebugBox>
        <Radio
          align="center"
          basic="Count me in"
          status="loading"
        />
      </DebugBox>

      <DebugBox>
        <Radio
          defaultChecked
          align="reverse"
          basic="Count me in"
          status="success"
          statusOptions={{ autohide: false }}
        />
      </DebugBox>

      <DebugBox>
        <Radio
          basic="Count me in"
          status="error"
          errorMsg="Unauthorized"
        />
      </DebugBox>
    </div>
  );
}
