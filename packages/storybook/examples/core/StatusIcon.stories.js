import React, { useState } from 'react';

import StatusIcon from '@ichef/gypcrete/src/StatusIcon';

import Button from '@ichef/gypcrete/src/Button';
import DebugBox from 'utils/DebugBox';
import FlexRow from 'utils/FlexRow';

export default {
  title: '@ichef/gypcrete|StatusIcon',
  component: StatusIcon,
};

export function BasicStatusIcon() {
  return (
    <div>
      <StatusIcon status="loading" />
      <StatusIcon status="success" autohide={false} />
      <StatusIcon status="error" />
    </div>
  );
}

export function StatusIconInCorner() {
  return (
    <div>
      <DebugBox width={32} height={32}>
        <StatusIcon status="loading" position="corner" />
      </DebugBox>
      <DebugBox width={32} height={32}>
        <StatusIcon status="success" position="corner" autohide={false} />
      </DebugBox>
      <DebugBox width={32} height={32}>
        <StatusIcon status="error" position="corner" />
      </DebugBox>
    </div>
  );
}

export function AutoHideSuccessIcon() {
  const [status, setStatus] = useState('error');
  return (
    <FlexRow>
      <StatusIcon status={status} />
      <Button
        color="blue"
        solid
        style={{ display: 'inline-block' }}
        onClick={() => setStatus('success')}
      >
        Make it success
      </Button>
      <Button
        color="red"
        solid
        style={{ display: 'inline-block' }}
        onClick={() => setStatus('error')}
      >
        Make it error
      </Button>
    </FlexRow>
  );
}
AutoHideSuccessIcon.story = {
  parameters: {
    docs: {
      // eslint-disable-next-line no-multi-str
      storyDescription: 'In this example, prop `autohide` is `true`, \
            initially <StatusIcon> is loading; \
            When make it success, after a while(~2s) it will hide; \
            Then if you make it error it shows again.',
    },
  },
};
