import React, { useState } from 'react';
import Checkbox, { PureCheckbox } from '@ichef/gypcrete/src/Checkbox';
import Avatar from '@ichef/gypcrete/src/Avatar';
import DebugBox from 'utils/DebugBox';

export default {
  title: '@ichef/gypcrete|Checkbox',
  component: PureCheckbox,
  subcomponents: {
    'rowComp()': Checkbox,
  },
};


export function BasicUsage() {
  const rdAvatar = (
    <Avatar
      type="square"
      alt="John Doe"
      src="https://api.adorable.io/avatars/285/johndoe@example.com" />
  );

  return (
    <div>
      <DebugBox>
        <Checkbox basic="Count me in" />
      </DebugBox>

      <DebugBox>
        <Checkbox
          defaultChecked
          basic="Join pilot program"
          aside="Secondary helps"
          tag="New" />
      </DebugBox>

      <DebugBox>
        <Checkbox
          defaultChecked
          basic="Join pilot program"
          avatar={rdAvatar} />
      </DebugBox>

      <DebugBox>
        <Checkbox
          defaultChecked
          basic="Turn the light"
          aside="center align"
          align="center" />
      </DebugBox>
    </div>
  );
}

export function CheckboxWithIndeterminateExample() {
  const [{ item1Checked, item2Checked }, setItems] = useState({
    item1Checked: true,
    item2Checked: false,
  });

  const handleCheckAll = () => {
    let checkAllValue = true;

    if (item1Checked && item2Checked) {
      checkAllValue = false;
    }

    setItems({
      item1Checked: checkAllValue,
      item2Checked: checkAllValue,
    });
  };

  const handleItemCheck = item => (event) => {
    const { checked } = event.target;
    setItems(prevState => ({
      ...prevState,
      [item]: checked,
    }));
  };

  return (
    <div>
      <Checkbox
        basic="Check all"
        indeterminate={
          (item1Checked || item2Checked)
                    && !(item1Checked && item2Checked)
        }
        checked={item1Checked && item2Checked}
        onChange={handleCheckAll} />

      <Checkbox
        basic="Item 1"
        checked={item1Checked}
        onChange={handleItemCheck('item1Checked')} />

      <Checkbox
        basic="Item 2"
        checked={item2Checked}
        onChange={handleItemCheck('item2Checked')} />
    </div>
  );
}

CheckboxWithIndeterminateExample.story = {
  parameters: {
    docs: {
      storyDescription: '`Check all` indeterminate state is interacting with `item 1` and `item 2`.',
    },
  },
};

export function CheckboxWithStatusExample() {
  return (
    <div>
      <DebugBox>
        <Checkbox
          indeterminate
          align="center"
          basic="Count me in"
          status="loading" />
      </DebugBox>

      <DebugBox>
        <Checkbox
          defaultChecked
          align="reverse"
          basic="Count me in"
          status="success"
          statusOptions={{ autohide: false }} />
      </DebugBox>

      <DebugBox>
        <Checkbox
          basic="Count me in"
          status="error"
          errorMsg="Unauthorized" />
      </DebugBox>
    </div>
  );
}
