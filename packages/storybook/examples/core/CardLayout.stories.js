import React from 'react';

import CardLayout from '@ichef/gypcrete/src/CardLayout';
import Card from '@ichef/gypcrete/src/Card';

export default {
  title: 'gypcrete/CardLayout',
  component: CardLayout,
};

// Grid Layout - Based on Figma example
export function GridLayout() {
  return (
    <CardLayout layout="grid">
      <Card
        iconType="business-center"
        title="Business Workshop"
        desc="Enhance professional skills with practical workshops designed for busy professionals. Learn essential techniques and strategies to improve workplace productivity."
      />
      <Card
        iconType="bedtime"
        title="Evening Activities"
        desc="Focus on quality experiences suitable for dates and gatherings."
      />
      <Card
        iconType="camping"
        title="Weekend Events"
        desc="Perfect for family and leisure needs, with special package options."
      />
      <Card
        iconType="bedtime"
        title="Evening Activities"
      />
      <Card
        iconType="camping"
        title="Weekend Events"
      />
      <Card
        iconType="bedtime"
        title="Evening Activities"
      />
    </CardLayout>
  );
}

// Row Layout - Based on Figma example (two cards)
export function RowLayoutTwoCards() {
  return (
    <div>
      <CardLayout layout="row">
        <Card
          iconType="business-center"
          title="Card Title Card Title Card Title"
          description="Description text for this card example."
        />
        <Card
          iconType="bedtime"
          title="Card Title"
          description="This is a longer description text that demonstrates how the cards handle different content lengths while maintaining consistent heights. The layout should adjust appropriately to accommodate various content sizes."
        />
      </CardLayout>
    </div>
  );
}
RowLayoutTwoCards.parameters = {
  docs: {
    description: {
      story: 'When description heights differ, both cards should maintain consistent height',
    },
  },
};

// Column Layout
export function ColumnLayout() {
  return (
    <CardLayout layout="column">
      <Card
        iconType="business-center"
        title="Business Workshop"
        desc="Enhance professional skills with practical sessions"
      />
      <Card
        iconType="bedtime"
        title="Evening Activities"
        desc="Quality experiences for gatherings and events"
      />
      <Card
        iconType="camping"
        title="Weekend Events"
        desc="Family-friendly options for leisure time"
      />
    </CardLayout>
  );
}
