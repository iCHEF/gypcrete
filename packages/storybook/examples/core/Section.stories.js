import React from 'react';

import Section from '@ichef/gypcrete/src/Section';

import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/Section',
  component: Section,
};

function DemoContent() {
  return (
    <div style={{
      width: '100%',
      lineHeight: '200px',
      textAlign: 'center',
      background: '#eee',
    }}
    >
      Section Content
    </div>
  );
}

export function PlainSection() {
  return (
    <DebugBox>
      <Section>
        <DemoContent />
      </Section>
    </DebugBox>
  );
}
PlainSection.story = {
  parameters: {
    docs: {
      storyDescription: 'Plain <Section> with spacing around container',
    },
  },
};

export function WithTitleAndDesc() {
  return (
    <DebugBox>
      <Section title="Section title" desc="Description text">
        <DemoContent />
      </Section>
    </DebugBox>
  );
}
WithTitleAndDesc.story = {
  parameters: {
    docs: {
      storyDescription: '<Section> with title and desc areas',
    },
  },
};

export function WithoutVerticalSpacing() {
  return (
    <DebugBox>
      <Section
        verticalSpacing={false}
        title="Section title"
        desc="Description text"
      >
        <DemoContent />
      </Section>
    </DebugBox>
  );
}
WithoutVerticalSpacing.story = {
  parameters: {
    docs: {
      storyDescription: 'Removes spacing above and below <Section>',
    },
  },
};

export function WithoutBodyPadding() {
  return (
    <DebugBox>
      <Section
        bodySpacing={false}
        title="Section title"
        desc="Description text"
      >
        <DemoContent />
      </Section>
    </DebugBox>
  );
}
WithoutBodyPadding.story = {
  parameters: {
    docs: {
      storyDescription: 'Removes horizontal padding for Section body, usually for <List>',
    },
  },
};
