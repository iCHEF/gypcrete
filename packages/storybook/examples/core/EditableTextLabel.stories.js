import { useState } from 'react';
import { action, decorateAction } from '@storybook/addon-actions';

import EditableTextLabel from '@ichef/gypcrete/src/EditableTextLabel';

import TextLabel from '@ichef/gypcrete/src/TextLabel';
import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/EditableTextLabel',
  component: EditableTextLabel,
  subcomponents: { TextLabel },
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
