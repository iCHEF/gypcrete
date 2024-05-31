import React from 'react';

import HeaderRow, { HeaderArea } from '@ichef/gypcrete/src/HeaderRow';
import Button from '@ichef/gypcrete/src/Button';
import TextLabel from '@ichef/gypcrete/src/TextLabel';
import TextEllipsis from '@ichef/gypcrete/src/TextEllipsis';

import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/HeaderRow',
  component: HeaderRow,
  subcomponents: {
    HeaderArea,
  },
};

export function BasicUsage() {
  const leftBtn = (
    <Button
      icon="prev"
      basic="Back"
    />
  );
  const rightBtn = (
    <Button
      align="reverse"
      icon="row-padding"
      basic="Save"
    />
  );
  const centerLabel = (
    <TextLabel
      align="center"
      basic={<TextEllipsis>Lorem ipsum a slightly longer title</TextEllipsis>}
    />
  );

  return (
    <DebugBox>
      <HeaderRow
        left={leftBtn}
        center={centerLabel}
        right={rightBtn}
      />
    </DebugBox>
  );
}

export function OptionalArea() {
  const rightBtn = (
    <Button
      align="reverse"
      icon="row-padding"
      basic="Save"
    />
  );
  const centerLabel = <TextLabel basic="Header Title" />;

  return (
    <DebugBox>
      <HeaderRow
        left={false}
        center={centerLabel}
        right={rightBtn}
      />
    </DebugBox>
  );
}

OptionalArea.story = {
  parameters: {
    docs: {
      storyDescription: 'Remove an area from DOM by explictly setting it to false.',
    },
  },
};
