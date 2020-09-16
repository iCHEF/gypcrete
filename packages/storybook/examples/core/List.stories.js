import React from 'react';

import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

import Avatar from '@ichef/gypcrete/src/Avatar';
import Button from '@ichef/gypcrete/src/Button';
import Icon from '@ichef/gypcrete/src/Icon';
import IconButton from '@ichef/gypcrete/src/IconButton';
import Section from '@ichef/gypcrete/src/Section';
import TextInput from '@ichef/gypcrete/src/TextInput';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import DebugBox from 'utils/DebugBox';

export default {
  title: '@ichef/gypcrete|List',
  component: List,
  subcomponents: { ListRow, Section },
};

export function NormalList() {
  return (
    <DebugBox width="30rem">
      <List variant="normal" title="List title" desc="Help text here">
        <ListRow>
          <Avatar alt="iCHEF" src="https://api.adorable.io/avatars/285/hello@ichef.tw" />
          <TextLabel basic="Hello World" />
        </ListRow>

        <ListRow>
          <TextLabel icon="tickets" basic="Hello World" />
        </ListRow>

        <ListRow
          desc="Row help message"
          status="error"
          errorMsg="Row error message">
          <TextLabel
            bold
            icon="tickets"
            basic="Hello World"
            aside="Component aside"
            status={null} />
          <IconButton icon="edit" />
          <IconButton tinted icon="drag" />
        </ListRow>

        <ListRow highlight>
          <TextLabel
            icon="tickets"
            basic="Highlighted row"
            aside="Component aside" />
          <IconButton icon="edit" />
          <IconButton tinted icon="drag" />
        </ListRow>
        <ListRow>
          <TextLabel icon="tickets" basic="Row 3" />
          <IconButton icon="edit" />
          <IconButton tinted icon="drag" />
        </ListRow>
        <ListRow>
          <Button
            icon="add"
            basic="Add row" />
        </ListRow>
      </List>
    </DebugBox>
  );
}

export function SettingList() {
  return (
    <DebugBox width="30rem">
      <List variant="setting" title="List title" desc="Help text here">
        <ListRow>
          <TextLabel basic="Hello World" />
        </ListRow>
        <ListRow>
          <TextLabel basic="Row 2" />
          <TextInput value="Value" />
          <Icon type="row-padding" />
        </ListRow>
        <ListRow>
          <Button
            icon="add"
            basic="Add row" />
        </ListRow>
      </List>
    </DebugBox>
  );
}

export function NestedList() {
  const nestedList2nd = (
    <List>
      <ListRow>
        <TextLabel icon="inventory-item" basic="Nested A" />
      </ListRow>
      <ListRow>
        <TextLabel icon="inventory-item" basic="Nested B" />
      </ListRow>
      <ListRow>
        <TextLabel icon="inventory-item" basic="Nested C" />
      </ListRow>
    </List>
  );

  const nestedList1st = (
    <List>
      <ListRow>
        <TextLabel icon="printer" basic="3rd nested I" />
      </ListRow>
      <ListRow nestedList={nestedList2nd}>
        <TextLabel icon="printer" basic="3rd nested II" />
      </ListRow>
      <ListRow>
        <TextLabel icon="printer" basic="3rd nested III" />
      </ListRow>
    </List>
  );

  return (
    <DebugBox width="30rem">
      <List variant="normal" title="List title" desc="Help text here">
        <ListRow>
          <TextLabel icon="tickets" basic="Hello World" />
        </ListRow>
        <ListRow nestedList={nestedList1st}>
          <TextLabel icon="tickets" basic="Row 2" />
        </ListRow>
        <ListRow>
          <TextLabel icon="tickets" basic="Row 3" />
        </ListRow>
      </List>
    </DebugBox>
  );
}

export function NestedListWithTitle() {
  const nestedList2nd = (
    <List title="List Title 2">
      <ListRow>
        <TextLabel icon="inventory-item" basic="Nested A" />
      </ListRow>
      <ListRow>
        <TextLabel icon="inventory-item" basic="Nested B" />
      </ListRow>
      <ListRow>
        <TextLabel icon="inventory-item" basic="Nested C" />
      </ListRow>
    </List>
  );

  const nestedList1st = (
    <List title="List Title">
      <ListRow>
        <TextLabel icon="printer" basic="3rd nested I" />
      </ListRow>
      <ListRow nestedList={nestedList2nd}>
        <TextLabel icon="printer" basic="3rd nested II" />
      </ListRow>
    </List>
  );

  return (
    <DebugBox width="30rem">
      <List variant="normal" title="List title">
        <ListRow>
          <TextLabel icon="tickets" basic="Hello World" />
        </ListRow>
        <ListRow nestedList={nestedList1st}>
          <TextLabel icon="tickets" basic="Row 2" />
        </ListRow>
      </List>
    </DebugBox>
  );
}
