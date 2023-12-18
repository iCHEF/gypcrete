import React from 'react';
import { action } from '@storybook/addon-actions';

import EditableText, { PureEditableText } from '@ichef/gypcrete/src/EditableText';
import { PureText } from '@ichef/gypcrete/src/Text';
import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/EditableText',
  component: PureEditableText,
  subcomponents: {
    PureText,
    'withStatus()': EditableText,
  },
};

export function BasicUsage() {
  return (
    <div>
      <DebugBox>
        <EditableText onChange={action('change')} />
      </DebugBox>

      <DebugBox>
        <EditableText
          value="Controlled input"
          onChange={action('change')}
        />
      </DebugBox>

      <DebugBox>
        <EditableText
          defaultValue="Uncontrolled input"
          onChange={action('change')}
        />
      </DebugBox>
    </div>
  );
}

export function Alignments() {
  return (
    <div>
      <DebugBox>
        <EditableText value="left-aligned" />
      </DebugBox>

      <DebugBox>
        <EditableText
          align="center"
          value="center-aligned"
        />
      </DebugBox>

      <DebugBox>
        <EditableText
          align="right"
          value="right-aligned"
        />
      </DebugBox>
    </div>
  );
}

export function MultiLines() {
  return (
    <div>
      <DebugBox>
        <EditableText
          inputTag="textarea"
          onChange={action('change')}
        />
      </DebugBox>

      <DebugBox>
        <EditableText
          inputTag="textarea"
          value={'Controlled input\nin multiple lines'}
          onChange={action('change')}
        />
      </DebugBox>

      <DebugBox>
        <EditableText
          inputTag="textarea"
          defaultValue={'Unontrolled input\nin multiple lines'}
          onChange={action('change')}
        />
      </DebugBox>
    </div>
  );
}
