import { useState } from 'react';
import { action, decorateAction } from '@storybook/addon-actions';

import EditableTextLabel from '@ichef/gypcrete/src/EditableTextLabel';
import Text from '@ichef/gypcrete/src/Text';
import TextLabel, { PureTextLabel } from '@ichef/gypcrete/src/TextLabel';
import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/TextLabel',
  component: PureTextLabel,
  subcomponents: {
    'rowComp()': TextLabel,
  },
};

export function BasicUsage() {
  return (
    <div>
      <DebugBox>
        <TextLabel
          icon="printer"
          basic="Basic text"
          tag="Tag"
          aside="left align (default)"
        />
      </DebugBox>

      <DebugBox>
        <TextLabel
          icon="printer"
          basic="Basic text"
          tag="Tag"
          aside="center align"
          align="center"
        />
      </DebugBox>

      <DebugBox>
        <TextLabel
          icon="printer"
          basic="Basic text"
          tag="Tag"
          aside="right align"
          align="right"
        />
      </DebugBox>

      <DebugBox>
        <TextLabel
          icon="printer"
          basic="Basic text"
          tag="Tag"
          aside="reverse align"
          align="reverse"
        />
      </DebugBox>
    </div>
  );
}

export function TextLabelWithStatus() {
  return (
    <div>
      <DebugBox>
        <TextLabel
          icon="printer"
          basic="Loading"
          tag="Tag"
          aside="Center align"
          align="center"
          status="loading"
        />
      </DebugBox>

      <DebugBox>
        <TextLabel
          icon="printer"
          basic="Success"
          tag="Tag"
          aside="Reverse align"
          align="reverse"
          status="success"
          statusOptions={{ autohide: false }}
        />
      </DebugBox>

      <DebugBox>
        <TextLabel
          icon="printer"
          basic="Error"
          tag="Tag"
          aside="Left align"
          status="error"
          errorMsg="Save failed"
        />
      </DebugBox>
    </div>
  );
}

export function TextLabelWithTextExample() {
  return (
    <div>
      <DebugBox>
        <TextLabel>
          <Text
            basic="foo"
            tag="Tag"
          />
        </TextLabel>
      </DebugBox>

      <DebugBox>
        <TextLabel status="loading">
          <Text
            basic="foo"
            aside="loading..."
          />
        </TextLabel>
      </DebugBox>
    </div>
  );
}
TextLabelWithTextExample.story = {
  name: '<Text> in child',
};

/**
 * The official `action` shipped with React Storybook crashes when
 * your payload contains an DOM node.
 *
 * This decorated action stripes DOM nodes, only shows their names.
 */
const cleanAction = decorateAction([
  ([payload]) => {
    const cleanPayload = {
      ...payload,
      event: `[${payload.event.constructor.name}]`,
    };
    return [cleanPayload];
  },
]);
export function UncontrolledEditableTextLabel() {
  return (
    <div>
      <EditableTextLabel
        icon="printer"
        basic="Kitchen Printer"
        aside="00:11:22:33"
        tag="Online"
        onDblClick={action('dblClick')}
        onEditEnd={cleanAction('editEnd')}
      />
    </div>
  );
}

export function ControlledEditableTextLabel() {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null);
  const [currentBasic, setCurrentBasic] = useState('Kitchen Printer');

  const handleDblClick = (event) => {
    setIsEditing(true);
    action('dblClick')(event);
  };

  const handleEditEnd = (payload) => {
    // When value isn't `null`, it's not a cancelling action from ESC key
    const hasValue = payload.value !== null;

    if (hasValue) {
      setCurrentBasic(payload.value);
      setTimeout(() => setStatus('success'), 600);
    }
    setIsEditing(false);
    setStatus(hasValue ? 'loading' : null);
    cleanAction('editEnd')(payload);
  };

  return (
    <DebugBox>
      <EditableTextLabel
        inEdit={isEditing}
        icon="printer"
        basic={currentBasic}
        aside="00:11:22:33"
        tag="Online"
        onDblClick={handleDblClick}
        onEditEnd={handleEditEnd}
        status={status}
      />
    </DebugBox>
  );
}
