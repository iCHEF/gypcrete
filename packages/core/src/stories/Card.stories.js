import React from 'react';
import Card from '../Card';

export default {
  title: 'Core/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'A card component that displays an icon, title, and optional description.',
      },
    },
  },
  argTypes: {
    iconType: {
      control: 'text',
      description: 'The type of icon to display',
    },
    title: {
      control: 'text',
      description: 'The title text of the card',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler',
    },
  },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconType: 'info',
  title: '卡片標題',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  iconType: 'info',
  title: '卡片標題',
  description: '這是一段卡片描述文字',
};

export const Clickable = Template.bind({});
Clickable.args = {
  iconType: 'info',
  title: '可點擊的卡片',
  description: '點擊這張卡片會觸發事件',
  onClick: () => {},
};
