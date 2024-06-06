import StatusIcon from '@ichef/gypcrete/src/StatusIcon';
import Text, { PureText } from '@ichef/gypcrete/src/Text';
import TextEllipsis from '@ichef/gypcrete/src/TextEllipsis';

import DebugBox from 'utils/DebugBox';

export default {
  title: 'gypcrete/Text',
  component: PureText,
  subcomponents: { 'withStatus()': Text },
};

const LONG_LABEL = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Proin at pellentesque dui. Vivamus non egestas ante. Integer a egestas dui.`;

export function BasicUsage() {
  return (
    <div>
      <DebugBox>
        <Text basic="Basic Text" />
      </DebugBox>

      <DebugBox>
        <Text
          align="center"
          basic="Basic Text"
          aside="I am center-aligned"
        />
      </DebugBox>

      <DebugBox>
        <Text
          align="right"
          basic="Basic Text"
          tag="Tag"
          aside="I am right-aligned"
        />
      </DebugBox>

      <DebugBox>
        <Text
          basic={LONG_LABEL}
          tag="Tag"
          aside="Multi-line basic"
        />
      </DebugBox>

      <DebugBox>
        <Text aside="Aside Only Text" />
      </DebugBox>
    </div>
  );
}
export function EllipsisExample() {
  const ellipsisLabel = <TextEllipsis>{LONG_LABEL}</TextEllipsis>;

  return (
    <div>
      <DebugBox>
        <Text
          basic={ellipsisLabel}
          tag="tag"
          aside="Left-aligned"
        />
      </DebugBox>

      <DebugBox>
        <Text
          align="center"
          basic={ellipsisLabel}
          tag="tag"
          aside="Center-aligned"
        />
      </DebugBox>

      <DebugBox>
        <Text
          align="right"
          basic={ellipsisLabel}
          tag="tag"
          aside="Right-aligned"
        />
      </DebugBox>
    </div>
  );
}
EllipsisExample.story = {
  name: 'ellipsis-cropped',
};

export function WithStatusIcon() {
  return (
    <div>
      <DebugBox>
        <Text
          basic="A Long Long Long Basic Text"
          aside="I am left-aligned"
          tag="Tag"
          statusIcon={<StatusIcon status="loading" />}
        />
      </DebugBox>

      <DebugBox>
        <Text
          align="center"
          basic="Basic Text"
          aside="I am center-aligned"
          tag="Tag"
          statusIcon={
            <StatusIcon
              status="success"
              autohide={false}
            />
          }
        />
      </DebugBox>

      <DebugBox>
        <Text
          align="right"
          basic="A Long Long Long Basic Text"
          aside="I am right-aligned"
          tag="Tag"
          statusIcon={<StatusIcon status="error" />}
        />
      </DebugBox>
    </div>
  );
}
