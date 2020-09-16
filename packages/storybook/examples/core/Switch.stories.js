import React from 'react';

import Switch, { PureSwitch } from '@ichef/gypcrete/src/Switch';
import DebugBox from 'utils/DebugBox';


export default {
  title: '@ichef/gypcrete|Switch',
  component: PureSwitch,
  subcomponents: {
    'rowComp()': Switch,
  },
};

export function BasicUsage() {
  return (
    <div>
      <DebugBox>
        <Switch />
      </DebugBox>

      <DebugBox>
        <Switch
          basic="Switch with basic"
          aside="Rare usage" />
      </DebugBox>

      <DebugBox>
        <Switch disabled />
      </DebugBox>
    </div>
  );
}

export function ControlledInput() {
  return (
    <div>
      <DebugBox>
        <Switch basic="Uncontrolled" />
      </DebugBox>

      <DebugBox>
        <Switch
          defaultChecked
          basic="Uncontrolled"
          aside="with defaults" />
      </DebugBox>
      <DebugBox>
        <Switch
          checked
          basic="Controlled"
          onChange={() => {}} />
      </DebugBox>
    </div>
  );
}
export function WithStatus() {
  return (
    <div>
      <DebugBox>
        <Switch
          turnedOn
          status="loading"
          onChange={() => {}} />
      </DebugBox>

      <DebugBox>
        <Switch
          turnedOn
          status="success"
          statusOptions={{ autohide: false }}
          onChange={() => {}} />
      </DebugBox>

      <DebugBox>
        <Switch
          turnedOn={false}
          status="error"
          errorMsg="Network error"
          onChange={() => {}} />
      </DebugBox>
    </div>
  );
}

export function HowToPassPropsToInput() {
  return (
    <div>
      <DebugBox>
        <Switch
          input={{
            id: 'dom-id',
            title: 'Tooltip for <input>',
            'data-prop': true,
          }} />
      </DebugBox>
    </div>
  );
}
HowToPassPropsToInput.story = {
  name: 'How to pass props to <input>',
  parameters: {
    docs: {
      storyDescription: `Pass additional props to the underlying \`<input type="checkbox">\`
            via the 'input' prop.`,
    },
  },
};
