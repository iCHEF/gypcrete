import React from 'react';
import { action } from '@storybook/addon-actions';

import Avatar from '@ichef/gypcrete/src/Avatar';
import List from '@ichef/gypcrete/src/List';
import SelectRow, { PureSelectRow } from '@ichef/gypcrete-form/src/SelectRow';
import SelectOption from '@ichef/gypcrete-form/src/SelectOption';

export default {
  title: 'gypcrete-form/SelectRow',
  component: PureSelectRow,
  subcomponents: {
    'formRow()': SelectRow,
    SelectOption,
  },
};

export const basicUsage = () => (
  <List title="Switch rows">
    <SelectRow
      label="Module default state on iPad"
      desc="Default is off"
      defaultValue="no"
      onChange={action('change')}
    >
      <SelectOption
        label="Yes"
        value="yes"
      />
      <SelectOption
        label="No"
        value="no"
      />
    </SelectRow>

    <SelectRow
      disabled
      label="Disabled row"
    >
      <SelectOption
        label="Yes"
        value="yes"
      />
      <SelectOption
        label="No"
        value="no"
      />
    </SelectRow>

    <SelectRow
      checked
      label="World peace"
      status="error"
      errorMsg="Cannot declare a war."
      value="peace"
    >
      <SelectOption
        label="Peace"
        value="peace"
      />
      <SelectOption
        label="War"
        value="war"
      />
    </SelectRow>
  </List>
);

export const multipleValues = () => (
  <List title="Switch rows with multiple selection">
    <SelectRow
      multiple
      label="Enabled modules"
      onChange={action('change')}
    >
      <SelectOption
        label="Module 1"
        value="mod1"
      />
      <SelectOption
        label="Module 2"
        value="mod2"
      />
      <SelectOption
        label="Module 3"
        value="mod3"
      />
      <SelectOption
        label="Module 4"
        value="mod4"
      />
      <SelectOption
        label="Module 5"
        value="mod5"
      />
    </SelectRow>

    <SelectRow
      multiple
      label="Minimal selection: 2"
      minCheck={2}
      defaultValue={['opt-c', 'opt-d']}
      onChange={action('change')}
    >
      <SelectOption
        label="Option A"
        value="opt-a"
      />
      <SelectOption
        label="Option B"
        value="opt-b"
      />
      <SelectOption
        label="Option C"
        value="opt-c"
      />
      <SelectOption
        label="Option D"
        value="opt-d"
      />
      <SelectOption
        label="Option E"
        value="opt-e"
      />
    </SelectRow>

    <SelectRow
      multiple
      label="Multiple selection with no options"
    />
  </List>
);

export const withAvatar = () => {
  const loveAvatar = (
    <Avatar
      alt="Love"
      src="https://api.adorable.io/avatars/285/love@ichef.tw"
    />
  );
  const trumpsAvatar = (
    <Avatar
      alt="Trumps"
      src="https://api.adorable.io/avatars/285/trumps@ichef.tw"
    />
  );
  const hateAvatar = (
    <Avatar
      alt="Hate"
      src="https://api.adorable.io/avatars/285/hate@ichef.tw"
    />
  );

  return (
    <List title="Switch rows">
      <SelectRow
        label="Avatar"
        desc="Select One Avatar"
        defaultValue="Love"
        onChange={action('change')}
      >
        <SelectOption
          label="Love"
          value="Love"
          avatar={loveAvatar}
        />
        <SelectOption
          label="Trumps"
          value="Trumps"
          avatar={trumpsAvatar}
        />
        <SelectOption
          label="Hate"
          value="Hate"
          avatar={hateAvatar}
        />
      </SelectRow>
    </List>
  );
};

export const customizedLabels = () => (
  <List title="Switch rows with customized labels">
    <SelectRow
      multiple
      label="Custom 'All' label"
      asideAllLabel="EVERYHTING SELECTED"
      defaultValue={['opt-a', 'opt-b', 'opt-c']}
    >
      <SelectOption
        label="Option A"
        value="opt-a"
      />
      <SelectOption
        label="Option B"
        value="opt-b"
      />
      <SelectOption
        label="Option C"
        value="opt-c"
      />
    </SelectRow>

    <SelectRow
      multiple
      label="Turn off 'All' label"
      asideAllLabel={false}
      defaultValue={['opt-a', 'opt-b', 'opt-c']}
    >
      <SelectOption
        label="Option A"
        value="opt-a"
      />
      <SelectOption
        label="Option B"
        value="opt-b"
      />
      <SelectOption
        label="Option C"
        value="opt-c"
      />
    </SelectRow>

    <SelectRow
      multiple
      label="Custom 'None' label"
      asideNoneLabel="Nothing"
    >
      <SelectOption
        label="Option A"
        value="opt-a"
      />
      <SelectOption
        label="Option B"
        value="opt-b"
      />
      <SelectOption
        label="Option C"
        value="opt-c"
      />
    </SelectRow>

    <SelectRow
      multiple
      label="Custom separator label"
      asideAllLabel={false}
      asideSeparator=" + "
      defaultValue={['opt-a', 'opt-b', 'opt-c']}
    >
      <SelectOption
        label="Option A"
        value="opt-a"
      />
      <SelectOption
        label="Option B"
        value="opt-b"
      />
      <SelectOption
        label="Option C"
        value="opt-c"
      />
    </SelectRow>
  </List>
);
