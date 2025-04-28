import React from 'react';
import { action } from '@storybook/addon-actions';

import Card from '@ichef/gypcrete/src/Card';

export default {
  title: 'gypcrete/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '404px' }}>
        <Story />
      </div>
    ),
  ],
};

// Basic Card Style
export function BasicCard() {
  return (
    <Card
      iconType="bedtime"
      title="Leisure Activities"
      description="Outdoor activities suitable for the whole family to enjoy and strengthen parent-child relationships."
    />
  );
}

// Long Title and Description
export function LongTextCard() {
  return (
    <Card
      iconType="camping"
      title="This is a very long title text that demonstrates how the component handles extended content in the title area"
      description="This is a long description text that shows how the component handles multi-line content in the description area. The text will be truncated if it exceeds the available space within the card layout."
    />
  );
}

// Title Only Card
export function TitleOnlyCard() {
  return (
    <Card
      iconType="business-center"
      title="Title"
    />
  );
}

// Card with onClick handler
export function CardWithClickHandler() {
  return (
    <Card
      iconType="favorite"
      title="Clickable Card"
      onClick={action('Card clicked')}
    />
  );
}
